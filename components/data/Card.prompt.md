# Card

Surface container with optional header (title + actions) and padded body. The base panel for the whole app.

```jsx
<Card title="Последние заявки" actions={<Button variant="ghost" size="sm">Все заявки</Button>}>
  …
</Card>

<Card title="Аналоги" elevation="raised" noBodyPad>
  <Table … />
</Card>
```

Props: `title`, `actions`, `elevation` (`flat · raised · floating`), `noBodyPad`. Use `noBodyPad` when the body is a full-bleed table.
