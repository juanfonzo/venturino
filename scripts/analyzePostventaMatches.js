const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { loadEnvFile } = require("./pipeline-shared");

loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "algorym";
const COLLECTION_NAME = process.env.POSTVENTA_MONGO_COLLECTION || "productos";

const DEFAULT_SAMPLE_SIZE = 15;
const DEFAULT_TOP_N = 20;
const DEFAULT_PRICE_BAND = 0.4;
const MIN_SCORE = 20;

const REPORT_PATH = path.join(__dirname, "..", "reports", "postventa-match-analysis.md");
const JSON_PATH = path.join(__dirname, "..", "data", "postventa_match_analysis.json");

const STOPWORDS = new Set([
  "a",
  "al",
  "ante",
  "articulo",
  "articulos",
  "con",
  "de",
  "del",
  "el",
  "en",
  "la",
  "las",
  "lo",
  "los",
  "para",
  "por",
  "sin",
  "un",
  "una",
  "unas",
  "uno",
  "y",
]);

const BRAND_TOKENS = new Set(["john", "deere", "jd"]);

const TOKEN_SYNONYMS = new Map([
  ["jhon", "john"],
  ["jhondeere", "john"],
  ["johndeere", "john"],
  ["gorro", "gorra"],
  ["gorros", "gorra"],
  ["gorras", "gorra"],
  ["cap", "gorra"],
  ["caps", "gorra"],
  ["neumaticos", "neumatico"],
  ["tire", "neumatico"],
  ["tyre", "neumatico"],
  ["filtros", "filtro"],
  ["filtrante", "filtro"],
  ["cuchillas", "cuchilla"],
  ["navajas", "navaja"],
  ["cinceles", "cincel"],
  ["correas", "correa"],
  ["belt", "correa"],
  ["belts", "correa"],
  ["latas", "lata"],
  ["carburadores", "carburador"],
  ["termos", "termo"],
  ["bolsos", "bolso"],
  ["remeras", "remera"],
  ["camisetas", "remera"],
  ["motores", "motor"],
  ["hidraulicos", "hidraulico"],
  ["hidraulica", "hidraulico"],
  ["lts", "l"],
  ["lts.", "l"],
  ["litro", "l"],
  ["litros", "l"],
  ["pulgadas", "pulgada"],
  ["llaves", "llave"],
  ["tubos", "tubo"],
  ["piezas", "pieza"],
  ["herramientas", "herramienta"],
  ["combustibles", "combustible"],
  ["manometros", "manometro"],
  ["baterias", "bateria"],
  ["generadores", "generador"],
  ["sopladores", "soplador"],
  ["bombas", "bomba"],
  ["motobombas", "motobomba"],
  ["motoguadanas", "motoguadana"],
  ["motoguadañas", "motoguadana"],
  ["cortadoras", "cortadora"],
  ["cuchillos", "cuchillo"],
  ["punzones", "punzon"],
  ["puntones", "punton"],
  ["pinzas", "pinza"],
  ["enfriadores", "enfriador"],
  ["acondicionadores", "acondicionador"],
  ["mejoradores", "mejorador"],
  ["inyectores", "inyector"],
  ["boquillas", "boquilla"],
  ["botellas", "botella"],
  ["jarros", "jarro"],
  ["mates", "mate"],
  ["materos", "mate"],
  ["matero", "mate"],
  ["bombillas", "bombilla"],
  ["mochilas", "mochila"],
  ["boinas", "boina"],
  ["bandejas", "bandeja"],
  ["materas", "matera"],
  ["anticongelantes", "anticongelante"],
  ["coolgard", "cool-gard"],
  ["tractir", "tractor"],
  ["duals", "dual"],
]);

const PRODUCT_TYPE_BY_TOKEN = new Map([
  ["gorra", "GORRA"],
  ["neumatico", "NEUMATICO"],
  ["aceite", "ACEITE"],
  ["lubricante", "ACEITE"],
  ["filtro", "FILTRO"],
  ["manometro", "MANOMETRO"],
  ["bateria", "BATERIA"],
  ["generador", "GENERADOR"],
  ["soplador", "SOPLADOR"],
  ["bomba", "BOMBA"],
  ["enfriador", "ENFRIADOR"],
  ["cuchilla", "CUCHILLA"],
  ["navaja", "NAVAJA"],
  ["cuchillo", "CUCHILLO"],
  ["cincel", "CINCEL"],
  ["punton", "CUCHILLA"],
  ["punzon", "PUNZON"],
  ["pinza", "PINZA"],
  ["isg", "ISG"],
  ["correa", "CORREA"],
  ["lata", "LATA"],
  ["carburador", "CARBURADOR"],
  ["aditivo", "ADITIVO"],
  ["acondicionador", "ADITIVO"],
  ["mejorador", "ADITIVO"],
  ["inyector", "INYECCION"],
  ["boquilla", "INYECCION"],
  ["botella", "BOTELLA"],
  ["jarro", "JARRO"],
  ["mate", "MATE"],
  ["bombilla", "MATE"],
  ["mochila", "MOCHILA"],
  ["boina", "BOINA"],
  ["bandeja", "BANDEJA"],
  ["matera", "MATERA"],
  ["anticongelante", "REFRIGERANTE"],
  ["cool-gard", "REFRIGERANTE"],
  ["termo", "TERMO"],
  ["bolso", "BOLSO"],
  ["remera", "INDUMENTARIA"],
  ["herramienta", "HERRAMIENTA"],
  ["palanca", "HERRAMIENTA"],
  ["juguete", "JUGUETE"],
  ["motobomba", "MOTOBOMBA"],
  ["motoguadana", "MOTOGUADANA"],
  ["cortadora", "CORTADORA"],
]);

const TECHNICAL_DETAIL_TYPES = new Set([
  "ACEITE",
  "FILTRO",
  "BATERIA",
  "BOMBA",
  "ENFRIADOR",
  "INYECCION",
  "CORREA",
  "CUCHILLA",
  "NAVAJA",
  "CUCHILLO",
  "CINCEL",
  "PUNZON",
  "MOTOBOMBA",
  "MOTOGUADANA",
  "CORTADORA",
  "GENERADOR",
  "SOPLADOR",
  "MANOMETRO",
  "CARBURADOR",
]);

const SPECIFIC_TYPE_TOKENS = new Map([
  ["PINZA", "pinza"],
  ["MATE", "mate"],
  ["MATERA", "matera"],
  ["NAVAJA", "navaja"],
  ["CUCHILLA", "cuchilla"],
  ["CUCHILLO", "cuchillo"],
  ["CINCEL", "cincel"],
  ["PUNZON", "punzon"],
]);

function parseArgs(argv) {
  const out = {
    sampleSize: DEFAULT_SAMPLE_SIZE,
    topN: DEFAULT_TOP_N,
    priceBand: DEFAULT_PRICE_BAND,
  };

  argv.forEach((arg, index) => {
    const next = argv[index + 1];
    if (arg === "--sample" && next) out.sampleSize = Number(next);
    if (arg === "--top" && next) out.topN = Number(next);
    if (arg === "--price-band" && next) out.priceBand = Number(next);
  });

  out.sampleSize = Number.isFinite(out.sampleSize)
    ? Math.max(1, Math.min(Math.round(out.sampleSize), 1000))
    : DEFAULT_SAMPLE_SIZE;
  out.topN = Number.isFinite(out.topN)
    ? Math.max(1, Math.min(Math.round(out.topN), 50))
    : DEFAULT_TOP_N;
  out.priceBand = Number.isFinite(out.priceBand)
    ? Math.max(0.05, Math.min(out.priceBand, 2))
    : DEFAULT_PRICE_BAND;

  return out;
}

function normalizeBase(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(/&/g, " y ")
    .replace(/\+/g, " ")
    .replace(/,/g, ".")
    .trim();
}

function canonicalToken(token) {
  let current = token.toLowerCase();
  if (TOKEN_SYNONYMS.has(current)) return TOKEN_SYNONYMS.get(current);
  if (current.length > 4 && current.endsWith("es")) current = current.slice(0, -2);
  else if (current.length > 4 && current.endsWith("s")) current = current.slice(0, -1);
  return TOKEN_SYNONYMS.get(current) || current;
}

function tokenize(value) {
  const normalized = normalizeBase(value);
  const rawTokens = normalized.match(/[a-z0-9]+(?:[.\-x][a-z0-9]+)*/g) || [];
  return rawTokens
    .map(canonicalToken)
    .filter((token) => token.length > 0 && !STOPWORDS.has(token));
}

function unique(values) {
  return Array.from(new Set(values));
}

function extractFeatures(name, origin) {
  const tokens = unique(tokenize(name));
  const tokenSet = new Set(tokens);
  const brand = tokenSet.has("jd") || (tokenSet.has("john") && tokenSet.has("deere"));
  const types = inferProductTypes(tokens, normalizeBase(name), origin);
  const strongTokens = tokens.filter(isStrongToken);
  const primaryTokens = tokens.filter((token) => !BRAND_TOKENS.has(token));
  const batteryAh = extractBatteryAh(normalizeBase(name));
  return {
    normalized: normalizeBase(name),
    tokens,
    tokenSet,
    brand,
    types,
    strongTokens,
    primaryTokens,
    batteryAh,
  };
}

function inferProductTypes(tokens, normalizedName, origin) {
  const types = tokens.map((token) => PRODUCT_TYPE_BY_TOKEN.get(token)).filter(Boolean);
  const toyHints = [
    "juguete",
    "toy",
    "armar",
    "paca",
    "heno",
    "vagon",
    "pedal",
    "llavero",
    "fundido",
    "replica",
    "prestige",
    "escala",
    "miniatura",
    "bif",
    "big scoop",
    "johnny",
    "dual",
    "duals",
    "oruga",
    "orugas",
    "baler",
    "crop",
    "row",
    "ertl",
    "tommy",
    "tomy",
    "bruder",
    "build",
    "buddy",
    "farmin",
    "friends",
    "1/64",
    "1:64",
    "1/32",
    "1:32",
  ];
  if (toyHints.some((token) => normalizedName.includes(token))) {
    types.push("JUGUETE");
  }
  if (
    tokens.includes("vehiculo") &&
    (tokens.includes("juego") || tokens.includes("set") || tokens.includes("mini"))
  ) {
    types.push("JUGUETE");
  }
  const machineryToyTokens = ["tractor", "cosechadora", "camion", "camioneta", "cargador"];
  if (
    origin === "venturino" &&
    machineryToyTokens.some((token) => tokens.includes(token)) &&
    !types.some((type) => TECHNICAL_DETAIL_TYPES.has(type))
  ) {
    types.push("JUGUETE");
  }
  if (
    tokens.includes("herramienta") ||
    ((tokens.includes("juego") || tokens.includes("set")) &&
      (tokens.includes("llave") || tokens.includes("tubo") || tokens.includes("pieza")))
  ) {
    types.push("HERRAMIENTA");
  }
  if (tokens.includes("palanca") && tokens.includes("barra")) {
    types.push("HERRAMIENTA");
  }
  if (tokens.includes("llave") || tokens.includes("cincel") || tokens.includes("punzon")) {
    types.push("HERRAMIENTA");
  }
  if (normalizedName.includes("hy-gard") || normalizedName.includes("hy gard") || normalizedName.includes("plus-50")) {
    types.push("ACEITE");
  }
  const normalizedTypes = unique(types);
  const primaryPriority = [
    "ISG",
    "MANOMETRO",
    "BATERIA",
    "GENERADOR",
    "SOPLADOR",
    "FILTRO",
    "BOMBA",
    "ENFRIADOR",
    "INYECCION",
    "REFRIGERANTE",
    "CUCHILLA",
    "NAVAJA",
    "CUCHILLO",
    "CINCEL",
    "PUNZON",
    "PINZA",
    "MOTOBOMBA",
    "MOTOGUADANA",
    "CORTADORA",
  ];
  const primary = primaryPriority.find((type) => normalizedTypes.includes(type));
  if (primary) return [primary];
  return normalizedTypes;
}

function extractBatteryAh(normalizedName) {
  const match = normalizedName.match(/\b(\d{2,3})\s*ah\b/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function isStrongToken(token) {
  if (!/\d/.test(token)) return false;
  if (/[a-z]/.test(token) && /\d/.test(token)) return true;
  if (/[.x-]/.test(token)) return true;
  return token.length >= 3;
}

function parsePrice(value, textValue) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  const raw = value !== undefined && value !== null ? value : textValue;
  if (!raw) return null;
  let cleaned = raw.toString().trim();
  if (!cleaned) return null;
  cleaned = cleaned.replace(/[^0-9.,]/g, "");
  if (!cleaned) return null;
  const hasDot = cleaned.includes(".");
  const hasComma = cleaned.includes(",");

  if (hasDot && hasComma) {
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  } else if (hasComma && !hasDot) {
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  } else if (hasDot && !hasComma) {
    const parts = cleaned.split(".");
    if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3)) {
      cleaned = parts.join("");
    }
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  const text = value.toString().trim();
  let match = text.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    const [, dd, mm, yyyy] = match;
    const date = new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, yyyy, mm, dd] = match;
    const date = new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateKey(date) {
  if (!date) return null;
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

function getRecordDate(doc) {
  return parseDate(doc.fecha_scraping) || parseDate(doc.scraping_date) || parseDate(doc.scraped_at);
}

function getStableId(doc) {
  const origin = (doc.origen || "").toString().trim().toLowerCase();
  if (origin === "venturino") return doc.producto_id ? String(doc.producto_id) : null;
  if (origin === "ml") return doc.ml_item_id ? String(doc.ml_item_id) : null;
  return null;
}

function toProduct(doc) {
  const origin = (doc.origen || "").toString().trim().toLowerCase();
  const name = doc.nombre ? String(doc.nombre).trim() : "";
  const price = parsePrice(doc.precio, doc.precio_texto);
  const id = getStableId(doc);
  const scrapedDate = getRecordDate(doc);
  return {
    id,
    origin,
    name,
    price,
    priceText: doc.precio_texto ? String(doc.precio_texto) : null,
    moneda: doc.moneda ? String(doc.moneda) : null,
    url: doc.url ? String(doc.url) : null,
    categoriaMl: doc.categoria_ml ? String(doc.categoria_ml) : null,
    scrapedDate: scrapedDate ? dateKey(scrapedDate) : null,
    features: extractFeatures(name, origin),
  };
}

function intersection(a, b) {
  return a.filter((item) => b.has(item));
}

function ratioPercent(value) {
  if (value === null || value === undefined) return "-";
  return `${(value * 100).toFixed(1)}%`;
}

function formatArs(value) {
  if (value === null || value === undefined) return "-";
  return `$${Math.round(value).toLocaleString("es-AR")}`;
}

function scoreCandidate(venturino, ml) {
  const vf = venturino.features;
  const mf = ml.features;
  const reasons = [];
  let score = 0;

  const commonPrimary = intersection(vf.primaryTokens, new Set(mf.primaryTokens)).filter(
    (token) => !BRAND_TOKENS.has(token),
  );
  const commonStrong = intersection(vf.strongTokens, new Set(mf.strongTokens));
  const commonTypes = intersection(vf.types, new Set(mf.types));
  const typeMismatch = vf.types.length > 0 && mf.types.length > 0 && commonTypes.length === 0;
  const brandMatch = vf.brand && mf.brand;

  if (commonTypes.length > 0) {
    score += 35;
    reasons.push(`tipo: ${commonTypes.join(", ")}`);
  }

  if (typeMismatch) {
    score -= 45;
    reasons.push(`penalización tipo distinto (${vf.types.join(", ")} vs ${mf.types.join(", ")})`);
  }

  if (vf.batteryAh !== null) {
    if (mf.batteryAh === vf.batteryAh) {
      score += 25;
      reasons.push(`capacidad batería: ${vf.batteryAh}Ah`);
    } else if (mf.batteryAh !== null) {
      score -= 35;
      reasons.push(`penalización capacidad batería distinta (${vf.batteryAh}Ah vs ${mf.batteryAh}Ah)`);
    } else {
      score -= 12;
      reasons.push(`capacidad batería no informada en candidato (${vf.batteryAh}Ah)`);
    }
  }

  const extraCandidateTypes = mf.types.filter((type) => !vf.types.includes(type));
  if (commonTypes.length > 0 && extraCandidateTypes.length > 0) {
    const penalizableExtraTypes = extraCandidateTypes.filter(
      (type) => !(vf.types.includes("MATERA") && ["BOLSO", "MATE"].includes(type)),
    );
    const technicalExtraCount = penalizableExtraTypes.filter((type) => TECHNICAL_DETAIL_TYPES.has(type)).length;
    const genericExtraCount = penalizableExtraTypes.length - technicalExtraCount;
    score -= Math.min(technicalExtraCount * 25 + genericExtraCount * 10, 40);
    if (penalizableExtraTypes.length > 0) {
      reasons.push(`penalización tipo adicional candidato: ${penalizableExtraTypes.join(", ")}`);
    }
  }

  const specificTypeMatched = commonTypes.some((type) => {
    const token = SPECIFIC_TYPE_TOKENS.get(type);
    return token && commonPrimary.includes(token);
  });
  if (specificTypeMatched) {
    score += 6;
  }

  if (commonStrong.length > 0) {
    const points = Math.min(commonStrong.length * 14, 42);
    score += points;
    reasons.push(`tokens técnicos: ${commonStrong.join(", ")}`);
  }

  if (commonPrimary.length > 0) {
    const points = Math.min(commonPrimary.length * 5, 35);
    score += points;
    reasons.push(`tokens comunes: ${commonPrimary.slice(0, 8).join(", ")}`);
  }

  const union = new Set([...vf.primaryTokens, ...mf.primaryTokens]);
  const jaccard = union.size ? commonPrimary.length / union.size : 0;
  if (jaccard > 0) {
    score += Math.round(jaccard * 25);
  }

  if (brandMatch) {
    score += 6;
    reasons.push("compatibilidad/marca: John Deere");
  }

  if (commonPrimary.length === 0 && commonStrong.length === 0 && commonTypes.length === 0) {
    score = 0;
    reasons.push("sin evidencia semántica suficiente");
  }

  score = Math.max(0, Math.round(score));
  const confidence = score >= 70 ? "alta" : score >= 45 ? "media" : score >= MIN_SCORE ? "baja" : "descartar";

  return {
    score,
    confidence,
    reasons,
  };
}

function buildCandidates(venturino, mlProducts, topN, priceBand) {
  const minPrice = venturino.price * (1 - priceBand);
  const maxPrice = venturino.price * (1 + priceBand);
  const evaluated = [];
  let excludedByPrice = 0;
  let excludedByScore = 0;

  for (const ml of mlProducts) {
    if (!venturino.price || !ml.price) continue;
    const diffPct = (ml.price - venturino.price) / venturino.price;
    if (ml.price < minPrice || ml.price > maxPrice) {
      excludedByPrice += 1;
      continue;
    }

    const scored = scoreCandidate(venturino, ml);
    if (scored.score < MIN_SCORE) {
      excludedByScore += 1;
      continue;
    }

    evaluated.push({
      id: ml.id,
      name: ml.name,
      price: ml.price,
      url: ml.url,
      categoriaMl: ml.categoriaMl,
      diffPct,
      score: scored.score,
      confidence: scored.confidence,
      reasons: scored.reasons,
    });
  }

  evaluated.sort((a, b) => {
    const confidenceOrder = { alta: 3, media: 2, baja: 1, descartar: 0 };
    return (
      b.score - a.score ||
      confidenceOrder[b.confidence] - confidenceOrder[a.confidence] ||
      Math.abs(a.diffPct) - Math.abs(b.diffPct)
    );
  });

  const candidates = evaluated.slice(0, topN);
  const prices = candidates.map((candidate) => candidate.price).sort((a, b) => a - b);
  const median =
    prices.length === 0
      ? null
      : prices.length % 2
        ? prices[Math.floor(prices.length / 2)]
        : (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;

  const ventVsMedianPct =
    median && venturino.price ? (venturino.price - median) / median : null;
  const rankedConfidence = { alta: 3, media: 2, baja: 1, descartar: 0 };
  const bestConfidence = candidates.reduce(
    (best, candidate) =>
      rankedConfidence[candidate.confidence] > rankedConfidence[best] ? candidate.confidence : best,
    "descartar",
  );
  const strongCandidateCount = candidates.filter((candidate) => rankedConfidence[candidate.confidence] >= 2).length;
  const status =
    candidates.length === 0
      ? "sin comparable"
      : bestConfidence === "baja" || strongCandidateCount === 0
        ? "baja confianza"
        : ventVsMedianPct !== null && ventVsMedianPct > 0
          ? "Venturino más caro que ML"
          : ventVsMedianPct !== null && ventVsMedianPct < 0
            ? "Venturino más barato que ML"
            : "similar a ML";

  return {
    candidates,
    median,
    ventVsMedianPct,
    status,
    bestConfidence,
    strongCandidateCount,
    excludedByPrice,
    excludedByScore,
    totalValidBeforeTop: evaluated.length,
  };
}

function pickEvenly(items, count) {
  if (items.length <= count) return items.slice();
  const out = [];
  const step = (items.length - 1) / Math.max(1, count - 1);
  for (let i = 0; i < count; i += 1) {
    out.push(items[Math.round(i * step)]);
  }
  return uniqueBy(out, (item) => item.id).slice(0, count);
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = getKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function selectSample(venturinoProducts, sampleSize) {
  const valid = uniqueBy(
    venturinoProducts.filter((item) => item.id && item.name && item.price),
    (item) => item.id,
  ).sort((a, b) => a.name.localeCompare(b.name));

  const byPrice = valid.slice().sort((a, b) => a.price - b.price);
  const withStrong = valid.filter((item) => item.features.strongTokens.length > 0);
  const longNames = valid.filter((item) => item.features.primaryTokens.length >= 6);
  const shortNames = valid.filter((item) => item.features.primaryTokens.length <= 3);
  const typed = valid.filter((item) => item.features.types.length > 0);

  const buckets = [
    pickEvenly(withStrong, 4),
    pickEvenly(typed, 4),
    pickEvenly(longNames, 3),
    pickEvenly(shortNames, 2),
    pickEvenly(byPrice, 2),
  ];

  const selected = uniqueBy(buckets.flat(), (item) => item.id);
  if (selected.length >= sampleSize) return selected.slice(0, sampleSize);

  const remaining = valid.filter((item) => !selected.some((selectedItem) => selectedItem.id === item.id));
  return selected.concat(pickEvenly(remaining, sampleSize - selected.length)).slice(0, sampleSize);
}

function summarize(results) {
  const statusCounts = {};
  const confidenceCounts = {};
  let totalCandidates = 0;

  results.forEach((item) => {
    statusCounts[item.match.status] = (statusCounts[item.match.status] || 0) + 1;
    item.match.candidates.forEach((candidate) => {
      totalCandidates += 1;
      confidenceCounts[candidate.confidence] = (confidenceCounts[candidate.confidence] || 0) + 1;
    });
  });

  return { statusCounts, confidenceCounts, totalCandidates };
}

function renderMarkdown(payload) {
  const lines = [];
  lines.push("# Análisis de Matches Postventa");
  lines.push("");
  lines.push(`Generado: ${new Date(payload.generatedAt).toISOString()}`);
  lines.push("");
  lines.push("## Parámetros");
  lines.push("");
  lines.push(`- Colección Mongo: \`${payload.mongo.db}.${payload.mongo.collection}\``);
  lines.push(`- Venturino activo: ${payload.mongo.latestDates.venturino || "-"}`);
  lines.push(`- ML activo: ${payload.mongo.latestDates.ml || "-"}`);
  lines.push(`- Muestra Venturino: ${payload.params.sampleSize}`);
  lines.push(`- Top candidatos por producto: ${payload.params.topN}`);
  lines.push(`- Banda de precio: ±${Math.round(payload.params.priceBand * 100)}%`);
  lines.push(`- Score mínimo: ${MIN_SCORE}`);
  lines.push("");
  lines.push("## Criterios Del Algoritmo");
  lines.push("");
  lines.push("- Se usan sólo productos activos de la última extracción de cada origen.");
  lines.push("- Venturino se deduplica por `producto_id`; ML se deduplica por `ml_item_id`.");
  lines.push("- Los candidatos ML fuera de la banda de precio configurada se excluyen antes del scoring.");
  lines.push("- El scoring combina tipo de producto, tokens técnicos, tokens comunes, compatibilidad de marca y penalizaciones por tipos incompatibles.");
  lines.push("- La mediana ML se calcula con los candidatos aceptados dentro del top configurado.");
  lines.push("- Los estados del análisis priorizan confianza: sin candidatos, baja confianza, y luego comparación contra mediana ML.");
  lines.push("");
  lines.push("## Perfil De Datos");
  lines.push("");
  lines.push(`- Productos Venturino activos: ${payload.counts.venturinoActive} únicos (${payload.counts.venturinoActiveRaw} registros crudos)`);
  lines.push(`- Productos ML activos: ${payload.counts.mlActive} únicos (${payload.counts.mlActiveRaw} registros crudos)`);
  lines.push(`- Venturino con precio: ${payload.counts.venturinoWithPrice}`);
  lines.push(`- ML con precio: ${payload.counts.mlWithPrice}`);
  lines.push("");
  lines.push("## Resumen De La Muestra");
  lines.push("");
  Object.entries(payload.summary.statusCounts).forEach(([status, count]) => {
    lines.push(`- ${status}: ${count}`);
  });
  lines.push("");
  lines.push("Confianza de candidatos usados:");
  Object.entries(payload.summary.confidenceCounts).forEach(([confidence, count]) => {
    lines.push(`- ${confidence}: ${count}`);
  });
  lines.push("");
  lines.push("## Muestra Y Candidatos");
  lines.push("");

  payload.results.forEach((entry, index) => {
    const product = entry.venturino;
    const match = entry.match;
    lines.push(`### ${index + 1}. ${product.name}`);
    lines.push("");
    lines.push(`- ID Venturino: \`${product.id}\``);
    lines.push(`- Precio Venturino: ${formatArs(product.price)}`);
    lines.push(`- Tokens: ${product.features.primaryTokens.join(", ") || "-"}`);
    lines.push(`- Estado análisis: **${match.status}**`);
    lines.push(`- Mejor confianza: ${match.bestConfidence}`);
    lines.push(`- Candidatos media/alta: ${match.strongCandidateCount}`);
    lines.push(`- Candidatos usados: ${match.candidates.length} de ${match.totalValidBeforeTop} válidos antes de top`);
    lines.push(`- Candidatos excluidos por precio: ${match.excludedByPrice}`);
    lines.push(`- Candidatos excluidos por score: ${match.excludedByScore}`);
    lines.push(`- Mediana ML: ${formatArs(match.median)}`);
    lines.push(`- Venturino vs mediana ML: ${ratioPercent(match.ventVsMedianPct)}`);
    lines.push("");

    if (match.candidates.length === 0) {
      lines.push("_Sin candidatos válidos con los parámetros actuales._");
      lines.push("");
      return;
    }

    lines.push("| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |");
    lines.push("|---:|---|---:|---|---:|---:|---|");
    match.candidates.forEach((candidate, candidateIndex) => {
      const name = candidate.url
        ? `[${escapeCell(candidate.name)}](${candidate.url})`
        : escapeCell(candidate.name);
      lines.push(
        `| ${candidateIndex + 1} | ${candidate.confidence} | ${candidate.score} | ${name} | ${formatArs(
          candidate.price,
        )} | ${ratioPercent(candidate.diffPct)} | ${escapeCell(candidate.reasons.join("; "))} |`,
      );
    });
    lines.push("");
  });

  lines.push("## Observaciones Para Iteración");
  lines.push("");
  lines.push("- Revisar candidatos de baja confianza para detectar falsos positivos y nuevos sinónimos.");
  lines.push("- Si aparecen matches por `John Deere` sin tipo de producto coincidente, bajar peso de marca o subir score mínimo.");
  lines.push("- Si productos válidos quedan afuera por precio, ajustar banda sólo en UI; para reporte se mantiene ±40%.");
  lines.push("- Si muchos nombres técnicos quedan sin comparable, ampliar diccionario de tipos y tokens equivalentes.");
  lines.push("");
  return lines.join("\n");
}

function escapeCell(value) {
  return (value || "-").toString().replace(/\|/g, "\\|").replace(/\n/g, " ");
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI no definida en .env");
    process.exit(1);
  }

  const params = parseArgs(process.argv.slice(2));
  console.log("=== Análisis postventa: Venturino vs ML ===");
  console.log(`Muestra: ${params.sampleSize} | top: ${params.topN} | banda precio: ±${Math.round(params.priceBand * 100)}%`);

  const mongo = new MongoClient(MONGODB_URI);
  await mongo.connect();
  const collection = mongo.db(DB_NAME).collection(COLLECTION_NAME);

  const docs = await collection.find({ origen: { $in: ["Venturino", "venturino", "ml"] } }).toArray();
  await mongo.close();

  const products = docs.map(toProduct).filter((item) => item.id && item.name);
  const latestDates = {};
  for (const origin of ["venturino", "ml"]) {
    const dates = products
      .filter((item) => item.origin === origin && item.scrapedDate)
      .map((item) => item.scrapedDate)
      .sort();
    latestDates[origin] = dates.length ? dates[dates.length - 1] : null;
  }

  const venturinoActiveRaw = products.filter(
    (item) => item.origin === "venturino" && item.scrapedDate === latestDates.venturino,
  );
  const mlActiveRaw = products.filter((item) => item.origin === "ml" && item.scrapedDate === latestDates.ml);
  const venturinoActive = uniqueBy(venturinoActiveRaw, (item) => item.id);
  const mlActive = uniqueBy(mlActiveRaw, (item) => item.id);

  const sample = selectSample(venturinoActive, params.sampleSize);
  const results = sample.map((product) => ({
    venturino: product,
    match: buildCandidates(product, mlActive, params.topN, params.priceBand),
  }));

  const payload = {
    generatedAt: new Date().toISOString(),
    params,
    mongo: {
      db: DB_NAME,
      collection: COLLECTION_NAME,
      latestDates,
    },
    counts: {
      totalDocs: docs.length,
      venturinoActiveRaw: venturinoActiveRaw.length,
      mlActiveRaw: mlActiveRaw.length,
      venturinoActive: venturinoActive.length,
      mlActive: mlActive.length,
      venturinoWithPrice: venturinoActive.filter((item) => item.price).length,
      mlWithPrice: mlActive.filter((item) => item.price).length,
    },
    summary: summarize(results),
    results,
  };

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, renderMarkdown(payload), "utf8");
  fs.writeFileSync(JSON_PATH, JSON.stringify(payload, null, 2), "utf8");

  console.log(`Reporte: ${REPORT_PATH}`);
  console.log(`JSON: ${JSON_PATH}`);
  console.log("Resumen:", JSON.stringify(payload.summary.statusCounts));
}

main().catch((error) => {
  console.error("Error en análisis postventa:", error);
  process.exit(1);
});
