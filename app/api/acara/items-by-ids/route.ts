import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadAcara } from "@/lib/data/loadAcara";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ids = isRecord(body) && Array.isArray(body.ids) ? body.ids : [];
    if (ids.length === 0) {
      return NextResponse.json({ rows: [] });
    }

    const acara = await loadAcara();
    const idSet = new Set(ids);
    const rows = acara.items.filter((item) => idSet.has(item.id));

    return NextResponse.json({ rows });
  } catch (error) {
    return NextResponse.json({ error: "No se pudo cargar referencias." }, { status: 500 });
  }
}
