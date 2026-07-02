import React from 'react';

/**
 * Square icon-only button. Pass a single icon node as children.
 */
export function IconButton({
  size = 'md',
  bordered = false,
  className = '',
  'aria-label': ariaLabel,
  children,
  ...rest
}) {
  const cls = [
    'ock-iconbtn',
    size === 'sm' ? 'ock-iconbtn--sm' : '',
    bordered ? 'ock-iconbtn--bordered' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} aria-label={ariaLabel} {...rest}>
      {children}
    </button>
  );
}
