const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const DOCX_PATH = path.join(__dirname, '..', 'POC.docx');
const OUT_PATH = path.join(__dirname, '..', 'data', 'poc_content.txt');

async function main() {
  const result = await mammoth.extractRawText({ path: DOCX_PATH });
  fs.writeFileSync(OUT_PATH, result.value, 'utf8');
  console.log(`Written ${result.value.length} chars to ${OUT_PATH}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
