# Política De Cierre Y Limpieza

## Objetivo

Evitar que el kit acumule archivos, estados pendientes o documentación obsoleta después de implementar y verificar una tarea.

## Principio

Cada tarea debe cerrar código y estado operativo del kit. La trazabilidad mínima se conserva; el ruido se compacta o elimina.

## Cierre Por Tipo De Trabajo

### Vía Rápida Nivel 0/1

Al cerrar:

- verificar el cambio de forma proporcional;
- no crear backlog si no hubo impacto transversal;
- actualizar `MANIFEST.md` sólo si cambió un artefacto canónico;
- registrar en `docs/changes/processed/` sólo si fue pedido de cliente o requiere trazabilidad.

### Feature O Mejora Mediana

Al cerrar:

- actualizar estado de la feature;
- completar Definition of Done;
- registrar verificación ejecutada;
- aplicar `docs/ai/CODE_REVIEW_POLICY.md` si hubo código nivel 2+ o riesgo transversal;
- actualizar docs técnicos o producto sólo si cambiaron contratos, datos, permisos, UX o MCP;
- mover solicitud de cliente a `processed/` o `rejected/` si existía;
- actualizar `MANIFEST.md`.

### Feature Grande O Hito

Al cerrar:

- hacer revisión zoom-out: objetivo de negocio, alcance realmente entregado, riesgos y próximos pasos;
- aplicar revisión estructurada según `docs/ai/CODE_REVIEW_POLICY.md`;
- compactar feature completada en `docs/backlog/archive/YYYY-MM.md`;
- mover o eliminar archivo activo sólo si el resumen conserva trazabilidad suficiente;
- cerrar o mover cambios procesados;
- actualizar roadmap/hito;
- registrar riesgos residuales;
- revisar señales de mejora del kit si hubo fricción real.

## Limpieza De Artefactos

Codex puede limpiar:

- archivos temporales creados para análisis si ya fueron incorporados;
- prototipos cerrados o rutas/componentes/scripts throwaway luego de registrar la decisión aprendida;
- entradas duplicadas;
- solicitudes procesadas en `pending/`;
- features completadas ya compactadas;
- señales promovidas, descartadas o fusionadas en `kit-improvement/inbox.md`.

No borrar sin conservar resumen cuando el archivo contiene:

- decisión de producto;
- criterio de aceptación;
- evidencia de QA;
- riesgo residual;
- contrato técnico;
- compromiso de cliente.

## Checklist De Cierre

- [ ] Código implementado o cambio aplicado.
- [ ] Verificación proporcional ejecutada.
- [ ] Revisión estructurada aplicada o marcada no aplica según `CODE_REVIEW_POLICY.md`.
- [ ] CodeGraph reportado como usado, no disponible o no aplicable si la tarea fue mediana/grande.
- [ ] Reindexado sugerido o ejecutado si hubo cambios grandes de arquitectura, modulos, schema, MCP o refactor.
- [ ] Backlog actualizado si existía feature.
- [ ] Solicitud de cliente movida o resumida si existía.
- [ ] `MANIFEST.md` actualizado si cambió estado canónico.
- [ ] MCP/skills del sistema destino actualizado o marcado no aplica.
- [ ] Feature completada compactada en archive si corresponde.
- [ ] Prototipos eliminados, absorbidos o marcados como pendientes de decisión.
- [ ] Temporales o pendientes innecesarios limpiados.
- [ ] Riesgos residuales documentados.
