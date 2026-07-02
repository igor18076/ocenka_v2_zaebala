import React from 'react';

/**
 * Underline tab bar. Controlled via `value`/`onChange`, items as [{value,label,count}].
 */
export function Tabs({ items = [], value, onChange, className = '', ...rest }) {
  return (
    <div className={['ock-tabs', className].filter(Boolean).join(' ')} role="tablist" {...rest}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={active}
            className={`ock-tab${active ? ' ock-tab--active' : ''}`}
            onClick={onChange ? () => onChange(it.value) : undefined}
          >
            {it.label}
            {it.count != null ? <span className="ock-tab__count">{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
