# Code Review Policy

## Objetivo

Agregar una revisión estructurada de cierre para cambios no triviales sin volver burocrático el flujo diario.

Esta política toma la idea útil de `autoreview`: antes de cerrar o enviar cambios importantes, revisar el diff como si fuera una revisión de código independiente. No requiere instalar un helper externo.

## Cuándo Aplica

Aplicar revisión estructurada cuando:

- hubo cambios de código nivel 2, 3 o 4 según `TESTING_POLICY.md`;
- se tocó auth, permisos, DB, migraciones, datos sensibles, MCP, agentes IA o integraciones externas;
- se implementó una feature mediana/grande;
- el usuario pide "review", "autoreview", "segunda revisión" o similar;
- hubo fixes posteriores a una revisión o bug.

No aplicar por defecto a:

- cambios documentales;
- copy/color/spacing nivel 0/1 sin lógica;
- prototipos descartables;
- microcambios cubiertos por una verificación simple.

## Regla Base

La revisión es asesoría, no autoridad automática.

- No aplicar hallazgos a ciegas.
- Verificar cada hallazgo leyendo el código real, dependencias y contexto cercano.
- Rechazar edge cases especulativos, refactors amplios y fixes que compliquen el sistema sin reducir riesgo real.
- Preferir fixes pequeños en el límite correcto de ownership.
- Si una corrección cambia código, rerun de tests enfocados y nueva revisión proporcional del área afectada.
- No correr revisiones redundantes sólo para obtener un mensaje "limpio" más elegante.

## Qué Revisar

- Comportamiento contra criterios de aceptación.
- Seguridad y permisos server-side.
- Datos: validación, persistencia, migraciones, seeds, tenancy.
- Frontend: estados loading/empty/error/success, accesibilidad, responsive.
- Listados: paginación, búsqueda tokenizada, filtros/sort.
- MCP/IA-first: coverage map, tools, campos sensibles.
- Código AI-readable: nombres de dominio, límites, contratos y tests.
- Alcance: que no haya cambios fuera del slice.

## Target De Revisión

Elegir el target real:

- Cambios locales: revisar diff local.
- Branch/PR: revisar contra la base real del PR o rama principal.
- Commit puntual: revisar ese commit.

No empujar cambios sólo para poder revisar.

## Si Existe Un Helper De Autoreview

Si el repo trae un helper propio de autoreview y el entorno lo permite:

- usarlo como apoyo;
- tratar su salida como hallazgos candidatos;
- verificar hallazgos antes de modificar;
- registrar comando usado y resultado.

Si no existe helper, hacer revisión estructurada manual con esta política.

## Reporte De Cierre

Incluir sólo lo necesario:

- revisión aplicada: manual / helper / no aplica;
- tests o pruebas ejecutadas;
- hallazgos aceptados y corregidos;
- hallazgos rechazados y motivo breve;
- riesgos residuales.

