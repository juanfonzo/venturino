import { normalizeMatchText, normalizeText } from "@/lib/normalize/text";

const BRAND_EQUIVALENCES: Record<string, string> = {
  "JD": "JOHN DEERE",
  "JOHNDEERE": "JOHN DEERE",
  "JOHN DEERE": "JOHN DEERE",
  "CASEIH": "CASE IH",
  "CASE IH": "CASE IH",
  "NEW HOLLAND": "NEW HOLLAND",
  "MASSEYFERGUSON": "MASSEY FERGUSON",
  "MASSEY FERGUSON": "MASSEY FERGUSON",
  "DEUTZFAHR": "DEUTZ FAHR",
  "DEUTZ FAHR": "DEUTZ FAHR",
};

const MODEL_SUFFIX_TOKENS = new Set([
  "4WD",
  "4X4",
  "4X2",
  "2WD",
  "2WD.",
  "DT",
  "DUAL",
  "DOBLE",
  "SIMPLE",
  "TRACCION",
  "ROD",
  "RD",
  "CAB",
  "CABINA",
  "CABINADO",
  "PLUS",
  "FULL",
  "PREMIUM",
  "POWER",
  "MOD",
  "MODELO",
  "AÑO",
  "ANO",
  "HP",
]);

function normalizeBrandCore(value?: string | null) {
  const raw = normalizeText(value ?? null);
  if (!raw) return null;
  const compact = raw.replace(/\s+/g, "");
  return BRAND_EQUIVALENCES[raw] ?? BRAND_EQUIVALENCES[compact] ?? raw;
}

function normalizeModelCore(value?: string | null) {
  const match = normalizeMatchText(value ?? null);
  if (!match) return null;
  const tokens = match.split(" ").filter((t) => t.length > 0);
  const filtered = tokens.filter((token) => {
    if (MODEL_SUFFIX_TOKENS.has(token)) return false;
    if (/^\d{2,3}HP$/.test(token)) return false;
    return true;
  });
  const joined = filtered.join(" ");
  if (!joined) return null;

  const tightened = joined
    .replace(/\b([A-Z]+)\s+(\d+)\b/g, "$1$2")
    .replace(/\b(\d+)\s+([A-Z]+)\b/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();

  return tightened || null;
}

export function normalizeBrandModelParts(brand?: string | null, model?: string | null) {
  const brandNorm = normalizeBrandCore(brand ?? null);
  const modelNorm = normalizeModelCore(model ?? null);
  return {
    brandNorm,
    modelNorm,
  };
}

export function inferModelFromTitle(title?: string | null, brand?: string | null) {
  const titleMatch = normalizeMatchText(title ?? null);
  if (!titleMatch) return null;
  const brandMatch = normalizeMatchText(brand ?? null);

  let tokens = titleMatch.split(" ").filter((t) => t.length > 0);
  tokens = tokens.filter((t) => t !== "TRACTOR");

  if (brandMatch) {
    const brandTokens = new Set(brandMatch.split(" ").filter((t) => t.length > 0));
    tokens = tokens.filter((t) => !brandTokens.has(t));
  }

  const idx = tokens.findIndex((t) => /\d/.test(t));
  if (idx < 0) return null;

  const out: string[] = [];

  if (idx - 1 >= 0) {
    const prev = tokens[idx - 1];
    if (
      /^[A-Z]+$/.test(prev) &&
      prev.length >= 2 &&
      !MODEL_SUFFIX_TOKENS.has(prev) &&
      prev !== "CON" &&
      prev !== "SIN" &&
      prev !== "DEL" &&
      prev !== "DE" &&
      prev !== "LA" &&
      prev !== "EL"
    ) {
      out.push(prev);
    }
  }

  for (let i = idx; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (/^(19\d{2}|20\d{2})$/.test(t)) break;
    if (t === "MOD" || t === "MODELO") break;

    if (t === "HP" || /^\d{2,3}HP$/.test(t)) break;
    if (/^\d{1,2}(?:\.\d+)?X\d{1,2}$/i.test(t)) break;

    out.push(t);
    if (out.length >= 4) break;
  }

  const guess = out.join(" ");
  return normalizeModelCore(guess);
}
