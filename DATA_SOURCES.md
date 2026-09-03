# 02_DATA_SOURCES.md

> Estado: antecedente histórico del MVP basado en CSV. La fuente vigente de maquinaria es MongoDB → `pipeline:live` → PostgreSQL; ACARA continúa como CSV local. Consultar `docs/technical/arquitectura.md` y `docs/technical/base-de-datos.md` antes de implementar cambios.

## 1) tractores_unificados_v3.csv
- Delimitado por ';' (pero implementar autodetección por posibles ',').
- Columnas esperadas:
  - origen,url,titulo,precio,moneda,marca,modelo,hp_motor,anio,formas_pago,ubicacion,condicion,descripcion
- Campos clave:
  - `condicion`: Nuevo/Usado (fuente de verdad del estado).
  - `ubicacion`: texto "Ciudad, Provincia" (no lat/lon).
  - `precio` + `moneda`: múltiples formatos.

### Campo derivado requerido (en server)
- `precio_nor` (USD numérico):
  - parse robusto + conversión usando FX 1500.
  - null si “Consultar”, vacío o 0.
- `provincia` / `ciudad` desde `ubicacion`.
- `estado_norm` desde `condicion`.

### Flags de calidad (recomendado)
- MISSING_PRICE, MISSING_YEAR, MISSING_HP, MISSING_LOCATION
- YEAR_CONDITION_CONFLICT
- SUSPECT_PLACEHOLDER
- OUTLIER_LOW / OUTLIER_HIGH

## 2) acara_precios_maquinaria_agricola_wide.csv
- Wide (0km + años).
- Convertir a formato long en memoria:
  - AcaraItem: brand/category/description + metadata
  - AcaraSeriesPoint: yearLabel -> valueUsd
- Convertir precios en $ a USD con FX 1500 (para comparables consistentes).
