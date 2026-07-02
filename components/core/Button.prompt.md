# Button

Primary action button. Use for any clickable action; pick the variant by emphasis — `primary` (deep blue) for the main action, `accent` (emerald) for value/report actions, `secondary` for neutral, `ghost` for toolbars, `danger` for destructive.

```jsx
<Button variant="primary" iconLeft={<Plus size={16} />}>Новая оценка</Button>
<Button variant="accent">Сформировать отчет</Button>
<Button variant="secondary" size="sm">Отмена</Button>
<Button variant="ghost" iconLeft={<Filter size={16} />}>Фильтры</Button>
```

Variants: `primary · accent · secondary · ghost · danger · link`. Sizes: `sm · md · lg`. Props: `iconLeft`, `iconRight` (ReactNode), `block`, plus all native button attributes (`onClick`, `disabled`, `type`).
