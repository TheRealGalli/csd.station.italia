import express from 'express';
import cors from 'cors';

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

// --- ROUTES ---

// Health check / Base Endpoint
app.get('/', (_req, res) => {
	res.json({ ok: true, message: 'CSD Station API is active and ready for future integrations.' });
});

// Future endpoints can be added here
// app.post('/api/future-route', async (req, res) => { ... });

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`CSD Station API listening on port ${PORT}`));

export default app;
