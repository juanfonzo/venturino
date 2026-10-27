export interface OperationalAlertConfig {
  enabled: boolean;
  environment: string;
  serviceName: string;
  release: string;
  cooldownSeconds: number;
  smtp: {
    server: string;
    port: number;
    user: string;
    password: string;
    from: string;
    recipients: string[];
  } | null;
}

const EMAIL_PATTERN = /^[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+$/;

function normalizedEnv(env: NodeJS.ProcessEnv, name: string, fallback?: string) {
  const raw = env[name] ?? fallback;
  if (raw === undefined) return "";
  let value = String(raw).trim();
  if (
    value.length >= 2
    && value[0] === value[value.length - 1]
    && (value[0] === "\"" || value[0] === "'")
  ) {
    value = value.slice(1, -1).trim();
  }
  return value;
}

function envBoolean(env: NodeJS.ProcessEnv, name: string, fallback = false) {
  const value = normalizedEnv(env, name);
  if (!value) return fallback;
  return ["1", "true", "yes", "on", "si", "sí"].includes(value.toLowerCase());
}

function positiveInteger(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function validHeaderText(value: string) {
  return value.length > 0 && !/[\r\n]/.test(value) && ![...value].some((char) => char.charCodeAt(0) < 32);
}

export function readOperationalAlertConfig(
  env: NodeJS.ProcessEnv = process.env,
): OperationalAlertConfig {
  const environment = (
    normalizedEnv(env, "APP_ENV")
    || normalizedEnv(env, "ENVIRONMENT")
    || normalizedEnv(env, "NODE_ENV")
    || "development"
  ).toLowerCase();
  const enabled = ["production", "prod"].includes(environment)
    && envBoolean(env, "ALERT_EMAIL_ENABLED", false);
  const serviceName = normalizedEnv(env, "ALERT_SERVICE_NAME", "venturino") || "venturino";
  const release = normalizedEnv(env, "APP_RELEASE", "N/D") || "N/D";
  const cooldownSeconds = positiveInteger(
    normalizedEnv(env, "ALERT_COOLDOWN_SECONDS", "900"),
    900,
  );

  const server = normalizedEnv(env, "SMTP_SERVER", "smtp.gmail.com") || "smtp.gmail.com";
  const user = normalizedEnv(env, "SMTP_USER") || normalizedEnv(env, "SMTP_USERNAME");
  const password = normalizedEnv(env, "SMTP_PASS") || normalizedEnv(env, "SMTP_PASSWORD");
  const from = normalizedEnv(env, "SMTP_FROM", user) || user;
  const recipients = (normalizedEnv(env, "SMTP_TO") || "algorym.adm@gmail.com")
    .split(/[,;]/)
    .map((value) => value.trim())
    .filter(Boolean);
  const rawPort = normalizedEnv(env, "SMTP_PORT", "587");
  const parsedPort = Number(rawPort);
  const port = Number.isInteger(parsedPort) ? parsedPort : 0;

  const smtpIsValid = Boolean(
    user
    && password
    && validHeaderText(server)
    && !/\s/.test(server)
    && port >= 1
    && port <= 65535
    && EMAIL_PATTERN.test(from)
    && recipients.length > 0
    && recipients.every((address) => EMAIL_PATTERN.test(address) && validHeaderText(address)),
  );

  return {
    enabled,
    environment,
    serviceName,
    release,
    cooldownSeconds,
    smtp: smtpIsValid
      ? { server, port, user, password, from, recipients }
      : null,
  };
}

export function getOperationalAlertStatus(env: NodeJS.ProcessEnv = process.env) {
  const config = readOperationalAlertConfig(env);
  return {
    enabled: config.enabled,
    configured: config.smtp !== null,
    environment: config.environment,
    serviceName: config.serviceName,
    recipientsCount: config.smtp?.recipients.length ?? 0,
  };
}
