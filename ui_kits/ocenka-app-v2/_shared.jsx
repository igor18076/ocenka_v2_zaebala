/* Shared helpers for the Ocenka PRO UI kit screens. Loaded before screens. */
window.NS = window.OcenkaPRODesignSystem_7e0e51;

/* Lucide icon as a React node. Icons are materialized after each render. */
window.Icon = function Icon({ n, size = 18, color, strokeWidth = 2, style }) {
  return React.createElement('i', {
    'data-lucide': n,
    style: { display: 'inline-flex', width: size, height: size, color, ...style },
    'data-sw': strokeWidth,
  });
};

window.materializeIcons = function () {
  if (window.lucide) window.lucide.createIcons();
};

/* Section header used at the top of each screen. */
window.PageHead = function PageHead({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-strong)', letterSpacing: '-.01em' }}>{title}</h1>
        {subtitle ? <p style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: 'var(--text-md)' }}>{subtitle}</p> : null}
      </div>
      {actions ? <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>{actions}</div> : null}
    </div>
  );
};

/* Small labelled field for read-only detail grids. */
window.DetailField = function DetailField({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 'var(--text-md)', color: 'var(--text-strong)', fontWeight: 500, fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</span>
    </div>
  );
};
