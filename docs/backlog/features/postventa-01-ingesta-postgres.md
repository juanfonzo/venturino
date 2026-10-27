# Feature: Ingesta Postventa Mongo A PostgreSQL

Tipo: HITL
Estado: implementado; validación de datos dependiente de cada corrida destino
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: no bloqueado en código

## Valor De Negocio

Dar base persistente y trazable al análisis de postventa, separando productos activos de históricos y evitando depender de consultas directas a Mongo desde la UI.

## Qué Construir

Crear modelo Prisma, migración y pipeline de importación desde Mongo `algorym.productos` hacia PostgreSQL para productos Venturino y ML.

## Dependencias

- Datos: Mongo `algorym.productos`, campos `producto_id`, `ml_item_id`, `nombre`, `precio`, `precio_texto`, `moneda`, `url`, `origen`, fechas de scraping.
- Backend: Prisma, `scripts/pipeline-shared.js`, patrón de `scripts/pipeline-live.js`.
- Frontend: no aplica en este slice.
- Permisos: acceso interno al pipeline.
- MCP/IA: contrato-candidato para consultas posteriores.
- Otros módulos: no modificar pipeline de maquinaria salvo reutilizar helpers seguros.

## Impacto Transversal

- Áreas afectadas: Prisma schema, migraciones, scripts, pipeline.
- Riesgos: marcar inactivos incorrectamente si se mezclan fechas de origen.
- Ajustes futuros a registrar: soporte de nuevas fuentes o campos enriquecidos.

## Criterios De Aceptación

- [x] Existe modelo Prisma para import runs, productos y snapshots postventa.
- [x] `source + externalId` es único para productos.
- [x] La última extracción por `origen` define productos activos.
- [x] Venturino no visto en última extracción queda `active = false`.
- [x] ML no visto en última extracción queda `active = false` y conserva historial.
- [x] Se persiste snapshot de precio/nombre por fecha.
- [x] El pipeline tiene modo `--dry-run`.
- [x] La ejecución informa conteos de altas, actualizaciones, inactivaciones y snapshots.

## Definition Of Ready

- [x] Criterios de aceptación claros.
- [x] Refinamiento aplicado o vía rápida justificada.
- [x] Modelo de datos o impacto DB definido.
- [x] Permisos definidos o marcado no aplica.
- [x] Impacto IA-first evaluado.
- [x] Estado MCP definido: `contrato-candidato`.
- [x] Tests esperados definidos.

## Tareas Técnicas

- [x] Agregar modelos Prisma propuestos en `docs/technical/postventa-ml.md`.
- [x] Generar migración Prisma.
- [x] Implementar normalización de producto postventa.
- [x] Implementar `scripts/pipeline-postventa.js`.
- [x] Implementar deduplicación por `producto_id` y `ml_item_id`.
- [x] Implementar snapshots y activación/inactivación.
- [x] Agregar script npm `pipeline:postventa`.
- [x] Agregar logs de verificación.
- [x] Dejar `pipeline:postventa` como ejecución manual, alineado al pipeline de maquinaria.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_resumen_analisis`, `postventa_listar_productos`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no aplica en este slice
- Motivo si no aplica: aún no hay herramienta implementada, sólo base de datos.

## Definition Of Done

- [x] Implementado.
- [x] Validado mediante dry-runs y contrato de datos; las corridas destino se revisan operacionalmente.
- [x] Tests/build/lint ejecutados o justificados.
- [x] Estados UX cubiertos si aplica.
- [x] MCP/skills del sistema actualizados, registrados como contrato-candidato, bloqueados o marcado no aplica.
- [x] `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- [x] Documentación y manifest actualizados si aplica.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md` al cerrar por completo el hito.

## Verificación

- Nivel de verificación esperado: 2
- Navegador requerido: no, no hay UI.
- [x] Ejecutar dry-run contra Mongo.
- [x] Ejecutar el pipeline manual desde Superadmin o CLI cuando el origen esté validado.
- [ ] Revisar conteos en la próxima corrida destino antes de usar resultados comerciales.
- [x] Verificar en código la inactivación sin borrar históricos.

## Entorno

- Variables requeridas: `DATABASE_URL`, `MONGODB_URI`
- Credenciales requeridas: acceso Mongo Atlas y Postgres dev/prod
- Fallback permitido: no para validación real; sí para dry-run local si hay dump autorizado.
- Estado de entorno: el script y modelo están operativos; la vigencia de datos depende de la última corrida.
