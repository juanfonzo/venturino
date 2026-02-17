import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toDateKey(value: Date) {
  return value.toISOString().split("T")[0];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url")?.trim() || null;

    if (!url) {
      return NextResponse.json({ error: "Falta parametro: url" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { url },
      select: { id: true, url: true, titulo: true, origen: true, categoria: true, marca: true, modelo: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Publicacion no encontrada" }, { status: 404 });
    }

    const rows = await prisma.priceHistory.findMany({
      where: { listingId: listing.id },
      orderBy: { snapshotDate: "asc" },
      select: {
        snapshotDate: true,
        precioUsd: true,
        monedaNorm: true,
        precioRaw: true,
      },
    });

    return NextResponse.json({
      listing,
      points: rows.map((row) => ({
        date: toDateKey(row.snapshotDate),
        precioUsd: row.precioUsd !== null ? Number(row.precioUsd) : null,
        monedaNorm: row.monedaNorm,
        precioRaw: row.precioRaw,
      })),
    });
  } catch (error) {
    console.error("[api/listings/price-history] Failed", error);
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "No se pudo cargar historial de precios.", detail },
      { status: 500 },
    );
  }
}
