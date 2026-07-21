/* Report generation. window.ReportScreen */
window.ReportScreenV2 = function ReportScreenV2({ request, toast, onNavigate }) {
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
    return window.readLocalJson ? window.readLocalJson(`ocenka.object.${initialObject.id}.v1`, {}) || {} : {};
  })();
  const o = { ...initialObject, ...savedObject };
  const settings = (() => {
    return window.readLocalJson ? window.readLocalJson('ocenka.settings.v1', {}) || {} : {};
  })();
  const reportSections = (D.reportSections || []).map((section) => ({
    ...section,
    done: window.OcenkaFso ? window.OcenkaFso.reportSectionDone(o.id, section.label) : !!section.done,
  }));
  const report = D.report || {};
  const reviewStorageKey = `ocenka.report.review.${o.id}.v1`;
  const [reviewSent, setReviewSent] = React.useState(() => {
    try { return window.localStorage.getItem(reviewStorageKey) === '1'; } catch { return false; }
  });
  const [loadedReviewId, setLoadedReviewId] = React.useState(o.id);
  const calc = D.calculation || {};
  const V = window.OcenkaValuation;
  const toNum = window.toNum;
  const fmt = (n) => Math.round(toNum(n)).toLocaleString('ru-RU');
  const loadSavedCalculation = (id) => {
    return window.readLocalJson ? window.readLocalJson(`ocenka.calculation.${id || 'draft'}.v1`, {}) || {} : {};
  };
  const savedCalc = loadSavedCalculation(o.id);
  const weights = savedCalc.weights || calc.weights || { comp:60, income:10, cost:30 };
  const applied = savedCalc.applied || calc.applied || { comp:true, income:true, cost:true };
  const rows = savedCalc.rows || calc.comparableRows || [];
  const subjectArea = toNum(o.area ?? savedCalc.subjectArea ?? calc.subjectArea ?? D.object?.area, 214.6) || 214.6;
  const income = savedCalc.inc || { ...(calc.income || {}), area: subjectArea };
  const rentRows = Array.isArray(savedCalc.rentRows) && savedCalc.rentRows.length ? savedCalc.rentRows : (income.rentAnalogs || calc.income?.rentAnalogs || []);
  const cst = savedCalc.cst || { ...(calc.cost || {}), m: subjectArea };
  /* Prefer the rent the appraiser stored on the calc screen; fall back to the analog-derived rate. */
  const rentRate = rentRows.length ? V.rentAnalogRate(rentRows) : toNum(income.rent);
  const incomeRent = toNum(income.rent) > 0 ? toNum(income.rent) : rentRate;
  const compValue = V.comparative(rows, subjectArea);
  const incomeValue = V.income({ area: income.area ?? subjectArea, rent: incomeRent, vacancy: income.vacancy, opex: income.opex, cap: income.cap }).value;
  const costValue = V.cost(cst);
  const finalRows = [
    { key:'comp', name:'Сравнительный подход', value:compValue, weight:weights.comp ?? 60 },
    { key:'income', name:'Доходный подход', value:incomeValue, weight:weights.income ?? 10 },
    { key:'cost', name:'Затратный подход', value:costValue, weight:weights.cost ?? 30 },
  ].filter((row) => applied[row.key] !== false);
  const finalValue = savedCalc.final || V.reconcile({ comp: compValue, income: incomeValue, cost: costValue }, weights, applied);
  const liveSections = reportSections.map((section) => {
    if (section.label === 'Итоговое заключение' && reviewSent) return { ...section, done: true };
    return section;
  });
  const doneSections = liveSections.filter((section) => section.done).length;
  const reportReady = Math.round((doneSections / (liveSections.length || 1)) * 100);
  const ensureFsoReady = (mode = 'warn') => {
    if (settings.fsoAutocheck === false) return true;
    const open = window.OcenkaFso ? window.OcenkaFso.openCount(o.id) : 0;
    if (open <= 0) return true;
    if (mode === 'block') {
      if (toast) toast(`Сначала закройте пункты ФСО (${open} открыто)`);
      if (onNavigate) onNavigate('fso');
      else if (window.ocenkaGoTo) window.ocenkaGoTo('fso');
      return false;
    }
    if (toast) toast(`Внимание: открыто пунктов ФСО — ${open}. Отчёт всё равно скачивается.`);
    return true;
  };
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
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
  const reportId = escapeHtml(o.id);
  const reportTitle = escapeHtml(o.title);
  const reportAddress = escapeHtml(o.address);
  const reportClient = escapeHtml(o.client);
  const reportEvaluator = escapeHtml(settings.name || window.OcenkaData.user?.name || 'Игорь Дорощенко');
  const photoUrls = Array.isArray(o.photoUrls)
    ? o.photoUrls.filter((src) => {
      const value = String(src || '');
      if (!value) return false;
      /* Keep report downloads light: skip oversized in-browser data URLs. */
      if (value.startsWith('data:') && value.length > 350000) return false;
      return true;
    }).slice(0, 6)
    : [];
  const photosHtml = settings.includePhotos === false
    ? ''
    : photoUrls.length
      ? `<h2>Фотографии объекта</h2><div class="photos">${photoUrls.map((src, index) => `<img class="photo" src="${String(src).replace(/"/g, '&quot;')}" alt="Фото ${index + 1}" style="width:100%;height:88px;object-fit:cover;border:1px solid #ccc;background:#f3f4f6">`).join('')}</div>`
      : `<h2>Фотографии объекта</h2><div class="photos">${Array.from({ length: Math.min(toNum(o.photos), 6) }).map((_, index) => `<div class="photo">Фото ${index + 1}</div>`).join('')}</div>`;
  const reportHtml = () => `<!doctype html><html><head><meta charset="utf-8"><title>Отчет ${reportId}</title><style>body{font-family:Arial,sans-serif;line-height:1.45;color:#111}table{border-collapse:collapse;width:100%;margin:16px 0}td,th{border:1px solid #ccc;padding:8px;text-align:left}th{background:#f3f4f6}.num{text-align:right}.photos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.photo{height:88px;border:1px solid #ccc;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#555}</style></head><body><h1>Отчет об оценке №${reportId}</h1><p><b>Объект:</b> ${reportTitle}</p><p><b>Адрес:</b> ${reportAddress}</p><p><b>Заказчик:</b> ${reportClient}</p><p><b>Оценщик:</b> ${reportEvaluator}</p><p><b>Итоговая стоимость:</b> ${fmt(finalValue)} ₽</p>${photosHtml}<h2>Таблица 6. Расчет доходным методом</h2><table><tr><th>Аналог</th><th>Ставка</th><th>Корр.</th><th>Вес</th><th>Скорр. ставка</th></tr>${rentRows.map((row) => { const correction = toNum(row.adjLoc) + toNum(row.adjCond); const adjusted = Math.round(toNum(row.rentPerM2) * (1 + correction / 100)); return `<tr><td>${escapeHtml(row.addr)}</td><td class="num">${fmt(toNum(row.rentPerM2))}</td><td class="num">${correction}%</td><td class="num">${toNum(row.weight).toFixed(3)}</td><td class="num">${fmt(adjusted)}</td></tr>`; }).join('')}</table><h2>Таблица 8. Финальный расчет</h2><table><tr><th>Подход</th><th>Стоимость</th><th>Вес</th><th>Вклад</th></tr>${finalRows.map((row) => `<tr><td>${escapeHtml(row.name)}</td><td class="num">${fmt(toNum(row.value))} ₽</td><td class="num">${toNum(row.weight).toFixed(2)}%</td><td class="num">${fmt(toNum(row.value) * toNum(row.weight) / 100)} ₽</td></tr>`).join('')}<tr><th>Итого</th><th colspan="3" class="num">${fmt(finalValue)} ₽</th></tr></table></body></html>`;
  const downloadDoc = () => {
    ensureFsoReady('warn');
    try {
      const html = reportHtml();
      const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
      window.downloadBlob(blob, `report-${o.id}.doc`);
      if (toast) toast('Файл DOC сформирован и загружается');
    } catch (error) {
      if (toast) toast(`Не удалось скачать отчёт: ${error?.message || 'ошибка'}`);
    }
  };
  const openPdfPrint = () => {
    ensureFsoReady('warn');
    try {
      const win = window.open('', '_blank');
      if (!win) {
        if (toast) toast('Разрешите всплывающие окна для печати PDF');
        return;
      }
      win.opener = null;
      win.document.write(reportHtml());
      win.document.close();
      win.focus();
      win.print();
    } catch (error) {
      if (toast) toast(`Не удалось открыть PDF: ${error?.message || 'ошибка'}`);
    }
  };
  const downloadDefault = () => {
    if ((settings.reportFormat || 'doc') === 'pdf') openPdfPrint();
    else downloadDoc();
  };
  const sendToReview = () => {
    if (!ensureFsoReady('block')) return;
    setReviewSent(true);
    try {
      window.localStorage.setItem(`ocenka.report.review.${o.id}.v1`, '1');
    } catch {}
    const kanbanKey = 'ocenka.requests.kanban.v2';
    const current = window.readLocalJson ? window.readLocalJson(kanbanKey, null) : null;
    const base = Array.isArray(current) ? current : (window.OcenkaData.requests || []);
    let found = false;
    const next = base.map((item) => {
      if (item.id !== o.id) return item;
      found = true;
      return { ...item, status: 'review' };
    });
    if (!found) {
      next.unshift({
        id: o.id,
        object: o.title || 'Объект',
        address: o.address || '',
        client: o.client || '',
        type: (o.valueType || 'Рыночная').replace(/\s*стоимость$/i, '') || 'Рыночная',
        status: 'review',
        date: o.date || new Date().toLocaleDateString('ru-RU'),
        owner: settings.name || window.OcenkaData.user?.name || '—',
      });
    }
    if (window.writeLocalJson) window.writeLocalJson(kanbanKey, next);
    window.dispatchEvent(new CustomEvent('ocenka:requests-updated', { detail: { id: o.id, status: 'review' } }));
    toast('Отчет на проверке · заявка переведена в колонку «Проверка»');
  };

  return (
    <div>
      <PageHead title="Отчет об оценке" subtitle={`Заявка ${o.id} · отчет №${o.id}`} />

      <div className="ock-grid ock-grid--report ock-grid--top">
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

              <div className="ock-grid ock-grid--two" style={{ gap:'14px 20px', marginTop:20 }}>
                <DetailField label="Вид стоимости" value={o.valueType} />
                <DetailField label="Итоговая стоимость" value={`${fmt(finalValue)} ₽`} />
                <DetailField label="Дата оценки" value={o.date} />
                <DetailField label="Номер заявки" value={o.id} mono />
                <DetailField label="Объем отчета" value={`≈ ${toNum(report.pageCount) + (settings.includePhotos === false ? 0 : Math.ceil(toNum(o.photos) / 3))} страниц`} />
              </div>

              <div data-tour-id="report-actions" style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
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
              {liveSections.map(({ label, done: ok }, i) => (
                <div key={label || i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)' }}>
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
      <div className="ock-grid ock-grid--two ock-grid--top" style={{ marginTop:20 }}>
        <Card title="Таблица 6 · Расчет доходным методом">
          <div className="ock-table-scroll">
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
          <div className="ock-table-scroll">
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
