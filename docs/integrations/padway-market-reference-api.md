# API de referencias de mercado para Padway

Versión: `v1`

## Uso

La API debe consumirse desde el backend de Padway. No se deben enviar el client-id ni el secreto al navegador.

Todas las consultas trabajan con maquinaria `Usado`, precios normalizados en USD y publicaciones externas. La API no devuelve HP, horas, información de scraping ni una tasación o recomendación comercial.

Los textos de `criterioAplicado`, `solidezMuestra` y `coincidencia` están preparados para mostrarse al vendedor: siempre se devuelven en español y con lenguaje comercial. Los campos `codigo` son identificadores técnicos estables; la interfaz debe mostrar `titulo` y, cuando corresponda, `detalle`.

## Autenticación

Headers obligatorios:

```text
Content-Type: application/json
x-client-id: <client-id entregado por Algorym>
x-timestamp: <Unix timestamp en segundos>
x-request-id: <identificador único de 8 a 120 caracteres>
x-signature: sha256=<firma hexadecimal>
```

La firma es HMAC-SHA256 sobre el siguiente texto, usando el cuerpo JSON exacto que se enviará:

```text
<timestamp>\n<request-id>\n<raw-body>
```

Ejemplo Node.js:

```js
import crypto from "node:crypto";

const body = JSON.stringify({
  categoria: "Tractores",
  marca: "John Deere",
  modelo: "6110 J",
  anio: 2021,
  externalOperationId: "toma-12345",
});
const timestamp = Math.floor(Date.now() / 1000).toString();
const requestId = crypto.randomUUID();
const canonical = `${timestamp}\n${requestId}\n${body}`;
const signature = crypto.createHmac("sha256", process.env.VENTURINO_API_SECRET)
  .update(canonical, "utf8")
  .digest("hex");

const response = await fetch(`${process.env.VENTURINO_API_URL}/api/v1/market-references/direct`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-client-id": process.env.VENTURINO_API_CLIENT_ID,
    "x-timestamp": timestamp,
    "x-request-id": requestId,
    "x-signature": `sha256=${signature}`,
  },
  body,
});
```

El timestamp admite una diferencia máxima de cinco minutos. Un `x-request-id` aceptado no puede volver a utilizarse.

## Referencias directas

`POST /api/v1/market-references/direct`

Request:

```json
{
  "categoria": "Tractores",
  "marca": "John Deere",
  "modelo": "6110 J",
  "anio": 2021,
  "externalOperationId": "toma-12345"
}
```

Categorías permitidas: `Tractores`, `Cosechadoras`, `Sembradoras`, `Pulverizadoras`.

Response `200`:

```json
{
  "requestId": "5e17e5a4-3ac0-44f0-9928-98f9454ca404",
  "mode": "direct",
  "query": {
    "categoria": "Tractores",
    "marca": "John Deere",
    "modelo": "6110 J",
    "modeloCanonico": "6110J",
    "configuracion": [],
    "anio": 2021
  },
  "statistics": {
    "currency": "USD",
    "sampleSize": 4,
    "min": 75000,
    "p25": 81250,
    "median": 87500,
    "p75": 93750,
    "max": 100000
  },
  "references": [
    {
      "id": "8451",
      "source": "agrofy",
      "title": "John Deere 6110 J usado",
      "brand": "John Deere",
      "model": "6110 J",
      "year": 2021,
      "price": { "amount": 87500, "currency": "USD" },
      "seller": "Concesionario",
      "province": "Córdoba",
      "city": null,
      "url": "https://marketplace.example/publicacion",
      "coincidencia": {
        "codigo": "MISMO_MODELO_ANIO_CERCANO",
        "titulo": "Mismo modelo y año cercano",
        "detalle": "La publicación corresponde al mismo modelo y año.",
        "diferenciaAnios": 0
      },
      "configuracion": []
    }
  ],
  "criterioAplicado": {
    "codigo": "MISMO_MODELO_ANIOS_CERCANOS",
    "titulo": "Mismo modelo y años cercanos",
    "detalle": "Publicaciones del mismo modelo hasta 2 años de diferencia."
  },
  "solidezMuestra": {
    "codigo": "MUESTRA_SUFICIENTE",
    "titulo": "Muestra suficiente",
    "detalle": "Encontramos 4 publicaciones para consultar precios y características."
  },
  "expandedSearchRecommended": false,
  "busquedaAmpliadaSugerida": {
    "marca": "John Deere",
    "modelo": "6J",
    "etiqueta": "Buscar modelos de Serie 6J"
  }
}
```

La API busca siempre el mismo modelo canónico. Para evitar que el vendedor tenga que ajustar filtros, primero usa años cercanos; si la muestra no llega a tres publicaciones amplía automáticamente el rango y, como último recurso, muestra el mismo modelo de otros años. `criterioAplicado` explica cuál de esos niveles fue necesario.

`expandedSearchRecommended` será `true` cuando existan menos de tres referencias directas. `busquedaAmpliadaSugerida` puede ser `null` cuando no haya una familia de modelos suficientemente clara.

## Búsqueda ampliada

`POST /api/v1/market-references/search`

Request:

```json
{
  "categoria": "Tractores",
  "marca": "John Deere",
  "modelo": "6R",
  "anio": 2021,
  "page": 1,
  "pageSize": 25,
  "externalOperationId": "toma-12345"
}
```

`marca`, `anio` y `externalOperationId` son opcionales. `pageSize` usa 25 por defecto y admite un máximo de 50. El año ayuda a ordenar por cercanía, pero no elimina resultados: esta operación está pensada para aportar contexto cuando no hay suficientes publicaciones del modelo exacto.

La respuesta mantiene `statistics` y `references`, y agrega:

```json
{
  "criterioAplicado": {
    "codigo": "BUSQUEDA_AMPLIADA",
    "titulo": "Referencias de modelos relacionados",
    "detalle": "Resultados ordenados por cercanía con el modelo y el año buscados."
  },
  "solidezMuestra": {
    "codigo": "MUESTRA_SUFICIENTE",
    "titulo": "Muestra suficiente",
    "detalle": "Encontramos 38 publicaciones para consultar precios y características."
  },
  "pagination": {
    "page": 1,
    "pageSize": 25,
    "total": 38,
    "totalPages": 2,
    "hasNextPage": true
  }
}
```

Los resultados de este endpoint son referencias orientativas elegidas mediante la búsqueda del vendedor, no comparables directos.

## Normalización de modelos

- La API unifica diferencias de escritura como espacios, puntos y mayúsculas.
- Separa configuraciones comerciales como plataforma Draper, ancho de plataforma, botalón o rodado cuando están informadas.
- Sólo unifica sufijos cuando existe una regla específica para marca y categoría. Sufijos que representan líneas distintas, por ejemplo `6100D` y `6100E`, permanecen separados.
- `query.modeloCanonico` informa qué identidad utilizó el servicio. `query.configuracion` y `references[].configuracion` conservan las características separadas que pueden aportar contexto al vendedor.

## Errores

Formato común:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "La solicitud contiene datos inválidos.",
    "details": ["anio debe ser un entero entre 1950 y 2027."]
  }
}
```

| HTTP | Código | Significado |
|---|---|---|
| 400 | `INVALID_JSON` / `INVALID_INPUT` | Cuerpo o campos inválidos. |
| 401 | `UNAUTHORIZED` / `REQUEST_EXPIRED` | Firma inválida o timestamp vencido. |
| 409 | `DUPLICATE_REQUEST` | El request-id ya fue utilizado. |
| 413 | `PAYLOAD_TOO_LARGE` | El cuerpo supera 16 KB. |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | El cuerpo no fue enviado como `application/json`. |
| 422 | `SEARCH_TOO_BROAD` | La búsqueda necesita más detalle. |
| 429 | `RATE_LIMITED` | Se superó el límite por minuto. |
| 500 | `INTERNAL_ERROR` | Error interno controlado. |
| 503 | `SERVICE_NOT_CONFIGURED` | Integración no habilitada en el ambiente. |

Las respuestas incluyen `Cache-Control: no-store`. Ante `429`, respetar el header `Retry-After`.
