# Mejora Continua Del Kit

## Objetivo

Mejorar el comportamiento real del kit sin convertir cada aprendizaje en más contexto obligatorio.

## Principio

Una lección útil no debe quedarse indefinidamente como nota. Debe seguir uno de tres caminos:

- convertirse en regla base dentro de un agente, skill o documento operativo;
- convertirse en tarea de backlog interno si requiere trabajo;
- archivarse si ya no aporta comportamiento.

Las señales crudas no van directo a `LESSONS.md`. Primero deben registrarse en `docs/kit-improvement/inbox.md` cuando todavía no está claro si son ruido, patrón o mejora real.

## Ciclo

1. Detectar error, fricción o posible patrón.
2. Si todavía es señal cruda, registrar en `docs/kit-improvement/inbox.md` con fingerprint, origen, evidencia e impacto.
3. Ejecutar `refinamiento-kit` a demanda o al cierre de hito para hacer triage.
4. Clasificar alcance: tarea, feature, hito, proyecto o kit.
5. Asignar dueño: coordinador, requerimientos, arquitectura, backend, frontend, MCP, QA, backlog o todos.
6. Registrar en `LESSONS.md` sólo si evita un error futuro relevante y ya fue validado, promovido o marcado como activo.
7. Promover cuando el aprendizaje sea estable:
   - regla de coordinación -> `.codex/agents/coordinador.md` o `AGENTS.md`
   - regla de producto -> `.codex/skills/prd-tecnico/SKILL.md` o `docs/product/prd.md`
   - regla de implementación -> skill técnico correspondiente
   - regla de testing -> `docs/ai/TESTING_POLICY.md` o skill `verificacion`
   - mejora no urgente -> `docs/backlog-interno/mejoras.md`
8. Mover la lección a `Promovidas` o `Archivo Compacto`.

## Criterio Para Registrar

Registrar como señal en `docs/kit-improvement/inbox.md` si hay evidencia concreta de fricción, error, ambigüedad o posible mejora.

Promover a `LESSONS.md` o regla base si cumple al menos una condición:

- evitó o evitaría un bug, bloqueo, retrabajo o mala decisión;
- afecta a más de una feature;
- mejora la coordinación entre agentes;
- mejora seguridad, permisos, datos, testing o UX;
- corrige una preferencia explícita del usuario que probablemente se repita.

No registrar si:

- es una preferencia estética puntual;
- aplica a un único archivo sin impacto futuro;
- ya está cubierto por una regla existente;
- sólo agrega burocracia sin cambiar una decisión o comportamiento.

## Señales Del Kit

Los agentes ejecutores registran señales, no rediseñan el kit.

Formato mínimo:

- fingerprint si es evidente;
- origen;
- qué pasó;
- evidencia;
- impacto;
- severidad percibida.

El agente `refinamiento-kit` decide si la señal se descarta, observa, fusiona, promueve, pide evidencia o pasa a backlog interno.

No modificar el kit sin evidencia o repetición, salvo riesgo alto o crítico.

## Revisión Por Hito

Al cerrar un hito:

- revisar `LESSONS.md`;
- revisar `docs/kit-improvement/inbox.md`;
- promover reglas repetidas;
- archivar señales promovidas, descartadas o fusionadas en `docs/kit-improvement/archive/YYYY-MM.md`;
- archivar aprendizajes obsoletos;
- crear ítems de backlog interno para mejoras que no deben mezclarse con el hito.

## Regla De Contexto

Los agentes no deben leer todo el historial de aprendizajes por defecto. Deben leer:

- `LESSONS.md` si la tarea es similar a una lección activa;
- `docs/kit-improvement/inbox.md` sólo si se está refinando el kit o registrando una señal;
- su propio agente/skill, que ya debería contener aprendizajes promovidos;
- el archivo histórico sólo si se está auditando el proceso.
