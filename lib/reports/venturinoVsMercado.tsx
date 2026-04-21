/**
 * Generador del reporte "Venturino vs Mercado".
 *
 * Exporta `generateVenturinoPdfBuffer(options)` que devuelve un Buffer PDF
 * listo para servir por una API route o escribir a disco.
 *
 * Reglas del cliente:
 *  - Matching: misma lógica que "Análisis 1" de la app (byKey + byBrand fuzzy),
 *    sin filtro de horas.
 *  - Referencia de mercado: MEDIANA USD.
 *  - Confianza:
 *      Alta   : >3 comparables dentro de ±2 años.
 *      Media  : muestra chica cercana, o expansión fuera de ±2 con >3.
 *      Baja   : aun expandiendo ≤3 comparables.
 *  - Semáforo:
 *      Rojo   : Venturino >10% por encima de la referencia (salvo confianza Baja).
 *      Amarillo "Revisar (pocos datos)" : Δ > +10% con confianza Baja.
 *      Amarillo "Barato · oportunidad"   : Δ < −10%.
 *      Amarillo "Observar"               : 5% < |Δ| ≤ 10%.
 *      Verde  "En línea"                 : |Δ| ≤ 5%.
 */

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { PrismaClient } from "@prisma/client";

// ─── Config ─────────────────────────────────────────────────────
const YEAR_WINDOW = 2;
const N_HIGH = 3;
const ALERT_PCT = 0.1;
const WARN_PCT = 0.05;
const FUZZY_LEVEL = 1;
const MAX_EQUIVALENTS = 50;
const CATEGORIES_ORDER = ["Tractores", "Cosechadoras", "Sembradoras", "Pulverizadoras"];

const COLORS = {
  green: "#367C2B",
  yellow: "#FFDE00",
  dark: "#1F4D1A",
  black: "#1A1A1A",
  cream: "#F4F1E8",
  white: "#FFFFFF",
  redAlert: "#B02A2A",
  amberWarn: "#C98A00",
  greenOk: "#2F7A28",
  grayMuted: "#6B6B6B",
  grayBorder: "#E2E0D8",
  zebra: "#FAF8F1",
};

// ─── Tipos internos ────────────────────────────────────────────
type Item = {
  id: string;
  url: string | null;
  titulo: string | null;
  origen: string | null;
  categoria: string | null;
  empresa: string | null;
  marca: string | null;
  modelo: string | null;
  marca_norm: string | null;
  modelo_norm: string | null;
  anio: number | null;
  horas_uso: number | null;
  hp_motor: number | null;
  provincia: string | null;
  precio_nor: number | null;
  active: boolean;
};

type Confidence = "Alta" | "Media" | "Baja";

type Status = {
  label: string;
  color: string;
  tone: "green" | "warn" | "red" | "muted";
};

type ReportRow = {
  v: Item;
  level: Confidence | null;
  confidence: string;
  nCore: number;
  nFar: number;
  n: number;
  expanded: boolean;
  median: number | null;
  delta: number | null;
  status: Status;
  top3: Item[];
  alertRed: boolean;
  amberAlert: boolean;
};

type CategorySummary = {
  categoria: string;
  count: number;
  red: number;
  amber: number;
  green: number;
  noMarket: number;
};

type FxInfo = {
  rate: number;
  source: string | null;
  sourceDate: Date | null;
  updatedAt: Date;
};

// ─── Matching helpers ──────────────────────────────────────────
function extractTokens(value: string) {
  return String(value)
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}
function isDigitsOnly(v: string) {
  return /^\d+$/.test(v);
}
function extractNumericCore(token: string) {
  const m = String(token).match(/^([A-Z]*)(\d+)([A-Z]*)$/);
  if (!m) return null;
  return { prefix: m[1], digits: m[2], suffix: m[3] };
}
function isSuffixVariant(a: string, b: string) {
  const ap = extractNumericCore(a);
  const bp = extractNumericCore(b);
  if (!ap || !bp) return false;
  if (ap.digits !== bp.digits) return false;
  if (ap.prefix === bp.prefix) return true;
  if (ap.prefix.includes(bp.prefix) || bp.prefix.includes(ap.prefix)) return true;
  return false;
}
function fuzzyModelMatch(vModel: string, cModel: string, level: number) {
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
function buildKey(item: { marca_norm: string | null; modelo_norm: string | null }) {
  if (!item.marca_norm || !item.modelo_norm) return null;
  return `${item.marca_norm}|${item.modelo_norm}`;
}
function normalizeEmpresa(v: string | null | undefined) {
  return (v ?? "").toString().trim().toUpperCase();
}
function isSelfCompany(v: string | null | undefined) {
  return normalizeEmpresa(v).includes("VENTURINO");
}
const MARKETPLACE_ORIGINS = new Set(["rastroagro"]);
function isMarketplaceRow(row: { origen: string | null; empresa: string | null }) {
  const origen = (row.origen ?? "").toString().trim().toLowerCase();
  if (!MARKETPLACE_ORIGINS.has(origen)) return false;
  const empresa = (row.empresa ?? "").toString().trim().toLowerCase();
  return !empresa || empresa === origen;
}

function toItem(row: {
  id: string | number | bigint;
  url: string | null;
  titulo: string | null;
  origen: string | null;
  categoria: string | null;
  vendedor: string | null;
  marca: string | null;
  modelo: string | null;
  marcaNorm: string | null;
  modeloNorm: string | null;
  anio: number | null;
  horas: unknown;
  hp: unknown;
  provincia: string | null;
  precioUsd: unknown;
  active: boolean;
}): Item {
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

function indexCompetitors(competitors: Item[]) {
  const byKey = new Map<string, Item[]>();
  const byBrand = new Map<string, Item[]>();
  for (const row of competitors) {
    const key = buildKey(row);
    if (!key) continue;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)!.push(row);
    const brand = row.marca_norm;
    if (!brand) continue;
    if (!byBrand.has(brand)) byBrand.set(brand, []);
    byBrand.get(brand)!.push(row);
  }
  return { byKey, byBrand };
}

function buildCandidatePool(v: Item, byKey: Map<string, Item[]>, byBrand: Map<string, Item[]>) {
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

function decideConfidence(coreSet: Item[], farSet: Item[]) {
  const nCore = coreSet.length;
  const nFar = farSet.length;
  const nAll = nCore + nFar;
  if (nCore > N_HIGH) return { level: "Alta" as Confidence, refSet: coreSet, expanded: false };
  if (nCore > 0 && nFar === 0)
    return { level: "Media" as Confidence, refSet: coreSet, expanded: false };
  if (nAll > N_HIGH)
    return { level: "Media" as Confidence, refSet: [...coreSet, ...farSet], expanded: true };
  if (nAll > 0)
    return { level: "Baja" as Confidence, refSet: [...coreSet, ...farSet], expanded: nFar > 0 };
  return { level: null, refSet: [] as Item[], expanded: false };
}

function classify(delta: number | null, confidence: Confidence): Status {
  if (delta == null) return { label: "Sin dato", color: COLORS.grayMuted, tone: "muted" };
  if (delta > ALERT_PCT) {
    if (confidence === "Baja") {
      return { label: "Revisar (pocos datos)", color: COLORS.amberWarn, tone: "warn" };
    }
    return { label: "Caro · alerta", color: COLORS.redAlert, tone: "red" };
  }
  if (delta < -ALERT_PCT) {
    return { label: "Barato · oportunidad", color: COLORS.amberWarn, tone: "warn" };
  }
  if (Math.abs(delta) > WARN_PCT) {
    return { label: "Observar", color: COLORS.amberWarn, tone: "warn" };
  }
  return { label: "En línea", color: COLORS.greenOk, tone: "green" };
}

function calcMedian(values: number[]) {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function buildCategoryReport(venturinoItems: Item[], competitorItems: Item[]): ReportRow[] {
  const { byKey, byBrand } = indexCompetitors(competitorItems);
  const rows: ReportRow[] = venturinoItems.map((v) => {
    const pool = buildCandidatePool(v, byKey, byBrand);
    const hasYear = Number.isFinite(v.anio);
    const core: Item[] = [];
    const far: Item[] = [];
    for (const c of pool) {
      if (!Number.isFinite(c.anio)) continue;
      if (hasYear && Math.abs((c.anio as number) - (v.anio as number)) <= YEAR_WINDOW) {
        core.push(c);
      } else {
        far.push(c);
      }
    }
    const cap = (arr: Item[]) =>
      arr
        .filter((c) => c.precio_nor != null)
        .sort((a, b) => (a.precio_nor ?? 0) - (b.precio_nor ?? 0))
        .slice(0, MAX_EQUIVALENTS);
    const coreCap = cap(core);
    const farCap = cap(far);
    const { level, refSet, expanded } = decideConfidence(coreCap, farCap);

    const prices = refSet.map((c) => c.precio_nor).filter((x): x is number => x != null);
    const median = calcMedian(prices);

    const vPrice = v.precio_nor;
    const delta =
      vPrice != null && median != null && median !== 0 ? (vPrice - median) / median : null;

    const status: Status = level
      ? classify(delta, level)
      : { label: "Sin comparables", color: COLORS.grayMuted, tone: "muted" };

    const top3 = [...refSet]
      .filter((c) => c.precio_nor != null)
      .sort(
        (a, b) =>
          Math.abs((a.precio_nor ?? 0) - (median ?? 0)) -
          Math.abs((b.precio_nor ?? 0) - (median ?? 0)),
      )
      .slice(0, 3);

    return {
      v,
      level,
      confidence: level ?? "—",
      nCore: coreCap.length,
      nFar: farCap.length,
      n: refSet.length,
      expanded,
      median,
      delta,
      status,
      top3,
      alertRed: status.tone === "red",
      amberAlert: status.tone === "warn",
    };
  });

  rows.sort((a, b) => {
    const rank = (r: ReportRow) => {
      if (!r.level) return 3;
      if (r.status.tone === "red") return 0;
      if (r.status.tone === "warn") return 1;
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
function fmtUsd(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  return `US$ ${Math.round(n).toLocaleString("es-AR")}`;
}
function fmtPct(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${(n * 100).toFixed(1)}%`;
}
function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
function fmtHs(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "s/hs";
  return `${n.toLocaleString("es-AR")} hs`;
}
function cleanStr(s: string | null | undefined, max = 28) {
  if (!s) return "—";
  const t = s.toString().trim();
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}
function fmtFxLine(fxInfo: FxInfo | null) {
  if (!fxInfo || !Number.isFinite(fxInfo.rate)) return null;
  const when = fxInfo.sourceDate ?? fxInfo.updatedAt;
  const whenStr = when ? new Date(when).toISOString().slice(0, 10) : null;
  const rateStr = fxInfo.rate.toLocaleString("es-AR", { maximumFractionDigits: 2 });
  return whenStr ? `USD/ARS ${rateStr} · ${whenStr}` : `USD/ARS ${rateStr}`;
}

// ─── Estilos PDF ───────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: COLORS.black,
    backgroundColor: COLORS.cream,
  },
  brandBar: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.green,
    paddingBottom: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  brandKicker: {
    fontSize: 7,
    color: COLORS.grayMuted,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  brandTitle: { fontSize: 15, fontFamily: "Helvetica-Bold", color: COLORS.black, marginTop: 2 },
  brandSub: { fontSize: 8, color: COLORS.grayMuted, marginTop: 1 },
  brandMeta: { fontSize: 7.5, color: COLORS.grayMuted, textAlign: "right", lineHeight: 1.35 },
  h2: { fontSize: 11.5, fontFamily: "Helvetica-Bold", color: COLORS.dark, marginTop: 6, marginBottom: 3 },
  h3: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: COLORS.black, marginTop: 8, marginBottom: 3 },
  p: { fontSize: 8.5, color: COLORS.black, lineHeight: 1.4 },
  small: { fontSize: 7.5, color: COLORS.grayMuted },
  kpiRow: { flexDirection: "row", gap: 6, marginTop: 4, marginBottom: 6 },
  kpiCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 5,
    padding: 7,
  },
  kpiLabel: { fontSize: 6.5, color: COLORS.grayMuted, textTransform: "uppercase", letterSpacing: 1 },
  kpiValue: { fontSize: 14, fontFamily: "Helvetica-Bold", color: COLORS.dark, marginTop: 2 },
  tableWrap: {
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    overflow: "hidden",
  },
  trHeader: { flexDirection: "row", backgroundColor: COLORS.dark },
  thText: {
    color: COLORS.white,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: 4,
  },
  tr: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: COLORS.grayBorder,
    alignItems: "stretch",
  },
  td: { padding: 4, fontSize: 8, color: COLORS.black },
  badge: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 3,
    textAlign: "center",
  },
  legendRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 2, marginBottom: 5 },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendDot: { width: 7, height: 7, borderRadius: 4, marginRight: 3 },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 4,
    padding: 6,
    marginBottom: 4,
  },
  categoryHeaderTitle: { color: COLORS.white, fontSize: 12, fontFamily: "Helvetica-Bold" },
  categoryHeaderMeta: { color: COLORS.yellow, fontSize: 8, fontFamily: "Helvetica-Bold" },
  statusPill: { alignSelf: "flex-start", paddingVertical: 2, paddingHorizontal: 4, borderRadius: 3 },
  inactiveTag: {
    fontSize: 6.5,
    color: COLORS.grayMuted,
    fontFamily: "Helvetica-Oblique",
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
  guideRow: { flexDirection: "row", marginBottom: 3, alignItems: "flex-start" },
  guideBullet: { width: 9, height: 9, borderRadius: 5, marginTop: 1.5, marginRight: 6 },
  guideText: { flex: 1, fontSize: 8.5, color: COLORS.black, lineHeight: 1.4 },
});

const COLS = [
  { key: "item", label: "Marca · Modelo · Año", w: 26 },
  { key: "horas", label: "Horas", w: 7 },
  { key: "precio", label: "Precio Venturino", w: 13 },
  { key: "ref", label: "Precio de referencia", w: 14 },
  { key: "n", label: "Compar.", w: 7 },
  { key: "lvl", label: "Confianza", w: 11 },
  { key: "delta", label: "Diferencia", w: 8 },
  { key: "status", label: "Estado", w: 14 },
];
const COL_TOTAL = COLS.reduce((a, c) => a + c.w, 0);
const colStyle = (w: number) => ({ width: `${(w / COL_TOTAL) * 100}%` as `${number}%` });

// ─── Componentes PDF ───────────────────────────────────────────
function BrandBar({ subtitle, meta }: { subtitle?: string; meta: string[] }) {
  return (
    <View style={styles.brandBar}>
      <View style={{ flex: 1 }}>
        <Text style={styles.brandKicker}>Ricardo Venturino S.A. · John Deere</Text>
        <Text style={styles.brandTitle}>Radar de Mercado · Venturino vs Competencia</Text>
        {subtitle ? <Text style={styles.brandSub}>{subtitle}</Text> : null}
      </View>
      <View>
        {meta.map((m, i) => (
          <Text key={i} style={styles.brandMeta}>
            {m}
          </Text>
        ))}
      </View>
    </View>
  );
}

function Legend() {
  const items = [
    { c: COLORS.greenOk, t: "En línea con el mercado" },
    { c: COLORS.amberWarn, t: "A revisar: observar, barato u oportunidad" },
    { c: COLORS.redAlert, t: "Alerta: Venturino más caro" },
    { c: COLORS.grayMuted, t: "Sin comparables" },
  ];
  return (
    <View style={styles.legendRow}>
      {items.map((it, i) => (
        <View key={i} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: it.c }]} />
          <Text style={styles.small}>{it.t}</Text>
        </View>
      ))}
    </View>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <View style={[styles.statusPill, { backgroundColor: status.color }]}>
      <Text style={styles.badge}>{status.label}</Text>
    </View>
  );
}

function TableHeader() {
  return (
    <View style={styles.trHeader} fixed>
      {COLS.map((c) => (
        <Text key={c.key} style={[styles.thText, colStyle(c.w)]}>
          {c.label}
        </Text>
      ))}
    </View>
  );
}

function Row({ r, zebra }: { r: ReportRow; zebra: boolean }) {
  const bg = zebra ? COLORS.zebra : COLORS.white;
  const v = r.v;
  const itemLine = `${cleanStr(v.marca, 14)} · ${cleanStr(v.modelo, 18)}`;
  const yearLine = `Año ${v.anio ?? "—"}${v.hp_motor ? ` · ${Math.round(v.hp_motor)} HP` : ""}`;

  return (
    <View style={[styles.tr, { backgroundColor: bg }]} wrap={false}>
      <View style={[styles.td, colStyle(COLS[0].w)]}>
        <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold" }}>{itemLine}</Text>
        <Text style={styles.small}>{yearLine}</Text>
        {!v.active ? <Text style={styles.inactiveTag}>Histórico</Text> : null}
      </View>
      <Text style={[styles.td, colStyle(COLS[1].w)]}>
        {v.horas_uso != null ? v.horas_uso.toLocaleString("es-AR") : "—"}
      </Text>
      <Text style={[styles.td, colStyle(COLS[2].w), { fontFamily: "Helvetica-Bold" }]}>
        {fmtUsd(v.precio_nor)}
      </Text>
      <Text style={[styles.td, colStyle(COLS[3].w)]}>{fmtUsd(r.median)}</Text>
      <Text style={[styles.td, colStyle(COLS[4].w), { fontFamily: "Helvetica-Bold" }]}>
        {String(r.n)}
      </Text>
      <Text style={[styles.td, colStyle(COLS[5].w)]}>
        {r.level ? (r.expanded ? `${r.confidence} · ampliada` : r.confidence) : "—"}
      </Text>
      <Text
        style={[
          styles.td,
          colStyle(COLS[6].w),
          {
            fontFamily: "Helvetica-Bold",
            color: r.alertRed ? COLORS.redAlert : r.amberAlert ? COLORS.amberWarn : COLORS.black,
          },
        ]}
      >
        {fmtPct(r.delta)}
      </Text>
      <View style={[styles.td, colStyle(COLS[7].w)]}>
        <StatusBadge status={r.status} />
      </View>
    </View>
  );
}

function CategorySection({ categoria, rows }: { categoria: string; rows: ReportRow[] }) {
  const redAlerts = rows.filter((r) => r.alertRed);
  const ambers = rows.filter((r) => r.amberAlert).length;
  const noMarket = rows.filter((r) => !r.level).length;
  const topAlerts = [...redAlerts]
    .sort((a, b) => Math.abs(b.delta ?? 0) - Math.abs(a.delta ?? 0))
    .slice(0, 3);

  return (
    <View>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTitle}>{categoria}</Text>
        <Text style={styles.categoryHeaderMeta}>
          {`${rows.length} unidades · ${redAlerts.length} alertas · ${ambers} a revisar · ${noMarket} sin comparables`}
        </Text>
      </View>
      <Legend />
      <View style={styles.tableWrap}>
        <TableHeader />
        {rows.map((r, i) => (
          <Row key={i} r={r} zebra={i % 2 === 1} />
        ))}
      </View>
      {topAlerts.length > 0 ? (
        <View>
          <Text style={styles.h3}>Unidades donde Venturino está más caro</Text>
          {topAlerts.map((r, i) => (
            <View key={i} style={styles.alertBox} wrap={false}>
              <Text style={[styles.p, { fontFamily: "Helvetica-Bold" }]}>
                {`${cleanStr(r.v.marca, 14)} ${cleanStr(r.v.modelo, 22)} ${r.v.anio ?? ""} · ${fmtPct(r.delta)} por encima del precio de referencia (${r.n} comparables · confianza ${r.confidence.toLowerCase()})`}
              </Text>
              <Text style={styles.small}>
                {`Venturino ${fmtUsd(r.v.precio_nor)} · Referencia ${fmtUsd(r.median)}`}
              </Text>
              {r.top3.map((c, j) => (
                <Text key={j} style={styles.small}>
                  {`· ${cleanStr(c.empresa ?? c.origen ?? "—", 22)} — ${c.anio ?? "—"} · ${fmtHs(c.horas_uso)} · ${fmtUsd(c.precio_nor)}`}
                </Text>
              ))}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function GuideItem({ color, title, body }: { color: string; title: string; body: string }) {
  return (
    <View style={styles.guideRow}>
      <View style={[styles.guideBullet, { backgroundColor: color }]} />
      <Text style={styles.guideText}>
        <Text style={{ fontFamily: "Helvetica-Bold" }}>{title + ": "}</Text>
        {body}
      </Text>
    </View>
  );
}

function CoverPage({
  dateStr,
  totals,
  soloActivos,
  fxInfo,
}: {
  dateStr: string;
  totals: {
    totalItems: number;
    withMarket: number;
    redAlerts: number;
    noMarket: number;
    byCat: CategorySummary[];
  };
  soloActivos: boolean;
  fxInfo: FxInfo | null;
}) {
  const meta: string[] = [`Fecha: ${dateStr}`];
  const fxLine = fmtFxLine(fxInfo);
  if (fxLine) meta.push(fxLine);
  meta.push(soloActivos ? "Inventario: sólo activos" : "Inventario: completo");

  return (
    <Page size="A4" style={styles.page}>
      <BrandBar subtitle="Resumen ejecutivo" meta={meta} />

      <Text style={styles.h2}>¿Qué muestra este reporte?</Text>
      <Text style={styles.p}>
        Comparamos cada unidad del inventario de Venturino con publicaciones equivalentes de la
        competencia (Agrofy, Agroads, MercadoLibre, Rastroagro, MachineFinder y Agronorte). Para
        cada una calculamos un "precio de referencia" del mercado y marcamos con un color cuán
        alineado está el precio de Venturino.
      </Text>

      <Text style={styles.h3}>Cómo leer cada fila</Text>
      <View style={styles.guideBox}>
        <GuideItem
          color={COLORS.greenOk}
          title="En línea"
          body="Venturino está a ±5% del mercado. No requiere acción."
        />
        <GuideItem
          color={COLORS.amberWarn}
          title="Observar"
          body="Hay una diferencia de entre 5% y 10% en cualquier sentido. Vale la pena mirarlo."
        />
        <GuideItem
          color={COLORS.amberWarn}
          title="Barato · oportunidad"
          body="Venturino está más de 10% por debajo del mercado. Puede haber margen para ajustar el precio al alza."
        />
        <GuideItem
          color={COLORS.amberWarn}
          title="Revisar (pocos datos)"
          body="Venturino está caro, pero son pocos comparables o muy viejos. Mirar manualmente antes de mover el precio."
        />
        <GuideItem
          color={COLORS.redAlert}
          title="Alerta · caro"
          body="Venturino está más de 10% por encima del mercado con comparables suficientes. Recomendado revisar el precio."
        />
        <GuideItem
          color={COLORS.grayMuted}
          title="Sin comparables"
          body="No hay publicaciones similares activas que permitan comparar. Queda pendiente para la próxima corrida."
        />
      </View>

      <Text style={styles.h3}>Términos que vas a ver en las tablas</Text>
      <Text style={styles.p}>
        ·{" "}
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Precio de referencia</Text>
        {": el valor \"típico\" del mercado para esa unidad. Se calcula tomando el precio del medio entre todos los comparables (así un scrape con precio mal cargado no distorsiona).\n· "}
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Compar.</Text>
        {": cantidad de publicaciones del mercado que se usaron para calcular la referencia.\n· "}
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Confianza</Text>
        {": Alta = muchos comparables en años cercanos; Media = pocos cercanos o tuvimos que mirar años más lejanos; Baja = muy pocos comparables. Las alertas rojas sólo se disparan con confianza Alta o Media.\n· "}
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Diferencia</Text>
        {": cuánto más caro (+) o más barato (−) está Venturino respecto al precio de referencia.\n· "}
        <Text style={{ fontFamily: "Helvetica-Bold" }}>Histórico</Text>
        {": unidad del catálogo propio que no apareció en el último scraping del sitio. Se deja para tener más universo de comparación."}
      </Text>

      <Text style={styles.h2}>Números de este mes</Text>
      <View style={styles.kpiRow}>
        <Kpi label="Unidades analizadas" value={String(totals.totalItems)} />
        <Kpi label="Con mercado" value={String(totals.withMarket)} />
        <Kpi label="Alertas rojas" value={String(totals.redAlerts)} />
        <Kpi label="Sin comparables" value={String(totals.noMarket)} />
      </View>
      <Text style={styles.h3}>Por categoría</Text>
      <View style={styles.tableWrap}>
        <View style={styles.trHeader}>
          <Text style={[styles.thText, { width: "28%" }]}>Categoría</Text>
          <Text style={[styles.thText, { width: "12%" }]}>Unidades</Text>
          <Text style={[styles.thText, { width: "15%" }]}>Alertas</Text>
          <Text style={[styles.thText, { width: "15%" }]}>A revisar</Text>
          <Text style={[styles.thText, { width: "15%" }]}>En línea</Text>
          <Text style={[styles.thText, { width: "15%" }]}>Sin compar.</Text>
        </View>
        {totals.byCat.map((c, i) => (
          <View
            key={i}
            style={[styles.tr, { backgroundColor: i % 2 ? COLORS.zebra : COLORS.white }]}
          >
            <Text style={[styles.td, { width: "28%", fontFamily: "Helvetica-Bold" }]}>
              {c.categoria}
            </Text>
            <Text style={[styles.td, { width: "12%" }]}>{String(c.count)}</Text>
            <Text
              style={[
                styles.td,
                {
                  width: "15%",
                  color: c.red > 0 ? COLORS.redAlert : COLORS.black,
                  fontFamily: "Helvetica-Bold",
                },
              ]}
            >
              {String(c.red)}
            </Text>
            <Text style={[styles.td, { width: "15%" }]}>{String(c.amber)}</Text>
            <Text style={[styles.td, { width: "15%" }]}>{String(c.green)}</Text>
            <Text style={[styles.td, { width: "15%" }]}>{String(c.noMarket)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.footer} fixed>
        <Text>Venturino · Radar de Mercado</Text>
        <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}`} />
      </View>
    </Page>
  );
}

function CategoryPage({
  categoria,
  rows,
  dateStr,
  fxInfo,
}: {
  categoria: string;
  rows: ReportRow[];
  dateStr: string;
  fxInfo: FxInfo | null;
}) {
  const meta: string[] = [`Fecha: ${dateStr}`];
  const fxLine = fmtFxLine(fxInfo);
  if (fxLine) meta.push(fxLine);
  return (
    <Page size="A4" style={styles.page}>
      <BrandBar subtitle={`Detalle · ${categoria}`} meta={meta} />
      <CategorySection categoria={categoria} rows={rows} />
      <View style={styles.footer} fixed>
        <Text>Venturino · {categoria}</Text>
        <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} / ${totalPages}`} />
      </View>
    </Page>
  );
}

// ─── Entry point ───────────────────────────────────────────────
export type GenerateVenturinoReportOptions = {
  prisma: PrismaClient;
  categoria?: string | null;
  soloActivos?: boolean;
};

export type GenerateVenturinoReportResult = {
  buffer: Buffer;
  filename: string;
  meta: {
    dateStr: string;
    totalItems: number;
    redAlerts: number;
    noMarket: number;
    byCat: CategorySummary[];
    fx: FxInfo | null;
  };
};

export async function generateVenturinoPdfBuffer(
  options: GenerateVenturinoReportOptions,
): Promise<GenerateVenturinoReportResult> {
  const { prisma, categoria = null, soloActivos = false } = options;

  const competitorsWhere: Record<string, unknown> = { active: true, origen: { not: "venturino" } };
  if (categoria) competitorsWhere.categoria = categoria;
  const competitorsRows = await prisma.listing.findMany({ where: competitorsWhere });

  const venturinoWhere: Record<string, unknown> = { origen: "venturino" };
  if (categoria) venturinoWhere.categoria = categoria;
  if (soloActivos) venturinoWhere.active = true;
  const venturinoRows = await prisma.listing.findMany({ where: venturinoWhere });

  const competitorsAll = competitorsRows
    .map((r) => toItem(r as Parameters<typeof toItem>[0]))
    .filter((r) => {
      if (!r.marca_norm || !r.modelo_norm) return false;
      if (isSelfCompany(r.empresa)) return false;
      if (isMarketplaceRow(r)) return false;
      return true;
    });
  const venturinoAll = venturinoRows
    .map((r) => toItem(r as Parameters<typeof toItem>[0]))
    .filter((r) => r.marca_norm && r.modelo_norm);

  let fxInfo: FxInfo | null = null;
  try {
    const latestFx = await prisma.fxRate.findFirst({ orderBy: { createdAt: "desc" } });
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

  const present = Array.from(new Set(venturinoAll.map((v) => v.categoria).filter(Boolean)));
  const orderedCats = CATEGORIES_ORDER.filter((c) => present.includes(c));
  present.forEach((c) => {
    if (c && !orderedCats.includes(c)) orderedCats.push(c);
  });

  if (orderedCats.length === 0) {
    throw new Error("No hay unidades de Venturino con marca+modelo en la base.");
  }

  const byCat: Record<string, ReportRow[]> = {};
  const catSummary: CategorySummary[] = [];
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
    const green = rows.filter((r) => r.status.tone === "green").length;
    const nm = rows.filter((r) => !r.level).length;

    catSummary.push({ categoria: cat, count: rows.length, red, amber, green, noMarket: nm });
    totalItems += rows.length;
    withMarket += rows.filter((r) => r.level).length;
    redAlerts += red;
    amberCount += amber;
    greenCount += green;
    noMarket += nm;
  }

  const now = new Date();
  const dateStr = fmtDate(now);

  const doc = (
    <Document
      title="Venturino vs Mercado"
      author="Ricardo Venturino S.A."
      subject="Radar de Mercado"
    >
      <CoverPage
        dateStr={dateStr}
        soloActivos={!!soloActivos}
        fxInfo={fxInfo}
        totals={{ totalItems, withMarket, redAlerts, noMarket, byCat: catSummary }}
      />
      {orderedCats.map((cat) => (
        <CategoryPage
          key={cat}
          categoria={cat}
          rows={byCat[cat]}
          dateStr={dateStr}
          fxInfo={fxInfo}
        />
      ))}
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  const filename = `venturino-vs-mercado-${dateStr}${categoria ? "-" + categoria.toLowerCase() : ""}.pdf`;

  // Nota: `amberCount` y `greenCount` quedan disponibles via `catSummary` si se necesitan,
  // no los exponemos en meta para no inflar la respuesta.
  void amberCount;
  void greenCount;

  return {
    buffer,
    filename,
    meta: { dateStr, totalItems, redAlerts, noMarket, byCat: catSummary, fx: fxInfo },
  };
}
