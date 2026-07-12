/* Dashboard — hero, KPI tiles, recent requests. window.DashboardScreen */
window.DashboardScreenV2 = function DashboardScreenV2({ onOpenRequest, onNavigate }) {
  const { KpiCard, Card, Table, StatusBadge, Button, Avatar } = NS;
  const D = window.OcenkaData;
  const requests = (() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('ocenka.requests.kanban.v1') || 'null');
      return Array.isArray(saved) ? saved : (D.requests || []);
    } catch {
      return D.requests || [];
    }
  })();
  const activeCount = requests.filter((request) => request.status !== 'ready').length;
  const readyCount = requests.filter((request) => request.status === 'ready').length;
  const reviewCount = requests.filter((request) => request.status === 'review').length;
  const newCount = requests.filter((request) => request.status === 'new').length;
  const dashboardKpis = [
    { label:'Заявок всего', value:String(requests.length), icon:'clipboard-list', tone:'brand', helper:'актуальная доска' },
    { label:'В работе', value:String(activeCount), icon:'activity', tone:'brand', helper:'без готовых' },
    { label:'Новые', value:String(newCount), icon:'inbox', tone:'warning', helper:'ожидают разбора' },
    { label:'На проверке', value:String(reviewCount), icon:'shield-check', tone:'accent', helper:'контроль качества' },
    { label:'Готово', value:String(readyCount), icon:'circle-check-big', tone:'accent', helper:'отчеты готовы' },
  ];

  return (
    <div>
      {/* Hero */}
      <div data-tour-id="dashboard-hero" style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--blue-900)', borderRadius: 'var(--radius-xl)',
        padding: '28px 32px', marginBottom: 24,
      }}>
        <div style={{ position: 'relative', maxWidth: 640 }}>
          <div className="ds-overline" style={{ color: '#7FB0E8' }}>Рабочее пространство оценщика</div>
          <h2 style={{ color: '#fff', fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 0, marginTop: 10, lineHeight: 1.15 }}>
            Автоматизируйте оценку недвижимости:<br />от заявки до готового отчета
          </h2>
          <p style={{ color: '#C7D6EC', fontSize: 'var(--text-md)', marginTop: 12, lineHeight: 1.55 }}>
            Система помогает собирать данные, подбирать аналоги, выполнять расчеты и формировать
            отчет с учетом требований ФСО.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <Button variant="accent" iconLeft={<Icon n="plus" size={16} />} onClick={() => {
              onNavigate('requests');
              window.setTimeout(() => window.dispatchEvent(new Event('ocenka:create-request')), 0);
            }}>Создать заявку</Button>
            <button onClick={() => onNavigate('fso')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.18)', borderRadius: 'var(--radius-md)', padding: '0 18px', height: 38, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 600, cursor: 'pointer' }}>
              <Icon n="shield-check" size={16} /> Проверка ФСО
            </button>
          </div>
        </div>
      </div>

      <div data-tour-id="getting-started" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:14, marginBottom:24 }}>
        {[
          { title:'Создать заявку', text:'Открыть форму новой оценки', icon:'plus', action:() => { onNavigate('requests'); window.setTimeout(() => window.dispatchEvent(new Event('ocenka:create-request')), 0); } },
          { title:'Открыть доску', text:'Посмотреть этапы всех заявок', icon:'columns-3', action:() => onNavigate('requests') },
          { title:'Проверить объект', text:'Уточнить параметры и документы', icon:'home', action:() => { if (requests[0]) onOpenRequest(requests[0]); else onNavigate('objects'); } },
          { title:'Сформировать отчет', text:'Перейти к выгрузке результата', icon:'file-check', action:() => onNavigate('reports') },
        ].map((item) => (
          <button key={item.title} onClick={item.action} style={{ textAlign:'left', background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:14, cursor:'pointer', display:'flex', gap:12, alignItems:'flex-start', fontFamily:'var(--font-sans)' }}>
            <span style={{ width:32, height:32, borderRadius:'var(--radius-sm)', background:'var(--blue-50)', color:'var(--blue-700)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon n={item.icon} size={16} /></span>
            <span style={{ minWidth:0 }}>
              <span style={{ display:'block', color:'var(--text-strong)', fontSize:'var(--text-sm)', fontWeight:800 }}>{item.title}</span>
              <span style={{ display:'block', marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.4 }}>{item.text}</span>
            </span>
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div data-tour-id="dashboard-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {dashboardKpis.map((k, i) => (
          <KpiCard key={i} label={k.label} value={k.value} icon={<Icon n={k.icon} size={18} />}
            iconTone={k.tone} delta={k.delta} deltaDir={k.dir} helper={k.helper} />
        ))}
      </div>

      {/* Recent requests */}
      <div data-tour-id="dashboard-requests">
      <Card noBodyPad
        title="Последние заявки"
        actions={<Button variant="ghost" size="sm" iconRight={<Icon n="arrow-right" size={15} />} onClick={() => onNavigate('requests')}>Все заявки</Button>}>
        <Table numeric onRowClick={(r) => onOpenRequest(r)}
          columns={[
            { key: 'id', header: '№ заявки', render: (r) => <span className="ds-mono" style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.id}</span> },
            { key: 'object', header: 'Объект', render: (r) => (
              <div><div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{r.object}</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{r.address}</div></div>
            ) },
            { key: 'client', header: 'Клиент' },
            { key: 'type', header: 'Тип оценки' },
            { key: 'status', header: 'Статус', render: (r) => <StatusBadge status={r.status} /> },
            { key: 'date', header: 'Дата оценки' },
            { key: 'owner', header: 'Ответственный', render: (r) => r.owner === '—'
              ? <span style={{ color: 'var(--text-subtle)' }}>—</span>
              : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Avatar name={r.owner} size="sm" />{r.owner}</span> },
            { key: 'act', header: '', align: 'right', render: () => <span style={{ color: 'var(--text-subtle)' }}><Icon n="chevron-right" size={16} /></span> },
          ]}
          rows={requests.slice(0, 5)} />
      </Card>
      </div>
    </div>
  );
};
