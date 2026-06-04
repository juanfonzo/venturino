# AGENTS.md

Eres Codex trabajando en un proyecto personalizado de Algorym.

## Precedencia De Instrucciones

- Las instrucciones globales de Codex y del entorno siempre aplican.
- Este `AGENTS.md` define las reglas específicas del repo y debe guiar el trabajo dentro de este proyecto.
- Si hay un `AGENTS.md` global en la carpeta de configuración de Codex, tratarlo como lineamiento general.
- Si hay conflicto entre el `AGENTS.md` global y este archivo, seguir la regla más específica del repo, salvo que contradiga seguridad, permisos, instrucciones del sistema o pedido explícito del usuario.
- Si la contradicción afecta alcance, datos, seguridad o destrucción de archivos, detenerse y pedir confirmación.

## Antes De Cualquier Tarea

1. Leer `GUIA_USO_CODEX_KIT.md`.
2. Leer `docs/ai/PROJECT_CONTEXT.md`.
3. Leer `docs/ai/OPERATING_MODEL.md`.
4. Leer `docs/ai/ROUTING.md`.
4.a. Leer `docs/ai/ACTIVATION_MATRIX.md` para elegir agente, skill y documentos minimos.
5. Leer `docs/ai/MANIFEST.md`.
6. Leer `docs/ai/CHAT_FIRST_POLICY.md` para interpretar pedidos recibidos por chat.
7. Leer `docs/ai/UTF8_POLICY.md` cuando la tarea cree o modifique texto, código, datos de prueba, documentación o copys.
8. Leer `docs/ai/AI_FIRST.md` cuando la tarea toque producto, datos, permisos, integraciones, backend, frontend operativo o automatización.
9. Leer `docs/ai/MCP_FIRST_POLICY.md` cuando la tarea toque capacidades operativas, agentes, WhatsApp, Telegram, automatizaciones o MCP.
10. Leer `docs/ai/AGENT_SERVICES_POLICY.md` cuando la tarea toque chatbots, Telegram, WhatsApp, asistentes internos o agentes IA.
10.a. Leer `docs/ai/AGENT_FRAMEWORK_POLICY.md` cuando la tarea toque chatbots, Telegram, WhatsApp, asistentes internos o agentes IA.
11. Leer `docs/ai/AI_READABLE_CODE.md` cuando la tarea implique crear o modificar código.
12. Leer `docs/ai/CODE_CONTEXT_POLICY.md` antes de modificar código.
12.a. Leer `docs/ai/PROJECT_GRAPH_POLICY.md` cuando el repo sea grande, la tarea sea mediana/grande o exista `.codegraph/`.
12.b. Leer `docs/ai/CODE_REVIEW_POLICY.md` cuando el pedido sea review/autoreview o cuando se cierre código no trivial.
13. Leer `docs/ai/AUTH_POLICY.md` cuando la tarea toque autenticacion, sesiones, roles, permisos, tenant, sucursales, acceso interno o recuperacion de contrasena.
14. Leer `docs/ai/PAGINATION_POLICY.md` cuando la tarea toque listados, tablas, busquedas, reportes, endpoints de listado, herramientas MCP de consulta o entidades con muchos registros.
15. Leer `docs/ai/SEARCH_POLICY.md` cuando la tarea toque búsquedas, filtros de texto, listados buscables, catálogos, tools MCP de consulta o entidades con nombre/código/SKU.
16. Leer `docs/ai/ENVIRONMENT_POLICY.md` cuando falten variables, credenciales, permisos de ejecución, base de datos o servicios externos.
17. Leer `docs/ai/SUBAGENT_COORDINATION.md` cuando el pedido requiera varios perfiles o subagentes.
18. Leer `docs/ai/REFINEMENT_POLICY.md` cuando el pedido sea ambiguo, macro, un issue nuevo o una mejora de cliente.
19. Leer `docs/ai/PROTOTYPE_POLICY.md` cuando haya incertidumbre alta de UI, lógica, flujo o modelo y convenga aprender antes de implementar.
20. Leer `docs/ai/OUT_OF_SCOPE_POLICY.md` cuando el pedido se parezca a algo descartado, diferido o fuera de alcance.
21. Leer `docs/ai/CLOSURE_POLICY.md` antes de cerrar tareas con código, backlog o cambios de cliente.
22. Identificar si el pedido es intake inicial, cambio de cliente, implementación, diagnóstico, verificación o documentación.

## Principios

- Mantener todos los archivos de texto y código en UTF-8 según `docs/ai/UTF8_POLICY.md`. Preservar acentos, eñes, signos y vocabulario en español sin corrupción.
- El desarrollador conversa con Codex; Codex administra el kit. No exigir edición manual de Markdown para el día a día salvo intake inicial, input extenso o decisión explícita.
- No asumir alcance cuando el input sea ambiguo; generar faltantes.
- Refinar pedidos vagos antes de convertirlos en backlog o código. Iterar con el usuario hasta claridad suficiente cuando falten datos, permisos, flujo, integración o criterios de aceptación.
- Mantener cambios pequeños, trazables y verificables.
- Antes de editar código, revisar contexto proporcional del código afectado: archivo, patrón, contratos y dependencias según riesgo.
- Usar CodeGraph como índice local opcional para navegar repos grandes según `docs/ai/PROJECT_GRAPH_POLICY.md`; nunca reemplaza lectura directa de archivos críticos.
- No crear abstracciones especulativas.
- No borrar cambios procesados; moverlos o marcarlos por estado.
- No acumular artefactos de proceso innecesarios. Al cerrar, compactar, archivar o limpiar según `docs/ai/CLOSURE_POLICY.md`.
- Gestionar aprendizajes con `docs/ai/CONTINUOUS_IMPROVEMENT.md`: registrar sólo lecciones útiles en `LESSONS.md` y promover reglas estables al agente, skill o documento operativo correspondiente.
- Registrar señales crudas de mejora del kit en `docs/kit-improvement/inbox.md`; no convertirlas en cambios del kit sin triage, evidencia o repetición.
- Registrar mejoras internas del sistema/proyecto en `docs/backlog-interno/`.
- Evaluar impacto IA-first en cada cambio implementable: MCP y skills del sistema destino, no los skills de este kit.
- Mantener MCP-first: todo sistema personalizado debe tener base MCP en Python/FastAPI y cobertura progresiva registrada en `docs/technical/mcp-coverage-map.md`.
- Mantener agentes IA separados del MCP: Telegram, WhatsApp o asistentes internos deben ser servicios/API propios que consumen el MCP mediante herramientas y skills documentados.
- Para agentes IA, elegir framework segun complejidad: LangGraph para no triviales, LangChain como apoyo y FastAPI simple para flujos lineales.
- Si el proyecto usa base de datos real, tomar Postgres + Prisma ORM como camino por defecto desde el inicio, tanto local como desarrollo. No usar persistencia manual si ya hay `DATABASE_URL` o decisión explícita de DB real.
- Para proyectos nuevos, usar Next.js 16 como version objetivo de la app principal. En repos existentes, respetar la version instalada salvo pedido explicito de migracion.
- Para listados potencialmente grandes, aplicar `docs/ai/PAGINATION_POLICY.md`: paginacion server-side, limites maximos, filtros/sort en backend y tools MCP con `limit`/cursor cuando aplique.
- Para búsquedas en listados, aplicar `docs/ai/SEARCH_POLICY.md`: búsqueda tokenizada, normalizada, en backend/DB, combinada con filtros y paginación.
- Para sistemas multi-tenant o con roles/permisos, usar `docs/ai/AUTH_POLICY.md` como referencia base: JWT en cookie HttpOnly, tenant obligatorio y autorizacion server-side.
- Buscar valores reales de entorno en `.env.local`. Usar `.env.example` solo como contrato de variables esperadas.
- Para pruebas UI o flujos visibles, usar el navegador nativo de Codex como primera opción salvo bloqueo de entorno explícito.
- Escribir código navegable para humanos y agentes: límites claros, nombres de dominio, contratos tipados y feedback verificable.
- Usar lenguaje de dominio del proyecto y actualizarlo cuando se consolide.
- Registrar decisiones durables sólo cuando tengan tradeoff real, costo de reversa o contexto que un agente futuro no pueda inferir.
- Usar prototipos sólo para responder una pregunta concreta; cerrarlos eliminando o absorbiendo el aprendizaje validado.
- Preferir vertical slices implementables antes que tareas horizontales por capa.
- No implementar código si faltan brief, PRD técnico, arquitectura o backlog, salvo pedido explícito del usuario.

## Routing Rápido

- Antes de elegir perfil o skill, revisar `docs/ai/ACTIVATION_MATRIX.md`.
- Presupuesto, propuesta, PDF o notas iniciales: usar perfil `intake` y skill `intake-proyecto`.
- Solicitud nueva de cliente o mantenimiento: usar perfil `intake` y skill `cambio-cliente`.
- Ambigüedades o huecos: usar perfil `faltantes` y skill `faltantes`.
- Pedido vago, issue amplio o feature macro: usar perfil `refinamiento-backlog` y skill `refinamiento-backlog`.
- Mejora del kit, señales acumuladas o revisión del proceso: usar perfil `refinamiento-kit` y skill `refinamiento-kit`.
- Prototipo de UI, lógica o modelo: leer `docs/ai/PROTOTYPE_POLICY.md`, formular pregunta concreta, validar y cerrar sin dejar deuda viva.
- PRD o requerimientos: usar perfil `requerimientos` y skill `prd-tecnico`.
- Arquitectura, contratos, módulos o decisiones técnicas: usar perfil `arquitectura` y skill `arquitectura-contratos`.
- Backlog implementable: usar perfil `backlog` y skill `backlog-tecnico`.
- Next.js 16 backend/frontend: usar perfiles `backend-nextjs` o `frontend-nextjs` y skill `implementacion-nextjs`.
- MCP Python/FastAPI: usar perfil `mcp-python` y skill `implementacion-mcp-python`.
- Auth, sesiones, roles, permisos, tenant o sucursales: leer `docs/ai/AUTH_POLICY.md` y `docs/technical/seguridad.md`.
- Listas, tablas, busquedas, reportes o tools MCP de listado: leer `docs/ai/PAGINATION_POLICY.md`.
- Búsqueda textual, catálogos, artículos, clientes, proveedores o entidades con código/SKU: leer `docs/ai/SEARCH_POLICY.md`.
- Impacto IA-first, herramientas MCP o skills del sistema destino: leer `docs/ai/AI_FIRST.md`, `docs/ai/MCP_FIRST_POLICY.md`, `docs/technical/mcp-python.md` y `docs/technical/mcp-coverage-map.md`.
- Agentes IA, Telegram, WhatsApp o asistentes internos: leer `docs/ai/AGENT_SERVICES_POLICY.md`, `docs/ai/AGENT_FRAMEWORK_POLICY.md` y `docs/technical/agent-services.md`.
- Bug o regresión: usar perfil `diagnostico` y skill `diagnostico`.
- Cierre, QA, seguridad o aceptación: usar perfil `qa-seguridad` y skill `verificacion`.
- Repos grandes, GeSuite, ERP, refactors o cambios con impacto incierto: leer `docs/ai/PROJECT_GRAPH_POLICY.md` y usar CodeGraph si está disponible.

## Coordinación

Cuando la tarea requiera varios perfiles, actuar como coordinador:

1. Definir artefactos de entrada.
2. Definir salida esperada por perfil.
3. Separar ownership por archivo/carpeta.
4. Usar subagentes sólo si aportan paralelismo real o reducen riesgo; para tareas nivel 0/1 resolver sin subagentes salvo riesgo transversal.
5. Exigir handoff con veredicto, severidad, evidencia, archivos relevantes, criterios a verificar y próximo paso recomendado.
6. Integrar reportes antes de implementar: resolver conflictos, aceptar/descartar hallazgos y definir qué entra al backlog.
7. Ejecutar en orden de dependencias.
8. Revisar inconsistencias antes de cerrar.
9. Actualizar `docs/ai/MANIFEST.md` y `docs/ai/DECISIONS.md` si corresponde.

## Verificación

Antes de declarar terminado:

- Confirmar qué archivos se leyeron.
- Confirmar si se usó CodeGraph, si no aplicaba o si no estaba disponible cuando la tarea era mediana/grande.
- Confirmar qué archivos se modificaron.
- Confirmar qué validación se realizó.
- Confirmar estado MCP cuando hubo capacidad operativa.
- Confirmar si se usó navegador nativo cuando el cambio afectó UI o flujo visible.
- Si no se pudo validar, explicar por qué.
