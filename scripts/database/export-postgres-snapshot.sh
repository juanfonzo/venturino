#!/usr/bin/env bash

# Creates a complete logical PostgreSQL snapshot from the production VPS.
# Run this script on the VPS host, where Docker can access venturino-db.

set -Eeuo pipefail
umask 077

SNAPSHOT_FORMAT="venturino-postgres-snapshot/v1"
OUTPUT_DIR="${VENTURINO_SNAPSHOT_OUTPUT_DIR:-/var/backups/venturino}"
POSTGRES_CONTAINER="${VENTURINO_POSTGRES_CONTAINER:-venturino-db}"
POSTGRES_DATABASE="${VENTURINO_POSTGRES_DATABASE:-venturino_db}"
POSTGRES_USER="${VENTURINO_POSTGRES_USER:-postgres}"
UPLOAD_R2=false
R2_PREFIX="${R2_PREFIX:-venturino/postgres-snapshots}"

usage() {
  cat <<'EOF'
Uso:
  scripts/database/export-postgres-snapshot.sh [opciones]

Ejecutar en el HOST del VPS de producción. Por defecto lee PostgreSQL desde el
contenedor Docker venturino-db y exporta la base venturino_db completa.

Opciones:
  --output-dir <ruta>    Directorio protegido de salida. Default: /var/backups/venturino
  --container <nombre>   Contenedor PostgreSQL. Default: venturino-db
  --database <nombre>    Base PostgreSQL. Default: venturino_db
  --postgres-user <usr>  Usuario dentro del contenedor. Default: postgres
  --upload-r2            Sube el snapshot y el manifest a Cloudflare R2.
  --r2-prefix <prefijo>  Prefijo R2. Default: venturino/postgres-snapshots
  --help                 Muestra esta ayuda.

Para --upload-r2 se requieren R2_BUCKET, R2_ENDPOINT_URL y credenciales
R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY (o AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY).
Los secretos nunca se escriben dentro del snapshot ni del manifest.
EOF
}

require_value() {
  local option="$1"
  local value="${2:-}"
  if [[ -z "$value" || "$value" == --* ]]; then
    echo "Falta el valor para $option." >&2
    exit 2
  fi
}

json_escape() {
  local value="$1"
  value="${value//\\/\\\\}"
  value="${value//\"/\\\"}"
  value="${value//$'\n'/\\n}"
  value="${value//$'\r'/\\r}"
  value="${value//$'\t'/\\t}"
  printf '%s' "$value"
}

while (( $# > 0 )); do
  case "$1" in
    --output-dir)
      require_value "$1" "${2:-}"
      OUTPUT_DIR="$2"
      shift 2
      ;;
    --container)
      require_value "$1" "${2:-}"
      POSTGRES_CONTAINER="$2"
      shift 2
      ;;
    --database)
      require_value "$1" "${2:-}"
      POSTGRES_DATABASE="$2"
      shift 2
      ;;
    --postgres-user)
      require_value "$1" "${2:-}"
      POSTGRES_USER="$2"
      shift 2
      ;;
    --upload-r2)
      UPLOAD_R2=true
      shift
      ;;
    --r2-prefix)
      require_value "$1" "${2:-}"
      R2_PREFIX="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Opción desconocida: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

for command in docker sha256sum stat date; do
  command -v "$command" >/dev/null 2>&1 || {
    echo "No se encontró el comando requerido: $command" >&2
    exit 1
  }
done

docker inspect --type container "$POSTGRES_CONTAINER" >/dev/null 2>&1 || {
  echo "No se encontró el contenedor PostgreSQL '$POSTGRES_CONTAINER'." >&2
  exit 1
}

if [[ "$(docker inspect -f '{{.State.Running}}' "$POSTGRES_CONTAINER")" != "true" ]]; then
  echo "El contenedor PostgreSQL '$POSTGRES_CONTAINER' no está en ejecución." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
chmod 700 "$OUTPUT_DIR"

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
snapshot_name="venturino-postgres-${timestamp}"
archive_path="$OUTPUT_DIR/${snapshot_name}.dump"
manifest_path="$OUTPUT_DIR/${snapshot_name}.manifest.json"
temporary_archive="${archive_path}.partial"
temporary_manifest="${manifest_path}.partial"

cleanup() {
  rm -f "$temporary_archive" "$temporary_manifest"
}
trap cleanup EXIT

postgres_scalar() {
  docker exec -i -u "$POSTGRES_USER" "$POSTGRES_CONTAINER" \
    psql --no-psqlrc --tuples-only --no-align --quiet --dbname "$POSTGRES_DATABASE" \
    --command "$1" | tr -d '\r\n'
}

echo "Generando snapshot completo de PostgreSQL desde ${POSTGRES_CONTAINER}/${POSTGRES_DATABASE}..."
docker exec -i -u "$POSTGRES_USER" "$POSTGRES_CONTAINER" \
  pg_dump \
  --format=custom \
  --compress=9 \
  --no-owner \
  --no-privileges \
  --dbname "$POSTGRES_DATABASE" \
  > "$temporary_archive"

[[ -s "$temporary_archive" ]] || {
  echo "pg_dump no generó un archivo válido." >&2
  exit 1
}

mv "$temporary_archive" "$archive_path"
chmod 600 "$archive_path"

archive_sha256="$(sha256sum "$archive_path" | awk '{print $1}')"
archive_bytes="$(stat -c '%s' "$archive_path")"
source_database="$(postgres_scalar 'SELECT current_database()')"
server_version_num="$(postgres_scalar 'SHOW server_version_num')"
user_table_count="$(postgres_scalar "SELECT count(*) FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")"
app_release="${APP_RELEASE:-unknown}"

{
  printf '{\n'
  printf '  "format": "%s",\n' "$SNAPSHOT_FORMAT"
  printf '  "createdAtUtc": "%s",\n' "$timestamp"
  printf '  "archive": {\n'
  printf '    "filename": "%s",\n' "$(json_escape "$(basename "$archive_path")")"
  printf '    "sha256": "%s",\n' "$archive_sha256"
  printf '    "bytes": %s\n' "$archive_bytes"
  printf '  },\n'
  printf '  "source": {\n'
  printf '    "database": "%s",\n' "$(json_escape "$source_database")"
  printf '    "serverVersionNum": "%s",\n' "$(json_escape "$server_version_num")"
  printf '    "userTableCount": %s,\n' "$user_table_count"
  printf '    "appRelease": "%s",\n' "$(json_escape "$app_release")"
  printf '    "exportMode": "docker-container"\n'
  printf '  }\n'
  printf '}\n'
} > "$temporary_manifest"

mv "$temporary_manifest" "$manifest_path"
chmod 600 "$manifest_path"

echo "Snapshot creado: $archive_path"
echo "Manifest creado: $manifest_path"
echo "SHA-256: $archive_sha256"

if [[ "$UPLOAD_R2" == "true" ]]; then
  command -v aws >/dev/null 2>&1 || {
    echo "--upload-r2 requiere AWS CLI instalado en el VPS." >&2
    exit 1
  }

  export AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID:-${AWS_ACCESS_KEY_ID:-}}"
  export AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY:-${AWS_SECRET_ACCESS_KEY:-}}"
  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-auto}"

  : "${R2_BUCKET:?Falta R2_BUCKET para subir a R2.}"
  : "${R2_ENDPOINT_URL:?Falta R2_ENDPOINT_URL para subir a R2.}"
  : "${AWS_ACCESS_KEY_ID:?Falta R2_ACCESS_KEY_ID o AWS_ACCESS_KEY_ID para subir a R2.}"
  : "${AWS_SECRET_ACCESS_KEY:?Falta R2_SECRET_ACCESS_KEY o AWS_SECRET_ACCESS_KEY para subir a R2.}"

  normalized_prefix="${R2_PREFIX#/}"
  normalized_prefix="${normalized_prefix%/}"
  archive_key="${normalized_prefix:+${normalized_prefix}/}$(basename "$archive_path")"
  manifest_key="${normalized_prefix:+${normalized_prefix}/}$(basename "$manifest_path")"

  aws s3 cp "$archive_path" "s3://${R2_BUCKET}/${archive_key}" \
    --endpoint-url "$R2_ENDPOINT_URL" \
    --only-show-errors
  aws s3 cp "$manifest_path" "s3://${R2_BUCKET}/${manifest_key}" \
    --endpoint-url "$R2_ENDPOINT_URL" \
    --only-show-errors

  echo "R2 archive: s3://${R2_BUCKET}/${archive_key}"
  echo "R2 manifest: s3://${R2_BUCKET}/${manifest_key}"
fi

echo "Snapshot finalizado correctamente."
