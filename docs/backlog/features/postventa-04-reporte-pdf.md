# Feature: Reporte PDF Postventa

Tipo: AFK
Estado: implementado
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: no bloqueado en código; necesita una corrida persistida para datos reales

## Valor De Negocio

Entregar a Venturino un reporte compartible a nivel producto con comparación de precios, candidatos usados y señales de confianza.

## Qué Construir

Crear endpoint PDF `GET /api/reports/postventa` y generador React PDF basado en la última corrida de análisis.

## Dependencias

- Datos: análisis persistido y candidatos.
- Backend: servicio de consulta de análisis.
- Frontend: botón de descarga desde `/postventa`.
- Permisos: usuario autenticado.
- MCP/IA: contrato-candidato para generación/consulta de reporte.
- Otros módulos: patrón existente de `app/api/reports/venturino`.

## Impacto Transversal

- Áreas afectadas: reportes, backend, UI.
- Riesgos: PDF demasiado extenso si se incluyen todos los candidatos de todos los productos.
- Ajustes futuros a registrar: export CSV/XLSX si el equipo lo pide.

## Criterios De Aceptación

- [x] El reporte usa el análisis vigente, incluida su banda configurada.
- [x] El reporte incluye resumen global.
- [x] El reporte muestra productos Venturino accionables: `similar a ML`, `Venturino más caro que ML` y `Venturino más barato que ML`.
- [x] El reporte incluye mediana ML y diferencia porcentual cuando corresponde.
- [x] El reporte incluye candidatos usados por producto.
- [x] `sin comparable` y `baja confianza` se excluyen del PDF comercial por decisión de producto.
- [x] El endpoint permite filtrar por estado, búsqueda, confianza y orden.
- [x] El PDF no expone credenciales ni datos técnicos internos.

## Definition Of Ready

- [x] Criterios de aceptación claros.
- [x] Refinamiento aplicado o vía rápida justificada.
- [x] Modelo de datos o impacto DB definido.
- [x] Permisos definidos o marcado no aplica.
- [x] Impacto IA-first evaluado.
- [x] Estado MCP definido: `contrato-candidato`.
- [x] Tests esperados definidos.

## Tareas Técnicas

- [x] Crear generador aislado `scripts/generatePostventaReport.js` para evitar problemas de bundling React PDF en Next 16.
- [x] Crear endpoint `app/api/reports/postventa/route.ts`.
- [x] Reutilizar estilos PDF existentes donde aplique.
- [x] Agregar acción de descarga en UI.
- [x] Agregar verificación manual del PDF.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_generar_reporte`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no aplica
- Motivo si no aplica: herramienta MCP se deja como contrato candidato.

## Definition Of Done

- [x] Implementado.
- [x] Validado.
- [x] Tests/build/lint ejecutados o justificados.
- [x] Estados UX cubiertos si aplica.
- [x] MCP/skills del sistema actualizados, registrados como contrato-candidato, bloqueados o marcado no aplica.
- [x] `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- [x] Documentación operativa actualizada.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md` cuando se cierre el hito completo.

## Verificación

- Nivel de verificación esperado: 2
- Navegador requerido: sí, para descarga desde UI.
- [x] Descargar/generar PDF con fixture temporal.
- [x] Verificar productos con comparable en fixture.
- [x] Verificar productos sin comparable en fixture.
- [x] Verificar respuesta controlada si no hay corrida local persistida.

## Entorno

- Variables requeridas: `DATABASE_URL`, auth existente.
- Credenciales requeridas: usuario interno.
- Fallback permitido: sí, fixtures o seed dev.
- Estado de entorno: implementado; la DB local no tiene corrida persistida, por eso la descarga real queda disponible luego de correr pipeline/análisis Postventa.
