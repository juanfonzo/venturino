# Feature: Sección Web Postventa

Tipo: AFK
Estado: pendiente
Hito: Hito 02 - Postventa Venturino vs MercadoLibre
Bloqueado por: `postventa-02-matching-persistido`

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

- [ ] Existe ruta `/postventa` protegida.
- [ ] La navegación permite acceder a la sección.
- [ ] KPIs muestran conteos por estado.
- [ ] Tabla usa paginación server-side.
- [ ] Filtros se aplican en backend.
- [ ] Cada producto permite abrir detalle con candidatos y motivos.
- [ ] Estados loading, vacío y error están cubiertos.
- [ ] La UI muestra cuándo no hay corrida de análisis.
- [ ] No se cargan todos los productos/candidatos en memoria.

## Definition Of Ready

- [x] Criterios de aceptación claros.
- [x] Refinamiento aplicado o vía rápida justificada.
- [x] Modelo de datos o impacto DB definido.
- [x] Permisos definidos o marcado no aplica.
- [x] Impacto IA-first evaluado.
- [x] Estado MCP definido: `contrato-candidato`.
- [x] Tests esperados definidos.

## Tareas Técnicas

- [ ] Implementar APIs paginadas.
- [ ] Crear página `/postventa`.
- [ ] Crear componentes de KPIs, filtros, tabla y detalle.
- [ ] Agregar link en navegación.
- [ ] Implementar formatos ARS y porcentaje.
- [ ] Agregar botón de descarga PDF.
- [ ] Validar responsive desktop/mobile.

## MCP/IA

- Estado MCP: contrato-candidato
- Herramientas afectadas: `postventa_listar_productos`, `postventa_detalle_producto`
- Coverage map actualizado: sí
- Skills del sistema destino afectados: no aplica
- Motivo si no aplica: UI no expone MCP por sí sola.

## Definition Of Done

- [ ] Implementado.
- [ ] Validado.
- [ ] Tests/build/lint ejecutados o justificados.
- [ ] Estados UX cubiertos si aplica.
- [ ] MCP/skills del sistema actualizados, registrados como contrato-candidato, bloqueados o marcado no aplica.
- [ ] `docs/technical/mcp-coverage-map.md` actualizado si hubo capacidad operativa.
- [ ] Documentación y manifest actualizados si aplica.
- [ ] Entrada creada en `docs/backlog/archive/YYYY-MM.md`.

## Verificación

- Nivel de verificación esperado: 3
- Navegador requerido: sí.
- [ ] Verificar carga con datos.
- [ ] Verificar filtros sin resultados.
- [ ] Verificar detalle de producto.
- [ ] Verificar responsive.
- [ ] Verificar usuario no autenticado redirige a login.

## Entorno

- Variables requeridas: `DATABASE_URL`, auth existente.
- Credenciales requeridas: usuario interno.
- Fallback permitido: sí, fixtures o seed dev para UI.
- Estado de entorno: pendiente.
