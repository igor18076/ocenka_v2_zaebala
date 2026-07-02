import * as React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Optional count chip after the label. */
  count?: number;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  /** Currently selected value. */
  value: string;
  /** Called with the new value on tab click. */
  onChange?: (value: string) => void;
}

/**
 * Underline tab bar with optional count chips. Used to switch object-card
 * sections (Документы / Фотографии / Расчеты) and filter заявки by status.
 */
export function Tabs(props: TabsProps): JSX.Element;
