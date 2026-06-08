# Backend

Última revisión: 2026-06-04.

## Stack Real

- Backend principal: route handlers de Next.js 16 en `app/api/**`.
- Servicios/lógica: módulos TypeScript en `lib/**`.
- Persistencia: Prisma Client sobre PostgreSQL.
- Scripts operativos: Node.js en `scripts/**`.
- No se detectaron server actions.

## Endpoints Principales

| Ruta | Método | Responsabilidad | Fuente |
|---|---|---|---|
| `/api/auth/login` | POST | Validar credenciales y emitir cookie JWT | `lib/auth.ts` |
| `/api/auth/logout` | POST | Borrar cookie de sesión | `COOKIE_NAME` |
| `/api/tractors` | GET | Listar publicaciones con filtros, sort y paginación | `loadListings` |
| `/api/stats` | GET | KPIs y agregados de mercado | `buildStats` |
| `/api/model-combos` | GET | Buscar combos marca/modelo | `topModelCombos` |
| `/api/market-evolution` | GET | Evolución p25/p50/p75 por modelo según fecha de extracción; soporta buckets de año sólo si se piden explícitamente | Prisma `priceHistory` |
| `/api/listings/price-history` | GET | Historial de precio por URL | Prisma |
| `/api/acara/items` | GET | Buscar y paginar ítems ACARA | CSV ACARA |
| `/api/acara/item/[id]` | GET | Detalle de ítem ACARA | CSV ACARA |
| `/api/acara/items-by-ids` | POST | Resolver referencias ACARA por ids | CSV ACARA |
| `/api/acara/suggest` | GET | Sugerir ítems ACARA por marca/modelo | CSV ACARA |
| `/api/acara/auto-match` | POST | Match automático de filas contra ACARA | CSV ACARA |
| `/api/acara/gaps` | POST | Brechas ACARA para mappings recibidos | CSV ACARA + listings |
| `/api/mappings` | GET/POST | Leer/escribir `data/mappings.json` | FS local |
| `/api/analisis-1` | GET | Venturino vs competencia | `computeAnalisis1` |
| `/api/analisis-2` | GET | Stock/capital por competidor | `computeAnalisis2` |
| `/api/analisis-2/items` | GET | Detalle de publicaciones por empresa | `listAnalisis2Items` |
| `/api/reports/venturino` | GET | Descargar PDF Venturino vs mercado | `scripts/generateVenturinoReport.js` vía proceso Node aislado |
| `/api/sync-fx-rate` | GET/POST | Leer/sincronizar FX y recalcular ARS | `lib/fx-rate.ts` |
| `/api/postventa/analyze` | POST | Ejecutar análisis postventa persistido desde host local | `runPostventaAnalysis` |
| `/api/geo/provincias` | GET | Devolver GeoJSON local | FS local |

## Servicios Internos

| Servicio | Responsabilidad |
|---|---|
| `lib/data/loadListings.ts` | Mapea `Listing` Prisma a `TractorItem`, filtra, ordena, pagina y deduplica. |
| `lib/data/loadAcara.ts` | Lee CSV ACARA, transforma wide a series y cachea 5 minutos. |
| `lib/stats/**` | Percentiles, agregados, oportunidades, top marcas/modelos. |
| `lib/analysis/analisis1.ts` | Matching Venturino/competencia por modelo, año, horas y fuzzy. |
| `lib/analysis/analisis2.ts` | Stock por competidor, dedupe, capital, provincias y detalle. |
| `lib/postventa/matching.ts` | Scoring semántico/precio de productos postventa. |
| `lib/postventa/run-analysis.ts` | Persiste corridas, resultados y candidatos postventa. |
| `lib/fx-rate.ts` | DolarAPI, `FxRate`, recálculo masivo de listings ARS. |
| `app/api/reports/venturino/route.ts` | Endpoint de descarga PDF; ejecuta el generador Node para evitar incompatibilidades de React PDF dentro del bundle de Next 16. |

## Scripts Operativos

| Script npm | Archivo | Uso |
|---|---|---|
| `pipeline:live` | `scripts/pipeline-live.js` | Ingesta Mongo `algorym.venturino` a PostgreSQL. |
| `pipeline:postventa` | `scripts/pipeline-postventa.js` | Ingesta Mongo `algorym.productos` a tablas `postventa_*` y luego ejecuta análisis persistido directo. |
| `analysis:postventa-persist` | `scripts/run-postventa-analysis.js` | Ejecutar matching postventa persistido directo, sin depender de HTTP local. |
| `fx:sync` | `scripts/syncFxRate.js` | Sincronizar dólar oficial y recalcular precios. |
| `report:venturino` | `scripts/generateVenturinoReport.js` | Generar PDF local. |

## Reportes PDF

- El reporte Venturino vs mercado se genera con `scripts/generateVenturinoReport.js`.
- `/api/reports/venturino` ejecuta ese script en un proceso Node temporal, lee el PDF desde `os.tmpdir()` y lo devuelve como `application/pdf`.
- No importar `@react-pdf/renderer` en route handlers de Next 16 para este flujo: el renderer falla dentro del bundle de Next con errores React #31 al recibir elementos del runtime de App Router.

## Contratos De Listado

### `/api/tractors`

- Paginación: `page`, `pageSize`; máximo 100.
- Filtros: `categoria`, `q`, `origin`, `brand`, `model`, `estado`, `province`, `yearMin`, `yearMax`, `hpMin`, `hpMax`, `hasPrice`.
- Sort: `price_nor`, `year`, `hp`; fallback por `id`.
- Fuente: PostgreSQL.
- Regla de precio: para maquinaria, `precioUsd < 1000`, cero, negativo o no finito se expone como `precio_nor: null`; `hasPrice=true` exige `precioUsd >= 1000`.
- Observación: con dedupe activo carga todos los rows filtrados antes de paginar.

### `/api/acara/items`

- Paginación: `page`, `pageSize`; máximo 100.
- Búsqueda: substring simple en marca/categoría/descripción sobre CSV cargado en memoria.
- Fuente: CSV local cacheado.

### `/api/analisis-2/items`

- Límite: default 200 desde endpoint, máximo 1000 en service.
- Filtra por empresa y trae todas las categorías para breakdown.

## Validaciones Y Errores

- Endpoints devuelven JSON con `error` en fallos principales.
- Validación de parámetros es manual por endpoint.
- No hay capa central de schemas tipo Zod.
- Endpoints locales sensibles validan host `localhost`/`127.0.0.1`, no sesión.

## Performance

- Paginación server-side existe en endpoints principales, pero algunos agregados cargan datasets completos (`loadAllListings`).
- ACARA se carga desde `data/acara_precios_maquinaria_agricola_wide.csv`, en memoria y cacheado 5 minutos.
- Los CSVs legacy del MVP fueron retirados y no deben consumirse en runtime.
- `market-evolution` consulta `priceHistory` y deduplica por unidad en memoria.
- `recalculateListingsPrices` usa SQL raw para actualización masiva.
- Los scripts Postventa cargan servicios TypeScript compartidos con `scripts/register-ts.js`; producción debe incluir `lib/` en la imagen Docker.

## Tests

- No hay script `test`.
- No se detectó suite automatizada.
- Futuros cambios backend deberían agregar al menos checks focalizados o validación manual documentada.

## Riesgos

- Falta validación tipada compartida de inputs.
- No hay autorización granular por endpoint.
- Endpoints locales sensibles dependen de host; revisar si se exponen detrás de proxy.
- Carga completa en memoria puede crecer en stats/análisis/dedupe.
- El endpoint `/api/mappings` escribe JSON local; en contenedor/deploy puede no ser fuente estable para colaboración.
