/* Requests kanban board. window.RequestsScreen */
window.RequestsScreenV2 = function RequestsScreenV2({ onOpenRequest }) {
  const { Button, Avatar, Input, Badge } = NS;
  const D = window.OcenkaData;

  const statusOrder = ['new', 'docs', 'analogs', 'calc', 'review', 'ready'];
  const statusTitles = {
    new: 'Новые',
    docs: 'Документы',
    analogs: 'Аналоги',
    calc: 'Расчет',
    review: 'Проверка',
    ready: 'Готово',
  };
  const statusHints = {
    new: 'первичный разбор',
    docs: 'сбор комплекта',
    analogs: 'подбор рынка',
    calc: 'расчет подходов',
    review: 'контроль качества',
    ready: 'отчет готов',
  };
  const storageKey = 'ocenka.requests.kanban.v1';

  const [requests, setRequests] = React.useState(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : (D.requests || []);
    } catch {
      return D.requests || [];
    }
  });
  const [query, setQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [ownerFilter, setOwnerFilter] = React.useState('all');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [dragId, setDragId] = React.useState(null);
  const [dropStatus, setDropStatus] = React.useState(null);
  const [isCreateOpen, setCreateOpen] = React.useState(false);
  const [editingRequestId, setEditingRequestId] = React.useState(null);
  const [draft, setDraft] = React.useState({
    object: '',
    address: '',
    client: '',
    type: 'Рыночная',
    owner: '',
    status: 'new',
  });
  const draggedRef = React.useRef(false);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(requests));
    } catch {}
  }, [requests]);
  React.useEffect(() => {
    window.materializeIcons && window.materializeIcons();
  });
  React.useEffect(() => {
    const applyGlobalSearch = (event) => {
      setQuery(String(event.detail || ''));
      setFiltersOpen(false);
    };
    const openCreate = () => openCreateModal();
    window.addEventListener('ocenka:request-search', applyGlobalSearch);
    window.addEventListener('ocenka:create-request', openCreate);
    return () => {
      window.removeEventListener('ocenka:request-search', applyGlobalSearch);
      window.removeEventListener('ocenka:create-request', openCreate);
    };
  }, []);

  const hasOwner = (owner) => {
    const value = String(owner || '').trim();
    return value && value !== '-' && value !== '—' && value !== '–' && value !== 'вЂ”';
  };
  const normalize = (value) => String(value || '').trim().toLowerCase();
  const owners = Array.from(new Set(requests.map((item) => item.owner).filter(hasOwner))).sort();
  const createTypes = ['Рыночная', 'Залоговая'];
  const types = Array.from(new Set(requests.map((item) => item.type).filter(Boolean))).sort();

  const filtered = requests.filter((request) => {
    const haystack = [request.id, request.object, request.address, request.client, request.type, request.owner]
      .join(' ')
      .toLowerCase();
    const matchesQuery = haystack.includes(normalize(query));
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    const matchesOwner = ownerFilter === 'all' || request.owner === ownerFilter;
    return matchesQuery && matchesType && matchesOwner;
  });

  const grouped = statusOrder.reduce((acc, status) => ({ ...acc, [status]: [] }), {});
  filtered.forEach((request) => {
    const status = statusOrder.includes(request.status) ? request.status : 'new';
    grouped[status].push(request);
  });

  const moveRequest = (id, status) => {
    setRequests((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setDropStatus(null);
    setDragId(null);
  };

  const resetFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setOwnerFilter('all');
  };
  const resetBoard = () => {
    setRequests(D.requests || []);
    resetFilters();
  };
  const emptyDraft = { object: '', address: '', client: '', type: 'Рыночная', owner: '', status: 'new' };

  const openCreateModal = () => {
    setEditingRequestId(null);
    setDraft(emptyDraft);
    setCreateOpen(true);
  };

  const openEditModal = (event, request) => {
    event.stopPropagation();
    setEditingRequestId(request.id);
    setDraft({
      object: request.object || '',
      address: request.address || '',
      client: request.client || '',
      type: request.type || 'Рыночная',
      owner: hasOwner(request.owner) ? request.owner : '',
      status: statusOrder.includes(request.status) ? request.status : 'new',
    });
    setCreateOpen(true);
  };

  const closeRequestModal = () => {
    setCreateOpen(false);
    setEditingRequestId(null);
    setDraft(emptyDraft);
  };

  const nextRequestId = () => {
    const max = requests.reduce((value, request) => {
      const match = String(request.id || '').match(/(\d+)\s*$/);
      return match ? Math.max(value, Number(match[1])) : value;
    }, 1039);
    return `03-${String(max + 1).padStart(4, '0')}`;
  };

  const saveRequest = (event) => {
    event.preventDefault();
    const object = draft.object.trim();
    const address = draft.address.trim();
    const client = draft.client.trim();
    if (!object || !address || !client) return;

    const request = {
      id: editingRequestId || nextRequestId(),
      object,
      address,
      client,
      type: draft.type || 'Рыночная',
      status: statusOrder.includes(draft.status) ? draft.status : 'new',
      date: new Date().toLocaleDateString('ru-RU'),
      owner: draft.owner.trim() || '—',
    };
    setRequests((items) => editingRequestId
      ? items.map((item) => item.id === editingRequestId ? { ...item, ...request, id: item.id, date: item.date || request.date } : item)
      : [request, ...items]);
    closeRequestModal();
  };

  const deleteEditingRequest = () => {
    if (!editingRequestId) return;
    setRequests((items) => items.filter((item) => item.id !== editingRequestId));
    closeRequestModal();
  };

  const totalActive = requests.filter((request) => request.status !== 'ready').length;
  const readyCount = requests.filter((request) => request.status === 'ready').length;
  const filterCount = [query.trim(), typeFilter !== 'all', ownerFilter !== 'all'].filter(Boolean).length;
  const boardHeight = filtersOpen ? 'calc(100vh - 426px)' : 'calc(100vh - 340px)';
  const columnHeight = filtersOpen ? 'calc(100vh - 436px)' : 'calc(100vh - 350px)';

  const selectStyle = {
    width:'100%',
    height:34,
    border:'1px solid var(--border-default)',
    borderRadius:'var(--radius-sm)',
    background:'var(--surface-card)',
    color:'var(--text-strong)',
    fontFamily:'var(--font-sans)',
    fontSize:'var(--text-sm)',
    padding:'0 10px',
    outline:'none',
  };
  const fieldLabel = {
    display:'block',
    marginBottom:6,
    fontSize:'var(--text-xs)',
    fontWeight:700,
    color:'var(--text-muted)',
  };
  const textAreaStyle = {
    width:'100%',
    minHeight:74,
    resize:'vertical',
    boxSizing:'border-box',
    border:'1px solid var(--border-default)',
    borderRadius:'var(--radius-sm)',
    padding:'8px 10px',
    color:'var(--text-strong)',
    background:'var(--surface-card)',
    fontFamily:'var(--font-sans)',
    fontSize:'var(--text-sm)',
    lineHeight:1.4,
    outline:'none',
  };
  const metricStyle = {
    background:'var(--surface-card)',
    border:'1px solid var(--border-subtle)',
    borderRadius:'var(--radius-lg)',
    padding:'12px 14px',
    minWidth:138,
    flex:'0 0 138px',
  };

  return (
    <div>
      <PageHead
        title="Заявки"
        subtitle="Канбан-доска заявок на оценку по этапам работы"
        actions={[
          <Button key="filter" variant={filtersOpen ? 'primary' : 'secondary'} iconLeft={<Icon n="sliders-horizontal" size={16} />} onClick={() => setFiltersOpen((value) => !value)}>
            Фильтры{filterCount ? ` · ${filterCount}` : ''}
          </Button>,
          <span key="new-wrap" data-tour-id="requests-create"><Button key="new" variant="primary" iconLeft={<Icon n="plus" size={16} />} onClick={openCreateModal}>Новая заявка</Button></span>,
        ]}
      />

      <div style={{ display:'flex', gap:14, marginBottom:filtersOpen ? 10 : 18, alignItems:'stretch', flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 360px', background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:14 }}>
          <Input size="sm" prefix={<Icon n="search" size={16} />} placeholder="Поиск по заявкам, клиентам, адресам" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div style={metricStyle}>
          <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.04em' }}>Найдено</div>
          <div style={{ marginTop:4, fontSize:'var(--text-xl)', fontWeight:800, color:'var(--text-strong)', fontVariantNumeric:'tabular-nums' }}>{filtered.length}</div>
        </div>
        <div style={metricStyle}>
          <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.04em' }}>В работе</div>
          <div style={{ marginTop:4, fontSize:'var(--text-xl)', fontWeight:800, color:'var(--blue-700)', fontVariantNumeric:'tabular-nums' }}>{totalActive}</div>
        </div>
        <div style={metricStyle}>
          <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.04em' }}>Готово</div>
          <div style={{ marginTop:4, fontSize:'var(--text-xl)', fontWeight:800, color:'var(--success-text)', fontVariantNumeric:'tabular-nums' }}>{readyCount}</div>
        </div>
      </div>

      {filtersOpen ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(180px, 1fr)) auto auto', gap:12, alignItems:'end', background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:14, marginBottom:18 }}>
          <div>
            <label style={fieldLabel}>Тип оценки</label>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} style={selectStyle}>
              <option value="all">Все типы</option>
              {types.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label style={fieldLabel}>Ответственный</label>
            <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)} style={selectStyle}>
              <option value="all">Все сотрудники</option>
              {owners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}
            </select>
          </div>
          <div>
            <label style={fieldLabel}>Стадии</label>
            <div style={{ height:34, display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>
              <Icon n="columns-3" size={16} color="var(--text-subtle)" /> {statusOrder.length} колонок
            </div>
          </div>
          <Button variant="ghost" onClick={resetFilters}>Сбросить</Button>
          <Button variant="secondary" onClick={resetBoard}>Сбросить доску</Button>
        </div>
      ) : null}

      <div data-tour-id="requests-board" style={{
        height:boardHeight,
        minHeight:filtersOpen ? 450 : 540,
        overflowX:'auto',
        overflowY:'hidden',
        paddingBottom:10,
      }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6, 292px)', gap:12, alignItems:'stretch', width:'max-content' }}>
          {statusOrder.map((status) => {
            const rows = grouped[status] || [];
            const activeDrop = dropStatus === status;
            return (
              <section
                key={status}
                onDragOver={(event) => { event.preventDefault(); setDropStatus(status); }}
                onDragLeave={() => setDropStatus(null)}
                onDrop={() => dragId && moveRequest(dragId, status)}
                style={{
                  width:292,
                  height:columnHeight,
                  minHeight:filtersOpen ? 440 : 530,
                  background:activeDrop ? 'var(--blue-50)' : 'var(--surface-inset)',
                  border:`1px solid ${activeDrop ? 'var(--blue-300)' : 'var(--border-subtle)'}`,
                  borderRadius:'var(--radius-lg)',
                  overflow:'hidden',
                  display:'flex',
                  flexDirection:'column',
                }}
              >
                <div style={{ padding:'12px 12px 10px', borderBottom:'1px solid var(--divider)', background:'var(--surface-card)' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                    <div style={{ fontWeight:700, color:'var(--text-strong)' }}>{statusTitles[status]}</div>
                    <Badge tone={status === 'ready' ? 'success' : status === 'review' ? 'warning' : 'neutral'} pill>{rows.length}</Badge>
                  </div>
                  <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-xs)' }}>{statusHints[status]}</div>
                </div>

                <div className="ds-scroll" style={{ display:'flex', flexDirection:'column', gap:10, padding:10, flex:1, overflowY:'auto' }}>
                  {rows.map((request) => (
                    <article
                      key={request.id}
                      draggable
                      onDragStart={(event) => {
                        draggedRef.current = false;
                        setDragId(request.id);
                        event.dataTransfer.effectAllowed = 'move';
                      }}
                      onDrag={() => { draggedRef.current = true; }}
                      onDragEnd={() => {
                        window.setTimeout(() => { draggedRef.current = false; }, 0);
                        setDragId(null);
                        setDropStatus(null);
                      }}
                      onClick={() => {
                        if (!draggedRef.current) onOpenRequest(request);
                      }}
                      style={{
                        background:'var(--surface-card)',
                        border:`1px solid ${dragId === request.id ? 'var(--blue-300)' : 'var(--border-subtle)'}`,
                        borderRadius:'var(--radius-md)',
                        padding:14,
                        boxShadow:'var(--shadow-xs)',
                        cursor:'grab',
                        opacity:dragId === request.id ? .55 : 1,
                      }}
                    >
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8, marginBottom:10 }}>
                        <span className="ds-mono" style={{ fontSize:'var(--text-xs)', fontWeight:800, color:'var(--blue-700)' }}>{request.id}</span>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                          <Badge tone={request.status === 'ready' ? 'success' : request.status === 'review' ? 'warning' : 'neutral'}>{request.type}</Badge>
                          <button
                            type="button"
                            title="Редактировать заявку"
                            onClick={(event) => openEditModal(event, request)}
                            style={{ width:24, height:24, border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-sm)', background:'var(--surface-card)', color:'var(--text-muted)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}
                          >
                            <Icon n="pencil" size={13} />
                          </button>
                        </span>
                      </div>
                      <div style={{ fontWeight:700, color:'var(--text-strong)', lineHeight:1.25, overflowWrap:'anywhere' }}>{request.object}</div>
                      <div style={{ marginTop:6, color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{request.address}</div>
                      <div style={{ color:'var(--text-body)', fontSize:'var(--text-xs)', fontWeight:700, marginTop:12, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {request.client}
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:6, color:'var(--text-muted)', fontSize:11 }}>
                        <Icon n="calendar" size={13} color="var(--text-subtle)" />
                        <span>{request.date}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginTop:12, paddingTop:10, borderTop:'1px solid var(--divider)' }}>
                        {hasOwner(request.owner)
                          ? <span style={{ display:'inline-flex', alignItems:'center', gap:7, minWidth:0 }}>
                              <Avatar name={request.owner} size="sm" />
                              <span style={{ color:'var(--text-body)', fontSize:'var(--text-xs)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{request.owner}</span>
                            </span>
                          : <span style={{ color:'var(--text-subtle)', fontSize:'var(--text-xs)' }}>не назначен</span>}
                        <Icon n="grip-vertical" size={15} color="var(--text-subtle)" />
                      </div>
                    </article>
                  ))}

                  {!rows.length ? (
                    <div style={{ border:'1px dashed var(--border-default)', borderRadius:'var(--radius-md)', padding:'18px 12px', textAlign:'center', color:'var(--text-muted)', fontSize:'var(--text-xs)' }}>
                      Перетащите заявку сюда
                    </div>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {isCreateOpen ? (
        <div style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(15, 23, 42, .42)', display:'grid', placeItems:'center', padding:24 }} onMouseDown={closeRequestModal}>
          <form onSubmit={saveRequest} onMouseDown={(event) => event.stopPropagation()} style={{ width:'min(100%, 560px)', background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-lg)', overflow:'hidden' }}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--divider)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <div>
                <div style={{ fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>{editingRequestId ? `Редактирование ${editingRequestId}` : 'Новая заявка'}</div>
                <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>{editingRequestId ? 'Изменения сохранятся на доске заявок' : 'Заявка появится в выбранной колонке'}</div>
              </div>
              <button type="button" onClick={closeRequestModal} aria-label="Закрыть" style={{ border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', padding:6 }}>
                <Icon n="x" size={18} />
              </button>
            </div>
            <div style={{ padding:20, display:'grid', gap:14 }}>
              <Input label="Объект" required value={draft.object} onChange={(event) => setDraft((prev) => ({ ...prev, object:event.target.value }))} placeholder="Квартира, офис, участок" />
              <div>
                <label style={fieldLabel}>Адрес</label>
                <textarea value={draft.address} onChange={(event) => setDraft((prev) => ({ ...prev, address:event.target.value }))} placeholder="Город, улица, дом" style={textAreaStyle} required />
              </div>
              <Input label="Клиент" required value={draft.client} onChange={(event) => setDraft((prev) => ({ ...prev, client:event.target.value }))} placeholder="ФИО или организация" />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={fieldLabel}>Тип оценки</label>
                  <select value={draft.type} onChange={(event) => setDraft((prev) => ({ ...prev, type:event.target.value }))} style={selectStyle}>
                    {(createTypes.length ? createTypes : ['Рыночная']).map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <Input label="Ответственный" value={draft.owner} onChange={(event) => setDraft((prev) => ({ ...prev, owner:event.target.value }))} placeholder="Можно оставить пустым" />
              </div>
              <div>
                <label style={fieldLabel}>Стадия</label>
                <select value={draft.status} onChange={(event) => setDraft((prev) => ({ ...prev, status:event.target.value }))} style={selectStyle}>
                  {statusOrder.map((status) => <option key={status} value={status}>{statusTitles[status]}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding:'14px 20px', borderTop:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', gap:10 }}>
              <div>
                {editingRequestId ? (
                  <button type="button" onClick={deleteEditingRequest} style={{ height:36, padding:'0 14px', border:'1px solid var(--danger)', borderRadius:'var(--radius-md)', background:'transparent', color:'var(--danger-text)', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8 }}>
                    <Icon n="trash-2" size={15} /> Удалить
                  </button>
                ) : null}
              </div>
              <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
                <Button type="button" variant="secondary" onClick={closeRequestModal}>Отмена</Button>
                <Button type="submit" variant="primary" iconLeft={<Icon n={editingRequestId ? 'save' : 'plus'} size={16} />}>{editingRequestId ? 'Сохранить' : 'Создать'}</Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
