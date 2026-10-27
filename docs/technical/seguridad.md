# Seguridad

Última revisión: 2026-09-03.

## Estado Real

El sistema tiene autenticación simple con dos identidades fijas para la app interna:

- Login con `AUTH_*` para Venturino y `SUPERADMIN_*` para Algorym, desde variables de entorno.
- JWT firmado con `jose`.
- Cookie HttpOnly `venturino_token`.
- `proxy.ts` protege rutas privadas por defecto.
- No hay usuarios en DB.
- No hay roles configurables, tenant ni sucursales. Sólo existen los niveles fijos `VENTURINO` y `SUPERADMIN`.
- No hay signup/autoregistro.

## Autenticación

| Aspecto | Estado |
|---|---|
| Proveedor | Propio simple en `lib/auth.ts` |
| Credenciales | `AUTH_USER`, `AUTH_PASSWORD`, `SUPERADMIN_USER`, `SUPERADMIN_PASSWORD` |
| Secreto JWT | `JWT_SECRET`, fallback dev hardcodeado |
| Login UI | `app/login/page.tsx` |
| Login API | `POST /api/auth/login` |
| Logout API | `POST /api/auth/logout` |
| Cookie | `venturino_token`, HttpOnly, SameSite Lax, secure en producción |
| Expiración | 7 días |

## Rutas Públicas Y Privadas

Públicas según `proxy.ts`:

- `/login`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/postventa/analyze`
- `/api/v1/market-references/**`
- assets estáticos y `_next`

Toda otra ruta matcheada requiere cookie válida y redirige a `/login` si falta o falla token.

Observación: `/api/postventa/analyze` está en lista pública del middleware, pero el handler limita por host local. Documentar y revisar antes de exponer operaciones postventa desde UI.

Las rutas `/api/v1/market-references/**` son públicas sólo para que no dependan de la cookie web. Cada handler exige autenticación HMAC máquina a máquina antes de consultar datos.

## Integración Padawanway

- Identidad técnica por `PADAWANWAY_API_CLIENT_ID` y secreto compartido de al menos 32 caracteres.
- Firma HMAC-SHA256 sobre `<timestamp>\n<request-id>\n<raw-body>`.
- Timestamp con ventana corta, comparación timing-safe y request-id único persistido para evitar replay.
- Rate limit aplicado después de validar la firma, para que requests falsos no consuman la cuota de Padawanway. El proxy de despliegue debe limitar tráfico no autenticado por IP.
- Requests limitados a JSON y 16 KB; respuestas con `Cache-Control: no-store`.
- La API permanece deshabilitada salvo `PADAWANWAY_API_ENABLED=true`.
- No se configura CORS porque Padawanway consume desde su backend; el secreto nunca debe llegar al navegador.
- La auditoría no guarda firma, secreto ni cuerpo crudo.

## Claims De Sesión

Payload actual:

```ts
{ user: string, accessLevel: "VENTURINO" | "SUPERADMIN" }
```

Los tokens históricos sin `accessLevel` se interpretan como `VENTURINO`. No incluye tenant, roles configurables, permisos granulares ni unidad operativa.

## Signup/Registro

Estado: `signup no-aplica`.

La app no contempla autoregistro. El acceso se crea/configura por variables de entorno (`AUTH_USER`, `AUTH_PASSWORD`) administradas por el equipo/infraestructura.

## Tenant, Roles Y Permisos

- Tenant obligatorio: no implementado.
- Roles configurables: no implementados; existen dos niveles fijos.
- Permisos granulares: no implementados; las rutas superadmin se validan server-side.
- Alcance de datos: app interna single-tenant para Venturino.

No asumir permisos finos en futuras features. Si se agregan usuarios reales, administración, datos sensibles por rol o módulos operativos, aplicar `docs/ai/AUTH_POLICY.md` y rediseñar auth server-side.

## Acceso Interno

No hay header secreto dedicado.

Endpoints operativos protegidos por host local:

- `POST /api/sync-fx-rate`
- `POST /api/postventa/analyze`

Riesgo: validan `host` (`localhost`/`127.0.0.1`), no identidad técnica. Suficiente para cron local controlado, pero no para exposición externa. El pipeline `pipeline:postventa` ya no depende de este endpoint: ejecuta `runPostventaAnalysis` directo desde el script.

Endpoints operativos protegidos por sesión `SUPERADMIN`:

- `POST /api/admin/processes`

Este endpoint se usa desde Superadmin para ejecutar únicamente procesos allowlist: `pipeline:live` y `pipeline:postventa`. No acepta comandos arbitrarios, usa mutex por acción y timeout. La ejecución se dispara en segundo plano y la UI consulta estado con `GET /api/admin/processes` para evitar timeouts HTTP/proxy durante pipelines largos. Riesgo residual: el permiso depende de una identidad fija; si se agregan usuarios reales, debe migrarse a roles/autorización granular.

## Datos Sensibles

| Dato | Sensibilidad | Estado |
|---|---|---|
| `DATABASE_URL` | alta | Sólo entorno, no exponer. |
| `MONGODB_URI` | alta | Sólo entorno/scripts, no exponer. |
| `AUTH_PASSWORD` | alta | Sólo entorno, no loguear. |
| `JWT_SECRET` | alta | Sólo entorno. |
| `PADAWANWAY_API_SECRET` | alta | Sólo backend/entorno; nunca navegador, respuesta o logs. |
| URLs públicas de publicaciones | baja/media | Visibles en UI. |
| Datos de negocio de precios/capital | media | App interna autenticada. |

## Auditoría

- No hay auditoría persistida de login/logout.
- Scripts y endpoints imprimen logs operativos, no auditoría de usuario.
- Postventa registra corridas y estados en DB.
- Ingesta de maquinaria registra corridas en `ScrapingRun`.
- Las consultas aceptadas de Padawanway se registran en `MarketReferenceQuery`, incluidas fallas posteriores a autenticación; los rechazos sin identidad válida no persisten contenido no confiable.

## Riesgos

| Riesgo | Severidad | Mitigación actual | Acción recomendada |
|---|---|---|---|
| Fallback `JWT_SECRET` dev hardcodeado | media | Variables en deploy | Exigir `JWT_SECRET` en producción y documentar `.env.example`. |
| Sólo dos identidades fijas | media | Separación Venturino/Superadmin server-side | Migrar a usuarios y autorización granular si crece el equipo. |
| Control manual de pipelines | media | Requiere Superadmin y allowlist server-side | Mantener fuera de Venturino; migrar a rol/admin al crear usuarios reales. |
| Endpoints locales por host | media | Cron dentro de contenedor/host | Usar header secreto si se exponen desde UI o red externa. |
| `/api/postventa/analyze` público en middleware | media | Handler exige localhost | Revisar antes de UI postventa. |
| Sin rate limiting login | baja/media | App interna | Agregar si se expone públicamente. |
| Sin auditoría auth | baja/media | Logs básicos | Agregar si hay usuarios reales. |

## Criterio Para Futuras Tareas

- Mantener rutas privadas por defecto.
- No confiar en frontend para autorización.
- Si aparecen usuarios reales, roles, tenant, sucursales o datos sensibles por perfil, migrar a modelo de auth completo antes de implementar módulos críticos.
- Para MCP futuro, exigir permisos server-side y no exponer secretos ni datasets completos.

## Addendum 2026-09-02 — Superadmin

- Se mantienen `AUTH_USER` y `AUTH_PASSWORD` para Venturino.
- `SUPERADMIN_USER` y `SUPERADMIN_PASSWORD` habilitan un segundo acceso exclusivo de Algorym; el username debe ser distinto de `AUTH_USER`.
- El JWT agrega `accessLevel: "VENTURINO" | "SUPERADMIN"`; tokens previos sin claim se interpretan como `VENTURINO`.
- `/superadmin/**`, `/api/superadmin/**` y `/api/admin/processes` requieren autorización `SUPERADMIN` del lado servidor.
- No existe selector de rol, signup ni tabla de usuarios.
- El body de Padawanway sólo se persiste luego de validar HMAC y se sanitiza antes de almacenarse.
- Las alertas SMTP sólo se disparan automáticamente en producción con `ALERT_EMAIL_ENABLED=true`; el test manual exige superadmin y configuración SMTP válida.
- Nunca exponer en UI/correos: contraseñas, JWT, cookies, `DATABASE_URL`, `MONGODB_URI`, firma/secreto Padawanway ni credenciales SMTP.
- Este patrón de dos identidades fijas no debe ampliarse a más perfiles; si aparecen nuevos usuarios o permisos, migrar a identidades persistidas y autorización granular.
