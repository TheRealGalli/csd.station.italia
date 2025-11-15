// Parser dinamico dal testo "raw" per caricare l'intero catalogo senza doverlo hardcodare.
// Incolla/aggiorna il catalogo in workflows_raw.txt; questo file lo parserà in un array di oggetti.
import raw from './workflows_raw.txt?raw';

const CATEGORIES = new Set(['No-IA', 'Generativo', 'Conversazionale', 'Agentico', 'Predittiva', 'Altro']);
const LEVELS = new Set(['L0', 'L1', 'L2']);

function normalizeSector(line) {
	const l = line.replace(/\s*\(Cont\.\)\s*$/i, '').trim();
	if (/^Agenzial/i.test(l)) return 'Agenzie Immobiliari';
	return l;
}

export const workflows = (() => {
	const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
	const items = [];
	let currentSector = '';
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		// Heuristic: se è un livello → non è settore; se è categoria → non è settore; se è Lx → no
		if (LEVELS.has(line) || CATEGORIES.has(line)) continue;
		// Possibile settore: se prossime due righe sono [name, category, level]
		const next = lines[i + 1], next2 = lines[i + 2], next3 = lines[i + 3];
		// Se le prossime tre righe formano una tripletta valida, la prima è un settore
		if (next && next2 && next3 && CATEGORIES.has(next2) && LEVELS.has(next3)) {
			currentSector = normalizeSector(line);
			items.push({ sector: currentSector, name: next, category: next2, level: next3 });
			i += 3;
			continue;
		}
		// Altrimenti se abbiamo già un settore corrente, prova a leggere tripletta (name, category, level)
		if (currentSector && next && CATEGORIES.has(next2) && LEVELS.has(next3)) {
			items.push({ sector: currentSector, name: line, category: next2, level: next3 });
			i += 3;
			continue;
		}
		// Se linea è chiaramente un header o descrizione, ignorala
		if (/^Catalogo|Settore$|Macro Categoria$|Livello Digitalizzazione$/i.test(line)) continue;
		// Se line sembra proprio un settore (riappare dopo "Cont.") senza tripletta immediata, aggiorna settore
		if (!CATEGORIES.has(line) && !LEVELS.has(line) && !/:/.test(line)) {
			currentSector = normalizeSector(line);
			continue;
		}
	}
	return items;
})();



