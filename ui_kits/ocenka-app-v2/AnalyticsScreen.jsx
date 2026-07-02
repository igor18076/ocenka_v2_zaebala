/* Market analytics — charts from analogs + objects base. window.AnalyticsScreen */

/* ── ChartBox: Chart.js wrapper — defined OUTSIDE AnalyticsScreen ─────────── */
function ChartBox({ title, chartType, labels, values, height, horizontal, multiDatasets }) {
  const h = height || 240;
  const ref  = React.useRef(null);
  const inst = React.useRef(null);
  const PALETTE = ['#2A6FDB','#25A871','#F59E0B','#EF4444','#8B5CF6','#EC4899','#14B8A6','#F97316','#64748B'];

  const depKey = JSON.stringify({ labels, values, chartType, horizontal, multiDatasets });

  React.useEffect(() => {
    if (!window.Chart || !ref.current) return;
    if (inst.current) { inst.current.destroy(); inst.current = null; }
    if (!labels || !labels.length) return;

    const datasets = multiDatasets || [{
      label: title,
      data: values,
      backgroundColor: (chartType === 'doughnut' || chartType === 'pie')
        ? labels.map((_,i) => PALETTE[i % PALETTE.length])
        : PALETTE[0],
      borderColor: PALETTE[0],
      borderRadius: chartType === 'bar' ? 5 : 0,
      borderSkipped: false,
      tension: chartType === 'line' ? 0.28 : 0,
      fill: false,
    }];

    inst.current = new window.Chart(ref.current, {
      type: chartType,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: horizontal ? 'y' : 'x',
        plugins: {
          legend: { display: chartType === 'doughnut' || chartType === 'pie' || !!multiDatasets, position:'bottom', labels:{ boxWidth:12, font:{size:11} } },
          tooltip: {
            callbacks: {
              label: ctx => {
                if (chartType === 'doughnut' || chartType === 'pie') return ` ${ctx.raw} объект.`;
                const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : '';
                return ` ${label}${Number(ctx.raw || 0).toLocaleString('ru')} тыс. ₽/м²`;
              },
            },
          },
        },
        scales: (chartType === 'doughnut' || chartType === 'pie') ? {} : {
          x: { grid:{ color:'rgba(0,0,0,.05)' }, ticks:{ font:{size:11} } },
          y: { grid:{ color:'rgba(0,0,0,.05)' }, beginAtZero: chartType === 'line', ticks:{ font:{size:11}, callback: v => horizontal ? v : (v + 'т') } },
        },
      },
    });
    return () => { if (inst.current) { inst.current.destroy(); inst.current = null; } };
  }, [depKey]);

  return (
    <div className="ock-card" style={{ padding:16 }}>
      <div style={{ fontSize:'var(--text-sm)', fontWeight:600, color:'var(--text-strong)', marginBottom:12 }}>{title}</div>
      <div style={{ position:'relative', height:h }}>
        {(!labels || !labels.length)
          ? <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-subtle)', fontSize:'var(--text-sm)' }}>Нет данных для фильтра</div>
          : <canvas ref={ref} />}
      </div>
    </div>
  );
}

/* ── Utility ─────────────────────────────────────────────────────────────── */
function groupAvg(items, keyFn, valFn) {
  const g = {};
  items.forEach(p => { const k = keyFn(p); if (!g[k]) g[k] = []; g[k].push(valFn(p)); });
  const out = {};
  Object.entries(g).forEach(([k, vs]) => { out[k] = Math.round(vs.reduce((a,b)=>a+b,0)/vs.length); });
  return out;
}
function groupCount(items, keyFn) {
  const g = {};
  items.forEach(p => { const k = keyFn(p); g[k] = (g[k]||0)+1; });
  return g;
}
function avgByYear(items, valFn) {
  const g = {};
  items.forEach(p => {
    const value = valFn(p);
    if (!value) return;
    if (!g[p.year]) g[p.year] = [];
    g[p.year].push(value);
  });
  return Object.entries(g).reduce((acc, [year, values]) => {
    acc[year] = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    return acc;
  }, {});
}

/* ── Main screen ─────────────────────────────────────────────────────────── */
window.AnalyticsScreen = function AnalyticsScreen() {
  const D = window.OcenkaData;
  const all = D.analyticsProps || [];

  const [filt, setFilt] = React.useState({ useType:'all', cls:'all', era:'all', line:'all', propType:'all' });
  const set = (k,v) => setFilt(f=>({...f,[k]:v}));

  const filtered = all.filter(p =>
    (filt.useType  === 'all' || p.useType  === filt.useType) &&
    (filt.cls      === 'all' || p.class    === filt.cls) &&
    (filt.era      === 'all' || p.era      === filt.era) &&
    (filt.line     === 'all' || p.line     === filt.line) &&
    (filt.propType === 'all' || p.type     === filt.propType)
  );

  const n   = filtered.length;
  const avgM2   = n ? Math.round(filtered.reduce((s,p)=>s+p.pricePerM2,0)/n) : 0;
  const srtd    = [...filtered].sort((a,b)=>a.pricePerM2-b.pricePerM2);
  const medM2   = srtd.length ? srtd[Math.floor(srtd.length/2)]?.pricePerM2 : 0;
  const maxM2   = n ? Math.max(...filtered.map(p=>p.pricePerM2)) : 0;
  const minM2   = n ? Math.min(...filtered.map(p=>p.pricePerM2)) : 0;
  const fmt1000 = v => Math.round(v/1000);

  /* Chart data */
  const byDistrict = groupAvg(filtered, p=>p.district,    p=>p.pricePerM2);
  const byClass    = groupAvg(filtered, p=>p.class,       p=>p.pricePerM2);
  const byEra      = groupAvg(filtered, p=>p.era,         p=>p.pricePerM2);
  const byWall     = groupAvg(filtered, p=>p.wallMaterial,p=>p.pricePerM2);
  const byType     = groupCount(filtered, p=>p.type);
  const byCond     = groupAvg(filtered, p=>p.cond,        p=>p.pricePerM2);

  /* Floors bucketed */
  const floorBkt = { '1–5':{vals:[]}, '6–10':{vals:[]}, '11–20':{vals:[]}, '20+':{vals:[]} };
  filtered.forEach(p => {
    if      (p.floors <= 5)  floorBkt['1–5'].vals.push(p.pricePerM2);
    else if (p.floors <= 10) floorBkt['6–10'].vals.push(p.pricePerM2);
    else if (p.floors <= 20) floorBkt['11–20'].vals.push(p.pricePerM2);
    else                     floorBkt['20+'].vals.push(p.pricePerM2);
  });
  const flrLabels = Object.keys(floorBkt).filter(k=>floorBkt[k].vals.length>0);
  const flrData   = flrLabels.map(k=>{ const vs=floorBkt[k].vals; return vs.length?fmt1000(vs.reduce((a,b)=>a+b,0)/vs.length):0; });

  /* Помощник: объект → массивы (отсортированные) */
  function toChart(obj, orderArr, mapFn) {
    const keys = orderArr ? orderArr.filter(k=>obj[k]!=null) : Object.keys(obj);
    return { labels: keys.map(mapFn||((k)=>k)), values: keys.map(k=>fmt1000(obj[k])) };
  }
  const distC  = toChart(byDistrict, null);
  const classC = toChart(byClass, ['Эконом','Комфорт','Бизнес']);
  const eraC   = toChart(byEra,   ['Хрущевка','Советская','Сталинка','Новостройка']);
  const wallC  = toChart(byWall, null);
  const condC  = toChart(byCond, ['Под ремонт','Удовл.','Хорошее','Отличное']);
  const typeC  = { labels:Object.keys(byType), values:Object.values(byType) };
  const priceByYear = avgByYear(filtered, p=>p.pricePerM2);
  const rentByYear = avgByYear(filtered, p=>p.rentPerM2);
  const yearLabels = Array.from(new Set([...Object.keys(priceByYear), ...Object.keys(rentByYear)]))
    .map(Number)
    .sort((a,b)=>a-b)
    .map(String);
  const priceDynamics = yearLabels.map(year => priceByYear[year] ? fmt1000(priceByYear[year]) : null);
  const rentDynamics = yearLabels.map(year => rentByYear[year] ? fmt1000(rentByYear[year]) : null);

  /* Filter pill */
  const FilterPill = ({ label, value, options }) => (
    <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
      <span style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600, flexShrink:0 }}>{label}:</span>
      <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
        {options.map(o => (
          <button key={o.v} onClick={()=>set(o.k, o.v)} style={{
            padding:'4px 10px', border:'none', borderRadius:999, cursor:'pointer',
            fontFamily:'var(--font-sans)', fontSize:'var(--text-xs)', fontWeight:600, transition:'all .12s',
            background: value===o.v ? 'var(--blue-600)' : 'var(--surface-inset)',
            color:       value===o.v ? '#fff'            : 'var(--text-body)',
          }}>{o.l}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <PageHead title="Аналитика рынка" subtitle={`${all.length} объектов в базе · ${n} в выборке · данные из аналогов и объектов оценки`} />

      {/* Filters */}
      <div className="ock-card" style={{ padding:'14px 20px', marginBottom:20, display:'flex', flexWrap:'wrap', gap:16 }}>
        <FilterPill label="Тип"    value={filt.useType}  options={[{k:'useType',v:'all',l:'Все'},{k:'useType',v:'Жилой',l:'Жилые'},{k:'useType',v:'Коммерческий',l:'Коммерческие'}]} />
        <FilterPill label="Класс"  value={filt.cls}      options={[{k:'cls',v:'all',l:'Все'},{k:'cls',v:'Эконом',l:'Эконом'},{k:'cls',v:'Комфорт',l:'Комфорт'},{k:'cls',v:'Бизнес',l:'Бизнес'}]} />
        <FilterPill label="Эпоха"  value={filt.era}      options={[{k:'era',v:'all',l:'Все'},{k:'era',v:'Хрущевка',l:'Хрущевка'},{k:'era',v:'Советская',l:'Советская'},{k:'era',v:'Сталинка',l:'Сталинка'},{k:'era',v:'Новостройка',l:'Новостройка'}]} />
        <FilterPill label="Линия"  value={filt.line}     options={[{k:'line',v:'all',l:'Все'},{k:'line',v:'1-я линия',l:'1-я'},{k:'line',v:'2-я линия',l:'2-я'}]} />
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:20 }}>
        {[
          { l:'Средняя цена за м²',  v:`${fmt1000(avgM2)} тыс. ₽`,                    i:'trending-up',     t:'brand'  },
          { l:'Медиана цены за м²',  v:`${fmt1000(medM2)} тыс. ₽`,                    i:'activity',        t:'brand'  },
          { l:'Объектов в выборке',  v:String(n),                                      i:'database',        t:'accent' },
          { l:'Разброс цен',         v:`${fmt1000(minM2)}–${fmt1000(maxM2)} тыс. ₽`, i:'arrow-left-right', t:'warning'},
        ].map((k,i) => <NS.KpiCard key={i} label={k.l} value={k.v} icon={<Icon n={k.i} size={18} />} iconTone={k.t} />)}
      </div>

      {/* Charts row 1 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <ChartBox title="Средняя цена за м² по районам, тыс. ₽"    chartType="bar" labels={distC.labels}  values={distC.values}  horizontal />
        <ChartBox title="Средняя цена за м² по классу объекта, тыс. ₽" chartType="bar" labels={classC.labels} values={classC.values} />
      </div>

      {/* Dynamics */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <ChartBox
          title="Динамика цены за м² по годам, тыс. ₽"
          chartType="line"
          labels={yearLabels}
          values={priceDynamics}
          multiDatasets={[{
            label:'Цена за м²',
            data:priceDynamics,
            borderColor:'#2A6FDB',
            backgroundColor:'rgba(42,111,219,.12)',
            pointRadius:3,
            pointHoverRadius:5,
            tension:.28,
            fill:true,
          }]}
        />
        <ChartBox
          title="Динамика аренды за м² по годам, тыс. ₽"
          chartType="line"
          labels={yearLabels}
          values={rentDynamics}
          multiDatasets={[{
            label:'Аренда за м²',
            data:rentDynamics,
            borderColor:'#25A871',
            backgroundColor:'rgba(37,168,113,.12)',
            pointRadius:3,
            pointHoverRadius:5,
            tension:.28,
            fill:true,
          }]}
        />
      </div>

      {/* Charts row 2 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <ChartBox title="Цена за м² по эпохе застройки, тыс. ₽"       chartType="bar"      labels={eraC.labels}  values={eraC.values} />
        <ChartBox title="Цена за м² по материалу несущих стен, тыс. ₽" chartType="bar"      labels={wallC.labels} values={wallC.values} />
      </div>

      {/* Charts row 3 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <ChartBox title="Цена за м² по состоянию объекта, тыс. ₽"  chartType="bar"      labels={condC.labels} values={condC.values} />
        <ChartBox title="Цена за м² по этажности здания, тыс. ₽"   chartType="bar"      labels={flrLabels}    values={flrData} />
      </div>

      {/* Row 4 — doughnut */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:20, marginBottom:20 }}>
        <ChartBox title="Распределение по типам объектов" chartType="doughnut" labels={typeC.labels} values={typeC.values} height={260} />
        {/* Price range table */}
        <div className="ock-card" style={{ padding:0, overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--divider)', fontWeight:600, color:'var(--text-strong)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span>Диапазон цен по районам</span>
            <NS.Badge tone="info">{Object.keys(byDistrict).length} районов</NS.Badge>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'var(--text-sm)' }}>
              <thead>
                <tr style={{ background:'var(--surface-inset)' }}>
                  {['Район','Объектов','Мин. ₽/м²','Средн. ₽/м²','Макс. ₽/м²'].map((h,i) => (
                    <th key={i} style={{ padding:'8px 14px', textAlign:i>0?'right':'left', fontWeight:600, color:'var(--text-muted)', fontSize:'var(--text-xs)', textTransform:'uppercase', letterSpacing:'.04em', borderBottom:'1px solid var(--divider)', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(byDistrict).map(dist => {
                  const pts = filtered.filter(p=>p.district===dist);
                  const mn = Math.min(...pts.map(p=>p.pricePerM2));
                  const mx = Math.max(...pts.map(p=>p.pricePerM2));
                  const av = byDistrict[dist];
                  return (
                    <tr key={dist} style={{ borderBottom:'1px solid var(--divider)' }}>
                      <td style={{ padding:'10px 14px', fontWeight:500, color:'var(--text-strong)' }}>{dist}</td>
                      <td style={{ padding:'10px 14px', textAlign:'right' }}>{pts.length}</td>
                      <td style={{ padding:'10px 14px', textAlign:'right', color:'var(--success-text)', fontVariantNumeric:'tabular-nums' }}>{(mn/1000).toFixed(0)} тыс.</td>
                      <td style={{ padding:'10px 14px', textAlign:'right', fontWeight:700, color:'var(--text-strong)', fontVariantNumeric:'tabular-nums' }}>{(av/1000).toFixed(0)} тыс.</td>
                      <td style={{ padding:'10px 14px', textAlign:'right', color:'var(--danger-text)', fontVariantNumeric:'tabular-nums' }}>{(mx/1000).toFixed(0)} тыс.</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Objects table */}
      <div className="ock-card" style={{ overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--divider)', fontWeight:600, color:'var(--text-strong)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span>Объекты в выборке</span>
          <NS.Badge tone="neutral">{n} объектов</NS.Badge>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'var(--text-sm)' }}>
            <thead>
              <tr style={{ background:'var(--surface-inset)' }}>
                {['Адрес','Тип','Класс','Эпоха','Матер. стен','Состояние','Этажность','Пл. м²','Цена/м²','Использ.'].map((h,i) => (
                  <th key={i} style={{ padding:'8px 12px', textAlign:i>=6?'right':'left', fontWeight:600, color:'var(--text-muted)', fontSize:'var(--text-xs)', textTransform:'uppercase', letterSpacing:'.04em', borderBottom:'1px solid var(--divider)', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 20).map(p => (
                <tr key={p.id} style={{ borderBottom:'1px solid var(--divider)' }}>
                  <td style={{ padding:'9px 12px', fontWeight:500, color:'var(--text-strong)', maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.addr}</td>
                  <td style={{ padding:'9px 12px' }}>{p.type}</td>
                  <td style={{ padding:'9px 12px' }}>
                    <NS.Badge tone={p.class==='Бизнес'?'brand':p.class==='Комфорт'?'info':'neutral'} pill>{p.class}</NS.Badge>
                  </td>
                  <td style={{ padding:'9px 12px' }}>{p.era}</td>
                  <td style={{ padding:'9px 12px' }}>{p.wallMaterial}</td>
                  <td style={{ padding:'9px 12px' }}>{p.cond}</td>
                  <td style={{ padding:'9px 12px', textAlign:'right' }}>{p.floors}</td>
                  <td style={{ padding:'9px 12px', textAlign:'right' }}>{p.area}</td>
                  <td style={{ padding:'9px 12px', textAlign:'right', fontWeight:700, color:'var(--text-value)', fontVariantNumeric:'tabular-nums' }}>{(p.pricePerM2/1000).toFixed(0)} тыс.</td>
                  <td style={{ padding:'9px 12px' }}>
                    <NS.Badge tone={p.useType==='Жилой'?'success':'warning'} pill>{p.useType}</NS.Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
