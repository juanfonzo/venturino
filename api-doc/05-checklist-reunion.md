# Checklist para la reunión con Padawanway

## Resultado esperado

Salir de la reunión con el contrato técnico entendido, responsabilidades asignadas y una fecha para la prueba conjunta.

## Agenda sugerida

### 1. Objetivo funcional

- Confirmar que la solución brinda referencias de mercado, no una tasación.
- Repasar los dos bloques: referencias directas y búsqueda ampliada.
- Confirmar que HP y horas quedan fuera de la primera versión.

### 2. Flujo de integración

- Dashboard y frontend: Padawanway.
- Cliente backend y firma HMAC: Padawanway.
- API, datos, matching y auditoría: Algorym.
- Consumo exclusivo backend a backend.

### 3. Contrato

- `POST /api/v1/market-references/direct`.
- `POST /api/v1/market-references/search`.
- Paginación del endpoint ampliado.
- Campos opcionales y valores `null`.
- `configuracion=[]` significa que no se detectaron características adicionales; no es un error.

### 4. Seguridad

- Client-id y secreto compartido.
- Firma del body exacto.
- Timestamp y request-id único.
- Canal de intercambio de credenciales.
- Política de logs y reintentos.

### 5. Interfaz

- Presentación de estadísticas y publicaciones.
- Tratamiento de muestra limitada y resultado vacío.
- Acción para abrir búsqueda ampliada.
- Posibilidad de editar marca/modelo en la búsqueda ampliada.
- Ocultar configuraciones comerciales cuando el array esté vacío.
- Apertura de enlaces externos.
- Lenguaje de referencias, no tasación.

### 6. Pruebas y producción

- URL productiva confirmada: `https://venturino.algorym.app`.
- Decisión sobre ambiente de prueba separado o smoke test productivo controlado.
- Prueba Postman inicial.
- Prueba desde el backend real de Padawanway.
- Criterios de aceptación.
- Fecha tentativa de habilitación para uso comercial.

## Preguntas para Guillermo

1. ¿Qué tecnología y versión utiliza el backend de Padawanway?
2. ¿Necesitan un ejemplo de firma en ese lenguaje además del ejemplo Node.js?
3. ¿Prefieren un ambiente y credenciales de prueba separados o realizar un smoke test productivo controlado?
4. ¿Cuál es el volumen estimado de consultas por minuto y por día?
5. ¿Qué timeout y estrategia de reintentos utilizan normalmente para servicios externos?
6. ¿Cómo prefieren presentar la paginación o carga incremental de publicaciones?
7. ¿Quién será responsable de la rotación de credenciales y el contacto técnico ante incidentes?
8. ¿Qué fecha proponen para la prueba conjunta desde su backend?

## Confirmaciones técnicas requeridas

- El secreto se almacena únicamente en backend o en un gestor de secretos.
- El navegador nunca recibe client-id, secreto ni firma.
- El body se serializa una sola vez y no cambia después de firmarse.
- El reloj del servidor está sincronizado y genera timestamps en segundos.
- Cada intento utiliza un request-id nuevo.
- Los logs conservan request-id, status y código de error, pero no firma ni secreto.
- El vendedor puede editar marca/modelo dentro de la búsqueda ampliada.
- La interfaz no muestra un bloque de configuración cuando recibe `configuracion=[]`.

## Decisiones a registrar

| Decisión | Estado previo | Resultado de la reunión |
|---|---|---|
| Estrategia de prueba | Pendiente: ambiente separado o smoke productivo | |
| URL de prueba | Pendiente sólo si se crea ambiente separado | |
| URL productiva | `https://venturino.algorym.app` | |
| Tecnología backend Padawanway | Pendiente | |
| Timeout de cliente | Pendiente | |
| Reintentos máximos | Pendiente | |
| Volumen esperado | Pendiente | |
| Rate limit productivo | Propuesta inicial: 60/minuto | |
| Canal de entrega del secreto | Pendiente | |
| Responsable de rotación e incidentes | Pendiente | |
| Fecha de prueba conjunta | Pendiente | |
| Fecha de habilitación comercial | Pendiente | |

## Responsabilidades de implementación

### Algorym

- [x] Implementar endpoints versionados.
- [x] Implementar autenticación HMAC y protección contra replay.
- [x] Implementar normalización y ampliación automática de años.
- [x] Excluir publicaciones de Venturino.
- [x] Implementar estadísticas, textos comerciales y paginación.
- [x] Mantener auditoría interna.
- [x] Entregar documentación y casos de prueba.
- [ ] Desplegar schema y configuración en producción.
- [ ] Entregar URL y credenciales del ambiente acordado por canal seguro.
- [ ] Acompañar la prueba de integración.

### Padawanway

- [ ] Implementar cliente en su backend.
- [ ] Guardar credenciales en entorno seguro.
- [ ] Generar timestamp, request-id y firma por request.
- [ ] Implementar los dos bloques de interfaz.
- [ ] Permitir editar marca/modelo en la búsqueda ampliada.
- [ ] Mostrar configuraciones sólo cuando el array tenga elementos.
- [ ] Manejar loading, vacíos, errores y paginación.
- [ ] Mantener secretos y firmas fuera del navegador y logs.
- [ ] Registrar request-id, status y código de error para soporte.
- [ ] Ejecutar pruebas negativas y funcionales.

## Criterios de aceptación de integración

- [ ] La firma generada por Padawanway es aceptada.
- [ ] La consulta directa devuelve publicaciones o estado vacío controlado.
- [ ] La búsqueda ampliada puede ejecutarse con la sugerencia recibida.
- [ ] La interfaz diferencia mismo modelo de modelo relacionado.
- [ ] Muestra limitada o inexistente se comunica claramente.
- [ ] Los precios se presentan como referencias en USD.
- [ ] Los enlaces externos funcionan.
- [ ] No se muestran HP, horas ni información interna de datos.
- [ ] `configuracion=[]` no genera un bloque vacío ni se interpreta como error.
- [ ] Firma inválida, replay y rate limit se manejan correctamente.
- [ ] Algorym puede localizar una consulta usando request-id.

## Checklist de salida a producción

### Algorym

- [ ] Aplicar los cambios de persistencia requeridos en producción.
- [ ] Ejecutar auditoría de normalización en modo simulación.
- [ ] Verificar en GitHub Secrets `PADAWANWAY_API_ENABLED`, `PADAWANWAY_API_CLIENT_ID`, `PADAWANWAY_API_SECRET`, `PADAWANWAY_API_MAX_SKEW_SECONDS` y `PADAWANWAY_API_RATE_LIMIT_PER_MINUTE`.
- [ ] Confirmar HTTPS, proxy y límites perimetrales.
- [ ] Verificar consulta firmada en producción.
- [ ] Confirmar monitoreo y contacto de soporte.

### Padawanway

- [ ] Configurar `VENTURINO_API_URL`, `VENTURINO_API_CLIENT_ID` y `VENTURINO_API_SECRET` en su backend.
- [ ] Confirmar `VENTURINO_API_URL=https://venturino.algorym.app`, sin `/api/v1` ni `/` final.
- [ ] Confirmar que el secreto no está en el frontend.
- [ ] Confirmar sincronización de reloj del servidor.
- [ ] Confirmar timeout, reintentos y tratamiento de `Retry-After`.
- [ ] Ejecutar la prueba conjunta en el ambiente acordado.
- [ ] Ejecutar un smoke test productivo final controlado antes del uso comercial.
- [ ] Confirmar textos y estados con Venturino.

## Soporte inicial

Ante un problema, Padawanway debe informar:

- ambiente;
- fecha y hora aproximada;
- endpoint;
- status HTTP;
- `error.code`;
- `x-request-id` utilizado;

No debe compartir el secreto ni la firma completa por correo, chat o ticket.
