# Оценка ИИ

Приложение для оценщика недвижимости: заявки, объект, аналоги, расчёты, отчёты, ФСО, аналитика рынка.

## Деплой (один шаг)

Нужен [Docker](https://www.docker.com/products/docker-desktop/) (на сервере — Docker Engine + Compose).

```bash
npm run deploy
```

Откройте **http://IP_СЕРВЕРА/** (порт 80, без `:4173`).  
Логин: `ocenka` · пароль печатается в консоль (и пишется в `.env`).

Снаружи слушает **Caddy** (80/443), приложение внутри сети Docker на `4173` не публикуется.

```bash
docker compose logs -f   # логи
docker compose down      # остановить
docker compose down -v   # остановить и стереть базу
```

## Домен и HTTPS

1. В DNS у регистратора создайте **A-запись**: `ocenka.example.com` → IP сервера.
2. Откройте на сервере порты **80** и **443** (firewall / security group).
3. В `.env`:

```bash
OCENKA_DOMAIN=ocenka.example.com
OCENKA_ACME_EMAIL=you@example.com
OCENKA_TRUST_PROXY=true
# после проверки, что https:// домен открывается:
OCENKA_COOKIE_SECURE=true
```

4. Перезапуск proxy:

```bash
docker compose up -d
```

Caddy сам получит сертификат Let's Encrypt. Сайт: **https://ocenka.example.com/**  
По IP по-прежнему доступен **http://IP/** (пока не отключите блок `http://` в entrypoint).

## Обновление на сервере

```bash
cd ~/ocenka
git pull origin main
docker compose build --no-cache
docker compose up -d
# в браузере: Ctrl+Shift+R
```

## Разработка без Docker

Node.js 22.5+:

```bash
npm run db:seed -- --force
npm run db:import
npm start
```

Production локально: `npm run start:prod` → http://localhost:4173/

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
