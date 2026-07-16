import ru from "./ru";
import en from "./en";
import kz from "./kz";
import type { Locale, Messages } from "./types";

export type { Locale, Messages };
export { locales } from "./types";

export const messages: Record<Locale, Messages> = { ru, en, kz };

export function getMessages(locale: Locale = "ru"): Messages {
  return messages[locale] ?? messages.ru;
}
