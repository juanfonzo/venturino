# 05_METRICS.md

> Estado: definición histórica de métricas del MVP. La fuente de maquinaria actual es PostgreSQL y los KPIs implementados deben verificarse en `lib/stats/**`, `docs/technical/backend.md` y las pantallas vigentes.

## Métricas globales (dashboard)
- total_publicaciones
- con_precio (% precio_nor != null)
- p25/p50/p75 de precio_nor (solo no-null)
- top_provincias por cantidad
- top_marcas por cantidad
- top_oportunidades (score más alto)

## Métricas por provincia
- count
- p50/p75 precio_nor
- % sin precio
- % conflictos año/condición

## Comparables (segmento filtrado)
- n
- p25/p50/p75
- min/max (con flags de outlier)
- % faltantes (año/hp/ubicación)

## Oportunidad de compra (margen 15%)
- target_resell (default p50; toggle p75)
- max_buy = target_resell / 1.15 - costos (default 0)
- score = (max_buy - precio_objetivo) / max_buy
- Semáforo:
  - Verde >= 0.05
  - Amarillo entre -0.05 y 0.05
  - Rojo <= -0.05
