import { formatNumber, formatPercent } from "@/lib/utils/format";
import { AcaraTrendPanel } from "@/components/AcaraTrendPanel";
import { AdminProcessLauncher } from "@/components/AdminProcessLauncher";
import { ModelMarketPanel } from "@/components/ModelMarketPanel";
import { DownloadReportButton } from "@/components/DownloadReportButton";
import { buildStats } from "@/lib/stats/buildStats";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, tractorStats] = await Promise.all([buildStats(), buildStats("Tractores")]);

  return (
    <div className="flex flex-col gap-6">
      <DownloadReportButton />
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Estado del mercado</p>
              <h2 className="text-lg font-semibold text-jd-black">Nuevo vs usado</h2>
            </div>
          </div>
          <div className="panel-body">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Cant.</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {stats.byEstado.map((item) => (
                  <tr key={item.estado}>
                    <td>{item.estado}</td>
                    <td>{formatNumber(item.count)}</td>
                    <td>{formatPercent(item.pct, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AcaraTrendPanel />
      </section>

      <ModelMarketPanel combos={tractorStats.topModelCombos} />
      <AdminProcessLauncher />
    </div>
  );
}
