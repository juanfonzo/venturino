# Arquitectura

Última revisión: 2026-06-04.

## Resumen

Venturino Radar de Mercado es una app interna Next.js que combina:

- UI operativa con Next.js 16 App Router;
- route handlers como backend HTTP;
- PostgreSQL + Prisma para publicaciones, historial, FX y postventa;
- CSV local para referencias ACARA;
- MongoDB Atlas como fuente de ingesta;
- reportes PDF server-side.

No es una app nueva: respetar la arquitectura y el diseño existentes antes de aplicar defaults del kit.

## Flujo Principal De Datos

```text
MongoDB Atlas
  algorym.venturino
    -> scripts/pipeline-live.js
    -> PostgreSQL: listings, scraping_runs, price_history
    -> Next.js APIs/UI: dashboard, explorador, análisis, reportes

MongoDB Atlas
  algorym.productos
    -> scripts/pipeline-postventa.js
    -> PostgreSQL: postventa_*
    -> lib/postventa/run-analysis.ts
    -> app/api/postventa/analyze

CSV ACARA local
    -> lib/data/loadAcara.ts
    -> app/api/acara/**
    -> UI ACARA / referencias en explorador y dashboard

CSVs legacy MVP
    -> eliminados; no deben consumirse en runtime
```

## Módulos

| Módulo | Responsabilidad | Archivos principales |
|---|---|---|
| Shell y sesión | Layout privado, header, footer, login/logout, proxy de auth | `app/layout.tsx`, `app/(pages)/layout.tsx`, `components/SiteHeader.tsx`, `proxy.ts`, `lib/auth.ts` |
| Publicaciones | Listar, filtrar, paginar y mapear `Listing` a `TractorItem` legado | `app/api/tractors/route.ts`, `lib/data/loadListings.ts`, `lib/types.ts` |
| Estadísticas mercado | KPIs, percentiles, agrupaciones, oportunidades | `lib/stats/**`, `app/api/stats/route.ts` |
| Dashboard/modelos | Evolución por modelo, publicaciones activas, referencia ACARA | `app/(pages)/dashboard/page.tsx`, `components/ModelMarketPanel.tsx`, `app/api/market-evolution/route.ts` |
| Explorador | Filtros, tabla paginada, detalle modal y brecha ACARA | `app/(pages)/explorador/page.tsx` |
| ACARA | Carga CSV, búsqueda, detalle, sugerencias, auto-match y vínculos | `lib/data/loadAcara.ts`, `app/api/acara/**`, `store/useAcaraMappings.ts` |
| Análisis 1 | Venturino vs competencia por marca/modelo/año/horas | `lib/analysis/analisis1.ts`, `app/(pages)/analisis-1/page.tsx` |
| Análisis 2 | Stock y capital de competidores, dedupe de unidades | `lib/analysis/analisis2.ts`, `app/(pages)/analisis-2/page.tsx` |
| Reportes | PDF Venturino vs mercado | `scripts/generateVenturinoReport.js`, `app/api/reports/venturino/route.ts` |
| Ingesta | Normalizar Mongo y persistir en Postgres | `scripts/pipeline-live.js`, `scripts/pipeline-shared.js`, `scripts/pipeline.js` |
| FX | Cotización oficial y recálculo de precios ARS | `lib/fx-rate.ts`, `scripts/syncFxRate.js`, `app/api/sync-fx-rate/route.ts` |
| Postventa | Ingesta productos, matching y análisis persistido | `scripts/pipeline-postventa.js`, `lib/postventa/**`, `app/api/postventa/analyze/route.ts` |

## Rutas/Pantallas

| Ruta | Estado | Descripción |
|---|---|---|
| `/` | implementada | Redirige a `/dashboard`. |
| `/login` | implementada | Login simple con usuario/contraseña. |
| `/dashboard` | implementada | Estado nuevo/usado, tendencia ACARA, panel de modelos y evolución. |
| `/explorador` | implementada | Listado paginado con filtros y detalle modal. |
| `/comparables` | redirección | Redirige a `/explorador`. |
| `/acara` | implementada | Explorador ACARA y vínculos marca/modelo. |
| `/analisis-1` | implementada | Venturino vs competencia. |
| `/analisis-2` | implementada | Stock/capital de competidores. |

## Integraciones

| Integración | Uso | Variables/archivos |
|---|---|---|
| MongoDB Atlas | Fuente de scraping de maquinaria y postventa | `MONGODB_URI` |
| PostgreSQL | Persistencia principal | `DATABASE_URL` |
| DolarAPI | Cotización oficial para ARS -> USD | URL fija en `lib/fx-rate.ts` |
| Docker Hub/VPS | Build/deploy por GitHub Actions | `.github/workflows/pipeline.yml` |
| ACARA CSV | Referencias de precios | `data/acara_precios_maquinaria_agricola_wide.csv` |
| GeoJSON provincias | Mapa/datos geográficos | `data/geo/argentina-provincias.geojson` y archivos raíz |

## Deployment

- Dockerfile multi-stage con Node 20 Alpine.
- GitHub Actions build/push/deploy en push a `main`.
- El workflow ejecuta `npx prisma db push` dentro del contenedor.
- Cron remoto configurado para sync FX diario y backup DB.

## Decisiones Reales A Respetar

- App existente usa Next.js 16.2.7 y requiere Node >= 20.9.0.
- La UI tiene identidad Venturino/John Deere propia.
- `TractorItem` se mantiene como interfaz legado para UI/stats aunque la fuente actual sea Prisma.
- ACARA sigue como CSV local y vínculos principalmente en localStorage; los CSVs legacy del MVP fueron retirados.
- Postventa tiene arquitectura específica en `docs/technical/postventa-ml.md`.

## Riesgos Y Zonas Sensibles

- Ingesta y normalización en scripts JS son fuente de verdad de muchos campos; cambios ahí pueden alterar negocio completo.
- Dedupe afecta KPIs de stock/capital.
- `loadListings` con `dedupeByUnit` trae todos los rows filtrados antes de paginar; puede ser sensible si crece mucho.
- `loadAllListings` carga datasets completos para stats/análisis; revisar performance antes de escalar volumen.
- Auth no tiene roles/tenant; no asumir permisos finos.
- Deploy con `db push` puede ocultar cambios de schema no migrados.
- No hay MCP implementado.

## Faltantes Bloqueantes Para Cambios Grandes

- Confirmar estado objetivo de postventa UI/reporte/MCP.
- Definir si los vínculos ACARA deben migrar de localStorage a DB.
- Crear `.env.example` y política de entornos.
- Definir estrategia de tests.
- Confirmar si la app seguirá siendo single-tenant interna o requerirá roles/permisos.
