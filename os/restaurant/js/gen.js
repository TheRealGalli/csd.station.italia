// Generatore di pratiche credibili per le missioni: stessi documenti, valori sempre diversi.
// Gli errori sono quelli che capitano davvero: cifre scambiate o lette male, una lettera fuori posto, un arrotondamento.
export const int = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = list => list[Math.floor(Math.random() * list.length)];
export const shuffle = list => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const firsts = ['Mario', 'Chiara', 'Davide', 'Lucia', 'Franco', 'Elena', 'Paolo', 'Giulia', 'Stefano', 'Irene', 'Roberto', 'Sara', 'Marco', 'Anna', 'Luca', 'Laura', 'Tommaso', 'Marta'];
const lasts = ['Rossi', 'Bassi', 'Neri', 'Galli', 'Lodi', 'Pini', 'Villa', 'Sarti', 'Fabbri', 'Moretti', 'Ricci', 'Guidi', 'Bianchi', 'Sacchi', 'Doni', 'Fontana', 'Bellini', 'Carraresi'];
export const cities = ['Firenze', 'Sesto Fiorentino', 'Fiesole', 'Prato', 'Empoli', 'Bagno a Ripoli', 'Scandicci', 'Impruneta'];
export const streets = ['via dei Tigli', 'via Gramsci', 'via Faentina', 'viale Mazzini', 'via Roma', 'via del Sole', 'via Bolognese', 'via Pisana'];
export const banks = [['Banca Arno', 'bancaarno'], ['Credito Fiorentino', 'creditofiorentino'], ['Banca del Mugello', 'bancamugello'], ['Cassa di Prato', 'cassaprato']];
export const lawyers = [['Avv. Federica Lorenzi', 'lorenzi'], ['Avv. Paolo Moretti', 'moretti'], ['Studio legale Bertelli', 'bertelli'], ['Avv. Silvia Righi', 'righi']];
const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const monthCode = 'ABCDEHLMPRST';
const vowels = /[AEIOU]/;

export function person() {
 const first = pick(firsts), last = pick(lasts), female = /a$/.test(first) && first !== 'Luca';
 const day = int(1, 28), month = int(0, 11), year = int(1952, 1994);
 const born = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
 const code = s => { const u = s.toUpperCase(), c = [...u].filter(x => !vowels.test(x)), v = [...u].filter(x => vowels.test(x)); return [...c, ...v, 'X', 'X'].slice(0, 3).join(''); };
 const cf = `${code(last)}${code(first)}${String(year).slice(2)}${monthCode[month]}${String(day + (female ? 40 : 0)).padStart(2, '0')}D612${pick([...'ABCDEFGHLMNPRSTUVZ'])}`;
 return {first, last, name:`${first} ${last}`, born, place:pick(cities), cf};
}
export function iban() {
 const d = n => Array.from({length:n}, () => int(0, 9)).join('');
 const raw = `IT${d(2)}${pick([...'ABCDEFGHLMNPRSTUVXZ'])}${d(5)}${d(5)}${d(12)}`;
 return raw.replace(/(.{4})/g, '$1 ').trim();
}
export function catasto() { return {fg:int(3, 98), part:int(100, 1999), sub:int(1, 28), cat:pick(['A/2', 'A/3', 'A/7', 'C/6'])}; }
export function amount() { return int(12, 64) * 500 + pick([0, 0, 200, 300]); }
export const euro = n => `€ ${n.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
export const dateLong = (d, m, y = 2026) => `${d} ${months[m]} ${y}`;

// ————— errori credibili —————
const lookalike = {'0':'8', '1':'7', '2':'7', '3':'8', '4':'9', '5':'6', '6':'8', '7':'1', '8':'6', '9':'4'};
export function typoNumber(n) {
 const s = String(n);
 if (s.length > 1 && s[0] !== s[1] && Math.random() < .5) return +(s[1] + s[0] + s.slice(2));
 const i = s.length - 1;
 return +(s.slice(0, i) + lookalike[s[i]]);
}
export function typoText(s) {
 const chars = [...s], letters = chars.map((c, i) => /[A-Za-z0-9]/.test(c) ? i : -1).filter(i => i > 0 && i < chars.length - 2);
 const i = pick(letters), j = i + 1;
 if (/[0-9]/.test(chars[i]) && Math.random() < .6) chars[i] = lookalike[chars[i]];
 else if (chars[i] !== chars[j] && /[A-Za-z0-9]/.test(chars[j])) [chars[i], chars[j]] = [chars[j], chars[i]];
 else chars[i] = chars[i] === 'A' ? 'E' : 'A';
 return chars.join('');
}
export function typoDate(s) { const [d, m, y] = s.split('/'); return d[0] !== d[1] && +`${d[1]}${d[0]}` <= 28 ? `${d[1]}${d[0]}/${m}/${y}` : `${d}/${m}/${y.slice(0, 3)}${(+y[3] + 1) % 10}`; }
export const roundUp = n => Math.ceil((n + 1) / 1000) * 1000;
