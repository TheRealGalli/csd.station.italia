# CSD Station · Studio visivo e di prodotto (Restaurant + Notaro)

17 ottobre 2026. Vale per **CS Restaurant OS** e **CS Notaro OS**: stessa piattaforma, due mestieri. Copia identica in entrambi i progetti (`docs/studio-visivo.md`).

## 1. Da dove partiamo

**CS Restaurant OS** nasce dal reverse engineering di gestionali usati davvero nei ristoranti: i 12 moduli (sala, cucina, menu e cassa, centralino, recensioni, WhatsApp, fidelity, magazzino, fatture, bandi, staff, brand) sono già testati sul campo. Il limite è l'interfaccia: un primo accesso **vuoto**. Ogni modulo mostra trattini e "dati disponibili dopo l'attivazione", quindi chi guarda non vede **cosa succede** quando il ristorante lavora.

**CS Notaro OS** ha già i dati dimostrativi e un centro AI (Lo Studio), ma i moduli secondari sono ancora elenchi e dettagli. Mancano il "tempo reale" e il collegamento visibile tra un modulo e l'altro.

## 2. Cosa teniamo dai concorrenti, cosa aggiungiamo

| Teniamo (testato sul campo) | Aggiungiamo (il valore CSD Station) |
|---|---|
| I 12 moduli e i loro nomi, familiari per chi lavora nel settore | **Un solo assistente, Otto**, che vede tutti i moduli e agisce tra uno e l'altro |
| Pianta della sala, comande per postazione, menu con allergeni | **Stato condiviso in tempo reale**: un piatto ordinato al tavolo 4 compare in cucina, entra nel conto e scala il magazzino nello stesso istante |
| Coda di posta, scadenziario, adeguata verifica (notaio) | **L'AI lavora in modo visibile**: passaggi, fonti, documento che si compila |
| Tabelle e filtri dove servono | **Decisioni in evidenza**: in apertura, solo ciò che spetta a una persona |
| — | **Guida interattiva** per presentare il prodotto senza venditore |

## 3. Problemi visivi dell'interfaccia attuale

1. **Testo troppo piccolo.** Molte etichette sono a 8–10 px e grigio chiaro su fondo carta: eleganti negli screenshot, faticose da leggere su un tablet in sala o per un notaio di 60 anni.
2. **Gerarchia piatta.** Tutte le card hanno lo stesso peso: il numero importante non si distingue dal testo di servizio.
3. **Nessun segnale di vita.** Niente indica che il sistema sta lavorando: nessun puntino "live", nessun numero che cambia, nessuna transizione.
4. **I moduli non si parlano.** Ogni pagina è un'isola; il collegamento tra moduli non si vede.

## 4. Principi del level up

- **Leggibile prima che elegante**: testo di base 13–14 px, etichette minimo 10–11 px, grigi più scuri (contrasto AA).
- **Un numero eroe per pagina**: la cifra che conta, grande; il resto è contesto.
- **Live dove c'è vita**: puntino verde pulsante, contatori animati, righe che entrano con una breve transizione.
- **Profondità leggera**: card bianche con ombra morbida, sollevamento al passaggio del mouse, barra in alto sfocata e sempre visibile.
- **Il lime resta il segnale CSD**: azioni primarie e "AI". **Il rosso è solo per la Demo interattiva** (ed errori), così si nota subito.
- **Otto è un personaggio**: si muove quando lavora, saluta, indica. Mai decorativo e basta.

## 5. Anatomia unica di un modulo

Ogni modulo, in entrambi i prodotti, segue la stessa struttura. Chi sviluppa da zero ha un solo modello da costruire.

```
┌ Intestazione: area · titolo · una riga di valore · azione principale ┐
├ Striscia KPI: 3–4 numeri, uno è l'eroe, puntino live se in tempo reale ┤
├ Superficie di lavoro (il cuore: pianta, coda, chat, kanban…) │ Pannello Otto  ┤
│                                                               │ "Ho notato…"  │
│                                                               │ azioni pronte │
└ Attività recenti: cosa è cambiato, chi (persona o Otto)                      ┘
```

## 6. Il tempo reale (Restaurant)

Un unico **motore di servizio** (`js/demo.js`) contiene tavoli, menu, ricette, magazzino, comande, incassi. Ogni azione passa da lì:

`aggiungi piatto al tavolo` → riga nel conto → comanda in cucina (in attesa → in preparazione → pronta) → ingredienti scalati dal magazzino secondo la ricetta → sotto scorta? Otto propone l'ordine al fornitore → `chiudi conto` → incasso della serata.

Un interruttore **"Servizio live"** fa avanzare da solo la cucina e arrivare nuovi ordini, per mostrare il sistema che respira. Nel prodotto reale gli stessi eventi arrivano dal backend (WebSocket), con la stessa forma.

## 7. La guida interattiva

- Pulsante **rosso "Demo interattiva"** in alto a destra, accanto a "Chiedi a Otto", su ogni pagina.
- Una **freccetta automatica** (verde scuro con bordo lime ed etichetta "Otto", distinta dal cursore dell'utente) si sposta, scorre la pagina e clicca al posto nostro.
- **Nuvolette verde scuro con testo bianco** spiegano ogni passaggio, con contatore ("4 di 14") e pulsante **Avanti**: si va avanti solo quando l'utente clicca, così ha tempo di leggere. Esc per uscire, Invio o → per continuare.
- **Otto in basso a sinistra** accompagna il tour: saluta all'inizio, "pensa" mentre l'AI lavora, festeggia alla fine.
- Il resto della pagina si oscura e resta in luce solo l'elemento spiegato.
- Un unico motore (`js/tour.js` + `css/tour.css`), identico nei due prodotti; cambiano solo i passaggi.

## 8. Cosa resta da fare per il prodotto reale

1. Backend con lo stesso contratto degli eventi demo (servizio, comande, magazzino; posta, pratiche, documenti).
2. Otto collegato a un modello reale, con strumenti per ogni modulo e approvazione umana sulle azioni che escono dal sistema.
3. Guida interattiva pubblica come demo commerciale; versione "primo accesso" per i nuovi clienti.
