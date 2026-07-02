import React from 'react';

/**
 * Surface container. Optional header (title + actions) and padded body.
 */
export function Card({
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
  const cls = [
    'ock-card',
    elevation === 'raised' ? 'ock-card--raised' : '',
    elevation === 'floating' ? 'ock-card--floating' : '',
    className,
  ].filter(Boolean).join(' ');

  const hasHeader = title != null || actions != null;

  return (
    <div className={cls} {...rest}>
      {hasHeader ? (
        <div className={['ock-card__header', headerClassName].filter(Boolean).join(' ')}>
          {typeof title === 'string' ? <h3 className="ock-card__title">{title}</h3> : title}
          {actions ? <div className="ock-card__actions">{actions}</div> : null}
        </div>
      ) : null}
      {noBodyPad
        ? children
        : <div className={['ock-card__body', bodyClassName].filter(Boolean).join(' ')}>{children}</div>}
    </div>
  );
}
