import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { ReviewStatus } from "@/lib/superadmin/review";

export interface MarketReferenceListFilters {
  page: number;
  pageSize: number;
  query: string;
  status: string;
  mode: string;
  categoria: string;
  reviewStatus: string;
  dateFrom: string;
  dateTo: string;
}

export function parseMarketReferenceListFilters(
  searchParams: Record<string, string | string[] | undefined>,
): MarketReferenceListFilters {
  return {
    page: boundedInteger(single(searchParams.page), 1, 10_000, 1),
    pageSize: 25,
    query: single(searchParams.q).trim().slice(0, 120),
    status: allowed(single(searchParams.status), ["success", "error", "processing"]),
    mode: allowed(single(searchParams.mode), ["direct", "expanded"]),
    categoria: allowed(single(searchParams.categoria), [
      "Tractores",
      "Cosechadoras",
      "Sembradoras",
      "Pulverizadoras",
    ]),
    reviewStatus: allowed(single(searchParams.review), [
      "unreviewed",
      "correct",
      "review",
      "incorrect",
    ]),
    dateFrom: validDate(single(searchParams.desde)),
    dateTo: validDate(single(searchParams.hasta)),
  };
}

export async function getMarketReferenceOverview(days: number) {
  const normalizedDays = [7, 30, 90].includes(days) ? days : 30;
  const since = new Date(Date.now() - normalizedDays * 24 * 60 * 60 * 1000);
  const periodWhere = { createdAt: { gte: since } } satisfies Prisma.MarketReferenceQueryWhereInput;

  const [
    total,
    success,
    errors,
    noReferences,
    limitedSamples,
    pendingReview,
    durationAverage,
    durationRows,
    recentErrors,
  ] = await Promise.all([
    prisma.marketReferenceQuery.count({ where: periodWhere }),
    prisma.marketReferenceQuery.count({ where: { ...periodWhere, status: "success" } }),
    prisma.marketReferenceQuery.count({ where: { ...periodWhere, status: "error" } }),
    prisma.marketReferenceQuery.count({
      where: { ...periodWhere, status: "success", resultCount: 0 },
    }),
    prisma.marketReferenceQuery.count({
      where: { ...periodWhere, status: "success", resultCount: { in: [1, 2] } },
    }),
    prisma.marketReferenceQuery.count({
      where: { ...periodWhere, status: "success", reviewStatus: "unreviewed" },
    }),
    prisma.marketReferenceQuery.aggregate({
      where: periodWhere,
      _avg: { durationMs: true },
    }),
    prisma.marketReferenceQuery.findMany({
      where: { ...periodWhere, durationMs: { not: null } },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 10_000,
      select: { durationMs: true },
    }),
    prisma.marketReferenceQuery.findMany({
      where: { status: "error" },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 8,
      select: {
        id: true,
        requestId: true,
        mode: true,
        categoria: true,
        marca: true,
        modelo: true,
        errorCode: true,
        failureStage: true,
        httpStatus: true,
        createdAt: true,
      },
    }),
  ]);

  const durations = durationRows
    .map((row) => row.durationMs)
    .filter((value): value is number => value !== null)
    .sort((left, right) => left - right);

  return {
    days: normalizedDays,
    total,
    success,
    errors,
    noReferences,
    limitedSamples,
    pendingReview,
    successRate: total > 0 ? success / total : 0,
    averageDurationMs: Math.round(durationAverage._avg.durationMs ?? 0),
    p95DurationMs: percentile(durations, 0.95),
    recentErrors,
  };
}

export async function listMarketReferenceQueries(filters: MarketReferenceListFilters) {
  const where = buildWhere(filters);
  const total = await prisma.marketReferenceQuery.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const page = Math.min(filters.page, totalPages);
  const rows = await prisma.marketReferenceQuery.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip: (page - 1) * filters.pageSize,
    take: filters.pageSize,
    select: {
      id: true,
      requestId: true,
      mode: true,
      categoria: true,
      marca: true,
      modelo: true,
      anio: true,
      status: true,
      httpStatus: true,
      resultCount: true,
      errorCode: true,
      durationMs: true,
      reviewStatus: true,
      criterionCode: true,
      sampleStrengthCode: true,
      createdAt: true,
    },
  });

  return { rows, total, page, pageSize: filters.pageSize, totalPages };
}

export async function getMarketReferenceQueryById(id: number) {
  return prisma.marketReferenceQuery.findUnique({ where: { id } });
}

export async function updateMarketReferenceReview(input: {
  id: number;
  status: ReviewStatus;
  reason: string | null;
  notes: string | null;
  reviewedBy: string;
}) {
  return prisma.marketReferenceQuery.update({
    where: { id: input.id },
    data: input.status === "unreviewed"
      ? {
          reviewStatus: "unreviewed",
          reviewReason: null,
          reviewNotes: null,
          reviewedAt: null,
          reviewedBy: null,
        }
      : {
          reviewStatus: input.status,
          reviewReason: input.reason,
          reviewNotes: input.notes,
          reviewedAt: new Date(),
          reviewedBy: input.reviewedBy,
        },
  });
}

function buildWhere(filters: MarketReferenceListFilters): Prisma.MarketReferenceQueryWhereInput {
  const and: Prisma.MarketReferenceQueryWhereInput[] = [];
  for (const token of searchTokens(filters.query)) {
    and.push({
      OR: [
        { requestId: { contains: token, mode: "insensitive" } },
        { marca: { contains: token, mode: "insensitive" } },
        { modelo: { contains: token, mode: "insensitive" } },
      ],
    });
  }
  if (filters.status) and.push({ status: filters.status });
  if (filters.mode) and.push({ mode: filters.mode });
  if (filters.categoria) and.push({ categoria: filters.categoria });
  if (filters.reviewStatus) and.push({ reviewStatus: filters.reviewStatus });

  const createdAt: { gte?: Date; lt?: Date } = {};
  if (filters.dateFrom) createdAt.gte = argentinaDateStart(filters.dateFrom);
  if (filters.dateTo) createdAt.lt = argentinaDateAfter(filters.dateTo);
  if (createdAt.gte || createdAt.lt) and.push({ createdAt });

  return and.length > 0 ? { AND: and } : {};
}

function searchTokens(value: string) {
  return [...new Set(value.split(/\s+/).map((token) => token.trim()).filter(Boolean))].slice(0, 8);
}

function percentile(values: number[], quantile: number) {
  if (values.length === 0) return 0;
  const index = Math.min(values.length - 1, Math.ceil(values.length * quantile) - 1);
  return values[Math.max(0, index)] ?? 0;
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function boundedInteger(value: string, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
}

function allowed(value: string, values: string[]) {
  return values.includes(value) ? value : "";
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? "" : value;
}

function argentinaDateStart(date: string) {
  return new Date(`${date}T00:00:00.000-03:00`);
}

function argentinaDateAfter(date: string) {
  const start = argentinaDateStart(date);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000);
}
