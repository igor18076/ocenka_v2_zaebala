# Table

Data table with uppercase header row, hover highlight and optional tabular figures. Data-driven via `columns` + `rows`.

```jsx
<Table
  numeric
  columns={[
    { key: 'id', header: '№' },
    { key: 'object', header: 'Объект' },
    { key: 'price', header: 'Цена', align: 'right' },
    { key: 'status', header: 'Статус', render: (r) => <StatusBadge status={r.status} /> },
  ]}
  rows={requests}
  onRowClick={(r) => open(r)}
/>
```

Each column: `{ key, header, align, width, render(row, i) }`. Props: `numeric`, `onRowClick`, `getRowKey`. Best placed inside `<Card noBodyPad>`. Omit `columns` to pass raw `<thead>/<tbody>` children.
