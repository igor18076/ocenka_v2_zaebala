# KpiCard

Dashboard metric tile: caption, big value, optional icon, delta and helper text. Gains a hover lift when given `onClick`.

```jsx
<KpiCard label="Активные заявки" value="24" icon={<FileText size={18} />}
         delta="+8%" deltaDir="up" helper="за неделю" />
<KpiCard label="Средняя стоимость объектов" value="8.4 млн ₽"
         icon={<Wallet size={18} />} iconTone="accent" />
<KpiCard label="Проверки ФСО" value="92%" icon={<ShieldCheck size={18} />} iconTone="warning" />
```

Props: `label`, `value`, `icon`, `iconTone` (`brand · accent · warning`), `delta`, `deltaDir`, `helper`, `onClick`.
