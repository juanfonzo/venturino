import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { runPostventaAnalysis } from "@/lib/postventa/run-analysis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isLocalRequest(request: NextRequest): boolean {
  const host = request.headers.get("host") ?? "";
  return host.startsWith("127.0.0.1") || host.startsWith("localhost");
}

function asNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export async function POST(request: NextRequest) {
  if (!isLocalRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const result = await runPostventaAnalysis({
      topN: asNumber(body.topN),
      priceBand: asNumber(body.priceBand),
      minScore: asNumber(body.minScore),
      similarityThreshold: asNumber(body.similarityThreshold),
    });

    console.log(
      `[postventa-analyze] run=${result.analysisRunId} version=${result.algorithmVersion} candidates=${result.summary.totalCandidates}`,
    );

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[postventa-analyze] ERROR: ${message}`);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
