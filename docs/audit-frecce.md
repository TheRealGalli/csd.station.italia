# Ricognizione delle frecce — CSD Station

25 ottobre 2026. Analisi del codice attualmente raggiungibile da src/main.tsx, desktop e mobile. Ricognizione iniziale, seguita dagli interventi concordati riportati qui sotto. Le righe dell’inventario descrivono lo stato prima degli interventi e possono spostarsi dopo le modifiche.

## Interventi applicati dopo la ricognizione

- Forecasting: le quattro frecce decorative sono sostituite da posate, borsa da negozio, pacco e fulmine. Nessun nuovo link WhatsApp sui settori.
- Consulenza: rimosse le tre frecce finali nella lista delle competenze; restano le icone tematiche.
- Training: spunta visibile soltanto sulla modalità selezionata.
- Demo consulenza: spunta visibile soltanto sullo scenario selezionato.
- Mantenute le frecce di navigazione, azione e spiegazione dei grafici.

## Esito della ricognizione iniziale

90 posizioni di icone Arrow/Chevron: 86 dentro link, pulsanti o summary, 4 posizioni senza azione. Le posizioni generate da map si ripetono: non sono 90 frecce visibili contemporaneamente. La presenza di un collegamento non prova la raggiungibilità della destinazione esterna; non sono stati inviati messaggi né testati tutti i flussi nel browser.

- Forecasting, settori: 4 frecce diagonali decorative. Proposta: link WhatsApp con settore e obiettivo già nel messaggio, etichetta “Parliamo del tuo ristorante/negozio/magazzino/impianto”. Meglio rendere cliccabile un invito esplicito, non solo l’icona.
- Consulenza, “La tecnologia giusta”: 3 frecce diagonali decorative. Proposta: rimuoverle; le righe hanno già un’icona tematica. Se serve un contatto dedicato, aggiungere un invito esplicito, non rendere cliccabile testo descrittivo senza spiegazione.
- Forecasting, “La settimana che arriva”: freccia orizzontale che indica l’orizzonte temporale. Mantenerla come parte del grafico, non come bottone.
- Demo inventario, “6 → 5”: freccia che rappresenta una variazione. Mantenerla.

## Controlli esistenti

- Contatti: WhatsApp contestuale o email. Prodotti NFC e piani Sito & Social includono già prodotto/piano nel messaggio.
- Navigazione: pagine servizi, profilo competenze, condizioni/privacy e ritorno dalla pagina 404.
- Frecce verso il basso: ancore alla sezione indicata.
- Training: i due pulsanti remoto/presenza selezionano una preferenza che viene inserita nel messaggio WhatsApp. Funzionano, ma una spunta o un selettore comunica la funzione meglio di una freccia diagonale.
- Demo consulenza: le frecce nei tre selettori cambiano scenario; quelle di avanzamento mostrano il passaggio successivo. Per i selettori è più coerente usare uno stato selezionato.
- Lead: avanti/indietro cambia passaggio; ai limiti il pulsante precedente è disabilitato e l’ultimo permette di ricominciare.
- Sito & Social: frecce del carosello cambiano slide, nascoste/disabilitate ai limiti.
- FAQ: chevron apre/chiude la risposta; mantenere.

## Regola proposta

↗ per un collegamento reale; ↓ per scorrere alla sezione; ‹/› per avanti/indietro; chevron per espandere. Per testo descrittivo usare l’icona tematica esistente o nessuna icona aggiuntiva. Il simbolo CSD resta un elemento di identità, non un falso controllo.

## Inventario completo delle icone nel sito principale

| File e riga | Icona | Contenitore / azione nel codice |
|---|---|---|
| src/pages/NotFound.tsx:15 | ArrowLeft | a: href="/" |
| src/components/station/OsDemo.tsx:63 | ArrowUpRight | a: href={contact} |
| src/components/station/OsDemo.tsx:72 | ArrowUpRight | a: href={contact} |
| src/components/station/Station.tsx:77 | ArrowUpRight | a: href={contactHref} |
| src/components/station/Station.tsx:81 | ArrowUpRight | a: href="mailto:carlo@csd-station.it" |
| src/components/station/Station.tsx:89 | ArrowUpRight | a: href={c.href} |
| src/components/station/Station.tsx:89 | ArrowRight | a: href="mailto:carlo@csd-station.it" |
| src/components/station/Station.tsx:102 | ArrowUpRight | a: href={processContact} |
| src/components/station/Station.tsx:102 | ArrowDown | a: href="#demo" |
| src/components/station/Station.tsx:102 | ArrowDown | a: href="#services" |
| src/components/station/Station.tsx:104 | ArrowUpRight | a: href="#demo" |
| src/components/station/Station.tsx:104 | ArrowRight | a: href="#demo" |
| src/components/station/Station.tsx:104 | ArrowUpRight | Link: to={servicePaths.nfc} |
| src/components/station/Station.tsx:104 | ArrowRight | Link: to={servicePaths.nfc} |
| src/components/station/Station.tsx:104 | ArrowRight | Link: to={servicePaths.training} |
| src/components/station/Station.tsx:107 | ArrowUpRight | Indicatore visivo; nessun controllo |
| src/components/station/Station.tsx:108 | ArrowUpRight | a: href={skills} |
| src/components/station/Station.tsx:117 | ArrowDown | a: href="#prodotti" |
| src/components/station/Station.tsx:120 | ArrowUpRight | a: href={whatsapp(`Ciao Carlo! Mi interessa ${p.name} (${p.price}) di CSD Station. Vorrei informazioni su configurazione e spedizione.`)} |
| src/components/station/Station.tsx:122 | ArrowUpRight | Link: to={servicePaths.automazioni} |
| src/components/station/ServiceAnswers.tsx:7 | ChevronDown | Apre/chiude un dettaglio |
| src/components/station/StationExperiences.tsx:65 | ArrowRight | Indicatore visivo; nessun controllo |
| src/components/station/StationExperiences.tsx:77 | ArrowUpRight | button: onClick={() => choose(key)} |
| src/components/station/StationExperiences.tsx:92 | ArrowRight | button: onClick={() => { if (confirmed) choose(selected); else if (step === 3) { setConfirmed(true); } else { setStep(s => Math.min(3, s + 1)); } }} |
| src/components/station/MobileLanding.tsx:42 | ArrowRight | button: onClick={() => setResult(!result)} |
| src/components/station/MobileLanding.tsx:54 | ArrowUpRight | a: href={contact} |
| src/components/station/MobileLanding.tsx:55 | ArrowDown | a: href="#demo" |
| src/components/station/MobileLanding.tsx:68 | ArrowUpRight | a: href={contact} |
| src/components/station/MobileLanding.tsx:69 | ArrowUpRight | a: href={skills} |
| src/components/station/MobileLanding.tsx:70 | ArrowRight | Link: to={servicePaths.nfc} |
| src/components/station/MobileLanding.tsx:71 | ArrowRight | Link: to={servicePaths.training} |
| src/components/station/MobileLanding.tsx:84 | ArrowDown | a: href="#prodotti" |
| src/components/station/MobileLanding.tsx:93 | ArrowUpRight | a: href={whatsapp(`Ciao Carlo! Mi interessa ${product.name} (${product.price}) di CSD Station. Vorrei informazioni su configurazione e spedizione.`)} |
| src/components/station/MobileLanding.tsx:101 | ArrowUpRight | a: href={whatsapp('Ciao Carlo! Vorrei informazioni sui prodotti NFC di CSD Station.')} |
| src/components/station/MobileLanding.tsx:102 | ArrowRight | Link: to={servicePaths.automazioni} |
| src/components/station/Training.tsx:52 | ArrowUpRight | a: href={trainingContact} |
| src/components/station/Training.tsx:54 | ArrowDown | a: href="#training-percorso" |
| src/components/station/Training.tsx:66 | ChevronDown | Apre/chiude un dettaglio |
| src/components/station/Training.tsx:77 | ArrowUpRight | button: onClick={() => setFormat(format === 'remote' ? null : 'remote')} |
| src/components/station/Training.tsx:78 | ArrowUpRight | button: onClick={() => setFormat(format === 'onsite' ? null : 'onsite')} |
| src/components/station/Training.tsx:83 | ArrowUpRight | a: href={contact} |
| src/components/station/SitoSocial.tsx:61 | ChevronLeft | button: disabled={slide === 0} onClick={() => setSlide(slide - 1)} |
| src/components/station/SitoSocial.tsx:62 | ChevronRight | button: disabled={slide === slides.length - 1} onClick={() => setSlide(slide + 1)} |
| src/components/station/SitoSocial.tsx:84 | ArrowDown | a: href="#siti" |
| src/components/station/SitoSocial.tsx:103 | ArrowUpRight | a: href={whatsapp(`Ciao Carlo! Mi interessa il formato ${s.name} (${s.price}) per il sito della mia attività.`)} |
| src/components/station/SitoSocial.tsx:116 | ArrowUpRight | a: href={whatsapp(`Ciao Carlo! Mi interessa il piano ${p.name} (${p.price} al mese) per i social della mia attività.`)} |
| src/components/station/SitoSocial.tsx:137 | ArrowUpRight | a: href={whatsapp('Ciao Carlo! Mi interessa il Pacchetto Presenza (Sito standard, 10 caroselli e 6 reel al mese). Possiamo parlarne?')} |
| src/components/station/SitoSocial.tsx:156 | ArrowUpRight | Link: to={servicePaths.nfc} |
| src/components/station/SitoSocial.tsx:183 | ArrowUpRight | a: href={instagram} |
| src/components/station/SitoSocial.tsx:185 | ArrowUpRight | a: href={whatsapp(b.cta)} |
| src/components/station/SitoSocial.tsx:186 | ArrowUpRight | Link: to={servicePaths.nfc} |
| src/components/station/ForecastPage.tsx:47 | ArrowRight | Indicatore visivo; nessun controllo |
| src/components/station/ForecastPage.tsx:108 | ArrowUpRight | a: href={forecastContact} |
| src/components/station/ForecastPage.tsx:108 | ArrowDown | a: href="#forecasting-prova" |
| src/components/station/ForecastPage.tsx:117 | ArrowUpRight | Indicatore visivo; nessun controllo |
| src/components/station/ForecastPage.tsx:119 | ArrowUpRight | Link: to="/privacy-policy/#forecasting" |
| src/components/station/ForecastPage.tsx:121 | ArrowUpRight | Link: to="/terms-of-service/#forecasting" |
| src/components/station/ForecastPage.tsx:126 | ArrowUpRight | a: href={forecastContact} |
| src/components/station/ForecastPage.tsx:126 | ChevronRight | a: href="mailto:carlo@csd-station.it?subject=Prova%20AI%20Forecasting" |
| src/components/station/ForecastPage.tsx:126 | ArrowUpRight | Link: to="/terms-of-service/#forecasting" |
| src/components/station/ForecastPage.tsx:126 | ArrowUpRight | Link: to="/privacy-policy/#forecasting" |
| src/components/station/ForecastPage.tsx:138 | ArrowUpRight | a: href={forecastContact} |
| src/components/station/ForecastPage.tsx:141 | ArrowDown | a: href="#forecasting-prova" |
| src/components/station/ForecastPage.tsx:150 | ArrowUpRight | Link: to="/terms-of-service/#forecasting" |
| src/components/station/ForecastPage.tsx:158 | ChevronRight | Apre/chiude un dettaglio |
| src/components/station/ForecastPage.tsx:160 | ArrowUpRight | a: href={forecastContact} |
| src/components/station/ForecastPage.tsx:162 | ArrowUpRight | Link: to="/privacy-policy/#forecasting" |
| src/components/station/ForecastPage.tsx:162 | ArrowUpRight | Link: to="/terms-of-service/#forecasting" |
| src/components/station/LeadPage.tsx:37 | ArrowLeft | button: onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} |
| src/components/station/LeadPage.tsx:37 | ArrowRight | button: onClick={() => setStep(step === stages.length - 1 ? 0 : step + 1)} |
| src/components/station/LeadPage.tsx:44 | ArrowUpRight | a: href={leadContact} |
| src/components/station/LeadPage.tsx:44 | ArrowDown | a: href="#lead-percorso" |
| src/components/station/LeadPage.tsx:48 | ArrowUpRight | Link: to="/terms-of-service/#lead" |
| src/components/station/LeadPage.tsx:50 | ArrowUpRight | Link: to="/terms-of-service/#lead" |
| src/components/station/LeadPage.tsx:50 | ArrowUpRight | Link: to="/privacy-policy/#lead" |
| src/components/station/LeadPage.tsx:50 | ArrowUpRight | a: href={leadContact} |
| src/components/station/LeadPage.tsx:70 | ArrowUpRight | a: href={leadContact} |
| src/components/station/LeadPage.tsx:72 | ArrowDown | a: href="#lead-percorso" |
| src/components/station/LeadPage.tsx:81 | ArrowRight | button: onClick={() => setStep((step + 1) % mobileStages.length)} |
| src/components/station/LeadPage.tsx:92 | ArrowUpRight | a: href={leadContact} |
| src/components/station/LeadPage.tsx:94 | ArrowUpRight | Link: to="/terms-of-service/#lead" |
| src/components/station/LeadPage.tsx:94 | ArrowUpRight | Link: to="/privacy-policy/#lead" |
| src/components/station/MediaPage.tsx:172 | ArrowUpRight | a: href={deck.src} |
| src/components/station/MediaPage.tsx:333 | ArrowDown | a: href="#slide" |
| src/components/station/MediaPage.tsx:358 | ArrowUpRight | a: href={whatsapp('Ciao Carlo! Mi interessano le slide interattive (49 € per 15 slide).')} |
| src/components/station/MediaPage.tsx:361 | ArrowUpRight | a: href={whatsapp('Ciao Carlo! Mi interessa un video motion interattivo (99 € al minuto).')} |
| src/components/station/MediaPage.tsx:363 | ArrowUpRight | a: href="/terms-of-service/#studenti" |
| src/components/station/MediaPage.tsx:452 | ArrowUpRight | a: href={mediaContact} |
| src/components/station/MediaPage.tsx:453 | ArrowDown | a: href="#mm-slide" |
| src/components/station/MediaPage.tsx:471 | ArrowUpRight | a: href={whatsapp('Ciao Carlo! Vorrei slide e video come quelli della pagina Video & Slide.')} |

## Altri asset pubblicati

- Pagine legali: “Vai a Privacy/Termini →” è un vero Link alla pagina complementare.
- Slide Università (public/video-slide/slide-01-universita.html): frecce “Mostra il prossimo dato”, “Passo successivo”, “Indietro” e “Avanti” appartengono a pulsanti; le frecce dell’elenco dei vantaggi sono punti elenco illustrativi.
- Video e animazioni incorporati: le frecce disegnate nei grafici sono parte del contenuto; i controlli di riproduzione non vanno trasformati in link commerciali.
- Demo Restaurant OS e Notaro OS: i template in os-demos/ usano frecce nei link ai moduli, risultati di ricerca, pulsanti operativi e avanzamento del tour. Le chevron nei percorsi sono separatori; le punte dei fumetti indicano il controllo spiegato. Sono demo con logiche simulate: l’audit di tutte le azioni operative richiederebbe un collaudo dedicato, non è compreso nella conta delle 90 posizioni React.
- cs-dentista-os è presente nei sorgenti, ma non è tra le due demo copiate dallo script di pubblicazione corrente.
