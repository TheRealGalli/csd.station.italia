import React, { useRef, useState } from 'react';

export default function ChatWidget({ open = false, onClose, onOpen }) {
	const [messages, setMessages] = useState([
		{ role: 'assistant', content: 'Ciao! Sono l’assistente CSD Station Italia. Come posso aiutarti?' },
	]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const listRef = useRef(null);
	const [openReasoning, setOpenReasoning] = useState({});

	const workerUrl = import.meta.env.VITE_WORKER_URL || 'https://csd-station-api-346681848489.europe-west8.run.app';

	function resetConversation() {
		setMessages([{ role: 'assistant', content: 'Ciao! Sono l’assistente CSD Station Italia. Come posso aiutarti?' }]);
	}

	// Format assistant text: uniforma in sole liste puntate blu (niente griglie)
	function renderAssistantContent(text) {
		const lines = String(text || '').split('\n');
		const blocks = [];
		let i = 0;
		while (i < lines.length) {
			const line = lines[i].trimEnd();
			// Gruppo di bullets: marcatori (-, *, •) oppure righe chiave: valore trattate come bullet
			const isBullet = /^\s*[-*•]\s+/.test(line);
			const isKV = /^([^:]{1,64}):\s+.+$/.test(line);
			if (isBullet || isKV) {
				const items = [];
				while (i < lines.length) {
					const l = lines[i].trimEnd();
					if (/^\s*[-*•]\s+/.test(l)) {
						items.push(l.replace(/^\s*[-*•]\s+/, '').trim());
						i++;
						continue;
					}
					const m = l.match(/^([^:]{1,64}):\s+(.+)$/);
					if (m) {
						items.push(`${m[1].trim()}: ${m[2].trim()}`);
						i++;
						continue;
					}
					break;
				}
				blocks.push(
					<ul key={`ul-${i}`} className="list-disc marker:text-primary pl-5 space-y-1">
						{items.map((it, idx) => (<li key={idx} className="text-gray-200">{it}</li>))}
					</ul>
				);
				continue;
			}
			// Blank line → spacer
			if (line.trim() === '') {
				blocks.push(<div key={`sp-${i}`} className="h-2" />);
				i++;
				continue;
			}
			// Default paragraph
			blocks.push(<p key={`p-${i}`} className="text-gray-200 whitespace-pre-wrap">{line}</p>);
			i++;
		}
		return <div className="space-y-2">{blocks}</div>;
	}

	async function sendMessage() {
		if (!input.trim()) return;
		const userMsg = { role: 'user', content: input.trim() };
		setMessages((prev) => [...prev, userMsg]);
		setInput('');
		setLoading(true);
		try {
			// Streaming: aggiorna progressivamente il messaggio dell'assistente
			const assistantIdx = messages.length + 1;
			setMessages((prev) => [...prev, { role: 'assistant', content: '', reasoning: '' }]);

			const res = await fetch((workerUrl || '') + '/chat-stream', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: userMsg.content,
					history: messages.map(m => ({ role: m.role, content: m.content })).slice(-12),
				}),
			});
			if (!res.ok || !res.body) {
				// fallback al vecchio endpoint se streaming non disponibile
				const r = await fetch((workerUrl || '') + '/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						message: userMsg.content,
						history: messages.map(m => ({ role: m.role, content: m.content })).slice(-12),
					}),
				});
				const data = await r.json();
				const reply = data?.reply ?? 'Si è verificato un errore, riprova più tardi.';
				const reasoning = typeof data?.reasoning === 'string' ? data.reasoning : '';
				setMessages((prev) => {
					const next = [...prev];
					next[assistantIdx] = { role: 'assistant', content: reply, reasoning };
					return next;
				});
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });

				// Parsiamo SSE: linee che iniziano con "data: "
				const lines = buffer.split('\n');
				// mantieni l'ultima riga parziale nel buffer
				buffer = lines.pop() || '';
				for (const line of lines) {
					if (!line.startsWith('data:')) continue;
					const payload = line.slice(5).trim();
					if (payload === '[DONE]') continue;
					try {
						const evt = JSON.parse(payload);
						// Cerchiamo output_text.delta oppure content[].delta/text
						let delta = '';
						let rdelta = '';
						if (evt?.type === 'response.output_text.delta' && typeof evt?.delta === 'string') {
							delta = evt.delta;
						} else if (evt?.type === 'response.reasoning.delta' && typeof evt?.delta === 'string') {
							rdelta = evt.delta;
						} else if (typeof evt?.output_text_delta === 'string') {
							delta = evt.output_text_delta;
						} else if (evt?.object === 'chat.completion.chunk' && Array.isArray(evt?.choices)) {
							for (const choice of evt.choices) {
								const piece = choice?.delta?.content;
								if (typeof piece === 'string') delta += piece;
							}
						} else if (Array.isArray(evt?.output)) {
							for (const m of evt.output) {
								for (const c of (m.content || [])) {
									// se c.type === 'reasoning' trattalo come reasoning
									if (typeof c?.text === 'string') {
										if (c?.type === 'reasoning') rdelta += c.text;
										else delta += c.text;
									}
								}
							}
						}
						if (delta || rdelta) {
							setMessages((prev) => {
								const next = [...prev];
								const current = next[assistantIdx]?.content ?? '';
								const curReason = next[assistantIdx]?.reasoning ?? '';
								next[assistantIdx] = { role: 'assistant', content: current + (delta || ''), reasoning: curReason + (rdelta || '') };
								return next;
							});
							// autoscroll
							queueMicrotask(() => {
								if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
							});
						}
					} catch {
						// ignora chunk non JSON
					}
				}
			}
		} catch (e) {
			setMessages((prev) => [...prev, { role: 'assistant', content: 'Errore di rete. Riprova.' }]);
		} finally {
			setLoading(false);
			queueMicrotask(() => {
				if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
			});
		}
	}

	// Floating opener when closed
	if (!open) {
		return (
			<button
				aria-label="Apri chat assistente"
				className="fixed right-4 h-12 w-12 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:bg-primary/90 z-50"
				style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
				onClick={onOpen}
			>
				💬
			</button>
		);
	}

	return (
		<div className="fixed inset-0 md:inset-auto md:bottom-4 md:right-4 md:left-auto w-full md:w-[380px] h-[100svh] md:max-h-[70vh] flex flex-col overflow-hidden rounded-none md:rounded-2xl bg-[#0c1218] md:bg-transparent glass-panel shadow-2xl z-50" aria-live="polite">
			<div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 sticky top-0">
				<strong className="text-cream">Assistente</strong>
				<div className="flex items-center gap-3">
					<span className="text-xs text-gray-400">{loading ? 'sta scrivendo…' : 'online'}</span>
					<button
						aria-label="Chiudi chat"
						className="text-gray-400 hover:text-white"
						onClick={() => { resetConversation(); onClose?.(); }}
					>
						✕
					</button>
				</div>
			</div>
			<div ref={listRef} className="p-3 overflow-auto flex-1 flex flex-col gap-2">
				{messages.map((m, idx) => (
					<div
						key={idx}
						className={`px-3 py-2 rounded-xl max-w-[85%] leading-snug ${m.role === 'user' ? 'self-end bg-primary/20 text-white' : 'self-start bg-white/10 text-gray-200'}`}
					>
						{m.role === 'assistant' ? renderAssistantContent(m.content) : <span className="whitespace-pre-wrap">{m.content}</span>}
						{m.role === 'assistant' && typeof m.reasoning === 'string' && m.reasoning.trim() && (
							<div className="mt-2">
								<button
									className="text-xs text-white/70 hover:text-white underline underline-offset-2"
									onClick={() => setOpenReasoning((prev) => ({ ...prev, [idx]: !prev[idx] }))}
								>
									{openReasoning[idx] ? 'Nascondi ragionamento' : 'Mostra ragionamento'}
								</button>
								{openReasoning[idx] && (
									<div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-2 text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
										{m.reasoning}
									</div>
								)}
							</div>
						)}
					</div>
				))}
			</div>
			<div className="flex gap-2 p-2 border-t border-white/10 sticky bottom-0 bg-[#0c1218]" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}>
				<input
					className="flex-1 rounded-lg bg-white/5 border-white/10"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
					placeholder="Scrivi un messaggio…"
					aria-label="Messaggio per l'assistente"
				/>
				<button
					className="px-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold disabled:opacity-60"
					onClick={sendMessage}
					disabled={loading}
				>
					Invia
				</button>
			</div>
		</div>
	);
}


