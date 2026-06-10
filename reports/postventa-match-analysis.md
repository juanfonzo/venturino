# Análisis de Matches Postventa

Generado: 2026-06-10T15:55:59.737Z

## Parámetros

- Colección Mongo: `algorym.productos`
- Algoritmo: `postventa-v0`
- Runtime: lib/postventa/matching.ts
- Venturino activo: 2026-05-30
- ML activo: 2026-06-10
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
- Productos ML activos: 5307 únicos (5324 registros crudos)
- Venturino con precio: 127
- ML con precio: 5307

## Resumen De La Muestra

- sin comparable: 47
- similar a ML: 38
- Venturino más barato que ML: 12
- Venturino más caro que ML: 28
- baja confianza: 2

Confianza de candidatos usados:
- alta: 130
- baja: 253
- media: 586

## Muestra Y Candidatos

### 1. Aceite de Motor Premium John Deere Plus-50™ II. John Deere

- ID Venturino: `318717662`
- Precio Venturino: $238.000
- Tokens: aceite, motor, premium, plus-50, ii
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4383
- Candidatos excluidos por score: 924
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 2. Generador Honda EZ3000CX – 3 KVA

- ID Venturino: `332862512`
- Precio Venturino: $1.165.943
- Tokens: generador, honda, ez3000cx, 3, kva, ez3000
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 8
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 5002
- Candidatos excluidos por score: 297
- Mediana ML: $1.219.500
- Venturino vs mediana ML: -4.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 132 | [Generador Grupo Electrogeno Honda Ez3000cx 3 Kva Moron Ppi](https://www.mercadolibre.com.ar/generador-grupo-electrogeno--honda-ez3000cx-3-kva-moron-ppi/up/MLAU219924817#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&float_highlight=last_unit&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1129317376&sid=search) | $1.301.793 | 11.7% | tipo: GENERADOR; tokens técnicos: ez3000cx, ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000cx, 3, kva, ez3000 |
| 2 | alta | 118 | [Generador Honda Ez3000cx 2.5kva Con Ruedas Y Manillar](https://www.mercadolibre.com.ar/generador-honda-ez3000cx-25kva-con-ruedas-y-manillar/up/MLAU267411221#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&float_highlight=last_units&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA908999957&sid=search) | $1.077.350 | -7.6% | tipo: GENERADOR; tokens técnicos: ez3000cx, ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000cx, ez3000 |
| 3 | alta | 112 | [Generador Honda Naftero Portátil 3 Kva - Ez3000cx-ra](https://www.mercadolibre.com.ar/generador-honda-naftero-portatil-3-kva-ez3000cx-ra/p/MLA2080094039#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA3068923596&sid=search) | $1.481.316 | 27.0% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, 3, kva, ez3000 |
| 4 | alta | 111 | [Generador Electrogeno Honda Ez 3000 3 Kva - Honda Quilmes](https://www.mercadolibre.com.ar/generador-honda-ez3000-220v-naftero-portatil/p/MLA2053258934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&float_highlight=last_units&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA935641982&sid=search) | $1.121.314 | -3.8% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, 3, kva, ez3000 |
| 5 | alta | 101 | [Generador Honda Ez 3000 Cx 2.5 Kva Moto Store Pilar](https://www.mercadolibre.com.ar/generador-honda-ez-3000-cx-25-kva-moto-store-pilar/up/MLAU233101185#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1373008332&sid=search) | $1.250.000 | 7.2% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, kva, ez3000 |
| 6 | alta | 101 | [Generador Grupo Electrogeno Honda Ez 3000 2.5 Kva Portátil](https://www.mercadolibre.com.ar/generador-grupo-electrogeno-honda-ez-3000-25-kva-portatil/up/MLAU143353720#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&float_highlight=last_units&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1106773437&sid=search) | $1.040.195 | -10.8% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, kva, ez3000 |
| 7 | alta | 95 | [Generador Grupo Electrogeno Honda Ez 3000 2.5kva](https://www.mercadolibre.com.ar/generador-grupo-electrogeno-honda-ez-3000-25kva/up/MLAU264533926#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1433235434&sid=search) | $1.275.000 | 9.4% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000 |
| 8 | alta | 94 | [Generador Portátil Honda Ez3000 3kva 3000w 220v 4t Naftero](https://www.mercadolibre.com.ar/generador-portatil-honda-ez3000-3kva-3000w-220v-4t-naftero/up/MLAU231794097#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&float_highlight=last_units&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1365451545&sid=search) | $1.189.000 | 2.0% | tipo: GENERADOR; tokens técnicos: ez3000; modelo Honda compatible: ez3000; tokens comunes: generador, honda, ez3000 |

### 3. Soplador Honda HHB25-ET1 – 25

- ID Venturino: `332865249`
- Precio Venturino: $825.087
- Tokens: soplador, honda, hhb25-et1, 25, hhb25
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 12
- Candidatos usados: 14 de 14 válidos antes de top
- Candidatos excluidos por precio: 4906
- Candidatos excluidos por score: 387
- Mediana ML: $852.608
- Venturino vs mediana ML: -3.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 117 | [Soplador Honda Portaltil Motor 4t Uso Porfesional Hhb25-et1](https://www.mercadolibre.com.ar/soplador-honda-portaltil-motor-4t-uso-porfesional-hhb25et1/up/MLAU3845830815#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1709927199&sid=search) | $957.284 | 16.0% | tipo: SOPLADOR; tokens técnicos: hhb25-et1, hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25-et1, hhb25 |
| 2 | alta | 101 | [Soplador Honda Hhb25 Genamax](https://www.mercadolibre.com.ar/soplador-honda-hhb25-genamax/up/MLAU3361419411#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA2250429934&sid=search) | $823.600 | -0.2% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 3 | alta | 101 | [Soplador Honda Hhb25 Genamax](https://www.mercadolibre.com.ar/soplador-honda-hhb25-genamax/p/MLA70524905#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA3390149194&sid=search) | $823.600 | -0.2% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 4 | alta | 96 | [Soplador Honda Hhb25e 4 Tiempos Naftero](https://www.mercadolibre.com.ar/soplador-honda-hhb25e-4-tiempos-naftero/up/MLAU1153842521#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1909475538&sid=search) | $839.000 | 1.7% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 5 | alta | 96 | [Soplador Honda Hhb25e 4 Tiempos Naftero](https://www.mercadolibre.com.ar/soplador-honda-hhb25e-4-tiempos-naftero/up/MLAU229214829#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1320528614&sid=search) | $839.000 | 1.7% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 6 | alta | 96 | [Soplador Honda Hhb25e 4 Tiempos Naftero](https://www.mercadolibre.com.ar/soplador-honda-hhb25e-4-tiempos-naftero/up/MLAU3499237572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA2457975762&sid=search) | $870.000 | 5.4% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 7 | alta | 96 | [Soplador Honda Original Hhb25e 4 T Naftero](https://www.mercadolibre.com.ar/soplador-honda-original--hhb25e-4-t-naftero/up/MLAU3337699701#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA2213507244&sid=search) | $1.126.516 | 36.5% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 8 | alta | 95 | [Soplador De Hojas Naftero 4t - 1hp - Honda Modelo Hhb25et1](https://www.mercadolibre.com.ar/soplador-de-hojas-naftero-4t--1hp--honda-modelo-hhb25et1/up/MLAU3269375537#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1508216955&sid=search) | $849.836 | 3.0% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 9 | alta | 95 | [Soplador Honda Hhb25 4t Naftero 1hp Japon 360 Inclinable](https://www.mercadolibre.com.ar/soplador-honda-hhb25-4t-naftero-1hp-japon-360-inclinable/up/MLAU232825609#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&float_highlight=last_unit&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1371730070&sid=search) | $855.380 | 3.7% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 10 | alta | 95 | [Soplador Honda Original Hhb25e 4 T Naftero Motostore](https://www.mercadolibre.com.ar/soplador-honda-original--hhb25e-4-t-naftero-motostore/up/MLAU265172540#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1617154696&sid=search) | $917.913 | 11.3% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 11 | alta | 95 | [Soplador De Hojas Naftero Honda 4 Tiempos Hhb25 1hp Jardin](https://www.mercadolibre.com.ar/soplador-de-hojas-naftero-honda-4-tiempos-hhb25-1hp-jardin/up/MLAU321243853#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1676560962&sid=search) | $921.309 | 11.7% | tipo: SOPLADOR; tokens técnicos: hhb25; modelo Honda compatible: hhb25; tokens comunes: soplador, honda, hhb25 |
| 12 | alta | 74 | [Sopladora Honda Hhb25-et1 Manual Naftera Color Rojo Original](https://www.mercadolibre.com.ar/sopladora-honda-hhb25et1-manual-naftera-color-rojo-original/up/MLAU3331375733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA2209045008&sid=search) | $1.146.338 | 38.9% | tokens técnicos: hhb25-et1, hhb25; modelo Honda compatible: hhb25; tokens comunes: honda, hhb25-et1, hhb25 |
| 13 | baja | 29 | [Sopladora A Explosión Honda Hhb25-et1 Motor 25cc 4 Tiempos](https://www.mercadolibre.com.ar/sopladora-a-explosion-honda-hhb25et1-motor-25cc-4-tiempos/up/MLAU258677469#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA1475999056&sid=search) | $811.819 | -1.6% | penalización tipo distinto (SOPLADOR vs MOTOR); tokens técnicos: hhb25-et1, hhb25; modelo Honda compatible: hhb25; tokens comunes: honda, hhb25-et1, hhb25 |
| 14 | baja | 29 | [Sopladora A Explosión Honda Hhb25-et1 Motor 25cc 4 Tiempos](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=HUrH%2FM8t8ZHfq9jL3Ei7jRcNZ5HDpjIaW06Pw6%2Bnu4vtvLkXyaIoW8bPK7pKCtRYbZL%2BgihpyjGqoBaOPiHA%2B%2BWU50rTSiPJ2wrbfRrB3nqHI4Wu8zGjpPs2ynleeGtiV1Pzv4FqvTv%2B%2FoW2vA5qlGHkNM%2FeQhC9cwQolYL0BqdTXbTE0rGE3gCrCecnB5AUw8O60fOfbdzePd0Q1pjyEDbLNIq65C%2BhqrAUjvHFdOwaAh4q0V%2BXYngQel61z6UeUidqgAXcyz2HPrQ43CdZuARw45rIatVPNoyryIMfdZ8IoIdDilNyS05V6NkIYrL6MIK6DRUw5pUS%2BryoZ%2F9rPzb6T6Ti39IDRi9Ncl2zuR3MIKiwVc4IwND89ZC5fKWi2we4hMzN8QoMkChomK3gXwxgBN%2FWgdHjZFmv%2BRCNKUTMtaSyQA85zAKJcqumYhwpXTVLuSnoGJLdR2ASwVjrLfJATtfU%2FgO7IVytWBP7WpeQqJy78u9N4zYOpqLapdv%2F8QrRQ1SDtMd4%2Fms7WCWvr722vzqDN6LL4OooxxJkunwkZ6HKCc%2FN7GmuClhrFuq8t0JktCtWYPrkXWla%2BLFcMgZOQw1%2BMoBBfF38QQgfj9P0SgTRQsm1dJhQMNFz3RimD6RmuyDYlKGbIvvyJv%2F9nObf%2BNFMk8yvt75DTT%2F8dDd7n6%2Fn3pw8AZaexMoDMbIe%2FLmeX0XVuHovDlhaRHg%2FxCw8%2B6BXDCH1PblB%2F1mNtXSgg%2FUnAWISyPl8LIgKFjoL1TSJH5GWMxGkixJX6ap2OCHJvnEGt9zMuBm59Ay6SRsL4BPDRrcJ8ZZh6eehhkaZVtYrGVDPszKknB6ItWwWwn3f3lv7dPuHKFEX6AGchVIFav0qM1vFo8pLWhJ48gH9LNmSGsG%2FiHNMFbtYmJGWx%2F%2BxNVxGujsHuSjU5uNIBmxRhrK4ABeJi%2FD1r1aD5xstP8ICNdFIM01RNIPW%2B85OBhJX089WzVW6EfT7rVc6Nw%3D%3D&pdp_filters=item_id%3AMLA3205455354#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3914032046&backend_model=search-backend&be_origin=backend&search_layout=grid&position=2&type=pad&tracking_id=532f2ef2-ce66-4b8a-ac9c-5a3b0b6d22b5&wid=MLA3205455354&sid=search) | $795.000 | -3.6% | penalización tipo distinto (SOPLADOR vs MOTOR); tokens técnicos: hhb25-et1, hhb25; modelo Honda compatible: hhb25; tokens comunes: honda, hhb25-et1, hhb25 |

### 4. Tractor John Deere 8R para cultivos en hileras

- ID Venturino: `281259424`
- Precio Venturino: $71.000
- Tokens: tractor, 8r, cultivo, hilera
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 49 válidos antes de top
- Candidatos excluidos por precio: 4022
- Candidatos excluidos por score: 1236
- Mediana ML: $78.611
- Venturino vs mediana ML: -9.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Llavero Tractor John Deere 8r 410 Metal Resin](https://www.mercadolibre.com.ar/llavero-tractor-john-deere-8r-410-metal-resin/up/MLAU3886394589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=da1dc84c-19ed-451b-98b7-9bbd4c25a12c&wid=MLA1741124951&sid=search) | $89.539 | 26.1% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | alta | 70 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587&wid=MLA3370300548&sid=search) | $48.868 | -31.2% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | 23.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | -2.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | 7.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | -10.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/a-tractor-coleccion-taladro-de-grano-john-deere-ertl-7215r/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA1717056337&sid=search) | $80.581 | 13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | 17.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | -17.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | 19.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2ca1ba56-63e3-4f44-9120-7fb104ee023b&wid=MLA3078939230&sid=search) | $86.284 | 21.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | 27.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Ertl John Deere 8320r Tractor Y Modelo 637 Disco Set (1:6...](https://articulo.mercadolibre.com.ar/MLA-2414668928-ertl-john-deere-8320r-tractor-y-modelo-637-disco-set-16-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&float_highlight=last_units&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7) | $89.050 | 25.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 5. Aceite de Motor John Deere Torq-Gard™ II. John Deere

- ID Venturino: `318727927`
- Precio Venturino: $175.000
- Tokens: aceite, motor, torq-gard, ii
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4090
- Candidatos excluidos por score: 1217
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 6. Jarro Chalten Verde John Deere

- ID Venturino: `338234315`
- Precio Venturino: $21.000
- Tokens: jarro, chalten, verde
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 4538
- Candidatos excluidos por score: 766
- Mediana ML: $20.894
- Venturino vs mediana ML: 0.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 54 | [Taza John Deere](https://www.mercadolibre.com.ar/taza-john-deere/up/MLAU3887253058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA3145837242&sid=search) | $13.000 | -38.1% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=36&type=item&tracking_id=259bd6e9-a847-4163-9a80-f77a0b18877d) | $24.990 | 19.0% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | baja | 44 | [Y Taza Clásica, Taza De Café, Decoración Del Hogar](https://www.mercadolibre.com.ar/taza-de-cafe-tipo-tractor-11-onzas-con-forma-de-semirremo-a/p/MLA2051419761#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55&wid=MLA1783662613&sid=search) | $20.894 | -0.5% | tipo: JARRO; tokens comunes: jarro |

### 7. Motoguadaña Honda UMK450 – 47.9 cc

- ID Venturino: `332864442`
- Precio Venturino: $916.914
- Tokens: motoguadana, honda, umk450, 47.9, cc
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4924
- Candidatos excluidos por score: 379
- Mediana ML: $1.089.014
- Venturino vs mediana ML: -15.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 103 | [Desmalezadora Honda UMK450](https://www.mercadolibre.com.ar/desmalezadora-honda-umk450/p/MLA17458948#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1110681760&sid=search) | $1.150.924 | 25.5% | tipo: MOTOGUADANA; tokens técnicos: umk450; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450 |
| 2 | alta | 101 | [Desmalezadora Honda UMK450T](https://www.mercadolibre.com.ar/desmalezadora-honda-umk450t/p/MLA17920044#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA2457970382&sid=search) | $980.000 | 6.9% | tipo: MOTOGUADANA; tokens técnicos: umk450; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450 |
| 3 | alta | 96 | [Motoguadaña Desmalezadora Honda Umk 450 1.8hp 47.9cc 4tiemp](https://www.mercadolibre.com.ar/motoguadana-desmalezadora-honda-umk-450-18hp-479cc-4tiemp/up/MLAU302078826#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA884975286&sid=search) | $1.138.527 | 24.2% | tipo: MOTOGUADANA; tokens técnicos: umk450; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450 |
| 4 | media | 48 | [Motoguadaña Desmalezadora Honda Umk 450t 47.9 Cc + Aceite](https://www.mercadolibre.com.ar/motoguadana-desmalezadora-honda-umk-450t-479-cc--aceite/up/MLAU280706975#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA791978680&sid=search) | $1.039.500 | 13.4% | penalización tipo distinto (MOTOGUADANA vs ACEITE); tokens técnicos: umk450, 47.9; modelo Honda compatible: umk450; tokens comunes: motoguadana, honda, umk450, 47.9, cc |

### 8. Tractor Johny John Deere a control remoto

- ID Venturino: `281053479`
- Precio Venturino: $145.000
- Tokens: tractor, johny, control, remoto
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 177 válidos antes de top
- Candidatos excluidos por precio: 3912
- Candidatos excluidos por score: 1218
- Mediana ML: $142.669
- Venturino vs mediana ML: 1.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 65 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1588597639&sid=search) | $109.806 | -24.3% | tipo: JUGUETE; tokens comunes: tractor, control, remoto; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | -22.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -39.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor 1:64 John Deere 8rx 410 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8rx-410--a-pedidoexkarg/up/MLAU159998621#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1376655339&sid=search) | $145.546 | 0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3263270113#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA2149326968&sid=search) | $144.099 | -0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1688853331&sid=search) | $146.511 | 1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1662281537&sid=search) | $142.864 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3051637704&sid=search) | $142.740 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1557066483&sid=search) | $142.598 | -1.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Ertl John Deere 4020 Diesel - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4020-diesel--a-pedidoexkarg/up/MLAU2966024143#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1472336879&sid=search) | $141.230 | -2.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Set De Juguetes John Deere Haying A Escala 1/32 Con Tractor,](https://articulo.mercadolibre.com.ar/MLA-2470290950-set-de-juguetes-john-deere-haying-a-escala-132-con-tractor-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=item&tracking_id=ac64c6dc-bbac-44bc-83c8-3da37b95502e) | $139.525 | -3.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor John Deere 7260r 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7260r-164--a-pedidoexkarg/up/MLAU3005755665#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA2012178172&sid=search) | $157.576 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Juego De Tractores De Juguete John Deere 6410 Con Barcaza Verde](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7&wid=MLA1752012759&sid=search) | $131.535 | -9.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete John Deere 2640 Field Of Dreams Lp](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-2640-field-of-dreams-lp/p/MLA2053419470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=0e1a4495-9897-4296-b7dc-aaa67be3fd95&wid=MLA2597594466&sid=search) | $159.045 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere 7270r De Juguete Con Rotoempacadora 560r](https://articulo.mercadolibre.com.ar/MLA-1693749907-tractor-john-deere-7270r-de-juguete-con-rotoempacadora-560r-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $159.385 | 9.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Juguete Controlado Por Radio John Deere Johnny Tractor Green](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1992858294&sid=search) | $129.789 | -10.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguete De Construcción John Deere Tractor Con Taladro 16 Ve](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16-ve/up/MLAU3890909392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA1736581317&sid=search) | $160.354 | 10.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Set De Juguete Tractor John Deere 5075e Con Remolque A Escal](https://www.mercadolibre.com.ar/toy-john-deere-5075e-tractor-hauling-set-132-scale/p/MLA2089035184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=e371f417-8cf7-4c6c-87da-0d27aae2b38f&wid=MLA1806751067&sid=search) | $162.476 | 12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Siku Tractor John Deere 7530 C/empacadora -metal](https://www.mercadolibre.com.ar/siku-tractor-john-deere-7530-cempacadora-metal/up/MLAU155441356#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&float_highlight=last_units&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1214813147&sid=search) | $126.835 | -12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 9. Batería John Deere StrongBox™ 12 V 110 Ah. John Deere

- ID Venturino: `318732486`
- Precio Venturino: $560.000
- Tokens: bateria, strongbox, 12, v, 110, ah
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4816
- Candidatos excluidos por score: 489
- Mediana ML: $311.141
- Venturino vs mediana ML: 80.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 73 | [Bateria Moura M100hi 12x110 Tractor New Holland Jhon Deere](https://www.mercadolibre.com.ar/bateria-moura-m100hi-12x110-tractor-new-holland-jhon-deere/up/MLAU3210015848#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7&wid=MLA3353767142&sid=search) | $311.708 | -44.3% | tipo: BATERIA; capacidad batería: 110Ah; tokens comunes: bateria; compatibilidad/marca: John Deere |
| 2 | alta | 73 | [Bateria Willard Ub920i 12x110 John Deere Vial Tractores](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=vs7p5xq0z%2B5TNheLt2DooDFI0fXcPU8YMZcoCQTTN2oyMeBSW7TjKPWt8j0bCJ3m5wKNFAX07gNZF86gGOeYydE1pk8vyoKyg%2Fy4AQhLsmMVDyva45aZ8Qb0yIc9KBYLdVYPZPJzh53m%2BPJCcMtvlkGsuZcGNwfIY30ZSVziL%2FDvPJop%2BV%2FzGEz6owTS4nxpI11AGGT9QmfKfoJvfbeG6EFVpF2iQMWyfTRT6WRQqjl9LeUgrf0mDKV3PxvoKxF3S3ZKZcq%2FtA3WNIhAGJUteJnBkIHjryDxfOaaPf5KFbE3rI4jQGy1DtV%2B9bmudynRic2sF7eY%2F6T0W%2FJIQgg%2BS1Jk1jf0I2DNvSgXaOVY7n5MC5z1OQ7dHV9SwFfqw%2FEhGUVNISF%2BHlGUCIkHKcFVKhSvWzVxjTZEX%2BOqFLm0FSUBj7U%2BdZmScnyDkce35BExUmTdo7hZDcXWCWCmkKWnRPITxgmsxkHfinDuxG5EsuVQSfdmgWBodSeptfiuMMQ%2BVNwvLxUYHWObZQV%2FrMhO7KtfOMF9anLl3CatXZe6Uj1yD0jC%2BI%2BV%2FYQkPToeA%2Bq8JMUKuU2PkNvvGnSp%2FhzWiysabSBRImxeO2HDmh2O7qiLczyxW%2FDuXeKA5pR2iLHlaDTvsmtPfDtrCU%2Bs%2BGbGr%2FsyeDXJTHiXpqIbOyt3iw9CNVydGvi9JMApeXsp7Krmpu1OQQaJNf7WDL99wHRz2MKY2BSVAFrTAdXPNl49bT19A%2B5V8mJj6qCo%2BJ9MWw0W1MQhYZXYPTNwoukNHPbmDKMFrKHpQMzWWEq3%2Fz3nqg55pLyqsuZESxk8S%2B84TqaJf8G2vTI%2BRziU3M9OWphCOFnGiptNn5%2BWqcp1jVg%2B5FoXLHwbQG3%2FwkYTJ%2FKNlCxj9K0lQmuHMoPRgk0vo2VltvQib8WxbHF%2BUe2%2B001Ugy4tcFs8v3es8JSb%2FzsSEFvjUacntAeP4Ys3bocaEqPHNfJlEPgvcm2MMB1Yzti6cmJuFA%3D%3D&pdp_filters=item_id%3AMLA869234580#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU296922540&backend_model=search-backend&be_origin=backend&search_layout=grid&position=14&type=pad&tracking_id=05784cd9-5ef3-4e9f-9b4a-4fa6e7897b42&wid=MLA869234580&sid=search) | $310.573 | -44.5% | tipo: BATERIA; capacidad batería: 110Ah; tokens comunes: bateria; compatibilidad/marca: John Deere |

### 10. Juego de tubos SAE ¼” John Deere Set de 21 piezas

- ID Venturino: `276679543`
- Precio Venturino: $149.000
- Tokens: juego, tubo, sae, set, 21, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 8
- Candidatos usados: 12 de 12 válidos antes de top
- Candidatos excluidos por precio: 3937
- Candidatos excluidos por score: 1358
- Mediana ML: $112.900
- Venturino vs mediana ML: 32.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1807348547&sid=search) | $120.000 | -19.5% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 2 | media | 57 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1721056741&sid=search) | $99.590 | -33.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 3 | media | 56 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1510545543&sid=search) | $135.583 | -9.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 4 | media | 56 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA922576085&sid=search) | $111.000 | -25.5% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Juego De Tubos Llaves Y Puntas De 108 Piezas Cromo Vanadio Kroner](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=uuC0D2HMALHOSKrirpEwt5cmPE%2BoPguFOnOadQQaMr45h3hKODw97DmtE708yGsSb9UxFYJFVhg1MWegu0mMXcGN9TkvDxWORySJsDibLYw4xhPpMynPNy%2BLTzLMUESAnc1nL0x3P5MN8BsnoeI9rBtCMaG1ucOR3GA%2BI8viAe9Pyl3H2gWVQ3I%2BqIS2LZZXlSc68EBuGWwlLZgDECFVI1GNRTEx8ORCIzMGxDLJfLvr68GcAMRy3gOvfGjddidYn%2BEkEpujN6D0EYEzKnIvrh%2BJEf%2F4oSlZAxv1R6iZIDCI6ifFHhuPWBLkCzFiZK%2FP9EzoelZ570hyprStH3MaqaEa8wG%2FJJASYo%2F3aCdBo%2FjHps75eglJ5Up8vpgFUqqZDH%2BQ0QzTnZRkIOu9EK522k9kUf%2B%2BB6g0PPNx%2FAKY8BACP55bbPQAkO4Oiyy7X%2FO2LnbgAQooCzCCU34xpyuJvJvZSFWHfYwoQeCacl7TKg7dEv0ol2gQob1XbpsnSc19OeE4yjmBF7WqObLrzwLfCoZ8xOGlRYM7HgiDQh93OKY%2BYwfNHJ6BtFcEBsiHn7M6AG5uHsV0byNZKYWYx0571OgpgADAnG2e9dq7W%2FaINxOOvWn6a8vw4RnSF7WEXDkEuDwcJ8ZJ2oE5A6S0Dzi9%2Fwo5zRsDYoqU3gw%2B26qw3oE1cK8UuzHryxCv2y50ZDCSlbyBefArSXkRJWbifAsMPXyUzbpAlnT4gMPJ7B0WbByBZcJkPBpyp%2Bnk6h5nUJ%2FpoI1WHrA6aIiBYgzkogL82Ay03Z%2FOlm%2FFqPmaepZky28YLAKOKe4rOI451RFRrKcMRodezd4148Psq8XpiIbYnZSe749stBT%2Fka47oIW%2BM5ZopcTTpuswFEjt2i6S2Y3zjDansp1h%2FA%2FlvJSUC6QvpEapURxMd3AbyI3ADKNkF6DWx5tBB7IqXnNWWD9CzxzWDgcWm5scA8dOt0PJK80DQZIO14QVVBC4xHYaax2Hvw%3D%3D&pdp_filters=item_id%3AMLA1429769649#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA37175500&backend_model=search-backend&be_origin=backend&search_layout=grid&position=5&type=pad&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1429769649&sid=search) | $104.412 | -29.9% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 6 | media | 49 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA3323710072&sid=search) | $118.999 | -20.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 7 | media | 49 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2491947770&sid=search) | $99.528 | -33.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3126102700&sid=search) | $194.218 | 30.3% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza; compatibilidad/marca: John Deere |
| 9 | baja | 43 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA2308233004&sid=search) | $114.799 | -23.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |
| 10 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1562325653&sid=search) | $131.596 | -11.7% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |
| 11 | baja | 42 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1448971691&sid=search) | $110.026 | -26.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |
| 12 | baja | 41 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1946973092&sid=search) | $110.026 | -26.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |

### 11. Tractor con empacadora, vagón y 12 pacas de heno John Deere

- ID Venturino: `281234465`
- Precio Venturino: $400.000
- Tokens: tractor, empacadora, vagon, 12, paca, heno
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 125 válidos antes de top
- Candidatos excluidos por precio: 4713
- Candidatos excluidos por score: 469
- Mediana ML: $399.103
- Venturino vs mediana ML: 0.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2550302558&sid=search) | $382.954 | -4.3% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor De Juguete John Deere Big Farm Con Vagón A Escala 1:](https://www.mercadolibre.com.ar/john-deere-big-farm-tractor-and-wagon-116-scale-ligh/p/MLA2038130505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3382284296&sid=search) | $273.302 | -31.7% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Empacadora John Deere De Coleccion Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/empacadora-john-deere-de-coleccion-bruder--a-pedidoexkarg/up/MLAU149484839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1144752768&sid=search) | $412.660 | 3.2% | tipo: JUGUETE; tokens comunes: empacadora; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Vagón De Tren John Deere Escala O Lionel](https://www.mercadolibre.com.ar/vagon-de-tren-john-deere-escala-o-lionel/up/MLAU3915674437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3233211424&sid=search) | $481.099 | 20.3% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Empacadora Redonda Siku 2465 John Deere 990 Para Jugar Y Col](https://www.mercadolibre.com.ar/empacadora-redonda-siku-2465-john-deere-990-para-jugar-y-col/up/MLAU3868917828#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1720803179&sid=search) | $393.999 | -1.5% | tipo: JUGUETE; tokens comunes: empacadora; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=5bd3e372-d889-4f59-a7db-0583bdd7dd38&wid=MLA3117507902&sid=search) | $420.000 | 5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1138213292&sid=search) | $373.467 | -6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1501340737&sid=search) | $439.275 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2510969874&sid=search) | $446.999 | 11.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Set De Triciclo Y Vagón John Deere Para Niños A Partir De 18](https://www.mercadolibre.com.ar/tricycle-and-wagon-set-john-deere-for-kids-18-months/p/MLA2064510072#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1561940567&sid=search) | $463.242 | 15.8% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1503208905&sid=search) | $332.996 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1949971056&sid=search) | $323.265 | -19.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 12. Aditivo Mejorador de Combustible John Deere

- ID Venturino: `318861703`
- Precio Venturino: $172.000
- Tokens: aditivo, mejorador, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4065
- Candidatos excluidos por score: 1242
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 13. Tractor Johnny para armar John Deere

- ID Venturino: `281259378`
- Precio Venturino: $42.000
- Tokens: tractor, johnny, armar
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 6
- Candidatos usados: 13 de 13 válidos antes de top
- Candidatos excluidos por precio: 4246
- Candidatos excluidos por score: 1048
- Mediana ML: $39.775
- Venturino vs mediana ML: 5.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 52 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1639819361&sid=search) | $33.275 | -20.8% | tipo: JUGUETE; tokens comunes: tractor, armar |
| 2 | media | 51 | [Tractor De Juguete John Deere Erlt](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-erlt/up/MLAU3327338120#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2202515476&sid=search) | $29.980 | -28.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1606696085&sid=search) | $50.000 | 19.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguete Tractor Tipo Caricatura John Deere Ertl](https://www.mercadolibre.com.ar/juguete-tractor-tipo-caricatura-john-deere-ertl/up/MLAU262732766#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1476364034&sid=search) | $28.990 | -31.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587&wid=MLA3370300548&sid=search) | $48.868 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | 39.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA3316369844&sid=search) | $42.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&float_highlight=last_units&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1588571170&sid=search) | $39.775 | -5.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1508168125&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1508081573&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1784433071&sid=search) | $32.990 | -21.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=ac64c6dc-bbac-44bc-83c8-3da37b95502e&wid=MLA2792533012&sid=search) | $52.000 | 23.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 35 | [Trailer A Escala Acoplado Jaula Siku Aleman](https://www.mercadolibre.com.ar/trailer-a-escala-acoplado-jaula-siku-aleman/up/MLAU3633336756#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2600993544&sid=search) | $39.980 | -4.8% | tipo: JUGUETE |

### 14. Seccion de corte, cuchilla de draper John Deere

- ID Venturino: `318735588`
- Precio Venturino: $9.300
- Tokens: seccion, corte, cuchilla, draper
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4872
- Candidatos excluidos por score: 435
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
- Candidatos excluidos por precio: 5280
- Candidatos excluidos por score: 27
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
- Candidatos excluidos por precio: 4164
- Candidatos excluidos por score: 1142
- Mediana ML: $259.871
- Venturino vs mediana ML: -27.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 61 | [Aceite Hidráulico Ajm69444 Hy-gard 20lt](https://www.mercadolibre.com.ar/aceite-hidraulico-ajm69444-hygard-20lt/up/MLAU240497586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&float_highlight=last_units&tracking_id=c297f3e3-3b52-471a-ab47-5ab1f02eafda&wid=MLA1369333397&sid=search) | $259.871 | 37.5% | tipo: ACEITE; tokens comunes: aceite, hidraulico, hy-gard |

### 17. Anticongelante Cool‑Gard. John Deere 10LTS

- ID Venturino: `318854338`
- Precio Venturino: $97.000
- Tokens: anticongelante, cool-gard, 10lt
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3939
- Candidatos excluidos por score: 1368
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
- Candidatos excluidos por precio: 4337
- Candidatos excluidos por score: 970
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
- Candidatos excluidos por precio: 4888
- Candidatos excluidos por score: 419
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
- Candidatos excluidos por precio: 4317
- Candidatos excluidos por score: 990
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
- Candidatos excluidos por precio: 3885
- Candidatos excluidos por score: 1421
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 22. Botella Atuel Blanca John Deere

- ID Venturino: `276163111`
- Precio Venturino: $56.000
- Tokens: botella, atuel, blanca
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4184
- Candidatos excluidos por score: 1117
- Mediana ML: $62.847
- Venturino vs mediana ML: -10.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=43&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $56.641 | 1.1% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=42&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $59.377 | 6.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1830843241-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203659596309#polycard_client=search-desktop&be_origin=backend&searchVariation=203659596309&search_layout=grid&position=57&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $66.316 | 18.4% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-3447105134-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203663715667#polycard_client=search-desktop&be_origin=backend&searchVariation=203663715667&search_layout=grid&position=15&type=item&tracking_id=f9f07d06-3638-46f4-a622-1b05876a4a2e) | $66.316 | 18.4% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 5 | baja | 43 | [Botella De Whisky Transparente - Varios Modelos Disponibles](https://articulo.mercadolibre.com.ar/MLA-3432730010-botella-de-whisky-transparente-varios-modelos-disponibles-_JM?searchVariation=203503874811#polycard_client=search-desktop&be_origin=backend&searchVariation=203503874811&search_layout=grid&position=54&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $58.589 | 4.6% | tipo: BOTELLA; tokens comunes: botella |
| 6 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1750778625&sid=search) | $69.490 | 24.1% | tipo: BOTELLA; tokens comunes: botella |

### 23. Botella Hydro 750ML John Deere

- ID Venturino: `338229330`
- Precio Venturino: $45.000
- Tokens: botella, hydro, 750ml
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 4262
- Candidatos excluidos por score: 1042
- Mediana ML: $58.589
- Venturino vs mediana ML: -23.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=43&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $56.641 | 25.9% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=42&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $59.377 | 31.9% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 3 | baja | 43 | [Botella De Whisky Transparente - Varios Modelos Disponibles](https://articulo.mercadolibre.com.ar/MLA-3432730010-botella-de-whisky-transparente-varios-modelos-disponibles-_JM?searchVariation=203503874811#polycard_client=search-desktop&be_origin=backend&searchVariation=203503874811&search_layout=grid&position=54&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $58.589 | 30.2% | tipo: BOTELLA; tokens comunes: botella |

### 24. Botella Kun blanca John Deere

- ID Venturino: `276163980`
- Precio Venturino: $58.000
- Tokens: botella, kun, blanca
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4123
- Candidatos excluidos por score: 1178
- Mediana ML: $62.847
- Venturino vs mediana ML: -7.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=43&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $56.641 | -2.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=42&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $59.377 | 2.4% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1830843241-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203659596309#polycard_client=search-desktop&be_origin=backend&searchVariation=203659596309&search_layout=grid&position=57&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $66.316 | 14.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-3447105134-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203663715667#polycard_client=search-desktop&be_origin=backend&searchVariation=203663715667&search_layout=grid&position=15&type=item&tracking_id=f9f07d06-3638-46f4-a622-1b05876a4a2e) | $66.316 | 14.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 5 | baja | 43 | [Botella De Whisky Transparente - Varios Modelos Disponibles](https://articulo.mercadolibre.com.ar/MLA-3432730010-botella-de-whisky-transparente-varios-modelos-disponibles-_JM?searchVariation=203503874811#polycard_client=search-desktop&be_origin=backend&searchVariation=203503874811&search_layout=grid&position=54&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $58.589 | 1.0% | tipo: BOTELLA; tokens comunes: botella |
| 6 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1750778625&sid=search) | $69.490 | 19.8% | tipo: BOTELLA; tokens comunes: botella |

### 25. Botella Kun negra John Deere

- ID Venturino: `276163436`
- Precio Venturino: $58.000
- Tokens: botella, kun, negra
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4123
- Candidatos excluidos por score: 1178
- Mediana ML: $62.847
- Venturino vs mediana ML: -7.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=43&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $56.641 | -2.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=42&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $59.377 | 2.4% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1830843241-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203659596309#polycard_client=search-desktop&be_origin=backend&searchVariation=203659596309&search_layout=grid&position=57&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $66.316 | 14.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-3447105134-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203663715667#polycard_client=search-desktop&be_origin=backend&searchVariation=203663715667&search_layout=grid&position=15&type=item&tracking_id=f9f07d06-3638-46f4-a622-1b05876a4a2e) | $66.316 | 14.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 5 | baja | 43 | [Botella De Whisky Transparente - Varios Modelos Disponibles](https://articulo.mercadolibre.com.ar/MLA-3432730010-botella-de-whisky-transparente-varios-modelos-disponibles-_JM?searchVariation=203503874811#polycard_client=search-desktop&be_origin=backend&searchVariation=203503874811&search_layout=grid&position=54&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $58.589 | 1.0% | tipo: BOTELLA; tokens comunes: botella |
| 6 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1750778625&sid=search) | $69.490 | 19.8% | tipo: BOTELLA; tokens comunes: botella |

### 26. Botella termica Olympia John Deere

- ID Venturino: `276164231`
- Precio Venturino: $68.000
- Tokens: botella, termica, olympia
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4037
- Candidatos excluidos por score: 1264
- Mediana ML: $62.847
- Venturino vs mediana ML: 8.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1830843241-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203659596309#polycard_client=search-desktop&be_origin=backend&searchVariation=203659596309&search_layout=grid&position=57&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $66.316 | -2.5% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-3447105134-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=203663715667#polycard_client=search-desktop&be_origin=backend&searchVariation=203663715667&search_layout=grid&position=15&type=item&tracking_id=f9f07d06-3638-46f4-a622-1b05876a4a2e) | $66.316 | -2.5% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=42&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $59.377 | -12.7% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=43&type=item&tracking_id=bbee7aa7-8d1f-4bd1-a90b-27478a981ff5) | $56.641 | -16.7% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 5 | baja | 43 | [Botella De Whisky Transparente - Varios Modelos Disponibles](https://articulo.mercadolibre.com.ar/MLA-3432730010-botella-de-whisky-transparente-varios-modelos-disponibles-_JM?searchVariation=203503874811#polycard_client=search-desktop&be_origin=backend&searchVariation=203503874811&search_layout=grid&position=54&type=item&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55) | $58.589 | -13.8% | tipo: BOTELLA; tokens comunes: botella |
| 6 | baja | 42 | [Botella Giber 5 Litros Fumigar Pulverizar Color Celeste y Amarillo](https://www.mercadolibre.com.ar/botella-giber-5-litros-fumigar-pulverizar-color-celeste-y-amarillo/p/MLA23135121#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1750778625&sid=search) | $69.490 | 2.2% | tipo: BOTELLA; tokens comunes: botella |

### 27. Caja de herramientas John Deere de acero

- ID Venturino: `276171332`
- Precio Venturino: $140.000
- Tokens: caja, herramienta, acero
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3905
- Candidatos excluidos por score: 1400
- Mediana ML: $113.626
- Venturino vs mediana ML: 23.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 61 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3242261346&sid=search) | $139.438 | -0.4% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |
| 2 | media | 59 | [Caja De Herramientas De Lujo John Deere De 18 Piezas,...](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2033573986#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1978680112&sid=search) | $87.814 | -37.3% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |

### 28. Caja de herramientas John Deere verde con bandeja amarilla

- ID Venturino: `276169417`
- Precio Venturino: $183.000
- Tokens: caja, herramienta, verde, bandeja, amarilla
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 4134
- Candidatos excluidos por score: 1172
- Mediana ML: $139.438
- Venturino vs mediana ML: 31.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 58 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3242261346&sid=search) | $139.438 | -23.8% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |

### 29. Camión Volcador John Deere Big Scoop Dump Truck

- ID Venturino: `281259393`
- Precio Venturino: $130.000
- Tokens: camion, volcador, big, scoop, dump, truck
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 19
- Candidatos usados: 20 de 171 válidos antes de top
- Candidatos excluidos por precio: 3845
- Candidatos excluidos por score: 1291
- Mediana ML: $128.421
- Venturino vs mediana ML: 1.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 72 | [Dump Truck Toy John Deere Big Scoop Con Basculante Inclinabl](https://www.mercadolibre.com.ar/dump-truck-toy-john-deere-big-scoop-w-tilting-dump-bed/p/MLA2040201571#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1515118911&sid=search) | $153.450 | 18.0% | tipo: JUGUETE; tokens comunes: big, scoop, dump, truck; compatibilidad/marca: John Deere |
| 2 | media | 64 | [Camión Volquete De Juguete John Deere Big Scoop Para Arena,](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-big-scoop-sandbox-w-loader-3-yea/p/MLA2083629309#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3419509720&sid=search) | $146.588 | 12.8% | tipo: JUGUETE; tokens comunes: camion, big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/tomy-john-deere-sandbox-big-scoop-excavadora-de-juguete-con/up/MLAU4031048978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA3384748312&sid=search) | $127.053 | -2.3% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 4 | media | 56 | [John Deere Build A Buddy Green Dump Truck Toy Lp](https://www.mercadolibre.com.ar/john-deere-build-a-buddy-green-dump-truck-toy-lp/up/MLAU3986738139#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1536008371&sid=search) | $125.214 | -3.7% | tipo: JUGUETE; tokens comunes: dump, truck; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Excavadora Juguete Tomy John Deere Big Scoop 38cm Plastico](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3051332026&sid=search) | $163.990 | 26.1% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 6 | media | 55 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1556138081&sid=search) | $108.894 | -16.2% | tipo: JUGUETE; tokens comunes: dump, truck; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2170188784&sid=search) | $117.966 | -9.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3339182498&sid=search) | $92.388 | -28.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1655717113&sid=search) | $173.480 | 33.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3269069622#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA2149534314&sid=search) | $139.199 | 7.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=10&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $117.564 | -9.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3036951256&sid=search) | $110.965 | -14.6% | tipo: JUGUETE; tokens comunes: volcador; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Réplica De Camión Semirremolque Grain Escala 1:64 John Deere](https://articulo.mercadolibre.com.ar/MLA-2535939168-replica-de-camion-semirremolque-grain-escala-164-john-deere-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=item&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7) | $104.969 | -19.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Ertl John Deere Grain Semi Truck Toy Replica Escala 1:64 De](https://www.mercadolibre.com.ar/ertl-john-deere-grain-semi-truck-toy-replica-164-scale/p/MLA2063214672#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2587960862&sid=search) | $95.433 | -26.6% | tipo: JUGUETE; tokens comunes: truck; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Set De Juguetes Para Arenero Tomy John Deere: Camión Volcado](https://www.mercadolibre.com.ar/set-de-juguetes-para-arenero-tomy-john-deere-camion-volcado/p/MLA2084459505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1830502979&sid=search) | $91.971 | -29.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3154241320&sid=search) | $172.306 | 32.5% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1774875161&sid=search) | $173.371 | 33.4% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Camión Volquete Y Cargador Frontal De Juguete John Deere, 18](https://www.mercadolibre.com.ar/equipo-de-excavacion-motorizado-john-deere-18-camion-de-2-1/p/MLA2052053468#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2142707282&sid=search) | $178.456 | 37.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1462714353&sid=search) | $180.998 | 39.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Juguete Controlado Por Radio John Deere Johnny Tractor Green](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1992858294&sid=search) | $129.789 | -0.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 30. Camión volquete Big Scoop John Deere

- ID Venturino: `281259433`
- Precio Venturino: $148.000
- Tokens: camion, volquete, big, scoop
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 19
- Candidatos usados: 20 de 175 válidos antes de top
- Candidatos excluidos por precio: 3923
- Candidatos excluidos por score: 1209
- Mediana ML: $147.081
- Venturino vs mediana ML: 0.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 78 | [Camión Volquete De Juguete John Deere Big Scoop Para Arena,](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-big-scoop-sandbox-w-loader-3-yea/p/MLA2083629309#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3419509720&sid=search) | $146.588 | -1.0% | tipo: JUGUETE; tokens comunes: camion, volquete, big, scoop; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Dump Truck Toy John Deere Big Scoop Con Basculante Inclinabl](https://www.mercadolibre.com.ar/dump-truck-toy-john-deere-big-scoop-w-tilting-dump-bed/p/MLA2040201571#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1515118911&sid=search) | $153.450 | 3.7% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Excavadora Juguete Tomy John Deere Big Scoop 38cm Plastico](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3051332026&sid=search) | $163.990 | 10.8% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/tomy-john-deere-sandbox-big-scoop-excavadora-de-juguete-con/up/MLAU4031048978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA3384748312&sid=search) | $127.053 | -14.2% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 5 | media | 57 | [Camión Volquete Y Cargador Frontal De Juguete John Deere, 18](https://www.mercadolibre.com.ar/equipo-de-excavacion-motorizado-john-deere-18-camion-de-2-1/p/MLA2052053468#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2142707282&sid=search) | $178.456 | 20.6% | tipo: JUGUETE; tokens comunes: camion, volquete; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Volquete De Juguete Build-a-buddy John Deere Con Taladro De](https://www.mercadolibre.com.ar/tools-toolsets-toys-games-build-a-buddy-47508-no-aplica-u/p/MLA2062346156#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2142707216&sid=search) | $118.522 | -19.9% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2170188784&sid=search) | $117.966 | -20.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3269069622#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA2149534314&sid=search) | $139.199 | -5.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Volquete De Juguete John Deere Steel 16 Con Luces Y Sonidos](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-steel-16-w-lights-sounds-kids-3/p/MLA2078353280#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1729359979&sid=search) | $171.641 | 16.0% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3154241320&sid=search) | $172.306 | 16.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1655717113&sid=search) | $173.480 | 17.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=10&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $117.564 | -20.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Réplica De Camión Semirremolque Grain Escala 1:64 John Deere](https://articulo.mercadolibre.com.ar/MLA-2535939168-replica-de-camion-semirremolque-grain-escala-164-john-deere-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=item&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7) | $104.969 | -29.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Escala John Deere 320e Skid Steer Con Camión](https://www.mercadolibre.com.ar/john-deere-scale-320e-skid-steer-con-camion/p/MLA2069344031#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2370117548&sid=search) | $203.354 | 37.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3339182498&sid=search) | $92.388 | -37.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Set De Juguetes Para Arenero Tomy John Deere: Camión Volcado](https://www.mercadolibre.com.ar/set-de-juguetes-para-arenero-tomy-john-deere-camion-volcado/p/MLA2084459505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1830502979&sid=search) | $91.971 | -37.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1535052371&sid=search) | $91.616 | -38.1% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1774875161&sid=search) | $173.371 | 17.1% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1462714353&sid=search) | $180.998 | 22.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Regador De Tanque John Deere 876v 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/regador-de-tanque-john-deere-876v-164--a-pedidoexkarg/up/MLAU2927589938#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1988293942&sid=search) | $147.574 | -0.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 31. Camioneta y tractor John Deere

- ID Venturino: `281234460`
- Precio Venturino: $300.000
- Tokens: camioneta, tractor
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 144 válidos antes de top
- Candidatos excluidos por precio: 4607
- Candidatos excluidos por score: 556
- Mediana ML: $271.772
- Venturino vs mediana ML: 10.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1514896991&sid=search) | $293.399 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1507969023&sid=search) | $288.367 | -3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete John Deere De Estilo Temprano A Escala 1/](https://articulo.mercadolibre.com.ar/MLA-3096031022-tractor-de-juguete-john-deere-de-estilo-temprano-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $274.956 | -8.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1784581058&sid=search) | $270.242 | -9.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1417510473&sid=search) | $332.793 | 10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1949945520&sid=search) | $265.905 | -11.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1970561562&sid=search) | $247.506 | -17.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1571921115&sid=search) | $245.000 | -18.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=28e35b0a-ba2a-4885-bbba-140a07c66e0e&wid=MLA1585559315&sid=search) | $240.000 | -20.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA2138660238&sid=search) | $230.189 | -23.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tomy John Deere Johnny Tractor Ride En Juguete Juguete De De](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2182318240&sid=search) | $222.889 | -25.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1713564907&sid=search) | $221.560 | -26.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1767841826&sid=search) | $398.326 | 32.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1534604385&sid=search) | $399.880 | 33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1950555252&sid=search) | $198.353 | -33.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA2194899840&sid=search) | $187.899 | -37.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1782656432&sid=search) | $291.302 | -2.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1763349785&sid=search) | $317.982 | 6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1949971056&sid=search) | $323.265 | 7.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete John Deere Big Farm Con Vagón A Escala 1:](https://www.mercadolibre.com.ar/john-deere-big-farm-tractor-and-wagon-116-scale-ligh/p/MLA2038130505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3382284296&sid=search) | $273.302 | -8.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 32. Cargador de tierra John Deere

- ID Venturino: `281259415`
- Precio Venturino: $3.568.000
- Tokens: cargador, tierra
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 2 válidos antes de top
- Candidatos excluidos por precio: 5245
- Candidatos excluidos por score: 60
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
- Candidatos excluidos por precio: 4476
- Candidatos excluidos por score: 831
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
- Candidatos excluidos por precio: 4360
- Candidatos excluidos por score: 947
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
- Candidatos excluidos por precio: 4535
- Candidatos excluidos por score: 772
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
- Candidatos excluidos por precio: 5255
- Candidatos excluidos por score: 52
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 37. Cortadora de Césped Honda HRG466SKEP – 4.2 HP

- ID Venturino: `332868795`
- Precio Venturino: $1.866.924
- Tokens: cortadora, cesped, honda, hrg466skep, 4.2, hp, hrg466
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 11
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 5174
- Candidatos excluidos por score: 122
- Mediana ML: $1.995.000
- Venturino vs mediana ML: -6.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 134 | [Cortadora De Césped Honda Hrg466c1 - Pkeh 4,2 Hp](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466c1--pkeh-42-hp/up/MLAU3902334219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA3205391632&sid=search) | $1.599.000 | -14.4% | tipo: CORTADORA; tokens técnicos: 4.2, hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, 4.2, hp, hrg466 |
| 2 | alta | 111 | [Cortadora De Césped Honda Hrg466c1 4.5 Hp Potente](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=%2Foi9yAMf5z9ZvnVMlDBOKzppGTXIlkuni%2F7VI5uy0SBZ26aOhSjk7FKmPACiO1etZq4A25Qx9vbb7lvp3WQYRLtidDmhJZpzQktuDt294pJS00QGE0FTzJo978%2FoOkVeu3m%2FGbgyOCi4UItZtmvcvclIlNZOZJBvF9%2FANcFuvURwe4ngsW7xzlgg0G5GT%2B%2BWWFpx5DPuDluSBKQ27gUkhfAMyZRIS%2Fg56UQxLi94NLP4ZHchK%2FlnRWp%2BPSIVna5Ewu2uZfBklALhnFODWqc7fXutZyjxj2pxfJv8w7Q9%2FCh%2BIyY3Te4PTsUtxvb8eJ83eNng0DpqEMANJAQbYjQhLs0adhUZcRJozdWBW3wpbwXnc2uB9YIqjArSNY439gKWNgbOXNEPPG36i1sAEdX21rgTHD2L5sIZwFjJZWnbCEqBBgYyWlvrwJRDVICQSn%2F6i%2F2RxEZ4Y65Nxxh%2Bd%2BVZphK1fZxidoeFos4E0yHBERcHCBMhdIka8VwfUnS2VoZ0CQPhja1Djc0Cd1EL1FzyuIls1cb%2BlHfvEBb%2BYd2rK%2BMorSE84ZYErjXOIpDOTlGXh4e%2F3dR5A%2FOLwhxSXe1Q0iNgSHGYDIQLqvRSaGBfZjGj%2Fy6Ixhi5AEGs3EN5NgwMRqJ2T22t7Ivhi4KUTcdoIjMV4tJY1zZEeL9FcMscmqnFzkjohHaX%2BtLMVFGbkdzVao47vJJPmwdrD3F8nUL4t0c2UxW1rMMD2Z8g%2FxBTX0MRjgsyCoTa%2BcMx1sy6yp%2FtM2FKsUpMKglVh%2By2LAIZ3%2FIAWRt11xhqDLuOZqpeojVJqd0twNpxxMMLFW6DV8uEy%2BCPnAwrp4TQNwU9iLMxRWXdWzr6UIxvLNIbOzC2IlTctNthTewN9Ebf8ft91IBId116eoyagAttUI4AN3DdRU45y4p9M5eZKGX9VZoMmZ1h5dFVE%2FMvjMfmo4uyJ%2F%2FKAaEPtd0dRjrsDtFQv4%2BudQ%3D%3D&pdp_filters=item_id%3AMLA2753066492#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3715316844&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA2753066492&sid=search) | $1.900.000 | 1.8% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hp, hrg466 |
| 3 | alta | 104 | [Cortadora De Césped Honda Hrg466c1-skep Autopropulsada](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466c1skep-autopropulsada/up/MLAU3168023434#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1495788577&sid=search) | $2.297.275 | 23.1% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 4 | alta | 103 | [Cortadora De Cesped Empuje Honda Hrg466 Pkeh Con Bolsa](https://www.mercadolibre.com.ar/cortadora-de-cesped-empuje-honda-hrg466-pkeh-con-bolsa/up/MLAU3646755144#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA2616713048&sid=search) | $2.257.200 | 20.9% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 5 | alta | 102 | [Cortadora Honda Hrg466c1 4.5 Hp Autopropulsada Skep](https://www.mercadolibre.com.ar/cortadora-honda-hrg466c1-45-hp-autopropulsada-skep/up/MLAU2956799261#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1995798192&sid=search) | $1.841.500 | -1.4% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hp, hrg466 |
| 6 | alta | 102 | [Cortadora De Cesped Honda Hrg466 Skep Color Gris Oscuro](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466-skep-color-gris-oscuro/p/MLA44825464#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1654450531&sid=search) | $2.250.000 | 20.5% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 7 | alta | 101 | [Cortacesped Autoprop Honda Hrg466 Skep 4.5 Hp 46cm Motostore](https://www.mercadolibre.com.ar/cortacesped-autoprop-honda-hrg466-skep-45-hp-46cm-motostore/up/MLAU2872825821#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1969025994&sid=search) | $1.995.000 | 6.9% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hp, hrg466 |
| 8 | alta | 100 | [Cortadora De Cesped Honda Hrg466c1 Skep 4.2hp Autopropulsada Color Gris Oscuro](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrg466c1-skep-42hp-autopropulsada-color-gris-oscuro/p/MLA57775744#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA3383003158&sid=search) | $1.810.500 | -3.0% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, cesped, honda, hrg466 |
| 9 | alta | 96 | [Cortacésped Honda Izy Hrg466 Autopropulsada Gcv145](https://www.mercadolibre.com.ar/cortacesped-honda-izy-hrg466-autopropulsada-gcv145/up/MLAU2807782521#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1960678598&sid=search) | $2.136.140 | 14.4% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hrg466 |
| 10 | alta | 94 | [Cortadora Honda Hrg466 Pkeh Bolsa Recolectora Naftera Empuje](https://www.mercadolibre.com.ar/cortadora-honda-hrg466-pkeh-bolsa-recolectora-naftera-empuje/up/MLAU3387157399#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&float_highlight=last_units&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1517836965&sid=search) | $1.566.000 | -16.1% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hrg466 |
| 11 | alta | 94 | [Cortacésped Honda Izy Hrg466 Gcv145 Color Gris Oscuro](https://www.mercadolibre.com.ar/cortacesped-honda-izy-hrg466-gcv145-color-gris-oscuro/p/MLA56344154#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA2435446240&sid=search) | $2.430.780 | 30.2% | tipo: CORTADORA; tokens técnicos: hrg466; modelo Honda compatible: hrg466; tokens comunes: cortadora, honda, hrg466 |

### 38. Cortadora de Césped Honda HRX476VYEH – 4.8 HP

- ID Venturino: `332865987`
- Precio Venturino: $3.281.116
- Tokens: cortadora, cesped, honda, hrx476vyeh, 4.8, hp, hrx476
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 5239
- Candidatos excluidos por score: 64
- Mediana ML: $3.593.363
- Venturino vs mediana ML: -8.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 104 | [Cortadora De Cesped Honda Hrx476c2 Autopropulsada](https://www.mercadolibre.com.ar/cortadora-de-cesped-honda-hrx476c2-autopropulsada/up/MLAU3167975844#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1495575311&sid=search) | $4.112.864 | 25.3% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, cesped, honda, hrx476 |
| 2 | alta | 96 | [Cortacesped Honda Hrx476 Con Embrague Autoprop](https://www.mercadolibre.com.ar/cortacesped-honda-hrx476-con-embrague-autoprop/up/MLAU3059195063#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA2028422062&sid=search) | $3.306.000 | 0.8% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, honda, hrx476 |
| 3 | alta | 95 | [Cortacesped Honda Hrx476 Con Embrague Autoprop Color Rojo](https://www.mercadolibre.com.ar/cortacesped-honda-hrx476-con-embrague-autoprop-color-rojo/p/MLA47205810#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA1562771909&sid=search) | $3.306.000 | 0.8% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, honda, hrx476 |
| 4 | alta | 94 | [Cortacesped Honda Hrx476c2 Con Embrague Autoprop Color Rojo](https://www.mercadolibre.com.ar/cortacesped-honda-hrx476c2-con-embrague-autoprop-color-rojo/up/MLAU3294443954#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=3b43a2b0-86b9-455c-b038-6a492097533c&wid=MLA2174350398&sid=search) | $3.880.726 | 18.3% | tipo: CORTADORA; tokens técnicos: hrx476; modelo Honda compatible: hrx476; tokens comunes: cortadora, honda, hrx476 |

### 39. Cosechadora con Duals John Deere X9 1100

- ID Venturino: `281259430`
- Precio Venturino: $258.000
- Tokens: cosechadora, dual, x9, 1100
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 15
- Candidatos usados: 20 de 157 válidos antes de top
- Candidatos excluidos por precio: 4468
- Candidatos excluidos por score: 682
- Mediana ML: $258.971
- Venturino vs mediana ML: -0.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 93 | [Cosechadora miniatura John Deere X9 1100 1/64 Ertl](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=Qr3mMTRHkQ9%2FibzkHUZesPWh40A6oK8MMzxQ1Q7zwkobV%2BrCCtrqaOEYVelrJ8TwblQKCau%2FeqW8ho1UiRfzIH3%2FpPWpuVB%2FlISQT12W9qXajDoDg%2BFG1Sc704bUXsimeAQfo2Rp32LMkxIvSly9ccDpFFs0zpWQ95Zg3hrTGIxeLLMa%2Bxp4uGHvlxt3GPa1IH8ZS4bXG5QEhUn2wbZYWcTCZq2paC428K98OrzyHuDZA8ItGZJwrHMYv9kzPQr2KlJIYV7kGWLCMuDI1KmBd8BdOd9%2BRH6OB%2FlV6vnQJoKCGHkKXn18VM8HnD8S7X3V%2FgMBLj%2BI8XOii7HoqQKorO4aGVV4aOqWNdwKp83qxs3S5hqHIplypbqDStuCBBBhd3esbwJM0QBM8RzhHdNPTBIdh40DqOQS8YOOeG5m8lyFSe3f4YfHgrEQh49XPJuObOCyMh9%2FNrREG2PN%2BNxa83EnbIF3iiCQ%2BVrJD%2F7kstwbeQhu1BW9tu%2Fp4510BOeyLJg%2F1A7%2FINHTK79ngqasPeqv2Ll3Ird3cnqdp6CSXsWwymAJITKADeqQ80g60ya%2Fk9N4rd0ailvSgeG7Gsehba%2BAhxdbfqIiCf1JOreBmeP5eV%2FI7aLyGJKxLF%2FnyW43EhlzhK86J7fqCVEf4KHEmTER0%2B2bOSi6y8DsQtRw2JlYmqbiurHVSx42MWdFb5i8FdWjKEqIUHqKh0xHFJwzlT6kghR5tlskF8E%2Brz2WE5Ymimk8iiwSgMcfqVAsu7SI1rI8hS4S%2BS0ERpucC5xkc5J6uu%2Bjf%2FgEN51H1dv1P%2FsZpxTOw%2BzrStz1n7cr5vTZ3dYkqbCiHg%2BQwj9NsqrykbHBsyTpfsl%2BQiPfe%2BAjN%2Fb2t5NFg8J0vRzrCQrYKNKVX1S%2B%2FuEvMBTw6XsP4lcF%2FYXzmzmJimDA%2BatclGiLyn0GeXCt1ydyC6cB5MQ4QgeO9lCrFN1%2FDwUt5N%2B8UQ%2BIyA%3D%3D&pdp_filters=item_id%3AMLA2806898370#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA21742050&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2806898370&sid=search) | $250.000 | -3.1% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 2 | alta | 92 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1911294048&sid=search) | $265.120 | 2.8% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 3 | alta | 70 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1447751815&sid=search) | $263.348 | 2.1% | tipo: JUGUETE; tokens técnicos: x9; tokens comunes: cosechadora, x9; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Cosechadora Juguete John Deere 9610 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-john-deere-9610--a-pedidoexkarg/up/MLAU381583702#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1794644744&sid=search) | $254.491 | -1.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Cosechadora Juguete Caña John Deere 2023 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-cana-john-deere-2023--a-pedidoexkarg/up/MLAU345520548#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1716821474&sid=search) | $264.878 | 2.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Cosechadora Ertl John Deere 1:64 7720 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-john-deere-164-7720--a-pedidoexkarg/up/MLAU3622286639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA2597394962&sid=search) | $220.880 | -14.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Cosechadora De Algodón John Deere Cp770, 1/64 Verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=iPLSvec%2BnJ9dM8b3FagEg%2FX6hOPZO7XucuDyk5S2GbiP5XoZbyAFcwq4qc4TaU9hEFSwnTr%2FKWod6%2FnD4o7DWdSGe37BViXrXlI37CC8lJjuRiMnVeb%2BcNTnmmBcUbM6g64wRSosytJV%2Bwvzk4Li0zMEfte9uQiNJc6EaBh%2F0z1CaypVd3DWR5UJwWA500hdD%2Bc%2BvX8KF5BG5YC0jmRrKmLRx3y0L8Ve7YtMrXnmuzbGZedQdjKmS9RoLiltAVNs%2BCp%2BQ2OmkGVMVIEp%2FDYC5STwU4XjVGNu3%2Bm%2BuHtAywWKuO9PsmeAtjmBUbJMhaQSqDmLHhbeJ3DK0mHcoqZj1No28%2BafJWgfH0puWZUZL7ksCvKwbiQJC5jwTK1Wn8tGU6VygiHGgQDsM%2BjH0mobsXMYpyQ7rH4kKwNChFi%2BiHDcokgSMNWK1TuPpXxqUSG4f18QawZABviSCg4ANX8b1zVlZEvwE9oJREnPCXvux370r9gqWUHD8ME%2Brjzs%2FPG7CKHBa4hw4vRlW25%2BH2GeprCjo7xf3DFxvm5Y70PRrNagmF4kujoE7enLahMNTNfs2nwUOyyOANsteEhfcCHMGh7Ibq7FnXgIOdnv6faHxFWA0Gb0iHvLcuQ582w3MIUSvG1Pog44vCzbdpJIZSA1vn5pdlxNzVdh%2FmvoyHQED59uHeoryFI35RcJB2ifj3nWwy27aM7oEH35xKn7Gyhj0NcVC9tbGPHsRuzDPt%2F7d2GCC32Ih3%2FAugg1NbRw1hUThFONtVyejQypEneOUh7GIUT26N8tNOd6a50dQ5Gs2ewkfE7IdKW3M2G4xTozNrqaLRJvPlrdX9gndue4sji8oxYaSK9KmuCO%2B0BYj5mlPXf%2BbAxUuz31GTOHT4YF8gtGNOzpomMQ184BObM0RcNCziq1lLx6b%2FrgsQNiNBNp%2Fkvw%2FsQNgTQ4T3Pggi2WBsHHvOXQWZeoIA%3D%3D&pdp_filters=item_id%3AMLA3117505332#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA64944786&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3117505332&sid=search) | $215.000 | -16.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Cosechadora 1/64 John Deere Model S7 900_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-model-s7-900exkarg/up/MLAU3421966953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2363760294&sid=search) | $303.550 | 17.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Cosechadora 1/64 John Deere S680 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s680--a-pedidoexkarg/up/MLAU3211473392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA2095857690&sid=search) | $305.134 | 18.3% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Cosechadora 1/64 John Deere S780 Tracked - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s780-tracked--a-pedidoexkarg/up/MLAU3211445872#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA2095728162&sid=search) | $317.339 | 23.0% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1655717113&sid=search) | $173.480 | -32.8% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Siku John Deere 670 Cosechadora Línea Pesada Metal Escala 1:87 Verde](https://www.mercadolibre.com.ar/siku-john-deere-670-cosechadora-linea-pesada-metal-escala-187-verde/p/MLA28466993#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&float_highlight=last_units&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1579003794&sid=search) | $264.249 | 2.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Cosechadora miniatura John Deere S680 Prestige 1/64, color verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=wqS5iO6fI10WKMz%2Fmc4u9FaQlAh%2FNSCJXpVcz6KCPpvNy1EuprawO6ChSalvbT9dVH7HlEe%2BD74qlpMNzRSI1Etz6a86n%2FPb5ZF%2BfRkYqr0OLsjGOV%2B%2Bp5zowF7tmDQWFPc6UePKSIOA4cLT3iICj68chuJ%2B5g5euApCPlTTjsnvam2uPkIxk0HuZsgAM%2FVgvuc1S%2F2ldo3aDDV%2F7a8s5%2Bi9GdUO1RqPZWFbw3zNni0%2BSWcphpySucjJqL9Z%2BTrmnXe7HhrtWZ5kaQZUH1r8apcO4L%2BJPBZPPGZ8u6RdGIUBqy0o6vf9VezBoQ%2FnD4qmzaAya7w62ApGnioidQormndOk9%2BJj255S1OJHLbQHLkWyFLEBXKr2LdVhNjYW9nqD9JdI2rxr5ne3hZK7%2FUVmffdNWgYCMIvjguWnFIvrhSUIAch3MLdbjspkp11GkaXcooy6Hj82g3CcM2PMnm5CejDbS0sJUcgPde8TGY8xTd9XYKJxvmX76uFzrrSnYgZ7GcBt4GGkhJIXM4g0gNFiOu6R%2FGWdIChaAGo6uQwT4zRXBene5%2FPaWW2OGwgIftZYQSHmtpUcOizaltAiLgPYuq%2Bm53wfz7OCmSodTxKcNeiYjZ0y7KweyD%2Fsi0R3KAtDLI%2FKu8nUseFE1NmhHu3vpXthkgDf6sYaycQmCnX%2FE4SJqU6oR0D5DPJP8IS8dwa%2FGr7%2BTHQD5HwiZe33sl7Y8H9gfhinX8BZK3%2BbIzuQ3AMtTnWROct6p1Hf%2FAZVkr0l3rwbZR4ecFmi7TmqxJ2rRZ0BMOMOkrHz197ND70ZNbNaXBqJJxr9PaCitzi53emyLB%2Fvz%2B5EQ33wm8a9FsdegrND8NfKAP%2Fvi%2FzgJ%2BmQ1FD4JNzByYv4bClS3eGRtNErEQh5bKuC4%2Bs6jV2h5xP4clj1l%2B1Gwn%2F%2BORMRb%2BxRJBGEz78ndwi46y1pj1iNKFdQiDFIwVRHK59JlIDacNaKMuoHHvMKqmCSRPe2DU%3D&pdp_filters=item_id%3AMLA2579058396#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA61519873&backend_model=search-backend&be_origin=backend&search_layout=grid&position=13&type=pad&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2579058396&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Cosechadora miniatura de granos y maíz verde John Deere S780 1:64](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=zldV0P3zu6KwGk2DnBsO225%2B%2FohOovjXfjrI1Dbwgsry6PKN%2FeC%2B8ZTbsQZg0x7jymGDrjPwKisM9rzkBwfkibUT%2BnzZ2Yj%2BCMhBCyIxodL8lVaFPpcrl2ccxoVaCY8Y8o20e%2FM66uyQzu%2BYNZ%2F2pfj1oj%2FTtsQxeBJDBYgIz88KYfTsNU85SQ%2FBCmRus1ogP5rzNFD210BLZQXzu6teciu2TbEWPRwJ2GuaJZPtZ8D0pPgAt6v4VBRTOWvas2FydpzrbcOihQiBlU27eoXNpfE7Izf9wh3MXSBxoFYZk1mQfpMbszYq8t6ESKyf7%2Fdjo9CNmG%2BrO0zTOIhZPtPwvlZsTHNzEAyqUAQYQhUKlL%2F9nJJy1AMDz4tIkMNcELfKdxaNv6CRJCdnWOHSdvQnJqGLiimCeNwL0igCKiJ2WzYdVmLlYtXlNJpm0fJmilTviEo8ixs%2Bs4%2BYj5THfL6rQvmpj8ysRb6l%2BH6%2BSSbgZlbPkPxN3Gi6pCq3x1pxghls89%2BK%2B9iVMNtKMb%2FCdLF0pbEc%2Fa0eGb6w4HP48GJNhXX0DkHUtSWzXCknhdkwTSNUj8Ym2pdxeaFCWg5vm6xLu4toDJYX5UfkMQ5oseF1uNB75L5Dlwr4KtYfjfk%2BlGGxlQSyJrX2M6hdqmDIVpA%2FisGPkDDccDuVP8ChlkfPGDbnqvOVYBwLyEEtah9HpZHek7fXfvWGbXHUu%2BVvLdijNArCgTtC0lRhYmIGLwDc3Jk9WwtB3rYuBnQ4dm09kAU1PTIV23WLPXrdw8cfFW6ZIXWvfoLL2fVJfZnNUWI9OcLr00ZCHB6pQpiXsWeqLXKQyL12fpQk8MvO%2B6K0UNiUscoGS6A%2BLbr7WClQKrOQMUddffJeHaltfTMXKA%2B1GqOEtLmuN80vJ8m9Jmo5SpNb7IK1AwOBIAGfUw4GMOeWa2GMtwtXVo9W5dP9Aqj%2Fib4lh6MaSYS6rKCWxx2xUADGC6fVex9BhLv8eOtzdJAiZn8%3D&pdp_filters=item_id%3AMLA2579195550#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54400721&backend_model=search-backend&float_highlight=last_unit&be_origin=backend&search_layout=grid&position=14&type=pad&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2579195550&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Siku Camion + Cosechadora John Deere Serie 1851 Escala 1:87](https://www.mercadolibre.com.ar/siku-camion--cosechadora-john-deere-serie-1851-escala-187/up/MLAU3881142255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=04714a11-e302-4409-93e8-3fd5fdab7bd4&wid=MLA3159287736&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 16 | baja | 42 | [Cosechadora en miniatura Case Ih Axial-flow Af11 1:64 Ertl, color rojo](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=doH1elmaAhkxzP2r%2Fj8u54j3bOS8Akr5HPipcIwv2GQPVZXOGbHo%2F%2FMqBPD%2F5GzIG8%2BQJUxMEtSNh7%2BiU6FYTav%2FiS2nLqezuzFd%2Fz1vShcEWQDwgI9dSybSZxOG7BSc4BPgmSwUf%2FPZoYEKJw621h2QpkemS6THpZ020fY5cE%2F%2BGu1vBSuLS6XHxBmgOhJx7F3ZV2Damc9VtADu1EZz9FPN%2BGYZ9TYysfJVpZ18tDg%2F0Y1bWl3HNfhuT8Tqdz3vTDq3JtUdXGOOQE0W0wZHI0OxX6827aqW%2BeCxYpWlg%2BZto4g1ADghBe5nnoEwL84ITJTt%2B18r6wJrGVYm5xOQB5ssix9GlkBF9zE4WUiFLV6Zi9DjSlQ04TTwzpRIFk9FlBdkWRNjX8qd%2BCXGEjcixQ5mQW429M2BJgZR%2BBpgIfWWV0I12gjqsG%2BaOzDE1%2FbBmAY8%2FlctE2Zb7tqeoRBDwQ3ArpkFzmh%2FZB9Se8B9n0cijC60o6usBy1ygz4%2B7vCcFjFSQRQSdiV7cG2MR6RyPlDn7X5PdDv5PmtdZWgsotQ9Is0WB5g3LG7XJCn%2BUtlm4DbrGg79KnUsqiyPKoHI9LAglAyFQjixgXxyPPnbZAHUPV3tYio4MJnAbuptp7ril%2FsisBBAL4%2FNEaQXbSrs6yIHWX7kJHMa9jBqLrBaEbiV8q5YXx2t%2BOtwt4YxEIF219n60I7wHxMxhYpSJEVh66MRwIEWVZBJazjpHJyQHOPlzqLHZ0gTSzqRZjnM860ljiX7WjIKtLUrv6%2B753y8jOAU49Wc%2BpJvM0IrrBuNRFJiy%2FOUfp1Jpwt9N6d1pXvrTvLnvkQaGLgz2r11BSpiiQo3Cq0yYA9Riwk4TpG9xHfRv%2BIqpdIKUDJLNX0%2BCpjkO9DPa9khgDzT%2BHX5q1QzBYYKtqedQH1MHmn0rfTwkjYgSalLor0LrtQEN5LB6mU9MxlMNJpxt1dvHiJLkMmfZ2xTz7mCpNsM0jBncMpgcOW1MhKA3128aPw%2BEFLraJRsS60D3Y%2Fxn13dW42adAF%2FEC52piRsng8h%2BJSl66nieFWDHmdGUPln3hU%3D&pdp_filters=item_id%3AMLA1634774593#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA62495699&backend_model=fallback_productos-promocionados_reco_of_reco_supple_view_view_reco_of_reco&be_origin=backend&search_layout=grid&position=52&type=pad&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1634774593&sid=search) | $240.000 | -7.0% | tipo: JUGUETE; tokens comunes: cosechadora |
| 17 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1141825591&sid=search) | $258.952 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1584365843&sid=search) | $258.990 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=83wctu0FrF1f8v3ORtAhcTCXIxcHvNb9VHZeI0AqfRgYs%2F%2Ba6%2FIw98KHjQDAVbYVWdS%2BsQEoTS84cKH0arUxtOr29chXPSMe8xbcWL8wniydWY2wOSXadt0ybgBNbCOqbblBtprhH9YwOvlixJtVuxUkg417rwRAxtWSxj1FDyJnMW4j1LmABt%2BQelnMWFYgxbk1O5toto4Yabcofn8FVZBK2eH4rlgy8jvr7VhAezfukvuejngqPXuVKG%2Bzvxnz18HVWLLeobnma6OLXR%2Bil8mYpBS7APYY%2F735UiNefghyyCSOkf26%2Fjy6lF5t%2BFKw%2BfSnixg5AWXM3LmTU%2FThcfdY0Q8pdawKlUf3ykH2D5Xk3A6BkiHfINESnGv%2BJyppuyGYlQAHa%2FbZRD5zZIgXWfK%2FqlriYNg2dwA3B61FQia5sYPCn4QU%2FoovwqkoFtuaAOkGcO3OaiZ3mjn%2Bkp8v6QLWbdKU7cqo8bp%2FQxvHiJh2jvioIrk9%2FebNCfNFA%2FX2iDjSucZZ7uGPahboklMNwTzEgYZHnLtjLzMZQXQmyJFkvUcwW1gOnzV3nJLY%2BfnPcCG%2BJovUIAQOSpqSOGasIFGqMJ1%2Fg7obWs9yoVUIaCY5ctoS1M51ww92NWKMTBg6g6stBM0H1kJdJqexdu5vr5DfsW7fLxGUXBqGhCyrS%2FFi85zeMGVuSnJ1B0S7a00VL%2F46nmmyUz4oGs3cZGTEcI5ljhlD%2FPtjaT3RKW7ABEng8kykcxKAEkGytWlOCnGOq6OYm4x9SLKb1UTbfO58ia9t6PDw6hC6iu66Wjbu4p1KCb83cbr9QupMdDlT%2BDBrWyZ7HCNQf1amnjXftR%2BDeIyfqdIOx2%2Fa4kK67y%2FaQAGU1Mjwxy%2Bgbkdsubg6zlNgT8PnwlqHxPFlbxgM1J6s2ig%2BqrWRcZYrh3lpqgqDUX8f9hMt5xY69QA5mfU61UaulzhlvIahYWQntHsaYlEvQQNcT0YvW%2FVj3zpPUA%3D%3D&pdp_filters=item_id%3AMLA1688046131#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54486376&backend_model=search-backend&be_origin=backend&search_layout=grid&position=15&type=pad&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1688046131&sid=search) | $259.000 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1583656447&sid=search) | $259.000 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 40. Cosechadora con orugas S780 John Deere

- ID Venturino: `281222483`
- Precio Venturino: $1.100.000
- Tokens: cosechadora, oruga, s780
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 20 de 25 válidos antes de top
- Candidatos excluidos por precio: 4984
- Candidatos excluidos por score: 298
- Mediana ML: $897.660
- Venturino vs mediana ML: 22.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-ertl-116-s690--a-pedidoexkarg/up/MLAU3405181522#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA2316244096&sid=search) | $1.366.734 | 24.2% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Cosechadora Bruder John Deere T670i 1/16 Escala Detalle](https://www.mercadolibre.com.ar/cosechadora-bruder-john-deere-t670i-116-escala-detalle/up/MLAU3709741640#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA2735955818&sid=search) | $801.919 | -27.1% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tractor De Coleccion John Deere Ertl 8rx - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-ertl-8rx--a-pedidoexkarg/up/MLAU148472123#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1139042452&sid=search) | $1.146.516 | 4.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Tractor 2024 Ertl 1:16 John Deere 8850 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2024-ertl-116-john-deere-8850--a-pedidoexkarg/up/MLAU3512484909#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1566725471&sid=search) | $1.190.050 | 8.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Lego 42157 Technic Skidder John Deere Bunny Toys](https://www.mercadolibre.com.ar/lego-42157-technic-skidder-john-deere-bunny-toys/up/MLAU127418845#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA1422484952&sid=search) | $1.199.999 | 9.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tractor Ertl 1/16 John Deere 4440 High Cro - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-116-john-deere-4440-high-cro--a-pedidoexkarg/up/MLAU232697105#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1370428787&sid=search) | $956.901 | -13.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor John Deere Ertl 1/16 620 With 555 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-620-with-555--a-pedidoexkarg/up/MLAU3404496394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1519688549&sid=search) | $922.938 | -16.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tractor Ertl John Deere 1/16 Precision Waterloo - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-116-precision-waterloo--a-pedido/up/MLAU3913388889#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1762009919&sid=search) | $900.020 | -18.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor De Juguete John Deere 1/16 Colección Prestigio](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-116-coleccion-prestigio/up/MLAU3887620554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1734903333&sid=search) | $895.299 | -18.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor John Deere 53 Cm Big Scoop Para Niños](https://www.mercadolibre.com.ar/tractor-john-deere-53-cm-big-scoop-para-ninos/up/MLAU4043073139#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1818690673&sid=search) | $1.379.615 | 25.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Tractor John Deere 53 Cm Big Scoop Para Niños](https://www.mercadolibre.com.ar/tractor-john-deere-53-cm-big-scoop-para-ninos/up/MLAU3215165316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3337726446&sid=search) | $1.379.615 | 25.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Botas Men's Skechers X John Deere Wtrpf Rowood - A Pedido](https://www.mercadolibre.com.ar/botas-mens-skechers-x-john-deere-wtrpf-rowood--a-pedido/up/MLAU4009919970#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=df24d17f-f498-4fd2-b3b9-24401c99d826&wid=MLA1802307541&sid=search) | $804.950 | -26.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Camión De Carga Ancha Tomy John Deere Big Farm A Escala 116](https://www.mercadolibre.com.ar/camion-de-carga-ancha-tomy-john-deere-big-farm-a-escala-116/up/MLAU3564484178#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2568887568&sid=search) | $795.999 | -27.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Plantadora De Juguete John Deere 1:64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-164--a-pedidoexkarg/up/MLAU216527677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1138239021&sid=search) | $768.366 | -30.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Tractor John Deere Ertl 1/16 9r 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-9r-640--a-pedidoexkarg/up/MLAU3056769388#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1480847539&sid=search) | $1.448.971 | 31.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1422054560&sid=search) | $733.573 | -33.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Plantadora De Juguete John Deere 48 Filas - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-48-filas--a-pedidoexkarg/up/MLAU151239803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1146832296&sid=search) | $705.810 | -35.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Camión Semi John Deere Big Farm De Tomy Con Plataforma De Ca](https://www.mercadolibre.com.ar/camion-semi-john-deere-big-farm-de-tomy-con-plataforma-de-ca/up/MLAU3556794925#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA1582475319&sid=search) | $678.999 | -38.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Embaladora De Coleccion John Deere Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/embaladora-de-coleccion-john-deere-bruder---a-pedidoexkarg/up/MLAU252406879#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1248654054&sid=search) | $667.487 | -39.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Bruder John Deere 7r 350 Con Remolque Forestal Y 4 Troncos 0](https://www.mercadolibre.com.ar/bruder-john-deere-7r-350-con-remolque-forestal-y-4-troncos-0/up/MLAU3556948383#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2568493822&sid=search) | $661.999 | -39.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 41. Cuchillo de mano John Dere

- ID Venturino: `276681820`
- Precio Venturino: $34.000
- Tokens: cuchillo, mano, dere
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4332
- Candidatos excluidos por score: 975
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
- Candidatos usados: 20 de 33 válidos antes de top
- Candidatos excluidos por precio: 4511
- Candidatos excluidos por score: 763
- Mediana ML: $226.300
- Venturino vs mediana ML: 18.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 68 | [Filtro De Combustible Re500186 John Deere](https://www.mercadolibre.com.ar/filtro-de-combustible-re500186--john-deere/up/MLAU154598443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=e371f417-8cf7-4c6c-87da-0d27aae2b38f&wid=MLA1223890867&sid=search) | $208.000 | -22.1% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 2 | baja | 68 | [Filtro De Combustible John Deere Re541922](https://www.mercadolibre.com.ar/filtro-de-combustible-john-deere-re541922/up/MLAU216458098#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05784cd9-5ef3-4e9f-9b4a-4fa6e7897b42&wid=MLA1131562648&sid=search) | $191.493 | -28.3% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 64 | [Filtro De Combustible John Deere Re525523 Agrícola](https://www.mercadolibre.com.ar/filtro-de-combustible-john-deere-re525523-agricola/up/MLAU3710310947#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=41ad1c1b-d67d-48ff-af19-b6dbf083c193&wid=MLA2764132958&sid=search) | $334.999 | 25.5% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 4 | baja | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere S550](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-s550/up/MLAU2039237397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=2c50459c-6f07-4567-b506-595e1c0a92ab&wid=MLA1929743570&sid=search) | $283.897 | 6.3% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 5 | baja | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere 9570](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-9570/up/MLAU2030480381#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=05784cd9-5ef3-4e9f-9b4a-4fa6e7897b42&wid=MLA1453989409&sid=search) | $285.000 | 6.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 6 | baja | 61 | [Filtro Combustible Donaldson Equivalente John Deere At365870](https://www.mercadolibre.com.ar/filtro-combustible-donaldson-equivalente-john-deere-at365870/up/MLAU285295780#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=fd799ff1-f27b-4895-b89a-788fc03c2c04&wid=MLA815422587&sid=search) | $201.600 | -24.5% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 7 | baja | 59 | [Filtro Combustible Donaldson P576918 Eqv. John Deere Re60021](https://www.mercadolibre.com.ar/filtro-combustible-donaldson-p576918-eqv-john-deere-re60021/up/MLAU250437733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=product&tracking_id=45bf22b4-7db9-493c-a74b-71b8deb0a9a0&wid=MLA1124362080&sid=search) | $201.000 | -24.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 8 | baja | 59 | [Filtro Combustible Mann Wk8187 John Deere Eq Re541922](https://www.mercadolibre.com.ar/filtro-combustible-mann-wk8187-john-deere-eq-re541922/up/MLAU3801833597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=29cbdbda-ad9d-4c09-8324-d2ff1d58c506&wid=MLA2898605838&sid=search) | $163.500 | -38.8% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 9 | baja | 58 | [Filtro De Combustible John Deere Am876411 X495 X595 415 455](https://articulo.mercadolibre.com.ar/MLA-1817725113-filtro-de-combustible-john-deere-am876411-x495-x595-415-455-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=item&tracking_id=3e6b3b11-c08b-4527-996b-b7cc7e8bcedf) | $256.116 | -4.1% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 10 | baja | 52 | [Filtro Hidraulico John Deere At335492](https://www.mercadolibre.com.ar/filtro-hidraulico-john-deere-at335492/up/MLAU3924339920#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a&wid=MLA1761887079&sid=search) | $220.000 | -17.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 11 | baja | 51 | [Filtro Hidráulico John Deere Re45864 - Agrícola](https://www.mercadolibre.com.ar/filtro-hidraulico-john-deere-re45864--agricola/up/MLAU3700145760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=41ad1c1b-d67d-48ff-af19-b6dbf083c193&wid=MLA2711956876&sid=search) | $225.000 | -15.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 12 | baja | 51 | [Repuesto John Deere Tractor Accesorio Filtro](https://www.mercadolibre.com.ar/repuesto-john-deere-tractor-accesorio-filtro/up/MLAU309943856#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=207fd3f4-7f2d-4617-b61b-cc683051ed94&wid=MLA921993694&sid=search) | $180.000 | -32.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 13 | baja | 51 | [Filtro Secundario Para Cosechadoras John Deere Ah212295](https://www.mercadolibre.com.ar/filtro-secundario-para-cosechadoras-john-deere-ah212295/up/MLAU2956350677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=33b6918d-7dae-4541-8450-db68f8389b4a&wid=MLA1995411330&sid=search) | $172.445 | -35.4% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 14 | baja | 50 | [Filtro Hidráulico Donaldson P574617 Eq. John Deere At308274](https://www.mercadolibre.com.ar/filtro-hidraulico-donaldson-p574617-eq-john-deere-at308274/up/MLAU309430473#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=45bf22b4-7db9-493c-a74b-71b8deb0a9a0&wid=MLA926567545&sid=search) | $278.900 | 4.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 15 | baja | 50 | [Kit De Filtros John Deere Lg249 Home Maintenance Oem](https://articulo.mercadolibre.com.ar/MLA-3281755084-kit-de-filtros-john-deere-lg249-home-maintenance-oem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=item&tracking_id=4bbd37a2-5d0f-4d65-8460-09a95e742a33) | $241.790 | -9.4% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 16 | baja | 50 | [Filtro Aire John Deere 9570 9670 9770 9870](https://www.mercadolibre.com.ar/filtro-aire-john-deere-9570-9670-9770-9870/up/MLAU3886744562#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=29cbdbda-ad9d-4c09-8324-d2ff1d58c506&wid=MLA1734058763&sid=search) | $237.793 | -10.9% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 17 | baja | 50 | [Kit De Filtros John Deere Original Equipment #lg195](https://articulo.mercadolibre.com.ar/MLA-3365318118-kit-de-filtros-john-deere-original-equipment-lg195-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=item&tracking_id=4bbd37a2-5d0f-4d65-8460-09a95e742a33) | $230.925 | -13.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 18 | baja | 50 | [Kit De Filtros John Deere Original Equipment #lg195](https://articulo.mercadolibre.com.ar/MLA-1800977901-kit-de-filtros-john-deere-original-equipment-lg195-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $230.585 | -13.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 19 | baja | 50 | [Filtro Aire Para John Deere 5090e Al119839 Al172780 Cp33300](https://www.mercadolibre.com.ar/filtro-aire-para-john-deere-5090e-al119839-al172780-cp33300/up/MLAU2901850439#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ae103956-c590-443e-b3b9-75c02ffa35c3&wid=MLA1467193781&sid=search) | $227.599 | -14.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 20 | baja | 50 | [Filtro De Aire Compatible Con John Deere Komatsu Cat](https://www.mercadolibre.com.ar/filtro-de-aire-compatible-con-john-deere-komatsu-cat/up/MLAU4038685394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b06da367-9449-4203-b383-b30b75b24072&wid=MLA1810324197&sid=search) | $222.076 | -16.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |

### 43. Generador Honda EZ6500CXS – 6.5 KVA

- ID Venturino: `332863753`
- Precio Venturino: $2.655.680
- Tokens: generador, honda, ez6500cx, 6.5, kva, ez6500
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 7
- Candidatos usados: 7 de 7 válidos antes de top
- Candidatos excluidos por precio: 5232
- Candidatos excluidos por score: 68
- Mediana ML: $3.285.000
- Venturino vs mediana ML: -19.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 148 | [Generador Honda Naftero De Alta Potencia 6.5 Kva Ez6500cx...](https://www.mercadolibre.com.ar/generador-honda-naftero-de-alta-potencia-65-kva-ez6500cx/up/MLAU3854830292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA3069032746&sid=search) | $3.373.930 | 27.0% | tipo: GENERADOR; tokens técnicos: ez6500cx, 6.5, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, 6.5, kva, ez6500 |
| 2 | alta | 124 | [Generador Honda Ez6500cxs](https://www.mercadolibre.com.ar/generador-honda-ez6500cxs/up/MLAU3491822335#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1559263375&sid=search) | $2.800.000 | 5.4% | tipo: GENERADOR; tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, ez6500 |
| 3 | alta | 124 | [Generador Honda EZ6500CXS](https://www.mercadolibre.com.ar/generador-honda-ez6500cxs/p/MLA26913717#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1505050374&sid=search) | $2.890.000 | 8.8% | tipo: GENERADOR; tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, ez6500 |
| 4 | alta | 118 | [Generador Honda Ez6500cxs Monofásico Avant Motos](https://www.mercadolibre.com.ar/generador-honda-ez-6500-cxs-monofasico-portatil-pf/p/MLA2066150340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1943873888&sid=search) | $3.285.000 | 23.7% | tipo: GENERADOR; tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500cx, ez6500 |
| 5 | alta | 95 | [Generador Honda Ez 6500cxs - Pocas Horas De Uso](https://www.mercadolibre.com.ar/generador-honda-ez-6500cxs--pocas-horas-de-uso/up/MLAU3995003428#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1799165815&sid=search) | $2.350.000 | -11.5% | tipo: GENERADOR; tokens técnicos: ez6500; modelo Honda compatible: ez6500; tokens comunes: generador, honda, ez6500 |
| 6 | alta | 75 | [Grupo Electrogeno Honda Ez6500cxs 5.000w](https://www.mercadolibre.com.ar/grupo-electrogeno-honda-ez6500cxs-5000w/up/MLAU242682133#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1459133110&sid=search) | $3.493.345 | 31.5% | tokens técnicos: ez6500cx, ez6500; modelo Honda compatible: ez6500; tokens comunes: honda, ez6500cx, ez6500 |
| 7 | media | 52 | [Grupo Electrógeno Honda Ez 6500 Cxs Hondaline](https://www.mercadolibre.com.ar/grupo-electrogeno-honda-ez-6500-cxs-hondaline/up/MLAU221976466#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=626351d4-bb54-418d-ac78-722eb9bc55e1&wid=MLA1102763333&sid=search) | $3.379.428 | 27.3% | tokens técnicos: ez6500; modelo Honda compatible: ez6500; tokens comunes: honda, ez6500 |

### 44. Gorra Davis Beige John Deere Bordada.

- ID Venturino: `276120852`
- Precio Venturino: $35.000
- Tokens: gorra, davi, beige, bordada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 65 válidos antes de top
- Candidatos excluidos por precio: 4317
- Candidatos excluidos por score: 925
- Mediana ML: $24.318
- Venturino vs mediana ML: 43.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra Hip-hop John Deere](https://articulo.mercadolibre.com.ar/MLA-3433438114-gorra-hip-hop-john-deere-_JM?searchVariation=196118203556#polycard_client=search-desktop&be_origin=backend&searchVariation=196118203556&search_layout=grid&position=40&type=item&tracking_id=ba42cb67-c97f-44f7-8b2f-b2a4040b125e) | $21.574 | -38.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Gorra De Béisbol John Deere](https://articulo.mercadolibre.com.ar/MLA-1795430349-gorra-de-beisbol-john-deere-_JM?searchVariation=195028438006#polycard_client=search-desktop&be_origin=backend&searchVariation=195028438006&search_layout=grid&position=20&type=item&tracking_id=e371f417-8cf7-4c6c-87da-0d27aae2b38f) | $21.466 | -38.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87&wid=MLA1552253565&sid=search) | $33.600 | -4.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA935804894&sid=search) | $32.499 | -7.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=6&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -13.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=33&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -13.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=32&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -13.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=36ed01c4-fb2d-4879-bd0b-15293ec0898a&wid=MLA2592139810&sid=search) | $30.000 | -14.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4002431523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718&wid=MLA1803760001&sid=search) | $27.200 | -22.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Gorra De Béisbol Ajustable Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-1527135007-gorra-de-beisbol-ajustable-estampada-de-john-deere-_JM?searchVariation=185266346716#polycard_client=search-desktop&be_origin=backend&searchVariation=185266346716&search_layout=grid&position=12&type=item&tracking_id=ba42cb67-c97f-44f7-8b2f-b2a4040b125e) | $25.191 | -28.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=27&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $25.052 | -28.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Gorra De Béisbol Ajustable Con El Logotipo De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533425-gorra-de-beisbol-ajustable-con-el-logotipo-de-john-deere-_JM?searchVariation=200631683569#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683569&search_layout=grid&position=26&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $25.052 | -28.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Gorra De Béisbol De Golf Con Estampado John Deere](https://articulo.mercadolibre.com.ar/MLA-1527181163-gorra-de-beisbol-de-golf-con-estampado-john-deere-_JM?searchVariation=185267041194#polycard_client=search-desktop&be_origin=backend&searchVariation=185267041194&search_layout=grid&position=38&type=item&tracking_id=f2308766-c5ba-467e-8f2d-0198ab5e9f70) | $23.584 | -32.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533471-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631683731#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683731&search_layout=grid&position=6&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3307378094-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=201785411741#polycard_client=search-desktop&be_origin=backend&searchVariation=201785411741&search_layout=grid&position=21&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Gorra De Béisbol Unisex Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785720591-gorra-de-beisbol-unisex-con-estampado-de-john-deere-_JM?searchVariation=194560989564#polycard_client=search-desktop&be_origin=backend&searchVariation=194560989564&search_layout=grid&position=22&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Gorra De Béisbol De Tela Lavada John Deere](https://articulo.mercadolibre.com.ar/MLA-1784636339-gorra-de-beisbol-de-tela-lavada-john-deere-_JM?searchVariation=194504469050#polycard_client=search-desktop&be_origin=backend&searchVariation=194504469050&search_layout=grid&position=32&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3218909500-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631638827#polycard_client=search-desktop&be_origin=backend&searchVariation=200631638827&search_layout=grid&position=20&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-1757678053-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=200597625461#polycard_client=search-desktop&be_origin=backend&searchVariation=200597625461&search_layout=grid&position=49&type=item&tracking_id=59a4f46b-0b1c-4cbe-8559-182645c61e77) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3216820316-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200591033231#polycard_client=search-desktop&be_origin=backend&searchVariation=200591033231&search_layout=grid&position=48&type=item&tracking_id=59a4f46b-0b1c-4cbe-8559-182645c61e77) | $23.228 | -33.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 45. Gorro John Deere Santa Fe Mesh Bordado

- ID Venturino: `276119628`
- Precio Venturino: $37.000
- Tokens: gorra, santa, fe, mesh, bordado
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 53 válidos antes de top
- Candidatos excluidos por precio: 4304
- Candidatos excluidos por score: 950
- Mediana ML: $30.445
- Venturino vs mediana ML: 21.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 58 | [Gorros Adulto Jhon Deere Bordado Ajustable](https://articulo.mercadolibre.com.ar/MLA-1750773809-gorros-adulto-jhon-deere-bordado-ajustable-_JM?searchVariation=200295903051#polycard_client=search-desktop&be_origin=backend&searchVariation=200295903051&search_layout=grid&position=7&type=item&tracking_id=33b6918d-7dae-4541-8450-db68f8389b4a) | $22.999 | -37.8% | tipo: GORRA; tokens comunes: gorra, bordado; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87&wid=MLA1552253565&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA935804894&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=36ed01c4-fb2d-4879-bd0b-15293ec0898a&wid=MLA2592139810&sid=search) | $30.000 | -18.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3370306346-gorra-de-beisbol-con-estampado-de-john-deere-_JM?searchVariation=202690501093#polycard_client=search-desktop&be_origin=backend&searchVariation=202690501093&search_layout=grid&position=29&type=item&tracking_id=f2308766-c5ba-467e-8f2d-0198ab5e9f70) | $23.228 | -37.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Béisbol Ajustable John Deere](https://articulo.mercadolibre.com.ar/MLA-3370676578-gorra-de-beisbol-ajustable-john-deere-_JM?searchVariation=202694942917#polycard_client=search-desktop&be_origin=backend&searchVariation=202694942917&search_layout=grid&position=23&type=item&tracking_id=f2308766-c5ba-467e-8f2d-0198ab5e9f70) | $23.228 | -37.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Béisbol Con Logo De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758534347-gorra-de-beisbol-con-logo-de-john-deere-_JM?searchVariation=193471318874#polycard_client=search-desktop&be_origin=backend&searchVariation=193471318874&search_layout=grid&position=35&type=item&tracking_id=c8cb115d-3446-48a9-a4bd-1d9f91e1642d) | $22.332 | -39.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=d93b41b4-29b6-4e78-afc5-606bc7e61934&wid=MLA2424514130&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1796681861-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=202400919821#polycard_client=search-desktop&be_origin=backend&searchVariation=202400919821&search_layout=grid&position=47&type=item&tracking_id=25d93341-0c73-409c-a9f5-f5182aa7f254) | $32.779 | -11.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&float_highlight=last_units&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2029398978&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&float_highlight=last_unit&tracking_id=d93b41b4-29b6-4e78-afc5-606bc7e61934&wid=MLA778736698&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=d93b41b4-29b6-4e78-afc5-606bc7e61934&wid=MLA1186238943&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA2992080562&sid=search) | $31.000 | -16.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=6&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -17.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=33&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -17.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=32&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -17.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4002431523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718&wid=MLA1803760001&sid=search) | $27.200 | -26.5% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=11&type=item&tracking_id=ca9d5eb7-f409-47ae-9879-558b3b1ecacb) | $26.814 | -27.5% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Gorra De Béisbol Ajustable Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-1527135007-gorra-de-beisbol-ajustable-estampada-de-john-deere-_JM?searchVariation=185266346716#polycard_client=search-desktop&be_origin=backend&searchVariation=185266346716&search_layout=grid&position=12&type=item&tracking_id=ba42cb67-c97f-44f7-8b2f-b2a4040b125e) | $25.191 | -31.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=27&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $25.052 | -32.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 46. Gorro Tiger Verde John Deere

- ID Venturino: `338230395`
- Precio Venturino: $42.000
- Tokens: gorra, tiger, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 19 de 19 válidos antes de top
- Candidatos excluidos por precio: 4246
- Candidatos excluidos por score: 1042
- Mediana ML: $32.499
- Venturino vs mediana ML: 29.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87&wid=MLA1552253565&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA935804894&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=36ed01c4-fb2d-4879-bd0b-15293ec0898a&wid=MLA2592139810&sid=search) | $30.000 | -28.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=d93b41b4-29b6-4e78-afc5-606bc7e61934&wid=MLA2424514130&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1796681861-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=202400919821#polycard_client=search-desktop&be_origin=backend&searchVariation=202400919821&search_layout=grid&position=47&type=item&tracking_id=25d93341-0c73-409c-a9f5-f5182aa7f254) | $32.779 | -22.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=d93b41b4-29b6-4e78-afc5-606bc7e61934&wid=MLA1186238943&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=6&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -27.5% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=33&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -27.5% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=32&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $30.445 | -27.5% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4002431523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718&wid=MLA1803760001&sid=search) | $27.200 | -35.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&float_highlight=last_units&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2029398978&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&float_highlight=last_unit&tracking_id=d93b41b4-29b6-4e78-afc5-606bc7e61934&wid=MLA778736698&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA2992080562&sid=search) | $31.000 | -26.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=11&type=item&tracking_id=ca9d5eb7-f409-47ae-9879-558b3b1ecacb) | $26.814 | -36.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | baja | 43 | [Gorras Trucker Gabardina Autos Tractores Bendita Estampa](https://articulo.mercadolibre.com.ar/MLA-1578982475-gorras-trucker-gabardina-autos-tractores-bendita-estampa-_JM?searchVariation=192831757851#polycard_client=search-desktop&be_origin=backend&searchVariation=192831757851&search_layout=grid&position=9&type=item&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra |
| 16 | baja | 43 | [Q Gorro Piluso - Bucket Hat - Marcas Y Logos - Varios](https://articulo.mercadolibre.com.ar/MLA-3090371472-q-gorro-piluso-bucket-hat-marcas-y-logos-varios-_JM?searchVariation=198880199671#polycard_client=search-desktop&be_origin=backend&searchVariation=198880199671&search_layout=grid&position=23&type=item&tracking_id=0f7b62f8-15ba-4119-8846-c1af99eedb87) | $27.138 | -35.4% | tipo: GORRA; tokens comunes: gorra |
| 17 | baja | 43 | [Trucker Hat 235-john Deere Gorra De Cuadrillo,washed Denim,](https://articulo.mercadolibre.com.ar/MLA-1801061499-trucker-hat-235-john-deere-gorra-de-cuadrillowashed-denim-_JM?searchVariation=195271888236#polycard_client=search-desktop&be_origin=backend&searchVariation=195271888236&search_layout=grid&position=16&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $26.814 | -36.2% | tipo: GORRA; tokens comunes: gorra |
| 18 | baja | 41 | [Combo Gorra Y Remera John Deere](https://articulo.mercadolibre.com.ar/MLA-1440821747-combo-gorra-y-remera-john-deere-_JM?searchVariation=184049237203#polycard_client=search-desktop&be_origin=backend&searchVariation=184049237203&search_layout=grid&position=29&type=item&tracking_id=ca9d5eb7-f409-47ae-9879-558b3b1ecacb) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | baja | 40 | [Combo Gorra Y Remera John Deere Logo](https://articulo.mercadolibre.com.ar/MLA-1440898933-combo-gorra-y-remera-john-deere-logo-_JM?searchVariation=184049336429#polycard_client=search-desktop&be_origin=backend&searchVariation=184049336429&search_layout=grid&position=13&type=item&tracking_id=ca9d5eb7-f409-47ae-9879-558b3b1ecacb) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 47. Herramienta de recogida magnética John Deere

- ID Venturino: `276194794`
- Precio Venturino: $20.000
- Tokens: herramienta, recogida, magnetica
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 2 válidos antes de top
- Candidatos excluidos por precio: 4583
- Candidatos excluidos por score: 722
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
- Candidatos excluidos por precio: 5254
- Candidatos excluidos por score: 53
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
- Candidatos excluidos por precio: 4332
- Candidatos excluidos por score: 973
- Mediana ML: $22.942
- Venturino vs mediana ML: 35.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=36&type=item&tracking_id=259bd6e9-a847-4163-9a80-f77a0b18877d) | $24.990 | -19.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Y Taza Clásica, Taza De Café, Decoración Del Hogar](https://www.mercadolibre.com.ar/taza-de-cafe-tipo-tractor-11-onzas-con-forma-de-semirremo-a/p/MLA2051419761#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55&wid=MLA1783662613&sid=search) | $20.894 | -32.6% | tipo: JARRO; tokens comunes: jarro |

### 50. Jarro Daten térmico John Deere

- ID Venturino: `276164724`
- Precio Venturino: $62.000
- Tokens: jarro, daten, termico
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 4166
- Candidatos excluidos por score: 1136
- Mediana ML: $79.344
- Venturino vs mediana ML: -21.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-3054273498-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=198392778053#polycard_client=search-desktop&be_origin=backend&searchVariation=198392778053&search_layout=grid&position=37&type=item&tracking_id=259bd6e9-a847-4163-9a80-f77a0b18877d) | $56.626 | -8.7% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 49 | [John Deere Stonware Green Ceramic Coffee Coffee Dinner Taza,](https://www.mercadolibre.com.ar/john-deere-stoneware-green-ceramic-tea-coffee-dinner-mug/p/MLA2042790930#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1548493543&sid=search) | $86.485 | 39.5% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | media | 48 | [M Cornell Importers 6979 John Deere Iron Horse Diner Taza, Verde.](https://www.mercadolibre.com.ar/m-cornell-importers-6979-john-deere-iron-horse-diner-taza/p/MLA2035440973#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1979568322&sid=search) | $81.415 | 31.3% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 4 | baja | 43 | [Taza De Café De Gres Militar Naval De La Marina](https://www.mercadolibre.com.ar/taza-de-cafe-de-gres-militar-naval-de-la-marina/up/MLAU3998320255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1467289851&sid=search) | $79.344 | 28.0% | tipo: JARRO; tokens comunes: jarro |
| 5 | baja | 42 | [M Cornell Importers 6977 Power Diner Taza, 1 De Diciembre](https://www.mercadolibre.com.ar/m-cornell-importers-6977-power-diner-taza-1-de-diciembre/up/MLAU3999206893#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1466070283&sid=search) | $74.306 | 19.8% | tipo: JARRO; tokens comunes: jarro |

### 51. Jarro Road Blanco/Negro John Deere

- ID Venturino: `276165042`
- Precio Venturino: $39.000
- Tokens: jarro, road, blanco, negro
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 4269
- Candidatos excluidos por score: 1037
- Mediana ML: $24.990
- Venturino vs mediana ML: 56.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=36&type=item&tracking_id=259bd6e9-a847-4163-9a80-f77a0b18877d) | $24.990 | -35.9% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |

### 52. Jarro Titan gris claro John Deere

- ID Venturino: `338236578`
- Precio Venturino: $61.000
- Tokens: jarro, titan, gris, claro
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4179
- Candidatos excluidos por score: 1124
- Mediana ML: $76.825
- Venturino vs mediana ML: -20.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-3054273498-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=198392778053#polycard_client=search-desktop&be_origin=backend&searchVariation=198392778053&search_layout=grid&position=37&type=item&tracking_id=259bd6e9-a847-4163-9a80-f77a0b18877d) | $56.626 | -7.2% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 48 | [M Cornell Importers 6979 John Deere Iron Horse Diner Taza, Verde.](https://www.mercadolibre.com.ar/m-cornell-importers-6979-john-deere-iron-horse-diner-taza/p/MLA2035440973#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1979568322&sid=search) | $81.415 | 33.5% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | baja | 43 | [Taza De Café De Gres Militar Naval De La Marina](https://www.mercadolibre.com.ar/taza-de-cafe-de-gres-militar-naval-de-la-marina/up/MLAU3998320255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1467289851&sid=search) | $79.344 | 30.1% | tipo: JARRO; tokens comunes: jarro |
| 4 | baja | 42 | [M Cornell Importers 6977 Power Diner Taza, 1 De Diciembre](https://www.mercadolibre.com.ar/m-cornell-importers-6977-power-diner-taza-1-de-diciembre/up/MLAU3999206893#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1466070283&sid=search) | $74.306 | 21.8% | tipo: JARRO; tokens comunes: jarro |

### 53. Jarro Zeit negro John Deere

- ID Venturino: `276162223`
- Precio Venturino: $29.000
- Tokens: jarro, zeit, negro
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4360
- Candidatos excluidos por score: 945
- Mediana ML: $22.942
- Venturino vs mediana ML: 26.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-2826842860-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=196640969709#polycard_client=search-desktop&be_origin=backend&searchVariation=196640969709&search_layout=grid&position=36&type=item&tracking_id=259bd6e9-a847-4163-9a80-f77a0b18877d) | $24.990 | -13.8% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | baja | 44 | [Y Taza Clásica, Taza De Café, Decoración Del Hogar](https://www.mercadolibre.com.ar/taza-de-cafe-tipo-tractor-11-onzas-con-forma-de-semirremo-a/p/MLA2051419761#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=661695a0-0236-4649-b1dd-a2b21d862a55&wid=MLA1783662613&sid=search) | $20.894 | -28.0% | tipo: JARRO; tokens comunes: jarro |

### 54. Juego de ganchos John Deere 4 piezas

- ID Venturino: `276681817`
- Precio Venturino: $97.000
- Tokens: juego, gancho, 4, pieza
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 5 válidos antes de top
- Candidatos excluidos por precio: 3939
- Candidatos excluidos por score: 1363
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
- Candidatos excluidos por precio: 4551
- Candidatos excluidos por score: 754
- Mediana ML: $227.109
- Venturino vs mediana ML: 24.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA1399304181&sid=search) | $260.000 | -7.8% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3126102700&sid=search) | $194.218 | -31.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: herramienta; compatibilidad/marca: John Deere |

### 56. Juego de llaves Métricas John Deere Set de 7 piezas

- ID Venturino: `276679540`
- Precio Venturino: $200.000
- Tokens: juego, llave, metrica, set, 7, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 4209
- Candidatos excluidos por score: 1093
- Mediana ML: $135.583
- Venturino vs mediana ML: 47.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1807348547&sid=search) | $120.000 | -40.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, llave, pieza |
| 2 | media | 56 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3126102700&sid=search) | $194.218 | -2.9% | tipo: KIT_HERRAMIENTAS; tokens comunes: 7, pieza; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA1399304181&sid=search) | $260.000 | 30.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1510545543&sid=search) | $135.583 | -32.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, llave, pieza |
| 5 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1562325653&sid=search) | $131.596 | -34.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |

### 57. Juego de transporte Farmin Friends John Deere

- ID Venturino: `281259377`
- Precio Venturino: $260.000
- Tokens: juego, transporte, farmin, friend
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 20 de 156 válidos antes de top
- Candidatos excluidos por precio: 4482
- Candidatos excluidos por score: 669
- Mediana ML: $259.623
- Venturino vs mediana ML: 0.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Big Farm John Deere 318g - Juego De Juguetes De](https://www.mercadolibre.com.ar/big-farm-john-deere-318g--juego-de-juguetes-de/up/MLAU3118018951#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2051252588&sid=search) | $239.882 | -7.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Set De Juego Farm Toys John Deere Fundido A Presión A Escala](https://www.mercadolibre.com.ar/farm-toys-playset-john-deere-die-cast-164-scale-w-70-pcs/p/MLA2070687079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1818083793&sid=search) | $195.642 | -24.8% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Vehículo De Juego John Deere Xuv 855d Con Conductor Bruder Verde](https://www.mercadolibre.com.ar/vehiculo-de-juego-john-deere-xuv-855d-con-conductor-bruder/up/MLAU4065411126#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1822186671&sid=search) | $360.499 | 38.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Conjunto De Juego De Granjas John Deere A Escala 1:32 Con Tr](https://www.mercadolibre.com.ar/farm-toy-playset-john-deere-132-scale-w-tractor-animals/p/MLA2032310278#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1821251963&sid=search) | $157.855 | -39.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 5 | media | 48 | [Tomy John Deere Granja 1:32 Escala Juego Infantil Incluye](https://www.mercadolibre.com.ar/tomy-john-deere-granja-132-escala-juego-infantil-incluye/up/MLAU4003254084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1510834105&sid=search) | $177.173 | -31.9% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1950447406&sid=search) | $260.245 | 0.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor John Deere Simple Dimpl De Toy Fat Brain, Más De 3 A](https://articulo.mercadolibre.com.ar/MLA-1556139169-tractor-john-deere-simple-dimpl-de-toy-fat-brain-mas-de-3-a-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $260.367 | 0.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=83wctu0FrF1f8v3ORtAhcTCXIxcHvNb9VHZeI0AqfRgYs%2F%2Ba6%2FIw98KHjQDAVbYVWdS%2BsQEoTS84cKH0arUxtOr29chXPSMe8xbcWL8wniydWY2wOSXadt0ybgBNbCOqbblBtprhH9YwOvlixJtVuxUkg417rwRAxtWSxj1FDyJnMW4j1LmABt%2BQelnMWFYgxbk1O5toto4Yabcofn8FVZBK2eH4rlgy8jvr7VhAezfukvuejngqPXuVKG%2Bzvxnz18HVWLLeobnma6OLXR%2Bil8mYpBS7APYY%2F735UiNefghyyCSOkf26%2Fjy6lF5t%2BFKw%2BfSnixg5AWXM3LmTU%2FThcfdY0Q8pdawKlUf3ykH2D5Xk3A6BkiHfINESnGv%2BJyppuyGYlQAHa%2FbZRD5zZIgXWfK%2FqlriYNg2dwA3B61FQia5sYPCn4QU%2FoovwqkoFtuaAOkGcO3OaiZ3mjn%2Bkp8v6QLWbdKU7cqo8bp%2FQxvHiJh2jvioIrk9%2FebNCfNFA%2FX2iDjSucZZ7uGPahboklMNwTzEgYZHnLtjLzMZQXQmyJFkvUcwW1gOnzV3nJLY%2BfnPcCG%2BJovUIAQOSpqSOGasIFGqMJ1%2Fg7obWs9yoVUIaCY5ctoS1M51ww92NWKMTBg6g6stBM0H1kJdJqexdu5vr5DfsW7fLxGUXBqGhCyrS%2FFi85zeMGVuSnJ1B0S7a00VL%2F46nmmyUz4oGs3cZGTEcI5ljhlD%2FPtjaT3RKW7ABEng8kykcxKAEkGytWlOCnGOq6OYm4x9SLKb1UTbfO58ia9t6PDw6hC6iu66Wjbu4p1KCb83cbr9QupMdDlT%2BDBrWyZ7HCNQf1amnjXftR%2BDeIyfqdIOx2%2Fa4kK67y%2FaQAGU1Mjwxy%2Bgbkdsubg6zlNgT8PnwlqHxPFlbxgM1J6s2ig%2BqrWRcZYrh3lpqgqDUX8f9hMt5xY69QA5mfU61UaulzhlvIahYWQntHsaYlEvQQNcT0YvW%2FVj3zpPUA%3D%3D&pdp_filters=item_id%3AMLA1688046131#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54486376&backend_model=search-backend&be_origin=backend&search_layout=grid&position=15&type=pad&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1688046131&sid=search) | $259.000 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1583656447&sid=search) | $259.000 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1584365843&sid=search) | $258.990 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1141825591&sid=search) | $258.952 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Maqueta John Deere 843l-ii 1:50 Colección Prestige](https://www.mercadolibre.com.ar/maqueta-john-deere-843lii-150-coleccion-prestige/up/MLAU3876133382#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3117350930&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Réplica John Deere Pala Trituradora 1:50 Colección](https://www.mercadolibre.com.ar/replica-john-deere-pala-trituradora-150-coleccion/up/MLAU3876131784#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1725969655&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1447751815&sid=search) | $263.348 | 1.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Siku John Deere 670 Cosechadora Línea Pesada Metal Escala 1:87 Verde](https://www.mercadolibre.com.ar/siku-john-deere-670-cosechadora-linea-pesada-metal-escala-187-verde/p/MLA28466993#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&float_highlight=last_units&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1579003794&sid=search) | $264.249 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Cosechadora Juguete Caña John Deere 2023 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-cana-john-deere-2023--a-pedidoexkarg/up/MLAU345520548#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1716821474&sid=search) | $264.878 | 1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1782744664&sid=search) | $255.079 | -1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1911294048&sid=search) | $265.120 | 2.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Cosechadora Juguete John Deere 9610 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-john-deere-9610--a-pedidoexkarg/up/MLAU381583702#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1794644744&sid=search) | $254.491 | -2.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1949945520&sid=search) | $265.905 | 2.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 58. Juego de tubos flexibles Métricos

- ID Venturino: `276196682`
- Precio Venturino: $119.000
- Tokens: juego, tubo, flexibl, metrico
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 16 de 16 válidos antes de top
- Candidatos excluidos por precio: 3840
- Candidatos excluidos por score: 1451
- Mediana ML: $107.219
- Venturino vs mediana ML: 11.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA3323710072&sid=search) | $118.999 | -0.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 2 | media | 50 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1807348547&sid=search) | $120.000 | 0.8% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 3 | media | 50 | [Juego De Tubos Llaves Y Puntas De 108 Piezas Cromo Vanadio Kroner](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=uuC0D2HMALHOSKrirpEwt5cmPE%2BoPguFOnOadQQaMr45h3hKODw97DmtE708yGsSb9UxFYJFVhg1MWegu0mMXcGN9TkvDxWORySJsDibLYw4xhPpMynPNy%2BLTzLMUESAnc1nL0x3P5MN8BsnoeI9rBtCMaG1ucOR3GA%2BI8viAe9Pyl3H2gWVQ3I%2BqIS2LZZXlSc68EBuGWwlLZgDECFVI1GNRTEx8ORCIzMGxDLJfLvr68GcAMRy3gOvfGjddidYn%2BEkEpujN6D0EYEzKnIvrh%2BJEf%2F4oSlZAxv1R6iZIDCI6ifFHhuPWBLkCzFiZK%2FP9EzoelZ570hyprStH3MaqaEa8wG%2FJJASYo%2F3aCdBo%2FjHps75eglJ5Up8vpgFUqqZDH%2BQ0QzTnZRkIOu9EK522k9kUf%2B%2BB6g0PPNx%2FAKY8BACP55bbPQAkO4Oiyy7X%2FO2LnbgAQooCzCCU34xpyuJvJvZSFWHfYwoQeCacl7TKg7dEv0ol2gQob1XbpsnSc19OeE4yjmBF7WqObLrzwLfCoZ8xOGlRYM7HgiDQh93OKY%2BYwfNHJ6BtFcEBsiHn7M6AG5uHsV0byNZKYWYx0571OgpgADAnG2e9dq7W%2FaINxOOvWn6a8vw4RnSF7WEXDkEuDwcJ8ZJ2oE5A6S0Dzi9%2Fwo5zRsDYoqU3gw%2B26qw3oE1cK8UuzHryxCv2y50ZDCSlbyBefArSXkRJWbifAsMPXyUzbpAlnT4gMPJ7B0WbByBZcJkPBpyp%2Bnk6h5nUJ%2FpoI1WHrA6aIiBYgzkogL82Ay03Z%2FOlm%2FFqPmaepZky28YLAKOKe4rOI451RFRrKcMRodezd4148Psq8XpiIbYnZSe749stBT%2Fka47oIW%2BM5ZopcTTpuswFEjt2i6S2Y3zjDansp1h%2FA%2FlvJSUC6QvpEapURxMd3AbyI3ADKNkF6DWx5tBB7IqXnNWWD9CzxzWDgcWm5scA8dOt0PJK80DQZIO14QVVBC4xHYaax2Hvw%3D%3D&pdp_filters=item_id%3AMLA1429769649#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA37175500&backend_model=search-backend&be_origin=backend&search_layout=grid&position=5&type=pad&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1429769649&sid=search) | $104.412 | -12.3% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 4 | media | 50 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1510545543&sid=search) | $135.583 | 13.9% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 5 | media | 50 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1721056741&sid=search) | $99.590 | -16.3% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 6 | baja | 43 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA922576085&sid=search) | $111.000 | -6.7% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 7 | baja | 43 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2491947770&sid=search) | $99.528 | -16.4% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 8 | baja | 43 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=00956a8d-1e22-4673-b6c1-008c6820a4a5&wid=MLA1230826554&sid=search) | $76.000 | -36.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 9 | baja | 43 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA1230896639&sid=search) | $76.000 | -36.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 10 | baja | 35 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA2308233004&sid=search) | $114.799 | -3.5% | tipo: KIT_HERRAMIENTAS |
| 11 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1946973092&sid=search) | $110.026 | -7.5% | tipo: KIT_HERRAMIENTAS |
| 12 | baja | 35 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1448971691&sid=search) | $110.026 | -7.5% | tipo: KIT_HERRAMIENTAS |
| 13 | baja | 35 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1562325653&sid=search) | $131.596 | 10.6% | tipo: KIT_HERRAMIENTAS |
| 14 | baja | 35 | [Kit De Herramienta 28 Piezas + Bolso Jdhs1m28 Jadever](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas--bolso-jdhs1m28-jadever/up/MLAU2956199503#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1471463061&sid=search) | $84.000 | -29.4% | tipo: KIT_HERRAMIENTAS |
| 15 | baja | 35 | [Kit De Herramienta 28 Piezas Manuales Jadever](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-manuales-jadever/up/MLAU3177802237#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA2084295182&sid=search) | $73.499 | -38.2% | tipo: KIT_HERRAMIENTAS |
| 16 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA2144663316&sid=search) | $72.637 | -39.0% | tipo: KIT_HERRAMIENTAS |

### 59. Juego de vehiculos John Deere

- ID Venturino: `281053472`
- Precio Venturino: $90.000
- Tokens: juego, vehiculo
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 13
- Candidatos usados: 20 de 105 válidos antes de top
- Candidatos excluidos por precio: 3964
- Candidatos excluidos por score: 1238
- Mediana ML: $89.760
- Venturino vs mediana ML: 0.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1535052371&sid=search) | $91.616 | 1.8% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 50 | [John Deere Kids Go Johnny Go Juego De Mesa Juegos De Mesa De](https://www.mercadolibre.com.ar/john-deere-kids-go-johnny-go-juego-de-mesa-juegos-de-mesa-de/up/MLAU4014127212#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1466751373&sid=search) | $87.597 | -2.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | -14.8% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2160207414&sid=search) | $76.315 | -15.2% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $106.251 | 18.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3673017977#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1608424219&sid=search) | $115.299 | 28.1% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 7 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | -35.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tomy John Deere: Juego De Granja 1:32 Con Heno](https://www.mercadolibre.com.ar/tomy-john-deere-juego-de-granja-132-con-heno/up/MLAU4001271856#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2186712008&sid=search) | $122.216 | 35.8% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3877277235#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA3148660886&sid=search) | $124.498 | 38.3% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2ca1ba56-63e3-4f44-9120-7fb104ee023b&wid=MLA3078939230&sid=search) | $86.284 | -4.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=33b6918d-7dae-4541-8450-db68f8389b4a&wid=MLA3271462064&sid=search) | $85.094 | -5.5% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Mini Vehículos John Deere, Paquete De 3 Con Luces Y Sonidos Verde](https://www.mercadolibre.com.ar/john-deere-realistic-farm-vehicles-3-pack-toy-vehicles-w/p/MLA2078747648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3334814640&sid=search) | $78.927 | -12.3% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1556138081&sid=search) | $108.894 | 21.0% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 14 | baja | 43 | [Ertl Juego De Juguetes Para Camioneta Y Tractor Ford F350 De](https://www.mercadolibre.com.ar/juego-de-juguetes-de-camioneta-y-tractor-de-ertl-ford-f350-y/p/MLA2057847315#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2587996814&sid=search) | $123.622 | 37.4% | tipo: JUGUETE; tokens comunes: juego |
| 15 | baja | 41 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | 0.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Llavero Tractor John Deere 8r 410 Metal Resin](https://www.mercadolibre.com.ar/llavero-tractor-john-deere-8r-410-metal-resin/up/MLAU3886394589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=da1dc84c-19ed-451b-98b7-9bbd4c25a12c&wid=MLA1741124951&sid=search) | $89.539 | -0.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Ertl John Deere 8320r Tractor Y Modelo 637 Disco Set (1:6...](https://articulo.mercadolibre.com.ar/MLA-2414668928-ertl-john-deere-8320r-tractor-y-modelo-637-disco-set-16-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&float_highlight=last_units&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7) | $89.050 | -1.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Siku Picadora John Deere 8500 Serie 1794 Escala 1:87](https://www.mercadolibre.com.ar/siku-picadora-john-deere-8500-serie-1794-escala-187/up/MLAU3881615443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3159832380&sid=search) | $89.000 | -1.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Set De Juguetes Para Arenero Tomy John Deere: Camión Volcado](https://www.mercadolibre.com.ar/set-de-juguetes-para-arenero-tomy-john-deere-camion-volcado/p/MLA2084459505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA1830502979&sid=search) | $91.971 | 2.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 60. Juguete Desmontable Build a Buddy Bonnie Scooper John Deere

- ID Venturino: `281259380`
- Precio Venturino: $73.000
- Tokens: juguete, desmontable, build, buddy, bonnie, scooper
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 16
- Candidatos usados: 20 de 54 válidos antes de top
- Candidatos excluidos por precio: 4053
- Candidatos excluidos por score: 1200
- Mediana ML: $76.478
- Venturino vs mediana ML: -4.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -3.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2168937218&sid=search) | $75.543 | 3.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | -12.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | -14.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | 16.3% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | 19.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | 23.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3339182498&sid=search) | $92.388 | 26.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2160207414&sid=search) | $76.315 | 4.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | -5.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Lote 2 Arados Retro John Deere C/ Detalles Juguete Vintage](https://www.mercadolibre.com.ar/lote-2-arados-retro-john-deere-c-detalles-juguete-vintage/up/MLAU2393241891#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1455831071&sid=search) | $77.777 | 6.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/a-tractor-coleccion-taladro-de-grano-john-deere-ertl-7215r/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA1717056337&sid=search) | $80.581 | 10.4% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=33b6918d-7dae-4541-8450-db68f8389b4a&wid=MLA3271462064&sid=search) | $85.094 | 16.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Siku 1649 Camión Forestal John Deere Juguete Coleccionable](https://www.mercadolibre.com.ar/siku-1649-camion-forestal-john-deere-juguete-coleccionable/up/MLAU3782233912#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1670514687&sid=search) | $59.760 | -18.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Sunny Days Entertainment John Deere Leaf Blower Juguete Para](https://www.mercadolibre.com.ar/sunny-days-entertainment-john-deere-leaf-blower-juguete-para/p/MLA2039341184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2182323334&sid=search) | $96.376 | 32.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Cosechadora Siku John Deere 8500 Metal Verde Escala 1:87 Con Cabezal Desmontable](https://www.mercadolibre.com.ar/cosechadora-siku-john-deere-8500-metal-verde-escala-187-con-cabezal-desmontable/p/MLA24585176#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1451966152&sid=search) | $96.440 | 32.1% | tipo: JUGUETE; tokens comunes: desmontable; compatibilidad/marca: John Deere |
| 17 | baja | 42 | [Caballo De Juguete De Pura Sangre, Escala Ertl A Detalle](https://www.mercadolibre.com.ar/caballo-de-juguete-de-pura-sangre-escala-ertl-a-detalle/up/MLAU4012809832#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2169086748&sid=search) | $63.797 | -12.6% | tipo: JUGUETE; tokens comunes: juguete |
| 18 | baja | 41 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2378379950&sid=search) | $75.326 | 3.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | 5.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | -5.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 61. Kit de Pistones y Camisas. John Deere

- ID Venturino: `318854955`
- Precio Venturino: $2.334.000
- Tokens: kit, piston, camisa
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 5222
- Candidatos excluidos por score: 85
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
- Candidatos excluidos por precio: 5175
- Candidatos excluidos por score: 132
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
- Candidatos excluidos por precio: 4533
- Candidatos excluidos por score: 774
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
- Candidatos excluidos por precio: 4864
- Candidatos excluidos por score: 443
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
- Candidatos excluidos por precio: 3905
- Candidatos excluidos por score: 1402
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
- Candidatos excluidos por precio: 3885
- Candidatos excluidos por score: 1422
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
- Candidatos excluidos por precio: 3912
- Candidatos excluidos por score: 1395
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
- Candidatos excluidos por precio: 4119
- Candidatos excluidos por score: 1188
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
- Candidatos excluidos por precio: 4743
- Candidatos excluidos por score: 564
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
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4022
- Candidatos excluidos por score: 1279
- Mediana ML: $60.575
- Venturino vs mediana ML: 17.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $60.737 | -14.5% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $60.412 | -14.9% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Llaves De Equipamiento Original John Deere Auc12681, Paquete](https://articulo.mercadolibre.com.ar/MLA-3439558022-llaves-de-equipamiento-original-john-deere-auc12681-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $87.566 | 23.3% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=7b238137-0782-493d-b987-b08ceaf43d09&wid=MLA1399126385&sid=search) | $93.489 | 31.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f7b018b4-ec8f-4196-9d62-810be9ab5b25&wid=MLA930580659&sid=search) | $45.500 | -35.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA1741179879&sid=search) | $42.999 | -39.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 71. Llaves ajustables John Deere 12 pulgadas

- ID Venturino: `276187355`
- Precio Venturino: $83.000
- Tokens: llave, ajustabl, 12, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 3984
- Candidatos excluidos por score: 1319
- Mediana ML: $74.152
- Venturino vs mediana ML: 11.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Auc12681, Paquete](https://articulo.mercadolibre.com.ar/MLA-3439558022-llaves-de-equipamiento-original-john-deere-auc12681-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $87.566 | 5.5% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $60.737 | -26.8% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $60.412 | -27.2% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=7b238137-0782-493d-b987-b08ceaf43d09&wid=MLA1399126385&sid=search) | $93.489 | 12.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 72. Llaves ajustables John Deere 6 pulgadas

- ID Venturino: `276187350`
- Precio Venturino: $39.000
- Tokens: llave, ajustabl, 6, pulgada
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 5 válidos antes de top
- Candidatos excluidos por precio: 4269
- Candidatos excluidos por score: 1033
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
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 4250
- Candidatos excluidos por score: 1049
- Mediana ML: $44.250
- Venturino vs mediana ML: 10.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $60.412 | 23.3% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $60.737 | 24.0% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | baja | 44 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1146530823&sid=search) | $37.000 | -24.5% | tipo: HERRAMIENTA; tokens comunes: llave |
| 4 | baja | 41 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f7b018b4-ec8f-4196-9d62-810be9ab5b25&wid=MLA930580659&sid=search) | $45.500 | -7.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA1741179879&sid=search) | $42.999 | -12.2% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=54779be7-908c-4662-8cfe-1f6c5e8f3cc7&wid=MLA1506435419&sid=search) | $41.198 | -15.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=00956a8d-1e22-4673-b6c1-008c6820a4a5&wid=MLA1704310265&sid=search) | $32.300 | -34.1% | tipo: HERRAMIENTA |
| 8 | baja | 21 | [Acople Rapido Macho Faster Cara Plana John Deere 3/8 Pulgada](https://www.mercadolibre.com.ar/acople-rapido-macho-faster-cara-plana-john-deere-38-pulgada/up/MLAU4082549056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA3447524820&sid=search) | $65.930 | 34.6% | tokens comunes: 8, pulgada; compatibilidad/marca: John Deere |

### 74. Manómetro con aguja John Deere doble

- ID Venturino: `276196695`
- Precio Venturino: $38.000
- Tokens: manometro, aguja, doble
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4290
- Candidatos excluidos por score: 1017
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
- Candidatos excluidos por precio: 4583
- Candidatos excluidos por score: 724
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
- Candidatos excluidos por precio: 4538
- Candidatos excluidos por score: 769
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 77. Mate Origen con bombilla negro John Deere

- ID Venturino: `276147434`
- Precio Venturino: $60.000
- Tokens: mate, origen, bombilla, negro
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4191
- Candidatos excluidos por score: 1112
- Mediana ML: $63.849
- Venturino vs mediana ML: -6.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&float_highlight=last_units&tracking_id=5a16e526-351c-4824-a4d2-837d65567e87&wid=MLA899912364&sid=search) | $58.242 | -2.9% | tipo: MATE; tokens comunes: mate |
| 2 | media | 45 | [Set Kit Equipo Matero Termo Inox John Deere Br](https://www.mercadolibre.com.ar/set-kit-equipo-matero-termo-inox-john-deere-br/up/MLAU226071226#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=ad5243f0-734c-45eb-8e98-94d2d4570f77&wid=MLA1365125926&sid=search) | $69.455 | 15.8% | tipo: MATE; penalización tipo adicional candidato: TERMO; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA873583212&sid=search) | $38.363 | -36.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 4 | baja | 28 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=0e1a4495-9897-4296-b7dc-aaa67be3fd95&wid=MLA3168357158&sid=search) | $69.455 | 15.8% | tipo: MATE; penalización tipo adicional candidato: BOLSO, HERRAMIENTA; tokens comunes: mate |

### 78. Mate San Roque con bombilla verde John Deere

- ID Venturino: `276158249`
- Precio Venturino: $45.000
- Tokens: mate, san, roque, bombilla, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 9 de 9 válidos antes de top
- Candidatos excluidos por precio: 4262
- Candidatos excluidos por score: 1036
- Mediana ML: $32.900
- Venturino vs mediana ML: 36.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Set Matero John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-ecocuero/up/MLAU245113070#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=d820e202-804a-45e8-9d5d-54978831f44e&wid=MLA1512191568&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 2 | media | 55 | [Set Matero Kit John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-kit-john-deere-ecocuero/up/MLAU2303263352#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=d820e202-804a-45e8-9d5d-54978831f44e&wid=MLA1935176914&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | media | 55 | [Set Matero John Deere. Fundas De Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-fundas-de-ecocuero/up/MLAU239222926#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=d45898a1-80db-4a37-b3bb-66115d6188d6&wid=MLA1399979491&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&float_highlight=last_units&tracking_id=5a16e526-351c-4824-a4d2-837d65567e87&wid=MLA899912364&sid=search) | $58.242 | 29.4% | tipo: MATE; tokens comunes: mate |
| 5 | media | 46 | [Bolso Matero John Deere Ecocuero](https://www.mercadolibre.com.ar/bolso-matero-john-deere-ecocuero/up/MLAU264444456#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA1594771616&sid=search) | $31.500 | -30.0% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate; compatibilidad/marca: John Deere |
| 6 | baja | 39 | [Bolso Matero Rigido Diseños Varios](https://articulo.mercadolibre.com.ar/MLA-1774588246-bolso-matero-rigido-disenos-varios-_JM?searchVariation=186759553535#polycard_client=search-desktop&be_origin=backend&searchVariation=186759553535&search_layout=grid&position=37&type=item&tracking_id=470a7926-9dcc-4cdf-b727-26cf087d4cf4) | $27.387 | -39.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate |
| 7 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Set Matero Bolso Y 2 Latas De Ecocuero John Deere](https://www.mercadolibre.com.ar/set-matero-bolso-y-2-latas-de-ecocuero-john-deere/up/MLAU3900127837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA1751862177&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 9 | baja | 34 | [Set Matero Bolso Y Latas John Deere Con Tu Nombre. Ecocuero](https://www.mercadolibre.com.ar/set-matero-bolso-y-latas-john-deere-con-tu-nombre-ecocuero/up/MLAU2999997079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=15014e9d-7739-4b47-a9e8-8cbf8e65a2e3&wid=MLA2009625314&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |

### 79. Matera Elsa menge gris John Deere

- ID Venturino: `276153548`
- Precio Venturino: $70.000
- Tokens: matera, elsa, menge, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4027
- Candidatos excluidos por score: 1280
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
- Candidatos excluidos por precio: 4027
- Candidatos excluidos por score: 1280
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
- Candidatos excluidos por precio: 4262
- Candidatos excluidos por score: 1044
- Mediana ML: $38.363
- Venturino vs mediana ML: 17.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATERA; tokens comunes: matera; compatibilidad/marca: John Deere |

### 82. Mini bandeja de piezas magnéticas

- ID Venturino: `317015820`
- Precio Venturino: $14.000
- Tokens: mini, bandeja, pieza, magnetica
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4598
- Candidatos excluidos por score: 709
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 83. Mochila Austral John Deere

- ID Venturino: `338257995`
- Precio Venturino: $73.800
- Tokens: mochila, austral
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 13 de 13 válidos antes de top
- Candidatos excluidos por precio: 4042
- Candidatos excluidos por score: 1252
- Mediana ML: $60.199
- Venturino vs mediana ML: 22.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=36&type=item&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587) | $58.156 | -21.2% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mochila Para Laptop John Deere: Diseño Reforzado Y Ergonómic](https://articulo.mercadolibre.com.ar/MLA-3005250038-mochila-para-laptop-john-deere-diseno-reforzado-y-ergonomic-_JM?searchVariation=197763283247#polycard_client=search-desktop&be_origin=backend&searchVariation=197763283247&search_layout=grid&position=44&type=item&tracking_id=0b3e150e-8094-4952-85d5-36d758c566d0) | $51.881 | -29.7% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 3 | baja | 44 | [Pulverizador Mochila Fumigador 20l - Honda Quilmes](https://www.mercadolibre.com.ar/pulverizador-mochila-fumigador-20l--honda-quilmes/up/MLAU289676040#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA836807075&sid=search) | $80.114 | 8.6% | tipo: MOCHILA; tokens comunes: mochila |
| 4 | baja | 43 | [Fumigador Pulverizador Mochila 16lt 4 5 Bar Ingco](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=kX%2BATfhyRqJuFl6AMj%2B69Kc6%2FMoZbzKlq5z5we4Yy1NQN9qJUAbMPUFrW4C4gKsHHk47Wl1FN7FePVh%2BrV1tCQw%2F%2BGZUDHiXitWtFcs9siuQ82DcXCD7pqR4elsddErDrUQI37jA0P8IVquNiimGswuYmzxGBMqERpicDz95PGRKzowtIcAcTAc1jg%2F8p%2BnMl2r5hzoo%2FYe5utrzJUnjyZEx9vGzigb%2Bvg2P1vk4KghfM71tc%2B0DGfQc8TJNn2M%2B6YVVs74uYWpJXgLN4pWrOLKgp9i8t1KNw2FRB%2F4b2nCBCS3YZkxQiOKr1piWCkd%2FsM35Ti%2BMWFFhXYmRNaoqpyp76QjtRDwZPW%2B8VWROiYE%2FNiVaySjg%2BTiaV0A3GtvFTeTsa%2F0pS4z%2Bft7f2CNKos8YwZWNy2B1JuZJB14qPCRUhrhkOg%2FoQ%2FBrCZtNWvXCz2ROURgOZrLgiVdNmLBfjkWkzMOSXBd1%2FmYb7Nu82%2FwcKq6OWzMx0DCLQw0T%2FpafCBsvrgBokqlhClTDvTDTqrokxTgsO0ySJelcdS1DPEL2%2FYy0fo1RtRk9U3XEi8pzcEeS7fMXts%2FOJLgxmvV4E9LUHD4kp7G8BKkAU%2F1SoN5FoPY7AYU2%2BwZ1IBPsGFGMui8GHdQfGdZ48FsJwHGrOnr1YINFAYuREYBu0GarRrcvKs%2Frk%2FzuIsZDzb8vZlo8WvqRUy9J0uYfobR3HHO8axcVZcFGO%2Bj9SnlAtnTLEq4cq9Fwng9B%2Bxc9Da2rOGvfWwTA7Aqx9sRgP68oP0QOQ35xaSHyrtARb1Su1DwCqMT69zJrnkKN5VTSbjG6MX%2FGNiw0qF%2Bb2bC61o0xVJt%2BiHX1OTk8gzIoHn7a5NVHQ6aRKBPnKygaJhf4WZaKMQuUO7BmOMoj90A%2FksMUL2OLGn%2FosRjABwokMHWbgk5PGUi2aP35IKbUsEKckhcfmqTh8sx7V2Dq3vE2UYnVCfFHNK7vmUWPfTjC&pdp_filters=item_id%3AMLA2579517046#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3566152135&backend_model=search-backend&be_origin=backend&search_layout=grid&position=16&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA2579517046&sid=search) | $78.200 | 6.0% | tipo: MOCHILA; tokens comunes: mochila |
| 5 | baja | 43 | [Pulverizador Fumigador Mochila 20 Litros Manguera Lanza Acc Naranja](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=NjsjaoFU5ZjsrFBuxeiUdy6BO%2FOcsLIpcC6nba3v3NUuPtemS3ZeU4QPDl%2B16Y4wsUsmziw6cGHaAy95oiggk0DKDGMqZLHijezO8tWT4dUX%2FpSzSbIXMGggB4qn1zyD1wKddunE5vPfE5gTsL4kSkoLDBsyUT5TrYU5p3s0EepDB1EWbWjEj4pf9EkpwVzncyYxHynUG5cu8kgZEHpdSCgUXjTzPtD1PftK183o7Cy65ZbidWaZNMA5c8xTcJxVjypOs3YA89v7rB6R9tijMQQMBWHKfQZbRXALM%2FKowX%2FBmwLxeJfRoBSn3fsWSWbW0g2UcPgSgPE26k3rypWnG7N8%2F7lVw%2F4qE7JzM0mhi7nD%2B76q%2BnBJnbv82zlgCqswu98oaatqWcWDtD0DZhWjjJ88qfdWq3b8lZCiZsLesKSLoufOlfbrEKo7NwwhGK2fWXgxbPJluLsJpnCblGHVY6LXn9qJ8MwuifetoXqWN%2Fotp77ulB5rCwJ80Kvg7xhSLrjHIZUdY3rnHTI5JEH%2BGIfEwfISLy9zLyuTjP8v6UOkSJicTnlxX%2BEZKeqqMDcVqMZ839eTdhMAaKdbeZPJCKN9G4%2FcqRdNzzLQh0WCX1philb6cfzKGC1z4wM%2ByLYqi9dDPyxFQ5YWlZ7p5ySg%2BhCnn8id1bzX%2BKY0Ij%2FK7O6cRNMcuHQRq3%2FM%2Bh6FgRBqU%2Bnt49EbNwfiOTs88P3YYwmbuVBODyt8xUi8XCHuF5za6gLbtGIErdRMhyx3xuRs2E8okw%2BZugh2W8qhbrFKLOJK5XetbMl7cajg8IXHrK4LWVT6sGaRvLUnmTLOfnl0BH4FTb0TaeH4cSs3xvd29RcYQtaMnJKV2orGmIHVyW3b3Gtmdpi9xqNbv7R8a6G%2BgOD1imc2jBXR3m6WhDoh7CnKXlqfBC1%2B25BYzgW1ktHlo49PCQBuyyjdToawBHi1b47RuHO5i9va4Lqwxfsnf%2Bcz07pPlG13omv6Fl5TEDBHAQ%3D%3D&pdp_filters=item_id%3AMLA1767957491#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA66118093&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1767957491&sid=search) | $66.748 | -9.6% | tipo: MOCHILA; tokens comunes: mochila |
| 6 | baja | 43 | [Mochila Infantil Con Diseño De Fan Art De Tractores John Dee](https://articulo.mercadolibre.com.ar/MLA-1810945127-mochila-infantil-con-diseno-de-fan-art-de-tractores-john-dee-_JM?searchVariation=195657359500#polycard_client=search-desktop&be_origin=backend&searchVariation=195657359500&search_layout=grid&position=27&type=item&tracking_id=25d93341-0c73-409c-a9f5-f5182aa7f254) | $57.043 | -22.7% | tipo: MOCHILA; tokens comunes: mochila |
| 7 | baja | 43 | [Fumigador Pulverizador Mochila Dogo 20 Lts Profesional](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=0FiKSJar0a5C7jJFvqgMEJgnAHsuiah2LFqo8fHLZ5sVyfiwd%2FtujhjSxSGprHD2US6bu7T24WXLQBDPLoiAtGZLSvMJ5NIcvVXh5CHwY2a8ymqgFa4d0B9VewaWBce7zanKl%2FesHJ8OSIg%2F1NAtQ5odOJGe6B4N7LvFzGlimTEAMDhdKnFV%2Fig8tk343AEdyUx7BOK72PEiEKusZFetNMjyxP6N1wTt1UvVemEEyvq2flL%2FfH367KOkG%2FN3CS0hWWdU00xOO2nJfAr2uYAKnnMWqq634MwCERY6PqMSxeEtd2vG5nJJ5jye9Iy20xLIOxg5d6FmlQqFkLI6e2nlgL93TWw%2FMMSiCU%2BSRZsPEu4IxHVSr05vcgZOGX%2BNuleD1JZ5mP5Zis6H1rzVa90ojKC0I2awzyTAiOOnvM%2FZ%2F4o%2FSeTBLXyGZeRo42bDr7dwJLDTsxXLdvhew4micHQ%2B4ecSNpgN6arRH3hbI8xO9g9FYvruVJxH7riH6FjLPwAGvrCYd9aU5N%2BIV%2BstixICeJXCJlNKdVuYHLQIxu0rsmWs0TgCJRQr3RvjCt3YVa9LBvf2Ay%2Fy%2Bv0IQLCg3ggP7zQH5iwbnG4MtSc6zZjeXi8rxL4TPNYOP%2BAjEVOAPTuXKos6lMaf2pUO6K5c0gSt975azbKOxw9wIEQB9IPHhfCbW%2FXmYmJ28ijK%2BLRdNCSMF0QnSgkJwieT4l4PUG6z3vmqDFzKSMaCJsEdjNBEbI5X82wr2BEu1pODMDUHulWFjxaAGP5HlLWBBLVtqsou4GM9lTyl0Do1bKTURBMxTtWyYggCadRthOXlUCYTb%2B1M9dNuRiS0h8Yc8a%2FTtzw3RIwM9EwUHgIsNRxnXAXsAQsmSZUgtGKMqCL3hrWOY6tLB%2Fg%2B98A7neNqMUHAJmvsPaKzagLf%2BeDlc0m%2BXKFabfraWm29DwNEty5WzWUKuzjNG3hay2zYwzn8QTyMivpqznrwuJLKFY2HUiegEIDc&pdp_filters=item_id%3AMLA1970559440#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU2877413439&backend_model=search-backend&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1970559440&sid=search) | $91.100 | 23.4% | tipo: MOCHILA; tokens comunes: mochila |
| 8 | baja | 43 | [Fumigador Pulverizador Mochila 16 Litros Rociador Manguera](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=GH2RUSskvR5hplg6Uvw4eQbdcgaczfzM1OmvtKTKVUY7HSxU9cyXmNYtA3rrqtu4JydjG194dk5XesEv14kheJghLEF%2BnzRA%2FWxBzwPwoLk%2B6zdBsayA7NhPLkx0nEMsi6uGHqCgrFlkqzAOSbKxIm9Pelm2NPODNr0le52ZDG7GqRCTzWBZQyo%2BDXrJtKAEFhsKJxHrpuQi%2BvmFcwf7%2BfLkljZBCefFbjTu6ZzhO%2BZ4GY5w2HNd9FU8gVDfzUaOHq0Fu9F1%2FvIJUgZAnmMGY0WAu3XTnrIM%2BXEuv7D2Xfq9VCS4CfIFS%2Fokdr1vJks9Ikeb377YGe800JE8EZA8YSClN%2FrY5xY%2BBhgFtN1jlSkad3Xvml9uUXTwSDa9uZYEuyxMwiM8QChgdPv4UeOHOFFAL7JeWzZSq4O1csnuptMRCUSndywmvXNeQhR1JQuc3ALbrU3WkllGx6NQM%2B2ixVfP6JROkGchDh8apuaHh0fhUPohhzHRMgr08vG5%2F%2Fl6JXQ0HOR5%2FMb8c0mCtyf594Yl7%2Fn%2BlVCifqeW%2FWNBgVq0jyUFgfr2l08uT5Dd4xRiXDitGF6h%2BlrJz17Q0BTn%2FS0RoopUcuyNHVxLf3BekVUE9xW7OpR2FofasxS5N1IXe30VSFgnVIEpq%2B8ZGr64xmqIHF7d8ix62Ic3WHBPG0eI5yyhJCbyIokay8u2HA1ylshkES5XBqYhPbo%2F4juOxItQeXChHNpYyFl2T6DhSX79Tqh63xv39Q75dG15kXLFwjGaIS%2B7s9BW0%2Fn7bC2VAHsWv5ODbK%2FYfj1Kr2zQI2s%2FxpfRlR%2F6DevGSDgVEzsRrXXhYGtpRkBtOjp3jxuKrKKTg3wGNepmS8l06TgS9Z%2BvlSVmn4yksRI4OdxGtwYWh8%2Bjq3gVl4Kz29lHymSkFFqCEVCzy70WfHIuQXXxJ8XF%2FoCafRUk4z%2BP%2FMde52M%2FpKAgj19LvBY2MUYHBQ%2F8gqvu1j38TF7OURgGN%2BvF0q4%3D&pdp_filters=item_id%3AMLA1354485212#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU230561367&backend_model=search-backend&be_origin=backend&search_layout=grid&position=13&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1354485212&sid=search) | $53.625 | -27.3% | tipo: MOCHILA; tokens comunes: mochila |
| 9 | baja | 43 | [Pulverizador Fumigador Mochila 16lt Manguera Atomizador Amarillo](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=HK3APi7E1xftVe2%2Fd0kelgvclc6sPN8%2BWEWJnxvkqHDhrpaXOtVymXVuxl81X2rFyhO%2B7txSYhX46Dpe5TMJpv1Y4zwC7%2FTihN6v5J5R0YJ1myKT62D4NB1Nrkwnz3sbfPxbioq9%2F8nydwhe0Y5Tms5pXEkCLyy9nsc5pgEa%2BKnfd5KYgUsJY%2BXZ42bROIPLu%2Bj7ZRS9EVueYpS%2BeXOVUOGUGnYDieqkBGGYhMA4yuOQAG%2FxwNtm6vpwMZ8UVURLPrzR%2FX7NPOcguwYmZgxHUfpuK%2FhhpXVrPyCOctudUxrhDrRnOreQIiHLgFRTNXpbHx7sRvwohRiA6GHCdlX6VMkNAAylBdFJX1grTowjAJDovzTrEiKVjCX%2Fm3DXYQNq7qqq65X8qwzgknibnZrtFE0xpMQCRoQpyvcnKpSUE9ZCkBgehjQZaSAIBBfTj4fDF3S4akyMPqnjsrHPJBvlS0LD3lxQWXm6xAMq2rEN6pCi1qX5%2FZMe8KmtwyIhclbqf0Sz%2F2mJATdr%2BfKU8AWg0ZfLcWYdBXqhzEHMlT03XabejYilZG3hifqvAxfOkxV9W7Js4ZNgA9vN84SrGViZr3aiMI%2FwF71eIYZi6Q6aBOWM2sfXrJvbWw%2FScdSk319x4Idov39TVB8kGP3lr%2BQ2RcENtpreWmA99gtlZOtcczONfHLeTWxFWRg8HPN1r0RkJTiievM07Ji1dcUkvuHdsPL8sRbI6Ss%2BqT96tBarTB3XscwWTeyi5Ax7uDR9FtZa3bcUtTiZaAuNztaClEumZB0tZEbqmlkQeRZdsrDfjpjJE9SMPX%2BXAlKSrgmiHQlfLUxAl1zujuYWicAEOxMhJOlCs4rkp%2FDaISiDPXwVUtXV1lVQQpzmoM6Fv9DrZkmsOG6wFpPfIUj%2Fxv2GsJgXN0pSYPtldkRG6FZr%2BWafzRhIPou6oRR%2BcM2LHNauQYgp2iv%2BZ2OP%2FP1GipcQWzs08mS1OUm09ljyEThuNS3B&pdp_filters=item_id%3AMLA3239497158#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA66429904&backend_model=search-backend&be_origin=backend&search_layout=grid&position=3&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA3239497158&sid=search) | $53.139 | -28.0% | tipo: MOCHILA; tokens comunes: mochila |
| 10 | baja | 43 | [Pulverizador Fumigador Mochila 16 Lts. P/liquid](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-16-lts-pliquid/p/MLA22774897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1688023451&sid=search) | $48.970 | -33.6% | tipo: MOCHILA; tokens comunes: mochila |
| 11 | baja | 42 | [Fumigador Pulverizador Mochila 16lt 4 5 Bar Ingco Hspp41602 Color Amarillo Talle 16 Lts](https://www.mercadolibre.com.ar/fumigador-pulverizador-mochila-16lt-4-5-bar-ingco-hspp41602-color-amarillo-talle-16-lts/p/MLA26590942#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA2863908986&sid=search) | $63.359 | -14.1% | tipo: MOCHILA; tokens comunes: mochila |
| 12 | baja | 42 | [Pulverizador Fumigador Lusqtoff Mochila 12 L Manguera Lanza Color Naranja](https://www.mercadolibre.com.ar/pulverizador-fumigador-lusqtoff-mochila-12-l-manguera-lanza-color-naranja/p/MLA22571073#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA3274360364&sid=search) | $60.199 | -18.4% | tipo: MOCHILA; tokens comunes: mochila |
| 13 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $69.824 | -5.4% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 84. Mochila Fumigadora Honda WJR 2525 – 25 L

- ID Venturino: `332864939`
- Precio Venturino: $965.621
- Tokens: mochila, fumigadora, honda, wjr, 2525, 25, l, wjr2525
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 10
- Candidatos usados: 10 de 10 válidos antes de top
- Candidatos excluidos por precio: 4933
- Candidatos excluidos por score: 364
- Mediana ML: $893.577
- Venturino vs mediana ML: 8.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 130 | [Mochila Fumigadora Honda Wjr 2525 Naftera 4 Tiempos 25cc](https://www.mercadolibre.com.ar/mochila-fumigadora-honda-wjr-2525-naftera-4-tiempos-25cc/up/MLAU245064452#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1508691852&sid=search) | $1.102.000 | 14.1% | tipo: MOCHILA; tokens técnicos: 2525, wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr, 2525, wjr2525 |
| 2 | alta | 130 | [Mochila Fumigadora Honda Wjr 2525 Naftera 4 Tiempos 25cc](https://www.mercadolibre.com.ar/mochila-fumigadora-honda-wjr-2525-naftera-4-tiempos-25cc/up/MLAU1154331301#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1909451416&sid=search) | $1.102.000 | 14.1% | tipo: MOCHILA; tokens técnicos: 2525, wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr, 2525, wjr2525 |
| 3 | alta | 130 | [Mochila Fumigadora Honda Wjr 2525 Naftera 4 Tiempos 25cc](https://www.mercadolibre.com.ar/mochila-fumigadora-honda-wjr-2525-naftera-4-tiempos-25cc/up/MLAU244301755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1525914122&sid=search) | $1.102.000 | 14.1% | tipo: MOCHILA; tokens técnicos: 2525, wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr, 2525, wjr2525 |
| 4 | alta | 107 | [Fumigadora De Gasolina Honda Wjr2525 4 Tiempos 25 Litros Color Blanco Con Rojo](https://www.mercadolibre.com.ar/fumigadora-de-gasolina-honda-wjr2525-4-tiempos-25-litros-color-blanco-con-rojo/p/MLA35247979#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1731343302&sid=search) | $891.750 | -7.7% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: fumigadora, honda, 25, l, wjr2525 |
| 5 | alta | 102 | [Mochila Fumigadora/anti Sol Honda Wjr2525t](https://www.mercadolibre.com.ar/mochila-fumigadoraanti-sol-honda-wjr2525t/up/MLAU246103170#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1553921162&sid=search) | $891.750 | -7.7% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 6 | alta | 102 | [Aspersora Honda Wjr2525 25 Lts Color Blanco](https://www.mercadolibre.com.ar/aspersora-honda-wjr2525-25-lts-color-blanco/p/MLA46846255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA2517349896&sid=search) | $861.003 | -10.8% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: honda, 25, l, wjr2525 |
| 7 | alta | 102 | [Mochila Fumigadora Aspersora Honda Wjr2525 4 Tiempos](https://www.mercadolibre.com.ar/mochila-fumigadora-aspersora-honda-wjr2525-4-tiempos/up/MLAU3976567194#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA3326594012&sid=search) | $699.900 | -27.5% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 8 | alta | 101 | [Mochila Fumigadora Honda Wjr2525 4 Tiempos 25cc Moto Store](https://www.mercadolibre.com.ar/mochila-fumigadora-honda-wjr2525-4-tiempos-25cc-moto-store/up/MLAU451975533#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1881780576&sid=search) | $895.404 | -7.3% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 9 | alta | 101 | [Pulverizador Mochila Fumigadora Wjr2525 25lt 4 Tiempos Honda](https://www.mercadolibre.com.ar/pulverizador-mochila-fumigadora-wjr2525-25lt-4-tiempos-honda/up/MLAU331080177#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1695304246&sid=search) | $1.260.000 | 30.5% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: mochila, fumigadora, honda, wjr2525 |
| 10 | alta | 95 | [Fumigadora De Gasolina Honda Wjr2525 Original Genamax](https://www.mercadolibre.com.ar/fumigadora-de-gasolina-honda-wjr2525-original-genamax/up/MLAU353723790#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1731433810&sid=search) | $891.750 | -7.7% | tipo: MOCHILA; tokens técnicos: wjr2525; modelo Honda compatible: wjr2525; tokens comunes: fumigadora, honda, wjr2525 |

### 85. Mochila Omega John Deere

- ID Venturino: `338241045`
- Precio Venturino: $60.000
- Tokens: mochila, omega
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 13 de 13 válidos antes de top
- Candidatos excluidos por precio: 4191
- Candidatos excluidos por score: 1103
- Mediana ML: $58.156
- Venturino vs mediana ML: 3.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=36&type=item&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587) | $58.156 | -3.1% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mochila Para Laptop John Deere: Diseño Reforzado Y Ergonómic](https://articulo.mercadolibre.com.ar/MLA-3005250038-mochila-para-laptop-john-deere-diseno-reforzado-y-ergonomic-_JM?searchVariation=197763283247#polycard_client=search-desktop&be_origin=backend&searchVariation=197763283247&search_layout=grid&position=44&type=item&tracking_id=0b3e150e-8094-4952-85d5-36d758c566d0) | $51.881 | -13.5% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 3 | baja | 44 | [Pulverizador Mochila Fumigador 20l - Honda Quilmes](https://www.mercadolibre.com.ar/pulverizador-mochila-fumigador-20l--honda-quilmes/up/MLAU289676040#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA836807075&sid=search) | $80.114 | 33.5% | tipo: MOCHILA; tokens comunes: mochila |
| 4 | baja | 43 | [Mochila Infantil Con Diseño De Fan Art De Tractores John Dee](https://articulo.mercadolibre.com.ar/MLA-1810945127-mochila-infantil-con-diseno-de-fan-art-de-tractores-john-dee-_JM?searchVariation=195657359500#polycard_client=search-desktop&be_origin=backend&searchVariation=195657359500&search_layout=grid&position=27&type=item&tracking_id=25d93341-0c73-409c-a9f5-f5182aa7f254) | $57.043 | -4.9% | tipo: MOCHILA; tokens comunes: mochila |
| 5 | baja | 43 | [Fumigador Pulverizador Mochila 16 Litros Rociador Manguera](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=GH2RUSskvR5hplg6Uvw4eQbdcgaczfzM1OmvtKTKVUY7HSxU9cyXmNYtA3rrqtu4JydjG194dk5XesEv14kheJghLEF%2BnzRA%2FWxBzwPwoLk%2B6zdBsayA7NhPLkx0nEMsi6uGHqCgrFlkqzAOSbKxIm9Pelm2NPODNr0le52ZDG7GqRCTzWBZQyo%2BDXrJtKAEFhsKJxHrpuQi%2BvmFcwf7%2BfLkljZBCefFbjTu6ZzhO%2BZ4GY5w2HNd9FU8gVDfzUaOHq0Fu9F1%2FvIJUgZAnmMGY0WAu3XTnrIM%2BXEuv7D2Xfq9VCS4CfIFS%2Fokdr1vJks9Ikeb377YGe800JE8EZA8YSClN%2FrY5xY%2BBhgFtN1jlSkad3Xvml9uUXTwSDa9uZYEuyxMwiM8QChgdPv4UeOHOFFAL7JeWzZSq4O1csnuptMRCUSndywmvXNeQhR1JQuc3ALbrU3WkllGx6NQM%2B2ixVfP6JROkGchDh8apuaHh0fhUPohhzHRMgr08vG5%2F%2Fl6JXQ0HOR5%2FMb8c0mCtyf594Yl7%2Fn%2BlVCifqeW%2FWNBgVq0jyUFgfr2l08uT5Dd4xRiXDitGF6h%2BlrJz17Q0BTn%2FS0RoopUcuyNHVxLf3BekVUE9xW7OpR2FofasxS5N1IXe30VSFgnVIEpq%2B8ZGr64xmqIHF7d8ix62Ic3WHBPG0eI5yyhJCbyIokay8u2HA1ylshkES5XBqYhPbo%2F4juOxItQeXChHNpYyFl2T6DhSX79Tqh63xv39Q75dG15kXLFwjGaIS%2B7s9BW0%2Fn7bC2VAHsWv5ODbK%2FYfj1Kr2zQI2s%2FxpfRlR%2F6DevGSDgVEzsRrXXhYGtpRkBtOjp3jxuKrKKTg3wGNepmS8l06TgS9Z%2BvlSVmn4yksRI4OdxGtwYWh8%2Bjq3gVl4Kz29lHymSkFFqCEVCzy70WfHIuQXXxJ8XF%2FoCafRUk4z%2BP%2FMde52M%2FpKAgj19LvBY2MUYHBQ%2F8gqvu1j38TF7OURgGN%2BvF0q4%3D&pdp_filters=item_id%3AMLA1354485212#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU230561367&backend_model=search-backend&be_origin=backend&search_layout=grid&position=13&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1354485212&sid=search) | $53.625 | -10.6% | tipo: MOCHILA; tokens comunes: mochila |
| 6 | baja | 43 | [Pulverizador Fumigador Mochila 20 Litros Manguera Lanza Acc Naranja](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=NjsjaoFU5ZjsrFBuxeiUdy6BO%2FOcsLIpcC6nba3v3NUuPtemS3ZeU4QPDl%2B16Y4wsUsmziw6cGHaAy95oiggk0DKDGMqZLHijezO8tWT4dUX%2FpSzSbIXMGggB4qn1zyD1wKddunE5vPfE5gTsL4kSkoLDBsyUT5TrYU5p3s0EepDB1EWbWjEj4pf9EkpwVzncyYxHynUG5cu8kgZEHpdSCgUXjTzPtD1PftK183o7Cy65ZbidWaZNMA5c8xTcJxVjypOs3YA89v7rB6R9tijMQQMBWHKfQZbRXALM%2FKowX%2FBmwLxeJfRoBSn3fsWSWbW0g2UcPgSgPE26k3rypWnG7N8%2F7lVw%2F4qE7JzM0mhi7nD%2B76q%2BnBJnbv82zlgCqswu98oaatqWcWDtD0DZhWjjJ88qfdWq3b8lZCiZsLesKSLoufOlfbrEKo7NwwhGK2fWXgxbPJluLsJpnCblGHVY6LXn9qJ8MwuifetoXqWN%2Fotp77ulB5rCwJ80Kvg7xhSLrjHIZUdY3rnHTI5JEH%2BGIfEwfISLy9zLyuTjP8v6UOkSJicTnlxX%2BEZKeqqMDcVqMZ839eTdhMAaKdbeZPJCKN9G4%2FcqRdNzzLQh0WCX1philb6cfzKGC1z4wM%2ByLYqi9dDPyxFQ5YWlZ7p5ySg%2BhCnn8id1bzX%2BKY0Ij%2FK7O6cRNMcuHQRq3%2FM%2Bh6FgRBqU%2Bnt49EbNwfiOTs88P3YYwmbuVBODyt8xUi8XCHuF5za6gLbtGIErdRMhyx3xuRs2E8okw%2BZugh2W8qhbrFKLOJK5XetbMl7cajg8IXHrK4LWVT6sGaRvLUnmTLOfnl0BH4FTb0TaeH4cSs3xvd29RcYQtaMnJKV2orGmIHVyW3b3Gtmdpi9xqNbv7R8a6G%2BgOD1imc2jBXR3m6WhDoh7CnKXlqfBC1%2B25BYzgW1ktHlo49PCQBuyyjdToawBHi1b47RuHO5i9va4Lqwxfsnf%2Bcz07pPlG13omv6Fl5TEDBHAQ%3D%3D&pdp_filters=item_id%3AMLA1767957491#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA66118093&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1767957491&sid=search) | $66.748 | 11.2% | tipo: MOCHILA; tokens comunes: mochila |
| 7 | baja | 43 | [Pulverizador Fumigador Mochila 16lt Manguera Atomizador Amarillo](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=HK3APi7E1xftVe2%2Fd0kelgvclc6sPN8%2BWEWJnxvkqHDhrpaXOtVymXVuxl81X2rFyhO%2B7txSYhX46Dpe5TMJpv1Y4zwC7%2FTihN6v5J5R0YJ1myKT62D4NB1Nrkwnz3sbfPxbioq9%2F8nydwhe0Y5Tms5pXEkCLyy9nsc5pgEa%2BKnfd5KYgUsJY%2BXZ42bROIPLu%2Bj7ZRS9EVueYpS%2BeXOVUOGUGnYDieqkBGGYhMA4yuOQAG%2FxwNtm6vpwMZ8UVURLPrzR%2FX7NPOcguwYmZgxHUfpuK%2FhhpXVrPyCOctudUxrhDrRnOreQIiHLgFRTNXpbHx7sRvwohRiA6GHCdlX6VMkNAAylBdFJX1grTowjAJDovzTrEiKVjCX%2Fm3DXYQNq7qqq65X8qwzgknibnZrtFE0xpMQCRoQpyvcnKpSUE9ZCkBgehjQZaSAIBBfTj4fDF3S4akyMPqnjsrHPJBvlS0LD3lxQWXm6xAMq2rEN6pCi1qX5%2FZMe8KmtwyIhclbqf0Sz%2F2mJATdr%2BfKU8AWg0ZfLcWYdBXqhzEHMlT03XabejYilZG3hifqvAxfOkxV9W7Js4ZNgA9vN84SrGViZr3aiMI%2FwF71eIYZi6Q6aBOWM2sfXrJvbWw%2FScdSk319x4Idov39TVB8kGP3lr%2BQ2RcENtpreWmA99gtlZOtcczONfHLeTWxFWRg8HPN1r0RkJTiievM07Ji1dcUkvuHdsPL8sRbI6Ss%2BqT96tBarTB3XscwWTeyi5Ax7uDR9FtZa3bcUtTiZaAuNztaClEumZB0tZEbqmlkQeRZdsrDfjpjJE9SMPX%2BXAlKSrgmiHQlfLUxAl1zujuYWicAEOxMhJOlCs4rkp%2FDaISiDPXwVUtXV1lVQQpzmoM6Fv9DrZkmsOG6wFpPfIUj%2Fxv2GsJgXN0pSYPtldkRG6FZr%2BWafzRhIPou6oRR%2BcM2LHNauQYgp2iv%2BZ2OP%2FP1GipcQWzs08mS1OUm09ljyEThuNS3B&pdp_filters=item_id%3AMLA3239497158#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA66429904&backend_model=search-backend&be_origin=backend&search_layout=grid&position=3&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA3239497158&sid=search) | $53.139 | -11.4% | tipo: MOCHILA; tokens comunes: mochila |
| 8 | baja | 43 | [Pulverizador Fumigador Mochila 16 Lts. P/liquid](https://www.mercadolibre.com.ar/pulverizador-fumigador-mochila-16-lts-pliquid/p/MLA22774897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA1688023451&sid=search) | $48.970 | -18.4% | tipo: MOCHILA; tokens comunes: mochila |
| 9 | baja | 43 | [Lanza Completa Pulverizador Giber Mochila Em12 Em16 Em20 Repuesto](https://www.mercadolibre.com.ar/lanza-completa-pulverizador-giber-mochila-em12-em16-em20-repuesto/p/MLA63122823#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA3276020572&sid=search) | $42.900 | -28.5% | tipo: MOCHILA; tokens comunes: mochila |
| 10 | baja | 43 | [Fumigador Pulverizador Mochila 16lt 4 5 Bar Ingco](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=kX%2BATfhyRqJuFl6AMj%2B69Kc6%2FMoZbzKlq5z5we4Yy1NQN9qJUAbMPUFrW4C4gKsHHk47Wl1FN7FePVh%2BrV1tCQw%2F%2BGZUDHiXitWtFcs9siuQ82DcXCD7pqR4elsddErDrUQI37jA0P8IVquNiimGswuYmzxGBMqERpicDz95PGRKzowtIcAcTAc1jg%2F8p%2BnMl2r5hzoo%2FYe5utrzJUnjyZEx9vGzigb%2Bvg2P1vk4KghfM71tc%2B0DGfQc8TJNn2M%2B6YVVs74uYWpJXgLN4pWrOLKgp9i8t1KNw2FRB%2F4b2nCBCS3YZkxQiOKr1piWCkd%2FsM35Ti%2BMWFFhXYmRNaoqpyp76QjtRDwZPW%2B8VWROiYE%2FNiVaySjg%2BTiaV0A3GtvFTeTsa%2F0pS4z%2Bft7f2CNKos8YwZWNy2B1JuZJB14qPCRUhrhkOg%2FoQ%2FBrCZtNWvXCz2ROURgOZrLgiVdNmLBfjkWkzMOSXBd1%2FmYb7Nu82%2FwcKq6OWzMx0DCLQw0T%2FpafCBsvrgBokqlhClTDvTDTqrokxTgsO0ySJelcdS1DPEL2%2FYy0fo1RtRk9U3XEi8pzcEeS7fMXts%2FOJLgxmvV4E9LUHD4kp7G8BKkAU%2F1SoN5FoPY7AYU2%2BwZ1IBPsGFGMui8GHdQfGdZ48FsJwHGrOnr1YINFAYuREYBu0GarRrcvKs%2Frk%2FzuIsZDzb8vZlo8WvqRUy9J0uYfobR3HHO8axcVZcFGO%2Bj9SnlAtnTLEq4cq9Fwng9B%2Bxc9Da2rOGvfWwTA7Aqx9sRgP68oP0QOQ35xaSHyrtARb1Su1DwCqMT69zJrnkKN5VTSbjG6MX%2FGNiw0qF%2Bb2bC61o0xVJt%2BiHX1OTk8gzIoHn7a5NVHQ6aRKBPnKygaJhf4WZaKMQuUO7BmOMoj90A%2FksMUL2OLGn%2FosRjABwokMHWbgk5PGUi2aP35IKbUsEKckhcfmqTh8sx7V2Dq3vE2UYnVCfFHNK7vmUWPfTjC&pdp_filters=item_id%3AMLA2579517046#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3566152135&backend_model=search-backend&be_origin=backend&search_layout=grid&position=16&type=pad&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA2579517046&sid=search) | $78.200 | 30.3% | tipo: MOCHILA; tokens comunes: mochila |
| 11 | baja | 42 | [Pulverizador Fumigador Lusqtoff Mochila 12 L Manguera Lanza Color Naranja](https://www.mercadolibre.com.ar/pulverizador-fumigador-lusqtoff-mochila-12-l-manguera-lanza-color-naranja/p/MLA22571073#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&float_highlight=last_units&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA3274360364&sid=search) | $60.199 | 0.3% | tipo: MOCHILA; tokens comunes: mochila |
| 12 | baja | 42 | [Fumigador Pulverizador Mochila 16lt 4 5 Bar Ingco Hspp41602 Color Amarillo Talle 16 Lts](https://www.mercadolibre.com.ar/fumigador-pulverizador-mochila-16lt-4-5-bar-ingco-hspp41602-color-amarillo-talle-16-lts/p/MLA26590942#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=f86bef1e-c3ff-4035-a79d-6f612757d1ed&wid=MLA2863908986&sid=search) | $63.359 | 5.6% | tipo: MOCHILA; tokens comunes: mochila |
| 13 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=6fd33b89-0587-4416-9e0a-e4b0c95dc718) | $69.824 | 16.4% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 86. Mochila Sein John Deere gris

- ID Venturino: `276129570`
- Precio Venturino: $135.000
- Tokens: mochila, sein, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 3 válidos antes de top
- Candidatos excluidos por precio: 3885
- Candidatos excluidos por score: 1419
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 87. Motobomba Honda WB20XH2

- ID Venturino: `340632800`
- Precio Venturino: $1.362.010
- Tokens: motobomba, honda, wb20xh2, wb20
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 2
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 5065
- Candidatos excluidos por score: 239
- Mediana ML: $1.235.000
- Venturino vs mediana ML: 10.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 99 | [Motobomba Honda Wb20xt Drx Wb20xTDRx](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=d%2B0qFndUxgVBiHbTbC2qd4OA75PmOieSjIvnvwgJ8p6KTRhkdimoGXjIAVoFUC7FtcU1Zyjzajhqp7akwmLfdVPohJH95lmAh79ZYvry96UE3%2BFwl4Sx30fV0kXP3HedTzo1i8NHK9U4SippCxbeABA3sfF1dscB6cMeRh07PzXvi7mj6fM12Js90SFbsIyJO6xCl9Ev6tSQ8t9zlDwg4VVTZ6OT5Aw98Jvz5wj%2BvjsBMrjPeJ8OfSMhopDYKGkgS%2Fvgl9TF%2FSY6gapLnHrASRoQkQsgj0AdyXqyBHcgIVW6tj8nC0IyE0RmIBo65RE%2BN0DXyO9OxtGKzF4ql%2F2UCswFHqSy0SFrMO4StSQlgIAAlBL4vaucE0GtuvBEnlKYOf051Ajm2Hw2v8lxGg7%2F%2BZMymNU5njWbQORBREtC9ZSYHxpTwkXrNnse7Ck07IbD0KaI2Jypar0%2Fb4cNlHSX93cEb1ibN85sS7PlNLgPiE7PPh2xxErJHwQaEdHjBI238TdLXvySgWYU8DvFIF6g6yzpWbKx26YuguUPzL0VtIfEPk4fu7mHWzBX7PgPDPOiWzc1y9L%2Ft5NBfwFz%2BU5wriYnRu0BMQWzol5uPzsaP160kJFK1uOkOB67s0KWAlw%2FjnrxKTWnGf2uV0GyyuCEu9fpAbapKvPBvtsSDdHAa%2F72rc6F0omhMWCiygMhyBLZKOdcfBP%2BEbZ6IZTLCM4g9gvms2KsPDoyXvLgVJiVjmp%2B%2B%2FLeJODIYPXolrMpQ39xm%2FTL50Q0ehFjo45NqTrXoQsjdv3SPEdRUMSqaIDh%2BffQP523gRvo%2B%2FyEUEQOJvq1wyYEG4wjNlx2nFaoGSf0bYzEfQVxiVaOS3mf%2BvZijNhShmvpbpUccBye7TAYH0tIlcJvfp%2F%2BielA2xii%2FxEt3KLVEGiRzFfic%2BE88JI2VCOQdPe36vg7jmMlgAETwPfcGn7Bz1c%3D&pdp_filters=item_id%3AMLA2810796020#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA46146649&backend_model=search-backend&be_origin=backend&search_layout=grid&position=7&type=pad&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA2810796020&sid=search) | $1.235.000 | -9.3% | tipo: MOTOBOMBA; tokens técnicos: wb20; modelo Honda compatible: wb20; tokens comunes: motobomba, honda, wb20 |
| 2 | alta | 96 | [Motobomba Honda 2 Wb20xh 40200 L/h](https://www.mercadolibre.com.ar/motobomba-honda-2--wb20xh-40200-lh/up/MLAU373069132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1774600258&sid=search) | $1.387.298 | 1.9% | tipo: MOTOBOMBA; tokens técnicos: wb20; modelo Honda compatible: wb20; tokens comunes: motobomba, honda, wb20 |
| 3 | baja | 21 | [Motobomba Honda Wb20 + Aceite De Regalo!](https://www.mercadolibre.com.ar/motobomba-honda-wb20-xt-agua-limpia-5hp-275-bar-3600-rpm/p/MLA2051015631#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA618766465&sid=search) | $1.105.361 | -18.8% | penalización tipo distinto (MOTOBOMBA vs ACEITE); tokens técnicos: wb20; modelo Honda compatible: wb20; tokens comunes: motobomba, honda, wb20 |

### 88. Motobomba Honda WL20XH

- ID Venturino: `340635178`
- Precio Venturino: $1.170.000
- Tokens: motobomba, honda, wl20xh, wl20
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 16
- Candidatos usados: 17 de 17 válidos antes de top
- Candidatos excluidos por precio: 5003
- Candidatos excluidos por score: 287
- Mediana ML: $971.500
- Venturino vs mediana ML: 20.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 124 | [Motobomba Honda Wl20xh 2 36000lts](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-2--36000lts/up/MLAU227147265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1161953890&sid=search) | $1.066.126 | -8.9% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 2 | alta | 120 | [Motobomba Honda 2 Wl20xh 40200 L/h](https://www.mercadolibre.com.ar/motobomba-honda-2--wl20xh-40200-lh/up/MLAU373077308#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1774511852&sid=search) | $1.100.000 | -6.0% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 3 | alta | 120 | [Motobomba Wl20xh Honda - 670 Lts X Min](https://www.mercadolibre.com.ar/motobomba-wl20xh-honda--670-lts-x-min/up/MLAU310187035#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA930115109&sid=search) | $923.623 | -21.1% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 4 | alta | 118 | [Motobomba Honda Wl20xh 4.8hp 670l/min 2 Autocebante](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-48hp-670lmin-2--autocebante/up/MLAU3269410076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA2149396344&sid=search) | $978.000 | -16.4% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 5 | alta | 117 | [Motobomba Honda Wl20xh 36000l 5.5hp 2 Pulgadas Aguas Limpias](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-36000l-55hp-2-pulgadas-aguas-limpias/up/MLAU3168332259#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1836588576&sid=search) | $971.500 | -17.0% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 6 | alta | 116 | [Motobomba Honda Wl20xh 2 Pulg 50mm 36000l/h Agua Limpia](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-2-pulg-50mm-36000lh-agua-limpia/up/MLAU227475699#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&float_highlight=last_units&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1282074897&sid=search) | $1.068.235 | -8.7% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 7 | alta | 116 | [Motobomba Honda Wl20xh 670 Lts/min 163 Cm3 Aguas Limpias !!](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-670-ltsmin-163-cm3-aguas-limpias-/up/MLAU131717337#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA766705372&sid=search) | $961.952 | -17.8% | tipo: MOTOBOMBA; tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |
| 8 | alta | 103 | [Motobomba Honda Wl20 Original](https://www.mercadolibre.com.ar/motobomba-honda-wl20-original/up/MLAU244544360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1475973350&sid=search) | $971.500 | -17.0% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 9 | alta | 97 | [Motobomba Honda Wl20 Original Hp 5.5 Nafta](https://www.mercadolibre.com.ar/motobomba-honda-wl20-original-hp-55-nafta/up/MLAU261076651#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1383485457&sid=search) | $1.165.800 | -0.4% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 10 | alta | 97 | [Motobomba Honda Wl20 Original Hp 5.5 Nafta](https://www.mercadolibre.com.ar/motobomba-honda-wl20-original-hp-55-nafta/up/MLAU3399007210#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA2308272624&sid=search) | $950.500 | -18.8% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 11 | alta | 96 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp 40.200lts/hr](https://www.mercadolibre.com.ar/motobomba-agua-limpia-honda-wl20-xh-4hp-40200ltshr/p/MLA43947530#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&float_highlight=last_units&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA2260269748&sid=search) | $1.254.960 | 7.3% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 12 | alta | 96 | [Motobomba Honda Wl20 Xh Agua Limp 36000lts Motostore Pilar](https://www.mercadolibre.com.ar/motobomba-honda-wl20-xh-agua-limp-36000lts--motostore-pilar/up/MLAU231516086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1349032690&sid=search) | $932.640 | -20.3% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 13 | alta | 95 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp Tuamoto 40.200lts/hr](https://www.mercadolibre.com.ar/motobomba-agua-limpia-honda-wl20-xh-4hp-tuamoto-40200ltshr/up/MLAU144647626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1123812738&sid=search) | $1.001.286 | -14.4% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 14 | alta | 95 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp 40.200lts/hr Genamax](https://www.mercadolibre.com.ar/motobomba-agua-limpia-honda-wl20-xh-4hp-40200ltshr-genamax/up/MLAU3367722376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA2255391428&sid=search) | $864.200 | -26.1% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 15 | alta | 95 | [Motobomba Agua Limpia Honda Wl20 Xh 4hp Buen Caudal Tuamoto](https://www.mercadolibre.com.ar/motobomba-agua-limpia-honda-wl20-xh-4hp-buen-caudal-tuamoto/up/MLAU146980139#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA1123812730&sid=search) | $834.405 | -28.7% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 16 | alta | 94 | [Motobomba Honda Wl20 Xh Agua Limpia 4hp 3 Bar 3600 Rpm](https://www.mercadolibre.com.ar/motobomba-honda-wl20-xh-agua-limpia-4hp-3-bar-3600-rpm/up/MLAU273408183#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA749852634&sid=search) | $864.200 | -26.1% | tipo: MOTOBOMBA; tokens técnicos: wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20 |
| 17 | baja | 38 | [Motobomba Honda Wl20xh 36000 Lit/hora + Aceite De Regalo!](https://www.mercadolibre.com.ar/motobomba-honda-wl20xh-36000-lithora--aceite-de-regalo/up/MLAU256407750#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=bcf4613c-17b1-4db4-84b3-4b0989f1bb9d&wid=MLA618766288&sid=search) | $817.481 | -30.1% | penalización tipo distinto (MOTOBOMBA vs ACEITE); tokens técnicos: wl20xh, wl20; modelo Honda compatible: wl20; tokens comunes: motobomba, honda, wl20xh, wl20 |

### 89. Motoguadaña Honda UMK435 – 35.8 cc

- ID Venturino: `332864026`
- Precio Venturino: $778.042
- Tokens: motoguadana, honda, umk435, 35.8, cc
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 16
- Candidatos usados: 16 de 16 válidos antes de top
- Candidatos excluidos por precio: 4895
- Candidatos excluidos por score: 396
- Mediana ML: $850.000
- Venturino vs mediana ML: -8.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 103 | [Desmalezadora Honda UMK435](https://www.mercadolibre.com.ar/desmalezadora-honda-umk435/p/MLA17446726#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&float_highlight=last_unit&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1971317858&sid=search) | $814.000 | 4.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 2 | alta | 103 | [Desmalezadora Motoguadaña Honda Umk435](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk435/up/MLAU227823789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1181876381&sid=search) | $719.200 | -7.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 3 | alta | 103 | [Motoguadaña Honda Umk435](https://www.mercadolibre.com.ar/motoguadana-honda-umk435/up/MLAU311257773#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA930484345&sid=search) | $850.000 | 9.2% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 4 | alta | 101 | [Desmalezadora Honda UMK435T](https://www.mercadolibre.com.ar/desmalezadora-honda-umk435t/p/MLA17462475#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1510301307&sid=search) | $795.698 | 2.3% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 5 | alta | 101 | [Desmalezadora Motoguadaña Honda Umk435t](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk435t/up/MLAU3360593236#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA2243397320&sid=search) | $719.200 | -7.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 6 | alta | 99 | [Motoguadaña Honda 4 Tiempos -umk435](https://www.mercadolibre.com.ar/motoguadana-honda-4-tiempos-umk435/up/MLAU249999504#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&float_highlight=last_unit&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA618766176&sid=search) | $696.204 | -10.5% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 7 | alta | 99 | [Motoguadaña Honda Umk435 4t Do-motos](https://www.mercadolibre.com.ar/motoguadana-honda-umk435-4t-domotos/up/MLAU136431343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&float_highlight=last_unit&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA922345772&sid=search) | $915.000 | 17.6% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 8 | alta | 97 | [Motoguadaña Desmalezadora Honda Umk435 35,8cc 4 Tiempos](https://www.mercadolibre.com.ar/motoguadana-desmalezadora-honda-umk435-358cc-4-tiempos/up/MLAU3701707793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA2736102138&sid=search) | $850.000 | 9.2% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 9 | alta | 97 | [Motoguadaña Desmalezadora Honda Umk435 35,8cc 4 Tiempos](https://www.mercadolibre.com.ar/motoguadana-desmalezadora-honda-umk435-358cc-4-tiempos/up/MLAU297042517#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA873879280&sid=search) | $966.263 | 24.2% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 10 | alta | 97 | [Motoguadaña Honda Umk435 35,8cc 1.6hp 4t](https://www.mercadolibre.com.ar/motoguadana-honda-umk435-358cc-16hp-4t/up/MLAU307741658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA914960973&sid=search) | $975.000 | 25.3% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 11 | alta | 96 | [Desmalezadora Motoguadaña Honda Umk 435 4t 1hp Tua](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk-435-4t-1hp-tua/up/MLAU199030514#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA913434822&sid=search) | $815.791 | 4.9% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 12 | alta | 96 | [Desmalezadora Motoguadaña Honda 4 Tiempos Umk435 43cc 6,1kg](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-4-tiempos-umk435-43cc-61kg/up/MLAU215576796#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1129310933&sid=search) | $944.261 | 21.4% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 13 | alta | 96 | [Desmalezadora Motoguadaña Honda Umk435t 35,8cc 4t 1.6 Hp](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk435t-358cc-4t--16-hp/up/MLAU244380305#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1532382882&sid=search) | $975.002 | 25.3% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 14 | alta | 96 | [Motoguadaña Umk 435 4 T. Honda Desmalezadora Motoguadana](https://www.mercadolibre.com.ar/motoguadana-umk-435-4-t-honda-desmalezadora-motoguadana/up/MLAU256462992#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&float_highlight=last_units&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA654092963&sid=search) | $1.004.435 | 29.1% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 15 | alta | 96 | [Motoguadaña Honda Umk 435 4t 35.8cc 1.3hp](https://www.mercadolibre.com.ar/motoguadana-honda-umk-435-4t-358cc-13hp/up/MLAU248565234#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA1542279732&sid=search) | $1.072.083 | 37.8% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |
| 16 | alta | 95 | [Desmalezadora Motoguadaña Honda Umk 435 4t 1.6 Hp Tuamoto!](https://www.mercadolibre.com.ar/desmalezadora-motoguadana-honda-umk-435-4t-16-hp-tuamoto/up/MLAU202714369#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=fa36941e-f95d-4520-ab6a-6ca59978ed3a&wid=MLA913435504&sid=search) | $694.395 | -10.8% | tipo: MOTOGUADANA; tokens técnicos: umk435; modelo Honda compatible: umk435; tokens comunes: motoguadana, honda, umk435 |

### 90. Motor Honda GP200 – 5.5 HP

- ID Venturino: `332858727`
- Precio Venturino: $483.518
- Tokens: motor, honda, gp200, 5.5, hp
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 11
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 4775
- Candidatos excluidos por score: 521
- Mediana ML: $517.439
- Venturino vs mediana ML: -6.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 125 | [Motor Estacionario Honda Gp 200 5.5 Hp Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55-hp-eje-horizontal/up/MLAU3520852779#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1569928047&sid=search) | $611.996 | 26.6% | tipo: MOTOR; tokens técnicos: gp200, 5.5; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200, 5.5, hp |
| 2 | alta | 104 | [Motor Naftero Honda Eje Horizontal 6,5 Hp Gp200](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp200-65hp-caceite/p/MLA2040853899#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&float_highlight=last_units&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA933569489&sid=search) | $634.660 | 31.3% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200, hp |
| 3 | alta | 97 | [Motor Honda Gp200 6.5hp Naftero Horizontal](https://www.mercadolibre.com.ar/motor-honda-gp200-65hp-naftero-horizontal/up/MLAU235829436#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1382376833&sid=search) | $493.000 | 2.0% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 4 | alta | 97 | [Motor Honda Gp200 6.5hp Naftero Horizontal](https://www.mercadolibre.com.ar/motor-honda-gp200-65hp-naftero-horizontal/up/MLAU236114984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1383523053&sid=search) | $493.000 | 2.0% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 5 | alta | 96 | [Motor Estacionario Honda Gp200 5.5hp Eje Recto Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp200-55hp-eje-recto-horizontal/up/MLAU246784909#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1640116076&sid=search) | $446.600 | -7.6% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 6 | alta | 96 | [Motor Honda Gp200h-qx1 5.5hp Naftero Horizontal](https://www.mercadolibre.com.ar/motor-honda-gp200hqx1-55hp-naftero-horizontal/up/MLAU352454084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1419235491&sid=search) | $539.845 | 11.6% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 7 | alta | 96 | [Motor Honda Gp200 5.5hp Naftero Horizontal. Do-motos](https://www.mercadolibre.com.ar/motor-honda-gp200-55hp-naftero-horizontal-domotos/up/MLAU127481408#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA1393956701&sid=search) | $613.000 | 26.8% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 8 | alta | 94 | [Motor estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/p/MLA48032319#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA2229850308&sid=search) | $493.000 | 2.0% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 9 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3408002807#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA2334348212&sid=search) | $459.000 | -5.1% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 10 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3069267078#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA2030073448&sid=search) | $517.439 | 7.0% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |
| 11 | alta | 94 | [Motor Estacionario Honda Gp 200 5.5hp Naftero Eje Horizontal](https://www.mercadolibre.com.ar/motor-estacionario-honda-gp-200-55hp-naftero-eje-horizontal/up/MLAU3492317771#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA2457963400&sid=search) | $620.000 | 28.2% | tipo: MOTOR; tokens técnicos: gp200; modelo Honda compatible: gp200; tokens comunes: motor, honda, gp200 |

### 91. Motor Honda GX160SX – 5.5 HP

- ID Venturino: `332862157`
- Precio Venturino: $576.413
- Tokens: motor, honda, gx160sx, 5.5, hp, gx160
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 8
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 4814
- Candidatos excluidos por score: 485
- Mediana ML: $618.184
- Venturino vs mediana ML: -6.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 126 | [Motor Nafta Honda Gx160h1 5,5 Hp Arr.m](https://www.mercadolibre.com.ar/motor-nafta-honda-gx160h1-55-hp-arrm/up/MLAU371563491#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA1774513062&sid=search) | $700.000 | 21.4% | tipo: MOTOR; tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |
| 2 | alta | 118 | [Motor Honda Gx160sx 4 Tiempos 5.5hp](https://www.mercadolibre.com.ar/motor-cunero-gx160h2-honda/p/MLA2039913032#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA1115468569&sid=search) | $715.000 | 24.0% | tipo: MOTOR; tokens técnicos: gx160sx, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, gx160sx, gx160 |
| 3 | alta | 101 | [Motor Marca Honda Gx160h2-qx1 4.8 Hp 4t Con Cuñero Gasolina](https://www.mercadolibre.com.ar/motor-marca-honda-gx160h2-qx1-48-hp-4t-con-cunero-gasolina/p/MLA25427565#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA1486382218&sid=search) | $580.000 | 0.6% | tipo: MOTOR; tokens técnicos: gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, hp, gx160 |
| 4 | alta | 101 | [Motor Honda Gx160](https://www.mercadolibre.com.ar/motor-honda-gx160/up/MLAU3254148733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA2137486112&sid=search) | $602.000 | 4.4% | tipo: MOTOR; tokens técnicos: gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, gx160 |
| 5 | alta | 96 | [Motor Estacionario Honda Gx160h2sx1 Genamax](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx160h2sx1-genamax/up/MLAU3367804464#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=2861d67f-5067-4569-9614-46c32c2cdf15&wid=MLA2250367084&sid=search) | $532.150 | -7.7% | tipo: MOTOR; tokens técnicos: gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, gx160 |
| 6 | media | 48 | [Motor Honda Gx160 De 5.5 Hp Con Sensor De Aceite](https://www.mercadolibre.com.ar/motor-honda-gx160-de-55-hp-con-sensor-de-aceite/up/MLAU3414564362#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA2333440364&sid=search) | $551.500 | -4.3% | penalización tipo distinto (MOTOR vs ACEITE); tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |
| 7 | media | 48 | [Motor Honda Gx160 De 5.5 Hp Con Sensor De Aceite](https://www.mercadolibre.com.ar/motor-honda-gx160-de-55-hp-con-sensor-de-aceite/up/MLAU3899782019#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA3199467950&sid=search) | $634.367 | 10.1% | penalización tipo distinto (MOTOR vs ACEITE); tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |
| 8 | media | 48 | [Motor Honda Gx160 de 5.5 hp con sensor de aceite](https://www.mercadolibre.com.ar/motor-honda-gx160-de-55-hp-con-sensor-de-aceite/p/MLA23422772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA1798455638&sid=search) | $658.365 | 14.2% | penalización tipo distinto (MOTOR vs ACEITE); tokens técnicos: 5.5, gx160; modelo Honda compatible: gx160; tokens comunes: motor, honda, 5.5, hp, gx160 |

### 92. Motor Honda GX200QX – 6.5 HP

- ID Venturino: `332861874`
- Precio Venturino: $619.048
- Tokens: motor, honda, gx200qx, 6.5, hp, gx200
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4823
- Candidatos excluidos por score: 482
- Mediana ML: $616.633
- Venturino vs mediana ML: 0.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 126 | [Motor de gasolina estacionario Honda Gx200 Qd 6.5 HP](https://www.mercadolibre.com.ar/motor-de-gasolina-estacionario-honda-gx200-qd-65-hp/p/MLA37451365#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA1737817559&sid=search) | $615.000 | -0.7% | tipo: MOTOR; tokens técnicos: 6.5, gx200; modelo Honda compatible: gx200; tokens comunes: motor, honda, 6.5, hp, gx200 |
| 2 | alta | 94 | [Motor Estacionario Honda Gx200 196cc 4t Ohv Eje Recto](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx200-65hp-196cc-rranque-manual/p/MLA2042318950#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA2457600844&sid=search) | $618.265 | -0.1% | tipo: MOTOR; tokens técnicos: gx200; modelo Honda compatible: gx200; tokens comunes: motor, honda, gx200 |

### 93. Motor Honda GX390QX – 13 HP

- ID Venturino: `332857483`
- Precio Venturino: $1.128.754
- Tokens: motor, honda, gx390qx, 13, hp, gx390
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4987
- Candidatos excluidos por score: 316
- Mediana ML: $1.297.500
- Venturino vs mediana ML: -13.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 118 | [Motor Honda 13hp Eje 1 Gx390qx](https://www.mercadolibre.com.ar/honda-gx390-motor-estacionario-13hp-4t-gasolina/p/MLA2037999154#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_unit&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA933923373&sid=search) | $1.285.000 | 13.8% | tipo: MOTOR; tokens técnicos: gx390qx, gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390qx, gx390 |
| 2 | alta | 96 | [Motor Estacionario Honda Gx390 13hp Gx390h2-qx](https://www.mercadolibre.com.ar/motor-estacionario-honda-gx390-13hp-gx390h2qx/up/MLAU3646767374#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA2616599922&sid=search) | $1.433.217 | 27.0% | tipo: MOTOR; tokens técnicos: gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390 |
| 3 | alta | 94 | [Motor Honda Gx390 13hp A.manual 4 Tiempos Naftero Eje Recto](https://www.mercadolibre.com.ar/motor-honda-gx390-13hp-amanual-4-tiempos-naftero-eje-recto/p/MLA2043729231#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA662872818&sid=search) | $1.131.000 | 0.2% | tipo: MOTOR; tokens técnicos: gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390 |
| 4 | alta | 93 | [Motor Honda Estacionario Gx390 13hp 4t Ohv Eje Recto 1 PuLG](https://www.mercadolibre.com.ar/motor-estacionario-nafta-15hp-eje-horizontal-4t-calidad-pro/p/MLA2054871539#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&float_highlight=last_units&tracking_id=659be320-7b43-49ff-9c87-7d89f34e94b9&wid=MLA916144673&sid=search) | $1.310.000 | 16.1% | tipo: MOTOR; tokens técnicos: gx390; modelo Honda compatible: gx390; tokens comunes: motor, honda, gx390 |

### 94. Navaja de bolsillo grande John Deere

- ID Venturino: `288695391`
- Precio Venturino: $66.000
- Tokens: navaja, bolsillo, grande
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4073
- Candidatos excluidos por score: 1234
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
- Candidatos excluidos por precio: 4123
- Candidatos excluidos por score: 1178
- Mediana ML: $44.250
- Venturino vs mediana ML: 31.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f7b018b4-ec8f-4196-9d62-810be9ab5b25&wid=MLA930580659&sid=search) | $45.500 | -21.6% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=54779be7-908c-4662-8cfe-1f6c5e8f3cc7&wid=MLA1506435419&sid=search) | $41.198 | -29.0% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $60.412 | 4.2% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $60.737 | 4.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA1741179879&sid=search) | $42.999 | -25.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1146530823&sid=search) | $37.000 | -36.2% | tipo: HERRAMIENTA |

### 96. Palanca Barra John Deere 8 pulgadas

- ID Venturino: `276681809`
- Precio Venturino: $30.000
- Tokens: palanca, barra, 8, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 4336
- Candidatos excluidos por score: 967
- Mediana ML: $34.650
- Venturino vs mediana ML: -13.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Palancas Apertura Ventana Cabina John Deere Sg2](https://www.mercadolibre.com.ar/palancas-apertura-ventana-cabina-john-deere-sg2/up/MLAU319169472#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=3ca8e70f-49ea-4513-8726-9a7ae0e9746d&wid=MLA1409671591&sid=search) | $23.076 | -23.1% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=54779be7-908c-4662-8cfe-1f6c5e8f3cc7&wid=MLA1506435419&sid=search) | $41.198 | 37.3% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=00956a8d-1e22-4673-b6c1-008c6820a4a5&wid=MLA1704310265&sid=search) | $32.300 | 7.7% | tipo: HERRAMIENTA |
| 4 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1146530823&sid=search) | $37.000 | 23.3% | tipo: HERRAMIENTA |

### 97. Palanca John Deere 25 pulgadas

- ID Venturino: `276681805`
- Precio Venturino: $57.000
- Tokens: palanca, 25, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4150
- Candidatos excluidos por score: 1151
- Mediana ML: $44.250
- Venturino vs mediana ML: 28.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f7b018b4-ec8f-4196-9d62-810be9ab5b25&wid=MLA930580659&sid=search) | $45.500 | -20.2% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=54779be7-908c-4662-8cfe-1f6c5e8f3cc7&wid=MLA1506435419&sid=search) | $41.198 | -27.7% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $60.412 | 6.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $60.737 | 6.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA1741179879&sid=search) | $42.999 | -24.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1146530823&sid=search) | $37.000 | -35.1% | tipo: HERRAMIENTA |

### 98. Palanca John Deere 31 pulgadas

- ID Venturino: `276681807`
- Precio Venturino: $58.000
- Tokens: palanca, 31, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 4123
- Candidatos excluidos por score: 1178
- Mediana ML: $44.250
- Venturino vs mediana ML: 31.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Chapas Palanca Y Freno Tractor John Deere](https://www.mercadolibre.com.ar/juego-de-chapas-palanca-y-freno-tractor--john-deere/up/MLAU310971825#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&float_highlight=last_units&tracking_id=f7b018b4-ec8f-4196-9d62-810be9ab5b25&wid=MLA930580659&sid=search) | $45.500 | -21.6% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=54779be7-908c-4662-8cfe-1f6c5e8f3cc7&wid=MLA1506435419&sid=search) | $41.198 | -29.0% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1806230491-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=item&tracking_id=bcb1eae4-bb0d-4556-b486-c05c9188c37a) | $60.412 | 4.2% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Llave Original De Equipo John Deere, Pack De 2, Gy20680](https://articulo.mercadolibre.com.ar/MLA-3379365450-llave-original-de-equipo-john-deere-pack-de-2-gy20680-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=6f629847-7b4e-4327-b733-be3791a91330) | $60.737 | 4.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuadro Retroiluminado Led John Deere Tractor Herramientas](https://www.mercadolibre.com.ar/cuadro-retroiluminado-led-john-deere-tractor-herramientas/up/MLAU3886684083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=6e1bd2a2-777d-42d6-8652-05ea1b551cd3&wid=MLA1741179879&sid=search) | $42.999 | -25.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Llave Caterpillar 5p8500 El Par](https://www.mercadolibre.com.ar/llave-caterpillar-5p8500-el-par/up/MLAU151620129#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1146530823&sid=search) | $37.000 | -36.2% | tipo: HERRAMIENTA |

### 99. Pinza múltiple de acero inoxidable John Deere

- ID Venturino: `276173635`
- Precio Venturino: $70.000
- Tokens: pinza, multiple, acero, inoxidable
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4027
- Candidatos excluidos por score: 1280
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
- Candidatos excluidos por precio: 4030
- Candidatos excluidos por score: 1277
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
- Candidatos usados: 13 de 13 válidos antes de top
- Candidatos excluidos por precio: 4248
- Candidatos excluidos por score: 1046
- Mediana ML: $45.000
- Venturino vs mediana ML: 4.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Punton Cosechadora Jhon Deere Triple Forjado](https://www.mercadolibre.com.ar/punton-cosechadora-jhon-deere-triple-forjado/up/MLAU213446711#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=144e19d3-1c1a-4217-a6bb-4b3e4d1f2800&wid=MLA1123219059&sid=search) | $48.738 | 3.7% | tipo: CUCHILLA; tokens comunes: punton, cosechadora, forjado; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Cuchillas Genérica Para John Deere De 54 Cm- 21 Pulg ( X2u)](https://www.mercadolibre.com.ar/cuchillas-generica-para-john-deere-de-54-cm-21-pulg--x2u/up/MLAU3936051037#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA1775667427&sid=search) | $45.000 | -4.3% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Cuchilla 21 Pulgadas Para Tractor Jhon Deere 7 Puntas](https://www.mercadolibre.com.ar/cuchilla-21-pulgadas-para-tractor-jhon-deere-7-puntas/up/MLAU3260625058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA2137492956&sid=search) | $31.589 | -32.8% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=&sid=search) | $64.387 | 37.0% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/up/MLAU407576398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&float_highlight=last_units&tracking_id=c1621b29-1bd5-4386-bb11-4243095fd92d&wid=MLA1437902317&sid=search) | $64.387 | 37.0% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 6 | baja | 35 | [Cuchilla Tractor 16,5 Derecha P/bolsa Tractor Castel Xdc140](https://www.mercadolibre.com.ar/cuchilla-tractor-165--derecha-pbolsa-tractor-castel-xdc140/up/MLAU225194875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=11319a74-baa3-4ed5-a987-28e5b63ac2db&wid=MLA1140941044&sid=search) | $44.585 | -5.1% | tipo: CUCHILLA |
| 7 | baja | 35 | [Cuchilla 19.5 Tractor Deere 38 Stx38 78](https://www.mercadolibre.com.ar/cuchilla-195---tractor--deere-38--stx38-78/up/MLAU181213484#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=product&tracking_id=a45359cb-c913-47ae-b599-a879211b5d14&wid=MLA1381336731&sid=search) | $49.790 | 5.9% | tipo: CUCHILLA |
| 8 | baja | 35 | [Cuchilla De Corte 38' - M84472](https://www.mercadolibre.com.ar/cuchilla-de-corte-38--m84472/up/MLAU423649509#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94a12a57-a3a0-4dfa-a06c-f8fc5fe9432d&wid=MLA1859864160&sid=search) | $43.500 | -7.4% | tipo: CUCHILLA |
| 9 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre.](https://www.mercadolibre.com.ar/cuchilla-2112--para-tractor-42--deere-115-125-135-7-estre/up/MLAU709233564#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=a45359cb-c913-47ae-b599-a879211b5d14&wid=MLA1140331911&sid=search) | $42.431 | -9.7% | tipo: CUCHILLA |
| 10 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre.](https://www.mercadolibre.com.ar/cuchilla-2112--para-tractor-42--deere-115-125-135-7-estre/up/MLAU127634743#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=c1621b29-1bd5-4386-bb11-4243095fd92d&wid=MLA1439946508&sid=search) | $51.900 | 10.4% | tipo: CUCHILLA |
| 11 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre](https://www.mercadolibre.com.ar/cuchilla-2112-para-tractor-42-deere-115-125-135-7-estre/p/MLA66650707#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=a45359cb-c913-47ae-b599-a879211b5d14&wid=MLA1750731425&sid=search) | $55.139 | 17.3% | tipo: CUCHILLA |
| 12 | baja | 35 | [Cuchilla De Corte 42' - Gx22151](https://www.mercadolibre.com.ar/cuchilla-de-corte-42--gx22151/up/MLAU2967821263#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bf0b887f-72fb-4820-98d1-749032b269f3&wid=MLA1472563141&sid=search) | $32.000 | -31.9% | tipo: CUCHILLA |
| 13 | baja | 24 | [Repuesto De Patin Para Cosechadora Draper John Deere](https://www.mercadolibre.com.ar/repuesto-de-patin-para-cosechadora-draper-john-deere/up/MLAU393564833#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=product&tracking_id=9c974c5b-06a7-4eac-86fa-25a988e0331c&wid=MLA1825307436&sid=search) | $29.047 | -38.2% | tokens comunes: cosechadora, draper; compatibilidad/marca: John Deere |

### 102. Puntón Cuchilla. John Deere

- ID Venturino: `318859417`
- Precio Venturino: $86.000
- Tokens: punton, cuchilla
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 20 de 22 válidos antes de top
- Candidatos excluidos por precio: 3954
- Candidatos excluidos por score: 1331
- Mediana ML: $103.019
- Venturino vs mediana ML: -16.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 58 | [Cuchillas Para Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-para-tractor-john-deere-42/up/MLAU172143595#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&float_highlight=last_units&tracking_id=a45359cb-c913-47ae-b599-a879211b5d14&wid=MLA775204942&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 2 | baja | 57 | [Sección Cuchilla John Deere H163131 - Prentacc](https://www.mercadolibre.com.ar/seccion-cuchilla-john-deere-h163131--prentacc/up/MLAU3451205653#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ed9f88c9-ab81-4c21-ba91-174b11b2e890&wid=MLA1549074995&sid=search) | $66.000 | -23.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 57 | [Cuchillas Compatible Con Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-compatible-con-tractor-john-deere-42/up/MLAU204286028#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&float_highlight=last_units&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA919160219&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 4 | baja | 56 | [Juego Cuchillas John Deere La 135 Código M154061 Oregon](https://www.mercadolibre.com.ar/juego-cuchillas-john-deere-la-135-codigo-m154061-oregon/up/MLAU134201412#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&float_highlight=last_units&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=MLA847129327&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 5 | baja | 56 | [Juego Cuchillas Oregon 92-110 John Deere La 125](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-92110-john-deere-la-125/up/MLAU130693017#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&float_highlight=last_units&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA834167453&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 6 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU1073488312#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=b3a52e2b-e814-4e7f-ac71-413a16df9487&wid=MLA1140948761&sid=search) | $98.048 | 14.0% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 7 | baja | 56 | [Repuestos John Deere - Jgo. De Cuchillas - 46 - M41967](https://www.mercadolibre.com.ar/repuestos-john-deere--jgo-de-cuchillas--46--m41967/up/MLAU3736924947#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=94a12a57-a3a0-4dfa-a06c-f8fc5fe9432d&wid=MLA2794779068&sid=search) | $72.600 | -15.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 8 | baja | 56 | [Juego Cuchillas Tractor John Deere 42 Pulgadas Usa](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-john-deere--42-pulgadas-usa/up/MLAU155628101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&float_highlight=last_units&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA1266340056&sid=search) | $71.999 | -16.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 9 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU190037463#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=MLA910245048&sid=search) | $107.990 | 25.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 10 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU306728158#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=MLA910215527&sid=search) | $113.862 | 32.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 11 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU152184233#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=d6d0816e-f884-46b3-a103-28b3e747dbb0&wid=MLA1152796939&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 12 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU260942932#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=MLA1536195876&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 13 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU124341980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=MLA1163468541&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 14 | baja | 55 | [Juego Cuchillas Para John Deere 38pul Centro 45/64 17,8mm](https://www.mercadolibre.com.ar/juego-cuchillas-para-john-deere-38pul-centro-4564-178mm/up/MLAU140173189#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&float_highlight=last_unit&tracking_id=7b238137-0782-493d-b987-b08ceaf43d09&wid=MLA1106046608&sid=search) | $75.000 | -12.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 15 | baja | 55 | [Correa Cuchilla 38 Sabre John Deere Reemplaza M122674 Oregon](https://www.mercadolibre.com.ar/correa-cuchilla-38-sabre-john-deere-reemplaza-m122674-oregon/up/MLAU127047057#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=MLA1400582119&sid=search) | $73.578 | -14.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 16 | baja | 55 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=&sid=search) | $64.387 | -25.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 17 | baja | 55 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/up/MLAU407576398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&float_highlight=last_units&tracking_id=c1621b29-1bd5-4386-bb11-4243095fd92d&wid=MLA1437902317&sid=search) | $64.387 | -25.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 18 | baja | 55 | [Juego Cuchillas Tractor 54 John Deere D170 La150 La170 X 3](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-54-john-deere-d170-la150-la170-x-3/up/MLAU288219362#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&float_highlight=last_units&tracking_id=b2c55d6f-4a50-41a0-8b5b-0c54e4ec9e81&wid=MLA827797148&sid=search) | $110.000 | 27.9% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 19 | baja | 55 | [Juego Cuchillas John Deere 42 Centro Estriado 17 Mm Oregon](https://www.mercadolibre.com.ar/juego-cuchillas-john-deere-42-centro-estriado-17-mm-oregon/p/MLA72870521#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=f0bf6943-f872-4b54-a60e-28c7f4b5f84a&wid=&sid=search) | $111.279 | 29.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 20 | baja | 55 | [Juego Cuchillas John Deere 42 Centro Estriado 17 Mm Oregon](https://www.mercadolibre.com.ar/juego-cuchillas-john-deere-42-centro-estriado--17-mm-oregon/up/MLAU121623640#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&float_highlight=last_units&tracking_id=c1621b29-1bd5-4386-bb11-4243095fd92d&wid=MLA1110282228&sid=search) | $111.279 | 29.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |

### 103. Punzón central John Deere

- ID Venturino: `276196693`
- Precio Venturino: $15.000
- Tokens: punzon, central
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4535
- Candidatos excluidos por score: 772
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
- Candidatos excluidos por precio: 3917
- Candidatos excluidos por score: 1390
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
- Candidatos excluidos por precio: 4198
- Candidatos excluidos por score: 1109
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
- Candidatos excluidos por precio: 4304
- Candidatos excluidos por score: 1003
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 107. Set de Farmin Friends John Deere

- ID Venturino: `281259388`
- Precio Venturino: $58.000
- Tokens: set, farmin, friend
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 20 de 28 válidos antes de top
- Candidatos excluidos por precio: 4123
- Candidatos excluidos por score: 1156
- Mediana ML: $64.894
- Venturino vs mediana ML: -10.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2160207414&sid=search) | $76.315 | 31.6% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | 32.1% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | 0.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Siku 1649 Camión Forestal John Deere Juguete Coleccionable](https://www.mercadolibre.com.ar/siku-1649-camion-forestal-john-deere-juguete-coleccionable/up/MLAU3782233912#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1670514687&sid=search) | $59.760 | 3.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | 7.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | 9.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Ertl Collect N Play John Deere Angus Bull](https://www.mercadolibre.com.ar/ertl-collect-n-play-john-deere-angus-bull/up/MLAU4001542687#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2168860624&sid=search) | $63.797 | 10.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=ac64c6dc-bbac-44bc-83c8-3da37b95502e&wid=MLA2792533012&sid=search) | $52.000 | -10.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677885959&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1725054925&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1606696085&sid=search) | $50.000 | -13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587&wid=MLA3370300548&sid=search) | $48.868 | -15.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | 18.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | 19.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | 22.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA3316369844&sid=search) | $42.000 | -27.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2378379950&sid=search) | $75.326 | 29.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2168937218&sid=search) | $75.543 | 30.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&float_highlight=last_units&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1588571170&sid=search) | $39.775 | -31.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Lote 2 Arados Retro John Deere C/ Detalles Juguete Vintage](https://www.mercadolibre.com.ar/lote-2-arados-retro-john-deere-c-detalles-juguete-vintage/up/MLAU2393241891#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1455831071&sid=search) | $77.777 | 34.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 108. Set de latas John Deere

- ID Venturino: `276148810`
- Precio Venturino: $20.000
- Tokens: set, lata
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4583
- Candidatos excluidos por score: 724
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
- Candidatos excluidos por precio: 4583
- Candidatos excluidos por score: 724
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 110. Set de tractor y camión volquete John Deere

- ID Venturino: `281053465`
- Precio Venturino: $60.000
- Tokens: set, tractor, camion, volquete
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 15
- Candidatos usados: 20 de 29 válidos antes de top
- Candidatos excluidos por precio: 4191
- Candidatos excluidos por score: 1087
- Mediana ML: $67.490
- Venturino vs mediana ML: -11.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 78 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | 27.7% | tipo: JUGUETE; tokens comunes: set, tractor, camion, volquete; compatibilidad/marca: John Deere |
| 2 | media | 67 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2160207414&sid=search) | $76.315 | 27.2% | tipo: JUGUETE; tokens comunes: set, camion, volquete; compatibilidad/marca: John Deere |
| 3 | media | 58 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | 6.2% | tipo: JUGUETE; tokens comunes: tractor, camion; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1606696085&sid=search) | $50.000 | -16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Siku 1649 Camión Forestal John Deere Juguete Coleccionable](https://www.mercadolibre.com.ar/siku-1649-camion-forestal-john-deere-juguete-coleccionable/up/MLAU3782233912#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1670514687&sid=search) | $59.760 | -0.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 6 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | 4.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677885959&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | 15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | 15.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | 17.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/a-tractor-coleccion-taladro-de-grano-john-deere-ertl-7215r/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA1717056337&sid=search) | $80.581 | 34.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | 39.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587&wid=MLA3370300548&sid=search) | $48.868 | -18.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2378379950&sid=search) | $75.326 | 25.5% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 16 | baja | 42 | [Tractor Miniatura Escala 1:64 Rojo Case IH 5488 Coleccionable Metal](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=i1mFsJr80eJAygsFLY6u6tiSY2E6dU4hxYUulMXLAZrz2zHtGbgktoLpiujdpbThAhkv6D%2FxzB1b6KReAB6WzfQTAEIjj%2F%2Bi4DSxLkA0WzVbHE2vroVMFI6xPtGIpFHdKOiMMPVrGtnUq58%2B3WtkKARb7DSWWL2GOvUqPoa51Uv6TQoVNapIY6GDDVIcCk9T8pi5JZLL1EwijxZdMANhvq1bCI0%2FtDAf0Dyaao%2F9debbFsWlG4%2BwrLa45JOAfWMgFF8mgogfWHjO6OwC0IoJcr1EnpjEVI%2BKmnldt6R%2Fy8UnShbehLnK6nciOW6EnmlSzvMJlI7RgLk6R8xJ0doEhqXCyS9hpTsTBQyuS1XnjbG8n7%2Bg1TBkP0vrYxulkONpVKrCmBs4Rk7AJHnLb3M3pZz99nTK2FvwKjXTBuI4QwfGI2n1TD9QJdQoflpQbPixG2%2B60cXeb8l181Uge5lQGnGUVJrL%2BJ00e8IDtIVhwPD%2FNJWe%2B7oOoJ8Bmx5GuvRqYH5jsbNgaFsEBwqWNXPz7zZg9eo4i74FpGB4z%2FnB91%2FnHOOjQSPq5fLEYv1NaUs%2Bmlulf4%2FTrgZcoJExlBl1RrOt8SBAHokNII4uw9INlYQMgcqQ3BcEwyipSbdFMhGaYJNFKZN1TLK%2BBxvrS5%2FfaLJV2JRP%2BJUbjy6RKyhpGrBKFt2%2FHAgqR10zhZtwCpiLHKDH3%2BFVJoQjNEgEMJssw2gifo6%2FQiJqJJKeuU7Izwju0XovWX7QwtCFpH73g7sIKJ4KNKexy4%2B%2FE2Pz2ab%2FszWZbYO%2FgBdFNPoDOiAYAcS5bytR%2BwC79QbSgU5acIqCOmROVcgzWXlZclEY%2BQnl1hnUodYxHAGvwyqfYK5eN3pWidr%2BXWsNyKC9ergLC5UW1YReKDxeqfCnJBjsHpyLwERJj9btzaM9TxV7HtY4GJ8%2FdCOaBzaiQLUoB%2BYGOJ1QFCxoksn97pkyRRBUy5xABMrt9tdpchp4V3%2Fhjw9Gs%2B8pXlAcI9VspsxnRfRQ08XOwS%2BZScwdIvKgok6oKZ62KXQbc9dyypf24GuKLG2Y2weSaEd9SR0%3D&pdp_filters=item_id%3AMLA2579002200#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54418577&backend_model=fallback_productos-promocionados_reco_of_reco_supple_view_view_reco_of_reco&be_origin=backend&search_layout=grid&position=51&type=pad&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2579002200&sid=search) | $70.000 | 16.7% | tipo: JUGUETE; tokens comunes: tractor |
| 17 | baja | 41 | [Ertl Collect N Play John Deere Angus Bull](https://www.mercadolibre.com.ar/ertl-collect-n-play-john-deere-angus-bull/up/MLAU4001542687#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2168860624&sid=search) | $63.797 | 6.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1725054925&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=ac64c6dc-bbac-44bc-83c8-3da37b95502e&wid=MLA2792533012&sid=search) | $52.000 | -13.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2168937218&sid=search) | $75.543 | 25.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 111. Termo Iguazu Verde John Deere

- ID Venturino: `276157118`
- Precio Venturino: $90.000
- Tokens: termo, iguazu, verde
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 1 válidos antes de top
- Candidatos excluidos por precio: 3964
- Candidatos excluidos por score: 1342
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
- Candidatos excluidos por precio: 3964
- Candidatos excluidos por score: 1342
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 113. Tractir 8RX 410 Con orugas John Deere

- ID Venturino: `281234442`
- Precio Venturino: $85.000
- Tokens: tractor, 8rx, 410, oruga
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 89 válidos antes de top
- Candidatos excluidos por precio: 3970
- Candidatos excluidos por score: 1248
- Mediana ML: $89.760
- Venturino vs mediana ML: -5.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Llavero Tractor John Deere 8r 410 Metal Resin](https://www.mercadolibre.com.ar/llavero-tractor-john-deere-8r-410-metal-resin/up/MLAU3886394589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=da1dc84c-19ed-451b-98b7-9bbd4c25a12c&wid=MLA1741124951&sid=search) | $89.539 | 5.3% | tipo: JUGUETE; tokens técnicos: 410; tokens comunes: tractor, 410; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | 2.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | 32.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | -0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2ca1ba56-63e3-4f44-9120-7fb104ee023b&wid=MLA3078939230&sid=search) | $86.284 | 1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | -1.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/a-tractor-coleccion-taladro-de-grano-john-deere-ertl-7215r/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA1717056337&sid=search) | $80.581 | -5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | 6.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | -9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | 11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA784333319&sid=search) | $99.867 | 17.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2450624614&sid=search) | $100.000 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2472089290&sid=search) | $100.000 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | -18.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | -18.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1588501493&sid=search) | $103.717 | 22.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3090752210&sid=search) | $103.717 | 22.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1791146511&sid=search) | $103.948 | 22.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 114. Tractor 32 JD 8R John Deere Prestige

- ID Venturino: `281259419`
- Precio Venturino: $311.000
- Tokens: tractor, 32, 8r, prestige
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 147 válidos antes de top
- Candidatos excluidos por precio: 4623
- Candidatos excluidos por score: 537
- Mediana ML: $295.580
- Venturino vs mediana ML: 5.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1501324025&sid=search) | $209.218 | -32.7% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 67 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=28e35b0a-ba2a-4885-bbba-140a07c66e0e&wid=MLA1585559315&sid=search) | $240.000 | -22.8% | tipo: JUGUETE; tokens comunes: tractor, 32, prestige; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1782656432&sid=search) | $291.302 | -6.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1507969023&sid=search) | $288.367 | -7.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 5 | media | 57 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=5bd3e372-d889-4f59-a7db-0583bdd7dd38&wid=MLA3117507902&sid=search) | $420.000 | 35.0% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 6 | media | 57 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2555019084&sid=search) | $199.880 | -35.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=83wctu0FrF1f8v3ORtAhcTCXIxcHvNb9VHZeI0AqfRgYs%2F%2Ba6%2FIw98KHjQDAVbYVWdS%2BsQEoTS84cKH0arUxtOr29chXPSMe8xbcWL8wniydWY2wOSXadt0ybgBNbCOqbblBtprhH9YwOvlixJtVuxUkg417rwRAxtWSxj1FDyJnMW4j1LmABt%2BQelnMWFYgxbk1O5toto4Yabcofn8FVZBK2eH4rlgy8jvr7VhAezfukvuejngqPXuVKG%2Bzvxnz18HVWLLeobnma6OLXR%2Bil8mYpBS7APYY%2F735UiNefghyyCSOkf26%2Fjy6lF5t%2BFKw%2BfSnixg5AWXM3LmTU%2FThcfdY0Q8pdawKlUf3ykH2D5Xk3A6BkiHfINESnGv%2BJyppuyGYlQAHa%2FbZRD5zZIgXWfK%2FqlriYNg2dwA3B61FQia5sYPCn4QU%2FoovwqkoFtuaAOkGcO3OaiZ3mjn%2Bkp8v6QLWbdKU7cqo8bp%2FQxvHiJh2jvioIrk9%2FebNCfNFA%2FX2iDjSucZZ7uGPahboklMNwTzEgYZHnLtjLzMZQXQmyJFkvUcwW1gOnzV3nJLY%2BfnPcCG%2BJovUIAQOSpqSOGasIFGqMJ1%2Fg7obWs9yoVUIaCY5ctoS1M51ww92NWKMTBg6g6stBM0H1kJdJqexdu5vr5DfsW7fLxGUXBqGhCyrS%2FFi85zeMGVuSnJ1B0S7a00VL%2F46nmmyUz4oGs3cZGTEcI5ljhlD%2FPtjaT3RKW7ABEng8kykcxKAEkGytWlOCnGOq6OYm4x9SLKb1UTbfO58ia9t6PDw6hC6iu66Wjbu4p1KCb83cbr9QupMdDlT%2BDBrWyZ7HCNQf1amnjXftR%2BDeIyfqdIOx2%2Fa4kK67y%2FaQAGU1Mjwxy%2Bgbkdsubg6zlNgT8PnwlqHxPFlbxgM1J6s2ig%2BqrWRcZYrh3lpqgqDUX8f9hMt5xY69QA5mfU61UaulzhlvIahYWQntHsaYlEvQQNcT0YvW%2FVj3zpPUA%3D%3D&pdp_filters=item_id%3AMLA1688046131#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54486376&backend_model=search-backend&be_origin=backend&search_layout=grid&position=15&type=pad&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1688046131&sid=search) | $259.000 | -16.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 8 | media | 56 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1537554751&sid=search) | $394.031 | 26.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 9 | media | 56 | [Colección John Deere Prestige X9 1000 Combine, Escala 1:32](https://www.mercadolibre.com.ar/john-deere-prestige-collection-x9-1000-combine-132-scale/p/MLA2076857598#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1678240327&sid=search) | $408.717 | 31.4% | tipo: JUGUETE; tokens comunes: 32, prestige; compatibilidad/marca: John Deere |
| 10 | media | 51 | [Tractor De Juguete Verde 1 32 Con Remolque Y Disco](https://www.mercadolibre.com.ar/tractor-de-juguete-verde-1-32-con-remolque-y-disco/up/MLAU3629093285#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2605756500&sid=search) | $297.761 | -4.3% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 11 | media | 51 | [Tractor De Colección Metalizado 1/32 Con Ruedas Simples](https://www.mercadolibre.com.ar/tractor-de-coleccion-metalizado-132-con-ruedas-simples/up/MLAU3636789934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1594244033&sid=search) | $280.966 | -9.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 12 | media | 50 | [Set Granja 1 32 Tractor Metal Y Animales Juguete Niño](https://www.mercadolibre.com.ar/set-granja-1-32-tractor-metal-y-animales-juguete-nino/up/MLAU3629077203#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2605820936&sid=search) | $302.747 | -2.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 13 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1763349785&sid=search) | $317.982 | 2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Rociador Juguete Escala 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/rociador-juguete-escala-132-john-deere--a-pedidoexkarg/up/MLAU368494041#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1766427200&sid=search) | $322.795 | 3.8% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1949971056&sid=search) | $323.265 | 3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1514896991&sid=search) | $293.399 | -5.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1417510473&sid=search) | $332.793 | 7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1503208905&sid=search) | $332.996 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Set Ertl John Deere Haying 1:32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-john-deere-haying-132--a-pedidoexkarg/up/MLAU2044179155#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1929826114&sid=search) | $283.187 | -8.9% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Camión De Volteo John Deere 460e-ii 1/50 Escala Prestige](https://www.mercadolibre.com.ar/camion-de-volteo-john-deere-460eii-150-escala-prestige/up/MLAU3452033317#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=35d42ed0-6e43-40a3-94fa-b71b5f1808f0&wid=MLA1549150807&sid=search) | $282.699 | -9.1% | tipo: JUGUETE; tokens comunes: prestige; compatibilidad/marca: John Deere |

### 115. Tractor 435 Replica John Deere

- ID Venturino: `281234444`
- Precio Venturino: $202.000
- Tokens: tractor, 435, replica
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 176 válidos antes de top
- Candidatos excluidos por precio: 4217
- Candidatos excluidos por score: 914
- Mediana ML: $198.914
- Venturino vs mediana ML: 1.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1583656447&sid=search) | $259.000 | 28.2% | tipo: JUGUETE; tokens técnicos: 435; tokens comunes: tractor, 435; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Réplica Del Tractor John Deere 3010 De Juguete A Escala 1/16](https://www.mercadolibre.com.ar/toy-john-deere-3010-tractor-116-scale-replica/p/MLA2077440206#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1678240307&sid=search) | $199.475 | -1.3% | tipo: JUGUETE; tokens comunes: tractor, replica; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA2194899840&sid=search) | $187.899 | -7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1713564907&sid=search) | $221.560 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tomy John Deere Johnny Tractor Ride En Juguete Juguete De De](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2182318240&sid=search) | $222.889 | 10.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor John Deere 7270r De Juguete Con Rotoempacadora 560r](https://articulo.mercadolibre.com.ar/MLA-1693749907-tractor-john-deere-7270r-de-juguete-con-rotoempacadora-560r-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $159.385 | -21.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1688853331&sid=search) | $146.511 | -27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1784581058&sid=search) | $270.242 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=f91bb9e1-7a46-4763-82a3-4206ab50fa30&wid=MLA2797531354&sid=search) | $121.289 | -40.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete John Deere 5115 M Con Remolque A Escala 1](https://www.mercadolibre.com.ar/toy-tractor-john-deere-5115m-w-trailer-116-scale-bruder/p/MLA2056619387#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1654544791&sid=search) | $202.426 | 0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2555019084&sid=search) | $199.880 | -1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1950555252&sid=search) | $198.353 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor De Actividades Ride On Toy John Deere Sit 'n Scoot,](https://www.mercadolibre.com.ar/ride-on-toy-john-deere-sit-n-scoot-activity-tractor-green/p/MLA2041333172#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1634639005&sid=search) | $196.461 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1501324025&sid=search) | $209.218 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete Field Of Dreams De John Deere A Escala 1:](https://articulo.mercadolibre.com.ar/MLA-2589230436-tractor-de-juguete-field-of-dreams-de-john-deere-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $193.880 | -4.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Bruder John Deere Tractor 5115 2022 1:16 - Verde](https://www.mercadolibre.com.ar/bruder-john-deere-tractor-5115-2022-116--verde/up/MLAU153770758#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1163263641&sid=search) | $212.499 | 5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor John Deere De Juguete Happy Birthday 4020 A Escala 1](https://www.mercadolibre.com.ar/toy-john-deere-116-scale-happy-birthday-4020-tractor/p/MLA2086086026#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3008620836&sid=search) | $187.173 | -7.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor John Deere 4020 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-4020-164--a-pedidoexkarg/up/MLAU2803971639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1461201863&sid=search) | $179.991 | -10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor 2021 Ertl 1:64 John Deere 8960 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2021-ertl-164-john-deere-8960--a-pedidoexkarg/up/MLAU3920195868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA3219582450&sid=search) | $179.880 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete John Deere 3020 Escala 1/16 Celebration](https://www.mercadolibre.com.ar/tractor-toy-john-deere-3020-116-scale-celebration/p/MLA2082879124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1763605549&sid=search) | $227.216 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 116. Tractor 6210R Bif Farm John Deere

- ID Venturino: `281234446`
- Precio Venturino: $262.000
- Tokens: tractor, 6210r, bif, farm
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 158 válidos antes de top
- Candidatos excluidos por precio: 4482
- Candidatos excluidos por score: 667
- Mediana ML: $246.253
- Venturino vs mediana ML: 6.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1609083934&sid=search) | $227.227 | -13.3% | tipo: JUGUETE; tokens técnicos: 6210r; tokens comunes: tractor, 6210r; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Tractor De Juguete John Deere Big Farm Con Vagón A Escala 1:](https://www.mercadolibre.com.ar/john-deere-big-farm-tractor-and-wagon-116-scale-ligh/p/MLA2038130505#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3382284296&sid=search) | $273.302 | 4.3% | tipo: JUGUETE; tokens comunes: tractor, farm; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1583656447&sid=search) | $259.000 | -1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1949945520&sid=search) | $265.905 | 1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1476358051&sid=search) | $269.326 | 2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1784581058&sid=search) | $270.242 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere De Estilo Temprano A Escala 1/](https://articulo.mercadolibre.com.ar/MLA-3096031022-tractor-de-juguete-john-deere-de-estilo-temprano-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $274.956 | 4.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1970561562&sid=search) | $247.506 | -5.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1571921115&sid=search) | $245.000 | -6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=28e35b0a-ba2a-4885-bbba-140a07c66e0e&wid=MLA1585559315&sid=search) | $240.000 | -8.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Big Farm John Deere 318g - Juego De Juguetes De](https://www.mercadolibre.com.ar/big-farm-john-deere-318g--juego-de-juguetes-de/up/MLAU3118018951#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2051252588&sid=search) | $239.882 | -8.4% | tipo: JUGUETE; tokens comunes: farm; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1507969023&sid=search) | $288.367 | 10.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1782656432&sid=search) | $291.302 | 11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1514896991&sid=search) | $293.399 | 12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA2138660238&sid=search) | $230.189 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Juguete John Deere 3020 Escala 1/16 Celebration](https://www.mercadolibre.com.ar/tractor-toy-john-deere-3020-116-scale-celebration/p/MLA2082879124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1763605549&sid=search) | $227.216 | -13.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Toy John Deere 3020 A Escala 1/16 Celebración](https://articulo.mercadolibre.com.ar/MLA-1763449927-tractor-toy-john-deere-3020-a-escala-116-celebracion-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=item&tracking_id=0e1a4495-9897-4296-b7dc-aaa67be3fd95) | $227.216 | -13.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tomy John Deere Johnny Tractor Ride En Juguete Juguete De De](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2182318240&sid=search) | $222.889 | -14.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1713564907&sid=search) | $221.560 | -15.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Bruder John Deere Tractor 5115 2022 1:16 - Verde](https://www.mercadolibre.com.ar/bruder-john-deere-tractor-5115-2022-116--verde/up/MLAU153770758#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1163263641&sid=search) | $212.499 | -18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 117. Tractor 64 JD 7R 330 Row Crop John Deere

- ID Venturino: `281259425`
- Precio Venturino: $92.000
- Tokens: tractor, 64, 7r, 330, row, crop
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 110 válidos antes de top
- Candidatos excluidos por precio: 3959
- Candidatos excluidos por score: 1238
- Mediana ML: $97.500
- Venturino vs mediana ML: -5.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2450624614&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2472089290&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/a-tractor-coleccion-taladro-de-grano-john-deere-ertl-7215r/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA1717056337&sid=search) | $80.581 | -12.4% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1835352944&sid=search) | $112.120 | 21.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | -25.0% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677885959&sid=search) | $65.990 | -28.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 8 | media | 56 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1472790549&sid=search) | $119.425 | 29.8% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 9 | media | 56 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA3141293538&sid=search) | $122.099 | 32.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 10 | media | 55 | [Tractor 2025 Ertl 1:64 John Deere 4955 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2025-ertl-164-john-deere-4955--a-pedidoexkarg/up/MLAU3262907220#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA2141477802&sid=search) | $113.994 | 23.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 11 | media | 55 | [Tractor De Juguete John Deere 1/64 4230 Lp86726 Verde Y Amar](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726-verde-y-amar/up/MLAU3877165881#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA3148218346&sid=search) | $117.526 | 27.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | -7.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | -9.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Ertl Segadora John Deere W260r 1:64](https://www.mercadolibre.com.ar/ertl-segadora-john-deere-w260r-164/up/MLAU3565085905#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA2578658354&sid=search) | $105.000 | 14.1% | tipo: JUGUETE; tokens comunes: 64; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor Ertl 1/64 Allis Chalmers 7080 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-allis-chalmers-7080---a-pedidoexkarg/up/MLAU3840056786#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1696062683&sid=search) | $108.990 | 18.5% | tipo: JUGUETE; tokens comunes: tractor, 64 |
| 19 | media | 49 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | 22.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -23.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 118. Tractor 6410 John Deere

- ID Venturino: `281053456`
- Precio Venturino: $400.000
- Tokens: tractor, 6410
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 125 válidos antes de top
- Candidatos excluidos por precio: 4713
- Candidatos excluidos por score: 469
- Mediana ML: $388.493
- Venturino vs mediana ML: 3.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens técnicos: 6410; tokens comunes: tractor, 6410; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1493524125&sid=search) | $501.990 | 25.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1514896991&sid=search) | $293.399 | -26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1507969023&sid=search) | $288.367 | -27.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete John Deere De Estilo Temprano A Escala 1/](https://articulo.mercadolibre.com.ar/MLA-3096031022-tractor-de-juguete-john-deere-de-estilo-temprano-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $274.956 | -31.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Pala Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-pala-frontal/up/MLAU4063180058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3427874184&sid=search) | $526.699 | 31.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU4048783911#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3427759746&sid=search) | $526.699 | 31.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1949945520&sid=search) | $265.905 | -33.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1970561562&sid=search) | $247.506 | -38.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1571921115&sid=search) | $245.000 | -38.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1503458191&sid=search) | $555.586 | 38.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor Ertl John Deere 4960 1:32 Prestige](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4960-132-prestige/up/MLAU3565135279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=28e35b0a-ba2a-4885-bbba-140a07c66e0e&wid=MLA1585559315&sid=search) | $240.000 | -40.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2550302558&sid=search) | $382.954 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 119. Tractor 8320R con disco 637John Deere

- ID Venturino: `281259399`
- Precio Venturino: $102.000
- Tokens: tractor, 8320r, disco, 637john
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 20 de 130 válidos antes de top
- Candidatos excluidos por precio: 3906
- Candidatos excluidos por score: 1271
- Mediana ML: $103.717
- Venturino vs mediana ML: -1.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $106.251 | 4.2% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 2 | alta | 73 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2ca1ba56-63e3-4f44-9120-7fb104ee023b&wid=MLA3078939230&sid=search) | $86.284 | -15.4% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 3 | alta | 73 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA1557066483&sid=search) | $142.598 | 39.8% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 4 | alta | 72 | [Ertl John Deere 8320r Tractor Y Modelo 637 Disco Set (1:6...](https://articulo.mercadolibre.com.ar/MLA-2414668928-ertl-john-deere-8320r-tractor-y-modelo-637-disco-set-16-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&float_highlight=last_units&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7) | $89.050 | -12.7% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 5 | baja | 44 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | 10.2% | tipo: JUGUETE; tokens comunes: tractor |
| 6 | baja | 44 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -11.8% | tipo: JUGUETE; tokens comunes: tractor |
| 7 | baja | 44 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -14.3% | tipo: JUGUETE; tokens comunes: tractor |
| 8 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1588501493&sid=search) | $103.717 | 1.7% | tipo: JUGUETE; tokens comunes: tractor |
| 9 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3090752210&sid=search) | $103.717 | 1.7% | tipo: JUGUETE; tokens comunes: tractor |
| 10 | baja | 43 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1791146511&sid=search) | $103.948 | 1.9% | tipo: JUGUETE; tokens comunes: tractor |
| 11 | baja | 43 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2450624614&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 12 | baja | 43 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2472089290&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 13 | baja | 43 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA784333319&sid=search) | $99.867 | -2.1% | tipo: JUGUETE; tokens comunes: tractor |
| 14 | baja | 43 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2588150140&sid=search) | $106.019 | 3.9% | tipo: JUGUETE; tokens comunes: tractor |
| 15 | baja | 43 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | -6.9% | tipo: JUGUETE; tokens comunes: tractor |
| 16 | baja | 43 | [Tractor A Escala Siku - Mercedes Benz](https://www.mercadolibre.com.ar/tractor-a-escala-siku--mercedes-benz/up/MLAU3633279196#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2601298402&sid=search) | $94.800 | -7.1% | tipo: JUGUETE; tokens comunes: tractor |
| 17 | baja | 43 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1588597639&sid=search) | $109.806 | 7.7% | tipo: JUGUETE; tokens comunes: tractor |
| 18 | baja | 43 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=9&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $110.115 | 8.0% | tipo: JUGUETE; tokens comunes: tractor |
| 19 | baja | 43 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=5a16e526-351c-4824-a4d2-837d65567e87&wid=MLA2842120858&sid=search) | $110.440 | 8.3% | tipo: JUGUETE; tokens comunes: tractor |
| 20 | baja | 43 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3036951256&sid=search) | $110.965 | 8.8% | tipo: JUGUETE; tokens comunes: tractor |

### 120. Tractor 9470RX John Deere

- ID Venturino: `281222478`
- Precio Venturino: $95.000
- Tokens: tractor, 9470rx
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 118 válidos antes de top
- Candidatos excluidos por precio: 3948
- Candidatos excluidos por score: 1241
- Mediana ML: $99.934
- Venturino vs mediana ML: -4.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -8.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | 18.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | 0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | -5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA784333319&sid=search) | $99.867 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2450624614&sid=search) | $100.000 | 5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Llavero Tractor John Deere 8r 410 Metal Resin](https://www.mercadolibre.com.ar/llavero-tractor-john-deere-8r-410-metal-resin/up/MLAU3886394589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=da1dc84c-19ed-451b-98b7-9bbd4c25a12c&wid=MLA1741124951&sid=search) | $89.539 | -5.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1791146511&sid=search) | $103.948 | 9.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | -10.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $106.251 | 11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | -12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=9&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $110.115 | 15.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=5a16e526-351c-4824-a4d2-837d65567e87&wid=MLA2842120858&sid=search) | $110.440 | 16.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3036951256&sid=search) | $110.965 | 16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | -19.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $114.597 | 20.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=10&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $117.564 | 23.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -25.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2860958990&sid=search) | $120.655 | 27.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 121. Tractor 9620RX John Deere

- ID Venturino: `281259422`
- Precio Venturino: $630.000
- Tokens: tractor, 9620rx
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 74 válidos antes de top
- Candidatos excluidos por precio: 4824
- Candidatos excluidos por score: 409
- Mediana ML: $477.385
- Venturino vs mediana ML: 32.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA2735955816&sid=search) | $599.379 | -4.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA3260069348&sid=search) | $578.990 | -8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1503458191&sid=search) | $555.586 | -11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Pala Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-pala-frontal/up/MLAU4063180058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3427874184&sid=search) | $526.699 | -16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU4048783911#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3427759746&sid=search) | $526.699 | -16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1493524125&sid=search) | $501.990 | -20.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1165962632&sid=search) | $475.779 | -24.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1462618659&sid=search) | $452.361 | -28.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1241574644&sid=search) | $420.295 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1534604385&sid=search) | $399.880 | -36.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1767841826&sid=search) | $398.326 | -36.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Ertl 1/32 John Deere 9r 590 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-132-john-deere-9r-590--a-pedidoexkarg/up/MLAU2910027843#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1984193972&sid=search) | $652.589 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1504753813&sid=search) | $554.343 | -12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1422054560&sid=search) | $733.573 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA3229211686&sid=search) | $478.990 | -24.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2510969874&sid=search) | $446.999 | -29.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1501340737&sid=search) | $439.275 | -30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=5bd3e372-d889-4f59-a7db-0583bdd7dd38&wid=MLA3117507902&sid=search) | $420.000 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1537554751&sid=search) | $394.031 | -37.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2550302558&sid=search) | $382.954 | -39.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 122. Tractor Baler y vagon John Deere

- ID Venturino: `281222474`
- Precio Venturino: $94.000
- Tokens: tractor, baler, vagon
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 116 válidos antes de top
- Candidatos excluidos por precio: 3944
- Candidatos excluidos por score: 1247
- Mediana ML: $92.585
- Venturino vs mediana ML: 1.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | -4.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | -9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | -11.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | 19.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $114.597 | 21.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -24.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2860958990&sid=search) | $120.655 | 28.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=f91bb9e1-7a46-4763-82a3-4206ab50fa30&wid=MLA2797531354&sid=search) | $121.289 | 29.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | -32.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | -33.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | 1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Llavero Tractor John Deere 8r 410 Metal Resin](https://www.mercadolibre.com.ar/llavero-tractor-john-deere-8r-410-metal-resin/up/MLAU3886394589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=da1dc84c-19ed-451b-98b7-9bbd4c25a12c&wid=MLA1741124951&sid=search) | $89.539 | -4.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA784333319&sid=search) | $99.867 | 6.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA2450624614&sid=search) | $100.000 | 6.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2472089290&sid=search) | $100.000 | 6.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2ca1ba56-63e3-4f44-9120-7fb104ee023b&wid=MLA3078939230&sid=search) | $86.284 | -8.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1588501493&sid=search) | $103.717 | 10.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3090752210&sid=search) | $103.717 | 10.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 123. Tractor con vagón John Deere

- ID Venturino: `281053467`
- Precio Venturino: $71.000
- Tokens: tractor, vagon
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 49 válidos antes de top
- Candidatos excluidos por precio: 4022
- Candidatos excluidos por score: 1236
- Mediana ML: $78.611
- Venturino vs mediana ML: -9.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | 23.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | -0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | -2.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=53&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $76.640 | 7.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | -10.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1575273767&sid=search) | $83.564 | 17.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | -17.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3082491710&sid=search) | $84.893 | 19.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Llavero Tractor John Deere 8r 410 Metal Resin](https://www.mercadolibre.com.ar/llavero-tractor-john-deere-8r-410-metal-resin/up/MLAU3886394589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=da1dc84c-19ed-451b-98b7-9bbd4c25a12c&wid=MLA1741124951&sid=search) | $89.539 | 26.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA2351763726&sid=search) | $90.169 | 27.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA3214114070&sid=search) | $95.000 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Juguete, John Deere 7215r : Ertl 1:64 - Verde](https://www.mercadolibre.com.ar/a-tractor-coleccion-taladro-de-grano-john-deere-ertl-7215r/p/MLA2058041589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bacae22b-c14d-4307-8d1b-0755dd3e5068&wid=MLA1717056337&sid=search) | $80.581 | 13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=2ca1ba56-63e3-4f44-9120-7fb104ee023b&wid=MLA3078939230&sid=search) | $86.284 | 21.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Ertl John Deere 8320r Tractor Y Modelo 637 Disco Set (1:6...](https://articulo.mercadolibre.com.ar/MLA-2414668928-ertl-john-deere-8320r-tractor-y-modelo-637-disco-set-16-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&float_highlight=last_units&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7) | $89.050 | 25.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587&wid=MLA3370300548&sid=search) | $48.868 | -31.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 124. Tractor de pala grande John Deere de 21" con cargador

- ID Venturino: `281259417`
- Precio Venturino: $580.000
- Tokens: tractor, pala, grande, 21, cargador
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 82 válidos antes de top
- Candidatos excluidos por precio: 4809
- Candidatos excluidos por score: 416
- Mediana ML: $477.385
- Venturino vs mediana ML: 21.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA2735955816&sid=search) | $599.379 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, cargador; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Pala Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-pala-frontal/up/MLAU4063180058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3427874184&sid=search) | $526.699 | -9.2% | tipo: JUGUETE; tokens comunes: tractor, pala; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU4048783911#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA3427759746&sid=search) | $526.699 | -9.2% | tipo: JUGUETE; tokens comunes: tractor, cargador; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA3260069348&sid=search) | $578.990 | -0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1503458191&sid=search) | $555.586 | -4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1493524125&sid=search) | $501.990 | -13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1165962632&sid=search) | $475.779 | -18.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1462618659&sid=search) | $452.361 | -22.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1241574644&sid=search) | $420.295 | -27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1534604385&sid=search) | $399.880 | -31.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1767841826&sid=search) | $398.326 | -31.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1504753813&sid=search) | $554.343 | -4.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Tractor Ertl 1/32 John Deere 9r 590 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-132-john-deere-9r-590--a-pedidoexkarg/up/MLAU2910027843#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=38da49ae-e84a-406c-b307-958297981c66&wid=MLA1984193972&sid=search) | $652.589 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA3229211686&sid=search) | $478.990 | -17.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=5f82e9a4-a3ce-440d-a961-cb18a874e3b4&wid=MLA2510969874&sid=search) | $446.999 | -22.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1501340737&sid=search) | $439.275 | -24.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1422054560&sid=search) | $733.573 | 26.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Tractor John Deere 9r 640 A Escala 1:32 Ertl](https://www.mercadolibre.com.ar/tractor-john-deere-9r-640-a-escala-132-ertl/up/MLAU3865483443#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=5bd3e372-d889-4f59-a7db-0583bdd7dd38&wid=MLA3117507902&sid=search) | $420.000 | -27.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=cf9f2793-5ab4-4da2-8c5d-01a4e894bb8e&wid=MLA1537554751&sid=search) | $394.031 | -32.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2550302558&sid=search) | $382.954 | -34.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 125. Tractor J7R 330 John Deere Prestige

- ID Venturino: `281259428`
- Precio Venturino: $112.000
- Tokens: tractor, j7r, 330, prestige
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 143 válidos antes de top
- Candidatos excluidos por precio: 3869
- Candidatos excluidos por score: 1295
- Mediana ML: $110.703
- Venturino vs mediana ML: 1.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | 0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -19.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -21.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1835352944&sid=search) | $112.120 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3036951256&sid=search) | $110.965 | -0.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=5a16e526-351c-4824-a4d2-837d65567e87&wid=MLA2842120858&sid=search) | $110.440 | -1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=9&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $110.115 | -1.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1588597639&sid=search) | $109.806 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $114.597 | 2.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=10&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $117.564 | 5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $106.251 | -5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2588150140&sid=search) | $106.019 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA1472790549&sid=search) | $119.425 | 6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tomy John Deere Tractor Toys Set Económico Y Estuche De De 3](https://www.mercadolibre.com.ar/toy-set-john-deere-value-w-carrying-case-18-farm-toys-3/p/MLA2063188934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA2587960726&sid=search) | $119.728 | 6.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1791146511&sid=search) | $103.948 | -7.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1588501493&sid=search) | $103.717 | -7.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3090752210&sid=search) | $103.717 | -7.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2860958990&sid=search) | $120.655 | 7.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=f91bb9e1-7a46-4763-82a3-4206ab50fa30&wid=MLA2797531354&sid=search) | $121.289 | 8.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA3141293538&sid=search) | $122.099 | 9.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 126. Tractor John Deere 6210R

- ID Venturino: `281259398`
- Precio Venturino: $122.000
- Tokens: tractor, 6210r
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 155 válidos antes de top
- Candidatos excluidos por precio: 3842
- Candidatos excluidos por score: 1310
- Mediana ML: $119.110
- Venturino vs mediana ML: 2.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA3197623976&sid=search) | $112.402 | -7.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA2545404244&sid=search) | $89.980 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1980129574&sid=search) | $87.443 | -28.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ff577c59-d917-43df-a85c-10983a8f5925&wid=MLA3141293538&sid=search) | $122.099 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=f91bb9e1-7a46-4763-82a3-4206ab50fa30&wid=MLA2797531354&sid=search) | $121.289 | -0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2860958990&sid=search) | $120.655 | -1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete Tomy John Deere De Plástico Verde Para Ni](https://articulo.mercadolibre.com.ar/MLA-1556356895-tractor-de-juguete-tomy-john-deere-de-plastico-verde-para-ni-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $123.715 | 1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=10&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $117.564 | -3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Siku Tractor John Deere 7530 C/empacadora -metal](https://www.mercadolibre.com.ar/siku-tractor-john-deere-7530-cempacadora-metal/up/MLAU155441356#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&float_highlight=last_units&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1214813147&sid=search) | $126.835 | 4.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=item&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63) | $114.597 | -6.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguete Controlado Por Radio John Deere Johnny Tractor Green](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1992858294&sid=search) | $129.789 | 6.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juego De Tractores De Juguete John Deere 6410 Con Barcaza Verde](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=80003c1b-bed2-4525-96dc-51dddfb341e7&wid=MLA1752012759&sid=search) | $131.535 | 7.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3036951256&sid=search) | $110.965 | -9.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=5a16e526-351c-4824-a4d2-837d65567e87&wid=MLA2842120858&sid=search) | $110.440 | -9.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=9&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $110.115 | -9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=item&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a) | $106.251 | -12.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1791146511&sid=search) | $103.948 | -14.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor Ertl John Deere 4020 Diesel - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4020-diesel--a-pedidoexkarg/up/MLAU2966024143#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1472336879&sid=search) | $141.230 | 15.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor Musical John Deere Tomy Animal Sounds Hayride](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA3051637704&sid=search) | $142.740 | 17.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA1662281537&sid=search) | $142.864 | 17.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 127. Tractor John Deere Flashight

- ID Venturino: `281053462`
- Precio Venturino: $52.000
- Tokens: tractor, flashight
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 9
- Candidatos usados: 20 de 22 válidos antes de top
- Candidatos excluidos por precio: 4238
- Candidatos excluidos por score: 1047
- Mediana ML: $59.074
- Venturino vs mediana ML: -12.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=ccf4e3ca-bac8-433a-a1e0-575f17f41584&wid=MLA1606696085&sid=search) | $50.000 | -3.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=9c3ee3e9-b561-4814-93a8-403252e00a57&wid=MLA3307554122&sid=search) | $58.388 | 12.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-4wd-tractor-42136/p/MLA2064046096#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA3401010280&sid=search) | $62.391 | 20.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA3130984732&sid=search) | $63.735 | 22.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677885959&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=3e2cd64b-626b-4291-843e-0dd5454c8c82&wid=MLA1677937795&sid=search) | $68.990 | 32.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete John Deere Con Cargador A Escala 1/32](https://articulo.mercadolibre.com.ar/MLA-1516039103-tractor-de-juguete-john-deere-con-cargador-a-escala-132-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e) | $69.314 | 33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55232304-38b8-42f8-8e7d-88033d6dac63&wid=MLA2271017754&sid=search) | $70.767 | 36.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ae71dbc1-5542-4991-bd7c-67b1f23cd587&wid=MLA3370300548&sid=search) | $48.868 | -6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | baja | 44 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=117370fd-400a-49dd-b492-419f29867549&wid=MLA1639819361&sid=search) | $33.275 | -36.0% | tipo: JUGUETE; tokens comunes: tractor |
| 11 | baja | 42 | [Tractor Miniatura Escala 1:64 Rojo Case IH 5488 Coleccionable Metal](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=i1mFsJr80eJAygsFLY6u6tiSY2E6dU4hxYUulMXLAZrz2zHtGbgktoLpiujdpbThAhkv6D%2FxzB1b6KReAB6WzfQTAEIjj%2F%2Bi4DSxLkA0WzVbHE2vroVMFI6xPtGIpFHdKOiMMPVrGtnUq58%2B3WtkKARb7DSWWL2GOvUqPoa51Uv6TQoVNapIY6GDDVIcCk9T8pi5JZLL1EwijxZdMANhvq1bCI0%2FtDAf0Dyaao%2F9debbFsWlG4%2BwrLa45JOAfWMgFF8mgogfWHjO6OwC0IoJcr1EnpjEVI%2BKmnldt6R%2Fy8UnShbehLnK6nciOW6EnmlSzvMJlI7RgLk6R8xJ0doEhqXCyS9hpTsTBQyuS1XnjbG8n7%2Bg1TBkP0vrYxulkONpVKrCmBs4Rk7AJHnLb3M3pZz99nTK2FvwKjXTBuI4QwfGI2n1TD9QJdQoflpQbPixG2%2B60cXeb8l181Uge5lQGnGUVJrL%2BJ00e8IDtIVhwPD%2FNJWe%2B7oOoJ8Bmx5GuvRqYH5jsbNgaFsEBwqWNXPz7zZg9eo4i74FpGB4z%2FnB91%2FnHOOjQSPq5fLEYv1NaUs%2Bmlulf4%2FTrgZcoJExlBl1RrOt8SBAHokNII4uw9INlYQMgcqQ3BcEwyipSbdFMhGaYJNFKZN1TLK%2BBxvrS5%2FfaLJV2JRP%2BJUbjy6RKyhpGrBKFt2%2FHAgqR10zhZtwCpiLHKDH3%2BFVJoQjNEgEMJssw2gifo6%2FQiJqJJKeuU7Izwju0XovWX7QwtCFpH73g7sIKJ4KNKexy4%2B%2FE2Pz2ab%2FszWZbYO%2FgBdFNPoDOiAYAcS5bytR%2BwC79QbSgU5acIqCOmROVcgzWXlZclEY%2BQnl1hnUodYxHAGvwyqfYK5eN3pWidr%2BXWsNyKC9ergLC5UW1YReKDxeqfCnJBjsHpyLwERJj9btzaM9TxV7HtY4GJ8%2FdCOaBzaiQLUoB%2BYGOJ1QFCxoksn97pkyRRBUy5xABMrt9tdpchp4V3%2Fhjw9Gs%2B8pXlAcI9VspsxnRfRQ08XOwS%2BZScwdIvKgok6oKZ62KXQbc9dyypf24GuKLG2Y2weSaEd9SR0%3D&pdp_filters=item_id%3AMLA2579002200#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54418577&backend_model=fallback_productos-promocionados_reco_of_reco_supple_view_view_reco_of_reco&be_origin=backend&search_layout=grid&position=51&type=pad&tracking_id=ef583734-9ae5-46cc-83fd-b3a9f3100b6e&wid=MLA2579002200&sid=search) | $70.000 | 34.6% | tipo: JUGUETE; tokens comunes: tractor |
| 12 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=ac64c6dc-bbac-44bc-83c8-3da37b95502e&wid=MLA2792533012&sid=search) | $52.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Siku 1649 Camión Forestal John Deere Juguete Coleccionable](https://www.mercadolibre.com.ar/siku-1649-camion-forestal-john-deere-juguete-coleccionable/up/MLAU3782233912#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1670514687&sid=search) | $59.760 | 14.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d3f449d0-a741-443d-9a2b-b5d1f3719aab&wid=MLA3316369844&sid=search) | $42.000 | -19.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Ertl Collect N Play John Deere Angus Bull](https://www.mercadolibre.com.ar/ertl-collect-n-play-john-deere-angus-bull/up/MLAU4001542687#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA2168860624&sid=search) | $63.797 | 22.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&float_highlight=last_units&tracking_id=1df29566-144d-4c5d-8521-25da3ebb6d6a&wid=MLA1588571170&sid=search) | $39.775 | -23.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=7ef7058b-9221-46a4-b6e5-13a8eee770c6&wid=MLA1725054925&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1508168125&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=55e6d6d7-0151-49c8-bee6-1492c6e10baf&wid=MLA1508081573&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=25bdd6a5-4b82-4b62-abb2-985d5af617dd&wid=MLA1784433071&sid=search) | $32.990 | -36.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |

## Observaciones Para Iteración

- Revisar candidatos de baja confianza para detectar falsos positivos y nuevos sinónimos.
- Si aparecen matches por `John Deere` sin tipo de producto coincidente, bajar peso de marca o subir score mínimo.
- Si productos válidos quedan afuera por precio, ajustar banda sólo en UI; para reporte se mantiene ±40%.
- Si muchos nombres técnicos quedan sin comparable, ampliar diccionario de tipos y tokens equivalentes.
