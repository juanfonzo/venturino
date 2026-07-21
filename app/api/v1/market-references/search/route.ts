import type { NextRequest } from "next/server";
import { handleMarketReferenceRequest } from "@/lib/market-reference/handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return handleMarketReferenceRequest(request, "expanded");
}
