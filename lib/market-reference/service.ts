import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { normalizeMachineIdentity } from "@/lib/normalize/machineIdentity";
import {
  buildDirectSearchTokens,
  buildMarketReferenceStatistics,
  buildSampleStrength,
  buildSearchTokens,
  rankExpandedCandidates,
  selectDirectCandidates,
  toMarketReferenceItem,
} from "@/lib/market-reference/matching";
import type {
  DirectReferenceInput,
  DirectReferenceResponse,
  ExpandedSearchInput,
  ExpandedSearchResponse,
  MarketReferenceCandidate,
  MarketReferenceServiceResult,
} from "@/lib/market-reference/types";

const DIRECT_REFERENCE_LIMIT = 50;
const DEFAULT_NEAR_YEAR_TOLERANCE = 2;
const DEFAULT_EXTENDED_YEAR_TOLERANCE = 5;
const DEFAULT_DESIRED_SAMPLE_SIZE = 3;
const MAX_CANDIDATE_SET = 5_000;

const REFERENCE_SELECT = {
  id: true,
  origen: true,
  vendedor: true,
  titulo: true,
  marca: true,
  marcaNorm: true,
  modelo: true,
  modeloNorm: true,
  categoria: true,
  anio: true,
  hp: true,
  precioUsd: true,
  provincia: true,
  ciudad: true,
  url: true,
} satisfies Prisma.ListingSelect;

type ReferenceRow = Prisma.ListingGetPayload<{ select: typeof REFERENCE_SELECT }>;

export class MarketReferenceServiceError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "MarketReferenceServiceError";
    this.status = status;
    this.code = code;
  }
}

export async function findDirectMarketReferences(
  input: DirectReferenceInput,
  requestId: string,
): Promise<MarketReferenceServiceResult<DirectReferenceResponse>> {
  const modelTokens = buildDirectSearchTokens(input.modeloNorm);
  const rows = await prisma.listing.findMany({
    where: {
      ...baseMarketWhere(input.categoria),
      marcaNorm: input.marcaNorm,
      AND: modelTokens.map((token) => ({
        OR: [
          { modeloNorm: { contains: token, mode: "insensitive" } },
          { modelo: { contains: token, mode: "insensitive" } },
          { titulo: { contains: token, mode: "insensitive" } },
        ],
      })),
    },
    select: REFERENCE_SELECT,
    orderBy: [{ anio: "desc" }, { precioUsd: "asc" }, { id: "asc" }],
    take: MAX_CANDIDATE_SET + 1,
  });
  assertCandidateSetIsBounded(rows.length);

  const nearYearTolerance = readBoundedInteger(
    process.env.MARKET_REFERENCE_YEAR_TOLERANCE,
    DEFAULT_NEAR_YEAR_TOLERANCE,
    0,
    10,
  );
  const extendedYearTolerance = readBoundedInteger(
    process.env.MARKET_REFERENCE_EXTENDED_YEAR_TOLERANCE,
    DEFAULT_EXTENDED_YEAR_TOLERANCE,
    nearYearTolerance,
    20,
  );
  const desiredSampleSize = readBoundedInteger(
    process.env.MARKET_REFERENCE_DESIRED_SAMPLE_SIZE,
    DEFAULT_DESIRED_SAMPLE_SIZE,
    1,
    10,
  );
  const selection = selectDirectCandidates(rows.map(toCandidate), {
    modelNorm: input.modeloNorm,
    year: input.anio,
    nearYearTolerance,
    extendedYearTolerance,
    desiredSampleSize,
  });
  const candidates = selection.candidates;
  const statistics = buildMarketReferenceStatistics(candidates);
  const references = candidates.slice(0, DIRECT_REFERENCE_LIMIT).map((candidate) => (
    toMarketReferenceItem(candidate, {
      mode: "direct",
      targetModel: input.modeloNorm,
      targetYear: input.anio,
    })
  ));
  const expandedSearchRecommended = statistics.sampleSize < desiredSampleSize;
  const expandedSearchSuggestion = input.familiaModelo && input.familiaDisplay
    ? {
        marca: input.marca,
        modelo: input.familiaModelo,
        etiqueta: `Buscar modelos de ${input.familiaDisplay}`,
      }
    : null;

  return {
    response: {
      requestId,
      mode: "direct",
      query: {
        categoria: input.categoria,
        marca: input.marca,
        modelo: input.modelo,
        modeloCanonico: input.modeloDisplay,
        configuracion: input.configuracion,
        anio: input.anio,
      },
      statistics,
      references,
      criterioAplicado: selection.criterion,
      solidezMuestra: buildSampleStrength(statistics.sampleSize),
      expandedSearchRecommended,
      busquedaAmpliadaSugerida: expandedSearchSuggestion,
    },
    audit: {
      resultCount: statistics.sampleSize,
      resultSummary: {
        statistics,
        criterion: selection.criterion,
        yearScope: selection.yearScope,
        nearYearTolerance,
        extendedYearTolerance,
        desiredSampleSize,
        returnedListingIds: candidates.slice(0, DIRECT_REFERENCE_LIMIT).map((row) => row.listingId),
        responseSnapshot: references,
      },
    },
  };
}

export async function searchExpandedMarketReferences(
  input: ExpandedSearchInput,
  requestId: string,
): Promise<MarketReferenceServiceResult<ExpandedSearchResponse>> {
  const tokens = buildSearchTokens(input.modeloNorm, input.familiaModelo);
  if (tokens.length === 0) {
    throw new MarketReferenceServiceError(
      400,
      "INVALID_MODEL_SEARCH",
      "El modelo no contiene términos buscables.",
    );
  }

  const where: Prisma.ListingWhereInput = {
    ...baseMarketWhere(input.categoria),
    ...(input.marcaNorm ? { marcaNorm: input.marcaNorm } : {}),
    OR: tokens.flatMap((token) => [
          { modeloNorm: { contains: token, mode: "insensitive" } },
          { modelo: { contains: token, mode: "insensitive" } },
          { titulo: { contains: token, mode: "insensitive" } },
    ]),
  };

  const rows = await prisma.listing.findMany({
    where,
    select: REFERENCE_SELECT,
    orderBy: [{ anio: "desc" }, { precioUsd: "asc" }, { id: "asc" }],
    take: MAX_CANDIDATE_SET + 1,
  });
  assertCandidateSetIsBounded(rows.length);

  const candidates = rankExpandedCandidates(rows.map(toCandidate), {
    modelNorm: input.modeloNorm,
    familyKey: input.familiaModelo,
    year: input.anio,
  });
  const total = candidates.length;
  const totalPages = Math.ceil(total / input.pageSize);
  const offset = (input.page - 1) * input.pageSize;
  const pageCandidates = candidates.slice(offset, offset + input.pageSize);
  const statistics = buildMarketReferenceStatistics(candidates);
  const references = pageCandidates.map((candidate) => toMarketReferenceItem(candidate, {
    mode: "expanded",
    targetModel: input.modeloNorm,
    targetYear: input.anio,
  }));
  const criterion = {
    codigo: "BUSQUEDA_AMPLIADA",
    titulo: "Referencias de modelos relacionados",
    detalle: "Resultados ordenados por cercanía con el modelo y el año buscados.",
  };

  return {
    response: {
      requestId,
      mode: "expanded",
      query: {
        categoria: input.categoria,
        marca: input.marca,
        modelo: input.modelo,
        modeloCanonico: input.modeloDisplay,
        configuracion: input.configuracion,
        anio: input.anio,
      },
      statistics,
      references,
      criterioAplicado: criterion,
      solidezMuestra: buildSampleStrength(total),
      pagination: {
        page: input.page,
        pageSize: input.pageSize,
        total,
        totalPages,
        hasNextPage: input.page < totalPages,
      },
    },
    audit: {
      resultCount: total,
      resultSummary: {
        statistics,
        criterion,
        page: input.page,
        pageSize: input.pageSize,
        returnedListingIds: pageCandidates.map((row) => row.listingId),
        responseSnapshot: references,
      },
    },
  };
}

function baseMarketWhere(categoria: DirectReferenceInput["categoria"]): Prisma.ListingWhereInput {
  return {
    active: true,
    categoria,
    condicion: "Usado",
    precioUsd: { gte: 1_000 },
  };
}

function toCandidate(row: ReferenceRow): MarketReferenceCandidate {
  const identity = normalizeMachineIdentity({
    category: row.categoria,
    brand: row.marcaNorm ?? row.marca,
    model: row.modelo,
    title: row.titulo,
    hp: row.hp === null ? null : Number(row.hp),
  });
  return {
    listingId: row.id,
    source: row.origen,
    seller: row.vendedor,
    title: row.titulo,
    brand: row.marca,
    brandNorm: row.marcaNorm,
    model: row.modelo,
    modelNorm: row.modeloNorm,
    modelKey: identity.modelKey,
    modelDisplay: identity.modelDisplay,
    modelQualifiers: identity.qualifiers,
    year: row.anio,
    priceUsd: Number(row.precioUsd),
    province: row.provincia,
    city: row.ciudad,
    url: row.url,
  };
}

function assertCandidateSetIsBounded(count: number) {
  if (count > MAX_CANDIDATE_SET) {
    throw new MarketReferenceServiceError(
      422,
      "SEARCH_TOO_BROAD",
      "La búsqueda es demasiado amplia. Agregá más detalle al modelo.",
    );
  }
}

function readBoundedInteger(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number,
) {
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
}
