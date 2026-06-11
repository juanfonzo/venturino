import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import {
  DEFAULT_POSTVENTA_MIN_SCORE,
  DEFAULT_POSTVENTA_PRICE_BAND,
  DEFAULT_POSTVENTA_SIMILARITY_THRESHOLD,
  DEFAULT_POSTVENTA_TOP_N,
  POSTVENTA_ALGORITHM_VERSION,
  buildPostventaMatch,
  normalizePostventaAnalysisOptions,
  withPostventaFeatures,
  type AnalyzePostventaOptions,
  type MatchConfidence,
  type MatchStatus,
  type PostventaComparableProduct,
} from "@/lib/postventa/matching";

export type PostventaAnalysisSummary = {
  statusCounts: Record<MatchStatus, number>;
  confidenceCounts: Record<Exclude<MatchConfidence, "descartar">, number>;
  totalCandidates: number;
  venturinoProducts: number;
  mlProducts: number;
};

export type RunPostventaAnalysisResult = {
  analysisRunId: number;
  algorithmVersion: string;
  options: {
    topN: number;
    priceBand: number;
    minScore: number;
    similarityThreshold: number;
  };
  summary: PostventaAnalysisSummary;
};

type DbPostventaProduct = {
  id: number;
  source: string;
  externalId: string;
  name: string;
  priceArs: Prisma.Decimal | null;
  url: string | null;
  installmentTotalArs: Prisma.Decimal | null;
  installmentsQuantity: number | null;
  freeShipping: boolean | null;
};

const EMPTY_STATUS_COUNTS: Record<MatchStatus, number> = {
  "Venturino más caro que ML": 0,
  "Venturino más barato que ML": 0,
  "sin comparable": 0,
  "baja confianza": 0,
  "similar a ML": 0,
};

const EMPTY_CONFIDENCE_COUNTS: Record<Exclude<MatchConfidence, "descartar">, number> = {
  alta: 0,
  media: 0,
  baja: 0,
};

export async function runPostventaAnalysis(optionsInput: AnalyzePostventaOptions = {}): Promise<RunPostventaAnalysisResult> {
  const options = normalizePostventaAnalysisOptions(optionsInput);

  const [latestImportRun, venturinoRows, mlRows] = await Promise.all([
    prisma.postventaImportRun.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        venturinoDate: true,
        mlDate: true,
      },
    }),
    prisma.postventaProduct.findMany({
      where: { source: "venturino", active: true },
      select: productSelect,
      orderBy: { name: "asc" },
    }),
    prisma.postventaProduct.findMany({
      where: { source: "ml", active: true },
      select: productSelect,
      orderBy: { name: "asc" },
    }),
  ]);

  if (venturinoRows.length === 0) {
    throw new Error("No hay productos Venturino activos para analizar.");
  }
  if (mlRows.length === 0) {
    throw new Error("No hay productos ML activos para analizar.");
  }

  const venturinoProducts = venturinoRows.map(toComparableProduct).map(withPostventaFeatures);
  const mlProducts = mlRows.map(toComparableProduct).map(withPostventaFeatures);

  const analysisRun = await prisma.postventaAnalysisRun.create({
    data: {
      importRunId: latestImportRun?.id ?? null,
      algorithmVersion: POSTVENTA_ALGORITHM_VERSION,
      priceBand: options.priceBand,
      similarityThreshold: options.similarityThreshold,
      topN: options.topN,
      minScore: options.minScore,
      venturinoDate: latestImportRun?.venturinoDate ?? null,
      mlDate: latestImportRun?.mlDate ?? null,
      status: "running",
    },
    select: { id: true },
  });

  const summary = createEmptySummary({
    venturinoProducts: venturinoProducts.length,
    mlProducts: mlProducts.length,
  });

  try {
    for (const product of venturinoProducts) {
      const match = buildPostventaMatch(product, mlProducts, options);
      summary.statusCounts[match.status] += 1;
      summary.totalCandidates += match.candidates.length;
      match.candidates.forEach((candidate) => {
        summary.confidenceCounts[candidate.confidence] += 1;
      });

      const productAnalysis = await prisma.postventaProductAnalysis.create({
        data: {
          analysisRunId: analysisRun.id,
          venturinoProductId: product.id,
          status: match.status,
          medianMlPriceArs: match.medianMlPriceArs,
          ventVsMedianPct: match.ventVsMedianPct,
          bestConfidence: match.bestConfidence,
          strongCandidateCount: match.strongCandidateCount,
          totalCandidates: match.candidates.length,
          excludedByPrice: match.excludedByPrice,
          excludedByScore: match.excludedByScore,
        },
        select: { id: true },
      });

      if (match.candidates.length > 0) {
        await prisma.postventaMatchCandidate.createMany({
          data: match.candidates.map((candidate, index) => ({
            productAnalysisId: productAnalysis.id,
            mlProductId: candidate.mlProductId,
            rank: index + 1,
            score: candidate.score,
            confidence: candidate.confidence,
            mlPriceArs: candidate.priceArs,
            mlInstallmentTotalArs: candidate.installmentTotalArs,
            mlInstallmentsQuantity: candidate.installmentsQuantity,
            mlFreeShipping: candidate.freeShipping,
            diffPct: candidate.diffPct,
            reasons: candidate.reasons,
          })),
        });
      }
    }

    await prisma.postventaAnalysisRun.update({
      where: { id: analysisRun.id },
      data: {
        status: "success",
        summary: summary as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      analysisRunId: analysisRun.id,
      algorithmVersion: POSTVENTA_ALGORITHM_VERSION,
      options,
      summary,
    };
  } catch (error) {
    await prisma.postventaAnalysisRun.update({
      where: { id: analysisRun.id },
      data: {
        status: "failed",
        summary: {
          error: error instanceof Error ? error.message : "Error desconocido",
        },
      },
    });
    throw error;
  }
}

const productSelect = {
  id: true,
  source: true,
  externalId: true,
  name: true,
  priceArs: true,
  url: true,
  installmentTotalArs: true,
  installmentsQuantity: true,
  freeShipping: true,
} satisfies Prisma.PostventaProductSelect;

function toComparableProduct(row: DbPostventaProduct): PostventaComparableProduct {
  if (row.source !== "venturino" && row.source !== "ml") {
    throw new Error(`Origen postventa inválido: ${row.source}`);
  }

  return {
    id: row.id,
    source: row.source,
    externalId: row.externalId,
    name: row.name,
    priceArs: row.priceArs ? row.priceArs.toNumber() : null,
    url: row.url,
    installmentTotalArs: row.installmentTotalArs ? row.installmentTotalArs.toNumber() : null,
    installmentsQuantity: row.installmentsQuantity,
    freeShipping: row.freeShipping,
  };
}

function createEmptySummary(params: { venturinoProducts: number; mlProducts: number }): PostventaAnalysisSummary {
  return {
    statusCounts: { ...EMPTY_STATUS_COUNTS },
    confidenceCounts: { ...EMPTY_CONFIDENCE_COUNTS },
    totalCandidates: 0,
    venturinoProducts: params.venturinoProducts,
    mlProducts: params.mlProducts,
  };
}

export const DEFAULT_PERSISTED_POSTVENTA_ANALYSIS_OPTIONS = {
  topN: DEFAULT_POSTVENTA_TOP_N,
  priceBand: DEFAULT_POSTVENTA_PRICE_BAND,
  minScore: DEFAULT_POSTVENTA_MIN_SCORE,
  similarityThreshold: DEFAULT_POSTVENTA_SIMILARITY_THRESHOLD,
};
