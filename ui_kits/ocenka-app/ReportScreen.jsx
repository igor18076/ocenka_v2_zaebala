/* Report generation. window.ReportScreen */
window.ReportScreen = function ReportScreen({ toast }) {
  const { Card, Button, Badge, ProgressBar } = NS;
  const D = window.OcenkaData;
  const o = D.object;
  const reportSections = D.reportSections || [];
  const report = D.report || {};

  return (
    <div>
      <PageHead title="Отчет об оценке" subtitle="Формирование итогового документа об оценке" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* Report preview card */}
        <Card>
          <div style={{ display: 'flex', gap: 20 }}>
            {/* Document thumb */}
            <div style={{ width: 132, flexShrink: 0 }}>
              <div style={{ aspectRatio: '210 / 297', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-subtle)', padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: 'var(--blue-600)' }} />
                <div style={{ height: 7, width: '80%', background: 'var(--neutral-200)', borderRadius: 2, marginTop: 6 }} />
                <div style={{ height: 7, width: '60%', background: 'var(--neutral-200)', borderRadius: 2 }} />
                <div style={{ height: 1, background: 'var(--divider)', margin: '6px 0' }} />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ height: 5, width: `${90 - i * 7}%`, background: 'var(--neutral-100)', borderRadius: 2 }} />
                ))}
                <div style={{ margintop: 'auto', height: 18, width: '70%', background: 'var(--emerald-100)', borderRadius: 3, marginTop: 'auto' }} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-strong)' }}>Отчет об оценке квартиры №{o.id}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: 'var(--text-sm)' }}>{o.address}</p>

              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                <Badge tone="brand">DOCX</Badge>
                <Badge tone="info">PDF</Badge>
                <Badge tone="success" pill dot>Готов к формированию</Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', marginTop: 20 }}>
                <DetailField label="Вид стоимости" value={o.valueType} />
                <DetailField label="Итоговая стоимость" value={`${D.result.value} ₽`} />
                <DetailField label="Дата оценки" value={o.date} />
                <DetailField label="Объем отчета" value={`≈ ${report.pageCount} страниц`} />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                <Button variant="primary" iconLeft={<Icon n="file-text" size={16} />} onClick={() => toast('Файл DOCX сформирован и загружается')}>Скачать DOCX</Button>
                <Button variant="secondary" iconLeft={<Icon n="file-down" size={16} />} onClick={() => toast('Файл PDF сформирован и загружается')}>Скачать PDF</Button>
                <Button variant="ghost" iconLeft={<Icon n="send" size={16} />} onClick={() => toast('Отчет отправлен на проверку')}>Отправить на проверку</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Composition checklist */}
        <Card title="Состав отчета">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ProgressBar label="Готовность документа" value={80} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 4 }}>
              {reportSections.map(({ label, done: ok }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: ok ? 'var(--success)' : 'var(--text-subtle)', display: 'inline-flex' }}>
                    <Icon n={ok ? 'circle-check-big' : 'circle-dashed'} size={17} />
                  </span>
                  <span style={{ color: ok ? 'var(--text-strong)' : 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
