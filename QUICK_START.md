# Quick Start

Guía rápida para usar el kit con Codex.

Para uso diario detallado, prompts recomendados, casos pesados/livianos y mejora continua, leer `GUIA_USO_CODEX_KIT.md` y `GUIA_DESARROLLADOR.md`.

## Inicio De Proyecto

1. Pegar propuesta comercial o texto de PDF en `input/propuesta-comercial.md`.
2. Abrir el repo desde Codex Desktop.
3. Pedir:

```txt
Procesá el intake pendiente y generá brief, faltantes y próximos pasos.
```

Si Codex devuelve faltantes bloqueantes, responder en el chat o completar:

```txt
docs/intake/respuestas-faltantes.md
```

Luego pedir:

```txt
Tomá las respuestas a faltantes y continuá con PRD, arquitectura y backlog del primer hito.
```

En proyectos nuevos, Codex también debe inicializar o revisar la base MCP Python/FastAPI y el mapa `docs/technical/mcp-coverage-map.md`, aunque algunas herramientas queden como contratos candidatos.

## Cambio De Cliente

1. Copiar `docs/changes/TEMPLATE.md` dentro de `docs/changes/pending/` con nombre específico, por ejemplo `2026-05-10-nueva-alerta-stock.md`.
2. Completar fecha, origen, pedido, contexto y preguntas abiertas.
3. Pedir:

```txt
Procesá los cambios pendientes del cliente.
```

Resultado esperado: mover o resumir la solicitud en `docs/changes/processed/` o `docs/changes/rejected/`, actualizar `MANIFEST.md` si cambia un artefacto canónico, declarar nivel de verificación y evaluar MCP si hubo capacidad operativa.

## Cambio Liviano

Para cambios de documentación, copy, color, spacing o ajustes visuales menores:

```txt
Procesá este cambio como ajuste liviano si corresponde y evitá PRD/backlog completo.
```

## Implementación

Para implementar una feature:

```txt
Implementá la feature docs/backlog/features/NOMBRE.md.
```

Si la feature toca capacidades operativas, datos, permisos, reportes, agentes, WhatsApp, Telegram o automatizaciones, Codex debe aplicar `docs/ai/MCP_FIRST_POLICY.md` y actualizar `docs/technical/mcp-coverage-map.md`.

Si el repo es grande o el cambio cruza varios modulos, inicializar o actualizar CodeGraph localmente:

```powershell
codegraph init -i
codegraph index
```

`.codegraph/` no se versiona y debe quedar en `.gitignore`.

## Verificación

Para validar:

```txt
Verificá la feature según su nivel de testing y cerrala si cumple Definition of Done.
```

## Reglas Prácticas

- No pegar todo en el chat si puede quedar en Markdown.
- No avanzar con implementación si hay faltantes bloqueantes.
- No crear feature para microcambios de nivel 0/1 salvo que afecten alcance o riesgo.
- No dejar plantillas vacías dentro de `docs/changes/pending/`.
- No cerrar una feature operativa sin estado MCP explícito.
- No guardar ni aceptar archivos con encoding distinto de UTF-8.
- No versionar `.codegraph/`; regenerarlo localmente despues de pulls o cambios grandes.
- Mantener `MANIFEST.md` actualizado.
