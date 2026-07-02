import * as React from 'react';

/**
 * Text input props.
 *
 * @startingPoint section="Forms" subtitle="Text input — label, hint, error, affixes" viewport="700x150"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the control. */
  hint?: React.ReactNode;
  /** Error message — overrides hint and turns the control red. */
  error?: React.ReactNode;
  /** Show a red required asterisk on the label. */
  required?: boolean;
  /** Icon node inside the control on the left. */
  prefix?: React.ReactNode;
  /** Icon node inside the control on the right. */
  suffix?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md';
}

/**
 * Single-line text input. Supports label/hint/error and affix icons
 * (e.g. a search glass or a ₽ suffix). When no label/hint/error is given,
 * renders just the bare control so it can sit inside custom layouts.
 */
export function Input(props: InputProps): JSX.Element;
