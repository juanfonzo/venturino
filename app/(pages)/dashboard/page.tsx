import { getBaseUrl } from "@/lib/utils/baseUrl";
import { formatNumber, formatPercent, formatUsd, formatYear } from "@/lib/utils/format";
import type { StatsResponse } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { AcaraCoveragePanel } from "@/components/AcaraCoveragePanel";

async function fetchStats(): Promise<StatsResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/stats`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("No stats");
  }
  return res.json();
}

export default async function DashboardPage() {
  const stats = await fetchStats();

  return (
    <div className="flex flex-col gap-6">
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
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Marcas</p>
              <h2 className="text-lg font-semibold text-jd-black">Top marcas</h2>
            </div>
          </div>
          <div className="panel-body">
            <div className="flex flex-wrap gap-2">
              {stats.topBrands.map((brand) => (
                <Badge key={brand.marca} variant="muted">
                  {brand.marca} ({formatNumber(brand.count)})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <AcaraCoveragePanel combos={stats.topModelCombos} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Provincias</p>
              <h2 className="text-lg font-semibold text-jd-black">Top provincias</h2>
            </div>
          </div>
          <div className="panel-body">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Provincia</th>
                  <th>Cant.</th>
                  <th>Precio referencia</th>
                </tr>
              </thead>
              <tbody>
                {stats.byProvince.slice(0, 6).map((item) => (
                  <tr key={item.provincia}>
                    <td>{item.provincia}</td>
                    <td>{formatNumber(item.count)}</td>
                    <td>{formatUsd(item.p50)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">Oportunidades</p>
            <h2 className="text-lg font-semibold text-jd-black">Oportunidades destacadas</h2>
          </div>
        </div>
        <div className="panel-body space-y-3">
          <p className="text-sm text-jd-black/70">
            Oportunidades destacadas son publicaciones con precio por debajo del maximo sugerido de compra segun comparables.
            El semaforo indica cuan favorable es el margen frente al objetivo.
          </p>
          <table className="table-base">
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Anio</th>
                <th>Precio</th>
                <th>Compra sugerida</th>
                <th>Semaforo</th>
              </tr>
            </thead>
            <tbody>
              {stats.topOpportunities.map((item) => (
                <tr key={item.id}>
                  <td>{item.marca ?? "-"}</td>
                  <td>{item.modelo ?? "-"}</td>
                  <td>{formatYear(item.anio)}</td>
                  <td>{formatUsd(item.precio_nor)}</td>
                  <td>{formatUsd(item.max_buy)}</td>
                  <td>
                    <Badge
                      variant={
                        item.label === "Verde"
                          ? "green"
                          : item.label === "Amarillo"
                            ? "yellow"
                            : item.label === "Rojo"
                              ? "red"
                              : "muted"
                      }
                    >
                      {item.label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
