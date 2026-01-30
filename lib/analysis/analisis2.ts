import { loadTractors } from "@/lib/data/loadTractors";
import { getPercentiles } from "@/lib/stats/percentiles";
import type { TractorItem } from "@/lib/types";

export type Analisis2CompanyRow = {
  empresa: string;
  countTotal: number;
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
};

export type Analisis2Response = {
  meta: {
    generatedAt: number;
    totalUnique: number;
    filteredUnique: number;
    competitorsUnique: number;
    companies: number;
    selectedCompanies: string[];
  };
  kpis: {
    totalUnits: number;
    totalCapitalUsd: number;
    totalMissingPricePct: number;
  };
  companies: Analisis2CompanyRow[];
  byProvince: Analisis2ProvinceRow[];
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeEmpresa(value: string | null) {
  return (value ?? "").toString().trim().toUpperCase();
}

function isSelfCompany(empresa: string | null) {
  const norm = normalizeEmpresa(empresa);
  return norm.includes("VENTURINO");
}

function uniqKey(row: Pick<TractorItem, "url" | "id">) {
  const url = (row.url ?? "").toString().trim();
  if (url) return `url:${url}`;
  return `id:${row.id}`;
}

function safeEmpresa(row: Pick<TractorItem, "empresa" | "origen">) {
  const base = (row.empresa ?? row.origen ?? "Sin empresa").toString().trim();
  return base || "Sin empresa";
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

function getCompetitorsDedup(rows: TractorItem[]) {
  const competitorsOnly = rows.filter((row) => {
    if ((row.origen ?? "").toString().toLowerCase() === "venturino") return false;
    if (isSelfCompany(row.empresa ?? null)) return false;
    return true;
  });

  const dedup = new Map<string, TractorItem>();
  competitorsOnly.forEach((row) => {
    const key = uniqKey(row);
    if (!dedup.has(key)) dedup.set(key, row);
  });

  return { competitorsOnly, deduped: Array.from(dedup.values()) };
}

export async function computeAnalisis2(params?: { selectedCompanies?: string[] | null }): Promise<Analisis2Response> {
  const selectedCompanies = (params?.selectedCompanies ?? []).filter((x) => x && x.trim().length > 0);
  const selectedSet = new Set(selectedCompanies.map((s) => s.trim()));

  const dataset = await loadTractors();
  const raw = dataset.rows;

  const { competitorsOnly, deduped: rows } = getCompetitorsDedup(raw);

  const workingRows = selectedSet.size
    ? rows.filter((r) => selectedSet.has(safeEmpresa(r)))
    : rows;

  const currentYear = new Date().getFullYear();

  const byEmpresa = new Map<string, TractorItem[]>();
  workingRows.forEach((row) => {
    const empresa = safeEmpresa(row);
    if (!byEmpresa.has(empresa)) byEmpresa.set(empresa, []);
    byEmpresa.get(empresa)?.push(row);
  });

  const companies: Analisis2CompanyRow[] = Array.from(byEmpresa.entries()).map(([empresa, items]) => {
    const prices = items.map((x) => x.precio_nor).filter((v): v is number => v !== null);
    const ages = items
      .map((x) => (isFiniteNumber(x.anio) ? toAge(x.anio, currentYear) : null))
      .filter((v): v is number => v !== null);

    const capitalUsd = prices.reduce((acc, v) => acc + v, 0);

    const missingPriceCount = items.length - prices.length;
    const missingPricePct = items.length ? missingPriceCount / items.length : 0;

    const priceP = getPercentiles(prices);
    const ageP = getPercentiles(ages);

    const brandCounts = new Map<string, number>();
    const hpCounts = new Map<string, number>();
    const ageCounts = new Map<string, number>();
    const provCounts = new Map<string, number>();

    items.forEach((x) => {
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
  });

  companies.sort((a, b) => b.countTotal - a.countTotal);

  const byProvinceMap = new Map<string, TractorItem[]>();
  workingRows.forEach((row) => {
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
  const totalMissing = workingRows.reduce((acc, r) => acc + (r.precio_nor === null ? 1 : 0), 0);

  return {
    meta: {
      generatedAt: Date.now(),
      totalUnique: rows.length,
      filteredUnique: workingRows.length,
      competitorsUnique: competitorsOnly.length,
      companies: companies.length,
      selectedCompanies,
    },
    kpis: {
      totalUnits,
      totalCapitalUsd,
      totalMissingPricePct: totalUnits ? totalMissing / totalUnits : 0,
    },
    companies,
    byProvince,
  };
}

export async function listAnalisis2Items(params: { empresa: string; limit?: number }): Promise<{ empresa: string; rows: Analisis2ItemRow[] }> {
  const empresa = params.empresa.trim();
  const limitRaw = params.limit ?? 200;
  const limit = Math.max(1, Math.min(limitRaw, 500));

  const dataset = await loadTractors();
  const { deduped } = getCompetitorsDedup(dataset.rows);

  const filtered = deduped.filter((r) => safeEmpresa(r) === empresa);

  filtered.sort((a, b) => {
    const ap = a.precio_nor;
    const bp = b.precio_nor;
    if (ap === null && bp === null) return 0;
    if (ap === null) return 1;
    if (bp === null) return -1;
    return bp - ap;
  });

  const rows = filtered.slice(0, limit).map((r) => ({
    id: r.id,
    origen: r.origen,
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
  }));

  return { empresa, rows };
}
