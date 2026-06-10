const fs = require('fs');
const path = require('path');
const vm = require('vm');
const dns = require('dns').promises;

let cachedPipelineFunctions = null;

function loadEnvFile(envPath = path.join(__dirname, '..', '.env')) {
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) continue;

    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function loadPipelineFunctions() {
  if (cachedPipelineFunctions) return cachedPipelineFunctions;

  const pipelinePath = path.join(__dirname, 'pipeline.js');
  const pipelineSource = fs.readFileSync(pipelinePath, 'utf8');
  const mainIdx = pipelineSource.indexOf('async function main()');
  if (mainIdx < 0) {
    throw new Error('Could not find main() in pipeline.js');
  }

  const sharedCode = pipelineSource.substring(0, mainIdx);
  const moduleCode = sharedCode + `
module.exports = {
  normalizeCategoria,
  normalizeText,
  normalizeMatchText,
  normalizeBrandAndModel,
  normalizeModel,
  inferModelFromTitle,
  extractYearFromText,
  parseYear,
  parseHp,
  parseHoras,
  normalizePrice,
  FALLBACK_FX_RATE,
  extractPriceFromTitle,
  deriveLocation,
  normalizeCondicion,
  detectCompetitor,
  unifyVendedor,
  extractYearFromAgroadsDesc,
  parseFechaScraping,
  buildFlags,
  CURRENT_YEAR: new Date().getFullYear(),
};
`;

  const sandbox = {
    require,
    module: { exports: {} },
    exports: {},
    console,
    process,
    __dirname,
    Number,
    Math,
    Date,
    Set,
    Map,
    Array,
    String,
    RegExp,
    JSON,
    isNaN,
    parseInt,
    parseFloat,
  };

  vm.runInNewContext(moduleCode, sandbox);
  cachedPipelineFunctions = sandbox.module.exports;
  return cachedPipelineFunctions;
}

function normalizeMongoDoc(doc, P = loadPipelineFunctions()) {
  const origen = doc.origen || 'unknown';
  const categoria = P.normalizeCategoria(doc.categoria);
  if (!categoria) return null;

  const titulo = doc.titulo || null;
  const descripcion = doc.descripcion || null;

  let anioRaw = doc.anio;
  const extraFlags = [];
  let anio;
  if (origen === 'agroads' && (anioRaw === null || anioRaw === undefined || anioRaw === '')) {
    anio =
      P.extractYearFromAgroadsDesc(descripcion) ??
      P.extractYearFromText(titulo) ??
      P.extractYearFromText(descripcion);
    if (anio !== null) extraFlags.push('YEAR_EXTRACTED_FROM_TEXT');
  } else {
    anio = P.parseYear(anioRaw, titulo, descripcion);
  }

  const hpRaw = doc.hp;
  const hp = P.parseHp(hpRaw, titulo, descripcion);

  const horasRaw = doc.horas;
  const horas = P.parseHoras(horasRaw, titulo, descripcion);

  let precioRaw = doc.precio;
  let monedaRaw = doc.moneda;
  if (origen === 'ml') {
    const extracted = P.extractPriceFromTitle(titulo);
    if (extracted.precioRaw) precioRaw = extracted.precioRaw;
    if (extracted.monedaRaw) monedaRaw = extracted.monedaRaw;
  }

  const { precioUsd, precioArs, monedaNorm, priceFlags } = P.normalizePrice(
    precioRaw !== null && precioRaw !== undefined ? precioRaw.toString() : null,
    monedaRaw !== null && monedaRaw !== undefined ? monedaRaw.toString() : null,
    origen,
    P.FALLBACK_FX_RATE || 1500,
  );

  const { provincia, ciudad } = P.deriveLocation(doc.ubicacion, doc.localidad, doc.provincia);
  const { condicion, flags: condicionFlags } = P.normalizeCondicion(doc.condicion, origen, anio, horas);
  const vendedor = P.unifyVendedor(doc);
  const tipoVendedor = doc.usuario_tipo_empresa_nombre || null;
  const { esCompetidor, competidorNombre } = P.detectCompetitor(vendedor, origen);

  const marca = doc.marca || null;
  const { marcaNorm, modeloForNorm } = P.normalizeBrandAndModel(marca, doc.modelo);
  const modelo = doc.modelo || null;
  let modeloNorm = P.normalizeModel(modeloForNorm);

  if (modeloNorm && /^\d[\d ]*$/.test(modeloNorm) && titulo) {
    const titleInferred = P.inferModelFromTitle(titulo, marca, marcaNorm);
    if (titleInferred && /[A-Z]/.test(titleInferred)) {
      modeloNorm = titleInferred;
      extraFlags.push('MODEL_INFERRED_FROM_TITLE');
    }
  }

  if (!modeloNorm && titulo) {
    modeloNorm = P.inferModelFromTitle(titulo, marca, marcaNorm);
    if (modeloNorm) extraFlags.push('MODEL_INFERRED_FROM_TITLE');
  }

  const allExtraFlags = [...extraFlags, ...condicionFlags, ...(priceFlags || [])];
  const flags = P.buildFlags({ precioUsd, anio, hp, horas, provincia, condicion, extraFlags: allExtraFlags });
  const financiacion = doc.financiacion || doc.paymentMethod || doc.formas_de_pago || null;
  const fechaScraping = P.parseFechaScraping(doc.fecha_scraping);
  const url = (doc.url || '').toString().trim();
  if (!url) return null;

  return {
    origen,
    url,
    titulo,
    descripcion,
    categoriaRaw: doc.categoria || null,
    categoria,
    marca,
    marcaNorm,
    modelo,
    modeloNorm,
    anio,
    anioRaw: anioRaw !== null && anioRaw !== undefined ? anioRaw.toString() : null,
    hp: hp !== null ? hp : null,
    hpRaw: hpRaw !== null && hpRaw !== undefined ? hpRaw.toString() : null,
    horas: horas !== null ? horas : null,
    horasRaw: horasRaw !== null && horasRaw !== undefined ? horasRaw.toString() : null,
    condicionRaw: doc.condicion || null,
    condicion,
    precioRaw: precioRaw !== null && precioRaw !== undefined ? precioRaw.toString() : null,
    monedaRaw: monedaRaw !== null && monedaRaw !== undefined ? monedaRaw.toString() : null,
    monedaNorm,
    precioUsd: precioUsd !== null ? Math.round(precioUsd * 100) / 100 : null,
    precioArs: precioArs !== null ? Math.round(precioArs * 100) / 100 : null,
    ubicacionRaw: doc.ubicacion || doc.localidad || null,
    provincia,
    ciudad,
    vendedor,
    tipoVendedor,
    esCompetidor,
    competidorNombre,
    iva: doc.iva || null,
    financiacion: financiacion ? financiacion.toString().substring(0, 2000) : null,
    fechaScraping,
    fechaPublicacion: doc.fecha_publicacion || null,
    flags,
  };
}

function createProcessingStats() {
  return {
    byCategoria: {},
    byOrigen: {},
    priceOk: 0,
    priceNull: 0,
    yearOk: 0,
    yearNull: 0,
    hpOk: 0,
    hpNull: 0,
    competitors: 0,
  };
}

function addRecordToStats(stats, record) {
  stats.byCategoria[record.categoria] = (stats.byCategoria[record.categoria] || 0) + 1;
  stats.byOrigen[record.origen] = (stats.byOrigen[record.origen] || 0) + 1;
  if (record.precioUsd !== null) stats.priceOk++;
  else stats.priceNull++;
  if (record.anio !== null) stats.yearOk++;
  else stats.yearNull++;
  if (record.hp !== null) stats.hpOk++;
  else stats.hpNull++;
  if (record.esCompetidor) stats.competitors++;
}

function parseDateDDMMYYYY(value) {
  if (!value) return null;
  const match = value.toString().trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;

  const [, dd, mm, yyyy] = match;
  const date = new Date(Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateDDMMYYYY(date) {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = date.getUTCFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function toDateOnlyUTC(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function toDateKey(date) {
  return toDateOnlyUTC(date).toISOString().slice(0, 10);
}

function pickLatestByDate(items, getDate) {
  let latest = null;
  for (const item of items) {
    const date = getDate(item);
    if (!date) continue;
    if (!latest || date > latest.date) {
      latest = { item, date };
    }
  }
  return latest;
}

async function resolveMongoUri(uri) {
  if (!uri || !uri.startsWith('mongodb+srv://')) return uri;

  try {
    const parsed = new URL(uri.replace('mongodb+srv://', 'http://'));
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8', '1.1.1.1']);
    const records = await resolver.resolveSrv(`_mongodb._tcp.${parsed.hostname}`);
    if (!records.length) return uri;

    const hosts = records
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((record) => `${record.name}:${record.port}`)
      .join(',');
    const params = new URLSearchParams(parsed.searchParams);
    params.set('tls', 'true');
    if (!params.has('authSource')) params.set('authSource', 'admin');

    return `mongodb://${parsed.username}:${parsed.password}@${hosts}${parsed.pathname}?${params.toString()}`;
  } catch {
    return uri;
  }
}

module.exports = {
  loadEnvFile,
  loadPipelineFunctions,
  resolveMongoUri,
  normalizeMongoDoc,
  createProcessingStats,
  addRecordToStats,
  parseDateDDMMYYYY,
  formatDateDDMMYYYY,
  toDateOnlyUTC,
  toDateKey,
  pickLatestByDate,
};
