/*
 * Imports Inpars/Avito real-estate CSV exports into the database.
 *
 *   node backend/scripts/import-inpars.js [file1.csv file2.csv ...]
 *
 * With no arguments it imports every *.csv in backend/seed/inpars/.
 *
 * What it does:
 *   1. Ensures the `listings` table exists and upserts every CSV row into it
 *      (this is the canonical, "real" market dataset).
 *   2. Rebuilds `analytics_properties` from the sale listings so the market
 *      analytics screen reflects real data instead of the synthetic seed.
 *
 * It never runs schema.sql (that would drop the users table); it only creates
 * the tables it owns. Run `npm run db:seed` first to set up the app scaffolding.
 */
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const rootDir = path.resolve(__dirname, '..', '..');
const dbPath = process.env.OCENKA_DB_PATH
  ? path.resolve(process.env.OCENKA_DB_PATH)
  : path.join(rootDir, 'backend', 'db', 'ocenka.sqlite');
const defaultDir = path.join(rootDir, 'backend', 'seed', 'inpars');

/* ── Collect input files ─────────────────────────────────────────────────── */
function resolveInputFiles() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
  if (args.length) return args.map((arg) => path.resolve(arg));
  if (!fs.existsSync(defaultDir)) return [];
  return fs.readdirSync(defaultDir)
    .filter((name) => name.toLowerCase().endsWith('.csv'))
    .map((name) => path.join(defaultDir, name));
}

/* ── RFC4180-ish CSV parser: honours quotes, escaped quotes and newlines ──── */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; }
        else inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') { inQuotes = true; continue; }
    if (ch === ',') { row.push(field); field = ''; continue; }
    if (ch === '\r') continue;
    if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; continue; }
    field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/* ── Field normalisation ─────────────────────────────────────────────────── */
const clean = (value) => {
  const trimmed = String(value ?? '').trim();
  return trimmed === '-' || trimmed === '—' ? '' : trimmed;
};
const parsePrice = (value) => {
  const digits = String(value ?? '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
};
const parseFloatRu = (value) => {
  const normalized = String(value ?? '').replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};
const parseFloorsInt = (value) => {
  const digits = String(value ?? '').replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
};

const CURRENT_YEAR = new Date().getFullYear();
const yearFromDescription = (description) => {
  const matches = String(description ?? '').match(/\b(19\d{2}|20\d{2})\b/g);
  if (!matches) return 0;
  for (const raw of matches) {
    const year = Number(raw);
    if (year >= 1900 && year <= CURRENT_YEAR + 1) return year;
  }
  return 0;
};
const eraFromYear = (year) => {
  if (!year) return '—';
  if (year >= 2000) return 'Новостройка';
  if (year >= 1970) return 'Советская';
  if (year >= 1955) return 'Хрущевка';
  return 'Сталинка';
};

// Category labels vary ("2-к квартира", "Студия", "Дом/Коттедж", …), so match by keyword.
const useTypeFromCategory = (category) => (
  /кварти|студи|комнат|дом|коттедж|дача|таунхаус|апартамент/i.test(category || '') ? 'Жилой' : 'Коммерческий'
);
const isSale = (dealType) => /прода/i.test(dealType || '');

/* ── Read one CSV file into normalised listing objects ───────────────────── */
function readListings(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const rows = parseCsv(raw);
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim());
  const idx = (name) => header.findIndex((h) => h === name);
  const col = {
    id: idx('№'),
    published: idx('Дата публикации'),
    updated: idx('Дата изменения'),
    deal: idx('Тип'),
    category: idx('Категория'),
    source: idx('Источник'),
    city: idx('Город'),
    address: idx('Адрес'),
    metro: idx('Метро'),
    floor: idx('Этаж'),
    floors: idx('Этажность'),
    area: idx('Площадь, м2'),
    land: idx('Площадь земли, сот.'),
    price: idx('Стоимость'),
    phone: idx('Телефон'),
    phoneProtected: idx('Номер защищен'),
    contact: idx('Имя контакта'),
    agent: idx('Агент'),
    url: idx('Ссылка'),
    material: idx('Материал'),
    description: idx('Описание'),
    images: idx('Изображения'),
  };
  const at = (row, index) => (index >= 0 ? row[index] : '');
  const batch = path.basename(file);
  const listings = [];
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const id = clean(at(row, col.id));
    if (!id) continue;
    const category = clean(at(row, col.category));
    const dealType = clean(at(row, col.deal));
    const area = parseFloatRu(at(row, col.area));
    const price = parsePrice(at(row, col.price));
    const description = clean(at(row, col.description));
    listings.push({
      id,
      publishedAt: clean(at(row, col.published)),
      updatedAt: clean(at(row, col.updated)),
      dealType,
      category,
      source: clean(at(row, col.source)),
      city: clean(at(row, col.city)),
      address: clean(at(row, col.address)),
      metro: clean(at(row, col.metro)),
      floor: clean(at(row, col.floor)),
      floors: clean(at(row, col.floors)),
      area,
      landArea: parseFloatRu(at(row, col.land)),
      price,
      priceRaw: clean(at(row, col.price)),
      phone: clean(at(row, col.phone)),
      phoneProtected: clean(at(row, col.phoneProtected)),
      contactName: clean(at(row, col.contact)),
      agent: clean(at(row, col.agent)),
      url: clean(at(row, col.url)),
      material: clean(at(row, col.material)),
      description,
      images: clean(at(row, col.images)),
      pricePerM2: area > 0 && price > 0 ? Math.round(price / area) : 0,
      year: yearFromDescription(description),
      useType: useTypeFromCategory(category),
      batch,
    });
  }
  return listings;
}

/* ── Main ────────────────────────────────────────────────────────────────── */
const files = resolveInputFiles();
if (!files.length) {
  console.error(`No CSV files found. Put them in ${path.relative(rootDir, defaultDir)} or pass paths as arguments.`);
  process.exit(1);
}
if (!fs.existsSync(dbPath)) {
  console.error(`Database not found at ${dbPath}. Run "npm run db:seed" first.`);
  process.exit(1);
}

const db = new DatabaseSync(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    published_at TEXT, updated_at TEXT, deal_type TEXT, category TEXT, source TEXT,
    city TEXT, address TEXT, metro TEXT, floor TEXT, floors TEXT,
    area REAL, land_area REAL, price INTEGER, price_raw TEXT,
    phone TEXT, phone_protected TEXT, contact_name TEXT, agent TEXT, url TEXT,
    material TEXT, description TEXT, images TEXT,
    price_per_m2 INTEGER, year INTEGER, use_type TEXT, import_batch TEXT, imported_at TEXT
  );
`);

// De-duplicate by listing id across files; a later file wins.
const byId = new Map();
let parsedTotal = 0;
for (const file of files) {
  const listings = readListings(file);
  parsedTotal += listings.length;
  for (const listing of listings) byId.set(listing.id, listing);
}
const listings = Array.from(byId.values());
const importedAt = new Date().toISOString();

db.exec('BEGIN');
try {
  db.exec('DELETE FROM listings');
  const insertListing = db.prepare(`
    INSERT INTO listings
      (id, published_at, updated_at, deal_type, category, source, city, address, metro,
       floor, floors, area, land_area, price, price_raw, phone, phone_protected,
       contact_name, agent, url, material, description, images,
       price_per_m2, year, use_type, import_batch, imported_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);
  for (const l of listings) {
    insertListing.run(
      l.id, l.publishedAt, l.updatedAt, l.dealType, l.category, l.source, l.city, l.address, l.metro,
      l.floor, l.floors, l.area, l.landArea, l.price, l.priceRaw, l.phone, l.phoneProtected,
      l.contactName, l.agent, l.url, l.material, l.description, l.images,
      l.pricePerM2, l.year, l.useType, l.batch, importedAt
    );
  }

  // Rebuild market analytics from real sale listings with a valid price/m².
  db.exec('DELETE FROM analytics_properties');
  const insertAnalytics = db.prepare(`
    INSERT INTO analytics_properties
      (id, addr, district, line, class, era, type, series, floors, wall_material,
       cond, use_type, comm_type, area, price, price_per_m2, rent_per_m2, year, sort_order)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);
  const analyticsRows = listings.filter((l) => isSale(l.dealType) && l.area > 0 && l.pricePerM2 > 0);
  analyticsRows.forEach((l, index) => {
    insertAnalytics.run(
      l.id,
      l.address || l.city || 'Адрес не указан',
      l.city || 'Не указан',
      '—',
      '—',
      eraFromYear(l.year),
      l.category || 'Прочее',
      '—',
      parseFloorsInt(l.floors),
      l.material || '—',
      '—',
      l.useType,
      null,
      l.area,
      l.price,
      l.pricePerM2,
      0,
      l.year,
      index
    );
  });

  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  db.close();
  throw error;
}

const listingCount = db.prepare('SELECT COUNT(*) AS c FROM listings').get().c;
const analyticsCount = db.prepare('SELECT COUNT(*) AS c FROM analytics_properties').get().c;
const byCategory = db.prepare('SELECT category, COUNT(*) AS c FROM listings GROUP BY category ORDER BY c DESC').all();
db.close();

console.log(`Imported ${files.length} CSV file(s), parsed ${parsedTotal} rows.`);
console.log(`listings=${listingCount} (unique), analytics_properties=${analyticsCount} (sale listings with price/m²).`);
console.log('By category: ' + byCategory.map((r) => `${r.category || '—'}=${r.c}`).join(', '));
