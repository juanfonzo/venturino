# Agent Services

Estado: pendiente

## Objetivo

Documentar servicios de agentes IA separados del MCP, como Telegram, WhatsApp o asistentes internos.

## Regla

El MCP es la API operativa central. Cada agente IA es un servicio separado que consume herramientas MCP mediante cliente o adaptador tipado.

La eleccion de framework debe seguir `docs/ai/AGENT_FRAMEWORK_POLICY.md`: LangGraph para agentes no triviales, LangChain como apoyo y FastAPI simple para flujos lineales.

## Inventario

| Servicio | Canal | Estado | Framework | Consume MCP | Skills | Persistencia propia | Ultima revision |
|---|---|---|---|---|---|---|---|
| - | - | pendiente | - | - | - | - | - |

## Servicio: Nombre

### Proposito

### Canal

- Telegram / WhatsApp / Interno / Otro:

### Responsabilidades

- Entrada de eventos:
- Estado conversacional:
- Framework:
- Motivo del framework:
- Skills usados:
- Herramientas MCP usadas:
- Confirmaciones requeridas:
- Auditoria:

### No Debe Hacer

- Acceder directo a DB operativa:
- Duplicar reglas de negocio:
- Saltar permisos:

### Variables De Entorno

```env
AGENT_SERVICE_URL=
MCP_BASE_URL=
TELEGRAM_BOT_TOKEN=
```

No documentar secretos reales.

### Contratos

- Evento entrante:
- Respuesta al canal:
- Error controlado:

### Tests

- skill decide herramienta correcta;
- permiso denegado;
- confirmacion antes de accion sensible;
- error MCP controlado;
- idempotencia de evento repetido.
