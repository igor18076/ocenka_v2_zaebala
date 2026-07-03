/* Clients + Settings. window.ClientsScreen, window.SettingsScreen */
window.ClientsScreenV2 = function ClientsScreenV2({ toast }) {
  const { Card, Table, Button, Badge, Avatar, Input } = NS;
  const D = window.OcenkaData;
  const storageKey = 'ocenka.clients.v1';
  const [clients, setClients] = React.useState(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : (D.clients || []);
    } catch {
      return D.clients || [];
    }
  });
  const [query, setQuery] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const emptyClient = { name:'', kind:'Юр. лицо', orders:0, contact:'', inn:'0000000000', legalAddress:'Юридический адрес не указан' };
  const [draft, setDraft] = React.useState(emptyClient);
  React.useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(clients));
    } catch {}
  }, [clients]);
  const filtered = clients.filter((client) => [client.name, client.kind, client.contact, client.inn, client.legalAddress].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  const fieldLabel = { display:'block', marginBottom:6, fontSize:'var(--text-xs)', fontWeight:700, color:'var(--text-muted)' };
  const inputStyle = { width:'100%', boxSizing:'border-box', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'8px 10px', color:'var(--text-strong)', background:'var(--surface-card)', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', outline:'none' };
  const openCreate = () => {
    setEditingIndex(null);
    setDraft(emptyClient);
    setModalOpen(true);
  };
  const openEdit = (client) => {
    const index = clients.findIndex((item) => item.name === client.name && item.contact === client.contact);
    setEditingIndex(index);
    setDraft({ ...emptyClient, ...client });
    setModalOpen(true);
  };
  const saveClient = (event) => {
    event.preventDefault();
    const next = {
      ...draft,
      name: draft.name.trim(),
      contact: draft.contact.trim(),
      inn: draft.inn.trim() || '0000000000',
      legalAddress: draft.legalAddress.trim() || 'Юридический адрес не указан',
      orders: Number(draft.orders) || 0,
    };
    if (!next.name) return;
    setClients((items) => editingIndex == null
      ? [next, ...items]
      : items.map((item, index) => index === editingIndex ? next : item));
    setModalOpen(false);
    if (toast) toast(editingIndex == null ? 'Клиент добавлен' : 'Клиент обновлен');
  };
  const deleteClient = () => {
    if (editingIndex == null) return;
    setClients((items) => items.filter((_, index) => index !== editingIndex));
    setModalOpen(false);
    setEditingIndex(null);
    if (toast) toast('Клиент удален');
  };
  return (
    <div>
      <PageHead title="Клиенты" subtitle="Заказчики оценки и история обращений"
        actions={<Button variant="primary" iconLeft={<Icon n="plus" size={16} />} onClick={openCreate}>Добавить клиента</Button>} />
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
          { key: 'inn', header: 'ИНН', render: (r) => <span className="ds-mono" style={{ fontSize: 'var(--text-sm)' }}>{r.inn}</span> },
          { key: 'legalAddress', header: 'Юр. адрес', render: (r) => <span style={{ display:'block', maxWidth:260, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.legalAddress}</span> },
          { key: 'orders', header: 'Заказов', align: 'right' },
          { key: 'contact', header: 'Контакт', render: (r) => <span className="ds-mono" style={{ fontSize: 'var(--text-sm)' }}>{r.contact}</span> },
          { key: 'edit', header: '', align: 'right', render: (r) => <Button variant="ghost" size="sm" iconLeft={<Icon n="pencil" size={14} />} onClick={() => openEdit(r)}>Редактировать</Button> },
        ]} rows={filtered} />
      </Card>
      {modalOpen ? (
        <div style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(15, 23, 42, .42)', display:'grid', placeItems:'center', padding:24 }} onMouseDown={() => setModalOpen(false)}>
          <form onSubmit={saveClient} onMouseDown={(event) => event.stopPropagation()} style={{ width:'min(100%, 620px)', background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-lg)', overflow:'hidden' }}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
              <div>
                <div style={{ fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>{editingIndex == null ? 'Новый клиент' : 'Редактирование клиента'}</div>
                <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>Реквизиты отображаются в списке клиентов</div>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Закрыть" style={{ border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', padding:6 }}>
                <Icon n="x" size={18} />
              </button>
            </div>
            <div style={{ padding:20, display:'grid', gap:14 }}>
              <Input label="Клиент" required value={draft.name} onChange={(event) => setDraft((prev) => ({ ...prev, name:event.target.value }))} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={fieldLabel}>Тип</label>
                  <select value={draft.kind} onChange={(event) => setDraft((prev) => ({ ...prev, kind:event.target.value }))} style={inputStyle}>
                    <option value="Юр. лицо">Юр. лицо</option>
                    <option value="Физ. лицо">Физ. лицо</option>
                  </select>
                </div>
                <Input label="ИНН" value={draft.inn} onChange={(event) => setDraft((prev) => ({ ...prev, inn:event.target.value }))} mono />
              </div>
              <Input label="Контакт" value={draft.contact} onChange={(event) => setDraft((prev) => ({ ...prev, contact:event.target.value }))} />
              <div>
                <label style={fieldLabel}>Юридический адрес</label>
                <textarea value={draft.legalAddress} onChange={(event) => setDraft((prev) => ({ ...prev, legalAddress:event.target.value }))} style={{ ...inputStyle, minHeight:72, resize:'vertical', lineHeight:1.4 }} />
              </div>
              <Input label="Количество заказов" type="number" value={draft.orders} onChange={(event) => setDraft((prev) => ({ ...prev, orders:event.target.value }))} />
            </div>
            <div style={{ padding:'14px 20px', borderTop:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', gap:10 }}>
              <div>
                {editingIndex != null ? (
                  <button type="button" onClick={deleteClient} style={{ height:36, padding:'0 14px', border:'1px solid var(--danger)', borderRadius:'var(--radius-md)', background:'transparent', color:'var(--danger-text)', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8 }}>
                    <Icon n="trash-2" size={15} /> Удалить
                  </button>
                ) : null}
              </div>
              <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Отмена</Button>
                <Button type="submit" variant="primary" iconLeft={<Icon n="save" size={16} />}>Сохранить</Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

window.SettingsScreenV2 = function SettingsScreenV2({ toast }) {
  const { Card, Input, Select, Switch, Button } = NS;
  const savedSettings = (() => {
    try { return JSON.parse(window.localStorage.getItem('ocenka.settings.v1') || '{}'); } catch { return {}; }
  })();
  const [settings, setSettings] = React.useState({
    name: savedSettings.name || window.OcenkaData.user?.name || 'Игорь Дорощенко',
    registry: savedSettings.registry || '012458',
    email: savedSettings.email || 'i.doroshenko@ocenka.pro',
  });
  const saveSettings = () => {
    try {
      window.localStorage.setItem('ocenka.settings.v1', JSON.stringify(settings));
    } catch {}
    if (toast) toast('Настройки сохранены');
  };
  return (
    <div>
      <PageHead title="Настройки" subtitle="Профиль оценщика и параметры формирования отчетов" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <Card title="Профиль оценщика">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="ФИО" value={settings.name} onChange={(event) => setSettings((prev) => ({ ...prev, name:event.target.value }))} />
            <Input label="№ в реестре СРО" value={settings.registry} onChange={(event) => setSettings((prev) => ({ ...prev, registry:event.target.value }))} mono />
            <Select label="Саморегулируемая организация" options={[
              { value: 'a', label: 'СРО «Российское общество оценщиков»' },
              { value: 'b', label: 'СРО «СМАО»' },
            ]} />
            <Input label="E-mail" value={settings.email} onChange={(event) => setSettings((prev) => ({ ...prev, email:event.target.value }))} />
          </div>
        </Card>
        <Card title="Параметры отчетов">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Select label="Формат по умолчанию" options={[
              { value: 'doc', label: 'DOC' },
              { value: 'pdf', label: 'PDF' },
            ]} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              <Switch label="Автопроверка по ФСО перед формированием" defaultChecked />
              <Switch label="Добавлять фотографии в отчет" defaultChecked />
              <Switch label="Уведомлять заказчика по e-mail" />
            </div>
            <div style={{ paddingTop: 8 }}>
              <Button variant="primary" onClick={saveSettings}>Сохранить изменения</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
