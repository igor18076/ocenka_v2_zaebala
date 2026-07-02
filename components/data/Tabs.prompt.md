# Tabs

Underline tab bar with optional count chips. Controlled via `value` / `onChange`.

```jsx
const [tab, setTab] = useState('all');
<Tabs value={tab} onChange={setTab} items={[
  { value: 'all', label: 'Все', count: 24 },
  { value: 'new', label: 'Новые', count: 6 },
  { value: 'review', label: 'На проверке', count: 3 },
]} />
```

Items: `{ value, label, count? }`. Used to switch object-card sections and filter заявки.
