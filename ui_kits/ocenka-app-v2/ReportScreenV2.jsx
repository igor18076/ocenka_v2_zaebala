/* Report generation. window.ReportScreen */
window.ReportScreenV2 = function ReportScreenV2({ request, toast }) {
  const { Card, Button, Badge, ProgressBar } = NS;
  const D = window.OcenkaData;
  const selected = request || (D.requests || []).find((item) => item.id === D.object?.id) || {};
  const initialObject = {
    ...D.object,
    id: selected.id || D.object.id,
    title: selected.object || D.object.title,
    address: selected.address || D.object.address,
    client: selected.client || D.object.client,
    valueType: selected.type ? `${selected.type} стоимость` : D.object.valueType,
    date: selected.date || D.object.date,
  };
  const savedObject = (() => {
    try {
      return JSON.parse(window.localStorage.getItem(`ocenka.object.${initialObject.id}.v1`) || 'null') || {};
    } catch {
      return {};
    }
  })();
  const o = { ...initialObject, ...savedObject };
  const settings = (() => {
    try { return JSON.parse(window.localStorage.getItem('ocenka.settings.v1') || '{}'); } catch { return {}; }
  })();
  const reportSections = D.reportSections || [];
  const report = D.report || {};
  const reviewStorageKey = `ocenka.report.review.${o.id}.v1`;
  const [reviewSent, setReviewSent] = React.useState(() => {
    try { return window.localStorage.getItem(reviewStorageKey) === '1'; } catch { return false; }
  });
  const [loadedReviewId, setLoadedReviewId] = React.useState(o.id);
  const calc = D.calculation || {};
  const fmt = (n) => Math.round(n || 0).toLocaleString('ru-RU');
  const toNum = (value, fallback = 0) => {
    const parsed = Number(String(value ?? '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const loadSavedCalculation = (id) => {
    try {
      return JSON.parse(window.localStorage.getItem(`ocenka.calculation.${id || 'draft'}.v1`) || 'null') || {};
    } catch {
      return {};
    }
  };
  const savedCalc = loadSavedCalculation(o.id);
  const weights = savedCalc.weights || calc.weights || { comp:60, income:10, cost:30 };
  const applied = savedCalc.applied || calc.applied || { comp:true, income:true, cost:true };
  const rows = savedCalc.rows || calc.comparableRows || [];
  const subjectArea = toNum(o.area ?? savedCalc.subjectArea ?? calc.subjectArea ?? D.object?.area, 214.6) || 214.6;
  const income = savedCalc.inc || { ...(calc.income || {}), area: subjectArea };
  const rentRows = savedCalc.rentRows || income.rentAnalogs || [];
  const cst = savedCalc.cst || { ...(calc.cost || {}), m: subjectArea };
  const validRows = rows.filter((row) => toNum(row.price) > 0 && toNum(row.area) > 0);
  const compValue = validRows.length ? Math.round(validRows.reduce((sum, row) => {
    const weightSum = validRows.reduce((total, item) => total + Math.max(0, toNum(item.w)), 0) || 1;
    const adj = 1 + (toNum(row.adjTorg) + toNum(row.adjLoc) + toNum(row.adjRep) + toNum(row.adjFlr)) / 100;
    return sum + (toNum(row.price) / toNum(row.area, 1)) * adj * (Math.max(0, toNum(row.w)) / weightSum);
  }, 0) * subjectArea) : 0;
  const rentRate = rentRows.length ? Math.round(rentRows.reduce((sum, row) => {
    const weight = toNum(row.weight);
    const adjusted = toNum(row.rentPerM2) * (1 + (toNum(row.adjLoc) + toNum(row.adjCond)) / 100);
    return sum + adjusted * weight;
  }, 0) / (rentRows.reduce((sum, row) => sum + toNum(row.weight), 0) || 1)) : toNum(income.rent);
  const pgi = Math.round(toNum(income.area) * toNum(rentRate) * 12);
  const egi = Math.round(pgi * (1 - toNum(income.vacancy) / 100));
  const noi = Math.round(egi * (1 - toNum(income.opex) / 100));
  const incomeValue = toNum(income.cap) > 0 ? Math.round(noi / (toNum(income.cap) / 100)) : 0;
  const costValue = Math.round(((toNum(cst.n) * toNum(cst.m) * toNum(cst.kPer, 1) * toNum(cst.kReg, 1) * toNum(cst.kZon, 1) * toNum(cst.kSeis, 1) * toNum(cst.kF, 1)) + toNum(cst.zd)) * toNum(cst.kInd, 1) * (1 + toNum(cst.vat) / 100));
  const finalRows = [
    { key:'comp', name:'Сравнительный подход', value:compValue, weight:weights.comp ?? 60 },
    { key:'income', name:'Доходный подход', value:incomeValue, weight:weights.income ?? 10 },
    { key:'cost', name:'Затратный подход', value:costValue, weight:weights.cost ?? 30 },
  ].filter((row) => applied[row.key] !== false);
  const finalValue = savedCalc.final || Math.round(finalRows.reduce((sum, row) => sum + toNum(row.value) * toNum(row.weight), 0) / (finalRows.reduce((sum, row) => sum + toNum(row.weight), 0) || 1));
  const doneSections = reportSections.filter((section) => section.done).length;
  const reportReady = Math.round((doneSections / (reportSections.length || 1)) * 100);
  React.useEffect(() => {
    try {
      setReviewSent(window.localStorage.getItem(reviewStorageKey) === '1');
    } catch {
      setReviewSent(false);
    }
    setLoadedReviewId(o.id);
  }, [o.id]);
  React.useEffect(() => {
    if (loadedReviewId !== o.id) return;
    try {
      window.localStorage.setItem(reviewStorageKey, reviewSent ? '1' : '0');
    } catch {}
  }, [reviewStorageKey, loadedReviewId, o.id, reviewSent]);
  const cell = { padding:'8px 10px', borderBottom:'1px solid var(--divider)', fontSize:'var(--text-sm)' };
  const reportHtml = () => `<!doctype html><html><head><meta charset="utf-8"><title>Отчет ${o.id}</title><style>body{font-family:Arial,sans-serif;line-height:1.45;color:#111}table{border-collapse:collapse;width:100%;margin:16px 0}td,th{border:1px solid #ccc;padding:8px;text-align:left}th{background:#f3f4f6}.num{text-align:right}.photos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.photo{height:88px;border:1px solid #ccc;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#555}</style></head><body><h1>Отчет об оценке №${o.id}</h1><p><b>Объект:</b> ${o.title}</p><p><b>Адрес:</b> ${o.address}</p><p><b>Заказчик:</b> ${o.client}</p><p><b>Оценщик:</b> ${settings.name || window.OcenkaData.user?.name || 'Игорь Дорощенко'}</p><p><b>Итоговая стоимость:</b> ${fmt(finalValue)} ₽</p>${settings.includePhotos !== false ? `<h2>Фотографии объекта</h2><div class="photos">${Array.from({ length: Math.min(toNum(o.photos), 6) }).map((_, index) => `<div class="photo">Фото ${index + 1}</div>`).join('')}</div>` : ''}<h2>Таблица 6. Расчет доходным методом</h2><table><tr><th>Аналог</th><th>Ставка</th><th>Корр.</th><th>Вес</th><th>Скорр. ставка</th></tr>${rentRows.map((row) => { const correction = toNum(row.adjLoc) + toNum(row.adjCond); const adjusted = Math.round(toNum(row.rentPerM2) * (1 + correction / 100)); return `<tr><td>${row.addr}</td><td class="num">${fmt(toNum(row.rentPerM2))}</td><td class="num">${correction}%</td><td class="num">${toNum(row.weight).toFixed(3)}</td><td class="num">${fmt(adjusted)}</td></tr>`; }).join('')}</table><h2>Таблица 8. Финальный расчет</h2><table><tr><th>Подход</th><th>Стоимость</th><th>Вес</th><th>Вклад</th></tr>${finalRows.map((row) => `<tr><td>${row.name}</td><td class="num">${fmt(toNum(row.value))} ₽</td><td class="num">${toNum(row.weight).toFixed(2)}%</td><td class="num">${fmt(toNum(row.value) * toNum(row.weight) / 100)} ₽</td></tr>`).join('')}<tr><th>Итого</th><th colspan="3" class="num">${fmt(finalValue)} ₽</th></tr></table></body></html>`;
  const downloadDoc = () => {
    const blob = new Blob([reportHtml()], { type:'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report-${o.id}.doc`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast('Файл DOC сформирован и загружается');
  };
  const openPdfPrint = () => {
    const win = window.open('', '_blank');
    if (!win) {
      toast('Разрешите всплывающие окна для печати PDF');
      return;
    }
    win.document.write(reportHtml());
    win.document.close();
    win.focus();
    win.print();
  };
  const downloadDefault = () => {
    if ((settings.reportFormat || 'doc') === 'pdf') openPdfPrint();
    else downloadDoc();
  };
  const sendToReview = () => {
    setReviewSent(true);
    toast(settings.notifyClient ? 'Отчет отправлен на проверку, клиент будет уведомлен' : 'Отчет отправлен на проверку');
  };

  return (
    <div>
      <PageHead title="Отчет об оценке" subtitle={`Заявка ${o.id} · отчет №${o.id}`} />

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
                <div style={{ height: 18, width: '70%', background: 'var(--emerald-100)', borderRadius: 3, marginTop: 'auto' }} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-strong)' }}>Отчет №{o.id} · {o.title}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: 'var(--text-sm)' }}>{o.address}</p>

              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                <Badge tone={(settings.reportFormat || 'doc') === 'doc' ? 'brand' : 'neutral'}>DOC</Badge>
                <Badge tone={(settings.reportFormat || 'doc') === 'pdf' ? 'brand' : 'info'}>PDF</Badge>
                <Badge tone={reviewSent ? 'warning' : 'success'} pill dot={!reviewSent}>{reviewSent ? 'На проверке' : 'Готов к формированию'}</Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', marginTop: 20 }}>
                <DetailField label="Вид стоимости" value={o.valueType} />
                <DetailField label="Итоговая стоимость" value={`${fmt(finalValue)} ₽`} />
                <DetailField label="Дата оценки" value={o.date} />
                <DetailField label="Номер заявки" value={o.id} mono />
                <DetailField label="Объем отчета" value={`≈ ${toNum(report.pageCount) + (settings.includePhotos === false ? 0 : Math.ceil(toNum(o.photos) / 3))} страниц`} />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                <Button variant="primary" iconLeft={<Icon n="download" size={16} />} onClick={downloadDefault}>Скачать по умолчанию</Button>
                <Button variant="primary" iconLeft={<Icon n="file-text" size={16} />} onClick={downloadDoc}>Скачать DOC</Button>
                <Button variant="secondary" iconLeft={<Icon n="file-down" size={16} />} onClick={openPdfPrint}>Скачать PDF</Button>
                <Button variant="ghost" iconLeft={<Icon n="send" size={16} />} onClick={sendToReview}>Отправить на проверку</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Composition checklist */}
        <Card title="Состав отчета">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ProgressBar label="Готовность документа" value={reportReady} />
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
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:20, alignItems:'start' }}>
        <Card title="Таблица 6 · Расчет доходным методом">
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  {['Аналог', 'Ставка', 'Корр.', 'Вес', 'Скорр. ставка'].map((h) => <th key={h} style={{ ...cell, color:'var(--text-muted)', textAlign:h==='Аналог'?'left':'right', fontWeight:700 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rentRows.map((row) => {
                  const correction = toNum(row.adjLoc) + toNum(row.adjCond);
                  const adjusted = Math.round(toNum(row.rentPerM2) * (1 + correction / 100));
                  return (
                    <tr key={row.id}>
                      <td style={cell}>{row.addr}</td>
                      <td style={{ ...cell, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{fmt(toNum(row.rentPerM2))}</td>
                      <td style={{ ...cell, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{correction}%</td>
                      <td style={{ ...cell, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{toNum(row.weight).toFixed(3)}</td>
                      <td style={{ ...cell, textAlign:'right', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{fmt(adjusted)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:12, padding:'10px 12px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)', color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.5 }}>
            R = Σ(Ri × Ki × Wi) / ΣWi. PGI = S × R × 12; EGI = PGI × (1 - недозагрузка); NOI = EGI × (1 - операционные расходы). Источники: открытые объявления и справочники корректировок оценщика недвижимости.
          </div>
        </Card>
        <Card title="Таблица 8 · Финальный расчет">
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  {['Подход', 'Стоимость', 'Вес', 'Вклад'].map((h) => <th key={h} style={{ ...cell, color:'var(--text-muted)', textAlign:h==='Подход'?'left':'right', fontWeight:700 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {finalRows.map((row) => (
                  <tr key={row.name}>
                    <td style={cell}>{row.name}</td>
                    <td style={{ ...cell, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{fmt(toNum(row.value))} ₽</td>
                    <td style={{ ...cell, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{toNum(row.weight).toFixed(2)}%</td>
                    <td style={{ ...cell, textAlign:'right', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{fmt(toNum(row.value) * toNum(row.weight) / 100)} ₽</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...cell, fontWeight:800, color:'var(--text-strong)' }}>Итого</td>
                  <td colSpan="3" style={{ ...cell, textAlign:'right', fontWeight:800, color:'var(--text-value)', fontVariantNumeric:'tabular-nums' }}>{fmt(finalValue)} ₽</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
