/**
 * Genera el PDF "Venturino vs Mercado" directamente desde PostgreSQL (Prisma).
 *
 * Uso:
 *   node scripts/generateVenturinoReport.js
 *   node scripts/generateVenturinoReport.js --categoria=Tractores
 *   node scripts/generateVenturinoReport.js --out=reports/custom.pdf
 *   node scripts/generateVenturinoReport.js --solo-activos   # sólo items Venturino con active=true
 *
 * Salida por defecto: reports/venturino-vs-mercado-YYYY-MM-DD.pdf
 *
 * Reglas:
 *  - Referencia de mercado = mediana (p50) en USD.
 *  - Matching en cascada SÓLO por año (sin filtro de horas, que muchas veces falta):
 *      L1 ±1 año · L2 ±2 años · L3 ±3 años (referencial, sin alerta).
 *    Se usa el primer nivel que alcance N ≥ 3 comparables con precio.
 *  - Semáforo (sólo L1/L2): Verde ≤5% · Amarillo 5–10% · Rojo >10%.
 *  - Fuzzy modelo: exacto, contains o variante de sufijo alfanumérico (5065ES ↔ 5065E).
 *  - Excluye Venturino, marketplaces sin vendedor real (Rastroagro) y dedupe por URL.
 *  - Inventario Venturino se carga sin filtro de active (incluye histórico del catálogo).
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
const N_MIN = 3;
const WARN_PCT = 0.05;
const ALERT_PCT = 0.10;
const CATEGORIES_ORDER = ['Tractores', 'Cosechadoras', 'Sembradoras', 'Pulverizadoras'];

const COLORS = {
  green: '#367C2B',
  yellow: '#FFDE00',
  dark: '#1F4D1A',
  black: '#1A1A1A',
  cream: '#F4F1E8',
  sand: '#C9B06E',
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

// ─── Percentiles ────────────────────────────────────────────────
function percentile(sortedValues, p) {
  if (sortedValues.length === 0) return null;
  const index = (sortedValues.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sortedValues[lower];
  const w = index - lower;
  return sortedValues[lower] * (1 - w) + sortedValues[upper] * w;
}
function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return percentile(sorted, 0.5);
}

// ─── Matching helpers ──────────────────────────────────────────
function extractTokens(v) {
  return String(v).split(' ').map((t) => t.trim()).filter((t) => t.length > 0);
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
function fuzzyModelMatch(v, c) {
  if (!v || !c) return false;
  if (v === c) return true;
  if (c.includes(v) || v.includes(c)) return true;
  const vTokens = extractTokens(v);
  const cArr = extractTokens(c);
  const cTokens = new Set(cArr);
  if (!vTokens.length || !cTokens.size) return false;
  const vAlpha = vTokens.filter((t) => /\d/.test(t));
  const cAlpha = cArr.filter((t) => /\d/.test(t));
  if (vAlpha.length === 1 && cAlpha.length >= 1) {
    for (const ct of cAlpha) if (isSuffixVariant(vAlpha[0], ct)) return true;
  }
  if (vTokens.length === 1 && isDigitsOnly(vTokens[0])) return cTokens.has(vTokens[0]);
  return vTokens.every((t) => cTokens.has(t));
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

// ─── Levels (SOLO año) ─────────────────────────────────────────
const LEVELS = [
  { id: 'L1', yearTol: 1, label: 'Alta' },
  { id: 'L2', yearTol: 2, label: 'Media' },
  { id: 'L3', yearTol: 3, label: 'Baja · ref.' },
];

function findComparables(v, competitors, level) {
  const vBrand = v.marca_norm;
  const vModel = v.modelo_norm;
  if (!vBrand || !vModel) return [];
  return competitors.filter((c) => {
    if (c.marca_norm !== vBrand) return false;
    if (!c.modelo_norm) return false;
    if (!fuzzyModelMatch(vModel, c.modelo_norm)) return false;
    if (v.anio == null || c.anio == null) return false;
    if (Math.abs(c.anio - v.anio) > level.yearTol) return false;
    return true;
  });
}

function classify(deltaPct, levelId) {
  if (deltaPct == null) return { label: 'Sin dato', color: COLORS.grayMuted };
  if (levelId === 'L3') return { label: 'Referencial', color: COLORS.grayMuted };
  const abs = Math.abs(deltaPct);
  if (abs > ALERT_PCT) {
    return {
      label: deltaPct > 0 ? 'Alerta · sobreprecio' : 'Alerta · bajo precio',
      color: COLORS.redAlert,
    };
  }
  if (abs > WARN_PCT) return { label: 'Observar', color: COLORS.amberWarn };
  return { label: 'Alineado', color: COLORS.greenOk };
}

// ─── Listing → shape interno ───────────────────────────────────
function toItem(row) {
  return {
    id: row.id,
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

// ─── Cálculo por categoría ─────────────────────────────────────
function buildCategoryReport(venturinoItems, competitorItems) {
  const rows = venturinoItems.map((v) => {
    let chosen = null;
    let comps = [];
    for (const lvl of LEVELS) {
      const found = findComparables(v, competitorItems, lvl).filter((c) => c.precio_nor != null);
      if (found.length >= N_MIN) {
        chosen = lvl;
        comps = found;
        break;
      }
      if (!chosen || found.length > comps.length) {
        chosen = lvl;
        comps = found;
      }
    }
    const hasEnough = comps.length >= N_MIN;
    const prices = comps.map((c) => c.precio_nor).filter((x) => x != null);
    const ref = median(prices);
    const vPrice = v.precio_nor;
    const delta = vPrice != null && ref != null && ref !== 0 ? (vPrice - ref) / ref : null;
    const status = hasEnough
      ? classify(delta, chosen.id)
      : { label: 'Sin mercado comparable', color: COLORS.grayMuted };

    const top3 = [...comps]
      .sort((a, b) => {
        if (a.precio_nor == null) return 1;
        if (b.precio_nor == null) return -1;
        return Math.abs(a.precio_nor - (ref ?? 0)) - Math.abs(b.precio_nor - (ref ?? 0));
      })
      .slice(0, 3);

    return {
      v,
      level: hasEnough ? chosen : null,
      confidence: hasEnough ? chosen.label : '—',
      n: comps.length,
      ref,
      delta,
      status,
      top3,
      alertRed: hasEnough && chosen.id !== 'L3' && delta != null && Math.abs(delta) > ALERT_PCT,
    };
  });

  // Orden: primero rojas (|Δ| desc), después amarillas, después resto, al final sin mercado.
  rows.sort((a, b) => {
    const rank = (r) => {
      if (!r.level) return 3;
      if (r.alertRed) return 0;
      if (r.status.label === 'Observar') return 1;
      return 2;
    };
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    const da = Math.abs(a.delta ?? 0);
    const db = Math.abs(b.delta ?? 0);
    return db - da;
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
    marginBottom: 12,
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
  brandSub: {
    fontSize: 8,
    color: COLORS.grayMuted,
    marginTop: 1,
  },
  brandMeta: {
    fontSize: 7.5,
    color: COLORS.grayMuted,
    textAlign: 'right',
    lineHeight: 1.35,
  },
  h2: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.dark,
    marginTop: 6,
    marginBottom: 4,
  },
  h3: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 4,
  },
  p: { fontSize: 9, color: COLORS.black, lineHeight: 1.45 },
  muted: { fontSize: 8, color: COLORS.grayMuted, lineHeight: 1.4 },
  small: { fontSize: 7.5, color: COLORS.grayMuted },
  kpiRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    marginBottom: 6,
  },
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
  kpiValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.dark,
    marginTop: 2,
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  trHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark,
  },
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
  td: {
    padding: 4,
    fontSize: 8,
    color: COLORS.black,
  },
  badge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 3,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
    marginBottom: 6,
  },
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
  categoryHeaderTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  categoryHeaderMeta: {
    color: COLORS.yellow,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
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
});

// Columnas tabla principal (portrait A4 ancho útil ≈ 531pt)
const COLS = [
  { key: 'item', label: 'Marca · Modelo · Año', w: 26 },
  { key: 'horas', label: 'Horas', w: 8 },
  { key: 'precio', label: 'Precio Venturino', w: 13 },
  { key: 'ref', label: 'Mediana mercado', w: 13 },
  { key: 'n', label: 'N', w: 4 },
  { key: 'lvl', label: 'Nivel · Confianza', w: 12 },
  { key: 'delta', label: 'Δ%', w: 8 },
  { key: 'status', label: 'Semáforo', w: 16 },
];
const COL_TOTAL = COLS.reduce((a, c) => a + c.w, 0);
const colStyle = (w) => ({ width: `${(w / COL_TOTAL) * 100}%` });

// ─── Helpers de render ─────────────────────────────────────────
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
    { c: COLORS.greenOk, t: 'Alineado (|Δ|≤5%)' },
    { c: COLORS.amberWarn, t: 'Observar (5–10%)' },
    { c: COLORS.redAlert, t: 'Alerta (>10%)' },
    { c: COLORS.grayMuted, t: 'Referencial / sin alerta' },
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
    e(Text, { style: [styles.td, colStyle(COLS[1].w)] }, v.horas_uso != null ? v.horas_uso.toLocaleString('es-AR') : '—'),
    e(Text, { style: [styles.td, colStyle(COLS[2].w), { fontFamily: 'Helvetica-Bold' }] }, fmtUsd(v.precio_nor)),
    e(Text, { style: [styles.td, colStyle(COLS[3].w)] }, fmtUsd(r.ref)),
    e(Text, { style: [styles.td, colStyle(COLS[4].w)] }, String(r.n)),
    e(Text, { style: [styles.td, colStyle(COLS[5].w)] }, r.level ? `${r.level.id} · ${r.confidence}` : '—'),
    e(
      Text,
      {
        style: [
          styles.td,
          colStyle(COLS[6].w),
          { fontFamily: 'Helvetica-Bold', color: r.alertRed ? COLORS.redAlert : COLORS.black },
        ],
      },
      fmtPct(r.delta),
    ),
    e(View, { style: [styles.td, colStyle(COLS[7].w)] }, e(StatusBadge, { status: r.status })),
  );
}

function CategorySection({ categoria, rows }) {
  const withAlert = rows.filter((r) => r.alertRed);
  const noMarket = rows.filter((r) => r.n < N_MIN).length;
  const topAlerts = [...withAlert].sort((a, b) => Math.abs(b.delta ?? 0) - Math.abs(a.delta ?? 0)).slice(0, 3);

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
        `${rows.length} items · ${withAlert.length} alertas · ${noMarket} sin mercado`,
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
          e(Text, { style: styles.h3 }, 'Top alertas · máximos desvíos'),
          ...topAlerts.map((r, i) =>
            e(
              View,
              { key: i, style: styles.alertBox, wrap: false },
              e(
                Text,
                { style: [styles.p, { fontFamily: 'Helvetica-Bold' }] },
                `${cleanStr(r.v.marca, 14)} ${cleanStr(r.v.modelo, 22)} ${r.v.anio ?? ''} · ${fmtPct(r.delta)} vs mediana de ${r.n} comparables (${r.level ? r.level.id : '—'})`,
              ),
              e(
                Text,
                { style: styles.small },
                `Venturino ${fmtUsd(r.v.precio_nor)} · Mercado ${fmtUsd(r.ref)}`,
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

function CoverPage({ dateStr, totals, soloActivos }) {
  return e(
    Page,
    { size: 'A4', style: styles.page },
    e(BrandBar, {
      subtitle: 'Resumen ejecutivo mensual',
      meta: [
        `Fecha: ${dateStr}`,
        'FX: 1500 ARS/USD',
        'Moneda: USD',
        soloActivos ? 'Modo: sólo activos' : 'Modo: inventario completo',
      ],
    }),
    e(Text, { style: styles.h2 }, 'Resumen global'),
    e(
      Text,
      { style: styles.p },
      'Compara el inventario propio de Venturino contra la oferta activa de competidores en marketplaces (Agrofy, Agroads, Rastroagro, MercadoLibre, MachineFinder, Agronorte). Para cada item se calcula la mediana (USD) de los comparables y se dispara una alerta cuando la diferencia supera el 10%.',
    ),
    e(
      View,
      { style: styles.kpiRow },
      e(Kpi, { label: 'Items Venturino', value: String(totals.totalItems) }),
      e(Kpi, { label: `Con N ≥ ${N_MIN}`, value: String(totals.withEnough) }),
      e(Kpi, { label: 'Alertas rojas', value: String(totals.redAlerts) }),
      e(Kpi, { label: 'Sin mercado', value: String(totals.noMarket) }),
    ),
    e(Text, { style: styles.h3 }, 'Desglose por categoría'),
    e(
      View,
      { style: styles.tableWrap },
      e(
        View,
        { style: styles.trHeader },
        e(Text, { style: [styles.thText, { width: '34%' }] }, 'Categoría'),
        e(Text, { style: [styles.thText, { width: '14%' }] }, 'Items'),
        e(Text, { style: [styles.thText, { width: '16%' }] }, 'Alertas'),
        e(Text, { style: [styles.thText, { width: '18%' }] }, 'Observar'),
        e(Text, { style: [styles.thText, { width: '18%' }] }, 'Sin mercado'),
      ),
      ...totals.byCat.map((c, i) =>
        e(
          View,
          { key: i, style: [styles.tr, { backgroundColor: i % 2 ? COLORS.zebra : COLORS.white }] },
          e(Text, { style: [styles.td, { width: '34%', fontFamily: 'Helvetica-Bold' }] }, c.categoria),
          e(Text, { style: [styles.td, { width: '14%' }] }, String(c.count)),
          e(
            Text,
            {
              style: [
                styles.td,
                { width: '16%', color: c.red > 0 ? COLORS.redAlert : COLORS.black, fontFamily: 'Helvetica-Bold' },
              ],
            },
            String(c.red),
          ),
          e(Text, { style: [styles.td, { width: '18%' }] }, String(c.amber)),
          e(Text, { style: [styles.td, { width: '18%' }] }, String(c.noMarket)),
        ),
      ),
    ),
    e(Legend),
    e(
      Text,
      { style: styles.small },
      'Metodología: matching en cascada por marca/modelo con tolerancia de año creciente. L1 ±1 año (alta confianza) · L2 ±2 años (media) · L3 ±3 años (referencial, no dispara alerta). El filtro de horas se quitó porque muchas publicaciones no lo reportan.',
    ),
    e(
      View,
      { style: styles.footer, fixed: true },
      e(Text, null, 'Venturino · Radar de Mercado'),
      e(Text, { render: ({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}` }),
    ),
  );
}

function CategoryPage({ categoria, rows, dateStr }) {
  return e(
    Page,
    { size: 'A4', style: styles.page },
    e(BrandBar, {
      subtitle: `Detalle · ${categoria}`,
      meta: [`Fecha: ${dateStr}`, 'FX: 1500 ARS/USD'],
    }),
    e(CategorySection, { categoria, rows }),
    e(
      View,
      { style: styles.footer, fixed: true },
      e(Text, null, `Venturino · ${categoria}`),
      e(Text, { render: ({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}` }),
    ),
  );
}

function MethodologyPage({ dateStr, sources }) {
  return e(
    Page,
    { size: 'A4', style: styles.page },
    e(BrandBar, { subtitle: 'Anexo metodológico', meta: [`Fecha: ${dateStr}`] }),
    e(Text, { style: styles.h2 }, 'Cómo leer este reporte'),
    e(
      Text,
      { style: styles.p },
      'Para cada unidad publicada por Venturino se identifican comparables activos en marketplaces. Sobre esos comparables se calcula la mediana en USD (referencia de mercado) y el Δ% entre el precio Venturino y esa mediana.',
    ),
    e(Text, { style: styles.h3 }, 'Matching en cascada (sólo por año)'),
    e(
      Text,
      { style: styles.p },
      'Se prueban tres niveles de tolerancia de año, de más estricto a más laxo, y se queda con el primero que reúne al menos 3 comparables con precio. Si ningún nivel alcanza 3, la fila se marca como "Sin mercado comparable".',
    ),
    e(
      View,
      { style: [styles.tableWrap, { marginTop: 4 }] },
      e(
        View,
        { style: styles.trHeader },
        e(Text, { style: [styles.thText, { width: '14%' }] }, 'Nivel'),
        e(Text, { style: [styles.thText, { width: '22%' }] }, 'Año'),
        e(Text, { style: [styles.thText, { width: '32%' }] }, 'Confianza'),
        e(Text, { style: [styles.thText, { width: '32%' }] }, 'Dispara alerta'),
      ),
      ...[
        ['L1', '±1 año', 'Alta', 'Sí'],
        ['L2', '±2 años', 'Media', 'Sí'],
        ['L3', '±3 años', 'Baja (referencial)', 'No'],
      ].map((r, i) =>
        e(
          View,
          { key: i, style: [styles.tr, { backgroundColor: i % 2 ? COLORS.zebra : COLORS.white }] },
          e(Text, { style: [styles.td, { width: '14%', fontFamily: 'Helvetica-Bold' }] }, r[0]),
          e(Text, { style: [styles.td, { width: '22%' }] }, r[1]),
          e(Text, { style: [styles.td, { width: '32%' }] }, r[2]),
          e(Text, { style: [styles.td, { width: '32%' }] }, r[3]),
        ),
      ),
    ),
    e(Text, { style: styles.h3 }, 'Umbrales del semáforo'),
    e(
      Text,
      { style: styles.p },
      'Alineado: |Δ| ≤ 5%. Observar: 5% < |Δ| ≤ 10%. Alerta: |Δ| > 10%. Signo positivo = precio Venturino por encima de la mediana; negativo = por debajo.',
    ),
    e(Text, { style: styles.h3 }, 'Criterios adicionales'),
    e(
      Text,
      { style: styles.p },
      '· Matching fuzzy de modelo (contiene, tokens, variante de sufijo alfanumérico: "5065ES" ↔ "5065E").\n· Se excluyen publicaciones sin precio, marketplaces sin vendedor identificable (Rastroagro sin empresa) y los propios listings de Venturino.\n· Las horas de uso se muestran como contexto pero no forman parte del criterio de matching (muchas publicaciones no lo reportan).\n· Los items Venturino marcados como "Histórico" corresponden al catálogo no activo en el último scraping.',
    ),
    e(Text, { style: styles.h3 }, 'Fuentes de competencia'),
    e(Text, { style: styles.small }, sources.join(' · ') || '—'),
    e(
      View,
      { style: styles.footer, fixed: true },
      e(Text, null, 'Venturino · Anexo'),
      e(Text, { render: ({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}` }),
    ),
  );
}

// ─── Main ──────────────────────────────────────────────────────
async function main() {
  const args = parseArgs();
  const prisma = new PrismaClient();

  try {
    console.log('→ Cargando datos desde PostgreSQL...');

    // Competidores: sólo activos.
    const competitorsWhere = { active: true, origen: { not: 'venturino' } };
    if (args.categoria) competitorsWhere.categoria = args.categoria;
    const competitorsRows = await prisma.listing.findMany({ where: competitorsWhere });

    // Venturino: todos por defecto (activos + histórico). Con --solo-activos limita.
    const venturinoWhere = { origen: 'venturino' };
    if (args.categoria) venturinoWhere.categoria = args.categoria;
    if (args.soloActivos) venturinoWhere.active = true;
    const venturinoRows = await prisma.listing.findMany({ where: venturinoWhere });

    const competitorsAll = competitorsRows.map(toItem).filter((r) => {
      if (isSelfCompany(r.empresa)) return false;
      if (isMarketplaceRow(r)) return false;
      return true;
    });
    const venturinoAll = venturinoRows.map(toItem);

    console.log(`  · Venturino items: ${venturinoAll.length} (${venturinoAll.filter((r) => r.active).length} activos)`);
    console.log(`  · Competencia activa: ${competitorsAll.length}`);

    const present = Array.from(new Set(venturinoAll.map((v) => v.categoria).filter(Boolean)));
    const orderedCats = CATEGORIES_ORDER.filter((c) => present.includes(c));
    present.forEach((c) => {
      if (!orderedCats.includes(c)) orderedCats.push(c);
    });

    if (orderedCats.length === 0) {
      console.error('✗ No hay items Venturino en la base.');
      process.exit(1);
    }

    const byCat = {};
    const catSummary = [];
    let totalItems = 0;
    let withEnough = 0;
    let redAlerts = 0;
    let noMarket = 0;

    for (const cat of orderedCats) {
      const vCat = venturinoAll.filter((v) => v.categoria === cat);
      const cCat = competitorsAll.filter((c) => c.categoria === cat);
      const rows = buildCategoryReport(vCat, cCat);
      byCat[cat] = rows;

      const red = rows.filter((r) => r.alertRed).length;
      const amber = rows.filter((r) => !r.alertRed && r.status.label === 'Observar').length;
      const nm = rows.filter((r) => r.n < N_MIN).length;
      catSummary.push({ categoria: cat, count: rows.length, red, amber, noMarket: nm });

      totalItems += rows.length;
      withEnough += rows.filter((r) => r.n >= N_MIN).length;
      redAlerts += red;
      noMarket += nm;
      console.log(`  · ${cat}: ${rows.length} items · ${red} alertas · ${nm} sin mercado`);
    }

    const sources = Array.from(new Set(competitorsAll.map((c) => c.origen).filter(Boolean))).sort();
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
        totals: { totalItems, withEnough, redAlerts, noMarket, byCat: catSummary },
      }),
      ...orderedCats.map((cat) => e(CategoryPage, { key: cat, categoria: cat, rows: byCat[cat], dateStr })),
      e(MethodologyPage, { dateStr, sources }),
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
