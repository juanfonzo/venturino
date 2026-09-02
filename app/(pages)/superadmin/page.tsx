import Link from "next/link";
import { AdminProcessLauncher } from "@/components/AdminProcessLauncher";
import { KpiCard } from "@/components/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { AlertTestButton } from "@/components/superadmin/AlertTestButton";
import { requireSuperadminPage } from "@/lib/auth/session";
import { getOperationalAlertStatus } from "@/lib/operational-alerts/notify";
import { getMarketReferenceOverview } from "@/lib/superadmin/market-reference";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function SuperadminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireSuperadminPage();
  const params = await searchParams;
  const days = parseDays(single(params.dias));
  const [overview, alertStatus] = await Promise.all([
    getMarketReferenceOverview(days),
    Promise.resolve(getOperationalAlertStatus()),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Algorym</p>
          <h2 className="text-2xl font-semibold text-jd-black">Administración</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[7, 30, 90].map((value) => (
            <Link
              key={value}
              href={`/superadmin?dias=${value}`}
              className={value === overview.days
                ? "rounded-full bg-jd-green px-3 py-2 text-xs font-semibold text-white"
                : "rounded-full bg-white/70 px-3 py-2 text-xs font-semibold text-jd-black hover:bg-jd-yellow/50"}
            >
              {value} días
            </Link>
          ))}
          <Link
            href="/superadmin/requests"
            className="rounded-full bg-jd-yellow px-4 py-2 text-sm font-semibold text-jd-black hover:bg-jd-yellow/80"
          >
            Ver consultas
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Solicitudes" value={formatNumber(overview.total)} />
        <KpiCard
          label="Tasa de éxito"
          value={formatPercent(overview.successRate)}
          tone="green"
        />
        <KpiCard label="Con error" value={formatNumber(overview.errors)} />
        <KpiCard label="Sin referencias" value={formatNumber(overview.noReferences)} />
        <KpiCard label="Muestra limitada" value={formatNumber(overview.limitedSamples)} tone="yellow" />
        <KpiCard
          label="Pendientes de revisión"
          value={formatNumber(overview.pendingReview)}
          helper={`Promedio: ${formatDuration(overview.averageDurationMs)} · p95: ${formatDuration(overview.p95DurationMs)}`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="panel overflow-hidden">
          <div className="panel-header">
            <h2 className="text-lg font-semibold text-jd-black">Últimos errores</h2>
          </div>
          <div className="overflow-auto">
            {overview.recentErrors.length > 0 ? (
              <table className="table-base min-w-[720px]">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Consulta</th>
                    <th>Error</th>
                    <th>Etapa</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.recentErrors.map((row) => (
                    <tr key={row.id}>
                      <td className="whitespace-nowrap text-xs text-jd-black/60">
                        {formatDate(row.createdAt)}
                      </td>
                      <td>
                        <Link href={`/superadmin/requests/${row.id}`} className="font-semibold hover:text-jd-green">
                          {row.marca || "—"} {row.modelo || ""}
                        </Link>
                        <p className="mt-1 max-w-56 truncate text-xs text-jd-black/50">{row.requestId}</p>
                      </td>
                      <td><Badge variant="red">{row.errorCode || `HTTP ${row.httpStatus || 500}`}</Badge></td>
                      <td className="text-xs text-jd-black/60">{row.failureStage || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-5 py-8 text-sm text-jd-black/50">No hay errores registrados.</p>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2 className="text-lg font-semibold text-jd-black">Alertas</h2>
          </div>
          <div className="panel-body flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-jd-black/70">Email</span>
              <Badge variant={alertStatus.enabled && alertStatus.configured ? "green" : "muted"}>
                {alertStatus.enabled && alertStatus.configured
                  ? "Activo"
                  : alertStatus.configured
                    ? "Configurado"
                    : "Inactivo"}
              </Badge>
            </div>
            <AlertTestButton disabled={!alertStatus.configured} />
          </div>
        </div>
      </section>

      <AdminProcessLauncher />
    </div>
  );
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function parseDays(value: string) {
  const parsed = Number(value);
  return [7, 30, 90].includes(parsed) ? parsed : 30;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("es-AR").format(value);
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "percent", maximumFractionDigits: 1 }).format(value);
}

function formatDuration(value: number) {
  if (value < 1000) return `${value} ms`;
  return `${(value / 1000).toFixed(1)} s`;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}
