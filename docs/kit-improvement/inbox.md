# Inbox De Señales Del Kit

Mantener sólo señales activas: `pendiente`, `observando` o `backlog-interno`.

Los agentes ejecutores registran señales. El agente `refinamiento-kit` hace triage, decide y aplica o deriva.

## Formato

```md
## Señal: título corto

Fingerprint:
Estado: pendiente / observando / backlog-interno
Severidad percibida: baja / media / alta / crítica
Ocurrencias: 1

### Ocurrencias
- Fecha:
  Origen:
  Tipo: fricción / error / ambigüedad / bloqueo / mejora-posible
  Qué pasó:
  Evidencia:
  Impacto:

### Triage
- Decisión: pendiente / descartar / observar / promover / pedir-evidencia / fusionar / backlog-interno
- Motivo:
- Cambio aplicado:
- Archivos modificados:
```

## Señales Activas

## Señal: Validación de algoritmo con runtime duplicado

Fingerprint: testing.algorithm.duplicate-runtime-logic
Estado: observando
Severidad percibida: media
Ocurrencias: 1

### Ocurrencias
- Fecha: 2026-06-05
  Origen: revisión pre-subida del algoritmo Postventa
  Tipo: mejora-posible
  Qué pasó: el algoritmo productivo de matching está en `lib/postventa/matching.ts`, pero la calibración y los gates rápidos se apoyan en una copia JavaScript en `scripts/analyzePostventaMatches.js`.
  Evidencia: reglas como `inferProductTypes`, `getGuardrailRejection`, `isVehicleKeyOrSwitch` e `isToyLike` existen en ambos archivos y deben sincronizarse manualmente.
  Impacto: riesgo de validar una versión distinta a la que ejecuta la app si un cambio futuro toca sólo uno de los dos runtimes.

### Triage
- Decisión: observar
- Motivo: la ocurrencia quedó resuelta en el proyecto con runtime compartido; no alcanza todavía para promover una regla base del kit.
- Cambio aplicado: `scripts/analyzePostventaMatches.js` usa `lib/postventa/matching.ts` y la deuda interna fue cerrada.
- Archivos modificados: `scripts/register-ts.js`, `scripts/analyzePostventaMatches.js`, `docs/backlog-interno/mejoras.md`
