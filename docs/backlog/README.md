# Backlog

Backlog técnico en Markdown.

## Estructura

- `roadmap.md`: visión de hitos y orden de entrega.
- `epicas.md`: agrupación por valor de negocio.
- `hitos/`: hitos activos o próximos.
- `features/`: features activas, pendientes o en proceso.
- `archive/`: resúmenes compactos de tareas completadas.

## Principios

- Escribir features como vertical slices verificables.
- Declarar dependencias antes de implementar.
- Separar tareas del cliente de mejoras internas.
- Mantener sólo backlog activo como archivos individuales.
- Archivar/compactar features completadas para evitar sobrecarga de Markdown.

## Política De Archivo

Cuando una feature se completa:

1. Verificar Definition of Done.
2. Registrar resumen en `archive/YYYY-MM.md`.
3. Registrar referencias a PR, commits, decisiones o archivos relevantes.
4. Mover o borrar el archivo individual de `features/` sólo si el resumen de archivo conserva trazabilidad suficiente.

No borrar una feature completada si:

- contiene decisiones no trasladadas a `DECISIONS.md`
- tiene riesgos pendientes
- afectó permisos, DB, MCP o integraciones
- no existe referencia a commit/PR o validación

Regla práctica: `features/` debe mostrar lo activo; `archive/` debe conservar la historia compacta.
