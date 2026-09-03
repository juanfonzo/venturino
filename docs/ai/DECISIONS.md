# Decisions

Registrar decisiones técnicas o de producto que un agente futuro no debería reabrir sin motivo.

## Formato

```md
## YYYY-MM-DD - Título

Estado: propuesta / aceptada / reemplazada

Contexto:

Decisión:

Alternativas consideradas:

Consecuencias:
```

## 2026-07-17 - Referencias de mercado externas como widget aislado

Estado: reemplazada

Estado actual: antecedente histórico. El widget no se implementó; la integración vigente es la API HMAC descrita en la decisión siguiente y consumida desde el backend de Padawanway.

Contexto:

Venturino necesita consultar referencias de mercado para maquinaria usada tomada como parte de pago desde un dashboard administrado por Padawanway. El panel vive en otro dominio y puede consultar maquinaria que no pertenece al stock actual de Venturino.

Decisión:

Implementar un widget embebible independiente de Análisis 1, con referencias directas y búsqueda ampliada orientativa. El widget consumirá publicaciones activas de PostgreSQL, no devolverá una tasación ni recomendación de compra y se abrirá mediante un handshake servidor a servidor con un código de un solo uso.

Alternativas consideradas:

- Reutilizar Análisis 1 dentro del iframe: descartado porque depende del stock de Venturino y su propósito es comparar ese stock contra competidores.
- Incrustar la aplicación interna completa: descartado por superficie de seguridad, navegación ajena al flujo y dependencia de la sesión interna.
- Entregar un token permanente en el navegador: descartado porque expondría credenciales de integración y no permite limitar ni auditar cada apertura.

Consecuencias:

- Se deben crear rutas, sesión embebida, persistencia de auditoría y políticas de iframe separadas de la autenticación existente.
- Antes de habilitar producción se debe confirmar el dominio de Padawanway y validar que el backend de Padawanway pueda realizar el handshake seguro.
- Las referencias dependen de la cobertura y frescura de la carga MongoDB a PostgreSQL; la auditoría de datos es un hito previo obligatorio.

## 2026-07-17 - Referencias de mercado mediante API para Padawanway

Estado: aceptada

Contexto:

Padawanway confirmó que prefiere consumir los datos como servicio y construir la experiencia visual dentro de su propio dashboard. Venturino confirmó que la primera versión no usa HP ni horas y que no deben exponerse datos internos sobre scraping o estado de la fuente.

Decisión:

Implementar dos endpoints API versionados, consumidos exclusivamente desde el backend de Padawanway: referencias directas y búsqueda ampliada. La autenticación será máquina a máquina mediante firma HMAC por request. La API leerá sólo PostgreSQL, excluirá publicaciones propias de Venturino y registrará internamente cada consulta aceptada.

Alternativas consideradas:

- Widget mediante iframe: reemplazado porque Padawanway asumirá el frontend y necesita reutilizar los datos con mayor libertad.
- API consumida directamente desde el navegador: descartada porque expondría credenciales de integración.
- Acceso directo de Padawanway a PostgreSQL: descartado porque impediría controlar reglas, seguridad, paginación y auditoría.

Consecuencias:

- Algorym es responsable del contrato, matching, estadísticas, seguridad, versionado, auditoría y documentación.
- Padawanway es responsable del frontend, de resguardar el secreto en su backend y de representar correctamente referencias directas y resultados orientativos.
- Ya no aplican dominio permitido para iframe, códigos de apertura, cookies de terceros ni resizing entre dominios.

## 2026-07-21 - Matching conservador y ampliación automática de referencias

Estado: aceptada

Contexto:

Los vendedores necesitan información de mercado aun cuando haya pocas publicaciones del mismo año, pero no deben tener que calibrar filtros técnicos. Los modelos de origen incluyen diferencias de escritura y configuraciones anexadas al nombre.

Decisión:

Usar una identidad canónica compartida por pipeline y API. El modelo se separa de configuraciones comerciales y sólo se unifican aliases específicos por marca/categoría. La referencia directa amplía años automáticamente sin usar HP ni horas; la búsqueda de modelos relacionados permanece separada y orientativa. Todo criterio visible se devuelve en español comercial.

Alternativas consideradas:

- Reutilizar el fuzzy de Análisis 1: descartado porque puede fusionar líneas oficiales distintas por prefijo o parte numérica.
- Exigir que el vendedor ajuste tolerancias: descartado porque agrega fricción y produce resultados inconsistentes.
- Eliminar sufijos de modelo de forma global: descartado porque letras como `D` y `E` pueden identificar versiones distintas.

Consecuencias:

- Nuevas equivalencias requieren evidencia y una regresión específica antes de agregarse.
- Padawanway puede mostrar `titulo`/`detalle` de criterios y coincidencias sin traducir lógica técnica.

## 2026-09-03 - Equivalencias auditadas y búsqueda estructural de familias John Deere

Estado: aceptada

Contexto:

Nueve consultas reales de Padawanway cerraron con cero referencias pese a que PostgreSQL tenía publicaciones externas elegibles. La causa fue una combinación de variantes de escritura confirmadas por negocio y una búsqueda ampliada que no recuperaba modelos largos desde una familia corta como `6J`.

Decisión:

Unificar sólo los aliases confirmados en el alcance exacto categoría/marca: Metalfor `Multiple 3200 SE`/`M 3200`/`M 3200SE`, PLA `MAP 3 3300 H` y John Deere `S770SD40D`. Para familias John Deere de dos caracteres, recuperar solamente `modeloNorm` que empiece con el dígito de serie y termine con su letra; el ranking existente vuelve a comprobar la pertenencia a familia antes de publicar resultados.

Alternativas consideradas:

- Eliminar letras o sufijos globalmente: descartado porque podría fusionar variantes incompatibles.
- Usar contains/fuzzy sin estructura para familias cortas: descartado porque amplía el conjunto candidato y puede mezclar líneas John Deere ajenas.
- Mantener los ceros hasta un backfill completo: descartado porque el servicio ya recalcula la identidad al leer y puede recuperar las referencias de forma segura.

Consecuencias:

- El algoritmo pasa a `market-reference-v1.2`, permitiendo diferenciar las nuevas auditorías de las anteriores.
- Los aliases y la recuperación de familia tienen regresiones unitarias y una verificación read-only sobre los cuatro grupos de auditorías afectados.
- Cualquier nueva equivalencia requiere el mismo estándar: evidencia, scope categoría/marca y prueba negativa cuando corresponda.
- El backfill queda restringido a aliases comprobados y no reescribe masivamente modelos ambiguos.

## 2026-09-02 - Superadmin liviano sin cambiar Venturino ni Padawanway

Estado: aceptada

Contexto:

Algorym necesita observar la integración, recibir alertas y revisar resultados reales para mejorar el matching. No se quiere cambiar las credenciales ni la experiencia actual de Venturino, ni solicitar trabajo a Padawanway salvo que sea indispensable.

Decisión:

Agregar un segundo par de credenciales por entorno y firmar en el JWT un nivel fijo `VENTURINO` o `SUPERADMIN`. Mantener una única pantalla de login, proteger el módulo en servidor y ampliar `MarketReferenceQuery` como fuente de observabilidad. Implementar alertas SMTP dentro del proceso con control de ruido inspirado en `whatsapp-python`.

Alternativas consideradas:

- Usuarios y roles persistidos en PostgreSQL: diferido porque sólo existen dos actores conocidos y agregaría complejidad sin valor inmediato.
- Identificar superadmin únicamente por username en frontend: descartado porque no autoriza en servidor.
- Pedir `operationId` y feedback a Padawanway: diferido hasta conocer qué datos comerciales aportan valor real.
- Cron, Redis, outbox o worker de alertas: diferido porque la primera versión puede operar de forma acotada en el contenedor actual.

Consecuencias:

- Las credenciales de Venturino permanecen sin cambios.
- Los tokens anteriores siguen funcionando como `VENTURINO`.
- El patrón de dos accesos fijos no debe escalarse a múltiples perfiles sin rediseñar auth.
- El cooldown y la cola SMTP se reinician junto con el proceso.

## 2026-09-03 - Snapshot PostgreSQL completo para análisis local

Estado: aceptada

Contexto:

La base local quedó desactualizada frente a Mongo y frente a la base de producción que alimenta la API Padawanway. Se necesita analizar en profundidad resultados reales de matching sin publicar ni abrir acceso directo a PostgreSQL de producción.

Decisión:

Generar manualmente en el host del VPS un `pg_dump` lógico completo de la base de aplicación, acompañado por un manifest con checksum. Transferir el archive y manifest por SCP/SFTP o mediante R2 privado. La importación local usa una URL exclusiva `LOCAL_SNAPSHOT_DATABASE_URL`, exige confirmación explícita y recrea solamente esa base local.

Alternativas consideradas:

- Sincronización parcial de tablas: descartada porque restringe análisis futuros y puede perder relaciones, auditoría o datos aún no identificados como relevantes.
- ETL registro por registro con Prisma: descartado porque puede divergir de PostgreSQL, altera secuencias/constraints y no aporta valor frente a `pg_dump`/`pg_restore`.
- Acceso remoto directo o público a producción: descartado por seguridad y porque no es necesario para el análisis local.

Consecuencias:

- El snapshot contiene datos operativos completos y debe conservarse en ubicaciones privadas e ignoradas por Git.
- La restauración local es destructiva sólo para la base explícitamente configurada; el script bloquea hosts remotos y entornos de producción.
- Los roles y privilegios globales del cluster no se sincronizan: el objetivo es alinear schema y datos de la base de aplicación, no replicar credenciales de producción.
