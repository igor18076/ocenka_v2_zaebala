import React from 'react';

/**
 * Text input with optional label, hint, error and affix icons.
 */
export function Input({
  label,
  hint,
  error,
  required = false,
  prefix,
  suffix,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const inputId = id || (label ? `in-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const boxCls = [
    'ock-input',
    size === 'sm' ? 'ock-input--sm' : '',
    error ? 'ock-input--error' : '',
    disabled ? 'ock-input--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const control = (
    <div className={boxCls}>
      {prefix ? <span className="ock-input__affix">{prefix}</span> : null}
      <input id={inputId} className="ock-input__el" disabled={disabled} {...rest} />
      {suffix ? <span className="ock-input__affix">{suffix}</span> : null}
    </div>
  );

  if (!label && !hint && !error) return control;

  return (
    <div className="ock-field">
      {label ? (
        <label className="ock-field__label" htmlFor={inputId}>
          {label}{required ? <span className="ock-field__req">*</span> : null}
        </label>
      ) : null}
      {control}
      {error ? <span className="ock-field__error">{error}</span>
        : hint ? <span className="ock-field__hint">{hint}</span> : null}
    </div>
  );
}
