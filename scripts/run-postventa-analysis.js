/**
 * Trigger persisted postventa analysis through the local Next.js API.
 *
 * Usage:
 *   node scripts/run-postventa-analysis.js [--top 20] [--price-band 0.4] [--min-score 20]
 *
 * The API only accepts localhost requests. Run this inside the app container or
 * from the same host where Next.js is listening.
 */

const DEFAULT_URL = process.env.POSTVENTA_ANALYSIS_URL || "http://127.0.0.1:3000/api/postventa/analyze";

async function main() {
  const body = parseArgs(process.argv.slice(2));
  console.log("=== Postventa persisted analysis ===");
  console.log(`Endpoint: ${DEFAULT_URL}`);
  console.log(`Options: ${JSON.stringify(body)}`);

  const response = await fetch(DEFAULT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error || `HTTP ${response.status}`;
    throw new Error(message);
  }

  console.log("=== RESULTS ===");
  console.log(`  Analysis run:      #${payload.analysisRunId}`);
  console.log(`  Algorithm version: ${payload.algorithmVersion}`);
  console.log(`  Venturino products:${payload.summary.venturinoProducts}`);
  console.log(`  ML products:       ${payload.summary.mlProducts}`);
  console.log(`  Total candidates:  ${payload.summary.totalCandidates}`);
  console.log(`  Status counts:     ${JSON.stringify(payload.summary.statusCounts)}`);
}

function parseArgs(argv) {
  const out = {};
  argv.forEach((arg, index) => {
    const next = argv[index + 1];
    if (arg === "--top" && next) out.topN = Number(next);
    if (arg === "--price-band" && next) out.priceBand = Number(next);
    if (arg === "--min-score" && next) out.minScore = Number(next);
  });
  return out;
}

main().catch((error) => {
  console.error("Postventa analysis error:", error);
  process.exit(1);
});
