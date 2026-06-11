# Resultado Validation Set Postventa

Generado: 2026-06-11T18:39:39.261Z
Validation set: postventa-validation-set-v1
Análisis base: 2026-06-11T18:38:28.646Z

## KPIs

- Casos evaluados: 34
- Pass: 33
- Warnings: 1
- Fail: 0
- Missing: 0
- Positivos correctos: 13/13
- Falsos positivos accionables: 0

## Gates

| Gate | Estado | Evidencia |
|---|---|---|
| all_items_present | OK | Casos ausentes en análisis: 0 |
| positive_recall | OK | Positivos correctos 13/13 |
| no_actionable_false_positives | OK | Falsos positivos accionables: 0 |
| no_rejected_ml_actionable | OK | Candidatos ML rechazados en estados accionables: 0 |
| no_strict_failures | OK | Fallos estrictos: 0 |

## Casos

| Caso | Familia | Esperado | Actual | Resultado | Mejor candidato | Mensaje |
|---|---|---|---|---|---|---|
| PV-VAL-001 | ACEITE | comparable | Venturino más barato que ML | pass | Aceite Plus 50 John Deere | OK |
| PV-VAL-002 | ACEITE | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-003 | ACEITE | comparable | Venturino más barato que ML | pass | Aceite Hidráulico Ajm69444 Hy-gard 20lt | OK |
| PV-VAL-004 | REFRIGERANTE | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-005 | BATERIA | comparable | Venturino más caro que ML | pass | Bateria Moura M100hi 12x110 Tractor New Holland Jhon Deere | OK |
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
| PV-VAL-022 | FILTRO | baja confianza | baja confianza | pass | Filtro De Combustible John Deere Re541922 | OK |
| PV-VAL-023 | INYECCION | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-024 | INYECCION | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-025 | NAVAJA | sin comparable | sin comparable | pass | - | OK |
| PV-VAL-026 | HONDA | comparable | similar a ML | pass | Generador Grupo Electrogeno Honda Ez3000cx 3 Kva Moron Ppi | OK |
| PV-VAL-027 | HONDA | comparable | similar a ML | pass | Generador Honda Naftero De Alta Potencia 6.5 Kva Ez6500cx... | OK |
| PV-VAL-028 | HONDA | comparable | Venturino más barato que ML | pass | Cortadora De Cesped Honda Hrx476c2 Autopropulsada | OK |
| PV-VAL-029 | HERRAMIENTA | comparable | Venturino más caro que ML | pass | Caja De Herramientas De Lujo John Deere De 18 Piezas,... | OK |
| PV-VAL-030 | HONDA | comparable | similar a ML | pass | Cortadora De Césped Honda Hrg466c1 - Pkeh 4,2 Hp | OK |
| PV-VAL-031 | HONDA | comparable | Venturino más caro que ML | pass | Motobomba Honda Wb20xt Drx Wb20xTDRx | OK |
| PV-VAL-032 | HONDA | comparable | similar a ML | pass | Motor de gasolina estacionario Honda Gx200 Qd 6.5 HP | OK |
| PV-VAL-033 | HONDA | comparable | similar a ML | pass | Motor Estacionario Honda Gp 200 5.5 Hp Eje Horizontal | OK |
| PV-VAL-034 | HONDA | comparable | similar a ML | pass | Mochila Fumigadora Honda Wjr 2525 Naftera 4 Tiempos 25cc | OK |
