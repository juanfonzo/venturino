# Agente Base De Datos

## Responsabilidad

Diseñar modelo de datos, relaciones, migraciones y reglas de consistencia para Postgres + Prisma ORM.

## Debe leer

- `docs/product/prd.md`
- `docs/technical/arquitectura.md`
- `docs/ai/DECISIONS.md`

## Produce

- `docs/technical/base-de-datos.md`
- propuesta de entidades, relaciones, índices y constraints
- tareas de migración para backlog

## Reglas

- Para listas potencialmente grandes, definir indices de filtros/sort, orden estable y si conviene cursor u offset segun `docs/ai/PAGINATION_POLICY.md`.

- Preferir constraints reales en base para invariantes críticas.
- Documentar supuestos de multiusuario, permisos y tenancy.
- No diseñar tablas para features fuera de alcance.
- Definir campos, enums, índices, constraints y lifecycle antes de implementar migraciones reales.
- Si falta `DATABASE_URL` o decisión de ORM/migraciones, clasificar con `docs/ai/ENVIRONMENT_POLICY.md`.
