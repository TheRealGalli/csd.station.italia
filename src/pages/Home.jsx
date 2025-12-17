import React, { useEffect, useRef } from 'react';

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
						Dagli assistenti conversazionali ai flussi agentici complessi: trasformiamo i migliori algoritmi globali in soluzioni operative per la tua azienda.
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
					<div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
						{/* Infrastructure & Cloud */}
						<img src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white" alt="Azure" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/Google-4285F4.svg?style=for-the-badge&logo=google&logoColor=white" alt="Google" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />

						{/* Backend & Database */}
						<img src="https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34" alt="Firebase" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white" alt="SQL Server" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />

						{/* Frontend & Languages */}
						<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JS" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TS" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />

						{/* AI & Tools */}
						<img src="https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white" alt="PyTorch" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white" alt="TensorFlow" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/mlflow-%23d9ead3.svg?style=for-the-badge&logo=numpy&logoColor=blue" alt="MLFlow" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white" alt="Canva" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
						<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github" className="h-7 opacity-80 hover:opacity-100 transition-opacity" />
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
						<h3 className="text-xl font-bold text-white mb-2">Agenti & Generativa</h3>
						<p className="text-sm font-mono text-purple-400 mb-4 uppercase tracking-wider">Full Spectrum</p>
						<ul className="space-y-4 text-gray-400 text-sm"> {/* Increased main spacing */}
							<li className="space-y-1"> {/* Grouped AI items tightly */}
								<div className="block"><strong className="text-white">Agentiche:</strong> Per azioni autonome complesse.</div>
								<div className="block"><strong className="text-white">Generative:</strong> Creazione contenuti e sintesi.</div>
								<div className="block"><strong className="text-white">Conversazionali:</strong> Chatbot evoluti e assistenti.</div>
								<div className="block"><strong className="text-white">Predittive:</strong> Per forecast e analisi trend.</div>
							</li>
							<li className="pt-2 border-t border-white/10"> {/* Separator for No-LLM */}
								<strong className="text-white">Automazioni No-LLM:</strong> Algoritmi logici per efficienza.
							</li>
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
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							{/* AI CORE */}
							<div className="border-l-2 border-accent/30 pl-4">
								<div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">AI Core</div>
								<div className="flex flex-wrap gap-2">
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Vertex AI</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Gemini 2.0 Flash</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">OpenAI</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Anthropic</span>
								</div>
							</div>

							{/* BACKEND */}
							<div className="border-l-2 border-blue-500/30 pl-4">
								<div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Backend</div>
								<div className="flex flex-wrap gap-2">
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Cloud Run</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Node.js</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Python</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Fast API</span>
								</div>
							</div>

							{/* FRONTEND */}
							<div className="border-l-2 border-purple-500/30 pl-4">
								<div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Frontend</div>
								<div className="flex flex-wrap gap-2">
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">React 18</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">TypeScript</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Tailwind</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Vite</span>
								</div>
							</div>

							{/* STORAGE */}
							<div className="border-l-2 border-green-500/30 pl-4">
								<div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Storage</div>
								<div className="flex flex-wrap gap-2">
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">GCP Storage</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Pinecone</span>
									<span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">Firebase</span>
								</div>
							</div>
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


		</div>
	);
}
