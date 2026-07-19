# Деплой и сдача — REAL CONSTRUCTION CO

## Архитектура

- **Frontend:** Astro static → CDN / хостинг (Vercel, Netlify, или nginx + `dist/`)
- **CMS:** Strapi на VPS (Node 18–22) + SQLite (старт) или Postgres (прод)
- **Формы:** Formspree → email `mn@realconstruction.kz`
- **Домен:** `realconstruction.kz` + SSL (Let's Encrypt)

## Frontend

```bash
cp .env.example .env
# PUBLIC_FORMSPREE_ID=...
# PUBLIC_STRAPI_URL=https://cms.realconstruction.kz
# STRAPI_API_TOKEN=...
# PUBLIC_GA_ID=...
# PUBLIC_YANDEX_METRIKA_ID=...

npm install
npm run build
# раздать папку dist/
```

## CMS (Strapi)

```bash
cd cms
cp .env.example .env   # сменить все секреты!
npm install
npm run build
npm run start          # или pm2 / systemd
```

Рекомендуется reverse-proxy (nginx) с HTTPS на порт 1337.

## Backup

- Ежедневная копия `cms/.tmp/data.db` (SQLite) или `pg_dump` (Postgres)
- Копия `cms/public/uploads/`
- Хранить минимум 7 дней офсайт (S3 / другой диск)

## SSL

- Certbot / Cloudflare / хостинг-провайдер для `realconstruction.kz` и `cms.realconstruction.kz`

## Аналитика

В `.env` фронтенда задайте:

```
PUBLIC_GA_ID=G-XXXXXXXX
PUBLIC_YANDEX_METRIKA_ID=00000000
```

Скрипты подключаются в `BaseLayout.astro` только если переменные заданы.

## WhatsApp / телефон

Плавающие кнопки уже на сайте (`FloatingContact`). Номер: `+7 (701) 777-94-05`.

## Документы сдачи

- Инструкция CMS: `docs/CMS-GUIDE.md`
- Чеклист приёмки: `docs/ACCEPTANCE.md`
