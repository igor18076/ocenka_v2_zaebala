/* Sidebar navigation — dark graphite rail. window.Sidebar */
window.SidebarV2 = function SidebarV2({ active, onNavigate }) {
  const D = window.OcenkaData;
  const loadCount = () => {
    const rows = window.loadKanbanRequests ? window.loadKanbanRequests() : (D.requests || []);
    return rows.filter((request) => request.status !== 'ready').length;
  };
  const [activeCount, setActiveCount] = React.useState(loadCount);
  React.useEffect(() => {
    const reload = () => setActiveCount(loadCount());
    window.addEventListener('ocenka:requests-updated', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('ocenka:requests-updated', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);

  return (
    <aside data-tour-id="sidebar" className="ock-sidebar" style={{
      width: 'var(--sidebar-width)', flexShrink: 0, height: '100%',
      background: 'var(--surface-sidebar)', display: 'flex', flexDirection: 'column',
    }}>
      {/* Brand */}
      <div className="ock-sidebar__brand" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '18px 20px 16px' }}>
        <img src={(window.__resources && window.__resources.markSvg) || '../../assets/mark.svg'} alt="" style={{ width: 34, height: 34 }} />
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: 0 }}>Оценка<span style={{ color: '#5DC393' }}> PRO</span></div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-on-sidebar-muted)', marginTop: 3 }}>Автоматизация оценки</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="ds-scroll ock-sidebar__nav" style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {D.nav.map((item) => {
          const on = item.key === active;
          const badge = item.key === 'requests' ? (activeCount || null) : item.badge;
          return (
            <button key={item.key} data-tour-id={`nav-${item.key}`} onClick={() => onNavigate(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                padding: '9px 12px', border: 'none', borderRadius: 'var(--radius-md)',
                cursor: 'pointer', textAlign: 'left',
                background: on ? 'var(--blue-600)' : 'transparent',
                color: on ? '#fff' : 'var(--text-on-sidebar)',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
                fontWeight: on ? 600 : 500,
                transition: 'background var(--duration-fast), color var(--duration-fast)',
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'var(--surface-sidebar-hover)'; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon n={item.icon} size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {badge ? (
                <span style={{
                  minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999,
                  background: on ? 'rgba(255,255,255,.22)' : 'var(--blue-600)', color: '#fff',
                  fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{badge}</span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Footer help */}
      <div
        className="ock-sidebar__footer"
        role="button"
        tabIndex={0}
        onClick={() => onNavigate('fso')}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onNavigate('fso'); }}
        style={{ padding: 16, margin: 12, borderRadius: 'var(--radius-lg)', background: 'var(--surface-sidebar-hover)', cursor:'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
          <Icon n="life-buoy" size={16} /> Поддержка ФСО
        </div>
        <p style={{ marginTop: 6, fontSize: 'var(--text-xs)', color: 'var(--text-on-sidebar-muted)', lineHeight: 1.5 }}>
          Шаблоны заданий и методики оценки в один клик
        </p>
      </div>
    </aside>
  );
};
