import fs from "fs/promises";
import path from "path";
import { detectDelimiter, parseCsvToObjects } from "@/lib/utils/csv";
import { normalizePrice } from "@/lib/normalize/price";
import { deriveLocation } from "@/lib/normalize/location";
import { buildFlags } from "@/lib/normalize/flags";
import { normalizeLoose } from "@/lib/normalize/text";
import { inferModelFromTitle, normalizeBrandModelParts } from "@/lib/normalize/tractorIdentity";
import { createStableId } from "@/lib/utils/id";
import type { TractorItem, TractorsDataset } from "@/lib/types";

const NEW_DATA_DIR = path.join(process.cwd(), "data", "new_data");
const PRIMARY_PATH = path.join(process.cwd(), "data", "tractores_unificados_v3_normalizado.csv");
const FALLBACK_PATH = path.join(process.cwd(), "tractores_unificados_v3_normalizado.csv");
const LEGACY_PATH = path.join(process.cwd(), "data", "tractores_unificados_v3.csv");
const CACHE_TTL_MS = 5 * 60 * 1000;

let cache: TractorsDataset | null = null;

async function resolveDataPath() {
  const candidates = [PRIMARY_PATH, FALLBACK_PATH, LEGACY_PATH];
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }
  const fallback = await findFallbackCsv();
  if (fallback) return fallback;
  return PRIMARY_PATH;
}

async function listNewDataCsvPaths(): Promise<string[]> {
  try {
    const entries = await fs.readdir(NEW_DATA_DIR);
    return entries
      .filter((name) => name.toLowerCase().endsWith(".csv"))
      .map((name) => path.join(NEW_DATA_DIR, name))
      .sort();
  } catch {
    return [];
  }
}

async function readCsvObjects(filePath: string): Promise<{
  raw: string;
  delimiter: string;
  rows: Record<string, string>[];
}> {
  const raw = await fs.readFile(filePath, "utf8");
  const delimiter = detectDelimiter(raw);
  const rows = parseCsvToObjects(raw, delimiter) as Record<string, string>[];
  return { raw, delimiter, rows };
}

async function findFallbackCsv() {
  const roots = [process.cwd(), path.join(process.cwd(), "data")];
  for (const root of roots) {
    try {
      const entries = await fs.readdir(root);
      const csvFiles = entries
        .filter((name) => name.toLowerCase().endsWith(".csv"))
        .sort();
      const tractorCsv = csvFiles.find((name) => name.toLowerCase().includes("tractor"));
      if (tractorCsv) {
        return path.join(root, tractorCsv);
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function extractYearFromText(text?: string | null) {
  if (!text) return null;
  const currentYear = new Date().getFullYear();
  const matches = text.toString().match(/\b(19\d{2}|20\d{2})\b/g);
  if (!matches) return null;
  const years = matches
    .map((match) => Number(match))
    .filter((value) => Number.isFinite(value) && value >= 1950 && value <= currentYear + 1);
  if (years.length === 0) return null;
  return Math.max(...years);
}

function parseYear(
  raw?: string | null,
  titulo?: string | null,
  descripcion?: string | null,
  extraText?: string | null,
) {
  let rawValue: number | null = null;
  if (raw) {
    const currentYear = new Date().getFullYear();
    const rawText = raw.toString();
    const exactMatch = rawText.match(/\b(19\d{2}|20\d{2})\b/);
    if (exactMatch) {
      const value = Number(exactMatch[1]);
      rawValue = value >= 1950 && value <= currentYear + 1 ? value : null;
    } else {
      const digits = rawText.replace(/\D/g, "");
      if (digits) {
        let value = Number(digits);
        if (Number.isFinite(value)) {
          while (value > currentYear + 1 && value >= 10000) {
            value = Math.floor(value / 10);
          }
          rawValue = value >= 1950 && value <= currentYear + 1 ? value : null;
        }
      }
    }
  }

  return (
    rawValue ??
    extractYearFromText(titulo) ??
    extractYearFromText(descripcion) ??
    extractYearFromText(extraText)
  );
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

function parseHorasUsoValue(raw?: string | null) {
  if (!raw) return null;
  const digits = raw.toString().replace(/[^0-9]/g, "");
  if (!digits) return null;
  const value = Number(digits);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

function extractHorasUsoFromText(text?: string | null) {
  if (!text) return null;
  const match = text.toString().match(/\b(horas|hs|hrs)\b\s*:?[\s]*([0-9][0-9\.,]*)/i);
  if (!match?.[2]) return null;
  return parseHorasUsoValue(match[2]);
}

function parseHorasUso(raw?: string | null, titulo?: string | null, descripcion?: string | null) {
  return (
    parseHorasUsoValue(raw) ??
    extractHorasUsoFromText(titulo) ??
    extractHorasUsoFromText(descripcion) ??
    null
  );
}

function extractPriceFromTitleLastMatch(title?: string | null) {
  if (!title) return { monedaRaw: null as string | null, precioRaw: null as string | null };
  const text = title.toString();

  const re = /(US\$|U\$S|U\$|USD|\$)\s*([0-9][0-9\.,]*)/gi;
  let monedaRaw: string | null = null;
  let precioRaw: string | null = null;
  for (const match of text.matchAll(re)) {
    const moneda = match[1]?.trim() ?? null;
    const precio = match[2]?.trim() ?? null;
    if (moneda && precio) {
      monedaRaw = moneda;
      precioRaw = precio;
    }
  }

  return { monedaRaw, precioRaw };
}

function normalizeEstado(condicion?: string | null) {
  const value = (condicion ?? "").toString().trim().toLowerCase();
  if (!value) return null;
  if (value.includes("nuevo")) return "Nuevo" as const;
  if (value.includes("usado")) return "Usado" as const;
  return null;
}

function normalizeEstadoWithInference(condicion?: string | null, anio?: number | null, horasUso?: number | null) {
  const input = normalizeEstado(condicion ?? null);
  const year = typeof anio === "number" && Number.isFinite(anio) ? anio : null;
  const hours = typeof horasUso === "number" && Number.isFinite(horasUso) ? horasUso : null;
  const currentYear = new Date().getFullYear();
  const inferredUsedCutoff = currentYear - 2;
  const overrideNewToUsedCutoff = currentYear - 3;

  let estado_norm = input;
  const flags: string[] = [];

  if (estado_norm === null) {
    if (year !== null && year < inferredUsedCutoff) {
      estado_norm = "Usado";
      flags.push("CONDITION_INFERRED_USED_FROM_YEAR");
    }
  }

  const shouldOverrideToUsed =
    estado_norm === "Nuevo" &&
    ((year !== null && year < overrideNewToUsedCutoff) || (hours !== null && hours > 0));
  if (shouldOverrideToUsed) {
    estado_norm = "Usado";
    flags.push("CONDITION_OVERRIDDEN_TO_USED");
  }

  return { estado_norm, flags };
}

function isTractorTitle(title?: string | null) {
  const text = (title ?? "").toString().toLowerCase();
  if (!text.includes("tractor")) return false;

  const blacklist = [
    "pala",
    "retro",
    "retroexcav",
    "rotoenfard",
    "enfard",
    "cosech",
    "pulver",
    "sembr",
    "mixer",
    "tolva",
    "acopl",
    "cargadora",
    "minicarg",
  ];
  if (blacklist.some((w) => text.includes(w))) return false;
  return true;
}

export async function loadTractors(force = false): Promise<TractorsDataset> {
  const now = Date.now();
  if (!force && cache && now - cache.meta.loadedAt < CACHE_TTL_MS) {
    return cache;
  }

  const newDataPaths = await listNewDataCsvPaths();
  const useNewData = newDataPaths.length > 0;

  const normalizedRows: TractorItem[] = [];
  let fileMtimeMs: number | null = null;
  let legacyDelimiter: string | null = null;

  async function pushRowsFromLegacyFile(filePath: string) {
    const { rows, delimiter } = await readCsvObjects(filePath);
    legacyDelimiter = delimiter;
    rows.forEach((row) => {
      const origen = normalizeLoose(row.origen) ?? null;
      const empresa = null;

      let precioRaw = row.precio?.trim() || null;
      let monedaRaw = row.moneda?.trim() || null;
      const origenKey = (origen ?? "").toLowerCase();
      const isMercadoLibre =
        origenKey.includes("mercadolibre") ||
        origenKey.includes("mercado libre") ||
        origenKey === "ml";
      if (isMercadoLibre) {
        const extracted = extractPriceFromTitleLastMatch(row.titulo);
        if (extracted.precioRaw) precioRaw = extracted.precioRaw;
        if (extracted.monedaRaw) monedaRaw = extracted.monedaRaw;
      }

      const anio = parseYear(row.anio, row.titulo, row.descripcion, row.url);
      const horas_uso = parseHorasUso((row as Record<string, string | undefined>).horas_uso ?? null, row.titulo, row.descripcion);
      const { estado_norm, flags: estadoFlags } = normalizeEstadoWithInference(row.condicion, anio, horas_uso);
      if (estado_norm !== "Usado") return;

      const { precio_nor, moneda_norm } = normalizePrice({ precioRaw, monedaRaw, origen });
      const MIN_VALID_PRICE_USD = 1000;
      const precio_nor_safe =
        precio_nor !== null && precio_nor >= MIN_VALID_PRICE_USD ? precio_nor : null;

      const ubicacion = normalizeLoose(row.ubicacion) ?? null;
      const { provincia, ciudad } = deriveLocation(ubicacion);
      const marca = normalizeLoose(row.marca) ?? null;
      const modeloRaw = normalizeLoose(row.modelo) ?? inferModelFromTitle(row.titulo, marca);
      const modelo = modeloRaw ?? null;

      const { brandNorm, modelNorm } = normalizeBrandModelParts(marca, modelo);
      const marca_norm = brandNorm;
      const modelo_norm = modelNorm;
      const hp_motor = parseHp(row.hp_motor, row.titulo, row.descripcion);

      const flags = buildFlags({ precio_nor: precio_nor_safe, anio, hp_motor, ubicacion, estado_norm });
      flags.push(...estadoFlags);

      const id = createStableId([origen, empresa, row.url, row.titulo, marca_norm, modelo_norm, anio?.toString() ?? null]);

      normalizedRows.push({
        id,
        origen,
        empresa,
        url: normalizeLoose(row.url) ?? null,
        titulo: normalizeLoose(row.titulo) ?? null,
        precio_raw: precioRaw,
        moneda_raw: monedaRaw,
        marca,
        modelo,
        hp_motor,
        anio,
        horas_uso,
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
      });
    });
  }

  async function pushRowsFromNewDataFile(filePath: string) {
    const name = path.basename(filePath).toLowerCase();
    const { rows } = await readCsvObjects(filePath);

    rows.forEach((row) => {
      const anyRow = row as Record<string, string | undefined>;

      const isAgrofy = name.includes("agrofy");
      const isRastroagro = name.includes("rastroagro");
      const isMercadoLibre = name.startsWith("ml_") || name.includes("mercadolibre") || name.includes("mercado");
      const isAgroads = name.includes("agroads");

      let origen: string | null = null;
      let empresa: string | null = null;
      let url: string | null = null;
      let titulo: string | null = null;
      let descripcion: string | null = null;
      let precioRaw: string | null = null;
      let monedaRaw: string | null = null;
      let marca: string | null = null;
      let modelo: string | null = null;
      let ubicacion: string | null = null;
      let condicion: string | null = null;
      let anioRaw: string | null = null;
      let hpRaw: string | null = null;
      let horasRaw: string | null = null;

      if (isAgrofy) {
        origen = "Agrofy";
        empresa = normalizeLoose(anyRow.merchant) ?? null;
        url = normalizeLoose(anyRow.url) ?? null;
        titulo = normalizeLoose(anyRow.title) ?? null;
        descripcion = normalizeLoose(anyRow.description) ?? null;
        precioRaw = normalizeLoose(anyRow.price) ?? normalizeLoose(anyRow.priceText) ?? null;
        monedaRaw = normalizeLoose(anyRow.currency) ?? null;
        marca = normalizeLoose(anyRow.marca) ?? null;
        modelo = null;
        condicion = normalizeLoose(anyRow.condition) ?? null;
        ubicacion = normalizeLoose(anyRow.localizacion) ?? normalizeLoose(anyRow.validPriceLocation) ?? null;
        anioRaw = normalizeLoose(anyRow.anio) ?? normalizeLoose(anyRow.urlKey) ?? null;
      } else if (isRastroagro) {
        origen = "Rastroagro";
        empresa = "rastroagro";
        url = normalizeLoose(anyRow.url) ?? null;
        titulo = normalizeLoose(anyRow.titulo) ?? null;
        descripcion = normalizeLoose(anyRow.descripcion) ?? null;
        precioRaw = normalizeLoose(anyRow.precio) ?? null;
        monedaRaw = null;
        const extracted = extractPriceFromTitleLastMatch(titulo);
        if (!precioRaw || precioRaw.toLowerCase().includes("consult")) {
          if (extracted.precioRaw) precioRaw = extracted.precioRaw;
        }
        if (extracted.monedaRaw) monedaRaw = extracted.monedaRaw;
        marca = normalizeLoose(anyRow.marca) ?? null;
        modelo = normalizeLoose(anyRow.modelo) ?? null;
        condicion = normalizeLoose(anyRow.condicion) ?? null;
        ubicacion = normalizeLoose(anyRow.ubicacion) ?? null;
        anioRaw = normalizeLoose(anyRow["carac__Año"]) ?? null;
        hpRaw = normalizeLoose(anyRow["carac__Potencia motor (hp)"] ?? anyRow.hp_motor) ?? null;
        horasRaw =
          normalizeLoose(anyRow["carac__Horas de motor reales"]) ??
          normalizeLoose(anyRow.horas_uso ?? anyRow.horas) ??
          null;
      } else if (isMercadoLibre) {
        origen = "MercadoLibre";
        empresa = normalizeLoose(anyRow.seller_name) ?? null;
        url = normalizeLoose(anyRow.url) ?? null;
        titulo = normalizeLoose(anyRow.titulo) ?? null;
        if (!isTractorTitle(titulo)) return;

        descripcion = normalizeLoose(anyRow.descripcion) ?? null;
        const extracted = extractPriceFromTitleLastMatch(titulo);
        precioRaw = extracted.precioRaw ?? normalizeLoose(anyRow.precio) ?? null;
        monedaRaw = extracted.monedaRaw ?? normalizeLoose(anyRow.moneda) ?? null;
        marca = normalizeLoose(anyRow.marca) ?? null;
        modelo = normalizeLoose(anyRow.modelo) ?? null;
        condicion = normalizeLoose(anyRow.condicion) ?? null;
        anioRaw = normalizeLoose(anyRow.anio) ?? null;
        hpRaw = normalizeLoose(anyRow.potencia) ?? null;
        horasRaw = normalizeLoose(anyRow.horas) ?? null;
        const ciudad = normalizeLoose(anyRow.ubicacion_ciudad) ?? null;
        const provincia = normalizeLoose(anyRow.ubicacion_provincia) ?? null;
        ubicacion = ciudad && provincia ? `${ciudad}, ${provincia}` : ciudad ?? provincia;
      } else if (isAgroads) {
        origen = "Agroads";
        empresa = normalizeLoose(anyRow.usuario_apodo) ?? normalizeLoose(anyRow.usuario_nombre) ?? "agroads";
        url = null;
        titulo = normalizeLoose(anyRow.clasificado_titulo) ?? null;
        if (!isTractorTitle(titulo)) return;

        descripcion = null;
        precioRaw = normalizeLoose(anyRow.clasificado_precio_valor) ?? null;
        monedaRaw = "USD";
        marca = normalizeLoose(anyRow.clasificado_marca_detalle) ?? null;
        modelo = normalizeLoose(anyRow.clasificado_modelo_detalle) ?? null;
        condicion = null;
        ubicacion =
          (normalizeLoose(anyRow.usuario_ubicacion_localidad) ?? "") +
          ((normalizeLoose(anyRow.usuario_ubicacion_provincia) ?? "")
            ? `, ${normalizeLoose(anyRow.usuario_ubicacion_provincia)}`
            : "");
      } else {
        return;
      }

      const extraYearText = `${normalizeLoose(anyRow.urlKey) ?? ""} ${url ?? ""}`.trim() || null;
      const anio = parseYear(anioRaw, titulo, descripcion, extraYearText);
      const horas_uso = parseHorasUso(horasRaw, titulo, descripcion);

      const estadoResult = normalizeEstadoWithInference(condicion, anio, horas_uso);
      const estado_norm = estadoResult.estado_norm;
      if (estado_norm !== "Usado") return;

      const { precio_nor, moneda_norm } = normalizePrice({ precioRaw, monedaRaw, origen });
      const MIN_VALID_PRICE_USD = 1000;
      const precio_nor_safe =
        precio_nor !== null && precio_nor >= MIN_VALID_PRICE_USD ? precio_nor : null;

      const { provincia, ciudad } = deriveLocation(ubicacion);
      const modeloGuessed = modelo ?? inferModelFromTitle(titulo, marca);
      const { brandNorm, modelNorm } = normalizeBrandModelParts(marca, modeloGuessed);
      const marca_norm = brandNorm;
      const modelo_norm = modelNorm;

      const hp_motor = parseHp(hpRaw, titulo, descripcion);
      const flags = buildFlags({ precio_nor: precio_nor_safe, anio, hp_motor, ubicacion, estado_norm });
      flags.push(...estadoResult.flags);
      if (horas_uso === null) flags.push("MISSING_HOURS");

      const id = createStableId([origen, empresa, url, titulo, marca_norm, modelo_norm, anio?.toString() ?? null]);

      normalizedRows.push({
        id,
        origen,
        empresa,
        url,
        titulo,
        precio_raw: precioRaw,
        moneda_raw: monedaRaw,
        marca,
        modelo: modeloGuessed ?? null,
        hp_motor,
        anio,
        horas_uso,
        formas_pago: null,
        ubicacion: ubicacion && ubicacion.trim().length > 0 ? ubicacion : null,
        condicion: condicion && condicion.trim().length > 0 ? condicion : null,
        descripcion,
        precio_nor: precio_nor_safe,
        moneda_norm,
        estado_norm,
        provincia,
        ciudad,
        marca_norm,
        modelo_norm,
        flags,
      });
    });
  }

  if (useNewData) {
    for (const filePath of newDataPaths) {
      await pushRowsFromNewDataFile(filePath);
      try {
        const stat = await fs.stat(filePath);
        fileMtimeMs = fileMtimeMs === null ? stat.mtimeMs : Math.max(fileMtimeMs, stat.mtimeMs);
      } catch {
        // ignore
      }
    }
  } else {
    const filePath = await resolveDataPath();
    await pushRowsFromLegacyFile(filePath);
    try {
      const stat = await fs.stat(filePath);
      fileMtimeMs = stat.mtimeMs;
    } catch {
      fileMtimeMs = null;
    }
  }

  cache = {
    rows: normalizedRows,
    meta: {
      loadedAt: now,
      fileMtimeMs,
      delimiter: useNewData ? "mixed" : legacyDelimiter ?? ";",
    },
  };

  return cache;
}
