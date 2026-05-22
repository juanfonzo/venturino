# Activation Matrix

## Objetivo

Definir rapidamente que agente, skill y documentos debe activar Codex segun el tipo de pedido.

Esta matriz no reemplaza `ROUTING.md`; lo resume para evitar ambiguedades al inicio de una tarea.

## Regla Base

- Clasificar primero el pedido.
- Leer solo los documentos necesarios para el riesgo y alcance.
- Si el pedido cruza varias areas, coordinar por vertical slice y revisar dependencias.
- Si hay ambiguedad bloqueante, usar refinamiento antes de implementar.

## Matriz

| Pedido toca | Perfil/agente | Skill principal | Documentos minimos | Salida esperada |
|---|---|---|---|---|
| Proyecto nuevo, propuesta, presupuesto o PDF | `intake`, `requerimientos`, `faltantes` | `intake-proyecto`, `prd-tecnico`, `faltantes` | `PROJECT_CONTEXT.md`, `MANIFEST.md`, `input/`, `REFINEMENT_POLICY.md` | brief, faltantes, PRD inicial |
| Pedido vago, macro o ambiguo | `refinamiento-backlog` | `refinamiento-backlog` | `REFINEMENT_POLICY.md`, `docs/product/`, `docs/backlog/` | preguntas bloqueantes o alcance refinado |
| Cambio de cliente o mantenimiento | `intake`, `backlog`, perfiles tecnicos segun impacto | `cambio-cliente`, `backlog-tecnico` | `CHAT_FIRST_POLICY.md`, `CLOSURE_POLICY.md`, `docs/changes/`, `docs/backlog/` | impacto, faltantes, backlog incremental o via rapida |
| Ajuste liviano nivel 0/1 | perfil tecnico minimo | skill del area o sin skill si es directo | `TESTING_POLICY.md`, archivo afectado, guia visual si aplica | cambio puntual y verificacion proporcional |
| UI, frontend, layout, formularios, tablas | `frontend-nextjs` | `implementacion-nextjs` | `VISUAL_GUIDELINES.md`, `docs/technical/frontend.md`, `CODE_CONTEXT_POLICY.md`, PRD/backlog | UI responsive, estados UX, menu lateral, verificacion visual |
| Listas, tablas grandes, busquedas, reportes con detalle | `backend-nextjs`, `frontend-nextjs`, `base-datos` | `implementacion-nextjs`, `verificacion` | `PAGINATION_POLICY.md`, `docs/technical/backend.md`, `docs/technical/frontend.md`, `docs/technical/base-de-datos.md` | paginacion server-side, limites, filtros/sort, indices y estados UI |
| Backend Next.js 16, API routes, server actions | `backend-nextjs` | `implementacion-nextjs` | `docs/technical/backend.md`, `CODE_CONTEXT_POLICY.md`, PRD/backlog | endpoint/logica validada, errores controlados |
| Base de datos, modelos, migraciones, seed | `backend-nextjs`, `arquitectura` | `implementacion-nextjs`, `arquitectura-contratos` | `docs/technical/base-de-datos.md`, `ENVIRONMENT_POLICY.md`, `.env.local`, `.env.example` | modelo versionado, migracion/seed, validacion |
| MCP, herramientas operativas o IA-first | `mcp-python` | `implementacion-mcp-python` | `MCP_FIRST_POLICY.md`, `AI_FIRST.md`, `mcp-python.md`, `mcp-coverage-map.md` | tool implementada o contrato-candidato |
| Agente IA, Telegram, WhatsApp, asistente interno | `mcp-python`, `arquitectura` | `implementacion-mcp-python`, `arquitectura-contratos` | `AGENT_SERVICES_POLICY.md`, `AGENT_FRAMEWORK_POLICY.md`, `agent-services.md`, `system-skills.md` | servicio separado que consume MCP, framework justificado |
| Seguridad, auth, signup/registro, sesiones, roles, tenant, sucursales | `qa-seguridad`, `backend-nextjs`, `frontend-nextjs` | `verificacion`, `implementacion-nextjs` | `AUTH_POLICY.md`, `docs/technical/seguridad.md`, `docs/technical/frontend.md`, `DEV_TESTING.md`, `ENVIRONMENT_POLICY.md` | sesion segura, pantalla `Registrarse` si aplica, reglas de acceso, casos negativos, prueba de permisos |
| Bug, falla o regresion | `diagnostico` | `diagnostico` | error/log, `CODE_CONTEXT_POLICY.md`, tests relevantes | causa raiz, fix minimo, verificacion |
| QA, cierre o aceptacion | `qa-seguridad` | `verificacion` | `TESTING_POLICY.md`, `SCENARIOS.md`, `CLOSURE_POLICY.md`, backlog | evidencia de verificacion y cierre limpio |
| Coordinacion multiagente | `coordinador` + perfiles necesarios | skills por area | `SUBAGENT_COORDINATION.md`, `ROUTING.md`, backlog/PRD | handoffs, integracion y orden de ejecucion |
| Mejora del kit | `refinamiento-kit` | `refinamiento-kit` | `CONTINUOUS_IMPROVEMENT.md`, `LESSONS.md`, `docs/kit-improvement/inbox.md` | senal, descarte, promocion o cambio del kit |

## Reglas De Escalado

- Si una tarea UI toca datos o permisos, activar tambien backend/seguridad.
- Si una tarea backend crea capacidad operativa, evaluar MCP.
- Si una tarea lista datos potencialmente grandes, aplicar `PAGINATION_POLICY.md`; no cargar todo en frontend ni exponer datasets completos por MCP.
- Si una tarea toca auth, signup/registro, roles, permisos, tenant o sucursales, aplicar `AUTH_POLICY.md`.
- Si una tarea agrega agente IA, nunca implementarlo dentro del MCP.
- Si hay DB real, usar `.env.local` para valores reales y `.env.example` como contrato.
- Si falta variable, permiso, credencial o entorno, aplicar `ENVIRONMENT_POLICY.md`.
- Si el pedido no tiene criterio de aceptacion claro, aplicar refinamiento.

## Regla Visual Obligatoria

Toda app debe tener shell con menu lateral desplegable/colapsable donde viven los modulos principales. Para UI interna, seguir `VISUAL_GUIDELINES.md`: minimal operational admin, poco texto explicativo, tablas/paneles simples y cards solo si aportan agrupacion real.
