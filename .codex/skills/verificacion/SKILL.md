---
name: verificacion
description: Verifica entregables documentales o codigo contra criterios de aceptacion, pruebas, build, seguridad basica y riesgos residuales. Use before marking work done, before delivery, during QA, or when user asks to review/validate.
---

# Verificacion

## Workflow

1. Leer criterios de aceptacion y backlog.
2. Leer `docs/ai/TESTING_POLICY.md`, `docs/ai/DEV_TESTING.md`, `docs/ai/SCENARIOS.md`, `docs/ai/CODE_REVIEW_POLICY.md` y `docs/ai/CLOSURE_POLICY.md` cuando aplique.
3. Leer `docs/ai/MCP_FIRST_POLICY.md` cuando el cambio toque capacidades operativas.
4. Clasificar nivel de verificacion: 0 documental, 1 UI ligera, 2 logica local, 3 flujo funcional, 4 critico.
5. Revisar diff o artefactos modificados.
6. Ejecutar tests/build/lint disponibles segun nivel.
7. Usar el navegador nativo de Codex cuando el nivel y el tipo de cambio lo requieran.
8. Priorizar tests de comportamiento observable y evitar validar detalles internos innecesarios.
9. Revisar estados UX, validaciones, permisos y errores.
10. Evaluar impacto IA-first: MCP y skills del sistema destino.
11. Revisar si se aplico `docs/ai/CODE_CONTEXT_POLICY.md` antes de editar codigo.
12. Revisar si `docs/ai/PROJECT_GRAPH_POLICY.md` aplicaba y si CodeGraph fue usado, omitido justificadamente o quedo pendiente de reindexar.
13. Revisar si el codigo queda navegable para agentes futuros.
14. Aplicar revisión estructurada si el cambio fue nivel 2+ o de riesgo, y tratar hallazgos como candidatos a verificar.
15. Verificar cierre del kit: backlog, changes, manifest, archive, prototipos y temporales cuando corresponda.
16. Si una feature se completa, verificar que tenga entrada en `docs/backlog/archive/YYYY-MM.md`.
17. Reportar hallazgos, riesgos y validacion realizada.

## Checklist

- Criterios de aceptacion cubiertos.
- Nivel de verificacion aplicado y justificado.
- Sin cambios fuera de alcance.
- Tests o verificacion manual documentada.
- Tests enfocados en comportamiento observable, no en detalles internos fragiles.
- Revisión estructurada aplicada, o no aplica justificado para nivel 0/1.
- Hallazgos de revisión verificados antes de corregir; hallazgos rechazados con motivo breve.
- Navegacion/browser testing realizado cuando aplica, o justificacion de no aplicabilidad.
- Si el cambio requiere UI/flujo visible, se uso el navegador nativo de Codex o se documento por que no fue posible.
- Auth de desarrollo usable para pruebas si el flujo requiere login.
- Si la feature toca registro/autoregistro de usuarios, pantalla `Registrarse`, signup backend, errores de validacion, duplicados y flujo post-registro verificados.
- Si la feature toca listados potencialmente grandes, paginacion server-side, limite maximo, filtros/sort, empty/loading/error y no carga completa en memoria verificados.
- Si la feature toca busqueda textual, busqueda tokenizada server-side, campos buscables, combinacion con filtros/paginacion, empty con query y casos de tokens parciales verificados.
- Escenario de usuario ejecutado cuando el nivel sea 3 o 4 y exista escenario aplicable.
- Riesgos residuales explicitos.
- Impacto MCP/skills del sistema destino evaluado: `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`.
- `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- Si se implemento herramienta MCP: caso feliz, input invalido, permiso denegado y no exposicion de datos sensibles verificados o justificados.
- Si se implemento tool MCP de listado: `limit`/cursor o `page/pageSize` verificados.
- Si se implemento tool MCP de listado buscable: parametro `search` tokenizado y limite/paginacion verificados.
- Codigo revisado contra `docs/ai/AI_READABLE_CODE.md` cuando hubo implementacion.
- Contexto de codigo revisado proporcionalmente antes de editar, o riesgo registrado.
- CodeGraph usado, omitido justificadamente o marcado no disponible cuando el repo/tarea lo ameritaba.
- Reindexado recomendado si el cambio grande altera modulos, schema, MCP, rutas o arquitectura.
- Feature completada compactada en `docs/backlog/archive/` antes de borrar o mover su archivo activo.
- Prototipos cerrados eliminados, absorbidos o marcados como pendientes de decision.
- `MANIFEST.md` actualizado si cambio el estado del flujo.
- Solicitudes procesadas no quedan en `docs/changes/pending/`.
- Artefactos temporales o duplicados fueron compactados, archivados o limpiados cuando correspondia.
