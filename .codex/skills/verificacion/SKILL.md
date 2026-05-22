---
name: verificacion
description: Verifica entregables documentales o codigo contra criterios de aceptacion, pruebas, build, seguridad basica y riesgos residuales. Use before marking work done, before delivery, during QA, or when user asks to review/validate.
---

# Verificacion

## Workflow

1. Leer criterios de aceptacion y backlog.
2. Leer `docs/ai/TESTING_POLICY.md`, `docs/ai/DEV_TESTING.md`, `docs/ai/SCENARIOS.md` y `docs/ai/CLOSURE_POLICY.md` cuando aplique.
3. Leer `docs/ai/MCP_FIRST_POLICY.md` cuando el cambio toque capacidades operativas.
4. Clasificar nivel de verificacion: 0 documental, 1 UI ligera, 2 logica local, 3 flujo funcional, 4 critico.
5. Revisar diff o artefactos modificados.
6. Ejecutar tests/build/lint disponibles segun nivel.
7. Usar el navegador nativo de Codex cuando el nivel y el tipo de cambio lo requieran.
8. Revisar estados UX, validaciones, permisos y errores.
9. Evaluar impacto IA-first: MCP y skills del sistema destino.
10. Revisar si se aplico `docs/ai/CODE_CONTEXT_POLICY.md` antes de editar codigo.
11. Revisar si el codigo queda navegable para agentes futuros.
12. Verificar cierre del kit: backlog, changes, manifest, archive y temporales cuando corresponda.
13. Si una feature se completa, verificar que tenga entrada en `docs/backlog/archive/YYYY-MM.md`.
14. Reportar hallazgos, riesgos y validacion realizada.

## Checklist

- Criterios de aceptacion cubiertos.
- Nivel de verificacion aplicado y justificado.
- Sin cambios fuera de alcance.
- Tests o verificacion manual documentada.
- Navegacion/browser testing realizado cuando aplica, o justificacion de no aplicabilidad.
- Si el cambio requiere UI/flujo visible, se uso el navegador nativo de Codex o se documento por que no fue posible.
- Auth de desarrollo usable para pruebas si el flujo requiere login.
- Si la feature toca registro/autoregistro de usuarios, pantalla `Registrarse`, signup backend, errores de validacion, duplicados y flujo post-registro verificados.
- Si la feature toca listados potencialmente grandes, paginacion server-side, limite maximo, filtros/sort, empty/loading/error y no carga completa en memoria verificados.
- Escenario de usuario ejecutado cuando el nivel sea 3 o 4 y exista escenario aplicable.
- Riesgos residuales explicitos.
- Impacto MCP/skills del sistema destino evaluado: `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`.
- `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- Si se implemento herramienta MCP: caso feliz, input invalido, permiso denegado y no exposicion de datos sensibles verificados o justificados.
- Si se implemento tool MCP de listado: `limit`/cursor o `page/pageSize` verificados.
- Codigo revisado contra `docs/ai/AI_READABLE_CODE.md` cuando hubo implementacion.
- Contexto de codigo revisado proporcionalmente antes de editar, o riesgo registrado.
- Feature completada compactada en `docs/backlog/archive/` antes de borrar o mover su archivo activo.
- `MANIFEST.md` actualizado si cambio el estado del flujo.
- Solicitudes procesadas no quedan en `docs/changes/pending/`.
- Artefactos temporales o duplicados fueron compactados, archivados o limpiados cuando correspondia.
