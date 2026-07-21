/* Dashboard — hero, KPI tiles, recent requests. window.DashboardScreen */
window.DashboardScreenV2 = function DashboardScreenV2({ onOpenRequest, onNavigate }) {
  const { KpiCard, Card, Table, StatusBadge, Button, Avatar } = NS;
  const D = window.OcenkaData;
  const loadRequests = () => {
    try {
      const saved = window.readLocalJson ? window.readLocalJson('ocenka.requests.kanban.v1', null) : null;
      return Array.isArray(saved) ? saved : (D.requests || []);
    } catch {
      return D.requests || [];
    }
  };
  const [requests, setRequests] = React.useState(loadRequests);
  React.useEffect(() => {
    const reload = () => setRequests(loadRequests());
    window.addEventListener('ocenka:requests-updated', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('ocenka:requests-updated', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);
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
        padding: '28px 32px', marginBottom: 24, color: '#fff',
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 80% 20%, rgba(93,195,147,.28), transparent 55%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:24, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontSize:'var(--text-xs)', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', opacity:.7, marginBottom:8 }}>Рабочий стол</div>
            <h1 style={{ margin:0, fontSize:'var(--text-3xl)', fontWeight:800, letterSpacing:'-0.02em' }}>Оценка PRO</h1>
            <p style={{ margin:'8px 0 0', opacity:.85, fontSize:'var(--text-sm)', maxWidth:420, lineHeight:1.45 }}>
              {requests.length
                ? `На доске ${requests.length} заявок · ${reviewCount} на проверке · ${readyCount} готовы`
                : 'Создайте первую заявку и проведите оценку от подбора аналогов до отчёта'}
            </p>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <Button variant="secondary" onClick={() => onNavigate('requests')} style={{ background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.25)', color:'#fff' }}>Доска заявок</Button>
            <Button variant="primary" iconLeft={<Icon n="plus" size={16} />} onClick={() => {
              onNavigate('requests');
              window.setTimeout(() => window.dispatchEvent(new Event('ocenka:create-request')), 0);
            }}>Новая заявка</Button>
          </div>
        </div>
      </div>

      <div data-tour-id="getting-started" className="ock-grid ock-grid--three" style={{ gap:12, marginBottom:24 }}>
        {[
          { title:'Создать заявку', text:'Открыть форму новой оценки', icon:'plus', action:() => { onNavigate('requests'); window.setTimeout(() => window.dispatchEvent(new Event('ocenka:create-request')), 0); } },
          { title:'Открыть доску', text:'Посмотреть этапы всех заявок', icon:'columns-3', action:() => onNavigate('requests') },
          { title:'Проверить объект', text:'Уточнить параметры и документы', icon:'home', action:() => { if (requests[0]) onOpenRequest(requests[0]); else onNavigate('objects'); } },
        ].map((item) => (
          <button key={item.title} type="button" onClick={item.action} style={{
            textAlign:'left', padding:'16px 18px', borderRadius:'var(--radius-lg)', border:'1px solid var(--border-subtle)',
            background:'var(--surface-card)', cursor:'pointer', display:'flex', gap:14, alignItems:'flex-start',
          }}>
            <span style={{ width:36, height:36, borderRadius:'var(--radius-md)', background:'var(--blue-50)', color:'var(--blue-700)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon n={item.icon} size={18} />
            </span>
            <span>
              <div style={{ fontWeight:700, color:'var(--text-strong)', fontSize:'var(--text-sm)' }}>{item.title}</div>
              <div style={{ marginTop:4, color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.4 }}>{item.text}</div>
            </span>
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="ock-grid ock-grid--kpi-5 ock-kpi-grid" style={{ gap:16, marginBottom:24 }}>
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} icon={<Icon n={kpi.icon} size={18} />} iconTone={kpi.tone} helper={kpi.helper} />
        ))}
      </div>

      {/* Recent requests */}
      <div data-tour-id="dashboard-requests">
      <Card
        title="Недавние заявки"
        actions={<Button variant="ghost" size="sm" iconRight={<Icon n="arrow-right" size={15} />} onClick={() => onNavigate('requests')}>Все заявки</Button>}>
        <Table
          columns={[
            { key:'id', label:'№', render:(row) => <span className="ds-mono" style={{ fontSize:'var(--text-xs)' }}>{row.id}</span> },
            { key:'object', label:'Объект', render:(row) => (
              <button type="button" onClick={() => onOpenRequest(row)} style={{ background:'none', border:'none', padding:0, cursor:'pointer', color:'var(--text-link)', fontWeight:600, fontFamily:'inherit', fontSize:'var(--text-sm)', textAlign:'left' }}>{row.object}</button>
            ) },
            { key:'client', label:'Клиент' },
            { key:'status', label:'Стадия', render:(row) => <StatusBadge status={row.status} /> },
            { key:'owner', label:'Ответственный', render:(row) => row.owner && row.owner !== '—'
              ? <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}><Avatar name={row.owner} size="sm" /><span>{row.owner}</span></span>
              : <span style={{ color:'var(--text-subtle)' }}>—</span> },
          ]}
          rows={requests.slice(0, 5)} />
      </Card>
      </div>
    </div>
  );
};
