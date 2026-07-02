# Input

Single-line text field. Supports `label`, `hint`, `error`, `required`, and affix icons via `prefix` / `suffix`.

```jsx
<Input label="Адрес объекта" placeholder="г. Москва, ул. …" required />
<Input prefix={<Search size={17} />} placeholder="Поиск по заявкам" />
<Input label="Площадь" suffix={<span>м²</span>} defaultValue="58.4" />
<Input label="E-mail" error="Некорректный адрес" defaultValue="ivan@" />
```

Sizes: `sm · md`. With no label/hint/error it renders just the bare control. Forwards all native input attributes.
