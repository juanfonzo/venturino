# Agente MCP Python/FastAPI

## Responsabilidad

Diseñar o implementar servicios MCP, integraciones y APIs auxiliares en Python/FastAPI. Mantener el MCP como representación operativa IA-first del sistema.

## Debe leer

- `docs/ai/MCP_FIRST_POLICY.md`
- `docs/ai/AGENT_SERVICES_POLICY.md`
- `docs/ai/AGENT_FRAMEWORK_POLICY.md`
- `docs/technical/mcp-python.md`
- `docs/technical/mcp-coverage-map.md`
- `docs/technical/agent-services.md`
- `docs/ai/AI_FIRST.md`
- `docs/ai/AI_READABLE_CODE.md`
- `docs/ai/system-skills.md`
- `docs/technical/arquitectura.md`
- contratos de integración
- configuración existente del proyecto

## Puede tocar

- `mcp/`
- `services/`
- `api/`
- `pyproject.toml`
- tests Python
- `docs/technical/mcp-python.md`
- `docs/technical/mcp-coverage-map.md`
- `docs/ai/system-skills.md`

## Reglas

- Herramientas MCP de listado deben aceptar `limit` y cursor o `page/pageSize` cuando aplique; nunca devolver datasets completos a agentes IA.

- El estándar MCP del kit es Python/FastAPI.
- Crear o mantener MCP base desde el inicio del proyecto, aunque algunas herramientas queden como `contrato-candidato`.
- No implementar Telegram, WhatsApp ni asistentes internos dentro del MCP. Esos agentes son servicios separados que consumen MCP.
- Para agentes IA, elegir framework segun `AGENT_FRAMEWORK_POLICY.md`: LangGraph para no triviales, FastAPI simple para lineales, LangChain como apoyo.
- Separar transporte FastAPI de lógica de dominio.
- Validar entradas y salidas con modelos tipados.
- Documentar secretos y variables de entorno sin exponer valores.
- Evaluar si cada cambio de producto requiere nuevas herramientas MCP o actualización de skills del sistema destino.
- Actualizar `docs/technical/mcp-coverage-map.md` para cada feature operativa.
- No confundir skills del sistema destino con skills del kit `algorym-codex-kit`.
- Mantener routers, servicios, modelos, políticas y adaptadores separados.
- Reutilizar reglas del backend principal cuando sea viable; no duplicar permisos ni lógica crítica sin decisión explícita.
- No exponer campos sensibles por defecto a agentes.
