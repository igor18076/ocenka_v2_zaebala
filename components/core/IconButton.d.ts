import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Add a visible border + card background (for standalone toolbar buttons). */
  bordered?: boolean;
  /** Accessible label — required since there is no visible text. */
  'aria-label': string;
  /** A single icon node. */
  children: React.ReactNode;
}

/**
 * Icon-only button for toolbars, table row actions and the topbar.
 * Always supply an `aria-label`.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
