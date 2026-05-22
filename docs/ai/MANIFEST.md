# Manifest

## Estado General

- Proyecto:
- Fase: intake / desarrollo / mantenimiento
- Última revisión coordinada:

## Inputs

| Archivo | Estado | Procesado en | Notas |
|---|---|---|---|
| input/propuesta-comercial.md | pendiente | - | Input inicial |

Estados válidos: `pendiente`, `en-proceso`, `procesado`, `rechazado`, `archivado`.

## Artefactos Vigentes

| Artefacto | Estado | Fuente principal | Última actualización |
|---|---|---|---|
| docs/product/brief.md | pendiente | input/propuesta-comercial.md | - |
| docs/product/prd.md | pendiente | docs/product/brief.md | - |
| GUIA_DESARROLLADOR.md | vigente | reglas del kit | - |
| GUIA_USO_CODEX_KIT.md | vigente-nextjs16 | reglas del kit | 2026-05-19 |
| docs/ai/CHAT_FIRST_POLICY.md | vigente | reglas del kit | - |
| docs/ai/ACTIVATION_MATRIX.md | vigente-nextjs16 | reglas del kit | 2026-05-19 |
| docs/ai/CLOSURE_POLICY.md | vigente | reglas del kit | - |
| docs/ai/UTF8_POLICY.md | vigente | reglas del kit | - |
| docs/ai/AUTH_POLICY.md | vigente-signup | referencia GeSuite auth + regla pantalla registrarse | 2026-05-19 |
| docs/ai/PAGINATION_POLICY.md | vigente | reglas de performance para listados | 2026-05-19 |
| docs/ai/AI_FIRST.md | vigente | reglas del kit | - |
| docs/ai/MCP_FIRST_POLICY.md | vigente | reglas del kit | - |
| docs/ai/AGENT_SERVICES_POLICY.md | vigente | reglas del kit | - |
| docs/ai/AGENT_FRAMEWORK_POLICY.md | vigente | reglas del kit | - |
| docs/ai/VISUAL_GUIDELINES.md | vigente | referencia minimal operational admin | - |
| docs/ai/AI_READABLE_CODE.md | vigente-nextjs16 | reglas del kit | 2026-05-19 |
| docs/ai/SCENARIOS.md | vigente-signup | reglas del kit | 2026-05-19 |
| docs/ai/CODE_CONTEXT_POLICY.md | vigente | reglas del kit | - |
| docs/ai/SUBAGENT_COORDINATION.md | vigente | reglas del kit | - |
| docs/ai/REFINEMENT_POLICY.md | vigente | reglas del kit | - |
| docs/technical/mcp-python.md | vigente | reglas del kit | - |
| docs/technical/agent-services.md | vigente | reglas del kit | - |
| docs/technical/frontend.md | vigente-nextjs16 | reglas del kit | 2026-05-19 |
| docs/technical/backend.md | vigente-nextjs16-signup | reglas del kit | 2026-05-19 |
| docs/technical/seguridad.md | vigente-signup | reglas del kit | 2026-05-19 |
| docs/technical/mcp-coverage-map.md | vigente | reglas del kit | - |
| docs/technical/postventa-ml.md | propuesta-implementable | análisis postventa v0 + refinamiento cliente | 2026-05-22 |
| docs/ai/system-skills.md | vigente | reglas del kit | - |
| docs/kit-improvement/inbox.md | vigente | señales de mejora del kit | - |
| docs/backlog/epicas.md | vigente | postventa v0 + docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/roadmap.md | vigente | postventa v0 + docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/hitos/hito-02-postventa-ml.md | pendiente | docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/features/postventa-01-ingesta-postgres.md | pendiente | docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/features/postventa-02-matching-persistido.md | en-proceso | docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/features/postventa-03-ui-analisis.md | pendiente | docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/features/postventa-04-reporte-pdf.md | pendiente | docs/technical/postventa-ml.md | 2026-05-22 |
| docs/backlog/features/postventa-05-mcp-contratos.md | pendiente | docs/technical/postventa-ml.md | 2026-05-22 |

## Cambios De Cliente

| Solicitud | Estado | Impacto | Backlog |
|---|---|---|---|
| Análisis de postventa/accesorios Venturino vs MercadoLibre | refinado | Nuevo módulo con ingesta Postgres, matching v0, UI, PDF y MCP candidato | Hito 02 Postventa |

## Reglas De Procesamiento

- Procesar sólo inputs `pendiente` salvo pedido explícito.
- No borrar inputs procesados.
- Mover cambios cerrados a `docs/changes/processed/`.
- Registrar decisiones no obvias en `DECISIONS.md`.
- Mantener actualizado `docs/technical/mcp-coverage-map.md` cuando cambien capacidades operativas.
