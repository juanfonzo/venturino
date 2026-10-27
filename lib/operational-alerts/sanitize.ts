const SENSITIVE_KEY = /(?:token|secret|signature|password|authorization|api[_-]?key|credential|database_url|mongodb_uri|smtp[_-]?(?:pass|password)|jwt)/i;
const BEARER_VALUE = /bearer\s+[a-z0-9._~+/=-]+/gi;
const GENERIC_SECRET_QUERY = /(access_token|app_secret|api_key|password|smtp_pass)=([^&\s]+)/gi;
const MONGO_CREDENTIALS = /(mongodb(?:\+srv)?:\/\/)[^@\s/]+@/gi;
const POSTGRES_CREDENTIALS = /((?:postgresql|postgres):\/\/)[^@\s/]+@/gi;
const HMAC_SIGNATURE = /\bsha256=[a-f0-9]{64}\b/gi;
const JWT_LIKE = /\beyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/g;

export function sanitizeAlertString(value: string, maxLength = 2000) {
  const sanitized = value
    .replace(BEARER_VALUE, "Bearer [REDACTED]")
    .replace(GENERIC_SECRET_QUERY, (_match, key: string) => `${key}=[REDACTED]`)
    .replace(MONGO_CREDENTIALS, "$1[REDACTED]@")
    .replace(POSTGRES_CREDENTIALS, "$1[REDACTED]@")
    .replace(HMAC_SIGNATURE, "sha256=[REDACTED]")
    .replace(JWT_LIKE, "[REDACTED_JWT]");
  return sanitized.length > maxLength
    ? `${sanitized.slice(0, maxLength)}… [truncado]`
    : sanitized;
}

export function sanitizeHeaderText(value: string, maxLength = 180) {
  return sanitizeAlertString(value, maxLength).replace(/[\r\n]+/g, " ").trim();
}

export function sanitizeAlertContext(
  value: unknown,
  options: { key?: string; depth?: number } = {},
): unknown {
  const depth = options.depth ?? 0;
  const key = options.key ?? "";
  if (depth > 5) return "[MAX_DEPTH]";
  if (key && SENSITIVE_KEY.test(key)) return "[REDACTED]";

  if (Array.isArray(value)) {
    return value.slice(0, 25).map((item) => sanitizeAlertContext(item, { depth: depth + 1 }));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .slice(0, 60)
        .map(([itemKey, itemValue]) => [
          itemKey,
          sanitizeAlertContext(itemValue, { key: itemKey, depth: depth + 1 }),
        ]),
    );
  }
  if (typeof value === "string") return sanitizeAlertString(value);
  if (value === null || ["boolean", "number"].includes(typeof value)) return value;
  if (value === undefined) return null;
  return sanitizeAlertString(String(value));
}

export function sanitizeRequestBody(rawBody: string) {
  try {
    const sanitized = sanitizeAlertContext(JSON.parse(rawBody));
    return sanitized === null ? { value: null } : sanitized;
  } catch {
    return { raw: sanitizeAlertString(rawBody, 4000) };
  }
}
