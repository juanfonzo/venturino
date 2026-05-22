# MCP Coverage Map

Estado: vigente

## Regla

Cada feature operativa debe actualizar este mapa. El objetivo es evitar deuda invisible: si una capacidad existe en el producto, debe quedar claro si está expuesta al MCP, si es candidata, si no aplica o si está bloqueada.

Estados validos:

- `implementado`
- `contrato-candidato`
- `no-aplica`
- `bloqueado`

## Mapa

| Módulo | Capacidad | UI/API relacionada | Herramienta MCP | Estado | Permisos | Campos sensibles excluidos | Feature/Origen | Última revisión |
|---|---|---|---|---|---|---|---|---|
| - | - | - | - | pendiente | - | - | - | - |
| Postventa | Resumen de análisis Venturino vs ML | `GET /api/postventa/summary` | `postventa_resumen_analisis` | contrato-candidato | Usuario interno autenticado | credenciales, conexión Mongo, logs técnicos | `postventa-02-matching-persistido` | 2026-05-22 |
| Postventa | Listado paginado de productos analizados | `GET /api/postventa/products` | `postventa_listar_productos` | contrato-candidato | Usuario interno autenticado | credenciales, conexión Mongo, campos técnicos internos | `postventa-03-ui-analisis` | 2026-05-22 |
| Postventa | Detalle de producto y candidatos sugeridos | `GET /api/postventa/products/[id]` | `postventa_detalle_producto` | contrato-candidato | Usuario interno autenticado | credenciales, conexión Mongo, logs técnicos | `postventa-03-ui-analisis` | 2026-05-22 |
| Postventa | Reporte PDF postventa | `GET /api/reports/postventa` | `postventa_generar_reporte` | contrato-candidato | Usuario interno autenticado | credenciales, bytes pesados por defecto | `postventa-04-reporte-pdf` | 2026-05-22 |

## Deuda MCP Activa

| Capacidad | Estado | Motivo | Desbloqueo requerido | Backlog |
|---|---|---|---|---|
| - | - | - | - | - |
| Herramientas MCP postventa | contrato-candidato | El hito inicial prioriza DB, análisis, UI y PDF; las herramientas quedan diseñadas para agentes futuros | Implementar módulo MCP Python/FastAPI conectado a APIs o servicios postventa | `docs/backlog/features/postventa-05-mcp-contratos.md` |
