import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadTractors } from "@/lib/data/loadTractors";
import { loadAcara } from "@/lib/data/loadAcara";
import { pickAcaraReference } from "@/lib/utils/acara";
import type { AcaraMappings } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mappings = isRecord(body?.mappings) ? (body.mappings as AcaraMappings) : {};

    const [tractors, acara] = await Promise.all([loadTractors(), loadAcara()]);
    const acaraById = new Map(acara.items.map((item) => [item.id, item]));

    let count = 0;
    let sumGapAbs = 0;
    let sumGapPct = 0;
    let belowCount = 0;
    let aboveCount = 0;

    const byProvince = new Map<
      string,
      { count: number; sumGapAbs: number; sumGapPct: number }
    >();
    const byModel = new Map<
      string,
      { marca: string | null; modelo: string | null; count: number; sumGapAbs: number; sumGapPct: number }
    >();

    tractors.rows.forEach((row) => {
      if (!row.precio_nor || !row.marca_norm || !row.modelo_norm) return;
      const key = `${row.marca_norm}|${row.modelo_norm}`;
      const mapping = mappings[key];
      if (!mapping?.acaraItemId) return;
      const item = acaraById.get(mapping.acaraItemId);
      if (!item) return;
      const reference = pickAcaraReference(item, row.anio);
      if (!reference) return;

      const gapAbs = row.precio_nor - reference;
      const gapPct = gapAbs / reference;

      count += 1;
      sumGapAbs += gapAbs;
      sumGapPct += gapPct;
      if (gapAbs < 0) belowCount += 1;
      if (gapAbs > 0) aboveCount += 1;

      const provincia = row.provincia ?? "Sin provincia";
      const provBucket = byProvince.get(provincia) ?? { count: 0, sumGapAbs: 0, sumGapPct: 0 };
      provBucket.count += 1;
      provBucket.sumGapAbs += gapAbs;
      provBucket.sumGapPct += gapPct;
      byProvince.set(provincia, provBucket);

      const modelBucket = byModel.get(key) ?? {
        marca: row.marca,
        modelo: row.modelo,
        count: 0,
        sumGapAbs: 0,
        sumGapPct: 0,
      };
      modelBucket.count += 1;
      modelBucket.sumGapAbs += gapAbs;
      modelBucket.sumGapPct += gapPct;
      byModel.set(key, modelBucket);
    });

    const summary = {
      count,
      avgGapAbs: count ? sumGapAbs / count : null,
      avgGapPct: count ? sumGapPct / count : null,
      belowPct: count ? belowCount / count : null,
      abovePct: count ? aboveCount / count : null,
    };

    const byProvinceArray = Array.from(byProvince.entries()).map(([provincia, bucket]) => ({
      provincia,
      count: bucket.count,
      avgGapAbs: bucket.count ? bucket.sumGapAbs / bucket.count : null,
      avgGapPct: bucket.count ? bucket.sumGapPct / bucket.count : null,
    }));

    const byModelArray = Array.from(byModel.entries()).map(([key, bucket]) => ({
      key,
      marca: bucket.marca,
      modelo: bucket.modelo,
      count: bucket.count,
      avgGapAbs: bucket.count ? bucket.sumGapAbs / bucket.count : null,
      avgGapPct: bucket.count ? bucket.sumGapPct / bucket.count : null,
    }));

    const topAbove = byModelArray
      .filter((item) => (item.avgGapAbs ?? 0) > 0)
      .sort((a, b) => (b.avgGapAbs ?? 0) - (a.avgGapAbs ?? 0))
      .slice(0, 5);

    const topBelow = byModelArray
      .filter((item) => (item.avgGapAbs ?? 0) < 0)
      .sort((a, b) => (a.avgGapAbs ?? 0) - (b.avgGapAbs ?? 0))
      .slice(0, 5);

    return NextResponse.json({
      summary,
      byProvince: byProvinceArray,
      topAbove,
      topBelow,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo calcular brecha ACARA." },
      { status: 500 },
    );
  }
}
