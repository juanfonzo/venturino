# Épicas

## Épica: Postventa Venturino Vs MercadoLibre

Objetivo:

Construir el módulo de análisis de artículos postventa y accesorios contra publicaciones activas de MercadoLibre.

Valor para el negocio:

Venturino podrá identificar si sus artículos están por encima o por debajo de referencias comparables de ML, revisar candidatos sugeridos y compartir un reporte PDF por producto.

Features:

- [ ] `postventa-01-ingesta-postgres`: importar productos desde Mongo a PostgreSQL con trazabilidad.
- [ ] `postventa-02-matching-persistido`: ejecutar y persistir el algoritmo v0.
- [ ] `postventa-03-ui-analisis`: crear sección web `/postventa`.
- [ ] `postventa-04-reporte-pdf`: generar reporte PDF postventa.
- [ ] `postventa-05-mcp-contratos`: dejar capacidades MCP como contrato-candidato o implementarlas.

Riesgos:

- Los datos disponibles no incluyen atributos técnicos más allá de nombre, precio, URL, origen y fechas.
- No todos los productos tendrán comparable real en ML activo.
- La banda fija `±40%` puede excluir comparables válidos en casos puntuales, pero se mantiene para el reporte estándar.
- La revisión manual de matches queda fuera de alcance v0.
