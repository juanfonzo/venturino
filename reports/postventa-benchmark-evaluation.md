# Evaluación Benchmark Postventa

Generado: 2026-06-11T18:39:58.252Z
Análisis base: 2026-06-11T18:38:28.646Z

## KPIs

- Productos Venturino evaluados: 127
- Productos con comparable: 81 (63.8%)
- Productos sin comparable: 46 (36.2%)
- Baja confianza: 2 (1.6%)
- Brechas accionables Venturino más caro: 28
- Brechas accionables Venturino más barato: 13
- Casos ambiguos por muchos candidatos: 31
- Casos con evidencia fina: 19

## Gates de Calidad

| Gate | Estado | Evidencia |
|---|---|---|
| coverage_min_45 | OK | Cobertura comparable 63.8% >= 45% |
| no_comparable_max_55 | OK | Sin comparable 36.2% <= 55% |
| low_confidence_max_5 | OK | Baja confianza 1.6% <= 5% |
| similar_status_present | OK | El estado similar a ML está presente |
| actionable_gaps_present | OK | Brechas accionables detectadas: 41 |

## Estados

| Estado | Cantidad |
|---|---:|
| Venturino más barato que ML | 13 |
| similar a ML | 38 |
| sin comparable | 46 |
| Venturino más caro que ML | 28 |
| baja confianza | 2 |

## Cobertura por Tipo

| Tipo | Total | Comparable | Sin comparable | Similar | Más caro | Más barato | Baja confianza | Accionables |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| JUGUETE | 30 | 29 | 1 | 21 | 6 | 2 | 0 | 8 |
| HERRAMIENTA | 10 | 7 | 3 | 0 | 6 | 1 | 0 | 7 |
| ISG | 7 | 0 | 7 | 0 | 0 | 0 | 0 | 0 |
| JARRO | 6 | 6 | 0 | 1 | 3 | 2 | 0 | 5 |
| BOTELLA | 5 | 5 | 0 | 3 | 0 | 2 | 0 | 2 |
| SIN_TIPO | 5 | 0 | 5 | 0 | 0 | 0 | 0 | 0 |
| KIT_HERRAMIENTAS | 4 | 4 | 0 | 1 | 3 | 0 | 0 | 3 |
| MOCHILA | 4 | 3 | 1 | 2 | 1 | 0 | 0 | 1 |
| MOTOR | 4 | 4 | 0 | 3 | 0 | 1 | 0 | 1 |
| GORRA | 3 | 3 | 0 | 0 | 3 | 0 | 0 | 3 |
| ACEITE | 3 | 2 | 1 | 0 | 0 | 2 | 0 | 2 |
| MATERA | 3 | 1 | 2 | 0 | 1 | 0 | 0 | 1 |
| CUCHILLA | 3 | 2 | 1 | 1 | 0 | 0 | 1 | 0 |
| CINCEL | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| MANOMETRO | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| MATE | 2 | 2 | 0 | 0 | 1 | 1 | 0 | 2 |
| MOTOBOMBA | 2 | 2 | 0 | 0 | 2 | 0 | 0 | 2 |
| BATERIA | 2 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |
| CAJA_HERRAMIENTAS | 2 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |
| CORTADORA | 2 | 2 | 0 | 1 | 0 | 1 | 0 | 1 |
| GENERADOR | 2 | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| MOTOGUADANA | 2 | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| CORREA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| BANDEJA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| INYECCION | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| LATA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| TERMO | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| ADITIVO | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 1 |
| SOPLADOR | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| REFRIGERANTE | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| BOINA | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| BOLSO | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| CUCHILLO | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| FILTRO | 1 | 1 | 0 | 0 | 0 | 0 | 1 | 0 |
| NAVAJA | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| PINZA | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| PUNZON | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |

## Muestras para Iteración

### Más caro accionable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Batería John Deere StrongBox™ 12 V 110 Ah. John Deere | BATERIA | Venturino más caro que ML | $560.000 | $289.323 | 93.6% | alta | 2 | Bateria Moura M100hi 12x110 Tractor New Holland Jhon Deere |
| Juego de tubos SAE ¼” John Deere Set de 21 piezas | KIT_HERRAMIENTAS | Venturino más caro que ML | $149.000 | $98.862 | 50.7% | media | 3 | Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin |
| Caja de herramientas John Deere de acero | CAJA_HERRAMIENTAS | Venturino más caro que ML | $140.000 | $87.226 | 60.5% | media | 1 | Caja De Herramientas De Lujo John Deere De 18 Piezas,... |
| Camión volquete Big Scoop John Deere | JUGUETE | Venturino más caro que ML | $148.000 | $133.902 | 10.5% | alta | 20 | Camión Volquete De Juguete John Deere Big Scoop Para Arena, |
| Camioneta y tractor John Deere | JUGUETE | Venturino más caro que ML | $300.000 | $271.678 | 10.4% | media | 20 | Antiguo Tractor A Escala John Deere |
| Cosechadora con orugas S780 John Deere | JUGUETE | Venturino más caro que ML | $1.100.000 | $855.223 | 28.6% | media | 18 | Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg |
| Gorra Davis Beige John Deere Bordada. | GORRA | Venturino más caro que ML | $35.000 | $23.000 | 52.2% | media | 20 | Gorra De Béisbol John Deere |
| Gorro John Deere Santa Fe Mesh Bordado | GORRA | Venturino más caro que ML | $37.000 | $29.361 | 26.0% | media | 20 | Gorros Adulto Jhon Deere Bordado Ajustable |
| Gorro Tiger Verde John Deere | GORRA | Venturino más caro que ML | $42.000 | $32.499 | 29.2% | media | 19 | Gorra Gabardina John Deere Con Rotura |
| Jarro Bayo John Deere | JARRO | Venturino más caro que ML | $31.000 | $22.267 | 39.2% | media | 2 | Taza Nueva Equipo Agrícola John Deere |
| Jarro Road Blanco/Negro John Deere | JARRO | Venturino más caro que ML | $39.000 | $24.823 | 57.1% | media | 1 | Taza Nueva Equipo Agrícola John Deere |
| Jarro Zeit negro John Deere | JARRO | Venturino más caro que ML | $29.000 | $22.267 | 30.2% | media | 2 | Taza Nueva Equipo Agrícola John Deere |
| Juego de herramientas SAE y Métricos de ¼” John Deere | KIT_HERRAMIENTAS | Venturino más caro que ML | $282.000 | $217.085 | 29.9% | media | 2 | Juego De Tubos Sae Set De 20 Piezas John Deere |
| Juego de tubos flexibles Métricos | KIT_HERRAMIENTAS | Venturino más caro que ML | $119.000 | $88.709 | 34.1% | media | 8 | Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin |
| Llaves ajustables John Deere 10 pulgadas | HERRAMIENTA | Venturino más caro que ML | $71.000 | $60.330 | 17.7% | media | 5 | Llave Original De Equipo John Deere, Pack De 2, Gy20680 |

### Más barato accionable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Aceite de Motor Premium John Deere Plus-50™ II. John Deere | ACEITE | Venturino más barato que ML | $238.000 | $298.469 | -20.3% | media | 1 | Aceite Plus 50 John Deere |
| Aditivo Mejorador de Combustible John Deere | ADITIVO | Venturino más barato que ML | $172.000 | $199.941 | -14.0% | media | 1 | Acondicionador/mejorador De Combustible John Deere 4 Litros |
| Aceite Hidráulico Hy‑Gard 20 Lts. John Deere | ACEITE | Venturino más barato que ML | $189.000 | $259.871 | -27.3% | media | 1 | Aceite Hidráulico Ajm69444 Hy-gard 20lt |
| Botella Atuel Blanca John Deere | BOTELLA | Venturino más barato que ML | $56.000 | $63.327 | -11.6% | media | 2 | Botella De Whisky John Deere Tractor Semi Truckbottle |
| Botella Hydro 750ML John Deere | BOTELLA | Venturino más barato que ML | $45.000 | $56.262 | -20.0% | media | 1 | Botella De Whisky John Deere Tractor Semi Truckbottle |
| Cortadora de Césped Honda HRX476VYEH – 4.8 HP | CORTADORA | Venturino más barato que ML | $3.281.116 | $3.880.726 | -15.5% | alta | 3 | Cortadora De Cesped Honda Hrx476c2 Autopropulsada |
| Jarro Daten térmico John Deere | JARRO | Venturino más barato que ML | $62.000 | $76.826 | -19.3% | media | 6 | Taza Nueva Equipo Agrícola John Deere |
| Jarro Titan gris claro John Deere | JARRO | Venturino más barato que ML | $61.000 | $76.826 | -20.6% | media | 6 | Taza Nueva Equipo Agrícola John Deere |
| Mate Origen con bombilla negro John Deere | MATE | Venturino más barato que ML | $60.000 | $69.455 | -13.6% | media | 5 | Mate Termico John Deere De Acero Inoxidable Con Bombilla |
| Motor Honda GX390QX – 13 HP | MOTOR | Venturino más barato que ML | $1.128.754 | $1.371.609 | -17.7% | alta | 4 | Motor Honda 13hp Eje 1 Gx390qx |
| Palanca Barra John Deere 8 pulgadas | HERRAMIENTA | Venturino más barato que ML | $30.000 | $37.000 | -18.9% | media | 5 | Palancas Apertura Ventana Cabina John Deere Sg2 |
| Set de Farmin Friends John Deere | JUGUETE | Venturino más barato que ML | $58.000 | $64.834 | -10.5% | media | 20 | Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr |
| Set de tractor y camión volquete John Deere | JUGUETE | Venturino más barato que ML | $60.000 | $67.490 | -11.1% | alta | 20 | Set De Vehículos John Deere Camión Volquete Y Tractor 18m+ |

### Sin comparable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Aceite de Motor John Deere Torq-Gard™ II. John Deere | ACEITE | sin comparable | $175.000 | - | - | descartar | 0 | - |
| Seccion de corte, cuchilla de draper John Deere | CUCHILLA | sin comparable | $9.300 | - | - | descartar | 0 | - |
| Correa Draper Lateral. John Deere | CORREA | sin comparable | $7.178.672 | - | - | descartar | 0 | - |
| Anticongelante Cool‑Gard. John Deere 10LTS | REFRIGERANTE | sin comparable | $97.000 | - | - | descartar | 0 | - |
| Bandeja magnetica John Deere rectangular. | BANDEJA | sin comparable | $32.000 | - | - | descartar | 0 | - |
| Batería John Deere StrongBox™ 12 V 150 Ah. John Deere | BATERIA | sin comparable | $759.000 | - | - | descartar | 0 | - |
| Boina bordada John Deere | BOINA | sin comparable | $35.000 | - | - | descartar | 0 | - |
| Bolso Duomo Bag John Deere | BOLSO | sin comparable | $110.000 | - | - | descartar | 0 | - |
| Caja de herramientas John Deere verde con bandeja amarilla | CAJA_HERRAMIENTAS | sin comparable | $183.000 | - | - | descartar | 0 | - |
| Cargador de tierra John Deere | JUGUETE | sin comparable | $3.568.000 | - | - | descartar | 0 | - |
| Cincel plano John Deere de corte en frío 10mm | CINCEL | sin comparable | $17.000 | - | - | descartar | 0 | - |
| Cincel plano John Deere de corte en frío 16mm | CINCEL | sin comparable | $29.000 | - | - | descartar | 0 | - |
| Cincel plano John Deere de corte en frío 22mm | CINCEL | sin comparable | $15.000 | - | - | descartar | 0 | - |
| Correa Lateral Side Draper Belting John Deere | CORREA | sin comparable | $4.264.000 | - | - | descartar | 0 | - |
| Cuchillo de mano John Dere | CUCHILLO | sin comparable | $34.000 | - | - | descartar | 0 | - |
| Herramienta de recogida magnética John Deere | HERRAMIENTA | sin comparable | $20.000 | - | - | descartar | 0 | - |
| Inyector Electrónico de Combustible. John Deere | INYECCION | sin comparable | $4.446.600 | - | - | descartar | 0 | - |
| Juego de ganchos John Deere 4 piezas | HERRAMIENTA | sin comparable | $97.000 | - | - | descartar | 0 | - |
| Kit de Pistones y Camisas. John Deere | SIN_TIPO | sin comparable | $2.334.000 | - | - | descartar | 0 | - |
| Kit de servicio de boquillas de inyección de combustible John Deere | INYECCION | sin comparable | $1.870.654 | - | - | descartar | 0 | - |

### Baja confianza

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Filtro de Combustible. John Deere | FILTRO | baja confianza | $267.000 | $208.286 | 28.2% | baja | 20 | Filtro De Combustible John Deere Re541922 |
| Puntón Cuchilla. John Deere | CUCHILLA | baja confianza | $86.000 | $96.789 | -11.1% | baja | 20 | Cuchillas Para Tractor John Deere 42 |

## Recomendaciones

- Usar el reporte como benchmark comercial cuando el estado sea similar, más caro o más barato; separar explícitamente baja confianza y sin comparable.
- Priorizar revisión de productos más caros con brecha >= 10% y confianza media/alta; son las oportunidades comerciales más accionables.
- No usar productos sin comparable como señal de precio; usarlos como backlog de mejora del diccionario o como evidencia de falta de mercado comparable.
- Tipos con baja cobertura para iterar diccionario: ISG, SIN_TIPO, CINCEL, MANOMETRO, CORREA, BANDEJA, INYECCION, LATA.
- Tipos con mejor señal actual: JUGUETE, HERRAMIENTA, JARRO, BOTELLA, KIT_HERRAMIENTAS, MOCHILA, MOTOR, GORRA.
