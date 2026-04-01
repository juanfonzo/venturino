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

export interface ListingPricePoint {
  date: string;
  precioUsd: number | null;
}

export function ListingPriceHistoryChart({
  points,
}: {
  points: ListingPricePoint[];
}) {
  const data = (points || [])
    .map((point) => ({ date: point.date, value: point.precioUsd }))
    .filter((row) => row.value !== null);

  if (data.length === 0) {
    return <p className="text-sm text-jd-black/60">Sin historial de precios para esta publicación.</p>;
  }

  return (
    <div className="h-64 w-full rounded-2xl border border-jd-black/10 bg-white/80 p-3">
      <ResponsiveContainer>
        <LineChart data={data}>
          <defs>
            <linearGradient id="listingLineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A1A1A" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#1A1A1A" stopOpacity={0.03} />
            </linearGradient>
          </defs>
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
          <Area type="monotone" dataKey="value" stroke="none" fill="url(#listingLineFill)" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1A1A1A"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#FFDE00", stroke: "#1A1A1A" }}
            activeDot={{ r: 6, strokeWidth: 2, fill: "#FFDE00", stroke: "#1A1A1A" }}
            name="Precio"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
