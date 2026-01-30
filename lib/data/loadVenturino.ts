import fs from "fs/promises";
import path from "path";
import { detectDelimiter, parseCsvToObjects } from "@/lib/utils/csv";
import { normalizePrice } from "@/lib/normalize/price";
import { buildFlags } from "@/lib/normalize/flags";
import { normalizeLoose } from "@/lib/normalize/text";
import { normalizeBrandModelParts } from "@/lib/normalize/tractorIdentity";
import { createStableId } from "@/lib/utils/id";
import type { TractorItem, TractorsDataset } from "@/lib/types";

const DATA_PATH = path.join(process.cwd(), "data", "venturino_tractores_usados.csv");
const CACHE_TTL_MS = 5 * 60 * 1000;

let cache: TractorsDataset | null = null;

export async function loadVenturino(force = false): Promise<TractorsDataset> {
  const now = Date.now();
  if (!force && cache && now - cache.meta.loadedAt < CACHE_TTL_MS) {
    return cache;
  }

  const raw = await fs.readFile(DATA_PATH, "utf8");
  const delimiter = detectDelimiter(raw);
  const rows = parseCsvToObjects(raw, delimiter) as Record<string, string>[];

  const origen = "Venturino";
  const empresa = "Venturino";

  const normalized: TractorItem[] = rows.map((row) => {
    const url = normalizeLoose(row.url) ?? null;
    const titulo = null;

    const precioRaw = normalizeLoose(row.precio_publicado ?? row.precio) ?? null;
    const monedaRaw = normalizeLoose(row.moneda) ?? null;

    const { precio_nor, moneda_norm } = normalizePrice({
      precioRaw,
      monedaRaw,
      origen,
    });
    const MIN_VALID_PRICE_USD = 1000;
    const precio_nor_safe = precio_nor !== null && precio_nor >= MIN_VALID_PRICE_USD ? precio_nor : null;

    const marca = normalizeLoose(row.marca) ?? null;
    const modelo = normalizeLoose(row.modelo) ?? null;
    const { brandNorm, modelNorm } = normalizeBrandModelParts(marca, modelo);

    const anio = (() => {
      const rawYear = normalizeLoose(row.anio) ?? null;
      if (!rawYear) return null;
      const match = rawYear.toString().match(/\b(19\d{2}|20\d{2})\b/);
      if (!match?.[1]) return null;
      const value = Number(match[1]);
      const currentYear = new Date().getFullYear();
      if (!Number.isFinite(value) || value < 1950 || value > currentYear + 1) return null;
      return value;
    })();

    const horas_uso = (() => {
      const rawHoras = normalizeLoose(row.horas_uso) ?? null;
      if (!rawHoras) return null;
      const digits = rawHoras.toString().replace(/[^0-9]/g, "");
      if (!digits) return null;
      const value = Number(digits);
      return Number.isFinite(value) && value > 0 ? value : null;
    })();

    const hp_motor = (() => {
      const rawHp = normalizeLoose(row.hp_motor) ?? null;
      if (!rawHp) return null;
      const cleaned = rawHp.toString().replace(",", ".");
      const match = cleaned.match(/(\d+(?:\.\d+)?)/);
      if (!match?.[1]) return null;
      const value = Number(match[1]);
      if (!Number.isFinite(value) || value <= 0 || value > 1000) return null;
      return value;
    })();

    const ubicacion = null;
    const provincia = null;
    const ciudad = null;

    const condicion = "Usado";
    const estado_norm = "Usado" as const;

    const flags = buildFlags({
      precio_nor: precio_nor_safe,
      anio,
      hp_motor,
      ubicacion,
      estado_norm,
    });
    if (horas_uso === null) flags.push("MISSING_HOURS");

    const id = createStableId([origen, empresa, url, brandNorm, modelNorm, anio?.toString() ?? null]);

    return {
      id,
      origen,
      empresa,
      url,
      titulo,
      precio_raw: precioRaw,
      moneda_raw: monedaRaw,
      marca,
      modelo,
      hp_motor,
      anio,
      horas_uso,
      formas_pago: null,
      ubicacion,
      condicion,
      descripcion: null,
      precio_nor: precio_nor_safe,
      moneda_norm,
      estado_norm,
      provincia,
      ciudad,
      marca_norm: brandNorm,
      modelo_norm: modelNorm,
      flags,
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
    rows: normalized,
    meta: {
      loadedAt: now,
      fileMtimeMs,
      delimiter,
    },
  };

  return cache;
}
