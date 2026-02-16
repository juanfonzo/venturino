/**
 * Audit normalization quality of data already in PostgreSQL.
 * Checks: marca variants, modelo quality, price outliers, year issues,
 * province coverage, HP distribution, duplicate detection.
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const lines = [];
function log(msg = '') { lines.push(msg); }

async function main() {
  const all = await prisma.listing.findMany();
  log(`=== NORMALIZATION AUDIT (${all.length} listings) ===\n`);

  // 1. MARCA_NORM variants — look for brands that should be merged
  log('=== 1. MARCA_NORM VARIANTS (top 40) ===');
  const marcaCounts = {};
  all.forEach(r => { const m = r.marcaNorm || '(null)'; marcaCounts[m] = (marcaCounts[m] || 0) + 1; });
  const marcaSorted = Object.entries(marcaCounts).sort((a, b) => b[1] - a[1]);
  marcaSorted.slice(0, 40).forEach(([m, c]) => log(`  ${m}: ${c}`));

  // Detect potential duplicates (Levenshtein-like: brands that differ by 1-2 chars)
  log('\n=== 1b. POTENTIAL BRAND DUPLICATES ===');
  const brandNames = marcaSorted.map(([m]) => m).filter(m => m !== '(null)');
  for (let i = 0; i < brandNames.length; i++) {
    for (let j = i + 1; j < brandNames.length; j++) {
      const a = brandNames[i], b = brandNames[j];
      if (a.length < 3 || b.length < 3) continue;
      // Check if one contains the other or they share a long prefix
      if (a.includes(b) || b.includes(a)) {
        log(`  "${a}" (${marcaCounts[a]}) <-> "${b}" (${marcaCounts[b]}) [contains]`);
      } else if (a.substring(0, Math.min(a.length, b.length) - 1) === b.substring(0, Math.min(a.length, b.length) - 1)
                 && Math.abs(a.length - b.length) <= 2) {
        log(`  "${a}" (${marcaCounts[a]}) <-> "${b}" (${marcaCounts[b]}) [similar prefix]`);
      }
    }
  }

  // Specific known brand issues
  log('\n=== 1c. KNOWN BRAND MERGE CANDIDATES ===');
  const brandGroups = [
    ['CASE', 'CASE IH'],
    ['DEUTZ', 'DEUTZ FAHR'],
    ['AGCO', 'AGCO ALLIS'],
    ['CHERY', 'CHERY BYLION'],
    ['JOHN DEERE', 'JD'],
  ];
  brandGroups.forEach(group => {
    const counts = group.map(b => `${b}: ${marcaCounts[b] || 0}`);
    log(`  ${counts.join(' | ')}`);
  });

  // 2. MODELO_NORM quality
  log('\n=== 2. MODELO_NORM QUALITY ===');
  const noModelo = all.filter(r => !r.modeloNorm);
  log(`  Without modelo_norm: ${noModelo.length} (${((noModelo.length / all.length) * 100).toFixed(1)}%)`);
  const noModeloByOrigen = {};
  noModelo.forEach(r => { noModeloByOrigen[r.origen] = (noModeloByOrigen[r.origen] || 0) + 1; });
  Object.entries(noModeloByOrigen).sort((a, b) => b[1] - a[1]).forEach(([o, c]) => log(`    ${o}: ${c}`));

  // Top modelo_norm values
  log('\n  Top 30 modelo_norm:');
  const modeloCounts = {};
  all.forEach(r => { if (r.modeloNorm) modeloCounts[r.modeloNorm] = (modeloCounts[r.modeloNorm] || 0) + 1; });
  Object.entries(modeloCounts).sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([m, c]) => log(`    ${m}: ${c}`));

  // 3. PRICE OUTLIERS
  log('\n=== 3. PRICE ANALYSIS ===');
  const withPrice = all.filter(r => r.precioUsd !== null);
  const prices = withPrice.map(r => Number(r.precioUsd)).sort((a, b) => a - b);
  const p5 = prices[Math.floor(prices.length * 0.05)];
  const p25 = prices[Math.floor(prices.length * 0.25)];
  const p50 = prices[Math.floor(prices.length * 0.50)];
  const p75 = prices[Math.floor(prices.length * 0.75)];
  const p95 = prices[Math.floor(prices.length * 0.95)];
  log(`  Count with price: ${withPrice.length}`);
  log(`  p5=${p5}, p25=${p25}, p50=${p50}, p75=${p75}, p95=${p95}`);
  log(`  Min=${prices[0]}, Max=${prices[prices.length - 1]}`);

  // Suspicious low prices
  const suspLow = withPrice.filter(r => Number(r.precioUsd) < 500);
  log(`\n  Suspicious LOW (<$500 USD): ${suspLow.length}`);
  suspLow.slice(0, 10).forEach(r => {
    log(`    ${r.origen} | ${r.marca} ${r.modelo} | $${r.precioUsd} | moneda=${r.monedaNorm} | raw="${r.precioRaw}" monedaRaw="${r.monedaRaw}"`);
  });

  // Suspicious high prices
  const suspHigh = withPrice.filter(r => Number(r.precioUsd) > 800000);
  log(`\n  Suspicious HIGH (>$800k USD): ${suspHigh.length}`);
  suspHigh.slice(0, 10).forEach(r => {
    log(`    ${r.origen} | ${r.marca} ${r.modelo} | $${r.precioUsd} | moneda=${r.monedaNorm} | raw="${r.precioRaw}" monedaRaw="${r.monedaRaw}"`);
  });

  // Price by category
  log('\n  Price by category (median USD):');
  ['Tractores', 'Cosechadoras', 'Sembradoras', 'Pulverizadoras'].forEach(cat => {
    const catPrices = all.filter(r => r.categoria === cat && r.precioUsd !== null)
      .map(r => Number(r.precioUsd)).sort((a, b) => a - b);
    if (catPrices.length > 0) {
      const median = catPrices[Math.floor(catPrices.length / 2)];
      log(`    ${cat}: n=${catPrices.length}, median=$${median}, min=$${catPrices[0]}, max=$${catPrices[catPrices.length - 1]}`);
    }
  });

  // 4. YEAR ANALYSIS
  log('\n=== 4. YEAR ANALYSIS ===');
  const withYear = all.filter(r => r.anio !== null);
  const noYear = all.filter(r => r.anio === null);
  log(`  With year: ${withYear.length}, Without: ${noYear.length}`);
  const noYearByOrigen = {};
  noYear.forEach(r => { noYearByOrigen[r.origen] = (noYearByOrigen[r.origen] || 0) + 1; });
  Object.entries(noYearByOrigen).sort((a, b) => b[1] - a[1]).forEach(([o, c]) => log(`    ${o}: ${c}`));

  // Year distribution
  const yearDist = {};
  withYear.forEach(r => { const decade = Math.floor(r.anio / 10) * 10; yearDist[decade] = (yearDist[decade] || 0) + 1; });
  log('\n  Year distribution by decade:');
  Object.entries(yearDist).sort((a, b) => a[0] - b[0]).forEach(([d, c]) => log(`    ${d}s: ${c}`));

  // Suspicious years
  const suspYear = withYear.filter(r => r.anio < 1970 || r.anio > 2026);
  log(`\n  Suspicious years (<1970 or >2026): ${suspYear.length}`);
  suspYear.slice(0, 10).forEach(r => {
    log(`    ${r.origen} | ${r.marca} ${r.modelo} | year=${r.anio} | raw="${r.anioRaw}"`);
  });

  // 5. PROVINCE COVERAGE
  log('\n=== 5. PROVINCE COVERAGE ===');
  const provCounts = {};
  all.forEach(r => { const p = r.provincia || '(null)'; provCounts[p] = (provCounts[p] || 0) + 1; });
  Object.entries(provCounts).sort((a, b) => b[1] - a[1]).forEach(([p, c]) => log(`  ${p}: ${c}`));

  // 6. CONDITION ANALYSIS
  log('\n=== 6. CONDITION ANALYSIS ===');
  const condCounts = {};
  all.forEach(r => { const c = r.condicion || '(null)'; condCounts[c] = (condCounts[c] || 0) + 1; });
  Object.entries(condCounts).forEach(([c, n]) => log(`  ${c}: ${n}`));

  // Null condition details
  const nullCond = all.filter(r => !r.condicion);
  if (nullCond.length > 0) {
    log(`\n  Null condition samples:`);
    nullCond.slice(0, 10).forEach(r => {
      log(`    ${r.origen} | ${r.marca} ${r.modelo} | year=${r.anio} | condRaw="${r.condicionRaw}"`);
    });
  }

  // 7. POTENTIAL DUPLICATES (same URL)
  log('\n=== 7. DUPLICATE DETECTION ===');
  const urlCounts = {};
  all.forEach(r => { urlCounts[r.url] = (urlCounts[r.url] || 0) + 1; });
  const dupUrls = Object.entries(urlCounts).filter(([, c]) => c > 1);
  log(`  Duplicate URLs: ${dupUrls.length}`);
  dupUrls.slice(0, 10).forEach(([url, c]) => log(`    ${url}: ${c}x`));

  // Cross-origin duplicates (same marca+modelo+anio+vendedor from different origins)
  log('\n  Cross-origin potential duplicates (same marca+modelo+year+vendedor):');
  const crossKey = {};
  all.filter(r => r.marcaNorm && r.modeloNorm && r.anio && r.vendedor).forEach(r => {
    const key = `${r.marcaNorm}|${r.modeloNorm}|${r.anio}|${r.vendedor.toLowerCase().trim()}`;
    if (!crossKey[key]) crossKey[key] = [];
    crossKey[key].push(r);
  });
  const crossDups = Object.entries(crossKey).filter(([, items]) => {
    const origins = new Set(items.map(i => i.origen));
    return origins.size > 1;
  });
  log(`  Cross-origin groups: ${crossDups.length}`);
  crossDups.slice(0, 5).forEach(([key, items]) => {
    log(`    ${key}: ${items.map(i => `${i.origen}($${i.precioUsd})`).join(', ')}`);
  });

  // 8. HP OUTLIERS
  log('\n=== 8. HP ANALYSIS ===');
  const withHp = all.filter(r => r.hp !== null);
  const hpVals = withHp.map(r => Number(r.hp)).sort((a, b) => a - b);
  if (hpVals.length > 0) {
    log(`  With HP: ${withHp.length}`);
    log(`  Range: ${hpVals[0]} - ${hpVals[hpVals.length - 1]}`);
    log(`  Median: ${hpVals[Math.floor(hpVals.length / 2)]}`);
    // Very low HP
    const lowHp = withHp.filter(r => Number(r.hp) < 10);
    log(`  HP < 10: ${lowHp.length}`);
    lowHp.slice(0, 5).forEach(r => {
      log(`    ${r.origen} | ${r.marca} ${r.modelo} | hp=${r.hp} | raw="${r.hpRaw}"`);
    });
  }

  // Write output
  const outPath = path.join(__dirname, '..', 'data', 'audit_output.txt');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Audit written to ${outPath} (${lines.length} lines)`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
