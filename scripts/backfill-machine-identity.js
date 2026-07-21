/**
 * Recalcula marca_norm y modelo_norm con el normalizador compartido por API y pipeline.
 * Por seguridad, sólo escribe cuando se pasa --apply.
 *
 * Uso:
 *   node scripts/backfill-machine-identity.js
 *   node scripts/backfill-machine-identity.js --apply
 */

const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const { requireTypeScript } = require('./register-ts');

const { normalizeMachineIdentity } = requireTypeScript('lib/normalize/machineIdentity.ts');

const APPLY = process.argv.includes('--apply');
const BATCH_SIZE = 500;

async function main() {
  const prisma = new PrismaClient();
  let cursor = null;
  let scanned = 0;
  let changed = 0;
  let withoutIdentity = 0;
  const examples = [];

  console.log('=== Normalización canónica de maquinarias ===');
  console.log(`Modo: ${APPLY ? 'APLICAR CAMBIOS' : 'SIMULACIÓN'}`);

  try {
    while (true) {
      const rows = await prisma.listing.findMany({
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        select: {
          id: true,
          categoria: true,
          marca: true,
          marcaNorm: true,
          modelo: true,
          modeloNorm: true,
          titulo: true,
          hp: true,
          flags: true,
        },
        orderBy: { id: 'asc' },
        take: BATCH_SIZE,
      });
      if (rows.length === 0) break;

      for (const row of rows) {
        const identity = normalizeMachineIdentity({
          category: row.categoria,
          brand: row.marcaNorm || row.marca,
          model: row.modelo,
          title: row.titulo,
          hp: row.hp === null ? null : Number(row.hp),
        });
        if (!identity.brandNorm || !identity.modelKey) {
          withoutIdentity++;
          continue;
        }
        const brandChanged = identity.brandNorm !== row.marcaNorm;
        const previousModelKey = compactModel(row.modeloNorm);
        const modelChanged = identity.aliasApplied && identity.modelKey !== previousModelKey;
        if (!brandChanged && !modelChanged) continue;

        changed++;
        if (examples.length < 20) {
          examples.push({
            id: row.id,
            marca: brandChanged ? `${row.marcaNorm ?? '-'} -> ${identity.brandNorm}` : 'sin cambio',
            modelo: modelChanged ? `${row.modeloNorm ?? '-'} -> ${identity.modelKey}` : 'sin cambio',
          });
        }
        if (APPLY) {
          const flags = identity.aliasApplied && !row.flags.includes('MODEL_CANONICALIZED')
            ? [...row.flags, 'MODEL_CANONICALIZED']
            : row.flags;
          await prisma.listing.update({
            where: { id: row.id },
            data: {
              ...(brandChanged ? { marcaNorm: identity.brandNorm } : {}),
              ...(modelChanged ? { modeloNorm: identity.modelKey } : {}),
              flags,
            },
          });
        }
      }

      scanned += rows.length;
      cursor = rows[rows.length - 1].id;
      process.stdout.write(`\rProcesadas: ${scanned}`);
    }

    console.log(`\nCambios detectados: ${changed}`);
    console.log(`Sin identidad suficiente: ${withoutIdentity}`);
    if (examples.length > 0) console.table(examples);
    if (!APPLY) console.log('Simulación finalizada. No se modificaron datos.');
  } finally {
    await prisma.$disconnect();
  }
}

function compactModel(value) {
  return value ? value.replace(/[^A-Z0-9]/gi, '').toUpperCase() : null;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
