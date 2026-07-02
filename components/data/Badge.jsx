import React from 'react';

/**
 * Small label chip for tones/categories. For request lifecycle states use StatusBadge.
 */
export function Badge({ tone = 'neutral', pill = false, dot = false, className = '', children, ...rest }) {
  const cls = [
    'ock-badge',
    `ock-badge--${tone}`,
    pill ? 'ock-badge--pill' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="ock-badge__dot" style={{ background: 'currentColor' }} /> : null}
      {children}
    </span>
  );
}
