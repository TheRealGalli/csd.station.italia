import express from 'express';
import cors from 'cors';

// Express app for Cloud Run (or any Node server on GCP)
const app = express();
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
// Handle CORS preflight explicitly (Cloud Run + fetch JSON triggers OPTIONS)
app.options('*', cors());
// Ensure CORS headers are always present (and short-circuit OPTIONS)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
});

function extractResponseText(data) {
	// 1) Preferred summary provided by Responses API
	if (typeof data?.output_text === 'string' && data.output_text.trim()) {
		return data.output_text.trim();
	}
	// 2) Aggregate any textual pieces from output[].content[]
	const parts = [];
	const output = Array.isArray(data?.output) ? data.output : [];
	for (const item of output) {
		const content = Array.isArray(item?.content) ? item.content : [];
		for (const c of content) {
			// Common fields observed: c.text or c.output_text
			if (typeof c?.text === 'string' && c.text.trim()) {
				parts.push(c.text.trim());
			} else if (typeof c?.output_text === 'string' && c.output_text.trim()) {
				parts.push(c.output_text.trim());
			}
		}
	}
	if (parts.length > 0) {
		return parts.join('\n').trim();
	}
	return null;
}

app.get('/', (_req, res) => {
	res.json({ ok: true, message: 'CSD Station API (GCP) attiva' });
});

async function callResponsesAPI(payload, openaiBase, apiKey) {
	const r = await fetch(`${openaiBase}/responses`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	return r;
}

const COMPANY_PROFILE = [
	'Profilo azienda: CSD Station Italia progetta e integra agenti AI e workflow agentici per automatizzare processi aziendali.',
	'Focus: assistenti su misura, orchestrazione di workflow no-backend su OpenAI, time-to-value rapido.',
	'Istruzioni: rispondi SEMPRE come esperto CSD Station Italia; non parlare di taxi/noleggio/stampi;',
	'se la domanda è fuori ambito, reindirizza ai servizi AI/automazione pertinenti.',
].join(' ');

function buildTranscript(history, latestUserMessage) {
	const turns = Array.isArray(history) ? history.slice(-12) : [];
	const lines = [COMPANY_PROFILE, 'Contesto conversazione (più recente in fondo):'];
	for (const m of turns) {
		const role = m?.role === 'assistant' ? 'Assistente' : 'Utente';
		const content = typeof m?.content === 'string' ? m.content : '';
		if (content) lines.push(`${role}: ${content}`);
	}
	lines.push(`Utente: ${latestUserMessage}`);
	lines.push('Assistente:');
	return lines.join('\n');
}

// Streaming: passa in tempo reale gli eventi SSE della Responses API
app.post('/chat-stream', async (req, res) => {
	try {
		const userMessage = String(req.body?.message ?? '').slice(0, 2000);
		if (!userMessage) {
			res.status(400).json({ error: 'Messaggio vuoto' });
			return;
		}
		const openaiBase = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
		const apiKey = process.env.OPENAI_API_KEY;
		const prompt = { id: process.env.PROMPT_ID, version: process.env.PROMPT_VERSION || '1' };
		const transcript = buildTranscript(req.body?.history, userMessage);

		// Intestazioni SSE verso il client
		res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
		res.setHeader('Cache-Control', 'no-cache, no-transform');
		res.setHeader('Connection', 'keep-alive');
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Richiesta streaming alla Responses API
		const upstream = await fetch(`${openaiBase}/responses`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
				Accept: 'text/event-stream',
			},
			body: JSON.stringify({ prompt, input: transcript, stream: true }),
		});

		if (!upstream.ok || !upstream.body) {
			const errTxt = await upstream.text().catch(() => '');
			res.write(`event: error\ndata: ${JSON.stringify(errTxt || 'Upstream error')}\n\n`);
			res.end();
			return;
		}

		// Pass-through degli eventi SSE (senza parsing pesante)
		const reader = upstream.body.getReader();
		const decoder = new TextDecoder();
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			const chunk = decoder.decode(value, { stream: true });
			// inoltra così com'è: il client parserà output_text.delta
			res.write(chunk);
		}
		res.end();
	} catch (e) {
		try {
			res.write(`event: error\ndata: ${JSON.stringify('Server error')}\n\n`);
		} finally {
			res.end();
		}
	}
});

app.post('/chat', async (req, res) => {
	try {
		const userMessage = String(req.body?.message ?? '').slice(0, 2000);
		if (!userMessage) return res.status(400).json({ error: 'Messaggio vuoto' });

		const openaiBase = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
		const promptId = process.env.PROMPT_ID;
		const promptVersion = process.env.PROMPT_VERSION || '1';
		const transcript = buildTranscript(req.body?.history, userMessage);

		const r = await callResponsesAPI(
			{ prompt: { id: promptId, version: promptVersion }, input: transcript },
			openaiBase,
			process.env.OPENAI_API_KEY
		);
		if (!r.ok) {
			const err = await r.text();
			return res.status(502).json({ error: 'OpenAI error', detail: err });
		}
		const data = await r.json();
		const reply = extractResponseText(data);
		return res.json({ reply: reply ?? 'Non ho una risposta al momento.' });
	} catch (e) {
		return res.status(500).json({ error: 'Server error' });
	}
});

app.post('/contact', async (req, res) => {
	try {
		const name = req.body?.name ?? '';
		const email = req.body?.email ?? '';
		const message = req.body?.message ?? '';

		const openaiBase = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
		const sys = 'Sei un assistente che classifica le richieste di contatto e produce un breve riassunto con priorità.';
		const prompt = `Richiesta contatto:\nNome: ${name}\nEmail: ${email}\nMessaggio: ${message}\n\nGenera: {priorita: alta/media/bassa, sintesi: stringa breve, prossimi_step: 1-2 punti}.`;

		const r = await fetch(`${openaiBase}/responses`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'gpt-4.1-mini',
				input: [{ role: 'system', content: sys }, { role: 'user', content: prompt }],
			}),
		});
		if (!r.ok) {
			const err = await r.text();
			return res.status(502).json({ error: 'OpenAI error', detail: err });
		}
		const data = await r.json();
		const triage = extractResponseText(data);
		return res.json({ ok: true, triage });
	} catch (_e) {
		return res.status(500).json({ error: 'Server error' });
	}
});

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'production') {
	app.listen(PORT, () => console.log(`CSD Station API listening on http://localhost:${PORT}`));
}

export default app;


