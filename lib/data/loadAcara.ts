import fs from "fs/promises";
import path from "path";
import { detectDelimiter, parseCsvToObjects } from "@/lib/utils/csv";
import { normalizeCurrency, parsePriceRaw, FX_RATE } from "@/lib/normalize/price";
import { normalizeText, normalizeLoose } from "@/lib/normalize/text";
import { createStableId } from "@/lib/utils/id";
import type { AcaraDataset, AcaraItem, AcaraSeriesPoint } from "@/lib/types";

const DATA_PATH = path.join(process.cwd(), "data", "acara_precios_maquinaria_agricola_wide.csv");
const CACHE_TTL_MS = 5 * 60 * 1000;

let cache: AcaraDataset | null = null;

function parseSeriesValue(rawValue: string | null | undefined, currency: string | null) {
  const parsed = parsePriceRaw(rawValue ?? null);
  if (parsed === null) return null;
  const currencyNorm = normalizeCurrency(currency, rawValue ?? null);
  if (currencyNorm === "USD") return parsed;
  if (currencyNorm === "ARS") return parsed / FX_RATE;
  return parsed;
}

export async function loadAcara(force = false): Promise<AcaraDataset> {
  const now = Date.now();
  if (!force && cache && now - cache.meta.loadedAt < CACHE_TTL_MS) {
    return cache;
  }

  const raw = await fs.readFile(DATA_PATH, "utf8");
  const delimiter = detectDelimiter(raw);
  const rows = parseCsvToObjects(raw, delimiter);

  const baseKeys = new Set(["price_date", "brand", "category", "description", "currency", "page"]);

  const items: AcaraItem[] = rows.map((row) => {
    const brand = normalizeLoose(row.brand) ?? null;
    const category = normalizeLoose(row.category) ?? null;
    const description = normalizeLoose(row.description) ?? null;
    const currency = normalizeCurrency(row.currency ?? null, null);
    const series: AcaraSeriesPoint[] = [];

    Object.entries(row).forEach(([key, value]) => {
      if (baseKeys.has(key)) return;
      const trimmedKey = key.trim();
      if (!trimmedKey) return;
      const yearLabel = trimmedKey;
      const valueUsd = parseSeriesValue(value, row.currency ?? null);
      series.push({ yearLabel, valueUsd });
    });

    series.sort((a, b) => {
      const aIsZero = a.yearLabel.toLowerCase() === "0km";
      const bIsZero = b.yearLabel.toLowerCase() === "0km";
      if (aIsZero && !bIsZero) return 1;
      if (bIsZero && !aIsZero) return -1;
      const aNum = Number(a.yearLabel);
      const bNum = Number(b.yearLabel);
      if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
        return aNum - bNum;
      }
      return a.yearLabel.localeCompare(b.yearLabel);
    });

    const id = createStableId([brand, category, description]);

    return {
      id,
      brand,
      category,
      description,
      currency,
      page: normalizeLoose(row.page) ?? null,
      price_date: normalizeLoose(row.price_date) ?? null,
      brand_norm: normalizeText(brand),
      description_norm: normalizeText(description),
      category_norm: normalizeText(category),
      series,
    };
  });

  let fileMtimeMs: number | null = null;
  try {
    const stat = await fs.stat(DATA_PATH);
    fileMtimeMs = stat.mtimeMs;
  } catch {
    fileMtimeMs = null;
  }

  cache = {
    items,
    meta: {
      loadedAt: now,
      fileMtimeMs,
      delimiter,
    },
  };

  return cache;
}
