export type Currency = "USD" | "ARS";
export type Estado = "Nuevo" | "Usado" | null;

export interface TractorRowRaw {
  origen?: string;
  url?: string;
  titulo?: string;
  precio?: string;
  moneda?: string;
  marca?: string;
  modelo?: string;
  hp_motor?: string;
  anio?: string;
  horas_uso?: string;
  horas?: string;
  formas_pago?: string;
  ubicacion?: string;
  condicion?: string;
  descripcion?: string;
}

export interface TractorItem {
  id: string;
  origen: string | null;
  empresa: string | null;
  url: string | null;
  titulo: string | null;
  precio_raw: string | null;
  moneda_raw: string | null;
  marca: string | null;
  modelo: string | null;
  hp_motor: number | null;
  anio: number | null;
  horas_uso: number | null;
  formas_pago: string | null;
  ubicacion: string | null;
  condicion: string | null;
  descripcion: string | null;
  precio_nor: number | null;
  moneda_norm: Currency | null;
  estado_norm: Estado;
  provincia: string | null;
  ciudad: string | null;
  marca_norm: string | null;
  modelo_norm: string | null;
  flags: string[];
}

export interface TractorsDataset {
  rows: TractorItem[];
  meta: {
    loadedAt: number;
    fileMtimeMs: number | null;
    delimiter: string;
  };
}

export interface AcaraSeriesPoint {
  yearLabel: string;
  valueUsd: number | null;
}

export interface AcaraItem {
  id: string;
  brand: string | null;
  category: string | null;
  description: string | null;
  currency: Currency | null;
  page: string | null;
  price_date: string | null;
  brand_norm: string | null;
  description_norm: string | null;
  category_norm: string | null;
  series: AcaraSeriesPoint[];
}

export interface AcaraDataset {
  items: AcaraItem[];
  meta: {
    loadedAt: number;
    fileMtimeMs: number | null;
    delimiter: string;
  };
}

export interface StatsResponse {
  kpis: {
    total: number;
    withPriceCount: number;
    withPricePct: number;
    p25: number | null;
    p50: number | null;
    p75: number | null;
  };
  byProvince: ProvinceStat[];
  byOrigin: OriginStat[];
  byEstado: EstadoStat[];
  topBrands: BrandStat[];
  topModelCombos: ModelComboStat[];
  topOpportunities: OpportunityItem[];
  suspects: TractorItem[];
}

export interface ProvinceStat {
  provincia: string;
  count: number;
  p50: number | null;
  p75: number | null;
  missingPricePct: number;
  conflictPct: number;
}

export interface OriginStat {
  origen: string;
  count: number;
  missingPricePct: number;
  missingYearPct: number;
  missingHpPct: number;
  missingLocationPct: number;
  conflictPct: number;
}

export interface EstadoStat {
  estado: string;
  count: number;
  pct: number;
}

export interface BrandStat {
  marca: string;
  count: number;
}

export interface ModelComboStat {
  key: string;
  marca: string;
  modelo: string;
  count: number;
}

export interface OpportunityItem {
  id: string;
  marca: string | null;
  modelo: string | null;
  anio: number | null;
  precio_nor: number | null;
  target_resell: number | null;
  max_buy: number | null;
  score: number | null;
  label: "Verde" | "Amarillo" | "Rojo" | "Sin dato";
}

export interface ComparablesResponse {
  n: number;
  p25: number | null;
  p50: number | null;
  p75: number | null;
  rows: TractorItem[];
  opportunity: {
    targetResell: "p50" | "p75";
    targetResellValue: number | null;
    maxBuy: number | null;
    score: number | null;
    label: "Verde" | "Amarillo" | "Rojo" | "Sin dato";
  };
}

export interface AcaraMappingValue {
  acaraItemId: string;
  createdAt: string;
}

export type AcaraMappings = Record<string, AcaraMappingValue>;

export interface AcaraGapSummary {
  count: number;
  avgGapAbs: number | null;
  avgGapPct: number | null;
  belowPct: number | null;
  abovePct: number | null;
}

export interface AcaraGapProvince {
  provincia: string;
  count: number;
  avgGapAbs: number | null;
  avgGapPct: number | null;
}

export interface AcaraGapModel {
  key: string;
  marca: string | null;
  modelo: string | null;
  count: number;
  avgGapAbs: number | null;
  avgGapPct: number | null;
}

export interface AcaraGapResponse {
  summary: AcaraGapSummary;
  byProvince: AcaraGapProvince[];
  topAbove: AcaraGapModel[];
  topBelow: AcaraGapModel[];
}
