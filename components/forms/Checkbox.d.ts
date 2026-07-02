import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** "checkbox" (default) or "radio" — radio renders a dot instead of a tick. */
  type?: 'checkbox' | 'radio';
  /** Text label beside the control (or pass children). */
  label?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Checkbox (default) or radio. Used in the ФСО checklist, filters and forms.
 * Forwards `checked`, `defaultChecked`, `onChange`, `name`, `disabled`.
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
