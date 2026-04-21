import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateVenturinoPdfBuffer } from "@/lib/reports/venturinoVsMercado";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_CATEGORIES = new Set([
  "Tractores",
  "Cosechadoras",
  "Sembradoras",
  "Pulverizadoras",
]);

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const categoriaParam = searchParams.get("categoria");
  const soloActivosParam = searchParams.get("solo_activos");

  const categoria =
    categoriaParam && ALLOWED_CATEGORIES.has(categoriaParam) ? categoriaParam : null;
  const soloActivos = soloActivosParam === "1" || soloActivosParam === "true";

  try {
    const { buffer, filename } = await generateVenturinoPdfBuffer({
      prisma,
      categoria,
      soloActivos,
    });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("[api/reports/venturino] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
