import { loadAllListings, loadVenturinoListings } from "@/lib/data/loadListings";
import type { TractorItem } from "@/lib/types";

export type Analisis1Equivalent = {
  id: string;
  origen: string | null;
  empresa: string | null;
  url: string | null;
  titulo: string | null;
  marca: string | null;
  modelo: string | null;
  marca_norm: string | null;
  modelo_norm: string | null;
  anio: number | null;
  horas_uso: number | null;
  precio_nor: number | null;
  diff_abs_usd: number | null;
  diff_pct: number | null;
  flags: string[];
};

export type Analisis1VenturinoMatch = {
  venturino: TractorItem;
  equivalents: Analisis1Equivalent[];
};

export type Analisis1RankingRow = {
  empresa: string;
  avgPriceUsd: number | null;
  n: number;
};

export type Analisis1ModelRanking = {
  key: string;
  marca: string | null;
  modelo: string | null;
  rows: Analisis1RankingRow[];
};

export type Analisis1Response = {
  meta: {
    generatedAt: number;
    categoria: string | null;
    venturinoCount: number;
    competitorsCount: number;
    params: {
      compareYear: boolean;
      compareHours: boolean;
      yearTolerance: number;
      hoursTolerancePct: number;
      fuzzyLevel: number;
    };
    debug: {
      venturinoWithKey: number;
      competitorsWithKey: number;
      venturinoKeys: number;
      competitorKeys: number;
      sharedKeys: number;
      competitorsMissingKey: number;
      competitorsMissingYear: number;
      competitorsExcludedVenturino: number;
    };
  };
  rows: Analisis1VenturinoMatch[];
  rankings: Analisis1ModelRanking[];
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function avg(values: number[]) {
  if (values.length === 0) return null;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

function buildKey(item: Pick<TractorItem, "marca_norm" | "modelo_norm">) {
  if (!item.marca_norm || !item.modelo_norm) return null;
  return `${item.marca_norm}|${item.modelo_norm}`;
}

function normalizeEmpresa(value: string | null) {
  return (value ?? "").toString().trim().toUpperCase();
}

function isSelfCompany(empresa: string | null) {
  const norm = normalizeEmpresa(empresa);
  return norm.includes("VENTURINO");
}

function extractTokens(value: string) {
  return value
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function isDigitsOnly(value: string) {
  return /^\d+$/.test(value);
}

function tokenIntersectionSize(a: string[], b: Set<string>) {
  let count = 0;
  a.forEach((t) => {
    if (b.has(t)) count += 1;
  });
  return count;
}

// Extract the core numeric part from a model token (e.g. "5065ES" → "5065", "7230R" → "7230")
function extractNumericCore(token: string) {
  const match = token.match(/^([A-Z]*)(\d+)([A-Z]*)$/);
  if (!match) return null;
  return { prefix: match[1], digits: match[2], suffix: match[3], full: token };
}

// Check if two model strings are suffix-variants of each other
// e.g. "5065ES" vs "5065E", "5045DS" vs "5045D", "MAXXUM150" vs "MXM150"
function isSuffixVariant(a: string, b: string) {
  const aParts = extractNumericCore(a);
  const bParts = extractNumericCore(b);
  if (!aParts || !bParts) return false;
  // Same digits and same prefix (or one prefix contains the other)
  if (aParts.digits !== bParts.digits) return false;
  if (aParts.prefix === bParts.prefix) return true;
  if (aParts.prefix.includes(bParts.prefix) || bParts.prefix.includes(aParts.prefix)) return true;
  return false;
}

function fuzzyModelMatch(ventModelNorm: string, candidateModelNorm: string, level: number) {
  if (level <= 0) return false;
  if (ventModelNorm === candidateModelNorm) return true;

  const v = ventModelNorm;
  const c = candidateModelNorm;
  if (c.includes(v) || v.includes(c)) return true;

  const vTokens = extractTokens(v);
  const cTokens = new Set(extractTokens(c));
  const cTokensArr = extractTokens(c);

  if (vTokens.length === 0 || cTokens.size === 0) return false;

  // Suffix-variant matching: "5065ES" vs "5065E", "5045DS" vs "5045D"
  // If both have exactly one alphanumeric token with digits, compare cores
  const vAlphaNum = vTokens.filter((t) => /\d/.test(t));
  const cAlphaNum = cTokensArr.filter((t) => /\d/.test(t));
  if (vAlphaNum.length === 1 && cAlphaNum.length >= 1) {
    for (const ct of cAlphaNum) {
      if (isSuffixVariant(vAlphaNum[0], ct)) return true;
    }
  }

  if (vTokens.length === 1 && isDigitsOnly(vTokens[0])) {
    return cTokens.has(vTokens[0]);
  }

  if (level === 1) {
    return vTokens.every((t) => cTokens.has(t));
  }

  const digits = vTokens.filter((t) => isDigitsOnly(t));
  if (digits.length > 0 && !digits.every((d) => cTokens.has(d))) {
    return false;
  }

  const common = tokenIntersectionSize(vTokens, cTokens);
  const ratio = vTokens.length ? common / vTokens.length : 0;
  const threshold = level >= 3 ? 0.4 : 0.6;
  return ratio >= threshold;
}

function hoursWithinTolerance(base: number, candidate: number, tolerancePct: number) {
  const min = base * (1 - tolerancePct);
  const max = base * (1 + tolerancePct);
  return candidate >= min && candidate <= max;
}

export async function computeAnalisis1(params?: {
  categoria?: string | null;
  brandNorm?: string | null;
  modelNorm?: string | null;
  maxVenturinoRows?: number;
  maxEquivalentsPerRow?: number;
  hoursTolerancePct?: number;
  yearTolerance?: number;
  fuzzyLevel?: number;
  compareYear?: boolean;
  compareHours?: boolean;
}): Promise<Analisis1Response> {
  const categoria = params?.categoria ?? null;
  const brandNorm = params?.brandNorm ?? null;
  const modelNorm = params?.modelNorm ?? null;
  const maxVenturinoRows = params?.maxVenturinoRows ?? 250;
  const maxEquivalentsPerRow = params?.maxEquivalentsPerRow ?? 50;
  const hoursTolerancePctRaw = params?.hoursTolerancePct ?? 0.15;
  const yearToleranceRaw = params?.yearTolerance ?? 1;
  const fuzzyLevelRaw = params?.fuzzyLevel ?? 1;
  const compareYear = params?.compareYear ?? true;
  const compareHours = params?.compareHours ?? true;
  const hoursTolerancePct = Math.max(0, Math.min(hoursTolerancePctRaw, 1));
  const yearTolerance = Math.max(0, Math.min(yearToleranceRaw, 10));
  const fuzzyLevel = Math.max(0, Math.min(fuzzyLevelRaw, 3));

  const [venturinoDataset, competitorsDataset] = await Promise.all([
    loadVenturinoListings(categoria),
    loadAllListings(categoria),
  ]);

  const allCompetitors = competitorsDataset.rows;
  const competitorsMissingKey = allCompetitors.filter((r) => !r.marca_norm || !r.modelo_norm).length;
  const competitorsMissingYear = allCompetitors.filter((r) => r.anio === null).length;
  const competitorsExcludedVenturino = allCompetitors.filter((r) => {
    if ((r.origen ?? "").toString().toLowerCase() === "venturino") return true;
    return isSelfCompany(r.empresa ?? null);
  }).length;

  const competitors = competitorsDataset.rows.filter((row) => {
    if (!row.marca_norm || !row.modelo_norm) return false;
    if (compareYear && row.anio === null) return false;
    if ((row.origen ?? "").toString().toLowerCase() === "venturino") return false;
    if (isSelfCompany(row.empresa ?? null)) return false;
    if (brandNorm && row.marca_norm !== brandNorm) return false;
    if (modelNorm && row.modelo_norm !== modelNorm) return false;
    return true;
  });

  const byKey = new Map<string, TractorItem[]>();
  const byBrand = new Map<string, TractorItem[]>();
  competitors.forEach((row) => {
    const key = buildKey(row);
    if (!key) return;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)?.push(row);

    const brand = row.marca_norm;
    if (!brand) return;
    if (!byBrand.has(brand)) byBrand.set(brand, []);
    byBrand.get(brand)?.push(row);
  });

  const venturinoRows = venturinoDataset.rows
    .filter((row) => {
      if (!row.marca_norm || !row.modelo_norm) return false;
      if (brandNorm && row.marca_norm !== brandNorm) return false;
      if (modelNorm && row.modelo_norm !== modelNorm) return false;
      return true;
    })
    .slice(0, maxVenturinoRows);

  const ventKeys = new Set<string>();
  venturinoRows.forEach((v) => {
    const key = buildKey(v);
    if (key) ventKeys.add(key);
  });
  const compKeys = new Set<string>();
  competitors.forEach((c) => {
    const key = buildKey(c);
    if (key) compKeys.add(key);
  });
  let sharedKeys = 0;
  ventKeys.forEach((k) => {
    if (compKeys.has(k)) sharedKeys += 1;
  });

  const matches: Analisis1VenturinoMatch[] = venturinoRows.map((v) => {
    const key = buildKey(v);
    const vBrand = v.marca_norm;
    const vModel = v.modelo_norm;

    const exactCandidates = key ? byKey.get(key) ?? [] : [];
    let candidates = exactCandidates.slice();
    if (vBrand && vModel && fuzzyLevel > 0) {
      const brandCandidates = byBrand.get(vBrand) ?? [];
      const fuzzyCandidates = brandCandidates.filter((c) => {
        if (!c.modelo_norm) return false;
        return fuzzyModelMatch(vModel, c.modelo_norm, fuzzyLevel);
      });

      if (fuzzyCandidates.length > 0) {
        const seen = new Set(candidates.map((c) => c.id));
        fuzzyCandidates.forEach((c) => {
          if (!seen.has(c.id)) candidates.push(c);
        });
      }
    }

    const vYear = v.anio;

    let filtered = candidates.filter((c) => {
      if (compareYear) {
        if (!isFiniteNumber(c.anio) || !isFiniteNumber(vYear)) return false;
        if (Math.abs(c.anio - vYear) > yearTolerance) return false;
      }

      if (compareHours && isFiniteNumber(v.horas_uso) && isFiniteNumber(c.horas_uso)) {
        return hoursWithinTolerance(v.horas_uso, c.horas_uso, hoursTolerancePct);
      }

      return true;
    });

    filtered = filtered
      .sort((a, b) => {
        const ap = a.precio_nor;
        const bp = b.precio_nor;
        if (ap === null && bp === null) return 0;
        if (ap === null) return 1;
        if (bp === null) return -1;
        return ap - bp;
      })
      .slice(0, maxEquivalentsPerRow);

    const equivalents: Analisis1Equivalent[] = filtered.map((c) => {
      const flags: string[] = [];
      if (vModel && c.modelo_norm && vModel !== c.modelo_norm) {
        flags.push("MODEL_FUZZY_MATCH");
      }
      if (!compareYear || vYear === null || c.anio === null) {
        flags.push("YEAR_NOT_COMPARED");
      }
      if (!compareHours || v.horas_uso === null || c.horas_uso === null) {
        flags.push("HOURS_NOT_COMPARED");
      }

      const vPrice = v.precio_nor;
      const cPrice = c.precio_nor;
      const diffAbs = vPrice !== null && cPrice !== null ? vPrice - cPrice : null;
      const diffPct = vPrice !== null && cPrice !== null && cPrice !== 0 ? (vPrice - cPrice) / cPrice : null;

      return {
        id: c.id,
        origen: c.origen,
        empresa: c.empresa,
        url: c.url,
        titulo: c.titulo,
        marca: c.marca,
        modelo: c.modelo,
        marca_norm: c.marca_norm,
        modelo_norm: c.modelo_norm,
        anio: c.anio,
        horas_uso: c.horas_uso,
        precio_nor: c.precio_nor,
        diff_abs_usd: diffAbs,
        diff_pct: diffPct,
        flags,
      };
    });

    return { venturino: v, equivalents };
  });

  const rankingMap = new Map<string, Map<string, number[]>>();
  matches.forEach((row) => {
    const key = buildKey(row.venturino);
    if (!key) return;
    if (!rankingMap.has(key)) rankingMap.set(key, new Map());

    row.equivalents.forEach((eq) => {
      const empresa = (eq.empresa ?? eq.origen ?? "Sin empresa").trim() || "Sin empresa";
      const price = eq.precio_nor;
      if (price === null) return;
      const byEmpresa = rankingMap.get(key);
      if (!byEmpresa) return;
      if (!byEmpresa.has(empresa)) byEmpresa.set(empresa, []);
      byEmpresa.get(empresa)?.push(price);
    });
  });

  const rankings: Analisis1ModelRanking[] = Array.from(rankingMap.entries()).map(([key, byEmpresa]) => {
    const [marcaNorm, modeloNorm] = key.split("|");
    const rows: Analisis1RankingRow[] = Array.from(byEmpresa.entries())
      .map(([empresa, prices]) => ({
        empresa,
        avgPriceUsd: avg(prices),
        n: prices.length,
      }))
      .sort((a, b) => {
        if (a.avgPriceUsd === null && b.avgPriceUsd === null) return 0;
        if (a.avgPriceUsd === null) return 1;
        if (b.avgPriceUsd === null) return -1;
        return a.avgPriceUsd - b.avgPriceUsd;
      });

    return {
      key,
      marca: marcaNorm ?? null,
      modelo: modeloNorm ?? null,
      rows,
    };
  });

  rankings.sort((a, b) => b.rows.reduce((acc, r) => acc + r.n, 0) - a.rows.reduce((acc, r) => acc + r.n, 0));

  return {
    meta: {
      generatedAt: Date.now(),
      categoria,
      venturinoCount: venturinoDataset.rows.length,
      competitorsCount: competitorsDataset.rows.length,
      params: {
        compareYear,
        compareHours,
        yearTolerance,
        hoursTolerancePct,
        fuzzyLevel,
      },
      debug: {
        venturinoWithKey: venturinoRows.length,
        competitorsWithKey: competitors.length,
        venturinoKeys: ventKeys.size,
        competitorKeys: compKeys.size,
        sharedKeys,
        competitorsMissingKey,
        competitorsMissingYear,
        competitorsExcludedVenturino,
      },
    },
    rows: matches,
    rankings,
  };
}
