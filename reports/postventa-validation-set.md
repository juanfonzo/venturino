# Set de Validación Postventa

Generado: 2026-06-04.

Fuente base: `data/postventa_match_analysis.json`, corrida sobre MongoDB `algorym.productos`.

## Objetivo

Definir una muestra etiquetada de productos difíciles para iterar el algoritmo de benchmark Postventa sin degradar precisión. El set no busca aumentar cobertura a cualquier costo: prioriza evitar comparables falsos en familias técnicas, aceites por volumen, ISG, correas y repuestos con part number implícito.

Archivo consumible por scripts: `data/postventa_validation_set.json`.

## Resumen

- Total de casos: 28.
- Familias cubiertas: ACEITE, REFRIGERANTE, BATERIA, ISG, CUCHILLA, CORREA, PUNZON, CINCEL, FILTRO, INYECCION, NAVAJA y HONDA.
- Casos positivos esperados: 2.
- Casos que deben quedar sin comparable o baja confianza: 26.
- Casos con riesgo de falso positivo actual: Cool-Gard 10L, Puntón Cuchilla y Filtro de Combustible.

## Criterios de Etiquetado

| Etiqueta | Uso esperado |
|---|---|
| `valid_comparable` | Debe matchear si el candidato ML conserva familia técnica y atributos clave. |
| `no_comparable` | Debe quedar fuera del benchmark comercial con datos actuales. |
| `requires_unit_normalization` | No debe producir brecha accionable sin normalizar litros, capacidad o empaque. |
| `ambiguous_requires_part_number` | No debe ser accionable sin código, medida, modelo o part number. |
| `reject_generic_family_match` | Debe evitar matches por familia amplia o marca compartida. |
| `market_absent` | No hay evidencia ML suficiente aunque el producto sea identificable. |

## Casos Positivos A Preservar

| ID | Producto | Esperado | Evidencia |
|---|---|---|---|
| PV-VAL-005 | Batería John Deere StrongBox 12 V 110 Ah | Comparable | ML `MLA869234580`, formato `12x110`. |
| PV-VAL-017 | Punton Cosechadora Forjado Draper John Deere | Comparable | ML `MLA1123219059` y `MLA1128435570`. |

## Casos Que No Deben Forzarse

| Familia | Casos | Regla de protección |
|---|---:|---|
| ACEITE / REFRIGERANTE | 4 | No comparar por precio total si difieren litros o línea de producto. |
| ISG | 7 | Bloquear token genérico `llave`; no son llaves físicas comparables. |
| CORREA / DRAPER | 3 | Exigir Draper/Belting o part number; no usar correas genéricas. |
| CINCEL | 3 | La medida 10mm/16mm/22mm es atributo obligatorio. |
| FILTRO / INYECCION | 3 | Requieren part number o modelo compatible antes de ser accionables. |
| HONDA | 3 | Exigir modelo exacto o equivalencia explícita. |
| NAVAJA | 1 | No confundir con cuchillo, multiuso o llavero genérico. |

## Lectura Analítica

- El benchmark tiene que distinguir “sin mercado comparable” de “producto caro/barato”. Mezclar esos estados haría que Venturino tome decisiones comerciales con evidencia débil.
- Los fluidos son la zona más sensible: Hy-Gard 20L y Cool-Gard 10L no pueden compararse contra publicaciones ML de 4L por precio final. Primero hay que extraer litros y calcular precio por litro.
- ISG debe tratarse como familia separada y protegida. El token `llave` es una trampa semántica porque en ML suele significar llave física, llave de contacto o llavero.
- Repuestos técnicos caros, como inyector, boquillas y filtros, necesitan part number o compatibilidad de modelo. En ausencia de eso, el algoritmo debería bajar a `baja confianza` o `sin comparable`.

## Estado Automatizado

Comandos disponibles:

- `npm run analysis:postventa-validation-set`: genera `reports/postventa-validation-results.md` y `data/postventa_validation_results.json`.
- `npm run test:postventa-validation-set`: ejecuta los mismos gates en modo CI.

Última corrida validada:

- Gates: 5/5 OK.
- Positivos correctos: 2/2.
- Falsos positivos accionables: 0.
- Warning no bloqueante: `PV-VAL-018` queda en `baja confianza` con candidatos rechazados presentes sólo como evidencia no accionable.

## Próximo Uso Recomendado

1. Medir por separado:
   - recall de los casos `valid_comparable`;
   - precision guardrail de los casos que deben quedar `sin comparable` o `baja confianza`;
   - falsos positivos accionables.
2. Iterar primero reglas de protección:
   - extracción de litros y precio por litro;
   - bloqueo ISG por familia;
   - exigencia de modelo exacto Honda;
   - exigencia de medida o part number en repuestos técnicos.
3. Recién después buscar aumentar cobertura en familias técnicas.
