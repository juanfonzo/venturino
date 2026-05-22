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

