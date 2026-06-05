# Evaluación Benchmark Postventa

Generado: 2026-06-05T16:04:47.435Z
Análisis base: 2026-06-05T16:04:14.016Z

## KPIs

- Productos Venturino evaluados: 127
- Productos con comparable: 69 (54.3%)
- Productos sin comparable: 58 (45.7%)
- Baja confianza: 6 (4.7%)
- Brechas accionables Venturino más caro: 22
- Brechas accionables Venturino más barato: 8
- Casos ambiguos por muchos candidatos: 32
- Casos con evidencia fina: 21

## Gates de Calidad

| Gate | Estado | Evidencia |
|---|---|---|
| coverage_min_45 | OK | Cobertura comparable 54.3% >= 45% |
| no_comparable_max_55 | OK | Sin comparable 45.7% <= 55% |
| low_confidence_max_5 | OK | Baja confianza 4.7% <= 5% |
| similar_status_present | OK | El estado similar a ML está presente |
| actionable_gaps_present | OK | Brechas accionables detectadas: 30 |

## Estados

| Estado | Cantidad |
|---|---:|
| sin comparable | 58 |
| Venturino más barato que ML | 8 |
| Venturino más caro que ML | 22 |
| similar a ML | 33 |
| baja confianza | 6 |

## Cobertura por Tipo

| Tipo | Total | Comparable | Sin comparable | Similar | Más caro | Más barato | Baja confianza | Accionables |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| JUGUETE | 30 | 30 | 0 | 20 | 4 | 5 | 1 | 9 |
| HERRAMIENTA | 10 | 10 | 0 | 3 | 4 | 0 | 3 | 4 |
| ISG | 7 | 0 | 7 | 0 | 0 | 0 | 0 | 0 |
| JARRO | 6 | 6 | 0 | 2 | 2 | 2 | 0 | 4 |
| BOTELLA | 5 | 5 | 0 | 3 | 1 | 1 | 0 | 2 |
| SIN_TIPO | 5 | 0 | 5 | 0 | 0 | 0 | 0 | 0 |
| KIT_HERRAMIENTAS | 4 | 4 | 0 | 2 | 2 | 0 | 0 | 2 |
| MOCHILA | 4 | 2 | 2 | 1 | 1 | 0 | 0 | 1 |
| MOTOR | 4 | 0 | 4 | 0 | 0 | 0 | 0 | 0 |
| GORRA | 3 | 3 | 0 | 0 | 3 | 0 | 0 | 3 |
| MATERA | 3 | 1 | 2 | 0 | 1 | 0 | 0 | 1 |
| ACEITE | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| CUCHILLA | 3 | 2 | 1 | 1 | 0 | 0 | 1 | 0 |
| CINCEL | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| MANOMETRO | 3 | 0 | 3 | 0 | 0 | 0 | 0 | 0 |
| CAJA_HERRAMIENTAS | 2 | 2 | 0 | 0 | 2 | 0 | 0 | 2 |
| BATERIA | 2 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |
| MATE | 2 | 2 | 0 | 1 | 1 | 0 | 0 | 1 |
| GENERADOR | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| MOTOGUADANA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| CORREA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| BANDEJA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| CORTADORA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| INYECCION | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| MOTOBOMBA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| LATA | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| TERMO | 2 | 0 | 2 | 0 | 0 | 0 | 0 | 0 |
| SOPLADOR | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
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
| Jarro Chalten Verde John Deere | JARRO | Venturino más caro que ML | $21.000 | $13.000 | 61.5% | media | 1 | Taza John Deere |
| Batería John Deere StrongBox™ 12 V 110 Ah. John Deere | BATERIA | Venturino más caro que ML | $560.000 | $310.573 | 80.3% | alta | 1 | Bateria Willard Ub920i 12x110 John Deere Vial Tractores |
| Juego de tubos SAE ¼” John Deere Set de 21 piezas | KIT_HERRAMIENTAS | Venturino más caro que ML | $149.000 | $114.799 | 29.8% | media | 11 | Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin |
| Botella termica Olympia John Deere | BOTELLA | Venturino más caro que ML | $68.000 | $57.053 | 19.2% | media | 2 | Botella De Whisky John Deere Tractor Semi Truckbottle |
| Caja de herramientas John Deere de acero | CAJA_HERRAMIENTAS | Venturino más caro que ML | $140.000 | $112.902 | 24.0% | media | 2 | Caja De Herramientas John Deere, 18 Piezas |
| Caja de herramientas John Deere verde con bandeja amarilla | CAJA_HERRAMIENTAS | Venturino más caro que ML | $183.000 | $139.438 | 31.2% | media | 1 | Caja De Herramientas John Deere, 18 Piezas |
| Camioneta y tractor John Deere | JUGUETE | Venturino más caro que ML | $300.000 | $268.074 | 11.9% | media | 20 | Juguete De Construcción John Deere Tractor Johnny 16 Piezas |
| Cosechadora con orugas S780 John Deere | JUGUETE | Venturino más caro que ML | $1.100.000 | $855.223 | 28.6% | media | 20 | Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg |
| Gorra Davis Beige John Deere Bordada. | GORRA | Venturino más caro que ML | $35.000 | $24.707 | 41.7% | media | 20 | Gorra De Béisbol John Deere |
| Gorro John Deere Santa Fe Mesh Bordado | GORRA | Venturino más caro que ML | $37.000 | $29.943 | 23.6% | media | 20 | Gorra Gabardina John Deere Con Rotura |
| Gorro Tiger Verde John Deere | GORRA | Venturino más caro que ML | $42.000 | $29.972 | 40.1% | media | 20 | Gorra Gabardina John Deere Con Rotura |
| Jarro Road Blanco/Negro John Deere | JARRO | Venturino más caro que ML | $39.000 | $31.448 | 24.0% | media | 1 | Sa Taza Nueva De Equipo Agrícola John Deere Par |
| Juego de herramientas SAE y Métricos de ¼” John Deere | KIT_HERRAMIENTAS | Venturino más caro que ML | $282.000 | $223.999 | 25.9% | media | 5 | Juego De Tubos 3/8 John Deere Original 20 Piezas |
| Llaves ajustables John Deere 8 pulgadas | HERRAMIENTA | Venturino más caro que ML | $49.000 | $41.198 | 18.9% | media | 3 | Llaves De Equipamiento Original John Deere Gy20680, Paquete |
| Mate San Roque con bombilla verde John Deere | MATE | Venturino más caro que ML | $45.000 | $32.900 | 36.8% | media | 10 | Set Matero John Deere. Ecocuero |

### Más barato accionable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Tractor John Deere 8R para cultivos en hileras | JUGUETE | Venturino más barato que ML | $71.000 | $82.832 | -14.3% | alta | 20 | Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\ |
| Botella Hydro 750ML John Deere | BOTELLA | Venturino más barato que ML | $45.000 | $57.053 | -21.1% | media | 2 | Botella De Whisky John Deere Tractor Semi Truckbottle |
| Jarro Daten térmico John Deere | JARRO | Venturino más barato que ML | $62.000 | $73.081 | -15.2% | media | 5 | 2026 Taza Nueva De Equipo Agrícola John Deere |
| Jarro Titan gris claro John Deere | JARRO | Venturino más barato que ML | $61.000 | $73.081 | -16.5% | media | 5 | Taza Nueva Equipo Agrícola John Deere |
| Juguete Desmontable Build a Buddy Bonnie Scooper John Deere | JUGUETE | Venturino más barato que ML | $73.000 | $84.846 | -14.0% | media | 20 | Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé |
| Set de Farmin Friends John Deere | JUGUETE | Venturino más barato que ML | $58.000 | $68.945 | -15.9% | media | 20 | Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr |
| Set de tractor y camión volquete John Deere | JUGUETE | Venturino más barato que ML | $60.000 | $69.729 | -14.0% | media | 20 | Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr |
| Tractor con vagón John Deere | JUGUETE | Venturino más barato que ML | $71.000 | $83.333 | -14.8% | media | 20 | Tractor Jhon Deere A Escala Farming Simulator |

### Sin comparable

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Aceite de Motor Premium John Deere Plus-50™ II. John Deere | ACEITE | sin comparable | $238.000 | - | - | descartar | 0 | - |
| Generador Honda EZ3000CX – 3 KVA | GENERADOR | sin comparable | $1.165.943 | - | - | descartar | 0 | - |
| Soplador Honda HHB25-ET1 – 25 | SOPLADOR | sin comparable | $825.087 | - | - | descartar | 0 | - |
| Aceite de Motor John Deere Torq-Gard™ II. John Deere | ACEITE | sin comparable | $175.000 | - | - | descartar | 0 | - |
| Motoguadaña Honda UMK450 – 47.9 cc | MOTOGUADANA | sin comparable | $916.914 | - | - | descartar | 0 | - |
| Aditivo Mejorador de Combustible John Deere | ADITIVO | sin comparable | $172.000 | - | - | descartar | 0 | - |
| Seccion de corte, cuchilla de draper John Deere | CUCHILLA | sin comparable | $9.300 | - | - | descartar | 0 | - |
| Correa Draper Lateral. John Deere | CORREA | sin comparable | $7.178.672 | - | - | descartar | 0 | - |
| Aceite Hidráulico Hy‑Gard 20 Lts. John Deere | ACEITE | sin comparable | $189.000 | - | - | descartar | 0 | - |
| Anticongelante Cool‑Gard. John Deere 10LTS | REFRIGERANTE | sin comparable | $97.000 | - | - | descartar | 0 | - |
| Bandeja magnetica John Deere rectangular. | BANDEJA | sin comparable | $32.000 | - | - | descartar | 0 | - |
| Batería John Deere StrongBox™ 12 V 150 Ah. John Deere | BATERIA | sin comparable | $759.000 | - | - | descartar | 0 | - |
| Boina bordada John Deere | BOINA | sin comparable | $35.000 | - | - | descartar | 0 | - |
| Bolso Duomo Bag John Deere | BOLSO | sin comparable | $110.000 | - | - | descartar | 0 | - |
| Cincel plano John Deere de corte en frío 10mm | CINCEL | sin comparable | $17.000 | - | - | descartar | 0 | - |
| Cincel plano John Deere de corte en frío 16mm | CINCEL | sin comparable | $29.000 | - | - | descartar | 0 | - |
| Cincel plano John Deere de corte en frío 22mm | CINCEL | sin comparable | $15.000 | - | - | descartar | 0 | - |
| Correa Lateral Side Draper Belting John Deere | CORREA | sin comparable | $4.264.000 | - | - | descartar | 0 | - |
| Cortadora de Césped Honda HRG466SKEP – 4.2 HP | CORTADORA | sin comparable | $1.866.924 | - | - | descartar | 0 | - |
| Cortadora de Césped Honda HRX476VYEH – 4.8 HP | CORTADORA | sin comparable | $3.281.116 | - | - | descartar | 0 | - |

### Baja confianza

| Producto | Tipo | Estado | Precio | Mediana ML | Brecha | Confianza | Candidatos | Mejor candidato |
|---|---|---|---:|---:|---:|---|---:|---|
| Cargador de tierra John Deere | JUGUETE | baja confianza | $3.568.000 | $2.328.385 | 53.2% | baja | 2 | Tractor 1/16 John Deere Ertl 9rx 830 - A Pedido_exkarg |
| Filtro de Combustible. John Deere | FILTRO | baja confianza | $267.000 | $223.538 | 19.4% | baja | 18 | Filtro De Combustible John Deere Re525523 Agrícola |
| Herramienta de recogida magnética John Deere | HERRAMIENTA | baja confianza | $20.000 | $19.695 | 1.5% | baja | 2 | Palancas Apertura Ventana Cabina John Deere Sg2 |
| Juego de ganchos John Deere 4 piezas | HERRAMIENTA | baja confianza | $97.000 | $62.523 | 55.1% | baja | 3 | Porta Herramienta Cuero John Deere - A Pedido_exkarg |
| Llaves ajustables John Deere 6 pulgadas | HERRAMIENTA | baja confianza | $39.000 | $36.483 | 6.9% | baja | 2 | Palanca Acelerador John Deere Reparacion John Deere 135 Otro |
| Puntón Cuchilla. John Deere | CUCHILLA | baja confianza | $86.000 | $99.024 | -13.2% | baja | 20 | Cuchillas Para Tractor John Deere 42 |

## Recomendaciones

- Usar el reporte como benchmark comercial cuando el estado sea similar, más caro o más barato; separar explícitamente baja confianza y sin comparable.
- Priorizar revisión de productos más caros con brecha >= 10% y confianza media/alta; son las oportunidades comerciales más accionables.
- No usar productos sin comparable como señal de precio; usarlos como backlog de mejora del diccionario o como evidencia de falta de mercado comparable.
- Mejorar cobertura de tipos técnicos: el porcentaje sin comparable sigue cerca de la mitad del catálogo.
- Tipos con baja cobertura para iterar diccionario: ISG, SIN_TIPO, MOTOR, ACEITE, CINCEL, MANOMETRO, GENERADOR, MOTOGUADANA.
- Tipos con mejor señal actual: JUGUETE, HERRAMIENTA, JARRO, BOTELLA, KIT_HERRAMIENTAS, GORRA, CAJA_HERRAMIENTAS, MATE.
