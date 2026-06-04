const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "..", "data", "postventa_match_analysis.json");
const REPORT_PATH = path.join(__dirname, "..", "reports", "postventa-benchmark-evaluation.md");
const JSON_PATH = path.join(__dirname, "..", "data", "postventa_benchmark_evaluation.json");

const CI_MODE = process.argv.includes("--ci");

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`No existe ${INPUT_PATH}. Ejecutar primero npm run analysis:postventa-matches.`);
  }

  const payload = JSON.parse(fs.readFileSync(INPUT_PATH, "utf8"));
  const results = payload.results || [];
  if (results.length === 0) {
    throw new Error("El análisis postventa no contiene resultados para evaluar.");
  }

  const evaluation = buildEvaluation(payload, results);
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, renderMarkdown(evaluation), "utf8");
  fs.writeFileSync(JSON_PATH, JSON.stringify(evaluation, null, 2), "utf8");

  console.log(`Reporte evaluación: ${REPORT_PATH}`);
  console.log(`JSON evaluación: ${JSON_PATH}`);
  console.log(`Gates: ${evaluation.gates.filter((gate) => gate.pass).length}/${evaluation.gates.length} OK`);
  console.log(`Cobertura comparable: ${formatPct(evaluation.kpis.comparableRate)}`);
  console.log(`Sin comparable: ${formatPct(evaluation.kpis.noComparableRate)}`);
  console.log(`Baja confianza: ${formatPct(evaluation.kpis.lowConfidenceRate)}`);

  if (CI_MODE && evaluation.gates.some((gate) => !gate.pass)) {
    process.exitCode = 1;
  }
}

function buildEvaluation(payload, results) {
  const total = results.length;
  const statusCounts = countBy(results, (row) => row.match.status);
  const comparable = results.filter((row) => row.match.status !== "sin comparable");
  const lowConfidence = results.filter((row) => row.match.status === "baja confianza");
  const noComparable = results.filter((row) => row.match.status === "sin comparable");
  const actionableMoreExpensive = comparable.filter(isActionableMoreExpensive);
  const actionableCheaper = comparable.filter(isActionableCheaper);
  const ambiguous = comparable.filter((row) => row.match.totalValidBeforeTop >= 50 || row.match.candidates.length >= 20);
  const thinEvidence = comparable.filter((row) => row.match.strongCandidateCount < 2);

  const byType = summarizeByType(results);
  const kpis = {
    total,
    comparable: comparable.length,
    comparableRate: comparable.length / total,
    noComparable: noComparable.length,
    noComparableRate: noComparable.length / total,
    lowConfidence: lowConfidence.length,
    lowConfidenceRate: lowConfidence.length / total,
    actionableMoreExpensive: actionableMoreExpensive.length,
    actionableCheaper: actionableCheaper.length,
    ambiguous: ambiguous.length,
    thinEvidence: thinEvidence.length,
    totalCandidates: results.reduce((acc, row) => acc + row.match.candidates.length, 0),
  };

  const gates = [
    gate("coverage_min_45", kpis.comparableRate >= 0.45, `Cobertura comparable ${formatPct(kpis.comparableRate)} >= 45%`),
    gate("no_comparable_max_55", kpis.noComparableRate <= 0.55, `Sin comparable ${formatPct(kpis.noComparableRate)} <= 55%`),
    gate("low_confidence_max_5", kpis.lowConfidenceRate <= 0.05, `Baja confianza ${formatPct(kpis.lowConfidenceRate)} <= 5%`),
    gate("similar_status_present", (statusCounts["similar a ML"] || 0) > 0, "El estado similar a ML está presente"),
    gate(
      "actionable_gaps_present",
      kpis.actionableMoreExpensive + kpis.actionableCheaper >= 10,
      `Brechas accionables detectadas: ${kpis.actionableMoreExpensive + kpis.actionableCheaper}`,
    ),
  ];

  return {
    generatedAt: new Date().toISOString(),
    source: {
      analysisGeneratedAt: payload.generatedAt,
      mongo: payload.mongo,
      params: payload.params,
      counts: payload.counts,
    },
    kpis,
    statusCounts,
    gates,
    byType,
    samples: {
      actionableMoreExpensive: actionableMoreExpensive.slice(0, 15).map(compactRow),
      actionableCheaper: actionableCheaper.slice(0, 15).map(compactRow),
      noComparable: noComparable.slice(0, 20).map(compactRow),
      lowConfidence: lowConfidence.map(compactRow),
      ambiguous: ambiguous.slice(0, 15).map(compactRow),
      thinEvidence: thinEvidence.slice(0, 15).map(compactRow),
    },
    recommendations: buildRecommendations({ kpis, byType }),
  };
}

function isActionableMoreExpensive(row) {
  return (
    row.match.status === "Venturino más caro que ML" &&
    row.match.bestConfidence !== "baja" &&
    row.match.strongCandidateCount > 0 &&
    row.match.ventVsMedianPct !== null &&
    row.match.ventVsMedianPct >= 0.1
  );
}

function isActionableCheaper(row) {
  return (
    row.match.status === "Venturino más barato que ML" &&
    row.match.bestConfidence !== "baja" &&
    row.match.strongCandidateCount > 0 &&
    row.match.ventVsMedianPct !== null &&
    row.match.ventVsMedianPct <= -0.1
  );
}

function summarizeByType(results) {
  const map = new Map();
  for (const row of results) {
    const type = getType(row);
    if (!map.has(type)) {
      map.set(type, {
        type,
        total: 0,
        comparable: 0,
        noComparable: 0,
        similar: 0,
        moreExpensive: 0,
        cheaper: 0,
        lowConfidence: 0,
        actionable: 0,
      });
    }
    const item = map.get(type);
    item.total += 1;
    if (row.match.status === "sin comparable") item.noComparable += 1;
    else item.comparable += 1;
    if (row.match.status === "similar a ML") item.similar += 1;
    if (row.match.status === "Venturino más caro que ML") item.moreExpensive += 1;
    if (row.match.status === "Venturino más barato que ML") item.cheaper += 1;
    if (row.match.status === "baja confianza") item.lowConfidence += 1;
    if (isActionableMoreExpensive(row) || isActionableCheaper(row)) item.actionable += 1;
  }

  return Array.from(map.values())
    .map((item) => ({
      ...item,
      comparableRate: item.comparable / item.total,
      noComparableRate: item.noComparable / item.total,
    }))
    .sort((a, b) => b.total - a.total || b.actionable - a.actionable);
}

function buildRecommendations({ kpis, byType }) {
  const recommendations = [];
  const weakTypes = byType.filter((item) => item.total >= 2 && item.noComparableRate >= 0.8).slice(0, 8);
  const strongTypes = byType.filter((item) => item.total >= 2 && item.comparableRate >= 0.7).slice(0, 8);

  recommendations.push("Usar el reporte como benchmark comercial cuando el estado sea similar, más caro, más barato o baja confianza; separar explícitamente sin comparable.");
  recommendations.push("Priorizar revisión de productos más caros con brecha >= 10% y confianza media/alta; son las oportunidades comerciales más accionables.");
  recommendations.push("No usar productos sin comparable como señal de precio; usarlos como backlog de mejora del diccionario o como evidencia de falta de mercado comparable.");

  if (kpis.noComparableRate > 0.45) {
    recommendations.push("Mejorar cobertura de tipos técnicos: el porcentaje sin comparable sigue cerca de la mitad del catálogo.");
  }
  if (weakTypes.length > 0) {
    recommendations.push(`Tipos con baja cobertura para iterar diccionario: ${weakTypes.map((item) => item.type).join(", ")}.`);
  }
  if (strongTypes.length > 0) {
    recommendations.push(`Tipos con mejor señal actual: ${strongTypes.map((item) => item.type).join(", ")}.`);
  }

  return recommendations;
}

function renderMarkdown(evaluation) {
  const lines = [];
  lines.push("# Evaluación Benchmark Postventa");
  lines.push("");
  lines.push(`Generado: ${evaluation.generatedAt}`);
  lines.push(`Análisis base: ${evaluation.source.analysisGeneratedAt}`);
  lines.push("");
  lines.push("## KPIs");
  lines.push("");
  lines.push(`- Productos Venturino evaluados: ${evaluation.kpis.total}`);
  lines.push(`- Productos con comparable: ${evaluation.kpis.comparable} (${formatPct(evaluation.kpis.comparableRate)})`);
  lines.push(`- Productos sin comparable: ${evaluation.kpis.noComparable} (${formatPct(evaluation.kpis.noComparableRate)})`);
  lines.push(`- Baja confianza: ${evaluation.kpis.lowConfidence} (${formatPct(evaluation.kpis.lowConfidenceRate)})`);
  lines.push(`- Brechas accionables Venturino más caro: ${evaluation.kpis.actionableMoreExpensive}`);
  lines.push(`- Brechas accionables Venturino más barato: ${evaluation.kpis.actionableCheaper}`);
  lines.push(`- Casos ambiguos por muchos candidatos: ${evaluation.kpis.ambiguous}`);
  lines.push(`- Casos con evidencia fina: ${evaluation.kpis.thinEvidence}`);
  lines.push("");
  lines.push("## Gates de Calidad");
  lines.push("");
  lines.push("| Gate | Estado | Evidencia |");
  lines.push("|---|---|---|");
  evaluation.gates.forEach((gateItem) => {
    lines.push(`| ${gateItem.id} | ${gateItem.pass ? "OK" : "REVISAR"} | ${escapeCell(gateItem.evidence)} |`);
  });
  lines.push("");
  lines.push("## Estados");
  lines.push("");
  lines.push("| Estado | Cantidad |");
  lines.push("|---|---:|");
  Object.entries(evaluation.statusCounts).forEach(([status, count]) => {
    lines.push(`| ${status} | ${count} |`);
  });
  lines.push("");
  lines.push("## Cobertura por Tipo");
  lines.push("");
  lines.push("| Tipo | Total | Comparable | Sin comparable | Similar | Más caro | Más barato | Baja confianza | Accionables |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|");
  evaluation.byType.forEach((item) => {
    lines.push(
      `| ${item.type} | ${item.total} | ${item.comparable} | ${item.noComparable} | ${item.similar} | ${item.moreExpensive} | ${item.cheaper} | ${item.lowConfidence} | ${item.actionable} |`,
    );
  });
  lines.push("");
  lines.push("## Muestras para Iteración");
  lines.push("");
  renderSample(lines, "Más caro accionable", evaluation.samples.actionableMoreExpensive);
  renderSample(lines, "Más barato accionable", evaluation.samples.actionableCheaper);
  renderSample(lines, "Sin comparable", evaluation.samples.noComparable);
  renderSample(lines, "Baja confianza", evaluation.samples.lowConfidence);
  lines.push("## Recomendaciones");
  lines.push("");
  evaluation.recommendations.forEach((item) => lines.push(`- ${item}`));
  lines.push("");
  return lines.join("\n");
}

function renderSample(lines, title, rows) {
  lines.push(`### ${title}`);
  lines.push("");
  if (rows.length === 0) {
    lines.push("_Sin casos._");
    lines.push("");
    return;
  }
  lines.push("| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |");
  lines.push("|---|---|---|---:|---:|---:|---|---:|---|");
  rows.forEach((row) => {
    lines.push(
      `| ${escapeCell(row.name)} | ${row.type} | ${row.status} | ${formatMoney(row.price)} | ${formatMoney(row.medianMlPrice)} | ${formatPct(row.ventVsMedianPct)} | ${row.bestConfidence} | ${row.candidates} | ${escapeCell(row.bestCandidateName || "-")} |`,
    );
  });
  lines.push("");
}

function compactRow(row) {
  const bestCandidate = row.match.candidates[0] || null;
  return {
    id: row.venturino.id,
    name: row.venturino.name,
    type: getType(row),
    price: row.venturino.price,
    status: row.match.status,
    medianMlPrice: row.match.median,
    ventVsMedianPct: row.match.ventVsMedianPct,
    bestConfidence: row.match.bestConfidence,
    strongCandidateCount: row.match.strongCandidateCount,
    candidates: row.match.candidates.length,
    totalValidBeforeTop: row.match.totalValidBeforeTop,
    excludedByPrice: row.match.excludedByPrice,
    excludedByScore: row.match.excludedByScore,
    bestCandidateName: bestCandidate?.name || null,
    bestCandidateScore: bestCandidate?.score || null,
    bestCandidateConfidence: bestCandidate?.confidence || null,
  };
}

function getType(row) {
  return row.venturino?.features?.types?.[0] || "SIN_TIPO";
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function gate(id, pass, evidence) {
  return { id, pass, evidence };
}

function formatPct(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "-";
  return `${(value * 100).toFixed(1)}%`;
}

function formatMoney(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "-";
  return `$${Math.round(value).toLocaleString("es-AR")}`;
}

function escapeCell(value) {
  return (value || "-").toString().replace(/\|/g, "\\|").replace(/\n/g, " ");
}

main();
