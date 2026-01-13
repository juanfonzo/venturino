import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadAcara } from "@/lib/data/loadAcara";
import { normalizeText } from "@/lib/normalize/text";
import { findBestAcaraMatch, pickAcaraReferenceDetail } from "@/lib/utils/acara";
import type { AcaraItem } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AutoMatchRow = {
  key?: string | null;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rows = isRecord(body) && Array.isArray(body.rows) ? (body.rows as AutoMatchRow[]) : [];
    if (rows.length === 0) {
      return NextResponse.json({ rows: [] });
    }

    const acara = await loadAcara();
    const byBrand = new Map<string, typeof acara.items>();
    acara.items.forEach((item) => {
      if (!item.brand_norm) return;
      if (!byBrand.has(item.brand_norm)) byBrand.set(item.brand_norm, []);
      byBrand.get(item.brand_norm)?.push(item);
    });

    const matched = rows.map((row) => {
      const brandNorm = normalizeText(row.brand ?? null);
      const modelRaw = row.model ?? null;
      const key = row.key ?? (brandNorm && modelRaw ? `${brandNorm}|${normalizeText(modelRaw) ?? modelRaw}` : null);
      if (!brandNorm || !modelRaw) {
        return { key, match: null };
      }
      const candidates = byBrand.get(brandNorm) ?? [];
      const best = findBestAcaraMatch(candidates, modelRaw) as { item: AcaraItem; score: number } | null;
      if (!best) {
        return { key, match: null };
      }
      const refDetail = pickAcaraReferenceDetail(best.item, row.year ?? null);
      return {
        key,
        match: {
          itemId: best.item.id,
          brand: best.item.brand,
          description: best.item.description,
          refUsd: refDetail?.value ?? null,
          refLabel: refDetail?.yearLabel ?? null,
          score: best.score,
        },
      };
    });

    return NextResponse.json({ rows: matched });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo calcular el match ACARA." }, { status: 500 });
  }
}
