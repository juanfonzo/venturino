# Contrato de la API

Versión: `v1`

## URL base

```text
{{base_url}}/api/v1
```

Las URLs definitivas de prueba y producción se entregarán antes de la validación conjunta.

## Convenciones generales

- Protocolo: HTTPS en ambientes compartidos y producción.
- Formato: JSON UTF-8.
- Método: `POST` para ambas operaciones.
- Moneda: todos los precios y estadísticas están expresados en USD.
- Cache: las respuestas incluyen `Cache-Control: no-store, private`.
- Tamaño máximo del request: 16 KB.
- Los campos opcionales ausentes pueden devolverse como `null`.
- Las listas sin resultados se devuelven como `[]`, no como error.

## Headers obligatorios

| Header | Descripción |
|---|---|
| `Content-Type` | Debe ser `application/json`. |
| `x-client-id` | Identificador técnico entregado por Algorym. |
| `x-timestamp` | Unix timestamp actual en segundos. |
| `x-request-id` | Identificador único por intento, de 8 a 120 caracteres. |
| `x-signature` | Firma `sha256=<hexadecimal HMAC-SHA256>`. |

La generación de la firma se describe en [Seguridad y firma](./02-seguridad-y-firma.md).

## 1. Referencias directas

```text
POST {{base_url}}/api/v1/market-references/direct
```

Busca publicaciones externas del mismo modelo canónico. El vendedor no debe configurar tolerancias de año.

### Request

```json
{
  "categoria": "Tractores",
  "marca": "John Deere",
  "modelo": "6145J",
  "anio": 2016
}
```

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `categoria` | string | Sí | `Tractores`, `Cosechadoras`, `Sembradoras` o `Pulverizadoras`. También se aceptan las formas singulares. |
| `marca` | string | Sí | Entre 2 y 120 caracteres. |
| `modelo` | string | Sí | Entre 1 y 120 caracteres. |
| `anio` | integer | Sí | Desde 1950 hasta el año calendario actual + 1. |

HP y horas no son parte del contrato. Si Padawanway posee esos datos, no debe enviarlos esperando que afecten la búsqueda.

### Selección automática

La API mantiene siempre el mismo modelo y aplica esta cascada:

1. Mismo modelo con hasta 2 años de diferencia.
2. Si la muestra es menor a 3, mismo modelo con hasta 5 años de diferencia.
3. Si todavía es insuficiente, mismo modelo de otros años.
4. Si no existe el modelo, devuelve muestra vacía y puede sugerir una familia para búsqueda ampliada.

Los valores se administran del lado de Algorym. Padawanway no necesita exponer controles para modificarlos.

### Response `200`

```json
{
  "requestId": "5e17e5a4-3ac0-44f0-9928-98f9454ca404",
  "mode": "direct",
  "query": {
    "categoria": "Tractores",
    "marca": "John Deere",
    "modelo": "6145J",
    "modeloCanonico": "6145J",
    "configuracion": [],
    "anio": 2016
  },
  "statistics": {
    "currency": "USD",
    "sampleSize": 2,
    "min": 82000,
    "p25": 84000,
    "median": 86000,
    "p75": 88000,
    "max": 90000
  },
  "references": [
    {
      "id": "8451",
      "source": "agrofy",
      "title": "John Deere 6145J usado",
      "brand": "John Deere",
      "model": "6145J",
      "year": 2017,
      "price": {
        "amount": 82000,
        "currency": "USD"
      },
      "seller": "Concesionario externo",
      "province": "Córdoba",
      "city": null,
      "url": "https://marketplace.example/publicacion",
      "coincidencia": {
        "codigo": "MISMO_MODELO_ANIO_CERCANO",
        "titulo": "Mismo modelo y año cercano",
        "detalle": "La publicación corresponde al mismo modelo y tiene 1 año de diferencia.",
        "diferenciaAnios": 1
      },
      "configuracion": []
    }
  ],
  "criterioAplicado": {
    "codigo": "MISMO_MODELO_RANGO_AMPLIADO",
    "titulo": "Mismo modelo con más años de referencia",
    "detalle": "La búsqueda se amplió automáticamente hasta 5 años de diferencia."
  },
  "solidezMuestra": {
    "codigo": "MUESTRA_LIMITADA",
    "titulo": "Muestra limitada",
    "detalle": "Encontramos 2 publicaciones. Conviene complementar con modelos relacionados."
  },
  "expandedSearchRecommended": true,
  "busquedaAmpliadaSugerida": {
    "marca": "John Deere",
    "modelo": "6J",
    "etiqueta": "Buscar modelos de Serie 6J"
  }
}
```

`busquedaAmpliadaSugerida` puede ser `null` cuando la familia del modelo no sea suficientemente clara.

## 2. Búsqueda ampliada

```text
POST {{base_url}}/api/v1/market-references/search
```

Permite consultar modelos relacionados cuando las referencias directas no alcanzan. No transforma esos resultados en comparables exactos.

### Request

```json
{
  "categoria": "Tractores",
  "marca": "John Deere",
  "modelo": "6J",
  "anio": 2016,
  "page": 1,
  "pageSize": 25
}
```

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `categoria` | string | Sí | Mismas categorías que la operación directa. |
| `marca` | string | No | Hasta 120 caracteres. Es recomendable enviarla para mejorar precisión. |
| `modelo` | string | Sí | Texto o familia de modelo, entre 2 y 120 caracteres. |
| `anio` | integer | No | Si se envía, influye en el orden; no excluye publicaciones por año. |
| `page` | integer | No | Desde 1. Valor predeterminado: 1. |
| `pageSize` | integer | No | Entre 1 y 50. Valor predeterminado: 25. |

### Response `200`

```json
{
  "requestId": "0477121e-d105-4801-8dc7-26d4c90c7275",
  "mode": "expanded",
  "query": {
    "categoria": "Tractores",
    "marca": "John Deere",
    "modelo": "6J",
    "modeloCanonico": "6J",
    "configuracion": [],
    "anio": 2016
  },
  "statistics": {
    "currency": "USD",
    "sampleSize": 7,
    "min": 70000,
    "p25": 79000,
    "median": 86000,
    "p75": 97000,
    "max": 110000
  },
  "references": [
    {
      "id": "9123",
      "source": "agroads",
      "title": "John Deere 6190J usado",
      "brand": "John Deere",
      "model": "6190J",
      "year": 2015,
      "price": {
        "amount": 97000,
        "currency": "USD"
      },
      "seller": "Concesionario externo",
      "province": "Santa Fe",
      "city": "Rosario",
      "url": "https://marketplace.example/publicacion-2",
      "coincidencia": {
        "codigo": "MODELO_RELACIONADO",
        "titulo": "Modelo relacionado",
        "detalle": "La publicación coincide con la búsqueda ampliada y tiene 1 año de diferencia.",
        "diferenciaAnios": 1
      },
      "configuracion": []
    }
  ],
  "criterioAplicado": {
    "codigo": "BUSQUEDA_AMPLIADA",
    "titulo": "Referencias de modelos relacionados",
    "detalle": "Resultados ordenados por cercanía con el modelo y el año buscados."
  },
  "solidezMuestra": {
    "codigo": "MUESTRA_SUFICIENTE",
    "titulo": "Muestra suficiente",
    "detalle": "Encontramos 7 publicaciones para consultar precios y características."
  },
  "pagination": {
    "page": 1,
    "pageSize": 25,
    "total": 7,
    "totalPages": 1,
    "hasNextPage": false
  }
}
```

## Estructuras de respuesta

### `statistics`

| Campo | Significado |
|---|---|
| `currency` | Siempre `USD` en `v1`. |
| `sampleSize` | Cantidad total de publicaciones que integran la muestra estadística. |
| `min` | Precio mínimo observado. |
| `p25` | Percentil 25. |
| `median` | Mediana o percentil 50. |
| `p75` | Percentil 75. |
| `max` | Precio máximo observado. |

Cuando no hay referencias, `sampleSize` es `0` y los cinco valores estadísticos son `null`.

### `references[]`

| Campo | Tipo | Uso |
|---|---|---|
| `id` | string | Identificador de la referencia dentro del servicio. No asumir que es global fuera de esta API. |
| `source` | string | Marketplace de origen. |
| `title` | string o null | Título de la publicación. |
| `brand` | string o null | Marca informada. |
| `model` | string o null | Modelo presentado en forma canónica cuando se pudo normalizar. |
| `year` | integer o null | Año publicado. |
| `price.amount` | number | Precio en USD. |
| `seller` | string o null | Vendedor o concesionario publicado. |
| `province` | string o null | Provincia. |
| `city` | string o null | Ciudad. |
| `url` | string | Enlace a la publicación externa. |
| `coincidencia` | object | Explicación comercial de la relación con la búsqueda. |
| `configuracion` | string[] | Características separadas del modelo, por ejemplo plataforma o rodado. |

Las publicaciones propias de Venturino no forman parte de `references` ni de las estadísticas.

## Clasificaciones comerciales

Padawanway debe mostrar `titulo` y, cuando aporte contexto, `detalle`. `codigo` puede utilizarse para lógica estable de interfaz.

### Criterio general de la consulta directa

| Código | Título |
|---|---|
| `MISMO_MODELO_ANIOS_CERCANOS` | Mismo modelo y años cercanos |
| `MISMO_MODELO_RANGO_AMPLIADO` | Mismo modelo con más años de referencia |
| `MISMO_MODELO_OTROS_ANIOS` | Mismo modelo en otros años |
| `SIN_REFERENCIAS_DIRECTAS` | Sin referencias directas |

### Solidez de la muestra

| Código | Regla |
|---|---|
| `SIN_REFERENCIAS` | 0 publicaciones. |
| `MUESTRA_LIMITADA` | 1 o 2 publicaciones. |
| `MUESTRA_SUFICIENTE` | 3 o más publicaciones. |

### Relación de cada publicación

| Código | Significado |
|---|---|
| `MISMO_MODELO_ANIO_CERCANO` | Mismo modelo con hasta 2 años de diferencia. |
| `MISMO_MODELO_ANIO_PROXIMO` | Mismo modelo con 3 a 5 años de diferencia. |
| `MISMO_MODELO_OTRO_ANIO` | Mismo modelo con más de 5 años de diferencia. |
| `MISMO_MODELO_SIN_ANIO` | Mismo modelo, pero la publicación no informa año. |
| `MODELO_RELACIONADO` | Resultado de la búsqueda ampliada que no es el mismo modelo. |

## Normalización de modelos

- Se unifican mayúsculas, espacios y puntuación de una misma identidad.
- Se separan configuraciones comerciales como Draper, ancho de plataforma, botalón, Hydro o rodado.
- Los aliases son específicos por marca y categoría.
- No se eliminan sufijos de forma genérica: `6100D` y `6100E`, por ejemplo, permanecen como modelos distintos.
- `query.modeloCanonico` permite conocer la identidad utilizada por la API.

## Errores

Formato común:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "La solicitud contiene datos inválidos.",
    "details": [
      "anio debe ser un entero entre 1950 y el próximo año calendario."
    ]
  }
}
```

| HTTP | Código | Acción recomendada |
|---|---|---|
| 400 | `INVALID_JSON` | Corregir serialización; no reintentar sin cambios. |
| 400 | `INVALID_INPUT` / `INVALID_MODEL_SEARCH` | Corregir campos; no reintentar sin cambios. |
| 401 | `UNAUTHORIZED` | Revisar client-id, secreto, firma y cuerpo exacto. |
| 401 | `REQUEST_EXPIRED` | Sincronizar reloj y generar timestamp, request-id y firma nuevos. |
| 409 | `DUPLICATE_REQUEST` | Generar un request-id nuevo. |
| 413 | `PAYLOAD_TOO_LARGE` | Reducir el cuerpo. |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Enviar `application/json`. |
| 422 | `SEARCH_TOO_BROAD` | Agregar marca o mayor detalle de modelo. |
| 429 | `RATE_LIMITED` | Respetar el header `Retry-After` y reintentar con request-id nuevo. |
| 500 | `INTERNAL_ERROR` | Reintentar de forma acotada y registrar request-id. |
| 503 | `SERVICE_NOT_CONFIGURED` | Informar a Algorym; la integración no está habilitada. |

## Compatibilidad y versionado

- Campos nuevos opcionales pueden agregarse dentro de `v1`.
- Padawanway debe ignorar campos desconocidos.
- Cambios incompatibles de request, significado o estructura se publicarán bajo una nueva versión.
- Los nombres técnicos de los endpoints `v1` no deben codificarse en múltiples lugares del frontend; conviene centralizarlos en el cliente backend de Padawanway.
