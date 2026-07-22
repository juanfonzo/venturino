import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
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
  query: AuditInput;
}) {
  try {
    return await prisma.marketReferenceQuery.create({
      data: {
        clientId: input.clientId,
        requestId: input.requestId,
        mode: input.mode,
        categoria: input.query.categoria,
        marca: input.query.marca,
        marcaNorm: input.query.marcaNorm,
        modelo: input.query.modelo,
        modeloNorm: input.query.modeloNorm,
        anio: input.query.anio,
        page: "page" in input.query ? input.query.page : null,
        pageSize: "pageSize" in input.query ? input.query.pageSize : null,
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

export async function completeMarketReferenceAudit(input: {
  id: number;
  resultCount: number;
  resultSummary: Record<string, unknown>;
  durationMs: number;
}) {
  await prisma.marketReferenceQuery.update({
    where: { id: input.id },
    data: {
      status: "success",
      resultCount: input.resultCount,
      resultSummary: input.resultSummary as Prisma.InputJsonValue,
      durationMs: input.durationMs,
      completedAt: new Date(),
    },
  });
}

export async function failMarketReferenceAudit(input: {
  id: number;
  errorCode: string;
  durationMs: number;
}) {
  try {
    await prisma.marketReferenceQuery.update({
      where: { id: input.id },
      data: {
        status: "error",
        errorCode: input.errorCode,
        durationMs: input.durationMs,
        completedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[market-reference] No se pudo cerrar la auditoría fallida", error);
  }
}
