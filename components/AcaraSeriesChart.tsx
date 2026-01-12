"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import type { AcaraSeriesPoint } from "@/lib/types";
import { formatUsd } from "@/lib/utils/format";

export function AcaraSeriesChart({ series }: { series: AcaraSeriesPoint[] }) {
  if (!series || series.length === 0) {
    return <p className="text-sm text-jd-black/60">Sin datos de serie.</p>;
  }

  const data = series
    .map((point) => ({
      year: point.yearLabel,
      value: point.valueUsd,
    }))
    .filter((item) => item.value !== null);

  if (data.length === 0) {
    return <p className="text-sm text-jd-black/60">Serie sin valores.</p>;
  }

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(value) => formatUsd(value as number)} />
          <Tooltip formatter={(value) => formatUsd(value as number)} />
          <Line type="monotone" dataKey="value" stroke="#367C2B" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
