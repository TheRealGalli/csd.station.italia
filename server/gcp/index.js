import express from 'express';
import cors from 'cors';
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));

// CORS preflight
app.options('*', cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.sendStatus(204);
	next();
});

// --- VERTEX AI CONFIGURATION ---
const PROJECT_ID = process.env.PROJECT_ID || process.env.GCP_PROJECT_ID;
const LOCATION = process.env.LOCATION || 'europe-west8'; // Milan default
const MODEL_NAME = 'gemini-2.5-flash-001'; // Newest generation

// Initialize Vertex AI Client
// Note: When running in Cloud Run, auth is automatic via Service Account.
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const generativeModel = vertexAI.getGenerativeModel({
	model: MODEL_NAME,
	generationConfig: {
		maxOutputTokens: 2048,
		temperature: 0.7,
		topP: 0.95,
	},
});

// --- HELPER FUNCTIONS ---

const COMPANY_PROFILE = [
	'Profilo azienda: CSD Station Italia progetta e integra agenti AI e workflow agentici per automatizzare processi aziendali.',
	'Focus: assistenti su misura, orchestrazione di workflow no-backend su tecnologie Google Cloud e Vertex AI.',
	'Istruzioni: rispondi SEMPRE come esperto CSD Station Italia; non parlare di taxi/noleggio/stampi;',
	'se la domanda è fuori ambito, reindirizza ai servizi AI/automazione pertinenti.',
].join(' ');

// Build prompt for simple generation (Contact Triage / Simple Chat)
function buildPromptParts(history, latestMessage) {
	// For Vertex AI Text format
	const parts = [{ text: `System: ${COMPANY_PROFILE}` }];

	const turns = Array.isArray(history) ? history.slice(-10) : [];
	for (const m of turns) {
		const role = m.role === 'assistant' ? 'Model' : 'User';
		parts.push({ text: `${role}: ${m.content}` });
	}

	parts.push({ text: `User: ${latestMessage}` });
	parts.push({ text: `Model:` });
	return parts;
}

// Build Chat History for Vertex AI ChatSession (Clean Structure)
function buildChatHistory(history) {
	// Convert OpenAI-style history [{role: 'user', content: '...'}, ...] to Vertex style
	// Vertex expects: [{ role: 'user', parts: [{ text: '...' }] }, { role: 'model', parts: [...] }]
	const validHistory = [];

	// Add System Instruction as first User message part or handle via systemInstruction param if supported by SDK version
	// For compatibility, we'll prefix specific context in the first user message or separate system instruction

	const turns = Array.isArray(history) ? history.slice(-10) : [];
	for (const m of turns) {
		if (!m.content) continue;
		validHistory.push({
			role: m.role === 'assistant' ? 'model' : 'user',
			parts: [{ text: m.content }]
		});
	}
	return validHistory;
}


// --- ROUTES ---

app.get('/', (_req, res) => {
	res.json({ ok: true, message: 'CSD Station API (Vertex AI) Active' });
});

// STREAMING CHAT
app.post('/chat-stream', async (req, res) => {
	try {
		const userMessage = String(req.body?.message ?? '').slice(0, 2000);
		if (!userMessage) return res.status(400).json({ error: 'Messaggio vuoto' });

		// Setup Headers for SSE
		res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
		res.setHeader('Cache-Control', 'no-cache, no-transform');
		res.setHeader('Connection', 'keep-alive');

		// Init Chat Session
		const history = buildChatHistory(req.body?.history);
		const chat = generativeModel.startChat({
			history: history,
			systemInstruction: { parts: [{ text: COMPANY_PROFILE }] }
		});

		const result = await chat.sendMessageStream(userMessage);

		for await (const chunk of result.stream) {
			const chunkText = chunk.candidates[0].content.parts[0].text;
			if (chunkText) {
				// OpenAI-compatible format for frontend (choices[0].delta.content)
				// We construct a similar JSON structure to keep frontend compatible or modify frontend.
				// Assuming frontend expects standard SSE text or specific JSON.
				// Let's mimic the OpenAI format specifically:
				/* 
				   data: {"id":"...","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}
				*/
				const openAILikeChunk = {
					choices: [{
						delta: { content: chunkText }
					}]
				};
				res.write(`data: ${JSON.stringify(openAILikeChunk)}\n\n`);
			}
		}
		res.write('data: [DONE]\n\n');
		res.end();

	} catch (e) {
		console.error("Vertex Stream Error:", e);
		res.write(`event: error\ndata: ${JSON.stringify('Server error')}\n\n`);
		res.end();
	}
});

// SIMPLE CHAT (Fallback)
app.post('/chat', async (req, res) => {
	try {
		const userMessage = String(req.body?.message ?? '').slice(0, 2000);
		if (!userMessage) return res.status(400).json({ error: 'Messaggio vuoto' });

		const history = buildChatHistory(req.body?.history);
		const chat = generativeModel.startChat({
			history: history,
			systemInstruction: { parts: [{ text: COMPANY_PROFILE }] }
		});

		const result = await chat.sendMessage(userMessage);
		const responseText = result.response.candidates[0].content.parts[0].text;

		return res.json({ reply: responseText });

	} catch (e) {
		console.error("Vertex Chat Error:", e);
		return res.status(500).json({ error: 'Vertex AI Error', details: e.message });
	}
});

// CONTACT TRIAGE
app.post('/contact', async (req, res) => {
	try {
		const name = req.body?.name ?? '';
		const email = req.body?.email ?? '';
		const message = req.body?.message ?? '';

		const sys = 'Sei un assistente che classifica le richieste di contatto e produce un breve riassunto con priorità.';
		const prompt = `Richiesta contatto:\nNome: ${name}\nEmail: ${email}\nMessaggio: ${message}\n\nGenera: {priorita: alta/media/bassa, sintesi: stringa breve, prossimi_step: 1-2 punti}.`;

		const result = await generativeModel.generateContent({
			contents: [
				{ role: 'user', parts: [{ text: `${sys}\n\n${prompt}` }] }
			]
		});

		const triage = result.response.candidates[0].content.parts[0].text;
		return res.json({ ok: true, triage });

	} catch (e) {
		console.error("Contact Triage Error:", e);
		return res.status(500).json({ error: 'Vertex AI Error' });
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`CSD Station API (Vertex) listening on port ${PORT}`));

export default app;
