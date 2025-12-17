import React, { useEffect, useRef } from 'react';

// Official-like SVG Paths
const GoogleCloudLogo = () => (
	<svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.92 11.23V7.27H23.97C24.08 8 24.12 8.65 24.12 9.47C24.12 18.08 18.36 24 12.03 24C5.39 24 0 18.63 0 12C0 5.37 5.39 0 12.03 0C15.22 0 18.25 1.18 20.6 3.37L17.7 6.27C16.49 5.14 14.51 4.27 12.03 4.27C7.86 4.27 4.39 7.73 4.39 12C4.39 16.27 7.86 19.73 12.03 19.73C16.25 19.73 18.9 16.78 19.51 12.98L11.92 12.98V11.23Z" fill="currentColor" />
	</svg>
);

const MicrosoftAzureLogo = () => (
	<svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0 0H10.8993V10.8993H0V0Z" fill="currentColor" />
		<path d="M12.1007 0H23V10.8993H12.1007V0Z" fill="currentColor" />
		<path d="M0 12.1007H10.8993V23H0V12.1007Z" fill="currentColor" />
		<path d="M12.1007 12.1007H23V23H12.1007V12.1007Z" fill="currentColor" />
	</svg>
);

const OpenAILogo = () => (
	<svg className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.54 1.54 0 0 1 .8312 1.32v5.6373a4.4811 4.4811 0 0 1-5.2877 3.1717zm-6.697-5.4901a4.4755 4.4755 0 0 1-.5808-3.0186l.142.0852 4.7831 2.7582a.7712.7712 0 0 0 .7802 0l5.8428-3.3685v2.3324a1.54 1.54 0 0 1-.5314 1.2001l-4.8828 3.7913a4.4811 4.4811 0 0 1-5.5531-3.7801zm2.2273-9.1766a4.4717 4.4717 0 0 1 3.2519.1843l-.142.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a1.5248 1.5248 0 0 1-.8264-1.32V6.9363a4.4774 4.4774 0 0 1 4.9075-3.1746zm9.6443 2.0169l-.142-.0804-4.7831-2.7582a.7712.7712 0 0 0-.7802 0L6.5872 7.8001V5.4677a1.54 1.54 0 0 1 .5314-1.2001l4.8828-3.7913a4.4811 4.4811 0 0 1 5.5483 3.7801zM7.1983 12.9723l3.6655-2.1157 3.6656 2.1157-3.6656 2.1157-3.6655-2.1157z" />
	</svg>
);

export default function Home({ onOpenChat }) {
	const calRef = useRef(null);

	useEffect(() => {
		// inject Google Calendar CSS
		if (!document.querySelector('link[data-calcss="gcal-scheduling"]')) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
			link.setAttribute('data-calcss', 'gcal-scheduling');
			document.head.appendChild(link);
		}
		// inject script and init
		function init() {
			if (window.calendar?.schedulingButton?.load && calRef.current) {
				window.calendar.schedulingButton.load({
					url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0E8CK2CQprdzregpJedXs7o3oamfFtB3OTBbuvS7Z6Zi_P5YxA7VB-pjZzlqGu-R0cHLtCRXFU?gv=true',
					color: '#039BE5',
					label: 'Fissa un appuntamento',
					target: calRef.current,
				});
			}
		}
		if (!window.calendar) {
			const s = document.createElement('script');
			s.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
			s.async = true;
			s.onload = init;
			document.body.appendChild(s);
		} else {
			init();
		}
	}, []);

	return (
		<div className="flex flex-col gap-20 md:gap-32 pb-20">
			{/* 1. HERO SECTION */}
			<section className="relative flex flex-col items-center text-center pt-24 md:pt-32 gap-8 px-4">

				{/* Visual Arcs (Restored) */}
				<div className="absolute inset-x-0 -top-20 md:top-0 flex justify-center pointer-events-none select-none z-0 opacity-80">
					<svg className="w-[90%] max-w-6xl h-32 md:h-48" viewBox="0 0 1120 260" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
						<defs>
							<linearGradient id="arcGrad" x1="0" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
								<stop offset="0%" stopColor="rgba(16,185,129,0.55)" />
								<stop offset="50%" stopColor="rgba(58,125,255,0.9)" />
								<stop offset="100%" stopColor="rgba(16,185,129,0.55)" />
							</linearGradient>
							<mask id="arcMask">
								<rect x="0" y="0" width="1120" height="260" fill="white" fillOpacity="0.8" />
							</mask>
							<filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
								<feGaussianBlur stdDeviation="6" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>
						<g mask="url(#arcMask)" filter="url(#arcGlow)">
							{[184, 196, 208, 220, 232, 244, 256].map((y, idx) => (
								<g key={y}>
									<path d={`M560 40 Q 840 40 1080 ${y}`} stroke="url(#arcGrad)" strokeWidth={idx === 3 ? 3 : idx % 2 === 0 ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength="500" strokeDasharray="0 500" opacity="0">
										<animate attributeName="stroke-dasharray" values="0 500;500 0;0 500" keyTimes="0;0.5;1" dur="12s" repeatCount="indefinite" />
										<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="12s" repeatCount="indefinite" />
									</path>
									<path d={`M560 40 Q 280 40 40 ${y}`} stroke="url(#arcGrad)" strokeWidth={idx === 3 ? 3 : idx % 2 === 0 ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength="500" strokeDasharray="0 500" opacity="0">
										<animate attributeName="stroke-dasharray" values="0 500;500 0;0 500" keyTimes="0;0.5;1" dur="12s" repeatCount="indefinite" />
										<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="12s" repeatCount="indefinite" />
									</path>
								</g>
							))}
						</g>
					</svg>
				</div>

				<div className="max-w-4xl space-y-6 relative z-10">
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
						L'Architettura Cloud per <br className="hidden md:block" />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
							l'Intelligenza Artificiale.
						</span>
					</h1>
					<h2 className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
						Integrazione enterprise di modelli "Tripla A" (Google, Microsoft, OpenAI).
						<span className="block mt-2 text-gray-400 text-lg">
							Dagli assistenti conversazionali ai flussi agentici complessi: trasformiamo i migliori algoritmi globali in soluzioni operative per la tua azienda.
						</span>
					</h2>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10">
					<button
						onClick={() => document.getElementById('die-section')?.scrollIntoView({ behavior: 'smooth' })}
						className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50"
					>
						Scopri il DIE Engine
					</button>
					<button
						onClick={onOpenChat}
						className="px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-200 rounded-lg font-medium text-lg transition-all hover:bg-white/5"
					>
						Parla con un Architetto AI
					</button>
				</div>

				<div ref={calRef} className="mt-4 min-h-[50px] relative z-10"></div>
			</section>

			{/* 2. TRUST BAR */}
			<section className="border-y border-white/5 bg-white/[0.02] py-8 backdrop-blur-sm">
				<div className="container mx-auto px-6 flex flex-col items-center gap-6">
					<span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
						Powered by World-Class Infrastructure
					</span>
					<div className="flex flex-wrap justify-center gap-12 md:gap-20">
						<div className="flex items-center gap-3 text-gray-300 font-bold text-lg opacity-60 hover:opacity-100 transition-opacity cursor-default">
							<GoogleCloudLogo /> Google Cloud
						</div>
						<div className="flex items-center gap-3 text-gray-300 font-bold text-lg opacity-60 hover:opacity-100 transition-opacity cursor-default">
							<MicrosoftAzureLogo /> Microsoft
						</div>
						<div className="flex items-center gap-3 text-gray-300 font-bold text-lg opacity-60 hover:opacity-100 transition-opacity cursor-default">
							<OpenAILogo /> OpenAI
						</div>
					</div>
				</div>
			</section>

			{/* 3. I NOSTRI SERVIZI */}
			<section className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Card 1 */}
					<div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group">
						<div className="h-1 w-12 bg-blue-500 mb-6 group-hover:w-24 transition-all"></div>
						<h3 className="text-xl font-bold text-white mb-2">Integrazione End-Point & API</h3>
						<p className="text-sm font-mono text-blue-400 mb-4 uppercase tracking-wider">Public-Facing</p>
						<p className="text-gray-400 leading-relaxed">
							Potenziamo siti web open-public e piattaforme già avviate. Integriamo chat intelligenti, servizi clienti automatizzati e assistenti virtuali direttamente nei tuoi end-point esistenti, migliorando l'esperienza utente senza rifare l'infrastruttura.
						</p>
					</div>

					{/* Card 2 */}
					<div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group">
						<div className="h-1 w-12 bg-cyan-500 mb-6 group-hover:w-24 transition-all"></div>
						<h3 className="text-xl font-bold text-white mb-2">Centri di Controllo & Data Analysis</h3>
						<p className="text-sm font-mono text-cyan-400 mb-4 uppercase tracking-wider">AI Hub Interno</p>
						<p className="text-gray-400 leading-relaxed">
							Costruiamo HUB IA centralizzati per il controllo dei processi aziendali. Sviluppiamo software interni di analisi dati che trasformano le informazioni grezze in decisioni strategiche, mantenendo i dati sicuri all'interno del perimetro aziendale.
						</p>
					</div>

					{/* Card 3 */}
					<div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors group">
						<div className="h-1 w-12 bg-purple-500 mb-6 group-hover:w-24 transition-all"></div>
						<h3 className="text-xl font-bold text-white mb-2">Agenti, Generativa & Predittiva</h3>
						<p className="text-sm font-mono text-purple-400 mb-4 uppercase tracking-wider">Full Spectrum</p>
						<ul className="text-gray-400 leading-relaxed space-y-2 list-disc list-inside">
							<li><strong className="text-gray-200">Agentiche:</strong> Per azioni autonome complesse.</li>
							<li><strong className="text-gray-200">Predittive:</strong> Per forecast e analisi trend.</li>
							<li><strong className="text-gray-200">Automazioni No-LLM:</strong> Algoritmi logici per efficienza.</li>
						</ul>
					</div>
				</div>
			</section>

			{/* 4. PRODUCT SPOTLIGHT: DIE */}
			<section id="die-section" className="container mx-auto px-6">
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-blue-500/20 shadow-2xl shadow-blue-900/20">
					<div className="absolute top-0 right-0 p-4">
						<span className="px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/30 rounded-full bg-blue-900/10 tracking-widest uppercase">
							Proprietary Technology
						</span>
					</div>

					<div className="grid md:grid-cols-2 gap-12 p-10 md:p-16 relative z-10">
						{/* Left Col: THE PITCH */}
						<div className="space-y-8">
							<div>
								<h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">DIE</h3>
								<p className="text-xl text-blue-400 font-mono">Document Intelligence Engine</p>
							</div>

							<div className="space-y-6">
								<h4 className="text-2xl font-bold text-white">
									Il tuo ufficio, ma <span className="text-blue-500">intelligente</span>.
								</h4>
								<p className="text-gray-300 text-lg leading-relaxed">
									Dimentica il data entry manuale. DIE non si limita a leggere caratteri: ne <strong>comprende il significato</strong>. Trasforma pile di contratti, visure e fatture in dati strutturati pronti per l'uso.
								</p>

								<ul className="space-y-4 pt-2">
									<li className="flex items-center gap-4">
										<div className="bg-green-500/20 p-2 rounded-full text-green-400">
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
										</div>
										<div>
											<strong className="text-white block">Zero Errori Umani</strong>
											<span className="text-gray-400 text-sm">Elimina refusi e distrazioni dai processi critici.</span>
										</div>
									</li>
									<li className="flex items-center gap-4">
										<div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
										</div>
										<div>
											<strong className="text-white block">Velocità Supersonica</strong>
											<span className="text-gray-400 text-sm">Pratiche completate in secondi, non in ore.</span>
										</div>
									</li>
									<li className="flex items-center gap-4">
										<div className="bg-purple-500/20 p-2 rounded-full text-purple-400">
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
										</div>
										<div>
											<strong className="text-white block">Intelligence Strategica</strong>
											<span className="text-gray-400 text-sm">Da carta inerte a database interrogabile per la tua BI.</span>
										</div>
									</li>
								</ul>
							</div>
						</div>

						{/* Right Col */}
						<div className="flex flex-col justify-center space-y-8 bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/5">
							<h4 className="text-xl font-bold text-white">Il Servizio CSD Station</h4>
							<p className="text-gray-400">Il valore aggiunto è nella nostra installazione sartoriale.</p>
							<ol className="space-y-6 relative border-l border-gray-700 ml-3">
								<li className="ml-6">
									<span className="absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-900"></span>
									<h5 className="font-bold text-white">1. Inizializzazione</h5>
									<p className="text-sm text-gray-500">Setup dell'istanza DIE specifica per il tuo studio.</p>
								</li>
								<li className="ml-6">
									<span className="absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-900"></span>
									<h5 className="font-bold text-white">2. Personalizzazione</h5>
									<p className="text-sm text-gray-500">Training dei modelli sui tuoi flussi documentali unici.</p>
								</li>
								<li className="ml-6">
									<span className="absolute -left-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-gray-900"></span>
									<h5 className="font-bold text-white">3. Integrazione</h5>
									<p className="text-sm text-gray-500">Connessione sicura ai tuoi database e gestionali.</p>
								</li>
							</ol>
							<div className="pt-4">
								<button onClick={onOpenChat} className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
									Richiedi Installazione DIE
								</button>
							</div>
						</div>
					</div>

					{/* Background decoration */}
					<div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
					<div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
				</div>
			</section>

			{/* 5. TECH STACK & METODOLOGIA */}
			<section className="container mx-auto px-6 py-12">
				<div className="flex flex-col md:flex-row gap-16">
					<div className="md:w-1/2">
						<h3 className="text-3xl font-bold text-white mb-8">Built for Scale & Security</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{[
								{ label: 'AI Core', val: 'Vertex AI (Gemini 2.5) & OpenAI' },
								{ label: 'Backend', val: 'Serverless Cloud Run & Node.js' },
								{ label: 'Frontend', val: 'React 18, TypeScript, Tailwind' },
								{ label: 'Storage', val: 'GCP Storage (Encrypted)' }
							].map(item => (
								<div key={item.label} className="border-l-2 border-gray-700 pl-4">
									<div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
									<div className="text-gray-200 font-medium">{item.val}</div>
								</div>
							))}
						</div>
					</div>
					<div className="md:w-1/2 bg-gray-900/50 p-8 rounded-xl border border-white/5">
						<h4 className="text-xl font-bold text-white mb-4">Il Nostro Workflow "No-Backend"</h4>
						<p className="text-gray-400 mb-6">
							Riduciamo la complessità infrastrutturale delegando il backend a workflow agentici avanzati.
						</p>
						<ul className="space-y-4">
							<li className="flex gap-4">
								<div className="bg-green-500/10 p-2 rounded text-green-400">🚀</div>
								<div>
									<strong className="text-white block">Time-to-Value Rapido</strong>
									<span className="text-gray-500 text-sm">Dal prototipo alla produzione in settimane.</span>
								</div>
							</li>
							<li className="flex gap-4">
								<div className="bg-blue-500/10 p-2 rounded text-blue-400">🔧</div>
								<div>
									<strong className="text-white block">Manutenzione Zero</strong>
									<span className="text-gray-400 text-sm">Nessun server fisico, solo logica pura.</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* 6. FOOTER */}
			<footer className="border-t border-white/10 pt-16 pb-8 text-center md:text-left">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
						<div>
							<h4 className="text-2xl font-bold text-white mb-2">Hai un processo da automatizzare?</h4>
							<p className="text-gray-400">Parla con noi per una consulenza rapida.</p>
						</div>
						<div className="flex gap-6">
							{/* Placeholder links since no real URLs were provided */}
							{['Documentazione Tecnica', 'GitHub Repository', 'LinkedIn', 'Contattaci'].map(link => (
								<button key={link} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
									{link}
								</button>
							))}
						</div>
					</div>
					<div className="text-center border-t border-white/5 pt-8">
						<p className="text-gray-600 text-sm">© 2025 CSD Station Italia.</p>
						<p className="text-gray-700 text-xs mt-2">DIE (Document Intelligence Engine) è una proprietà intellettuale riservata di Carlo Galli.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
