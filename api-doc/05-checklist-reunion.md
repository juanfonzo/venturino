# Checklist operativo para Padawanway

## Resultado esperado

Mantener el contrato técnico entendido, las responsabilidades asignadas y la operación productiva trazable. La integración ya realiza consultas mediante el CRM de Padawanway.

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

### 6. Operación y futuras pruebas

- URL productiva confirmada: `https://venturino.algorym.app`.
- Decisión sobre ambiente de prueba separado si se necesita para cambios futuros.
- Prueba Postman ante una rotación de credenciales o cambio de contrato.
- Prueba desde el backend real de Padawanway al modificar firma, timeout o tratamiento de errores.
- Criterios de aceptación.
- Revisión de cambios de contrato, rotación de secretos o incidentes.

## Preguntas para Guillermo

1. ¿Qué tecnología y versión utiliza el backend de Padawanway?
2. ¿Necesitan un ejemplo de firma en ese lenguaje además del ejemplo Node.js?
3. ¿Prefieren un ambiente y credenciales de prueba separados o realizar un smoke test productivo controlado?
4. ¿Cuál es el volumen estimado de consultas por minuto y por día?
5. ¿Qué timeout y estrategia de reintentos utilizan normalmente para servicios externos?
6. ¿Cómo prefieren presentar la paginación o carga incremental de publicaciones?
7. ¿Quién será responsable de la rotación de credenciales y el contacto técnico ante incidentes?
8. Ante un cambio de contrato o credenciales, ¿quién coordina el smoke test desde su backend?

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
| Estrategia de prueba | Producción operativa; ambiente separado opcional | |
| URL de prueba | Pendiente sólo si se crea ambiente separado | |
| URL productiva | `https://venturino.algorym.app` | |
| Tecnología backend Padawanway | No condiciona la integración actual; registrar sólo si cambia el soporte | |
| Timeout de cliente | Pendiente | |
| Reintentos máximos | Pendiente | |
| Volumen esperado | Pendiente | |
| Rate limit productivo | Configurable; valor por defecto documentado: 60/minuto | |
| Canal de entrega del secreto | Pendiente | |
| Responsable de rotación e incidentes | Pendiente | |
| Responsable de smoke test | Registrar para cambios de contrato, credenciales o incidentes | |
| Fecha de habilitación comercial | Habilitada; registrar cambios de alcance si aparecen | |

## Responsabilidades de implementación

### Algorym

- [x] Implementar endpoints versionados.
- [x] Implementar autenticación HMAC y protección contra replay.
- [x] Implementar normalización y ampliación automática de años.
- [x] Excluir publicaciones de Venturino.
- [x] Implementar estadísticas, textos comerciales y paginación.
- [x] Mantener auditoría interna.
- [x] Entregar documentación y casos de prueba.
- [x] Desplegar schema y configuración en producción.
- [x] Entregar URL y credenciales por canal seguro.
- [x] Habilitar la integración productiva.

### Padawanway

- [x] Implementar cliente en su backend.
- [x] Guardar credenciales en entorno seguro.
- [x] Generar timestamp, request-id y firma por request.
- [x] Integrar las consultas al CRM.
- [ ] Permitir editar marca/modelo en la búsqueda ampliada.
- [ ] Mostrar configuraciones sólo cuando el array tenga elementos.
- [ ] Manejar loading, vacíos, errores y paginación.
- [ ] Mantener secretos y firmas fuera del navegador y logs.
- [ ] Registrar request-id, status y código de error para soporte.
- [ ] Ejecutar pruebas negativas y funcionales.

## Criterios de aceptación de integración

- [x] La firma generada por Padawanway es aceptada en la integración productiva.
- [x] La consulta directa devuelve publicaciones o estado vacío controlado.
- [x] La búsqueda ampliada puede ejecutarse con la sugerencia recibida.
- [ ] Confirmar en cada cambio visual que la interfaz diferencia mismo modelo de modelo relacionado.
- [ ] Confirmar en cada cambio visual que muestra limitada o inexistente se comunica claramente.
- [ ] Confirmar en cada cambio visual que los precios se presentan como referencias en USD.
- [ ] Confirmar en cada cambio visual que los enlaces externos funcionan.
- [x] No se devuelven HP, horas ni información interna de datos en el contrato.
- [ ] Confirmar en cada cambio visual que `configuracion=[]` no genera un bloque vacío ni se interpreta como error.
- [x] Firma inválida, replay y rate limit están cubiertos por los checks focalizados de Algorym.
- [x] Algorym puede localizar una consulta usando request-id en la auditoría interna.

## Checklist de salida a producción

### Algorym

- [x] Aplicar los cambios de persistencia requeridos en producción.
- [x] Ejecutar auditoría de normalización en modo simulación.
- [x] Configurar `PADAWANWAY_API_ENABLED`, `PADAWANWAY_API_CLIENT_ID`, `PADAWANWAY_API_SECRET`, `PADAWANWAY_API_MAX_SKEW_SECONDS` y `PADAWANWAY_API_RATE_LIMIT_PER_MINUTE` en el despliegue productivo.
- [x] Confirmar HTTPS y proxy para la operación productiva.
- [x] Verificar consulta firmada en producción.
- [ ] Confirmar monitoreo y contacto de soporte.

### Padawanway

- [x] Configurar `VENTURINO_API_URL`, `VENTURINO_API_CLIENT_ID` y `VENTURINO_API_SECRET` en su backend.
- [x] Confirmar `VENTURINO_API_URL=https://venturino.algorym.app`, sin `/api/v1` ni `/` final.
- [x] Mantener el secreto fuera del frontend según el contrato backend a backend.
- [ ] Documentar reloj, timeout, reintentos y tratamiento de `Retry-After` si se modifica el cliente.
- [x] Ejecutar la integración productiva inicial.
- [ ] Ejecutar un smoke test controlado al rotar secretos o cambiar el contrato.
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
