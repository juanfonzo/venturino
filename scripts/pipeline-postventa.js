/**
 * Pipeline postventa: MongoDB Atlas -> PostgreSQL.
 *
 * Usage:
 *   node scripts/pipeline-postventa.js [--dry-run] [--no-sample] [--skip-analysis]
 *
 * Imports active products from MongoDB algorym.productos. Venturino products are
 * identified by producto_id and ML products by ml_item_id. Only the latest
 * extraction date for each source is marked active.
 */

const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { PrismaClient } = require("@prisma/client");
const { loadEnvFile } = require("./pipeline-shared");

loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "algorym";
const COLLECTION_NAME = process.env.POSTVENTA_MONGO_COLLECTION || "productos";

const DRY_RUN = process.argv.includes("--dry-run");
const NO_SAMPLE = process.argv.includes("--no-sample");
const SKIP_ANALYSIS = process.argv.includes("--skip-analysis");
const ANALYSIS_URL = process.env.POSTVENTA_ANALYSIS_URL || "http://127.0.0.1:3000/api/postventa/analyze";
const BATCH_SIZE = 500;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

async function main() {
  console.log("=== Pipeline Postventa: MongoDB -> PostgreSQL ===");
  console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
  console.log(`Mongo collection: ${DB_NAME}.${COLLECTION_NAME}`);
  console.log();

  const docs = await fetchMongoProducts();
  const normalized = docs.map(toPostventaProduct).filter(Boolean);
  const latestDates = getLatestDatesBySource(normalized);
  const activeRaw = normalized.filter((product) => product.scrapingDateKey === latestDates[product.source]);
  const activeProducts = dedupeProducts(activeRaw);
  const counts = buildCounts({ docs, normalized, activeRaw, activeProducts, latestDates });

  printProfile(counts);

  if (DRY_RUN) {
    console.log();
    console.log("=== DRY RUN - no data written to PostgreSQL ===");
    if (!NO_SAMPLE) {
      const samplePath = path.join(__dirname, "..", "data", "postventa_pipeline_sample.json");
      fs.writeFileSync(
        samplePath,
        JSON.stringify(
          {
            latestDates,
            counts,
            sample: activeProducts.slice(0, 20),
          },
          null,
          2,
        ),
        "utf8",
      );
      console.log(`Sample written to ${samplePath}`);
    }
    return;
  }

  const result = await upsertIntoPostgres({ activeProducts, counts, latestDates });
  if (SKIP_ANALYSIS) {
    console.log();
    console.log("=== Analysis skipped by --skip-analysis ===");
    return;
  }

  await triggerPostventaAnalysis({ importRunId: result.importRunId });
}

async function fetchMongoProducts() {
  console.log("Connecting to MongoDB Atlas...");
  const mongo = new MongoClient(MONGODB_URI);
  await mongo.connect();

  try {
    const col = mongo.db(DB_NAME).collection(COLLECTION_NAME);
    const docs = await col
      .find(
        { origen: { $in: ["Venturino", "venturino", "ml"] } },
        {
          projection: {
            producto_id: 1,
            ml_item_id: 1,
            nombre: 1,
            precio: 1,
            precio_texto: 1,
            moneda: 1,
            url: 1,
            origen: 1,
            fecha_scraping: 1,
            scraping_date: 1,
            scraped_at: 1,
            created_at: 1,
            categoria_ml: 1,
          },
        },
      )
      .toArray();
    console.log(`  Fetched: ${docs.length} documents`);
    return docs;
  } finally {
    await mongo.close();
    console.log("  MongoDB connection closed.");
  }
}

function toPostventaProduct(doc) {
  const source = normalizeSource(doc.origen);
  if (!source) return null;

  const externalId = getExternalId(source, doc);
  const name = doc.nombre ? String(doc.nombre).trim() : "";
  if (!externalId || !name) return null;

  const scrapingDate = getRecordDate(doc);
  const scrapingDateKey = dateKey(scrapingDate);
  if (!scrapingDateKey) return null;

  const scrapedAt = parseDate(doc.scraped_at) || parseDate(doc.created_at);

  return {
    source,
    externalId,
    name,
    priceArs: parsePrice(doc.precio, doc.precio_texto),
    priceText: doc.precio_texto ? String(doc.precio_texto) : null,
    currency: doc.moneda ? String(doc.moneda).trim().toUpperCase() : null,
    url: doc.url ? String(doc.url).trim() : null,
    categoryMl: doc.categoria_ml ? String(doc.categoria_ml).trim() : null,
    scrapingDate: toDateOnlyUTC(scrapingDate),
    scrapingDateKey,
    scrapedAt,
  };
}

function normalizeSource(value) {
  const source = value ? String(value).trim().toLowerCase() : "";
  if (source === "venturino") return "venturino";
  if (source === "ml") return "ml";
  return null;
}

function getExternalId(source, doc) {
  const value = source === "venturino" ? doc.producto_id : doc.ml_item_id || extractMlExternalIdFromUrl(doc.url);
  return value === null || value === undefined ? null : String(value).trim();
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

function getRecordDate(doc) {
  return parseDate(doc.fecha_scraping) || parseDate(doc.scraping_date) || parseDate(doc.scraped_at);
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

function toDateOnlyUTC(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function dateKey(date) {
  if (!date) return null;
  return toDateOnlyUTC(date).toISOString().slice(0, 10);
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

function getLatestDatesBySource(products) {
  const latest = {};
  for (const product of products) {
    const current = latest[product.source];
    if (!current || product.scrapingDateKey > current) {
      latest[product.source] = product.scrapingDateKey;
    }
  }
  return latest;
}

function dedupeProducts(products) {
  const byStableId = new Map();
  for (const product of products) {
    const key = `${product.source}:${product.externalId}`;
    const current = byStableId.get(key);
    if (!current || shouldReplaceProduct(current, product)) {
      byStableId.set(key, product);
    }
  }
  return Array.from(byStableId.values()).sort((a, b) =>
    `${a.source}:${a.name}`.localeCompare(`${b.source}:${b.name}`, "es"),
  );
}

function shouldReplaceProduct(current, next) {
  const currentTime = current.scrapedAt ? current.scrapedAt.getTime() : 0;
  const nextTime = next.scrapedAt ? next.scrapedAt.getTime() : 0;
  if (nextTime !== currentTime) return nextTime > currentTime;
  if (current.priceArs === null && next.priceArs !== null) return true;
  if (!current.url && next.url) return true;
  return false;
}

function buildCounts({ docs, normalized, activeRaw, activeProducts, latestDates }) {
  return {
    sourceCount: docs.length,
    normalizedCount: normalized.length,
    discardedCount: docs.length - normalized.length,
    latestDates,
    activeRaw: countBy(activeRaw, (product) => product.source),
    activeUnique: countBy(activeProducts, (product) => product.source),
    fallbackExternalIds: activeProducts.filter((product) => product.externalId.startsWith("CATALOG-")).length,
    withPrice: countBy(
      activeProducts.filter((product) => product.priceArs !== null),
      (product) => product.source,
    ),
  };
}

function printProfile(counts) {
  console.log();
  console.log("=== Source profile ===");
  console.log(`  Raw documents:       ${counts.sourceCount}`);
  console.log(`  Normalized products: ${counts.normalizedCount}`);
  console.log(`  Discarded:           ${counts.discardedCount}`);
  console.log(`  Latest Venturino:    ${counts.latestDates.venturino || "-"}`);
  console.log(`  Latest ML:           ${counts.latestDates.ml || "-"}`);
  console.log("  Active raw:          " + JSON.stringify(counts.activeRaw));
  console.log("  Active unique:       " + JSON.stringify(counts.activeUnique));
  console.log("  Active with price:   " + JSON.stringify(counts.withPrice));
  console.log(`  Fallback ML ids:     ${counts.fallbackExternalIds}`);
}

async function upsertIntoPostgres({ activeProducts, counts, latestDates }) {
  console.log();
  console.log("=== Upserting into PostgreSQL ===");

  const prisma = new PrismaClient();
  try {
    const now = new Date();
    const run = await prisma.postventaImportRun.create({
      data: {
        mongoDb: DB_NAME,
        mongoCollection: COLLECTION_NAME,
        venturinoDate: latestDates.venturino ? parseDate(latestDates.venturino) : null,
        mlDate: latestDates.ml ? parseDate(latestDates.ml) : null,
        sourceCount: counts.sourceCount,
        venturinoCount: counts.activeUnique.venturino || 0,
        mlCount: counts.activeUnique.ml || 0,
        status: "success",
      },
    });

    const existingProducts = await prisma.postventaProduct.findMany({
      select: { id: true, source: true, externalId: true, active: true },
    });
    const existingByStableId = new Map(
      existingProducts.map((product) => [`${product.source}:${product.externalId}`, product]),
    );

    const seenIds = new Set();
    let newCount = 0;
    let updatedCount = 0;
    let snapshotsCreated = 0;
    let snapshotsUpdated = 0;

    for (let i = 0; i < activeProducts.length; i += BATCH_SIZE) {
      const batch = activeProducts.slice(i, i + BATCH_SIZE);

      for (const product of batch) {
        const stableKey = `${product.source}:${product.externalId}`;
        seenIds.add(stableKey);

        const data = {
          source: product.source,
          externalId: product.externalId,
          name: product.name,
          priceArs: product.priceArs,
          priceText: product.priceText,
          currency: product.currency,
          url: product.url,
          categoryMl: product.categoryMl,
          scrapingDate: product.scrapingDate,
          scrapedAt: product.scrapedAt,
          active: true,
          lastSeenAt: now,
          lastImportRunId: run.id,
        };

        let dbProduct = existingByStableId.get(stableKey);
        if (dbProduct) {
          dbProduct = await prisma.postventaProduct.update({
            where: { id: dbProduct.id },
            data,
            select: { id: true, source: true, externalId: true, active: true },
          });
          updatedCount += 1;
        } else {
          dbProduct = await prisma.postventaProduct.create({
            data: {
              ...data,
              firstSeenAt: now,
            },
            select: { id: true, source: true, externalId: true, active: true },
          });
          existingByStableId.set(stableKey, dbProduct);
          newCount += 1;
        }

        const snapshotResult = await savePriceSnapshot(prisma, {
          productId: dbProduct.id,
          importRunId: run.id,
          product,
        });
        if (snapshotResult === "created") snapshotsCreated += 1;
        else snapshotsUpdated += 1;
      }

      process.stdout.write(`\r  Processed active products: ${Math.min(i + BATCH_SIZE, activeProducts.length)}/${activeProducts.length}`);
    }
    console.log();

    const deactivatedCount = await deactivateMissingProducts(prisma, {
      existingProducts,
      seenIds,
      now,
    });

    await prisma.postventaImportRun.update({
      where: { id: run.id },
      data: {
        newCount,
        updatedCount,
        deactivatedCount,
        snapshotsCreated,
        snapshotsUpdated,
      },
    });

    const [activeVenturino, activeMl, totalProducts, totalSnapshots] = await Promise.all([
      prisma.postventaProduct.count({ where: { source: "venturino", active: true } }),
      prisma.postventaProduct.count({ where: { source: "ml", active: true } }),
      prisma.postventaProduct.count(),
      prisma.postventaPriceSnapshot.count(),
    ]);

    console.log();
    console.log("=== RESULTS ===");
    console.log(`  Import run:              #${run.id}`);
    console.log(`  New products:            ${newCount}`);
    console.log(`  Updated products:        ${updatedCount}`);
    console.log(`  Deactivated products:    ${deactivatedCount}`);
    console.log(`  Price snapshots created: ${snapshotsCreated}`);
    console.log(`  Price snapshots updated: ${snapshotsUpdated}`);
    console.log(`  DB verification: ${activeVenturino} active Venturino, ${activeMl} active ML, ${totalProducts} total products, ${totalSnapshots} snapshots`);

    return { importRunId: run.id };
  } finally {
    await prisma.$disconnect();
  }
}

async function triggerPostventaAnalysis({ importRunId }) {
  const body = {
    similarityThreshold: parseEnvNumber("POSTVENTA_SIMILARITY_THRESHOLD"),
  };
  Object.keys(body).forEach((key) => {
    if (body[key] === undefined) delete body[key];
  });

  console.log();
  console.log("=== Running postventa analysis ===");
  console.log(`  Import run: #${importRunId}`);
  console.log(`  Endpoint:   ${ANALYSIS_URL}`);
  console.log(`  Options:    ${JSON.stringify(body)}`);

  const response = await fetch(ANALYSIS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error || `HTTP ${response.status}`;
    throw new Error(`Postventa analysis failed after import #${importRunId}: ${message}`);
  }

  console.log();
  console.log("=== ANALYSIS RESULTS ===");
  console.log(`  Analysis run:      #${payload.analysisRunId}`);
  console.log(`  Algorithm version: ${payload.algorithmVersion}`);
  console.log(`  Similar threshold: ${payload.options.similarityThreshold}`);
  console.log(`  Total candidates:  ${payload.summary.totalCandidates}`);
  console.log(`  Status counts:     ${JSON.stringify(payload.summary.statusCounts)}`);
}

function parseEnvNumber(name) {
  const value = process.env[name];
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

async function savePriceSnapshot(prisma, { productId, importRunId, product }) {
  const existing = await prisma.postventaPriceSnapshot.findFirst({
    where: {
      productId,
      snapshotDate: product.scrapingDate,
    },
    select: { id: true },
  });

  const data = {
    importRunId,
    name: product.name,
    priceArs: product.priceArs,
    priceText: product.priceText,
    url: product.url,
    activeInRun: true,
  };

  if (existing) {
    await prisma.postventaPriceSnapshot.update({
      where: { id: existing.id },
      data,
    });
    return "updated";
  }

  await prisma.postventaPriceSnapshot.create({
    data: {
      productId,
      snapshotDate: product.scrapingDate,
      ...data,
    },
  });
  return "created";
}

async function deactivateMissingProducts(prisma, { existingProducts, seenIds, now }) {
  const missingIds = existingProducts
    .filter((product) => ["venturino", "ml"].includes(product.source))
    .filter((product) => !seenIds.has(`${product.source}:${product.externalId}`))
    .filter((product) => product.active)
    .map((product) => product.id);

  let deactivatedCount = 0;
  for (let i = 0; i < missingIds.length; i += BATCH_SIZE) {
    const ids = missingIds.slice(i, i + BATCH_SIZE);
    const result = await prisma.postventaProduct.updateMany({
      where: { id: { in: ids } },
      data: {
        active: false,
        lastSeenAt: now,
      },
    });
    deactivatedCount += result.count;
  }
  return deactivatedCount;
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

main().catch((error) => {
  console.error("Pipeline postventa error:", error);
  process.exit(1);
});
