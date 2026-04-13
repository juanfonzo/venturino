"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import { formatUsd } from "@/lib/utils/format";

export interface MarketEvolutionPoint {
  date: string;
  n: number;
  p25: number | null;
  p50: number | null;
  p75: number | null;
}

export interface MarketEvolutionBucketSeries {
  bucket: string;
  label: string;
  points: MarketEvolutionPoint[];
}

export function MarketEvolutionChart({
  points,
  series,
}: {
  points: MarketEvolutionPoint[];
  series?: MarketEvolutionBucketSeries[] | null;
}) {
  const hasSeries = Boolean(series && series.length);
  const hasAnyPointSamples = Boolean((points || []).some((point) => point.n > 0));

  const singleData = (points || [])
    .map((point) => ({
      date: point.date,
      n: point.n,
      p25: point.p25,
      p50: point.p50,
      p75: point.p75,
    }))
    .filter((row) => row.p50 !== null);

  const multiData = (() => {
    if (!hasSeries) return [] as Array<Record<string, unknown>>;
    const dateMap = new Map<string, Record<string, unknown>>();
    (series || []).forEach((entry) => {
      entry.points.forEach((point) => {
        if (point.p50 === null) return;
        const existing = dateMap.get(point.date) ?? { date: point.date };
        existing[`p50__${entry.bucket}`] = point.p50;
        existing[`n__${entry.bucket}`] = point.n;
        dateMap.set(point.date, existing);
      });
    });
    return Array.from(dateMap.values()).sort((a, b) => {
      const ad = String(a.date);
      const bd = String(b.date);
      return ad.localeCompare(bd);
    });
  })();

  const hasAnySeriesSamples = Boolean(
    (series || []).some((entry) => entry.points.some((point) => point.n > 0)),
  );

  const showInsufficientSampleMessage = hasSeries ? hasAnySeriesSamples : hasAnyPointSamples;

  if ((!hasSeries && singleData.length === 0) || (hasSeries && multiData.length === 0)) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-jd-black/10 bg-white/70 px-6 text-center">
        <p className="text-sm text-jd-black/50">
          {showInsufficientSampleMessage
            ? "Hay historial, pero aún no alcanza la muestra mínima para calcular la evolución de mercado (p25/p50/p75)."
            : "Sin historial de precios aún. La serie se irá construyendo con cada corrida del pipeline."}
        </p>
      </div>
    );
  }

  const bucketColors = ["#367C2B", "#1A1A1A", "#FFDE00", "#6B6B6B", "#0F5B9A", "#7C3AED"];

  return (
    <div className="h-64 w-full rounded-2xl border border-jd-black/10 bg-white/80 p-3">
      <ResponsiveContainer>
        <LineChart data={(hasSeries ? multiData : singleData) as any}>
          {!hasSeries ? (
            <defs>
              <linearGradient id="marketP50Fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#367C2B" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#367C2B" stopOpacity={0.04} />
              </linearGradient>
            </defs>
          ) : null}
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E1D4" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B6B6B", fontSize: 12 }}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={(value) => formatUsd(value as number)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B6B6B", fontSize: 12 }}
            tickMargin={12}
            width={80}
          />
          <Tooltip
            formatter={(value) => formatUsd(value as number)}
            labelStyle={{ color: "#1A1A1A", fontWeight: 600 }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid rgba(26,26,26,0.1)",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          />
          {!hasSeries ? (
            <>
              <Area type="monotone" dataKey="p50" stroke="none" fill="url(#marketP50Fill)" />
              <Line
                type="monotone"
                dataKey="p50"
                stroke="#367C2B"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#FFDE00", stroke: "#367C2B" }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "#FFDE00", stroke: "#367C2B" }}
                name="Mediana (p50)"
              />
              <Line
                type="monotone"
                dataKey="p25"
                stroke="#1A1A1A"
                strokeOpacity={0.35}
                strokeWidth={2}
                dot={false}
                name="p25"
              />
              <Line
                type="monotone"
                dataKey="p75"
                stroke="#1A1A1A"
                strokeOpacity={0.35}
                strokeWidth={2}
                dot={false}
                name="p75"
              />
            </>
          ) : (
            (series || []).map((entry, index) => (
              <Line
                key={entry.bucket}
                type="monotone"
                dataKey={`p50__${entry.bucket}`}
                stroke={bucketColors[index % bucketColors.length]}
                strokeWidth={3}
                dot={false}
                name={entry.label}
                connectNulls
              />
            ))
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
