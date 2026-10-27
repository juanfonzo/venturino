#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

fail() {
  printf 'Backup: %s (usuario=%s, HOME=%s)\n' "$1" "$(id -un)" "$HOME" >&2
  exit 1
}
# Report the failing line and status without logging commands or secret values.
trap 'status=$?; printf "Backup: instalacion fallida en linea %s, codigo %s (usuario=%s, HOME=%s)\n" "$LINENO" "$status" "$(id -un)" "$HOME" >&2; exit "$status"' ERR
printf 'Configurando backup PostgreSQL (usuario=%s, HOME=%s)\n' "$(id -un)" "$HOME"
case "${1:-}" in
  ''|--check|--check-host) ;;
  *) fail "Uso: install-postgres-backup.sh [--check|--check-host]" ;;
esac

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
source_script="$script_dir/backup-postgres.sh"
backup_dir="$HOME/backups/venturino"
installed_script="$HOME/.local/bin/venturino-backup"

for tool in bash docker crontab flock timeout rclone gzip sha256sum timedatectl systemctl; do
  command -v "$tool" > /dev/null || fail "Falta dependencia requerida: $tool"
done
case "$(timedatectl show --property=Timezone --value)" in
  UTC|Etc/UTC) ;;
  *) echo "El cron de backups requiere un host UTC" >&2; exit 1 ;;
esac
systemctl is-active --quiet cron || fail "El servicio cron no esta activo"
config="$HOME/.config/rclone/gesuite-recovery.conf"
test -r "$config" || fail "Falta configuracion R2 legible: $config. Provisionarla con permisos 600 para este usuario SSH"
rclone --config "$config" listremotes | grep -Fx 'gesuite-r2:' > /dev/null || fail "Falta el remoto gesuite-r2 en $config"
bash -n "$source_script"

if [ "${1:-}" = "--check-host" ]; then
  echo "Prerequisitos del host verificados; no se modifico el crontab."
  exit 0
fi

# Guard against copying the wrong database after a production configuration change.
docker exec "${SERVICE:-venturino}" node -e '
  const u = new URL(process.env.DATABASE_URL);
  if (u.hostname !== "venturino-db" || (u.port && u.port !== "5432") || u.pathname !== "/venturino_db") {
    console.error("El destino de DATABASE_URL difiere del backup venturino-db/venturino_db");
    process.exit(1);
  }
'
docker exec -u postgres venturino-db psql -XAt -d venturino_db -c 'SELECT 1' | grep -Fx 1 > /dev/null
docker exec venturino-db sh -c 'command -v timeout; command -v pg_dump; command -v pg_restore' > /dev/null

if [ "${1:-}" = "--check" ]; then
  echo "Prerequisitos de backup PostgreSQL verificados; no se modifico el crontab."
  exit 0
fi

mkdir -p "$backup_dir" "$HOME/.local/bin"
# Protect the read/modify/write sequence against concurrent installations.
exec 9> "$backup_dir/install.lock"
flock --nonblock --conflict-exit-code 75 9
work=$(mktemp -d "$backup_dir/install.XXXXXXXX")
cleanup() {
  rm -f -- "$work/current" "$work/next" "$work/installed"
  rmdir -- "$work"
}
trap cleanup EXIT

if ! crontab -l > "$work/current" 2> "$work/installed"; then
  if ! grep -qi 'no crontab for' "$work/installed"; then
    cat "$work/installed" >&2
    exit 1
  fi
fi
if grep -Eq '^[[:space:]]*(CRON_TZ|TZ)[[:space:]]*=' "$work/current"; then
  echo "Revisar TZ/CRON_TZ del crontab antes de instalar horarios UTC" >&2
  exit 1
fi

# Replace both the legacy /tmp-only job and this project's scheduled R2 entries.
# Preserve every other task, including venturino-managed-fx-sync.
awk '!/# venturino-managed-db-backup(-|[[:space:]]|$)/' "$work/current" > "$work/next"
cat >> "$work/next" <<'CRON'
10 6 * * * "$HOME/.local/bin/venturino-backup" >> "$HOME/backups/venturino/backup.log" 2>&1 # venturino-managed-db-backup-0310-art
10 18 * * * "$HOME/.local/bin/venturino-backup" >> "$HOME/backups/venturino/backup.log" 2>&1 # venturino-managed-db-backup-1510-art
CRON

# Save the previous cron for recovery; no credentials are stored in these files.
cp -- "$work/current" "$backup_dir/crontab-before-install.txt"
install -m 700 "$source_script" "$installed_script"
touch "$backup_dir/backup.log"
chmod 600 "$backup_dir/backup.log"
crontab "$work/next"
crontab -l > "$work/installed"
cmp "$work/next" "$work/installed"
echo "Backups instalados: 03:10 y 15:10 Argentina (06:10 y 18:10 UTC), todos los dias."
