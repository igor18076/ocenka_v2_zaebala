/* Requests kanban board. window.RequestsScreen */
window.RequestsScreenV2 = function RequestsScreenV2({ onOpenRequest, toast }) {
  const { Button, Avatar, Input, Badge } = NS;
  const D = window.OcenkaData;
  const selfEmitRef = React.useRef(false);
  const broadcast = (detail) => {
    selfEmitRef.current = true;
    try {
      window.dispatchEvent(new CustomEvent('ocenka:requests-updated', { detail: detail || {} }));
    } catch {}
    window.setTimeout(() => { selfEmitRef.current = false; }, 0);
  };

  const clientsKey = 'ocenka.clients.v1';
  const loadClients = () => {
    const parsed = window.readLocalJson ? window.readLocalJson(clientsKey, null) : null;
    return Array.isArray(parsed) ? parsed : (D.clients || []);
  };
  const [clientList, setClientList] = React.useState(loadClients);
  /* Add a client created inside the request form to the shared Clients registry
     so it shows up on the Clients screen. Existing names (case-insensitive) are kept. */
  const upsertClient = (info) => {
    const name = String(info.name || '').trim();
    if (!name) return;
    try {
      const current = loadClients();
      if (current.some((client) => String(client.name || '').trim().toLowerCase() === name.toLowerCase())) return;
      const created = {
        name,
        kind: info.kind || 'Юр. лицо',
        orders: 1,
        contact: String(info.contact || '').trim(),
        inn: String(info.inn || '').trim() || '0000000000',
        legalAddress: 'Юридический адрес не указан',
      };
      const next = [created, ...current];
      if (window.writeLocalJson) window.writeLocalJson(clientsKey, next);
      setClientList(next);
      window.dispatchEvent(new Event('ocenka:clients-updated'));
    } catch {}
  };

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
    const parsed = window.readLocalJson ? window.readLocalJson(storageKey, null) : null;
    return Array.isArray(parsed) ? parsed : (D.requests || []);
  });
  const [query, setQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [ownerFilter, setOwnerFilter] = React.useState('all');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [dragId, setDragId] = React.useState(null);
  const [dropStatus, setDropStatus] = React.useState(null);
  const [isCreateOpen, setCreateOpen] = React.useState(false);
  const [editingRequestId, setEditingRequestId] = React.useState(null);
  const objectKey = (id) => `ocenka.object.${id || 'default'}.v1`;
  const blankDraft = {
    object: '',
    address: '',
    client: '',
    clientMode: 'existing',
    clientName: '',
    clientKind: 'Юр. лицо',
    clientInn: '',
    clientContact: '',
    type: 'Рыночная',
    owner: '',
    status: 'new',
    objType: '',
    area: '',
    floors: '',
    year: '',
    cadastral: '',
    valuationDate: '',
    purpose: '',
    valueType: '',
    photoUrls: [],
  };
  const [draft, setDraft] = React.useState(blankDraft);
  const draggedRef = React.useRef(false);
  /* Photos are stored as data URLs so a request's object card keeps them without a backend. */
  const onPhotoFiles = (fileList) => {
    Array.from(fileList || []).slice(0, 8).forEach((file) => {
      if (!file.type || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => setDraft((prev) => ({ ...prev, photoUrls: [...(prev.photoUrls || []), String(reader.result)].slice(0, 8) }));
      reader.readAsDataURL(file);
    });
  };
  const removeDraftPhoto = (index) => setDraft((prev) => ({ ...prev, photoUrls: (prev.photoUrls || []).filter((_, i) => i !== index) }));

  React.useEffect(() => {
    if (window.writeLocalJson) window.writeLocalJson(storageKey, requests);
  }, [requests]);
  React.useEffect(() => {
    window.materializeIcons && window.materializeIcons();
  }, [requests, filtersOpen, isCreateOpen]);
  React.useEffect(() => {
    const applyGlobalSearch = (event) => {
      setQuery(String(event.detail || ''));
      setFiltersOpen(false);
    };
    const openCreate = () => openCreateModal();
    const syncExternal = (event) => {
      if (selfEmitRef.current) return;
      const detail = event?.detail;
      if (detail?.id && detail?.status) {
        setRequests((items) => {
          const exists = items.some((item) => item.id === detail.id);
          if (!exists) {
            const saved = window.readLocalJson ? window.readLocalJson(storageKey, null) : null;
            return Array.isArray(saved) ? saved : items;
          }
          return items.map((item) => item.id === detail.id ? { ...item, status: detail.status } : item);
        });
        return;
      }
      const saved = window.readLocalJson ? window.readLocalJson(storageKey, null) : null;
      if (Array.isArray(saved)) setRequests(saved);
    };
    window.addEventListener('ocenka:request-search', applyGlobalSearch);
    window.addEventListener('ocenka:create-request', openCreate);
    window.addEventListener('ocenka:requests-updated', syncExternal);
    return () => {
      window.removeEventListener('ocenka:request-search', applyGlobalSearch);
      window.removeEventListener('ocenka:create-request', openCreate);
      window.removeEventListener('ocenka:requests-updated', syncExternal);
    };
  }, []);
  window.useEscapeToClose(isCreateOpen, () => closeRequestModal());

  const hasOwner = (owner) => {
    const value = String(owner || '').trim();
    return value && value !== '-' && value !== '—' && value !== '–';
  };
  const normalize = (value) => String(value || '').trim().toLowerCase();
  const owners = Array.from(new Set(requests.map((item) => item.owner).filter(hasOwner))).sort();
  const createTypes = ['Рыночная', 'Залоговая'];
  const types = Array.from(new Set(requests.map((item) => item.type).filter(Boolean))).sort();
  const clientOptions = Array.from(new Set([...clientList.map((item) => item.name), draft.client].filter(Boolean)));

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
    broadcast({ id, status });
  };
  /* Keyboard alternative to drag-and-drop: move a card to the previous/next stage. */
  const moveToAdjacent = (id, delta) => {
    let nextStatus = null;
    setRequests((items) => items.map((item) => {
      if (item.id !== id) return item;
      const current = statusOrder.indexOf(statusOrder.includes(item.status) ? item.status : 'new');
      const next = Math.max(0, Math.min(statusOrder.length - 1, current + delta));
      nextStatus = statusOrder[next];
      return { ...item, status: nextStatus };
    }));
    if (nextStatus) broadcast({ id, status: nextStatus });
  };

  const resetFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setOwnerFilter('all');
  };
  const resetBoard = () => {
    setRequests(D.requests || []);
    resetFilters();
    broadcast({});
    if (toast) toast('Доска сброшена к исходным заявкам');
  };
  const emptyDraft = blankDraft;

  const openCreateModal = () => {
    setEditingRequestId(null);
    setClientList(loadClients());
    setDraft(blankDraft);
    setCreateOpen(true);
  };

  const openEditModal = (event, request) => {
    event.stopPropagation();
    setEditingRequestId(request.id);
    setClientList(loadClients());
    const saved = (window.readLocalJson ? window.readLocalJson(objectKey(request.id), null) : null) || {};
    setDraft({
      ...blankDraft,
      object: request.object || saved.title || '',
      address: request.address || saved.address || '',
      client: request.client || saved.client || '',
      type: request.type || 'Рыночная',
      owner: hasOwner(request.owner) ? request.owner : '',
      status: statusOrder.includes(request.status) ? request.status : 'new',
      objType: saved.type || '',
      area: saved.area != null ? String(saved.area) : '',
      floors: saved.floors != null ? String(saved.floors) : '',
      year: saved.year != null ? String(saved.year) : '',
      cadastral: saved.cadastral || '',
      valuationDate: saved.date || request.date || '',
      purpose: saved.purpose || '',
      valueType: saved.valueType || '',
      photoUrls: Array.isArray(saved.photoUrls) ? saved.photoUrls : [],
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
    const owner = draft.owner.trim();
    const objType = draft.objType.trim();
    const area = draft.area.trim();
    const floors = draft.floors.trim();
    const year = draft.year.trim();
    const cadastral = draft.cadastral.trim();
    const valuationDate = draft.valuationDate.trim();
    const purpose = draft.purpose.trim();
    const valueType = draft.valueType.trim();
    const isNewClient = draft.clientMode === 'new';
    const client = (isNewClient ? draft.clientName : draft.client).trim();
    // Every field below is entered by the user — nothing is auto-filled silently.
    if (!object || !address || !client || !owner || !objType || !area || !floors || !year || !cadastral || !valuationDate || !purpose || !valueType) {
      if (toast) toast('Заполните все обязательные поля');
      return;
    }

    if (isNewClient) {
      upsertClient({ name: client, kind: draft.clientKind, inn: draft.clientInn, contact: draft.clientContact });
    }

    const id = editingRequestId || nextRequestId();
    const photoUrls = draft.photoUrls || [];
    try {
      const existingObject = (window.readLocalJson ? window.readLocalJson(objectKey(id), null) : null) || {};
      const objectRecord = {
        ...existingObject,
        id,
        title: object,
        address,
        client,
        type: objType,
        area,
        floors,
        year,
        cadastral,
        date: valuationDate,
        purpose,
        valueType,
        photoUrls: photoUrls.length ? photoUrls : (existingObject.photoUrls || []),
        photos: photoUrls.length || existingObject.photos || 0,
      };
      if (window.saveLocalJson) window.saveLocalJson(objectKey(id), objectRecord, toast);
      else if (window.writeLocalJson) window.writeLocalJson(objectKey(id), objectRecord);
    } catch {}

    const request = {
      id,
      object,
      address,
      client,
      type: draft.type || 'Рыночная',
      status: statusOrder.includes(draft.status) ? draft.status : 'new',
      date: new Date().toLocaleDateString('ru-RU'),
      owner,
    };
    setRequests((items) => editingRequestId
      ? items.map((item) => item.id === editingRequestId ? { ...item, ...request, id: item.id, date: item.date || request.date } : item)
      : [request, ...items]);
    if (window.setActiveRequestId) window.setActiveRequestId(id);
    broadcast({ id, status: request.status });
    if (toast) toast(editingRequestId ? 'Заявка обновлена' : 'Заявка создана');
    closeRequestModal();
  };

  const deleteEditingRequest = () => {
    if (!editingRequestId) return;
    const removedId = editingRequestId;
    setRequests((items) => items.filter((item) => item.id !== editingRequestId));
    broadcast({ id: removedId, deleted: true });
    if (toast) toast('Заявка удалена');
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
        <div className="ock-grid ock-grid--filters" style={{ gap:12, background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:14, marginBottom:18 }}>
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

      <div data-tour-id="requests-board" className="ock-board-scroll" style={{
        height:boardHeight,
        minHeight:filtersOpen ? 450 : 540,
      }}>
        <div className="ock-board-columns">
          {statusOrder.map((status) => {
            const rows = grouped[status] || [];
            const activeDrop = dropStatus === status;
            return (
              <section
                key={status}
                role="group"
                aria-label={`${statusTitles[status]} — ${rows.length}`}
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
                      tabIndex={0}
                      role="button"
                      aria-label={`Заявка ${request.id}: ${request.object}. Стадия: ${statusTitles[status]}. Enter — открыть, Alt+стрелки — сменить стадию`}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onOpenRequest(request);
                        } else if (event.altKey && event.key === 'ArrowRight') {
                          event.preventDefault();
                          moveToAdjacent(request.id, 1);
                        } else if (event.altKey && event.key === 'ArrowLeft') {
                          event.preventDefault();
                          moveToAdjacent(request.id, -1);
                        }
                      }}
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
        <div className="ock-modal-backdrop" onMouseDown={closeRequestModal}>
          <form className="ock-modal-panel ock-modal-panel--md" role="dialog" aria-modal="true" aria-label={editingRequestId ? `Редактирование заявки ${editingRequestId}` : 'Новая заявка'} onSubmit={saveRequest} onMouseDown={(event) => event.stopPropagation()}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--divider)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <div>
                <div style={{ fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>{editingRequestId ? `Редактирование ${editingRequestId}` : 'Новая заявка'}</div>
                <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>{editingRequestId ? 'Изменения сохранятся на доске заявок' : 'Заявка появится в выбранной колонке'}</div>
              </div>
              <button type="button" onClick={closeRequestModal} aria-label="Закрыть" style={{ border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', padding:6 }}>
                <Icon n="x" size={18} />
              </button>
            </div>
            <div style={{ padding:20, display:'grid', gap:14, maxHeight:'68vh', overflowY:'auto' }}>
              <Input label="Объект" required value={draft.object} onChange={(event) => setDraft((prev) => ({ ...prev, object:event.target.value }))} placeholder="Квартира, офис, участок" />
              <div>
                <label style={fieldLabel}>Адрес</label>
                <textarea value={draft.address} onChange={(event) => setDraft((prev) => ({ ...prev, address:event.target.value }))} placeholder="Город, улица, дом" style={textAreaStyle} required />
              </div>
              <div>
                <label style={fieldLabel}>Клиент</label>
                <select
                  value={draft.clientMode === 'new' ? '__new__' : draft.client}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === '__new__') setDraft((prev) => ({ ...prev, clientMode:'new', client:'' }));
                    else setDraft((prev) => ({ ...prev, clientMode:'existing', client:value }));
                  }}
                  style={selectStyle}
                  required={draft.clientMode !== 'new'}
                >
                  <option value="">— выберите клиента —</option>
                  {clientOptions.map((name) => <option key={name} value={name}>{name}</option>)}
                  <option value="__new__">+ Новый клиент…</option>
                </select>
              </div>
              {draft.clientMode === 'new' ? (
                <div style={{ display:'grid', gap:12, padding:'12px 14px', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', background:'var(--surface-inset)' }}>
                  <Input label="Название клиента" required value={draft.clientName} onChange={(event) => setDraft((prev) => ({ ...prev, clientName:event.target.value }))} placeholder="ФИО или организация" />
                  <div className="ock-grid ock-grid--modal-2" style={{ gap:12 }}>
                    <div>
                      <label style={fieldLabel}>Тип клиента</label>
                      <select value={draft.clientKind} onChange={(event) => setDraft((prev) => ({ ...prev, clientKind:event.target.value }))} style={selectStyle}>
                        <option value="Юр. лицо">Юр. лицо</option>
                        <option value="Физ. лицо">Физ. лицо</option>
                      </select>
                    </div>
                    <Input label="ИНН" value={draft.clientInn} onChange={(event) => setDraft((prev) => ({ ...prev, clientInn:event.target.value }))} style={{ fontFamily:'var(--font-mono)' }} />
                  </div>
                  <Input label="Контакт" value={draft.clientContact} onChange={(event) => setDraft((prev) => ({ ...prev, clientContact:event.target.value }))} placeholder="e-mail или телефон" />
                  <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>Новый клиент появится в разделе «Клиенты».</div>
                </div>
              ) : null}
              <div className="ock-grid ock-grid--modal-2" style={{ gap:12 }}>
                <div>
                  <label style={fieldLabel}>Тип оценки</label>
                  <select value={draft.type} onChange={(event) => setDraft((prev) => ({ ...prev, type:event.target.value }))} style={selectStyle}>
                    {(createTypes.length ? createTypes : ['Рыночная']).map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <Input label="Ответственный" required value={draft.owner} onChange={(event) => setDraft((prev) => ({ ...prev, owner:event.target.value }))} placeholder="ФИО ответственного" />
              </div>
              <div>
                <label style={fieldLabel}>Стадия</label>
                <select value={draft.status} onChange={(event) => setDraft((prev) => ({ ...prev, status:event.target.value }))} style={selectStyle}>
                  {statusOrder.map((status) => <option key={status} value={status}>{statusTitles[status]}</option>)}
                </select>
              </div>

              <div style={{ height:1, background:'var(--divider)', margin:'2px 0' }} />
              <div style={{ fontSize:'var(--text-xs)', fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.04em' }}>Характеристики объекта</div>
              <div className="ock-grid ock-grid--modal-2" style={{ gap:12 }}>
                <Input label="Тип объекта" required value={draft.objType} onChange={(event) => setDraft((prev) => ({ ...prev, objType:event.target.value }))} placeholder="Квартира, офис, участок" />
                <Input label="Площадь, м²" required type="number" value={draft.area} onChange={(event) => setDraft((prev) => ({ ...prev, area:event.target.value }))} placeholder="0" />
              </div>
              <div className="ock-grid ock-grid--modal-3" style={{ gap:12 }}>
                <Input label="Этажность" required value={draft.floors} onChange={(event) => setDraft((prev) => ({ ...prev, floors:event.target.value }))} placeholder="напр. 5 из 9" />
                <Input label="Год постройки" required type="number" value={draft.year} onChange={(event) => setDraft((prev) => ({ ...prev, year:event.target.value }))} placeholder="напр. 2005" />
                <Input label="Дата оценки" required type="date" value={draft.valuationDate} onChange={(event) => setDraft((prev) => ({ ...prev, valuationDate:event.target.value }))} />
              </div>
              <Input label="Кадастровый №" required value={draft.cadastral} onChange={(event) => setDraft((prev) => ({ ...prev, cadastral:event.target.value }))} placeholder="00:00:0000000:000" style={{ fontFamily:'var(--font-mono)' }} />
              <div className="ock-grid ock-grid--modal-2" style={{ gap:12 }}>
                <Input label="Цель оценки" required value={draft.purpose} onChange={(event) => setDraft((prev) => ({ ...prev, purpose:event.target.value }))} placeholder="напр. для целей залога" />
                <Input label="Вид стоимости" required value={draft.valueType} onChange={(event) => setDraft((prev) => ({ ...prev, valueType:event.target.value }))} placeholder="напр. Рыночная стоимость" />
              </div>
              <div>
                <label style={fieldLabel}>Фотографии объекта</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {(draft.photoUrls || []).map((src, i) => (
                    <div key={i} style={{ position:'relative', width:84, height:64 }}>
                      <img src={src} alt={`Фото ${i + 1}`} style={{ width:84, height:64, objectFit:'cover', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-subtle)' }} />
                      <button type="button" aria-label="Удалить фото" onClick={() => removeDraftPhoto(i)}
                        style={{ position:'absolute', top:-8, right:-8, width:22, height:22, borderRadius:'50%', border:'none', background:'var(--danger)', color:'#fff', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                        <Icon n="x" size={12} />
                      </button>
                    </div>
                  ))}
                  {(draft.photoUrls || []).length < 8 ? (
                    <label style={{ width:84, height:64, borderRadius:'var(--radius-sm)', border:'1px dashed var(--border-strong)', display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer', color:'var(--text-muted)' }}>
                      <Icon n="upload" size={16} />
                      <span style={{ fontSize:'var(--text-xs)' }}>Добавить</span>
                      <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={(event) => { onPhotoFiles(event.target.files); event.target.value = ''; }} />
                    </label>
                  ) : null}
                </div>
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
