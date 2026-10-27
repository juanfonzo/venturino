import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getListingUnitKey } from "@/lib/dedupe/listingUnits";
import { normalizeMatchText, normalizeText } from "@/lib/normalize/text";
import { getPercentiles } from "@/lib/stats/percentiles";
import { normalizeListingPriceUsd } from "@/lib/utils/price";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toDateKey(value: Date) {
  return value.toISOString().split("T")[0];
}

type YearBucketDef = {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
};

const YEAR_BUCKET_PRESETS: Record<string, YearBucketDef[]> = {
  used_default: [
    { id: "2010-2014", label: "2010–2014", min: 2010, max: 2014 },
    { id: "2015-2018", label: "2015–2018", min: 2015, max: 2018 },
    { id: "2019-2021", label: "2019–2021", min: 2019, max: 2021 },
    { id: "2022+", label: "2022+", min: 2022, max: null },
  ],
};

const MIN_SAMPLE_SIZE = 4;

function matchesYearBucket(value: number, bucket: YearBucketDef) {
  if (bucket.min !== null && value < bucket.min) return false;
  if (bucket.max !== null && value > bucket.max) return false;
  return true;
}

function findYearBucketId(anio: number | null, buckets: YearBucketDef[]) {
  if (anio === null) return "SIN_ANIO";
  const match = buckets.find((bucket) => matchesYearBucket(anio, bucket));
  return match ? match.id : null;
}

function getUnitKeyForRow(row: {
  listingId: number;
  precioUsd: { toNumber(): number } | number | null;
  listing: {
    anio: number | null;
    vendedor: string | null;
    marcaNorm: string | null;
    modeloNorm: string | null;
  } | null;
}) {
  return (
    getListingUnitKey({
      empresa: row.listing?.vendedor ?? null,
      marca_norm: row.listing?.marcaNorm ?? null,
      modelo_norm: row.listing?.modeloNorm ?? null,
      anio: row.listing?.anio ?? null,
      precio_nor: normalizeListingPriceUsd(row.precioUsd),
    }) ?? `listing:${row.listingId}`
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria")?.trim() || null;
    const brand = searchParams.get("brand")?.trim() || null;
    const model = searchParams.get("model")?.trim() || null;
    const activeOnly = (searchParams.get("activeOnly") ?? "false").toLowerCase() === "true";
    const estado = searchParams.get("estado")?.trim() || null;
    const yearBucketPreset = searchParams.get("yearBucketPreset")?.trim() || null;

    if (!categoria || !brand || !model) {
      return NextResponse.json(
        { error: "Faltan parametros: categoria, brand, model" },
        { status: 400 },
      );
    }

    const brandNorm = normalizeText(brand);
    const modelNorm = normalizeText(model);
    const compactModelNorm = normalizeMatchText(model)?.replace(/\s+/g, "") || null;
    const rawModel = model.trim();
    const modelVariants = [modelNorm, compactModelNorm].filter(
      (value, index, array): value is string => Boolean(value) && array.indexOf(value) === index,
    );
    const modelWhere = modelVariants.length
      ? {
          OR: [
            { modelo: { equals: rawModel, mode: "insensitive" as const } },
            { modelo: { contains: rawModel, mode: "insensitive" as const } },
            ...modelVariants.map((value) => ({
              modeloNorm: { contains: value, mode: "insensitive" as const },
            })),
          ],
        }
      : {};

    const rows = await prisma.priceHistory.findMany({
      where: {
        listing: {
          categoria,
          ...(brandNorm ? { marcaNorm: brandNorm } : {}),
          ...modelWhere,
          ...(activeOnly ? { active: true } : {}),
          ...(estado ? { condicion: estado } : {}),
        },
      },
      select: {
        listingId: true,
        snapshotDate: true,
        precioUsd: true,
        listing: {
          select: {
            vendedor: true,
            marcaNorm: true,
            modeloNorm: true,
            anio: true,
          },
        },
      },
      orderBy: { snapshotDate: "asc" },
    });

    const dateBuckets = new Map<string, Map<string, number>>();
    rows.forEach((row) => {
      if (!row.snapshotDate) return;
      const price = normalizeListingPriceUsd(row.precioUsd);
      if (price === null) return;
      const key = toDateKey(row.snapshotDate);
      const unitKey = getUnitKeyForRow(row);
      if (!dateBuckets.has(key)) dateBuckets.set(key, new Map());
      const byUnit = dateBuckets.get(key);
      if (!byUnit) return;
      const existing = byUnit.get(unitKey);
      if (existing === undefined || price < existing) {
        byUnit.set(unitKey, price);
      }
    });

    const points = Array.from(dateBuckets.entries())
      .map(([date, pricesByUnit]) => {
        const prices = Array.from(pricesByUnit.values());
        if (prices.length < MIN_SAMPLE_SIZE) {
          return { date, n: prices.length, p25: null, p50: null, p75: null };
        }
        const { p25, p50, p75 } = getPercentiles(prices);
        return { date, n: prices.length, p25, p50, p75 };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    const presetBuckets = yearBucketPreset ? YEAR_BUCKET_PRESETS[yearBucketPreset] : null;
    if (!presetBuckets) {
      return NextResponse.json({ points });
    }

    const yearBucketMap = new Map<string, Map<string, Map<string, number>>>();
    presetBuckets.forEach((bucket) => {
      yearBucketMap.set(bucket.id, new Map());
    });
    yearBucketMap.set("SIN_ANIO", new Map());

    rows.forEach((row) => {
      if (!row.snapshotDate) return;
      const price = normalizeListingPriceUsd(row.precioUsd);
      if (price === null) return;
      const dateKey = toDateKey(row.snapshotDate);
      const bucketId = findYearBucketId(row.listing?.anio ?? null, presetBuckets);
      if (!bucketId) return;
      const unitKey = getUnitKeyForRow(row);
      if (!yearBucketMap.has(bucketId)) yearBucketMap.set(bucketId, new Map());
      const byDate = yearBucketMap.get(bucketId);
      if (!byDate) return;
      if (!byDate.has(dateKey)) byDate.set(dateKey, new Map());
      const byUnit = byDate.get(dateKey);
      if (!byUnit) return;
      const existing = byUnit.get(unitKey);
      if (existing === undefined || price < existing) {
        byUnit.set(unitKey, price);
      }
    });

    const series = Array.from(yearBucketMap.entries())
      .map(([bucketId, byDate]) => {
        const def = presetBuckets.find((bucket) => bucket.id === bucketId);
        const label = def?.label ?? (bucketId === "SIN_ANIO" ? "Sin año" : bucketId);
        const bucketPoints = Array.from(byDate.entries())
          .map(([date, pricesByUnit]) => {
            const prices = Array.from(pricesByUnit.values());
            if (prices.length < MIN_SAMPLE_SIZE) {
              return { date, n: prices.length, p25: null, p50: null, p75: null };
            }
            const { p25, p50, p75 } = getPercentiles(prices);
            return { date, n: prices.length, p25, p50, p75 };
          })
          .sort((a, b) => a.date.localeCompare(b.date));
        return { bucket: bucketId, label, points: bucketPoints };
      })
      .filter((entry) => entry.points.length > 0);

    return NextResponse.json({ points, series, meta: { yearBucketPreset } });
  } catch (error) {
    console.error("[api/market-evolution] Failed", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "No se pudo calcular la evolucion del mercado.", detail },
      { status: 500 },
    );
  }
}
