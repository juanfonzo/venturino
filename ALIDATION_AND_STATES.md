# 08_VALIDATION_AND_STATES.md

> Estado: guía de UX histórica del MVP CSV. Los endpoints y estados actuales se documentan en `docs/technical/backend.md`, `docs/technical/frontend.md` y `docs/technical/qa.md`.

## Validaciones server-side (API)
- Filtros: sanitizar strings, límites de rango, paginación.
- Percentiles: ignorar precio_nor null.
- Si dataset vacío -> empty state claro.
- Si error de parse CSV -> error state con mensaje accionable.

## Flags sugeridos
- MISSING_PRICE: precio_nor null
- MISSING_YEAR: anio null
- MISSING_HP: hp_motor null
- MISSING_LOCATION: ubicacion null
- YEAR_CONDITION_CONFLICT: estado_norm=Nuevo y anio < 2024 (default)
- SUSPECT_PLACEHOLDER: precio parseado muy bajo para el contexto (opcional)
- OUTLIER_LOW/OUTLIER_HIGH: por IQR del segmento (opcional)

## Estados UX
- Loading: skeleton para cards y tablas
- Empty: “No hay resultados con estos filtros”
- Error: “No se pudo cargar el CSV. Revisá el formato y reintentá.”
- Success: toasts en acciones (guardar mapping, importar/exportar)
s
