import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  completeMarketReferenceAudit,
  DuplicateMarketReferenceRequestError,
  failMarketReferenceAudit,
  startMarketReferenceAudit,
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
import type { MarketReferenceMode } from "@/lib/market-reference/types";
import {
  MarketReferenceValidationError,
  parseDirectReferenceInput,
  parseExpandedSearchInput,
} from "@/lib/market-reference/validation";

const MAX_BODY_BYTES = 16 * 1024;
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, private",
  "Content-Type": "application/json; charset=utf-8",
};

export async function handleMarketReferenceRequest(
  request: NextRequest,
  mode: MarketReferenceMode,
) {
  const startedAt = Date.now();
  let auditId: number | null = null;
  let requestIdForLog = "unknown";

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

    const auth = verifyPadawanwayRequest(request.headers, rawBody);
    enforceMarketReferenceRateLimit(auth.clientId);
    requestIdForLog = auth.requestId;

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return apiError(400, "INVALID_JSON", "El cuerpo debe ser JSON válido.");
    }

    const query = mode === "direct"
      ? parseDirectReferenceInput(parsedBody)
      : parseExpandedSearchInput(parsedBody);

    const audit = await startMarketReferenceAudit({
      clientId: auth.clientId,
      requestId: auth.requestId,
      mode,
      query,
    });
    auditId = audit.id;

    const result = mode === "direct"
      ? await findDirectMarketReferences(query as ReturnType<typeof parseDirectReferenceInput>, auth.requestId)
      : await searchExpandedMarketReferences(
          query as ReturnType<typeof parseExpandedSearchInput>,
          auth.requestId,
        );

    await completeMarketReferenceAudit({
      id: audit.id,
      resultCount: result.audit.resultCount,
      resultSummary: result.audit.resultSummary,
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json(result.response, { status: 200, headers: RESPONSE_HEADERS });
  } catch (error) {
    const mapped = mapError(error);
    if (auditId !== null) {
      await failMarketReferenceAudit({
        id: auditId,
        errorCode: mapped.code,
        durationMs: Date.now() - startedAt,
      });
    }
    if (mapped.status >= 500) {
      console.error(`[market-reference] requestId=${requestIdForLog}`, error);
    }
    return apiError(mapped.status, mapped.code, mapped.message, mapped.details, mapped.retryAfter);
  }
}

function mapError(error: unknown) {
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
