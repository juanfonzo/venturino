# Agent Services Policy

## Objetivo

Definir como deben construirse los agentes de IA del sistema, por ejemplo Telegram, WhatsApp o asistentes internos.

## Regla Base

- El MCP es una API separada en Python/FastAPI.
- Cada agente de IA debe ser otro servicio/API separado.
- El agente consume el MCP; no reemplaza al MCP.
- La eleccion de framework del agente se rige por `docs/ai/AGENT_FRAMEWORK_POLICY.md`.
- El agente no debe acceder directo a la base de datos del negocio salvo una excepcion documentada.
- El agente puede tener su propia persistencia tecnica para estado conversacional, logs, colas o sesiones.

## Separacion De Responsabilidades

### MCP

Responsable de:

- exponer herramientas operativas del sistema;
- aplicar permisos y politicas de datos;
- validar entradas y salidas;
- devolver campos seguros;
- registrar errores controlados;
- servir como capa comun para agentes y automatizaciones.

No es responsable de:

- manejar Telegram, WhatsApp u otro canal;
- guardar estado conversacional de un canal;
- decidir tono, estilo o estrategia conversacional;
- contener prompts largos de agentes.

### Agente IA

Responsable de:

- recibir eventos del canal;
- mapear usuario del canal contra usuario/permisos del sistema;
- aplicar skills del sistema destino;
- decidir que herramienta MCP invocar;
- manejar confirmaciones antes de acciones sensibles;
- mantener estado conversacional;
- responder al usuario por el canal;
- registrar trazabilidad del intercambio.

No es responsable de:

- duplicar reglas de negocio del backend;
- consultar o modificar datos operativos saltando MCP;
- inventar permisos;
- exponer secretos o datos sensibles.

## Estructura Recomendada

```text
services/
  telegram-agent/
    app/
      main.py
      graph/        # solo si usa LangGraph
      channels/
      mcp_client/
      skills/
      prompts/
      policies/
      models/
      services/
    tests/
```

Tambien puede usarse `agents/telegram/` si el repo ya usa esa convencion.

## Skills Y Herramientas

- Los skills del sistema destino viven documentados en `docs/ai/system-skills.md`.
- Cada skill debe indicar que herramientas MCP puede usar.
- Cada herramienta MCP debe tener contrato, permisos, errores y campos seguros documentados.
- El agente debe usar herramientas MCP tipadas mediante cliente o adaptador.
- Las acciones sensibles deben requerir confirmacion explicita antes de ejecutar.

## Framework Del Agente

- Usar LangGraph como recomendacion por defecto para agentes no triviales con estado, branching, multiples herramientas, memoria, confirmaciones o retries.
- Usar LangChain como apoyo para prompts, parsers, tool wrappers, retrievers e integraciones cuando aporte claridad.
- Usar FastAPI simple con cliente MCP si el flujo es lineal y no necesita grafo ni memoria.
- Documentar la decision en `docs/technical/agent-services.md`.

## Buenas Practicas

- Mantener prompts versionados y breves.
- Separar canal, cliente MCP, skills, politicas y estado conversacional.
- Usar modelos tipados para eventos entrantes y respuestas.
- Tratar mensajes del usuario como input no confiable.
- Implementar idempotencia cuando el canal pueda reenviar eventos.
- Registrar auditoria de acciones ejecutadas.
- Manejar timeouts, retries y errores MCP con mensajes controlados.
- Agregar tests de skill, decision de herramienta, permisos y confirmacion.

## Definition Of Done

Un agente IA no esta cerrado hasta que:

- consume MCP mediante cliente/adaptador tipado;
- tiene framework elegido y justificado;
- no duplica reglas de negocio del sistema;
- tiene skills asociados documentados;
- tiene variables de entorno documentadas sin secretos;
- tiene pruebas proporcionales;
- tiene flujo de confirmacion para acciones sensibles;
- tiene manejo de errores de MCP y del canal;
- actualiza `docs/technical/agent-services.md`.
