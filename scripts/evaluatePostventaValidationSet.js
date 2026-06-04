const fs = require("fs");
const path = require("path");

const ANALYSIS_PATH = path.join(__dirname, "..", "data", "postventa_match_analysis.json");
const VALIDATION_PATH = path.join(__dirname, "..", "data", "postventa_validation_set.json");
const REPORT_PATH = path.join(__dirname, "..", "reports", "postventa-validation-results.md");
const JSON_PATH = path.join(__dirname, "..", "data", "postventa_validation_results.json");

const CI_MODE = process.argv.includes("--ci");

function main() {
  const analysis = readJson(ANALYSIS_PATH);
  const validationSet = readJson(VALIDATION_PATH);
  const results = analysis.results || [];
  if (results.length === 0) {
    throw new Error("El análisis postventa no contiene resultados. Ejecutar primero npm run analysis:postventa-matches.");
  }

  const evaluation = evaluateValidationSet({ analysis, validationSet, results });
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, renderMarkdown(evaluation), "utf8");
  fs.writeFileSync(JSON_PATH, JSON.stringify(evaluation, null, 2), "utf8");

  console.log(`Reporte validation set: ${REPORT_PATH}`);
  console.log(`JSON validation set: ${JSON_PATH}`);
  console.log(`Gates: ${evaluation.gates.filter((gate) => gate.pass).length}/${evaluation.gates.length} OK`);
  console.log(`Casos: ${evaluation.kpis.total}`);
  console.log(`Positivos correctos: ${evaluation.kpis.validComparablePassed}/${evaluation.kpis.validComparableTotal}`);
  console.log(`Falsos positivos accionables: ${evaluation.kpis.actionableFalsePositives}`);

  if (CI_MODE && evaluation.gates.some((gate) => !gate.pass)) {
    process.exitCode = 1;
  }
}

function evaluateValidationSet({ analysis, validationSet, results }) {
  const byVenturinoId = new Map(results.map((row) => [String(row.venturino.id), row]));
  const itemResults = validationSet.items.map((item) => evaluateItem(item, byVenturinoId.get(item.venturinoProductId)));
  const missing = itemResults.filter((item) => item.result === "missing");
  const failed = itemResults.filter((item) => item.result === "fail");
  const warnings = itemResults.filter((item) => item.result === "warning");
  const passed = itemResults.filter((item) => item.result === "pass");
  const validComparable = itemResults.filter((item) => item.expectedLabel === "valid_comparable");
  const actionableFalsePositives = itemResults.filter((item) => item.actionableFalsePositive);
  const rejectedMlActionable = itemResults.filter((item) => item.rejectedMlActionable);

  const kpis = {
    total: itemResults.length,
    passed: passed.length,
    warnings: warnings.length,
    failed: failed.length,
    missing: missing.length,
    validComparableTotal: validComparable.length,
    validComparablePassed: validComparable.filter((item) => item.result === "pass").length,
    actionableFalsePositives: actionableFalsePositives.length,
    rejectedMlActionable: rejectedMlActionable.length,
  };

  const gates = [
    gate("all_items_present", kpis.missing === 0, `Casos ausentes en análisis: ${kpis.missing}`),
    gate(
      "positive_recall",
      kpis.validComparablePassed === kpis.validComparableTotal,
      `Positivos correctos ${kpis.validComparablePassed}/${kpis.validComparableTotal}`,
    ),
    gate(
      "no_actionable_false_positives",
      kpis.actionableFalsePositives === 0,
      `Falsos positivos accionables: ${kpis.actionableFalsePositives}`,
    ),
    gate(
      "no_rejected_ml_actionable",
      kpis.rejectedMlActionable === 0,
      `Candidatos ML rechazados en estados accionables: ${kpis.rejectedMlActionable}`,
    ),
    gate("no_strict_failures", kpis.failed === 0, `Fallos estrictos: ${kpis.failed}`),
  ];

  return {
    generatedAt: new Date().toISOString(),
    validationSet: {
      version: validationSet.version,
      createdAt: validationSet.createdAt,
      sourceAnalysisFile: validationSet.sourceAnalysisFile,
    },
    source: {
      analysisGeneratedAt: analysis.generatedAt,
      mongo: analysis.mongo,
      params: analysis.params,
      counts: analysis.counts,
    },
    kpis,
    gates,
    items: itemResults,
  };
}

function evaluateItem(item, row) {
  if (!row) {
    return {
      ...baseItem(item),
      result: "missing",
      actualStatus: null,
      actualCandidateIds: [],
      message: "Producto no encontrado en el análisis actual.",
      actionableFalsePositive: false,
      rejectedMlActionable: false,
    };
  }

  const actualStatus = row.match.status;
  const actualCandidateIds = row.match.candidates.map((candidate) => String(candidate.id));
  const actionable = isComparableStatus(actualStatus);
  const acceptedIds = new Set((item.acceptedMlIds || []).map(String));
  const rejectedIds = new Set((item.rejectedMlIds || []).map(String));
  const acceptedHit = acceptedIds.size === 0 || actualCandidateIds.some((id) => acceptedIds.has(id));
  const rejectedHit = actualCandidateIds.some((id) => rejectedIds.has(id));
  const rejectedMlActionable = actionable && rejectedHit;
  const actionableFalsePositive = item.expectedOutcome !== "comparable" && actionable;

  let result = "pass";
  let message = "OK";

  if (item.expectedOutcome === "comparable") {
    if (!actionable) {
      result = "fail";
      message = `Se esperaba comparable y quedó ${actualStatus}.`;
    } else if (!acceptedHit) {
      result = "fail";
      message = "No apareció ningún ML aceptado entre los candidatos.";
    }
  } else if (item.expectedOutcome === "sin comparable") {
    if (actualStatus !== "sin comparable") {
      result = "fail";
      message = `Se esperaba sin comparable y quedó ${actualStatus}.`;
    }
  } else if (item.expectedOutcome === "baja confianza") {
    if (actualStatus === "baja confianza") {
      result = "pass";
      message = "OK";
    } else if (actualStatus === "sin comparable") {
      result = "warning";
      message = "Resultado más conservador que la etiqueta: sin comparable.";
    } else {
      result = "fail";
      message = `Se esperaba baja confianza o sin comparable y quedó ${actualStatus}.`;
    }
  }

  if (rejectedMlActionable) {
    result = "fail";
    message = "Un candidato ML marcado como rechazado quedó en un estado accionable.";
  } else if (result === "pass" && rejectedHit) {
    result = "warning";
    message = "Candidato ML rechazado presente sólo en estado no accionable.";
  }

  return {
    ...baseItem(item),
    result,
    actualStatus,
    actualCandidateIds,
    actualBestCandidate: row.match.candidates[0]?.name || null,
    actualBestCandidateId: row.match.candidates[0]?.id || null,
    actualBestConfidence: row.match.bestConfidence,
    actualStrongCandidateCount: row.match.strongCandidateCount,
    message,
    actionableFalsePositive,
    rejectedMlActionable,
  };
}

function baseItem(item) {
  return {
    id: item.id,
    venturinoProductId: item.venturinoProductId,
    name: item.name,
    family: item.family,
    expectedLabel: item.expectedLabel,
    expectedOutcome: item.expectedOutcome,
  };
}

function renderMarkdown(evaluation) {
  const lines = [];
  lines.push("# Resultado Validation Set Postventa");
  lines.push("");
  lines.push(`Generado: ${evaluation.generatedAt}`);
  lines.push(`Validation set: ${evaluation.validationSet.version}`);
  lines.push(`Análisis base: ${evaluation.source.analysisGeneratedAt}`);
  lines.push("");
  lines.push("## KPIs");
  lines.push("");
  lines.push(`- Casos evaluados: ${evaluation.kpis.total}`);
  lines.push(`- Pass: ${evaluation.kpis.passed}`);
  lines.push(`- Warnings: ${evaluation.kpis.warnings}`);
  lines.push(`- Fail: ${evaluation.kpis.failed}`);
  lines.push(`- Missing: ${evaluation.kpis.missing}`);
  lines.push(`- Positivos correctos: ${evaluation.kpis.validComparablePassed}/${evaluation.kpis.validComparableTotal}`);
  lines.push(`- Falsos positivos accionables: ${evaluation.kpis.actionableFalsePositives}`);
  lines.push("");
  lines.push("## Gates");
  lines.push("");
  lines.push("| Gate | Estado | Evidencia |");
  lines.push("|---|---|---|");
  evaluation.gates.forEach((gateItem) => {
    lines.push(`| ${gateItem.id} | ${gateItem.pass ? "OK" : "REVISAR"} | ${escapeCell(gateItem.evidence)} |`);
  });
  lines.push("");
  lines.push("## Casos");
  lines.push("");
  lines.push("| Caso | Familia | Esperado | Actual | Resultado | Mejor candidato | Mensaje |");
  lines.push("|---|---|---|---|---|---|---|");
  evaluation.items.forEach((item) => {
    lines.push(
      `| ${item.id} | ${item.family} | ${item.expectedOutcome} | ${item.actualStatus || "-"} | ${item.result} | ${escapeCell(
        item.actualBestCandidate || "-",
      )} | ${escapeCell(item.message)} |`,
    );
  });
  lines.push("");
  return lines.join("\n");
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`No existe ${filePath}.`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isComparableStatus(status) {
  return status === "similar a ML" || status === "Venturino más caro que ML" || status === "Venturino más barato que ML";
}

function gate(id, pass, evidence) {
  return { id, pass, evidence };
}

function escapeCell(value) {
  return (value || "-").toString().replace(/\|/g, "\\|").replace(/\n/g, " ");
}

main();
