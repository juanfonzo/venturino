const fs = require('fs');
const path = require('path');

const SAMPLE_PATH = path.join(__dirname, '..', 'data', 'mongo_export.json');
const docs = JSON.parse(fs.readFileSync(SAMPLE_PATH, 'utf8'));

// Get samples from each origen for specific categories
const origenes = ['agroads', 'agrofy', 'ml', 'rastroagro', 'machinefinder'];
const cats = ['tractores', 'tractor', 'Tractores'];

origenes.forEach(origen => {
  const subset = docs.filter(d => d.origen === origen && cats.includes((d.categoria || '').toLowerCase()));
  console.log(`\n=== ${origen} (${subset.length} tractors) — 2 samples ===`);
  subset.slice(0, 2).forEach((doc, i) => {
    console.log(`\n--- Sample ${i + 1} ---`);
    console.log(JSON.stringify(doc, null, 2));
  });
});

// Check agroads year extraction potential
console.log('\n\n=== AGROADS YEAR EXTRACTION TEST ===');
const agroadsTractors = docs.filter(d => d.origen === 'agroads' && cats.includes((d.categoria || '').toLowerCase()));
let yearInDesc = 0, yearInTitle = 0, noYear = 0;
agroadsTractors.forEach(doc => {
  const descMatch = (doc.descripcion || '').match(/\ba[ñn]o\s*:?\s*(19\d{2}|20\d{2})\b/i);
  const titleMatch = (doc.titulo || '').match(/\b(19\d{2}|20\d{2})\b/);
  if (descMatch) yearInDesc++;
  else if (titleMatch) yearInTitle++;
  else noYear++;
});
console.log(`Total agroads tractors: ${agroadsTractors.length}`);
console.log(`Year in description: ${yearInDesc}`);
console.log(`Year in title (fallback): ${yearInTitle}`);
console.log(`No year found: ${noYear}`);

// Check ML price extraction
console.log('\n\n=== ML PRICE FROM TITLE TEST ===');
const mlDocs = docs.filter(d => d.origen === 'ml').slice(0, 5);
mlDocs.forEach(doc => {
  const re = /(US\$|U\$S|U\$|USD|\$)\s*([0-9][0-9.,]*)/gi;
  const matches = [...(doc.titulo || '').matchAll(re)];
  const last = matches.length > 0 ? matches[matches.length - 1] : null;
  console.log(`\nTitle: "${(doc.titulo || '').substring(0, 100)}"`);
  console.log(`  Original: precio=${doc.precio}, moneda=${doc.moneda}`);
  console.log(`  From title: ${last ? `${last[1]} ${last[2]}` : 'none'}`);
});
