const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'mongo_export.json');
const OUT_PATH = path.join(__dirname, '..', 'data', 'analysis_output.txt');
const docs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

const lines = [];
function log(msg = '') { lines.push(msg); }

log('=== TOTAL DOCUMENTS ===');
log(`Count: ${docs.length}`);

// 1. Field frequency
log('\n=== FIELD FREQUENCY ===');
const fieldCount = {};
docs.forEach(doc => Object.keys(doc).forEach(key => { fieldCount[key] = (fieldCount[key] || 0) + 1; }));
Object.entries(fieldCount).sort((a, b) => b[1] - a[1]).forEach(([key, count]) => {
  log(`  ${key}: ${count} (${((count / docs.length) * 100).toFixed(1)}%)`);
});

// 2. Distinct categoricals
log('\n=== DISTINCT VALUES ===');
['origen', 'categoria', 'condicion', 'moneda', 'clasificado_condicion_principal', 'iva'].forEach(field => {
  const values = {};
  let nullCount = 0;
  docs.forEach(doc => {
    const val = doc[field];
    if (val === null || val === undefined || val === '') nullCount++;
    else values[String(val).trim()] = (values[String(val).trim()] || 0) + 1;
  });
  const sorted = Object.entries(values).sort((a, b) => b[1] - a[1]);
  log(`\n"${field}" (${sorted.length} distinct, ${nullCount} null/empty):`);
  sorted.forEach(([val, count]) => log(`  "${val}": ${count}`));
});

// 3. Cross-tab origen x categoria
log('\n=== CROSS-TAB: origen x categoria ===');
const crossTab = {};
docs.forEach(doc => {
  const key = `${doc.origen || '(null)'} | ${doc.categoria || '(null)'}`;
  crossTab[key] = (crossTab[key] || 0) + 1;
});
Object.entries(crossTab).sort((a, b) => b[1] - a[1]).forEach(([key, count]) => log(`  ${key}: ${count}`));

// 4. Price analysis
log('\n=== PRICE ANALYSIS BY ORIGEN ===');
const origenList = [...new Set(docs.map(d => d.origen || '(null)'))];
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  let numeric = 0, string = 0, nulls = 0;
  const numericVals = [];
  const stringSamples = [];
  subset.forEach(doc => {
    const p = doc.precio;
    if (p === null || p === undefined || p === '') { nulls++; }
    else if (typeof p === 'number') { numeric++; numericVals.push(p); }
    else { string++; if (stringSamples.length < 8) stringSamples.push(p); }
  });
  numericVals.sort((a, b) => a - b);
  log(`\n"${origen}" (${subset.length} docs):`);
  log(`  numeric: ${numeric}, string: ${string}, null: ${nulls}`);
  if (numericVals.length > 0) {
    log(`  numeric range: ${numericVals[0]} - ${numericVals[numericVals.length - 1]}`);
    log(`  numeric samples: ${JSON.stringify(numericVals.slice(0, 5))}`);
  }
  if (stringSamples.length > 0) log(`  string samples: ${JSON.stringify(stringSamples)}`);
});

// 5. Moneda by origen
log('\n=== MONEDA BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const vals = {};
  subset.forEach(doc => { const m = doc.moneda || '(null)'; vals[m] = (vals[m] || 0) + 1; });
  log(`\n"${origen}":`);
  Object.entries(vals).sort((a, b) => b[1] - a[1]).forEach(([val, count]) => log(`  "${val}": ${count}`));
});

// 6. Location fields
log('\n=== LOCATION FIELDS BY ORIGEN ===');
['ubicacion', 'localidad', 'provincia'].forEach(field => {
  log(`\nField: "${field}"`);
  origenList.forEach(origen => {
    const subset = docs.filter(d => (d.origen || '(null)') === origen);
    const filled = subset.filter(d => d[field] && String(d[field]).trim()).length;
    const pct = ((filled / subset.length) * 100).toFixed(1);
    const samples = [...new Set(subset.filter(d => d[field] && String(d[field]).trim()).map(d => d[field]))].slice(0, 3);
    log(`  "${origen}": ${filled}/${subset.length} (${pct}%) | ${JSON.stringify(samples)}`);
  });
});

// 7. Seller fields
log('\n=== SELLER FIELDS BY ORIGEN ===');
['seller_name', 'vendedor', 'usuario_tipo_empresa_nombre'].forEach(field => {
  log(`\nField: "${field}"`);
  origenList.forEach(origen => {
    const subset = docs.filter(d => (d.origen || '(null)') === origen);
    const filled = subset.filter(d => d[field] && String(d[field]).trim()).length;
    if (filled > 0) {
      const pct = ((filled / subset.length) * 100).toFixed(1);
      const uniq = [...new Set(subset.filter(d => d[field]).map(d => d[field]))];
      log(`  "${origen}": ${filled}/${subset.length} (${pct}%), ${uniq.length} unique | ${JSON.stringify(uniq.slice(0, 5))}`);
    }
  });
});

// 8. Year
log('\n=== YEAR (anio) BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const filled = subset.filter(d => d.anio !== null && d.anio !== undefined && d.anio !== '').length;
  const types = {};
  const vals = [];
  subset.forEach(doc => {
    if (doc.anio !== null && doc.anio !== undefined && doc.anio !== '') {
      types[typeof doc.anio] = (types[typeof doc.anio] || 0) + 1;
      const n = Number(doc.anio);
      if (Number.isFinite(n)) vals.push(n);
    }
  });
  vals.sort((a, b) => a - b);
  log(`\n"${origen}": ${filled}/${subset.length} filled`);
  log(`  types: ${JSON.stringify(types)}`);
  if (vals.length > 0) log(`  range: ${vals[0]} - ${vals[vals.length - 1]}`);
});

// 9. HP
log('\n=== HP BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const filled = subset.filter(d => d.hp !== null && d.hp !== undefined && d.hp !== '' && d.hp !== 'No especifica').length;
  const noEspec = subset.filter(d => d.hp === 'No especifica').length;
  const types = {};
  const vals = [];
  subset.forEach(doc => {
    if (doc.hp !== null && doc.hp !== undefined && doc.hp !== '' && doc.hp !== 'No especifica') {
      types[typeof doc.hp] = (types[typeof doc.hp] || 0) + 1;
      const n = Number(String(doc.hp).replace(',', '.'));
      if (Number.isFinite(n)) vals.push(n);
    }
  });
  vals.sort((a, b) => a - b);
  log(`\n"${origen}": ${filled}/${subset.length} filled (${noEspec} "No especifica")`);
  log(`  types: ${JSON.stringify(types)}`);
  if (vals.length > 0) log(`  range: ${vals[0]} - ${vals[vals.length - 1]}`);
});

// 10. Horas
log('\n=== HORAS BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const filled = subset.filter(d => d.horas !== null && d.horas !== undefined && d.horas !== '' && d.horas !== 'No especifica').length;
  const noEspec = subset.filter(d => d.horas === 'No especifica').length;
  log(`\n"${origen}": ${filled}/${subset.length} filled (${noEspec} "No especifica")`);
});

// 11. Condicion by origen
log('\n=== CONDICION BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const vals = {};
  subset.forEach(doc => {
    const c = doc.condicion || '(null)';
    vals[c] = (vals[c] || 0) + 1;
  });
  log(`\n"${origen}":`);
  Object.entries(vals).sort((a, b) => b[1] - a[1]).forEach(([val, count]) => log(`  "${val}": ${count}`));
});

// 12. Categoria distinct values (exact)
log('\n=== CATEGORIA DISTINCT VALUES ===');
const catVals = {};
docs.forEach(doc => {
  const c = (doc.categoria || '').toString().trim();
  if (c) catVals[c] = (catVals[c] || 0) + 1;
});
Object.entries(catVals).sort((a, b) => b[1] - a[1]).forEach(([val, count]) => log(`  "${val}": ${count}`));

// 13. Marca x Categoria top combos
log('\n=== TOP 30 MARCA x CATEGORIA ===');
const marcaCat = {};
docs.forEach(doc => {
  const key = `${(doc.marca || '?')} | ${(doc.categoria || '?')}`;
  marcaCat[key] = (marcaCat[key] || 0) + 1;
});
Object.entries(marcaCat).sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([key, count]) => log(`  ${key}: ${count}`));

// Write output
fs.writeFileSync(OUT_PATH, lines.join('\n'), 'utf8');
console.log(`Analysis written to ${OUT_PATH} (${lines.length} lines)`);
