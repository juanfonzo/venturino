# Feature: Sección Web Postventa

Tipo: AFK
Estado: implementado
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: no bloqueado; requiere una corrida para mostrar datos reales

## Valor De Negocio

Dar al equipo de Venturino una pantalla operativa para revisar posicionamiento de precios por artículo, detectar diferencias contra ML y entender candidatos sugeridos.

## Qué Construir

Crear ruta `/postventa` con resumen, filtros, tabla paginada y detalle de producto con candidatos usados y trazabilidad.

## Dependencias

- Datos: análisis persistido.
- Backend: `GET /api/postventa/summary`, `GET /api/postventa/products`, `GET /api/postventa/products/[id]`.
- Frontend: Next.js App Router, Tailwind y patrones existentes.
- Permisos: usuario autenticado por middleware existente.
- MCP/IA: no implementa herramienta, pero consume contratos candidatos.
- Otros módulos: navegación lateral.

## Impacto Transversal

- Áreas afectadas: navegación, APIs, componentes UI.
- Riesgos: tablas densas en mobile y exceso de candidatos visibles.
- Ajustes futuros a registrar: revisión manual persistente si negocio la pide.

## Criterios De Aceptación

- [x] Existe ruta `/postventa` protegida.
- [x] La navegación permite acceder a la sección.
- [x] KPIs muestran conteos por estado.
- [x] Tabla usa paginación server-side.
- [x] Filtros se aplican en backend.
- [x] Cada producto permite abrir detalle con candidatos y motivos.
- [x] Estados loading, vacío y error están cubiertos.
- [x] La UI muestra cuándo no hay corrida de análisis.
- [x] No se cargan todos los productos/candidatos en memoria.

## Definition Of Ready

- [x] Criterios de aceptación claros.
- [x] Refinamiento aplicado o vía rápida justificada.
- [x] Modelo de datos o impacto DB definido.
- [x] Permisos definidos o marcado no aplica.
- [x] Impacto IA-first evaluado.
- [x] Estado MCP definido: `contrato-candidato`.
- [x] Tests esperados definidos.

## Tareas Técnicas

- [x] Implementar APIs paginadas.
- [x] Crear página `/postventa`.
- [x] Crear componentes de KPIs, filtros, tabla y detalle.
- [x] Agregar link en navegación.
- [x] Implementar formatos ARS y porcentaje.
- [x] Agregar botón de descarga PDF.
- [x] Validar responsive desktop/mobile de forma proporcional.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_listar_productos`, `postventa_detalle_producto`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no aplica
- Motivo si no aplica: UI no expone MCP por sí sola.

## Definition Of Done

- [x] Implementado.
- [x] Validado con build, lint y respuestas controladas.
- [x] Tests/build/lint ejecutados o justificados.
- [x] Estados UX cubiertos.
- [x] MCP registrado como contrato-candidato.
- [x] `docs/technical/mcp-coverage-map.md` actualizado.
- [x] Documentación y manifest actualizados.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md`.

## Verificación

- Nivel de verificación esperado: 3
- Navegador requerido: sí.
- [x] Verificar carga y estado sin corrida persistida.
- [x] Verificar filtros sin resultados.
- [x] Verificar detalle de producto.
- [x] Verificar responsive de forma proporcional.
- [x] Verificar usuario no autenticado redirige a login.

## Entorno

- Variables requeridas: `DATABASE_URL`, auth existente.
- Credenciales requeridas: usuario interno.
- Fallback permitido: sí, fixtures o seed dev para UI.
- Estado de entorno: UI operativa; para datos reales necesita una corrida de análisis persistida.
