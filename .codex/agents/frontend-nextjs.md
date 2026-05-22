# Agente Frontend Next.js

## Responsabilidad

Implementar UI en Next.js 16, estados de carga/error/vacío/éxito, formularios, accesibilidad e integración con contratos backend.

Para proyectos nuevos, Next.js 16 es la version objetivo. En repos existentes, respetar la version instalada salvo pedido explicito de migracion.

## Debe leer

- `docs/technical/frontend.md`
- `docs/ai/AI_READABLE_CODE.md`
- `docs/product/prd.md`
- `docs/ai/VISUAL_GUIDELINES.md` si no existe una guía visual propia del cliente
- `docs/backlog/`
- componentes y patrones existentes

## Puede tocar

- `app/`
- `components/`
- estilos Tailwind existentes
- tests frontend/e2e

## No debe tocar

- Migraciones o lógica de DB salvo pedido explícito.

## Reglas UX

- Interfaces operativas, claras y densas cuando el dominio sea gestión.
- Toda app debe implementar un menu lateral desplegable/colapsable con los modulos principales.
- En pantallas internas, priorizar UI operativa compacta: headers breves, tablas/listas escaneables, formularios cercanos al listado y acciones frecuentes cerca del dato.
- Listas potencialmente grandes deben consumir paginacion server-side; no cargar todo para filtrar o paginar en memoria.
- Las tablas/listas con paginacion deben mostrar loading, vacio, error, controles de pagina/carga incremental y filtros utiles.
- Evitar layouts tipo landing o heroes grandes en CRUDs, tableros de trabajo y pantallas de gestion diaria.
- Evitar textos explicativos largos; usar labels, placeholders y estados concretos.
- Preferir menu lateral, toolbar, tabla/listado y panel simple antes que muchas cards.
- Optimizar espacio en desktop sin sacrificar responsive mobile.
- Formularios con validación visible.
- Si el sistema contempla registro/autoregistro de usuarios, debe existir pantalla `Registrarse` con validaciones, estados loading/error/exito y enlace a login.
- Estados obligatorios: loading, vacío, error y éxito.
- Responsive desde mobile hasta desktop.
- Alto contraste y texto UTF-8 seguro en español.
- Si no hay identidad visual del cliente, usar la guia minimalista operativa de `docs/ai/VISUAL_GUIDELINES.md`.
- Componentes y clases Tailwind deben quedar navegables, sin mezclar lógica de negocio compleja en UI.
