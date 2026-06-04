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
- Antes de crear una pantalla nueva o rediseño visible, definir una direccion visual operativa breve y ejecutarla con consistencia.
- Toda app debe implementar un menu lateral desplegable/colapsable con los modulos principales.
- En pantallas internas, priorizar UI operativa compacta: headers breves, tablas/listas escaneables, formularios cercanos al listado y acciones frecuentes cerca del dato.
- Listas potencialmente grandes deben consumir paginacion server-side; no cargar todo para filtrar o paginar en memoria.
- Las tablas/listas con paginacion deben mostrar loading, vacio, error, controles de pagina/carga incremental y filtros utiles.
- Evitar layouts tipo landing o heroes grandes en CRUDs, tableros de trabajo y pantallas de gestion diaria.
- Evitar textos explicativos largos; usar labels, placeholders y estados concretos.
- Preferir menu lateral, toolbar, tabla/listado y panel simple antes que muchas cards.
- Usar color funcional para diferenciar intenciones: primaria, constructiva, informativa, warning y destructiva, sin romper limpieza visual.
- Formularios no deben quedar como inputs basicos apilados: usar secciones, grilla simple, labels, focus visible, validacion cercana y footer de acciones.
- Usar headers de seccion con icono/titulo/descripcion breve para formularios largos, importaciones y paneles operativos.
- Usar cards de estado compactas solo para KPIs o estado de modulos; no convertir toda la UI en cards.
- Usar empty states breves con borde punteado suave cuando una seccion grande no tiene datos o depende de un prerequisito.
- Optimizar espacio en desktop sin sacrificar responsive mobile.
- Formularios con validación visible.
- Si el sistema contempla registro/autoregistro de usuarios, debe existir pantalla `Registrarse` con validaciones, estados loading/error/exito y enlace a login.
- Estados obligatorios: loading, vacío, error y éxito.
- Responsive desde mobile hasta desktop.
- Alto contraste y texto UTF-8 seguro en español.
- Si no hay identidad visual del cliente, usar la guia minimalista operativa de `docs/ai/VISUAL_GUIDELINES.md`.
- Evitar UI generica: botones iguales sin jerarquia, formularios crudos, cards decorativas y layouts sin intencion.
- Usar microinteracciones sobrias para hover/focus/disabled/loading/sidebar, respetando `prefers-reduced-motion` cuando aplique.
- Componentes y clases Tailwind deben quedar navegables, sin mezclar lógica de negocio compleja en UI.
