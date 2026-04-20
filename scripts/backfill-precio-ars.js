/**
 * Backfill precioArs for existing listings that have monedaNorm = 'ARS' but precioArs IS NULL.
 *
 * This is needed because existing listings were inserted before the precioArs column existed.
 * It re-parses precioRaw to extract the ARS value and stores it in precioArs.
 *
 * Usage:
 *   node scripts/backfill-precio-ars.js [--dry-run]
 */

const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Load .env
const fs = require('fs');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if (!key || process.env[key] !== undefined) continue;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 500;

// ─── Price parsing (same logic as pipeline) ───────────────

function parsePriceRaw(raw) {
  if (!raw) return null;
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
  }

  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

// ─── Main ────────────────────────────────────────────────

async function main() {
  console.log('=== Backfill precioArs ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  const prisma = new PrismaClient();

  try {
    // Find all ARS listings without precioArs
    const listings = await prisma.listing.findMany({
      where: {
        monedaNorm: 'ARS',
        precioArs: null,
        precioRaw: { not: null },
      },
      select: {
        id: true,
        precioRaw: true,
        precioUsd: true,
        origen: true,
      },
    });

    console.log(`Found ${listings.length} ARS listings without precioArs`);

    if (listings.length === 0) {
      console.log('Nothing to backfill. Done!');
      return;
    }

    let updated = 0;
    let failed = 0;

    for (let i = 0; i < listings.length; i += BATCH_SIZE) {
      const batch = listings.slice(i, i + BATCH_SIZE);

      for (const listing of batch) {
        const parsed = parsePriceRaw(listing.precioRaw);
        if (parsed === null) {
          failed++;
          continue;
        }

        // Rastroagro special case: if USD and matches pattern, the raw was already
        // in USD (not ARS), but monedaNorm was corrected. Skip since we can't recover ARS.
        // For all others: the raw price IS the ARS value.
        const precioArs = Math.round(parsed * 100) / 100;

        if (!DRY_RUN) {
          await prisma.listing.update({
            where: { id: listing.id },
            data: { precioArs },
          });
        }
        updated++;
      }

      process.stdout.write(`\r  Processed: ${Math.min(i + BATCH_SIZE, listings.length)}/${listings.length}`);
    }

    console.log(`\n  Updated: ${updated}, Failed to parse: ${failed}`);
    if (DRY_RUN) {
      console.log('\n=== DRY RUN — no data written ===');
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('Backfill error:', e);
  process.exit(1);
});
