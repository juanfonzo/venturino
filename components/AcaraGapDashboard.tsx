"use client";

import { useEffect, useMemo, useState } from "react";
import { useAcaraMappings } from "@/store/useAcaraMappings";
import type { AcaraGapResponse } from "@/lib/types";
import { formatNumber, formatPercent, formatUsd } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";

export function AcaraGapDashboard() {
  const { mappings } = useAcaraMappings();
  const [data, setData] = useState<AcaraGapResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const mappingCount = useMemo(() => Object.keys(mappings).length, [mappings]);

  useEffect(() => {
    if (mappingCount === 0) {
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch("/api/acara/gaps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mappings }),
    })
      .then((res) => res.json())
      .then((json: AcaraGapResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [mappingCount, mappings]);

  const summaryLabel = useMemo(() => {
    if (!data?.summary || data.summary.count === 0) return "Sin comparaciones suficientes.";
    if (data.summary.avgGapAbs === null) return "Sin comparaciones suficientes.";
    return data.summary.avgGapAbs < 0
      ? "El mercado esta por debajo de la referencia ACARA."
      : "El mercado esta por encima de la referencia ACARA.";
  }, [data]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Brecha ACARA</p>
          <h2 className="text-lg font-semibold text-jd-black">Mercado vs referencia</h2>
        </div>
      </div>
      <div className="panel-body space-y-3 text-sm text-jd-black/70">
        {mappingCount === 0 ? (
          <p>Vincula modelos en ACARA para ver la brecha de mercado.</p>
        ) : loading ? (
          <p>Cargando brecha...</p>
        ) : data?.summary?.count ? (
          <>
            <p>{summaryLabel}</p>
            <p>
              Diferencia promedio: {formatUsd(data.summary.avgGapAbs)} ({formatPercent(data.summary.avgGapPct, 1)})
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="green">Por debajo: {formatPercent(data.summary.belowPct, 0)}</Badge>
              <Badge variant="yellow">Por encima: {formatPercent(data.summary.abovePct, 0)}</Badge>
              <Badge variant="muted">Casos: {formatNumber(data.summary.count)}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-jd-black/50">Modelos por debajo</p>
                {data.topBelow.length ? (
                  <ul className="mt-2 space-y-1">
                    {data.topBelow.map((item) => (
                      <li key={item.key}>
                        {item.marca} {item.modelo}: {item.avgGapAbs !== null ? formatUsd(item.avgGapAbs) : "Sin dato"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-jd-black/60">Sin datos suficientes.</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase text-jd-black/50">Modelos por encima</p>
                {data.topAbove.length ? (
                  <ul className="mt-2 space-y-1">
                    {data.topAbove.map((item) => (
                      <li key={item.key}>
                        {item.marca} {item.modelo}:{" "}
                        {item.avgGapAbs !== null ? `+${formatUsd(item.avgGapAbs)}` : "Sin dato"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-jd-black/60">Sin datos suficientes.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Sin comparaciones suficientes con ACARA.</p>
        )}
      </div>
    </div>
  );
}
