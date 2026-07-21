/* Analogs screen with detail modal — window.AnalogsScreen */
window.AnalogsScreenV2 = function AnalogsScreenV2({ request, onNavigate, toast }) {
  const { Card, Button, Badge } = NS;
  const D = window.OcenkaData;
  const requestId = request?.id || D.object?.id;
  const requestTitle = request?.object || D.object?.title || 'Объект оценки';
  const toNum = window.toNum;
  const analogStorageKey = (id) => `ocenka.analogs.${id || 'draft'}.v1`;
  const analogOpenKey = (id) => `ocenka.analogs.open.${id || 'draft'}.v1`;
  const loadSavedAnalogs = (id) => {
    const saved = window.readLocalJson ? window.readLocalJson(analogStorageKey(id), null) : null;
    return saved && Array.isArray(saved.rows) ? saved : null;
  };
  const initialAnalogs = loadSavedAnalogs(requestId);

  const [analogRows, setAnalogRows] = React.useState(initialAnalogs?.rows || D.analogsDetailed || []);
  const [manualOpen, setManualOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const emptyDraft = { addr:'', source:'Ручной ввод', url:'', price:0, area:0, dist:'', cond:'Хорошее', floors:1, year:new Date().getFullYear(), wallMaterial:'—', plotArea:'—', description:'', photoUrls:[] };
  const [manualDraft, setManualDraft] = React.useState(emptyDraft);
  const [statuses, setStatuses] = React.useState(() => {
    if (initialAnalogs?.statuses) return initialAnalogs.statuses;
    return (D.analogsDetailed || []).reduce((acc, analog) => ({ ...acc, [analog.id]: analog.active }), {});
  });
  const [loadedRequestId, setLoadedRequestId] = React.useState(requestId);
  const [selectedId, setSelectedId] = React.useState(null);
  const [marketQuery, setMarketQuery] = React.useState('');
  const [marketCity, setMarketCity] = React.useState('all');
  const [marketCategory, setMarketCategory] = React.useState('all');
  const marketListings = Array.isArray(D.marketListings) ? D.marketListings : [];
  const marketCities = Array.from(new Set(marketListings.map((item) => item.city).filter(Boolean))).sort();
  const marketCategories = Array.from(new Set(marketListings.map((item) => item.category).filter(Boolean))).sort();
  const filteredMarket = marketListings.filter((item) => {
    if (marketCity !== 'all' && item.city !== marketCity) return false;
    if (marketCategory !== 'all' && item.category !== marketCategory) return false;
    const q = marketQuery.trim().toLowerCase();
    if (!q) return true;
    return [item.addr, item.city, item.category, item.source, item.description].join(' ').toLowerCase().includes(q);
  }).slice(0, 40);
  const selected = analogRows.find(a => a.id === selectedId);
  const selectedUrl = selected && window.safeExternalUrl ? window.safeExternalUrl(selected.url) : '';
  window.useEscapeToClose(!!selected, () => setSelectedId(null));
  window.useEscapeToClose(manualOpen, () => closeManual());
  React.useEffect(() => {
    const saved = loadSavedAnalogs(requestId);
    const rows = saved?.rows || D.analogsDetailed || [];
    setAnalogRows(rows);
    setStatuses(saved?.statuses || rows.reduce((acc, analog) => ({ ...acc, [analog.id]: analog.active }), {}));
    let nextSelected = null;
    try {
      const requestedAnalogId = window.localStorage.getItem(analogOpenKey(requestId));
      if (requestedAnalogId && rows.some((analog) => analog.id === requestedAnalogId)) {
        nextSelected = requestedAnalogId;
      }
      window.localStorage.removeItem(analogOpenKey(requestId));
    } catch {}
    setSelectedId(nextSelected);
    setLoadedRequestId(requestId);
  }, [requestId]);
  React.useEffect(() => {
    if (loadedRequestId !== requestId) return;
    try {
      if (window.writeLocalJson) window.writeLocalJson(analogStorageKey(requestId), { rows: analogRows, statuses });
    } catch {}
  }, [requestId, loadedRequestId, analogRows, statuses]);

  const toggleStatus = (id) => setStatuses(s => ({ ...s, [id]: !s[id] }));
  const activateAll = () => {
    setStatuses(analogRows.reduce((acc, analog) => ({ ...acc, [analog.id]: true }), {}));
    if (toast) toast('Аналоги подобраны');
  };
  const closeManual = () => {
    setManualOpen(false);
    setEditingId(null);
    setManualDraft(emptyDraft);
  };
  const openAddAnalog = () => {
    setEditingId(null);
    setManualDraft(emptyDraft);
    setManualOpen(true);
  };
  const openEditAnalog = (analog) => {
    setSelectedId(null);
    setEditingId(analog.id);
    setManualDraft({
      addr: analog.addr || '',
      source: analog.source || 'Ручной ввод',
      url: analog.url || '',
      price: toNum(analog.price),
      area: toNum(analog.area),
      dist: analog.dist && analog.dist !== '—' ? analog.dist : '',
      cond: analog.cond || 'Хорошее',
      floors: analog.floors || 1,
      year: analog.year || new Date().getFullYear(),
      wallMaterial: analog.wallMaterial || '—',
      plotArea: analog.plotArea || '—',
      description: analog.description || '',
      photoUrls: Array.isArray(analog.photoUrls) ? analog.photoUrls : [],
    });
    setManualOpen(true);
  };
  /* Photos are stored as data URLs so they survive in localStorage without a backend. */
  const onPhotoFiles = (fileList) => {
    Array.from(fileList || []).slice(0, 8).forEach((file) => {
      if (!file.type || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => setManualDraft((p) => ({ ...p, photoUrls: [...(p.photoUrls || []), String(reader.result)].slice(0, 8) }));
      reader.readAsDataURL(file);
    });
  };
  const removeDraftPhoto = (index) => setManualDraft((p) => ({ ...p, photoUrls: (p.photoUrls || []).filter((_, i) => i !== index) }));
  const saveAnalog = (event) => {
    event.preventDefault();
    const price = toNum(manualDraft.price);
    const area = toNum(manualDraft.area);
    if (!manualDraft.addr.trim() || price <= 0 || area <= 0) return;
    const perM2 = Math.round(price / area);
    const photoUrls = manualDraft.photoUrls || [];
    const shared = {
      addr: manualDraft.addr.trim(),
      fullAddr: manualDraft.addr.trim(),
      source: manualDraft.source.trim() || 'Ручной ввод',
      url: manualDraft.url.trim(),
      price,
      area,
      perM2,
      dist: manualDraft.dist.trim() || '—',
      cond: manualDraft.cond.trim() || 'Хорошее',
      floors: toNum(manualDraft.floors, 1) || 1,
      year: toNum(manualDraft.year, new Date().getFullYear()) || new Date().getFullYear(),
      wallMaterial: manualDraft.wallMaterial.trim() || '—',
      plotArea: manualDraft.plotArea.trim() || '—',
      description: manualDraft.description.trim() || 'Аналог добавлен вручную для предварительного расчета.',
      final: price.toLocaleString('ru-RU'),
      photoUrls,
      photos: photoUrls.length,
    };
    if (editingId) {
      setAnalogRows((rows) => rows.map((row) => row.id === editingId ? { ...row, ...shared } : row));
      if (toast) toast('Аналог обновлён');
    } else {
      const numericIds = analogRows.map((r) => Number(String(r.id).replace(/\D/g, ''))).filter(Number.isFinite);
      const nextNum = (numericIds.length ? Math.max(...numericIds) : analogRows.length) + 1;
      const id = `AN-${String(nextNum).padStart(3, '0')}`;
      const next = {
        id,
        active: true,
        adj: '0%',
        comp: 'mid',
        addedDate: new Date().toLocaleDateString('ru-RU'),
        adjRows: [{ factor:'Ручная корректировка', pct:0 }],
        ...shared,
      };
      setAnalogRows((rows) => [next, ...rows]);
      setStatuses((items) => ({ ...items, [id]: true }));
      if (toast) toast('Аналог добавлен');
    }
    closeManual();
  };
  const deleteAnalog = (id) => {
    setAnalogRows((rows) => rows.filter((row) => row.id !== id));
    setStatuses((items) => {
      const next = { ...items };
      delete next[id];
      return next;
    });
    if (selectedId === id) setSelectedId(null);
    if (editingId === id) closeManual();
    if (toast) toast('Аналог удалён');
  };
  const importFromMarket = (listing) => {
    if (!listing) return;
    const already = analogRows.some((row) => row.marketId === listing.id || row.url === listing.url);
    if (already) {
      if (toast) toast('Этот объект уже в подборке');
      return;
    }
    const price = toNum(listing.price);
    const area = toNum(listing.area);
    if (price <= 0 || area <= 0) {
      if (toast) toast('У объявления нет цены или площади');
      return;
    }
    const photoUrls = Array.isArray(listing.photoUrls) ? listing.photoUrls.slice(0, 8) : [];
    const numericIds = analogRows.map((r) => Number(String(r.id).replace(/\D/g, ''))).filter(Number.isFinite);
    const nextNum = (numericIds.length ? Math.max(...numericIds) : analogRows.length) + 1;
    const id = `AN-${String(nextNum).padStart(3, '0')}`;
    const next = {
      id,
      marketId: listing.id,
      active: true,
      addr: listing.addr || listing.city || 'Адрес не указан',
      fullAddr: listing.addr || listing.city || 'Адрес не указан',
      source: listing.source || 'Рынок',
      url: listing.url || '',
      price,
      area,
      perM2: toNum(listing.perM2) || Math.round(price / area),
      dist: '—',
      cond: '—',
      floors: toNum(listing.floors, 0) || 0,
      year: toNum(listing.year, 0) || 0,
      wallMaterial: listing.wallMaterial || '—',
      plotArea: listing.landArea ? `${listing.landArea} сот.` : '—',
      adj: '0%',
      final: price.toLocaleString('ru-RU'),
      comp: 'mid',
      description: listing.description || 'Импортировано из рыночной выгрузки Inpars/Avito.',
      photoUrls,
      photos: photoUrls.length,
      addedDate: new Date().toLocaleDateString('ru-RU'),
      adjRows: [{ factor: 'Ручная корректировка', pct: 0 }],
    };
    setAnalogRows((rows) => [next, ...rows]);
    setStatuses((items) => ({ ...items, [id]: true }));
    if (toast) toast('Объявление добавлено в аналоги');
  };

  const compBadge = (c) => {
    if (c === 'high')  return <Badge tone="success" pill dot>Высокая</Badge>;
    if (c === 'check') return <Badge tone="warning" pill>Проверить</Badge>;
    return <Badge tone="neutral" pill>Средняя</Badge>;
  };

  const TH = ({ children, right }) => (
    <th style={{ padding:'9px 14px', textAlign: right ? 'right' : 'left', fontWeight:700, color:'var(--text-muted)', fontSize:'var(--text-xs)', textTransform:'uppercase', letterSpacing:'.04em', borderBottom:'1px solid var(--divider)', whiteSpace:'nowrap', background:'var(--surface-inset)' }}>
      {children}
    </th>
  );
  const includeToggle = (id, active) => (
    <button
      type="button"
      aria-label={active ? 'Учитывать аналог в расчетах' : 'Не учитывать аналог в расчетах'}
      onClick={(event) => {
        event.stopPropagation();
        toggleStatus(id);
      }}
      style={{
        minWidth:78,
        height:28,
        border:'1px solid var(--border-subtle)',
        borderRadius:999,
        background:active ? 'var(--emerald-50)' : 'var(--surface-inset)',
        color:active ? 'var(--success-text)' : 'var(--text-muted)',
        fontFamily:'var(--font-mono)',
        fontSize:'var(--text-xs)',
        fontWeight:800,
        cursor:'pointer',
        display:'inline-flex',
        alignItems:'center',
        justifyContent:'center',
        gap:6,
      }}
    >
      <Icon n={active ? 'check' : 'x'} size={13} />
      {active ? 'true' : 'false'}
    </button>
  );
  const activeAnalogs = analogRows.filter((analog) => statuses[analog.id] !== false);
  const avgPerM2 = activeAnalogs.length
    ? Math.round(activeAnalogs.reduce((sum, analog) => sum + toNum(analog.perM2), 0) / activeAnalogs.length)
    : 0;
  const adjustedValues = activeAnalogs.map((analog) => {
    const raw = String(analog.final || '').replace(/\s+/g, '').replace(/[^\d.-]/g, '');
    return toNum(raw) || toNum(analog.price) || 0;
  }).filter(Boolean);
  const avgAdjusted = adjustedValues.length
    ? Math.round(adjustedValues.reduce((sum, value) => sum + value, 0) / adjustedValues.length)
    : 0;
  const highComparableCount = activeAnalogs.filter((analog) => analog.comp === 'high').length;
  /* Route each analog correction into the matching comparative-approach bucket. */
  const mapAdjustments = (adjRows) => {
    const buckets = { adjTorg: 0, adjLoc: 0, adjRep: 0, adjFlr: 0 };
    (adjRows || []).forEach((row) => {
      const factor = String(row.factor || '').toLowerCase();
      const pct = toNum(row.pct);
      if (/торг|скид/.test(factor)) buckets.adjTorg += pct;
      else if (/этаж/.test(factor)) buckets.adjFlr += pct;
      else if (/ремонт|состоян|отдел|качеств/.test(factor)) buckets.adjRep += pct;
      else buckets.adjLoc += pct;
    });
    return buckets;
  };
  const sendToCalculation = () => {
    if (!activeAnalogs.length) {
      if (toast) toast('Нет активных аналогов для переноса');
      return;
    }
    try {
      const key = `ocenka.calculation.${requestId || 'draft'}.v1`;
      const saved = window.readLocalJson ? window.readLocalJson(key, {}) || {} : {};
      const area = toNum(window.OcenkaData.calculation?.subjectArea, 214.6) || 214.6;
      const chosen = activeAnalogs.slice(0, 5);
      const baseWeight = Math.floor(100 / chosen.length);
      const rows = chosen.map((analog, index) => ({
        id: analog.id,
        name: analog.addr,
        src: analog.source,
        price: toNum(analog.price) || avgAdjusted,
        area: toNum(analog.area) || area,
        ...mapAdjustments(analog.adjRows),
        w: index === chosen.length - 1 ? 100 - baseWeight * (chosen.length - 1) : baseWeight,
      }));
      if (window.writeLocalJson) window.writeLocalJson(key, { ...saved, rows });
      if (toast) toast('Аналоги перенесены в расчет');
    } catch {}
    onNavigate('calc');
  };
  return (
    <div>
      <PageHead title="Подбор аналогов" subtitle={`Заявка ${requestId} · ${requestTitle}`}
        actions={[
          <Button key="m" variant="secondary" iconLeft={<Icon n="plus" size={16} />} onClick={openAddAnalog}>Добавить вручную</Button>,
          <Button key="a" variant="primary"   iconLeft={<Icon n="sparkles" size={16} />} onClick={activateAll}>Подобрать аналоги</Button>,
        ]} />

      {/* KPI strip */}
      <div className="ock-grid ock-grid--kpi-4" style={{ gap:16, marginBottom:20 }}>
        {[
          { l:'В подборке',               v:String(analogRows.length),          i:'git-compare',  t:'brand' },
          { l:'Средняя цена за м²',      v:`${avgPerM2.toLocaleString('ru-RU')} ₽`,  i:'ruler',        t:'brand' },
          { l:'Объявлений на рынке',     v:String(marketListings.length),     i:'database',     t:'brand' },
          { l:'Высокая сопоставимость',  v:String(highComparableCount),          i:'badge-check',  t:'accent' },
        ].map((s, i) => <NS.KpiCard key={i} label={s.l} value={s.v} icon={<Icon n={s.i} size={18} />} iconTone={s.t} />)}
      </div>

      <div data-tour-id="analogs-market" style={{ marginBottom:20 }}>
        <Card title="Подбор с рынка" actions={<Badge tone="info">{marketListings.length} в базе</Badge>}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:14 }}>
            <input
              value={marketQuery}
              onChange={(event) => setMarketQuery(event.target.value)}
              placeholder="Поиск по адресу, описанию…"
              style={{ flex:'1 1 220px', minWidth:180, height:36, boxSizing:'border-box', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'0 12px', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', color:'var(--text-strong)', background:'var(--surface-card)', outline:'none' }}
            />
            <select value={marketCity} onChange={(event) => setMarketCity(event.target.value)} style={{ height:36, border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'0 10px', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', background:'var(--surface-card)', color:'var(--text-strong)' }}>
              <option value="all">Все города</option>
              {marketCities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
            <select value={marketCategory} onChange={(event) => setMarketCategory(event.target.value)} style={{ height:36, border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'0 10px', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', background:'var(--surface-card)', color:'var(--text-strong)' }}>
              <option value="all">Все категории</option>
              {marketCategories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
          {!marketListings.length ? (
            <div style={{ padding:'18px 12px', color:'var(--text-muted)', fontSize:'var(--text-sm)', lineHeight:1.5 }}>
              Рыночная база пуста.<br />
              Локально: <code>npm run db:import</code><br />
              Docker: <code>docker compose exec ocenka npm run db:import</code>
            </div>
          ) : (
            <div className="ock-table-scroll" style={{ maxHeight:280 }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:720 }}>
                <thead>
                  <tr>
                    <TH>Адрес</TH>
                    <TH>Категория</TH>
                    <TH right>₽/м²</TH>
                    <TH right>Площадь</TH>
                    <TH right>Цена</TH>
                    <TH right></TH>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarket.map((listing) => (
                    <tr key={listing.id}>
                      <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--divider)', maxWidth:280 }}>
                        <div style={{ fontWeight:600, color:'var(--text-strong)', fontSize:'var(--text-sm)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{listing.addr}</div>
                        <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>{listing.city} · {listing.source || '—'}</div>
                      </td>
                      <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--divider)', fontSize:'var(--text-sm)' }}>{listing.category}</td>
                      <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontVariantNumeric:'tabular-nums', fontWeight:700 }}>{Number(listing.perM2 || 0).toLocaleString('ru-RU')}</td>
                      <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--divider)', textAlign:'right' }}>{listing.area}</td>
                      <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{Number(listing.price || 0).toLocaleString('ru-RU')}</td>
                      <td style={{ padding:'10px 12px', borderBottom:'1px solid var(--divider)', textAlign:'right' }}>
                        <Button type="button" variant="secondary" onClick={() => importFromMarket(listing)}>В аналоги</Button>
                      </td>
                    </tr>
                  ))}
                  {!filteredMarket.length ? (
                    <tr>
                      <td colSpan={6} style={{ padding:16, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>Нет объявлений по фильтру</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Table */}
      <div data-tour-id="analogs-table">
      <Card noBodyPad title="Объекты-аналоги" actions={<Badge tone="info">ЦИАН · Авито · Domclick</Badge>}>
        <div className="ock-table-scroll">
          <table className="ock-table-wide" style={{ width:'100%', borderCollapse:'collapse', minWidth:1000 }}>
            <thead>
              <tr>
                <TH>Учитывать</TH>
                <TH>Адрес / источник</TH>
                <TH right>Цена</TH><TH right>М²</TH><TH right>₽/м²</TH>
                <TH>Расст.</TH><TH>Состояние</TH>
                <TH right>Коррект.</TH><TH right>Скорр. цена</TH>
                <TH>Сопост.</TH>
                <TH right>Действия</TH>
              </tr>
            </thead>
            <tbody>
              {analogRows.map((a) => {
                const active = statuses[a.id];
                return (
                  <tr key={a.id} onClick={() => setSelectedId(a.id)} style={{ cursor:'pointer', transition:'background .1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-inset)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', whiteSpace:'nowrap' }}>
                      {includeToggle(a.id, active)}
                    </td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontWeight:600, color:'var(--text-strong)', fontSize:'var(--text-sm)' }}>{a.addr}</span>
                        {!active && <Badge tone="danger" pill>не учитывается</Badge>}
                      </div>
                      <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:2 }}>{a.source}</div>
                    </td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontSize:'var(--text-sm)' }}>{(toNum(a.price)/1e6).toFixed(1)} млн</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontSize:'var(--text-sm)' }}>{a.area} м²</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontSize:'var(--text-sm)' }}>{Math.round(toNum(a.perM2)/1000)} тыс.</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', fontSize:'var(--text-sm)' }}>{a.dist}</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', fontSize:'var(--text-sm)' }}>{a.cond}</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontWeight:600, fontSize:'var(--text-sm)', color: a.adj.startsWith('−') ? 'var(--danger-text)' : 'var(--success-text)' }}>{a.adj}</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontWeight:700, fontSize:'var(--text-sm)', color:'var(--text-strong)', fontVariantNumeric:'tabular-nums' }}>{a.final} ₽</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)' }}>{compBadge(a.comp)}</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', whiteSpace:'nowrap', textAlign:'right' }}>
                      <div style={{ display:'inline-flex', gap:4 }}>
                        <button type="button" title="Редактировать аналог" aria-label="Редактировать аналог"
                          onClick={(event) => { event.stopPropagation(); openEditAnalog(a); }}
                          style={{ width:30, height:30, border:'none', borderRadius:'var(--radius-sm)', background:'transparent', color:'var(--text-link)', display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                          <Icon n="pencil" size={15} />
                        </button>
                        <button type="button" title="Удалить аналог" aria-label="Удалить аналог"
                          onClick={(event) => { event.stopPropagation(); deleteAnalog(a.id); }}
                          style={{ width:30, height:30, border:'none', borderRadius:'var(--radius-sm)', background:'transparent', color:'var(--danger-text)', display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                          <Icon n="trash-2" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', background:'var(--surface-inset)' }}>
          <span style={{ fontSize:'var(--text-sm)', color:'var(--text-muted)' }}>Средняя скорр. стоимость</span>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <span style={{ fontSize:'var(--text-xl)', fontWeight:700, color:'var(--text-value)', fontVariantNumeric:'tabular-nums' }}>{avgAdjusted.toLocaleString('ru-RU')} ₽</span>
            <span data-tour-id="analogs-to-calc"><Button variant="primary" iconRight={<Icon n="arrow-right" size={15} />} onClick={sendToCalculation}>В расчет</Button></span>
          </div>
        </div>
      </Card>
      </div>

      {/* ─── Detail modal ─────────────────────────────────────────────────── */}
      {selected ? (
        <div onClick={e => { if (e.target === e.currentTarget) setSelectedId(null); }}
          className="ock-modal-backdrop ock-modal-backdrop--dark">
          <div className="ock-modal-panel ock-modal-panel--lg" role="dialog" aria-modal="true" aria-label={`Аналог: ${selected.addr}`} style={{ display:'flex', flexDirection:'column' }}>

            {/* Modal header */}
            <div style={{ padding:'18px 24px', borderBottom:'1px solid var(--divider)', display:'flex', alignItems:'flex-start', gap:14, flexShrink:0 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                  <h2 style={{ fontSize:'var(--text-xl)', fontWeight:700, color:'var(--text-strong)' }}>{selected.addr}</h2>
                  <Badge tone={statuses[selected.id] ? 'success' : 'danger'} pill dot={statuses[selected.id]}>
                    {statuses[selected.id] ? 'Активное объявление' : 'Объявление снято'}
                  </Badge>
                  <Badge tone="outline">{selected.source}</Badge>
                </div>
                <div style={{ marginTop:4, fontSize:'var(--text-sm)', color:'var(--text-muted)' }}>{selected.fullAddr}</div>
              </div>
              <button onClick={() => setSelectedId(null)} aria-label="Закрыть" style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:6, borderRadius:'var(--radius-sm)', display:'inline-flex' }}>
                <Icon n="x" size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="ds-scroll" style={{ flex:1, overflowY:'auto', padding:24 }}>

              {/* Photos: real uploads when present, otherwise placeholder tiles */}
              {(() => {
                const urls = Array.isArray(selected.photoUrls) ? selected.photoUrls : [];
                if (urls.length) {
                  return (
                    <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(urls.length, 4)}, 1fr)`, gap:10, marginBottom:24 }}>
                      {urls.map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noopener noreferrer" style={{ display:'block' }} onClick={(e) => e.stopPropagation()}>
                          <img src={src} alt={`Фото ${i + 1}`} style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', borderRadius:'var(--radius-md)', border:'1px solid var(--border-subtle)' }} />
                        </a>
                      ))}
                    </div>
                  );
                }
                const count = Math.min(toNum(selected.photos), 4);
                if (count <= 0) return null;
                return (
                  <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.max(1, count)}, 1fr)`, gap:10, marginBottom:24 }}>
                    {Array.from({ length: count }).map((_, i) => (
                      <div key={i} style={{ aspectRatio:'4/3', background:'var(--surface-sunken)', borderRadius:'var(--radius-md)', border:'1px solid var(--border-subtle)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, color:'var(--text-subtle)' }}>
                        <Icon n="image" size={26} />
                        <span style={{ fontSize:'var(--text-xs)' }}>Фото {i + 1}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Two-col info */}
              <div className="ock-grid ock-grid--two" style={{ gap:24, marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:'var(--text-xs)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', color:'var(--text-muted)', marginBottom:14 }}>Характеристики объекта</div>
                  <div className="ock-grid ock-grid--two" style={{ gap:'14px 16px' }}>
                    <DetailField label="Площадь"       value={`${selected.area} м²`} />
                    <DetailField label="Этажей"         value={String(selected.floors)} />
                    <DetailField label="Год постройки"  value={String(selected.year)} />
                    <DetailField label="Матер. стен"    value={selected.wallMaterial} />
                    <DetailField label="Состояние"      value={selected.cond} />
                    <DetailField label="Участок"        value={selected.plotArea} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:'var(--text-xs)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', color:'var(--text-muted)', marginBottom:14 }}>Ценовые показатели</div>
                  <div style={{ padding:'16px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)', marginBottom:12 }}>
                    <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600 }}>Цена предложения</div>
                    <div style={{ fontSize:'var(--text-3xl)', fontWeight:700, color:'var(--text-strong)', fontVariantNumeric:'tabular-nums', marginTop:4 }}>{(toNum(selected.price)/1e6).toFixed(1)} млн ₽</div>
                  </div>
                  <div className="ock-grid ock-grid--two" style={{ gap:10 }}>
                    <div style={{ padding:'10px 14px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)' }}>
                      <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600 }}>Цена за м²</div>
                      <div style={{ fontSize:'var(--text-md)', fontWeight:700, color:'var(--text-strong)', marginTop:2 }}>{toNum(selected.perM2).toLocaleString('ru')} ₽</div>
                    </div>
                    <div style={{ padding:'10px 14px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)' }}>
                      <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600 }}>Расстояние</div>
                      <div style={{ fontSize:'var(--text-md)', fontWeight:700, color:'var(--text-strong)', marginTop:2 }}>{selected.dist}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:'var(--text-xs)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', color:'var(--text-muted)', marginBottom:8 }}>Описание из объявления</div>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--text-body)', lineHeight:1.65 }}>{selected.description}</p>
              </div>

              {/* Adjustments */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:'var(--text-xs)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', color:'var(--text-muted)', marginBottom:10 }}>Применённые поправки</div>
                <div style={{ border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-md)', overflow:'hidden' }}>
                  {(selected.adjRows || []).map((r, i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'11px 16px', borderBottom: i < (selected.adjRows || []).length - 1 ? '1px solid var(--divider)' : 'none', fontSize:'var(--text-sm)' }}>
                      <span style={{ color:'var(--text-body)' }}>{r.factor}</span>
                      <span style={{ fontWeight:600, color: toNum(r.pct) < 0 ? 'var(--danger-text)' : 'var(--success-text)', fontVariantNumeric:'tabular-nums' }}>{toNum(r.pct) > 0 ? '+' : ''}{toNum(r.pct)}%</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', padding:'11px 16px', background:'var(--surface-inset)', fontSize:'var(--text-sm)', fontWeight:700 }}>
                    <span>Скорр. цена за м²</span>
                    <span style={{ color:'var(--text-strong)', fontVariantNumeric:'tabular-nums' }}>
                      {Math.round(toNum(selected.perM2) * (1 + (selected.adjRows || []).reduce((s, r) => s + toNum(r.pct), 0) / 100)).toLocaleString('ru')} ₽
                    </span>
                  </div>
                </div>
              </div>

              {/* Source link */}
              <div style={{ padding:'12px 16px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', gap:10 }}>
                <Icon n="external-link" size={16} style={{ color:'var(--text-link)', flexShrink:0 }} />
                {selectedUrl ? (
                  <a href={selectedUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color:'var(--text-link)', fontSize:'var(--text-sm)', fontFamily:'var(--font-mono)', wordBreak:'break-all', flex:1 }}
                    onClick={e => e.stopPropagation()}>
                    {selectedUrl}
                  </a>
                ) : (
                  <span style={{ color:'var(--text-muted)', fontSize:'var(--text-sm)', flex:1 }}>Источник добавлен вручную</span>
                )}
                <span style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', flexShrink:0 }}>добавлено {selected.addedDate}</span>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{ padding:'14px 24px', borderTop:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
              <button onClick={() => toggleStatus(selected.id)} style={{
                display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:'var(--radius-md)',
                border:`1.5px solid ${statuses[selected.id] ? 'var(--danger)' : 'var(--success)'}`,
                background:'transparent',
                color: statuses[selected.id] ? 'var(--danger-text)' : 'var(--success-text)',
                fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:600, cursor:'pointer',
              }}>
                <Icon n={statuses[selected.id] ? 'ban' : 'circle-check-big'} size={16} />
                {statuses[selected.id] ? 'Не учитывать в расчетах' : 'Учитывать в расчетах'}
              </button>
              <div style={{ display:'flex', gap:10 }}>
                <Button variant="ghost" onClick={() => deleteAnalog(selected.id)}>Удалить</Button>
                <Button variant="ghost" onClick={() => onNavigate('calc')}>Поправки</Button>
                <Button variant="secondary" iconLeft={<Icon n="pencil" size={15} />} onClick={() => openEditAnalog(selected)}>Редактировать</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {manualOpen ? (
        <div className="ock-modal-backdrop ock-analog-manual-backdrop" style={{ zIndex:210 }} onMouseDown={closeManual}>
          <form className="ock-modal-panel ock-modal-panel--md" role="dialog" aria-modal="true" aria-label={editingId ? 'Редактирование аналога' : 'Новый аналог'} style={{ display:'flex', flexDirection:'column' }} onSubmit={saveAnalog} onMouseDown={(event) => event.stopPropagation()}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexShrink:0 }}>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>{editingId ? 'Редактирование аналога' : 'Новый аналог'}</div>
                <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>{editingId ? `Аналог ${editingId} в текущей подборке` : 'Будет добавлен в текущую подборку'}</div>
              </div>
              <button type="button" onClick={closeManual} aria-label="Закрыть" style={{ border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', padding:6 }}><Icon n="x" size={18} /></button>
            </div>
            <div className="ock-modal-body ds-scroll">
              <NS.Input label="Адрес" required value={manualDraft.addr} onChange={(event) => setManualDraft((p) => ({ ...p, addr:event.target.value }))} />
              <div className="ock-grid ock-grid--modal-2" style={{ gap:12 }}>
                <NS.Input label="Источник" value={manualDraft.source} onChange={(event) => setManualDraft((p) => ({ ...p, source:event.target.value }))} />
                <NS.Input label="Ссылка на объявление" value={manualDraft.url} onChange={(event) => setManualDraft((p) => ({ ...p, url:event.target.value }))} placeholder="https://" />
              </div>
              <div className="ock-grid ock-grid--modal-3" style={{ gap:12 }}>
                <NS.Input label="Цена, ₽" type="number" required value={manualDraft.price} onChange={(event) => setManualDraft((p) => ({ ...p, price:event.target.value }))} />
                <NS.Input label="Площадь, м²" type="number" required value={manualDraft.area} onChange={(event) => setManualDraft((p) => ({ ...p, area:event.target.value }))} />
                <NS.Input label="Расстояние" value={manualDraft.dist} onChange={(event) => setManualDraft((p) => ({ ...p, dist:event.target.value }))} />
              </div>
              <div className="ock-grid ock-grid--modal-3" style={{ gap:12 }}>
                <NS.Input label="Состояние" value={manualDraft.cond} onChange={(event) => setManualDraft((p) => ({ ...p, cond:event.target.value }))} />
                <NS.Input label="Этажей" type="number" value={manualDraft.floors} onChange={(event) => setManualDraft((p) => ({ ...p, floors:event.target.value }))} />
                <NS.Input label="Год постройки" type="number" value={manualDraft.year} onChange={(event) => setManualDraft((p) => ({ ...p, year:event.target.value }))} />
              </div>
              <div className="ock-grid ock-grid--modal-2" style={{ gap:12 }}>
                <NS.Input label="Материал стен" value={manualDraft.wallMaterial} onChange={(event) => setManualDraft((p) => ({ ...p, wallMaterial:event.target.value }))} />
                <NS.Input label="Участок" value={manualDraft.plotArea} onChange={(event) => setManualDraft((p) => ({ ...p, plotArea:event.target.value }))} />
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontSize:'var(--text-xs)', fontWeight:700, color:'var(--text-muted)' }}>Описание</label>
                <textarea value={manualDraft.description} onChange={(event) => setManualDraft((p) => ({ ...p, description:event.target.value }))}
                  style={{ width:'100%', minHeight:64, resize:'vertical', boxSizing:'border-box', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'8px 10px', color:'var(--text-strong)', background:'var(--surface-card)', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', lineHeight:1.4, outline:'none' }} />
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontSize:'var(--text-xs)', fontWeight:700, color:'var(--text-muted)' }}>Фотографии</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {(manualDraft.photoUrls || []).map((src, i) => (
                    <div key={i} style={{ position:'relative', width:84, height:64 }}>
                      <img src={src} alt={`Фото ${i + 1}`} style={{ width:84, height:64, objectFit:'cover', borderRadius:'var(--radius-sm)', border:'1px solid var(--border-subtle)' }} />
                      <button type="button" aria-label="Удалить фото" onClick={() => removeDraftPhoto(i)}
                        style={{ position:'absolute', top:-8, right:-8, width:22, height:22, borderRadius:'50%', border:'none', background:'var(--danger)', color:'#fff', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                        <Icon n="x" size={12} />
                      </button>
                    </div>
                  ))}
                  {(manualDraft.photoUrls || []).length < 8 ? (
                    <label style={{ width:84, height:64, borderRadius:'var(--radius-sm)', border:'1px dashed var(--border-strong)', display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer', color:'var(--text-muted)' }}>
                      <Icon n="upload" size={16} />
                      <span style={{ fontSize:'var(--text-xs)' }}>Добавить</span>
                      <input type="file" accept="image/*" multiple style={{ display:'none' }} onChange={(event) => { onPhotoFiles(event.target.files); event.target.value = ''; }} />
                    </label>
                  ) : null}
                </div>
              </div>
            </div>
            <div style={{ padding:'14px 20px', borderTop:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', gap:10, flexShrink:0 }}>
              <div>
                {editingId ? (
                  <button type="button" onClick={() => deleteAnalog(editingId)} style={{ height:36, padding:'0 14px', border:'1px solid var(--danger)', borderRadius:'var(--radius-md)', background:'transparent', color:'var(--danger-text)', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8 }}>
                    <Icon n="trash-2" size={15} /> Удалить
                  </button>
                ) : null}
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <Button type="button" variant="secondary" onClick={closeManual}>Отмена</Button>
                <Button type="submit" variant="primary" iconLeft={<Icon n={editingId ? 'save' : 'plus'} size={16} />}>{editingId ? 'Сохранить' : 'Добавить'}</Button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
