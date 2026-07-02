# Select

Styled native dropdown matching the input system. Pass `options={[{value,label}]}` or `<option>` children.

```jsx
<Select label="Тип оценки" options={[
  { value: 'market', label: 'Рыночная стоимость' },
  { value: 'cadastral', label: 'Кадастровая стоимость' },
  { value: 'liquidation', label: 'Ликвидационная стоимость' },
]} />
<Select placeholder="Выберите оценщика" options={appraisers} />
```

Supports `label`, `hint`, `error`, `required`. Forwards native select attributes (`value`, `onChange`, `disabled`).
