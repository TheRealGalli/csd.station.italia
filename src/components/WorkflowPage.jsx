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

		return (
			`Genera una pagina informativa strutturata per il workflow "${WORKFLOW_NAME}" (${WORKFLOW_SECTOR} - ${WORKFLOW_CATEGORY} - ${WORKFLOW_LEVEL}).

LIVELLI DI COMPLESSITÀ TECNOLOGICA:
- L0 (Base): Soluzioni no-code/low-code, accesso manuale, strumenti entry-level. Richiede competenze minime.
- L1 (Intermedio): Integrazioni API, automazioni semi-automatiche, strumenti di orchestrazione (n8n, Zapier). Richiede competenze tecniche moderate.
- L2 (Avanzato): Workflow completamente automatizzati, AI/ML, backend custom, cloud-native. Richiede competenze tecniche avanzate.

Il workflow attuale è livello ${WORKFLOW_LEVEL}. Adatta contenuti, prerequisiti e complessità di conseguenza.

REGOLE DI FORMATTAZIONE OBBLIGATORIE:
- Usa ### [TITOLO SEZIONE] per le sezioni principali
- Usa **testo** per enfasi (verrà convertito in virgolette)
- Usa liste puntate con - per elenchi
- Scrivi paragrafi brevi (max 3-4 righe)
- Non usare markdown complesso (tabelle, codice)

STRUTTURA OBBLIGATORIA:

### [HEADLINE]
Scrivi un titolo accattivante seguito da un sottotitolo di valore (max 2 righe). Enfatizza il beneficio principale.

### [CHE COSA RISOLVE]
Descrivi il problema/pain point specifico nel contesto ${WORKFLOW_SECTOR} in modo chiaro e diretto. Spiega perché questo workflow è rilevante.

### [CASO D'USO CONCRETO]
Presenta uno scenario realistico nel settore con "prima/dopo":
- Situazione attuale (senza automazione)
- Come il workflow trasforma il processo
- Risultati tangibili

### [COME FUNZIONA]
Spiega il flusso del workflow in 3-5 step semplici. Per livello ${WORKFLOW_LEVEL}, la complessità degli step deve riflettere il livello tecnologico:
- L0: Step accessibili senza competenze tecniche
- L1: Step con integrazioni API/automazioni
- L2: Step con logiche avanzate o AI

### [PREREQUISITI E INTEGRAZIONI]
**Strumenti richiesti:**
Elenca strumenti/sistemi necessari adatti al livello ${WORKFLOW_LEVEL}:
- L0: Spreadsheet, form online, strumenti SaaS base
- L1: CRM/ERP, piattaforme di automazione (n8n, Make)
- L2: Cloud platforms (GCP, AWS), database, API custom

**Integrazioni consigliate:**
- Priorità: n8n, OpenAI Platform, Google Cloud, Spoki
- Tempo di implementazione: [Rapida/Media/Complessa] basato su ${WORKFLOW_LEVEL}

### [VALORE OPERATIVO]
**Tempo Operativo Salvato (TOS):**
Stima conservativa: es. "3-5 ore/settimana, riduzione 60% del task manuale"

**Valore Economico Previsto (VEP):**
Equivalente economico: es. "€200-400/mese di risparmio operativo"

**Effort/Cost Indicator:**
[Basso/Medio/Alto] con breve spiegazione. L'effort cresce con il livello (L0=Basso, L2=Alto).

### [GUARDRAIL E CONSIDERAZIONI]
Vincoli legali, settoriali, etici applicabili:
- GDPR (se tratta dati personali)
- Conformità settoriale (${WORKFLOW_SECTOR})
- Limiti tecnici per livello ${WORKFLOW_LEVEL}
- Ruolo del professionista (se applicabile)

### [PROSSIMI PASSI]
Invita il lettore all'azione in modo leggero e professionale.

NOTE PERSONALIZZATE DELL'UTENTE:
USER_CUSTOM_PROMPT

IMPORTANTE:
- Output in italiano
- Max 1800 parole
- Completa TUTTE le sezioni richieste senza troncare
- Tono professionale e orientato alla soluzione
- Non proporre preventivi o listini
- Mantieni riferimenti chiari a ${WORKFLOW_NAME} e ${WORKFLOW_SECTOR}`
		);
	}, [workflow]);

	async function run(promptOverride) {
		setLoading(true);
		setError(null);
		setContent('');
		try {
			const finalMsg = basePrompt.replace('USER_CUSTOM_PROMPT', (promptOverride || '').slice(0, 2000));

			// Try streaming first
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

			// Streaming SSE - IMMEDIATE UPDATE (no buffering)
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';
			let received = false;
			let totalChars = 0;

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
						console.log('[Workflow SSE]', evt); // DEBUG
						let delta = '';
						if (evt?.type === 'response.output_text.delta' && typeof evt?.delta === 'string') {
							delta = evt.delta;
						} else if (typeof evt?.output_text_delta === 'string') {
							delta = evt.output_text_delta;
						} else if (Array.isArray(evt?.choices)) {
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
							console.log('[Workflow Delta]', delta.length, 'chars'); // DEBUG
							received = true;
							totalChars += delta.length;
							// IMMEDIATE UPDATE - no buffer delay
							setContent((cur) => cur + delta);
						}
					} catch (parseErr) {
						console.error('[Workflow SSE Parse Error]', parseErr, 'Line:', line); // DEBUG
					}
				}
			}

			console.log('[Workflow Stream Ended] Total chars received:', totalChars); // DEBUG

			// Validation: Check if output seems complete (contains expected sections)
			setContent((currentContent) => {
				const hasSections = currentContent.includes('[HEADLINE]') ||
					currentContent.includes('[CHE COSA RISOLVE]') ||
					currentContent.includes('[PROSSIMI PASSI]');
				const seemsComplete = totalChars > 500 && hasSections;

				if (!seemsComplete && totalChars > 0) {
					console.warn('[Workflow] Output may be incomplete. Total chars:', totalChars);
				}

				return currentContent;
			});

			if (!received) setError('Nessun contenuto dal modello.');
		} catch (e) {
			console.error('[Workflow Stream Error]', e); // DEBUG
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

		// Clean system prompt artifacts but keep markdown for parsing
		let txt = raw;

		// Remove metadata lines like "*Ruolo*: ...", "*Data*: ...", "*Versione*: ..."
		txt = txt.replace(/^\*[^*]+\*:\s*.+$/gm, '');

		// Remove separator lines (---)
		txt = txt.replace(/^---+\s*$/gm, '');

		// Remove standalone [TAG] lines
		txt = txt.replace(/^\[([A-Z_\s]+)\]\s*$/gm, '');

		// Remove >>> CRITICAL OVERRIDE blocks
		txt = txt.replace(/>>>\s*CRITICAL\s+OVERRIDE[\s\S]*?>>>\s*FINE\s+OVERRIDE/gi, '');

		const lines = txt.split(/\r?\n/);
		const nodes = [];
		let listBuffer = [];

		function flushList() {
			if (listBuffer.length === 0) return;
			nodes.push(
				<ul key={`ul-${nodes.length}`} className="list-disc marker:text-sky-400 pl-6 space-y-2 my-3">
					{listBuffer.map((li, i) => (
						<li key={i} className="text-[15px] leading-relaxed text-gray-200">{li}</li>
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
				nodes.push(<div key={`sp-${nodes.length}`} className="h-3" />);
				continue;
			}

			// Heading with brackets: ### [SECTION] or **[SECTION]**
			const bracketHeadingMatch = line.match(/^#{1,6}\s*\[(.+?)\]\s*$/) || line.match(/^\*\*\[(.+?)\]\*\*\s*$/);
			if (bracketHeadingMatch) {
				flushList();
				const title = bracketHeadingMatch[1];
				nodes.push(
					<h2 key={`h-${nodes.length}`} className="mt-8 mb-3 text-[24px] md:text-[26px] font-bold text-cream font-heading">
						{title}
					</h2>
				);
				// Add separator after major section headings
				nodes.push(<hr key={`hr-${nodes.length}`} className="border-t border-white/10 my-4" />);
				continue;
			}

			// Regular heading: ### Text or **Text**
			const headingMatch = line.match(/^#{1,6}\s+(.+)$/) || line.match(/^\*\*(.+)\*\*\s*$/);
			if (headingMatch) {
				flushList();
				const headingText = headingMatch[1].replace(/\*\*/g, '').trim();
				if (headingText && headingText.length < 100) { // Avoid treating long bold text as heading
					nodes.push(
						<h3 key={`h-${nodes.length}`} className="mt-6 mb-2 text-[20px] md:text-[22px] font-semibold text-cream/90 font-heading">
							{headingText}
						</h3>
					);
					continue;
				}
			}

			// Lists: - or 1. or *
			if (/^[-*]\s+/.test(line)) {
				const item = line.replace(/^[-*]+\s+/, '').replace(/\*\*/g, '"').replace(/\*/g, '');
				listBuffer.push(item);
				continue;
			}
			if (/^\d+\.\s+/.test(line)) {
				const item = line.replace(/^\d+\.\s+/, '').replace(/\*\*/g, '"').replace(/\*/g, '');
				listBuffer.push(item);
				continue;
			}

			// Paragraph - clean bold/italic but keep text
			flushList();
			const cleanLine = line.replace(/\*\*(.+?)\*\*/g, '"$1"').replace(/\*(.+?)\*/g, '$1');
			nodes.push(
				<p key={`p-${nodes.length}`} className="text-[15px] leading-relaxed text-gray-200 my-2">{cleanLine}</p>
			);
		}
		flushList();
		return <div className="space-y-1">{nodes}</div>;
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


