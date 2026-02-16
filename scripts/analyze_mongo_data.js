const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'mongo_export.json');
const docs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

console.log('=== TOTAL DOCUMENTS ===');
console.log('Count:', docs.length);

// 1. All field names and their frequency
console.log('\n=== FIELD FREQUENCY (across all docs) ===');
const fieldCount = {};
docs.forEach(doc => {
  Object.keys(doc).forEach(key => {
    fieldCount[key] = (fieldCount[key] || 0) + 1;
  });
});
Object.entries(fieldCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const pct = ((count / docs.length) * 100).toFixed(1);
    console.log(`  ${key}: ${count} (${pct}%)`);
  });

// 2. Distinct values for categorical fields
console.log('\n=== DISTINCT VALUES (categorical) ===');
const categoricals = ['origen', 'categoria', 'condicion', 'moneda', 'clasificado_condicion_principal', 'iva'];
categoricals.forEach(field => {
  const values = {};
  let nullCount = 0;
  docs.forEach(doc => {
    const val = doc[field];
    if (val === null || val === undefined || val === '') {
      nullCount++;
    } else {
      const key = String(val).trim();
      values[key] = (values[key] || 0) + 1;
    }
  });
  const sorted = Object.entries(values).sort((a, b) => b[1] - a[1]);
  console.log(`\n"${field}" (${sorted.length} distinct, ${nullCount} null/empty):`);
  sorted.forEach(([val, count]) => {
    console.log(`  "${val}": ${count}`);
  });
});

// 3. Cross-tab: origen x categoria
console.log('\n=== CROSS-TAB: origen x categoria ===');
const crossTab = {};
docs.forEach(doc => {
  const origen = doc.origen || '(null)';
  const cat = doc.categoria || '(null)';
  const key = `${origen} | ${cat}`;
  crossTab[key] = (crossTab[key] || 0) + 1;
});
Object.entries(crossTab)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    console.log(`  ${key}: ${count}`);
  });

// 4. Price analysis
console.log('\n=== PRICE ANALYSIS ===');
const priceByOrigen = {};
docs.forEach(doc => {
  const origen = doc.origen || '(null)';
  if (!priceByOrigen[origen]) priceByOrigen[origen] = { total: 0, numeric: 0, string: 0, null: 0, samples: [] };
  priceByOrigen[origen].total++;
  const p = doc.precio;
  if (p === null || p === undefined || p === '') {
    priceByOrigen[origen].null++;
  } else if (typeof p === 'number') {
    priceByOrigen[origen].numeric++;
    if (priceByOrigen[origen].samples.length < 5) priceByOrigen[origen].samples.push(p);
  } else {
    priceByOrigen[origen].string++;
    if (priceByOrigen[origen].samples.length < 5) priceByOrigen[origen].samples.push(p);
  }
});
Object.entries(priceByOrigen).forEach(([origen, stats]) => {
  console.log(`\n"${origen}" (${stats.total} docs):`);
  console.log(`  numeric: ${stats.numeric}, string: ${stats.string}, null: ${stats.null}`);
  console.log(`  samples: ${JSON.stringify(stats.samples)}`);
});

// 5. Moneda analysis
console.log('\n=== MONEDA ANALYSIS ===');
const monedaByOrigen = {};
docs.forEach(doc => {
  const origen = doc.origen || '(null)';
  const moneda = doc.moneda || '(null)';
  const key = `${origen} | ${moneda}`;
  monedaByOrigen[key] = (monedaByOrigen[key] || 0) + 1;
});
Object.entries(monedaByOrigen)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    console.log(`  ${key}: ${count}`);
  });

// 6. Location fields analysis
console.log('\n=== LOCATION FIELDS BY ORIGEN ===');
const locFields = ['ubicacion', 'localidad', 'provincia'];
const origenList = [...new Set(docs.map(d => d.origen || '(null)'))];
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  console.log(`\n"${origen}" (${subset.length} docs):`);
  locFields.forEach(field => {
    const filled = subset.filter(d => d[field] && String(d[field]).trim()).length;
    const pct = ((filled / subset.length) * 100).toFixed(1);
    const samples = subset.filter(d => d[field] && String(d[field]).trim()).slice(0, 3).map(d => d[field]);
    console.log(`  ${field}: ${filled} (${pct}%) | samples: ${JSON.stringify(samples)}`);
  });
});

// 7. Seller/vendor fields analysis
console.log('\n=== SELLER FIELDS BY ORIGEN ===');
const sellerFields = ['seller_name', 'vendedor', 'usuario_tipo_empresa_nombre'];
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  console.log(`\n"${origen}" (${subset.length} docs):`);
  sellerFields.forEach(field => {
    const filled = subset.filter(d => d[field] && String(d[field]).trim()).length;
    if (filled > 0) {
      const pct = ((filled / subset.length) * 100).toFixed(1);
      const samples = [...new Set(subset.filter(d => d[field]).map(d => d[field]))].slice(0, 5);
      console.log(`  ${field}: ${filled} (${pct}%) | samples: ${JSON.stringify(samples)}`);
    }
  });
});

// 8. Year (anio) analysis
console.log('\n=== YEAR (anio) ANALYSIS ===');
const yearByOrigen = {};
docs.forEach(doc => {
  const origen = doc.origen || '(null)';
  if (!yearByOrigen[origen]) yearByOrigen[origen] = { total: 0, filled: 0, types: {}, samples: [] };
  yearByOrigen[origen].total++;
  const a = doc.anio;
  if (a !== null && a !== undefined && a !== '') {
    yearByOrigen[origen].filled++;
    const t = typeof a;
    yearByOrigen[origen].types[t] = (yearByOrigen[origen].types[t] || 0) + 1;
    if (yearByOrigen[origen].samples.length < 5) yearByOrigen[origen].samples.push(a);
  }
});
Object.entries(yearByOrigen).forEach(([origen, stats]) => {
  console.log(`\n"${origen}" (${stats.total} docs, ${stats.filled} with year):`);
  console.log(`  types: ${JSON.stringify(stats.types)}`);
  console.log(`  samples: ${JSON.stringify(stats.samples)}`);
});

// 9. HP analysis
console.log('\n=== HP ANALYSIS ===');
const hpByOrigen = {};
docs.forEach(doc => {
  const origen = doc.origen || '(null)';
  if (!hpByOrigen[origen]) hpByOrigen[origen] = { total: 0, filled: 0, types: {}, samples: [] };
  hpByOrigen[origen].total++;
  const h = doc.hp;
  if (h !== null && h !== undefined && h !== '') {
    hpByOrigen[origen].filled++;
    const t = typeof h;
    hpByOrigen[origen].types[t] = (hpByOrigen[origen].types[t] || 0) + 1;
    if (hpByOrigen[origen].samples.length < 5) hpByOrigen[origen].samples.push(h);
  }
});
Object.entries(hpByOrigen).forEach(([origen, stats]) => {
  console.log(`\n"${origen}" (${stats.total} docs, ${stats.filled} with hp):`);
  console.log(`  types: ${JSON.stringify(stats.types)}`);
  console.log(`  samples: ${JSON.stringify(stats.samples)}`);
});

// 10. Horas analysis
console.log('\n=== HORAS ANALYSIS ===');
const horasByOrigen = {};
docs.forEach(doc => {
  const origen = doc.origen || '(null)';
  if (!horasByOrigen[origen]) horasByOrigen[origen] = { total: 0, filled: 0, types: {}, samples: [] };
  horasByOrigen[origen].total++;
  const h = doc.horas;
  if (h !== null && h !== undefined && h !== '') {
    horasByOrigen[origen].filled++;
    const t = typeof h;
    horasByOrigen[origen].types[t] = (horasByOrigen[origen].types[t] || 0) + 1;
    if (horasByOrigen[origen].samples.length < 5) horasByOrigen[origen].samples.push(h);
  }
});
Object.entries(horasByOrigen).forEach(([origen, stats]) => {
  console.log(`\n"${origen}" (${stats.total} docs, ${stats.filled} with horas):`);
  console.log(`  types: ${JSON.stringify(stats.types)}`);
  console.log(`  samples: ${JSON.stringify(stats.samples)}`);
});

// 11. Marca analysis (top 20)
console.log('\n=== TOP 20 MARCAS ===');
const marcas = {};
docs.forEach(doc => {
  const m = (doc.marca || '').toString().trim();
  if (m) marcas[m] = (marcas[m] || 0) + 1;
});
Object.entries(marcas)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([marca, count]) => {
    console.log(`  "${marca}": ${count}`);
  });

// 12. Modelo analysis - nulls and samples per origen
console.log('\n=== MODELO BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const filled = subset.filter(d => d.modelo && String(d.modelo).trim()).length;
  const pct = ((filled / subset.length) * 100).toFixed(1);
  const samples = [...new Set(subset.filter(d => d.modelo).map(d => d.modelo))].slice(0, 5);
  console.log(`  "${origen}": ${filled}/${subset.length} (${pct}%) | samples: ${JSON.stringify(samples)}`);
});

// 13. Fields unique to specific origins
console.log('\n=== ORIGIN-SPECIFIC FIELDS ===');
const fieldsByOrigen = {};
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const fields = new Set();
  subset.forEach(doc => Object.keys(doc).forEach(k => fields.add(k)));
  fieldsByOrigen[origen] = [...fields].sort();
});
const commonFields = new Set(Object.keys(fieldCount).filter(k => fieldCount[k] > docs.length * 0.5));
origenList.forEach(origen => {
  const unique = fieldsByOrigen[origen].filter(f => !commonFields.has(f));
  if (unique.length > 0) {
    console.log(`\n"${origen}" specific fields: ${unique.join(', ')}`);
  }
});

// 14. Condicion analysis per origen
console.log('\n=== CONDICION BY ORIGEN ===');
origenList.forEach(origen => {
  const subset = docs.filter(d => (d.origen || '(null)') === origen);
  const condValues = {};
  subset.forEach(doc => {
    const c = doc.condicion || doc.clasificado_condicion_principal || '(null)';
    condValues[c] = (condValues[c] || 0) + 1;
  });
  console.log(`\n"${origen}":`);
  Object.entries(condValues).sort((a, b) => b[1] - a[1]).forEach(([val, count]) => {
    console.log(`  "${val}": ${count}`);
  });
});

// 15. Sample full documents per origen (1 each)
console.log('\n=== SAMPLE DOCUMENT PER ORIGEN ===');
origenList.forEach(origen => {
  const doc = docs.find(d => (d.origen || '(null)') === origen);
  if (doc) {
    console.log(`\n--- ${origen} ---`);
    console.log(JSON.stringify(doc, null, 2));
  }
});
