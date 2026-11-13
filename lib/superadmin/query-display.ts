const ERROR_TITLES: Record<string, string> = {
  INVALID_INPUT: "Datos incompletos o incorrectos",
  INVALID_JSON: "No se pudieron leer los datos",
  INVALID_MODEL_SEARCH: "Modelo sin identificar",
  RATE_LIMITED: "Demasiadas consultas",
  DUPLICATE_REQUEST: "Consulta repetida",
  INTERNAL_ERROR: "No se pudo completar la consulta",
};

export function describeMarketReferenceError(query: {
  errorCode: string | null;
  resultSummary: unknown;
}) {
  const saved = asRecord(asRecord(query.resultSummary).error);
  const title = ERROR_TITLES[query.errorCode ?? ""] ?? "No se pudo completar la consulta";
  const message = text(saved.message) ?? (query.errorCode === "INVALID_INPUT"
    ? "La consulta contiene datos incompletos o incorrectos."
    : title);
  const details = Array.isArray(saved.details)
    ? saved.details.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];

  return { title, message, details, explanation: details.length > 0 ? details.join(" ") : message };
}

export function getMarketReferenceMachine(query: {
  marca: string | null;
  modelo: string | null;
  categoria: string | null;
  anio?: number | null;
  requestPayload: unknown;
}) {
  // La validación puede fallar antes de guardar los campos de la consulta.
  const received = asRecord(query.requestPayload);
  const brand = text(query.marca) ?? text(received.marca);
  const model = text(query.modelo) ?? text(received.modelo);
  const category = text(query.categoria) ?? text(received.categoria);
  const rawYear = query.anio ?? received.anio;
  const year = (typeof rawYear === "number" || typeof rawYear === "string")
    && /^\d{4}$/.test(String(rawYear).trim()) ? Number(rawYear) : null;

  return { brand, model, category, year, label: [brand, model].filter(Boolean).join(" ") || "Maquinaria sin identificar" };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function text(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim().slice(0, 500) : null;
}
