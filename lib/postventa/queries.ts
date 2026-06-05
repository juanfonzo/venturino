import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export const POSTVENTA_STATUSES = [
  "Venturino más caro que ML",
  "Venturino más barato que ML",
  "similar a ML",
  "baja confianza",
  "sin comparable",
] as const;

export const POSTVENTA_CONFIDENCES = ["alta", "media", "baja", "descartar"] as const;

export type PostventaStatus = (typeof POSTVENTA_STATUSES)[number];
export type PostventaConfidence = (typeof POSTVENTA_CONFIDENCES)[number];

export type PostventaSummary = {
  analysisRun: PostventaAnalysisRunInfo | null;
  kpis: {
    total: number;
    comparable: number;
    noComparable: number;
    lowConfidence: number;
    actionableMoreExpensive: number;
    actionableCheaper: number;
  };
  statusCounts: Record<string, number>;
  confidenceCounts: Record<string, number>;
};

export type PostventaAnalysisRunInfo = {
  id: number;
  algorithmVersion: string;
  priceBand: number;
  similarityThreshold: number;
  topN: number;
  minScore: number;
  venturinoDate: string | null;
  mlDate: string | null;
  createdAt: string;
};

export type PostventaProductListItem = {
  id: number;
  productId: number;
  externalId: string;
  name: string;
  priceArs: number | null;
  url: string | null;
  status: string;
  medianMlPriceArs: number | null;
  ventVsMedianPct: number | null;
  bestConfidence: string;
  strongCandidateCount: number;
  totalCandidates: number;
  excludedByPrice: number;
  excludedByScore: number;
  bestCandidate: {
    name: string;
    priceArs: number | null;
    score: number;
    confidence: string;
  } | null;
};

export type PostventaProductDetail = PostventaProductListItem & {
  candidates: Array<{
    id: number;
    rank: number;
    mlProductId: number;
    mlExternalId: string;
    name: string;
    priceArs: number | null;
    url: string | null;
    score: number;
    confidence: string;
    diffPct: number | null;
    reasons: string[];
  }>;
};

export type PostventaReportData = {
  analysisRun: PostventaAnalysisRunInfo | null;
  summary: PostventaSummary;
  filters: {
    search: string | null;
    status: string | null;
    confidence: string | null;
    sortBy: string | null;
    sortDir: string | null;
  };
  total: number;
  exportedCount: number;
  truncated: boolean;
  items: Array<
    PostventaProductListItem & {
      candidates: Array<{
        id: number;
        rank: number;
        mlExternalId: string;
        name: string;
        priceArs: number | null;
        url: string | null;
        score: number;
        confidence: string;
        diffPct: number | null;
        reasons: string[];
      }>;
    }
  >;
};

export type ListPostventaProductsInput = {
  analysisRunId?: number | null;
  page?: number | null;
  pageSize?: number | null;
  search?: string | null;
  status?: string | null;
  confidence?: string | null;
  sortBy?: string | null;
  sortDir?: string | null;
  comparableOnly?: boolean | null;
};

const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;
const REPORT_MAX_ROWS = 500;
const REPORTABLE_POSTVENTA_STATUSES = [
  "Venturino más caro que ML",
  "Venturino más barato que ML",
  "similar a ML",
] as const;
const analysisRunSelect = {
  id: true,
  algorithmVersion: true,
  priceBand: true,
  similarityThreshold: true,
  topN: true,
  minScore: true,
  venturinoDate: true,
  mlDate: true,
  createdAt: true,
} satisfies Prisma.PostventaAnalysisRunSelect;

type AnalysisRunRow = Prisma.PostventaAnalysisRunGetPayload<{ select: typeof analysisRunSelect }>;

export async function getPostventaSummary(analysisRunId?: number | null): Promise<PostventaSummary> {
  const analysisRun = await resolveAnalysisRun(analysisRunId);
  if (!analysisRun) return emptySummary();

  const [statusRows, confidenceRows] = await Promise.all([
    prisma.postventaProductAnalysis.groupBy({
      by: ["status"],
      where: { analysisRunId: analysisRun.id },
      _count: { _all: true },
    }),
    prisma.postventaProductAnalysis.groupBy({
      by: ["bestConfidence"],
      where: { analysisRunId: analysisRun.id },
      _count: { _all: true },
    }),
  ]);

  const statusCounts = Object.fromEntries(statusRows.map((row) => [row.status, row._count._all]));
  const confidenceCounts = Object.fromEntries(
    confidenceRows.map((row) => [row.bestConfidence, row._count._all]),
  );
  const total = sumCounts(statusCounts);
  const noComparable = statusCounts["sin comparable"] || 0;
  const lowConfidence = statusCounts["baja confianza"] || 0;

  return {
    analysisRun: toAnalysisRunInfo(analysisRun),
    kpis: {
      total,
      comparable: total - noComparable,
      noComparable,
      lowConfidence,
      actionableMoreExpensive: statusCounts["Venturino más caro que ML"] || 0,
      actionableCheaper: statusCounts["Venturino más barato que ML"] || 0,
    },
    statusCounts,
    confidenceCounts,
  };
}

export async function listPostventaProducts(input: ListPostventaProductsInput = {}) {
  const analysisRun = await resolveAnalysisRun(input.analysisRunId);
  if (!analysisRun) {
    return {
      analysisRun: null,
      items: [] as PostventaProductListItem[],
      total: 0,
      page: 1,
      pageSize: normalizePageSize(input.pageSize),
    };
  }

  const page = normalizePage(input.page);
  const pageSize = normalizePageSize(input.pageSize);
  const where = buildProductAnalysisWhere(analysisRun.id, input);
  const orderBy = buildProductAnalysisOrderBy(input.sortBy, input.sortDir);

  const [total, rows] = await Promise.all([
    prisma.postventaProductAnalysis.count({ where }),
    prisma.postventaProductAnalysis.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        venturinoProduct: true,
        candidates: {
          orderBy: { rank: "asc" },
          take: 1,
          include: { mlProduct: true },
        },
      },
    }),
  ]);

  return {
    analysisRun: toAnalysisRunInfo(analysisRun),
    items: rows.map(toListItem),
    total,
    page,
    pageSize,
  };
}

export async function getPostventaProductDetail(id: number): Promise<PostventaProductDetail | null> {
  if (!Number.isInteger(id) || id <= 0) return null;

  const row = await prisma.postventaProductAnalysis.findUnique({
    where: { id },
    include: {
      venturinoProduct: true,
      candidates: {
        orderBy: { rank: "asc" },
        include: { mlProduct: true },
      },
    },
  });

  if (!row) return null;
  return {
    ...toListItem(row),
    candidates: row.candidates.map((candidate) => ({
      id: candidate.id,
      rank: candidate.rank,
      mlProductId: candidate.mlProductId,
      mlExternalId: candidate.mlProduct.externalId,
      name: candidate.mlProduct.name,
      priceArs: decimalToNumber(candidate.mlPriceArs),
      url: candidate.mlProduct.url,
      score: candidate.score,
      confidence: candidate.confidence,
      diffPct: decimalToNumber(candidate.diffPct),
      reasons: Array.isArray(candidate.reasons) ? candidate.reasons.map(String) : [],
    })),
  };
}

export async function getPostventaReportData(
  input: Omit<ListPostventaProductsInput, "page" | "pageSize"> = {},
): Promise<PostventaReportData> {
  const analysisRun = await resolveAnalysisRun(input.analysisRunId);
  const summary = await getPostventaSummary(analysisRun?.id ?? null);

  if (!analysisRun) {
    return {
      analysisRun: null,
      summary,
      filters: toReportFilters(input),
      total: 0,
      exportedCount: 0,
      truncated: false,
      items: [],
    };
  }

  const where = buildProductAnalysisWhere(analysisRun.id, { ...input, comparableOnly: true });
  const orderBy = buildProductAnalysisOrderBy(input.sortBy, input.sortDir);
  const [total, rows] = await Promise.all([
    prisma.postventaProductAnalysis.count({ where }),
    prisma.postventaProductAnalysis.findMany({
      where,
      orderBy,
      take: REPORT_MAX_ROWS,
      include: {
        venturinoProduct: true,
        candidates: {
          orderBy: { rank: "asc" },
          take: 3,
          include: { mlProduct: true },
        },
      },
    }),
  ]);

  return {
    analysisRun: toAnalysisRunInfo(analysisRun),
    summary,
    filters: toReportFilters(input),
    total,
    exportedCount: rows.length,
    truncated: total > rows.length,
    items: rows.map((row) => ({
      ...toListItem(row),
      candidates: row.candidates.map((candidate) => ({
        id: candidate.id,
        rank: candidate.rank,
        mlExternalId: candidate.mlProduct.externalId,
        name: candidate.mlProduct.name,
        priceArs: decimalToNumber(candidate.mlPriceArs),
        url: candidate.mlProduct.url,
        score: candidate.score,
        confidence: candidate.confidence,
        diffPct: decimalToNumber(candidate.diffPct),
        reasons: Array.isArray(candidate.reasons) ? candidate.reasons.map(String) : [],
      })),
    })),
  };
}

async function resolveAnalysisRun(id?: number | null) {
  if (id && Number.isInteger(id) && id > 0) {
    return prisma.postventaAnalysisRun.findUnique({
      where: { id },
      select: analysisRunSelect,
    });
  }

  return prisma.postventaAnalysisRun.findFirst({
    where: { status: "success" },
    orderBy: { createdAt: "desc" },
    select: analysisRunSelect,
  });
}

function buildProductAnalysisWhere(
  analysisRunId: number,
  input: ListPostventaProductsInput,
): Prisma.PostventaProductAnalysisWhereInput {
  const and: Prisma.PostventaProductAnalysisWhereInput[] = [{ analysisRunId }];

  if (input.status && POSTVENTA_STATUSES.includes(input.status as PostventaStatus)) {
    and.push({ status: input.status });
  }

  if (input.confidence && POSTVENTA_CONFIDENCES.includes(input.confidence as PostventaConfidence)) {
    and.push({ bestConfidence: input.confidence });
  }

  if (input.comparableOnly) {
    and.push({ status: { in: [...REPORTABLE_POSTVENTA_STATUSES] } });
  }

  const tokens = tokenizeSearch(input.search);
  tokens.forEach((token) => {
    const variants = searchTokenVariants(token);
    and.push({
      venturinoProduct: {
        OR: variants.flatMap((variant) => [
          { name: { contains: variant, mode: "insensitive" } },
          { externalId: { contains: variant, mode: "insensitive" } },
        ]),
      },
    });
  });

  return { AND: and };
}

function buildProductAnalysisOrderBy(sortBy?: string | null, sortDir?: string | null) {
  const direction: Prisma.SortOrder = sortDir === "asc" ? "asc" : "desc";
  if (sortBy === "name") return [{ venturinoProduct: { name: direction } }, { id: "asc" as Prisma.SortOrder }];
  if (sortBy === "priceArs") {
    return [{ venturinoProduct: { priceArs: direction } }, { id: "asc" as Prisma.SortOrder }];
  }
  if (sortBy === "status") return [{ status: direction }, { id: "asc" as Prisma.SortOrder }];
  if (sortBy === "confidence") return [{ bestConfidence: direction }, { id: "asc" as Prisma.SortOrder }];
  if (!sortBy || sortBy === "comparableFirst") {
    return [
      { totalCandidates: "desc" as Prisma.SortOrder },
      { strongCandidateCount: "desc" as Prisma.SortOrder },
      { ventVsMedianPct: "desc" as Prisma.SortOrder },
      { id: "asc" as Prisma.SortOrder },
    ];
  }
  return [{ ventVsMedianPct: direction }, { id: "asc" as Prisma.SortOrder }];
}

function toListItem(
  row: Prisma.PostventaProductAnalysisGetPayload<{
    include: {
      venturinoProduct: true;
      candidates: { include: { mlProduct: true } };
    };
  }>,
): PostventaProductListItem {
  const bestCandidate = row.candidates[0] || null;
  return {
    id: row.id,
    productId: row.venturinoProductId,
    externalId: row.venturinoProduct.externalId,
    name: row.venturinoProduct.name,
    priceArs: decimalToNumber(row.venturinoProduct.priceArs),
    url: row.venturinoProduct.url,
    status: row.status,
    medianMlPriceArs: decimalToNumber(row.medianMlPriceArs),
    ventVsMedianPct: decimalToNumber(row.ventVsMedianPct),
    bestConfidence: row.bestConfidence,
    strongCandidateCount: row.strongCandidateCount,
    totalCandidates: row.totalCandidates,
    excludedByPrice: row.excludedByPrice,
    excludedByScore: row.excludedByScore,
    bestCandidate: bestCandidate
      ? {
          name: bestCandidate.mlProduct.name,
          priceArs: decimalToNumber(bestCandidate.mlPriceArs),
          score: bestCandidate.score,
          confidence: bestCandidate.confidence,
        }
      : null,
  };
}

function toAnalysisRunInfo(row: AnalysisRunRow): PostventaAnalysisRunInfo {
  return {
    id: row.id,
    algorithmVersion: row.algorithmVersion,
    priceBand: decimalToNumber(row.priceBand) ?? 0,
    similarityThreshold: decimalToNumber(row.similarityThreshold) ?? 0.1,
    topN: row.topN,
    minScore: row.minScore,
    venturinoDate: formatDate(row.venturinoDate),
    mlDate: formatDate(row.mlDate),
    createdAt: row.createdAt.toISOString(),
  };
}

function emptySummary(): PostventaSummary {
  return {
    analysisRun: null,
    kpis: {
      total: 0,
      comparable: 0,
      noComparable: 0,
      lowConfidence: 0,
      actionableMoreExpensive: 0,
      actionableCheaper: 0,
    },
    statusCounts: {},
    confidenceCounts: {},
  };
}

function normalizePage(value?: number | null) {
  if (!value || !Number.isFinite(value)) return 1;
  return Math.max(1, Math.floor(value));
}

function normalizePageSize(value?: number | null) {
  if (!value || !Number.isFinite(value)) return DEFAULT_PAGE_SIZE;
  return Math.max(1, Math.min(Math.floor(value), MAX_PAGE_SIZE));
}

function tokenizeSearch(value?: string | null) {
  return (value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .slice(0, 6);
}

function searchTokenVariants(token: string) {
  const variants = new Set([token]);
  const synonyms: Record<string, string[]> = {
    jhon: ["john"],
    herramientas: ["herramienta"],
    llaves: ["llave"],
    correas: ["correa"],
    filtros: ["filtro"],
    baterias: ["bateria"],
    aceites: ["aceite"],
  };

  synonyms[token]?.forEach((value) => variants.add(value));
  if (token.length > 4 && token.endsWith("es")) variants.add(token.slice(0, -2));
  if (token.length > 4 && token.endsWith("s")) variants.add(token.slice(0, -1));
  return Array.from(variants).filter((value) => value.length >= 2);
}

function decimalToNumber(value: Prisma.Decimal | null | undefined) {
  return value ? value.toNumber() : null;
}

function formatDate(value: Date | null) {
  return value ? value.toISOString().slice(0, 10) : null;
}

function sumCounts(counts: Record<string, number>) {
  return Object.values(counts).reduce((acc, value) => acc + value, 0);
}

function toReportFilters(input: Omit<ListPostventaProductsInput, "page" | "pageSize">) {
  return {
    search: input.search?.trim() || null,
    status: input.status && POSTVENTA_STATUSES.includes(input.status as PostventaStatus) ? input.status : null,
    confidence:
      input.confidence && POSTVENTA_CONFIDENCES.includes(input.confidence as PostventaConfidence)
        ? input.confidence
        : null,
    sortBy: input.sortBy || null,
    sortDir: input.sortDir === "asc" ? "asc" : "desc",
  };
}
