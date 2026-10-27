# Feature: Matching Postventa Persistido

Tipo: AFK
Estado: implementado
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: no bloqueado en código; requiere una corrida destino para validar datos actuales

## Valor De Negocio

Convertir el algoritmo v0 calibrado en una capacidad backend reproducible, auditable y usable por la UI, el PDF y futuros agentes.

## Qué Construir

Migrar la lógica de `scripts/analyzePostventaMatches.js` a un servicio reutilizable, ejecutar análisis sobre productos activos y persistir resultados por corrida.

## Dependencias

- Datos: `PostventaProduct` activo y snapshots.
- Backend: Prisma y servicio `lib/postventa/matching.ts`.
- Frontend: consumirá resultados persistidos.
- Permisos: ejecución interna autenticada.
- MCP/IA: contrato-candidato.
- Otros módulos: reporte PDF y UI dependen de este slice.

## Impacto Transversal

- Áreas afectadas: servicios de dominio, APIs internas, reportes.
- Riesgos: divergencia entre script de calibración y servicio productivo.
- Ajustes futuros a registrar: versionado de algoritmo y cambios de umbral.

## Criterios De Aceptación

- [x] El algoritmo productivo replica criterios documentados en `docs/technical/postventa-ml.md`.
- [x] Se persiste `PostventaAnalysisRun`.
- [x] Se persiste un `PostventaProductAnalysis` por producto Venturino activo.
- [x] Se persisten hasta 20 candidatos por producto.
- [x] La mediana se calcula con candidatos aceptados.
- [x] Productos ML inactivos no participan.
- [x] La banda estándar es `0.4`.
- [x] El algoritmo queda versionado como `postventa-v0`.
- [x] Hay benchmark y set de validación para normalización, tipos, precio fuera de banda, score y estados.

## Definition Of Ready

- [x] Criterios de aceptación claros.
- [x] Refinamiento aplicado o vía rápida justificada.
- [x] Modelo de datos o impacto DB definido.
- [x] Permisos definidos o marcado no aplica.
- [x] Impacto IA-first evaluado.
- [x] Estado MCP definido: `contrato-candidato`.
- [x] Tests esperados definidos.

## Tareas Técnicas

- [x] Extraer normalización y scoring desde el script de análisis.
- [x] Crear tipos TypeScript del dominio postventa.
- [x] Implementar servicio `runPostventaAnalysis`.
- [x] Implementar persistencia de corrida, análisis y candidatos con estado `running/success/failed`.
- [x] Crear endpoint interno `POST /api/postventa/analyze`.
- [x] Agregar script npm `analysis:postventa-persist`.
- [x] Mantener el script exploratorio como herramienta de calibración.
- [x] Agregar benchmark y set de validación del algoritmo.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_resumen_analisis`, `postventa_detalle_producto`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no aplica
- Motivo si no aplica: herramienta MCP se diseña, no se implementa en este slice.

## Definition Of Done

- [x] Implementado.
- [x] Validado contra fixtures, benchmark y set de regresiones; repetir contra cada nueva corrida si cambia el origen.
- [x] Tests/build/lint ejecutados o justificados.
- [x] Estados UX cubiertos por la sección `/postventa` consumidora.
- [x] MCP registrado como contrato-candidato.
- [x] `docs/technical/mcp-coverage-map.md` actualizado.
- [x] Documentación y manifest actualizados.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md`.

## Verificación

- Nivel de verificación esperado: 2
- Navegador requerido: no.
- [x] Ejecutar benchmark y set de validación.
- [ ] Ejecutar análisis contra los datos de la próxima corrida destino.
- [x] Comparar conteos contra reporte de calibración cuando los datos son equivalentes.

## Entorno

- Variables requeridas: `DATABASE_URL`
- Credenciales requeridas: Postgres dev/prod
- Fallback permitido: sí, tests con fixtures.
- Estado de entorno: servicio operativo; el resultado depende de la última importación persistida.
