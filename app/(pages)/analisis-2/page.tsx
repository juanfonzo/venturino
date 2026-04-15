"use client";

import { useEffect, useMemo, useState } from "react";
import type { Analisis2CompanyRow, Analisis2Response } from "@/lib/analysis/analisis2";
import { Button } from "@/components/ui/Button";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatPercent, formatUsd } from "@/lib/utils/format";

type CategoryBreakdown = {
  categoria: string;
  count: number;
  capitalUsd: number;
};

type CompanyItemRow = {
  id: string;
  origen: string | null;
  categoria: string | null;
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
  isUnitDuplicate: boolean;
};

type CompanyItemsResponse = {
  empresa: string;
  categoryBreakdown: CategoryBreakdown[];
  rows: CompanyItemRow[];
};

function safeListTop<T>(items: T[], n: number) {
  return items.slice(0, n);
}

const CATEGORIAS = [
  { value: "Tractores", label: "Tractores" },
  { value: "Sembradoras", label: "Sembradoras" },
  { value: "Cosechadoras", label: "Cosechadoras" },
  { value: "Pulverizadoras", label: "Pulverizadoras" },
];

const COMPANIES_PER_PAGE = 20;

export default function Analisis2Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Analisis2Response | null>(null);

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<Analisis2CompanyRow | null>(null);

  const [itemsModalEmpresa, setItemsModalEmpresa] = useState<string | null>(null);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsError, setItemsError] = useState<string | null>(null);
  const [itemsData, setItemsData] = useState<CompanyItemsResponse | null>(null);
  const [modalCategoria, setModalCategoria] = useState<string | null>(null);

  const fetchData = async (companies: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
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
    setCurrentPage(1);
    void fetchData(selectedCompanies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanies]);

  const topExampleCompanies = useMemo(() => {
    const companies = data?.companies ?? [];
    return companies.slice(0, 6).map((c) => c.empresa);
  }, [data]);

  const companyOptions = useMemo(() => {
    const names = data?.meta.availableCompanies ?? [];
    return names.map((name) => ({ value: name, label: name }));
  }, [data]);

  const filteredCompanies = useMemo(() => {
    const companies = data?.companies ?? [];
    if (selectedCompanies.length === 0) return companies;
    const set = new Set(selectedCompanies);
    return companies.filter((c) => set.has(c.empresa));
  }, [data, selectedCompanies]);

  const totalCompanyPages = Math.max(1, Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE));

  useEffect(() => {
    if (currentPage <= totalCompanyPages) return;
    setCurrentPage(totalCompanyPages);
  }, [currentPage, totalCompanyPages]);

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * COMPANIES_PER_PAGE;
    return filteredCompanies.slice(start, start + COMPANIES_PER_PAGE);
  }, [currentPage, filteredCompanies]);

  const pageStart = filteredCompanies.length === 0 ? 0 : (currentPage - 1) * COMPANIES_PER_PAGE + 1;
  const pageEnd = Math.min(currentPage * COMPANIES_PER_PAGE, filteredCompanies.length);

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
    setModalCategoria(null);
    try {
      const params = new URLSearchParams();
      params.set("empresa", empresa);
      params.set("limit", "500");
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
        <div className="panel-header flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Análisis 2</p>
            <h2 className="text-lg font-semibold text-jd-black">Stock de competidores</h2>
          </div>

          <div className="flex w-full items-center gap-2 lg:w-auto lg:min-w-[520px] lg:shrink-0 lg:justify-end">
            <MultiSelect
              options={companyOptions}
              value={selectedCompanies}
              onChange={setSelectedCompanies}
              placeholder="Filtrar empresas"
              searchPlaceholder="Buscar empresa..."
              className="w-full lg:w-[520px]"
            />
          </div>
        </div>
        {topExampleCompanies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-6 pb-4 mt-2">
            <span className="text-xs text-jd-black/50">Top:</span>
            {topExampleCompanies.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setSelectedCompanies([name]);
                }}
                className="rounded-full bg-jd-cream/70 px-2.5 py-0.5 text-xs font-medium text-jd-black hover:bg-jd-yellow/60"
              >
                {name}
              </button>
            ))}
            {selectedCompanies.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCompanies([]);
                }}
                className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-medium text-jd-black/60 hover:bg-jd-cream/70"
              >
                Ver todas
              </button>
            )}
          </div>
        )}

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
                  <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Unidades únicas</div>
                  <div className="mt-2 text-2xl font-semibold text-jd-black">{formatNumber(data.kpis.totalUniqueUnits)}</div>
                  {data.meta.dedupCount > 0 && (
                    <div className="mt-1 text-xs text-jd-black/40">{formatNumber(data.meta.dedupCount)} duplicados excluidos</div>
                  )}
                </div>
                <div className="rounded-xl border border-jd-black/10 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Capital inmovilizado</div>
                  <div className="mt-2 text-2xl font-semibold text-jd-black">{formatUsd(data.kpis.totalCapitalUsd)}</div>
                </div>
                <div className="rounded-xl border border-jd-black/10 bg-white/70 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Empresas</div>
                  <div className="mt-2 text-2xl font-semibold text-jd-black">{formatNumber(data.meta.companies)}</div>
                </div>
              </section>

              {data.venturino ? (
                <section className="panel">
                  <div className="panel-header">
                    <div>
                      <h3 className="text-base font-semibold text-jd-black">Venturino</h3>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="overflow-auto rounded-xl border border-jd-black/10">
                      <table className="table-base">
                        <thead>
                          <tr>
                            <th>Empresa</th>
                            <th>Unidades</th>
                            <th>Capital</th>
                            <th>Precio p50</th>
                            <th>Edad p50</th>
                            <th>Top provincias</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const c = data.venturino;
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
                                <td>
                                  <span>{formatNumber(c.countUniqueUnits)}</span>
                                  {c.duplicateUnits > 0 ? (
                                    <span className="ml-1 text-xs text-jd-black/40" title={`${c.duplicateUnits} duplicados por unidad`}>
                                      (+{c.duplicateUnits})
                                    </span>
                                  ) : null}
                                </td>
                                <td>{formatUsd(c.capitalUsd)}</td>
                                <td>{c.priceP50 !== null ? formatUsd(c.priceP50) : "-"}</td>
                                <td>{c.ageP50 !== null ? `${formatNumber(c.ageP50)} años` : "-"}</td>
                                <td className="text-sm text-jd-black/70">{provinces || "-"}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => void openItemsModal(c.empresa)}
                                  >
                                    Ver detalles
                                  </Button>
                                </td>
                              </tr>
                            );
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              ) : null}

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h3 className="text-base font-semibold text-jd-black">Stock por competidor</h3>
                  </div>
                  <div className="text-sm text-jd-black/60">
                    {formatNumber(filteredCompanies.length)} empresas · página {formatNumber(currentPage)}/{formatNumber(totalCompanyPages)}
                  </div>
                </div>
                <div className="panel-body">
                  {filteredCompanies.length === 0 ? (
                    <p className="text-sm text-jd-black/60">Sin resultados para los filtros actuales.</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="overflow-auto rounded-xl border border-jd-black/10">
                        <table className="table-base">
                          <thead>
                            <tr>
                              <th>Empresa</th>
                              <th>Unidades</th>
                              <th>Capital</th>
                              <th>Precio p50</th>
                              <th>Edad p50</th>
                              <th>Top provincias</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedCompanies.map((c) => {
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
                                  <td>
                                    <span>{formatNumber(c.countUniqueUnits)}</span>
                                    {c.duplicateUnits > 0 ? (
                                      <span className="ml-1 text-xs text-jd-black/40" title={`${c.duplicateUnits} duplicados por unidad`}>
                                        (+{c.duplicateUnits})
                                      </span>
                                    ) : null}
                                  </td>
                                  <td>{formatUsd(c.capitalUsd)}</td>
                                  <td>{c.priceP50 !== null ? formatUsd(c.priceP50) : "-"}</td>
                                  <td>{c.ageP50 !== null ? `${formatNumber(c.ageP50)} años` : "-"}</td>
                                  <td className="text-sm text-jd-black/70">{provinces || "-"}</td>
                                  <td>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => void openItemsModal(c.empresa)}
                                    >
                                      Ver detalles
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-jd-black/60">
                          Mostrando {formatNumber(pageStart)}-{formatNumber(pageEnd)} de {formatNumber(filteredCompanies.length)} empresas
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                          >
                            Anterior
                          </Button>
                          <div className="min-w-[72px] text-center text-sm text-jd-black/70">
                            {formatNumber(currentPage)} / {formatNumber(totalCompanyPages)}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage((page) => Math.min(totalCompanyPages, page + 1))}
                            disabled={currentPage === totalCompanyPages}
                          >
                            Siguiente
                          </Button>
                        </div>
                      </div>
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
                  <div className="text-sm text-jd-black/60">
                    {formatNumber(filteredByProvince.length)} provincias
                  </div>
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
                            <th>Top empresas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredByProvince.map((p) => {
                            const width = maxProvinceCount ? Math.round((p.countTotal / maxProvinceCount) * 100) : 0;
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

              <div className="text-xs text-jd-black/40">
                Dedup: empresa + marca + modelo + año. Capital: solo con precio.
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
                  Stock: {formatNumber(selectedCompany?.countTotal ?? 0)} | Capital: {formatUsd(selectedCompany?.capitalUsd ?? 0)} | Precio p50: {selectedCompany?.priceP50 !== null ? formatUsd(selectedCompany?.priceP50 ?? 0) : "-"}
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
          <div className="absolute left-1/2 top-1/2 z-[120] flex max-h-[90vh] w-[min(1100px,95vw)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white shadow-2xl">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-jd-black/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Detalle por categoría</p>
                <h3 className="text-lg font-semibold text-jd-black">{itemsModalEmpresa}</h3>
                <p className="mt-1 text-sm text-jd-black/60">
                  Capital inmovilizado por categoría y publicaciones asociadas.
                </p>
              </div>
              <Button variant="outline" onClick={() => setItemsModalEmpresa(null)}>
                Cerrar
              </Button>
            </div>

            <div className="flex-1 overflow-auto px-6 py-5">
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
                <div className="flex flex-col gap-5">
                  <div className="overflow-auto rounded-xl border border-jd-black/10">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>Categoría</th>
                          <th>Unidades</th>
                          <th>Capital (USD)</th>
                          <th>% del total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const totalCap = itemsData.categoryBreakdown.reduce((s, c) => s + c.capitalUsd, 0);
                          return itemsData.categoryBreakdown.map((cb) => (
                            <tr
                              key={cb.categoria}
                              onClick={() => setModalCategoria(modalCategoria === cb.categoria ? null : cb.categoria)}
                              className={`cursor-pointer transition hover:bg-jd-cream/50 ${modalCategoria === cb.categoria ? "bg-jd-green/10" : ""}`}
                            >
                              <td className="font-semibold">{cb.categoria}</td>
                              <td>{formatNumber(cb.count)}</td>
                              <td>{formatUsd(cb.capitalUsd)}</td>
                              <td>{totalCap > 0 ? formatPercent(cb.capitalUsd / totalCap, 0) : "-"}</td>
                            </tr>
                          ));
                        })()}
                        <tr className="border-t-2 border-jd-black/20 font-semibold">
                          <td>Total</td>
                          <td>{formatNumber(itemsData.categoryBreakdown.reduce((s, c) => s + c.count, 0))}</td>
                          <td>{formatUsd(itemsData.categoryBreakdown.reduce((s, c) => s + c.capitalUsd, 0))}</td>
                          <td>100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setModalCategoria(null)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        modalCategoria === null
                          ? "bg-jd-green text-white"
                          : "bg-jd-black/5 text-jd-black/70 hover:bg-jd-black/10"
                      }`}
                    >
                      Todas
                    </button>
                    {CATEGORIAS.map((cat) => {
                      const bd = itemsData.categoryBreakdown.find((c) => c.categoria === cat.value);
                      if (!bd || bd.count === 0) return null;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setModalCategoria(modalCategoria === cat.value ? null : cat.value)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            modalCategoria === cat.value
                              ? "bg-jd-green text-white"
                              : "bg-jd-black/5 text-jd-black/70 hover:bg-jd-black/10"
                          }`}
                        >
                          {cat.label} ({bd.count})
                        </button>
                      );
                    })}
                  </div>

                  {(() => {
                    const visibleRows = modalCategoria
                      ? itemsData.rows.filter((r) => r.categoria === modalCategoria)
                      : itemsData.rows;
                    const uniqueVisible = visibleRows.filter((r) => !r.isUnitDuplicate);
                    const dupCount = visibleRows.length - uniqueVisible.length;
                    const visibleCapital = uniqueVisible.reduce((s, r) => s + (r.precio_nor ?? 0), 0);
                    return (
                      <div>
                        <div className="mb-2 flex items-baseline gap-3">
                          <span className="text-sm font-semibold text-jd-black">
                            {modalCategoria ?? "Todas las categorías"}
                          </span>
                          <span className="text-xs text-jd-black/60">
                            {formatNumber(uniqueVisible.length)} unidades · {formatUsd(visibleCapital)}
                            {dupCount > 0 ? ` · ${dupCount} duplicados por unidad` : ""}
                          </span>
                        </div>
                        {visibleRows.length === 0 ? (
                          <p className="text-sm text-jd-black/60">Sin publicaciones en esta categoría.</p>
                        ) : (
                          <div className="overflow-auto rounded-xl border border-jd-black/10">
                            <table className="table-base">
                              <thead>
                                <tr>
                                  <th>Publicación</th>
                                  <th>Marca</th>
                                  <th>Modelo</th>
                                  <th>Año</th>
                                  <th>Precio</th>
                                  {!modalCategoria ? <th>Categoría</th> : null}
                                  <th>Origen</th>
                                </tr>
                              </thead>
                              <tbody>
                                {visibleRows.map((r) => (
                                  <tr key={r.id} className={r.isUnitDuplicate ? "opacity-40" : ""}>
                                    <td className="max-w-[420px]">
                                      <div className="flex items-center gap-2">
                                        {r.isUnitDuplicate ? (
                                          <Badge variant="muted">Dup</Badge>
                                        ) : null}
                                        {r.url ? (
                                          <a
                                            href={r.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-semibold text-jd-green hover:underline"
                                          >
                                            {(r.titulo ?? r.url).toString().substring(0, 80)}
                                          </a>
                                        ) : (
                                          <span className="font-semibold">{(r.titulo ?? "-").toString().substring(0, 80)}</span>
                                        )}
                                      </div>
                                    </td>
                                    <td>{r.marca ?? "-"}</td>
                                    <td>{r.modelo ?? "-"}</td>
                                    <td>{r.anio ?? "-"}</td>
                                    <td>{r.precio_nor !== null ? formatUsd(r.precio_nor) : "-"}</td>
                                    {!modalCategoria ? <td className="text-xs text-jd-black/70">{r.categoria ?? "-"}</td> : null}
                                    <td className="text-sm text-jd-black/70">{r.origen ?? "-"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
