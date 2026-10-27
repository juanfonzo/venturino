# Politica De Grafo Del Proyecto

## Objetivo

Usar CodeGraph como ayuda local para navegar repos grandes sin convertirlo en fuente de verdad ni en dependencia obligatoria del producto.

## Principio

El grafo es un indice local derivado del codigo. Sirve para orientar exploracion, relaciones, impacto y puntos de entrada, pero la fuente de verdad sigue siendo el codigo versionado, `AGENTS.md`, documentos tecnicos, backlog y MCP coverage.

## Regla Base

- No versionar `.codegraph/`.
- Agregar `.codegraph/` al `.gitignore` del proyecto.
- Cada desarrollador o agente regenera su grafo local desde el codigo actualizado.
- Usar CodeGraph antes de tareas medianas o grandes si esta disponible.
- No bloquear tareas livianas si CodeGraph no esta instalado.
- No editar codigo solo por informacion del grafo: leer siempre los archivos criticos reales antes de modificar.

## Cuando Usarlo

Usar CodeGraph, si existe y esta disponible, para:

- features nivel B/C/D segun `CODE_CONTEXT_POLICY.md`;
- repos extensos como GeSuite, ERPs o sistemas con muchos modulos;
- cambios que cruzan frontend, backend, DB, MCP o permisos;
- bugs con impacto incierto;
- refactors o migraciones;
- integraciones externas;
- cambios donde el riesgo principal es tocar solo una parte del flujo.

No usarlo por defecto para:

- copy, estilos menores, textos, documentacion o cambios nivel 0/1;
- archivos aislados con alcance obvio;
- tareas donde el costo de reindexar sea mayor que leer directamente el archivo afectado.

## Uso Diario

Despues de clonar un repo o abrirlo por primera vez:

```powershell
codegraph init -i
```

Despues de `git pull`, merge, cambios grandes, migraciones, modulos nuevos o refactors:

```powershell
codegraph index
```

Si el indice parece inconsistente:

```powershell
codegraph uninit
codegraph init -i
```

Comandos recomendados en `package.json` cuando el repo usa Node:

```json
{
  "scripts": {
    "graph:init": "codegraph init -i",
    "graph:update": "codegraph index",
    "graph:reset": "codegraph uninit && codegraph init -i"
  }
}
```

## Coordinacion Entre Devs

- Cada dev mantiene su propio `.codegraph/` local.
- El equipo no comparte el indice por Git.
- Si alguien hace un cambio grande y lo pushea, quienes hagan pull deben reindexar antes de pedir tareas complejas a Codex.
- Las decisiones durables se documentan en Markdown versionado, no en el grafo.
- Si el grafo contradice el codigo, confiar en el codigo.

## Como Debe Usarlo Codex

Antes de una tarea mediana/grande:

1. Verificar si existe `.codegraph/` o si el repo declara scripts `graph:*`.
2. Si existe, usar CodeGraph para ubicar modulos, dependencias y archivos candidatos.
3. Si parece desactualizado y el cambio lo justifica, pedir permiso para ejecutar `codegraph index` o `npm run graph:update`.
4. Leer archivos criticos reales antes de editar.
5. Reportar al cierre si CodeGraph fue usado, no estaba disponible o no aplicaba.

Si CodeGraph no esta instalado o falla:

- continuar con `CODE_CONTEXT_POLICY.md`;
- no inventar dependencias;
- aumentar lectura directa proporcional al riesgo;
- registrar el bloqueo solo si impide comprender el impacto.

## Instalacion En Windows

Opcion recomendada si el equipo ya usa Node:

```powershell
npm i -g @colbymchenry/codegraph
codegraph --version
```

Luego, dentro del repo:

```powershell
codegraph init -i
```

## Criterio De Cierre

Para tareas medianas/grandes, indicar:

- si se uso CodeGraph;
- si el indice estaba disponible o se actualizo;
- que archivos criticos se leyeron despues del grafo;
- si queda pendiente reindexar por cambios grandes.
