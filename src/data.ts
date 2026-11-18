export const site = {
  name: 'Royal Palace',
  origin: 'https://royal-palace.a-a-studio.workers.dev',
  phoneDisplay: '+7 771 579 05 55',
  phoneE164: '+77715790555',
  wa: '77715790555',
  instagram: 'https://www.instagram.com/royal.palace.astana/',
  igHandle: '@royal.palace.astana',
  address: 'ул. Чингиза Айтматова, 58',
  city: 'Астана',
  gis: 'https://2gis.kz/astana/firm/70000001081186323',
  rating: { value: '5', num: 5, marks: 2465, reviews: 495 },
};
/** Средний чек 10–50 тыс ₸: показываем только после подтверждения по 2ГИС (сейчас источник — restoran.kz). */
export const showCheck = false;

const msg = (what?: string) =>
  `Здравствуйте! Пишу с сайта Royal Palace.${what ? ` ${what}` : ''} Подскажите, пожалуйста, свободные даты и стоимость.`;
export const waUrl = (what?: string) => `https://wa.me/${site.wa}?text=${encodeURIComponent(msg(what))}`;

export type Hall = { id: string; name: string; guests: number; facts: string[] };
export const halls: Hall[] = [
  { id: 'big', name: 'Большой зал', guests: 500, facts: ['4 экрана, из них 2 LED на всю стену', 'Свет, звук и лазерное шоу', 'Цветочная лестница и фотозона'] },
  { id: 'mid', name: 'Средний зал', guests: 140, facts: ['Обновлённый LED-экран', 'Для свадеб, юбилеев и корпоративов'] },
  { id: 'small', name: 'Малый зал', guests: 60, facts: ['Фуршет и VIP-караоке', 'Құдалық, юбилеи, дни рождения'] },
];
export const hallMsg = (h: Hall) => `Интересует ${h.name.toLowerCase()} (до ${h.guests} гостей).`;

export const gallery = [
  { src: 'p3.webp', cap: 'Зал с лепниной и витражом' },
  { src: 'p4.webp', cap: 'Сервировка и LED-экран' },
  { src: 'p6.webp', cap: 'Стол для фуршета' },
];

/** Новогодняя полоса (пост 21.09.2026 «Открыта бронь на новогодние корпоративы»). После праздников — false. */
export const showNewYear = true;
export const occasions = ['Свадьба', 'Той', 'Қыз ұзату', 'Юбилей', 'Корпоратив', 'Новый год'];
