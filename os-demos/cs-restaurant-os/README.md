# CS Restaurant OS · CSD Station

Il ristorante in tempo reale: dodici moduli collegati tra loro e un solo assistente, Otto. I moduli vengono dal reverse engineering di gestionali già usati sul campo; l'integrazione, il tempo reale e l'AI sono il valore CSD Station.

## Apri l'anteprima

Richiede Node.js 22 o successivo. Nessuna dipendenza.

```sh
node scripts/serve.mjs
```

Apri `http://127.0.0.1:3000`.

## Cosa puoi provare

- **Demo interattiva** (pulsante rosso in alto a destra): una freccetta automatica e Otto mostrano tutto il prodotto, passaggio per passaggio.
- **Il servizio di stasera**: incasso, tavoli, comande e coperti dal vivo, la sala in miniatura, il flusso degli eventi.
- **Sala & tavoli**: tocca un tavolo per vedere cosa ha ordinato, a che punto è ogni piatto e il conto. Aggiungi un piatto, chiedi il conto, chiudilo.
- **Cucina & comande**: le comande arrivano dal tavolo; un tocco le fa avanzare.
- **Magazzino**: ogni piatto venduto scala gli ingredienti dalla ricetta; sotto scorta, Otto prepara l'ordine.
- **Menu & cassa**: food cost e margine per piatto, conti chiusi della serata.
- Centralino AI, Recensioni AI, WhatsApp, Fidelity, Fatture, Bandi, Staff & HACCP, Brand & app.
- **Servizio live** (in alto): accende o mette in pausa la simulazione (cucina che avanza, nuovi ordini).
- **Chiedi a Otto** da qualunque pagina.

## Limiti

Demo di interfaccia: locale, ospiti, piatti, numeri e bandi sono **inventati**; nessun servizio è collegato e nulla viene inviato. Il motore del servizio (`js/demo.js`) definisce gli eventi che il backend reale dovrà emettere.

La versione precedente (primo accesso vuoto) è in `archive/v0-primo-accesso/`. Studio visivo e di prodotto: [docs/studio-visivo.md](docs/studio-visivo.md).

## Struttura

| File | Responsabilità |
|---|---|
| `js/app.js` | Shell, pagine dei 12 moduli, Otto, aggiornamento live |
| `js/demo.js` | Motore del servizio: tavoli, menu, ricette, magazzino, comande, cassa |
| `js/modules.js` | Registro dei 12 moduli |
| `js/tour.js`, `js/tour-steps.js` | Guida interattiva (motore condiviso con CS Notaro OS) e i suoi passaggi |
| `css/style.css`, `otto.css` | Sistema visivo CSD Station |
| `css/components.css`, `restaurant.css`, `levelup.css`, `tour.css` | Componenti, superfici live, level up, guida |
