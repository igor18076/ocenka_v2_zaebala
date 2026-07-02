/* Value calculation — three approaches + reconciliation. window.CalcScreen */
window.CalcScreen = function CalcScreen({ onNavigate }) {
  const { Card, Button, Switch, Badge } = NS;
  const D = window.OcenkaData;

  return (
    <div>
      <PageHead title="Расчет стоимости" subtitle="Объект ОЗ-1040 · согласование результатов трех подходов"
        actions={<Button variant="accent" iconLeft={<Icon n="file-check" size={16} />} onClick={() => onNavigate('report')}>Сформировать отчет</Button>} />

      {/* Three approaches */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
        {D.approaches.map((a) => (
          <div key={a.key} className="ock-card" style={{ padding: 20, opacity: a.applied ? 1 : 0.62 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-strong)' }}>{a.name}</div>
                <div style={{ marginTop: 6 }}>
                  {a.applied
                    ? <Badge tone="success" pill dot>Применяется</Badge>
                    : <Badge tone="neutral" pill>Не применяется</Badge>}
                </div>
              </div>
              <Switch defaultChecked={a.applied} />
            </div>

            <div style={{ marginTop: 18 }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--text-muted)' }}>Рассчитанная стоимость</span>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: a.applied ? 'var(--text-strong)' : 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>
                {a.applied ? `${a.value} ₽` : '—'}
              </div>
            </div>

            <p style={{ marginTop: 14, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5, minHeight: 42 }}>{a.note}</p>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>Вес при согласовании</span>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: a.applied ? 'var(--blue-700)' : 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{a.weight}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reconciliation result */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'stretch' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--emerald-700)', borderRadius: 'var(--radius-xl)', padding: '28px 32px', color: '#fff' }}>
          <div style={{ position: 'absolute', right: -30, bottom: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
          <div className="ds-overline" style={{ color: '#A7E8C8' }}>Итоговая рыночная стоимость</div>
          <div style={{ fontSize: 44, fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em', marginTop: 10, lineHeight: 1 }}>{D.result.value} ₽</div>
          <div style={{ display: 'flex', gap: 28, marginTop: 22 }}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#A7E8C8', fontWeight: 600 }}>Диапазон стоимости</div>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{D.result.low} – {D.result.high} ₽</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#A7E8C8', fontWeight: 600 }}>Дата расчета</div>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, marginTop: 4 }}>{D.result.date}</div>
            </div>
          </div>
        </div>

        <Card title="Согласование">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {D.approaches.filter((a) => a.applied).map((a) => (
              <div key={a.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                <span style={{ color: 'var(--text-body)' }}>{a.name.replace(' подход', '')} · {a.weight}%</span>
                <span style={{ fontWeight: 600, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{a.value} ₽</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--divider)' }} />
            <NS.ProgressBar label="Достоверность результата" value={88} />
            <Button variant="primary" block iconRight={<Icon n="arrow-right" size={15} />} onClick={() => onNavigate('fso')}>Проверить по ФСО</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
