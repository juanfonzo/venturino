/**
 * Pipeline LIVE: MongoDB Atlas → clean & normalize → PostgreSQL (upsert + price history)
 *
 * Usage:
 *   node scripts/pipeline-live.js [--dry-run] [--since YYYY-MM-DD]
 *
 * Connects directly to MongoDB, fetches documents from the latest scraping run
 * (or since a specific date), normalizes, and upserts into PostgreSQL.
 *
 * Key differences from pipeline.js (initial load):
 *   - Connects to MongoDB directly (no intermediate JSON file)
 *   - Filters by fecha_scraping (latest run only)
 *   - Upserts by URL (unique listing identifier)
 *   - Snapshots price changes in PriceHistory table
 *   - Marks listings not seen in this run as inactive
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

// ─── Config ──────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set in .env'); process.exit(1); }

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 500;

// Parse --since flag
let SINCE_DATE = null;
const sinceIdx = process.argv.indexOf('--since');
if (sinceIdx >= 0 && process.argv[sinceIdx + 1]) {
  SINCE_DATE = new Date(process.argv[sinceIdx + 1]);
  if (isNaN(SINCE_DATE.getTime())) {
    console.error('Invalid --since date:', process.argv[sinceIdx + 1]);
    process.exit(1);
  }
}

// ─── Import normalization functions from pipeline.js ─────
// We require the same normalization logic. To avoid duplication,
// we extract the shared functions. For now, we inline the require
// and re-export approach.

// Load the original pipeline module's functions by evaluating the shared code
const fs = require('fs');
const path = require('path');
const pipelinePath = path.join(__dirname, 'pipeline.js');
const pipelineSource = fs.readFileSync(pipelinePath, 'utf8');

// We'll extract the normalization functions by running the pipeline source
// in a sandboxed context. But since pipeline.js is a script (not a module),
// we'll instead just require the key functions we need by copy-referencing.
// The cleanest approach: refactor shared code into a module.
// For now, we'll use a pragmatic approach: load pipeline.js and extract functions.

// ─── Shared normalization (loaded from pipeline.js) ──────
// We use a trick: wrap pipeline.js functions in a module-like context
const vm = require('vm');
const sandbox = {
  require: require,
  module: { exports: {} },
  exports: {},
  console: console,
  process: process,
  __dirname: __dirname,
  Number: Number,
  Math: Math,
  Date: Date,
  Set: Set,
  Map: Map,
  Array: Array,
  String: String,
  RegExp: RegExp,
  JSON: JSON,
  isNaN: isNaN,
  parseInt: parseInt,
  parseFloat: parseFloat,
};

// Extract just the function definitions (everything before "async function main()")
const mainIdx = pipelineSource.indexOf('async function main()');
if (mainIdx < 0) {
  console.error('Could not find main() in pipeline.js');
  process.exit(1);
}
const sharedCode = pipelineSource.substring(0, mainIdx);

// Add exports for the functions we need
const moduleCode = sharedCode + `
module.exports = {
  normalizeCategoria,
  normalizeText,
  normalizeMatchText,
  normalizeBrandAndModel,
  normalizeModel,
  inferModelFromTitle,
  parseYear,
  parseHp,
  parseHoras,
  normalizePrice,
  extractPriceFromTitle,
  deriveLocation,
  normalizeCondicion,
  detectCompetitor,
  unifyVendedor,
  extractYearFromAgroadsDesc,
  parseFechaScraping,
  buildFlags,
  CURRENT_YEAR: new Date().getFullYear(),
};
`;

try {
  vm.runInNewContext(moduleCode, sandbox);
} catch (e) {
  console.error('Error loading shared functions from pipeline.js:', e.message);
  process.exit(1);
}

const P = sandbox.module.exports;

// ─── Main pipeline ───────────────────────────────────────
async function main() {
  console.log('=== Pipeline LIVE: MongoDB → PostgreSQL (upsert) ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log();

  // 1. Connect to MongoDB
  console.log('Connecting to MongoDB Atlas...');
  const mongo = new MongoClient(MONGODB_URI);
  await mongo.connect();
  const db = mongo.db('algorym');
  const col = db.collection('venturino');
  console.log('  Connected!');

  // 2. Determine date filter — find the latest fecha_scraping PER ORIGIN
  //    Since crawlers run independently, each origin may have a different latest date.
  //    We want all docs from the latest scraping batch for each origin.
  let query = {};
  if (SINCE_DATE) {
    // Use explicit --since date: fetch everything >= that date
    const sinceStr = formatDateDDMMYYYY(SINCE_DATE);
    // fecha_scraping is stored as DD-MM-YYYY string; we need to find all docs
    // with fecha_scraping >= sinceStr. Since string comparison won't work for DD-MM-YYYY,
    // we fetch all and filter in JS.
    console.log(`  Filtering: fecha_scraping >= ${SINCE_DATE.toISOString().split('T')[0]} (from --since flag)`);
  } else {
    // Auto-detect: find the latest fecha_scraping per origin
    console.log('  Auto-detecting latest scraping dates per origin...');
    const pipeline = [
      { $match: { fecha_scraping: { $exists: true, $ne: null } } },
      { $group: { _id: '$origen', latestDate: { $max: '$fecha_scraping' } } },
    ];
    const latestPerOrigin = await col.aggregate(pipeline).toArray();

    if (latestPerOrigin.length > 0) {
      // Build an $or query: for each origin, fetch docs with that origin's latest date
      const orConditions = latestPerOrigin.map(r => ({
        origen: r._id,
        fecha_scraping: r.latestDate,
      }));
      query = { $or: orConditions };
      console.log('  Latest dates per origin:');
      latestPerOrigin.forEach(r => console.log(`    ${r._id}: ${r.latestDate}`));
    } else {
      console.log('  WARNING: No fecha_scraping found. Fetching ALL documents.');
    }
  }

  // 3. Fetch documents
  console.log('Fetching documents from MongoDB...');
  let docs;
  if (SINCE_DATE) {
    // Fetch all and filter in JS (fecha_scraping is DD-MM-YYYY string)
    const allDocs = await col.find({}).toArray();
    docs = allDocs.filter(d => {
      if (!d.fecha_scraping) return false;
      const parsed = parseDateDDMMYYYY(d.fecha_scraping);
      return parsed && parsed >= SINCE_DATE;
    });
  } else {
    docs = await col.find(query).toArray();
  }
  console.log(`  Fetched: ${docs.length} documents`);

  // Show breakdown by origen
  const byOrigen = {};
  docs.forEach(d => { const o = d.origen || '(null)'; byOrigen[o] = (byOrigen[o] || 0) + 1; });
  console.log('  By origen:', JSON.stringify(byOrigen));

  await mongo.close();
  console.log('  MongoDB connection closed.');
  console.log();

  // 4. Filter to core categories
  console.log('Filtering to core categories...');
  const filtered = docs.filter(doc => P.normalizeCategoria(doc.categoria) !== null);
  console.log(`  After filter: ${filtered.length} (discarded ${docs.length - filtered.length})`);

  // 5. Process each document (same normalization as pipeline.js)
  console.log('Processing documents...');
  const processed = [];
  const stats = {
    byCategoria: {}, byOrigen: {},
    priceOk: 0, priceNull: 0,
    yearOk: 0, yearNull: 0,
    hpOk: 0, hpNull: 0,
    competitors: 0,
  };

  for (const doc of filtered) {
    const origen = doc.origen || 'unknown';
    const categoria = P.normalizeCategoria(doc.categoria);
    const titulo = doc.titulo || null;
    const descripcion = doc.descripcion || null;

    // Year
    let anioRaw = doc.anio;
    let yearExtraFlags = [];
    let anio;
    if (origen === 'agroads' && (anioRaw === null || anioRaw === undefined || anioRaw === '')) {
      anio = P.extractYearFromAgroadsDesc(descripcion) ?? null;
      if (anio !== null) yearExtraFlags.push('YEAR_EXTRACTED_FROM_TEXT');
    } else {
      anio = P.parseYear(anioRaw, titulo, descripcion);
    }

    // HP, Horas
    const hpRaw = doc.hp;
    const hp = P.parseHp(hpRaw, titulo, descripcion);
    const horasRaw = doc.horas;
    const horas = P.parseHoras(horasRaw, titulo, descripcion);

    // Price
    let precioRaw = doc.precio;
    let monedaRaw = doc.moneda;
    if (origen === 'ml') {
      const extracted = P.extractPriceFromTitle(titulo);
      if (extracted.precioRaw) precioRaw = extracted.precioRaw;
      if (extracted.monedaRaw) monedaRaw = extracted.monedaRaw;
    }
    const { precioUsd, monedaNorm, priceFlags } = P.normalizePrice(
      precioRaw != null ? precioRaw.toString() : null,
      monedaRaw != null ? monedaRaw.toString() : null,
      origen
    );

    // Location
    const { provincia, ciudad } = P.deriveLocation(doc.ubicacion, doc.localidad, doc.provincia);

    // Condition
    const { condicion, flags: condicionFlags } = P.normalizeCondicion(doc.condicion, origen, anio, horas);

    // Vendedor
    const vendedor = P.unifyVendedor(doc);
    const tipoVendedor = doc.usuario_tipo_empresa_nombre || null;

    // Competitor
    const { esCompetidor, competidorNombre } = P.detectCompetitor(vendedor, origen);

    // Brand & model
    const marca = doc.marca || null;
    const { marcaNorm, modeloForNorm } = P.normalizeBrandAndModel(marca, doc.modelo);
    let modelo = doc.modelo || null;
    let modeloNorm = P.normalizeModel(modeloForNorm);
    if (modeloNorm && /^\d[\d ]*$/.test(modeloNorm) && titulo) {
      const titleInferred = P.inferModelFromTitle(titulo, marca, marcaNorm);
      if (titleInferred && /[A-Z]/.test(titleInferred)) {
        modeloNorm = titleInferred;
        yearExtraFlags.push('MODEL_INFERRED_FROM_TITLE');
      }
    }
    if (!modeloNorm && titulo) {
      modeloNorm = P.inferModelFromTitle(titulo, marca, marcaNorm);
      if (modeloNorm) yearExtraFlags.push('MODEL_INFERRED_FROM_TITLE');
    }

    // Flags
    const allExtraFlags = [...yearExtraFlags, ...condicionFlags, ...(priceFlags || [])];
    const flags = P.buildFlags({ precioUsd, anio, hp, horas, provincia, condicion, extraFlags: allExtraFlags });

    // IVA & financiacion
    const iva = doc.iva || null;
    const financiacion = doc.financiacion || doc.paymentMethod || doc.formas_de_pago || null;

    // Fecha scraping
    const fechaScraping = P.parseFechaScraping(doc.fecha_scraping);
    const fechaPublicacion = doc.fecha_publicacion || null;

    const url = (doc.url || '').toString().trim();
    if (!url) continue; // skip docs without URL — can't match

    processed.push({
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
      anioRaw: anioRaw != null ? anioRaw.toString() : null,
      hp: hp !== null ? hp : null,
      hpRaw: hpRaw != null ? hpRaw.toString() : null,
      horas: horas !== null ? horas : null,
      horasRaw: horasRaw != null ? horasRaw.toString() : null,
      condicionRaw: doc.condicion || null,
      condicion,
      precioRaw: precioRaw != null ? precioRaw.toString() : null,
      monedaRaw: monedaRaw != null ? monedaRaw.toString() : null,
      monedaNorm,
      precioUsd: precioUsd !== null ? Math.round(precioUsd * 100) / 100 : null,
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
    });

    // Stats
    stats.byCategoria[categoria] = (stats.byCategoria[categoria] || 0) + 1;
    stats.byOrigen[origen] = (stats.byOrigen[origen] || 0) + 1;
    if (precioUsd !== null) stats.priceOk++; else stats.priceNull++;
    if (anio !== null) stats.yearOk++; else stats.yearNull++;
    if (hp !== null) stats.hpOk++; else stats.hpNull++;
    if (esCompetidor) stats.competitors++;
  }

  console.log(`  Processed: ${processed.length}`);
  console.log(`  By category:`, JSON.stringify(stats.byCategoria));
  console.log(`  By origen:`, JSON.stringify(stats.byOrigen));
  console.log(`  Price: ${stats.priceOk} ok, ${stats.priceNull} null`);
  console.log(`  Year: ${stats.yearOk} ok, ${stats.yearNull} null`);
  console.log(`  Competitors: ${stats.competitors}`);
  console.log();

  if (DRY_RUN) {
    console.log('=== DRY RUN — no data written to PostgreSQL ===');
    const samplePath = path.join(__dirname, '..', 'data', 'pipeline_live_sample.json');
    fs.writeFileSync(samplePath, JSON.stringify(processed.slice(0, 10), null, 2), 'utf8');
    console.log(`Sample written to ${samplePath}`);
    return;
  }

  // 6. Upsert into PostgreSQL
  console.log('=== Upserting into PostgreSQL ===');
  const prisma = new PrismaClient();

  try {
    const now = new Date();
    const runDate = new Date(now.toISOString().split('T')[0]); // date only

    // Create scraping run
    const run = await prisma.scrapingRun.create({
      data: {
        runDate,
        sourceFile: 'mongodb-live',
        sourceCount: docs.length,
        filteredCount: filtered.length,
        processedCount: processed.length,
      },
    });
    console.log(`  Created scraping run #${run.id}`);

    // Build lookup of existing listings by URL for price comparison
    console.log('  Loading existing listings for price comparison...');
    const existingListings = await prisma.listing.findMany({
      select: { id: true, url: true, precioUsd: true, monedaNorm: true, precioRaw: true },
    });
    const existingMap = new Map();
    for (const l of existingListings) {
      existingMap.set(l.url, l);
    }
    console.log(`  Found ${existingMap.size} existing listings`);

    // Track which URLs we see in this run
    const seenUrls = new Set();
    let newCount = 0;
    let updatedCount = 0;
    let priceChanges = 0;

    // Process in batches
    for (let i = 0; i < processed.length; i += BATCH_SIZE) {
      const batch = processed.slice(i, i + BATCH_SIZE);

      for (const record of batch) {
        seenUrls.add(record.url);
        const existing = existingMap.get(record.url);

        const upsertData = {
          ...record,
          scrapingRunId: run.id,
          active: true,
          lastSeenAt: now,
        };

        if (existing) {
          // UPDATE existing listing
          const { url, ...updateData } = upsertData;
          await prisma.listing.update({
            where: { url: record.url },
            data: updateData,
          });
          updatedCount++;

          // Always insert a new price snapshot for traceability
          await prisma.priceHistory.create({
            data: {
              listingId: existing.id,
              precioUsd: record.precioUsd,
              monedaNorm: record.monedaNorm,
              precioRaw: record.precioRaw,
              scrapingRunId: run.id,
              snapshotDate: runDate,
            },
          });
          priceChanges++;
        } else {
          // INSERT new listing
          const created = await prisma.listing.create({
            data: {
              ...upsertData,
              firstSeenAt: now,
            },
          });
          newCount++;

          // Create initial price snapshot
          await prisma.priceHistory.create({
            data: {
              listingId: created.id,
              precioUsd: record.precioUsd,
              monedaNorm: record.monedaNorm,
              precioRaw: record.precioRaw,
              scrapingRunId: run.id,
              snapshotDate: runDate,
            },
          });
        }
      }

      process.stdout.write(`\r  Processed: ${Math.min(i + BATCH_SIZE, processed.length)}/${processed.length}`);
    }
    console.log();

    // 7. Mark listings not seen in this run as inactive
    console.log('  Marking unseen listings as inactive...');
    const allUrls = [...existingMap.keys()];
    const unseenUrls = allUrls.filter(u => !seenUrls.has(u));

    let deactivatedCount = 0;
    if (unseenUrls.length > 0) {
      // Deactivate in batches
      for (let i = 0; i < unseenUrls.length; i += BATCH_SIZE) {
        const batch = unseenUrls.slice(i, i + BATCH_SIZE);
        const result = await prisma.listing.updateMany({
          where: { url: { in: batch }, active: true },
          data: { active: false },
        });
        deactivatedCount += result.count;
      }
    }

    // Update run stats
    await prisma.scrapingRun.update({
      where: { id: run.id },
      data: {
        upsertedCount: newCount + updatedCount,
        newCount,
        updatedCount,
        deactivatedCount,
      },
    });

    console.log();
    console.log('=== RESULTS ===');
    console.log(`  New listings:         ${newCount}`);
    console.log(`  Updated listings:     ${updatedCount}`);
    console.log(`  Price changes logged: ${priceChanges}`);
    console.log(`  Deactivated:          ${deactivatedCount}`);
    console.log(`  Total active:         ${newCount + updatedCount + (existingMap.size - deactivatedCount - updatedCount)}`);

    // Verify
    const totalActive = await prisma.listing.count({ where: { active: true } });
    const totalHistory = await prisma.priceHistory.count();
    console.log(`  DB verification: ${totalActive} active listings, ${totalHistory} price history records`);

  } finally {
    await prisma.$disconnect();
  }
}

// Helper: format date as DD-MM-YYYY (matching MongoDB fecha_scraping format)
function formatDateDDMMYYYY(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

// Helper: parse DD-MM-YYYY string to Date
function parseDateDDMMYYYY(str) {
  if (!str) return null;
  const match = str.toString().trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const d = new Date(`${yyyy}-${mm}-${dd}`);
  return isNaN(d.getTime()) ? null : d;
}

main().catch(e => {
  console.error('Pipeline error:', e);
  process.exit(1);
});
