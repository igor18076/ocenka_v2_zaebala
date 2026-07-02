import * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** Options array; alternatively pass <option> children. */
  options?: SelectOption[];
  /** Disabled, hidden first option used as a prompt. */
  placeholder?: string;
  children?: React.ReactNode;
}

/**
 * Native dropdown styled to match Ocenka inputs (custom chevron, focus ring).
 * Provide `options` or `<option>` children.
 */
export function Select(props: SelectProps): JSX.Element;
