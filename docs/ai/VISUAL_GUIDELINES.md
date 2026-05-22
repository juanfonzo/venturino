# Visual Guidelines

## Proposito

Usar esta guia como referencia visual base para proyectos personalizados de Algorym cuando el cliente no tenga identidad visual propia.

La prioridad es construir aplicaciones simples, claras, simetricas y operativas. La UI debe permitir trabajar rapido, ver datos, filtrar, editar y ejecutar acciones sin sobrecarga visual.

Si el cliente trae branding o sistema UI propio, esa identidad tiene prioridad.

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
- Acento unico para accion primaria o estado activo.

## Principios

- Menos explicacion, mas accion.
- Una pantalla debe comunicar su proposito con titulo breve y controles claros.
- Evitar bloques comerciales, heroes, slogans y descripciones largas.
- Evitar multiples cards cuando una tabla, panel o seccion lineal resuelve mejor.
- Optimizar espacio vertical y horizontal.
- Mantener simetria: margenes, alturas, columnas y alineaciones consistentes.
- Priorizar legibilidad y velocidad de escaneo sobre impacto visual.

## Tokens CSS

```css
:root {
  --color-bg: #f6f7f9;
  --color-surface: #ffffff;
  --color-surface-muted: #f3f5f8;
  --color-border: #dfe3ea;
  --color-border-soft: #edf0f4;
  --color-text: #111827;
  --color-text-muted: #667085;
  --color-text-soft: #98a2b3;
  --color-accent: #3b0ca3;
  --color-accent-hover: #2f087f;
  --color-success: #008060;
  --color-success-bg: #d8f8e8;
  --color-warning: #c2410c;
  --color-danger: #dc2626;
  --color-danger-bg: #fff1f2;

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

  --shadow-panel: 0 1px 2px rgba(16, 24, 40, 0.06);
}
```

## Layout Base

### Shell

- Toda app debe tener un menu lateral desplegable como navegacion principal.
- El menu lateral debe contener los modulos principales de la app.
- En desktop, el menu puede estar expandido por defecto y permitir colapsar.
- En mobile, el menu debe abrirse como drawer o equivalente.
- Contenido principal con padding de `24px` a `40px` segun ancho.
- Fondo general suave y superficie principal blanca.
- Evitar contenedores gigantes con mucho aire si la pantalla es operativa.

### Header Interno

- Titulo corto.
- Sin subtitulo salvo que aclare una regla critica.
- Acciones principales alineadas a la derecha cuando aplique.
- No usar hero ni bloque introductorio grande en pantallas CRUD.

### Navegacion

- Menu lateral para modulos principales.
- Cada modulo debe tener label claro, icono simple opcional y estado activo visible.
- El menu debe soportar secciones o grupos cuando haya muchos modulos.
- El menu debe ser desplegable/colapsable sin romper el layout.
- Item activo con fondo suave y borde/acento discreto.
- Iconos simples y consistentes.
- Evitar pills repetidas en cada pantalla si ya existe sidebar.

## Componentes

### Panel

- Usar paneles blancos con borde fino para agrupar una funcion principal.
- Radio 8px a 10px.
- Sombra minima o ninguna.
- Padding 16px a 20px.
- No usar multiples paneles si una seccion lineal es suficiente.

### Tabla

- Patron principal para gestion de datos.
- Filas compactas, altura aproximada 48px a 56px.
- Bordes horizontales sutiles.
- Cabecera simple con texto gris o peso medio.
- Acciones alineadas a la derecha.
- Usar botones chicos para acciones de fila.
- Si hay mas de dos acciones, agrupar en menu o bloque compacto.

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

### Botones

- Primario: fondo `--color-accent`, texto blanco, radio 6px a 8px.
- Secundario: fondo gris claro o blanco, borde fino.
- Destructivo: texto/borde rojo, fondo muy suave.
- Evitar botones grandes si la accion es de fila.
- El texto debe ser directo: `Agregar`, `Editar`, `Eliminar`, `Guardar`.

### Estados

- Loading: skeleton o texto breve.
- Vacio: mensaje corto y accion recomendada.
- Error: mensaje concreto y recuperacion posible.
- Exito: feedback discreto; no bloquear el flujo.
- Estado activo/inactivo: badge compacto.

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
- Mostrar mas datos utiles y menos decoracion.
- Usar una sola accion primaria por pantalla o seccion.
- Alinear acciones con el dato que modifican.
- Mantener tablas, filtros y formularios visualmente livianos.
- Usar espaciado consistente y moderado.

## Don't

- No usar heroes grandes en pantallas internas.
- No reemplazar el menu lateral principal por pills sueltas salvo pantallas muy puntuales.
- No llenar pantallas con cards si una tabla o panel simple alcanza.
- No agregar textos explicativos repetidos.
- No usar sombras fuertes, gradientes o decoracion innecesaria.
- No hacer que acciones de fila agranden demasiado la tabla.
- No mezclar muchos colores de acento.
- No usar tipografias decorativas.

## Checklist De Cierre Visual

Antes de cerrar una UI interna, verificar:

- titulo breve y claro;
- menu lateral desplegable presente con modulos principales;
- sin texto explicativo innecesario;
- contenido principal visible sin scroll excesivo;
- tabla/listado escaneable;
- acciones frecuentes visibles y cercanas al dato;
- cards usadas solo si agrupan informacion real;
- responsive mobile resuelto;
- estados loading, vacio, error y exito cubiertos.
