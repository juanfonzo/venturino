import type { AcaraItem } from "@/lib/types";
import { normalizeMatchText } from "@/lib/normalize/text";

export function pickAcaraReferenceDetail(item: AcaraItem | null, year?: string | number | null) {
  if (!item) return null;
  const yearValue = year ? year.toString().trim() : "";
  if (yearValue) {
    const match = item.series.find((point) => point.yearLabel === yearValue);
    if (match && match.valueUsd !== null) {
      return { value: match.valueUsd, yearLabel: match.yearLabel };
    }
  }
  const fallback = item.series.find((point) => point.yearLabel.toLowerCase() === "0km");
  if (fallback && fallback.valueUsd !== null) {
    return { value: fallback.valueUsd, yearLabel: fallback.yearLabel };
  }
  return null;
}

export function pickAcaraReference(item: AcaraItem | null, year?: string | number | null) {
  const detail = pickAcaraReferenceDetail(item, year);
  return detail?.value ?? null;
}

function compactText(value: string) {
  return value.replace(/\s+/g, "");
}

function buildModelVariants(modelMatch: string) {
  const compact = compactText(modelMatch);
  const base = compact.replace(/([A-Z]+\\d+)[A-Z]+$/, "$1");
  const variants = [compact, base].filter((entry, index, arr) => entry && arr.indexOf(entry) === index);
  return variants.filter((entry) => entry.length >= 3);
}

export function findBestAcaraMatch(
  items: AcaraItem[],
  model?: string | null,
): { item: AcaraItem; score: number } | null {
  const modelMatch = normalizeMatchText(model ?? null);
  if (!modelMatch) return null;
  const modelVariants = buildModelVariants(modelMatch);
  const tokens = modelMatch.split(" ").filter((token) => token.length >= 2);

  let bestItem: AcaraItem | null = null;
  let bestScore = -Infinity;

  items.forEach((item) => {
    const descMatch = normalizeMatchText(item.description ?? null);
    if (!descMatch) return;
    const descCompact = compactText(descMatch);
    let score = 0;

    if (modelVariants.some((variant) => descCompact.includes(variant))) {
      score += 3;
    }

    if (descMatch.includes(modelMatch)) {
      score += 1.5;
    }

    tokens.forEach((token) => {
      if (descMatch.includes(token)) score += 0.4;
    });

    if ((item.category_norm ?? "").includes("TRACTOR")) {
      score += 0.2;
    }

    if (!bestItem || score > bestScore) {
      bestItem = item;
      bestScore = score;
    }
  });

  if (!bestItem) return null;
  if (bestScore < 2) return null;
  return { item: bestItem, score: bestScore };
}
