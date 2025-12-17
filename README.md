## CSD Station — Sezione Italia (Frontend + Workflow Agentici)

Sito statico ospitato su GitHub Pages con backend “serverless” basato su workflow/agentica di OpenAI instradato tramite un proxy minimal su **GCP Cloud Run**.

### Struttura
- Frontend: Vite + React (SPA), contenuti in italiano
- Deploy: GitHub Actions → GitHub Pages
- Backend: nessun server tradizionale; le richieste passano da un servizio **Cloud Run** che chiama OpenAI (Responses API/Workflows) via chiave server-side

### Requisiti
- Node.js 20+
- Account GitHub (Pages abilitato sul repo)
- Account GCP (per Cloud Run)
- Chiave OpenAI (`OPENAI_API_KEY`)

### Sviluppo locale
```bash
npm ci
npm run dev
```
Apri `http://localhost:5173`.

Per testare end-to-end, deploya il servizio su GCP (vedi `server/README.md`) e crea un file `.env.local` con:
```
VITE_WORKER_URL=https://<tuo-servizio>.a.run.app
```

### Build
```bash
npm run build
```
L’attributo `base` per GitHub Pages viene impostato in CI via `VITE_BASE_PATH=/NOME_REPO/`.

### Deploy su GitHub Pages
1. Imposta il branch `main` come default.
2. Abilita GitHub Pages con sorgente “GitHub Actions”.
3. Fai push su `main`. La workflow `.github/workflows/deploy.yml` costruirà e pubblicherà `dist/`.

### Deploy del servizio su GCP (proxy verso OpenAI)
Segui `server/README.md`. Dopo il deploy, imposta in GitHub Actions un env (opzionale) per la build:
- `VITE_WORKER_URL=https://<tuo-servizio>.a.run.app`

In alternativa, per build locale:
```
echo "VITE_WORKER_URL=https://<tuo-servizio>.a.run.app" > .env
```

### Come funziona l’“unico backend con workflow agentici”
- Il frontend statico invia richieste al servizio Cloud Run.
- Il servizio inoltra verso OpenAI (Responses API o Workflows), dove avviene la logica “agentica”.
- Nessun server personalizzato da mantenere: tutto il “backend” è il workflow eseguito sull’infrastruttura OpenAI, con un proxy ultra-sottile solo per proteggere la chiave e gestire CORS.

### Personalizzazione
- Modifica contenuti in `src/pages/*` e componenti in `src/components/*`.
- Per logiche avanzate (strumenti/funzioni), estendi il servizio su Cloud Run per chiamare API esterne dietro autorizzazione del modello (function/tool calling).



