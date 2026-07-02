import React from 'react';

const SIZES = { sm: 'ock-btn--sm', md: '', lg: 'ock-btn--lg' };

/**
 * Ocenka PRO primary button.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  block = false,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'ock-btn',
    `ock-btn--${variant}`,
    SIZES[size] || '',
    block ? 'ock-btn--block' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} {...rest}>
      {iconLeft ? <span className="ock-btn__icon">{iconLeft}</span> : null}
      {children}
      {iconRight ? <span className="ock-btn__icon">{iconRight}</span> : null}
    </button>
  );
}
