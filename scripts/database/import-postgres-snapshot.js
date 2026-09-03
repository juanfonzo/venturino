#!/usr/bin/env node

/**
 * Replaces a local PostgreSQL database with a complete trusted snapshot.
 * The script deliberately refuses remote targets and never falls back to
 * DATABASE_URL, preventing an accidental restore over production.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

try {
  require("dotenv").config({ path: path.resolve(".env"), quiet: true });
  require("dotenv").config({ path: path.resolve(".env.local"), quiet: true, override: true });
} catch {
  // dotenv is already part of this repository. Keep the script usable if it is
  // executed with environment variables provided by another mechanism.
}

const SNAPSHOT_FORMAT = "venturino-postgres-snapshot/v1";
const CONFIRMATION_VALUE = "REPLACE_LOCAL_DATABASE";
const DEFAULT_ALLOWED_HOSTS = ["localhost", "127.0.0.1", "::1"];

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printUsage();
    return;
  }

  const snapshotPath = resolveRequiredFile(options.snapshot, "--snapshot");
  const manifestPath = options.manifest
    ? resolveRequiredFile(options.manifest, "--manifest")
    : resolveRequiredFile(defaultManifestPath(snapshotPath), "manifest derivado");
  const manifest = readManifest(manifestPath);

  validateManifest(manifest, snapshotPath);
  await verifyArchiveIntegrity(snapshotPath, manifest.archive);

  const target = readLocalTarget();
  const destination = formatDestination(target);
  const targetDatabase = databaseNameFromUrl(target);

  if (options.dryRun) {
    console.log("Validación completada. No se modificó PostgreSQL.");
    console.log(`Snapshot: ${snapshotPath}`);
    console.log(`Origen: ${manifest.source.database} (PostgreSQL ${manifest.source.serverVersionNum})`);
    console.log(`Destino local validado: ${destination}`);
    console.log(`La restauración reemplazaría completamente la base local '${targetDatabase}'.`);
    return;
  }

  if (options.confirm !== CONFIRMATION_VALUE) {
    fail(`Para reemplazar una base local se requiere --confirm ${CONFIRMATION_VALUE}.`);
  }

  if (isProductionEnvironment()) {
    fail("La importación está bloqueada porque APP_ENV o NODE_ENV indica producción.");
  }

  assertPostgresClientCommands();
  const connection = postgresConnection(target);
  const maintenanceDatabase = readMaintenanceDatabase();

  console.log(`Reemplazando la base local ${destination}.`);
  console.log("La base local actual será eliminada; el snapshot de producción no se modifica.");

  run("dropdb", ["--if-exists", "--force", "--maintenance-db", maintenanceDatabase, targetDatabase], {
    ...connection,
    PGDATABASE: maintenanceDatabase,
  });
  run("createdb", ["--maintenance-db", maintenanceDatabase, targetDatabase], {
    ...connection,
    PGDATABASE: maintenanceDatabase,
  });
  run("pg_restore", [
    "--no-owner",
    "--no-privileges",
    "--exit-on-error",
    "--single-transaction",
    "--dbname",
    targetDatabase,
    snapshotPath,
  ], {
    ...connection,
    PGDATABASE: targetDatabase,
  });

  verifyRestoredDatabase({ connection, targetDatabase, manifest });
  console.log("Snapshot restaurado y verificado correctamente.");
  console.log(`Base local alineada con snapshot ${manifest.createdAtUtc}.`);
}

function parseArgs(args) {
  const options = { snapshot: null, manifest: null, confirm: null, dryRun: false, help: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (["--snapshot", "--manifest", "--confirm"].includes(arg)) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) fail(`Falta el valor para ${arg}.`);
      options[arg.slice(2)] = value;
      index += 1;
    } else {
      fail(`Opción desconocida: ${arg}`);
    }
  }
  if (!options.help && !options.snapshot) fail("--snapshot es obligatorio.");
  return options;
}

function printUsage() {
  console.log(`Uso:
  node scripts/database/import-postgres-snapshot.js \\
    --snapshot .private/postgres-snapshots/venturino-postgres-AAAAMMDDTHHMMSSZ.dump \\
    [--manifest ...manifest.json] \\
    [--dry-run] \\
    [--confirm ${CONFIRMATION_VALUE}]

Requiere LOCAL_SNAPSHOT_DATABASE_URL en .env.local o .env. El host debe ser
local (localhost, 127.0.0.1 o ::1), salvo que LOCAL_SNAPSHOT_ALLOWED_HOSTS
autorice explícitamente otro hostname local, por ejemplo un servicio Docker.`);
}

function resolveRequiredFile(filePath, label) {
  const resolved = path.resolve(filePath);
  try {
    if (!fs.statSync(resolved).isFile()) fail(`${label} no existe o no es un archivo: ${resolved}`);
  } catch {
    fail(`${label} no existe o no es un archivo: ${resolved}`);
  }
  return resolved;
}

function defaultManifestPath(snapshotPath) {
  return snapshotPath.endsWith(".dump")
    ? snapshotPath.slice(0, -".dump".length) + ".manifest.json"
    : `${snapshotPath}.manifest.json`;
}

function readManifest(manifestPath) {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(`No se pudo leer el manifest: ${error instanceof Error ? error.message : "JSON inválido"}`);
  }
}

function validateManifest(manifest, snapshotPath) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) fail("El manifest no es un objeto JSON válido.");
  if (manifest.format !== SNAPSHOT_FORMAT) fail("El formato del snapshot no es compatible.");
  if (!manifest.archive || typeof manifest.archive !== "object") fail("Falta archive en el manifest.");
  if (!/^[a-f0-9]{64}$/i.test(manifest.archive.sha256 || "")) fail("El checksum SHA-256 del manifest no es válido.");
  if (!Number.isSafeInteger(manifest.archive.bytes) || manifest.archive.bytes <= 0) fail("El tamaño del archive no es válido.");
  if (path.basename(snapshotPath) !== manifest.archive.filename) fail("El archive no coincide con el nombre registrado en el manifest.");
  if (!manifest.source || typeof manifest.source !== "object") fail("Falta source en el manifest.");
  if (!Number.isSafeInteger(manifest.source.userTableCount) || manifest.source.userTableCount < 1) {
    fail("El manifest no contiene un conteo válido de tablas de usuario.");
  }
}

async function verifyArchiveIntegrity(snapshotPath, archive) {
  const size = fs.statSync(snapshotPath).size;
  if (size !== archive.bytes) fail("El tamaño del archive no coincide con el manifest.");
  const checksum = await sha256File(snapshotPath);
  if (checksum.toLowerCase() !== archive.sha256.toLowerCase()) fail("El checksum del archive no coincide con el manifest.");
}

function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

function readLocalTarget() {
  const value = process.env.LOCAL_SNAPSHOT_DATABASE_URL?.trim();
  if (!value) fail("Falta LOCAL_SNAPSHOT_DATABASE_URL. El script no usa DATABASE_URL por seguridad.");

  let target;
  try {
    target = new URL(value);
  } catch {
    fail("LOCAL_SNAPSHOT_DATABASE_URL debe ser una URL PostgreSQL válida.");
  }
  if (!['postgres:', 'postgresql:'].includes(target.protocol)) fail("LOCAL_SNAPSHOT_DATABASE_URL debe usar postgres:// o postgresql://.");

  const hostname = normalizeHostname(target.hostname);
  const allowedHosts = readAllowedHosts();
  if (!allowedHosts.includes(hostname)) {
    fail(`El destino '${hostname}' no está autorizado. Sólo se permite una base local explícitamente configurada.`);
  }
  if (!databaseNameFromUrl(target)) fail("LOCAL_SNAPSHOT_DATABASE_URL debe incluir el nombre de la base local.");
  return target;
}

function readAllowedHosts() {
  const configured = process.env.LOCAL_SNAPSHOT_ALLOWED_HOSTS;
  const values = configured ? configured.split(",") : DEFAULT_ALLOWED_HOSTS;
  return values.map((value) => normalizeHostname(value.trim())).filter(Boolean);
}

function normalizeHostname(value) {
  return value.replace(/^\[/, "").replace(/\]$/, "").toLowerCase();
}

function databaseNameFromUrl(target) {
  const name = decodeURIComponent(target.pathname.replace(/^\/+/, ""));
  return name.split("/")[0] || "";
}

function formatDestination(target) {
  const port = target.port ? `:${target.port}` : "";
  return `${normalizeHostname(target.hostname)}${port}/${databaseNameFromUrl(target)}`;
}

function isProductionEnvironment() {
  return [process.env.APP_ENV, process.env.NODE_ENV]
    .filter(Boolean)
    .some((value) => value.toLowerCase() === "production");
}

function assertPostgresClientCommands() {
  for (const command of ["dropdb", "createdb", "pg_restore", "psql"]) {
    const check = spawnSync(command, ["--version"], { encoding: "utf8", windowsHide: true });
    if (check.error || check.status !== 0) fail(`No se encontró ${command}. Instalá PostgreSQL client tools antes de importar.`);
  }
}

function postgresConnection(target) {
  const connection = {
    PGHOST: normalizeHostname(target.hostname),
    PGPORT: target.port || "5432",
    PGUSER: decodeURIComponent(target.username),
    PGPASSWORD: decodeURIComponent(target.password),
  };
  const sslMode = target.searchParams.get("sslmode");
  if (sslMode) connection.PGSSLMODE = sslMode;
  return connection;
}

function readMaintenanceDatabase() {
  const value = (process.env.LOCAL_SNAPSHOT_MAINTENANCE_DATABASE || "postgres").trim();
  if (!/^[A-Za-z_][A-Za-z0-9_$-]*$/.test(value)) fail("LOCAL_SNAPSHOT_MAINTENANCE_DATABASE no es válido.");
  return value;
}

function run(command, args, connection) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    windowsHide: true,
    env: { ...process.env, ...connection },
  });
  if (result.error) fail(`No se pudo ejecutar ${command}: ${result.error.message}`);
  if (result.status !== 0) fail(`${command} finalizó con código ${result.status}. La base local no debe usarse hasta revisar el error.`);
}

function queryScalar(connection, database, sql) {
  const result = spawnSync("psql", ["--no-psqlrc", "--tuples-only", "--no-align", "--quiet", "--command", sql], {
    encoding: "utf8",
    windowsHide: true,
    env: { ...process.env, ...connection, PGDATABASE: database },
  });
  if (result.error || result.status !== 0) fail("No se pudo verificar la base restaurada con psql.");
  return result.stdout.trim();
}

function verifyRestoredDatabase({ connection, targetDatabase, manifest }) {
  const database = queryScalar(connection, targetDatabase, "SELECT current_database()");
  if (database !== targetDatabase) fail("La conexión de verificación no apunta a la base local esperada.");
  const tableCount = Number(queryScalar(
    connection,
    targetDatabase,
    "SELECT count(*) FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')",
  ));
  if (!Number.isSafeInteger(tableCount) || tableCount !== manifest.source.userTableCount) {
    fail(`La restauración no coincide con el manifest: ${tableCount} tablas locales, ${manifest.source.userTableCount} esperadas.`);
  }
}

function fail(message) {
  throw new Error(message);
}

main().catch((error) => {
  console.error(`Error de importación: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
