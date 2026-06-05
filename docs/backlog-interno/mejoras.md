# Mejoras Internas

Usar este backlog para mejoras del proceso, deuda técnica, DX, automatización, observabilidad y refactors que no deban interrumpir la feature actual.

## Pendientes

```md
## Mejora: Nombre

Origen:
Prioridad: baja / media / alta
Tipo: deuda técnica / DX / observabilidad / performance / automatización / documentación / proceso
Dueño: coordinador / requerimientos / arquitectura / backend / frontend / mcp / qa / backlog / todos
Alcance: tarea / feature / hito / proyecto / kit

Problema:

Propuesta:

Impacto esperado:

Criterios de cierre:
- [ ]

Promover a regla base: sí / no
Destino si se promueve:
```

## En Proceso


## Completadas

## Mejora: Unificar runtime del matching Postventa

Origen: revisión pre-subida Postventa 2026-06-05
Prioridad: media
Tipo: deuda técnica / proceso
Dueño: backend / qa
Alcance: feature

Problema:
El matching productivo vivía en `lib/postventa/matching.ts`, pero la calibración offline y los gates rápidos usaban una copia JavaScript en `scripts/analyzePostventaMatches.js`. Cada ajuste de reglas debía replicarse manualmente.

Solución aplicada:
`scripts/analyzePostventaMatches.js` ahora carga `lib/postventa/matching.ts` mediante `scripts/register-ts.js`. `scripts/pipeline-postventa.js` y `scripts/run-postventa-analysis.js` también ejecutan `lib/postventa/run-analysis.ts` directo, sin endpoint HTTP local.

Criterios de cierre:
- [x] `analysis:postventa-matches` usa la misma implementación que `runPostventaAnalysis`.
- [x] `test:postventa` y `test:postventa-validation-set` consumen el JSON regenerado desde el runtime compartido.
- [x] Se eliminó la copia de reglas en `scripts/analyzePostventaMatches.js`.

Promover a regla base: no
Destino si se promueve: N/A
