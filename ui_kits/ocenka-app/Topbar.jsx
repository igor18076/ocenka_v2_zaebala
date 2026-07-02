/* Topbar — search, new appraisal, profile. window.Topbar */
window.Topbar = function Topbar({ onNewAppraisal }) {
  const { Button, IconButton, Avatar } = NS;
  const D = window.OcenkaData;
  return (
    <header style={{
      height: 'var(--topbar-height)', flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 24px', background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Search */}
      <div style={{ flex: 1, maxWidth: 460 }}>
        <div className="ock-input" style={{ background: 'var(--surface-inset)', border: '1px solid transparent' }}>
          <span className="ock-input__affix"><Icon n="search" size={17} /></span>
          <input className="ock-input__el" placeholder="Поиск по заявкам, объектам, клиентам…" style={{ background: 'transparent' }} />
          <kbd style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 4, padding: '1px 6px' }}>⌘K</kbd>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <Button variant="primary" iconLeft={<Icon n="plus" size={16} />} onClick={onNewAppraisal}>Новая оценка</Button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconButton aria-label="Уведомления"><Icon n="bell" size={18} /></IconButton>
        <IconButton aria-label="Помощь"><Icon n="circle-help" size={18} /></IconButton>
      </div>

      <div style={{ width: 1, height: 28, background: 'var(--divider)' }} />

      <button style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 'var(--radius-md)' }}>
        <Avatar name={D.user.name} />
        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{D.user.name}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{D.user.role}</div>
        </div>
        <Icon n="chevron-down" size={16} style={{ color: 'var(--text-muted)' }} />
      </button>
    </header>
  );
};
