/**
 * Re-investigate the target models AFTER pipeline v3 fixes.
 * Compare how modeloNorm changed and count expected matches.
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const TARGET_MODELS = [
  { brand: 'JOHN DEERE', model: '7230R', ventModelo: '7230r' },
  { brand: 'CASE IH', model: 'PUMA225', ventModelo: 'Puma 225' },
  { brand: 'JOHN DEERE', model: '6100D', ventModelo: '6100d' },
  { brand: 'JOHN DEERE', model: '5065ES', ventModelo: '5065ES' },
  { brand: 'JOHN DEERE', model: '7210J', ventModelo: '7210J' },
  { brand: 'JOHN DEERE', model: '5045DS', ventModelo: '5045Ds' },
  { brand: 'CASE IH', model: 'MXM150', ventModelo: 'MXM150' },
  { brand: 'CASE IH', model: 'CIH MAGNUM315', ventModelo: 'CIH MAGNUM 315' },
  { brand: 'NEW HOLLAND', model: 'T8 295', ventModelo: 'T8 295' },
];

// Reproduce the Venturino normalizeModelCore logic to see what the model becomes
function normalizeMatchText(value) {
  if (!value) return null;
  return value.toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]+/gi, ' ')
    .replace(/\s+/g, ' ').trim().toUpperCase();
}

const MODEL_SUFFIX_TOKENS = new Set([
  '4WD','4X4','4X2','2WD','DT','DUAL','DOBLE','SIMPLE','TRACCION',
  'ROD','RD','CAB','CABINA','CABINADO','PLUS','FULL','PREMIUM',
  'POWER','MOD','MODELO','ANO','HP',
]);
const MODEL_STRIP_PREFIXES = new Set(['CIH', 'CASEIH', 'JHON', 'DEERE']);
const MODEL_SYNONYMS = { 'MXM': 'MAXXUM', 'MAXXUM': 'MAXXUM' };

function normalizeModelCore(value) {
  const match = normalizeMatchText(value);
  if (!match) return null;
  let tokens = match.split(' ').filter(t => t.length > 0);
  while (tokens.length > 1 && MODEL_STRIP_PREFIXES.has(tokens[0])) tokens.shift();
  const filtered = tokens.filter(token => {
    if (MODEL_SUFFIX_TOKENS.has(token)) return false;
    if (/^\d{2,3}HP$/.test(token)) return false;
    return true;
  });
  while (filtered.length > 1) {
    const last = filtered[filtered.length - 1];
    if (/^\d{2,3}$/.test(last)) {
      const hasModelNum = filtered.slice(0, -1).some(t => /\d/.test(t));
      if (hasModelNum) { filtered.pop(); continue; }
    }
    break;
  }
  if (filtered.length > 0 && MODEL_SYNONYMS[filtered[0]]) filtered[0] = MODEL_SYNONYMS[filtered[0]];
  const joined = filtered.join(' ');
  if (!joined) return null;
  return joined.replace(/\b([A-Z]+)\s+(\d+)\b/g, '$1$2')
    .replace(/\b(\d+)\s+([A-Z]+)\b/g, '$1$2')
    .replace(/\s+/g, ' ').trim() || null;
}

// Suffix variant check (same as analisis1.ts)
function extractNumericCore(token) {
  const match = token.match(/^([A-Z]*)(\d+)([A-Z]*)$/);
  if (!match) return null;
  return { prefix: match[1], digits: match[2], suffix: match[3] };
}
function isSuffixVariant(a, b) {
  const ap = extractNumericCore(a), bp = extractNumericCore(b);
  if (!ap || !bp) return false;
  if (ap.digits !== bp.digits) return false;
  if (ap.prefix === bp.prefix) return true;
  if (ap.prefix.includes(bp.prefix) || bp.prefix.includes(ap.prefix)) return true;
  return false;
}

async function main() {
  const lines = [];
  function log(msg = '') { lines.push(msg); console.log(msg); }

  log('=== POST-FIX INVESTIGATION: Model matching improvements ===\n');

  for (const target of TARGET_MODELS) {
    log(`\n${'='.repeat(70)}`);
    
    // What Venturino's model normalizes to NOW
    const ventModelNormNew = normalizeModelCore(target.ventModelo);
    log(`TARGET: ${target.brand} | raw="${target.ventModelo}" → modeloNorm="${ventModelNormNew}"`);
    log(`${'='.repeat(70)}`);

    // Exact match in PostgreSQL
    const pgExact = await prisma.listing.count({
      where: { marcaNorm: target.brand, modeloNorm: ventModelNormNew },
    });
    log(`  EXACT match (marcaNorm="${target.brand}", modeloNorm="${ventModelNormNew}"): ${pgExact}`);

    // Contains match
    const mainToken = ventModelNormNew ? ventModelNormNew.match(/\d+/)?.[0] : null;
    if (mainToken) {
      const pgContains = await prisma.listing.findMany({
        where: {
          marcaNorm: target.brand,
          modeloNorm: { contains: mainToken, mode: 'insensitive' },
        },
        select: { modeloNorm: true },
      });
      
      const byModel = {};
      pgContains.forEach(r => {
        const key = r.modeloNorm || '(null)';
        byModel[key] = (byModel[key] || 0) + 1;
      });
      
      log(`  CONTAINS "${mainToken}" (brand=${target.brand}): ${pgContains.length} total`);
      Object.entries(byModel).sort((a, b) => b[1] - a[1]).forEach(([model, count]) => {
        // Check if this would match via fuzzy (includes or suffix-variant)
        const wouldMatch = ventModelNormNew && (
          model.includes(ventModelNormNew) || 
          ventModelNormNew.includes(model) ||
          isSuffixVariant(ventModelNormNew, model)
        );
        const marker = model === ventModelNormNew ? ' ✓ EXACT' : wouldMatch ? ' ✓ FUZZY' : '';
        log(`    "${model}": ${count}${marker}`);
      });
    }

    // Count total potential matches (exact + fuzzy via includes + suffix-variant)
    if (ventModelNormNew) {
      const allBrandListings = await prisma.listing.findMany({
        where: { marcaNorm: target.brand, modeloNorm: { not: null } },
        select: { modeloNorm: true },
      });
      
      let fuzzyCount = 0;
      const fuzzyModels = new Set();
      allBrandListings.forEach(r => {
        const mn = r.modeloNorm;
        if (!mn) return;
        if (mn === ventModelNormNew) { fuzzyCount++; fuzzyModels.add(mn); return; }
        if (mn.includes(ventModelNormNew) || ventModelNormNew.includes(mn)) { fuzzyCount++; fuzzyModels.add(mn); return; }
        // Token-level suffix variant
        const vTokens = ventModelNormNew.split(' ').filter(t => /\d/.test(t));
        const cTokens = mn.split(' ').filter(t => /\d/.test(t));
        if (vTokens.length === 1 && cTokens.length >= 1) {
          for (const ct of cTokens) {
            if (isSuffixVariant(vTokens[0], ct)) { fuzzyCount++; fuzzyModels.add(mn); return; }
          }
        }
      });
      
      log(`\n  TOTAL potential matches (exact+fuzzy+suffix-variant): ${fuzzyCount}`);
      if (fuzzyModels.size > 0) {
        log(`  Matching modeloNorm variants: ${[...fuzzyModels].join(', ')}`);
      }
    }
  }

  const outPath = path.join(__dirname, '..', 'data', 'match_investigation_v2.txt');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  log(`\nOutput written to ${outPath}`);
  
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
