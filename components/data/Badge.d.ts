import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  /** Fully rounded pill shape. */
  pill?: boolean;
  /** Leading dot in the current text color. */
  dot?: boolean;
  children?: React.ReactNode;
}

/**
 * Compact label chip for categories, counts and tags
 * (e.g. «Высокая сопоставимость», «Требует проверки»).
 * For request lifecycle states use StatusBadge instead.
 */
export function Badge(props: BadgeProps): JSX.Element;
