"use client";

import { useEffect, useMemo, useState } from "react";
import type { AcaraItem, ModelComboStat, StatsResponse, TractorItem } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { formatNumber, formatPercent, formatUsd } from "@/lib/utils/format";
import { normalizeText } from "@/lib/normalize/text";
import { MarketEvolutionChart, type MarketEvolutionPoint } from "@/components/MarketEvolutionChart";
import {
  ListingPriceHistoryChart,
  type ListingPricePoint,
} from "@/components/ListingPriceHistoryChart";
import { useAcaraMappings } from "@/store/useAcaraMappings";
import { pickAcaraReferenceDetail } from "@/lib/utils/acara";

type Categoria = "Tractores" | "Cosechadoras" | "Sembradoras" | "Pulverizadoras";

const CATEGORIES: Categoria[] = ["Tractores", "Cosechadoras", "Sembradoras", "Pulverizadoras"];

export function ModelMarketPanel({ combos }: { combos: ModelComboStat[] }) {
  const [categoria, setCategoria] = useState<Categoria>("Tractores");
  const [comboList, setComboList] = useState<ModelComboStat[]>(combos);
  const [comboSearch, setComboSearch] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedMeta, setSelectedMeta] = useState<{ marca: string; modelo: string } | null>(null);
  const [estado, setEstado] = useState<"" | "Nuevo" | "Usado">("");

  const { mappings, loaded: mappingsLoaded } = useAcaraMappings();
  const [acaraItem, setAcaraItem] = useState<AcaraItem | null>(null);
  const [acaraLoading, setAcaraLoading] = useState(false);

  const [listingsLoading, setListingsLoading] = useState(false);
  const [listings, setListings] = useState<{ rows: TractorItem[]; total: number } | null>(null);

  const [marketLoading, setMarketLoading] = useState(false);
  const [market, setMarket] = useState<MarketEvolutionPoint[] | null>(null);
  const [marketSeries, setMarketSeries] = useState<
    { bucket: string; label: string; points: MarketEvolutionPoint[] }[] | null
  >(null);

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [listingHistoryLoading, setListingHistoryLoading] = useState(false);
  const [listingHistory, setListingHistory] = useState<{
    listing: {
      url: string;
      titulo: string | null;
      origen: string;
      categoria: string;
      marca: string | null;
      modelo: string | null;
    };
    points: ListingPricePoint[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/stats?categoria=${encodeURIComponent(categoria)}`)
      .then((res) => res.json())
      .then((json: StatsResponse) => {
        if (cancelled) return;
        setComboList(json.topModelCombos || []);
        setSelectedKey(null);
        setSelectedMeta(null);
        setSelectedUrl(null);
        setListings(null);
        setMarket(null);
        setMarketSeries(null);
        setListingHistory(null);
      })
      .catch(() => {
        if (!cancelled) setComboList(combos);
      });

    return () => {
      cancelled = true;
    };
  }, [categoria, combos]);

  const comboMatches = useMemo(() => {
    const q = normalizeText(comboSearch);
    if (!q) return comboList;
    return comboList.filter((combo) => {
      const haystack = normalizeText(`${combo.marca ?? ""} ${combo.modelo ?? ""}`);
      return haystack ? haystack.includes(q) : false;
    });
  }, [comboList, comboSearch]);

  const selectedLabel = useMemo(() => {
    if (!selectedMeta) return null;
    return `${selectedMeta.marca} ${selectedMeta.modelo}`.trim();
  }, [selectedMeta]);

  useEffect(() => {
    if (!selectedMeta) return;

    let cancelled = false;
    setListingsLoading(true);
    setMarketLoading(true);
    setListings(null);
    setMarket(null);
    setMarketSeries(null);
    setSelectedUrl(null);
    setListingHistory(null);

    const marketUrl = (() => {
      const base = `/api/market-evolution?categoria=${encodeURIComponent(categoria)}&brand=${encodeURIComponent(
        selectedMeta.marca,
      )}&model=${encodeURIComponent(selectedMeta.modelo)}`;
      const estadoParam = estado ? `&estado=${encodeURIComponent(estado)}` : "";
      const yearPresetParam = estado === "Usado" ? "&yearBucketPreset=used_default" : "";
      return `${base}${estadoParam}${yearPresetParam}`;
    })();

    Promise.all([
      fetch(
        `/api/tractors?categoria=${encodeURIComponent(categoria)}&brand=${encodeURIComponent(
          selectedMeta.marca,
        )}&model=${encodeURIComponent(selectedMeta.modelo)}&page=1&pageSize=25&sortBy=price_nor&sortDir=asc`,
      )
        .then((res) => res.json())
        .then((json) => ({ rows: (json.rows || []) as TractorItem[], total: Number(json.total || 0) }))
        .catch(() => ({ rows: [] as TractorItem[], total: 0 })),
      fetch(marketUrl)
        .then((res) => res.json())
        .then((json) => ({
          points: (json.points || []) as MarketEvolutionPoint[],
          series: (json.series || null) as { bucket: string; label: string; points: MarketEvolutionPoint[] }[] | null,
        }))
        .catch(() => ({
          points: [] as MarketEvolutionPoint[],
          series: null as { bucket: string; label: string; points: MarketEvolutionPoint[] }[] | null,
        })),
    ])
      .then(([listingResult, marketResult]) => {
        if (cancelled) return;
        setListings(listingResult);
        setMarket(marketResult.points);
        setMarketSeries(marketResult.series);
      })
      .finally(() => {
        if (cancelled) return;
        setListingsLoading(false);
        setMarketLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoria, selectedMeta?.marca, selectedMeta?.modelo, estado]);

  useEffect(() => {
    if (!mappingsLoaded) return;
    if (!selectedKey) {
      setAcaraItem(null);
      return;
    }

    const mapped = mappings[selectedKey];
    if (!mapped?.acaraItemId) {
      setAcaraItem(null);
      return;
    }

    let cancelled = false;
    setAcaraLoading(true);
    fetch(`/api/acara/item/${encodeURIComponent(mapped.acaraItemId)}`)
      .then((res) => res.json())
      .then((json: AcaraItem) => {
        if (!cancelled) setAcaraItem(json);
      })
      .catch(() => {
        if (!cancelled) setAcaraItem(null);
      })
      .finally(() => {
        if (!cancelled) setAcaraLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [mappingsLoaded, mappings, selectedKey]);

  useEffect(() => {
    if (!selectedUrl) return;
    let cancelled = false;
    setListingHistoryLoading(true);
    setListingHistory(null);

    fetch(`/api/listings/price-history?url=${encodeURIComponent(selectedUrl)}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        setListingHistory({
          listing: json.listing,
          points: (json.points || []) as ListingPricePoint[],
        });
      })
      .catch(() => {
        if (!cancelled) setListingHistory(null);
      })
      .finally(() => {
        if (!cancelled) setListingHistoryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedUrl]);

  const listingPriceStats = useMemo(() => {
    const rows = listings?.rows ?? [];
    const prices = rows.map((row) => row.precio_nor).filter((v): v is number => v !== null);
    prices.sort((a, b) => a - b);
    const mid = Math.floor(prices.length / 2);
    const median = prices.length
      ? prices.length % 2
        ? prices[mid]
        : (prices[mid - 1] + prices[mid]) / 2
      : null;
    return { count: rows.length, withPrice: prices.length, median };
  }, [listings]);

  const acaraReference = useMemo(() => {
    if (!acaraItem) return null;
    return pickAcaraReferenceDetail(acaraItem, null);
  }, [acaraItem]);

  const acaraGap = useMemo(() => {
    if (!acaraReference?.value || listingPriceStats.median === null) return null;
    const gapAbs = listingPriceStats.median - acaraReference.value;
    const gapPct = acaraReference.value !== 0 ? gapAbs / acaraReference.value : null;
    return { gapAbs, gapPct };
  }, [acaraReference?.value, listingPriceStats.median]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Dashboard</p>
          <h2 className="text-lg font-semibold text-jd-black">Modelos + publicaciones + evolución</h2>
        </div>
      </div>
      <div className="panel-body space-y-4">
        <p className="text-sm text-jd-black/70">
          Selecciona una categoría, elige un modelo (marca + modelo) y revisa publicaciones activas y su
          evolución de precios.
        </p>

        <div className="grid gap-3 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase text-jd-black/50">Categoría</p>
            <Select value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <p className="text-xs uppercase text-jd-black/50">Estado</p>
            <Select value={estado} onChange={(e) => setEstado(e.target.value as "" | "Nuevo" | "Usado")}>
              <option value="">Todos</option>
              <option value="Usado">Usado</option>
              <option value="Nuevo">Nuevo</option>
            </Select>
          </div>
          <div className="lg:col-span-2">
            <p className="text-xs uppercase text-jd-black/50">Buscar modelo de mercado</p>
            <Input
              placeholder="Ej: John Deere 6110"
              value={comboSearch}
              onChange={(e) => setComboSearch(e.target.value)}
            />
            <p className="mt-1 text-xs text-jd-black/60">
              {comboMatches.length
                ? `Mostrando ${formatNumber(Math.min(comboMatches.length, 30))} de ${formatNumber(
                    comboList.length,
                  )} combos.`
                : "Sin coincidencias."}
            </p>
          </div>
        </div>

        <div className="flex max-h-40 flex-wrap gap-2 overflow-auto rounded-2xl border border-jd-black/10 bg-white/70 p-2">
          {comboMatches.slice(0, 30).map((combo) => {
            const isSelected = selectedKey === combo.key;
            return (
              <button
                key={combo.key}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-jd-green text-white"
                    : "bg-jd-cream/70 text-jd-black hover:bg-jd-cream"
                }`}
                onClick={() => {
                  setSelectedKey(combo.key);
                  setSelectedMeta({ marca: combo.marca, modelo: combo.modelo });
                }}
              >
                {combo.marca} {combo.modelo} ({formatNumber(combo.count)})
              </button>
            );
          })}
        </div>

        {selectedLabel ? (
          <div className="rounded-2xl border border-jd-black/10 bg-white/80 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase text-jd-black/50">Modelo seleccionado</p>
                <p className="text-base font-semibold text-jd-black">{selectedLabel}</p>
                <p className="text-xs text-jd-black/60">Categoría: {categoria}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedKey(null);
                  setSelectedMeta(null);
                  setSelectedUrl(null);
                  setListings(null);
                  setMarket(null);
                  setListingHistory(null);
                }}
              >
                Limpiar
              </Button>
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-jd-black">Evolución de mercado (p25/p50/p75)</h3>
                  {marketLoading ? (
                    <span className="flex items-center gap-2 text-xs text-jd-black/60">
                      <Spinner /> Cargando...
                    </span>
                  ) : null}
                </div>
                {estado === "Usado" && marketSeries?.length ? (
                  <p className="mt-1 text-xs text-jd-black/60">
                    Mostrando mediana (p50) segmentada por rangos de años.
                  </p>
                ) : null}
                <div className="mt-2">
                  <MarketEvolutionChart points={market ?? []} series={marketSeries} />
                </div>
                <div className="mt-3 rounded-2xl border border-jd-black/10 bg-white/70 p-3 text-xs text-jd-black/70">
                  <p className="text-xs uppercase text-jd-black/50">Nota</p>
                  <p>
                    La evolución se calcula desde <code>price_history</code>. Si todavía no hay snapshots, ejecuta el
                    pipeline para empezar a capturar la serie.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-jd-black">Publicaciones activas</h3>
                  {listingsLoading ? (
                    <span className="flex items-center gap-2 text-xs text-jd-black/60">
                      <Spinner /> Cargando...
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-jd-black/60">
                  {listings
                    ? `${formatNumber(listingPriceStats.count)} publicaciones (con precio: ${formatNumber(
                        listingPriceStats.withPrice,
                      )}, mediana: ${formatUsd(listingPriceStats.median)})`
                    : "Selecciona un modelo para ver publicaciones."}
                </p>

                <div className="mt-2 overflow-auto rounded-2xl border border-jd-black/10 bg-white/70">
                  <table className="table-base">
                    <thead>
                      <tr>
                        <th>Origen</th>
                        <th>Título</th>
                        <th>USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(listings?.rows ?? []).slice(0, 25).map((row, index) => {
                        const isSelected = selectedUrl === row.url;
                        return (
                          <tr
                            key={row.url ?? `${row.origen ?? "unknown"}-${index}`}
                            className={`cursor-pointer hover:bg-jd-cream/60 ${
                              isSelected ? "bg-jd-cream/60" : ""
                            }`}
                            onClick={() => setSelectedUrl(row.url)}
                          >
                            <td>{row.origen ?? "-"}</td>
                            <td
                              className="max-w-[380px] truncate"
                              title={row.titulo ?? row.url ?? undefined}
                            >
                              {row.titulo ?? row.url ?? "-"}
                            </td>
                            <td>{row.precio_nor !== null ? formatUsd(row.precio_nor) : "Sin dato"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {listings?.total && listings.total > 25 ? (
                  <p className="mt-2 text-xs text-jd-black/60">
                    Mostrando 25 de {formatNumber(listings.total)}. Usa Explorador para ver todas.
                  </p>
                ) : null}

                <div className="mt-4 rounded-2xl border border-jd-black/10 bg-white/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase text-jd-black/50">Referencia ACARA</p>
                      {acaraLoading ? (
                        <p className="mt-1 flex items-center gap-2 text-xs text-jd-black/60">
                          <Spinner /> Cargando...
                        </p>
                      ) : acaraItem ? (
                        <>
                          <p className="text-sm font-semibold text-jd-black">
                            {acaraItem.brand ?? "-"} {acaraItem.description ?? ""}
                          </p>
                          <p className="text-xs text-jd-black/60">{acaraItem.category ?? ""}</p>
                        </>
                      ) : (
                        <p className="mt-1 text-sm text-jd-black/60">
                          Sin vínculo ACARA para este modelo. Vincúlalo en la sección ACARA.
                        </p>
                      )}
                    </div>
                    <a
                      href="/acara"
                      className="rounded-full border border-jd-black/20 px-3 py-1.5 text-xs font-semibold text-jd-black hover:bg-jd-black/5"
                    >
                      Abrir ACARA
                    </a>
                  </div>

                  {acaraReference?.value !== undefined && acaraReference?.value !== null ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl bg-jd-cream/70 p-3">
                        <p className="text-xs uppercase text-jd-black/50">Valor ref. ({acaraReference.yearLabel})</p>
                        <p className="mt-1 text-sm font-semibold text-jd-black">{formatUsd(acaraReference.value)}</p>
                      </div>
                      <div className="rounded-xl bg-jd-cream/70 p-3">
                        <p className="text-xs uppercase text-jd-black/50">Brecha vs mediana mercado</p>
                        <p className="mt-1 text-sm font-semibold text-jd-black">
                          {acaraGap ? formatUsd(acaraGap.gapAbs) : "-"}
                        </p>
                        <p className="text-xs text-jd-black/60">
                          {acaraGap?.gapPct !== null && acaraGap?.gapPct !== undefined
                            ? formatPercent(acaraGap.gapPct, 1)
                            : ""}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-jd-black">Evolución de una publicación</h3>
                {listingHistoryLoading ? (
                  <span className="flex items-center gap-2 text-xs text-jd-black/60">
                    <Spinner /> Cargando...
                  </span>
                ) : null}
              </div>
              {selectedUrl ? (
                <div className="mt-2 rounded-2xl border border-jd-black/10 bg-white/80 p-4">
                  <p className="text-xs uppercase text-jd-black/50">URL</p>
                  <a
                    href={selectedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-jd-green underline"
                  >
                    {selectedUrl}
                  </a>
                  <div className="mt-3">
                    <ListingPriceHistoryChart points={listingHistory?.points ?? []} />
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-jd-black/60">
                  Selecciona una publicación de la tabla para ver su historial.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-jd-black/60">Selecciona un modelo para ver detalle.</p>
        )}
      </div>
    </section>
  );
}
