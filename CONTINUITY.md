# http://CONTINUITY.md

## Goal (incl. success criteria):
- App interna para analisis de mercado de maquinaria agricola y postventa Venturino.
- Datos vigentes de maquinaria desde PostgreSQL/Prisma, alimentados por pipeline MongoDB; ACARA sigue desde CSV local.
- Normalizacion de precio, ubicacion, estado, marca/modelo, flags, dedupe e historial de precios.
- 2026-05-21: relevar el repo actual en profundidad y confeccionar contexto de proyecto para agentes IA.
- 2026-05-22: iniciar analisis postventa Venturino vs ML desde Mongo productos para calibrar matching automatico.

## Constraints/Assumptions:
- FX fallback 1500 ARS/USD; cotizacion vigente puede venir de `FxRate` via DolarAPI.
- condicion es fuente de verdad para estado.
- Sin lat/lon, solo ubicacion texto -> provincia/ciudad.
- PostgreSQL/Prisma es fuente actual de publicaciones, historial, FX y postventa.
- Mapping ACARA dominante en localStorage + export/import JSON; endpoint `data/mappings.json` existe pero no es fuente colaborativa robusta.
- ACARA CSV puede cambiar delimitador (autodetect).
- CSV ACARA real: `data/acara_precios_maquinaria_agricola_wide.csv`; sin fallback en raiz.

## Key decisions:
- Choropleth con GeoJSON local (version simplificada).
- Persistencia opcional de mappings en data/mappings.json via API Node, pero la UI usa principalmente localStorage.
- API server-side para filtros/paginacion/percentiles.
- Precio USD < 1000 tratado como sin dato para filtrar valores erroneos.
- Next.js migrado a 16.2.7; requiere Node >= 20.9.0.
- Diseno UI propio Venturino/John Deere prevalece sobre guia visual base del kit.

## State:
- Done:
  - 2026-06-03 onboarding del repo existente completado proporcionalmente: CodeGraph disponible usado como orientación, lectura directa de rutas, APIs, loaders, Prisma, auth, pipelines, UI y docs previos.
  - 2026-06-03 docs actualizados en UTF-8: PROJECT_CONTEXT, MANIFEST, arquitectura, frontend, backend, base-de-datos, seguridad y mcp-coverage-map.
  - 2026-06-04 Next.js migrado a 16.2.7, `middleware.ts` reemplazado por `proxy.ts`, ESLint configurado para Next 16 y CSVs legacy de MVP retirados.
  - 2026-06-04 reporte PDF corregido: `/api/reports/venturino` usa `scripts/generateVenturinoReport.js` en proceso Node aislado porque React PDF falla dentro del bundle Next 16 con React error #31.
  - 2026-06-04 UX/UI desktop puntos 1-4 corregidos: precios de maquinaria USD < 1000 como sin dato, modales/drawers con semántica dialog, controles nombrados y targets compactos agrandados.
  - PROJECT_CONTEXT.md creado en docs/ai/ con alcance, arquitectura, flujos, APIs, datos, deploy y riesgos actuales.
  - Script analytics postventa creado: scripts/analyzePostventaMatches.js.
  - Reporte de calibracion generado: reports/postventa-match-analysis.md.
  - JSON de apoyo generado: data/postventa_match_analysis.json.
  - Mejora visual del grafico ACARA (grid, gradiente, tooltip, dots) en AcaraSeriesChart.
  - Dashboard sin cobertura ACARA, con mapa de provincias (cantidad, precio referencia y precio alto) y trendline ACARA.
  - Provincias page eliminada y nav ajustado.
  - Explorador modal muestra tractor evaluado + referencia ACARA con anio usado.
  - ACARA: paginacion en lista, buscador con limpiar, UX de vinculos mejorado.
  - Auto-match ACARA por similitud (brand/model) con fallback en Explorador y Comparables.
  - Precio $0 tratado como sin dato en loader.
  - Explorador sin modelo, botones borde, columna Ref. ACARA, sugerencias auto-match.
  - Comparables con autocomplete, ajustes opcionales, explicacion score y Ref. ACARA.
  - Dashboard simplificado y oportunidades explicadas.
  - ACARA UX mejorado; serie ordenada por anio ascendente.
  - Seccion Calidad eliminada.
  - Loader de tractores prioriza CSV en data/ y fallback a root.
  - Auto-match ACARA ignora referencias sin precio; "Sugerido" solo si hay valor.
  - Explorador/Comparables resaltan "Nuevo (anio antiguo)" y filtran estado Nuevo con anio viejo.
  - Parseo de anio usa titulo/descripcion cuando falta el campo.
  - Comparables: buscador de publicaciones solo con precio y rango Nuevo acotado a anios recientes.
  - ACARA: busqueda de combos de mercado y mas opciones via stats (topModelCombos=200).
  - Autocomplete de publicaciones usa searchScope=core para evitar ruido de descripcion.
  - Comparables con guias de uso y microcopy para interpretar resultados.
- Now:
  - Contexto canónico actualizado para futuras tareas del kit. App real: Next.js 16.2.7, PostgreSQL/Prisma, MongoDB pipelines, ACARA CSV activo, auth JWT simple, diseño propio Venturino/John Deere.
  - Analisis postventa ejecutado sobre 127 productos activos Venturino y ML ultima extraccion.
  - Resultado final calibracion: 46 Venturino mas caro, 19 mas barato, 60 sin comparable, 2 baja confianza.
  - Reglas refinadas: tipos especificos, juguetes, ISG, navaja/cuchilla/cuchillo, penalizacion por tipo tecnico incompatible y banda precio +/-40%.
  - Arquitectura postventa documentada en docs/technical/postventa-ml.md.
  - Backlog Hito 02 creado con features postventa 01-05.
  - postventa-01 implementado en codigo: modelos Prisma, pipeline-postventa y script npm manual.
  - postventa-02 implementado en codigo: matching TS v0, runPostventaAnalysis, endpoint local y script npm manual.
- Next:
  - Para cambios grandes futuros: usar los docs técnicos actualizados como punto de partida; no forzar sidebar base del kit.
  - Si el objetivo es eliminar todo CSV runtime, migrar primero ACARA desde `data/acara_precios_maquinaria_agricola_wide.csv` a DB u otra fuente definida.
  - Crear `.env.example`, definir estrategia de tests y decidir MCP base Python/FastAPI si se priorizan capacidades IA-first.
  - Usar docs/ai/PROJECT_CONTEXT.md como punto de partida para nuevos agentes.
  - Validar postventa-01 en produccion: deploy aplica db push; luego correr manualmente pipeline:postventa.
  - Validar postventa-02 en produccion: correr manualmente analysis:postventa-persist tras pipeline:postventa.
  - Ajustes finos de UX (empty/error states, performance).
  - Reglas de outliers y umbral YEAR_CONDITION_CONFLICT.

## Open questions (UNCONFIRMED):
- Si los vínculos ACARA deben seguir en localStorage o migrar a DB.
- Si la app seguirá single-tenant interna o requerirá roles/permisos.
- Cuándo implementar MCP Python/FastAPI real.
- Si ACARA debe migrar a PostgreSQL para eliminar la última dependencia CSV.
- Umbral final de YEAR_CONDITION_CONFLICT.
- Regla de outliers.

## Working set (files/ids/commands):
- docs/ai/PROJECT_CONTEXT.md
- scripts/analyzePostventaMatches.js
- scripts/pipeline-postventa.js
- scripts/run-postventa-analysis.js
- lib/postventa/matching.ts
- lib/postventa/run-analysis.ts
- app/api/postventa/analyze/route.ts
- proxy.ts
- prisma/schema.prisma
- prisma/migrations/20260522190000_add_postventa/migration.sql
- .github/workflows/pipeline.yml
- package.json
- reports/postventa-match-analysis.md
- scripts/generateVenturinoReport.js
- app/api/reports/venturino/route.ts
- data/postventa_match_analysis.json
- docs/technical/postventa-ml.md
- docs/backlog/hitos/hito-02-postventa-ml.md
- docs/backlog/features/postventa-01-ingesta-postgres.md
- docs/backlog/features/postventa-02-matching-persistido.md
- docs/backlog/features/postventa-03-ui-analisis.md
- docs/backlog/features/postventa-04-reporte-pdf.md
- docs/backlog/features/postventa-05-mcp-contratos.md
- components/AcaraSeriesChart.tsx
- app/(pages)/dashboard/page.tsx
- components/ProvinceDistributionPanel.tsx
- components/AcaraTrendPanel.tsx
- components/ChoroplethMap.tsx
- app/(pages)/explorador/page.tsx
- app/(pages)/acara/page.tsx
