import * as React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Optional text label after the toggle. */
  label?: React.ReactNode;
}

/**
 * Binary on/off switch (emerald when on). Use for settings and
 * "применять подход" toggles. Forwards `checked`, `onChange`, `disabled`.
 */
export function Switch(props: SwitchProps): JSX.Element;
