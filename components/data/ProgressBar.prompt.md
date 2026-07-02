# ProgressBar

Linear progress indicator. Used for ФСО compliance (% соответствия) and completion metrics.

```jsx
<ProgressBar label="Соответствие ФСО" value={80} />
<ProgressBar value={60} tone="brand" />
<ProgressBar label="Готовность отчета" value={45} tone="warning" />
```

Props: `value`, `max` (default 100), `label`, `showValue`, `tone` (`accent · brand · warning`).
