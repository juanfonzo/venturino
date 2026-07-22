# Pruebas con Postman

## Objetivo

Postman puede utilizarse para probar la API como si fuera el backend de Padawanway. La prueba debe incluir firma HMAC, casos funcionales y casos negativos.

El secreto utilizado en Postman debe ser exclusivo del ambiente de prueba.

## Variables

Crear un environment local con:

| Variable | Ejemplo | Sensibilidad |
|---|---|---|
| `base_url` | `https://api-pruebas.example.com` | No sensible. |
| `client_id` | `padawanway-test` | Media. |
| `force_request_id` | vacío | Sólo para probar replay. |
| `force_timestamp` | vacío | Sólo para probar timestamp vencido. |
| `force_invalid_signature` | vacío | Sólo para probar autenticación inválida. |

Guardar el secreto en Postman Vault con el nombre:

```text
padawanway-api-secret
```

No exportar el secreto dentro del environment o la colección.

Postman Vault funciona para ejecución manual y requiere habilitar el acceso a secretos desde scripts. Para Postman CLI debe inyectarse el secreto como variable segura del proceso; Vault no está disponible en ejecuciones CLI o Newman.

## Request directo

Método y URL:

```text
POST {{base_url}}/api/v1/market-references/direct
```

Body `raw` / `JSON`:

```json
{
  "categoria": "Tractores",
  "marca": "John Deere",
  "modelo": "6145J",
  "anio": 2016
}
```

## Request ampliado

Método y URL:

```text
POST {{base_url}}/api/v1/market-references/search
```

Body:

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

## Script previo para firma

Agregar este script en `Scripts > Pre-request` a nivel de la colección.

Utiliza Web Crypto, que es la alternativa vigente recomendada por Postman para operaciones criptográficas.

```js
const { Buffer } = require("buffer");

const clientId = pm.environment.get("client_id");
const forcedRequestId = pm.environment.get("force_request_id");
const forcedTimestamp = pm.environment.get("force_timestamp");
const requestId = forcedRequestId || pm.variables.replaceIn("{{$guid}}");
const timestamp = forcedTimestamp || Math.floor(Date.now() / 1000).toString();
const rawBody = pm.request.body?.raw ?? "";
const secret = await pm.vault.get("padawanway-api-secret");

if (!clientId) throw new Error("Falta la variable client_id");
if (!secret) throw new Error("Falta el secreto padawanway-api-secret en Postman Vault");
if (!rawBody) throw new Error("El request debe tener un body raw JSON");

const key = await crypto.subtle.importKey(
  "raw",
  Buffer.from(secret, "utf8"),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"],
);

const canonical = `${timestamp}\n${requestId}\n${rawBody}`;
const signed = await crypto.subtle.sign(
  "HMAC",
  key,
  Buffer.from(canonical, "utf8"),
);

let signature = Buffer.from(signed).toString("hex");
if (pm.environment.get("force_invalid_signature") === "true") {
  signature = "0".repeat(64);
}

pm.request.headers.upsert({ key: "Content-Type", value: "application/json" });
pm.request.headers.upsert({ key: "x-client-id", value: clientId });
pm.request.headers.upsert({ key: "x-timestamp", value: timestamp });
pm.request.headers.upsert({ key: "x-request-id", value: requestId });
pm.request.headers.upsert({ key: "x-signature", value: `sha256=${signature}` });

pm.variables.set("last_request_id", requestId);
```

Para evitar diferencias de firma, los bodies de la colección de prueba no deben contener variables sin resolver ni modificarse después de ejecutar el script.

### Alternativa sin Vault

Para una ejecución técnica local puede reemplazarse:

```js
const secret = await pm.vault.get("padawanway-api-secret");
```

por:

```js
const secret = pm.environment.get("client_secret");
```

En ese caso `client_secret` debe existir sólo como valor local, marcarse sensible y no exportarse.

## Tests posteriores

Agregar en `Scripts > Post-response` del request exitoso:

```js
pm.test("Responde 200", () => {
  pm.response.to.have.status(200);
});

const data = pm.response.json();

pm.test("Contrato base válido", () => {
  pm.expect(data.requestId).to.be.a("string");
  pm.expect(["direct", "expanded"]).to.include(data.mode);
  pm.expect(data.statistics.currency).to.eql("USD");
  pm.expect(data.statistics.sampleSize).to.be.a("number");
  pm.expect(data.references).to.be.an("array");
  pm.expect(data.criterioAplicado.titulo).to.be.a("string");
  pm.expect(data.solidezMuestra.titulo).to.be.a("string");
});

function collectKeys(value, output = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectKeys(item, output));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      output.push(key.toLowerCase());
      collectKeys(item, output);
    });
  }
  return output;
}

pm.test("No expone campos excluidos", () => {
  const keys = collectKeys(data);
  ["hp", "horas"].forEach((forbidden) => {
    pm.expect(keys).not.to.include(forbidden);
  });
});

pm.test("Referencias con precio USD y URL", () => {
  data.references.forEach((reference) => {
    pm.expect(reference.price.currency).to.eql("USD");
    pm.expect(reference.price.amount).to.be.a("number");
    pm.expect(reference.url).to.match(/^https?:\/\//);
    pm.expect(reference.coincidencia.titulo).to.be.a("string");
  });
});
```

## Matriz de pruebas

| Caso | Request | Resultado esperado |
|---|---|---|
| Directo con referencias | `6145J`, año 2016 | `200`, referencias directas y criterio en español. |
| Alias normalizado | `5075ED`, año 2013 | `query.modeloCanonico` igual a `5075E`. Puede tener muestra directa vacía. |
| Sin directas | `T8295 270`, año 2016 | `200`, `expandedSearchRecommended=true` y sugerencia de familia T8 cuando corresponda. |
| Búsqueda ampliada | Familia `6J` | `200`, resultados paginados de la familia, sin líneas no relacionadas. |
| Modelo sin publicaciones | Modelo ficticio suficientemente específico | `200`, muestra 0 y lista vacía. |
| Firma inválida | `force_invalid_signature=true` | `401 UNAUTHORIZED`. |
| Replay | Fijar `force_request_id`, enviar dos veces | Primer request aceptado; segundo `409 DUPLICATE_REQUEST`. |
| Timestamp vencido | Fijar `force_timestamp` con un Unix timestamp antiguo | `401 REQUEST_EXPIRED`. |
| Input inválido | Omitir `anio` en directo | `400 INVALID_INPUT`. |
| Categoría inválida | `categoria="Camiones"` | `400 INVALID_INPUT`. |
| Content-Type inválido | Enviar `text/plain` | `415 UNSUPPORTED_MEDIA_TYPE`. |
| Paginación inválida | `pageSize=100` | `400 INVALID_INPUT`. |

Después de los casos negativos, limpiar `force_request_id`, `force_timestamp` y `force_invalid_signature`.

## Criterios de aceptación conjunta

- [ ] Padawanway puede generar la misma firma que Algorym.
- [ ] Una consulta directa válida devuelve `200`.
- [ ] Los textos visibles están en español.
- [ ] No aparecen HP, horas ni metadatos internos.
- [ ] Los enlaces externos son utilizables.
- [ ] Replay, firma inválida e input inválido se manejan sin exponer detalles sensibles.
- [ ] Padawanway registra request-id, status y código de error para soporte, pero no firma ni secreto.

## Automatización opcional

La colección puede ejecutarse con Postman CLI. El secreto debe inyectarse desde el gestor de secretos del entorno y no versionarse dentro del archivo de environment.

Para colecciones exportadas en formato 2.1 también puede utilizarse Newman, teniendo presente que Newman no soporta Postman Vault ni paquetes externos de Postman.

## Referencias de Postman

- [Scripts previos a un request](https://learning.postman.com/latest-v-12/docs/tests-and-scripts/write-scripts/pre-request-scripts)
- [Web Crypto y paquetes disponibles en scripts](https://learning.postman.com/docs/tests-and-scripts/write-scripts/postman-sandbox-reference/pm-require)
- [Uso de secretos con Postman Vault](https://learning.postman.com/docs/use/postman-vault/use-vault-secrets)
- [Ejecución de colecciones con Newman](https://learning.postman.com/docs/reference/newman-cli/installing-running-newman)
