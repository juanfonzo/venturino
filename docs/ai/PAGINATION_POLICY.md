# Pagination Policy

## Objetivo

Evitar sobrecarga de backend, base de datos, frontend, MCP y agentes IA cuando una pantalla, endpoint o herramienta trabaja con listas que pueden crecer.

La paginacion debe ser proporcional: no burocratizar listas chicas, pero nunca cargar datasets potencialmente grandes sin limite.

## Regla Base

Toda lista potencialmente grande debe usar paginacion server-side.

Aplica por defecto a:

- clientes, proveedores, usuarios y contactos;
- productos, stock, propiedades, equipos o activos;
- ventas, compras, pagos, movimientos, turnos, ordenes y sesiones;
- mensajes, conversaciones, auditoria, logs y eventos;
- reportes con detalle;
- cualquier entidad operativa que pueda superar algunos cientos de registros.

No requiere paginacion pesada por defecto:

- combos chicos y catalogos estables con pocos valores;
- enums, estados, roles simples o monedas;
- listas auxiliares de configuracion con volumen acotado;
- resultados ya limitados por contexto, por ejemplo ultimos 5 movimientos.

Si hay duda razonable sobre crecimiento, usar al menos `limit` server-side.

## Backend

Los endpoints de listado deben aceptar paginacion y filtros cuando el volumen pueda crecer.

Contrato recomendado:

```ts
type ListInput = {
  page?: number
  pageSize?: number
  cursor?: string
  limit?: number
  search?: string
  sort?: string
  filters?: Record<string, unknown>
}
```

Reglas:

- default recomendado: `pageSize = 25`;
- maximo recomendado: `pageSize = 100`;
- validar y normalizar parametros en backend;
- aplicar filtros, busqueda y ordenamiento en query DB, no en memoria;
- devolver metadata suficiente para UI: `items`, `total` si aplica, `page`, `pageSize`, `hasNextPage` o `nextCursor`;
- no devolver todos los registros para que el frontend los filtre;
- usar cursor pagination para listas grandes, eventos, logs, mensajes o datos con alta escritura;
- offset pagination es aceptable para CRUDs administrativos de volumen moderado.

## Frontend

Toda pantalla con listado potencialmente grande debe incluir:

- estado loading;
- empty state;
- error state;
- paginacion visible o carga incremental;
- busqueda/filtros cuando ayuden al usuario;
- page size razonable, sin permitir cargar todo;
- filtros en URL cuando favorezcan compartir, recargar o volver a la pantalla;
- tablas/listas compactas y responsive segun `VISUAL_GUIDELINES.md`.

No implementar "mostrar todo" salvo decision explicita y volumen acotado.

## Base De Datos

Cuando se disena una lista paginada, documentar:

- campos de ordenamiento;
- indices necesarios para filtros, busqueda y sort;
- criterio de orden estable;
- constraints que afecten filtros;
- si conviene cursor u offset.

Buscar por texto sin indice puede ser aceptable en MVP chico, pero debe quedar como deuda si la entidad crecera.

## MCP Y Agentes IA

Las herramientas MCP que listan datos deben exponer paginacion o limites.

Reglas:

- toda tool de listado debe aceptar `limit` y, cuando aplique, `cursor` o `page/pageSize`;
- default recomendado: `limit = 25`;
- maximo recomendado: `limit = 100`;
- no devolver datasets completos a agentes IA;
- excluir campos sensibles por defecto;
- documentar permisos y filtros por tenant/rol;
- usar resúmenes agregados cuando el agente no necesita detalle fila por fila.

## Definition Of Done

Una feature con listado potencialmente grande no esta lista si:

- el backend devuelve todos los registros sin limite;
- el frontend filtra o pagina solo en memoria sobre un dataset completo;
- faltan limites maximos;
- faltan indices para filtros/sort principales;
- MCP expone una tool de listado sin `limit`/paginacion;
- no se verifico empty/loading/error y al menos una pagina con datos.

## Decision Rapida

- Lista acotada y estable: sin paginacion pesada, pero con limite si viene de DB.
- CRUD operativo normal: offset pagination con `page/pageSize`, filtros y sort.
- Feed/log/mensajes/auditoria/alto volumen: cursor pagination.
- Reporte agregado: paginar detalle y calcular agregados en backend/DB.
