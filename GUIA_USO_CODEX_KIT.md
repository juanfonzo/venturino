# Guia Operativa Para Usar El Kit Con Codex

## Objetivo

Esta guia explica como debe trabajar un desarrollador con Codex para que el kit se use correctamente sin administrar manualmente todos los `.md`.

Regla base: el desarrollador conversa con Codex; Codex lee, crea, actualiza, compacta o limpia los documentos del kit cuando corresponde.

## Principios Del Uso Diario

- Usar el chat como interfaz principal.
- Cargar archivos solo al iniciar proyecto, cuando el input sea extenso o cuando convenga dejar una fuente canonica.
- Pedir objetivos y contexto, no instrucciones de archivo por archivo.
- Dejar que Codex elija el flujo: via rapida, refinamiento, backlog, implementacion, diagnostico o verificacion.
- No cerrar tareas sin verificacion proporcional.
- No cerrar features operativas sin estado MCP explicito.
- Mantener todo en UTF-8.

## Inicio Robusto De Proyecto

Antes de pedir implementacion, el repo debe tener:

- Kit copiado en la raiz del proyecto.
- `AGENTS.md` del repo.
- Propuesta, presupuesto o notas iniciales en `input/propuesta-comercial.md` o pegadas en el chat si son breves.
- `docs/ai/PROJECT_CONTEXT.md` con cliente, dominio, stack y vocabulario inicial.
- Variables requeridas documentadas en `.env.example` y cargadas con valores reales en `.env.local` cuando aplique.
- Decision de app principal: Next.js 16 para proyectos nuevos; si es repo existente, respetar version instalada salvo migracion explicita.
- Decision de base de datos de desarrollo: Postgres + Prisma ORM si el sistema usara DB real.
- Confirmacion de que no habra login bloqueante para pruebas en desarrollo.

Prompt recomendado:

```txt
Vamos a iniciar este proyecto usando el kit.

Lee AGENTS.md, PROJECT_CONTEXT, MANIFEST y la propuesta en input/.
Procesa el intake, genera faltantes bloqueantes y no avances a backlog implementable hasta que esten resueltos.

Si el proyecto usara base de datos real, toma Postgres + Prisma ORM como camino por defecto desde el inicio, tanto local como desarrollo.
Usa Next.js 16 como version objetivo de la app principal si el proyecto es nuevo.
Recorda aplicar UTF-8, MCP-first en Python/FastAPI y testing proporcional.
```

## Cuando Codex Devuelve Faltantes

Responder por chat suele ser suficiente.

Prompt recomendado:

```txt
Respuestas a faltantes:

1. ...
2. ...
3. ...

Incorpora estas respuestas, actualiza los documentos necesarios y decime si todavia queda algun bloqueante.
```

Codex debe frenar si faltan datos criticos de:

- permisos;
- modelo de datos;
- flujo principal;
- integracion;
- criterio de aceptacion;
- entorno o credenciales;
- alcance contractual.

## Planificacion Y Backlog

Pedir backlog solo cuando haya claridad suficiente.

Prompt recomendado:

```txt
Con los requerimientos ya refinados, genera el backlog tecnico del primer hito.

Quiero vertical slices demoables, dependencias claras, Definition of Ready, Definition of Done, nivel de testing y estado MCP por feature.
```

Cada feature debe declarar:

- valor de negocio;
- que construir;
- dependencias;
- impacto transversal;
- criterios de aceptacion;
- estado MCP: `implementado`, `contrato-candidato`, `no-aplica` o `bloqueado`;
- nivel de verificacion;
- entorno requerido.

## Implementar Una Feature Pesada

Usar para cambios que tocan datos, permisos, backend, frontend, MCP, integraciones o flujos criticos.

Prompt recomendado:

```txt
Implementa la feature docs/backlog/features/NOMBRE.md.

Antes de editar codigo:
- aplica CODE_CONTEXT_POLICY;
- revisa archivos y patrones relacionados;
- verifica dependencias y permisos;
- evalua impacto MCP-first;
- si la feature usa DB real, usa Postgres + Prisma ORM desde el inicio y no persistencia manual.

Implementa por vertical slice, actualiza docs/backlog/MANIFEST/MCP coverage solo si corresponde y ejecuta la verificacion definida.
```

Codex debe:

- leer contexto proporcional;
- no asumir requerimientos ambiguos;
- no usar subagentes si no aportan valor real;
- aplicar MCP-first si hay capacidad operativa;
- usar Postgres + Prisma ORM como default si hay DB real;
- verificar con tests, typecheck, navegador nativo de Codex o revision manual segun riesgo;
- cerrar y limpiar artefactos temporales.

## CodeGraph En Repos Grandes

CodeGraph es una ayuda local para navegar proyectos extensos. No reemplaza lectura de codigo ni documentos versionados.

Usarlo cuando el repo sea grande, el impacto sea incierto o el cambio cruce varios modulos.

Preparacion por proyecto:

```powershell
codegraph init -i
```

Uso despues de `git pull`, merge o cambios grandes:

```powershell
codegraph index
```

Reglas practicas:

- `.codegraph/` debe estar en `.gitignore`.
- Cada dev mantiene su propio indice local.
- No pedir CodeGraph para cambios livianos.
- Si Codex lo usa, debe leer luego los archivos criticos reales antes de editar.
- Si no esta instalado, Codex debe continuar con `CODE_CONTEXT_POLICY.md`.

Prompt util:

```txt
Usa el kit dev IA. Como este repo es grande, si CodeGraph esta disponible usalo primero para mapear impacto y archivos candidatos. Despues lee los archivos criticos reales antes de editar.
```

## Implementar Un Ajuste Liviano

Usar para copy, color, spacing, texto visible, documentacion o cambios sin logica nueva.

Prompt recomendado:

```txt
Aplica este ajuste como via rapida si corresponde:

[describir cambio]

No generes PRD ni backlog completo salvo que detectes impacto en datos, permisos, MCP, logica o criterios de aceptacion.
Verifica proporcionalmente y limpia cualquier artefacto temporal que crees.
```

Codex debe escalar a flujo normal si detecta impacto real.

## Bugs O Regresiones

Prompt recomendado:

```txt
Hay un bug en [flujo].

Comportamiento esperado:
...

Comportamiento actual:
...

Diagnostica antes de modificar codigo, encontra la causa raiz, aplica el fix minimo y verifica que no rompa permisos, datos ni MCP.
```

Codex debe construir feedback loop antes de editar: reproducir, revisar logs/tests/codigo, corregir y verificar.

## Cambios Solicitados Por Cliente

Si el pedido es breve, usar chat.

```txt
El cliente pidio:

[pedido]

Procesalo como cambio de mantenimiento. Refina si falta informacion, genera backlog incremental solo si corresponde y no avances con supuestos riesgosos.
```

Si el pedido es largo, cargarlo en `docs/changes/pending/`.

Codex debe moverlo a `processed/` o `rejected/` al cerrar, o resumirlo en archive si corresponde.

## MCP-First En La Practica

Todo sistema personalizado de Algorym debe tener base MCP en Python/FastAPI.

El MCP es una API separada. Si el proyecto incluye un agente IA, como Telegram, WhatsApp o asistente interno, ese agente debe ser otro servicio/API separado que consume el MCP.

Para cada feature operativa, Codex debe actualizar o revisar:

- `docs/ai/MCP_FIRST_POLICY.md`;
- `docs/ai/AGENT_SERVICES_POLICY.md` si hay agente IA;
- `docs/ai/AGENT_FRAMEWORK_POLICY.md` si hay agente IA;
- `docs/ai/AUTH_POLICY.md` si hay auth, sesiones, roles, permisos, tenant, sucursales o acceso interno;
- `docs/ai/PAGINATION_POLICY.md` si hay listados, tablas, busquedas, reportes o tools MCP que devuelven listas;
- `docs/technical/mcp-python.md`;
- `docs/technical/mcp-coverage-map.md`;
- `docs/technical/agent-services.md` si hay Telegram, WhatsApp o asistente interno;
- `docs/ai/system-skills.md` si agentes del sistema necesitan saber operar la capacidad.

No todo cambio implementa una herramienta MCP inmediatamente. Lo importante es que no quede deuda invisible.

Estados validos:

- `implementado`: herramienta lista y verificada.
- `contrato-candidato`: contrato documentado, implementacion diferida.
- `no-aplica`: cambio sin capacidad operativa.
- `bloqueado`: falta definicion, permiso, entorno o decision.

Regla para agentes:

- el MCP expone herramientas;
- el agente aplica skills, prompts, estado conversacional y canal;
- LangGraph es recomendado para agentes no triviales; FastAPI simple alcanza para flujos lineales;
- LangChain se usa como apoyo cuando aporta valor concreto;
- el agente no accede directo a la DB operativa;
- acciones sensibles requieren confirmacion antes de invocar MCP.

## Testing Y Navegador

Codex debe elegir verificacion proporcional:

- Nivel 0: documentacion o revision estatica.
- Nivel 1: UI/copy ligero.
- Nivel 2: logica local, unit tests o typecheck.
- Nivel 3: flujo funcional con navegador.
- Nivel 4: flujo critico con casos negativos, permisos, datos y regresion.

Regla de navegador:

- usar el navegador nativo de Codex como primera opcion para validar UI y flujos visibles;
- no reemplazarlo por solo lectura de codigo cuando la aceptacion depende del comportamiento real;
- solo omitirlo si hay bloqueo de entorno o si el cambio no lo necesita.

Prompt util:

```txt
Verifica esta feature segun su nivel de testing.

Si requiere navegador, usa el navegador nativo de Codex, proba el flujo como usuario real, valida estados de error y deja evidencia de que se probo.
```

## UTF-8

Todo el kit, documentacion y codigo deben escribirse en UTF-8.

El desarrollador debe:

- abrir el repo con herramientas configuradas en UTF-8;
- revisar textos pegados desde PDF, Word, WhatsApp o Notion;
- avisar si ve caracteres corruptos.

Codex debe:

- preservar acentos, eñes y signos;
- detenerse si aparece corrupcion tipo `Ã¡`, `Ã±`, `Â¿`;
- corregir encoding antes de seguir editando el archivo afectado.

## Mejora Continua Del Kit

No toda friccion modifica el kit.

Prompt recomendado:

```txt
Revisa si esta situacion deberia generar una mejora del kit:

[describir problema, evidencia y repeticion si existe]

No modifiques agentes o skills salvo que haya evidencia suficiente. Si no alcanza, registralo como señal.
```

Codex debe usar:

- `docs/kit-improvement/inbox.md` para señales crudas;
- `docs/ai/LESSONS.md` para aprendizajes activos;
- `docs/backlog-interno/` para mejoras internas;
- agente `refinamiento-kit` cuando corresponda.

## Buenas Practicas Para Pedirle Trabajo A Codex

- Dar objetivo, contexto, usuario afectado y criterio de exito.
- Indicar si es bug, feature, ajuste liviano, revision o mejora del kit.
- Aclarar restricciones: no login bloqueante, base de datos, permisos, diseño, fecha o alcance.
- Si el proyecto usa DB real, aclarar si Postgres y `DATABASE_URL` ya estan disponibles.
- Pegar errores completos cuando existan.
- No pedir "hace todo" si el alcance es incierto; pedir refinamiento.
- No pedir que ignore tests o permisos.
- No borrar manualmente archivos del kit sin pedir a Codex cierre y limpieza.

## Señales De Mal Uso

- Implementar sin haber resuelto faltantes bloqueantes.
- Crear PRD/backlog completo para un cambio de texto.
- Cerrar una feature sin verificar.
- No actualizar MCP coverage en capacidades operativas.
- Usar persistencia manual cuando Postgres + Prisma ORM ya estaba definido.
- No usar el navegador nativo de Codex en flujos UI que lo requerian.
- Dejar features completadas acumuladas en `docs/backlog/features/`.
- Guardar archivos con encoding corrupto.
- Pedir subagentes para tareas simples.
- Usar agentes en paralelo sobre los mismos archivos sin contratos claros.

## Prompt Maestro Recomendado

```txt
Trabaja usando el kit dev IA.

Lee AGENTS.md, ROUTING, MANIFEST y las politicas necesarias segun el tipo de pedido.
Clasifica la tarea, refina si falta informacion, revisa contexto de codigo antes de editar, implementa solo lo necesario, verifica proporcionalmente y cierra limpiando backlog/changes/manifest si corresponde.

Recorda:
- UTF-8 obligatorio;
- MCP-first en Python/FastAPI;
- cobertura MCP explicita;
- agentes IA separados que consumen MCP;
- LangGraph/LangChain solo cuando correspondan por complejidad del agente;
- UI minimalista operativa si no hay branding del cliente;
- menu lateral desplegable con modulos principales en toda app;
- auth propia server-side segun `AUTH_POLICY.md` si el sistema es multi-tenant o maneja roles/permisos;
- pantalla `Registrarse` y signup backend si el sistema contempla registro/autoregistro de usuarios;
- paginacion server-side y limites para listas potencialmente grandes;
- CodeGraph como indice local opcional en repos grandes, sin reemplazar lectura real de codigo;
- Postgres + Prisma ORM por defecto si hay DB real;
- Next.js 16 por defecto para proyectos nuevos;
- navegador nativo de Codex para pruebas UI cuando aplique;
- testing proporcional;
- no burocracia innecesaria para cambios livianos.

Pedido:
[describir pedido]
```
