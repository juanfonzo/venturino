# 04_APP_ARCHITECTURE_NO_DB.md

## Stack
- Next.js App Router + TypeScript
- Tailwind + shadcn/ui
- Recharts para gráficos
- (Opcional) choropleth por provincia con un GeoJSON local (sin APIs externas)

## Estructura sugerida
- data/
  - tractores_unificados_v3.csv
  - acara_precios_maquinaria_agricola_wide.csv
- lib/
  - data/
    - loadTractors.ts   (leer + normalizar + cache)
    - loadAcara.ts      (leer + transform wide->long + cache)
  - normalize/
    - price.ts          (parseo robusto + precio_nor)
    - location.ts       (provincia/ciudad)
    - flags.ts          (flags de calidad)
    - text.ts           (normalización marca/modelo)
  - stats/
    - percentiles.ts    (p25/p50/p75)
    - aggregations.ts   (por provincia/origen/marca)
- app/
  - api/
    - tractors/route.ts         (listado con filtros/paginación)
    - stats/route.ts            (KPIs + por provincia/origen)
    - comparables/route.ts      (percentiles + oportunidad)
    - acara/items/route.ts      (búsqueda)
    - acara/item/[id]/route.ts  (detalle + serie)
  - (pages)/
    - dashboard/page.tsx
    - explorador/page.tsx
    - comparables/page.tsx
    - acara/page.tsx
    - calidad/page.tsx
    - provincias/page.tsx
- components/
  - FiltersBar.tsx, DataTable.tsx, StatsCards.tsx, DrawerDetails.tsx
  - MappingPanel.tsx, ImportExportJson.tsx
- store/
  - useAcaraMappings.ts (localStorage)

## Types (recomendado)
- TractorRow (raw CSV)
- TractorItem (normalizado):
  - precio_nor: number|null
  - moneda_norm: 'USD'|'ARS'|null
  - estado_norm: 'Nuevo'|'Usado'|null
  - provincia/ciudad
  - flags: string[]
- AcaraItem + series: { yearLabel, valueUsd }

## Persistencia mínima
- localStorage:
  - key: acaraMappingsV1
  - shape: { "<brandNorm>|<modelNorm>": { acaraItemId, createdAt } }
- UI: export/import JSON para compartir mappings (sin DB).
