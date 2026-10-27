"""Run on Linux: python3 scripts/tests/backup-postgres.test.py.

Uses isolated HOME and command doubles; never touches production Docker, R2 or cron.
The fixed production PATH is removed only from temporary script copies so doubles
can replace external commands. flock, timeout, gzip and sha256sum remain real.
"""
import fcntl
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPTS = Path(__file__).resolve().parents[1]
MOCK = r'''#!/usr/bin/env python3
import os, pathlib, shutil, subprocess, sys
name = pathlib.Path(sys.argv[0]).name
args = sys.argv[1:]
root = pathlib.Path(os.environ['TEST_ROOT'])
mode = os.environ.get('TEST_MODE', '')
with (root / 'calls').open('a') as f:
    f.write(name + ' ' + ' '.join(args) + '\n')
if name == 'docker':
    if 'pg_dump' in args:
        sys.stdout.buffer.write(b'PGDMP test archive\n')
        sys.exit(1 if mode == 'dump-failure' else 0)
    if 'pg_restore' in args:
        data = sys.stdin.buffer.read()
        sys.exit(1 if mode == 'invalid-dump' or not data else 0)
    if 'node' in args:
        sys.exit(1 if mode == 'wrong-database' else 0)
    if 'psql' in args:
        print('1')
elif name == 'rclone':
    if 'listremotes' in args:
        print('other-remote:' if mode == 'missing-remote' else 'gesuite-r2:')
    elif 'copyto' in args:
        if mode == 'upload-failure':
            sys.exit(1)
        i = args.index('copyto')
        dest = root / 'remote' / args[i+2].split(':', 1)[1]
        dest.parent.mkdir(parents=True, exist_ok=True)
        if '--immutable' not in args:
            sys.exit(2)
        shutil.copyfile(args[i+1], dest)
    elif 'cat' in args:
        if mode == 'download-failure':
            sys.exit(1)
        if mode == 'wrong-checksum':
            sys.stdout.buffer.write(b'corrupted')
        else:
            sys.stdout.buffer.write((root / 'remote' / args[args.index('cat')+1].split(':', 1)[1]).read_bytes())
elif name == 'timedatectl':
    print('America/Argentina/Buenos_Aires' if mode == 'wrong-timezone' else 'Etc/UTC')
elif name == 'systemctl':
    sys.exit(1 if mode == 'cron-inactive' else 0)
elif name == 'crontab':
    cron = root / 'crontab'
    if args == ['-l']:
        if mode == 'cron-read-failure':
            print('permission denied', file=sys.stderr)
            sys.exit(1)
        if not cron.exists():
            print('no crontab for test', file=sys.stderr)
            sys.exit(1)
        sys.stdout.write(cron.read_text())
    else:
        shutil.copyfile(args[0], cron)
elif name == 'ssh':
    assert args[:2] == ['-o', 'User=algorym']
    args = args[2:]
    if args[:1] == ['-F']:
        assert pathlib.Path(args[1]).read_text() == 'Host algorym\n  User algorym\n'
        args = args[2:]
    assert args[0] == 'algorym'
    sys.exit(subprocess.run(['bash', '-c', args[1]], env=os.environ).returncode)
elif name == 'scp':
    assert args[:2] == ['-o', 'User=algorym']
    args = args[2:]
    if args[:1] == ['-F']:
        assert pathlib.Path(args[1]).read_text() == 'Host algorym\n  User algorym\n'
        args = args[2:]
    if mode == 'scp-failure':
        sys.exit(1)
    host, destination = args[-1].split(':', 1)
    assert host == 'algorym'
    assert pathlib.Path(destination).resolve().is_relative_to(root / 'home')
    for source in args[:-1]:
        shutil.copyfile(source, pathlib.Path(destination) / pathlib.Path(source).name)
elif name == 'id':
    print('github-runner' if mode == 'wrong-ssh-user' else 'algorym')
'''


class BackupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='venturino-backup-test-')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.bin = self.root / 'bin'
        self.bin.mkdir()
        self.home = self.root / 'home'
        self.home.mkdir()
        self.scripts = self.root / 'scripts'
        self.scripts.mkdir()
        self.backups = self.home / 'backups/venturino'
        config = self.home / '.config/rclone/gesuite-recovery.conf'
        config.parent.mkdir(parents=True)
        config.write_text('[gesuite-r2]\n')
        for name in ('docker', 'rclone', 'timedatectl', 'systemctl', 'crontab', 'ssh', 'scp', 'id'):
            path = self.bin / name
            path.write_text(MOCK)
            path.chmod(0o700)
        for name in ('backup-postgres.sh', 'install-postgres-backup.sh', 'install-remote-postgres-backup.sh'):
            original = (SCRIPTS / name).read_text()
            subprocess.run(['bash', '-n', str(SCRIPTS / name)], check=True)
            path = self.scripts / name
            path.write_text('\n'.join(line for line in original.splitlines() if not line.startswith('export PATH=')) + '\n')
            path.chmod(0o700)
        self.env = dict(os.environ, HOME=str(self.home), TEST_ROOT=str(self.root),
                        PATH=f'{self.bin}:/usr/local/bin:/usr/bin:/bin', LC_ALL='C')
        self.old_cron = (
            '15 6 * * * gesuite-backup # other-project\n'
            '10 6 * * * lobruno-backup # lobruno-sistema-managed-db-backup-0310-art\n'
            '0 11 * * * docker exec venturino npm run fx:sync # venturino-managed-fx-sync\n'
            '30 3 * * * legacy-local-dump # venturino-managed-db-backup\n'
        )
        (self.root / 'crontab').write_text(self.old_cron)

    def run_script(self, name='backup-postgres.sh', mode='', args=()):
        return subprocess.run([str(self.scripts / name), *args], env=dict(self.env, TEST_MODE=mode),
                              capture_output=True, text=True, timeout=10)

    def test_preflight_checks_actual_environment_without_installing(self):
        result = self.run_script('install-postgres-backup.sh', args=('--check',))
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)
        self.assertFalse(self.backups.exists())
        self.assertFalse((self.home / '.local/bin/venturino-backup').exists())

    def test_unknown_installer_argument_is_rejected(self):
        result = self.run_script('install-postgres-backup.sh', args=('--unknown',))
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Uso:', result.stderr)
        self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)

    def test_host_preflight_needs_no_application_or_database(self):
        result = self.run_script('install-postgres-backup.sh', mode='wrong-database', args=('--check-host',))
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertNotIn('docker ', (self.root / 'calls').read_text())
        self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)

    def test_backup_upload_download_checksum_and_status(self):
        result = self.run_script()
        self.assertEqual(result.returncode, 0, result.stderr)
        status = json.loads((self.backups / 'last-success.json').read_text())
        self.assertIn('backup-gesuite/venturino/postgres/venturino_db_', status['object'])
        self.assertEqual(len(status['sha256']), 64)
        remote = self.root / 'remote' / status['object'].split(':', 1)[1]
        self.assertEqual(remote.read_bytes(), (self.backups / remote.name).read_bytes())
        self.assertTrue(remote.with_name(remote.name + '.sha256').exists())
        self.assertEqual((self.backups / 'last-success.json').stat().st_mode & 0o777, 0o600)
        self.assertEqual(list(self.backups.glob('working.*')), [])
        calls = (self.root / 'calls').read_text()
        self.assertIn('timeout --signal=TERM --kill-after=15s 15m pg_dump', calls)
        self.assertIn('--lock-wait-timeout=20s -d venturino_db', calls)

    def test_failures_never_mark_success(self):
        for mode in ('dump-failure', 'invalid-dump', 'upload-failure', 'download-failure', 'wrong-checksum', 'wrong-database'):
            with self.subTest(mode=mode):
                result = self.run_script(mode=mode)
                self.assertNotEqual(result.returncode, 0)
                self.assertFalse((self.backups / 'last-success.json').exists())
                self.assertEqual(list(self.backups.glob('working.*')), [])

    def test_failed_run_preserves_last_verified_status(self):
        self.assertEqual(self.run_script().returncode, 0)
        status = (self.backups / 'last-success.json').read_bytes()
        self.assertNotEqual(self.run_script(mode='wrong-checksum').returncode, 0)
        self.assertEqual((self.backups / 'last-success.json').read_bytes(), status)

    def test_lock_prevents_overlapping_backup(self):
        self.backups.mkdir(parents=True)
        with (self.backups / 'backup.lock').open('w') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            self.assertEqual(self.run_script().returncode, 75)
        self.assertFalse((self.root / 'calls').exists())

    def test_install_preserves_other_cron_and_is_idempotent(self):
        for _ in range(2):
            result = self.run_script('install-postgres-backup.sh')
            self.assertEqual(result.returncode, 0, result.stderr)
        cron = (self.root / 'crontab').read_text()
        self.assertTrue(cron.startswith(self.old_cron.replace('30 3 * * * legacy-local-dump # venturino-managed-db-backup\n', '')))
        self.assertEqual(cron.count('venturino-managed-db-backup-'), 2)
        self.assertNotIn('legacy-local-dump', cron)
        self.assertIn('# venturino-managed-fx-sync', cron)
        self.assertIn('10 6 * * * "$HOME/.local/bin/venturino-backup"', cron)
        self.assertIn('10 18 * * * "$HOME/.local/bin/venturino-backup"', cron)
        self.assertEqual((self.home / '.local/bin/venturino-backup').stat().st_mode & 0o777, 0o700)

    def test_install_rejects_unsafe_prerequisites_without_changing_cron(self):
        for mode in ('wrong-timezone', 'cron-inactive', 'wrong-database', 'cron-read-failure', 'missing-remote'):
            with self.subTest(mode=mode):
                result = self.run_script('install-postgres-backup.sh', mode)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)

    def test_missing_config_reports_actual_home_without_changing_cron(self):
        (self.home / '.config/rclone/gesuite-recovery.conf').unlink()
        for script in ('install-postgres-backup.sh', 'backup-postgres.sh'):
            with self.subTest(script=script):
                result = self.run_script(script)
                self.assertNotEqual(result.returncode, 0)
                self.assertIn('configuracion R2 legible:', result.stderr)
                self.assertIn(str(self.home), result.stderr)
                self.assertIn('usuario=', result.stderr)
                self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)
        self.assertFalse((self.backups / 'last-success.json').exists())

    def test_install_rejects_timezone_overrides(self):
        for setting in ('TZ=UTC', 'CRON_TZ=America/Argentina/Buenos_Aires'):
            cron = setting + '\n' + self.old_cron
            (self.root / 'crontab').write_text(cron)
            self.assertNotEqual(self.run_script('install-postgres-backup.sh').returncode, 0)
            self.assertEqual((self.root / 'crontab').read_text(), cron)

    def test_install_handles_missing_crontab(self):
        (self.root / 'crontab').unlink()
        result = self.run_script('install-postgres-backup.sh')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual((self.root / 'crontab').read_text().count('managed-db-backup-'), 2)

    def test_remote_install_stages_in_ssh_home_and_cleans_up(self):
        result = self.run_script('install-remote-postgres-backup.sh')
        self.assertEqual(result.returncode, 0, result.stderr)
        cron = (self.root / 'crontab').read_text()
        self.assertTrue(cron.startswith(self.old_cron.replace('30 3 * * * legacy-local-dump # venturino-managed-db-backup\n', '')))
        self.assertEqual(cron.count('venturino-managed-db-backup-'), 2)
        self.assertEqual(list((self.home / '.cache').iterdir()), [])

    def test_remote_preflight_and_copy_failure_do_not_change_cron(self):
        for mode in ('wrong-database', 'scp-failure'):
            with self.subTest(mode=mode):
                result = self.run_script('install-remote-postgres-backup.sh', mode=mode, args=('--check-host',))
                self.assertEqual(result.returncode == 0, mode != 'scp-failure', result.stderr)
                self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)
                self.assertEqual(list((self.home / '.cache').iterdir()), [])

    def test_remote_uses_explicit_private_config_for_every_ssh_and_scp_call(self):
        config = self.root / 'private ssh config'
        config.write_text('Host algorym\n  User algorym\n')
        self.env['VENTURINO_BACKUP_SSH_CONFIG'] = str(config)
        result = self.run_script('install-remote-postgres-backup.sh', args=('--check',))
        self.assertEqual(result.returncode, 0, result.stderr)
        calls = (self.root / 'calls').read_text().splitlines()
        ssh_calls = [line for line in calls if line.startswith(('ssh ', 'scp '))]
        self.assertEqual(len(ssh_calls), 4)
        self.assertTrue(all(line.startswith(('ssh -o User=algorym -F ', 'scp -o User=algorym -F ')) for line in ssh_calls))
        self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)
        self.assertEqual(list((self.home / '.cache').iterdir()), [])

    def test_remote_rejects_missing_config_or_wrong_ssh_user(self):
        result = self.run_script('install-remote-postgres-backup.sh', mode='wrong-ssh-user')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('requiere el usuario SSH algorym', result.stderr)
        self.env['VENTURINO_BACKUP_SSH_CONFIG'] = str(self.root / 'missing')
        result = self.run_script('install-remote-postgres-backup.sh')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('SSH de backup no legible', result.stderr)
        self.assertEqual((self.root / 'crontab').read_text(), self.old_cron)


if __name__ == '__main__':
    unittest.main(verbosity=2)
