export const REVIEW_STATUSES = ["unreviewed", "correct", "review", "incorrect"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  unreviewed: "Sin revisar",
  correct: "Correcta",
  review: "Requiere revisión",
  incorrect: "Incorrecta",
};

export const REVIEW_REASONS = [
  "no_references",
  "limited_sample",
  "normalization",
  "related_model",
  "price_outlier",
  "duplicate",
  "stale_data",
  "other",
] as const;
export type ReviewReason = (typeof REVIEW_REASONS)[number];

export const REVIEW_REASON_LABELS: Record<ReviewReason, string> = {
  no_references: "Sin referencias",
  limited_sample: "Muestra insuficiente",
  normalization: "Modelo mal normalizado",
  related_model: "Modelo relacionado incorrecto",
  price_outlier: "Precio atípico",
  duplicate: "Publicación duplicada",
  stale_data: "Datos desactualizados",
  other: "Otro",
};

export class ReviewValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReviewValidationError";
  }
}

export function parseReviewPayload(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ReviewValidationError("La revisión debe ser un objeto JSON.");
  }
  const body = value as Record<string, unknown>;
  const status = typeof body.status === "string" ? body.status : "";
  if (!REVIEW_STATUSES.includes(status as ReviewStatus)) {
    throw new ReviewValidationError("El estado de revisión no es válido.");
  }

  if (status === "unreviewed") {
    return {
      status: status as ReviewStatus,
      reason: null,
      notes: null,
    };
  }

  const reasonValue = typeof body.reason === "string" ? body.reason.trim() : "";
  const reason = reasonValue.length > 0 ? reasonValue : null;
  if (reason && !REVIEW_REASONS.includes(reason as ReviewReason)) {
    throw new ReviewValidationError("El motivo de revisión no es válido.");
  }

  const notesValue = typeof body.notes === "string" ? body.notes.trim() : "";
  if (notesValue.length > 1000) {
    throw new ReviewValidationError("Las notas pueden tener hasta 1000 caracteres.");
  }

  return {
    status: status as ReviewStatus,
    reason: status === "correct" ? null : reason as ReviewReason | null,
    notes: notesValue || null,
  };
}
