# Seguridad

Estado: pendiente

## Autenticación

Referencia: aplicar `docs/ai/AUTH_POLICY.md` cuando haya login, sesiones, roles, permisos, tenant, sucursales, acceso interno o recuperacion de contrasena.

Si el sistema contempla registro/autoregistro de usuarios, debe existir pantalla `Registrarse` y flujo backend de signup. Si no permite autoregistro, documentar `signup no-aplica` y como se crean usuarios.

- Proveedor:
- Estrategia dev/test:
- Usuario seed o bypass local:
- Bloquea implementación: sí / no

## Sesion

- Tipo: JWT firmado / sesion server-side / proveedor externo:
- Cookie `HttpOnly`: si / no
- Expiracion:
- Claims incluidos:
- Rutas publicas:
- Rutas privadas por defecto: si / no

## Tenant Y Unidad Operativa

- Tenant obligatorio: si / no
- Campo tenant:
- Unidad operativa activa:
- Unidades asignadas:
- Reglas de cambio de unidad:

## Acceso Interno

- Header secreto:
- Tenant requerido:
- Usuario tecnico requerido:
- Rutas permitidas:

## Recuperacion De Contrasena

- Aplica: si / no
- Token hasheado:
- Expiracion:
- Respuesta neutra:
- Rate limiting:

## Auditoria Auth

- Login exitoso/fallido:
- Recuperacion solicitada/completada:
- Cambio de unidad:
- Acceso interno aceptado/rechazado:

## Roles

| Rol | Descripción | Alcance De Datos | Puede Administrar Usuarios |
|---|---|---|---|
|  |  |  | sí / no |

## Matriz De Permisos

| Recurso | Acción | Admin | Colaborador/Operador | Sólo Lectura | Regla De Alcance |
|---|---|---|---|---|---|
|  | crear / leer / actualizar / eliminar / exportar | permitido / denegado | permitido / denegado | permitido / denegado |  |

## Datos Sensibles

| Dato | Sensibilidad | Quién Puede Verlo | Quién Puede Modificarlo | Exponer A MCP/IA |
|---|---|---|---|---|
|  | baja / media / alta |  |  | sí / no / con restricción |

## Validaciones Críticas

- Server-side:
- Client-side:
- DB constraints:
- Casos negativos obligatorios:

## Integraciones Externas

| Integración | Secreto/Variable | Riesgo | Ambiente Permitido | Fallback |
|---|---|---|---|---|
|  |  |  | dev / staging / prod |  |

## Riesgos

| Riesgo | Severidad | Mitigación | Estado |
|---|---|---|---|
|  | baja / media / alta / crítica |  | pendiente / mitigado |

## Criterio Mínimo

Si el PRD define roles, permisos, tenant, sucursales o datos sensibles, este documento no puede quedar vacío antes de implementar auth, DB real, MCP o features nivel 4.
