# Ocenka App — UI Kit

High-fidelity recreation of the **Оценка PRO** appraiser workspace. A click-through
prototype built from the design-system primitives (no re-implemented components).

## Run
Run the backend from the project root and open
`http://localhost:4173/ui_kits/ocenka-app/index.html`. If you are not authenticated, the
backend redirects to `/login`.

```bash
npm run db:seed
npm start
```

Default seed credentials are `igor` / `ocenka123`.

The compiled bundle (`_ds_bundle.js`) and `styles.css` load from the project root; Lucide icons
load from CDN. Application data is generated from SQLite by the backend.

## Screens
- **DashboardScreen** — hero, 5 KPI tiles, recent-requests table
- **RequestsScreen** — full заявки list with status tabs + search
- **ObjectScreen** — карточка объекта: параметры / документы / фотографии + side summary
- **AnalogsScreen** — подбор аналогов table with adjustments & comparability badges
- **CalcScreen** — три подхода (сравнительный / доходный / затратный) + согласование
- **FsoScreen** — interactive ФСО checklist with live progress ring
- **ReportScreen** — генерация отчета (DOCX / PDF / отправить на проверку)
- **ClientsScreen**, **SettingsScreen** — supporting views
- **Sidebar / Topbar** — app shell

## Interactions
Sidebar switches views · request rows open the object card · FSO checklist items toggle and
update the % ring live · report buttons fire a toast · "Новая оценка" fires a toast.

## Composition
Each screen file assigns a component to `window` (Babel scripts don't share scope). `_shared.jsx`
exposes `window.NS` (the DS namespace), `Icon`, `PageHead`, `DetailField`. `data.js` is generated
from the backend database into `window.OcenkaData`.
