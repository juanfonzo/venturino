export function normalizeText(value?: string | null) {
  if (!value) return null;
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

export function normalizeMatchText(value?: string | null) {
  if (!value) return null;
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

export function normalizeLoose(value?: string | null) {
  if (!value) return null;
  return value.toString().replace(/\s+/g, " ").trim();
}
