import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadAcara } from "@/lib/data/loadAcara";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const dataset = await loadAcara();
    const item = dataset.items.find((entry) => entry.id === id);

    if (!item) {
      return NextResponse.json({ error: "Item no encontrado" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo cargar el item ACARA." },
      { status: 500 },
    );
  }
}
