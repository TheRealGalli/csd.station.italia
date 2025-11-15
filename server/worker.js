/**
 * Cloudflare Worker minimo che funge da proxy verso OpenAI
 * per mantenere la chiave segreta e delegare la logica ai modelli/“workflow”.
 *
 * Variabili d'ambiente richieste:
 * - OPENAI_API_KEY: chiave API OpenAI
 * Opzionali:
 * - OPENAI_BASE_URL: base URL custom (es. per compatibilità/regioni). Default: https://api.openai.com/v1
 */
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (request.method === 'OPTIONS') return cors();

		if (url.pathname === '/chat' && request.method === 'POST') {
			const body = await safeJson(request);
			const userMessage = String(body?.message ?? '').slice(0, 2000);
			if (!userMessage) return json({ error: 'Messaggio vuoto' }, 400);
			const openaiBase = (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
			const sys = 'Sei l’assistente di CSD Station Italia. Rispondi in modo conciso e professionale.';

			// Se PROMPT_ID è definito, usa il prompt salvato (come nello snippet Python dell’utente)
			const promptId = env.PROMPT_ID;
			const promptVersion = env.PROMPT_VERSION || '1';
			const payload = promptId
				? {
						prompt: { id: promptId, version: promptVersion },
						input: userMessage,
				  }
				: {
						model: 'gpt-4.1-mini',
						input: [
							{ role: 'system', content: sys },
							{ role: 'user', content: userMessage },
						],
				  };

			const r = await fetch(`${openaiBase}/responses`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			if (!r.ok) {
				const err = await r.text();
				return json({ error: 'OpenAI error', detail: err }, 502);
			}
			const data = await r.json();
			const reply = extractResponseText(data) || 'Non ho una risposta al momento.';
			return json({ reply });
		}

		if (url.pathname === '/contact' && request.method === 'POST') {
			const body = await safeJson(request);
			const { name = '', email = '', message = '' } = body || {};
			const openaiBase = (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
			const sys = 'Sei un assistente che classifica le richieste di contatto e produce un breve riassunto con priorità.';
			const prompt = `Richiesta contatto:\nNome: ${name}\nEmail: ${email}\nMessaggio: ${message}\n\nGenera: {priorita: alta/media/bassa, sintesi: stringa breve, prossimi_step: 1-2 punti}.`;

			const r = await fetch(`${openaiBase}/responses`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'gpt-4.1-mini',
					input: [
						{ role: 'system', content: sys },
						{ role: 'user', content: prompt },
					],
				}),
			});
			if (!r.ok) {
				const err = await r.text();
				return json({ error: 'OpenAI error', detail: err }, 502);
			}
			const data = await r.json();
			const reply = extractResponseText(data);
			return json({ ok: true, triage: reply });
		}

		return json({ ok: true, message: 'CSD Station Worker attivo' });
	},
};

function cors() {
	return new Response(null, {
		status: 204,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
}

function json(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*',
		},
	});
}

async function safeJson(request) {
	try {
		return await request.json();
	} catch {
		return null;
	}
}

function extractResponseText(data) {
	// Responses API: data.output_text presente nei modelli GPT-4.1
	if (typeof data?.output_text === 'string') return data.output_text.trim();
	// fallback: prova a cercare testo in output[0].content[0].text
	const txt = data?.output?.[0]?.content?.[0]?.text;
	if (typeof txt === 'string') return txt.trim();
	return null;
}


