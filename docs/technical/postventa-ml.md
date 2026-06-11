# Arquitectura: Postventa Venturino vs MercadoLibre

Estado: implementado inicial, pendiente de validación en entorno destino

Fecha: 2026-06-05

Fuente principal: conversación de refinamiento + `reports/postventa-match-analysis.md` + `lib/postventa/matching.ts`.

## Objetivo

Construir una nueva sección de análisis de artículos de postventa y accesorios vendidos por Venturino contra publicaciones comparables de MercadoLibre.

El sistema debe:

- importar desde MongoDB `algorym.productos`;
- distinguir Venturino por `origen = "venturino"` y MercadoLibre por `origen = "ml"`;
- persistir productos, snapshots de precio y trazabilidad en PostgreSQL;
- analizar sólo productos activos de la última extracción;
- sugerir candidatos ML por producto Venturino con el algoritmo v0 calibrado;
- comparar precio Venturino contra la mediana de candidatos aceptados;
- exponer una sección web operativa y un reporte PDF por producto.

## Decisiones De Producto

- El algoritmo v0 queda aceptado como base inicial. No se implementa persistencia de revisión manual de matches en este hito.
- El matching sigue el nombre vigente del producto. Si `producto_id` se mantiene pero cambia el nombre, el próximo análisis debe recalcular candidatos con el nombre nuevo.
- Los productos Venturino y ML se consideran comparables sólo si están activos en la última extracción de su origen.
- Los productos ML que ya no aparecen en la última extracción se marcan inactivos y no participan del análisis vigente, pero conservan trazabilidad histórica.
- El reporte PDF usa banda fija de precio `±40%`.
- El estado `similar a ML` usa umbral estándar `±10%`, persistido por corrida en `PostventaAnalysisRun.similarityThreshold`.
- El listado `/postventa` ordena por defecto productos con candidatos/comparables primero y deja `sin comparable` al final.
- El reporte PDF estándar exporta sólo productos comercialmente comparables: `similar a ML`, `Venturino más caro que ML` y `Venturino más barato que ML`. Excluye `sin comparable` y `baja confianza`.
- La UI puede permitir ajustar la banda de precio para exploración, sin alterar el reporte estándar.
- La UI muestra candidatos sugeridos, incluso si algunos son de baja confianza.
- `baja confianza` queda visible en UI como evidencia no accionable, pero no entra al PDF comercial.

## Módulos

| Módulo | Responsabilidad | Archivos esperados |
|---|---|---|
| Ingesta postventa | Leer Mongo `productos`, detectar últimas fechas por origen, deduplicar por id estable y persistir en PostgreSQL | `scripts/pipeline-postventa.js`, `lib/postventa/import.ts` |
| Modelo de datos | Productos, snapshots de precio, corridas de importación, corridas de análisis, candidatos | `prisma/schema.prisma`, migración Prisma |
| Matching | Normalizar nombres, inferir tipos, puntuar candidatos, excluir outliers de precio y calcular mediana | `lib/postventa/matching.ts` |
| API web | Listados, detalle por producto, resumen, ejecución de análisis y descarga PDF | `app/api/postventa/**`, `app/api/reports/postventa/route.ts` |
| UI postventa | Dashboard compacto, filtros, tabla de productos completa y detalle de candidatos en modal | `app/(pages)/postventa/page.tsx`, `components/postventa/**` |
| Reporte PDF | PDF compacto de productos comparables con estado, mediana, brecha y candidato principal | `app/api/reports/postventa/route.ts`, `scripts/generatePostventaReport.js` |
| MCP candidato | Herramientas para consultar resumen, listar productos y ver detalle | `mcp/app/tools/postventa.py` |

## Flujo De Datos

```text
MongoDB Atlas
  db: algorym
  collection: productos
  origen: venturino | ml
    -> pipeline postventa
    -> PostgreSQL
       postventa_import_runs
       postventa_products
       postventa_price_snapshots
    -> analysis run
       postventa_analysis_runs
       postventa_product_analyses
       postventa_match_candidates
    -> Next.js UI / PDF / MCP candidato
```

La calibración offline (`scripts/analyzePostventaMatches.js`) y el análisis persistido (`lib/postventa/run-analysis.ts`) ejecutan el mismo módulo de matching: `lib/postventa/matching.ts`.

## Modelo De Datos Propuesto

### `PostventaImportRun`

Registra cada importación desde Mongo.

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `Int` | autoincremental |
| `mongoDb` | `String` | default `algorym` |
| `mongoCollection` | `String` | default `productos` |
| `venturinoDate` | `DateTime? @db.Date` | última fecha activa Venturino |
| `mlDate` | `DateTime? @db.Date` | última fecha activa ML |
| `sourceCount` | `Int` | registros crudos leídos |
| `venturinoCount` | `Int` | productos Venturino únicos activos |
| `mlCount` | `Int` | productos ML únicos activos |
| `newCount` | `Int` | altas |
| `updatedCount` | `Int` | actualizaciones |
| `deactivatedCount` | `Int` | productos no vistos en última extracción |
| `status` | `String` | `success`, `failed`, `dry_run` |
| `createdAt` | `DateTime` | default `now()` |

### `PostventaProduct`

Representa un producto Venturino o ML, con estado activo vigente.

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `Int` | autoincremental |
| `source` | `String` | `venturino` o `ml` |
| `externalId` | `String` | `producto_id` o `ml_item_id` |
| `name` | `String` | `nombre` actual |
| `priceArs` | `Decimal(14,2)?` | precio normalizado en ARS |
| `priceText` | `String?` | `precio_texto` |
| `installmentTotalArs` | `Decimal(14,2)?` | total financiado ML desde `precio_cuotas`; nulo en Venturino |
| `installmentsQuantity` | `Int?` | cantidad de cuotas ML desde `cantidad_cuotas`; nulo en Venturino |
| `freeShipping` | `Boolean?` | `envio_gratis` de ML; nulo en Venturino |
| `currency` | `String?` | esperado `ARS` |
| `url` | `String?` | URL de origen |
| `categoryMl` | `String?` | sólo ML |
| `scrapingDate` | `DateTime? @db.Date` | fecha de extracción funcional |
| `scrapedAt` | `DateTime?` | timestamp técnico si existe |
| `active` | `Boolean` | visto en última extracción del origen |
| `firstSeenAt` | `DateTime` | primer registro en Postgres |
| `lastSeenAt` | `DateTime` | última vez visto |
| `lastImportRunId` | `Int?` | corrida que actualizó el producto |
| `createdAt` | `DateTime` | default `now()` |
| `updatedAt` | `DateTime` | `@updatedAt` |

Constraints e índices:

- único compuesto: `source + externalId`;
- índice: `source, active`;
- índice: `name`;
- índice: `priceArs`;
- índice: `scrapingDate`;
- índice parcial recomendado en SQL: activos por fuente si Prisma no cubre el caso.

### `PostventaPriceSnapshot`

Historial de precio y nombre por extracción.

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `Int` | autoincremental |
| `productId` | `Int` | FK `PostventaProduct` |
| `importRunId` | `Int` | FK `PostventaImportRun` |
| `snapshotDate` | `DateTime @db.Date` | fecha de scraping |
| `name` | `String` | nombre observado |
| `priceArs` | `Decimal(14,2)?` | precio observado |
| `priceText` | `String?` | texto original |
| `installmentTotalArs` | `Decimal(14,2)?` | total financiado observado |
| `installmentsQuantity` | `Int?` | cantidad de cuotas observada |
| `freeShipping` | `Boolean?` | si ML informaba envío gratis |
| `url` | `String?` | URL observada |
| `activeInRun` | `Boolean` | si participó de la última extracción |
| `createdAt` | `DateTime` | default `now()` |

Constraints:

- único compuesto: `productId + snapshotDate`;
- índices: `productId`, `snapshotDate`, `importRunId`.

### `PostventaAnalysisRun`

Corrida del algoritmo de matching.

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `Int` | autoincremental |
| `importRunId` | `Int?` | FK opcional a importación |
| `algorithmVersion` | `String` | iniciar con `postventa-v0` |
| `priceBand` | `Decimal(5,4)` | reporte estándar `0.4` |
| `topN` | `Int` | default `20` |
| `minScore` | `Int` | default `20` |
| `venturinoDate` | `DateTime? @db.Date` | fecha usada |
| `mlDate` | `DateTime? @db.Date` | fecha usada |
| `status` | `String` | `success`, `failed`, `draft` |
| `summary` | `Json?` | conteos por estado/confianza |
| `createdAt` | `DateTime` | default `now()` |

### `PostventaProductAnalysis`

Resultado por producto Venturino.

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `Int` | autoincremental |
| `analysisRunId` | `Int` | FK |
| `venturinoProductId` | `Int` | FK a `PostventaProduct` |
| `status` | `String` | `Venturino más caro que ML`, `Venturino más barato que ML`, `sin comparable`, `baja confianza`, `similar a ML` |
| `medianMlPriceArs` | `Decimal(14,2)?` | mediana de candidatos usados |
| `ventVsMedianPct` | `Decimal(8,4)?` | diferencia relativa |
| `bestConfidence` | `String` | `alta`, `media`, `baja`, `descartar` |
| `strongCandidateCount` | `Int` | candidatos media/alta |
| `totalCandidates` | `Int` | candidatos usados |
| `excludedByPrice` | `Int` | descartados por banda |
| `excludedByScore` | `Int` | descartados por score |

### `PostventaMatchCandidate`

Candidatos ML sugeridos por producto.

| Campo | Tipo | Nota |
|---|---|---|
| `id` | `Int` | autoincremental |
| `productAnalysisId` | `Int` | FK |
| `mlProductId` | `Int` | FK a `PostventaProduct` |
| `rank` | `Int` | orden visible |
| `score` | `Int` | score v0 |
| `confidence` | `String` | `alta`, `media`, `baja` |
| `mlPriceArs` | `Decimal(14,2)` | precio usado |
| `mlInstallmentTotalArs` | `Decimal(14,2)?` | total financiado ML copiado desde la corrida |
| `mlInstallmentsQuantity` | `Int?` | cantidad de cuotas ML copiada desde la corrida |
| `mlFreeShipping` | `Boolean?` | envío gratis ML copiado desde la corrida |
| `diffPct` | `Decimal(8,4)` | diferencia ML vs Venturino |
| `reasons` | `Json` | motivos del scoring |

Estos datos comerciales de ML son informativos para UI y análisis humano; no modifican scoring, guardrails ni mediana del matching.

## Contratos Backend

### `GET /api/postventa/summary`

Devuelve resumen de la última corrida de análisis.

Query:

```ts
type Input = {
  analysisRunId?: number
}
```

Salida:

```ts
type Output = {
  analysisRun: {
    id: number
    algorithmVersion: string
    priceBand: number
    topN: number
    venturinoDate: string | null
    mlDate: string | null
    createdAt: string
  }
  counts: Record<string, number>
  confidenceCounts: Record<string, number>
}
```

### `GET /api/postventa/products`

Listado paginado de productos Venturino analizados.

Paginación: `page=1`, `pageSize=25`, máximo `100`.

Filtros:

- `search`;
- `status`;
- `confidence`;
- `minDiffPct`;
- `maxDiffPct`;
- `hasComparable`;
- `sort`: `name`, `priceArs`, `ventVsMedianPct`, `status`.

Salida:

```ts
type Output = {
  items: Array<{
    productId: number
    externalId: string
    name: string
    priceArs: number | null
    status: string
    medianMlPriceArs: number | null
    ventVsMedianPct: number | null
    bestConfidence: string
    totalCandidates: number
  }>
  total: number
  page: number
  pageSize: number
}
```

### `GET /api/postventa/products/[id]`

Detalle del producto Venturino, candidatos usados y snapshots relevantes.

Salida:

```ts
type Output = {
  product: {
    id: number
    externalId: string
    name: string
    priceArs: number | null
    url: string | null
    active: boolean
  }
  analysis: {
    status: string
    medianMlPriceArs: number | null
    ventVsMedianPct: number | null
    bestConfidence: string
  }
  candidates: Array<{
    rank: number
    mlProductId: number
    mlExternalId: string
    name: string
    priceArs: number
    url: string | null
    score: number
    confidence: string
    diffPct: number
    reasons: string[]
  }>
  priceHistory: Array<{
    source: "venturino" | "ml"
    productId: number
    snapshotDate: string
    priceArs: number | null
    name: string
    activeInRun: boolean
  }>
}
```

### `POST /api/postventa/analyze`

Ejecuta o reejecuta análisis sobre productos activos. Debe quedar protegido por auth y pensado para uso interno.

Entrada:

```ts
type Input = {
  priceBand?: number
  topN?: number
  minScore?: number
  persist?: boolean
}
```

Validaciones:

- `priceBand` entre `0.05` y `2`;
- `topN` entre `1` y `50`;
- `minScore` entre `0` y `100`.

### `GET /api/reports/postventa`

Genera PDF con última corrida o una corrida específica.

Query:

```ts
type Input = {
  analysisRunId?: number
  status?: string
}
```

El reporte estándar usa `priceBand = 0.4` aunque la UI permita exploración con otros valores.

El endpoint fuerza exportación `comparableOnly`, por lo que `sin comparable` y `baja confianza` quedan excluidos aunque existan otros filtros activos.

## UI Propuesta

Ruta: `/postventa`

Layout operativo:

- KPIs superiores: productos Venturino, comparables, más caro, más barato, baja confianza, sin comparable.
- Filtros compactos: búsqueda, estado, confianza, rango de diferencia, cantidad de candidatos.
- Tabla paginada server-side con columnas: producto, precio Venturino, estado, mediana ML, brecha, confianza, candidatos.
- Tabla de ancho completo con acción `Ver` por registro.
- Modal de detalle con candidatos usados, motivos de score, links a ML y trazabilidad de precio.
- Acción de descarga PDF.
- Estado vacío para primera importación y para filtros sin resultados.
- Estado de error si no hay corrida de análisis persistida.

## MCP / IA

Estado: `contrato-candidato`.

Herramientas candidatas:

- `postventa_resumen_analisis`: resumen de la última corrida.
- `postventa_listar_productos`: listado paginado con filtros.
- `postventa_detalle_producto`: detalle de un producto y candidatos sugeridos.
- `postventa_generar_reporte`: devuelve metadata o URL interna del reporte PDF, no bytes pesados por defecto.

Permisos:

- Sólo usuarios internos autenticados.
- No exponer secretos, conexión Mongo ni URLs internas firmadas.
- Limitar listados a `limit <= 100`.

## Riesgos Y Tradeoffs

- Los datos de Mongo tienen pocos atributos; el matching depende fuertemente de nombre y precio.
- Categorías ML no deben usarse como criterio principal porque difieren del portal Venturino.
- Algunos productos no tendrán comparable real dentro de ML activo o dentro de la banda de precio.
- Persistir candidatos permite auditar reportes, pero exige recalcular cuando cambia el algoritmo.
- No persistir revisión manual simplifica el hito inicial, pero si negocio necesita overrides estables deberá agregarse una capa posterior.
- Los scripts Node ejecutan módulos TypeScript compartidos mediante `scripts/register-ts.js`; la imagen Docker debe copiar `lib/` junto con `scripts/`.

## Criterios De Aceptación Técnicos

- La importación deja activos sólo los productos vistos en la última extracción por origen.
- ML conserva historial y productos inactivos no participan del análisis vigente.
- La última corrida reproduce conteos similares a la calibración v0 con los datos actuales.
- El listado web nunca carga todos los productos/candidatos sin límite.
- El PDF prioriza lectura ejecutiva: muestra el candidato principal por producto; el detalle completo queda en la UI.
- El algoritmo queda testeado con casos de tipos específicos, precio fuera de banda y baja confianza.
