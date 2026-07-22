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
- El backfill queda restringido a aliases comprobados y no reescribe masivamente modelos ambiguos.
