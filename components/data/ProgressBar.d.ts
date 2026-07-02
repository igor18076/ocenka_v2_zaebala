import * as React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. @default 0 */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Optional label above the track. */
  label?: React.ReactNode;
  /** Show the rounded percentage. @default true */
  showValue?: boolean;
  /** Fill color. @default "accent" */
  tone?: 'accent' | 'brand' | 'warning';
}

/**
 * Linear progress indicator. Used for ФСО compliance (% соответствия) and
 * any completion metric.
 */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
