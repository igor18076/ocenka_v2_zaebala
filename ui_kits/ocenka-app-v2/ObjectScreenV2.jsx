/* Object card — details, documents, photos. window.ObjectScreen */
window.ObjectScreenV2 = function ObjectScreenV2({ request, onBack, onNavigate, toast }) {
  const { Card, Button, Badge, StatusBadge, Tabs } = NS;
  const D = window.OcenkaData;
  const baseObject = D.object;
  const objectStorageKey = (id) => `ocenka.object.${id || baseObject.id || 'default'}.v1`;
  const makeObject = (source) => source ? {
    ...baseObject,
    id: source.id,
    title: source.object || baseObject.title,
    address: source.address || baseObject.address,
    client: source.client || baseObject.client,
    valueType: source.type ? `${source.type} стоимость` : baseObject.valueType,
    date: source.date || baseObject.date,
    status: source.status || 'calc',
  } : { ...baseObject, status: 'calc' };
  const loadObject = (source) => {
    const next = makeObject(source);
    const saved = window.readLocalJson ? window.readLocalJson(objectStorageKey(next.id), null) : null;
    return saved && saved.id === next.id ? { ...next, ...saved } : next;
  };
  const [o, setObject] = React.useState(() => loadObject(request));
  const [draftObject, setDraftObject] = React.useState(() => loadObject(request));
  const [editMode, setEditMode] = React.useState(false);
  const [tab, setTab] = React.useState('params');
  const [docs, setDocs] = React.useState(o.docs || []);
  const fileRef = React.useRef(null);
  const photoRef = React.useRef(null);
  const addPhotos = (fileList) => {
    Array.from(fileList || []).slice(0, 8).forEach((file) => {
      if (!file.type || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => setObject((prev) => {
        const next = [...(prev.photoUrls || []), String(reader.result)].slice(0, 12);
        return { ...prev, photoUrls: next, photos: next.length };
      });
      reader.readAsDataURL(file);
    });
  };
  const removePhoto = (index) => setObject((prev) => {
    const next = (prev.photoUrls || []).filter((_, i) => i !== index);
    return { ...prev, photoUrls: next, photos: next.length };
  });
  const readSavedCalculation = (id) => {
    return window.readLocalJson ? window.readLocalJson(`ocenka.calculation.${id || 'draft'}.v1`, {}) || {} : {};
  };

  const fileIcon = (kind) => kind === 'doc' ? 'file-text' : 'file';
  const toNum = (value, fallback = 0) => {
    const parsed = Number(String(value ?? '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const fieldStyle = { width:'100%', boxSizing:'border-box', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', padding:'8px 10px', font:'inherit', color:'var(--text-strong)', background:'var(--surface-card)', outline:'none' };
  const editField = (label, key, mono) => (
    <div>
      <label style={{ display:'block', marginBottom:6, fontSize:'var(--text-xs)', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.04em' }}>{label}</label>
      <input value={draftObject[key] || ''} onChange={(event) => setDraftObject((prev) => ({ ...prev, [key]: event.target.value }))} style={{ ...fieldStyle, fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)' }} />
    </div>
  );
  const saveObject = () => {
    setObject({ ...draftObject, docs });
    setEditMode(false);
    if (toast) toast('Карточка объекта обновлена');
  };
  const downloadDoc = (doc) => {
    if (doc.dataUrl) {
      try {
        const link = document.createElement('a');
        link.href = doc.dataUrl;
        link.download = doc.name || 'document';
        document.body.appendChild(link);
        link.click();
        link.remove();
        if (toast) toast('Документ скачивается');
        return;
      } catch {}
    }
    // Seed documents (and files too large to store) have no content — export a stub.
    const blob = new Blob([`Документ: ${doc.name}\nЗаявка: ${o.id}\nОбъект: ${o.title}\n`], { type:'text/plain;charset=utf-8' });
    window.downloadBlob(blob, doc.name.replace(/\.(pdf|docx?)$/i, '') + '.txt');
    if (toast) toast('Документ скачивается');
  };

  React.useEffect(() => {
    const next = loadObject(request);
    setObject(next);
    setDraftObject(next);
    setDocs(next.docs || []);
    setEditMode(false);
  }, [request?.id]);
  React.useEffect(() => {
    if (!o?.id) return;
    if (window.writeLocalJson) window.writeLocalJson(objectStorageKey(o.id), { ...o, docs });
  }, [o, docs]);
  const savedCalculation = readSavedCalculation(o.id);
  const summaryValue = toNum(savedCalculation.final) > 0
    ? Math.round(toNum(savedCalculation.final)).toLocaleString('ru')
    : D.result.value;
  const requiredFields = [o.title, o.address, o.type, o.area, o.floors, o.year, o.cadastral, o.purpose, o.valueType, o.date, o.client];
  const completedFields = requiredFields.filter((value) => String(value || '').trim()).length;
  const readiness = Math.min(100, Math.round((completedFields / requiredFields.length) * 70) + Math.min(20, docs.length * 5) + (toNum(o.photos) > 0 ? 10 : 0));
  const summaryMetric = (label, value, icon, tone) => (
    <div style={{ padding:'10px 12px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', gap:10 }}>
      <span style={{ width:30, height:30, borderRadius:'var(--radius-sm)', background:tone || 'var(--blue-50)', color:'var(--blue-700)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Icon n={icon} size={15} />
      </span>
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.04em' }}>{label}</div>
        <div style={{ marginTop:2, fontSize:'var(--text-sm)', color:'var(--text-strong)', fontWeight:700, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{value}</div>
      </div>
    </div>
  );

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
          <span key="e-wrap" data-tour-id="object-edit"><Button key="e" variant={editMode ? 'primary' : 'secondary'} iconLeft={<Icon n={editMode ? 'save' : 'pencil'} size={16} />} onClick={() => {
            setTab('params');
            if (editMode) saveObject();
            else {
              setDraftObject(o);
              setEditMode(true);
            }
          }}>{editMode ? 'Сохранить объект' : 'Редактировать'}</Button></span>,
          <Button key="c" variant="primary" iconLeft={<Icon n="calculator" size={16} />} onClick={() => onNavigate('calc')}>Перейти к расчету</Button>,
        ]} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <StatusBadge status={o.status || 'calc'} />
        <Badge tone="brand">{o.valueType}</Badge>
        <Badge tone="outline">{o.purpose}</Badge>
      </div>

      <div className="ock-grid ock-grid--wide-side ock-grid--top">
        <div>
          <Card noBodyPad>
            <div data-tour-id="object-tabs" style={{ padding: '6px 16px 0' }}>
              <Tabs value={tab} onChange={setTab} items={[
                { value: 'params', label: 'Параметры' },
                { value: 'docs', label: 'Документы', count: docs.length },
                { value: 'photos', label: 'Фотографии', count: o.photos },
              ]} />
            </div>
            <div style={{ padding: 24 }}>
              {tab === 'params' ? (
                editMode ? (
                  <div>
                    <div className="ock-grid ock-grid--three" style={{ gap:'18px 20px' }}>
                      {editField('Наименование объекта', 'title')}
                      {editField('Тип объекта', 'type')}
                      {editField('Площадь', 'area')}
                      {editField('Этажность', 'floors')}
                      {editField('Год постройки', 'year')}
                      {editField('Кадастровый №', 'cadastral', true)}
                      {editField('Дата оценки', 'date')}
                      {editField('Цель оценки', 'purpose')}
                      {editField('Вид стоимости', 'valueType')}
                    </div>
                    <div className="ock-grid ock-grid--main-side" style={{ marginTop:18 }}>
                      {editField('Адрес', 'address')}
                      {editField('Заказчик', 'client')}
                    </div>
                    <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end', gap:10 }}>
                      <Button variant="secondary" onClick={() => { setDraftObject(o); setEditMode(false); }}>Отмена</Button>
                      <Button variant="primary" iconLeft={<Icon n="save" size={16} />} onClick={saveObject}>Сохранить</Button>
                    </div>
                  </div>
                ) : (
                  <div className="ock-grid ock-grid--three" style={{ gap:'22px 24px' }}>
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
                )
              ) : null}

              {tab === 'docs' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ padding:'10px 12px', borderRadius:'var(--radius-md)', background:'var(--surface-inset)', color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.45 }}>
                    Seed-документы скачиваются как текстовая заглушка. Загруженные файлы (до 3 МБ) сохраняются в браузере и скачиваются в исходном виде.
                  </div>
                  {docs.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)' }}>
                      <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: d.kind === 'pdf' ? 'var(--red-50)' : 'var(--blue-50)', color: d.kind === 'pdf' ? 'var(--red-600)' : 'var(--blue-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon n={fileIcon(d.kind)} size={17} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: 'var(--text-sm)' }}>{d.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{d.size}{d.dataUrl ? ' · файл сохранён' : ' · заглушка'}</div>
                      </div>
                      <button type="button" onClick={() => downloadDoc(d)} aria-label="Скачать документ" style={{ border:'none', background:'transparent', color:'var(--text-muted)', cursor:'pointer', padding:6, display:'inline-flex' }}><Icon n="download" size={17} /></button>
                      <button type="button" onClick={() => setDocs((items) => items.filter((_, index) => index !== i))} aria-label="Удалить документ" style={{ border:'none', background:'transparent', color:'var(--danger-text)', cursor:'pointer', padding:6, display:'inline-flex' }}><Icon n="trash-2" size={16} /></button>
                    </div>
                  ))}
                  <input
                    ref={fileRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const meta = {
                        name: file.name,
                        size: `${Math.max(1, Math.round(file.size / 1024))} КБ`,
                        kind: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'doc',
                      };
                      const addDoc = (dataUrl) => {
                        setDocs((items) => [...items, dataUrl ? { ...meta, dataUrl } : meta]);
                        if (toast) toast(dataUrl ? 'Документ добавлен' : 'Документ добавлен (без содержимого: файл больше 3 МБ)');
                      };
                      // Persist the file content (as a data URL) so it stays downloadable
                      // after navigating away; cap the size to keep localStorage healthy.
                      if (file.size <= 3 * 1024 * 1024) {
                        const reader = new FileReader();
                        reader.onload = () => addDoc(String(reader.result));
                        reader.onerror = () => addDoc(null);
                        reader.readAsDataURL(file);
                      } else {
                        addDoc(null);
                      }
                      event.target.value = '';
                    }}
                  />
                  <button onClick={() => fileRef.current && fileRef.current.click()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    <Icon n="upload" size={16} /> Загрузить документ
                  </button>
                </div>
              ) : null}

              {tab === 'photos' ? (
                <div>
                  <div className="ock-grid ock-grid--three" style={{ gap:12 }}>
                    {(o.photoUrls && o.photoUrls.length)
                      ? o.photoUrls.map((src, i) => (
                          <div key={i} style={{ position:'relative' }}>
                            <a href={src} target="_blank" rel="noopener noreferrer">
                              <img src={src} alt={`Фото ${i + 1}`} style={{ width:'100%', aspectRatio:'4 / 3', objectFit:'cover', borderRadius:'var(--radius-md)', border:'1px solid var(--border-subtle)', display:'block' }} />
                            </a>
                            <button type="button" aria-label="Удалить фото" onClick={() => removePhoto(i)} style={{ position:'absolute', top:6, right:6, width:24, height:24, borderRadius:'50%', border:'none', background:'rgba(0,0,0,.55)', color:'#fff', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                              <Icon n="x" size={13} />
                            </button>
                          </div>
                        ))
                      : Array.from({ length: o.photos || 0 }).map((_, i) => (
                          <div key={i} style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-subtle)', border: '1px solid var(--border-subtle)' }}>
                            <Icon n="image" size={22} />
                          </div>
                        ))}
                  </div>
                  <input ref={photoRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={(event) => { addPhotos(event.target.files); event.target.value = ''; }} />
                  <button type="button" onClick={() => photoRef.current && photoRef.current.click()} style={{ marginTop:12, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px', width:'100%', border:'1.5px dashed var(--border-default)', borderRadius:'var(--radius-md)', background:'transparent', color:'var(--text-muted)', cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:600 }}>
                    <Icon n="upload" size={16} /> Загрузить фотографии
                  </button>
                </div>
              ) : null}
            </div>
          </Card>
        </div>

        {/* Side summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card title="Сводка">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                <DetailField label="Заявка" value={o.id} mono />
                <StatusBadge status={o.status || 'calc'} />
              </div>
              <DetailField label="Заказчик" value={o.client} />
              <DetailField label="Адрес" value={o.address} />
              <div style={{ height: 1, background: 'var(--divider)' }} />
              <div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--text-muted)' }}>Предв. рыночная стоимость</span>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-value)', fontVariantNumeric: 'tabular-nums', marginTop: 6, letterSpacing: 0 }}>{summaryValue} ₽</div>
                <div style={{ marginTop:4, fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>{savedCalculation.final ? 'из сохраненного расчета' : `диапазон ${D.result.low}–${D.result.high} ₽`}</div>
              </div>
              <div className="ock-grid ock-grid--two" style={{ gap:10 }}>
                {summaryMetric('Тип', o.type, 'home')}
                {summaryMetric('Площадь', o.area, 'ruler')}
                {summaryMetric('Документы', String(docs.length), 'files')}
                {summaryMetric('Фото', String(o.photos || 0), 'images')}
              </div>
              <div style={{ padding:'12px 14px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)' }}>
                <div style={{ fontSize:'var(--text-xs)', fontWeight:700, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.04em', marginBottom:6 }}>Цель оценки</div>
                <div style={{ color:'var(--text-strong)', fontSize:'var(--text-sm)', lineHeight:1.45 }}>{o.purpose}</div>
              </div>
            </div>
          </Card>
          <Card title="Готовность к отчету">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <NS.ProgressBar label="Комплектность объекта" value={readiness} />
              <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', lineHeight:1.45 }}>
                Заполнено {completedFields} из {requiredFields.length} ключевых полей, документов: {docs.length}, фотографий: {o.photos || 0}.
              </div>
              <Button variant="accent" block iconLeft={<Icon n="file-check" size={16} />} onClick={() => onNavigate('reports')}>Сформировать отчет</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
