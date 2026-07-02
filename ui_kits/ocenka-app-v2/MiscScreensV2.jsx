/* Clients + Settings. window.ClientsScreen, window.SettingsScreen */
window.ClientsScreenV2 = function ClientsScreenV2({ toast }) {
  const { Card, Table, Button, Badge, Avatar, Input } = NS;
  const D = window.OcenkaData;
  const [clients, setClients] = React.useState(D.clients || []);
  const [query, setQuery] = React.useState('');
  const filtered = clients.filter((client) => [client.name, client.kind, client.contact].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  const addClient = () => {
    const name = window.prompt('Название клиента');
    if (!name || !name.trim()) return;
    setClients((items) => [{
      name: name.trim(),
      kind: 'Физ. лицо',
      orders: 0,
      contact: '',
    }, ...items]);
    if (toast) toast('Клиент добавлен');
  };
  return (
    <div>
      <PageHead title="Клиенты" subtitle="Заказчики оценки и история обращений"
        actions={<Button variant="primary" iconLeft={<Icon n="plus" size={16} />} onClick={addClient}>Добавить клиента</Button>} />
      <Card noBodyPad>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--divider)', width: 280 }}>
          <Input size="sm" prefix={<Icon n="search" size={16} />} placeholder="Поиск клиента" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <Table numeric columns={[
          { key: 'name', header: 'Клиент', render: (r) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={r.name} size="sm" />
              <span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.name}</span>
            </span>
          ) },
          { key: 'kind', header: 'Тип', render: (r) => <Badge tone={r.kind === 'Юр. лицо' ? 'brand' : 'neutral'}>{r.kind}</Badge> },
          { key: 'orders', header: 'Заказов', align: 'right' },
          { key: 'contact', header: 'Контакт', render: (r) => <span className="ds-mono" style={{ fontSize: 'var(--text-sm)' }}>{r.contact}</span> },
        ]} rows={filtered} />
      </Card>
    </div>
  );
};

window.SettingsScreenV2 = function SettingsScreenV2({ toast }) {
  const { Card, Input, Select, Switch, Button } = NS;
  return (
    <div>
      <PageHead title="Настройки" subtitle="Профиль оценщика и параметры формирования отчетов" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <Card title="Профиль оценщика">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="ФИО" defaultValue="Власов Игорь Анатольевич" />
            <Input label="№ в реестре СРО" defaultValue="012458" mono />
            <Select label="Саморегулируемая организация" options={[
              { value: 'a', label: 'СРО «Российское общество оценщиков»' },
              { value: 'b', label: 'СРО «СМАО»' },
            ]} />
            <Input label="E-mail" defaultValue="i.vlasov@ocenka.pro" />
          </div>
        </Card>
        <Card title="Параметры отчетов">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Select label="Формат по умолчанию" options={[
              { value: 'docx', label: 'DOCX' },
              { value: 'pdf', label: 'PDF' },
            ]} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              <Switch label="Автопроверка по ФСО перед формированием" defaultChecked />
              <Switch label="Добавлять фотографии в отчет" defaultChecked />
              <Switch label="Уведомлять заказчика по e-mail" />
            </div>
            <div style={{ paddingTop: 8 }}>
              <Button variant="primary" onClick={() => toast && toast('Настройки сохранены')}>Сохранить изменения</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
