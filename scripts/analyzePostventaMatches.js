const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { loadEnvFile, resolveMongoUri } = require("./pipeline-shared");
const { requireTypeScript } = require("./register-ts");

loadEnvFile();

const {
  DEFAULT_POSTVENTA_MIN_SCORE,
  DEFAULT_POSTVENTA_PRICE_BAND,
  DEFAULT_POSTVENTA_SIMILARITY_THRESHOLD,
  DEFAULT_POSTVENTA_TOP_N,
  POSTVENTA_ALGORITHM_VERSION,
  buildPostventaMatch,
  normalizePostventaAnalysisOptions,
  withPostventaFeatures,
} = requireTypeScript("lib/postventa/matching.ts");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "algorym";
const COLLECTION_NAME = process.env.POSTVENTA_MONGO_COLLECTION || "productos";

const DEFAULT_SAMPLE_SIZE = 15;
const REPORT_PATH = path.join(__dirname, "..", "reports", "postventa-match-analysis.md");
const JSON_PATH = path.join(__dirname, "..", "data", "postventa_match_analysis.json");

function parseArgs(argv) {
  const raw = {
    sampleSize: DEFAULT_SAMPLE_SIZE,
    topN: DEFAULT_POSTVENTA_TOP_N,
    priceBand: DEFAULT_POSTVENTA_PRICE_BAND,
    minScore: DEFAULT_POSTVENTA_MIN_SCORE,
    similarityThreshold: DEFAULT_POSTVENTA_SIMILARITY_THRESHOLD,
  };

  argv.forEach((arg, index) => {
    const next = argv[index + 1];
    if (arg === "--sample" && next) raw.sampleSize = Number(next);
    if (arg === "--top" && next) raw.topN = Number(next);
    if (arg === "--price-band" && next) raw.priceBand = Number(next);
    if (arg === "--min-score" && next) raw.minScore = Number(next);
    if (arg === "--similarity-threshold" && next) raw.similarityThreshold = Number(next);
  });

  const options = normalizePostventaAnalysisOptions(raw);
  return {
    sampleSize: Number.isFinite(raw.sampleSize)
      ? Math.max(1, Math.min(Math.round(raw.sampleSize), 1000))
      : DEFAULT_SAMPLE_SIZE,
    ...options,
  };
}

function parsePrice(value, textValue) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return Math.round(value * 100) / 100;
  const raw = value !== undefined && value !== null ? value : textValue;
  if (!raw) return null;

  let cleaned = raw.toString().trim().replace(/[^0-9.,]/g, "");
  if (!cleaned) return null;

  const hasDot = cleaned.includes(".");
  const hasComma = cleaned.includes(",");

  if (hasDot && hasComma) {
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  } else if (hasComma) {
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  } else if (hasDot) {
    const parts = cleaned.split(".");
    if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3)) {
      cleaned = parts.join("");
    }
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 100) / 100 : null;
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
  const origin = normalizeSource(doc.origen);
  if (origin === "venturino") return doc.producto_id ? String(doc.producto_id).trim() : null;
  if (origin === "ml") {
    return doc.ml_item_id ? String(doc.ml_item_id).trim() : extractMlExternalIdFromUrl(doc.url);
  }
  return null;
}

function normalizeSource(value) {
  const source = value ? String(value).trim().toLowerCase() : "";
  if (source === "venturino") return "venturino";
  if (source === "ml") return "ml";
  return null;
}

function extractMlExternalIdFromUrl(value) {
  if (!value) return null;
  const url = String(value);
  const widMatch = url.match(/[?&#]wid=(MLA\d+)/i);
  if (widMatch) return widMatch[1].toUpperCase();

  const itemPathMatch = url.match(/\/(MLA-\d+)-/i);
  if (itemPathMatch) return itemPathMatch[1].replace("-", "").toUpperCase();

  const catalogMatch = url.match(/\/p\/(MLA\d+)/i);
  if (catalogMatch) return `CATALOG-${catalogMatch[1].toUpperCase()}`;

  return null;
}

function toProduct(doc) {
  const source = normalizeSource(doc.origen);
  if (!source) return null;

  const externalId = getStableId(doc);
  const name = doc.nombre ? String(doc.nombre).trim() : "";
  const scrapedDateValue = getRecordDate(doc);
  const scrapedDate = scrapedDateValue ? dateKey(scrapedDateValue) : null;
  if (!externalId || !name || !scrapedDate) return null;

  const priceArs = parsePrice(doc.precio, doc.precio_texto);
  const product = withPostventaFeatures({
    id: externalId,
    source,
    externalId,
    name,
    priceArs,
    url: doc.url ? String(doc.url).trim() : null,
  });

  return {
    ...product,
    origin: source,
    price: priceArs,
    priceText: doc.precio_texto ? String(doc.precio_texto) : null,
    moneda: doc.moneda ? String(doc.moneda) : null,
    categoriaMl: doc.categoria_ml ? String(doc.categoria_ml) : null,
    scrapedDate,
  };
}

function toLegacyMatch(match, mlById) {
  return {
    candidates: match.candidates.map((candidate) => {
      const source = mlById.get(String(candidate.mlProductId));
      return {
        id: String(candidate.mlProductId),
        mlExternalId: candidate.mlExternalId,
        name: candidate.name,
        price: candidate.priceArs,
        url: candidate.url,
        categoriaMl: source?.categoriaMl || null,
        diffPct: candidate.diffPct,
        score: candidate.score,
        confidence: candidate.confidence,
        reasons: candidate.reasons,
      };
    }),
    median: match.medianMlPriceArs,
    ventVsMedianPct: match.ventVsMedianPct,
    status: match.status,
    bestConfidence: match.bestConfidence,
    strongCandidateCount: match.strongCandidateCount,
    excludedByPrice: match.excludedByPrice,
    excludedByScore: match.excludedByScore,
    totalValidBeforeTop: match.totalValidBeforeTop,
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
  ).sort((a, b) => a.name.localeCompare(b.name, "es"));

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

function ratioPercent(value) {
  if (value === null || value === undefined) return "-";
  return `${(value * 100).toFixed(1)}%`;
}

function formatArs(value) {
  if (value === null || value === undefined) return "-";
  return `$${Math.round(value).toLocaleString("es-AR")}`;
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
  lines.push(`- Algoritmo: \`${payload.algorithm.version}\``);
  lines.push(`- Runtime: ${payload.algorithm.runtime}`);
  lines.push(`- Venturino activo: ${payload.mongo.latestDates.venturino || "-"}`);
  lines.push(`- ML activo: ${payload.mongo.latestDates.ml || "-"}`);
  lines.push(`- Muestra Venturino: ${payload.params.sampleSize}`);
  lines.push(`- Top candidatos por producto: ${payload.params.topN}`);
  lines.push(`- Banda de precio: ±${Math.round(payload.params.priceBand * 100)}%`);
  lines.push(`- Umbral similar a ML: ±${Math.round(payload.params.similarityThreshold * 100)}%`);
  lines.push(`- Score mínimo: ${payload.params.minScore}`);
  lines.push("");
  lines.push("## Criterios Del Algoritmo");
  lines.push("");
  lines.push("- Se usan sólo productos activos de la última extracción de cada origen.");
  lines.push("- Venturino se deduplica por `producto_id`; ML se deduplica por `ml_item_id` o fallback estable desde URL.");
  lines.push("- Los candidatos ML fuera de la banda de precio configurada se excluyen antes del scoring.");
  lines.push("- El scoring se ejecuta desde `lib/postventa/matching.ts`, el mismo módulo que usa el análisis persistido.");
  lines.push("- La mediana ML se calcula con los candidatos aceptados dentro del top configurado.");
  lines.push("- Los estados del análisis priorizan confianza: sin candidatos, baja confianza, similar a ML, y luego comparación contra mediana ML.");
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
  console.log(
    `Muestra: ${params.sampleSize} | top: ${params.topN} | banda precio: ±${Math.round(params.priceBand * 100)}%`,
  );
  console.log(`Algoritmo: ${POSTVENTA_ALGORITHM_VERSION} desde lib/postventa/matching.ts`);

  const mongo = new MongoClient(await resolveMongoUri(MONGODB_URI));
  await mongo.connect();
  const collection = mongo.db(DB_NAME).collection(COLLECTION_NAME);

  const docs = await collection.find({ origen: { $in: ["Venturino", "venturino", "ml"] } }).toArray();
  await mongo.close();

  const products = docs.map(toProduct).filter(Boolean);
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
  const mlById = new Map(mlActive.map((item) => [String(item.id), item]));

  const sample = selectSample(venturinoActive, params.sampleSize);
  const results = sample.map((product) => ({
    venturino: product,
    match: toLegacyMatch(buildPostventaMatch(product, mlActive, params), mlById),
  }));

  const payload = {
    generatedAt: new Date().toISOString(),
    algorithm: {
      version: POSTVENTA_ALGORITHM_VERSION,
      runtime: "lib/postventa/matching.ts",
    },
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
