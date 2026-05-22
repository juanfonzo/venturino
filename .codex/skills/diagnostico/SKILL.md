---
name: diagnostico
description: Aplica un loop disciplinado para bugs, regresiones y problemas de performance: reproducir, minimizar, hipotetizar, instrumentar, corregir y testear. Use when el usuario reporte fallas, errores, comportamiento roto o lentitud.
---

# Diagnóstico

## Workflow

1. Leer `docs/ai/CODE_CONTEXT_POLICY.md`.
2. Construir feedback loop reproducible.
3. Confirmar que reproduce el problema reportado.
4. Revisar contexto de código proporcional al riesgo antes de modificar.
5. Formular 3 a 5 hipótesis falsables.
6. Probar una variable por vez.
7. Corregir con el mínimo cambio.
8. Agregar test de regresión cuando haya seam correcto.
9. Limpiar instrumentación temporal.

## Reglas

- No arreglar por intuición si el bug es no trivial.
- No modificar código hasta revisar flujo, callers o contratos relacionados con el síntoma.
- Si no hay loop reproducible, pedir logs, HAR, video, fixture o permiso para instrumentar.
- Registrar causa real y verificación final.
