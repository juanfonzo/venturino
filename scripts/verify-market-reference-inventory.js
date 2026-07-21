const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const { requireTypeScript } = require('./register-ts');

const {
  findDirectMarketReferences,
  searchExpandedMarketReferences,
} = requireTypeScript('lib/market-reference/service.ts');
const {
  parseDirectReferenceInput,
  parseExpandedSearchInput,
} = requireTypeScript('lib/market-reference/validation.ts');

async function main() {
  const prisma = new PrismaClient();
  try {
    const inventory = await prisma.listing.findMany({
      where: {
        active: true,
        OR: [
          { origen: { contains: 'venturino', mode: 'insensitive' } },
          { vendedor: { contains: 'venturino', mode: 'insensitive' } },
        ],
        condicion: 'Usado',
        categoria: 'Tractores',
        marca: { not: null },
        marcaNorm: { not: null },
        modeloNorm: { not: null },
        anio: { not: null },
      },
      select: {
        id: true,
        categoria: true,
        marca: true,
        marcaNorm: true,
        modelo: true,
        modeloNorm: true,
        anio: true,
      },
      orderBy: [{ anio: 'desc' }, { id: 'asc' }],
      take: 100,
    });

    const unique = [];
    const seen = new Set();
    for (const tractor of inventory) {
      const key = `${tractor.marcaNorm}|${tractor.modeloNorm}|${tractor.anio}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(tractor);
      if (unique.length === 5) break;
    }

    if (unique.length < 5) {
      throw new Error(`Se encontraron ${unique.length} tractores usados verificables; se necesitan 5.`);
    }

    console.log('=== Verificación API: 5 tractores usados de Venturino ===');
    for (const tractor of unique) {
      const model = tractor.modeloNorm;
      const result = await findDirectMarketReferences(parseDirectReferenceInput({
        categoria: tractor.categoria,
        marca: tractor.marca,
        modelo: model,
        anio: tractor.anio,
      }), `inventory-verification-${tractor.id}`);

      const stats = result.response.statistics;
      let expandedText = `, criterio ${result.response.criterioAplicado.titulo}`;
      if (stats.sampleSize < 3) {
        const expanded = await searchExpandedMarketReferences(parseExpandedSearchInput({
          categoria: tractor.categoria,
          marca: tractor.marca,
          modelo: result.response.busquedaAmpliadaSugerida?.modelo ?? model,
          anio: tractor.anio,
          page: 1,
          pageSize: 5,
        }), `inventory-expanded-verification-${tractor.id}`);
        const sampleModels = [...new Set(
          expanded.response.references.map((reference) => reference.model).filter(Boolean),
        )].slice(0, 4);
        expandedText += `, búsqueda ampliada ${expanded.response.pagination.total}`;
        if (sampleModels.length > 0) expandedText += ` [${sampleModels.join(', ')}]`;
      }
      console.log(
        `${tractor.marca} ${model} (${tractor.anio}): ${stats.sampleSize} directas, mediana ${formatUsd(stats.median)}${expandedText}`,
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

function formatUsd(value) {
  return value === null ? 'sin dato' : `USD ${Math.round(value).toLocaleString('es-AR')}`;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
