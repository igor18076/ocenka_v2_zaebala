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
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-strong)', letterSpacing: 0 }}>{title}</h1>
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

window.HelpTip = function HelpTip({ title, text, side = 'top' }) {
  const [open, setOpen] = React.useState(false);
  const isBottom = side === 'bottom';
  const isLeft = side === 'left';
  return (
    <span
      style={{ position:'relative', display:'inline-flex', verticalAlign:'middle' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={title || 'Подсказка'}
        onClick={() => setOpen((value) => !value)}
        style={{
          width:20,
          height:20,
          border:'1px solid var(--border-subtle)',
          borderRadius:'50%',
          background:'var(--surface-card)',
          color:'var(--text-muted)',
          display:'inline-flex',
          alignItems:'center',
          justifyContent:'center',
          cursor:'pointer',
          padding:0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display:'inline-flex',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            height:'100%',
            fontSize:12,
            lineHeight:1,
            fontWeight:800,
            color:'currentColor',
          }}
        >
          ?
        </span>
      </button>
      {open ? (
        <span
          role="tooltip"
          style={{
            position:'absolute',
            zIndex:90,
            width:280,
            left:isLeft ? 'auto' : '50%',
            right:isLeft ? 26 : 'auto',
            top:isBottom ? 26 : 'auto',
            bottom:isBottom ? 'auto' : 26,
            transform:isLeft ? 'none' : 'translateX(-50%)',
            background:'var(--neutral-900)',
            color:'#fff',
            borderRadius:'var(--radius-md)',
            boxShadow:'var(--shadow-lg)',
            padding:'10px 12px',
            pointerEvents:'none',
          }}
        >
          {title ? <span style={{ display:'block', fontWeight:800, fontSize:'var(--text-xs)', marginBottom:4 }}>{title}</span> : null}
          <span style={{ display:'block', fontSize:'var(--text-xs)', lineHeight:1.45, color:'rgba(255,255,255,.86)' }}>{text}</span>
        </span>
      ) : null}
    </span>
  );
};
