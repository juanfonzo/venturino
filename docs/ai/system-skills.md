# Skills Del Sistema Destino

## Propósito

Documentar skills propios del sistema que se está construyendo.

Estos skills describen cómo un agente debe operar este producto específico: consultar datos, ejecutar acciones, preparar respuestas, interpretar procesos del cliente o asistir usuarios.

No son los skills del kit `algorym-codex-kit`.

## Relación Con MCP

- Un skill del sistema debe apoyarse en herramientas MCP existentes o contratos candidatos documentados.
- No documentar acciones que no estén soportadas por permisos, APIs o herramientas del sistema.
- Si un skill necesita una capacidad todavía no implementada, registrar la herramienta como `contrato-candidato` o `bloqueado` en `docs/technical/mcp-coverage-map.md`.
- Los skills pueden orientar a agentes de WhatsApp, Telegram o asistentes internos, pero el acceso operativo debe pasar por MCP cuando la acción toque datos o reglas del sistema.
- Los agentes que usan estos skills deben vivir como servicios separados documentados en `docs/technical/agent-services.md`.

## Inventario

| Skill | Estado | Propósito | Herramientas MCP | Fuente | Última actualización |
|---|---|---|---|---|---|

## Formato Sugerido

```md
## Skill: Nombre

Estado: propuesta / vigente / obsoleta

Cuándo usar:

Datos que necesita:

Acciones permitidas:

Herramientas MCP relacionadas:

Servicios/agentes que lo usan:

Permisos requeridos:

Restricciones:

Riesgos:
```

## Reglas

- Actualizar este archivo cuando un cambio agregue capacidades que un agente debería conocer.
- Marcar skills obsoletos cuando cambie el proceso del negocio.
- No documentar acciones que no estén soportadas por permisos o herramientas del sistema.
- Mantener consistencia con `docs/ai/MCP_FIRST_POLICY.md` y `docs/technical/mcp-coverage-map.md`.
