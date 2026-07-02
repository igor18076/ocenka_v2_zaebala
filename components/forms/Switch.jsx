import React from 'react';

/**
 * On/off toggle. Use for binary settings (e.g. применять подход).
 */
export function Switch({ label, disabled = false, className = '', ...rest }) {
  return (
    <label className={['ock-switch', className].filter(Boolean).join(' ')} data-disabled={disabled ? 'true' : 'false'}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span className="ock-switch__track"><span className="ock-switch__thumb" /></span>
      {label ? <span className="ock-switch__label">{label}</span> : null}
    </label>
  );
}
