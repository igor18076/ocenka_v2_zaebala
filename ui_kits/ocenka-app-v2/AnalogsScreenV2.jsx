/* Analogs screen with detail modal — window.AnalogsScreen */
window.AnalogsScreenV2 = function AnalogsScreenV2({ request, onNavigate, toast }) {
  const { Card, Button, Badge } = NS;
  const D = window.OcenkaData;
  const requestId = request?.id || D.object?.id;
  const requestTitle = request?.object || D.object?.title || 'Объект оценки';
  const toNum = (value, fallback = 0) => {
    const parsed = Number(String(value ?? '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const analogStorageKey = (id) => `ocenka.analogs.${id || 'draft'}.v1`;
  const analogOpenKey = (id) => `ocenka.analogs.open.${id || 'draft'}.v1`;
  const loadSavedAnalogs = (id) => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(analogStorageKey(id)) || 'null');
      return saved && Array.isArray(saved.rows) ? saved : null;
    } catch {
      return null;
    }
  };
  const initialAnalogs = loadSavedAnalogs(requestId);

  const [analogRows, setAnalogRows] = React.useState(initialAnalogs?.rows || D.analogsDetailed || []);
  const [manualOpen, setManualOpen] = React.useState(false);
  const [manualDraft, setManualDraft] = React.useState({ addr:'', source:'Ручной ввод', price:0, area:0, dist:'', cond:'Хорошее' });
  const [statuses, setStatuses] = React.useState(() => {
    if (initialAnalogs?.statuses) return initialAnalogs.statuses;
    return (D.analogsDetailed || []).reduce((acc, analog) => ({ ...acc, [analog.id]: analog.active }), {});
  });
  const [loadedRequestId, setLoadedRequestId] = React.useState(requestId);
  const [selectedId, setSelectedId] = React.useState(null);
  const selected = analogRows.find(a => a.id === selectedId);
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
      window.localStorage.setItem(analogStorageKey(requestId), JSON.stringify({ rows: analogRows, statuses }));
    } catch {}
  }, [requestId, loadedRequestId, analogRows, statuses]);

  const toggleStatus = (id) => setStatuses(s => ({ ...s, [id]: !s[id] }));
  const activateAll = () => {
    setStatuses(analogRows.reduce((acc, analog) => ({ ...acc, [analog.id]: true }), {}));
    if (toast) toast('Аналоги подобраны');
  };
  const addManualAnalog = (event) => {
    event.preventDefault();
    const price = toNum(manualDraft.price);
    const area = toNum(manualDraft.area);
    if (!manualDraft.addr.trim() || price <= 0 || area <= 0) return;
    const id = `AN-${String(analogRows.length + 1).padStart(3, '0')}`;
    const perM2 = Math.round(price / area);
    const next = {
      id,
      addr: manualDraft.addr.trim(),
      fullAddr: manualDraft.addr.trim(),
      source: manualDraft.source.trim() || 'Ручной ввод',
      url: '',
      active: true,
      price,
      area,
      perM2,
      dist: manualDraft.dist.trim() || '—',
      cond: manualDraft.cond.trim() || 'Хорошее',
      floors: 1,
      year: new Date().getFullYear(),
      wallMaterial: '—',
      plotArea: '—',
      adj: '0%',
      final: price.toLocaleString('ru-RU'),
      comp: 'mid',
      description: 'Аналог добавлен вручную для предварительного расчета.',
      photos: 0,
      addedDate: new Date().toLocaleDateString('ru-RU'),
      adjRows: [{ factor:'Ручная корректировка', pct:0 }],
    };
    setAnalogRows((rows) => [next, ...rows]);
    setStatuses((items) => ({ ...items, [id]: true }));
    setManualDraft({ addr:'', source:'Ручной ввод', price:0, area:0, dist:'', cond:'Хорошее' });
    setManualOpen(false);
    if (toast) toast('Аналог добавлен');
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
  const sendToCalculation = () => {
    if (!activeAnalogs.length) {
      if (toast) toast('Нет активных аналогов для переноса');
      return;
    }
    try {
      const key = `ocenka.calculation.${requestId || 'draft'}.v1`;
      const saved = JSON.parse(window.localStorage.getItem(key) || 'null') || {};
      const area = toNum(window.OcenkaData.calculation?.subjectArea, 214.6) || 214.6;
      const rows = activeAnalogs.slice(0, 5).map((analog, index) => ({
        id: analog.id,
        name: analog.addr,
        src: analog.source,
        price: toNum(analog.price) || avgAdjusted,
        area: toNum(analog.area) || area,
        adjTorg: 0,
        adjLoc: 0,
        adjRep: 0,
        adjFlr: 0,
        w: index === 0 ? 40 : 30,
      }));
      window.localStorage.setItem(key, JSON.stringify({ ...saved, rows }));
      if (toast) toast('Аналоги перенесены в расчет');
    } catch {}
    onNavigate('calc');
  };
  const modalBackdrop = {
    position:'fixed',
    top:0,
    right:0,
    bottom:0,
    left:'var(--sidebar-width)',
    zIndex:210,
    background:'rgba(15, 23, 42, .42)',
    display:'grid',
    placeItems:'center',
    padding:24,
    boxSizing:'border-box',
  };
  const modalPanel = {
    width:'min(100%, 620px)',
    maxHeight:'calc(100vh - 48px)',
    background:'var(--surface-card)',
    border:'1px solid var(--border-subtle)',
    borderRadius:'var(--radius-lg)',
    boxShadow:'var(--shadow-lg)',
    overflow:'hidden',
    display:'flex',
    flexDirection:'column',
  };
  const modalBody = {
    padding:20,
    display:'grid',
    gap:14,
    overflowY:'auto',
    minHeight:0,
  };
  const manualGrid2 = { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:12, minWidth:0 };
  const manualGrid3 = { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:12, minWidth:0 };

  return (
    <div>
      <PageHead title="Подбор аналогов" subtitle={`Заявка ${requestId} · ${requestTitle}`}
        actions={[
          <Button key="m" variant="secondary" iconLeft={<Icon n="plus" size={16} />} onClick={() => setManualOpen(true)}>Добавить вручную</Button>,
          <Button key="a" variant="primary"   iconLeft={<Icon n="sparkles" size={16} />} onClick={activateAll}>Подобрать аналоги</Button>,
        ]} />

      {/* KPI strip */}
      <div className="ock-kpi-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:16, marginBottom:20 }}>
        {[
          { l:'Найдено аналогов',        v:String(analogRows.length),          i:'git-compare',  t:'brand' },
          { l:'Средняя цена за м²',      v:`${avgPerM2.toLocaleString('ru-RU')} ₽`,  i:'ruler',        t:'brand' },
          { l:'Радиус поиска',           v:'4.0 км',     i:'map-pin',      t:'brand' },
          { l:'Высокая сопоставимость',  v:String(highComparableCount),          i:'badge-check',  t:'accent' },
        ].map((s, i) => <NS.KpiCard key={i} label={s.l} value={s.v} icon={<Icon n={s.i} size={18} />} iconTone={s.t} />)}
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
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ width:860, maxWidth:'94vw', maxHeight:'88vh', background:'var(--surface-card)', borderRadius:'var(--radius-xl)', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'var(--shadow-xl)' }}>

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
              <button onClick={() => setSelectedId(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', padding:6, borderRadius:'var(--radius-sm)', display:'inline-flex' }}>
                <Icon n="x" size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="ds-scroll" style={{ flex:1, overflowY:'auto', padding:24 }}>

              {/* Photos placeholder */}
              <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.max(1, Math.min(toNum(selected.photos), 4))}, 1fr)`, gap:10, marginBottom:24 }}>
                {Array.from({ length: Math.min(toNum(selected.photos), 4) }).map((_, i) => (
                  <div key={i} style={{ aspectRatio:'4/3', background:'var(--surface-sunken)', borderRadius:'var(--radius-md)', border:'1px solid var(--border-subtle)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, color:'var(--text-subtle)' }}>
                    <Icon n="image" size={26} />
                    <span style={{ fontSize:'var(--text-xs)' }}>Фото {i+1}</span>
                  </div>
                ))}
              </div>

              {/* Two-col info */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:'var(--text-xs)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', color:'var(--text-muted)', marginBottom:14 }}>Характеристики объекта</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px 16px' }}>
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
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
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
                {selected.url ? (
                  <a href={selected.url} target="_blank" rel="noreferrer"
                    style={{ color:'var(--text-link)', fontSize:'var(--text-sm)', fontFamily:'var(--font-mono)', wordBreak:'break-all', flex:1 }}
                    onClick={e => e.stopPropagation()}>
                    {selected.url}
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
                <Button variant="ghost" onClick={() => setSelectedId(null)}>Закрыть</Button>
                <Button variant="secondary" iconLeft={<Icon n="pencil" size={15} />} onClick={() => onNavigate('calc')}>Редактировать поправки</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {manualOpen ? (
        <div style={modalBackdrop} onMouseDown={() => setManualOpen(false)}>
          <form onSubmit={addManualAnalog} onMouseDown={(event) => event.stopPropagation()} style={modalPanel}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexShrink:0 }}>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>Новый аналог</div>
                <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>Будет добавлен в текущую подборку</div>
              </div>
              <button type="button" onClick={() => setManualOpen(false)} aria-label="Закрыть" style={{ border:'none', background:'transparent', cursor:'pointer', color:'var(--text-muted)', padding:6 }}><Icon n="x" size={18} /></button>
            </div>
            <div className="ds-scroll" style={modalBody}>
              <NS.Input label="Адрес" required value={manualDraft.addr} onChange={(event) => setManualDraft((p) => ({ ...p, addr:event.target.value }))} />
              <div style={manualGrid2}>
                <NS.Input label="Источник" value={manualDraft.source} onChange={(event) => setManualDraft((p) => ({ ...p, source:event.target.value }))} />
                <NS.Input label="Расстояние" value={manualDraft.dist} onChange={(event) => setManualDraft((p) => ({ ...p, dist:event.target.value }))} />
              </div>
              <div style={manualGrid3}>
                <NS.Input label="Цена, ₽" type="number" required value={manualDraft.price} onChange={(event) => setManualDraft((p) => ({ ...p, price:event.target.value }))} />
                <NS.Input label="Площадь, м²" type="number" required value={manualDraft.area} onChange={(event) => setManualDraft((p) => ({ ...p, area:event.target.value }))} />
                <NS.Input label="Состояние" value={manualDraft.cond} onChange={(event) => setManualDraft((p) => ({ ...p, cond:event.target.value }))} />
              </div>
            </div>
            <div style={{ padding:'14px 20px', borderTop:'1px solid var(--divider)', display:'flex', justifyContent:'flex-end', gap:10, flexShrink:0 }}>
              <Button type="button" variant="secondary" onClick={() => setManualOpen(false)}>Отмена</Button>
              <Button type="submit" variant="primary" iconLeft={<Icon n="plus" size={16} />}>Добавить</Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
