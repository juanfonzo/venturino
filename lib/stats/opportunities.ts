import type { OpportunityItem, TractorItem } from "@/lib/types";
import { getPercentiles } from "@/lib/stats/percentiles";

const MARGIN = 0.15;

function labelFromScore(score: number | null) {
  if (score === null || Number.isNaN(score)) return "Sin dato" as const;
  if (score >= 0.05) return "Verde" as const;
  if (score <= -0.05) return "Rojo" as const;
  return "Amarillo" as const;
}

export function computeTopOpportunities(rows: TractorItem[], limit = 10): OpportunityItem[] {
  const groups = new Map<string, TractorItem[]>();

  rows.forEach((row) => {
    if (!row.marca_norm || !row.modelo_norm) return;
    if (row.precio_nor === null) return;
    const key = `${row.marca_norm}|${row.modelo_norm}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)?.push(row);
  });

  const opportunities: OpportunityItem[] = [];

  groups.forEach((items) => {
    const prices = items.map((item) => item.precio_nor).filter((v): v is number => v !== null);
    const { p50 } = getPercentiles(prices);
    if (!p50) return;

    items.forEach((item) => {
      const maxBuy = p50 / (1 + MARGIN);
      const score = maxBuy > 0 && item.precio_nor !== null ? (maxBuy - item.precio_nor) / maxBuy : null;
      opportunities.push({
        id: item.id,
        marca: item.marca,
        modelo: item.modelo,
        anio: item.anio,
        precio_nor: item.precio_nor,
        target_resell: p50,
        max_buy: maxBuy,
        score,
        label: labelFromScore(score),
      });
    });
  });

  return opportunities.sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity)).slice(0, limit);
}

export function buildOpportunity(
  targetResellValue: number | null,
  targetPrice: number | null,
  cost = 0,
) {
  if (!targetResellValue || targetResellValue <= 0 || targetPrice === null) {
    return {
      maxBuy: null,
      score: null,
      label: "Sin dato" as const,
    };
  }
  const maxBuy = targetResellValue / (1 + MARGIN) - cost;
  if (maxBuy <= 0) {
    return { maxBuy: null, score: null, label: "Sin dato" as const };
  }
  const score = (maxBuy - targetPrice) / maxBuy;
  return {
    maxBuy,
    score,
    label: labelFromScore(score),
  };
}
