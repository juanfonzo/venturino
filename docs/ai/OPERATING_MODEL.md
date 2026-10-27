# Operating Model

## Objetivo

Guiar a Codex para convertir inputs comerciales y operativos en artefactos técnicos implementables, y luego usar esos artefactos para desarrollar y mantener el sistema.

## Flujo Inicial

1. Cargar propuesta, notas y contexto en `input/`.
2. Ejecutar intake.
3. Generar faltantes.
4. Responder faltantes en Markdown o chat.
5. Refinar alcance y backlog candidato hasta claridad suficiente.
6. Refinar brief y PRD técnico.
7. Ejecutar chequeo de consistencia del PRD.
8. Generar arquitectura, contratos y backlog.
9. Definir base MCP Python/FastAPI y coverage map inicial.
10. Evaluar representación IA-first: MCP y skills del sistema destino.
11. Implementar por vertical slices.
12. Verificar y registrar decisiones.

## Flujo De Mantenimiento

1. Recibir solicitud por chat o archivo en `docs/changes/pending/`.
2. Evaluar impacto.
3. Clasificar si aplica vía rápida, refinamiento liviano o refinamiento completo.
4. Generar faltantes si aplica.
5. Refinar alcance, criterios y slices sólo donde corresponda.
6. Crear o actualizar Markdown sólo si aporta trazabilidad, decisión o backlog.
7. Actualizar PRD, arquitectura o backlog sólo donde corresponda.
8. Evaluar impacto IA-first: MCP y skills del sistema destino.
9. Actualizar `docs/technical/mcp-coverage-map.md` si hubo capacidad operativa.
10. Implementar slice.
11. Verificar.
12. Cerrar y limpiar según `docs/ai/CLOSURE_POLICY.md`.
13. Actualizar `MANIFEST.md` si cambió estado canónico.

## Modo Chat-First

El flujo diario es por chat. El usuario no debe administrar archivos internos para cada solicitud.

- Codex interpreta el pedido y decide si usa vía rápida, refinamiento, backlog, diagnóstico o implementación.
- Codex debe usar `docs/ai/ACTIVATION_MATRIX.md` para elegir agente, skill y documentos minimos antes de ejecutar.
- Codex crea o actualiza `.md` sólo cuando aporta trazabilidad, memoria o coordinación.
- Codex no debe pedir al usuario que cree un archivo salvo que el input sea extenso, inicial o convenga como fuente canónica.
- Las solicitudes por chat son válidas como entrada del kit.
- Los documentos son memoria operativa, no pasos manuales obligatorios.

## Refinamiento Antes De Backlog

Usar `refinamiento-backlog` cuando el pedido sea vago, macro, contradictorio o pueda resolverse de varias formas razonables.

- Para cambios nivel 0/1 sin impacto en datos, permisos, MCP ni criterios de aceptación, usar vía rápida.
- Para mejoras medianas, hacer refinamiento liviano: problema, alcance, criterios, impacto y dudas no bloqueantes.
- Para features grandes, módulos nuevos, permisos, DB, integraciones o MCP, hacer refinamiento completo antes de backlog implementable.
- Si hay bloqueantes, frenar y preguntar. No transformar dudas críticas en tareas técnicas.
- El backlog sólo debe nacer de criterios de aceptación claros, supuestos explícitos y dependencias visibles.

## Prototipos

Usar `docs/ai/PROTOTYPE_POLICY.md` cuando convenga aprender antes de comprometer implementación.

- Cada prototipo debe responder una pregunta concreta.
- No usar prototipos para tareas nivel 0/1 ni para evitar tests.
- No conectar prototipos a producción ni a mutaciones reales salvo decisión explícita.
- Al cerrar, registrar la decisión si es durable y eliminar o absorber el prototipo.

## MCP-First

Usar `docs/ai/MCP_FIRST_POLICY.md` como regla operativa.

- Todo sistema personalizado de Algorym debe tener MCP base en Python/FastAPI.
- El MCP es una API separada.
- Cada agente IA, como Telegram o WhatsApp, debe ser otro servicio/API separado que consume MCP.
- La cobertura es progresiva por feature, pero nunca implícita.
- Cada capacidad operativa queda como `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`.
- `docs/technical/mcp-coverage-map.md` es el mapa de deuda y cobertura MCP.
- Los skills del sistema destino deben apoyarse en herramientas MCP existentes o contratos candidatos.
- Agentes de WhatsApp, Telegram o internos deben operar mediante MCP cuando consulten o modifiquen datos del sistema.
- Los servicios de agentes IA se documentan en `docs/technical/agent-services.md`.
- La decision LangGraph, LangChain o FastAPI simple se documenta segun `docs/ai/AGENT_FRAMEWORK_POLICY.md`.

## Mejora Continua

El proyecto debe mejorar durante todo su ciclo de vida, pero sin inflar contexto innecesario.

Usar:

- `docs/ai/CONTINUOUS_IMPROVEMENT.md` para decidir cuándo registrar, promover o archivar aprendizajes.
- `docs/kit-improvement/inbox.md` para señales crudas de fricción, error, ambigüedad o mejora posible del kit.
- `docs/ai/LESSONS.md` sólo para aprendizajes activos y compactos.
- `docs/backlog-interno/` para mejoras internas del sistema, deuda técnica, automatización, DX, observabilidad y refactors necesarios.
- `docs/ai/DECISIONS.md` para decisiones técnicas o de producto que afecten el futuro.

Después de una corrección importante del usuario o una falla repetible, registrar una lección sólo si cambia comportamiento futuro. Si la regla ya está clara, promoverla al agente, skill o documento operativo correspondiente y compactar `LESSONS.md`.

Los agentes ejecutores registran señales mínimas; el agente `refinamiento-kit` decide si una señal se descarta, observa, fusiona, promueve o pasa a backlog interno. No modificar el kit sin evidencia o repetición, salvo riesgo alto o crítico.

## Coordinación Multiagente

Usar `docs/ai/SUBAGENT_COORDINATION.md` para decidir si conviene delegar y para estandarizar reportes.

- No usar subagentes para tareas nivel 0/1 salvo riesgo transversal.
- Regla base: paralelizar análisis, secuenciar implementación.
- Delegar sólo con ownership claro, salida esperada y límites.
- Pedir reportes con veredicto, severidad, evidencia, archivos relevantes y próximo paso.
- El coordinador integra: no copia reportes; decide qué se implementa, qué queda bloqueado, qué se backloggea y qué se descarta.
- Permitir implementación paralela sólo con contratos congelados, archivos sin solapamiento, dependencias resueltas y verificación integrada posterior.
- Si hay conflicto, priorizar seguridad, datos, permisos e integridad de negocio sobre velocidad o preferencias visuales.

## Gestión De Backlog

El backlog activo debe mantenerse liviano.

- Usar `docs/backlog/roadmap.md` para hitos.
- Usar `docs/backlog/hitos/` para hitos activos o próximos.
- Usar `docs/backlog/features/` sólo para features activas, pendientes o en proceso.
- Usar `docs/backlog/archive/` para resúmenes compactos de features completadas.

No borrar una feature completada hasta que su resumen conserve objetivo, hito, validación, referencias a commits/PR y riesgos residuales.

## Cierre Y Limpieza

Usar `docs/ai/CLOSURE_POLICY.md` antes de declarar una tarea terminada.

- El código funcionando no alcanza si quedaron estados del kit inconsistentes.
- Codex debe actualizar backlog, changes, manifest, docs técnicos, MCP coverage map o archive sólo si corresponde.
- Codex debe compactar o limpiar artefactos temporales o procesados para evitar acumulación.
- No borrar decisiones, evidencia, riesgos o contratos sin resumen trazable.

## UTF-8

Todos los documentos, código, seeds, fixtures, exports y textos visibles deben mantenerse en UTF-8. Si aparece texto corrupto, detener la edición del archivo afectado, identificar la fuente y corregir antes de seguir generando artefactos.

## Artefactos Canónicos

- `docs/ai/MANIFEST.md`
- `docs/ai/DECISIONS.md`
- `docs/ai/ACTIVATION_MATRIX.md`
- `docs/ai/CONTINUOUS_IMPROVEMENT.md`
- `docs/ai/CHAT_FIRST_POLICY.md`
- `docs/ai/CLOSURE_POLICY.md`
- `docs/ai/PROTOTYPE_POLICY.md`
- `docs/ai/OUT_OF_SCOPE_POLICY.md`
- `docs/ai/UTF8_POLICY.md`
- `docs/ai/AUTH_POLICY.md`
- `docs/ai/AI_FIRST.md`
- `docs/ai/MCP_FIRST_POLICY.md`
- `docs/ai/AGENT_FRAMEWORK_POLICY.md`
- `docs/ai/AI_READABLE_CODE.md`
- `docs/ai/CODE_CONTEXT_POLICY.md`
- `docs/ai/DEV_TESTING.md`
- `docs/ai/ENVIRONMENT_POLICY.md`
- `docs/ai/REFINEMENT_POLICY.md`
- `docs/ai/SUBAGENT_COORDINATION.md`
- `docs/ai/SCENARIOS.md`
- `docs/ai/TESTING_POLICY.md`
- `docs/ai/VISUAL_GUIDELINES.md`
- `docs/product/brief.md`
- `docs/product/prd.md`
- `docs/product/out-of-scope.md`
- `docs/technical/arquitectura.md`
- `docs/technical/base-de-datos.md`
- `docs/technical/backend.md`
- `docs/technical/frontend.md`
- `docs/technical/mcp-python.md`
- `docs/technical/agent-services.md`
- `docs/technical/mcp-coverage-map.md`
- `docs/ai/system-skills.md`
- `docs/backlog/`
- `docs/backlog-interno/`
- `docs/kit-improvement/`

## Criterio De Calidad

Un artefacto está listo cuando otro agente puede consumirlo sin reinterpretar el negocio desde cero.
