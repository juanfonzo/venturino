import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  QueryReviewBadge,
  QueryStatusBadge,
} from "@/components/superadmin/QueryBadges";
import { requireSuperadminPage } from "@/lib/auth/session";
import {
  listMarketReferenceQueries,
  parseMarketReferenceListFilters,
} from "@/lib/superadmin/market-reference";

export const dynamic = "force-dynamic";

export default async function SuperadminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireSuperadminPage();
  const rawParams = await searchParams;
  const filters = parseMarketReferenceListFilters(rawParams);
  const result = await listMarketReferenceQueries(filters);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Administración</p>
          <h2 className="text-2xl font-semibold text-jd-black">Consultas de la API</h2>
        </div>
        <Link
          href="/superadmin"
          className="self-start rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-jd-black hover:bg-jd-yellow/50"
        >
          Volver al resumen
        </Link>
      </header>

      <form method="get" className="panel">
        <div className="panel-body grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70 lg:col-span-2">
            Buscar
            <Input name="q" defaultValue={filters.query} placeholder="Request ID, marca o modelo" />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
            Estado
            <Select name="status" defaultValue={filters.status}>
              <option value="">Todos</option>
              <option value="success">Correctas</option>
              <option value="error">Con error</option>
              <option value="processing">Procesando</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
            Tipo
            <Select name="mode" defaultValue={filters.mode}>
              <option value="">Todos</option>
              <option value="direct">Directa</option>
              <option value="expanded">Ampliada</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
            Categoría
            <Select name="categoria" defaultValue={filters.categoria}>
              <option value="">Todas</option>
              <option value="Tractores">Tractores</option>
              <option value="Cosechadoras">Cosechadoras</option>
              <option value="Sembradoras">Sembradoras</option>
              <option value="Pulverizadoras">Pulverizadoras</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
            Revisión
            <Select name="review" defaultValue={filters.reviewStatus}>
              <option value="">Todas</option>
              <option value="unreviewed">Sin revisar</option>
              <option value="correct">Correctas</option>
              <option value="review">Requieren revisión</option>
              <option value="incorrect">Incorrectas</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
            Desde
            <Input name="desde" type="date" defaultValue={filters.dateFrom} />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-jd-black/70">
            Hasta
            <Input name="hasta" type="date" defaultValue={filters.dateTo} />
          </label>
          <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
            <Button type="submit" size="sm">Aplicar filtros</Button>
            <Link
              href="/superadmin/requests"
              className="rounded-full px-3 py-2 text-xs font-semibold text-jd-black/55 hover:bg-jd-black/5"
            >
              Limpiar
            </Link>
          </div>
        </div>
      </form>

      <section className="panel overflow-hidden">
        <div className="panel-header">
          <h2 className="text-lg font-semibold text-jd-black">Resultados</h2>
          <span className="text-xs text-jd-black/50">{formatNumber(result.total)}</span>
        </div>
        <div className="overflow-auto">
          {result.rows.length > 0 ? (
            <table className="table-base min-w-[980px]">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Consulta</th>
                  <th>Tipo</th>
                  <th>Resultados</th>
                  <th>Estado</th>
                  <th>Revisión</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap text-xs text-jd-black/60">{formatDate(row.createdAt)}</td>
                    <td>
                      <Link href={`/superadmin/requests/${row.id}`} className="font-semibold hover:text-jd-green">
                        {row.marca || "—"} {row.modelo || ""}
                      </Link>
                      <p className="mt-1 max-w-64 truncate text-xs text-jd-black/50">
                        {row.categoria || "Sin categoría"} · {row.anio || "Sin año"}
                      </p>
                      <p className="mt-1 max-w-64 truncate font-mono text-[11px] text-jd-black/40">
                        {row.requestId}
                      </p>
                    </td>
                    <td className="text-xs text-jd-black/70">
                      {row.mode === "direct" ? "Directa" : "Ampliada"}
                    </td>
                    <td>{row.resultCount}</td>
                    <td><QueryStatusBadge status={row.status} /></td>
                    <td><QueryReviewBadge status={row.reviewStatus} /></td>
                    <td className="whitespace-nowrap text-xs text-jd-black/60">
                      {row.durationMs === null ? "—" : formatDuration(row.durationMs)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 py-10 text-sm text-jd-black/50">No hay consultas para estos filtros.</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-jd-black/10 px-5 py-4">
          <span className="text-xs text-jd-black/50">
            Página {result.page} de {result.totalPages}
          </span>
          <div className="flex gap-2">
            {result.page > 1 ? (
              <Link className="rounded-full border border-jd-black/15 px-3 py-2 text-xs font-semibold" href={pageHref(rawParams, result.page - 1)}>
                Anterior
              </Link>
            ) : null}
            {result.page < result.totalPages ? (
              <Link className="rounded-full border border-jd-black/15 px-3 py-2 text-xs font-semibold" href={pageHref(rawParams, result.page + 1)}>
                Siguiente
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

function pageHref(
  raw: Record<string, string | string[] | undefined>,
  page: number,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    const item = Array.isArray(value) ? value[0] : value;
    if (item && key !== "page") params.set(key, item);
  }
  params.set("page", String(page));
  return `/superadmin/requests?${params.toString()}`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("es-AR").format(value);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

function formatDuration(value: number) {
  return value < 1000 ? `${value} ms` : `${(value / 1000).toFixed(1)} s`;
}
