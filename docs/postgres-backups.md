# Backups PostgreSQL en Cloudflare R2

La base completa `venturino_db` del contenedor `venturino-db` se respalda todos los
días a las **03:10 y 15:10 Argentina**. El VPS usa UTC, por lo que las entradas cron
son `10 6 * * *` y `10 18 * * *`.

Destino: `gesuite-r2:backup-gesuite/venturino/postgres/`. Cada ejecución genera
`venturino_db_<fecha-UTC>_<identificador>.dump.gz` y su `.sha256`.
Se usa `pg_dump -Fc --no-owner --no-acl` y gzip, sin clave adicional de recuperación.
Se incluyen todas las tablas, datos, índices, secuencias y funciones de esa base:
publicaciones, historial de precios, cotizaciones y análisis posventa, entre otras.
MongoDB Atlas, los CSV originales y roles/contraseñas globales de PostgreSQL no están
incluidos en este respaldo de PostgreSQL.

## Usuario e instalación

El backup se instala y ejecuta como **algorym**, HOME `/home/algorym`. Usa la configuración
privada existente `$HOME/.config/rclone/gesuite-recovery.conf`, modo 600, con remoto
`gesuite-r2:`. No se guardan credenciales en el repositorio o en el contenedor.

El workflow mantiene su despliegue actual por SSH. Después de configurar SSH verifica
los requisitos del host y, tras los pasos de despliegue, instala los backups.
`scripts/install-remote-postgres-backup.sh` usa el alias existente `algorym`, fuerza
`User=algorym` en ssh/scp y comprueba la identidad remota. Transfiere los scripts a una
carpeta privada temporal y la elimina al finalizar. Opcionalmente admite una configuración
SSH explícita mediante `VENTURINO_BACKUP_SSH_CONFIG`.

La instalación reemplaza la tarea antigua `# venturino-managed-db-backup`, que guardaba
una copia diaria solamente en `/tmp`, y las entradas R2 administradas por este proyecto.
Conserva los demás cron, incluida la tarea `# venturino-managed-fx-sync`.
Los archivos de respaldo antiguos no se borran.

Desde una copia de los scripts en el VPS, como algorym:

```bash
bash scripts/install-postgres-backup.sh --check-host
bash scripts/install-postgres-backup.sh --check
bash scripts/install-postgres-backup.sh
```

`--check-host` no necesita la aplicación desplegada; `--check` comprueba también que
`venturino` apunte a `venturino-db:5432/venturino_db` y que PostgreSQL responda. Ninguno
modifica el crontab. Se requiere Bash, Docker accesible, cron activo, host UTC, flock,
timeout, rclone, gzip y sha256sum. No se reinicia la aplicación ni se aplican cambios de BD.

## Operación y retención

- Script instalado: `$HOME/.local/bin/venturino-backup`, modo 700.
- Copias y registro: `$HOME/backups/venturino/`, con umask 077.
- Estado del último éxito: `$HOME/backups/venturino/last-success.json`.
- Registro: `$HOME/backups/venturino/backup.log`, modo 600.

La ejecución vuelve a verificar la base configurada en la aplicación. Requiere 2 GiB
libres, impide ejecuciones simultáneas con flock (salida 75) y limita el proceso a
25 minutos, con timeout interno de pg_dump de 15 minutos y espera de locks de 20 segundos.
Valida el catálogo del dump y gzip, sube sin sobrescribir objetos y compara el SHA-256
de la descarga completa desde R2 antes de registrar éxito. Un fallo devuelve código no
cero y conserva el estado del último respaldo verificado.

```bash
crontab -l | grep venturino-managed-db-backup
cat "$HOME/backups/venturino/last-success.json"
tail -n 30 "$HOME/backups/venturino/backup.log"
"$HOME/.local/bin/venturino-backup"  # ejecución manual como algorym
```

El script conserva las copias locales y remotas; no agrega borrados automáticos.
La retención en R2 se configura por separado mediante una regla de ciclo de vida del
bucket con prefijo `venturino/postgres/`. No modificar una regla global para cambiar
solo la retención de Venturino. Revisar periódicamente el espacio local disponible.
Cron registra errores, pero no se han configurado alertas externas.

## Recuperación y pruebas

Descargar el `.dump.gz` y su `.sha256` a un directorio privado. Desde ese directorio,
validar con `sha256sum -c <archivo>.sha256` y `gzip -t <archivo>.dump.gz`.
Descomprimir con `gzip -dc <archivo>.dump.gz > backup.dump` y revisar su catálogo
con `pg_restore --list backup.dump` de PostgreSQL 15 o una versión compatible.

Restaurar primero en un PostgreSQL aislado, sin red productiva ni puertos publicados,
mediante `pg_restore --exit-on-error --no-owner --no-acl -d <base-vacía>`.
Comprobar esquema, constraints y datos antes de planificar una recuperación productiva.
Los usuarios, contraseñas y permisos de destino se provisionan por separado.
No restaurar sobre la base productiva para ensayar el procedimiento.

```bash
python3 scripts/tests/backup-postgres.test.py  # Linux, HOME y comandos simulados
```

Las pruebas cubren fallos de dump, subida, descarga y checksum; concurrencia; conservación
del último éxito; requisitos de host; cron idempotente; sustitución del backup local;
preservación del cron de cotizaciones; identidad SSH de algorym y limpieza temporal.

## Evidencia — 27 de octubre de 2026

- Host UTC, cron activo y backup instalado como `algorym`, HOME `/home/algorym`.
- Dos instalaciones consecutivas dejaron solo las dos entradas R2; se retiró la tarea
  antigua de `/tmp` y se compararon sin cambios todas las demás líneas del crontab.
  La copia previa al cambio se conserva en
  `$HOME/backups/venturino/crontab-before-r2-20261027.txt`, modo 600.
- Primera copia manual verificada a las **17:00:59 Argentina** (`20:00:59Z`):
  `venturino_db_2026-10-27_20-00-48_zwUmsUkX.dump.gz`, 10.419.208 bytes.
- SHA-256:
  `fd6cbf4ad4b8bb41b3138bfca292aab8ec0dbf806aa7798221ae2036c75d6fce`.
- Se descargaron nuevamente el respaldo y su `.sha256` desde R2; checksum y gzip
  válidos. Restauración completa con PostgreSQL 15.14 en un contenedor temporal
  `network=none`, sin puertos ni volúmenes productivos: 11 tablas, 20.987 publicaciones,
  67.191 registros de historial de precios, una cotización y 13.356 productos posventa.
  El contenedor y las descargas del ensayo se eliminaron al terminar.
- La aplicación vigente respondió HTTP 307 en `/`, sin error 5xx. No se desplegó código
  ni se ejecutaron cambios de esquema para instalar el backup.
- Las 16 pruebas de scripts pasaron en Linux con HOME y comandos simulados.
  YAML y sintaxis Bash del workflow y los scripts también se validaron.

El primer respaldo fue manual; las siguientes ejecuciones dependen de los horarios
programados y deben reflejarse en `backup.log` y `last-success.json`.
Los cambios en `main` quedan pendientes de commit/push para que el workflow los reinstale.
