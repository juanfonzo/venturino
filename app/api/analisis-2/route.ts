import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { computeAnalisis2 } from "@/lib/analysis/analisis2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseCompaniesParam(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const companies = parseCompaniesParam(searchParams.get("companies"));

    const data = await computeAnalisis2({
      selectedCompanies: companies.length ? companies : null,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "No se pudo calcular Análisis 2." }, { status: 500 });
  }
}
