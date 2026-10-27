# 07_MAPS_AND_GEO.md

> Estado: antecedente de diseño del MVP. La aplicación conserva GeoJSON local, pero este documento no es contrato actual de rutas, métricas ni UI; consultar `docs/technical/frontend.md` y `docs/technical/backend.md`.

## Decisión MVP
- No usar latitud/longitud.
- Usar únicamente `ubicacion` -> provincia/ciudad.

## Visualización recomendada
- Default: tabla por provincia con métricas (count, p50, p75, % sin precio).
- Opcional: mapa choropleth por provincia:
  - usar GeoJSON local incluido en repo (sin API externa)
  - colorear por métrica seleccionada (count, p50, p75, % sin precio)
  - tooltip con resumen

## Nota
- Si `ubicacion` no es consistente, priorizar tabla y mostrar % de faltantes.
s
