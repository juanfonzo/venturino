# Auth Policy

## Objetivo

Definir la politica de autenticacion y autorizacion recomendada para sistemas personalizados de Algorym.

Esta politica toma como referencia el patron real usado en GeSuite, pero debe adaptarse al dominio, riesgo y alcance de cada proyecto.

## Alcance

Cubre:

- autenticacion de usuarios;
- registro/autoregistro de usuarios cuando el producto lo contemple;
- sesiones web;
- autorizacion por rol, permiso, tenant y unidad operativa;
- acceso interno maquina a maquina;
- recuperacion de contrasena;
- auditoria de eventos de auth;
- estrategia dev/test para que Codex pueda verificar flujos.

## Decision Base

Para sistemas de gestion multi-tenant, el default recomendado es auth propia server-side:

- JWT firmado por backend;
- cookie `session` `HttpOnly`;
- middleware central para rutas privadas;
- tenant explicito en sesion;
- permisos y roles validados en backend;
- acceso interno separado por header secreto;
- usuarios seed o login dev para pruebas.

No usar Auth.js, Clerk, Supabase Auth u otro proveedor por defecto sin decision explicita. Pueden usarse si el proyecto lo justifica y queda documentado en `docs/technical/seguridad.md`.

## Principios Obligatorios

- Toda sesion debe estar atada a una identidad autenticada y a un tenant explicito.
- Ningun acceso a datos de negocio debe confiar solo en el frontend.
- La autorizacion se resuelve en backend con tenant, rol, permisos y alcance.
- La sesion expone solo claims minimos.
- Los secretos nunca viajan al cliente.
- Los accesos internos usan credenciales distintas a la sesion de usuario.
- Las rutas privadas son privadas por defecto; las publicas deben declararse.
- Auth debe ser testeable en desarrollo sin debilitar produccion.

## Modelo De Identidad

El modelo minimo recomendado:

- `id` estable;
- `email`;
- `passwordHash` opcional;
- identificador federado opcional, por ejemplo `googleSub`;
- `tenantKey`, `empresaId` o equivalente;
- `role`;
- permisos granulares;
- `activeBranchId`, `sucursalId` o unidad operativa activa cuando aplique;
- unidades/sucursales/ambitos asignados.

Reglas:

- `email` identifica login, no autoriza operaciones.
- Una cuenta federada puede no tener contrasena.
- Si una cuenta es solo federada, no habilitar reset de contrasena salvo decision explicita.
- Si un email puede existir en varios tenants, no usar unicidad global sin analizar el caso.

## Metodos Permitidos

## Registro De Usuarios

Si el sistema contempla registro o autoregistro de usuarios, debe existir una pantalla visible de `Registrarse` y un flujo backend completo para crear la cuenta.

La pantalla de registro debe incluir:

- campos minimos definidos por el dominio, por ejemplo nombre, email y contrasena;
- validacion client-side complementaria y validacion server-side como fuente de verdad;
- mensajes de error claros para email invalido, contrasena invalida, email ya usado y fallo interno;
- estado loading mientras se envia;
- estado exitoso o redireccion segura despues de crear la cuenta;
- link visible hacia login si el usuario ya tiene cuenta;
- copy breve y en espanol cuando el producto sea en espanol.

El backend de registro debe:

- normalizar email;
- hashear contrasena antes de persistir;
- validar tenant, invitacion, plan o contexto de alta si el sistema es multi-tenant;
- impedir duplicados segun la regla de unicidad del proyecto;
- emitir sesion segura o pedir verificacion/login posterior, segun decision del producto;
- registrar auditoria de signup exitoso/fallido sin guardar secretos.

Si el sistema no permite autoregistro y los usuarios se crean solo desde administracion interna, documentar explicitamente `signup no-aplica` en `docs/technical/seguridad.md` y no crear pantalla publica de registro.

### Email Y Contrasena

- Guardar solo `passwordHash`.
- Usar hash adaptativo fuerte; referencia: `bcrypt`/`bcryptjs`.
- Piso tecnico minimo: 6 caracteres; recomendado elevarlo segun criticidad.
- Responder error generico ante credenciales invalidas.
- Agregar rate limiting en login.

### Login Federado

- Usar OAuth/OIDC con validacion de `state`, `nonce`, `issuer` y `audience`.
- Usar PKCE cuando aplique.
- Vincular identidad por `sub`, no solo por email.
- Si existe usuario con mismo email sin vinculo federado, exigir vinculacion explicita.

### Acceso Interno Maquina A Maquina

- Separarlo completamente del login de usuario.
- Usar header secreto dedicado.
- Limitarlo a rutas internas, jobs o integraciones especificas.
- Si opera sobre datos de negocio, exigir tenant e identidad tecnica.

Headers de referencia:

```txt
x-internal-token
x-internal-tenant
x-internal-userid
```

## Politica De Sesion

La sesion recomendada:

- JWT firmado;
- emitido solo por backend;
- almacenado en cookie `session` `HttpOnly`;
- `sameSite: "lax"`;
- `secure: true` en produccion;
- `path: "/"`;
- expiracion explicita; referencia: 7 dias.

Claims minimos:

- `sub`;
- `email`;
- `name`;
- `tenant` o `empresa`;
- `role`;
- permisos granulares necesarios;
- unidad activa si aplica;
- unidades asignadas si aplica;
- `exp`.

No incluir:

- secretos;
- tokens completos;
- contrasenas;
- objetos completos de usuario;
- datos sensibles de negocio.

Reemitir sesion cuando cambien claims criticos:

- login exitoso;
- signup exitoso;
- login federado exitoso;
- cambio de unidad/sucursal activa;
- cambio de permisos o rol cuando aplique.

## Rutas Publicas Y Privadas

Debe existir una lista explicita de rutas publicas.

Publicas tipicas:

- login;
- signup/registro si el sistema contempla autoregistro;
- forgot password;
- reset password;
- callbacks OAuth;
- webhooks autorizados;
- archivos estaticos.

Reglas:

- Toda ruta no publica se considera privada.
- Middleware valida excepciones publicas y luego auth.
- UI privada redirige a login si no hay sesion.
- API privada responde `401` o `403`.
- Si UI y API comparten middleware, documentar el comportamiento.

## Autorizacion

La autenticacion no habilita operacion por si sola.

Capas requeridas:

1. Sesion valida.
2. Tenant valido.
3. Rol valido.
4. Permiso especifico cuando corresponda.
5. Restriccion de unidad/sucursal/ambito cuando corresponda.

Patron recomendado:

- rol `ADMIN` con alcance amplio;
- rol operativo como `EMPLEADO`, `OPERADOR` o equivalente;
- permisos booleanos/granulares por dominio;
- restricciones por sucursal/unidad cuando el negocio lo requiera.

Endpoints sensibles pueden refrescar permisos desde DB aunque la sesion los tenga cacheados.

## Aislamiento Por Tenant

Regla no negociable: toda operacion autenticada debe estar scoped por tenant.

- Incluir tenant en la sesion.
- Filtrar queries por tenant en backend.
- Validar pertenencia del usuario al tenant del recurso.
- No confiar en tenant enviado por frontend.
- En accesos internos, validar token, tenant e identidad tecnica.

## Unidad Operativa

Si el negocio usa sucursales, depositos, equipos o unidades:

- persistir unidad activa;
- persistir unidades asignadas;
- impedir seleccionar unidades no asignadas;
- al cambiar unidad activa, actualizar DB y reemitir sesion.

## Recuperacion De Contrasena

- Respuesta neutra aunque el email no exista.
- Token aleatorio de un solo uso.
- Guardar solo hash del token.
- Expiracion corta; referencia: 1 hora.
- Invalidar tokens previos o usados.
- No resetear cuentas solo federadas salvo decision explicita.
- Construir links desde `APP_URL` confiable.
- Agregar rate limiting.

## Auditoria

Eventos minimos:

- login exitoso;
- login fallido;
- signup exitoso;
- signup fallido;
- recuperacion solicitada;
- recuperacion completada;
- cambio de unidad activa;
- errores internos de auth;
- acceso interno aceptado/rechazado si aplica.

No registrar:

- contrasenas;
- tokens completos;
- secretos;
- PII innecesaria.

## Secretos Y Entorno

Variables esperadas segun alcance:

```env
NEXTAUTH_SECRET=
APP_URL=
DEV_AUTH_BYPASS=false
SEED_TEST_USERS=false
INTERNAL_API_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=
```

Reglas:

- `.env.local` contiene valores reales de desarrollo.
- `.env.example` documenta nombres esperados sin secretos.
- Separar secretos de usuario, internos, webhooks e integraciones.
- Nunca serializar secretos al cliente.

## Desarrollo Y Testing

Auth debe poder probarse desde el inicio.

Opciones aceptadas:

- usuario seed por rol;
- login real con credenciales de prueba;
- bypass local seguro solo en dev.

Bypass local solo si:

- depende de variable explicita;
- falla en produccion aunque la variable este mal configurada;
- queda en `.env.example`;
- no se usa para validar permisos reales.

## Orden Recomendado De Implementacion

1. Definir `Usuario`, `Tenant` y `UnidadOperativa` si aplica.
2. Si hay autoregistro, implementar pantalla `Registrarse` y endpoint/server action de signup.
3. Implementar emision/verificacion de sesion en backend.
4. Proteger rutas con middleware central.
5. Implementar helpers de autorizacion por rol, permiso, tenant y unidad.
6. Implementar forgot/reset con token hasheado si corresponde.
7. Agregar proveedor federado si el producto lo requiere.
8. Agregar auditoria.
9. Agregar acceso interno con credenciales separadas.

## Checklist De Aceptacion

Un modulo de auth esta listo cuando:

- autentica usuarios con identidad verificable;
- emite sesion segura en cookie `HttpOnly`;
- protege rutas privadas por defecto;
- aplica tenant y permisos en servidor;
- resuelve unidad operativa activa cuando aplica;
- soporta recuperacion segura si corresponde;
- distingue accesos internos de accesos de usuario;
- registra eventos relevantes de auth;
- si hay autoregistro, tiene pantalla `Registrarse`, backend de signup y casos de error verificados;
- si no hay autoregistro, documenta `signup no-aplica` y como se crean usuarios;
- tiene usuarios seed, login dev o bypass seguro para pruebas;
- tiene casos negativos de permisos y tenant.
