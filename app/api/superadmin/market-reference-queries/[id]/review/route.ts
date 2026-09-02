import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireSuperadminApi } from "@/lib/auth/session";
import { updateMarketReferenceReview } from "@/lib/superadmin/market-reference";
import {
  parseReviewPayload,
  ReviewValidationError,
} from "@/lib/superadmin/review";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireSuperadminApi(request);
  if (auth.response) return auth.response;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "Consulta inválida" }, { status: 400 });
  }

  try {
    const review = parseReviewPayload(await request.json().catch(() => null));
    await updateMarketReferenceReview({
      id,
      status: review.status,
      reason: review.reason,
      notes: review.notes,
      reviewedBy: auth.session.user,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ReviewValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ ok: false, error: "Consulta no encontrada" }, { status: 404 });
    }
    console.error(`[superadmin-review] queryId=${id}`, error);
    return NextResponse.json({ ok: false, error: "No se pudo guardar la revisión" }, { status: 500 });
  }
}
