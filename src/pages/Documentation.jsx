import React from 'react';

export default function Documentation() {
	return (
		<article className="max-w-none font-display">
			{/* Titolo */}
			<h1 className="text-cream text-3xl md:text-4xl font-extrabold mb-3">Benvenuto su CSD Station AI Advisor</h1>
			<p className="text-gray-300 text-[15px] leading-7">
				Scopri come la Piattaforma trasforma il tuo lavoro. CSD Station AI Advisor è il tuo consulente intelligente progettato
				per esplorare insieme a te il potenziale dell'Intelligenza Artificiale e dell’Iper‑Automazione applicati ai processi aziendali.
				Non è uno strumento tecnico complesso: è una conversazione che ti aiuta a capire come risparmiare tempo e costi nella tua attività quotidiana.
			</p>

			{/* Come iniziare */}
			<h2 className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream">Come Iniziare dalla Home</h2>
			<h3 className="mt-3 mb-1 text-[18px] font-semibold text-cream">Step 1: Accedi alla Piattaforma</h3>
			<p className="text-gray-300 text-[15px] leading-7">
				Dalla home di CSD Station trovi l’interfaccia di AI Advisor. È il tuo primo punto di contatto con la piattaforma: inizia una conversazione naturale con il nostro consulente digitale.
			</p>
			<h3 className="mt-3 mb-1 text-[18px] font-semibold text-cream">Step 2: Racconta il tuo settore</h3>
			<ul className="list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200">
				<li>Il tuo settore (retail, servizi, manifattura, sanità, ecc.).</li>
				<li>I processi che consumano più tempo nella tua giornata.</li>
				<li>Gli strumenti che già utilizzi (CRM, email, piattaforme di gestione, ecc.).</li>
			</ul>
			<p className="text-gray-300 text-[15px] leading-7 mt-2">AI Advisor ascolta e comprende il tuo contesto specifico.</p>
			<h3 className="mt-3 mb-1 text-[18px] font-semibold text-cream">Step 3: Ricevi suggerimenti mirati</h3>
			<p className="text-gray-300 text-[15px] leading-7">
				Dopo pochi messaggi ricevi soluzioni concrete di automazione e AI pensate per te: non una lista generica, ma idee che risolvono problemi reali.
			</p>

			{/* Appuntamento */}
			<h2 className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream">Prenotare un Appuntamento</h2>
			<ul className="list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200">
				<li>Nella conversazione con AI Advisor trovi il pulsante “Prenota Appuntamento”.</li>
				<li>Un clic ti collega a Google Calendar.</li>
				<li>Scegli l’orario preferito e ricevi conferma via email.</li>
			</ul>

			{/* Servizi / Workflow */}
			<h2 className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream">Esplorare i Servizi — Workflow Interattivi</h2>
			<h3 className="mt-2 mb-1 text-[18px] font-semibold text-cream">Cosa trovi nella sezione Servizi</h3>
			<p className="text-gray-300 text-[15px] leading-7">
				Una raccolta di workflow interattivi: non manuali da leggere, ma strumenti da provare. Ogni workflow è come un mini‑consulente per un’area specifica.
			</p>
			<ul className="list-disc marker:text-sky-400 pl-6 space-y-1 text-gray-200">
				<li>Workflow per Ottimizzare il Servizio Clienti.</li>
				<li>Workflow per Gestione Amministrativa.</li>
				<li>Workflow per Analisi Dati.</li>
			</ul>
			<h3 className="mt-3 mb-1 text-[18px] font-semibold text-cream">Come usare i workflow</h3>
			<ol className="list-decimal pl-6 space-y-1 text-gray-200">
				<li>Naviga nella sezione Servizi.</li>
				<li>Scegli il workflow più pertinente al tuo bisogno.</li>
				<li>Interagisci: è una conversazione guidata.</li>
				<li>Ricevi una pagina informativa personalizzata con scenario, TOS (tempo risparmiato) e VEP (valore economico previsto).</li>
			</ol>

			{/* Valore */}
			<h2 className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream">Il Valore della Piattaforma</h2>
			<ul className="list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200">
				<li><span className="font-semibold">Conversazione, non compilazione</span>: linguaggio naturale, niente questionari interminabili.</li>
				<li><span className="font-semibold">Soluzioni concrete e misurabili</span>: stime realistiche di tempo e valore economico.</li>
				<li><span className="font-semibold">Zero pressione commerciale</span>: esplora in libertà, senza impegno.</li>
			</ul>

			{/* FAQ */}
			<h2 className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream">Domande Frequenti</h2>
			<ul className="list-disc marker:text-sky-400 pl-6 space-y-2 text-gray-200">
				<li><span className="font-semibold">Devo essere un esperto?</span> No. È pensata per chi non è tecnico: dialogo naturale, chiaro.</li>
				<li><span className="font-semibold">Quanto tempo serve?</span> Ogni interazione si legge in ~20 secondi.</li>
				<li><span className="font-semibold">Posso prenotare da qui?</span> Sì, via Google Calendar con conferma email.</li>
				<li><span className="font-semibold">Posso fidarmi delle stime?</span> Sono conservative e basate su dati di settore; la validazione puntuale avviene con il team.</li>
			</ul>

			{/* Call to action */}
			<h2 className="mt-6 mb-2 text-[22px] md:text-[24px] font-semibold text-cream">Inizia Subito</h2>
			<p className="text-gray-300 text-[15px] leading-7">
				Dalla home, apri una conversazione con AI Advisor. Se preferisci il contatto diretto, usa “Prenota Appuntamento”.
			</p>
		</article>
	);
}


