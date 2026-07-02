import React from 'react';

/**
 * Request lifecycle status pill. Each status maps to a fixed color + label.
 */
export const STATUS = {
  new:     { label: 'Новая',              bg: 'var(--status-new-bg)',     fg: 'var(--status-new-fg)',     dot: 'var(--status-new-dot)' },
  docs:    { label: 'Документы получены', bg: 'var(--status-docs-bg)',    fg: 'var(--status-docs-fg)',    dot: 'var(--status-docs-dot)' },
  analogs: { label: 'Аналоги подобраны',  bg: 'var(--status-analogs-bg)', fg: 'var(--status-analogs-fg)', dot: 'var(--status-analogs-dot)' },
  calc:    { label: 'Расчет выполнен',    bg: 'var(--status-calc-bg)',    fg: 'var(--status-calc-fg)',    dot: 'var(--status-calc-dot)' },
  review:  { label: 'На проверке',        bg: 'var(--status-review-bg)',  fg: 'var(--status-review-fg)',  dot: 'var(--status-review-dot)' },
  ready:   { label: 'Отчет готов',        bg: 'var(--status-ready-bg)',   fg: 'var(--status-ready-fg)',   dot: 'var(--status-ready-dot)' },
};

export function StatusBadge({ status = 'new', label, className = '', ...rest }) {
  const s = STATUS[status] || STATUS.new;
  return (
    <span
      className={['ock-status', className].filter(Boolean).join(' ')}
      style={{ background: s.bg, color: s.fg }}
      {...rest}
    >
      <span className="ock-status__dot" style={{ background: s.dot }} />
      {label || s.label}
    </span>
  );
}
