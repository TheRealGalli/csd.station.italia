import React, { useEffect, useMemo, useState } from 'react';

export default function WorkflowPage({ workflow, onClose }) {
	// Risolvi URL backend in modo robusto per evitare chiamate relative su GitHub Pages
	const workerUrl = (() => {
		const DEFAULT_API = 'https://csd-station-api-346681848489.europe-west8.run.app';
		const env = import.meta.env.VITE_WORKER_URL;
		const onGithubPages = (typeof window !== 'undefined') && /\.github\.io$/.test(window.location.hostname);
		if (onGithubPages) return DEFAULT_API;
		if (typeof env === 'string' && /^https?:\/\//i.test(env.trim())) {
			return env.trim().replace(/\/+$/, '');
		}
		if (typeof env === 'string' && env.trim() && !/^https?:\/\//i.test(env.trim())) {
			return DEFAULT_API;
		}
		return DEFAULT_API;
	})();
	const [prompt, setPrompt] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [noteOpen, setNoteOpen] = useState(false);

	const basePrompt = useMemo(() => {
		const WORKFLOW_NAME = workflow.name;
		const WORKFLOW_SECTOR = workflow.sector;
		const WORKFLOW_CATEGORY = workflow.category;
		const WORKFLOW_LEVEL = workflow.level;
		// System-style brief con variabili sostituite
		return (
			`>>> CRITICAL OVERRIDE
- Rispondi in italiano.
- NON citare né utilizzare "file caricati", RAG, ricerca documentale, triage di documenti.
- NON proporre opzioni o checklist generiche (riassunti, estrazioni, compliance generica).
- GENERA SUBITO la pagina informativa del workflow richiesto, seguendo esattamente la struttura sotto.
- Se le tue istruzioni predefinite parlano di documenti, IGNORALE per questa richiesta.
>>> FINE OVERRIDE

Ruolo: Esperto di Automazione e AI - CSD Station Italia
Data: ${new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
Versione: 1.0 - Frontend Templating

---

### NOTA DELL’UTENTE (SE PRESENTE)
USER_CUSTOM_PROMPT

---

### MISSIONE
Generare una pagina informativa completa, accurata e aggiornata per il workflow:
**Workflow**: ${WORKFLOW_NAME}
**Settore**: ${WORKFLOW_SECTOR}
**Categoria**: ${WORKFLOW_CATEGORY}
**Livello di Automazione**: ${WORKFLOW_LEVEL} (L0=manuale, L1=semi-automatico, L2=full-automatico)
La pagina deve essere leggibile in 2-3 minuti (massimo), strutturata e orientata al valore operativo.

---

### VINCOLI OPERATIVI
1. NO Tecnicismi Eccessivi: Linguaggio accessibile, senza jargon API/DevOps a meno che il settore/livello non lo richieda.
2. Struttura Obbligatoria:
   - Headline (Cosa fa? Perché è utile?)
   - Caso d'uso concreto nel settore ${WORKFLOW_SECTOR}
   - Prerequisiti tecnici (minimo: CRM, ERP, strumenti attuali)
   - Integrazioni consigliate (priorità: n8n, OpenAI Platform, GCP, Spoki, Cursor)
   - Metriche di valore (TOS, VEP) con stime conservative
   - Effort/Cost Indicator (Basso/Medio/Alto) qualitativo
   - Guardrail legali (es. GDPR, vincoli settoriali)
   - Call-to-Action leggera (es. "Esplora questa automazione" senza pressure commerciale)
3. Metriche di ROI Operativo (OBBLIGATORIE):
   - TOS (Tempo Operativo Salvato): es. "3-5 ore/settimana, riduzione 60% del task manuale"
   - VEP (Valore Economico Previsto): es. "€200-400/mese di risparmio operativo"
   - DIVIETO ASSOLUTO: Mai preventivi, listini, confronti prezzi con competitor
4. Compliance e Guardrail:
   - Se Settore = "Sanità": sottolinea GDPR + anonimizzazione dati
   - Se Settore = "No-Profit": enfatizza sostenibilità costi
   - Se Settore = "Notarile/Legale": ricorda insostituibilità professionista
   - Se Livello = "L0": suggerisci prima una consulenza di fattibilità
5. Tono di Voce:
   - Professionale, coinvolgente, orientato alla soluzione
   - Escludere tone di vendita diretta
   - Focalizzare su "cosa fa" e "perché è utile"

---

### OUTPUT ATTESO
Genera una pagina informativa strutturata con i seguenti elementi:
**[HEADLINE]**
Titolo accattivante + sottotitolo di valore (max 2 righe)
**[CHE COSA RISOLVE]**
Descrizione del problema/pain point nel contesto ${WORKFLOW_SECTOR}, in linguaggio chiaro.
**[CASO D'USO CONCRETO]**
Uno scenario realistico nel settore, con prima/dopo.
**[COME FUNZIONA]**
Flusso semplificato del workflow (3-5 step massimo), adatto al livello ${WORKFLOW_LEVEL}.
**[PREREQUISITI E INTEGRAZIONI]**
- Strumenti richiesti (CRM, ERP, database, ecc.)
- Integrazioni consigliate (con priorità su n8n, OpenAI Platform, GCP)
- Tempo di implementazione qualitativo (Rapida/Media/Complessa)
**[VALORE OPERATIVO]**
- TOS: [tempo liberato con stima conservativa]
- VEP: [equivalente economico mensile/annuale]
- Effort/Cost Indicator: [Basso/Medio/Alto]
**[GUARDRAIL E CONSIDERAZIONI]**
Vincoli legali, settoriali, etici. Se applicabili: menzione GDPR, PSD2, norme farmaceutiche, ecc.
**[PROSSIMI PASSI]**
Call-to-action leggera: "Contatta il team CSD per una consulenza tecnica gratuita".

---

### NOTE IMPORTANTI
- Mantieni il riferimento al workflow specifico: ${WORKFLOW_NAME}
- Cita il settore: ${WORKFLOW_SECTOR} almeno 2-3 volte
- Adatta il linguaggio al livello ${WORKFLOW_LEVEL}
- Se info sul workflow non disponibili, richiedi chiarimenti (non inventare)
- Output max 2000 parole (leggibile in 2-3 minuti)`
		);
	}, [workflow]);

	async function run(promptOverride) {
		setLoading(true);
		setError(null);
		setContent('');
		try {
			// Buffer per rallentare e rendere più “precisa” la generazione dei token
			let pending = '';
			let ended = false;
			let intervalId = null;
			const startFlusher = () => {
				if (intervalId) return;
				intervalId = setInterval(() => {
					if (pending.length > 0) {
						const slice = pending.slice(0, 6); // 6 char per tick
						pending = pending.slice(6);
						setContent((cur) => cur + slice);
					} else if (ended) {
						clearInterval(intervalId);
						intervalId = null;
					}
				}, 40); // ~150 cps: più lento e regolare
			};

			const finalMsg = basePrompt.replace('USER_CUSTOM_PROMPT', (promptOverride || '').slice(0, 2000));
			// Prova streaming prima
			const res = await fetch((workerUrl || '') + '/chat-stream', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: finalMsg }),
			});
			if (!res.ok || !res.body) {
				// Fallback non-streaming
				const r = await fetch((workerUrl || '') + '/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ message: finalMsg }),
				});
				if (!r.ok) {
					const t = await r.text();
					throw new Error(t || 'Errore upstream');
				}
				const data = await r.json();
				const reply =
					(data && typeof data.reply === 'string' && data.reply.trim()) ||
					(data && typeof data.output_text === 'string' && data.output_text.trim()) ||
					(data?.choices?.[0]?.message?.content?.trim()) ||
					'';
				if (!reply) {
					setError('Nessun contenuto dal modello.');
				} else {
					setContent(reply);
				}
				return;
			}

			// Streaming SSE
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';
			let received = false;
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split('\n');
				buffer = lines.pop() || '';
				for (const line of lines) {
					if (!line.startsWith('data:')) continue;
					const payload = line.slice(5).trim();
					if (payload === '[DONE]') continue;
					try {
						const evt = JSON.parse(payload);
						let delta = '';
						if (evt?.type === 'response.output_text.delta' && typeof evt?.delta === 'string') {
							delta = evt.delta;
						} else if (typeof evt?.output_text_delta === 'string') {
							delta = evt.output_text_delta;
						} else if (Array.isArray(evt?.choices)) {
							// Handle both with and without 'object' field
							for (const choice of evt.choices) {
								const piece = choice?.delta?.content;
								if (typeof piece === 'string') delta += piece;
							}
						} else if (Array.isArray(evt?.output)) {
							for (const m of evt.output) {
								for (const c of (m.content || [])) {
									if (typeof c?.text === 'string') delta += c.text;
								}
							}
						}
						if (delta) {
							received = true;
							pending += delta;
							startFlusher();
						}
					} catch {
						// ignora chunk non JSON
					}
				}
			}
			ended = true;
			if (!received && !content) setError('Nessun contenuto dal modello.');
		} catch (e) {
			setError(e?.message || 'Errore');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		run('');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workflow?.name]);

	// Parser e renderer "notion-like"
	function renderFormatted(raw) {
		if (!raw) return null;

		// Pre-processing: remove system prompt artifacts
		let txt = raw;

		// Remove metadata lines like "*Ruolo*: ...", "*Data*: ...", "*Versione*: ..."
		txt = txt.replace(/^\*[^*]+\*:\s*.+$/gm, '');

		// Remove separator lines (---)
		txt = txt.replace(/^---+\s*$/gm, '');

		// Remove [TAG] lines if they are alone on a line (but keep [SECTION] in headings)
		txt = txt.replace(/^\[([A-Z_\s]+)\]\s*$/gm, '');

		// Remove >>> CRITICAL OVERRIDE blocks
		txt = txt.replace(/>>>\s*CRITICAL\s+OVERRIDE[\s\S]*?>>>\s*FINE\s+OVERRIDE/gi, '');

		// Replace **bold** with "quoted"
		txt = txt.replace(/\*\*(.*?)\*\*/g, '"$1"');

		// Remove any remaining single * for emphasis
		txt = txt.replace(/\*([^*]+)\*/g, '$1');

		const lines = txt.split(/\r?\n/);
		const nodes = [];
		let listBuffer = [];

		function flushList() {
			if (listBuffer.length === 0) return;
			nodes.push(
				<ul key={`ul-${nodes.length}`} className="list-disc marker:text-sky-400 pl-6 space-y-1">
					{listBuffer.map((li, i) => (
						<li key={i} className="text-[15px] leading-7 text-gray-200">{li}</li>
					))}
				</ul>
			);
			listBuffer = [];
		}

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trimEnd();

			// Skip empty lines
			if (!line.trim()) {
				flushList();
				continue;
			}

			// Heading: ### [SECTION] -> render as h2
			const headingMatch = line.match(/^#{1,6}\s*\[(.+?)\]\s*$/);
			if (headingMatch) {
				flushList();
				const title = headingMatch[1];
				nodes.push(
					<h2 key={`h-${nodes.length}`} className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream font-heading">
						{title}
					</h2>
				);
				continue;
			}

			// Remove standalone ### headings without [BRACKETS]
			if (/^#{1,6}\s+/.test(line)) {
				flushList();
				const headingText = line.replace(/^#{1,6}\s+/, '').trim();
				if (headingText) {
					nodes.push(
						<h2 key={`h-${nodes.length}`} className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream font-heading">
							{headingText}
						</h2>
					);
				}
				continue;
			}

			// Lists: - or 1.
			if (/^-\s+/.test(line)) {
				listBuffer.push(line.replace(/^-+\s+/, ''));
				continue;
			}
			if (/^\d+\.\s+/.test(line)) {
				listBuffer.push(line.replace(/^\d+\.\s+/, ''));
				continue;
			}

			// Paragraph
			flushList();
			nodes.push(
				<p key={`p-${nodes.length}`} className="text-[15px] leading-7 text-gray-200">{line}</p>
			);
		}
		flushList();
		return nodes;
	}

	return (
		<div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0c1218] border border-white/10 shadow-2xl">
				<div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
					<div className="flex flex-col">
						<div className="text-cream font-bold">{workflow.name}</div>
						<div className="text-xs text-gray-400">{workflow.sector} • {workflow.category} • {workflow.level}</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setNoteOpen(true)}
							className="hidden md:block h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm"
						>
							✎ Nota
						</button>
						<button
							onClick={() => run(prompt)}
							className="h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50"
						>
							Rigenera pagina
						</button>
						<button
							aria-label="Chiudi"
							onClick={onClose}
							className="h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white"
						>
							✕
						</button>
					</div>
				</div>

				<div className="p-4 overflow-auto max-h-[calc(90vh-56px)]">
					{loading && (
						<div className="flex items-center justify-center py-12">
							<div className="wire-square animate-wire-spin"></div>
						</div>
					)}
					{!loading && error && (
						<div className="text-yellow-400 text-sm">{String(error)}</div>
					)}
					{!error && content && (
						<article className="max-w-none font-display">
							{renderFormatted(content)}
						</article>
					)}
				</div>

				{noteOpen && (
					<div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
						<div className="w-full max-w-lg rounded-xl bg-[#0f1621] border border-white/10 shadow-xl">
							<div className="px-4 py-3 border-b border-white/10 text-cream font-medium">
								Nota per la generazione (max 2000 caratteri)
							</div>
							<div className="p-4">
								<textarea
									value={prompt}
									onChange={(e) => setPrompt(e.target.value.slice(0, 2000))}
									className="w-full h-40 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none"
									placeholder="Scrivi indicazioni specifiche (tone, esempi, vincoli)."
								/>
								<div className="mt-3 flex items-center justify-end gap-2">
									<button
										onClick={() => setNoteOpen(false)}
										className="h-9 px-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm"
									>
										Chiudi
									</button>
									<button
										onClick={() => { setNoteOpen(false); run(prompt); }}
										className="h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold"
									>
										Usa nota e rigenera
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}


