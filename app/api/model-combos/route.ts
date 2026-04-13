import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadAllListings } from "@/lib/data/loadListings";
import { matchesModelComboQuery, topModelCombos } from "@/lib/stats/aggregations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria") ?? undefined;
    const estado = searchParams.get("estado") ?? undefined;
    const q = searchParams.get("q")?.trim() ?? "";
    const limitRaw = Number(searchParams.get("limit") ?? 30);
    const limit = Math.max(1, Math.min(Number.isFinite(limitRaw) ? limitRaw : 30, 100));

    const dataset = await loadAllListings(categoria, estado);
    const combos = topModelCombos(dataset.rows, dataset.rows.length);
    const filtered = q ? combos.filter((combo) => matchesModelComboQuery(combo, q)) : combos;

    return NextResponse.json({
      combos: filtered.slice(0, limit),
      total: filtered.length,
    });
  } catch (error) {
    console.error("[api/model-combos] Failed", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "No se pudieron buscar modelos.", detail },
      { status: 500 },
    );
  }
}
