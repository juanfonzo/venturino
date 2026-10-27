# Manifest

Última revisión coordinada: 2026-09-03.

## Estado General

- Proyecto: Venturino Radar de Mercado.
- Fase: desarrollo/mantenimiento de MVP existente.
- Stack real: Next.js 16.2.7, React 18, TypeScript, Tailwind, PostgreSQL + Prisma, MongoDB Atlas, CSV ACARA/GeoJSON locales.
- Onboarding técnico: completado proporcionalmente con CodeGraph y lectura directa de archivos críticos.

## Inputs

| Archivo | Estado | Procesado en | Notas |
|---|---|---|---|
| `input/propuesta-comercial.md` | referencia | onboarding 2026-06-03 | No fue reprocesado como intake; el objetivo fue relevar el sistema real existente. |
| `BUSINESS_CONTEXT.md` | histórico | onboarding 2026-06-03 | Contexto comercial inicial del MVP; no especificación de implementación. |
| `DATA_SOURCES.md` | histórico | onboarding 2026-06-03 | Documento CSV del MVP; el sistema actual usa MongoDB como origen y PostgreSQL para publicaciones. |
| `APP_ARCHITECTURE_NO_DB.md` | histórico | onboarding 2026-06-03 | Mantener como antecedente; no refleja la arquitectura actual con DB. |
| `docs/technical/postventa-ml.md` | vigente-específico | onboarding 2026-06-03 | Arquitectura específica de postventa; parte implementada, parte contrato candidato. |

Estados válidos: `pendiente`, `en-proceso`, `procesado`, `rechazado`, `archivado`, `referencia`, `histórico`, `vigente`, `vigente-parcial`, `implementado`, `implementado-según-ledger`, `contrato-candidato`.

## Artefactos Vigentes

| Artefacto | Estado | Fuente principal | Última actualización |
|---|---|---|---|
| `docs/ai/PROJECT_CONTEXT.md` | vigente | código, operación y flujos reales | 2026-09-03 |
| `docs/technical/arquitectura.md` | vigente | código, Prisma, scripts, deploy y operación | 2026-09-03 |
| `docs/technical/frontend.md` | vigente | rutas UI + componentes + CSS real | 2026-09-03 |
| `docs/technical/backend.md` | vigente | route handlers + services + scripts | 2026-09-03 |
| `docs/technical/base-de-datos.md` | vigente | Prisma + pipelines + auditoría API | 2026-09-03 |
| `docs/technical/referencias-mercado-matching.md` | vigente | casos confirmados, guardrails y verificaciones de la API Padawanway | 2026-09-03 |
| `docs/technical/postgres-snapshot-sync.md` | vigente | scripts de snapshot completo producción → local | 2026-09-03 |
| `docs/technical/seguridad.md` | vigente | auth, proxy y endpoints sensibles | 2026-09-03 |
| `docs/technical/qa.md` | vigente | checks focalizados y flujos críticos | 2026-09-03 |
| `docs/technical/mcp-coverage-map.md` | vigente | cobertura MCP candidata y deuda activa | 2026-09-03 |
| `docs/technical/postventa-ml.md` | vigente-específico | código de Postventa y contratos implementados | 2026-09-03 |
| `docs/technical/superadmin-observabilidad.md` | vigente-específico | acceso, auditoría, revisión y alertas | 2026-09-03 |
| `api-doc/` | vigente-compartible | contrato operativo de referencias de mercado | 2026-09-03 |
| `docs/product/brief.md` | histórico | plantilla del kit; no describe el producto actual | 2026-09-03 |
| `docs/product/prd.md` | histórico | plantilla del kit; no describe el producto actual | 2026-09-03 |
| `docs/backlog/hitos/hito-02-postventa-ml.md` | vigente-parcial | UI, APIs y reporte realizados; MCP sigue candidato | 2026-09 |
| `docs/backlog/features/postventa-01-ingesta-postgres.md` | implementado | código postventa | 2026-09-03 |
| `docs/backlog/features/postventa-02-matching-persistido.md` | implementado | código postventa | 2026-09-03 |
| `docs/backlog/features/postventa-03-ui-analisis.md` | implementado | UI y APIs postventa | 2026-09-03 |
| `docs/backlog/features/postventa-04-reporte-pdf.md` | implementado | endpoint y generador PDF postventa | 2026-09-03 |
| `docs/backlog/features/postventa-05-mcp-contratos.md` | contrato-candidato | cobertura MCP sin servicio implementado | 2026-09-03 |

## Módulos Reales

| Módulo | Estado | Archivos principales |
|---|---|---|
| Shell/login | implementado | `app/layout.tsx`, `app/(pages)/layout.tsx`, `app/login/page.tsx`, `proxy.ts`, `lib/auth.ts` |
| Dashboard/modelos | implementado | `app/(pages)/dashboard/page.tsx`, `components/ModelMarketPanel.tsx`, `components/AcaraTrendPanel.tsx` |
| Explorador | implementado | `app/(pages)/explorador/page.tsx`, `app/api/tractors/route.ts`, `lib/data/loadListings.ts` |
| ACARA | implementado | `app/(pages)/acara/page.tsx`, `app/api/acara/**`, `lib/data/loadAcara.ts`, `store/useAcaraMappings.ts` |
| Análisis 1 | implementado | `app/(pages)/analisis-1/page.tsx`, `app/api/analisis-1/route.ts`, `lib/analysis/analisis1.ts` |
| Análisis 2 | implementado | `app/(pages)/analisis-2/page.tsx`, `app/api/analisis-2/**`, `lib/analysis/analisis2.ts` |
| Reporte Venturino PDF | implementado | `app/api/reports/venturino/route.ts`, `scripts/generateVenturinoReport.js` |
| Ingesta maquinaria | implementado | `scripts/pipeline-live.js`, `scripts/pipeline-shared.js`, `prisma/schema.prisma` |
| FX | implementado | `lib/fx-rate.ts`, `scripts/syncFxRate.js`, `app/api/sync-fx-rate/route.ts` |
| Postventa ingesta/análisis | implementado | `scripts/pipeline-postventa.js`, `lib/postventa/**`, `app/api/postventa/**`, `app/api/reports/postventa/route.ts` |
| API Padawanway de referencias | operativa en producción | `app/api/v1/market-references/**`, `lib/market-reference/**`, `lib/normalize/machineIdentity.ts`, `MarketReferenceQuery` |
| Superadmin de referencias | implementado | `app/(pages)/superadmin/**`, `lib/superadmin/**`, `lib/operational-alerts/**` |
| MCP | no implementado | `docs/technical/mcp-coverage-map.md` |

## Cambios De Cliente

| Solicitud | Estado | Impacto | Backlog |
|---|---|---|---|
| Onboarding de proyecto existente | procesado | Documentación técnica y contexto para futuras tareas | No requiere feature |
| Migrar Next.js a 16 y retirar CSVs MVP legacy | procesado | Dependencias, proxy, lint config y documentación actualizados; ACARA CSV activo se conserva | Pendiente decidir migración ACARA a DB si se quiere eliminar todo CSV runtime |
| API de referencias de mercado para tomas de usados | operativo en producción; matching v1.2 | Servicio externo sobre PostgreSQL, matching progresivo, identidad canónica, autenticación HMAC, auditoría y feedback interno | Contrato en `api-doc/` y guía en `docs/technical/referencias-mercado-matching.md` |

## Riesgos Registrados

- Hay archivos históricos o plantillas con contenido desactualizado respecto de la arquitectura actual.
- Algunos documentos previos muestran mojibake; los documentos actualizados en esta pasada deben quedar en UTF-8 correcto.
- Existe `.env.example`; mantenerlo sincronizado cuando cambien variables de runtime.
- No hay suite general; la API Padawanway tiene tests focalizados y verificación read-only contra inventario.
- Auth actual separa Venturino y Superadmin mediante dos identidades fijas, pero no cubre usuarios persistidos, roles configurables ni tenant.
- `npx prisma db push` en deploy evita trazabilidad fina de migraciones para todo el schema.
- No hay MCP real pese a la política MCP-first; la deuda debe permanecer visible.

## Reglas De Procesamiento

- Respetar Next.js 16.2.7 instalado y Node >= 20.9.0.
- No usar CSVs legacy de MVP como fuente runtime. ACARA sigue siendo la única fuente CSV activa documentada.
- Respetar diseño visual propio Venturino/John Deere y componentes existentes por encima de `VISUAL_GUIDELINES.md`.
- Antes de cambios grandes, usar CodeGraph si está disponible y luego leer archivos reales.
- No implementar features sin brief/backlog aprobado, salvo pedido explícito.
- Mantener `docs/technical/mcp-coverage-map.md` actualizado para capacidades operativas nuevas.
- Postventa: `analysis:postventa-matches` y `pipeline:postventa` deben usar los servicios compartidos de `lib/postventa/**`; no duplicar reglas de matching en scripts.

## Actualización coordinada 2026-09-03 — Superadmin y observabilidad

- Cambio: superadmin exclusivo de Algorym, auditoría ampliada de la API Padawanway, revisión interna y alertas SMTP.
- Estado: implementado y usado para revisar la auditoría de referencias. La entrega SMTP sigue condicionada a configuración válida por entorno.
- Archivos canónicos nuevos:
  - `docs/technical/superadmin-observabilidad.md`;
  - `docs/changes/processed/2026-09-02-superadmin-observabilidad-api.md`;
  - `docs/backlog/features/superadmin-observabilidad-api.md`.
- Módulo real: `app/(pages)/superadmin/**`, `lib/superadmin/**` y `lib/operational-alerts/**`.
- Compatibilidad: no cambia `AUTH_USER`/`AUTH_PASSWORD`, el login visible ni el contrato de Padawanway.
- Riesgos residuales: dos perfiles fijos por entorno; cola/cooldown SMTP locales al proceso; no hay monitor externo ni MCP real.
