# Decisions

Registrar decisiones técnicas o de producto que un agente futuro no debería reabrir sin motivo.

## Formato

```md
## YYYY-MM-DD - Título

Estado: propuesta / aceptada / reemplazada

Contexto:

Decisión:

Alternativas consideradas:

Consecuencias:
```

## 2026-05-22 - Algoritmo v0 para matching postventa

Estado: aceptada

Contexto:

Venturino necesita comparar artículos de postventa y accesorios contra publicaciones activas de MercadoLibre. Los datos disponibles en Mongo `algorym.productos` son limitados: nombre, precio, moneda, URL, origen, ids estables y fechas.

Decisión:

Tomar `scripts/analyzePostventaMatches.js` como base del algoritmo v0 para diseñar arquitectura y backlog. El algoritmo usa productos activos de la última extracción, banda de precio `±40%`, top 20 candidatos, tipos inferidos por nombre, score semántico y comparación contra mediana de candidatos aceptados.

Alternativas consideradas:

- Seguir refinando reglas por los dos casos restantes de baja confianza.
- Persistir revisión manual de matches desde el inicio.
- Usar categorías ML como criterio fuerte.

Consecuencias:

- No se implementan overrides manuales en el hito inicial.
- El matching se recalcula cuando cambia el nombre de un producto aunque el id estable se mantenga.
- Los reportes deben guardar versión de algoritmo para auditoría.
- Si negocio pide revisión manual persistente, será una feature posterior.
