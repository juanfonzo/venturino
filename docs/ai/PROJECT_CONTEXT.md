# Contexto de Proyecto: Venturino

> Relevamiento estático del repositorio al 2026-05-21. Este documento está pensado para orientar agentes de IA y desarrolladores que trabajen sobre el sistema sin tener que redescubrir arquitectura, dominio, flujos y decisiones vigentes.

## 1. Identidad del proyecto

- **Nombre técnico:** `venturino-tractores`
- **Producto:** Radar de Mercado para Ricardo Venturino S.A.
- **Cliente/dominio:** concesionario John Deere y maquinaria agrícola en Argentina.
- **Estado:** aplicación web en evolución, con MVP inicial basado en CSV y una arquitectura actual que ya incorpora PostgreSQL, Prisma, pipeline desde MongoDB, autenticación y despliegue Docker.
- **Objetivo de negocio:** ayudar a Venturino a analizar precios, stock propio, competidores, referencias ACARA, evolución histórica y oportunidades comerciales en maquinaria agrícola.
- **Idioma del producto:** español.

## 2. Qué problema resuelve

El sistema consolida publicaciones de maquinaria agrícola que llegan de múltiples fuentes, las normaliza y permite responder preguntas comerciales:

- ¿Cómo está posicionado Venturino contra la competencia por marca, modelo, año y horas?
- ¿Qué empresas concentran stock y capital inmovilizado?
- ¿Qué publicaciones activas existen para un modelo y cómo evolucionó su precio?
- ¿Cómo se compara una publicación contra referencias ACARA?
- ¿Qué tan completo y confiable es el dato disponible?
- ¿Qué modelos o unidades podrían representar oportunidad de compra/venta?

## 3. Alcance funcional actual

### Autenticación

- Login en `/login`.
- Middleware protege todas las rutas salvo assets y endpoints públicos de auth.
- Credenciales por variables `AUTH_USER` y `AUTH_PASSWORD`.
- Sesión mediante JWT firmado con `JWT_SECRET`.
- Cookie httpOnly: `venturino_token`.

Archivos relevantes:

- `middleware.ts`
- `lib/auth.ts`
- `app/login/page.tsx`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`

### Dashboard

Ruta: `/dashboard`

Incluye:

- descarga de reporte PDF “Venturino vs mercado”;
- tabla Nuevo vs Usado;
- panel de línea de precios ACARA;
- panel de modelos, publicaciones activas, referencia ACARA, evolución de mercado e historial de publicación.

Archivos principales:

- `app/(pages)/dashboard/page.tsx`
- `components/DownloadReportButton.tsx`
- `components/AcaraTrendPanel.tsx`
- `components/ModelMarketPanel.tsx`
- `components/MarketEvolutionChart.tsx`
- `components/ListingPriceHistoryChart.tsx`

### Análisis 1: Venturino vs competencia

Ruta: `/analisis-1`

Compara inventario de Venturino contra equivalentes de competidores. Permite filtrar por categoría, marca, modelo y ajustar el criterio de matching:

- comparar año o no;
- tolerancia de año;
- comparar horas o no;
- tolerancia porcentual de horas;
- nivel de fuzzy matching por modelo.

Produce:

- ranking por modelo y empresa;
- equivalentes por publicación Venturino;
- brechas absolutas y porcentuales contra competidores;
- flags de comparación cuando no se comparó año/horas o se usó fuzzy match.

Archivos:

- `app/(pages)/analisis-1/page.tsx`
- `app/api/analisis-1/route.ts`
- `lib/analysis/analisis1.ts`

### Análisis 2: stock de competidores

Ruta: `/analisis-2`

Analiza capital inmovilizado y composición de stock por empresa. Distingue Venturino, competidores y marketplaces que no tienen vendedor real confiable.

Incluye:

- KPIs de unidades únicas, capital e empresas;
- deduplicación por unidad;
- tabla de Venturino;
- tabla paginada de competidores;
- detalle modal por empresa;
- breakdown por categoría;
- distribución por provincia.

Archivos:

- `app/(pages)/analisis-2/page.tsx`
- `app/api/analisis-2/route.ts`
- `app/api/analisis-2/items/route.ts`
- `lib/analysis/analisis2.ts`
- `lib/dedupe/listingUnits.ts`

### Explorador

Ruta: `/explorador`

Nota: la ruta `/comparables` existe solo como compatibilidad y redirige a `/explorador`.

Listado paginado de publicaciones activas con filtros:

- búsqueda textual;
- marca;
- estado;
- provincia;
- año mínimo/máximo;
- HP mínimo/máximo.

Cada fila abre detalle con:

- marca/modelo/precio/ubicación/link;
- referencia ACARA vinculada o sugerida automáticamente;
- brecha contra ACARA;
- flags de calidad.

Archivos:

- `app/(pages)/explorador/page.tsx`
- `app/api/tractors/route.ts`
- `lib/data/loadListings.ts`
- `store/useAcaraMappings.ts`
- `lib/utils/acara.ts`

### ACARA

Ruta: `/acara`

Permite explorar el CSV de referencias ACARA, ver series por año y vincular ítems ACARA con combos de mercado `marca_norm|modelo_norm`.

Funcionalidades:

- búsqueda paginada de ítems ACARA;
- detalle con serie histórica;
- sugerencias automáticas por similitud de marca/modelo;
- vínculos guardados en `localStorage` bajo `acaraMappingsV1`;
- export/import JSON de vínculos;
- endpoint server-side opcional para persistir `data/mappings.json`.

Archivos:

- `app/(pages)/acara/page.tsx`
- `app/api/acara/items/route.ts`
- `app/api/acara/item/[id]/route.ts`
- `app/api/acara/suggest/route.ts`
- `app/api/acara/auto-match/route.ts`
- `app/api/acara/items-by-ids/route.ts`
- `app/api/acara/gaps/route.ts`
- `app/api/mappings/route.ts`
- `lib/data/loadAcara.ts`
- `store/useAcaraMappings.ts`

### Reporte PDF

Endpoint: `/api/reports/venturino`

Genera un PDF comparando Venturino contra mercado. Soporta filtros de categoría y `solo_activos`.

Archivos:

- `app/api/reports/venturino/route.ts`
- `lib/reports/venturinoVsMercado.tsx`
- `scripts/generateVenturinoReport.js`
- `reports/*.pdf`

### Tipo de cambio

El sistema empezó con FX fijo 1500 ARS/USD, pero el estado actual incorpora sincronización de tipo de cambio oficial:

- `getCurrentFxRate()` lee la última cotización desde PostgreSQL y usa fallback `1500`;
- `syncFxRate()` obtiene Dólar Oficial desde `https://dolarapi.com/v1/dolares/oficial`;
- `fullFxSync()` guarda la cotización y recalcula precios USD para listings en ARS;
- `/api/sync-fx-rate` expone GET para ver tasa actual y POST local para cron.

Archivos:

- `lib/fx-rate.ts`
- `app/api/sync-fx-rate/route.ts`
- `scripts/syncFxRate.js`
- `.github/workflows/pipeline.yml`

## 4. Stack técnico

- **Framework:** Next.js 14 App Router.
- **Lenguaje:** TypeScript en app/lib/components, JavaScript en scripts de pipeline/crawlers.
- **UI:** React 18 + Tailwind CSS.
- **Gráficos:** Recharts.
- **Mapas:** Leaflet / React Leaflet y GeoJSON local.
- **PDF:** `@react-pdf/renderer`.
- **DB principal actual:** PostgreSQL vía Prisma.
- **Origen de ingestión:** MongoDB Atlas para documentos de scraping.
- **Referencia ACARA:** CSV local wide transformado en memoria.
- **Auth:** JWT con `jose` + cookie httpOnly.
- **Deploy:** Docker + GitHub Actions + Docker Hub + VPS.

## 5. Arquitectura de alto nivel

```text
Crawlers / scrapers
  -> MongoDB Atlas (db algorym, collection venturino)
  -> scripts/pipeline-live.js
  -> PostgreSQL (Prisma)
  -> Next.js App Router
  -> UI Radar de Mercado

ACARA CSV local
  -> lib/data/loadAcara.ts
  -> APIs /api/acara/*
  -> UI ACARA, Dashboard, Explorador

Mappings ACARA
  -> localStorage en cliente
  -> opcional data/mappings.json vía /api/mappings
```

La app lee publicaciones de PostgreSQL. MongoDB no se consulta desde la UI: se usa como fuente de pipeline.

## 6. Modelo de datos principal

Schema: `prisma/schema.prisma`

### `Listing`

Representa una publicación normalizada. Campos relevantes:

- identidad: `id`, `url` única;
- origen: `origen`, `categoriaRaw`, `categoria`;
- contenido: `titulo`, `descripcion`;
- producto: `marca`, `marcaNorm`, `modelo`, `modeloNorm`;
- atributos técnicos: `anio`, `hp`, `horas`;
- condición: `condicionRaw`, `condicion`;
- precio: `precioRaw`, `monedaRaw`, `monedaNorm`, `precioUsd`, `precioArs`;
- ubicación: `ubicacionRaw`, `provincia`, `ciudad`;
- vendedor/competencia: `vendedor`, `tipoVendedor`, `esCompetidor`, `competidorNombre`;
- financiación/IVA: `iva`, `financiacion`;
- scraping: `fechaScraping`, `fechaPublicacion`, `active`, `firstSeenAt`, `lastSeenAt`;
- calidad: `flags`;
- relación con `ScrapingRun` y `PriceHistory`.

Índices importantes: origen, categoría, marca normalizada, condición, provincia, precio USD, competidor, run y active.

### `PriceHistory`

Snapshot histórico de precios por publicación:

- `listingId`;
- `precioUsd`, `precioArs`, `fxRate`, `monedaNorm`, `precioRaw`;
- `scrapingRunId`;
- `snapshotDate`.

Se usa para evolución de mercado y evolución individual de publicación.

### `ScrapingRun`

Audita ejecuciones de pipeline:

- fecha de run;
- conteos de origen/procesamiento;
- nuevos, actualizados y desactivados.

### `FxRate`

Guarda la cotización vigente usada para recalcular precios en ARS.

## 7. Tipos compartidos

Archivo: `lib/types.ts`

El tipo central de UI sigue siendo `TractorItem`, aunque la fuente real actual es Prisma. `lib/data/loadListings.ts` adapta `Listing` a `TractorItem` para conservar compatibilidad con componentes y módulos estadísticos.

Campos claves de `TractorItem`:

- `id`, `origen`, `categoria`, `empresa`, `url`, `titulo`;
- `marca`, `modelo`, `marca_norm`, `modelo_norm`;
- `hp_motor`, `anio`, `horas_uso`;
- `precio_raw`, `moneda_raw`, `precio_nor`, `moneda_norm`;
- `estado_norm`, `condicion`;
- `provincia`, `ciudad`, `ubicacion`;
- `flags`.

Tipos complementarios:

- `AcaraItem`, `AcaraSeriesPoint`, `AcaraDataset`;
- `StatsResponse`;
- `ModelComboStat`;
- `ComparablesResponse` legacy;
- `AcaraMappings`;
- `AcaraGapResponse`.

## 8. Normalización y reglas de negocio

### Categorías core

El pipeline filtra las categorías principales:

- `Tractores`
- `Cosechadoras`
- `Sembradoras`
- `Pulverizadoras`

### Precio

Reglas en `lib/normalize/price.ts` y equivalentes en `scripts/pipeline.js`:

- `Consultar`, vacío o 0 -> sin precio;
- monedas USD reconocidas: `U$`, `U$S`, `US$`, `USD`;
- monedas ARS reconocidas: `$`, `ARS`;
- si falta moneda, intenta inferir desde el texto del precio;
- soporta miles con punto y decimales con coma;
- ARS se convierte a USD con tipo de cambio vigente/fallback;
- caso especial Rastroagro: USD con formato `^\d+\.\d{2}$` y menor a 1000 se multiplica por 1000.

En DB:

- `precioUsd` es la base de comparación;
- `precioArs` conserva valor ARS parseado cuando corresponde.

### Estado

- La fuente de verdad es `condicion` normalizada a `Nuevo` o `Usado`.
- El año no define el estado.
- Se marca conflicto cuando una unidad `Nuevo` tiene año antiguo según regla de pipeline.

### Marca y modelo

La normalización busca hacer matching robusto:

- mayúsculas y sin acentos;
- equivalencias de marca (`JD`, `JOHNDEERE` -> `JOHN DEERE`, `CASE` -> `CASE IH`, etc.);
- eliminación de tokens de modelo que son accesorios o ruido (`4WD`, `CABINA`, `HP`, etc.);
- sinónimos de línea (`MXM` -> `MAXXUM`);
- inferencia de modelo desde título cuando el campo modelo está vacío o es pobre.

Archivos:

- `lib/normalize/text.ts`
- `lib/normalize/tractorIdentity.ts`
- `scripts/pipeline.js`
- `scripts/pipeline-shared.js`

### Ubicación

- Se trabaja con texto, no lat/lon.
- El pipeline deriva `provincia` y `ciudad` desde campos de origen como `ubicacion`, `localidad`, `provincia`.
- Mapas usan GeoJSON local.

### Calidad de dato

Flags esperables:

- `MISSING_PRICE`
- `MISSING_YEAR`
- `MISSING_HP`
- `MISSING_LOCATION`
- `YEAR_CONDITION_CONFLICT`
- `SUSPECT_PLACEHOLDER`
- `OUTLIER_LOW`
- `OUTLIER_HIGH`
- flags de inferencia como `MODEL_INFERRED_FROM_TITLE` o `YEAR_EXTRACTED_FROM_TEXT`

UI formatea flags con `lib/utils/flags.ts`.

## 9. Flujo de datos operacional

### Pipeline live

Script: `scripts/pipeline-live.js`

Uso:

```bash
node scripts/pipeline-live.js --dry-run
node scripts/pipeline-live.js
node scripts/pipeline-live.js --since 2026-03-01
```

Flujo:

1. Lee `MONGODB_URI`.
2. Conecta a MongoDB Atlas.
3. Usa `db algorym`, colección `venturino`.
4. Si no hay `--since`, detecta la fecha de scraping más reciente por origen.
5. Procesa solo esas fechas recientes por origen.
6. Normaliza documentos con `normalizeMongoDoc`.
7. Upsert en PostgreSQL por `url`.
8. Crea o actualiza snapshot en `price_history`.
9. Marca como `active=false` las publicaciones no vistas en el batch.
10. Actualiza conteos en `scraping_runs`.

### Pipeline inicial / JSON

Script: `scripts/pipeline.js`

Uso histórico o de carga inicial desde `data/mongo_export.json`. La documentación indica carga tipo delete + insert para reset completo.

### Backfill histórico

Script: `scripts/backfill-price-history.js`

Reconstruye `price_history` desde MongoDB usando fechas históricas de scraping.

### Crawlers incluidos

Hay scripts de crawling/investigación:

- `scripts/crawlVenturinoTractoresUsados.js`
- `scripts/crawlAgrofyTractoresConPrecio.js`
- `scripts/explore_mongo.js`
- `scripts/find_competitors.js`
- `scripts/investigate_matches*.js`
- `scripts/audit_normalization.js`

El README operativo más actualizado es `docs/PIPELINE.md`.

## 10. Fuentes de datos

### PostgreSQL

Fuente actual para publicaciones activas, análisis, rankings, evolución e historial.

Variable requerida:

- `DATABASE_URL`

### MongoDB Atlas

Fuente de ingestión de documentos de scraping.

Variable requerida:

- `MONGODB_URI`

### ACARA CSV

Archivo principal:

- `data/acara_precios_maquinaria_agricola_wide.csv`

Fallback:

- `acara_precios_maquinaria_agricola_wide.csv`

Loader:

- `lib/data/loadAcara.ts`

El CSV está en formato wide y se transforma a:

- ítem ACARA;
- serie `{ yearLabel, valueUsd }`;
- ids estables por marca/categoría/descripción.

### GeoJSON

Archivos:

- `data/geo/argentina-provincias.geojson`
- `argentina_provincias_simplificado.geojson`
- `argentina_provincias.geojson`

Uso:

- mapa por provincia y/o choropleth.

## 11. API interna

Rutas principales:

| Endpoint | Método | Propósito |
|---|---:|---|
| `/api/auth/login` | POST | login y cookie JWT |
| `/api/auth/logout` | POST | elimina cookie |
| `/api/tractors` | GET | publicaciones activas con filtros/paginación |
| `/api/stats` | GET | KPIs, percentiles, agregaciones, combos, oportunidades |
| `/api/model-combos` | GET | búsqueda server-side de combos marca/modelo |
| `/api/analisis-1` | GET | matching Venturino vs competencia |
| `/api/analisis-2` | GET | stock/capital por competidor |
| `/api/analisis-2/items` | GET | detalle de publicaciones por empresa |
| `/api/acara/items` | GET | búsqueda paginada de ACARA |
| `/api/acara/item/[id]` | GET | detalle y serie ACARA |
| `/api/acara/suggest` | GET | sugerencias ACARA por brand/model |
| `/api/acara/auto-match` | POST | match automático para filas de mercado |
| `/api/acara/items-by-ids` | POST | batch fetch de ítems ACARA |
| `/api/acara/gaps` | POST | brechas mercado vs ACARA usando mappings |
| `/api/mappings` | GET/POST/PUT | persistencia server-side opcional de mappings |
| `/api/market-evolution` | GET | evolución p25/p50/p75 por fecha y opcional bucket de año |
| `/api/listings/price-history` | GET | histórico de precio de una publicación por URL |
| `/api/geo/provincias` | GET | GeoJSON de provincias |
| `/api/reports/venturino` | GET | PDF Venturino vs mercado |
| `/api/sync-fx-rate` | GET/POST | ver/sincronizar tipo de cambio |

Nota: `/api/comparables` devuelve `410 Gone`; es un endpoint legacy deshabilitado.

## 12. Layout y UI

### Navegación

Archivo: `components/SiteHeader.tsx`

Rutas visibles:

- Dashboard
- Análisis 1
- Análisis 2
- Explorador
- ACARA

### Estilo visual

Branding John Deere:

- `jd.green` `#367C2B`
- `jd.yellow` `#FFDE00`
- `jd.dark` `#1F4D1A`
- `jd.black` `#1A1A1A`
- `jd.cream` `#F4F1E8`
- `jd.sand` `#C9B06E`

Archivos:

- `tailwind.config.ts`
- `app/globals.css`

Componentes UI base:

- `components/ui/Button.tsx`
- `components/ui/Input.tsx`
- `components/ui/Select.tsx`
- `components/ui/MultiSelect.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Spinner.tsx`

Patrones UI:

- paneles con `.panel`, `.panel-header`, `.panel-body`;
- tablas con `.table-base`;
- modales/drawers para detalle;
- estados loading/error/empty en páginas principales.

## 13. Deduplicación

Archivo: `lib/dedupe/listingUnits.ts`

La deduplicación se usa para evitar contar repetida la misma unidad publicada varias veces. El criterio toma campos como empresa, marca/modelo normalizados, año y precio. Se usa en:

- `loadListings` cuando `dedupeByUnit !== false`;
- `loadAllListings`;
- análisis de competidores;
- evolución de mercado, donde por fecha se toma un precio representativo por unidad.

## 14. Estadísticas y oportunidades

Archivos:

- `lib/stats/buildStats.ts`
- `lib/stats/aggregations.ts`
- `lib/stats/percentiles.ts`
- `lib/stats/opportunities.ts`

`buildStats` produce:

- total;
- cantidad y porcentaje con precio;
- p25/p50/p75;
- agregación por provincia, origen y estado;
- top marcas;
- top 200 combos marca/modelo;
- top oportunidades;
- filas sospechosas por flags.

## 15. ACARA y referencias

`loadAcara`:

- lee CSV desde `data/` o root;
- autodetecta delimitador;
- transforma formato wide en series;
- convierte valores a USD con tipo de cambio actual;
- cachea por 5 minutos.

Matching:

- `findBestAcaraMatch` busca el mejor ítem ACARA por similitud;
- `pickAcaraReferenceDetail` elige valor de referencia según año cuando corresponde;
- si no hay mapping manual, Explorador y Dashboard pueden mostrar sugerencia automática con referencia válida.

Persistencia:

- frontend usa `localStorage`;
- endpoint `/api/mappings` puede leer/escribir `data/mappings.json`, pero no está integrado como fuente primaria del hook actual.

## 16. Reportes

El reporte PDF se genera con React PDF y Prisma. Construye comparaciones de Venturino contra competidores, clasifica brechas y genera un documento descargable.

Archivos:

- `lib/reports/venturinoVsMercado.tsx`
- `app/api/reports/venturino/route.ts`
- `components/DownloadReportButton.tsx`

## 17. Deploy y operación

### Docker

Archivo: `Dockerfile`

Build:

- Node 20 Alpine;
- `npm ci --ignore-scripts`;
- `npx prisma generate`;
- `npm run build`.

Runtime:

- copia `.next`, `public`, `scripts`, `data`, `prisma`, `package.json`, `node_modules`;
- expone puerto 3000;
- arranca `npm run start -- -p 3000 -H 0.0.0.0`.

### GitHub Actions

Archivo: `.github/workflows/pipeline.yml`

En push a `main`:

1. Build Docker sin cache.
2. Push a Docker Hub `algorym2424/algorym:<branch-timestamp>`.
3. SSH al VPS.
4. Detiene y reemplaza contenedor `venturino`.
5. Inyecta env vars: `DATABASE_URL`, `MONGODB_URI`, `AUTH_USER`, `AUTH_PASSWORD`, `JWT_SECRET`.
6. Conecta redes Docker:
   - `nginxproxymanager_default`;
   - `venturino-backend`.
7. Ejecuta `npx prisma db push` dentro del contenedor.
8. Configura cron host:
   - sync diario de FX vía `/api/sync-fx-rate`;
   - backup diario de PostgreSQL.

## 18. Variables de entorno

Requeridas o usadas:

- `DATABASE_URL`: PostgreSQL para Prisma.
- `MONGODB_URI`: MongoDB Atlas para pipeline.
- `AUTH_USER`: usuario de login.
- `AUTH_PASSWORD`: contraseña de login.
- `JWT_SECRET`: secreto de firma JWT.
- `NODE_ENV`: controla cookie secure y modo runtime.

No se deben volcar valores reales de `.env` en documentación, logs ni prompts.

## 19. Scripts npm

Definidos en `package.json`:

- `npm run dev`: desarrollo local.
- `npm run build`: build Next.js.
- `npm run start`: producción.
- `npm run lint`: `next lint`.
- `npm run pipeline:live`: pipeline MongoDB -> PostgreSQL.
- `npm run pipeline:backfill-history`: reconstrucción histórica.
- `npm run crawl:venturino:tractores-usados`.
- `npm run crawl:agrofy:tractores`.
- `npm run report:venturino`.
- `npm run fx:sync`.
- `npm run fx:show`.
- `npm run backfill:precio-ars`.

## 20. Convenciones importantes para agentes

- Antes de tocar lógica de datos, revisar `lib/data/loadListings.ts`, `scripts/pipeline-shared.js` y `scripts/pipeline.js`.
- La UI opera con `TractorItem`; no cambiar esa interfaz sin revisar todas las páginas.
- Para cambios de normalización, mantener sincronizadas las reglas de app y pipeline cuando aplique.
- No asumir que ACARA está en DB: actualmente es CSV local.
- No asumir que mappings ACARA están centralizados: el flujo primario es localStorage.
- No leer ni exponer secretos de `.env`.
- Preservar texto en español y encoding UTF-8.
- Evitar dependencias nuevas salvo necesidad clara.
- Las rutas protegidas requieren sesión; los cron internos dependen de acceso local al contenedor.
- Las publicaciones mostradas por defecto son activas (`active=true`).
- Las comparaciones comerciales deben usar `precio_nor`/`precioUsd`, no `precioRaw`.

## 21. Riesgos y puntos de atención

- **Doble era arquitectónica:** hay documentación antigua de MVP sin DB y código actual con PostgreSQL. Para decisiones actuales, privilegiar código, Prisma y `docs/PIPELINE.md`.
- **Normalización duplicada:** parte de las reglas viven en TypeScript y parte en scripts JS. Cambios parciales pueden crear divergencia.
- **ACARA fuera de DB:** el CSV y mappings locales limitan colaboración multiusuario si no se integra persistencia compartida.
- **Tipo de cambio:** ACARA usa `getCurrentFxRate`; publicaciones ARS se recalculan con sync. Si el cron falla, queda fallback/última tasa.
- **Deduplicación:** afecta métricas y puede cambiar totales frente a conteos crudos.
- **Endpoint `/api/sync-fx-rate` POST:** solo permite host local; si se necesita dispararlo desde otro origen, hay que diseñar auth explícita.
- **`prisma db push` en deploy:** aplica cambios directos sin migraciones versionadas; revisar antes de cambios destructivos.
- **No hay suite de tests visible:** validar con `npm run build`, checks manuales y dry-runs de pipeline.

## 22. Archivos de entrada más relevantes

- `docs/PIPELINE.md`: operación vigente del pipeline MongoDB -> PostgreSQL.
- `BUSINESS_CONTEXT.md`: objetivo y reglas iniciales de negocio.
- `DATA_SOURCES.md`: fuentes CSV originales.
- `PIPELINE_RULES.md`: reglas MVP de normalización.
- `CONTINUITY.md`: ledger histórico del trabajo previo.
- `prisma/schema.prisma`: verdad del modelo persistido actual.
- `package.json`: scripts y dependencias.

## 23. Mapa rápido de carpetas

```text
app/
  (pages)/              UI protegida: dashboard, análisis, explorador, ACARA
  api/                  Route handlers de datos, auth, reportes y sync
  login/                Login público
components/             Componentes de UI, gráficos, mapas y paneles
data/                   CSV ACARA, muestras, exports, mappings, GeoJSON
docs/                   Documentación operativa
lib/
  analysis/             Análisis 1 y 2
  data/                 Loaders PostgreSQL y ACARA
  db/                   Prisma client
  dedupe/               Deduplicación de unidades
  normalize/            Normalización TS
  reports/              PDF
  stats/                KPIs, agregaciones, percentiles, oportunidades
  utils/                Formato, CSV, ACARA, IDs
prisma/                 Schema Prisma
scripts/                Pipeline, backfill, crawlers, auditorías, reportes
store/                  Hook localStorage para mappings ACARA
reports/                PDFs generados
public/                 Assets públicos
```

## 24. Contratos mentales del dominio

| Término | Definición |
|---|---|
| Publicación | Registro de maquinaria publicado en una fuente externa o Venturino |
| Listing | Publicación persistida y normalizada en PostgreSQL |
| Origen | Fuente técnica/comercial del dato, por ejemplo Venturino, Agrofy, Rastroagro |
| Empresa / vendedor | Actor que publica o vende la unidad |
| Competidor | Empresa detectada como competidor directo según pipeline |
| Categoría | Tipo de maquinaria: tractores, cosechadoras, sembradoras, pulverizadoras |
| Combo | Par normalizado marca/modelo usado para agrupar mercado |
| ACARA | Referencia de precios industrial/catálogo importada desde CSV |
| Mapping ACARA | Vínculo entre combo de mercado e ítem ACARA |
| Precio normalizado | Precio comparable en USD (`precioUsd`/`precio_nor`) |
| Unidad única | Publicación deduplicada por atributos de unidad para evitar doble conteo |
| Snapshot | Precio de una publicación en una fecha de scraping |
| Run | Ejecución de pipeline registrada en `scraping_runs` |

## 25. Recomendaciones para futuras tareas

- Si se trabaja en datos, agregar pruebas o al menos scripts de auditoría de normalización antes/después.
- Si se toca pipeline, ejecutar primero dry-run y revisar `data/pipeline_live_sample.json`.
- Si se cambia el schema, evaluar migraciones Prisma formales en vez de depender solo de `db push`.
- Si se busca colaboración real en mappings ACARA, mover mappings a DB.
- Si se agregan filtros UI, implementarlos server-side primero para evitar cargar todo el dataset en cliente.
- Si se modifica matching de modelos, revisar Análisis 1, Dashboard, ACARA auto-match y reportes PDF.
