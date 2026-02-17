import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildStats } from "@/lib/stats/buildStats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria") ?? undefined;
    const stats = await buildStats(categoria);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[api/stats] Failed to compute stats", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "No se pudo calcular estadisticas.", detail },
      { status: 500 },
    );
  }
}
