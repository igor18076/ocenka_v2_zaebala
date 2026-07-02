import React from 'react';

const Check = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Checkbox or radio (set type="radio"). Label is optional children.
 */
export function Checkbox({
  type = 'checkbox',
  label,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const isRadio = type === 'radio';
  const cls = ['ock-check', isRadio ? 'ock-check--radio' : '', className].filter(Boolean).join(' ');
  return (
    <label className={cls} data-disabled={disabled ? 'true' : 'false'}>
      <input type={type} disabled={disabled} {...rest} />
      <span className="ock-check__box">
        {isRadio ? <span className="ock-check__dot" /> : <Check />}
      </span>
      {(label || children) ? <span className="ock-check__label">{label || children}</span> : null}
    </label>
  );
}
