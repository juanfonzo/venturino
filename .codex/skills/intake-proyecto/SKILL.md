---
name: intake-proyecto
description: Convierte propuesta comercial, PDF normalizado, notas de Notion o texto inicial en artefactos de intake técnico para proyectos personalizados de Algorym. Use when el usuario inicia un proyecto, entrega una propuesta, presupuesto, PDF o contexto comercial inicial.
---

# Intake Proyecto

## Workflow

1. Leer `AGENTS.md`, `docs/ai/MANIFEST.md` e inputs pendientes en `input/`.
2. Separar hechos, supuestos e inferencias.
3. Crear o actualizar `docs/product/brief.md`.
4. Detectar faltantes bloqueantes y no bloqueantes.
5. Si hay faltantes bloqueantes, detenerse y pedir respuestas antes de cerrar PRD/backlog.
6. Actualizar `docs/ai/MANIFEST.md`.

## Salida Mínima

`docs/product/brief.md` debe incluir:

- objetivo del sistema
- cliente y contexto operativo
- áreas del negocio afectadas
- módulos mencionados
- usuarios y roles inferidos
- alcance inicial
- fuera de alcance explícito
- supuestos
- riesgos

## Reglas

- No transformar lenguaje comercial en features inventadas.
- Si el PDF existe, preferir una versión `.md` para trabajar.
- Si falta información crítica, derivar a skill `faltantes`.
- No continuar a backlog implementable si hay faltantes bloqueantes abiertos.
