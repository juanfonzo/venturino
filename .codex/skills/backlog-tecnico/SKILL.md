---
name: backlog-tecnico
description: Convierte PRD, arquitectura y contratos en backlog Markdown con épicas, features y tareas técnicas implementables por vertical slices. Use when el usuario pida backlog, tareas para agentes, planificación de implementación o descomposición de trabajo.
---

# Backlog Técnico

## Workflow

1. Leer PRD, arquitectura y contratos.
2. Leer `docs/ai/MCP_FIRST_POLICY.md` y `docs/technical/mcp-coverage-map.md`.
3. Verificar que pedidos vagos hayan pasado por `refinamiento-backlog` o vía rápida justificada.
4. Identificar épicas por valor de negocio.
5. Definir hitos con objetivo de negocio y criterio de salida.
6. Dividir en vertical slices demoables.
7. Declarar dependencias e impacto transversal por slice.
8. Clasificar cada slice como `AFK` o `HITL`.
9. Escribir `docs/backlog/roadmap.md`, `docs/backlog/epicas.md`, `docs/backlog/hitos/` y archivos activos en `docs/backlog/features/`.

## Formato De Slice

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

## Criterios De Aceptación
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

## Entorno
- Variables requeridas:
- Credenciales requeridas:
- Fallback permitido: sí / no / justificar
- Estado de entorno: listo / bloqueado / demo-local
```

## Reglas

- Evitar tareas horizontales aisladas como "hacer backend".
- No convertir pedidos ambiguos en backlog implementable sin refinamiento.
- Cada slice debe ser verificable por sí mismo.
- No crear un archivo por microtarea; agrupar microtareas dentro de una feature.
- Mantener archivos individuales sólo para backlog activo.
- Al completar una feature, compactar trazabilidad en `docs/backlog/archive/YYYY-MM.md` antes de borrar o mover el archivo original.
- No borrar features completadas si contienen decisiones, riesgos o validaciones no trasladadas.
- Codex debe administrar limpieza del backlog: mantener `features/` sólo para trabajo activo o pendiente y archivar completadas con resumen suficiente.
- Usar `completada-en-demo` cuando se validó con fallback local y todavía falta DB/auth/integración real.
- Usar `bloqueada-por-entorno` cuando falta una variable, credencial, permiso o servicio necesario para validar.
- No cerrar una feature operativa sin estado MCP y coverage map actualizado o justificación explícita.
