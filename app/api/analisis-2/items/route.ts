import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { listAnalisis2Items } from "@/lib/analysis/analisis2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseIntParam(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const empresa = (searchParams.get("empresa") ?? "").toString().trim();
    if (!empresa) {
      return NextResponse.json({ error: "Falta parametro empresa" }, { status: 400 });
    }

    const limit = parseIntParam(searchParams.get("limit"), 200);

    const data = await listAnalisis2Items({ empresa, limit });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "No se pudo listar publicaciones." }, { status: 500 });
  }
}
