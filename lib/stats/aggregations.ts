import type {
  BrandStat,
  ModelComboStat,
  OriginStat,
  ProvinceStat,
  TractorItem,
} from "@/lib/types";
import { getPercentiles } from "@/lib/stats/percentiles";
import { normalizeText } from "@/lib/normalize/text";

export function groupByProvince(rows: TractorItem[]): ProvinceStat[] {
  const buckets = new Map<string, TractorItem[]>();

  rows.forEach((row) => {
    const key = row.provincia?.trim() || "Sin provincia";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)?.push(row);
  });

  return Array.from(buckets.entries()).map(([provincia, items]) => {
    const prices = items.map((item) => item.precio_nor).filter((v): v is number => v !== null);
    const { p50, p75 } = getPercentiles(prices);
    const missingPrice = items.filter((item) => item.precio_nor === null).length;
    const conflict = items.filter((item) => item.flags.includes("YEAR_CONDITION_CONFLICT")).length;
    return {
      provincia,
      count: items.length,
      p50,
      p75,
      missingPricePct: items.length ? missingPrice / items.length : 0,
      conflictPct: items.length ? conflict / items.length : 0,
    };
  });
}

export function groupByOrigin(rows: TractorItem[]): OriginStat[] {
  const buckets = new Map<string, TractorItem[]>();

  rows.forEach((row) => {
    const key = row.origen?.trim() || "Sin origen";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)?.push(row);
  });

  return Array.from(buckets.entries()).map(([origen, items]) => {
    const missingPrice = items.filter((item) => item.precio_nor === null).length;
    const missingYear = items.filter((item) => item.anio === null).length;
    const missingHp = items.filter((item) => item.hp_motor === null).length;
    const missingLocation = items.filter((item) => !item.ubicacion).length;
    const conflict = items.filter((item) => item.flags.includes("YEAR_CONDITION_CONFLICT")).length;

    return {
      origen,
      count: items.length,
      missingPricePct: items.length ? missingPrice / items.length : 0,
      missingYearPct: items.length ? missingYear / items.length : 0,
      missingHpPct: items.length ? missingHp / items.length : 0,
      missingLocationPct: items.length ? missingLocation / items.length : 0,
      conflictPct: items.length ? conflict / items.length : 0,
    };
  });
}

export function topBrands(rows: TractorItem[], limit = 8): BrandStat[] {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    const key = row.marca?.trim() || "Sin marca";
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([marca, count]) => ({ marca, count }));
}

export function topModelCombos(rows: TractorItem[], limit = 20): ModelComboStat[] {
  const counts = new Map<string, ModelComboStat>();
  rows.forEach((row) => {
    if (!row.marca || !row.modelo) return;
    const brandNorm = normalizeText(row.marca) || row.marca;
    const modelNorm = normalizeText(row.modelo) || row.modelo;
    const key = `${brandNorm}|${modelNorm}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, {
        key,
        marca: row.marca,
        modelo: row.modelo,
        count: 1,
      });
    }
  });

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
