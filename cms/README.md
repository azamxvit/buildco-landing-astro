# Strapi CMS — REAL CONSTRUCTION CO

> Требуется **Node.js 18–22** (Strapi 5). Рекомендуется `nvm use 20`. На Node 24 установка может не пройти.

## Setup

```bash
# из корня репозитория или из cms/
cd cms
cp .env.example .env
# смените все секреты в .env
nvm use 20   # важно
npm install
npm run develop
```

Open http://localhost:1337/admin and create the first administrator.

При первом запуске bootstrap засеет услуги, проекты, партнёров и сертификаты из `seed/data.ts` (если коллекции пустые).

После создания admin: **Settings → Users & Permissions → Roles → Public** — включите `find` / `findOne` для Service, Project, Partner, Certificate.

## Content types

Already defined under `src/api/`:

- **Service** — slug, title (i18n), description, features, icon, gallery
- **Project** — slug, title, category, photos, relation to Service
- **Partner** — name, logo, order
- **Certificate** — code, title, PDF file

Locales: `ru` (default), `en`, `kk` (настроить в Admin → Internationalization).

## Public API

In Admin → Settings → Users & Permissions → Roles → Public, enable `find` / `findOne` for all content types.

Create an API Token (Read-only) and put it in the Astro `.env`:

```
PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token
```

Если `PUBLIC_STRAPI_URL` не задан, Astro использует статический контент из `site.ts` / messages.

## Roles (ТЗ)

- **Administrator** — full access (default Super Admin)
- **Editor** — create a role with CRUD on content types only (no Settings)

## Связанные документы

- Инструкция редактора: [`docs/CMS-GUIDE.md`](../docs/CMS-GUIDE.md)
- Деплой: [`docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md)
