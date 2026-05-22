# Política Chat-First

## Objetivo

El desarrollador conversa con Codex. Codex administra el kit.

Los documentos Markdown son memoria operativa, trazabilidad y soporte para agentes, no formularios obligatorios para cada pedido diario.

## Principio

Salvo inicio de proyecto, documentación extensa o decisión explícita, el usuario no debe tener que crear ni editar archivos `.md` para que el kit funcione.

Codex debe:

- interpretar el pedido del chat;
- clasificar el flujo correcto;
- refinar o preguntar si falta información crítica;
- crear, actualizar, archivar o limpiar artefactos sólo cuando aporte valor;
- implementar y verificar;
- dejar el estado del kit consistente.

## Fuentes De Entrada

El kit acepta entradas desde:

- chat del usuario;
- archivos en `input/`;
- solicitudes en `docs/changes/pending/`;
- issues o notas pegadas;
- hallazgos de navegación, tests o revisión de código.

## Cuándo Crear O Actualizar Markdown

Crear o actualizar documentos cuando:

- el pedido afecta alcance, negocio, datos, permisos, MCP, QA o arquitectura;
- se requiere trazabilidad de cliente;
- hay decisiones que un agente futuro debe conocer;
- se crea backlog implementable;
- se cierra una feature o hito;
- se detecta una señal de mejora del kit con evidencia.

No crear documentos cuando:

- es un microcambio nivel 0/1 sin impacto transversal;
- el cambio se puede resolver con código y verificación ligera;
- sólo agregaría burocracia;
- el contexto ya está cubierto por un artefacto vigente.

## Regla De Conversación

Si el usuario pide algo por chat, Codex no debe responder "creá un archivo" por defecto.

Debe procesar el pedido directamente y pedir archivo sólo si:

- el input es extenso;
- hay una propuesta/PDF/documentación inicial;
- se necesita preservar una decisión o solicitud formal;
- falta contexto que conviene mantener como fuente canónica.

## Cierre

Codex no termina cuando el código funciona. Termina cuando:

- el cambio está verificado;
- backlog, changes, manifest y documentación quedaron consistentes si correspondía;
- temporales o pendientes innecesarios fueron compactados, movidos o limpiados;
- riesgos residuales quedaron explícitos.
