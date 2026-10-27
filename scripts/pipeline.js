/**
 * Pipeline: MongoDB JSON export → clean & normalize → PostgreSQL (via Prisma)
 *
 * Usage: node scripts/pipeline.js [--dry-run]
 *
 * Reads data/mongo_export.json, filters to 4 core categories,
 * normalizes all fields, and inserts into PostgreSQL.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// ─── Config ──────────────────────────────────────────────
const FALLBACK_FX_RATE = 1500;
let FX_RATE = FALLBACK_FX_RATE;
const DATA_PATH = path.join(__dirname, '..', 'data', 'mongo_export.json');
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 500;

// ─── Category normalization ──────────────────────────────
const CATEGORY_MAP = {
  'tractores': 'Tractores',
  'tractor': 'Tractores',
  'tractores medianos (de 100 a 190 hp)': 'Tractores',
  'tractores de 50 a 100 hp': 'Tractores',
  'tractores grandes (más de 190 hp)': 'Tractores',
  'tractores grandes (mas de 190 hp)': 'Tractores',
  'tractores menores de 50 hp': 'Tractores',
  'cosechadoras': 'Cosechadoras',
  'cosechadora': 'Cosechadoras',
  'sembradoras': 'Sembradoras',
  'sembradora': 'Sembradoras',
  'sembradoras: de tiro': 'Sembradoras',
  'pulverizadoras': 'Pulverizadoras',
  'pulverizadora': 'Pulverizadoras',
  'pulverizadoras autopropulsadas': 'Pulverizadoras',
};

function normalizeCategoria(raw) {
  if (!raw) return null;
  const key = raw.toString().trim().toLowerCase();
  return CATEGORY_MAP[key] || null;
}

// ─── Text normalization ──────────────────────────────────
function normalizeText(value) {
  if (!value) return null;
  return value.toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ').trim().toUpperCase();
}

function normalizeMatchText(value) {
  if (!value) return null;
  return value.toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]+/gi, ' ')
    .replace(/\s+/g, ' ').trim().toUpperCase();
}

// ─── Brand normalization ─────────────────────────────────
const BRAND_EQUIVALENCES = {
  // John Deere
  'JD': 'JOHN DEERE', 'JOHNDEERE': 'JOHN DEERE', 'JOHN DEERE': 'JOHN DEERE',
  'JOHN': 'JOHN DEERE',
  // Case — unify CASE and CASE IH
  'CASEIH': 'CASE IH', 'CASE IH': 'CASE IH', 'CASE': 'CASE IH',
  // New Holland
  'NEW HOLLAND': 'NEW HOLLAND', 'NEW': 'NEW HOLLAND', 'NEWHOLLAND': 'NEW HOLLAND',
  // Massey Ferguson
  'MASSEYFERGUSON': 'MASSEY FERGUSON', 'MASSEY FERGUSON': 'MASSEY FERGUSON',
  'MASSEY FERGUSSON': 'MASSEY FERGUSON', 'MASSEYFERGUSSON': 'MASSEY FERGUSON',
  'MASSEY': 'MASSEY FERGUSON',
  // Deutz family
  'DEUTZFAHR': 'DEUTZ FAHR', 'DEUTZ FAHR': 'DEUTZ FAHR',
  'DEUTZ- FAHR': 'DEUTZ FAHR', 'DEUTZ_FAHR': 'DEUTZ FAHR',
  'FAHR': 'DEUTZ FAHR', 'TRACTOR DEUTZ FAHR': 'DEUTZ FAHR',
  // Chery
  'CHERY BYLION': 'CHERY', 'CHERYBYLION': 'CHERY',
  'AGROCHERY': 'CHERY',
  // Agco
  'AGCO': 'AGCO ALLIS', 'AGCOALLIS': 'AGCO ALLIS',
  // Valtra/Valmet
  'VALTRA - VALMET': 'VALTRA', 'VALMET': 'VALTRA',
  'VALMET NEW HOLLAS': 'VALTRA',
  // Fiat
  'FIATAGRI': 'FIAT', 'FIAT SOMECA': 'FIAT',
  // Someca
  'SOMECA': 'FIAT',
  // Don Roque
  'DON': 'DON ROQUE',
  // Cinal-For
  'CINAL-FOR': 'CINAL FOR', 'CINAL': 'CINAL FOR',
  // Misc cleanup
  'TRACTOR ZANELLO 160 HP': 'ZANELLO',
  'TRACTOR FIAT CON PALA': 'FIAT',
  'DEUTZ FAHR AX 80 F CON PALA': 'DEUTZ FAHR',
  'FUMIGADOR AUTOPROPULSADO GOLONDRIN': 'GOLONDRIN',
};

// Brands where the raw marca field contains model info (e.g. "Chery RK" → brand=CHERY, model prefix=RK)
const BRAND_MODEL_SPLIT = [
  { prefix: 'CHERY RK', brand: 'CHERY', modelPrefix: 'RK' },
  { prefix: 'CHERY RD', brand: 'CHERY', modelPrefix: 'RD' },
  { prefix: 'CHERY RS', brand: 'CHERY', modelPrefix: 'RS' },
  { prefix: 'CHERY RC', brand: 'CHERY', modelPrefix: 'RC' },
  { prefix: 'CHERY RA', brand: 'CHERY', modelPrefix: 'RA' },
  { prefix: 'CHERY WORLD', brand: 'CHERY', modelPrefix: 'WORLD' },
  { prefix: 'ZANELLO UP', brand: 'ZANELLO', modelPrefix: 'UP' },
  { prefix: 'AGROMETAL TX', brand: 'AGROMETAL', modelPrefix: 'TX' },
  { prefix: 'AGROMETAL MX', brand: 'AGROMETAL', modelPrefix: 'MX' },
  { prefix: 'AGROMETAL GX', brand: 'AGROMETAL', modelPrefix: 'GX' },
  { prefix: 'VALTRA BH', brand: 'VALTRA', modelPrefix: 'BH' },
  { prefix: 'VALTRA BT', brand: 'VALTRA', modelPrefix: 'BT' },
  { prefix: 'VALTRA AR', brand: 'VALTRA', modelPrefix: 'AR' },
  { prefix: 'VASSALLI AX', brand: 'VASSALLI', modelPrefix: 'AX' },
  { prefix: 'CAIMAN SP', brand: 'CAIMAN', modelPrefix: 'SP' },
  { prefix: 'PRABA AR', brand: 'PRABA', modelPrefix: 'AR' },
  { prefix: 'DOLBI AX', brand: 'DOLBI', modelPrefix: 'AX' },
  { prefix: 'ASCANELLI RS', brand: 'ASCANELLI', modelPrefix: 'RS' },
  { prefix: 'ROLAND H', brand: 'ROLAND H', modelPrefix: null },
  { prefix: 'SUPER WALTER', brand: 'SUPER WALTER', modelPrefix: null },
  { prefix: 'DON ROQUE', brand: 'DON ROQUE', modelPrefix: null },
  { prefix: 'DON BENVENUTO', brand: 'DON BENVENUTO', modelPrefix: null },
  { prefix: 'HANOMAG STARK', brand: 'HANOMAG', modelPrefix: 'STARK' },
  { prefix: 'DEUTZ 85', brand: 'DEUTZ FAHR', modelPrefix: '85' },
  { prefix: 'DEUTZ 55', brand: 'DEUTZ FAHR', modelPrefix: '55' },
  { prefix: 'DEUTZ 90', brand: 'DEUTZ FAHR', modelPrefix: '90' },
  { prefix: 'DEUTZ AX', brand: 'DEUTZ FAHR', modelPrefix: 'AX' },
  { prefix: 'DEUTZ A', brand: 'DEUTZ FAHR', modelPrefix: 'A' },
  { prefix: 'FIAT 60', brand: 'FIAT', modelPrefix: '60' },
  { prefix: 'FIAT 700 E', brand: 'FIAT', modelPrefix: '700 E' },
  { prefix: 'SOMECA 45', brand: 'FIAT', modelPrefix: '45' },
  { prefix: 'FAHR 86', brand: 'DEUTZ FAHR', modelPrefix: '86' },
  { prefix: 'FAHR 85', brand: 'DEUTZ FAHR', modelPrefix: '85' },
  { prefix: 'KUBOTA MX', brand: 'KUBOTA', modelPrefix: 'MX' },
  { prefix: 'CHALLENGER MT', brand: 'CHALLENGER', modelPrefix: 'MT' },
  { prefix: 'HANOMAG R40', brand: 'HANOMAG', modelPrefix: 'R40' },
  { prefix: 'HANOMAG 68', brand: 'HANOMAG', modelPrefix: '68' },
  { prefix: 'PLA 20', brand: 'PLA', modelPrefix: '20' },
  { prefix: 'PLA 3', brand: 'PLA', modelPrefix: '3' },
];

function normalizeBrandAndModel(rawMarca, rawModelo) {
  let brandText = normalizeText(rawMarca);
  let modelExtra = null;

  if (brandText) {
    // Check brand-model splits (longest prefix first)
    const sorted = BRAND_MODEL_SPLIT.sort((a, b) => b.prefix.length - a.prefix.length);
    for (const rule of sorted) {
      if (brandText === rule.prefix || brandText.startsWith(rule.prefix + ' ')) {
        const remainder = brandText.substring(rule.prefix.length).trim();
        brandText = normalizeText(rule.brand);
        if (rule.modelPrefix) {
          modelExtra = remainder ? `${rule.modelPrefix} ${remainder}` : rule.modelPrefix;
        } else if (remainder) {
          modelExtra = remainder;
        }
        break;
      }
    }

    // Apply equivalences
    const compact = brandText.replace(/\s+/g, '');
    brandText = BRAND_EQUIVALENCES[brandText] || BRAND_EQUIVALENCES[compact] || brandText;
  }

  // Build final model: prepend modelExtra if modelo is empty or doesn't contain it
  let finalModelo = rawModelo || null;
  if (modelExtra) {
    const existingModel = normalizeText(finalModelo);
    if (!existingModel) {
      finalModelo = modelExtra;
    } else if (!existingModel.includes(normalizeText(modelExtra))) {
      finalModelo = `${modelExtra} ${finalModelo}`;
    }
  }

  return { marcaNorm: brandText, modeloForNorm: finalModelo };
}

// ─── Model normalization ─────────────────────────────────
const MODEL_SUFFIX_TOKENS = new Set([
  '4WD','4X4','4X2','2WD','DT','DUAL','DOBLE','SIMPLE','TRACCION',
  'ROD','RD','CAB','CABINA','CABINADO','PLUS','FULL','PREMIUM',
  'POWER','MOD','MODELO','ANO','HP',
  'PATON','RODADO','HILERAS','SURCOS',
]);

// Agroads uses "Serie › Model" format (e.g. "7R › 7230R", "6D › 6100D", "T8 › T8325")
// Strip the series prefix so we keep only the actual model number
function stripSeriesPrefix(value) {
  if (!value) return value;
  // Handle "7R › 7230R" → "7230R"
  const arrowStripped = value.replace(/^[^›]+›\s*/, '');
  if (arrowStripped !== value) return arrowStripped;
  return value;
}

// Model synonyms: different names for the same model line
const MODEL_SYNONYMS = {
  'MXM': 'MAXXUM',
  'MAXXUM': 'MAXXUM',
};

// Prefixes to strip from model (brand abbreviations that leak into model field)
const MODEL_STRIP_PREFIXES = ['CIH', 'CASEIH', 'CASE IH', 'JHON', 'DEERE', 'JOHN DEERE'];

function normalizeModel(value) {
  if (!value) return null;
  // First strip Agroads series prefix
  let cleaned = stripSeriesPrefix(value);
  const match = normalizeMatchText(cleaned);
  if (!match) return null;
  let tokens = match.split(' ').filter(t => t.length > 0);

  // Strip brand-leak prefixes from model
  while (tokens.length > 1) {
    const first = tokens[0];
    if (MODEL_STRIP_PREFIXES.includes(first)) {
      tokens.shift();
    } else {
      break;
    }
  }

  const filtered = tokens.filter(token => {
    if (MODEL_SUFFIX_TOKENS.has(token)) return false;
    if (/^\d{2,3}HP$/.test(token)) return false;
    return true;
  });

  // Remove trailing pure-number tokens that look like HP values (2-3 digits, not part of model)
  // e.g. "7230R 230" → "7230R", "5065ES 65" → "5065ES", "T8 295 270" → "T8 295"
  // BUT: don't strip if the preceding token is a short series prefix (T8, T7, CR, etc.)
  // because "T8 295" means model T8.295, not T8 + 295hp
  while (filtered.length > 1) {
    const last = filtered[filtered.length - 1];
    if (/^\d{2,3}$/.test(last)) {
      const prev = filtered[filtered.length - 2];
      // If prev is a short alpha-numeric series prefix (T8, T7, CR5, 5E, 6D, etc.)
      // the trailing number is the model number, not HP
      if (/^[A-Z]{1,3}\d{0,2}$/.test(prev) && prev.length <= 3) break;
      // Only strip if there's already a token with a substantial model number (4+ digits)
      const hasModelNum = filtered.slice(0, -1).some(t => /\d{4,}/.test(t));
      if (hasModelNum) {
        filtered.pop();
        continue;
      }
    }
    break;
  }

  // Apply model synonyms to first token
  if (filtered.length > 0 && MODEL_SYNONYMS[filtered[0]]) {
    filtered[0] = MODEL_SYNONYMS[filtered[0]];
  }

  const joined = filtered.join(' ');
  if (!joined) return null;
  return joined.replace(/\b([A-Z]+)\s+(\d+)\b/g, '$1$2')
    .replace(/\b(\d+)\s+([A-Z]+)\b/g, '$1$2')
    // Glue alphanumeric prefix + trailing digits: "CR7 90" → "CR790"
    .replace(/\b([A-Z]+\d+)\s+(\d+)\b/g, '$1$2')
    .replace(/\s+/g, ' ').trim() || null;
}

function inferModelFromTitle(title, brand, marcaNorm) {
  const titleMatch = normalizeMatchText(title);
  if (!titleMatch) return null;
  const brandMatch = normalizeMatchText(brand);
  let tokens = titleMatch.split(' ').filter(t => t.length > 0);
  // Filter category keywords
  tokens = tokens.filter(t => !['TRACTOR','COSECHADORA','SEMBRADORA','PULVERIZADORA'].includes(t));
  // Filter brand tokens (both raw and normalized to handle typos like FERGUSSON vs FERGUSON)
  const brandTokens = new Set();
  if (brandMatch) {
    brandMatch.split(' ').filter(t => t.length > 0).forEach(t => brandTokens.add(t));
  }
  if (marcaNorm) {
    marcaNorm.split(' ').filter(t => t.length > 0).forEach(t => brandTokens.add(t));
  }
  if (brandTokens.size > 0) {
    tokens = tokens.filter(t => !brandTokens.has(t));
  }
  const idx = tokens.findIndex(t => /\d/.test(t));
  if (idx < 0) return null;
  const out = [];
  if (idx - 1 >= 0) {
    const prev = tokens[idx - 1];
    if (/^[A-Z]+$/.test(prev) && prev.length >= 2 && !MODEL_SUFFIX_TOKENS.has(prev)
        && !['CON','SIN','DEL','DE','LA','EL'].includes(prev)) {
      out.push(prev);
    }
  }
  for (let i = idx; i < tokens.length; i++) {
    const t = tokens[i];
    if (/^(19\d{2}|20\d{2})$/.test(t)) break;
    if (t === 'MOD' || t === 'MODELO') break;
    if (t === 'HP' || /^\d{2,3}HP$/.test(t)) break;
    if (/^\d{1,2}(?:\.\d+)?X\d{1,2}$/i.test(t)) break;
    out.push(t);
    if (out.length >= 4) break;
  }
  return normalizeModel(out.join(' '));
}

// ─── Year parsing ────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear();

function extractYearFromText(text) {
  if (!text) return null;
  const matches = text.toString().match(/\b(19\d{2}|20\d{2})\b/g);
  if (!matches) return null;
  const years = matches.map(Number).filter(v => v >= 1950 && v <= CURRENT_YEAR + 1);
  if (years.length === 0) return null;
  return Math.max(...years);
}

function parseYear(raw, titulo, descripcion) {
  let rawValue = null;
  if (raw !== null && raw !== undefined && raw !== '') {
    const rawText = raw.toString();
    const exactMatch = rawText.match(/\b(19\d{2}|20\d{2})\b/);
    if (exactMatch) {
      const value = Number(exactMatch[1]);
      rawValue = (value >= 1950 && value <= CURRENT_YEAR + 1) ? value : null;
    } else {
      const digits = rawText.replace(/\D/g, '');
      if (digits) {
        let value = Number(digits);
        if (Number.isFinite(value)) {
          while (value > CURRENT_YEAR + 1 && value >= 10000) value = Math.floor(value / 10);
          rawValue = (value >= 1950 && value <= CURRENT_YEAR + 1) ? value : null;
        }
      }
    }
  }
  return rawValue ?? extractYearFromText(titulo) ?? extractYearFromText(descripcion) ?? null;
}

// ─── HP parsing ──────────────────────────────────────────
function parseHpValue(raw) {
  if (!raw) return null;
  const str = raw.toString().trim();
  if (str.toLowerCase() === 'no especifica') return null;
  const cleaned = str.replace(',', '.');
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value < 5 || value > 1000) return null;
  return value;
}

function extractHpFromText(text) {
  if (!text) return null;
  const match = text.match(/(\d{1,3}(?:[.,]\d{1,2})?)\s*hp\b/i);
  if (!match) return null;
  const value = Number(match[1].replace(',', '.'));
  if (!Number.isFinite(value) || value < 5 || value > 1000) return null;
  return value;
}

function parseHp(raw, titulo, descripcion) {
  const direct = parseHpValue(raw);
  const fromTitle = extractHpFromText(titulo);
  const fromDesc = extractHpFromText(descripcion);
  const context = fromTitle ?? fromDesc;
  if (direct !== null && context !== null) {
    const ratio = direct / context;
    if (ratio > 9.5 && ratio < 10.5) return context;
  }
  return direct ?? context ?? null;
}

// ─── Horas parsing ───────────────────────────────────────
function parseHorasValue(raw) {
  if (!raw) return null;
  const str = raw.toString().trim();
  if (str.toLowerCase() === 'no especifica') return null;
  const digits = str.replace(/[^0-9]/g, '');
  if (!digits) return null;
  const value = Number(digits);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

function extractHorasFromText(text) {
  if (!text) return null;
  const match = text.toString().match(/\b(horas|hs|hrs)\b\s*:?[\s]*([0-9][0-9.,]*)/i);
  if (!match?.[2]) return null;
  return parseHorasValue(match[2]);
}

function parseHoras(raw, titulo, descripcion) {
  return parseHorasValue(raw) ?? extractHorasFromText(titulo) ?? extractHorasFromText(descripcion) ?? null;
}

// ─── Price normalization ─────────────────────────────────
const USD_PATTERNS = ['U$S', 'US$', 'USD', 'U$'];
const ARS_PATTERNS = ['ARS'];

function normalizeCurrency(input, priceRaw) {
  const raw = (input ?? '').toString().toUpperCase().trim();
  if (USD_PATTERNS.some(p => raw.includes(p))) return 'USD';
  if (raw === '$' || ARS_PATTERNS.some(p => raw.includes(p))) return 'ARS';
  if (!raw && priceRaw) {
    const upper = priceRaw.toString().toUpperCase();
    if (USD_PATTERNS.some(p => upper.includes(p))) return 'USD';
    if (upper.includes('$')) return 'ARS';
  }
  return null;
}

function parsePriceRaw(raw) {
  if (raw === null || raw === undefined) return null;
  const normalized = raw.toString().trim();
  if (normalized.length === 0) return null;
  if (normalized.toLowerCase().includes('consultar')) return null;
  let cleaned = normalized.replace(/[^0-9.,]/g, '');
  if (!cleaned) return null;
  const hasDot = cleaned.includes('.');
  const hasComma = cleaned.includes(',');
  if (hasDot && hasComma) {
    cleaned = cleaned.replace(/\./g, '').replace(/,/g, '.');
  } else if (hasComma && !hasDot) {
    const parts = cleaned.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = `${parts[0].replace(/\./g, '')}.${parts[1]}`;
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (hasDot && !hasComma) {
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts.join('');
    } else if (parts.length === 2 && parts[1].length === 3) {
      cleaned = parts.join('');
    }
    // Agrofy format "9000.0000" — 4 decimals → treat as decimal
    // Already handled: parts.length === 2 && parts[1].length === 4 → keep as-is (float)
  }
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

// Threshold: if labeled USD but price > this, it's likely ARS
const USD_SANITY_MAX = 1500000;

function normalizePrice(precioRaw, monedaRaw, origen, fxRate) {
  const rate = fxRate || FX_RATE;
  let monedaNorm = normalizeCurrency(monedaRaw, precioRaw);
  const parsed = parsePriceRaw(precioRaw);
  if (parsed === null) return { precioUsd: null, precioArs: null, monedaNorm, parsed: null, priceFlags: [] };

  let precioFixed = parsed;
  const priceFlags = [];

  // Rastroagro special case
  if (origen === 'rastroagro' && monedaNorm === 'USD' && precioRaw
      && /^\d+\.\d{2}$/.test(precioRaw.toString().trim()) && parsed < 1000) {
    precioFixed = parsed * 1000;
  }
  if (precioFixed === 0) return { precioUsd: null, precioArs: null, monedaNorm, parsed: null, priceFlags: [] };

  // Detect ARS mislabeled as USD: if labeled USD but > $1.5M, treat as ARS
  if (monedaNorm === 'USD' && precioFixed > USD_SANITY_MAX) {
    monedaNorm = 'ARS';
    priceFlags.push('CURRENCY_CORRECTED_USD_TO_ARS');
  }

  if (monedaNorm === 'USD') return { precioUsd: precioFixed, precioArs: null, monedaNorm, parsed: precioFixed, priceFlags };
  if (monedaNorm === 'ARS') return { precioUsd: precioFixed / rate, precioArs: precioFixed, monedaNorm, parsed: precioFixed, priceFlags };
  return { precioUsd: null, precioArs: precioFixed, monedaNorm, parsed: precioFixed, priceFlags };
}

// ML: extract price from title (last match)
function extractPriceFromTitle(title) {
  if (!title) return { monedaRaw: null, precioRaw: null };
  const re = /(US\$|U\$S|U\$|USD|\$)\s*([0-9][0-9.,]*)/gi;
  let monedaRaw = null, precioRaw = null;
  for (const match of title.toString().matchAll(re)) {
    if (match[1] && match[2]) { monedaRaw = match[1].trim(); precioRaw = match[2].trim(); }
  }
  return { monedaRaw, precioRaw };
}

// ─── Location normalization ──────────────────────────────
const PROVINCE_MAP = {
  'CIUDAD AUTONOMA DE BUENOS AIRES': 'Ciudad Autónoma de Buenos Aires',
  'CABA': 'Ciudad Autónoma de Buenos Aires',
  'CAPITAL FEDERAL': 'Ciudad Autónoma de Buenos Aires',
  'BUENOS AIRES': 'Buenos Aires',
  'PROVINCIA DE BUENOS AIRES': 'Buenos Aires',
  'PBA': 'Buenos Aires',
  'BUENOS AIRES INTERIOR': 'Buenos Aires',
  // ML GBA variants
  'BS AS G B A NORTE': 'Buenos Aires',
  'BS AS G B A SUR': 'Buenos Aires',
  'BS AS G B A OESTE': 'Buenos Aires',
  'BS AS COSTA ATLANTICA': 'Buenos Aires',
  'BS AS G B A ESTE': 'Buenos Aires',
  'GBA NORTE': 'Buenos Aires',
  'GBA SUR': 'Buenos Aires',
  'GBA OESTE': 'Buenos Aires',
  // Tierra del Fuego
  'TIERRA DEL FUEGO': 'Tierra del Fuego',
  'TIERRA DEL FUEGO ANTARTIDA E ISLAS DEL ATLANTICO SUR': 'Tierra del Fuego',
  // Accented variants
  'CORDOBA': 'Córdoba',
  'ENTRE RIOS': 'Entre Ríos',
  'RIO NEGRO': 'Río Negro',
  'TUCUMAN': 'Tucumán',
  'NEUQUEN': 'Neuquén',
  // City-as-province fixes
  'PARANA': 'Entre Ríos',
  'DEPARTAMENTO DE MISIONES': 'Misiones',
  'L': null, // garbage
};

const CANONICAL_PROVINCES = [
  'Buenos Aires','Catamarca','Chaco','Chubut','Ciudad Autónoma de Buenos Aires',
  'Corrientes','Córdoba','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja',
  'Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis',
  'Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán',
];
const CANONICAL_LOOKUP = new Set(CANONICAL_PROVINCES.map(n =>
  n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
));

// Known city names that get misidentified as provinces
const CITY_TO_PROVINCE = {
  'SINSACATE': 'Córdoba',
  'ELENA': 'Córdoba',
  'COLON': 'Entre Ríos',
  'JOVITA': 'Córdoba',
  'CANADA DE GOMEZ': 'Santa Fe',
  'TRENQUE LAUQUEN': 'Buenos Aires',
  'VENADO TUERTO': 'Santa Fe',
  'TANDIL': 'Buenos Aires',
  'LAS LAJITAS': 'Salta',
  'SAN FRANCISCO': 'Córdoba',
};

function normalizeProvincia(value) {
  if (!value) return null;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length <= 1) return null; // filter garbage like "L"
  const key = cleaned.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim();
  // Check explicit map (may return null for garbage entries)
  if (key in PROVINCE_MAP) return PROVINCE_MAP[key];
  // Check canonical
  if (CANONICAL_LOOKUP.has(key)) {
    return CANONICAL_PROVINCES.find(p =>
      p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() === key
    ) || cleaned;
  }
  // Check if it's a known city
  if (CITY_TO_PROVINCE[key]) return CITY_TO_PROVINCE[key];
  return cleaned;
}

function deriveLocation(ubicacionRaw, localidadRaw, provinciaRaw) {
  // Agroads has separate localidad + provincia
  if (provinciaRaw) {
    return {
      provincia: normalizeProvincia(provinciaRaw),
      ciudad: localidadRaw ? localidadRaw.toString().trim() : null,
    };
  }
  if (!ubicacionRaw) return { provincia: null, ciudad: null };
  const trimmed = ubicacionRaw.toString().trim();
  if (!trimmed) return { provincia: null, ciudad: null };

  // Handle agronorteusados format: "Paraná (Entre Ríos)"
  const parenMatch = trimmed.match(/^(.+?)\s*\((.+?)\)\s*$/);
  if (parenMatch) {
    return {
      provincia: normalizeProvincia(parenMatch[2]),
      ciudad: parenMatch[1].trim(),
    };
  }

  const parts = trimmed.split(',').map(p => p.trim()).filter(Boolean);
  if (parts.length === 0) return { provincia: null, ciudad: null };
  if (parts.length === 1) {
    const guess = normalizeProvincia(parts[0]);
    const guessKey = guess ? guess.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() : '';
    if (guess && CANONICAL_LOOKUP.has(guessKey)) return { provincia: guess, ciudad: null };
    return { provincia: null, ciudad: parts[0] };
  }

  // ML special: "Escobar, Bs.As. G.B.A. Norte" → normalize the province part
  const lastPart = parts[parts.length - 1];
  const lastNorm = lastPart.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\./g, ' ').replace(/\s+/g, ' ').toUpperCase().trim();
  const provFromMap = PROVINCE_MAP[lastNorm];
  if (provFromMap) {
    return { provincia: provFromMap, ciudad: parts.slice(0, -1).join(', ') };
  }

  return {
    provincia: normalizeProvincia(lastPart),
    ciudad: parts.slice(0, -1).join(', '),
  };
}

// ─── Condition normalization ─────────────────────────────
function normalizeCondicion(condicionRaw, origen, anio, horas) {
  const flags = [];
  let condicion = null;

  if (origen === 'agronorteusados') {
    condicion = 'Usado';
    flags.push('CONDITION_INFERRED_FROM_ORIGIN');
    return { condicion, flags };
  }

  const value = (condicionRaw ?? '').toString().trim().toLowerCase();
  if (value.includes('usado') || value === 'used') condicion = 'Usado';
  else if (
    value.includes('nuevo') ||
    value === 'new' ||
    /\b0\s*[-–]?\s*km(s)?\b/.test(value) ||
    /\b0\s*kilo(metro|metros)?\b/.test(value) ||
    /\bcero\s*[-–]?\s*km\b/.test(value)
  ) condicion = 'Nuevo';
  else if (value === 'not_specified' || !value) {
    // Infer from year
    if (anio !== null && anio < CURRENT_YEAR - 2) {
      condicion = 'Usado';
      flags.push('CONDITION_INFERRED_USED_FROM_YEAR');
    }
  }

  // Override: marked as Nuevo but old year or has hours
  if (condicion === 'Nuevo') {
    const shouldOverride = (anio !== null && anio < CURRENT_YEAR - 3) || (horas !== null && horas > 0);
    if (shouldOverride) {
      condicion = 'Usado';
      flags.push('CONDITION_OVERRIDDEN_TO_USED');
    }
  }

  return { condicion, flags };
}

// ─── Competitor detection ────────────────────────────────
const COMPETITORS = [
  { pattern: 'criolani', name: 'Criolani' },
  { pattern: 'grosso', name: 'Grosso Tractores' },
  { pattern: 'agronorte', name: 'Agronorte' },
  { pattern: 'boglich', name: 'Boglich' },
  { pattern: 'diesel lange', name: 'Diesel Lange' },
  { pattern: 'conci', name: 'Conci SA' },
  { pattern: 'venturino', name: 'Venturino' },
];

function detectCompetitor(vendedor, origen) {
  // Venturino's own e-commerce inventory — NOT a competitor
  if (origen === 'venturino') return { esCompetidor: false, competidorNombre: null };

  // Direct origin match
  if (origen === 'agronorteusados') return { esCompetidor: true, competidorNombre: 'Agronorte' };
  if (origen === 'machinefinder') return { esCompetidor: true, competidorNombre: 'Diesel Lange' };

  if (!vendedor) return { esCompetidor: false, competidorNombre: null };
  const lower = vendedor.toLowerCase();
  for (const comp of COMPETITORS) {
    if (lower.includes(comp.pattern)) return { esCompetidor: true, competidorNombre: comp.name };
  }
  return { esCompetidor: false, competidorNombre: null };
}

// ─── Unified vendedor ────────────────────────────────────
function unifyVendedor(doc) {
  return doc.vendedor || doc.seller_name || null;
}

// ─── Year extraction from agroads description ────────────
function extractYearFromAgroadsDesc(descripcion) {
  if (!descripcion) return null;
  // Agroads descriptions often contain "Año: 2002" or "Año 2015"
  const match = descripcion.toString().match(/\ba[ñn]o\s*:?\s*(19\d{2}|20\d{2})\b/i);
  if (match) {
    const y = Number(match[1]);
    if (y >= 1950 && y <= CURRENT_YEAR + 1) return y;
  }
  return null;
}

// ─── Fecha scraping parsing ──────────────────────────────
function parseFechaScraping(raw) {
  if (!raw) return null;
  const str = raw.toString().trim();
  // Format: "11-02-2026" (DD-MM-YYYY)
  const match = str.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  // Try ISO
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

// ─── Flags builder ───────────────────────────────────────
function buildFlags({ precioUsd, anio, hp, horas, provincia, condicion, extraFlags }) {
  const flags = [...(extraFlags || [])];
  if (precioUsd === null) flags.push('MISSING_PRICE');
  if (anio === null) flags.push('MISSING_YEAR');
  if (hp === null) flags.push('MISSING_HP');
  if (horas === null) flags.push('MISSING_HOURS');
  if (!provincia) flags.push('MISSING_LOCATION');
  if (condicion === 'Nuevo' && anio !== null && anio < CURRENT_YEAR - 2) {
    flags.push('YEAR_CONDITION_CONFLICT');
  }
  // Price outlier detection
  if (precioUsd !== null) {
    if (precioUsd < 500) flags.push('PRICE_SUSPICIOUS_LOW');
    if (precioUsd > 1000000) flags.push('PRICE_SUSPICIOUS_HIGH');
  }
  return [...new Set(flags)];
}

// ─── Main pipeline ───────────────────────────────────────
async function main() {
  console.log('=== Pipeline: MongoDB JSON → PostgreSQL ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  // Load FX rate from database (fallback to hardcoded)
  const prismaInit = new PrismaClient();
  try {
    const latestFx = await prismaInit.fxRate.findFirst({ orderBy: { createdAt: 'desc' } });
    if (latestFx) {
      FX_RATE = Number(latestFx.rate);
      console.log(`FX Rate (from DB): ${FX_RATE} ARS/USD`);
    } else {
      console.log(`FX Rate (fallback): ${FX_RATE} ARS/USD`);
    }
  } catch (e) {
    console.log(`FX Rate (fallback, DB not available): ${FX_RATE} ARS/USD`);
  } finally {
    await prismaInit.$disconnect();
  }
  console.log();

  // 1. Load data
  console.log('Loading data...');
  const docs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  console.log(`  Total documents: ${docs.length}`);

  // 2. Filter to core categories
  console.log('Filtering to core categories...');
  const filtered = docs.filter(doc => {
    const cat = normalizeCategoria(doc.categoria);
    return cat !== null;
  });
  console.log(`  After category filter: ${filtered.length} (discarded ${docs.length - filtered.length})`);

  // 3. Process each document
  console.log('Processing documents...');
  const processed = [];
  const stats = {
    byCategoria: {},
    byOrigen: {},
    priceOk: 0, priceNull: 0,
    yearOk: 0, yearNull: 0, yearExtracted: 0,
    hpOk: 0, hpNull: 0,
    horasOk: 0, horasNull: 0,
    condicionNuevo: 0, condicionUsado: 0, condicionNull: 0,
    competitors: 0,
    flagCounts: {},
  };

  for (const doc of filtered) {
    const origen = doc.origen || 'unknown';
    const categoria = normalizeCategoria(doc.categoria);
    const titulo = doc.titulo || null;
    const descripcion = doc.descripcion || null;

    // Year: special handling for agroads (no anio field)
    let anioRaw = doc.anio;
    let yearExtraFlags = [];
    let anio;
    if (origen === 'agroads' && (anioRaw === null || anioRaw === undefined || anioRaw === '')) {
      // Try to extract from description/title
      anio = extractYearFromAgroadsDesc(descripcion) ?? extractYearFromText(titulo) ?? extractYearFromText(descripcion);
      if (anio !== null) {
        yearExtraFlags.push('YEAR_EXTRACTED_FROM_TEXT');
        stats.yearExtracted++;
      }
    } else {
      anio = parseYear(anioRaw, titulo, descripcion);
    }

    // HP
    const hpRaw = doc.hp;
    const hp = parseHp(hpRaw, titulo, descripcion);

    // Horas
    const horasRaw = doc.horas;
    const horas = parseHoras(horasRaw, titulo, descripcion);

    // Price: ML special handling
    let precioRaw = doc.precio;
    let monedaRaw = doc.moneda;
    if (origen === 'ml') {
      const extracted = extractPriceFromTitle(titulo);
      if (extracted.precioRaw) precioRaw = extracted.precioRaw;
      if (extracted.monedaRaw) monedaRaw = extracted.monedaRaw;
    }
    const { precioUsd, precioArs, monedaNorm, priceFlags } = normalizePrice(
      precioRaw !== null && precioRaw !== undefined ? precioRaw.toString() : null,
      monedaRaw !== null && monedaRaw !== undefined ? monedaRaw.toString() : null,
      origen,
      FX_RATE
    );

    // Location
    const { provincia, ciudad } = deriveLocation(doc.ubicacion, doc.localidad, doc.provincia);

    // Condition
    const { condicion, flags: condicionFlags } = normalizeCondicion(doc.condicion, origen, anio, horas);

    // Vendedor
    const vendedor = unifyVendedor(doc);
    const tipoVendedor = doc.usuario_tipo_empresa_nombre || null;

    // Competitor
    const { esCompetidor, competidorNombre } = detectCompetitor(vendedor, origen);

    // Brand & model (with brand-model split)
    const marca = doc.marca || null;
    const { marcaNorm, modeloForNorm } = normalizeBrandAndModel(marca, doc.modelo);
    let modelo = doc.modelo || null;
    let modeloNorm = normalizeModel(modeloForNorm);
    // If model is purely numeric (no series letters), try to enrich from title
    // e.g. modelo="7.90" → modeloNorm="7 90" but title says "Cr 7.90" → "CR790"
    if (modeloNorm && /^\d[\d ]*$/.test(modeloNorm) && titulo) {
      const titleInferred = inferModelFromTitle(titulo, marca, marcaNorm);
      if (titleInferred && /[A-Z]/.test(titleInferred)) {
        modeloNorm = titleInferred;
        yearExtraFlags.push('MODEL_INFERRED_FROM_TITLE');
      }
    }
    // If model is empty, try to infer from title
    if (!modeloNorm && titulo) {
      modeloNorm = inferModelFromTitle(titulo, marca, marcaNorm);
      if (modeloNorm) yearExtraFlags.push('MODEL_INFERRED_FROM_TITLE');
    }

    // Flags
    const allExtraFlags = [...yearExtraFlags, ...condicionFlags, ...(priceFlags || [])];
    const flags = buildFlags({ precioUsd, anio, hp, horas, provincia, condicion, extraFlags: allExtraFlags });

    // IVA & financiacion
    const iva = doc.iva || null;
    const financiacion = doc.financiacion || doc.paymentMethod || doc.formas_de_pago || null;

    // Fecha scraping
    const fechaScraping = parseFechaScraping(doc.fecha_scraping);
    const fechaPublicacion = doc.fecha_publicacion || null;

    const url = (doc.url || '').toString().trim();
    if (!url) continue; // skip docs without URL

    const record = {
      origen,
      url,
      titulo,
      descripcion,
      categoriaRaw: doc.categoria || null,
      categoria,
      marca,
      marcaNorm,
      modelo,
      modeloNorm,
      anio,
      anioRaw: anioRaw !== null && anioRaw !== undefined ? anioRaw.toString() : null,
      hp: hp !== null ? hp : null,
      hpRaw: hpRaw !== null && hpRaw !== undefined ? hpRaw.toString() : null,
      horas: horas !== null ? horas : null,
      horasRaw: horasRaw !== null && horasRaw !== undefined ? horasRaw.toString() : null,
      condicionRaw: doc.condicion || null,
      condicion,
      precioRaw: precioRaw !== null && precioRaw !== undefined ? precioRaw.toString() : null,
      monedaRaw: monedaRaw !== null && monedaRaw !== undefined ? monedaRaw.toString() : null,
      monedaNorm,
      precioUsd: precioUsd !== null ? Math.round(precioUsd * 100) / 100 : null,
      precioArs: precioArs !== null ? Math.round(precioArs * 100) / 100 : null,
      ubicacionRaw: doc.ubicacion || doc.localidad || null,
      provincia,
      ciudad,
      vendedor,
      tipoVendedor,
      esCompetidor,
      competidorNombre,
      iva,
      financiacion: financiacion ? financiacion.toString().substring(0, 2000) : null,
      fechaScraping,
      fechaPublicacion,
      flags,
    };

    processed.push(record);

    // Stats
    stats.byCategoria[categoria] = (stats.byCategoria[categoria] || 0) + 1;
    stats.byOrigen[origen] = (stats.byOrigen[origen] || 0) + 1;
    if (precioUsd !== null) stats.priceOk++; else stats.priceNull++;
    if (anio !== null) stats.yearOk++; else stats.yearNull++;
    if (hp !== null) stats.hpOk++; else stats.hpNull++;
    if (horas !== null) stats.horasOk++; else stats.horasNull++;
    if (condicion === 'Nuevo') stats.condicionNuevo++;
    else if (condicion === 'Usado') stats.condicionUsado++;
    else stats.condicionNull++;
    if (esCompetidor) stats.competitors++;
    flags.forEach(f => { stats.flagCounts[f] = (stats.flagCounts[f] || 0) + 1; });
  }

  console.log(`  Processed: ${processed.length}`);
  console.log();

  // 4. Print stats
  console.log('=== PROCESSING STATS ===');
  console.log(`\nBy category:`);
  Object.entries(stats.byCategoria).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  console.log(`\nBy origen:`);
  Object.entries(stats.byOrigen).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  console.log(`\nPrice: ${stats.priceOk} ok, ${stats.priceNull} null (${((stats.priceOk / processed.length) * 100).toFixed(1)}%)`);
  console.log(`Year: ${stats.yearOk} ok, ${stats.yearNull} null (${((stats.yearOk / processed.length) * 100).toFixed(1)}%) [${stats.yearExtracted} extracted from text]`);
  console.log(`HP: ${stats.hpOk} ok, ${stats.hpNull} null (${((stats.hpOk / processed.length) * 100).toFixed(1)}%)`);
  console.log(`Horas: ${stats.horasOk} ok, ${stats.horasNull} null (${((stats.horasOk / processed.length) * 100).toFixed(1)}%)`);
  console.log(`Condicion: ${stats.condicionNuevo} Nuevo, ${stats.condicionUsado} Usado, ${stats.condicionNull} null`);
  console.log(`Competitors detected: ${stats.competitors}`);
  console.log(`\nFlag counts:`);
  Object.entries(stats.flagCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  if (DRY_RUN) {
    console.log('\n=== DRY RUN — no data written to PostgreSQL ===');
    // Write sample to file for inspection
    const samplePath = path.join(__dirname, '..', 'data', 'pipeline_sample.json');
    fs.writeFileSync(samplePath, JSON.stringify(processed.slice(0, 20), null, 2), 'utf8');
    console.log(`Sample written to ${samplePath}`);
    return;
  }

  // 5. Insert into PostgreSQL
  console.log('\n=== Inserting into PostgreSQL ===');
  const prisma = new PrismaClient();

  try {
    // Create scraping run
    const run = await prisma.scrapingRun.create({
      data: {
        runDate: new Date(),
        sourceFile: 'data/mongo_export.json',
        sourceCount: docs.length,
        filteredCount: filtered.length,
        processedCount: processed.length,
      },
    });
    console.log(`  Created scraping run #${run.id}`);

    // Clear existing listings and price history (full replace strategy for initial load)
    const deletedHistory = await prisma.priceHistory.deleteMany({});
    console.log(`  Cleared ${deletedHistory.count} price history records`);
    const deleted = await prisma.listing.deleteMany({});
    console.log(`  Cleared ${deleted.count} existing listings`);

    const now = new Date();
    // Insert in batches
    let inserted = 0;
    for (let i = 0; i < processed.length; i += BATCH_SIZE) {
      const batch = processed.slice(i, i + BATCH_SIZE);
      const result = await prisma.listing.createMany({
        data: batch.map(r => ({
          ...r,
          scrapingRunId: run.id,
          active: true,
          firstSeenAt: now,
          lastSeenAt: now,
        })),
        skipDuplicates: true,
      });
      inserted += result.count;
      process.stdout.write(`\r  Inserted: ${inserted}/${processed.length}`);
    }
    console.log(`\n  Done! ${inserted} listings inserted.`);

    // Seed price history snapshots for traceability
    console.log(`  Seeding price history snapshots...`);
    const snapshotDate = new Date(new Date().toISOString().split('T')[0]);
    const listings = await prisma.listing.findMany({
      select: { id: true, precioUsd: true, monedaNorm: true, precioRaw: true },
    });

    let historyInserted = 0;
    for (let i = 0; i < listings.length; i += BATCH_SIZE) {
      const batch = listings.slice(i, i + BATCH_SIZE);
      const res = await prisma.priceHistory.createMany({
        data: batch.map(l => ({
          listingId: l.id,
          precioUsd: l.precioUsd,
          monedaNorm: l.monedaNorm,
          precioRaw: l.precioRaw,
          scrapingRunId: run.id,
          snapshotDate,
        })),
      });
      historyInserted += res.count;
      process.stdout.write(`\r  PriceHistory: ${historyInserted}/${listings.length}`);
    }
    console.log(`\n  Done! ${historyInserted} price history snapshots inserted.`);

    // Verify
    const count = await prisma.listing.count();
    console.log(`  Verification: ${count} listings in database`);

  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error('Pipeline error:', e);
  process.exit(1);
});
