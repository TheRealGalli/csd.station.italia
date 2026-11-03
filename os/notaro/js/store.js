// Stato locale dell'anteprima: solo ciò che l'utente decide (approvazioni, attività chiuse, preferenze).
// I contenuti dello studio dimostrativo restano in demo.js e non vengono mai salvati.
export const KEY = 'csd.notaro.workspace.v2';
export const initial = () => ({version:2, handled:[], done:[], sent:[], rules:{}, tour:false});

export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Grassetto minimale per le risposte di Otto: **testo** → <b>, tutto il resto viene sanificato.
export const rich = value => esc(value).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

const list = v => Array.isArray(v) ? v.filter(x => typeof x === 'string' && x.length <= 80).slice(0, 500) : [];
export function validateState(data) {
 if (!data || typeof data !== 'object' || data.version !== 2) throw Error('Stato non compatibile.');
 const s = initial();
 s.handled = list(data.handled); s.done = list(data.done); s.sent = list(data.sent); s.tour = data.tour === true;
 if (data.rules && typeof data.rules === 'object') for (const [k, v] of Object.entries(data.rules)) if (/^[\w-]{1,60}$/.test(k) && typeof v === 'boolean') s.rules[k] = v;
 return s;
}

function read() {
 try { const raw = localStorage.getItem(KEY); return raw ? validateState(JSON.parse(raw)) : initial(); }
 catch { return initial(); }
}
export const state = typeof window === 'undefined' ? initial() : read();
export function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; } }
export function toggle(listName, id) {
 const arr = state[listName]; const i = arr.indexOf(id);
 if (i >= 0) arr.splice(i, 1); else arr.push(id);
 persist(); return i < 0;
}
export function reset() { Object.assign(state, initial()); persist(); }
