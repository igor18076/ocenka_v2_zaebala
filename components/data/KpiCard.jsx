import React from 'react';

const ArrowUp = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 12V4m0 0L4.5 7.5M8 4l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ArrowDown = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 4v8m0 0l3.5-3.5M8 12L4.5 8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/**
 * Metric / KPI tile for the dashboard.
 */
export function KpiCard({
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
  return (
    <div className={cls} onClick={onClick} {...rest}>
      <div className="ock-kpi__top">
        <span className="ock-kpi__label">{label}</span>
        {icon ? <span className={`ock-kpi__icon${iconTone !== 'brand' ? ` ock-kpi__icon--${iconTone}` : ''}`}>{icon}</span> : null}
      </div>
      <div className="ock-kpi__value">{value}</div>
      {(delta != null || helper) ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {delta != null ? (
            <span className={`ock-kpi__delta ock-kpi__delta--${deltaDir}`}>
              {deltaDir === 'down' ? <ArrowDown /> : <ArrowUp />}{delta}
            </span>
          ) : null}
          {helper ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{helper}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
