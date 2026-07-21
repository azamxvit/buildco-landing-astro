# Деплой и сдача — REAL CONSTRUCTION CO

## Архитектура

- **Frontend:** Astro static → CDN / хостинг (Vercel, Netlify, или nginx + `dist/`)
- **Контент:** статика в репозитории (`src/shared/config/site.ts`, `public/images/`, `public/certificates/`)
- **Формы:** Formspree → email `mn@realconstruction.kz`
- **Домен:** `realconstruction.kz` + SSL (Let's Encrypt)

## Frontend

```bash
cp .env.example .env
# PUBLIC_FORMSPREE_ID=...
# PUBLIC_GA_ID=...
# PUBLIC_YANDEX_METRIKA_ID=...

npm install
npm run build
# раздать папку dist/
```

## SSL

- Certbot / Cloudflare / хостинг-провайдер для `realconstruction.kz`

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

- Чеклист приёмки: `docs/ACCEPTANCE.md`
