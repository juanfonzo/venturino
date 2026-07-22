# MCP Coverage Map

Última revisión: 2026-07-17.

## Estado General

No hay implementación MCP Python/FastAPI en el repo actual. No se detectó carpeta `mcp/`, servicio FastAPI ni herramientas MCP ejecutables.

Por política del kit, las capacidades operativas relevantes deben quedar visibles como `contrato-candidato`, `no-aplica` o `bloqueado` hasta que exista el MCP real.

## Estados Válidos

- `implementado`
- `contrato-candidato`
- `no-aplica`
- `bloqueado`

## Mapa

| Módulo | Capacidad | UI/API relacionada | Herramienta MCP candidata | Estado | Permisos | Campos sensibles excluidos | Feature/Origen | Última revisión |
|---|---|---|---|---|---|---|---|---|
| Mercado | Consultar KPIs y distribución de mercado | `/api/stats`, `/dashboard` | `mercado_resumen_kpis` | contrato-candidato | Usuario interno autenticado | Credenciales, datos infra | Onboarding | 2026-06-03 |
| Mercado | Listar publicaciones con filtros | `/api/tractors`, `/explorador` | `mercado_listar_publicaciones` | contrato-candidato | Usuario interno autenticado | Secretos, datasets sin límite | Onboarding | 2026-06-03 |
| Mercado | Consultar detalle/historial de publicación | `/api/listings/price-history` | `mercado_detalle_publicacion` | contrato-candidato | Usuario interno autenticado | Secretos, logs técnicos | Onboarding | 2026-06-03 |
| Mercado | Evolución de precios por modelo | `/api/market-evolution`, `ModelMarketPanel` | `mercado_evolucion_modelo` | contrato-candidato | Usuario interno autenticado | Sin datos de conexión | Onboarding | 2026-06-03 |
| Mercado | Consultar referencias directas y búsqueda ampliada de usados | `/api/v1/market-references/direct`, `/api/v1/market-references/search` | `mercado_buscar_referencias` | contrato-candidato | Identidad técnica Padawanway; usuario interno en MCP futuro | Secretos, metadatos de scraping y datasets sin límite | API Padawanway | 2026-07-17 |
| ACARA | Buscar referencias ACARA | `/api/acara/items`, `/api/acara/item/[id]` | `acara_buscar_referencias` | contrato-candidato | Usuario interno autenticado | CSV completo sin paginar | Onboarding | 2026-06-03 |
| ACARA | Sugerir vínculo ACARA para modelo | `/api/acara/suggest`, `/api/acara/auto-match` | `acara_sugerir_vinculo` | contrato-candidato | Usuario interno autenticado | Sin secretos | Onboarding | 2026-06-03 |
| ACARA | Gestionar vínculos marca/modelo | `store/useAcaraMappings.ts`, `/api/mappings` | `acara_gestionar_vinculos` | bloqueado | Usuario interno autenticado | N/A | Bloquea fuente canónica de persistencia | 2026-06-03 |
| Análisis 1 | Comparar Venturino vs competencia | `/api/analisis-1`, `/analisis-1` | `mercado_comparar_venturino_competencia` | contrato-candidato | Usuario interno autenticado | Datasets completos sin límite | Onboarding | 2026-06-03 |
| Análisis 2 | Consultar stock/capital por competidor | `/api/analisis-2`, `/analisis-2` | `mercado_resumen_competidores` | contrato-candidato | Usuario interno autenticado | Datasets completos sin límite | Onboarding | 2026-06-03 |
| Reportes | Generar reporte Venturino PDF | `/api/reports/venturino` | `reportes_generar_venturino` | contrato-candidato | Usuario interno autenticado | Bytes pesados por defecto, secretos | Onboarding | 2026-06-03 |
| Reportes | Generar reporte Postventa PDF | `/api/reports/postventa` | `postventa_generar_reporte` | contrato-candidato | Usuario interno autenticado | Bytes pesados por defecto, secretos | `postventa-04` | 2026-06-04 |
| FX | Consultar cotización vigente | `/api/sync-fx-rate` GET | `fx_obtener_cotizacion` | contrato-candidato | Usuario interno autenticado | Sin secretos | Onboarding | 2026-06-03 |
| FX | Sincronizar cotización y recalcular precios | `/api/sync-fx-rate` POST | `fx_sincronizar_cotizacion` | bloqueado | Requiere identidad técnica/confirmación | Secretos, detalle infra | Falta auth interna robusta | 2026-06-03 |
| Postventa | Ejecutar análisis postventa | `/api/postventa/analyze` | `postventa_ejecutar_analisis` | contrato-candidato | Usuario interno técnico + confirmación | Mongo/DB secrets | `postventa-02` | 2026-06-03 |
| Postventa | Consultar resumen/listado/detalle | Propuesto en `docs/technical/postventa-ml.md` | `postventa_resumen_analisis`, `postventa_listar_productos`, `postventa_detalle_producto` | contrato-candidato | Usuario interno autenticado | Secretos, datasets sin límite | `postventa-05` | 2026-06-03 |
| Agentes IA | Telegram/WhatsApp/asistente | No existe | N/A | no-aplica | N/A | N/A | No hay agente en alcance actual | 2026-06-03 |

## Deuda MCP Activa

| Capacidad | Estado | Motivo | Desbloqueo requerido | Backlog |
|---|---|---|---|---|
| Base MCP Python/FastAPI | bloqueado | No existe servicio MCP en repo | Definir carpeta/servicio, auth interna, contratos y runtime | Crear backlog técnico |
| Auth/permiso para MCP | bloqueado | Sistema sólo tiene JWT simple web y endpoints locales por host | Definir identidad técnica o permisos internos | Crear backlog técnico |
| Vínculos ACARA canónicos | bloqueado | Persistencia dominante en localStorage; endpoint JSON local no alcanza como fuente colaborativa robusta | Decidir DB vs archivo y migración | Pendiente |
| Postventa tools | contrato-candidato | Contratos propuestos, sin implementación MCP | Implementar MCP base y herramientas paginadas | `postventa-05-mcp-contratos.md` |

## Reglas Para Implementar MCP Futuro

- No devolver listados sin `limit`/paginación; default recomendado 25, máximo 100.
- Excluir secretos y detalles de infraestructura.
- Respetar sesión/permisos del sistema o definir identidad técnica explícita.
- Para acciones sensibles como sync FX o ejecutar análisis, requerir confirmación y autorización interna.
- No duplicar reglas de negocio: reutilizar services existentes o exponer adaptadores claros.
