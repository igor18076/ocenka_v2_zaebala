/* Object card — details, documents, photos. window.ObjectScreen */
window.ObjectScreenV2 = function ObjectScreenV2({ onBack, onNavigate, toast }) {
  const { Card, Button, Badge, StatusBadge, Tabs } = NS;
  const D = window.OcenkaData;
  const o = D.object;
  const [tab, setTab] = React.useState('params');
  const [docs, setDocs] = React.useState(o.docs || []);
  const fileRef = React.useRef(null);

  const fileIcon = (kind) => kind === 'doc' ? 'file-text' : 'file';

  return (
    <div>
      {/* Breadcrumb + head */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-link)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, padding: 0 }}>
          <Icon n="arrow-left" size={15} /> Заявки
        </button>
        <Icon n="chevron-right" size={14} />
        <span className="ds-mono">{o.id}</span>
      </div>

      <PageHead title={o.title} subtitle={o.address}
        actions={[
          <Button key="e" variant="secondary" iconLeft={<Icon n="pencil" size={16} />} onClick={() => { setTab('params'); if (toast) toast('Параметры объекта открыты для проверки'); }}>Редактировать</Button>,
          <Button key="c" variant="primary" iconLeft={<Icon n="calculator" size={16} />} onClick={() => onNavigate('calc')}>Перейти к расчету</Button>,
        ]} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <StatusBadge status="calc" />
        <Badge tone="brand">{o.valueType}</Badge>
        <Badge tone="outline">{o.purpose}</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20, alignItems: 'start' }}>
        <div>
          <Card noBodyPad>
            <div style={{ padding: '6px 16px 0' }}>
              <Tabs value={tab} onChange={setTab} items={[
                { value: 'params', label: 'Параметры' },
                { value: 'docs', label: 'Документы', count: docs.length },
                { value: 'photos', label: 'Фотографии', count: o.photos },
              ]} />
            </div>
            <div style={{ padding: 24 }}>
              {tab === 'params' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '22px 24px' }}>
                  <DetailField label="Тип объекта" value={o.type} />
                  <DetailField label="Площадь" value={o.area} />
                  <DetailField label="Этажность" value={o.floors} />
                  <DetailField label="Год постройки" value={o.year} />
                  <DetailField label="Кадастровый №" value={o.cadastral} mono />
                  <DetailField label="Дата оценки" value={o.date} />
                  <DetailField label="Цель оценки" value={o.purpose} />
                  <DetailField label="Вид стоимости" value={o.valueType} />
                  <DetailField label="Заказчик" value={o.client} />
                </div>
              ) : null}

              {tab === 'docs' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {docs.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)' }}>
                      <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: d.kind === 'pdf' ? 'var(--red-50)' : 'var(--blue-50)', color: d.kind === 'pdf' ? 'var(--red-600)' : 'var(--blue-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon n={fileIcon(d.kind)} size={17} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: 'var(--text-sm)' }}>{d.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{d.size}</div>
                      </div>
                      <span style={{ color: 'var(--text-muted)' }}><Icon n="download" size={17} /></span>
                    </div>
                  ))}
                  <input
                    ref={fileRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setDocs((items) => [...items, {
                        name: file.name,
                        size: `${Math.max(1, Math.round(file.size / 1024))} КБ`,
                        kind: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'doc',
                      }]);
                      event.target.value = '';
                      if (toast) toast('Документ добавлен');
                    }}
                  />
                  <button onClick={() => fileRef.current && fileRef.current.click()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    <Icon n="upload" size={16} /> Загрузить документ
                  </button>
                </div>
              ) : null}

              {tab === 'photos' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {Array.from({ length: o.photos }).map((_, i) => (
                    <div key={i} style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-subtle)', border: '1px solid var(--border-subtle)' }}>
                      <Icon n="image" size={22} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>
        </div>

        {/* Side summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card title="Сводка">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <DetailField label="Заявка" value={o.id} mono />
              <DetailField label="Заказчик" value={o.client} />
              <DetailField label="Цель оценки" value={o.purpose} />
              <div style={{ height: 1, background: 'var(--divider)' }} />
              <div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--text-muted)' }}>Предв. рыночная стоимость</span>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-value)', fontVariantNumeric: 'tabular-nums', marginTop: 6, letterSpacing: '-.01em' }}>{D.result.value} ₽</div>
              </div>
            </div>
          </Card>
          <Card title="Готовность к отчету">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <NS.ProgressBar label="Соответствие ФСО" value={80} />
              <Button variant="accent" block iconLeft={<Icon n="file-check" size={16} />} onClick={() => onNavigate('reports')}>Сформировать отчет</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
