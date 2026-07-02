import React from 'react';

function initials(name = '') {
  const parts = String(name).trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0] || '').join('').toUpperCase();
}

/**
 * User avatar — image when `src` given, otherwise initials from `name`.
 */
export function Avatar({ name, src, size = 'md', className = '', ...rest }) {
  const cls = [
    'ock-avatar',
    size === 'sm' ? 'ock-avatar--sm' : '',
    size === 'lg' ? 'ock-avatar--lg' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name || ''} /> : initials(name)}
    </span>
  );
}
