/**
 * Reporte PDF "Venturino vs Mercado" (Ricardo Venturino S.A.).
 *
 * Uso:
 *   node scripts/generateVenturinoReport.js
 *   node scripts/generateVenturinoReport.js --categoria=Tractores
 *   node scripts/generateVenturinoReport.js --out=reports/custom.pdf
 *   node scripts/generateVenturinoReport.js --solo-activos
 *
 * Reglas del cliente:
 *  - Matching: misma lógica que "Análisis 1" de la app (sin filtro de horas).
 *  - Referencia de mercado: MEDIANA en USD.
 *  - Confianza:
 *      Alta   : >3 comparables dentro de ±2 años.
 *      Media  : <=3 cercanos, o hubo que ampliar la búsqueda más allá de ±2 años para llegar a >3.
 *      Baja   : aun ampliando la búsqueda hay 3 o menos comparables.
 *  - Semáforo:
 *      Rojo   : Venturino >10% por encima de la referencia (sólo si confianza ≠ Baja).
 *      Amarillo "Sobreprecio (baja conf.)" : igual condición pero con confianza Baja.
 *      Amarillo "Oportunidad · bajo precio": Venturino >10% por debajo.
 *      Amarillo "Observar" : diferencia entre 5% y 10%.
 *      Verde  : diferencia ≤ 5%.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const React = require('react');
const { PrismaClient } = require('@prisma/client');
const {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToFile,
} = require('@react-pdf/renderer');

// ─── Config ─────────────────────────────────────────────────────
const YEAR_WINDOW = 2;
const N_HIGH = 3;
const ALERT_PCT = 0.10;
const WARN_PCT = 0.05;
const FUZZY_LEVEL = 1;
const MAX_EQUIVALENTS = 50;
const CATEGORIES_ORDER = ['Tractores', 'Cosechadoras', 'Sembradoras', 'Pulverizadoras'];

const COLORS = {
  green: '#367C2B',
  yellow: '#FFDE00',
  dark: '#1F4D1A',
  black: '#1A1A1A',
  cream: '#F4F1E8',
  white: '#FFFFFF',
  redAlert: '#B02A2A',
  amberWarn: '#C98A00',
  greenOk: '#2F7A28',
  grayMuted: '#6B6B6B',
  grayBorder: '#E2E0D8',
  zebra: '#FAF8F1',
};

// ─── Args ───────────────────────────────────────────────────────
function parseArgs() {
  const out = { categoria: null, outPath: null, soloActivos: false };
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--categoria=')) out.categoria = arg.slice('--categoria='.length);
    else if (arg.startsWith('--out=')) out.outPath = arg.slice('--out='.length);
    else if (arg === '--solo-activos') out.soloActivos = true;
  });
  return out;
}

// ─── Matching helpers (replica de lib/analysis/analisis1.ts) ───
function extractTokens(value) {
  return String(value).split(' ').map((t) => t.trim()).filter((t) => t.length > 0);
}
function isDigitsOnly(v) {
  return /^\d+$/.test(v);
}
function extractNumericCore(token) {
  const m = String(token).match(/^([A-Z]*)(\d+)([A-Z]*)$/);
  if (!m) return null;
  return { prefix: m[1], digits: m[2], suffix: m[3] };
}
function isSuffixVariant(a, b) {
  const ap = extractNumericCore(a);
  const bp = extractNumericCore(b);
  if (!ap || !bp) return false;
  if (ap.digits !== bp.digits) return false;
  if (ap.prefix === bp.prefix) return true;
  if (ap.prefix.includes(bp.prefix) || bp.prefix.includes(ap.prefix)) return true;
  return false;
}
function fuzzyModelMatch(vModel, cModel, level) {
  if (level <= 0) return false;
  if (vModel === cModel) return true;
  if (cModel.includes(vModel) || vModel.includes(cModel)) return true;

  const vTokens = extractTokens(vModel);
  const cArr = extractTokens(cModel);
  const cTokens = new Set(cArr);
  if (!vTokens.length || !cTokens.size) return false;

  const vAlpha = vTokens.filter((t) => /\d/.test(t));
  const cAlpha = cArr.filter((t) => /\d/.test(t));
  if (vAlpha.length === 1 && cAlpha.length >= 1) {
    for (const ct of cAlpha) if (isSuffixVariant(vAlpha[0], ct)) return true;
  }

  if (vTokens.length === 1 && isDigitsOnly(vTokens[0])) {
    return cTokens.has(vTokens[0]);
  }

  if (level === 1) return vTokens.every((t) => cTokens.has(t));

  const digits = vTokens.filter((t) => isDigitsOnly(t));
  if (digits.length > 0 && !digits.every((d) => cTokens.has(d))) return false;

  const common = vTokens.reduce((acc, t) => acc + (cTokens.has(t) ? 1 : 0), 0);
  const ratio = vTokens.length ? common / vTokens.length : 0;
  const threshold = level >= 3 ? 0.4 : 0.6;
  return ratio >= threshold;
}
function buildKey(item) {
  if (!item.marca_norm || !item.modelo_norm) return null;
  return `${item.marca_norm}|${item.modelo_norm}`;
}
function normalizeEmpresa(v) {
  return (v ?? '').toString().trim().toUpperCase();
}
function isSelfCompany(v) {
  return normalizeEmpresa(v).includes('VENTURINO');
}
const MARKETPLACE_ORIGINS = new Set(['rastroagro']);
function isMarketplaceRow(row) {
  const origen = (row.origen ?? '').toString().trim().toLowerCase();
  if (!MARKETPLACE_ORIGINS.has(origen)) return false;
  const empresa = (row.empresa ?? '').toString().trim().toLowerCase();
  return !empresa || empresa === origen;
}

function toItem(row) {
  return {
    id: String(row.id),
    url: row.url,
    titulo: row.titulo,
    origen: row.origen,
    categoria: row.categoria,
    empresa: row.vendedor ?? null,
    marca: row.marca,
    modelo: row.modelo,
    marca_norm: row.marcaNorm,
    modelo_norm: row.modeloNorm,
    anio: row.anio,
    horas_uso: row.horas != null ? Number(row.horas) : null,
    hp_motor: row.hp != null ? Number(row.hp) : null,
    provincia: row.provincia,
    precio_nor: row.precioUsd != null ? Number(row.precioUsd) : null,
    active: row.active,
  };
}

function indexCompetitors(competitors) {
  const byKey = new Map();
  const byBrand = new Map();
  for (const row of competitors) {
    const key = buildKey(row);
    if (!key) continue;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(row);
    const brand = row.marca_norm;
    if (!brand) continue;
    if (!byBrand.has(brand)) byBrand.set(brand, []);
    byBrand.get(brand).push(row);
  }
  return { byKey, byBrand };
}

function buildCandidatePool(v, byKey, byBrand) {
  const key = buildKey(v);
  const exact = key ? byKey.get(key) ?? [] : [];
  const candidates = [...exact];
  const seen = new Set(candidates.map((c) => c.id));
  if (v.marca_norm && v.modelo_norm) {
    const brandCands = byBrand.get(v.marca_norm) ?? [];
    for (const c of brandCands) {
      if (!c.modelo_norm) continue;
      if (seen.has(c.id)) continue;
      if (fuzzyModelMatch(v.modelo_norm, c.modelo_norm, FUZZY_LEVEL)) {
        candidates.push(c);
        seen.add(c.id);
      }
    }
  }
  return candidates;
}

function decideConfidence(coreSet, farSet) {
  const nCore = coreSet.length;
  const nFar = farSet.length;
  const nAll = nCore + nFar;
  if (nCore > N_HIGH) return { level: 'Alta', refSet: coreSet, expanded: false };
  if (nCore > 0 && nFar === 0) return { level: 'Media', refSet: coreSet, expanded: false };
  if (nAll > N_HIGH) return { level: 'Media', refSet: [...coreSet, ...farSet], expanded: true };
  if (nAll > 0) return { level: 'Baja', refSet: [...coreSet, ...farSet], expanded: nFar > 0 };
  return { level: null, refSet: [], expanded: false };
}

function classify(delta, confidence) {
  if (delta == null) return { label: 'Sin dato', color: COLORS.grayMuted, tone: 'muted' };
  if (delta > ALERT_PCT) {
    if (confidence === 'Baja') {
      return { label: 'Revisar (pocos datos)', color: COLORS.amberWarn, tone: 'warn' };
    }
    return { label: 'Caro · alerta', color: COLORS.redAlert, tone: 'red' };
  }
  if (delta < -ALERT_PCT) {
    return { label: 'Barato · oportunidad', color: COLORS.amberWarn, tone: 'warn' };
  }
  if (Math.abs(delta) > WARN_PCT) {
    return { label: 'Observar', color: COLORS.amberWarn, tone: 'warn' };
  }
  return { label: 'En línea', color: COLORS.greenOk, tone: 'green' };
}

function calcMedian(values) {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function buildCategoryReport(venturinoItems, competitorItems) {
  const { byKey, byBrand } = indexCompetitors(competitorItems);

  const rows = venturinoItems.map((v) => {
    const pool = buildCandidatePool(v, byKey, byBrand);
    const hasYear = Number.isFinite(v.anio);
    const core = [];
    const far = [];
    for (const c of pool) {
      if (!Number.isFinite(c.anio)) continue;
      if (hasYear && Math.abs(c.anio - v.anio) <= YEAR_WINDOW) core.push(c);
      else far.push(c);
    }
    const cap = (arr) =>
      arr
        .filter((c) => c.precio_nor != null)
        .sort((a, b) => (a.precio_nor ?? 0) - (b.precio_nor ?? 0))
        .slice(0, MAX_EQUIVALENTS);
    const coreCap = cap(core);
    const farCap = cap(far);

    const { level, refSet, expanded } = decideConfidence(coreCap, farCap);
    const prices = refSet.map((c) => c.precio_nor).filter((x) => x != null);
    const median = calcMedian(prices);

    const vPrice = v.precio_nor;
    const delta = vPrice != null && median != null && median !== 0 ? (vPrice - median) / median : null;
    const status = level
      ? classify(delta, level)
      : { label: 'Sin comparables', color: COLORS.grayMuted, tone: 'muted' };

    const top3 = [...refSet]
      .filter((c) => c.precio_nor != null)
      .sort((a, b) =>
        Math.abs((a.precio_nor ?? 0) - (median ?? 0)) -
        Math.abs((b.precio_nor ?? 0) - (median ?? 0)),
      )
      .slice(0, 3);

    return {
      v,
      level,
      confidence: level ?? '—',
      nCore: coreCap.length,
      nFar: farCap.length,
      n: refSet.length,
      expanded,
      median,
      delta,
      status,
      top3,
      alertRed: status.tone === 'red',
      amberAlert: status.tone === 'warn',
    };
  });

  rows.sort((a, b) => {
    const rank = (r) => {
      if (!r.level) return 3;
      if (r.status.tone === 'red') return 0;
      if (r.status.tone === 'warn') return 1;
      return 2;
    };
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return Math.abs(b.delta ?? 0) - Math.abs(a.delta ?? 0);
  });

  return rows;
}

// ─── Formatters ────────────────────────────────────────────────
function fmtUsd(n) {
  if (n == null || !Number.isFinite(n)) return '—';
  return `US$ ${Math.round(n).toLocaleString('es-AR')}`;
}
function fmtPct(n) {
  if (n == null || !Number.isFinite(n)) return '—';
  const sign = n > 0 ? '+' : '';
  return `${sign}${(n * 100).toFixed(1)}%`;
}
function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}
function fmtHs(n) {
  if (n == null || !Number.isFinite(n)) return 's/hs';
  return `${n.toLocaleString('es-AR')} hs`;
}
function cleanStr(s, max = 28) {
  if (!s) return '—';
  const t = s.toString().trim();
  return t.length > max ? t.slice(0, max - 1) + '…' : t;
}

// ─── Estilos PDF ───────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 32,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: COLORS.black,
    backgroundColor: COLORS.cream,
  },
  brandBar: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.green,
    paddingBottom: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brandKicker: {
    fontSize: 7,
    color: COLORS.grayMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  brandTitle: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    marginTop: 2,
  },
  brandSub: { fontSize: 8, color: COLORS.grayMuted, marginTop: 1 },
  brandMeta: { fontSize: 7.5, color: COLORS.grayMuted, textAlign: 'right', lineHeight: 1.35 },
  h2: {
    fontSize: 11.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.dark,
    marginTop: 6,
    marginBottom: 3,
  },
  h3: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    marginTop: 8,
    marginBottom: 3,
  },
  p: { fontSize: 8.5, color: COLORS.black, lineHeight: 1.4 },
  muted: { fontSize: 8, color: COLORS.grayMuted, lineHeight: 1.4 },
  small: { fontSize: 7.5, color: COLORS.grayMuted },
  kpiRow: { flexDirection: 'row', gap: 6, marginTop: 4, marginBottom: 6 },
  kpiCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 5,
    padding: 7,
  },
  kpiLabel: {
    fontSize: 6.5,
    color: COLORS.grayMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  kpiValue: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: COLORS.dark, marginTop: 2 },
  tableWrap: {
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  trHeader: { flexDirection: 'row', backgroundColor: COLORS.dark },
  thText: {
    color: COLORS.white,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    padding: 4,
  },
  tr: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.grayBorder,
    alignItems: 'stretch',
  },
  td: { padding: 4, fontSize: 8, color: COLORS.black },
  badge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 3,
    textAlign: 'center',
  },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2, marginBottom: 5 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 7, height: 7, borderRadius: 4, marginRight: 3 },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    color: COLORS.grayMuted,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.grayBorder,
    paddingTop: 5,
  },
  alertBox: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.redAlert,
    padding: 6,
    marginBottom: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 4,
    padding: 6,
    marginBottom: 4,
  },
  categoryHeaderTitle: { color: COLORS.white, fontSize: 12, fontFamily: 'Helvetica-Bold' },
  categoryHeaderMeta: { color: COLORS.yellow, fontSize: 8, fontFamily: 'Helvetica-Bold' },
  statusPill: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  inactiveTag: {
    fontSize: 6.5,
    color: COLORS.grayMuted,
    fontFamily: 'Helvetica-Oblique',
    marginTop: 1,
  },
  guideBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    marginBottom: 6,
  },
  guideRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  guideBullet: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginTop: 1.5,
    marginRight: 6,
  },
  guideText: {
    flex: 1,
    fontSize: 8.5,
    color: COLORS.black,
    lineHeight: 1.4,
  },
});

// Tabla compacta (portrait A4)
const COLS = [
  { key: 'item', label: 'Marca · Modelo · Año', w: 26 },
  { key: 'horas', label: 'Horas', w: 7 },
  { key: 'precio', label: 'Precio Venturino', w: 13 },
  { key: 'ref', label: 'Precio de referencia', w: 14 },
  { key: 'n', label: 'Compar.', w: 7 },
  { key: 'lvl', label: 'Confianza', w: 11 },
  { key: 'delta', label: 'Diferencia', w: 8 },
  { key: 'status', label: 'Estado', w: 14 },
];
const COL_TOTAL = COLS.reduce((a, c) => a + c.w, 0);
const colStyle = (w) => ({ width: `${(w / COL_TOTAL) * 100}%` });

function e(tag, props, ...children) {
  return React.createElement(tag, props, ...children);
}

function BrandBar({ subtitle, meta }) {
  return e(
    View,
    { style: styles.brandBar },
    e(
      View,
      { style: { flex: 1 } },
      e(Text, { style: styles.brandKicker }, 'Ricardo Venturino S.A. · John Deere'),
      e(Text, { style: styles.brandTitle }, 'Radar de Mercado · Venturino vs Competencia'),
      subtitle ? e(Text, { style: styles.brandSub }, subtitle) : null,
    ),
    e(View, null, ...meta.map((m, i) => e(Text, { key: i, style: styles.brandMeta }, m))),
  );
}

function Legend() {
  const items = [
    { c: COLORS.greenOk, t: 'En línea con el mercado' },
    { c: COLORS.amberWarn, t: 'A revisar: observar, barato u oportunidad' },
    { c: COLORS.redAlert, t: 'Alerta: Venturino más caro' },
    { c: COLORS.grayMuted, t: 'Sin comparables' },
  ];
  return e(
    View,
    { style: styles.legendRow },
    ...items.map((it, i) =>
      e(
        View,
        { key: i, style: styles.legendItem },
        e(View, { style: [styles.legendDot, { backgroundColor: it.c }] }),
        e(Text, { style: styles.small }, it.t),
      ),
    ),
  );
}

function Kpi({ label, value }) {
  return e(
    View,
    { style: styles.kpiCard },
    e(Text, { style: styles.kpiLabel }, label),
    e(Text, { style: styles.kpiValue }, value),
  );
}

function StatusBadge({ status }) {
  return e(
    View,
    { style: [styles.statusPill, { backgroundColor: status.color }] },
    e(Text, { style: styles.badge }, status.label),
  );
}

function TableHeader() {
  return e(
    View,
    { style: styles.trHeader, fixed: true },
    ...COLS.map((c) => e(Text, { key: c.key, style: [styles.thText, colStyle(c.w)] }, c.label)),
  );
}

function Row({ r, zebra }) {
  const bg = zebra ? COLORS.zebra : COLORS.white;
  const v = r.v;
  const itemLine = `${cleanStr(v.marca, 14)} · ${cleanStr(v.modelo, 18)}`;
  const yearLine = `Año ${v.anio ?? '—'}${v.hp_motor ? ` · ${Math.round(v.hp_motor)} HP` : ''}`;

  return e(
    View,
    { style: [styles.tr, { backgroundColor: bg }], wrap: false },
    e(
      View,
      { style: [styles.td, colStyle(COLS[0].w)] },
      e(Text, { style: { fontSize: 8.5, fontFamily: 'Helvetica-Bold' } }, itemLine),
      e(Text, { style: styles.small }, yearLine),
      !v.active ? e(Text, { style: styles.inactiveTag }, 'Histórico') : null,
    ),
    e(
      Text,
      { style: [styles.td, colStyle(COLS[1].w)] },
      v.horas_uso != null ? v.horas_uso.toLocaleString('es-AR') : '—',
    ),
    e(
      Text,
      { style: [styles.td, colStyle(COLS[2].w), { fontFamily: 'Helvetica-Bold' }] },
      fmtUsd(v.precio_nor),
    ),
    e(Text, { style: [styles.td, colStyle(COLS[3].w)] }, fmtUsd(r.median)),
    e(Text, { style: [styles.td, colStyle(COLS[4].w), { fontFamily: 'Helvetica-Bold' }] }, String(r.n)),
    e(
      Text,
      { style: [styles.td, colStyle(COLS[5].w)] },
      r.level ? (r.expanded ? `${r.confidence} · ampliada` : r.confidence) : '—',
    ),
    e(
      Text,
      {
        style: [
          styles.td,
          colStyle(COLS[6].w),
          {
            fontFamily: 'Helvetica-Bold',
            color: r.alertRed ? COLORS.redAlert : r.amberAlert ? COLORS.amberWarn : COLORS.black,
          },
        ],
      },
      fmtPct(r.delta),
    ),
    e(View, { style: [styles.td, colStyle(COLS[7].w)] }, e(StatusBadge, { status: r.status })),
  );
}

function CategorySection({ categoria, rows }) {
  const redAlerts = rows.filter((r) => r.alertRed);
  const ambers = rows.filter((r) => r.amberAlert).length;
  const noMarket = rows.filter((r) => !r.level).length;
  const topAlerts = [...redAlerts]
    .sort((a, b) => Math.abs(b.delta ?? 0) - Math.abs(a.delta ?? 0))
    .slice(0, 3);

  return e(
    View,
    null,
    e(
      View,
      { style: styles.categoryHeader },
      e(Text, { style: styles.categoryHeaderTitle }, categoria),
      e(
        Text,
        { style: styles.categoryHeaderMeta },
        `${rows.length} unidades · ${redAlerts.length} alertas · ${ambers} a revisar · ${noMarket} sin comparables`,
      ),
    ),
    e(Legend),
    e(
      View,
      { style: styles.tableWrap },
      e(TableHeader),
      ...rows.map((r, i) => e(Row, { key: i, r, zebra: i % 2 === 1 })),
    ),
    topAlerts.length > 0
      ? e(
          View,
          null,
          e(Text, { style: styles.h3 }, 'Unidades donde Venturino está más caro'),
          ...topAlerts.map((r, i) =>
            e(
              View,
              { key: i, style: styles.alertBox, wrap: false },
              e(
                Text,
                { style: [styles.p, { fontFamily: 'Helvetica-Bold' }] },
                `${cleanStr(r.v.marca, 14)} ${cleanStr(r.v.modelo, 22)} ${r.v.anio ?? ''} · ${fmtPct(r.delta)} por encima del precio de referencia (${r.n} comparables · confianza ${r.confidence.toLowerCase()})`,
              ),
              e(
                Text,
                { style: styles.small },
                `Venturino ${fmtUsd(r.v.precio_nor)} · Referencia ${fmtUsd(r.median)}`,
              ),
              ...r.top3.map((c, j) =>
                e(
                  Text,
                  { key: j, style: styles.small },
                  `· ${cleanStr(c.empresa ?? c.origen ?? '—', 22)} — ${c.anio ?? '—'} · ${fmtHs(c.horas_uso)} · ${fmtUsd(c.precio_nor)}`,
                ),
              ),
            ),
          ),
        )
      : null,
  );
}

function GuideItem({ color, title, body }) {
  return e(
    View,
    { style: styles.guideRow },
    e(View, { style: [styles.guideBullet, { backgroundColor: color }] }),
    e(
      Text,
      { style: styles.guideText },
      e(Text, { style: { fontFamily: 'Helvetica-Bold' } }, title + ': '),
      body,
    ),
  );
}

function fmtFxLine(fxInfo) {
  if (!fxInfo || !Number.isFinite(fxInfo.rate)) return null;
  const when = fxInfo.sourceDate ?? fxInfo.updatedAt;
  const whenStr = when ? new Date(when).toISOString().slice(0, 10) : null;
  const rateStr = fxInfo.rate.toLocaleString('es-AR', { maximumFractionDigits: 2 });
  return whenStr ? `USD/ARS ${rateStr} · ${whenStr}` : `USD/ARS ${rateStr}`;
}

function CoverPage({ dateStr, totals, soloActivos, fxInfo }) {
  const meta = [`Fecha: ${dateStr}`];
  const fxLine = fmtFxLine(fxInfo);
  if (fxLine) meta.push(fxLine);
  meta.push(soloActivos ? 'Inventario: sólo activos' : 'Inventario: completo');

  return e(
    Page,
    { size: 'A4', style: styles.page },
    e(BrandBar, { subtitle: 'Resumen ejecutivo', meta }),

    e(Text, { style: styles.h2 }, '¿Qué muestra este reporte?'),
    e(
      Text,
      { style: styles.p },
      'Comparamos cada unidad del inventario de Venturino con publicaciones equivalentes de la competencia (Agrofy, Agroads, MercadoLibre, Rastroagro, MachineFinder y Agronorte). Para cada una calculamos un "precio de referencia" del mercado y marcamos con un color cuán alineado está el precio de Venturino.',
    ),

    e(Text, { style: styles.h3 }, 'Cómo leer cada fila'),
    e(
      View,
      { style: styles.guideBox },
      e(GuideItem, {
        color: COLORS.greenOk,
        title: 'En línea',
        body: 'Venturino está a ±5% del mercado. No requiere acción.',
      }),
      e(GuideItem, {
        color: COLORS.amberWarn,
        title: 'Observar',
        body: 'Hay una diferencia de entre 5% y 10% en cualquier sentido. Vale la pena mirarlo.',
      }),
      e(GuideItem, {
        color: COLORS.amberWarn,
        title: 'Barato · oportunidad',
        body: 'Venturino está más de 10% por debajo del mercado. Puede haber margen para ajustar el precio al alza.',
      }),
      e(GuideItem, {
        color: COLORS.amberWarn,
        title: 'Revisar (pocos datos)',
        body: 'Venturino está caro, pero son pocos comparables o muy viejos. Mirar manualmente antes de mover el precio.',
      }),
      e(GuideItem, {
        color: COLORS.redAlert,
        title: 'Alerta · caro',
        body: 'Venturino está más de 10% por encima del mercado con comparables suficientes. Recomendado revisar el precio.',
      }),
      e(GuideItem, {
        color: COLORS.grayMuted,
        title: 'Sin comparables',
        body: 'No hay publicaciones similares activas que permitan comparar. Queda pendiente para la próxima corrida.',
      }),
    ),

    e(Text, { style: styles.h3 }, 'Términos que vas a ver en las tablas'),
    e(
      Text,
      { style: styles.p },
      '· ',
      e(Text, { style: { fontFamily: 'Helvetica-Bold' } }, 'Precio de referencia'),
      ': el valor "típico" del mercado para esa unidad. Se calcula tomando el precio del medio entre todos los comparables (así un scrape con precio mal cargado no distorsiona).\n· ',
      e(Text, { style: { fontFamily: 'Helvetica-Bold' } }, 'Compar.'),
      ': cantidad de publicaciones del mercado que se usaron para calcular la referencia.\n· ',
      e(Text, { style: { fontFamily: 'Helvetica-Bold' } }, 'Confianza'),
      ': Alta = muchos comparables en años cercanos; Media = pocos cercanos o tuvimos que mirar años más lejanos; Baja = muy pocos comparables. Las alertas rojas sólo se disparan con confianza Alta o Media.\n· ',
      e(Text, { style: { fontFamily: 'Helvetica-Bold' } }, 'Diferencia'),
      ': cuánto más caro (+) o más barato (−) está Venturino respecto al precio de referencia.\n· ',
      e(Text, { style: { fontFamily: 'Helvetica-Bold' } }, 'Histórico'),
      ': unidad del catálogo propio que no apareció en el último scraping del sitio. Se deja para tener más universo de comparación.',
    ),

    e(Text, { style: styles.h2 }, 'Números de este mes'),
    e(
      View,
      { style: styles.kpiRow },
      e(Kpi, { label: 'Unidades analizadas', value: String(totals.totalItems) }),
      e(Kpi, { label: 'Con mercado', value: String(totals.withMarket) }),
      e(Kpi, { label: 'Alertas rojas', value: String(totals.redAlerts) }),
      e(Kpi, { label: 'Sin comparables', value: String(totals.noMarket) }),
    ),
    e(Text, { style: styles.h3 }, 'Por categoría'),
    e(
      View,
      { style: styles.tableWrap },
      e(
        View,
        { style: styles.trHeader },
        e(Text, { style: [styles.thText, { width: '28%' }] }, 'Categoría'),
        e(Text, { style: [styles.thText, { width: '12%' }] }, 'Unidades'),
        e(Text, { style: [styles.thText, { width: '15%' }] }, 'Alertas'),
        e(Text, { style: [styles.thText, { width: '15%' }] }, 'A revisar'),
        e(Text, { style: [styles.thText, { width: '15%' }] }, 'En línea'),
        e(Text, { style: [styles.thText, { width: '15%' }] }, 'Sin compar.'),
      ),
      ...totals.byCat.map((c, i) =>
        e(
          View,
          { key: i, style: [styles.tr, { backgroundColor: i % 2 ? COLORS.zebra : COLORS.white }] },
          e(Text, { style: [styles.td, { width: '28%', fontFamily: 'Helvetica-Bold' }] }, c.categoria),
          e(Text, { style: [styles.td, { width: '12%' }] }, String(c.count)),
          e(
            Text,
            {
              style: [
                styles.td,
                {
                  width: '15%',
                  color: c.red > 0 ? COLORS.redAlert : COLORS.black,
                  fontFamily: 'Helvetica-Bold',
                },
              ],
            },
            String(c.red),
          ),
          e(Text, { style: [styles.td, { width: '15%' }] }, String(c.amber)),
          e(Text, { style: [styles.td, { width: '15%' }] }, String(c.green)),
          e(Text, { style: [styles.td, { width: '15%' }] }, String(c.noMarket)),
        ),
      ),
    ),
    e(
      View,
      { style: styles.footer, fixed: true },
      e(Text, null, 'Venturino · Radar de Mercado'),
      e(Text, { render: ({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}` }),
    ),
  );
}

function CategoryPage({ categoria, rows, dateStr, fxInfo }) {
  const meta = [`Fecha: ${dateStr}`];
  const fxLine = fmtFxLine(fxInfo);
  if (fxLine) meta.push(fxLine);
  return e(
    Page,
    { size: 'A4', style: styles.page },
    e(BrandBar, { subtitle: `Detalle · ${categoria}`, meta }),
    e(CategorySection, { categoria, rows }),
    e(
      View,
      { style: styles.footer, fixed: true },
      e(Text, null, `Venturino · ${categoria}`),
      e(Text, { render: ({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}` }),
    ),
  );
}

async function main() {
  const args = parseArgs();
  const prisma = new PrismaClient();

  try {
    console.log('→ Cargando datos desde PostgreSQL...');

    const competitorsWhere = { active: true, origen: { not: 'venturino' } };
    if (args.categoria) competitorsWhere.categoria = args.categoria;
    const competitorsRows = await prisma.listing.findMany({ where: competitorsWhere });

    const venturinoWhere = { origen: 'venturino' };
    if (args.categoria) venturinoWhere.categoria = args.categoria;
    if (args.soloActivos) venturinoWhere.active = true;
    const venturinoRows = await prisma.listing.findMany({ where: venturinoWhere });

    const competitorsAll = competitorsRows.map(toItem).filter((r) => {
      if (!r.marca_norm || !r.modelo_norm) return false;
      if (isSelfCompany(r.empresa)) return false;
      if (isMarketplaceRow(r)) return false;
      return true;
    });
    const venturinoAll = venturinoRows.map(toItem).filter((r) => r.marca_norm && r.modelo_norm);

    // FX vigente en la DB (si está syncronizado). Puede ser null si nunca se corrió syncFxRate.
    let fxInfo = null;
    try {
      const latestFx = await prisma.fxRate.findFirst({ orderBy: { createdAt: 'desc' } });
      if (latestFx) {
        fxInfo = {
          rate: Number(latestFx.rate),
          source: latestFx.source,
          sourceDate: latestFx.sourceDate,
          updatedAt: latestFx.updatedAt,
        };
      }
    } catch {
      fxInfo = null;
    }

    console.log(
      `  · Venturino: ${venturinoAll.length} unidades (${venturinoAll.filter((r) => r.active).length} activas)`,
    );
    console.log(`  · Competencia con marca+modelo: ${competitorsAll.length}`);

    const present = Array.from(new Set(venturinoAll.map((v) => v.categoria).filter(Boolean)));
    const orderedCats = CATEGORIES_ORDER.filter((c) => present.includes(c));
    present.forEach((c) => {
      if (!orderedCats.includes(c)) orderedCats.push(c);
    });

    if (orderedCats.length === 0) {
      console.error('✗ No hay unidades de Venturino con marca+modelo en la base.');
      process.exit(1);
    }

    const byCat = {};
    const catSummary = [];
    let totalItems = 0;
    let withMarket = 0;
    let redAlerts = 0;
    let noMarket = 0;
    let greenCount = 0;
    let amberCount = 0;

    for (const cat of orderedCats) {
      const vCat = venturinoAll.filter((v) => v.categoria === cat);
      const cCat = competitorsAll.filter((c) => c.categoria === cat);
      const rows = buildCategoryReport(vCat, cCat);
      byCat[cat] = rows;

      const red = rows.filter((r) => r.alertRed).length;
      const amber = rows.filter((r) => r.amberAlert).length;
      const green = rows.filter((r) => r.status.tone === 'green').length;
      const nm = rows.filter((r) => !r.level).length;

      catSummary.push({ categoria: cat, count: rows.length, red, amber, green, noMarket: nm });

      totalItems += rows.length;
      withMarket += rows.filter((r) => r.level).length;
      redAlerts += red;
      amberCount += amber;
      greenCount += green;
      noMarket += nm;

      console.log(
        `  · ${cat}: ${rows.length} unidades · ${red} alertas · ${amber} a revisar · ${green} en línea · ${nm} sin comparables`,
      );
    }

    const now = new Date();
    const dateStr = fmtDate(now);
    const outPath = args.outPath
      ? path.resolve(args.outPath)
      : path.resolve(
          path.join(
            __dirname,
            '..',
            'reports',
            `venturino-vs-mercado-${dateStr}${args.categoria ? '-' + args.categoria.toLowerCase() : ''}.pdf`,
          ),
        );

    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const doc = e(
      Document,
      { title: 'Venturino vs Mercado', author: 'Ricardo Venturino S.A.', subject: 'Radar de Mercado' },
      e(CoverPage, {
        dateStr,
        soloActivos: args.soloActivos,
        fxInfo,
        totals: { totalItems, withMarket, redAlerts, amberCount, greenCount, noMarket, byCat: catSummary },
      }),
      ...orderedCats.map((cat) =>
        e(CategoryPage, { key: cat, categoria: cat, rows: byCat[cat], dateStr, fxInfo }),
      ),
    );

    console.log(`→ Renderizando PDF en ${outPath}...`);
    await renderToFile(doc, outPath);
    console.log(`✓ Listo: ${outPath}`);
  } catch (err) {
    console.error('✗ Error generando reporte:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
