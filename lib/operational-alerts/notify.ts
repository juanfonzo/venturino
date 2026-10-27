import { createHash } from "node:crypto";
import os from "node:os";
import {
  getOperationalAlertStatus,
  readOperationalAlertConfig,
} from "@/lib/operational-alerts/config";
import {
  decideOperationalAlert,
  OPERATIONAL_ALERT_POLICIES,
  releaseOperationalAlertCooldown,
  type OperationalAlertPolicy,
} from "@/lib/operational-alerts/limiter";
import {
  sanitizeAlertContext,
  sanitizeAlertString,
  sanitizeHeaderText,
} from "@/lib/operational-alerts/sanitize";
import { sendOperationalEmail } from "@/lib/operational-alerts/smtp";

export interface OperationalAlertInput {
  code: string;
  message: string;
  severity?: "P1" | "P2" | "P3";
  policy?: OperationalAlertPolicy;
  context?: Record<string, unknown>;
  impact?: string;
  action?: string;
  error?: unknown;
  fingerprint?: string;
}

export interface OperationalAlertQueueResult {
  queued: boolean;
  reason: "queued" | "disabled" | "misconfigured" | "threshold" | "cooldown" | "queue_full";
  fingerprint: string;
}

interface QueueItem {
  input: OperationalAlertInput;
  fingerprint: string;
  occurrences: number;
  suppressed: number;
}

interface AlertRuntime {
  active: number;
  pending: QueueItem[];
}

const MAX_CONCURRENT_DELIVERIES = 2;
const MAX_PENDING_DELIVERIES = 10;
const globalForAlerts = globalThis as unknown as { venturinoAlertRuntime?: AlertRuntime };
const runtime = globalForAlerts.venturinoAlertRuntime ?? { active: 0, pending: [] };
globalForAlerts.venturinoAlertRuntime = runtime;

export function notifyOperationalAlert(input: OperationalAlertInput): OperationalAlertQueueResult {
  const config = readOperationalAlertConfig();
  const fingerprint = buildFingerprint(input);
  if (!config.enabled) return { queued: false, reason: "disabled", fingerprint };
  if (!config.smtp) return { queued: false, reason: "misconfigured", fingerprint };

  const policy = input.policy ?? "immediate";
  const policyConfig = OPERATIONAL_ALERT_POLICIES[policy];
  const decision = decideOperationalAlert({
    fingerprint,
    threshold: policyConfig.threshold,
    windowSeconds: policyConfig.windowSeconds,
    cooldownSeconds: config.cooldownSeconds,
  });
  if (!decision.send) {
    return {
      queued: false,
      reason: decision.suppressed > 0 ? "cooldown" : "threshold",
      fingerprint,
    };
  }

  if (runtime.pending.length >= MAX_PENDING_DELIVERIES) {
    releaseOperationalAlertCooldown(fingerprint);
    console.warn(`[operational-alerts] queue full code=${sanitizeHeaderText(input.code)}`);
    return { queued: false, reason: "queue_full", fingerprint };
  }

  runtime.pending.push({
    input,
    fingerprint,
    occurrences: decision.occurrences,
    suppressed: decision.suppressed,
  });
  queueMicrotask(drainQueue);
  return { queued: true, reason: "queued", fingerprint };
}

export async function sendOperationalAlertTest(requestedBy: string) {
  const config = readOperationalAlertConfig();
  if (!config.smtp) throw new Error("La configuración SMTP está incompleta o contiene valores inválidos.");

  const now = new Date();
  await sendOperationalEmail({
    config: config.smtp,
    subject: `[P3][${config.environment.toUpperCase()}][${config.serviceName}] SMTP_TEST`,
    body: [
      "Prueba de alertas operativas de Venturino.",
      "",
      `Servicio: ${config.serviceName}`,
      `Ambiente: ${config.environment.toUpperCase()}`,
      `Release: ${config.release}`,
      `Solicitado por: ${sanitizeAlertString(requestedBy, 120)}`,
      `Fecha UTC: ${now.toISOString()}`,
      `Host: ${sanitizeAlertString(os.hostname(), 120)}`,
      "",
      "La configuración SMTP respondió correctamente.",
    ].join("\n"),
  });
}

export { getOperationalAlertStatus };

function drainQueue() {
  while (runtime.active < MAX_CONCURRENT_DELIVERIES && runtime.pending.length > 0) {
    const item = runtime.pending.shift();
    if (!item) return;
    runtime.active += 1;
    void deliver(item).finally(() => {
      runtime.active -= 1;
      drainQueue();
    });
  }
}

async function deliver(item: QueueItem) {
  const config = readOperationalAlertConfig();
  if (!config.enabled || !config.smtp) {
    releaseOperationalAlertCooldown(item.fingerprint);
    return;
  }

  const email = buildAlertEmail(item, config);
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await sendOperationalEmail({ config: config.smtp, ...email });
      console.info(`[operational-alerts] email sent code=${sanitizeHeaderText(item.input.code)}`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await delay(1000);
    }
  }

  releaseOperationalAlertCooldown(item.fingerprint);
  console.warn(
    `[operational-alerts] delivery failed code=${sanitizeHeaderText(item.input.code)} error=${sanitizeAlertString(errorMessage(lastError), 500)}`,
  );
}

function buildAlertEmail(
  item: QueueItem,
  config: ReturnType<typeof readOperationalAlertConfig>,
) {
  const severity = item.input.severity ?? "P1";
  const now = new Date();
  const argentinaTime = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(now);
  const context = sanitizeAlertContext(item.input.context ?? {});
  const error = sanitizeAlertContext(serializeError(item.input.error));
  const subject = sanitizeHeaderText(
    `[${severity}][${config.environment.toUpperCase()}][${config.serviceName}] ${item.input.code}`,
  );
  const body = [
    "Se detectó un incidente que requiere atención.",
    "",
    `Servicio: ${config.serviceName}`,
    `Ambiente: ${config.environment.toUpperCase()}`,
    `Release: ${config.release}`,
    `Código: ${sanitizeAlertString(item.input.code, 160)}`,
    `Incidente: ${item.fingerprint.slice(0, 12)}`,
    `Severidad: ${severity}`,
    `Resumen: ${sanitizeAlertString(item.input.message, 1000)}`,
    `Impacto: ${sanitizeAlertString(item.input.impact ?? "Revisar el flujo afectado.", 1000)}`,
    `Acción sugerida: ${sanitizeAlertString(item.input.action ?? "Revisar logs y datos de la consulta.", 1000)}`,
    `Fecha Argentina: ${argentinaTime}`,
    `Fecha UTC: ${now.toISOString()}`,
    `Ocurrencias para disparar: ${item.occurrences}`,
    `Ocurrencias suprimidas: ${item.suppressed}`,
    "",
    "Contexto:",
    JSON.stringify(context, null, 2),
    "",
    "Error:",
    JSON.stringify(error, null, 2),
  ].join("\n");
  return { subject, body };
}

function buildFingerprint(input: OperationalAlertInput) {
  const context = input.context ?? {};
  const material = input.fingerprint || [
    input.code,
    context.component,
    context.operation,
    context.mode,
    context.errorCode,
    context.failureStage,
    context.httpStatus,
    input.error instanceof Error ? input.error.name : "",
  ].map((value) => String(value ?? "")).join("|");
  return createHash("sha256").update(material, "utf8").digest("hex");
}

function serializeError(error: unknown) {
  if (!error) return null;
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { value: String(error) };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error ?? "Error desconocido");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
