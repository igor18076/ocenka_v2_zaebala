import * as React from 'react';

export type RequestStatus = 'new' | 'docs' | 'analogs' | 'calc' | 'review' | 'ready';

/**
 * Status pill props.
 *
 * @startingPoint section="Data" subtitle="Request lifecycle status pills" viewport="700x150"
 */
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Lifecycle stage:
   * new → docs → analogs → calc → review → ready
   * @default "new"
   */
  status?: RequestStatus;
  /** Override the default Russian label. */
  label?: React.ReactNode;
}

/**
 * Status pill for the appraisal request lifecycle. Each stage has a fixed,
 * accessible color and Russian label (Новая → Отчет готов).
 */
export function StatusBadge(props: StatusBadgeProps): JSX.Element;

export const STATUS: Record<RequestStatus, { label: string; bg: string; fg: string; dot: string }>;
