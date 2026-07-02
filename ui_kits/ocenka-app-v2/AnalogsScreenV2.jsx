/* Analogs screen with detail modal — window.AnalogsScreen */
window.AnalogsScreenV2 = function AnalogsScreenV2({ onNavigate, toast }) {
  const { Card, Button, Badge } = NS;
  const D = window.OcenkaData;

  const [statuses, setStatuses] = React.useState(() => {
    const m = {};
    D.analogsDetailed.forEach(a => { m[a.id] = a.active; });
    return m;
  });
  const [selectedId, setSelectedId] = React.useState(null);
  const selected = D.analogsDetailed.find(a => a.id === selectedId);

  const toggleStatus = (id) => setStatuses(s => ({ ...s, [id]: !s[id] }));
  const activateAll = () => {
    setStatuses(D.analogsDetailed.reduce((acc, analog) => ({ ...acc, [analog.id]: true }), {}));
    if (toast) toast('Аналоги подобраны');
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

  return (
    <div>
      <PageHead title="Подбор аналогов" subtitle="Объект ОЗ-1040 · Жилой дом, пос. Барвиха"
        actions={[
          <Button key="m" variant="secondary" iconLeft={<Icon n="plus" size={16} />} onClick={() => toast && toast('Ручное добавление доступно в расчете')}>Добавить вручную</Button>,
          <Button key="a" variant="primary"   iconLeft={<Icon n="sparkles" size={16} />} onClick={activateAll}>Подобрать аналоги</Button>,
        ]} />

      {/* KPI strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20 }}>
        {[
          { l:'Найдено аналогов',        v:'4',          i:'git-compare',  t:'brand' },
          { l:'Средняя цена за м²',      v:'119 559 ₽',  i:'ruler',        t:'brand' },
          { l:'Радиус поиска',           v:'4.0 км',     i:'map-pin',      t:'brand' },
          { l:'Высокая сопоставимость',  v:'2',          i:'badge-check',  t:'accent' },
        ].map((s, i) => <NS.KpiCard key={i} label={s.l} value={s.v} icon={<Icon n={s.i} size={18} />} iconTone={s.t} />)}
      </div>

      {/* Table */}
      <Card noBodyPad title="Объекты-аналоги" actions={<Badge tone="info">ЦИАН · Авито · Domclick</Badge>}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <TH>Адрес / источник</TH>
                <TH right>Цена</TH><TH right>М²</TH><TH right>₽/м²</TH>
                <TH>Расст.</TH><TH>Состояние</TH>
                <TH right>Коррект.</TH><TH right>Скорр. цена</TH>
                <TH>Сопост.</TH>
              </tr>
            </thead>
            <tbody>
              {D.analogsDetailed.map((a) => {
                const active = statuses[a.id];
                return (
                  <tr key={a.id} onClick={() => setSelectedId(a.id)} style={{ cursor:'pointer', transition:'background .1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-inset)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontWeight:600, color:'var(--text-strong)', fontSize:'var(--text-sm)' }}>{a.addr}</span>
                        {!active && <Badge tone="danger" pill>Снято</Badge>}
                      </div>
                      <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:2 }}>{a.source}</div>
                    </td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontSize:'var(--text-sm)' }}>{(a.price/1e6).toFixed(1)} млн</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontSize:'var(--text-sm)' }}>{a.area} м²</td>
                    <td style={{ padding:'13px 14px', borderBottom:'1px solid var(--divider)', textAlign:'right', fontSize:'var(--text-sm)' }}>{Math.round(a.perM2/1000)} тыс.</td>
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
            <span style={{ fontSize:'var(--text-xl)', fontWeight:700, color:'var(--text-value)', fontVariantNumeric:'tabular-nums' }}>23 207 300 ₽</span>
            <Button variant="primary" iconRight={<Icon n="arrow-right" size={15} />} onClick={() => onNavigate('calc')}>В расчет</Button>
          </div>
        </div>
      </Card>

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
              <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(selected.photos, 4)}, 1fr)`, gap:10, marginBottom:24 }}>
                {Array.from({ length: Math.min(selected.photos, 4) }).map((_, i) => (
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
                    <div style={{ fontSize:'var(--text-3xl)', fontWeight:700, color:'var(--text-strong)', fontVariantNumeric:'tabular-nums', marginTop:4 }}>{(selected.price/1e6).toFixed(1)} млн ₽</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    <div style={{ padding:'10px 14px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)' }}>
                      <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600 }}>Цена за м²</div>
                      <div style={{ fontSize:'var(--text-md)', fontWeight:700, color:'var(--text-strong)', marginTop:2 }}>{selected.perM2.toLocaleString('ru')} ₽</div>
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
                  {selected.adjRows.map((r, i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'11px 16px', borderBottom: i < selected.adjRows.length - 1 ? '1px solid var(--divider)' : 'none', fontSize:'var(--text-sm)' }}>
                      <span style={{ color:'var(--text-body)' }}>{r.factor}</span>
                      <span style={{ fontWeight:600, color: r.pct < 0 ? 'var(--danger-text)' : 'var(--success-text)', fontVariantNumeric:'tabular-nums' }}>{r.pct > 0 ? '+' : ''}{r.pct}%</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', padding:'11px 16px', background:'var(--surface-inset)', fontSize:'var(--text-sm)', fontWeight:700 }}>
                    <span>Скорр. цена за м²</span>
                    <span style={{ color:'var(--text-strong)', fontVariantNumeric:'tabular-nums' }}>
                      {Math.round(selected.perM2 * (1 + selected.adjRows.reduce((s, r) => s + r.pct, 0) / 100)).toLocaleString('ru')} ₽
                    </span>
                  </div>
                </div>
              </div>

              {/* Source link */}
              <div style={{ padding:'12px 16px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', gap:10 }}>
                <Icon n="external-link" size={16} style={{ color:'var(--text-link)', flexShrink:0 }} />
                <a href={selected.url} target="_blank" rel="noreferrer"
                  style={{ color:'var(--text-link)', fontSize:'var(--text-sm)', fontFamily:'var(--font-mono)', wordBreak:'break-all', flex:1 }}
                  onClick={e => e.stopPropagation()}>
                  {selected.url}
                </a>
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
                {statuses[selected.id] ? 'Отметить объявление как снятое' : 'Восстановить активный статус'}
              </button>
              <div style={{ display:'flex', gap:10 }}>
                <Button variant="ghost" onClick={() => setSelectedId(null)}>Закрыть</Button>
                <Button variant="secondary" iconLeft={<Icon n="pencil" size={15} />} onClick={() => onNavigate('calc')}>Редактировать поправки</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
