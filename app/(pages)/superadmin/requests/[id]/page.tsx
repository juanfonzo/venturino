import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import {
  QueryReviewBadge,
  QueryStatusBadge,
} from "@/components/superadmin/QueryBadges";
import { ReviewForm } from "@/components/superadmin/ReviewForm";
import { requireSuperadminPage } from "@/lib/auth/session";
import { getMarketReferenceQueryById } from "@/lib/superadmin/market-reference";
import {
  REVIEW_REASON_LABELS,
  type ReviewReason,
} from "@/lib/superadmin/review";

export const dynamic = "force-dynamic";

interface ReferenceSnapshot {
  id?: string;
  source?: string;
  title?: string | null;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  price?: { amount?: number; currency?: string };
  seller?: string | null;
  province?: string | null;
  city?: string | null;
  url?: string;
  coincidencia?: { titulo?: string; detalle?: string };
}

export default async function SuperadminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSuperadminPage();
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const query = await getMarketReferenceQueryById(id);
  if (!query) notFound();

  const summary = asRecord(query.resultSummary);
  const statistics = asRecord(summary.statistics);
  const criterion = asRecord(summary.criterion);
  const sampleStrength = asRecord(summary.sampleStrength);
  const references = Array.isArray(summary.responseSnapshot)
    ? summary.responseSnapshot.filter(isRecord) as ReferenceSnapshot[]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Consulta #{query.id}</p>
          <h2 className="text-2xl font-semibold text-jd-black">
            {query.marca || "Sin marca"} {query.modelo || ""}
          </h2>
          <p className="mt-1 font-mono text-xs text-jd-black/45">{query.requestId}</p>
        </div>
        <Link
          href="/superadmin/requests"
          className="self-start rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-jd-black hover:bg-jd-yellow/50"
        >
          Volver a consultas
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryItem label="Estado"><QueryStatusBadge status={query.status} /></SummaryItem>
        <SummaryItem label="Revisión"><QueryReviewBadge status={query.reviewStatus} /></SummaryItem>
        <SummaryItem label="Resultados" value={String(query.resultCount)} />
        <SummaryItem label="Duración" value={query.durationMs === null ? "—" : formatDuration(query.durationMs)} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel">
          <div className="panel-header"><h3 className="font-semibold text-jd-black">Consulta</h3></div>
          <div className="panel-body grid gap-4 sm:grid-cols-2">
            <DataItem label="Fecha" value={formatDate(query.createdAt)} />
            <DataItem label="Tipo" value={query.mode === "direct" ? "Directa" : "Ampliada"} />
            <DataItem label="Categoría" value={query.categoria || "—"} />
            <DataItem label="Año" value={query.anio ? String(query.anio) : "—"} />
            <DataItem label="Marca original" value={query.marca || "—"} />
            <DataItem label="Marca normalizada" value={query.marcaNorm || "—"} />
            <DataItem label="Modelo original" value={query.modelo || "—"} />
            <DataItem label="Modelo normalizado" value={query.modeloNorm || "—"} />
            <DataItem label="Versión" value={query.algorithmVersion} />
            <DataItem label="HTTP" value={query.httpStatus ? String(query.httpStatus) : "—"} />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header"><h3 className="font-semibold text-jd-black">Resultado</h3></div>
          <div className="panel-body grid gap-4 sm:grid-cols-2">
            <DataItem label="Criterio" value={stringValue(criterion.titulo) || query.criterionCode || "—"} />
            <DataItem label="Solidez" value={stringValue(sampleStrength.titulo) || query.sampleStrengthCode || "—"} />
            <DataItem label="Mínimo" value={formatUsd(numberValue(statistics.min))} />
            <DataItem label="P25" value={formatUsd(numberValue(statistics.p25))} />
            <DataItem label="Mediana" value={formatUsd(numberValue(statistics.median))} />
            <DataItem label="P75" value={formatUsd(numberValue(statistics.p75))} />
            <DataItem label="Máximo" value={formatUsd(numberValue(statistics.max))} />
            <DataItem label="Muestra" value={String(numberValue(statistics.sampleSize) ?? query.resultCount)} />
            {query.errorCode ? <DataItem label="Error" value={query.errorCode} /> : null}
            {query.failureStage ? <DataItem label="Etapa" value={query.failureStage} /> : null}
          </div>
        </div>
      </section>

      <section className="panel overflow-hidden">
        <div className="panel-header">
          <h3 className="font-semibold text-jd-black">Referencias devueltas</h3>
          <Badge variant="muted">{references.length}</Badge>
        </div>
        <div className="overflow-auto">
          {references.length > 0 ? (
            <table className="table-base min-w-[900px]">
              <thead>
                <tr>
                  <th>Publicación</th>
                  <th>Año</th>
                  <th>Precio</th>
                  <th>Vendedor</th>
                  <th>Coincidencia</th>
                </tr>
              </thead>
              <tbody>
                {references.map((reference, index) => {
                  const externalUrl = safeExternalUrl(reference.url);
                  return (
                  <tr key={reference.id || `${reference.url}-${index}`}>
                    <td>
                      {externalUrl ? (
                        <a
                          href={externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold hover:text-jd-green"
                        >
                          {reference.title || `${reference.brand || ""} ${reference.model || ""}`.trim() || "Ver publicación"}
                        </a>
                      ) : (
                        reference.title || "—"
                      )}
                      <p className="mt-1 text-xs text-jd-black/50">{reference.source || "—"}</p>
                    </td>
                    <td>{reference.year || "—"}</td>
                    <td>{formatUsd(reference.price?.amount ?? null)}</td>
                    <td>
                      {reference.seller || "—"}
                      <p className="mt-1 text-xs text-jd-black/50">
                        {[reference.city, reference.province].filter(Boolean).join(", ") || "—"}
                      </p>
                    </td>
                    <td className="max-w-72 text-xs text-jd-black/65">
                      <span className="font-semibold text-jd-black">{reference.coincidencia?.titulo || "—"}</span>
                      {reference.coincidencia?.detalle ? <p className="mt-1">{reference.coincidencia.detalle}</p> : null}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="px-5 py-8 text-sm text-jd-black/50">No se devolvieron referencias.</p>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="panel">
          <div className="panel-header"><h3 className="font-semibold text-jd-black">Input registrado</h3></div>
          <div className="panel-body">
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-jd-black/[0.04] p-4 text-xs text-jd-black/70">
              {formatJson(query.requestPayload)}
            </pre>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="font-semibold text-jd-black">Revisión interna</h3>
              {query.reviewReason ? (
                <p className="mt-1 text-xs text-jd-black/50">
                  {REVIEW_REASON_LABELS[query.reviewReason as ReviewReason] || query.reviewReason}
                  {query.reviewedBy ? ` · ${query.reviewedBy}` : ""}
                </p>
              ) : null}
            </div>
          </div>
          <div className="panel-body">
            <ReviewForm
              queryId={query.id}
              initialStatus={query.reviewStatus}
              initialReason={query.reviewReason}
              initialNotes={query.reviewNotes}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="panel">
      <div className="panel-body">
        <p className="text-xs uppercase tracking-[0.16em] text-jd-black/50">{label}</p>
        <div className="mt-3 text-lg font-semibold text-jd-black">{children || value}</div>
      </div>
    </div>
  );
}

function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-jd-black/45">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-jd-black">{value}</p>
    </div>
  );
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : null;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function safeExternalUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function formatJson(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(value);
}

function formatDuration(value: number) {
  return value < 1000 ? `${value} ms` : `${(value / 1000).toFixed(2)} s`;
}

function formatUsd(value: number | null) {
  return value === null
    ? "—"
    : new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
}
