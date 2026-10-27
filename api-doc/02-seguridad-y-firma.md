# Seguridad y firma de requests

## Modelo de acceso

La API utiliza autenticación máquina a máquina mediante HMAC-SHA256.

- El secreto sólo existe en los servidores de Algorym y Padawanway.
- El secreto compartido debe tener al menos 32 caracteres.
- El navegador no recibe `client-id`, secreto ni firma reutilizable.
- No se utilizan cookies de la aplicación Venturino.
- No se requiere CORS porque el consumo es backend a backend.
- Cada request aceptado queda auditado internamente sin guardar el secreto, la firma ni el cuerpo crudo.

## Flujo

1. El backend de Padawanway serializa el cuerpo JSON una sola vez.
2. Genera un Unix timestamp en segundos.
3. Genera un request-id único.
4. Concatena timestamp, request-id y cuerpo exacto con saltos de línea `\n`.
5. Firma ese texto con HMAC-SHA256 y el secreto compartido.
6. Envía los headers y exactamente el mismo cuerpo utilizado para firmar.
7. Algorym valida identidad, ventana temporal, firma, rate limit y no reutilización del request-id.

## Texto canónico

```text
<timestamp>\n<request-id>\n<raw-body>
```

No se firma un objeto JSON reconstruido. Se firman los bytes UTF-8 del string que se envía como body.

Cambiar espacios, orden de propiedades o saltos de línea después de firmar produce `401 UNAUTHORIZED`.

## Headers

```text
Content-Type: application/json
x-client-id: <client-id>
x-timestamp: <Unix timestamp en segundos>
x-request-id: <id único de 8 a 120 caracteres>
x-signature: sha256=<firma hexadecimal de 64 caracteres>
```

El request-id admite letras, números, punto, guion, guion bajo y dos puntos.

## Ejemplo Node.js

```js
import crypto from "node:crypto";

const baseUrl = process.env.VENTURINO_API_URL;
const clientId = process.env.VENTURINO_API_CLIENT_ID;
const secret = process.env.VENTURINO_API_SECRET;

async function callMarketReferenceApi(path, payload) {
  const rawBody = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const requestId = crypto.randomUUID();
  const canonical = `${timestamp}\n${requestId}\n${rawBody}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(canonical, "utf8")
    .digest("hex");

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-client-id": clientId,
      "x-timestamp": timestamp,
      "x-request-id": requestId,
      "x-signature": `sha256=${signature}`,
    },
    body: rawBody,
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.error?.message ?? "Error de referencias de mercado");
    error.status = response.status;
    error.code = data?.error?.code;
    error.requestId = requestId;
    throw error;
  }

  return data;
}

const result = await callMarketReferenceApi(
  "/api/v1/market-references/direct",
  {
    categoria: "Tractores",
    marca: "John Deere",
    modelo: "6145J",
    anio: 2016,
  },
);
```

## Vector de prueba independiente

Este vector utiliza un secreto ficticio y sirve para comprobar implementaciones en cualquier lenguaje.

### Datos

```text
secret:     0123456789abcdef0123456789abcdef
timestamp:  1784592000
request-id: meeting-test-0001
```

Body exacto, sin salto de línea final:

```json
{"categoria":"Tractores","marca":"John Deere","modelo":"6145J","anio":2016}
```

Texto canónico conceptual:

```text
1784592000\nmeeting-test-0001\n{"categoria":"Tractores","marca":"John Deere","modelo":"6145J","anio":2016}
```

Firma esperada:

```text
666ef1df820bda0fb2daefeda6ec240fbce03c7a805ef9b20f0a18df0a653b5d
```

Header esperado:

```text
x-signature: sha256=666ef1df820bda0fb2daefeda6ec240fbce03c7a805ef9b20f0a18df0a653b5d
```

## Ventana temporal y replay

- Ventana temporal predeterminada: 5 minutos.
- El reloj del servidor de Padawanway debe estar sincronizado.
- Cada intento debe usar un request-id nuevo.
- Un request-id aceptado no puede reutilizarse, aunque el body sea idéntico.

### Reintentos

| Situación | Acción |
|---|---|
| Timeout de red o conexión interrumpida | Reintentar de forma acotada con timestamp, request-id y firma nuevos. |
| `429 RATE_LIMITED` | Esperar `Retry-After` y usar request-id nuevo. |
| `500 INTERNAL_ERROR` | Reintentar una cantidad limitada y registrar request-id. |
| `400`, `401`, `409`, `413`, `415` o `422` | Corregir la causa antes de volver a intentar. |

La operación es de sólo lectura. Un nuevo intento no modifica publicaciones ni genera una tasación, aunque sí queda como una consulta adicional en la auditoría interna.

## Almacenamiento de credenciales

Padawanway debe mantener estas variables únicamente en su backend:

```text
VENTURINO_API_URL=https://venturino.algorym.app
VENTURINO_API_CLIENT_ID
VENTURINO_API_SECRET
```

`VENTURINO_API_URL` no debe incluir `/api/v1` ni terminar con `/`.

Requisitos:

- utilizar un gestor de secretos o variables protegidas del entorno;
- no guardar el secreto en Git, frontend, logs, analytics ni herramientas de monitoreo;
- no incluir headers firmados completos en logs de aplicación;
- rotar el secreto si existe sospecha de exposición;
- intercambiar el secreto inicial y sus rotaciones mediante un canal seguro diferente del correo ordinario.

## Rate limit y protección perimetral

- Configuración inicial esperada: 60 requests por minuto para el cliente de Padawanway.
- La API responde `429` y envía `Retry-After` cuando se supera el límite.
- Algorym puede complementar esta protección con límites por IP en el proxy de infraestructura.
- Revisar volumen, timeout y reintentos si el uso operativo crece o cambia de patrón.

## Checklist de seguridad de Padawanway

- [ ] La llamada se realiza sólo desde backend.
- [ ] El secreto no forma parte del bundle del navegador.
- [ ] El body se serializa una sola vez y no cambia después de firmarse.
- [ ] Timestamp en segundos, no milisegundos.
- [ ] Request-id nuevo en cada intento.
- [ ] Los logs omiten secreto y firma.
- [ ] Los errores no se muestran con información técnica sensible al vendedor.
