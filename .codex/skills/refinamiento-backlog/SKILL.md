---
name: refinamiento-backlog
description: Refina pedidos vagos, issues o features amplias antes de generar backlog implementable. Use when el cliente o dev describa una necesidad ambigua, macro, contradictoria o con varias alternativas posibles.
---

# Refinamiento Backlog

## Objetivo

Evitar que los agentes asuman de más. Convertir una necesidad vaga en alcance, preguntas, supuestos y criterios listos para backlog o implementación.

## Workflow

1. Leer input original, PRD vigente, manifest, faltantes, `PROJECT_CONTEXT.md`, `docs/product/out-of-scope.md` y cambios pendientes.
2. Clasificar el pedido: vía rápida nivel 0/1, refinamiento liviano o refinamiento completo.
3. Identificar ambigüedades en usuario, flujo, datos, permisos, integraciones, UX, MCP/IA y QA.
4. Separar bloqueantes de no bloqueantes.
5. Proponer opciones cuando haya más de una solución razonable.
6. Definir alcance dentro/fuera, términos de dominio y supuestos explícitos.
7. Proponer descomposición en slices sólo cuando haya claridad suficiente.
8. Si hay bloqueantes, detener y pedir respuestas al usuario.
9. Si no hay bloqueantes, entregar criterios de aceptación y nivel de verificación recomendado.
10. Registrar en `DECISIONS.md` sólo decisiones durables con tradeoff real; registrar en `out-of-scope.md` sólo descartes durables.

## Niveles De Refinamiento

### Vía Rápida

Usar cuando el cambio es nivel 0/1 y no toca datos, permisos, MCP, arquitectura ni criterios de aceptación.

Salida mínima:

- impacto: bajo
- verificación: nivel 0/1
- acción directa o microcambio

### Refinamiento Liviano

Usar para mejoras medianas o issues acotados.

Salida mínima:

- problema a resolver
- alcance dentro/fuera
- criterios de aceptación
- impacto por área
- dudas no bloqueantes

### Refinamiento Completo

Usar para features grandes, inicio de hito, módulos nuevos, permisos, DB, integraciones o MCP.

Salida mínima:

- preguntas bloqueantes
- opciones y tradeoffs
- alcance dentro/fuera
- modelo de datos o impacto DB
- permisos
- contratos esperados
- nivel de verificación
- propuesta de slices

## Formato De Salida

```md
# Refinamiento: Nombre

Estado: listo-para-backlog / bloqueado / via-rapida

## Pedido Original

## Problema A Resolver

## Lenguaje De Dominio
- Términos canónicos:
- Términos ambiguos:

## Alcance Dentro

## Fuera De Alcance

## Preguntas Bloqueantes
- Pregunta:
  Motivo:
  Impacto si no se responde:

## Preguntas No Bloqueantes
- Pregunta:
  Supuesto provisional:
  Riesgo:

## Opciones Y Tradeoffs
| Opción | Ventaja | Riesgo | Recomendación |
|---|---|---|---|

## Impacto Por Área
- Producto:
- Datos:
- Backend:
- Frontend:
- Permisos:
- MCP/IA:
- QA:

## Criterios De Aceptación Refinados
- [ ]

## Propuesta De Slices
- Slice:
  Valor:
  Dependencias:
  Nivel de verificación:

## Decisión Necesaria
- Ninguna / decisión puntual.

## Decisiones Durables
- Registrar en `DECISIONS.md`: sí / no / motivo
- Registrar fuera de alcance: sí / no / motivo
```

## Reglas

- No generar backlog implementable si `Estado: bloqueado`.
- No esconder supuestos dentro de tareas técnicas.
- No crear preguntas innecesarias para cambios nivel 0/1.
- Si un supuesto afecta datos, permisos, dinero, integraciones, seguridad o compromisos con cliente, tratarlo como bloqueante.
- Antes de aceptar algo parecido a una decisión descartada, revisar `docs/product/out-of-scope.md`.
- No crear ADRs por decisiones obvias o reversibles.
