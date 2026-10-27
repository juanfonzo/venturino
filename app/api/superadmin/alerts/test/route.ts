import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireSuperadminApi } from "@/lib/auth/session";
import { sendOperationalAlertTest } from "@/lib/operational-alerts/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = await requireSuperadminApi(request);
  if (auth.response) return auth.response;

  try {
    await sendOperationalAlertTest(auth.session.user);
    return NextResponse.json({ ok: true, message: "Correo de prueba enviado." });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "No se pudo enviar el correo." },
      { status: 503 },
    );
  }
}
