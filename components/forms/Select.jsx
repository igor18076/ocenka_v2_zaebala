import React from 'react';

const Chevron = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Native select styled to match Ocenka inputs.
 * Pass options as [{value, label}] or render <option> children.
 */
export function Select({
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

  const control = (
    <div className={['ock-select', className].filter(Boolean).join(' ')}>
      <select id={selId} className="ock-select__el" {...rest}>
        {placeholder ? <option value="" disabled hidden>{placeholder}</option> : null}
        {options
          ? options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
          : children}
      </select>
      <span className="ock-select__chev"><Chevron /></span>
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className="ock-field">
      {label ? (
        <label className="ock-field__label" htmlFor={selId}>
          {label}{required ? <span className="ock-field__req">*</span> : null}
        </label>
      ) : null}
      {control}
      {error ? <span className="ock-field__error">{error}</span>
        : hint ? <span className="ock-field__hint">{hint}</span> : null}
    </div>
  );
}
