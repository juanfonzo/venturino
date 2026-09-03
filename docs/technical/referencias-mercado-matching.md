# Guía y registro de matching de referencias de mercado

Estado: vigente

Última actualización: 2026-09-03

## Propósito

Este documento es el registro canónico de casos ya investigados para la API de referencias de mercado de Padawanway. Sirve para que una persona o agente futuro no vuelva a analizar nomenclaturas resueltas, conserve los límites que evitan falsos positivos y sepa cómo incorporar evidencia nueva.

No reemplaza la auditoría: una nomenclatura parecida no es equivalente por defecto. La implementación y los tests son la fuente de verdad ejecutable; este registro explica el porqué de cada regla.

## Límites que no se deben relajar

- No eliminar letras ni sufijos de modelo de forma global. `D`, `E`, `H`, `SE` u otros pueden identificar líneas incompatibles.
- Un alias debe tener categoría y marca explícitas, salvo que la evidencia demuestre que es seguro fuera de ese alcance.
- La referencia directa sólo publica candidatos cuyo modelo canónico es exactamente igual al modelo solicitado.
- La búsqueda ampliada puede recuperar familias relacionadas, pero el ranking vuelve a validar la pertenencia antes de publicar el resultado.
- Siempre se mantienen los filtros de publicaciones activas, usadas, externas, con precio USD válido, categoría y, cuando se informa, marca.
- El conjunto previo al ranking continúa limitado a 5.000 filas.

## Casos confirmados

| Categoría | Marca | Entrada o variante confirmada | Modelo canónico | Mecanismo |
|---|---|---|---|---|
| Tractores | John Deere | `5075ED` | `5075E` | Alias exacto. |
| Tractores | John Deere | `5065ES` | `5065E` | Alias exacto. |
| Tractores | John Deere | `5045DS` | `5045D` | Alias exacto. |
| Tractores | New Holland | `T8295 270` | `T8295` / display `T8.295` | Alias exacto; la potencia no forma parte del modelo. |
| Cosechadoras | John Deere | `S77025`, `S77030`, `S77035`, `S77040`, `S77045`, `S77050` | `S770` | La medida de plataforma se conserva como configuración comercial. |
| Cosechadoras | John Deere | `S770SD40D` | `S770` | Alias exacto aprobado para la consulta auditada; no habilita una regla genérica para sufijos `D`. |
| Pulverizadoras | Metalfor | `Multiple 3200 SE`, `M 3200`, `M 3200SE` | `MULTIPLE3200` / display `Múltiple 3200` | Alias exactos dentro de la marca y categoría. |
| Pulverizadoras | Metalfor | Título con prefijo `Automotriz`, por ejemplo `Pulverizadora Automotriz Metalfor M 3200SE` | `MULTIPLE3200` | `Automotriz` se descarta sólo al inferir modelos de títulos de pulverizadoras. |
| Pulverizadoras | PLA | `MAP 3 3300 H` | `MAP33300` / display `MAP 3 3300` | Alias exacto dentro de la marca y categoría. |
| Pulverizadoras | PLA | `MAP 3 3300` | `MAP33300` | Normalización de espacios del modelo base. |

### Familias de búsqueda ampliada confirmadas

| Marca | Familia solicitada | Recuperación permitida | Protección posterior |
|---|---|---|---|
| John Deere | Forma corta `nL`, por ejemplo `5E`, `6J` o `6R` | `modeloNorm` que comienza con `n` y termina con `L`. | `candidateBelongsToFamily` vuelve a exigir la misma serie antes de ordenar o devolver resultados. |
| PLA | `MAP3` | Modelos que empiezan con `MAP3`. | Ranking por familia ya existente. |
| New Holland | `Tn` y `CRn` | Modelos de la misma serie. | Ranking por familia ya existente. |

La recuperación estructural de John Deere existe porque una búsqueda de `6J` no contiene el texto de modelos largos como `6145J`. No debe reemplazarse por una búsqueda global por el dígito `6` o por fuzzy textual.

## Consultas reales con cero resultado resueltas el 2026-09-03

Los conteos siguientes son evidencia del snapshot local `20260903T140008Z`; la cantidad puede variar en futuras extracciones. El script de verificación exige al menos una referencia, no una cantidad fija.

| Auditorías | Modo | Entrada | Causa encontrada | Resultado en snapshot |
|---|---|---|---|---:|
| 3, 7 | Ampliado | John Deere `6J`, 2016 | La familia corta no recuperaba modelos `6…J` para que el ranking los evaluara. | 38 |
| 31, 40, 41 | Directo | Metalfor `Multiple 3200 SE`, 2005 | Variante `SE` y títulos con `Automotriz` impedían la identidad canónica. | 25 |
| 43, 45, 46 | Directo | PLA `MAP 3 3300 H`, 2016 | El sufijo `H` no estaba cubierto por la equivalencia comprobada. | 6 |
| 52 | Directo | John Deere `S770SD40D`, 2021 | Configuración embebida no llegaba al modelo base. | 9 |

## Regresiones obligatorias

- `npm run test:market-reference` cubre los aliases, inferencia desde título, familias y guardrails negativos.
- `npm run verify:market-reference-zero-results` reproduce en modo lectura los cuatro grupos de auditoría anteriores contra PostgreSQL local.
- `npm run pipeline:backfill-identity` es simulación; permite medir el impacto de los aliases sobre filas históricas. Sólo usar `node scripts/backfill-machine-identity.js --apply` después de revisar el informe en el entorno destino.

Las negativas mínimas que deben continuar pasando son:

- `John Deere 6100D` y `6100E` permanecen como modelos distintos.
- `M 3200 SE` de PLA no se unifica con el modelo de Metalfor.
- Una familia John Deere `6J` no devuelve `6125E` como relacionada.

## Procedimiento para un caso nuevo

1. Extraer de `MarketReferenceQuery` los registros con `resultCount = 0`, agrupados por categoría, marca, modelo y modo.
2. Normalizar el input mediante `parseDirectReferenceInput` o `parseExpandedSearchInput` y buscar en `Listing` sólo candidatos activos, usados, externos y con precio USD válido.
3. Confirmar que la discrepancia es de nomenclatura o recuperación, no de cobertura, categoría, marca, condición o precio.
4. Reunir evidencia de compatibilidad. Si hay duda razonable de que el sufijo sea una variante distinta, no unificar.
5. Implementar la regla más específica posible en `lib/normalize/machineIdentity.ts` o, para una familia, en `lib/market-reference/matching.ts` y `service.ts`.
6. Agregar un caso positivo y al menos una regresión negativa a `scripts/test-market-reference-api.js`.
7. Ejecutar `npm run test:market-reference`, `npm run verify:market-reference-zero-results` cuando corresponda, `npx tsc --noEmit` y el backfill en simulación.
8. Registrar el caso en este documento, incluyendo la auditoría, el scope, la causa, la evidencia y el riesgo descartado. Incrementar la versión del algoritmo si cambia el comportamiento observado por auditoría.

## Referencias de código y trazabilidad

- Normalización y aliases: `lib/normalize/machineIdentity.ts`.
- Recuperación y ranking: `lib/market-reference/matching.ts` y `lib/market-reference/service.ts`.
- Regresiones: `scripts/test-market-reference-api.js`.
- Verificación de auditorías: `scripts/verify-market-reference-zero-results.js`.
- Decisión durable: `docs/ai/DECISIONS.md`, entrada 2026-09-03.
- Cambio procesado: `docs/changes/processed/2026-07-17-referencias-mercado-api.md`.
