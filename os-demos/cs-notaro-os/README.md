# CS Notaro OS · CSD Station

L'infrastruttura dello studio notarile: dodici moduli e un solo assistente, Otto, che vede tutto. Identità visiva ripresa da CS Restaurant OS.

## Apri l'anteprima

Richiede Node.js 22 o successivo. Nessuna dipendenza da installare.

```sh
npm run dev
```

Apri `http://127.0.0.1:3080`. Non aprire `index.html` con `file://`.

## L'ecosistema

| Ciò che entra | Il lavoro | Lo studio | Il controllo |
|---|---|---|---|
| Posta & coda pratiche | **Lo Studio** (centro, AI) | Preventivi & imposte | Scadenziario & post-stipula |
| Centralino & segreteria | Memoria dello studio | Osservatorio normativo & bandi | Antiriciclaggio & clienti |
| WhatsApp & notifiche | Visure & Public Gateway | Staff & task | Privacy, audit & compliance |

Il ragionamento dietro la scelta è in [docs/ecosistema-moduli.md](docs/ecosistema-moduli.md); lo studio visivo comune con CS Restaurant OS in [docs/studio-visivo.md](docs/studio-visivo.md).

## Cosa puoi provare

- **Demo interattiva** (pulsante rosso in alto a destra): una freccetta automatica e Otto mostrano tutto il prodotto in 17 passaggi; si va avanti con un clic su Avanti.
- **Oggi in studio**: il punto di Otto, le decisioni che spettano al notaio, team e pratiche.
- **Lo Studio**: chat con il documento accanto. Quattro scenari (compila il modulo di erogazione, confronta preliminare e bozza, redigi la compravendita, cerca precedenti). Il fermaglio carica un PDF con campi: Otto li compila con i dati della pratica e il PDF si scarica davvero.
- **Chiedi a Otto** (in alto a destra): lo stesso assistente da qualunque modulo.
- Posta con bozze da approvare, chiamate gestite, conversazioni WhatsApp, Memoria con citazioni, visure con esiti letti, calcolatore delle imposte, task del team, termini post-stipula, adeguata verifica, registro delle azioni AI.
- Ricerca globale con ⌘K / Ctrl+K.

## Limiti espliciti

È una **demo di interfaccia**. Studio, persone, pratiche, banche, numeri di repertorio e aggiornamenti normativi sono **inventati**. Le risposte di Otto sono scenari predefiniti; nessun modello AI, casella email, centralino, WhatsApp o registro pubblico è collegato. Nulla viene inviato.

Reale: lettura dei campi AcroForm di un PDF caricato e scaricamento della copia compilata (pdf-lib, nel browser), generazione del modulo dimostrativo, calcolatore con regole semplificate. Approvazioni e attività chiuse restano nel localStorage `csd.notaro.workspace.v2`.

La versione precedente con i vecchi 12 moduli è in `archive/v0-moduli-precedenti/`.

## Verifiche e build

```sh
npm run check
npm test
npm run build
```

La build copia il sito in `dist/`. Architettura del backend futuro in [docs/architettura.md](docs/architettura.md).
