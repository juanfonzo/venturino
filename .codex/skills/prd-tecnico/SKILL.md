---
name: prd-tecnico
description: Genera o refina un PRD técnico en Markdown a partir de brief, respuestas a faltantes y contexto del repo. Use when el usuario pida requerimientos, PRD, definición funcional o preparar el proyecto para arquitectura/backlog.
---

# PRD Técnico

## Workflow

1. Leer `docs/product/brief.md`, faltantes resueltos y contexto del proyecto.
2. Usar lenguaje de dominio consistente.
3. Escribir `docs/product/prd.md`.
4. Separar requisitos funcionales, no funcionales y fuera de alcance.
5. Definir criterios de aceptación verificables.
6. Asignar IDs estables a historias, requisitos, reglas y criterios: `US-1`, `FR-1`, `NFR-1`, `BR-1`, `AC-1`.
7. Vincular objetivos relevantes con métricas suficientes para validar valor, sin forzar burocracia.
8. Ejecutar chequeo de consistencia antes de cerrar el PRD.
9. Registrar puntos débiles, supuestos aceptados y validaciones sugeridas.

## Estructura

- problema
- solución propuesta
- usuarios y roles
- objetivos y métricas
- módulos
- historias de usuario con IDs
- requisitos funcionales con IDs y referencia a historias
- requisitos no funcionales
- reglas de negocio
- criterios de aceptación con referencia a requisitos
- fuera de alcance
- decisiones pendientes
- chequeo de consistencia
- notas de revisión

## Métricas Sin Burocracia

- Pedir métrica cuando el objetivo afecte alcance, prioridad, UX, operación, performance, adopción, seguridad o éxito comercial.
- Si no hay baseline o target real, usar `_TBD_` y registrarlo como punto débil.
- No inventar números específicos.
- Para proyectos greenfield, baseline `0` sólo si realmente no existe dato previo.
- No exigir métricas para microdecisiones de copy, color, spacing o implementación interna sin impacto de producto.

## Chequeo De Consistencia

Antes de cerrar el PRD, validar:

- Cada `US-*` tiene al menos un `FR-*`.
- Cada objetivo relevante tiene una métrica o `_TBD_` visible.
- Cada rol tiene permisos y restricciones definidos o marcado no aplica.
- Cada `FR-*` crítico tiene al menos un `AC-*`.
- Cada decisión pendiente indica si bloquea implementación.

Si algo falla y es bloqueante, volver a `docs/intake/faltantes.md`.

## Reglas

- No incluir rutas de archivos de implementación salvo que ya sean decisión aceptada.
- No cerrar requisitos con supuestos no validados si son bloqueantes.
- Preservar números, fechas, nombres propios y métricas entregadas por el usuario.
- No aceptar términos vagos como "rápido", "simple" o "mejorar seguimiento" sin convertirlos en comportamiento verificable o `_TBD_`.
