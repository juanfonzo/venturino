# Sincronización De PostgreSQL Producción → Local

Estado: implementada para ejecución manual controlada.

## Objetivo

Mantener la base PostgreSQL local alineada con producción para analizar el matching, la auditoría de Padawanway y futuras áreas del producto sin abrir acceso de red a la base productiva.

El mecanismo usa un snapshot lógico completo de PostgreSQL. Incluye schemas, tablas, datos, secuencias, constraints e índices de la base de la aplicación. No exporta roles, permisos globales del cluster ni variables de entorno; esas credenciales no son necesarias ni deben copiarse a desarrollo.

## Archivos Del Flujo

| Archivo | Dónde se ejecuta | Responsabilidad |
|---|---|---|
| `scripts/database/export-postgres-snapshot.sh` | Host del VPS de producción | Genera `pg_dump` completo desde el contenedor `venturino-db`, junto con checksum y manifest. Puede subir ambos archivos a R2. |
| `scripts/database/import-postgres-snapshot.js` | Equipo local | Verifica el manifest y reemplaza de forma explícita la base local mediante `dropdb`, `createdb` y `pg_restore`. |

El exportador usa por defecto el mismo contenedor, base y usuario que el backup cron actual: `venturino-db`, `venturino_db` y `postgres`.

## Seguridad Y Límites

- El snapshot contiene datos operativos completos, incluyendo `MarketReferenceQuery` y sus snapshots de respuesta. Tratarlo como confidencial.
- El exportador no recibe ni escribe `DATABASE_URL`, secretos de Padawanway, credenciales SMTP ni variables de entorno dentro de los archivos generados.
- El importador utiliza exclusivamente `LOCAL_SNAPSHOT_DATABASE_URL`; nunca toma `DATABASE_URL` como fallback.
- El importador acepta `localhost`, `127.0.0.1` y `::1` por defecto. Un hostname local Docker sólo se acepta si se declara explícitamente en `LOCAL_SNAPSHOT_ALLOWED_HOSTS`.
- Para alinear por completo la base local, el importador elimina y recrea esa base. Requiere `--confirm REPLACE_LOCAL_DATABASE` y bloquea entornos con `APP_ENV=production` o `NODE_ENV=production`.
- No subir los archivos a un bucket público ni enviarlos por correo/chat. Usar SSH/SFTP o un bucket R2 privado.

## 1. Generar El Snapshot En El VPS

Ejecutar el script en el **host del VPS**, no dentro de `venturino` ni de `venturino-db`. El host necesita Docker y el contenedor PostgreSQL debe estar activo.

Primero copiar el script versionado desde el repositorio al VPS. Este ejemplo usa el home del usuario SSH, por lo que no requiere permisos de escritura sobre `/opt` ni `/var/backups`:

```bash
ssh USUARIO@VPS 'install -d -m 700 "$HOME/venturino-ops" "$HOME/backups/venturino"'
scp scripts/database/export-postgres-snapshot.sh USUARIO@VPS:venturino-ops/
ssh USUARIO@VPS 'chmod 700 "$HOME/venturino-ops/export-postgres-snapshot.sh"'
```

Luego, dentro del VPS:

```bash
~/venturino-ops/export-postgres-snapshot.sh \
  --output-dir ~/backups/venturino
```

La salida informa dos nombres que deben viajar siempre juntos:

```text
venturino-postgres-AAAAMMDDTHHMMSSZ.dump
venturino-postgres-AAAAMMDDTHHMMSSZ.manifest.json
```

El `manifest` contiene formato, fecha UTC, checksum SHA-256, tamaño, versión de PostgreSQL y cantidad esperada de tablas. No contiene datos de conexión.

Si los nombres reales de Docker difieren, declararlos de forma explícita:

```bash
/home/USUARIO/venturino-ops/export-postgres-snapshot.sh \
  --container NOMBRE_POSTGRES \
  --database venturino_db \
  --postgres-user postgres \
  --output-dir /home/USUARIO/backups/venturino
```

## 2A. Descargar Desde El VPS Por SCP

En PowerShell, crear el directorio local ignorado por Git y descargar los dos archivos usando el nombre informado por el exportador:

```powershell
New-Item -ItemType Directory -Force .private/postgres-snapshots

scp "USUARIO@VPS:backups/venturino/venturino-postgres-AAAAMMDDTHHMMSSZ.dump" ".private/postgres-snapshots/"
scp "USUARIO@VPS:backups/venturino/venturino-postgres-AAAAMMDDTHHMMSSZ.manifest.json" ".private/postgres-snapshots/"
```

Verificar en forma independiente el checksum de la salida del VPS antes de importar:

```powershell
Get-FileHash .private/postgres-snapshots/venturino-postgres-AAAAMMDDTHHMMSSZ.dump -Algorithm SHA256
```

El importador repite esa verificación contra el manifest y se detiene si difiere.

## 2B. Subir A Cloudflare R2 Privado

Esta variante se ejecuta también en el host del VPS. Instalar AWS CLI allí y proveer una credencial R2 con permisos mínimos de escritura sobre un bucket privado.

```bash
export R2_BUCKET='NOMBRE_BUCKET_PRIVADO'
export R2_ENDPOINT_URL='https://ACCOUNT_ID.r2.cloudflarestorage.com'
export R2_ACCESS_KEY_ID='...'
export R2_SECRET_ACCESS_KEY='...'

~/venturino-ops/export-postgres-snapshot.sh \
  --output-dir ~/backups/venturino \
  --upload-r2 \
  --r2-prefix 'venturino/postgres-snapshots'
```

El script imprime las dos claves `s3://` resultantes. No se debe habilitar acceso público ni URLs sin vencimiento.

Para descargarlas localmente, usar una credencial R2 de sólo lectura y el mismo endpoint:

```powershell
$env:AWS_ACCESS_KEY_ID = '...'
$env:AWS_SECRET_ACCESS_KEY = '...'
$env:AWS_DEFAULT_REGION = 'auto'
$r2Endpoint = 'https://ACCOUNT_ID.r2.cloudflarestorage.com'

aws s3 cp "s3://NOMBRE_BUCKET_PRIVADO/venturino/postgres-snapshots/venturino-postgres-AAAAMMDDTHHMMSSZ.dump" ".private/postgres-snapshots/" --endpoint-url $r2Endpoint
aws s3 cp "s3://NOMBRE_BUCKET_PRIVADO/venturino/postgres-snapshots/venturino-postgres-AAAAMMDDTHHMMSSZ.manifest.json" ".private/postgres-snapshots/" --endpoint-url $r2Endpoint
```

## 3. Restaurar En La Base Local

Detener el servidor local y cualquier cliente conectado a la base. En `.env.local` —o `.env` si no existe el primero— configurar una URL separada de uso exclusivo para esta operación:

```env
LOCAL_SNAPSHOT_DATABASE_URL=postgresql://USUARIO:CLAVE@localhost:5432/venturino
LOCAL_SNAPSHOT_ALLOWED_HOSTS=localhost,127.0.0.1,::1
LOCAL_SNAPSHOT_MAINTENANCE_DATABASE=postgres
```

No usar una URL de producción en esa variable. Si PostgreSQL vive en Docker, declarar su hostname local de forma explícita, por ejemplo `LOCAL_SNAPSHOT_ALLOWED_HOSTS=localhost,postgres`.

Se requiere tener instaladas las herramientas cliente de PostgreSQL: `dropdb`, `createdb`, `pg_restore` y `psql`. La versión de `pg_restore` debe ser igual o más nueva que la versión de producción indicada en el manifest.

Primero validar sin cambiar datos:

```powershell
npm run db:snapshot:import -- --snapshot .private/postgres-snapshots/venturino-postgres-AAAAMMDDTHHMMSSZ.dump --dry-run
```

Luego restaurar de forma explícita:

```powershell
npm run db:snapshot:import -- --snapshot .private/postgres-snapshots/venturino-postgres-AAAAMMDDTHHMMSSZ.dump --confirm REPLACE_LOCAL_DATABASE
```

El importador elimina, crea nuevamente y restaura la base indicada en `LOCAL_SNAPSHOT_DATABASE_URL`. Si falla después de la eliminación, conservar el snapshot y volver a ejecutar el mismo comando una vez resuelto el error local; producción no se modifica en ningún momento.

## 4. Verificación Posterior

Una importación correcta verifica checksum, base de destino y cantidad de tablas. Después de restaurar, ejecutar:

```powershell
npx prisma generate
npx prisma validate
npm run test:market-reference
npm run test:superadmin
```

Para revisar la frescura que motivó este flujo, verificar `Listing.lastSeenAt`, la última `ScrapingRun` y el volumen de `MarketReferenceQuery` contra la fecha del manifest.

## Operación Recurrente

- Generar un snapshot nuevo antes de iniciar un análisis que dependa de datos recientes.
- Importar siempre archive y manifest de la misma corrida.
- Conservar los snapshots sólo el tiempo necesario y eliminar las copias locales/R2 según la política acordada.
- El cron de backup actual no se modifica con este cambio: este mecanismo es manual, verificable y pensado para sincronizar desarrollo.

## Impacto MCP/IA

Estado: `no-aplica`.

Es una operación manual de infraestructura para desarrollo; no agrega una capacidad de negocio que un agente del sistema deba ejecutar. El snapshot conserva datos para análisis local, pero no debe exponerse como herramienta MCP ni a canales externos.
