# La sfida di Otto · studio e nuovo disegno

18 ottobre 2026. Feedback reale: Carlo (lo trova attraente, "non è scontato") e sua madre (fascia d'età del cliente tipo): *difficile, frenetico, non si capisce cosa fare*. Vale per CS Restaurant OS e CS Notaro OS (motore unico `game.js`, minigiochi `mg.js`, contenuti `missions.js`).

## Cosa succede oggi, misurato

Partita reale su CS Restaurant OS, senza toccare niente dopo l'avvio:

| Secondi | Cosa vede il giocatore |
|---|---|
| 0 | 3 schermate di introduzione, poi un fumetto "La sfida è iniziata" |
| 6 | il primo compito (quadrato rosso "!") è già lì, mentre arrivano notifiche di chiamate e prenotazioni |
| 24 | 2 compiti aperti, ognuno col suo timer |
| 45 | 3 decisioni aperte, tutte a tempo, più la sezione Cucina con una "MISSIONE" |
| 130 | ancora 3 aperte, 0 punti: se non agisci, Otto le chiude e ti toglie punti |

Nel frattempo continuano ad arrivare le notifiche del sistema (chiamate, WhatsApp, recensioni) e i numeri della pagina cambiano. **Tutto chiede attenzione nello stesso momento.**

## I problemi

1. **Si parte di corsa.** Il primo compito arriva dopo 4 secondi, prima che il giocatore abbia capito dove guardare. In 45 secondi le cose aperte sono già 3.
2. **Si spiega tutto all'inizio, niente quando serve.** Tre schermate di regole (compiti, missioni, Bottega, punti, timer, indizi) prima di giocare; poi più niente nel momento in cui le cose succedono davvero.
3. **Troppo testo a schermo**, ed è testo "di sistema": "COMPITO · +15 pt · +5 se lo fai subito", "MISSIONE · SMISTA LA COMANDA", "fino a +45 pt", "Indizio di Otto −10 pt · servono 10 punti", la striscia sulla home "3 missioni aspettano: aprile dal quadrato rosso". Parla del gioco invece di far giocare.
4. **I minigiochi sono appoggiati sopra le pagine.** Restaurant: 0 missioni su 12 vivono dentro un oggetto reale. Notaro: 4 su 13 (Posta, Centralino, WhatsApp). Gli altri sono una scheda "MISSIONE" in cima alla pagina, staccata dall'interfaccia. Quelli dentro la Posta funzionano meglio perché **sono il lavoro vero**: arriva un'email, apri gli allegati, ti accorgi che un dato non torna, rispondi al mittente.
5. **Il tempo scorre anche mentre leggi.** Nessuna pausa per capire: chi legge con calma perde punti.
6. **Il sistema dimostrativo e il gioco si sovrappongono**: le notifiche "live" della demo continuano anche in modalità sfida e competono con le cose da fare.

## Il nuovo disegno

### Principio
**Il sistema si spiega da solo, man mano.** Non si impara prima di giocare: si impara la prima volta che una cosa succede, con Otto che lo dice in una nuvoletta, e il tempo fermo finché non hai capito.

### 1. Escalation lenta
| Livello | Quando | Cose aperte insieme | Tempo | Ritmo |
|---|---|---|---|---|
| 1 · Si impara | 0–150 pt | **una alla volta** | largo (2 minuti un compito, 4 una missione) | il primo compito dopo ~10 s, poi uno ogni 40–70 s; la prima missione solo dopo due compiti fatti |
| 2 · Si prende il ritmo | 150–400 pt | fino a 2 | −15% | compiti ogni 30–55 s, missioni ogni 2–3 minuti |
| 3 · Servizio pieno | oltre 400 pt | fino a 3 | −30% | compiti ogni 25–45 s |

### 2. Le nuvolette di Otto (il tempo si ferma)
Una nuvoletta verde scuro con Otto, attaccata all'elemento di cui parla, **ferma tutti i timer** finché non premi "Ho capito". Ognuna compare **una volta sola**, la prima volta che serve:

- il primo compito: indica il quadrato rosso "!";
- la prima volta in una sezione con un compito: indica il tasto che lampeggia ("fai come faresti davvero");
- il primo compito fatto: indica i punti ("più sei veloce, più punti; se non lo fai, Otto lo fa da solo");
- la prima missione: indica l'oggetto arrivato ("qui Otto ha trovato qualcosa che non torna");
- dentro la prima missione: indica i documenti ("i numeri in arancione sono quelli da confrontare");
- il primo errore, il livello 2, il primo regalo della Bottega.

Più qualche **consiglio casuale** quando non c'è niente di urgente (le fonti, l'indizio, la Bottega), sempre a tempo fermo.

### 3. Meno testo
- Via la striscia della home a sfida avviata: bastano punti e quadrato rosso.
- Compito: un'icona, **una frase** (cosa è successo), il tasto vero che lampeggia, un anello di tempo. Niente "COMPITO · +15 pt".
- Missione: niente "MISSIONE · …" e "fino a +45 pt". Ha il nome dell'oggetto (la fattura, la comanda, la chiamata) e una domanda.
- Indizio: un piccolo tasto con il costo, senza frasi.
- Introduzione: le tre schermate restano, più brevi. Il resto lo spiegano le nuvolette.
- Durante la sfida le notifiche della demo tacciono: parlano solo le cose da fare.

### 4. Ogni minigioco dentro un oggetto vero
La regola della Posta per tutti: **la missione arriva come una cosa vera della sezione, nel posto dove arriverebbe davvero**, e si risolve lì, con l'aspetto di quella cosa.

| CS Restaurant OS | Arriva come… | Dove |
|---|---|---|
| Sala · Il conto torna | il tavolo che chiede il conto (con "!" sulla pianta) | nel pannello del tavolo, al posto del tasto "Chiudi conto" |
| Cucina · Smista la comanda | una comanda grande nella colonna "In attesa" | nella colonna, come un biglietto |
| Menu QR · Cosa resta sul QR | l'inventario di metà servizio | in cima al menu |
| Centralino · Al telefono | una chiamata in corso | nell'elenco delle chiamate |
| Recensioni · La risposta giusta | una recensione nuova | in cima alle recensioni |
| WhatsApp · Correggi la bozza | un messaggio dell'ospite | dentro il telefono |
| Fidelity · Premio sì o no | le card appoggiate al lettore | sopra la tabella degli ospiti |
| Magazzino · Trova la differenza | la fattura del fornitore | sopra la dispensa |
| Cassa · Caselle dalla fonte | una fattura da emettere | sopra l'elenco delle fatture |
| Bandi · Ammissibile? | il bando con le spese da inserire | in cima ai bandi |
| Staff & HACCP · Conforme? | la checklist da validare | dentro la checklist |
| Brand & app · Gli allergeni | il piatto del giorno | dentro il menu QR |

| CS Notaro OS | Arriva come… | Dove |
|---|---|---|
| Posta (due minigiochi), Centralino, WhatsApp | email, chiamata, chat | **già dentro** l'oggetto: restano il modello |
| Lo Studio | Otto che chiede conferma nella conversazione | nella chat dello Studio |
| Memoria, Visure, Preventivi, Osservatorio, Staff, Scadenze, Antiriciclaggio, Compliance | l'elemento nuovo della sezione (esito della visura, richiesta di preventivo, novità normativa, attività, termine, cliente, voce del registro) | nel suo elenco, al posto giusto |

### 5. Un Otto per ogni settore (fatto)
La prima missione di ogni sezione la presenta **un Otto di quel settore**: Otto cuoco in Cucina, Otto cameriere in Sala, Otto magazziniere, Otto centralinista, Otto ispettore per l'HACCP; nello studio notarile Otto postino, Otto del notaio, Otto delle visure, Otto antiriciclaggio. Dice **cosa fare e perché**, legato al lavoro vero ("vale la bolla firmata: se paghi la fattura sbagliata, paghi merce che non hai mai ricevuto"). Il tempo è fermo finché non hai capito. Dalla seconda missione di quel settore non parla più: ormai lo sai fare.

### 6. Modalità storia (prossima fase, da progettare)
Un'escalation anche nel racconto: la giornata diventa una storia in capitoli, con **antagonisti** che rendono le missioni più difficili e più divertenti, sempre dentro il lavoro vero.

| | CS Restaurant OS | CS Notaro OS |
|---|---|---|
| Capitolo 1 · Il primo servizio | Si impara: un tavolo, una comanda, una fattura | Si impara: una email, una visura, un modulo |
| Antagonista 1 | **Il fornitore furbo**: fatture con quantità gonfiate, prezzi che cambiano | **Il venditore distratto**: documenti con dati che non tornano, agibilità mancante |
| Antagonista 2 | **Il critico gastronomico in incognito**: arriva senza avvisare, conta ogni minuto e ogni allergene | **La banca impaziente**: chiama, scrive, sposta le scadenze |
| Antagonista 3 | **L'ispettore ASL**: controlla la checklist HACCP proprio nella sera più piena | **Il cliente con troppa fretta**: vuole firmare prima che le verifiche siano finite |
| Finale | Il sabato sera pieno, con tutti e tre insieme | La stipula del venerdì, con tutti i documenti da far tornare |

Ogni antagonista ha il suo Otto che lo presenta, una sua "firma" nelle missioni (le fatture del fornitore furbo hanno sempre un numero sbagliato) e un capitolo in cui si fa sconfiggere. Da studiare prima di costruire: quanti capitoli, quanto dura ciascuno, come si riprende una storia a metà.

### 7. La demo del gioco
Rimandata, come hai detto. Prima un gioco che si spiega da solo; la demo guidata del gioco (quarta schermata e tasto che cambia in modalità sfida) si valuta dopo, quando il gioco è stabile.

## Cosa resta da validare con una partita vera
- Tua madre capisce cosa fare senza che nessuno glielo dica?
- Arriva al livello 2 senza sentirsi di corsa?
- Le nuvolette sono abbastanza poche da non diventare un'altra cosa da leggere?
