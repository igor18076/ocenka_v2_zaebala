import React from 'react';

/**
 * Linear progress bar with optional label + percentage.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  tone = 'accent',
  className = '',
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fillCls = [
    'ock-progress__fill',
    tone === 'brand' ? 'ock-progress__fill--brand' : '',
    tone === 'warning' ? 'ock-progress__fill--warning' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={['ock-progress', className].filter(Boolean).join(' ')} {...rest}>
      {(label || showValue) ? (
        <div className="ock-progress__top">
          {label ? <span className="ock-progress__label">{label}</span> : <span />}
          {showValue ? <span className="ock-progress__pct">{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      <div className="ock-progress__track" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className={fillCls} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
