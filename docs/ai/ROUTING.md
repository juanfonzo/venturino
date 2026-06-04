# Routing

Antes de elegir perfil, skill o documentos, revisar `docs/ai/ACTIVATION_MATRIX.md`. La matriz resume este routing y define activaciones minimas por tipo de pedido.

## Intake Inicial

Disparadores:

- "arranquemos un proyecto"
- "te paso una propuesta"
- "procesá este presupuesto"
- hay archivos nuevos en `input/`

Acción:

- usar skill `intake-proyecto`
- producir o actualizar `docs/product/brief.md`, `docs/product/prd.md`, `docs/intake/faltantes.md`

## Cambio De Cliente

Disparadores:

- "el cliente pidió"
- "agreguemos una funcionalidad"
- solicitud recibida por chat
- hay solicitudes reales en `docs/changes/pending/`

Acción:

- usar skill `cambio-cliente`
- aceptar pedido por chat como entrada válida
- generar impacto, faltantes y backlog incremental
- si el pedido es vago o macro, usar `refinamiento-backlog` antes de backlog incremental
- crear archivo en `docs/changes/pending/` sólo si aporta trazabilidad formal o el pedido es extenso
- ignorar templates con `Estado: template-no-procesar`; `pending/` debe contener solo solicitudes reales

## Vía Rápida Nivel 0/1

Disparadores:

- cambios de documentación
- copy, color, spacing, label o texto visible
- ajustes sin lógica nueva
- cambios clasificados como nivel 0 o 1 en `TESTING_POLICY.md`

Acción:

- no generar PRD, arquitectura ni feature completa salvo que el cambio afecte alcance, permisos, datos, MCP o criterios de aceptación
- registrar el cambio en `docs/changes/processed/` o `MANIFEST.md` sólo si viene del cliente, afecta algo visible/canónico o requiere trazabilidad
- aplicar verificación nivel 0 o 1
- limpiar artefactos temporales si se crearon
- si se detecta impacto mayor, escalar a flujo normal

## Refinamiento De Alcance Y Backlog

Disparadores:

- "hay que mejorar"
- "agreguemos algo para"
- issue o pedido sin flujo claro
- feature macro sin criterios de aceptación
- solicitud con varias soluciones posibles
- cambios que puedan tocar datos, permisos, backend, frontend, MCP o QA

Acción:

- leer `docs/ai/REFINEMENT_POLICY.md`
- leer `docs/ai/OUT_OF_SCOPE_POLICY.md` si el pedido se parece a una decisión descartada o diferida
- usar perfil `refinamiento-backlog` y skill `refinamiento-backlog`
- clasificar vía rápida, refinamiento liviano o refinamiento completo
- generar preguntas bloqueantes si faltan datos, permisos, flujo, integración o aceptación
- no crear backlog implementable si el refinamiento queda `bloqueado`
- pasar a `backlog-tecnico` sólo cuando haya criterios de aceptación, alcance dentro/fuera y dependencias claras

## Prototipo Controlado

Disparadores:

- "prototipemos"
- "quiero comparar diseños"
- incertidumbre alta de UI, lógica, permisos, flujo o modelo de datos
- varias soluciones razonables y costosas de revertir

Acción:

- leer `docs/ai/PROTOTYPE_POLICY.md`
- declarar la pregunta que el prototipo debe responder
- usar prototipo sólo si reduce incertidumbre real
- bloquearlo o aislarlo de producción
- registrar decisión aprendida si corresponde
- eliminarlo o absorber sólo el aprendizaje validado antes de cerrar

## Refinamiento Del Kit

Disparadores:

- "mejoremos el kit"
- "revisá señales"
- "procesá aprendizajes"
- "ajustá agentes/skills/docs"
- hay señales activas en `docs/kit-improvement/inbox.md`

Acción:

- leer `docs/ai/CONTINUOUS_IMPROVEMENT.md`
- usar perfil `refinamiento-kit` y skill `refinamiento-kit`
- agrupar señales por fingerprint
- promover sólo con evidencia o repetición, salvo riesgo alto/crítico
- archivar señales promovidas, descartadas o fusionadas
- actualizar `LESSONS.md`, `backlog-interno`, agentes, skills o docs sólo cuando corresponda

## Implementación

Disparadores:

- "implementá"
- "desarrollá"
- "hacé el backend/frontend/MCP"

Acción:

- verificar backlog aprobado
- verificar que pedidos vagos hayan pasado por refinamiento o vía rápida justificada
- leer `docs/ai/CODE_CONTEXT_POLICY.md` y aplicar nivel de lectura proporcional antes de editar
- leer perfil técnico correspondiente
- evaluar impacto IA-first con `docs/ai/AI_FIRST.md`
- si hay capacidad operativa, leer `docs/ai/MCP_FIRST_POLICY.md` y actualizar `docs/technical/mcp-coverage-map.md`
- implementar un vertical slice por vez
- al terminar, ejecutar cierre y limpieza según `docs/ai/CLOSURE_POLICY.md`

## Coordinación Multiagente

Disparadores:

- "subagentes"
- "varios agentes"
- tarea con 3 o más frentes independientes
- inicio de proyecto, hito o feature grande
- auditoría cruzada de arquitectura, datos, frontend, backend, QA o MCP

Acción:

- leer `docs/ai/SUBAGENT_COORDINATION.md`
- distinguir si los subagentes son de análisis o de implementación
- usar análisis paralelo por defecto y escritura secuencial por defecto
- no delegar tareas nivel 0/1 salvo riesgo transversal
- asignar ownership por perfil y archivo/carpeta
- exigir handoff estándar con veredicto, severidad, evidencia y próximo paso
- permitir implementación paralela sólo si hay contratos congelados, archivos sin solapamiento y dependencias resueltas
- integrar reportes antes de implementar o cerrar

## Faltantes Bloqueantes

Disparadores:

- `docs/intake/faltantes.md` tiene `Estado: bloqueado`
- `docs/intake/faltantes.md` contiene elementos en `Bloqueantes Activos`
- falta definir datos, permisos, flujo principal, integración o criterio de aceptación

Acción:

- detener avance a PRD final, arquitectura cerrada, backlog implementable o implementación
- presentar preguntas bloqueantes al usuario
- esperar respuesta en chat o en `docs/intake/respuestas-faltantes.md`
- continuar solo cuando `Bloqueantes Activos` quede vacío, las respuestas estén incorporadas o el usuario autorice explícitamente avanzar con supuestos

## IA-First / MCP

Disparadores:

- el cambio toca entidades, reglas de negocio, permisos, reportes, automatizaciones o integraciones
- "MCP"
- "agente"
- "chatbot"
- "WhatsApp"
- "Telegram"
- "skills del sistema"

Acción:

- leer `docs/ai/AI_FIRST.md`
- leer `docs/ai/MCP_FIRST_POLICY.md`
- leer `docs/ai/AGENT_SERVICES_POLICY.md` si hay agente IA o canal externo
- leer `docs/ai/AGENT_FRAMEWORK_POLICY.md` si hay agente IA o canal externo
- leer `docs/technical/mcp-python.md`
- leer `docs/technical/mcp-coverage-map.md`
- leer `docs/technical/agent-services.md` si hay Telegram, WhatsApp o asistente interno
- decidir si hay que implementar, documentar como contrato-candidato, bloquear o marcar no aplica
- actualizar herramientas MCP del sistema destino, skills del sistema destino o ambos cuando corresponda
- documentar servicio de agente IA separado cuando corresponda
- registrar "no aplica" con motivo cuando corresponda

## Auth Y Seguridad

Disparadores:

- "login"
- "autenticacion"
- "sesion"
- "roles"
- "permisos"
- "tenant"
- "sucursal"
- "recuperar contrasena"
- "acceso interno"

Accion:

- leer `docs/ai/AUTH_POLICY.md`
- leer `docs/technical/seguridad.md`
- leer `docs/ai/DEV_TESTING.md`
- leer `docs/ai/ENVIRONMENT_POLICY.md`
- definir modelo de usuario, tenant y unidad operativa si aplica
- proteger rutas privadas por defecto
- exigir autorizacion server-side por tenant, rol, permiso y alcance
- asegurar usuario seed, login dev o bypass local seguro para testing
- agregar casos negativos de permisos y tenant antes de cerrar

## Diagnóstico

Disparadores:

- "bug"
- "falla"
- "no funciona"
- "performance"

Acción:

- usar skill `diagnostico`
- construir feedback loop antes de modificar código
- instrumentar con prefijos temporales y limpiarlos antes de cerrar

## Verificación

Disparadores:

- "revisá"
- "validá"
- "cerrá"
- antes de entregar un cambio

Acción:

- usar skill `verificacion`
- comprobar criterios de aceptación, tests, build y riesgos
- comprobar estado MCP y coverage map cuando hubo capacidad operativa
- comprobar cierre del kit: backlog, changes, manifest, archive y temporales cuando corresponda
