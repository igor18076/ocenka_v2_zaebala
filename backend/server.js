const fs = require('node:fs');
const crypto = require('node:crypto');
const http = require('node:http');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { DatabaseSync } = require('node:sqlite');

const rootDir = path.resolve(__dirname, '..');
const dbPath = process.env.OCENKA_DB_PATH
  ? path.resolve(process.env.OCENKA_DB_PATH)
  : path.join(rootDir, 'backend', 'db', 'ocenka.sqlite');
const schemaPath = path.join(rootDir, 'backend', 'db', 'schema.sql');
const seedPath = path.join(rootDir, 'backend', 'seed', 'initial-data.json');
function readPositiveIntegerEnv(name, fallback, min = 1, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(process.env[name] || fallback);
  if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) return fallback;
  return parsed;
}

function logJson(level, event, fields = {}) {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    event,
    ...fields,
  });
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

const port = readPositiveIntegerEnv('PORT', 4173, 1, 65535);
const sessions = new Map();
const loginFailures = new Map();
const sessionCookieName = 'ocenka_session';
const appPath = '/ui_kits/ocenka-app-v2/index.html';
const isProduction = process.env.NODE_ENV === 'production';
const prodIndexPath = path.join(rootDir, 'ui_kits', 'ocenka-app-v2', 'index.prod.html');
// In production serve the precompiled entry (production React, no in-browser Babel)
// when `npm run build` has produced it; fall back to the dev entry otherwise.
const useProductionBuild = isProduction && fs.existsSync(prodIndexPath);
const envFlag = (name, fallback = false) => {
  const raw = process.env[name];
  if (raw == null || raw === '') return fallback;
  return /^(1|true|yes)$/i.test(raw);
};
// Secure cookies: enable behind HTTPS / TLS-terminated proxy via OCENKA_COOKIE_SECURE=true.
// Default OFF so plain-HTTP deploys (e.g. docker compose on :4173) keep working.
const secureCookie = envFlag('OCENKA_COOKIE_SECURE', false);
const trustProxy = envFlag('OCENKA_TRUST_PROXY', false);
const sessionTtlMs = readPositiveIntegerEnv('OCENKA_SESSION_TTL_MS', 1000 * 60 * 60 * 8, 1000);
const sessionCookieMaxAgeSec = Math.max(1, Math.floor(sessionTtlMs / 1000));
const maxSessions = readPositiveIntegerEnv('OCENKA_MAX_SESSIONS', 1000, 1, 100000);
const maxLoginAttempts = readPositiveIntegerEnv('OCENKA_LOGIN_MAX_ATTEMPTS', 8, 1, 100);
const loginWindowMs = readPositiveIntegerEnv('OCENKA_LOGIN_WINDOW_MS', 1000 * 60 * 10, 1000);
const maxBodyBytes = readPositiveIntegerEnv('OCENKA_MAX_BODY_BYTES', 10000, 1024, 1024 * 1024);
const requestTimeoutMs = readPositiveIntegerEnv('OCENKA_REQUEST_TIMEOUT_MS', 30000, 1000, 300000);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/babel; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8'
};

function bool(value) {
  return Boolean(value);
}

function safeJsonParse(value, fallback) {
  if (value == null || value === '') return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function baseSecurityHeaders(extra = {}) {
  const headers = {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    ...extra,
  };
  if (secureCookie) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
  }
  return headers;
}

function serializeForScript(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003C')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029');
}

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const [rawName, ...rawValue] = part.trim().split('=');
    if (!rawName) continue;
    try {
      cookies[rawName] = decodeURIComponent(rawValue.join('=') || '');
    } catch {
      cookies[rawName] = '';
    }
  }
  return cookies;
}

function cleanupSessions(now = Date.now()) {
  for (const [sessionId, session] of sessions) {
    if (session.expiresAt <= now) {
      sessions.delete(sessionId);
      deletePersistedSession(sessionId);
      continue;
    }
    if (session.dirty) {
      persistSession(sessionId, session);
      session.dirty = false;
    }
  }
  while (sessions.size > maxSessions) {
    const oldest = sessions.keys().next().value;
    if (!oldest) break;
    sessions.delete(oldest);
    deletePersistedSession(oldest);
  }
  try {
    if (fs.existsSync(dbPath)) {
      withSessionsDb((db) => {
        db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(now);
      });
    }
  } catch {}
}

function cleanupLoginFailures(now = Date.now()) {
  for (const [key, value] of loginFailures) {
    if (value.resetAt <= now) loginFailures.delete(key);
  }
}

function clientKey(req, login = '') {
  // Only honour X-Forwarded-For behind a trusted reverse proxy.
  const remote = trustProxy
    ? (String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown')
    : (req.socket.remoteAddress || 'unknown');
  return `${remote}:${login.toLowerCase()}`;
}

function isRateLimited(req, login) {
  cleanupLoginFailures();
  const item = loginFailures.get(clientKey(req, login));
  return Boolean(item && item.count >= maxLoginAttempts && item.resetAt > Date.now());
}

function registerLoginFailure(req, login) {
  const key = clientKey(req, login);
  const now = Date.now();
  const current = loginFailures.get(key);
  if (!current || current.resetAt <= now) {
    loginFailures.set(key, { count: 1, resetAt: now + loginWindowMs });
    return;
  }
  current.count += 1;
}

function clearLoginFailures(req, login) {
  loginFailures.delete(clientKey(req, login));
}

function getSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[sessionCookieName];
  if (!sessionId) return null;

  const session = sessions.get(sessionId);
  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    deletePersistedSession(sessionId);
    return null;
  }

  // Sliding TTL in memory; flush to SQLite on the periodic cleanup timer.
  session.expiresAt = Date.now() + sessionTtlMs;
  session.dirty = true;
  return session;
}

function redirect(res, location, headers = {}) {
  res.writeHead(302, {
    ...baseSecurityHeaders(),
    ...headers,
    Location: location
  });
  res.end();
}

function sessionCookie(value, maxAge = sessionCookieMaxAgeSec) {
  return [
    `${sessionCookieName}=${encodeURIComponent(value)}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${maxAge}`,
    secureCookie ? 'Secure' : ''
  ].filter(Boolean).join('; ');
}

function withSessionsDb(fn) {
  ensureDatabase();
  const db = new DatabaseSync(dbPath);
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        login TEXT NOT NULL,
        name TEXT NOT NULL,
        expires_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
    `);
    return fn(db);
  } finally {
    db.close();
  }
}

function persistSession(sessionId, session) {
  try {
    withSessionsDb((db) => {
      db.prepare(`
        INSERT INTO sessions (id, user_id, login, name, expires_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          user_id = excluded.user_id,
          login = excluded.login,
          name = excluded.name,
          expires_at = excluded.expires_at
      `).run(sessionId, session.userId, session.login, session.name, session.expiresAt);
    });
  } catch (error) {
    console.error('Failed to persist session:', error.message);
  }
}

function deletePersistedSession(sessionId) {
  if (!sessionId) return;
  try {
    withSessionsDb((db) => {
      db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
    });
  } catch (error) {
    console.error('Failed to delete session:', error.message);
  }
}

function loadPersistedSessions() {
  if (!fs.existsSync(dbPath)) return;
  try {
    withSessionsDb((db) => {
      const now = Date.now();
      db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(now);
      const rows = db.prepare('SELECT id, user_id AS userId, login, name, expires_at AS expiresAt FROM sessions').all();
      sessions.clear();
      for (const row of rows) {
        sessions.set(row.id, {
          userId: row.userId,
          login: row.login,
          name: row.name,
          expiresAt: row.expiresAt,
        });
      }
    });
  } catch (error) {
    console.error('Failed to load sessions:', error.message);
  }
}

function readFormBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let finished = false;
    const fail = (error) => {
      if (finished) return;
      finished = true;
      reject(error);
    };
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, 'utf8') > maxBodyBytes) {
        fail(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (finished) return;
      finished = true;
      resolve(new URLSearchParams(body));
    });
    req.on('error', fail);
  });
}

function verifyPassword(password, user) {
  return new Promise((resolve, reject) => {
    const iterations = Number(user.password_iterations);
    if (!Number.isSafeInteger(iterations) || iterations < 100000) {
      resolve(false);
      return;
    }
    crypto.pbkdf2(password, user.password_salt, iterations, 32, 'sha256', (error, hash) => {
      if (error) {
        reject(error);
        return;
      }
      let stored;
      try {
        stored = Buffer.from(user.password_hash, 'hex');
      } catch {
        resolve(false);
        return;
      }
      resolve(stored.length === hash.length && crypto.timingSafeEqual(stored, hash));
    });
  });
}

function findAuthUser(login) {
  ensureDatabase();
  const db = new DatabaseSync(dbPath, { readOnly: true });
  try {
    return db.prepare(`
      SELECT id, name, role, initials, login, password_salt, password_hash, password_iterations
      FROM users
      WHERE login = ?
    `).get(login);
  } finally {
    db.close();
  }
}

function createSession(user) {
  cleanupSessions();
  const sessionId = crypto.randomUUID();
  const session = {
    userId: user.id,
    login: user.login,
    name: user.name,
    expiresAt: Date.now() + sessionTtlMs
  };
  sessions.set(sessionId, session);
  persistSession(sessionId, session);
  return sessionId;
}

function clearSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[sessionCookieName];
  if (sessionId) {
    sessions.delete(sessionId);
    deletePersistedSession(sessionId);
  }
}

function renderLoginPage(errorText = '') {
  const error = errorText
    ? `<div class="auth-error">${escapeHtml(errorText)}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Вход · Оценка PRO</title>
<link rel="stylesheet" href="/styles.css">
<style>
  html, body { min-height: 100%; }
  body {
    margin: 0;
    background: var(--surface-app);
    color: var(--text-body);
    font-family: var(--font-sans);
  }
  .auth-shell {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px 20px;
    box-sizing: border-box;
  }
  .auth-panel {
    width: min(100%, 392px);
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    padding: 28px;
  }
  .auth-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .auth-mark {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--blue-600);
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 800;
  }
  .auth-title {
    margin: 0;
    color: var(--text-strong);
    font-size: var(--text-2xl);
    line-height: 1.15;
  }
  .auth-subtitle {
    margin: 6px 0 0;
    color: var(--text-muted);
    font-size: var(--text-sm);
  }
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .auth-field label {
    display: block;
    margin-bottom: 6px;
    color: var(--text-muted);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .auth-field input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    background: var(--surface-card);
    color: var(--text-strong);
    font: inherit;
    padding: 11px 12px;
    outline: none;
  }
  .auth-field input:focus {
    border-color: var(--blue-500);
    box-shadow: 0 0 0 3px var(--ring);
  }
  .auth-submit {
    margin-top: 4px;
    border: none;
    border-radius: var(--radius-md);
    background: var(--blue-600);
    color: #fff;
    font: inherit;
    font-weight: 700;
    padding: 12px 14px;
    cursor: pointer;
  }
  .auth-submit:hover { background: var(--blue-700); }
  .auth-error {
    margin-bottom: 14px;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    background: var(--danger-soft);
    color: var(--danger-text);
    font-size: var(--text-sm);
    font-weight: 600;
  }
  .auth-hint {
    margin: 16px 0 0;
    color: var(--text-subtle);
    font-size: var(--text-xs);
    line-height: 1.45;
  }
</style>
</head>
<body>
  <main class="auth-shell">
    <section class="auth-panel" aria-labelledby="login-title">
      <div class="auth-brand">
        <div class="auth-mark">О</div>
        <div>
          <h1 class="auth-title" id="login-title">Оценка PRO</h1>
          <p class="auth-subtitle">Вход в рабочее пространство оценщика</p>
        </div>
      </div>
      ${error}
      <form class="auth-form" method="post" action="/login">
        <div class="auth-field">
          <label for="login">Логин</label>
          <input id="login" name="login" autocomplete="username" required autofocus>
        </div>
        <div class="auth-field">
          <label for="password">Пароль</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required>
        </div>
        <button class="auth-submit" type="submit">Войти</button>
      </form>
      <p class="auth-hint">Доступ к приложению и данным открывается только после входа.</p>
    </section>
  </main>
</body>
</html>`;
}

function ensureDatabase() {
  if (ensureDatabase.ready && fs.existsSync(dbPath)) return;
  if (fs.existsSync(dbPath)) {
    migrateDatabase();
    ensureDatabase.ready = true;
    return;
  }
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const { spawnSync } = require('node:child_process');
  const runScript = (script, env = {}) => spawnSync(process.execPath, [path.join(rootDir, 'backend', 'scripts', script)], {
    cwd: rootDir,
    env: { ...process.env, OCENKA_DB_PATH: dbPath, ...env },
    encoding: 'utf8'
  });

  const result = runScript('seed.js');
  if (result.status !== 0) {
    throw new Error(`Database seed failed: ${result.stderr || result.stdout}`);
  }

  // Load the real market dataset (Inpars/Avito CSV) if it is bundled. Best effort:
  // an empty import (no CSV files) is not fatal — the app still runs on seed data.
  const inparsDir = path.join(rootDir, 'backend', 'seed', 'inpars');
  const hasCsv = fs.existsSync(inparsDir) && fs.readdirSync(inparsDir).some((name) => name.toLowerCase().endsWith('.csv'));
  if (hasCsv) {
    const imported = runScript('import-inpars.js');
    if (imported.status === 0) {
      logJson('info', 'market_import_ok');
    } else {
      logJson('warn', 'market_import_skipped', { detail: String(imported.stderr || imported.stdout || 'unknown error').slice(0, 200) });
    }
  }

  migrateDatabase();
  ensureDatabase.ready = true;
}

function migrateDatabase() {
  const db = new DatabaseSync(dbPath);
  try {
    const clientColumns = new Set(db.prepare('PRAGMA table_info(clients)').all().map((column) => column.name));
    if (!clientColumns.has('inn')) {
      db.exec("ALTER TABLE clients ADD COLUMN inn TEXT NOT NULL DEFAULT '0000000000'");
    }
    if (!clientColumns.has('legal_address')) {
      db.exec("ALTER TABLE clients ADD COLUMN legal_address TEXT NOT NULL DEFAULT 'Не указан'");
    }

    // The block below only fixes data from databases seeded before the seed
    // files were cleaned up. Current seed data is already normalized, so run it
    // once per database and skip it on every subsequent startup.
    db.exec('CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const alreadyNormalized = db.prepare("SELECT 1 FROM app_meta WHERE key = 'normalization_v1'").get();
    if (alreadyNormalized) return;

    db.exec('PRAGMA foreign_keys = OFF');
    db.exec(`
      UPDATE users
      SET name = 'Игорь Дорощенко', role = 'Оценщик', initials = 'ИД', login = 'ocenka'
      WHERE id = 1;
      UPDATE nav_items SET label = 'Отчет' WHERE key = 'reports';
      UPDATE requests SET owner = 'Игорь Дорощенко' WHERE owner = 'Игорь Власов';
      UPDATE requests SET owner = 'Игорь Дорощенко' WHERE owner = 'Алексей Морозов';
      UPDATE requests SET owner = 'Мария Кузнецова' WHERE owner = 'Анна Смирнова';
      UPDATE requests SET owner = 'Павел Соколов' WHERE owner = 'Дмитрий Орлов';
      UPDATE requests SET type = 'Рыночная' WHERE type = 'Кадастровая';
      UPDATE requests SET id = '03-' || substr(id, 4) WHERE id LIKE 'ОЗ-%';
      UPDATE appraisal_objects SET id = '03-' || substr(id, 4) WHERE id LIKE 'ОЗ-%';
      UPDATE object_documents SET object_id = '03-' || substr(object_id, 4) WHERE object_id LIKE 'ОЗ-%';
      UPDATE analogs SET request_id = '03-' || substr(request_id, 4) WHERE request_id LIKE 'ОЗ-%';
      UPDATE appraisal_objects SET client = 'Игорь Дорощенко' WHERE id = '03-1040';
    `);
    db.exec('PRAGMA foreign_keys = ON');
    const details = [
      ['ПАО «Сбербанк»', '7707083893', '117997, г. Москва, ул. Вавилова, д. 19'],
      ['ВТБ Банк', '7702070139', '190000, г. Санкт-Петербург, ул. Большая Морская, д. 29'],
      ['ООО «Аркада»', '7723456789', '115054, г. Москва, ул. Валовая, д. 8, офис 12'],
      ['Игорь Дорощенко', '000000000000', 'Адрес регистрации не указан'],
      ['ООО «ГеоИнвест»', '7712345678', '125040, г. Москва, Ленинградский пр-т, д. 15']
    ];
    const updateClient = db.prepare('UPDATE clients SET inn = ?, legal_address = ? WHERE name = ?');
    details.forEach(([name, inn, address]) => updateClient.run(inn, address, name));
    db.prepare("INSERT OR REPLACE INTO app_meta (key, value) VALUES ('normalization_v1', ?)").run(new Date().toISOString());
  } finally {
    db.close();
  }
}

function loadOcenkaData() {
  ensureDatabase();
  const db = new DatabaseSync(dbPath, { readOnly: true });
  try {
    const user = db.prepare('SELECT name, role, initials FROM users WHERE id = 1').get()
      || { name: 'Оценщик', role: 'Оценщик', initials: 'О' };
    const nav = db.prepare('SELECT key, label, icon, badge FROM nav_items ORDER BY sort_order').all()
      .map((item) => item.badge == null ? item : { ...item, badge: Number(item.badge) });
    const kpis = db.prepare('SELECT label, value, icon, tone, delta, dir, helper FROM kpis ORDER BY sort_order').all()
      .map((item) => Object.fromEntries(Object.entries(item).filter(([, value]) => value != null)));
    const requests = db.prepare('SELECT id, object, address, client, type, status, date, owner FROM requests ORDER BY date DESC, id DESC').all();

    const objectRow = db.prepare(`
      SELECT id, title, address, type, area, floors, year, cadastral, purpose, value_type AS valueType, date, client, photos
      FROM appraisal_objects
      ORDER BY id
      LIMIT 1
    `).get();
    if (!objectRow) {
      throw new Error('Database has no appraisal object');
    }
    const docs = db.prepare('SELECT name, size, kind FROM object_documents WHERE object_id = ? ORDER BY sort_order').all(objectRow.id);
    const object = { ...objectRow, docs };

    const analogRows = db.prepare(`
      SELECT id, addr, full_addr AS fullAddr, source, url, active, price, area, per_m2 AS perM2, dist, cond,
             floors, year, wall_material AS wallMaterial, plot_area AS plotArea, adj, final, comp,
             description, photos, added_date AS addedDate
      FROM analogs
      ORDER BY sort_order
    `).all();
    const analogsDetailed = analogRows.map((item) => ({
      ...item,
      active: bool(item.active),
      adjRows: db.prepare('SELECT factor, pct FROM analog_adjustments WHERE analog_id = ? ORDER BY sort_order').all(item.id)
    }));
    const analogs = analogsDetailed.map(({ id, addr, source, price, area, perM2, dist, cond, adj, final, comp }) => ({
      id,
      addr,
      source,
      price: Number(price).toLocaleString('ru-RU'),
      area: String(area),
      perM2: Number(perM2).toLocaleString('ru-RU'),
      dist,
      cond,
      adj,
      final,
      comp
    }));

    const approaches = db.prepare('SELECT key, name, applied, value, weight, note FROM approaches ORDER BY sort_order').all()
      .map((item) => ({ ...item, applied: bool(item.applied) }));
    const result = db.prepare('SELECT value, low, high, date FROM valuation_results WHERE id = 1').get();
    const fso = db.prepare('SELECT label, done FROM fso_items ORDER BY sort_order').all()
      .map((item) => ({ ...item, done: bool(item.done) }));
    const clients = db.prepare('SELECT name, kind, orders, contact, inn, legal_address AS legalAddress FROM clients ORDER BY id').all();
    const analyticsProps = db.prepare(`
      SELECT id, addr, district, line, class, era, type, series, floors,
             wall_material AS wallMaterial, cond, use_type AS useType, comm_type AS commType,
             area, price, price_per_m2 AS pricePerM2, rent_per_m2 AS rentPerM2, year
      FROM analytics_properties
      ORDER BY sort_order
    `).all().map((item) => Object.fromEntries(Object.entries(item).filter(([, value]) => value != null)));

    let marketListings = [];
    try {
      const hasListings = db.prepare("SELECT 1 AS ok FROM sqlite_master WHERE type='table' AND name='listings'").get();
      if (hasListings) {
        marketListings = db.prepare(`
          SELECT id, address AS addr, city, category, source, url, price, area,
                 price_per_m2 AS perM2, floors, material AS wallMaterial, description,
                 images, use_type AS useType, year, land_area AS landArea, deal_type AS dealType
          FROM listings
          WHERE price_per_m2 > 0 AND area > 0
            AND deal_type LIKE 'Прода%'
          ORDER BY published_at DESC, id DESC
          LIMIT 300
        `).all().map((row) => ({
          ...row,
          photoUrls: String(row.images || '')
            .split(',')
            .map((url) => url.trim())
            .filter((url) => /^https?:\/\//i.test(url))
            .slice(0, 8),
          images: undefined,
        }));
      }
    } catch (error) {
      console.warn('marketListings unavailable:', error.message);
    }

    const calculationSettings = db.prepare('SELECT subject_area AS subjectArea, weights, applied, income, cost FROM calculation_settings WHERE id = 1').get();
    const comparableRows = db.prepare(`
      SELECT id, name, src, price, area, w, adj_torg AS adjTorg, adj_loc AS adjLoc, adj_rep AS adjRep, adj_flr AS adjFlr
      FROM calculation_comparable_rows
      ORDER BY sort_order
    `).all();
    const calculation = {
      subjectArea: calculationSettings?.subjectArea || Number(objectRow.area) || 0,
      weights: safeJsonParse(calculationSettings?.weights, { comp: 60, income: 10, cost: 30 }),
      applied: safeJsonParse(calculationSettings?.applied, { comp: true, income: true, cost: true }),
      comparableRows,
      income: safeJsonParse(calculationSettings?.income, {}),
      cost: safeJsonParse(calculationSettings?.cost, {})
    };

    const reportSections = db.prepare('SELECT label, done FROM report_sections ORDER BY sort_order').all()
      .map((item) => ({ ...item, done: bool(item.done) }));
    const reportSettings = db.prepare('SELECT page_count AS pageCount, formats FROM report_settings WHERE id = 1').get();
    const report = {
      pageCount: reportSettings?.pageCount || 0,
      formats: safeJsonParse(reportSettings?.formats, ['DOC'])
    };

    return {
      user,
      nav,
      kpis,
      requests,
      object,
      analogs,
      analogsDetailed,
      approaches,
      result,
      fso,
      clients,
      analyticsProps,
      marketListings,
      calculation,
      reportSections,
      report
    };
  } finally {
    db.close();
  }
}

function securityHeaders(type, cacheControl) {
  const headers = {
    ...baseSecurityHeaders(cacheControl ? { 'Cache-Control': cacheControl } : {}),
    'Content-Type': type,
  };
  if (String(type).startsWith('text/html')) {
    // Production build has no in-browser Babel, so drop unsafe-eval.
    const scriptSrc = useProductionBuild
      ? "script-src 'self' 'unsafe-inline'"
      : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
    headers['Content-Security-Policy'] = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.img.avito.st https://*.avito.st https://www.avito.ru https://*.cian.ru https://cdn-p.cian.site https://images.cdn-cian.ru https://img.dmclk.ru https://*.domclick.ru",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'"
    ].join('; ');
  }
  return headers;
}

function send(res, status, body, type, cacheControl) {
  res.writeHead(status, {
    ...securityHeaders(type, cacheControl)
  });
  res.end(body);
}

function isPublicPath(decodedPath) {
  return decodedPath === '/login'
    || decodedPath === '/styles.css'
    || decodedPath.startsWith('/tokens/')
    || decodedPath.startsWith('/components/')
    || decodedPath.startsWith('/assets/');
}

function isProtectedAppPath(decodedPath) {
  return decodedPath === '/'
    || decodedPath.startsWith('/ui_kits/')
    || decodedPath === '/_ds_bundle.js'
    || decodedPath === '/_ds_manifest.json'
    || decodedPath === '/_adherence.oxlintrc.json'
    || decodedPath.startsWith('/uploads/')
    || decodedPath.startsWith('/screenshots/');
}

function isAllowedStaticPath(decodedPath) {
  return isPublicPath(decodedPath) || isProtectedAppPath(decodedPath);
}

function isSensitiveFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath).toLowerCase();
  return ext === '.sqlite'
    || ext === '.db'
    || ext === '.sql'
    || ext === '.env'
    || ext === '.md'
    || base.startsWith('.')
    || base === 'package-lock.json'
    || base === 'package.json'
    || base === 'compose.yaml'
    || base === 'dockerfile'
    || base.endsWith('.csv');
}

function isDevOnlyAsset(decodedPath) {
  if (!useProductionBuild) return false;
  return decodedPath.endsWith('.jsx')
    || decodedPath.endsWith('/babel.min.js')
    || decodedPath.endsWith('/react.development.js')
    || decodedPath.endsWith('/react-dom.development.js')
    || decodedPath.endsWith('/index-bundle-src.html');
}

function staticCacheControl(decodedPath) {
  if (!useProductionBuild) return undefined;
  if (decodedPath.includes('/build/') || decodedPath.includes('/vendor/') || decodedPath.endsWith('.css')) {
    return 'public, max-age=3600';
  }
  return undefined;
}

async function handleLoginPost(req, res) {
  let form;
  try {
    form = await readFormBody(req);
  } catch {
    send(res, 400, 'Bad request', 'text/plain; charset=utf-8');
    return;
  }

  const login = String(form.get('login') || '').trim();
  const password = String(form.get('password') || '');
  if (isRateLimited(req, login)) {
    send(res, 429, renderLoginPage('Слишком много попыток входа. Повторите позже.'), 'text/html; charset=utf-8');
    return;
  }
  const user = login ? findAuthUser(login) : null;

  if (!user || !(await verifyPassword(password, user))) {
    registerLoginFailure(req, login);
    logJson('warn', 'login_failed', { login: login || '(empty)', ip: clientKey(req, '').split(':')[0] });
    send(res, 401, renderLoginPage('Неверный логин или пароль'), 'text/html; charset=utf-8');
    return;
  }

  clearLoginFailures(req, login);
  logJson('info', 'login_ok', { login: user.login });
  const sessionId = createSession(user);
  redirect(res, appPath, {
    'Set-Cookie': sessionCookie(sessionId)
  });
}

function hashPassword(password) {
  const iterations = 120000;
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256').toString('hex');
  return { salt, hash, iterations };
}

async function handlePasswordPost(req, res) {
  const session = getSession(req);
  if (!session) {
    send(res, 401, JSON.stringify({ status: 'error', message: 'Требуется вход' }), 'application/json; charset=utf-8');
    return;
  }

  let form;
  try {
    form = await readFormBody(req);
  } catch {
    send(res, 400, JSON.stringify({ status: 'error', message: 'Некорректный запрос' }), 'application/json; charset=utf-8');
    return;
  }

  const current = String(form.get('current') || '');
  const next = String(form.get('next') || '');
  const confirm = String(form.get('confirm') || '');
  if (!current || !next || !confirm) {
    send(res, 400, JSON.stringify({ status: 'error', message: 'Заполните все поля' }), 'application/json; charset=utf-8');
    return;
  }
  if (next.length < 8) {
    send(res, 400, JSON.stringify({ status: 'error', message: 'Новый пароль должен быть не короче 8 символов' }), 'application/json; charset=utf-8');
    return;
  }
  if (next !== confirm) {
    send(res, 400, JSON.stringify({ status: 'error', message: 'Пароли не совпадают' }), 'application/json; charset=utf-8');
    return;
  }

  const user = findAuthUser(session.login);
  if (!user || !(await verifyPassword(current, user))) {
    registerLoginFailure(req, session.login);
    send(res, 401, JSON.stringify({ status: 'error', message: 'Текущий пароль неверен' }), 'application/json; charset=utf-8');
    return;
  }

  const { salt, hash, iterations } = hashPassword(next);
  ensureDatabase();
  const db = new DatabaseSync(dbPath);
  try {
    db.prepare(`
      UPDATE users
      SET password_salt = ?, password_hash = ?, password_iterations = ?
      WHERE id = ?
    `).run(salt, hash, iterations, user.id);
  } finally {
    db.close();
  }

  send(res, 200, JSON.stringify({ status: 'ok', message: 'Пароль обновлён' }), 'application/json; charset=utf-8');
  logJson('info', 'password_changed', { login: session.login });
}

function sendStatic(req, res) {
  let url;
  try {
    url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch {
    send(res, 400, 'Bad request', 'text/plain; charset=utf-8');
    return;
  }
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    send(res, 400, 'Bad request', 'text/plain; charset=utf-8');
    return;
  }

  if (decodedPath === '/') {
    decodedPath = appPath;
  }

  if (!isAllowedStaticPath(decodedPath) || decodedPath.startsWith('/backend/')) {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    return;
  }

  if (isDevOnlyAsset(decodedPath)) {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    return;
  }

  if (decodedPath === '/ui_kits/ocenka-app-v2/data.js') {
    const data = loadOcenkaData();
    send(
      res,
      200,
      `window.OcenkaData = ${serializeForScript(data)};\n`,
      'text/javascript; charset=utf-8'
    );
    return;
  }

  if (decodedPath === appPath && useProductionBuild) {
    fs.readFile(prodIndexPath, (error, body) => {
      if (error) {
        send(res, 500, 'Server error', 'text/plain; charset=utf-8');
        return;
      }
      send(res, 200, body, 'text/html; charset=utf-8');
    });
    return;
  }

  const requested = path.resolve(rootDir, `.${decodedPath}`);
  if (!requested.startsWith(rootDir + path.sep) && requested !== rootDir) {
    send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
    return;
  }
  if (isSensitiveFile(requested)) {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    return;
  }

  fs.readFile(requested, (error, body) => {
    if (error) {
      send(res, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Not found' : 'Server error', 'text/plain; charset=utf-8');
      return;
    }

    const type = contentTypes[path.extname(requested).toLowerCase()] || 'application/octet-stream';
    send(res, 200, body, type, staticCacheControl(decodedPath));
  });
}

ensureDatabase();
loadPersistedSessions();

const cleanupTimer = setInterval(() => {
  cleanupSessions();
  cleanupLoginFailures();
}, 1000 * 60 * 5);
if (cleanupTimer.unref) cleanupTimer.unref();

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let decodedPath;
    try {
      decodedPath = decodeURIComponent(url.pathname);
    } catch {
      send(res, 400, 'Bad request', 'text/plain; charset=utf-8');
      return;
    }

    if (req.method === 'GET' && decodedPath === '/login') {
      if (getSession(req)) {
        redirect(res, appPath);
        return;
      }
      send(res, 200, renderLoginPage(), 'text/html; charset=utf-8');
      return;
    }

    if (req.method === 'GET' && decodedPath === '/healthz') {
      try {
        ensureDatabase();
        const db = new DatabaseSync(dbPath, { readOnly: true });
        try {
          db.prepare('SELECT 1 AS ok').get();
        } finally {
          db.close();
        }
        send(res, 200, JSON.stringify({
          status: 'ok',
          mode: isProduction ? 'production' : 'development',
          build: useProductionBuild ? 'compiled' : 'dev',
        }), 'application/json; charset=utf-8');
      } catch (error) {
        send(res, 503, JSON.stringify({ status: 'error', message: 'database unavailable' }), 'application/json; charset=utf-8');
      }
      return;
    }

    if (req.method === 'POST' && decodedPath === '/login') {
      handleLoginPost(req, res).catch(() => {
        send(res, 500, 'Server error', 'text/plain; charset=utf-8');
      });
      return;
    }

    if (req.method === 'POST' && decodedPath === '/password') {
      handlePasswordPost(req, res).catch(() => {
        send(res, 500, JSON.stringify({ status: 'error', message: 'Server error' }), 'application/json; charset=utf-8');
      });
      return;
    }

    if ((req.method === 'GET' || req.method === 'POST') && decodedPath === '/logout') {
      clearSession(req);
      redirect(res, '/login', {
        'Set-Cookie': sessionCookie('', 0)
      });
      return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      send(res, 405, 'Method not allowed', 'text/plain; charset=utf-8');
      return;
    }

    if (isProtectedAppPath(decodedPath) && !isPublicPath(decodedPath) && !getSession(req)) {
      redirect(res, '/login');
      return;
    }

    sendStatic(req, res);
  } catch {
    if (!res.headersSent) {
      send(res, 500, 'Server error', 'text/plain; charset=utf-8');
    } else {
      res.destroy();
    }
  }
});

server.requestTimeout = requestTimeoutMs;
server.headersTimeout = Math.min(60000, requestTimeoutMs);
server.keepAliveTimeout = 5000;
server.on('clientError', (error, socket) => {
  if (!socket.writable) return;
  socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
});

server.listen(port, () => {
  const appUrl = `http://localhost:${port}/ui_kits/ocenka-app-v2/index.html`;
  console.log(`Ocenka PRO backend is running at ${appUrl}`);
  console.log(`SQLite database: ${pathToFileURL(dbPath).href}`);
  console.log(`Mode: ${isProduction ? 'production' : 'development'}${useProductionBuild ? ' (precompiled frontend)' : ''}`);
  console.log(`Cookies: HttpOnly; SameSite=Lax${secureCookie ? '; Secure' : ''} · trustProxy=${trustProxy}`);
  if (isProduction && !useProductionBuild) {
    console.warn('Warning: NODE_ENV=production but no index.prod.html found. Run "npm run build" for the optimized frontend.');
  }
  if (isProduction && !secureCookie) {
    console.warn('Warning: Secure cookies disabled. Set OCENKA_COOKIE_SECURE=true behind HTTPS.');
  }
});

let shuttingDown = false;
function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logJson('info', 'shutdown', { signal });
  clearInterval(cleanupTimer);
  try { cleanupSessions(); } catch {}
  server.close(() => process.exit(0));
  // Don't hang forever on lingering keep-alive connections.
  const forceExit = setTimeout(() => process.exit(1), 8000);
  if (forceExit.unref) forceExit.unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  logJson('error', 'unhandled_rejection', { detail: String(reason && reason.stack || reason).slice(0, 500) });
});
process.on('uncaughtException', (error) => {
  logJson('error', 'uncaught_exception', { detail: String(error && error.stack || error).slice(0, 500) });
  shutdown('uncaughtException');
});
