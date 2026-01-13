import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loadTractors } from "@/lib/data/loadTractors";
import { applyTractorFilters } from "@/lib/data/tractorQuery";
import { getPercentiles } from "@/lib/stats/percentiles";
import { buildOpportunity } from "@/lib/stats/opportunities";

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
    const listingId = searchParams.get("listingId");

    const dataset = await loadTractors();
    const rows = dataset.rows;

    const listing = listingId ? rows.find((row) => row.id === listingId) ?? null : null;

    const targetResell = searchParams.get("targetResell") === "p75" ? "p75" : "p50";
    const costos = parseNumberParam(searchParams.get("costos")) ?? 0;
    const targetPriceParam = parseNumberParam(searchParams.get("targetPrice"));

    const yearMinParam = parseNumberParam(searchParams.get("yearMin"));
    const yearMaxParam = parseNumberParam(searchParams.get("yearMax"));
    const hpMinParam = parseNumberParam(searchParams.get("hpMin"));
    const hpMaxParam = parseNumberParam(searchParams.get("hpMax"));

    const estado = searchParams.get("estado") ?? listing?.estado_norm ?? null;
    const currentYear = new Date().getFullYear();
    const newYearThreshold = currentYear - 2;

    let yearMin = yearMinParam ?? listing?.anio ?? null;
    let yearMax = yearMaxParam ?? (yearMinParam ? null : listing?.anio ?? null);

    if (estado === "Nuevo" && yearMinParam === null && yearMaxParam === null) {
      if (!listing?.anio || listing.anio < newYearThreshold) {
        yearMin = newYearThreshold;
        yearMax = currentYear + 1;
      }
    }

    const query = {
      q: searchParams.get("q"),
      origin: searchParams.get("origin"),
      brand: searchParams.get("brand") ?? listing?.marca ?? null,
      model: searchParams.get("model") ?? listing?.modelo ?? null,
      estado,
      province: searchParams.get("province") ?? listing?.provincia ?? null,
      yearMin,
      yearMax,
      hpMin: hpMinParam ?? listing?.hp_motor ?? null,
      hpMax: hpMaxParam ?? null,
      hasPrice: true,
    };

    const filtered = applyTractorFilters(rows, query);
    const priceList = filtered.map((row) => row.precio_nor).filter((v): v is number => v !== null);
    const { p25, p50, p75 } = getPercentiles(priceList);

    const targetResellValue = targetResell === "p75" ? p75 : p50;
    const targetPrice = targetPriceParam ?? listing?.precio_nor ?? null;

    const opportunity = buildOpportunity(targetResellValue, targetPrice, costos);

    return NextResponse.json({
      n: priceList.length,
      p25,
      p50,
      p75,
      rows: filtered.slice(0, 200),
      opportunity: {
        targetResell,
        targetResellValue: targetResellValue ?? null,
        maxBuy: opportunity.maxBuy,
        score: opportunity.score,
        label: opportunity.label,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo calcular comparables." },
      { status: 500 },
    );
  }
}
