import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  completeMarketReferenceAudit,
  DuplicateMarketReferenceRequestError,
  failMarketReferenceAudit,
  markMarketReferenceAlertQueued,
  startMarketReferenceAudit,
  updateMarketReferenceAuditInput,
} from "@/lib/market-reference/audit";
import {
  PadawanwayApiAuthError,
  verifyPadawanwayRequest,
} from "@/lib/market-reference/auth";
import {
  enforceMarketReferenceRateLimit,
  MarketReferenceRateLimitError,
} from "@/lib/market-reference/rate-limit";
import {
  findDirectMarketReferences,
  MarketReferenceServiceError,
  searchExpandedMarketReferences,
} from "@/lib/market-reference/service";
import type {
  DirectReferenceInput,
  ExpandedSearchInput,
  MarketReferenceMode,
} from "@/lib/market-reference/types";
import {
  MarketReferenceValidationError,
  parseDirectReferenceInput,
  parseExpandedSearchInput,
} from "@/lib/market-reference/validation";
import { notifyOperationalAlert } from "@/lib/operational-alerts/notify";

const MAX_BODY_BYTES = 16 * 1024;
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, private",
  "Content-Type": "application/json; charset=utf-8",
};

type ParsedQuery = DirectReferenceInput | ExpandedSearchInput;

class MarketReferenceHandlerError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "MarketReferenceHandlerError";
    this.status = status;
    this.code = code;
  }
}

export async function handleMarketReferenceRequest(
  request: NextRequest,
  mode: MarketReferenceMode,
) {
  const startedAt = Date.now();
  let auditId: number | null = null;
  let requestIdForLog = "unknown";
  let failureStage = "request";
  let parsedQuery: ParsedQuery | null = null;

  try {
    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.startsWith("application/json")) {
      return apiError(415, "UNSUPPORTED_MEDIA_TYPE", "Content-Type debe ser application/json.");
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return apiError(413, "PAYLOAD_TOO_LARGE", "El cuerpo supera el límite permitido.");
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return apiError(413, "PAYLOAD_TOO_LARGE", "El cuerpo supera el límite permitido.");
    }

    failureStage = "authentication";
    const auth = verifyPadawanwayRequest(request.headers, rawBody);
    requestIdForLog = auth.requestId;

    failureStage = "audit_start";
    const audit = await startMarketReferenceAudit({
      clientId: auth.clientId,
      requestId: auth.requestId,
      mode,
      rawBody,
    });
    auditId = audit.id;

    failureStage = "rate_limit";
    enforceMarketReferenceRateLimit(auth.clientId);

    failureStage = "json_parse";
    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      throw new MarketReferenceHandlerError(400, "INVALID_JSON", "El cuerpo debe ser JSON válido.");
    }

    failureStage = "validation";
    const query = mode === "direct"
      ? parseDirectReferenceInput(parsedBody)
      : parseExpandedSearchInput(parsedBody);
    parsedQuery = query;
    await updateMarketReferenceAuditInput({ id: audit.id, query });

    failureStage = "matching";
    const result = mode === "direct"
      ? await findDirectMarketReferences(query as DirectReferenceInput, auth.requestId)
      : await searchExpandedMarketReferences(query as ExpandedSearchInput, auth.requestId);

    failureStage = "audit_complete";
    await completeMarketReferenceAudit({
      id: audit.id,
      resultCount: result.audit.resultCount,
      resultSummary: result.audit.resultSummary,
      durationMs: Date.now() - startedAt,
      algorithmVersion: result.audit.algorithmVersion,
      criterionCode: result.audit.criterionCode,
      sampleStrengthCode: result.audit.sampleStrengthCode,
    });

    return NextResponse.json(result.response, { status: 200, headers: RESPONSE_HEADERS });
  } catch (error) {
    const mapped = mapError(error);
    if (auditId !== null) {
      await failMarketReferenceAudit({
        id: auditId,
        errorCode: mapped.code,
        httpStatus: mapped.status,
        failureStage,
        durationMs: Date.now() - startedAt,
      });
    }

    if (shouldAlert(mapped.status)) {
      try {
        const alert = notifyOperationalAlert({
          code: mapped.code,
          message: mapped.message,
          severity: mapped.status >= 500 ? "P1" : "P2",
          policy: mapped.status === 429 ? "rate_limit" : "immediate",
          context: {
            component: "market-reference-api",
            operation: "search",
            requestId: requestIdForLog,
            mode,
            httpStatus: mapped.status,
            errorCode: mapped.code,
            failureStage,
            categoria: parsedQuery?.categoria,
            marca: parsedQuery?.marca,
            modelo: parsedQuery?.modelo,
            anio: parsedQuery?.anio,
            durationMs: Date.now() - startedAt,
          },
          impact: mapped.status >= 500
            ? "La API no pudo completar una consulta de referencias de mercado."
            : "La integración alcanzó el límite configurado de solicitudes.",
          action: mapped.status >= 500
            ? "Revisar el request-id y la etapa informada en el superadmin."
            : "Revisar el volumen de requests de Padawanway y la configuración del límite.",
          error,
        });
        if (alert.queued && auditId !== null) await markMarketReferenceAlertQueued(auditId);
      } catch (alertError) {
        console.warn("[market-reference] No se pudo encolar la alerta operativa", alertError);
      }
    }

    if (mapped.status >= 500) {
      console.error(`[market-reference] requestId=${requestIdForLog} stage=${failureStage}`, error);
    }
    return apiError(mapped.status, mapped.code, mapped.message, mapped.details, mapped.retryAfter);
  }
}

function mapError(error: unknown) {
  if (error instanceof MarketReferenceHandlerError) {
    return { status: error.status, code: error.code, message: error.message };
  }
  if (error instanceof PadawanwayApiAuthError) {
    return { status: error.status, code: error.code, message: error.message };
  }
  if (error instanceof MarketReferenceRateLimitError) {
    return {
      status: 429,
      code: "RATE_LIMITED",
      message: error.message,
      retryAfter: error.retryAfterSeconds,
    };
  }
  if (error instanceof MarketReferenceValidationError) {
    return {
      status: 400,
      code: "INVALID_INPUT",
      message: error.message,
      details: error.issues,
    };
  }
  if (error instanceof DuplicateMarketReferenceRequestError) {
    return { status: 409, code: "DUPLICATE_REQUEST", message: error.message };
  }
  if (error instanceof MarketReferenceServiceError) {
    return { status: error.status, code: error.code, message: error.message };
  }
  return {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "No se pudo procesar la consulta.",
  };
}

function shouldAlert(status: number) {
  return status >= 500 || status === 429;
}

function apiError(
  status: number,
  code: string,
  message: string,
  details?: string[],
  retryAfter?: number,
) {
  return NextResponse.json(
    { error: { code, message, ...(details ? { details } : {}) } },
    {
      status,
      headers: {
        ...RESPONSE_HEADERS,
        ...(retryAfter ? { "Retry-After": retryAfter.toString() } : {}),
      },
    },
  );
}
