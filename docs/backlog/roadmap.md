# Roadmap

## Hitos

| Hito | Estado | Objetivo de negocio | Criterio de salida |
|---|---|---|---|
| Hito 1 - Fundación | pendiente | Base estable del sistema | Auth/datos/base técnica listos |
| Hito 2 - Postventa Venturino vs MercadoLibre | pendiente | Comparar artículos postventa/accesorios contra ML activo con trazabilidad y reporte | Ingesta Postgres, análisis v0 persistido, UI `/postventa`, PDF y MCP candidato definidos |

Estados: `pendiente`, `en-proceso`, `completado`, `pausado`.

## Orden De Entrega

1. Fundación técnica y datos críticos.
2. Postventa: ingesta Mongo -> Postgres.
3. Postventa: análisis v0 persistido.
4. Postventa: UI operativa y reporte PDF.
5. Automatizaciones, MCP y hardening.
- Calidad de datos limitada en Mongo `productos`: el matching depende de nombre y precio.
- Migraciones Postgres deben coordinarse antes de tocar pipeline productivo.
- Sin revisión manual persistida en v0; si negocio pide overrides, será otro hito.
## Riesgos Globales

- 
