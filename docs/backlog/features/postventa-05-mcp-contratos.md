# Feature: Contratos MCP Postventa

Tipo: AFK
Estado: contrato-candidato
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: base MCP Python/FastAPI y autorización interna no definidas

## Valor De Negocio

Dejar preparado el módulo para que agentes internos puedan consultar análisis de postventa sin depender de navegación manual por la UI.

## Qué Construir

Documentar y, si el hito lo requiere, implementar herramientas MCP para resumen, listado, detalle y reporte de postventa.

## Dependencias

- Datos: análisis persistido.
- Backend: `/api/postventa/summary`, `/api/postventa/products`, `/api/postventa/products/[id]` y `/api/reports/postventa`.
- Frontend: no aplica.
- Permisos: usuario interno autenticado/autorizado.
- MCP/IA: módulo MCP Python/FastAPI.
- Otros módulos: `docs/technical/mcp-python.md`.

## Impacto Transversal

- Áreas afectadas: MCP, seguridad, documentación de coverage.
- Riesgos: exponer demasiados datos o listados sin límite a agentes.
- Ajustes futuros a registrar: skills de agente que usen estas herramientas.

## Criterios De Aceptación

- [x] `docs/technical/mcp-coverage-map.md` registra las capacidades postventa.
- [ ] Cada tool define entrada, salida, permisos y límites.
- [ ] Listados tienen `limit <= 100`.
- [ ] No se exponen credenciales ni conexión Mongo.
- [ ] Si se implementan tools, tienen pruebas de caso feliz, input inválido y permisos.

## Definition Of Ready

- [x] Criterios de aceptación claros.
- [x] Refinamiento aplicado o vía rápida justificada.
- [x] Modelo de datos o impacto DB definido.
- [x] Permisos definidos o marcado no aplica.
- [x] Impacto IA-first evaluado.
- [x] Estado MCP definido: `contrato-candidato`.
- [x] Tests esperados definidos.

## Tareas Técnicas

- [ ] Definir contratos Pydantic de tools postventa.
- [ ] Conectar tools al backend o DB según arquitectura MCP vigente.
- [ ] Implementar `postventa_resumen_analisis`.
- [ ] Implementar `postventa_listar_productos`.
- [ ] Implementar `postventa_detalle_producto`.
- [ ] Implementar `postventa_generar_reporte` como metadata/URL, no bytes pesados por defecto.
- [ ] Agregar tests MCP.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_resumen_analisis`, `postventa_listar_productos`, `postventa_detalle_producto`, `postventa_generar_reporte`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no definidos aún
- Motivo si no aplica: no aplica.

## Definition Of Done

- [x] Explícitamente dejado como contrato-candidato.
- [ ] Validado.
- [ ] Tests/build/lint ejecutados o justificados.
- [ ] Estados UX cubiertos si aplica.
- [ ] MCP/skills del sistema actualizados, registrados como contrato-candidato, bloqueados o marcado no aplica.
- [x] `docs/technical/mcp-coverage-map.md` actualizado.
- [x] Documentación y manifest actualizados.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md`.

## Verificación

- Nivel de verificación esperado: 2 si sólo contratos, 3 si se implementan tools.
- Navegador requerido: no.
- [x] Validar coverage map.
- [ ] Validar límites de listado.
- [ ] Validar que no se expongan campos sensibles.

## Entorno

- Variables requeridas: las del MCP y backend vigente.
- Credenciales requeridas: según despliegue MCP.
- Fallback permitido: sí para contratos; no para implementación real.
- Estado de entorno: bloqueado hasta definir e implementar el servicio MCP.
