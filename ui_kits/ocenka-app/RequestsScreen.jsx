/* Requests list with status tabs. window.RequestsScreen */
window.RequestsScreen = function RequestsScreen({ onOpenRequest }) {
  const { Card, Table, StatusBadge, Button, Tabs, Avatar, Input } = NS;
  const D = window.OcenkaData;
  const [tab, setTab] = React.useState('all');

  const counts = { all: D.requests.length };
  D.requests.forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });
  const rows = tab === 'all' ? D.requests : D.requests.filter((r) => r.status === tab);

  return (
    <div>
      <PageHead title="Заявки" subtitle="Все заявки на оценку и их текущие статусы"
        actions={[
          <Button key="f" variant="secondary" iconLeft={<Icon n="sliders-horizontal" size={16} />}>Фильтры</Button>,
          <Button key="n" variant="primary" iconLeft={<Icon n="plus" size={16} />}>Новая заявка</Button>,
        ]} />

      <Card noBodyPad>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--divider)' }}>
          <div style={{ flex: 1 }}>
            <Tabs value={tab} onChange={setTab} items={[
              { value: 'all', label: 'Все', count: counts.all },
              { value: 'new', label: 'Новые', count: counts.new || 0 },
              { value: 'calc', label: 'В расчете', count: counts.calc || 0 },
              { value: 'review', label: 'На проверке', count: counts.review || 0 },
              { value: 'ready', label: 'Готовы', count: counts.ready || 0 },
            ]} />
          </div>
          <div style={{ width: 240 }}>
            <Input size="sm" prefix={<Icon n="search" size={16} />} placeholder="Поиск заявки" />
          </div>
        </div>
        <Table numeric onRowClick={(r) => onOpenRequest(r)}
          columns={[
            { key: 'id', header: '№', render: (r) => <span className="ds-mono" style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.id}</span> },
            { key: 'object', header: 'Объект', render: (r) => (
              <div><div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.object}</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{r.address}</div></div>
            ) },
            { key: 'client', header: 'Клиент' },
            { key: 'type', header: 'Тип' },
            { key: 'status', header: 'Статус', render: (r) => <StatusBadge status={r.status} /> },
            { key: 'date', header: 'Дата' },
            { key: 'owner', header: 'Ответственный', render: (r) => r.owner === '—'
              ? <span style={{ color: 'var(--text-subtle)' }}>не назначен</span>
              : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Avatar name={r.owner} size="sm" />{r.owner}</span> },
          ]}
          rows={rows} />
      </Card>
    </div>
  );
};
