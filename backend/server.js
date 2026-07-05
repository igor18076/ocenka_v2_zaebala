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
const port = Number(process.env.PORT || 4173);
const sessions = new Map();
const sessionCookieName = 'ocenka_session';
const appPath = '/ui_kits/ocenka-app-v2/index.html';
const secureCookie = /^(1|true|yes)$/i.test(process.env.OCENKA_COOKIE_SECURE || '');

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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const [rawName, ...rawValue] = part.trim().split('=');
    if (!rawName) continue;
    cookies[rawName] = decodeURIComponent(rawValue.join('=') || '');
  }
  return cookies;
}

function getSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[sessionCookieName];
  if (!sessionId) return null;

  const session = sessions.get(sessionId);
  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return null;
  }

  session.expiresAt = Date.now() + 1000 * 60 * 60 * 8;
  return session;
}

function redirect(res, location, headers = {}) {
  res.writeHead(302, {
    ...headers,
    Location: location,
    'Cache-Control': 'no-store'
  });
  res.end();
}

function sessionCookie(value, maxAge) {
  return [
    `${sessionCookieName}=${encodeURIComponent(value)}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${maxAge}`,
    secureCookie ? 'Secure' : ''
  ].filter(Boolean).join('; ');
}

function readFormBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 10000) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(new URLSearchParams(body)));
    req.on('error', reject);
  });
}

function verifyPassword(password, user) {
  const hash = crypto.pbkdf2Sync(
    password,
    user.password_salt,
    user.password_iterations,
    32,
    'sha256'
  );
  const stored = Buffer.from(user.password_hash, 'hex');
  return stored.length === hash.length && crypto.timingSafeEqual(stored, hash);
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
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, {
    userId: user.id,
    login: user.login,
    name: user.name,
    expiresAt: Date.now() + 1000 * 60 * 60 * 8
  });
  return sessionId;
}

function clearSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies[sessionCookieName];
  if (sessionId) sessions.delete(sessionId);
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
  if (fs.existsSync(dbPath)) {
    migrateDatabase();
    return;
  }
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const { spawnSync } = require('node:child_process');
  const result = spawnSync(process.execPath, [path.join(rootDir, 'backend', 'scripts', 'seed.js')], {
    cwd: rootDir,
    env: {
      ...process.env,
      OCENKA_DB_PATH: dbPath
    },
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    throw new Error(`Database seed failed: ${result.stderr || result.stdout}`);
  }
  migrateDatabase();
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
  } finally {
    db.close();
  }
}

function loadOcenkaData() {
  ensureDatabase();
  const db = new DatabaseSync(dbPath, { readOnly: true });
  try {
    const user = db.prepare('SELECT name, role, initials FROM users WHERE id = 1').get();
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

    const calculationSettings = db.prepare('SELECT subject_area AS subjectArea, weights, applied, income, cost FROM calculation_settings WHERE id = 1').get();
    const comparableRows = db.prepare(`
      SELECT id, name, src, price, area, w, adj_torg AS adjTorg, adj_loc AS adjLoc, adj_rep AS adjRep, adj_flr AS adjFlr
      FROM calculation_comparable_rows
      ORDER BY sort_order
    `).all();
    const calculation = {
      subjectArea: calculationSettings.subjectArea,
      weights: JSON.parse(calculationSettings.weights),
      applied: JSON.parse(calculationSettings.applied),
      comparableRows,
      income: JSON.parse(calculationSettings.income),
      cost: JSON.parse(calculationSettings.cost)
    };

    const reportSections = db.prepare('SELECT label, done FROM report_sections ORDER BY sort_order').all()
      .map((item) => ({ ...item, done: bool(item.done) }));
    const reportSettings = db.prepare('SELECT page_count AS pageCount, formats FROM report_settings WHERE id = 1').get();
    const report = {
      pageCount: reportSettings.pageCount,
      formats: JSON.parse(reportSettings.formats)
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
      calculation,
      reportSections,
      report
    };
  } finally {
    db.close();
  }
}

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store'
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
    || decodedPath.startsWith('/screenshots/')
    || decodedPath.startsWith('/backend/');
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
  const user = login ? findAuthUser(login) : null;

  if (!user || !verifyPassword(password, user)) {
    send(res, 401, renderLoginPage('Неверный логин или пароль'), 'text/html; charset=utf-8');
    return;
  }

  const sessionId = createSession(user);
  redirect(res, appPath, {
    'Set-Cookie': sessionCookie(sessionId, 60 * 60 * 8)
  });
}

function sendStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
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

  if (decodedPath.startsWith('/backend/')) {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    return;
  }

  if (decodedPath === '/ui_kits/ocenka-app-v2/data.js' || decodedPath === '/ui_kits/ocenka-app/data.js') {
    const data = loadOcenkaData();
    send(
      res,
      200,
      `window.OcenkaData = ${JSON.stringify(data)};\n`,
      'text/javascript; charset=utf-8'
    );
    return;
  }

  const requested = path.resolve(rootDir, `.${decodedPath}`);
  if (!requested.startsWith(rootDir + path.sep) && requested !== rootDir) {
    send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
    return;
  }

  fs.readFile(requested, (error, body) => {
    if (error) {
      send(res, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Not found' : 'Server error', 'text/plain; charset=utf-8');
      return;
    }

    const type = contentTypes[path.extname(requested).toLowerCase()] || 'application/octet-stream';
    send(res, 200, body, type);
  });
}

ensureDatabase();

const server = http.createServer((req, res) => {
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
    send(res, 200, 'ok', 'text/plain; charset=utf-8');
    return;
  }

  if (req.method === 'POST' && decodedPath === '/login') {
    handleLoginPost(req, res).catch(() => {
      send(res, 500, 'Server error', 'text/plain; charset=utf-8');
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
});

server.listen(port, () => {
  const appUrl = `http://localhost:${port}/ui_kits/ocenka-app-v2/index.html`;
  console.log(`Ocenka PRO backend is running at ${appUrl}`);
  console.log(`SQLite database: ${pathToFileURL(dbPath).href}`);
});
