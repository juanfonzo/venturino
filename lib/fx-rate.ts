import { prisma } from "@/lib/db/prisma";

const DOLAR_API_URL = "https://dolarapi.com/v1/dolares/oficial";
const FALLBACK_RATE = 1500;

interface DolarApiResponse {
  venta: string | number;
  nombre?: string;
  casa?: string;
  fechaActualizacion?: string;
}

interface FxRateResult {
  rate: number;
  source: string;
  sourceDate: Date | null;
}

function parsePositiveNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "string" ? parseFloat(value.trim()) : value;
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Fetch official dollar quote from DolarAPI with retry logic.
 */
export async function fetchOfficialDollarQuote(): Promise<FxRateResult> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(DOLAR_API_URL, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const data = (await res.json().catch(() => null)) as DolarApiResponse | null;
      const venta = parsePositiveNumber(data?.venta);
      if (!res.ok || !venta) {
        throw new Error(`Cotización oficial inválida (${res.status})`);
      }
      return {
        rate: venta,
        source:
          typeof data?.nombre === "string" && data.nombre.trim()
            ? data.nombre.trim()
            : typeof data?.casa === "string" && data.casa.trim()
              ? data.casa.trim()
              : "dolarapi/oficial",
        sourceDate:
          typeof data?.fechaActualizacion === "string" && data.fechaActualizacion.trim()
            ? new Date(data.fechaActualizacion)
            : null,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("No se pudo obtener la cotización oficial");
    }
  }

  throw lastError ?? new Error("No se pudo obtener la cotización oficial");
}

/**
 * Get current FX rate from the database.
 * Returns FALLBACK_RATE if no rate has been stored yet.
 */
export async function getCurrentFxRate(): Promise<number> {
  const latest = await prisma.fxRate.findFirst({
    orderBy: { createdAt: "desc" },
    select: { rate: true },
  });
  if (!latest) return FALLBACK_RATE;
  const rate = Number(latest.rate);
  return Number.isFinite(rate) && rate > 0 ? rate : FALLBACK_RATE;
}

/**
 * Sync FX rate: fetch from DolarAPI, upsert into FxRate table.
 * Returns the stored rate.
 */
export async function syncFxRate(): Promise<FxRateResult> {
  const quote = await fetchOfficialDollarQuote();

  // Upsert: keep only the latest row (delete old ones, insert new)
  await prisma.fxRate.deleteMany({});
  await prisma.fxRate.create({
    data: {
      rate: quote.rate,
      source: quote.source,
      sourceDate: quote.sourceDate,
    },
  });

  return quote;
}

/**
 * Recalculate precioUsd for all listings with monedaNorm = 'ARS' and precioArs IS NOT NULL.
 * Uses raw SQL for performance (10k+ rows).
 */
export async function recalculateListingsPrices(fxRate: number): Promise<number> {
  const result = await prisma.$executeRaw`
    UPDATE listings
    SET precio_usd = ROUND(precio_ars / ${fxRate}, 2)
    WHERE moneda_norm = 'ARS' AND precio_ars IS NOT NULL
  `;
  return result;
}

/**
 * Full sync: fetch DolarAPI + store + recalculate listings.
 */
export async function fullFxSync(): Promise<{
  rate: number;
  source: string;
  sourceDate: Date | null;
  listingsUpdated: number;
}> {
  const quote = await syncFxRate();
  const listingsUpdated = await recalculateListingsPrices(quote.rate);
  return {
    rate: quote.rate,
    source: quote.source,
    sourceDate: quote.sourceDate,
    listingsUpdated,
  };
}
