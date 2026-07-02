const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const rootDir = path.resolve(__dirname, '..', '..');
const dbPath = process.env.OCENKA_DB_PATH
  ? path.resolve(process.env.OCENKA_DB_PATH)
  : path.join(rootDir, 'backend', 'db', 'ocenka.sqlite');
const schemaPath = path.join(rootDir, 'backend', 'db', 'schema.sql');
const seedPath = path.join(rootDir, 'backend', 'seed', 'initial-data.json');
const ncsTablesPath = path.join(rootDir, 'backend', 'seed', 'ncs-tables.json');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(fs.readFileSync(schemaPath, 'utf8'));

const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
const ncsTables = JSON.parse(fs.readFileSync(ncsTablesPath, 'utf8'));
const passwordIterations = 120000;
const passwordSalt = crypto.randomBytes(16).toString('hex');
const seedPassword = process.env.OCENKA_SEED_PASSWORD || 'ocenka123';
const passwordHash = crypto.pbkdf2Sync(seedPassword, passwordSalt, passwordIterations, 32, 'sha256').toString('hex');

function bool(value) {
  return value ? 1 : 0;
}

function json(value) {
  return JSON.stringify(value);
}

function runMany(sql, rows, mapper) {
  const statement = db.prepare(sql);
  rows.forEach((row, index) => statement.run(...mapper(row, index)));
}

db.exec('BEGIN');
try {
  db.exec(`
    DELETE FROM calculation_comparable_rows;
    DELETE FROM calculation_settings;
    DELETE FROM analytics_properties;
    DELETE FROM report_settings;
    DELETE FROM report_sections;
    DELETE FROM fso_items;
    DELETE FROM valuation_results;
    DELETE FROM approaches;
    DELETE FROM analog_adjustments;
    DELETE FROM analogs;
    DELETE FROM object_documents;
    DELETE FROM appraisal_objects;
    DELETE FROM requests;
    DELETE FROM clients;
    DELETE FROM kpis;
    DELETE FROM nav_items;
    DELETE FROM users;
  `);

  db.prepare(`
    INSERT INTO users (id, name, role, initials, login, password_salt, password_hash, password_iterations)
    VALUES (1, ?, ?, ?, ?, ?, ?, ?)
  `).run(seed.user.name, seed.user.role, seed.user.initials, seed.auth.login, passwordSalt, passwordHash, passwordIterations);

  runMany(
    'INSERT INTO nav_items (key, label, icon, badge, sort_order) VALUES (?, ?, ?, ?, ?)',
    seed.nav,
    (item, index) => [item.key, item.label, item.icon, item.badge ?? null, index]
  );

  runMany(
    'INSERT INTO kpis (label, value, icon, tone, delta, dir, helper, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    seed.kpis,
    (item, index) => [item.label, item.value, item.icon, item.tone, item.delta ?? null, item.dir ?? null, item.helper ?? null, index]
  );

  runMany(
    'INSERT INTO clients (name, kind, orders, contact) VALUES (?, ?, ?, ?)',
    seed.clients,
    (item) => [item.name, item.kind, item.orders, item.contact]
  );

  runMany(
    'INSERT INTO requests (id, object, address, client, type, status, date, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    seed.requests,
    (item) => [item.id, item.object, item.address, item.client, item.type, item.status, item.date, item.owner]
  );

  db.prepare(`
    INSERT INTO appraisal_objects
      (id, title, address, type, area, floors, year, cadastral, purpose, value_type, date, client, photos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    seed.object.id,
    seed.object.title,
    seed.object.address,
    seed.object.type,
    seed.object.area,
    seed.object.floors,
    seed.object.year,
    seed.object.cadastral,
    seed.object.purpose,
    seed.object.valueType,
    seed.object.date,
    seed.object.client,
    seed.object.photos
  );

  runMany(
    'INSERT INTO object_documents (object_id, name, size, kind, sort_order) VALUES (?, ?, ?, ?, ?)',
    seed.object.docs,
    (item, index) => [seed.object.id, item.name, item.size, item.kind, index]
  );

  runMany(
    `INSERT INTO analogs
      (id, request_id, addr, full_addr, source, url, active, price, area, per_m2, dist, cond, floors, year, wall_material, plot_area, adj, final, comp, description, photos, added_date, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    seed.analogsDetailed,
    (item, index) => [
      item.id,
      seed.object.id,
      item.addr,
      item.fullAddr,
      item.source,
      item.url,
      bool(item.active),
      item.price,
      item.area,
      item.perM2,
      item.dist,
      item.cond,
      item.floors,
      item.year,
      item.wallMaterial,
      item.plotArea,
      item.adj,
      item.final,
      item.comp,
      item.description,
      item.photos,
      item.addedDate,
      index
    ]
  );

  const adjustmentRows = seed.analogsDetailed.flatMap((analog) =>
    (analog.adjRows || []).map((row, index) => ({ analogId: analog.id, ...row, sortOrder: index }))
  );
  runMany(
    'INSERT INTO analog_adjustments (analog_id, factor, pct, sort_order) VALUES (?, ?, ?, ?)',
    adjustmentRows,
    (item) => [item.analogId, item.factor, item.pct, item.sortOrder]
  );

  runMany(
    'INSERT INTO approaches (key, name, applied, value, weight, note, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
    seed.approaches,
    (item, index) => [item.key, item.name, bool(item.applied), item.value, item.weight, item.note, index]
  );

  db.prepare('INSERT INTO valuation_results (id, value, low, high, date) VALUES (1, ?, ?, ?, ?)')
    .run(seed.result.value, seed.result.low, seed.result.high, seed.result.date);

  runMany(
    'INSERT INTO fso_items (label, done, sort_order) VALUES (?, ?, ?)',
    seed.fso,
    (item, index) => [item.label, bool(item.done), index]
  );

  runMany(
    'INSERT INTO report_sections (label, done, sort_order) VALUES (?, ?, ?)',
    seed.reportSections,
    (item, index) => [item.label, bool(item.done), index]
  );

  db.prepare('INSERT INTO report_settings (id, page_count, formats) VALUES (1, ?, json(?))')
    .run(seed.report.pageCount, json(seed.report.formats));

  runMany(
    `INSERT INTO analytics_properties
      (id, addr, district, line, class, era, type, series, floors, wall_material, cond, use_type, comm_type, area, price, price_per_m2, rent_per_m2, year, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    seed.analyticsProps,
    (item, index) => [
      item.id,
      item.addr,
      item.district,
      item.line,
      item.class,
      item.era,
      item.type,
      item.series,
      item.floors,
      item.wallMaterial,
      item.cond,
      item.useType,
      item.commType ?? null,
      item.area,
      item.price,
      item.pricePerM2,
      item.rentPerM2,
      item.year,
      index
    ]
  );

  db.prepare(`
    INSERT INTO calculation_settings (id, subject_area, weights, applied, income, cost)
    VALUES (1, ?, json(?), json(?), json(?), json(?))
  `).run(
    seed.calculation.subjectArea,
    json(seed.calculation.weights),
    json(seed.calculation.applied),
    json(seed.calculation.income),
    json({ ...seed.calculation.cost, ncsTables })
  );

  runMany(
    `INSERT INTO calculation_comparable_rows
      (id, name, src, price, area, w, adj_torg, adj_loc, adj_rep, adj_flr, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    seed.calculation.comparableRows,
    (item, index) => [item.id, item.name, item.src, item.price, item.area, item.w, item.adjTorg, item.adjLoc, item.adjRep, item.adjFlr, index]
  );

  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  throw error;
}

const tables = [
  'requests',
  'appraisal_objects',
  'analogs',
  'approaches',
  'fso_items',
  'clients',
  'analytics_properties',
  'calculation_comparable_rows'
];
const counts = tables.map((table) => {
  const { count } = db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get();
  return `${table}=${count}`;
});

db.close();

console.log(`Seeded domain tables into ${path.relative(rootDir, dbPath)}`);
console.log(counts.join(', '));
