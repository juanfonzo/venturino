import { NextResponse } from "next/server";
import { loadTractors } from "@/lib/data/loadTractors";
import { getPercentiles } from "@/lib/stats/percentiles";
import { groupByOrigin, groupByProvince, topBrands, topModelCombos } from "@/lib/stats/aggregations";
import { computeTopOpportunities } from "@/lib/stats/opportunities";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dataset = await loadTractors();
    const rows = dataset.rows;

    const prices = rows.map((row) => row.precio_nor).filter((v): v is number => v !== null);
    const { p25, p50, p75 } = getPercentiles(prices);
    const withPriceCount = prices.length;
    const estadoCounts = rows.reduce((acc, row) => {
      const key = row.estado_norm ?? "Sin estado";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const byEstado = Object.entries(estadoCounts).map(([estado, count]) => ({
      estado,
      count,
      pct: rows.length ? count / rows.length : 0,
    }));

    const stats = {
      kpis: {
        total: rows.length,
        withPriceCount,
        withPricePct: rows.length ? withPriceCount / rows.length : 0,
        p25,
        p50,
        p75,
      },
      byProvince: groupByProvince(rows).sort((a, b) => b.count - a.count),
      byOrigin: groupByOrigin(rows).sort((a, b) => b.count - a.count),
      byEstado: byEstado.sort((a, b) => b.count - a.count),
      topBrands: topBrands(rows, 8),
      topModelCombos: topModelCombos(rows, 20),
      topOpportunities: computeTopOpportunities(rows, 10),
      suspects: rows
        .filter((row) => row.flags.length > 0)
        .sort((a, b) => b.flags.length - a.flags.length)
        .slice(0, 50),
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo calcular estadisticas." },
      { status: 500 },
    );
  }
}
