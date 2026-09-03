# Cambio procesado: API de referencias de mercado

Estado: operativo en producción; matching `market-reference-v1.2`
Fecha: 2026-07-17
Origen: conversación con Venturino y coordinación con Padawanway

## Objetivo

Exponer a Padawanway un servicio API para consultar referencias de mercado de maquinaria usada tomada como parte de pago. Padawanway construirá la interfaz dentro de su dashboard y consumirá la API exclusivamente desde su backend.

## Alcance confirmado

- Fuente exclusiva: publicaciones limpias disponibles en PostgreSQL después de la ejecución manual de `pipeline:live`.
- Condición fija: `Usado`.
- Entrada de referencia directa: categoría, marca, modelo y año.
- Entrada de búsqueda ampliada: categoría, marca opcional, texto de modelo, año opcional y paginación.
- Salida: publicaciones externas, precios normalizados en USD y estadísticas agregadas.
- Dos operaciones separadas: referencias directas y búsqueda ampliada orientativa.
- Historial interno de consultas y resultados, correlacionado mediante request-id.
- Autenticación máquina a máquina; ningún secreto se entrega al navegador.

## Límites de la primera versión

- No usa HP ni horas.
- No devuelve tasación, precio recomendado, semáforo comercial ni decisión de compra.
- No expone fechas, corridas, estado, cobertura ni metadatos de scraping.
- No modifica Análisis 1, Análisis 2, Explorador ni las pantallas existentes.
- No incluye frontend ni iframe desarrollado por Algorym.
- La búsqueda ampliada sigue siendo una decisión del vendedor; cuando la familia del modelo es inequívoca, la API devuelve una sugerencia inicial que Padawanway puede ofrecer como atajo.

## Contrato acordado

```text
POST /api/v1/market-references/direct
  Entrada: { categoria, marca, modelo, anio }
  Salida: estadísticas y referencias del mismo modelo, ampliando años automáticamente cuando la muestra cercana es insuficiente.

POST /api/v1/market-references/search
  Entrada: { categoria, marca?, modelo, anio?, page?, pageSize? }
  Salida: resultados orientativos paginados y estadísticas de la búsqueda ampliada.
```

Ambas operaciones requieren firma HMAC con identificador de cliente, timestamp, request-id único y firma del cuerpo. Las respuestas no son cacheables y usan errores JSON estables.

## Criterios de aceptación

- [x] Una llamada firmada correctamente obtiene referencias externas activas de maquinaria usada.
- [x] Una firma inválida, timestamp vencido o request-id repetido es rechazado.
- [x] Categoría, marca, modelo, año y paginación se validan en backend.
- [x] No se devuelven HP, horas ni campos internos de scraping.
- [x] Las publicaciones propias de Venturino no integran la muestra de mercado.
- [x] La búsqueda ampliada aplica búsqueda normalizada y paginación con límite máximo.
- [x] Cada consulta aceptada queda auditada sin guardar secretos.
- [x] Se entrega documentación de autenticación, requests, responses y errores a Padawanway.
- [x] La lógica se verifica con cinco tractores usados del inventario de Venturino.
- [x] Los criterios visibles, la solidez de la muestra y la relación de cada publicación se expresan en español comercial.
- [x] Marca/modelo se normalizan con reglas compartidas por API y pipeline, sin fusionar sufijos de líneas distintas por similitud textual.

## Mejora 2026-07-21: disponibilidad y normalización

- Se mantiene fuera del contrato cualquier filtro por HP u horas.
- La referencia directa aplica una cascada automática: mismo modelo en años cercanos, rango de años ampliado y, si aún faltan datos, mismo modelo de otros años.
- Cada respuesta explica el criterio usado y si la muestra es inexistente, limitada o suficiente.
- Cada publicación informa en lenguaje comercial si es el mismo modelo/año cercano, el mismo modelo de otro año o un modelo relacionado.
- Se incorporó una identidad canónica compartida por pipeline y API. Distingue modelo de configuraciones como Draper, ancho de plataforma, Hydro/botalón y rodado.
- Las equivalencias son específicas por categoría y marca. No se aplica fuzzy genérico ni se eliminan sufijos que puedan representar versiones distintas.
- Se agregó un backfill conservador, dry-run por defecto, para equivalencias comprobadas en datos históricos. En PostgreSQL local corrigió cuatro registros y una segunda simulación quedó sin cambios pendientes.

### Criterio usado para nomenclaturas

Las reglas se contrastaron con nomenclatura oficial y con los datos reales del repositorio. Entre los casos usados como evidencia están el tractor [New Holland T8.295](https://assets.cnhindustrial.com/nhag/lar/es-ar/assets/pdf/agricultural-tractors/Folleto_T8_new.pdf), el [John Deere 5075E](https://www.deere.com/latin-america/es/tractores/tractores-utilitarios/5075e-75hp/), la separación entre cosechadora y [plataformas John Deere](https://www.deere.com.ar/es/cosechadoras/plataformas/) y el modelo completo [PLA MAP 3 3300](https://www.pla.com.ar/fichas-tecnicas/MAP-3-3300.pdf). La falta de evidencia suficiente implica conservar variantes separadas, no fusionarlas.

## Operación productiva

- La API está activa y recibe consultas desde el CRM de Padawanway; `MarketReferenceQuery` conserva la auditoría para revisión interna.
- El schema, variables `PADAWANWAY_API_*` y secretos de integración ya forman parte del despliegue productivo.
- Ejecutar `npm run pipeline:backfill-identity` sólo ante un cambio de aliases o una revisión histórica; es simulación por defecto y cualquier `--apply` requiere revisar previamente el informe.
- Para mejoras del matching, usar el snapshot local actualizado, `npm run verify:market-reference-zero-results` y la guía `docs/technical/referencias-mercado-matching.md`.

## Verificación 2026-07-21

- `npm run test:market-reference`: 7/7 grupos de checks aprobados, incluidos aliases, preservación de sufijos, familias y expansión de años.
- `npm run verify:market-reference-inventory`: cinco tractores usados verificados contra PostgreSQL local; las familias ampliadas excluyen falsos relacionados como `6125E` para una búsqueda `5E`.
- `npx tsc --noEmit`, `npx prisma validate`, `node --check` y `npm run build`: aprobados.
- `npm run lint`: sin errores; persisten tres warnings preexistentes en UI ajena a esta API.
- Prueba HTTP local firmada: respuesta válida `200`, replay `409 DUPLICATE_REQUEST` y firma inválida `401 UNAUTHORIZED`; la auditoría temporal fue eliminada al finalizar.
- CodeGraph se usó como orientación inicial y la revisión directa de archivos fue la fuente de verdad. No aplicó navegador porque el cambio no incorpora interfaz.

Riesgo residual: las equivalencias se mantienen deliberadamente acotadas. Los modelos nuevos o nomenclaturas no cubiertas deben agregarse con evidencia y regresiones, sin recurrir a fuzzy genérico.

## Mejora 2026-09-03: recuperación de falsos negativos auditados

El análisis read-only de las nueve consultas históricas con cero referencias identificó cuatro nomenclaturas que sí tenían publicaciones externas elegibles en PostgreSQL. Se corrigieron sin ampliar el contrato de la API:

- `Multiple 3200 SE`, `M 3200` y `M 3200SE` se unifican con `Múltiple 3200` exclusivamente para `Pulverizadoras` marca `Metalfor`.
- `MAP 3 3300 H` se unifica con `MAP 3 3300` exclusivamente para `Pulverizadoras` marca `PLA`.
- `S770SD40D` se unifica con `S770` exclusivamente para `Cosechadoras` marca `John Deere`.
- La búsqueda ampliada de familias cortas John Deere, como `6J`, recupera filas cuyo modelo normalizado respeta el patrón estructural `6…J`. Categoría, marca, condición, precio mínimo y el guard de familia del ranking siguen siendo obligatorios.

No se eliminaron sufijos de forma global, ni se añadió fuzzy genérico. La simulación de backfill detectó 25 identidades históricas a actualizar —los aliases anteriores y variantes Metalfor esperadas— sin escrituras. La verificación de los casos auditados sobre el snapshot local devolvió: `6J` 38, `Multiple 3200 SE` 25, `MAP 3 3300 H` 6 y `S770SD40D` 9 referencias.

Para repetir la validación read-only con una base actualizada se agregó `npm run verify:market-reference-zero-results`.

## Verificación 2026-07-22

- El contrato de entrada quedó simplificado y request-id permanece como único identificador de trazabilidad por intento.
- El nombre Padawanway quedó unificado en código, variables de entorno, pipeline y documentación compartible.
- `npm run test:market-reference`, `npx tsc --noEmit`, `npx prisma validate` y `npm run build`: aprobados.
- `npm run lint`: sin errores; persisten tres warnings preexistentes en UI ajena a esta API.
- Prueba HTTP local con las nuevas variables: respuesta válida `200`, replay `409 DUPLICATE_REQUEST` y firma inválida `401 UNAUTHORIZED`; se eliminó la auditoría temporal al finalizar.
- Los ocho ejemplos JSON, seis enlaces locales y el vector HMAC del paquete `api-doc/` fueron validados automáticamente.
- No aplicó navegador porque el cambio afecta únicamente contrato, backend y documentación. CodeGraph no fue necesario por tratarse de un ajuste acotado sobre archivos ya identificados.

## Impacto MCP/IA

Estado: contrato-candidato. La capacidad `mercado_buscar_referencias` deberá incorporarse al MCP futuro con la misma paginación, filtros y exclusión de campos internos. El servicio MCP no forma parte de este alcance.
