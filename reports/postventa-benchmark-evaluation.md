# Evaluación Benchmark Postventa

Generado: 2026-06-10T15:57:08.739Z
Análisis base: 2026-06-10T15:55:59.737Z

## KPIs

- Productos Venturino evaluados: 127
- Productos con comparable: 80 (63.0%)
- Productos sin comparable: 47 (37.0%)
- Baja confianza: 2 (1.6%)
- Brechas accionables Venturino más caro: 28
- Brechas accionables Venturino más barato: 12
- Casos ambiguos por muchos candidatos: 32
- Casos con evidencia fina: 9

## Gates de Calidad

| Gate | Estado | Evidencia |
|---|---|---|
| coverage_min_45 | OK | Cobertura comparable 63.0% >= 45% |
| no_comparable_max_55 | OK | Sin comparable 37.0% <= 55% |
| low_confidence_max_5 | OK | Baja confianza 1.6% <= 5% |
| similar_status_present | OK | El estado similar a ML está presente |
| actionable_gaps_present | OK | Brechas accionables detectadas: 40 |

## Estados

| Estado | Cantidad |
|---|---:|
| sin comparable | 47 |
| similar a ML | 38 |
| Venturino más barato que ML | 12 |
| Venturino más caro que ML | 28 |
| baja confianza | 2 |

## Cobertura por Tipo

| Tipo | Total | Comparable | Sin comparable | Similar | Más caro | Más barato | Baja confianza | Accionables |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| JUGUETE | 30 | 29 | 1 | 22 | 4 | 3 | 0 | 7 |
| HERRAMIENTA | 10 | 7 | 3 | 0 | 6 | 1 | 0 | 7 |
| ISG | 7 | 0 | 7 | 0 | 0 | 0 | 0 | 0 |
| JARRO | 6 | 6 | 0 | 1 | 3 | 2 | 0 | 5 |
| BOTELLA | 5 | 5 | 0 | 3 | 0 | 2 | 0 | 2 |
| SIN_TIPO | 5 | 0 | 5 | 0 | 0 | 0 | 0 | 0 |
| KIT_HERRAMIENTAS | 4 | 4 | 0 | 0 | 4 | 0 | 0 | 4 |
| MOCHILA | 4 | 3 | 1 | 2 | 1 | 0 | 0 | 1 |
| MOTOR | 4 | 4 | 0 | 3 | 0 | 1 | 0 | 1 |
| GORRA | 3 | 3 | 0 | 0 | 3 | 0 | 0 | 3 |
| ACEITE | 3 | 1 | 2 | 0 | 0 | 1 | 0 | 1 |
| MATERA | 3 | 1 | 2 | 0 | 1 | 0 | 0 | 1 |
| CUCHILLA | 3 | 2 | 1 | 1 | 0 | 0 | 1 | 0 |
| CINCEL | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| MANOMETRO | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| CAJA_HERRAMIENTAS | 2 | 2 | 0 | 0 | 2 | 0 | 0 | 2 |
| MOTOBOMBA | 2 | 2 | 0 | 0 | 2 | 0 | 0 | 2 |
| GENERADOR | 2 | 2 | 0 | 1 | 0 | 1 | 0 | 1 |
| MOTOGUADANA | 2 | 2 | 0 | 1 | 0 | 1 | 0 | 1 |
| BATERIA | 2 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |
| MATE | 2 | 2 | 0 | 1 | 1 | 0 | 0 | 1 |
| CORREA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| BANDEJA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| CORTADORA | 2 | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| INYECCION | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| LATA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| TERMO | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| SOPLADOR | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| ADITIVO | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
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
| Batería John Deere StrongBox™ 12 V 110 Ah. John Deere | BATERIA | Venturino más caro que ML | $560.000 | $311.141 | 80.0% | alta | 2 | Bateria Moura M100hi 12x110 Tractor New Holland Jhon Deere |
| Juego de tubos SAE ¼” John Deere Set de 21 piezas | KIT_HERRAMIENTAS | Venturino más caro que ML | $149.000 | $112.900 | 32.0% | media | 12 | Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin |
| Caja de herramientas John Deere de acero | CAJA_HERRAMIENTAS | Venturino más caro que ML | $140.000 | $113.626 | 23.2% | media | 2 | Caja De Herramientas John Deere, 18 Piezas |
| Caja de herramientas John Deere verde con bandeja amarilla | CAJA_HERRAMIENTAS | Venturino más caro que ML | $183.000 | $139.438 | 31.2% | media | 1 | Caja De Herramientas John Deere, 18 Piezas |
| Camioneta y tractor John Deere | JUGUETE | Venturino más caro que ML | $300.000 | $271.772 | 10.4% | media | 20 | Juguete De Construcción John Deere Tractor Johnny 16 Piezas |
| Cosechadora con orugas S780 John Deere | JUGUETE | Venturino más caro que ML | $1.100.000 | $897.660 | 22.5% | media | 20 | Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg |
| Gorra Davis Beige John Deere Bordada. | GORRA | Venturino más caro que ML | $35.000 | $24.318 | 43.9% | media | 20 | Gorra Hip-hop John Deere |
| Gorro John Deere Santa Fe Mesh Bordado | GORRA | Venturino más caro que ML | $37.000 | $30.445 | 21.5% | media | 20 | Gorros Adulto Jhon Deere Bordado Ajustable |
| Gorro Tiger Verde John Deere | GORRA | Venturino más caro que ML | $42.000 | $32.499 | 29.2% | media | 19 | Gorra Gabardina John Deere Con Rotura |
| Jarro Bayo John Deere | JARRO | Venturino más caro que ML | $31.000 | $22.942 | 35.1% | media | 2 | Taza Nueva Equipo Agrícola John Deere |
| Jarro Road Blanco/Negro John Deere | JARRO | Venturino más caro que ML | $39.000 | $24.990 | 56.1% | media | 1 | Taza Nueva Equipo Agrícola John Deere |
| Jarro Zeit negro John Deere | JARRO | Venturino más caro que ML | $29.000 | $22.942 | 26.4% | media | 2 | Taza Nueva Equipo Agrícola John Deere |
| Juego de herramientas SAE y Métricos de ¼” John Deere | KIT_HERRAMIENTAS | Venturino más caro que ML | $282.000 | $227.109 | 24.2% | media | 2 | Juego De Tubos 3/8 John Deere Original 20 Piezas |
| Juego de llaves Métricas John Deere Set de 7 piezas | KIT_HERRAMIENTAS | Venturino más caro que ML | $200.000 | $135.583 | 47.5% | media | 5 | Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin |
| Juego de tubos flexibles Métricos | KIT_HERRAMIENTAS | Venturino más caro que ML | $119.000 | $107.219 | 11.0% | media | 16 | Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica |

### Más barato accionable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Motoguadaña Honda UMK450 – 47.9 cc | MOTOGUADANA | Venturino más barato que ML | $916.914 | $1.089.014 | -15.8% | alta | 4 | Desmalezadora Honda UMK450 |
| Aceite Hidráulico Hy‑Gard 20 Lts. John Deere | ACEITE | Venturino más barato que ML | $189.000 | $259.871 | -27.3% | media | 1 | Aceite Hidráulico Ajm69444 Hy-gard 20lt |
| Botella Atuel Blanca John Deere | BOTELLA | Venturino más barato que ML | $56.000 | $62.847 | -10.9% | media | 6 | Botella De Whisky John Deere Tractor Semi Truckbottle |
| Botella Hydro 750ML John Deere | BOTELLA | Venturino más barato que ML | $45.000 | $58.589 | -23.2% | media | 3 | Botella De Whisky John Deere Tractor Semi Truckbottle |
| Generador Honda EZ6500CXS – 6.5 KVA | GENERADOR | Venturino más barato que ML | $2.655.680 | $3.285.000 | -19.2% | alta | 7 | Generador Honda Naftero De Alta Potencia 6.5 Kva Ez6500cx... |
| Jarro Daten térmico John Deere | JARRO | Venturino más barato que ML | $62.000 | $79.344 | -21.9% | media | 5 | Taza Nueva Equipo Agrícola John Deere |
| Jarro Titan gris claro John Deere | JARRO | Venturino más barato que ML | $61.000 | $76.825 | -20.6% | media | 4 | Taza Nueva Equipo Agrícola John Deere |
| Motor Honda GX390QX – 13 HP | MOTOR | Venturino más barato que ML | $1.128.754 | $1.297.500 | -13.0% | alta | 4 | Motor Honda 13hp Eje 1 Gx390qx |
| Palanca Barra John Deere 8 pulgadas | HERRAMIENTA | Venturino más barato que ML | $30.000 | $34.650 | -13.4% | media | 4 | Palancas Apertura Ventana Cabina John Deere Sg2 |
| Set de Farmin Friends John Deere | JUGUETE | Venturino más barato que ML | $58.000 | $64.894 | -10.6% | media | 20 | Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr |
| Set de tractor y camión volquete John Deere | JUGUETE | Venturino más barato que ML | $60.000 | $67.490 | -11.1% | alta | 20 | Set De Vehículos John Deere Camión Volquete Y Tractor 18m+ |
| Tractor John Deere Flashight | JUGUETE | Venturino más barato que ML | $52.000 | $59.074 | -12.0% | media | 20 | Tractor Jhon Deere Ertl 1/64 |

### Sin comparable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Aceite de Motor Premium John Deere Plus-50™ II. John Deere | ACEITE | sin comparable | $238.000 | - | - | descartar | 0 | - |
| Aceite de Motor John Deere Torq-Gard™ II. John Deere | ACEITE | sin comparable | $175.000 | - | - | descartar | 0 | - |
| Aditivo Mejorador de Combustible John Deere | ADITIVO | sin comparable | $172.000 | - | - | descartar | 0 | - |
| Seccion de corte, cuchilla de draper John Deere | CUCHILLA | sin comparable | $9.300 | - | - | descartar | 0 | - |
| Correa Draper Lateral. John Deere | CORREA | sin comparable | $7.178.672 | - | - | descartar | 0 | - |
| Anticongelante Cool‑Gard. John Deere 10LTS | REFRIGERANTE | sin comparable | $97.000 | - | - | descartar | 0 | - |
| Bandeja magnetica John Deere rectangular. | BANDEJA | sin comparable | $32.000 | - | - | descartar | 0 | - |
| Batería John Deere StrongBox™ 12 V 150 Ah. John Deere | BATERIA | sin comparable | $759.000 | - | - | descartar | 0 | - |
| Boina bordada John Deere | BOINA | sin comparable | $35.000 | - | - | descartar | 0 | - |
| Bolso Duomo Bag John Deere | BOLSO | sin comparable | $110.000 | - | - | descartar | 0 | - |
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

### Baja confianza

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Filtro de Combustible. John Deere | FILTRO | baja confianza | $267.000 | $226.300 | 18.0% | baja | 20 | Filtro De Combustible Re500186 John Deere |
| Puntón Cuchilla. John Deere | CUCHILLA | baja confianza | $86.000 | $103.019 | -16.5% | baja | 20 | Cuchillas Para Tractor John Deere 42 |

## Recomendaciones

- Usar el reporte como benchmark comercial cuando el estado sea similar, más caro o más barato; separar explícitamente baja confianza y sin comparable.
- Priorizar revisión de productos más caros con brecha >= 10% y confianza media/alta; son las oportunidades comerciales más accionables.
- No usar productos sin comparable como señal de precio; usarlos como backlog de mejora del diccionario o como evidencia de falta de mercado comparable.
- Tipos con baja cobertura para iterar diccionario: ISG, SIN_TIPO, CINCEL, MANOMETRO, CORREA, BANDEJA, INYECCION, LATA.
- Tipos con mejor señal actual: JUGUETE, HERRAMIENTA, JARRO, BOTELLA, KIT_HERRAMIENTAS, MOCHILA, MOTOR, GORRA.
