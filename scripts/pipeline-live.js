/**
 * Pipeline LIVE: MongoDB Atlas -> clean & normalize -> PostgreSQL.
 *
 * Usage:
 *   node scripts/pipeline-live.js [--dry-run] [--since YYYY-MM-DD]
 *
 * The app reads PostgreSQL, not MongoDB. This script imports the latest
 * scraping batch from MongoDB and marks only that batch as active.
 */

const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');
const {
  addRecordToStats,
  createProcessingStats,
  loadEnvFile,
  normalizeMongoDoc,
  parseDateDDMMYYYY,
  toDateKey,
  toDateOnlyUTC,
} = require('./pipeline-shared');

loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

const DRY_RUN = process.argv.includes('--dry-run');
const NO_SAMPLE = process.argv.includes('--no-sample');
const BATCH_SIZE = 500;

let SINCE_DATE = null;
const sinceIdx = process.argv.indexOf('--since');
if (sinceIdx >= 0 && process.argv[sinceIdx + 1]) {
  SINCE_DATE = parseSinceDate(process.argv[sinceIdx + 1]);
  if (!SINCE_DATE) {
    console.error('Invalid --since date:', process.argv[sinceIdx + 1]);
    process.exit(1);
  }
}

async function main() {
  console.log('=== Pipeline LIVE: MongoDB -> PostgreSQL (upsert) ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log();

  console.log('Connecting to MongoDB Atlas...');
  const mongo = new MongoClient(MONGODB_URI);
  await mongo.connect();
  const col = mongo.db('algorym').collection('venturino');
  console.log('  Connected!');

  let docs;
  if (SINCE_DATE) {
    console.log(`  Filtering: fecha_scraping >= ${toDateKey(SINCE_DATE)} (from --since flag)`);
    const allDocs = await col.find({}).toArray();
    docs = allDocs.filter((doc) => {
      const parsed = parseDateDDMMYYYY(doc.fecha_scraping);
      return parsed && parsed >= SINCE_DATE;
    });
  } else {
    console.log('  Auto-detecting latest scraping dates per origin...');
    const latestPerOrigin = await getLatestScrapingDatesByOrigin(col);

    if (latestPerOrigin.length === 0) {
      console.log('  WARNING: No valid fecha_scraping found. Fetching ALL documents.');
      docs = await col.find({}).toArray();
    } else {
      console.log('  Latest dates per origin:');
      latestPerOrigin.forEach((entry) => {
        console.log(`    ${entry.origenLabel}: ${entry.fechaScraping}`);
      });

      docs = await col.find({
        $or: latestPerOrigin.map((entry) => ({
          origen: entry.origen,
          fecha_scraping: entry.fechaScraping,
        })),
      }).toArray();
    }
  }

  console.log(`  Fetched: ${docs.length} documents`);
  console.log('  By origen:', JSON.stringify(countBy(docs, (doc) => doc.origen || '(null)')));

  await mongo.close();
  console.log('  MongoDB connection closed.');
  console.log();

  console.log('Filtering and processing core categories...');
  const processed = [];
  const stats = createProcessingStats();
  for (const doc of docs) {
    const record = normalizeMongoDoc(doc);
    if (!record) continue;
    processed.push(record);
    addRecordToStats(stats, record);
  }

  console.log(`  Processed: ${processed.length} (discarded ${docs.length - processed.length})`);
  console.log('  By category:', JSON.stringify(stats.byCategoria));
  console.log('  By origen:', JSON.stringify(stats.byOrigen));
  console.log(`  Price: ${stats.priceOk} ok, ${stats.priceNull} null`);
  console.log(`  Year: ${stats.yearOk} ok, ${stats.yearNull} null`);
  console.log(`  Competitors: ${stats.competitors}`);
  console.log();

  if (DRY_RUN) {
    console.log('=== DRY RUN - no data written to PostgreSQL ===');
    if (!NO_SAMPLE) {
      const samplePath = path.join(__dirname, '..', 'data', 'pipeline_live_sample.json');
      fs.writeFileSync(samplePath, JSON.stringify(processed.slice(0, 10), null, 2), 'utf8');
      console.log(`Sample written to ${samplePath}`);
    }
    return;
  }

  await upsertIntoPostgres({ docs, processed });
}

async function upsertIntoPostgres({ docs, processed }) {
  console.log('=== Upserting into PostgreSQL ===');
  const prisma = new PrismaClient();

  try {
    const now = new Date();
    const runDate = getMaxRecordDate(processed) ?? toDateOnlyUTC(now);

    const run = await prisma.scrapingRun.create({
      data: {
        runDate,
        sourceFile: 'mongodb-live',
        sourceCount: docs.length,
        filteredCount: processed.length,
        processedCount: processed.length,
      },
    });
    console.log(`  Created scraping run #${run.id} (${toDateKey(runDate)})`);

    console.log('  Loading existing listings...');
    const existingListings = await prisma.listing.findMany({
      select: { id: true, url: true },
    });
    const existingMap = new Map(existingListings.map((listing) => [listing.url, listing]));
    console.log(`  Found ${existingMap.size} existing listings`);

    const seenUrls = new Set();
    let newCount = 0;
    let updatedCount = 0;
    let snapshotsCreated = 0;
    let snapshotsUpdated = 0;

    for (let i = 0; i < processed.length; i += BATCH_SIZE) {
      const batch = processed.slice(i, i + BATCH_SIZE);

      for (const record of batch) {
        seenUrls.add(record.url);
        const existing = existingMap.get(record.url);
        const snapshotDate = record.fechaScraping ? toDateOnlyUTC(record.fechaScraping) : runDate;

        const upsertData = {
          ...record,
          scrapingRunId: run.id,
          active: true,
          lastSeenAt: now,
        };

        if (existing) {
          const { url, ...updateData } = upsertData;
          await prisma.listing.update({
            where: { url: record.url },
            data: updateData,
          });
          updatedCount++;

          const result = await savePriceSnapshot(prisma, {
            listingId: existing.id,
            record,
            runId: run.id,
            snapshotDate,
          });
          if (result === 'created') snapshotsCreated++;
          else snapshotsUpdated++;
        } else {
          const created = await prisma.listing.create({
            data: {
              ...upsertData,
              firstSeenAt: now,
            },
          });
          existingMap.set(record.url, { id: created.id, url: record.url });
          newCount++;

          const result = await savePriceSnapshot(prisma, {
            listingId: created.id,
            record,
            runId: run.id,
            snapshotDate,
          });
          if (result === 'created') snapshotsCreated++;
          else snapshotsUpdated++;
        }
      }

      process.stdout.write(`\r  Processed: ${Math.min(i + BATCH_SIZE, processed.length)}/${processed.length}`);
    }
    console.log();

    console.log('  Marking listings not seen in this latest scraping batch as inactive...');
    const allUrls = [...existingMap.keys()];
    const unseenUrls = allUrls.filter((url) => !seenUrls.has(url));

    let deactivatedCount = 0;
    for (let i = 0; i < unseenUrls.length; i += BATCH_SIZE) {
      const batch = unseenUrls.slice(i, i + BATCH_SIZE);
      const result = await prisma.listing.updateMany({
        where: { url: { in: batch }, active: true },
        data: { active: false },
      });
      deactivatedCount += result.count;
    }

    await prisma.scrapingRun.update({
      where: { id: run.id },
      data: {
        upsertedCount: newCount + updatedCount,
        newCount,
        updatedCount,
        deactivatedCount,
      },
    });

    const [totalActive, totalHistory] = await Promise.all([
      prisma.listing.count({ where: { active: true } }),
      prisma.priceHistory.count(),
    ]);

    console.log();
    console.log('=== RESULTS ===');
    console.log(`  New listings:             ${newCount}`);
    console.log(`  Updated listings:         ${updatedCount}`);
    console.log(`  Price snapshots created:  ${snapshotsCreated}`);
    console.log(`  Price snapshots updated:  ${snapshotsUpdated}`);
    console.log(`  Deactivated:              ${deactivatedCount}`);
    console.log(`  DB verification: ${totalActive} active listings, ${totalHistory} price history records`);
  } finally {
    await prisma.$disconnect();
  }
}

async function getLatestScrapingDatesByOrigin(col) {
  const rows = await col.aggregate([
    { $match: { fecha_scraping: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: { origen: '$origen', fechaScraping: '$fecha_scraping' },
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const latestByOrigin = new Map();
  for (const row of rows) {
    const origen = row._id.origen ?? null;
    const fechaScraping = row._id.fechaScraping;
    const parsed = parseDateDDMMYYYY(fechaScraping);
    if (!parsed) continue;

    const key = origen === null ? '__NULL__' : String(origen);
    const current = latestByOrigin.get(key);
    if (!current || parsed > current.parsed) {
      latestByOrigin.set(key, {
        origen,
        origenLabel: origen ?? '(null)',
        fechaScraping,
        parsed,
        count: row.count,
      });
    }
  }

  return Array.from(latestByOrigin.values()).sort((a, b) =>
    String(a.origenLabel).localeCompare(String(b.origenLabel)),
  );
}

async function savePriceSnapshot(prisma, { listingId, record, runId, snapshotDate }) {
  const existing = await prisma.priceHistory.findFirst({
    where: { listingId, snapshotDate },
    select: { id: true },
  });

  const data = {
    precioUsd: record.precioUsd,
    monedaNorm: record.monedaNorm,
    precioRaw: record.precioRaw,
    scrapingRunId: runId,
  };

  if (existing) {
    await prisma.priceHistory.update({
      where: { id: existing.id },
      data,
    });
    return 'updated';
  }

  await prisma.priceHistory.create({
    data: {
      listingId,
      ...data,
      snapshotDate,
    },
  });
  return 'created';
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function getMaxRecordDate(records) {
  let latest = null;
  for (const record of records) {
    if (!record.fechaScraping) continue;
    const date = toDateOnlyUTC(record.fechaScraping);
    if (!latest || date > latest) latest = date;
  }
  return latest;
}

function parseSinceDate(value) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, yyyy, mm, dd] = match;
  const date = new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)));
  return Number.isNaN(date.getTime()) ? null : date;
}

main().catch((error) => {
  console.error('Pipeline error:', error);
  process.exit(1);
});
