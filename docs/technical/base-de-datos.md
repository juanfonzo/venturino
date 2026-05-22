# Base De Datos

Estado: pendiente

## Motor

Postgres + Prisma ORM

## Entidades

| Entidad | Propósito | Hito | Estado |
|---|---|---|---|
|  |  |  | propuesta / vigente |

## Campos Por Entidad

### Entidad: Nombre

| Campo | Tipo | Obligatorio | Default | Único | Índice | Descripción |
|---|---|---|---|---|---|---|
| id | uuid / cuid / serial | sí | generado | sí | sí | Identificador |

## Relaciones

| Origen | Relación | Destino | Cardinalidad | Regla |
|---|---|---|---|---|
|  |  |  | 1:1 / 1:N / N:M |  |

## Enums Y Estados

| Enum | Valores | Uso | Estado Por Defecto |
|---|---|---|---|
|  |  |  |  |

## Constraints

| Constraint | Entidad/Campo | Motivo | Error Esperado |
|---|---|---|---|
|  |  |  |  |

## Índices

| Índice | Campos | Motivo |
|---|---|---|
|  |  |  |

## Paginacion Y Performance

Aplicar `docs/ai/PAGINATION_POLICY.md` cuando una entidad pueda crecer.

| Lista/Entidad | Metodo | Filtros | Sort estable | Indices necesarios | Max pageSize/limit |
|---|---|---|---|---|---|
|  | offset / cursor |  |  |  |  |

## Lifecycle

| Entidad | Crear | Actualizar | Eliminar | Retención/Auditoría |
|---|---|---|---|---|
|  |  |  | hard delete / soft delete / inactivar |  |

## Migraciones

- Migración inicial:
- Seeds mínimos:
- Reset dev/test:
- Rollback o plan de reversa:
- Estrategia local/desarrollo: Postgres local o instancia Postgres de desarrollo con Prisma ORM.

## Supuestos De Tenancy Y Permisos

- Tenancy:
- Reglas de acceso por rol:
- Datos que no deben exponerse a MCP/IA:

## Criterio Mínimo

Una feature con DB real no está lista si este documento no define campos, relaciones, constraints, lifecycle y seeds/reset cuando aplique.
