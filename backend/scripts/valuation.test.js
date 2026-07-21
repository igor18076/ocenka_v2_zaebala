/*
 * Unit tests for the shared valuation module (window.OcenkaValuation).
 * The module lives in a browser-oriented file, so we transpile it with the
 * bundled Babel and evaluate it inside a minimal sandbox that provides the few
 * globals it touches at load time (window, React, document).
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const rootDir = path.resolve(__dirname, '..', '..');
const appDir = path.join(rootDir, 'ui_kits', 'ocenka-app-v2');
const Babel = require(path.join(appDir, 'vendor', 'babel.min.js'));

const source = fs.readFileSync(path.join(appDir, '_shared.jsx'), 'utf8');
const { code } = Babel.transform(source, { presets: ['react'], filename: '_shared.jsx' });

const sandboxWindow = {};
const React = {
  createElement: () => null,
  useState: (value) => [value, () => {}],
  useEffect: () => {},
  useRef: () => ({ current: null }),
};
const documentStub = { createElement: () => ({ style: {}, append() {}, remove() {} }), body: { appendChild() {} } };
new Function('window', 'React', 'document', `${code}\nreturn window;`)(sandboxWindow, React, documentStub);

const V = sandboxWindow.OcenkaValuation;
const toNum = sandboxWindow.toNum;

let passed = 0;
function check(name, fn) {
  fn();
  passed += 1;
  console.log('ok -', name);
}

check('module is exposed', () => {
  assert.ok(V, 'OcenkaValuation must exist');
  assert.equal(typeof toNum, 'function');
});

check('toNum parses ru-formatted numbers and honors the fallback for blanks', () => {
  assert.equal(toNum('1234,5 ₽'), 1234.5);
  assert.equal(toNum('-12%'), -12);
  assert.equal(toNum('0'), 0);
  // Blank / non-numeric input returns the fallback (default 0).
  assert.equal(toNum(''), 0);
  assert.equal(toNum('', 7), 7);
  assert.equal(toNum(null, 3), 3);
  assert.equal(toNum(undefined, 1), 1);
  assert.equal(toNum('—', 5), 5);
  assert.equal(toNum('.', 9), 9);
  assert.equal(toNum('-', 5), 5);
  assert.equal(toNum('1.2.3', 4), 4);
});

check('comparative: weighted adjusted price per m² × area', () => {
  const rows = [
    { price: 10_000_000, area: 100, w: 1, adjTorg: 0, adjLoc: 0, adjRep: 0, adjFlr: 0 },
    { price: 20_000_000, area: 100, w: 1, adjTorg: 0, adjLoc: 0, adjRep: 0, adjFlr: 0 },
  ];
  assert.equal(V.comparative(rows, 100), 15_000_000);
  assert.equal(V.comparative([{ price: 10_000_000, area: 100, w: 1, adjLoc: 10 }], 100), 11_000_000);
  assert.equal(V.comparative([], 100), 0);
  assert.equal(V.comparative([{ price: 0, area: 100, w: 1 }], 100), 0, 'rows without price are ignored');
});

check('income: PGI → NOI → capitalized value', () => {
  const result = V.income({ area: 100, rent: 1000, vacancy: 10, opex: 20, cap: 10 });
  assert.equal(result.pgi, 1_200_000);
  assert.equal(result.egi, 1_080_000);
  assert.equal(result.noi, 864_000);
  assert.equal(result.value, 8_640_000);
  assert.equal(V.income({ area: 100, rent: 1000, vacancy: 0, opex: 0, cap: 0 }).value, 0, 'zero cap rate is safe');
});

check('cost: НЦС formula with coefficients and VAT', () => {
  assert.equal(V.cost({ n: 1000, m: 10, kPer: 1, kReg: 1, kZon: 1, kSeis: 1, kF: 1, zd: 0, kInd: 1, vat: 20 }), 12_000);
  // Missing coefficients fall back to 1 (neutral) rather than zeroing the cost.
  assert.equal(V.cost({ n: 1000, m: 10, zd: 5000, vat: 0 }), 15_000);
});

check('rentAnalogRate: weighted adjusted rent', () => {
  assert.equal(V.rentAnalogRate([{ rentPerM2: 1000, adjLoc: 10, adjCond: 0, weight: 1 }]), 1100);
  assert.equal(V.rentAnalogRate([
    { rentPerM2: 1000, adjLoc: 0, adjCond: 0, weight: 1 },
    { rentPerM2: 2000, adjLoc: 0, adjCond: 0, weight: 1 },
  ]), 1500);
  assert.equal(V.rentAnalogRate([]), 0);
});

check('reconcile: weighted average of enabled approaches only', () => {
  const values = { comp: 100, income: 200, cost: 300 };
  assert.equal(V.reconcile(values, { comp: 50, income: 0, cost: 50 }, { comp: true, income: true, cost: true }), 200);
  assert.equal(V.reconcile(values, { comp: 50, income: 50, cost: 50 }, { comp: true, income: false, cost: true }), 200);
  assert.equal(V.reconcile(values, { comp: 0, income: 0, cost: 0 }, { comp: true, income: true, cost: true }), 0);
});

console.log(`\nValuation tests passed: ${passed}`);
