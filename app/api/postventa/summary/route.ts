import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPostventaSummary } from "@/lib/postventa/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const analysisRunId = parseNumberParam(searchParams.get("analysisRunId"));
    const summary = await getPostventaSummary(analysisRunId);
    return NextResponse.json(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function parseNumberParam(value: string | null) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
