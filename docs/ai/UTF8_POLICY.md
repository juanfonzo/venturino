# Política UTF-8

## Regla

Todo archivo de texto, código, documentación, seed, fixture, migración, export, prompt, skill, agente y texto visible del sistema debe escribirse y conservarse en UTF-8.

Esto aplica a:

- Markdown.
- TypeScript, JavaScript, TSX y JSX.
- Python.
- SQL y migraciones.
- Prisma, Drizzle u otro schema.
- JSON, YAML, TOML y variables de configuración sin secretos.
- Seeds, fixtures y datos de prueba.
- Copys visibles para usuario.
- Skills del sistema destino.
- Documentación MCP.

## Criterio De Trabajo

- Preservar acentos, eñes, signos de apertura, símbolos y vocabulario en español.
- No normalizar textos a ASCII si el producto o documento usa español.
- No mezclar archivos en ANSI, Windows-1252 u otra codificación.
- Si aparece texto corrupto como `Ã¡`, `Ã±`, `Â¿` o similares, detener la edición del archivo afectado y corregir encoding antes de seguir.
- Si una herramienta o comando genera texto corrupto, registrar el riesgo y preferir edición directa controlada.

## Para Codex

- Antes de editar archivos con texto visible, verificar si el archivo ya presenta corrupción.
- Al crear archivos nuevos, asumir UTF-8.
- Al mover, compactar o archivar Markdown, conservar caracteres originales.
- No introducir reemplazos destructivos masivos sobre texto con acentos sin revisar resultado.
- Si se detecta corrupción en un archivo no relacionado con la tarea, no reescribirlo completo salvo que sea necesario; registrar o consultar.

## Para Desarrolladores

- Abrir repos desde Codex Desktop o un editor configurado en UTF-8.
- Evitar guardar Markdown o código como ANSI.
- Si se pega texto desde PDF, WhatsApp, Word o Notion, revisar que los caracteres se vean correctamente.
- Si Codex informa corrupción de encoding, resolverla antes de seguir con implementación.
