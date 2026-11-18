const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)] as T[];
// шапка с тенью и мобильная кнопка после героя
const hdr = document.querySelector<HTMLElement>('[data-hdr]');
const sticky = document.querySelector<HTMLElement>('[data-sticky]');
const hero = document.getElementById('top');
const onScroll = () => {
  hdr?.classList.toggle('is-scrolled', scrollY > 8);
  if (sticky && hero) sticky.classList.toggle('is-on', hero.getBoundingClientRect().bottom < 0);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
// лайтбокс
const lb = document.querySelector<HTMLDialogElement>('[data-lb]');
const holder = document.querySelector<HTMLElement>('[data-photos]');
if (lb && holder) {
  const list: { full: string; cap: string }[] = JSON.parse(holder.dataset.photos!);
  const img = lb.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const cap = lb.querySelector<HTMLElement>('[data-lb-cap]')!;
  const cnt = lb.querySelector<HTMLElement>('[data-lb-count]')!;
  let cur = 0, opener: HTMLElement | null = null;
  const show = (i: number) => {
    cur = (i + list.length) % list.length;
    img.src = list[cur].full; img.alt = list[cur].cap; cap.textContent = list[cur].cap;
    cnt.textContent = `${cur + 1} / ${list.length}`;
  };
  $$<HTMLButtonElement>('[data-gal]').forEach((b) => b.addEventListener('click', () => {
    opener = b; show(Number(b.dataset.gal)); lb.showModal(); document.documentElement.classList.add('no-scroll');
  }));
  $$<HTMLButtonElement>('[data-lb-step]', lb).forEach((b) => b.addEventListener('click', () => show(cur + Number(b.dataset.lbStep))));
  lb.querySelector('[data-lb-close]')!.addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
  lb.addEventListener('close', () => { document.documentElement.classList.remove('no-scroll'); opener?.focus(); });
}
// форма «Проверить дату»: текст для WhatsApp + подсветка подходящего зала
const hallNames: Record<string, string> = { '60': 'малый зал (до 60 гостей)', '140': 'средний зал (до 140 гостей)', '500': 'большой зал (до 500 гостей)' };
const hallEls = $$<HTMLElement>('[data-hall]');
const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
const fmt = (v: string) => { const [y, m, d] = v.split('-'); return `${d}.${m}.${y}`; };
$$<HTMLFormElement>('[data-book]').forEach((f) => {
  const date = f.querySelector<HTMLInputElement>('[data-book-date]')!;
  const guests = f.querySelector<HTMLInputElement>('[data-book-guests]')!;
  const hint = f.querySelector<HTMLElement>('[data-book-hall]')!;
  const go = f.querySelector<HTMLAnchorElement>('[data-book-go]')!;
  date.min = today.toISOString().slice(0, 10);
  const update = () => {
    const n = Math.round(Number(guests.value));
    const occ = f.querySelector<HTMLInputElement>('input[type=radio]:checked')?.value;
    const fit = n > 0 ? hallEls.map((h) => Number(h.dataset.hall)).sort((a, b) => a - b).find((g) => n <= g) : undefined;
    hallEls.forEach((h) => h.classList.toggle('is-fit', fit !== undefined && Number(h.dataset.hall) === fit));
    if (n > 0) {
      hint.hidden = false;
      hint.textContent = fit ? `Подходит ${hallNames[String(fit)]}` : 'Больше 500 гостей: подскажем варианты в WhatsApp';
    } else hint.hidden = true;
    const parts = ['Здравствуйте! Пишу с сайта Royal Palace.'];
    parts.push(date.value ? `Свободна ли дата ${fmt(date.value)}?` : 'Хочу проверить дату.');
    if (n > 0) parts.push(`Гостей: ${n}.`);
    if (occ) parts.push(`Повод: ${occ.toLowerCase()}.`);
    if (fit) parts.push(`Подходит ${hallNames[String(fit)]}.`);
    parts.push('Подскажите, пожалуйста, стоимость.');
    go.href = `https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(parts.join(' '))}`;
  };
  f.addEventListener('input', update); f.addEventListener('change', update);
});
