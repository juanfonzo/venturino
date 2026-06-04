import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { listPostventaProducts } from "@/lib/postventa/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await listPostventaProducts({
      analysisRunId: parseNumberParam(searchParams.get("analysisRunId")),
      page: parseNumberParam(searchParams.get("page")),
      pageSize: parseNumberParam(searchParams.get("pageSize")),
      search: searchParams.get("search"),
      status: searchParams.get("status"),
      confidence: searchParams.get("confidence"),
      sortBy: searchParams.get("sortBy"),
      sortDir: searchParams.get("sortDir"),
    });
    return NextResponse.json(result);
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
