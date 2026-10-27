# Scenarios

## Propósito

Definir escenarios de usuario para validar que el sistema satisface flujos reales, no sólo que el código compila.

Los escenarios son pruebas de comportamiento. Sirven para browser testing, QA manual, futuras pruebas E2E y validación por agentes.

## Reglas

- Escribir escenarios desde el punto de vista del usuario o rol.
- Mantenerlos fuera del código de implementación.
- No crear escenarios para microcambios triviales.
- Usarlos especialmente en niveles 3 y 4 de `TESTING_POLICY.md`.
- Incluir al menos un caso negativo para formularios, permisos o flujos críticos.
- Registrar evidencia mínima cuando se ejecuten.

## Formato

```md
## Escenario: Nombre

Nivel sugerido: 3 / 4
Rol:
Objetivo:
Datos necesarios:
Entorno:
Viewport: desktop / mobile 375px / tablet 768px / desktop 1280px
Precondiciones:

### Pasos
1.
2.
3.

### Resultado esperado

### Validaciones
- [ ]

### Evidencia Esperada
- Usuario/rol usado:
- URL/pantalla:
- Datos creados:
- Resultado observado:
- Captura o nota visual:
- Brechas:

### Riesgos cubiertos
- 
```

## Escenarios Base

### Escenario: Login de desarrollo

Nivel sugerido: 3
Rol: Admin
Objetivo: Confirmar que el sistema puede probarse con credenciales o bypass de desarrollo.
Datos necesarios: usuario seed o bypass local.
Entorno: local/dev.
Viewport: desktop 1280px.
Precondiciones: `.env` configurado según `DEV_TESTING.md` y `ENVIRONMENT_POLICY.md`.

Pasos:

1. Abrir la app local.
2. Ingresar como usuario de prueba o activar bypass permitido.
3. Confirmar acceso al área principal.

Resultado esperado:

El usuario accede sin usar credenciales reales ni datos productivos.

Validaciones:

- [ ] No se usaron datos productivos.
- [ ] El bypass no valida permisos reales.

### Escenario: Registro de usuario

Nivel sugerido: 3 / 4
Rol: Usuario nuevo
Objetivo: Validar signup cuando el sistema contempla registro/autoregistro de usuarios.
Datos necesarios: email no usado, contrasena valida y datos minimos del dominio.
Entorno: local/dev con Postgres/Prisma si hay DB real.
Viewport: desktop 1280px y mobile 375px.
Precondiciones: `signup` habilitado para el proyecto. Si no aplica, documentar `signup no-aplica` en seguridad.

Pasos:

1. Abrir pantalla `Registrarse`.
2. Intentar enviar campos vacios o invalidos.
3. Confirmar errores visibles.
4. Completar datos validos.
5. Enviar registro.
6. Confirmar resultado: sesion iniciada, redireccion segura o indicacion de verificar/login posterior.
7. Intentar registrar nuevamente el mismo email.

Resultado esperado:

El usuario puede registrarse con datos validos, no puede duplicar cuenta y los errores no exponen informacion sensible.

Validaciones:

- [ ] Pantalla `Registrarse` existe y es accesible desde login.
- [ ] Validaciones client-side y server-side coherentes.
- [ ] Contrasena se hashea antes de persistir.
- [ ] Email duplicado devuelve error controlado.
- [ ] Flujo post-registro definido y verificado.
- [ ] Eventos de signup auditados sin secretos.

### Escenario: Crear entidad principal

Nivel sugerido: 3
Rol: Operador
Objetivo: Validar el primer flujo operativo completo del sistema.
Datos necesarios: entidad principal definida por el proyecto.
Entorno: local/dev.
Viewport: desktop 1280px y mobile 375px si afecta UI.
Precondiciones: persistencia dev configurada o fallback autorizado.

Pasos:

1. Abrir listado.
2. Intentar crear sin campos obligatorios.
3. Confirmar error.
4. Crear nuevo registro válido.
5. Guardar.
6. Confirmar que aparece en listado o detalle.

Resultado esperado:

El registro se guarda, se muestra correctamente, respeta validaciones y conserva UTF-8.

Validaciones:

- [ ] Error negativo visible.
- [ ] Registro creado visible.
- [ ] Estado vacío deja de mostrarse si corresponde.
- [ ] Responsive sin overflow.

### Escenario: Permisos por rol

Nivel sugerido: 4
Rol: Admin y usuario restringido.
Objetivo: Confirmar que un usuario no accede a datos fuera de su alcance.
Datos necesarios: usuario admin, usuario restringido, entidad permitida y entidad no permitida.
Entorno: local/dev con auth testeable.
Viewport: desktop 1280px.
Precondiciones: usuario seed/login dev; no usar bypass para validar permisos.

Pasos:

1. Ingresar como admin y crear/asignar datos de prueba.
2. Ingresar como usuario restringido.
3. Verificar que sólo ve datos permitidos.
4. Intentar acceder por URL directa a dato no permitido.

Resultado esperado:

El usuario restringido no ve ni accede a datos fuera de alcance. La API responde `FORBIDDEN` o equivalente.

Validaciones:

- [ ] UI filtra datos.
- [ ] API bloquea acceso directo.
- [ ] Error no expone datos sensibles.

### Escenario: API Padawanway de referencias de mercado

Nivel sugerido: 4
Rol: Backend de Padawanway.
Objetivo: Validar referencias directas, búsqueda ampliada, seguridad y auditoría sin exponer datos internos.
Datos necesarios: secreto técnico de prueba y cinco tractores usados del inventario Venturino.
Entorno: local/dev con PostgreSQL actualizado.
Precondiciones: migración aplicada y variables `PADAWANWAY_API_*` de prueba configuradas.

Pasos:

1. Firmar y enviar una consulta directa válida.
2. Confirmar publicaciones externas, estadísticas USD y ausencia de HP, horas y metadatos de scraping.
3. Repetir el mismo request-id y confirmar `409 DUPLICATE_REQUEST`.
4. Enviar firma inválida y confirmar `401 UNAUTHORIZED`.
5. Ejecutar una búsqueda ampliada paginada para un caso sin referencias directas.
6. Confirmar que la consulta aceptada quedó auditada sin secretos.

Resultado esperado:

La API devuelve únicamente referencias de mercado permitidas, no fuerza comparables inexistentes y rechaza replay o autenticación inválida.

Validaciones:

- [ ] Firma válida responde 200 y firma inválida responde 401.
- [ ] Request-id repetido responde 409.
- [ ] Publicaciones Venturino quedan excluidas.
- [ ] Paginación respeta máximo 50.
- [ ] No aparecen HP, horas, scraping, fechas de extracción ni estado de cobertura.
- [ ] Auditoría persiste resultado o error posterior a autenticación sin guardar secretos.
