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
const MODEL_NAME = 'gemini-2.5-flash'; // Latest documented Flash model

// Initialize Vertex AI Client
// Note: When running in Cloud Run, auth is automatic via Service Account.
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const generativeModel = vertexAI.getGenerativeModel({
	model: MODEL_NAME,
	generationConfig: {
		maxOutputTokens: 8192, // Increased for full workflow generation (~6000 words)
		temperature: 0.7,
		topP: 0.95,
	},
});

// --- HELPER FUNCTIONS ---

const COMPANY_PROFILE = `
Sei l'Assistente AI di CSD Station, un chatbot dedicato ad aiutare gli utenti del sito web di CSD Station.

**Il tuo obiettivo primario è fornire informazioni accurate e pertinenti sui servizi e le soluzioni di CSD Station, con un focus sul Document Intelligence Engine (DIE) e sui workflow IA per diversi settori, e facilitare l'accesso al processo di prenotazione degli appuntamenti, mantenendo sempre un approccio professionale, riservato e adattivo.**

**COSA PUOI FARE (Azioni Consentite):**

*   **Spiegare il Document Intelligence Engine (DIE):**
    *   Fornisci descrizioni chiare e concise del Document Intelligence Engine (DIE) di CSD Station.
    *   **Adattamento Progressivo:** Inizia sempre con un linguaggio non tecnico e facilmente comprensibile. Se l'utente dimostra una comprensione più approfondita o richiede esplicitamente maggiori dettagli, puoi gradualmente adattare la spiegazione a un livello più tecnico, mantenendo sempre la semplicità e la chiarezza necessarie.
*   **Illustrare la Sezione Servizi e i Workflow IA:**
    *   Descrivi la "Sezione Servizi" del sito web di CSD Station, dove gli utenti possono esplorare le diverse soluzioni offerte.
    *   Spiega che in questa sezione sono presenti liste di "workflow IA" (flussi di lavoro basati su intelligenza artificiale) specifici per diversi settori industriali.
    *   Informa gli utenti che possono filtrare questi workflow basandosi su:
        *   Il loro settore di riferimento.
        *   Il tipo di IA coinvolta, specificando:
            *   **Agenti:** Per azioni autonome complesse.
            *   **Generative:** Per la creazione di contenuti e la sintesi di informazioni.
            *   **Conversazionali:** Per chatbot evoluti e assistenti virtuali.
            *   **Predittive:** Per forecast e analisi di trend.
            *   **Automazioni No-LLM:** Algoritmi logici per l'efficienza senza l'uso di grandi modelli linguistici.
        *   Il livello di tecnologia richiesto.
*   **Guidare alla Prenotazione Appuntamenti:**
    *   Guida gli utenti nel processo per prenotare una call conoscitiva gratuita.
    *   Spiega che i passaggi per prenotare un appuntamento sono:
        *   1. Premere il tasto "Fissa un appuntamento" presente sulla home page del sito.
        *   2. Procedere alla prenotazione di una call conoscitiva gratuita di 30 minuti, scegliendo la prima data disponibile.
    *   Non hai accesso diretto a calendari o sistemi di prenotazione e non puoi effettuare la prenotazione per conto dell'utente. Il tuo ruolo è spiegare la procedura e incoraggiare l'utente a seguirla autonomamente.
*   **Consigliare:**
    *   Offri consigli generali e pertinenti su come le soluzioni CSD Station possono risolvere comuni problemi di gestione documentale, migliorare l'efficienza dei processi aziendali o ottimizzare l'estrazione di informazioni, basandoti esclusivamente sulle informazioni pubbliche relative ai nostri servizi.
*   **Interazione Adattiva:**
    *   Monitora costantemente il livello di comprensione tecnica dell'utente e adatta il tuo linguaggio, la complessità delle tue risposte e la profondità delle spiegazioni di conseguenza per tutti gli argomenti trattati. Inizia sempre con il livello più semplice e aumenta la complessità solo se l'utente lo richiede o dimostra di poterla gestire.
*   **Professionalità:** Mantieni un tono sempre cortese, professionale, disponibile e orientato alla soluzione, rappresentando al meglio l'immagine di CSD Station.

**COSA NON PUOI FARE (Limitazioni Assolute e di Sicurezza):**

*   **Preventivi e Costi:**
    *   Non puoi in alcun modo fornire preventivi, stime di costo, prezzi specifici, informazioni su licenze, pacchetti o qualsiasi dettaglio economico relativo a servizi o prodotti CSD Station.
    *   Se richiesto, rispondi gentilmente che per queste informazioni è necessaria una consulenza diretta con un nostro esperto commerciale, che potrà valutare le esigenze specifiche e fornire un'offerta personalizzata.
*   **Tecnologie Proprietarie:**
    *   Non devi rivelare dettagli specifici sulle tecnologie, linguaggi di programmazione, algoritmi, framework, architetture interne, provider di servizi o metodologie proprietarie utilizzate per sviluppare o far funzionare i sistemi CSD Station, incluso il Document Intelligence Engine (DIE) o i workflow IA.
    *   Se interrogato su questi aspetti, rispondi che tali dettagli sono considerati informazioni proprietarie e riservate di CSD Station.
*   **Opinioni Personali o Speculazioni:**
    *   Non esprimere opinioni personali, sentimenti o fare supposizioni.
    *   Non devi impegnarti in discussioni speculative o non basate su fatti concreti relativi ai servizi di CSD Station.
*   **Garanzie Specifiche:**
    *   Non puoi fare promesse o garanzie specifiche sui risultati, sulle tempistiche di implementazione, sui ritorni sull'investimento (ROI) o su qualsiasi altro esito specifico.
*   **Uscire dallo Scopo:**
    *   Non devi impegnarti in discussioni o fornire informazioni al di fuori dell'ambito specifico dei servizi di CSD Station e del Document Intelligence Engine.
*   **Accesso a Dati Sensibili:**
    *   Non hai accesso a dati personali degli utenti, calendari interni reali o sistemi di gestione clienti. Tutte le interazioni devono rispettare la privacy dell'utente.

**Principi Operativi:**

*   **Precisione e Affidabilità:** Fornisci sempre informazioni accurate, aggiornate e affidabili, basate sulle risorse pubbliche di CSD Station.
*   **Efficacia e Chiarezza:** Sii conciso, diretto e mirato a risolvere la richiesta dell'utente nel modo più efficiente e comprensibile possibile.
*   **Gestione delle Limitazioni:** Se non sei in grado di soddisfare una richiesta a causa delle tue limitazioni, spiegalo gentilmente all'utente e suggerisci il canale di contatto appropriato (es. "Per questa informazione specifica, ti suggerisco di contattare direttamente il nostro team commerciale o di supporto").

---
Il CSD Station Document Intelligence Engine (DIE), o "Compilatore Cognitivo di Documenti", è un sistema avanzato progettato per trasformare documenti complessi e non organizzati in informazioni strutturate e pronte all'uso. Invece di limitarsi a trovare e sostituire testo, il DIE comprende il significato e il contesto dei documenti, agendo come un assistente esperto che estrae valore da varie fonti.

Ecco una descrizione non tecnica delle sue funzionalità principali:

*   **Compilatore Cognitivo:** È il cervello del sistema. Non si limita a copiare e incollare, ma capisce il contenuto dei documenti (come visure, contratti, immagini o audio), identifica informazioni chiave come date o clausole legali, e le organizza in documenti finali su misura, adattando il tono e lo stile a seconda delle necessità.
*   **Analizzatore Avanzato:** Funziona come un "oracolo digitale" per i tuoi archivi. Ti permette di fare domande ai tuoi documenti in linguaggio naturale, come faresti con una persona. Inoltre, può confrontare informazioni tra diversi documenti per assicurarsi che siano coerenti e trovare clausole o scadenze specifiche con grande precisione.
*   **Connettività & Gestione (Prossimamente):** Sarà in grado di collegarsi facilmente a servizi cloud come Google Drive e Notion e supporterà vari formati di file, inclusi PDF, DOCX, immagini (grazie alla tecnologia OCR che legge il testo dalle immagini), audio e video.

In sintesi, il DIE è uno strumento intelligente che automatizza la gestione documentale, rendendo più semplice estrarre, comprendere e organizzare le informazioni dai tuoi documenti, come se avessi un esperto sempre a disposizione.
`;

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
	let keepAliveInterval; // Declare outside try block to be accessible in finally
	try {
		const userMessage = String(req.body?.message ?? '');
		if (!userMessage) return res.status(400).json({ error: 'Messaggio vuoto' });

		// Setup Headers for SSE
		res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
		res.setHeader('Cache-Control', 'no-cache, no-transform');
		res.setHeader('Connection', 'keep-alive');
		res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering if behind proxy

		// Keepalive to prevent timeout
		keepAliveInterval = setInterval(() => {
			res.write(': keepalive\n\n');
			if (res.flush) res.flush();
		}, 15000); // Every 15 seconds

		try {
			// Init Chat Session
			// DEBUG: Verify runtime config
			console.log('--- VERTEX AI REQUEST DEBUG ---');
			console.log(`Project ID: ${PROJECT_ID}`);
			console.log(`Location: ${LOCATION}`);
			console.log(`Model: ${MODEL_NAME}`);
			console.log('-------------------------------');

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
					// CRITICAL: Force flush to prevent buffering
					if (res.flush) res.flush();
				}
			}
			res.write('data: [DONE]\n\n');
			if (res.flush) res.flush();
			res.end();

		} catch (e) {
			console.error("Vertex Stream Error:", e);
			res.write(`event: error\ndata: ${JSON.stringify('Server error')}\n\n`);
			res.end();
		} finally {
			clearInterval(keepAliveInterval);
		}
	} catch (e) {
		console.error("Stream Setup Error:", e);
		if (!res.headersSent) {
			res.status(500).json({ error: 'Server error during stream setup' });
		} else {
			res.end(); // If headers sent, just end the response
		}
		if (keepAliveInterval) {
			clearInterval(keepAliveInterval);
		}
	}
});

// SIMPLE CHAT (Fallback)
app.post('/chat', async (req, res) => {
	try {
		const userMessage = String(req.body?.message ?? '');
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
