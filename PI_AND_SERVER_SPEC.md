# 09_API_AND_SERVER_SPEC.md

> Estado: especificación histórica del MVP sin base de datos. No enumera las rutas ni contratos actuales; consultar `docs/technical/backend.md` y `api-doc/README.md` para APIs vigentes.

## Objetivo
- Mantener la lógica de negocio en server para:
  - parsing CSV
  - normalización precio_nor
  - agregaciones y percentiles
  - oportunidad de compra
- Evitar mandar 2.6k filas sin necesidad: usar filtros/paginación server-side.

## Endpoints (Route Handlers)

### GET /api/tractors
- Query params:
  - q (search en titulo/modelo/marca)
  - origin, brand, model, estado (Nuevo/Usado)
  - province
  - yearMin/yearMax
  - hpMin/hpMax
  - hasPrice (true/false)
  - page, pageSize
  - sortBy (price_nor|year|hp) + sortDir
- Response:
  - rows (paginado)
  - total, page, pageSize

### GET /api/stats
- Response:
  - kpis globales (total, con_precio, p25/p50/p75)
  - byProvince (count, p50/p75, % sin precio)
  - byOrigin (count, % sin precio)
  - topBrands

### GET /api/comparables
- Input:
  - objetivo: listingId (si usas uid) o fields (brand, model, year, hp)
  - filtros similares a /tractors (sin paginación opcional)
  - targetResell = p50|p75
  - costos (number; default 0)
- Response:
  - n, p25, p50, p75
  - rows (limit razonable, ej 200)
  - opportunity: { targetResell, maxBuy, score, label }

### GET /api/acara/items?q=
- Búsqueda en brand/category/description
- Response paginada

### GET /api/acara/item/:id
- Detalle + serie normalizada a USD

## Mapping ACARA (sin DB)
- En UI:
  - localStorage con export/import JSON
- No endpoint obligatorio.
- Opcional (solo Node runtime): /api/mappings para leer/escribir data/mappings.json (no asumir serverless).

## Performance
- Cache en memoria (TTL) para datasets parseados.
- Recalcular agregaciones pesadas bajo demanda o cachearlas por combinación de filtros (simple memoización).
s
