"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { ComparablesResponse, TractorItem, AcaraItem } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { formatHp, formatNumber, formatPercent, formatUsd, formatYear } from "@/lib/utils/format";
import { normalizeText } from "@/lib/normalize/text";
import { useAcaraMappings } from "@/store/useAcaraMappings";
import { pickAcaraReference } from "@/lib/utils/acara";

function buildQuery(params: Record<string, string>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  return search.toString();
}

export default function ComparablesPage() {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    estado: "",
    province: "",
    yearMin: "",
    hpMin: "",
  });
  const [listingQuery, setListingQuery] = useState("");
  const [listingResults, setListingResults] = useState<TractorItem[]>([]);
  const [listingId, setListingId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<TractorItem | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [costos, setCostos] = useState("");
  const [targetResell, setTargetResell] = useState<"p50" | "p75">("p50");
  const [result, setResult] = useState<ComparablesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acaraItem, setAcaraItem] = useState<AcaraItem | null>(null);
  const [autoMatches, setAutoMatches] = useState<Record<string, { refUsd: number | null; brand: string | null; description: string | null } | null>>({});
  const { mappings } = useAcaraMappings();

  const buildKey = (brand?: string | null, model?: string | null) => {
    const brandNorm = normalizeText(brand ?? null);
    const modelNorm = normalizeText(model ?? null);
    if (!brandNorm || !modelNorm) return null;
    return `${brandNorm}|${modelNorm}`;
  };

  const mappingKey = useMemo(() => {
    const sourceBrand = selectedListing?.marca ?? filters.brand;
    const sourceModel = selectedListing?.modelo ?? filters.model;
    return buildKey(sourceBrand, sourceModel);
  }, [filters.brand, filters.model, selectedListing?.marca, selectedListing?.modelo]);

  const mapping = mappingKey ? mappings[mappingKey] : null;

  useEffect(() => {
    if (selectedListing) {
      setListingResults([]);
      return;
    }
    if (!listingQuery || listingQuery.trim().length < 2) {
      setListingResults([]);
      return;
    }
    let cancelled = false;
    const handle = setTimeout(() => {
      fetch(`/api/tractors?q=${encodeURIComponent(listingQuery)}&pageSize=6`)
        .then((res) => res.json())
        .then((json) => {
          if (!cancelled) setListingResults(json.rows ?? []);
        })
        .catch(() => {
          if (!cancelled) setListingResults([]);
        });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [listingQuery, selectedListing]);

  useEffect(() => {
    if (!mapping?.acaraItemId) {
      setAcaraItem(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/acara/item/${mapping.acaraItemId}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setAcaraItem(json);
      })
      .catch(() => {
        if (!cancelled) setAcaraItem(null);
      });
    return () => {
      cancelled = true;
    };
  }, [mapping?.acaraItemId]);

  useEffect(() => {
    if (!result?.rows?.length) {
      setAutoMatches({});
      return;
    }
    const rowsToMatch = result.rows
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
      .then((json: { rows: Array<{ key: string | null; match: { refUsd: number | null; brand: string | null; description: string | null } | null }> }) => {
        if (cancelled) return;
        const next: Record<string, { refUsd: number | null; brand: string | null; description: string | null } | null> = {};
        (json.rows || []).forEach((entry) => {
          if (entry.key) next[entry.key] = entry.match;
        });
        setAutoMatches(next);
      })
      .catch(() => {
        if (!cancelled) setAutoMatches({});
      });

    return () => {
      cancelled = true;
    };
  }, [result?.rows, mappings]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const query = buildQuery({
      listingId: listingId ?? "",
      brand: filters.brand,
      model: filters.model,
      estado: filters.estado,
      province: filters.province,
      yearMin: filters.yearMin,
      hpMin: filters.hpMin,
      targetResell,
      targetPrice,
      costos,
    });

    try {
      const res = await fetch(`/api/comparables?${query}`);
      if (!res.ok) throw new Error("Error");
      const json = (await res.json()) as ComparablesResponse;
      setResult(json);
    } catch {
      setError("No se pudo calcular comparables.");
    } finally {
    setLoading(false);
  }
  }

  const autoMatchSelected = mappingKey ? autoMatches[mappingKey] : null;

  const gap = useMemo(() => {
    if (!result?.p50) return null;
    const ref = acaraItem
      ? pickAcaraReference(acaraItem, selectedListing?.anio ?? filters.yearMin)
      : autoMatchSelected?.refUsd ?? null;
    if (!ref) return null;
    const gapAbs = ref - result.p50;
    const gapPct = gapAbs / ref;
    return { ref, gapAbs, gapPct };
  }, [acaraItem, result, filters.yearMin, selectedListing?.anio, autoMatchSelected]);

  const actionLabel = useMemo(() => {
    if (!result) return "Completa los filtros para ver la recomendacion.";
    if (result.opportunity.label === "Verde") return "Oportunidad clara: avanzar y negociar.";
    if (result.opportunity.label === "Amarillo") return "Zona neutra: revisar condiciones y comparar.";
    if (result.opportunity.label === "Rojo") return "Por encima del maximo sugerido.";
    return "Sin datos suficientes.";
  }, [result]);

  return (
    <div className="flex flex-col gap-6">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Objetivo</p>
            <h2 className="text-lg font-semibold text-jd-black">Selecciona la publicacion objetivo</h2>
          </div>
        </div>
        <div className="panel-body space-y-3">
          <div className="relative">
            <Input
              placeholder="Busca por titulo, marca o modelo"
              value={listingQuery}
              onChange={(event) => {
                const nextValue = event.target.value;
                setListingQuery(nextValue);
                if (selectedListing) {
                  setSelectedListing(null);
                  setListingId(null);
                }
              }}
            />
            {listingResults.length > 0 ? (
              <div className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-jd-black/10 bg-white shadow">
                {listingResults.map((row) => (
                  <button
                    key={row.id}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-jd-cream/60"
                    onClick={() => {
                      setListingId(row.id);
                      setSelectedListing(row);
                      setListingQuery(row.titulo ?? row.modelo ?? "Publicacion");
                      setListingResults([]);
                      setFilters({
                        brand: row.marca ?? "",
                        model: row.modelo ?? "",
                        estado: row.estado_norm ?? "",
                        province: row.provincia ?? "",
                        yearMin: row.anio ? row.anio.toString() : "",
                        hpMin: row.hp_motor ? row.hp_motor.toString() : "",
                      });
                      setTargetPrice(row.precio_nor ? Math.round(row.precio_nor).toString() : "");
                    }}
                  >
                    <span>
                      {row.titulo ?? row.modelo ?? "Publicacion"} - {row.marca ?? "-"} {row.modelo ?? ""}
                    </span>
                    <span className="text-xs text-jd-black/50">{formatUsd(row.precio_nor)}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          {selectedListing ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-jd-black/10 bg-white/80 px-4 py-3 text-sm">
              <div>
                <p className="text-xs uppercase text-jd-black/50">Seleccion actual</p>
                <p>
                  {selectedListing.titulo ?? selectedListing.modelo ?? "Publicacion"} -{" "}
                  {selectedListing.marca ?? "-"} {selectedListing.modelo ?? ""}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedListing(null);
                  setListingId(null);
                  setListingQuery("");
                  setListingResults([]);
                  setFilters({
                    brand: "",
                    model: "",
                    estado: "",
                    province: "",
                    yearMin: "",
                    hpMin: "",
                  });
                  setTargetPrice("");
                }}
              >
                Cambiar publicacion
              </Button>
            </div>
          ) : (
            <p className="text-sm text-jd-black/60">Escribe al menos 2 letras para ver sugerencias.</p>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Tasador</p>
            <h2 className="text-lg font-semibold text-jd-black">Comparables</h2>
          </div>
        </div>
        <form className="panel-body space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-jd-black/70">
            <p>
              {selectedListing
                ? "Selecciona una publicacion y ajusta solo lo necesario."
                : "Completa filtros manuales si no seleccionas una publicacion."}
            </p>
            {selectedListing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced((prev) => !prev)}
              >
                {showAdvanced ? "Ocultar ajustes" : "Ajustes opcionales"}
              </Button>
            ) : null}
          </div>
          {(showAdvanced || !selectedListing) ? (
            <div className="grid gap-3 md:grid-cols-3">
              <Input
                placeholder="Marca"
                value={filters.brand}
                onChange={(event) => setFilters((prev) => ({ ...prev, brand: event.target.value }))}
              />
              <Input
                placeholder="Modelo"
                value={filters.model}
                onChange={(event) => setFilters((prev) => ({ ...prev, model: event.target.value }))}
              />
              <Select
                value={filters.estado}
                onChange={(event) => setFilters((prev) => ({ ...prev, estado: event.target.value }))}
              >
                <option value="">Estado (todos)</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </Select>
              <Input
                placeholder="Provincia"
                value={filters.province}
                onChange={(event) => setFilters((prev) => ({ ...prev, province: event.target.value }))}
              />
              <Input
                placeholder="Anio"
                type="number"
                value={filters.yearMin}
                onChange={(event) => setFilters((prev) => ({ ...prev, yearMin: event.target.value }))}
              />
              <Input
                placeholder="HP"
                type="number"
                value={filters.hpMin}
                onChange={(event) => setFilters((prev) => ({ ...prev, hpMin: event.target.value }))}
              />
            </div>
          ) : null}
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              placeholder="Precio objetivo (USD)"
              type="number"
              value={targetPrice}
              onChange={(event) => setTargetPrice(event.target.value)}
            />
            <Input
              placeholder="Costos (USD)"
              type="number"
              value={costos}
              onChange={(event) => setCostos(event.target.value)}
            />
            <Select value={targetResell} onChange={(event) => setTargetResell(event.target.value as "p50" | "p75") }>
              <option value="p50">Referencia media</option>
              <option value="p75">Referencia alta</option>
            </Select>
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? "Calculando..." : "Calcular"}
            </Button>
          </div>
        </form>
        <div className="panel-body pt-0 text-xs text-jd-black/60">
          Usa referencia media para una venta conservadora o referencia alta si apuntas a mayor margen. El semaforo compara tu
          precio objetivo con el maximo sugerido de compra.
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="panel">
          <div className="panel-header">
            <h3 className="text-lg font-semibold text-jd-black">Rango de mercado</h3>
          </div>
          <div className="panel-body space-y-2 text-sm">
            {loading ? (
              <Spinner />
            ) : result ? (
              <>
                <p>Casos comparables: {formatNumber(result.n)}</p>
                <p>Precio bajo: {formatUsd(result.p25)}</p>
                <p>Precio de referencia: {formatUsd(result.p50)}</p>
                <p>Precio alto: {formatUsd(result.p75)}</p>
              </>
            ) : (
              <p className="text-jd-black/60">Completa filtros y calcula.</p>
            )}
            {error ? <p className="text-red-600">{error}</p> : null}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="text-lg font-semibold text-jd-black">Oportunidad</h3>
          </div>
          <div className="panel-body space-y-2 text-sm">
            {result ? (
              <>
                <p>Referencia de reventa: {formatUsd(result.opportunity.targetResellValue)}</p>
                <p>Max compra: {formatUsd(result.opportunity.maxBuy)}</p>
                <p>
                  Score:{" "}
                  <Badge
                    variant={
                      result.opportunity.label === "Verde"
                        ? "green"
                        : result.opportunity.label === "Amarillo"
                          ? "yellow"
                          : result.opportunity.label === "Rojo"
                            ? "red"
                            : "muted"
                    }
                  >
                    {result.opportunity.label}
                  </Badge>
                </p>
                <p className="text-xs text-jd-black/60">
                  El score compara el precio objetivo contra el maximo de compra. Positivo es favorable, cerca de cero es neutro,
                  negativo indica sobreprecio.
                </p>
              </>
            ) : (
              <p className="text-jd-black/60">Sin datos aun.</p>
            )}
            <p className="text-xs text-jd-black/60">{actionLabel}</p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="text-lg font-semibold text-jd-black">ACARA en contexto</h3>
          </div>
          <div className="panel-body space-y-2 text-sm">
            {acaraItem ? (
              <>
                <p>{acaraItem.brand} - {acaraItem.description}</p>
                {gap ? (
                  <>
                    <p>Ref ACARA: {formatUsd(gap.ref)}</p>
                    <p>Brecha vs referencia de mercado: {formatUsd(gap.gapAbs)}</p>
                    <p>Gap %: {formatPercent(gap.gapPct, 1)}</p>
                  </>
                ) : (
                  <p className="text-jd-black/60">No hay referencia para el anio o el valor es nulo.</p>
                )}
              </>
            ) : autoMatchSelected ? (
              <>
                <p>
                  {autoMatchSelected.brand ?? ""} {autoMatchSelected.description ?? ""}
                </p>
                {gap ? (
                  <>
                    <p>Ref ACARA sugerida: {formatUsd(gap.ref)}</p>
                    <p>Brecha vs referencia de mercado: {formatUsd(gap.gapAbs)}</p>
                    <p>Gap %: {formatPercent(gap.gapPct, 1)}</p>
                  </>
                ) : (
                  <p className="text-jd-black/60">No hay referencia para el anio o el valor es nulo.</p>
                )}
                <p className="text-xs text-jd-black/60">
                  Match automatico por similitud.{" "}
                  <a className="underline" href="/acara">
                    Vincula este modelo en ACARA.
                  </a>
                </p>
              </>
            ) : (
              <p className="text-jd-black/60">
                Sin vinculo ACARA. Vincula este modelo en la seccion ACARA para ver referencias.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3 className="text-lg font-semibold text-jd-black">Comparables</h3>
        </div>
        <div className="panel-body">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-jd-black/60">
              <Spinner /> Cargando...
            </div>
          ) : result ? (
            <table className="table-base">
              <thead>
                <tr>
                  <th>Publicacion</th>
                  <th>Anio</th>
                  <th>Potencia</th>
                  <th>Ref. ACARA</th>
                  <th>Link</th>
                  <th>Estado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row: TractorItem) => (
                  <tr key={row.id}>
                    <td>{row.titulo ?? "-"}</td>
                    <td>{formatYear(row.anio)}</td>
                    <td>{formatHp(row.hp_motor)}</td>
                    <td>
                      {(() => {
                        const key = buildKey(row.marca, row.modelo);
                        if (!key) return "-";
                        if (mappingKey && key === mappingKey && acaraItem) {
                          const ref = pickAcaraReference(acaraItem, row.anio);
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
          ) : (
            <p className="text-sm text-jd-black/60">Sin resultados todavia.</p>
          )}
        </div>
      </section>
    </div>
  );
}
