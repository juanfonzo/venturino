"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { normalizeText } from "@/lib/normalize/text";
import { formatNumber, formatPercent, formatUsd } from "@/lib/utils/format";
import type { ProvinceStat } from "@/lib/types";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function interpolateColor(start: string, end: string, t: number) {
  const s = hexToRgb(start);
  const e = hexToRgb(end);
  const r = Math.round(s.r + (e.r - s.r) * t);
  const g = Math.round(s.g + (e.g - s.g) * t);
  const b = Math.round(s.b + (e.b - s.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function buildScale(values: number[]) {
  if (values.length === 0) {
    return { min: 0, max: 0 };
  }
  return { min: Math.min(...values), max: Math.max(...values) };
}

export function ChoroplethMap({
  data,
  metric,
}: {
  data: Array<ProvinceStat & { acaraGapAbs?: number | null }>;
  metric: "count" | "p50" | "p75" | "missingPricePct" | "acaraGapAbs";
}) {
  const [geojson, setGeojson] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/geo/provincias")
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setGeojson(json);
      })
      .catch(() => {
        if (!cancelled) setGeojson(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((item) => {
      const key = normalizeText(item.provincia) ?? item.provincia;
      const value: number | null =
        metric === "acaraGapAbs"
          ? item.acaraGapAbs ?? null
          : metric === "count"
            ? item.count
            : metric === "p50"
              ? item.p50
              : metric === "p75"
                ? item.p75
                : item.missingPricePct;
      map.set(key, typeof value === "number" ? value : 0);
    });
    return map;
  }, [data, metric]);

  const scale = useMemo(() => {
    const values = Array.from(dataMap.values());
    return buildScale(values);
  }, [dataMap]);

  if (!geojson) {
    return (
      <div className="panel flex min-h-[320px] items-center justify-center text-sm text-jd-black/60">
        Mapa no disponible (falta GeoJSON local)
      </div>
    );
  }

  const features = (geojson as { features?: unknown[] }).features ?? [];
  if (!Array.isArray(features) || features.length === 0) {
    return (
      <div className="panel flex min-h-[320px] items-center justify-center text-sm text-jd-black/60">
        GeoJSON cargado pero sin provincias.
      </div>
    );
  }

  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Mapa</p>
          <p className="text-lg font-semibold text-jd-black">Distribucion por provincia</p>
        </div>
      </div>
      <div className="panel-body">
        <MapContainer
          center={[-38.4, -63.6]}
          zoom={4}
          style={{ height: 360, width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <GeoJSON
            data={geojson}
            style={(feature) => {
              const props = feature?.properties as {
                name?: string;
                provincia?: string;
                nombre?: string;
                NAM?: string;
                FNA?: string;
              };
              const rawName =
                props?.NAM ?? props?.name ?? props?.provincia ?? props?.nombre ?? props?.FNA ?? "";
              const key = normalizeText(rawName) ?? rawName;
              const value = dataMap.get(key) ?? 0;
              const range = scale.max - scale.min || 1;
              const t = Math.min(1, Math.max(0, (value - scale.min) / range));
              const gapMax = Math.max(Math.abs(scale.min), Math.abs(scale.max)) || 1;
              const gapIntensity = Math.min(1, Math.abs(value) / gapMax);
              const gapColor =
                value >= 0
                  ? interpolateColor("#F4F1E8", "#FFDE00", gapIntensity)
                  : interpolateColor("#F4F1E8", "#367C2B", gapIntensity);
              return {
                color: "#1A1A1A",
                weight: 0.6,
                fillColor:
                  metric === "acaraGapAbs"
                    ? gapColor
                    : interpolateColor("#F4F1E8", "#367C2B", t),
                fillOpacity: 0.75,
              };
            }}
            onEachFeature={(feature, layer) => {
              const props = feature.properties as {
                name?: string;
                provincia?: string;
                nombre?: string;
                NAM?: string;
                FNA?: string;
              };
              const rawName =
                props?.NAM ?? props?.name ?? props?.provincia ?? props?.nombre ?? props?.FNA ?? "";
              const key = normalizeText(rawName) ?? rawName;
              const value = dataMap.get(key) ?? 0;
              const formatted =
                metric === "missingPricePct"
                  ? formatPercent(value, 0)
                  : metric === "count"
                    ? formatNumber(value)
                    : formatUsd(value);
              layer.bindTooltip(`${rawName}: ${formatted}`);
            }}
          />
        </MapContainer>
      </div>
    </div>
  );
}
