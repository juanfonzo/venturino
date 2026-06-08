"use client";

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

type SingleChartRow = {
  date: string;
  n: number;
  p25: number | null;
  p50: number;
  p75: number | null;
};

type SvgPoint = {
  x: number;
  y: number;
  date: string;
  n: number;
  value: number;
};

type SeriesSvgPoint = SvgPoint & {
  bucket: string;
  label: string;
};

const CHART_WIDTH = 920;
const CHART_HEIGHT = 240;
const PADDING = {
  top: 22,
  right: 26,
  bottom: 36,
  left: 88,
};
const PLOT_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;
const PLOT_HEIGHT = CHART_HEIGHT - PADDING.top - PADDING.bottom;
const BUCKET_COLORS = ["#367C2B", "#1A1A1A", "#D6A900", "#6B6B6B", "#0F5B9A", "#7C3AED"];

function isFiniteNumber(value: number | null | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function formatDateLabel(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}`;
}

function shouldShowDateLabel(index: number, total: number) {
  if (total <= 7) return true;
  if (index === 0 || index === total - 1) return true;
  return index % Math.ceil(total / 5) === 0;
}

function buildLinePath(points: SvgPoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function createYScale(values: number[]) {
  const minRaw = Math.min(...values);
  const maxRaw = Math.max(...values);
  const spread = maxRaw - minRaw;
  const padding = spread === 0 ? Math.max(1, maxRaw * 0.08) : spread * 0.1;
  const min = Math.max(0, minRaw - padding);
  const max = maxRaw + padding;
  const range = max - min || 1;

  return {
    min,
    max,
    yForValue(value: number) {
      return PADDING.top + ((max - value) / range) * PLOT_HEIGHT;
    },
  };
}

function createTicks(min: number, max: number, count = 4) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return [min];
  return Array.from({ length: count }, (_, index) => min + ((max - min) * index) / (count - 1));
}

function createXForIndex(total: number) {
  return (index: number) => {
    if (total <= 1) return PADDING.left + PLOT_WIDTH / 2;
    return PADDING.left + (index / (total - 1)) * PLOT_WIDTH;
  };
}

function renderGridAndAxes({
  dates,
  ticks,
  yForValue,
}: {
  dates: string[];
  ticks: number[];
  yForValue: (value: number) => number;
}) {
  const xForIndex = createXForIndex(dates.length);

  return (
    <>
      {ticks.map((tick) => {
        const y = yForValue(tick);
        return (
          <g key={`tick-${tick}`}>
            <line x1={PADDING.left} x2={CHART_WIDTH - PADDING.right} y1={y} y2={y} stroke="#E6E1D4" strokeDasharray="4 4" />
            <text x={PADDING.left - 12} y={y + 4} textAnchor="end" className="fill-jd-black/55 text-[11px]">
              {formatUsd(tick)}
            </text>
          </g>
        );
      })}
      <line
        x1={PADDING.left}
        x2={CHART_WIDTH - PADDING.right}
        y1={CHART_HEIGHT - PADDING.bottom}
        y2={CHART_HEIGHT - PADDING.bottom}
        stroke="#D8D2C5"
      />
      {dates.map((date, index) =>
        shouldShowDateLabel(index, dates.length) ? (
          <text
            key={`date-${date}`}
            x={xForIndex(index)}
            y={CHART_HEIGHT - 12}
            textAnchor="middle"
            className="fill-jd-black/55 text-[11px]"
          >
            {formatDateLabel(date)}
          </text>
        ) : null,
      )}
    </>
  );
}

function SingleMarketChart({ rows }: { rows: SingleChartRow[] }) {
  const values = rows.flatMap((row) => [row.p25, row.p50, row.p75]).filter(isFiniteNumber);
  const yScale = createYScale(values);
  const ticks = createTicks(yScale.min, yScale.max);
  const xForIndex = createXForIndex(rows.length);
  const p50Points: SvgPoint[] = rows.map((row, index) => ({
    x: xForIndex(index),
    y: yScale.yForValue(row.p50),
    date: row.date,
    n: row.n,
    value: row.p50,
  }));
  const p25Points: SvgPoint[] = rows.flatMap((row, index) =>
    isFiniteNumber(row.p25)
      ? [
          {
            x: xForIndex(index),
            y: yScale.yForValue(row.p25),
            date: row.date,
            n: row.n,
            value: row.p25,
          },
        ]
      : [],
  );
  const p75Points: SvgPoint[] = rows.flatMap((row, index) =>
    isFiniteNumber(row.p75)
      ? [
          {
            x: xForIndex(index),
            y: yScale.yForValue(row.p75),
            date: row.date,
            n: row.n,
            value: row.p75,
          },
        ]
      : [],
  );
  const baselineY = CHART_HEIGHT - PADDING.bottom;
  const p50Path = buildLinePath(p50Points);
  const areaPath =
    p50Points.length > 0
      ? `M ${p50Points[0].x} ${baselineY} L ${p50Points.map((point) => `${point.x} ${point.y}`).join(" L ")} L ${
          p50Points[p50Points.length - 1].x
        } ${baselineY} Z`
      : "";

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-full w-full" role="img" aria-label="Evolución de mercado por fecha">
      <defs>
        <linearGradient id="marketP50FillSvg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#367C2B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#367C2B" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {renderGridAndAxes({
        dates: rows.map((row) => row.date),
        ticks,
        yForValue: yScale.yForValue,
      })}
      {areaPath ? <path d={areaPath} fill="url(#marketP50FillSvg)" /> : null}
      {p25Points.length > 1 ? <path d={buildLinePath(p25Points)} fill="none" stroke="#1A1A1A" strokeOpacity="0.35" strokeWidth="2" /> : null}
      {p75Points.length > 1 ? <path d={buildLinePath(p75Points)} fill="none" stroke="#1A1A1A" strokeOpacity="0.35" strokeWidth="2" /> : null}
      <path d={p50Path} fill="none" stroke="#367C2B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
      {p50Points.map((point) => (
        <circle key={`p50-${point.date}`} cx={point.x} cy={point.y} r="5" fill="#FFDE00" stroke="#367C2B" strokeWidth="2">
          <title>{`${point.date}\nMediana: ${formatUsd(point.value)}\nRegistros: ${point.n}`}</title>
        </circle>
      ))}
      <g transform={`translate(${PADDING.left}, 12)`}>
        <circle cx="0" cy="0" r="4" fill="#FFDE00" stroke="#367C2B" strokeWidth="2" />
        <text x="12" y="4" className="fill-jd-black/70 text-[11px] font-semibold">
          Mediana p50
        </text>
        <line x1="108" x2="132" y1="0" y2="0" stroke="#1A1A1A" strokeOpacity="0.35" strokeWidth="2" />
        <text x="140" y="4" className="fill-jd-black/55 text-[11px]">
          p25 / p75
        </text>
      </g>
    </svg>
  );
}

function BucketSeriesChart({ series }: { series: MarketEvolutionBucketSeries[] }) {
  const populatedSeries = series
    .map((entry, index) => ({
      ...entry,
      color: BUCKET_COLORS[index % BUCKET_COLORS.length],
      points: entry.points
        .filter((point) => isFiniteNumber(point.p50))
        .map((point) => ({
          date: point.date,
          n: point.n,
          value: point.p50 as number,
          bucket: entry.bucket,
          label: entry.label,
        })),
    }))
    .filter((entry) => entry.points.length > 0);
  const dates = Array.from(new Set(populatedSeries.flatMap((entry) => entry.points.map((point) => point.date)))).sort();
  const dateIndex = new Map(dates.map((date, index) => [date, index]));
  const xForIndex = createXForIndex(dates.length);
  const values = populatedSeries.flatMap((entry) => entry.points.map((point) => point.value));
  const yScale = createYScale(values);
  const ticks = createTicks(yScale.min, yScale.max);

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-full w-full" role="img" aria-label="Evolución de mercado por rango">
      {renderGridAndAxes({
        dates,
        ticks,
        yForValue: yScale.yForValue,
      })}
      {populatedSeries.map((entry) => {
        const points: SeriesSvgPoint[] = entry.points.map((point) => {
          const index = dateIndex.get(point.date) ?? 0;
          return {
            ...point,
            x: xForIndex(index),
            y: yScale.yForValue(point.value),
          };
        });
        const path = buildLinePath(points);

        return (
          <g key={entry.bucket}>
            {points.length > 1 ? (
              <path d={path} fill="none" stroke={entry.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            ) : null}
            {points.map((point) => (
              <circle key={`${entry.bucket}-${point.date}`} cx={point.x} cy={point.y} r="5" fill="#FFFFFF" stroke={entry.color} strokeWidth="2">
                <title>{`${point.label}\n${point.date}\nMediana: ${formatUsd(point.value)}\nRegistros: ${point.n}`}</title>
              </circle>
            ))}
          </g>
        );
      })}
      <g transform={`translate(${PADDING.left}, 12)`}>
        {populatedSeries.slice(0, 4).map((entry, index) => (
          <g key={`legend-${entry.bucket}`} transform={`translate(${index * 160}, 0)`}>
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke={entry.color} strokeWidth="2" />
            <text x="12" y="4" className="fill-jd-black/70 text-[11px] font-semibold">
              {entry.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
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
  const singleData: SingleChartRow[] = (points || [])
    .map((point) => ({
      date: point.date,
      n: point.n,
      p25: point.p25,
      p50: point.p50,
      p75: point.p75,
    }))
    .filter((row): row is SingleChartRow => isFiniteNumber(row.p50));

  const hasAnySeriesSamples = Boolean((series || []).some((entry) => entry.points.some((point) => point.n > 0)));
  const hasSeriesData = Boolean((series || []).some((entry) => entry.points.some((point) => isFiniteNumber(point.p50))));
  const showInsufficientSampleMessage = hasSeries ? hasAnySeriesSamples : hasAnyPointSamples;

  if ((!hasSeries && singleData.length === 0) || (hasSeries && !hasSeriesData)) {
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

  return (
    <div className="h-64 w-full rounded-2xl border border-jd-black/10 bg-white/80 p-3">
      {hasSeries && series ? <BucketSeriesChart series={series} /> : <SingleMarketChart rows={singleData} />}
    </div>
  );
}
