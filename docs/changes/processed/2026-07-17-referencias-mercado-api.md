# Cambio procesado: API de referencias de mercado

Estado: implementado; activación productiva pendiente
Fecha: 2026-07-17
Origen: conversación con Venturino y coordinación con Padway

## Objetivo

Exponer a Padway un servicio API para consultar referencias de mercado de maquinaria usada tomada como parte de pago. Padway construirá la interfaz dentro de su dashboard y consumirá la API exclusivamente desde su backend.

## Alcance confirmado

- Fuente exclusiva: publicaciones limpias disponibles en PostgreSQL después de la ejecución manual de `pipeline:live`.
- Condición fija: `Usado`.
- Entrada de referencia directa: categoría, marca, modelo y año.
- Entrada de búsqueda ampliada: categoría, marca opcional, texto de modelo, año opcional y paginación.
- Salida: publicaciones externas, precios normalizados en USD y estadísticas agregadas.
- Dos operaciones separadas: referencias directas y búsqueda ampliada orientativa.
- Historial interno de consultas, resultados y operación externa cuando Padway la informe.
- Autenticación máquina a máquina; ningún secreto se entrega al navegador.

## Límites de la primera versión

- No usa HP ni horas.
- No devuelve tasación, precio recomendado, semáforo comercial ni decisión de compra.
- No expone fechas, corridas, estado, cobertura ni metadatos de scraping.
- No modifica Análisis 1, Análisis 2, Explorador ni las pantallas existentes.
- No incluye frontend ni iframe desarrollado por Algorym.
- La búsqueda ampliada sigue siendo una decisión del vendedor; cuando la familia del modelo es inequívoca, la API devuelve una sugerencia inicial que Padway puede ofrecer como atajo.

## Contrato acordado

```text
POST /api/v1/market-references/direct
  Entrada: { categoria, marca, modelo, anio, externalOperationId? }
  Salida: estadísticas y referencias del mismo modelo, ampliando años automáticamente cuando la muestra cercana es insuficiente.

POST /api/v1/market-references/search
  Entrada: { categoria, marca?, modelo, anio?, page?, pageSize?, externalOperationId? }
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
- [x] Se entrega documentación de autenticación, requests, responses y errores a Padway.
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

## Activación pendiente

- Aplicar el schema/migración en la base productiva.
- Ejecutar `npm run pipeline:backfill-identity` en producción, revisar el informe y aplicar únicamente con `node scripts/backfill-machine-identity.js --apply` si los aliases detectados son los esperados.
- Configurar `PADWAY_API_ENABLED`, `PADWAY_API_CLIENT_ID` y `PADWAY_API_SECRET` en GitHub Actions/producción.
- Intercambiar el secreto por un canal seguro y ejecutar la prueba de integración desde el backend de Padway.

## Verificación 2026-07-21

- `npm run test:market-reference`: 6/6 grupos de checks aprobados, incluidos aliases, preservación de sufijos, familias y expansión de años.
- `npm run verify:market-reference-inventory`: cinco tractores usados verificados contra PostgreSQL local; las familias ampliadas excluyen falsos relacionados como `6125E` para una búsqueda `5E`.
- `npx tsc --noEmit`, `npx prisma validate`, `node --check` y `npm run build`: aprobados.
- `npm run lint`: sin errores; persisten tres warnings preexistentes en UI ajena a esta API.
- Prueba HTTP local firmada: respuesta válida `200`, replay `409 DUPLICATE_REQUEST` y firma inválida `401 UNAUTHORIZED`; la auditoría temporal fue eliminada al finalizar.
- CodeGraph se usó como orientación inicial y la revisión directa de archivos fue la fuente de verdad. No aplicó navegador porque el cambio no incorpora interfaz.

Riesgo residual: las equivalencias se mantienen deliberadamente acotadas. Los modelos nuevos o nomenclaturas no cubiertas deben agregarse con evidencia y regresiones, sin recurrir a fuzzy genérico.

## Impacto MCP/IA

Estado: contrato-candidato. La capacidad `mercado_buscar_referencias` deberá incorporarse al MCP futuro con la misma paginación, filtros y exclusión de campos internos. El servicio MCP no forma parte de este alcance.
