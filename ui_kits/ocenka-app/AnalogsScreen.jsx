/* Analog selection module. window.AnalogsScreen */
window.AnalogsScreen = function AnalogsScreen({ onNavigate }) {
  const { Card, Table, Button, Badge } = NS;
  const D = window.OcenkaData;

  const compBadge = (c) => {
    if (c === 'high') return <Badge tone="success" pill dot>Высокая сопоставимость</Badge>;
    if (c === 'check') return <Badge tone="warning" pill>Требует проверки</Badge>;
    return <Badge tone="neutral" pill>Средняя</Badge>;
  };

  return (
    <div>
      <PageHead title="Подбор аналогов" subtitle="Объект ОЗ-1040 · Жилой дом, пос. Барвиха"
        actions={[
          <Button key="m" variant="secondary" iconLeft={<Icon n="plus" size={16} />}>Добавить вручную</Button>,
          <Button key="a" variant="primary" iconLeft={<Icon n="sparkles" size={16} />}>Подобрать аналоги</Button>,
        ]} />

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        {[
          { l: 'Найдено аналогов', v: '4', i: 'git-compare', t: 'brand' },
          { l: 'Средняя цена за м²', v: '119 559 ₽', i: 'ruler', t: 'brand' },
          { l: 'Радиус поиска', v: '4.0 км', i: 'map-pin', t: 'brand' },
          { l: 'Высокая сопоставимость', v: '2', i: 'badge-check', t: 'accent' },
        ].map((s, i) => (
          <NS.KpiCard key={i} label={s.l} value={s.v} icon={<Icon n={s.i} size={18} />} iconTone={s.t} />
        ))}
      </div>

      <Card noBodyPad title="Объекты-аналоги"
        actions={<Badge tone="info">Источники: ЦИАН, Авито, Domclick</Badge>}>
        <Table numeric
          columns={[
            { key: 'addr', header: 'Адрес аналога', render: (r) => (
              <div><div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.addr}</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>Источник: {r.source}</div></div>
            ) },
            { key: 'price', header: 'Цена, ₽', align: 'right', render: (r) => <span>{r.price}</span> },
            { key: 'area', header: 'Площадь', align: 'right', render: (r) => `${r.area} м²` },
            { key: 'perM2', header: 'Цена за м²', align: 'right', render: (r) => `${r.perM2} ₽` },
            { key: 'dist', header: 'Расст.', align: 'right' },
            { key: 'cond', header: 'Состояние' },
            { key: 'adj', header: 'Коррект.', align: 'right', render: (r) => (
              <span style={{ fontWeight: 600, color: r.adj.startsWith('−') ? 'var(--danger-text)' : 'var(--success-text)' }}>{r.adj}</span>
            ) },
            { key: 'final', header: 'Скоррект. цена', align: 'right', render: (r) => <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{r.final} ₽</span> },
            { key: 'comp', header: 'Сопоставимость', render: (r) => compBadge(r.comp) },
          ]}
          rows={D.analogs} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid var(--divider)', background: 'var(--surface-inset)' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Средняя скорректированная стоимость по выборке</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-value)', fontVariantNumeric: 'tabular-nums' }}>23 207 300 ₽</span>
            <Button variant="primary" iconRight={<Icon n="arrow-right" size={15} />} onClick={() => onNavigate('calc')}>В расчет стоимости</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
