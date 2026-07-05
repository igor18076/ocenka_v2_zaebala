# Оценка PRO v2

Рабочий прототип приложения для оценщика недвижимости: заявки, карточка объекта, аналоги, расчеты, отчеты, проверка ФСО и аналитика рынка.

## Запуск

Требуется Node.js 22.5+.

```bash
npm run db:seed
npm start
```

Откройте `http://localhost:4173/`.

## Docker

Самый простой запуск:

```bash
docker compose up -d --build
```

Откройте `http://localhost:4173/`.

Данные SQLite хранятся в Docker volume `ocenka12_ocenka_data` и переживают пересоздание контейнера.

Полезные команды:

```bash
docker compose ps
docker compose logs -f
docker compose down
```

Пересоздать базу с другим seed-паролем можно только до первого запуска volume:

```bash
OCENKA_SEED_PASSWORD=strong-password docker compose up -d --build
```

Если нужно полностью сбросить данные:

```bash
docker compose down -v
docker compose up -d --build
```

### Ubuntu 26.04

На чистом сервере с установленным Docker:

```bash
git clone <repo-url> ocenka-pro
cd ocenka-pro
docker compose up -d --build
```

Если открываете приложение с другой машины, разрешите порт на сервере:

```bash
sudo ufw allow 4173/tcp
```

Доступ по умолчанию:

```text
login: ocenka
password: ocenka123
```

Если приложение публикуется за HTTPS-прокси, можно включить атрибут `Secure` у cookie сессии:

```yaml
environment:
  OCENKA_COOKIE_SECURE: "true"
```

Пароль seed-пользователя можно переопределить перед пересозданием базы:

```bash
set OCENKA_SEED_PASSWORD=your-password
npm run db:seed
```

## Проверки

```bash
npm run check
npm run smoke
```

`npm run check` проверяет синтаксис backend-скриптов.  
`npm run smoke` поднимает backend на тестовом порту, проверяет защиту приложения формой входа, авторизацию, logout, загрузку приложения, генерацию `data.js`, нормализацию заявок `03-####`, наличие заявок и таблиц НЦС.

## Архитектура

- `backend/server.js` - Node.js сервер, форма входа, сессии, статическая раздача frontend.
- `backend/db/schema.sql` - SQLite-схема.
- `backend/scripts/seed.js` - наполнение базы из seed-файлов.
- `backend/seed/initial-data.json` - основные данные приложения.
- `backend/seed/ncs-tables.json` - таблицы НЦС и коэффициенты для затратного подхода.
- `ui_kits/ocenka-app-v2/` - основной frontend.
- `components/`, `tokens/`, `styles.css` - дизайн-система.
- `uml/` - PlantUML-диаграммы проекта.

Backend не предоставляет REST API. Frontend получает данные через генерируемый `data.js`, который сервер собирает из SQLite.

## Текущее состояние

- Тестовые данные frontend вынесены в SQLite.
- Вход обязателен перед доступом к приложению.
- Вкладка `Заявки` реализована как канбан-доска с фильтрами, созданием заявки, drag-and-drop и локальным сохранением состояния.
- Затратный подход считает по формуле НЦС с НДС.
- Таблицы НЦС из PDF перенесены в seed и подставляют параметры формулы.
- В аналитике рынка добавлены графики динамики цены за м2 и аренды.

## Важные замечания

- Изменения на канбан-доске сохраняются локально в `localStorage`; это осознанно, так как REST API не добавлялся.
- После изменения seed-файлов выполните `npm run db:seed`.
- Не редактируйте `node_modules/`.
