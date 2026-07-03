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

  return (
    <div>
      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--blue-900)', borderRadius: 'var(--radius-xl)',
        padding: '28px 32px', marginBottom: 24,
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,168,113,.22), transparent 70%)' }} />
        <div style={{ position: 'relative', maxWidth: 640 }}>
          <div className="ds-overline" style={{ color: '#7FB0E8' }}>Рабочее пространство оценщика</div>
          <h2 style={{ color: '#fff', fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-.02em', marginTop: 10, lineHeight: 1.15 }}>
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

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {D.kpis.map((k, i) => (
          <KpiCard key={i} label={k.label} value={k.value} icon={<Icon n={k.icon} size={18} />}
            iconTone={k.tone} delta={k.delta} deltaDir={k.dir} helper={k.helper} />
        ))}
      </div>

      {/* Recent requests */}
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
  );
};
