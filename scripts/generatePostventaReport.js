/**
 * Reporte PDF Postventa Venturino vs MercadoLibre.
 *
 * Uso interno:
 *   node scripts/generatePostventaReport.js --input=/tmp/postventa.json --out=/tmp/postventa.pdf
 *
 * El route handler arma el JSON con Prisma/TypeScript y este proceso aislado
 * solo renderiza React PDF para evitar problemas de bundling en Next.
 */

const fs = require('fs');
const path = require('path');
const React = require('react');
const {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToFile,
} = require('@react-pdf/renderer');

const COLORS = {
  green: '#367C2B',
  yellow: '#FFDE00',
  dark: '#1F4D1A',
  black: '#1A1A1A',
  cream: '#F4F1E8',
  white: '#FFFFFF',
  red: '#B02A2A',
  amber: '#C98A00',
  muted: '#6B6B6B',
  border: '#E2E0D8',
  zebra: '#FAF8F1',
};

function parseArgs() {
  const args = { inputPath: null, outPath: null };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--input=')) args.inputPath = arg.slice('--input='.length);
    if (arg.startsWith('--out=')) args.outPath = arg.slice('--out='.length);
  }
  if (!args.inputPath) throw new Error('Falta --input');
  if (!args.outPath) throw new Error('Falta --out');
  return args;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 36,
    paddingHorizontal: 30,
    fontSize: 8,
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
  kicker: {
    fontSize: 7,
    color: COLORS.muted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    marginTop: 2,
  },
  subtitle: { fontSize: 8, color: COLORS.muted, marginTop: 2 },
  meta: { fontSize: 7.5, color: COLORS.muted, textAlign: 'right', lineHeight: 1.35 },
  h2: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.dark,
    marginTop: 8,
    marginBottom: 4,
  },
  p: { fontSize: 8.5, lineHeight: 1.4, color: COLORS.black },
  small: { fontSize: 7.2, color: COLORS.muted, lineHeight: 1.35 },
  kpiRow: { flexDirection: 'row', gap: 6, marginVertical: 6 },
  kpiCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 7,
  },
  kpiLabel: {
    fontSize: 6.5,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  kpiValue: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: COLORS.dark, marginTop: 2 },
  table: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    overflow: 'hidden',
  },
  trHeader: { flexDirection: 'row', backgroundColor: COLORS.dark },
  th: {
    color: COLORS.white,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    padding: 4,
  },
  tr: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    minHeight: 28,
  },
  td: { padding: 4, fontSize: 7.7, color: COLORS.black },
  tdBold: { fontFamily: 'Helvetica-Bold' },
  productName: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: COLORS.black },
  statusPill: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  statusText: { color: COLORS.white, fontSize: 6.8, fontFamily: 'Helvetica-Bold' },
  candidateLine: { fontSize: 6.8, color: COLORS.muted, marginTop: 2, lineHeight: 1.25 },
  filterBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 7,
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    color: COLORS.muted,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingTop: 5,
  },
});

const COLS = [
  { key: 'product', label: 'Producto Venturino', width: '31%' },
  { key: 'status', label: 'Estado', width: '16%' },
  { key: 'price', label: 'Precio', width: '10%' },
  { key: 'median', label: 'Mediana ML', width: '11%' },
  { key: 'gap', label: 'Brecha', width: '8%' },
  { key: 'conf', label: 'Conf.', width: '8%' },
  { key: 'cands', label: 'Candidatos ML principales', width: '16%' },
];

function e(tag, props, ...children) {
  return React.createElement(tag, props, ...children);
}

function fmtArs(value) {
  if (value == null || !Number.isFinite(Number(value))) return '-';
  return `$${Math.round(Number(value)).toLocaleString('es-AR')}`;
}

function fmtPct(value) {
  if (value == null || !Number.isFinite(Number(value))) return '-';
  const numeric = Number(value);
  const sign = numeric > 0 ? '+' : '';
  return `${sign}${(numeric * 100).toFixed(1)}%`;
}

function fmtNumber(value) {
  if (value == null || !Number.isFinite(Number(value))) return '-';
  return Number(value).toLocaleString('es-AR');
}

function clean(value, max = 34) {
  if (!value) return '-';
  const text = String(value).trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function statusColor(status) {
  if (status === 'Venturino más caro que ML') return COLORS.red;
  if (status === 'Venturino más barato que ML') return COLORS.green;
  if (status === 'similar a ML') return COLORS.amber;
  return COLORS.muted;
}

function gapColor(value) {
  if (value == null || !Number.isFinite(Number(value))) return COLORS.muted;
  const numeric = Number(value);
  if (numeric > 0.1) return COLORS.red;
  if (numeric < -0.1) return COLORS.green;
  return COLORS.black;
}

function BrandBar({ data, subtitle }) {
  const run = data.analysisRun;
  const meta = [
    `Fecha: ${new Date().toISOString().slice(0, 10)}`,
    run ? `Corrida #${run.id} · ${run.algorithmVersion}` : 'Sin corrida',
    run ? `Venturino ${run.venturinoDate || '-'} · ML ${run.mlDate || '-'}` : null,
  ].filter(Boolean);

  return e(
    View,
    { style: styles.brandBar },
    e(
      View,
      { style: { flex: 1 } },
      e(Text, { style: styles.kicker }, 'Ricardo Venturino S.A. · John Deere'),
      e(Text, { style: styles.title }, 'Postventa · Venturino vs MercadoLibre'),
      subtitle ? e(Text, { style: styles.subtitle }, subtitle) : null,
    ),
    e(View, null, ...meta.map((line, index) => e(Text, { key: index, style: styles.meta }, line))),
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

function SummaryPage({ data }) {
  const kpis = data.summary.kpis;
  const filters = data.filters;
  const activeFilters = [
    filters.search ? `Búsqueda: ${filters.search}` : null,
    filters.status ? `Estado: ${filters.status}` : null,
    filters.confidence ? `Confianza: ${filters.confidence}` : null,
    `Orden: ${filters.sortBy || 'brecha'} ${filters.sortDir === 'asc' ? 'ascendente' : 'descendente'}`,
  ].filter(Boolean);

  return e(
    Page,
    { size: 'A4', orientation: 'landscape', style: styles.page },
    e(BrandBar, { data, subtitle: 'Resumen del benchmark de artículos de postventa' }),
    e(
      Text,
      { style: styles.p },
      'El reporte usa los resultados persistidos de la última corrida del algoritmo Postventa. Compara cada producto Venturino contra publicaciones activas de MercadoLibre y clasifica la brecha contra la mediana de candidatos aceptados.',
    ),
    e(
      View,
      { style: styles.kpiRow },
      e(Kpi, { label: 'Productos evaluados', value: fmtNumber(kpis.total) }),
      e(Kpi, { label: 'Con comparable', value: fmtNumber(kpis.comparable) }),
      e(Kpi, { label: 'Más caro que ML', value: fmtNumber(kpis.actionableMoreExpensive) }),
      e(Kpi, { label: 'Más barato que ML', value: fmtNumber(kpis.actionableCheaper) }),
      e(Kpi, { label: 'Sin comparable', value: fmtNumber(kpis.noComparable) }),
    ),
    e(
      View,
      { style: styles.filterBox },
      e(Text, { style: styles.h2 }, 'Alcance del export'),
      e(Text, { style: styles.p }, `${fmtNumber(data.exportedCount)} productos exportados de ${fmtNumber(data.total)} resultados filtrados.`),
      data.truncated
        ? e(Text, { style: [styles.small, { color: COLORS.red, marginTop: 3 }] }, 'El reporte fue truncado por límite operativo. Refinar filtros para exportar menos productos.')
        : null,
      e(Text, { style: [styles.small, { marginTop: 4 }] }, activeFilters.join(' · ')),
      e(
        Text,
        { style: [styles.small, { marginTop: 4 }] },
        'Regla estándar: banda de precio ±40%, similitud ±10% para “similar a ML”, candidatos principales por score y confianza.',
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

function TableHeader() {
  return e(
    View,
    { style: styles.trHeader, fixed: true },
    ...COLS.map((col) => e(Text, { key: col.key, style: [styles.th, { width: col.width }] }, col.label)),
  );
}

function StatusBadge({ status }) {
  return e(
    View,
    { style: [styles.statusPill, { backgroundColor: statusColor(status) }] },
    e(Text, { style: styles.statusText }, clean(status, 26)),
  );
}

function ProductRow({ item, zebra }) {
  const bg = zebra ? COLORS.zebra : COLORS.white;
  return e(
    View,
    { style: [styles.tr, { backgroundColor: bg }], wrap: false },
    e(
      View,
      { style: [styles.td, { width: COLS[0].width }] },
      e(Text, { style: styles.productName }, clean(item.name, 44)),
      e(Text, { style: styles.small }, `#${item.externalId}`),
    ),
    e(View, { style: [styles.td, { width: COLS[1].width }] }, e(StatusBadge, { status: item.status })),
    e(Text, { style: [styles.td, styles.tdBold, { width: COLS[2].width }] }, fmtArs(item.priceArs)),
    e(Text, { style: [styles.td, { width: COLS[3].width }] }, fmtArs(item.medianMlPriceArs)),
    e(
      Text,
      { style: [styles.td, styles.tdBold, { width: COLS[4].width, color: gapColor(item.ventVsMedianPct) }] },
      fmtPct(item.ventVsMedianPct),
    ),
    e(Text, { style: [styles.td, { width: COLS[5].width }] }, item.bestConfidence || '-'),
    e(
      View,
      { style: [styles.td, { width: COLS[6].width }] },
      e(Text, { style: styles.tdBold }, `${item.totalCandidates} cand.`),
      ...item.candidates.map((candidate) =>
        e(
          Text,
          { key: candidate.id, style: styles.candidateLine },
          `${candidate.rank}. ${clean(candidate.name, 26)} · ${fmtArs(candidate.priceArs)} · ${candidate.score} pts`,
        ),
      ),
    ),
  );
}

function DetailPages({ data }) {
  const pages = [];
  const chunkSize = 14;
  for (let i = 0; i < data.items.length; i += chunkSize) {
    const chunk = data.items.slice(i, i + chunkSize);
    pages.push(
      e(
        Page,
        { key: i, size: 'A4', orientation: 'landscape', style: styles.page },
        e(BrandBar, { data, subtitle: `Detalle de productos ${i + 1}-${i + chunk.length}` }),
        e(
          View,
          { style: styles.table },
          e(TableHeader),
          ...chunk.map((item, index) => e(ProductRow, { key: item.id, item, zebra: index % 2 === 1 })),
        ),
        e(
          View,
          { style: styles.footer, fixed: true },
          e(Text, null, 'Venturino · Postventa'),
          e(Text, { render: ({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}` }),
        ),
      ),
    );
  }
  return pages;
}

async function main() {
  const args = parseArgs();
  const data = JSON.parse(fs.readFileSync(args.inputPath, 'utf8'));
  fs.mkdirSync(path.dirname(args.outPath), { recursive: true });

  const doc = e(
    Document,
    {
      title: 'Postventa Venturino vs MercadoLibre',
      author: 'Ricardo Venturino S.A.',
      subject: 'Radar de Mercado Postventa',
    },
    e(SummaryPage, { data }),
    ...DetailPages({ data }),
  );

  await renderToFile(doc, args.outPath);
}

main().catch((error) => {
  console.error('Error generando reporte Postventa:', error);
  process.exitCode = 1;
});
