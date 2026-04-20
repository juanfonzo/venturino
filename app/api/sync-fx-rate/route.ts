import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fullFxSync, getCurrentFxRate } from "@/lib/fx-rate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isLocalRequest(request: NextRequest): boolean {
  const host = request.headers.get("host") ?? "";
  return host.startsWith("127.0.0.1") || host.startsWith("localhost");
}

/**
 * GET: return current FX rate from database.
 */
export async function GET() {
  try {
    const rate = await getCurrentFxRate();
    return NextResponse.json({ rate });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST: fetch DolarAPI, store rate, recalculate listings prices.
 * Only accessible from localhost (cron) or with valid session.
 */
export async function POST(request: NextRequest) {
  if (!isLocalRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const result = await fullFxSync();
    console.log(`[sync-fx-rate] rate=${result.rate} source=${result.source} listingsUpdated=${result.listingsUpdated}`);
    return NextResponse.json({
      ok: true,
      rate: result.rate,
      source: result.source,
      sourceDate: result.sourceDate?.toISOString() ?? null,
      listingsUpdated: result.listingsUpdated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[sync-fx-rate] ERROR: ${message}`);

    // Return current rate as fallback info
    let fallbackRate: number | null = null;
    try {
      fallbackRate = await getCurrentFxRate();
    } catch {
      // ignore
    }

    return NextResponse.json(
      {
        ok: false,
        error: message,
        fallbackRate,
      },
      { status: 502 },
    );
  }
}
