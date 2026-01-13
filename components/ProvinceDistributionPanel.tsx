"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { StatsResponse } from "@/lib/types";
import { Spinner } from "@/components/ui/Spinner";
import { Select } from "@/components/ui/Select";
import { formatNumber, formatUsd } from "@/lib/utils/format";

const ChoroplethMap = dynamic(
  () => import("@/components/ChoroplethMap").then((mod) => mod.ChoroplethMap),
  {
    ssr: false,
  },
);

export function ProvinceDistributionPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [metric, setMetric] = useState<"count" | "p50" | "p75">("count");

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((json: StatsResponse) => setStats(json))
      .catch(() => setStats(null));
  }, []);

  const metricRange = useMemo(() => {
    if (!stats) return null;
    const values = stats.byProvince
      .map((item) => (metric === "count" ? item.count : metric === "p50" ? item.p50 : item.p75))
      .filter((value): value is number => typeof value === "number");
    if (values.length === 0) return null;
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [stats, metric]);

  const formattedRange = useMemo(() => {
    if (!metricRange) return null;
    if (metric === "count") {
      return `${formatNumber(metricRange.min)} - ${formatNumber(metricRange.max)}`;
    }
    return `${formatUsd(metricRange.min)} - ${formatUsd(metricRange.max)}`;
  }, [metricRange, metric]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Mapa</p>
          <h2 className="text-lg font-semibold text-jd-black">Distribucion por provincia</h2>
        </div>
        <Select value={metric} onChange={(event) => setMetric(event.target.value as "count" | "p50" | "p75")}>
          <option value="count">Cantidad</option>
          <option value="p50">Precio referencia</option>
          <option value="p75">Precio alto</option>
        </Select>
      </div>
      <div className="panel-body">
        <p className="mb-3 text-sm text-jd-black/70">
          Elige el indicador para ver concentracion de oferta y zonas con mejor referencia de precios.
        </p>
        {formattedRange ? (
          <p className="mb-3 text-xs text-jd-black/60">Rango del indicador: {formattedRange}</p>
        ) : null}
        {stats ? (
          <ChoroplethMap data={stats.byProvince} metric={metric} showPanel={false} />
        ) : (
          <div className="flex items-center gap-2 text-sm text-jd-black/60">
            <Spinner /> Cargando mapa...
          </div>
        )}
      </div>
    </section>
  );
}
