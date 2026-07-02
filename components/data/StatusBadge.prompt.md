# StatusBadge

Status pill for the appraisal request lifecycle. Each stage has a fixed color + Russian label.

```jsx
<StatusBadge status="new" />        {/* Новая */}
<StatusBadge status="docs" />       {/* Документы получены */}
<StatusBadge status="analogs" />    {/* Аналоги подобраны */}
<StatusBadge status="calc" />       {/* Расчет выполнен */}
<StatusBadge status="review" />     {/* На проверке */}
<StatusBadge status="ready" />      {/* Отчет готов */}
```

Statuses: `new · docs · analogs · calc · review · ready`. Override text with `label`. Exported `STATUS` map gives `{label,bg,fg,dot}` per status.
