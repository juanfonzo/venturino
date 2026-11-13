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
  MarketReferenceErrorPayload,
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
type MappedError = MarketReferenceErrorPayload & { status: number; retryAfter?: number };

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
  let clientIdForLog: string | null = null;
  let failureStage = "request";
  let parsedQuery: ParsedQuery | null = null;

  try {
    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.startsWith("application/json")) {
      return apiError(415, { code: "UNSUPPORTED_MEDIA_TYPE", message: "No pudimos leer la consulta. Revisá el formato de los datos enviados." });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return apiError(413, { code: "PAYLOAD_TOO_LARGE", message: "La consulta contiene demasiada información. Reducí los datos enviados y volvé a intentarlo." });
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return apiError(413, { code: "PAYLOAD_TOO_LARGE", message: "La consulta contiene demasiada información. Reducí los datos enviados y volvé a intentarlo." });
    }

    failureStage = "authentication";
    const auth = verifyPadawanwayRequest(request.headers, rawBody);
    requestIdForLog = auth.requestId;
    clientIdForLog = auth.clientId;

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
      throw new MarketReferenceHandlerError(400, "INVALID_JSON", "No pudimos leer los datos de la consulta. Revisalos y volvé a intentarlo.");
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
    const { status, retryAfter, ...responseError } = mapError(error);
    const isInvalidInput = responseError.code === "INVALID_INPUT";
    if (auditId !== null) {
      await failMarketReferenceAudit({
        id: auditId,
        errorCode: responseError.code,
        httpStatus: status,
        failureStage,
        durationMs: Date.now() - startedAt,
        error: responseError,
      });
    }

    if (status >= 500 || status === 429 || (isInvalidInput && auditId !== null)) {
      try {
        const alert = notifyOperationalAlert({
          code: responseError.code,
          message: isInvalidInput
            ? "Se repiten consultas de maquinaria con datos incompletos o incorrectos."
            : responseError.message,
          severity: status >= 500 ? "P1" : "P2",
          policy: isInvalidInput ? "invalid_input" : status === 429 ? "rate_limit" : "immediate",
          fingerprint: isInvalidInput
            ? `market-reference|${clientIdForLog}|${mode}|INVALID_INPUT`
            : undefined,
          context: {
            component: "market-reference-api",
            operation: "search",
            requestId: requestIdForLog,
            mode,
            httpStatus: status,
            errorCode: responseError.code,
            details: responseError.details,
            fields: responseError.fields,
            failureStage,
            categoria: parsedQuery?.categoria,
            marca: parsedQuery?.marca,
            modelo: parsedQuery?.modelo,
            anio: parsedQuery?.anio,
            durationMs: Date.now() - startedAt,
          },
          impact: isInvalidInput
            ? "Varias consultas no pudieron completarse porque faltan datos de la maquinaria o hay información incorrecta."
            : status >= 500
            ? "La API no pudo completar una consulta de referencias de mercado."
            : "La integración alcanzó el límite configurado de solicitudes.",
          action: isInvalidInput
            ? "Revisar los motivos en Administración y corregir los datos que envía el CRM antes de volver a consultar."
            : status >= 500
            ? "Revisar el request-id y la etapa informada en el superadmin."
            : "Revisar el volumen de requests de Padawanway y la configuración del límite.",
          error: isInvalidInput ? undefined : error,
        });
        if (alert.queued && auditId !== null) await markMarketReferenceAlertQueued(auditId);
      } catch (alertError) {
        console.warn("[market-reference] No se pudo encolar la alerta operativa", alertError);
      }
    }

    if (status >= 500) {
      console.error(`[market-reference] requestId=${requestIdForLog} stage=${failureStage}`, error);
    }
    return apiError(status, responseError, retryAfter);
  }
}

function mapError(error: unknown): MappedError {
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
      fields: error.fields,
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

function apiError(
  status: number,
  error: MarketReferenceErrorPayload,
  retryAfter?: number,
) {
  return NextResponse.json(
    { error },
    {
      status,
      headers: {
        ...RESPONSE_HEADERS,
        ...(retryAfter ? { "Retry-After": retryAfter.toString() } : {}),
      },
    },
  );
}
