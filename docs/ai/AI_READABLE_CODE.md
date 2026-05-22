# AI-Readable Code

## Propósito

El código de los sistemas personalizados de Algorym debe ser fácil de leer, navegar y modificar por humanos y por agentes como Codex.

Esto no significa escribir código verboso. Significa crear estructuras predecibles, nombres claros, límites explícitos y feedback loops verificables.

## Principios Generales

- Revisar el contexto real del código antes de editar. Usar `docs/ai/CODE_CONTEXT_POLICY.md`.
- Preferir módulos pequeños con responsabilidad clara.
- Usar nombres de dominio, no nombres genéricos.
- Separar UI, lógica de negocio, acceso a datos e integraciones.
- Mantener contratos tipados entre capas.
- Evitar helpers globales ambiguos.
- Evitar archivos enormes con muchas responsabilidades.
- Documentar sólo decisiones no obvias.
- Mantener UTF-8 en código, comentarios, fixtures, seeds y copy visible.

## Next.js

- Version objetivo para proyectos nuevos: Next.js 16. En repos existentes, respetar la version instalada salvo pedido explicito de migracion.
- Antes de usar APIs version-specific de Next.js 16, revisar patrones del repo o documentacion oficial.
- Mantener route handlers, server actions, services y repositories separados cuando el flujo lo justifique.
- No mezclar lógica de negocio compleja dentro de componentes UI.
- Usar tipos explícitos para inputs y outputs de acciones/server functions.
- Mantener validaciones del lado servidor como fuente de verdad.
- Reutilizar patrones existentes del repo antes de crear nuevos.
- Nombrar carpetas y componentes según el dominio del cliente.

## Tailwind CSS

- Preferir clases Tailwind simples y consistentes.
- Extraer componentes cuando se repita una estructura real, no por repetición accidental de clases.
- Evitar strings de clases extremadamente largos si dificultan lectura; considerar variantes/componentes locales.
- Mantener responsive explícito y verificable.
- No introducir estilos inline salvo casos justificados.
- Respetar `docs/ai/VISUAL_GUIDELINES.md` si no hay branding del cliente.

## Python/FastAPI/MCP

- Separar routers, modelos, servicios y adaptadores externos.
- Usar modelos tipados para entradas y salidas.
- Mantener herramientas MCP pequeñas, con permisos y errores claros.
- No acoplar directamente herramientas MCP a detalles internos de UI.
- Documentar variables de entorno sin exponer secretos.
- Usar tests de comportamiento para herramientas críticas.

## Para Agentes

Cada feature debería dejar claro:

- dónde entra el usuario o agente
- qué datos lee
- qué acción ejecuta
- qué permisos requiere
- qué errores puede devolver
- cómo se verifica

## Señales De Código Difícil Para IA

- Un archivo requiere leer muchas carpetas para entender una acción simple.
- Los nombres no reflejan conceptos del negocio.
- Hay lógica crítica en callbacks o componentes muy grandes.
- Las validaciones están duplicadas y divergen.
- El estado de UI no refleja estados reales del backend.
- Las integraciones externas no tienen adaptador ni contrato claro.

## Regla De Cierre

Antes de cerrar una implementación, revisar si el código queda navegable para un agente futuro:

- ¿Dónde empieza el flujo?
- ¿Dónde está la regla de negocio?
- ¿Dónde se valida?
- ¿Dónde se persiste?
- ¿Dónde se prueba?
- ¿Qué documento explica la decisión?
