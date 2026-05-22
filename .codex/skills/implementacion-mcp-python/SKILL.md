---
name: implementacion-mcp-python
description: Implementa servicios MCP, integraciones y APIs auxiliares en Python/FastAPI con contratos claros, permisos y cobertura IA-first. Use when el proyecto requiera MCP, agentes, WhatsApp, Telegram, FastAPI, conectores, integraciones externas o servicios Python.
---

# Implementación MCP Python

## Workflow

1. Leer `docs/ai/MCP_FIRST_POLICY.md`.
2. Leer `docs/ai/AGENT_SERVICES_POLICY.md` si el trabajo toca Telegram, WhatsApp, asistentes internos o agentes IA.
2.a. Leer `docs/ai/AGENT_FRAMEWORK_POLICY.md` si el trabajo toca Telegram, WhatsApp, asistentes internos o agentes IA.
3. Leer `docs/technical/mcp-python.md`, `docs/technical/mcp-coverage-map.md` y contratos.
4. Leer `docs/ai/CODE_CONTEXT_POLICY.md` y definir nivel de lectura C/D.
5. Leer `docs/ai/AI_FIRST.md`, `docs/ai/AI_READABLE_CODE.md` y `docs/ai/system-skills.md`.
6. Revisar tools, servicios, permisos, modelos y adaptadores existentes antes de editar.
7. Separar lógica de dominio, transporte FastAPI, políticas de permisos y adaptadores externos.
8. Definir modelos tipados para entrada/salida.
9. Implementar el slice mínimo o documentarlo como `contrato-candidato`, `no-aplica` o `bloqueado`.
10. Actualizar documentación de herramientas MCP, coverage map, agent services y skills del sistema destino cuando corresponda.
11. Agregar tests de comportamiento si existe setup.
12. Documentar variables de entorno sin valores secretos.

## Reglas

- El MCP del sistema destino debe ser Python/FastAPI.
- El MCP no debe contener agentes IA de canal. Telegram, WhatsApp o asistentes internos son servicios separados que consumen MCP.
- LangGraph es recomendado para agentes no triviales; no usarlo por defecto en webhooks lineales.
- LangChain es apoyo opcional para prompts, parsers, wrappers e integraciones.
- No exponer secretos.
- No editar herramientas MCP sin revisar permisos, campos seguros y consumidores.
- Manejar errores de proveedor externo con mensajes controlados.
- Evitar acoplar integraciones a UI o DB directamente.
- Tratar MCP como representación operativa del sistema, no como integración secundaria.
- Mantener código Python navegable para agentes: modelos, servicios, routers, políticas y adaptadores con límites explícitos.
- Reutilizar reglas de backend cuando sea viable; si se duplica lógica, documentar el motivo.
- Toda herramienta implementada debe cubrir al menos: caso feliz, input inválido, permiso denegado y no exposición de datos sensibles.
