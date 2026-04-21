"use client";

import { useState } from "react";

const CATEGORIAS = ["Tractores", "Cosechadoras", "Sembradoras", "Pulverizadoras"] as const;
type Categoria = (typeof CATEGORIAS)[number];

export function DownloadReportButton() {
  const [categoria, setCategoria] = useState<Categoria | "">("");
  const [soloActivos, setSoloActivos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setError(null);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoria) params.set("categoria", categoria);
      if (soloActivos) params.set("solo_activos", "1");
      const url = `/api/reports/venturino${params.toString() ? `?${params.toString()}` : ""}`;

      const res = await fetch(url, { method: "GET" });
      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) msg = data.error;
        } catch {
          /* body no-json */
        }
        throw new Error(msg);
      }

      const blob = await res.blob();
      const filename =
        parseFilename(res.headers.get("Content-Disposition")) ?? "venturino-vs-mercado.pdf";

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Reportes</p>
          <h2 className="text-lg font-semibold text-jd-black">Venturino vs mercado</h2>
        </div>
      </div>
      <div className="panel-body flex flex-col gap-4">
        <p className="text-sm text-jd-black/70">
          Genera un PDF comparando cada unidad del inventario de Venturino con publicaciones
          equivalentes de la competencia. Incluye precio de referencia, nivel de confianza y
          semáforo por unidad.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs uppercase tracking-wide text-jd-black/60">Categoría</span>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria | "")}
              className="min-w-[180px] rounded border border-jd-black/20 bg-white px-3 py-2 text-sm focus:border-jd-green focus:outline-none"
              disabled={loading}
            >
              <option value="">Todas</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={soloActivos}
              onChange={(e) => setSoloActivos(e.target.checked)}
              disabled={loading}
              className="h-4 w-4 accent-jd-green"
            />
            <span>Sólo unidades activas</span>
          </label>

          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="rounded bg-jd-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-jd-green/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generando..." : "Descargar PDF"}
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-700">
            <strong>Error:</strong> {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function parseFilename(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;
  const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  return match?.[1] ?? null;
}
