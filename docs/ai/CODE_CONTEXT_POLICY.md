# Política De Contexto De Código

## Objetivo

Evitar implementaciones por intuición. Antes de modificar código, el agente debe revisar el contexto mínimo real del código afectado.

## Principio

Toda implementación empieza por una lectura proporcional del código existente. La profundidad depende del riesgo, pero nunca se debe editar sin ubicar archivo, patrón, contrato y dependencias afectadas.

## Niveles De Lectura

### Nivel A: Microcambio

Aplica a copy, color, spacing, labels, documentación o ajustes visuales sin lógica.

Leer antes de editar:

- archivo afectado;
- patrón visual o textual cercano;
- guía visual si aplica;
- verificación esperada nivel 0/1.

No requiere auditoría completa.

### Nivel B: Función O Componente

Aplica a ajuste de función, componente, validación local o comportamiento acotado.

Leer antes de editar:

- función/componente afectado;
- callers o imports principales;
- tipos o contratos de entrada/salida;
- tests o escenarios relacionados si existen.

### Nivel C: Feature O Flujo

Aplica a nuevas features, cambios en API, formulario, persistencia, estados UX o flujo usuario.

Leer antes de editar:

- backlog o cambio de cliente;
- arquitectura y documentos técnicos afectados;
- UI/componente;
- endpoint/server action;
- service/repository;
- modelo de datos o schema;
- validaciones;
- tests/escenarios.

### Nivel D: Crítico

Aplica a permisos, datos sensibles, auth, pagos, integraciones externas, migraciones, producción o MCP con acciones.

Leer antes de editar:

- flujo completo UI -> API -> service -> DB/integración;
- permisos server-side;
- casos negativos;
- variables/credenciales requeridas;
- política de entorno;
- escenarios de verificación nivel 4;
- impacto IA-first/MCP y campos seguros.

## Reglas

- No editar por intuición si no se ubicó el patrón existente.
- No introducir contratos nuevos sin revisar consumidores y productores.
- No cambiar permisos sin revisar server-side y casos negativos.
- No cambiar DB sin revisar migraciones/schema, seeds y código consumidor.
- No cambiar UI sin revisar estados: loading, vacío, error, éxito y disabled cuando aplique.
- Si no se puede leer o ejecutar lo necesario por entorno, registrar bloqueo y pedir permiso o aclaración.

## Evidencia Esperada

Al cerrar, indicar brevemente:

- qué contexto se revisó;
- qué nivel de lectura aplicó;
- qué verificación se ejecutó;
- qué quedó sin validar si aplica.
