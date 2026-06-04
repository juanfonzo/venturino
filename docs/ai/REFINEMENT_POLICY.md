# Política De Refinamiento

## Objetivo

Evitar que requerimientos vagos se conviertan en código frágil. El kit debe iterar con el dev/usuario hasta tener claridad suficiente antes de generar backlog implementable o implementar.

## Principio

No asumir de más. Preguntar cuando el faltante afecte negocio, datos, permisos, integraciones, seguridad, UX crítica, MCP/IA o criterios de aceptación.

Antes de aceptar una solución, revisar si el concepto ya aparece como fuera de alcance en `docs/product/out-of-scope.md` usando `docs/ai/OUT_OF_SCOPE_POLICY.md`.

## Niveles

### Vía Rápida

Aplica a cambios nivel 0/1: copy, color, spacing, documentación o ajuste menor sin impacto en lógica, datos, permisos, MCP ni criterios de aceptación.

Resultado: acción directa, verificación ligera y registro mínimo si corresponde.

### Refinamiento Liviano

Aplica a mejoras medianas o issues acotados.

Resultado:

- problema a resolver;
- alcance dentro/fuera;
- criterios de aceptación;
- impacto por área;
- dudas no bloqueantes y supuestos.

### Refinamiento Completo

Aplica a features grandes, módulos nuevos, permisos, DB, integraciones, MCP/IA, flujos operativos críticos o pedidos contradictorios.

Resultado:

- preguntas bloqueantes resueltas o registradas;
- opciones y tradeoffs;
- alcance dentro/fuera;
- impacto por área;
- criterios de aceptación refinados;
- propuesta de slices;
- nivel de verificación.

## Bloqueantes

Frenar antes de backlog implementable o implementación si falta definir:

- actor o usuario principal;
- flujo principal;
- datos obligatorios;
- permisos;
- integración externa;
- criterio de aceptación;
- comportamiento ante error o caso borde crítico;
- impacto MCP/IA cuando el cambio toca operación asistida por agentes.

## Relación Con Otros Artefactos

- `faltantes`: registra preguntas bloqueantes y no bloqueantes.
- `prd`: absorbe decisiones estables de producto.
- `PROJECT_CONTEXT`: conserva lenguaje ubicuo y términos canónicos del dominio.
- `arquitectura` y técnicos: absorben contratos, datos y restricciones.
- `backlog`: sólo recibe slices con criterios claros.
- `changes`: conserva trazabilidad de pedidos de cliente.
- `MANIFEST`: registra estado de procesamiento cuando cambia un artefacto canónico.
- `DECISIONS`: registra sólo decisiones durables con tradeoff real, costo de reversa o contexto no obvio.
- `docs/product/out-of-scope.md`: registra rechazos durables o diferimientos que podrían reaparecer.

## Lenguaje Ubicuo

- Detectar términos ambiguos o usados de distintas maneras por cliente, dev y agentes.
- Si el término ya existe en `PROJECT_CONTEXT.md`, usarlo como canónico.
- Si hay conflicto de términos, preguntar o proponer un término canónico antes de generar backlog.
- Actualizar el lenguaje del proyecto sólo cuando el término esté consolidado; no crear glosarios por cada palabra menor.

## Decisiones Mínimas

Registrar en `DECISIONS.md` sólo cuando:

- la decisión sea difícil de revertir;
- haya varias opciones razonables con tradeoffs;
- el motivo no sería obvio para un agente futuro;
- afecte datos, permisos, arquitectura, MCP, UX crítica o compromiso de cliente.

No crear ADRs para decisiones obvias, reversibles o puramente estéticas.
