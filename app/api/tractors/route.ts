import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadListings } from "@/lib/data/loadListings";

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

    const result = await loadListings({
      categoria: searchParams.get("categoria") ?? undefined,
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
      page: parseNumberParam(searchParams.get("page")) ?? 1,
      pageSize: parseNumberParam(searchParams.get("pageSize")) ?? 25,
      sortBy: searchParams.get("sortBy"),
      sortDir: searchParams.get("sortDir"),
    });

    return NextResponse.json({
      rows: result.rows,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      meta: { loadedAt: Date.now(), fileMtimeMs: null, delimiter: "postgres" },
    });
  } catch (error) {
    console.error("Error loading listings:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar las publicaciones." },
      { status: 500 },
    );
  }
}
