import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  return NextResponse.json(
    { error: "Endpoint legacy deshabilitado. Usa /explorador y /api/tractors." },
    { status: 410 },
  );
}

