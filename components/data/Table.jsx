import React from 'react';

/**
 * Data table. Pass `columns` + `rows` for the data-driven form, or use the
 * exported Table.Head/Body helpers via children for full control.
 */
export function Table({
  columns,
  rows,
  getRowKey,
  numeric = false,
  onRowClick,
  className = '',
  children,
  ...rest
}) {
  const cls = ['ock-table', numeric ? 'ock-table--num' : '', className].filter(Boolean).join(' ');

  if (!columns) {
    return (
      <div className="ock-table-wrap">
        <table className={cls} {...rest}>{children}</table>
      </div>
    );
  }

  return (
    <div className="ock-table-wrap">
      <table className={cls} {...rest}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align || 'left', width: c.width }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getRowKey ? getRowKey(row, i) : (row.id ?? i)}
              onClick={onRowClick ? () => onRowClick(row, i) : undefined}
              style={onRowClick ? { cursor: 'pointer' } : undefined}
            >
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align || 'left' }}>
                  {c.render ? c.render(row, i) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
