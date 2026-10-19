// Riquadri fissi per gli elenchi che crescono (identico in CS Restaurant OS e CS Notaro OS).
// Ogni elenco vivo (documenti, ordini, email, feed…) sta in un riquadro di altezza fissa che si scorre:
// la pagina non si allunga e non si accorcia mentre il servizio va avanti, e le schede restano allineate.
// Quando un elenco è lungo compare la lente: si cerca dentro l'elenco, e la ricerca resta anche quando arrivano dati nuovi.
const queries = {};
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const lens = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>';
const rowsOf = box => {
 const body = box.querySelector('tbody'); if (body) return [...body.children];
 const items = box.querySelectorAll(':scope > .list-item, :scope > article, :scope > li, :scope > .review, :scope > .grant');
 return [...(items.length ? items : box.children)].filter(r => !r.classList.contains('panel-none') && !r.matches('[data-anchor], .filter-tabs'));
};

function apply(box, text) {
 const t = (text || '').toLowerCase().trim();
 let shown = 0;
 rowsOf(box).forEach(r => { const ok = !t || r.textContent.toLowerCase().includes(t); r.hidden = !ok; if (ok) shown++; });
 let none = box.querySelector(':scope > .panel-none');
 if (t && !shown) { if (!none) { none = document.createElement('p'); none.className = 'panel-none'; box.append(none); } none.textContent = `Nessun risultato per “${text.trim()}”.`; }
 else none?.remove();
}

// root: il contenuto della pagina; page: la sezione; live: selettori degli elenchi che crescono (altezza fissa, non solo massima)
export function enhancePanels(root, page, live = []) {
 if (!root) return;
 const boxes = [...root.querySelectorAll(['.table-scroll', '.feed-list', '.panel-scroll', '.review-list', '.grant-list', '.list-pane', ...live].join(', '))].filter((b, i, a) => a.indexOf(b) === i && !b.closest('.game-slot, .mg, dialog, .guest-phone'));
 boxes.forEach((box, i) => {
  const key = `${page}:${i}`;
  box.classList.add('fixed-scroll'); box.dataset.panelKey = key;
  if (live.some(sel => box.matches(sel))) box.classList.add('is-live');
  // la lente va nell'intestazione della scheda, oppure accanto ai filtri dell'elenco (posta, chiamate, chat)
  const title = (box.matches('section') ? null : box.closest('.workspace-panel, .feed-panel, section'))?.querySelector(':scope > .panel-title') || box.querySelector(':scope > .filter-tabs');
  if (title && !title.querySelector('.panel-search') && (rowsOf(box).length > 5 || queries[key])) {
   title.insertAdjacentHTML('beforeend', `<label class="panel-search">${lens}<input type="search" placeholder="Cerca" value="${esc(queries[key] || '')}" data-panel-filter="${key}" aria-label="Cerca in questo elenco"></label>`);
  }
  if (queries[key]) apply(box, queries[key]);
 });
}
document.addEventListener('input', e => {
 const input = e.target.closest?.('[data-panel-filter]'); if (!input) return;
 const key = input.dataset.panelFilter; queries[key] = input.value;
 const box = document.querySelector(`[data-panel-key="${key}"]`); if (box) apply(box, input.value);
});
