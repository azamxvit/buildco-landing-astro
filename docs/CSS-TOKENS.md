# CSS-токены

## Бренд

В `:root` заданы `--brand-*`. Акцент сайта — синий из лого RCC (`#005db7`).

| Токен | Назначение |
|---|---|
| `--brand-accent` | Основной акцент |
| `--brand-accent-hover` | Hover |
| `--brand-accent-dim` | Полупрозрачный акцент |
| `--brand-on-accent` | Текст/иконки **на** акцентном фоне (белый) |
| `--brand-sss` | Акцент кредита SULTAN SMART SYSTEM |

## Темы

| Класс | Назначение |
|---|---|
| `.theme` | Базовая тёмная тема |
| `.theme--elevated` | Приподнятый фон секции |
| `.theme--band` | Акцентная полоса (услуги / CTA), светлый текст на синем |
| `.theme--panel` | Тёмная карточка внутри band |

## Утилиты вместо arbitrary

| Класс | Заменяет |
|---|---|
| `.page-container` | `w-[min(100%-2.5rem,var(--container-max))] mx-auto` |
| `.eyebrow` | мелкий uppercase label с `text-accent` |
| `.display-title` | крупный display-заголовок секции |
| `text-on-accent` / `bg-accent` | кнопки и чипы на акцентном фоне |
| `text-sss` / `bg-sss` | цвет SSS без хардкода `#23D2A4` |
