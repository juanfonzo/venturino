"use client";

import { useEffect, useMemo, useState } from "react";
import type { TractorItem } from "@/lib/types";
import type { Analisis1Response, Analisis1VenturinoMatch, Analisis1ModelRanking } from "@/lib/analysis/analisis1";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatPercent, formatUsd, formatYear } from "@/lib/utils/format";

function badgeForDiff(diffPct: number | null) {
  if (diffPct === null) return { label: "Sin precio", variant: "muted" as const };
  if (diffPct >= 0.1) return { label: "Venturino más caro", variant: "red" as const };
  if (diffPct <= -0.1) return { label: "Venturino más barato", variant: "green" as const };
  return { label: "Similar", variant: "yellow" as const };
}

function asText(value?: string | null) {
  return (value ?? "").toString();
}

function buildKey(marcaNorm?: string | null, modeloNorm?: string | null) {
  if (!marcaNorm || !modeloNorm) return null;
  return `${marcaNorm}|${modeloNorm}`;
}

export default function Analisis1Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Analisis1Response | null>(null);

  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    modelSearch: "",
    tableSearch: "",
    compareYear: true,
    compareHours: true,
    yearTolerance: 1,
    hoursTolerancePct: 0.15,
    fuzzyLevel: 1,
  });

  const [selected, setSelected] = useState<Analisis1VenturinoMatch | null>(null);

  const [activeModelKey, setActiveModelKey] = useState<string | null>(null);

  const fetchData = async (next?: { brand?: string; model?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      const brand = next?.brand ?? filters.brand;
      const model = next?.model ?? filters.model;
      if (brand) params.set("brand", brand);
      if (model) params.set("model", model);

      params.set("compareYear", filters.compareYear ? "1" : "0");
      params.set("compareHours", filters.compareHours ? "1" : "0");
      params.set("yearTolerance", String(filters.yearTolerance));
      params.set("hoursTolerancePct", String(filters.hoursTolerancePct));
      params.set("fuzzyLevel", String(filters.fuzzyLevel));

      const res = await fetch(`/api/analisis-1?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("No se pudo cargar Análisis 1");
      }
      const json = (await res.json()) as Analisis1Response;
      setData(json);
      setSelected(null);
      if (json.rankings.length > 0) {
        setActiveModelKey(json.rankings[0].key);
      } else {
        setActiveModelKey(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setData(null);
      setActiveModelKey(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRanking: Analisis1ModelRanking | null = useMemo(() => {
    if (!data || !activeModelKey) return null;
    return data.rankings.find((r) => r.key === activeModelKey) ?? null;
  }, [data, activeModelKey]);

  const filteredRows: Analisis1VenturinoMatch[] = useMemo(() => {
    const rows = data?.rows ?? [];
    const q = filters.tableSearch.trim().toLowerCase();

    let out = rows;

    if (activeModelKey) {
      out = out.filter((r) => buildKey(r.venturino.marca_norm, r.venturino.modelo_norm) === activeModelKey);
    }

    if (q) {
      out = out.filter((r) => {
        const v = r.venturino;
        const hay = `${asText(v.marca)} ${asText(v.modelo)} ${asText(v.url)}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return out;
  }, [data, filters.tableSearch, activeModelKey]);

  const isDrawerOpen = selected !== null;

  return (
    <div className="flex flex-col gap-6">
      <div className="panel">
        <div className="panel-header flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Análisis 1</p>
            <h2 className="text-lg font-semibold text-jd-black">Venturino vs competencia</h2>
            <p className="mt-1 text-sm text-jd-black/60">Matching por marca + modelo (opcional: año/horas).</p>
          </div>
          <div className="w-full max-w-[860px]">
            <div className="rounded-2xl border border-jd-black/10 bg-white/60 p-4">
              <div className="grid gap-3">
                <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto] md:items-center">
                  <Input
                    placeholder="Marca (ej: Pauny)"
                    value={filters.brand}
                    onChange={(e) => setFilters((p) => ({ ...p, brand: e.target.value }))}
                  />
                  <Input
                    placeholder="Modelo (ej: 280A)"
                    value={filters.model}
                    onChange={(e) => setFilters((p) => ({ ...p, model: e.target.value }))}
                  />
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters((p) => ({
                          ...p,
                          brand: "",
                          model: "",
                        }))
                      }
                      disabled={loading || (!filters.brand && !filters.model)}
                    >
                      Limpiar
                    </Button>
                    <Button onClick={() => void fetchData()} disabled={loading}>
                      {loading ? "Cargando..." : "Buscar"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-jd-black/10 bg-white px-3 py-2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-jd-black">
                      <input
                        type="checkbox"
                        checked={filters.compareYear}
                        onChange={(e) => setFilters((p) => ({ ...p, compareYear: e.target.checked }))}
                        className="h-4 w-4"
                      />
                      Año
                    </label>
                    <Input
                      value={String(filters.yearTolerance)}
                      onChange={(e) => {
                        const raw = Number.parseInt(e.target.value || "0", 10);
                        const safe = Number.isFinite(raw) ? Math.max(0, Math.min(raw, 10)) : 1;
                        setFilters((p) => ({ ...p, yearTolerance: safe }));
                      }}
                      className="w-16"
                      disabled={!filters.compareYear}
                    />
                    <span className="text-[11px] text-jd-black/50">±</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-jd-black">
                      <input
                        type="checkbox"
                        checked={filters.compareHours}
                        onChange={(e) => setFilters((p) => ({ ...p, compareHours: e.target.checked }))}
                        className="h-4 w-4"
                      />
                      Horas
                    </label>
                    <Input
                      value={String(Math.round(filters.hoursTolerancePct * 100))}
                      onChange={(e) => {
                        const raw = Number.parseFloat(e.target.value || "0");
                        const safePct = Number.isFinite(raw) ? Math.max(0, Math.min(raw, 100)) : 15;
                        setFilters((p) => ({ ...p, hoursTolerancePct: safePct / 100 }));
                      }}
                      className="w-16"
                      disabled={!filters.compareHours}
                    />
                    <span className="text-[11px] text-jd-black/50">%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-jd-black">Precisión</span>
                    <select
                      value={String(filters.fuzzyLevel)}
                      onChange={(e) => {
                        const raw = Number.parseInt(e.target.value || "1", 10);
                        const safe = Number.isFinite(raw) ? Math.max(0, Math.min(raw, 3)) : 1;
                        setFilters((p) => ({ ...p, fuzzyLevel: safe }));
                      }}
                      className="w-[168px] rounded-xl border border-jd-black/15 bg-white/80 px-3 py-2 text-sm outline-none transition focus:border-jd-green"
                    >
                      <option value="1">Alta</option>
                      <option value="2">Media</option>
                      <option value="3">Baja</option>
                      <option value="0">Desactivada</option>
                    </select>
                    <span className="ml-auto text-[11px] text-jd-black/50">Solo modelo: apagar Año/Horas.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-body">
          {error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {!data && loading ? (
            <div className="flex items-center gap-3 text-sm text-jd-black/60">
              <Spinner />
              Cargando Análisis 1...
            </div>
          ) : null}

          {data ? (
            <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="text-base font-semibold text-jd-black">Rankings por modelo</h3>
                    <p className="mt-1 text-sm text-jd-black/60">
                      Seleccioná un modelo para ver el ranking por empresa (promedio USD).
                    </p>
                  </div>
                </div>
                <div className="panel-body">
                  {data.rankings.length === 0 ? (
                    <p className="text-sm text-jd-black/60">No hay suficientes datos para rankings.</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="rounded-xl border border-jd-black/10 bg-white/70 p-3 text-xs text-jd-black/60">
                        <div className="font-semibold text-jd-black">Diagnóstico rápido</div>
                        <div className="mt-1 grid gap-1">
                          <div>
                            Competencia total: {formatNumber(data.meta.competitorsCount)} | Con marca+modelo+año (post filtros): {formatNumber(data.meta.debug.competitorsWithKey)}
                          </div>
                          <div>
                            Competencia sin marca/modelo: {formatNumber(data.meta.debug.competitorsMissingKey)} | Sin año: {formatNumber(data.meta.debug.competitorsMissingYear)}
                          </div>
                          <div>
                            Excluidos por Venturino (en marketplaces): {formatNumber(data.meta.debug.competitorsExcludedVenturino)}
                          </div>
                          <div>
                            Keys Venturino: {formatNumber(data.meta.debug.venturinoKeys)} | Keys competencia: {formatNumber(data.meta.debug.competitorKeys)} | Keys compartidas: {formatNumber(data.meta.debug.sharedKeys)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Filtrar modelos (busca en marca/modelo)"
                          value={filters.modelSearch}
                          onChange={(e) => setFilters((p) => ({ ...p, modelSearch: e.target.value }))}
                        />
                        <Button
                          variant="outline"
                          onClick={() => setFilters((p) => ({ ...p, modelSearch: "" }))}
                          disabled={!filters.modelSearch}
                        >
                          Limpiar
                        </Button>
                      </div>

                      <div className="max-h-[420px] overflow-auto rounded-xl border border-jd-black/10">
                        <table className="table-base">
                          <thead>
                            <tr>
                              <th>Modelo</th>
                              <th>n</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.rankings
                              .filter((r) => {
                                if (!filters.modelSearch.trim()) return true;
                                const q = filters.modelSearch.trim().toLowerCase();
                                const hay = `${r.marca ?? ""} ${r.modelo ?? ""}`.toLowerCase();
                                return hay.includes(q);
                              })
                              .slice(0, 200)
                              .map((r) => {
                                const totalN = r.rows.reduce((acc, x) => acc + x.n, 0);
                                const active = r.key === activeModelKey;
                                return (
                                  <tr
                                    key={r.key}
                                    className={active ? "bg-jd-yellow/20" : undefined}
                                  >
                                    <td>
                                      <button
                                        type="button"
                                        onClick={() => setActiveModelKey(r.key)}
                                        className="text-left font-semibold text-jd-black hover:underline"
                                      >
                                        {r.marca} {r.modelo}
                                      </button>
                                    </td>
                                    <td>{formatNumber(totalN)}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>

                      <div className="rounded-xl border border-jd-black/10 bg-white/70 p-3">
                        <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Ranking (promedio)</div>
                        {activeRanking ? (
                          <div className="mt-2">
                            <div className="text-sm font-semibold text-jd-black">
                              {activeRanking.marca} {activeRanking.modelo}
                            </div>
                            <table className="table-base mt-2">
                              <thead>
                                <tr>
                                  <th>Empresa</th>
                                  <th>Prom.</th>
                                  <th>n</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activeRanking.rows.slice(0, 12).map((row) => (
                                  <tr key={row.empresa}>
                                    <td>{row.empresa}</td>
                                    <td>{formatUsd(row.avgPriceUsd)}</td>
                                    <td>{formatNumber(row.n)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-jd-black/60">Seleccioná un modelo para ver el ranking.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="text-base font-semibold text-jd-black">Tractores Venturino</h3>
                    <p className="mt-1 text-sm text-jd-black/60">
                      Click en una fila para ver equivalentes (competencia) y brechas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      placeholder="Buscar en Venturino (marca/modelo/url)"
                      value={filters.tableSearch}
                      onChange={(e) => setFilters((p) => ({ ...p, tableSearch: e.target.value }))}
                      className="sm:w-72"
                    />
                    <div className="text-sm text-jd-black/60">{formatNumber(filteredRows.length)} filas</div>
                  </div>
                </div>
                <div className="panel-body">
                  {filteredRows.length === 0 ? (
                    <p className="text-sm text-jd-black/60">Sin resultados para los filtros actuales.</p>
                  ) : (
                    <div className="overflow-auto rounded-xl border border-jd-black/10">
                      <table className="table-base">
                        <thead>
                          <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Horas</th>
                            <th>Precio</th>
                            <th>Eq.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => {
                            const v = row.venturino;
                            const eqCount = row.equivalents.length;
                            return (
                              <tr
                                key={v.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => setSelected(row)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") setSelected(row);
                                }}
                                className="cursor-pointer hover:bg-jd-black/5"
                              >
                                <td>{v.marca}</td>
                                <td className="font-semibold text-jd-black">{v.modelo}</td>
                                <td>{formatYear(v.anio)}</td>
                                <td>{formatNumber(v.horas_uso)}</td>
                                <td>{formatUsd(v.precio_nor)}</td>
                                <td>{formatNumber(eqCount)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </div>

      {isDrawerOpen ? (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 z-0 bg-black/30"
            onClick={() => setSelected(null)}
            role="button"
            tabIndex={0}
            aria-label="Cerrar"
            onKeyDown={(e) => {
              if (e.key === "Escape") setSelected(null);
            }}
          />

          <aside className="relative z-10 ml-auto flex h-full w-full max-w-2xl flex-col bg-white shadow-xl">
            <div className="flex shrink-0 items-start justify-between border-b border-jd-black/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Detalle</p>
                <h3 className="text-lg font-semibold text-jd-black">
                  {selected?.venturino.marca} {selected?.venturino.modelo}
                </h3>
                <p className="mt-1 text-sm text-jd-black/60">
                  Venturino: {formatUsd(selected?.venturino.precio_nor)} | Año {formatYear(selected?.venturino.anio)} | Horas {formatNumber(selected?.venturino.horas_uso)}
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelected(null)}>
                Cerrar
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-5">
              {selected && selected.equivalents.length === 0 ? (
                <p className="text-sm text-jd-black/60">
                  No se encontraron equivalentes con año ±1 (y horas ±15% si existían).
                </p>
              ) : null}

              {selected ? (
                <div className="overflow-x-auto rounded-xl border border-jd-black/10">
                  <table className="table-base">
                    <thead>
                      <tr>
                        <th>Empresa</th>
                        <th>Año</th>
                        <th>Horas</th>
                        <th>Precio</th>
                        <th>Brecha</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.equivalents.map((eq) => {
                        const badge = badgeForDiff(eq.diff_pct);
                        return (
                          <tr key={eq.id}>
                            <td>{eq.empresa ?? eq.origen ?? "-"}</td>
                            <td>{formatYear(eq.anio)}</td>
                            <td>
                              {formatNumber(eq.horas_uso)}
                              {eq.flags.includes("HOURS_NOT_COMPARED") ? (
                                <span className="ml-2 text-xs text-jd-black/50">(sin comparar)</span>
                              ) : null}
                            </td>
                            <td>{formatUsd(eq.precio_nor)}</td>
                            <td>
                              <div className="flex flex-col gap-1">
                                <Badge variant={badge.variant}>{badge.label}</Badge>
                                <span className="text-xs text-jd-black/60">
                                  {formatPercent(eq.diff_pct, 0)} ({formatUsd(eq.diff_abs_usd)})
                                </span>
                              </div>
                            </td>
                            <td>
                              {eq.url ? (
                                <a
                                  className="text-sm font-semibold text-jd-green hover:underline"
                                  href={eq.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Ver
                                </a>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
