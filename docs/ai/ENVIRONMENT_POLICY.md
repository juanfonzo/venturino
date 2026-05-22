# Politica De Entorno Y Fallbacks

## Objetivo

Definir cuando una variable, credencial, servicio externo o permiso de ejecucion debe bloquear el avance y cuando se puede usar un fallback local controlado.

## Principio

No inventar credenciales, URLs, tokens ni decisiones de infraestructura. Si faltan, registrar el faltante y pedir autorizacion o usar un fallback explicito solo cuando no distorsione la feature.

## Regla De Base De Datos

Si el proyecto va a usar base de datos real para el desarrollo, el camino por defecto es:

- Postgres local o de desarrollo como base de datos.
- Prisma como ORM/gestor de schema y migraciones.

Si existe `DATABASE_URL` disponible para Postgres o el proyecto ya confirmo DB real, no usar persistencia manual en JSON, memoria u otros archivos locales para features que dependan de datos reales, relaciones, constraints, historiales o saldos.

El fallback local solo es aceptable cuando:

- el usuario lo autorizo explicitamente;
- la feature es demo UI o logica aislada;
- no se esta validando comportamiento real de DB;
- queda documentado como `completada-en-demo`.

## Clasificacion

### Bloqueante

Frena implementacion o cierre cuando falta algo necesario para validar comportamiento real:

- `DATABASE_URL` si la feature depende de migraciones, queries reales, constraints o integridad transaccional.
- decision de Postgres/Prisma si el proyecto trabajara con DB real desde el inicio.
- credenciales de auth si la feature valida permisos reales.
- API keys si la feature depende de una integracion externa real.
- permisos para ejecutar tests/build/browser y no hay validacion alternativa suficiente.
- acceso a datos de prueba cuando el flujo no puede simularse sin ellos.

### No Bloqueante Con Fallback

Puede avanzar si el objetivo es demo, prototipo o slice de UI/logica, y el fallback queda documentado:

- persistencia local JSON o memoria para probar UI y contrato basico, solo si Postgres/Prisma no fue definido o no esta disponible y el usuario lo autorizo.
- bypass local de auth solo para navegacion, no para validar permisos.
- mocks de integracion cuando el contrato externo esta documentado.
- datos seed ficticios sin datos reales de cliente.

## Regla De Autorizacion

Antes de usar fallback para algo que en produccion sera real, dejar asentado:

- que variable/servicio falta;
- que fallback se usara;
- que no queda validado;
- que debera reemplazarse antes de produccion;
- si el usuario autorizo avanzar con ese supuesto.

## Variables Minimas

`.env.example` debe documentar variables sin secretos reales:

```env
DATABASE_URL=
DIRECT_URL=
DATA_STORE=database
DEV_AUTH_BYPASS=false
SEED_TEST_USERS=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Orden de referencia:

- `.env.local`: valores reales de desarrollo.
- `.env.example`: contrato de variables esperadas, sin secretos.

Codex no debe asumir que `.env.example` contiene valores utilizables. Debe usarlo para saber que falta y buscar el valor real en `.env.local` o pedirlo al usuario.

## Postgres Y Prisma

Si el proyecto usa DB real:

- usar Postgres local o de desarrollo desde el inicio;
- usar Prisma desde el inicio para schema, migraciones y cliente;
- mantener seeds minimos;
- documentar como resetear datos de prueba;
- no compartir credenciales productivas;
- separar dev/staging/prod por variables de entorno.

No crear archivos manuales como fuente principal de persistencia si la feature ya debe apoyarse en Prisma + Postgres.

## CLIs Y `.env.local`

Next.js carga `.env.local` durante ejecucion de la app, pero algunas CLIs pueden no hacerlo igual. Si una CLI como Prisma necesita `DATABASE_URL`, cargar la variable desde `.env.local` sin imprimir su valor y registrar el procedimiento, no el secreto.

## Criterio De Cierre

Una feature puede cerrarse como:

- `completada`: validada con entorno real o equivalente aceptado.
- `completada-en-demo`: validada con fallback local, no apta para produccion.
- `bloqueada-por-entorno`: implementable, pero falta variable, credencial, permiso o servicio.

No marcar como `completada` una feature que dependa de DB/auth/integracion real si solo se valido con fallback.
