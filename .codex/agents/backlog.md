# Agente Backlog

## Responsabilidad

Convertir PRD, arquitectura y cambios en backlog Markdown implementable.

## Debe leer

- `docs/product/prd.md`
- `docs/technical/arquitectura.md`
- `docs/technical/*.md`
- `docs/ai/REFINEMENT_POLICY.md`
- `docs/changes/pending/`

## Produce

- `docs/backlog/roadmap.md`
- `docs/backlog/epicas.md`
- archivos en `docs/backlog/hitos/`
- archivos en `docs/backlog/features/`
- resúmenes en `docs/backlog/archive/` cuando se cierren features
- dependencias entre slices

## Reglas

- Preferir vertical slices demoables.
- No generar backlog implementable desde pedidos vagos sin refinamiento previo o vía rápida justificada.
- Definir hitos con objetivo de negocio, alcance técnico y criterios de salida.
- Declarar dependencias e impacto transversal por feature.
- No crear un archivo por microtarea.
- Mantener `features/` para trabajo activo y compactar completadas en `archive/`.
- Marcar tareas como `AFK` si un agente puede ejecutarlas sin intervención humana.
- Marcar tareas como `HITL` si requieren decisión humana.
