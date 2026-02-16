import { normalizeMatchText, normalizeText } from "@/lib/normalize/text";

const BRAND_EQUIVALENCES: Record<string, string> = {
  "JD": "JOHN DEERE",
  "JOHNDEERE": "JOHN DEERE",
  "JOHN DEERE": "JOHN DEERE",
  "JOHN": "JOHN DEERE",
  "CASEIH": "CASE IH",
  "CASE IH": "CASE IH",
  "CASE": "CASE IH",
  "NEW HOLLAND": "NEW HOLLAND",
  "NEW": "NEW HOLLAND",
  "NEWHOLLAND": "NEW HOLLAND",
  "MASSEYFERGUSON": "MASSEY FERGUSON",
  "MASSEY FERGUSON": "MASSEY FERGUSON",
  "MASSEY FERGUSSON": "MASSEY FERGUSON",
  "MASSEYFERGUSSON": "MASSEY FERGUSON",
  "MASSEY": "MASSEY FERGUSON",
  "DEUTZFAHR": "DEUTZ FAHR",
  "DEUTZ FAHR": "DEUTZ FAHR",
  "DEUTZ- FAHR": "DEUTZ FAHR",
  "FAHR": "DEUTZ FAHR",
  "AGCO": "AGCO ALLIS",
  "AGCOALLIS": "AGCO ALLIS",
  "VALTRA - VALMET": "VALTRA",
  "VALMET": "VALTRA",
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

const MODEL_STRIP_PREFIXES = new Set(["CIH", "CASEIH", "JHON", "DEERE"]);

const MODEL_SYNONYMS: Record<string, string> = {
  "MXM": "MAXXUM",
  "MAXXUM": "MAXXUM",
};

function normalizeModelCore(value?: string | null) {
  const match = normalizeMatchText(value ?? null);
  if (!match) return null;
  let tokens = match.split(" ").filter((t) => t.length > 0);

  // Strip brand-leak prefixes from model (e.g. "CIH MAGNUM 315" → "MAGNUM 315")
  while (tokens.length > 1 && MODEL_STRIP_PREFIXES.has(tokens[0])) {
    tokens.shift();
  }

  const filtered = tokens.filter((token) => {
    if (MODEL_SUFFIX_TOKENS.has(token)) return false;
    if (/^\d{2,3}HP$/.test(token)) return false;
    return true;
  });

  // Remove trailing pure-number tokens that look like HP values
  // e.g. "7230R 230" → "7230R", "5065ES 65" → "5065ES"
  // BUT: don't strip if preceding token is a short series prefix (T8, T7, CR, etc.)
  while (filtered.length > 1) {
    const last = filtered[filtered.length - 1];
    if (/^\d{2,3}$/.test(last)) {
      const prev = filtered[filtered.length - 2];
      // If prev is a short series prefix, the number IS the model
      if (/^[A-Z]{1,3}\d{0,2}$/.test(prev) && prev.length <= 3) break;
      // Only strip if there's already a token with a substantial model number (4+ digits)
      const hasModelNum = filtered.slice(0, -1).some((t) => /\d{4,}/.test(t));
      if (hasModelNum) {
        filtered.pop();
        continue;
      }
    }
    break;
  }

  // Apply model synonyms (e.g. MXM → MAXXUM)
  if (filtered.length > 0 && MODEL_SYNONYMS[filtered[0]]) {
    filtered[0] = MODEL_SYNONYMS[filtered[0]];
  }

  const joined = filtered.join(" ");
  if (!joined) return null;

  const tightened = joined
    .replace(/\b([A-Z]+)\s+(\d+)\b/g, "$1$2")
    .replace(/\b(\d+)\s+([A-Z]+)\b/g, "$1$2")
    // Glue alphanumeric prefix + trailing digits: "CR7 90" → "CR790"
    .replace(/\b([A-Z]+\d+)\s+(\d+)\b/g, "$1$2")
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
