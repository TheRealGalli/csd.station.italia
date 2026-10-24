import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StationFooter, StationHeader } from '@/components/station/Station';
import '@/components/station/station.css';
import './legal.css';

// Privacy e Termini: due pagine, ognuna con una parte generale e una sezione per ogni servizio.
// I vecchi indirizzi (/nfc/..., /cookie-policy/) aprono la pagina giusta alla sezione giusta.
export type LegalDoc = 'privacy' | 'termini';
type Section = { id: string; label: string; body: React.ReactNode };

const UPDATED = '24 ottobre 2026';
const mail = <a href="mailto:carlo@csd-station.it">carlo@csd-station.it</a>;

const Owner = () => <div className="legal-card">
  <p><strong>Carlo Galli</strong>, ditta individuale che opera con il marchio CSD Station</p>
  <p>P.IVA 01630510525 · Via Francesco Campana 45, 53034 Colle di Val d’Elsa (SI), Italia</p>
  <p>Email {mail} · Telefono e WhatsApp +39 351 862 8203</p>
</div>;

const privacy: Section[] = [
  { id: 'generale', label: 'Informativa generale', body: <>
    <p>Questa informativa spiega quali dati personali trattiamo, perché e per quanto tempo, ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003. Vale per il sito <code>csd-station.it</code> e per tutti i servizi; le sezioni successive aggiungono i dettagli di ciascun servizio.</p>
    <h3>Titolare del trattamento</h3>
    <Owner/>
    <h3>Quali dati trattiamo</h3>
    <ul>
      <li><strong>Richieste di contatto:</strong> nome, recapiti e contenuto dei messaggi che ci invii via WhatsApp, email o telefono.</li>
      <li><strong>Clienti:</strong> dati anagrafici e fiscali per preventivi, contratti e fatture, e i materiali che ci consegni per svolgere il lavoro.</li>
      <li><strong>Contatti professionali da fonti pubbliche:</strong> recapiti di aziende e professionisti presi da fonti pubbliche (ad esempio schede Google o registri delle imprese), usati per proposte commerciali B2B pertinenti, con informativa al primo contatto e possibilità di opporsi in qualsiasi momento.</li>
    </ul>
    <h3>Perché li trattiamo e su quale base</h3>
    <ul>
      <li>Rispondere alle richieste e preparare preventivi: misure precontrattuali (art. 6.1.b GDPR).</li>
      <li>Svolgere i servizi acquistati: esecuzione del contratto (art. 6.1.b).</li>
      <li>Fatturazione e adempimenti fiscali: obbligo di legge (art. 6.1.c).</li>
      <li>Proposte commerciali B2B, tutela dei nostri diritti e sicurezza: legittimo interesse (art. 6.1.f), con diritto di opposizione.</li>
    </ul>
    <p>Non vendiamo dati, non facciamo profilazione e non prendiamo decisioni automatizzate che ti riguardano.</p>
    <h3>Per quanto tempo</h3>
    <ul>
      <li>Richieste senza seguito: fino a 24 mesi dall’ultimo contatto.</li>
      <li>Dati contrattuali e fiscali: 10 anni, come previsto dalla legge italiana.</li>
      <li>Materiali di lavoro: per la durata del servizio e per i tempi indicati nella sezione di ciascun servizio.</li>
    </ul>
    <h3>A chi possono arrivare</h3>
    <ul>
      <li><strong>Google</strong> (Google Workspace: email, documenti, videochiamate), come fornitore e responsabile del trattamento.</li>
      <li><strong>WhatsApp / Meta</strong>, se scegli di scriverci su WhatsApp: il servizio è regolato anche dall’informativa di WhatsApp.</li>
      <li><strong>GitHub</strong>, che ospita il sito.</li>
      <li>Commercialista, banca e servizi di pagamento, solo per amministrazione e pagamenti.</li>
      <li>Autorità pubbliche, quando la legge lo richiede.</li>
    </ul>
    <p>Alcuni di questi fornitori hanno sede negli Stati Uniti: il trasferimento avviene con le garanzie del Capo V del GDPR (EU-U.S. Data Privacy Framework o Clausole Contrattuali Standard).</p>
    <h3>I tuoi diritti</h3>
    <p>Puoi chiedere in ogni momento accesso, rettifica, cancellazione, limitazione, portabilità dei dati e opporti al trattamento (artt. 15-22 GDPR), scrivendo a {mail}. Rispondiamo entro un mese. Puoi anche proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">garanteprivacy.it</a>).</p>
    <h3>Minori</h3>
    <p>I servizi sono rivolti a maggiorenni. Se un servizio riguarda un minore (ad esempio una tesina di maturità), il rapporto e i dati passano da un genitore o da chi ne fa le veci.</p>
  </> },
  { id: 'cookie', label: 'Cookie e navigazione', body: <>
    <p><strong>Il sito non usa cookie</strong>: né tecnici, né analitici, né di profilazione. Per questo non trovi nessun banner da accettare.</p>
    <ul>
      <li><strong>Nessuno strumento di statistica o pubblicità</strong> e nessun pixel di social network.</li>
      <li><strong>Caratteri ospitati sul sito</strong>: i font non vengono scaricati da server di terze parti.</li>
      <li><strong>Hosting:</strong> GitHub, che ospita il sito, registra dati tecnici di accesso (come l’indirizzo IP) per sicurezza e funzionamento, secondo la propria informativa. Noi non li consultiamo per identificare i visitatori.</li>
      <li><strong>Demo interattive</strong> (Restaurant OS e Notaro OS): salvano solo nel tuo browser lo stato della demo e la preferenza dell’audio. Questi dati non ci vengono inviati e puoi cancellarli dalle impostazioni del browser.</li>
      <li><strong>Link esterni</strong> (WhatsApp, Instagram, Google Maps): si aprono solo se li tocchi; da quel momento valgono le informative di quei servizi.</li>
    </ul>
    <p>Se in futuro introdurremo cookie o strumenti di misurazione, aggiorneremo questa pagina e, dove serve, chiederemo il tuo consenso prima di attivarli.</p>
  </> },
  { id: 'consulenza', label: 'Consulenza AI e automazioni', body: <>
    <ul>
      <li><strong>Sviluppo e consegna:</strong> progettiamo, configuriamo e collaudiamo le automazioni nell’ambiente concordato con il Cliente (di norma Google Workspace e Google Cloud).</li>
      <li><strong>Durante lo sviluppo</strong>, se dobbiamo accedere a dati personali del Cliente, agiamo come responsabile del trattamento (art. 28 GDPR) secondo l’Accordo di Servizio, usando dati di prova ogni volta che è possibile.</li>
      <li><strong>Dopo la consegna</strong> il sistema passa interamente al Cliente: non conserviamo accessi e non trattiamo i dati che vi transitano. Il Cliente resta titolare dei propri dati; l’infrastruttura fa capo a Google come fornitore.</li>
      <li><strong>Strumenti di intelligenza artificiale:</strong> scegliamo con il Cliente quali servizi usare e quali dati possono entrarci; non inseriamo dati personali in strumenti AI senza averlo concordato.</li>
    </ul>
  </> },
  { id: 'nfc', label: 'Card NFC', body: <>
    <ul>
      <li><strong>Nessun tracciamento dei clienti finali:</strong> la card e il QR code portano direttamente alla pagina scelta dal Cliente (ad esempio la scheda Google). Non raccogliamo né vediamo recensioni, stelle o identità di chi la usa.</li>
      <li><strong>Statistiche anonime e aggregate</strong> (numero di tap, giorni e orari più frequenti), usate solo per i report al Cliente, senza profilazione.</li>
      <li><strong>Dati del Cliente:</strong> dati di fatturazione e spedizione, link di destinazione ed email per i report, trattati per eseguire l’ordine (art. 6.1.b), per obblighi fiscali (art. 6.1.c) e per la sicurezza del servizio di reindirizzamento (art. 6.1.f).</li>
      <li><strong>Conservazione:</strong> dati fiscali 10 anni; statistiche aggregate per la durata del servizio di report.</li>
    </ul>
  </> },
  { id: 'training', label: 'Training AI', body: <>
    <ul>
      <li><strong>Dati dei partecipanti:</strong> nome, email di lavoro e ruolo, che riceviamo dall’azienda cliente per organizzare le sessioni e inviare inviti e materiali. La base è l’esecuzione del contratto con l’azienda e il nostro legittimo interesse a svolgerlo bene.</li>
      <li><strong>Sessioni da remoto</strong> su Google Meet: valgono anche le condizioni di Google. Non registriamo le sessioni, salvo accordo scritto con l’azienda e informativa ai partecipanti.</li>
      <li><strong>Esercitazioni:</strong> chiediamo di usare dati di esempio. Se un partecipante inserisce dati aziendali o personali negli strumenti AI dell’azienda, lo fa secondo le regole e con gli account dell’azienda, che ne resta titolare.</li>
      <li><strong>Conservazione:</strong> elenchi dei partecipanti e materiali condivisi fino a 12 mesi dopo l’ultima sessione, per eventuali richiami; poi li cancelliamo.</li>
    </ul>
  </> },
  { id: 'lead', label: 'Lead — riattivazione contatti', body: <>
    <p>Il servizio riguarda il ricontatto, per conto di un’azienda o di un professionista, di persone già presenti nel suo archivio e legittimamente ricontattabili. La lista non viene raccolta attraverso questo sito: nel primo messaggio chiediamo di descriverla senza allegare dati di terzi.</p>
    <ul>
      <li><strong>Dati necessari:</strong> recapiti, nominativi, contesto del precedente interesse, documentazione sulla provenienza e sulle autorizzazioni, messaggi, risposte ed esiti utili a verificare il risultato. Chiediamo di escludere informazioni non pertinenti e dati particolari non necessari.</li>
      <li><strong>Ruoli e istruzioni:</strong> prima di ricevere la lista definiamo per iscritto finalità, canali, strumenti, accessi e ruoli effettivi delle parti. Quando operiamo per conto e su istruzioni del Cliente come responsabile, sottoscriviamo l’atto previsto dall’art. 28 GDPR. Il ruolo non è determinato dalla sola etichetta contrattuale; se l’assetto richiede un ruolo diverso, lo definiamo con la relativa informativa prima di avviare i contatti.</li>
      <li><strong>Base del ricontatto:</strong> il Cliente deve documentare i presupposti del trattamento e le autorizzazioni richieste per il canale e la finalità scelti. Il contratto con CSD Station e la consegna della lista non sostituiscono il consenso dei destinatari né le verifiche richieste. Le persone già opposte o con consenso revocato sono escluse.</li>
      <li><strong>Strumenti e destinatari:</strong> il trasferimento della lista e gli eventuali servizi di invio, CRM o AI si concordano prima, verificando fornitori, accessi e trasferimenti fuori dallo SEE. Non riutilizziamo la lista per nostre campagne, non la vendiamo e non la inseriamo in strumenti AI senza un accordo e le verifiche necessarie.</li>
      <li><strong>Opposizioni e diritti:</strong> ogni campagna prevede un modo semplice per interrompere i contatti. Registriamo e trasmettiamo al Cliente opposizioni e richieste ricevute, sospendendo i relativi ricontatti; quando agiamo come responsabile, assistiamo il titolare nella gestione dei diritti.</li>
      <li><strong>Conservazione:</strong> a fine incarico restituiamo o cancelliamo lista e contenuti operativi entro 30 giorni, salvo diverso termine motivato e concordato. Restano soltanto i dati necessari a obblighi di legge, tutela dei diritti e rispetto delle opposizioni, per il tempo pertinente alla relativa finalità e secondo i ruoli definiti nell’accordo.</li>
    </ul>
  </> },
  { id: 'sito-social', label: 'Sito & Social', body: <>
    <ul>
      <li><strong>Materiali per siti e contenuti:</strong> testi, foto e video che il Cliente ci invia, anche via WhatsApp. Se ritraggono persone riconoscibili (dipendenti, clienti), il Cliente garantisce di avere il loro consenso alla pubblicazione.</li>
      <li><strong>Profili social:</strong> realizziamo e consegniamo i contenuti, ma non accediamo ai profili del Cliente e non leggiamo commenti o messaggi dei suoi follower.</li>
      <li><strong>Siti realizzati:</strong> per i dati dei visitatori del sito del Cliente il titolare è il Cliente. Se gestiamo noi dominio e pubblicazione (ad esempio nel Pacchetto Presenza), agiamo come responsabile del trattamento (art. 28 GDPR) solo per quanto necessario a tenere il sito online.</li>
      <li><strong>Strumenti nei siti:</strong> non inseriamo cookie, statistiche o pixel nei siti che realizziamo senza indicazione del Cliente; se li richiede, è il Cliente a dover predisporre informativa e consenso per i propri visitatori, anche con il nostro supporto tecnico.</li>
      <li><strong>Conservazione:</strong> materiali grezzi fino a 6 mesi dalla consegna o dalla fine del servizio; i contenuti consegnati restano al Cliente.</li>
    </ul>
  </> },
  { id: 'video-slide', label: 'Video & Slide', body: <>
    <ul>
      <li><strong>Materiali:</strong> testi, dati, immagini e bozze che ci invii, usati solo per realizzare slide e video. Non li usiamo per addestrare sistemi di intelligenza artificiale e non li carichiamo in strumenti AI se contengono dati personali.</li>
      <li><strong>Dati di terzi:</strong> se i tuoi materiali contengono dati di altre persone (ad esempio risposte a un questionario), inviali in forma anonima o aggregata. Per i clienti aziendali che ci affidano dati personali agiamo come responsabile del trattamento (art. 28 GDPR).</li>
      <li><strong>Verifica dello sconto studenti:</strong> ci basta vedere un documento che provi l’iscrizione (libretto, badge o certificato), anche in foto. Lo usiamo solo per la verifica e lo cancelliamo entro 30 giorni; teniamo traccia soltanto dell’esito, dell’ateneo e della data.</li>
      <li><strong>Portfolio:</strong> mostriamo un lavoro come esempio solo con il tuo consenso scritto, e senza dati personali.</li>
      <li><strong>Conservazione:</strong> file di lavoro e materiali fino a 90 giorni dalla consegna, per eventuali modifiche; poi li cancelliamo, salvo diversa richiesta.</li>
    </ul>
  </> },
];

const termini: Section[] = [
  { id: 'generale', label: 'Condizioni generali', body: <>
    <p>Questi Termini regolano il sito <code>csd-station.it</code> e i servizi offerti da:</p>
    <Owner/>
    <h3>A chi ci rivolgiamo</h3>
    <p>I servizi sono pensati per aziende, professionisti ed enti (B2B). L’unica eccezione sono le <strong>slide e i video per studenti</strong> della sezione Video & Slide, che possono essere acquistati da privati: in quel caso si applicano anche le tutele del Codice del Consumo (D.Lgs. 206/2005), descritte nella sezione dedicata.</p>
    <h3>Preventivo e conferma</h3>
    <ul>
      <li>I prezzi del sito partono da formati standard; il prezzo definitivo è quello del preventivo o dell’Accordo di Servizio, valido 30 giorni.</li>
      <li>Il contratto si conclude con l’accettazione scritta del preventivo, anche via email o WhatsApp, o con il pagamento dell’acconto.</li>
      <li>In caso di differenze, prevale il documento specifico (preventivo o Accordo di Servizio) su questi Termini.</li>
    </ul>
    <h3>Prezzi e regime fiscale</h3>
    <p>Operiamo in regime forfettario (art. 1, commi 54-89, L. 190/2014): le fatture non espongono IVA e non sono soggette a ritenuta d’acconto. Sulle fatture oltre 77,47 € si applica l’imposta di bollo di 2 €, a carico del Cliente. I prezzi indicati sul sito sono quindi già finali, salvo il bollo.</p>
    <h3>Pagamenti</h3>
    <ul>
      <li>Lavori una tantum: acconto del 50% alla conferma e saldo alla consegna, salvo diverso accordo. Gli ordini fino a 99 € si pagano per intero alla conferma.</li>
      <li>Servizi mensili: canone anticipato all’inizio di ogni mese.</li>
      <li>I file definitivi e i diritti d’uso passano al Cliente con il saldo. In caso di ritardo possiamo sospendere il lavoro; tra professionisti si applicano gli interessi di mora del D.Lgs. 231/2002.</li>
    </ul>
    <h3>Collaborazione e materiali del Cliente</h3>
    <ul>
      <li>Il Cliente fornisce in tempo informazioni, accessi e materiali; i tempi di consegna decorrono da quando li riceviamo.</li>
      <li>Il Cliente garantisce di avere i diritti su testi, immagini, marchi e dati che ci consegna e ne risponde verso terzi.</li>
      <li>Ogni servizio include il numero di revisioni indicato; ulteriori modifiche o richieste nuove si quotano a parte, sempre prima di eseguirle.</li>
    </ul>
    <h3>Proprietà intellettuale</h3>
    <ul>
      <li>Al saldo il Cliente può usare liberamente il lavoro consegnato per gli scopi concordati.</li>
      <li>Restano nostri gli strumenti, il codice di base, i modelli grafici riutilizzabili e il personaggio Otto, che il Cliente può usare all’interno del lavoro consegnato o chiederci di togliere.</li>
      <li>Con i clienti aziendali possiamo citare il progetto tra i nostri lavori, salvo opposizione scritta; con i privati solo con il loro consenso.</li>
    </ul>
    <h3>Intelligenza artificiale</h3>
    <p>Per grafiche, animazioni e montaggi usiamo anche strumenti di intelligenza artificiale, sempre con il nostro controllo e la nostra revisione. Non presentiamo come reali prodotti, piatti o ambienti generati dall’AI.</p>
    <h3>Nessuna garanzia di risultato</h3>
    <p>Garantiamo un lavoro fatto con cura e conforme a quanto concordato. Non possiamo garantire risultati che dipendono da terzi o dal mercato: follower, visualizzazioni, viralità, vendite, recensioni o, per gli studenti, il voto finale.</p>
    <h3>Responsabilità</h3>
    <p>Con i clienti aziendali la nostra responsabilità è limitata all’importo pagato per il servizio interessato ed esclude i danni indiretti, salvo dolo o colpa grave (art. 1229 c.c.). Con i consumatori valgono i limiti consentiti dal Codice del Consumo. Non rispondiamo di interruzioni o modifiche di piattaforme terze (Google, Meta, TikTok, servizi AI) né di cause di forza maggiore.</p>
    <h3>Riservatezza</h3>
    <p>Trattiamo come riservate le informazioni del Cliente che non sono pubbliche e le usiamo solo per svolgere il servizio.</p>
    <h3>Legge e foro</h3>
    <p>Si applica la legge italiana. Per i contratti con aziende e professionisti è competente in via esclusiva il Foro di Siena; per i consumatori, il foro del luogo in cui risiedono.</p>
    <p className="legal-note">Nei contratti con aziende e professionisti, le clausole su limitazione di responsabilità, sospensione del servizio e foro competente vanno approvate specificamente per iscritto (artt. 1341 e 1342 c.c.) nel preventivo o nell’Accordo di Servizio.</p>
  </> },
  { id: 'consulenza', label: 'Consulenza AI e automazioni', body: <>
    <ul>
      <li><strong>Accordo di Servizio:</strong> ogni progetto è descritto da una proposta tecnica (Accordo di Servizio) che definisce automazioni, tempi, prezzo e trattamento dei dati, e prevale su questi Termini.</li>
      <li><strong>Collaudo:</strong> a fine sviluppo il Cliente verifica che la soluzione funzioni come concordato. Con collaudo e saldo passa al Cliente la proprietà della soluzione sviluppata.</li>
      <li><strong>Garanzia:</strong> 90 giorni dalla consegna per i difetti del nostro codice, corretti gratuitamente.</li>
      <li><strong>Dopo la garanzia</strong>, o per problemi dovuti a modifiche di piattaforme terze o dell’ambiente del Cliente, l’assistenza è prevista solo con un accordo di manutenzione.</li>
      <li><strong>Uso corretto:</strong> il Cliente usa le soluzioni per scopi leciti e non decompila o rivende componenti che restano nostri, salvo accordo.</li>
    </ul>
  </> },
  { id: 'nfc', label: 'Card NFC', body: <>
    <ul>
      <li><strong>Fornitura:</strong> card fisiche con chip NFC programmato verso la scheda Google del Cliente; su richiesta, anche il file del QR code abbinato, senza costi.</li>
      <li><strong>Spedizione:</strong> in tutta Italia, indicativamente entro 7 giorni lavorativi dalla conferma e dall’invio dei dati di configurazione. Gratuita da 50 €; sotto, a carico del Cliente.</li>
      <li><strong>Reso commerciale:</strong> trattandosi di vendite B2B il Codice del Consumo non si applica, ma accettiamo il reso entro 14 giorni dal ricevimento se la card è integra e nell’imballo originale; la spedizione di ritorno è a carico del Cliente.</li>
      <li><strong>Report mensili</strong> anonimi inclusi, all’email indicata nell’ordine (modificabile scrivendo a {mail}). Il servizio di report e di reindirizzamento dura quanto il nostro software (“life of product”): se un giorno venisse dismesso, la card resta del Cliente e può essere riprogrammata.</li>
      <li><strong>Garanzia:</strong> card priva di difetti e chip funzionante alla consegna. Non rispondiamo di danni fisici, uso improprio o modifiche del Cliente alla propria scheda Google.</li>
    </ul>
  </> },
  { id: 'training', label: 'Training AI', body: <>
    <ul>
      <li><strong>Programma:</strong> concordato con il referente aziendale su strumenti, attività e obiettivi del team; da remoto su Google Meet o in presenza. Le spese di trasferta, se previste, sono indicate nel preventivo.</li>
      <li><strong>Date:</strong> una sessione si può spostare gratuitamente una volta, con almeno 3 giorni lavorativi di preavviso. Con preavviso minore è dovuto il 50% della sessione; in caso di assenza senza preavviso, l’intero importo.</li>
      <li><strong>Materiali:</strong> per uso interno dell’azienda cliente; non si possono rivendere, pubblicare o usare per formare terzi senza il nostro consenso. Le sessioni non si registrano senza accordo scritto.</li>
      <li><strong>Strumenti di terzi:</strong> il training usa gli strumenti e gli account dell’azienda; l’uso che i partecipanti ne fanno dopo il training, compresi i dati inseriti, resta sotto la responsabilità dell’azienda.</li>
      <li><strong>Attestati:</strong> l’eventuale attestato di partecipazione non è una certificazione ufficiale.</li>
    </ul>
  </> },
  { id: 'lead', label: 'Lead — riattivazione contatti', body: <>
    <h3>Oggetto e accordo prima dell’avvio</h3>
    <p>Il servizio è rivolto ad aziende e professionisti e consiste nella valutazione e nel ricontatto di una lista propria di contatti già interessati. Formato, leggibilità e conversione della lista sono verificati prima di accettare il lavoro. Canali, messaggi, offerta, tempi e gestione delle risposte sono concordati per iscritto; la semplice consegna di un elenco non autorizza l’avvio della campagna.</p>
    <h3>Dichiarazioni sulla lista e documentazione</h3>
    <p>Accettando l’incarico e consegnando la lista, il Cliente dichiara e garantisce che i dati sono stati raccolti lecitamente per le finalità concordate, che può comunicarli a CSD Station per eseguire il servizio e che dispone delle autorizzazioni necessarie a ricontattare ciascun destinatario sul canale prescelto. Conferma inoltre di avere escluso revoche del consenso e opposizioni e si impegna a documentare origine, informative e consensi applicabili, aggiornando tempestivamente tali informazioni.</p>
    <p>Non accettiamo liste rubate, ottenute tramite scraping, estratte da siti o elenchi pubblici, acquistate per questa campagna o prive di provenienza verificabile. Il precedente interesse di una persona non equivale, da solo, al consenso a ricevere comunicazioni promozionali. Per eventuali contatti telefonici devono essere svolte anche le verifiche sul Registro pubblico delle opposizioni e le altre verifiche richieste per il canale.</p>
    <h3>Verifiche e sospensione</h3>
    <p>Possiamo richiedere evidenze e svolgere controlli, anche a campione. In presenza di incongruenze, reclami o dubbi fondati sulla liceità sospendiamo immediatamente i ricontatti e chiediamo chiarimenti. Se i presupposti non sono dimostrati, rifiutiamo o interrompiamo l’incarico, comunicandone i motivi. La dichiarazione del Cliente non elimina gli obblighi e le responsabilità che la legge attribuisce a ciascuna parte.</p>
    <h3>Compenso legato al risultato</h3>
    <p>Il compenso di riattivazione è una quota del valore del cliente riattivato, definita per iscritto prima di iniziare. L’accordo precisa cosa costituisce il risultato, la base economica di calcolo, il periodo di attribuzione, le evidenze e le scadenze di rendicontazione e pagamento, oltre alla gestione di annullamenti, rimborsi e trattative già in corso. Una semplice apertura, risposta o prenotazione non è automaticamente un cliente riattivato. Non garantiamo un numero minimo di clienti o di vendite.</p>
    <p>Il compenso sul risultato matura solo quando l’esito concordato si è realizzato ed è verificabile. A questa componente non si applicano gli acconti standard dei lavori una tantum previsti nelle condizioni generali.</p>
    <h3>Lavoro preparatorio, anticipi e interruzione</h3>
    <p>Eventuali attività preparatorie con un costo autonomo sono facoltative e devono essere descritte, quantificate e approvate separatamente per iscritto prima di essere eseguite; non si intendono incluse automaticamente nell’incarico a risultato. In caso di interruzione per carenze imputabili alla lista o al Cliente, restano dovuti solo il lavoro preparatorio effettivamente svolto e i costi autorizzati e documentati, entro gli importi concordati. Eventuali anticipi possono essere imputati a tali voci con rendiconto; il residuo viene restituito. Il solo sospetto sulla lista non comporta la perdita automatica dell’intero anticipo.</p>
    <h3>Responsabilità e gestione dei dati</h3>
    <p>Il Cliente risponde della veridicità delle proprie dichiarazioni e della liceità dei dati forniti. Nei limiti consentiti dalla legge risponde anche dei danni e dei costi documentati direttamente causati da dichiarazioni false o istruzioni illecite a lui imputabili. Restano ferme le responsabilità di CSD Station per la propria condotta e i diritti degli interessati; non sono esclusi dolo, colpa grave o obblighi inderogabili. Il trattamento e la restituzione o cancellazione della lista sono disciplinati dall’accordo e dalla <Link to="/privacy-policy/#lead">sezione Lead dell’informativa privacy</Link>.</p>
    <p className="legal-note">Prima dell’avvio si formalizzano istruzioni e ruoli privacy. Le clausole su sospensione, interruzione e responsabilità sono richiamate nell’accordo e, quando richiesto dagli artt. 1341 e 1342 c.c., approvate specificamente per iscritto. L’invio della lista, da solo, non sostituisce queste formalità.</p>
  </> },
  { id: 'sito-social', label: 'Sito & Social', body: <>
    <h3>Siti</h3>
    <ul>
      <li><strong>Sito standard</strong> (da 344 €) e <strong>Sito motion graphic</strong> (da 744 €), una tantum: contenuti, sezioni e prezzo finale sono nel preventivo. Sono inclusi due giri di revisione sulla grafica proposta.</li>
      <li><strong>Dominio e pubblicazione:</strong> il dominio è intestato all’attività del Cliente. Rinnovi, hosting e manutenzione non sono inclusi nel prezzo una tantum, salvo il Pacchetto Presenza o diverso accordo.</li>
      <li><strong>Consegna:</strong> al saldo il Cliente riceve il sito e i file, esclusi i componenti di terzi soggetti a licenza propria.</li>
    </ul>
    <h3>Social</h3>
    <ul>
      <li><strong>Social Base</strong> (149 €/mese) e <strong>Social Plus</strong> (249 €/mese): ogni mese il numero di caroselli, reel e stories indicato nel piano, nei formati per Instagram e TikTok.</li>
      <li><strong>Materiale:</strong> si lavora con foto e video reali dell’attività inviati dal Cliente, oppure con una mezza giornata di riprese su accordo. Se il materiale arriva in ritardo, la consegna slitta di conseguenza; i contenuti di un mese non usati non si accumulano oltre il mese successivo.</li>
      <li><strong>Approvazione:</strong> i contenuti arrivano su WhatsApp da approvare, con un giro di modifiche incluso.</li>
      <li><strong>Pubblicazione a cura del Cliente:</strong> consegniamo i contenuti pronti; la pubblicazione, la gestione dei profili, dei commenti, dei messaggi e delle eventuali inserzioni restano al Cliente. La musica dei reel va scelta dalle librerie delle piattaforme al momento della pubblicazione, secondo le loro regole.</li>
      <li><strong>Durata:</strong> nessun vincolo. Si può disdire in qualsiasi momento; la disdetta vale dalla fine del mese già pagato, senza rimborso del mese in corso.</li>
    </ul>
    <h3>Pacchetto Presenza</h3>
    <ul>
      <li>90 € di attivazione una tantum e 290 € al mese, con Sito standard incluso e 10 caroselli e 6 reel al mese; dominio intestato all’attività e gestito da noi.</li>
      <li>Si può interrompere in qualsiasi momento: il sito resta online fino alla fine del mese pagato. Su richiesta trasferiamo il dominio al Cliente e consegniamo i file del sito, senza costi aggiuntivi.</li>
    </ul>
    <h3>Montaggio e clipping video</h3>
    <p>Su preventivo, in base a durata e lavorazione. I diritti su musica, riprese e marchi presenti nel materiale fornito restano a carico del Cliente.</p>
  </> },
  { id: 'video-slide', label: 'Video & Slide', body: <>
    <h3>Per tutti</h3>
    <ul>
      <li><strong>Slide interattive:</strong> 49 € ogni pacchetto da 15 slide. <strong>Video motion:</strong> 99 € ogni minuto di contenuto (o frazione).</li>
      <li><strong>Contenuti:</strong> lavoriamo su testi, dati e immagini che ci fornisci; impaginazione, grafica e animazione sono nostre. Un giro di modifiche è incluso.</li>
      <li><strong>Formati:</strong> slide come pagine web interattive (React), da presentare nel browser, far girare in loop su uno schermo o inserire in un sito; su richiesta anche come immagini statiche, senza animazioni né interazioni; video in MP4 Full HD.</li>
      <li><strong>Tempi:</strong> indicati alla conferma, in base alla quantità di materiale.</li>
    </ul>
    <h3 id="studenti">Studenti: tesi, tesine ed esami</h3>
    <p>Quando l’acquisto è fatto da uno studente come privato, per un uso personale di studio, si applicano anche queste regole e il Codice del Consumo.</p>
    <ul>
      <li><strong>Sconto studenti del 50%</strong> sui prezzi di slide e video, per chi è iscritto a un’università o a un istituto AFAM al momento dell’ordine. Basta mostrarci un documento che provi l’iscrizione. Lo sconto è personale, vale per ordini a uso di studio, non si cumula con altre promozioni e non si applica ad acquisti di aziende o enti. Se i requisiti risultano falsi, lo sconto decade e la differenza è dovuta.</li>
      <li><strong>Pagamento</strong> anticipato alla conferma dell’ordine.</li>
      <li><strong>Autore resti tu:</strong> non scriviamo, non riassumiamo e non modifichiamo nel merito tesi o elaborati; diamo forma visiva ai contenuti che ci consegni. Il rispetto delle regole del tuo ateneo e delle indicazioni del relatore, e i diritti sui materiali di terzi che inserisci, restano a tuo carico.</li>
      <li><strong>Nessuna promessa sul voto:</strong> “110 e lode” è un modo di dire. Il voto dipende da te e dalla commissione.</li>
      <li><strong>Scadenze:</strong> ti chiediamo di ordinare almeno 7 giorni lavorativi prima della discussione. Le urgenze si valutano caso per caso, con un’eventuale maggiorazione comunicata prima di iniziare.</li>
      <li><strong>Diritto di recesso:</strong> puoi recedere entro 14 giorni dalla conclusione del contratto, scrivendo a {mail}, senza dare motivazioni (art. 52 Cod. Consumo). Se ci chiedi di iniziare subito, e il lavoro viene completato entro i 14 giorni, perdi il diritto di recesso (art. 59): te lo chiediamo per iscritto prima di partire. Se recedi a lavoro iniziato, paghi solo la parte già svolta (art. 57). Rimborsiamo entro 14 giorni con lo stesso metodo di pagamento.</li>
      <li><strong>Garanzia legale:</strong> come consumatore hai diritto alla garanzia legale di conformità per i contenuti e i servizi digitali prevista dal Codice del Consumo.</li>
      <li><strong>Minorenni:</strong> per le tesine di maturità l’ordine va fatto da un genitore.</li>
      <li><strong>Controversie:</strong> scrivici prima di tutto; cerchiamo sempre una soluzione. Restano disponibili le procedure di risoluzione alternativa (ADR) previste dal Codice del Consumo e il foro del luogo in cui risiedi.</li>
    </ul>
  </> },
];

const docs: Record<LegalDoc, { title: string; intro: string; sections: Section[]; path: string; other: string; otherLabel: string }> = {
  privacy: { title: 'Privacy', intro: 'Come trattiamo i dati, servizio per servizio. Niente cookie e niente tracciamenti sul sito.', sections: privacy, path: '/privacy-policy/', other: '/terms-of-service/', otherLabel: 'Vai ai Termini' },
  termini: { title: 'Termini', intro: 'Le regole dei nostri servizi: una parte generale e i dettagli di ciascun servizio.', sections: termini, path: '/terms-of-service/', other: '/privacy-policy/', otherLabel: 'Vai alla Privacy' },
};

// sezione da aprire per i vecchi indirizzi: /nfc/... → Card NFC, /cookie-policy/ → Cookie
function sectionFromPath(pathname: string, hash: string) {
  if (hash) return hash.slice(1);
  if (pathname.startsWith('/nfc/') || pathname.includes('-nfc')) return 'nfc';
  if (pathname.startsWith('/cookie-policy')) return 'cookie';
  return '';
}

export default function Legal({ doc }: { doc: LegalDoc }) {
  const d = docs[doc];
  const location = useLocation();
  const [active, setActive] = useState(d.sections[0].id);
  useEffect(() => {
    const target = sectionFromPath(location.pathname, location.hash);
    if (!target) { window.scrollTo(0, 0); return; }
    // il browser, al primo caricamento, riporta lo scroll in cima: si ripete il salto dopo il ripristino
    const jump = () => { const el = document.getElementById(target); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'instant' as ScrollBehavior }); };
    const timers = [60, 450].map(ms => setTimeout(jump, ms));
    return () => timers.forEach(clearTimeout);
  }, [location.pathname, location.hash]);
  // evidenzia nel menu la sezione che si sta leggendo
  useEffect(() => {
    const io = new IntersectionObserver(entries => { const e = entries.find(x => x.isIntersecting); if (e) setActive(e.target.id); }, { rootMargin: '-30% 0px -60% 0px' });
    d.sections.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [d]);
  return <div className="station-site legal-site">
    <StationHeader/>
    <main id="main-content" className="legal-main">
      <div className="wrap legal-head">
        <div className="legal-switch" role="tablist" aria-label="Documenti legali">
          <Link role="tab" aria-selected={doc === 'privacy'} to="/privacy-policy/">Privacy</Link>
          <Link role="tab" aria-selected={doc === 'termini'} to="/terms-of-service/">Termini</Link>
        </div>
        <h1>{d.title}</h1>
        <p>{d.intro}</p>
        <small>Ultimo aggiornamento: {UPDATED}</small>
      </div>
      <div className="wrap legal-layout">
        <nav className="legal-nav" aria-label={`Sezioni ${d.title}`}>
          {d.sections.map(s => <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : undefined}>{s.label}</a>)}
          <Link className="legal-other" to={d.other}>{d.otherLabel} →</Link>
        </nav>
        <div className="legal-body">
          {d.sections.map(s => <section key={s.id} id={s.id}><h2>{s.label}</h2>{s.body}</section>)}
        </div>
      </div>
    </main>
    <StationFooter/>
  </div>;
}
