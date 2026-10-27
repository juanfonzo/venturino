"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { KpiCard } from "@/components/KpiCard";
import { formatNumber, formatPercent } from "@/lib/utils/format";

type AnalysisRunInfo = {
  id: number;
  algorithmVersion: string;
  priceBand: number;
  similarityThreshold: number;
  topN: number;
  minScore: number;
  venturinoDate: string | null;
  mlDate: string | null;
  createdAt: string;
};

type SummaryResponse = {
  analysisRun: AnalysisRunInfo | null;
  kpis: {
    total: number;
    comparable: number;
    noComparable: number;
    lowConfidence: number;
    actionableMoreExpensive: number;
    actionableCheaper: number;
  };
};

type ProductItem = {
  id: number;
  productId: number;
  externalId: string;
  name: string;
  priceArs: number | null;
  url: string | null;
  status: string;
  medianMlPriceArs: number | null;
  ventVsMedianPct: number | null;
  bestConfidence: string;
  strongCandidateCount: number;
  totalCandidates: number;
  excludedByPrice: number;
  excludedByScore: number;
  bestCandidate: {
    name: string;
    priceArs: number | null;
    score: number;
    confidence: string;
  } | null;
};

type ProductsResponse = {
  analysisRun: AnalysisRunInfo | null;
  items: ProductItem[];
  total: number;
  page: number;
  pageSize: number;
};

type ProductDetail = ProductItem & {
  candidates: Array<{
    id: number;
    rank: number;
    mlProductId: number;
    mlExternalId: string;
    name: string;
    priceArs: number | null;
    url: string | null;
    installmentTotalArs: number | null;
    installmentsQuantity: number | null;
    freeShipping: boolean | null;
    score: number;
    confidence: string;
    diffPct: number | null;
    reasons: string[];
  }>;
};

const PAGE_SIZE = 25;
const STATUS_OPTIONS = [
  "Venturino más caro que ML",
  "Venturino más barato que ML",
  "similar a ML",
  "baja confianza",
  "sin comparable",
];
const CONFIDENCE_OPTIONS = ["alta", "media", "baja", "descartar"];

export function PostventaDashboard() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [confidence, setConfidence] = useState("");
  const [sortBy, setSortBy] = useState("comparableFirst");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("pageSize", PAGE_SIZE.toString());
    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (confidence) params.set("confidence", confidence);
    return params.toString();
  }, [confidence, page, search, sortBy, sortDir, status]);

  const reportQueryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (confidence) params.set("confidence", confidence);
    return params.toString();
  }, [confidence, search, sortBy, sortDir, status]);

  useEffect(() => {
    let cancelled = false;
    setLoadingSummary(true);
    fetch("/api/postventa/summary")
      .then(assertJson<SummaryResponse>)
      .then((payload) => {
        if (!cancelled) setSummary(payload);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "No se pudo cargar resumen");
      })
      .finally(() => {
        if (!cancelled) setLoadingSummary(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadingProducts(true);
    setError(null);
    fetch(`/api/postventa/products?${queryString}`)
      .then(assertJson<ProductsResponse>)
      .then((payload) => {
        if (cancelled) return;
        setProducts(payload);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "No se pudieron cargar productos");
      })
      .finally(() => {
        if (!cancelled) setLoadingProducts(false);
      });
    return () => {
      cancelled = true;
    };
  }, [queryString]);

  useEffect(() => {
    if (!selectedId) {
      setDetail(null);
      setLoadingDetail(false);
      return;
    }
    let cancelled = false;
    setLoadingDetail(true);
    fetch(`/api/postventa/products/${selectedId}`)
      .then(assertJson<ProductDetail>)
      .then((payload) => {
        if (!cancelled) setDetail(payload);
      })
      .catch(() => {
        if (!cancelled) setDetail(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingDetail(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const totalPages = products ? Math.max(1, Math.ceil(products.total / products.pageSize)) : 1;
  const analysisRun = summary?.analysisRun ?? products?.analysisRun ?? null;

  function applySearch() {
    setSearch(searchDraft.trim());
    setPage(1);
  }

  function clearFilters() {
    setSearchDraft("");
    setSearch("");
    setStatus("");
    setConfidence("");
    setSortBy("comparableFirst");
    setSortDir("desc");
    setPage(1);
  }

  function openDetail(id: number) {
    setDetail(null);
    setSelectedId(id);
  }

  function closeDetail() {
    setSelectedId(null);
  }

  async function downloadPdf() {
    setExportingPdf(true);
    setError(null);
    try {
      const response = await fetch(`/api/reports/postventa?${reportQueryString}`);
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as { error?: unknown }).error)
            : `Error ${response.status}`;
        throw new Error(message);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getFilename(response.headers.get("Content-Disposition")) || "postventa-vs-ml.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo generar el PDF");
    } finally {
      setExportingPdf(false);
    }
  }

  if (!loadingSummary && summary && !summary.analysisRun) {
    return (
      <div className="panel">
        <div className="panel-body">
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Postventa</p>
          <h2 className="mt-2 text-xl font-semibold text-jd-black">Sin análisis disponible</h2>
          <p className="mt-2 text-sm text-jd-black/65">
            Ejecutá el proceso de Postventa desde la configuración del dashboard para importar Mongo,
            persistir resultados y generar la primera corrida.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Productos evaluados"
          value={loadingSummary ? "..." : formatNumber(summary?.kpis.total)}
          helper={analysisRun ? `Corrida #${analysisRun.id}` : "Última corrida"}
        />
        <KpiCard
          label="Con comparable"
          value={loadingSummary ? "..." : formatNumber(summary?.kpis.comparable)}
          helper={formatPercent(safeRatio(summary?.kpis.comparable, summary?.kpis.total), 1)}
          tone="green"
        />
        <KpiCard
          label="Más caro que ML"
          value={loadingSummary ? "..." : formatNumber(summary?.kpis.actionableMoreExpensive)}
          helper="Brechas para revisar"
          tone="yellow"
        />
        <KpiCard
          label="Sin comparable"
          value={loadingSummary ? "..." : formatNumber(summary?.kpis.noComparable)}
          helper={`${formatNumber(summary?.kpis.lowConfidence)} baja confianza`}
        />
      </section>

      <section className="panel">
        <div className="panel-header gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Postventa</p>
            <h2 className="text-lg font-semibold text-jd-black">Benchmark Venturino vs MercadoLibre</h2>
          </div>
          {analysisRun ? (
            <div className="flex flex-col items-end gap-2">
              <div className="text-right text-xs text-jd-black/55">
                <p>Venturino {analysisRun.venturinoDate || "-"}</p>
                <p>ML {analysisRun.mlDate || "-"}</p>
              </div>
              <Button type="button" size="sm" variant="outline" onClick={downloadPdf} disabled={exportingPdf}>
                {exportingPdf ? "Generando..." : "Descargar PDF"}
              </Button>
            </div>
          ) : null}
        </div>

        <div className="panel-body flex flex-col gap-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_180px_150px_160px_120px_auto]">
            <Input
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") applySearch();
              }}
              placeholder="Buscar nombre o código"
            />
            <Select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">Todos los estados</option>
              {STATUS_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              value={confidence}
              onChange={(event) => {
                setConfidence(event.target.value);
                setPage(1);
              }}
            >
              <option value="">Confianza</option>
              {CONFIDENCE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(1);
              }}
            >
              <option value="comparableFirst">Comparables primero</option>
              <option value="ventVsMedianPct">Brecha</option>
              <option value="name">Nombre</option>
              <option value="priceArs">Precio</option>
              <option value="status">Estado</option>
              <option value="confidence">Confianza</option>
            </Select>
            <Select
              value={sortDir}
              onChange={(event) => {
                setSortDir(event.target.value);
                setPage(1);
              }}
            >
              <option value="desc">Desc.</option>
              <option value="asc">Asc.</option>
            </Select>
            <div className="flex gap-2">
              <Button type="button" onClick={applySearch}>
                Buscar
              </Button>
              <Button type="button" variant="ghost" onClick={clearFilters}>
                Limpiar
              </Button>
            </div>
          </div>

          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="overflow-hidden rounded-lg border border-jd-black/10 bg-white/70">
            {loadingProducts ? (
              <div className="flex min-h-64 items-center justify-center">
                <Spinner />
              </div>
            ) : products && products.items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table-base min-w-[980px]">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Estado</th>
                        <th>Precio</th>
                        <th>Mediana ML</th>
                        <th>Brecha</th>
                        <th>Conf.</th>
                        <th>Cand.</th>
                        <th className="text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.items.map((item) => (
                        <tr key={item.id} className="transition hover:bg-jd-yellow/10">
                          <td>
                            <div className="max-w-xl">
                              <p className="font-medium text-jd-black">{item.name}</p>
                              <p className="text-xs text-jd-black/45">#{item.externalId}</p>
                            </div>
                          </td>
                          <td>
                            <StatusBadge status={item.status} />
                          </td>
                          <td>{formatArs(item.priceArs)}</td>
                          <td>{formatArs(item.medianMlPriceArs)}</td>
                          <td className={gapClass(item.ventVsMedianPct)}>
                            {formatSignedPercent(item.ventVsMedianPct)}
                          </td>
                          <td>
                            <ConfidenceBadge confidence={item.bestConfidence} />
                          </td>
                          <td>{item.totalCandidates}</td>
                          <td className="text-right">
                            <Button type="button" size="sm" variant="outline" onClick={() => openDetail(item.id)}>
                              Ver
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-5 py-12 text-center text-sm text-jd-black/60">
                  No hay productos para los filtros seleccionados.
                </div>
              )}

            <div className="flex items-center justify-between border-t border-jd-black/10 px-4 py-3 text-sm">
                <span className="text-jd-black/55">
                  {products ? `${formatNumber(products.total)} resultados` : "-"}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                    disabled={page <= 1 || loadingProducts}
                  >
                    Anterior
                  </Button>
                  <span className="text-xs text-jd-black/55">
                    {page} / {totalPages}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                    disabled={page >= totalPages || loadingProducts}
                  >
                    Siguiente
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {selectedId ? <DetailModal detail={detail} loading={loadingDetail} onClose={closeDetail} /> : null}
    </div>
  );
}

function DetailModal({
  detail,
  loading,
  onClose,
}: {
  detail: ProductDetail | null;
  loading: boolean;
  onClose: () => void;
}) {
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-jd-black/40 px-4 py-6">
        <div className="panel w-full max-w-3xl">
          <div className="panel-body flex min-h-64 items-center justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-jd-black/40 px-4 py-6">
        <div className="panel w-full max-w-3xl">
          <div className="panel-header">
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Detalle</p>
            <Button type="button" size="sm" variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </div>
          <div className="panel-body text-sm text-jd-black/60">No se pudo cargar el detalle del producto.</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-jd-black/40 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="postventa-detail-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="panel max-h-[90vh] w-full max-w-3xl overflow-hidden">
        <div className="panel-header gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Detalle</p>
            <h3 id="postventa-detail-title" className="text-base font-semibold text-jd-black">
              {detail.name}
            </h3>
          </div>
          <Button type="button" size="sm" variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </div>
        <div className="panel-body flex max-h-[calc(90vh-84px)] flex-col gap-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            <Metric label="Precio" value={formatArs(detail.priceArs)} />
            <Metric label="Mediana ML" value={formatArs(detail.medianMlPriceArs)} />
            <Metric label="Brecha" value={formatSignedPercent(detail.ventVsMedianPct)} />
            <Metric label="Candidatos" value={formatNumber(detail.totalCandidates)} />
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge status={detail.status} />
            <ConfidenceBadge confidence={detail.bestConfidence} />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Candidatos ML</p>
            {detail.candidates.length > 0 ? (
              detail.candidates.map((candidate) => (
                <div key={candidate.id} className="rounded-lg border border-jd-black/10 bg-white/70 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-jd-black">
                        {candidate.url ? (
                          <a href={candidate.url} target="_blank" rel="noreferrer" className="hover:text-jd-green">
                            {candidate.name}
                          </a>
                        ) : (
                          candidate.name
                        )}
                      </p>
                      <p className="mt-1 text-xs text-jd-black/45">#{candidate.mlExternalId}</p>
                    </div>
                    <span className="rounded bg-jd-cream px-2 py-1 text-xs font-semibold text-jd-black/70">
                      {candidate.score}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-jd-black/60">
                    <span>{formatArs(candidate.priceArs)}</span>
                    <span className={gapClass(candidate.diffPct)}>{formatSignedPercent(candidate.diffPct)}</span>
                    <ConfidenceBadge confidence={candidate.confidence} />
                    {candidate.freeShipping ? <Badge variant="green">Envío gratis</Badge> : null}
                  </div>
                  {candidate.installmentTotalArs && candidate.installmentsQuantity ? (
                    <p className="mt-2 text-xs text-jd-black/55">
                      {formatInstallmentTerms(candidate.installmentTotalArs, candidate.installmentsQuantity)}
                    </p>
                  ) : null}
                  {candidate.reasons.length > 0 ? (
                    <p className="mt-2 text-xs leading-relaxed text-jd-black/55">
                      {candidate.reasons.slice(0, 4).join(" · ")}
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-jd-black/10 bg-white/70 p-3 text-sm text-jd-black/60">
                Sin candidatos para los parámetros de la corrida.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-jd-black/10 bg-white/70 p-3">
      <p className="text-xs uppercase tracking-wide text-jd-black/45">{label}</p>
      <p className="mt-1 font-semibold text-jd-black">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Venturino más caro que ML"
      ? "red"
      : status === "Venturino más barato que ML"
        ? "green"
        : status === "similar a ML"
          ? "yellow"
          : status === "baja confianza"
            ? "muted"
            : "default";
  return <Badge variant={variant}>{status}</Badge>;
}

function ConfidenceBadge({ confidence }: { confidence: string }) {
  const variant =
    confidence === "alta"
      ? "green"
      : confidence === "media"
        ? "yellow"
        : "muted";
  return <Badge variant={variant}>{confidence}</Badge>;
}

function formatArs(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return `$${Math.round(value).toLocaleString("es-AR")}`;
}

function formatInstallmentTerms(total?: number | null, quantity?: number | null) {
  if (!total || !quantity || Number.isNaN(total) || Number.isNaN(quantity)) return "";
  const installmentValue = total / quantity;
  return `${quantity} cuotas: total ${formatArs(total)} (~${formatArs(installmentValue)} c/u)`;
}

function formatSignedPercent(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(1)}%`;
}

function gapClass(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return "text-jd-black/50";
  if (value > 0.1) return "font-semibold text-red-700";
  if (value < -0.1) return "font-semibold text-jd-green";
  return "font-semibold text-jd-black";
}

function safeRatio(value?: number | null, total?: number | null) {
  if (value === null || value === undefined || !total) return null;
  return value / total;
}

async function assertJson<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error?: unknown }).error)
        : `Error ${response.status}`;
    throw new Error(message);
  }
  return payload as T;
}

function getFilename(contentDisposition: string | null) {
  if (!contentDisposition) return null;
  const match = contentDisposition.match(/filename="?([^";]+)"?/i);
  return match?.[1] || null;
}
