# API de referencias de mercado para Padawanway

Versión del contrato: `v1`  
Estado: operativo en producción; matching `market-reference-v1.2`
Última revisión: 2026-09-03

## Propósito

Esta integración permite que el dashboard de Venturino administrado por Padawanway consulte publicaciones externas de maquinaria usada y estadísticas de precios de mercado.

La información está pensada para acompañar el criterio y la experiencia del vendedor al evaluar una toma de usados.

La API:

- entrega referencias de publicaciones externas y estadísticas en USD;
- intenta encontrar primero el mismo modelo;
- amplía automáticamente los años cuando la muestra cercana es insuficiente;
- permite una búsqueda separada de modelos relacionados;
- explica los resultados en español y con lenguaje comercial.

La API **no es una herramienta de tasación** y no devuelve un precio recomendado de toma, costos de reacondicionamiento ni una decisión de compra.

## Arquitectura acordada

```text
Vendedor
   |
   v
Dashboard de Venturino desarrollado por Padawanway
   |
   | request firmado desde el backend de Padawanway
   v
API de referencias de Algorym
```

El navegador nunca debe comunicarse directamente con esta API. El backend de Padawanway firma cada request y conserva el secreto de integración.

## Ambientes

| Ambiente | URL base | Estado |
|---|---|---|
| Producción | `https://venturino.algorym.app` | Operativa y auditada mediante `MarketReferenceQuery`. |
| Prueba | No provisionado | Si se requiere, definir ambiente y credenciales separados sin reemplazar la operación productiva actual. |

La URL base no debe incluir `/api/v1` ni terminar con `/`. Las rutas versionadas se agregan al realizar cada request.

## Operaciones

| Operación | Endpoint | Uso |
|---|---|---|
| Referencias directas | `POST /api/v1/market-references/direct` | Buscar publicaciones del mismo modelo, ampliando años automáticamente si hace falta. |
| Búsqueda ampliada | `POST /api/v1/market-references/search` | Consultar modelos relacionados cuando las referencias directas son insuficientes. |

## Documentos

1. [Contrato de la API](./01-contrato-api.md): requests, responses, campos, estadísticas, clasificaciones y errores.
2. [Seguridad y firma](./02-seguridad-y-firma.md): HMAC, protección del secreto, reintentos y vector de prueba.
3. [Pruebas con Postman](./03-pruebas-postman.md): configuración, script de firma y casos de aceptación.
4. [Guía para el frontend](./04-guia-frontend.md): comportamiento esperado y lenguaje que debe ver el vendedor.
5. [Checklist de reunión y puesta en producción](./05-checklist-reunion.md): decisiones, responsabilidades y validación conjunta.

## Responsabilidades

| Algorym | Padawanway |
|---|---|
| Mantener la API, normalización, matching y estadísticas. | Consumir la API exclusivamente desde su backend. |
| Entregar URL, client-id y secreto por un canal seguro. | Resguardar el secreto y no enviarlo al navegador. |
| Excluir publicaciones propias de Venturino de las referencias. | Construir la experiencia visual dentro del dashboard. |
| Registrar internamente las consultas aceptadas. | Enviar un `request-id` nuevo en cada intento. |
| Mantener textos comerciales en español dentro de la respuesta. | Mostrar `titulo` y `detalle` sin reinterpretarlos como tasación. |
| Informar cambios incompatibles mediante una nueva versión de API. | Manejar loading, errores, resultados vacíos y paginación. |

## Alcance de datos

- Categorías: tractores, cosechadoras, sembradoras y pulverizadoras.
- Condición consultada: siempre maquinaria usada.
- Moneda: USD.
- Filtros de entrada: categoría, marca, modelo y año según operación.
- HP y horas no forman parte de los filtros ni de las respuestas.
- No se exponen procesos ni metadatos internos de administración de la información.

## Estado de validación

- Firma válida: `200`.
- Firma inválida: `401 UNAUTHORIZED`.
- Request-id reutilizado: `409 DUPLICATE_REQUEST`.
- Cinco tractores usados del inventario de Venturino y cuatro grupos históricos de resultados cero verificados contra PostgreSQL local alineado por snapshot.
- Normalización, familias de modelos, ampliación de años y falsos relacionados cubiertos por checks automatizados. La guía de casos es `docs/technical/referencias-mercado-matching.md`.
- Build, TypeScript y schema Prisma validados.

## Consideraciones operativas futuras

- Definir si habrá ambiente y credenciales de prueba separados si la operación futura lo requiere.
- Tecnología del backend de Padawanway para entregar un ejemplo de firma específico si lo necesitan.
- Volumen esperado de requests y política final de timeout/reintentos.
- Presentación definitiva de paginación y estados dentro de los dos bloques acordados.
- Canal seguro para rotación de credenciales.
- Responsable y procedimiento de rotación de credenciales.
