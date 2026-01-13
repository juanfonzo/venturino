"use client";

import { useEffect, useState } from "react";
import type { AcaraItem } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { AcaraSeriesChart } from "@/components/AcaraSeriesChart";

interface AcaraItemPreview {
  id: string;
  brand: string | null;
  category: string | null;
  description: string | null;
}

export function AcaraTrendPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AcaraItemPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AcaraItem | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const handle = setTimeout(() => {
      setLoading(true);
      fetch(`/api/acara/items?q=${encodeURIComponent(query)}&pageSize=6`)
        .then((res) => res.json())
        .then((json: { rows: AcaraItemPreview[] }) => {
          if (!cancelled) setResults(json.rows || []);
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    if (!selected?.id || (selected.series && selected.series.length > 0)) return;
    fetch(`/api/acara/item/${selected.id}`)
      .then((res) => res.json())
      .then((json: AcaraItem) => setSelected(json))
      .catch(() => null);
  }, [selected?.id, selected?.series?.length]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Tendencia ACARA</p>
          <h2 className="text-lg font-semibold text-jd-black">Linea de precios por modelo</h2>
        </div>
      </div>
      <div className="panel-body space-y-3">
        <p className="text-sm text-jd-black/70">
          Busca un modelo ACARA para ver la evolucion de precios en el tiempo.
        </p>
        <div className="relative">
          <Input
            placeholder="Ej: A134 Cabinado"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (selected) setSelected(null);
            }}
          />
          {loading ? (
            <div className="absolute right-3 top-2 text-xs text-jd-black/60">Buscando...</div>
          ) : null}
          {results.length > 0 ? (
            <div className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-jd-black/10 bg-white shadow">
              {results.map((item) => (
                <button
                  key={item.id}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-jd-cream/60"
                  onClick={() => {
                    setSelected({
                      id: item.id,
                      brand: item.brand,
                      category: item.category,
                      description: item.description,
                      currency: null,
                      page: null,
                      price_date: null,
                      brand_norm: null,
                      description_norm: null,
                      category_norm: null,
                      series: [],
                    });
                    setResults([]);
                    setQuery(`${item.brand ?? ""} ${item.description ?? ""}`.trim());
                  }}
                >
                  <span>{item.brand ?? "-"} {item.description ?? ""}</span>
                  <span className="text-xs text-jd-black/50">{item.category ?? ""}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {selected ? (
          <div className="rounded-2xl border border-jd-black/10 bg-white/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase text-jd-black/50">Modelo seleccionado</p>
                <p className="text-sm">
                  {selected.brand ?? "-"} {selected.description ?? ""}
                </p>
                <p className="text-xs text-jd-black/60">{selected.category ?? ""}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelected(null);
                  setQuery("");
                }}
              >
                Cambiar modelo
              </Button>
            </div>
            {selected.series && selected.series.length > 0 ? (
              <AcaraSeriesChart series={selected.series} />
            ) : (
              <div className="mt-3 flex items-center gap-2 text-sm text-jd-black/60">
                <Spinner /> Cargando serie...
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-jd-black/60">Selecciona un modelo para ver la linea de precios.</p>
        )}
      </div>
    </section>
  );
}
