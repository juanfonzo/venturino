---
name: arquitectura-contratos
description: Diseña arquitectura, módulos, contratos API/datos y decisiones técnicas para proyectos Next.js 16, Python/FastAPI MCP y Postgres con Prisma ORM. Use when haya PRD aprobado o se necesite definir arquitectura antes de implementar.
---

# Arquitectura Y Contratos

## Workflow

1. Leer PRD, decisiones existentes y stack del proyecto.
2. Definir módulos y límites.
3. Proponer contratos de API, datos e integraciones.
4. Documentar riesgos y tradeoffs.
5. Definir variables/servicios de entorno y si son bloqueantes o admiten fallback.
6. Registrar decisiones no obvias en `docs/ai/DECISIONS.md`.

## Artefactos

- `docs/technical/arquitectura.md`
- `docs/technical/base-de-datos.md`
- `docs/technical/backend.md`
- `docs/technical/frontend.md`
- `docs/technical/mcp-python.md` si aplica
- `docs/ai/ENVIRONMENT_POLICY.md` como criterio para variables, credenciales y fallbacks

## Reglas

- Preferir módulos profundos con interfaces simples.
- Diseñar para testabilidad y evolución.
- No crear arquitectura para features fuera de alcance.
- Para DB/backend/seguridad, dejar contratos implementables: campos, permisos, input/output, errores y casos negativos.
