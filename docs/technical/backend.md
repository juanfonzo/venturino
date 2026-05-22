# Backend

Estado: pendiente

## Stack

Next.js 16 server-side: route handlers, server actions o services según el repo.

Para repos existentes, respetar la version instalada salvo pedido explicito de migracion. Para proyectos nuevos, usar Next.js 16 como version objetivo.

## Módulos Server

| Módulo | Responsabilidad | Entrada | Salida |
|---|---|---|---|
|  |  |  |  |

## Contratos

### Contrato: Nombre

- Tipo: route handler / server action / service / repository
- Ruta o función:
- Rol requerido:
- Permisos:
- Precondiciones:
- Paginacion si lista datos: `page/pageSize` o `cursor/limit`, default, maximo y filtros/sort.

Entrada:

```ts
type Input = {}
```

Salida OK:

```ts
type Output = {}
```

Errores:

| Código | HTTP | Cuándo ocurre | Mensaje UI |
|---|---|---|---|
| VALIDATION_ERROR | 400 |  |  |
| UNAUTHORIZED | 401 |  |  |
| FORBIDDEN | 403 |  |  |
| NOT_FOUND | 404 |  |  |
| CONFLICT | 409 |  |  |

## Validaciones

- Fuente de verdad server-side:
- Validaciones client-side complementarias:
- Validaciones DB:

## Seguridad

- Auth:
- Signup/autoregistro:
- Autorización:
- Datos sensibles:
- Logging seguro:

## Tests

- Listados: limite maximo, pagina vacia, filtros/sort y no carga completa en memoria.
- Unitarios:
- Integración/API:
- Browser/E2E:
- Casos negativos:

## Criterio Mínimo

Una feature backend no está lista si sus contratos no definen input, output, errores, permisos y tests esperados.
