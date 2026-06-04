# Project Context

Última revisión de onboarding: 2026-06-04.

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

No hay script `test` configurado.

## Variables Detectadas

Se detectaron nombres en `.env` sin exponer valores:

- `DATABASE_URL`
- `MONGODB_URI`
- `AUTH_USER`
- `AUTH_PASSWORD`
- `JWT_SECRET`

No se encontró `.env.example`. Para futuras tareas grandes conviene crearlo como contrato sin secretos.

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

## Reglas De Negocio Críticas

- `condicion` define Nuevo/Usado; no inferir estado desde otros campos salvo flags de calidad.
- Precio cero, vacío o "Consultar" debe tratarse como sin dato.
- Maquinaria normaliza precios a USD; ARS se convierte con FX guardado o fallback 1500.
- DolarAPI actualiza `FxRate` y recalcula listings ARS.
- Listados operan sobre publicaciones activas.
- Deduplicación de unidades usa empresa/marca/modelo/año/precio para evitar contar duplicados como stock real.
- Análisis 1 excluye Venturino como competidor y compara por marca/modelo, con opciones de año/horas/fuzzy.
- Análisis 2 excluye marketplaces sin vendedor real y calcula capital sólo sobre unidades únicas con precio.
- ACARA es referencia, no fuente transaccional; el match puede ser manual o sugerido por similitud.
- Postventa compara sólo productos activos de la última extracción por origen, con banda de precio por defecto ±40%.
- Los CSVs de MVP no son fuente vigente. La excepción actual es ACARA, que todavía se lee desde `data/acara_precios_maquinaria_agricola_wide.csv` hasta migrar esa referencia a DB u otra fuente.

## Fuera De Alcance / No Implementado

- MCP Python/FastAPI real.
- Servicios de agentes IA.
- Roles, permisos granulares, tenant o sucursales.
- Autoregistro/signup.
- UI postventa completa y APIs de listado/detalle propuestas en `docs/technical/postventa-ml.md`.
- Persistencia server-side formal para vínculos ACARA como fuente única; hoy domina localStorage.
