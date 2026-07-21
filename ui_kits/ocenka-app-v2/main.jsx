/* Application bootstrap. In development this is transpiled in the browser by
 * Babel; for production `npm run build` compiles it to build/main.js and the
 * generated index loads the compiled bundle without Babel. */
function showBootError(error) {
  const root = document.getElementById('app');
  if (!root || root.childElementCount) return;
  const message = error?.message || String(error || 'Неизвестная ошибка');
  const shell = document.createElement('div');
  shell.style.cssText = 'min-height:100vh;display:grid;place-items:center;padding:24px;background:#f4f7fb;color:#111827;font-family:system-ui,sans-serif;box-sizing:border-box';
  const panel = document.createElement('div');
  panel.style.cssText = 'width:min(100%,620px);background:#fff;border:1px solid #d7dde8;border-radius:8px;padding:22px;box-shadow:0 10px 30px rgba(15,23,42,.12)';
  const title = document.createElement('h1');
  title.style.cssText = 'margin:0 0 8px;font-size:20px';
  title.textContent = 'Ошибка запуска приложения';
  const note = document.createElement('p');
  note.style.cssText = 'margin:0 0 14px;color:#5b6472';
  note.textContent = 'Обновите страницу с очисткой кеша. Если ошибка повторится, передайте текст ниже.';
  const pre = document.createElement('pre');
  pre.style.cssText = 'white-space:pre-wrap;overflow:auto;background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;padding:12px;font-size:12px;color:#991b1b';
  pre.textContent = message;
  panel.append(title, note, pre);
  shell.append(panel);
  root.replaceChildren(shell);
}
window.addEventListener('error', (event) => window.setTimeout(() => showBootError(event.error || event.message), 0));
window.addEventListener('unhandledrejection', (event) => window.setTimeout(() => showBootError(event.reason), 0));

function normalizeRequestId(id) {
  return String(id || '').replace(/^ОЗ-/, '03-');
}

function normalizeRequestRow(request) {
  return request ? { ...request, id: normalizeRequestId(request.id) } : request;
}

function migrateLegacyStorage() {
  if (window.__ocenkaLegacyStorageMigrated) return;
  window.__ocenkaLegacyStorageMigrated = true;
  try {
    const storageKeys = Array.from({ length: window.localStorage.length }, (_, index) => window.localStorage.key(index)).filter(Boolean);
    storageKeys.forEach((key) => {
      if (!key.includes('ОЗ-')) return;
      const nextKey = key.replaceAll('ОЗ-', '03-');
      const nextValue = String(window.localStorage.getItem(key) || '').replaceAll('ОЗ-', '03-');
      if (!window.localStorage.getItem(nextKey)) {
        window.localStorage.setItem(nextKey, nextValue);
      }
      window.localStorage.removeItem(key);
    });
    const kanbanKey = 'ocenka.requests.kanban.v1';
    const rows = window.safeJsonParse ? window.safeJsonParse(window.localStorage.getItem(kanbanKey), null) : null;
    if (Array.isArray(rows)) {
      window.localStorage.setItem(kanbanKey, JSON.stringify(rows.map(normalizeRequestRow)));
    }
    Array.from({ length: window.localStorage.length }, (_, index) => window.localStorage.key(index))
      .filter((key) => key && key.startsWith('ocenka.calculation.'))
      .forEach((key) => {
        try {
          const saved = window.safeJsonParse ? window.safeJsonParse(window.localStorage.getItem(key), null) : null;
          if (saved?.cst?.ncsTables) {
            const cost = { ...saved.cst };
            delete cost.ncsTables;
            window.localStorage.setItem(key, JSON.stringify({ ...saved, cst: cost }));
          }
        } catch {}
      });
  } catch {}
}

function resolveSelectedRequest() {
  const rows = (window.loadKanbanRequests ? window.loadKanbanRequests() : (window.OcenkaData.requests || [])).map(normalizeRequestRow);
  const activeId = window.getActiveRequestId ? window.getActiveRequestId() : null;
  const byActive = activeId ? rows.find((request) => normalizeRequestId(request.id) === normalizeRequestId(activeId)) : null;
  if (byActive) return byActive;
  const byObject = rows.find((request) => normalizeRequestId(request.id) === normalizeRequestId(window.OcenkaData.object?.id));
  return byObject || rows[0] || null;
}

function App() {
  migrateLegacyStorage();
  const [active, setActive] = React.useState('dashboard');
  const [toastMsg, setToastMsg] = React.useState(null);
  const [selectedRequest, setSelectedRequest] = React.useState(() => resolveSelectedRequest());
  const contentRef = React.useRef(null);
  const toastTimerRef = React.useRef(null);

  const toast = (msg) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMsg(null), 2600);
  };

  const navigate = (key) => {
    setActive(key);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };
  const openRequest = (request) => {
    if (request) {
      const row = normalizeRequestRow(request);
      setSelectedRequest(row);
      if (window.setActiveRequestId) window.setActiveRequestId(row.id);
    }
    navigate('objects');
  };

  React.useEffect(() => {
    window.ocenkaGoTo = (key) => {
      setActive(key);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    };
  }, []);

  React.useEffect(() => { window.materializeIcons && window.materializeIcons(); });
  React.useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);
  React.useEffect(() => {
    const onStorageError = (event) => {
      const key = event?.detail?.key ? ` (${event.detail.key})` : '';
      toast(`Не удалось сохранить данные${key} — переполнена память браузера`);
    };
    window.addEventListener('ocenka:storage-error', onStorageError);
    return () => window.removeEventListener('ocenka:storage-error', onStorageError);
  }, []);
  React.useEffect(() => {
    const refreshSelected = (event) => {
      const detailId = event?.detail?.id;
      if (detailId && window.setActiveRequestId) window.setActiveRequestId(detailId);
      setSelectedRequest((prev) => {
        const next = resolveSelectedRequest();
        if (!next) return prev;
        if (prev && normalizeRequestId(prev.id) === normalizeRequestId(next.id)) {
          return { ...prev, ...next };
        }
        return detailId || !prev ? next : prev;
      });
    };
    window.addEventListener('ocenka:active-request', refreshSelected);
    window.addEventListener('ocenka:requests-updated', refreshSelected);
    return () => {
      window.removeEventListener('ocenka:active-request', refreshSelected);
      window.removeEventListener('ocenka:requests-updated', refreshSelected);
    };
  }, []);

  const screens = {
    dashboard: <DashboardScreenV2 onOpenRequest={openRequest} onNavigate={navigate} />,
    requests:  <RequestsScreenV2 onOpenRequest={openRequest} toast={toast} />,
    objects:   <ObjectScreenV2 request={selectedRequest} onBack={() => navigate('requests')} onNavigate={navigate} toast={toast} />,
    analogs:   <AnalogsScreenV2 request={selectedRequest} onNavigate={navigate} toast={toast} />,
    calc:      <CalcScreenV2 request={selectedRequest} onNavigate={navigate} toast={toast} />,
    reports:   <ReportScreenV2 request={selectedRequest} onNavigate={navigate} toast={toast} />,
    fso:       <FsoScreenV2 request={selectedRequest} onNavigate={navigate} toast={toast} />,
    analytics: <AnalyticsScreen toast={toast} />,
    clients:   <ClientsScreenV2 toast={toast} />,
    settings:  <SettingsScreenV2 toast={toast} />,
  };

  return (
    <React.Fragment>
      <SidebarV2 active={active} onNavigate={navigate} />
      <div className="ock-main">
        <TopbarV2 activeRequestId={selectedRequest?.id} onNewAppraisal={() => {
          navigate('requests');
          window.setTimeout(() => window.dispatchEvent(new Event('ocenka:create-request')), 0);
        }} />
        <div className="ock-content ds-scroll" ref={contentRef}>
          <div className="ock-content-inner">
            <ContextHelpV2 active={active} />
            {screens[active] || screens.dashboard}
          </div>
        </div>
      </div>
      {toastMsg ? (
        <div style={{
          position:'fixed', right:24, bottom:24, zIndex:50,
          display:'flex', alignItems:'center', gap:10,
          background:'var(--neutral-900)', color:'#fff',
          padding:'12px 16px', borderRadius:'var(--radius-md)',
          boxShadow:'var(--shadow-lg)', fontSize:'var(--text-sm)', fontWeight:500,
          animation:'toastIn .22s var(--ease-out)',
        }}>
          <span style={{ color:'var(--emerald-300)', display:'inline-flex' }}><Icon n="check-circle-2" size={18} /></span>
          {toastMsg}
        </div>
      ) : null}
      <OnboardingV2 active={active} onNavigate={navigate} toast={toast} />
    </React.Fragment>
  );
}
try {
  ReactDOM.createRoot(document.getElementById('app')).render(<App />);
} catch (error) {
  showBootError(error);
}
setTimeout(() => window.materializeIcons && window.materializeIcons(), 60);
