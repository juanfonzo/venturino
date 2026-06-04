# Algorym Codex Kit

Kit base para iniciar y mantener proyectos personalizados de Algorym con Codex.

## Propósito

Este kit convierte presupuestos, propuestas comerciales, notas de cliente y cambios de mantenimiento en artefactos técnicos versionados:

- brief
- faltantes y preguntas
- PRD técnico
- arquitectura
- contratos de API/datos
- backlog Markdown
- criterios de verificación
- cobertura MCP Python/FastAPI
- servicios de agentes IA separados que consumen MCP

## Uso

1. Copiar el contenido de este kit dentro del repo del proyecto.
2. Abrir ese repo desde Codex Desktop.
3. Cargar inputs en `input/` o solicitudes extensas en `docs/changes/pending/`.
4. Pedir a Codex que procese el intake, cambios o implementación.

Ver `QUICK_START.md` para frases concretas de uso.

Ver `GUIA_USO_CODEX_KIT.md` para el uso diario recomendado con Codex.

## Stack Base

- Frontend/app: Next.js 16 para proyectos nuevos.
- MCP del sistema: Python/FastAPI.
- Agentes IA: servicios/API separados que consumen MCP.
- Base de datos: Postgres + Prisma ORM durante desarrollo local y ambientes de desarrollo.
- Encoding: UTF-8 obligatorio.
- Grafo del proyecto: CodeGraph opcional como indice local no versionado para repos grandes.
- Backlog: Markdown.
- Notas externas: Notion como fuente auxiliar, no canónica.

## Regla Principal

El repo es la fuente de verdad técnica. Notion, PDFs y chats alimentan el proceso, pero los artefactos que guían implementación deben quedar versionados en Markdown.

Todo sistema personalizado de Algorym debe nacer MCP-first: base MCP en Python/FastAPI y cobertura progresiva por feature documentada en `docs/technical/mcp-coverage-map.md`.

En repos grandes, CodeGraph puede usarse para orientar navegacion e impacto, pero `.codegraph/` no se versiona y la lectura real del codigo sigue siendo obligatoria antes de editar.
