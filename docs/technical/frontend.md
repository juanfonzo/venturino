# Frontend

Estado: pendiente

## Stack

Next.js 16 + Tailwind, siguiendo patrones existentes del repo.

Para repos existentes, respetar la version instalada salvo pedido explicito de migracion. Para proyectos nuevos, usar Next.js 16 como version objetivo.

## Pantallas


## Componentes

## Shell Y Navegacion

- Menu lateral desplegable/colapsable:
- Modulos principales:
- Estado activo:
- Comportamiento desktop:
- Comportamiento mobile:
- Permisos/visibilidad por rol:


## Estados UX

- Loading:
- Vacío:
- Error:
- Éxito:

## Formularios

- Login:
- Registro/autoregistro:
  - Pantalla `Registrarse` requerida si el producto permite alta de usuarios.
  - Estados: loading, error, exito/redireccion.
  - Link hacia login.
  - Si no aplica, registrar `signup no-aplica` en `docs/technical/seguridad.md`.

## Accesibilidad


## Responsive

## UI Operativa Compacta

- Header interno:
- Navegacion/menu lateral:
- Filtros:
- Tabla/listado:
- Paginacion/carga incremental:
- Formulario:
- Acciones frecuentes:
- Acciones secundarias:
- Mobile:

Checklist:

- Evita hero grande en pantallas CRUD:
- Muestra suficiente informacion sin scroll innecesario en desktop:
- Agrupa acciones secundarias si hay mas de dos por fila:
- No carga listas potencialmente grandes completas en memoria:
- Usa paginacion server-side segun `docs/ai/PAGINATION_POLICY.md`:
- Convierte tablas complejas a cards compactas en mobile:
- Mantiene estados loading/vacio/error/exito:
