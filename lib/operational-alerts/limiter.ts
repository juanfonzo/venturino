export type OperationalAlertPolicy = "immediate" | "transient" | "rate_limit" | "high_volume";

export const OPERATIONAL_ALERT_POLICIES: Record<
  OperationalAlertPolicy,
  { threshold: number; windowSeconds: number }
> = {
  immediate: { threshold: 1, windowSeconds: 300 },
  transient: { threshold: 5, windowSeconds: 300 },
  rate_limit: { threshold: 3, windowSeconds: 300 },
  high_volume: { threshold: 20, windowSeconds: 300 },
};

interface AlertLimiterState {
  windowStartMs: number;
  count: number;
  sentUntilMs: number;
  suppressed: number;
}

export interface AlertLimiterDecision {
  send: boolean;
  occurrences: number;
  suppressed: number;
}

const globalForAlertLimiter = globalThis as unknown as {
  venturinoAlertLimiter?: Map<string, AlertLimiterState>;
};
const limiter = globalForAlertLimiter.venturinoAlertLimiter ?? new Map<string, AlertLimiterState>();
globalForAlertLimiter.venturinoAlertLimiter = limiter;

export function decideOperationalAlert(input: {
  fingerprint: string;
  threshold: number;
  windowSeconds: number;
  cooldownSeconds: number;
  nowMs?: number;
}): AlertLimiterDecision {
  const nowMs = input.nowMs ?? Date.now();
  const windowMs = Math.max(1, input.windowSeconds) * 1000;
  const cooldownMs = Math.max(1, input.cooldownSeconds) * 1000;
  const threshold = Math.max(1, input.threshold);
  const state = limiter.get(input.fingerprint) ?? {
    windowStartMs: nowMs,
    count: 0,
    sentUntilMs: 0,
    suppressed: 0,
  };

  if (state.sentUntilMs > nowMs) {
    state.suppressed += 1;
    limiter.set(input.fingerprint, state);
    return { send: false, occurrences: 0, suppressed: state.suppressed };
  }

  if (nowMs - state.windowStartMs >= windowMs) {
    state.windowStartMs = nowMs;
    state.count = 0;
  }

  state.count += 1;
  if (state.count < threshold) {
    limiter.set(input.fingerprint, state);
    return { send: false, occurrences: state.count, suppressed: state.suppressed };
  }

  const decision = {
    send: true,
    occurrences: state.count,
    suppressed: state.suppressed,
  };
  state.windowStartMs = nowMs;
  state.count = 0;
  state.sentUntilMs = nowMs + cooldownMs;
  state.suppressed = 0;
  limiter.set(input.fingerprint, state);
  pruneLimiter(nowMs);
  return decision;
}

export function releaseOperationalAlertCooldown(fingerprint: string) {
  const state = limiter.get(fingerprint);
  if (state) state.sentUntilMs = 0;
}

export function resetOperationalAlertLimiterForTests() {
  limiter.clear();
}

function pruneLimiter(nowMs: number) {
  if (limiter.size < 500) return;
  for (const [fingerprint, state] of limiter.entries()) {
    if (state.sentUntilMs <= nowMs && nowMs - state.windowStartMs > 24 * 60 * 60 * 1000) {
      limiter.delete(fingerprint);
    }
  }
}
