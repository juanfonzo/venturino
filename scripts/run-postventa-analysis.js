/**
 * Trigger persisted postventa analysis using the same service as the app.
 *
 * Usage:
 *   node scripts/run-postventa-analysis.js [--top 20] [--price-band 0.4] [--min-score 20] [--similarity-threshold 0.1]
 */

const { loadEnvFile } = require("./pipeline-shared");
const { requireTypeScript } = require("./register-ts");

loadEnvFile();

async function main() {
  const options = parseArgs(process.argv.slice(2));
  console.log("=== Postventa persisted analysis ===");
  console.log("Runtime: lib/postventa/run-analysis.ts");
  console.log(`Options: ${JSON.stringify(options)}`);

  const { runPostventaAnalysis } = requireTypeScript("lib/postventa/run-analysis.ts");
  const payload = await runPostventaAnalysis(options);

  console.log("=== RESULTS ===");
  console.log(`  Analysis run:      #${payload.analysisRunId}`);
  console.log(`  Algorithm version: ${payload.algorithmVersion}`);
  console.log(`  Venturino products:${payload.summary.venturinoProducts}`);
  console.log(`  ML products:       ${payload.summary.mlProducts}`);
  console.log(`  Total candidates:  ${payload.summary.totalCandidates}`);
  console.log(`  Similar threshold: ${payload.options.similarityThreshold}`);
  console.log(`  Status counts:     ${JSON.stringify(payload.summary.statusCounts)}`);
}

function parseArgs(argv) {
  const out = {};
  argv.forEach((arg, index) => {
    const next = argv[index + 1];
    if (arg === "--top" && next) out.topN = Number(next);
    if (arg === "--price-band" && next) out.priceBand = Number(next);
    if (arg === "--min-score" && next) out.minScore = Number(next);
    if (arg === "--similarity-threshold" && next) out.similarityThreshold = Number(next);
  });
  return out;
}

main().catch((error) => {
  console.error("Postventa analysis error:", error);
  process.exit(1);
});
