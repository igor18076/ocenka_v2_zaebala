/* ФСО compliance checklist with live progress. window.FsoScreen */
window.FsoScreenV2 = function FsoScreenV2({ onNavigate, toast }) {
  const { Card, Button, ProgressBar, Badge } = NS;
  const [items, setItems] = React.useState(window.OcenkaData.fso.map((x) => ({ ...x })));

  const done = items.filter((i) => i.done).length;
  const pct = Math.round((done / items.length) * 100);
  const toggle = (idx) => setItems((arr) => arr.map((it, i) => i === idx ? { ...it, done: !it.done } : it));
  const recheck = () => {
    setItems(window.OcenkaData.fso.map((x) => ({ ...x })));
    if (toast) toast('Проверка ФСО обновлена');
  };

  return (
    <div>
      <PageHead title="Проверка ФСО" subtitle="Соответствие отчета федеральным стандартам оценки"
        actions={<Button variant="primary" iconLeft={<Icon n="refresh-cw" size={16} />} onClick={recheck}>Перепроверить</Button>} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20, alignItems: 'start' }}>
        {/* Progress summary */}
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '8px 4px' }}>
            <div style={{ position: 'relative', width: 132, height: 132 }}>
              <svg width="132" height="132" viewBox="0 0 132 132" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="66" cy="66" r="58" fill="none" stroke="var(--neutral-200)" strokeWidth="12" />
                <circle cx="66" cy="66" r="58" fill="none" stroke="var(--emerald-500)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={2 * Math.PI * 58 * (1 - pct / 100)}
                  style={{ transition: 'stroke-dashoffset .4s var(--ease-out)' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{pct}%</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>соответствие</span>
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-md)', color: 'var(--text-body)' }}>Выполнено <b style={{ color: 'var(--text-strong)' }}>{done}</b> из {items.length} требований</div>
            {pct === 100
              ? <Badge tone="success" pill dot>Готов к формированию</Badge>
              : <Badge tone="warning" pill>Требуется доработка</Badge>}
            <Button variant="accent" block disabled={pct !== 100} iconLeft={<Icon n="file-check" size={16} />} onClick={() => onNavigate('reports')}>
              Сформировать отчет
            </Button>
          </div>
        </Card>

        {/* Checklist */}
        <Card title="Чек-лист соответствия" noBodyPad>
          <div>
            {items.map((it, i) => (
              <button key={i} onClick={() => toggle(i)} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
                padding: '14px 20px', border: 'none', borderBottom: i < items.length - 1 ? '1px solid var(--divider)' : 'none',
                background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: it.done ? 'var(--emerald-500)' : 'var(--surface-card)',
                  border: it.done ? 'none' : '1.5px solid var(--border-strong)',
                  color: '#fff',
                }}>
                  {it.done ? <Icon n="check" size={14} /> : null}
                </span>
                <span style={{ flex: 1, fontSize: 'var(--text-md)', color: it.done ? 'var(--text-strong)' : 'var(--text-body)', fontWeight: it.done ? 500 : 400 }}>{it.label}</span>
                {it.done
                  ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success-text)', fontWeight: 600 }}>выполнено</span>
                  : <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>не выполнено</span>}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
