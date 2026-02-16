const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const uri = process.env.MONGODB_URI;
if (!uri) { console.error('MONGODB_URI no definida en .env'); process.exit(1); }
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'mongo_export.json');

async function main() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('Connected!');

  const col = mongoose.connection.db.collection('venturino');

  const count = await col.countDocuments();
  console.log(`Total documents: ${count}`);

  // Fetch ALL documents (including origen=venturino for e-commerce data)
  console.log('Fetching all documents...');
  const docs = await col.find({}).toArray();
  console.log(`Fetched ${docs.length} documents.`);

  // Show breakdown by origen
  const byOrigen = {};
  docs.forEach(d => { const o = d.origen || '(null)'; byOrigen[o] = (byOrigen[o] || 0) + 1; });
  console.log('By origen:', JSON.stringify(byOrigen));

  // Convert ObjectId to string for JSON serialization
  const serialized = docs.map(doc => {
    const obj = { ...doc };
    if (obj._id) obj._id = obj._id.toString();
    return obj;
  });

  console.log(`Writing to ${OUTPUT_PATH}...`);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(serialized, null, 2), 'utf8');
  console.log('Done! File size:', (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2), 'MB');

  await mongoose.disconnect();
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
