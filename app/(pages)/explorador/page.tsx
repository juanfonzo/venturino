"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { TractorItem } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { formatHp, formatNumber, formatPercent, formatUsd, formatYear } from "@/lib/utils/format";
import { useAcaraMappings } from "@/store/useAcaraMappings";
import { normalizeText } from "@/lib/normalize/text";
import { pickAcaraReference } from "@/lib/utils/acara";
import type { AcaraItem } from "@/lib/types";
import { formatFlag } from "@/lib/utils/flags";

interface TractorsResponse {
  rows: TractorItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface AutoMatchEntry {
  key: string | null;
  match: {
    itemId: string;
    brand: string | null;
    description: string | null;
    refUsd: number | null;
    score: number;
  } | null;
}

const PAGE_SIZE = 25;

export default function ExploradorPage() {
  const [query, setQuery] = useState({
    q: "",
    brand: "",
    estado: "",
    province: "",
    hasPrice: false,
    yearMin: "",
    yearMax: "",
    hpMin: "",
    hpMax: "",
  });
  const [page, setPage] = useState(1);
  const [data, setData] = useState<TractorsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TractorItem | null>(null);
  const [acaraItem, setAcaraItem] = useState<AcaraItem | null>(null);
  const [acaraById, setAcaraById] = useState<Record<string, AcaraItem>>({});
  const [autoMatches, setAutoMatches] = useState<Record<string, AutoMatchEntry["match"]>>({});
  const { mappings } = useAcaraMappings();

  const buildKey = (brand?: string | null, model?: string | null) => {
    const brandNorm = normalizeText(brand ?? null);
    const modelNorm = normalizeText(model ?? null);
    if (!brandNorm || !modelNorm) return null;
    return `${brandNorm}|${modelNorm}`;
  };

  const activeFilters = useMemo(() => {
    const labels: string[] = [];
    if (query.q) labels.push(`Busqueda: ${query.q}`);
    if (query.brand) labels.push(`Marca: ${query.brand}`);
    if (query.estado) labels.push(`Estado: ${query.estado}`);
    if (query.province) labels.push(`Provincia: ${query.province}`);
    if (query.yearMin) labels.push(`Anio min: ${query.yearMin}`);
    if (query.yearMax) labels.push(`Anio max: ${query.yearMax}`);
    if (query.hpMin) labels.push(`HP min: ${query.hpMin}`);
    if (query.hpMax) labels.push(`HP max: ${query.hpMax}`);
    if (query.hasPrice) labels.push("Solo con precio");
    return labels;
  }, [query]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (query.q) params.set("q", query.q);
    if (query.brand) params.set("brand", query.brand);
    if (query.estado) params.set("estado", query.estado);
    if (query.province) params.set("province", query.province);
    if (query.hasPrice) params.set("hasPrice", "true");
    if (query.yearMin) params.set("yearMin", query.yearMin);
    if (query.yearMax) params.set("yearMax", query.yearMax);
    if (query.hpMin) params.set("hpMin", query.hpMin);
    if (query.hpMax) params.set("hpMax", query.hpMax);
    params.set("page", page.toString());
    params.set("pageSize", PAGE_SIZE.toString());
    params.set("sortBy", "price_nor");
    params.set("sortDir", "asc");
    return params.toString();
  }, [query, page]);

  const mappingKey = useMemo(() => {
    if (!selected?.marca || !selected?.modelo) return null;
    const brandNorm = normalizeText(selected.marca);
    const modelNorm = normalizeText(selected.modelo);
    if (!brandNorm || !modelNorm) return null;
    return `${brandNorm}|${modelNorm}`;
  }, [selected?.marca, selected?.modelo]);

  useEffect(() => {
    if (!mappingKey) {
      setAcaraItem(null);
      return;
    }
    const mapping = mappings[mappingKey];
    if (!mapping?.acaraItemId) {
      setAcaraItem(null);
      return;
    }
    const cached = acaraById[mapping.acaraItemId];
    if (cached) {
      setAcaraItem(cached);
      return;
    }
    let cancelled = false;
    fetch(`/api/acara/item/${mapping.acaraItemId}`)
      .then((res) => res.json())
      .then((json: AcaraItem) => {
        if (!cancelled) setAcaraItem(json);
      })
      .catch(() => {
        if (!cancelled) setAcaraItem(null);
      });
    return () => {
      cancelled = true;
    };
  }, [mappingKey, mappings, acaraById]);

  useEffect(() => {
    if (!data?.rows?.length) {
      setAcaraById({});
      return;
    }
    const ids = new Set<string>();
    data.rows.forEach((row) => {
      if (!row.marca || !row.modelo) return;
      const brandNorm = normalizeText(row.marca);
      const modelNorm = normalizeText(row.modelo);
      if (!brandNorm || !modelNorm) return;
      const key = `${brandNorm}|${modelNorm}`;
      const mapping = mappings[key];
      if (mapping?.acaraItemId) ids.add(mapping.acaraItemId);
    });
    if (ids.size === 0) {
      setAcaraById({});
      return;
    }
    let cancelled = false;
    fetch("/api/acara/items-by-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(ids) }),
    })
      .then((res) => res.json())
      .then((json: { rows: AcaraItem[] }) => {
        if (cancelled) return;
        const next: Record<string, AcaraItem> = {};
        (json.rows || []).forEach((row) => {
          next[row.id] = row;
        });
        setAcaraById(next);
      })
      .catch(() => {
        if (!cancelled) setAcaraById({});
      });
    return () => {
      cancelled = true;
    };
  }, [data?.rows, mappings]);

  useEffect(() => {
    if (!data?.rows?.length) {
      setAutoMatches({});
      return;
    }
    const rowsToMatch = data.rows
      .map((row) => {
        const key = buildKey(row.marca, row.modelo);
        if (!key || mappings[key]) return null;
        return {
          key,
          brand: row.marca,
          model: row.modelo,
          year: row.anio ?? null,
        };
      })
      .filter(
        (row): row is { key: string; brand: string | null; model: string | null; year: number | null } =>
          Boolean(row),
      );

    if (!rowsToMatch.length) {
      setAutoMatches({});
      return;
    }

    let cancelled = false;
    fetch("/api/acara/auto-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows: rowsToMatch }),
    })
      .then((res) => res.json())
      .then((json: { rows: AutoMatchEntry[] }) => {
        if (cancelled) return;
        const next: Record<string, AutoMatchEntry["match"]> = {};
        (json.rows || []).forEach((entry) => {
          if (entry.key) {
            next[entry.key] = entry.match;
          }
        });
        setAutoMatches(next);
      })
      .catch(() => {
        if (!cancelled) setAutoMatches({});
      });

    return () => {
      cancelled = true;
    };
  }, [data?.rows, mappings]);

  const selectedKey = useMemo(() => buildKey(selected?.marca ?? null, selected?.modelo ?? null), [
    selected?.marca,
    selected?.modelo,
  ]);

  const autoMatchSelected = selectedKey ? autoMatches[selectedKey] : null;

  const acaraReference = useMemo(() => {
    if (!selected) return null;
    const mappedRef = pickAcaraReference(acaraItem, selected.anio);
    if (mappedRef) return mappedRef;
    return autoMatchSelected?.refUsd ?? null;
  }, [acaraItem, autoMatchSelected?.refUsd, selected]);

  const gapInfo = useMemo(() => {
    if (!selected?.precio_nor || !acaraReference) return null;
    const gapAbs = selected.precio_nor - acaraReference;
    const gapPct = gapAbs / acaraReference;
    return { gapAbs, gapPct };
  }, [selected?.precio_nor, acaraReference]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/tractors?${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
      })
      .catch(() => {
        if (cancelled) return;
        setError("No se pudo cargar el explorador.");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 1;

  return (
    <div className="flex flex-col gap-6">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Filtros</p>
            <h2 className="text-lg font-semibold text-jd-black">Explorador de publicaciones</h2>
          </div>
        </div>
        <div className="panel-body space-y-4">
          <p className="text-sm text-jd-black/70">
            Filtra por marca, estado y ubicacion para encontrar comparables reales. Cada fila abre el detalle.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPage(1);
                setQuery((prev) => ({ ...prev, estado: "Nuevo" }));
              }}
            >
              Solo nuevos
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPage(1);
                setQuery((prev) => ({ ...prev, estado: "Usado" }));
              }}
            >
              Solo usados
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPage(1);
                setQuery((prev) => ({ ...prev, hasPrice: true }));
              }}
            >
              Solo con precio
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              placeholder="Buscar titulo o marca"
              value={query.q}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, q: event.target.value }));
              }}
            />
            <Input
              placeholder="Marca"
              value={query.brand}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, brand: event.target.value }));
              }}
            />
            <Select
              value={query.estado}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, estado: event.target.value }));
              }}
            >
              <option value="">Estado (todos)</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </Select>
            <Input
              placeholder="Provincia"
              value={query.province}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, province: event.target.value }));
              }}
            />
            <Input
              placeholder="Anio min"
              type="number"
              value={query.yearMin}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, yearMin: event.target.value }));
              }}
            />
            <Input
              placeholder="Anio max"
              type="number"
              value={query.yearMax}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, yearMax: event.target.value }));
              }}
            />
            <Input
              placeholder="HP min"
              type="number"
              value={query.hpMin}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, hpMin: event.target.value }));
              }}
            />
            <Input
              placeholder="HP max"
              type="number"
              value={query.hpMax}
              onChange={(event) => {
                setPage(1);
                setQuery((prev) => ({ ...prev, hpMax: event.target.value }));
              }}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={query.hasPrice}
                onChange={(event) => {
                  setPage(1);
                  setQuery((prev) => ({ ...prev, hasPrice: event.target.checked }));
                }}
              />
              Solo con precio
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery({
                    q: "",
                    brand: "",
                    estado: "",
                    province: "",
                    hasPrice: false,
                    yearMin: "",
                    yearMax: "",
                    hpMin: "",
                    hpMax: "",
                  });
                  setPage(1);
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Resultados</p>
            <h2 className="text-lg font-semibold text-jd-black">Publicaciones</h2>
          </div>
          <div className="text-xs text-jd-black/60">
            {data ? `${formatNumber(data.total)} resultados` : "..."}
          </div>
        </div>
        <div className="panel-body">
          {activeFilters.length > 0 ? (
            <p className="mb-3 text-xs text-jd-black/60">
              Filtros activos: {activeFilters.join(" | ")}
            </p>
          ) : (
            <p className="mb-3 text-xs text-jd-black/50">Sin filtros activos.</p>
          )}
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-jd-black/60">
              <Spinner /> Cargando publicaciones...
            </div>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : data && data.rows.length === 0 ? (
            <p className="text-sm text-jd-black/60">No hay resultados con estos filtros.</p>
          ) : (
            <table className="table-base">
              <thead>
                <tr>
                  <th>Publicacion</th>
                  <th>Marca</th>
                  <th>Anio</th>
                  <th>Potencia</th>
                  <th>Ref. ACARA</th>
                  <th>Link</th>
                  <th>Estado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {data?.rows.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer hover:bg-jd-cream/60"
                    onClick={() => setSelected(row)}
                  >
                    <td>{row.titulo ?? "-"}</td>
                    <td>{row.marca ?? "-"}</td>
                    <td>{formatYear(row.anio)}</td>
                    <td>{formatHp(row.hp_motor)}</td>
                    <td>
                      {(() => {
                        if (!row.marca || !row.modelo) return "-";
                        const key = buildKey(row.marca, row.modelo);
                        if (!key) return "-";
                        const mapping = mappings[key];
                        if (mapping?.acaraItemId) {
                          const item = acaraById[mapping.acaraItemId];
                          if (!item) return "Cargando...";
                          const ref = pickAcaraReference(item, row.anio);
                          return ref ? formatUsd(ref) : "Sin dato";
                        }
                        const autoMatch = autoMatches[key];
                        if (autoMatch) {
                          return (
                            <span className="inline-flex items-center gap-2">
                              {autoMatch.refUsd ? formatUsd(autoMatch.refUsd) : "Sin dato"}
                              <span className="text-xs text-jd-black/50">Sugerido</span>
                            </span>
                          );
                        }
                        return "Sin vinculo";
                      })()}
                    </td>
                    <td>
                      {row.url ? (
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-jd-green underline"
                        >
                          Link
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{row.estado_norm ?? "-"}</td>
                    <td>{formatUsd(row.precio_nor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          Anterior
        </Button>
        <span className="text-xs text-jd-black/60">
          Pagina {page} de {totalPages}
        </span>
        <Button
          variant="ghost"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        >
          Siguiente
        </Button>
      </section>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4">
          <div className="panel max-h-[80vh] w-full max-w-2xl overflow-auto">
            <div className="panel-header">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Detalle</p>
                <h3 className="text-lg font-semibold text-jd-black">{selected.titulo}</h3>
              </div>
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Cerrar
              </Button>
            </div>
            <div className="panel-body space-y-4 text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase text-jd-black/50">Marca / Modelo</p>
                  <p>
                    {selected.marca ?? "-"} / {selected.modelo ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-jd-black/50">Precio</p>
                  <p>{formatUsd(selected.precio_nor)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-jd-black/50">Ubicacion</p>
                  <p>{selected.ubicacion ?? "-"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-jd-black/50">Link</p>
                  {selected.url ? (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-jd-green underline"
                    >
                      Abrir publicacion
                    </a>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
              <div className="panel bg-white/70">
                <div className="panel-body space-y-2 text-sm">
                  <p className="text-xs uppercase text-jd-black/50">Referencia ACARA</p>
                  {acaraReference ? (
                    <>
                      <p>
                        {autoMatchSelected && !acaraItem
                          ? "Referencia sugerida: "
                          : "Precio de referencia: "}
                        {formatUsd(acaraReference)}
                      </p>
                      {gapInfo ? (
                        <p>
                          Brecha vs referencia: {formatUsd(gapInfo.gapAbs)} (
                          {formatPercent(gapInfo.gapPct, 1)})
                        </p>
                      ) : (
                        <p className="text-jd-black/60">Sin precio en la publicacion para comparar.</p>
                      )}
                      {autoMatchSelected && !acaraItem ? (
                        <p className="text-xs text-jd-black/60">
                          Match automatico por similitud de modelo.{" "}
                          <Link className="underline" href="/acara">
                            Vincula este modelo en ACARA.
                          </Link>
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <p className="text-jd-black/60">
                      Sin referencia ACARA vinculada.{" "}
                      <Link className="underline" href="/acara">
                        Vincula este modelo en ACARA.
                      </Link>
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase text-jd-black/50">Alertas de datos</p>
                <p className="text-xs text-jd-black/60">
                  Alertas indican datos faltantes o conflictos que afectan comparables.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selected.flags.length ? (
                    selected.flags.map((flag) => (
                      <Badge key={flag} variant="muted">
                        {formatFlag(flag)}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="green">OK</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
