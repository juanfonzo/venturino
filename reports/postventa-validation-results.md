# Resultado Validation Set Postventa

Generado: 2026-06-05T16:06:10.933Z
Validation set: postventa-validation-set-v1
Análisis base: 2026-06-05T16:04:14.016Z

## KPIs

- Casos evaluados: 29
- Pass: 28
- Warnings: 1
- Fail: 0
- Missing: 0
- Positivos correctos: 3/3
- Falsos positivos accionables: 0

## Gates

| Gate | Estado | Evidencia |
|---|---|---|
| all_items_present | OK | Casos ausentes en análisis: 0 |
| positive_recall | OK | Positivos correctos 3/3 |
| no_actionable_false_positives | OK | Falsos positivos accionables: 0 |
| no_rejected_ml_actionable | OK | Candidatos ML rechazados en estados accionables: 0 |
| no_strict_failures | OK | Fallos estrictos: 0 |

## Casos

| Caso | Familia | Esperado | Actual | Resultado | Mejor candidato | Mensaje |
|---|---|---|---|---|---|---|
| PV-VAL-001 | ACEITE | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-002 | ACEITE | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-003 | ACEITE | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-004 | REFRIGERANTE | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-005 | BATERIA | comparable | Venturino más caro que ML | pass | Bateria Willard Ub920i 12x110 John Deere Vial Tractores | OK |
| PV-VAL-006 | BATERIA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-007 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-008 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-009 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-010 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-011 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-012 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-013 | ISG | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-014 | CUCHILLA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-015 | CORREA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-016 | CORREA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-017 | PUNZON | comparable | similar a ML | pass | Punton Cosechadora Jhon Deere Triple Forjado | OK |
| PV-VAL-018 | CUCHILLA | baja confianza | baja confianza | warning | Cuchillas Para Tractor John Deere 42 | Candidato ML rechazado presente sólo en estado no accionable. |
| PV-VAL-019 | CINCEL | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-020 | CINCEL | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-021 | CINCEL | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-022 | FILTRO | baja confianza | baja confianza | pass | Filtro De Combustible John Deere Re525523 Agrícola | OK |
| PV-VAL-023 | INYECCION | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-024 | INYECCION | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-025 | NAVAJA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-026 | HONDA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-027 | HONDA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-028 | HONDA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-029 | HERRAMIENTA | comparable | Venturino más caro que ML | pass | Caja De Herramientas John Deere, 18 Piezas | OK |
