/* Shared helpers for the Ocenka PRO UI kit screens. Loaded before screens. */
window.NS = window.OcenkaPRODesignSystem_7e0e51;

/* Lucide icon as a React node.
 * We build the SVG imperatively into a React-owned <span> instead of rendering an
 * <i data-lucide> that lucide.createIcons() later REPLACES in-place. That in-place
 * replacement swapped a node React still tracked, which crashed React on the next
 * update ("Failed to execute 'removeChild'…") and left stale icons (e.g. an ✕ after
 * a toggle already flipped to ✓). Here React only manages the <span>; the SVG inside
 * is raw DOM it never reconciles, so updates and unmounts are always safe. */
window.__lucidePascal = function (name) {
  return String(name || '').replace(/(^|[-_ ])(\w)/g, (_, __, ch) => ch.toUpperCase());
};
window.Icon = function Icon({ n, size = 18, color, strokeWidth = 2, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = '';
    const lucide = window.lucide;
    if (!lucide || !lucide.icons || !lucide.createElement) return;
    const data = lucide.icons[window.__lucidePascal(n)];
    if (!data) return;
    const svg = lucide.createElement(data);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('stroke-width', strokeWidth);
    host.appendChild(svg);
  }, [n, size, strokeWidth]);
  return React.createElement('span', {
    ref,
    'aria-hidden': true,
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, color, ...style },
  });
};

/* Kept for backward compatibility: design-system components may still emit
 * <i data-lucide> nodes that need materializing. Our own Icon self-renders. */
window.materializeIcons = function () {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try { window.lucide.createIcons(); } catch {}
  }
};

/* Closes an open overlay (modal, dropdown) when the user presses Escape. */
window.useEscapeToClose = function useEscapeToClose(active, onClose) {
  React.useEffect(() => {
    if (!active) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, onClose]);
};

window.safeJsonParse = function safeJsonParse(value, fallback = null) {
  try {
    const parsed = JSON.parse(value);
    return parsed == null ? fallback : parsed;
  } catch {
    return fallback;
  }
};

window.readLocalJson = function readLocalJson(key, fallback = null) {
  try {
    return window.safeJsonParse(window.localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
};

window.writeLocalJson = function writeLocalJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    try {
      window.dispatchEvent(new CustomEvent('ocenka:storage-error', {
        detail: { key, message: error && error.message ? error.message : 'quota' },
      }));
    } catch {}
    return false;
  }
};

/* Same as writeLocalJson, but shows a toast when the browser storage is full. */
window.saveLocalJson = function saveLocalJson(key, value, toast) {
  const ok = window.writeLocalJson(key, value);
  if (!ok && typeof toast === 'function') {
    toast('Не удалось сохранить — переполнена память браузера. Удалите лишние фото/документы.');
  }
  return ok;
};

window.ACTIVE_REQUEST_KEY = 'ocenka.activeRequestId.v1';
window.getActiveRequestId = function getActiveRequestId() {
  try {
    return window.localStorage.getItem(window.ACTIVE_REQUEST_KEY) || null;
  } catch {
    return null;
  }
};
window.setActiveRequestId = function setActiveRequestId(id) {
  const next = String(id || '').trim();
  if (!next) return;
  try {
    window.localStorage.setItem(window.ACTIVE_REQUEST_KEY, next);
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent('ocenka:active-request', { detail: { id: next } }));
  } catch {}
};
window.loadKanbanRequests = function loadKanbanRequests() {
  const saved = window.readLocalJson ? window.readLocalJson('ocenka.requests.kanban.v2', null) : null;
  if (Array.isArray(saved)) return saved;
  return (window.OcenkaData && window.OcenkaData.requests) || [];
};

/* Shared FSO completion signals — used by FSO screen and report autocheck. */
window.OcenkaFso = {
  evaluateSignals(id) {
    const key = id || 'draft';
    const object = (window.readLocalJson ? window.readLocalJson(`ocenka.object.${key}.v1`, null) : null) || {};
    const seedObject = (window.OcenkaData && window.OcenkaData.object) || {};
    const merged = { ...seedObject, ...object };
    const filled = (...fields) => fields.every((field) => String(merged[field] || '').trim());
    const analogs = (window.readLocalJson ? window.readLocalJson(`ocenka.analogs.${key}.v1`, null) : null) || {};
    const analogRows = Array.isArray(analogs.rows) ? analogs.rows : [];
    const activeAnalogs = analogRows.filter((row) => (analogs.statuses || {})[row.id] !== false);
    const hasSources = analogRows.some((row) => String(row.url || row.source || '').trim());
    const calc = (window.readLocalJson ? window.readLocalJson(`ocenka.calculation.${key}.v1`, null) : null) || {};
    const hasCalc = Array.isArray(calc.rows) && calc.rows.length > 0;
    const hasWeights = calc.weights != null || (calc.final != null && Number(calc.final) > 0);
    let reviewSent = false;
    try { reviewSent = window.localStorage.getItem(`ocenka.report.review.${id}.v1`) === '1'; } catch {}
    const docs = Array.isArray(merged.docs) ? merged.docs : [];
    return {
      'Заполнено задание на оценку': filled('title', 'address', 'client', 'purpose', 'valueType', 'date'),
      'Указана цель оценки': filled('purpose'),
      'Указан вид стоимости': filled('valueType'),
      'Указана дата оценки': filled('date'),
      'Описан объект оценки': filled('title', 'type', 'area', 'address'),
      'Проведен анализ рынка': activeAnalogs.length > 0,
      'Раскрыты источники информации': hasSources || docs.length > 0,
      'Применены подходы к оценке': hasCalc,
      'Выполнено согласование результатов': hasCalc && hasWeights,
      'Сформирован итоговый вывод': reviewSent,
    };
  },
  reportSectionDone(id, label) {
    const signals = window.OcenkaFso.evaluateSignals(id);
    const map = {
      'Задание на оценку': 'Заполнено задание на оценку',
      'Описание объекта оценки': 'Описан объект оценки',
      'Анализ рынка': 'Проведен анализ рынка',
      'Расчет тремя подходами': 'Применены подходы к оценке',
      'Согласование результатов': 'Выполнено согласование результатов',
      'Итоговое заключение': 'Сформирован итоговый вывод',
    };
    const key = map[label];
    return key ? !!signals[key] : false;
  },
  openCount(id) {
    const list = (window.OcenkaData && window.OcenkaData.fso) || [];
    const signals = window.OcenkaFso.evaluateSignals(id);
    return list.filter((item) => !(item.label in signals ? signals[item.label] : false)).length;
  },
};

/* Robust numeric parser shared across screens (handles ru decimals and stray chars).
 * A blank or non-numeric input returns the fallback, so callers that pass a
 * meaningful default (e.g. a coefficient of 1) get that default instead of 0. */
window.toNum = function toNum(value, fallback = 0) {
  const cleaned = String(value ?? '').replace(',', '.').replace(/[^\d.-]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '.' || cleaned === '-.') return fallback;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/*
 * Single source of truth for the valuation math. Both the calculation screen
 * and the report screen must use these functions so their numbers never drift.
 */
window.OcenkaValuation = (function () {
  const toNum = window.toNum;

  /* Comparative approach: weighted average of adjusted price per m² × subject area. */
  function comparative(rows, subjectArea) {
    const list = (rows || []).filter((r) => toNum(r.price) > 0 && toNum(r.area) > 0);
    const weightSum = list.reduce((sum, r) => sum + Math.max(0, toNum(r.w)), 0) || 1;
    const perM2 = list.reduce((sum, r) => {
      const adj = 1 + (toNum(r.adjTorg) + toNum(r.adjLoc) + toNum(r.adjRep) + toNum(r.adjFlr)) / 100;
      return sum + (toNum(r.price) / toNum(r.area, 1)) * adj * (Math.max(0, toNum(r.w)) / weightSum);
    }, 0);
    return Math.round(perM2 * toNum(subjectArea));
  }

  /* Income approach: returns the intermediate figures plus the capitalized value. */
  function income(params) {
    const p = params || {};
    const cap = toNum(p.cap);
    const pgiRaw = toNum(p.area) * toNum(p.rent) * 12;
    const noiRaw = pgiRaw * (1 - toNum(p.vacancy) / 100) * (1 - toNum(p.opex) / 100);
    const pgi = Math.round(pgiRaw);
    const egi = Math.round(pgiRaw * (1 - toNum(p.vacancy) / 100));
    const noi = Math.round(egi * (1 - toNum(p.opex) / 100));
    const value = cap > 0 ? Math.max(0, Math.round(noiRaw / (cap / 100))) : 0;
    return { pgi, egi, noi, value };
  }

  /* Cost approach by the НЦС formula: C = [(N·M·ΣK) + Zd] × Kind × (1 + VAT/100). */
  function cost(params) {
    const c = params || {};
    const base = toNum(c.n) * toNum(c.m) * toNum(c.kPer, 1) * toNum(c.kReg, 1) * toNum(c.kZon, 1) * toNum(c.kSeis, 1) * toNum(c.kF, 1);
    return Math.max(0, Math.round((base + toNum(c.zd)) * toNum(c.kInd, 1) * (1 + toNum(c.vat) / 100)));
  }

  /* Weighted rental rate per m² across rent analogs. */
  function rentAnalogRate(rentRows) {
    const list = rentRows || [];
    const totalWeight = list.reduce((sum, row) => sum + toNum(row.weight), 0) || 1;
    return Math.round(list.reduce((sum, row) => {
      const adjusted = toNum(row.rentPerM2) * (1 + (toNum(row.adjLoc) + toNum(row.adjCond)) / 100);
      return sum + adjusted * (toNum(row.weight) / totalWeight);
    }, 0));
  }

  /* Final reconciliation: weighted average of the enabled approaches. */
  function reconcile(values, weights, applied) {
    const keys = ['comp', 'income', 'cost'];
    const w = weights || {};
    const a = applied || {};
    const weightSum = keys.reduce((sum, key) => sum + (a[key] !== false ? toNum(w[key]) : 0), 0);
    if (!weightSum) return 0;
    const total = keys.reduce((sum, key) => sum + (a[key] !== false ? toNum((values || {})[key]) * toNum(w[key]) : 0), 0);
    return Math.round(total / weightSum);
  }

  return { toNum, comparative, income, cost, rentAnalogRate, reconcile };
})();

window.safeExternalUrl = function safeExternalUrl(value) {
  try {
    const url = new URL(String(value || ''), window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
};

window.safeFileName = function safeFileName(value, fallback = 'download') {
  const cleaned = String(value || '')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
  return cleaned || fallback;
};

window.downloadBlob = function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  try {
    link.href = url;
    link.download = window.safeFileName(fileName);
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();
    URL.revokeObjectURL(url);
  }
};

/* Section header used at the top of each screen. */
window.PageHead = function PageHead({ title, subtitle, actions }) {
  return (
    <div className="ock-page-head">
      <div className="ock-page-head__main">
        <h1 className="ock-page-head__title">{title}</h1>
        {subtitle ? <p className="ock-page-head__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="ock-page-head__actions">{actions}</div> : null}
    </div>
  );
};

/* Small labelled field for read-only detail grids. */
window.DetailField = function DetailField({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 'var(--text-md)', color: 'var(--text-strong)', fontWeight: 500, fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</span>
    </div>
  );
};

window.HelpTip = function HelpTip({ title, text, side = 'top' }) {
  const [open, setOpen] = React.useState(false);
  const isBottom = side === 'bottom';
  const isLeft = side === 'left';
  return (
    <span
      style={{ position:'relative', display:'inline-flex', verticalAlign:'middle' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={title || 'Подсказка'}
        onClick={() => setOpen((value) => !value)}
        style={{
          width:20,
          height:20,
          border:'1px solid var(--border-subtle)',
          borderRadius:'50%',
          background:'var(--surface-card)',
          color:'var(--text-muted)',
          display:'inline-flex',
          alignItems:'center',
          justifyContent:'center',
          cursor:'pointer',
          padding:0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display:'inline-flex',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            height:'100%',
            fontSize:12,
            lineHeight:1,
            fontWeight:800,
            color:'currentColor',
          }}
        >
          ?
        </span>
      </button>
      {open ? (
        <span
          role="tooltip"
          style={{
            position:'absolute',
            zIndex:90,
            width:280,
            left:isLeft ? 'auto' : '50%',
            right:isLeft ? 26 : 'auto',
            top:isBottom ? 26 : 'auto',
            bottom:isBottom ? 'auto' : 26,
            transform:isLeft ? 'none' : 'translateX(-50%)',
            background:'var(--neutral-900)',
            color:'#fff',
            borderRadius:'var(--radius-md)',
            boxShadow:'var(--shadow-lg)',
            padding:'10px 12px',
            pointerEvents:'none',
          }}
        >
          {title ? <span style={{ display:'block', fontWeight:800, fontSize:'var(--text-xs)', marginBottom:4 }}>{title}</span> : null}
          <span style={{ display:'block', fontSize:'var(--text-xs)', lineHeight:1.45, color:'rgba(255,255,255,.86)' }}>{text}</span>
        </span>
      ) : null}
    </span>
  );
};
