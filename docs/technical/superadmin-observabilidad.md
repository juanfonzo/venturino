# Superadmin Y Observabilidad De La API

Última revisión: 2026-09-03.

## Propósito

El módulo permite a Algorym observar el uso de la integración Padawanway, detectar fallas y revisar resultados del matching sin exponer información técnica a los usuarios de Venturino.

## Acceso

La aplicación mantiene dos pares de credenciales administrados por entorno:

```env
AUTH_USER=
AUTH_PASSWORD=
SUPERADMIN_USER=
SUPERADMIN_PASSWORD=
```

- `AUTH_*`: sesión `VENTURINO` y navegación habitual.
- `SUPERADMIN_*`: sesión `SUPERADMIN` y acceso adicional a `/superadmin`.
- No hay selector de rol ni tabla de usuarios.
- `SUPERADMIN_USER` debe ser distinto de `AUTH_USER`; una colisión no eleva permisos.
- Un JWT histórico sin `accessLevel` se interpreta como `VENTURINO`.
- Toda autorización sensible vuelve a validarse en servidor.

## Rutas

| Ruta | Uso | Acceso |
|---|---|---|
| `/superadmin` | KPIs, fallas recientes, alertas y procesos | `SUPERADMIN` |
| `/superadmin/requests` | Consulta paginada y filtrada de auditoría | `SUPERADMIN` |
| `/superadmin/requests/[id]` | Detalle y revisión interna | `SUPERADMIN` |
| `POST /api/superadmin/market-reference-queries/[id]/review` | Guardar revisión | `SUPERADMIN` |
| `POST /api/superadmin/alerts/test` | Probar SMTP | `SUPERADMIN` |
| `/api/admin/processes` | Ejecutar procesos allowlist | `SUPERADMIN` |

## Auditoría

`MarketReferenceQuery` mantiene la trazabilidad existente y agrega:

- `requestPayload` sanitizado;
- `httpStatus`;
- `failureStage`;
- `algorithmVersion`;
- `criterionCode`;
- `sampleStrengthCode`;
- revisión interna;
- fecha de alerta encolada.

La auditoría comienza luego de verificar la firma HMAC. Las solicitudes no autenticadas no persisten su cuerpo. Una vez autenticado el request, pueden quedar registrados fallos de rate limit, JSON, validación, matching o cierre de auditoría.

## Revisión Interna

Estados:

- `unreviewed`;
- `correct`;
- `review`;
- `incorrect`.

Los motivos son internos y no alteran la respuesta enviada a Padawanway. Al volver a `unreviewed` se limpian motivo, nota y metadatos de revisión.

## Alertas

La implementación toma como referencia el comportamiento de `whatsapp-python` y lo adapta a Node:

- activación automática explícita sólo en producción;
- incidentes marcados, no cualquier log;
- fingerprint y cooldown;
- umbrales por política;
- sanitización de secretos;
- cola en memoria con máximo de entregas concurrentes;
- dos intentos de SMTP;
- liberación del cooldown si la entrega falla;
- el canal nunca propaga su error al request de negocio.

Variables:

```env
APP_ENV=production
APP_RELEASE=
ALERT_EMAIL_ENABLED=true
ALERT_SERVICE_NAME=venturino
ALERT_COOLDOWN_SECONDS=900
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_TO=algorym.adm@gmail.com
SMTP_FROM=
```

El cliente SMTP usa STARTTLS. La prueba manual puede ejecutarse en desarrollo cuando SMTP está configurado; las alertas automáticas siguen desactivadas. La primera versión no agrega Redis, outbox, cron ni worker.

## Paginación

El explorador usa paginación server-side de 25 registros y filtros aplicados en PostgreSQL. No descarga la auditoría completa al navegador.

## Límites Del Alcance

- No mide el resultado comercial final de la toma de usados.
- No solicita `operationId` ni feedback a Padawanway.
- No monitorea una caída total del contenedor desde fuera del proceso.
- La cola y el cooldown de alertas se reinician si reinicia la aplicación.
- El módulo ya se usa para revisar consultas reales; la entrega SMTP sigue condicionada a que el entorno tenga variables SMTP válidas.
