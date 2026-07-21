import { getPercentiles } from "@/lib/stats/percentiles";
import { normalizeMatchText, normalizeText } from "@/lib/normalize/text";
import type {
  CommercialLabel,
  MarketReferenceCandidate,
  MarketReferenceItem,
  MarketReferenceStatistics,
} from "@/lib/market-reference/types";

export interface DirectCandidateSelection {
  candidates: MarketReferenceCandidate[];
  criterion: CommercialLabel;
  yearScope: "near" | "extended" | "all" | "none";
}

export function selectDirectCandidates(
  candidates: MarketReferenceCandidate[],
  input: {
    modelNorm: string;
    year: number;
    nearYearTolerance: number;
    extendedYearTolerance: number;
    desiredSampleSize: number;
  },
): DirectCandidateSelection {
  const targetModel = compactModel(input.modelNorm);
  const sameModel = dedupeCandidates(
    candidates.filter((candidate) => {
      if (isVenturinoCandidate(candidate)) return false;
      return candidateModelKey(candidate) === targetModel;
    }),
  ).sort((left, right) => compareByYearDistance(left, right, input.year));

  if (sameModel.length === 0) {
    return {
      candidates: [],
      criterion: {
        codigo: "SIN_REFERENCIAS_DIRECTAS",
        titulo: "Sin referencias directas",
        detalle: "No encontramos publicaciones del mismo modelo. Podés consultar modelos relacionados.",
      },
      yearScope: "none",
    };
  }

  const near = sameModel.filter((candidate) => yearDistance(candidate.year, input.year) <= input.nearYearTolerance);
  if (near.length >= input.desiredSampleSize || near.length === sameModel.length) {
    return {
      candidates: near,
      criterion: {
        codigo: "MISMO_MODELO_ANIOS_CERCANOS",
        titulo: "Mismo modelo y años cercanos",
        detalle: `Publicaciones del mismo modelo hasta ${input.nearYearTolerance} años de diferencia.`,
      },
      yearScope: "near",
    };
  }

  const extended = sameModel.filter(
    (candidate) => yearDistance(candidate.year, input.year) <= input.extendedYearTolerance,
  );
  if (extended.length >= input.desiredSampleSize || extended.length === sameModel.length) {
    return {
      candidates: extended,
      criterion: {
        codigo: "MISMO_MODELO_RANGO_AMPLIADO",
        titulo: "Mismo modelo con más años de referencia",
        detalle: `La búsqueda se amplió automáticamente hasta ${input.extendedYearTolerance} años de diferencia.`,
      },
      yearScope: "extended",
    };
  }

  return {
    candidates: sameModel,
    criterion: {
      codigo: "MISMO_MODELO_OTROS_ANIOS",
      titulo: "Mismo modelo en otros años",
      detalle: "Mostramos publicaciones del mismo modelo de otros años para aportar más contexto de mercado.",
    },
    yearScope: "all",
  };
}

// Kept as a focused primitive for regression tests and existing consumers.
export function filterDirectCandidates(
  candidates: MarketReferenceCandidate[],
  input: { modelNorm: string; year: number; yearTolerance: number },
) {
  const targetModel = compactModel(input.modelNorm);
  return dedupeCandidates(
    candidates.filter((candidate) => {
      if (isVenturinoCandidate(candidate)) return false;
      if (candidateModelKey(candidate) !== targetModel) return false;
      return yearDistance(candidate.year, input.year) <= input.yearTolerance;
    }),
  ).sort((left, right) => compareByYearDistance(left, right, input.year));
}

export function rankExpandedCandidates(
  candidates: MarketReferenceCandidate[],
  input: { modelNorm: string; familyKey: string | null; year: number | null },
) {
  const targetCompact = compactModel(input.modelNorm);

  return dedupeCandidates(candidates.filter((candidate) => !isVenturinoCandidate(candidate)))
    .map((candidate) => ({
      candidate,
      score: expandedRelevanceScore(candidate, targetCompact, input.familyKey, input.year),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      const rightYear = right.candidate.year ?? Number.NEGATIVE_INFINITY;
      const leftYear = left.candidate.year ?? Number.NEGATIVE_INFINITY;
      return (
        right.score - left.score
        || rightYear - leftYear
        || left.candidate.priceUsd - right.candidate.priceUsd
        || left.candidate.listingId - right.candidate.listingId
      );
    })
    .map(({ candidate }) => candidate);
}

export function buildMarketReferenceStatistics(
  candidates: MarketReferenceCandidate[],
): MarketReferenceStatistics {
  const prices = candidates.map((candidate) => candidate.priceUsd).filter(Number.isFinite);
  const percentiles = getPercentiles(prices);
  return {
    currency: "USD",
    sampleSize: prices.length,
    min: prices.length > 0 ? roundMoney(Math.min(...prices)) : null,
    p25: roundNullableMoney(percentiles.p25),
    median: roundNullableMoney(percentiles.p50),
    p75: roundNullableMoney(percentiles.p75),
    max: prices.length > 0 ? roundMoney(Math.max(...prices)) : null,
  };
}

export function buildSampleStrength(sampleSize: number): CommercialLabel {
  if (sampleSize === 0) {
    return {
      codigo: "SIN_REFERENCIAS",
      titulo: "Sin referencias disponibles",
      detalle: "No encontramos publicaciones que aporten una referencia útil para esta búsqueda.",
    };
  }
  if (sampleSize < 3) {
    return {
      codigo: "MUESTRA_LIMITADA",
      titulo: "Muestra limitada",
      detalle: `Encontramos ${sampleSize} ${sampleSize === 1 ? "publicación" : "publicaciones"}. Conviene complementar con modelos relacionados.`,
    };
  }
  return {
    codigo: "MUESTRA_SUFICIENTE",
    titulo: "Muestra suficiente",
    detalle: `Encontramos ${sampleSize} publicaciones para consultar precios y características.`,
  };
}

export function toMarketReferenceItem(
  candidate: MarketReferenceCandidate,
  context: { mode: "direct" | "expanded"; targetModel: string; targetYear: number | null },
): MarketReferenceItem {
  return {
    id: candidate.listingId.toString(),
    source: candidate.source,
    title: candidate.title,
    brand: candidate.brand,
    model: candidate.modelDisplay ?? candidate.model,
    year: candidate.year,
    price: { amount: roundMoney(candidate.priceUsd), currency: "USD" },
    seller: candidate.seller,
    province: candidate.province,
    city: candidate.city,
    url: candidate.url,
    coincidencia: buildCommercialMatch(candidate, context),
    configuracion: candidate.modelQualifiers,
  };
}

export function buildSearchTokens(modelNorm: string, familyKey?: string | null) {
  const compact = compactModel(modelNorm);
  const numericCore = compact.match(/\d{3,}/)?.[0] ?? null;
  return [...new Set(
    [compact, numericCore, familyKey]
      .filter((value): value is string => typeof value === "string" && value.length >= 2),
  )];
}

export function buildDirectSearchTokens(modelNorm: string) {
  const compact = compactModel(modelNorm);
  const numericCore = compact.match(/\d{3,}/)?.[0];
  return [numericCore ?? compact].filter(Boolean);
}

function buildCommercialMatch(
  candidate: MarketReferenceCandidate,
  context: { mode: "direct" | "expanded"; targetModel: string; targetYear: number | null },
) {
  const difference = context.targetYear !== null && candidate.year !== null
    ? Math.abs(candidate.year - context.targetYear)
    : null;
  const sameModel = candidateModelKey(candidate) === compactModel(context.targetModel);

  if (context.mode === "expanded" && !sameModel) {
    return {
      codigo: "MODELO_RELACIONADO",
      titulo: "Modelo relacionado",
      detalle: difference === null
        ? "La publicación coincide con la búsqueda ampliada elegida."
        : `La publicación coincide con la búsqueda ampliada y tiene ${difference} ${difference === 1 ? "año" : "años"} de diferencia.`,
      diferenciaAnios: difference,
    };
  }
  if (difference === null) {
    return {
      codigo: "MISMO_MODELO_SIN_ANIO",
      titulo: "Mismo modelo, año no informado",
      detalle: "La publicación corresponde al mismo modelo, pero no informa el año.",
      diferenciaAnios: null,
    };
  }
  if (difference <= 2) {
    return {
      codigo: "MISMO_MODELO_ANIO_CERCANO",
      titulo: "Mismo modelo y año cercano",
      detalle: difference === 0
        ? "La publicación corresponde al mismo modelo y año."
        : `La publicación corresponde al mismo modelo y tiene ${difference} ${difference === 1 ? "año" : "años"} de diferencia.`,
      diferenciaAnios: difference,
    };
  }
  if (difference <= 5) {
    return {
      codigo: "MISMO_MODELO_ANIO_PROXIMO",
      titulo: "Mismo modelo, año próximo",
      detalle: `La publicación corresponde al mismo modelo y tiene ${difference} años de diferencia.`,
      diferenciaAnios: difference,
    };
  }
  return {
    codigo: "MISMO_MODELO_OTRO_ANIO",
    titulo: "Mismo modelo, otro año",
    detalle: `La publicación corresponde al mismo modelo y tiene ${difference} años de diferencia.`,
    diferenciaAnios: difference,
  };
}

function dedupeCandidates(candidates: MarketReferenceCandidate[]) {
  const byUnit = new Map<string, MarketReferenceCandidate>();
  candidates.forEach((candidate) => {
    const company = normalizeText(candidate.seller);
    const brand = normalizeText(candidate.brandNorm ?? candidate.brand);
    const model = candidateModelKey(candidate);
    const key = company && brand && model && candidate.year !== null
      ? `${company}|${brand}|${model}|${candidate.year}|${roundMoney(candidate.priceUsd)}`
      : `URL|${candidate.url}`;
    const existing = byUnit.get(key);
    if (!existing || completenessScore(candidate) > completenessScore(existing)) {
      byUnit.set(key, candidate);
    }
  });
  return [...byUnit.values()];
}

function expandedRelevanceScore(
  candidate: MarketReferenceCandidate,
  targetCompact: string,
  familyKey: string | null,
  targetYear: number | null,
) {
  const candidateKey = candidateModelKey(candidate);
  if (!candidateKey) return 0;
  let score = 0;
  if (candidateKey === targetCompact) score += 100;
  else if (
    targetCompact.length >= 3
    && (candidateKey.includes(targetCompact) || targetCompact.includes(candidateKey))
  ) score += 60;
  else if (familyKey && candidateBelongsToFamily(candidate, familyKey)) score += 35;
  else {
    const targetDigits = targetCompact.match(/\d{3,}/)?.[0];
    if (targetDigits && candidateKey.includes(targetDigits)) score += 30;
  }

  if (score === 0) return 0;
  if (targetYear !== null && candidate.year !== null) {
    score += Math.max(0, 20 - Math.abs(candidate.year - targetYear) * 3);
  }
  return score;
}

function candidateBelongsToFamily(candidate: MarketReferenceCandidate, familyKey: string) {
  const candidateKey = candidateModelKey(candidate);
  const family = compactModel(familyKey);
  const brand = normalizeText(candidate.brandNorm ?? candidate.brand);

  let match = family.match(/^(\d)([A-Z])$/);
  if (brand === "JOHN DEERE" && match) {
    const candidateMatch = candidateKey.match(/^(\d)([A-Z])\d+$/)
      ?? candidateKey.match(/^(\d)\d{3}([A-Z])$/);
    return Boolean(candidateMatch && candidateMatch[1] === match[1] && candidateMatch[2] === match[2]);
  }
  match = family.match(/^S(\d)$/);
  if (brand === "JOHN DEERE" && match) return candidateKey.startsWith(family);
  match = family.match(/^T(\d)$/);
  if (brand === "NEW HOLLAND" && match) return candidateKey.startsWith(family);
  match = family.match(/^CR(\d)$/);
  if (brand === "NEW HOLLAND" && match) return candidateKey.startsWith(family);
  if (brand === "PLA" && family === "MAP3") return candidateKey.startsWith(family);
  return family.length >= 3 && candidateKey.startsWith(family);
}

function candidateModelKey(candidate: MarketReferenceCandidate) {
  return candidate.modelKey
    ? compactModel(candidate.modelKey)
    : compactModel(normalizeMatchText(candidate.modelNorm ?? candidate.model) ?? "");
}

function isVenturinoCandidate(candidate: MarketReferenceCandidate) {
  const source = normalizeText(candidate.source) ?? "";
  const seller = normalizeText(candidate.seller) ?? "";
  return source.includes("VENTURINO") || seller.includes("VENTURINO");
}

function compareByYearDistance(
  left: MarketReferenceCandidate,
  right: MarketReferenceCandidate,
  targetYear: number,
) {
  const distance = yearDistance(left.year, targetYear) - yearDistance(right.year, targetYear);
  return distance || left.priceUsd - right.priceUsd || left.listingId - right.listingId;
}

function yearDistance(year: number | null, targetYear: number) {
  return year === null ? Number.POSITIVE_INFINITY : Math.abs(year - targetYear);
}

function completenessScore(candidate: MarketReferenceCandidate) {
  return Number(Boolean(candidate.title))
    + Number(Boolean(candidate.brand))
    + Number(Boolean(candidate.model))
    + Number(candidate.year !== null)
    + Number(Boolean(candidate.province))
    + Number(Boolean(candidate.city));
}

function compactModel(value: string) {
  return value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

function roundNullableMoney(value: number | null) {
  return value === null ? null : roundMoney(value);
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}
