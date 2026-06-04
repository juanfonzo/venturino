---
name: diagnostico
description: "Aplica un loop disciplinado para bugs, regresiones y problemas de performance: reproducir, minimizar, hipotetizar, instrumentar, corregir y testear. Use when el usuario reporte fallas, errores, comportamiento roto o lentitud."
---

# Diagnóstico

## Workflow

1. Leer `docs/ai/CODE_CONTEXT_POLICY.md`.
2. Leer `docs/ai/PROJECT_GRAPH_POLICY.md` si el bug ocurre en repo grande o el impacto es incierto.
3. Construir feedback loop reproducible con comando, ruta, datos o pasos de usuario.
4. Confirmar que reproduce el problema reportado.
5. Revisar contexto de código proporcional al riesgo antes de modificar.
6. Formular 3 a 5 hipótesis falsables, ordenadas por probabilidad e impacto.
7. Para cada hipótesis, definir qué evidencia la confirmaría o descartaría.
8. Probar una variable por vez.
9. Corregir con el mínimo cambio.
10. Agregar test de regresión cuando haya seam correcto.
11. Re-ejecutar el loop original.
12. Limpiar instrumentación temporal.

## Reglas

- No arreglar por intuición si el bug es no trivial.
- No modificar código hasta revisar flujo, callers o contratos relacionados con el síntoma.
- En repos grandes, usar CodeGraph para orientar relaciones, pero confirmar siempre en codigo real.
- Si no hay loop reproducible, pedir logs, HAR, video, fixture o permiso para instrumentar.
- Si se instrumenta, usar prefijo temporal tipo `[DEBUG-diagnostico]` y eliminarlo antes de cerrar.
- Para performance, medir baseline antes de cambiar y comparar después.
- No agregar test frágil si no hay seam correcto; documentar el riesgo y el seam recomendado.
- Registrar causa real y verificación final.
