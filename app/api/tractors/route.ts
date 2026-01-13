import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadTractors } from "@/lib/data/loadTractors";
import { applyTractorFilters, sortTractors } from "@/lib/data/tractorQuery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseNumberParam(value: string | null) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = {
      q: searchParams.get("q"),
      searchScope: (searchParams.get("searchScope") as "core" | "full" | null) ?? null,
      origin: searchParams.get("origin"),
      brand: searchParams.get("brand"),
      model: searchParams.get("model"),
      estado: searchParams.get("estado"),
      province: searchParams.get("province"),
      yearMin: parseNumberParam(searchParams.get("yearMin")),
      yearMax: parseNumberParam(searchParams.get("yearMax")),
      hpMin: parseNumberParam(searchParams.get("hpMin")),
      hpMax: parseNumberParam(searchParams.get("hpMax")),
      hasPrice: searchParams.get("hasPrice")
        ? searchParams.get("hasPrice") === "true"
        : null,
    };

    const pageParam = parseNumberParam(searchParams.get("page")) ?? 1;
    const pageSizeParam = parseNumberParam(searchParams.get("pageSize")) ?? 25;
    const page = Math.max(1, pageParam);
    const pageSize = Math.min(100, Math.max(1, pageSizeParam));
    const sortBy = searchParams.get("sortBy");
    const sortDir = searchParams.get("sortDir");

    const dataset = await loadTractors();
    const filtered = applyTractorFilters(dataset.rows, query);
    const sorted = sortTractors(filtered, sortBy, sortDir);

    const start = (page - 1) * pageSize;
    const paginated = sorted.slice(start, start + pageSize);

    return NextResponse.json({
      rows: paginated,
      total: sorted.length,
      page,
      pageSize,
      meta: dataset.meta,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo cargar el CSV de tractores." },
      { status: 500 },
    );
  }
}
