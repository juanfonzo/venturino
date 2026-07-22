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
- Apertura de enlaces externos.
- Lenguaje de referencias, no tasación.

### 6. Pruebas y producción

- URL de ambiente de prueba.
- Prueba Postman inicial.
- Prueba desde el backend real de Padawanway.
- Criterios de aceptación.
- Fecha tentativa de activación.

## Preguntas para Guillermo

1. ¿Qué tecnología y versión utiliza el backend de Padawanway?
2. ¿Necesitan un ejemplo de firma en ese lenguaje además del ejemplo Node.js?
3. ¿Disponen de un ambiente de prueba separado de producción?
4. ¿Cuál es el volumen estimado de consultas por minuto y por día?
5. ¿Qué timeout y estrategia de reintentos utilizan normalmente para servicios externos?
6. ¿Dónde almacenarán el secreto de integración?
7. ¿Qué información registrarán para soporte sin guardar firma ni secreto?
8. ¿El vendedor podrá editar marca/modelo antes de ejecutar la búsqueda ampliada?
9. ¿Cómo prefieren presentar la paginación o carga incremental de publicaciones?

## Decisiones a registrar

| Decisión | Estado previo | Resultado de la reunión |
|---|---|---|
| URL de prueba | Pendiente | |
| URL productiva | Pendiente | |
| Tecnología backend Padawanway | Pendiente | |
| Timeout de cliente | Pendiente | |
| Reintentos máximos | Pendiente | |
| Volumen esperado | Pendiente | |
| Rate limit productivo | Propuesta inicial: 60/minuto | |
| Canal de entrega del secreto | Pendiente | |
| Fecha de prueba conjunta | Pendiente | |
| Fecha de activación | Pendiente | |

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
- [ ] Entregar URL y credenciales de prueba por canal seguro.
- [ ] Acompañar la prueba de integración.

### Padawanway

- [ ] Implementar cliente en su backend.
- [ ] Guardar credenciales en entorno seguro.
- [ ] Generar timestamp, request-id y firma por request.
- [ ] Implementar los dos bloques de interfaz.
- [ ] Manejar loading, vacíos, errores y paginación.
- [ ] Mantener secretos y firmas fuera del navegador y logs.
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
- [ ] Firma inválida, replay y rate limit se manejan correctamente.
- [ ] Algorym puede localizar una consulta usando request-id.

## Checklist de salida a producción

### Algorym

- [ ] Aplicar los cambios de persistencia requeridos en producción.
- [ ] Ejecutar auditoría de normalización en modo simulación.
- [ ] Configurar `PADAWANWAY_API_*` en producción.
- [ ] Confirmar HTTPS, proxy y límites perimetrales.
- [ ] Verificar consulta firmada en producción.
- [ ] Confirmar monitoreo y contacto de soporte.

### Padawanway

- [ ] Configurar URL y credenciales productivas.
- [ ] Confirmar que el secreto no está en el frontend.
- [ ] Confirmar sincronización de reloj del servidor.
- [ ] Confirmar timeout, reintentos y tratamiento de `Retry-After`.
- [ ] Ejecutar smoke test productivo controlado.
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
