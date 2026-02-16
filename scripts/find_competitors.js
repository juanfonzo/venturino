const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'mongo_export.json');
const docs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

const competitors = [
  'semtraco',
  'criolani',
  'grosso',
  'agronorte',
  'boglich',
  'diesel lange',
  'conci',
  'venturino'
];

const lines = [];
function log(msg = '') { lines.push(msg); console.log(msg); }

// Search in vendedor, seller_name, and origen fields
const searchFields = ['vendedor', 'seller_name', 'origen', 'url'];

competitors.forEach(comp => {
  log(`\n=== Searching for "${comp}" ===`);
  const matches = [];
  
  docs.forEach(doc => {
    for (const field of searchFields) {
      const val = doc[field];
      if (val && String(val).toLowerCase().includes(comp)) {
        matches.push({
          origen: doc.origen,
          field,
          value: String(val).substring(0, 80),
          categoria: doc.categoria,
          condicion: doc.condicion || '(null)'
        });
        break; // don't double-count same doc
      }
    }
  });
  
  log(`  Total matches: ${matches.length}`);
  
  if (matches.length > 0) {
    // Group by origen
    const byOrigen = {};
    matches.forEach(m => {
      byOrigen[m.origen] = (byOrigen[m.origen] || 0) + 1;
    });
    log(`  By origen: ${JSON.stringify(byOrigen)}`);
    
    // Group by field matched
    const byField = {};
    matches.forEach(m => {
      byField[m.field] = (byField[m.field] || 0) + 1;
    });
    log(`  By field: ${JSON.stringify(byField)}`);
    
    // Group by categoria
    const byCat = {};
    matches.forEach(m => {
      const cat = m.categoria || '(null)';
      byCat[cat] = (byCat[cat] || 0) + 1;
    });
    log(`  By categoria: ${JSON.stringify(byCat)}`);
    
    // Show sample values
    const uniqueVals = [...new Set(matches.map(m => `${m.field}="${m.value}"`))].slice(0, 5);
    log(`  Sample values: ${uniqueVals.join(' | ')}`);
  }
});

// Also check: what are the top vendedores in agroads?
log('\n=== TOP 30 VENDEDORES IN AGROADS ===');
const agrVendedores = {};
docs.filter(d => d.origen === 'agroads').forEach(doc => {
  const v = doc.vendedor || '(null)';
  agrVendedores[v] = (agrVendedores[v] || 0) + 1;
});
Object.entries(agrVendedores).sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([v, c]) => {
  log(`  "${v}": ${c}`);
});

// Top vendedores in agrofy
log('\n=== TOP 20 VENDEDORES IN AGROFY ===');
const afyVendedores = {};
docs.filter(d => d.origen === 'agrofy').forEach(doc => {
  const v = doc.vendedor || '(null)';
  afyVendedores[v] = (afyVendedores[v] || 0) + 1;
});
Object.entries(afyVendedores).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([v, c]) => {
  log(`  "${v}": ${c}`);
});

// Top seller_name in ML
log('\n=== TOP 20 SELLER_NAME IN ML ===');
const mlSellers = {};
docs.filter(d => d.origen === 'ml').forEach(doc => {
  const v = doc.seller_name || '(null)';
  mlSellers[v] = (mlSellers[v] || 0) + 1;
});
Object.entries(mlSellers).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([v, c]) => {
  log(`  "${v}": ${c}`);
});
