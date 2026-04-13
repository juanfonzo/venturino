/**
 * Backfill historical price snapshots from MongoDB into PostgreSQL.
 *
 * Usage:
 *   node scripts/backfill-price-history.js --dry-run
 *   node scripts/backfill-price-history.js
 *   node scripts/backfill-price-history.js --replace-history
 *
 * This keeps only the latest scraping batch per origin as active, while older
 * MongoDB snapshots remain available for market evolution charts.
 */

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
const REPLACE_HISTORY = process.argv.includes('--replace-history');
const BATCH_SIZE = 500;

async function main() {
  console.log('=== Backfill price history: MongoDB -> PostgreSQL ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Replace history: ${REPLACE_HISTORY ? 'yes' : 'no'}`);
  console.log();

  const mongo = new MongoClient(MONGODB_URI);
  await mongo.connect();
  const col = mongo.db('algorym').collection('venturino');

  console.log('Fetching MongoDB documents with fecha_scraping...');
  const docs = await col.find({
    fecha_scraping: { $exists: true, $ne: null },
    url: { $exists: true, $ne: null },
  }).toArray();
  await mongo.close();

  console.log(`  Fetched: ${docs.length}`);

  const records = [];
  const stats = createProcessingStats();
  for (const doc of docs) {
    const record = normalizeMongoDoc(doc);
    if (!record || !record.fechaScraping) continue;

    records.push(record);
    addRecordToStats(stats, record);
  }

  const latestDateByOrigin = buildLatestDateByOrigin(docs);
  const latestRecordByUrl = buildLatestRecordByUrl(records);
  const firstDateByUrl = buildFirstDateByUrl(records);
  const snapshotsByUrlDate = buildSnapshotsByUrlDate(records);
  const countsByDate = buildCountsByDate(docs, records, snapshotsByUrlDate);

  console.log(`  Core records: ${records.length}`);
  console.log(`  Unique listings: ${latestRecordByUrl.size}`);
  console.log(`  Unique URL/date snapshots: ${snapshotsByUrlDate.size}`);
  console.log('  By category:', JSON.stringify(stats.byCategoria));
  console.log('  By origen:', JSON.stringify(stats.byOrigen));
  console.log('  Latest fecha_scraping by origin:');
  Array.from(latestDateByOrigin.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([origin, dateKey]) => console.log(`    ${origin}: ${dateKey}`));
  console.log();

  if (DRY_RUN) {
    console.log('=== DRY RUN - no data written to PostgreSQL ===');
    return;
  }

  const prisma = new PrismaClient();
  try {
    if (REPLACE_HISTORY) {
      console.log('Deleting existing price_history rows...');
      const deleted = await prisma.priceHistory.deleteMany({});
      console.log(`  Deleted: ${deleted.count}`);
    }

    console.log('Creating/reusing scraping run rows by snapshot date...');
    const runIdByDate = await ensureBackfillRuns(prisma, countsByDate);
    console.log(`  Run dates: ${runIdByDate.size}`);

    console.log('Upserting listings and active flags...');
    const listingIdByUrl = await upsertListings(prisma, {
      latestRecordByUrl,
      firstDateByUrl,
      latestDateByOrigin,
      runIdByDate,
    });
    console.log(`  Listing ids available: ${listingIdByUrl.size}`);

    console.log('Upserting price snapshots...');
    let snapshotsCreated = 0;
    let snapshotsUpdated = 0;
    let skippedSnapshots = 0;

    const snapshots = Array.from(snapshotsByUrlDate.values()).sort((a, b) => {
      const dateCmp = toDateKey(a.fechaScraping).localeCompare(toDateKey(b.fechaScraping));
      if (dateCmp !== 0) return dateCmp;
      return a.url.localeCompare(b.url);
    });

    for (let i = 0; i < snapshots.length; i += BATCH_SIZE) {
      const batch = snapshots.slice(i, i + BATCH_SIZE);
      for (const record of batch) {
        const listingId = listingIdByUrl.get(record.url);
        const snapshotDate = toDateOnlyUTC(record.fechaScraping);
        const runId = runIdByDate.get(toDateKey(snapshotDate));

        if (!listingId || !runId) {
          skippedSnapshots++;
          continue;
        }

        const result = await savePriceSnapshot(prisma, {
          listingId,
          record,
          runId,
          snapshotDate,
        });
        if (result === 'created') snapshotsCreated++;
        else snapshotsUpdated++;
      }

      process.stdout.write(`\r  Snapshots: ${Math.min(i + BATCH_SIZE, snapshots.length)}/${snapshots.length}`);
    }
    console.log();

    const [activeCount, totalListings, totalHistory] = await Promise.all([
      prisma.listing.count({ where: { active: true } }),
      prisma.listing.count(),
      prisma.priceHistory.count(),
    ]);

    console.log();
    console.log('=== RESULTS ===');
    console.log(`  Snapshots created: ${snapshotsCreated}`);
    console.log(`  Snapshots updated: ${snapshotsUpdated}`);
    console.log(`  Snapshots skipped: ${skippedSnapshots}`);
    console.log(`  Listings total:    ${totalListings}`);
    console.log(`  Listings active:   ${activeCount}`);
    console.log(`  Price history:     ${totalHistory}`);
  } finally {
    await prisma.$disconnect();
  }
}

function buildLatestDateByOrigin(docs) {
  const latest = new Map();
  for (const doc of docs) {
    const parsed = parseDateDDMMYYYY(doc.fecha_scraping);
    if (!parsed) continue;

    const origin = doc.origen || 'unknown';
    const dateKey = toDateKey(parsed);
    const current = latest.get(origin);
    if (!current || dateKey > current) {
      latest.set(origin, dateKey);
    }
  }
  return latest;
}

function buildLatestRecordByUrl(records) {
  const latest = new Map();
  for (const record of records) {
    const dateKey = toDateKey(record.fechaScraping);
    const current = latest.get(record.url);
    if (!current || dateKey >= toDateKey(current.fechaScraping)) {
      latest.set(record.url, record);
    }
  }
  return latest;
}

function buildFirstDateByUrl(records) {
  const first = new Map();
  for (const record of records) {
    const date = toDateOnlyUTC(record.fechaScraping);
    const current = first.get(record.url);
    if (!current || date < current) {
      first.set(record.url, date);
    }
  }
  return first;
}

function buildSnapshotsByUrlDate(records) {
  const snapshots = new Map();
  for (const record of records) {
    const key = `${record.url}\n${toDateKey(record.fechaScraping)}`;
    snapshots.set(key, record);
  }
  return snapshots;
}

function buildCountsByDate(docs, records, snapshotsByUrlDate) {
  const counts = new Map();

  for (const doc of docs) {
    const parsed = parseDateDDMMYYYY(doc.fecha_scraping);
    if (!parsed) continue;
    const dateKey = toDateKey(parsed);
    const entry = counts.get(dateKey) ?? { sourceCount: 0, filteredCount: 0, processedCount: 0 };
    entry.sourceCount++;
    counts.set(dateKey, entry);
  }

  for (const record of records) {
    const dateKey = toDateKey(record.fechaScraping);
    const entry = counts.get(dateKey) ?? { sourceCount: 0, filteredCount: 0, processedCount: 0 };
    entry.filteredCount++;
    counts.set(dateKey, entry);
  }

  for (const record of snapshotsByUrlDate.values()) {
    const dateKey = toDateKey(record.fechaScraping);
    const entry = counts.get(dateKey) ?? { sourceCount: 0, filteredCount: 0, processedCount: 0 };
    entry.processedCount++;
    counts.set(dateKey, entry);
  }

  return counts;
}

async function ensureBackfillRuns(prisma, countsByDate) {
  const runIdByDate = new Map();
  const dateKeys = Array.from(countsByDate.keys()).sort();

  for (const dateKey of dateKeys) {
    const date = new Date(`${dateKey}T00:00:00.000Z`);
    const counts = countsByDate.get(dateKey);
    const existing = await prisma.scrapingRun.findFirst({
      where: {
        runDate: date,
        sourceFile: 'mongodb-backfill',
      },
      select: { id: true },
    });

    const data = {
      sourceCount: counts.sourceCount,
      filteredCount: counts.filteredCount,
      processedCount: counts.processedCount,
      upsertedCount: counts.processedCount,
    };

    if (existing) {
      await prisma.scrapingRun.update({
        where: { id: existing.id },
        data,
      });
      runIdByDate.set(dateKey, existing.id);
      continue;
    }

    const created = await prisma.scrapingRun.create({
      data: {
        runDate: date,
        sourceFile: 'mongodb-backfill',
        ...data,
      },
    });
    runIdByDate.set(dateKey, created.id);
  }

  return runIdByDate;
}

async function upsertListings(prisma, {
  latestRecordByUrl,
  firstDateByUrl,
  latestDateByOrigin,
  runIdByDate,
}) {
  const existingListings = await prisma.listing.findMany({
    select: { id: true, url: true },
  });
  const listingIdByUrl = new Map(existingListings.map((listing) => [listing.url, listing.id]));
  const latestRecords = Array.from(latestRecordByUrl.values());
  let created = 0;
  let updated = 0;

  for (let i = 0; i < latestRecords.length; i += BATCH_SIZE) {
    const batch = latestRecords.slice(i, i + BATCH_SIZE);
    for (const record of batch) {
      const dateKey = toDateKey(record.fechaScraping);
      const active = latestDateByOrigin.get(record.origen) === dateKey;
      const runId = runIdByDate.get(dateKey);
      const firstSeenAt = firstDateByUrl.get(record.url) ?? toDateOnlyUTC(record.fechaScraping);
      const lastSeenAt = toDateOnlyUTC(record.fechaScraping);

      const data = {
        ...record,
        scrapingRunId: runId,
        active,
        firstSeenAt,
        lastSeenAt,
      };

      const existingId = listingIdByUrl.get(record.url);
      if (existingId) {
        const { url, ...updateData } = data;
        await prisma.listing.update({
          where: { url: record.url },
          data: updateData,
        });
        updated++;
      } else {
        const createdListing = await prisma.listing.create({ data });
        listingIdByUrl.set(record.url, createdListing.id);
        created++;
      }
    }

    process.stdout.write(`\r  Listings: ${Math.min(i + BATCH_SIZE, latestRecords.length)}/${latestRecords.length}`);
  }
  console.log();
  console.log(`  Created listings: ${created}`);
  console.log(`  Updated listings: ${updated}`);

  return listingIdByUrl;
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

main().catch((error) => {
  console.error('Backfill error:', error);
  process.exit(1);
});
