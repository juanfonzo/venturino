# Base De Datos

Última revisión: 2026-06-04.

## Motor

- PostgreSQL.
- ORM: Prisma 5.
- Schema: `prisma/schema.prisma`.
- Cliente: `lib/db/prisma.ts`.
- Deploy actual: GitHub Actions ejecuta `npx prisma db push`.

## Entidades

| Entidad Prisma | Tabla | Propósito |
|---|---|---|
| `ScrapingRun` | `scraping_runs` | Corrida de ingesta de publicaciones de maquinaria. |
| `Listing` | `listings` | Publicación de maquinaria normalizada. |
| `PriceHistory` | `price_history` | Snapshot de precio por publicación y corrida. |
| `FxRate` | `fx_rates` | Cotización vigente para conversión ARS/USD. |
| `PostventaImportRun` | `postventa_import_runs` | Corrida de ingesta de productos postventa. |
| `PostventaProduct` | `postventa_products` | Producto Venturino o ML normalizado. |
| `PostventaPriceSnapshot` | `postventa_price_snapshots` | Historial de precio/nombre postventa. |
| `PostventaAnalysisRun` | `postventa_analysis_runs` | Corrida del algoritmo postventa. |
| `PostventaProductAnalysis` | `postventa_product_analyses` | Resultado por producto Venturino. |
| `PostventaMatchCandidate` | `postventa_match_candidates` | Candidatos ML por producto analizado. |

## Modelo `Listing`

Campos funcionales principales:

- Identidad/origen: `id`, `origen`, `url @unique`.
- Categoría: `categoriaRaw`, `categoria`.
- Marca/modelo: `marca`, `marcaNorm`, `modelo`, `modeloNorm`.
- Atributos: `anio`, `hp`, `horas`, raws respectivos.
- Estado: `condicionRaw`, `condicion`.
- Precio: `precioRaw`, `monedaRaw`, `monedaNorm`, `precioUsd`, `precioArs`.
- Ubicación: `ubicacionRaw`, `provincia`, `ciudad`.
- Vendedor: `vendedor`, `tipoVendedor`, `esCompetidor`, `competidorNombre`.
- Lifecycle: `active`, `firstSeenAt`, `lastSeenAt`, `createdAt`, `scrapingRunId`.
- Calidad: `flags String[]`.

Índices actuales: `origen`, `categoria`, `marcaNorm`, `condicion`, `provincia`, `precioUsd`, `esCompetidor`, `scrapingRunId`, `active`.

## Postventa

Postventa usa modelos separados para no mezclar maquinaria con accesorios/productos:

- `PostventaProduct` tiene unique compuesto `source + externalId`.
- Para productos ML, `PostventaProduct` conserva datos comerciales informativos de MercadoLibre: total financiado (`installmentTotalArs`), cantidad de cuotas (`installmentsQuantity`) y envío gratis (`freeShipping`). En productos Venturino quedan nulos.
- `PostventaPriceSnapshot` tiene unique `productId + snapshotDate`.
- `PostventaProductAnalysis` tiene unique `analysisRunId + venturinoProductId`.
- `PostventaMatchCandidate` tiene unique por rank y por candidato ML dentro del análisis; copia los datos comerciales ML usados en esa corrida para mostrar condiciones de financiación/envío sin afectar el matching.
- Relaciones con `onDelete: Cascade` en snapshots/candidatos dependientes.

Detalle extendido: `docs/technical/postventa-ml.md`.

## Relaciones

| Origen | Destino | Cardinalidad | Regla |
|---|---|---|---|
| `ScrapingRun` | `Listing` | 1:N | `Listing.scrapingRunId` opcional. |
| `ScrapingRun` | `PriceHistory` | 1:N | Cada snapshot pertenece a una corrida. |
| `Listing` | `PriceHistory` | 1:N | Cascade al borrar listing. |
| `PostventaImportRun` | `PostventaProduct` | 1:N opcional | Última corrida que vio el producto. |
| `PostventaImportRun` | `PostventaPriceSnapshot` | 1:N | Snapshot por corrida. |
| `PostventaImportRun` | `PostventaAnalysisRun` | 1:N opcional | Análisis asociado a importación. |
| `PostventaAnalysisRun` | `PostventaProductAnalysis` | 1:N | Cascade al borrar corrida. |
| `PostventaProductAnalysis` | `PostventaMatchCandidate` | 1:N | Cascade al borrar análisis de producto. |

## Lifecycle

| Entidad | Crear | Actualizar | Retención |
|---|---|---|---|
| `Listing` | `pipeline-live` | upsert por `url`, marca active true si visto | No visto en última corrida se marca `active=false`. |
| `PriceHistory` | `pipeline-live` | snapshot por `listingId + snapshotDate` | Historial se conserva. |
| `FxRate` | `syncFxRate` | borra anteriores y crea actual | Sólo cotización actual. |
| `PostventaProduct` | `pipeline-postventa` | upsert por `source + externalId` | No visto se marca inactive. |
| `PostventaPriceSnapshot` | `pipeline-postventa` | snapshot por producto/fecha | Historial se conserva. |
| `PostventaAnalysisRun` | `runPostventaAnalysis` | crea corrida y marca `success`/`failed` | Corridas históricas se conservan. |

## Paginación Y Performance

| Lista/Entidad | Método | Máximo | Observación |
|---|---|---|---|
| `/api/tractors` | offset con `page/pageSize` | 100 | Con dedupe trae todos los filtrados antes de cortar página. |
| `/api/acara/items` | offset en memoria | 100 | Fuente CSV. |
| `/api/model-combos` | `limit` | 100 | Calculado desde listings cargados. |
| `/api/analisis-2/items` | `limit` | 1000 | Carga all listings para breakdown. |
| Postventa propuesto | pendiente | 100 recomendado | APIs de listado/detalle aún no implementadas. |

## Búsqueda

| Entidad | Campos buscables | Estrategia actual | Deuda |
|---|---|---|---|
| `Listing` | título, marca, modelo, descripción | `contains` simple, no tokenizado completo | Alinear con `SEARCH_POLICY.md` si crece o si se toca. |
| ACARA CSV | marca, categoría, descripción | substring simple en memoria | Suficiente para CSV chico/medio; no DB. |
| Model combos | marca/modelo normalizados | contains compacto en memoria/server | Aceptable en MVP. |
| Postventa | nombre | scoring propio en matching | Listados buscables pendientes. |

## Migraciones

- Existe migración SQL versionada para postventa: `prisma/migrations/20260522190000_add_postventa/migration.sql`.
- No se observó migración inicial versionada para todas las tablas principales.
- Workflow usa `prisma db push`, lo que puede aplicar cambios sin migración formal.

## Variables Y Entorno

- `DATABASE_URL` requerida para Prisma.
- `MONGODB_URI` requerida para pipelines.
- No se encontró `.env.example`.

## Fuentes No DB

- ACARA todavía depende de `data/acara_precios_maquinaria_agricola_wide.csv` y no está modelado en Prisma.
- Los CSVs históricos del MVP fueron retirados; si se necesita eliminar todo consumo CSV, la siguiente tarea es migrar ACARA a una tabla o fuente externa versionada.

## Datos Sensibles Para MCP/IA

- No exponer `MONGODB_URI`, `DATABASE_URL`, secretos auth ni URLs internas firmadas.
- Para herramientas MCP futuras, devolver sólo campos necesarios y paginados.
- Postventa y publicaciones pueden exponer URLs públicas de mercado, pero no credenciales ni datos técnicos de infraestructura.

## Riesgos

- `active` es clave para no mezclar datos vigentes e históricos.
- Cambios en normalización de scripts modifican datos persistidos y métricas.
- Falta estrategia de reset/seed documentada.
- Falta test de migraciones y constraints.
- Potenciales índices adicionales si crecen búsquedas por texto o reportes históricos.
