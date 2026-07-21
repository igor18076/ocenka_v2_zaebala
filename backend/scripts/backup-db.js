/*
 * Copy the SQLite database to backend/db/backups/ with a timestamp.
 * Usage: npm run db:backup
 */
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..', '..');
const dbPath = process.env.OCENKA_DB_PATH
  ? path.resolve(process.env.OCENKA_DB_PATH)
  : path.join(rootDir, 'backend', 'db', 'ocenka.sqlite');
const backupDir = path.join(rootDir, 'backend', 'db', 'backups');

if (!fs.existsSync(dbPath)) {
  console.error(`Database not found: ${dbPath}`);
  process.exit(1);
}

fs.mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const dest = path.join(backupDir, `ocenka-${stamp}.sqlite`);

// Prefer SQLite online backup when possible; fall back to file copy.
try {
  const { DatabaseSync } = require('node:sqlite');
  const src = new DatabaseSync(dbPath, { readOnly: true });
  try {
    src.exec(`VACUUM INTO '${dest.replace(/\\/g, '/').replace(/'/g, "''")}'`);
  } finally {
    src.close();
  }
} catch {
  fs.copyFileSync(dbPath, dest);
}

const sizeKb = Math.round(fs.statSync(dest).size / 1024);
console.log(`Backup written: ${path.relative(rootDir, dest)} (${sizeKb} KB)`);
