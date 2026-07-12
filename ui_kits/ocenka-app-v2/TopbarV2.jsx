/* Topbar — search, new appraisal, profile. window.Topbar */
window.TopbarV2 = function TopbarV2({ onNewAppraisal }) {
  const { Button, IconButton, Avatar } = NS;
  const D = window.OcenkaData;
  const [query, setQuery] = React.useState('');
  const [menu, setMenu] = React.useState(null);
  const readSettings = () => {
    try { return JSON.parse(window.localStorage.getItem('ocenka.settings.v1') || '{}'); } catch { return {}; }
  };
  const [savedSettings, setSavedSettings] = React.useState(readSettings);
  React.useEffect(() => {
    const refresh = () => setSavedSettings(readSettings());
    window.addEventListener('ocenka:settings-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('ocenka:settings-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  const user = { ...D.user, name: savedSettings.name || D.user.name };

  const runSearch = () => {
    const value = query.trim();
    if (!value) return;
    if (window.ocenkaGoTo) window.ocenkaGoTo('requests');
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('ocenka:request-search', { detail: value }));
    }, 0);
  };
  const panel = {
    position:'absolute',
    top:'calc(var(--topbar-height) - 4px)',
    right:24,
    width:300,
    zIndex:80,
    background:'var(--surface-card)',
    border:'1px solid var(--border-subtle)',
    borderRadius:'var(--radius-lg)',
    boxShadow:'var(--shadow-lg)',
    padding:12,
  };
  const panelItem = { padding:'10px 12px', borderRadius:'var(--radius-md)', background:'var(--surface-inset)', marginBottom:8 };

  return (
    <header style={{
      height: 'var(--topbar-height)', flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 24px', background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Search */}
      <div data-tour-id="topbar-search" style={{ flex: 1, maxWidth: 460 }}>
        <div className="ock-input" style={{ background: 'var(--surface-inset)', border: '1px solid transparent' }}>
          <span className="ock-input__affix"><Icon n="search" size={17} /></span>
          <input
            className="ock-input__el"
            placeholder="Поиск по заявкам, объектам, клиентам…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') runSearch();
              if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                event.currentTarget.select();
              }
            }}
            style={{ background: 'transparent' }}
          />
          <kbd style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 4, padding: '1px 6px' }}>⌘K</kbd>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <span data-tour-id="topbar-new">
        <Button variant="primary" iconLeft={<Icon n="plus" size={16} />} onClick={onNewAppraisal}>Новая оценка</Button>
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconButton aria-label="Уведомления" onClick={() => setMenu(menu === 'notifications' ? null : 'notifications')}><Icon n="bell" size={18} /></IconButton>
        <span data-tour-id="topbar-help"><IconButton aria-label="Помощь" onClick={() => setMenu(menu === 'help' ? null : 'help')}><Icon n="circle-help" size={18} /></IconButton></span>
      </div>

      <div style={{ width: 1, height: 28, background: 'var(--divider)' }} />

      <button data-tour-id="profile-menu" onClick={() => setMenu(menu === 'profile' ? null : 'profile')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 'var(--radius-md)' }}>
        <Avatar name={user.name} />
        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{user.name}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{user.role}</div>
        </div>
        <Icon n="chevron-down" size={16} style={{ color: 'var(--text-muted)' }} />
      </button>
      {menu ? (
        <div style={panel}>
          {menu === 'notifications' ? (
            <React.Fragment>
              <div style={{ fontWeight:800, color:'var(--text-strong)', margin:'2px 4px 10px' }}>Уведомления</div>
              {[
                ['ФСО', 'В отчете есть 2 незавершенных пункта проверки.'],
                ['Заявки', 'Новая заявка будет создана через кнопку в шапке.'],
              ].map(([title, text]) => (
                <div key={title} style={panelItem}>
                  <div style={{ fontWeight:700, color:'var(--text-strong)', fontSize:'var(--text-sm)' }}>{title}</div>
                  <div style={{ marginTop:3, color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.4 }}>{text}</div>
                </div>
              ))}
            </React.Fragment>
          ) : null}
          {menu === 'help' ? (
            <React.Fragment>
              <div style={{ fontWeight:800, color:'var(--text-strong)', margin:'2px 4px 10px' }}>Помощь</div>
              <div style={panelItem}>Enter в поиске открывает заявки и применяет фильтр.</div>
              <div style={panelItem}>Карточки заявок можно перетаскивать между колонками.</div>
              <Button variant="secondary" block iconLeft={<Icon n="route" size={15} />} onClick={() => { setMenu(null); window.dispatchEvent(new Event('ocenka:start-onboarding')); }}>Пройти обучение</Button>
              <Button variant="secondary" block onClick={() => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('fso'); }}>Открыть проверку ФСО</Button>
            </React.Fragment>
          ) : null}
          {menu === 'profile' ? (
            <React.Fragment>
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'4px 4px 12px' }}>
                <Avatar name={user.name} />
                <div>
                  <div style={{ fontWeight:800, color:'var(--text-strong)' }}>{user.name}</div>
                  <div style={{ color:'var(--text-muted)', fontSize:'var(--text-xs)' }}>{user.role}</div>
                </div>
              </div>
              <Button variant="secondary" block onClick={() => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('settings'); }}>Настройки профиля</Button>
              <Button variant="ghost" block iconLeft={<Icon n="route" size={15} />} onClick={() => { setMenu(null); window.dispatchEvent(new Event('ocenka:start-onboarding')); }}>Пройти обучение</Button>
              <form method="post" action="/logout" style={{ marginTop:8 }}>
                <Button variant="ghost" block iconLeft={<Icon n="log-out" size={15} />}>Выйти</Button>
              </form>
            </React.Fragment>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};
