"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { AcaraGapResponse, StatsResponse } from "@/lib/types";
import { Spinner } from "@/components/ui/Spinner";
import { formatNumber, formatPercent, formatUsd } from "@/lib/utils/format";
import { Select } from "@/components/ui/Select";
import { useAcaraMappings } from "@/store/useAcaraMappings";

const ChoroplethMap = dynamic(
  () => import("@/components/ChoroplethMap").then((mod) => mod.ChoroplethMap),
  {
    ssr: false,
  },
);

export default function ProvinciasPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [metric, setMetric] = useState<
    "count" | "p50" | "p75" | "missingPricePct" | "acaraGapAbs"
  >("count");
  const [gapData, setGapData] = useState<AcaraGapResponse | null>(null);
  const { mappings } = useAcaraMappings();

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((json: StatsResponse) => setStats(json))
      .catch(() => setStats(null));
  }, []);

  useEffect(() => {
    const mappingCount = Object.keys(mappings).length;
    if (mappingCount === 0) {
      setGapData(null);
      return;
    }
    let cancelled = false;
    fetch("/api/acara/gaps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mappings }),
    })
      .then((res) => res.json())
      .then((json: AcaraGapResponse) => {
        if (!cancelled) setGapData(json);
      })
      .catch(() => {
        if (!cancelled) setGapData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [mappings]);

  const provinceGapMap = useMemo(() => {
    const map = new Map<string, number>();
    gapData?.byProvince?.forEach((item) => {
      map.set(item.provincia, item.avgGapAbs ?? 0);
    });
    return map;
  }, [gapData]);

  const mergedData = useMemo(() => {
    if (!stats) return null;
    return stats.byProvince.map((item) => ({
      ...item,
      acaraGapAbs: provinceGapMap.get(item.provincia) ?? null,
    }));
  }, [stats, provinceGapMap]);

  const metricRange = useMemo(() => {
    if (!mergedData) return null;
    const values = mergedData
      .map((item) => item[metric])
      .filter((value): value is number => typeof value === "number");
    if (values.length === 0) return null;
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [mergedData, metric]);

  const formattedRange = useMemo(() => {
    if (!metricRange) return null;
    if (metric === "missingPricePct") {
      return `${formatPercent(metricRange.min, 0)} - ${formatPercent(metricRange.max, 0)}`;
    }
    if (metric === "count") {
      return `${formatNumber(metricRange.min)} - ${formatNumber(metricRange.max)}`;
    }
    if (metric === "acaraGapAbs") {
      return `${formatUsd(metricRange.min)} - ${formatUsd(metricRange.max)}`;
    }
    return `${formatUsd(metricRange.min)} - ${formatUsd(metricRange.max)}`;
  }, [metricRange, metric]);

  return (
    <div className="flex flex-col gap-6">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Distribucion</p>
            <h2 className="text-lg font-semibold text-jd-black">Distribucion por provincia</h2>
          </div>
          <Select
            value={metric}
            onChange={(event) =>
              setMetric(
                event.target.value as
                  | "count"
                  | "p50"
                  | "p75"
                  | "missingPricePct"
                  | "acaraGapAbs",
              )
            }
          >
            <option value="count">Cantidad</option>
            <option value="p50">Precio referencia</option>
            <option value="p75">Precio alto</option>
            <option value="missingPricePct">% sin precio</option>
            <option value="acaraGapAbs">Brecha vs referencia ACARA</option>
          </Select>
        </div>
        <div className="panel-body">
          <p className="mb-4 text-sm text-jd-black/70">
            Usa el mapa para detectar concentracion de oferta y provincias con mejor cobertura de precios.
          </p>
          {metric === "acaraGapAbs" && Object.keys(mappings).length === 0 ? (
            <p className="mb-3 text-xs text-jd-black/60">
              Vincula modelos en ACARA para habilitar la brecha por provincia.
            </p>
          ) : null}
          {formattedRange ? (
            <p className="mb-3 text-xs text-jd-black/60">Rango del indicador: {formattedRange}</p>
          ) : null}
          {mergedData ? (
            <ChoroplethMap data={mergedData} metric={metric} />
          ) : (
            <div className="flex items-center gap-2 text-sm text-jd-black/60">
              <Spinner /> Cargando mapa...
            </div>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3 className="text-lg font-semibold text-jd-black">Tabla por provincia</h3>
        </div>
        <div className="panel-body">
          {mergedData ? (
            <table className="table-base">
              <thead>
                <tr>
                  <th>Provincia</th>
                  <th>Cant.</th>
                  <th>Precio referencia</th>
                  <th>Precio alto</th>
                  <th>% sin precio</th>
                  <th>Brecha ACARA</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((item) => (
                  <tr key={item.provincia}>
                    <td>{item.provincia}</td>
                    <td>{formatNumber(item.count)}</td>
                    <td>{formatUsd(item.p50)}</td>
                    <td>{formatUsd(item.p75)}</td>
                    <td>{formatPercent(item.missingPricePct, 0)}</td>
                    <td>{item.acaraGapAbs !== null ? formatUsd(item.acaraGapAbs) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-jd-black/60">Sin datos de provincias.</p>
          )}
        </div>
      </section>
    </div>
  );
}
