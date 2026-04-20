require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

(async () => {
  const allV = await p.listing.findMany({
    where: { origen: 'venturino' },
    select: {
      categoria: true, marca: true, modelo: true,
      marcaNorm: true, modeloNorm: true,
      anio: true, horas: true, precioUsd: true,
      active: true, url: true, condicion: true,
    },
    orderBy: [{ active: 'desc' }, { categoria: 'asc' }, { marca: 'asc' }],
  });
  console.log('TOTAL Venturino rows:', allV.length);
  console.log('  active:', allV.filter((r) => r.active).length);
  console.log('  inactive:', allV.filter((r) => !r.active).length);
  console.log();
  console.log('Por categoría (active):');
  const byCat = new Map();
  allV.filter((r) => r.active).forEach((r) => {
    byCat.set(r.categoria, (byCat.get(r.categoria) ?? 0) + 1);
  });
  [...byCat.entries()].forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  console.log();
  console.log('Detalle:');
  allV.forEach((r) => {
    console.log(
      (r.active ? '[ON ]' : '[OFF]'),
      (r.categoria || '—').padEnd(14),
      (r.marca || '—').padEnd(14),
      (r.modelo || '—').padEnd(16),
      'n:', (r.marcaNorm || '—').padEnd(14),
      (r.modeloNorm || '—').padEnd(16),
      'a:', String(r.anio ?? '—').padEnd(4),
      'hs:', String(r.horas ?? '—').padEnd(7),
      'u$:', String(r.precioUsd ?? '—').padEnd(10),
      r.condicion || '—',
    );
  });

  // Same brand/model distributions in competitors for the venturino brands
  const brands = [...new Set(allV.filter((r) => r.active && r.marcaNorm).map((r) => r.marcaNorm))];
  console.log('\nCompetidores por marca Venturino:');
  for (const brand of brands) {
    const n = await p.listing.count({ where: { active: true, origen: { not: 'venturino' }, marcaNorm: brand } });
    console.log(`  ${brand}: ${n}`);
  }
  await p.$disconnect();
})();
