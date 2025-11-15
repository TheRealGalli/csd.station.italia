## Backend GCP (Cloud Run) — proxy verso OpenAI

Servizio HTTP Node/Express che funge da proxy verso OpenAI. Mantiene la chiave `OPENAI_API_KEY` lato server e offre gli endpoint usati dal frontend ospitato su GitHub Pages.

Endpoint:
- `POST /chat` body `{ "message": "..." }` → risposta testuale del modello (o prompt salvato)
- `POST /contact` body `{ name, email, message }` → triage sintetico

### Struttura
- Codice: `server/gcp/index.js` (Express)
- Dockerfile: `server/gcp/Dockerfile`
- Package: `server/gcp/package.json`

### Requisiti
- `gcloud` configurato sul tuo progetto
- Node 20+ locale (solo per test)

### Build e deploy su Cloud Run
```bash
cd server/gcp
gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/csd-station-api
gcloud run deploy csd-station-api \
  --image gcr.io/$(gcloud config get-value project)/csd-station-api \
  --region europe-west8 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=YOUR_KEY \
  --set-env-vars PROMPT_ID=pmpt_xxx,PROMPT_VERSION=2
```

Prendi l’URL del servizio (es. `https://csd-station-api-xxxx-ew.a.run.app`) e impostalo nel frontend come `VITE_WORKER_URL`.

### Variabili d’ambiente supportate
- `OPENAI_API_KEY` (obbligatoria)
- `PROMPT_ID`, `PROMPT_VERSION` (opzionali, per usare un prompt salvato come nel tuo SDK Python)
- `OPENAI_BASE_URL` (opzionale, default `https://api.openai.com/v1`)

### Test locale
```bash
cd server/gcp
npm ci
npm start
# http://localhost:8080
```

### Sicurezza
- Non inserire l’API key nel frontend. Tutte le chiamate passano per Cloud Run.
- Aggiungi quote, auth o WAF a livello di Cloud Run/Ingress se necessario.
