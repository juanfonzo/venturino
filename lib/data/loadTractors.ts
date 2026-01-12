import fs from "fs/promises";
import path from "path";
import { detectDelimiter, parseCsvToObjects } from "@/lib/utils/csv";
import { normalizePrice } from "@/lib/normalize/price";
import { deriveLocation } from "@/lib/normalize/location";
import { buildFlags } from "@/lib/normalize/flags";
import { normalizeText, normalizeLoose } from "@/lib/normalize/text";
import { createStableId } from "@/lib/utils/id";
import type { TractorItem, TractorsDataset } from "@/lib/types";

const PRIMARY_PATH = path.join(process.cwd(), "tractores_unificados_v3_normalizado.csv");
const DATA_PATH = path.join(process.cwd(), "data", "tractores_unificados_v3_normalizado.csv");
const LEGACY_PATH = path.join(process.cwd(), "data", "tractores_unificados_v3.csv");
const CACHE_TTL_MS = 5 * 60 * 1000;

let cache: TractorsDataset | null = null;

async function resolveDataPath() {
  const candidates = [PRIMARY_PATH, DATA_PATH, LEGACY_PATH];
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }
  return PRIMARY_PATH;
}

function parseYear(raw?: string | null) {
  if (!raw) return null;
  const currentYear = new Date().getFullYear();
  const rawText = raw.toString();
  const exactMatch = rawText.match(/\b(19\d{2}|20\d{2})\b/);
  if (exactMatch) {
    const value = Number(exactMatch[1]);
    return value >= 1950 && value <= currentYear + 1 ? value : null;
  }

  const digits = rawText.replace(/\D/g, "");
  if (!digits) return null;
  let value = Number(digits);
  if (!Number.isFinite(value)) return null;
  while (value > currentYear + 1 && value >= 10000) {
    value = Math.floor(value / 10);
  }
  if (value < 1950 || value > currentYear + 1) return null;
  return value;
}

function parseHpValue(raw?: string | null) {
  if (!raw) return null;
  const cleaned = raw.toString().replace(",", ".");
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value <= 0 || value > 1000) return null;
  return value;
}

function extractHpFromText(text?: string | null) {
  if (!text) return null;
  const match = text.match(/(\d{1,3}(?:[.,]\d{1,2})?)\s*hp\b/i);
  if (!match) return null;
  const value = Number(match[1].replace(",", "."));
  if (!Number.isFinite(value) || value <= 0 || value > 1000) return null;
  return value;
}

function parseHp(raw?: string | null, titulo?: string | null, descripcion?: string | null) {
  const direct = parseHpValue(raw);
  const fromTitle = extractHpFromText(titulo);
  const fromDesc = extractHpFromText(descripcion);
  const context = fromTitle ?? fromDesc;

  if (direct !== null && context !== null) {
    const ratio = direct / context;
    if (ratio > 9.5 && ratio < 10.5) {
      return context;
    }
  }

  return direct ?? context ?? null;
}

function normalizeEstado(condicion?: string | null) {
  const value = (condicion ?? "").toString().trim().toLowerCase();
  if (!value) return null;
  if (value.includes("nuevo")) return "Nuevo" as const;
  if (value.includes("usado")) return "Usado" as const;
  return null;
}

export async function loadTractors(force = false): Promise<TractorsDataset> {
  const now = Date.now();
  if (!force && cache && now - cache.meta.loadedAt < CACHE_TTL_MS) {
    return cache;
  }

  const filePath = await resolveDataPath();
  const raw = await fs.readFile(filePath, "utf8");
  const delimiter = detectDelimiter(raw);
  const rows = parseCsvToObjects(raw, delimiter);

  const normalized: TractorItem[] = rows.map((row) => {
    const precioRaw = row.precio?.trim() || null;
    const monedaRaw = row.moneda?.trim() || null;
    const origen = normalizeLoose(row.origen) ?? null;
    const { precio_nor, moneda_norm } = normalizePrice({
      precioRaw,
      monedaRaw,
      origen,
    });
    const precio_nor_safe = precio_nor && precio_nor > 0 ? precio_nor : null;
    const estado_norm = normalizeEstado(row.condicion);
    const ubicacion = normalizeLoose(row.ubicacion) ?? null;
    const { provincia, ciudad } = deriveLocation(ubicacion);
    const marca = normalizeLoose(row.marca) ?? null;
    const modelo = normalizeLoose(row.modelo) ?? null;
    const marca_norm = normalizeText(marca);
    const modelo_norm = normalizeText(modelo);
    const anio = parseYear(row.anio);
    const hp_motor = parseHp(row.hp_motor, row.titulo, row.descripcion);
    const flags = buildFlags({
      precio_nor: precio_nor_safe,
      anio,
      hp_motor,
      ubicacion,
      estado_norm,
    });

    const id = createStableId([origen, row.url, row.titulo, marca_norm, modelo_norm]);

    return {
      id,
      origen,
      url: normalizeLoose(row.url) ?? null,
      titulo: normalizeLoose(row.titulo) ?? null,
      precio_raw: precioRaw,
      moneda_raw: monedaRaw,
      marca,
      modelo,
      hp_motor,
      anio,
      formas_pago: normalizeLoose(row.formas_pago) ?? null,
      ubicacion,
      condicion: normalizeLoose(row.condicion) ?? null,
      descripcion: normalizeLoose(row.descripcion) ?? null,
      precio_nor: precio_nor_safe,
      moneda_norm,
      estado_norm,
      provincia,
      ciudad,
      marca_norm,
      modelo_norm,
      flags,
    };
  });

  let fileMtimeMs: number | null = null;
  try {
    const stat = await fs.stat(filePath);
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
