"use client";

import { useMemo } from "react";
import type { ModelComboStat } from "@/lib/types";
import { useAcaraMappings } from "@/store/useAcaraMappings";
import { formatPercent } from "@/lib/utils/format";

export function AcaraCoveragePanel({ combos }: { combos: ModelComboStat[] }) {
  const { mappings } = useAcaraMappings();

  const coverage = useMemo(() => {
    if (!combos || combos.length === 0) {
      return { mapped: 0, total: 0, pct: 0 };
    }
    const total = combos.length;
    const mapped = combos.filter((combo) => Boolean(mappings[combo.key])).length;
    return { mapped, total, pct: total ? mapped / total : 0 };
  }, [combos, mappings]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Cobertura ACARA</p>
          <h2 className="text-lg font-semibold text-jd-black">Vinculos activos</h2>
        </div>
      </div>
      <div className="panel-body text-sm text-jd-black/70">
        <p>
          {coverage.mapped} de {coverage.total} combos clave estan vinculados.
        </p>
        <p>Avanza en ACARA para comparar mas publicaciones con la referencia del sector.</p>
        <p className="mt-2 text-xs text-jd-black/60">Cobertura: {formatPercent(coverage.pct, 0)}</p>
      </div>
    </div>
  );
}
