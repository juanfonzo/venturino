# Out Of Scope Policy

## Objetivo

Evitar reabrir una y otra vez pedidos rechazados o fuera de alcance, sin llenar el kit de burocracia.

## Regla

Registrar fuera de alcance solo cuando la decision sea durable y pueda repetirse.

No registrar rechazos triviales, preferencias menores o decisiones temporales.

## Cuándo Registrar

Registrar en `docs/product/out-of-scope.md` cuando:

- una funcionalidad fue descartada por estrategia, contrato o arquitectura;
- el cliente o equipo podria volver a pedirla;
- la razon necesita memoria para futuros agentes;
- implementarla implicaria tradeoffs o deuda relevante.

## Formato

```md
## Concepto

Decision: fuera de alcance / diferido / reemplazado por otra solucion

Motivo:

Impacto si se reabre:

Pedidos relacionados:
- fecha / origen / referencia
```

## Uso En Refinamiento

Antes de aceptar una feature parecida a algo descartado, revisar `docs/product/out-of-scope.md`.

Si el usuario decide reabrirla:

- actualizar la decision;
- registrar motivo del cambio;
- pasar por refinamiento normal antes de backlog.
