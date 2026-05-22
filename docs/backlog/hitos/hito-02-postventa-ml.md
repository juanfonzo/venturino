# Hito 02 - Postventa Venturino vs MercadoLibre

Estado: pendiente

## Objetivo De Negocio

Permitir que Venturino analice artículos de postventa y accesorios contra publicaciones activas de MercadoLibre, con trazabilidad histórica, comparación por producto, candidatos sugeridos y reporte PDF.

## Criterio De Salida

- Productos Venturino y ML importados desde Mongo `algorym.productos` hacia PostgreSQL.
- Productos activos definidos por última extracción de cada origen.
- ML con trazabilidad histórica y publicaciones inactivas excluidas del análisis vigente.
- Algoritmo v0 persistido y reproducible desde backend.
- Sección `/postventa` disponible con resumen, filtros, tabla paginada y detalle de candidatos.
- Reporte PDF postventa disponible con banda estándar `±40%`.
- Capacidades MCP marcadas como `contrato-candidato` o implementadas.

## Alcance Incluido

- Ingesta Mongo -> Postgres.
- Modelo Prisma y migración.
- Servicio de matching postventa v0.
- Persistencia de análisis y candidatos sugeridos.
- UI web operativa.
- Reporte PDF.
- Contratos MCP candidatos.

## Fuera De Alcance Inicial

- Persistencia de revisión manual de matches.
- Overrides manuales por producto.
- Uso de categorías ML como criterio de matching principal.
- Entrenamiento ML/IA para matching semántico.
- Comparación contra fuentes distintas de MercadoLibre.

## Dependencias

- `DATABASE_URL` disponible.
- `MONGODB_URI` disponible.
- Acceso a Mongo `algorym.productos`.
- Migración Prisma aprobada.

## Riesgos

- Algunos productos no tendrán comparable real por falta de datos ML o por banda de precio.
- Cambios en nombres de productos alteran candidatos, como fue requerido.
- El algoritmo v0 debe versionarse para auditar reportes anteriores.
- Si se agregan overrides manuales luego, deberán convivir con recalculo automático.
