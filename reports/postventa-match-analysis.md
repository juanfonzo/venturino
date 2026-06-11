# Análisis de Matches Postventa

Generado: 2026-06-11T18:38:28.646Z

## Parámetros

- Colección Mongo: `algorym.productos`
- Algoritmo: `postventa-v0`
- Runtime: lib/postventa/matching.ts
- Venturino activo: 2026-05-30
- ML activo: 2026-06-11
- Muestra Venturino: 1000
- Top candidatos por producto: 20
- Banda de precio: ±40%
- Umbral similar a ML: ±10%
- Score mínimo: 20

## Criterios Del Algoritmo

- Se usan sólo productos activos de la última extracción de cada origen.
- Venturino se deduplica por `producto_id`; ML se deduplica por `ml_item_id` o fallback estable desde URL.
- Los candidatos ML fuera de la banda de precio configurada se excluyen antes del scoring.
- El scoring se ejecuta desde `lib/postventa/matching.ts`, el mismo módulo que usa el análisis persistido.
- La mediana ML se calcula con los candidatos aceptados dentro del top configurado.
- Los estados del análisis priorizan confianza: sin candidatos, baja confianza, similar a ML, y luego comparación contra mediana ML.

## Perfil De Datos

- Productos Venturino activos: 127 únicos (127 registros crudos)
- Productos ML activos: 5248 únicos (5253 registros crudos)
- Venturino con precio: 127
- ML con precio: 4963

## Resumen De La Muestra

- Venturino más barato que ML: 13
- similar a ML: 38
- sin comparable: 46
- Venturino más caro que ML: 28
- baja confianza: 2

Confianza de candidatos usados:
- media: 569
- alta: 106
- baja: 221

## Muestra Y Candidatos

### 1. Aceite de Motor Premium John Deere Plus-50™ II. John Deere

- ID Venturino: `318717662`
- Precio Venturino: $238.000
- Tokens: aceite, motor, premium, plus-50, ii
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 4122
- Candidatos excluidos por score: 840
- Mediana ML: $298.469
- Venturino vs mediana ML: -20.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Aceite Plus 50 John Deere](https://www.mercadolibre.com.ar/aceite-plus-50-john-deere/up/MLAU175383531#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&float_highlight=last_unit&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA904693976&sid=search) | $298.469 | 25.4% | tipo: ACEITE; tokens comunes: aceite; compatibilidad/marca: John Deere |

### 2. Generador Honda EZ3000CX – 3 KVA

- ID Venturino: `332862512`
- Precio Venturino: $1.165.943
- Tokens: generador, honda, ez3000cx, 3, kva, ez3000
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 6
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4730
- Candidatos excluidos por score: 227
- Mediana ML: $1.185.657
- Venturino vs mediana ML: -1.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 132 | [Generador Grupo Electrogeno Honda Ez3000cx 3 Kva Moron Ppi](https://www.mercadolibre.com.ar/generador-grupo-electrogeno--honda-ez3000cx-3-kva-moron-ppi/up/MLAU219924817#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&float_highlight=last_unit&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1129317376&sid=search) | $1.301.793 | 11.7% | tipo: GENERADOR; tokens técnicos: ez3000cx, ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000cx, 3, kva, ez3000 |
| 2 | alta | 118 | [Generador Honda Ez3000cx 2.5kva Con Ruedas Y Manillar](https://www.mercadolibre.com.ar/generador-honda-ez3000cx-25kva-con-ruedas-y-manillar/up/MLAU267411221#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&float_highlight=last_units&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA908999957&sid=search) | $1.077.350 | -7.6% | tipo: GENERADOR; tokens técnicos: ez3000cx, ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000cx, ez3000 |
| 3 | alta | 111 | [Generador Electrogeno Honda Ez 3000 3 Kva - Honda Quilmes](https://www.mercadolibre.com.ar/generador-honda-ez3000-220v-naftero-portatil/p/MLA2053258934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&float_highlight=last_units&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA935641982&sid=search) | $1.121.314 | -3.8% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, 3, kva, ez3000 |
| 4 | alta | 101 | [Generador Honda Ez 3000 Cx 2.5 Kva Moto Store Pilar](https://www.mercadolibre.com.ar/generador-honda-ez-3000-cx-25-kva-moto-store-pilar/up/MLAU233101185#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1373008332&sid=search) | $1.250.000 | 7.2% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, kva, ez3000 |
| 5 | alta | 101 | [Generador Grupo Electrogeno Honda Ez 3000 2.5 Kva Portátil](https://www.mercadolibre.com.ar/generador-grupo-electrogeno-honda-ez-3000-25-kva-portatil/up/MLAU143353720#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&float_highlight=last_units&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1106773437&sid=search) | $1.040.195 | -10.8% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, kva, ez3000 |
| 6 | alta | 95 | [Generador Grupo Electrogeno Honda Ez 3000 2.5kva](https://www.mercadolibre.com.ar/generador-grupo-electrogeno-honda-ez-3000-25kva/up/MLAU264533926#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1433235434&sid=search) | $1.275.000 | 9.4% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000 |

### 3. Soplador Honda HHB25-ET1 – 25

- ID Venturino: `332865249`
- Precio Venturino: $825.087
- Tokens: soplador, honda, hhb25-et1, 25, hhb25
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 6
- Candidatos usados: 7 de 7 válidos antes de top
- Candidatos excluidos por precio: 4626
- Candidatos excluidos por score: 330
- Mediana ML: $870.000
- Venturino vs mediana ML: -5.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 101 | [Soplador Honda Hhb25 Genamax](https://www.mercadolibre.com.ar/soplador-honda-hhb25-genamax/p/MLA70524905#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA3390149194&sid=search) | $823.600 | -0.2% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 2 | alta | 101 | [Soplador Honda Hhb25 Genamax](https://www.mercadolibre.com.ar/soplador-honda-hhb25-genamax/up/MLAU3361419411#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA2250429934&sid=search) | $823.600 | -0.2% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 3 | alta | 96 | [Soplador Honda Hhb25e 4 Tiempos Naftero](https://www.mercadolibre.com.ar/soplador-honda-hhb25e-4-tiempos-naftero/up/MLAU3499237572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA2457975762&sid=search) | $870.000 | 5.4% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 4 | alta | 96 | [Soplador Honda Original Hhb25e 4 T Naftero](https://www.mercadolibre.com.ar/soplador-honda-original--hhb25e-4-t-naftero/up/MLAU3337699701#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA2213507244&sid=search) | $1.126.516 | 36.5% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 5 | alta | 95 | [Soplador De Hojas Naftero Honda 4 Tiempos Hhb25 1hp Jardin](https://www.mercadolibre.com.ar/soplador-de-hojas-naftero-honda-4-tiempos-hhb25-1hp-jardin/up/MLAU321243853#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA1676560962&sid=search) | $921.309 | 11.7% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 6 | alta | 74 | [Sopladora Honda Hhb25-et1 Manual Naftera Color Rojo Original](https://www.mercadolibre.com.ar/sopladora-honda-hhb25et1-manual-naftera-color-rojo-original/up/MLAU3331375733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA2209045008&sid=search) | $1.146.338 | 38.9% | tokens técnicos: hhb25-et1, hhb25; modelo Honda compatible: hhb25; tokens comunes: honda, hhb25-et1, hhb25 |
| 7 | baja | 29 | [Sopladora A Explosión Honda Hhb25-et1 Motor 25cc 4 Tiempos](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=m3zITVw96KmAcmuGwetjSP%2BKkFBpFDxuKbI233sVFOM0XQ1UnthKVIUJtAdXZUeAMwLWTE%2B%2BH1ofZT%2B53EPniPMMUOavw2lizLIhKi48FTLM6va0sGRKYxMIcFHuKumclb60k1Gnm77bEsmJGpAccGxJR%2FhjI61kmqM7NHxrmF0%2FPPkUEwIpVMEkWwhMB9d1PQQCZrksyvqsKbVbfWcKCar8ZX0dQErd5uVwt%2Bzn5obOVXz5o5OmsQrXxycNIUcetBJ4pTR8aP1JFUO%2FopfwEQFhIV5hkuDKbVZU6u%2FLr4EZUWI4DFoH%2F9yFj%2F1aTaFAlJw5jBuFPXoaMOKL1Qixw3JejQk0C63h9wGYm%2BIaz107Ej5Aei6%2Bf3EgKB8a6aGr826bclbyM2AbhiBBMP92elFM9SdrnbU1rJ7gAtk7aWlMOeeFNj30oIL5IiTflU2zqYeFkzFo%2FNxP9xQULrXzuQxS2CyQ0diKWgJ2XpX3KGgRBnmUW%2FQuryNKnoRJwOLC75LzTYgA6iHbrH1tARKZE3%2FXfUQ91GN1d%2BqpVEs%2BAc7PCVf8K010Qa725pprvlh1kZZyif%2Fy1x%2BmMinmGsn1jXcQsf9Us4ZKpCEgBru7k5YjzHIjYyePcHr8WBVD6LcpY3TE%2Bmc%2FrtIfoMm22lOGQXMf%2FdbjhVqXmKfh57pxDOoy1dbZQTG1onHQXw2%2Fyld7bL71v5xVEqcwBo3p0MmcT9xstZz7zvpFZscKIaq9a0xcEf6UNzqyOBXnaUGyeNJcTEnCiIAKTcPP%2FE6qrgb2A2EZSeNAiauQBuYNs43fXFobN0Xx1ehZfoaEHFJfrpMNwLbYP6KCxPZif3MF4H7FLFYDil8kOO%2BCqcS9UgO0x6vOEuCrtKzZVnBoLLMzG2XRtapuTaEXB0UNtGhhijjvviKhblsP%2FJPlGEtPySyda9YAu6ezvDW2homKmFgB%2FmjbA99JTzbZoQfmx0nKvE%2B45KKgrj3Rfdjwkr2BPFb6aA%3D%3D&pdp_filters=item_id%3AMLA3205455354#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3914032046&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=cab9d9a8-751e-4d8c-aefe-91b30956f123&wid=MLA3205455354&sid=search) | $795.000 | -3.6% | penalización tipo distinto (SOPLADOR vs MOTOR); tokens técnicos: hhb25-et1, hhb25; modelo Honda compatible: hhb25; tokens comunes: honda, hhb25-et1, hhb25 |

### 4. Tractor John Deere 8R para cultivos en hileras

- ID Venturino: `281259424`
- Precio Venturino: $71.000
- Tokens: tractor, 8r, cultivo, hilera
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 64 válidos antes de top
- Candidatos excluidos por precio: 3730
- Candidatos excluidos por score: 1169
- Mediana ML: $75.536
- Venturino vs mediana ML: -6.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 70 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf&wid=MLA3370300548&sid=search) | $48.540 | -31.6% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | 13.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | -1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3036951256&sid=search) | $74.945 | 5.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | 7.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | -10.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-7215r-ertl-164-verde/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA1717056337&sid=search) | $80.041 | 12.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | 16.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | 18.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6c2508d7-0313-410b-aeb1-1fc19b8b3471&wid=MLA3078939230&sid=search) | $85.706 | 20.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | 21.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | -22.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | -22.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA2842120858&sid=search) | $87.855 | 23.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | 26.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 5. Aceite de Motor John Deere Torq-Gard™ II. John Deere

- ID Venturino: `318727927`
- Precio Venturino: $175.000
- Tokens: aceite, motor, torq-gard, ii
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3879
- Candidatos excluidos por score: 1084
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 6. Jarro Chalten Verde John Deere

- ID Venturino: `338234315`
- Precio Venturino: $21.000
- Tokens: jarro, chalten, verde
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4259
- Candidatos excluidos por score: 702
- Mediana ML: $22.267
- Venturino vs mediana ML: -5.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=20&type=item&tracking_id=75fd7f4e-7eaf-4256-893d-b093103807fa) | $24.823 | 18.2% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Y Taza Clásica, Taza De Café, Decoración Del Hogar](https://www.mercadolibre.com.ar/taza-de-cafe-tipo-tractor-11-onzas-con-forma-de-semirremo-a/p/MLA2051419761#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=f706ed14-595a-4ff5-bd03-3068a6be52b6&wid=MLA1783662613&sid=search) | $19.711 | -6.1% | tipo: JARRO; tokens comunes: jarro |

### 7. Motoguadaña Honda UMK450 – 47.9 cc

- ID Venturino: `332864442`
- Precio Venturino: $916.914
- Tokens: motoguadana, honda, umk450, 47.9, cc
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4646
- Candidatos excluidos por score: 313
- Mediana ML: $932.665
- Venturino vs mediana ML: -1.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 125 | [Desmalezadora Motoguadaña Honda Umk 450t 47,9 Cc 4t 2.2 Hp](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk-450t-479-cc-4t--22-hp/up/MLAU3370742396#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA2260230924&sid=search) | $809.827 | -11.7% | tipo: MOTOGUADANA; tokens técnicos: umk450, 47.9; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450, 47.9, cc |
| 2 | alta | 101 | [Desmalezadora Honda UMK450T](https://www.mercadolibre.com.ar/desmalezadora-honda-umk450t/p/MLA17920044#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA2457970382&sid=search) | $885.429 | -3.4% | tipo: MOTOGUADANA; tokens técnicos: umk450; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450 |
| 3 | alta | 97 | [Desmalezadora Motoguadaña Honda Umk450t 4 Tiempos](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk450t-4-tiempos/up/MLAU3979434128#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA3330545332&sid=search) | $979.900 | 6.9% | tipo: MOTOGUADANA; tokens técnicos: umk450; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450 |
| 4 | media | 48 | [Motoguadaña Desmalezadora Honda Umk 450t 47.9 Cc + Aceite](https://www.mercadolibre.com.ar/motoguadana-desmalezadora-honda-umk-450t-479-cc--aceite/up/MLAU280706975#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA791978680&sid=search) | $1.039.500 | 13.4% | penalización tipo distinto (MOTOGUADANA vs ACEITE); tokens técnicos: umk450, 47.9; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450, 47.9, cc |

### 8. Tractor Johny John Deere a control remoto

- ID Venturino: `281053479`
- Precio Venturino: $145.000
- Tokens: tractor, johny, control, remoto
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 167 válidos antes de top
- Candidatos excluidos por precio: 3685
- Candidatos excluidos por score: 1111
- Mediana ML: $142.253
- Venturino vs mediana ML: 1.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 65 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1588597639&sid=search) | $109.070 | -24.8% | tipo: JUGUETE; tokens comunes: tractor, control, remoto; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | -29.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Antiguo Tractor A Escala John Deere](https://www.mercadolibre.com.ar/antiguo-tractor-a-escala-john-deere/up/MLAU4067955603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1831356015&sid=search) | $189.800 | 30.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor 1:64 John Deere 8rx 410 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8rx-410--a-pedidoexkarg/up/MLAU159998621#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1376655339&sid=search) | $145.546 | 0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3263270113#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA2149326968&sid=search) | $144.099 | -0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA1557066483&sid=search) | $142.598 | -1.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1662281537&sid=search) | $141.907 | -2.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Ertl John Deere 4020 Diesel - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4020-diesel--a-pedidoexkarg/up/MLAU2966024143#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1472336879&sid=search) | $141.230 | -2.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Vehículos De Fundición John Deere Ertl Tractor 6410 Escala 1](https://www.mercadolibre.com.ar/die-cast-vehicles-john-deere-ertl-6410-tractor-132-scale/p/MLA2051622830#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA3111933072&sid=search) | $152.330 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1688853331&sid=search) | $137.348 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor John Deere 7260r 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7260r-164--a-pedidoexkarg/up/MLAU3005755665#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA2012178172&sid=search) | $157.576 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor De Juguete John Deere 2640 Field Of Dreams Lp](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-2640-field-of-dreams-lp/p/MLA2053419470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA2597594466&sid=search) | $157.980 | 9.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Juego De Tractores De Juguete John Deere 6410 Con Barcaza Verde](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=02c64d32-be32-41e1-86bb-aa70571e4466&wid=MLA1752012759&sid=search) | $130.654 | -9.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Set De Juguete Tractor John Deere 5075e Con Remolque A Escal](https://www.mercadolibre.com.ar/toy-john-deere-5075e-tractor-hauling-set-132-scale/p/MLA2089035184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1806751067&sid=search) | $161.388 | 11.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Set De Juguetes John Deere Haying A Escala 1/32 Con Tractor,](https://articulo.mercadolibre.com.ar/MLA-2470290950-set-de-juguetes-john-deere-haying-a-escala-132-con-tractor-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=item&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f) | $127.523 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor 1/64 John Deere 8rt 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8rt-370--a-pedidoexkarg/up/MLAU3212583782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1501408549&sid=search) | $166.431 | 14.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor 1/64 John Deere 9rx 710 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-710--a-pedidoexkarg/up/MLAU3212563668#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1501534405&sid=search) | $166.686 | 15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA3141293538&sid=search) | $122.099 | -15.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=7a1692f9-9d61-4ed1-a54c-b01fdfc4cd57&wid=MLA2797531354&sid=search) | $120.477 | -16.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 9. Batería John Deere StrongBox™ 12 V 110 Ah. John Deere

- ID Venturino: `318732486`
- Precio Venturino: $560.000
- Tokens: bateria, strongbox, 12, v, 110, ah
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4501
- Candidatos excluidos por score: 460
- Mediana ML: $289.323
- Venturino vs mediana ML: 93.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 73 | [Bateria Moura M100hi 12x110 Tractor New Holland Jhon Deere](https://www.mercadolibre.com.ar/bateria-moura-m100hi-12x110-tractor-new-holland-jhon-deere/up/MLAU3210015848#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f&wid=MLA3353767142&sid=search) | $311.708 | -44.3% | tipo: BATERIA; capacidad batería: 110Ah; tokens comunes: bateria; compatibilidad/marca: John Deere |
| 2 | alta | 73 | [Bateria Willard Ub920i 12x110 John Deere Vial Tractores](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=FYrYIfFNqSijq5qv9%2BhjzxbhQyczzZiR%2Fpds%2FBEuao8RBUHuZ%2FVtNkKcb%2BLhU%2BgvSPla2mAHL7AOBc4oNwwvIrQ6Ts6y1B38Zncc%2BZ8Pz5hp66%2F5KpbWEEk3z%2FxMzVXDqXzGpe4cCiwJjdRTFiA1ywa%2BFccr68Y7Pv8nSaohtpcUBS2LwX2JXTSERIdxaaTjICivh990ZBBkwV5W8jA3t1eoaMLLtgsKI47iW2b0cmcUxmD3yvU%2BxziRiYlT9iXqB%2BXXyCncnK0o2pDUwPM0ZGOQTJ4dPlqAaO9bDSffT8WtdzYYip%2BbHGGTBLqKU98ieemvC4fc8qVN9EJH2vQQ3AsYGM9bPfRxD%2BEKwiezaWqm9E8E8UmRU%2FXUDFGZFdzDJG2Etq2d92NRZW7NrP8p6ZQvw3DnfLOoeaD3ejnUJ10w67Eu%2BpEy3ir2pAy%2F0wBe46Yi9PbcOaOrN7cQnob0HKPNravkDhMcvOE71pRDt6fEpq7nmNXz0LfbyjB4EbvX4bbJ%2BF%2FoikVKpVDF048ww%2BmQN4%2F%2BTA7dMYxwuxmGWLyMMBhh%2FyzpDFdrvtY8ba3wiyUpD9Ib2vB6%2Blye4o8l%2FtA3jixFVT%2BwzaCbcbZ85bWupq8qy%2BpJgLyu5B1U1gVI%2Bgc7eAhk5gGHhIZwX8psCv8cd4l9mn9oRPLs0KA%2B7%2BvcEblbcnm1TG8uzSQfHwc8qv1%2FYGLCe2IUyDl3p9cwMGSsLlND%2F54ifEk9%2F3RZ%2FCH57wPXC35xuKiNvn186JNlKHiJ%2FpUfVKVLO1%2B3U3QLSfLPOaJE0%2FZLRqhKBqT30eClqQTb4QdIqud6%2FxB09D35oJw%2FWnDMOCrqhvHahEqXqtMLLYtaVJZ%2FVayR0HRd2qRkp3geIQqwvvr50M%2FW0MPzdgas%2BSOFlemYwCJEjBPJVfJgRXF7XpBJoXAnU9LNrHDLnX%2B2iaD%2FFAcQOPyepzFnPqa5iKGhdfa1WZfmcq8TGSHOVS3xq7FQgg9VdTyk%2FL299Ck%3D&pdp_filters=item_id%3AMLA869234580#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU296922540&backend_model=search-backend&be_origin=backend&search_layout=grid&position=3&type=pad&tracking_id=d8c9e483-9ec0-4011-9e5f-be34a5ff58d2&wid=MLA869234580&sid=search) | $266.938 | -52.3% | tipo: BATERIA; capacidad batería: 110Ah; tokens comunes: bateria; compatibilidad/marca: John Deere |

### 10. Juego de tubos SAE ¼” John Deere Set de 21 piezas

- ID Venturino: `276679543`
- Precio Venturino: $149.000
- Tokens: juego, tubo, sae, set, 21, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 3700
- Candidatos excluidos por score: 1260
- Mediana ML: $98.862
- Venturino vs mediana ML: 50.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA1807348547&sid=search) | $97.200 | -34.8% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 2 | media | 49 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2491947770&sid=search) | $98.862 | -33.6% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | baja | 43 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA2308233004&sid=search) | $114.799 | -23.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |

### 11. Tractor con empacadora, vagón y 12 pacas de heno John Deere

- ID Venturino: `281234465`
- Precio Venturino: $400.000
- Tokens: tractor, empacadora, vagon, 12, paca, heno
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 121 válidos antes de top
- Candidatos excluidos por precio: 4397
- Candidatos excluidos por score: 445
- Mediana ML: $400.490
- Venturino vs mediana ML: -0.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2550302558&sid=search) | $380.389 | -4.9% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor De Juguete John Deere Big Farm Con Vagón A Escala 1:](https://www.mercadolibre.com.ar/john-deere-big-farm-tractor-and-wagon-116-scale-ligh/p/MLA2038130505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3382284296&sid=search) | $271.472 | -32.1% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Empacadora John Deere De Coleccion Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/empacadora-john-deere-de-coleccion-bruder--a-pedidoexkarg/up/MLAU149484839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1144752768&sid=search) | $412.660 | 3.2% | tipo: JUGUETE; tokens comunes: empacadora; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Vagón De Tren John Deere Escala O Lionel](https://www.mercadolibre.com.ar/vagon-de-tren-john-deere-escala-o-lionel/up/MLAU3915674437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3233211424&sid=search) | $481.099 | 20.3% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Tractor John Deere 630 1:16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-630-116-coleccion-prestige/up/MLAU4082684090#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1831321295&sid=search) | $401.099 | 0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7c4b4c2d-771f-4b6a-adc8-d78211943afa&wid=MLA3117507902&sid=search) | $420.000 | 5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1138213292&sid=search) | $373.467 | -6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Tractor John Deere 4430 A Escala 1/16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-4430-116-scale-prestige-collection/p/MLA2083556655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d&wid=MLA3418164804&sid=search) | $430.005 | 7.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1501340737&sid=search) | $439.275 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Set De Triciclo Y Vagón John Deere Para Niños A Partir De 18](https://www.mercadolibre.com.ar/tricycle-and-wagon-set-john-deere-for-kids-18-months/p/MLA2064510072#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1561940567&sid=search) | $460.139 | 15.0% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1503208905&sid=search) | $332.996 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1949971056&sid=search) | $323.265 | -19.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 12. Aditivo Mejorador de Combustible John Deere

- ID Venturino: `318861703`
- Precio Venturino: $172.000
- Tokens: aditivo, mejorador, combustible
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3851
- Candidatos excluidos por score: 1111
- Mediana ML: $199.941
- Venturino vs mediana ML: -14.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 59 | [Acondicionador/mejorador De Combustible John Deere 4 Litros](https://www.mercadolibre.com.ar/acondicionadormejorador-de-combustible-john-deere-4-litros/up/MLAU140712956#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&float_highlight=last_units&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA1103773195&sid=search) | $199.941 | 16.2% | tipo: ADITIVO; tokens comunes: mejorador, combustible; compatibilidad/marca: John Deere |

### 13. Tractor Johnny para armar John Deere

- ID Venturino: `281259378`
- Precio Venturino: $42.000
- Tokens: tractor, johnny, armar
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 7
- Candidatos usados: 14 de 14 válidos antes de top
- Candidatos excluidos por precio: 3980
- Candidatos excluidos por score: 969
- Mediana ML: $39.878
- Venturino vs mediana ML: 5.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 52 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1639819361&sid=search) | $33.275 | -20.8% | tipo: JUGUETE; tokens comunes: tractor, armar |
| 2 | media | 51 | [Tractor De Juguete John Deere Erlt](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-erlt/up/MLAU3327338120#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2202515476&sid=search) | $29.980 | -28.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1606696085&sid=search) | $50.000 | 19.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguete Tractor Tipo Caricatura John Deere Ertl](https://www.mercadolibre.com.ar/juguete-tractor-tipo-caricatura-john-deere-ertl/up/MLAU262732766#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1476364034&sid=search) | $28.990 | -31.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | 31.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf&wid=MLA3370300548&sid=search) | $48.540 | 15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | 31.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&float_highlight=last_units&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1588571170&sid=search) | $39.775 | -5.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1508081573&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1508168125&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1784433071&sid=search) | $32.990 | -21.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25&wid=MLA2792533012&sid=search) | $52.000 | 23.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Pedal En X Inverso Con Almohadilla De Goma Para John Deere 4](https://www.mercadolibre.com.ar/pedal-en-x-inverso-con-almohadilla-de-goma-para-john-deere-4/up/MLAU4068558355#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA3448674046&sid=search) | $56.109 | 33.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 35 | [Trailer A Escala Acoplado Jaula Siku Aleman](https://www.mercadolibre.com.ar/trailer-a-escala-acoplado-jaula-siku-aleman/up/MLAU3633336756#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2600993544&sid=search) | $39.980 | -4.8% | tipo: JUGUETE |

### 14. Seccion de corte, cuchilla de draper John Deere

- ID Venturino: `318735588`
- Precio Venturino: $9.300
- Tokens: seccion, corte, cuchilla, draper
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4526
- Candidatos excluidos por score: 437
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 15. Correa Draper Lateral. John Deere

- ID Venturino: `318858089`
- Precio Venturino: $7.178.672
- Tokens: correa, draper, lateral
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4942
- Candidatos excluidos por score: 21
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 16. Aceite Hidráulico Hy‑Gard 20 Lts. John Deere

- ID Venturino: `318712612`
- Precio Venturino: $189.000
- Tokens: aceite, hidraulico, hy-gard, 20, l
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3915
- Candidatos excluidos por score: 1047
- Mediana ML: $259.871
- Venturino vs mediana ML: -27.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 61 | [Aceite Hidráulico Ajm69444 Hy-gard 20lt](https://www.mercadolibre.com.ar/aceite-hidraulico-ajm69444-hygard-20lt/up/MLAU240497586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&float_highlight=last_units&tracking_id=a5b0d90d-9ee7-41f1-90ce-3ee1b159eec0&wid=MLA1369333397&sid=search) | $259.871 | 37.5% | tipo: ACEITE; tokens comunes: aceite, hidraulico, hy-gard |

### 17. Anticongelante Cool‑Gard. John Deere 10LTS

- ID Venturino: `318854338`
- Precio Venturino: $97.000
- Tokens: anticongelante, cool-gard, 10lt
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3610
- Candidatos excluidos por score: 1353
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 18. Bandeja magnetica John Deere rectangular.

- ID Venturino: `276681821`
- Precio Venturino: $32.000
- Tokens: bandeja, magnetica, rectangular
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3998
- Candidatos excluidos por score: 965
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 19. Batería John Deere StrongBox™ 12 V 150 Ah. John Deere

- ID Venturino: `318736277`
- Precio Venturino: $759.000
- Tokens: bateria, strongbox, 12, v, 150, ah
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4598
- Candidatos excluidos por score: 365
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 20. Boina bordada John Deere

- ID Venturino: `340209960`
- Precio Venturino: $35.000
- Tokens: boina, bordada
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3991
- Candidatos excluidos por score: 972
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 21. Bolso Duomo Bag John Deere

- ID Venturino: `276130213`
- Precio Venturino: $110.000
- Tokens: bolso, duomo, bag
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 1 válidos antes de top
- Candidatos excluidos por precio: 3583
- Candidatos excluidos por score: 1379
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 22. Botella Atuel Blanca John Deere

- ID Venturino: `276163111`
- Precio Venturino: $56.000
- Tokens: botella, atuel, blanca
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3875
- Candidatos excluidos por score: 1086
- Mediana ML: $63.327
- Venturino vs mediana ML: -11.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=41&type=item&tracking_id=c1c52b91-1418-4910-a516-281cf52995f6) | $56.262 | 0.5% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&wid=MLA1483080394&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $70.391 | 25.7% | tipo: BOTELLA; tokens comunes: botella |

### 23. Botella Hydro 750ML John Deere

- ID Venturino: `338229330`
- Precio Venturino: $45.000
- Tokens: botella, hydro, 750ml
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3943
- Candidatos excluidos por score: 1019
- Mediana ML: $56.262
- Venturino vs mediana ML: -20.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=41&type=item&tracking_id=c1c52b91-1418-4910-a516-281cf52995f6) | $56.262 | 25.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 24. Botella Kun blanca John Deere

- ID Venturino: `276163980`
- Precio Venturino: $58.000
- Tokens: botella, kun, blanca
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3898
- Candidatos excluidos por score: 1063
- Mediana ML: $63.327
- Venturino vs mediana ML: -8.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=41&type=item&tracking_id=c1c52b91-1418-4910-a516-281cf52995f6) | $56.262 | -3.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&wid=MLA1483080394&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $70.391 | 21.4% | tipo: BOTELLA; tokens comunes: botella |

### 25. Botella Kun negra John Deere

- ID Venturino: `276163436`
- Precio Venturino: $58.000
- Tokens: botella, kun, negra
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3898
- Candidatos excluidos por score: 1063
- Mediana ML: $63.327
- Venturino vs mediana ML: -8.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=41&type=item&tracking_id=c1c52b91-1418-4910-a516-281cf52995f6) | $56.262 | -3.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&wid=MLA1483080394&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $70.391 | 21.4% | tipo: BOTELLA; tokens comunes: botella |

### 26. Botella termica Olympia John Deere

- ID Venturino: `276164231`
- Precio Venturino: $68.000
- Tokens: botella, termica, olympia
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3782
- Candidatos excluidos por score: 1179
- Mediana ML: $63.327
- Venturino vs mediana ML: 7.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=41&type=item&tracking_id=c1c52b91-1418-4910-a516-281cf52995f6) | $56.262 | -17.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&wid=MLA1483080394&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $70.391 | 3.5% | tipo: BOTELLA; tokens comunes: botella |

### 27. Caja de herramientas John Deere de acero

- ID Venturino: `276171332`
- Precio Venturino: $140.000
- Tokens: caja, herramienta, acero
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3645
- Candidatos excluidos por score: 1317
- Mediana ML: $87.226
- Venturino vs mediana ML: 60.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 59 | [Caja De Herramientas De Lujo John Deere De 18 Piezas,...](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2033573986#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1978680112&sid=search) | $87.226 | -37.7% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |

### 28. Caja de herramientas John Deere verde con bandeja amarilla

- ID Venturino: `276169417`
- Precio Venturino: $183.000
- Tokens: caja, herramienta, verde, bandeja, amarilla
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3897
- Candidatos excluidos por score: 1066
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 29. Camión Volcador John Deere Big Scoop Dump Truck

- ID Venturino: `281259393`
- Precio Venturino: $130.000
- Tokens: camion, volcador, big, scoop, dump, truck
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 16
- Candidatos usados: 20 de 166 válidos antes de top
- Candidatos excluidos por precio: 3595
- Candidatos excluidos por score: 1202
- Mediana ML: $130.197
- Venturino vs mediana ML: -0.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 72 | [Dump Truck Toy John Deere Big Scoop Con Basculante Inclinabl](https://www.mercadolibre.com.ar/dump-truck-toy-john-deere-big-scoop-w-tilting-dump-bed/p/MLA2040201571#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1515118911&sid=search) | $152.423 | 17.2% | tipo: JUGUETE; tokens comunes: big, scoop, dump, truck; compatibilidad/marca: John Deere |
| 2 | alta | 72 | [Camión Volcador De Juguete John Deere Big Scoop Con Caja Vol](https://articulo.mercadolibre.com.ar/MLA-1832146793-camion-volcador-de-juguete-john-deere-big-scoop-con-caja-vol-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $152.776 | 17.5% | tipo: JUGUETE; tokens comunes: camion, volcador, big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 64 | [Camión Volquete De Juguete John Deere Big Scoop Para Arena,](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-big-scoop-sandbox-w-loader-3-yea/p/MLA2083629309#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3419509720&sid=search) | $145.607 | 12.0% | tipo: JUGUETE; tokens comunes: camion, big, scoop; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Camión Volcador Armable Build-a-buddy John Deere Con Taladro](https://www.mercadolibre.com.ar/toy-dump-truck-build-a-buddy-john-deere-w-toy-drill-yellow/p/MLA2084647171#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3451417524&sid=search) | $120.691 | -7.2% | tipo: JUGUETE; tokens comunes: camion, volcador; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/tomy-john-deere-sandbox-big-scoop-excavadora-de-juguete-con/up/MLAU4031048978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3384748312&sid=search) | $126.203 | -2.9% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Excavadora Juguete Tomy John Deere Big Scoop 38cm Plastico](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3051332026&sid=search) | $110.759 | -14.8% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 7 | media | 55 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1556138081&sid=search) | $108.165 | -16.8% | tipo: JUGUETE; tokens comunes: dump, truck; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2170188784&sid=search) | $117.176 | -9.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1655717113&sid=search) | $156.368 | 20.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3339182498&sid=search) | $91.770 | -29.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=23&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $109.992 | -15.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2142512128&sid=search) | $161.296 | 24.1% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Réplica De Camión Semirremolque Grain Escala 1:64 John Deere](https://articulo.mercadolibre.com.ar/MLA-2535939168-replica-de-camion-semirremolque-grain-escala-164-john-deere-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f) | $97.204 | -25.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Ertl John Deere Grain Semi Truck Toy Replica Escala 1:64 De](https://www.mercadolibre.com.ar/ertl-john-deere-grain-semi-truck-toy-replica-164-scale/p/MLA2063214672#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2587960862&sid=search) | $94.794 | -27.1% | tipo: JUGUETE; tokens comunes: truck; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Camión Volquete Y Cargador Frontal De Juguete John Deere, 18](https://www.mercadolibre.com.ar/equipo-de-excavacion-motorizado-john-deere-18-camion-de-2-1/p/MLA2052053468#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2539331628&sid=search) | $177.261 | 36.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1462714353&sid=search) | $180.998 | 39.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | baja | 42 | [Set De Juguetes, Tractores, Camiones Tomy, 20 Pzs, De Granja](https://www.mercadolibre.com.ar/toy-set-john-deere-tractor-and-truck-w-20-farm-toys-5-year/p/MLA2040633234#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA3254753964&sid=search) | $141.600 | 8.9% | tipo: JUGUETE; tokens comunes: camion |
| 18 | baja | 41 | [Rompecabezas Gigante Tomy John Deere, 36 Unidades, Multicolo](https://articulo.mercadolibre.com.ar/MLA-1557187315-rompecabezas-gigante-tomy-john-deere-36-unidades-multicolo-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $129.994 | -0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [John Deere 8600 Spfh 1/64 Escala Con Cabezal De Maíz](https://www.mercadolibre.com.ar/john-deere-8600-spfh-164-escala-con-cabezal-de-maiz/up/MLAU3263326141#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1507784499&sid=search) | $130.399 | 0.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Juguete John Deere Ertl John Deere Green](https://www.mercadolibre.com.ar/john-deere-ertl-john-deere-verde/p/MLA2050551997#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1832439751&sid=search) | $130.516 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 30. Camión volquete Big Scoop John Deere

- ID Venturino: `281259433`
- Precio Venturino: $148.000
- Tokens: camion, volquete, big, scoop
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 19
- Candidatos usados: 20 de 163 válidos antes de top
- Candidatos excluidos por precio: 3696
- Candidatos excluidos por score: 1104
- Mediana ML: $133.902
- Venturino vs mediana ML: 10.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 78 | [Camión Volquete De Juguete John Deere Big Scoop Para Arena,](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-big-scoop-sandbox-w-loader-3-yea/p/MLA2083629309#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3419509720&sid=search) | $145.607 | -1.6% | tipo: JUGUETE; tokens comunes: camion, volquete, big, scoop; compatibilidad/marca: John Deere |
| 2 | media | 65 | [Camión Volcador De Juguete John Deere Big Scoop Con Caja Vol](https://articulo.mercadolibre.com.ar/MLA-1832146793-camion-volcador-de-juguete-john-deere-big-scoop-con-caja-vol-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $152.776 | 3.2% | tipo: JUGUETE; tokens comunes: camion, big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Dump Truck Toy John Deere Big Scoop Con Basculante Inclinabl](https://www.mercadolibre.com.ar/dump-truck-toy-john-deere-big-scoop-w-tilting-dump-bed/p/MLA2040201571#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1515118911&sid=search) | $152.423 | 3.0% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/tomy-john-deere-sandbox-big-scoop-excavadora-de-juguete-con/up/MLAU4031048978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3384748312&sid=search) | $126.203 | -14.7% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 5 | media | 57 | [Camión Volquete Y Cargador Frontal De Juguete John Deere, 18](https://www.mercadolibre.com.ar/equipo-de-excavacion-motorizado-john-deere-18-camion-de-2-1/p/MLA2052053468#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2539331628&sid=search) | $177.261 | 19.8% | tipo: JUGUETE; tokens comunes: camion, volquete; compatibilidad/marca: John Deere |
| 6 | media | 57 | [Excavadora Juguete Tomy John Deere Big Scoop 38cm Plastico](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3051332026&sid=search) | $110.759 | -25.2% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2170188784&sid=search) | $117.176 | -20.8% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Volquete De Juguete Build-a-buddy John Deere Con Taladro De](https://www.mercadolibre.com.ar/tools-toolsets-toys-games-build-a-buddy-47508-no-aplica-u/p/MLA2062346156#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2142707216&sid=search) | $110.652 | -25.2% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Volquete De Juguete John Deere Steel 16 Con Luces Y Sonidos](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-steel-16-w-lights-sounds-kids-3/p/MLA2078353280#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1729359979&sid=search) | $153.451 | 3.7% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1655717113&sid=search) | $156.368 | 5.7% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Camión Volcador Armable Build-a-buddy John Deere Con Taladro](https://www.mercadolibre.com.ar/toy-dump-truck-build-a-buddy-john-deere-w-toy-drill-yellow/p/MLA2084647171#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3451417524&sid=search) | $120.691 | -18.5% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=23&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $109.992 | -25.7% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Réplica De Camión Semirremolque Grain Escala 1:64 John Deere](https://articulo.mercadolibre.com.ar/MLA-2535939168-replica-de-camion-semirremolque-grain-escala-164-john-deere-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f) | $97.204 | -34.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Escala John Deere 320e Skid Steer Con Camión](https://www.mercadolibre.com.ar/john-deere-scale-320e-skid-steer-con-camion/p/MLA2069344031#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2370117548&sid=search) | $201.992 | 36.5% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Juego De Juguetes Sandbox Tomy John Deere Con Volquete, Bald](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062901642#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3450982316&sid=search) | $93.781 | -36.6% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3339182498&sid=search) | $91.770 | -38.0% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2362783516&sid=search) | $91.002 | -38.5% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2142512128&sid=search) | $161.296 | 9.0% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1462714353&sid=search) | $180.998 | 22.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 20 | baja | 42 | [Set De Juguetes, Tractores, Camiones Tomy, 20 Pzs, De Granja](https://www.mercadolibre.com.ar/toy-set-john-deere-tractor-and-truck-w-20-farm-toys-5-year/p/MLA2040633234#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA3254753964&sid=search) | $141.600 | -4.3% | tipo: JUGUETE; tokens comunes: camion |

### 31. Camioneta y tractor John Deere

- ID Venturino: `281234460`
- Precio Venturino: $300.000
- Tokens: camioneta, tractor
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 141 válidos antes de top
- Candidatos excluidos por precio: 4314
- Candidatos excluidos por score: 508
- Mediana ML: $271.678
- Venturino vs mediana ML: 10.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 52 | [Antiguo Tractor A Escala John Deere](https://www.mercadolibre.com.ar/antiguo-tractor-a-escala-john-deere/up/MLAU4067955603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1831356015&sid=search) | $189.800 | -36.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1514896991&sid=search) | $293.399 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1507969023&sid=search) | $288.367 | -3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete John Deere De Estilo Temprano A Escala 1/](https://articulo.mercadolibre.com.ar/MLA-3096031022-tractor-de-juguete-john-deere-de-estilo-temprano-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $273.114 | -9.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1784581058&sid=search) | $270.242 | -9.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1417510473&sid=search) | $332.793 | 10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1949945520&sid=search) | $265.905 | -11.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1571921115&sid=search) | $245.000 | -18.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=153bbf99-bb8a-4226-8b48-4c7b7301bb93&wid=MLA1585559315&sid=search) | $240.000 | -20.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor 1/64 John Deere 8400 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8400--a-pedidoexkarg/up/MLAU2670938419#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1949431358&sid=search) | $238.267 | -20.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA2138660238&sid=search) | $230.189 | -23.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tomy John Deere Johnny Tractor Ride En Juguete Juguete De De](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2182318240&sid=search) | $221.273 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1767841826&sid=search) | $398.326 | 32.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1534604385&sid=search) | $399.880 | 33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor John Deere 630 1:16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-630-116-coleccion-prestige/up/MLAU4082684090#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1831321295&sid=search) | $401.099 | 33.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1950555252&sid=search) | $198.353 | -33.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA2194899840&sid=search) | $187.899 | -37.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1782656432&sid=search) | $291.302 | -2.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1763349785&sid=search) | $284.352 | -5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tomy Tractor John Deere 5125r 1/16 Con Cargadora Juego Imagi](https://www.mercadolibre.com.ar/tomy-116-john-deere-5125r-with-loader-imaginative-play-for/p/MLA2069005575#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1687173703&sid=search) | $284.275 | -5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 32. Cargador de tierra John Deere

- ID Venturino: `281259415`
- Precio Venturino: $3.568.000
- Tokens: cargador, tierra
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 2 válidos antes de top
- Candidatos excluidos por precio: 4911
- Candidatos excluidos por score: 50
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 33. Cincel plano John Deere de corte en frío 10mm

- ID Venturino: `276196688`
- Precio Venturino: $17.000
- Tokens: cincel, plano, corte, frio, 10mm
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4204
- Candidatos excluidos por score: 759
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 34. Cincel plano John Deere de corte en frío 16mm

- ID Venturino: `276196690`
- Precio Venturino: $29.000
- Tokens: cincel, plano, corte, frio, 16mm
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4049
- Candidatos excluidos por score: 914
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 35. Cincel plano John Deere de corte en frío 22mm

- ID Venturino: `276196685`
- Precio Venturino: $15.000
- Tokens: cincel, plano, corte, frio, 22mm
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4287
- Candidatos excluidos por score: 676
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 36. Correa Lateral Side Draper Belting John Deere

- ID Venturino: `318859881`
- Precio Venturino: $4.264.000
- Tokens: correa, lateral, side, draper, belting
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4924
- Candidatos excluidos por score: 39
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 37. Cortadora de Césped Honda HRG466SKEP – 4.2 HP

- ID Venturino: `332868795`
- Precio Venturino: $1.866.924
- Tokens: cortadora, cesped, honda, hrg466skep, 4.2, hp, hrg466
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 8
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 4864
- Candidatos excluidos por score: 91
- Mediana ML: $1.947.500
- Venturino vs mediana ML: -4.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 134 | [Cortadora De Césped Honda Hrg466c1 - Pkeh 4,2 Hp](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466c1--pkeh-42-hp/up/MLAU3902334219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA3205391632&sid=search) | $1.599.000 | -14.4% | tipo: CORTADORA; tokens técnicos: 4.2, hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, 4.2, hp, hrg466 |
| 2 | alta | 111 | [Cortadora De Césped Honda Hrg466c1 4.5 Hp Potente](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=3eAsH04ghTbhvMT1FWlo3ofKhjk52MEnNv6W2IjmwzvC6CREaRKZc%2FOSmjk8zfPGcuGJGcPF6O1rC6NdqrYuaEWb1jLe%2FjpQsDD%2FFfqR8HduHMZvvUYAXEXnKLhRAbl46CNtAadzfUov0Xzb%2F%2B6yRrz%2FV3Do%2F3nipkBVAgwlO3TIf1DKNXuM18oa6IrBJVamHYVueTu8wpJ6EJPT%2BE5PUtxyj5Yzcs8xuaV9%2F5xDq8o%2BAEFxhF3e39%2FZRWMlWLNfQZSd24NrNj4U1VRtjhzkERm%2BxQ2vYzOnXJNj2tHvO7vZ7EEJ%2Blw2M8P8OruxS6A4UBofZ%2FlkQHExqUl3mpbAKyG0RqzI2InPNmqzTIm88uUXtVm2fh9MCBDT7nIdDKsipFGCjfhpLhbX9hCZ5YpsQMYIUBEhp%2FpED1JWhsQAMG4%2Bmt7mQa1BZdfzoBBs74qvw6HDpOZOZHaFTbECzMf7WpViAGsrrmvcCChG6Afr23uWdSQI8VftQnSnt5Ft9uM%2FUsSXDrHSbURIjPjzGyFCWObTugaV12u%2Fyf2c89lOaeF2gw9Kk4%2Fyax6O%2FekallinPwGXZ3GhXQdBCVldM46YTfxW16V3pKIJIDvEJQwjsUS4gyr0PMtF%2FC3H%2BeUVA%2F%2BC8TiHfGXBIW77a1VliqGPhrSb20vnbGOH48LmT5CpW5A2LsLCBbnXUuDsFILLDu2Wbd%2Fr2vsTMXPM%2BTR9HOUPh%2B4QAmU0S%2BrjoZxu48EQwU83EkUJ7BPYN0kLM%2FyhHy0oOl852hKn40eHj38AphWcQOiA26%2B62hjeym2HiaRrgpw1Dfb8AEaFWazU1UfLln%2BBIlAmOcocoewy0vJ%2BF%2B%2BMJvW3UL8bd1RgMgpc%2FTQ33lzQcr%2BE2jVo9VaCN76%2BVYXJ9jS6BIZiux0rD3OEvM%2F5w0qomILAR6QCiesrCfPT1F7wByE8Am1x%2F9M%2BTNO06QmcTyyzi1LQ2Z4enccvBUiP&pdp_filters=item_id%3AMLA2753066492#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3715316844&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA2753066492&sid=search) | $1.900.000 | 1.8% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hp, hrg466 |
| 3 | alta | 104 | [Cortadora De Césped Honda Hrg466c1-skep Autopropulsada](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466c1skep-autopropulsada/up/MLAU3168023434#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA1495788577&sid=search) | $2.297.275 | 23.1% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 4 | alta | 103 | [Cortadora De Cesped Empuje Honda Hrg466 Pkeh Con Bolsa](https://www.mercadolibre.com.ar/cortadora-de-cesped-empuje-honda-hrg466-pkeh-con-bolsa/up/MLAU3646755144#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA2616713048&sid=search) | $2.257.200 | 20.9% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 5 | alta | 102 | [Cortadora Honda Hrg466c1 4.5 Hp Autopropulsada Skep](https://www.mercadolibre.com.ar/cortadora-honda-hrg466c1-45-hp-autopropulsada-skep/up/MLAU2956799261#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA1995798192&sid=search) | $1.841.500 | -1.4% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hp, hrg466 |
| 6 | alta | 102 | [Cortadora De Cesped Honda Hrg466 Skep Color Gris Oscuro](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466-skep-color-gris-oscuro/p/MLA44825464#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA1654450531&sid=search) | $2.250.000 | 20.5% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 7 | alta | 101 | [Cortacesped Autoprop Honda Hrg466 Skep 4.5 Hp 46cm Motostore](https://www.mercadolibre.com.ar/cortacesped-autoprop-honda-hrg466-skep-45-hp-46cm-motostore/up/MLAU2872825821#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA1969025994&sid=search) | $1.995.000 | 6.9% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hp, hrg466 |
| 8 | alta | 100 | [Cortadora De Cesped Honda Hrg466c1 Skep 4.2hp Autopropulsada Color Gris Oscuro](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466c1-skep-42hp-autopropulsada-color-gris-oscuro/p/MLA57775744#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA3383003158&sid=search) | $1.810.500 | -3.0% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |

### 38. Cortadora de Césped Honda HRX476VYEH – 4.8 HP

- ID Venturino: `332865987`
- Precio Venturino: $3.281.116
- Tokens: cortadora, cesped, honda, hrx476vyeh, 4.8, hp, hrx476
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 3
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 4905
- Candidatos excluidos por score: 55
- Mediana ML: $3.880.726
- Venturino vs mediana ML: -15.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 104 | [Cortadora De Cesped Honda Hrx476c2 Autopropulsada](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrx476c2-autopropulsada/up/MLAU3167975844#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA1495575311&sid=search) | $4.112.864 | 25.3% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, cesped, honda, hrx476 |
| 2 | alta | 95 | [Cortacesped Honda Hrx476 Con Embrague Autoprop Color Rojo](https://www.mercadolibre.com.ar/cortacesped-honda-hrx476-con-embrague-autoprop-color-rojo/p/MLA47205810#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA1562771909&sid=search) | $2.843.160 | -13.3% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, honda, hrx476 |
| 3 | alta | 94 | [Cortacesped Honda Hrx476c2 Con Embrague Autoprop Color Rojo](https://www.mercadolibre.com.ar/cortacesped-honda-hrx476c2-con-embrague-autoprop-color-rojo/up/MLAU3294443954#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=8b7b5a43-97b7-41b1-8af7-f1d2a4542260&wid=MLA2174350398&sid=search) | $3.880.726 | 18.3% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, honda, hrx476 |

### 39. Cosechadora con Duals John Deere X9 1100

- ID Venturino: `281259430`
- Precio Venturino: $258.000
- Tokens: cosechadora, dual, x9, 1100
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 13
- Candidatos usados: 20 de 147 válidos antes de top
- Candidatos excluidos por precio: 4204
- Candidatos excluidos por score: 612
- Mediana ML: $259.623
- Venturino vs mediana ML: -0.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 93 | [Cosechadora miniatura John Deere X9 1100 1/64 Ertl](https://www.mercadolibre.com.ar/cosechadora-miniatura-john-deere-x9-1100-164-ertl/p/MLA21742050#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=a5b0d90d-9ee7-41f1-90ce-3ee1b159eec0&wid=MLA2806898370&sid=search) | $250.000 | -3.1% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 2 | alta | 92 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1911294048&sid=search) | $265.120 | 2.8% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 3 | alta | 70 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1447751815&sid=search) | $263.348 | 2.1% | tipo: JUGUETE; tokens técnicos: x9; tokens comunes: cosechadora, x9; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Cosechadora Juguete Caña John Deere 2023 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-cana-john-deere-2023--a-pedidoexkarg/up/MLAU345520548#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1716821474&sid=search) | $264.878 | 2.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Cosechadora Ertl John Deere 1:64 7720 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-john-deere-164-7720--a-pedidoexkarg/up/MLAU3622286639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA2597394962&sid=search) | $220.880 | -14.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Cosechadora De Algodón John Deere Cp770, 1/64 Verde](https://www.mercadolibre.com.ar/cosechadora-de-algodon-john-deere-cp770-164-verde/p/MLA64944786#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA3117505332&sid=search) | $215.000 | -16.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Cosechadora 1/64 John Deere Model S7 900_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-model-s7-900exkarg/up/MLAU3421966953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA2363760294&sid=search) | $303.550 | 17.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Cosechadora 1/64 John Deere S680 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s680--a-pedidoexkarg/up/MLAU3211473392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA2095857690&sid=search) | $305.134 | 18.3% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Cosechadora 1/64 John Deere S780 Tracked - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s780-tracked--a-pedidoexkarg/up/MLAU3211445872#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA2095728162&sid=search) | $317.339 | 23.0% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1655717113&sid=search) | $156.368 | -39.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Siku John Deere 670 Cosechadora Línea Pesada Metal Escala 1:87 Verde](https://www.mercadolibre.com.ar/siku-john-deere-670-cosechadora-linea-pesada-metal-escala-187-verde/p/MLA28466993#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1579003794&sid=search) | $264.249 | 2.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Cosechadora miniatura John Deere S680 Prestige 1/64, color verde](https://www.mercadolibre.com.ar/cosechadora-miniatura-john-deere-s680-prestige-164-color-verde/p/MLA61519873#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=a5b0d90d-9ee7-41f1-90ce-3ee1b159eec0&wid=MLA2579058396&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Cosechadora miniatura de granos y maíz verde John Deere S780 1:64](https://www.mercadolibre.com.ar/cosechadora-miniatura-de-granos-y-maiz-verde-john-deere-s780-164/p/MLA54400721#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&float_highlight=last_unit&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f&wid=MLA2579195550&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1141825591&sid=search) | $258.952 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1584365843&sid=search) | $258.990 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1583656447&sid=search) | $259.000 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1950447406&sid=search) | $260.245 | 0.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1782744664&sid=search) | $255.079 | -1.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Maqueta John Deere 843l-ii 1:50 Colección Prestige](https://www.mercadolibre.com.ar/maqueta-john-deere-843lii-150-coleccion-prestige/up/MLAU3876133382#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3117350930&sid=search) | $262.099 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Réplica John Deere Pala Trituradora 1:50 Colección](https://www.mercadolibre.com.ar/replica-john-deere-pala-trituradora-150-coleccion/up/MLAU3876131784#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1725969655&sid=search) | $262.099 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 40. Cosechadora con orugas S780 John Deere

- ID Venturino: `281222483`
- Precio Venturino: $1.100.000
- Tokens: cosechadora, oruga, s780
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 18 de 18 válidos antes de top
- Candidatos excluidos por precio: 4712
- Candidatos excluidos por score: 233
- Mediana ML: $855.223
- Venturino vs mediana ML: 28.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-ertl-116-s690--a-pedidoexkarg/up/MLAU3405181522#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA2316244096&sid=search) | $1.366.734 | 24.2% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Cosechadora Bruder John Deere T670i 1/16 Escala Detalle](https://www.mercadolibre.com.ar/cosechadora-bruder-john-deere-t670i-116-escala-detalle/up/MLAU3709741640#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA2735955818&sid=search) | $801.919 | -27.1% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tractor De Coleccion John Deere Ertl 8rx - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-ertl-8rx--a-pedidoexkarg/up/MLAU148472123#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1139042452&sid=search) | $1.146.516 | 4.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Tractor 2024 Ertl 1:16 John Deere 8850 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2024-ertl-116-john-deere-8850--a-pedidoexkarg/up/MLAU3512484909#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1566725471&sid=search) | $1.190.050 | 8.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Lego 42157 Technic Skidder John Deere Bunny Toys](https://www.mercadolibre.com.ar/lego-42157-technic-skidder-john-deere-bunny-toys/up/MLAU127418845#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA1422484952&sid=search) | $1.199.999 | 9.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tractor Ertl 1/16 John Deere 4440 High Cro - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-116-john-deere-4440-high-cro--a-pedidoexkarg/up/MLAU232697105#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1370428787&sid=search) | $956.901 | -13.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor John Deere Ertl 1/16 620 With 555 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-620-with-555--a-pedidoexkarg/up/MLAU3404496394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1519688549&sid=search) | $922.938 | -16.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tractor Ertl John Deere 1/16 Precision Waterloo - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-116-precision-waterloo--a-pedido/up/MLAU3913388889#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1762009919&sid=search) | $900.020 | -18.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor De Juguete John Deere 1/16 Colección Prestigio](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-116-coleccion-prestigio/up/MLAU3887620554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1734903333&sid=search) | $895.299 | -18.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Botas Men's Skechers X John Deere Wtrpf Rowood - A Pedido](https://www.mercadolibre.com.ar/botas-mens-skechers-x-john-deere-wtrpf-rowood--a-pedido/up/MLAU4009919970#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=285c9b27-2987-43a9-8a3d-f43bd849f947&wid=MLA1802307541&sid=search) | $804.950 | -26.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Plantadora De Juguete John Deere 1:64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-164--a-pedidoexkarg/up/MLAU216527677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1138239021&sid=search) | $768.366 | -30.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Tractor John Deere Ertl 1/16 9r 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-9r-640--a-pedidoexkarg/up/MLAU3056769388#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1480847539&sid=search) | $1.448.971 | 31.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1422054560&sid=search) | $733.573 | -33.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Plantadora De Juguete John Deere 48 Filas - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-48-filas--a-pedidoexkarg/up/MLAU151239803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1146832296&sid=search) | $705.810 | -35.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 35 | [Tractor De Juguete Con Carro Cerealero Verde Y Amarillo](https://www.mercadolibre.com.ar/tractor-de-juguete-con-carro-cerealero-verde-y-amarillo/up/MLAU3636789908#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA2604933544&sid=search) | $815.147 | -25.9% | tipo: JUGUETE |
| 16 | baja | 35 | [Juguetes Construcción Granja Multicolor Con Camión Y Acces](https://www.mercadolibre.com.ar/juguetes-construccion-granja-multicolor-con-camion-y-acces/up/MLAU3629077389#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA2605911516&sid=search) | $682.026 | -38.0% | tipo: JUGUETE |
| 17 | baja | 31 | [Tractor De Juguete Siku John Deere 8r 410 Con Neumáticos Dob](https://www.mercadolibre.com.ar/tractor-de-juguete-siku-john-deere-8r-410-con-neumaticos-dob/up/MLAU3882673156#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1731095139&sid=search) | $789.999 | -28.2% | tipo: JUGUETE; penalización tipo adicional candidato: NEUMATICO; compatibilidad/marca: John Deere |
| 18 | baja | 31 | [Pulverizador Autopropulsado Tomy Big Farm John Deere R4023 -](https://www.mercadolibre.com.ar/pulverizador-autopropulsado-tomy-big-farm-john-deere-r4023-/up/MLAU3556795787#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1582423667&sid=search) | $684.999 | -37.7% | tipo: JUGUETE; penalización tipo adicional candidato: MOCHILA; compatibilidad/marca: John Deere |

### 41. Cuchillo de mano John Dere

- ID Venturino: `276681820`
- Precio Venturino: $34.000
- Tokens: cuchillo, mano, dere
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4005
- Candidatos excluidos por score: 958
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 42. Filtro de Combustible. John Deere

- ID Venturino: `318860737`
- Precio Venturino: $267.000
- Tokens: filtro, combustible
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 20 de 27 válidos antes de top
- Candidatos excluidos por precio: 4239
- Candidatos excluidos por score: 697
- Mediana ML: $208.286
- Venturino vs mediana ML: 28.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 68 | [Filtro De Combustible John Deere Re541922](https://www.mercadolibre.com.ar/filtro-de-combustible-john-deere-re541922/up/MLAU216458098#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=d8c9e483-9ec0-4011-9e5f-be34a5ff58d2&wid=MLA1131562648&sid=search) | $191.493 | -28.3% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 2 | baja | 68 | [Filtro De Combustible Re500186 John Deere](https://www.mercadolibre.com.ar/filtro-de-combustible-re500186--john-deere/up/MLAU154598443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=1f49cc16-6fe0-4136-8089-ee18d44f0f54&wid=MLA1223890867&sid=search) | $171.496 | -35.8% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere 9570](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-9570/up/MLAU2030480381#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=d8c9e483-9ec0-4011-9e5f-be34a5ff58d2&wid=MLA1453989409&sid=search) | $285.000 | 6.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 4 | baja | 61 | [Filtro Combustible Donaldson Equivalente John Deere At365870](https://www.mercadolibre.com.ar/filtro-combustible-donaldson-equivalente-john-deere-at365870/up/MLAU285295780#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=e05173de-c3f8-4d3f-bb47-0beb0a5b3824&wid=MLA815422587&sid=search) | $201.600 | -24.5% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 5 | baja | 59 | [Filtro Combustible Donaldson P576918 Eqv. John Deere Re60021](https://www.mercadolibre.com.ar/filtro-combustible-donaldson-p576918-eqv-john-deere-re60021/up/MLAU250437733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=613bb84b-f3c3-452c-a870-9b499b1ea365&wid=MLA1124362080&sid=search) | $201.000 | -24.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 6 | baja | 59 | [Filtro Combustible John Deere Re522878 Equiv. Mann Wk8162](https://www.mercadolibre.com.ar/filtro-combustible-john-deere-re522878-equiv-mann-wk8162/up/MLAU229351103#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=e4696740-c8ca-4b74-97db-8b2771e4aca0&wid=MLA882224392&sid=search) | $180.000 | -32.6% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 7 | baja | 59 | [Filtro Combustible Mann Wk8187 John Deere Eq Re541922](https://www.mercadolibre.com.ar/filtro-combustible-mann-wk8187-john-deere-eq-re541922/up/MLAU3801833597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=73e9bd32-a771-4ccc-b7b9-9591b85fc3b4&wid=MLA2898605838&sid=search) | $163.500 | -38.8% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 8 | baja | 58 | [Filtro De Combustible John Deere Am876411 X495 X595 415 455](https://articulo.mercadolibre.com.ar/MLA-1817725113-filtro-de-combustible-john-deere-am876411-x495-x595-415-455-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=item&tracking_id=970839da-c917-4d0c-a406-30afda7d4770) | $254.401 | -4.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 9 | baja | 52 | [Filtro Hidraulico John Deere At335492](https://www.mercadolibre.com.ar/filtro-hidraulico-john-deere-at335492/up/MLAU3924339920#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=970839da-c917-4d0c-a406-30afda7d4770&wid=MLA1761887079&sid=search) | $220.000 | -17.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 10 | baja | 51 | [Repuesto John Deere Tractor Accesorio Filtro](https://www.mercadolibre.com.ar/repuesto-john-deere-tractor-accesorio-filtro/up/MLAU309943856#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=411b7fe9-0526-4cee-9ddc-ededc7dfdf53&wid=MLA921993694&sid=search) | $180.000 | -32.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 11 | baja | 50 | [Filtro Hidráulico Donaldson P574617 Eq. John Deere At308274](https://www.mercadolibre.com.ar/filtro-hidraulico-donaldson-p574617-eq-john-deere-at308274/up/MLAU309430473#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=613bb84b-f3c3-452c-a870-9b499b1ea365&wid=MLA926567545&sid=search) | $278.900 | 4.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 12 | baja | 50 | [Kit De Filtros John Deere Lg249 Home Maintenance Oem](https://articulo.mercadolibre.com.ar/MLA-3281755084-kit-de-filtros-john-deere-lg249-home-maintenance-oem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=item&tracking_id=411b7fe9-0526-4cee-9ddc-ededc7dfdf53) | $240.171 | -10.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 13 | baja | 50 | [Filtro Aire John Deere 9570 9670 9770 9870](https://www.mercadolibre.com.ar/filtro-aire-john-deere-9570-9670-9770-9870/up/MLAU3886744562#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=73e9bd32-a771-4ccc-b7b9-9591b85fc3b4&wid=MLA1734058763&sid=search) | $237.793 | -10.9% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 14 | baja | 50 | [Filtro De Aire Compatible Con John Deere Komatsu Cat](https://www.mercadolibre.com.ar/filtro-de-aire-compatible-con-john-deere-komatsu-cat/up/MLAU4038685394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=bd12d03c-be98-4edd-8d86-067dd8f4b0e6&wid=MLA1810324197&sid=search) | $222.076 | -16.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 15 | baja | 50 | [Filtro Hidraulico Para John Deere Retroexcavadora 210c/310c](https://www.mercadolibre.com.ar/filtro-hidraulico-para-john-deere-retroexcavadora-210c310c/up/MLAU2933303240#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=7c4b4c2d-771f-4b6a-adc8-d78211943afa&wid=MLA1470255973&sid=search) | $213.932 | -19.9% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 16 | baja | 50 | [Filtro Aire Para John Deere 5090e Al119839 Al172780 Cp33300](https://www.mercadolibre.com.ar/filtro-aire-para-john-deere-5090e-al119839-al172780-cp33300/up/MLAU2901850439#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=a8ddbe8a-74b5-49e5-b989-9761a2af1987&wid=MLA1467193781&sid=search) | $202.640 | -24.1% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 17 | baja | 50 | [Filtro Aire Mann C19450 John Deere Linde](https://www.mercadolibre.com.ar/filtro-aire-mann-c19450-john-deere-linde/up/MLAU259983411#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=d350957f-a899-4d72-89f7-f8f90add3f7f&wid=MLA685759359&sid=search) | $197.500 | -26.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 18 | baja | 50 | [Filtro Hidráulico Donaldson P574055 Eq. John Deere At367840](https://www.mercadolibre.com.ar/filtro-hidraulico-donaldson-p574055-eq-john-deere-at367840/up/MLAU310616568#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=e4696740-c8ca-4b74-97db-8b2771e4aca0&wid=MLA926569670&sid=search) | $345.500 | 29.4% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 19 | baja | 50 | [Filtro Aire John Deere 9570 / 9670 / 9770 / 9870](https://www.mercadolibre.com.ar/filtro-aire-john-deere-9570--9670--9770--9870/up/MLAU291692726#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=3560371d-0392-4850-a74a-78e635ba7827&wid=MLA845377714&sid=search) | $351.819 | 31.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 20 | baja | 50 | [Filtro Aire Primario Para John Deere Linde New Holland](https://www.mercadolibre.com.ar/filtro-aire-primario-para-john-deere-linde-new-holland/up/MLAU2956372295#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=a8ddbe8a-74b5-49e5-b989-9761a2af1987&wid=MLA1995599532&sid=search) | $172.138 | -35.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |

### 43. Generador Honda EZ6500CXS – 6.5 KVA

- ID Venturino: `332863753`
- Precio Venturino: $2.655.680
- Tokens: generador, honda, ez6500cx, 6.5, kva, ez6500
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 7
- Candidatos usados: 7 de 7 válidos antes de top
- Candidatos excluidos por precio: 4902
- Candidatos excluidos por score: 54
- Mediana ML: $2.890.000
- Venturino vs mediana ML: -8.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 148 | [Generador Honda Naftero De Alta Potencia 6.5 Kva Ez6500cx...](https://www.mercadolibre.com.ar/generador-honda-naftero-de-alta-potencia-65-kva-ez6500cx/up/MLAU3854830292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA3069032746&sid=search) | $3.373.930 | 27.0% | tipo: GENERADOR; tokens técnicos: ez6500cx, 6.5, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, 6.5, kva, ez6500 |
| 2 | alta | 124 | [Generador Honda Ez6500cxs](https://www.mercadolibre.com.ar/generador-honda-ez6500cxs/up/MLAU3491822335#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1559263375&sid=search) | $2.520.000 | -5.1% | tipo: GENERADOR; tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, ez6500 |
| 3 | alta | 124 | [Generador Honda EZ6500CXS](https://www.mercadolibre.com.ar/generador-honda-ez6500cxs/p/MLA26913717#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1505050374&sid=search) | $2.890.000 | 8.8% | tipo: GENERADOR; tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, ez6500 |
| 4 | alta | 118 | [Generador Honda Ez6500cxs Monofásico Avant Motos](https://www.mercadolibre.com.ar/generador-honda-ez-6500-cxs-monofasico-portatil-pf/p/MLA2066150340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1943873888&sid=search) | $3.285.000 | 23.7% | tipo: GENERADOR; tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, ez6500 |
| 5 | alta | 95 | [Generador Honda Ez 6500cxs - Pocas Horas De Uso](https://www.mercadolibre.com.ar/generador-honda-ez-6500cxs--pocas-horas-de-uso/up/MLAU3995003428#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1799165815&sid=search) | $2.350.000 | -11.5% | tipo: GENERADOR; tokens técnicos: ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500 |
| 6 | alta | 80 | [Grupo Electrógeno Honda Ez6500cxs Ra 5.5 Kva 220v Eléctrico](https://www.mercadolibre.com.ar/grupo-electrogeno-honda-ez6500cxs-ra-55-kva-220v-electrico/up/MLAU3324845263#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA2204280368&sid=search) | $2.381.876 | -10.3% | tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: honda, ez6500cx, kva, ez6500 |
| 7 | alta | 75 | [Grupo Electrogeno Honda Ez6500cxs 5.000w](https://www.mercadolibre.com.ar/grupo-electrogeno-honda-ez6500cxs-5000w/up/MLAU242682133#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=362be614-e366-4921-a4fc-e05238101387&wid=MLA1459133110&sid=search) | $3.493.345 | 31.5% | tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: honda, ez6500cx, ez6500 |

### 44. Gorra Davis Beige John Deere Bordada.

- ID Venturino: `276120852`
- Precio Venturino: $35.000
- Tokens: gorra, davi, beige, bordada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 47 válidos antes de top
- Candidatos excluidos por precio: 3991
- Candidatos excluidos por score: 925
- Mediana ML: $23.000
- Venturino vs mediana ML: 52.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra De Béisbol John Deere](https://articulo.mercadolibre.com.ar/MLA-1795430349-gorra-de-beisbol-john-deere-_JM?searchVariation=195028438006#polycard_client=search-desktop&be_origin=backend&searchVariation=195028438006&search_layout=grid&position=29&type=item&tracking_id=8fda2b45-4a69-4716-bf9a-30c5741301aa) | $21.322 | -39.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9&wid=MLA1552253565&sid=search) | $33.600 | -4.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA935804894&sid=search) | $32.499 | -7.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3350095572-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=202400825749#polycard_client=search-desktop&be_origin=backend&searchVariation=202400825749&search_layout=grid&position=7&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $31.454 | -10.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9d841584-e2bd-4b51-bdd1-c730d9621fda&wid=MLA2592139810&sid=search) | $30.000 | -14.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=7&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $28.722 | -17.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=8&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $28.722 | -17.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4002431523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6&wid=MLA1803760001&sid=search) | $27.018 | -22.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=7&type=item&tracking_id=8bae39e1-b4b9-4052-b8c3-7bd0c6d1322b) | $24.884 | -28.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Gorra De Béisbol Unisex Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785708455-gorra-de-beisbol-unisex-con-estampado-de-john-deere-_JM?searchVariation=201829521807#polycard_client=search-desktop&be_origin=backend&searchVariation=201829521807&search_layout=grid&position=8&type=item&tracking_id=285c9b27-2987-43a9-8a3d-f43bd849f947) | $23.073 | -34.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Gorra Trucker John Deere Moline Ill](https://www.mercadolibre.com.ar/gorra-trucker-john-deere-moline-ill/up/MLAU3340462054#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=8fda2b45-4a69-4716-bf9a-30c5741301aa&wid=MLA2211751914&sid=search) | $23.000 | -34.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Gorros Adulto Jhon Deere Bordado Ajustable](https://articulo.mercadolibre.com.ar/MLA-1750773809-gorros-adulto-jhon-deere-bordado-ajustable-_JM?searchVariation=200295903051#polycard_client=search-desktop&be_origin=backend&searchVariation=200295903051&search_layout=grid&position=22&type=item&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d) | $22.999 | -34.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Gorra De Béisbol Unisex Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785766497-gorra-de-beisbol-unisex-con-estampado-de-john-deere-_JM?searchVariation=201829511321#polycard_client=search-desktop&be_origin=backend&searchVariation=201829511321&search_layout=grid&position=26&type=item&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031) | $22.182 | -36.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Gorra De Béisbol Retro Con El Logotipo De John Deere](https://articulo.mercadolibre.com.ar/MLA-1784582165-gorra-de-beisbol-retro-con-el-logotipo-de-john-deere-_JM?searchVariation=194505121446#polycard_client=search-desktop&be_origin=backend&searchVariation=194505121446&search_layout=grid&position=40&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $22.182 | -36.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Gorras Vintage John Deere Canibal](https://www.mercadolibre.com.ar/gorras-vintage-john-deere-canibal/up/MLAU3736692347#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2794337034&sid=search) | $22.000 | -37.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3218909500-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631638827#polycard_client=search-desktop&be_origin=backend&searchVariation=200631638827&search_layout=grid&position=44&type=item&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9) | $21.906 | -37.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3307378094-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=201785411741#polycard_client=search-desktop&be_origin=backend&searchVariation=201785411741&search_layout=grid&position=45&type=item&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9) | $21.906 | -37.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Gorra De Béisbol Unisex Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785720591-gorra-de-beisbol-unisex-con-estampado-de-john-deere-_JM?searchVariation=194560989564#polycard_client=search-desktop&be_origin=backend&searchVariation=194560989564&search_layout=grid&position=46&type=item&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9) | $21.906 | -37.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Gorra De Béisbol Unisex Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1803027021-gorra-de-beisbol-unisex-con-estampado-de-john-deere-_JM?searchVariation=195356846008#polycard_client=search-desktop&be_origin=backend&searchVariation=195356846008&search_layout=grid&position=16&type=item&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf) | $21.906 | -37.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Gorra De Béisbol Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3370306346-gorra-de-beisbol-con-estampado-de-john-deere-_JM?searchVariation=202690501093#polycard_client=search-desktop&be_origin=backend&searchVariation=202690501093&search_layout=grid&position=17&type=item&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf) | $21.906 | -37.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 45. Gorro John Deere Santa Fe Mesh Bordado

- ID Venturino: `276119628`
- Precio Venturino: $37.000
- Tokens: gorra, santa, fe, mesh, bordado
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 28 válidos antes de top
- Candidatos excluidos por precio: 3963
- Candidatos excluidos por score: 972
- Mediana ML: $29.361
- Venturino vs mediana ML: 26.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 58 | [Gorros Adulto Jhon Deere Bordado Ajustable](https://articulo.mercadolibre.com.ar/MLA-1750773809-gorros-adulto-jhon-deere-bordado-ajustable-_JM?searchVariation=200295903051#polycard_client=search-desktop&be_origin=backend&searchVariation=200295903051&search_layout=grid&position=22&type=item&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d) | $22.999 | -37.8% | tipo: GORRA; tokens comunes: gorra, bordado; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9&wid=MLA1552253565&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA935804894&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9d841584-e2bd-4b51-bdd1-c730d9621fda&wid=MLA2592139810&sid=search) | $30.000 | -18.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=8fda2b45-4a69-4716-bf9a-30c5741301aa&wid=MLA2424514130&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1796681861-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=202400919821#polycard_client=search-desktop&be_origin=backend&searchVariation=202400919821&search_layout=grid&position=6&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $32.560 | -12.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_units&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2029398978&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=8fda2b45-4a69-4716-bf9a-30c5741301aa&wid=MLA1186238943&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA778736698&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3350095572-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=202400825749#polycard_client=search-desktop&be_origin=backend&searchVariation=202400825749&search_layout=grid&position=7&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $31.454 | -15.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA2992080562&sid=search) | $31.000 | -16.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=7&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $28.722 | -22.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=8&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $28.722 | -22.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4002431523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6&wid=MLA1803760001&sid=search) | $27.018 | -27.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=28&type=item&tracking_id=9d9241a0-735f-4fd3-a85b-110449a5638c) | $25.298 | -31.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=7&type=item&tracking_id=8bae39e1-b4b9-4052-b8c3-7bd0c6d1322b) | $24.884 | -32.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785745041-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=201829542799#polycard_client=search-desktop&be_origin=backend&searchVariation=201829542799&search_layout=grid&position=8&type=item&tracking_id=8bae39e1-b4b9-4052-b8c3-7bd0c6d1322b) | $24.884 | -32.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Gorra De Béisbol De Malla John Deere Trucker, Ajustable](https://articulo.mercadolibre.com.ar/MLA-3351342246-gorra-de-beisbol-de-malla-john-deere-trucker-ajustable-_JM?searchVariation=195108101354#polycard_client=search-desktop&be_origin=backend&searchVariation=195108101354&search_layout=grid&position=27&type=item&tracking_id=282f8f6e-45a9-45f8-9746-720f9fb68cd8) | $24.853 | -32.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Gorra De Béisbol De Malla John Deere Trucker, Ajustable](https://articulo.mercadolibre.com.ar/MLA-3413726270-gorra-de-beisbol-de-malla-john-deere-trucker-ajustable-_JM?searchVariation=195851877174#polycard_client=search-desktop&be_origin=backend&searchVariation=195851877174&search_layout=grid&position=25&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $24.853 | -32.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3307237368-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=201783538923#polycard_client=search-desktop&be_origin=backend&searchVariation=201783538923&search_layout=grid&position=7&type=item&tracking_id=285c9b27-2987-43a9-8a3d-f43bd849f947) | $23.073 | -37.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 46. Gorro Tiger Verde John Deere

- ID Venturino: `338230395`
- Precio Venturino: $42.000
- Tokens: gorra, tiger, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 19 de 19 válidos antes de top
- Candidatos excluidos por precio: 3980
- Candidatos excluidos por score: 964
- Mediana ML: $32.499
- Venturino vs mediana ML: 29.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9&wid=MLA1552253565&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA935804894&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9d841584-e2bd-4b51-bdd1-c730d9621fda&wid=MLA2592139810&sid=search) | $30.000 | -28.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=8fda2b45-4a69-4716-bf9a-30c5741301aa&wid=MLA2424514130&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1796681861-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=202400919821#polycard_client=search-desktop&be_origin=backend&searchVariation=202400919821&search_layout=grid&position=6&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $32.560 | -22.5% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=8fda2b45-4a69-4716-bf9a-30c5741301aa&wid=MLA1186238943&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3350095572-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=202400825749#polycard_client=search-desktop&be_origin=backend&searchVariation=202400825749&search_layout=grid&position=7&type=item&tracking_id=e03cfa72-3229-4e6f-b433-ebcb9a0c1b43) | $31.454 | -25.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=7&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $28.722 | -31.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=8&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $28.722 | -31.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4002431523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6&wid=MLA1803760001&sid=search) | $27.018 | -35.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_units&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2029398978&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA778736698&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA2992080562&sid=search) | $31.000 | -26.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=28&type=item&tracking_id=9d9241a0-735f-4fd3-a85b-110449a5638c) | $25.298 | -39.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | baja | 43 | [Gorras Trucker Gabardina Autos Tractores Bendita Estampa](https://articulo.mercadolibre.com.ar/MLA-1578982475-gorras-trucker-gabardina-autos-tractores-bendita-estampa-_JM?searchVariation=192831757861#polycard_client=search-desktop&be_origin=backend&searchVariation=192831757861&search_layout=grid&position=14&type=item&tracking_id=5865bf28-d5a7-4dac-97ce-56c30daa7bf9) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra |
| 16 | baja | 43 | [Q Gorro Piluso - Bucket Hat - Marcas Y Logos - Varios](https://articulo.mercadolibre.com.ar/MLA-3090371472-q-gorro-piluso-bucket-hat-marcas-y-logos-varios-_JM?searchVariation=198880199671#polycard_client=search-desktop&be_origin=backend&searchVariation=198880199671&search_layout=grid&position=1&type=item&tracking_id=8bae39e1-b4b9-4052-b8c3-7bd0c6d1322b) | $26.956 | -35.8% | tipo: GORRA; tokens comunes: gorra |
| 17 | baja | 43 | [Trucker Hat 235-john Deere Gorra De Cuadrillo,washed Denim,](https://articulo.mercadolibre.com.ar/MLA-1801061499-trucker-hat-235-john-deere-gorra-de-cuadrillowashed-denim-_JM?searchVariation=195271888236#polycard_client=search-desktop&be_origin=backend&searchVariation=195271888236&search_layout=grid&position=4&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $26.634 | -36.6% | tipo: GORRA; tokens comunes: gorra |
| 18 | baja | 41 | [Combo Gorra Y Remera John Deere](https://articulo.mercadolibre.com.ar/MLA-1440821747-combo-gorra-y-remera-john-deere-_JM?searchVariation=184049237203#polycard_client=search-desktop&be_origin=backend&searchVariation=184049237203&search_layout=grid&position=17&type=item&tracking_id=be2399a3-0b78-4b8a-a629-a8c3fa79cdec) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | baja | 40 | [Combo Gorra Y Remera John Deere Logo](https://articulo.mercadolibre.com.ar/MLA-1440898933-combo-gorra-y-remera-john-deere-logo-_JM?searchVariation=184049336429#polycard_client=search-desktop&be_origin=backend&searchVariation=184049336429&search_layout=grid&position=13&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 47. Herramienta de recogida magnética John Deere

- ID Venturino: `276194794`
- Precio Venturino: $20.000
- Tokens: herramienta, recogida, magnetica
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 2 válidos antes de top
- Candidatos excluidos por precio: 4309
- Candidatos excluidos por score: 652
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 48. Inyector Electrónico de Combustible. John Deere

- ID Venturino: `318857262`
- Precio Venturino: $4.446.600
- Tokens: inyector, electronico, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4923
- Candidatos excluidos por score: 40
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 49. Jarro Bayo John Deere

- ID Venturino: `338232089`
- Precio Venturino: $31.000
- Tokens: jarro, bayo
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4051
- Candidatos excluidos por score: 910
- Mediana ML: $22.267
- Venturino vs mediana ML: 39.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=20&type=item&tracking_id=75fd7f4e-7eaf-4256-893d-b093103807fa) | $24.823 | -19.9% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Y Taza Clásica, Taza De Café, Decoración Del Hogar](https://www.mercadolibre.com.ar/taza-de-cafe-tipo-tractor-11-onzas-con-forma-de-semirremo-a/p/MLA2051419761#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=f706ed14-595a-4ff5-bd03-3068a6be52b6&wid=MLA1783662613&sid=search) | $19.711 | -36.4% | tipo: JARRO; tokens comunes: jarro |

### 50. Jarro Daten térmico John Deere

- ID Venturino: `276164724`
- Precio Venturino: $62.000
- Tokens: jarro, daten, termico
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3835
- Candidatos excluidos por score: 1122
- Mediana ML: $76.826
- Venturino vs mediana ML: -19.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-3054273498-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=198392778053#polycard_client=search-desktop&be_origin=backend&searchVariation=198392778053&search_layout=grid&position=19&type=item&tracking_id=75fd7f4e-7eaf-4256-893d-b093103807fa) | $56.247 | -9.3% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 49 | [John Deere Stonware Green Ceramic Coffee Coffee Dinner Taza,](https://www.mercadolibre.com.ar/john-deere-stoneware-green-ceramic-tea-coffee-dinner-mug/p/MLA2042790930#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1548493543&sid=search) | $79.842 | 28.8% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | media | 49 | [M Cornell Importers 6978 John Deere Plows Diner Taza](https://www.mercadolibre.com.ar/m-cornell-importers-6978-john-deere-plows-diner-taza/up/MLAU4010858028#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1466990367&sid=search) | $82.405 | 32.9% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 4 | media | 48 | [M Cornell Importers 6979 John Deere Iron Horse Diner Taza, Verde.](https://www.mercadolibre.com.ar/m-cornell-importers-6979-john-deere-iron-horse-diner-taza/p/MLA2035440973#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1979568322&sid=search) | $80.870 | 30.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 5 | baja | 43 | [Taza De Café De Gres Militar Naval De La Marina](https://www.mercadolibre.com.ar/taza-de-cafe-de-gres-militar-naval-de-la-marina/up/MLAU3998320255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1467289851&sid=search) | $73.256 | 18.2% | tipo: JARRO; tokens comunes: jarro |
| 6 | baja | 42 | [M Cornell Importers 6977 Power Diner Taza, 1 De Diciembre](https://www.mercadolibre.com.ar/m-cornell-importers-6977-power-diner-taza-1-de-diciembre/up/MLAU3999206893#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1466070283&sid=search) | $73.809 | 19.0% | tipo: JARRO; tokens comunes: jarro |

### 51. Jarro Road Blanco/Negro John Deere

- ID Venturino: `276165042`
- Precio Venturino: $39.000
- Tokens: jarro, road, blanco, negro
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3954
- Candidatos excluidos por score: 1008
- Mediana ML: $24.823
- Venturino vs mediana ML: 57.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=20&type=item&tracking_id=75fd7f4e-7eaf-4256-893d-b093103807fa) | $24.823 | -36.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |

### 52. Jarro Titan gris claro John Deere

- ID Venturino: `338236578`
- Precio Venturino: $61.000
- Tokens: jarro, titan, gris, claro
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3855
- Candidatos excluidos por score: 1102
- Mediana ML: $76.826
- Venturino vs mediana ML: -20.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-3054273498-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=198392778053#polycard_client=search-desktop&be_origin=backend&searchVariation=198392778053&search_layout=grid&position=19&type=item&tracking_id=75fd7f4e-7eaf-4256-893d-b093103807fa) | $56.247 | -7.8% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 49 | [John Deere Stonware Green Ceramic Coffee Coffee Dinner Taza,](https://www.mercadolibre.com.ar/john-deere-stoneware-green-ceramic-tea-coffee-dinner-mug/p/MLA2042790930#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1548493543&sid=search) | $79.842 | 30.9% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | media | 49 | [M Cornell Importers 6978 John Deere Plows Diner Taza](https://www.mercadolibre.com.ar/m-cornell-importers-6978-john-deere-plows-diner-taza/up/MLAU4010858028#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1466990367&sid=search) | $82.405 | 35.1% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 4 | media | 48 | [M Cornell Importers 6979 John Deere Iron Horse Diner Taza, Verde.](https://www.mercadolibre.com.ar/m-cornell-importers-6979-john-deere-iron-horse-diner-taza/p/MLA2035440973#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1979568322&sid=search) | $80.870 | 32.6% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 5 | baja | 43 | [Taza De Café De Gres Militar Naval De La Marina](https://www.mercadolibre.com.ar/taza-de-cafe-de-gres-militar-naval-de-la-marina/up/MLAU3998320255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1467289851&sid=search) | $73.256 | 20.1% | tipo: JARRO; tokens comunes: jarro |
| 6 | baja | 42 | [M Cornell Importers 6977 Power Diner Taza, 1 De Diciembre](https://www.mercadolibre.com.ar/m-cornell-importers-6977-power-diner-taza-1-de-diciembre/up/MLAU3999206893#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA1466070283&sid=search) | $73.809 | 21.0% | tipo: JARRO; tokens comunes: jarro |

### 53. Jarro Zeit negro John Deere

- ID Venturino: `276162223`
- Precio Venturino: $29.000
- Tokens: jarro, zeit, negro
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4049
- Candidatos excluidos por score: 912
- Mediana ML: $22.267
- Venturino vs mediana ML: 30.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=20&type=item&tracking_id=75fd7f4e-7eaf-4256-893d-b093103807fa) | $24.823 | -14.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Y Taza Clásica, Taza De Café, Decoración Del Hogar](https://www.mercadolibre.com.ar/taza-de-cafe-tipo-tractor-11-onzas-con-forma-de-semirremo-a/p/MLA2051419761#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=f706ed14-595a-4ff5-bd03-3068a6be52b6&wid=MLA1783662613&sid=search) | $19.711 | -32.0% | tipo: JARRO; tokens comunes: jarro |

### 54. Juego de ganchos John Deere 4 piezas

- ID Venturino: `276681817`
- Precio Venturino: $97.000
- Tokens: juego, gancho, 4, pieza
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 5 válidos antes de top
- Candidatos excluidos por precio: 3610
- Candidatos excluidos por score: 1348
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 55. Juego de herramientas SAE y Métricos de ¼” John Deere

- ID Venturino: `276196679`
- Precio Venturino: $282.000
- Tokens: juego, herramienta, sae, metrico
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4268
- Candidatos excluidos por score: 693
- Mediana ML: $217.085
- Venturino vs mediana ML: 29.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Tubos Sae Set De 20 Piezas John Deere](https://www.mercadolibre.com.ar/juego-de-tubos-sae--set-de-20-piezas-john-deere/up/MLAU358245195#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=fd68fb80-54eb-47d2-8bbe-806b50df7a9c&wid=MLA1743690592&sid=search) | $220.000 | -22.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, sae; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA1399304181&sid=search) | $214.170 | -24.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego; compatibilidad/marca: John Deere |

### 56. Juego de llaves Métricas John Deere Set de 7 piezas

- ID Venturino: `276679540`
- Precio Venturino: $200.000
- Tokens: juego, llave, metrica, set, 7, pieza
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3974
- Candidatos excluidos por score: 987
- Mediana ML: $217.085
- Venturino vs mediana ML: -7.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 64 | [Juego De Tubos Sae Set De 20 Piezas John Deere](https://www.mercadolibre.com.ar/juego-de-tubos-sae--set-de-20-piezas-john-deere/up/MLAU358245195#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=fd68fb80-54eb-47d2-8bbe-806b50df7a9c&wid=MLA1743690592&sid=search) | $220.000 | 10.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, set, pieza; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA1399304181&sid=search) | $214.170 | 7.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |

### 57. Juego de transporte Farmin Friends John Deere

- ID Venturino: `281259377`
- Precio Venturino: $260.000
- Tokens: juego, transporte, farmin, friend
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 7
- Candidatos usados: 20 de 148 válidos antes de top
- Candidatos excluidos por precio: 4218
- Candidatos excluidos por score: 597
- Mediana ML: $262.099
- Venturino vs mediana ML: -0.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Juego De Juguetes John Deere 7290r Con Peterbilt Modelo 579](https://www.mercadolibre.com.ar/toy-set-john-deere-7290r-with-peterbilt-model-579/p/MLA2073862118#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3008568328&sid=search) | $270.428 | 4.0% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Big Farm John Deere 318g - Juego De Juguetes De](https://www.mercadolibre.com.ar/big-farm-john-deere-318g--juego-de-juguetes-de/up/MLAU3118018951#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA2051252588&sid=search) | $239.882 | -7.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Set De Juego Farm Toys John Deere Fundido A Presión A Escala](https://www.mercadolibre.com.ar/farm-toys-playset-john-deere-die-cast-164-scale-w-70-pcs/p/MLA2070687079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1818083793&sid=search) | $174.897 | -32.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Vehículo De Juego John Deere Xuv 855d Con Conductor Bruder Verde](https://www.mercadolibre.com.ar/vehiculo-de-juego-john-deere-xuv-855d-con-conductor-bruder/up/MLAU4065411126#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1822186671&sid=search) | $360.499 | 38.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Conjunto De Juego De Granjas John Deere A Escala 1:32 Con Tr](https://www.mercadolibre.com.ar/farm-toy-playset-john-deere-132-scale-w-tractor-animals/p/MLA2032310278#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1821251963&sid=search) | $156.798 | -39.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 6 | media | 48 | [Tomy Tractor John Deere 5125r 1/16 Con Cargadora Juego Imagi](https://www.mercadolibre.com.ar/tomy-116-john-deere-5125r-with-loader-imaginative-play-for/p/MLA2069005575#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1687173703&sid=search) | $284.275 | 9.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 7 | media | 48 | [Tomy John Deere Granja 1:32 Escala Juego Infantil Incluye](https://www.mercadolibre.com.ar/tomy-john-deere-granja-132-escala-juego-infantil-incluye/up/MLAU4003254084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA1510834105&sid=search) | $175.987 | -32.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1950447406&sid=search) | $260.245 | 0.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1583656447&sid=search) | $259.000 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1584365843&sid=search) | $258.990 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1141825591&sid=search) | $258.952 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Maqueta John Deere 843l-ii 1:50 Colección Prestige](https://www.mercadolibre.com.ar/maqueta-john-deere-843lii-150-coleccion-prestige/up/MLAU3876133382#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3117350930&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Réplica John Deere Pala Trituradora 1:50 Colección](https://www.mercadolibre.com.ar/replica-john-deere-pala-trituradora-150-coleccion/up/MLAU3876131784#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1725969655&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1447751815&sid=search) | $263.348 | 1.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Siku John Deere 670 Cosechadora Línea Pesada Metal Escala 1:87 Verde](https://www.mercadolibre.com.ar/siku-john-deere-670-cosechadora-linea-pesada-metal-escala-187-verde/p/MLA28466993#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1579003794&sid=search) | $264.249 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Cosechadora Juguete Caña John Deere 2023 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-cana-john-deere-2023--a-pedidoexkarg/up/MLAU345520548#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1716821474&sid=search) | $264.878 | 1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1782744664&sid=search) | $255.079 | -1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1911294048&sid=search) | $265.120 | 2.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Tomy 1/16 John Deere 5125r Con Cargador Imaginative Play For](https://articulo.mercadolibre.com.ar/MLA-1678853899-tomy-116-john-deere-5125r-con-cargador-imaginative-play-for-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=item&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595) | $265.623 | 2.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1949945520&sid=search) | $265.905 | 2.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 58. Juego de tubos flexibles Métricos

- ID Venturino: `276196682`
- Precio Venturino: $119.000
- Tokens: juego, tubo, flexibl, metrico
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 3572
- Candidatos excluidos por score: 1383
- Mediana ML: $88.709
- Venturino vs mediana ML: 34.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA1807348547&sid=search) | $97.200 | -18.3% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 2 | media | 50 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA3323710072&sid=search) | $89.249 | -25.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 3 | media | 50 | [Juego De Tubos Llaves Y Puntas De 108 Piezas Cromo Vanadio Kroner](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=MiJC5IUcsuD2M63J%2F1trl8xw5jIsgYmG9KRSR4mn2Vixjj%2F%2BW7iHu8Fq%2FBBEZ8q3GzH0WjjOdnDB6hObsPeLjXzUb62PBucRs5iblu%2FWCfaZVg%2FyhGK%2B0wkinsi2q4nyI9XN0sSCfpBvBo%2BXL1x0AiBSQPWNvDeWq86O1suPjdLY%2BGf6qb1yic3U8yjhBD2EosUxgFxdAPZB2ruWYFP90FqDNXRWZ5Co412NQf7cOeMrdfDVv1ow%2F7gJaFph84GjkRBH3U17har8zdw5S%2BX1bQM%2FhHeSQQulhewwL7GcvlUkWZlyTyxVnjjA2%2F8ZaIPB6z5XLWJn7OLxkgTbzrDfBn0JJiBnjJ9mzY4MJbCibpZlkIYrSTXqbuyWInKmgpfVKNtDUcEqetszvfwNi8zMbT2Yuwk8bS5nuLdw8fPVAk34KkI36n5hwVPAFJWoN1i177uviPUpGaCNnVYTTL7ag%2F4BeGygvgI36FngAVBi4intmeSrcDZNgBNeX0kWBSfqKggNu%2BpJfCP0QSP3Qg3ouSwTsgvbJObA20eVVyEf9sQnXdexutI5f9DxZcB%2FYOOYzO09tcqO6fqUnskKN06XxNROxdbon0GeUf1L5dhYOj5SEdn%2Fte4o3GhnSx20IjXfGF0SEpcFRSOZQT3xy0jOwjqX8iYbxARvm1WJ1G6VgXHgKVhYQJ%2BTLBGgVC8MaBAgwAhOI18h9J5da4kdmRuBGrWqg6ht%2FmUZtb0SjzM25YyGBtr91Q8zrWblOfy7Ody7jLK9NR9LJwqWEv0W%2FSRhRnARdD2S2LMq%2F%2Fwa24qeEWw%2FNRpsfYORs9jjbVmilKoygxLTnA4xU2xC7XqcJeuSASh2Y3rMvWfPU0UsReflnyk76RKN1Gg3XMCxSbi3i8cQVlXgx0QWZmzfa8HvNwdCuQcPkz53qKDwND7UZscKaef0CW4WWBMsBXGX4yIBCYgQdAl24gCXJ9MGBx5gadrwvFe4fKh7rUWINLQrpkDI&pdp_filters=item_id%3AMLA1429769649#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA37175500&backend_model=search-backend&be_origin=backend&search_layout=grid&position=5&type=pad&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA1429769649&sid=search) | $78.116 | -34.4% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 4 | baja | 43 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2491947770&sid=search) | $98.862 | -16.9% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 5 | baja | 43 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA922576085&sid=search) | $83.982 | -29.4% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 6 | baja | 35 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA2308233004&sid=search) | $114.799 | -3.5% | tipo: KIT_HERRAMIENTAS |
| 7 | baja | 35 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA1562325653&sid=search) | $88.169 | -25.9% | tipo: KIT_HERRAMIENTAS |
| 8 | baja | 35 | [Kit De Herramienta 28 Piezas Manuales Jadever](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-manuales-jadever/up/MLAU3177802237#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA2084295182&sid=search) | $73.499 | -38.2% | tipo: KIT_HERRAMIENTAS |

### 59. Juego de vehiculos John Deere

- ID Venturino: `281053472`
- Precio Venturino: $90.000
- Tokens: juego, vehiculo
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 20 de 113 válidos antes de top
- Candidatos excluidos por precio: 3657
- Candidatos excluidos por score: 1193
- Mediana ML: $90.093
- Venturino vs mediana ML: -0.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2362783516&sid=search) | $91.002 | 1.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 50 | [John Deere Kids Go Johnny Go Juego De Mesa Juegos De Mesa De](https://www.mercadolibre.com.ar/john-deere-kids-go-johnny-go-juego-de-mesa-juegos-de-mesa-de/up/MLAU4014127212#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1466751373&sid=search) | $87.011 | -3.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Juego De Juguetes Sandbox Tomy John Deere Con Volquete, Bald](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062901642#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3450982316&sid=search) | $93.781 | 4.2% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | -4.4% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | -15.4% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=item&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92) | $105.540 | 17.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3673017977#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1608424219&sid=search) | $115.299 | 28.1% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2160207414&sid=search) | $63.677 | -29.2% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tomy John Deere: Juego De Granja 1:32 Con Heno](https://www.mercadolibre.com.ar/tomy-john-deere-juego-de-granja-132-con-heno/up/MLAU4001271856#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2186712008&sid=search) | $121.398 | 34.9% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 10 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | -38.8% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6c2508d7-0313-410b-aeb1-1fc19b8b3471&wid=MLA3078939230&sid=search) | $85.706 | -4.8% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d&wid=MLA3271462064&sid=search) | $79.350 | -11.8% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Mini Vehículos John Deere, Paquete De 3 Con Luces Y Sonidos Verde](https://www.mercadolibre.com.ar/john-deere-realistic-farm-vehicles-3-pack-toy-vehicles-w/p/MLA2078747648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3334814640&sid=search) | $78.399 | -12.9% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1556138081&sid=search) | $108.165 | 20.2% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 15 | baja | 43 | [Ertl Juego De Juguetes Para Camioneta Y Tractor Ford F350 De](https://www.mercadolibre.com.ar/juego-de-juguetes-de-camioneta-y-tractor-de-ertl-ford-f350-y/p/MLA2057847315#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2587996814&sid=search) | $122.795 | 36.4% | tipo: JUGUETE; tokens comunes: juego |
| 16 | baja | 41 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | 0.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Freightliner Semi 1:64 De John Deere Con Remolque Combinado](https://www.mercadolibre.com.ar/john-deere-164-freightliner-semi-with-x9-combine-trailer/p/MLA2070355087#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2803797312&sid=search) | $90.419 | 0.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | 0.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 60. Juguete Desmontable Build a Buddy Bonnie Scooper John Deere

- ID Venturino: `281259380`
- Precio Venturino: $73.000
- Tokens: juguete, desmontable, build, buddy, bonnie, scooper
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 66 válidos antes de top
- Candidatos excluidos por precio: 3760
- Candidatos excluidos por score: 1137
- Mediana ML: $80.387
- Venturino vs mediana ML: -9.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2168937218&sid=search) | $75.037 | 2.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | -3.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | 10.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | -13.3% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | 15.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | 23.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | -24.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3339182498&sid=search) | $91.770 | 25.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | -5.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Minicargadora De Juguete Ertl Big Farm John Deere 318g 1:32,](https://articulo.mercadolibre.com.ar/MLA-1832499081-minicargadora-de-juguete-ertl-big-farm-john-deere-318g-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $77.124 | 5.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Lote 2 Arados Retro John Deere C/ Detalles Juguete Vintage](https://www.mercadolibre.com.ar/lote-2-arados-retro-john-deere-c-detalles-juguete-vintage/up/MLAU2393241891#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1455831071&sid=search) | $77.777 | 6.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d&wid=MLA3271462064&sid=search) | $79.350 | 8.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-7215r-ertl-164-verde/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA1717056337&sid=search) | $80.041 | 9.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2160207414&sid=search) | $63.677 | -12.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | 17.9% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA2842120858&sid=search) | $87.855 | 20.3% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Empacadora Redonda John Deere 561r De Juguete A Escala 1/64](https://www.mercadolibre.com.ar/empacadora-redonda-john-deere-561r-de-juguete-a-escala-164/up/MLAU4073862505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3453143872&sid=search) | $88.039 | 20.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | 24.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Sunny Days Entertainment John Deere Leaf Blower Juguete Para](https://www.mercadolibre.com.ar/sunny-days-entertainment-john-deere-leaf-blower-juguete-para/p/MLA2039341184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2182323334&sid=search) | $95.730 | 31.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Cosechadora Siku John Deere 8500 Metal Verde Escala 1:87 Con Cabezal Desmontable](https://www.mercadolibre.com.ar/cosechadora-siku-john-deere-8500-metal-verde-escala-187-con-cabezal-desmontable/p/MLA24585176#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&float_highlight=last_units&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA1451966152&sid=search) | $96.440 | 32.1% | tipo: JUGUETE; tokens comunes: desmontable; compatibilidad/marca: John Deere |

### 61. Kit de Pistones y Camisas. John Deere

- ID Venturino: `318854955`
- Precio Venturino: $2.334.000
- Tokens: kit, piston, camisa
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4895
- Candidatos excluidos por score: 68
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 62. Kit de servicio de boquillas de inyección de combustible John Deere

- ID Venturino: `318734154`
- Precio Venturino: $1.870.654
- Tokens: kit, servicio, boquilla, inyeccion, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4865
- Candidatos excluidos por score: 98
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 63. Llave de Autogestión ISG

- ID Venturino: `324064121`
- Precio Venturino: $276.000
- Tokens: llave, autogestion, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4250
- Candidatos excluidos por score: 713
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 64. Llave de la Gestión ISG

- ID Venturino: `324038667`
- Precio Venturino: $710.000
- Tokens: llave, gestion, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4572
- Candidatos excluidos por score: 391
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 65. Llave de la Innovación ISG

- ID Venturino: `324039407`
- Precio Venturino: $140.000
- Tokens: llave, innovacion, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3645
- Candidatos excluidos por score: 1318
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 66. Llave de la Precisión ISG

- ID Venturino: `324061266`
- Precio Venturino: $110.000
- Tokens: llave, precision, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3583
- Candidatos excluidos por score: 1380
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 67. Llave del Conocimiento ISG

- ID Venturino: `324031256`
- Precio Venturino: $145.000
- Tokens: llave, conocimiento, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3685
- Candidatos excluidos por score: 1278
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 68. Llave del Rendimiento ISG

- ID Venturino: `324062112`
- Precio Venturino: $180.000
- Tokens: llave, rendimiento, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3886
- Candidatos excluidos por score: 1077
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 69. Llave del Soporte ISG

- ID Venturino: `324062548`
- Precio Venturino: $440.000
- Tokens: llave, soporte, isg
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4420
- Candidatos excluidos por score: 543
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 70. Llaves ajustables John Deere 10 pulgadas

- ID Venturino: `276187354`
- Precio Venturino: $71.000
- Tokens: llave, ajustabl, 10, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 3730
- Candidatos excluidos por score: 1228
- Mediana ML: $60.330
- Venturino vs mediana ML: 17.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $60.330 | -15.0% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281) | $60.008 | -15.5% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Llaves De Equipamiento Original John Deere Auc12681, Paquete](https://articulo.mercadolibre.com.ar/MLA-3439558022-llaves-de-equipamiento-original-john-deere-auc12681-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $86.980 | 22.5% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=f1a1e76c-b06c-4064-b27a-37abc02f9326&wid=MLA1399126385&sid=search) | $93.489 | 31.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&float_highlight=last_units&tracking_id=9d9eea27-e8d4-4e1b-bf47-fe8bb5571b95&wid=MLA930580659&sid=search) | $45.500 | -35.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 71. Llaves ajustables John Deere 12 pulgadas

- ID Venturino: `276187355`
- Precio Venturino: $83.000
- Tokens: llave, ajustabl, 12, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 3663
- Candidatos excluidos por score: 1296
- Mediana ML: $73.655
- Venturino vs mediana ML: 12.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Auc12681, Paquete](https://articulo.mercadolibre.com.ar/MLA-3439558022-llaves-de-equipamiento-original-john-deere-auc12681-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $86.980 | 4.8% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $60.330 | -27.3% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281) | $60.008 | -27.7% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=f1a1e76c-b06c-4064-b27a-37abc02f9326&wid=MLA1399126385&sid=search) | $93.489 | 12.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 72. Llaves ajustables John Deere 6 pulgadas

- ID Venturino: `276187350`
- Precio Venturino: $39.000
- Tokens: llave, ajustabl, 6, pulgada
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 5 válidos antes de top
- Candidatos excluidos por precio: 3954
- Candidatos excluidos por score: 1004
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 73. Llaves ajustables John Deere 8 pulgadas

- ID Venturino: `276187353`
- Precio Venturino: $49.000
- Tokens: llave, ajustabl, 8, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3937
- Candidatos excluidos por score: 1020
- Mediana ML: $43.175
- Venturino vs mediana ML: 13.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281) | $60.008 | 22.5% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $60.330 | 23.1% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | baja | 44 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1146530823&sid=search) | $37.000 | -24.5% | tipo: HERRAMIENTA; tokens comunes: llave |
| 4 | baja | 41 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&float_highlight=last_units&tracking_id=9d9eea27-e8d4-4e1b-bf47-fe8bb5571b95&wid=MLA930580659&sid=search) | $45.500 | -7.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA1741179879&sid=search) | $40.849 | -16.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=f0175a31-0c71-43ef-af17-18972a869c48&wid=MLA1506435419&sid=search) | $39.139 | -20.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 74. Manómetro con aguja John Deere doble

- ID Venturino: `276196695`
- Precio Venturino: $38.000
- Tokens: manometro, aguja, doble
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3962
- Candidatos excluidos por score: 1001
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 75. Manómetro John Deere de presión de neumáticos de 20 lb a 120 lb

- ID Venturino: `276187344`
- Precio Venturino: $20.000
- Tokens: manometro, presion, neumatico, 20, lb, 120
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4309
- Candidatos excluidos por score: 654
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 76. Manómetro John Deere Presión de aire neumático Gauge

- ID Venturino: `276187346`
- Precio Venturino: $21.000
- Tokens: manometro, presion, aire, neumatico, gauge
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4259
- Candidatos excluidos por score: 704
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 77. Mate Origen con bombilla negro John Deere

- ID Venturino: `276147434`
- Precio Venturino: $60.000
- Tokens: mate, origen, bombilla, negro
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 3879
- Candidatos excluidos por score: 1079
- Mediana ML: $69.455
- Venturino vs mediana ML: -13.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 64 | [Mate Termico John Deere De Acero Inoxidable Con Bombilla](https://www.mercadolibre.com.ar/mate-termico-john-deere-de-acero-inoxidable-con-bombilla/up/MLAU4060467183#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA3441590750&sid=search) | $73.950 | 23.3% | tipo: MATE; tokens comunes: mate, bombilla; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&float_highlight=last_units&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA899912364&sid=search) | $58.242 | -2.9% | tipo: MATE; tokens comunes: mate |
| 3 | media | 45 | [Set Kit Equipo Matero Termo Inox John Deere Br](https://www.mercadolibre.com.ar/set-kit-equipo-matero-termo-inox-john-deere-br/up/MLAU226071226#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=3560371d-0392-4850-a74a-78e635ba7827&wid=MLA1365125926&sid=search) | $69.455 | 15.8% | tipo: MATE; penalización tipo adicional candidato: TERMO; tokens comunes: mate; compatibilidad/marca: John Deere |
| 4 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&float_highlight=last_unit&tracking_id=8d7ce0c3-783e-4516-b4c9-f81cb7318f32&wid=MLA873583212&sid=search) | $38.363 | -36.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 5 | baja | 28 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3168357158&sid=search) | $69.455 | 15.8% | tipo: MATE; penalización tipo adicional candidato: BOLSO, HERRAMIENTA; tokens comunes: mate |

### 78. Mate San Roque con bombilla verde John Deere

- ID Venturino: `276158249`
- Precio Venturino: $45.000
- Tokens: mate, san, roque, bombilla, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 9 de 9 válidos antes de top
- Candidatos excluidos por precio: 3943
- Candidatos excluidos por score: 1011
- Mediana ML: $32.900
- Venturino vs mediana ML: 36.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Set Matero John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-ecocuero/up/MLAU245113070#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=2bfe8e1b-24b6-479a-a897-1d561b5567e6&wid=MLA1512191568&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 2 | media | 55 | [Set Matero Kit John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-kit-john-deere-ecocuero/up/MLAU2303263352#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2bfe8e1b-24b6-479a-a897-1d561b5567e6&wid=MLA1935176914&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | media | 55 | [Set Matero John Deere. Fundas De Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-fundas-de-ecocuero/up/MLAU239222926#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA1399979491&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&float_highlight=last_units&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA899912364&sid=search) | $58.242 | 29.4% | tipo: MATE; tokens comunes: mate |
| 5 | media | 46 | [Bolso Matero John Deere Ecocuero](https://www.mercadolibre.com.ar/bolso-matero-john-deere-ecocuero/up/MLAU264444456#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA1594771616&sid=search) | $31.500 | -30.0% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate; compatibilidad/marca: John Deere |
| 6 | baja | 39 | [Bolso Matero Rigido Diseños Varios](https://articulo.mercadolibre.com.ar/MLA-1774588246-bolso-matero-rigido-disenos-varios-_JM?searchVariation=186759553535#polycard_client=search-desktop&be_origin=backend&searchVariation=186759553535&search_layout=grid&position=39&type=item&tracking_id=a19475a4-9a23-4bdf-be15-969aadf20a88) | $27.387 | -39.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate |
| 7 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&float_highlight=last_unit&tracking_id=8d7ce0c3-783e-4516-b4c9-f81cb7318f32&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Set Matero Bolso Y 2 Latas De Ecocuero John Deere](https://www.mercadolibre.com.ar/set-matero-bolso-y-2-latas-de-ecocuero-john-deere/up/MLAU3900127837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=8d7ce0c3-783e-4516-b4c9-f81cb7318f32&wid=MLA1751862177&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 9 | baja | 34 | [Set Matero Bolso Y Latas John Deere Con Tu Nombre. Ecocuero](https://www.mercadolibre.com.ar/set-matero-bolso-y-latas-john-deere-con-tu-nombre-ecocuero/up/MLAU2999997079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=855a5ef8-fd11-4847-8c80-50b239f03e22&wid=MLA2009625314&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |

### 79. Matera Elsa menge gris John Deere

- ID Venturino: `276153548`
- Precio Venturino: $70.000
- Tokens: matera, elsa, menge, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3753
- Candidatos excluidos por score: 1210
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 80. Matera Estribo de cuero John Deere

- ID Venturino: `338238787`
- Precio Venturino: $70.000
- Tokens: matera, estribo, cuero
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3753
- Candidatos excluidos por score: 1210
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 81. Matera thag gris John Deere

- ID Venturino: `276130537`
- Precio Venturino: $45.000
- Tokens: matera, thag, gris
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3943
- Candidatos excluidos por score: 1019
- Mediana ML: $38.363
- Venturino vs mediana ML: 17.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&float_highlight=last_unit&tracking_id=8d7ce0c3-783e-4516-b4c9-f81cb7318f32&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATERA; tokens comunes: matera; compatibilidad/marca: John Deere |

### 82. Mini bandeja de piezas magnéticas

- ID Venturino: `317015820`
- Precio Venturino: $14.000
- Tokens: mini, bandeja, pieza, magnetica
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4306
- Candidatos excluidos por score: 657
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 83. Mochila Austral John Deere

- ID Venturino: `338257995`
- Precio Venturino: $73.800
- Tokens: mochila, austral
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 3752
- Candidatos excluidos por score: 1200
- Mediana ML: $56.661
- Venturino vs mediana ML: 30.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=46&type=item&tracking_id=8bae39e1-b4b9-4052-b8c3-7bd0c6d1322b) | $46.207 | -37.4% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Pulverizador Mochila Fumigador 20l - Honda Quilmes](https://www.mercadolibre.com.ar/pulverizador-mochila-fumigador-20l--honda-quilmes/up/MLAU289676040#polycard_client=search-desktop&wid=MLA836807075&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $80.114 | 8.6% | tipo: MOCHILA; tokens comunes: mochila |
| 3 | baja | 44 | [Pulverizador Fumigador Mochila 16l Naranja](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-16l-naranja/p/MLA63134523#polycard_client=search-desktop&wid=MLA1829945369&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $50.349 | -31.8% | tipo: MOCHILA; tokens comunes: mochila |
| 4 | baja | 43 | [Pulverizador Fumigador Mochila 20litros Kushiro Dppi-m20l Naranja](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-20litros-kushiro-dppi-m20l-naranja/p/MLA63194542#polycard_client=search-desktop&wid=MLA1666748739&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $57.949 | -21.5% | tipo: MOCHILA; tokens comunes: mochila |
| 5 | baja | 43 | [Mochila Infantil Con Diseño De Fan Art De Tractores John Dee](https://articulo.mercadolibre.com.ar/MLA-1810945127-mochila-infantil-con-diseno-de-fan-art-de-tractores-john-dee-_JM?searchVariation=195657359500#polycard_client=search-desktop&be_origin=backend&searchVariation=195657359500&search_layout=grid&position=33&type=item&tracking_id=282f8f6e-45a9-45f8-9746-720f9fb68cd8) | $56.661 | -23.2% | tipo: MOCHILA; tokens comunes: mochila |
| 6 | baja | 43 | [Fumigador Pulverizador Fumigadora 16 Lts Tipo Mochila Color Azul](https://www.mercadolibre.com.ar/fumigador-pulverizador-fumigadora-16-lts-tipo-mochila-color-azul/p/MLA23723535#polycard_client=search-desktop&wid=MLA1730839446&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $55.996 | -24.1% | tipo: MOCHILA; tokens comunes: mochila |
| 7 | baja | 43 | [Pulverizador Fumigador Mochila 20 Litros Manguera Lanza Acc Naranja](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=ey08iWwiQQNBbXqn6VszYEBWJD%2Fq4FjsTmRPdpeAKeH9zNTEQhkh8Dl7cEQHcTpdZb4h6PIvuyrRBzRCLQyvdZIiUMx3tBD%2FAhlfFvLjDm0vtvSBqsB%2Fy7Zd94B1N1pzR9NYVNZtCrtHratPGfSbedPnS6AcDRa2MQimm3lPBP0UqiP3dBUwmPN29wU%2FQdCKsmgQiqENrtfY8pJIUDHx5rhUTdt8LccB0QbHN%2BDo6Iy%2BTlWLcmr9luLYyVKTqA1uV%2BUfv4fWCaSVdG%2Fs5ykzgbbhJEHf2z22BMpBgIaHFYn3vdNvBw5TFzgHT%2BiGucpy4rKVxQ%2BTGUrTX4zRPJf9t%2FGjX1MCvQM4a4PKvMcXmt6OF4unqJR7NIONf9HmcoD5x3Z9jbQl7o3glglZgvsOQNElJIQc7T4WSvv8A2eaYZg1wWCtRj7kBGc%2B2izUnB8S7%2FZ9NLi381if7Wn6iKpwpADZnOzip8xZYZ5GX0G%2FdePRTThjvqdDJV9npUHu3kB6%2B%2FtZNJm4X4eNjuUFOTwDt1rX2PonO%2FhTJoX5SRUQueM%2B%2FVZJ9j1JHAMK2w4%2FCRPYi4Eq3%2BGEZay0g1n2mgeuimALk2RhOg3PkNxZE42CDB89lA82PArERFWmLZ4hlllOzmf2AYZJWG6jC3n%2FqGHD89ICYwC04%2F0IWXI9mcRf%2BzqP6fwhFlv5kE%2BmMPByk%2BJKnWS%2BRczBCzCgLmUiK%2FMD0uwkiVOc6GMqXqJ2jpB6YO4M0UsHgnaSJbcbHVDrxHpnD9tnzoT%2Fp5BgTB7%2FAQqUuXOkRFex4pCVnUYFG2K71HHkO1Qlxr6tGpEBM7v57dhYPo38e0WkuS%2B7KniX1eJ%2FUF5ZpgFcVwjhGcm6yUcUC9xHzXW6%2BkWTmq6prhEy7DTQzcijaUjKwFXG%2BzDC771NA17b6FoPc5vogZ00qeaN3xuokrCV9Z1N7lm8jKPqg491KHhbPprA0FpU5yyN8xTDOZMISWMytSxaKjQ8Fzka&pdp_filters=item_id%3AMLA1767957491#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA66118093&backend_model=search-backend&be_origin=backend&search_layout=grid&position=2&type=pad&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&wid=MLA1767957491&sid=search) | $51.218 | -30.6% | tipo: MOCHILA; tokens comunes: mochila |
| 8 | baja | 43 | [Pulverizador Fumigador Mochila 16 Lts. P/liquid](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-16-lts-pliquid/p/MLA22774897#polycard_client=search-desktop&wid=MLA1688023451&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $48.970 | -33.6% | tipo: MOCHILA; tokens comunes: mochila |
| 9 | baja | 42 | [Fumigador Pulverizador Mochila 16lt 4 5 Bar Ingco Hspp41602 Color Amarillo Talle 16 Lts](https://www.mercadolibre.com.ar/fumigador-pulverizador-mochila-16lt-4-5-bar-ingco-hspp41602-color-amarillo-talle-16-lts/p/MLA26590942#polycard_client=search-desktop&wid=MLA1519072279&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $63.996 | -13.3% | tipo: MOCHILA; tokens comunes: mochila |
| 10 | baja | 42 | [Pulverizador Fumigador Lusqtoff Mochila 12 L Manguera Lanza Color Naranja](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=fT0cXrIwmzDzCnllN6dFhbN3UOFOumt94xPhv77Xx5jhfZcnTSaE52EEBNCGDUPvTseiSBygDhUmYykBy4BWrQdh44gT8ot4c8Ey2mZwzPv4YF9KUxBCrZ9JPgNK%2Frs2x3BFg%2BEUSlD1PNMykWoxCFDPXtxUf6e34tTNnTOa2GBuNVaAf4bIIayksQE2tpbduVdXiEcW62ZwObv3f4RvkwyblTGcmkYZFvF2Qf9T2sOJIFl89%2BkuV3nvXy7fT6UK3pPre7SE3dpnlM%2BXQ%2By0U%2B%2BP%2F9wdjWH5oHn9%2BN2xFOrwdiOhvCfBY6DfkhXxmbWBQtLR1UFhQV%2FCaUfNZz39KcyEMZwd4Kjz0sml7GN%2B6BG%2FYayxia5TBEE681MBmKrf4%2FLBuFLN6IIXj%2F719D3bAWQdV3DJl27e%2BFlXUSwJJGhQ%2BHozb3k2zURVFL2ot0RihTEE%2BhGng3OmMOlHi3GnQt6dVV3XlLRolE3%2B%2FtggutFbJb2cIK8M5MW7cHY20O2iLloTKWAE0e1TutibkRS519z21W%2Fv%2Fj%2BcnT2cCZn64NrAdHD7LLFmdfcSguw%2F1%2FdyWlLRzi5I5YkWgzXeS5eB0L0TvYO4XPC3F1u9O9ngnuNSMxzeSONNmmgTHClLSrxABKLDzoXob4%2FJlCpAQCGGLzgJWcFJjIXiDq0igUxAA8kjyGNZOT4yDaYUnZyM%2FiXGGP2BtZQQwaEvF%2FMNG7kszhyxixFH1880WuLdeuaJ7WONQHhw1JxP5hxgYl9kGZpCF7EjmfjDbzG5n6Z%2BSMUwcBfcGkkRf%2FlQE438cE5W9K2SaBXkGDyNh%2FH%2FOcRqDiOJoGo6iMcoZpVzvLiIP%2BuQnscVwYshuPjufClwXM8XukDfR8Kz5cKOqR5cwo%2FsjqgC0xKcKv2XkixlIEHTdhVPdwckwoaqoN3LXXP8NKlT71qYOZk%2FP6fjBMf%2FKFUIOSgitwNk6S4l5UkpAEOM8cRw1dkBWhSEaF%2BLyZIgj4unpTbjTQ%3D%3D&pdp_filters=item_id%3AMLA2037059272#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA22571073&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&wid=MLA2037059272&sid=search) | $57.189 | -22.5% | tipo: MOCHILA; tokens comunes: mochila |
| 11 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $69.357 | -6.0% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 84. Mochila Fumigadora Honda WJR 2525 – 25 L

- ID Venturino: `332864939`
- Precio Venturino: $965.621
- Tokens: mochila, fumigadora, honda, wjr, 2525, 25, l, wjr2525
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 6
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4660
- Candidatos excluidos por score: 297
- Mediana ML: $891.750
- Venturino vs mediana ML: 8.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 130 | [Mochila Fumigadora Honda Wjr 2525 Naftera 4 Tiempos 25cc](https://www.mercadolibre.com.ar/mochila-fumigadora-honda-wjr-2525-naftera-4-tiempos-25cc/up/MLAU244301755#polycard_client=search-desktop&wid=MLA1525914122&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $1.046.900 | 8.4% | tipo: MOCHILA; tokens técnicos: 2525, wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr, 2525, wjr2525 |
| 2 | alta | 102 | [Mochila Fumigadora/anti Sol Honda Wjr2525t](https://www.mercadolibre.com.ar/mochila-fumigadoraanti-sol-honda-wjr2525t/up/MLAU246103170#polycard_client=search-desktop&wid=MLA1553921162&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $891.750 | -7.7% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 3 | alta | 102 | [Aspersora Honda Wjr2525 25 Lts Color Blanco](https://www.mercadolibre.com.ar/aspersora-honda-wjr2525-25-lts-color-blanco/p/MLA46846255#polycard_client=search-desktop&wid=MLA2517349896&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $817.952 | -15.3% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: honda, 25, l, wjr2525 |
| 4 | alta | 102 | [Mochila Fumigadora Aspersora Honda Wjr2525 4 Tiempos](https://www.mercadolibre.com.ar/mochila-fumigadora-aspersora-honda-wjr2525-4-tiempos/up/MLAU3976567194#polycard_client=search-desktop&wid=MLA3326594012&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $699.900 | -27.5% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 5 | alta | 101 | [Pulverizador Mochila Fumigadora Wjr2525 25lt 4 Tiempos Honda](https://www.mercadolibre.com.ar/pulverizador-mochila-fumigadora-wjr2525-25lt-4-tiempos-honda/up/MLAU331080177#polycard_client=search-desktop&wid=MLA1695304246&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $1.260.000 | 30.5% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 6 | alta | 95 | [Fumigadora De Gasolina Honda Wjr2525 Original Genamax](https://www.mercadolibre.com.ar/fumigadora-de-gasolina-honda-wjr2525-original-genamax/up/MLAU353723790#polycard_client=search-desktop&wid=MLA1731433810&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $891.750 | -7.7% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: fumigadora, honda, wjr2525 |

### 85. Mochila Omega John Deere

- ID Venturino: `338241045`
- Precio Venturino: $60.000
- Tokens: mochila, omega
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 3879
- Candidatos excluidos por score: 1073
- Mediana ML: $56.661
- Venturino vs mediana ML: 5.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=46&type=item&tracking_id=8bae39e1-b4b9-4052-b8c3-7bd0c6d1322b) | $46.207 | -23.0% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Pulverizador Fumigador Mochila 16l Naranja](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-16l-naranja/p/MLA63134523#polycard_client=search-desktop&wid=MLA1829945369&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $50.349 | -16.1% | tipo: MOCHILA; tokens comunes: mochila |
| 3 | baja | 44 | [Pulverizador Mochila Fumigador 20l - Honda Quilmes](https://www.mercadolibre.com.ar/pulverizador-mochila-fumigador-20l--honda-quilmes/up/MLAU289676040#polycard_client=search-desktop&wid=MLA836807075&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $80.114 | 33.5% | tipo: MOCHILA; tokens comunes: mochila |
| 4 | baja | 43 | [Pulverizador Fumigador Mochila 20litros Kushiro Dppi-m20l Naranja](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-20litros-kushiro-dppi-m20l-naranja/p/MLA63194542#polycard_client=search-desktop&wid=MLA1666748739&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $57.949 | -3.4% | tipo: MOCHILA; tokens comunes: mochila |
| 5 | baja | 43 | [Mochila Infantil Con Diseño De Fan Art De Tractores John Dee](https://articulo.mercadolibre.com.ar/MLA-1810945127-mochila-infantil-con-diseno-de-fan-art-de-tractores-john-dee-_JM?searchVariation=195657359500#polycard_client=search-desktop&be_origin=backend&searchVariation=195657359500&search_layout=grid&position=33&type=item&tracking_id=282f8f6e-45a9-45f8-9746-720f9fb68cd8) | $56.661 | -5.6% | tipo: MOCHILA; tokens comunes: mochila |
| 6 | baja | 43 | [Fumigador Pulverizador Fumigadora 16 Lts Tipo Mochila Color Azul](https://www.mercadolibre.com.ar/fumigador-pulverizador-fumigadora-16-lts-tipo-mochila-color-azul/p/MLA23723535#polycard_client=search-desktop&wid=MLA1730839446&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $55.996 | -6.7% | tipo: MOCHILA; tokens comunes: mochila |
| 7 | baja | 43 | [Pulverizador Fumigador Mochila 20 Litros Manguera Lanza Acc Naranja](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=ey08iWwiQQNBbXqn6VszYEBWJD%2Fq4FjsTmRPdpeAKeH9zNTEQhkh8Dl7cEQHcTpdZb4h6PIvuyrRBzRCLQyvdZIiUMx3tBD%2FAhlfFvLjDm0vtvSBqsB%2Fy7Zd94B1N1pzR9NYVNZtCrtHratPGfSbedPnS6AcDRa2MQimm3lPBP0UqiP3dBUwmPN29wU%2FQdCKsmgQiqENrtfY8pJIUDHx5rhUTdt8LccB0QbHN%2BDo6Iy%2BTlWLcmr9luLYyVKTqA1uV%2BUfv4fWCaSVdG%2Fs5ykzgbbhJEHf2z22BMpBgIaHFYn3vdNvBw5TFzgHT%2BiGucpy4rKVxQ%2BTGUrTX4zRPJf9t%2FGjX1MCvQM4a4PKvMcXmt6OF4unqJR7NIONf9HmcoD5x3Z9jbQl7o3glglZgvsOQNElJIQc7T4WSvv8A2eaYZg1wWCtRj7kBGc%2B2izUnB8S7%2FZ9NLi381if7Wn6iKpwpADZnOzip8xZYZ5GX0G%2FdePRTThjvqdDJV9npUHu3kB6%2B%2FtZNJm4X4eNjuUFOTwDt1rX2PonO%2FhTJoX5SRUQueM%2B%2FVZJ9j1JHAMK2w4%2FCRPYi4Eq3%2BGEZay0g1n2mgeuimALk2RhOg3PkNxZE42CDB89lA82PArERFWmLZ4hlllOzmf2AYZJWG6jC3n%2FqGHD89ICYwC04%2F0IWXI9mcRf%2BzqP6fwhFlv5kE%2BmMPByk%2BJKnWS%2BRczBCzCgLmUiK%2FMD0uwkiVOc6GMqXqJ2jpB6YO4M0UsHgnaSJbcbHVDrxHpnD9tnzoT%2Fp5BgTB7%2FAQqUuXOkRFex4pCVnUYFG2K71HHkO1Qlxr6tGpEBM7v57dhYPo38e0WkuS%2B7KniX1eJ%2FUF5ZpgFcVwjhGcm6yUcUC9xHzXW6%2BkWTmq6prhEy7DTQzcijaUjKwFXG%2BzDC771NA17b6FoPc5vogZ00qeaN3xuokrCV9Z1N7lm8jKPqg491KHhbPprA0FpU5yyN8xTDOZMISWMytSxaKjQ8Fzka&pdp_filters=item_id%3AMLA1767957491#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA66118093&backend_model=search-backend&be_origin=backend&search_layout=grid&position=2&type=pad&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&wid=MLA1767957491&sid=search) | $51.218 | -14.6% | tipo: MOCHILA; tokens comunes: mochila |
| 8 | baja | 43 | [Pulverizador Fumigador Mochila 16 Lts. P/liquid](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-16-lts-pliquid/p/MLA22774897#polycard_client=search-desktop&wid=MLA1688023451&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $48.970 | -18.4% | tipo: MOCHILA; tokens comunes: mochila |
| 9 | baja | 42 | [Pulverizador Fumigador Lusqtoff Mochila 12 L Manguera Lanza Color Naranja](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=fT0cXrIwmzDzCnllN6dFhbN3UOFOumt94xPhv77Xx5jhfZcnTSaE52EEBNCGDUPvTseiSBygDhUmYykBy4BWrQdh44gT8ot4c8Ey2mZwzPv4YF9KUxBCrZ9JPgNK%2Frs2x3BFg%2BEUSlD1PNMykWoxCFDPXtxUf6e34tTNnTOa2GBuNVaAf4bIIayksQE2tpbduVdXiEcW62ZwObv3f4RvkwyblTGcmkYZFvF2Qf9T2sOJIFl89%2BkuV3nvXy7fT6UK3pPre7SE3dpnlM%2BXQ%2By0U%2B%2BP%2F9wdjWH5oHn9%2BN2xFOrwdiOhvCfBY6DfkhXxmbWBQtLR1UFhQV%2FCaUfNZz39KcyEMZwd4Kjz0sml7GN%2B6BG%2FYayxia5TBEE681MBmKrf4%2FLBuFLN6IIXj%2F719D3bAWQdV3DJl27e%2BFlXUSwJJGhQ%2BHozb3k2zURVFL2ot0RihTEE%2BhGng3OmMOlHi3GnQt6dVV3XlLRolE3%2B%2FtggutFbJb2cIK8M5MW7cHY20O2iLloTKWAE0e1TutibkRS519z21W%2Fv%2Fj%2BcnT2cCZn64NrAdHD7LLFmdfcSguw%2F1%2FdyWlLRzi5I5YkWgzXeS5eB0L0TvYO4XPC3F1u9O9ngnuNSMxzeSONNmmgTHClLSrxABKLDzoXob4%2FJlCpAQCGGLzgJWcFJjIXiDq0igUxAA8kjyGNZOT4yDaYUnZyM%2FiXGGP2BtZQQwaEvF%2FMNG7kszhyxixFH1880WuLdeuaJ7WONQHhw1JxP5hxgYl9kGZpCF7EjmfjDbzG5n6Z%2BSMUwcBfcGkkRf%2FlQE438cE5W9K2SaBXkGDyNh%2FH%2FOcRqDiOJoGo6iMcoZpVzvLiIP%2BuQnscVwYshuPjufClwXM8XukDfR8Kz5cKOqR5cwo%2FsjqgC0xKcKv2XkixlIEHTdhVPdwckwoaqoN3LXXP8NKlT71qYOZk%2FP6fjBMf%2FKFUIOSgitwNk6S4l5UkpAEOM8cRw1dkBWhSEaF%2BLyZIgj4unpTbjTQ%3D%3D&pdp_filters=item_id%3AMLA2037059272#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA22571073&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&wid=MLA2037059272&sid=search) | $57.189 | -4.7% | tipo: MOCHILA; tokens comunes: mochila |
| 10 | baja | 42 | [Fumigador Pulverizador Mochila 16lt 4 5 Bar Ingco Hspp41602 Color Amarillo Talle 16 Lts](https://www.mercadolibre.com.ar/fumigador-pulverizador-mochila-16lt-4-5-bar-ingco-hspp41602-color-amarillo-talle-16-lts/p/MLA26590942#polycard_client=search-desktop&wid=MLA1519072279&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=515b9205-ca6c-4580-9252-e3b2dac9b647&sid=search) | $63.996 | 6.7% | tipo: MOCHILA; tokens comunes: mochila |
| 11 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=c376f896-9e85-4fa4-aa27-da228f0dcfc6) | $69.357 | 15.6% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 86. Mochila Sein John Deere gris

- ID Venturino: `276129570`
- Precio Venturino: $135.000
- Tokens: mochila, sein, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 3 válidos antes de top
- Candidatos excluidos por precio: 3629
- Candidatos excluidos por score: 1331
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 87. Motobomba Honda WB20XH2

- ID Venturino: `340632800`
- Precio Venturino: $1.362.010
- Tokens: motobomba, honda, wb20xh2, wb20
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 3
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 4791
- Candidatos excluidos por score: 169
- Mediana ML: $1.210.070
- Venturino vs mediana ML: 12.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 99 | [Motobomba Honda Wb20xt Drx Wb20xTDRx](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=TfHejcKjkk5WkuZ3MQp4ynVYr3hL61PlAKoQ%2FrI0TLFC2ZH5o1ENoI4AN5lWHvYIxw5o625BvGkscNsIgfYxrZTNk%2B3%2BrTNaSaKT4EOGbfuEq7%2BtpwG6rSniXM0SnqaBVGwM9jUz6so7E6zMi09RBrOrIWlSAC40jMhV578Mh0eDzMo9aWHKEhemgpMQtHiLfIBxhxli85KWcxa4fyewtehas4flBszXjYwuwB5stH2aEt82EA8ulaIgel3sBI72P9MV6Ce9gbltiMB6Q%2FkRE%2BLJjf%2F9LEos67lbuYCwiZC8sxvGRuFXEwK0eXJvJ5MkHUSwcQbozWeYO2xpjtu3f65TvTUhY5T%2FbgSTDkHKKRJtPWuI7cuXx5gZLreGEcoCf%2B21vmbx1KkgfbKnCh4KKVKoxavxiPpVe2S5iOyjhz59faTeH7aphOoncasSpJfs8eVdhlJuQ54YNgzdoY%2FXiOSd1y2f196S5hlG2qNOehnTyUYwmGXKY5OtuBWwQ44QQHxOdLQuqLsMSQbPFUx%2F%2BEhjtRSWRswyzsq2Yuii5YGgx3NMW1rIaWV4SUdPyn4z4dgbV3VVybTrXtXWuXcwRKrY9snmN950hIB%2FglAHm7CFAG4tQn2dWsrw%2B7LghtnCl9yiNIsXesE5EQimAcSRMa5GSdVgdjGbfIAxLDVducnl2OggjOq4fajv0%2FhzxsMQYWnIv8oyC9ridm780Cn7q%2Bp%2BukFpXfIGC8Du354enRDM4c8ut74AlNFxUFt1y6JwVkjaePQ%2FO3GJn0vAsNwuRKYFQGVY88vhKSusGNs%2FC9%2FRkxucdRulNd%2FuI3BGV5%2F41k9bWeM8Z8Wryy0f3CE2eWoAG8E8lpnUp%2BVU2eh%2FlELBNkm0ZJfftQlFUKoQGQEK5ex1Rzn%2B3nvz5SuNGlCwwxKJX4iTzivtRk40lBP9WYEek7qZUwjVnV22d6XbGB1IMNVnaKziog%3D%3D&pdp_filters=item_id%3AMLA2810796020#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA46146649&backend_model=search-backend&be_origin=backend&search_layout=grid&position=11&type=pad&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA2810796020&sid=search) | $1.235.000 | -9.3% | tipo: MOTOBOMBA; tokens técnicos: wb20; modelo Honda compatible: wb20; tokens comunes: motobomba, honda, wb20 |
| 2 | alta | 96 | [Motobomba Autocebante Honda Wb20xh Gx160 De 2 Pulgadas](https://www.mercadolibre.com.ar/motobomba-autocebante-honda-wb20xh-gx160-de-2-pulgadas/up/MLAU3896040643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA3191038992&sid=search) | $1.210.070 | -11.2% | tipo: MOTOBOMBA; tokens técnicos: wb20; modelo Honda compatible: wb20; tokens comunes: motobomba, honda, wb20 |
| 3 | alta | 96 | [Motobomba Honda Wb20 Xh2 Dr Aguas Limpias Motostore Pilar](https://www.mercadolibre.com.ar/motobomba-honda-wb20-xh2-dr-aguas-limpias--motostore-pilar/up/MLAU247243922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1607531908&sid=search) | $1.087.500 | -20.2% | tipo: MOTOBOMBA; tokens técnicos: wb20; modelo Honda compatible: wb20; tokens comunes: motobomba, honda, wb20 |

### 88. Motobomba Honda WL20XH

- ID Venturino: `340635178`
- Precio Venturino: $1.170.000
- Tokens: motobomba, honda, wl20xh, wl20
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 11
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 4731
- Candidatos excluidos por score: 221
- Mediana ML: $932.640
- Venturino vs mediana ML: 25.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 124 | [Motobomba Honda Wl20xh 2 36000lts](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-2--36000lts/up/MLAU227147265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&float_highlight=last_units&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1161953890&sid=search) | $1.066.126 | -8.9% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 2 | alta | 120 | [Motobomba Honda 2 Wl20xh 40200 L/h](https://www.mercadolibre.com.ar/motobomba-honda-2--wl20xh-40200-lh/up/MLAU373077308#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1774511852&sid=search) | $1.100.000 | -6.0% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 3 | alta | 118 | [Motobomba Honda Wl20xh 4.8hp 670l/min 2 Autocebante](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-48hp-670lmin-2--autocebante/up/MLAU3269410076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA2149396344&sid=search) | $880.200 | -24.8% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 4 | alta | 117 | [Motobomba Honda Wl20xh 36000l 5.5hp 2 Pulgadas Aguas Limpias](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-36000l-55hp-2-pulgadas-aguas-limpias/up/MLAU3168332259#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1836588576&sid=search) | $971.500 | -17.0% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 5 | alta | 103 | [Motobomba Honda Wl20 Original](https://www.mercadolibre.com.ar/motobomba-honda-wl20-original/up/MLAU244544360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1475973350&sid=search) | $971.500 | -17.0% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 6 | alta | 97 | [Motobomba Honda Wl20 Original Hp 5.5 Nafta](https://www.mercadolibre.com.ar/motobomba-honda-wl20-original-hp-55-nafta/up/MLAU3399007210#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA2308272624&sid=search) | $950.500 | -18.8% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 7 | alta | 96 | [Motobomba Honda Wl20 Xh Agua Limp 36000lts Motostore Pilar](https://www.mercadolibre.com.ar/motobomba-honda-wl20-xh-agua-limp-36000lts--motostore-pilar/up/MLAU231516086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1349032690&sid=search) | $932.640 | -20.3% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 8 | alta | 96 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp 40.200lts/hr](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=or2cm4Z2ZL29n62HoDhZH%2Fz%2BzgpX8XGS2MGDquR4uz4G1jsmOq%2FaI7e7ChrFuI1Jr%2FZlBe0gB5dPAX%2B7GJoFhW8KosxTiyx7NVYw6V0F8BGtuuknKbQWZrPf8ctkGKyY8oS3%2ByTieDGz07tkZwFVfcY0UB0BbbkgCQQCGJSdfNRSNZ9z7dHd3PhIvgIbFL4qriGdPRJaHu9Wy0lKk1z8wd76D19PLsCDgQHbvGJf4twSCv1SVbD9L9bMYekDepfA%2FjwnTb0%2BN3%2FE28kTm5YsskYAJQcvnzv0JGPIm%2BKjjVFNQRWnsObRDueQfDmBi50LbYiC%2BA%2BNOrJAJJqiCDbgIla3MSKuCX50hRY22iHy%2BZF1ut05ZZ1DN%2FXUmTZHAjx9vKzxFuGP7m6FQlQgrGhCdaveLSX%2F5S39EGNev%2FEJb83cHQmgqvW8AMWs%2Ft3%2BIlOPPzABb%2FAZnIi%2B6i1LliK%2BBF2G%2BrHA1RjGzTko%2FNIjizzWbBk%2FyGLABoU7eqkB8C8L0Hz5KMVzoJNTMnJCwO0al5LQMm%2BYa5uqIzdFEogChMwF7bX43r7CBI1Bi5yruqXSI%2FAdFmuXOWFW5pZcDrvZcRA73auS6uadXVIiqIFhwWFd5sTwfhadAhEJpxU5NcmHe%2BPa1fj3KBmo6IWybxkIcNrt0ZN36kKmp%2F7LUEpilR%2B9SPFas6JPYgBSU0Jt0SbPgTTF6yhZyvM83YufpjTIPHGkLaMPBpRXDKgsBt6uoAvCHvVd8TcTpYLq1NVwDkCsPOc4D%2FGT50EUrFhsgva3isSl2DtkxFQurltM3IcYWadCnO7Ld1ixk7uT4lUfuRZhrxSHWHYJlP95YrMj73jxd7GXhmOKtzqCTvangn%2FqAcM5Y76fFIkc6rL86dumjbG6KJV7xePAlqXRKhHMoEMRjWwt7BynWEfAmEjZstx5PaQOL%2Bd%2FRDKADuIgahr8MteWt08O3HRYph3n5saqju%2F8VkZn&pdp_filters=item_id%3AMLA2260269748#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA43947530&backend_model=search-backend&float_highlight=last_units&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA2260269748&sid=search) | $765.525 | -34.6% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 9 | alta | 95 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp 40.200lts/hr Genamax](https://www.mercadolibre.com.ar/motobomba-agua-limpia-honda-wl20-xh-4hp-40200ltshr-genamax/up/MLAU3367722376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA2255391428&sid=search) | $864.200 | -26.1% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 10 | alta | 95 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp Buen Caudal Tuamoto](https://www.mercadolibre.com.ar/motobomba-agua-limpia-honda-wl20-xh-4hp-buen-caudal-tuamoto/up/MLAU146980139#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA1123812730&sid=search) | $834.405 | -28.7% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 11 | alta | 94 | [Motobomba Honda Wl20 Xh Agua Limpia 4hp 3 Bar 3600 Rpm](https://www.mercadolibre.com.ar/motobomba-honda-wl20-xh-agua-limpia-4hp-3-bar-3600-rpm/up/MLAU273408183#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=87529c12-376e-4c92-a4b3-1a26a8a52c1a&wid=MLA749852634&sid=search) | $864.200 | -26.1% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |

### 89. Motoguadaña Honda UMK435 – 35.8 cc

- ID Venturino: `332864026`
- Precio Venturino: $778.042
- Tokens: motoguadana, honda, umk435, 35.8, cc
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 11
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 4606
- Candidatos excluidos por score: 346
- Mediana ML: $850.000
- Venturino vs mediana ML: -8.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 103 | [Desmalezadora Honda UMK435](https://www.mercadolibre.com.ar/desmalezadora-honda-umk435/p/MLA17446726#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&float_highlight=last_units&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA1971317858&sid=search) | $773.300 | -0.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 2 | alta | 103 | [Desmalezadora Motoguadaña Honda Umk435](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk435/up/MLAU227823789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA1181876381&sid=search) | $719.200 | -7.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 3 | alta | 103 | [Motoguadaña Honda Umk435](https://www.mercadolibre.com.ar/motoguadana-honda-umk435/up/MLAU311257773#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&float_highlight=last_units&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA930484345&sid=search) | $850.000 | 9.2% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 4 | alta | 101 | [Desmalezadora Honda UMK435T](https://www.mercadolibre.com.ar/desmalezadora-honda-umk435t/p/MLA17462475#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA1510301307&sid=search) | $716.128 | -8.0% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 5 | alta | 99 | [Motoguadaña Honda Umk435 4t Do-motos](https://www.mercadolibre.com.ar/motoguadana-honda-umk435-4t-domotos/up/MLAU136431343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&float_highlight=last_unit&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA922345772&sid=search) | $915.000 | 17.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 6 | alta | 97 | [Desmalezadora Motoguadaña Honda Umk435t 4 Tiempos](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk435t-4-tiempos/up/MLAU3967150977#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA3444216034&sid=search) | $714.900 | -8.1% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 7 | alta | 97 | [Motoguadaña Desmalezadora Honda Umk435 35,8cc 4 Tiempos](https://www.mercadolibre.com.ar/motoguadana-desmalezadora-honda-umk435-358cc-4-tiempos/up/MLAU3701707793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA2736102138&sid=search) | $850.000 | 9.2% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 8 | alta | 96 | [Desmalezadora Motoguadaña Honda 4 Tiempos Umk435 43cc 6,1kg](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-4-tiempos-umk435-43cc-61kg/up/MLAU215576796#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA1129310933&sid=search) | $944.261 | 21.4% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 9 | alta | 96 | [Motoguadaña Umk 435 4 T. Honda Desmalezadora Motoguadana](https://www.mercadolibre.com.ar/motoguadana-umk-435-4-t-honda-desmalezadora-motoguadana/up/MLAU256462992#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA654092963&sid=search) | $1.004.435 | 29.1% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 10 | alta | 96 | [Motoguadaña Honda Umk 435 4t 35.8cc 1.3hp](https://www.mercadolibre.com.ar/motoguadana-honda-umk-435-4t-358cc-13hp/up/MLAU248565234#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA1542279732&sid=search) | $1.072.083 | 37.8% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 11 | alta | 95 | [Desmalezadora Motoguadaña Honda Umk 435 4t 1.6 Hp Tuamoto!](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk-435-4t-16-hp-tuamoto/up/MLAU202714369#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=e9f1002a-43af-4af9-95d0-ac82a3a9a51a&wid=MLA913435504&sid=search) | $694.395 | -10.8% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |

### 90. Motor Honda GP200 – 5.5 HP

- ID Venturino: `332858727`
- Precio Venturino: $483.518
- Tokens: motor, honda, gp200, 5.5, hp
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 10
- Candidatos usados: 10 de 10 válidos antes de top
- Candidatos excluidos por precio: 4457
- Candidatos excluidos por score: 496
- Mediana ML: $504.098
- Venturino vs mediana ML: -4.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 125 | [Motor Estacionario Honda Gp 200 5.5 Hp Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55-hp-eje-horizontal/up/MLAU3520852779#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA1569928047&sid=search) | $611.996 | 26.6% | tipo: MOTOR; tokens técnicos: gp200, 5.5; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200, 5.5, hp |
| 2 | alta | 104 | [Motor Naftero Honda Eje Horizontal 6,5 Hp Gp200](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp200-65hp-caceite/p/MLA2040853899#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&float_highlight=last_units&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA933569489&sid=search) | $634.660 | 31.3% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200, hp |
| 3 | alta | 97 | [Motor Honda Gp200 6.5hp Naftero Horizontal](https://www.mercadolibre.com.ar/motor-honda-gp200-65hp-naftero-horizontal/up/MLAU236114984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA1383523053&sid=search) | $468.350 | -3.1% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 4 | alta | 96 | [Motor Estacionario Honda Gp200 5.5hp Eje Recto Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp200-55hp-eje-recto-horizontal/up/MLAU246784909#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA1640116076&sid=search) | $446.600 | -7.6% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 5 | alta | 96 | [Motor Honda Gp200h-qx1 5.5hp Naftero Horizontal](https://www.mercadolibre.com.ar/motor-honda-gp200hqx1-55hp-naftero-horizontal/up/MLAU352454084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA1419235491&sid=search) | $539.845 | 11.6% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 6 | alta | 96 | [Motor Honda Gp200 5.5hp Naftero Horizontal. Do-motos](https://www.mercadolibre.com.ar/motor-honda-gp200-55hp-naftero-horizontal-domotos/up/MLAU127481408#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA1393956701&sid=search) | $613.000 | 26.8% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 7 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3408002807#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA2334348212&sid=search) | $459.000 | -5.1% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 8 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3069267078#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA2030073448&sid=search) | $431.197 | -10.8% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 9 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3396845841#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA2313919866&sid=search) | $415.548 | -14.1% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 10 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3492317771#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA2457963400&sid=search) | $620.000 | 28.2% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |

### 91. Motor Honda GX160SX – 5.5 HP

- ID Venturino: `332862157`
- Precio Venturino: $576.413
- Tokens: motor, honda, gx160sx, 5.5, hp, gx160
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 8
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 4498
- Candidatos excluidos por score: 457
- Mediana ML: $551.250
- Venturino vs mediana ML: 4.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 126 | [Motor Nafta Honda Gx160h1 5,5 Hp Arr.m](https://www.mercadolibre.com.ar/motor-nafta-honda-gx160h1-55-hp-arrm/up/MLAU371563491#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA1774513062&sid=search) | $700.000 | 21.4% | tipo: MOTOR; tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |
| 2 | alta | 118 | [Motor Honda Gx160sx 4 Tiempos 5.5hp](https://www.mercadolibre.com.ar/motor-cunero-gx160h2-honda/p/MLA2039913032#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA1115468569&sid=search) | $715.000 | 24.0% | tipo: MOTOR; tokens técnicos: gx160sx, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, gx160sx, gx160 |
| 3 | alta | 101 | [Motor Marca Honda Gx160h2-qx1 4.8 Hp 4t Con Cuñero Gasolina](https://www.mercadolibre.com.ar/motor-marca-honda-gx160h2-qx1-48-hp-4t-con-cunero-gasolina/p/MLA25427565#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA1486382218&sid=search) | $551.000 | -4.4% | tipo: MOTOR; tokens técnicos: gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, hp, gx160 |
| 4 | alta | 101 | [Motor Honda Gx160](https://www.mercadolibre.com.ar/motor-honda-gx160/up/MLAU3254148733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA2137486112&sid=search) | $541.800 | -6.0% | tipo: MOTOR; tokens técnicos: gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, gx160 |
| 5 | alta | 96 | [Motor Estacionario Honda Gx160h2sx1 Genamax](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx160h2sx1-genamax/up/MLAU3367804464#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=3dfbca47-54bd-41bd-b0e6-fa383438d8c1&wid=MLA2250367084&sid=search) | $532.150 | -7.7% | tipo: MOTOR; tokens técnicos: gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, gx160 |
| 6 | media | 48 | [Motor Honda Gx160 De 5.5 Hp Con Sensor De Aceite](https://www.mercadolibre.com.ar/motor-honda-gx160-de-55-hp-con-sensor-de-aceite/up/MLAU3414564362#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA2333440364&sid=search) | $551.500 | -4.3% | penalización tipo distinto (MOTOR vs ACEITE); tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |
| 7 | media | 48 | [Motor Honda Gx160 De 5.5 Hp Con Sensor De Aceite](https://www.mercadolibre.com.ar/motor-honda-gx160-de-55-hp-con-sensor-de-aceite/up/MLAU3899782019#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA3199467950&sid=search) | $634.367 | 10.1% | penalización tipo distinto (MOTOR vs ACEITE); tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |
| 8 | media | 48 | [Motor Honda Gx160 de 5.5 hp con sensor de aceite](https://www.mercadolibre.com.ar/motor-honda-gx160-de-55-hp-con-sensor-de-aceite/p/MLA23422772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA2313804116&sid=search) | $513.094 | -11.0% | penalización tipo distinto (MOTOR vs ACEITE); tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |

### 92. Motor Honda GX200QX – 6.5 HP

- ID Venturino: `332861874`
- Precio Venturino: $619.048
- Tokens: motor, honda, gx200qx, 6.5, hp, gx200
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4528
- Candidatos excluidos por score: 433
- Mediana ML: $582.817
- Venturino vs mediana ML: 6.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 126 | [Motor de gasolina estacionario Honda Gx200 Qd 6.5 HP](https://www.mercadolibre.com.ar/motor-de-gasolina-estacionario-honda-gx200-qd-65-hp/p/MLA37451365#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA1737817559&sid=search) | $615.000 | -0.7% | tipo: MOTOR; tokens técnicos: 6.5, gx200; modelo Honda compatible: gx200; tokens comunes: motor, honda, 6.5, hp, gx200 |
| 2 | alta | 94 | [Motor Honda Gx200 5,5hp 4tiempos Explosión Eje Recto 3600rpm](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx200-65hp-196cc-rranque-manual/p/MLA2042318950#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA2506712744&sid=search) | $550.633 | -11.1% | tipo: MOTOR; tokens técnicos: gx200; modelo Honda compatible: gx200; tokens comunes: motor, honda, gx200 |

### 93. Motor Honda GX390QX – 13 HP

- ID Venturino: `332857483`
- Precio Venturino: $1.128.754
- Tokens: motor, honda, gx390qx, 13, hp, gx390
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4714
- Candidatos excluidos por score: 245
- Mediana ML: $1.371.609
- Venturino vs mediana ML: -17.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 118 | [Motor Honda 13hp Eje 1 Gx390qx](https://www.mercadolibre.com.ar/honda-gx390-motor-estacionario-13hp-4t-gasolina/p/MLA2037999154#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&float_highlight=last_unit&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA933923373&sid=search) | $1.285.000 | 13.8% | tipo: MOTOR; tokens técnicos: gx390qx, gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390qx, gx390 |
| 2 | alta | 96 | [Motor Estacionario Honda Gx390 13hp Gx390h2-qx](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx390-13hp-gx390h2qx/up/MLAU3646767374#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA2616599922&sid=search) | $1.433.217 | 27.0% | tipo: MOTOR; tokens técnicos: gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390 |
| 3 | alta | 96 | [Motor Estacionario Honda Gx390 13hp A.electrico Original](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx390-13hp-ar-electrico-eje-r-1-pul/p/MLA2045533485#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA705257517&sid=search) | $1.513.800 | 34.1% | tipo: MOTOR; tokens técnicos: gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390 |
| 4 | alta | 93 | [Motor Honda Estacionario Gx390 13hp 4t Ohv Eje Recto 1 PuLG](https://www.mercadolibre.com.ar/motor-estacionario-nafta-15hp-eje-horizontal-4t-calidad-pro/p/MLA2054871539#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&float_highlight=last_units&tracking_id=b0714272-8863-4cd7-abaf-9789356e1dc1&wid=MLA916144673&sid=search) | $1.310.000 | 16.1% | tipo: MOTOR; tokens técnicos: gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390 |

### 94. Navaja de bolsillo grande John Deere

- ID Venturino: `288695391`
- Precio Venturino: $66.000
- Tokens: navaja, bolsillo, grande
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3761
- Candidatos excluidos por score: 1202
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 95. Palanca Barra John Deere 25 pulgadas

- ID Venturino: `276681802`
- Precio Venturino: $58.000
- Tokens: palanca, barra, 25, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3898
- Candidatos excluidos por score: 1059
- Mediana ML: $43.175
- Venturino vs mediana ML: 34.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&float_highlight=last_units&tracking_id=9d9eea27-e8d4-4e1b-bf47-fe8bb5571b95&wid=MLA930580659&sid=search) | $45.500 | -21.6% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=f0175a31-0c71-43ef-af17-18972a869c48&wid=MLA1506435419&sid=search) | $39.139 | -32.5% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281) | $60.008 | 3.5% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $60.330 | 4.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA1741179879&sid=search) | $40.849 | -29.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1146530823&sid=search) | $37.000 | -36.2% | tipo: HERRAMIENTA |

### 96. Palanca Barra John Deere 8 pulgadas

- ID Venturino: `276681809`
- Precio Venturino: $30.000
- Tokens: palanca, barra, 8, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 4040
- Candidatos excluidos por score: 918
- Mediana ML: $37.000
- Venturino vs mediana ML: -18.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Palancas Apertura Ventana Cabina John Deere Sg2](https://www.mercadolibre.com.ar/palancas-apertura-ventana-cabina-john-deere-sg2/up/MLAU319169472#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=37953296-3c85-44da-9423-65dc8b011e77&wid=MLA1409671591&sid=search) | $23.076 | -23.1% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=f0175a31-0c71-43ef-af17-18972a869c48&wid=MLA1506435419&sid=search) | $39.139 | 30.5% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA1741179879&sid=search) | $40.849 | 36.2% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=738cedd0-0ec5-4e2c-b6a2-1d95cfd4d1d4&wid=MLA1704310265&sid=search) | $28.138 | -6.2% | tipo: HERRAMIENTA |
| 5 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1146530823&sid=search) | $37.000 | 23.3% | tipo: HERRAMIENTA |

### 97. Palanca John Deere 25 pulgadas

- ID Venturino: `276681805`
- Precio Venturino: $57.000
- Tokens: palanca, 25, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3934
- Candidatos excluidos por score: 1023
- Mediana ML: $43.175
- Venturino vs mediana ML: 32.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&float_highlight=last_units&tracking_id=9d9eea27-e8d4-4e1b-bf47-fe8bb5571b95&wid=MLA930580659&sid=search) | $45.500 | -20.2% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=f0175a31-0c71-43ef-af17-18972a869c48&wid=MLA1506435419&sid=search) | $39.139 | -31.3% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281) | $60.008 | 5.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $60.330 | 5.8% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA1741179879&sid=search) | $40.849 | -28.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1146530823&sid=search) | $37.000 | -35.1% | tipo: HERRAMIENTA |

### 98. Palanca John Deere 31 pulgadas

- ID Venturino: `276681807`
- Precio Venturino: $58.000
- Tokens: palanca, 31, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3898
- Candidatos excluidos por score: 1059
- Mediana ML: $43.175
- Venturino vs mediana ML: 34.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&float_highlight=last_units&tracking_id=9d9eea27-e8d4-4e1b-bf47-fe8bb5571b95&wid=MLA930580659&sid=search) | $45.500 | -21.6% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=f0175a31-0c71-43ef-af17-18972a869c48&wid=MLA1506435419&sid=search) | $39.139 | -32.5% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281) | $60.008 | 3.5% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=9f5baeac-b82c-4d11-9f81-bb480ce3f99b) | $60.330 | 4.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=342b2fca-1440-4668-a8d4-7c9a14e0e6b3&wid=MLA1741179879&sid=search) | $40.849 | -29.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1146530823&sid=search) | $37.000 | -36.2% | tipo: HERRAMIENTA |

### 99. Pinza múltiple de acero inoxidable John Deere

- ID Venturino: `276173635`
- Precio Venturino: $70.000
- Tokens: pinza, multiple, acero, inoxidable
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3753
- Candidatos excluidos por score: 1210
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 100. Placa Deslizante Ancha (Skid Plate). John Deere

- ID Venturino: `318858595`
- Precio Venturino: $69.000
- Tokens: placa, deslizante, ancha, skid, plate
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3769
- Candidatos excluidos por score: 1194
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 101. Punton Cosechadora Forjado Draper John Deere

- ID Venturino: `318862823`
- Precio Venturino: $47.000
- Tokens: punton, cosechadora, forjado, draper
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 1
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 3926
- Candidatos excluidos por score: 1026
- Mediana ML: $45.000
- Venturino vs mediana ML: 4.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Punton Cosechadora Jhon Deere Triple Forjado](https://www.mercadolibre.com.ar/punton-cosechadora-jhon-deere-triple-forjado/up/MLAU213446711#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=a88fc560-b305-4ec6-a82d-30e3aec5d281&wid=MLA1123219059&sid=search) | $48.738 | 3.7% | tipo: CUCHILLA; tokens comunes: punton, cosechadora, forjado; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Cuchillas Genérica Para John Deere De 54 Cm- 21 Pulg ( X2u)](https://www.mercadolibre.com.ar/cuchillas-generica-para-john-deere-de-54-cm-21-pulg--x2u/up/MLAU3936051037#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA1775667427&sid=search) | $45.000 | -4.3% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Seccion Cuchilla John Deere Jd226 - Prentacc](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=%2BPAJa5zVObm%2F1RDmAHI%2F3bkwat9QmIA9PT2GXPz7W1zRic5AhckKZfL2G8HBrlRqLI97k7K7wHUKEpOljCjl8nWpbW9MyBuc8jxlwlPrDmXYATr238wcHRWJnHAzqBaWTnoYd0qpX5CoqBAxvInW4y7quE91A%2FKdPTPoq8bC7HntyugrHmcH2kLfGmGwalBc15Iob2qPoMJFD%2F7doLWmOZR0K5u7DnPkG2UqtF4Ta9FFAmVR4CcW4sEy5d250r3tjmF7gRqDjDaOlQkvGP1dvY4hyqu%2BzeZhZKFGyq3WBlVQxyw%2BZki0TVwF6ZIb1BcYElOyhkNb7qFEesOMdEBGlCs72ySAl2D2%2F%2FW%2FVeuuN2e6dZUxjyiCKm3wtW6V1XIeENN9xVKCO1hJQ6NUO6ZltscZ%2FfDMw3H0Y%2BPnpw2hGazS3c6YMwRm3y7u37nEbkHi8OvR3D7Ga3OT9%2BVTVeoXR20wGXkkZLcaJxEDEptrgtew2OY5RrFPSz7miSYiLbTaU9bfUV8aeIbrPNryglQZfG7Nf0v4KH9ieDnMDsul8NJFDFkiq%2BuC3UYpHO9zKDHnuw%2BE78j9CleisrFZvt09kfVFp6xE%2FvElnRX7GhgNkhyPeQAkwUJP8l%2BlCDzsoHzTfGPplWOV9p9eYrYEvzFOzF15T99Jy50mWmse2KcAtHXKoImiTwDjII57fdywJfdtoPrSUP1pCBk54pZxx1pLoYmFgzfPHCqtdn7GGJrQe9B%2BYJl%2FVhADUeEIMrrJ5mWR6qQnD7PooLHUtP0HuQswsYnI9cKmFUefeKaKwDQ4cc%2BUO%2Fv5S7RXj2wPeDqGOTMZ368FSAwtbTZMlUX72PPqrlG7jYawDh2VRmNDDqhSOFILNA%2BqweQvSNmNQbWesh9zJLzf3Qxxd1mCa95UawNRidNLYkYim%2BLLTh8RL9je1h%2Bf95svuQ687xBwaJEufoBZMMjkLaj1RKTtA8zSwo7dvrkGcOt4uNLRG3%2BGGA%3D%3D&pdp_filters=item_id%3AMLA2404238162#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3457769406&backend_model=search-backend&be_origin=backend&search_layout=grid&position=28&type=pad&tracking_id=d8c9e483-9ec0-4011-9e5f-be34a5ff58d2&wid=MLA2404238162&sid=search) | $56.000 | 19.1% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Cuchilla 21 Pulgadas Para Tractor Jhon Deere 7 Puntas](https://www.mercadolibre.com.ar/cuchilla-21-pulgadas-para-tractor-jhon-deere-7-puntas/up/MLAU3260625058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA2137492956&sid=search) | $31.589 | -32.8% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=&sid=search) | $64.387 | 37.0% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/up/MLAU407576398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=8c68b130-52af-44d2-89b1-3a0e84669856&wid=MLA1437902317&sid=search) | $64.387 | 37.0% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 7 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre.](https://www.mercadolibre.com.ar/cuchilla-2112--para-tractor-42--deere-115-125-135-7-estre/up/MLAU127634743#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=8c68b130-52af-44d2-89b1-3a0e84669856&wid=MLA1439946508&sid=search) | $45.672 | -2.8% | tipo: CUCHILLA |
| 8 | baja | 35 | [Cuchilla Tractor 16,5 Derecha P/bolsa Tractor Castel Xdc140](https://www.mercadolibre.com.ar/cuchilla-tractor-165--derecha-pbolsa-tractor-castel-xdc140/up/MLAU225194875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=fe925694-4f18-4ac5-8035-8d9e43e03b12&wid=MLA1140941044&sid=search) | $44.585 | -5.1% | tipo: CUCHILLA |
| 9 | baja | 35 | [Cuchilla De Corte 38' - M84472](https://www.mercadolibre.com.ar/cuchilla-de-corte-38--m84472/up/MLAU423649509#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=b58a37dc-3c03-40ea-a7fa-52edc8090bea&wid=MLA1859864160&sid=search) | $43.500 | -7.4% | tipo: CUCHILLA |
| 10 | baja | 35 | [Cuchilla De Corte 42' - Gx22151](https://www.mercadolibre.com.ar/cuchilla-de-corte-42--gx22151/up/MLAU2967821263#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=a8cbbc96-037c-4278-ad2c-73632ac565ca&wid=MLA1472563141&sid=search) | $32.000 | -31.9% | tipo: CUCHILLA |
| 11 | baja | 24 | [Repuesto De Patin Para Cosechadora Draper John Deere](https://www.mercadolibre.com.ar/repuesto-de-patin-para-cosechadora-draper-john-deere/up/MLAU393564833#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=d350957f-a899-4d72-89f7-f8f90add3f7f&wid=MLA1825307436&sid=search) | $29.047 | -38.2% | tokens comunes: cosechadora, draper; compatibilidad/marca: John Deere |

### 102. Puntón Cuchilla. John Deere

- ID Venturino: `318859417`
- Precio Venturino: $86.000
- Tokens: punton, cuchilla
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 20 de 22 válidos antes de top
- Candidatos excluidos por precio: 3660
- Candidatos excluidos por score: 1281
- Mediana ML: $96.789
- Venturino vs mediana ML: -11.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 58 | [Cuchillas Para Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-para-tractor-john-deere-42/up/MLAU172143595#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=828f9c52-f045-402d-9a50-f59f40804ca2&wid=MLA775204942&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 2 | baja | 57 | [Sección Cuchilla John Deere H163131 - Prentacc](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=aMpGNOJqJZKk7a%2FVpnPSpIhGRnOOsEjXLGsR9UWnnFYVBnsz5QjKzA%2FxAL9sR5JZ0fQY2WKHFLt1sB5OSZpzwTjWOOJFfhxblSCpnmPrMH5eA4RIp7iYSIObNRQOZ23%2FIGrP3EZXRfadxvFKavIuCHCq3ysdiGBXepPzxT%2F%2F1DmhOEIiuZFNitre9JJFt3y5ulRQ%2FerpXN9GqX%2FHu%2F6VRn9PVkli5Sg8uNSepA1ATMSIAR3lgBW7oF6jqfvKE8MXiEHt1wz41tfuLUd1%2FFqp%2BqPjcjUPzRqceCS%2B%2BauWvCY6u2LBJoSY36DvLQy23bfe1LjnLkuC5reXoBZU8Ob6lSsOmIwAXuFJ4ienmWbIvSrLRjIlRPCU7aL3VztA5HnFS7sKvQSlVBMiwXz3oA8KFaYOpVOVo8mjUlz4auv4bzqeB8yB5j7mDP42iAximFLZMI9diVDkGO2e4AFKgWgO7w1KLUGWQWAhHnyoKPwnAkFNcmMqIWSIfw518%2BUR2f8O0KAGNcfwG0XkEkWBWiyOf80wBizIxHAFuwSXPRRkaM8fG5gC0S1SqIeFMVdRGM02ue97rxJVNQ%2FSssdcyy1pAUGeWm1Q77pigeHcgCmc6uyGwfyf2%2BRP8dAMdHYoQQQfB2BX%2FS%2BhKpWY02ECLOa9sLQO0gHvMccBhpvsz6UKbJpjI1HZrjy37ECGDI651SHFEkW1D0IRM4Yoy4qkhrhvJvciTRCk7OZGu8EkSMJJMC12y%2BqsqvpkHZELIixN%2B47wTqgzIPgfYwluB35g5D01cVYWOsdtpZ1%2BCJIccVl5799amB%2FKaXA9rKFceX9lmahAvCWW9JEowgKfTc%2B40tmuW63mbYNATq%2F5v62eTFlkivxX%2BYrqy9DLoowixbMEYB7cjPfJ6bYJi2GvLGneTBlG9AC4yX68ZGdYWE%2Bhpk8wDo4Cf8j7lS%2BOOBfezrphwYQvUaYFlxduHuGSPWGpl5hPxzKrc9owj%2F3Y6N0NDrg%3D&pdp_filters=item_id%3AMLA1549074995#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3451205653&backend_model=search-backend&be_origin=backend&search_layout=grid&position=26&type=pad&tracking_id=d8c9e483-9ec0-4011-9e5f-be34a5ff58d2&wid=MLA1549074995&sid=search) | $66.000 | -23.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 57 | [Cuchillas Compatible Con Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-compatible-con-tractor-john-deere-42/up/MLAU204286028#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&float_highlight=last_units&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA919160219&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 4 | baja | 57 | [Seccion Cuchilla John Deere Jd226 - Prentacc](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=%2BPAJa5zVObm%2F1RDmAHI%2F3bkwat9QmIA9PT2GXPz7W1zRic5AhckKZfL2G8HBrlRqLI97k7K7wHUKEpOljCjl8nWpbW9MyBuc8jxlwlPrDmXYATr238wcHRWJnHAzqBaWTnoYd0qpX5CoqBAxvInW4y7quE91A%2FKdPTPoq8bC7HntyugrHmcH2kLfGmGwalBc15Iob2qPoMJFD%2F7doLWmOZR0K5u7DnPkG2UqtF4Ta9FFAmVR4CcW4sEy5d250r3tjmF7gRqDjDaOlQkvGP1dvY4hyqu%2BzeZhZKFGyq3WBlVQxyw%2BZki0TVwF6ZIb1BcYElOyhkNb7qFEesOMdEBGlCs72ySAl2D2%2F%2FW%2FVeuuN2e6dZUxjyiCKm3wtW6V1XIeENN9xVKCO1hJQ6NUO6ZltscZ%2FfDMw3H0Y%2BPnpw2hGazS3c6YMwRm3y7u37nEbkHi8OvR3D7Ga3OT9%2BVTVeoXR20wGXkkZLcaJxEDEptrgtew2OY5RrFPSz7miSYiLbTaU9bfUV8aeIbrPNryglQZfG7Nf0v4KH9ieDnMDsul8NJFDFkiq%2BuC3UYpHO9zKDHnuw%2BE78j9CleisrFZvt09kfVFp6xE%2FvElnRX7GhgNkhyPeQAkwUJP8l%2BlCDzsoHzTfGPplWOV9p9eYrYEvzFOzF15T99Jy50mWmse2KcAtHXKoImiTwDjII57fdywJfdtoPrSUP1pCBk54pZxx1pLoYmFgzfPHCqtdn7GGJrQe9B%2BYJl%2FVhADUeEIMrrJ5mWR6qQnD7PooLHUtP0HuQswsYnI9cKmFUefeKaKwDQ4cc%2BUO%2Fv5S7RXj2wPeDqGOTMZ368FSAwtbTZMlUX72PPqrlG7jYawDh2VRmNDDqhSOFILNA%2BqweQvSNmNQbWesh9zJLzf3Qxxd1mCa95UawNRidNLYkYim%2BLLTh8RL9je1h%2Bf95svuQ687xBwaJEufoBZMMjkLaj1RKTtA8zSwo7dvrkGcOt4uNLRG3%2BGGA%3D%3D&pdp_filters=item_id%3AMLA2404238162#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3457769406&backend_model=search-backend&be_origin=backend&search_layout=grid&position=28&type=pad&tracking_id=d8c9e483-9ec0-4011-9e5f-be34a5ff58d2&wid=MLA2404238162&sid=search) | $56.000 | -34.9% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 5 | baja | 56 | [Juego Cuchillas John Deere La 135 Código M154061 Oregon](https://www.mercadolibre.com.ar/juego-cuchillas-john-deere-la-135-codigo-m154061-oregon/up/MLAU134201412#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=MLA847129327&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 6 | baja | 56 | [Juego Cuchillas Oregon 92-110 John Deere La 125](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-92110-john-deere-la-125/up/MLAU130693017#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&float_highlight=last_units&tracking_id=828f9c52-f045-402d-9a50-f59f40804ca2&wid=MLA834167453&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 7 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU1073488312#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=088d5e8f-aead-4035-96f6-3702e2e151f9&wid=MLA1140948761&sid=search) | $98.048 | 14.0% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 8 | baja | 56 | [Repuestos John Deere - Jgo. De Cuchillas - 46 - M41967](https://www.mercadolibre.com.ar/repuestos-john-deere--jgo-de-cuchillas--46--m41967/up/MLAU3736924947#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=b58a37dc-3c03-40ea-a7fa-52edc8090bea&wid=MLA2794779068&sid=search) | $72.600 | -15.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 9 | baja | 56 | [Juego Cuchillas Tractor John Deere 42 Pulgadas Usa](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-john-deere--42-pulgadas-usa/up/MLAU155628101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=product&float_highlight=last_units&tracking_id=9d9eea27-e8d4-4e1b-bf47-fe8bb5571b95&wid=MLA1266340056&sid=search) | $71.999 | -16.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 10 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU190037463#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=MLA910245048&sid=search) | $107.990 | 25.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 11 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU127559107#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=MLA1439970672&sid=search) | $112.816 | 31.2% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 12 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU306728158#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=dc1cda0b-5edd-4d71-a84c-51789b2bf6ba&wid=MLA910215527&sid=search) | $113.862 | 32.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 13 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU152184233#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=97811c45-313f-4027-b262-d1cdafb71c75&wid=MLA1152796939&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 14 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU260942932#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=MLA1536195876&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 15 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU124341980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=MLA1163468541&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 16 | baja | 55 | [Juego Cuchillas Para John Deere 38pul Centro 45/64 17,8mm](https://www.mercadolibre.com.ar/juego-cuchillas-para-john-deere-38pul-centro-4564-178mm/up/MLAU140173189#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&float_highlight=last_unit&tracking_id=f1a1e76c-b06c-4064-b27a-37abc02f9326&wid=MLA1106046608&sid=search) | $75.000 | -12.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 17 | baja | 55 | [Correa Cuchilla 38 Sabre John Deere Reemplaza M122674 Oregon](https://www.mercadolibre.com.ar/correa-cuchilla-38-sabre-john-deere-reemplaza-m122674-oregon/up/MLAU127047057#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=MLA1400582119&sid=search) | $73.578 | -14.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 18 | baja | 55 | [Juego Cuchillas Tractor 54 John Deere D170 La150 La170 X 3](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-54-john-deere-d170-la150-la170-x-3/up/MLAU288219362#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&float_highlight=last_units&tracking_id=d5b0e01d-6cdb-4842-8391-b02d1a271408&wid=MLA827797148&sid=search) | $101.200 | 17.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 19 | baja | 55 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=5f858476-b880-406b-9dd7-896e07160604&wid=&sid=search) | $64.387 | -25.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 20 | baja | 55 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/up/MLAU407576398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=8c68b130-52af-44d2-89b1-3a0e84669856&wid=MLA1437902317&sid=search) | $64.387 | -25.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |

### 103. Punzón central John Deere

- ID Venturino: `276196693`
- Precio Venturino: $15.000
- Tokens: punzon, central
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4287
- Candidatos excluidos por score: 676
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 104. Set de Asado Fuego John Deere

- ID Venturino: `338259447`
- Precio Venturino: $100.000
- Tokens: set, asado, fuego
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3607
- Candidatos excluidos por score: 1356
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 105. Set de construcción John Deere

- ID Venturino: `281259374`
- Precio Venturino: $55.000
- Tokens: set, construccion
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3859
- Candidatos excluidos por score: 1104
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 106. Set de Extensión John Deere

- ID Venturino: `276196673`
- Precio Venturino: $37.000
- Tokens: set, extension
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3963
- Candidatos excluidos por score: 1000
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 107. Set de Farmin Friends John Deere

- ID Venturino: `281259388`
- Precio Venturino: $58.000
- Tokens: set, farmin, friend
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 20 de 32 válidos antes de top
- Candidatos excluidos por precio: 3898
- Candidatos excluidos por score: 1033
- Mediana ML: $64.834
- Venturino vs mediana ML: -10.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2160207414&sid=search) | $63.677 | 9.8% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3036951256&sid=search) | $74.945 | 29.2% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | 31.3% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Pedal En X Inverso Con Almohadilla De Goma Para John Deere 4](https://www.mercadolibre.com.ar/pedal-en-x-inverso-con-almohadilla-de-goma-para-john-deere-4/up/MLAU4068558355#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA3448674046&sid=search) | $56.109 | -3.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | -4.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | -5.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | 9.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Ertl Collect N Play John Deere Angus Bull](https://www.mercadolibre.com.ar/ertl-collect-n-play-john-deere-angus-bull/up/MLAU4001542687#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2168860624&sid=search) | $63.370 | 9.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25&wid=MLA2792533012&sid=search) | $52.000 | -10.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677885959&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1725054925&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1606696085&sid=search) | $50.000 | -13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf&wid=MLA3370300548&sid=search) | $48.540 | -16.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | 18.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | 19.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | 21.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2378379950&sid=search) | $74.177 | 27.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2168937218&sid=search) | $75.037 | 29.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&float_highlight=last_units&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1588571170&sid=search) | $39.775 | -31.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Minicargadora John Deere Tomy De 318 G (escala 1:32), Amaril](https://www.mercadolibre.com.ar/john-deere-tomy-318g-skid-steer-132-scale-yellow/p/MLA2032163458#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3374563228&sid=search) | $76.787 | 32.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 108. Set de latas John Deere

- ID Venturino: `276148810`
- Precio Venturino: $20.000
- Tokens: set, lata
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4309
- Candidatos excluidos por score: 654
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 109. Set de latas verdes John Deere

- ID Venturino: `276146451`
- Precio Venturino: $20.000
- Tokens: set, lata, verd
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4309
- Candidatos excluidos por score: 654
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 110. Set de tractor y camión volquete John Deere

- ID Venturino: `281053465`
- Precio Venturino: $60.000
- Tokens: set, tractor, camion, volquete
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 17
- Candidatos usados: 20 de 33 válidos antes de top
- Candidatos excluidos por precio: 3879
- Candidatos excluidos por score: 1051
- Mediana ML: $67.490
- Venturino vs mediana ML: -11.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 78 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | 26.9% | tipo: JUGUETE; tokens comunes: set, tractor, camion, volquete; compatibilidad/marca: John Deere |
| 2 | media | 67 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2160207414&sid=search) | $63.677 | 6.1% | tipo: JUGUETE; tokens comunes: set, camion, volquete; compatibilidad/marca: John Deere |
| 3 | media | 58 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | 5.5% | tipo: JUGUETE; tokens comunes: tractor, camion; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3036951256&sid=search) | $74.945 | 24.9% | tipo: JUGUETE; tokens comunes: set, tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1606696085&sid=search) | $50.000 | -16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | 34.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | -8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | -8.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677885959&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | 15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | 15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | 17.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-7215r-ertl-164-verde/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA1717056337&sid=search) | $80.041 | 33.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | 37.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf&wid=MLA3370300548&sid=search) | $48.540 | -19.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2378379950&sid=search) | $74.177 | 23.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | media | 47 | [Set De Granja John Deere Ertl Mini 10 Piezas Con Tractor De](https://www.mercadolibre.com.ar/set-de-granja-john-deere-ertl-mini-10-piezas-con-tractor-de/p/MLA2092585928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA1832901023&sid=search) | $77.877 | 29.8% | tipo: JUGUETE; penalización tipo adicional candidato: HERRAMIENTA; tokens comunes: set, tractor; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Ertl Collect N Play John Deere Angus Bull](https://www.mercadolibre.com.ar/ertl-collect-n-play-john-deere-angus-bull/up/MLAU4001542687#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2168860624&sid=search) | $63.370 | 5.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Pedal En X Inverso Con Almohadilla De Goma Para John Deere 4](https://www.mercadolibre.com.ar/pedal-en-x-inverso-con-almohadilla-de-goma-para-john-deere-4/up/MLAU4068558355#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA3448674046&sid=search) | $56.109 | -6.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1725054925&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 111. Termo Iguazu Verde John Deere

- ID Venturino: `276157118`
- Precio Venturino: $90.000
- Tokens: termo, iguazu, verde
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 1 válidos antes de top
- Candidatos excluidos por precio: 3657
- Candidatos excluidos por score: 1305
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 112. Termo IVY Verde John Deere

- ID Venturino: `276155584`
- Precio Venturino: $90.000
- Tokens: termo, ivy, verde
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 1 válidos antes de top
- Candidatos excluidos por precio: 3657
- Candidatos excluidos por score: 1305
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 113. Tractir 8RX 410 Con orugas John Deere

- ID Venturino: `281234442`
- Precio Venturino: $85.000
- Tokens: tractor, 8rx, 410, oruga
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 101 válidos antes de top
- Candidatos excluidos por precio: 3652
- Candidatos excluidos por score: 1210
- Mediana ML: $85.890
- Venturino vs mediana ML: -1.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | 20.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | -0.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6c2508d7-0313-410b-aeb1-1fc19b8b3471&wid=MLA3078939230&sid=search) | $85.706 | 0.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | 1.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | -3.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA2842120858&sid=search) | $87.855 | 3.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-7215r-ertl-164-verde/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA1717056337&sid=search) | $80.041 | -5.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | 6.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | 6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA784333319&sid=search) | $91.877 | 8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | -10.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA3214114070&sid=search) | $95.000 | 11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3036951256&sid=search) | $74.945 | -11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3051637704&sid=search) | $96.406 | 13.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | -17.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | -18.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | -18.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 114. Tractor 32 JD 8R John Deere Prestige

- ID Venturino: `281259419`
- Precio Venturino: $311.000
- Tokens: tractor, 32, 8r, prestige
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 142 válidos antes de top
- Candidatos excluidos por precio: 4333
- Candidatos excluidos por score: 488
- Mediana ML: $300.254
- Venturino vs mediana ML: 3.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1501324025&sid=search) | $209.218 | -32.7% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 67 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=153bbf99-bb8a-4226-8b48-4c7b7301bb93&wid=MLA1585559315&sid=search) | $240.000 | -22.8% | tipo: JUGUETE; tokens comunes: tractor, 32, prestige; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1782656432&sid=search) | $291.302 | -6.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1507969023&sid=search) | $288.367 | -7.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 5 | media | 57 | [Tractor John Deere 630 1:16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-630-116-coleccion-prestige/up/MLAU4082684090#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1831321295&sid=search) | $401.099 | 29.0% | tipo: JUGUETE; tokens comunes: tractor, prestige; compatibilidad/marca: John Deere |
| 6 | media | 57 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7c4b4c2d-771f-4b6a-adc8-d78211943afa&wid=MLA3117507902&sid=search) | $420.000 | 35.0% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 7 | media | 57 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA2555019084&sid=search) | $199.880 | -35.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 8 | media | 57 | [Tractor John Deere 4430 A Escala 1/16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-4430-116-scale-prestige-collection/p/MLA2083556655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d&wid=MLA3418164804&sid=search) | $430.005 | 38.3% | tipo: JUGUETE; tokens comunes: tractor, prestige; compatibilidad/marca: John Deere |
| 9 | media | 56 | [Colección John Deere Prestige X9 1000 Combine, Escala 1:32](https://www.mercadolibre.com.ar/john-deere-prestige-collection-x9-1000-combine-132-scale/p/MLA2076857598#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA1678240327&sid=search) | $362.336 | 16.5% | tipo: JUGUETE; tokens comunes: 32, prestige; compatibilidad/marca: John Deere |
| 10 | media | 56 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://www.mercadolibre.com.ar/tractor-miniatura-john-deere-4250-con-fwa-y-cabina-132-verde/p/MLA54486376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA1688046131&sid=search) | $238.280 | -23.4% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 11 | media | 56 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1537554751&sid=search) | $394.031 | 26.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 12 | media | 51 | [Tractor De Juguete Verde 1 32 Con Remolque Y Disco](https://www.mercadolibre.com.ar/tractor-de-juguete-verde-1-32-con-remolque-y-disco/up/MLAU3629093285#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA2605756500&sid=search) | $297.761 | -4.3% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 13 | media | 51 | [Tractor De Colección Metalizado 1/32 Con Ruedas Simples](https://www.mercadolibre.com.ar/tractor-de-coleccion-metalizado-132-con-ruedas-simples/up/MLAU3636789934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1594244033&sid=search) | $280.966 | -9.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 14 | media | 50 | [Set Granja 1 32 Tractor Metal Y Animales Juguete Niño](https://www.mercadolibre.com.ar/set-granja-1-32-tractor-metal-y-animales-juguete-nino/up/MLAU3629077203#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA2605820936&sid=search) | $302.747 | -2.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 15 | media | 50 | [Antiguo Tractor A Escala John Deere](https://www.mercadolibre.com.ar/antiguo-tractor-a-escala-john-deere/up/MLAU4067955603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1831356015&sid=search) | $189.800 | -39.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Rociador Juguete Escala 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/rociador-juguete-escala-132-john-deere--a-pedidoexkarg/up/MLAU368494041#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1766427200&sid=search) | $322.795 | 3.8% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1949971056&sid=search) | $323.265 | 3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1514896991&sid=search) | $293.399 | -5.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1417510473&sid=search) | $332.793 | 7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1503208905&sid=search) | $332.996 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 115. Tractor 435 Replica John Deere

- ID Venturino: `281234444`
- Precio Venturino: $202.000
- Tokens: tractor, 435, replica
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 159 válidos antes de top
- Candidatos excluidos por precio: 3982
- Candidatos excluidos por score: 822
- Mediana ML: $195.322
- Venturino vs mediana ML: 3.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1583656447&sid=search) | $259.000 | 28.2% | tipo: JUGUETE; tokens técnicos: 435; tokens comunes: tractor, 435; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Réplica Del Tractor John Deere 3010 De Juguete A Escala 1/16](https://www.mercadolibre.com.ar/toy-john-deere-3010-tractor-116-scale-replica/p/MLA2077440206#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1678240307&sid=search) | $187.147 | -7.4% | tipo: JUGUETE; tokens comunes: tractor, replica; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Antiguo Tractor A Escala John Deere](https://www.mercadolibre.com.ar/antiguo-tractor-a-escala-john-deere/up/MLAU4067955603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1831356015&sid=search) | $189.800 | -6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA2194899840&sid=search) | $187.899 | -7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tomy John Deere Johnny Tractor Ride En Juguete Juguete De De](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2182318240&sid=search) | $221.273 | 9.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1688853331&sid=search) | $137.348 | -32.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1784581058&sid=search) | $270.242 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA2555019084&sid=search) | $199.880 | -1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Toy John Deere 3020 A Escala 1/16 Celebración](https://articulo.mercadolibre.com.ar/MLA-1763449927-tractor-toy-john-deere-3020-a-escala-116-celebracion-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $204.847 | 1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1950555252&sid=search) | $198.353 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Bruder John Deere Tractor 5115 2022 1:16 - Verde](https://www.mercadolibre.com.ar/bruder-john-deere-tractor-5115-2022-116--verde/up/MLAU153770758#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA1163263641&sid=search) | $195.499 | -3.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Actividades Ride On Toy John Deere Sit 'n Scoot,](https://www.mercadolibre.com.ar/ride-on-toy-john-deere-sit-n-scoot-activity-tractor-green/p/MLA2041333172#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1634639005&sid=search) | $195.145 | -3.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1501324025&sid=search) | $209.218 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete John Deere 5115 M Con Remolque A Escala 1](https://www.mercadolibre.com.ar/toy-tractor-john-deere-5115m-w-trailer-116-scale-bruder/p/MLA2056619387#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1654544791&sid=search) | $181.697 | -10.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere 4020 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-4020-164--a-pedidoexkarg/up/MLAU2803971639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1461201863&sid=search) | $179.991 | -10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor 2021 Ertl 1:64 John Deere 8960 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2021-ertl-164-john-deere-8960--a-pedidoexkarg/up/MLAU3920195868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA3219582450&sid=search) | $179.880 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete John Deere 3020 Escala 1/16 Celebration](https://www.mercadolibre.com.ar/tractor-toy-john-deere-3020-116-scale-celebration/p/MLA2082879124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1763605549&sid=search) | $225.694 | 11.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1609083934&sid=search) | $227.227 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Coleccion John Deere 9470rx Toy - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-9470rx-toy--a-pedidoexkarg/up/MLAU150165852#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=aee3b9cd-e14b-4e3c-824b-f5d9b028006d&wid=MLA1141831682&sid=search) | $175.436 | -13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere 1:64 50th Anniversary Edition_exkarg](https://www.mercadolibre.com.ar/tractor--john-deere-164-50th-anniversary-editionexkarg/up/MLAU3037093501#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA2021607916&sid=search) | $174.180 | -13.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 116. Tractor 6210R Bif Farm John Deere

- ID Venturino: `281234446`
- Precio Venturino: $262.000
- Tokens: tractor, 6210r, bif, farm
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 148 válidos antes de top
- Candidatos excluidos por precio: 4219
- Candidatos excluidos por score: 596
- Mediana ML: $267.616
- Venturino vs mediana ML: -2.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor John Deere 6210r De Juguete Con Sembradora 1700 1/16](https://www.mercadolibre.com.ar/toy-john-deere-6210r-tractor-with-1700-planter-116/p/MLA2078513263#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3320857732&sid=search) | $275.847 | 5.3% | tipo: JUGUETE; tokens técnicos: 6210r; tokens comunes: tractor, 6210r; compatibilidad/marca: John Deere |
| 2 | alta | 71 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1609083934&sid=search) | $227.227 | -13.3% | tipo: JUGUETE; tokens técnicos: 6210r; tokens comunes: tractor, 6210r; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Tractor De Juguete John Deere Big Farm Con Vagón A Escala 1:](https://www.mercadolibre.com.ar/john-deere-big-farm-tractor-and-wagon-116-scale-ligh/p/MLA2038130505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3382284296&sid=search) | $271.472 | 3.6% | tipo: JUGUETE; tokens comunes: tractor, farm; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Antiguo Tractor A Escala John Deere](https://www.mercadolibre.com.ar/antiguo-tractor-a-escala-john-deere/up/MLAU4067955603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1831356015&sid=search) | $189.800 | -27.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1583656447&sid=search) | $259.000 | -1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1949945520&sid=search) | $265.905 | 1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1476358051&sid=search) | $269.326 | 2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Juguete John Deere 1/50 843l - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-150-843l--a-pedidoexkarg/up/MLAU375792789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1784542220&sid=search) | $270.089 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1784581058&sid=search) | $270.242 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete John Deere De Estilo Temprano A Escala 1/](https://articulo.mercadolibre.com.ar/MLA-3096031022-tractor-de-juguete-john-deere-de-estilo-temprano-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $273.114 | 4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1571921115&sid=search) | $245.000 | -6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=153bbf99-bb8a-4226-8b48-4c7b7301bb93&wid=MLA1585559315&sid=search) | $240.000 | -8.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Big Farm John Deere 318g - Juego De Juguetes De](https://www.mercadolibre.com.ar/big-farm-john-deere-318g--juego-de-juguetes-de/up/MLAU3118018951#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=3cb74909-cbdd-483f-bc52-9ca15b695c2b&wid=MLA2051252588&sid=search) | $239.882 | -8.4% | tipo: JUGUETE; tokens comunes: farm; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1763349785&sid=search) | $284.352 | 8.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor 1/64 John Deere 8400 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8400--a-pedidoexkarg/up/MLAU2670938419#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1949431358&sid=search) | $238.267 | -9.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1507969023&sid=search) | $288.367 | 10.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1782656432&sid=search) | $291.302 | 11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1514896991&sid=search) | $293.399 | 12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA2138660238&sid=search) | $230.189 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete John Deere 3020 Escala 1/16 Celebration](https://www.mercadolibre.com.ar/tractor-toy-john-deere-3020-116-scale-celebration/p/MLA2082879124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1763605549&sid=search) | $225.694 | -13.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 117. Tractor 64 JD 7R 330 Row Crop John Deere

- ID Venturino: `281259425`
- Precio Venturino: $92.000
- Tokens: tractor, 64, 7r, 330, row, crop
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 116 válidos antes de top
- Candidatos excluidos por precio: 3658
- Candidatos excluidos por score: 1189
- Mediana ML: $92.585
- Venturino vs mediana ML: -0.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | -2.2% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA3214114070&sid=search) | $95.000 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-7215r-ertl-164-verde/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af&wid=MLA1717056337&sid=search) | $80.041 | -13.0% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1835352944&sid=search) | $112.120 | 21.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | -25.0% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677885959&sid=search) | $65.990 | -28.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1472790549&sid=search) | $119.425 | 29.8% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 8 | media | 56 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA3141293538&sid=search) | $122.099 | 32.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 9 | media | 55 | [Tractor 2025 Ertl 1:64 John Deere 4955 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2025-ertl-164-john-deere-4955--a-pedidoexkarg/up/MLAU3262907220#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA2141477802&sid=search) | $113.994 | 23.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | -8.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | -10.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | 11.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -12.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Ertl Segadora John Deere W260r 1:64](https://www.mercadolibre.com.ar/ertl-segadora-john-deere-w260r-164/up/MLAU3565085905#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA2578658354&sid=search) | $105.000 | 14.1% | tipo: JUGUETE; tokens comunes: 64; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Ertl 1/64 Allis Chalmers 7080 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-allis-chalmers-7080---a-pedidoexkarg/up/MLAU3840056786#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1696062683&sid=search) | $108.990 | 18.5% | tipo: JUGUETE; tokens comunes: tractor, 64 |
| 18 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | -23.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor Ertl 1/64 Farmall 856 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-farmall-856--a-pedidoexkarg/up/MLAU3829949507#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA3029841282&sid=search) | $114.990 | 25.0% | tipo: JUGUETE; tokens comunes: tractor, 64 |
| 20 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2860958990&sid=search) | $119.847 | 30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 118. Tractor 6410 John Deere

- ID Venturino: `281053456`
- Precio Venturino: $400.000
- Tokens: tractor, 6410
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 121 válidos antes de top
- Candidatos excluidos por precio: 4397
- Candidatos excluidos por score: 445
- Mediana ML: $396.179
- Venturino vs mediana ML: 1.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens técnicos: 6410; tokens comunes: tractor, 6410; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor John Deere 630 1:16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-630-116-coleccion-prestige/up/MLAU4082684090#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1831321295&sid=search) | $401.099 | 0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1493524125&sid=search) | $501.990 | 25.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1514896991&sid=search) | $293.399 | -26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1507969023&sid=search) | $288.367 | -27.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU4048783911#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3427759746&sid=search) | $526.699 | 31.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Pala Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-pala-frontal/up/MLAU4063180058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3427874184&sid=search) | $526.699 | 31.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete John Deere De Estilo Temprano A Escala 1/](https://articulo.mercadolibre.com.ar/MLA-3096031022-tractor-de-juguete-john-deere-de-estilo-temprano-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $273.114 | -31.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1949945520&sid=search) | $265.905 | -33.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1571921115&sid=search) | $245.000 | -38.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1503458191&sid=search) | $555.586 | 38.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=153bbf99-bb8a-4226-8b48-4c7b7301bb93&wid=MLA1585559315&sid=search) | $240.000 | -40.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2550302558&sid=search) | $380.389 | -4.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 119. Tractor 8320R con disco 637John Deere

- ID Venturino: `281259399`
- Precio Venturino: $102.000
- Tokens: tractor, 8320r, disco, 637john
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 5
- Candidatos usados: 20 de 135 válidos antes de top
- Candidatos excluidos por precio: 3604
- Candidatos excluidos por score: 1224
- Mediana ML: $102.869
- Venturino vs mediana ML: -0.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=item&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92) | $105.540 | 3.5% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 2 | alta | 75 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | -15.6% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 3 | alta | 73 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6c2508d7-0313-410b-aeb1-1fc19b8b3471&wid=MLA3078939230&sid=search) | $85.706 | -16.0% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 4 | alta | 73 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA1557066483&sid=search) | $142.598 | 39.8% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 5 | alta | 72 | [Ertl John Deere 8320r Tractor Y Modelo 637 Disco Set (1:6...](https://articulo.mercadolibre.com.ar/MLA-2414668928-ertl-john-deere-8320r-tractor-y-modelo-637-disco-set-16-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=item&float_highlight=last_units&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f) | $88.454 | -13.3% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 6 | baja | 44 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | 0.7% | tipo: JUGUETE; tokens comunes: tractor |
| 7 | baja | 44 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -11.8% | tipo: JUGUETE; tokens comunes: tractor |
| 8 | baja | 44 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -20.9% | tipo: JUGUETE; tokens comunes: tractor |
| 9 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3090752210&sid=search) | $103.022 | 1.0% | tipo: JUGUETE; tokens comunes: tractor |
| 10 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1588501493&sid=search) | $103.022 | 1.0% | tipo: JUGUETE; tokens comunes: tractor |
| 11 | baja | 43 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1791146511&sid=search) | $103.252 | 1.2% | tipo: JUGUETE; tokens comunes: tractor |
| 12 | baja | 43 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=19&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $103.897 | 1.9% | tipo: JUGUETE; tokens comunes: tractor |
| 13 | baja | 43 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2588150140&sid=search) | $105.309 | 3.2% | tipo: JUGUETE; tokens comunes: tractor |
| 14 | baja | 43 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3051637704&sid=search) | $96.406 | -5.5% | tipo: JUGUETE; tokens comunes: tractor |
| 15 | baja | 43 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA3214114070&sid=search) | $95.000 | -6.9% | tipo: JUGUETE; tokens comunes: tractor |
| 16 | baja | 43 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1588597639&sid=search) | $109.070 | 6.9% | tipo: JUGUETE; tokens comunes: tractor |
| 17 | baja | 43 | [Tractor A Escala Siku - Mercedes Benz](https://www.mercadolibre.com.ar/tractor-a-escala-siku--mercedes-benz/up/MLAU3633279196#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2601298402&sid=search) | $94.800 | -7.1% | tipo: JUGUETE; tokens comunes: tractor |
| 18 | baja | 43 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=23&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $109.992 | 7.8% | tipo: JUGUETE; tokens comunes: tractor |
| 19 | baja | 43 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1835352944&sid=search) | $112.120 | 9.9% | tipo: JUGUETE; tokens comunes: tractor |
| 20 | baja | 43 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA784333319&sid=search) | $91.877 | -9.9% | tipo: JUGUETE; tokens comunes: tractor |

### 120. Tractor 9470RX John Deere

- ID Venturino: `281222478`
- Precio Venturino: $95.000
- Tokens: tractor, 9470rx
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 122 válidos antes de top
- Candidatos excluidos por precio: 3630
- Candidatos excluidos por score: 1211
- Mediana ML: $90.355
- Venturino vs mediana ML: 5.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | 8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA3214114070&sid=search) | $95.000 | 0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3051637704&sid=search) | $96.406 | 1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA784333319&sid=search) | $91.877 | -3.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | -4.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | -5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | -5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA2842120858&sid=search) | $87.855 | -7.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1791146511&sid=search) | $103.252 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=19&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $103.897 | 9.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | -9.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=item&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92) | $105.540 | 11.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | -11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | -13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=23&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $109.992 | 15.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor De Juguete Tomy John Deere De Plástico Verde Para Ni](https://articulo.mercadolibre.com.ar/MLA-1556356895-tractor-de-juguete-tomy-john-deere-de-plastico-verde-para-ni-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $113.584 | 19.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | -19.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3036951256&sid=search) | $74.945 | -21.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 121. Tractor 9620RX John Deere

- ID Venturino: `281259422`
- Precio Venturino: $630.000
- Tokens: tractor, 9620rx
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 68 válidos antes de top
- Candidatos excluidos por precio: 4529
- Candidatos excluidos por score: 366
- Mediana ML: $490.490
- Venturino vs mediana ML: 28.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 52 | [Tractor De Pedales John Deere Para Niños](https://www.mercadolibre.com.ar/tractor-de-pedales-john-deere-para-ninos/up/MLAU4074100363#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1833265019&sid=search) | $581.108 | -7.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA3260069348&sid=search) | $578.990 | -8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA2735955816&sid=search) | $562.971 | -10.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1503458191&sid=search) | $555.586 | -11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU4048783911#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3427759746&sid=search) | $526.699 | -16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Pala Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-pala-frontal/up/MLAU4063180058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3427874184&sid=search) | $526.699 | -16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1493524125&sid=search) | $501.990 | -20.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1165962632&sid=search) | $475.779 | -24.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1462618659&sid=search) | $452.361 | -28.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1241574644&sid=search) | $420.295 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor John Deere 630 1:16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-630-116-coleccion-prestige/up/MLAU4082684090#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1831321295&sid=search) | $401.099 | -36.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1534604385&sid=search) | $399.880 | -36.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1767841826&sid=search) | $398.326 | -36.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor Ertl 1/32 John Deere 9r 590 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-132-john-deere-9r-590--a-pedidoexkarg/up/MLAU2910027843#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1984193972&sid=search) | $652.589 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1504753813&sid=search) | $554.343 | -12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1422054560&sid=search) | $733.573 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA3229211686&sid=search) | $478.990 | -24.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1501340737&sid=search) | $439.275 | -30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere 4430 A Escala 1/16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-4430-116-scale-prestige-collection/p/MLA2083556655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d&wid=MLA3418164804&sid=search) | $430.005 | -31.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7c4b4c2d-771f-4b6a-adc8-d78211943afa&wid=MLA3117507902&sid=search) | $420.000 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 122. Tractor Baler y vagon John Deere

- ID Venturino: `281222474`
- Precio Venturino: $94.000
- Tokens: tractor, baler, vagon
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 121 válidos antes de top
- Candidatos excluidos por precio: 3624
- Candidatos excluidos por score: 1218
- Mediana ML: $90.093
- Venturino vs mediana ML: 4.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | -4.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | 9.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | -10.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | -12.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -14.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | -25.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2860958990&sid=search) | $119.847 | 27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=7a1692f9-9d61-4ed1-a54c-b01fdfc4cd57&wid=MLA2797531354&sid=search) | $120.477 | 28.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | -32.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA3214114070&sid=search) | $95.000 | 1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA784333319&sid=search) | $91.877 | -2.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3051637704&sid=search) | $96.406 | 2.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | -3.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | -4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA2842120858&sid=search) | $87.855 | -6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | -8.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=6c2508d7-0313-410b-aeb1-1fc19b8b3471&wid=MLA3078939230&sid=search) | $85.706 | -8.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3090752210&sid=search) | $103.022 | 9.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1588501493&sid=search) | $103.022 | 9.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 123. Tractor con vagón John Deere

- ID Venturino: `281053467`
- Precio Venturino: $71.000
- Tokens: tractor, vagon
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 64 válidos antes de top
- Candidatos excluidos por precio: 3730
- Candidatos excluidos por score: 1169
- Mediana ML: $78.430
- Venturino vs mediana ML: -9.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | 13.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | -1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA3036951256&sid=search) | $74.945 | 5.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=7&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $76.127 | 7.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | -10.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1575273767&sid=search) | $82.421 | 16.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA3082491710&sid=search) | $84.324 | 18.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=fc60b472-db50-4f4f-98ae-74956437e9af) | $86.074 | 21.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | -22.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | -22.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=c2c7153e-5740-47bb-a667-7a6a9d26bdeb&wid=MLA2842120858&sid=search) | $87.855 | 23.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d99b3719-c8da-43d4-98e7-b708aae40031&wid=MLA2450624614&sid=search) | $90.016 | 26.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2351763726&sid=search) | $90.169 | 27.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | 27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA784333319&sid=search) | $91.877 | 29.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 124. Tractor de pala grande John Deere de 21" con cargador

- ID Venturino: `281259417`
- Precio Venturino: $580.000
- Tokens: tractor, pala, grande, 21, cargador
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 77 válidos antes de top
- Candidatos excluidos por precio: 4495
- Candidatos excluidos por score: 391
- Mediana ML: $490.490
- Venturino vs mediana ML: 18.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA2735955816&sid=search) | $562.971 | -2.9% | tipo: JUGUETE; tokens comunes: tractor, cargador; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU4048783911#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3427759746&sid=search) | $526.699 | -9.2% | tipo: JUGUETE; tokens comunes: tractor, cargador; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Pala Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-pala-frontal/up/MLAU4063180058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA3427874184&sid=search) | $526.699 | -9.2% | tipo: JUGUETE; tokens comunes: tractor, pala; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Pedales John Deere Para Niños](https://www.mercadolibre.com.ar/tractor-de-pedales-john-deere-para-ninos/up/MLAU4074100363#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1833265019&sid=search) | $581.108 | 0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA3260069348&sid=search) | $578.990 | -0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1503458191&sid=search) | $555.586 | -4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1493524125&sid=search) | $501.990 | -13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1165962632&sid=search) | $475.779 | -18.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1462618659&sid=search) | $452.361 | -22.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1241574644&sid=search) | $420.295 | -27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor John Deere 630 1:16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-630-116-coleccion-prestige/up/MLAU4082684090#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=6d68b2be-f2cb-492c-b04e-72818db47396&wid=MLA1831321295&sid=search) | $401.099 | -30.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1534604385&sid=search) | $399.880 | -31.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1767841826&sid=search) | $398.326 | -31.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1504753813&sid=search) | $554.343 | -4.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Tractor Ertl 1/32 John Deere 9r 590 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-132-john-deere-9r-590--a-pedidoexkarg/up/MLAU2910027843#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=c3581e04-a902-4320-9520-12a8278bcddd&wid=MLA1984193972&sid=search) | $652.589 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA3229211686&sid=search) | $478.990 | -17.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1501340737&sid=search) | $439.275 | -24.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Tractor John Deere 4430 A Escala 1/16 Colección Prestige](https://www.mercadolibre.com.ar/tractor-john-deere-4430-116-scale-prestige-collection/p/MLA2083556655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=42065260-08fa-4059-bf5f-0593b383b57d&wid=MLA3418164804&sid=search) | $430.005 | -25.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1422054560&sid=search) | $733.573 | 26.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7c4b4c2d-771f-4b6a-adc8-d78211943afa&wid=MLA3117507902&sid=search) | $420.000 | -27.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 125. Tractor J7R 330 John Deere Prestige

- ID Venturino: `281259428`
- Precio Venturino: $112.000
- Tokens: tractor, j7r, 330, prestige
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 147 válidos antes de top
- Candidatos excluidos por precio: 3565
- Candidatos excluidos por score: 1251
- Mediana ML: $109.531
- Venturino vs mediana ML: 2.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | -8.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -19.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -27.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=b78ff13f-f6b4-42ca-aaf7-61c358760bd3&wid=MLA1835352944&sid=search) | $112.120 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor De Juguete Tomy John Deere De Plástico Verde Para Ni](https://articulo.mercadolibre.com.ar/MLA-1556356895-tractor-de-juguete-tomy-john-deere-de-plastico-verde-para-ni-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $113.584 | 1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=23&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $109.992 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1588597639&sid=search) | $109.070 | -2.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=item&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92) | $105.540 | -5.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Controlado Por Radio John Deere Johnny Tractor Green](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1992858294&sid=search) | $118.665 | 6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2588150140&sid=search) | $105.309 | -6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tomy John Deere Tractor Toys Set Económico Y Estuche De De 3](https://www.mercadolibre.com.ar/toy-set-john-deere-value-w-carrying-case-18-farm-toys-3/p/MLA2063188934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2587960726&sid=search) | $118.926 | 6.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1472790549&sid=search) | $119.425 | 6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2860958990&sid=search) | $119.847 | 7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=19&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $103.897 | -7.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=7a1692f9-9d61-4ed1-a54c-b01fdfc4cd57&wid=MLA2797531354&sid=search) | $120.477 | 7.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1791146511&sid=search) | $103.252 | -7.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3090752210&sid=search) | $103.022 | -8.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1588501493&sid=search) | $103.022 | -8.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA3141293538&sid=search) | $122.099 | 9.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Set De Juguetes John Deere Haying A Escala 1/32 Con Tractor,](https://articulo.mercadolibre.com.ar/MLA-2470290950-set-de-juguetes-john-deere-haying-a-escala-132-con-tractor-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=item&tracking_id=a34d652f-45ea-4650-981c-774c805cf88f) | $127.523 | 13.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 126. Tractor John Deere 6210R

- ID Venturino: `281259398`
- Precio Venturino: $122.000
- Tokens: tractor, 6210r
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 157 válidos antes de top
- Candidatos excluidos por precio: 3577
- Candidatos excluidos por score: 1229
- Mediana ML: $107.766
- Venturino vs mediana ML: 13.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA3197623976&sid=search) | $102.715 | -15.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA2545404244&sid=search) | $89.980 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1980129574&sid=search) | $80.732 | -33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA3141293538&sid=search) | $122.099 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=7a1692f9-9d61-4ed1-a54c-b01fdfc4cd57&wid=MLA2797531354&sid=search) | $120.477 | -1.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA2860958990&sid=search) | $119.847 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguete Controlado Por Radio John Deere Johnny Tractor Green](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1992858294&sid=search) | $118.665 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor De Juguete Tomy John Deere De Plástico Verde Para Ni](https://articulo.mercadolibre.com.ar/MLA-1556356895-tractor-de-juguete-tomy-john-deere-de-plastico-verde-para-ni-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $113.584 | -6.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Juego De Tractores De Juguete John Deere 6410 Con Barcaza Verde](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=02c64d32-be32-41e1-86bb-aa70571e4466&wid=MLA1752012759&sid=search) | $130.654 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=23&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $109.992 | -9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1688853331&sid=search) | $137.348 | 12.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=item&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92) | $105.540 | -13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=19&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $103.897 | -14.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA1791146511&sid=search) | $103.252 | -15.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor Ertl John Deere 4020 Diesel - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4020-diesel--a-pedidoexkarg/up/MLAU2966024143#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=669f96d3-1fc1-46d0-9667-31c067b76457&wid=MLA1472336879&sid=search) | $141.230 | 15.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA1662281537&sid=search) | $141.907 | 16.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733&wid=MLA3051637704&sid=search) | $96.406 | -21.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA3214114070&sid=search) | $95.000 | -22.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA784333319&sid=search) | $91.877 | -24.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634778407-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202377448841#polycard_client=search-desktop&be_origin=backend&searchVariation=202377448841&search_layout=grid&position=45&type=item&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25) | $90.541 | -25.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 127. Tractor John Deere Flashight

- ID Venturino: `281053462`
- Precio Venturino: $52.000
- Tokens: tractor, flashight
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 9
- Candidatos usados: 20 de 21 válidos antes de top
- Candidatos excluidos por precio: 3898
- Candidatos excluidos por score: 1044
- Mediana ML: $55.625
- Venturino vs mediana ML: -6.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1606696085&sid=search) | $50.000 | -3.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=5cb6c6bd-09e9-4682-859f-fa504e38d0dc&wid=MLA3307554122&sid=search) | $55.095 | 6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=472fe18e-cfb9-4b80-930f-b73e6408e6f3&wid=MLA3401010280&sid=search) | $55.141 | 6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA3130984732&sid=search) | $63.308 | 21.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677885959&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=48f4cb0f-b0b8-42a0-914b-ee1b1fbc6381&wid=MLA1677937795&sid=search) | $68.990 | 32.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=c2385431-1680-43e8-99a6-08c4e9947733) | $69.004 | 32.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c9f5146f-f7e8-410a-b629-c90c1289c94e&wid=MLA2271017754&sid=search) | $70.293 | 35.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=c79389e2-ed31-44bb-9e59-0b518454eedf&wid=MLA3370300548&sid=search) | $48.540 | -6.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | baja | 44 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=41616622-7ac4-4f05-a3da-599d663e23cc&wid=MLA1639819361&sid=search) | $33.275 | -36.0% | tipo: JUGUETE; tokens comunes: tractor |
| 11 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=96069e74-506f-4f22-a5ff-cfdc7f5a5c25&wid=MLA2792533012&sid=search) | $52.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Pedal En X Inverso Con Almohadilla De Goma Para John Deere 4](https://www.mercadolibre.com.ar/pedal-en-x-inverso-con-almohadilla-de-goma-para-john-deere-4/up/MLAU4068558355#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=675ee819-163e-416a-97f4-b959c2fe51d6&wid=MLA3448674046&sid=search) | $56.109 | 7.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Ertl Collect N Play John Deere Angus Bull](https://www.mercadolibre.com.ar/ertl-collect-n-play-john-deere-angus-bull/up/MLAU4001542687#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2168860624&sid=search) | $63.370 | 21.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=5452be65-68b4-44f8-a6aa-5b9b1bea4b92&wid=MLA2160207414&sid=search) | $63.677 | 22.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&float_highlight=last_units&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1588571170&sid=search) | $39.775 | -23.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=5321a256-163c-4690-9b15-9d88eb2337d7&wid=MLA1725054925&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1508081573&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=62c13703-2cd1-4f1d-9765-8c39cbee6273&wid=MLA1508168125&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA1784433071&sid=search) | $32.990 | -36.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 35 | [Caballo De Juguete De Pura Sangre, Escala Ertl A Detalle](https://www.mercadolibre.com.ar/caballo-de-juguete-de-pura-sangre-escala-ertl-a-detalle/up/MLAU4012809832#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=b25f0344-99e0-4f37-b7c9-8048aeb78595&wid=MLA2169086748&sid=search) | $63.370 | 21.9% | tipo: JUGUETE |

## Observaciones Para Iteración

- Revisar candidatos de baja confianza para detectar falsos positivos y nuevos sinónimos.
- Si aparecen matches por `John Deere` sin tipo de producto coincidente, bajar peso de marca o subir score mínimo.
- Si productos válidos quedan afuera por precio, ajustar banda sólo en UI; para reporte se mantiene ±40%.
- Si muchos nombres técnicos quedan sin comparable, ampliar diccionario de tipos y tokens equivalentes.
