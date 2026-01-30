"use client";

import { useEffect, useMemo, useState } from "react";
import type { Analisis2CompanyRow, Analisis2Response } from "@/lib/analysis/analisis2";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatPercent, formatUsd } from "@/lib/utils/format";

type CompanyItemsResponse = {
  empresa: string;
  rows: {
    id: string;
    origen: string | null;
    empresa: string;
    url: string | null;
    titulo: string | null;
    marca: string | null;
    modelo: string | null;
    anio: number | null;
    horas_uso: number | null;
    hp_motor: number | null;
    provincia: string | null;
    precio_nor: number | null;
  }[];
};

function parseCompaniesInput(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function pctBadge(pct: number) {
  if (pct <= 0.05) return { variant: "green" as const, label: "Muy bajo" };
  if (pct <= 0.15) return { variant: "yellow" as const, label: "Medio" };
  return { variant: "red" as const, label: "Alto" };
}

function safeListTop<T>(items: T[], n: number) {
  return items.slice(0, n);
}

export default function Analisis2Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Analisis2Response | null>(null);

  const [companiesInput, setCompaniesInput] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<Analisis2CompanyRow | null>(null);

  const [itemsModalEmpresa, setItemsModalEmpresa] = useState<string | null>(null);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);
  const [itemsData, setItemsData] = useState<CompanyItemsResponse | null>(null);

  const selectedCompanies = useMemo(() => parseCompaniesInput(companiesInput), [companiesInput]);

  const fetchData = async (nextCompanies?: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      const companies = nextCompanies ?? selectedCompanies;
      if (companies.length > 0) {
        params.set("companies", companies.join(","));
      }

      const res = await fetch(`/api/analisis-2?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudo cargar Análisis 2");
      const json = (await res.json()) as Analisis2Response;
      setData(json);
      setSelectedCompany(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setData(null);
      setSelectedCompany(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topExampleCompanies = useMemo(() => {
    const companies = data?.companies ?? [];
    return companies.slice(0, 6).map((c) => c.empresa);
  }, [data]);

  const filteredCompanies = useMemo(() => {
    const companies = data?.companies ?? [];
    if (selectedCompanies.length === 0) return companies;
    const set = new Set(selectedCompanies);
    return companies.filter((c) => set.has(c.empresa));
  }, [data, selectedCompanies]);

  const filteredByProvince = useMemo(() => {
    const rows = data?.byProvince ?? [];
    if (selectedCompanies.length === 0) return rows;
    const set = new Set(selectedCompanies);
    return rows
      .map((r) => ({
        ...r,
        byEmpresa: r.byEmpresa.filter((x) => set.has(x.empresa)),
      }))
      .filter((r) => r.byEmpresa.length > 0);
  }, [data, selectedCompanies]);

  const maxProvinceCount = useMemo(() => {
    return filteredByProvince.reduce((acc, r) => Math.max(acc, r.countTotal), 0);
  }, [filteredByProvince]);

  const isDrawerOpen = selectedCompany !== null;
  const isItemsModalOpen = itemsModalEmpresa !== null;

  const openItemsModal = async (empresa: string) => {
    setItemsModalEmpresa(empresa);
    setItemsLoading(true);
    setItemsError(null);
    setItemsData(null);
    try {
      const params = new URLSearchParams();
      params.set("empresa", empresa);
      params.set("limit", "250");
      const res = await fetch(`/api/analisis-2/items?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudieron cargar publicaciones");
      const json = (await res.json()) as CompanyItemsResponse;
      setItemsData(json);
    } catch (e) {
      setItemsError(e instanceof Error ? e.message : "Error inesperado");
      setItemsData(null);
    } finally {
      setItemsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Análisis 2</p>
            <h2 className="text-lg font-semibold text-jd-black">Stock de competidores (usados)</h2>
            <p className="mt-1 text-sm text-jd-black/60">
              Volumen, composición, antigüedad y capital inmovilizado estimado (solo items con precio).
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-jd-black/50">Filtros</div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  placeholder="Empresas (separadas por coma). Vacío = todas"
                  value={companiesInput}
                  onChange={(e) => setCompaniesInput(e.target.value)}
                  className="sm:w-[420px]"
                />
              </div>
              <div className="text-xs text-jd-black/60">
                Ejemplos: {topExampleCompanies.length ? topExampleCompanies.join(" · ") : "(cargando...)"}
              </div>
              {topExampleCompanies.length ? (
                <div className="flex flex-wrap gap-2">
                  {topExampleCompanies.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setCompaniesInput(name);
                        void fetchData([name]);
                      }}
                      className="rounded-full bg-jd-cream/70 px-3 py-1 text-xs font-semibold text-jd-black hover:bg-jd-yellow/60"
                    >
                      {name}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setCompaniesInput("");
                      void fetchData([]);
                    }}
                    className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-jd-black/70 hover:bg-jd-cream/70"
                  >
                    Ver todas
                  </button>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-jd-black/50">Acción</div>
              <Button
                onClick={() => void fetchData()}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Actualizar"}
              </Button>
            </div>
          </div>
        </div>

        <div className="panel-body">
          {error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          {!data && loading ? (
            <div className="flex items-center gap-3 text-sm text-jd-black/60">
              <Spinner />
              Cargando Análisis 2...
            </div>
          ) : null}

          {data ? (
            <div className="flex flex-col gap-6">
              <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-jd-black/10 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Unidades</div>
                  <div className="mt-2 text-2xl font-semibold text-jd-black">{formatNumber(data.kpis.totalUnits)}</div>
                  <div className="mt-1 text-sm text-jd-black/60">Deduplicadas por URL/ID</div>
                </div>
                <div className="rounded-xl border border-jd-black/10 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Capital inmovilizado</div>
                  <div className="mt-2 text-2xl font-semibold text-jd-black">{formatUsd(data.kpis.totalCapitalUsd)}</div>
                  <div className="mt-1 text-sm text-jd-black/60">Solo items con precio</div>
                </div>
                <div className="rounded-xl border border-jd-black/10 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Sin precio</div>
                  <div className="mt-2 text-2xl font-semibold text-jd-black">{formatPercent(data.kpis.totalMissingPricePct, 0)}</div>
                  <div className="mt-1 text-sm text-jd-black/60">% del stock total</div>
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="text-base font-semibold text-jd-black">Stock por competidor</h3>
                    <p className="mt-1 text-sm text-jd-black/60">
                      Unidades, capital estimado, calidad (sin precio) y señales de composición.
                    </p>
                  </div>
                  <div className="text-sm text-jd-black/60">
                    {formatNumber(filteredCompanies.length)} empresas
                  </div>
                </div>
                <div className="panel-body">
                  {filteredCompanies.length === 0 ? (
                    <p className="text-sm text-jd-black/60">Sin resultados para los filtros actuales.</p>
                  ) : (
                    <div className="overflow-auto rounded-xl border border-jd-black/10">
                      <table className="table-base">
                        <thead>
                          <tr>
                            <th>Empresa</th>
                            <th>Unidades</th>
                            <th>Capital</th>
                            <th>Sin precio</th>
                            <th>Precio p50</th>
                            <th>Edad p50</th>
                            <th>Top provincias</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCompanies.map((c) => {
                            const badge = pctBadge(c.missingPricePct);
                            const provinces = safeListTop(c.topProvinces, 2).map((x) => x.provincia).join(" · ");
                            return (
                              <tr key={c.empresa}>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedCompany(c)}
                                    className="text-left font-semibold text-jd-black hover:underline"
                                  >
                                    {c.empresa}
                                  </button>
                                </td>
                                <td>{formatNumber(c.countTotal)}</td>
                                <td>{formatUsd(c.capitalUsd)}</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <Badge variant={badge.variant}>{formatPercent(c.missingPricePct, 0)}</Badge>
                                    <span className="text-xs text-jd-black/60">({formatNumber(c.missingPriceCount)})</span>
                                  </div>
                                </td>
                                <td>{c.priceP50 !== null ? formatUsd(c.priceP50) : "-"}</td>
                                <td>{c.ageP50 !== null ? `${formatNumber(c.ageP50)} años` : "-"}</td>
                                <td className="text-sm text-jd-black/70">{provinces || "-"}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => void openItemsModal(c.empresa)}
                                  >
                                    Ver publicaciones
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="text-base font-semibold text-jd-black">Mapa por provincia</h3>
                    <p className="mt-1 text-sm text-jd-black/60">
                      Tabla con intensidad por volumen (unidades). Listo para choropleth usando GeoJSON local.
                    </p>
                  </div>
                  <div className="text-sm text-jd-black/60">{formatNumber(filteredByProvince.length)} provincias</div>
                </div>
                <div className="panel-body">
                  {filteredByProvince.length === 0 ? (
                    <p className="text-sm text-jd-black/60">Sin provincias para los filtros actuales.</p>
                  ) : (
                    <div className="overflow-auto rounded-xl border border-jd-black/10">
                      <table className="table-base">
                        <thead>
                          <tr>
                            <th>Provincia</th>
                            <th>Intensidad</th>
                            <th>Unidades</th>
                            <th>Capital</th>
                            <th>Sin precio</th>
                            <th>Top empresas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredByProvince.map((p) => {
                            const width = maxProvinceCount ? Math.round((p.countTotal / maxProvinceCount) * 100) : 0;
                            const badge = pctBadge(p.missingPricePct);
                            const topEmpresas = safeListTop(p.byEmpresa, 3)
                              .map((x) => `${x.empresa} (${formatNumber(x.countTotal)})`)
                              .join(" · ");

                            return (
                              <tr key={p.provincia}>
                                <td className="font-semibold">{p.provincia}</td>
                                <td>
                                  <div className="h-3 w-[180px] rounded-full bg-jd-black/10">
                                    <div
                                      className="h-3 rounded-full bg-jd-green"
                                      style={{ width: `${width}%` }}
                                    />
                                  </div>
                                </td>
                                <td>{formatNumber(p.countTotal)}</td>
                                <td>{formatUsd(p.capitalUsd)}</td>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <Badge variant={badge.variant}>{formatPercent(p.missingPricePct, 0)}</Badge>
                                    <span className="text-xs text-jd-black/60">({formatNumber(p.missingPriceCount)})</span>
                                  </div>
                                </td>
                                <td className="text-sm text-jd-black/70">{topEmpresas || "-"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>

              <div className="text-xs text-jd-black/50">
                Deduplicación: URL (si existe) y luego ID. Antigüedad: solo con año. Capital: solo con precio.
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {isDrawerOpen ? (
        <div className="fixed inset-0 z-[90]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedCompany(null)}
          />
          <div className="absolute inset-x-0 bottom-0 z-[100] max-h-[85vh] overflow-auto rounded-t-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-jd-black/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Detalle empresa</p>
                <h3 className="text-lg font-semibold text-jd-black">{selectedCompany?.empresa}</h3>
                <p className="mt-1 text-sm text-jd-black/60">
                  Stock: {formatNumber(selectedCompany?.countTotal ?? 0)} | Capital: {formatUsd(selectedCompany?.capitalUsd ?? 0)} | Sin precio: {formatPercent(selectedCompany?.missingPricePct ?? 0, 0)}
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedCompany(null)}>Cerrar</Button>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h4 className="text-base font-semibold text-jd-black">Composición</h4>
                    <p className="mt-1 text-sm text-jd-black/60">Top marcas y rangos de HP.</p>
                  </div>
                </div>
                <div className="panel-body grid gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-jd-black/50">Top marcas</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(selectedCompany?.topBrands ?? []).slice(0, 12).map((b) => (
                        <Badge key={b.marca} variant="muted">{b.marca}: {formatNumber(b.count)}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-jd-black/50">HP buckets</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(selectedCompany?.hpBuckets ?? []).map((b) => (
                        <Badge key={b.bucket} variant="muted">{b.bucket}: {formatNumber(b.count)}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h4 className="text-base font-semibold text-jd-black">Antigüedad y provincias</h4>
                    <p className="mt-1 text-sm text-jd-black/60">Buckets de edad y distribución geográfica (texto).</p>
                  </div>
                </div>
                <div className="panel-body grid gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-jd-black/50">Edad buckets</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(selectedCompany?.ageBuckets ?? []).map((b) => (
                        <Badge key={b.bucket} variant="muted">{b.bucket} años: {formatNumber(b.count)}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-jd-black/50">Top provincias</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(selectedCompany?.topProvinces ?? []).slice(0, 12).map((b) => (
                        <Badge key={b.provincia} variant="muted">{b.provincia}: {formatNumber(b.count)}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isItemsModalOpen ? (
        <div className="fixed inset-0 z-[110]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setItemsModalEmpresa(null)}
          />
          <div className="absolute left-1/2 top-1/2 z-[120] w-[min(1000px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-jd-black/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Publicaciones</p>
                <h3 className="text-lg font-semibold text-jd-black">{itemsModalEmpresa}</h3>
                <p className="mt-1 text-sm text-jd-black/60">Listado deduplicado (top 250), ordenado por precio desc.</p>
              </div>
              <Button variant="outline" onClick={() => setItemsModalEmpresa(null)}>
                Cerrar
              </Button>
            </div>

            <div className="max-h-[70vh] overflow-auto px-6 py-5">
              {itemsError ? (
                <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-700">{itemsError}</div>
              ) : null}

              {itemsLoading ? (
                <div className="flex items-center gap-3 text-sm text-jd-black/60">
                  <Spinner />
                  Cargando publicaciones...
                </div>
              ) : null}

              {!itemsLoading && itemsData && itemsData.rows.length === 0 ? (
                <p className="text-sm text-jd-black/60">No hay publicaciones para esta empresa.</p>
              ) : null}

              {!itemsLoading && itemsData && itemsData.rows.length > 0 ? (
                <div className="overflow-auto rounded-xl border border-jd-black/10">
                  <table className="table-base">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Provincia</th>
                        <th>Precio</th>
                        <th>Origen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsData.rows.map((r) => (
                        <tr key={r.id}>
                          <td className="max-w-[520px]">
                            {r.url ? (
                              <a
                                href={r.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-jd-black hover:underline"
                              >
                                {(r.titulo ?? r.url).toString()}
                              </a>
                            ) : (
                              <span className="font-semibold">{(r.titulo ?? "-").toString()}</span>
                            )}
                          </td>
                          <td>{r.marca ?? "-"}</td>
                          <td>{r.modelo ?? "-"}</td>
                          <td>{r.anio ?? "-"}</td>
                          <td>{r.provincia ?? "-"}</td>
                          <td>{r.precio_nor !== null ? formatUsd(r.precio_nor) : "-"}</td>
                          <td className="text-sm text-jd-black/70">{r.origen ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
