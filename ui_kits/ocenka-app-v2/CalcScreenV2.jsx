/* Calculation screen — three sub-tabs + live right sidebar. window.CalcScreen */
window.CalcScreenV2 = function CalcScreenV2({ request, onNavigate, toast }) {
  const { Button, Badge } = NS;
  const D = window.OcenkaData;
  const calc = D.calculation || {};
  const requestId = request?.id || D.object?.id;
  const requestTitle = request?.object || D.object?.title || 'Объект оценки';
  const calcStorageKey = (id) => `ocenka.calculation.${id || 'draft'}.v1`;
  const loadSavedCalculation = (id) => {
    return window.readLocalJson ? window.readLocalJson(calcStorageKey(id), {}) || {} : {};
  };
  const loadSavedObject = (id) => {
    return window.readLocalJson ? window.readLocalJson(`ocenka.object.${id || 'draft'}.v1`, {}) || {} : {};
  };
  const savedCalc = loadSavedCalculation(requestId);
  const savedObject = loadSavedObject(requestId);
  const [loadedCalcId, setLoadedCalcId] = React.useState(requestId);
  const V = window.OcenkaValuation;
  const toNum = window.toNum;

  const [tab, setTab]       = React.useState('comp');
  const [weights, setWt]    = React.useState(savedCalc.weights || calc.weights || { comp:60, income:10, cost:30 });
  const [applied, setApp]   = React.useState(savedCalc.applied || calc.applied || { comp:true, income:true, cost:true });
  const [weightDraft, setWeightDraft] = React.useState({});
  const APPROACH_KEYS = ['comp', 'income', 'cost'];
  const roundWeight = (value) => Math.round(Math.max(0, Math.min(100, Number(value) || 0)) * 100) / 100;

  const distributeWeights = (remaining, keys, baseWeights) => {
    if (!keys.length) return {};
    const total = keys.reduce((sum, key) => sum + Math.max(0, baseWeights[key] || 0), 0);
    const values = {};
    keys.forEach((key) => {
      const share = total > 0 ? remaining * Math.max(0, baseWeights[key] || 0) / total : remaining / keys.length;
      values[key] = roundWeight(share);
    });
    const drift = roundWeight(remaining - keys.reduce((sum, key) => sum + values[key], 0));
    values[keys[keys.length - 1]] = roundWeight((values[keys[keys.length - 1]] || 0) + drift);
    return values;
  };

  const setWeightLinked = (key, nextValue, nextApplied = applied) => {
    const activeKeys = APPROACH_KEYS.filter((k) => nextApplied[k]);
    if (activeKeys.length <= 1) {
      setWt((current) => ({ ...current, [key]: 100 }));
      return;
    }

    const value = roundWeight(nextValue);
    const otherKeys = activeKeys.filter((k) => k !== key);
    const distributed = distributeWeights(100 - value, otherKeys, weights);
    setWt((current) => ({
      ...current,
      [key]: value,
      ...distributed,
      ...APPROACH_KEYS
        .filter((k) => !nextApplied[k])
        .reduce((acc, k) => ({ ...acc, [k]: current[k] || 0 }), {}),
    }));
  };
  const commitWeightDraft = (key) => {
    const raw = weightDraft[key];
    if (raw == null) return;
    setWeightDraft((draft) => {
      const next = { ...draft };
      delete next[key];
      return next;
    });
    setWeightLinked(key, toNum(raw, weights[key]));
  };

  const setAppliedLinked = (key, checked) => {
    const nextApplied = { ...applied, [key]: checked };
    const activeKeys = APPROACH_KEYS.filter((k) => nextApplied[k]);
    if (!activeKeys.length) return;

    setApp(nextApplied);
    if (checked) {
      const target = weights[key] > 0 ? weights[key] : roundWeight(100 / activeKeys.length);
      setWeightLinked(key, target, nextApplied);
      return;
    }

    const distributed = distributeWeights(100, activeKeys, weights);
    setWt((current) => ({ ...current, ...distributed }));
  };

  /* ── Сравнительный ─────────────────────────────────── */
  const subjectArea = toNum(savedObject.area ?? savedCalc.subjectArea ?? calc.subjectArea ?? D.object?.area, 214.6) || 214.6;
  const [rows, setRows] = React.useState(savedCalc.rows || calc.comparableRows || []);
  const updRow = (id, f, v) => setRows(rs => rs.map(r => r.id === id ? { ...r, [f]: v } : r));

  /* ── Доходный ───────────────────────────────────────── */
  const incomeDefaults = { area:subjectArea, rent:800, vacancy:12, opex:35, cap:9 };
  const seedIncome = calc.income || {};
  const buildIncome = (saved) => saved?.inc || { ...incomeDefaults, ...seedIncome, area: subjectArea };
  const [inc, setInc] = React.useState(buildIncome(savedCalc));
  const buildRentRows = (saved) => Array.isArray(saved?.rentRows) && saved.rentRows.length ? saved.rentRows : (calc.income?.rentAnalogs || []);
  const [rentRows, setRentRows] = React.useState(buildRentRows(savedCalc));
  const updRentRow = (id, f, v) => setRentRows(rs => rs.map(r => r.id === id ? { ...r, [f]: v } : r));
  const rentSources = calc.income?.sources || [];
  const rentAnalogRate = () => V.rentAnalogRate(rentRows);

  /* ── Затратный ──────────────────────────────────────── */
  const defaultCost = { n:95000, m:subjectArea, kPer:1, kReg:1, kZon:1, kSeis:1, kF:1, zd:0, kInd:1, vat:20, rateCode:'01-02-001-01' };
  const seedCost = calc.cost || {};
  const cleanCostParams = (params = {}) => {
    const rest = { ...(params || {}) };
    delete rest.ncsTables;
    return rest;
  };
  const [cst, setCst] = React.useState({
    ...defaultCost,
    ...seedCost,
    ...cleanCostParams(savedCalc.cst),
    n: savedCalc.cst?.n ?? seedCost.n ?? seedCost.replaceM2 ?? defaultCost.n,
    m: savedCalc.cst?.m ?? subjectArea,
  });
  const ncsTables = cst.ncsTables || [];
  const [ncsTableIdx, setNcsTableIdx] = React.useState(savedCalc.ncsTableIdx || 0);
  const parseNcsNumber = (raw) => {
    const normalized = String(raw ?? '')
      .replace(/\s+/g, '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, '');
    return parseFloat(normalized);
  };
  const applyNcsRow = (table, row) => {
    if (!table?.targetField || !row?.length) return;
    const valueColumn = table.valueColumn ?? row.length - 1;
    const raw = row[valueColumn];
    const value = parseNcsNumber(raw);
    if (!Number.isFinite(value)) return;
    const next = {
      [table.targetField]: value * (table.valueMultiplier || 1),
    };
    if (Number.isInteger(table.rateCodeColumn)) {
      next.rateCode = row[table.rateCodeColumn];
    }
    if (Number.isInteger(table.powerColumn)) {
      const power = parseNcsNumber(row[table.powerColumn]);
      if (Number.isFinite(power)) next.m = power;
    }
    setCst((prev) => ({ ...prev, ...next }));
  };
  const ncsTargetLabel = { n:'N', kPer:'Kper', kZon:'Kzon', kReg:'Kreg', kSeis:'Kseis', kF:'Kf' };
  React.useEffect(() => {
    const saved = loadSavedCalculation(requestId);
    setWt(saved.weights || calc.weights || { comp:60, income:10, cost:30 });
    setApp(saved.applied || calc.applied || { comp:true, income:true, cost:true });
    setRows(saved.rows || calc.comparableRows || []);
    const objectArea = toNum(loadSavedObject(requestId).area ?? D.object?.area, 214.6) || 214.6;
    setInc(saved.inc || { ...incomeDefaults, ...seedIncome, area: objectArea });
    setRentRows(buildRentRows(saved));
    setCst({
      ...defaultCost,
      ...seedCost,
      ...cleanCostParams(saved.cst),
      n: saved.cst?.n ?? seedCost.n ?? seedCost.replaceM2 ?? defaultCost.n,
      m: saved.cst?.m ?? objectArea,
    });
    setNcsTableIdx(saved.ncsTableIdx || 0);
    setLoadedCalcId(requestId);
  }, [requestId]);
  /* ── Расчёты ─────────────────────────────────────────── */
  const fmt = n => Math.round(n).toLocaleString('ru');

  const vComp = V.comparative(rows, subjectArea);
  const vInc = V.income(inc).value;
  const vCst = V.cost(cst);
  const wSum = roundWeight((applied.comp ? weights.comp : 0) + (applied.income ? weights.income : 0) + (applied.cost ? weights.cost : 0));
  const final = V.reconcile({ comp: vComp, income: vInc, cost: vCst }, weights, applied);
  React.useEffect(() => {
    if (loadedCalcId !== requestId) return;
    try {
      if (window.writeLocalJson) window.writeLocalJson(calcStorageKey(requestId), { weights, applied, rows, inc, rentRows, cst: cleanCostParams(cst), ncsTableIdx, final });
    } catch {}
  }, [requestId, loadedCalcId, weights, applied, rows, inc, rentRows, cst, ncsTableIdx, final]);
  React.useEffect(() => {
    const openCalcTab = (event) => {
      const nextTab = event.detail;
      if (['comp', 'income', 'cost'].includes(nextTab)) setTab(nextTab);
    };
    window.addEventListener('ocenka:calc-tab', openCalcTab);
    return () => window.removeEventListener('ocenka:calc-tab', openCalcTab);
  }, []);
  const exportCalculation = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      subjectArea,
      weights,
      applied,
      comparative: { value: vComp, rows },
      income: { value: vInc, params: inc, rentAnalogs: rentRows },
      cost: { value: vCst, params: cleanCostParams(cst) },
      final,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    window.downloadBlob(blob, `ocenka-calculation-${requestId || 'draft'}.json`);
    if (toast) toast('JSON расчета выгружен');
  };

  /* ── Shared styles ───────────────────────────────────── */
  const inp = { width:'100%', padding:'7px 10px', border:'1px solid var(--border-default)', borderRadius:'var(--radius-sm)', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', color:'var(--text-strong)', background:'var(--surface-card)', outline:'none', boxSizing:'border-box' };
  const numInp = (val, onChange, w) => (
    <input type="number" value={val} onChange={e => onChange(e.target.value === '' ? '' : toNum(e.target.value))} style={{ ...inp, width: w||'100%', textAlign:'right' }} />
  );
  const TH = ({ ch, r }) => <th style={{ padding:'8px 12px', textAlign: r?'right':'left', fontWeight:700, color:'var(--text-muted)', fontSize:'var(--text-xs)', textTransform:'uppercase', letterSpacing:'.04em', borderBottom:'1px solid var(--divider)', background:'var(--surface-inset)', whiteSpace:'nowrap' }}>{ch}</th>;
  const TD = ({ ch, r, bold, color }) => <td style={{ padding:'9px 12px', borderBottom:'1px solid var(--divider)', textAlign:r?'right':'left', fontWeight:bold?700:400, color:color||'var(--text-body)', fontVariantNumeric:'tabular-nums', fontSize:'var(--text-sm)' }}>{ch}</td>;

  /* ── Сравнительный tab ───────────────────────────────── */
  const tabComp = () => {
    const m2s = rows
      .filter(r => toNum(r.price) > 0 && toNum(r.area) > 0)
      .map(r => (toNum(r.price)/toNum(r.area, 1)) * (1+(toNum(r.adjTorg)+toNum(r.adjLoc)+toNum(r.adjRep)+toNum(r.adjFlr))/100));
    const avgM2 = m2s.length ? Math.round(m2s.reduce((a,b)=>a+b,0)/m2s.length) : 0;
    const sortedM2 = [...m2s].sort((a, b) => a - b);
    const medM2 = sortedM2.length
      ? Math.round(sortedM2.length % 2
          ? sortedM2[(sortedM2.length - 1) / 2]
          : (sortedM2[sortedM2.length / 2 - 1] + sortedM2[sortedM2.length / 2]) / 2)
      : 0;
    const openAnalog = (row, index) => {
      const analogId = String(row.id || '').startsWith('AN-') ? row.id : D.analogsDetailed?.[index]?.id;
      if (analogId) {
        try { window.localStorage.setItem(`ocenka.analogs.open.${requestId || 'draft'}.v1`, analogId); } catch {}
      }
      onNavigate('analogs');
    };
    return (
      <div>
        {/* KPI row */}
        <div data-tour-id="calc-summary" className="ock-grid ock-grid--kpi-4" style={{ gap:14, marginBottom:20 }}>
          {[
            { l:'Итоговая стоимость',    v:`${fmt(final)} ₽`,                    strong:true },
            { l:'Сравнительный подход',  v:`${fmt(vComp)} ₽` },
            { l:'Согл. цена за 1 м²',   v:`${fmt(subjectArea ? Math.round(final/subjectArea) : 0)} ₽/м²` },
            { l:'Дата расчёта',         v:(savedObject?.date || D.object?.date || D.result?.date || '—') },
          ].map((c,i) => (
            <div key={i} style={{ padding:'14px 16px', background:'var(--surface-card)', border:`1.5px solid ${i===0?'var(--blue-600)':'var(--border-subtle)'}`, borderRadius:'var(--radius-lg)' }}>
              <div style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.04em' }}>{c.l}</div>
              <div style={{ fontSize:i===0?'var(--text-2xl)':'var(--text-xl)', fontWeight:700, color:i===0?'var(--blue-700)':'var(--text-strong)', fontVariantNumeric:'tabular-nums', marginTop:4 }}>{c.v}</div>
            </div>
          ))}
        </div>

        {/* Analog editor */}
        <div data-tour-id="calc-comp-editor" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', overflow:'hidden', marginBottom:16 }}>
          <div style={{ padding:'13px 20px', borderBottom:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:600, color:'var(--text-strong)', display:'flex', alignItems:'center', gap:8 }}>Редактор аналогов <HelpTip title="Редактор аналогов" text="Здесь можно проверить цену, площадь и поправки каждого аналога. Любое изменение сразу пересчитывает сравнительный подход." side="bottom" /></div>
              <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:2 }}>Цена, площадь и поправки редактируются вручную — расчёт пересчитывается автоматически</div>
            </div>
          </div>
          <div className="ock-table-scroll">
            <table className="ock-table-wide" style={{ width:'100%', borderCollapse:'collapse', fontSize:'var(--text-sm)' }}>
              <thead><tr><TH ch="Аналог"/><TH ch="Цена, ₽" r/><TH ch="М²" r/><TH ch="Вес" r/><TH ch="Торг %" r/><TH ch="Лок %" r/><TH ch="Ремонт %" r/><TH ch="Этаж %" r/><TH ch="₽/м² скорр." r/><TH ch="" r/></tr></thead>
              <tbody>
                {rows.map((r, rowIndex) => {
                  const totalAdj = toNum(r.adjTorg)+toNum(r.adjLoc)+toNum(r.adjRep)+toNum(r.adjFlr);
                  const adj = 1 + totalAdj/100;
                  const adjM2 = toNum(r.area) > 0 ? Math.round((toNum(r.price)/toNum(r.area, 1))*adj) : 0;
                  const q = Math.max(0, Math.round(100 - Math.abs(totalAdj)*1.5));
                  return (
                    <tr key={r.id}>
                      <td style={{ padding:'7px 12px', borderBottom:'1px solid var(--divider)' }}>
                        <div style={{ fontWeight:600, color:'var(--text-strong)', fontSize:'var(--text-xs)', whiteSpace:'nowrap' }}>{r.name}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)' }}>{r.src}</div>
                      </td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.price, v=>updRow(r.id,'price',v), 110)}</td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.area,  v=>updRow(r.id,'area',v),  60)}</td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.w,     v=>updRow(r.id,'w',v),     55)}</td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.adjTorg, v=>updRow(r.id,'adjTorg',v), 58)}</td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.adjLoc,  v=>updRow(r.id,'adjLoc',v),  58)}</td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.adjRep,  v=>updRow(r.id,'adjRep',v),  70)}</td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(r.adjFlr,  v=>updRow(r.id,'adjFlr',v),  58)}</td>
                      <td style={{ padding:'7px 12px', borderBottom:'1px solid var(--divider)', textAlign:'right' }}>
                        <div style={{ fontWeight:700, color:'var(--text-strong)' }}>{fmt(adjM2)}</div>
                        <div style={{ fontSize:11, fontWeight:700, color: q>=90?'var(--success-text)':q>=75?'var(--warning-text)':'var(--danger-text)' }}>{q}% HIGH</div>
                      </td>
                      <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)', textAlign:'right' }}>
                        <button type="button" title="Открыть аналог" onClick={() => openAnalog(r, rowIndex)} style={{ border:'1px solid var(--border-subtle)', background:'var(--surface-card)', color:'var(--text-link)', borderRadius:'var(--radius-sm)', height:28, width:32, display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                          <Icon n="external-link" size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market range */}
        <div data-tour-id="calc-comp-market" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:'14px 20px', marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div style={{ fontWeight:600, color:'var(--text-strong)', display:'flex', alignItems:'center', gap:8 }}>Рыночная вилка <HelpTip title="Рыночная вилка" text="Быстрая проверка диапазона цен за квадратный метр по активным аналогам. Если итог сильно выбивается, стоит проверить поправки и веса." /></div>
            <Badge tone="info">{rows.length} объектов</Badge>
          </div>
          <div className="ock-grid ock-grid--kpi-4" style={{ gap:12 }}>
            {[
              { l:'Медиана 1 м²',   v:fmt(medM2) },
              { l:'Средняя 1 м²',   v:fmt(avgM2) },
              { l:'Минимум 1 м²',   v:fmt(m2s.length ? Math.round(Math.min(...m2s)) : 0) },
              { l:'Максимум 1 м²',  v:fmt(m2s.length ? Math.round(Math.max(...m2s)) : 0) },
            ].map((s,i) => (
              <div key={i} style={{ padding:'12px 14px', background:'var(--surface-inset)', borderRadius:'var(--radius-md)' }}>
                <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600 }}>{s.l}</div>
                <div style={{ fontSize:'var(--text-lg)', fontWeight:700, color:'var(--text-strong)', fontVariantNumeric:'tabular-nums', marginTop:4 }}>{s.v} ₽</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calc rows */}
        <div data-tour-id="calc-comp-rows" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
          <div style={{ padding:'13px 20px', borderBottom:'1px solid var(--divider)' }}>
            <div style={{ fontWeight:600, color:'var(--text-strong)', display:'flex', alignItems:'center', gap:8 }}>Расчётные строки сравнительного подхода <HelpTip title="Расчётные строки" text="Итоговая цена 1 м² получается после торга, поправок и веса аналога. Нажмите на процент веса, чтобы открыть карточку аналога." side="bottom" /></div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:2 }}>Скорр. цены аналогов после торга, поправок и весового согласования</div>
          </div>
          <div className="ock-table-scroll">
            <table className="ock-table-wide" style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr><TH ch="Аналог"/><TH ch="Цена" r/><TH ch="Пл." r/><TH ch="1 м² до" r/><TH ch="После торга" r/><TH ch="Фактор" r/><TH ch="Скорр. 1 м²" r/><TH ch="Вес" r/></tr></thead>
              <tbody>
                {rows.map((r, rowIndex) => {
                  const m2b = toNum(r.area) > 0 ? Math.round(toNum(r.price)/toNum(r.area, 1)) : 0;
                  const aft = Math.round(m2b*(1+toNum(r.adjTorg)/100));
                  const fct = (1+(toNum(r.adjLoc)+toNum(r.adjRep)+toNum(r.adjFlr))/100).toFixed(4);
                  const sc  = Math.round(m2b*(1+(toNum(r.adjTorg)+toNum(r.adjLoc)+toNum(r.adjRep)+toNum(r.adjFlr))/100));
                  const ws  = rows.reduce((s,x)=>s+Math.max(0,toNum(x.w)),0)||1;
                  return (
                    <tr key={r.id}>
                      <TD ch={<><b style={{color:'var(--text-strong)'}}>{r.name}</b><br/><span style={{fontSize:11,color:'var(--text-muted)'}}>{r.src}</span></>} />
                      <TD ch={fmt(r.price)+' ₽'} r /><TD ch={r.area+' м²'} r />
                      <TD ch={fmt(m2b)} r /><TD ch={fmt(aft)} r /><TD ch={fct} r />
                      <TD ch={fmt(sc)} r bold /><TD ch={<button type="button" onClick={() => openAnalog(r, rowIndex)} style={{ border:'none', background:'transparent', color:'var(--blue-600)', fontWeight:700, cursor:'pointer', padding:0 }}>{Math.round(Math.max(0,toNum(r.w))/ws*100)}%</button>} r bold color="var(--blue-600)" />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* ── Доходный tab ────────────────────────────────────── */
  const tabIncome = () => {
    const pgi = Math.round(toNum(inc.area)*toNum(inc.rent)*12);
    const egi = Math.round(pgi*(1-toNum(inc.vacancy)/100));
    const noi = Math.round(egi*(1-toNum(inc.opex)/100));
    const fields = [
      { l:'Площадь, м²',             k:'area',    v:inc.area },
      { l:'Аренд. ставка, ₽/м²/мес', k:'rent',    v:inc.rent },
      { l:'Недозагрузка, %',          k:'vacancy', v:inc.vacancy },
      { l:'Операц. расходы, %',       k:'opex',    v:inc.opex },
      { l:'Ставка капитализации, %',  k:'cap',     v:inc.cap },
    ];
    return (
      <div>
        <div data-tour-id="calc-income-kpis" className="ock-grid ock-grid--kpi-3" style={{ gap:14, marginBottom:20 }}>
          {[
            { l:'Потенц. ВД (PGI)',   v:fmt(pgi)+' ₽/год' },
            { l:'Действит. ВД (EGI)', v:fmt(egi)+' ₽/год' },
            { l:'Чист. опер. доход (NOI)', v:fmt(noi)+' ₽/год', strong:true },
          ].map((c,i) => (
            <div key={i} style={{ padding:'14px 16px', background:'var(--surface-card)', border:`1.5px solid ${c.strong?'var(--emerald-500)':'var(--border-subtle)'}`, borderRadius:'var(--radius-lg)' }}>
              <div style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.04em' }}>{c.l}</div>
              <div style={{ fontSize:'var(--text-xl)', fontWeight:700, color:c.strong?'var(--emerald-700)':'var(--text-strong)', fontVariantNumeric:'tabular-nums', marginTop:4 }}>{c.v}</div>
            </div>
          ))}
        </div>
        <div data-tour-id="calc-income-params" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:20, marginBottom:16 }}>
          <div style={{ fontWeight:600, color:'var(--text-strong)', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>Параметры доходного подхода <HelpTip title="Доходный подход" text="Расчёт идёт от потенциального дохода к NOI, затем NOI делится на ставку капитализации. Ставка аренды может быть введена вручную или взята из таблицы аналогов." side="bottom" /></div>
          <div className="ock-grid ock-grid--three" style={{ gap:16 }}>
            {fields.map(f => (
              <div key={f.k}>
                <label style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--text-muted)', display:'block', marginBottom:6 }}>{f.l}</label>
                <input type="number" value={f.v} onChange={e => setInc(p=>({...p,[f.k]:e.target.value === '' ? '' : toNum(e.target.value)}))} style={inp} />
              </div>
            ))}
          </div>
        </div>
        {rentRows.length ? (
          <div data-tour-id="calc-income-rent" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', overflow:'hidden', marginBottom:16 }}>
            <div style={{ padding:'13px 20px', borderBottom:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', gap:12, alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:600, color:'var(--text-strong)', display:'flex', alignItems:'center', gap:8 }}>Таблица 6 · Подбор аналогов по аренде за 1 м² <HelpTip title="Арендные аналоги" text="Ставки аренды корректируются по локации и состоянию, затем согласуются по весам. Вес вводится в долях: например 0,001." side="bottom" /></div>
                <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:2 }}>Весовой коэффициент указан в долях, например 0,001</div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => { setInc((p) => ({ ...p, rent: rentAnalogRate() })); if (toast) toast('Арендная ставка применена'); }}>Применить ставку {fmt(rentAnalogRate())} ₽/м²</Button>
            </div>
            <div className="ock-table-scroll">
              <table className="ock-table-wide" style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead><tr><TH ch="Аналог"/><TH ch="Источник"/><TH ch="Ставка, ₽/м²" r/><TH ch="Площадь" r/><TH ch="Локация %" r/><TH ch="Состояние %" r/><TH ch="Вес" r/><TH ch="Скорр. ставка" r/></tr></thead>
                <tbody>
                  {rentRows.map((row) => {
                    const adjusted = Math.round(toNum(row.rentPerM2) * (1 + (toNum(row.adjLoc) + toNum(row.adjCond)) / 100));
                    return (
                      <tr key={row.id}>
                        <TD ch={<><b style={{color:'var(--text-strong)'}}>{row.addr}</b><br/><span className="ds-mono" style={{fontSize:11,color:'var(--text-muted)'}}>{row.id}</span></>} />
                        <TD ch={row.source} />
                        <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(row.rentPerM2, v=>updRentRow(row.id,'rentPerM2',v), 92)}</td>
                        <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(row.area, v=>updRentRow(row.id,'area',v), 72)}</td>
                        <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(row.adjLoc, v=>updRentRow(row.id,'adjLoc',v), 72)}</td>
                        <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(row.adjCond, v=>updRentRow(row.id,'adjCond',v), 88)}</td>
                        <td style={{ padding:'5px 8px', borderBottom:'1px solid var(--divider)' }}>{numInp(row.weight, v=>updRentRow(row.id,'weight',v), 76)}</td>
                        <TD ch={`${fmt(adjusted)} ₽/м²`} r bold />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding:'14px 20px', background:'var(--surface-inset)', borderTop:'1px solid var(--divider)' }}>
              <div style={{ fontSize:'var(--text-sm)', fontWeight:700, color:'var(--text-strong)', marginBottom:8 }}>Формулы и источники</div>
              <div style={{ display:'grid', gap:6 }}>
                {rentSources.map((source, index) => (
                  <div key={index} style={{ display:'flex', gap:8, color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.45 }}>
                    <span className="ds-mono" style={{ color:'var(--text-subtle)' }}>{index + 1}.</span>
                    <span>{source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <div data-tour-id="calc-income-final" style={{ background:'var(--emerald-50)', border:'1.5px solid var(--emerald-300)', borderRadius:'var(--radius-lg)', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontWeight:600, color:'var(--emerald-700)' }}>Стоимость по доходному подходу</div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--emerald-600)', marginTop:3 }}>NOI {fmt(noi)} ₽ / ставка {toNum(inc.cap)}%</div>
          </div>
          <div style={{ fontSize:34, fontWeight:800, color:'var(--emerald-700)', fontVariantNumeric:'tabular-nums' }}>{fmt(vInc)} ₽</div>
        </div>
      </div>
    );
  };

  /* ── Затратный tab ───────────────────────────────────── */
  const tabCost = () => {
    const base = Math.round(toNum(cst.n) * toNum(cst.m));
    const coef = toNum(cst.kPer, 1) * toNum(cst.kReg, 1) * toNum(cst.kZon, 1) * toNum(cst.kSeis, 1) * toNum(cst.kF, 1);
    const adjustedBase = Math.round(base * coef);
    const withExtra = Math.round(adjustedBase + toNum(cst.zd));
    const indexed = Math.round(withExtra * toNum(cst.kInd, 1));
    const vatAmount = Math.round(indexed * toNum(cst.vat) / 100);
    const fields = [
      { l:'N · базовый показатель НЦС, ₽/м²', k:'n', v:cst.n },
      { l:'M · мощность объекта, м²', k:'m', v:cst.m },
      { l:'Kper · переход к ценам субъекта РФ', k:'kPer', v:cst.kPer, step:'0.01' },
      { l:'Kreg · региональный коэффициент', k:'kReg', v:cst.kReg, step:'0.01' },
      { l:'Kzon · ценовая зона', k:'kZon', v:cst.kZon, step:'0.01' },
      { l:'Kseis · сейсмичность', k:'kSeis', v:cst.kSeis, step:'0.01' },
      { l:'Kf · прочие технические коэффициенты', k:'kF', v:cst.kF, step:'0.01' },
      { l:'Zd · дополнительные затраты, ₽', k:'zd', v:cst.zd },
      { l:'Kind · индекс-дефлятор', k:'kInd', v:cst.kInd, step:'0.01' },
      { l:'НДС, %', k:'vat', v:cst.vat, step:'0.01' },
    ];
    return (
      <div>
        <div data-tour-id="calc-cost-params" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', padding:20, marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap:16, alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontWeight:600, color:'var(--text-strong)', display:'flex', alignItems:'center', gap:8 }}>Параметры затратного подхода по НЦС <HelpTip title="Затратный подход" text="Базовый показатель НЦС умножается на площадь и коэффициенты, затем добавляются дополнительные затраты, индекс-дефлятор и НДС." side="bottom" /></div>
              <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:3 }}>C = [(N × M × Kper × Kreg × Kzon × Kseis × Kf) + Zd] × Kind × (1 + НДС / 100)</div>
            </div>
            <Badge tone="info">{cst.rateCode}</Badge>
          </div>
          <div className="ock-grid ock-grid--three" style={{ gap:16 }}>
            {fields.map(f => (
              <div key={f.k}>
                <label style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--text-muted)', display:'block', marginBottom:6 }}>{f.l}</label>
                <input type="number" step={f.step || '1'} value={f.v} onChange={e=>setCst(p=>({...p,[f.k]:e.target.value === '' ? '' : toNum(e.target.value)}))} style={inp} />
              </div>
            ))}
          </div>
        </div>
        <div data-tour-id="calc-cost-breakdown" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', overflow:'hidden', marginBottom:16 }}>
          {[
            [`N × M (${fmt(toNum(cst.n))} ₽/м² × ${toNum(cst.m)} м²)`, fmt(base), 'var(--text-strong)'],
            [`Коэффициенты Kper × Kreg × Kzon × Kseis × Kf`, coef.toFixed(4), 'var(--blue-700)', ''],
            ['База с коэффициентами', fmt(adjustedBase), 'var(--text-strong)'],
            ['Дополнительные затраты Zd', fmt(toNum(cst.zd)), 'var(--warning-text)'],
            [`Стоимость до индексации · Kind ${toNum(cst.kInd, 1)}`, fmt(withExtra), 'var(--text-strong)'],
            ['НДС', fmt(vatAmount), 'var(--warning-text)'],
          ].map(([l,v,c],i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'11px 20px', borderBottom:'1px solid var(--divider)', fontSize:'var(--text-sm)' }}>
              <span style={{ color:'var(--text-body)' }}>{l}</span>
              <span style={{ fontWeight:600, color:c, fontVariantNumeric:'tabular-nums' }}>{i === 1 ? v : `${v} ₽`}</span>
            </div>
          ))}
        </div>
        <div data-tour-id="calc-cost-final" style={{ background:'var(--blue-50)', border:'1.5px solid var(--blue-300)', borderRadius:'var(--radius-lg)', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontWeight:600, color:'var(--blue-700)' }}>Стоимость по затратному подходу</div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--blue-600)', marginTop:3 }}>НЦС · Сборник № 01 · расценка {cst.rateCode}</div>
          </div>
          <div style={{ fontSize:34, fontWeight:800, color:'var(--blue-700)', fontVariantNumeric:'tabular-nums' }}>{fmt(vCst)} ₽</div>
        </div>

        {ncsTables.length ? (
          <div data-tour-id="calc-cost-ncs" style={{ background:'var(--surface-card)', border:'1px solid var(--border-subtle)', borderRadius:'var(--radius-lg)', overflow:'hidden', marginTop:16 }}>
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--divider)', display:'flex', justifyContent:'space-between', gap:16, alignItems:'flex-start' }}>
              <div>
                <div style={{ fontWeight:600, color:'var(--text-strong)', display:'flex', alignItems:'center', gap:8 }}>Таблицы НЦС из файла <HelpTip title="Таблицы НЦС" text="Клик по строке подставляет нужный показатель или коэффициент в формулу затратного подхода, если таблица связана с параметром." side="bottom" /></div>
                <div style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:2 }}>
                  {ncsTables[ncsTableIdx]?.source} · выбор строки подставляет {ncsTargetLabel[ncsTables[ncsTableIdx]?.targetField] || 'коэффициент'} в формулу
                </div>
              </div>
              <Badge tone="neutral">{ncsTables[ncsTableIdx]?.rows?.length || 0} строк</Badge>
            </div>
            <div style={{ display:'flex', gap:6, padding:'10px 20px', borderBottom:'1px solid var(--divider)', flexWrap:'wrap' }}>
              {ncsTables.map((table, index) => (
                <button key={table.title} onClick={() => setNcsTableIdx(index)} style={{
                  border:'none',
                  borderRadius:999,
                  padding:'6px 11px',
                  cursor:'pointer',
                  fontFamily:'var(--font-sans)',
                  fontSize:'var(--text-xs)',
                  fontWeight:700,
                  background:index === ncsTableIdx ? 'var(--blue-600)' : 'var(--surface-inset)',
                  color:index === ncsTableIdx ? '#fff' : 'var(--text-body)',
                }}>{table.shortTitle || table.title.replace(/^Таблица\s*/, 'Табл. ')}</button>
              ))}
            </div>
            <div style={{ padding:'12px 20px', fontWeight:600, color:'var(--text-strong)', borderBottom:'1px solid var(--divider)' }}>
              {ncsTables[ncsTableIdx]?.title}
            </div>
            <div style={{ maxHeight:360, overflow:'auto', maxWidth:'100%' }}>
              <table className="ock-table-wide" style={{ width:'100%', borderCollapse:'collapse', fontSize:'var(--text-sm)' }}>
                <thead>
                  <tr style={{ background:'var(--surface-inset)', position:'sticky', top:0, zIndex:1 }}>
                    {(ncsTables[ncsTableIdx]?.columns || []).map((column, index, columns) => (
                      <th key={column} style={{ padding:'8px 12px', textAlign:(columns.length > 2 ? index <= 1 : index === 0) ? 'left' : 'right', fontWeight:700, color:'var(--text-muted)', fontSize:'var(--text-xs)', textTransform:'uppercase', letterSpacing:'.04em', borderBottom:'1px solid var(--divider)', whiteSpace:'nowrap' }}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(ncsTables[ncsTableIdx]?.rows || []).map((row, rowIndex) => {
                    const table = ncsTables[ncsTableIdx];
                    const valueColumn = table?.valueColumn ?? row.length - 1;
                    const value = parseNcsNumber(row[valueColumn]) * (table?.valueMultiplier || 1);
                    const selected = table?.targetField && Number.isFinite(value) && Math.abs((cst[table.targetField] || 0) - value) < 0.0001;
                    return (
                    <tr key={rowIndex} onClick={() => applyNcsRow(table, row)} style={{ borderBottom:'1px solid var(--divider)', cursor:table?.targetField?'pointer':'default', background:selected?'var(--blue-50)':'transparent' }}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{ padding:'8px 12px', textAlign:(row.length > 2 ? cellIndex <= 1 : cellIndex === 0) ? 'left' : 'right', color:cellIndex === valueColumn ? 'var(--text-value)' : 'var(--text-body)', fontWeight:cellIndex === valueColumn ? 700 : 400, fontVariantNumeric:'tabular-nums', minWidth:cellIndex === 1 && row.length > 2 ? 320 : undefined }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );})}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  /* ── Right sidebar ───────────────────────────────────── */
  const sidebar = () => (
    <div className="ock-calc-sidebar" style={{ display:'flex', flexDirection:'column', gap:14 }}>

      {/* Weights */}
      <div data-tour-id="calc-weights" className="ock-card" style={{ padding:'16px 18px' }}>
        <div style={{ fontWeight:600, color:'var(--text-strong)', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>Веса подходов <HelpTip title="Веса подходов" text="Сумма включенных подходов держится на 100%. Измените один вес, остальные автоматически перераспределятся." side="left" /></div>
        {[
          { k:'comp',   l:'Сравнительный', col:'#2A6FDB' },
          { k:'income', l:'Доходный',      col:'#25A871' },
          { k:'cost',   l:'Затратный',     col:'#F59E0B' },
        ].map(({ k,l,col }) => (
          <div key={k} style={{ marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <label style={{ display:'flex', alignItems:'center', gap:7, fontSize:'var(--text-sm)', color: applied[k]?'var(--text-body)':'var(--text-subtle)', cursor:'pointer' }}>
                <input type="checkbox" checked={applied[k]} onChange={e=>setAppliedLinked(k, e.target.checked)} />
                {l}
              </label>
              <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step="0.01"
                  value={weightDraft[k] ?? toNum(weights[k]).toFixed(2)}
                  disabled={!applied[k]}
                  onChange={e=>setWeightDraft((draft) => ({ ...draft, [k]: e.target.value }))}
                  onBlur={() => commitWeightDraft(k)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.currentTarget.blur();
                    }
                    if (event.key === 'Escape') {
                      setWeightDraft((draft) => {
                        const next = { ...draft };
                        delete next[k];
                        return next;
                      });
                      event.currentTarget.blur();
                    }
                  }}
                  style={{
                    width:64,
                    height:24,
                    border:'1px solid var(--border-default)',
                    borderRadius:'var(--radius-sm)',
                    padding:'0 6px',
                    textAlign:'right',
                    fontFamily:'var(--font-mono)',
                    fontSize:'var(--text-xs)',
                    fontWeight:700,
                    color:applied[k]?col:'var(--text-subtle)',
                    background:applied[k]?'var(--surface-card)':'var(--surface-inset)',
                    boxSizing:'border-box',
                  }}
                />
                <span style={{ fontSize:'var(--text-xs)', fontWeight:700, color:applied[k]?col:'var(--text-subtle)' }}>%</span>
              </span>
            </div>
            <input type="range" min={0} max={100} step={0.01} value={weights[k]} disabled={!applied[k]}
              onChange={e=>setWeightLinked(k, toNum(e.target.value))}
              style={{ width:'100%', accentColor:col }} />
          </div>
        ))}
        <div style={{ textAlign:'right', fontSize:'var(--text-xs)', fontWeight:600, color: Math.abs(wSum-100)<0.01?'var(--success-text)':'var(--danger-text)', marginTop:2 }}>Сумма: {wSum.toFixed(2)}%</div>
      </div>

      {/* Approaches */}
      <div data-tour-id="calc-approaches" className="ock-card" style={{ padding:'14px 18px' }}>
        <div style={{ fontWeight:600, color:'var(--text-strong)', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>Подходы <HelpTip title="Подходы" text="Карточки показывают текущую стоимость по каждому включенному подходу и помогают быстро увидеть, какой метод сильнее влияет на итог." side="left" /></div>
        {[
          { k:'comp',   l:'Сравнительный', v:vComp, note:'Скорр. цены аналогов' },
          { k:'income', l:'Доходный',      v:vInc,  note:'NOI / ставка капитализации' },
          { k:'cost',   l:'Затратный',     v:vCst,  note:'Расчет по НЦС с региональными коэффициентами' },
        ].map(({ k,l,v,note }) => (
          <div key={k} style={{ marginBottom:10, padding:'10px 12px', borderRadius:'var(--radius-md)', background: applied[k]?'var(--surface-inset)':'transparent', opacity: applied[k]?1:0.45 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontSize:'var(--text-sm)', fontWeight:600, color:'var(--text-strong)' }}>{l}</span>
              <span style={{ fontSize:'var(--text-sm)', fontWeight:700, color:'var(--text-value)', fontVariantNumeric:'tabular-nums' }}>{fmt(v)} ₽</span>
            </div>
            <p style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:4, lineHeight:1.4 }}>{note}</p>
          </div>
        ))}
      </div>

      {/* Export */}
      <div data-tour-id="calc-export" className="ock-card" style={{ padding:'14px 18px' }}>
        <div style={{ fontWeight:600, color:'var(--text-strong)', marginBottom:10, display:'flex', alignItems:'center', gap:8 }}>Экспорт <HelpTip title="Экспорт расчёта" text="DOC ведет к формированию отчета. JSON выгружает текущие параметры расчета для проверки или переноса." side="left" /></div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <Button variant="secondary" block iconLeft={<Icon n="file-text" size={15} />} onClick={() => onNavigate('reports')}>Скачать DOC</Button>
          <Button variant="ghost"     block iconLeft={<Icon n="braces"    size={15} />} onClick={exportCalculation}>Экспорт JSON</Button>
        </div>
      </div>

      {/* Final */}
      <div data-tour-id="calc-final" style={{ background:'var(--emerald-700)', borderRadius:'var(--radius-lg)', padding:'16px 18px', color:'#fff' }}>
        <div style={{ fontSize:'var(--text-xs)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em', color:'#A7E8C8' }}>Итоговая стоимость</div>
        <div style={{ fontSize:26, fontWeight:800, fontVariantNumeric:'tabular-nums', marginTop:6, lineHeight:1.1 }}>{fmt(final)} ₽</div>
        <div style={{ fontSize:'var(--text-xs)', color:'#A7E8C8', marginTop:6 }}>
          {fmt(subjectArea ? Math.round(final/subjectArea) : 0)} ₽ за м² · {subjectArea} м²
        </div>
        <Button variant="accent" block style={{ marginTop:14 }} iconRight={<Icon n="arrow-right" size={15} />} onClick={()=>onNavigate('reports')}>
          Сформировать отчёт
        </Button>
      </div>
    </div>
  );

  const TABS = [
    { k:'comp',   l:'Сравнительный', i:'git-compare'  },
    { k:'income', l:'Доходный',      i:'trending-up'  },
    { k:'cost',   l:'Затратный',     i:'building-2'   },
  ];

  return (
    <div>
      <PageHead title="Расчет стоимости" subtitle={`Заявка ${requestId} · ${requestTitle}`} />

      {/* Sub-tabs */}
      <div data-tour-id="calc-tabs" style={{ display:'flex', gap:2, background:'var(--surface-inset)', padding:4, borderRadius:'var(--radius-lg)', marginBottom:20, width:'fit-content' }}>
        {TABS.map(t => (
          <button key={t.k} onClick={()=>setTab(t.k)} style={{
            display:'inline-flex', alignItems:'center', gap:7,
            padding:'8px 18px', border:'none', borderRadius:'var(--radius-md)',
            fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)', fontWeight:600,
            cursor:'pointer', transition:'all .14s',
            background: tab===t.k ? 'var(--surface-card)' : 'transparent',
            color:       tab===t.k ? 'var(--text-strong)' : 'var(--text-muted)',
            boxShadow:   tab===t.k ? 'var(--shadow-sm)' : 'none',
          }}>
            <Icon n={t.i} size={15} />
            {t.l}
          </button>
        ))}
      </div>

      {/* 2-col layout */}
      <div className="ock-calc-layout">
        <div style={{ minWidth:0 }}>
          {tab==='comp'   && tabComp()}
          {tab==='income' && tabIncome()}
          {tab==='cost'   && tabCost()}
        </div>
        {sidebar()}
      </div>
    </div>
  );
};
