# Análisis de Matches Postventa

Generado: 2026-06-05T16:04:14.016Z

## Parámetros

- Colección Mongo: `algorym.productos`
- Algoritmo: `postventa-v0`
- Runtime: lib/postventa/matching.ts
- Venturino activo: 2026-05-30
- ML activo: 2026-05-31
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
- Productos ML activos: 4111 únicos (4112 registros crudos)
- Venturino con precio: 127
- ML con precio: 4111

## Resumen De La Muestra

- sin comparable: 58
- Venturino más barato que ML: 8
- Venturino más caro que ML: 22
- similar a ML: 33
- baja confianza: 6

Confianza de candidatos usados:
- alta: 16
- media: 547
- baja: 235

## Muestra Y Candidatos

### 1. Aceite de Motor Premium John Deere Plus-50™ II. John Deere

- ID Venturino: `318717662`
- Precio Venturino: $238.000
- Tokens: aceite, motor, premium, plus-50, ii
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3391
- Candidatos excluidos por score: 720
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 2. Generador Honda EZ3000CX – 3 KVA

- ID Venturino: `332862512`
- Precio Venturino: $1.165.943
- Tokens: generador, honda, ez3000cx, 3, kva
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4025
- Candidatos excluidos por score: 86
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 3. Soplador Honda HHB25-ET1 – 25

- ID Venturino: `332865249`
- Precio Venturino: $825.087
- Tokens: soplador, honda, hhb25-et1, 25
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3953
- Candidatos excluidos por score: 158
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 4. Tractor John Deere 8R para cultivos en hileras

- ID Venturino: `281259424`
- Precio Venturino: $71.000
- Tokens: tractor, 8r, cultivo, hilera
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 48 válidos antes de top
- Candidatos excluidos por precio: 3151
- Candidatos excluidos por score: 912
- Mediana ML: $82.832
- Venturino vs mediana ML: -14.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 70 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1&wid=MLA3370300548&sid=search) | $48.062 | -32.3% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | 21.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | 26.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | 33.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2169077264&sid=search) | $74.053 | 4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | -11.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | 15.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=156eece7-bae3-4ba8-a8a7-f4b6b87aed62&wid=MLA3078939230&sid=search) | $84.861 | 19.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | 27.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA3214114070&sid=search) | $95.000 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | 35.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2588150140&sid=search) | $98.632 | 38.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Juego De Sábanas John Deere Tractor Tamaño Individual Beige Background With Green Tractors Tractor Print (john Deere)](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=c16aa449-915e-4e26-b668-5db9b6624f46&wid=MLA3188096720&sid=search) | $69.858 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 5. Aceite de Motor John Deere Torq-Gard™ II. John Deere

- ID Venturino: `318727927`
- Precio Venturino: $175.000
- Tokens: aceite, motor, torq-gard, ii
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3125
- Candidatos excluidos por score: 986
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 6. Jarro Chalten Verde John Deere

- ID Venturino: `338234315`
- Precio Venturino: $21.000
- Tokens: jarro, chalten, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3347
- Candidatos excluidos por score: 763
- Mediana ML: $13.000
- Venturino vs mediana ML: 61.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 54 | [Taza John Deere](https://www.mercadolibre.com.ar/taza-john-deere/up/MLAU3887253058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=309f3a28-1a16-4173-acd8-3432a0c03528&wid=MLA3145837242&sid=search) | $13.000 | -38.1% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |

### 7. Motoguadaña Honda UMK450 – 47.9 cc

- ID Venturino: `332864442`
- Precio Venturino: $916.914
- Tokens: motoguadana, honda, umk450, 47.9, cc
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3963
- Candidatos excluidos por score: 148
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 8. Tractor Johny John Deere a control remoto

- ID Venturino: `281053479`
- Precio Venturino: $145.000
- Tokens: tractor, johny, control, remoto
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 161 válidos antes de top
- Candidatos excluidos por precio: 2998
- Candidatos excluidos por score: 952
- Mediana ML: $144.823
- Venturino vs mediana ML: 0.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 65 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2588174074&sid=search) | $105.593 | -27.2% | tipo: JUGUETE; tokens comunes: tractor, control, remoto; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1498485099&sid=search) | $150.000 | 3.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | -15.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | -34.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor 1:64 John Deere 8rx 410 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8rx-410--a-pedidoexkarg/up/MLAU159998621#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1376655339&sid=search) | $145.546 | 0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3263270113#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA2149326968&sid=search) | $144.099 | -0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1688853331&sid=search) | $144.095 | -0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1557066483&sid=search) | $142.598 | -1.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Ertl John Deere 4020 Diesel - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-4020-diesel--a-pedidoexkarg/up/MLAU2966024143#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1472336879&sid=search) | $141.230 | -2.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Juguete Tractor John Deere 8420 + Enfardadora 568 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-8420--enfardadora-568-a-escala/up/MLAU3180535879#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086420252&sid=search) | $150.000 | 3.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Ertl Tractor John Deere 8760 1:64 Prestige](https://www.mercadolibre.com.ar/ertl-tractor-john-deere-8760-164-prestige/up/MLAU3572491218#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1585558467&sid=search) | $155.000 | 6.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete John Deere 2640 Field Of Dreams Lp](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-2640-field-of-dreams-lp/p/MLA2053419470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2597542598&sid=search) | $156.422 | 7.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere 7270r De Juguete Con Rotoempacadora 560r](https://articulo.mercadolibre.com.ar/MLA-3022278842-tractor-john-deere-7270r-de-juguete-con-rotoempacadora-560r-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $156.756 | 8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere 7260r 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7260r-164--a-pedidoexkarg/up/MLAU3005755665#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA2012178172&sid=search) | $157.576 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Ertl John Deere 6410 Juego De Juguetes Para Tractores Escala](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2587960888&sid=search) | $132.360 | -8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor Cortacésped John Deere Toy Bruder Bworld Con Remolqu](https://www.mercadolibre.com.ar/toy-bruder-bworld-john-deere-lawn-tractor-w-trailer-garde/p/MLA2057234803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2142602962&sid=search) | $159.021 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Tomy John Deere Flarebox Set 8](https://www.mercadolibre.com.ar/john-deere-kids-tractor-wagon-set-8-inch-toy-tractors-f/p/MLA2063245972#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3051721004&sid=search) | $159.887 | 10.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Juguete De Construcción John Deere Tractor Con Taladro 16 Ve](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16-ve/up/MLAU3890909392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA1736581317&sid=search) | $160.354 | 10.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 9. Batería John Deere StrongBox™ 12 V 110 Ah. John Deere

- ID Venturino: `318732486`
- Precio Venturino: $560.000
- Tokens: bateria, strongbox, 12, v, 110, ah
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3816
- Candidatos excluidos por score: 294
- Mediana ML: $310.573
- Venturino vs mediana ML: 80.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 73 | [Bateria Willard Ub920i 12x110 John Deere Vial Tractores](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=FMTXBjNK%2FXJz7iS%2F1MJSHtx7z5uXngRG9ZTJu16b5FNwEpcL6cjvfn3DvEPn1Sq5d28B5biVGke%2FCPTEdgLrjxgG5TsIRUj8ce3yQlR5AoX3edTyVLehygKKZM8Q4aI5vOfEH%2FrXyzuu7fvkAChVOkTShhBwvJaA9qJ70DBRQEiCYR8BEVy5FfHUPbjlu43VPKZFGfZevjZHtbnia%2BY07c1bPSeidXXu04PXWefhoxeEOdafiBtPt2DLMc045KO0gzuWoJiEAIE65Mb5H02SiSLy3pEjzTbXEurIvZHQRHFkKFNIztIwm7xhZsF1N2U%2Fdsp4qUl5M7btwgklVIQoy3jOPhAAqC910mKM2vOAzk8LVs8SPa4O83braZN4Ru2Xe5SswOPq59TX97X7F%2FaS9yjN%2FFHSbvQpeRXeSFB0d1EexAWaMoSRhw3Hqw3WCERxmo6VVjsKgKRmFdQH4%2Fx5%2FR11zyJG9oXNrKXBtkkzeXYdtR3dqMBnLhIBzcxvrHRYSpXjqqyscKW%2F99V0XunDnuBd9RoAvRdTMVRAq%2Bh6PZwlzYTva40topLW%2FsPklN2IOffVH%2BxYpYnxibV33jfax2ZN7em2%2BaQy0ObivCcaEkZDBR9maHDrEKWYTC53bnaHkQasNsEyuAVzwshFN6G2abt2W574%2BqlsTBGkmQCbGnNuJiq43qj9aiOKMBUxhzBmula60dYJD9Nimp70YcG8SanU6J%2FpSjijwNwm9Ofp0%2FK4AWLxyqUdrynaj6Cei10YZPtgTamB1b0H%2BTSDB%2Fun0Bu9Y1H93ltXC4PmfJBXURCLcI0fdY1qavMXCn93Ra6rQkUO54BZKjjN4KCbuPAz1GSuoSB6VwPKHqGA73xIP1xvTlS5T50DIlbEk5C9hsFEeRYlGBZHhDx748jLm7bMBAJy3BxhVPNWZ3t9tzzWKyzZ0HZvxIvMSeA7bQFvZrWgJyXmtE8MODppyDlJ4tn2XDwTe4klSYsPYUt4HGJBlZA%2FiCywVwCddghCPv8j&pdp_filters=item_id%3AMLA869234580#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU296922540&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=deb70988-7e86-4221-987e-5b57e366835f&wid=MLA869234580&sid=search) | $310.573 | -44.5% | tipo: BATERIA; capacidad batería: 110Ah; tokens comunes: bateria; compatibilidad/marca: John Deere |

### 10. Juego de tubos SAE ¼” John Deere Set de 21 piezas

- ID Venturino: `276679543`
- Precio Venturino: $149.000
- Tokens: juego, tubo, sae, set, 21, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 7
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 3016
- Candidatos excluidos por score: 1084
- Mediana ML: $114.799
- Venturino vs mediana ML: 29.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1807348547&sid=search) | $120.000 | -19.5% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 2 | media | 57 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1721056741&sid=search) | $99.590 | -33.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 3 | media | 56 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1510545543&sid=search) | $135.583 | -9.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo, pieza |
| 4 | media | 56 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&float_highlight=last_units&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA922576085&sid=search) | $111.000 | -25.5% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA3323710072&sid=search) | $118.999 | -20.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 6 | media | 49 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2491947770&sid=search) | $94.512 | -36.6% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego; compatibilidad/marca: John Deere |
| 7 | media | 48 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3126102700&sid=search) | $194.218 | 30.3% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza; compatibilidad/marca: John Deere |
| 8 | baja | 43 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA2308233004&sid=search) | $114.799 | -23.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |
| 9 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1562325653&sid=search) | $131.905 | -11.5% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |
| 10 | baja | 42 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1448971691&sid=search) | $110.268 | -26.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |
| 11 | baja | 41 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1946973092&sid=search) | $110.268 | -26.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |

### 11. Tractor con empacadora, vagón y 12 pacas de heno John Deere

- ID Venturino: `281234465`
- Precio Venturino: $400.000
- Tokens: tractor, empacadora, vagon, 12, paca, heno
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 115 válidos antes de top
- Candidatos excluidos por precio: 3729
- Candidatos excluidos por score: 267
- Mediana ML: $396.179
- Venturino vs mediana ML: 1.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2550302558&sid=search) | $376.638 | -5.8% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor De Juguete John Deere 730 Con Vagón Barcaza A Escala](https://www.mercadolibre.com.ar/toy-john-deere-730-tractor-with-barge-wagon-116-scale/p/MLA2081533429#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3380937872&sid=search) | $254.993 | -36.3% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 3 | media | 54 | [John Deere Juguete Tractor 6410 A Escala 1:32 Con Vagon Y Rastras De Discos Marca Ertl](https://www.mercadolibre.com.ar/john-deere-juguete-tractor-6410-a-escala-132-con-vagon-y-rastras-de-discos-marca-ertl/p/MLA32426451#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=&sid=search) | $250.000 | -37.5% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Vehículo De Juguete Tomy Tractor Grande Y Empacadora John De](https://www.mercadolibre.com.ar/toy-vehicle-tomy-john-deere-big-farm-tractor-baler/p/MLA2072057141#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3119043586&sid=search) | $277.033 | -30.7% | tipo: JUGUETE; tokens comunes: tractor, empacadora |
| 5 | media | 49 | [Empacadora John Deere De Coleccion Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/empacadora-john-deere-de-coleccion-bruder--a-pedidoexkarg/up/MLAU149484839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1144752768&sid=search) | $412.660 | 3.2% | tipo: JUGUETE; tokens comunes: empacadora; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Vagón De Tren John Deere Escala O Lionel](https://www.mercadolibre.com.ar/vagon-de-tren-john-deere-escala-o-lionel/up/MLAU3915674437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA3233211424&sid=search) | $481.099 | 20.3% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Empacadora Redonda Siku 2465 John Deere 990 Para Jugar Y Col](https://www.mercadolibre.com.ar/empacadora-redonda-siku-2465-john-deere-990-para-jugar-y-col/up/MLAU3868917828#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1720803179&sid=search) | $393.999 | -1.5% | tipo: JUGUETE; tokens comunes: empacadora; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Set De Triciclo Y Vagón John Deere Para Niños A Partir De 18](https://www.mercadolibre.com.ar/tricycle-and-wagon-set-john-deere-for-kids-18-months/p/MLA2064510072#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1561940567&sid=search) | $414.455 | 3.6% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1138213292&sid=search) | $373.467 | -6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2510969874&sid=search) | $438.999 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1501340737&sid=search) | $439.275 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1503208905&sid=search) | $332.996 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 12. Aditivo Mejorador de Combustible John Deere

- ID Venturino: `318861703`
- Precio Venturino: $172.000
- Tokens: aditivo, mejorador, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3099
- Candidatos excluidos por score: 1012
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 13. Tractor Johnny para armar John Deere

- ID Venturino: `281259378`
- Precio Venturino: $42.000
- Tokens: tractor, johnny, armar
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 13 de 13 válidos antes de top
- Candidatos excluidos por precio: 3221
- Candidatos excluidos por score: 877
- Mediana ML: $39.980
- Venturino vs mediana ML: 5.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 52 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1639819361&sid=search) | $33.275 | -20.8% | tipo: JUGUETE; tokens comunes: tractor, armar |
| 2 | media | 51 | [Tractor De Juguete John Deere Erlt](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-erlt/up/MLAU3327338120#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2202515476&sid=search) | $29.980 | -28.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1606696085&sid=search) | $50.000 | 19.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguete Tractor Tipo Caricatura John Deere Ertl](https://www.mercadolibre.com.ar/juguete-tractor-tipo-caricatura-john-deere-ertl/up/MLAU262732766#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1476364034&sid=search) | $28.990 | -31.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1&wid=MLA3370300548&sid=search) | $48.062 | 14.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA3316369844&sid=search) | $42.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1508081573&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1508168125&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1784433071&sid=search) | $32.990 | -21.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2792533012&sid=search) | $52.000 | 23.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Juguete Cosechador Lego Technic John Deere 1470h Para Mayore](https://www.mercadolibre.com.ar/lego-technic-john-deere-1470h-cosechadora-42218/p/MLA2064409630#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1688882031&sid=search) | $58.656 | 39.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 35 | [Trailer A Escala Acoplado Jaula Siku Aleman](https://www.mercadolibre.com.ar/trailer-a-escala-acoplado-jaula-siku-aleman/up/MLAU3633336756#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2600993544&sid=search) | $39.980 | -4.8% | tipo: JUGUETE |
| 13 | baja | 35 | [Arado A Escala 3d Farming Simulator](https://www.mercadolibre.com.ar/arado-a-escala-3d-farming-simulator/up/MLAU148754321#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129754952&sid=search) | $50.000 | 19.0% | tipo: JUGUETE |

### 14. Seccion de corte, cuchilla de draper John Deere

- ID Venturino: `318735588`
- Precio Venturino: $9.300
- Tokens: seccion, corte, cuchilla, draper
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3684
- Candidatos excluidos por score: 427
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
- Candidatos excluidos por precio: 4103
- Candidatos excluidos por score: 8
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 16. Aceite Hidráulico Hy‑Gard 20 Lts. John Deere

- ID Venturino: `318712612`
- Precio Venturino: $189.000
- Tokens: aceite, hidraulico, hy-gard, 20, l
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3179
- Candidatos excluidos por score: 932
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 17. Anticongelante Cool‑Gard. John Deere 10LTS

- ID Venturino: `318854338`
- Precio Venturino: $97.000
- Tokens: anticongelante, cool-gard, 10lt
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3040
- Candidatos excluidos por score: 1071
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
- Candidatos excluidos por precio: 3261
- Candidatos excluidos por score: 850
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
- Candidatos excluidos por precio: 3924
- Candidatos excluidos por score: 187
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
- Candidatos excluidos por precio: 3257
- Candidatos excluidos por score: 854
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
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2961
- Candidatos excluidos por score: 1150
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 22. Botella Atuel Blanca John Deere

- ID Venturino: `276163111`
- Precio Venturino: $56.000
- Tokens: botella, atuel, blanca
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3262
- Candidatos excluidos por score: 847
- Mediana ML: $57.053
- Venturino vs mediana ML: -1.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=10&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.707 | -0.5% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=9&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $58.398 | 4.3% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 23. Botella Hydro 750ML John Deere

- ID Venturino: `338229330`
- Precio Venturino: $45.000
- Tokens: botella, hydro, 750ml
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3301
- Candidatos excluidos por score: 808
- Mediana ML: $57.053
- Venturino vs mediana ML: -21.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=10&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.707 | 23.8% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=9&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $58.398 | 29.8% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 24. Botella Kun blanca John Deere

- ID Venturino: `276163980`
- Precio Venturino: $58.000
- Tokens: botella, kun, blanca
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3210
- Candidatos excluidos por score: 899
- Mediana ML: $57.053
- Venturino vs mediana ML: 1.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=9&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $58.398 | 0.7% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=10&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.707 | -4.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 25. Botella Kun negra John Deere

- ID Venturino: `276163436`
- Precio Venturino: $58.000
- Tokens: botella, kun, negra
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3210
- Candidatos excluidos por score: 899
- Mediana ML: $57.053
- Venturino vs mediana ML: 1.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=9&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $58.398 | 0.7% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=10&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.707 | -4.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 26. Botella termica Olympia John Deere

- ID Venturino: `276164231`
- Precio Venturino: $68.000
- Tokens: botella, termica, olympia
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3173
- Candidatos excluidos por score: 936
- Mediana ML: $57.053
- Venturino vs mediana ML: 19.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-2689660750-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=188178144638#polycard_client=search-desktop&be_origin=backend&searchVariation=188178144638&search_layout=grid&position=9&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $58.398 | -14.1% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=10&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.707 | -18.1% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 27. Caja de herramientas John Deere de acero

- ID Venturino: `276171332`
- Precio Venturino: $140.000
- Tokens: caja, herramienta, acero
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 2986
- Candidatos excluidos por score: 1123
- Mediana ML: $112.902
- Venturino vs mediana ML: 24.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 61 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3242261346&sid=search) | $139.438 | -0.4% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |
| 2 | media | 59 | [Caja De Herramientas De Lujo John Deere De 18 Piezas,...](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2033573986#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1978680112&sid=search) | $86.365 | -38.3% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |

### 28. Caja de herramientas John Deere verde con bandeja amarilla

- ID Venturino: `276169417`
- Precio Venturino: $183.000
- Tokens: caja, herramienta, verde, bandeja, amarilla
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3151
- Candidatos excluidos por score: 959
- Mediana ML: $139.438
- Venturino vs mediana ML: 31.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 58 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3242261346&sid=search) | $139.438 | -23.8% | tipo: CAJA_HERRAMIENTAS; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |

### 29. Camión Volcador John Deere Big Scoop Dump Truck

- ID Venturino: `281259393`
- Precio Venturino: $130.000
- Tokens: camion, volcador, big, scoop, dump, truck
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 16
- Candidatos usados: 20 de 161 válidos antes de top
- Candidatos excluidos por precio: 2937
- Candidatos excluidos por score: 1013
- Mediana ML: $125.520
- Venturino vs mediana ML: 3.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/tomy-john-deere-sandbox-big-scoop-excavadora-de-juguete-con/up/MLAU4031048978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3384748312&sid=search) | $123.605 | -4.9% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 2 | media | 56 | [John Deere Build A Buddy Green Dump Truck Toy Lp](https://www.mercadolibre.com.ar/john-deere-build-a-buddy-green-dump-truck-toy-lp/up/MLAU3986738139#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1536008371&sid=search) | $123.149 | -5.3% | tipo: JUGUETE; tokens comunes: dump, truck; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2596748172&sid=search) | $110.868 | -14.7% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 4 | media | 55 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1556138081&sid=search) | $107.098 | -17.6% | tipo: JUGUETE; tokens comunes: dump, truck; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2170188784&sid=search) | $116.020 | -10.8% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA3004486122&sid=search) | $159.796 | 22.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3339182498&sid=search) | $90.865 | -30.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Tractor Monster Truck John Deere De Juguete Con Luces Y Soni](https://www.mercadolibre.com.ar/toy-john-deere-monster-truck-tractor-w-lights-sounds/p/MLA2039435135#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2142655686&sid=search) | $127.435 | -2.0% | tipo: JUGUETE; tokens comunes: truck; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3269069622#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2149534314&sid=search) | $139.199 | 7.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3036951256&sid=search) | $109.135 | -16.1% | tipo: JUGUETE; tokens comunes: volcador; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Réplica De Camión Semirremolque Grain Escala 1:64 John Deere](https://articulo.mercadolibre.com.ar/MLA-2535939168-replica-de-camion-semirremolque-grain-escala-164-john-deere-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=item&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f) | $103.237 | -20.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | -26.0% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Ertl John Deere Grain Semi Truck Toy Replica Escala 1:64 De](https://www.mercadolibre.com.ar/ertl-john-deere-grain-semi-truck-toy-replica-164-scale/p/MLA2063214672#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2587960862&sid=search) | $91.427 | -29.7% | tipo: JUGUETE; tokens comunes: truck; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3154241320&sid=search) | $172.306 | 32.5% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1774875161&sid=search) | $177.443 | 36.5% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1462714353&sid=search) | $180.998 | 39.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | baja | 42 | [Set De Juguetes, Tractores, Camiones Tomy, 20 Pzs, De Granja](https://www.mercadolibre.com.ar/toy-set-john-deere-tractor-and-truck-w-20-farm-toys-5-year/p/MLA2040633234#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3254753964&sid=search) | $136.571 | 5.1% | tipo: JUGUETE; tokens comunes: camion |
| 18 | baja | 42 | [Ertl 1/32 Camión Vintage & Tractor](https://www.mercadolibre.com.ar/ertl-132-camion-vintage--tractor/up/MLAU2798551609#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA1461113825&sid=search) | $140.000 | 7.7% | tipo: JUGUETE; tokens comunes: camion |
| 19 | baja | 41 | [John Deere 8600 Spfh 1/64 Escala Con Cabezal De Maíz](https://www.mercadolibre.com.ar/john-deere-8600-spfh-164-escala-con-cabezal-de-maiz/up/MLAU3263326141#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1507784499&sid=search) | $130.399 | 0.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Ertl Prestige Collection Réplica De John Deere 843l-ii 1:50](https://www.mercadolibre.com.ar/farm-toy-john-deere-prestige-collection-feller-buncher-150/p/MLA2059115172#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1588489533&sid=search) | $129.533 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 30. Camión volquete Big Scoop John Deere

- ID Venturino: `281259433`
- Precio Venturino: $148.000
- Tokens: camion, volquete, big, scoop
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 15
- Candidatos usados: 20 de 160 válidos antes de top
- Candidatos excluidos por precio: 3003
- Candidatos excluidos por score: 948
- Mediana ML: $139.600
- Venturino vs mediana ML: 6.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/tomy-john-deere-sandbox-big-scoop-excavadora-de-juguete-con/up/MLAU4031048978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3384748312&sid=search) | $123.605 | -16.5% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Tomy John Deere Sandbox Big Scoop Excavadora De Juguete Con](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2596748172&sid=search) | $110.868 | -25.1% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Volquete De Juguete Build-a-buddy John Deere Con Taladro De](https://www.mercadolibre.com.ar/tools-toolsets-toys-games-build-a-buddy-47508-no-aplica-u/p/MLA2062346156#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA2161674562&sid=search) | $116.568 | -21.2% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2170188784&sid=search) | $116.020 | -21.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3269069622#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2149534314&sid=search) | $139.199 | -5.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA3004486122&sid=search) | $159.796 | 8.0% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Volquete De Juguete John Deere Steel 16 Con Luces Y Sonidos](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-steel-16-w-lights-sounds-kids-3/p/MLA2078353280#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1729359979&sid=search) | $168.810 | 14.1% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3154241320&sid=search) | $172.306 | 16.4% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Réplica De Camión Semirremolque Grain Escala 1:64 John Deere](https://articulo.mercadolibre.com.ar/MLA-2535939168-replica-de-camion-semirremolque-grain-escala-164-john-deere-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=item&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f) | $103.237 | -30.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | -35.0% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Escala John Deere 320e Skid Steer Con Camión](https://www.mercadolibre.com.ar/john-deere-scale-320e-skid-steer-con-camion/p/MLA2069344031#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2370117548&sid=search) | $200.000 | 35.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3339182498&sid=search) | $90.865 | -38.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2362783516&sid=search) | $90.105 | -39.1% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1774875161&sid=search) | $177.443 | 19.9% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1462714353&sid=search) | $180.998 | 22.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 16 | baja | 43 | [Ertl 1/32 Camión Vintage & Tractor](https://www.mercadolibre.com.ar/ertl-132-camion-vintage--tractor/up/MLAU2798551609#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA1461113825&sid=search) | $140.000 | -5.4% | tipo: JUGUETE; tokens comunes: camion |
| 17 | baja | 42 | [Set De Juguetes, Tractores, Camiones Tomy, 20 Pzs, De Granja](https://www.mercadolibre.com.ar/toy-set-john-deere-tractor-and-truck-w-20-farm-toys-5-year/p/MLA2040633234#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3254753964&sid=search) | $136.571 | -7.7% | tipo: JUGUETE; tokens comunes: camion |
| 18 | baja | 41 | [Juguete John Deere 1/64 Cp770 Cosechador Algodón Lp82816](https://www.mercadolibre.com.ar/juguete-john-deere-164-cp770-cosechador-algodon-lp82816/up/MLAU3986975849#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA3347732102&sid=search) | $147.864 | -0.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Regador De Tanque John Deere 876v 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/regador-de-tanque-john-deere-876v-164--a-pedidoexkarg/up/MLAU2927589938#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1988293942&sid=search) | $147.574 | -0.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1498485099&sid=search) | $150.000 | 1.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 31. Camioneta y tractor John Deere

- ID Venturino: `281234460`
- Precio Venturino: $300.000
- Tokens: camioneta, tractor
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 129 válidos antes de top
- Candidatos excluidos por precio: 3607
- Candidatos excluidos por score: 375
- Mediana ML: $268.074
- Venturino vs mediana ML: 11.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1514896991&sid=search) | $293.399 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1507969023&sid=search) | $288.367 | -3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784581058&sid=search) | $270.242 | -9.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1417510473&sid=search) | $332.793 | 10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1949945520&sid=search) | $265.905 | -11.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete John Deere 730 Con Vagón Barcaza A Escala](https://www.mercadolibre.com.ar/toy-john-deere-730-tractor-with-barge-wagon-116-scale/p/MLA2081533429#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3380937872&sid=search) | $254.993 | -15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1970561562&sid=search) | $247.506 | -17.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1571921115&sid=search) | $245.000 | -18.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor 1/64 John Deere 8400 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8400--a-pedidoexkarg/up/MLAU2670938419#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1949431358&sid=search) | $238.267 | -20.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA2138660238&sid=search) | $230.189 | -23.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tomy John Deere Johnny Tractor Ride-on: Juguete Infantil](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2174427890&sid=search) | $221.006 | -26.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1713564907&sid=search) | $217.905 | -27.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1767841826&sid=search) | $398.326 | 32.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1534604385&sid=search) | $399.880 | 33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1950555252&sid=search) | $198.353 | -33.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2194899840&sid=search) | $187.899 | -37.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1782656432&sid=search) | $291.302 | -2.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1763349785&sid=search) | $312.737 | 4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Juego De Juguetes Tractor John Deere 6210r Big Farm 1/16 Con](https://www.mercadolibre.com.ar/john-deere-tomy-big-deere-116-6210r-tractor-with-loader/p/MLA2073774277#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1708197997&sid=search) | $284.177 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1949971056&sid=search) | $323.265 | 7.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 32. Cargador de tierra John Deere

- ID Venturino: `281259415`
- Precio Venturino: $3.568.000
- Tokens: cargador, tierra
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 4092
- Candidatos excluidos por score: 17
- Mediana ML: $2.328.385
- Venturino vs mediana ML: 53.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 41 | [Tractor 1/16 John Deere Ertl 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-ertl-9rx-830--a-pedidoexkarg/up/MLAU3696393908#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA2705182936&sid=search) | $2.458.770 | -31.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Tractor De Pedal John Deere 46394 Para Niños Grandes, Juguet](https://www.mercadolibre.com.ar/tractor-de-pedal-john-deere-46394-para-ninos-grandes-juguet/up/MLAU3939985528#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1771065005&sid=search) | $2.198.000 | -38.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 33. Cincel plano John Deere de corte en frío 10mm

- ID Venturino: `276196688`
- Precio Venturino: $17.000
- Tokens: cincel, plano, corte, frio, 10mm
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3306
- Candidatos excluidos por score: 805
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
- Candidatos excluidos por precio: 3216
- Candidatos excluidos por score: 895
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
- Candidatos excluidos por precio: 3371
- Candidatos excluidos por score: 740
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
- Candidatos excluidos por precio: 4097
- Candidatos excluidos por score: 14
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 37. Cortadora de Césped Honda HRG466SKEP – 4.2 HP

- ID Venturino: `332868795`
- Precio Venturino: $1.866.924
- Tokens: cortadora, cesped, honda, hrg466skep, 4.2, hp
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4066
- Candidatos excluidos por score: 45
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 38. Cortadora de Césped Honda HRX476VYEH – 4.8 HP

- ID Venturino: `332865987`
- Precio Venturino: $3.281.116
- Tokens: cortadora, cesped, honda, hrx476vyeh, 4.8, hp
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4093
- Candidatos excluidos por score: 18
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 39. Cosechadora con Duals John Deere X9 1100

- ID Venturino: `281259430`
- Precio Venturino: $258.000
- Tokens: cosechadora, dual, x9, 1100
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 13
- Candidatos usados: 20 de 141 válidos antes de top
- Candidatos excluidos por precio: 3485
- Candidatos excluidos por score: 485
- Mediana ML: $257.016
- Venturino vs mediana ML: 0.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 93 | [Cosechadora miniatura John Deere X9 1100 1/64 Ertl](https://www.mercadolibre.com.ar/cosechadora-miniatura-john-deere-x9-1100-164-ertl/p/MLA21742050#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2806898370&sid=search) | $250.000 | -3.1% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 2 | alta | 92 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1911294048&sid=search) | $265.120 | 2.8% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 3 | alta | 70 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1447751815&sid=search) | $263.348 | 2.1% | tipo: JUGUETE; tokens técnicos: x9; tokens comunes: cosechadora, x9; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Cosechadora Juguete John Deere 9610 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-john-deere-9610--a-pedidoexkarg/up/MLAU381583702#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1794644744&sid=search) | $254.491 | -1.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Cosechadora Juguete Caña John Deere 2023 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-cana-john-deere-2023--a-pedidoexkarg/up/MLAU345520548#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1716821474&sid=search) | $264.878 | 2.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Cosechadora Ertl John Deere 1:64 7720 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-john-deere-164-7720--a-pedidoexkarg/up/MLAU3622286639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2597394962&sid=search) | $220.880 | -14.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Cosechadora 1/64 John Deere Model S7 900_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-model-s7-900exkarg/up/MLAU3421966953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2363760294&sid=search) | $303.550 | 17.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Cosechadora 1/64 John Deere S680 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s680--a-pedidoexkarg/up/MLAU3211473392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2095857690&sid=search) | $305.134 | 18.3% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Cosechadora 1/64 John Deere S780 Tracked - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s780-tracked--a-pedidoexkarg/up/MLAU3211445872#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA2095728162&sid=search) | $317.339 | 23.0% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Juguete Cosechadora John Deere S780 Con Camión Freightliner](https://www.mercadolibre.com.ar/toy-john-deere-s780-combine-w-freightliner-lowboy-trailer/p/MLA2061396612#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA3004486122&sid=search) | $159.796 | -38.1% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Cosechadora miniatura de granos y maíz verde John Deere S780 1:64](https://www.mercadolibre.com.ar/cosechadora-miniatura-de-granos-y-maiz-verde-john-deere-s780-164/p/MLA54400721#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&float_highlight=last_unit&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2579195550&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Cosechadora miniatura John Deere S680 Prestige 1/64, color verde](https://www.mercadolibre.com.ar/cosechadora-miniatura-john-deere-s680-prestige-164-color-verde/p/MLA61519873#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2579058396&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Siku Camion + Cosechadora John Deere Serie 1851 Escala 1:87](https://www.mercadolibre.com.ar/siku-camion--cosechadora-john-deere-serie-1851-escala-187/up/MLAU3881142255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA3159287736&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1141825591&sid=search) | $258.952 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1584365843&sid=search) | $258.990 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1583656447&sid=search) | $259.000 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1950447406&sid=search) | $260.245 | 0.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1782744664&sid=search) | $255.079 | -1.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Tractor De Juguete John Deere 730 Con Vagón Barcaza A Escala](https://www.mercadolibre.com.ar/toy-john-deere-730-tractor-with-barge-wagon-116-scale/p/MLA2081533429#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3380937872&sid=search) | $254.993 | -1.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Juego De Juguetes John Deere 7290r Con Peterbilt Modelo 579](https://www.mercadolibre.com.ar/toy-set-john-deere-7290r-with-peterbilt-model-579/p/MLA2073862118#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3008568328&sid=search) | $254.127 | -1.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 40. Cosechadora con orugas S780 John Deere

- ID Venturino: `281222483`
- Precio Venturino: $1.100.000
- Tokens: cosechadora, oruga, s780
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 20 de 22 válidos antes de top
- Candidatos excluidos por precio: 4014
- Candidatos excluidos por score: 75
- Mediana ML: $855.223
- Venturino vs mediana ML: 28.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-ertl-116-s690--a-pedidoexkarg/up/MLAU3405181522#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA2316244096&sid=search) | $1.366.734 | 24.2% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Cosechadora Bruder John Deere T670i 1/16 Escala Detalle](https://www.mercadolibre.com.ar/cosechadora-bruder-john-deere-t670i-116-escala-detalle/up/MLAU3709741640#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2735955818&sid=search) | $801.919 | -27.1% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tractor De Coleccion John Deere Ertl 8rx - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-ertl-8rx--a-pedidoexkarg/up/MLAU148472123#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1139042452&sid=search) | $1.146.516 | 4.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Tractor 2024 Ertl 1:16 John Deere 8850 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2024-ertl-116-john-deere-8850--a-pedidoexkarg/up/MLAU3512484909#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1566725471&sid=search) | $1.190.050 | 8.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Lego 42157 Technic Skidder John Deere Bunny Toys](https://www.mercadolibre.com.ar/lego-42157-technic-skidder-john-deere-bunny-toys/up/MLAU127418845#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA1422484952&sid=search) | $1.199.999 | 9.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tractor Ertl 1/16 John Deere 4440 High Cro - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-116-john-deere-4440-high-cro--a-pedidoexkarg/up/MLAU232697105#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1370428787&sid=search) | $956.901 | -13.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor John Deere Ertl 1/16 620 With 555 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-620-with-555--a-pedidoexkarg/up/MLAU3404496394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1519688549&sid=search) | $922.938 | -16.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tractor Ertl John Deere 1/16 Precision Waterloo - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-116-precision-waterloo--a-pedido/up/MLAU3913388889#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1762009919&sid=search) | $900.020 | -18.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor De Juguete John Deere 1/16 Colección Prestigio](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-116-coleccion-prestigio/up/MLAU3887620554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1734903333&sid=search) | $895.299 | -18.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor John Deere 53 Cm Big Scoop Para Niños](https://www.mercadolibre.com.ar/tractor-john-deere-53-cm-big-scoop-para-ninos/up/MLAU3215165316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA3337726446&sid=search) | $1.379.615 | 25.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Botas Men's Skechers X John Deere Wtrpf Rowood - A Pedido](https://www.mercadolibre.com.ar/botas-mens-skechers-x-john-deere-wtrpf-rowood--a-pedido/up/MLAU4009919970#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=2b045a29-f58a-4735-92ce-50f356c39bc7&wid=MLA1802307541&sid=search) | $799.880 | -27.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Plantadora De Juguete John Deere 1:64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-164--a-pedidoexkarg/up/MLAU216527677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1138239021&sid=search) | $768.366 | -30.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Pulverizador Autopropulsado Tomy Big Farm John Deere R4023 A](https://www.mercadolibre.com.ar/pulverizador-autopropulsado-tomy-big-farm-john-deere-r4023-a/up/MLAU3557087173#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA1582480007&sid=search) | $766.057 | -30.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Tractor John Deere Ertl 1/16 9r 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-9r-640--a-pedidoexkarg/up/MLAU3056769388#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1480847539&sid=search) | $1.448.971 | 31.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Camión De Carga Ancha Tomy John Deere Big Farm A Escala 116](https://www.mercadolibre.com.ar/camion-de-carga-ancha-tomy-john-deere-big-farm-a-escala-116/up/MLAU3564484178#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2568887568&sid=search) | $748.120 | -32.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1422054560&sid=search) | $733.573 | -33.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Plantadora De Juguete John Deere 48 Filas - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-48-filas--a-pedidoexkarg/up/MLAU151239803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1146832296&sid=search) | $705.810 | -35.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Camión Semi John Deere Big Farm De Tomy Con Plataforma De Ca](https://www.mercadolibre.com.ar/camion-semi-john-deere-big-farm-de-tomy-con-plataforma-de-ca/up/MLAU3556794925#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1582475319&sid=search) | $678.999 | -38.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Embaladora De Coleccion John Deere Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/embaladora-de-coleccion-john-deere-bruder---a-pedidoexkarg/up/MLAU252406879#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1248654054&sid=search) | $667.487 | -39.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 35 | [Tractor De Juguete Con Carro Cerealero Verde Y Amarillo](https://www.mercadolibre.com.ar/tractor-de-juguete-con-carro-cerealero-verde-y-amarillo/up/MLAU3636789908#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2604933544&sid=search) | $815.147 | -25.9% | tipo: JUGUETE |

### 41. Cuchillo de mano John Dere

- ID Venturino: `276681820`
- Precio Venturino: $34.000
- Tokens: cuchillo, mano, dere
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3260
- Candidatos excluidos por score: 851
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
- Candidatos usados: 18 de 18 válidos antes de top
- Candidatos excluidos por precio: 3519
- Candidatos excluidos por score: 574
- Mediana ML: $223.538
- Venturino vs mediana ML: 19.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 64 | [Filtro De Combustible John Deere Re525523 Agrícola](https://www.mercadolibre.com.ar/filtro-de-combustible-john-deere-re525523-agricola/up/MLAU3710310947#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=db12aa1e-3855-4972-9e40-317a234aed60&wid=MLA2764132958&sid=search) | $334.999 | 25.5% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 2 | baja | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere S550](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-s550/up/MLAU2039237397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a&wid=MLA1929743570&sid=search) | $283.897 | 6.3% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere 9570](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-9570/up/MLAU2030480381#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=6854b174-9ae7-411b-8ea3-8970ad30dfcf&wid=MLA1453989409&sid=search) | $285.000 | 6.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 4 | baja | 59 | [Filtro Combustible Donaldson P576918 Eqv. John Deere Re60021](https://www.mercadolibre.com.ar/filtro-combustible-donaldson-p576918-eqv-john-deere-re60021/up/MLAU250437733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=e248b7f9-d3af-4b01-8439-3811f2360ee9&wid=MLA1124362080&sid=search) | $201.000 | -24.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 5 | baja | 52 | [Filtro Hidraulico At129775 John Deere](https://www.mercadolibre.com.ar/filtro-hidraulico-at129775-john-deere/up/MLAU3532524648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=7111c70a-5c35-4137-848c-97b676b9c32a&wid=MLA1571324655&sid=search) | $371.215 | 39.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 6 | baja | 51 | [Filtro Hidráulico John Deere Re45864 - Agrícola](https://www.mercadolibre.com.ar/filtro-hidraulico-john-deere-re45864--agricola/up/MLAU3700145760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=deb70988-7e86-4221-987e-5b57e366835f&wid=MLA2711956876&sid=search) | $225.000 | -15.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 7 | baja | 51 | [Filtro Secundario Para Cosechadoras John Deere Ah212295](https://www.mercadolibre.com.ar/filtro-secundario-para-cosechadoras-john-deere-ah212295/up/MLAU2956350677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1995411330&sid=search) | $172.445 | -35.4% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 8 | baja | 50 | [Filtro Hidráulico Donaldson P574617 Eq. John Deere At308274](https://www.mercadolibre.com.ar/filtro-hidraulico-donaldson-p574617-eq-john-deere-at308274/up/MLAU309430473#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=b7a6b067-808f-4f1e-8671-5a62b83ffd6d&wid=MLA926567545&sid=search) | $278.900 | 4.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 9 | baja | 50 | [Filtro Aire Para John Deere 5090e Al119839 Al172780 Cp33300](https://www.mercadolibre.com.ar/filtro-aire-para-john-deere-5090e-al119839-al172780-cp33300/up/MLAU2901850439#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=daae5ed4-273c-40a5-ad8a-1e95af0ba022&wid=MLA1467193781&sid=search) | $227.599 | -14.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 10 | baja | 50 | [Filtro De Aire Compatible Con John Deere Komatsu Cat](https://www.mercadolibre.com.ar/filtro-de-aire-compatible-con-john-deere-komatsu-cat/up/MLAU4038685394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=deb70988-7e86-4221-987e-5b57e366835f&wid=MLA1810324197&sid=search) | $222.076 | -16.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 11 | baja | 50 | [Filtro Aire Mann C19450 John Deere Linde](https://www.mercadolibre.com.ar/filtro-aire-mann-c19450-john-deere-linde/up/MLAU259983411#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7111c70a-5c35-4137-848c-97b676b9c32a&wid=MLA685759359&sid=search) | $197.500 | -26.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 12 | baja | 50 | [Filtro Aire Primario Para John Deere Linde New Holland](https://www.mercadolibre.com.ar/filtro-aire-primario-para-john-deere-linde-new-holland/up/MLAU2956372295#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=e248b7f9-d3af-4b01-8439-3811f2360ee9&wid=MLA1995599532&sid=search) | $172.138 | -35.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 13 | baja | 49 | [Filtro Aire New Holland John Deere Varios Wix Wa10108](https://www.mercadolibre.com.ar/filtro-aire-new-holland-john-deere-varios-wix-wa10108/up/MLAU3885689643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=24041863-6367-4ee6-94e0-82983e4dcb7e&wid=MLA3167840324&sid=search) | $284.936 | 6.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 14 | baja | 49 | [Filtro De Aire P/ John Deere 5090e Al119839 Al172780 Cp33300](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=86Krq8jGFX4nG9M5NkWrwajaxx%2FgVB4xz9p52n%2FkyvYyyMyg86VDMNmOewB8TPLQWigzagZOeBSHAswpJwbTElx47OzY%2FBRHt%2BwMf5Q21WjyrPiPCuDh%2Fl2lqKYGQInUhM65SqgSqCXkOQV2NDUFiUYU2L7Q%2Fw%2BwTGgLyOPr13G3zkdsvEFxrdt%2FFoEhZ3uiv1wGC6UnY6MqRrGAUQCCS%2FKTW48g8D9wVuyU5sg5LUZIqnjyR41mVrZeUIhHWK8ZO%2BTWZX%2F5tZ15kIRkJNsqIdSjbEnOOdgwAmcGWW5zcjWEi6X3EZQ8vcaDXKoA7HoEetM81D5XRm5nyU63VKRpYAqLEeF7aXfTrtJrnDE7dswmaeNil8S9BC1kjJ1ZK9K79Jtw2HsDhk5IhbDqnIR1vcA%2BjT1yI4zrUipK098O2cdcaT0l1%2FsRqPul0rkffurPGEdeLU%2B%2FegqiVb2mwH6Bxk3oEQIkKqRwu1hBvdk8he5dZ3Ukhy%2FhBIWYI6iscjlhIhL5SEnSVX2RC%2FX3leYVx8KuGe0K4Ps8eSunJGsCh86fMlPq%2Bd%2BnrHksxMqtgc1tkLrysD0Tw970PqcMkdfhCF1m9ilLgNFCcFK%2FgrEXEB%2BqsOcSfjBdUbpAZrL1jd4DuHy5poAeNbvBHwJktPOu8r2mbqOMa4691Rr%2FUdBnhokJieS80ucpqW%2BrgGzTifGorYfYvs9QY2%2Fe9bprgZ%2FcvuXGTv85iKCnTKIn3qyW%2BkKoG8GprcLjP%2FL2Vljf3BP7hoz9IQUh1gzWETPdjPAN04hyVhMBvf9ahv2AcTzJia8Ts4O3yie46uy03J437bKoSVR9GvZyE6EsPLyXWe1xtV5CPiWYJdh8lpXWf3qRqG6QOZ2A3r3QlplgPkkzkWegoQvAYKIaFKsTQyTu1pCDa38sn2WO9O3xL8SVKq5HnCojLHMDJKKvnmPIFUB%2FU2WKW%2BAY%2BgDkPFZkoX8XzukJf7oMWSpL1viw91HaGeUxBtBn%2B%2BC%2FeLvtoBhrQIUbIHHqfmWIhw%3D%3D&pdp_filters=item_id%3AMLA1676561966#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU322599192&backend_model=search-backend&be_origin=backend&search_layout=grid&position=15&type=pad&tracking_id=62102d66-ebc1-4965-9588-810a1cd08260&wid=MLA1676561966&sid=search) | $209.325 | -21.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 15 | baja | 49 | [Filtro Aire Primario Donaldson P130763 Eq John Deere At33363](https://www.mercadolibre.com.ar/filtro-aire-primario-donaldson-p130763-eq-john-deere-at33363/up/MLAU224794556#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=7111c70a-5c35-4137-848c-97b676b9c32a&wid=MLA1190264605&sid=search) | $166.300 | -37.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 16 | baja | 48 | [Kit De Filtros Donaldson Aire Primario Y Secundario P609221 P608599 Equivalentes A Mann C15011 Cf10002 John Deere 318d](https://www.mercadolibre.com.ar/kit-de-filtros-donaldson-aire-primario-y-secundario-p609221-p608599-equivalentes-a-mann-c15011-cf10002-john-deere-318d/up/MLAU284536772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=7111c70a-5c35-4137-848c-97b676b9c32a&wid=MLA810909651&sid=search) | $238.600 | -10.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 17 | baja | 44 | [Carburador Con Filtro De Aire Para Tractor Cortacésped](https://www.mercadolibre.com.ar/carburador-con-filtro-de-aire-para-tractor-cortacesped/up/MLAU3708598646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=40e80e4c-d7c5-4164-a363-3daeaabd48a6&wid=MLA2732733080&sid=search) | $210.720 | -21.1% | tipo: FILTRO; tokens comunes: filtro |
| 18 | baja | 44 | [Carburador Con Filtro De Aire Para Tractor Cortacésped](https://www.mercadolibre.com.ar/carburador-con-filtro-de-aire-para-tractor-cortacesped/p/MLA2077525413#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=3bc856ec-888b-4200-b09c-6646382738bf&wid=MLA3198373156&sid=search) | $208.618 | -21.9% | tipo: FILTRO; tokens comunes: filtro |

### 43. Generador Honda EZ6500CXS – 6.5 KVA

- ID Venturino: `332863753`
- Precio Venturino: $2.655.680
- Tokens: generador, honda, ez6500cx, 6.5, kva
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4087
- Candidatos excluidos por score: 24
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 44. Gorra Davis Beige John Deere Bordada.

- ID Venturino: `276120852`
- Precio Venturino: $35.000
- Tokens: gorra, davi, beige, bordada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 72 válidos antes de top
- Candidatos excluidos por precio: 3257
- Candidatos excluidos por score: 782
- Mediana ML: $24.707
- Venturino vs mediana ML: 41.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra De Béisbol John Deere](https://articulo.mercadolibre.com.ar/MLA-1795430349-gorra-de-beisbol-john-deere-_JM?searchVariation=195028438006#polycard_client=search-desktop&be_origin=backend&searchVariation=195028438006&search_layout=grid&position=8&type=item&tracking_id=d7c28c6f-acf0-4ce8-908f-f2dc5016264d) | $21.112 | -39.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=3d1ea735-0c48-4303-94be-d477046ca1ca&wid=MLA1552253565&sid=search) | $33.600 | -4.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA935804894&sid=search) | $32.499 | -7.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=145c1649-0e09-4f1d-a772-a2c18015a6c7&wid=MLA2592139810&sid=search) | $30.000 | -14.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=45&type=item&tracking_id=b3d12ad6-f8a3-439f-91ad-b43ae82ea679) | $29.943 | -14.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=19&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $29.943 | -14.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=12&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $29.943 | -14.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4015557802#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=2bb929c3-9cf4-49cf-a5fa-18f8ba7288c1&wid=MLA1803785175&sid=search) | $26.751 | -23.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-3272626526-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=201372857441#polycard_client=search-desktop&be_origin=backend&searchVariation=201372857441&search_layout=grid&position=8&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $26.356 | -24.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Gorra John Deere Original Plana Cerrada](https://www.mercadolibre.com.ar/gorra-john-deere-original-plana-cerrada/up/MLAU3741746550#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=d7c28c6f-acf0-4ce8-908f-f2dc5016264d&wid=MLA1648398397&sid=search) | $25.000 | -28.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Gorra De Béisbol Ajustable Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-1527135007-gorra-de-beisbol-ajustable-estampada-de-john-deere-_JM?searchVariation=185266346716#polycard_client=search-desktop&be_origin=backend&searchVariation=185266346716&search_layout=grid&position=37&type=item&tracking_id=3d1ea735-0c48-4303-94be-d477046ca1ca) | $24.775 | -29.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=50&type=item&tracking_id=f109d670-9f56-479c-80f7-64619d65d095) | $24.639 | -29.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Gorra De Béisbol Ajustable Con El Logotipo De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533425-gorra-de-beisbol-ajustable-con-el-logotipo-de-john-deere-_JM?searchVariation=200631683569#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683569&search_layout=grid&position=21&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $24.639 | -29.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Gorra De Béisbol De Golf Con Estampado John Deere](https://articulo.mercadolibre.com.ar/MLA-1527181163-gorra-de-beisbol-de-golf-con-estampado-john-deere-_JM?searchVariation=185267041194#polycard_client=search-desktop&be_origin=backend&searchVariation=185267041194&search_layout=grid&position=39&type=item&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658) | $23.195 | -33.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Gorra Trucker John Deere Moline Ill](https://www.mercadolibre.com.ar/gorra-trucker-john-deere-moline-ill/up/MLAU3340462054#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=0f0b3369-56bd-4b1e-8665-3a4fe3107186&wid=MLA2211751914&sid=search) | $23.000 | -34.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Gorra De Béisbol Ajustable John Deere Para Hombre](https://articulo.mercadolibre.com.ar/MLA-3220556590-gorra-de-beisbol-ajustable-john-deere-para-hombre-_JM?searchVariation=200645721473#polycard_client=search-desktop&be_origin=backend&searchVariation=200645721473&search_layout=grid&position=34&type=item&tracking_id=3d1ea735-0c48-4303-94be-d477046ca1ca) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533471-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631683731#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683731&search_layout=grid&position=37&type=item&tracking_id=e4098e0e-d792-4edb-a6e7-b3082b46a1bb) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3218909500-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631638827#polycard_client=search-desktop&be_origin=backend&searchVariation=200631638827&search_layout=grid&position=40&type=item&tracking_id=d7c28c6f-acf0-4ce8-908f-f2dc5016264d) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3307378094-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=201785411741#polycard_client=search-desktop&be_origin=backend&searchVariation=201785411741&search_layout=grid&position=25&type=item&tracking_id=b3d12ad6-f8a3-439f-91ad-b43ae82ea679) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-1757678053-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=200597625461#polycard_client=search-desktop&be_origin=backend&searchVariation=200597625461&search_layout=grid&position=25&type=item&tracking_id=6ad6cefe-f318-4b3a-b55b-144fe65fdd3f) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 45. Gorro John Deere Santa Fe Mesh Bordado

- ID Venturino: `276119628`
- Precio Venturino: $37.000
- Tokens: gorra, santa, fe, mesh, bordado
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 54 válidos antes de top
- Candidatos excluidos por precio: 3255
- Candidatos excluidos por score: 802
- Mediana ML: $29.943
- Venturino vs mediana ML: 23.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=3d1ea735-0c48-4303-94be-d477046ca1ca&wid=MLA1552253565&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA935804894&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=145c1649-0e09-4f1d-a772-a2c18015a6c7&wid=MLA2592139810&sid=search) | $30.000 | -18.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra De Béisbol Ajustable John Deere](https://articulo.mercadolibre.com.ar/MLA-3364318564-gorra-de-beisbol-ajustable-john-deere-_JM?searchVariation=202574984531#polycard_client=search-desktop&be_origin=backend&searchVariation=202574984531&search_layout=grid&position=5&type=item&tracking_id=2b045a29-f58a-4735-92ce-50f356c39bc7) | $22.845 | -38.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol Ajustable John Deere](https://articulo.mercadolibre.com.ar/MLA-3370676578-gorra-de-beisbol-ajustable-john-deere-_JM?searchVariation=202694942917#polycard_client=search-desktop&be_origin=backend&searchVariation=202694942917&search_layout=grid&position=48&type=item&tracking_id=f109d670-9f56-479c-80f7-64619d65d095) | $22.845 | -38.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Béisbol Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3370306346-gorra-de-beisbol-con-estampado-de-john-deere-_JM?searchVariation=202690501093#polycard_client=search-desktop&be_origin=backend&searchVariation=202690501093&search_layout=grid&position=44&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $22.845 | -38.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Béisbol Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1802439691-gorra-de-beisbol-con-estampado-de-john-deere-_JM?searchVariation=202674845495#polycard_client=search-desktop&be_origin=backend&searchVariation=202674845495&search_layout=grid&position=21&type=item&tracking_id=2bb929c3-9cf4-49cf-a5fa-18f8ba7288c1) | $22.845 | -38.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658&wid=MLA2424514130&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&float_highlight=last_units&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2029398978&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658&wid=MLA1186238943&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658&wid=MLA778736698&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1796681861-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=202400919821#polycard_client=search-desktop&be_origin=backend&searchVariation=202400919821&search_layout=grid&position=19&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $32.238 | -12.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=e4098e0e-d792-4edb-a6e7-b3082b46a1bb&wid=MLA2992080562&sid=search) | $31.000 | -16.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=45&type=item&tracking_id=b3d12ad6-f8a3-439f-91ad-b43ae82ea679) | $29.943 | -19.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=19&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $29.943 | -19.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=12&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $29.943 | -19.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4015557802#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=2bb929c3-9cf4-49cf-a5fa-18f8ba7288c1&wid=MLA1803785175&sid=search) | $26.751 | -27.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=32&type=item&tracking_id=2bb929c3-9cf4-49cf-a5fa-18f8ba7288c1) | $26.371 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-3272626526-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=201372857441#polycard_client=search-desktop&be_origin=backend&searchVariation=201372857441&search_layout=grid&position=8&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $26.356 | -28.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Gorra John Deere Original Plana Cerrada](https://www.mercadolibre.com.ar/gorra-john-deere-original-plana-cerrada/up/MLAU3741746550#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=d7c28c6f-acf0-4ce8-908f-f2dc5016264d&wid=MLA1648398397&sid=search) | $25.000 | -32.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 46. Gorro Tiger Verde John Deere

- ID Venturino: `338230395`
- Precio Venturino: $42.000
- Tokens: gorra, tiger, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 15
- Candidatos usados: 20 de 21 válidos antes de top
- Candidatos excluidos por precio: 3221
- Candidatos excluidos por score: 869
- Mediana ML: $29.972
- Venturino vs mediana ML: 40.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=3d1ea735-0c48-4303-94be-d477046ca1ca&wid=MLA1552253565&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA935804894&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=145c1649-0e09-4f1d-a772-a2c18015a6c7&wid=MLA2592139810&sid=search) | $30.000 | -28.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658&wid=MLA2424514130&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658&wid=MLA1186238943&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1796681861-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=202400919821#polycard_client=search-desktop&be_origin=backend&searchVariation=202400919821&search_layout=grid&position=19&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $32.238 | -23.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=45&type=item&tracking_id=b3d12ad6-f8a3-439f-91ad-b43ae82ea679) | $29.943 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=19&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $29.943 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=12&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $29.943 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Aa Gorra Ajustable Estampada John Deere](https://www.mercadolibre.com.ar/aa-gorra-ajustable-estampada-john-deere/up/MLAU4015557802#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=2bb929c3-9cf4-49cf-a5fa-18f8ba7288c1&wid=MLA1803785175&sid=search) | $26.751 | -36.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-3272626526-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=201372857441#polycard_client=search-desktop&be_origin=backend&searchVariation=201372857441&search_layout=grid&position=8&type=item&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1) | $26.356 | -37.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&float_highlight=last_units&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2029398978&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_units&tracking_id=f5033259-87f9-4b6a-889d-0fe76f22b658&wid=MLA778736698&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=e4098e0e-d792-4edb-a6e7-b3082b46a1bb&wid=MLA2992080562&sid=search) | $31.000 | -26.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=32&type=item&tracking_id=2bb929c3-9cf4-49cf-a5fa-18f8ba7288c1) | $26.371 | -37.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | baja | 43 | [Q Gorro Piluso - Bucket Hat - Marcas Y Logos - Varios](https://articulo.mercadolibre.com.ar/MLA-3090371472-q-gorro-piluso-bucket-hat-marcas-y-logos-varios-_JM?searchVariation=198880199671#polycard_client=search-desktop&be_origin=backend&searchVariation=198880199671&search_layout=grid&position=12&type=item&tracking_id=f109d670-9f56-479c-80f7-64619d65d095) | $26.691 | -36.4% | tipo: GORRA; tokens comunes: gorra |
| 17 | baja | 43 | [Q Gorro Piluso - Bucket Hat - Marcas Y Logos - Varios](https://articulo.mercadolibre.com.ar/MLA-1682056055-q-gorro-piluso-bucket-hat-marcas-y-logos-varios-_JM?searchVariation=190601273594#polycard_client=search-desktop&be_origin=backend&searchVariation=190601273594&search_layout=grid&position=41&type=item&tracking_id=f109d670-9f56-479c-80f7-64619d65d095) | $26.599 | -36.7% | tipo: GORRA; tokens comunes: gorra |
| 18 | baja | 43 | [Trucker Hat 235-john Deere Gorra De Cuadrillo,washed Denim,](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=xaWu8ZLe5SGf88tK1jO8sv5N8FX%2FhwqYSpiNKHplkSur1CGxKXEnMZUXtwo7FiF3KrgF7rRf%2Bd2Ngh07JdUZeQ9UavOjRlFDElX0eVkus4Xnf3oGw1did5nvH3x7bTeVrNzywn5RK2py%2F5Kxqxy%2Bzf30ru%2FjM2zatM2827jLMGp88%2BezTv4wY223WtgpMe%2F4daSQyUKzdbFDx2wrFwpaDRL7awRM8rRPC%2BfzZChvBnh3dVVpSQVOlQfnU2MXzMWoT3m5Rqy6EC%2BK3tmZeWVGz8kkQDKktqGs8UU6xWWl1JOUiFoDuyXULBZPK8sQ4JUofHoxuc51lDyPKG9JEGQ%2FTUutIcgUxKwDE0PcBVsHrvtGBt3eEJDbDS68hu%2BxA5ya2A1dy7PDq%2BDlbPkEtzrcK1%2ByA9Q9n%2BrMGn3WY2Ck0WeQIRE1oHUGV9hLxMH7ppxihrC%2BOqMHD3GCU4TrFuBib%2FD7%2FlUAEhxrzs9BWGB2JmyLLesIwSf98GsEJFsJjqNziJGph3TPFZnBlmNh7DVakiRQEw2mE6je3FRYKM476pXartqalKAjL%2FvaALus7zNrFPAWhup%2Fysb%2BC83T%2FV5SWZLEqIZYadSAG4IjAnHKZf4WrvP4PcpXqHgI3OcOEA0K9AsTHva04Cio7meHV85WHgLcz5yppPVkZDyrrvv6SBLUCsJsOfELmZJddTEbDkNfOAsA4ndaVckhfIC4XVTpcNFJzza3Po5RSSR2OTaalAGBu1amByTQUYNtbGTHEKSb88JwJn%2F0%2B%2BtsYgdjG0o%2B67AX8Ji7Y5cUnBhpHoipVDZe5MaFNhwgFBjs18K0HtescFGbozP24yEklIKQcx%2F1t0TQWa0lclChyM7Zcy3%2FFDP%2FT6HzZv2gjYPeETEFnCCtDAUPts5s1Lk%2ByxmrG14WmnA69hB3eQ5wn%2F3DTHNz%2FZ5cJcPE26PzZ%2Fc7jzktRaxLFi2iS9zVrlfWz18JKwyF%2B5v9nrmIZmumRu68wdp%2FBcrN&searchVariation=195271888236&pdp_filters=item_id%3AMLA1801061499#polycard_client=search-desktop&is_advertising=true&searchVariation=195271888236&backend_model=search-backend&be_origin=backend&search_layout=grid&position=3&type=pad&tracking_id=3d1ea735-0c48-4303-94be-d477046ca1ca) | $26.371 | -37.2% | tipo: GORRA; tokens comunes: gorra |
| 19 | baja | 43 | [Descuento Gorra De Béisbol Ajustable Estampada De John Wm](https://articulo.mercadolibre.com.ar/MLA-1743443271-descuento-gorra-de-beisbol-ajustable-estampada-de-john-wm-_JM?searchVariation=200036717305#polycard_client=search-desktop&be_origin=backend&searchVariation=200036717305&search_layout=grid&position=37&type=item&tracking_id=145c1649-0e09-4f1d-a772-a2c18015a6c7) | $25.627 | -39.0% | tipo: GORRA; tokens comunes: gorra |
| 20 | baja | 41 | [Combo Gorra Y Remera John Deere](https://articulo.mercadolibre.com.ar/MLA-1440821747-combo-gorra-y-remera-john-deere-_JM?searchVariation=184049237203#polycard_client=search-desktop&be_origin=backend&searchVariation=184049237203&search_layout=grid&position=26&type=item&tracking_id=2b045a29-f58a-4735-92ce-50f356c39bc7) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 47. Herramienta de recogida magnética John Deere

- ID Venturino: `276194794`
- Precio Venturino: $20.000
- Tokens: herramienta, recogida, magnetica
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3391
- Candidatos excluidos por score: 718
- Mediana ML: $19.695
- Venturino vs mediana ML: 1.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 41 | [Palancas Apertura Ventana Cabina John Deere Sg2](https://www.mercadolibre.com.ar/palancas-apertura-ventana-cabina-john-deere-sg2/up/MLAU319169472#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=6ec69507-a4cd-4275-b713-3ac16864e3ac&wid=MLA1409671591&sid=search) | $23.076 | 15.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Palanca Acelerador John Deere Mini Tractor](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-mini-tractor/up/MLAU317170387#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1670269286&sid=search) | $16.314 | -18.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 48. Inyector Electrónico de Combustible. John Deere

- ID Venturino: `318857262`
- Precio Venturino: $4.446.600
- Tokens: inyector, electronico, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4098
- Candidatos excluidos por score: 13
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 49. Jarro Bayo John Deere

- ID Venturino: `338232089`
- Precio Venturino: $31.000
- Tokens: jarro, bayo
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3258
- Candidatos excluidos por score: 852
- Mediana ML: $31.448
- Venturino vs mediana ML: -1.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Sa Taza Nueva De Equipo Agrícola John Deere Par](https://articulo.mercadolibre.com.ar/MLA-1709685031-sa-taza-nueva-de-equipo-agricola-john-deere-par-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $31.448 | 1.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |

### 50. Jarro Daten térmico John Deere

- ID Venturino: `276164724`
- Precio Venturino: $62.000
- Tokens: jarro, daten, termico
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 3257
- Candidatos excluidos por score: 849
- Mediana ML: $73.081
- Venturino vs mediana ML: -15.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [2026 Taza Nueva De Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-1648898465-2026-taza-nueva-de-equipo-agricola-john-deere-_JM?searchVariation=189510862730#polycard_client=search-desktop&be_origin=backend&searchVariation=189510862730&search_layout=grid&position=6&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $58.808 | -5.1% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-3054273498-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=198392778053#polycard_client=search-desktop&be_origin=backend&searchVariation=198392778053&search_layout=grid&position=24&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.692 | -10.2% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | media | 48 | [M Cornell Importers 6979 John Deere Iron Horse Diner Taza, Verde.](https://www.mercadolibre.com.ar/m-cornell-importers-6979-john-deere-iron-horse-diner-taza/p/MLA2035440973#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=6db00a3b-687e-4324-b8da-d3779850b856&wid=MLA1979568322&sid=search) | $80.073 | 29.1% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 4 | baja | 43 | [Taza De Café De Gres Militar Naval De La Marina](https://www.mercadolibre.com.ar/taza-de-cafe-de-gres-militar-naval-de-la-marina/up/MLAU3998320255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c232696a-f9a5-4e06-8f36-05cff055ac2a&wid=MLA1467289851&sid=search) | $82.717 | 33.4% | tipo: JARRO; tokens comunes: jarro |
| 5 | baja | 42 | [M Cornell Importers 6977 Power Diner Taza, 1 De Diciembre](https://www.mercadolibre.com.ar/m-cornell-importers-6977-power-diner-taza-1-de-diciembre/up/MLAU3999206893#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=c232696a-f9a5-4e06-8f36-05cff055ac2a&wid=MLA1466070283&sid=search) | $73.081 | 17.9% | tipo: JARRO; tokens comunes: jarro |

### 51. Jarro Road Blanco/Negro John Deere

- ID Venturino: `276165042`
- Precio Venturino: $39.000
- Tokens: jarro, road, blanco, negro
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3250
- Candidatos excluidos por score: 860
- Mediana ML: $31.448
- Venturino vs mediana ML: 24.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Sa Taza Nueva De Equipo Agrícola John Deere Par](https://articulo.mercadolibre.com.ar/MLA-1709685031-sa-taza-nueva-de-equipo-agricola-john-deere-par-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $31.448 | -19.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |

### 52. Jarro Titan gris claro John Deere

- ID Venturino: `338236578`
- Precio Venturino: $61.000
- Tokens: jarro, titan, gris, claro
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 3266
- Candidatos excluidos por score: 840
- Mediana ML: $73.081
- Venturino vs mediana ML: -16.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Taza Nueva Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-3054273498-taza-nueva-equipo-agricola-john-deere-_JM?searchVariation=198392778053#polycard_client=search-desktop&be_origin=backend&searchVariation=198392778053&search_layout=grid&position=24&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $55.692 | -8.7% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 2 | media | 49 | [2026 Taza Nueva De Equipo Agrícola John Deere](https://articulo.mercadolibre.com.ar/MLA-1648898465-2026-taza-nueva-de-equipo-agricola-john-deere-_JM?searchVariation=189510862730#polycard_client=search-desktop&be_origin=backend&searchVariation=189510862730&search_layout=grid&position=6&type=item&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f) | $58.808 | -3.6% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 3 | media | 48 | [M Cornell Importers 6979 John Deere Iron Horse Diner Taza, Verde.](https://www.mercadolibre.com.ar/m-cornell-importers-6979-john-deere-iron-horse-diner-taza/p/MLA2035440973#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=6db00a3b-687e-4324-b8da-d3779850b856&wid=MLA1979568322&sid=search) | $80.073 | 31.3% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |
| 4 | baja | 43 | [Taza De Café De Gres Militar Naval De La Marina](https://www.mercadolibre.com.ar/taza-de-cafe-de-gres-militar-naval-de-la-marina/up/MLAU3998320255#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=c232696a-f9a5-4e06-8f36-05cff055ac2a&wid=MLA1467289851&sid=search) | $82.717 | 35.6% | tipo: JARRO; tokens comunes: jarro |
| 5 | baja | 42 | [M Cornell Importers 6977 Power Diner Taza, 1 De Diciembre](https://www.mercadolibre.com.ar/m-cornell-importers-6977-power-diner-taza-1-de-diciembre/up/MLAU3999206893#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=c232696a-f9a5-4e06-8f36-05cff055ac2a&wid=MLA1466070283&sid=search) | $73.081 | 19.8% | tipo: JARRO; tokens comunes: jarro |

### 53. Jarro Zeit negro John Deere

- ID Venturino: `276162223`
- Precio Venturino: $29.000
- Tokens: jarro, zeit, negro
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3216
- Candidatos excluidos por score: 894
- Mediana ML: $31.448
- Venturino vs mediana ML: -7.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Sa Taza Nueva De Equipo Agrícola John Deere Par](https://articulo.mercadolibre.com.ar/MLA-1709685031-sa-taza-nueva-de-equipo-agricola-john-deere-par-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $31.448 | 8.4% | tipo: JARRO; tokens comunes: jarro; compatibilidad/marca: John Deere |

### 54. Juego de ganchos John Deere 4 piezas

- ID Venturino: `276681817`
- Precio Venturino: $97.000
- Tokens: juego, gancho, 4, pieza
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 3040
- Candidatos excluidos por score: 1068
- Mediana ML: $62.523
- Venturino vs mediana ML: 55.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=2c427bd6-77e0-4011-a14d-996e27d52c48&wid=MLA1399126385&sid=search) | $93.489 | -3.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | -36.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 3 | baja | 22 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA3168357158&sid=search) | $62.523 | -35.5% | tipo: HERRAMIENTA; penalización tipo adicional candidato: MATE, BOLSO; tokens comunes: pieza |

### 55. Juego de herramientas SAE y Métricos de ¼” John Deere

- ID Venturino: `276196679`
- Precio Venturino: $282.000
- Tokens: juego, herramienta, sae, metrico
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 3557
- Candidatos excluidos por score: 549
- Mediana ML: $223.999
- Venturino vs mediana ML: 25.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=3fa4f6c5-c90a-48c5-b984-de0b179070fc&wid=MLA1399304181&sid=search) | $260.000 | -7.8% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3126102700&sid=search) | $194.218 | -31.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 3 | baja | 43 | [Set De Herramientas Stardom 218 Piezas Maletín Profesional](https://www.mercadolibre.com.ar/set-de-herramientas-stardom-218-piezas-maletin-profesional/up/MLAU3982921993#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA3360168322&sid=search) | $220.000 | -22.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: herramienta |
| 4 | baja | 42 | [Juego Llaves Tubo Crique 121 Pzs Mecanica Profesional](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-121-pzs-mecanica-profesional/up/MLAU3962621953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA3323733620&sid=search) | $223.999 | -20.6% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 5 | baja | 42 | [Juego De Tubos Enc 3/4 De 21 Pz C/ Maletin Wembley 0180](https://www.mercadolibre.com.ar/juego-de-tubos-enc-34-de-21-pz--c-maletin-wembley-0180/up/MLAU152264621#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1154134844&sid=search) | $360.030 | 27.7% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |

### 56. Juego de llaves Métricas John Deere Set de 7 piezas

- ID Venturino: `276679540`
- Precio Venturino: $200.000
- Tokens: juego, llave, metrica, set, 7, pieza
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 6
- Candidatos usados: 7 de 7 válidos antes de top
- Candidatos excluidos por precio: 3222
- Candidatos excluidos por score: 882
- Mediana ML: $194.218
- Venturino vs mediana ML: 3.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1807348547&sid=search) | $120.000 | -40.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, llave, pieza |
| 2 | media | 56 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3126102700&sid=search) | $194.218 | -2.9% | tipo: KIT_HERRAMIENTAS; tokens comunes: 7, pieza; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=3fa4f6c5-c90a-48c5-b984-de0b179070fc&wid=MLA1399304181&sid=search) | $260.000 | 30.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1510545543&sid=search) | $135.583 | -32.2% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, llave, pieza |
| 5 | media | 50 | [Set De Herramientas Stardom 218 Piezas Maletín Profesional](https://www.mercadolibre.com.ar/set-de-herramientas-stardom-218-piezas-maletin-profesional/up/MLAU3982921993#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA3360168322&sid=search) | $220.000 | 10.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: set, pieza |
| 6 | media | 49 | [Juego Llaves Tubo Crique 121 Pzs Mecanica Profesional](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-121-pzs-mecanica-profesional/up/MLAU3962621953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA3323733620&sid=search) | $223.999 | 12.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, llave |
| 7 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1562325653&sid=search) | $131.905 | -34.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: pieza |

### 57. Juego de transporte Farmin Friends John Deere

- ID Venturino: `281259377`
- Precio Venturino: $260.000
- Tokens: juego, transporte, farmin, friend
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 20 de 140 válidos antes de top
- Candidatos excluidos por precio: 3496
- Candidatos excluidos por score: 475
- Mediana ML: $258.995
- Venturino vs mediana ML: 0.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Juego De Juguetes John Deere 7290r Con Peterbilt Modelo 579](https://www.mercadolibre.com.ar/toy-set-john-deere-7290r-with-peterbilt-model-579/p/MLA2073862118#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3008568328&sid=search) | $254.127 | -2.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 48 | [Juego De Juguetes Tractor John Deere 6210r Big Farm 1/16 Con](https://www.mercadolibre.com.ar/john-deere-tomy-big-deere-116-6210r-tractor-with-loader/p/MLA2073774277#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1708197997&sid=search) | $284.177 | 9.3% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 48 | [Tomy John Deere Granja 1:32 Escala Juego Infantil Incluye](https://www.mercadolibre.com.ar/tomy-john-deere-granja-132-escala-juego-infantil-incluye/up/MLAU4003254084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1510834105&sid=search) | $174.251 | -33.0% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1950447406&sid=search) | $260.245 | 0.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1583656447&sid=search) | $259.000 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1584365843&sid=search) | $258.990 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1141825591&sid=search) | $258.952 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Maqueta John Deere 843l-ii 1:50 Colección Prestige](https://www.mercadolibre.com.ar/maqueta-john-deere-843lii-150-coleccion-prestige/up/MLAU3876133382#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3117350930&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Réplica John Deere Pala Trituradora 1:50 Colección](https://www.mercadolibre.com.ar/replica-john-deere-pala-trituradora-150-coleccion/up/MLAU3876131784#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1725969655&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1447751815&sid=search) | $263.348 | 1.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Cosechadora Juguete Caña John Deere 2023 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-cana-john-deere-2023--a-pedidoexkarg/up/MLAU345520548#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1716821474&sid=search) | $264.878 | 1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1782744664&sid=search) | $255.079 | -1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Tractor De Juguete John Deere 730 Con Vagón Barcaza A Escala](https://www.mercadolibre.com.ar/toy-john-deere-730-tractor-with-barge-wagon-116-scale/p/MLA2081533429#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3380937872&sid=search) | $254.993 | -1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1911294048&sid=search) | $265.120 | 2.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Cosechadora Juguete John Deere 9610 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-juguete-john-deere-9610--a-pedidoexkarg/up/MLAU381583702#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1794644744&sid=search) | $254.491 | -2.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1949945520&sid=search) | $265.905 | 2.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1476358051&sid=search) | $269.326 | 3.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Cosechadora miniatura John Deere X9 1100 1/64 Ertl](https://www.mercadolibre.com.ar/cosechadora-miniatura-john-deere-x9-1100-164-ertl/p/MLA21742050#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2806898370&sid=search) | $250.000 | -3.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [John Deere Juguete Tractor 6410 A Escala 1:32 Con Vagon Y Rastras De Discos Marca Ertl](https://www.mercadolibre.com.ar/john-deere-juguete-tractor-6410-a-escala-132-con-vagon-y-rastras-de-discos-marca-ertl/p/MLA32426451#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=&sid=search) | $250.000 | -3.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Antiguo Tractor De Juguete John Deere Mod 730 Aluminio #1](https://www.mercadolibre.com.ar/antiguo-tractor-de-juguete-john-deere-mod-730-aluminio--1/up/MLAU3383194834#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA2289667224&sid=search) | $250.000 | -3.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 58. Juego de tubos flexibles Métricos

- ID Venturino: `276196682`
- Precio Venturino: $119.000
- Tokens: juego, tubo, flexibl, metrico
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 15 de 15 válidos antes de top
- Candidatos excluidos por precio: 2936
- Candidatos excluidos por score: 1160
- Mediana ML: $110.268
- Venturino vs mediana ML: 7.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA3323710072&sid=search) | $118.999 | -0.0% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 2 | media | 50 | [Juego De Llaves De Tubo Chrome Vanadium 82 Pieza Con Maletin](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-chrome-vanadium-82-pieza-con-maletin/up/MLAU4016064543#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1807348547&sid=search) | $120.000 | 0.8% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 3 | media | 50 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1510545543&sid=search) | $135.583 | 13.9% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 4 | media | 50 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1721056741&sid=search) | $99.590 | -16.3% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego, tubo |
| 5 | baja | 43 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&float_highlight=last_units&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA922576085&sid=search) | $111.000 | -6.7% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 6 | baja | 43 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2491947770&sid=search) | $94.512 | -20.6% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 7 | baja | 43 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=3fa4f6c5-c90a-48c5-b984-de0b179070fc&wid=MLA1230826554&sid=search) | $76.000 | -36.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 8 | baja | 43 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA1230896639&sid=search) | $76.000 | -36.1% | tipo: KIT_HERRAMIENTAS; tokens comunes: juego |
| 9 | baja | 35 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA2308233004&sid=search) | $114.799 | -3.5% | tipo: KIT_HERRAMIENTAS |
| 10 | baja | 35 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1448971691&sid=search) | $110.268 | -7.3% | tipo: KIT_HERRAMIENTAS |
| 11 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1946973092&sid=search) | $110.268 | -7.3% | tipo: KIT_HERRAMIENTAS |
| 12 | baja | 35 | [Kit Herramientas 85 Piezas Jadever Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1562325653&sid=search) | $131.905 | 10.8% | tipo: KIT_HERRAMIENTAS |
| 13 | baja | 35 | [Kit De Herramienta 28 Piezas + Bolso Jdhs1m28 Jadever](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas--bolso-jdhs1m28-jadever/up/MLAU2956199503#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1471463061&sid=search) | $84.000 | -29.4% | tipo: KIT_HERRAMIENTAS |
| 14 | baja | 35 | [Kit De Herramienta 28 Piezas Manuales Jadever](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-manuales-jadever/up/MLAU3177802237#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA2084295182&sid=search) | $73.499 | -38.2% | tipo: KIT_HERRAMIENTAS |
| 15 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA2144663316&sid=search) | $72.637 | -39.0% | tipo: KIT_HERRAMIENTAS |

### 59. Juego de vehiculos John Deere

- ID Venturino: `281053472`
- Precio Venturino: $90.000
- Tokens: juego, vehiculo
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 20 de 104 válidos antes de top
- Candidatos excluidos por precio: 3038
- Candidatos excluidos por score: 969
- Mediana ML: $90.517
- Venturino vs mediana ML: -0.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2362783516&sid=search) | $90.105 | 0.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=item&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497) | $104.499 | 16.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $104.499 | 16.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2160207414&sid=search) | $75.057 | -16.6% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3673017977#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1608424219&sid=search) | $115.299 | 28.1% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381500&sid=search) | $120.000 | 33.3% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tomy John Deere: Juego De Granja 1:32 Con Heno](https://www.mercadolibre.com.ar/tomy-john-deere-juego-de-granja-132-con-heno/up/MLAU4001271856#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2186712008&sid=search) | $123.711 | 37.5% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3877277235#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3148660886&sid=search) | $124.498 | 38.3% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=156eece7-bae3-4ba8-a8a7-f4b6b87aed62&wid=MLA3078939230&sid=search) | $84.861 | -5.7% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3271462064&sid=search) | $83.690 | -7.0% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juego De Juguetes John Deere Mini Grain Bin 1/64 Con Tractor](https://www.mercadolibre.com.ar/toy-set-john-deere-mini-grain-bin-164-w-tractor-for-kids-3/p/MLA2071799529#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3111475566&sid=search) | $83.173 | -7.6% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Mini Vehículos John Deere, Paquete De 3 Con Luces Y Sonidos Verde](https://www.mercadolibre.com.ar/john-deere-realistic-farm-vehicles-3-pack-toy-vehicles-w/p/MLA2078747648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3334814640&sid=search) | $77.625 | -13.8% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1556138081&sid=search) | $107.098 | 19.0% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Juego De Sábanas John Deere Tractor Tamaño Individual Beige Background With Green Tractors Tractor Print (john Deere)](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=c16aa449-915e-4e26-b668-5db9b6624f46&wid=MLA3188096720&sid=search) | $69.858 | -22.4% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 15 | baja | 43 | [Ertl Juego De Juguetes Para Camioneta Y Tractor Ford F350 De](https://www.mercadolibre.com.ar/juego-de-juguetes-de-camioneta-y-tractor-de-ertl-ford-f350-y/p/MLA2057847315#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2587996814&sid=search) | $121.584 | 35.1% | tipo: JUGUETE; tokens comunes: juego |
| 16 | baja | 41 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | 0.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3339182498&sid=search) | $90.865 | 1.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Ertl John Deere Grain Semi Truck Toy Replica Escala 1:64 De](https://www.mercadolibre.com.ar/ertl-john-deere-grain-semi-truck-toy-replica-164-scale/p/MLA2063214672#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2587960862&sid=search) | $91.427 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 60. Juguete Desmontable Build a Buddy Bonnie Scooper John Deere

- ID Venturino: `281259380`
- Precio Venturino: $73.000
- Tokens: juguete, desmontable, build, buddy, bonnie, scooper
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 18
- Candidatos usados: 20 de 55 válidos antes de top
- Candidatos excluidos por precio: 3124
- Candidatos excluidos por score: 932
- Mediana ML: $84.846
- Venturino vs mediana ML: -14.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2168937218&sid=search) | $74.297 | 1.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | -4.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | -14.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | 14.4% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | 17.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | 23.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3339182498&sid=search) | $90.865 | 24.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | 29.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381464&sid=search) | $100.000 | 37.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2160207414&sid=search) | $75.057 | 2.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Lote 2 Arados Retro John Deere C/ Detalles Juguete Vintage](https://www.mercadolibre.com.ar/lote-2-arados-retro-john-deere-c-detalles-juguete-vintage/up/MLAU2393241891#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1455831071&sid=search) | $77.777 | 6.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3271462064&sid=search) | $83.690 | 14.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Juguete Cosechador Lego Technic John Deere 1470h Para Mayore](https://www.mercadolibre.com.ar/lego-technic-john-deere-1470h-cosechadora-42218/p/MLA2064409630#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1688882031&sid=search) | $58.656 | -19.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tomy John Deere Animal Sounds Hayride - Juguete Preescolar](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2169072778&sid=search) | $88.357 | 21.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | 31.9% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Cosechadora Siku John Deere 8500 Metal Verde Escala 1:87 Con Cabezal Desmontable](https://www.mercadolibre.com.ar/cosechadora-siku-john-deere-8500-metal-verde-escala-187-con-cabezal-desmontable/p/MLA24585176#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1451966152&sid=search) | $96.440 | 32.1% | tipo: JUGUETE; tokens comunes: desmontable; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2588150140&sid=search) | $98.632 | 35.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Linterna De Juguete John Deere Tomy Tractor Con Sonido Y Luz](https://www.mercadolibre.com.ar/flashlight-toy-john-deere-tomy-tractor-w-sound-light/p/MLA2079193836#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1986342552&sid=search) | $101.261 | 38.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 19 | baja | 42 | [Caballo De Juguete De Pura Sangre, Escala Ertl A Detalle](https://www.mercadolibre.com.ar/caballo-de-juguete-de-pura-sangre-escala-ertl-a-detalle/up/MLAU4012809832#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2169086748&sid=search) | $62.745 | -14.0% | tipo: JUGUETE; tokens comunes: juguete |
| 20 | baja | 41 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2169077264&sid=search) | $74.053 | 1.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 61. Kit de Pistones y Camisas. John Deere

- ID Venturino: `318854955`
- Precio Venturino: $2.334.000
- Tokens: kit, piston, camisa
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4083
- Candidatos excluidos por score: 28
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
- Candidatos excluidos por precio: 4066
- Candidatos excluidos por score: 45
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
- Candidatos excluidos por precio: 3541
- Candidatos excluidos por score: 570
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
- Candidatos excluidos por precio: 3895
- Candidatos excluidos por score: 216
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
- Candidatos excluidos por precio: 2986
- Candidatos excluidos por score: 1125
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
- Candidatos excluidos por precio: 2961
- Candidatos excluidos por score: 1150
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
- Candidatos excluidos por precio: 2998
- Candidatos excluidos por score: 1113
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
- Candidatos excluidos por precio: 3132
- Candidatos excluidos por score: 979
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
- Candidatos excluidos por precio: 3754
- Candidatos excluidos por score: 357
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 70. Llaves ajustables John Deere 10 pulgadas

- ID Venturino: `276187354`
- Precio Venturino: $71.000
- Tokens: llave, ajustabl, 10, pulgada
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3151
- Candidatos excluidos por score: 958
- Mediana ML: $77.517
- Venturino vs mediana ML: -8.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | -13.3% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=2c427bd6-77e0-4011-a14d-996e27d52c48&wid=MLA1399126385&sid=search) | $93.489 | 31.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 71. Llaves ajustables John Deere 12 pulgadas

- ID Venturino: `276187355`
- Precio Venturino: $83.000
- Tokens: llave, ajustabl, 12, pulgada
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3066
- Candidatos excluidos por score: 1043
- Mediana ML: $77.517
- Venturino vs mediana ML: 7.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | -25.9% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=2c427bd6-77e0-4011-a14d-996e27d52c48&wid=MLA1399126385&sid=search) | $93.489 | 12.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 72. Llaves ajustables John Deere 6 pulgadas

- ID Venturino: `276187350`
- Precio Venturino: $39.000
- Tokens: llave, ajustabl, 6, pulgada
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3250
- Candidatos excluidos por score: 859
- Mediana ML: $36.483
- Venturino vs mediana ML: 6.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 41 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1506435419&sid=search) | $41.198 | 5.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 2 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=3bc856ec-888b-4200-b09c-6646382738bf&wid=MLA1704310265&sid=search) | $31.767 | -18.5% | tipo: HERRAMIENTA |

### 73. Llaves ajustables John Deere 8 pulgadas

- ID Venturino: `276187353`
- Precio Venturino: $49.000
- Tokens: llave, ajustabl, 8, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 3322
- Candidatos excluidos por score: 786
- Mediana ML: $41.198
- Venturino vs mediana ML: 18.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | 25.6% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1506435419&sid=search) | $41.198 | -15.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 3 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=3bc856ec-888b-4200-b09c-6646382738bf&wid=MLA1704310265&sid=search) | $31.767 | -35.2% | tipo: HERRAMIENTA |

### 74. Manómetro con aguja John Deere doble

- ID Venturino: `276196695`
- Precio Venturino: $38.000
- Tokens: manometro, aguja, doble
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3256
- Candidatos excluidos por score: 855
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
- Candidatos excluidos por precio: 3391
- Candidatos excluidos por score: 720
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
- Candidatos excluidos por precio: 3347
- Candidatos excluidos por score: 764
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 77. Mate Origen con bombilla negro John Deere

- ID Venturino: `276147434`
- Precio Venturino: $60.000
- Tokens: mate, origen, bombilla, negro
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 5 de 5 válidos antes de top
- Candidatos excluidos por precio: 3278
- Candidatos excluidos por score: 828
- Mediana ML: $62.523
- Venturino vs mediana ML: -4.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [John Deere, Sets Materos, Juegos De Mate, Kits Materos](https://articulo.mercadolibre.com.ar/MLA-798301540-john-deere-sets-materos-juegos-de-mate-kits-materos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA798301540&sid=search) | $73.900 | 23.2% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 2 | media | 56 | [John Deere Sets Materos, Equipos De Mate, Juegos De Mate](https://articulo.mercadolibre.com.ar/MLA-798301631-john-deere-sets-materos-equipos-de-mate-juegos-de-mate-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA798301631&sid=search) | $73.900 | 23.2% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&float_highlight=last_units&tracking_id=309f3a28-1a16-4173-acd8-3432a0c03528&wid=MLA899912364&sid=search) | $58.242 | -2.9% | tipo: MATE; tokens comunes: mate |
| 4 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=fdd9f4b3-5998-4bfc-a13e-ef4abe9bea94&wid=MLA873583212&sid=search) | $38.363 | -36.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 5 | baja | 28 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA3168357158&sid=search) | $62.523 | 4.2% | tipo: MATE; penalización tipo adicional candidato: BOLSO, HERRAMIENTA; tokens comunes: mate |

### 78. Mate San Roque con bombilla verde John Deere

- ID Venturino: `276158249`
- Precio Venturino: $45.000
- Tokens: mate, san, roque, bombilla, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 10 de 10 válidos antes de top
- Candidatos excluidos por precio: 3301
- Candidatos excluidos por score: 800
- Mediana ML: $32.900
- Venturino vs mediana ML: 36.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Set Matero John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-ecocuero/up/MLAU245113070#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA1512191568&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 2 | media | 55 | [Set Matero Kit John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-kit-john-deere-ecocuero/up/MLAU2303263352#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA1935176914&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | media | 55 | [Set Matero John Deere. Fundas De Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-fundas-de-ecocuero/up/MLAU239222926#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=84185d0f-1d15-4bc2-aba0-0d35af79424f&wid=MLA1399979491&sid=search) | $32.900 | -26.9% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&float_highlight=last_units&tracking_id=309f3a28-1a16-4173-acd8-3432a0c03528&wid=MLA899912364&sid=search) | $58.242 | 29.4% | tipo: MATE; tokens comunes: mate |
| 5 | media | 46 | [Bolso Matero John Deere Ecocuero](https://www.mercadolibre.com.ar/bolso-matero-john-deere-ecocuero/up/MLAU264444456#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=fdd9f4b3-5998-4bfc-a13e-ef4abe9bea94&wid=MLA1594771616&sid=search) | $31.500 | -30.0% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate; compatibilidad/marca: John Deere |
| 6 | baja | 39 | [Bolso Matero Rigido Diseños Varios](https://articulo.mercadolibre.com.ar/MLA-1774588246-bolso-matero-rigido-disenos-varios-_JM?searchVariation=186759553535#polycard_client=search-desktop&be_origin=backend&searchVariation=186759553535&search_layout=grid&position=20&type=item&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8) | $27.387 | -39.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate |
| 7 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=fdd9f4b3-5998-4bfc-a13e-ef4abe9bea94&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Set Matero Bolso Y 2 Latas De Ecocuero John Deere](https://www.mercadolibre.com.ar/set-matero-bolso-y-2-latas-de-ecocuero-john-deere/up/MLAU3900127837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=fdd9f4b3-5998-4bfc-a13e-ef4abe9bea94&wid=MLA1751862177&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 9 | baja | 34 | [Set Matero Bolso Y Latas John Deere Con Tu Nombre. Ecocuero](https://www.mercadolibre.com.ar/set-matero-bolso-y-latas-john-deere-con-tu-nombre-ecocuero/up/MLAU2999997079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=fdd9f4b3-5998-4bfc-a13e-ef4abe9bea94&wid=MLA2009625314&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 10 | baja | 28 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=d8252390-a90f-4316-9143-159e23acf2f8&wid=MLA3168357158&sid=search) | $62.523 | 38.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, HERRAMIENTA; tokens comunes: mate |

### 79. Matera Elsa menge gris John Deere

- ID Venturino: `276153548`
- Precio Venturino: $70.000
- Tokens: matera, elsa, menge, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3160
- Candidatos excluidos por score: 951
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
- Candidatos excluidos por precio: 3160
- Candidatos excluidos por score: 951
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
- Candidatos excluidos por precio: 3301
- Candidatos excluidos por score: 809
- Mediana ML: $38.363
- Venturino vs mediana ML: 17.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&float_highlight=last_unit&tracking_id=fdd9f4b3-5998-4bfc-a13e-ef4abe9bea94&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATERA; tokens comunes: matera; compatibilidad/marca: John Deere |

### 82. Mini bandeja de piezas magnéticas

- ID Venturino: `317015820`
- Precio Venturino: $14.000
- Tokens: mini, bandeja, pieza, magnetica
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3430
- Candidatos excluidos por score: 681
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
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 3118
- Candidatos excluidos por score: 989
- Mediana ML: $56.650
- Venturino vs mediana ML: 30.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=35&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $57.197 | -22.5% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mochila Para Laptop John Deere: Diseño Reforzado Y Ergonómic](https://articulo.mercadolibre.com.ar/MLA-3005250038-mochila-para-laptop-john-deere-diseno-reforzado-y-ergonomic-_JM?searchVariation=197763283247#polycard_client=search-desktop&be_origin=backend&searchVariation=197763283247&search_layout=grid&position=24&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $51.026 | -30.9% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 3 | baja | 43 | [Mochila Infantil Con Diseño De Fan Art De Tractores John Dee](https://articulo.mercadolibre.com.ar/MLA-1810945127-mochila-infantil-con-diseno-de-fan-art-de-tractores-john-dee-_JM?searchVariation=195657359500#polycard_client=search-desktop&be_origin=backend&searchVariation=195657359500&search_layout=grid&position=37&type=item&tracking_id=b3d12ad6-f8a3-439f-91ad-b43ae82ea679) | $56.102 | -24.0% | tipo: MOCHILA; tokens comunes: mochila |
| 4 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $68.673 | -6.9% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 84. Mochila Fumigadora Honda WJR 2525 – 25 L

- ID Venturino: `332864939`
- Precio Venturino: $965.621
- Tokens: mochila, fumigadora, honda, wjr, 2525, 25, l
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3974
- Candidatos excluidos por score: 137
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 85. Mochila Omega John Deere

- ID Venturino: `338241045`
- Precio Venturino: $60.000
- Tokens: mochila, omega
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 4 de 4 válidos antes de top
- Candidatos excluidos por precio: 3278
- Candidatos excluidos por score: 829
- Mediana ML: $56.650
- Venturino vs mediana ML: 5.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=35&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $57.197 | -4.7% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mochila Para Laptop John Deere: Diseño Reforzado Y Ergonómic](https://articulo.mercadolibre.com.ar/MLA-3005250038-mochila-para-laptop-john-deere-diseno-reforzado-y-ergonomic-_JM?searchVariation=197763283247#polycard_client=search-desktop&be_origin=backend&searchVariation=197763283247&search_layout=grid&position=24&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $51.026 | -15.0% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 3 | baja | 43 | [Mochila Infantil Con Diseño De Fan Art De Tractores John Dee](https://articulo.mercadolibre.com.ar/MLA-1810945127-mochila-infantil-con-diseno-de-fan-art-de-tractores-john-dee-_JM?searchVariation=195657359500#polycard_client=search-desktop&be_origin=backend&searchVariation=195657359500&search_layout=grid&position=37&type=item&tracking_id=b3d12ad6-f8a3-439f-91ad-b43ae82ea679) | $56.102 | -6.5% | tipo: MOCHILA; tokens comunes: mochila |
| 4 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=item&tracking_id=107270de-21e1-4e7b-8e35-f49e95cba38d) | $68.673 | 14.5% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 86. Mochila Sein John Deere gris

- ID Venturino: `276129570`
- Precio Venturino: $135.000
- Tokens: mochila, sein, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2971
- Candidatos excluidos por score: 1140
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 87. Motobomba Honda WB20XH2

- ID Venturino: `340632800`
- Precio Venturino: $1.362.010
- Tokens: motobomba, honda, wb20xh2
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4057
- Candidatos excluidos por score: 54
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 88. Motobomba Honda WL20XH

- ID Venturino: `340635178`
- Precio Venturino: $1.170.000
- Tokens: motobomba, honda, wl20xh
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4025
- Candidatos excluidos por score: 86
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 89. Motoguadaña Honda UMK435 – 35.8 cc

- ID Venturino: `332864026`
- Precio Venturino: $778.042
- Tokens: motoguadana, honda, umk435, 35.8, cc
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3930
- Candidatos excluidos por score: 181
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 90. Motor Honda GP200 – 5.5 HP

- ID Venturino: `332858727`
- Precio Venturino: $483.518
- Tokens: motor, honda, gp200, 5.5, hp
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3781
- Candidatos excluidos por score: 330
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 91. Motor Honda GX160SX – 5.5 HP

- ID Venturino: `332862157`
- Precio Venturino: $576.413
- Tokens: motor, honda, gx160sx, 5.5, hp
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3811
- Candidatos excluidos por score: 300
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 92. Motor Honda GX200QX – 6.5 HP

- ID Venturino: `332861874`
- Precio Venturino: $619.048
- Tokens: motor, honda, gx200qx, 6.5, hp
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3838
- Candidatos excluidos por score: 273
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 93. Motor Honda GX390QX – 13 HP

- ID Venturino: `332857483`
- Precio Venturino: $1.128.754
- Tokens: motor, honda, gx390qx, 13, hp
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 4016
- Candidatos excluidos por score: 95
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 94. Navaja de bolsillo grande John Deere

- ID Venturino: `288695391`
- Precio Venturino: $66.000
- Tokens: navaja, bolsillo, grande
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3190
- Candidatos excluidos por score: 921
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 95. Palanca Barra John Deere 25 pulgadas

- ID Venturino: `276681802`
- Precio Venturino: $58.000
- Tokens: palanca, barra, 25, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3210
- Candidatos excluidos por score: 899
- Mediana ML: $51.371
- Venturino vs mediana ML: 12.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1506435419&sid=search) | $41.198 | -29.0% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | 6.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 96. Palanca Barra John Deere 8 pulgadas

- ID Venturino: `276681809`
- Precio Venturino: $30.000
- Tokens: palanca, barra, 8, pulgada
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 3197
- Candidatos excluidos por score: 911
- Mediana ML: $31.767
- Venturino vs mediana ML: -5.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Palancas Apertura Ventana Cabina John Deere Sg2](https://www.mercadolibre.com.ar/palancas-apertura-ventana-cabina-john-deere-sg2/up/MLAU319169472#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=6ec69507-a4cd-4275-b713-3ac16864e3ac&wid=MLA1409671591&sid=search) | $23.076 | -23.1% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1506435419&sid=search) | $41.198 | 37.3% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=3bc856ec-888b-4200-b09c-6646382738bf&wid=MLA1704310265&sid=search) | $31.767 | 5.9% | tipo: HERRAMIENTA |

### 97. Palanca John Deere 25 pulgadas

- ID Venturino: `276681805`
- Precio Venturino: $57.000
- Tokens: palanca, 25, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3234
- Candidatos excluidos por score: 875
- Mediana ML: $51.371
- Venturino vs mediana ML: 11.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1506435419&sid=search) | $41.198 | -27.7% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | 8.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 98. Palanca John Deere 31 pulgadas

- ID Venturino: `276681807`
- Precio Venturino: $58.000
- Tokens: palanca, 31, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 3210
- Candidatos excluidos por score: 899
- Mediana ML: $51.371
- Venturino vs mediana ML: 12.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=f895b97a-76e2-4077-a1b4-541231f0aa40&wid=MLA1506435419&sid=search) | $41.198 | -29.0% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Llaves De Equipamiento Original John Deere Gy20680, Paquete](https://articulo.mercadolibre.com.ar/MLA-1805686341-llaves-de-equipamiento-original-john-deere-gy20680-paquete-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=item&tracking_id=ae5ebc13-fd8c-4d4d-ae90-59d1a581887a) | $61.544 | 6.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |

### 99. Pinza múltiple de acero inoxidable John Deere

- ID Venturino: `276173635`
- Precio Venturino: $70.000
- Tokens: pinza, multiple, acero, inoxidable
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3160
- Candidatos excluidos por score: 951
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
- Candidatos excluidos por precio: 3163
- Candidatos excluidos por score: 948
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
- Candidatos usados: 12 de 12 válidos antes de top
- Candidatos excluidos por precio: 3314
- Candidatos excluidos por score: 785
- Mediana ML: $44.250
- Venturino vs mediana ML: 6.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Punton Cosechadora Jhon Deere Triple Forjado](https://www.mercadolibre.com.ar/punton-cosechadora-jhon-deere-triple-forjado/up/MLAU213446711#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=6ec69507-a4cd-4275-b713-3ac16864e3ac&wid=MLA1123219059&sid=search) | $48.738 | 3.7% | tipo: CUCHILLA; tokens comunes: punton, cosechadora, forjado; compatibilidad/marca: John Deere |
| 2 | baja | 50 | [Puntón John Deere H213507 Negros](https://www.mercadolibre.com.ar/punton-john-deere-h213507-negros/up/MLAU214269311#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=3f8b134d-4e21-4c15-8966-f0421e631e3b&wid=MLA1128435570&sid=search) | $55.969 | 19.1% | tipo: CUCHILLA; tokens comunes: punton; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 41 | [Cuchillas Genérica Para John Deere De 54 Cm- 21 Pulg ( X2u)](https://www.mercadolibre.com.ar/cuchillas-generica-para-john-deere-de-54-cm-21-pulg--x2u/up/MLAU3936051037#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=b122451e-12a1-424a-bc4e-22c203fb007f&wid=MLA1775667427&sid=search) | $45.000 | -4.3% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Cuchilla Para John Deere Con Filo](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-con-filo/up/MLAU3145681729#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=1e866aa1-fea3-44e7-bd23-f9519703c638&wid=MLA2066073228&sid=search) | $32.958 | -29.9% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Cuchilla 21 Pulgadas Para Tractor Jhon Deere 7 Puntas](https://www.mercadolibre.com.ar/cuchilla-21-pulgadas-para-tractor-jhon-deere-7-puntas/up/MLAU3260625058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA2137492956&sid=search) | $31.803 | -32.3% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA2783946866&sid=search) | $64.387 | 37.0% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 7 | baja | 35 | [Cuchilla 19.5 Tractor Deere 38 Stx38 78](https://www.mercadolibre.com.ar/cuchilla-195---tractor--deere-38--stx38-78/up/MLAU181213484#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=9de2d6a0-00d7-4974-a457-4b68bd279db7&wid=MLA1381336731&sid=search) | $49.790 | 5.9% | tipo: CUCHILLA |
| 8 | baja | 35 | [Cuchilla De Corte 38' - M84472](https://www.mercadolibre.com.ar/cuchilla-de-corte-38--m84472/up/MLAU423649509#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=3fa4f6c5-c90a-48c5-b984-de0b179070fc&wid=MLA1859864160&sid=search) | $43.500 | -7.4% | tipo: CUCHILLA |
| 9 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre](https://www.mercadolibre.com.ar/cuchilla-2112-para-tractor-42-deere-115-125-135-7-estre/p/MLA66650707#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=9de2d6a0-00d7-4974-a457-4b68bd279db7&wid=MLA3196140694&sid=search) | $42.431 | -9.7% | tipo: CUCHILLA |
| 10 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre.](https://www.mercadolibre.com.ar/cuchilla-2112--para-tractor-42--deere-115-125-135-7-estre/up/MLAU127634743#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=2f7bcd10-be5c-4190-83b8-1ecc0315c3ba&wid=MLA1439946508&sid=search) | $51.900 | 10.4% | tipo: CUCHILLA |
| 11 | baja | 35 | [Cuchilla De Corte 42' - Gx22151](https://www.mercadolibre.com.ar/cuchilla-de-corte-42--gx22151/up/MLAU2967821263#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a001626c-ed32-4939-ab79-5879b49a9b1e&wid=MLA1472563141&sid=search) | $32.000 | -31.9% | tipo: CUCHILLA |
| 12 | baja | 24 | [Repuesto De Patin Para Cosechadora Draper John Deere](https://www.mercadolibre.com.ar/repuesto-de-patin-para-cosechadora-draper-john-deere/up/MLAU393564833#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=3f8b134d-4e21-4c15-8966-f0421e631e3b&wid=MLA1825307436&sid=search) | $29.047 | -38.2% | tokens comunes: cosechadora, draper; compatibilidad/marca: John Deere |

### 102. Puntón Cuchilla. John Deere

- ID Venturino: `318859417`
- Precio Venturino: $86.000
- Tokens: punton, cuchilla
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 20 de 24 válidos antes de top
- Candidatos excluidos por precio: 3049
- Candidatos excluidos por score: 1038
- Mediana ML: $99.024
- Venturino vs mediana ML: -13.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 58 | [Cuchillas Para Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-para-tractor-john-deere-42/up/MLAU172143595#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=9de2d6a0-00d7-4974-a457-4b68bd279db7&wid=MLA775204942&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 2 | baja | 57 | [Set de cuchillas: equipo John Deere para compañía](https://www.mercadolibre.com.ar/set-de-cuchillas-equipo-john-deere-para-compania/p/MLA48189528#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=63fd543c-1bba-4738-b511-e696c6d8a5cf&wid=&sid=search) | $100.000 | 16.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 3 | baja | 57 | [Sección Cuchilla John Deere H163131 - Prentacc](https://www.mercadolibre.com.ar/seccion-cuchilla-john-deere-h163131--prentacc/up/MLAU3451205653#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=156eece7-bae3-4ba8-a8a7-f4b6b87aed62&wid=MLA1549074995&sid=search) | $66.000 | -23.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 4 | baja | 57 | [Cuchillas Compatible Con Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-compatible-con-tractor-john-deere-42/up/MLAU204286028#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&float_highlight=last_units&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA919160219&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 5 | baja | 56 | [Correa De Cuchillas Plataforma John Deere Uc30568 42](https://www.mercadolibre.com.ar/correa-de-cuchillas-plataforma-john-deere-uc30568-42/up/MLAU3916141489#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=1e866aa1-fea3-44e7-bd23-f9519703c638&wid=MLA1763514089&sid=search) | $78.310 | -8.9% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 6 | baja | 56 | [Juego Cuchillas Oregon 92-110 John Deere La 125](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-92110-john-deere-la-125/up/MLAU130693017#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&float_highlight=last_units&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA834167453&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 7 | baja | 56 | [Juego Cuchillas John Deere La 135 Código M154061 Oregon](https://www.mercadolibre.com.ar/juego-cuchillas-john-deere-la-135-codigo-m154061-oregon/up/MLAU134201412#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&float_highlight=last_units&tracking_id=9de2d6a0-00d7-4974-a457-4b68bd279db7&wid=MLA847129327&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 8 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54-7-estrella-jgo-3-pz/p/MLA35241674#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b122451e-12a1-424a-bc4e-22c203fb007f&wid=MLA1506537777&sid=search) | $98.048 | 14.0% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 9 | baja | 56 | [Repuestos John Deere - Jgo. De Cuchillas - 46 - M41967](https://www.mercadolibre.com.ar/repuestos-john-deere--jgo-de-cuchillas--46--m41967/up/MLAU3736924947#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=b122451e-12a1-424a-bc4e-22c203fb007f&wid=MLA2794779068&sid=search) | $72.600 | -15.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 10 | baja | 56 | [Juego Cuchillas Tractor John Deere 42 Pulgadas Usa](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-john-deere--42-pulgadas-usa/up/MLAU155628101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&float_highlight=last_units&tracking_id=24a5f4cf-4789-44a7-934a-ad03bbf5f0a1&wid=MLA1266340056&sid=search) | $71.999 | -16.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 11 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU190037463#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=b122451e-12a1-424a-bc4e-22c203fb007f&wid=MLA910245048&sid=search) | $107.990 | 25.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 12 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU217068882#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=b122451e-12a1-424a-bc4e-22c203fb007f&wid=MLA1135111613&sid=search) | $109.434 | 27.2% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 13 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU306728158#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=a001626c-ed32-4939-ab79-5879b49a9b1e&wid=MLA910215527&sid=search) | $113.862 | 32.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 14 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU260942932#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=b122451e-12a1-424a-bc4e-22c203fb007f&wid=MLA1536195876&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 15 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU124341980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=a001626c-ed32-4939-ab79-5879b49a9b1e&wid=MLA1163468541&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 16 | baja | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU152184233#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=63fd543c-1bba-4738-b511-e696c6d8a5cf&wid=MLA1152796939&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 17 | baja | 55 | [Juego Cuchillas Para John Deere 38pul Centro 45/64 17,8mm](https://www.mercadolibre.com.ar/juego-cuchillas-para-john-deere-38pul-centro-4564-178mm/up/MLAU140173189#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&float_highlight=last_unit&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA1106046608&sid=search) | $74.000 | -14.0% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 18 | baja | 55 | [Correa Cuchilla 38 Sabre John Deere Reemplaza M122674 Oregon](https://www.mercadolibre.com.ar/correa-cuchilla-38-sabre-john-deere-reemplaza-m122674-oregon/up/MLAU127047057#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA1400582119&sid=search) | $73.578 | -14.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 19 | baja | 55 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=7684258a-4920-4a7b-9a87-47e9b164d70d&wid=MLA2783946866&sid=search) | $64.387 | -25.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |
| 20 | baja | 55 | [Juego Cuchillas Tractor 54 John Deere D170 La150 La170 X 3](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-54-john-deere-d170-la150-la170-x-3/up/MLAU288219362#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_units&tracking_id=9de2d6a0-00d7-4974-a457-4b68bd279db7&wid=MLA827797148&sid=search) | $110.000 | 27.9% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere; guardrail confianza: baja |

### 103. Punzón central John Deere

- ID Venturino: `276196693`
- Precio Venturino: $15.000
- Tokens: punzon, central
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3371
- Candidatos excluidos por score: 740
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
- Candidatos excluidos por precio: 3014
- Candidatos excluidos por score: 1097
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
- Candidatos excluidos por precio: 3283
- Candidatos excluidos por score: 828
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
- Candidatos excluidos por precio: 3255
- Candidatos excluidos por score: 856
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 107. Set de Farmin Friends John Deere

- ID Venturino: `281259388`
- Precio Venturino: $58.000
- Tokens: set, farmin, friend
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 20 de 26 válidos antes de top
- Candidatos excluidos por precio: 3210
- Candidatos excluidos por score: 875
- Mediana ML: $68.945
- Venturino vs mediana ML: -15.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2160207414&sid=search) | $75.057 | 29.4% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Juguete Cosechador Lego Technic John Deere 1470h Para Mayore](https://www.mercadolibre.com.ar/lego-technic-john-deere-1470h-cosechadora-42218/p/MLA2064409630#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1688882031&sid=search) | $58.656 | 1.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | 8.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2792533012&sid=search) | $52.000 | -10.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1725054925&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1677885959&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1606696085&sid=search) | $50.000 | -13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1&wid=MLA3370300548&sid=search) | $48.062 | -17.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Bulldozer Ertl Esc 1.18 John Deere Para Repuesto Ver Fotos](https://www.mercadolibre.com.ar/bulldozer-ertl-esc-118-john-deere-para-repuesto-ver-fotos/up/MLAU182247296#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA1391581274&sid=search) | $68.900 | 18.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | 18.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | 20.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Juego De Sábanas John Deere Tractor Tamaño Individual Beige Background With Green Tractors Tractor Print (john Deere)](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=c16aa449-915e-4e26-b668-5db9b6624f46&wid=MLA3188096720&sid=search) | $69.858 | 20.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | 20.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA3316369844&sid=search) | $42.000 | -27.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2169077264&sid=search) | $74.053 | 27.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2378379950&sid=search) | $74.084 | 27.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2168937218&sid=search) | $74.297 | 28.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Mini Vehículos John Deere, Paquete De 3 Con Luces Y Sonidos Verde](https://www.mercadolibre.com.ar/john-deere-realistic-farm-vehicles-3-pack-toy-vehicles-w/p/MLA2078747648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3334814640&sid=search) | $77.625 | 33.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Lote 2 Arados Retro John Deere C/ Detalles Juguete Vintage](https://www.mercadolibre.com.ar/lote-2-arados-retro-john-deere-c-detalles-juguete-vintage/up/MLAU2393241891#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1455831071&sid=search) | $77.777 | 34.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1508081573&sid=search) | $36.488 | -37.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 108. Set de latas John Deere

- ID Venturino: `276148810`
- Precio Venturino: $20.000
- Tokens: set, lata
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3391
- Candidatos excluidos por score: 720
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
- Candidatos excluidos por precio: 3391
- Candidatos excluidos por score: 720
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 110. Set de tractor y camión volquete John Deere

- ID Venturino: `281053465`
- Precio Venturino: $60.000
- Tokens: set, tractor, camion, volquete
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 20 de 30 válidos antes de top
- Candidatos excluidos por precio: 3278
- Candidatos excluidos por score: 803
- Mediana ML: $69.729
- Venturino vs mediana ML: -14.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 67 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2160207414&sid=search) | $75.057 | 25.1% | tipo: JUGUETE; tokens comunes: set, camion, volquete; compatibilidad/marca: John Deere |
| 2 | media | 58 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | 4.5% | tipo: JUGUETE; tokens comunes: tractor, camion; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | 16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1606696085&sid=search) | $50.000 | -16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1677885959&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | 15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | 16.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2169077264&sid=search) | $74.053 | 23.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | 37.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | 39.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Juego De Sábanas John Deere Tractor Tamaño Individual Beige Background With Green Tractors Tractor Print (john Deere)](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=c16aa449-915e-4e26-b668-5db9b6624f46&wid=MLA3188096720&sid=search) | $69.858 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1&wid=MLA3370300548&sid=search) | $48.062 | -19.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper Yellow And Black](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2378379950&sid=search) | $74.084 | 23.5% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Juego De Juguetes John Deere Mini Grain Bin 1/64 Con Tractor](https://www.mercadolibre.com.ar/toy-set-john-deere-mini-grain-bin-164-w-tractor-for-kids-3/p/MLA2071799529#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3111475566&sid=search) | $83.173 | 38.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Juguete Cosechador Lego Technic John Deere 1470h Para Mayore](https://www.mercadolibre.com.ar/lego-technic-john-deere-1470h-cosechadora-42218/p/MLA2064409630#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1688882031&sid=search) | $58.656 | -2.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1725054925&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2792533012&sid=search) | $52.000 | -13.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Bulldozer Ertl Esc 1.18 John Deere Para Repuesto Ver Fotos](https://www.mercadolibre.com.ar/bulldozer-ertl-esc-118-john-deere-para-repuesto-ver-fotos/up/MLAU182247296#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA1391581274&sid=search) | $68.900 | 14.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://www.mercadolibre.com.ar/lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe/up/MLAU3996642373#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2168937218&sid=search) | $74.297 | 23.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Mini Vehículos John Deere, Paquete De 3 Con Luces Y Sonidos Verde](https://www.mercadolibre.com.ar/john-deere-realistic-farm-vehicles-3-pack-toy-vehicles-w/p/MLA2078747648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3334814640&sid=search) | $77.625 | 29.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 111. Termo Iguazu Verde John Deere

- ID Venturino: `276157118`
- Precio Venturino: $90.000
- Tokens: termo, iguazu, verde
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3038
- Candidatos excluidos por score: 1073
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
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3038
- Candidatos excluidos por score: 1073
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
- Candidatos usados: 20 de 88 válidos antes de top
- Candidatos excluidos por precio: 3059
- Candidatos excluidos por score: 964
- Mediana ML: $90.085
- Venturino vs mediana ML: -5.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | 1.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | 11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=156eece7-bae3-4ba8-a8a7-f4b6b87aed62&wid=MLA3078939230&sid=search) | $84.861 | -0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | -3.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | 6.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA3214114070&sid=search) | $95.000 | 11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2169077264&sid=search) | $74.053 | -12.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | 13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2588150140&sid=search) | $98.632 | 16.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2450624614&sid=search) | $100.000 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2472089290&sid=search) | $100.000 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381464&sid=search) | $100.000 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | -18.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | -18.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Linterna De Juguete John Deere Tomy Tractor Con Sonido Y Luz](https://www.mercadolibre.com.ar/flashlight-toy-john-deere-tomy-tractor-w-sound-light/p/MLA2079193836#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1986342552&sid=search) | $101.261 | 19.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1588501493&sid=search) | $102.006 | 20.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 114. Tractor 32 JD 8R John Deere Prestige

- ID Venturino: `281259419`
- Precio Venturino: $311.000
- Tokens: tractor, 32, 8r, prestige
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 131 válidos antes de top
- Candidatos excluidos por precio: 3631
- Candidatos excluidos por score: 349
- Mediana ML: $289.835
- Venturino vs mediana ML: 7.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1501324025&sid=search) | $209.218 | -32.7% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1782656432&sid=search) | $291.302 | -6.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1507969023&sid=search) | $288.367 | -7.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2555019084&sid=search) | $199.880 | -35.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1537554751&sid=search) | $394.031 | 26.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 6 | media | 55 | [John Deere Juguete Tractor 6410 A Escala 1:32 Con Vagon Y Rastras De Discos Marca Ertl](https://www.mercadolibre.com.ar/john-deere-juguete-tractor-6410-a-escala-132-con-vagon-y-rastras-de-discos-marca-ertl/p/MLA32426451#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=&sid=search) | $250.000 | -19.6% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 7 | media | 51 | [Tractor De Juguete Verde 1 32 Con Remolque Y Disco](https://www.mercadolibre.com.ar/tractor-de-juguete-verde-1-32-con-remolque-y-disco/up/MLAU3629093285#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2605756500&sid=search) | $297.761 | -4.3% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 8 | media | 51 | [Tractor De Colección Metalizado 1/32 Con Ruedas Simples](https://www.mercadolibre.com.ar/tractor-de-coleccion-metalizado-132-con-ruedas-simples/up/MLAU3636789934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1594244033&sid=search) | $280.966 | -9.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 9 | media | 50 | [Set Granja 1 32 Tractor Metal Y Animales Juguete Niño](https://www.mercadolibre.com.ar/set-granja-1-32-tractor-metal-y-animales-juguete-nino/up/MLAU3629077203#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2605820936&sid=search) | $302.747 | -2.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 10 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1763349785&sid=search) | $312.737 | 0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Rociador Juguete Escala 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/rociador-juguete-escala-132-john-deere--a-pedidoexkarg/up/MLAU368494041#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1766427200&sid=search) | $322.795 | 3.8% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1949971056&sid=search) | $323.265 | 3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1514896991&sid=search) | $293.399 | -5.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1417510473&sid=search) | $332.793 | 7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1503208905&sid=search) | $332.996 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Set Ertl John Deere Haying 1:32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-john-deere-haying-132--a-pedidoexkarg/up/MLAU2044179155#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1929826114&sid=search) | $283.187 | -8.9% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Camión De Volteo John Deere 460e-ii 1/50 Escala Prestige](https://www.mercadolibre.com.ar/camion-de-volteo-john-deere-460eii-150-escala-prestige/up/MLAU3452033317#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1549150807&sid=search) | $282.699 | -9.1% | tipo: JUGUETE; tokens comunes: prestige; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784581058&sid=search) | $270.242 | -13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor Juguete John Deere 1/50 843l - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-150-843l--a-pedidoexkarg/up/MLAU375792789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784542220&sid=search) | $270.089 | -13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1476358051&sid=search) | $269.326 | -13.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 115. Tractor 435 Replica John Deere

- ID Venturino: `281234444`
- Precio Venturino: $202.000
- Tokens: tractor, 435, replica
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 155 válidos antes de top
- Candidatos excluidos por precio: 3246
- Candidatos excluidos por score: 710
- Mediana ML: $189.291
- Venturino vs mediana ML: 6.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1583656447&sid=search) | $259.000 | 28.2% | tipo: JUGUETE; tokens técnicos: 435; tokens comunes: tractor, 435; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2194899840&sid=search) | $187.899 | -7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1713564907&sid=search) | $217.905 | 7.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor John Deere 7270r De Juguete Con Rotoempacadora 560r](https://articulo.mercadolibre.com.ar/MLA-3022278842-tractor-john-deere-7270r-de-juguete-con-rotoempacadora-560r-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $156.756 | -22.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1498485099&sid=search) | $150.000 | -25.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-figur/p/MLA2073701772#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1688853331&sid=search) | $144.095 | -28.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784581058&sid=search) | $270.242 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | -39.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2555019084&sid=search) | $199.880 | -1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1950555252&sid=search) | $198.353 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1501324025&sid=search) | $209.218 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Juguete Field Of Dreams De John Deere A Escala 1:](https://articulo.mercadolibre.com.ar/MLA-2589230436-tractor-de-juguete-field-of-dreams-de-john-deere-a-escala-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=item&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f) | $190.682 | -5.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tomy John Deere Johnny Tractor Ride-on: Juguete Infantil](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2174427890&sid=search) | $221.006 | 9.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete John Deere 3020 Escala 1/16 Celebration](https://www.mercadolibre.com.ar/tractor-toy-john-deere-3020-116-scale-celebration/p/MLA2082879124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3235264330&sid=search) | $223.803 | 10.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere 4020 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-4020-164--a-pedidoexkarg/up/MLAU2803971639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1461201863&sid=search) | $179.991 | -10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor 2021 Ertl 1:64 John Deere 8960 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2021-ertl-164-john-deere-8960--a-pedidoexkarg/up/MLAU3920195868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA3219582450&sid=search) | $179.880 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [John Deere Ride On Toys Sit 'n Scoot Tractor De Actividades](https://articulo.mercadolibre.com.ar/MLA-2550107744-john-deere-ride-on-toys-sit-n-scoot-tractor-de-actividades-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=item&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f) | $179.267 | -11.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1609083934&sid=search) | $227.227 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Coleccion John Deere 9470rx Toy - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-9470rx-toy--a-pedidoexkarg/up/MLAU150165852#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1141831682&sid=search) | $175.436 | -13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere 1:64 50th Anniversary Edition_exkarg](https://www.mercadolibre.com.ar/tractor--john-deere-164-50th-anniversary-editionexkarg/up/MLAU3037093501#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2021607916&sid=search) | $174.180 | -13.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 116. Tractor 6210R Bif Farm John Deere

- ID Venturino: `281234446`
- Precio Venturino: $262.000
- Tokens: tractor, 6210r, bif, farm
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 140 válidos antes de top
- Candidatos excluidos por precio: 3498
- Candidatos excluidos por score: 473
- Mediana ML: $256.997
- Venturino vs mediana ML: 1.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 78 | [Juego De Juguetes Tractor John Deere 6210r Big Farm 1/16 Con](https://www.mercadolibre.com.ar/john-deere-tomy-big-deere-116-6210r-tractor-with-loader/p/MLA2073774277#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1708197997&sid=search) | $284.177 | 8.5% | tipo: JUGUETE; tokens técnicos: 6210r; tokens comunes: tractor, 6210r, farm; compatibilidad/marca: John Deere |
| 2 | alta | 71 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1609083934&sid=search) | $227.227 | -13.3% | tipo: JUGUETE; tokens técnicos: 6210r; tokens comunes: tractor, 6210r; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1583656447&sid=search) | $259.000 | -1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1949945520&sid=search) | $265.905 | 1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor De Juguete John Deere 730 Con Vagón Barcaza A Escala](https://www.mercadolibre.com.ar/toy-john-deere-730-tractor-with-barge-wagon-116-scale/p/MLA2081533429#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3380937872&sid=search) | $254.993 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1476358051&sid=search) | $269.326 | 2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Juguete John Deere 1/50 843l - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-150-843l--a-pedidoexkarg/up/MLAU375792789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784542220&sid=search) | $270.089 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784581058&sid=search) | $270.242 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Antiguo Tractor De Juguete John Deere Mod 730 Aluminio #1](https://www.mercadolibre.com.ar/antiguo-tractor-de-juguete-john-deere-mod-730-aluminio--1/up/MLAU3383194834#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA2289667224&sid=search) | $250.000 | -4.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1970561562&sid=search) | $247.506 | -5.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1571921115&sid=search) | $245.000 | -6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor 1/64 John Deere 8400 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8400--a-pedidoexkarg/up/MLAU2670938419#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1949431358&sid=search) | $238.267 | -9.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1507969023&sid=search) | $288.367 | 10.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1782656432&sid=search) | $291.302 | 11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1514896991&sid=search) | $293.399 | 12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA2138660238&sid=search) | $230.189 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete John Deere 3020 Escala 1/16 Celebration](https://www.mercadolibre.com.ar/tractor-toy-john-deere-3020-116-scale-celebration/p/MLA2082879124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3235264330&sid=search) | $223.803 | -14.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tomy John Deere Johnny Tractor Ride-on: Juguete Infantil](https://www.mercadolibre.com.ar/tomy-john-deere-johnny-tractor-ride-en-juguete-juguete-de-de/p/MLA2027852984#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2174427890&sid=search) | $221.006 | -15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1713564907&sid=search) | $217.905 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1763349785&sid=search) | $312.737 | 19.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 117. Tractor 64 JD 7R 330 Row Crop John Deere

- ID Venturino: `281259425`
- Precio Venturino: $92.000
- Tokens: tractor, 64, 7r, 330, row, crop
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 108 válidos antes de top
- Candidatos excluidos por precio: 3037
- Candidatos excluidos por score: 966
- Mediana ML: $94.772
- Venturino vs mediana ML: -2.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA3214114070&sid=search) | $95.000 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2450624614&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2472089290&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1835352944&sid=search) | $112.120 | 21.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | -25.0% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1677885959&sid=search) | $65.990 | -28.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1472790549&sid=search) | $119.425 | 29.8% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 8 | media | 56 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3141293538&sid=search) | $122.099 | 32.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 9 | media | 55 | [Juego De Juguetes John Deere Mini Grain Bin 1/64 Con Tractor](https://www.mercadolibre.com.ar/toy-set-john-deere-mini-grain-bin-164-w-tractor-for-kids-3/p/MLA2071799529#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3111475566&sid=search) | $83.173 | -9.6% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 10 | media | 55 | [Tractor 2025 Ertl 1:64 John Deere 4955 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2025-ertl-164-john-deere-4955--a-pedidoexkarg/up/MLAU3262907220#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2141477802&sid=search) | $113.994 | 23.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 11 | media | 55 | [Tractor De Juguete John Deere 1/64 4230 Lp86726 Verde Y Amar](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726-verde-y-amar/up/MLAU3877165881#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA3148218346&sid=search) | $117.526 | 27.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | 2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | -6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Ertl John Deere Retroexcavadora Ertl 1/64](https://www.mercadolibre.com.ar/ertl-john-deere-retroexcavadora-ertl-164/up/MLAU173600216#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA791208779&sid=search) | $98.990 | 7.6% | tipo: JUGUETE; tokens comunes: 64; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381464&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | -9.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | -10.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 118. Tractor 6410 John Deere

- ID Venturino: `281053456`
- Precio Venturino: $400.000
- Tokens: tractor, 6410
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 115 válidos antes de top
- Candidatos excluidos por precio: 3729
- Candidatos excluidos por score: 267
- Mediana ML: $375.053
- Venturino vs mediana ML: 6.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens técnicos: 6410; tokens comunes: tractor, 6410; compatibilidad/marca: John Deere |
| 2 | alta | 70 | [John Deere Juguete Tractor 6410 A Escala 1:32 Con Vagon Y Rastras De Discos Marca Ertl](https://www.mercadolibre.com.ar/john-deere-juguete-tractor-6410-a-escala-132-con-vagon-y-rastras-de-discos-marca-ertl/p/MLA32426451#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=&sid=search) | $250.000 | -37.5% | tipo: JUGUETE; tokens técnicos: 6410; tokens comunes: tractor, 6410; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1514896991&sid=search) | $293.399 | -26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1507969023&sid=search) | $288.367 | -27.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1949945520&sid=search) | $265.905 | -33.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor De Juguete John Deere 730 Con Vagón Barcaza A Escala](https://www.mercadolibre.com.ar/toy-john-deere-730-tractor-with-barge-wagon-116-scale/p/MLA2081533429#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3380937872&sid=search) | $254.993 | -36.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1970561562&sid=search) | $247.506 | -38.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1571921115&sid=search) | $245.000 | -38.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1503458191&sid=search) | $555.586 | 38.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2550302558&sid=search) | $376.638 | -5.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1138213292&sid=search) | $373.467 | -6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2510969874&sid=search) | $438.999 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1501340737&sid=search) | $439.275 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 119. Tractor 8320R con disco 637John Deere

- ID Venturino: `281259399`
- Precio Venturino: $102.000
- Tokens: tractor, 8320r, disco, 637john
- Estado análisis: **similar a ML**
- Mejor confianza: alta
- Candidatos media/alta: 4
- Candidatos usados: 20 de 125 válidos antes de top
- Candidatos excluidos por precio: 3008
- Candidatos excluidos por score: 978
- Mediana ML: $100.000
- Venturino vs mediana ML: 2.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=item&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497) | $104.499 | 2.5% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 2 | alta | 75 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $104.499 | 2.5% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 3 | alta | 73 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=156eece7-bae3-4ba8-a8a7-f4b6b87aed62&wid=MLA3078939230&sid=search) | $84.861 | -16.8% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 4 | alta | 73 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1557066483&sid=search) | $142.598 | 39.8% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 5 | baja | 44 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | -7.3% | tipo: JUGUETE; tokens comunes: tractor |
| 6 | baja | 44 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -11.8% | tipo: JUGUETE; tokens comunes: tractor |
| 7 | baja | 44 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -11.8% | tipo: JUGUETE; tokens comunes: tractor |
| 8 | baja | 44 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | -15.7% | tipo: JUGUETE; tokens comunes: tractor |
| 9 | baja | 44 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | 20.5% | tipo: JUGUETE; tokens comunes: tractor |
| 10 | baja | 44 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -31.4% | tipo: JUGUETE; tokens comunes: tractor |
| 11 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1588501493&sid=search) | $102.006 | 0.0% | tipo: JUGUETE; tokens comunes: tractor |
| 12 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA1713519845&sid=search) | $102.006 | 0.0% | tipo: JUGUETE; tokens comunes: tractor |
| 13 | baja | 43 | [Ertl Iron John Deere Tractor Toy 3pack Includes John](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $102.234 | 0.2% | tipo: JUGUETE; tokens comunes: tractor |
| 14 | baja | 43 | [Linterna De Juguete John Deere Tomy Tractor Con Sonido Y Luz](https://www.mercadolibre.com.ar/flashlight-toy-john-deere-tomy-tractor-w-sound-light/p/MLA2079193836#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1986342552&sid=search) | $101.261 | -0.7% | tipo: JUGUETE; tokens comunes: tractor |
| 15 | baja | 43 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2450624614&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 16 | baja | 43 | [Tractor John Deere Escala 1/64 Modelos Color 6030](https://www.mercadolibre.com.ar/tractor-john-deere-escala-164-modelos-color-6030/p/MLA46521002#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2472089290&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 17 | baja | 43 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381464&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 18 | baja | 43 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2588150140&sid=search) | $98.632 | -3.3% | tipo: JUGUETE; tokens comunes: tractor |
| 19 | baja | 43 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2588174074&sid=search) | $105.593 | 3.5% | tipo: JUGUETE; tokens comunes: tractor |
| 20 | baja | 43 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | -5.6% | tipo: JUGUETE; tokens comunes: tractor |

### 120. Tractor 9470RX John Deere

- ID Venturino: `281222478`
- Precio Venturino: $95.000
- Tokens: tractor, 9470rx
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 114 válidos antes de top
- Candidatos excluidos por precio: 3046
- Candidatos excluidos por score: 951
- Mediana ML: $100.000
- Venturino vs mediana ML: -5.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | -0.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | -9.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 51 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -26.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 51 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | 29.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA3214114070&sid=search) | $95.000 | 0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | -5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA2450624614&sid=search) | $100.000 | 5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381464&sid=search) | $100.000 | 5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Linterna De Juguete John Deere Tomy Tractor Con Sonido Y Luz](https://www.mercadolibre.com.ar/flashlight-toy-john-deere-tomy-tractor-w-sound-light/p/MLA2079193836#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1986342552&sid=search) | $101.261 | 6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Ertl Iron John Deere Tractor Toy 3pack Includes John](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $102.234 | 7.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=item&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497) | $104.499 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $104.499 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | -13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2298914526&sid=search) | $108.299 | 14.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=19&type=item&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f) | $108.299 | 14.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1676425971&sid=search) | $108.618 | 14.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2842120858&sid=search) | $108.618 | 14.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 121. Tractor 9620RX John Deere

- ID Venturino: `281259422`
- Precio Venturino: $630.000
- Tokens: tractor, 9620rx
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 20 de 67 válidos antes de top
- Candidatos excluidos por precio: 3845
- Candidatos excluidos por score: 199
- Mediana ML: $516.667
- Venturino vs mediana ML: 21.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2735955816&sid=search) | $599.379 | -4.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA3260069348&sid=search) | $578.990 | -8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1503458191&sid=search) | $555.586 | -11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1165962632&sid=search) | $475.779 | -24.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1462618659&sid=search) | $452.361 | -28.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1241574644&sid=search) | $420.295 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1534604385&sid=search) | $399.880 | -36.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1767841826&sid=search) | $398.326 | -36.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1504753813&sid=search) | $554.343 | -12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1422054560&sid=search) | $733.573 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA3229211686&sid=search) | $478.990 | -24.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1501340737&sid=search) | $439.275 | -30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2510969874&sid=search) | $438.999 | -30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1537554751&sid=search) | $394.031 | -37.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | baja | 44 | [Tractor De Juguete Con Carro Cerealero Verde Y Amarillo](https://www.mercadolibre.com.ar/tractor-de-juguete-con-carro-cerealero-verde-y-amarillo/up/MLAU3636789908#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA2604933544&sid=search) | $815.147 | 29.4% | tipo: JUGUETE; tokens comunes: tractor |
| 16 | baja | 43 | [Tractor Tomy Monster Treads Lightning Wheels Con Luzes Y](https://www.mercadolibre.com.ar/tractor-tomy-monster-treads-lightning-wheels-con-luzes-y/up/MLAU3955807980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1779564783&sid=search) | $433.599 | -31.2% | tipo: JUGUETE; tokens comunes: tractor |
| 17 | baja | 41 | [Juguete Bruder 09823 1/16 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-bruder-09823-116-john-deere--a-pedidoexkarg/up/MLAU242460898#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1422234228&sid=search) | $633.284 | 0.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Cosechadora John Deere 9860 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-9860-132--a-pedidoexkarg/up/MLAU368490469#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1766538620&sid=search) | $621.670 | -1.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Cosechadora Ertl 1/32 Prestige John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-132-prestige-john-deere--a-pedidoexkarg/up/MLAU153228960#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1153528705&sid=search) | $645.153 | 2.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Pulverizador Autopropulsado Tomy Big Farm John Deere R4023 -](https://www.mercadolibre.com.ar/pulverizador-autopropulsado-tomy-big-farm-john-deere-r4023-/up/MLAU3556795787#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA1582423667&sid=search) | $646.999 | 2.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 122. Tractor Baler y vagon John Deere

- ID Venturino: `281222474`
- Precio Venturino: $94.000
- Tokens: tractor, baler, vagon
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 112 válidos antes de top
- Candidatos excluidos por precio: 3055
- Candidatos excluidos por score: 944
- Mediana ML: $94.772
- Venturino vs mediana ML: -0.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | 0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | -4.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381464&sid=search) | $100.000 | 6.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | -8.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | -11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | -12.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2298914526&sid=search) | $108.299 | 15.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1676425971&sid=search) | $108.618 | 15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $112.707 | 19.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -25.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | -26.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2860958990&sid=search) | $118.665 | 26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Juguete Tractor John Deere 9630 Articulado A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-9630-articulado-a-escala/up/MLAU3186101404#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381412&sid=search) | $120.000 | 27.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguete Tractor John Deere + Camioneta + Trailer (a Escala)](https://www.mercadolibre.com.ar/juguete-tractor-john-deere--camioneta--trailer-a-escala/up/MLAU3464286837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2419768292&sid=search) | $120.000 | 27.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381500&sid=search) | $120.000 | 27.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | 30.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA3214114070&sid=search) | $95.000 | 1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 123. Tractor con vagón John Deere

- ID Venturino: `281053467`
- Precio Venturino: $71.000
- Tokens: tractor, vagon
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 48 válidos antes de top
- Candidatos excluidos por precio: 3151
- Candidatos excluidos por score: 912
- Mediana ML: $83.333
- Venturino vs mediana ML: -14.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | 21.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 51 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | 26.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | 33.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2169077264&sid=search) | $74.053 | 4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | -11.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1575273767&sid=search) | $82.170 | 15.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3082491710&sid=search) | $83.493 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2351763726&sid=search) | $90.169 | 27.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA3214114070&sid=search) | $95.000 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Juego De Juguetes John Deere Mini Grain Bin 1/64 Con Tractor](https://www.mercadolibre.com.ar/toy-set-john-deere-mini-grain-bin-164-w-tractor-for-kids-3/p/MLA2071799529#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3111475566&sid=search) | $83.173 | 17.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Juego De Discos Ertl John Deere 8320r Tractor Modelo 637](https://www.mercadolibre.com.ar/juego-de-discos-ertl-john-deere-8320r-tractor-modelo-637/up/MLAU3986467167#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=156eece7-bae3-4ba8-a8a7-f4b6b87aed62&wid=MLA3078939230&sid=search) | $84.861 | 19.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1&wid=MLA3370300548&sid=search) | $48.062 | -32.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=&sid=search) | $96.260 | 35.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2588150140&sid=search) | $98.632 | 38.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 124. Tractor de pala grande John Deere de 21" con cargador

- ID Venturino: `281259417`
- Precio Venturino: $580.000
- Tokens: tractor, pala, grande, 21, cargador
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 16
- Candidatos usados: 20 de 75 válidos antes de top
- Candidatos excluidos por precio: 3812
- Candidatos excluidos por score: 224
- Mediana ML: $464.070
- Venturino vs mediana ML: 25.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2735955816&sid=search) | $599.379 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, cargador; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA3260069348&sid=search) | $578.990 | -0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1503458191&sid=search) | $555.586 | -4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1165962632&sid=search) | $475.779 | -18.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1462618659&sid=search) | $452.361 | -22.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1241574644&sid=search) | $420.295 | -27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1534604385&sid=search) | $399.880 | -31.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1767841826&sid=search) | $398.326 | -31.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA1504753813&sid=search) | $554.343 | -4.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=d100933a-8745-47ee-90c9-19d40406f603&wid=MLA3229211686&sid=search) | $478.990 | -17.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1501340737&sid=search) | $439.275 | -24.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2510969874&sid=search) | $438.999 | -24.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1422054560&sid=search) | $733.573 | 26.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=157a59ac-0888-4a44-83e5-fe9337e3e88c&wid=MLA1537554751&sid=search) | $394.031 | -32.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2550302558&sid=search) | $376.638 | -35.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=04810f27-2c80-4d63-b474-07d217ac0aa2&wid=MLA1138213292&sid=search) | $373.467 | -35.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | baja | 42 | [Tractor Tomy Monster Treads Lightning Wheels Con Luzes Y](https://www.mercadolibre.com.ar/tractor-tomy-monster-treads-lightning-wheels-con-luzes-y/up/MLAU3955807980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34&wid=MLA1779564783&sid=search) | $433.599 | -25.2% | tipo: JUGUETE; tokens comunes: tractor |
| 18 | baja | 41 | [Cosechadora John Deere 1/32 S780 Combine - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-132-s780-combine--a-pedidoexkarg/up/MLAU2913398397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1468790321&sid=search) | $572.999 | -1.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Bruder 09829 John Deere 7r 350 Con Remolque Y Troncos De Mad](https://www.mercadolibre.com.ar/bruder-09829-john-deere-7r-350-con-remolque-y-troncos-de-mad/up/MLAU3564192698#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA1582462399&sid=search) | $567.999 | -2.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Set Ertl 1/50 John Deere 904 + Kenworth - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-150-john-deere-904--kenworth--a-pedidoexkarg/up/MLAU3492586803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA1559568291&sid=search) | $597.880 | 3.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 125. Tractor J7R 330 John Deere Prestige

- ID Venturino: `281259428`
- Precio Venturino: $112.000
- Tokens: tractor, j7r, 330, prestige
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 139 válidos antes de top
- Candidatos excluidos por precio: 2945
- Candidatos excluidos por score: 1027
- Mediana ML: $108.618
- Venturino vs mediana ML: 3.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Ertl Tractor John Deere 8760 1:64 Prestige](https://www.mercadolibre.com.ar/ertl-tractor-john-deere-8760-164-prestige/up/MLAU3572491218#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1585558467&sid=search) | $155.000 | 38.4% | tipo: JUGUETE; tokens comunes: tractor, prestige; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | -15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -19.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -19.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | -23.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1498485099&sid=search) | $150.000 | 33.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | -37.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1835352944&sid=search) | $112.120 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $112.707 | 0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3036951256&sid=search) | $109.135 | -2.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1676425971&sid=search) | $108.618 | -3.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2842120858&sid=search) | $108.618 | -3.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2298914526&sid=search) | $108.299 | -3.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964837#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964837&search_layout=grid&position=19&type=item&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f) | $108.299 | -3.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tomy John Deere Tractor Toys Set Económico Y Estuche De De 3](https://www.mercadolibre.com.ar/toy-set-john-deere-value-w-carrying-case-18-farm-toys-3/p/MLA2063188934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2587960726&sid=search) | $117.753 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2588174074&sid=search) | $105.593 | -5.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2860958990&sid=search) | $118.665 | 6.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1472790549&sid=search) | $119.425 | 6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2142680582-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=item&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497) | $104.499 | -6.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 126. Tractor John Deere 6210R

- ID Venturino: `281259398`
- Precio Venturino: $122.000
- Tokens: tractor, 6210r
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 150 válidos antes de top
- Candidatos excluidos por precio: 2932
- Candidatos excluidos por score: 1029
- Mediana ML: $119.333
- Venturino vs mediana ML: 2.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://www.mercadolibre.com.ar/tractor-john-deere-buildabuddy-con-taladro-stem/up/MLAU3985019343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1766685039&sid=search) | $122.951 | 0.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Build-a-buddy Tractor John Deere De Juguete Y Taladro De Con](https://www.mercadolibre.com.ar/build-a-buddy-tractor-john-deere-de-juguete-y-taladro-de-con/p/MLA2073497587#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA3197623976&sid=search) | $94.543 | -22.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1498485099&sid=search) | $150.000 | 23.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 51 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1729585581&sid=search) | $90.000 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2545404244&sid=search) | $89.980 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-buildajohnny/up/MLAU4012320204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1980129574&sid=search) | $86.001 | -29.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA3141293538&sid=search) | $122.099 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor De Juguete Tomy John Deere De Plástico Verde Para Ni](https://articulo.mercadolibre.com.ar/MLA-1556356895-tractor-de-juguete-tomy-john-deere-de-plastico-verde-para-ni-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ad1d7b7f-a6f0-44c0-a14c-1be588976f34) | $121.675 | -0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Juguete Tractor John Deere 9630 Articulado A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-9630-articulado-a-escala/up/MLAU3186101404#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381412&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juguete Tractor John Deere + Camioneta + Trailer (a Escala)](https://www.mercadolibre.com.ar/juguete-tractor-john-deere--camioneta--trailer-a-escala/up/MLAU3464286837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2419768292&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2086381500&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juguete Tractor Musical John Deere Con Sonidos De Animales Y](https://www.mercadolibre.com.ar/musical-tractor-toy-john-deere-animal-sounds-w-farmer-18m/p/MLA2067090499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2860958990&sid=search) | $118.665 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Monster Truck John Deere De Juguete Con Luces Y Soni](https://www.mercadolibre.com.ar/toy-john-deere-monster-truck-tractor-w-lights-sounds/p/MLA2039435135#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA2142655686&sid=search) | $127.435 | 4.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Juguete Controlado Por Radio John Deere Johnny Tractor Green](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA1984545398&sid=search) | $128.104 | 5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor Monstruo John Deere De Juguete Para Niños Pequeños](https://articulo.mercadolibre.com.ar/MLA-1981206786-tractor-monstruo-john-deere-de-juguete-para-ninos-pequenos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=item&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6) | $112.707 | -7.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Ertl John Deere 6410 Juego De Juguetes Para Tractores Escala](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2587960888&sid=search) | $132.360 | 8.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA3036951256&sid=search) | $109.135 | -10.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1676425971&sid=search) | $108.618 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://www.mercadolibre.com.ar/john-deere-monster-treads-tractor-toy-with-wagon-toys-wit/p/MLA2027622620#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2842120858&sid=search) | $108.618 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&tracking_id=55a2e4f4-1bcb-40ee-baeb-5543e0a7393f&wid=MLA2298914526&sid=search) | $108.299 | -11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 127. Tractor John Deere Flashight

- ID Venturino: `281053462`
- Precio Venturino: $52.000
- Tokens: tractor, flashight
- Estado análisis: **similar a ML**
- Mejor confianza: media
- Candidatos media/alta: 8
- Candidatos usados: 20 de 20 válidos antes de top
- Candidatos excluidos por precio: 3297
- Candidatos excluidos por score: 794
- Mediana ML: $55.328
- Venturino vs mediana ML: -6.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1606696085&sid=search) | $50.000 | -3.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129779289&sid=search) | $70.000 | 34.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=302098b5-ddc0-4624-aeb1-0b4377ada9ab&wid=MLA3130984732&sid=search) | $62.684 | 20.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1677885959&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1677937795&sid=search) | $68.990 | 32.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA2271017754&sid=search) | $69.600 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Ya Llavero De Tractor John Deere 8r 410 - 45746 Verde 2026\](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=4d9312e7-ba9c-4bf6-a458-cd7ac54570f1&wid=MLA3370300548&sid=search) | $48.062 | -7.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Juego De Sábanas John Deere Tractor Tamaño Individual Beige Background With Green Tractors Tractor Print (john Deere)](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=c16aa449-915e-4e26-b668-5db9b6624f46&wid=MLA3188096720&sid=search) | $69.858 | 34.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | baja | 44 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA1639819361&sid=search) | $33.275 | -36.0% | tipo: JUGUETE; tokens comunes: tractor |
| 10 | baja | 41 | [Rotoenfardadora John Deere Miniatura 3d Escala 1:32](https://www.mercadolibre.com.ar/rotoenfardadora-john-deere-miniatura-3d-escala-132/up/MLAU3743647432#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=d67adfaa-5752-4fc8-92bb-5da1e1153497&wid=MLA2792533012&sid=search) | $52.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Juguete Cosechador Lego Technic John Deere 1470h Para Mayore](https://www.mercadolibre.com.ar/lego-technic-john-deere-1470h-cosechadora-42218/p/MLA2064409630#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=dea0220a-dd9a-4747-ba3e-6a1c7ce43ad6&wid=MLA1688882031&sid=search) | $58.656 | 12.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA3316369844&sid=search) | $42.000 | -19.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=befae925-21b0-444d-a4b3-fa07423d637f&wid=MLA1725054925&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1508081573&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1508168125&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Bulldozer Ertl Esc 1.18 John Deere Para Repuesto Ver Fotos](https://www.mercadolibre.com.ar/bulldozer-ertl-esc-118-john-deere-para-repuesto-ver-fotos/up/MLAU182247296#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=da44d555-ec5a-4f70-8317-f8fa0fe3bc57&wid=MLA1391581274&sid=search) | $68.900 | 32.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=f297829a-ae1d-413e-850a-526f6e8a76ff&wid=MLA1784433071&sid=search) | $32.990 | -36.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 35 | [Arado A Escala 3d Farming Simulator](https://www.mercadolibre.com.ar/arado-a-escala-3d-farming-simulator/up/MLAU148754321#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA1129754952&sid=search) | $50.000 | -3.8% | tipo: JUGUETE |
| 19 | baja | 35 | [Caballo De Juguete De Pura Sangre, Escala Ertl A Detalle](https://www.mercadolibre.com.ar/caballo-de-juguete-de-pura-sangre-escala-ertl-a-detalle/up/MLAU4012809832#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=526e68ba-8364-4b29-a84c-4357785a91c5&wid=MLA2169086748&sid=search) | $62.745 | 20.7% | tipo: JUGUETE |
| 20 | baja | 35 | [Trailer A Escala Acoplado Jaula Siku Aleman](https://www.mercadolibre.com.ar/trailer-a-escala-acoplado-jaula-siku-aleman/up/MLAU3633336756#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=bf2a25e5-4a22-4e44-8e10-2dd29b12c0ae&wid=MLA2600993544&sid=search) | $39.980 | -23.1% | tipo: JUGUETE |

## Observaciones Para Iteración

- Revisar candidatos de baja confianza para detectar falsos positivos y nuevos sinónimos.
- Si aparecen matches por `John Deere` sin tipo de producto coincidente, bajar peso de marca o subir score mínimo.
- Si productos válidos quedan afuera por precio, ajustar banda sólo en UI; para reporte se mantiene ±40%.
- Si muchos nombres técnicos quedan sin comparable, ampliar diccionario de tipos y tokens equivalentes.
