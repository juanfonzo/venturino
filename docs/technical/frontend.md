# Frontend

Última revisión: 2026-06-04.

## Regla Visual Del Proyecto

El proyecto ya tiene diseño UI/UX propio y debe prevalecer sobre `docs/ai/VISUAL_GUIDELINES.md`.

Respetar identidad Venturino/John Deere, paleta `jd`, topbar actual, paneles, tablas, botones redondeados y lenguaje visual existente. No forzar el shell lateral base del kit ni rediseñar la app salvo pedido explícito.

## Stack

- Next.js 16.2.7 App Router.
- React 18.
- Tailwind CSS 3.
- Recharts para gráficos.
- React Leaflet para mapas.
- Componentes UI propios, sin shadcn instalado como dependencia real.

## Shell Y Navegación

- Layout raíz: `app/layout.tsx`, HTML `lang="es"`, fondo global.
- Layout privado: `app/(pages)/layout.tsx`.
- Header: `components/SiteHeader.tsx`.
- Footer: `components/SiteFooter.tsx`.
- Navegación actual: topbar horizontal con pills.
- Módulos visibles: Dashboard, Análisis 1, Análisis 2, Explorador, ACARA.
- Logout en header mediante `POST /api/auth/logout`.
- Responsive: header pasa de columna a fila en `sm`; main usa `max-w-6xl` con padding responsive.

## Pantallas

| Ruta | Tipo | Patrones UX |
|---|---|---|
| `/login` | formulario | Card centrada, error inline, loading en botón, disabled si faltan campos. |
| `/dashboard` | dashboard | Paneles, tabla de estado, tendencia ACARA, panel interactivo de modelos. |
| `/explorador` | listado | Filtros, chips de filtros activos, tabla, paginación, modal de detalle. |
| `/acara` | herramienta operativa | Buscador, tabla paginada, detalle con chart, sugerencias, import/export JSON. |
| `/analisis-1` | análisis | Filtros compactos, rankings, tabla, drawer lateral de equivalentes. |
| `/analisis-2` | análisis | MultiSelect, KPIs, tablas paginadas, drawer inferior, modal de detalle por empresa. |
| `/postventa` | benchmark | KPIs, filtros, tabla paginada de ancho completo, acción `Ver` por fila y modal simple de candidatos ML. |

## Componentes Reutilizables

| Componente/clase | Uso |
|---|---|
| `components/ui/Button.tsx` | Botones `primary`, `secondary`, `ghost`, `outline`; tamaños `sm/md/lg`. |
| `components/ui/Input.tsx` | Inputs con borde, foco verde y fondo translúcido. |
| `components/ui/Select.tsx` | Selects consistentes con inputs. |
| `components/ui/MultiSelect.tsx` | Dropdown con búsqueda y checkboxes. |
| `components/ui/Badge.tsx` | Estados compactos `green`, `yellow`, `red`, `muted`. |
| `components/ui/Spinner.tsx` | Loading inline. |
| `KpiCard` | KPI panelizado. |
| `.panel`, `.panel-header`, `.panel-body` | Contenedor visual base. |
| `.table-base` | Tablas compactas. |
| Charts | `AcaraSeriesChart`, `MarketEvolutionChart`, `ListingPriceHistoryChart`. |

## Diseño Actual

- Paleta: verde John Deere, amarillo, crema, negro suave y arena definidos en `tailwind.config.ts`.
- Fondo global: radial amarillo suave + gradiente claro.
- Paneles: bordes suaves, fondo blanco translúcido, blur y `shadow-soft`.
- Botones/nav: pills redondeadas.
- Tablas: compactas, headers uppercase, divisores finos.
- Modales/drawers: overlays oscuros, panel blanco o `.panel`, cierre por botón y en algunos casos click fuera.
- Formularios: labels pequeñas uppercase o semibold, inputs propios, mensajes de error.
- Estados: varias vistas cubren loading/error/empty; mantener ese estándar.
- Responsive: uso de grids `sm`, `md`, `lg`; tablas suelen quedar en `overflow-auto`.

## Patrones De Interacción

- Filtros resetean página a 1.
- Listados grandes usan paginación visible o límites.
- Búsquedas con debounce en paneles específicos (`AcaraTrendPanel`, `ModelMarketPanel`).
- Detalles se abren por click en fila.
- Links externos abren en nueva pestaña.
- ACARA permite exportar/importar vínculos JSON.

## Deuda UX/UI Detectada

- Hay copy visible sin acentos en algunos componentes (`Analisis`, `Pagina`, `busqueda`, `vinculo`, etc.); corregir sólo cuando se toque esa pantalla o haya tarea de copy/encoding.
- Algunas tablas pueden requerir adaptación a cards compactas en mobile si el uso móvil se vuelve prioritario.
- No hay sidebar colapsable; no implementarlo por default porque contradice el diseño existente consolidado.
- Hay componentes con `any` puntual en ACARA (`currency as any`), revisar sólo si se toca ese flujo.
- `Button` no acepta atributos HTML genéricos más allá de los definidos; extender con cuidado si se necesita.

## Criterios Para Futuras UI

- Reusar componentes y clases existentes antes de crear nuevos estilos.
- Mantener copy en español y UTF-8 correcto.
- Conservar estados loading, error, vacío y disabled.
- Para listados nuevos, aplicar paginación server-side si pueden crecer.
- Para búsquedas nuevas, preferir backend tokenizado si operan sobre datos grandes.
- No agregar landing page ni hero marketing; la app es herramienta operativa interna.
