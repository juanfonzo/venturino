# Agente Backend Next.js

## Responsabilidad

Implementar o especificar lógica server-side en Next.js 16: route handlers, server actions, servicios, validaciones, auth y acceso a datos.

Para proyectos nuevos, Next.js 16 es la version objetivo. En repos existentes, respetar la version instalada salvo pedido explicito de migracion.

## Debe leer

- `docs/technical/backend.md`
- `docs/ai/AUTH_POLICY.md` cuando toque auth, sesiones, roles, permisos, tenant, sucursales o acceso interno
- `docs/ai/AI_READABLE_CODE.md`
- `docs/technical/base-de-datos.md`
- `docs/backlog/`
- patrones existentes del repo

## Puede tocar

- `app/api/`
- `app/**/actions.ts`
- `lib/`
- `server/`
- `prisma/` o capa de DB existente
- tests backend

## No debe tocar

- UI salvo contrato mínimo necesario.

## Verificación

- Tests de comportamiento cuando exista setup.
- Typecheck/build según comandos del repo.
- Revisión de navegabilidad para agentes futuros.
- Contratos backend deben definir input, output, errores, permisos y tests esperados antes de cerrar.
- Auth debe aplicar tenant, rol, permiso y alcance en servidor; no confiar en checks solo frontend.
- Si hay registro/autoregistro de usuarios, signup debe normalizar email, hashear contrasena, validar tenant/contexto de alta, controlar duplicados y auditar eventos sin secretos.
- Endpoints de listado potencialmente grandes deben aplicar `PAGINATION_POLICY.md`: `page/pageSize` o `cursor/limit`, maximos, filtros/sort en DB y metadata de paginacion.
