#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

case "${1:-}" in
  ''|--check|--check-host) ;;
  *) echo 'Uso: install-remote-postgres-backup.sh [--check|--check-host]' >&2; exit 1 ;;
esac
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)

# Backups belong to algorym, independently of SERVER_USER used for deployment.
# Reuse the existing SSH alias and optionally an explicit private SSH config.
ssh_options=(-o User=algorym)
if [ -n "${VENTURINO_BACKUP_SSH_CONFIG:-}" ]; then
  test -r "$VENTURINO_BACKUP_SSH_CONFIG" || { echo 'Configuracion SSH de backup no legible' >&2; exit 1; }
  ssh_options+=(-F "$VENTURINO_BACKUP_SSH_CONFIG")
fi
remote_dir=$(ssh "${ssh_options[@]}" algorym 'set -eu; test "$(id -un)" = algorym || { echo "El backup requiere el usuario SSH algorym" >&2; exit 1; }; umask 077; mkdir -p "$HOME/.cache"; mktemp -d "$HOME/.cache/venturino-backup-install.XXXXXXXX"')
[[ "$remote_dir" =~ ^/[a-zA-Z0-9_./-]+/venturino-backup-install\.[a-zA-Z0-9]+$ ]] || {
  echo 'Directorio remoto de instalacion invalido' >&2
  exit 1
}
cleanup() {
  ssh "${ssh_options[@]}" algorym "rm -f -- '$remote_dir/backup-postgres.sh' '$remote_dir/install-postgres-backup.sh'; rmdir -- '$remote_dir'"
}
trap cleanup EXIT
scp "${ssh_options[@]}" "$script_dir/backup-postgres.sh" "$script_dir/install-postgres-backup.sh" "algorym:$remote_dir/"
ssh "${ssh_options[@]}" algorym "bash '$remote_dir/install-postgres-backup.sh' '${1:-}'"
