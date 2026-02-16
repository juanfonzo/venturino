/**
 * Investigate low-match models from Análisis 1.
 * For each model, check how it appears in Venturino CSV vs PostgreSQL competition data.
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Models from the screenshot with low matches
const TARGET_MODELS = [
  { brand: 'JOHN DEERE', model: '7230R' },
  { brand: 'CASE IH', model: 'PUMA225' },
  { brand: 'JOHN DEERE', model: '6100D' },
  { brand: 'JOHN DEERE', model: '5065ES' },
  { brand: 'JOHN DEERE', model: '7210J' },
  { brand: 'JOHN DEERE', model: '5045DS' },
  { brand: 'CASE IH', model: 'MXM150' },
  { brand: 'CASE IH', model: 'CIH MAGNUM315' },
  { brand: 'NEW HOLLAND', model: 'T8 295' },
];

async function main() {
  const lines = [];
  function log(msg = '') { lines.push(msg); console.log(msg); }

  log('=== INVESTIGATION: Low-match models in Análisis 1 ===\n');

  // 1. Load Venturino CSV data to see how these models look there
  log('--- STEP 1: How do these models appear in Venturino CSV? ---\n');
  
  const csvPath = path.join(__dirname, '..', 'data', 'venturino_tractores_usados.csv');
  let ventRows = [];
  try {
    const raw = fs.readFileSync(csvPath, 'utf8');
    const lines2 = raw.split('\n');
    const header = lines2[0].split(';').map(h => h.trim().replace(/"/g, ''));
    ventRows = lines2.slice(1).filter(l => l.trim()).map(l => {
      const vals = l.split(';').map(v => v.trim().replace(/"/g, ''));
      const obj = {};
      header.forEach((h, i) => { obj[h] = vals[i] || ''; });
      return obj;
    });
    log(`Venturino CSV loaded: ${ventRows.length} rows`);
  } catch (e) {
    log(`Could not load Venturino CSV: ${e.message}`);
  }

  // For each target model, find in Venturino
  for (const target of TARGET_MODELS) {
    log(`\n${'='.repeat(60)}`);
    log(`TARGET: ${target.brand} ${target.model}`);
    log(`${'='.repeat(60)}`);

    // Search in Venturino CSV
    const modelSearch = target.model.replace(/\s+/g, '').toLowerCase();
    const brandSearch = target.brand.toLowerCase();
    
    const ventMatches = ventRows.filter(r => {
      const marca = (r.marca || '').toLowerCase();
      const modelo = (r.modelo || '').toLowerCase().replace(/\s+/g, '');
      return marca.includes(brandSearch.split(' ')[brandSearch.split(' ').length - 1]) && 
             (modelo.includes(modelSearch) || modelSearch.includes(modelo.replace(/\s+/g, '')));
    });
    
    log(`\n  Venturino CSV matches: ${ventMatches.length}`);
    ventMatches.forEach(r => {
      log(`    marca="${r.marca}" modelo="${r.modelo}" anio="${r.anio}" hp="${r.hp_motor}" precio="${r.precio_publicado || r.precio}"`);
    });

    // Now search in PostgreSQL (competition) - exact marca_norm match
    const pgExact = await prisma.listing.findMany({
      where: {
        marcaNorm: target.brand,
        modeloNorm: target.model,
      },
      select: { id: true, origen: true, marca: true, modelo: true, marcaNorm: true, modeloNorm: true, anio: true, hp: true, precioUsd: true, vendedor: true },
    });
    
    log(`\n  PostgreSQL EXACT match (marcaNorm="${target.brand}", modeloNorm="${target.model}"): ${pgExact.length}`);
    pgExact.slice(0, 5).forEach(r => {
      log(`    ${r.origen} | marca="${r.marca}" modelo="${r.modelo}" | norm="${r.marcaNorm}|${r.modeloNorm}" | year=${r.anio} hp=${r.hp} $${r.precioUsd}`);
    });

    // Search with CONTAINS on modeloNorm
    const modelTokens = target.model.replace(/[^A-Z0-9]/g, ' ').split(' ').filter(t => t.length > 0);
    const mainToken = modelTokens.find(t => /\d/.test(t)) || modelTokens[0];
    
    const pgContains = await prisma.listing.findMany({
      where: {
        marcaNorm: target.brand,
        modeloNorm: { contains: mainToken, mode: 'insensitive' },
      },
      select: { id: true, origen: true, marca: true, modelo: true, marcaNorm: true, modeloNorm: true, anio: true, hp: true, precioUsd: true },
    });
    
    log(`\n  PostgreSQL CONTAINS "${mainToken}" (brand=${target.brand}): ${pgContains.length}`);
    // Group by modeloNorm
    const byModelNorm = {};
    pgContains.forEach(r => {
      const key = r.modeloNorm || '(null)';
      if (!byModelNorm[key]) byModelNorm[key] = [];
      byModelNorm[key].push(r);
    });
    Object.entries(byModelNorm).sort((a, b) => b[1].length - a[1].length).forEach(([model, items]) => {
      log(`    modeloNorm="${model}": ${items.length} listings`);
      items.slice(0, 3).forEach(r => {
        log(`      ${r.origen} | marca="${r.marca}" modelo="${r.modelo}" | year=${r.anio}`);
      });
    });

    // Also search with broader brand matching (CASE vs CASE IH)
    if (target.brand === 'CASE IH') {
      const pgCase = await prisma.listing.findMany({
        where: {
          marcaNorm: 'CASE',
          modeloNorm: { contains: mainToken, mode: 'insensitive' },
        },
        select: { id: true, origen: true, marca: true, modelo: true, marcaNorm: true, modeloNorm: true, anio: true },
      });
      log(`\n  PostgreSQL brand="CASE" + CONTAINS "${mainToken}": ${pgCase.length}`);
      const byModel2 = {};
      pgCase.forEach(r => {
        const key = r.modeloNorm || '(null)';
        if (!byModel2[key]) byModel2[key] = [];
        byModel2[key].push(r);
      });
      Object.entries(byModel2).sort((a, b) => b[1].length - a[1].length).forEach(([model, items]) => {
        log(`    modeloNorm="${model}": ${items.length} listings`);
      });
    }

    // Search by numeric part only across all brands that could match
    const numericPart = target.model.match(/\d+/)?.[0];
    if (numericPart) {
      const brandVariants = target.brand === 'CASE IH' ? ['CASE IH', 'CASE'] :
                            target.brand === 'NEW HOLLAND' ? ['NEW HOLLAND'] :
                            [target.brand];
      
      for (const bv of brandVariants) {
        const pgNumeric = await prisma.listing.findMany({
          where: {
            marcaNorm: bv,
            OR: [
              { modeloNorm: { contains: numericPart, mode: 'insensitive' } },
              { modelo: { contains: numericPart, mode: 'insensitive' } },
            ],
          },
          select: { id: true, origen: true, marca: true, modelo: true, marcaNorm: true, modeloNorm: true },
        });
        
        // Filter to those where the numeric part is a significant match
        const relevant = pgNumeric.filter(r => {
          const mn = (r.modeloNorm || '').toUpperCase();
          const mo = (r.modelo || '').toUpperCase();
          return mn.includes(numericPart) || mo.includes(numericPart);
        });
        
        if (relevant.length > 0) {
          const byMN = {};
          relevant.forEach(r => {
            const key = `${r.marcaNorm}|${r.modeloNorm || r.modelo}`;
            if (!byMN[key]) byMN[key] = 0;
            byMN[key]++;
          });
          
          log(`\n  Broader search brand="${bv}" + numeric "${numericPart}" in modelo/modeloNorm: ${relevant.length}`);
          Object.entries(byMN).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([key, count]) => {
            log(`    ${key}: ${count}`);
          });
        }
      }
    }
  }

  // Write output
  const outPath = path.join(__dirname, '..', 'data', 'match_investigation.txt');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  log(`\nOutput written to ${outPath}`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
