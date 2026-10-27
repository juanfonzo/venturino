# Search Policy

## Objetivo

Hacer que las búsquedas en listados operativos sean útiles, rápidas y predecibles.

Cuando una pantalla muestra una lista con potencial de crecer, la búsqueda debe ejecutarse en backend/DB y debe ser tokenizada. No alcanza con comparar el string completo ni filtrar todo en frontend.

Ejemplo esperado:

- Query: `cola`
- Resultados válidos: `Coca Cola 3lt`, `Coca Cola 2lt`, `Pepsi Cola`, `Gaseosa cola retornable`

## Regla Base

Todo listado operativo con búsqueda debe:

- normalizar el texto buscado;
- dividirlo en tokens;
- buscar cada token en campos relevantes;
- combinar búsqueda con filtros, sort y paginación server-side;
- no cargar todos los registros para filtrar en memoria.

## Normalización Recomendada

Aplicar antes de consultar:

- `trim`;
- lowercase;
- colapsar espacios múltiples;
- remover acentos/diacríticos cuando el dominio lo necesite;
- ignorar tokens vacíos;
- opcional: ignorar tokens muy cortos como 1 carácter, salvo códigos/SKU.

Ejemplo:

```ts
function tokenizeSearch(input: string) {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}
```

## Semántica De Tokens

Regla por defecto: todos los tokens deben aparecer en alguno de los campos buscables.

Ejemplos:

- `coca cola` debe encontrar artículos que contengan `coca` y `cola`, aunque estén en campos distintos si eso tiene sentido.
- `cola 3lt` debe priorizar o encontrar artículos con ambos tokens.
- `ba 000001` puede buscar por código normalizado si el dominio usa códigos separados por guiones.

Implementación conceptual:

```ts
AND: tokens.map((token) => ({
  OR: [
    { name: { contains: token, mode: "insensitive" } },
    { code: { contains: token, mode: "insensitive" } },
    { description: { contains: token, mode: "insensitive" } },
  ],
}))
```

## Campos Buscables

Definir explícitamente por entidad:

- nombre/título;
- código/SKU;
- alias;
- descripción corta;
- proveedor/cliente relacionado cuando aporte valor;
- tags/categorías si existen.

No buscar por campos sensibles o irrelevantes.

## Performance

### MVP O Volumen Bajo/Medio

Aceptable:

- `contains` case-insensitive por token;
- límites de `pageSize`;
- índices en campos exactos frecuentes como código, tenant, estado y sort.

Debe quedar como deuda si la entidad crecerá mucho.

### Volumen Alto

Preferir:

- columna `searchText` normalizada y mantenida al crear/editar;
- índice sobre `searchText` si aplica;
- Postgres full-text search para ranking textual;
- extensión `pg_trgm` para coincidencias parciales/fuzzy cuando el dominio lo justifique.

No agregar full-text/trigram por defecto si el MVP no lo necesita.

## Frontend

La UI de búsqueda debe:

- usar placeholder claro: `Buscar por nombre, código o proveedor`;
- aplicar debounce corto cuando busque al tipear;
- reflejar la query en URL si ayuda a compartir o volver;
- mostrar estado loading durante búsqueda;
- mostrar empty state con la query usada;
- permitir limpiar búsqueda;
- no resetear filtros útiles salvo decisión explícita.

## MCP Y Agentes IA

Las tools MCP de listado deben aceptar `search` tokenizado cuando la entidad sea buscable.

Reglas:

- misma semántica que la UI;
- respetar `limit`/cursor o `page/pageSize`;
- excluir campos sensibles;
- documentar campos buscables;
- no devolver datasets completos para que el agente filtre.

## Definition Of Done

Una búsqueda de listado no está lista si:

- sólo busca el string completo;
- busca únicamente en frontend sobre todos los registros;
- no combina búsqueda con paginación/filtros;
- no define campos buscables;
- no tiene empty/loading/error;
- no tiene prueba con tokens parciales relevantes del dominio.

