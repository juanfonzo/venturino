/**
 * Sincroniza el tipo de cambio oficial USD/ARS desde DolarAPI,
 * lo persiste en la tabla FxRate y recalcula `precioUsd` de los listings
 * en ARS usando la nueva cotización.
 *
 * Uso:
 *   node scripts/syncFxRate.js           # sync real
 *   node scripts/syncFxRate.js --dry     # solo muestra qué haría
 *   node scripts/syncFxRate.js --show    # muestra la cotización actual en DB
 *
 * Requiere DATABASE_URL en .env. Replica la lógica de lib/fx-rate.ts sin
 * depender del build de Next para poder correrse standalone (Docker host,
 * cron de sistema, dev local).
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const DOLAR_API_URL = 'https://dolarapi.com/v1/dolares/oficial';
const FALLBACK_RATE = 1500;

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const SHOW = args.includes('--show');

function parsePositiveNumber(value) {
  if (value === null || value === undefined) return null;
  const n = typeof value === 'string' ? Number.parseFloat(value.trim()) : value;
  return Number.isFinite(n) && n > 0 ? n : null;
}

async function fetchOfficialQuote() {
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(DOLAR_API_URL, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => null);
      const venta = parsePositiveNumber(data?.venta);
      if (!res.ok || !venta) {
        throw new Error(`Cotización oficial inválida (${res.status})`);
      }
      return {
        rate: venta,
        source:
          (typeof data?.nombre === 'string' && data.nombre.trim()) ||
          (typeof data?.casa === 'string' && data.casa.trim()) ||
          'dolarapi/oficial',
        sourceDate:
          typeof data?.fechaActualizacion === 'string' && data.fechaActualizacion.trim()
            ? new Date(data.fechaActualizacion)
            : null,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('No se pudo obtener la cotización oficial');
    }
  }
  throw lastError ?? new Error('No se pudo obtener la cotización oficial');
}

function fmtDate(d) {
  if (!d) return '—';
  try {
    return new Date(d).toISOString();
  } catch {
    return String(d);
  }
}

async function main() {
  const prisma = new PrismaClient();
  try {
    if (SHOW) {
      const current = await prisma.fxRate.findFirst({ orderBy: { createdAt: 'desc' } });
      if (!current) {
        console.log(`Sin cotización en DB. Fallback en código: ${FALLBACK_RATE} ARS/USD.`);
      } else {
        console.log('Cotización actual:');
        console.log({
          rate: Number(current.rate),
          source: current.source,
          sourceDate: fmtDate(current.sourceDate),
          updatedAt: fmtDate(current.updatedAt),
        });
      }
      return;
    }

    console.log(`→ Consultando ${DOLAR_API_URL}...`);
    const quote = await fetchOfficialQuote();
    console.log(`  · rate   = ${quote.rate} ARS/USD`);
    console.log(`  · source = ${quote.source}`);
    console.log(`  · date   = ${fmtDate(quote.sourceDate)}`);

    const current = await prisma.fxRate.findFirst({ orderBy: { createdAt: 'desc' } });
    if (current) {
      const prev = Number(current.rate);
      const diffPct = prev ? (((quote.rate - prev) / prev) * 100).toFixed(2) : '—';
      console.log(`  · anterior en DB = ${prev} ARS/USD (Δ ${diffPct}%)`);
    } else {
      console.log('  · anterior en DB = (sin registro)');
    }

    // Estimar cuántos listings se recalcularían.
    const arsCount = await prisma.listing.count({
      where: { monedaNorm: 'ARS', precioArs: { not: null } },
    });
    console.log(`  · listings en ARS a recalcular: ${arsCount}`);

    if (DRY) {
      console.log('\n--dry: no escribo nada en la DB.');
      return;
    }

    console.log('\n→ Persistiendo en tabla FxRate...');
    await prisma.fxRate.deleteMany({});
    await prisma.fxRate.create({
      data: {
        rate: quote.rate,
        source: quote.source,
        sourceDate: quote.sourceDate,
      },
    });

    console.log('→ Recalculando listings en ARS...');
    const updated = await prisma.$executeRaw`
      UPDATE listings
      SET precio_usd = ROUND(precio_ars / ${quote.rate}, 2)
      WHERE moneda_norm = 'ARS' AND precio_ars IS NOT NULL
    `;
    console.log(`  · filas actualizadas: ${updated}`);

    console.log(`\n✓ Sincronización completa. rate=${quote.rate} · listings=${updated}`);
  } catch (err) {
    console.error('\n✗ Error en sync:', err.message ?? err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
