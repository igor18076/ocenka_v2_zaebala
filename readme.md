# Оценка PRO v2

Приложение для оценщика недвижимости: заявки, объект, аналоги, расчёты, отчёты, ФСО, аналитика рынка.

## Деплой (один шаг)

Нужен только [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
npm run deploy
```

Откройте **http://localhost:4173/**  
Логин: `ocenka` · пароль печатается в консоль (и пишется в `.env`).

```bash
docker compose logs -f   # логи
docker compose down      # остановить
docker compose down -v   # остановить и стереть базу
```

Повторный `npm run deploy` пересобирает образ и поднимает контейнер; данные в volume `ocenka_data` сохраняются.

## Разработка без Docker

Node.js 22.5+:

```bash
npm run db:seed -- --force
npm run db:import
npm start
```

Production локально: `npm run start:prod`.

## HTTPS (по желанию)

В `.env`:

```bash
OCENKA_COOKIE_SECURE=true
OCENKA_TRUST_PROXY=true
```

Caddy:

```caddy
ocenka.example.com {
  reverse_proxy 127.0.0.1:4173
}
```

## Проверки

```bash
npm run check
npm test
npm run build
npm run smoke
```

## Что внутри

- Без REST API: данные в `data.js` из SQLite; правки заявок/расчётов — в `localStorage`.
- Рынок: CSV Inpars/Avito → `listings` → аналитика и «Подбор с рынка».
- Смена пароля: Настройки → form POST `/password`.
- Бэкап БД: `npm run db:backup`.
