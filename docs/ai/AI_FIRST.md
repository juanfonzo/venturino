# AI-First

## Principio

Los sistemas personalizados de Algorym deben diseñarse como IA-first.

Esto significa que el MCP del sistema no es un agregado opcional: es una representación operativa del sistema, sus entidades, acciones, permisos, consultas y automatizaciones posibles.

Aunque la primera versión no tenga chatbot interno, WhatsApp, Telegram, agentes o automatizaciones visibles, cada implementación debe dejar las bases para que el sistema pueda ser operado o asistido por IA en el futuro.

Ver también `docs/ai/MCP_FIRST_POLICY.md`. Esa política define el estándar operativo: MCP base obligatorio en Python/FastAPI, cobertura progresiva por feature y mapa explícito en `docs/technical/mcp-coverage-map.md`.

## Regla De Evaluación

Toda implementación, cambio de cliente o ajuste de modelo debe responder:

- ¿Cambia entidades, relaciones o reglas de negocio?
- ¿Cambia acciones que un agente debería poder ejecutar?
- ¿Cambia consultas o reportes que un agente debería poder responder?
- ¿Cambia permisos, roles o datos sensibles?
- ¿Cambia integraciones externas?
- ¿Requiere actualizar herramientas MCP del sistema?
- ¿Requiere actualizar skills del sistema destino?
- ¿Requiere actualizar `docs/technical/mcp-coverage-map.md`?

Importante: "skills del sistema destino" no son los skills de este kit. Son skills propios del proyecto que describen cómo los agentes operan ese sistema.

## Artefactos Del Sistema Destino

Cada proyecto puede tener:

- `docs/technical/mcp-python.md`
- `docs/technical/mcp-coverage-map.md`
- `docs/ai/system-skills.md`
- `mcp/` o carpeta equivalente
- documentación de herramientas MCP
- tests de herramientas MCP

## Criterio De Cierre

Un cambio no está completamente cerrado hasta que se haya evaluado su impacto IA-first.

Resultado posible:

- `implementado`: MCP/skills actualizados y verificados.
- `contrato-candidato`: contrato documentado, implementación diferida y deuda visible.
- `no-aplica`: sin impacto operativo, con motivo.
- `bloqueado`: falta decisión, credencial, permiso, modelo o definición.
- requiere decisión humana.

## Ejemplos

Si se agrega un módulo de cobranzas:

- Probablemente requiere nuevas entidades y consultas.
- Puede requerir herramientas MCP para listar deudas, registrar pago o generar resumen.
- Puede requerir skills del sistema para "analizar deuda de cliente" o "preparar recordatorio".
- Debe actualizar el mapa de cobertura MCP.

Si sólo se corrige un typo visual:

- Probablemente no requiere actualizar MCP ni skills del sistema.
- Debe registrarse como `no-aplica` si el flujo de verificación lo pide.
