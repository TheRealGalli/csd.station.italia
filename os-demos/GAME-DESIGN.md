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
| **Delivery** (nuova) | Glovo, Deliveroo, Just Eat e il sito del locale in un solo tablet. **Si apre a caso durante la partita** (dal capitolo 2, dal 3 o dal livello 3, oppure resta chiuso). Ogni ordine va **accettato entro 35 s**, poi cucina (tempo per numero di piatti), poi il **rider arriva al banco** e va consegnato. Ordine non accettato o rider che aspetta oltre 12 s → rosso (−1 pt/s); rider che aspetta oltre 50 s → riparte, ordine annullato (−10). Con la cucina piena nasce il compito “metti in pausa il canale con la commissione più alta” (90 s). Missioni solo dal capitolo 2 e a caso: quanto resta al locale (commissione, promo, IVA), viaggia bene?, cosa metti in pausa (livello 3), il cliente al telefono (capitolo 3). | indicatore vivo + compiti + missioni |
| **Centralino AI** | Automatico: Otto risponde. Ogni tanto una chiamata che non sa chiudere → missione al telefono. | missione |
| **Recensioni AI** | Automatico con risposta da approvare (azione). Le recensioni difficili → missione. | azione + missione |
| **WhatsApp** | Conferme automatiche; la bozza sbagliata → missione. | missione |
| **Fidelity & NFC** | Lettore NFC al tavolo: card fisica o nel telefono, livelli Bronzo/Argento/Oro (sconto 0/5/10% sulla cucina), premi pagati con il saldo, campagne WhatsApp solo con consenso. **Card al tavolo** (si apre a caso dal capitolo 2/3 o dal livello 2): l’ospite appoggia la card e chiede un premio o paga; si sceglie premio, sconto del livello o solo punti. Scelta sbagliata −5, attesa oltre 40 s → rosso, oltre 100 s rinuncia (−5). Il premio o lo sconto finisce davvero sul conto del tavolo. Missioni: premio sì o no, il premio giusto (saldo e allergie), il conto con la card (livello 2), a chi mandi la campagna (capitolo 2). | indicatore vivo + compiti + missioni |
| **Magazzino** | Automatico: ogni piatto scala gli ingredienti; sotto scorta → compito "invia l'ordine". La fattura del fornitore → missione. | compito + missione |
| **Cassa & Entrate** | Automatica, con chiusura di cassa per metodo (contanti, POS, Stripe, bonifici delle piattaforme). Missioni: caselle dalla fonte, **i conti tornano?** (pagamenti contro documenti commerciali), **il cassetto torna?** (livello 2). | missione |
| **Bandi** | Bandi con percentuale, massimale, spese ammesse, documenti pronti e contributo stimato. Missioni: spese ammissibili, **quanto vale il contributo** (livello 2; al livello 3 l’IVA esclusa). | missione |
| **Staff & HACCP** | **Quattro frigoriferi con sonda di temperatura** che si vede cambiare. Possono succedere: **porta rimasta aperta** (la temperatura sale in fretta: chiudila), **guasto del compressore** (sale piano: chiama il tecnico, ci mette un po'), **sonda scollegata** (valore che non si muove: ricollegala). Oltre i 4 °C il frigo è rosso (−1 pt/s); oltre gli 8 °C si butta la merce (ingredienti persi, −10). La checklist da validare → missione. | indicatore vivo + missione |
| **Brand & app** | Ripensata come **costruttore dell’app del locale** (non il menu QR): colori, sezioni, regole delle prenotazioni, anteprima sul telefono con home, prenota, card digitale e avvisi; notifiche push e stato sugli store. Missioni: allergeni del piatto del giorno, la notifica giusta, le prenotazioni dell’app (livello 2), la scheda dello store (capitolo 2). | missione |

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
| **Osservatorio** | Numeri della settimana (novità, pratiche toccate, bandi). La novità che si applica o no → missione; dal capitolo 2, a caso, “chi va avvisato?” (decadenza prima casa). | missione |
| **Staff & task** | Qualcuno in ferie → missione di riassegnazione; dal livello 2, a caso, “chi segue la firma?”. | missione |
| **Scadenziario & post-stipula** | Il "fornello" dello studio: gli atti firmati generano **adempimenti con scadenza di legge** (registrazione, trascrizione, voltura, deposito). L'addetto ne lavora **2 alla volta** e ognuno richiede tempo. Un adempimento vicino alla scadenza e non avviato → rosso (−1 pt/s); se scade, **sanzione** (−15). | indicatore vivo + missione |
| **Antiriciclaggio** | Il titolare effettivo da calcolare → missione. | missione |
| **Compliance** | Richieste degli interessati con scadenza a un mese e controlli privacy. Le richieste di accesso ai dati → missione; dal capitolo 2, a caso, la violazione dei dati in fila (contenere, valutare, Garante entro 72 ore, informare, registrare). | missione |

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
| 4 · L'ispettore ASL | l'ispezione a sorpresa | i frigoriferi si guastano più spesso | vinci 2 missioni di HACCP o Allergeni |
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
4. **Notaro**: posta con tempo di risposta (2 minuti), che vale solo per le email arrivate durante la sfida (una nuova ogni minuto e mezzo circa; quelle già in casella all'inizio non fanno perdere punti); adempimenti post-stipula con capienza (2), tempo di lavoro (25 s), scadenza e sanzione.
5. **Rosso**: ogni cosa in rosso costa 1 punto al secondo, al massimo 2 in totale; il tempo si ferma con le nuvolette e le chat di Otto. Quando si perdono punti lo si vede sempre: una **striscia rossa** sotto la barra in alto dice quanti punti al secondo e perché (“Comande ferme in cucina”, “Cella carni fuori temperatura”, “2 email aspettano risposta…”), e la voce del menu a sinistra si colora di rosso con un puntino che pulsa. Un clic sulla striscia porta alla sezione.
7. **Barra in alto**, su una riga: il quadrato rosso “!” delle cose da fare, poi lo schermino del capitolo, poi i punti; la Bottega di Otto ha lo stesso schermino a fosfori verdi.
8. **Fine partita**: chiuso il quinto capitolo arriva la schermata finale (“Hai completato la cena di oggi” / “Hai completato la settimana in studio”) con punti, missioni vinte, compiti fatti e minuti di gioco; si può continuare, ricominciare da capo o scrivere su WhatsApp.
6. **Storia**: cinque capitoli per gioco con chat di apertura e chiusura, obiettivo visibile in alto, missioni spostate verso l'antagonista e regole che si stringono; +50 punti a capitolo.

## 6b. Varietà, caso e nuove meccaniche
- **Capitoli a caso**: ogni posto della storia ha tre varianti (antagonista, testo, sezioni coinvolte, regola). A ogni partita se ne estrae una con `crypto.getRandomValues`: 3⁵ = 243 serate diverse per gioco. Anche la schermata finale ha tre testi, e cita i capitoli giocati davvero.
- **Fine capitolo**: schermata “stage” con il racconto di chiusura, la barra dei capitoli, i numeri del capitolo (punti, missioni, compiti, punti persi in rosso), il bonus e il titolo del capitolo dopo.
- **Ordine dei settori rimescolato** a ogni partita: le prime missioni non sono più sempre Cucina e Sala.
- **Spiegazioni di Otto variate**: per ogni settore due versioni del “cosa” e del “perché”, tre aperture, tre modi di dire “perché conta” e tre chiusure. Ogni tipo di minigioco nuovo in un settore ha la sua spiegazione.
- **Nuovi minigiochi**: *caccia agli errori* (più problemi in un documento, ognuno si spiega quando lo trovi) e *in fila* (i passaggi di una procedura vera, dal primo all’ultimo).
- **Nuove missioni**: Restaurant · ricevimento merce refrigerata (temperatura, imballo, etichetta, lotto, scadenza) e procedure HACCP (sanificazione, abbattimento, porta della cella); Notaro · l’email truffa del cambio IBAN e le procedure dello studio (il giorno del rogito, il testamento pubblico, la costituzione di S.r.l.).
- **Ospiti all’ingresso** (Restaurant, Sala): arrivano gruppi senza prenotazione; si tocca il gruppo e poi un tavolo libero abbastanza grande. Il tavolo più piccolo che basta vale di più. Dopo 60 s l’attesa è rossa, dopo 130 s se ne vanno (−10).
- **Sala d’attesa e sale riunioni** (Notaro, Centralino & segreteria): le parti di un appuntamento arrivano con il loro numero (una stipula non entra nello studio del notaio, un testamento sì con i due testimoni). Finito l’appuntamento la sala si libera, e un atto firmato fa nascere il suo adempimento nello Scadenziario.
- **Il tempo fermo vale per tutto**: mentre Otto parla, anche porta, cucina, frigo, email, adempimenti e sale restano fermi.
- **Bottega in due parti**: *potenziamenti fissi* (sempre in vetrina, durano tutta la partita, 300–1.200 punti, +40% se si ricomprano: automatismi, cuoco, forno, maître che accomoda da solo, prenotazioni online, sale…) e *temporanei* (in vendita oggi, a caso, +25% a ogni acquisto). I regali sono solo temporanei. Ospiti alla porta meno frequenti (uno ogni 85–125 s al livello 1).
- **Bottega**: Hostess all’ingresso, Prenotazioni online (Restaurant); Receptionist, Sala riunioni in più (Notaro). I potenziamenti comprati sono bonus separati: le regole dei capitoli non li cancellano più.

## 6c. Sezioni nuove e caso (19 ottobre 2026)
- **Restaurant passa a 13 moduli**: nuovo **Delivery** (Sala & cucina · 04), **Fidelity & NFC** e **Brand & app** ridisegnati come prodotti veri, **Cassa** con chiusura di cassa, **Bandi** con contributo stimato e documenti.
- **Non tutto arriva sempre.** A ogni partita si estrae: da quando si aprono il Delivery vivo (capitolo 2, capitolo 3, livello 3 o mai) e le card al tavolo (capitolo 2, 3, livello 2 o mai); quali missioni in più sono accese (ognuna con la sua probabilità, 60–85%) e da quando (capitolo o livello). Il Delivery non ha una missione di base: le sue arrivano solo dal capitolo 2. Lo stesso schema vale nel Notaro per Osservatorio, Staff e Compliance.
- **Storia**: nuova variante del capitolo 3, *Il temporale* (diluvia, ordini delivery quasi doppi: apre per forza il delivery); *La finale in TV* porta anche il delivery; *Il POS che fa i capricci* include la Fidelity.
- **Bottega, potenziamenti fissi nuovi**: Tablet unico delivery (accetta da solo, 900), Addetto al banco delivery (consegna da solo ai rider, 1.000), Accordo con le piattaforme (+30 s di pazienza dei rider, 500), Cassa collegata alla fidelity (premi e sconti da soli, 700).
- **Demo guidata**: tre passaggi sul Delivery (canali, dal tablet al rider, pausa del canale), tre su Fidelity (card al tavolo, livelli e premi, campagne) e due su Brand & app (costruttore, anteprima sul telefono).

## 6d. Passata finale di coerenza (19 ottobre 2026, chiusura del progetto)
- **Fuori dalla sfida le azioni vive le fa Otto, nella sfida le fai tu.** Restaurant: la **cucina** della demo base va avanti da sola (niente più tasti “Avvia / Segna pronto / Segna servito” doppi rispetto alla simulazione), come il delivery; le **celle frigorifere** oscillano di qualche decimo (l’etichetta “in tempo reale” ora è vera). Notaro: lo **Scadenziario** mostra anche fuori dalla sfida gli adempimenti che Paolo lavora due alla volta, da solo, senza rosso né sanzioni. Porta del locale e sala d’attesa restano solo nella sfida (in entrambi i giochi).
- **Una sola cucina anche per il delivery.** Un ordine accettato entra in Cucina nella colonna *In attesa* (stato `queue`) e occupa un fornello come un piatto della sala: nella sfida si mette sui fornelli con lo stesso tasto (“Metti sui fornelli”), con l’automatismo della cucina ci va da solo. Comande delivery ferme oltre il tempo massimo fanno andare in rosso la colonna come quelle della sala; i contatori delle colonne e del menu contano anche il delivery. Nuovo compito “Delivery … aspetta i fornelli”; il rider ha 13 s di margine in più per l’attesa dei fornelli. Otto lo spiega quando si apre il delivery.
- **Bottega**: i potenziamenti delivery fissi restano tre (Tablet unico, Addetto al banco, Accordo con le piattaforme), già con i prezzi degli altri fissi.
- **WhatsApp & campagne**: nuova missione a caso dal capitolo 2 (75%), in due varianti: *Il pubblico giusto* (consenso + interesse) e *Quando la mandi?* (orari che non disturbano, anticipo giusto).
- **Schede coerenti**: ogni gruppo di schede ha un titolo (chiamate del Centralino, bandi, termini di legge, adeguata verifica, registri delle visure, team dello Staff); gli elenchi che crescono sono riquadri che si scorrono con la fascia scura (bandi, visure, registro delle azioni); nelle file a più colonne nessuna scheda parte più in basso; la pianta della sala si allunga fino al tavolo aperto; le schede dell’ecosistema hanno il piede in fondo; i tavoli sotto il QR sono quattro per pagina; il team dello Staff va a capo su tre colonne invece di uscire dallo schermo; nella barra in alto i titoli lunghi si accorciano (1024 px).
- **Demo guidata**: il passaggio della cucina evidenzia la carbonara del tavolo 3 e la fa avanzare da sola; nuovo passaggio Notaro sugli adempimenti in lavorazione. Controllate in automatico: 32 passaggi Restaurant e 21 Notaro puntano tutti a un elemento visibile.

## 7. Prossimi passi possibili
- Nel riepilogo finale: punti per sezione e cosa è andato in rosso.
- Una classifica locale delle partite.
- La demo guidata del gioco, quando le meccaniche sono stabili.

## 6e. Ritocchi dopo il gameplay del video 4 (22 ottobre 2026)
- **Menu e magazzino legati davvero.** Lo chef chiede di togliere un piatto solo quando un suo ingrediente è sotto scorta e restano 4 porzioni o meno (e nessuno ha ancora inviato l’ordine: se lo invii, la richiesta cade). Appena la merce torna, lo chef chiede di **rimetterlo** (compito urgente): la cucina non resta più col solo Chianti. Un cambio di prezzo in sospeso cede il posto a queste richieste. Nella sfida, se nessuno ordina, il fornitore passa da solo dopo 90 s di magazzino vuoto.
- **Ordini al tavolo**: si ordina soprattutto dalla cucina; il vino si aggiunge ogni tanto. Nel telefono del QR c’è il tasto **−** accanto al **+**.
- **Tavoli a colori**: blu aspettano i piatti, rosso mangiano, verde hanno finito (un minuto dopo l’ultimo piatto) e si possono far pagare, verde col bollino rosso chiedono il conto. Farli pagare prima del verde costa **4 punti**: a volte serve per liberare un tavolo. Chi ha finito non ordina più.
- **Personaggi**: 32 gruppi all’ingresso (aziende come Arno Tech, Officine Galileo, Verdeluce; famiglie, coppie, turisti, il calcetto del giovedì…), ognuno con un dettaglio e la sua pazienza; nessuno entra due volte nella stessa sera. Card fedeltà e delivery con più nomi. Nel Notaro le parti in sala d’attesa sono legate all’atto (soci per la S.r.l., eredi per la successione…).
- **Frigoriferi**: guasti più radi e uno alla volta (tranne l’ispezione ASL); con il tecnico già chiamato la cella non toglie punti.
- **Punti del capitolo**: ciò che si spende in Bottega o negli indizi non conta come punti persi (prima un acquisto da 1.000 punti portava l’obiettivo del sabato a −973).
- **Missioni del capitolo**: se il capitolo chiede missioni e da 90 s non ne arriva nessuna, se ne può aprire una in più, quasi sempre dalle sezioni del capitolo.
- **Delega a Otto** funziona anche sui compiti. **A pranzo** storia e finale parlano di pranzo, non di cena.
- **Curva di difficoltà (23 ottobre)**: il livello segue i capitoli, non i punti (capitoli 1-2 → livello 1, 3 → 2, 4-5 → 3). Ogni missione extra ha una difficoltà da 1 a 3 e si sblocca solo quando il livello la raggiunge; a ogni partita si pesca un mazzo bilanciato di 9 extra (3 per difficoltà), e tra una missione e la successiva passano 70-110 s invece di 120-180 nel ristorante, le 3 del Notaro restano tutte. Le missioni “di mestiere” danno la regola nelle fonti: ogni piatto del delivery dice perché viaggia o no, il contratto della piattaforma dice come si arriva al netto.
