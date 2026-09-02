import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { sanitizeRequestBody } from "@/lib/operational-alerts/sanitize";
import type {
  DirectReferenceInput,
  ExpandedSearchInput,
  MarketReferenceMode,
} from "@/lib/market-reference/types";

type AuditInput = DirectReferenceInput | ExpandedSearchInput;

export class DuplicateMarketReferenceRequestError extends Error {
  constructor() {
    super("El request-id ya fue utilizado.");
    this.name = "DuplicateMarketReferenceRequestError";
  }
}

export async function startMarketReferenceAudit(input: {
  clientId: string;
  requestId: string;
  mode: MarketReferenceMode;
  rawBody: string;
}) {
  try {
    return await prisma.marketReferenceQuery.create({
      data: {
        clientId: input.clientId,
        requestId: input.requestId,
        mode: input.mode,
        requestPayload: sanitizeRequestBody(input.rawBody) as Prisma.InputJsonValue,
      },
      select: { id: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new DuplicateMarketReferenceRequestError();
    }
    throw error;
  }
}

export async function updateMarketReferenceAuditInput(input: {
  id: number;
  query: AuditInput;
}) {
  await prisma.marketReferenceQuery.update({
    where: { id: input.id },
    data: {
      categoria: input.query.categoria,
      marca: input.query.marca,
      marcaNorm: input.query.marcaNorm,
      modelo: input.query.modelo,
      modeloNorm: input.query.modeloNorm,
      anio: input.query.anio,
      page: "page" in input.query ? input.query.page : null,
      pageSize: "pageSize" in input.query ? input.query.pageSize : null,
    },
  });
}

export async function completeMarketReferenceAudit(input: {
  id: number;
  resultCount: number;
  resultSummary: Record<string, unknown>;
  durationMs: number;
  algorithmVersion: string;
  criterionCode: string;
  sampleStrengthCode: string;
}) {
  await prisma.marketReferenceQuery.update({
    where: { id: input.id },
    data: {
      status: "success",
      httpStatus: 200,
      failureStage: null,
      resultCount: input.resultCount,
      resultSummary: input.resultSummary as Prisma.InputJsonValue,
      durationMs: input.durationMs,
      algorithmVersion: input.algorithmVersion,
      criterionCode: input.criterionCode,
      sampleStrengthCode: input.sampleStrengthCode,
      completedAt: new Date(),
    },
  });
}

export async function failMarketReferenceAudit(input: {
  id: number;
  errorCode: string;
  httpStatus: number;
  failureStage: string;
  durationMs: number;
}) {
  try {
    await prisma.marketReferenceQuery.update({
      where: { id: input.id },
      data: {
        status: "error",
        errorCode: input.errorCode,
        httpStatus: input.httpStatus,
        failureStage: input.failureStage,
        durationMs: input.durationMs,
        completedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[market-reference] No se pudo cerrar la auditoría fallida", error);
  }
}

export async function markMarketReferenceAlertQueued(id: number) {
  try {
    await prisma.marketReferenceQuery.update({
      where: { id },
      data: { alertQueuedAt: new Date() },
    });
  } catch (error) {
    console.error("[market-reference] No se pudo registrar la alerta encolada", error);
  }
}
