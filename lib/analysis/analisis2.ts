import { loadAllListings } from "@/lib/data/loadListings";
import { markListingUnitDuplicates, type UnitDuplicateMarked } from "@/lib/dedupe/listingUnits";
import { getPercentiles } from "@/lib/stats/percentiles";
import type { TractorItem } from "@/lib/types";

export type Analisis2CompanyRow = {
  empresa: string;
  countTotal: number;
  countUniqueUnits: number;
  duplicateUnits: number;
  countWithPrice: number;
  missingPriceCount: number;
  missingPricePct: number;
  capitalUsd: number;
  priceP25: number | null;
  priceP50: number | null;
  priceP75: number | null;
  ageP25: number | null;
  ageP50: number | null;
  ageP75: number | null;
  topBrands: { marca: string; count: number }[];
  hpBuckets: { bucket: string; count: number }[];
  ageBuckets: { bucket: string; count: number }[];
  topProvinces: { provincia: string; count: number }[];
};

export type Analisis2ProvinceRow = {
  provincia: string;
  countTotal: number;
  countWithPrice: number;
  missingPriceCount: number;
  missingPricePct: number;
  capitalUsd: number;
  byEmpresa: { empresa: string; countTotal: number; capitalUsd: number }[];
};

export type Analisis2ItemRow = {
  id: string;
  origen: string | null;
  categoria: string | null;
  empresa: string;
  url: string | null;
  titulo: string | null;
  marca: string | null;
  modelo: string | null;
  anio: number | null;
  horas_uso: number | null;
  hp_motor: number | null;
  provincia: string | null;
  precio_nor: number | null;
  isUnitDuplicate: boolean;
};

export type Analisis2Response = {
  meta: {
    generatedAt: number;
    categoria: string | null;
    totalUnique: number;
    filteredUnique: number;
    competitorsUnique: number;
    dedupCount: number;
    companies: number;
    selectedCompanies: string[];
    availableCompanies: string[];
  };
  kpis: {
    totalUnits: number;
    totalUniqueUnits: number;
    totalCapitalUsd: number;
    totalMissingPricePct: number;
  };
  venturino: Analisis2CompanyRow | null;
  companies: Analisis2CompanyRow[];
  byProvince: Analisis2ProvinceRow[];
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeEmpresa(value: string | null) {
  return (value ?? "").toString().trim().toUpperCase();
}

function hasEmpresa(value: string | null) {
  return normalizeEmpresa(value).length > 0;
}

function isSelfCompany(empresa: string | null) {
  const norm = normalizeEmpresa(empresa);
  return norm.includes("VENTURINO");
}

// Marketplaces where the "empresa" is actually the platform name, not a real seller
const MARKETPLACE_ORIGINS = new Set(["rastroagro"]);

function isMarketplaceRow(row: Pick<TractorItem, "empresa" | "origen">) {
  const origen = (row.origen ?? "").toString().trim().toLowerCase();
  if (!MARKETPLACE_ORIGINS.has(origen)) return false;
  // Only exclude if there's no real empresa (empresa is null/empty or equals the origen)
  const empresa = (row.empresa ?? "").toString().trim().toLowerCase();
  return !empresa || empresa === origen;
}

function safeEmpresa(row: Pick<TractorItem, "empresa" | "origen">) {
  const base = (row.empresa ?? row.origen ?? "Sin empresa").toString().trim();
  return (base || "Sin empresa").toUpperCase();
}

function safeProvince(value: string | null) {
  const p = (value ?? "").toString().trim();
  return p || "Sin provincia";
}

function toAge(year: number, currentYear: number) {
  const age = currentYear - year;
  if (!Number.isFinite(age)) return null;
  if (age < 0 || age > 80) return null;
  return age;
}

function bucketHp(hp: number) {
  if (hp < 100) return "<100";
  if (hp < 150) return "100-149";
  if (hp < 220) return "150-219";
  return "220+";
}

function bucketAge(age: number) {
  if (age <= 5) return "0-5";
  if (age <= 10) return "6-10";
  if (age <= 15) return "11-15";
  return "16+";
}

function topNCounts(map: Map<string, number>, n: number) {
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

type TractorItemWithDup = UnitDuplicateMarked<TractorItem>;

function getCompetitorsDedup(rows: TractorItem[]): { competitorsOnly: TractorItem[]; marked: TractorItemWithDup[] } {
  const competitorsOnly = rows.filter((row) => {
    if ((row.origen ?? "").toString().toLowerCase() === "venturino") return false;
    if (!hasEmpresa(row.empresa ?? null)) return false;
    if (!isFiniteNumber(row.precio_nor)) return false;
    if (isSelfCompany(row.empresa ?? null)) return false;
    if (isMarketplaceRow(row)) return false;
    return true;
  });

  return { competitorsOnly, marked: markListingUnitDuplicates(competitorsOnly) };
}

function getVenturinoDedup(rows: TractorItem[]): { venturinoOnly: TractorItem[]; marked: TractorItemWithDup[] } {
  const venturinoOnly = rows.filter((row) => {
    if ((row.origen ?? "").toString().toLowerCase() !== "venturino") return false;
    if (!isFiniteNumber(row.precio_nor)) return false;
    return true;
  });

  return { venturinoOnly, marked: markListingUnitDuplicates(venturinoOnly) };
}

function buildCompanyRow(empresa: string, items: TractorItemWithDup[], currentYear: number): Analisis2CompanyRow {
  const uniqueItems = items.filter((x) => !x._isUnitDuplicate);
  const duplicateUnits = items.length - uniqueItems.length;
  const prices = uniqueItems.map((x) => x.precio_nor).filter((v): v is number => v !== null);
  const ages = uniqueItems
    .map((x) => (isFiniteNumber(x.anio) ? toAge(x.anio, currentYear) : null))
    .filter((v): v is number => v !== null);

  const capitalUsd = prices.reduce((acc, v) => acc + v, 0);
  const missingPriceCount = uniqueItems.length - prices.length;
  const missingPricePct = uniqueItems.length ? missingPriceCount / uniqueItems.length : 0;
  const priceP = getPercentiles(prices);
  const ageP = getPercentiles(ages);

  const brandCounts = new Map<string, number>();
  const hpCounts = new Map<string, number>();
  const ageCounts = new Map<string, number>();
  const provCounts = new Map<string, number>();

  uniqueItems.forEach((x) => {
    const brand = (x.marca_norm ?? x.marca ?? "Sin marca").toString().trim() || "Sin marca";
    brandCounts.set(brand, (brandCounts.get(brand) ?? 0) + 1);

    if (isFiniteNumber(x.hp_motor)) {
      const b = bucketHp(x.hp_motor);
      hpCounts.set(b, (hpCounts.get(b) ?? 0) + 1);
    }

    if (isFiniteNumber(x.anio)) {
      const age = toAge(x.anio, currentYear);
      if (age !== null) {
        const b = bucketAge(age);
        ageCounts.set(b, (ageCounts.get(b) ?? 0) + 1);
      }
    }

    const prov = safeProvince(x.provincia);
    provCounts.set(prov, (provCounts.get(prov) ?? 0) + 1);
  });

  const topBrands = topNCounts(brandCounts, 6).map((x) => ({ marca: x.key, count: x.count }));
  const hpBuckets = topNCounts(hpCounts, 10).map((x) => ({ bucket: x.key, count: x.count }));
  const ageBuckets = topNCounts(ageCounts, 10).map((x) => ({ bucket: x.key, count: x.count }));
  const topProvinces = topNCounts(provCounts, 8).map((x) => ({ provincia: x.key, count: x.count }));

  return {
    empresa,
    countTotal: items.length,
    countUniqueUnits: uniqueItems.length,
    duplicateUnits,
    countWithPrice: prices.length,
    missingPriceCount,
    missingPricePct,
    capitalUsd,
    priceP25: priceP.p25,
    priceP50: priceP.p50,
    priceP75: priceP.p75,
    ageP25: ageP.p25,
    ageP50: ageP.p50,
    ageP75: ageP.p75,
    topBrands,
    hpBuckets,
    ageBuckets,
    topProvinces,
  };
}

export async function computeAnalisis2(params?: { categoria?: string | null; selectedCompanies?: string[] | null }): Promise<Analisis2Response> {
  const categoria = params?.categoria ?? null;
  const selectedCompanies = (params?.selectedCompanies ?? []).filter((x) => x && x.trim().length > 0);
  const selectedSet = new Set(selectedCompanies.map((s) => s.trim()));

  const dataset = await loadAllListings(categoria, undefined, false);
  const raw = dataset.rows;

  const { marked: rows } = getCompetitorsDedup(raw);
  const { marked: venturinoRows } = getVenturinoDedup(raw);
  const availableCompanies = Array.from(new Set(rows.map((row) => safeEmpresa(row)))).sort((a, b) => a.localeCompare(b));

  const workingRows = selectedSet.size
    ? rows.filter((r) => selectedSet.has(safeEmpresa(r)))
    : rows;
  const uniqueWorkingRows = workingRows.filter((r) => !r._isUnitDuplicate);

  const currentYear = new Date().getFullYear();
  const venturino = venturinoRows.length > 0 ? buildCompanyRow("VENTURINO", venturinoRows, currentYear) : null;

  const byEmpresa = new Map<string, TractorItemWithDup[]>();
  workingRows.forEach((row) => {
    const empresa = safeEmpresa(row);
    if (!byEmpresa.has(empresa)) byEmpresa.set(empresa, []);
    byEmpresa.get(empresa)?.push(row);
  });

  const companies: Analisis2CompanyRow[] = Array.from(byEmpresa.entries()).map(([empresa, items]) => buildCompanyRow(empresa, items, currentYear));

  companies.sort((a, b) => b.countUniqueUnits - a.countUniqueUnits || b.countTotal - a.countTotal);

  const byProvinceMap = new Map<string, TractorItem[]>();
  uniqueWorkingRows.forEach((row) => {
    const prov = safeProvince(row.provincia);
    if (!byProvinceMap.has(prov)) byProvinceMap.set(prov, []);
    byProvinceMap.get(prov)?.push(row);
  });

  const byProvince: Analisis2ProvinceRow[] = Array.from(byProvinceMap.entries()).map(([provincia, items]) => {
    const prices = items.map((x) => x.precio_nor).filter((v): v is number => v !== null);
    const capitalUsd = prices.reduce((acc, v) => acc + v, 0);
    const missingPriceCount = items.length - prices.length;
    const missingPricePct = items.length ? missingPriceCount / items.length : 0;

    const byEmpresaSelected = new Map<string, { countTotal: number; capitalUsd: number }>();
    items.forEach((x) => {
      const empresa = safeEmpresa(x);
      if (!byEmpresaSelected.has(empresa)) byEmpresaSelected.set(empresa, { countTotal: 0, capitalUsd: 0 });
      const current = byEmpresaSelected.get(empresa);
      if (!current) return;
      current.countTotal += 1;
      if (x.precio_nor !== null) current.capitalUsd += x.precio_nor;
    });

    const byEmpresa = Array.from(byEmpresaSelected.entries())
      .map(([empresa, v]) => ({ empresa, countTotal: v.countTotal, capitalUsd: v.capitalUsd }))
      .sort((a, b) => b.countTotal - a.countTotal);

    return {
      provincia,
      countTotal: items.length,
      countWithPrice: prices.length,
      missingPriceCount,
      missingPricePct,
      capitalUsd,
      byEmpresa,
    };
  });

  byProvince.sort((a, b) => b.countTotal - a.countTotal);

  const totalCapitalUsd = companies.reduce((acc, c) => acc + c.capitalUsd, 0);
  const totalUnits = workingRows.length;
  const totalDedupCount = workingRows.filter((r) => r._isUnitDuplicate).length;
  const totalUniqueUnits = uniqueWorkingRows.length;
  const totalMissing = uniqueWorkingRows.reduce((acc, r) => acc + (r.precio_nor === null ? 1 : 0), 0);
  const totalUnique = rows.filter((r) => !r._isUnitDuplicate).length;

  return {
    meta: {
      generatedAt: Date.now(),
      categoria,
      totalUnique,
      filteredUnique: uniqueWorkingRows.length,
      competitorsUnique: totalUnique,
      dedupCount: totalDedupCount,
      companies: companies.length,
      selectedCompanies,
      availableCompanies,
    },
    kpis: {
      totalUnits,
      totalUniqueUnits,
      totalCapitalUsd,
      totalMissingPricePct: totalUniqueUnits ? totalMissing / totalUniqueUnits : 0,
    },
    venturino,
    companies,
    byProvince,
  };
}

export type Analisis2CategoryBreakdown = {
  categoria: string;
  count: number;
  capitalUsd: number;
};

export type Analisis2ItemsResponse = {
  empresa: string;
  categoryBreakdown: Analisis2CategoryBreakdown[];
  rows: Analisis2ItemRow[];
};

export async function listAnalisis2Items(params: { categoria?: string | null; empresa: string; limit?: number }): Promise<Analisis2ItemsResponse> {
  const empresa = params.empresa.trim();
  const limitRaw = params.limit ?? 500;
  const limit = Math.max(1, Math.min(limitRaw, 1000));

  // Always load ALL categories to show the full breakdown per company
  const dataset = await loadAllListings(null, undefined, false);
  const isVenturinoRequest = isSelfCompany(empresa);
  const { marked } = isVenturinoRequest ? getVenturinoDedup(dataset.rows) : getCompetitorsDedup(dataset.rows);

  const filtered = isVenturinoRequest ? marked : marked.filter((r) => safeEmpresa(r) === empresa);

  // Category breakdown (only unique items count toward capital)
  const catMap = new Map<string, { count: number; countUnique: number; capitalUsd: number }>();
  filtered.forEach((r) => {
    const cat = r.categoria ?? "Sin categoría";
    if (!catMap.has(cat)) catMap.set(cat, { count: 0, countUnique: 0, capitalUsd: 0 });
    const entry = catMap.get(cat)!;
    entry.count += 1;
    const isDup = r._isUnitDuplicate;
    if (!isDup) {
      entry.countUnique += 1;
      if (r.precio_nor !== null) entry.capitalUsd += r.precio_nor;
    }
  });
  const categoryBreakdown: Analisis2CategoryBreakdown[] = Array.from(catMap.entries())
    .map(([categoria, v]) => ({ categoria, count: v.count, capitalUsd: v.capitalUsd }))
    .sort((a, b) => b.capitalUsd - a.capitalUsd);

  // Sort by categoria then price desc
  filtered.sort((a, b) => {
    const catA = a.categoria ?? "";
    const catB = b.categoria ?? "";
    if (catA !== catB) return catA.localeCompare(catB);
    const ap = a.precio_nor;
    const bp = b.precio_nor;
    if (ap === null && bp === null) return 0;
    if (ap === null) return 1;
    if (bp === null) return -1;
    return bp - ap;
  });

  const rows: Analisis2ItemRow[] = filtered.slice(0, limit).map((r) => ({
    id: r.id,
    origen: r.origen,
    categoria: r.categoria,
    empresa: safeEmpresa(r),
    url: r.url,
    titulo: r.titulo,
    marca: r.marca,
    modelo: r.modelo,
    anio: r.anio,
    horas_uso: r.horas_uso,
    hp_motor: r.hp_motor,
    provincia: r.provincia,
    precio_nor: r.precio_nor,
    isUnitDuplicate: r._isUnitDuplicate,
  }));

  return { empresa, categoryBreakdown, rows };
}
