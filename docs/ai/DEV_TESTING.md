# Dev Testing

## Proposito

Definir como preparar el sistema para que Codex y los agentes puedan verificar funcionalidades durante desarrollo sin usar datos productivos ni debilitar seguridad.

## Principios

- No postergar autenticacion/autorizacion hasta el final si el sistema la necesita.
- Hacer que auth sea testeable desde el inicio.
- Usar datos y usuarios de prueba.
- Nunca probar contra base productiva.
- Documentar cualquier bypass de desarrollo y bloquearlo en produccion.

## Auth En Desarrollo

Ver tambien `docs/ai/AUTH_POLICY.md` para la politica completa de sesion, tenant, permisos, acceso interno y recuperacion de contrasena.

Opciones aceptables:

1. Usuario seed de desarrollo.
2. Login real con credenciales de prueba.
3. Bypass controlado solo en entorno local/dev.

El bypass solo es aceptable si:

- depende de una variable explicita como `DEV_AUTH_BYPASS=true`
- falla en produccion aunque la variable este mal configurada
- queda documentado en `.env.example`
- no se usa para validar permisos reales

## Usuarios Seed

Definir usuarios de prueba por rol cuando aplique:

| Rol | Email | Uso |
|---|---|---|
| Admin | admin@test.local | pruebas de gestion |
| Operador | operador@test.local | pruebas operativas |
| Solo lectura | lectura@test.local | pruebas de permisos |

No usar contraseñas reales ni datos de clientes reales.

## Base De Datos De Desarrollo

Si el proyecto va a usar DB real, el camino por defecto es Postgres + Prisma desde el inicio, tanto local como desarrollo.

Reglas:

- usar Postgres local o una instancia Postgres de desarrollo;
- usar Prisma para schema, migraciones y cliente;
- mantener seeds minimos;
- documentar como resetear datos de prueba;
- no compartir credenciales productivas;
- separar dev/staging/prod por variables de entorno.

No usar archivos JSON/manuales como persistencia principal si ya existe `DATABASE_URL` y el alcance requiere comportamiento real de DB.

## Variables De Entorno

`.env.example` debe documentar:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/APP_DB
DIRECT_URL=
NEXTAUTH_SECRET=
APP_URL=
INTERNAL_API_TOKEN=
DEV_AUTH_BYPASS=false
SEED_TEST_USERS=false
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

No guardar secretos reales en el repo.

Regla operativa:

- `.env.local` contiene valores reales de desarrollo.
- `.env.example` solo documenta nombres requeridos.
- Codex debe buscar primero en `.env.local` y usar `.env.example` como checklist, no como fuente de valores.
- `DIRECT_URL` es opcional; usarlo solo si el despliegue o proveedor Postgres lo requiere.

Ver tambien `docs/ai/ENVIRONMENT_POLICY.md` para decidir si una variable faltante bloquea o si puede usarse fallback local.

## Browser Testing

Para pruebas con navegador:

- iniciar app local;
- usar usuario seed o bypass local permitido;
- cargar datos de prueba minimos;
- usar el navegador nativo de Codex como primera opcion;
- completar el flujo como usuario;
- registrar resultado y brechas.

Si el cambio afecta UI o flujo visible, no reemplazar la navegacion real por solo inspeccion de codigo salvo que exista bloqueo de entorno explicito.

## Criterio De Cierre

Una feature que requiere login no esta lista si no puede probarse con usuario seed, login dev o bypass local seguro.
