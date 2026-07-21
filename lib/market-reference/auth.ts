import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_MAX_SKEW_SECONDS = 300;
const MIN_SECRET_LENGTH = 32;
const REQUEST_ID_PATTERN = /^[A-Za-z0-9._:-]{8,120}$/;

type HeaderReader = {
  get(name: string): string | null;
};

export interface PadwayAuthContext {
  clientId: string;
  requestId: string;
}

export class PadwayApiAuthError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "PadwayApiAuthError";
    this.status = status;
    this.code = code;
  }
}

export function verifyPadwayRequest(
  headers: HeaderReader,
  rawBody: string,
  options?: { nowMs?: number; env?: NodeJS.ProcessEnv },
): PadwayAuthContext {
  const env = options?.env ?? process.env;
  const enabled = env.PADWAY_API_ENABLED?.toLowerCase() === "true";
  const configuredClientId = env.PADWAY_API_CLIENT_ID?.trim() ?? "";
  const secret = env.PADWAY_API_SECRET ?? "";

  if (!enabled || !configuredClientId || secret.length < MIN_SECRET_LENGTH) {
    throw new PadwayApiAuthError(
      503,
      "SERVICE_NOT_CONFIGURED",
      "La integración no está habilitada.",
    );
  }

  const clientId = headers.get("x-client-id")?.trim() ?? "";
  const timestamp = headers.get("x-timestamp")?.trim() ?? "";
  const requestId = headers.get("x-request-id")?.trim() ?? "";
  const signature = headers.get("x-signature")?.trim() ?? "";

  if (!safeEqualText(clientId, configuredClientId)) {
    throw unauthorized();
  }
  if (!REQUEST_ID_PATTERN.test(requestId)) {
    throw unauthorized();
  }

  const timestampSeconds = Number(timestamp);
  const maxSkewSeconds = parsePositiveInt(
    env.PADWAY_API_MAX_SKEW_SECONDS,
    DEFAULT_MAX_SKEW_SECONDS,
  );
  const nowSeconds = Math.floor((options?.nowMs ?? Date.now()) / 1000);
  if (!Number.isInteger(timestampSeconds) || Math.abs(nowSeconds - timestampSeconds) > maxSkewSeconds) {
    throw new PadwayApiAuthError(401, "REQUEST_EXPIRED", "La solicitud venció.");
  }

  const expected = createPadwaySignature({ secret, timestamp, requestId, rawBody });
  const received = signature.startsWith("sha256=") ? signature.slice(7) : signature;
  if (!/^[a-f0-9]{64}$/i.test(received) || !safeEqualHex(received, expected)) {
    throw unauthorized();
  }

  return { clientId, requestId };
}

export function createPadwaySignature(input: {
  secret: string;
  timestamp: string;
  requestId: string;
  rawBody: string;
}) {
  const canonical = `${input.timestamp}\n${input.requestId}\n${input.rawBody}`;
  return createHmac("sha256", input.secret).update(canonical, "utf8").digest("hex");
}

function unauthorized() {
  return new PadwayApiAuthError(401, "UNAUTHORIZED", "No autorizado.");
}

function safeEqualText(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function safeEqualHex(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
