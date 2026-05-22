# Análisis de Matches Postventa

Generado: 2026-05-22T18:54:21.354Z

## Parámetros

- Colección Mongo: `algorym.productos`
- Venturino activo: 2026-05-19
- ML activo: 2026-05-20
- Muestra Venturino: 127
- Top candidatos por producto: 20
- Banda de precio: ±40%
- Score mínimo: 20

## Criterios Del Algoritmo

- Se usan sólo productos activos de la última extracción de cada origen.
- Venturino se deduplica por `producto_id`; ML se deduplica por `ml_item_id`.
- Los candidatos ML fuera de la banda de precio configurada se excluyen antes del scoring.
- El scoring combina tipo de producto, tokens técnicos, tokens comunes, compatibilidad de marca y penalizaciones por tipos incompatibles.
- La mediana ML se calcula con los candidatos aceptados dentro del top configurado.
- Los estados del análisis priorizan confianza: sin candidatos, baja confianza, y luego comparación contra mediana ML.

## Perfil De Datos

- Productos Venturino activos: 127 únicos (127 registros crudos)
- Productos ML activos: 3903 únicos (4253 registros crudos)
- Venturino con precio: 127
- ML con precio: 3903

## Resumen De La Muestra

- Venturino más caro que ML: 46
- sin comparable: 60
- Venturino más barato que ML: 19
- baja confianza: 2

Confianza de candidatos usados:
- media: 626
- alta: 12
- baja: 311

## Muestra Y Candidatos

### 1. Aceite de Motor Premium John Deere Plus-50™ II. John Deere

- ID Venturino: `318717662`
- Precio Venturino: $238.000
- Tokens: aceite, motor, premium, plus-50, ii
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3192
- Candidatos excluidos por score: 710
- Mediana ML: $211.983
- Venturino vs mediana ML: 12.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Aceite Motor Torq Gard 2 15w40 John Deere 20l](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=%2FYcJCw5D6LTRafVw4nfj78jTBZmMJ6v%2Fxu4xNqeREIam%2ByixPm%2Fr2cmb1fdR4bLshl4ve6%2BeJ%2Fll0eIkaYV4zJJlE5fb73F%2BtzPJvuAZ6U9i5JhC4WCB4nD%2BqNtDXm0gkqpkS8Ura%2Fqyia9Amr0SAf6az5UtJU73WL5cLclFmFiJvYBFjulp7y%2FF3mPQvJT722pgSxPCc8GZ%2FnaizUS4nmP8yBI7LwjVLJRjrYIVG0mVqmrjaD6tjqwja43d%2FMd%2BmajVXJLHguYHG5tPjUCVl19qMBxl9rTLP56nGApPHfzbNwKdyMRfxzf6S2HESBZJp32n29s6fiJMPMYo7as4aF4IxEpJibDEtKqG%2BNJOmpnm0ZiZEK%2BDSIDuJJm3eSSy7wzH7zdJkkdpW%2BG4SsjwuRhAUuytZJ4SWm5HYZ04QTDxZ2Eg1S0OAjTUrYX3TCwgw8OUFgnKx3APi99gKHxjtTPys2mih%2ByMgvEp14ALnCpI98IomhBcoQfHIfr5N7a6LQKG90Uljod5zCeBnkQmns%2B87Fc%2BKD4VxeCv%2FhdVkMd9j%2BGcOw9ZtRebK3WRRfBCZaaexeouuR%2FlGsV%2BTqKx66nwrrE8NVuYrmIACAzqT%2BlN%2FxwDrZ%2BwtsARE9Q0KUS4hMvdr3HfUoEV5DKhcOkELx%2FRRq0qDsj2hdE7hpE6BzIcoNGJGF7VqTySR0BrrdED5w3HeJ3IVqTXeTCRE4U8OmA%2FOZCw8UpTul8xvQD4g2%2FG2BMFpu0qnG7usnEcT%2BEiMeZWWEBUeChrfNR%2BnzYC6Pfzu8XhCit4CWk%2FQ7YP1a4P0vmy6UCNJ5W3dqLLY%2BzvNZp6ZDjx%2FT6VaP1mWeujSWIWnFtTIaj0RRhdBIKqh7FZEEFT9aui9EuhiZyl7VwWIdbQd2m80L6%2FGeoy0M3T2df%2FZ6nELRRR14%2B0uZiMUvXX3LvHpZJlddUy8gLyfDbcSmvbZpEqvUCQjxn%2F%2F1q6OxhX19F7BeuWhPKz8lso&pdp_filters=item_id%3AMLA852379599#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU200014934&backend_model=search-backend&float_highlight=last_unit&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA852379599&sid=search) | $211.983 | -10.9% | tipo: ACEITE; tokens comunes: aceite, motor; compatibilidad/marca: John Deere |

### 2. Generador Honda EZ3000CX – 3 KVA

- ID Venturino: `332862512`
- Precio Venturino: $1.165.943
- Tokens: generador, honda, ez3000cx, 3, kva
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3821
- Candidatos excluidos por score: 82
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
- Candidatos excluidos por precio: 3746
- Candidatos excluidos por score: 157
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 4. Tractor John Deere 8R para cultivos en hileras

- ID Venturino: `281259424`
- Precio Venturino: $71.000
- Tokens: tractor, 8r, cultivo, hilera
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 48 válidos antes de top
- Candidatos excluidos por precio: 2974
- Candidatos excluidos por score: 881
- Mediana ML: $69.929
- Venturino vs mediana ML: 1.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Llavero John Deere 8r 410 Tractor Fundido A Presión](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=871acca8-5df7-419b-bd05-056c65e49990&wid=MLA3234660246&sid=search) | $62.349 | -12.2% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | 26.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | 27.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | 0.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2169077264&sid=search) | $74.053 | 4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=12&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $75.376 | 6.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | 6.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | -10.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | -11.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | 15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 5. Aceite de Motor John Deere Torq-Gard™ II. John Deere

- ID Venturino: `318727927`
- Precio Venturino: $175.000
- Tokens: aceite, motor, torq-gard, ii
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 2946
- Candidatos excluidos por score: 956
- Mediana ML: $211.983
- Venturino vs mediana ML: -17.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Aceite Motor Torq Gard 2 15w40 John Deere 20l](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=%2FYcJCw5D6LTRafVw4nfj78jTBZmMJ6v%2Fxu4xNqeREIam%2ByixPm%2Fr2cmb1fdR4bLshl4ve6%2BeJ%2Fll0eIkaYV4zJJlE5fb73F%2BtzPJvuAZ6U9i5JhC4WCB4nD%2BqNtDXm0gkqpkS8Ura%2Fqyia9Amr0SAf6az5UtJU73WL5cLclFmFiJvYBFjulp7y%2FF3mPQvJT722pgSxPCc8GZ%2FnaizUS4nmP8yBI7LwjVLJRjrYIVG0mVqmrjaD6tjqwja43d%2FMd%2BmajVXJLHguYHG5tPjUCVl19qMBxl9rTLP56nGApPHfzbNwKdyMRfxzf6S2HESBZJp32n29s6fiJMPMYo7as4aF4IxEpJibDEtKqG%2BNJOmpnm0ZiZEK%2BDSIDuJJm3eSSy7wzH7zdJkkdpW%2BG4SsjwuRhAUuytZJ4SWm5HYZ04QTDxZ2Eg1S0OAjTUrYX3TCwgw8OUFgnKx3APi99gKHxjtTPys2mih%2ByMgvEp14ALnCpI98IomhBcoQfHIfr5N7a6LQKG90Uljod5zCeBnkQmns%2B87Fc%2BKD4VxeCv%2FhdVkMd9j%2BGcOw9ZtRebK3WRRfBCZaaexeouuR%2FlGsV%2BTqKx66nwrrE8NVuYrmIACAzqT%2BlN%2FxwDrZ%2BwtsARE9Q0KUS4hMvdr3HfUoEV5DKhcOkELx%2FRRq0qDsj2hdE7hpE6BzIcoNGJGF7VqTySR0BrrdED5w3HeJ3IVqTXeTCRE4U8OmA%2FOZCw8UpTul8xvQD4g2%2FG2BMFpu0qnG7usnEcT%2BEiMeZWWEBUeChrfNR%2BnzYC6Pfzu8XhCit4CWk%2FQ7YP1a4P0vmy6UCNJ5W3dqLLY%2BzvNZp6ZDjx%2FT6VaP1mWeujSWIWnFtTIaj0RRhdBIKqh7FZEEFT9aui9EuhiZyl7VwWIdbQd2m80L6%2FGeoy0M3T2df%2FZ6nELRRR14%2B0uZiMUvXX3LvHpZJlddUy8gLyfDbcSmvbZpEqvUCQjxn%2F%2F1q6OxhX19F7BeuWhPKz8lso&pdp_filters=item_id%3AMLA852379599#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU200014934&backend_model=search-backend&float_highlight=last_unit&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA852379599&sid=search) | $211.983 | 21.1% | tipo: ACEITE; tokens comunes: aceite, motor; compatibilidad/marca: John Deere |

### 6. Jarro Bayo John Deere

- ID Venturino: `338232089`
- Precio Venturino: $31.000
- Tokens: jarro, bayo
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3079
- Candidatos excluidos por score: 824
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 7. Motobomba Honda WB20XH2

- ID Venturino: `340632800`
- Precio Venturino: $1.362.010
- Tokens: motobomba, honda, wb20xh2
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3847
- Candidatos excluidos por score: 56
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 8. Tractor Johny John Deere a control remoto

- ID Venturino: `281053479`
- Precio Venturino: $145.000
- Tokens: tractor, johny, control, remoto
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 153 válidos antes de top
- Candidatos excluidos por precio: 2825
- Candidatos excluidos por score: 925
- Mediana ML: $143.349
- Venturino vs mediana ML: 1.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 69 | [Tractor Johnny John Deere A Control Remoto Verde](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1676451917&sid=search) | $128.454 | -11.4% | tipo: JUGUETE; tokens comunes: tractor, control, remoto; compatibilidad/marca: John Deere |
| 2 | media | 65 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1588597639&sid=search) | $107.949 | -25.6% | tipo: JUGUETE; tokens comunes: tractor, control, remoto; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1498485099&sid=search) | $150.000 | 3.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | -15.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -37.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor 1:64 John Deere 8rx 410 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8rx-410--a-pedidoexkarg/up/MLAU159998621#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1376655339&sid=search) | $145.546 | 0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3263270113#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2149326968&sid=search) | $144.099 | -0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA1557066483&sid=search) | $142.598 | -1.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Tractor John Deere 8420 + Enfardadora 568 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-8420--enfardadora-568-a-escala/up/MLAU3180535879#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086420252&sid=search) | $150.000 | 3.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Ertl John Deere 6410 Juego De Juguetes Para Tractores Escala](https://www.mercadolibre.com.ar/ertl-john-deere-6410-toy-set-132-escala-incluye-disco-de-y/p/MLA2049672839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2587947996&sid=search) | $136.890 | -5.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Set De Juguetes John Deere Haying A Escala 1/32 Con Tractor,](https://articulo.mercadolibre.com.ar/MLA-2470290950-set-de-juguetes-john-deere-haying-a-escala-132-con-tractor-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $136.191 | -6.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor De Juguete John Deere 2640 Field Of Dreams Lp](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-2640-field-of-dreams-lp/p/MLA2053419470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2597542598&sid=search) | $154.233 | 6.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Ertl Tractor John Deere 8760 1:64 Prestige](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=MFXDmekm71RwLdL25Sd87TvRTuHOKbw5h4P4X482is8HmHzbYajzVoMYqX%2FliRc%2B2gVDnPwBdZiBwp9J3dTMPN%2BSYkB7gQgG2ngfwmJdNTFjL0gEQLj0i2g%2F8NHWOHPLF6itExFbfx2YOtpnkMnhGvIqF18F8KkAqIALkBkazrRhDeFy5ABYlSkcQDtSPmv0QTZHnAcTDdKHA%2BjZnzUAHBYxJMpCYz%2F7ad2dvP6UzOALzSgyVWTOZ39T6b4y%2FWu2lhn0mkkO7rr%2Bau7%2BNiehMlEQeoJ2gZNYoHce50ThpGfsAlUc6fmyDCKjGZYM9MQdbh7BowBPZ9D0qTIixoIXiOlTYDrtIBRSQrCUnTBVCoAYydfWH48urjLkfCTZwwAHZpDzP3M8BTf6kn096ji3FzVb7ts1e3L%2F905mPdZhdbtVwDj1rnJLTyf4%2B9RrWY4aeNoGyCyTUzHFRV7Y1g69kpE6lCYkbIl3B5KJMg5%2Fm1jYh6u9LDOHKbR1OHJmOGC0Lj7k4RVe76Fo9F8g5F206Akk3ule%2Fm%2FTi0rgnFcxHouHaUkiweRbH%2BrV75isUUC7g%2BWHiuoyuNw2ZBF7f4iIvdWNtdCoodlOUEAYSwnvp9v7R%2B53XZ%2Fz0HsQJHJDy%2BoAp8KtqWpWrpnYh%2B0BYmP%2FdpRI5khI9SL%2BbNfWXUGiHKVbHyz5zB6vMu2Njo6zxWPmHnIOG1RQoh1kwHasqFd1328gA0l0YiLpcaIKVd23Mj0UTfrAohmnSuXv9ZBYb1hryZz5WpWDjlsL5n5IhBz%2BUSzJbLs%2Fg16OH0PRAkQK%2BNyglOTehrvHWhTMKyoe3CHlL8sdt3BdQEuBnnabliTBEQ0mvjC6T6PnaZwpfDfIkmNphwl2NvbFr2jQG%2F7OESryoYdk92vay5Q%2FDZqN%2Be%2BlXnAX%2B1xN%2Fl1e8T4Bo4atF808ncMQ47BnERizs8%2FCxDTTMG4JoBFrGcJn%2BPh%2FXbghMcz3%2Fw%3D%3D&pdp_filters=item_id%3AMLA1585558467#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3572491218&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA1585558467&sid=search) | $155.000 | 6.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere 7260r 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7260r-164--a-pedidoexkarg/up/MLAU3005755665#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA2012178172&sid=search) | $157.576 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor Cortacésped Toy Bruder Bworld John Deere Con Remolqu](https://www.mercadolibre.com.ar/toy-bruder-bworld-john-deere-lawn-tractor-w-trailer-garde/p/MLA2057234803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2835314042&sid=search) | $159.021 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1662281537&sid=search) | $130.293 | -10.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor John Deere Ertl 6410 De Vehículos Fundidos A Escala](https://www.mercadolibre.com.ar/die-cast-vehicles-john-deere-ertl-6410-tractor-132-scale/p/MLA2051622830#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2470173046&sid=search) | $160.936 | 11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Juguete De Construcción John Deere Tractor Con Taladro 16 Ve](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16-ve/up/MLAU3890909392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1736581317&sid=search) | $160.998 | 11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 9. Batería John Deere StrongBox™ 12 V 110 Ah. John Deere

- ID Venturino: `318732486`
- Precio Venturino: $560.000
- Tokens: bateria, strongbox, 12, v, 110, ah
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3596
- Candidatos excluidos por score: 307
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 10. Juego de tubos SAE ¼” John Deere Set de 21 piezas

- ID Venturino: `276679543`
- Precio Venturino: $149.000
- Tokens: juego, tubo, sae, set, 21, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 7
- Candidatos usados: 19 de 19 válidos antes de top
- Candidatos excluidos por precio: 2848
- Candidatos excluidos por score: 1036
- Mediana ML: $117.784
- Venturino vs mediana ML: 26.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1721056741&sid=search) | $99.990 | -32.9% | tipo: HERRAMIENTA; tokens comunes: juego, tubo, pieza |
| 2 | media | 56 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1510545543&sid=search) | $135.947 | -8.8% | tipo: HERRAMIENTA; tokens comunes: juego, tubo, pieza |
| 3 | media | 56 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA922576085&sid=search) | $111.000 | -25.5% | tipo: HERRAMIENTA; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3242261346&sid=search) | $139.998 | -6.0% | tipo: HERRAMIENTA; tokens comunes: pieza; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323710072&sid=search) | $118.999 | -20.1% | tipo: HERRAMIENTA; tokens comunes: juego, tubo |
| 6 | media | 49 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2491947770&sid=search) | $94.543 | -36.5% | tipo: HERRAMIENTA; tokens comunes: juego; compatibilidad/marca: John Deere |
| 7 | media | 48 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3126102700&sid=search) | $194.998 | 30.9% | tipo: HERRAMIENTA; tokens comunes: pieza; compatibilidad/marca: John Deere |
| 8 | baja | 43 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2308233004&sid=search) | $114.799 | -23.0% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 9 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Sí Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-si-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1562325653&sid=search) | $131.905 | -11.5% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 10 | baja | 42 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1448971691&sid=search) | $110.268 | -26.0% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 11 | baja | 41 | [Switch Tambor De Arranque Sin Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-sin-llave-tractores-john-deere/up/MLAU155926304#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1245977771&sid=search) | $151.758 | 1.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [John Deere Pop Up Upp Tractor Playhouse Para Niños \| Llave Y](https://www.mercadolibre.com.ar/john-deere-pop-up-upp-tractor-playhouse-para-ninos-llave-y/p/MLA2068378549#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2382371904&sid=search) | $117.784 | -21.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Switch Tambor De Arranque Con Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-con-llave-tractores-john-deere/up/MLAU3120846470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2050159868&sid=search) | $189.097 | 26.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94f1e34d-fd49-461c-a867-d50402b5cd6a&wid=MLA1399126385&sid=search) | $93.489 | -37.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 15 | baja | 35 | [For Kit De Herramienta De De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-metal-for-john-deere/p/MLA2024534734#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2464989688&sid=search) | $115.762 | -22.3% | tipo: HERRAMIENTA |
| 16 | baja | 35 | [Kit De Herramienta De Giro De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-for-john-deere/p/MLA2027963136#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2399369304&sid=search) | $103.313 | -30.7% | tipo: HERRAMIENTA |
| 17 | baja | 31 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | -12.0% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 31 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | -17.6% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 31 | [John Deere Power Tools Motosierra De Juguete, Herramienta De](https://www.mercadolibre.com.ar/john-deere-power-tools-chainsaw-toy-construction-tool-with/p/MLA2045929485#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2491947932&sid=search) | $92.688 | -37.8% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |

### 11. Tractor con empacadora, vagón y 12 pacas de heno John Deere

- ID Venturino: `281234465`
- Precio Venturino: $400.000
- Tokens: tractor, empacadora, vagon, 12, paca, heno
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 118 válidos antes de top
- Candidatos excluidos por precio: 3514
- Candidatos excluidos por score: 271
- Mediana ML: $399.103
- Venturino vs mediana ML: 0.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2550302558&sid=search) | $345.341 | -13.7% | tipo: JUGUETE; tokens comunes: tractor, vagon; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Empacadora John Deere De Coleccion Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/empacadora-john-deere-de-coleccion-bruder--a-pedidoexkarg/up/MLAU149484839#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1144752768&sid=search) | $412.660 | 3.2% | tipo: JUGUETE; tokens comunes: empacadora; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Vagón De Tren John Deere Escala O Lionel](https://www.mercadolibre.com.ar/vagon-de-tren-john-deere-escala-o-lionel/up/MLAU3915674437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3233211424&sid=search) | $481.099 | 20.3% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 48 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Set De Triciclo Y Vagón John Deere Para Niños A Partir De 18](https://www.mercadolibre.com.ar/tricycle-and-wagon-set-john-deere-for-kids-18-months/p/MLA2064510072#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1561940567&sid=search) | $414.455 | 3.6% | tipo: JUGUETE; tokens comunes: vagon; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1138213292&sid=search) | $373.467 | -6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Lego Technic John Deere 9620r Tractor 4wd 42136 Juguete De C](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-tractor-4wd-42136-juguete-de-c/up/MLAU3517467383#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1568723167&sid=search) | $372.999 | -6.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2510969874&sid=search) | $438.999 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1501340737&sid=search) | $439.275 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Tractor John Deere 8360rt Oruga Escala 1:32 Ertl Colección](https://www.mercadolibre.com.ar/tractor-john-deere-8360rt-oruga-escala-132-ertl-coleccion/up/MLAU3926699882#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3232804188&sid=search) | $345.000 | -13.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1503208905&sid=search) | $332.996 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1949971056&sid=search) | $323.265 | -19.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA3229211686&sid=search) | $478.990 | 19.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 12. Aditivo Mejorador de Combustible John Deere

- ID Venturino: `318861703`
- Precio Venturino: $172.000
- Tokens: aditivo, mejorador, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2926
- Candidatos excluidos por score: 977
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 13. Tractor Johnny para armar John Deere

- ID Venturino: `281259378`
- Precio Venturino: $42.000
- Tokens: tractor, johnny, armar
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 4
- Candidatos usados: 10 de 10 válidos antes de top
- Candidatos excluidos por precio: 3038
- Candidatos excluidos por score: 855
- Mediana ML: $36.488
- Venturino vs mediana ML: 15.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 52 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1639819361&sid=search) | $33.275 | -20.8% | tipo: JUGUETE; tokens comunes: tractor, armar |
| 2 | media | 51 | [Tractor De Juguete John Deere Erlt](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-erlt/up/MLAU3327338120#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2202515476&sid=search) | $29.980 | -28.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1606696085&sid=search) | $50.000 | 19.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguete Tractor Tipo Caricatura John Deere Ertl](https://www.mercadolibre.com.ar/juguete-tractor-tipo-caricatura-john-deere-ertl/up/MLAU262732766#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1476364034&sid=search) | $28.990 | -31.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA3316369844&sid=search) | $42.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA1588571170&sid=search) | $39.775 | -5.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1508168125&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1508081573&sid=search) | $36.488 | -13.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA1784433071&sid=search) | $32.990 | -21.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 35 | [Arado A Escala 3d Farming Simulator](https://www.mercadolibre.com.ar/arado-a-escala-3d-farming-simulator/up/MLAU148754321#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129754952&sid=search) | $50.000 | 19.0% | tipo: JUGUETE |

### 14. Seccion de corte, cuchilla de draper John Deere

- ID Venturino: `318735588`
- Precio Venturino: $9.300
- Tokens: seccion, corte, cuchilla, draper
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3517
- Candidatos excluidos por score: 386
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
- Candidatos excluidos por precio: 3896
- Candidatos excluidos por score: 7
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
- Candidatos excluidos por precio: 2990
- Candidatos excluidos por score: 912
- Mediana ML: $211.983
- Venturino vs mediana ML: -10.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 48 | [Aceite Motor Torq Gard 2 15w40 John Deere 20l](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=%2FYcJCw5D6LTRafVw4nfj78jTBZmMJ6v%2Fxu4xNqeREIam%2ByixPm%2Fr2cmb1fdR4bLshl4ve6%2BeJ%2Fll0eIkaYV4zJJlE5fb73F%2BtzPJvuAZ6U9i5JhC4WCB4nD%2BqNtDXm0gkqpkS8Ura%2Fqyia9Amr0SAf6az5UtJU73WL5cLclFmFiJvYBFjulp7y%2FF3mPQvJT722pgSxPCc8GZ%2FnaizUS4nmP8yBI7LwjVLJRjrYIVG0mVqmrjaD6tjqwja43d%2FMd%2BmajVXJLHguYHG5tPjUCVl19qMBxl9rTLP56nGApPHfzbNwKdyMRfxzf6S2HESBZJp32n29s6fiJMPMYo7as4aF4IxEpJibDEtKqG%2BNJOmpnm0ZiZEK%2BDSIDuJJm3eSSy7wzH7zdJkkdpW%2BG4SsjwuRhAUuytZJ4SWm5HYZ04QTDxZ2Eg1S0OAjTUrYX3TCwgw8OUFgnKx3APi99gKHxjtTPys2mih%2ByMgvEp14ALnCpI98IomhBcoQfHIfr5N7a6LQKG90Uljod5zCeBnkQmns%2B87Fc%2BKD4VxeCv%2FhdVkMd9j%2BGcOw9ZtRebK3WRRfBCZaaexeouuR%2FlGsV%2BTqKx66nwrrE8NVuYrmIACAzqT%2BlN%2FxwDrZ%2BwtsARE9Q0KUS4hMvdr3HfUoEV5DKhcOkELx%2FRRq0qDsj2hdE7hpE6BzIcoNGJGF7VqTySR0BrrdED5w3HeJ3IVqTXeTCRE4U8OmA%2FOZCw8UpTul8xvQD4g2%2FG2BMFpu0qnG7usnEcT%2BEiMeZWWEBUeChrfNR%2BnzYC6Pfzu8XhCit4CWk%2FQ7YP1a4P0vmy6UCNJ5W3dqLLY%2BzvNZp6ZDjx%2FT6VaP1mWeujSWIWnFtTIaj0RRhdBIKqh7FZEEFT9aui9EuhiZyl7VwWIdbQd2m80L6%2FGeoy0M3T2df%2FZ6nELRRR14%2B0uZiMUvXX3LvHpZJlddUy8gLyfDbcSmvbZpEqvUCQjxn%2F%2F1q6OxhX19F7BeuWhPKz8lso&pdp_filters=item_id%3AMLA852379599#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU200014934&backend_model=search-backend&float_highlight=last_unit&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA852379599&sid=search) | $211.983 | 12.2% | tipo: ACEITE; tokens comunes: aceite; compatibilidad/marca: John Deere |

### 17. Anticongelante Cool‑Gard. John Deere 10LTS

- ID Venturino: `318854338`
- Precio Venturino: $97.000
- Tokens: anticongelante, cool-gard, 10lt
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2873
- Candidatos excluidos por score: 1030
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
- Candidatos excluidos por precio: 3083
- Candidatos excluidos por score: 820
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
- Candidatos excluidos por precio: 3718
- Candidatos excluidos por score: 185
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
- Candidatos excluidos por precio: 3075
- Candidatos excluidos por score: 828
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 21. Bolso Duomo Bag John Deere

- ID Venturino: `276130213`
- Precio Venturino: $110.000
- Tokens: bolso, duomo, bag
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 2832
- Candidatos excluidos por score: 1070
- Mediana ML: $69.000
- Venturino vs mediana ML: 59.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 33 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | -37.3% | tipo: BOLSO; penalización tipo adicional candidato: HERRAMIENTA; tokens comunes: bolso |

### 22. Botella Atuel Blanca John Deere

- ID Venturino: `276163111`
- Precio Venturino: $56.000
- Tokens: botella, atuel, blanca
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3057
- Candidatos excluidos por score: 845
- Mediana ML: $55.707
- Venturino vs mediana ML: 0.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=20&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161) | $55.707 | -0.5% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 23. Botella Hydro 750ML John Deere

- ID Venturino: `338229330`
- Precio Venturino: $45.000
- Tokens: botella, hydro, 750ml
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3106
- Candidatos excluidos por score: 796
- Mediana ML: $55.707
- Venturino vs mediana ML: -19.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=20&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161) | $55.707 | 23.8% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 24. Botella Kun blanca John Deere

- ID Venturino: `276163980`
- Precio Venturino: $58.000
- Tokens: botella, kun, blanca
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3014
- Candidatos excluidos por score: 888
- Mediana ML: $55.707
- Venturino vs mediana ML: 4.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=20&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161) | $55.707 | -4.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 25. Botella Kun negra John Deere

- ID Venturino: `276163436`
- Precio Venturino: $58.000
- Tokens: botella, kun, negra
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 3014
- Candidatos excluidos por score: 888
- Mediana ML: $55.707
- Venturino vs mediana ML: 4.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=20&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161) | $55.707 | -4.0% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 26. Botella termica Olympia John Deere

- ID Venturino: `276164231`
- Precio Venturino: $68.000
- Tokens: botella, termica, olympia
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 1 de 1 válidos antes de top
- Candidatos excluidos por precio: 2986
- Candidatos excluidos por score: 916
- Mediana ML: $55.707
- Venturino vs mediana ML: 22.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Botella De Whisky John Deere Tractor Semi Truckbottle](https://articulo.mercadolibre.com.ar/MLA-1611637075-botella-de-whisky-john-deere-tractor-semi-truckbottle-_JM?searchVariation=194337051937#polycard_client=search-desktop&be_origin=backend&searchVariation=194337051937&search_layout=grid&position=20&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161) | $55.707 | -18.1% | tipo: BOTELLA; tokens comunes: botella; compatibilidad/marca: John Deere |

### 27. Caja de herramientas John Deere de acero

- ID Venturino: `276171332`
- Precio Venturino: $140.000
- Tokens: caja, herramienta, acero
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 20 de 21 válidos antes de top
- Candidatos excluidos por precio: 2807
- Candidatos excluidos por score: 1075
- Mediana ML: $116.773
- Venturino vs mediana ML: 19.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 61 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3242261346&sid=search) | $139.998 | -0.0% | tipo: HERRAMIENTA; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2491947770&sid=search) | $94.543 | -32.5% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94f1e34d-fd49-461c-a867-d50402b5cd6a&wid=MLA1399126385&sid=search) | $93.489 | -33.2% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3126102700&sid=search) | $194.998 | 39.3% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 5 | media | 47 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | -12.3% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |
| 6 | baja | 44 | [For Kit De Herramienta De De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-metal-for-john-deere/p/MLA2024534734#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2464989688&sid=search) | $115.762 | -17.3% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 7 | baja | 44 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2308233004&sid=search) | $114.799 | -18.0% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 8 | baja | 44 | [Kit De Herramienta De Giro De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-for-john-deere/p/MLA2027963136#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2399369304&sid=search) | $103.313 | -26.2% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 9 | baja | 43 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1448971691&sid=search) | $110.268 | -21.2% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 10 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Sí Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-si-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1562325653&sid=search) | $131.905 | -5.8% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 11 | baja | 41 | [Switch Tambor De Arranque Sin Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-sin-llave-tractores-john-deere/up/MLAU155926304#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1245977771&sid=search) | $151.758 | 8.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [John Deere Pop Up Upp Tractor Playhouse Para Niños \| Llave Y](https://www.mercadolibre.com.ar/john-deere-pop-up-upp-tractor-playhouse-para-ninos-llave-y/p/MLA2068378549#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2382371904&sid=search) | $117.784 | -15.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA922576085&sid=search) | $111.000 | -20.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Switch Tambor De Arranque Con Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-con-llave-tractores-john-deere/up/MLAU3120846470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2050159868&sid=search) | $189.097 | 35.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 15 | baja | 40 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | -6.3% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 16 | baja | 40 | [John Deere Power Tools Motosierra De Juguete, Herramienta De](https://www.mercadolibre.com.ar/john-deere-power-tools-chainsaw-toy-construction-tool-with/p/MLA2045929485#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2491947932&sid=search) | $92.688 | -33.8% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 17 | baja | 40 | [Juguete Para Armar Skid Steer John Deere Con Herramienta De](https://www.mercadolibre.com.ar/john-deere-skid-steer-building-toy-with-ratchet-tool-13-pc/p/MLA2073743520#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA3004308200&sid=search) | $85.241 | -39.1% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 18 | baja | 35 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1510545543&sid=search) | $135.947 | -2.9% | tipo: HERRAMIENTA |
| 19 | baja | 35 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323710072&sid=search) | $118.999 | -15.0% | tipo: HERRAMIENTA |
| 20 | baja | 35 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1721056741&sid=search) | $99.990 | -28.6% | tipo: HERRAMIENTA |

### 28. Caja de herramientas John Deere verde con bandeja amarilla

- ID Venturino: `276169417`
- Precio Venturino: $183.000
- Tokens: caja, herramienta, verde, bandeja, amarilla
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 20 de 20 válidos antes de top
- Candidatos excluidos por precio: 2968
- Candidatos excluidos por score: 915
- Mediana ML: $137.973
- Venturino vs mediana ML: 32.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 58 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3242261346&sid=search) | $139.998 | -23.5% | tipo: HERRAMIENTA; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Banco De Trabajo Infantil John Deere, Taller De Herramientas](https://www.mercadolibre.com.ar/john-deere-kids-workbench-power-tools-workshop-build-your/p/MLA2048863444#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1567156299&sid=search) | $219.881 | 20.2% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Kit Herramientas 85 Piezas Jadever Sí Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-si-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1562325653&sid=search) | $131.905 | -27.9% | tipo: HERRAMIENTA; tokens comunes: herramienta, verde |
| 4 | media | 48 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3126102700&sid=search) | $194.998 | 6.6% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 5 | media | 46 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | -32.9% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: caja, herramienta; compatibilidad/marca: John Deere |
| 6 | baja | 43 | [Bandeja Cocacola Original Made In Usa](https://www.mercadolibre.com.ar/bandeja-cocacola-original-made-in-usa/up/MLAU224563901#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=a355518b-8b31-47af-8d37-1a945d510cdb&wid=MLA1136594485&sid=search) | $175.000 | -4.4% | tipo: BANDEJA; tokens comunes: bandeja |
| 7 | baja | 43 | [For Kit De Herramienta De De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-metal-for-john-deere/p/MLA2024534734#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2464989688&sid=search) | $115.762 | -36.7% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 8 | baja | 43 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2308233004&sid=search) | $114.799 | -37.3% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 9 | baja | 42 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1448971691&sid=search) | $110.268 | -39.7% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 10 | baja | 41 | [Switch Tambor De Arranque Con Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-con-llave-tractores-john-deere/up/MLAU3120846470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2050159868&sid=search) | $189.097 | 3.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Switch Tambor De Arranque Sin Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-sin-llave-tractores-john-deere/up/MLAU155926304#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1245977771&sid=search) | $151.758 | -17.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [John Deere Pop Up Upp Tractor Playhouse Para Niños \| Llave Y](https://www.mercadolibre.com.ar/john-deere-pop-up-upp-tractor-playhouse-para-ninos-llave-y/p/MLA2068378549#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2382371904&sid=search) | $117.784 | -35.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA922576085&sid=search) | $111.000 | -39.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 14 | baja | 39 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | -28.3% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 15 | baja | 35 | [Juego Llaves Tubo Crique 121 Pzs Mecanica Profesional](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-121-pzs-mecanica-profesional/up/MLAU3962621953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323733620&sid=search) | $223.999 | 22.4% | tipo: HERRAMIENTA |
| 16 | baja | 35 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1510545543&sid=search) | $135.947 | -25.7% | tipo: HERRAMIENTA |
| 17 | baja | 35 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323710072&sid=search) | $118.999 | -35.0% | tipo: HERRAMIENTA |
| 18 | baja | 31 | [Set Ertl 1:64 John Deere 24 Piezas - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-164-john-deere-24-piezas--a-pedidoexkarg/up/MLAU3223535397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA2105563026&sid=search) | $233.008 | 27.3% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 24 | [Correa De Herramientas Interactiva Con Sonidos John Deere](https://www.mercadolibre.com.ar/correa-de-herramientas-interactiva-con-sonidos-john-deere/up/MLAU3868845007#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1729007443&sid=search) | $194.998 | 6.6% | tipo: HERRAMIENTA; penalización tipo adicional candidato: CORREA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 20 | baja | 24 | [Correa De Herramientas Interactiva Con Sonidos John Deere](https://www.mercadolibre.com.ar/correa-de-herramientas-interactiva-con-sonidos-john-deere/up/MLAU3967723569#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3331425306&sid=search) | $247.399 | 35.2% | tipo: HERRAMIENTA; penalización tipo adicional candidato: CORREA; tokens comunes: herramienta; compatibilidad/marca: John Deere |

### 29. Camión Volcador John Deere Big Scoop Dump Truck

- ID Venturino: `281259393`
- Precio Venturino: $130.000
- Tokens: camion, volcador, big, scoop, dump, truck
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 17
- Candidatos usados: 20 de 150 válidos antes de top
- Candidatos excluidos por precio: 2775
- Candidatos excluidos por score: 978
- Mediana ML: $128.864
- Venturino vs mediana ML: 0.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 62 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | -5.5% | tipo: JUGUETE; penalización tipo adicional candidato: HERRAMIENTA; tokens comunes: big, scoop, dump, truck; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Excavadora Juguete Tomy John Deere Big Scoop 38cm Plastico](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA3051332026&sid=search) | $161.286 | 24.1% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 55 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | 0.9% | tipo: JUGUETE; penalización tipo adicional candidato: HERRAMIENTA; tokens comunes: camion, big, scoop; compatibilidad/marca: John Deere |
| 4 | media | 55 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1556138081&sid=search) | $107.098 | -17.6% | tipo: JUGUETE; tokens comunes: dump, truck; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2170188784&sid=search) | $116.020 | -10.8% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3339182498&sid=search) | $90.865 | -30.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 7 | media | 48 | [Tractor Monster Truck John Deere De Juguete Con Luces Y Soni](https://www.mercadolibre.com.ar/toy-john-deere-monster-truck-tractor-w-lights-sounds/p/MLA2039435135#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2142655686&sid=search) | $127.435 | -2.0% | tipo: JUGUETE; tokens comunes: truck; compatibilidad/marca: John Deere |
| 8 | media | 48 | [Camión Volquete Y Cargador Frontal De Juguete John Deere, 18](https://www.mercadolibre.com.ar/equipo-de-excavacion-motorizado-john-deere-18-camion-de-2-1/p/MLA2052053468#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2539331628&sid=search) | $134.199 | 3.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=18&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $121.006 | -6.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3269069622#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2149534314&sid=search) | $139.199 | 7.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3036951256&sid=search) | $104.164 | -19.9% | tipo: JUGUETE; tokens comunes: volcador; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=&sid=search) | $96.260 | -26.0% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Ertl John Deere Grain Semi Truck Toy Replica Escala 1:64 De](https://www.mercadolibre.com.ar/ertl-john-deere-grain-semi-truck-toy-replica-164-scale/p/MLA2063214672#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587960862&sid=search) | $91.427 | -29.7% | tipo: JUGUETE; tokens comunes: truck; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/l-tractor-de-juguete-de-granja-grande-con-luces-y-sonidos-z/p/MLA2057912939#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1652235961&sid=search) | $90.773 | -30.2% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3154241320&sid=search) | $172.998 | 33.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2142512128&sid=search) | $177.443 | 36.5% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1462714353&sid=search) | $180.998 | 39.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 18 | baja | 42 | [Ertl 1/32 Camión Vintage & Tractor](https://www.mercadolibre.com.ar/ertl-132-camion-vintage--tractor/up/MLAU2798551609#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1461113825&sid=search) | $140.000 | 7.7% | tipo: JUGUETE; tokens comunes: camion |
| 19 | baja | 41 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1662281537&sid=search) | $130.293 | 0.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [John Deere 8600 Spfh 1/64 Escala Con Cabezal De Maíz](https://www.mercadolibre.com.ar/john-deere-8600-spfh-164-escala-con-cabezal-de-maiz/up/MLAU3263326141#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1507784499&sid=search) | $130.399 | 0.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 30. Camión volquete Big Scoop John Deere

- ID Venturino: `281259433`
- Precio Venturino: $148.000
- Tokens: camion, volquete, big, scoop
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 17
- Candidatos usados: 20 de 152 válidos antes de top
- Candidatos excluidos por precio: 2835
- Candidatos excluidos por score: 916
- Mediana ML: $136.699
- Venturino vs mediana ML: 8.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 59 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | -11.4% | tipo: JUGUETE; penalización tipo adicional candidato: HERRAMIENTA; tokens comunes: camion, big, scoop; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Excavadora Juguete Tomy John Deere Big Scoop 38cm Plastico](https://www.mercadolibre.com.ar/john-deere-sandbox-big-scoop-excavator-toy-with-tilting-d/p/MLA2062616370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA3051332026&sid=search) | $161.286 | 9.0% | tipo: JUGUETE; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Camión Volquete Y Cargador Frontal De Juguete John Deere, 18](https://www.mercadolibre.com.ar/equipo-de-excavacion-motorizado-john-deere-18-camion-de-2-1/p/MLA2052053468#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2539331628&sid=search) | $134.199 | -9.3% | tipo: JUGUETE; tokens comunes: camion, volquete; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Volquete De Juguete Build-a-buddy John Deere Con Taladro De](https://www.mercadolibre.com.ar/tools-toolsets-toys-games-build-a-buddy-47508-no-aplica-u/p/MLA2062346156#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2142707216&sid=search) | $116.568 | -21.2% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Camion De Juguete John Deere 46510](https://www.mercadolibre.com.ar/john-deere-big-scoop-dump-truck-toy-con-herramientas-de-caja/p/MLA2049650343#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2170188784&sid=search) | $116.020 | -21.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3269069622#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2149534314&sid=search) | $139.199 | -5.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Volquete De Juguete John Deere Steel 16 Con Luces Y Sonidos](https://www.mercadolibre.com.ar/toy-dump-truck-john-deere-steel-16-w-lights-sounds-kids-3/p/MLA2078353280#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA3127262580&sid=search) | $168.810 | 14.1% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3154241320&sid=search) | $172.998 | 16.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=18&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $121.006 | -18.2% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=&sid=search) | $96.260 | -35.0% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Escala John Deere 320e Skid Steer Con Camión](https://www.mercadolibre.com.ar/john-deere-scale-320e-skid-steer-con-camion/p/MLA2069344031#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2370117548&sid=search) | $200.000 | 35.1% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3339182498&sid=search) | $90.865 | -38.6% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/l-tractor-de-juguete-de-granja-grande-con-luces-y-sonidos-z/p/MLA2057912939#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1652235961&sid=search) | $90.773 | -38.7% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1535052371&sid=search) | $90.105 | -39.1% | tipo: JUGUETE; tokens comunes: volquete; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Set De Juguetes John Deere Big Farm 318 G Skid Steer 1:16 A](https://www.mercadolibre.com.ar/toy-set-john-deere-big-farm-318g-skid-steer-116-scale-3/p/MLA2039778299#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2142512128&sid=search) | $177.443 | 19.9% | tipo: JUGUETE; tokens comunes: big; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Camion John Deere Ertl 1/64 Yellow Farm - A Pedido_exkarg](https://www.mercadolibre.com.ar/camion-john-deere-ertl-164-yellow-farm--a-pedidoexkarg/up/MLAU2863081376#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1462714353&sid=search) | $180.998 | 22.3% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 17 | media | 47 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | -17.0% | tipo: JUGUETE; penalización tipo adicional candidato: HERRAMIENTA; tokens comunes: big, scoop; compatibilidad/marca: John Deere |
| 18 | baja | 43 | [Ertl 1/32 Camión Vintage & Tractor](https://www.mercadolibre.com.ar/ertl-132-camion-vintage--tractor/up/MLAU2798551609#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1461113825&sid=search) | $140.000 | -5.4% | tipo: JUGUETE; tokens comunes: camion |
| 19 | baja | 41 | [Regador De Tanque John Deere 876v 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/regador-de-tanque-john-deere-876v-164--a-pedidoexkarg/up/MLAU2927589938#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1988293942&sid=search) | $147.574 | -0.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1498485099&sid=search) | $150.000 | 1.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 31. Camioneta y tractor John Deere

- ID Venturino: `281234460`
- Precio Venturino: $300.000
- Tokens: camioneta, tractor
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 131 válidos antes de top
- Candidatos excluidos por precio: 3399
- Candidatos excluidos por score: 373
- Mediana ML: $270.166
- Venturino vs mediana ML: 11.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1514896991&sid=search) | $293.399 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1507969023&sid=search) | $288.367 | -3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1784581058&sid=search) | $270.242 | -9.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1417510473&sid=search) | $332.793 | 10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1949945520&sid=search) | $265.905 | -11.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1970561562&sid=search) | $248.500 | -17.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1571921115&sid=search) | $245.000 | -18.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor 1/64 John Deere 8400 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8400--a-pedidoexkarg/up/MLAU2670938419#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1949431358&sid=search) | $238.267 | -20.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA2138660238&sid=search) | $230.189 | -23.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1713564907&sid=search) | $217.905 | -27.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1767841826&sid=search) | $398.326 | 32.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1534604385&sid=search) | $399.880 | 33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1950555252&sid=search) | $198.353 | -33.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2194899840&sid=search) | $187.899 | -37.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1782656432&sid=search) | $291.302 | -2.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Antiguo Juguete Tractor John Deere Mod 730 #2de Aluminio](https://www.mercadolibre.com.ar/antiguo-juguete-tractor-john-deere-mod-730-2de-aluminio/up/MLAU3383201878#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2289526400&sid=search) | $310.000 | 3.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1763349785&sid=search) | $312.737 | 4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1949971056&sid=search) | $323.265 | 7.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor Juguete John Deere 1/50 843l - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-150-843l--a-pedidoexkarg/up/MLAU375792789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1784542220&sid=search) | $270.089 | -10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1476358051&sid=search) | $269.326 | -10.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 32. Cargador de tierra John Deere

- ID Venturino: `281259415`
- Precio Venturino: $3.568.000
- Tokens: cargador, tierra
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 3881
- Candidatos excluidos por score: 19
- Mediana ML: $2.458.770
- Venturino vs mediana ML: 45.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor John Deere Pedal Con Cargador Y Retroexcavadora Ju](https://www.mercadolibre.com.ar/tractor-john-deere-pedal-con-cargador-y-retroexcavadora-ju/up/MLAU3939991166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1771065225&sid=search) | $4.325.000 | 21.2% | tipo: JUGUETE; tokens comunes: cargador; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Tractor 1/16 John Deere Ertl 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-ertl-9rx-830--a-pedidoexkarg/up/MLAU3696393908#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA2705182936&sid=search) | $2.458.770 | -31.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tractor De Pedal John Deere 46394 Para Niños Grandes, Juguet](https://www.mercadolibre.com.ar/tractor-de-pedal-john-deere-46394-para-ninos-grandes-juguet/up/MLAU3939985528#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1771065005&sid=search) | $2.198.000 | -38.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 33. Cincel plano John Deere de corte en frío 10mm

- ID Venturino: `276196688`
- Precio Venturino: $17.000
- Tokens: cincel, plano, corte, frio, 10mm
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3236
- Candidatos excluidos por score: 667
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
- Candidatos excluidos por precio: 3039
- Candidatos excluidos por score: 864
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
- Candidatos excluidos por precio: 3279
- Candidatos excluidos por score: 624
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
- Candidatos excluidos por precio: 3887
- Candidatos excluidos por score: 16
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
- Candidatos excluidos por precio: 3855
- Candidatos excluidos por score: 48
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
- Candidatos excluidos por precio: 3881
- Candidatos excluidos por score: 22
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 39. Cosechadora con Duals John Deere X9 1100

- ID Venturino: `281259430`
- Precio Venturino: $258.000
- Tokens: cosechadora, dual, x9, 1100
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 10
- Candidatos usados: 20 de 138 válidos antes de top
- Candidatos excluidos por precio: 3265
- Candidatos excluidos por score: 500
- Mediana ML: $259.000
- Venturino vs mediana ML: -0.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 93 | [Cosechadora miniatura John Deere X9 1100 1/64 Ertl](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=qtRfHLB64Q4ohzC8ed7r3zRiiTcHMJIc0QhRCdOBlbB6LPLhPRseGRtIDBLsbNXLaL%2F4ljBNiVX2Fc3H11DBjsAIG9WuBOeTqIL0%2F4o38QzJBWImi7IT5kdU%2FYoELcjd9HD8CTMEmQ5udjmuufngtwRJ9XO2h7rhtUxMORXRxtHJZloHHMJPIuPRXs6bgXOo1X05ra7wAZIbF8x9JXnGDjDVu%2BmgbkJ3wIGduPA%2FeyzNRJEDUcOZZ9JUhXna3%2FvrACDcFQ%2FVDgMLkyN%2BkjKzzz%2Ft7hWwXUNW3gWjc2Tin2rWSrjtXU31rwMtYAclQFO%2FZvtNVmljwz%2FRWmnYM6foQc%2Ba1mjo0X7LJ%2BhrQUus4Y6DoSIdMZwYxbDasGZ7Z3gvoL%2FGu0y5wGaGdiMVvFB6AYAeCHO1VUDzXsOxKtyd6MJOz3upKD9PRM1Up43gWHfg0PjxCjeBQPpnqmkrtaXv4e0CjxY993tHFLeFWDQzDnC4DND6JWUKnhyrXEdrgR9B5zdOpF6vkk%2BWvLV8ySLfHNej3nPYPREEXjnvPoYrqN9BcZSo5ug6W0aWkbUCf0HXqAOlfom0svLjNIwwbVAvpj7WFhM3AsodmkLOOaNHpJO%2Bz6Wf7kJBSLMRp9RL7R3xWy1bEIo0RIFklV0Ho1%2FfoVOfsFWjq92sfwZF4OGQOIFpqCc%2F%2BHWwOPEQS2NMEWKJ067qjr7eql%2B5XsHq13L1QfkSrqxSIGNMSnlevc6O5RJuwI0I3typNGYY2n8IcJc5ZWU1COEenn7YnPxr6x3nLyhlNyxPP049xBXpdH2kS3sAnTrbz%2Ffm4rSxHNTc460cbdP9LoaEtgGMW8MI5B3x1Yh9A%2FdBZeZ5cIYF8lEuAhK8GAhl1lVH3WMf0YirUKArkxKWx5tyFJGQf%2F68hCKq2NShApuyUMRqClqRLoQxI5cGbfrzxjpx%2BrnYjLoLiJINmiI4GnPTDQOfKTIdQ%2Fbyvd1loYPq&pdp_filters=item_id%3AMLA2806898370#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA21742050&backend_model=search-backend&be_origin=backend&search_layout=grid&position=13&type=pad&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2806898370&sid=search) | $250.000 | -3.1% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 2 | alta | 92 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1911294048&sid=search) | $265.120 | 2.8% | tipo: JUGUETE; tokens técnicos: x9, 1100; tokens comunes: cosechadora, x9, 1100; compatibilidad/marca: John Deere |
| 3 | alta | 70 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1447751815&sid=search) | $263.348 | 2.1% | tipo: JUGUETE; tokens técnicos: x9; tokens comunes: cosechadora, x9; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Cosechadora Ertl John Deere 1:64 7720 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-john-deere-164-7720--a-pedidoexkarg/up/MLAU3622286639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA2597394962&sid=search) | $220.880 | -14.4% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Cosechadora De Algodón John Deere Cp770, 1/64 Verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=8K%2FAs9b48izYve9l9Bz6FIUl3ZdC%2BOIFAZSXv%2Fpj32aebRZYRQHcn%2BWZQy4gd4P%2FeP4NS0LNFNQVmccSFJyy%2FBhIJplewyPBp8mp%2F53IbXR5cHDY9067%2FqjoywODoTn6CUYat6QA2UOTdplPRbqBbXiudG4LaIQ566VNKB%2Faei3FkLS5yv19VZBcAAMPb0S2nkrFqorNUhx%2FvyLeG7R4AfWSQOora8tdJvSkKtORLDwhcA8v6m%2FZFoR6ZpiUI6Lk5ZVhuOwPElIOwXOYTP5XntiVQZLA9posruOVDr1Re5tD8ibge%2BfARaI8xFfiT7fj3hO4nrZsP7eDUxIKRix6s31uF9HsEaGKAfZa7LEgzAJUsuvue5sjZjbjqW%2FYZFhpuZzH87%2BJX7i3LC7XCG6lwFmo3DlZ8E6PPPWI0reVjHjTZs4dMxQVaKRSadP02RaizZPu7g%2FRZ6BpJ0x6jiy8VCWoMNSDTSXEeawOgWgMUxUuybZYFrUf9Sf265NDw58Trn%2FC29Gpc2jhzfDdO%2BHRH3cRRXNX9%2FcHAuKQoQpnIqT3KvCClDboZi9%2F52Ns1FbXJbcLF7WDZ1cfPivFnu%2Fg6VCq8mO0zu8AWZlTJESP1vxhDDkhdyabDIu%2FgIl2wop5odrqbXny8hSplu%2Bi%2Bz7WTiaaOH7ruC7zZCOGd3QqP%2FuaVvKE0q5OyjcNSgyz%2Fjo%2Fjhu%2BqS2pQ5K1RfnocEof%2BKpKnwHplvBZ%2FBAyGG2o5CNlA39ro%2BYKs3o%2FMdPZ71dNqcVmhMgRS8BsAEc4SAqCoMchrBOmW7Q9pp89bWqkfZgk%2BVpde%2F%2FWHMlgQuprVlFpAQVfF2EHHSJpjEtiiCzlZm2LsSUmOzwd9Pn0UmNHn5L6VioCtPbYIEzllkiq91nuPoM9QmzZXLY4fhcgRel2M3Xv8%2FsadiYAajNrvWQyYRYV6qx0m0c08C2gIaqL8231JrMXO9%2F1pRUNgmeW5PRO6zZbyHar&pdp_filters=item_id%3AMLA3117505332#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA64944786&backend_model=search-backend&be_origin=backend&search_layout=grid&position=28&type=pad&tracking_id=9adbeaf3-2e89-4c23-800b-d11dd3821eab&wid=MLA3117505332&sid=search) | $215.000 | -16.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Cosechadora 1/64 John Deere Model S7 900_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-model-s7-900exkarg/up/MLAU3421966953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2363760294&sid=search) | $303.550 | 17.7% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Cosechadora 1/64 John Deere S680 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s680--a-pedidoexkarg/up/MLAU3211473392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA2095857690&sid=search) | $305.134 | 18.3% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Cosechadora 1/64 John Deere S780 Tracked - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-john-deere-s780-tracked--a-pedidoexkarg/up/MLAU3211445872#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA2095728162&sid=search) | $317.339 | 23.0% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 9 | media | 48 | [Cosechadora miniatura de granos y maíz verde John Deere S780 1:64](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=KGdkRln9nVWzNDu%2FfomcC1TsjfFpT%2F8M%2FbNCiB9Tjk75HSyiIiTGYdEU3ITrjRPu4lLL4NFA%2FvN9IGW1bbesijNovvRz67gkMpHFn6DNOPO3n9D0DO1xXyvKzcrcxm1C9iW7LxzEGhrhWp2sLZ7xZq5wcZt9tYuU5kmPpHRLl7vQi2YTcEDFDdaWVyp5rETLEZHyavVNd61hV0KG4pcOqwnGvwOHaT1PfuHQJCmIdywnuZuOt%2BnhOQCtdGOTkU8tZ6RIsLZNinoYuKynWRlfMp8vWMXZd%2FxIYzkWSZEHzUq%2Fjih955mhVfBPrGInl7VRRBXzmZKdzpu6uGyujAdNX2LHKtohd2Ep87P%2FCnJttIHDsb3pwoxVH4UVBy9ojbGEzjdNEBfgheXyQJFDoCC2SSUjLFiLDqTSkoTB%2BYRlUGyo7BspIjso0hS%2BqJ53%2ByI1XNOlSNYZByYEn9AUAggyZvbopXBo04RWx9zAzDiHf0udf7gKDAJaDgXkPmUWR8cRq1vgWQaTkMfqYY%2B835MXKFO5aPlTeZBL2HiC9Juk1JxWRG4g%2FqNdqYePsutOGjMpkaF2qHQZCJM9%2FbMiH4Q3LJ8rigGZBB6hb5vzgAmgW83Wcyzr6oP5P1lf6%2FmDs5BxW6uGy4DONBE%2BY9hdCReon6VogFER9bjonL44bSkYeAm%2B6xDhLG972ulSznmrZg4iO3KSxO4NZQHAwJwnOTvqfbtEB4YMZrMYbxOFFfU9TBOD3V%2BiYirGGyqmWzlhMtQEHribUditu6FIbfwJyR10e71gMiGRItvbAZV196U6TaFpkhn7JJqH3H9f%2FlEiDzfE13BBRO75j3wUtqMcbIxvxNVxG4vfl%2FDDjQmwzrU9H%2FDElJceaQAm%2BUnaKuuZOCa%2Bcs1fnv5UK%2FUnFJ96xzmz8iVGwG4%2FZ%2By7Qw%2FgXOMmqtgA%2BDYzP92oltn71MlvvkM5FQ93SVp6GWd%2FFv3qGaSWhMrWqnbHl8tME7580AyonV6c8JPl&pdp_filters=item_id%3AMLA2579195550#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54400721&backend_model=search-backend&float_highlight=last_unit&be_origin=backend&search_layout=grid&position=16&type=pad&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2579195550&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Cosechadora miniatura John Deere S680 Prestige 1/64, color verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=lxl4oMN2SQp9YVeEzTK7D655C7oN1hP2H%2FZZeF8cjfhwINghtAxFsrnLeMcjZ1rwQYNDF4GY8FKbeAZShpuItGEhYod7%2BcPnr5wV7xZCzWO3IOxTD00WeChB4GDEo36lHdeqk9qjO5irM2UhfjQRg4j6hU3HvR7HVPFAQm8qM%2FYYd5NQk5BagiJ1tQL9qaPd2Gvif4kHHPmQdgCwH3jTwVtp14%2F%2FCdpbMrR1VgTjtQFwOlPsBSjBwafg8C7xBtKeFbq2cVasY7VtBGlTyOhr%2BYLAnhqwtEc8%2BF%2Bcn0a1lAGRbBynI0DysDcCM4Or1Mppk8Qa7OJxUdJzj6KE1WxAZFnWMTQ%2BKxc4%2FpHdz1p49Q8qXm65l5MQ2D9d1rsVRwJ2cpJI3XLBNQ18DQ%2BAxiY76h7c4nFGomxSUijVAs8d3hG7hJ7qwtfWwp%2B2uSjQFieixtdkidv%2F3m8%2BQLt6%2B5zKIN96C3JnBVdAH7Q22FHfCQH4ZILODGZcA%2FTked3dM8y1TSEiQgNAMuJO2uIjkPHZCe4MGk2YIpcrb7eP4A777eWi9Sm4IZFLIFDX9MUDWh71oEezgc7Pi9IA5wXkx5zQHGtUdBU9mpxtb5Mpk2Ytw9NvPfSYhbxzOGfIrlzvuzXjXmLL0BHExhgwPR0%2FKTnxNNiPgu4cf%2FujovDppQRhRF%2BvCD0EMK9yiiJBF9Ka7wqJu9d6CgOSlmWf2JZHPQxo96Ho%2FPsROZwiKdt5etz4vtG8iNz7jcLTIx3nSOEgwCX0QU8mCA5gOfb18j0t7qAtgg9wu%2BZLT5hQcMHoM1F%2B2%2BNIt138QYthqwhAIzqPyJVEocyY%2BODlsvc8J7uqjDiibh4oIvuhTiIHGo7b%2BU4wAsR5DVhIh%2FaMkTGB34O8qGOwBLTKcWiqKXVKBdscjufBQIGpT%2FGF0TH2ZqChn1XbwhXHnhGbLAsxjNwedD47GRs%2BfcF8cLxo%2BTAl7lbTdsy8GcihDipEI12f0eAwEKPFxCf3&pdp_filters=item_id%3AMLA2579058396#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA61519873&backend_model=search-backend&be_origin=backend&search_layout=grid&position=2&type=pad&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2579058396&sid=search) | $210.000 | -18.6% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1141825591&sid=search) | $258.952 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1584365843&sid=search) | $258.990 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=DfaxCfGhYqcb%2Fr6mhMw1u4SDaZODlpDhRV4Kw2COKUMhD1apSNLFcOd3G1uLPj3kpIjZaaUM9HTwFUzKCYLySyg4UxIm4XJIl0zcqZ5oP3zaFyf%2FkcHcsxwTfJFzu0OVTv0pKHwfh5Wq6MnJn%2BrD8mEYylmC4Xu7g0iy06QdQvPZ3UhQppSdJTYj3l93%2BfvxmRVATRit4VFQuC93BqoYAC1ut1AfhNL77azrlfrzsFyKHfBlTwHjgdEYkH1D2UJNx9OfYmZDWuPJzBeBlgMDRbN%2BwLo3lxdZnj3zRPHJnC1%2BCIDa9PyT2EmENGxk%2Bbz1NKPmcnv98lZbQC45%2BWHtwjfzrebDpz2Hzvcqg57B35uOdx0f1UnLjkpB7csCg3bhR9mps9cFF4V1i8zMCARu%2Fpl54NCRSZPU2oNdgQtxv5TBR0OBqkCbFjvPqhUNktUwaNTVccYXHBhK6kWR6siop%2FKbDkM8tS5nLK6dkjbuBDwIZZKT1zBaq3A%2BhGnj96PNtbPWJPkVhV27bJoHBxASphWlQo8fAoVVdZ9Svvr4bR0gV0g0gOqBOVHFUmllY28tpQmkCbS1dAtJN5XoLYdwn7aCNVvQzeUzc0B60yp7oWHEf37jDuTF%2B1Xf4ynmZXA0ZtPForWNj%2FCKt0W%2BBNXcM3bQUI1LnlXNdnNFHxqh7SNqgttQMWx0EItK1f2ZYD1HYDbyPhhNnlesMhyWJt7AKEe7BORg8xdaFTgKvbRXsbIcU749oDr7fMVcRC8q3BQo91y3siRtUfzGr70HFpbHqeutXSXQOBPekEwNPIYk%2B2A5s07mV9Wfp2nETHGC7oT3%2FVEU5pEmPk8GWaOafsVwlbSrkK6kyIekqkym0UDQMVydKbia0bhBwfpC21ySfAU2WL6DInppb%2BJNM6I1SDY8B94cYLlYLuFJ0KBuJ5jmJIzNFwpQ%2FRLVbXrCZfZzrGhvda2NPj9AfgJKzWhO3o58UvQd%2F3CbGYPUByLNBm%2F4ikOP%2F04YxyJXSiG8LXk%3D&pdp_filters=item_id%3AMLA1688046131#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54486376&backend_model=search-backend&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1688046131&sid=search) | $259.000 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1583656447&sid=search) | $259.000 | 0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Tractor John Deere Simple Dimpl De Toy Fat Brain, Más De 3 A](https://articulo.mercadolibre.com.ar/MLA-1556139169-tractor-john-deere-simple-dimpl-de-toy-fat-brain-mas-de-3-a-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $256.072 | -0.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1950447406&sid=search) | $260.245 | 0.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1782744664&sid=search) | $255.079 | -1.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Réplica John Deere Pala Trituradora 1:50 Colección](https://www.mercadolibre.com.ar/replica-john-deere-pala-trituradora-150-coleccion/up/MLAU3876131784#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1725969655&sid=search) | $262.099 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Maqueta John Deere 843l-ii 1:50 Colección Prestige](https://www.mercadolibre.com.ar/maqueta-john-deere-843lii-150-coleccion-prestige/up/MLAU3876133382#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3117350930&sid=search) | $262.099 | 1.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1949945520&sid=search) | $265.905 | 3.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 40. Cosechadora con orugas S780 John Deere

- ID Venturino: `281222483`
- Precio Venturino: $1.100.000
- Tokens: cosechadora, oruga, s780
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 20 de 23 válidos antes de top
- Candidatos excluidos por precio: 3807
- Candidatos excluidos por score: 73
- Mediana ML: $848.609
- Venturino vs mediana ML: 29.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Cosechadora John Deere Ertl 1/16 S690 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-ertl-116-s690--a-pedidoexkarg/up/MLAU3405181522#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA2316244096&sid=search) | $1.366.734 | 24.2% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Cosechadora Bruder John Deere T670i 1/16 Escala Detalle](https://www.mercadolibre.com.ar/cosechadora-bruder-john-deere-t670i-116-escala-detalle/up/MLAU3709741640#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA2735955818&sid=search) | $801.919 | -27.1% | tipo: JUGUETE; tokens comunes: cosechadora; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tractor De Coleccion John Deere Ertl 8rx - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-ertl-8rx--a-pedidoexkarg/up/MLAU148472123#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1139042452&sid=search) | $1.146.516 | 4.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Tractor 2024 Ertl 1:16 John Deere 8850 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2024-ertl-116-john-deere-8850--a-pedidoexkarg/up/MLAU3512484909#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1566725471&sid=search) | $1.190.050 | 8.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Lego 42157 Technic Skidder John Deere Bunny Toys](https://www.mercadolibre.com.ar/lego-42157-technic-skidder-john-deere-bunny-toys/up/MLAU127418845#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1422484952&sid=search) | $1.199.999 | 9.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tractor Ertl 1/16 John Deere 4440 High Cro - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-116-john-deere-4440-high-cro--a-pedidoexkarg/up/MLAU232697105#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1370428787&sid=search) | $956.901 | -13.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor John Deere Ertl 1/16 620 With 555 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-620-with-555--a-pedidoexkarg/up/MLAU3404496394#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1519688549&sid=search) | $922.938 | -16.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tractor Ertl John Deere 1/16 Precision Waterloo - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-116-precision-waterloo--a-pedido/up/MLAU3913388889#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1762009919&sid=search) | $900.020 | -18.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tractor De Juguete John Deere 1/16 Colección Prestigio](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-116-coleccion-prestigio/up/MLAU3887620554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1734903333&sid=search) | $895.299 | -18.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor John Deere 53 Cm Big Scoop Para Niños](https://www.mercadolibre.com.ar/tractor-john-deere-53-cm-big-scoop-para-ninos/up/MLAU3215165316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA3337726446&sid=search) | $1.380.996 | 25.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Cortacésped John Deere 110 Juguete 1/16 - A Pedido_exakrg](https://www.mercadolibre.com.ar/cortacesped-john-deere-110-juguete-116--a-pedidoexakrg/up/MLAU2923749204#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1986895438&sid=search) | $789.530 | -28.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Pulverizador Autopropulsado Tomy Big Farm John Deere R4023 A](https://www.mercadolibre.com.ar/pulverizador-autopropulsado-tomy-big-farm-john-deere-r4023-a/up/MLAU3557087173#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA1582480007&sid=search) | $768.999 | -30.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Plantadora De Juguete John Deere 1:64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-164--a-pedidoexkarg/up/MLAU216527677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1138239021&sid=search) | $768.366 | -30.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Tractor John Deere Ertl 1/16 9r 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-9r-640--a-pedidoexkarg/up/MLAU3056769388#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1480847539&sid=search) | $1.448.971 | 31.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Camión De Carga Ancha Tomy John Deere Big Farm A Escala 116](https://www.mercadolibre.com.ar/camion-de-carga-ancha-tomy-john-deere-big-farm-a-escala-116/up/MLAU3564484178#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2568887568&sid=search) | $750.999 | -31.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1422054560&sid=search) | $733.573 | -33.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Plantadora De Juguete John Deere 48 Filas - A Pedido_exkarg](https://www.mercadolibre.com.ar/plantadora-de-juguete-john-deere-48-filas--a-pedidoexkarg/up/MLAU151239803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1146832296&sid=search) | $705.810 | -35.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Embaladora De Coleccion John Deere Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/embaladora-de-coleccion-john-deere-bruder---a-pedidoexkarg/up/MLAU252406879#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1248654054&sid=search) | $670.167 | -39.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Camión Semi John Deere Big Farm De Tomy Con Plataforma De Ca](https://www.mercadolibre.com.ar/camion-semi-john-deere-big-farm-de-tomy-con-plataforma-de-ca/up/MLAU3556794925#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1582475319&sid=search) | $667.999 | -39.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Bruder John Deere 7r 350 Con Remolque Forestal Y 4 Troncos 0](https://www.mercadolibre.com.ar/bruder-john-deere-7r-350-con-remolque-forestal-y-4-troncos-0/up/MLAU3556948383#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2568493822&sid=search) | $661.999 | -39.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 41. Cuchillo de mano John Dere

- ID Venturino: `276681820`
- Precio Venturino: $34.000
- Tokens: cuchillo, mano, dere
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3083
- Candidatos excluidos por score: 820
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 42. Filtro de Combustible. John Deere

- ID Venturino: `318860737`
- Precio Venturino: $267.000
- Tokens: filtro, combustible
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 27 válidos antes de top
- Candidatos excluidos por precio: 3291
- Candidatos excluidos por score: 585
- Mediana ML: $245.132
- Venturino vs mediana ML: 8.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 68 | [Filtro De Combustible John Deere Re541922](https://www.mercadolibre.com.ar/filtro-de-combustible-john-deere-re541922/up/MLAU216458098#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=ff726784-4dc2-477e-b3c8-7f195c9be943&wid=MLA1131562648&sid=search) | $191.493 | -28.3% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere |
| 2 | media | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere 9570](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-9570/up/MLAU2030480381#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ff726784-4dc2-477e-b3c8-7f195c9be943&wid=MLA1453989409&sid=search) | $285.000 | 6.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere |
| 3 | media | 61 | [Bomba Filtro De Combustible Para Cosechadora John Deere S550](https://www.mercadolibre.com.ar/bomba-filtro-de-combustible-para-cosechadora-john-deere-s550/up/MLAU2039237397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=1651d11f-3065-4260-9394-7dc83f4ccb05&wid=MLA1929743570&sid=search) | $285.000 | 6.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere |
| 4 | media | 59 | [Filtro Combustible Donaldson P576918 Eqv. John Deere Re60021](https://www.mercadolibre.com.ar/filtro-combustible-donaldson-p576918-eqv-john-deere-re60021/up/MLAU250437733#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=b1778016-a4dc-4669-8e3d-45d7a116900c&wid=MLA1124362080&sid=search) | $201.000 | -24.7% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere |
| 5 | media | 58 | [D- Filtro De Combustible Re559944 Re530385 For John Deere Sq](https://articulo.mercadolibre.com.ar/MLA-1783461217-d-filtro-de-combustible-re559944-re530385-for-john-deere-sq-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $227.952 | -14.6% | tipo: FILTRO; tokens comunes: filtro, combustible; compatibilidad/marca: John Deere |
| 6 | media | 52 | [Filtro Hidraulico John Deere At335492](https://www.mercadolibre.com.ar/filtro-hidraulico-john-deere-at335492/up/MLAU3924339920#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1761887079&sid=search) | $220.000 | -17.6% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 7 | media | 52 | [Filtro Hidraulico At129775 John Deere](https://www.mercadolibre.com.ar/filtro-hidraulico-at129775-john-deere/up/MLAU3532524648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=2e10dd33-1104-4955-a3a5-1b2d2fb6390b&wid=MLA1571324655&sid=search) | $371.215 | 39.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 8 | media | 51 | [Filtro De Aceite Hidráulico John Deere Re45864](https://www.mercadolibre.com.ar/filtro-de-aceite-hidraulico-john-deere-re45864/up/MLAU243836720#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1451843418&sid=search) | $235.814 | -11.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 9 | media | 51 | [Filtro Hidráulico John Deere Re45864 - Agrícola](https://www.mercadolibre.com.ar/filtro-hidraulico-john-deere-re45864--agricola/up/MLAU3700145760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA2711956876&sid=search) | $225.000 | -15.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 10 | media | 51 | [Filtro Secundario Para Cosechadoras John Deere Ah212295](https://www.mercadolibre.com.ar/filtro-secundario-para-cosechadoras-john-deere-ah212295/up/MLAU2956350677#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=8b6ef562-a956-42a5-8cda-cfef3f4d3454&wid=MLA1995411330&sid=search) | $172.445 | -35.4% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Filtro Hidráulico Donaldson P574617 Eq. John Deere At308274](https://www.mercadolibre.com.ar/filtro-hidraulico-donaldson-p574617-eq-john-deere-at308274/up/MLAU309430473#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=8cd16afa-fe63-4fc9-9111-2f02a3fdc3a9&wid=MLA926567545&sid=search) | $278.900 | 4.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Filtro Aceite Hidráulico Donaldson P174552 John Deere 318d](https://www.mercadolibre.com.ar/filtro-aceite-hidraulico-donaldson-p174552-john-deere-318d/up/MLAU305439588#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=2e10dd33-1104-4955-a3a5-1b2d2fb6390b&wid=MLA904754985&sid=search) | $254.450 | -4.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Filtro Aceite Hidráulico Mann Wh10005 John Deere At314164](https://www.mercadolibre.com.ar/filtro-aceite-hidraulico-mann-wh10005-john-deere-at314164/up/MLAU3815580745#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=2e10dd33-1104-4955-a3a5-1b2d2fb6390b&wid=MLA2966557888&sid=search) | $303.500 | 13.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Filtro Aire Para John Deere 5090e Al119839 Al172780 Cp33300](https://www.mercadolibre.com.ar/filtro-aire-para-john-deere-5090e-al119839-al172780-cp33300/up/MLAU2901850439#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=8cd16afa-fe63-4fc9-9111-2f02a3fdc3a9&wid=MLA1467193781&sid=search) | $227.599 | -14.8% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Filtro Aire Mann C19450 John Deere Linde](https://www.mercadolibre.com.ar/filtro-aire-mann-c19450-john-deere-linde/up/MLAU259983411#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=3b53d593-7a80-48c6-8ffb-db9e563f9f59&wid=MLA685759359&sid=search) | $197.500 | -26.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Filtro De Aceite John Deere Original Equipment - Am125424 (1](https://articulo.mercadolibre.com.ar/MLA-3274452482-filtro-de-aceite-john-deere-original-equipment-am125424-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=item&tracking_id=ca5b502a-d987-4325-b9b5-d5ad0a82829b) | $357.790 | 34.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Filtro De Aceite John Deere Original Equipment - Am125424 (1](https://articulo.mercadolibre.com.ar/MLA-2843123196-filtro-de-aceite-john-deere-original-equipment-am125424-1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=item&tracking_id=bd93bfc2-3546-4c23-b143-6f5119e4834a) | $357.790 | 34.0% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Filtro Aire Primario Para John Deere Linde New Holland](https://www.mercadolibre.com.ar/filtro-aire-primario-para-john-deere-linde-new-holland/up/MLAU2956372295#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=374b2801-fe1f-497c-b840-044645fb7724&wid=MLA1995599532&sid=search) | $172.138 | -35.5% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Filtro Aire New Holland John Deere Varios Wix Wa10108](https://www.mercadolibre.com.ar/filtro-aire-new-holland-john-deere-varios-wix-wa10108/up/MLAU3885689643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=1651d11f-3065-4260-9394-7dc83f4ccb05&wid=MLA3167840324&sid=search) | $284.936 | 6.7% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Filtro De Aceite Hidráulico Mann Hd517/6 At204010 John Deere](https://www.mercadolibre.com.ar/filtro-de-aceite-hidraulico-mann-hd5176-at204010-john-deere/up/MLAU3815374307#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=ca5b502a-d987-4325-b9b5-d5ad0a82829b&wid=MLA2964584276&sid=search) | $313.000 | 17.2% | tipo: FILTRO; tokens comunes: filtro; compatibilidad/marca: John Deere |

### 43. Generador Honda EZ6500CXS – 6.5 KVA

- ID Venturino: `332863753`
- Precio Venturino: $2.655.680
- Tokens: generador, honda, ez6500cx, 6.5, kva
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3875
- Candidatos excluidos por score: 28
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
- Candidatos usados: 20 de 56 válidos antes de top
- Candidatos excluidos por precio: 3075
- Candidatos excluidos por score: 772
- Mediana ML: $24.639
- Venturino vs mediana ML: 42.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra De Béisbol John Deere](https://articulo.mercadolibre.com.ar/MLA-1795430349-gorra-de-beisbol-john-deere-_JM?searchVariation=195028438006#polycard_client=search-desktop&be_origin=backend&searchVariation=195028438006&search_layout=grid&position=21&type=item&tracking_id=53dbb29e-4f81-4333-b9c3-6566314fb49e) | $21.112 | -39.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5&wid=MLA1552253565&sid=search) | $33.600 | -4.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA935804894&sid=search) | $32.499 | -7.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c1530bb1-a6d5-4d6e-b6a8-d73df59c9129&wid=MLA2592139810&sid=search) | $30.000 | -14.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=22&type=item&tracking_id=79193404-ee69-400f-a997-b694d8caa502) | $29.943 | -14.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=51&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $29.943 | -14.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=52&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $29.943 | -14.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-3272626526-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=201372857441#polycard_client=search-desktop&be_origin=backend&searchVariation=201372857441&search_layout=grid&position=22&type=item&tracking_id=f8f12abf-804a-4eb1-b641-9c5e142a9e7d) | $26.356 | -24.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra John Deere Original Plana Cerrada](https://www.mercadolibre.com.ar/gorra-john-deere-original-plana-cerrada/up/MLAU3741746550#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=79193404-ee69-400f-a997-b694d8caa502&wid=MLA1648398397&sid=search) | $25.000 | -28.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Gorra De Béisbol Ajustable Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-1527135007-gorra-de-beisbol-ajustable-estampada-de-john-deere-_JM?searchVariation=185266346716#polycard_client=search-desktop&be_origin=backend&searchVariation=185266346716&search_layout=grid&position=15&type=item&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4) | $24.775 | -29.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=37&type=item&tracking_id=23e16205-5f57-4380-9a8d-63a8e491b492) | $24.639 | -29.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Gorra De Béisbol Ajustable Con El Logotipo De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533425-gorra-de-beisbol-ajustable-con-el-logotipo-de-john-deere-_JM?searchVariation=200631683569#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683569&search_layout=grid&position=9&type=item&tracking_id=f8f12abf-804a-4eb1-b641-9c5e142a9e7d) | $24.639 | -29.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Gorra De Béisbol De Golf Con Estampado John Deere](https://articulo.mercadolibre.com.ar/MLA-1527181163-gorra-de-beisbol-de-golf-con-estampado-john-deere-_JM?searchVariation=185267041194#polycard_client=search-desktop&be_origin=backend&searchVariation=185267041194&search_layout=grid&position=36&type=item&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5) | $23.195 | -33.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Gorra Trucker John Deere Moline Ill](https://www.mercadolibre.com.ar/gorra-trucker-john-deere-moline-ill/up/MLAU3340462054#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4&wid=MLA2211751914&sid=search) | $23.000 | -34.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Gorra De Béisbol Ajustable John Deere Para Hombre](https://articulo.mercadolibre.com.ar/MLA-3220556590-gorra-de-beisbol-ajustable-john-deere-para-hombre-_JM?searchVariation=200645721473#polycard_client=search-desktop&be_origin=backend&searchVariation=200645721473&search_layout=grid&position=53&type=item&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533471-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631683731#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683731&search_layout=grid&position=17&type=item&tracking_id=eb1befe6-0bdb-4c3d-9771-4ee0929cc2ae) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Gorra De Béisbol Unisex Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785720591-gorra-de-beisbol-unisex-con-estampado-de-john-deere-_JM?searchVariation=194560989564#polycard_client=search-desktop&be_origin=backend&searchVariation=194560989564&search_layout=grid&position=40&type=item&tracking_id=53dbb29e-4f81-4333-b9c3-6566314fb49e) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Gorra De Béisbol Ajustable Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-3218909500-gorra-de-beisbol-ajustable-con-estampado-de-john-deere-_JM?searchVariation=200631638827#polycard_client=search-desktop&be_origin=backend&searchVariation=200631638827&search_layout=grid&position=35&type=item&tracking_id=53dbb29e-4f81-4333-b9c3-6566314fb49e) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3307378094-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=201785411741#polycard_client=search-desktop&be_origin=backend&searchVariation=201785411741&search_layout=grid&position=38&type=item&tracking_id=79193404-ee69-400f-a997-b694d8caa502) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-1757678053-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=200597625461#polycard_client=search-desktop&be_origin=backend&searchVariation=200597625461&search_layout=grid&position=48&type=item&tracking_id=355e803c-16fc-43a8-8623-3863ae3c3a0e) | $22.845 | -34.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 45. Gorro John Deere Santa Fe Mesh Bordado

- ID Venturino: `276119628`
- Precio Venturino: $37.000
- Tokens: gorra, santa, fe, mesh, bordado
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 42 válidos antes de top
- Candidatos excluidos por precio: 3076
- Candidatos excluidos por score: 785
- Mediana ML: $29.943
- Venturino vs mediana ML: 23.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5&wid=MLA1552253565&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA935804894&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c1530bb1-a6d5-4d6e-b6a8-d73df59c9129&wid=MLA2592139810&sid=search) | $30.000 | -18.9% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5&wid=MLA2424514130&sid=search) | $33.600 | -9.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2029398978&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&float_highlight=last_units&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4&wid=MLA778736698&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4&wid=MLA1186238943&sid=search) | $32.499 | -12.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=797ae654-085b-4b0a-a4eb-ec48869bbadb&wid=MLA2992080562&sid=search) | $31.000 | -16.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=22&type=item&tracking_id=79193404-ee69-400f-a997-b694d8caa502) | $29.943 | -19.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=51&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $29.943 | -19.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=52&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $29.943 | -19.1% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=55&type=item&tracking_id=871acca8-5df7-419b-bd05-056c65e49990) | $26.371 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-3272626526-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=201372857441#polycard_client=search-desktop&be_origin=backend&searchVariation=201372857441&search_layout=grid&position=22&type=item&tracking_id=f8f12abf-804a-4eb1-b641-9c5e142a9e7d) | $26.356 | -28.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Gorra John Deere Original Plana Cerrada](https://www.mercadolibre.com.ar/gorra-john-deere-original-plana-cerrada/up/MLAU3741746550#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=4&type=product&tracking_id=79193404-ee69-400f-a997-b694d8caa502&wid=MLA1648398397&sid=search) | $25.000 | -32.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Gorra De Béisbol Ajustable Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-1527135007-gorra-de-beisbol-ajustable-estampada-de-john-deere-_JM?searchVariation=185266346716#polycard_client=search-desktop&be_origin=backend&searchVariation=185266346716&search_layout=grid&position=15&type=item&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4) | $24.775 | -33.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Gorra De Béisbol Unisex Estampada De John Deere](https://articulo.mercadolibre.com.ar/MLA-3220582056-gorra-de-beisbol-unisex-estampada-de-john-deere-_JM?searchVariation=200645675323#polycard_client=search-desktop&be_origin=backend&searchVariation=200645675323&search_layout=grid&position=37&type=item&tracking_id=23e16205-5f57-4380-9a8d-63a8e491b492) | $24.639 | -33.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Gorra De Béisbol Ajustable Con El Logotipo De John Deere](https://articulo.mercadolibre.com.ar/MLA-1758533425-gorra-de-beisbol-ajustable-con-el-logotipo-de-john-deere-_JM?searchVariation=200631683569#polycard_client=search-desktop&be_origin=backend&searchVariation=200631683569&search_layout=grid&position=9&type=item&tracking_id=f8f12abf-804a-4eb1-b641-9c5e142a9e7d) | $24.639 | -33.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Gorra De Béisbol De Tela Lavada Con Estampado De John Deere](https://articulo.mercadolibre.com.ar/MLA-1785745041-gorra-de-beisbol-de-tela-lavada-con-estampado-de-john-deere-_JM?searchVariation=201829542799#polycard_client=search-desktop&be_origin=backend&searchVariation=201829542799&search_layout=grid&position=42&type=item&tracking_id=f8f12abf-804a-4eb1-b641-9c5e142a9e7d) | $24.639 | -33.4% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Gorra De Béisbol De Golf Con Estampado John Deere](https://articulo.mercadolibre.com.ar/MLA-1527181163-gorra-de-beisbol-de-golf-con-estampado-john-deere-_JM?searchVariation=185267041194#polycard_client=search-desktop&be_origin=backend&searchVariation=185267041194&search_layout=grid&position=36&type=item&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5) | $23.195 | -37.3% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Gorra Trucker John Deere Moline Ill](https://www.mercadolibre.com.ar/gorra-trucker-john-deere-moline-ill/up/MLAU3340462054#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=25&type=product&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4&wid=MLA2211751914&sid=search) | $23.000 | -37.8% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 46. Gorro Tiger Verde John Deere

- ID Venturino: `338230395`
- Precio Venturino: $42.000
- Tokens: gorra, tiger, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 13
- Candidatos usados: 19 de 19 válidos antes de top
- Candidatos excluidos por precio: 3038
- Candidatos excluidos por score: 846
- Mediana ML: $31.000
- Venturino vs mediana ML: 35.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Gorra Gabardina John Deere Con Rotura](https://www.mercadolibre.com.ar/gorra-gabardina-john-deere-con-rotura/up/MLAU3465580125#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5&wid=MLA1552253565&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Gorra Camionera John Deere Ajustable](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable/up/MLAU235184902#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA935804894&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Gorra John Deere Americana Vintage](https://www.mercadolibre.com.ar/gorra-john-deere-americana-vintage/up/MLAU3618070149#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=c1530bb1-a6d5-4d6e-b6a8-d73df59c9129&wid=MLA2592139810&sid=search) | $30.000 | -28.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Gorra Trucker Gabardina Jhon Deere Bendita Estampa](https://www.mercadolibre.com.ar/gorra-trucker-gabardina-jhon-deere-bendita-estampa/up/MLAU3471323603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=4057e0cc-37ee-4f29-82f5-7a71e9620bc5&wid=MLA2424514130&sid=search) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Gorra John Deere Trucker Premium Negra Con Red](https://www.mercadolibre.com.ar/gorra-john-deere-trucker-premium-negra-con-red/up/MLAU239176316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4&wid=MLA1186238943&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Gorra De Béisbol John Deere Casquette Para Hombre](https://articulo.mercadolibre.com.ar/MLA-1693657759-gorra-de-beisbol-john-deere-casquette-para-hombre-_JM?searchVariation=191118589788#polycard_client=search-desktop&be_origin=backend&searchVariation=191118589788&search_layout=grid&position=22&type=item&tracking_id=79193404-ee69-400f-a997-b694d8caa502) | $29.943 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Gorra De Caníbal John Deere Trucker De L Gorras](https://articulo.mercadolibre.com.ar/MLA-1791109195-gorra-de-canibal-john-deere-trucker-de-l-gorras-_JM?searchVariation=194847647364#polycard_client=search-desktop&be_origin=backend&searchVariation=194847647364&search_layout=grid&position=51&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $29.943 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Gorra De Caníbal John Deere Vintage De L Gorras](https://articulo.mercadolibre.com.ar/MLA-3330235494-gorra-de-canibal-john-deere-vintage-de-l-gorras-_JM?searchVariation=202136715431#polycard_client=search-desktop&be_origin=backend&searchVariation=202136715431&search_layout=grid&position=52&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $29.943 | -28.7% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Gorra De Béisbol Con El Logotipo De John Deere Impreso](https://articulo.mercadolibre.com.ar/MLA-3272626526-gorra-de-beisbol-con-el-logotipo-de-john-deere-impreso-_JM?searchVariation=201372857441#polycard_client=search-desktop&be_origin=backend&searchVariation=201372857441&search_layout=grid&position=22&type=item&tracking_id=f8f12abf-804a-4eb1-b641-9c5e142a9e7d) | $26.356 | -37.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Gorra Camionera John Deere Ajustable Negra Calidad Premium](https://www.mercadolibre.com.ar/gorra-camionera-john-deere-ajustable-negra-calidad-premium/up/MLAU3060859249#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2029398978&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Gorra Trucker Camionera John Deere Ajustable Calidad Premium](https://www.mercadolibre.com.ar/gorra-trucker-camionera-john-deere-ajustable-calidad-premium/up/MLAU278783199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=2&type=product&float_highlight=last_units&tracking_id=490e3a6d-e52b-4fc1-92a4-4ffa74f73fe4&wid=MLA778736698&sid=search) | $32.499 | -22.6% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Gorra Trucker Rustica Rockamora John Deere Ed. Limitada](https://www.mercadolibre.com.ar/gorra-trucker-rustica-rockamora-john-deere-ed-limitada/up/MLAU3816924511#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=797ae654-085b-4b0a-a4eb-ec48869bbadb&wid=MLA2992080562&sid=search) | $31.000 | -26.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Gorra De Béisbol John Deere De Algodón A La Moda, Unisex, Aj](https://articulo.mercadolibre.com.ar/MLA-3175647886-gorra-de-beisbol-john-deere-de-algodon-a-la-moda-unisex-aj-_JM?searchVariation=192916821792#polycard_client=search-desktop&be_origin=backend&searchVariation=192916821792&search_layout=grid&position=55&type=item&tracking_id=871acca8-5df7-419b-bd05-056c65e49990) | $26.371 | -37.2% | tipo: GORRA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 14 | baja | 43 | [Gorras Trucker Gabardina Autos Tractores Bendita Estampa](https://articulo.mercadolibre.com.ar/MLA-1578982475-gorras-trucker-gabardina-autos-tractores-bendita-estampa-_JM?searchVariation=192831757851#polycard_client=search-desktop&be_origin=backend&searchVariation=192831757851&search_layout=grid&position=23&type=item&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b) | $33.600 | -20.0% | tipo: GORRA; tokens comunes: gorra |
| 15 | baja | 43 | [Q Gorro Piluso - Bucket Hat - Marcas Y Logos - Varios](https://articulo.mercadolibre.com.ar/MLA-3090371472-q-gorro-piluso-bucket-hat-marcas-y-logos-varios-_JM?searchVariation=198880199671#polycard_client=search-desktop&be_origin=backend&searchVariation=198880199671&search_layout=grid&position=15&type=item&tracking_id=23e16205-5f57-4380-9a8d-63a8e491b492) | $26.691 | -36.4% | tipo: GORRA; tokens comunes: gorra |
| 16 | baja | 43 | [Q Gorro Piluso - Bucket Hat - Marcas Y Logos - Varios](https://articulo.mercadolibre.com.ar/MLA-1682056055-q-gorro-piluso-bucket-hat-marcas-y-logos-varios-_JM?searchVariation=190601273594#polycard_client=search-desktop&be_origin=backend&searchVariation=190601273594&search_layout=grid&position=10&type=item&tracking_id=871acca8-5df7-419b-bd05-056c65e49990) | $26.599 | -36.7% | tipo: GORRA; tokens comunes: gorra |
| 17 | baja | 43 | [Descuento Gorra De Béisbol Ajustable Estampada De John Wm](https://articulo.mercadolibre.com.ar/MLA-1743443271-descuento-gorra-de-beisbol-ajustable-estampada-de-john-wm-_JM?searchVariation=200036717305#polycard_client=search-desktop&be_origin=backend&searchVariation=200036717305&search_layout=grid&position=32&type=item&tracking_id=c1530bb1-a6d5-4d6e-b6a8-d73df59c9129) | $25.627 | -39.0% | tipo: GORRA; tokens comunes: gorra |
| 18 | baja | 41 | [Combo Gorra Y Remera John Deere](https://articulo.mercadolibre.com.ar/MLA-1440821747-combo-gorra-y-remera-john-deere-_JM?searchVariation=184049237203#polycard_client=search-desktop&be_origin=backend&searchVariation=184049237203&search_layout=grid&position=20&type=item&tracking_id=1f3ea326-d50d-4b3c-838a-984b05cbc3af) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |
| 19 | baja | 40 | [Combo Gorra Y Remera John Deere Logo](https://articulo.mercadolibre.com.ar/MLA-1440898933-combo-gorra-y-remera-john-deere-logo-_JM?searchVariation=184049336429#polycard_client=search-desktop&be_origin=backend&searchVariation=184049336429&search_layout=grid&position=17&type=item&tracking_id=1f3ea326-d50d-4b3c-838a-984b05cbc3af) | $40.000 | -4.8% | tipo: GORRA; penalización tipo adicional candidato: INDUMENTARIA; tokens comunes: gorra; compatibilidad/marca: John Deere |

### 47. Herramienta de recogida magnética John Deere

- ID Venturino: `276194794`
- Precio Venturino: $20.000
- Tokens: herramienta, recogida, magnetica
- Estado análisis: **baja confianza**
- Mejor confianza: baja
- Candidatos media/alta: 0
- Candidatos usados: 11 de 11 válidos antes de top
- Candidatos excluidos por precio: 3295
- Candidatos excluidos por score: 597
- Mediana ML: $23.076
- Venturino vs mediana ML: -13.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | baja | 43 | [Herramientas Para Jardin Juego X 3 Piezas. Jcb-3600410](https://www.mercadolibre.com.ar/herramientas-para-jardin-juego-x-3-piezas-jcb3600410/up/MLAU184493684#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=6c3dff87-37d9-4ce6-9189-f7cb844fe38e&wid=MLA1425402036&sid=search) | $24.063 | 20.3% | tipo: HERRAMIENTA; tokens comunes: herramienta |
| 2 | baja | 41 | [Llaves De Encendido H800 For Excavadora John Deere Case Doz](https://www.mercadolibre.com.ar/10pcs-ignition-keys-h800-for-excavator-case-dozer/p/MLA2053284803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=f15dc6bf-ed7d-4e6f-a026-6b97f97381f5&wid=MLA1715698005&sid=search) | $19.851 | -0.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [` Llaves De Encendido H800 For Excavadora John Deere Case](https://www.mercadolibre.com.ar/10pcs-ignition-keys-h800-for-excavator-case-new-at194969-at1/p/MLA2067030969#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA2920752684&sid=search) | $21.355 | 6.8% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Palancas Apertura Ventana Cabina John Deere Sg2](https://www.mercadolibre.com.ar/palancas-apertura-ventana-cabina-john-deere-sg2/up/MLAU319169472#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=9b04b8a7-d0a5-4164-952a-d1e976f852f0&wid=MLA1409671591&sid=search) | $23.076 | 15.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Palanca Acelerador John Deere Mini Tractor](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-mini-tractor/up/MLAU317170387#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=a89528d3-7356-44e2-86e3-e7b7729d688f&wid=MLA1670269286&sid=search) | $16.314 | -18.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3341141512-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=item&tracking_id=2e0c2f56-d1fd-47d9-a17a-00b23bb79df0) | $24.988 | 24.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3339581592-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ee9c99a9-a9e3-44e9-ba9f-c6ee2b612361) | $24.988 | 24.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-1790351727-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=item&tracking_id=1651d11f-3065-4260-9394-7dc83f4ccb05) | $24.988 | 24.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves Para John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3294300692-tecla-de-encendido-de-arranque-con-llaves-para-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=bd93bfc2-3546-4c23-b143-6f5119e4834a) | $25.581 | 27.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [2 Llaves De Encendido 198360-52160 Para John Deere 2305](https://www.mercadolibre.com.ar/2x-ignition-keys-198360-52160-for-john-deere-2305-/p/MLA2057954004#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=374b2801-fe1f-497c-b840-044645fb7724&wid=MLA1656311673&sid=search) | $13.999 | -30.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 11 | baja | 35 | [Llaves De Encendido H800 De 10 Piezas Para Excavadora Case D](https://www.mercadolibre.com.ar/-llaves-de-encendido-h800-for-excavadora-john-deere-case/p/MLA2025754994#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=140fe069-0cf3-4381-a329-fb1c26ed4dce&wid=MLA2739125474&sid=search) | $19.349 | -3.3% | tipo: HERRAMIENTA |

### 48. Inyector Electrónico de Combustible. John Deere

- ID Venturino: `318857262`
- Precio Venturino: $4.446.600
- Tokens: inyector, electronico, combustible
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3888
- Candidatos excluidos por score: 15
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 49. Jarro Chalten Verde John Deere

- ID Venturino: `338234315`
- Precio Venturino: $21.000
- Tokens: jarro, chalten, verde
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3264
- Candidatos excluidos por score: 639
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 50. Jarro Daten térmico John Deere

- ID Venturino: `276164724`
- Precio Venturino: $62.000
- Tokens: jarro, daten, termico
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3064
- Candidatos excluidos por score: 839
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 51. Jarro Road Blanco/Negro John Deere

- ID Venturino: `276165042`
- Precio Venturino: $39.000
- Tokens: jarro, road, blanco, negro
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3050
- Candidatos excluidos por score: 853
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 52. Jarro Titan gris claro John Deere

- ID Venturino: `338236578`
- Precio Venturino: $61.000
- Tokens: jarro, titan, gris, claro
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3070
- Candidatos excluidos por score: 833
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 53. Jarro Zeit negro John Deere

- ID Venturino: `276162223`
- Precio Venturino: $29.000
- Tokens: jarro, zeit, negro
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3039
- Candidatos excluidos por score: 864
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 54. Juego de ganchos John Deere 4 piezas

- ID Venturino: `276681817`
- Precio Venturino: $97.000
- Tokens: juego, gancho, 4, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 7
- Candidatos usados: 20 de 24 válidos antes de top
- Candidatos excluidos por precio: 2873
- Candidatos excluidos por score: 1006
- Mediana ML: $94.016
- Venturino vs mediana ML: 3.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA922576085&sid=search) | $111.000 | 14.4% | tipo: HERRAMIENTA; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1721056741&sid=search) | $99.990 | 3.1% | tipo: HERRAMIENTA; tokens comunes: juego, pieza |
| 3 | media | 50 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | -20.0% | tipo: HERRAMIENTA; tokens comunes: pieza; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Set Juego Herramientas Tubos Y Llaves Kroner De 110 Piezas](https://www.mercadolibre.com.ar/set-juego-herramientas-tubos-y-llaves-kroner-de-110-piezas/p/MLA37511538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1458232893&sid=search) | $70.512 | -27.3% | tipo: HERRAMIENTA; tokens comunes: juego, pieza |
| 5 | media | 49 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2491947770&sid=search) | $94.543 | -2.5% | tipo: HERRAMIENTA; tokens comunes: juego; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | -21.6% | tipo: HERRAMIENTA; tokens comunes: juego; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | -21.6% | tipo: HERRAMIENTA; tokens comunes: juego; compatibilidad/marca: John Deere |
| 8 | baja | 43 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2308233004&sid=search) | $114.799 | 18.3% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 9 | baja | 43 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | -24.8% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 10 | baja | 42 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1448971691&sid=search) | $110.268 | 13.7% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 11 | baja | 42 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323710072&sid=search) | $118.999 | 22.7% | tipo: HERRAMIENTA; tokens comunes: juego |
| 12 | baja | 42 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | -36.0% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 13 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Sí Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-si-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1562325653&sid=search) | $131.905 | 36.0% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 14 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94f1e34d-fd49-461c-a867-d50402b5cd6a&wid=MLA1399126385&sid=search) | $93.489 | -3.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [John Deere Pop Up Upp Tractor Playhouse Para Niños \| Llave Y](https://www.mercadolibre.com.ar/john-deere-pop-up-upp-tractor-playhouse-para-ninos-llave-y/p/MLA2068378549#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2382371904&sid=search) | $117.784 | 21.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | -28.9% | tipo: HERRAMIENTA; penalización tipo adicional candidato: BOLSO; tokens comunes: juego, pieza |
| 17 | baja | 41 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | -39.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 18 | baja | 35 | [Kit De Herramienta De Giro De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-for-john-deere/p/MLA2027963136#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2399369304&sid=search) | $103.313 | 6.5% | tipo: HERRAMIENTA |
| 19 | baja | 35 | [For Kit De Herramienta De De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-metal-for-john-deere/p/MLA2024534734#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2464989688&sid=search) | $115.762 | 19.3% | tipo: HERRAMIENTA |
| 20 | baja | 31 | [John Deere Power Tools Motosierra De Juguete, Herramienta De](https://www.mercadolibre.com.ar/john-deere-power-tools-chainsaw-toy-construction-tool-with/p/MLA2045929485#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2491947932&sid=search) | $92.688 | -4.4% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |

### 55. Juego de herramientas SAE y Métricos de ¼” John Deere

- ID Venturino: `276196679`
- Precio Venturino: $282.000
- Tokens: juego, herramienta, sae, metrico
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 6
- Candidatos usados: 16 de 16 válidos antes de top
- Candidatos excluidos por precio: 3337
- Candidatos excluidos por score: 550
- Mediana ML: $259.729
- Venturino vs mediana ML: 8.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Caja De Herramientas John Deere Original](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-original/up/MLAU146025313#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2498679402&sid=search) | $316.000 | 12.1% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=0f941725-e8d7-436e-8b79-5e584d8fb5da&wid=MLA1399304181&sid=search) | $260.000 | -7.8% | tipo: HERRAMIENTA; tokens comunes: juego; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Caja De Herramientas John Deere Original Negra Metalica](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=oJjBGTVdvOhQroxHVyhxM5V6WmExVzPft1l%2BEn0A2cRRYdh%2BJqWnSE%2ByOcSKuxFsZrDmSREuBiUk4xGJjOLMvlaQlyOc4Pund3bvsTLwplTxSMcPIP%2BbrkH2zNCDcSVZl8BG4h1QR0mKViSwnuAzeLJPYLEmqK84Kl35wpMmAk1%2FbOSkAcBF0WxlBc%2Fsz7XFqcOM7n0fCcsXHwUBq%2FSytTYEkjXgzidGp%2Bc0Xfm%2F0N3yERue8M2b%2FCc5FKIBo0m1E84Lxv6ONY5UDnLPYNcoZxOtNT%2BEresBL%2FRQKY1pjrmg8wrkBdbZN%2Fbw%2Bhx3a6BnCgCs%2FLARhjIV8IrbY92sJPRHt2Hl%2FtEY6Sx5lo2TElITnvMdODlIos%2FN2Fk4S98%2FNxahl2RQu7c9dDphrGls2hx470or1GoPAJ0elwmcaN9sFZtWPwlrizzkobnXlzdL65WORklu5WNQVD88vxt9Ilkg3Jn24TLwzhEpP5NXy%2Fm35SFrGWxrnGlmPIsZ2g6nsVGIr3mwKDPQh6%2B%2Fbrz5XWG2fK%2FyOvLQXDp4iKa%2FWBASlWLN%2BbASnmvWQjC%2BD44IZtCwtQeYWeIXiWYVsdZDNaH2PkJWz4nuAfnEi1COCjQrISvLdcckjPwnjathIxLjAt17NwskH2ggGkp4pHbJgAFAEolmaGyKZwDDh9PnzvW5dS6YkAHUIQo1DnLYHJbQfrjjfYVxLwPqEY8h1MpijT8IixlxEHGqqV3kOqzRL%2BVa%2BzUAi4720JnTPBxRD4YVD8i6iZTVo1EN4nR%2Bh9N25Ycokf22mwcSZNstTMdSUgt8mBc1Nzt%2B7yEGbOfhqwNdU3OzkVENZSlqicGvdF06zOW0rFPaoDRviQ8Rd%2B%2BVO3%2FrDB%2BnwAqLSQ6Sz7lGyL3j4xAzFpw9x49i3EsCPLe4fMY7mmnmiB3SolZK%2BRupYY0q59J1AHKIczOFRPWPtGwLELJtDGLm63SIblql7QguupgiQxODofdG3WGhAhirOUL1xocjPDYyiFo%3D&pdp_filters=item_id%3AMLA2366991554#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU155276910&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA2366991554&sid=search) | $259.457 | -8.0% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Banco De Trabajo Infantil John Deere, Taller De Herramientas](https://www.mercadolibre.com.ar/john-deere-kids-workbench-power-tools-workshop-build-your/p/MLA2048863444#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1567156299&sid=search) | $219.881 | -22.0% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3126102700&sid=search) | $194.998 | -30.9% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 6 | media | 48 | [Caja de herramientas John Deere AJM2019 de metal 20.5cm x 51cm x 18cm](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-ajm2019-de-metal-205cm-x-51cm-x-18cm/p/MLA9796751#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2499791866&sid=search) | $316.000 | 12.1% | tipo: HERRAMIENTA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 7 | baja | 43 | [Set De Juego Granero Redondo Con 73 Piezas Accesorios](https://www.mercadolibre.com.ar/set-de-juego-granero-redondo-con-73-piezas-accesorios/up/MLAU3629077811#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1594155585&sid=search) | $364.628 | 29.3% | tipo: HERRAMIENTA; tokens comunes: juego |
| 8 | baja | 42 | [Juego Llaves Tubo Crique 121 Pzs Mecanica Profesional](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-121-pzs-mecanica-profesional/up/MLAU3962621953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323733620&sid=search) | $223.999 | -20.6% | tipo: HERRAMIENTA; tokens comunes: juego |
| 9 | baja | 42 | [Juego De Tubos Enc 3/4 De 21 Pz C/ Maletin Wembley 0180](https://www.mercadolibre.com.ar/juego-de-tubos-enc-34-de-21-pz--c-maletin-wembley-0180/up/MLAU152264621#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1154134844&sid=search) | $360.030 | 27.7% | tipo: HERRAMIENTA; tokens comunes: juego |
| 10 | baja | 41 | [Switch Tambor De Arranque Con Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-con-llave-tractores-john-deere/up/MLAU3120846470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2050159868&sid=search) | $189.097 | -32.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 11 | baja | 33 | [Juguete Preescolar Cinturón De Herramientas Hablando John De](https://www.mercadolibre.com.ar/juguete-preescolar-cinturon-de-herramientas-hablando-john-de/up/MLAU3210473159#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1793731219&sid=search) | $272.166 | -3.5% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: herramienta |
| 12 | baja | 31 | [Set Ertl 1:64 John Deere 24 Piezas - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-164-john-deere-24-piezas--a-pedidoexkarg/up/MLAU3223535397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA2105563026&sid=search) | $233.008 | -17.4% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 31 | [Set Tractores 1/64 John Deere 3 Piezas - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-3-piezas--a-pedidoexkarg/up/MLAU2967666199#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1472549201&sid=search) | $346.581 | 22.9% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 25 | [Set De Juguetes De Granja 70 Piezas Con Tractores Y Animales](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-70-piezas-con-tractores-y-animales/up/MLAU3573489279#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2584095554&sid=search) | $293.556 | 4.1% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE |
| 15 | baja | 25 | [Correa De Herramientas Interactiva Con Sonidos John Deere](https://www.mercadolibre.com.ar/correa-de-herramientas-interactiva-con-sonidos-john-deere/up/MLAU3967723569#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3331425306&sid=search) | $247.399 | -12.3% | tipo: HERRAMIENTA; penalización tipo adicional candidato: CORREA; tokens comunes: herramienta; compatibilidad/marca: John Deere |
| 16 | baja | 25 | [Correa De Herramientas Interactiva Con Sonidos John Deere](https://www.mercadolibre.com.ar/correa-de-herramientas-interactiva-con-sonidos-john-deere/up/MLAU3868845007#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1729007443&sid=search) | $194.998 | -30.9% | tipo: HERRAMIENTA; penalización tipo adicional candidato: CORREA; tokens comunes: herramienta; compatibilidad/marca: John Deere |

### 56. Juego de llaves Métricas John Deere Set de 7 piezas

- ID Venturino: `276679540`
- Precio Venturino: $200.000
- Tokens: juego, llave, metrica, set, 7, pieza
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 8
- Candidatos usados: 14 de 14 válidos antes de top
- Candidatos excluidos por precio: 3029
- Candidatos excluidos por score: 860
- Mediana ML: $192.048
- Venturino vs mediana ML: 4.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Cinturón De Herramientas John Deere Para Niños - 7 Piezas Con Embalaje Adicional](https://www.mercadolibre.com.ar/cinturon-de-herramientas-john-deere-para-ninos-7-piezas/p/MLA2051401324#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3126102700&sid=search) | $194.998 | -2.5% | tipo: HERRAMIENTA; tokens comunes: 7, pieza; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Juego De Tubos 3/8 John Deere Original 20 Piezas](https://www.mercadolibre.com.ar/juego-de-tubos-38-john-deere-original-20-piezas/up/MLAU182216083#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=0f941725-e8d7-436e-8b79-5e584d8fb5da&wid=MLA1399304181&sid=search) | $260.000 | 30.0% | tipo: HERRAMIENTA; tokens comunes: juego, pieza; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1510545543&sid=search) | $135.947 | -32.0% | tipo: HERRAMIENTA; tokens comunes: juego, llave, pieza |
| 4 | media | 49 | [Switch Tambor De Arranque Con Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-con-llave-tractores-john-deere/up/MLAU3120846470#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2050159868&sid=search) | $189.097 | -5.5% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Juego Llaves Tubo Crique 121 Pzs Mecanica Profesional](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-121-pzs-mecanica-profesional/up/MLAU3962621953#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323733620&sid=search) | $223.999 | 12.0% | tipo: HERRAMIENTA; tokens comunes: juego, llave |
| 6 | media | 49 | [Switch Tambor De Arranque Sin Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-sin-llave-tractores-john-deere/up/MLAU155926304#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1245977771&sid=search) | $151.758 | -24.1% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3242261346&sid=search) | $139.998 | -30.0% | tipo: HERRAMIENTA; tokens comunes: pieza; compatibilidad/marca: John Deere |
| 8 | media | 45 | [Set Ertl 1:64 John Deere 24 Piezas - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-164-john-deere-24-piezas--a-pedidoexkarg/up/MLAU3223535397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA2105563026&sid=search) | $233.008 | 16.5% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; tokens comunes: set, pieza; compatibilidad/marca: John Deere |
| 9 | baja | 42 | [Kit Herramientas 85 Piezas Jadever Sí Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-si-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1562325653&sid=search) | $131.905 | -34.0% | tipo: HERRAMIENTA; tokens comunes: pieza |
| 10 | baja | 41 | [Banco De Trabajo Infantil John Deere, Taller De Herramientas](https://www.mercadolibre.com.ar/john-deere-kids-workbench-power-tools-workshop-build-your/p/MLA2048863444#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1567156299&sid=search) | $219.881 | 9.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Caja De Herramientas John Deere Original Negra Metalica](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=oJjBGTVdvOhQroxHVyhxM5V6WmExVzPft1l%2BEn0A2cRRYdh%2BJqWnSE%2ByOcSKuxFsZrDmSREuBiUk4xGJjOLMvlaQlyOc4Pund3bvsTLwplTxSMcPIP%2BbrkH2zNCDcSVZl8BG4h1QR0mKViSwnuAzeLJPYLEmqK84Kl35wpMmAk1%2FbOSkAcBF0WxlBc%2Fsz7XFqcOM7n0fCcsXHwUBq%2FSytTYEkjXgzidGp%2Bc0Xfm%2F0N3yERue8M2b%2FCc5FKIBo0m1E84Lxv6ONY5UDnLPYNcoZxOtNT%2BEresBL%2FRQKY1pjrmg8wrkBdbZN%2Fbw%2Bhx3a6BnCgCs%2FLARhjIV8IrbY92sJPRHt2Hl%2FtEY6Sx5lo2TElITnvMdODlIos%2FN2Fk4S98%2FNxahl2RQu7c9dDphrGls2hx470or1GoPAJ0elwmcaN9sFZtWPwlrizzkobnXlzdL65WORklu5WNQVD88vxt9Ilkg3Jn24TLwzhEpP5NXy%2Fm35SFrGWxrnGlmPIsZ2g6nsVGIr3mwKDPQh6%2B%2Fbrz5XWG2fK%2FyOvLQXDp4iKa%2FWBASlWLN%2BbASnmvWQjC%2BD44IZtCwtQeYWeIXiWYVsdZDNaH2PkJWz4nuAfnEi1COCjQrISvLdcckjPwnjathIxLjAt17NwskH2ggGkp4pHbJgAFAEolmaGyKZwDDh9PnzvW5dS6YkAHUIQo1DnLYHJbQfrjjfYVxLwPqEY8h1MpijT8IixlxEHGqqV3kOqzRL%2BVa%2BzUAi4720JnTPBxRD4YVD8i6iZTVo1EN4nR%2Bh9N25Ycokf22mwcSZNstTMdSUgt8mBc1Nzt%2B7yEGbOfhqwNdU3OzkVENZSlqicGvdF06zOW0rFPaoDRviQ8Rd%2B%2BVO3%2FrDB%2BnwAqLSQ6Sz7lGyL3j4xAzFpw9x49i3EsCPLe4fMY7mmnmiB3SolZK%2BRupYY0q59J1AHKIczOFRPWPtGwLELJtDGLm63SIblql7QguupgiQxODofdG3WGhAhirOUL1xocjPDYyiFo%3D&pdp_filters=item_id%3AMLA2366991554#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU155276910&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA2366991554&sid=search) | $259.457 | 29.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 12 | baja | 31 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | -34.4% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 31 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | -38.6% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 25 | [Juguete Preescolar Cinturón De Herramientas Hablando John De](https://www.mercadolibre.com.ar/juguete-preescolar-cinturon-de-herramientas-hablando-john-de/up/MLAU3210473159#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1793731219&sid=search) | $272.166 | 36.1% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE |

### 57. Juego de transporte Farmin Friends John Deere

- ID Venturino: `281259377`
- Precio Venturino: $260.000
- Tokens: juego, transporte, farmin, friend
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 20 de 136 válidos antes de top
- Candidatos excluidos por precio: 3271
- Candidatos excluidos por score: 496
- Mediana ML: $259.000
- Venturino vs mediana ML: 0.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 48 | [Tomy John Deere Granja 1:32 Escala Juego Infantil Incluye](https://articulo.mercadolibre.com.ar/MLA-1510834105-tomy-john-deere-granja-132-escala-juego-infantil-incluye-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $174.251 | -33.0% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Juguete Tractor 2024 1:64 John Deere 8rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-tractor-2024-164-john-deere-8rt--a-pedidoexkarg/up/MLAU2698971101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1950447406&sid=search) | $260.245 | 0.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=DfaxCfGhYqcb%2Fr6mhMw1u4SDaZODlpDhRV4Kw2COKUMhD1apSNLFcOd3G1uLPj3kpIjZaaUM9HTwFUzKCYLySyg4UxIm4XJIl0zcqZ5oP3zaFyf%2FkcHcsxwTfJFzu0OVTv0pKHwfh5Wq6MnJn%2BrD8mEYylmC4Xu7g0iy06QdQvPZ3UhQppSdJTYj3l93%2BfvxmRVATRit4VFQuC93BqoYAC1ut1AfhNL77azrlfrzsFyKHfBlTwHjgdEYkH1D2UJNx9OfYmZDWuPJzBeBlgMDRbN%2BwLo3lxdZnj3zRPHJnC1%2BCIDa9PyT2EmENGxk%2Bbz1NKPmcnv98lZbQC45%2BWHtwjfzrebDpz2Hzvcqg57B35uOdx0f1UnLjkpB7csCg3bhR9mps9cFF4V1i8zMCARu%2Fpl54NCRSZPU2oNdgQtxv5TBR0OBqkCbFjvPqhUNktUwaNTVccYXHBhK6kWR6siop%2FKbDkM8tS5nLK6dkjbuBDwIZZKT1zBaq3A%2BhGnj96PNtbPWJPkVhV27bJoHBxASphWlQo8fAoVVdZ9Svvr4bR0gV0g0gOqBOVHFUmllY28tpQmkCbS1dAtJN5XoLYdwn7aCNVvQzeUzc0B60yp7oWHEf37jDuTF%2B1Xf4ynmZXA0ZtPForWNj%2FCKt0W%2BBNXcM3bQUI1LnlXNdnNFHxqh7SNqgttQMWx0EItK1f2ZYD1HYDbyPhhNnlesMhyWJt7AKEe7BORg8xdaFTgKvbRXsbIcU749oDr7fMVcRC8q3BQo91y3siRtUfzGr70HFpbHqeutXSXQOBPekEwNPIYk%2B2A5s07mV9Wfp2nETHGC7oT3%2FVEU5pEmPk8GWaOafsVwlbSrkK6kyIekqkym0UDQMVydKbia0bhBwfpC21ySfAU2WL6DInppb%2BJNM6I1SDY8B94cYLlYLuFJ0KBuJ5jmJIzNFwpQ%2FRLVbXrCZfZzrGhvda2NPj9AfgJKzWhO3o58UvQd%2F3CbGYPUByLNBm%2F4ikOP%2F04YxyJXSiG8LXk%3D&pdp_filters=item_id%3AMLA1688046131#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54486376&backend_model=search-backend&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1688046131&sid=search) | $259.000 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1583656447&sid=search) | $259.000 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Topadora Tomy John Deere 1:50 544p - A Pedido_exkarg](https://www.mercadolibre.com.ar/topadora-tomy-john-deere-150-544p--a-pedidoexkarg/up/MLAU3569506062#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1584365843&sid=search) | $258.990 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juguete Coleccion John Deere Applicator - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-coleccion-john-deere-applicator--a-pedidoexkarg/up/MLAU150162086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1141825591&sid=search) | $258.952 | -0.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Réplica John Deere Pala Trituradora 1:50 Colección](https://www.mercadolibre.com.ar/replica-john-deere-pala-trituradora-150-coleccion/up/MLAU3876131784#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1725969655&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Maqueta John Deere 843l-ii 1:50 Colección Prestige](https://www.mercadolibre.com.ar/maqueta-john-deere-843lii-150-coleccion-prestige/up/MLAU3876133382#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3117350930&sid=search) | $262.099 | 0.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Cosechadora Ertl 1:64 John Deere X9 1000 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-ertl-164-john-deere-x9-1000--a-pedidoexkarg/up/MLAU837719838#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1447751815&sid=search) | $263.348 | 1.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor John Deere Simple Dimpl De Toy Fat Brain, Más De 3 A](https://articulo.mercadolibre.com.ar/MLA-1556139169-tractor-john-deere-simple-dimpl-de-toy-fat-brain-mas-de-3-a-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $256.072 | -1.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Juguete John Deere Six Bottom Plow - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-john-deere-six-bottom-plow--a-pedidoexkarg/up/MLAU376597166#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1782744664&sid=search) | $255.079 | -1.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Cosechadora 1/64 Ertl John Deere X9 1100 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-164-ertl-john-deere-x9-1100--a-pedidoexkarg/up/MLAU1188618184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1911294048&sid=search) | $265.120 | 2.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1949945520&sid=search) | $265.905 | 2.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1476358051&sid=search) | $269.326 | 3.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Cosechadora miniatura John Deere X9 1100 1/64 Ertl](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=qtRfHLB64Q4ohzC8ed7r3zRiiTcHMJIc0QhRCdOBlbB6LPLhPRseGRtIDBLsbNXLaL%2F4ljBNiVX2Fc3H11DBjsAIG9WuBOeTqIL0%2F4o38QzJBWImi7IT5kdU%2FYoELcjd9HD8CTMEmQ5udjmuufngtwRJ9XO2h7rhtUxMORXRxtHJZloHHMJPIuPRXs6bgXOo1X05ra7wAZIbF8x9JXnGDjDVu%2BmgbkJ3wIGduPA%2FeyzNRJEDUcOZZ9JUhXna3%2FvrACDcFQ%2FVDgMLkyN%2BkjKzzz%2Ft7hWwXUNW3gWjc2Tin2rWSrjtXU31rwMtYAclQFO%2FZvtNVmljwz%2FRWmnYM6foQc%2Ba1mjo0X7LJ%2BhrQUus4Y6DoSIdMZwYxbDasGZ7Z3gvoL%2FGu0y5wGaGdiMVvFB6AYAeCHO1VUDzXsOxKtyd6MJOz3upKD9PRM1Up43gWHfg0PjxCjeBQPpnqmkrtaXv4e0CjxY993tHFLeFWDQzDnC4DND6JWUKnhyrXEdrgR9B5zdOpF6vkk%2BWvLV8ySLfHNej3nPYPREEXjnvPoYrqN9BcZSo5ug6W0aWkbUCf0HXqAOlfom0svLjNIwwbVAvpj7WFhM3AsodmkLOOaNHpJO%2Bz6Wf7kJBSLMRp9RL7R3xWy1bEIo0RIFklV0Ho1%2FfoVOfsFWjq92sfwZF4OGQOIFpqCc%2F%2BHWwOPEQS2NMEWKJ067qjr7eql%2B5XsHq13L1QfkSrqxSIGNMSnlevc6O5RJuwI0I3typNGYY2n8IcJc5ZWU1COEenn7YnPxr6x3nLyhlNyxPP049xBXpdH2kS3sAnTrbz%2Ffm4rSxHNTc460cbdP9LoaEtgGMW8MI5B3x1Yh9A%2FdBZeZ5cIYF8lEuAhK8GAhl1lVH3WMf0YirUKArkxKWx5tyFJGQf%2F68hCKq2NShApuyUMRqClqRLoQxI5cGbfrzxjpx%2BrnYjLoLiJINmiI4GnPTDQOfKTIdQ%2Fbyvd1loYPq&pdp_filters=item_id%3AMLA2806898370#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA21742050&backend_model=search-backend&be_origin=backend&search_layout=grid&position=13&type=pad&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2806898370&sid=search) | $250.000 | -3.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Antiguo Tractor De Juguete John Deere Mod 730 Aluminio #1](https://www.mercadolibre.com.ar/antiguo-tractor-de-juguete-john-deere-mod-730-aluminio--1/up/MLAU3383194834#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2289667224&sid=search) | $250.000 | -3.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Bruder Tractor John Deere 1210E Escala 1:16 Plástico ABS Verde](https://www.mercadolibre.com.ar/bruder-tractor-john-deere-1210e-escala-116-plastico-abs-verde/p/MLA36754869#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2473469172&sid=search) | $249.947 | -3.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Carro De Juguete Carga 1/16 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-juguete-carga-116-john-deere--a-pedidoexkarg/up/MLAU154023220#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1165966476&sid=search) | $249.947 | -3.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Tractor Juguete John Deere 1/50 843l - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-150-843l--a-pedidoexkarg/up/MLAU375792789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1784542220&sid=search) | $270.089 | 3.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1784581058&sid=search) | $270.242 | 3.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 58. Juego de tubos flexibles Métricos

- ID Venturino: `276196682`
- Precio Venturino: $119.000
- Tokens: juego, tubo, flexibl, metrico
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 20 de 22 válidos antes de top
- Candidatos excluidos por precio: 2801
- Candidatos excluidos por score: 1080
- Mediana ML: $112.900
- Venturino vs mediana ML: 5.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego Llaves Tubo Crique 82 Pzs Profesional Mecanica](https://www.mercadolibre.com.ar/juego-llaves-tubo-crique-82-pzs-profesional-mecanica/up/MLAU3974934124#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3323710072&sid=search) | $118.999 | -0.0% | tipo: HERRAMIENTA; tokens comunes: juego, tubo |
| 2 | media | 50 | [Juego De Tubos Llaves Y Puntas Kroner 108 Piezas Cr. Vanadio](https://www.mercadolibre.com.ar/juego-de-tubos-llaves-y-puntas-kroner-108-piezas-cr-vanadio/p/MLA52746870#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1510545543&sid=search) | $135.947 | 14.2% | tipo: HERRAMIENTA; tokens comunes: juego, tubo |
| 3 | media | 50 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1721056741&sid=search) | $99.990 | -16.0% | tipo: HERRAMIENTA; tokens comunes: juego, tubo |
| 4 | baja | 43 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA922576085&sid=search) | $111.000 | -6.7% | tipo: HERRAMIENTA; tokens comunes: juego |
| 5 | baja | 43 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2491947770&sid=search) | $94.543 | -20.6% | tipo: HERRAMIENTA; tokens comunes: juego |
| 6 | baja | 43 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | -36.1% | tipo: HERRAMIENTA; tokens comunes: juego |
| 7 | baja | 43 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | -36.1% | tipo: HERRAMIENTA; tokens comunes: juego |
| 8 | baja | 35 | [John Deere Pop Up Upp Tractor Playhouse Para Niños \| Llave Y](https://www.mercadolibre.com.ar/john-deere-pop-up-upp-tractor-playhouse-para-ninos-llave-y/p/MLA2068378549#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2382371904&sid=search) | $117.784 | -1.0% | tipo: HERRAMIENTA |
| 9 | baja | 35 | [For Kit De Herramienta De De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-metal-for-john-deere/p/MLA2024534734#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2464989688&sid=search) | $115.762 | -2.7% | tipo: HERRAMIENTA |
| 10 | baja | 35 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2308233004&sid=search) | $114.799 | -3.5% | tipo: HERRAMIENTA |
| 11 | baja | 35 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1448971691&sid=search) | $110.268 | -7.3% | tipo: HERRAMIENTA |
| 12 | baja | 35 | [Kit Herramientas 85 Piezas Jadever Sí Fábrica Jdhs3b85 Verde Oscuro](https://www.mercadolibre.com.ar/kit-herramientas-85-piezas-jadever-si-fabrica-jdhs3b85-verde-oscuro/p/MLA41528131#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1562325653&sid=search) | $131.905 | 10.8% | tipo: HERRAMIENTA |
| 13 | baja | 35 | [Kit De Herramienta De Giro De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-for-john-deere/p/MLA2027963136#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2399369304&sid=search) | $103.313 | -13.2% | tipo: HERRAMIENTA |
| 14 | baja | 35 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/caja-de-herramientas-john-deere-18-piezas/p/MLA47952586#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3242261346&sid=search) | $139.998 | 17.6% | tipo: HERRAMIENTA |
| 15 | baja | 35 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94f1e34d-fd49-461c-a867-d50402b5cd6a&wid=MLA1399126385&sid=search) | $93.489 | -21.4% | tipo: HERRAMIENTA |
| 16 | baja | 35 | [Switch Tambor De Arranque Sin Llave Tractores John Deere](https://www.mercadolibre.com.ar/switch-tambor-de-arranque-sin-llave-tractores-john-deere/up/MLAU155926304#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1245977771&sid=search) | $151.758 | 27.5% | tipo: HERRAMIENTA |
| 17 | baja | 35 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | -34.8% | tipo: HERRAMIENTA |
| 18 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | -38.7% | tipo: HERRAMIENTA |
| 19 | baja | 25 | [John Deere Big Scoop Dump Truck Toy Con Herramientas De Caja](https://www.mercadolibre.com.ar/john-deere-35766-big-scoop-dump-truck-38cm-vehicle-green/p/MLA2063937914#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2587948022&sid=search) | $122.799 | 3.2% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE |
| 20 | baja | 25 | [John Deere Big Scoop Camión Juguete Con Herramientas](https://www.mercadolibre.com.ar/camion-de-juguete-john-deere-46510/p/MLA2033755989#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2307615312&sid=search) | $131.190 | 10.2% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE |

### 59. Juego de vehiculos John Deere

- ID Venturino: `281053472`
- Precio Venturino: $90.000
- Tokens: juego, vehiculo
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 14
- Candidatos usados: 20 de 100 válidos antes de top
- Candidatos excluidos por precio: 2897
- Candidatos excluidos por score: 906
- Mediana ML: $90.137
- Venturino vs mediana ML: -0.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Juego De Juguetes Sandbox Tomy John Deere, Volquete Y Pala](https://www.mercadolibre.com.ar/sandbox-toy-set-tomy-john-deere-dump-truck-bucket-shovel/p/MLA2039843792#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1535052371&sid=search) | $90.105 | 0.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mini Vehículos John Deere, Paquete De 3 Con Luces Y Sonidos](https://www.mercadolibre.com.ar/john-deere-realistic-farm-vehicles-3-pack-toy-vehicles-w/p/MLA2078747648#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3334814640&sid=search) | $77.625 | -13.8% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $104.499 | 16.1% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=12&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $75.376 | -16.2% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2160207414&sid=search) | $75.057 | -16.6% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 6 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | -20.4% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | -22.4% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | -22.4% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3673017977#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1608424219&sid=search) | $115.299 | 28.1% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381500&sid=search) | $120.000 | 33.3% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tomy John Deere: Juego De Granja 1:32 Con Heno](https://articulo.mercadolibre.com.ar/MLA-2186712008-tomy-john-deere-juego-de-granja-132-con-heno-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $123.711 | 37.5% | tipo: JUGUETE; tokens comunes: juego; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Set De Juguetes De Granja John Deere Ertl - 3 Vehículos](https://www.mercadolibre.com.ar/set-de-juguetes-de-granja-john-deere-ertl--3-vehiculos/up/MLAU3877277235#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3148660886&sid=search) | $124.998 | 38.9% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA3271462064&sid=search) | $83.690 | -7.0% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set De Vehículos John Deere Dump Truck And Tractor Kids 18m+](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-dump-truck-toy-tractor/p/MLA2062906056#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1556138081&sid=search) | $107.098 | 19.0% | tipo: JUGUETE; tokens comunes: vehiculo; compatibilidad/marca: John Deere |
| 15 | baja | 43 | [Compatible Juego De Sábanas Tractor Tamaño Individual Zdaz](https://www.mercadolibre.com.ar/-a-juego-de-sabanas-john-deere-tractor-de-tamano-/p/MLA2036636318#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=27a16bdb-833b-4e7f-acaf-628b04d4cf05&wid=MLA1774178399&sid=search) | $120.824 | 34.2% | tipo: JUGUETE; tokens comunes: juego |
| 16 | baja | 41 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | 0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -0.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2351763726&sid=search) | $90.169 | 0.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | 0.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/l-tractor-de-juguete-de-granja-grande-con-luces-y-sonidos-z/p/MLA2057912939#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1652235961&sid=search) | $90.773 | 0.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 60. Juguete Desmontable Build a Buddy Bonnie Scooper John Deere

- ID Venturino: `281259380`
- Precio Venturino: $73.000
- Tokens: juguete, desmontable, build, buddy, bonnie, scooper
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 19
- Candidatos usados: 20 de 51 válidos antes de top
- Candidatos excluidos por precio: 2949
- Candidatos excluidos por score: 903
- Mediana ML: $83.592
- Venturino vs mediana ML: -12.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | -4.7% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | -5.3% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Lamaze John Deere: Asiento De Automóvil Y Juguete Para Bebé](https://articulo.mercadolibre.com.ar/MLA-2168937218-lamaze-john-deere-asiento-de-automovil-y-juguete-para-bebe-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $78.841 | 8.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | -12.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | -14.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | 14.4% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Juguete De Peluche John Deere Corny Dancer](https://articulo.mercadolibre.com.ar/MLA-3122960126-juguete-de-peluche-john-deere-corny-dancer-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=item&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20) | $87.840 | 20.3% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2351763726&sid=search) | $90.169 | 23.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | 24.1% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Set De Transporte De Camiones De Juguete John Deere Farmin'](https://www.mercadolibre.com.ar/john-deere-farmin-friends-toy-hauling-set-kids-vehicle/p/MLA2076277978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3339182498&sid=search) | $90.865 | 24.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381464&sid=search) | $100.000 | 37.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2160207414&sid=search) | $75.057 | 2.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 13 | media | 48 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | 3.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Lote 2 Arados Retro John Deere C/ Detalles Juguete Vintage](https://www.mercadolibre.com.ar/lote-2-arados-retro-john-deere-c-detalles-juguete-vintage/up/MLAU2393241891#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1455831071&sid=search) | $77.777 | 6.5% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Vehículo De Juguete John Deere Tomy Rsx 860i Gator Escala 1:](https://www.mercadolibre.com.ar/toy-john-deere-tomy-rsx-860i-gator-132-scale-for-kids-3/p/MLA2084215998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA3271462064&sid=search) | $83.690 | 14.6% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Tomy John Deere Animal Sounds Hayride - Juguete Preescolar](https://www.mercadolibre.com.ar/tomy-john-deere-animal-sounds-hayride-juguete-preescolar/p/MLA2031672694#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2169072778&sid=search) | $88.357 | 21.0% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/l-tractor-de-juguete-de-granja-grande-con-luces-y-sonidos-z/p/MLA2057912939#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1652235961&sid=search) | $90.773 | 24.3% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Sunny Days Entertainment John Deere Leaf Blower Juguete Para](https://www.mercadolibre.com.ar/sunny-days-entertainment-john-deere-leaf-blower-juguete-para/p/MLA2039341184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2182323334&sid=search) | $94.786 | 29.8% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 19 | media | 48 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=&sid=search) | $96.260 | 31.9% | tipo: JUGUETE; tokens comunes: juguete; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2169077264&sid=search) | $74.053 | 1.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 61. Kit de Pistones y Camisas. John Deere

- ID Venturino: `318854955`
- Precio Venturino: $2.334.000
- Tokens: kit, piston, camisa
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3872
- Candidatos excluidos por score: 31
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
- Candidatos excluidos por precio: 3855
- Candidatos excluidos por score: 48
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
- Candidatos excluidos por precio: 3324
- Candidatos excluidos por score: 579
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
- Candidatos excluidos por precio: 3687
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
- Candidatos excluidos por precio: 2807
- Candidatos excluidos por score: 1096
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
- Candidatos excluidos por precio: 2832
- Candidatos excluidos por score: 1071
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
- Candidatos excluidos por precio: 2825
- Candidatos excluidos por score: 1078
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
- Candidatos excluidos por precio: 2956
- Candidatos excluidos por score: 947
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
- Candidatos excluidos por precio: 3538
- Candidatos excluidos por score: 365
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 70. Llaves ajustables John Deere 10 pulgadas

- ID Venturino: `276187354`
- Precio Venturino: $71.000
- Tokens: llave, ajustabl, 10, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 15 de 15 válidos antes de top
- Candidatos excluidos por precio: 2974
- Candidatos excluidos por score: 914
- Mediana ML: $72.928
- Venturino vs mediana ML: -2.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | 7.0% | tipo: HERRAMIENTA; tokens comunes: llave, pulgada; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | 7.0% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | -17.9% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Interruptor De Arranque Con Llave De Encendido John Deere 65](https://www.mercadolibre.com.ar/interruptor-de-arranque-con-llave-de-encendido-john-deere-65/up/MLAU3961830360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA1562249797&sid=search) | $56.665 | -20.2% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Llave De Contacto Original Tractor Jardin Jhon Deere](https://www.mercadolibre.com.ar/llave-de-contacto-original-tractor-jardin-jhon-deere/up/MLAU3805278690#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1679042279&sid=search) | $44.999 | -36.6% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 6 | baja | 42 | [Set Juego Herramientas Tubos Y Llaves Kroner De 110 Piezas](https://www.mercadolibre.com.ar/set-juego-herramientas-tubos-y-llaves-kroner-de-110-piezas/p/MLA37511538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1458232893&sid=search) | $70.512 | -0.7% | tipo: HERRAMIENTA; tokens comunes: llave |
| 7 | baja | 41 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | 9.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94f1e34d-fd49-461c-a867-d50402b5cd6a&wid=MLA1399126385&sid=search) | $93.489 | 31.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2491947770&sid=search) | $94.543 | 33.2% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 10 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | 2.7% | tipo: HERRAMIENTA |
| 11 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | -12.5% | tipo: HERRAMIENTA |
| 12 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | -26.4% | tipo: HERRAMIENTA |
| 13 | baja | 31 | [Juguete Para Armar Skid Steer John Deere Con Herramienta De](https://www.mercadolibre.com.ar/john-deere-skid-steer-building-toy-with-ratchet-tool-13-pc/p/MLA2073743520#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA3004308200&sid=search) | $85.241 | 20.1% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 31 | [John Deere Power Tools Motosierra De Juguete, Herramienta De](https://www.mercadolibre.com.ar/john-deere-power-tools-chainsaw-toy-construction-tool-with/p/MLA2045929485#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2491947932&sid=search) | $92.688 | 30.5% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 25 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | -2.8% | tipo: HERRAMIENTA; penalización tipo adicional candidato: BOLSO |

### 71. Llaves ajustables John Deere 12 pulgadas

- ID Venturino: `276187355`
- Precio Venturino: $83.000
- Tokens: llave, ajustabl, 12, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 20 de 20 válidos antes de top
- Candidatos excluidos por precio: 2902
- Candidatos excluidos por score: 981
- Mediana ML: $81.433
- Venturino vs mediana ML: 1.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | -8.4% | tipo: HERRAMIENTA; tokens comunes: llave, pulgada; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | -8.4% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | -29.8% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Interruptor De Arranque Con Llave De Encendido John Deere 65](https://www.mercadolibre.com.ar/interruptor-de-arranque-con-llave-de-encendido-john-deere-65/up/MLAU3961830360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA1562249797&sid=search) | $56.665 | -31.7% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Juego De Llaves Allen John Deere 30 Piezas Pulg Y Milimetros](https://www.mercadolibre.com.ar/juego-de-llaves-allen-john-deere-30-piezas-pulg-y-milimetros/up/MLAU203876655#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&float_highlight=last_units&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA922576085&sid=search) | $111.000 | 33.7% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 6 | baja | 42 | [Set Juego Herramientas Tubos Y Llaves Kroner De 110 Piezas](https://www.mercadolibre.com.ar/set-juego-herramientas-tubos-y-llaves-kroner-de-110-piezas/p/MLA37511538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1458232893&sid=search) | $70.512 | -15.0% | tipo: HERRAMIENTA; tokens comunes: llave |
| 7 | baja | 42 | [Juego De Llaves De Tubo Stardom 94 Piezas Cromo Vanadio](https://www.mercadolibre.com.ar/juego-de-llaves-de-tubo-stardom-94-piezas-cromo-vanadio/up/MLAU3859129851#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1721056741&sid=search) | $99.990 | 20.5% | tipo: HERRAMIENTA; tokens comunes: llave |
| 8 | baja | 41 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | -6.5% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Porta Herramienta Cuero John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/porta-herramienta-cuero-john-deere--a-pedidoexkarg/up/MLAU162614465#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=94f1e34d-fd49-461c-a867-d50402b5cd6a&wid=MLA1399126385&sid=search) | $93.489 | 12.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Cinturón De Herramientas Parlante De Lujo John Deere - Juego](https://www.mercadolibre.com.ar/tool-set-john-deere-deluxe-talking-toolbelt-kids-2-years/p/MLA2032158922#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2491947770&sid=search) | $94.543 | 13.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 11 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | -12.1% | tipo: HERRAMIENTA |
| 12 | baja | 35 | [Kit De Herramienta De Giro De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-for-john-deere/p/MLA2027963136#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2399369304&sid=search) | $103.313 | 24.5% | tipo: HERRAMIENTA |
| 13 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | -25.2% | tipo: HERRAMIENTA |
| 14 | baja | 35 | [Kit De Herramienta 28 Piezas Martillo Tijera Puntas Cutter](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter/up/MLAU1036087437#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1448971691&sid=search) | $110.268 | 32.9% | tipo: HERRAMIENTA |
| 15 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | -37.1% | tipo: HERRAMIENTA |
| 16 | baja | 35 | [Kit De Herramientas 85 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-85-piezas-jadever/up/MLAU3392505793#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2308233004&sid=search) | $114.799 | 38.3% | tipo: HERRAMIENTA |
| 17 | baja | 35 | [For Kit De Herramienta De De Motor Y Pasador De](https://www.mercadolibre.com.ar/engine-turning-tool-and-timing-pin-set-metal-for-john-deere/p/MLA2024534734#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2464989688&sid=search) | $115.762 | 39.5% | tipo: HERRAMIENTA |
| 18 | baja | 31 | [Juguete Para Armar Skid Steer John Deere Con Herramienta De](https://www.mercadolibre.com.ar/john-deere-skid-steer-building-toy-with-ratchet-tool-13-pc/p/MLA2073743520#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA3004308200&sid=search) | $85.241 | 2.7% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 31 | [John Deere Power Tools Motosierra De Juguete, Herramienta De](https://www.mercadolibre.com.ar/john-deere-power-tools-chainsaw-toy-construction-tool-with/p/MLA2045929485#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2491947932&sid=search) | $92.688 | 11.7% | tipo: HERRAMIENTA; penalización tipo adicional candidato: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 25 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | -16.9% | tipo: HERRAMIENTA; penalización tipo adicional candidato: BOLSO |

### 72. Llaves ajustables John Deere 6 pulgadas

- ID Venturino: `276187350`
- Precio Venturino: $39.000
- Tokens: llave, ajustabl, 6, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 8 de 8 válidos antes de top
- Candidatos excluidos por precio: 3050
- Candidatos excluidos por score: 845
- Mediana ML: $25.285
- Venturino vs mediana ML: 54.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llave De Contacto Original Tractor Jardin Jhon Deere](https://www.mercadolibre.com.ar/llave-de-contacto-original-tractor-jardin-jhon-deere/up/MLAU3805278690#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1679042279&sid=search) | $44.999 | 15.4% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tecla De Encendido De Arranque Con Llaves Para John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3294300692-tecla-de-encendido-de-arranque-con-llaves-para-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=bd93bfc2-3546-4c23-b143-6f5119e4834a) | $25.581 | -34.4% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3341141512-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=item&tracking_id=2e0c2f56-d1fd-47d9-a17a-00b23bb79df0) | $24.988 | -35.9% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3339581592-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ee9c99a9-a9e3-44e9-ba9f-c6ee2b612361) | $24.988 | -35.9% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-1790351727-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=item&tracking_id=1651d11f-3065-4260-9394-7dc83f4ccb05) | $24.988 | -35.9% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1506435419&sid=search) | $41.198 | 5.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | 33.9% | tipo: HERRAMIENTA |
| 8 | baja | 35 | [Herramientas Para Jardin Juego X 3 Piezas. Jcb-3600410](https://www.mercadolibre.com.ar/herramientas-para-jardin-juego-x-3-piezas-jcb3600410/up/MLAU184493684#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=6c3dff87-37d9-4ce6-9189-f7cb844fe38e&wid=MLA1425402036&sid=search) | $24.063 | -38.3% | tipo: HERRAMIENTA |

### 73. Llaves ajustables John Deere 8 pulgadas

- ID Venturino: `276187353`
- Precio Venturino: $49.000
- Tokens: llave, ajustabl, 8, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 3
- Candidatos usados: 6 de 6 válidos antes de top
- Candidatos excluidos por precio: 3087
- Candidatos excluidos por score: 810
- Mediana ML: $54.446
- Venturino vs mediana ML: -10.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Llave De Contacto Original Tractor Jardin Jhon Deere](https://www.mercadolibre.com.ar/llave-de-contacto-original-tractor-jardin-jhon-deere/up/MLAU3805278690#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1679042279&sid=search) | $44.999 | -8.2% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Interruptor De Arranque Con Llave De Encendido John Deere 65](https://www.mercadolibre.com.ar/interruptor-de-arranque-con-llave-de-encendido-john-deere-65/up/MLAU3961830360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA1562249797&sid=search) | $56.665 | 15.6% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | 19.0% | tipo: HERRAMIENTA; tokens comunes: llave; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1506435419&sid=search) | $41.198 | -15.9% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | 6.6% | tipo: HERRAMIENTA |
| 6 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | 26.7% | tipo: HERRAMIENTA |

### 74. Manómetro con aguja John Deere doble

- ID Venturino: `276196695`
- Precio Venturino: $38.000
- Tokens: manometro, aguja, doble
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3067
- Candidatos excluidos por score: 836
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
- Candidatos excluidos por precio: 3295
- Candidatos excluidos por score: 608
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
- Candidatos excluidos por precio: 3264
- Candidatos excluidos por score: 639
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
- Candidatos excluidos por precio: 3086
- Candidatos excluidos por score: 812
- Mediana ML: $62.523
- Venturino vs mediana ML: -4.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [John Deere Sets Materos, Equipos De Mate, Juegos De Mate](https://articulo.mercadolibre.com.ar/MLA-798301631-john-deere-sets-materos-equipos-de-mate-juegos-de-mate-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161&wid=MLA798301631&sid=search) | $73.900 | 23.2% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 2 | media | 56 | [John Deere, Sets Materos, Juegos De Mate, Kits Materos](https://articulo.mercadolibre.com.ar/MLA-798301540-john-deere-sets-materos-juegos-de-mate-kits-materos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=486fa055-a069-4b09-b1af-297fc65fc161&wid=MLA798301540&sid=search) | $73.900 | 23.2% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&float_highlight=last_units&tracking_id=746b0953-0db6-4c02-9c01-db3af2331064&wid=MLA899912364&sid=search) | $58.242 | -2.9% | tipo: MATE; tokens comunes: mate |
| 4 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_unit&tracking_id=41185636-52b8-45bb-be39-4bbc8b9df993&wid=MLA873583212&sid=search) | $38.363 | -36.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 5 | baja | 28 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=746b0953-0db6-4c02-9c01-db3af2331064&wid=MLA3168357158&sid=search) | $62.523 | 4.2% | tipo: MATE; penalización tipo adicional candidato: BOLSO, HERRAMIENTA; tokens comunes: mate |

### 78. Mate San Roque con bombilla verde John Deere

- ID Venturino: `276158249`
- Precio Venturino: $45.000
- Tokens: mate, san, roque, bombilla, verde
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 5
- Candidatos usados: 10 de 10 válidos antes de top
- Candidatos excluidos por precio: 3106
- Candidatos excluidos por score: 787
- Mediana ML: $32.200
- Venturino vs mediana ML: 39.8%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Set Matero John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-ecocuero/up/MLAU245113070#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=6776dbca-12b3-4c1e-b401-f2cd17305d0b&wid=MLA1512191568&sid=search) | $29.500 | -34.4% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 2 | media | 55 | [Set Matero Kit John Deere. Ecocuero](https://www.mercadolibre.com.ar/set-matero-kit-john-deere-ecocuero/up/MLAU2303263352#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=6776dbca-12b3-4c1e-b401-f2cd17305d0b&wid=MLA1935176914&sid=search) | $29.500 | -34.4% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 3 | media | 55 | [Set Matero John Deere. Fundas De Ecocuero](https://www.mercadolibre.com.ar/set-matero-john-deere-fundas-de-ecocuero/up/MLAU239222926#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=6776dbca-12b3-4c1e-b401-f2cd17305d0b&wid=MLA1399979491&sid=search) | $29.500 | -34.4% | tipo: MATE; tokens comunes: mate; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Set Matero Completo - Juego De Mate - Jhonn Deere](https://www.mercadolibre.com.ar/set-matero-completo--juego-de-mate--jhonn-deere/up/MLAU302399875#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&float_highlight=last_units&tracking_id=746b0953-0db6-4c02-9c01-db3af2331064&wid=MLA899912364&sid=search) | $58.242 | 29.4% | tipo: MATE; tokens comunes: mate |
| 5 | media | 46 | [Bolso Matero John Deere Ecocuero](https://www.mercadolibre.com.ar/bolso-matero-john-deere-ecocuero/up/MLAU264444456#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=41185636-52b8-45bb-be39-4bbc8b9df993&wid=MLA1594771616&sid=search) | $31.500 | -30.0% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate; compatibilidad/marca: John Deere |
| 6 | baja | 39 | [Bolso Matero Rigido Diseños Varios](https://articulo.mercadolibre.com.ar/MLA-1774588246-bolso-matero-rigido-disenos-varios-_JM?searchVariation=186759553535#polycard_client=search-desktop&be_origin=backend&searchVariation=186759553535&search_layout=grid&position=34&type=item&tracking_id=6776dbca-12b3-4c1e-b401-f2cd17305d0b) | $27.387 | -39.1% | tipo: MATE; penalización tipo adicional candidato: BOLSO; tokens comunes: mate |
| 7 | baja | 35 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_unit&tracking_id=41185636-52b8-45bb-be39-4bbc8b9df993&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATE; penalización tipo adicional candidato: BOLSO, MATERA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Set Matero Bolso Y 2 Latas De Ecocuero John Deere](https://www.mercadolibre.com.ar/set-matero-bolso-y-2-latas-de-ecocuero-john-deere/up/MLAU3900127837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=41185636-52b8-45bb-be39-4bbc8b9df993&wid=MLA1751862177&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 9 | baja | 34 | [Set Matero Bolso Y Latas John Deere Con Tu Nombre. Ecocuero](https://www.mercadolibre.com.ar/set-matero-bolso-y-latas-john-deere-con-tu-nombre-ecocuero/up/MLAU2999997079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=41185636-52b8-45bb-be39-4bbc8b9df993&wid=MLA2009625314&sid=search) | $32.900 | -26.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, LATA; tokens comunes: mate; compatibilidad/marca: John Deere |
| 10 | baja | 28 | [Set Equipo Matero 6 Piezas Bolso Rigido, Autos Marcas](https://www.mercadolibre.com.ar/set-equipo-matero-6-piezas-bolso-rigido-autos-marcas/up/MLAU3885943617#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=746b0953-0db6-4c02-9c01-db3af2331064&wid=MLA3168357158&sid=search) | $62.523 | 38.9% | tipo: MATE; penalización tipo adicional candidato: BOLSO, HERRAMIENTA; tokens comunes: mate |

### 79. Matera Elsa menge gris John Deere

- ID Venturino: `276153548`
- Precio Venturino: $70.000
- Tokens: matera, elsa, menge, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2979
- Candidatos excluidos por score: 924
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
- Candidatos excluidos por precio: 2979
- Candidatos excluidos por score: 924
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
- Candidatos excluidos por precio: 3106
- Candidatos excluidos por score: 796
- Mediana ML: $38.363
- Venturino vs mediana ML: 17.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Bolso Matero Matera Cuero Ecologico John Deere](https://www.mercadolibre.com.ar/bolso-matero-matera-cuero-ecologico-john-deere/up/MLAU297140267#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&float_highlight=last_unit&tracking_id=41185636-52b8-45bb-be39-4bbc8b9df993&wid=MLA873583212&sid=search) | $38.363 | -14.7% | tipo: MATERA; tokens comunes: matera; compatibilidad/marca: John Deere |

### 82. Mini bandeja de piezas magnéticas

- ID Venturino: `317015820`
- Precio Venturino: $14.000
- Tokens: mini, bandeja, pieza, magnetica
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3331
- Candidatos excluidos por score: 572
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
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 2944
- Candidatos excluidos por score: 956
- Mediana ML: $57.197
- Venturino vs mediana ML: 29.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=42&type=item&tracking_id=79193404-ee69-400f-a997-b694d8caa502) | $57.197 | -22.5% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mochila Para Laptop John Deere: Diseño Reforzado Y Ergonómic](https://articulo.mercadolibre.com.ar/MLA-3005250038-mochila-para-laptop-john-deere-diseno-reforzado-y-ergonomic-_JM?searchVariation=197763283247#polycard_client=search-desktop&be_origin=backend&searchVariation=197763283247&search_layout=grid&position=47&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $51.026 | -30.9% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 3 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=item&tracking_id=23e16205-5f57-4380-9a8d-63a8e491b492) | $68.673 | -6.9% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 84. Mochila Fumigadora Honda WJR 2525 – 25 L

- ID Venturino: `332864939`
- Precio Venturino: $965.621
- Tokens: mochila, fumigadora, honda, wjr, 2525, 25, l
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3764
- Candidatos excluidos por score: 139
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 85. Mochila Omega John Deere

- ID Venturino: `338241045`
- Precio Venturino: $60.000
- Tokens: mochila, omega
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 3 de 3 válidos antes de top
- Candidatos excluidos por precio: 3086
- Candidatos excluidos por score: 814
- Mediana ML: $57.197
- Venturino vs mediana ML: 4.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Mochila Temática De John Deere, Modelo Gs08 Con Gráfico Real](https://articulo.mercadolibre.com.ar/MLA-3238594614-mochila-tematica-de-john-deere-modelo-gs08-con-grafico-real-_JM?searchVariation=200943947313#polycard_client=search-desktop&be_origin=backend&searchVariation=200943947313&search_layout=grid&position=42&type=item&tracking_id=79193404-ee69-400f-a997-b694d8caa502) | $57.197 | -4.7% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Mochila Para Laptop John Deere: Diseño Reforzado Y Ergonómic](https://articulo.mercadolibre.com.ar/MLA-3005250038-mochila-para-laptop-john-deere-diseno-reforzado-y-ergonomic-_JM?searchVariation=197763283247#polycard_client=search-desktop&be_origin=backend&searchVariation=197763283247&search_layout=grid&position=47&type=item&tracking_id=7ab807b7-ac92-4915-a1b0-5112188e03b7) | $51.026 | -15.0% | tipo: MOCHILA; tokens comunes: mochila; compatibilidad/marca: John Deere |
| 3 | baja | 39 | [Mochila Escolar John Deere 14 Unidades, 3 Unidades, Gran Cap](https://articulo.mercadolibre.com.ar/MLA-3044422810-mochila-escolar-john-deere-14-unidades-3-unidades-gran-cap-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=item&tracking_id=23e16205-5f57-4380-9a8d-63a8e491b492) | $68.673 | 14.5% | tipo: MOCHILA; penalización tipo adicional candidato: GORRA; tokens comunes: mochila; compatibilidad/marca: John Deere |

### 86. Mochila Sein John Deere gris

- ID Venturino: `276129570`
- Precio Venturino: $135.000
- Tokens: mochila, sein, gris
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2792
- Candidatos excluidos por score: 1111
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 87. Motobomba Honda WL20XH

- ID Venturino: `340635178`
- Precio Venturino: $1.170.000
- Tokens: motobomba, honda, wl20xh
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3821
- Candidatos excluidos por score: 82
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 88. Motoguadaña Honda UMK435 – 35.8 cc

- ID Venturino: `332864026`
- Precio Venturino: $778.042
- Tokens: motoguadana, honda, umk435, 35.8, cc
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3723
- Candidatos excluidos por score: 180
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 89. Motoguadaña Honda UMK450 – 47.9 cc

- ID Venturino: `332864442`
- Precio Venturino: $916.914
- Tokens: motoguadana, honda, umk450, 47.9, cc
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3755
- Candidatos excluidos por score: 148
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
- Candidatos excluidos por precio: 3555
- Candidatos excluidos por score: 348
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
- Candidatos excluidos por precio: 3596
- Candidatos excluidos por score: 307
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
- Candidatos excluidos por precio: 3628
- Candidatos excluidos por score: 275
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
- Candidatos excluidos por precio: 3814
- Candidatos excluidos por score: 89
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
- Candidatos excluidos por precio: 3005
- Candidatos excluidos por score: 898
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 95. Palanca Barra John Deere 25 pulgadas

- ID Venturino: `276681802`
- Precio Venturino: $58.000
- Tokens: palanca, barra, 25, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 12 de 12 válidos antes de top
- Candidatos excluidos por precio: 3014
- Candidatos excluidos por score: 877
- Mediana ML: $65.553
- Venturino vs mediana ML: -11.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1506435419&sid=search) | $41.198 | -29.0% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | 31.0% | tipo: HERRAMIENTA; tokens comunes: pulgada; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | 0.5% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Interruptor De Arranque Con Llave De Encendido John Deere 65](https://www.mercadolibre.com.ar/interruptor-de-arranque-con-llave-de-encendido-john-deere-65/up/MLAU3961830360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA1562249797&sid=search) | $56.665 | -2.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Llave De Contacto Original Tractor Jardin Jhon Deere](https://www.mercadolibre.com.ar/llave-de-contacto-original-tractor-jardin-jhon-deere/up/MLAU3805278690#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1679042279&sid=search) | $44.999 | -22.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | 31.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | 33.8% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | 7.1% | tipo: HERRAMIENTA |
| 9 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | -10.0% | tipo: HERRAMIENTA |
| 10 | baja | 35 | [Set Juego Herramientas Tubos Y Llaves Kroner De 110 Piezas](https://www.mercadolibre.com.ar/set-juego-herramientas-tubos-y-llaves-kroner-de-110-piezas/p/MLA37511538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1458232893&sid=search) | $70.512 | 21.6% | tipo: HERRAMIENTA |
| 11 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | 25.7% | tipo: HERRAMIENTA |
| 12 | baja | 25 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | 19.0% | tipo: HERRAMIENTA; penalización tipo adicional candidato: BOLSO |

### 96. Palanca Barra John Deere 8 pulgadas

- ID Venturino: `276681809`
- Precio Venturino: $30.000
- Tokens: palanca, barra, 8, pulgada
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 10 de 10 válidos antes de top
- Candidatos excluidos por precio: 3021
- Candidatos excluidos por score: 872
- Mediana ML: $24.526
- Venturino vs mediana ML: 22.3%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Palancas Apertura Ventana Cabina John Deere Sg2](https://www.mercadolibre.com.ar/palancas-apertura-ventana-cabina-john-deere-sg2/up/MLAU319169472#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=9b04b8a7-d0a5-4164-952a-d1e976f852f0&wid=MLA1409671591&sid=search) | $23.076 | -23.1% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1506435419&sid=search) | $41.198 | 37.3% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves Para John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3294300692-tecla-de-encendido-de-arranque-con-llaves-para-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=bd93bfc2-3546-4c23-b143-6f5119e4834a) | $25.581 | -14.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3341141512-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=item&tracking_id=2e0c2f56-d1fd-47d9-a17a-00b23bb79df0) | $24.988 | -16.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-3339581592-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ee9c99a9-a9e3-44e9-ba9f-c6ee2b612361) | $24.988 | -16.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Tecla De Encendido De Arranque Con Llaves For John Deere L1](https://articulo.mercadolibre.com.ar/MLA-1790351727-tecla-de-encendido-de-arranque-con-llaves-for-john-deere-l1-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=item&tracking_id=1651d11f-3065-4260-9394-7dc83f4ccb05) | $24.988 | -16.7% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [` Llaves De Encendido H800 For Excavadora John Deere Case](https://www.mercadolibre.com.ar/10pcs-ignition-keys-h800-for-excavator-case-new-at194969-at1/p/MLA2067030969#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA2920752684&sid=search) | $21.355 | -28.8% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Llaves De Encendido H800 For Excavadora John Deere Case Doz](https://www.mercadolibre.com.ar/10pcs-ignition-keys-h800-for-excavator-case-dozer/p/MLA2053284803#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=f15dc6bf-ed7d-4e6f-a026-6b97f97381f5&wid=MLA1715698005&sid=search) | $19.851 | -33.8% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 9 | baja | 35 | [Herramientas Para Jardin Juego X 3 Piezas. Jcb-3600410](https://www.mercadolibre.com.ar/herramientas-para-jardin-juego-x-3-piezas-jcb3600410/up/MLAU184493684#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=6c3dff87-37d9-4ce6-9189-f7cb844fe38e&wid=MLA1425402036&sid=search) | $24.063 | -19.8% | tipo: HERRAMIENTA |
| 10 | baja | 35 | [Llaves De Encendido H800 De 10 Piezas Para Excavadora Case D](https://www.mercadolibre.com.ar/-llaves-de-encendido-h800-for-excavadora-john-deere-case/p/MLA2025754994#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=140fe069-0cf3-4381-a329-fb1c26ed4dce&wid=MLA2739125474&sid=search) | $19.349 | -35.5% | tipo: HERRAMIENTA |

### 97. Palanca John Deere 25 pulgadas

- ID Venturino: `276681805`
- Precio Venturino: $57.000
- Tokens: palanca, 25, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 12 de 12 válidos antes de top
- Candidatos excluidos por precio: 3035
- Candidatos excluidos por score: 856
- Mediana ML: $65.553
- Venturino vs mediana ML: -13.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1506435419&sid=search) | $41.198 | -27.7% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | 33.3% | tipo: HERRAMIENTA; tokens comunes: pulgada; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Interruptor De Arranque Con Llave De Encendido John Deere 65](https://www.mercadolibre.com.ar/interruptor-de-arranque-con-llave-de-encendido-john-deere-65/up/MLAU3961830360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA1562249797&sid=search) | $56.665 | -0.6% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | 2.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Llave De Contacto Original Tractor Jardin Jhon Deere](https://www.mercadolibre.com.ar/llave-de-contacto-original-tractor-jardin-jhon-deere/up/MLAU3805278690#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1679042279&sid=search) | $44.999 | -21.1% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | 33.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | 36.2% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | -8.4% | tipo: HERRAMIENTA |
| 9 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | 9.0% | tipo: HERRAMIENTA |
| 10 | baja | 35 | [Set Juego Herramientas Tubos Y Llaves Kroner De 110 Piezas](https://www.mercadolibre.com.ar/set-juego-herramientas-tubos-y-llaves-kroner-de-110-piezas/p/MLA37511538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1458232893&sid=search) | $70.512 | 23.7% | tipo: HERRAMIENTA |
| 11 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | 27.9% | tipo: HERRAMIENTA |
| 12 | baja | 25 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | 21.1% | tipo: HERRAMIENTA; penalización tipo adicional candidato: BOLSO |

### 98. Palanca John Deere 31 pulgadas

- ID Venturino: `276681807`
- Precio Venturino: $58.000
- Tokens: palanca, 31, pulgada
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 12 de 12 válidos antes de top
- Candidatos excluidos por precio: 3014
- Candidatos excluidos por score: 877
- Mediana ML: $65.553
- Venturino vs mediana ML: -11.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Palanca Acelerador John Deere Reparacion John Deere 135 Otro](https://www.mercadolibre.com.ar/palanca-acelerador-john-deere-reparacion-john-deere-135-otro/up/MLAU3254990858#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1506435419&sid=search) | $41.198 | -29.0% | tipo: HERRAMIENTA; tokens comunes: palanca; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Juego De Llaves Allen Sae Pulgadas John Deere Original!](https://www.mercadolibre.com.ar/juego-de-llaves-allen-sae-pulgadas-john-deere-original/up/MLAU155664316#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=7bec4fe4-78b4-4080-bbf2-173929650db7&wid=MLA1230826554&sid=search) | $76.000 | 31.0% | tipo: HERRAMIENTA; tokens comunes: pulgada; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Interruptor De Encendido Con Llaves Para John Deere 250 2350](https://articulo.mercadolibre.com.ar/MLA-1732101729-interruptor-de-encendido-con-llaves-para-john-deere-250-2350-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=item&tracking_id=374b2801-fe1f-497c-b840-044645fb7724) | $58.291 | 0.5% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Interruptor De Arranque Con Llave De Encendido John Deere 65](https://www.mercadolibre.com.ar/interruptor-de-arranque-con-llave-de-encendido-john-deere-65/up/MLAU3961830360#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=964194fa-14f0-4629-9a2c-d43b24abfcc2&wid=MLA1562249797&sid=search) | $56.665 | -2.3% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Llave De Contacto Original Tractor Jardin Jhon Deere](https://www.mercadolibre.com.ar/llave-de-contacto-original-tractor-jardin-jhon-deere/up/MLAU3805278690#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA1679042279&sid=search) | $44.999 | -22.4% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Juego Llaves Hexagonales Milimétricas John Deere Original!](https://www.mercadolibre.com.ar/juego-llaves-hexagonales-milimetricas-john-deere-original/up/MLAU155712370#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1230896639&sid=search) | $76.000 | 31.0% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Caja De Herramientas John Deere, 18 Piezas](https://www.mercadolibre.com.ar/john-deere-18-piece-deluxe-tool-box-construction-playset/p/MLA2032359776#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1466942207&sid=search) | $77.625 | 33.8% | tipo: HERRAMIENTA; compatibilidad/marca: John Deere |
| 8 | baja | 35 | [Kit de herramienta 28 piezas martillo tijera puntas cutter color verde con amarillo Jadever jdhs1m28](https://www.mercadolibre.com.ar/kit-de-herramienta-28-piezas-martillo-tijera-puntas-cutter-color-verde-con-amarillo-jadever-jdhs1m28/p/MLA41437180#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA2074700416&sid=search) | $62.105 | 7.1% | tipo: HERRAMIENTA |
| 9 | baja | 35 | [Herramienta De Extracción Del Extractor De Embrague, Embragu](https://www.mercadolibre.com.ar/clutch-puller-removal-tool-black-jdg1641-for-john-deere/p/MLA2028613650#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1704310265&sid=search) | $52.226 | -10.0% | tipo: HERRAMIENTA |
| 10 | baja | 35 | [Set Juego Herramientas Tubos Y Llaves Kroner De 110 Piezas](https://www.mercadolibre.com.ar/set-juego-herramientas-tubos-y-llaves-kroner-de-110-piezas/p/MLA37511538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=27&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1458232893&sid=search) | $70.512 | 21.6% | tipo: HERRAMIENTA |
| 11 | baja | 35 | [Kit De Herramientas 28 Piezas Jadever](https://www.mercadolibre.com.ar/kit-de-herramientas-28-piezas-jadever/up/MLAU3265761238#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2144663316&sid=search) | $72.928 | 25.7% | tipo: HERRAMIENTA |
| 12 | baja | 25 | [Juego Herramientas Jadever 28 Piezas Jdhs1m28 Con Bolso](https://www.mercadolibre.com.ar/juego-herramientas-jadever-28-piezas-jdhs1m28-con-bolso/up/MLAU3405463290#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA2316492036&sid=search) | $69.000 | 19.0% | tipo: HERRAMIENTA; penalización tipo adicional candidato: BOLSO |

### 99. Pinza múltiple de acero inoxidable John Deere

- ID Venturino: `276173635`
- Precio Venturino: $70.000
- Tokens: pinza, multiple, acero, inoxidable
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 2
- Candidatos usados: 2 de 2 válidos antes de top
- Candidatos excluidos por precio: 2979
- Candidatos excluidos por score: 922
- Mediana ML: $54.180
- Venturino vs mediana ML: 29.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 48 | [Pinza P/semir. 200mm Curv. 2477g200i Bahco Bh2477g200 Lf](https://www.mercadolibre.com.ar/pinza-psemir-200mm-curv-2477g200i-bahco-bh2477g200-lf/up/MLAU3730765954#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=6c3dff87-37d9-4ce6-9189-f7cb844fe38e&wid=MLA2778144256&sid=search) | $56.118 | -19.8% | tipo: PINZA; tokens comunes: pinza |
| 2 | media | 48 | [Pinza Punta Semiredonda 6 Curva Bahco Bh2477g-160 Lf](https://www.mercadolibre.com.ar/pinza-punta-semiredonda-6--curva-bahco-bh2477g160-lf/up/MLAU3721834629#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=60&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1642908093&sid=search) | $52.241 | -25.4% | tipo: PINZA; tokens comunes: pinza |

### 100. Placa Deslizante Ancha (Skid Plate). John Deere

- ID Venturino: `318858595`
- Precio Venturino: $69.000
- Tokens: placa, deslizante, ancha, skid, plate
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2980
- Candidatos excluidos por score: 923
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 101. Punton Cosechadora Forjado Draper John Deere

- ID Venturino: `318862823`
- Precio Venturino: $47.000
- Tokens: punton, cosechadora, forjado, draper
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 1
- Candidatos usados: 9 de 9 válidos antes de top
- Candidatos excluidos por precio: 3092
- Candidatos excluidos por score: 802
- Mediana ML: $45.000
- Venturino vs mediana ML: 4.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Puntón John Deere H213507 Negros](https://www.mercadolibre.com.ar/punton-john-deere-h213507-negros/up/MLAU214269311#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=9b04b8a7-d0a5-4164-952a-d1e976f852f0&wid=MLA1128435570&sid=search) | $55.969 | 19.1% | tipo: CUCHILLA; tokens comunes: punton; compatibilidad/marca: John Deere |
| 2 | baja | 41 | [Cuchillas Genérica Para John Deere De 54 Cm- 21 Pulg ( X2u)](https://www.mercadolibre.com.ar/cuchillas-generica-para-john-deere-de-54-cm-21-pulg--x2u/up/MLAU3936051037#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=64dac16c-535c-406b-89c7-f2534c5bc28d&wid=MLA1775667427&sid=search) | $45.000 | -4.3% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Cuchilla 21 Pulgadas Para Tractor Jhon Deere 7 Puntas](https://www.mercadolibre.com.ar/cuchilla-21-pulgadas-para-tractor-jhon-deere-7-puntas/up/MLAU3260625058#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2137492956&sid=search) | $31.803 | -32.3% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2783946866&sid=search) | $64.387 | 37.0% | tipo: CUCHILLA; compatibilidad/marca: John Deere |
| 5 | baja | 35 | [Cuchilla 19.5 Tractor Deere 38 Stx38 78](https://www.mercadolibre.com.ar/cuchilla-195---tractor--deere-38--stx38-78/up/MLAU181213484#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1381336731&sid=search) | $49.990 | 6.4% | tipo: CUCHILLA |
| 6 | baja | 35 | [Cuchilla De Corte 38' - M84472](https://www.mercadolibre.com.ar/cuchilla-de-corte-38--m84472/up/MLAU423649509#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=3886f5b0-d570-4def-a2d7-8ac9223e17b5&wid=MLA1859864160&sid=search) | $43.500 | -7.4% | tipo: CUCHILLA |
| 7 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre](https://www.mercadolibre.com.ar/cuchilla-2112-para-tractor-42-deere-115-125-135-7-estre/p/MLA66650707#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA3196140694&sid=search) | $42.431 | -9.7% | tipo: CUCHILLA |
| 8 | baja | 35 | [Cuchilla 21,1/2 Para Tractor 42 Deere 115 125 135 7 Estre.](https://www.mercadolibre.com.ar/cuchilla-2112--para-tractor-42--deere-115-125-135-7-estre/up/MLAU127634743#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA1439946508&sid=search) | $51.900 | 10.4% | tipo: CUCHILLA |
| 9 | baja | 35 | [Cuchilla De Corte 42' - Gx22151](https://www.mercadolibre.com.ar/cuchilla-de-corte-42--gx22151/up/MLAU2967821263#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=f4afbaf1-75fe-4b18-9cb6-d06461df49cd&wid=MLA1472563141&sid=search) | $32.000 | -31.9% | tipo: CUCHILLA |

### 102. Puntón Cuchilla. John Deere

- ID Venturino: `318859417`
- Precio Venturino: $86.000
- Tokens: punton, cuchilla
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 24 válidos antes de top
- Candidatos excluidos por precio: 2893
- Candidatos excluidos por score: 986
- Mediana ML: $99.630
- Venturino vs mediana ML: -13.7%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 58 | [Cuchillas Para Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-para-tractor-john-deere-42/up/MLAU172143595#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&float_highlight=last_units&tracking_id=05c3ecde-c8fe-42f6-a17a-5abbe6361cbf&wid=MLA775204942&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Sección Cuchilla John Deere H163131 - Prentacc](https://www.mercadolibre.com.ar/seccion-cuchilla-john-deere-h163131--prentacc/up/MLAU3451205653#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=1433284e-6402-4b6e-8a89-7eb454921ee9&wid=MLA1549074995&sid=search) | $66.000 | -23.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Cuchillas Compatible Con Tractor John Deere 42](https://www.mercadolibre.com.ar/cuchillas-compatible-con-tractor-john-deere-42/up/MLAU204286028#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&float_highlight=last_units&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA919160219&sid=search) | $109.000 | 26.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Correa De Cuchillas Plataforma John Deere Uc30568 42](https://www.mercadolibre.com.ar/correa-de-cuchillas-plataforma-john-deere-uc30568-42/up/MLAU3916141489#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=50e1af20-3f55-464a-898f-704ee0ffac22&wid=MLA1763514089&sid=search) | $78.625 | -8.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Juego Cuchillas John Deere La 135 Código M154061 Oregon](https://www.mercadolibre.com.ar/juego-cuchillas-john-deere-la-135-codigo-m154061-oregon/up/MLAU134201412#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&float_highlight=last_units&tracking_id=746b0953-0db6-4c02-9c01-db3af2331064&wid=MLA847129327&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Juego Cuchillas Oregon 92-110 John Deere La 125](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-92110-john-deere-la-125/up/MLAU130693017#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&float_highlight=last_units&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA834167453&sid=search) | $95.529 | 11.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU1073488312#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=b32dc0f8-d146-42cf-8d3c-29d93cb643b6&wid=MLA1140948761&sid=search) | $98.048 | 14.0% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 8 | media | 56 | [Repuestos John Deere - Jgo. De Cuchillas - 46 - M41967](https://www.mercadolibre.com.ar/repuestos-john-deere--jgo-de-cuchillas--46--m41967/up/MLAU3736924947#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=64dac16c-535c-406b-89c7-f2534c5bc28d&wid=MLA2794779068&sid=search) | $72.600 | -15.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 9 | media | 56 | [Juego Cuchillas Tractor John Deere 42 Pulgadas Usa](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-john-deere--42-pulgadas-usa/up/MLAU155628101#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&float_highlight=last_units&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA1266340056&sid=search) | $71.999 | -16.3% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 10 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU257632043#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1306047860&sid=search) | $101.211 | 17.7% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 11 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54-7-estrella-jgo-3-pz/p/MLA35241674#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=16&type=product&tracking_id=a317fa2f-94d9-4395-af39-5ef6975e0015&wid=MLA1789612354&sid=search) | $104.374 | 21.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 12 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU190037463#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=64dac16c-535c-406b-89c7-f2534c5bc28d&wid=MLA910245048&sid=search) | $107.990 | 25.6% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 13 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU217068882#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=f4afbaf1-75fe-4b18-9cb6-d06461df49cd&wid=MLA1135111613&sid=search) | $109.434 | 27.2% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 14 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU260942932#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=f4afbaf1-75fe-4b18-9cb6-d06461df49cd&wid=MLA1536195876&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 15 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU124341980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=f4afbaf1-75fe-4b18-9cb6-d06461df49cd&wid=MLA1163468541&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 16 | media | 56 | [Cuchilla Para John Deere 54 7-estrella-jgo 3 Pz](https://www.mercadolibre.com.ar/cuchilla-para-john-deere-54--7estrellajgo-3-pz/up/MLAU152184233#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=3886f5b0-d570-4def-a2d7-8ac9223e17b5&wid=MLA1152796939&sid=search) | $120.188 | 39.8% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 17 | media | 55 | [Juego Cuchillas Para John Deere 38pul Centro 45/64 17,8mm](https://www.mercadolibre.com.ar/juego-cuchillas-para-john-deere-38pul-centro-4564-178mm/up/MLAU140173189#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&float_highlight=last_unit&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1106046608&sid=search) | $74.000 | -14.0% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 18 | media | 55 | [Correa Cuchilla 38 Sabre John Deere Reemplaza M122674 Oregon](https://www.mercadolibre.com.ar/correa-cuchilla-38-sabre-john-deere-reemplaza-m122674-oregon/up/MLAU127047057#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=b1ab61ef-53da-4cb2-b6b4-b3239500f6d6&wid=MLA1400582119&sid=search) | $73.578 | -14.4% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 19 | media | 55 | [Juego Cuchillas Oregon 38 Sabre By John Deere Lt155 Stx38](https://www.mercadolibre.com.ar/juego-cuchillas-oregon-38-sabre-by-john-deere-lt155-stx38/p/MLA64289081#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=3090ebff-7297-4fee-8e30-75c3a20867b2&wid=MLA2783946866&sid=search) | $64.387 | -25.1% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |
| 20 | media | 55 | [Juego Cuchillas Tractor 54 John Deere D170 La150 La170 X 3](https://www.mercadolibre.com.ar/juego-cuchillas-tractor-54-john-deere-d170-la150-la170-x-3/up/MLAU288219362#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&float_highlight=last_units&tracking_id=a748abc1-b3a1-4ae5-852b-599139c4b8ee&wid=MLA827797148&sid=search) | $110.000 | 27.9% | tipo: CUCHILLA; tokens comunes: cuchilla; compatibilidad/marca: John Deere |

### 103. Punzón central John Deere

- ID Venturino: `276196693`
- Precio Venturino: $15.000
- Tokens: punzon, central
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3279
- Candidatos excluidos por score: 624
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
- Candidatos excluidos por precio: 2841
- Candidatos excluidos por score: 1062
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
- Candidatos excluidos por precio: 3066
- Candidatos excluidos por score: 837
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
- Candidatos excluidos por precio: 3076
- Candidatos excluidos por score: 827
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
- Candidatos usados: 20 de 27 válidos antes de top
- Candidatos excluidos por precio: 3014
- Candidatos excluidos por score: 862
- Mediana ML: $69.052
- Venturino vs mediana ML: -16.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 49 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2160207414&sid=search) | $75.057 | 29.4% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=12&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $75.376 | 30.0% | tipo: JUGUETE; tokens comunes: set; compatibilidad/marca: John Deere |
| 3 | baja | 41 | [Llavero John Deere 8r 410 Tractor Fundido A Presión](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=871acca8-5df7-419b-bd05-056c65e49990&wid=MLA3234660246&sid=search) | $62.349 | 7.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 4 | baja | 41 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | 8.1% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 5 | baja | 41 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | 10.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 6 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1725054925&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 7 | baja | 41 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677885959&sid=search) | $65.990 | 13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 8 | baja | 41 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1606696085&sid=search) | $50.000 | -13.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 9 | baja | 41 | [Bulldozer Ertl Esc 1.18 John Deere Para Repuesto Ver Fotos](https://www.mercadolibre.com.ar/bulldozer-ertl-esc-118-john-deere-para-repuesto-ver-fotos/up/MLAU182247296#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1391581274&sid=search) | $68.900 | 18.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 10 | baja | 41 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677937795&sid=search) | $68.990 | 18.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 11 | baja | 41 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | 19.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 12 | baja | 41 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | 20.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 13 | baja | 41 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | 20.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 14 | baja | 41 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | 20.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | 20.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | 23.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA3316369844&sid=search) | $42.000 | -27.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2169077264&sid=search) | $74.053 | 27.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | 30.7% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA1588571170&sid=search) | $39.775 | -31.4% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 108. Set de latas John Deere

- ID Venturino: `276148810`
- Precio Venturino: $20.000
- Tokens: set, lata
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 3295
- Candidatos excluidos por score: 608
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
- Candidatos excluidos por precio: 3295
- Candidatos excluidos por score: 608
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 110. Set de tractor y camión volquete John Deere

- ID Venturino: `281053465`
- Precio Venturino: $60.000
- Tokens: set, tractor, camion, volquete
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 19
- Candidatos usados: 20 de 33 válidos antes de top
- Candidatos excluidos por precio: 3086
- Candidatos excluidos por score: 784
- Mediana ML: $69.858
- Venturino vs mediana ML: -14.1%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 78 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=12&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $75.376 | 25.6% | tipo: JUGUETE; tokens comunes: set, tractor, camion, volquete; compatibilidad/marca: John Deere |
| 2 | media | 67 | [Set De Vehículos De Juguete John Deere, Camión Volquete Y Tr](https://www.mercadolibre.com.ar/toy-vehicle-set-john-deere-dump-truck-and-tractor-18m/p/MLA2057825941#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2160207414&sid=search) | $75.057 | 25.1% | tipo: JUGUETE; tokens comunes: set, camion, volquete; compatibilidad/marca: John Deere |
| 3 | media | 58 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | 4.5% | tipo: JUGUETE; tokens comunes: tractor, camion; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | 16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1606696085&sid=search) | $50.000 | -16.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Llavero John Deere 8r 410 Tractor Fundido A Presión](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=871acca8-5df7-419b-bd05-056c65e49990&wid=MLA3234660246&sid=search) | $62.349 | 3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | 6.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677885959&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677937795&sid=search) | $68.990 | 15.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | 15.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | 16.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | 19.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2169077264&sid=search) | $74.053 | 23.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | 26.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2378379950&sid=search) | $77.945 | 29.9% | tipo: JUGUETE; tokens comunes: camion; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | 36.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | 39.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1725054925&sid=search) | $65.990 | 10.0% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 111. Termo Iguazu Verde John Deere

- ID Venturino: `276157118`
- Precio Venturino: $90.000
- Tokens: termo, iguazu, verde
- Estado análisis: **sin comparable**
- Mejor confianza: descartar
- Candidatos media/alta: 0
- Candidatos usados: 0 de 0 válidos antes de top
- Candidatos excluidos por precio: 2897
- Candidatos excluidos por score: 1006
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
- Candidatos excluidos por precio: 2897
- Candidatos excluidos por score: 1006
- Mediana ML: -
- Venturino vs mediana ML: -

_Sin candidatos válidos con los parámetros actuales._

### 113. Tractir 8RX 410 Con orugas John Deere

- ID Venturino: `281234442`
- Precio Venturino: $85.000
- Tokens: tractor, 8rx, 410, oruga
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 81 válidos antes de top
- Candidatos excluidos por precio: 2903
- Candidatos excluidos por score: 919
- Mediana ML: $89.990
- Venturino vs mediana ML: -5.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Llavero John Deere 8r 410 Tractor Fundido A Presión](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=871acca8-5df7-419b-bd05-056c65e49990&wid=MLA3234660246&sid=search) | $62.349 | -26.6% | tipo: JUGUETE; tokens técnicos: 410; tokens comunes: tractor, 410; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | 5.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | 6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | -3.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2351763726&sid=search) | $90.169 | 6.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/l-tractor-de-juguete-de-granja-grande-con-luces-y-sonidos-z/p/MLA2057912939#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1652235961&sid=search) | $90.773 | 6.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Camión John Deere Monster Treads Con Orugas Y Acción Flipper](https://www.mercadolibre.com.ar/john-deere-monster-treads-flipper-truck-toy-2-in-1-tran/p/MLA2070915084#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2378379950&sid=search) | $77.945 | -8.3% | tipo: JUGUETE; tokens comunes: oruga; compatibilidad/marca: John Deere |
| 11 | media | 49 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | -10.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1713519845&sid=search) | $94.345 | 11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1588501493&sid=search) | $94.345 | 11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=12&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $75.376 | -11.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3214114070&sid=search) | $95.000 | 11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2169077264&sid=search) | $74.053 | -12.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=&sid=search) | $96.260 | 13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | -15.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA784333319&sid=search) | $99.867 | 17.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2450624614&sid=search) | $100.000 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 114. Tractor 32 JD 8R John Deere Prestige

- ID Venturino: `281259419`
- Precio Venturino: $311.000
- Tokens: tractor, 32, 8r, prestige
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 133 válidos antes de top
- Candidatos excluidos por precio: 3427
- Candidatos excluidos por score: 343
- Mediana ML: $295.580
- Venturino vs mediana ML: 5.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1501324025&sid=search) | $209.218 | -32.7% | tipo: JUGUETE; tokens técnicos: 8r; tokens comunes: tractor, 8r; compatibilidad/marca: John Deere |
| 2 | media | 57 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1782656432&sid=search) | $291.302 | -6.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 3 | media | 57 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1507969023&sid=search) | $288.367 | -7.3% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 4 | media | 57 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2555019084&sid=search) | $199.880 | -35.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tractor John Deere 8360rt Oruga Escala 1:32 Ertl Colección](https://www.mercadolibre.com.ar/tractor-john-deere-8360rt-oruga-escala-132-ertl-coleccion/up/MLAU3926699882#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3232804188&sid=search) | $345.000 | 10.9% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Tractor miniatura John Deere 4250 con FWA y cabina 1:32 verde](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=DfaxCfGhYqcb%2Fr6mhMw1u4SDaZODlpDhRV4Kw2COKUMhD1apSNLFcOd3G1uLPj3kpIjZaaUM9HTwFUzKCYLySyg4UxIm4XJIl0zcqZ5oP3zaFyf%2FkcHcsxwTfJFzu0OVTv0pKHwfh5Wq6MnJn%2BrD8mEYylmC4Xu7g0iy06QdQvPZ3UhQppSdJTYj3l93%2BfvxmRVATRit4VFQuC93BqoYAC1ut1AfhNL77azrlfrzsFyKHfBlTwHjgdEYkH1D2UJNx9OfYmZDWuPJzBeBlgMDRbN%2BwLo3lxdZnj3zRPHJnC1%2BCIDa9PyT2EmENGxk%2Bbz1NKPmcnv98lZbQC45%2BWHtwjfzrebDpz2Hzvcqg57B35uOdx0f1UnLjkpB7csCg3bhR9mps9cFF4V1i8zMCARu%2Fpl54NCRSZPU2oNdgQtxv5TBR0OBqkCbFjvPqhUNktUwaNTVccYXHBhK6kWR6siop%2FKbDkM8tS5nLK6dkjbuBDwIZZKT1zBaq3A%2BhGnj96PNtbPWJPkVhV27bJoHBxASphWlQo8fAoVVdZ9Svvr4bR0gV0g0gOqBOVHFUmllY28tpQmkCbS1dAtJN5XoLYdwn7aCNVvQzeUzc0B60yp7oWHEf37jDuTF%2B1Xf4ynmZXA0ZtPForWNj%2FCKt0W%2BBNXcM3bQUI1LnlXNdnNFHxqh7SNqgttQMWx0EItK1f2ZYD1HYDbyPhhNnlesMhyWJt7AKEe7BORg8xdaFTgKvbRXsbIcU749oDr7fMVcRC8q3BQo91y3siRtUfzGr70HFpbHqeutXSXQOBPekEwNPIYk%2B2A5s07mV9Wfp2nETHGC7oT3%2FVEU5pEmPk8GWaOafsVwlbSrkK6kyIekqkym0UDQMVydKbia0bhBwfpC21ySfAU2WL6DInppb%2BJNM6I1SDY8B94cYLlYLuFJ0KBuJ5jmJIzNFwpQ%2FRLVbXrCZfZzrGhvda2NPj9AfgJKzWhO3o58UvQd%2F3CbGYPUByLNBm%2F4ikOP%2F04YxyJXSiG8LXk%3D&pdp_filters=item_id%3AMLA1688046131#polycard_client=search-desktop&is_advertising=true&searchVariation=MLA54486376&backend_model=search-backend&be_origin=backend&search_layout=grid&position=25&type=pad&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1688046131&sid=search) | $259.000 | -16.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1537554751&sid=search) | $394.031 | 26.7% | tipo: JUGUETE; tokens comunes: tractor, 32; compatibilidad/marca: John Deere |
| 8 | media | 51 | [Tractor De Juguete Verde 1 32 Con Remolque Y Disco](https://www.mercadolibre.com.ar/tractor-de-juguete-verde-1-32-con-remolque-y-disco/up/MLAU3629093285#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA2605756500&sid=search) | $297.761 | -4.3% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 9 | media | 51 | [Tractor De Colección Metalizado 1/32 Con Ruedas Simples](https://www.mercadolibre.com.ar/tractor-de-coleccion-metalizado-132-con-ruedas-simples/up/MLAU3636789934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1594244033&sid=search) | $280.966 | -9.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 10 | media | 50 | [Set Granja 1 32 Tractor Metal Y Animales Juguete Niño](https://www.mercadolibre.com.ar/set-granja-1-32-tractor-metal-y-animales-juguete-nino/up/MLAU3629077203#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=54&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2605820936&sid=search) | $302.747 | -2.7% | tipo: JUGUETE; tokens comunes: tractor, 32 |
| 11 | media | 50 | [John Deere 9460r Escala 1:32](https://www.mercadolibre.com.ar/john-deere-9460r-escala-132/up/MLAU3930048392#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=24&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1765243671&sid=search) | $280.000 | -10.0% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Antiguo Juguete Tractor John Deere Mod 730 #2de Aluminio](https://www.mercadolibre.com.ar/antiguo-juguete-tractor-john-deere-mod-730-2de-aluminio/up/MLAU3383201878#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2289526400&sid=search) | $310.000 | -0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1763349785&sid=search) | $312.737 | 0.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Rociador Juguete Escala 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/rociador-juguete-escala-132-john-deere--a-pedidoexkarg/up/MLAU368494041#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1766427200&sid=search) | $322.795 | 3.8% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere 1/64 4020 + Trailer - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-4020--trailer--a-pedidoexkarg/up/MLAU2685530606#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=17&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1949971056&sid=search) | $323.265 | 3.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1514896991&sid=search) | $293.399 | -5.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1417510473&sid=search) | $332.793 | 7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor 1/64 John Deere 9rx 640 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-640--a-pedidoexkarg/up/MLAU3225654480#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1503208905&sid=search) | $332.996 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Set Ertl John Deere Haying 1:32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-ertl-john-deere-haying-132--a-pedidoexkarg/up/MLAU2044179155#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1929826114&sid=search) | $283.187 | -8.9% | tipo: JUGUETE; tokens comunes: 32; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Camión De Volteo John Deere 460e-ii 1/50 Escala Prestige](https://www.mercadolibre.com.ar/camion-de-volteo-john-deere-460eii-150-escala-prestige/up/MLAU3452033317#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1549150807&sid=search) | $282.699 | -9.1% | tipo: JUGUETE; tokens comunes: prestige; compatibilidad/marca: John Deere |

### 115. Tractor 435 Replica John Deere

- ID Venturino: `281234444`
- Precio Venturino: $202.000
- Tokens: tractor, 435, replica
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 149 válidos antes de top
- Candidatos excluidos por precio: 3048
- Candidatos excluidos por score: 706
- Mediana ML: $193.126
- Venturino vs mediana ML: 4.6%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1583656447&sid=search) | $259.000 | 28.2% | tipo: JUGUETE; tokens técnicos: 435; tokens comunes: tractor, 435; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Juguete De Construcción John Deere Tractor Con Taladro 16](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-con-taladro-16/up/MLAU3319259344#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2194899840&sid=search) | $187.899 | -7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1713564907&sid=search) | $217.905 | 7.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1498485099&sid=search) | $150.000 | -25.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1784581058&sid=search) | $270.242 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Johnny John Deere A Control Remoto Verde](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1676451917&sid=search) | $128.454 | -36.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | -39.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set Vintage Tractor John Deere Ertl 1/32_exkarg](https://www.mercadolibre.com.ar/set-vintage-tractor-john-deere-ertl-132exkarg/up/MLAU3553723704#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2555019084&sid=search) | $199.880 | -1.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor John Deere 1/64 8760 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8760--a-pedidoexkarg/up/MLAU2703887868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1950555252&sid=search) | $198.353 | -1.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1501324025&sid=search) | $209.218 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Cargador Fro](https://www.mercadolibre.com.ar/toy-tractor-bruder-john-deere-7r-350-w-front-loader-116/p/MLA2068584127#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA3003042642&sid=search) | $210.077 | 4.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Bruder John Deere Tractor 5115 2022 1:16 - Verde](https://www.mercadolibre.com.ar/bruder-john-deere-tractor-5115-2022-116--verde/up/MLAU153770758#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA1163263641&sid=search) | $212.499 | 5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor John Deere 4020 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-4020-164--a-pedidoexkarg/up/MLAU2803971639#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1461201863&sid=search) | $179.991 | -10.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor 2021 Ertl 1:64 John Deere 8960 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2021-ertl-164-john-deere-8960--a-pedidoexkarg/up/MLAU3920195868#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA3219582450&sid=search) | $179.880 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1609083934&sid=search) | $227.227 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Coleccion John Deere 9470rx Toy - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-john-deere-9470rx-toy--a-pedidoexkarg/up/MLAU150165852#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=59&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1141831682&sid=search) | $175.436 | -13.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor John Deere 1:64 50th Anniversary Edition_exkarg](https://www.mercadolibre.com.ar/tractor--john-deere-164-50th-anniversary-editionexkarg/up/MLAU3037093501#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA2021607916&sid=search) | $174.180 | -13.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA2138660238&sid=search) | $230.189 | 14.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Réplica Camión De Grano John Deere Ertl 1:64 Metal Y](https://www.mercadolibre.com.ar/replica-camion-de-grano-john-deere-ertl-164-metal-y/up/MLAU3890736594#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA3154241320&sid=search) | $172.998 | -14.4% | tipo: JUGUETE; tokens comunes: replica; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere Ertl 1/64 F4365 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-164-f4365--a-pedidoexkarg/up/MLAU2678890449#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1458424063&sid=search) | $172.313 | -14.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 116. Tractor 6210R Bif Farm John Deere

- ID Venturino: `281234446`
- Precio Venturino: $262.000
- Tokens: tractor, 6210r, bif, farm
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 140 válidos antes de top
- Candidatos excluidos por precio: 3268
- Candidatos excluidos por score: 495
- Mediana ML: $254.500
- Venturino vs mediana ML: 2.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 71 | [John Deere 1:64 Model 6210r Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/john-deere-164-model-6210r-tractor--a-pedidoexkarg/up/MLAU179194551#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1609083934&sid=search) | $227.227 | -13.3% | tipo: JUGUETE; tokens técnicos: 6210r; tokens comunes: tractor, 6210r; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tractor Tomy John Deere 1:16 435 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-tomy-john-deere-116-435--a-pedidoexkarg/up/MLAU3567405430#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA1583656447&sid=search) | $259.000 | -1.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1949945520&sid=search) | $265.905 | 1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor 1/64 John Deere 9rx 830 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-9rx-830--a-pedidoexkarg/up/MLAU3009551897#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1476358051&sid=search) | $269.326 | 2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor Juguete John Deere 1/50 843l - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-150-843l--a-pedidoexkarg/up/MLAU375792789#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1784542220&sid=search) | $270.089 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1784581058&sid=search) | $270.242 | 3.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Antiguo Tractor De Juguete John Deere Mod 730 Aluminio #1](https://www.mercadolibre.com.ar/antiguo-tractor-de-juguete-john-deere-mod-730-aluminio--1/up/MLAU3383194834#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2289667224&sid=search) | $250.000 | -4.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1970561562&sid=search) | $248.500 | -5.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1571921115&sid=search) | $245.000 | -6.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor 1/64 John Deere 8400 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-164-john-deere-8400--a-pedidoexkarg/up/MLAU2670938419#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1949431358&sid=search) | $238.267 | -9.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1507969023&sid=search) | $288.367 | 10.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Set Juguete Tractor 1/32 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-juguete-tractor-132-john-deere--a-pedidoexkarg/up/MLAU376597572#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1782656432&sid=search) | $291.302 | 11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1514896991&sid=search) | $293.399 | 12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [1/64 John Deere 4960 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/164-john-deere-4960-tractor--a-pedidoexkarg/up/MLAU3260881696#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA2138660238&sid=search) | $230.189 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere 21 Big Scoop Tbek](https://www.mercadolibre.com.ar/tractor-john-deere-21-big-scoop-tbek/p/MLA2063340086#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1713564907&sid=search) | $217.905 | -16.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Antiguo Juguete Tractor John Deere Mod 730 #2de Aluminio](https://www.mercadolibre.com.ar/antiguo-juguete-tractor-john-deere-mod-730-2de-aluminio/up/MLAU3383201878#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=11&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2289526400&sid=search) | $310.000 | 18.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Bruder John Deere Tractor 5115 2022 1:16 - Verde](https://www.mercadolibre.com.ar/bruder-john-deere-tractor-5115-2022-116--verde/up/MLAU153770758#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA1163263641&sid=search) | $212.499 | -18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Tráiler Fore](https://www.mercadolibre.com.ar/toy-truck-bruder-john-deere-7r-350-w-forestry-trailer-116/p/MLA2075570634#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1763349785&sid=search) | $312.737 | 19.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Tractor De Juguete Bruder John Deere 7r 350 Con Cargador Fro](https://www.mercadolibre.com.ar/toy-tractor-bruder-john-deere-7r-350-w-front-loader-116/p/MLA2068584127#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA3003042642&sid=search) | $210.077 | -19.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor John Deere 1:64 8r 370 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-8r-370--a-pedidoexkarg/up/MLAU3205816153#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1501324025&sid=search) | $209.218 | -20.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 117. Tractor 64 JD 7R 330 Row Crop John Deere

- ID Venturino: `281259425`
- Precio Venturino: $92.000
- Tokens: tractor, 64, 7r, 330, row, crop
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 105 válidos antes de top
- Candidatos excluidos por precio: 2890
- Candidatos excluidos por score: 908
- Mediana ML: $99.495
- Venturino vs mediana ML: -7.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 56 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3214114070&sid=search) | $95.000 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 2 | media | 56 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2450624614&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 3 | media | 56 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1835352944&sid=search) | $112.120 | 21.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 4 | media | 56 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677937795&sid=search) | $68.990 | -25.0% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 5 | media | 56 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677885959&sid=search) | $65.990 | -28.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 6 | media | 56 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1472790549&sid=search) | $119.425 | 29.8% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 7 | media | 56 | [Tractor John Deere 8r370 Escala 1/64 Verde](https://www.mercadolibre.com.ar/tractor-john-deere-8r370-escala-164-verde/p/MLA38730200#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA2472373712&sid=search) | $120.000 | 30.4% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 8 | media | 56 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3141293538&sid=search) | $122.099 | 32.7% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 9 | media | 55 | [Tractor 2025 Ertl 1:64 John Deere 4955 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-2025-ertl-164-john-deere-4955--a-pedidoexkarg/up/MLAU3262907220#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA2141477802&sid=search) | $113.994 | 23.9% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 10 | media | 55 | [Tractor De Juguete John Deere 1/64 4230 Lp86726 Verde Y Amar](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726-verde-y-amar/up/MLAU3877165881#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA3148218346&sid=search) | $117.998 | 28.3% | tipo: JUGUETE; tokens comunes: tractor, 64; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2351763726&sid=search) | $90.169 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Ertl John Deere Retroexcavadora Ertl 1/64](https://www.mercadolibre.com.ar/ertl-john-deere-retroexcavadora-ertl-164/up/MLAU173600216#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA791208779&sid=search) | $98.990 | 7.6% | tipo: JUGUETE; tokens comunes: 64; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381464&sid=search) | $100.000 | 8.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | -9.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | -10.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Ertl Segadora John Deere W260r 1:64](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=x2ld5MLOb3mFjSyDlHKZSsUxo58b5ztUKQaL%2BvL587b4WguNINHNlAoFHw3Kag4pJJu65O3pG1siV%2Fb7r2QlXDP5jB2kLU4l0YEQDIgzXRGhlc2BClqoJWlbypk%2BNmF85vWWCTm7%2Bz2V1R1N0RaFh14mMTR%2BHwsQSmVxcaIHXDerM1jBz3ICKjzgKCa8aQ30aDhS3M5iPxBAENvglh94EfeVnC1sf2V9ircM5wyrCCVbKtDTePNw7IpFLaPvMHViMXnoyDVGOQ7TrkUY6bY69RMsd191C8BlDRfnoAZkksdWWwYNFpzi2rAcJyD0T1BH6LMle9bjbjvqMUhKH%2FRSMYTnhIBT1ORxmSAg609RZLVkmenDOb0OiYxiBrOJeq88QVR81r7dRRtoHuBiH%2BPgS2Ej3rHKArArlaLFgNrZMI1qDLQhTokHbIwUzGDM%2FpDE02OFrWJufmT04LSQ6QQwwNLWAuSdPUQgAVB4icRCFFmTFJQNGIEI2MNUUkHtDZHqljd0fx6SYSqr7x5tm99mAH%2BGlbBhyVsCIXt0bc6CFzylwyzpwo3M%2FatWGjiUG6N9ZVnt5Mla5QI7ugboULm2lltiU%2Fi419dXcT%2BzrJcdXwrLyxvzGVVUYxuaDcAYeDZPkwZXCCNwKZLyu1aHsP%2FkBuWmdyc4eqMChhBWfUnmRX3LTRkgyGwI8zegjfkETvEjHKtd73xpP%2FhucaMk1KDL0l7Hlig5JRYqPCF%2FC%2BV6H7h1G8oTcnLotGZYuqZIbTBqJKNcTBau%2BjxnJZh59l8tPJecW97FgqcL5I8bF3Kya04ORBfrSDwyCHf2migdUl6x5YbjIAhqIpxwK3A6lIaVgdAzryj%2F%2FP8SrW2vGZ8Lq6bhCgA5mEmgggQzSfV53xzruRasj%2B2HC9%2B6XOKGHj%2FW80%2Bku%2Bw2PYzBxslW6ttDVOb3I0WdfpVyCZfTTfyLx0ZTTrF2JSSqtputFdr0%2BoD9Siv6l0Us&pdp_filters=item_id%3AMLA2578658354#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3565085905&backend_model=search-backend&be_origin=backend&search_layout=grid&position=27&type=pad&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2578658354&sid=search) | $105.000 | 14.1% | tipo: JUGUETE; tokens comunes: 64; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2298914526&sid=search) | $108.299 | 17.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 118. Tractor 6410 John Deere

- ID Venturino: `281053456`
- Precio Venturino: $400.000
- Tokens: tractor, 6410
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 20
- Candidatos usados: 20 de 118 válidos antes de top
- Candidatos excluidos por precio: 3514
- Candidatos excluidos por score: 271
- Mediana ML: $383.749
- Venturino vs mediana ML: 4.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Ertl John Deere 6410 Tractor - A Pedido_exkarg](https://www.mercadolibre.com.ar/ertl-john-deere-6410-tractor--a-pedidoexkarg/up/MLAU346359946#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1417510473&sid=search) | $332.793 | -16.8% | tipo: JUGUETE; tokens técnicos: 6410; tokens comunes: tractor, 6410; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1534604385&sid=search) | $399.880 | -0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1767841826&sid=search) | $398.326 | -0.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1241574644&sid=search) | $420.295 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1462618659&sid=search) | $452.361 | 13.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1165962632&sid=search) | $475.779 | 18.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1493524125&sid=search) | $501.990 | 25.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juguete De Construcción John Deere Tractor Johnny 16 Piezas](https://www.mercadolibre.com.ar/juguete-de-construccion-john-deere-tractor-johnny-16-piezas/up/MLAU3358521643#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1514896991&sid=search) | $293.399 | -26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor John Deere + Trailer 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere--trailer-132--a-pedidoexkarg/up/MLAU3270912322#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1507969023&sid=search) | $288.367 | -27.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor Juguete John Deere 8450 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-8450--a-pedidoexkarg/up/MLAU377367182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=50&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1784581058&sid=search) | $270.242 | -32.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor John Deere 1/64 9510rt - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-164-9510rt--a-pedidoexkarg/up/MLAU2685696760#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=45&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1949945520&sid=search) | $265.905 | -33.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juguete A Escala Arado 4 Rejas John Deere Para Tractor](https://www.mercadolibre.com.ar/juguete-a-escala-arado-4-rejas-john-deere-para-tractor/up/MLAU2881916538#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1970561562&sid=search) | $248.500 | -37.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Juguete Antiguo Tractor Y Arado John Deere Usados De Epoca](https://www.mercadolibre.com.ar/juguete-antiguo-tractor-y-arado-john-deere-usados-de-epoca/up/MLAU3534971102#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1571921115&sid=search) | $245.000 | -38.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1503458191&sid=search) | $555.586 | 38.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1537554751&sid=search) | $394.031 | -1.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1138213292&sid=search) | $373.467 | -6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Lego Technic John Deere 9620r Tractor 4wd 42136 Juguete De C](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-tractor-4wd-42136-juguete-de-c/up/MLAU3517467383#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1568723167&sid=search) | $372.999 | -6.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2510969874&sid=search) | $438.999 | 9.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1501340737&sid=search) | $439.275 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [John Deere Ride On Toys Tractor A Pedales Con Vagón Para Niñ](https://www.mercadolibre.com.ar/tomy-tractor-pedal-46088-verde-amarillo-con-remolque-18m/p/MLA2075930890#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2550302558&sid=search) | $345.341 | -13.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 119. Tractor 8320R con disco 637John Deere

- ID Venturino: `281259399`
- Precio Venturino: $102.000
- Tokens: tractor, 8320r, disco, 637john
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: alta
- Candidatos media/alta: 2
- Candidatos usados: 20 de 125 válidos antes de top
- Candidatos excluidos por precio: 2839
- Candidatos excluidos por score: 939
- Mediana ML: $100.000
- Venturino vs mediana ML: 2.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | alta | 75 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $104.499 | 2.5% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 2 | alta | 73 | [Tractor John Deere 8320r Y Disco Ertl 1:64 Escala](https://www.mercadolibre.com.ar/tractor-john-deere-8320r-y-disco-ertl-164-escala/up/MLAU3490819076#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA1557066483&sid=search) | $142.598 | 39.8% | tipo: JUGUETE; tokens técnicos: 8320r; tokens comunes: tractor, 8320r, disco |
| 3 | baja | 44 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -11.2% | tipo: JUGUETE; tokens comunes: tractor |
| 4 | baja | 44 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -11.8% | tipo: JUGUETE; tokens comunes: tractor |
| 5 | baja | 44 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -11.8% | tipo: JUGUETE; tokens comunes: tractor |
| 6 | baja | 44 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | 20.5% | tipo: JUGUETE; tokens comunes: tractor |
| 7 | baja | 44 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -31.4% | tipo: JUGUETE; tokens comunes: tractor |
| 8 | baja | 43 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1782318111&sid=search) | $102.234 | 0.2% | tipo: JUGUETE; tokens comunes: tractor |
| 9 | baja | 43 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2450624614&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 10 | baja | 43 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381464&sid=search) | $100.000 | -2.0% | tipo: JUGUETE; tokens comunes: tractor |
| 11 | baja | 43 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA784333319&sid=search) | $99.867 | -2.1% | tipo: JUGUETE; tokens comunes: tractor |
| 12 | baja | 43 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3036951256&sid=search) | $104.164 | 2.1% | tipo: JUGUETE; tokens comunes: tractor |
| 13 | baja | 43 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2588150140&sid=search) | $104.271 | 2.2% | tipo: JUGUETE; tokens comunes: tractor |
| 14 | baja | 43 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y Soni](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2062292510#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=47&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=&sid=search) | $96.260 | -5.6% | tipo: JUGUETE; tokens comunes: tractor |
| 15 | baja | 43 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1588597639&sid=search) | $107.949 | 5.8% | tipo: JUGUETE; tokens comunes: tractor |
| 16 | baja | 43 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2298914526&sid=search) | $108.299 | 6.2% | tipo: JUGUETE; tokens comunes: tractor |
| 17 | baja | 43 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1676425971&sid=search) | $108.618 | 6.5% | tipo: JUGUETE; tokens comunes: tractor |
| 18 | baja | 43 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3214114070&sid=search) | $95.000 | -6.9% | tipo: JUGUETE; tokens comunes: tractor |
| 19 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-ruedas-john-deere-tractor-motion/p/MLA2063930998#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=53&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1713519845&sid=search) | $94.345 | -7.5% | tipo: JUGUETE; tokens comunes: tractor |
| 20 | baja | 43 | [Tomy Monster Treads Lightning Wheels Tractor John Deere De 3](https://www.mercadolibre.com.ar/tomy-monster-treads-remando-tractor-john-deere-en-movimiento/p/MLA2057072253#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA1588501493&sid=search) | $94.345 | -7.5% | tipo: JUGUETE; tokens comunes: tractor |

### 120. Tractor 9470RX John Deere

- ID Venturino: `281222478`
- Precio Venturino: $95.000
- Tokens: tractor, 9470rx
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 111 válidos antes de top
- Candidatos excluidos por precio: 2884
- Candidatos excluidos por score: 908
- Mediana ML: $97.434
- Venturino vs mediana ML: -2.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -4.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 51 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -26.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 51 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | 29.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor John Deere Industria Argentina Escala 1:64](https://www.mercadolibre.com.ar/tractor-john-deere-industria-argentina-escala-164/up/MLAU3906024961#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=55&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA3214114070&sid=search) | $95.000 | 0.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/l-tractor-de-juguete-de-granja-grande-con-luces-y-sonidos-z/p/MLA2057912939#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1652235961&sid=search) | $90.773 | -4.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2351763726&sid=search) | $90.169 | -5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Siku Serie 16- Tractor John Deere Con Empacadora - Metal](https://www.mercadolibre.com.ar/siku-serie-16-tractor-john-deere-con-empacadora--metal/up/MLAU194610030#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=6&type=product&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA784333319&sid=search) | $99.867 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor John Deere Escala 1/64 Varios Modelos](https://www.mercadolibre.com.ar/tractor-john-deere--escala-164-varios-modelos/up/MLAU3488642405#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=48&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA2450624614&sid=search) | $100.000 | 5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381464&sid=search) | $100.000 | 5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Paquete Con 3 Tractores Ertl Iron John Deere, Incluidos](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-toy-3pack-includes-john/p/MLA2039322340#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1782318111&sid=search) | $102.234 | 7.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3036951256&sid=search) | $104.164 | 9.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $104.499 | 10.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | -12.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | -13.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2298914526&sid=search) | $108.299 | 14.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1676425971&sid=search) | $108.618 | 14.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | -20.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tomy Monster Treads Remando Tractor John Deere En Movimiento](https://www.mercadolibre.com.ar/john-deere-tractor-monster-treads-lightning-wheels-mo/p/MLA2057618403#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1613992061&sid=search) | $114.470 | 20.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 121. Tractor 9620RX John Deere

- ID Venturino: `281259422`
- Precio Venturino: $630.000
- Tokens: tractor, 9620rx
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 16
- Candidatos usados: 20 de 70 válidos antes de top
- Candidatos excluidos por precio: 3634
- Candidatos excluidos por score: 199
- Mediana ML: $490.490
- Venturino vs mediana ML: 28.4%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2735955816&sid=search) | $599.379 | -4.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA3260069348&sid=search) | $578.990 | -8.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1503458191&sid=search) | $555.586 | -11.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1493524125&sid=search) | $501.990 | -20.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1165962632&sid=search) | $475.779 | -24.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1462618659&sid=search) | $452.361 | -28.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1241574644&sid=search) | $420.295 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1534604385&sid=search) | $399.880 | -36.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1767841826&sid=search) | $398.326 | -36.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor Ertl 1/32 John Deere 9r 590 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-132-john-deere-9r-590--a-pedidoexkarg/up/MLAU2910027843#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1984193972&sid=search) | $652.589 | 3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1504753813&sid=search) | $554.343 | -12.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1422054560&sid=search) | $733.573 | 16.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA3229211686&sid=search) | $478.990 | -24.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1501340737&sid=search) | $439.275 | -30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2510969874&sid=search) | $438.999 | -30.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1537554751&sid=search) | $394.031 | -37.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | baja | 44 | [Tractor De Juguete Con Carro Cerealero Verde Y Amarillo](https://www.mercadolibre.com.ar/tractor-de-juguete-con-carro-cerealero-verde-y-amarillo/up/MLAU3636789908#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA2604933544&sid=search) | $815.147 | 29.4% | tipo: JUGUETE; tokens comunes: tractor |
| 18 | baja | 43 | [Tractor Tomy Monster Treads Lightning Wheels Con Luzes Y](https://www.mercadolibre.com.ar/tractor-tomy-monster-treads-lightning-wheels-con-luzes-y/up/MLAU3955807980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1779564783&sid=search) | $433.599 | -31.2% | tipo: JUGUETE; tokens comunes: tractor |
| 19 | baja | 41 | [Juguete Bruder 09823 1/16 John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/juguete-bruder-09823-116-john-deere--a-pedidoexkarg/up/MLAU242460898#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1422234228&sid=search) | $633.284 | 0.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Cosechadora John Deere 9860 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-9860-132--a-pedidoexkarg/up/MLAU368490469#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1766538620&sid=search) | $621.670 | -1.3% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 122. Tractor Baler y vagon John Deere

- ID Venturino: `281222474`
- Precio Venturino: $94.000
- Tokens: tractor, baler, vagon
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 110 válidos antes de top
- Candidatos excluidos por precio: 2894
- Candidatos excluidos por score: 899
- Mediana ML: $89.990
- Venturino vs mediana ML: 4.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -3.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Antiguo ?? Juguete Tractor Tipo John Deere Sin Asiento](https://www.mercadolibre.com.ar/antiguo--juguete-tractor-tipo-john-deere-sin-asiento/up/MLAU3417691193#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=18&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2351763726&sid=search) | $90.169 | -4.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Juguete Tractor John Deere De Cortar Pasto A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-de-cortar-pasto-a-escala/up/MLAU3186114494#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=40&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381464&sid=search) | $100.000 | 6.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | -11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | -12.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2298914526&sid=search) | $108.299 | 15.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1676425971&sid=search) | $108.618 | 15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -25.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | -25.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | -25.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | -26.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | -26.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Juguete Tractor John Deere + Camioneta + Trailer (a Escala)](https://www.mercadolibre.com.ar/juguete-tractor-john-deere--camioneta--trailer-a-escala/up/MLAU3464286837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2419768292&sid=search) | $120.000 | 27.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381500&sid=search) | $120.000 | 27.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Juguete Tractor John Deere 9630 Articulado A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-9630-articulado-a-escala/up/MLAU3186101404#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381412&sid=search) | $120.000 | 27.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | 30.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | -32.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | -33.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 123. Tractor con vagón John Deere

- ID Venturino: `281053467`
- Precio Venturino: $71.000
- Tokens: tractor, vagon
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 48 válidos antes de top
- Candidatos excluidos por precio: 2974
- Candidatos excluidos por score: 881
- Mediana ML: $69.929
- Venturino vs mediana ML: 1.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -1.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | 26.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | 26.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | 27.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1606696085&sid=search) | $50.000 | -29.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | 0.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | -2.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | -2.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677937795&sid=search) | $68.990 | -2.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Minicargadora Ertl Iron John Deere Tractor Gator De Juguetes](https://www.mercadolibre.com.ar/ertl-iron-john-deere-tractor-gator-skid-steer-toys/p/MLA2063838182#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2169077264&sid=search) | $74.053 | 4.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Set De Vehículos John Deere Camión Volquete Y Tractor 18m+](https://articulo.mercadolibre.com.ar/MLA-1671668567-set-de-vehiculos-john-deere-camion-volquete-y-tractor-18m-_JM?searchVariation=196849679823#polycard_client=search-desktop&be_origin=backend&searchVariation=196849679823&search_layout=grid&position=12&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $75.376 | 6.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [. $ Tractor De Juguete Tomy John Deere Big Farm Con Luces Y](https://www.mercadolibre.com.ar/tractor-de-juguete-tomy-john-deere-big-farm-con-luces-y-soni/p/MLA2060714219#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=13&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1572452243&sid=search) | $75.786 | 6.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677885959&sid=search) | $65.990 | -7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | -10.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | -11.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Llavero John Deere 8r 410 Tractor Fundido A Presión](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=871acca8-5df7-419b-bd05-056c65e49990&wid=MLA3234660246&sid=search) | $62.349 | -12.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Juguetes Ertl Iron John Deere Tractor Gator](https://www.mercadolibre.com.ar/john-deere-ertl-iron-die-cast-replicas-includes-john-de/p/MLA2065305904#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1575273767&sid=search) | $82.049 | 15.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tractor De Juguete Tomy John Deere Lights & Sounds](https://www.mercadolibre.com.ar/l-tractor-de-juguete-tomy-john-deere-big-farm-con-luces-as1/p/MLA2062238398#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3082491710&sid=search) | $83.493 | 17.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 124. Tractor de pala grande John Deere de 21" con cargador

- ID Venturino: `281259417`
- Precio Venturino: $580.000
- Tokens: tractor, pala, grande, 21, cargador
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 18
- Candidatos usados: 20 de 78 válidos antes de top
- Candidatos excluidos por precio: 3598
- Candidatos excluidos por score: 227
- Mediana ML: $464.070
- Venturino vs mediana ML: 25.0%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Tractor Bruder John Deere 7r 350 Con Cargador Frontal](https://www.mercadolibre.com.ar/tractor-bruder-john-deere-7r-350-con-cargador-frontal/up/MLAU3709742292#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA2735955816&sid=search) | $599.379 | 3.3% | tipo: JUGUETE; tokens comunes: tractor, cargador; compatibilidad/marca: John Deere |
| 2 | media | 49 | [Tractor John Deere Ertl 1/16 4450 - A Pedido](https://www.mercadolibre.com.ar/tractor-john-deere-ertl-116-4450--a-pedido/up/MLAU3928799493#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=43&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA3260069348&sid=search) | $578.990 | -0.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 49 | [Tractor 1/32 John Deere 8020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-132-john-deere-8020--a-pedidoexkarg/up/MLAU3220029499#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1503458191&sid=search) | $555.586 | -4.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 49 | [Tractor Escala 1/16 John Deere 730 - A Pedido](https://www.mercadolibre.com.ar/tractor-escala-116-john-deere-730--a-pedido/up/MLAU3156513132#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=38&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1493524125&sid=search) | $501.990 | -13.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 49 | [Tractor John Deere 7930 Bruder - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-7930-bruder--a-pedidoexkarg/up/MLAU208873678#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1165962632&sid=search) | $475.779 | -18.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 49 | [Trailer Juguete Tractor A Pedal John Deere - A Pedido_exkarg](https://www.mercadolibre.com.ar/trailer-juguete-tractor-a-pedal-john-deere--a-pedidoexkarg/up/MLAU2860589788#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1462618659&sid=search) | $452.361 | -22.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 49 | [Tractor Coleccion John Deere 630 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-coleccion-john-deere-630-narrow--a-pedidoexkarg/up/MLAU227370769#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1241574644&sid=search) | $420.295 | -27.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Set Tractores Ertl John Deere Usa Made_exkarg](https://www.mercadolibre.com.ar/set-tractores-ertl-john-deere-usa-madeexkarg/up/MLAU3420416513#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1534604385&sid=search) | $399.880 | -31.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tractor Juguete John Deere Model Bw - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-juguete-john-deere-model-bw--a-pedidoexkarg/up/MLAU369034625#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=28&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA1767841826&sid=search) | $398.326 | -31.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116--a-pedidoexkarg/up/MLAU3236928928#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=57&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1504753813&sid=search) | $554.343 | -4.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 48 | [Tractor Ertl 1/32 John Deere 9r 590 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-132-john-deere-9r-590--a-pedidoexkarg/up/MLAU2910027843#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=49&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1984193972&sid=search) | $652.589 | 12.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 48 | [Tractor Ertl John Deere 1930 Gp 1/16 Usamade - A Pedido](https://www.mercadolibre.com.ar/tractor-ertl-john-deere-1930-gp-116-usamade--a-pedido/up/MLAU3913366151#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=94c87051-826b-4545-9c21-dda2c9383015&wid=MLA3229211686&sid=search) | $478.990 | -17.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 48 | [Set Tractores 1/64 John Deere 8r Series - A Pedido_exkarg](https://www.mercadolibre.com.ar/set-tractores-164-john-deere-8r-series--a-pedidoexkarg/up/MLAU3205850567#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1501340737&sid=search) | $439.275 | -24.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 48 | [Lego Technic Tractor John Deere 9620r 4wd 42136 Juguete De](https://www.mercadolibre.com.ar/lego-technic-tractor-john-deere-9620r-4wd-42136-juguete-de/up/MLAU3527109884#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2510969874&sid=search) | $438.999 | -24.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 48 | [Tractor 1/16 John Deere 4020 Narrow - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-116-john-deere-4020-narrow--a-pedidoexkarg/up/MLAU258436590#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1422054560&sid=search) | $733.573 | 26.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 48 | [Tractor John Deere Model Wa-17 4wd 1/32 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-john-deere-model-wa17-4wd-132--a-pedidoexkarg/up/MLAU3427573741#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&tracking_id=e97ad130-610b-4bbb-8bfe-5caeb235fb2e&wid=MLA1537554751&sid=search) | $394.031 | -32.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 48 | [Tractor De Coleccion 1:64 John Deere S790 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-s790--a-pedidoexkarg/up/MLAU221292782#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1138213292&sid=search) | $373.467 | -35.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 48 | [Lego Technic John Deere 9620r Tractor 4wd 42136 Juguete De C](https://www.mercadolibre.com.ar/lego-technic-john-deere-9620r-tractor-4wd-42136-juguete-de-c/up/MLAU3517467383#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=22&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1568723167&sid=search) | $372.999 | -35.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | baja | 42 | [Tractor Tomy Monster Treads Lightning Wheels Con Luzes Y](https://www.mercadolibre.com.ar/tractor-tomy-monster-treads-lightning-wheels-con-luzes-y/up/MLAU3955807980#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=34&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1779564783&sid=search) | $433.599 | -25.2% | tipo: JUGUETE; tokens comunes: tractor |
| 20 | baja | 41 | [Cosechadora John Deere 1/32 S780 Combine - A Pedido_exkarg](https://www.mercadolibre.com.ar/cosechadora-john-deere-132-s780-combine--a-pedidoexkarg/up/MLAU2913398397#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=product&tracking_id=83b534f0-2e04-453e-ad34-5e279ab9c6f8&wid=MLA1468790321&sid=search) | $572.999 | -1.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |

### 125. Tractor J7R 330 John Deere Prestige

- ID Venturino: `281259428`
- Precio Venturino: $112.000
- Tokens: tractor, j7r, 330, prestige
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 135 válidos antes de top
- Candidatos excluidos por precio: 2825
- Candidatos excluidos por score: 943
- Mediana ML: $110.369
- Venturino vs mediana ML: 1.5%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 57 | [Ertl Tractor John Deere 8760 1:64 Prestige](https://click1.mercadolibre.com.ar/mclics/clicks/external/MLA/count?a=MFXDmekm71RwLdL25Sd87TvRTuHOKbw5h4P4X482is8HmHzbYajzVoMYqX%2FliRc%2B2gVDnPwBdZiBwp9J3dTMPN%2BSYkB7gQgG2ngfwmJdNTFjL0gEQLj0i2g%2F8NHWOHPLF6itExFbfx2YOtpnkMnhGvIqF18F8KkAqIALkBkazrRhDeFy5ABYlSkcQDtSPmv0QTZHnAcTDdKHA%2BjZnzUAHBYxJMpCYz%2F7ad2dvP6UzOALzSgyVWTOZ39T6b4y%2FWu2lhn0mkkO7rr%2Bau7%2BNiehMlEQeoJ2gZNYoHce50ThpGfsAlUc6fmyDCKjGZYM9MQdbh7BowBPZ9D0qTIixoIXiOlTYDrtIBRSQrCUnTBVCoAYydfWH48urjLkfCTZwwAHZpDzP3M8BTf6kn096ji3FzVb7ts1e3L%2F905mPdZhdbtVwDj1rnJLTyf4%2B9RrWY4aeNoGyCyTUzHFRV7Y1g69kpE6lCYkbIl3B5KJMg5%2Fm1jYh6u9LDOHKbR1OHJmOGC0Lj7k4RVe76Fo9F8g5F206Akk3ule%2Fm%2FTi0rgnFcxHouHaUkiweRbH%2BrV75isUUC7g%2BWHiuoyuNw2ZBF7f4iIvdWNtdCoodlOUEAYSwnvp9v7R%2B53XZ%2Fz0HsQJHJDy%2BoAp8KtqWpWrpnYh%2B0BYmP%2FdpRI5khI9SL%2BbNfWXUGiHKVbHyz5zB6vMu2Njo6zxWPmHnIOG1RQoh1kwHasqFd1328gA0l0YiLpcaIKVd23Mj0UTfrAohmnSuXv9ZBYb1hryZz5WpWDjlsL5n5IhBz%2BUSzJbLs%2Fg16OH0PRAkQK%2BNyglOTehrvHWhTMKyoe3CHlL8sdt3BdQEuBnnabliTBEQ0mvjC6T6PnaZwpfDfIkmNphwl2NvbFr2jQG%2F7OESryoYdk92vay5Q%2FDZqN%2Be%2BlXnAX%2B1xN%2Fl1e8T4Bo4atF808ncMQ47BnERizs8%2FCxDTTMG4JoBFrGcJn%2BPh%2FXbghMcz3%2Fw%3D%3D&pdp_filters=item_id%3AMLA1585558467#polycard_client=search-desktop&is_advertising=true&searchVariation=MLAU3572491218&backend_model=search-backend&be_origin=backend&search_layout=grid&position=1&type=pad&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA1585558467&sid=search) | $155.000 | 38.4% | tipo: JUGUETE; tokens comunes: tractor, prestige; compatibilidad/marca: John Deere |
| 2 | media | 50 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | 9.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -19.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -19.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -19.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1498485099&sid=search) | $150.000 | 33.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | -37.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 49 | [Tractor De Coleccion 1/64 John Deere 8300 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-de-coleccion-164-john-deere-8300--a-pedidoexkarg/up/MLAU397960265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1835352944&sid=search) | $112.120 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 49 | [Tomy Monster Treads Remando Tractor John Deere En Movimiento](https://www.mercadolibre.com.ar/john-deere-tractor-monster-treads-lightning-wheels-mo/p/MLA2057618403#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1613992061&sid=search) | $114.470 | 2.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1676425971&sid=search) | $108.618 | -3.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 49 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2298914526&sid=search) | $108.299 | -3.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 49 | [Tomy John Deere Control Remoto Johnny Tractor Juguete, Verde](https://www.mercadolibre.com.ar/tomy-john-deere-control-remoto-johnny-tractor-juguete-verde/p/MLA2057686697#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=14&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1588597639&sid=search) | $107.949 | -3.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 49 | [Tomy John Deere Tractor Toys Set Económico Y Estuche De De 3](https://www.mercadolibre.com.ar/toy-set-john-deere-value-w-carrying-case-18-farm-toys-3/p/MLA2063188934#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2587960726&sid=search) | $117.753 | 5.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 49 | [Tractor Ertl 1/64 John Deere 5020 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-ertl-164-john-deere-5020--a-pedidoexkarg/up/MLAU2969887597#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=39&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1472790549&sid=search) | $119.425 | 6.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 49 | [Tractor De Juguete Ertl John Deere 8320r Con Juego De Discos](https://articulo.mercadolibre.com.ar/MLA-2752804104-tractor-de-juguete-ertl-john-deere-8320r-con-juego-de-discos-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $104.499 | -6.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 49 | [Tomy Monster Treads Tractor John Deere Todo Terreno Juguete](https://www.mercadolibre.com.ar/tractor-todo-terreno-john-deere-monster-treads-monster-tr/p/MLA2070370265#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2588150140&sid=search) | $104.271 | -6.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 49 | [Set Vehaculos John Deere Tomy Camian Volcador Tractor](https://www.mercadolibre.com.ar/sandboxes-john-deere-35874az-verde/p/MLA2070467658#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=20&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA3036951256&sid=search) | $104.164 | -7.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 49 | [Tractor John Deere 8r370 Escala 1/64 Verde](https://www.mercadolibre.com.ar/tractor-john-deere-8r370-escala-164-verde/p/MLA38730200#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA2472373712&sid=search) | $120.000 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 49 | [Juguete Tractor John Deere + Camioneta + Trailer (a Escala)](https://www.mercadolibre.com.ar/juguete-tractor-john-deere--camioneta--trailer-a-escala/up/MLAU3464286837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2419768292&sid=search) | $120.000 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 49 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381500&sid=search) | $120.000 | 7.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 126. Tractor John Deere 6210R

- ID Venturino: `281259398`
- Precio Venturino: $122.000
- Tokens: tractor, 6210r
- Estado análisis: **Venturino más caro que ML**
- Mejor confianza: media
- Candidatos media/alta: 20
- Candidatos usados: 20 de 144 válidos antes de top
- Candidatos excluidos por precio: 2798
- Candidatos excluidos por score: 961
- Mediana ML: $120.503
- Venturino vs mediana ML: 1.2%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor John Deere Build-a-buddy Con Taladro Stem](https://articulo.mercadolibre.com.ar/MLA-1766685039-tractor-john-deere-build-a-buddy-con-taladro-stem-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=5&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $122.951 | 0.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Juguete Tractor John Deere 7630 A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-7630-a-escala/up/MLAU3180320859#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1498485099&sid=search) | $150.000 | 23.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 51 | [Tractor De Juguete Tomy John Deere Build-a-johnny](https://articulo.mercadolibre.com.ar/MLA-1980129574-tractor-de-juguete-tomy-john-deere-build-a-johnny-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $90.561 | -25.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 51 | [Tractor Jhon Deere A Escala 1:16](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-116/up/MLAU3880571410#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=44&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1729585581&sid=search) | $90.000 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 51 | [Viejo Tractor A Escala - John Deere - 12cm](https://www.mercadolibre.com.ar/viejo-tractor-a-escala--john-deere--12cm/up/MLAU3546245646#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA2545404244&sid=search) | $89.980 | -26.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor De Juguete John Deere 1/64 4230 Lp86726](https://www.mercadolibre.com.ar/tractor-de-juguete-john-deere-164-4230-lp86726/up/MLAU3875328211#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=26&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3141293538&sid=search) | $122.099 | 0.1% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor De Juguete Tomy John Deere De Plástico Verde Para Ni](https://articulo.mercadolibre.com.ar/MLA-1556356895-tractor-de-juguete-tomy-john-deere-de-plastico-verde-para-ni-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $121.675 | -0.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Camión Monstruo Juguete Tractor John Deere Con Ruedas Relámp](https://articulo.mercadolibre.com.ar/MLA-2752494462-camion-monstruo-juguete-tractor-john-deere-con-ruedas-relamp-_JM?searchVariation=195289030113#polycard_client=search-desktop&be_origin=backend&searchVariation=195289030113&search_layout=grid&position=18&type=item&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff) | $121.006 | -0.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor John Deere 8r370 Escala 1/64 Verde](https://www.mercadolibre.com.ar/tractor-john-deere-8r370-escala-164-verde/p/MLA38730200#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA2472373712&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juguete Tractor John Deere + Camioneta + Trailer (a Escala)](https://www.mercadolibre.com.ar/juguete-tractor-john-deere--camioneta--trailer-a-escala/up/MLAU3464286837#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=33&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2419768292&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juguete Vehículo Utilitario Tractor John Deere A Escala](https://www.mercadolibre.com.ar/juguete-vehiculo-utilitario-tractor-john-deere-a-escala/up/MLAU3186120134#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381500&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [Juguete Tractor John Deere 9630 Articulado A Escala](https://www.mercadolibre.com.ar/juguete-tractor-john-deere-9630-articulado-a-escala/up/MLAU3186101404#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=30&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA2086381412&sid=search) | $120.000 | -1.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | media | 50 | [Siku Tractor John Deere 7530 C/empacadora -metal](https://www.mercadolibre.com.ar/siku-tractor-john-deere-7530-cempacadora-metal/up/MLAU155441356#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=31&type=product&float_highlight=last_units&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA1214813147&sid=search) | $127.345 | 4.4% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 14 | media | 50 | [Tractor Monster Truck John Deere De Juguete Con Luces Y Soni](https://www.mercadolibre.com.ar/toy-john-deere-monster-truck-tractor-w-lights-sounds/p/MLA2039435135#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=36&type=product&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985&wid=MLA2142655686&sid=search) | $127.435 | 4.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 15 | media | 50 | [Tractor De Juguete John Deere Monster Treads Con Carrito, Lu](https://articulo.mercadolibre.com.ar/MLA-1634608691-tractor-de-juguete-john-deere-monster-treads-con-carrito-lu-_JM?searchVariation=202373964835#polycard_client=search-desktop&be_origin=backend&searchVariation=202373964835&search_layout=grid&position=2&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $128.089 | 5.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 16 | media | 50 | [Tractor Johnny John Deere A Control Remoto Verde](https://www.mercadolibre.com.ar/radio-controlled-toy-john-deere-johnny-tractor-green/p/MLA2040207079#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1676451917&sid=search) | $128.454 | 5.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 17 | media | 50 | [Tomy Monster Treads Remando Tractor John Deere En Movimiento](https://www.mercadolibre.com.ar/john-deere-tractor-monster-treads-lightning-wheels-mo/p/MLA2057618403#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA1613992061&sid=search) | $114.470 | -6.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 18 | media | 50 | [Tractor Johnny Key-n-go De John Deere Con Luces Y Sonidos Pa](https://www.mercadolibre.com.ar/toy-john-deere-key-n-go-johnny-tractor-w-lights-sounds-3/p/MLA2076722616#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1662281537&sid=search) | $130.293 | 6.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 19 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/john-deere-tractor-toy-and-toy-drill-toddler-stem-take-/p/MLA2022311603#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=3&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1676425971&sid=search) | $108.618 | -11.0% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 20 | media | 50 | [Tractor De Juguete Build-a-buddy John Deere Con Taladro De J](https://www.mercadolibre.com.ar/toy-tractor-build-a-buddy-john-deere-w-toy-drill-3-years/p/MLA2034462589#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=7&type=product&tracking_id=ccd9d08f-99db-4dc7-947f-02230c0986ff&wid=MLA2298914526&sid=search) | $108.299 | -11.2% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |

### 127. Tractor John Deere Flashight

- ID Venturino: `281053462`
- Precio Venturino: $52.000
- Tokens: tractor, flashight
- Estado análisis: **Venturino más barato que ML**
- Mejor confianza: media
- Candidatos media/alta: 12
- Candidatos usados: 20 de 21 válidos antes de top
- Candidatos excluidos por precio: 3073
- Candidatos excluidos por score: 809
- Mediana ML: $64.892
- Venturino vs mediana ML: -19.9%

| # | Confianza | Score | Candidato ML | Precio ML | Dif. vs Venturino | Motivos |
|---:|---|---:|---|---:|---:|---|
| 1 | media | 51 | [Tractor Jhon Deere Ertl 1/64](https://www.mercadolibre.com.ar/tractor-jhon-deere-ertl-164/up/MLAU3675892978#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&tracking_id=bd88c7a6-9a3d-46aa-ad54-af1c484aca2f&wid=MLA1606696085&sid=search) | $50.000 | -3.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 2 | media | 51 | [Tractor Jhon Deere A Escala Farming Simulator](https://www.mercadolibre.com.ar/tractor-jhon-deere-a-escala-farming-simulator/up/MLAU150043074#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=46&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1129779289&sid=search) | $70.000 | 34.6% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 3 | media | 50 | [Llavero John Deere 8r 410 Tractor Fundido A Presión](https://www.mercadolibre.com.ar/key-chain-john-deere-8r-410-tractor-die-cast/p/MLA2074721454#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=42&type=product&tracking_id=871acca8-5df7-419b-bd05-056c65e49990&wid=MLA3234660246&sid=search) | $62.349 | 19.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 4 | media | 50 | [Juguetes De Arena John Deere Tractor Y Camión De Juguete](https://www.mercadolibre.com.ar/john-deere-sandbox-toys-trator-de-brinquedo-de-caminho-basc/p/MLA2040520138#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=41&type=product&tracking_id=398fceff-4a01-4f41-abe1-1d470590ef20&wid=MLA3130984732&sid=search) | $62.684 | 20.5% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 5 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3308028812-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=32&type=item&tracking_id=ac29b2ce-29d9-4fd9-ad30-a09681663985) | $63.793 | 22.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 6 | media | 50 | [Tractor Lp64780 - John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64780--john-deere-164--a-pedidoexkarg/up/MLAU3789534067#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=15&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677885959&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 7 | media | 50 | [Tractor Lp64775 John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/tractor-lp64775--john-deere-164--a-pedidoexkarg/up/MLAU3799165554#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=8&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1677937795&sid=search) | $68.990 | 32.7% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 8 | media | 50 | [Tractor De Juguete John Deere 9620r 4wd 42136](https://articulo.mercadolibre.com.ar/MLA-3321442548-tractor-de-juguete-john-deere-9620r-4wd-42136-_JM#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=37&type=item&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b) | $69.113 | 32.9% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 9 | media | 50 | [Tractor Johnny De Juguete John Deere Con Linterna Para Niños](https://www.mercadolibre.com.ar/john-deere-johnny-tractor-toy-and-flashlight-ages-18-mon/p/MLA2076494990#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=35&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA2271017754&sid=search) | $69.600 | 33.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 10 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949299755#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=46f508d9-eb34-472e-bb97-28848fea1b17&wid=MLA3188096720&sid=search) | $69.858 | 34.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 11 | media | 50 | [Juego De Sábanas John Deere Tractor Tamaño Individual](https://www.mercadolibre.com.ar/juego-de-sabanas-john-deere-tractor-tamano-individual/up/MLAU3949997641#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=19&type=product&tracking_id=7a8b5db3-4710-406f-89ab-9f770c49f95f&wid=MLA3188383906&sid=search) | $69.858 | 34.3% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 12 | media | 50 | [L Juego De Sábanas John Deere Tractor De Tamaño Individual](https://www.mercadolibre.com.ar/h-juego-de-sabanas-john-deere-tractor-de-tamano-individual/p/MLA2037782523#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=23&type=product&tracking_id=dc0db892-3667-41c3-8335-1d0a76ca0b0d&wid=MLA3307554122&sid=search) | $71.637 | 37.8% | tipo: JUGUETE; tokens comunes: tractor; compatibilidad/marca: John Deere |
| 13 | baja | 44 | [Maqueta Metálica Tractor Para Armar Metal Earth](https://www.mercadolibre.com.ar/maqueta-metalica-tractor-para-armar-metal-earth/p/MLA64134064#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=1&type=product&tracking_id=07665078-b3f5-47b0-9634-2a4f66e5425b&wid=MLA1639819361&sid=search) | $33.275 | -36.0% | tipo: JUGUETE; tokens comunes: tractor |
| 14 | baja | 41 | [Casilla De Campo John Deere 1:32 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-132-coleccion-rural/up/MLAU3960591351#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=10&type=product&tracking_id=a94df777-231a-454e-ae0e-bcb21abc2f9b&wid=MLA3316369844&sid=search) | $42.000 | -19.2% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 15 | baja | 41 | [Juguete Bruder Jardinero y Podadora John Deere Escala 1:16](https://www.mercadolibre.com.ar/juguete-bruder-jardinero-y-podadora-john-deere-escala-116/p/MLA27458626#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=9&type=product&float_highlight=last_units&tracking_id=ef7d11d1-406d-4e16-ae2e-c2051ef81825&wid=MLA1588571170&sid=search) | $39.775 | -23.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 16 | baja | 41 | [Carro De Granos Ertl John Deere 1/64 - A Pedido_exkarg](https://www.mercadolibre.com.ar/carro-de-granos-ertl-john-deere-164--a-pedidoexkarg/up/MLAU3874957232#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=21&type=product&tracking_id=f6bf788d-6fd6-479d-ab28-024e72794e56&wid=MLA1725054925&sid=search) | $65.990 | 26.9% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 17 | baja | 41 | [Chad Little Racing Champions John Deere Nascar 1/64 1999 #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-john-deere-nascar-164-1999-97/up/MLAU3273367184#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=52&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1508168125&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 18 | baja | 41 | [Chad Little Racing Champions Nascar 1/64 1998 John Deere #97](https://www.mercadolibre.com.ar/chad-little-racing-champions-nascar-164-1998-john-deere-97/up/MLAU3267506995#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=51&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1508081573&sid=search) | $36.488 | -29.8% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 19 | baja | 41 | [Bulldozer Ertl Esc 1.18 John Deere Para Repuesto Ver Fotos](https://www.mercadolibre.com.ar/bulldozer-ertl-esc-118-john-deere-para-repuesto-ver-fotos/up/MLAU182247296#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=56&type=product&tracking_id=ad222ba1-a284-48e8-99e3-4332063da6bb&wid=MLA1391581274&sid=search) | $68.900 | 32.5% | tipo: JUGUETE; compatibilidad/marca: John Deere |
| 20 | baja | 41 | [Casilla De Campo John Deere 1:64 Colección Rural](https://www.mercadolibre.com.ar/casilla-de-campo-john-deere-164-coleccion-rural/up/MLAU3965580036#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=29&type=product&tracking_id=4424dfa6-6a81-4cd3-b6fd-3d69d08dae8d&wid=MLA1784433071&sid=search) | $32.990 | -36.6% | tipo: JUGUETE; compatibilidad/marca: John Deere |

## Observaciones Para Iteración

- Revisar candidatos de baja confianza para detectar falsos positivos y nuevos sinónimos.
- Si aparecen matches por `John Deere` sin tipo de producto coincidente, bajar peso de marca o subir score mínimo.
- Si productos válidos quedan afuera por precio, ajustar banda sólo en UI; para reporte se mantiene ±40%.
- Si muchos nombres técnicos quedan sin comparable, ampliar diccionario de tipos y tokens equivalentes.
