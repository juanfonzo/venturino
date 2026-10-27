---
name: faltantes
description: Detecta ambigüedades, preguntas al cliente, supuestos y riesgos de alcance antes de cerrar requerimientos o backlog. Use when el input sea incompleto, comercial, ambiguo, contradictorio o cuando haya que refinar respuestas del cliente.
---

# Faltantes

## Workflow

1. Leer brief, input original y manifest.
2. Leer `docs/ai/REFINEMENT_POLICY.md`.
3. Clasificar dudas como bloqueantes o no bloqueantes.
4. Proponer supuestos razonables cuando ayuden a avanzar.
5. Escribir `docs/intake/faltantes.md`.
6. Si hay bloqueantes sin respuesta, detener el flujo y pedir respuestas al usuario.
7. Si existen respuestas, refinar brief/PRD y marcar faltantes resueltos.
8. Al incorporar respuestas, mover preguntas desde `Bloqueantes Activos` a `Bloqueantes Resueltos`, referenciar la fuente de respuesta y actualizar `Estado`.

## Formato

```md
# Faltantes

Estado: bloqueado

Valores posibles: `pendiente`, `bloqueado`, `resuelto`, `sin-bloqueantes`.

## Bloqueantes Activos
- Pregunta:
  Motivo:
  Impacto:

## Bloqueantes Resueltos
- Pregunta:
  Respuesta incorporada en:

## No Bloqueantes
- Pregunta:
  Motivo:

## Supuestos Propuestos
- Supuesto:
  Riesgo si es incorrecto:

## Respuestas Incorporadas
- Fuente:
  Fecha:
  Artefactos actualizados:
```

## Regla

Una duda es bloqueante si impide definir datos, permisos, flujo principal, integración o criterio de aceptación.

No avanzar a PRD final, arquitectura cerrada, backlog implementable ni implementación con `Estado: bloqueado` o con elementos en `Bloqueantes Activos`, salvo autorización explícita del usuario para avanzar con supuestos.

Si el pedido requiere opciones, tradeoffs, alcance dentro/fuera o descomposición en slices, pasar a `refinamiento-backlog` antes de backlog técnico.
