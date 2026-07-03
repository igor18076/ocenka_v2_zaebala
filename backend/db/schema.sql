PRAGMA foreign_keys = ON;

DROP TRIGGER IF EXISTS trg_app_data_sections_updated_at;
DROP TABLE IF EXISTS app_data_sections;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT NOT NULL,
  login TEXT NOT NULL UNIQUE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_iterations INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS nav_items (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  badge INTEGER,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS kpis (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT NOT NULL,
  tone TEXT NOT NULL,
  delta TEXT,
  dir TEXT,
  helper TEXT,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL,
  orders INTEGER NOT NULL DEFAULT 0,
  contact TEXT NOT NULL,
  inn TEXT NOT NULL DEFAULT '0000000000',
  legal_address TEXT NOT NULL DEFAULT 'Не указан'
);

CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  object TEXT NOT NULL,
  address TEXT NOT NULL,
  client TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  date TEXT NOT NULL,
  owner TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appraisal_objects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  type TEXT NOT NULL,
  area TEXT NOT NULL,
  floors TEXT NOT NULL,
  year TEXT NOT NULL,
  cadastral TEXT NOT NULL,
  purpose TEXT NOT NULL,
  value_type TEXT NOT NULL,
  date TEXT NOT NULL,
  client TEXT NOT NULL,
  photos INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS object_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  object_id TEXT NOT NULL REFERENCES appraisal_objects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  kind TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS analogs (
  id TEXT PRIMARY KEY,
  request_id TEXT,
  addr TEXT NOT NULL,
  full_addr TEXT,
  source TEXT NOT NULL,
  url TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL,
  area REAL NOT NULL,
  per_m2 INTEGER NOT NULL,
  dist TEXT NOT NULL,
  cond TEXT NOT NULL,
  floors INTEGER,
  year INTEGER,
  wall_material TEXT,
  plot_area TEXT,
  adj TEXT NOT NULL,
  final TEXT NOT NULL,
  comp TEXT NOT NULL,
  description TEXT,
  photos INTEGER NOT NULL DEFAULT 0,
  added_date TEXT,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS analog_adjustments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  analog_id TEXT NOT NULL REFERENCES analogs(id) ON DELETE CASCADE,
  factor TEXT NOT NULL,
  pct REAL NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS approaches (
  key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  applied INTEGER NOT NULL,
  value TEXT NOT NULL,
  weight INTEGER NOT NULL,
  note TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS valuation_results (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  value TEXT NOT NULL,
  low TEXT NOT NULL,
  high TEXT NOT NULL,
  date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fso_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  done INTEGER NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS report_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  done INTEGER NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS report_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  page_count INTEGER NOT NULL,
  formats TEXT NOT NULL CHECK (json_valid(formats))
);

CREATE TABLE IF NOT EXISTS analytics_properties (
  id TEXT PRIMARY KEY,
  addr TEXT NOT NULL,
  district TEXT NOT NULL,
  line TEXT NOT NULL,
  class TEXT NOT NULL,
  era TEXT NOT NULL,
  type TEXT NOT NULL,
  series TEXT NOT NULL,
  floors INTEGER NOT NULL,
  wall_material TEXT NOT NULL,
  cond TEXT NOT NULL,
  use_type TEXT NOT NULL,
  comm_type TEXT,
  area REAL NOT NULL,
  price INTEGER NOT NULL,
  price_per_m2 INTEGER NOT NULL,
  rent_per_m2 INTEGER NOT NULL,
  year INTEGER NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS calculation_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  subject_area REAL NOT NULL,
  weights TEXT NOT NULL CHECK (json_valid(weights)),
  applied TEXT NOT NULL CHECK (json_valid(applied)),
  income TEXT NOT NULL CHECK (json_valid(income)),
  cost TEXT NOT NULL CHECK (json_valid(cost))
);

CREATE TABLE IF NOT EXISTS calculation_comparable_rows (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  src TEXT NOT NULL,
  price INTEGER NOT NULL,
  area REAL NOT NULL,
  w REAL NOT NULL,
  adj_torg REAL NOT NULL,
  adj_loc REAL NOT NULL,
  adj_rep REAL NOT NULL,
  adj_flr REAL NOT NULL,
  sort_order INTEGER NOT NULL
);
