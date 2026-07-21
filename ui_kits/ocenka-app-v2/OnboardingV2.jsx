/* Guided onboarding and compact page help. window.OnboardingV2, window.ContextHelpV2 */
(function () {
  const STORAGE_KEY = 'ocenka.onboarding.v1';

  const PAGE_HELP = {
    dashboard: {
      title: 'Главная',
      text: 'Здесь видно состояние заявок, быстрые действия и последние объекты. Начните с новой заявки или откройте текущую работу.',
    },
    requests: {
      title: 'Заявки',
      text: 'Канбан показывает этапы работы. Карточки можно открывать, редактировать и переносить между колонками.',
    },
    objects: {
      title: 'Объект оценки',
      text: 'Проверьте параметры объекта, документы и фотографии перед расчетом и формированием отчета.',
    },
    analogs: {
      title: 'Аналоги',
      text: 'Здесь подбираются и уточняются рыночные аналоги, которые затем можно передать в расчет.',
    },
    calc: {
      title: 'Расчет',
      text: 'Сравнительный, доходный и затратный подходы пересчитываются при изменении данных, веса подходов связаны между собой.',
    },
    reports: {
      title: 'Отчет',
      text: 'Проверьте итоговую стоимость, таблицы расчетов и выгрузите отчет в нужном формате.',
    },
    fso: {
      title: 'Проверка ФСО',
      text: 'Чек-лист помогает не пропустить обязательные пункты перед выпуском отчета.',
    },
    analytics: {
      title: 'Аналитика рынка',
      text: 'Графики и выборки показывают динамику цен и аренды по базе объектов и аналогов.',
    },
    clients: {
      title: 'Клиенты',
      text: 'Ведите заказчиков, реквизиты, ИНН, юридические адреса и историю обращений.',
    },
    settings: {
      title: 'Настройки',
      text: 'Заполните профиль оценщика и параметры формирования отчетов по умолчанию.',
    },
  };

  const TOUR_STEPS = [
    {
      id: 'dashboard',
      route: 'dashboard',
      target: 'dashboard-hero',
      title: 'Рабочее пространство',
      text: 'Главная страница собирает быстрые действия, показатели заявок и последние объекты в работе.',
      placement: 'right',
    },
    {
      id: 'getting-started',
      route: 'dashboard',
      target: 'getting-started',
      title: 'С чего начать',
      text: 'Этот блок ведет к основным действиям: создать заявку, открыть доску, проверить объект или перейти к отчету.',
      placement: 'bottom',
    },
    {
      id: 'sidebar',
      route: 'dashboard',
      target: 'sidebar',
      title: 'Разделы приложения',
      text: 'Левая навигация переводит между заявками, объектом, аналогами, расчетом, отчетом и проверкой ФСО.',
      placement: 'right',
    },
    {
      id: 'new-request',
      route: 'requests',
      target: 'requests-create',
      title: 'Создание заявки',
      text: 'Новая заявка открывает форму с объектом, адресом, клиентом, типом оценки и ответственным.',
      placement: 'left',
    },
    {
      id: 'requests-board',
      route: 'requests',
      target: 'requests-board',
      title: 'Канбан заявок',
      text: 'Карточки отражают этапы работы. Откройте карточку для перехода к объекту или измените стадию перетаскиванием.',
      placement: 'top',
    },
    {
      id: 'object-card',
      route: 'objects',
      target: 'object-edit',
      title: 'Карточка объекта',
      text: 'Параметры объекта можно редактировать, а затем использовать в расчетах и отчете.',
      placement: 'left',
    },
    {
      id: 'analogs-market',
      route: 'analogs',
      target: 'analogs-market',
      title: 'Рыночная база',
      text: 'Фильтруйте реальные объявления Inpars/Avito и добавляйте подходящие в подборку аналогов кнопкой «В аналоги».',
      placement: 'bottom',
    },
    {
      id: 'analogs',
      route: 'analogs',
      target: 'analogs-table',
      title: 'Подбор аналогов',
      text: 'Выберите подходящие аналоги, проверьте цены и передайте активную выборку в сравнительный расчет.',
      placement: 'top',
    },
    {
      id: 'calc-tabs',
      route: 'calc',
      target: 'calc-tabs',
      title: 'Подходы к расчету',
      text: 'Переключайтесь между сравнительным, доходным и затратным подходами без потери введенных данных.',
      placement: 'bottom',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'calc-summary',
      route: 'calc',
      target: 'calc-summary',
      title: 'Сводка расчета',
      text: 'Верхние показатели быстро показывают текущую итоговую стоимость, результат выбранного подхода, цену за 1 м² и дату расчета.',
      placement: 'bottom',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'calc-comp-editor',
      route: 'calc',
      target: 'calc-comp-editor',
      title: 'Сравнительный подход',
      text: 'В редакторе аналогов меняются цена, площадь, вес и поправки. После каждого изменения расчет обновляется автоматически.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'calc-comp-market',
      route: 'calc',
      target: 'calc-comp-market',
      title: 'Контроль рыночной вилки',
      text: 'Этот блок помогает увидеть, не выбивается ли согласованная цена за 1 м² из диапазона по выбранным аналогам.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'calc-comp-rows',
      route: 'calc',
      target: 'calc-comp-rows',
      title: 'Расчетные строки',
      text: 'Здесь видно путь от исходной цены аналога к скорректированной цене за 1 м² и весу в итоговом сравнительном подходе.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'calc-income-params',
      route: 'calc',
      target: 'calc-income-params',
      title: 'Доходный подход',
      text: 'Проверьте площадь, аренду, недозагрузку, операционные расходы и ставку капитализации. Итог считается через NOI.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'income' },
    },
    {
      id: 'calc-income-rent',
      route: 'calc',
      target: 'calc-income-rent',
      title: 'Арендные аналоги',
      text: 'Таблица 6 согласует ставку аренды за 1 м² по аналогам. Вес вводится в долях, например 0,001.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'income' },
    },
    {
      id: 'calc-cost-params',
      route: 'calc',
      target: 'calc-cost-params',
      title: 'Затратный подход',
      text: 'Формула НЦС собирает базовый показатель, площадь, коэффициенты, дополнительные затраты, индекс-дефлятор и НДС.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'cost' },
    },
    {
      id: 'calc-cost-ncs',
      route: 'calc',
      target: 'calc-cost-ncs',
      title: 'Таблицы НЦС',
      text: 'Выберите нужную таблицу и строку. Если строка связана с параметром формулы, значение подставится автоматически.',
      placement: 'top',
      event: { name: 'ocenka:calc-tab', detail: 'cost' },
    },
    {
      id: 'calc-weights',
      route: 'calc',
      target: 'calc-weights',
      title: 'Веса подходов',
      text: 'Введите процент вручную или двигайте ползунок. Остальные включенные подходы автоматически сохранят общую сумму 100%.',
      placement: 'left',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'calc-final',
      route: 'calc',
      target: 'calc-final',
      title: 'Итоговая стоимость',
      text: 'Итог считается по включенным подходам и их весам. Из этого блока можно перейти к формированию отчета.',
      placement: 'left',
      event: { name: 'ocenka:calc-tab', detail: 'comp' },
    },
    {
      id: 'report',
      route: 'reports',
      target: 'report-actions',
      title: 'Формирование отчета',
      text: 'Здесь доступны выгрузка DOC, печать PDF и отправка отчета на проверку.',
      placement: 'top',
    },
    {
      id: 'fso',
      route: 'fso',
      target: 'fso-checklist',
      title: 'Проверка ФСО',
      text: 'Отмечайте выполненные требования перед выпуском отчета. Прогресс сохраняется по заявке.',
      placement: 'left',
    },
    {
      id: 'analytics',
      route: 'analytics',
      target: 'analytics-charts',
      title: 'Аналитика рынка',
      text: 'Графики помогают оценить динамику стоимости квадратного метра и аренды по рыночной базе.',
      placement: 'top',
    },
    {
      id: 'clients',
      route: 'clients',
      target: 'clients-add',
      title: 'Клиенты',
      text: 'Добавляйте и редактируйте заказчиков, чтобы реквизиты были готовы для заявок и отчетов.',
      placement: 'left',
    },
    {
      id: 'settings',
      route: 'settings',
      target: 'settings-profile',
      title: 'Настройки профиля',
      text: 'Профиль оценщика и параметры отчетов используются при формировании документов.',
      placement: 'top',
    },
    {
      id: 'profile-help',
      route: 'dashboard',
      target: 'topbar-help',
      title: 'Повторный запуск',
      text: 'Обучение можно снова открыть из меню помощи или профиля в любой момент.',
      placement: 'left',
    },
  ];

  window.OcenkaTourSteps = TOUR_STEPS;

  function readState() {
    const parsed = window.readLocalJson ? window.readLocalJson(STORAGE_KEY, null) : null;
    return parsed && typeof parsed === 'object' ? parsed : { status: 'new', stepIndex: 0, autoDisabled: false };
  }

  function saveState(next) {
    if (window.writeLocalJson) window.writeLocalJson(STORAGE_KEY, next);
  }

  function clampStep(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(0, Math.min(TOUR_STEPS.length - 1, Math.round(parsed)));
  }

  function getTarget(tourId) {
    if (!tourId) return null;
    return document.querySelector(`[data-tour-id="${tourId}"]`);
  }

  function targetVisible(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function panelPosition(rect, placement) {
    const margin = 16;
    const gap = 16;
    const width = Math.min(380, window.innerWidth - margin * 2);
    const height = 240;
    const clampTop = (value) => Math.max(margin, Math.min(window.innerHeight - height - margin, value));
    const clampLeft = (value) => Math.max(margin, Math.min(window.innerWidth - width - margin, value));

    /* Free space available on each side of the target. */
    const space = {
      bottom: window.innerHeight - rect.bottom - gap,
      top: rect.top - gap,
      right: window.innerWidth - rect.right - gap,
      left: rect.left - gap,
    };
    const fits = {
      bottom: space.bottom >= height,
      top: space.top >= height,
      right: space.right >= width,
      left: space.left >= width,
    };
    /* Prefer the requested placement, then any side that fits, then the roomiest. */
    const order = [placement, 'bottom', 'top', 'right', 'left'].filter((value, index, all) => all.indexOf(value) === index);
    let side = order.find((candidate) => fits[candidate]);
    if (!side) side = Object.keys(space).sort((a, b) => space[b] - space[a])[0];

    let top;
    let left;
    if (side === 'bottom' || side === 'top') {
      left = clampLeft(rect.left + rect.width / 2 - width / 2);
      top = side === 'bottom' ? rect.bottom + gap : rect.top - height - gap;
    } else {
      top = clampTop(rect.top + rect.height / 2 - height / 2);
      left = side === 'right' ? rect.right + gap : rect.left - width - gap;
    }
    return { top: clampTop(top), left: clampLeft(left), width };
  }

  function buttonStyle(kind) {
    const primary = kind === 'primary';
    return {
      height: 36,
      padding: '0 14px',
      border: primary ? '1px solid var(--blue-600)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      background: primary ? 'var(--blue-600)' : 'var(--surface-card)',
      color: primary ? '#fff' : 'var(--text-strong)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'center',
    };
  }

  function Modal({ title, text, children, onClose }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      window.setTimeout(() => ref.current && ref.current.focus(), 0);
    }, []);
    return (
      <div className="ock-modal-backdrop" style={{ zIndex:120 }} role="presentation">
        <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="ock-modal-panel ock-modal-panel--tour">
          <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--divider)', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
            <div>
              <div style={{ fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>{title}</div>
              {text ? <div style={{ marginTop:6, color:'var(--text-muted)', fontSize:'var(--text-sm)', lineHeight:1.45 }}>{text}</div> : null}
            </div>
            {onClose ? (
              <button type="button" aria-label="Закрыть" onClick={onClose} style={{ border:'none', background:'transparent', color:'var(--text-muted)', cursor:'pointer', padding:4 }}>
                <Icon n="x" size={18} />
              </button>
            ) : null}
          </div>
          <div style={{ padding:20, display:'flex', justifyContent:'flex-end', gap:10, flexWrap:'wrap' }}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  window.ContextHelpV2 = function ContextHelpV2({ active }) {
    const help = PAGE_HELP[active] || PAGE_HELP.dashboard;
    return (
      <div data-tour-id="page-help" style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:16,
        marginBottom:18,
        padding:'10px 14px',
        background:'var(--surface-card)',
        border:'1px solid var(--border-subtle)',
        borderRadius:'var(--radius-lg)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
          <span style={{ width:28, height:28, borderRadius:'var(--radius-sm)', background:'var(--blue-50)', color:'var(--blue-700)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon n="info" size={15} />
          </span>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:'var(--text-sm)', color:'var(--text-strong)', fontWeight:800 }}>{help.title}</div>
            <div style={{ marginTop:2, color:'var(--text-muted)', fontSize:'var(--text-xs)', lineHeight:1.4, overflow:'hidden', textOverflow:'ellipsis' }}>{help.text}</div>
          </div>
        </div>
        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('ocenka:start-onboarding', { detail: { route: active, restart: true } }))} style={buttonStyle('secondary')}>
          <Icon n="route" size={15} /> Подсказки
        </button>
      </div>
    );
  };

  window.OnboardingV2 = function OnboardingV2({ active, onNavigate, toast }) {
    const [state, setState] = React.useState(readState);
    const [mode, setMode] = React.useState('idle');
    const [stepIndex, setStepIndex] = React.useState(clampStep(state.stepIndex));
    const [rect, setRect] = React.useState(null);
    const [targetMissing, setTargetMissing] = React.useState(false);
    const cardRef = React.useRef(null);
    const liveStateRef = React.useRef(state);

    const persist = (next) => {
      liveStateRef.current = next;
      setState(next);
      saveState(next);
    };
    const autoDisabled = () => liveStateRef.current?.autoDisabled === true;

    const start = (index) => {
      const nextIndex = clampStep(index);
      setStepIndex(nextIndex);
      setMode('tour');
      persist({ status: 'running', stepIndex: nextIndex, autoDisabled: autoDisabled() });
    };

    const finish = () => {
      setMode('idle');
      setRect(null);
      persist({ status: 'completed', stepIndex: TOUR_STEPS.length - 1, autoDisabled: autoDisabled() });
      if (toast) toast('Обучение завершено');
    };

    const pause = () => {
      setMode('idle');
      setRect(null);
      persist({ status: 'paused', stepIndex, autoDisabled: autoDisabled() });
      if (toast) toast('Обучение можно продолжить позже');
    };

    const stop = () => {
      setMode('idle');
      setRect(null);
      persist({ status: 'completed', stepIndex, autoDisabled: autoDisabled() });
    };

    React.useEffect(() => {
      const initial = readState();
      liveStateRef.current = initial;
      setState(initial);
      setStepIndex(clampStep(initial.stepIndex));
      if (!initial.status || initial.status === 'new') {
        setMode('intro');
        persist({ status: 'offered', stepIndex: 0, autoDisabled: false });
      } else if (initial.status === 'running') {
        setMode('resume');
      }

      const launch = (event) => {
        const current = readState();
        liveStateRef.current = current;
        setState(current);
        const savedIndex = clampStep(current.stepIndex);
        const requestedRoute = event?.detail?.route;
        const requestedIndex = requestedRoute ? TOUR_STEPS.findIndex((step) => step.route === requestedRoute) : -1;
        setStepIndex(savedIndex);
        if (requestedIndex >= 0 && event?.detail?.restart) {
          start(requestedIndex);
          return;
        }
        if ((current.status === 'paused' || current.status === 'running') && savedIndex > 0) setMode('resume');
        else start(0);
      };
      window.addEventListener('ocenka:start-onboarding', launch);
      return () => window.removeEventListener('ocenka:start-onboarding', launch);
    }, []);

    const current = TOUR_STEPS[stepIndex] || TOUR_STEPS[0];

    React.useEffect(() => {
      if (mode !== 'tour' || !current) return;
      if (current.route && active !== current.route && onNavigate) {
        onNavigate(current.route);
      }
      if (current.event?.name) {
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent(current.event.name, { detail: current.event.detail }));
        }, 0);
      }
    }, [mode, stepIndex, active]);

    React.useEffect(() => {
      if (mode !== 'tour' || !current) return;
      let cancelled = false;
      let attempts = 0;
      const refresh = () => {
        if (cancelled) return;
        const element = getTarget(current.target);
        if (element && targetVisible(element)) {
          try { element.scrollIntoView({ behavior:'smooth', block:'center', inline:'center' }); } catch {}
          window.setTimeout(() => {
            if (cancelled) return;
            const nextRect = element.getBoundingClientRect();
            setRect({
              top: nextRect.top,
              left: nextRect.left,
              width: nextRect.width,
              height: nextRect.height,
            });
            setTargetMissing(false);
          }, 220);
          return;
        }
        attempts += 1;
        setRect(null);
        setTargetMissing(attempts > 8);
        if (attempts <= 10) window.setTimeout(refresh, 120);
      };
      window.setTimeout(refresh, 80);
      window.addEventListener('resize', refresh);
      window.addEventListener('scroll', refresh, true);
      return () => {
        cancelled = true;
        window.removeEventListener('resize', refresh);
        window.removeEventListener('scroll', refresh, true);
      };
    }, [mode, stepIndex, active]);

    React.useEffect(() => {
      if (mode !== 'tour') return;
      persist({ status: 'running', stepIndex, autoDisabled: autoDisabled() });
      window.setTimeout(() => cardRef.current && cardRef.current.focus(), 0);
    }, [mode, stepIndex]);

    React.useEffect(() => {
      const onKey = (event) => {
        if (mode !== 'tour') return;
        if (event.key === 'Escape') {
          event.preventDefault();
          setMode('confirm');
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          if (stepIndex >= TOUR_STEPS.length - 1) finish();
          else setStepIndex((value) => clampStep(value + 1));
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setStepIndex((value) => clampStep(value - 1));
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [mode, stepIndex]);

    const skipIntro = () => {
      persist({ status: 'completed', stepIndex: 0, autoDisabled: false });
      setMode('idle');
    };
    const neverAuto = () => {
      persist({ status: 'never', stepIndex: 0, autoDisabled: true });
      setMode('idle');
    };
    const prev = () => setStepIndex((value) => clampStep(value - 1));
    const next = () => {
      if (stepIndex >= TOUR_STEPS.length - 1) finish();
      else setStepIndex((value) => clampStep(value + 1));
    };

    if (mode === 'intro') {
      return (
        <Modal
          title="Пройти короткое обучение?"
          text="Покажем основные разделы, создание заявки, расчет, отчет и проверку ФСО. Обучение можно остановить в любой момент."
          onClose={skipIntro}
        >
          <button type="button" onClick={skipIntro} style={buttonStyle('secondary')}>Пропустить</button>
          <button type="button" onClick={neverAuto} style={buttonStyle('secondary')}>Больше не показывать автоматически</button>
          <button type="button" onClick={() => start(0)} style={buttonStyle('primary')}>Начать обучение</button>
        </Modal>
      );
    }

    if (mode === 'resume') {
      return (
        <Modal
          title="Продолжить обучение?"
          text="Можно продолжить с последнего незавершенного шага или начать обзор заново."
          onClose={() => setMode('idle')}
        >
          <button type="button" onClick={() => setMode('idle')} style={buttonStyle('secondary')}>Отмена</button>
          <button type="button" onClick={() => start(0)} style={buttonStyle('secondary')}>Начать сначала</button>
          <button type="button" onClick={() => start(state.stepIndex || 0)} style={buttonStyle('primary')}>Продолжить</button>
        </Modal>
      );
    }

    if (mode === 'confirm') {
      return (
        <Modal
          title="Завершить обучение?"
          text="Вы сможете запустить его снова в разделе “Помощь”."
          onClose={() => setMode('tour')}
        >
          <button type="button" onClick={() => setMode('tour')} style={buttonStyle('secondary')}>Продолжить обучение</button>
          <button type="button" onClick={pause} style={buttonStyle('secondary')}>Продолжить позже</button>
          <button type="button" onClick={stop} style={buttonStyle('primary')}>Завершить</button>
        </Modal>
      );
    }

    if (mode !== 'tour' || !current) return null;

    const highlight = rect ? {
      top: rect.top - 6,
      left: rect.left - 6,
      width: rect.width + 12,
      height: rect.height + 12,
    } : null;
    const fallbackRect = { top: Math.round(window.innerHeight / 2 - 120), left: Math.round(window.innerWidth / 2 - 180), width: 360, height: 120 };
    const pos = panelPosition(rect || fallbackRect, rect ? current.placement : 'bottom');

    return (
      <div style={{ position:'fixed', inset:0, zIndex:110, pointerEvents:'none' }} aria-live="polite">
        {/* No highlight yet → dim the whole screen so the centered card stays readable.
            With a highlight, the spotlight shadow below handles the dimming and the
            target area is left fully bright for a strong, expressive accent. */}
        {highlight ? null : <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,.55)' }} />}
        {highlight ? (
          <div style={{
            position:'fixed',
            top:highlight.top,
            left:highlight.left,
            width:highlight.width,
            height:highlight.height,
            border:'2px solid var(--emerald-300)',
            borderRadius:'var(--radius-lg)',
            boxShadow:'0 0 0 9999px rgba(15,23,42,.68), 0 0 0 4px rgba(93,195,147,.55), 0 0 26px 6px rgba(93,195,147,.45)',
            transition:'all .2s var(--ease-out)',
          }} />
        ) : null}
        <div
          ref={cardRef}
          tabIndex={-1}
          role="dialog"
          aria-label={current.title}
          style={{
            position:'fixed',
            top:pos.top,
            left:pos.left,
            width:pos.width,
            pointerEvents:'auto',
            background:'var(--surface-card)',
            border:'1px solid var(--border-subtle)',
            borderRadius:'var(--radius-lg)',
            boxShadow:'var(--shadow-lg)',
            outline:'none',
            overflow:'hidden',
          }}
        >
          <div style={{ padding:'16px 18px 14px', borderBottom:'1px solid var(--divider)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
              <div>
                <div style={{ fontSize:'var(--text-xs)', fontWeight:800, color:'var(--blue-700)', textTransform:'uppercase', letterSpacing:'.05em' }}>
                  Шаг {stepIndex + 1} из {TOUR_STEPS.length}
                </div>
                <div style={{ marginTop:6, fontSize:'var(--text-lg)', fontWeight:800, color:'var(--text-strong)' }}>{current.title}</div>
              </div>
              <button type="button" aria-label="Закрыть обучение" onClick={() => setMode('confirm')} style={{ border:'none', background:'transparent', color:'var(--text-muted)', cursor:'pointer', padding:4 }}>
                <Icon n="x" size={18} />
              </button>
            </div>
            <div style={{ marginTop:8, color:'var(--text-body)', fontSize:'var(--text-sm)', lineHeight:1.5 }}>{current.text}</div>
            {targetMissing ? (
              <div style={{ marginTop:10, color:'var(--warning-text)', fontSize:'var(--text-xs)', lineHeight:1.4 }}>
                Элемент сейчас не найден на странице. Можно перейти дальше, обучение не прервется.
              </div>
            ) : null}
          </div>
          <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
            <button type="button" onClick={() => setMode('confirm')} style={{ ...buttonStyle('secondary'), height:34 }}>Пропустить</button>
            <div style={{ display:'flex', gap:8 }}>
              <button type="button" onClick={prev} disabled={stepIndex === 0} style={{ ...buttonStyle('secondary'), height:34, opacity:stepIndex === 0 ? .45 : 1, cursor:stepIndex === 0 ? 'default' : 'pointer' }}>
                Назад
              </button>
              <button type="button" onClick={next} style={{ ...buttonStyle('primary'), height:34 }}>
                {stepIndex >= TOUR_STEPS.length - 1 ? 'Завершить' : 'Далее'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
})();
