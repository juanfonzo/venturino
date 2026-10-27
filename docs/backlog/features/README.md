# Features

Cada archivo representa una feature activa, pendiente o en proceso.

Una vez completada y validada, la feature debe resumirse en `docs/backlog/archive/YYYY-MM.md`. Si el resumen conserva trazabilidad suficiente, el archivo individual puede moverse o eliminarse para evitar sobrecarga.

Formato sugerido:

```md
# Feature: Nombre

Tipo: AFK / HITL
Estado: pendiente / en-proceso / completada / completada-en-demo / bloqueada-por-entorno
Hito:
Bloqueado por:

## Valor De Negocio

## Qué Construir

## Dependencias
- Datos:
- Backend:
- Frontend:
- Permisos:
- MCP/IA:
- Otros módulos:

## Impacto Transversal
- Áreas afectadas:
- Riesgos:
- Ajustes futuros a registrar:

## Criterios de aceptación
- [ ]

## Definition Of Ready
- [ ] Criterios de aceptación claros.
- [ ] Refinamiento aplicado o vía rápida justificada.
- [ ] Modelo de datos o impacto DB definido.
- [ ] Permisos definidos o marcado no aplica.
- [ ] Impacto IA-first evaluado.
- [ ] Estado MCP definido: `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`.
- [ ] Tests esperados definidos.

## Tareas Técnicas
- [ ]

## MCP/IA
- Estado MCP: implementado / contrato-candidato / no-aplica / bloqueado
- Herramientas afectadas:
- Coverage map actualizado: sí / no / justificar
- Skills del sistema destino afectados:
- Motivo si no aplica:

## Definition Of Done
- [ ] Implementado.
- [ ] Validado.
- [ ] Tests/build/lint ejecutados o justificados.
- [ ] Estados UX cubiertos si aplica.
- [ ] MCP/skills del sistema actualizados, registrados como contrato-candidato, bloqueados o marcado no aplica.
- [ ] `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- [ ] Documentación y manifest actualizados si aplica.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md`.

## Verificación
- Nivel de verificación esperado: 0 / 1 / 2 / 3 / 4
- Navegador requerido: sí / no / justificar
- [ ]
```
