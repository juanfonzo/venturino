# Testing Policy

## Principio

La verificacion debe ser proporcional al riesgo del cambio.

No todos los cambios requieren navegacion completa o tests pesados. Pero ningun cambio debe cerrarse sin una evidencia razonable de que funciona y no rompe el flujo afectado.

## Tests Por Comportamiento

Priorizar pruebas sobre comportamiento observable e interfaces públicas, no sobre detalles internos.

- Testear contratos, outputs, estados UI, respuestas API, permisos y persistencia esperada.
- Evitar mocks de módulos internos sólo para hacer pasar tests frágiles.
- Mockear en límites externos: APIs de terceros, tiempo, random, filesystem, servicios externos o colas.
- Si la DB es parte del comportamiento, preferir entorno de test/dev controlado antes que mocks profundos de repositorios.
- En TDD, escribir un test de comportamiento por ciclo, hacerlo fallar por la razón correcta, implementar lo mínimo y refactorizar.
- No aplicar TDD pesado a cambios nivel 0/1 ni escribir una batería grande de tests antes de entender el slice.

## Niveles De Verificacion

### Nivel 0 - Documental

Usar cuando solo cambian documentos, prompts, backlog o comentarios sin impacto runtime.

Verificacion minima:

- revisar diff
- confirmar UTF-8
- confirmar links/rutas referenciadas

### Nivel 1 - UI Ligera

Usar cuando cambia copy, color, spacing, icono, label o estado visual sin logica nueva.

Verificacion minima:

- revisar diff
- ejecutar typecheck/lint si es barato y esta configurado
- verificar responsive por inspeccion o navegador si el cambio afecta layout
- screenshot/manual check si el cambio visual es visible para usuario

### Nivel 2 - Logica Local

Usar cuando cambia validacion, componente interactivo, calculo local, estado de formulario o comportamiento aislado.

Verificacion minima:

- tests unitarios/componentes si existen, enfocados en comportamiento observable
- typecheck/lint/build segun repo
- navegacion local si el comportamiento depende de interaccion humana

### Nivel 3 - Flujo Funcional

Usar cuando cambia un flujo end-to-end: formularios, carga de datos, server actions, APIs, permisos, DB o integracion frontend/backend.

Verificacion minima:

- tests disponibles
- tests disponibles sin acoplarse a detalles internos innecesarios
- build/typecheck/lint
- navegacion con navegador cuando haya UI
- completar flujo principal como usuario
- usar escenario de `docs/ai/SCENARIOS.md` cuando exista
- probar estado de error o validacion relevante
- confirmar persistencia o respuesta del backend

### Nivel 4 - Critico

Usar cuando cambia autenticacion, autorizacion, pagos, datos sensibles, migraciones, integraciones externas, MCP operativo o reglas criticas del negocio.

Verificacion minima:

- tests automatizados relevantes o justificacion explicita si no existen
- revision de permisos/datos sensibles
- prueba manual/navegador si hay UI
- escenario de usuario documentado o justificacion de no aplicabilidad
- verificacion de DB/migracion
- impacto IA-first/MCP
- riesgos residuales documentados

## Uso Del Navegador

Usar el navegador nativo de Codex como primera opcion cuando:

- el cambio afecta una pantalla o flujo visible
- hay formularios o navegacion entre vistas
- se debe verificar responsive real
- se debe cargar/editar/eliminar datos desde la UI
- el criterio de aceptacion describe comportamiento de usuario
- el escenario requiere login, carga de datos o navegacion entre pantallas

No reemplazar el navegador nativo por inspeccion de codigo o checks manuales parciales si la validacion requiere comportamiento real de usuario, salvo bloqueo de entorno explicitamente documentado.

No es necesario usar navegador para:

- cambios puramente documentales
- refactors internos cubiertos por tests
- cambios de tipos sin UI
- ajustes backend sin pantalla asociada

## Evidencia De Cierre

Cada cierre debe indicar:

- nivel aplicado
- comandos ejecutados
- navegacion realizada si aplica
- si se uso el navegador nativo de Codex o por que no se uso
- escenario usado si aplica
- resultado
- riesgos o brechas

Si no se puede ejecutar una verificacion esperada, registrar motivo.
