# Project Context

Última revisión: 2026-09-03.

## Proyecto

- Nombre: Venturino Radar de Mercado.
- Cliente: Ricardo Venturino S.A., concesionario John Deere en Argentina.
- Estado: desarrollo/mantenimiento de MVP existente.
- Tipo de sistema: app web interna para análisis de mercado de maquinaria agrícola y postventa.

## Propósito

El sistema ayuda a Venturino a comparar su inventario y publicaciones de mercado contra competidores, referencias ACARA y MercadoLibre. Busca responder:

- cómo se distribuyen precios, stock y capital inmovilizado por categoría, empresa y provincia;
- qué publicaciones de Venturino tienen comparables de mercado;
- qué modelos tienen brechas contra referencias ACARA;
- cómo evolucionan precios de publicaciones/modelos a través del historial;
- cómo se comparan productos de postventa Venturino contra publicaciones de MercadoLibre.

## Stack Real

- App principal: Next.js 16.2.7 con App Router, React 18 y TypeScript estricto. Requiere Node >= 20.9.0.
- UI: Tailwind CSS 3, componentes propios en `components/ui`, Recharts y React Leaflet.
- Backend: route handlers de Next.js en `app/api/**`.
- DB real: PostgreSQL con Prisma ORM 5.
- Datos externos/locales:
  - MongoDB Atlas para ingesta de publicaciones y productos postventa.
  - CSV ACARA local en `data/acara_precios_maquinaria_agricola_wide.csv`.
  - CSVs históricos de MVP eliminados; no deben reintroducirse como fuente runtime.
  - GeoJSON local para provincias.
  - DolarAPI para cotización oficial.
- Reportes: `@react-pdf/renderer`.
- Auth: JWT simple en cookie HttpOnly, usuario/contraseña por variables de entorno.
- MCP/agentes IA: no hay implementación MCP ni servicios de agentes en el repo actual; hay contratos candidatos documentales.

## Comandos

| Objetivo | Comando |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Start producción | `npm run start` |
| Lint configurado | `npm run lint` |
| Generar Prisma Client | `npx prisma generate` |
| Aplicar schema a DB según workflow actual | `npx prisma db push` |
| Pipeline publicaciones mercado | `npm run pipeline:live` |
| Pipeline postventa | `npm run pipeline:postventa` |
| Persistir análisis postventa | `npm run analysis:postventa-persist` |
| Análisis postventa local de calibración | `npm run analysis:postventa-matches` |
| Sincronizar FX | `npm run fx:sync` |
| Ver FX actual | `npm run fx:show` |
| Generar reporte Venturino | `npm run report:venturino` |
| Verificar API Padawanway | `npm run test:market-reference` |
| Reproducir falsos negativos auditados | `npm run verify:market-reference-zero-results` |
| Verificar superadmin | `npm run test:superadmin` |
| Importar snapshot PostgreSQL local | `npm run db:snapshot:import -- --snapshot <archivo.dump> --confirm REPLACE_LOCAL_DATABASE` |

No hay script `test` configurado.

## Variables Detectadas

Se detectaron nombres en `.env` sin exponer valores:

- `DATABASE_URL`
- `MONGODB_URI`
- `AUTH_USER`, `AUTH_PASSWORD`, `JWT_SECRET`
- `SUPERADMIN_USER`, `SUPERADMIN_PASSWORD`
- `PADAWANWAY_API_*`
- `LOCAL_SNAPSHOT_DATABASE_URL` y variables de protección para importar snapshots locales
- `ALERT_*` y `SMTP_*` cuando se habilitan alertas operativas

`.env.example` existe y es el contrato sin secretos. Los valores reales se leen desde `.env.local` o `.env` según el entorno; nunca se documentan en el repositorio.

## Lenguaje Ubicuo

| Término | Definición | Notas |
|---|---|---|
| Publicación | Registro de maquinaria publicado por Venturino o por un tercero | Entidad `Listing` en Prisma |
| Origen | Fuente de scraping/publicación | Ej.: `venturino`, `ml`, `agroads`, `rastroagro` |
| Condición/estado | Nuevo o usado | `condicion` es fuente de verdad funcional |
| Precio normalizado | Precio convertido a USD o ARS según módulo | Maquinaria usa USD; postventa usa ARS |
| ACARA | Lista de referencia de precios de maquinaria | Se carga desde CSV local |
| Vínculo ACARA | Relación manual/local entre marca-modelo de mercado e ítem ACARA | Persistencia principal actual en localStorage |
| Comparable | Publicación o producto similar usado para comparar precio | Reglas distintas entre maquinaria y postventa |
| Postventa | Productos/accesorios Venturino vs MercadoLibre | Modelos Prisma `Postventa*` |
| Corrida | Ejecución de importación o análisis | `ScrapingRun`, `PostventaImportRun`, `PostventaAnalysisRun` |
| Consulta de referencia | Request autenticado de Padawanway y su resultado/auditoría | `MarketReferenceQuery` |
| Snapshot PostgreSQL | Dump lógico completo de producción restaurable sólo sobre la DB local declarada | Ver `docs/technical/postgres-snapshot-sync.md` |
| Nivel de acceso | Identidad fija de sesión web | `VENTURINO` o `SUPERADMIN` |

## Alcance Funcional Actual

- Login privado simple.
- Dashboard con estado nuevo/usado, tendencia ACARA y panel de modelos.
- Explorador paginado de publicaciones con filtros y detalle modal.
- ACARA: búsqueda de ítems, detalle de serie, sugerencias y vínculos manuales.
- Análisis 1: Venturino vs competencia por marca/modelo, año y horas.
- Análisis 2: stock de competidores, capital, provincias, detalle por empresa y deduplicación.
- Reporte PDF Venturino vs mercado.
- Pipelines de ingesta desde MongoDB a PostgreSQL.
- Pipeline y análisis persistido de postventa.
- Sección `/postventa`, APIs paginadas, detalle de candidatos y reporte PDF Postventa.
- API externa Padawanway de referencias directas y búsqueda ampliada, activa en producción y auditada en PostgreSQL.
- Superadmin interno de Algorym para observar, revisar y alertar sobre consultas de referencias.

## Reglas De Negocio Críticas

- `condicion` define Nuevo/Usado; no inferir estado desde otros campos salvo flags de calidad.
- Precio cero, vacío, "Consultar", negativo, no finito o USD menor a 1000 debe tratarse como sin dato en maquinaria.
- Maquinaria normaliza precios a USD; ARS se convierte con FX guardado o fallback 1500.
- DolarAPI actualiza `FxRate` y recalcula listings ARS.
- Listados operan sobre publicaciones activas.
- Deduplicación de unidades usa empresa/marca/modelo/año/precio para evitar contar duplicados como stock real.
- Análisis 1 excluye Venturino como competidor y compara por marca/modelo, con opciones de año/horas/fuzzy.
- Análisis 2 excluye marketplaces sin vendedor real y calcula capital sólo sobre unidades únicas con precio.
- ACARA es referencia, no fuente transaccional; el match puede ser manual o sugerido por similitud.
- Postventa compara sólo productos activos de la última extracción por origen, con banda de precio por defecto ±40% y estado `similar a ML` en ±10%.
- `pipeline:postventa` importa Mongo a PostgreSQL y luego ejecuta `runPostventaAnalysis` directo; no requiere `POSTVENTA_ANALYSIS_URL`.
- La calibración offline `analysis:postventa-matches` usa el mismo runtime productivo `lib/postventa/matching.ts`.
- El PDF comercial Postventa exporta sólo `similar a ML`, `Venturino más caro que ML` y `Venturino más barato que ML`; excluye `sin comparable` y `baja confianza`.
- La API Padawanway usa sólo publicaciones externas, activas, usadas y con precio USD válido. Sus aliases son acotados por marca/categoría; la guía de casos es `docs/technical/referencias-mercado-matching.md`.
- Las consultas aceptadas de Padawanway se auditan en `MarketReferenceQuery`; el superadmin permite clasificarlas sin alterar la respuesta histórica enviada al CRM.
- La base local de análisis se alinea mediante un snapshot completo de PostgreSQL; no se abre acceso público ni remoto directo a producción.
- Los CSVs de MVP no son fuente vigente. La excepción actual es ACARA, que todavía se lee desde `data/acara_precios_maquinaria_agricola_wide.csv` hasta migrar esa referencia a DB u otra fuente.

## Fuera De Alcance / No Implementado

- MCP Python/FastAPI real.
- Servicios de agentes IA.
- Roles, permisos granulares, tenant o sucursales.
- Autoregistro/signup.
- Persistencia server-side formal para vínculos ACARA como fuente única; hoy domina localStorage.
- MCP Python/FastAPI real y servicios de agentes IA.

## Acceso y observabilidad interna

- Auth web: se conserva el login por variables de entorno y se incorpora un segundo par `SUPERADMIN_USER`/`SUPERADMIN_PASSWORD` para Algorym.
- Sesión: el JWT distingue `VENTURINO` y `SUPERADMIN`; los tokens históricos sin nivel se interpretan como `VENTURINO`.
- Módulo nuevo: `/superadmin` permite observar consultas de la API Padawanway, revisar resultados y probar alertas SMTP.
- Padawanway: el contrato público, los headers HMAC y los bodies permanecen sin cambios.
- Alcance: no hay usuarios en DB, permisos configurables, tenant, Redis, worker ni MCP implementado. El deploy configura cron de FX y backup de PostgreSQL en el host.
