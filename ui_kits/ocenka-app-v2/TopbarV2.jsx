/* Topbar — search, new appraisal, profile. window.Topbar */
window.TopbarV2 = function TopbarV2({ onNewAppraisal, activeRequestId }) {
  const { Button, IconButton, Avatar } = NS;
  const D = window.OcenkaData;
  const [query, setQuery] = React.useState('');
  const [menu, setMenu] = React.useState(null);
  const [tick, setTick] = React.useState(0);
  const readSettings = () => {
    return window.readLocalJson ? window.readLocalJson('ocenka.settings.v1', {}) || {} : {};
  };
  const [savedSettings, setSavedSettings] = React.useState(readSettings);
  React.useEffect(() => {
    const refresh = () => setSavedSettings(readSettings());
    const bump = () => setTick((n) => n + 1);
    window.addEventListener('ocenka:settings-updated', refresh);
    window.addEventListener('ocenka:requests-updated', bump);
    window.addEventListener('ocenka:active-request', bump);
    window.addEventListener('storage', bump);
    return () => {
      window.removeEventListener('ocenka:settings-updated', refresh);
      window.removeEventListener('ocenka:requests-updated', bump);
      window.removeEventListener('ocenka:active-request', bump);
      window.removeEventListener('storage', bump);
    };
  }, []);
  const user = { ...D.user, name: savedSettings.name || D.user.name };
  const headerRef = React.useRef(null);
  window.useEscapeToClose(!!menu, () => setMenu(null));
  React.useEffect(() => {
    if (!menu) return undefined;
    const onDocMouseDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setMenu(null);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [menu]);

  const loadKanban = () => (window.loadKanbanRequests ? window.loadKanbanRequests() : (D.requests || []));
  const notifications = React.useMemo(() => {
    void tick;
    const requests = loadKanban();
    const items = [];
    const review = requests.filter((r) => r.status === 'review');
    const news = requests.filter((r) => r.status === 'new');
    if (review.length) {
      items.push({
        title: 'На проверке',
        text: `${review.length} заявок ждут контроля качества.`,
        action: () => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('requests'); },
      });
    }
    if (news.length) {
      items.push({
        title: 'Новые заявки',
        text: `${news.length} в колонке «Новые».`,
        action: () => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('requests'); },
      });
    }
    const objectId = activeRequestId || (window.getActiveRequestId && window.getActiveRequestId()) || D.object?.id;
    if (objectId) {
      try {
        if (window.localStorage.getItem(`ocenka.report.review.${objectId}.v1`) !== '1') {
          const open = window.OcenkaFso
            ? window.OcenkaFso.openCount(objectId)
            : (() => {
              const fso = window.readLocalJson ? window.readLocalJson(`ocenka.fso.${objectId}.v1`, null) : null;
              const list = Array.isArray(fso) ? fso : (D.fso || []);
              return list.filter((item) => !item.done).length;
            })();
          if (open > 0) {
            items.push({
              title: 'Проверка ФСО',
              text: `${open} незакрытых пунктов по текущей заявке.`,
              action: () => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('fso'); },
            });
          }
        }
      } catch {}
    }
    if (!items.length) items.push({ title: 'Всё спокойно', text: 'Нет срочных сигналов по заявкам и ФСО.' });
    return items;
  }, [tick, menu, activeRequestId]);

  const urgentCount = notifications.filter((item) => item.action).length;
  const runSearch = () => {
    const value = query.trim();
    if (!value) return;
    if (window.ocenkaGoTo) window.ocenkaGoTo('requests');
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('ocenka:request-search', { detail: value }));
    }, 0);
  };
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');
  const panel = {
    position: 'absolute',
    top: 'calc(var(--topbar-height) - 4px)',
    right: 24,
    width: 300,
    zIndex: 80,
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    padding: 12,
  };
  const panelItem = { padding: '10px 8px', borderRadius: 'var(--radius-md)' };

  React.useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const input = headerRef.current && headerRef.current.querySelector('input[data-topbar-search]');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header ref={headerRef} className="ock-topbar" style={{ height: 'var(--topbar-height)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', borderBottom: '1px solid var(--divider)', background: 'var(--surface-card)', position: 'relative', zIndex: 40 }}>
      <div data-tour-id="topbar-search" className="ock-topbar__search" style={{ flex: 1, maxWidth: 460 }}>
        <div className="ock-input" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, padding: '0 10px', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-inset)' }}>
          <span className="ock-input__affix"><Icon n="search" size={17} /></span>
          <input
            data-topbar-search="1"
            type="search"
            placeholder="Поиск по заявкам…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') runSearch(); }}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-strong)' }}
          />
          <kbd style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 4, padding: '1px 6px' }}>{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button variant="primary" size="sm" iconLeft={<Icon n="plus" size={15} />} onClick={onNewAppraisal}>Новая оценка</Button>
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <IconButton aria-label="Уведомления" aria-haspopup="true" aria-expanded={menu === 'notifications'} onClick={() => setMenu(menu === 'notifications' ? null : 'notifications')}><Icon n="bell" size={18} /></IconButton>
          {urgentCount ? (
            <span style={{
              position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16, padding: '0 4px',
              borderRadius: 999, background: 'var(--danger, #dc2626)', color: '#fff',
              fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>{urgentCount}</span>
          ) : null}
        </span>
        <span data-tour-id="topbar-help"><IconButton aria-label="Помощь" aria-haspopup="true" aria-expanded={menu === 'help'} onClick={() => setMenu(menu === 'help' ? null : 'help')}><Icon n="circle-help" size={18} /></IconButton></span>
      </div>

      <div style={{ width: 1, height: 28, background: 'var(--divider)' }} />

      <button data-tour-id="profile-menu" className="ock-topbar__profile" aria-haspopup="true" aria-expanded={menu === 'profile'} onClick={() => setMenu(menu === 'profile' ? null : 'profile')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 'var(--radius-md)' }}>
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
              <div style={{ fontWeight: 800, color: 'var(--text-strong)', margin: '2px 4px 10px' }}>Уведомления</div>
              {notifications.map((item) => (
                <button key={item.title + item.text} type="button" onClick={item.action || (() => setMenu(null))} style={{ ...panelItem, display: 'block', width: '100%', textAlign: 'left', border: 'none', background: 'transparent', cursor: item.action ? 'pointer' : 'default', fontFamily: 'inherit' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 'var(--text-sm)' }}>{item.title}</div>
                  <div style={{ marginTop: 3, color: 'var(--text-muted)', fontSize: 'var(--text-xs)', lineHeight: 1.4 }}>{item.text}</div>
                </button>
              ))}
            </React.Fragment>
          ) : null}
          {menu === 'help' ? (
            <React.Fragment>
              <div style={{ fontWeight: 800, color: 'var(--text-strong)', margin: '2px 4px 10px' }}>Помощь</div>
              <div style={panelItem}>Enter в поиске фильтрует доску заявок.</div>
              <div style={panelItem}>Карточки заявок: перетаскивание или Alt+←/→.</div>
              <Button variant="secondary" block iconLeft={<Icon n="route" size={15} />} onClick={() => { setMenu(null); window.dispatchEvent(new Event('ocenka:start-onboarding')); }}>Пройти обучение</Button>
              <Button variant="secondary" block onClick={() => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('fso'); }}>Открыть проверку ФСО</Button>
            </React.Fragment>
          ) : null}
          {menu === 'profile' ? (
            <React.Fragment>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 4px 12px' }}>
                <Avatar name={user.name} />
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--text-strong)' }}>{user.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{user.role}</div>
                </div>
              </div>
              <Button variant="secondary" block onClick={() => { setMenu(null); window.ocenkaGoTo && window.ocenkaGoTo('settings'); }}>Настройки профиля</Button>
              <Button variant="ghost" block iconLeft={<Icon n="route" size={15} />} onClick={() => { setMenu(null); window.dispatchEvent(new Event('ocenka:start-onboarding')); }}>Пройти обучение</Button>
              <form method="post" action="/logout" style={{ marginTop: 8 }}>
                <Button variant="ghost" block iconLeft={<Icon n="log-out" size={15} />}>Выйти</Button>
              </form>
            </React.Fragment>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};
