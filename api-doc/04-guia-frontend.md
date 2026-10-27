# Guía de presentación para el frontend de Padawanway

## Objetivo de experiencia

El vendedor debe obtener contexto de mercado con la menor cantidad posible de decisiones técnicas.

La pantalla debe ayudar a responder:

- cuántas publicaciones útiles existen;
- qué rango de precios muestran;
- qué tan cercanas son al modelo y año consultados;
- qué publicaciones externas puede revisar;
- si conviene abrir una búsqueda de modelos relacionados.

No debe presentar la respuesta como una tasación automática.

## Flujo recomendado

1. El vendedor abre una maquinaria dentro del panel.
2. Padawanway envía categoría, marca, modelo y año al endpoint directo.
3. La pantalla muestra criterio, solidez, estadísticas y publicaciones.
4. Si `expandedSearchRecommended=true`, ofrece la búsqueda ampliada como acción secundaria.
5. Si existe `busquedaAmpliadaSugerida`, la acción puede usar esa marca/modelo como valor inicial.
6. El vendedor puede ajustar la búsqueda ampliada sin modificar el bloque de referencias directas.

## Bloque 1: referencias directas

Mostrar:

- `criterioAplicado.titulo`;
- `criterioAplicado.detalle`;
- `solidezMuestra.titulo` y `detalle`;
- cantidad de publicaciones;
- mediana, p25 y p75 en USD;
- mínimo y máximo como información secundaria;
- listado de publicaciones con modelo, año, precio, ubicación, vendedor y enlace;
- `coincidencia.titulo` y diferencia de años;
- configuraciones comerciales cuando el array no esté vacío.

La mediana debe rotularse como **“Mediana de publicaciones”** o **“Precio mediano observado”**, nunca como “valor recomendado” o “precio de toma”.

## Bloque 2: búsqueda ampliada

Debe estar visualmente separado del bloque directo.

Texto recomendado para la acción:

```text
Buscar modelos relacionados
```

Cuando exista una sugerencia, puede utilizarse `busquedaAmpliadaSugerida.etiqueta`.

Mostrar claramente:

```text
Referencias de modelos relacionados
```

No usar “comparables exactos” para este bloque. Cada resultado ya incluye `coincidencia.titulo = "Modelo relacionado"` cuando no corresponde al mismo modelo.

## Estados de interfaz

### Cargando

- Mantener los datos de la maquinaria visibles.
- Deshabilitar envíos duplicados.
- No mostrar resultados anteriores como si correspondieran a la nueva consulta.

### Muestra suficiente

- Mostrar estadísticas y publicaciones.
- La búsqueda ampliada puede permanecer disponible, pero no necesita ser la acción principal.

### Muestra limitada

- Mostrar las referencias existentes.
- Destacar la posibilidad de buscar modelos relacionados.
- No ocultar la estadística, pero mantener visible que se basa en 1 o 2 publicaciones.

### Sin referencias directas

- Mostrar `criterioAplicado.titulo` y `detalle`.
- No mostrar ceros como si fueran precios.
- Ofrecer búsqueda ampliada cuando exista sugerencia o permitir que el vendedor escriba otra familia/modelo.

### Sin resultados ampliados

- Mantener la búsqueda editable.
- Mensaje recomendado: “No encontramos publicaciones para esta búsqueda ampliada.”
- No reemplazar el bloque directo por este estado.

### Error

- Mostrar un mensaje comercial simple al vendedor.
- Registrar técnicamente request-id, status y código de error en el backend/log de Padawanway.
- No mostrar firma, secreto, stack trace ni detalles internos.

## Publicaciones

Cada fila o elemento debe permitir escanear:

```text
Marca y modelo | Año | Precio USD | Ubicación | Coincidencia | Ver publicación
```

Recomendaciones:

- abrir `url` en una pestaña nueva;
- usar `rel="noopener noreferrer"`;
- mostrar “Año no informado” cuando `year` sea `null`;
- mostrar ubicación sólo con los campos disponibles;
- no inventar vendedor, año o configuración cuando el valor sea `null` o el array esté vacío;
- respetar la paginación del endpoint ampliado.

## Estadísticas

| Campo API | Etiqueta sugerida |
|---|---|
| `statistics.sampleSize` | Publicaciones encontradas |
| `statistics.median` | Mediana de publicaciones |
| `statistics.p25` | Percentil 25 |
| `statistics.p75` | Percentil 75 |
| `statistics.min` | Precio mínimo observado |
| `statistics.max` | Precio máximo observado |

Todos los valores deben formatearse como USD. No convertir a ARS desde el frontend dentro de esta primera versión.

## Lenguaje que debe evitarse

No utilizar:

- “tasación”;
- “precio recomendado de toma”;
- “valor definitivo”;
- “oferta sugerida”;
- “esta maquinaria vale”;
- “comparable exacto” dentro de la búsqueda ampliada.

Sí utilizar:

- “referencias de mercado”;
- “publicaciones encontradas”;
- “precio observado”;
- “muestra limitada/suficiente”;
- “mismo modelo”;
- “modelo relacionado”.

## Datos que no deben solicitarse ni mostrarse

- HP y horas como filtros de esta integración.
- Procesos o metadatos internos de administración de la información.
- Precio recomendado o cálculo de costos.
- Publicaciones propias de Venturino como parte de la muestra.

## Contrato frontend/backend de Padawanway

Se recomienda que el navegador consuma una ruta interna de Padawanway y que sólo ese backend llame a Algorym.

```text
Browser -> Backend Padawanway -> API Algorym
```

El backend de Padawanway puede devolver al navegador los datos comerciales de la API, pero debe eliminar cualquier header de autenticación técnica antes de responder.
