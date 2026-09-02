# Cambio procesado: superadmin y observabilidad de la API

Estado: implementado; validación de entorno pendiente
Fecha: 2026-09-02
Origen: conversación con Algorym sobre mejora continua de la integración Venturino–Padawanway

## Objetivo

Incorporar una vista interna y exclusiva de Algorym para observar el uso de la API de referencias de mercado, revisar casos reales y recibir alertas accionables, sin modificar la experiencia de Venturino ni el contrato actual de Padawanway.

## Alcance implementado

- Segundo juego de credenciales por entorno para Algorym.
- Nivel de acceso `VENTURINO` o `SUPERADMIN` firmado dentro del JWT.
- Compatibilidad con tokens anteriores sin `accessLevel`.
- Protección server-side de `/superadmin/**`, `/api/superadmin/**` y procesos administrativos.
- Panel resumen y explorador paginado de consultas.
- Detalle de input, normalización, estadísticas, referencias, errores y tiempos.
- Revisión interna de consultas para formar casos de mejora del matching.
- Auditoría iniciada después de HMAC y antes de rate limit, JSON y validación funcional.
- Alertas SMTP accionables con sanitización, fingerprint, umbral, cooldown, cola acotada y reintento.
- Prueba manual de SMTP desde el superadmin.

## Compatibilidad

- `AUTH_USER` y `AUTH_PASSWORD` se conservan para Venturino.
- El login mantiene la misma pantalla y no presenta selector de rol.
- Venturino no ve navegación ni páginas superadmin.
- Padawanway mantiene los mismos endpoints, headers, bodies y responses.
- No se incorporan usuarios en DB, cron, Redis, worker ni servicio externo de notificaciones.

## Criterios de aceptación

- [x] Las credenciales actuales siguen creando una sesión Venturino.
- [x] Las credenciales adicionales crean una sesión superadmin.
- [x] Los tokens históricos se interpretan como Venturino.
- [x] Un usuario Venturino no accede a páginas ni APIs superadmin.
- [x] La tabla de consultas permite filtros, paginación y detalle.
- [x] Cada consulta puede revisarse con estado, motivo y nota interna.
- [x] Los errores autenticados previos al matching pueden quedar auditados.
- [x] Las alertas no bloquean ni modifican la respuesta de Padawanway.
- [x] Los secretos se redactan antes de construir correos o snapshots técnicos.
- [x] El contrato público de Padawanway no cambia.

## Validación pendiente en el entorno local del repositorio

- `npm run test:superadmin`
- `npm run test:market-reference`
- `npx prisma validate`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- navegación real con credencial Venturino y credencial Algorym;
- aplicación del cambio de schema en una base de desarrollo;
- envío SMTP real con variables de prueba.

## Impacto MCP/IA

Estado: `contrato-candidato`.

Capacidades futuras:

- consultar métricas de uso de la API;
- listar consultas paginadas y filtradas;
- registrar una revisión interna.

No se implementa MCP en este cambio.
