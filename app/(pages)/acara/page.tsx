"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import type { AcaraItem, StatsResponse } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { formatNumber } from "@/lib/utils/format";
import { useAcaraMappings } from "@/store/useAcaraMappings";
import { AcaraSeriesChart } from "@/components/AcaraSeriesChart";

interface AcaraItemsResponse {
  rows: Array<{
    id: string;
    brand: string | null;
    category: string | null;
    description: string | null;
    currency: string | null;
    page: string | null;
    price_date: string | null;
    seriesCount: number;
  }>;
  total: number;
  page: number;
  pageSize: number;
}

interface AcaraSuggestion {
  id: string;
  brand: string | null;
  description: string | null;
  category: string | null;
}

export default function AcaraPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<AcaraItemsResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<AcaraItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [comboList, setComboList] = useState<StatsResponse["topModelCombos"]>([]);
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
  const [selectedComboMeta, setSelectedComboMeta] = useState<{ brand: string; model: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<AcaraSuggestion[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [mappedItems, setMappedItems] = useState<Record<string, string>>({});
  const { mappings, setMapping, exportMappings, importMappings, count } = useAcaraMappings();

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((json: StatsResponse) => setComboList(json.topModelCombos || []))
      .catch(() => setComboList([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/acara/items?q=${encodeURIComponent(search)}&page=${page}&pageSize=25`)
      .then((res) => res.json())
      .then((json: AcaraItemsResponse) => {
        if (!cancelled) setItems(json);
      })
      .catch(() => {
        if (!cancelled) setItems(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, page]);

  useEffect(() => {
    if (!selectedItem?.id) return;
    if (selectedItem.series && selectedItem.series.length > 0) return;
    fetch(`/api/acara/item/${selectedItem.id}`)
      .then((res) => res.json())
      .then((json: AcaraItem) => setSelectedItem(json))
      .catch(() => null);
  }, [selectedItem?.id, selectedItem?.series?.length]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!selectedComboMeta) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    setSuggestLoading(true);
    fetch(
      `/api/acara/suggest?brand=${encodeURIComponent(selectedComboMeta.brand)}&model=${encodeURIComponent(
        selectedComboMeta.model,
      )}`,
    )
      .then((res) => res.json())
      .then((json: { rows: AcaraSuggestion[] }) => {
        if (!cancelled) setSuggestions(json.rows || []);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setSuggestLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedComboMeta]);

  useEffect(() => {
    const ids = Object.values(mappings).map((item) => item.acaraItemId);
    if (ids.length === 0) {
      setMappedItems({});
      return;
    }
    let cancelled = false;
    fetch("/api/acara/items-by-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((json: { rows: AcaraSuggestion[] }) => {
        if (cancelled) return;
        const next: Record<string, string> = {};
        json.rows.forEach((row) => {
          next[row.id] = `${row.brand ?? ""} ${row.description ?? ""}`.trim();
        });
        setMappedItems(next);
      })
      .catch(() => {
        if (!cancelled) setMappedItems({});
      });

    return () => {
      cancelled = true;
    };
  }, [mappings]);

  const unmappedCombos = useMemo(() => {
    return comboList.filter((combo) => !mappings[combo.key]);
  }, [comboList, mappings]);

  const comboLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    comboList.forEach((combo) => {
      map.set(combo.key, `${combo.marca} / ${combo.modelo}`.trim());
    });
    return map;
  }, [comboList]);

  const totalPages = items ? Math.max(1, Math.ceil(items.total / items.pageSize)) : 1;

  const handleAssign = () => {
    if (!selectedCombo || !selectedItem) {
      setNotice("Selecciona combo e item antes de vincular.");
      return;
    }
    setMapping(selectedCombo, selectedItem.id);
    setNotice("Vinculo guardado en localStorage.");
  };

  const handleExport = () => {
    const payload = exportMappings();
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mappings.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result as string);
        importMappings(payload);
        setNotice("Vinculos importados.");
      } catch {
        setNotice("No se pudo importar el archivo.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">ACARA</p>
            <h2 className="text-lg font-semibold text-jd-black">Explorador de items</h2>
          </div>
          <div className="text-xs text-jd-black/60">{formatNumber(items?.total ?? 0)} items</div>
        </div>
        <div className="panel-body space-y-3">
          {notice ? <p className="rounded-xl bg-jd-yellow/40 px-3 py-2 text-xs">{notice}</p> : null}
          <p className="text-sm text-jd-black/70">
            Usa ACARA como referencia de precio industrial. Vincula marca/modelo del mercado para comparar contra el valor de
            referencia.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-xs text-jd-black/60">
            <li>Elige un modelo del mercado en el panel de vinculos.</li>
            <li>Busca el item ACARA correcto en esta tabla o usa las sugerencias.</li>
            <li>Guarda el vinculo y queda disponible en Explorador y Comparables.</li>
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Buscar por marca, categoria o descripcion"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
            >
              Limpiar
            </Button>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-jd-black/60">
              <Spinner /> Buscando...
            </div>
          ) : (
            <table className="table-base">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Descripcion</th>
                  <th>Serie</th>
                </tr>
              </thead>
              <tbody>
                {items?.rows.map((item) => (
                  <tr
                    key={item.id}
                    className={`cursor-pointer hover:bg-jd-cream/60 ${
                      selectedItem?.id === item.id ? "bg-jd-cream/60" : ""
                    }`}
                    onClick={() =>
                      setSelectedItem({
                        id: item.id,
                        brand: item.brand,
                        category: item.category,
                        description: item.description,
                        currency: item.currency as any,
                        page: item.page,
                        price_date: item.price_date,
                        brand_norm: null,
                        description_norm: null,
                        category_norm: null,
                        series: [],
                      })
                    }
                  >
                    <td>{item.brand ?? "-"}</td>
                    <td>{item.category ?? "-"}</td>
                    <td>{item.description ?? "-"}</td>
                    <td>{formatNumber(item.seriesCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-3 flex items-center justify-between text-xs text-jd-black/60">
            <span>
              Pagina {items?.page ?? page} de {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel">
          <div className="panel-header">
            <h3 className="text-lg font-semibold text-jd-black">Detalle ACARA</h3>
          </div>
          <div className="panel-body space-y-3 text-sm">
            {selectedItem ? (
              <>
                <div>
                  <p className="text-xs uppercase text-jd-black/50">Item</p>
                  <p>
                    {selectedItem.brand} - {selectedItem.description}
                  </p>
                  <p className="text-jd-black/60">Categoria: {selectedItem.category}</p>
                </div>
                <AcaraSeriesChart series={selectedItem.series} />
              </>
            ) : (
              <p className="text-jd-black/60">Selecciona un item para ver detalle.</p>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Vinculos</p>
              <h3 className="text-lg font-semibold text-jd-black">Vincular ACARA</h3>
            </div>
            <Badge variant="muted">{count} vinculos</Badge>
          </div>
          <div className="panel-body space-y-3 text-sm">
            <div className="rounded-xl bg-jd-cream/70 p-3 text-xs text-jd-black/70">
              <p className="text-xs uppercase text-jd-black/50">Valor del vinculo</p>
              <p>
                Habilita la referencia ACARA en Explorador y Comparables para comparar precios con el valor del sector.
              </p>
            </div>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-jd-black/70">
              <li>Selecciona un modelo del mercado.</li>
              <li>Elige el item ACARA correcto.</li>
              <li>Guarda el vinculo.</li>
            </ol>
            <p className="text-xs text-jd-black/60">
              Al elegir un combo, la busqueda se ajusta automaticamente para facilitar el match.
            </p>
            <div>
              <p className="text-xs uppercase text-jd-black/50">Modelos sin vinculo</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {unmappedCombos.slice(0, 8).map((combo) => (
                  <button
                    key={combo.key}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedCombo === combo.key
                        ? "bg-jd-green text-white"
                        : "bg-jd-cream/70 text-jd-black"
                    }`}
                    onClick={() => {
                      setSelectedCombo(combo.key);
                      setSelectedComboMeta({ brand: combo.marca, model: combo.modelo });
                      setSearch(`${combo.marca} ${combo.modelo}`.trim());
                    }}
                  >
                    {combo.marca} {combo.modelo} ({formatNumber(combo.count)})
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-jd-black/50">Seleccion actual</p>
              <p>
                {selectedCombo
                  ? comboLabelMap.get(selectedCombo) ?? selectedCombo.replace("|", " / ")
                  : "Selecciona un combo"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-jd-black/50">Item ACARA seleccionado</p>
              <p>
                {selectedItem
                  ? `${selectedItem.brand ?? "-"} ${selectedItem.description ?? ""}`.trim()
                  : "Selecciona un item en la tabla"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-jd-black/50">Sugerencias automaticas</p>
              {suggestLoading ? (
                <p className="text-xs text-jd-black/60">Buscando sugerencias...</p>
              ) : suggestions.length ? (
                <div className="mt-2 space-y-2">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      className="flex w-full items-center justify-between rounded-xl border border-jd-black/10 bg-white/80 px-3 py-2 text-left text-xs hover:bg-jd-cream/60"
                      onClick={() =>
                        setSelectedItem({
                          id: item.id,
                          brand: item.brand,
                          description: item.description,
                          category: item.category,
                          currency: null,
                          page: null,
                          price_date: null,
                          brand_norm: null,
                          description_norm: null,
                          category_norm: null,
                          series: [],
                        })
                      }
                    >
                      <span>{item.brand ?? "-"} {item.description ?? ""}</span>
                      <span className="text-jd-black/50">Usar</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-jd-black/60">
                  {selectedComboMeta
                    ? "Sin sugerencias automaticas para este combo."
                    : "Selecciona un combo para ver sugerencias."}
                </p>
              )}
            </div>
            <div>
              <Button variant="secondary" onClick={handleAssign}>
                Vincular item seleccionado
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={handleExport}>
                Exportar vinculos
              </Button>
              <label className="cursor-pointer rounded-full bg-jd-yellow px-4 py-2 text-xs font-semibold">
                Importar vinculos
                <input type="file" className="hidden" onChange={handleImport} />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3 className="text-lg font-semibold text-jd-black">Vinculos guardados</h3>
        </div>
        <div className="panel-body">
          {Object.keys(mappings).length === 0 ? (
            <p className="text-sm text-jd-black/60">Sin vinculos aun.</p>
          ) : (
            <table className="table-base">
              <thead>
                <tr>
                  <th>Combo mercado</th>
                  <th>Referencia ACARA</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(mappings).map(([key, value]) => (
                  <tr key={key}>
                    <td>{comboLabelMap.get(key) ?? key.replace("|", " / ")}</td>
                    <td>{mappedItems[value.acaraItemId] ?? "Referencia pendiente"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
