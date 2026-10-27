# Prototype Policy

## Objetivo

Usar prototipos solo para reducir incertidumbre antes de comprometer arquitectura, UI o reglas de negocio.

Un prototipo responde una pregunta concreta. No es produccion, no es deuda que deba quedar viva y no reemplaza la implementacion real.

## Cuándo Aplica

Usar prototipo cuando:

- el usuario quiere comparar alternativas visuales;
- una regla de negocio, flujo o estado no se entiende hasta probarlo;
- una decision de modelo de datos o UX tiene alto costo de reversa;
- varias soluciones son razonables y conviene aprender rapido.

No usar prototipo para:

- cambios nivel 0/1;
- features ya claras;
- evitar escribir tests o implementar bien;
- conectarse a produccion o datos reales.

## Tipos

### Prototipo De Lógica

Para reglas, estados, calculos, permisos o formas de datos.

Reglas:

- declarar la pregunta que intenta responder;
- mantener estado en memoria salvo que la pregunta sea persistencia;
- separar la logica en una interfaz portable;
- mostrar el estado despues de cada accion;
- dejar un comando simple para ejecutarlo.

### Prototipo De UI

Para comparar layouts, densidad, jerarquia visual o flujos.

Reglas:

- preferir montarlo dentro de una pantalla real existente;
- si no existe pantalla, usar una ruta claramente marcada como prototipo;
- crear variantes estructuralmente distintas, no solo cambios de color;
- permitir alternarlas con parametro de URL o control visible;
- bloquear el prototipo en produccion;
- no conectar mutaciones reales salvo decision explicita.

## Cierre

Al terminar:

- capturar la decision aprendida en `DECISIONS.md`, issue/backlog o nota breve;
- borrar el prototipo o absorber solo la decision validada en codigo real;
- no dejar rutas, componentes, scripts o datos de prototipo sin marcar;
- si queda pendiente, registrarlo como `bloqueado` o `pendiente-de-decision`.

## Definition Of Done

Un prototipo esta cerrado cuando la pregunta inicial tiene respuesta, la decision quedo registrada y el codigo throwaway fue eliminado o claramente aislado.
