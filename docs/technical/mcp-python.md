# MCP Python/FastAPI

Estado: pendiente

## Aplica

Sí, por defecto, para sistemas personalizados de Algorym.

El MCP base debe existir desde el inicio del proyecto. La cobertura de herramientas puede ser progresiva, pero debe quedar registrada en `docs/technical/mcp-coverage-map.md`.

## Objetivo

Representar operativamente el sistema para que agentes de IA puedan consultar, ejecutar acciones autorizadas y asistir procesos del negocio.

El MCP no reemplaza la app web: expone capacidades seguras y trazables para agentes internos, WhatsApp, Telegram, asistentes administrativos y automatizaciones.

El MCP tampoco contiene los agentes IA. Telegram, WhatsApp y asistentes internos deben vivir como servicios separados y consumir el MCP.

## Estándar

- Lenguaje: Python.
- Framework: FastAPI.
- Contratos: Pydantic o equivalente tipado.
- Separar transporte FastAPI, lógica de aplicación, políticas de permisos y adaptadores.
- Reutilizar servicios, reglas y contratos del backend principal cuando sea viable.
- No exponer secretos ni campos sensibles por defecto.
- No incluir logica de canal, prompts largos ni estado conversacional de Telegram/WhatsApp dentro del MCP.

Estructura recomendada:

```text
mcp/
  app/
    main.py
    tools/
    services/
    models/
    policies/
    adapters/
  tests/
```

## Servicios

Listar servicios operativos que el MCP debe representar:

- Servicio:
- Entidades:
- Acciones:
- Consultas:
- Permisos:
- Consumidores esperados:

## Herramientas MCP

Para cada herramienta:

```md
### `tool_name`

Estado: implementado / contrato-candidato / no-aplica / bloqueado

Capacidad:

UI/API relacionada:

Entrada:

- campo:
- paginacion: `limit` y cursor o `page/pageSize` cuando liste datos.

Salida:

- campo seguro:

Permisos:

- rol:

Datos sensibles excluidos:

- campo:

Errores:

- `UNAUTHORIZED`
- `FORBIDDEN`
- `VALIDATION_ERROR`

Tests esperados:

- limite/paginacion respetado si lista datos
- caso feliz
- input inválido
- permiso denegado
- no exposición de datos sensibles
```

## Skills Del Sistema Destino

Documentar skills propios del proyecto que ayuden a agentes a operar este sistema.

No confundir con los skills del kit `algorym-codex-kit`.

Ver también `docs/ai/system-skills.md`.

Los servicios de agentes IA se documentan en `docs/technical/agent-services.md`.

## Matriz De Impacto IA-First

| Cambio | Impacto MCP | Impacto skills sistema | Decisión |
|---|---|---|---|
| - | - | - | - |

## Coverage Map

Mantener actualizado `docs/technical/mcp-coverage-map.md` en cada feature operativa.

## Endpoints FastAPI

- Pendiente.

## Modelos De Entrada/Salida

- Pendiente.

## Variables De Entorno

- Pendiente.

## Tests

- Pendiente.
