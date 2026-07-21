export const MARKET_CATEGORIES = [
  "Tractores",
  "Cosechadoras",
  "Sembradoras",
  "Pulverizadoras",
] as const;

export type MarketCategory = (typeof MARKET_CATEGORIES)[number];
export type MarketReferenceMode = "direct" | "expanded";

export interface CommercialLabel {
  codigo: string;
  titulo: string;
  detalle: string;
}

export interface DirectReferenceInput {
  categoria: MarketCategory;
  marca: string;
  marcaNorm: string;
  modelo: string;
  modeloNorm: string;
  modeloDisplay: string;
  familiaModelo: string | null;
  familiaDisplay: string | null;
  configuracion: string[];
  anio: number;
  externalOperationId: string | null;
}

export interface ExpandedSearchInput {
  categoria: MarketCategory;
  marca: string | null;
  marcaNorm: string | null;
  modelo: string;
  modeloNorm: string;
  modeloDisplay: string;
  familiaModelo: string | null;
  familiaDisplay: string | null;
  configuracion: string[];
  anio: number | null;
  page: number;
  pageSize: number;
  externalOperationId: string | null;
}

export interface MarketReferenceCandidate {
  listingId: number;
  source: string;
  seller: string | null;
  title: string | null;
  brand: string | null;
  brandNorm: string | null;
  model: string | null;
  modelNorm: string | null;
  modelKey: string | null;
  modelDisplay: string | null;
  modelQualifiers: string[];
  year: number | null;
  priceUsd: number;
  province: string | null;
  city: string | null;
  url: string;
}

export interface MarketReferenceStatistics {
  currency: "USD";
  sampleSize: number;
  min: number | null;
  p25: number | null;
  median: number | null;
  p75: number | null;
  max: number | null;
}

export interface MarketReferenceItem {
  id: string;
  source: string;
  title: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  price: {
    amount: number;
    currency: "USD";
  };
  seller: string | null;
  province: string | null;
  city: string | null;
  url: string;
  coincidencia: CommercialLabel & {
    diferenciaAnios: number | null;
  };
  configuracion: string[];
}

export interface DirectReferenceResponse {
  requestId: string;
  mode: "direct";
  query: {
    categoria: MarketCategory;
    marca: string;
    modelo: string;
    modeloCanonico: string;
    configuracion: string[];
    anio: number;
  };
  statistics: MarketReferenceStatistics;
  references: MarketReferenceItem[];
  criterioAplicado: CommercialLabel;
  solidezMuestra: CommercialLabel;
  expandedSearchRecommended: boolean;
  busquedaAmpliadaSugerida: {
    marca: string;
    modelo: string;
    etiqueta: string;
  } | null;
}

export interface ExpandedSearchResponse {
  requestId: string;
  mode: "expanded";
  query: {
    categoria: MarketCategory;
    marca: string | null;
    modelo: string;
    modeloCanonico: string;
    configuracion: string[];
    anio: number | null;
  };
  statistics: MarketReferenceStatistics;
  references: MarketReferenceItem[];
  criterioAplicado: CommercialLabel;
  solidezMuestra: CommercialLabel;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface MarketReferenceServiceResult<T> {
  response: T;
  audit: {
    resultCount: number;
    resultSummary: Record<string, unknown>;
  };
}
