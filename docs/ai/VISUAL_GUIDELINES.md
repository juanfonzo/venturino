# Visual Guidelines

## Proposito

Usar esta guia como referencia visual base para proyectos personalizados de Algorym cuando el cliente no tenga identidad visual propia.

La prioridad es construir aplicaciones simples, claras, simetricas y operativas. La UI debe permitir trabajar rapido, ver datos, filtrar, editar y ejecutar acciones sin sobrecarga visual.

Si el cliente trae branding o sistema UI propio, esa identidad tiene prioridad.

Actualizacion de criterio: la UI debe seguir siendo limpia, pero no fria. Usar color, profundidad y microinteracciones de forma funcional para mejorar orientacion, confianza y accionabilidad.

## Direccion Visual Base

Referencia: minimal operational admin.

- Tema claro.
- Menu lateral desplegable como navegacion principal.
- Area de contenido amplia y limpia.
- Tipografia clara, sin decoracion innecesaria.
- Tablas, formularios y listas como patrones principales.
- Cards solo cuando agrupen contenido necesario.
- Poco texto explicativo; usar labels, placeholders y estados concretos.
- Bordes finos, radios moderados y sombras casi imperceptibles.
- Acento primario para accion principal y estado activo.
- Para apps internas sin branding, preferir acento teal/verde profundo antes que violetas saturados; se percibe mas operativo, calido y sobrio.
- Colores semanticos suaves para acciones por intencion: positivo, alerta, peligro e informacion.
- Formularios con estructura visual cuidada, no inputs basicos apilados sin jerarquia.

## Intencionalidad Visual

Antes de implementar una pantalla nueva o rediseño visible, definir una direccion visual operativa en una frase. Ejemplos:

- `operativa calida y compacta`;
- `industrial limpia`;
- `financiera sobria`;
- `inventario denso y escaneable`;
- `servicio profesional con acento institucional`.

La direccion debe guiar tipografia, espaciado, color, toolbar, tablas, formularios y estados. No debe convertir pantallas internas en landing pages.

Reglas:

- Evitar UI generica: formularios crudos, cards sin proposito, botones blancos iguales y layouts sin jerarquia.
- Cada decision visual debe mejorar orientacion, lectura, velocidad de accion o confianza.
- Usar un gesto visual funcional por pantalla si aporta valor: sidebar claro, toolbar bien resuelta, header de seccion, estado vacio util, badge semantico o accion primaria evidente.
- Mantener identidad sobria: no perseguir impacto visual si perjudica densidad operativa.
- Si el cliente trae branding, adaptar la direccion visual a esa identidad sin copiar estilos ajenos de forma literal.

## Principios

- Menos explicacion, mas accion.
- Una pantalla debe comunicar su proposito con titulo breve y controles claros.
- Evitar bloques comerciales, heroes, slogans y descripciones largas.
- Evitar multiples cards cuando una tabla, panel o seccion lineal resuelve mejor.
- Optimizar espacio vertical y horizontal.
- Mantener simetria: margenes, alturas, columnas y alineaciones consistentes.
- Priorizar legibilidad y velocidad de escaneo sobre impacto visual.
- Sumar calidez con fondos apenas tintados, estados suaves y botones con intencion, no con decoracion.

## Tokens CSS

```css
:root {
  --color-bg: #f6f7f9;
  --color-bg-warm: #f8f5ef;
  --color-surface: #ffffff;
  --color-surface-muted: #f3f5f8;
  --color-surface-warm: #fffaf2;
  --color-border: #dfe3ea;
  --color-border-soft: #edf0f4;
  --color-text: #111827;
  --color-text-muted: #667085;
  --color-text-soft: #98a2b3;
  --color-sidebar: #eee7da;
  --color-topbar: #f5efe4;
  --color-accent: #0f766e;
  --color-accent-hover: #115e59;
  --color-accent-soft: #e6f5f2;
  --color-accent-border: #b7ddd6;
  --color-info: #2563eb;
  --color-info-bg: #eff6ff;
  --color-success: #008060;
  --color-success-bg: #d8f8e8;
  --color-warning: #c2410c;
  --color-warning-bg: #fff4e6;
  --color-danger: #dc2626;
  --color-danger-bg: #fff1f2;
  --color-focus: #7c3aed;

  --font-ui: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-md: 16px;
  --text-lg: 20px;
  --text-title: 24px;

  --leading-tight: 1.2;
  --leading-normal: 1.45;

  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 14px;

  --shadow-panel: 0 1px 2px rgba(16, 24, 40, 0.06);
  --shadow-raised: 0 8px 24px rgba(17, 24, 39, 0.06);

  --transition-fast: 140ms ease;
  --transition-base: 180ms ease;
}
```

## Layout Base

### Shell

- Toda app debe tener un menu lateral desplegable como navegacion principal.
- El menu lateral debe contener los modulos principales de la app.
- Sidebar puede usar fondo calido suave (`--color-sidebar`) y separador fino para diferenciar navegacion de contenido.
- Topbar compacta opcional con usuario, email, rol y accion de salida; no debe ocupar altura excesiva.
- En desktop, el menu puede estar expandido por defecto y permitir colapsar.
- En mobile, el menu debe abrirse como drawer o equivalente.
- Contenido principal con padding de `24px` a `40px` segun ancho.
- Fondo general suave; se permite un tinte calido muy sutil (`--color-bg-warm`) si mejora percepcion sin reducir contraste.
- Superficies principales blancas; usar superficies calidas solo para bloques de ayuda, resumen o contexto.
- Evitar contenedores gigantes con mucho aire si la pantalla es operativa.

### Header Interno

- Titulo corto.
- Sin subtitulo salvo que aclare una regla critica.
- Acciones principales alineadas a la derecha cuando aplique.
- Breadcrumb o link de retorno breve cuando la vista nace desde otro modulo.
- No usar hero ni bloque introductorio grande en pantallas CRUD.

### Navegacion

- Menu lateral para modulos principales.
- Cada modulo debe tener label claro, icono simple opcional y estado activo visible.
- El menu debe soportar secciones o grupos cuando haya muchos modulos.
- El menu debe ser desplegable/colapsable sin romper el layout.
- Item activo con fondo suave y borde/acento discreto.
- Item activo puede usar superficie blanca o `--color-accent-soft`, texto/acento primario y una barra lateral de 3px si ayuda a orientacion.
- Iconos simples y consistentes.
- Logo/brand mark: un bloque cuadrado pequeño con acento primario es aceptable si ayuda a identidad sin ocupar espacio.
- Evitar pills repetidas en cada pantalla si ya existe sidebar.

## Componentes

### Panel

- Usar paneles blancos con borde fino para agrupar una funcion principal.
- Radio 8px a 10px.
- Sombra minima o ninguna.
- Padding 16px a 20px.
- No usar multiples paneles si una seccion lineal es suficiente.
- Para panel principal, permitir sombra suave `--shadow-panel`; reservar `--shadow-raised` para modales/drawers o paneles superpuestos.

### Card De Estado

- Usar cards compactas para KPIs, estado de modulo o disponibilidad.
- Mantener titulo chico, valor corto e icono discreto a la derecha.
- No convertir cada dato en card; usar solo para resumen ejecutivo o estado de modulo.
- Grilla recomendada: 2 a 4 cards en desktop, 1 columna en mobile.

### Header De Seccion

- Para formularios largos, importaciones o paneles con varias partes, usar header de seccion con fondo sutil.
- Puede incluir icono pequeño en caja, titulo y descripcion corta.
- Debe separar grupos reales de campos, no decorar cada input.

### Tabla

- Patron principal para gestion de datos.
- Filas compactas, altura aproximada 48px a 56px.
- Bordes horizontales sutiles.
- Cabecera simple con texto gris o peso medio.
- Acciones alineadas a la derecha.
- Usar botones chicos para acciones de fila.
- Si hay mas de dos acciones, agrupar en menu o bloque compacto.
- En tablas con muchas filas, evitar que todos los botones compitan visualmente: accion primaria de fila puede ser outline; accion constructiva frecuente puede usar color suave o icono.
- Usar badges semanticos con fondo suave y texto fuerte para estados.

### Toolbar

- Busqueda a la izquierda.
- Conteo y accion primaria a la derecha.
- Filtros en la misma linea si son pocos.
- Evitar explicaciones largas arriba de la tabla.

### Formulario

- Labels breves.
- Inputs de altura 40px a 44px.
- Ayuda contextual solo cuando evite errores reales.
- Validacion cerca del campo.
- Formularios cortos pueden estar en panel lateral o modal.
- Formularios largos deben agruparse por secciones, no por cards decorativas.
- Cada formulario debe tener una estructura visual minima: header de seccion, campos alineados, separacion entre grupos y footer de acciones.
- Inputs deben tener borde claro, fondo blanco o levemente tintado, focus ring visible y placeholder discreto.
- Agrupar campos relacionados en grillas simples de 2 columnas en desktop y 1 columna en mobile.
- Usar descripciones cortas bajo labels solo para reglas que eviten errores.
- Evitar formularios que parezcan HTML basico sin contenedor, sin jerarquia o sin estados.
- Cuando el formulario depende de un dato previo, usar bloque de prerequisito o empty state antes de campos deshabilitados.

### Empty State

- Usar mensaje breve centrado dentro de superficie sutil.
- Para areas grandes sin contenido, se permite borde punteado suave.
- Incluir accion recomendada cuando exista un siguiente paso claro.
- No usar ilustraciones grandes por defecto.

### Importacion De Archivos

- Usar panel con header de seccion, boton de seleccionar archivo y estado del archivo seleccionado.
- Accion de importacion debe ser primaria/constructiva y estar separada del selector.
- Si hay plantilla descargable, ubicar `Descargar modelo` como accion secundaria superior derecha.
- Mostrar validacion por fila o resumen de errores cuando aplique.

### Botones

- Primario: fondo `--color-accent`, texto blanco, radio 6px a 8px.
- Secundario: fondo gris claro o blanco, borde fino.
- Constructivo (`Agregar`, `Crear`, `Guardar`, `Confirmar`): usar primario solido si es la accion principal; si es accion repetida por fila, usar outline con acento o fondo `--color-accent-soft`.
- Informativo (`Ver`, `Detalle`): boton ghost/outline neutral.
- Recomendacion/IA (`Recomendar`, `Sugerir`, `Optimizar`): puede usar acento primario o info, nunca rojo/naranja salvo alerta.
- Destructivo: texto/borde rojo, fondo muy suave.
- Advertencia (`Revisar`, `Resolver alerta`): usar warning suave.
- Evitar botones grandes si la accion es de fila.
- El texto debe ser directo: `Agregar`, `Editar`, `Eliminar`, `Guardar`.
- No dejar todas las acciones como botones blancos iguales si tienen intenciones distintas.

### Jerarquia De Acciones

- Una accion primaria por pantalla o panel principal.
- Acciones de busqueda/filtro pueden ser primarias si disparan el flujo principal.
- Acciones constructivas importantes deben tener color o relleno; acciones neutrales deben ser outline/ghost.
- Acciones destructivas nunca comparten color con la primaria.
- En filas de tabla, priorizar: `Ver` neutral, `Agregar` constructiva suave, `Eliminar/Quitar` danger suave.

### Estados

- Loading: skeleton o texto breve.
- Vacio: mensaje corto y accion recomendada.
- Error: mensaje concreto y recuperacion posible.
- Exito: feedback discreto; no bloquear el flujo.
- Estado activo/inactivo: badge compacto.
- Estados de match, recomendacion, ahorro o alerta deben usar colores semanticos suaves y consistentes.

### Patrones De Calidez

- Usar superficies calidas muy sutiles para resumen, recomendacion o ayuda contextual.
- Usar iconos pequeños y consistentes cuando mejoran reconocimiento, no como decoracion.
- Usar focus/hover visibles: cambio suave de fondo, borde o sombra; evitar animaciones llamativas.
- Mantener contraste alto; la calidez no debe volver la UI pastel o de baja lectura.

### Microinteracciones

- Usar transiciones breves para hover, focus, disabled, apertura de sidebar/drawer y aparicion de mensajes.
- Preferir cambios de fondo, borde, opacidad o transform muy sutil.
- Loading debe comunicar progreso sin bloquear lectura innecesariamente: skeleton, spinner pequeño o texto breve.
- No usar animaciones llamativas, delays largos, efectos parallax, cursores personalizados o movimiento decorativo en apps operativas.
- Respetar `prefers-reduced-motion` cuando haya movimiento no esencial.

## Copy UI

- No usar textos explicativos largos por defecto.
- Evitar parrafos introductorios en cada modulo.
- Usar microcopy solo si reduce errores operativos.
- Preferir sustantivos y acciones claras.
- Mantener labels cortos: `Cliente`, `Modelo`, `Estado`, `Precio`, `Accion`.

## Responsive

- Desktop: priorizar tablas y toolbar compacta.
- Tablet: mantener tabla si las columnas esenciales entran.
- Mobile: transformar filas complejas en cards compactas.
- El menu lateral debe colapsar a drawer o equivalente en mobile.
- Mantener targets tactiles minimos de 40px a 44px.

## Do

- Usar layouts simetricos, simples y predecibles.
- Usar menu lateral desplegable para los modulos principales.
- Definir una direccion visual operativa antes de construir pantallas nuevas.
- Mostrar mas datos utiles y menos decoracion.
- Usar una sola accion primaria por pantalla o seccion.
- Alinear acciones con el dato que modifican.
- Mantener tablas, filtros y formularios visualmente livianos.
- Diseñar formularios con jerarquia minima: secciones, grillas, estados, focus y footer de acciones.
- Usar color funcional para diferenciar acciones constructivas, informativas, alertas y destructivas.
- Usar espaciado consistente y moderado.

## Don't

- No usar heroes grandes en pantallas internas.
- No confundir intencionalidad visual con maximalismo, decoracion o UI de portfolio.
- No reemplazar el menu lateral principal por pills sueltas salvo pantallas muy puntuales.
- No llenar pantallas con cards si una tabla o panel simple alcanza.
- No agregar textos explicativos repetidos.
- No usar sombras fuertes, gradientes o decoracion innecesaria.
- No hacer que acciones de fila agranden demasiado la tabla.
- No mezclar muchos colores de acento.
- No usar tipografias decorativas.
- No dejar formularios como inputs sueltos sin estructura visual.
- No usar color solo por estetica; cada color debe comunicar accion, estado o jerarquia.

## Checklist De Cierre Visual

Antes de cerrar una UI interna, verificar:

- titulo breve y claro;
- direccion visual operativa reconocible y sobria;
- menu lateral desplegable presente con modulos principales;
- sin texto explicativo innecesario;
- contenido principal visible sin scroll excesivo;
- tabla/listado escaneable;
- acciones frecuentes visibles y cercanas al dato;
- botones con jerarquia por intencion, no todos visualmente iguales;
- formularios con labels, focus, validacion, agrupacion y footer de acciones;
- cards usadas solo si agrupan informacion real;
- responsive mobile resuelto;
- microinteracciones funcionales y no decorativas;
- estados loading, vacio, error y exito cubiertos.
