import * as React from 'react';

export interface TableColumn<Row = any> {
  /** Unique column key; also the property read from each row when no `render`. */
  key: string;
  /** Header label. */
  header: React.ReactNode;
  /** Cell alignment. @default "left" */
  align?: 'left' | 'center' | 'right';
  /** Optional fixed/initial width (CSS value). */
  width?: string | number;
  /** Custom cell renderer; receives the row and its index. */
  render?: (row: Row, index: number) => React.ReactNode;
}

/**
 * Data table props.
 *
 * @startingPoint section="Data" subtitle="Data table — заявки, аналоги" viewport="900x320"
 */
export interface TableProps<Row = any> extends React.HTMLAttributes<HTMLTableElement> {
  /** Column definitions (data-driven form). */
  columns?: TableColumn<Row>[];
  /** Row objects. */
  rows?: Row[];
  /** Derive a React key per row. */
  getRowKey?: (row: Row, index: number) => React.Key;
  /** Apply tabular-figures to the whole table. */
  numeric?: boolean;
  /** Row click handler (adds pointer cursor). */
  onRowClick?: (row: Row, index: number) => void;
  /** When `columns` is omitted, supply raw <thead>/<tbody> children. */
  children?: React.ReactNode;
}

/**
 * Data table styled for Ocenka — uppercase header row, hover highlight,
 * tabular figures option. Used for заявки, аналоги and any tabular data.
 */
export function Table<Row = any>(props: TableProps<Row>): JSX.Element;
