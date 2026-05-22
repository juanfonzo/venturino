# Feature: Matching Postventa Persistido

Tipo: AFK
Estado: en-proceso
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: validación manual en producción después de `pipeline:postventa`

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
- [ ] Hay tests unitarios para normalización, tipos, precio fuera de banda, score y estados.

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
- [ ] Agregar tests del algoritmo.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_resumen_analisis`, `postventa_detalle_producto`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no aplica
- Motivo si no aplica: herramienta MCP se diseña, no se implementa en este slice.

## Definition Of Done

- [x] Implementado.
- [ ] Validado en producción.
- [x] Tests/build/lint ejecutados o justificados.
- [ ] Estados UX cubiertos si aplica.
- [ ] MCP/skills del sistema actualizados, registrados como contrato-candidato, bloqueados o marcado no aplica.
- [ ] `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- [ ] Documentación y manifest actualizados si aplica.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md`.

## Verificación

- Nivel de verificación esperado: 2
- Navegador requerido: no.
- [ ] Ejecutar tests unitarios.
- [ ] Ejecutar análisis contra datos productivos.
- [ ] Comparar conteos contra reporte de calibración cuando los datos sean equivalentes.

## Entorno

- Variables requeridas: `DATABASE_URL`
- Credenciales requeridas: Postgres dev/prod
- Fallback permitido: sí, tests con fixtures.
- Estado de entorno: pendiente.
