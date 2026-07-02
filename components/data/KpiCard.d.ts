import * as React from 'react';

/**
 * Dashboard metric tile props.
 *
 * @startingPoint section="Data" subtitle="Dashboard KPI metric tile" viewport="700x200"
 */
export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric caption, e.g. «Активные заявки». */
  label: React.ReactNode;
  /** Big metric value (tabular figures applied automatically). */
  value: React.ReactNode;
  /** Icon node shown top-right. */
  icon?: React.ReactNode;
  /** Icon tint. @default "brand" */
  iconTone?: 'brand' | 'accent' | 'warning';
  /** Delta label, e.g. "+12%". */
  delta?: React.ReactNode;
  /** Delta direction (color + arrow). @default "up" */
  deltaDir?: 'up' | 'down';
  /** Muted helper text beside the delta. */
  helper?: React.ReactNode;
}

/**
 * Dashboard metric tile. Becomes interactive (hover lift) when given onClick.
 */
export function KpiCard(props: KpiCardProps): JSX.Element;
