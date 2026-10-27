# MCP-First

## Objetivo

Todo sistema personalizado de Algorym debe nacer con una base MCP en Python/FastAPI como representación operativa del sistema.

El MCP permite que agentes internos, WhatsApp, Telegram, asistentes administrativos o automatizaciones futuras puedan consultar y ejecutar acciones autorizadas sin depender de la interfaz visual.

## Regla Base

- El MCP base es obligatorio desde el inicio del proyecto, aunque su cobertura sea progresiva.
- El MCP debe ser una API separada en Python/FastAPI.
- Los agentes IA no viven dentro del MCP: consumen el MCP desde servicios separados.
- La cobertura MCP se define por feature, no por deseo general.
- No toda pantalla necesita una herramienta MCP, pero toda capacidad operativa relevante debe ser evaluada.
- Si una capacidad todavía no se implementa en MCP, debe quedar marcada como `contrato-candidato`, `no-aplica` o `bloqueado`.
- El MCP del sistema destino es distinto de los skills del kit. Los skills del sistema pueden apoyarse en herramientas MCP, pero no las reemplazan.

## Estandar Tecnico

- Lenguaje: Python.
- Framework: FastAPI.
- Contratos: Pydantic o equivalente tipado.
- Base de datos: acceder mediante servicios, APIs internas o adaptadores definidos; no duplicar reglas de negocio sin necesidad.
- Autenticación/autorización: respetar permisos del sistema principal.
- Salidas: devolver solo campos seguros y necesarios para agentes.

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

## Estados De Cobertura

- `implementado`: la herramienta MCP existe, esta documentada y fue verificada.
- `contrato-candidato`: la capacidad debe existir en MCP, pero todavía no se implementa. Tiene nombre, objetivo, entrada, salida, permisos y campos sensibles definidos.
- `no-aplica`: la feature no necesita exposicion MCP. Debe incluir motivo.
- `bloqueado`: falta decision, credencial, permiso, modelo, integracion o definicion de seguridad.

## Definition Of Done MCP

Una feature operativa no se considera cerrada hasta que:

- Se evaluó impacto MCP.
- `docs/technical/mcp-coverage-map.md` fue actualizado.
- La herramienta MCP quedó `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`.
- Permisos, alcance y campos sensibles estan definidos.
- Si se implemento herramienta MCP, existen pruebas proporcionales: caso feliz, input invalido, permisos y no exposicion de datos sensibles.
- Si queda como `contrato-candidato` o `bloqueado`, el backlog conserva la deuda técnica explícita.

## Criterio De Implementacion

Implementar MCP en la misma feature cuando:

- La capacidad será consumida por agente, chatbot, WhatsApp, Telegram o automatización interna.
- La acción es central para el flujo operativo.
- La consulta o reporte reduce carga manual del negocio.
- La feature define o cambia permisos, datos o reglas que un agente debe respetar.

Dejar como `contrato-candidato` cuando:

- La feature aun esta validando producto o UI.
- Falta confirmar flujo con cliente.
- El costo de MCP completo no aporta al hito actual, pero la capacidad claramente será necesaria.

Marcar `no-aplica` cuando:

- El cambio es visual, copy, layout o ajuste sin capacidad operativa nueva.
- La función es exclusivamente interna al frontend y no representa una acción de negocio.

## Seguridad

- No exponer secretos, tokens, credenciales, notas sensibles o datos personales completos por defecto.
- No saltar permisos porque el consumidor sea un agente.
- No duplicar lógica crítica en MCP si ya existe en backend; reutilizar servicios o contratos cuando sea viable.
- Registrar excepciones en `docs/ai/DECISIONS.md` si el MCP necesita una ruta diferente por restricciones reales.

## Relacion Con Agentes IA

Ver `docs/ai/AGENT_SERVICES_POLICY.md`.

Telegram, WhatsApp y asistentes internos deben ser servicios separados que consumen herramientas MCP. El MCP expone capacidades; el agente maneja canal, conversacion, skills, prompts, confirmaciones y estado propio.
