import type { Currency } from "@/lib/types";

export const FALLBACK_FX_RATE = 1500;

const USD_PATTERNS = ["U$", "U$S", "US$", "USD"];
const ARS_PATTERNS = ["$", "ARS"];

export function normalizeCurrency(input?: string | null, priceRaw?: string | null): Currency | null {
  const raw = (input ?? "").toString().toUpperCase().trim();
  if (USD_PATTERNS.some((pattern) => raw.includes(pattern))) {
    return "USD";
  }
  if (ARS_PATTERNS.some((pattern) => raw.includes(pattern))) {
    return "ARS";
  }

  if (!raw && priceRaw) {
    const upperPrice = priceRaw.toUpperCase();
    if (USD_PATTERNS.some((pattern) => upperPrice.includes(pattern))) {
      return "USD";
    }
    if (upperPrice.includes("$")) {
      return "ARS";
    }
  }

  return null;
}

export function parsePriceRaw(raw?: string | null) {
  if (!raw) return null;
  const normalized = raw.toString().trim();
  if (normalized.length === 0) return null;
  if (normalized.toLowerCase().includes("consultar")) return null;

  let cleaned = normalized.replace(/[^0-9.,]/g, "");
  if (!cleaned) return null;

  const hasDot = cleaned.includes(".");
  const hasComma = cleaned.includes(",");

  if (hasDot && hasComma) {
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  } else if (hasComma && !hasDot) {
    const parts = cleaned.split(",");
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = `${parts[0].replace(/\./g, "")}.${parts[1]}`;
    } else {
      cleaned = cleaned.replace(/,/g, "");
    }
  } else if (hasDot && !hasComma) {
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts.join("");
    } else if (parts.length === 2 && parts[1].length === 3) {
      cleaned = parts.join("");
    }
  }

  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function normalizePrice({
  precioRaw,
  monedaRaw,
  origen,
  fxRate,
}: {
  precioRaw: string | null;
  monedaRaw: string | null;
  origen: string | null;
  fxRate?: number;
}) {
  const monedaNorm = normalizeCurrency(monedaRaw, precioRaw);
  const parsed = parsePriceRaw(precioRaw);

  const rate = fxRate ?? FALLBACK_FX_RATE;

  if (parsed === null) {
    return {
      precio_nor: null,
      precio_ars: null,
      moneda_norm: monedaNorm,
      precio_fixed: null,
    };
  }

  let precioFixed = parsed;
  if (
    origen?.toLowerCase() === "rastroagro" &&
    monedaNorm === "USD" &&
    precioRaw &&
    /^\d+\.\d{2}$/.test(precioRaw.trim()) &&
    parsed < 1000
  ) {
    precioFixed = parsed * 1000;
  }

  if (precioFixed === 0) {
    return {
      precio_nor: null,
      precio_ars: null,
      moneda_norm: monedaNorm,
      precio_fixed: null,
    };
  }

  if (monedaNorm === "USD") {
    return {
      precio_nor: precioFixed,
      precio_ars: null,
      moneda_norm: monedaNorm,
      precio_fixed: precioFixed,
    };
  }

  if (monedaNorm === "ARS") {
    return {
      precio_nor: precioFixed / rate,
      precio_ars: precioFixed,
      moneda_norm: monedaNorm,
      precio_fixed: precioFixed,
    };
  }

  return {
    precio_nor: null,
    precio_ars: precioFixed,
    moneda_norm: monedaNorm,
    precio_fixed: precioFixed,
  };
}
