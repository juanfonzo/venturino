# 03_PIPELINE_RULES.md

## Filosofía MVP sin DB
- No persistir datos normalizados en Postgres.
- En cada arranque / request (con cache):
  - cargar CSV desde disco -> parse -> normalizar -> cache en memoria (TTL).
- Mantener “fuente única” en data/*.csv.

## Autodetección de separador CSV
- Leer primera línea:
  - si contiene ';' -> sep=';'
  - sino -> sep=','

## Normalización obligatoria: precio_nor (USD numérico)
- FX fijo: 1500 ARS/USD
- moneda_norm:
  - U$, U$S, USD, US$ -> USD
  - $, ARS -> ARS
  - si moneda nula: inferir desde texto en `precio` (USD/$)
- parseo:
  - remover símbolos y textos: "$", "USD", "U$S", "+ IVA", etc.
  - soportar:
    - miles con '.' (ej "106.338")
    - decimales con ',' (ej "16.995.000,00")
- reglas:
  - si “Consultar” -> null
  - si parse == 0 -> null
  - ARS -> dividir por 1500
  - USD -> dejar
- caso especial compat:
  - origen=Rastroagro, moneda=USD, raw `^\d+\.\d{2}$` y < 1000 -> *1000

## Estado del tractor
- `estado_norm` = `condicion` (Nuevo/Usado)
- `anio` NO define estado
- flag YEAR_CONDITION_CONFLICT:
  - default: estado_norm=Nuevo y anio < 2024 (si año actual=2026)

## Ubicación
- No lat/lon.
- Derivar:
  - provincia: último segmento tras coma
  - ciudad: resto
- Si faltante: flag MISSING_LOCATION

## Caching
- Cache en memoria de:
  - dataset tractores normalizado
  - dataset ACARA transformado a long
- TTL sugerido: 5–15 min
- Botón “Refrescar datos” opcional (invalida cache).
