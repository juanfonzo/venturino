# 01_BUSINESS_CONTEXT.md

> Estado: contexto comercial inicial del MVP. Parámetros como FX fijo, actualización mensual y alcance sólo CSV ya no deben usarse como especificación de implementación. Para el sistema vigente consultar `docs/ai/PROJECT_CONTEXT.md` y `docs/technical/arquitectura.md`.

## Cliente
- Ricardo Venturino S.A. (concesionario John Deere). Necesita mejorar decisiones comerciales con información de mercado.

## Problemas que resuelve el MVP
- Dispersión de precios y formatos (ARS/USD, miles/decimales, “Consultar”).
- Dificultad para comparar rápido (marca/modelo/año/hp/estado/ubicación).
- Falta de una referencia (ACARA) integrada al análisis de publicaciones.
- Necesidad de detectar oportunidades de compra (comprar bien para vender con margen).

## Objetivo del MVP (ultra liviano)
- Entregar una app web que, a partir de CSVs, permita:
  - Filtrar y explorar publicaciones de tractores.
  - Construir comparables y percentiles en USD.
  - Vincular (manual) modelos del mercado con ítems ACARA para ver brechas.
  - Calcular precio máximo sugerido de compra con margen 15%.
  - Ver calidad del dato y distribución por provincias.

## Parámetros del negocio
- FX fijo: 1500 ARS/USD.
- Margen objetivo: 15%.
- Estado: fuente de verdad = `condicion` (Nuevo/Usado).
- Actualización: mensual (reemplazo del CSV).
