import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadAcara } from "@/lib/data/loadAcara";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase().trim() ?? "";
    const pageParam = Number(searchParams.get("page") ?? 1);
    const pageSizeParam = Number(searchParams.get("pageSize") ?? 25);
    const page = Math.max(1, Number.isFinite(pageParam) ? pageParam : 1);
    const pageSize = Math.min(100, Math.max(1, Number.isFinite(pageSizeParam) ? pageSizeParam : 25));

    const dataset = await loadAcara();
    const filtered = dataset.items.filter((item) => {
      if (!q) return true;
      const haystack = [item.brand, item.category, item.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize).map((item) => ({
      id: item.id,
      brand: item.brand,
      category: item.category,
      description: item.description,
      currency: item.currency,
      page: item.page,
      price_date: item.price_date,
      seriesCount: item.series.length,
    }));

    return NextResponse.json({
      rows: paginated,
      total: filtered.length,
      page,
      pageSize,
      meta: dataset.meta,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo cargar ACARA." },
      { status: 500 },
    );
  }
}
