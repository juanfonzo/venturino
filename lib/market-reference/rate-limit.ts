const DEFAULT_LIMIT_PER_MINUTE = 60;
const WINDOW_MS = 60_000;

type RateBucket = {
  startedAt: number;
  count: number;
};

const buckets = new Map<string, RateBucket>();

export class MarketReferenceRateLimitError extends Error {
  readonly retryAfterSeconds: number;

  constructor(retryAfterSeconds: number) {
    super("Se alcanzó el límite de solicitudes.");
    this.name = "MarketReferenceRateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export function enforceMarketReferenceRateLimit(
  identifier: string,
  options?: { nowMs?: number; env?: NodeJS.ProcessEnv },
) {
  const now = options?.nowMs ?? Date.now();
  const env = options?.env ?? process.env;
  const limit = parsePositiveInt(
    env.PADAWANWAY_API_RATE_LIMIT_PER_MINUTE,
    DEFAULT_LIMIT_PER_MINUTE,
  );
  const key = identifier || "unknown";
  const existing = buckets.get(key);

  if (!existing || now - existing.startedAt >= WINDOW_MS) {
    buckets.set(key, { startedAt: now, count: 1 });
    pruneExpiredBuckets(now);
    return;
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((WINDOW_MS - (now - existing.startedAt)) / 1000));
    throw new MarketReferenceRateLimitError(retryAfterSeconds);
  }

  existing.count += 1;
}

export function resetMarketReferenceRateLimitForTests() {
  buckets.clear();
}

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 500) return;
  buckets.forEach((bucket, key) => {
    if (now - bucket.startedAt >= WINDOW_MS) buckets.delete(key);
  });
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
