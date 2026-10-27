# Coordinación De Subagentes

## Objetivo

Usar subagentes sólo cuando aporten paralelismo real, reduzcan riesgo o separen ownership de forma clara. No usarlos por defecto en tareas simples.

## Principio Rector

Paralelizar análisis, secuenciar implementación.

Para proyectos de Algorym, la calidad, coherencia y mantenibilidad pesan más que maximizar velocidad con muchos agentes escribiendo código a la vez. El paralelismo debe usarse primero para pensar, auditar y descubrir riesgos; la escritura de código debe avanzar por contratos y dependencias claras.

La implementación paralela es excepción, no default.

## Cuándo Usar Subagentes

Usar subagentes cuando se cumpla al menos una condición:

- la tarea requiere 3 o más frentes técnicos o de producto independientes;
- hay análisis paralelo útil sin bloquear el camino crítico;
- hay riesgo transversal en datos, permisos, arquitectura, UX, QA o MCP;
- se inicia un proyecto, hito o feature grande;
- se necesita auditar un resultado desde varias especialidades.

No usar subagentes cuando:

- el cambio es nivel 0/1 según `TESTING_POLICY.md`;
- el cambio es de copy, color, spacing o documentación menor;
- el coordinador puede resolverlo leyendo pocos archivos;
- la delegación agregaría más costo que claridad.

## Ownership

Antes de delegar, el coordinador debe asignar ownership explícito:

- perfil o especialidad;
- archivos o áreas que puede tocar o auditar;
- límites de lo que no debe resolver;
- salida esperada;
- dependencias con otros agentes.

Evitar solapamientos. Si dos agentes miran una misma zona, separar el foco. Ejemplo: `qa-seguridad` define reglas de permisos; `frontend-nextjs` valida si la UI permite probarlas.

## Ejecución Por Fases

Usar paralelismo por fases, no "todos a la vez".

### Fase A: Análisis Paralelo

Conviene correr en paralelo cuando la salida es diagnóstico o diseño:

- base de datos define entidades, constraints y migraciones;
- backend define contratos, servicios y permisos;
- frontend define pantallas, estados y flujos;
- QA define escenarios, riesgos y nivel de verificación;
- MCP/IA define herramientas, skills del sistema destino y campos seguros.

El objetivo no es implementar, sino producir insumos comparables para que el coordinador cierre decisiones.

### Fase B: Integración Del Coordinador

Antes de implementar, el coordinador debe:

- resolver contradicciones entre reportes;
- congelar contratos mínimos;
- confirmar dependencias;
- decidir bloqueantes;
- definir qué puede correr en paralelo y qué debe ser secuencial.

### Fase C: Implementación

Implementar de forma secuencial o semi-paralela según dependencias:

- DB/contratos primero cuando cambian entidades, permisos o migraciones;
- backend después de contratos estables;
- frontend después de endpoints o mocks explícitos;
- QA puede preparar escenarios en paralelo, pero no cerrar hasta que exista código verificable;
- MCP/skills del sistema destino se actualizan cuando el contrato operativo ya está claro.

### Implementación Paralela Permitida

Sólo permitir implementación paralela cuando el coordinador confirme todo lo siguiente:

- contratos congelados o mocks explícitos aprobados;
- archivos y carpetas sin solapamiento;
- dependencias entre agentes resueltas o documentadas;
- estrategia de integración definida;
- verificación posterior única para comprobar comportamiento integrado;
- rollback o forma clara de aislar cambios si una rama falla.

Si cualquiera de estos puntos no está claro, implementar secuencialmente.

## Matriz De Dependencias

Para tareas multiagente, el coordinador debe mantener una matriz simple:

| Agente | Fase | Puede Correr En Paralelo | Depende De | Salida Esperada | Estado |
|---|---|---|---|---|---|
| base-datos | A/C | sí en análisis, no si migra lo mismo | decisiones de entidad | modelo, constraints, migración | pendiente/en-proceso/bloqueado/listo |
| backend | A/C | sí en análisis; implementación depende de DB/contratos | contratos y permisos | endpoints, servicios, errores | pendiente/en-proceso/bloqueado/listo |
| frontend | A/C | sí con mocks explícitos | contrato API o mock aprobado | pantalla, estados UX, integración | pendiente/en-proceso/bloqueado/listo |
| qa-seguridad | A/C | sí preparando escenarios | criterios de aceptación | casos positivos/negativos, evidencia | pendiente/en-proceso/bloqueado/listo |
| mcp-python | A/C | sí en análisis; implementación depende de permisos | contratos operativos | tools/skills del sistema destino | pendiente/en-proceso/bloqueado/listo |

Estados válidos:

- `pendiente`: no iniciado;
- `en-proceso`: trabajando sin bloqueo;
- `bloqueado-por-dependencia`: espera salida concreta de otro agente;
- `bloqueado-por-entorno`: falta credencial, permiso, servicio o variable;
- `listo`: entregó salida verificable.

## Regla De Espera Y Retoma

Un subagente debe frenar y devolver estado cuando necesita una salida concreta de otro agente. Debe indicar:

- qué espera;
- de quién depende;
- qué puede avanzar mientras espera;
- qué evidencia retomará cuando la dependencia esté lista.

No debe inventar contratos, campos, permisos o endpoints para desbloquearse solo.

## Formato De Handoff

Cada subagente debe devolver su reporte con esta estructura:

```md
# Reporte: <area>

## Veredicto

Listo / Listo con riesgos / Bloqueado / No aplicar.

## Severidad

- Bloqueante:
- Alto valor:
- Opcional:
- No aplicar ahora:

## Hallazgos

| Severidad | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|

## Archivos O Áreas Relevantes

- `ruta/al/archivo`

## Contratos O Criterios A Verificar

- endpoint, pantalla, flujo, test, query, permiso o documento que probaría el hallazgo.

## Decisiones Requeridas

- decisión puntual o `ninguna`.

## Dependencias

- Espera de otro agente: `sí/no`.
- Depende de: `agente/archivo/salida`.
- Puede avanzar mientras espera: `sí/no` y alcance.

## Próximo Paso Recomendado

Una acción concreta, no una lista abierta.
```

## Integración Del Coordinador

El coordinador no debe copiar reportes completos. Debe sintetizar:

- conflictos entre agentes;
- bloqueantes reales;
- decisiones aceptadas;
- tareas que entran al backlog;
- tareas descartadas o pospuestas;
- evidencias necesarias para cerrar.

Si hay conflicto entre agentes, decidir con este orden:

1. seguridad, datos y permisos;
2. integridad de negocio;
3. estabilidad técnica;
4. UX y velocidad de entrega;
5. preferencias visuales o internas.

## Criterio De Cierre

Una coordinación multiagente está cerrada cuando:

- cada subagente entregó reporte o se justificó por qué no hizo falta;
- los hallazgos tienen severidad;
- los bloqueantes fueron resueltos o registrados;
- las acciones aceptadas fueron implementadas, backloggeadas o descartadas;
- `MANIFEST.md`, `DECISIONS.md` o `backlog-interno` se actualizaron si corresponde.
