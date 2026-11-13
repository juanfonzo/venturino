# QA y verificación

Última revisión: 2026-11-13.

## Estrategia vigente

La verificación se define con `docs/ai/TESTING_POLICY.md`. No existe una suite única `npm test`: cada módulo mantiene checks focalizados y los flujos con datos usan PostgreSQL local o fixtures autorizados.

La base local puede alinearse con producción mediante el snapshot documentado en `docs/technical/postgres-snapshot-sync.md`. Nunca usar acceso público a la base productiva para QA.

## Checks disponibles

| Área | Comando | Cobertura |
|---|---|---|
| Tipos | `npx tsc --noEmit` | TypeScript completo. |
| Lint | `npm run lint` | ESLint del repositorio. |
| Build | `npm run build` | Compilación de Next.js. |
| Prisma | `npx prisma validate` | Schema y datasource. |
| Referencias Padawanway | `npm run test:market-reference` | HMAC, validación, normalización, matching, familias y guardrails. |
| Casos auditados Padawanway | `npm run verify:market-reference-zero-results` | Cuatro grupos históricos contra PostgreSQL local, en modo lectura. |
| Inventario de referencias | `npm run verify:market-reference-inventory` | Cinco unidades Venturino contra PostgreSQL local, en modo lectura. |
| Superadmin | `npm run test:superadmin` | Acceso, guards, auditoría y contratos focalizados. |
| Postventa benchmark | `npm run test:postventa` | Gates de clasificación del benchmark. |
| Postventa set de validación | `npm run test:postventa-validation-set` | Casos difíciles y guardrails de matching. |

## Flujos funcionales a verificar

| Flujo | Nivel | Evidencia mínima |
|---|---:|---|
| API Padawanway | 4 | Firma válida, firma inválida, replay, referencias externas y auditoría sin secretos. Ver escenario en `docs/ai/SCENARIOS.md`. |
| Matching de referencias | 3 | Tests focalizados y script de ceros auditados tras actualizar el snapshot. |
| Superadmin | 4 | Sesión Venturino sin acceso, sesión Superadmin con listado/detalle/revisión; SMTP sólo si el entorno está configurado. |
| Pipeline de maquinaria | 3 | `--dry-run` antes de escritura, conteos de `ScrapingRun`, `Listing` y `PriceHistory` después de una corrida autorizada. |
| Pipeline Postventa | 3 | Importación, análisis persistido, resumen/listado/detalle y PDF cuando existe una corrida. |
| UI operativa | 2/3 | Navegador local cuando cambie una pantalla, con loading, error, vacío, paginación y permisos correspondientes. |

## Estado de validación conocido

- El matching Padawanway `market-reference-v1.2` fue validado contra el snapshot local 20260903T140008Z: los cuatro grupos de consultas históricas sin resultado ahora devuelven referencias.
- El superadmin y la API tienen tests focalizados en el pipeline de GitHub Actions.
- La entrega SMTP real depende de credenciales válidas del entorno; las alertas automáticas no se deben habilitar en desarrollo.
- La disponibilidad real de Postventa depende de que el entorno tenga una importación y análisis persistidos; sin corrida el endpoint responde un estado controlado.

## Riesgos residuales

- No hay tests E2E generales ni usuarios seed persistidos.
- El snapshot local es una copia puntual: actualizarlo antes de concluir análisis sobre cobertura o resultados recientes.
- Los pipelines de Mongo modifican PostgreSQL; primero ejecutar siempre el dry-run y revisar el perfil de origen.
- No existe MCP operativo; sus contratos candidatos se validarán junto con el futuro servicio Python/FastAPI.

## Verificación 2026-11-13 — Errores de parámetros CRM

- `test:market-reference`: 8/8 grupos, incluidos datos ausentes/nulos/vacíos, año inválido, ausencia de mensajes derivados, texto con ñ y claves compatibles.
- `test:superadmin`: 8/8 grupos; motivos nuevos e históricos, identidad parcial recibida, umbral/ventana/cooldown y cola de alertas con transporte SMTP sustituido. No se envían correos reales.
- HTTP firmado + PostgreSQL local: validación de los cuatro obligatorios, cuerpo vacío, año decimal, firma inválida sin auditoría, búsqueda ampliada sin marca/año y búsqueda directa correcta; snapshot de error igual a la respuesta. Replay 409 y permisos 401/403 también comprobados.
- Navegación: login Superadmin, resumen, detalle de error, información para soporte, listado y filtros sin resultados; revisión desktop y móvil. Navegador nativo no disponible (host/pipe ausentes); se usó Playwright CLI como alternativa.
- Build y TypeScript correctos; lint sin errores y con tres advertencias previas ajenas a este cambio. Los registros temporales locales se retiran al cerrar la verificación.
