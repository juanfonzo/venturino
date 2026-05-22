# Pipeline: Flujo de datos MongoDB → PostgreSQL

## Arquitectura

```
Crawlers (mensuales) → MongoDB Atlas → pipeline-live.js → PostgreSQL → Next.js App
```

## Scripts disponibles

### 1. `pipeline.js` — Carga inicial (desde JSON)
Para la primera carga o reset completo. Lee `data/mongo_export.json` y hace **delete + insert**.

```bash
# Exportar desde MongoDB a JSON
node scripts/explore_mongo.js

# Carga inicial (borra todo y reinserta)
node scripts/pipeline.js

# Solo ver stats sin escribir
node scripts/pipeline.js --dry-run
```

### 2. `pipeline-live.js` — Actualización mensual (desde MongoDB directo)
Para ejecuciones mensuales post-crawling. Conecta directo a MongoDB, hace **upsert** y registra historial de precios.

```bash
# Auto-detecta la fecha más reciente por origen
node scripts/pipeline-live.js

# Solo ver stats sin escribir
node scripts/pipeline-live.js --dry-run

# Forzar desde una fecha específica
node scripts/pipeline-live.js --since 2026-03-01
```

**Qué hace:**
1. Conecta a MongoDB Atlas
2. Detecta la `fecha_scraping` más reciente **por origen** parseando `DD-MM-YYYY` como fecha real (cada crawler puede tener fecha distinta)
3. Filtra a las 4 categorías core (Tractores, Cosechadoras, Sembradoras, Pulverizadoras)
4. Normaliza todos los campos (misma lógica que pipeline.js)
5. **Upsert por URL**: si la publicación (misma URL) ya existe, actualiza; si es nueva, inserta
6. **Snapshot de precios**: registra un snapshot por URL y `fecha_scraping` real. Si ese snapshot ya existe, lo actualiza en vez de duplicarlo
7. **Marca inactivas**: publicaciones que no aparecen en esta ejecución se marcan `active=false`

### 3. `backfill-price-history.js` — Backfill histórico desde MongoDB
Reconstruye el historial de precios usando todas las fechas `fecha_scraping` disponibles en MongoDB. Las publicaciones antiguas se conservan como inactivas para que alimenten la evolución de mercado sin aparecer en el listado de publicaciones activas.

```bash
# Ver qué va a procesar sin escribir
node scripts/backfill-price-history.js --dry-run

# Completar historial sin borrar snapshots existentes
node scripts/backfill-price-history.js

# Rehacer price_history desde MongoDB y eliminar snapshots previos incorrectos
node scripts/backfill-price-history.js --replace-history
```

## Ejecución en producción (Docker)

La app corre con Dockerfile (no Docker Compose). Reemplazar `<container>` con el nombre o ID del contenedor.

### Opción A: Script wrapper
```bash
docker exec -it <container> sh scripts/run-pipeline.sh
```

### Opción B: Comando directo
```bash
docker exec -it <container> node scripts/pipeline-live.js
```

### Opción C: Dry run primero
```bash
docker exec -it <container> node scripts/pipeline-live.js --dry-run
docker exec -it <container> node scripts/pipeline-live.js
```

## Flujo mensual completo

1. **Ejecutar crawlers** (externos, escriben a MongoDB Atlas)
2. **Verificar datos** en MongoDB (opcional):
   ```bash
   docker exec -it <container> node scripts/pipeline-live.js --dry-run
   ```
3. **Ejecutar pipeline**:
   ```bash
   docker exec -it <container> sh scripts/run-pipeline.sh
   ```
4. **Verificar** en la app web que los datos se actualizaron

## Variables de entorno requeridas

```env
MONGODB_URI=mongodb+srv://...    # MongoDB Atlas connection string
DATABASE_URL=postgresql://...     # PostgreSQL connection string
```

## Modelo de datos para trazabilidad

### Tabla `listings`
- `active` (bool): `true` si la publicación fue vista en el último scraping
- `first_seen_at` (datetime): primera vez que se vio esta publicación
- `last_seen_at` (datetime): última vez que se vio esta publicación
- `scraping_run_id` (int): referencia al run que la actualizó por última vez

### Tabla `price_history`
- `listing_id` (int): referencia a la publicación
- `precio_usd` (decimal): precio en USD al momento del snapshot
- `moneda_norm` (string): moneda normalizada
- `precio_raw` (string): precio original sin normalizar
- `snapshot_date` (date): fecha del snapshot
- `scraping_run_id` (int): referencia al run que generó el snapshot

### Tabla `scraping_runs`
- `run_date` (date): fecha de ejecución
- `source_count` (int): documentos totales en MongoDB
- `filtered_count` (int): documentos después de filtrar categorías
- `processed_count` (int): documentos procesados
- `new_count` (int): publicaciones nuevas insertadas
- `updated_count` (int): publicaciones actualizadas
- `deactivated_count` (int): publicaciones marcadas como inactivas

## Clave de identificación

Cada publicación se identifica de forma única por su **URL**. El campo `url` tiene un índice `UNIQUE` en PostgreSQL. No se usa el `_id` de MongoDB — Mongo gestiona sus propios IDs internamente.

## Publicaciones inactivas

Cuando una publicación deja de aparecer en el scraping (fue vendida, eliminada, etc.), se marca como `active=false`. La app solo muestra publicaciones activas. El historial de precios se mantiene.
