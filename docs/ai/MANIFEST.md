# Manifest

Última revisión coordinada: 2026-06-04.

## Estado General

- Proyecto: Venturino Radar de Mercado.
- Fase: desarrollo/mantenimiento de MVP existente.
- Stack real: Next.js 16.2.7, React 18, TypeScript, Tailwind, PostgreSQL + Prisma, MongoDB Atlas, CSV ACARA/GeoJSON locales.
- Onboarding técnico: completado proporcionalmente con CodeGraph y lectura directa de archivos críticos.

## Inputs

| Archivo | Estado | Procesado en | Notas |
|---|---|---|---|
| `input/propuesta-comercial.md` | referencia | onboarding 2026-06-03 | No fue reprocesado como intake; el objetivo fue relevar el sistema real existente. |
| `BUSINESS_CONTEXT.md` | referencia | onboarding 2026-06-03 | Contexto original del MVP. |
| `DATA_SOURCES.md` | referencia-parcial | onboarding 2026-06-03 | Documento histórico: el sistema actual ya usa PostgreSQL para publicaciones. |
| `APP_ARCHITECTURE_NO_DB.md` | histórico | onboarding 2026-06-03 | Mantener como antecedente; no refleja la arquitectura actual con DB. |
| `docs/technical/postventa-ml.md` | vigente-específico | onboarding 2026-06-03 | Arquitectura específica de postventa; parte implementada, parte contrato candidato. |

Estados válidos: `pendiente`, `en-proceso`, `procesado`, `rechazado`, `archivado`, `referencia`, `histórico`, `vigente`.

## Artefactos Vigentes

| Artefacto | Estado | Fuente principal | Última actualización |
|---|---|---|---|
| `docs/ai/PROJECT_CONTEXT.md` | vigente | onboarding del repo real + migración Next 16 | 2026-06-04 |
| `docs/technical/arquitectura.md` | vigente | código + Prisma + scripts + docs previos | 2026-06-04 |
| `docs/technical/frontend.md` | vigente | rutas UI + componentes + CSS real | 2026-06-04 |
| `docs/technical/backend.md` | vigente | route handlers + services + scripts | 2026-06-04 |
| `docs/technical/base-de-datos.md` | vigente | `prisma/schema.prisma` + migración postventa | 2026-06-03 |
| `docs/technical/seguridad.md` | vigente | `lib/auth.ts`, proxy y endpoints auth | 2026-06-04 |
| `docs/technical/mcp-coverage-map.md` | vigente | onboarding + política MCP-first | 2026-06-03 |
| `docs/technical/postventa-ml.md` | vigente-específico | análisis postventa previo | 2026-05-22 |
| `docs/product/brief.md` | revisar | kit/producto previo | sin confirmar |
| `docs/product/prd.md` | revisar | kit/producto previo | sin confirmar |
| `docs/backlog/hitos/hito-02-postventa-ml.md` | vigente-parcial | backlog postventa | 2026-05 |
| `docs/backlog/features/postventa-01-ingesta-postgres.md` | implementado-según-ledger | código postventa | 2026-05 |
| `docs/backlog/features/postventa-02-matching-persistido.md` | implementado-según-ledger | código postventa | 2026-05 |
| `docs/backlog/features/postventa-03-ui-analisis.md` | pendiente | backlog postventa | 2026-05 |
| `docs/backlog/features/postventa-04-reporte-pdf.md` | pendiente | backlog postventa | 2026-05 |
| `docs/backlog/features/postventa-05-mcp-contratos.md` | pendiente | backlog postventa | 2026-05 |

## Módulos Reales

| Módulo | Estado | Archivos principales |
|---|---|---|
| Shell/login | implementado | `app/layout.tsx`, `app/(pages)/layout.tsx`, `app/login/page.tsx`, `proxy.ts`, `lib/auth.ts` |
| Dashboard/modelos | implementado | `app/(pages)/dashboard/page.tsx`, `components/ModelMarketPanel.tsx`, `components/AcaraTrendPanel.tsx` |
| Explorador | implementado | `app/(pages)/explorador/page.tsx`, `app/api/tractors/route.ts`, `lib/data/loadListings.ts` |
| ACARA | implementado | `app/(pages)/acara/page.tsx`, `app/api/acara/**`, `lib/data/loadAcara.ts`, `store/useAcaraMappings.ts` |
| Análisis 1 | implementado | `app/(pages)/analisis-1/page.tsx`, `app/api/analisis-1/route.ts`, `lib/analysis/analisis1.ts` |
| Análisis 2 | implementado | `app/(pages)/analisis-2/page.tsx`, `app/api/analisis-2/**`, `lib/analysis/analisis2.ts` |
| Reporte Venturino PDF | implementado | `app/api/reports/venturino/route.ts`, `lib/reports/venturinoVsMercado.tsx` |
| Ingesta maquinaria | implementado | `scripts/pipeline-live.js`, `scripts/pipeline-shared.js`, `prisma/schema.prisma` |
| FX | implementado | `lib/fx-rate.ts`, `scripts/syncFxRate.js`, `app/api/sync-fx-rate/route.ts` |
| Postventa ingesta/análisis | parcial | `scripts/pipeline-postventa.js`, `lib/postventa/**`, `app/api/postventa/analyze/route.ts` |
| MCP | no implementado | `docs/technical/mcp-coverage-map.md` |

## Cambios De Cliente

| Solicitud | Estado | Impacto | Backlog |
|---|---|---|---|
| Onboarding de proyecto existente | procesado | Documentación técnica y contexto para futuras tareas | No requiere feature |
| Migrar Next.js a 16 y retirar CSVs MVP legacy | procesado | Dependencias, proxy, lint config y documentación actualizados; ACARA CSV activo se conserva | Pendiente decidir migración ACARA a DB si se quiere eliminar todo CSV runtime |

## Riesgos Registrados

- Hay archivos históricos o plantillas con contenido desactualizado respecto de la arquitectura actual.
- Algunos documentos previos muestran mojibake; los documentos actualizados en esta pasada deben quedar en UTF-8 correcto.
- No hay `.env.example` versionado como contrato de entorno.
- No hay suite de tests ni script `test`.
- Auth actual es suficiente para MVP interno, pero no cubre roles, tenant, permisos ni auditoría.
- `npx prisma db push` en deploy evita trazabilidad fina de migraciones para todo el schema.
- No hay MCP real pese a la política MCP-first; la deuda debe permanecer visible.

## Reglas De Procesamiento

- Respetar Next.js 16.2.7 instalado y Node >= 20.9.0.
- No usar CSVs legacy de MVP como fuente runtime. ACARA sigue siendo la única fuente CSV activa documentada.
- Respetar diseño visual propio Venturino/John Deere y componentes existentes por encima de `VISUAL_GUIDELINES.md`.
- Antes de cambios grandes, usar CodeGraph si está disponible y luego leer archivos reales.
- No implementar features sin brief/backlog aprobado, salvo pedido explícito.
- Mantener `docs/technical/mcp-coverage-map.md` actualizado para capacidades operativas nuevas.
