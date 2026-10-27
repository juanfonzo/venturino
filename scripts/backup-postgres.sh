#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

backup_dir="$HOME/backups/venturino"
mkdir -p "$backup_dir"
if [ "${1:-}" != "--locked" ]; then
  exec flock --nonblock --conflict-exit-code 75 "$backup_dir/backup.lock" \
    timeout --signal=TERM --kill-after=30s 25m "$0" --locked
fi

# Dedicated private backup credentials, provisioned on the host as for GeSuite.
# Never use the application's media bucket or embed credentials in this script.
config="$HOME/.config/rclone/gesuite-recovery.conf"
remote="gesuite-r2:backup-gesuite/venturino/postgres"
if ! test -r "$config"; then
  printf 'Backup: falta configuracion R2 legible: %s (usuario=%s)\n' "$config" "$(id -un)" >&2
  exit 1
fi
# Re-check the live application target on every run without printing credentials.
docker exec venturino node -e '
  const u = new URL(process.env.DATABASE_URL);
  if (u.hostname !== "venturino-db" || (u.port && u.port !== "5432") || u.pathname !== "/venturino_db") {
    console.error("El destino de DATABASE_URL difiere del backup venturino-db/venturino_db");
    process.exit(1);
  }
'
available_kb=$(df -Pk "$backup_dir" | awk 'NR==2 {print $4}')
[ "$available_kb" -ge 2097152 ] || { echo "Backup: se requieren 2 GiB libres" >&2; exit 1; }

work=$(mktemp -d "$backup_dir/working.XXXXXXXX")
cleanup() {
  local status=$?
  rm -f -- "$work/backup.dump" "$work/backup.dump.gz" "$work/last-success.json"
  rmdir -- "$work"
  if [ "$status" -ne 0 ]; then
    printf '%s Backup FALLIDO (codigo %s)\n' "$(date -u +%FT%TZ)" "$status" >&2
  fi
  return "$status"
}
trap cleanup EXIT

stamp=$(date -u +%Y-%m-%d_%H-%M-%S)
filename="venturino_db_${stamp}_${work##*.}.dump.gz"
target="$backup_dir/$filename"
object="$remote/$filename"
printf '%s Iniciando backup PostgreSQL venturino\n' "$(date -u +%FT%TZ)"

# The timeout runs inside the DB container too, so a lost Docker client cannot
# leave an unbounded pg_dump running. No application restart or schema changes.
docker exec -u postgres venturino-db timeout --signal=TERM --kill-after=15s 15m \
  pg_dump -Fc --no-owner --no-acl --lock-wait-timeout=20s -d venturino_db > "$work/backup.dump"
test -s "$work/backup.dump"
docker exec -i venturino-db pg_restore --list < "$work/backup.dump" > /dev/null
gzip -c "$work/backup.dump" > "$work/backup.dump.gz"
gzip -t "$work/backup.dump.gz"
mv -- "$work/backup.dump.gz" "$target"
checksum=$(sha256sum "$target" | awk '{print $1}')
printf '%s  %s\n' "$checksum" "$filename" > "$target.sha256"

rclone_options=(--config "$config" --contimeout 10s --timeout 2m --retries 2 --low-level-retries 3 --stats 0)
rclone "${rclone_options[@]}" copyto "$target" "$object" --immutable
download_checksum=$(rclone "${rclone_options[@]}" cat "$object" | sha256sum | awk '{print $1}')
if [ "$download_checksum" != "$checksum" ]; then
  echo "Backup: SHA-256 de descarga R2 no coincide" >&2
  exit 1
fi
rclone "${rclone_options[@]}" copyto "$target.sha256" "$object.sha256" --immutable

# Only a verified remote backup advances this status file. Keep local copies
# and remote history; retention/deletion must be configured separately.
printf '{"completed_at_utc":"%s","object":"%s","bytes":%s,"sha256":"%s"}\n' \
  "$(date -u +%FT%TZ)" "$object" "$(stat -c %s "$target")" "$checksum" > "$work/last-success.json"
mv -- "$work/last-success.json" "$backup_dir/last-success.json"
printf '%s Backup VERIFICADO: %s bytes=%s sha256=%s\n' \
  "$(date -u +%FT%TZ)" "$object" "$(stat -c %s "$target")" "$checksum"
