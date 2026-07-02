/* @ds-bundle: {"format":3,"namespace":"OcenkaPRODesignSystem_7e0e51","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"KpiCard","sourcePath":"components/data/KpiCard.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"STATUS","sourcePath":"components/data/StatusBadge.jsx"},{"name":"StatusBadge","sourcePath":"components/data/StatusBadge.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/core/Button.jsx":"f0b4b30b62bb","components/core/IconButton.jsx":"120dc275f83f","components/data/Avatar.jsx":"c8a35d3697a6","components/data/Badge.jsx":"49011193fa24","components/data/Card.jsx":"f520c61c7755","components/data/KpiCard.jsx":"fd4332930cb4","components/data/ProgressBar.jsx":"70349a0332a2","components/data/StatusBadge.jsx":"4955c932719d","components/data/Table.jsx":"3d01af9ca6a3","components/data/Tabs.jsx":"984efdfd4892","components/forms/Checkbox.jsx":"4c47908de6b8","components/forms/Input.jsx":"d2a03a029f81","components/forms/Select.jsx":"81cd0450827b","components/forms/Switch.jsx":"747ced9d81e7","deck-stage.js":"0cc26af2402a","ui_kits/ocenka-app-v2/AnalogsScreenV2.jsx":"d3326f99d7d7","ui_kits/ocenka-app-v2/AnalyticsScreen.jsx":"eb19c445c743","ui_kits/ocenka-app-v2/CalcScreenV2.jsx":"6542be9418d5","ui_kits/ocenka-app-v2/DashboardScreenV2.jsx":"18c09a261753","ui_kits/ocenka-app-v2/FsoScreenV2.jsx":"97a32560b683","ui_kits/ocenka-app-v2/MiscScreensV2.jsx":"2bf229e405c3","ui_kits/ocenka-app-v2/ObjectScreenV2.jsx":"cdd16925f21f","ui_kits/ocenka-app-v2/ReportScreenV2.jsx":"2f3997c51aa1","ui_kits/ocenka-app-v2/RequestsScreenV2.jsx":"248fc3d35c66","ui_kits/ocenka-app-v2/SidebarV2.jsx":"45782e0e4aa9","ui_kits/ocenka-app-v2/TopbarV2.jsx":"b3e78c06ccb4","ui_kits/ocenka-app-v2/data.js":"923fd038effe","ui_kits/ocenka-app/AnalogsScreen.jsx":"098ee1e3db9d","ui_kits/ocenka-app/CalcScreen.jsx":"3362e94b4789","ui_kits/ocenka-app/DashboardScreen.jsx":"c0389e3201b8","ui_kits/ocenka-app/FsoScreen.jsx":"32fc558c59d2","ui_kits/ocenka-app/MiscScreens.jsx":"bd1c62aaa306","ui_kits/ocenka-app/ObjectScreen.jsx":"2b0c2a289159","ui_kits/ocenka-app/ReportScreen.jsx":"54fe6f70ded2","ui_kits/ocenka-app/RequestsScreen.jsx":"84e9a448c82b","ui_kits/ocenka-app/Sidebar.jsx":"26962a9af55d","ui_kits/ocenka-app/Topbar.jsx":"ad1ab48cada6","ui_kits/ocenka-app/data.js":"844cfd7010b2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OcenkaPRODesignSystem_7e0e51 = window.OcenkaPRODesignSystem_7e0e51 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 'ock-btn--sm',
  md: '',
  lg: 'ock-btn--lg'
};

/**
 * Ocenka PRO primary button.
 */
function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  block = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['ock-btn', `ock-btn--${variant}`, SIZES[size] || '', block ? 'ock-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, rest), iconLeft ? /*#__PURE__*/React.createElement("span", {
    className: "ock-btn__icon"
  }, iconLeft) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "ock-btn__icon"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button. Pass a single icon node as children.
 */
function IconButton({
  size = 'md',
  bordered = false,
  className = '',
  'aria-label': ariaLabel,
  children,
  ...rest
}) {
  const cls = ['ock-iconbtn', size === 'sm' ? 'ock-iconbtn--sm' : '', bordered ? 'ock-iconbtn--bordered' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": ariaLabel
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initials(name = '') {
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0] || '').join('').toUpperCase();
}

/**
 * User avatar — image when `src` given, otherwise initials from `name`.
 */
function Avatar({
  name,
  src,
  size = 'md',
  className = '',
  ...rest
}) {
  const cls = ['ock-avatar', size === 'sm' ? 'ock-avatar--sm' : '', size === 'lg' ? 'ock-avatar--lg' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || ''
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small label chip for tones/categories. For request lifecycle states use StatusBadge.
 */
function Badge({
  tone = 'neutral',
  pill = false,
  dot = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['ock-badge', `ock-badge--${tone}`, pill ? 'ock-badge--pill' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ock-badge__dot",
    style: {
      background: 'currentColor'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. Optional header (title + actions) and padded body.
 */
function Card({
  title,
  actions,
  elevation = 'flat',
  noBodyPad = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  children,
  ...rest
}) {
  const cls = ['ock-card', elevation === 'raised' ? 'ock-card--raised' : '', elevation === 'floating' ? 'ock-card--floating' : '', className].filter(Boolean).join(' ');
  const hasHeader = title != null || actions != null;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), hasHeader ? /*#__PURE__*/React.createElement("div", {
    className: ['ock-card__header', headerClassName].filter(Boolean).join(' ')
  }, typeof title === 'string' ? /*#__PURE__*/React.createElement("h3", {
    className: "ock-card__title"
  }, title) : title, actions ? /*#__PURE__*/React.createElement("div", {
    className: "ock-card__actions"
  }, actions) : null) : null, noBodyPad ? children : /*#__PURE__*/React.createElement("div", {
    className: ['ock-card__body', bodyClassName].filter(Boolean).join(' ')
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ArrowUp = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 12V4m0 0L4.5 7.5M8 4l3.5 3.5",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const ArrowDown = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 4v8m0 0l3.5-3.5M8 12L4.5 8.5",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/**
 * Metric / KPI tile for the dashboard.
 */
function KpiCard({
  label,
  value,
  icon,
  iconTone = 'brand',
  delta,
  deltaDir = 'up',
  helper,
  onClick,
  className = '',
  ...rest
}) {
  const interactive = typeof onClick === 'function';
  const cls = ['ock-kpi', interactive ? 'ock-kpi--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ock-kpi__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ock-kpi__label"
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    className: `ock-kpi__icon${iconTone !== 'brand' ? ` ock-kpi__icon--${iconTone}` : ''}`
  }, icon) : null), /*#__PURE__*/React.createElement("div", {
    className: "ock-kpi__value"
  }, value), delta != null || helper ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, delta != null ? /*#__PURE__*/React.createElement("span", {
    className: `ock-kpi__delta ock-kpi__delta--${deltaDir}`
  }, deltaDir === 'down' ? /*#__PURE__*/React.createElement(ArrowDown, null) : /*#__PURE__*/React.createElement(ArrowUp, null), delta) : null, helper ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, helper) : null) : null);
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Linear progress bar with optional label + percentage.
 */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  tone = 'accent',
  className = '',
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fillCls = ['ock-progress__fill', tone === 'brand' ? 'ock-progress__fill--brand' : '', tone === 'warning' ? 'ock-progress__fill--warning' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ock-progress', className].filter(Boolean).join(' ')
  }, rest), label || showValue ? /*#__PURE__*/React.createElement("div", {
    className: "ock-progress__top"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "ock-progress__label"
  }, label) : /*#__PURE__*/React.createElement("span", null), showValue ? /*#__PURE__*/React.createElement("span", {
    className: "ock-progress__pct"
  }, Math.round(pct), "%") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "ock-progress__track",
    role: "progressbar",
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("div", {
    className: fillCls,
    style: {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Request lifecycle status pill. Each status maps to a fixed color + label.
 */
const STATUS = {
  new: {
    label: 'Новая',
    bg: 'var(--status-new-bg)',
    fg: 'var(--status-new-fg)',
    dot: 'var(--status-new-dot)'
  },
  docs: {
    label: 'Документы получены',
    bg: 'var(--status-docs-bg)',
    fg: 'var(--status-docs-fg)',
    dot: 'var(--status-docs-dot)'
  },
  analogs: {
    label: 'Аналоги подобраны',
    bg: 'var(--status-analogs-bg)',
    fg: 'var(--status-analogs-fg)',
    dot: 'var(--status-analogs-dot)'
  },
  calc: {
    label: 'Расчет выполнен',
    bg: 'var(--status-calc-bg)',
    fg: 'var(--status-calc-fg)',
    dot: 'var(--status-calc-dot)'
  },
  review: {
    label: 'На проверке',
    bg: 'var(--status-review-bg)',
    fg: 'var(--status-review-fg)',
    dot: 'var(--status-review-dot)'
  },
  ready: {
    label: 'Отчет готов',
    bg: 'var(--status-ready-bg)',
    fg: 'var(--status-ready-fg)',
    dot: 'var(--status-ready-dot)'
  }
};
function StatusBadge({
  status = 'new',
  label,
  className = '',
  ...rest
}) {
  const s = STATUS[status] || STATUS.new;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['ock-status', className].filter(Boolean).join(' '),
    style: {
      background: s.bg,
      color: s.fg
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ock-status__dot",
    style: {
      background: s.dot
    }
  }), label || s.label);
}
Object.assign(__ds_scope, { STATUS, StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Data table. Pass `columns` + `rows` for the data-driven form, or use the
 * exported Table.Head/Body helpers via children for full control.
 */
function Table({
  columns,
  rows,
  getRowKey,
  numeric = false,
  onRowClick,
  className = '',
  children,
  ...rest
}) {
  const cls = ['ock-table', numeric ? 'ock-table--num' : '', className].filter(Boolean).join(' ');
  if (!columns) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ock-table-wrap"
    }, /*#__PURE__*/React.createElement("table", _extends({
      className: cls
    }, rest), children));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ock-table-wrap"
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: getRowKey ? getRowKey(row, i) : row.id ?? i,
    onClick: onRowClick ? () => onRowClick(row, i) : undefined,
    style: onRowClick ? {
      cursor: 'pointer'
    } : undefined
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left'
    }
  }, c.render ? c.render(row, i) : row[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Underline tab bar. Controlled via `value`/`onChange`, items as [{value,label,count}].
 */
function Tabs({
  items = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ock-tabs', className].filter(Boolean).join(' '),
    role: "tablist"
  }, rest), items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": active,
      className: `ock-tab${active ? ' ock-tab--active' : ''}`,
      onClick: onChange ? () => onChange(it.value) : undefined
    }, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
      className: "ock-tab__count"
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Check = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3.5 8.5l3 3 6-7",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/**
 * Checkbox or radio (set type="radio"). Label is optional children.
 */
function Checkbox({
  type = 'checkbox',
  label,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const isRadio = type === 'radio';
  const cls = ['ock-check', isRadio ? 'ock-check--radio' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    "data-disabled": disabled ? 'true' : 'false'
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ock-check__box"
  }, isRadio ? /*#__PURE__*/React.createElement("span", {
    className: "ock-check__dot"
  }) : /*#__PURE__*/React.createElement(Check, null)), label || children ? /*#__PURE__*/React.createElement("span", {
    className: "ock-check__label"
  }, label || children) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label, hint, error and affix icons.
 */
function Input({
  label,
  hint,
  error,
  required = false,
  prefix,
  suffix,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const inputId = id || (label ? `in-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const boxCls = ['ock-input', size === 'sm' ? 'ock-input--sm' : '', error ? 'ock-input--error' : '', disabled ? 'ock-input--disabled' : '', className].filter(Boolean).join(' ');
  const control = /*#__PURE__*/React.createElement("div", {
    className: boxCls
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    className: "ock-input__affix"
  }, prefix) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: "ock-input__el",
    disabled: disabled
  }, rest)), suffix ? /*#__PURE__*/React.createElement("span", {
    className: "ock-input__affix"
  }, suffix) : null);
  if (!label && !hint && !error) return control;
  return /*#__PURE__*/React.createElement("div", {
    className: "ock-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ock-field__label",
    htmlFor: inputId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ock-field__req"
  }, "*") : null) : null, control, error ? /*#__PURE__*/React.createElement("span", {
    className: "ock-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ock-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Chevron = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 6l4 4 4-4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/**
 * Native select styled to match Ocenka inputs.
 * Pass options as [{value, label}] or render <option> children.
 */
function Select({
  label,
  hint,
  error,
  required = false,
  options,
  placeholder,
  id,
  className = '',
  children,
  ...rest
}) {
  const selId = id || (label ? `sel-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const control = /*#__PURE__*/React.createElement("div", {
    className: ['ock-select', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: "ock-select__el"
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder) : null, options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("span", {
    className: "ock-select__chev"
  }, /*#__PURE__*/React.createElement(Chevron, null)));
  if (!label && !hint && !error) return control;
  return /*#__PURE__*/React.createElement("div", {
    className: "ock-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ock-field__label",
    htmlFor: selId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ock-field__req"
  }, "*") : null) : null, control, error ? /*#__PURE__*/React.createElement("span", {
    className: "ock-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ock-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * On/off toggle. Use for binary settings (e.g. применять подход).
 */
function Switch({
  label,
  disabled = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['ock-switch', className].filter(Boolean).join(' '),
    "data-disabled": disabled ? 'true' : 'false'
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ock-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ock-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "ock-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// deck-stage.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* ═══ THIS PROJECT USES DESIGN COMPONENTS (.dc.html) ═══
 * Reference this stage from your <x-dc> template as an import — NEVER as a
 * raw <deck-stage> tag plus a <script src> (that hides the whole deck until
 * the stream finishes):
 *
 *   <x-import component-from-global-scope="deck-stage" from="./deck-stage.js"
 *             width="1920" height="1080" hint-size="100%,100%">
 *     <section data-label="Title" style="...">…</section>
 *     <section data-label="Agenda" style="...">…</section>
 *   </x-import>
 *
 * Slides are inline-styled <section> siblings; do not add a stylesheet or a
 * deck-stage:not(:defined) rule. The plain-HTML "Usage" block in the comment
 * below does NOT apply to .dc.html templates.
 */
/* BEGIN USAGE */
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *      On touch devices, tapping the left/right half of the stage goes
 *      prev/next — taps on links, buttons and other interactive slide
 *      content are left alone.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate; ↑/↓ with a thumbnail focused to
 *      step between slides; drag to reorder; right-click for
 *      Skip / Move up / Move down / Duplicate / Delete (Delete opens a
 *      Cancel/Delete confirm dialog). Drag the rail's right edge to resize;
 *      width persists to
 *      localStorage. Skipped slides carry `data-deck-skip`, are dimmed in
 *      the rail, omitted from prev/next navigation, and hidden at print.
 *      The rail is suppressed in presenting mode, in the host's Preview
 *      mode (ViewerMode='none'), on `noscale`, on narrow viewports
 *      (≤640px), and via the `no-rail` attribute. Rail mutations dispatch
 *      a `dc-op` CustomEvent on the element (see docs/dc-ops.md) and do
 *      NOT touch the DOM: the host applies the op and re-renders;
 *      structural rail input is locked until the host posts
 *      {__dc_op_ack: true, applied}.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="deck-stage.js"></script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 *
 * Speaker notes stay in sync because the component posts {slideIndexChanged: N}
 * to the parent — just include the #speaker-notes script tag if asked for notes.
 *
 * Authoring guidance:
 *   - Write slide bodies as static HTML inside <deck-stage>, with sizing via
 *     CSS custom properties in a <style> block rather than JS constants.
 *     Static slide markup is what lets the user click a heading in edit mode
 *     and retype it directly; a slide rendered through <script type="text/babel">,
 *     React, or a loop over a JS array has to round-trip every tweak through a
 *     chat message instead. Reach for script-generated slides only when the
 *     content genuinely needs interactive behaviour static HTML can't express.
 *   - Do NOT set position/inset/width/height on the slide <section> elements —
 *     the component absolutely positions every slotted child for you.
 *   - Entrance animations: make the visible end-state the base style and
 *     animate *from* hidden, so print and reduced-motion show content.
 *     Gate the animation on [data-deck-active] and the motion query, e.g.
 *     `@media (prefers-reduced-motion:no-preference){ [data-deck-active] .x{animation:fade-in .5s both} }`.
 *     Avoid infinite decorative loops on slide content.
 */
/* END USAGE */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const FINE_POINTER_MQ = matchMedia('(hover: hover) and (pointer: fine)');
  const NARROW_MQ = matchMedia('(max-width: 640px)');
  // Slide-authored controls that should keep a tap instead of it navigating.
  const INTERACTIVE_SEL = 'a[href], button, input, select, textarea, summary, label, video[controls], audio[controls], [role="button"], [onclick], [tabindex]:not([tabindex^="-"]), [contenteditable]:not([contenteditable="false" i])';
  const pad2 = n => String(n).padStart(2, '0');

  // Label precedence: data-label → data-screen-label (number stripped) → first heading → "Slide".
  const getSlideLabel = el => {
    const explicit = el.getAttribute('data-label');
    if (explicit) return explicit;
    const existing = el.getAttribute('data-screen-label');
    if (existing) return existing.replace(/^\s*\d+\s*/, '').trim() || existing;
    const h = el.querySelector('h1, h2, h3, [data-title]');
    const t = h && (h.textContent || '').trim().slice(0, 40);
    if (t) return t;
    return 'Slide';
  };
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    /* connectedCallback holds this until document.fonts.ready (capped 2s) so
     * the first visible paint has the deck's real typography + final rail
     * layout. opacity (not visibility) so the active slide can't un-hide
     * itself via the ::slotted([data-deck-active]) visibility:visible rule.
     * Only the stage/rail hide — the black :host background stays, so the
     * iframe doesn't flash the page's default white. */
    :host([data-fonts-pending]) .stage,
    :host([data-fonts-pending]) .rail { opacity: 0; pointer-events: none; }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    @media (max-width: 640px) {
      .rail, .rail-resize { display: none; }
    }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame { outline-color: #D97757; }
    .thumb[data-dragging] { opacity: 0.35; }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that _syncPrintPageRule appends
       to the document (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* :last-child alone isn't enough once data-deck-skip hides the
         trailing slide(s) — the last *visible* slide still carries
         break-after:page and prints a blank sheet. _markLastVisible()
         maintains data-deck-last-visible on the last non-skipped slide. */
      ::slotted(*:last-child),
      ::slotted([data-deck-last-visible]) {
        break-after: auto;
        page-break-after: auto;
      }
      ::slotted([data-deck-skip]) { display: none !important; }
      .overlay, .rail, .rail-resize, .ctxmenu, .confirm-backdrop { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale', 'no-rail'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTap = this._onTap.bind(this);
      this._onMessage = this._onMessage.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = e => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      this.addEventListener('click', this._onTap);
      // Print lays every slide out as its own page, so [data-deck-active]-
      // gated entrance styles need the attribute on every slide (not just
      // the current one) or their content prints at the hidden base style.
      // The transient freeze style lands BEFORE the attributes so any
      // attribute-keyed transition fires at 0s (changing transition-
      // duration after a transition has started doesn't affect it).
      this._onBeforePrint = () => {
        this._syncPrintPageRule();
        if (this._freezeStyle) this._freezeStyle.remove();
        this._freezeStyle = document.createElement('style');
        this._freezeStyle.textContent = '*,*::before,*::after{transition-duration:0s !important}';
        document.head.appendChild(this._freezeStyle);
        this._slides.forEach(s => s.setAttribute('data-deck-active', ''));
      };
      this._onAfterPrint = () => {
        this._applyIndex({
          showOverlay: false,
          broadcast: false
        });
        if (this._freezeStyle) {
          this._freezeStyle.remove();
          this._freezeStyle = null;
        }
      };
      window.addEventListener('beforeprint', this._onBeforePrint);
      window.addEventListener('afterprint', this._onAfterPrint);
      // Initial collection + layout happens via slotchange, which fires on mount.
      this._enableRail();
      // Hold the stage hidden until webfonts are ready so the first visible
      // paint has the deck's real typography — the :not(:defined) guard in
      // the page HTML only covers custom-element upgrade, not font load.
      // Capped so a 404'd font URL can't blank the deck indefinitely.
      this.setAttribute('data-fonts-pending', '');
      const reveal = () => this.removeAttribute('data-fonts-pending');
      // Unconditional cap — rAF can be suspended in a hidden iframe, which
      // would strand the one inside the rAF callback.
      setTimeout(reveal, 2000);
      // rAF first: fonts.ready is a pre-resolved promise until layout has
      // resolved the slotted text's font-family and pushed a FontFace into
      // 'loading'. Reading it here in connectedCallback (parse-time) would
      // settle the race in a microtask before any font fetch starts.
      requestAnimationFrame(() => {
        Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 2000))]).then(reveal, reveal);
      });
    }
    _enableRail() {
      // Idempotent — older host builds still post __omelette_rail_enabled.
      // no-rail guard keeps the observers/stylesheet walk off the cheap path
      // for presenter-popup thumbnail iframes (up to 9 per view).
      if (this._railEnabled || this.hasAttribute('no-rail')) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav doesn't trigger spurious
      // refreshes — except data-deck-skip, which now arrives from the host
      // re-render and is what updates the rail badge, print bookkeeping,
      // and deckSkipped re-broadcast.
      const OWN_ATTRS = /^data-(deck-(?!skip$)|screen-label$|om-validate$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver(records => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          // Skip/unskip is handled below without re-cloning (the badge sits
          // on the thumb wrapper, not the clone) — don't mark the slide
          // dirty for an attr change whose only visible effect is the badge.
          if (n && this._slideSet && this._slideSet.has(n) && !(r.type === 'attributes' && r.attributeName === 'data-deck-skip')) {
            this._liveDirty.add(n);
          }
          // Host-driven skip toggle: sync the rail badge + print + presenter
          // skipped-list the way _toggleSkip used to do locally.
          if (r.type === 'attributes' && r.attributeName === 'data-deck-skip' && n && this._slideSet && this._slideSet.has(n)) {
            const i = this._slides.indexOf(n);
            if (this._thumbs && this._thumbs[i]) {
              if (n.hasAttribute('data-deck-skip')) this._thumbs[i].thumb.setAttribute('data-skip', '');else this._thumbs[i].thumb.removeAttribute('data-skip');
            }
            this._markLastVisible();
            try {
              window.postMessage({
                slideIndexChanged: this._index,
                deckTotal: this._slides.length,
                deckSkipped: this._skippedIndices()
              }, '*');
            } catch (e) {}
          }
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach(s => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, {
        root: this._rail,
        rootMargin: '400px 0px'
      });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach(t => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      this._snapshotAuthorCss();
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map(sh => {
        try {
          return Array.from(sh.cssRules).map(r => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n')
      // The shadow host is featureless outside the functional :host(...)
      // form, so any compound on :root — [attr], .class, #id, :pseudo —
      // must become :host(<compound>) not :host<compound>. Same for the
      // html type selector (Tailwind class-strategy dark mode emits
      // html.dark; Pico uses html[data-theme]), which has nothing to
      // match inside the thumb's shadow tree.
      .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)').replace(/:root\b/g, ':host').replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)').replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }
    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang') && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach(p => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());else host.style.removeProperty(p);
      });
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      window.removeEventListener('beforeprint', this._onBeforePrint);
      window.removeEventListener('afterprint', this._onAfterPrint);
      if (this._freezeStyle) {
        this._freezeStyle.remove();
        this._freezeStyle = null;
      }
      this.removeEventListener('click', this._onTap);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-omelette-chrome', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-omelette-chrome', '');
      // Edit mode hooks wheel to pan the canvas; this opts the rail's own
      // scrollview out so thumbnails stay scrollable while editing.
      rail.setAttribute('data-dc-wheel-passthru', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });
      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-omelette-chrome', '');
      menu.innerHTML = `
        <button type="button" data-act="skip">Skip slide</button>
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <button type="button" data-act="duplicate">Duplicate slide</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        this._closeMenu();
        if (act === 'skip') this._toggleSkip(i);else if (act === 'up') this._moveSlide(i, i - 1);else if (act === 'down') this._moveSlide(i, i + 1);else if (act === 'duplicate') this._duplicateSlide(i);else if (act === 'delete') this._openConfirm(i);
      });
      menu.addEventListener('contextmenu', e => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-omelette-chrome', '');
      resize.addEventListener('pointerdown', e => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = ev => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try {
            localStorage.setItem('deck-stage.railWidth', String(this._railPx));
          } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-omelette-chrome', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', e => {
        if (e.target === confirm) this._closeConfirm();
      });
      confirm.querySelector('.cancel').addEventListener('click', () => this._closeConfirm());
      confirm.querySelector('.danger').addEventListener('click', () => {
        const i = this._confirmIndex;
        this._closeConfirm();
        this._deleteSlide(i);
      });
      this._root.append(style, rail, resize, stage, overlay, menu, confirm);
      this._canvas = canvas;
      this._stage = stage;
      this._slot = slot;
      this._overlay = overlay;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }
    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. (Re-)append so any author @page landing later in
     *  source order can't reintroduce a margin and push each slide onto
     *  two sheets; called again from beforeprint. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      (document.body || document.head).appendChild(tag);
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } ' +
      // Jump authored animations/transitions to their end state so print
      // never captures mid-entrance — pairs with the beforeprint handler
      // in connectedCallback that sets data-deck-active on every slide.
      '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }
    _onSlotChange() {
      // Self-mutate path already reconciled synchronously and emitted
      // slidechange; skip the async slotchange it caused.
      if (this._squelchSlotChange) {
        this._squelchSlotChange = false;
        return;
      }
      // Primary lock-clear is the host's __deck_rail_ack; this clears on a
      // dropped ack so the rail can't stay dead.
      this._railLock = false;
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        slide.setAttribute('data-screen-label', `${pad2(n)} ${getSlideLabel(slide)}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._markLastVisible();
      this._renderRail();
    }

    /** Tag the last non-skipped slide so print CSS can drop its
     *  break-after (see the @media print comment above — :last-child
     *  alone matches a hidden skipped slide). */
    _markLastVisible() {
      let last = null;
      this._slides.forEach(s => {
        s.removeAttribute('data-deck-last-visible');
        if (!s.hasAttribute('data-deck-skip')) last = s;
      });
      if (last) last.setAttribute('data-deck-last-visible', '');
    }
    _loadNotes() {
      // Per-slide data-speaker-notes is authoritative when present (attrs
      // travel with the element on reorder/dup/delete); a slide without
      // the attr falls through to the legacy #speaker-notes JSON array
      // PER SLIDE so a single attr on a JSON-authored deck doesn't blank
      // the rest.
      const tag = document.getElementById('speaker-notes');
      let json = null;
      if (tag) try {
        const p = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(p)) json = p;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
      }
      this._notes = this._slides.map((s, i) => {
        const a = s.getAttribute('data-speaker-notes');
        return a !== null ? a : json && typeof json[i] === 'string' ? json[i] : '';
      });
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr,
            deckTotal: this._slides.length,
            deckSkipped: this._skippedIndices()
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      // Host posts __omelette_presenting while in fullscreen/tab presentation
      // mode — suppress the nav footer entirely (both hover and slide-change
      // flash) so the audience sees clean slides.
      if (!this._overlay || this._presenting) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail') || this.hasAttribute('noscale') || this._presenting || this._previewMode || NARROW_MQ.matches) return 0;
      return this._railPx || 0;
    }
    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region.
      if (this._overlay) this._overlay.style.marginLeft = rw / 2 + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
      // Crossing the narrow-viewport breakpoint reveals the rail — rerun the
      // thumbnail scale the same way _setRailWidth does.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        this._presenting = d.__omelette_presenting;
        if (this._presenting && this._overlay) {
          this._overlay.removeAttribute('data-visible');
          if (this._hideTimer) clearTimeout(this._hideTimer);
        }
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Host's Preview segment (ViewerMode='none'): the rail's drag-reorder /
      // right-click skip-delete affordances are editing chrome, so hide it
      // while the user is just looking at the deck. Same hard-hide path as
      // presenting; independent of the user's _railVisible preference so
      // returning to Edit restores whatever they had.
      if (d && typeof d.__omelette_preview_mode === 'boolean') {
        if (d.__omelette_preview_mode === this._previewMode) return;
        this._previewMode = d.__omelette_preview_mode;
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Host has processed a dc-op; rail input is safe again. Not tied to
      // slotchange — setAttr and refusal don't fire one. On refusal,
      // revert the optimistic _index/hash adjustment so the next nav
      // starts from what's actually on screen.
      if (d && d.__dc_op_ack) {
        this._railLock = false;
        if (d.applied === false && this._indexBeforeEmit != null) {
          this._index = this._indexBeforeEmit;
          try {
            history.replaceState(null, '', '#' + (this._index + 1));
          } catch (e) {}
        }
        this._indexBeforeEmit = null;
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try {
          localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0');
        } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }
    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off,
      // presentation mode, and the host's Preview segment — instant, no
      // transition. data-user-hidden is the soft hide (translateX(-100%))
      // for the viewer's rail toggle, so show/hide slides under
      // :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting || this._previewMode;
      if (hard) this._rail.setAttribute('data-presenting', '');else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }
    _onTap(e) {
      // Touch-only — keyboard + the overlay toolbar cover nav on desktop.
      if (FINE_POINTER_MQ.matches) return;
      // Only taps that land on the stage (slide content or letterbox); the
      // overlay / rail / menus are siblings with their own click handlers.
      const path = e.composedPath();
      if (!this._stage || !path.includes(this._stage)) return;
      // Let interactive slide content keep the tap. composedPath (not
      // e.target.closest) so we see through open shadow roots — a <button>
      // inside a slide-authored custom element retargets e.target to the
      // host but still appears in the composed path.
      if (e.defaultPrevented) return;
      for (const n of path) {
        if (n === this._stage) break;
        if (n.matches && n.matches(INTERACTIVE_SEL)) return;
      }
      e.preventDefault();
      const rw = this._railWidth();
      const mid = rw + (window.innerWidth - rw) / 2;
      this._advance(e.clientX < mid ? -1 : 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') {
          this._closeConfirm();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    /** Step forward/back skipping any slide marked data-deck-skip. Falls
     *  back to _go's clamp-at-ends behaviour (flash overlay) when there's
     *  nothing further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length && this._slides[i].hasAttribute('data-deck-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) {
        this._flashOverlay();
        return;
      }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) {
        this._thumbs = [];
        return;
      }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({
        thumb,
        slide,
        host
      }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach(t => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach(slide => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach(t => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        t.num.textContent = String(i + 1);
        if (t.slide.hasAttribute('data-deck-skip')) t.thumb.setAttribute('data-skip', '');else t.thumb.removeAttribute('data-skip');
      });
      this._thumbs = next;
      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({
          thumb,
          slide
        }) => {
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach(t => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach(t => {
            t.style.transition = '';
          }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);
      const entry = {
        thumb,
        num,
        frame,
        slide,
        clone: null,
        host: null,
        i: -1
      };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;
      thumb.addEventListener('click', () => this._go(idx(), 'click'));
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({
          preventScroll: true
        });
      });
      thumb.addEventListener('contextmenu', e => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', e => {
        this._dragFrom = idx();
        thumb.setAttribute('data-dragging', '');
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(this._dragFrom));
        } catch (err) {}
      });
      thumb.addEventListener('dragend', () => {
        thumb.removeAttribute('data-dragging');
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });
      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth,
        dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      clone.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes so a component-heavy deck doesn't run N copies
      // of each component's mount logic in the rail. Children are
      // preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content; the querySelectorAll NodeList
      // is static, so nested custom elements in the moved subtree are
      // still visited on later iterations.
      const neuter = el => {
        const box = document.createElement('div');
        box.style.cssText = (el.getAttribute('style') || '') + ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);';
        box.className = el.className;
        // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
        // descendant selectors still match the neutered root.
        for (const a of el.attributes) {
          const n = a.name;
          if (n.startsWith('data-') || n.startsWith('aria-') || n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
            box.setAttribute(n, a.value);
          }
        }
        while (el.firstChild) box.appendChild(el.firstChild);
        return box;
      };
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = neuter(clone);
      clone.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(neuter(el));
      });
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' + 'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' + 'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({
        mode: 'open'
      });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find(t => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }
    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({
        clone
      }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }
    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }
    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }
    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({
        thumb
      }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({
              block: 'nearest'
            });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }
    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      const slide = this._slides[i];
      const skip = slide && slide.hasAttribute('data-deck-skip');
      this._menu.querySelector('[data-act="skip"]').textContent = skip ? 'Unskip slide' : 'Skip slide';
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      this._menu.querySelector('[data-act="delete"]').disabled = this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }
    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
    }
    _openConfirm(i) {
      if (!this._confirm) return;
      this._confirmIndex = i;
      this._confirm.querySelector('.title').textContent = 'Delete slide ' + (i + 1) + '?';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }
    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmIndex = -1;
    }

    /** Rail mutations. When a dc-runtime is present (`window.__dcUpdate`)
     *  the host owns the light DOM — handlers emit a dc-op only and the
     *  host applies it (to the editor's model or to the source file) and
     *  re-renders via dc-runtime; slotchange catches the rail up.
     *  Structural ops lock rail input until the host acks so a rapid second
     *  click can't address a stale index; setAttr/removeAttr respect the
     *  lock but don't set it (indices unchanged; the host serializes).
     *  `newIndex` is written to location.hash so slotchange's
     *  _restoreIndex lands on the right slide.
     *
     *  With NO dc-runtime (a raw .html deck), there's no re-render path,
     *  so handlers self-mutate locally for an instant update and emit
     *  `emitOnly: false`; the host persists to disk without
     *  re-rendering over the already-mutated DOM.
     *
     *  See docs/dc-ops.md for the contract. */
    _emitDcOp(op, slide, lock, newIndex) {
      // Slide index (template/script/style filtered — same as
      // _collectSlides). deck-stage is a filtered-index dc-op emitter;
      // the host resolves against findDeckStage().slideTids. Callers
      // already pass `to` as a slide index.
      op.at = this._slides.indexOf(slide);
      op.witness = {
        childCount: this._slides.length
      };
      // dc-runtime wraps an <x-import>-mounted component in a
      // <div class="sc-host-x" data-dc-tpl="N"> host — the stamp is on the
      // WRAPPER, not this element. closest() finds it (or this element's
      // own stamp when directly templated).
      const host = this.closest('[data-dc-tpl]');
      const tid = host && host.getAttribute('data-dc-tpl');
      op.mount = {
        tid: tid !== null ? parseInt(tid, 10) : null,
        tag: 'deck-stage'
      };
      op.emitOnly = !!window.__dcUpdate;
      if (op.emitOnly) {
        if (lock) this._railLock = true;
        if (newIndex != null && newIndex !== this._index) {
          this._indexBeforeEmit = this._index;
          this._index = newIndex;
          try {
            history.replaceState(null, '', '#' + (newIndex + 1));
          } catch (e) {}
        }
      }
      this.dispatchEvent(new CustomEvent('dc-op', {
        detail: op,
        bubbles: true,
        composed: true
      }));
      return op.emitOnly;
    }
    _deleteSlide(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const cur = this._index;
      const ni = i < cur || i === cur && i === this._slides.length - 1 ? cur - 1 : cur;
      if (this._emitDcOp({
        op: 'remove'
      }, slide, true, ni)) return;
      this._index = ni;
      this._squelchSlotChange = true;
      slide.remove();
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _duplicateSlide(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide) return;
      if (this._emitDcOp({
        op: 'duplicate'
      }, slide, true, i + 1)) return;
      const copy = slide.cloneNode(true);
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      this._index = i + 1;
      this._squelchSlotChange = true;
      this.insertBefore(copy, slide.nextSibling);
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _toggleSkip(i) {
      if (this._railLock) return;
      const slide = this._slides[i];
      if (!slide) return;
      const on = !slide.hasAttribute('data-deck-skip');
      if (this._emitDcOp(on ? {
        op: 'setAttr',
        attr: 'data-deck-skip',
        value: ''
      } : {
        op: 'removeAttr',
        attr: 'data-deck-skip'
      }, slide, false)) return;
      if (on) slide.setAttribute('data-deck-skip', '');else slide.removeAttribute('data-deck-skip');
    }
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-skip')) out.push(i);
      }
      return out;
    }
    _moveSlide(i, j) {
      if (this._railLock || j < 0 || j >= this._slides.length || j === i) return;
      const cur = this._index;
      const ni = cur === i ? j : i < cur && j >= cur ? cur - 1 : i > cur && j <= cur ? cur + 1 : cur;
      const slide = this._slides[i];
      if (this._emitDcOp({
        op: 'move',
        to: j
      }, slide, true, ni)) return;
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      this._index = ni;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._collectSlides();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'mutation'
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._advance(1, 'api');
    }
    prev() {
      this._advance(-1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "deck-stage.js", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/AnalogsScreenV2.jsx
try { (() => {
/* Analogs screen with detail modal — window.AnalogsScreen */
window.AnalogsScreenV2 = function AnalogsScreenV2({
  onNavigate
}) {
  const {
    Card,
    Button,
    Badge
  } = NS;
  const D = window.OcenkaData;
  const [statuses, setStatuses] = React.useState(() => {
    const m = {};
    D.analogsDetailed.forEach(a => {
      m[a.id] = a.active;
    });
    return m;
  });
  const [selectedId, setSelectedId] = React.useState(null);
  const selected = D.analogsDetailed.find(a => a.id === selectedId);
  const toggleStatus = id => setStatuses(s => ({
    ...s,
    [id]: !s[id]
  }));
  const compBadge = c => {
    if (c === 'high') return /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      pill: true,
      dot: true
    }, "\u0412\u044B\u0441\u043E\u043A\u0430\u044F");
    if (c === 'check') return /*#__PURE__*/React.createElement(Badge, {
      tone: "warning",
      pill: true
    }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C");
    return /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      pill: true
    }, "\u0421\u0440\u0435\u0434\u043D\u044F\u044F");
  };
  const TH = ({
    children,
    right
  }) => /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 14px',
      textAlign: right ? 'right' : 'left',
      fontWeight: 700,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      borderBottom: '1px solid var(--divider)',
      whiteSpace: 'nowrap',
      background: 'var(--surface-inset)'
    }
  }, children);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u0432",
    subtitle: "\u041E\u0431\u044A\u0435\u043A\u0442 \u041E\u0417-1040 \xB7 \u0416\u0438\u043B\u043E\u0439 \u0434\u043E\u043C, \u043F\u043E\u0441. \u0411\u0430\u0440\u0432\u0438\u0445\u0430",
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "m",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "plus",
        size: 16
      })
    }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E"), /*#__PURE__*/React.createElement(Button, {
      key: "a",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "sparkles",
        size: 16
      })
    }, "\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u0430\u043D\u0430\u043B\u043E\u0433\u0438")]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginBottom: 20
    }
  }, [{
    l: 'Найдено аналогов',
    v: '4',
    i: 'git-compare',
    t: 'brand'
  }, {
    l: 'Средняя цена за м²',
    v: '119 559 ₽',
    i: 'ruler',
    t: 'brand'
  }, {
    l: 'Радиус поиска',
    v: '4.0 км',
    i: 'map-pin',
    t: 'brand'
  }, {
    l: 'Высокая сопоставимость',
    v: '2',
    i: 'badge-check',
    t: 'accent'
  }].map((s, i) => /*#__PURE__*/React.createElement(NS.KpiCard, {
    key: i,
    label: s.l,
    value: s.v,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: s.i,
      size: 18
    }),
    iconTone: s.t
  }))), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true,
    title: "\u041E\u0431\u044A\u0435\u043A\u0442\u044B-\u0430\u043D\u0430\u043B\u043E\u0433\u0438",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "info"
    }, "\u0426\u0418\u0410\u041D \xB7 \u0410\u0432\u0438\u0442\u043E \xB7 Domclick")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(TH, null, "\u0410\u0434\u0440\u0435\u0441 / \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A"), /*#__PURE__*/React.createElement(TH, {
    right: true
  }, "\u0426\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(TH, {
    right: true
  }, "\u041C\xB2"), /*#__PURE__*/React.createElement(TH, {
    right: true
  }, "\u20BD/\u043C\xB2"), /*#__PURE__*/React.createElement(TH, null, "\u0420\u0430\u0441\u0441\u0442."), /*#__PURE__*/React.createElement(TH, null, "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435"), /*#__PURE__*/React.createElement(TH, {
    right: true
  }, "\u041A\u043E\u0440\u0440\u0435\u043A\u0442."), /*#__PURE__*/React.createElement(TH, {
    right: true
  }, "\u0421\u043A\u043E\u0440\u0440. \u0446\u0435\u043D\u0430"), /*#__PURE__*/React.createElement(TH, null, "\u0421\u043E\u043F\u043E\u0441\u0442."))), /*#__PURE__*/React.createElement("tbody", null, D.analogsDetailed.map(a => {
    const active = statuses[a.id];
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id,
      onClick: () => setSelectedId(a.id),
      style: {
        cursor: 'pointer',
        transition: 'background .1s'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-inset)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)',
        fontSize: 'var(--text-sm)'
      }
    }, a.addr), !active && /*#__PURE__*/React.createElement(Badge, {
      tone: "danger",
      pill: true
    }, "\u0421\u043D\u044F\u0442\u043E")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, a.source)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        textAlign: 'right',
        fontSize: 'var(--text-sm)'
      }
    }, (a.price / 1e6).toFixed(1), " \u043C\u043B\u043D"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        textAlign: 'right',
        fontSize: 'var(--text-sm)'
      }
    }, a.area, " \u043C\xB2"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        textAlign: 'right',
        fontSize: 'var(--text-sm)'
      }
    }, Math.round(a.perM2 / 1000), " \u0442\u044B\u0441."), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        fontSize: 'var(--text-sm)'
      }
    }, a.dist), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        fontSize: 'var(--text-sm)'
      }
    }, a.cond), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        textAlign: 'right',
        fontWeight: 600,
        fontSize: 'var(--text-sm)',
        color: a.adj.startsWith('−') ? 'var(--danger-text)' : 'var(--success-text)'
      }
    }, a.adj), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)',
        textAlign: 'right',
        fontWeight: 700,
        fontSize: 'var(--text-sm)',
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, a.final, " \u20BD"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '13px 14px',
        borderBottom: '1px solid var(--divider)'
      }
    }, compBadge(a.comp)));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      background: 'var(--surface-inset)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043A\u043E\u0440\u0440. \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      color: 'var(--text-value)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, "23 207 300 \u20BD"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right",
      size: 15
    }),
    onClick: () => onNavigate('calc')
  }, "\u0412 \u0440\u0430\u0441\u0447\u0435\u0442")))), selected ? /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) setSelectedId(null);
    },
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.5)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 860,
      maxWidth: '94vw',
      maxHeight: '88vh',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: '1px solid var(--divider)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, selected.addr), /*#__PURE__*/React.createElement(Badge, {
    tone: statuses[selected.id] ? 'success' : 'danger',
    pill: true,
    dot: statuses[selected.id]
  }, statuses[selected.id] ? 'Активное объявление' : 'Объявление снято'), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, selected.source)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, selected.fullAddr)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedId(null),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      padding: 6,
      borderRadius: 'var(--radius-sm)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "x",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ds-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(selected.photos, 4)}, 1fr)`,
      gap: 10,
      marginBottom: 24
    }
  }, Array.from({
    length: Math.min(selected.photos, 4)
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '4/3',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 6,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "image",
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)'
    }
  }, "\u0424\u043E\u0442\u043E ", i + 1)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      color: 'var(--text-muted)',
      marginBottom: 14
    }
  }, "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u043E\u0431\u044A\u0435\u043A\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C",
    value: `${selected.area} м²`
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u042D\u0442\u0430\u0436\u0435\u0439",
    value: String(selected.floors)
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0413\u043E\u0434 \u043F\u043E\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    value: String(selected.year)
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041C\u0430\u0442\u0435\u0440. \u0441\u0442\u0435\u043D",
    value: selected.wallMaterial
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
    value: selected.cond
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0423\u0447\u0430\u0441\u0442\u043E\u043A",
    value: selected.plotArea
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      color: 'var(--text-muted)',
      marginBottom: 14
    }
  }, "\u0426\u0435\u043D\u043E\u0432\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      background: 'var(--surface-inset)',
      borderRadius: 'var(--radius-md)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "\u0426\u0435\u043D\u0430 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-3xl)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 4
    }
  }, (selected.price / 1e6).toFixed(1), " \u043C\u043B\u043D \u20BD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      background: 'var(--surface-inset)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginTop: 2
    }
  }, selected.perM2.toLocaleString('ru'), " \u20BD")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      background: 'var(--surface-inset)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "\u0420\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginTop: 2
    }
  }, selected.dist))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0438\u0437 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 1.65
    }
  }, selected.description)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      color: 'var(--text-muted)',
      marginBottom: 10
    }
  }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0435 \u043F\u043E\u043F\u0440\u0430\u0432\u043A\u0438"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, selected.adjRows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '11px 16px',
      borderBottom: i < selected.adjRows.length - 1 ? '1px solid var(--divider)' : 'none',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, r.factor), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: r.pct < 0 ? 'var(--danger-text)' : 'var(--success-text)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.pct > 0 ? '+' : '', r.pct, "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '11px 16px',
      background: 'var(--surface-inset)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0421\u043A\u043E\u0440\u0440. \u0446\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(selected.perM2 * (1 + selected.adjRows.reduce((s, r) => s + r.pct, 0) / 100)).toLocaleString('ru'), " \u20BD")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      background: 'var(--surface-inset)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "external-link",
    size: 16,
    style: {
      color: 'var(--text-link)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: selected.url,
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: 'var(--text-link)',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-mono)',
      wordBreak: 'break-all',
      flex: 1
    },
    onClick: e => e.stopPropagation()
  }, selected.url), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, "\u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ", selected.addedDate))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 24px',
      borderTop: '1px solid var(--divider)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleStatus(selected.id),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 16px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${statuses[selected.id] ? 'var(--danger)' : 'var(--success)'}`,
      background: 'transparent',
      color: statuses[selected.id] ? 'var(--danger-text)' : 'var(--success-text)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: statuses[selected.id] ? 'ban' : 'circle-check-big',
    size: 16
  }), statuses[selected.id] ? 'Отметить объявление как снятое' : 'Восстановить активный статус'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setSelectedId(null)
  }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "pencil",
      size: 15
    })
  }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u043F\u0440\u0430\u0432\u043A\u0438"))))) : null);
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/AnalogsScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/AnalyticsScreen.jsx
try { (() => {
/* Market analytics — charts from analogs + objects base. window.AnalyticsScreen */

/* ── ChartBox: Chart.js wrapper — defined OUTSIDE AnalyticsScreen ─────────── */
function ChartBox({
  title,
  chartType,
  labels,
  values,
  height,
  horizontal,
  multiDatasets
}) {
  const h = height || 240;
  const ref = React.useRef(null);
  const inst = React.useRef(null);
  const PALETTE = ['#2A6FDB', '#25A871', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#64748B'];
  const depKey = JSON.stringify({
    labels,
    values,
    chartType,
    horizontal,
    multiDatasets
  });
  React.useEffect(() => {
    if (!window.Chart || !ref.current) return;
    if (inst.current) {
      inst.current.destroy();
      inst.current = null;
    }
    if (!labels || !labels.length) return;
    const datasets = multiDatasets || [{
      data: values,
      backgroundColor: chartType === 'doughnut' || chartType === 'pie' ? labels.map((_, i) => PALETTE[i % PALETTE.length]) : PALETTE[0],
      borderRadius: chartType === 'bar' ? 5 : 0,
      borderSkipped: false
    }];
    inst.current = new window.Chart(ref.current, {
      type: chartType,
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: horizontal ? 'y' : 'x',
        plugins: {
          legend: {
            display: chartType === 'doughnut' || chartType === 'pie' || !!multiDatasets,
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                if (chartType === 'doughnut' || chartType === 'pie') return ` ${ctx.raw} объект.`;
                return ` ${ctx.raw.toLocaleString('ru')} тыс. ₽/м²`;
              }
            }
          }
        },
        scales: chartType === 'doughnut' || chartType === 'pie' ? {} : {
          x: {
            grid: {
              color: 'rgba(0,0,0,.05)'
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(0,0,0,.05)'
            },
            ticks: {
              font: {
                size: 11
              },
              callback: v => horizontal ? v : v + 'т'
            }
          }
        }
      }
    });
    return () => {
      if (inst.current) {
        inst.current.destroy();
        inst.current = null;
      }
    };
  }, [depKey]);
  return /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 12
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: h
    }
  }, !labels || !labels.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-subtle)',
      fontSize: 'var(--text-sm)'
    }
  }, "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u0444\u0438\u043B\u044C\u0442\u0440\u0430") : /*#__PURE__*/React.createElement("canvas", {
    ref: ref
  })));
}

/* ── Utility ─────────────────────────────────────────────────────────────── */
function groupAvg(items, keyFn, valFn) {
  const g = {};
  items.forEach(p => {
    const k = keyFn(p);
    if (!g[k]) g[k] = [];
    g[k].push(valFn(p));
  });
  const out = {};
  Object.entries(g).forEach(([k, vs]) => {
    out[k] = Math.round(vs.reduce((a, b) => a + b, 0) / vs.length);
  });
  return out;
}
function groupCount(items, keyFn) {
  const g = {};
  items.forEach(p => {
    const k = keyFn(p);
    g[k] = (g[k] || 0) + 1;
  });
  return g;
}

/* ── Main screen ─────────────────────────────────────────────────────────── */
window.AnalyticsScreen = function AnalyticsScreen() {
  const D = window.OcenkaData;
  const all = D.analyticsProps || [];
  const [filt, setFilt] = React.useState({
    useType: 'all',
    cls: 'all',
    era: 'all',
    line: 'all',
    propType: 'all'
  });
  const set = (k, v) => setFilt(f => ({
    ...f,
    [k]: v
  }));
  const filtered = all.filter(p => (filt.useType === 'all' || p.useType === filt.useType) && (filt.cls === 'all' || p.class === filt.cls) && (filt.era === 'all' || p.era === filt.era) && (filt.line === 'all' || p.line === filt.line) && (filt.propType === 'all' || p.type === filt.propType));
  const n = filtered.length;
  const avgM2 = n ? Math.round(filtered.reduce((s, p) => s + p.pricePerM2, 0) / n) : 0;
  const srtd = [...filtered].sort((a, b) => a.pricePerM2 - b.pricePerM2);
  const medM2 = srtd.length ? srtd[Math.floor(srtd.length / 2)]?.pricePerM2 : 0;
  const maxM2 = n ? Math.max(...filtered.map(p => p.pricePerM2)) : 0;
  const minM2 = n ? Math.min(...filtered.map(p => p.pricePerM2)) : 0;
  const fmt1000 = v => Math.round(v / 1000);

  /* Chart data */
  const byDistrict = groupAvg(filtered, p => p.district, p => p.pricePerM2);
  const byClass = groupAvg(filtered, p => p.class, p => p.pricePerM2);
  const byEra = groupAvg(filtered, p => p.era, p => p.pricePerM2);
  const byWall = groupAvg(filtered, p => p.wallMaterial, p => p.pricePerM2);
  const byType = groupCount(filtered, p => p.type);
  const byCond = groupAvg(filtered, p => p.cond, p => p.pricePerM2);

  /* Floors bucketed */
  const floorBkt = {
    '1–5': {
      vals: []
    },
    '6–10': {
      vals: []
    },
    '11–20': {
      vals: []
    },
    '20+': {
      vals: []
    }
  };
  filtered.forEach(p => {
    if (p.floors <= 5) floorBkt['1–5'].vals.push(p.pricePerM2);else if (p.floors <= 10) floorBkt['6–10'].vals.push(p.pricePerM2);else if (p.floors <= 20) floorBkt['11–20'].vals.push(p.pricePerM2);else floorBkt['20+'].vals.push(p.pricePerM2);
  });
  const flrLabels = Object.keys(floorBkt).filter(k => floorBkt[k].vals.length > 0);
  const flrData = flrLabels.map(k => {
    const vs = floorBkt[k].vals;
    return vs.length ? fmt1000(vs.reduce((a, b) => a + b, 0) / vs.length) : 0;
  });

  /* Помощник: объект → массивы (отсортированные) */
  function toChart(obj, orderArr, mapFn) {
    const keys = orderArr ? orderArr.filter(k => obj[k] != null) : Object.keys(obj);
    return {
      labels: keys.map(mapFn || (k => k)),
      values: keys.map(k => fmt1000(obj[k]))
    };
  }
  const distC = toChart(byDistrict, null);
  const classC = toChart(byClass, ['Эконом', 'Комфорт', 'Бизнес']);
  const eraC = toChart(byEra, ['Хрущевка', 'Советская', 'Сталинка', 'Новостройка']);
  const wallC = toChart(byWall, null);
  const condC = toChart(byCond, ['Под ремонт', 'Удовл.', 'Хорошее', 'Отличное']);
  const typeC = {
    labels: Object.keys(byType),
    values: Object.values(byType)
  };

  /* Filter pill */
  const FilterPill = ({
    label,
    value,
    options
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600,
      flexShrink: 0
    }
  }, label, ":"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    onClick: () => set(o.k, o.v),
    style: {
      padding: '4px 10px',
      border: 'none',
      borderRadius: 999,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      transition: 'all .12s',
      background: value === o.v ? 'var(--blue-600)' : 'var(--surface-inset)',
      color: value === o.v ? '#fff' : 'var(--text-body)'
    }
  }, o.l))));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u044B\u043D\u043A\u0430",
    subtitle: `${all.length} объектов в базе · ${n} в выборке · данные из аналогов и объектов оценки`
  }), /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      padding: '14px 20px',
      marginBottom: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u0422\u0438\u043F",
    value: filt.useType,
    options: [{
      k: 'useType',
      v: 'all',
      l: 'Все'
    }, {
      k: 'useType',
      v: 'Жилой',
      l: 'Жилые'
    }, {
      k: 'useType',
      v: 'Коммерческий',
      l: 'Коммерческие'
    }]
  }), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u041A\u043B\u0430\u0441\u0441",
    value: filt.cls,
    options: [{
      k: 'cls',
      v: 'all',
      l: 'Все'
    }, {
      k: 'cls',
      v: 'Эконом',
      l: 'Эконом'
    }, {
      k: 'cls',
      v: 'Комфорт',
      l: 'Комфорт'
    }, {
      k: 'cls',
      v: 'Бизнес',
      l: 'Бизнес'
    }]
  }), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u042D\u043F\u043E\u0445\u0430",
    value: filt.era,
    options: [{
      k: 'era',
      v: 'all',
      l: 'Все'
    }, {
      k: 'era',
      v: 'Хрущевка',
      l: 'Хрущевка'
    }, {
      k: 'era',
      v: 'Советская',
      l: 'Советская'
    }, {
      k: 'era',
      v: 'Сталинка',
      l: 'Сталинка'
    }, {
      k: 'era',
      v: 'Новостройка',
      l: 'Новостройка'
    }]
  }), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u041B\u0438\u043D\u0438\u044F",
    value: filt.line,
    options: [{
      k: 'line',
      v: 'all',
      l: 'Все'
    }, {
      k: 'line',
      v: '1-я линия',
      l: '1-я'
    }, {
      k: 'line',
      v: '2-я линия',
      l: '2-я'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginBottom: 20
    }
  }, [{
    l: 'Средняя цена за м²',
    v: `${fmt1000(avgM2)} тыс. ₽`,
    i: 'trending-up',
    t: 'brand'
  }, {
    l: 'Медиана цены за м²',
    v: `${fmt1000(medM2)} тыс. ₽`,
    i: 'activity',
    t: 'brand'
  }, {
    l: 'Объектов в выборке',
    v: String(n),
    i: 'database',
    t: 'accent'
  }, {
    l: 'Разброс цен',
    v: `${fmt1000(minM2)}–${fmt1000(maxM2)} тыс. ₽`,
    i: 'arrow-left-right',
    t: 'warning'
  }].map((k, i) => /*#__PURE__*/React.createElement(NS.KpiCard, {
    key: i,
    label: k.l,
    value: k.v,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: k.i,
      size: 18
    }),
    iconTone: k.t
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0430\u043C, \u0442\u044B\u0441. \u20BD",
    chartType: "bar",
    labels: distC.labels,
    values: distC.values,
    horizontal: true
  }), /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0446\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u043F\u043E \u043A\u043B\u0430\u0441\u0441\u0443 \u043E\u0431\u044A\u0435\u043A\u0442\u0430, \u0442\u044B\u0441. \u20BD",
    chartType: "bar",
    labels: classC.labels,
    values: classC.values
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u043F\u043E \u044D\u043F\u043E\u0445\u0435 \u0437\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438, \u0442\u044B\u0441. \u20BD",
    chartType: "bar",
    labels: eraC.labels,
    values: eraC.values
  }), /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u043F\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0443 \u043D\u0435\u0441\u0443\u0449\u0438\u0445 \u0441\u0442\u0435\u043D, \u0442\u044B\u0441. \u20BD",
    chartType: "bar",
    labels: wallC.labels,
    values: wallC.values
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u043F\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044E \u043E\u0431\u044A\u0435\u043A\u0442\u0430, \u0442\u044B\u0441. \u20BD",
    chartType: "bar",
    labels: condC.labels,
    values: condC.values
  }), /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u043F\u043E \u044D\u0442\u0430\u0436\u043D\u043E\u0441\u0442\u0438 \u0437\u0434\u0430\u043D\u0438\u044F, \u0442\u044B\u0441. \u20BD",
    chartType: "bar",
    labels: flrLabels,
    values: flrData
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: 20,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(ChartBox, {
    title: "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u0442\u0438\u043F\u0430\u043C \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432",
    chartType: "doughnut",
    labels: typeC.labels,
    values: typeC.values,
    height: 260
  }), /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--divider)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0446\u0435\u043D \u043F\u043E \u0440\u0430\u0439\u043E\u043D\u0430\u043C"), /*#__PURE__*/React.createElement(NS.Badge, {
    tone: "info"
  }, Object.keys(byDistrict).length, " \u0440\u0430\u0439\u043E\u043D\u043E\u0432")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-inset)'
    }
  }, ['Район', 'Объектов', 'Мин. ₽/м²', 'Средн. ₽/м²', 'Макс. ₽/м²'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: '8px 14px',
      textAlign: i > 0 ? 'right' : 'left',
      fontWeight: 600,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      borderBottom: '1px solid var(--divider)',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, Object.keys(byDistrict).map(dist => {
    const pts = filtered.filter(p => p.district === dist);
    const mn = Math.min(...pts.map(p => p.pricePerM2));
    const mx = Math.max(...pts.map(p => p.pricePerM2));
    const av = byDistrict[dist];
    return /*#__PURE__*/React.createElement("tr", {
      key: dist,
      style: {
        borderBottom: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 14px',
        fontWeight: 500,
        color: 'var(--text-strong)'
      }
    }, dist), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 14px',
        textAlign: 'right'
      }
    }, pts.length), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 14px',
        textAlign: 'right',
        color: 'var(--success-text)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, (mn / 1000).toFixed(0), " \u0442\u044B\u0441."), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 14px',
        textAlign: 'right',
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, (av / 1000).toFixed(0), " \u0442\u044B\u0441."), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 14px',
        textAlign: 'right',
        color: 'var(--danger-text)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, (mx / 1000).toFixed(0), " \u0442\u044B\u0441."));
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--divider)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u041E\u0431\u044A\u0435\u043A\u0442\u044B \u0432 \u0432\u044B\u0431\u043E\u0440\u043A\u0435"), /*#__PURE__*/React.createElement(NS.Badge, {
    tone: "neutral"
  }, n, " \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-inset)'
    }
  }, ['Адрес', 'Тип', 'Класс', 'Эпоха', 'Матер. стен', 'Состояние', 'Этажность', 'Пл. м²', 'Цена/м²', 'Использ.'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: '8px 12px',
      textAlign: i >= 6 ? 'right' : 'left',
      fontWeight: 600,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      borderBottom: '1px solid var(--divider)',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, filtered.slice(0, 20).map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id,
    style: {
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      fontWeight: 500,
      color: 'var(--text-strong)',
      maxWidth: 180,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, p.addr), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px'
    }
  }, p.type), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px'
    }
  }, /*#__PURE__*/React.createElement(NS.Badge, {
    tone: p.class === 'Бизнес' ? 'brand' : p.class === 'Комфорт' ? 'info' : 'neutral',
    pill: true
  }, p.class)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px'
    }
  }, p.era), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px'
    }
  }, p.wallMaterial), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px'
    }
  }, p.cond), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      textAlign: 'right'
    }
  }, p.floors), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      textAlign: 'right'
    }
  }, p.area), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      textAlign: 'right',
      fontWeight: 700,
      color: 'var(--text-value)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, (p.pricePerM2 / 1000).toFixed(0), " \u0442\u044B\u0441."), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px'
    }
  }, /*#__PURE__*/React.createElement(NS.Badge, {
    tone: p.useType === 'Жилой' ? 'success' : 'warning',
    pill: true
  }, p.useType)))))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/AnalyticsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/CalcScreenV2.jsx
try { (() => {
/* Calculation screen — three sub-tabs + live right sidebar. window.CalcScreen */
window.CalcScreenV2 = function CalcScreenV2({
  onNavigate
}) {
  const {
    Button,
    Badge
  } = NS;
  const D = window.OcenkaData;
  const calc = D.calculation || {};
  const [tab, setTab] = React.useState('comp');
  const [weights, setWt] = React.useState(calc.weights || {
    comp: 60,
    income: 10,
    cost: 30
  });
  const [applied, setApp] = React.useState(calc.applied || {
    comp: true,
    income: true,
    cost: true
  });

  /* ?? ????????????? ??????????????????????????????????? */
  const subjectArea = calc.subjectArea || 214.6;
  const [rows, setRows] = React.useState(calc.comparableRows || []);
  const updRow = (id, f, v) => setRows(rs => rs.map(r => r.id === id ? {
    ...r,
    [f]: v
  } : r));

  /* ── Доходный ───────────────────────────────────────── */
  const [inc, setInc] = React.useState(calc.income || {
    area: 214.6,
    rent: 800,
    vacancy: 12,
    opex: 35,
    cap: 9
  });

  /* ── Затратный ──────────────────────────────────────── */
  const [cst, setCst] = React.useState(calc.cost || {
    area: 214.6,
    replaceM2: 95000,
    phys: 18,
    func: 5,
    ext: 0
  });

  /* ── Расчёты ─────────────────────────────────────────── */
  const fmt = n => Math.round(n).toLocaleString('ru');
  function compVal() {
    const ws = rows.reduce((s, r) => s + r.w, 0) || 1;
    return Math.round(rows.reduce((s, r) => {
      const adj = 1 + (r.adjTorg + r.adjLoc + r.adjRep + r.adjFlr) / 100;
      return s + r.price / r.area * adj * (r.w / ws);
    }, 0) * subjectArea);
  }
  function incVal() {
    const pgi = inc.area * inc.rent * 12;
    const noi = pgi * (1 - inc.vacancy / 100) * (1 - inc.opex / 100);
    return Math.round(noi / (inc.cap / 100));
  }
  function cstVal() {
    const total = cst.replaceM2 * cst.area;
    return Math.round(total * (1 - (cst.phys + cst.func + cst.ext) / 100));
  }
  const vComp = compVal(),
    vInc = incVal(),
    vCst = cstVal();
  const wSum = (applied.comp ? weights.comp : 0) + (applied.income ? weights.income : 0) + (applied.cost ? weights.cost : 0);
  const final = wSum ? Math.round(((applied.comp ? vComp * weights.comp : 0) + (applied.income ? vInc * weights.income : 0) + (applied.cost ? vCst * weights.cost : 0)) / wSum) : 0;

  /* ── Shared styles ───────────────────────────────────── */
  const inp = {
    width: '100%',
    padding: '7px 10px',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-strong)',
    background: 'var(--surface-card)',
    outline: 'none',
    boxSizing: 'border-box'
  };
  const numInp = (val, onChange, w) => /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: val,
    onChange: e => onChange(parseFloat(e.target.value) || 0),
    style: {
      ...inp,
      width: w || '100%',
      textAlign: 'right'
    }
  });
  const TH = ({
    ch,
    r
  }) => /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px 12px',
      textAlign: r ? 'right' : 'left',
      fontWeight: 700,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-xs)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      borderBottom: '1px solid var(--divider)',
      background: 'var(--surface-inset)',
      whiteSpace: 'nowrap'
    }
  }, ch);
  const TD = ({
    ch,
    r,
    bold,
    color
  }) => /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '9px 12px',
      borderBottom: '1px solid var(--divider)',
      textAlign: r ? 'right' : 'left',
      fontWeight: bold ? 700 : 400,
      color: color || 'var(--text-body)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--text-sm)'
    }
  }, ch);

  /* ── Сравнительный tab ───────────────────────────────── */
  const tabComp = () => {
    const m2s = rows.map(r => r.price / r.area * (1 + (r.adjTorg + r.adjLoc + r.adjRep + r.adjFlr) / 100));
    const medM2 = m2s.length ? Math.round(m2s.reduce((a, b) => a + b, 0) / m2s.length) : 0;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14,
        marginBottom: 20
      }
    }, [{
      l: 'Итоговая стоимость',
      v: `${fmt(final)} ₽`,
      strong: true
    }, {
      l: 'Сравнительный подход',
      v: `${fmt(vComp)} ₽`
    }, {
      l: 'Согл. цена за 1 м²',
      v: `${fmt(Math.round(final / subjectArea))} ₽/м²`
    }, {
      l: 'Дата расчёта',
      v: D.result.date
    }].map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '14px 16px',
        background: 'var(--surface-card)',
        border: `1.5px solid ${i === 0 ? 'var(--blue-600)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '.04em'
      }
    }, c.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: i === 0 ? 'var(--text-2xl)' : 'var(--text-xl)',
        fontWeight: 700,
        color: i === 0 ? 'var(--blue-700)' : 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums',
        marginTop: 4
      }
    }, c.v)))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '13px 20px',
        borderBottom: '1px solid var(--divider)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u0432"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, "\u0426\u0435\u043D\u0430, \u043F\u043B\u043E\u0449\u0430\u0434\u044C \u0438 \u043F\u043E\u043F\u0440\u0430\u0432\u043A\u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u2014 \u0440\u0430\u0441\u0447\u0451\u0442 \u043F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "refresh-cw",
        size: 14
      })
    }, "\u041F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u0430\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(TH, {
      ch: "\u0410\u043D\u0430\u043B\u043E\u0433"
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0426\u0435\u043D\u0430, \u20BD",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u041C\xB2",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0412\u0435\u0441",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0422\u043E\u0440\u0433 %",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u041B\u043E\u043A %",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0420\u0435\u043C\u043E\u043D\u0442 %",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u042D\u0442\u0430\u0436 %",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u20BD/\u043C\xB2 \u0441\u043A\u043E\u0440\u0440.",
      r: true
    }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => {
      const adj = 1 + (r.adjTorg + r.adjLoc + r.adjRep + r.adjFlr) / 100;
      const adjM2 = Math.round(r.price / r.area * adj);
      const q = Math.round(100 - Math.abs(r.adjTorg + r.adjLoc + r.adjRep + r.adjFlr) * 1.5);
      return /*#__PURE__*/React.createElement("tr", {
        key: r.id
      }, /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '7px 12px',
          borderBottom: '1px solid var(--divider)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)',
          fontSize: 'var(--text-xs)',
          whiteSpace: 'nowrap'
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: 'var(--text-muted)'
        }
      }, r.src)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.price, v => updRow(r.id, 'price', v), 110)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.area, v => updRow(r.id, 'area', v), 60)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.w, v => updRow(r.id, 'w', v), 55)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.adjTorg, v => updRow(r.id, 'adjTorg', v), 58)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.adjLoc, v => updRow(r.id, 'adjLoc', v), 58)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.adjRep, v => updRow(r.id, 'adjRep', v), 70)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '5px 8px',
          borderBottom: '1px solid var(--divider)'
        }
      }, numInp(r.adjFlr, v => updRow(r.id, 'adjFlr', v), 58)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '7px 12px',
          borderBottom: '1px solid var(--divider)',
          textAlign: 'right'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          color: 'var(--text-strong)'
        }
      }, fmt(adjM2)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: q >= 90 ? 'var(--success-text)' : q >= 75 ? 'var(--warning-text)' : 'var(--danger-text)'
        }
      }, q, "% HIGH")));
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 20px',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, "\u0420\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0432\u0438\u043B\u043A\u0430"), /*#__PURE__*/React.createElement(Badge, {
      tone: "info"
    }, rows.length, " \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 12
      }
    }, [{
      l: 'Медиана 1 м²',
      v: fmt(medM2)
    }, {
      l: 'Средняя 1 м²',
      v: fmt(medM2)
    }, {
      l: 'Минимум 1 м²',
      v: fmt(Math.round(Math.min(...m2s)))
    }, {
      l: 'Максимум 1 м²',
      v: fmt(Math.round(Math.max(...m2s)))
    }].map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '12px 14px',
        background: 'var(--surface-inset)',
        borderRadius: 'var(--radius-md)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, s.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-lg)',
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums',
        marginTop: 4
      }
    }, s.v, " \u20BD"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '13px 20px',
        borderBottom: '1px solid var(--divider)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, "\u0420\u0430\u0441\u0447\u0451\u0442\u043D\u044B\u0435 \u0441\u0442\u0440\u043E\u043A\u0438 \u0441\u0440\u0430\u0432\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, "\u0421\u043A\u043E\u0440\u0440. \u0446\u0435\u043D\u044B \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u0432 \u043F\u043E\u0441\u043B\u0435 \u0442\u043E\u0440\u0433\u0430, \u043F\u043E\u043F\u0440\u0430\u0432\u043E\u043A \u0438 \u0432\u0435\u0441\u043E\u0432\u043E\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F")), /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(TH, {
      ch: "\u0410\u043D\u0430\u043B\u043E\u0433"
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0426\u0435\u043D\u0430",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u041F\u043B.",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "1 \u043C\xB2 \u0434\u043E",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u041F\u043E\u0441\u043B\u0435 \u0442\u043E\u0440\u0433\u0430",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0424\u0430\u043A\u0442\u043E\u0440",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0421\u043A\u043E\u0440\u0440. 1 \u043C\xB2",
      r: true
    }), /*#__PURE__*/React.createElement(TH, {
      ch: "\u0412\u0435\u0441",
      r: true
    }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => {
      const m2b = Math.round(r.price / r.area);
      const aft = Math.round(m2b * (1 + r.adjTorg / 100));
      const fct = (1 + (r.adjLoc + r.adjRep + r.adjFlr) / 100).toFixed(4);
      const sc = Math.round(m2b * (1 + (r.adjTorg + r.adjLoc + r.adjRep + r.adjFlr) / 100));
      const ws = rows.reduce((s, x) => s + x.w, 0) || 1;
      return /*#__PURE__*/React.createElement("tr", {
        key: r.id
      }, /*#__PURE__*/React.createElement(TD, {
        ch: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
          style: {
            color: 'var(--text-strong)'
          }
        }, r.name), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 11,
            color: 'var(--text-muted)'
          }
        }, r.src))
      }), /*#__PURE__*/React.createElement(TD, {
        ch: fmt(r.price) + ' ₽',
        r: true
      }), /*#__PURE__*/React.createElement(TD, {
        ch: r.area + ' м²',
        r: true
      }), /*#__PURE__*/React.createElement(TD, {
        ch: fmt(m2b),
        r: true
      }), /*#__PURE__*/React.createElement(TD, {
        ch: fmt(aft),
        r: true
      }), /*#__PURE__*/React.createElement(TD, {
        ch: fct,
        r: true
      }), /*#__PURE__*/React.createElement(TD, {
        ch: fmt(sc),
        r: true,
        bold: true
      }), /*#__PURE__*/React.createElement(TD, {
        ch: Math.round(r.w / ws * 100) + '%',
        r: true,
        bold: true,
        color: "var(--blue-600)"
      }));
    })))));
  };

  /* ── Доходный tab ────────────────────────────────────── */
  const tabIncome = () => {
    const pgi = Math.round(inc.area * inc.rent * 12);
    const egi = Math.round(pgi * (1 - inc.vacancy / 100));
    const noi = Math.round(egi * (1 - inc.opex / 100));
    const fields = [{
      l: 'Площадь, м²',
      k: 'area',
      v: inc.area
    }, {
      l: 'Аренд. ставка, ₽/м²/мес',
      k: 'rent',
      v: inc.rent
    }, {
      l: 'Недозагрузка, %',
      k: 'vacancy',
      v: inc.vacancy
    }, {
      l: 'Операц. расходы, %',
      k: 'opex',
      v: inc.opex
    }, {
      l: 'Ставка капитализации, %',
      k: 'cap',
      v: inc.cap
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 14,
        marginBottom: 20
      }
    }, [{
      l: 'Потенц. ВД (PGI)',
      v: fmt(pgi) + ' ₽/год'
    }, {
      l: 'Действит. ВД (EGI)',
      v: fmt(egi) + ' ₽/год'
    }, {
      l: 'Чист. опер. доход (NOI)',
      v: fmt(noi) + ' ₽/год',
      strong: true
    }].map((c, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '14px 16px',
        background: 'var(--surface-card)',
        border: `1.5px solid ${c.strong ? 'var(--emerald-500)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '.04em'
      }
    }, c.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xl)',
        fontWeight: 700,
        color: c.strong ? 'var(--emerald-700)' : 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums',
        marginTop: 4
      }
    }, c.v)))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)',
        marginBottom: 16
      }
    }, "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0434\u043E\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 16
      }
    }, fields.map(f => /*#__PURE__*/React.createElement("div", {
      key: f.k
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--text-muted)',
        display: 'block',
        marginBottom: 6
      }
    }, f.l), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: f.v,
      onChange: e => setInc(p => ({
        ...p,
        [f.k]: parseFloat(e.target.value) || 0
      })),
      style: inp
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--emerald-50)',
        border: '1.5px solid var(--emerald-300)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--emerald-700)'
      }
    }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E \u0434\u043E\u0445\u043E\u0434\u043D\u043E\u043C\u0443 \u043F\u043E\u0434\u0445\u043E\u0434\u0443"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--emerald-600)',
        marginTop: 3
      }
    }, "NOI ", fmt(noi), " \u20BD / \u0441\u0442\u0430\u0432\u043A\u0430 ", inc.cap, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 34,
        fontWeight: 800,
        color: 'var(--emerald-700)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmt(vInc), " \u20BD")));
  };

  /* ── Затратный tab ───────────────────────────────────── */
  const tabCost = () => {
    const repl = Math.round(cst.replaceM2 * cst.area);
    const wears = [{
      l: `Физический износ (${cst.phys}%)`,
      k: 'phys',
      v: cst.phys,
      amt: Math.round(repl * cst.phys / 100)
    }, {
      l: `Функц. устаревание (${cst.func}%)`,
      k: 'func',
      v: cst.func,
      amt: Math.round(repl * cst.func / 100)
    }, {
      l: `Внешнее устаревание (${cst.ext}%)`,
      k: 'ext',
      v: cst.ext,
      amt: Math.round(repl * cst.ext / 100)
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 20,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)',
        marginBottom: 16
      }
    }, "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0437\u0430\u0442\u0440\u0430\u0442\u043D\u043E\u0433\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0430"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 20
      }
    }, [{
      l: 'Площадь объекта, м²',
      k: 'area',
      v: cst.area
    }, {
      l: 'Стоимость замещения 1 м², ₽',
      k: 'replaceM2',
      v: cst.replaceM2
    }].map(f => /*#__PURE__*/React.createElement("div", {
      key: f.k
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--text-muted)',
        display: 'block',
        marginBottom: 6
      }
    }, f.l), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: f.v,
      onChange: e => setCst(p => ({
        ...p,
        [f.k]: parseFloat(e.target.value) || 0
      })),
      style: inp
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-body)',
        marginBottom: 12,
        fontSize: 'var(--text-sm)'
      }
    }, "\u0412\u0438\u0434\u044B \u0438\u0437\u043D\u043E\u0441\u0430"), wears.map(w => /*#__PURE__*/React.createElement("div", {
      key: w.k,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-body)',
        minWidth: 230
      }
    }, w.l), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 0,
      max: 60,
      value: w.v,
      onChange: e => setCst(p => ({
        ...p,
        [w.k]: parseInt(e.target.value)
      })),
      style: {
        flex: 1,
        accentColor: 'var(--blue-600)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: w.v,
      onChange: e => setCst(p => ({
        ...p,
        [w.k]: parseInt(e.target.value) || 0
      })),
      style: {
        ...inp,
        width: 52,
        textAlign: 'right'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        width: 16
      }
    }, "%"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--danger-text)',
        fontWeight: 600,
        minWidth: 100,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, "\u2212", fmt(w.amt), " \u20BD")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 16
      }
    }, [[`Стоимость замещения (${fmt(cst.replaceM2)} ₽/м²)`, fmt(repl), 'var(--text-strong)'], ...wears.map(w => [w.l, `−${fmt(w.amt)}`, 'var(--danger-text)'])].map(([l, v, c], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '11px 20px',
        borderBottom: '1px solid var(--divider)',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-body)'
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: c,
        fontVariantNumeric: 'tabular-nums'
      }
    }, v, " \u20BD")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--blue-50)',
        border: '1.5px solid var(--blue-300)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--blue-700)'
      }
    }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E \u0437\u0430\u0442\u0440\u0430\u0442\u043D\u043E\u043C\u0443 \u043F\u043E\u0434\u0445\u043E\u0434\u0443"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--blue-600)',
        marginTop: 3
      }
    }, "\u0421\u043E\u0432\u043E\u043A\u0443\u043F\u043D\u044B\u0439 \u0438\u0437\u043D\u043E\u0441: ", cst.phys + cst.func + cst.ext, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 34,
        fontWeight: 800,
        color: 'var(--blue-700)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmt(vCst), " \u20BD")));
  };

  /* ── Right sidebar ───────────────────────────────────── */
  const sidebar = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 14
    }
  }, "\u0412\u0435\u0441\u0430 \u043F\u043E\u0434\u0445\u043E\u0434\u043E\u0432"), [{
    k: 'comp',
    l: 'Сравнительный',
    col: '#2A6FDB'
  }, {
    k: 'income',
    l: 'Доходный',
    col: '#25A871'
  }, {
    k: 'cost',
    l: 'Затратный',
    col: '#F59E0B'
  }].map(({
    k,
    l,
    col
  }) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 'var(--text-sm)',
      color: applied[k] ? 'var(--text-body)' : 'var(--text-subtle)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: applied[k],
    onChange: e => setApp(a => ({
      ...a,
      [k]: e.target.checked
    }))
  }), l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: applied[k] ? col : 'var(--text-subtle)',
      minWidth: 34,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, weights[k], "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: weights[k],
    disabled: !applied[k],
    onChange: e => setWt(w => ({
      ...w,
      [k]: parseInt(e.target.value)
    })),
    style: {
      width: '100%',
      accentColor: col
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: wSum === 100 ? 'var(--success-text)' : 'var(--danger-text)',
      marginTop: 2
    }
  }, "\u0421\u0443\u043C\u043C\u0430: ", wSum, "%")), /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 12
    }
  }, "\u041F\u043E\u0434\u0445\u043E\u0434\u044B"), [{
    k: 'comp',
    l: 'Сравнительный',
    v: vComp,
    note: 'Скорр. цены аналогов'
  }, {
    k: 'income',
    l: 'Доходный',
    v: vInc,
    note: 'NOI / ставка капитализации'
  }, {
    k: 'cost',
    l: 'Затратный',
    v: vCst,
    note: 'Стоимость замещения − износ'
  }].map(({
    k,
    l,
    v,
    note
  }) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      marginBottom: 10,
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      background: applied[k] ? 'var(--surface-inset)' : 'transparent',
      opacity: applied[k] ? 1 : 0.45
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-value)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, fmt(v), " \u20BD")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 4,
      lineHeight: 1.4
    }
  }, note)))), /*#__PURE__*/React.createElement("div", {
    className: "ock-card",
    style: {
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 10
    }
  }, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-text",
      size: 15
    })
  }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C DOCX"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "braces",
      size: 15
    })
  }, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 JSON"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--emerald-700)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 18px',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.05em',
      color: '#A7E8C8'
    }
  }, "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      fontVariantNumeric: 'tabular-nums',
      marginTop: 6,
      lineHeight: 1.1
    }
  }, fmt(final), " \u20BD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: '#A7E8C8',
      marginTop: 6
    }
  }, fmt(Math.round(final / subjectArea)), " \u20BD \u0437\u0430 \u043C\xB2 \xB7 ", subjectArea, " \u043C\xB2"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    style: {
      marginTop: 14
    },
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right",
      size: 15
    }),
    onClick: () => onNavigate('report')
  }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0451\u0442")));
  const TABS = [{
    k: 'comp',
    l: 'Сравнительный',
    i: 'git-compare'
  }, {
    k: 'income',
    l: 'Доходный',
    i: 'trending-up'
  }, {
    k: 'cost',
    l: 'Затратный',
    i: 'building-2'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u0420\u0430\u0441\u0447\u0435\u0442 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438",
    subtitle: "\u041E\u0431\u044A\u0435\u043A\u0442 \u041E\u0417-1040 \xB7 \u0442\u0440\u0438 \u043F\u043E\u0434\u0445\u043E\u0434\u0430 \u043A \u043E\u0446\u0435\u043D\u043A\u0435, \u0436\u0438\u0432\u043E\u0439 \u043F\u0435\u0440\u0435\u0441\u0447\u0451\u0442"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      background: 'var(--surface-inset)',
      padding: 4,
      borderRadius: 'var(--radius-lg)',
      marginBottom: 20,
      width: 'fit-content'
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.k,
    onClick: () => setTab(t.k),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 18px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all .14s',
      background: tab === t.k ? 'var(--surface-card)' : 'transparent',
      color: tab === t.k ? 'var(--text-strong)' : 'var(--text-muted)',
      boxShadow: tab === t.k ? 'var(--shadow-sm)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: t.i,
    size: 15
  }), t.l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, tab === 'comp' && tabComp(), tab === 'income' && tabIncome(), tab === 'cost' && tabCost()), sidebar()));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/CalcScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/DashboardScreenV2.jsx
try { (() => {
/* Dashboard — hero, KPI tiles, recent requests. window.DashboardScreen */
window.DashboardScreenV2 = function DashboardScreenV2({
  onOpenRequest,
  onNavigate
}) {
  const {
    KpiCard,
    Card,
    Table,
    StatusBadge,
    Button,
    Avatar
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--blue-900)',
      borderRadius: 'var(--radius-xl)',
      padding: '28px 32px',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -40,
      top: -40,
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(37,168,113,.22), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-overline",
    style: {
      color: '#7FB0E8'
    }
  }, "\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u0430"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 'var(--text-3xl)',
      fontWeight: 800,
      letterSpacing: '-.02em',
      marginTop: 10,
      lineHeight: 1.15
    }
  }, "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438:", /*#__PURE__*/React.createElement("br", null), "\u043E\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0434\u043E \u0433\u043E\u0442\u043E\u0432\u043E\u0433\u043E \u043E\u0442\u0447\u0435\u0442\u0430"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#C7D6EC',
      fontSize: 'var(--text-md)',
      marginTop: 12,
      lineHeight: 1.55
    }
  }, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0442\u044C \u0430\u043D\u0430\u043B\u043E\u0433\u0438, \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0440\u0430\u0441\u0447\u0435\u0442\u044B \u0438 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442 \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0439 \u0424\u0421\u041E."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "plus",
      size: 16
    }),
    onClick: () => onNavigate('requests')
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('fso'),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,.1)',
      color: '#fff',
      border: '1px solid rgba(255,255,255,.18)',
      borderRadius: 'var(--radius-md)',
      padding: '0 18px',
      height: 38,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "shield-check",
    size: 16
  }), " \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0424\u0421\u041E")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 16,
      marginBottom: 24
    }
  }, D.kpis.map((k, i) => /*#__PURE__*/React.createElement(KpiCard, {
    key: i,
    label: k.label,
    value: k.value,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: k.icon,
      size: 18
    }),
    iconTone: k.tone,
    delta: k.delta,
    deltaDir: k.dir,
    helper: k.helper
  }))), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true,
    title: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        n: "arrow-right",
        size: 15
      }),
      onClick: () => onNavigate('requests')
    }, "\u0412\u0441\u0435 \u0437\u0430\u044F\u0432\u043A\u0438")
  }, /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    onRowClick: r => onOpenRequest(r),
    columns: [{
      key: 'id',
      header: '№ заявки',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "ds-mono",
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.id)
    }, {
      key: 'object',
      header: 'Объект',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.object), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          marginTop: 2
        }
      }, r.address))
    }, {
      key: 'client',
      header: 'Клиент'
    }, {
      key: 'type',
      header: 'Тип оценки'
    }, {
      key: 'status',
      header: 'Статус',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status
      })
    }, {
      key: 'date',
      header: 'Дата оценки'
    }, {
      key: 'owner',
      header: 'Ответственный',
      render: r => r.owner === '—' ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-subtle)'
        }
      }, "\u2014") : /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.owner,
        size: "sm"
      }), r.owner)
    }, {
      key: 'act',
      header: '',
      align: 'right',
      render: () => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-subtle)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        n: "chevron-right",
        size: 16
      }))
    }],
    rows: D.requests.slice(0, 5)
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/DashboardScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/FsoScreenV2.jsx
try { (() => {
/* ФСО compliance checklist with live progress. window.FsoScreen */
window.FsoScreenV2 = function FsoScreenV2({
  onNavigate
}) {
  const {
    Card,
    Button,
    ProgressBar,
    Badge
  } = NS;
  const [items, setItems] = React.useState(window.OcenkaData.fso.map(x => ({
    ...x
  })));
  const done = items.filter(i => i.done).length;
  const pct = Math.round(done / items.length * 100);
  const toggle = idx => setItems(arr => arr.map((it, i) => i === idx ? {
    ...it,
    done: !it.done
  } : it));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0424\u0421\u041E",
    subtitle: "\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u043E\u0442\u0447\u0435\u0442\u0430 \u0444\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u044B\u043C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0430\u043C \u043E\u0446\u0435\u043D\u043A\u0438",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "refresh-cw",
        size: 16
      })
    }, "\u041F\u0435\u0440\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.6fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 14,
      padding: '8px 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 132,
      height: 132
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "132",
    height: "132",
    viewBox: "0 0 132 132",
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: "58",
    fill: "none",
    stroke: "var(--neutral-200)",
    strokeWidth: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: "58",
    fill: "none",
    stroke: "var(--emerald-500)",
    strokeWidth: "12",
    strokeLinecap: "round",
    strokeDasharray: 2 * Math.PI * 58,
    strokeDashoffset: 2 * Math.PI * 58 * (1 - pct / 100),
    style: {
      transition: 'stroke-dashoffset .4s var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "\u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      color: 'var(--text-body)'
    }
  }, "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, done), " \u0438\u0437 ", items.length, " \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0439"), pct === 100 ? /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    pill: true,
    dot: true
  }, "\u0413\u043E\u0442\u043E\u0432 \u043A \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E") : /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    pill: true
  }, "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0430"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    disabled: pct !== 100,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-check",
      size: 16
    }),
    onClick: () => onNavigate('report')
  }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442"))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0427\u0435\u043A-\u043B\u0438\u0441\u0442 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F",
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", null, items.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => toggle(i),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      textAlign: 'left',
      padding: '14px 20px',
      border: 'none',
      borderBottom: i < items.length - 1 ? '1px solid var(--divider)' : 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: it.done ? 'var(--emerald-500)' : 'var(--surface-card)',
      border: it.done ? 'none' : '1.5px solid var(--border-strong)',
      color: '#fff'
    }
  }, it.done ? /*#__PURE__*/React.createElement(Icon, {
    n: "check",
    size: 14
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--text-md)',
      color: it.done ? 'var(--text-strong)' : 'var(--text-body)',
      fontWeight: it.done ? 500 : 400
    }
  }, it.label), it.done ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--success-text)',
      fontWeight: 600
    }
  }, "\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-subtle)'
    }
  }, "\u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E")))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/FsoScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/MiscScreensV2.jsx
try { (() => {
/* Clients + Settings. window.ClientsScreen, window.SettingsScreen */
window.ClientsScreenV2 = function ClientsScreenV2() {
  const {
    Card,
    Table,
    Button,
    Badge,
    Avatar,
    Input
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    subtitle: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0438 \u043E\u0446\u0435\u043D\u043A\u0438 \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "plus",
        size: 16
      })
    }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u0430")
  }), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--divider)',
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      n: "search",
      size: 16
    }),
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u043A\u043B\u0438\u0435\u043D\u0442\u0430"
  })), /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    columns: [{
      key: 'name',
      header: 'Клиент',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.name,
        size: "sm"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.name))
    }, {
      key: 'kind',
      header: 'Тип',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.kind === 'Юр. лицо' ? 'brand' : 'neutral'
      }, r.kind)
    }, {
      key: 'orders',
      header: 'Заказов',
      align: 'right'
    }, {
      key: 'contact',
      header: 'Контакт',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "ds-mono",
        style: {
          fontSize: 'var(--text-sm)'
        }
      }, r.contact)
    }],
    rows: D.clients
  })));
};
window.SettingsScreenV2 = function SettingsScreenV2() {
  const {
    Card,
    Input,
    Select,
    Switch,
    Button
  } = NS;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    subtitle: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u0430 \u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043E\u0442\u0447\u0435\u0442\u043E\u0432"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u0430"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0424\u0418\u041E",
    defaultValue: "\u0412\u043B\u0430\u0441\u043E\u0432 \u0418\u0433\u043E\u0440\u044C \u0410\u043D\u0430\u0442\u043E\u043B\u044C\u0435\u0432\u0438\u0447"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u2116 \u0432 \u0440\u0435\u0435\u0441\u0442\u0440\u0435 \u0421\u0420\u041E",
    defaultValue: "012458",
    mono: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\u0421\u0430\u043C\u043E\u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u0430\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F",
    options: [{
      value: 'a',
      label: 'СРО «Российское общество оценщиков»'
    }, {
      value: 'b',
      label: 'СРО «СМАО»'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    defaultValue: "i.vlasov@ocenka.pro"
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043E\u0442\u0447\u0435\u0442\u043E\u0432"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "\u0424\u043E\u0440\u043C\u0430\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
    options: [{
      value: 'docx',
      label: 'DOCX'
    }, {
      value: 'pdf',
      label: 'PDF'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "\u0410\u0432\u0442\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E \u0424\u0421\u041E \u043F\u0435\u0440\u0435\u0434 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u0432 \u043E\u0442\u0447\u0435\u0442",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430 \u043F\u043E e-mail"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/MiscScreensV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/ObjectScreenV2.jsx
try { (() => {
/* Object card — details, documents, photos. window.ObjectScreen */
window.ObjectScreenV2 = function ObjectScreenV2({
  onBack,
  onNavigate
}) {
  const {
    Card,
    Button,
    Badge,
    StatusBadge,
    Tabs
  } = NS;
  const o = window.OcenkaData.object;
  const [tab, setTab] = React.useState('params');
  const fileIcon = kind => kind === 'doc' ? 'file-text' : 'file';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-link)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "arrow-left",
    size: 15
  }), " \u0417\u0430\u044F\u0432\u043A\u0438"), /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-right",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-mono"
  }, o.id)), /*#__PURE__*/React.createElement(PageHead, {
    title: o.title,
    subtitle: o.address,
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "e",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "pencil",
        size: 16
      })
    }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"), /*#__PURE__*/React.createElement(Button, {
      key: "c",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "calculator",
        size: 16
      }),
      onClick: () => onNavigate('calc')
    }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0441\u0447\u0435\u0442\u0443")]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: "calc"
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, o.valueType), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, o.purpose)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'params',
      label: 'Параметры'
    }, {
      value: 'docs',
      label: 'Документы',
      count: o.docs.length
    }, {
      value: 'photos',
      label: 'Фотографии',
      count: o.photos
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, tab === 'params' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '22px 24px'
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0422\u0438\u043F \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
    value: o.type
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C",
    value: o.area
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u042D\u0442\u0430\u0436\u043D\u043E\u0441\u0442\u044C",
    value: o.floors
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0413\u043E\u0434 \u043F\u043E\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    value: o.year
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041A\u0430\u0434\u0430\u0441\u0442\u0440\u043E\u0432\u044B\u0439 \u2116",
    value: o.cadastral,
    mono: true
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0414\u0430\u0442\u0430 \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.date
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0426\u0435\u043B\u044C \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.purpose
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0412\u0438\u0434 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438",
    value: o.valueType
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A",
    value: o.client
  })) : null, tab === 'docs' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, o.docs.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 14px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-sm)',
      background: d.kind === 'pdf' ? 'var(--red-50)' : 'var(--blue-50)',
      color: d.kind === 'pdf' ? 'var(--red-600)' : 'var(--blue-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: fileIcon(d.kind),
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontSize: 'var(--text-sm)'
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, d.size)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "download",
    size: 17
  })))), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '12px',
      border: '1.5px dashed var(--border-default)',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "upload",
    size: 16
  }), " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442")) : null, tab === 'photos' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12
    }
  }, Array.from({
    length: o.photos
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '4 / 3',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-subtle)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "image",
    size: 22
  })))) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u0421\u0432\u043E\u0434\u043A\u0430"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0417\u0430\u044F\u0432\u043A\u0430",
    value: o.id,
    mono: true
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A",
    value: o.client
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0426\u0435\u043B\u044C \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.purpose
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--text-muted)'
    }
  }, "\u041F\u0440\u0435\u0434\u0432. \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-3xl)',
      fontWeight: 700,
      color: 'var(--text-value)',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 6,
      letterSpacing: '-.01em'
    }
  }, window.OcenkaData.result.value + " \u20BD")))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0413\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u043A \u043E\u0442\u0447\u0435\u0442\u0443"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(NS.ProgressBar, {
    label: "\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0424\u0421\u041E",
    value: 80
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-check",
      size: 16
    }),
    onClick: () => onNavigate('report')
  }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442"))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/ObjectScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/ReportScreenV2.jsx
try { (() => {
/* Report generation. window.ReportScreen */
window.ReportScreenV2 = function ReportScreenV2({
  toast
}) {
  const {
    Card,
    Button,
    Badge,
    ProgressBar
  } = NS;
  const o = window.OcenkaData.object;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041E\u0442\u0447\u0435\u0442 \u043E\u0431 \u043E\u0446\u0435\u043D\u043A\u0435",
    subtitle: "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0442\u043E\u0433\u043E\u0432\u043E\u0433\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u043E\u0431 \u043E\u0446\u0435\u043D\u043A\u0435"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 132,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '210 / 297',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--border-subtle)',
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: 'var(--blue-600)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      width: '80%',
      background: 'var(--neutral-200)',
      borderRadius: 2,
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      width: '60%',
      background: 'var(--neutral-200)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--divider)',
      margin: '6px 0'
    }
  }), Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 5,
      width: `${90 - i * 7}%`,
      background: 'var(--neutral-100)',
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margintop: 'auto',
      height: 18,
      width: '70%',
      background: 'var(--emerald-100)',
      borderRadius: 3,
      marginTop: 'auto'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "\u041E\u0442\u0447\u0435\u0442 \u043E\u0431 \u043E\u0446\u0435\u043D\u043A\u0435 \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u044B \u2116", o.id), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginTop: 6,
      fontSize: 'var(--text-sm)'
    }
  }, o.address), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "DOCX"), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "PDF"), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    pill: true,
    dot: true
  }, "\u0413\u043E\u0442\u043E\u0432 \u043A \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px 20px',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0412\u0438\u0434 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438",
    value: o.valueType
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C",
    value: window.OcenkaData.result.value + " \u20BD"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0414\u0430\u0442\u0430 \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.date
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041E\u0431\u044A\u0435\u043C \u043E\u0442\u0447\u0435\u0442\u0430",
    value: `? ${window.OcenkaData.report.pageCount} ???????`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 22,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-text",
      size: 16
    }),
    onClick: () => toast('Файл DOCX сформирован и загружается')
  }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C DOCX"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-down",
      size: 16
    }),
    onClick: () => toast('Файл PDF сформирован и загружается')
  }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C PDF"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "send",
      size: 16
    }),
    onClick: () => toast('Отчет отправлен на проверку')
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443"))))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0421\u043E\u0441\u0442\u0430\u0432 \u043E\u0442\u0447\u0435\u0442\u0430"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    label: "\u0413\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430",
    value: 80
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      marginTop: 4
    }
  }, (window.OcenkaData.reportSections || []).map(({ label, done: ok }, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: ok ? 'var(--success)' : 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: ok ? 'circle-check-big' : 'circle-dashed',
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ok ? 'var(--text-strong)' : 'var(--text-muted)'
    }
  }, label))))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/ReportScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/RequestsScreenV2.jsx
try { (() => {
/* Requests list with status tabs. window.RequestsScreen */
window.RequestsScreenV2 = function RequestsScreenV2({
  onOpenRequest
}) {
  const {
    Card,
    Table,
    StatusBadge,
    Button,
    Tabs,
    Avatar,
    Input
  } = NS;
  const D = window.OcenkaData;
  const [tab, setTab] = React.useState('all');
  const counts = {
    all: D.requests.length
  };
  D.requests.forEach(r => {
    counts[r.status] = (counts[r.status] || 0) + 1;
  });
  const rows = tab === 'all' ? D.requests : D.requests.filter(r => r.status === tab);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u0417\u0430\u044F\u0432\u043A\u0438",
    subtitle: "\u0412\u0441\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043E\u0446\u0435\u043D\u043A\u0443 \u0438 \u0438\u0445 \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B",
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "f",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "sliders-horizontal",
        size: 16
      })
    }, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), /*#__PURE__*/React.createElement(Button, {
      key: "n",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "plus",
        size: 16
      })
    }, "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430")]
  }), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'all',
      label: 'Все',
      count: counts.all
    }, {
      value: 'new',
      label: 'Новые',
      count: counts.new || 0
    }, {
      value: 'calc',
      label: 'В расчете',
      count: counts.calc || 0
    }, {
      value: 'review',
      label: 'На проверке',
      count: counts.review || 0
    }, {
      value: 'ready',
      label: 'Готовы',
      count: counts.ready || 0
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      n: "search",
      size: 16
    }),
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u044F\u0432\u043A\u0438"
  }))), /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    onRowClick: r => onOpenRequest(r),
    columns: [{
      key: 'id',
      header: '№',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "ds-mono",
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.id)
    }, {
      key: 'object',
      header: 'Объект',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.object), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          marginTop: 2
        }
      }, r.address))
    }, {
      key: 'client',
      header: 'Клиент'
    }, {
      key: 'type',
      header: 'Тип'
    }, {
      key: 'status',
      header: 'Статус',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status
      })
    }, {
      key: 'date',
      header: 'Дата'
    }, {
      key: 'owner',
      header: 'Ответственный',
      render: r => r.owner === '—' ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-subtle)'
        }
      }, "\u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D") : /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.owner,
        size: "sm"
      }), r.owner)
    }],
    rows: rows
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/RequestsScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/SidebarV2.jsx
try { (() => {
/* Sidebar navigation — dark graphite rail. window.Sidebar */
window.SidebarV2 = function SidebarV2({
  active,
  onNavigate
}) {
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--sidebar-width)',
      flexShrink: 0,
      height: '100%',
      background: 'var(--surface-sidebar)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '18px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.markSvg || '../../assets/mark.svg',
    alt: "",
    style: {
      width: 34,
      height: 34
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '-.01em'
    }
  }, "\u041E\u0446\u0435\u043D\u043A\u0430", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#5DC393'
    }
  }, " PRO")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--text-on-sidebar-muted)',
      marginTop: 3
    }
  }, "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0446\u0435\u043D\u043A\u0438"))), /*#__PURE__*/React.createElement("nav", {
    className: "ds-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, D.nav.map(item => {
    const on = item.key === active;
    const isAnalytics = item.key === 'analytics';
    return /*#__PURE__*/React.createElement("button", {
      key: item.key,
      onClick: () => onNavigate(item.key),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        width: '100%',
        padding: '9px 12px',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        background: on ? 'var(--blue-600)' : 'transparent',
        color: on ? '#fff' : 'var(--text-on-sidebar)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        fontWeight: on ? 600 : 500,
        transition: 'background var(--duration-fast), color var(--duration-fast)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'var(--surface-sidebar-hover)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      n: item.icon,
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, item.label), item.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 20,
        height: 20,
        padding: '0 6px',
        borderRadius: 999,
        background: on ? 'rgba(255,255,255,.22)' : 'var(--blue-600)',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, item.badge) : isAnalytics ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '.04em',
        textTransform: 'uppercase',
        padding: '2px 6px',
        borderRadius: 4,
        background: on ? 'rgba(255,255,255,.18)' : 'rgba(93,195,147,.22)',
        color: on ? '#fff' : '#5DC393'
      }
    }, "NEW") : null);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      margin: 12,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-sidebar-hover)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#fff',
      fontWeight: 600,
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "life-buoy",
    size: 16
  }), " \u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0424\u0421\u041E"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-on-sidebar-muted)',
      lineHeight: 1.5
    }
  }, "\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0437\u0430\u0434\u0430\u043D\u0438\u0439 \u0438 \u043C\u0435\u0442\u043E\u0434\u0438\u043A\u0438 \u043E\u0446\u0435\u043D\u043A\u0438 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/SidebarV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/TopbarV2.jsx
try { (() => {
/* Topbar — search, new appraisal, profile. window.Topbar */
window.TopbarV2 = function TopbarV2({
  onNewAppraisal
}) {
  const {
    Button,
    IconButton,
    Avatar
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-height)',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 24px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ock-input",
    style: {
      background: 'var(--surface-inset)',
      border: '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ock-input__affix"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "search",
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    className: "ock-input__el",
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u044F\u0432\u043A\u0430\u043C, \u043E\u0431\u044A\u0435\u043A\u0442\u0430\u043C, \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u2026",
    style: {
      background: 'transparent'
    }
  }), /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-subtle)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 4,
      padding: '1px 6px'
    }
  }, "\u2318K"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "plus",
      size: 16
    }),
    onClick: onNewAppraisal
  }, "\u041D\u043E\u0432\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "bell",
    size: 18
  })), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "\u041F\u043E\u043C\u043E\u0449\u044C"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "circle-help",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 28,
      background: 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 6px',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: D.user.name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, D.user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, D.user.role)), /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-down",
    size: 16,
    style: {
      color: 'var(--text-muted)'
    }
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/TopbarV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app-v2/data.js
try { (() => {
/* Ocenka PRO v2 — расширенные данные: детальные аналоги + аналитика рынка */
window.OcenkaData = window.OcenkaData || {};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app-v2/data.js", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/AnalogsScreen.jsx
try { (() => {
/* Analog selection module. window.AnalogsScreen */
window.AnalogsScreen = function AnalogsScreen({
  onNavigate
}) {
  const {
    Card,
    Table,
    Button,
    Badge
  } = NS;
  const D = window.OcenkaData;
  const compBadge = c => {
    if (c === 'high') return /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      pill: true,
      dot: true
    }, "\u0412\u044B\u0441\u043E\u043A\u0430\u044F \u0441\u043E\u043F\u043E\u0441\u0442\u0430\u0432\u0438\u043C\u043E\u0441\u0442\u044C");
    if (c === 'check') return /*#__PURE__*/React.createElement(Badge, {
      tone: "warning",
      pill: true
    }, "\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438");
    return /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      pill: true
    }, "\u0421\u0440\u0435\u0434\u043D\u044F\u044F");
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041F\u043E\u0434\u0431\u043E\u0440 \u0430\u043D\u0430\u043B\u043E\u0433\u043E\u0432",
    subtitle: "\u041E\u0431\u044A\u0435\u043A\u0442 \u041E\u0417-1040 \xB7 \u0416\u0438\u043B\u043E\u0439 \u0434\u043E\u043C, \u043F\u043E\u0441. \u0411\u0430\u0440\u0432\u0438\u0445\u0430",
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "m",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "plus",
        size: 16
      })
    }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E"), /*#__PURE__*/React.createElement(Button, {
      key: "a",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "sparkles",
        size: 16
      })
    }, "\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u0430\u043D\u0430\u043B\u043E\u0433\u0438")]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      marginBottom: 20
    }
  }, [{
    l: 'Найдено аналогов',
    v: '4',
    i: 'git-compare',
    t: 'brand'
  }, {
    l: 'Средняя цена за м²',
    v: '119 559 ₽',
    i: 'ruler',
    t: 'brand'
  }, {
    l: 'Радиус поиска',
    v: '4.0 км',
    i: 'map-pin',
    t: 'brand'
  }, {
    l: 'Высокая сопоставимость',
    v: '2',
    i: 'badge-check',
    t: 'accent'
  }].map((s, i) => /*#__PURE__*/React.createElement(NS.KpiCard, {
    key: i,
    label: s.l,
    value: s.v,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: s.i,
      size: 18
    }),
    iconTone: s.t
  }))), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true,
    title: "\u041E\u0431\u044A\u0435\u043A\u0442\u044B-\u0430\u043D\u0430\u043B\u043E\u0433\u0438",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "info"
    }, "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438: \u0426\u0418\u0410\u041D, \u0410\u0432\u0438\u0442\u043E, Domclick")
  }, /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    columns: [{
      key: 'addr',
      header: 'Адрес аналога',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.addr), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          marginTop: 2
        }
      }, "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: ", r.source))
    }, {
      key: 'price',
      header: 'Цена, ₽',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", null, r.price)
    }, {
      key: 'area',
      header: 'Площадь',
      align: 'right',
      render: r => `${r.area} м²`
    }, {
      key: 'perM2',
      header: 'Цена за м²',
      align: 'right',
      render: r => `${r.perM2} ₽`
    }, {
      key: 'dist',
      header: 'Расст.',
      align: 'right'
    }, {
      key: 'cond',
      header: 'Состояние'
    }, {
      key: 'adj',
      header: 'Коррект.',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          color: r.adj.startsWith('−') ? 'var(--danger-text)' : 'var(--success-text)'
        }
      }, r.adj)
    }, {
      key: 'final',
      header: 'Скоррект. цена',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          color: 'var(--text-strong)'
        }
      }, r.final, " \u20BD")
    }, {
      key: 'comp',
      header: 'Сопоставимость',
      render: r => compBadge(r.comp)
    }],
    rows: D.analogs
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderTop: '1px solid var(--divider)',
      background: 'var(--surface-inset)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0441\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E \u0432\u044B\u0431\u043E\u0440\u043A\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      color: 'var(--text-value)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, "23 207 300 \u20BD"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right",
      size: 15
    }),
    onClick: () => onNavigate('calc')
  }, "\u0412 \u0440\u0430\u0441\u0447\u0435\u0442 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438")))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/AnalogsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/CalcScreen.jsx
try { (() => {
/* Value calculation — three approaches + reconciliation. window.CalcScreen */
window.CalcScreen = function CalcScreen({
  onNavigate
}) {
  const {
    Card,
    Button,
    Switch,
    Badge
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u0420\u0430\u0441\u0447\u0435\u0442 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438",
    subtitle: "\u041E\u0431\u044A\u0435\u043A\u0442 \u041E\u0417-1040 \xB7 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0442\u0440\u0435\u0445 \u043F\u043E\u0434\u0445\u043E\u0434\u043E\u0432",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "file-check",
        size: 16
      }),
      onClick: () => onNavigate('report')
    }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20,
      marginBottom: 20
    }
  }, D.approaches.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.key,
    className: "ock-card",
    style: {
      padding: 20,
      opacity: a.applied ? 1 : 0.62
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, a.applied ? /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    pill: true,
    dot: true
  }, "\u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F") : /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    pill: true
  }, "\u041D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F"))), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: a.applied
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--text-muted)'
    }
  }, "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043D\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 700,
      color: a.applied ? 'var(--text-strong)' : 'var(--text-subtle)',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 4
    }
  }, a.applied ? `${a.value} ₽` : '—')), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      lineHeight: 1.5,
      minHeight: 42
    }
  }, a.note), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px solid var(--divider)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, "\u0412\u0435\u0441 \u043F\u0440\u0438 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0438"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      color: a.applied ? 'var(--blue-700)' : 'var(--text-subtle)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, a.weight, "%"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 20,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--emerald-700)',
      borderRadius: 'var(--radius-xl)',
      padding: '28px 32px',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -30,
      bottom: -50,
      width: 220,
      height: 220,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-overline",
    style: {
      color: '#A7E8C8'
    }
  }, "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      fontWeight: 800,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-.02em',
      marginTop: 10,
      lineHeight: 1
    }
  }, D.result.value, " \u20BD"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: '#A7E8C8',
      fontWeight: 600
    }
  }, "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      marginTop: 4,
      fontVariantNumeric: 'tabular-nums'
    }
  }, D.result.low, " \u2013 ", D.result.high, " \u20BD")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: '#A7E8C8',
      fontWeight: 600
    }
  }, "\u0414\u0430\u0442\u0430 \u0440\u0430\u0441\u0447\u0435\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      marginTop: 4
    }
  }, D.result.date)))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u0435"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, (window.OcenkaData.approaches.find(a => a.key === 'comp') || {}).name?.replace(' ??????', '') + ' ? ' + (window.OcenkaData.approaches.find(a => a.key === 'comp') || {}).weight + '%'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, (window.OcenkaData.approaches.find(a => a.key === 'comp') || {}).value + " \u20BD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, (window.OcenkaData.approaches.find(a => a.key === 'cost') || {}).name?.replace(' ??????', '') + ' ? ' + (window.OcenkaData.approaches.find(a => a.key === 'cost') || {}).weight + '%'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, (window.OcenkaData.approaches.find(a => a.key === 'cost') || {}).value + " \u20BD")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement(NS.ProgressBar, {
    label: "\u0414\u043E\u0441\u0442\u043E\u0432\u0435\u0440\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430",
    value: 88
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right",
      size: 15
    }),
    onClick: () => onNavigate('fso')
  }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E \u0424\u0421\u041E")))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/CalcScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/DashboardScreen.jsx
try { (() => {
/* Dashboard — hero, KPI tiles, recent requests. window.DashboardScreen */
window.DashboardScreen = function DashboardScreen({
  onOpenRequest,
  onNavigate
}) {
  const {
    KpiCard,
    Card,
    Table,
    StatusBadge,
    Button,
    Avatar
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--blue-900)',
      borderRadius: 'var(--radius-xl)',
      padding: '28px 32px',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -40,
      top: -40,
      width: 280,
      height: 280,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(37,168,113,.22), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-overline",
    style: {
      color: '#7FB0E8'
    }
  }, "\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u0430"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 'var(--text-3xl)',
      fontWeight: 800,
      letterSpacing: '-.02em',
      marginTop: 10,
      lineHeight: 1.15
    }
  }, "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438:", /*#__PURE__*/React.createElement("br", null), "\u043E\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0434\u043E \u0433\u043E\u0442\u043E\u0432\u043E\u0433\u043E \u043E\u0442\u0447\u0435\u0442\u0430"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#C7D6EC',
      fontSize: 'var(--text-md)',
      marginTop: 12,
      lineHeight: 1.55
    }
  }, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0442\u044C \u0430\u043D\u0430\u043B\u043E\u0433\u0438, \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0440\u0430\u0441\u0447\u0435\u0442\u044B \u0438 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442 \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0439 \u0424\u0421\u041E."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "plus",
      size: 16
    }),
    onClick: () => onNavigate('requests')
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('fso'),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,.1)',
      color: '#fff',
      border: '1px solid rgba(255,255,255,.18)',
      borderRadius: 'var(--radius-md)',
      padding: '0 18px',
      height: 38,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "shield-check",
    size: 16
  }), " \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0424\u0421\u041E")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 16,
      marginBottom: 24
    }
  }, D.kpis.map((k, i) => /*#__PURE__*/React.createElement(KpiCard, {
    key: i,
    label: k.label,
    value: k.value,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: k.icon,
      size: 18
    }),
    iconTone: k.tone,
    delta: k.delta,
    deltaDir: k.dir,
    helper: k.helper
  }))), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true,
    title: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        n: "arrow-right",
        size: 15
      }),
      onClick: () => onNavigate('requests')
    }, "\u0412\u0441\u0435 \u0437\u0430\u044F\u0432\u043A\u0438")
  }, /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    onRowClick: r => onOpenRequest(r),
    columns: [{
      key: 'id',
      header: '№ заявки',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "ds-mono",
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.id)
    }, {
      key: 'object',
      header: 'Объект',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.object), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          marginTop: 2
        }
      }, r.address))
    }, {
      key: 'client',
      header: 'Клиент'
    }, {
      key: 'type',
      header: 'Тип оценки'
    }, {
      key: 'status',
      header: 'Статус',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status
      })
    }, {
      key: 'date',
      header: 'Дата оценки'
    }, {
      key: 'owner',
      header: 'Ответственный',
      render: r => r.owner === '—' ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-subtle)'
        }
      }, "\u2014") : /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.owner,
        size: "sm"
      }), r.owner)
    }, {
      key: 'act',
      header: '',
      align: 'right',
      render: () => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-subtle)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        n: "chevron-right",
        size: 16
      }))
    }],
    rows: D.requests.slice(0, 5)
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/FsoScreen.jsx
try { (() => {
/* ФСО compliance checklist with live progress. window.FsoScreen */
window.FsoScreen = function FsoScreen({
  onNavigate
}) {
  const {
    Card,
    Button,
    ProgressBar,
    Badge
  } = NS;
  const [items, setItems] = React.useState(window.OcenkaData.fso.map(x => ({
    ...x
  })));
  const done = items.filter(i => i.done).length;
  const pct = Math.round(done / items.length * 100);
  const toggle = idx => setItems(arr => arr.map((it, i) => i === idx ? {
    ...it,
    done: !it.done
  } : it));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0424\u0421\u041E",
    subtitle: "\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u043E\u0442\u0447\u0435\u0442\u0430 \u0444\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u044B\u043C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0430\u043C \u043E\u0446\u0435\u043D\u043A\u0438",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "refresh-cw",
        size: 16
      })
    }, "\u041F\u0435\u0440\u0435\u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.6fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 14,
      padding: '8px 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 132,
      height: 132
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "132",
    height: "132",
    viewBox: "0 0 132 132",
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: "58",
    fill: "none",
    stroke: "var(--neutral-200)",
    strokeWidth: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: "58",
    fill: "none",
    stroke: "var(--emerald-500)",
    strokeWidth: "12",
    strokeLinecap: "round",
    strokeDasharray: 2 * Math.PI * 58,
    strokeDashoffset: 2 * Math.PI * 58 * (1 - pct / 100),
    style: {
      transition: 'stroke-dashoffset .4s var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "\u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      color: 'var(--text-body)'
    }
  }, "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, done), " \u0438\u0437 ", items.length, " \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0439"), pct === 100 ? /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    pill: true,
    dot: true
  }, "\u0413\u043E\u0442\u043E\u0432 \u043A \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E") : /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    pill: true
  }, "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0430"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    disabled: pct !== 100,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-check",
      size: 16
    }),
    onClick: () => onNavigate('report')
  }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442"))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0427\u0435\u043A-\u043B\u0438\u0441\u0442 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F",
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", null, items.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => toggle(i),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      textAlign: 'left',
      padding: '14px 20px',
      border: 'none',
      borderBottom: i < items.length - 1 ? '1px solid var(--divider)' : 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: it.done ? 'var(--emerald-500)' : 'var(--surface-card)',
      border: it.done ? 'none' : '1.5px solid var(--border-strong)',
      color: '#fff'
    }
  }, it.done ? /*#__PURE__*/React.createElement(Icon, {
    n: "check",
    size: 14
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--text-md)',
      color: it.done ? 'var(--text-strong)' : 'var(--text-body)',
      fontWeight: it.done ? 500 : 400
    }
  }, it.label), it.done ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--success-text)',
      fontWeight: 600
    }
  }, "\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-subtle)'
    }
  }, "\u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E")))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/FsoScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/MiscScreens.jsx
try { (() => {
/* Clients + Settings. window.ClientsScreen, window.SettingsScreen */
window.ClientsScreen = function ClientsScreen() {
  const {
    Card,
    Table,
    Button,
    Badge,
    Avatar,
    Input
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B",
    subtitle: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0438 \u043E\u0446\u0435\u043D\u043A\u0438 \u0438 \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "plus",
        size: 16
      })
    }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u0430")
  }), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--divider)',
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      n: "search",
      size: 16
    }),
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u043A\u043B\u0438\u0435\u043D\u0442\u0430"
  })), /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    columns: [{
      key: 'name',
      header: 'Клиент',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.name,
        size: "sm"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.name))
    }, {
      key: 'kind',
      header: 'Тип',
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.kind === 'Юр. лицо' ? 'brand' : 'neutral'
      }, r.kind)
    }, {
      key: 'orders',
      header: 'Заказов',
      align: 'right'
    }, {
      key: 'contact',
      header: 'Контакт',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "ds-mono",
        style: {
          fontSize: 'var(--text-sm)'
        }
      }, r.contact)
    }],
    rows: D.clients
  })));
};
window.SettingsScreen = function SettingsScreen() {
  const {
    Card,
    Input,
    Select,
    Switch,
    Button
  } = NS;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    subtitle: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u0430 \u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043E\u0442\u0447\u0435\u0442\u043E\u0432"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u0430"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0424\u0418\u041E",
    defaultValue: "\u0412\u043B\u0430\u0441\u043E\u0432 \u0418\u0433\u043E\u0440\u044C \u0410\u043D\u0430\u0442\u043E\u043B\u044C\u0435\u0432\u0438\u0447"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u2116 \u0432 \u0440\u0435\u0435\u0441\u0442\u0440\u0435 \u0421\u0420\u041E",
    defaultValue: "012458",
    mono: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\u0421\u0430\u043C\u043E\u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u0430\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F",
    options: [{
      value: 'a',
      label: 'СРО «Российское общество оценщиков»'
    }, {
      value: 'b',
      label: 'СРО «СМАО»'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    defaultValue: "i.vlasov@ocenka.pro"
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043E\u0442\u0447\u0435\u0442\u043E\u0432"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "\u0424\u043E\u0440\u043C\u0430\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
    options: [{
      value: 'docx',
      label: 'DOCX'
    }, {
      value: 'pdf',
      label: 'PDF'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "\u0410\u0432\u0442\u043E\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E \u0424\u0421\u041E \u043F\u0435\u0440\u0435\u0434 \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u0432 \u043E\u0442\u0447\u0435\u0442",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430 \u043F\u043E e-mail"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F"))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/MiscScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/ObjectScreen.jsx
try { (() => {
/* Object card — details, documents, photos. window.ObjectScreen */
window.ObjectScreen = function ObjectScreen({
  onBack,
  onNavigate
}) {
  const {
    Card,
    Button,
    Badge,
    StatusBadge,
    Tabs
  } = NS;
  const o = window.OcenkaData.object;
  const [tab, setTab] = React.useState('params');
  const fileIcon = kind => kind === 'doc' ? 'file-text' : 'file';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-link)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "arrow-left",
    size: 15
  }), " \u0417\u0430\u044F\u0432\u043A\u0438"), /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-right",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-mono"
  }, o.id)), /*#__PURE__*/React.createElement(PageHead, {
    title: o.title,
    subtitle: o.address,
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "e",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "pencil",
        size: 16
      })
    }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"), /*#__PURE__*/React.createElement(Button, {
      key: "c",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "calculator",
        size: 16
      }),
      onClick: () => onNavigate('calc')
    }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0441\u0447\u0435\u0442\u0443")]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: "calc"
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, o.valueType), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, o.purpose)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'params',
      label: 'Параметры'
    }, {
      value: 'docs',
      label: 'Документы',
      count: o.docs.length
    }, {
      value: 'photos',
      label: 'Фотографии',
      count: o.photos
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, tab === 'params' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '22px 24px'
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0422\u0438\u043F \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
    value: o.type
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C",
    value: o.area
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u042D\u0442\u0430\u0436\u043D\u043E\u0441\u0442\u044C",
    value: o.floors
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0413\u043E\u0434 \u043F\u043E\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    value: o.year
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041A\u0430\u0434\u0430\u0441\u0442\u0440\u043E\u0432\u044B\u0439 \u2116",
    value: o.cadastral,
    mono: true
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0414\u0430\u0442\u0430 \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.date
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0426\u0435\u043B\u044C \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.purpose
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0412\u0438\u0434 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438",
    value: o.valueType
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A",
    value: o.client
  })) : null, tab === 'docs' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, o.docs.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 14px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-sm)',
      background: d.kind === 'pdf' ? 'var(--red-50)' : 'var(--blue-50)',
      color: d.kind === 'pdf' ? 'var(--red-600)' : 'var(--blue-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: fileIcon(d.kind),
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontSize: 'var(--text-sm)'
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, d.size)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "download",
    size: 17
  })))), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '12px',
      border: '1.5px dashed var(--border-default)',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "upload",
    size: 16
  }), " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442")) : null, tab === 'photos' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12
    }
  }, Array.from({
    length: o.photos
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: '4 / 3',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-subtle)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "image",
    size: 22
  })))) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u0421\u0432\u043E\u0434\u043A\u0430"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0417\u0430\u044F\u0432\u043A\u0430",
    value: o.id,
    mono: true
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A",
    value: o.client
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0426\u0435\u043B\u044C \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.purpose
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--text-muted)'
    }
  }, "\u041F\u0440\u0435\u0434\u0432. \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-3xl)',
      fontWeight: 700,
      color: 'var(--text-value)',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 6,
      letterSpacing: '-.01em'
    }
  }, window.OcenkaData.result.value + " \u20BD")))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0413\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u043A \u043E\u0442\u0447\u0435\u0442\u0443"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(NS.ProgressBar, {
    label: "\u0421\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0424\u0421\u041E",
    value: 80
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-check",
      size: 16
    }),
    onClick: () => onNavigate('report')
  }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0447\u0435\u0442"))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/ObjectScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/ReportScreen.jsx
try { (() => {
/* Report generation. window.ReportScreen */
window.ReportScreen = function ReportScreen({
  toast
}) {
  const {
    Card,
    Button,
    Badge,
    ProgressBar
  } = NS;
  const o = window.OcenkaData.object;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u041E\u0442\u0447\u0435\u0442 \u043E\u0431 \u043E\u0446\u0435\u043D\u043A\u0435",
    subtitle: "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0442\u043E\u0433\u043E\u0432\u043E\u0433\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u043E\u0431 \u043E\u0446\u0435\u043D\u043A\u0435"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 132,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '210 / 297',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--border-subtle)',
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: 'var(--blue-600)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      width: '80%',
      background: 'var(--neutral-200)',
      borderRadius: 2,
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      width: '60%',
      background: 'var(--neutral-200)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--divider)',
      margin: '6px 0'
    }
  }), Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 5,
      width: `${90 - i * 7}%`,
      background: 'var(--neutral-100)',
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margintop: 'auto',
      height: 18,
      width: '70%',
      background: 'var(--emerald-100)',
      borderRadius: 3,
      marginTop: 'auto'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "\u041E\u0442\u0447\u0435\u0442 \u043E\u0431 \u043E\u0446\u0435\u043D\u043A\u0435 \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u044B \u2116", o.id), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginTop: 6,
      fontSize: 'var(--text-sm)'
    }
  }, o.address), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "DOCX"), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "PDF"), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    pill: true,
    dot: true
  }, "\u0413\u043E\u0442\u043E\u0432 \u043A \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px 20px',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0412\u0438\u0434 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438",
    value: o.valueType
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0418\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C",
    value: window.OcenkaData.result.value + " \u20BD"
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u0414\u0430\u0442\u0430 \u043E\u0446\u0435\u043D\u043A\u0438",
    value: o.date
  }), /*#__PURE__*/React.createElement(DetailField, {
    label: "\u041E\u0431\u044A\u0435\u043C \u043E\u0442\u0447\u0435\u0442\u0430",
    value: `? ${window.OcenkaData.report.pageCount} ???????`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 22,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-text",
      size: 16
    }),
    onClick: () => toast('Файл DOCX сформирован и загружается')
  }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C DOCX"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "file-down",
      size: 16
    }),
    onClick: () => toast('Файл PDF сформирован и загружается')
  }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C PDF"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "send",
      size: 16
    }),
    onClick: () => toast('Отчет отправлен на проверку')
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443"))))), /*#__PURE__*/React.createElement(Card, {
    title: "\u0421\u043E\u0441\u0442\u0430\u0432 \u043E\u0442\u0447\u0435\u0442\u0430"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    label: "\u0413\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430",
    value: 80
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      marginTop: 4
    }
  }, (window.OcenkaData.reportSections || []).map(({ label, done: ok }, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: ok ? 'var(--success)' : 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: ok ? 'circle-check-big' : 'circle-dashed',
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ok ? 'var(--text-strong)' : 'var(--text-muted)'
    }
  }, label))))))));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/ReportScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/RequestsScreen.jsx
try { (() => {
/* Requests list with status tabs. window.RequestsScreen */
window.RequestsScreen = function RequestsScreen({
  onOpenRequest
}) {
  const {
    Card,
    Table,
    StatusBadge,
    Button,
    Tabs,
    Avatar,
    Input
  } = NS;
  const D = window.OcenkaData;
  const [tab, setTab] = React.useState('all');
  const counts = {
    all: D.requests.length
  };
  D.requests.forEach(r => {
    counts[r.status] = (counts[r.status] || 0) + 1;
  });
  const rows = tab === 'all' ? D.requests : D.requests.filter(r => r.status === tab);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "\u0417\u0430\u044F\u0432\u043A\u0438",
    subtitle: "\u0412\u0441\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043E\u0446\u0435\u043D\u043A\u0443 \u0438 \u0438\u0445 \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B",
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "f",
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "sliders-horizontal",
        size: 16
      })
    }, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), /*#__PURE__*/React.createElement(Button, {
      key: "n",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        n: "plus",
        size: 16
      })
    }, "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430")]
  }), /*#__PURE__*/React.createElement(Card, {
    noBodyPad: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'all',
      label: 'Все',
      count: counts.all
    }, {
      value: 'new',
      label: 'Новые',
      count: counts.new || 0
    }, {
      value: 'calc',
      label: 'В расчете',
      count: counts.calc || 0
    }, {
      value: 'review',
      label: 'На проверке',
      count: counts.review || 0
    }, {
      value: 'ready',
      label: 'Готовы',
      count: counts.ready || 0
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      n: "search",
      size: 16
    }),
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u044F\u0432\u043A\u0438"
  }))), /*#__PURE__*/React.createElement(Table, {
    numeric: true,
    onRowClick: r => onOpenRequest(r),
    columns: [{
      key: 'id',
      header: '№',
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "ds-mono",
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.id)
    }, {
      key: 'object',
      header: 'Объект',
      render: r => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          color: 'var(--text-strong)'
        }
      }, r.object), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          marginTop: 2
        }
      }, r.address))
    }, {
      key: 'client',
      header: 'Клиент'
    }, {
      key: 'type',
      header: 'Тип'
    }, {
      key: 'status',
      header: 'Статус',
      render: r => /*#__PURE__*/React.createElement(StatusBadge, {
        status: r.status
      })
    }, {
      key: 'date',
      header: 'Дата'
    }, {
      key: 'owner',
      header: 'Ответственный',
      render: r => r.owner === '—' ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-subtle)'
        }
      }, "\u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D") : /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.owner,
        size: "sm"
      }), r.owner)
    }],
    rows: rows
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/RequestsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/Sidebar.jsx
try { (() => {
/* Sidebar navigation — dark graphite rail. window.Sidebar */
window.Sidebar = function Sidebar({
  active,
  onNavigate
}) {
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--sidebar-width)',
      flexShrink: 0,
      height: '100%',
      background: 'var(--surface-sidebar)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '18px 20px 16px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mark.svg",
    alt: "",
    style: {
      width: 34,
      height: 34
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '-.01em'
    }
  }, "\u041E\u0446\u0435\u043D\u043A\u0430", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#5DC393'
    }
  }, " PRO")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--text-on-sidebar-muted)',
      marginTop: 3
    }
  }, "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0446\u0435\u043D\u043A\u0438"))), /*#__PURE__*/React.createElement("nav", {
    className: "ds-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, D.nav.map(item => {
    const on = item.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item.key,
      onClick: () => onNavigate(item.key),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        width: '100%',
        padding: '9px 12px',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        background: on ? 'var(--blue-600)' : 'transparent',
        color: on ? '#fff' : 'var(--text-on-sidebar)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        fontWeight: on ? 600 : 500,
        transition: 'background var(--duration-fast), color var(--duration-fast)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'var(--surface-sidebar-hover)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      n: item.icon,
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, item.label), item.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 20,
        height: 20,
        padding: '0 6px',
        borderRadius: 999,
        background: on ? 'rgba(255,255,255,.22)' : 'var(--blue-600)',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, item.badge) : null);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      margin: 12,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-sidebar-hover)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#fff',
      fontWeight: 600,
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "life-buoy",
    size: 16
  }), " \u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0424\u0421\u041E"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-on-sidebar-muted)',
      lineHeight: 1.5
    }
  }, "\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0437\u0430\u0434\u0430\u043D\u0438\u0439 \u0438 \u043C\u0435\u0442\u043E\u0434\u0438\u043A\u0438 \u043E\u0446\u0435\u043D\u043A\u0438 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/Topbar.jsx
try { (() => {
/* Topbar — search, new appraisal, profile. window.Topbar */
window.Topbar = function Topbar({
  onNewAppraisal
}) {
  const {
    Button,
    IconButton,
    Avatar
  } = NS;
  const D = window.OcenkaData;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-height)',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 24px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ock-input",
    style: {
      background: 'var(--surface-inset)',
      border: '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ock-input__affix"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "search",
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    className: "ock-input__el",
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u044F\u0432\u043A\u0430\u043C, \u043E\u0431\u044A\u0435\u043A\u0442\u0430\u043C, \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u2026",
    style: {
      background: 'transparent'
    }
  }), /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-subtle)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 4,
      padding: '1px 6px'
    }
  }, "\u2318K"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      n: "plus",
      size: 16
    }),
    onClick: onNewAppraisal
  }, "\u041D\u043E\u0432\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "bell",
    size: 18
  })), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "\u041F\u043E\u043C\u043E\u0449\u044C"
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "circle-help",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 28,
      background: 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 6px',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: D.user.name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, D.user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, D.user.role)), /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-down",
    size: 16,
    style: {
      color: 'var(--text-muted)'
    }
  })));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ocenka-app/data.js
try { (() => {
/* Ocenka PRO — UI kit mock data (realistic Russian appraisal data) */
window.OcenkaData = window.OcenkaData || {};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ocenka-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.STATUS = __ds_scope.STATUS;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
