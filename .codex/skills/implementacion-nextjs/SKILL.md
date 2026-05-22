---
name: implementacion-nextjs
description: Implementa vertical slices en Next.js 16 respetando PRD, arquitectura, backlog, MCP-first y patrones existentes del repo. Use when el usuario pida desarrollar frontend, backend Next.js, server actions, route handlers, componentes o integracion UI/API.
---

# Implementacion Next.js

Version objetivo: Next.js 16 para proyectos nuevos. En repos existentes, respetar la version instalada salvo pedido explicito de migracion.

## Workflow

1. Leer backlog del slice y artefactos tecnicos relevantes.
2. Leer `docs/ai/CODE_CONTEXT_POLICY.md` y definir nivel de lectura A/B/C/D.
3. Leer `docs/ai/AI_READABLE_CODE.md`.
4. Leer `docs/ai/MCP_FIRST_POLICY.md` si el slice toca capacidades operativas.
5. Leer `docs/ai/ENVIRONMENT_POLICY.md` si el slice toca DB, auth o servicios externos.
6. Leer `docs/ai/AUTH_POLICY.md` si el slice toca auth, sesiones, roles, permisos, tenant, sucursales o acceso interno.
7. Leer `docs/ai/PAGINATION_POLICY.md` si el slice toca listados, tablas, busquedas, reportes o endpoints de listado.
8. Leer `docs/ai/VISUAL_GUIDELINES.md` si el slice toca UI y no hay guia visual del cliente.
9. Explorar patrones existentes antes de editar segun el nivel definido.
10. Verificar la version de Next.js instalada antes de usar APIs version-specific; si el proyecto es nuevo, usar Next.js 16.
11. Implementar el minimo codigo necesario.
12. Mantener validacion cliente/servidor consistente.
13. Si la feature usa DB real, usar Postgres + Prisma ORM y no persistencia manual.
14. Evaluar si el cambio requiere actualizar MCP, coverage map o skills del sistema destino.
15. Agregar o ajustar tests segun riesgo y setup del repo.
16. Ejecutar verificacion disponible.

## Reglas

- No tocar areas fuera del slice.
- No editar sin haber ubicado patron, contratos y dependencias afectadas.
- No introducir dependencias sin justificar.
- No migrar una app existente a Next.js 16 sin pedido explicito y plan de migracion.
- Para APIs o comportamientos propios de Next.js 16, revisar documentacion oficial o patrones del repo antes de implementar.
- Codigo navegable: nombres de dominio, limites claros y contratos tipados.
- UI operativa: loading, vacio, error, exito, accesibilidad, responsive y alto contraste.
- Toda app debe tener shell con menu lateral desplegable/colapsable y modulos principales.
- UI interna compacta: evitar heroes repetidos, textos explicativos largos, cards innecesarias, filas demasiado altas y acciones que rompan la lectura.
- En CRUDs, priorizar formulario/listado/filtros/acciones en una composicion eficiente.
- Si no hay branding del cliente, usar `docs/ai/VISUAL_GUIDELINES.md`.
- Backend: validar inputs, manejar errores y preservar seguridad.
- Listados potencialmente grandes: paginar en backend, aplicar filtros/sort en DB, limitar `pageSize`/`limit` y no cargar todo para filtrar en frontend.
- Auth: JWT/cookie HttpOnly, middleware central, tenant obligatorio y permisos server-side segun `AUTH_POLICY.md`.
- Si el sistema contempla registro/autoregistro de usuarios, implementar tambien pantalla `Registrarse`, flujo backend de signup y casos de error; si no aplica, documentar `signup no-aplica` en seguridad.
- Cada cambio de dominio, accion, permiso, reporte o integracion debe evaluar impacto IA-first.
- Si el cambio agrega capacidad operativa, actualizar `docs/technical/mcp-coverage-map.md` con estado `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`.
- Si el proyecto ya tiene `DATABASE_URL` o DB real definida, no bajar a JSON/manual salvo autorizacion explicita.
- Si se agrega una tool MCP de listado, debe aceptar `limit` y cursor o `page/pageSize` cuando aplique.
