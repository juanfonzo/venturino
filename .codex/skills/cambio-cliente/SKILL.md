---
name: cambio-cliente
description: Procesa solicitudes nuevas de cliente durante mantenimiento, evalúa impacto y actualiza artefactos técnicos/backlog sin reprocesar todo el proyecto. Use when el usuario agregue cambios, pedidos de cliente o solicitudes reales en docs/changes/pending.
---

# Cambio Cliente

El pedido puede venir por chat o por archivo en `docs/changes/pending/`. No exigir archivo si el chat tiene contexto suficiente.

## Workflow

1. Leer `docs/ai/MANIFEST.md`.
2. Procesar solicitud recibida por chat o solicitudes reales pendientes en `docs/changes/pending/`.
3. Ignorar `README.md`, templates y cualquier archivo con `Estado: template-no-procesar`.
4. Evaluar impacto en producto, datos, backend, frontend, MCP y QA.
5. Clasificar vía rápida, refinamiento liviano o refinamiento completo.
6. Generar faltantes si aplica.
7. Usar `refinamiento-backlog` si el pedido es vago, macro o tiene varias soluciones posibles.
8. Evaluar impacto IA-first en herramientas MCP y skills del sistema destino.
9. Actualizar backlog y documentos afectados.
10. Mover o resumir el cambio en `processed/` o `rejected/` si existía archivo; si vino por chat, registrar sólo si aporta trazabilidad.
11. Actualizar manifest si cambia un artefacto canónico o un pedido del cliente queda cerrado.

## Reglas

- No reescribir PRD completo si sólo cambia una feature.
- Para cambios nivel 0/1, usar vía rápida y no crear backlog completo salvo impacto mayor.
- No convertir pedidos vagos en issues implementables sin refinamiento.
- Mantener trazabilidad del pedido original.
- No crear archivos de cambio para pedidos por chat si no aportan trazabilidad.
- Si el cambio contradice una decisión previa, señalarlo antes de modificar.
- No cerrar el cambio sin indicar si aplica actualizar MCP o skills del sistema destino.
