# Simulación de Reporte PDF Postventa

Generado: 2026-06-04.

Fuente: MongoDB `algorym.productos`, consulta read-only.

## Objetivo

Simular la información que debería contener el futuro PDF de Postventa antes de implementar la UI y la exportación final. La corrida no escribió en Mongo ni en Postgres.

## Foto de Datos

- Venturino activo: 2026-05-30.
- ML activo: 2026-05-31.
- Documentos Mongo leídos: 8.497.
- Productos Venturino activos: 127.
- Productos ML activos normalizados: 4.111.
- Productos Venturino con precio: 127.
- Productos ML con precio: 4.108.

## Parámetros Simulados

- Algoritmo base: `postventa-v0`.
- Top candidatos por producto: 20.
- Banda de precio: +/-40%.
- Score mínimo: 20.
- Escenarios evaluados para `similar a ML`: +/-5% y +/-10%.

## Resultado Productivo Con Umbral Similar +/-10%

| Estado | Cantidad |
|---|---:|
| Sin comparable | 57 |
| Similar a ML | 34 |
| Venturino más caro que ML | 19 |
| Venturino más barato que ML | 12 |
| Baja confianza | 5 |

KPIs:

- Productos con comparable: 70 de 127, 55,1%.
- Productos sin comparable: 57 de 127, 44,9%.
- Brechas accionables: 31 productos.
- Candidatos usados totales: 986.
- Baja confianza: 5 productos, 3,9%.

## Escenario Similar +/-5%

| Estado | Cantidad |
|---|---:|
| Sin comparable | 63 |
| Similar a ML | 19 |
| Venturino más caro que ML | 29 |
| Venturino más barato que ML | 13 |
| Baja confianza | 3 |

Lectura: es un umbral estricto. Reduce ruido de diferencias mínimas, pero mantiene muchos productos en caro/barato aunque estén cerca de ML.

## Escenario Similar +/-10%

| Estado | Cantidad |
|---|---:|
| Sin comparable | 57 |
| Similar a ML | 34 |
| Venturino más caro que ML | 19 |
| Venturino más barato que ML | 12 |
| Baja confianza | 5 |

Lectura: es el umbral más útil para reporte ejecutivo inicial. Separa mejor alertas comerciales reales de diferencias chicas.

## Estructura Recomendada del PDF

1. Portada:
   - Fecha de corrida.
   - Fechas fuente Venturino y ML.
   - Versión de algoritmo.
   - Parámetros usados.

2. Resumen ejecutivo:
   - Total productos Venturino.
   - Productos con comparable.
   - Productos sin comparable.
   - Distribución por estado.
   - Alertas de baja confianza.

3. Tabla principal:
   - Producto Venturino.
   - Precio Venturino.
   - Estado.
   - Mediana ML.
   - Brecha porcentual.
   - Confianza.
   - Cantidad de candidatos.

4. Detalle por producto:
   - Top candidatos ML.
   - Precio ML.
   - Score.
   - Motivos del match.
   - Link de origen.

## Observaciones de Calidad

- El estado `similar a ML` debe existir antes de usar el PDF como herramienta comercial.
- Con +/-10%, 34 productos pasan a similar y el reporte queda menos ruidoso.
- `sin comparable` sigue alto: 57 productos. En muchos casos la exclusión viene por falta de evidencia ML equivalente, no sólo por precio.
- Los guardrails reducen falsos positivos accionables en fluidos, ISG, Honda, correas Draper y repuestos ambiguos.
- Los tipos con más señal son juguetes, herramientas, jarros, botellas, gorras y filtros.
- La mejora de diccionario `jarro/taza/mug` llevó JARRO a 6/6 comparables.
- La regla conservadora de batería por capacidad permitió comparar 110Ah contra `12x110`; 150Ah queda sin comparable por falta de evidencia ML.
- Los tipos con menor cobertura requieren evidencia adicional o reglas específicas: aceites por litros, ISG, correas, Honda, manómetros y algunos repuestos técnicos.
- La baja confianza debe mostrarse explícitamente y no mezclarse con caro/barato.

## Performance Observada

- Pares evaluados: 522.097.
- Tiempo total aproximado: 2,7 s.
- Tiempo de matching aproximado: 0,5 s.
- Memoria heap aproximada: 59 MB.

El volumen actual permite ejecutar análisis completo después de cada importación mensual sin riesgo de performance relevante.

## Recomendación

Usar `similar a ML` con umbral +/-10% para la primera versión del reporte y de la UI Postventa. Mantener `postventa-v0` como versión base, pero persistir la versión y los parámetros en cada corrida para poder comparar cambios de algoritmo.

Estado de implementación: umbral +/-10%, fallback de IDs ML desde URL, diccionario `jarro/taza/mug`, comparación de batería por Ah, guardrails técnicos y validation set automatizado incorporados al algoritmo/pipeline el 2026-06-04.
