# La sfida di Otto · il videogioco completo

18 ottobre 2026. Studio delle meccaniche prima di costruire, a partire dalle indicazioni di Carlo dopo le prove reali. Vale per CS Restaurant OS e CS Notaro OS. Completa [STUDIO-SFIDA.md](STUDIO-SFIDA.md), che spiega il "perché" del nuovo disegno.

## 1. Il ciclo di gioco

Il sistema gira da solo. Il giocatore è la persona che lo tiene in equilibrio. Quattro livelli di attenzione, dal più veloce al più lento:

| Livello | Cos'è | Esempio Restaurant | Esempio Notaro | Punti |
|---|---|---|---|---|
| **Azioni** | il lavoro di ogni giorno, con i tasti veri | servire un piatto, chiudere un conto | gestire un'email, inviare un WhatsApp | pochi (2–5), **sempre**; pieni se subito, poi scendono fino a 1. Ogni oggetto conta una volta: niente spam |
| **Indicatori vivi** | sezioni che hanno una capienza e un tempo: se le trascuri vanno in rosso | fornelli, pass, frigoriferi | posta in arrivo, adempimenti post-stipula | −1 punto al secondo finché resta rosso |
| **Compiti** | Otto ti chiama per una cosa precisa | "il tavolo 4 chiede il conto" | "email della banca da approvare" | 15–25 + 5 se veloce |
| **Missioni** | un problema da ragionare, dentro l'oggetto vero | fattura contro bolla, conto alla romana | allegati che non tornano, titolare effettivo | fino a 45 |

Sopra tutto, la **storia**: capitoli con un antagonista che cambia il tipo di problemi che arrivano.

## 2. CS Restaurant OS · sezione per sezione

| Sezione | Meccanica | Tipo |
|---|---|---|
| **Sala** | I tavoli arrivano, ordinano, chiedono il conto. Il conto lasciato in attesa diventa un compito; la missione "Il conto torna" vive nel pannello del tavolo. | compiti + missione |
| **Cucina** (fatta) | Fornelli con **massimo 4 piatti insieme**, tempo di cottura per piatto (va al pass da solo), **tempo per servire dal pass**. Comande in attesa troppo a lungo o piatti fermi al pass → colonna rossa, −1 pt/s. Le comande arrivano piano, col tempo. Non si può più "spammare": si mette sui fornelli solo se c'è posto, si serve solo ciò che è pronto. | indicatore vivo |
| **Menu digitale QR** | Quando un ingrediente finisce, il piatto va **tolto dal QR in servizio**: se un ospite ordina un piatto che non c'è, −5. Missioni: "cosa resta sul QR" dopo l'inventario, **ordine a mano** per un tavolo, **cambio menu in servizio** (piatto del giorno, ritiro di un piatto). | indicatore + missioni |
| **Centralino AI** | Automatico: Otto risponde. Ogni tanto una chiamata che non sa chiudere → missione al telefono. | missione |
| **Recensioni AI** | Automatico con risposta da approvare (azione). Le recensioni difficili → missione. | azione + missione |
| **WhatsApp** | Conferme automatiche; la bozza sbagliata → missione. | missione |
| **Fidelity & NFC** | Le card al lettore → missione "premio sì o no". | missione |
| **Magazzino** | Automatico: ogni piatto scala gli ingredienti; sotto scorta → compito "invia l'ordine". La fattura del fornitore → missione. | compito + missione |
| **Cassa & Entrate** | Automatica; fatture da emettere → missione. | missione |
| **Bandi** | Rara: missione sulle spese ammissibili. | missione |
| **Staff & HACCP** | **Quattro frigoriferi con sonda di temperatura** che si vede cambiare. Possono succedere: **porta rimasta aperta** (la temperatura sale in fretta: chiudila), **guasto del compressore** (sale piano: chiama il tecnico, ci mette un po'), **sonda scollegata** (valore che non si muove: ricollegala). Oltre i 4 °C il frigo è rosso (−1 pt/s); oltre gli 8 °C si butta la merce (ingredienti persi, −10). La checklist da validare → missione. | indicatore vivo + missione |
| **Brand & app** | Il piatto del giorno con gli allergeni → missione. | missione |

## 3. CS Notaro OS · sezione per sezione

Lo studio notarile non ha fornelli, ma ha due cose che funzionano allo stesso modo: **la posta che si accumula** e **gli adempimenti dopo la firma**, che hanno capienza e scadenze di legge.

| Sezione | Meccanica | Tipo |
|---|---|---|
| **Posta & coda pratiche** | Ogni email ha un **tempo di risposta dello studio**. Se resta senza risposta troppo a lungo diventa rossa (−1 pt/s). Più email in ritardo, più la colonna pesa. Missioni: smista la coda, controlla gli allegati. | indicatore vivo + missioni |
| **Centralino** | Automatico; la chiamata difficile (dati su terzi, urgenze) → missione. | missione |
| **WhatsApp** | Bozze da inviare (azione, pieni se subito); la bozza sbagliata → missione. | azione + missione |
| **Lo Studio** | Il modulo con un dato mancante → missione "caselle dalla fonte". | missione |
| **Memoria** | La domanda sul precedente giusto → missione. | missione |
| **Visure** | Le richieste partono e gli esiti arrivano col tempo; l'esito che non coincide → missione. | missione |
| **Preventivi** | Il cliente aspetta la cifra → missione con la calcolatrice. | missione |
| **Osservatorio** | La novità che si applica o no → missione. | missione |
| **Staff & task** | Qualcuno in ferie → missione di riassegnazione. | missione |
| **Scadenziario & post-stipula** | Il "fornello" dello studio: gli atti firmati generano **adempimenti con scadenza di legge** (registrazione, trascrizione, voltura, deposito). L'addetto ne lavora **2 alla volta** e ognuno richiede tempo. Un adempimento vicino alla scadenza e non avviato → rosso (−1 pt/s); se scade, **sanzione** (−15). | indicatore vivo + missione |
| **Antiriciclaggio** | Il titolare effettivo da calcolare → missione. | missione |
| **Compliance** | Le richieste di accesso ai dati → missione. | missione |

## 4. L'economia dei punti

- **Entrate**: azioni (2–5, a scalare), compiti (15–25), missioni (fino a 45), serie di 3 giuste (+15), fine capitolo (+50).
- **Uscite**: colonne rosse (−1/s), compiti scaduti (−5), errori nelle missioni (−8/−15), sanzioni (−10/−15).
- **La Bottega di Otto** costa davvero: prezzi **raddoppiati** rispetto a prima, e ogni volta che compri lo stesso potenziamento **costa il 2% in più** (cresce a ogni acquisto). Così chi gioca bene non accumula potenziamenti all'infinito.
- **Potenziamenti di settore** (oltre a tempo extra, pausa, scudo, indizi, punti doppi, delega): secondo cuoco, cameriere al pass, forno nuovo, commis; contratto di assistenza frigo, allarme porta; nello studio, segretaria in più (posta), secondo addetto agli adempimenti, firma digitale remota (adempimenti più veloci).

## 5. La storia: capitoli e antagonisti

Ogni partita è una giornata in **cinque capitoli**. Ogni capitolo si apre con la chat di un Otto che racconta cosa sta succedendo, ha **un obiettivo chiaro** e un antagonista che **sposta il tipo di missioni** che arrivano (più spesso dalle sue sezioni) e **stringe una regola** del gioco. Raggiunto l'obiettivo: chat di chiusura, +50 punti, capitolo successivo.

### CS Restaurant OS · "Una serata all'Osteria del Borgo"
| Capitolo | Antagonista | Cosa cambia | Obiettivo |
|---|---|---|---|
| 1 · Si apre la sala | — | si impara | 3 compiti fatti |
| 2 · Il fornitore furbo | Bartolini, che "arrotonda" le fatture | missioni di Magazzino e Cassa più frequenti | vinci 2 missioni di Magazzino o Cassa |
| 3 · Il critico in incognito | un ospite che cronometra tutto | le comande possono aspettare il 25% in meno | vinci 2 missioni di Sala, Cucina o Recensioni |
| 4 · L'ispettore ASL | l'ispezione a sorpresa | i frigoriferi si guastano più spesso | vinci 1 missione HACCP e tieni i frigo a posto |
| 5 · Il sabato sera | tutti insieme | tutto più veloce | fai 150 punti nel capitolo |

### CS Notaro OS · "Una settimana in studio"
| Capitolo | Antagonista | Cosa cambia | Obiettivo |
|---|---|---|---|
| 1 · Il primo giorno | — | si impara | 3 compiti fatti |
| 2 · Il venditore distratto | documenti che non tornano | missioni di Posta, Visure e Studio più frequenti | vinci 2 di queste missioni |
| 3 · La banca impaziente | chiama, scrive, sposta | missioni di Centralino, WhatsApp e Preventivi; la posta va in ritardo prima | vinci 2 di queste missioni |
| 4 · Il cliente che ha fretta | vuole firmare prima delle verifiche | missioni di Antiriciclaggio e Scadenze; gli adempimenti arrivano più spesso | vinci 2 di queste missioni |
| 5 · La stipula del venerdì | tutti insieme | tutto più veloce | fai 150 punti nel capitolo |

La storia è sempre **il lavoro vero raccontato**: un fornitore che sbaglia le fatture esiste, un'ispezione ASL anche. Niente draghi.

## 6. Cosa è stato costruito
1. **Bottega**: prezzi ×2, e ogni acquisto dello stesso potenziamento costa il 2% in più. Potenziamenti di settore: secondo cuoco, cameriere al pass, forno nuovo, commis, contratto di assistenza frigo, allarme porta (Restaurant); segretaria in più, secondo addetto, firma digitale remota (Notaro).
2. **Azioni**: ogni oggetto vero dà punti una volta sola, pieni entro 30 secondi e poi a scalare fino a 1. Niente spam.
3. **Restaurant**: cucina con fornelli (4), cottura per piatto, pass a tempo, colonne rosse; celle frigorifere con sonda, porta aperta, compressore guasto, sonda scollegata, tecnico, merce persa oltre i 4 °C di troppo; ordini dello chef sul menu in servizio (togliere un piatto o cambiargli il prezzo).
4. **Notaro**: posta con tempo di risposta (2 minuti); adempimenti post-stipula con capienza (2), tempo di lavoro (25 s), scadenza e sanzione.
5. **Rosso**: ogni cosa in rosso costa 1 punto al secondo, al massimo 2 in totale; il tempo si ferma con le nuvolette e le chat di Otto.
6. **Storia**: cinque capitoli per gioco con chat di apertura e chiusura, obiettivo visibile in alto, missioni spostate verso l'antagonista e regole che si stringono; +50 punti a capitolo.

## 7. Prossimi passi possibili
- Un riepilogo di fine giornata (punti per sezione, cosa è andato in rosso, capitoli completati).
- Una classifica locale delle partite.
- La demo guidata del gioco, quando le meccaniche sono stabili.
