import React, { useEffect, useRef } from 'react';
import Ballpit from '../components/Ballpit.tsx';

export default function Home({ onOpenChat }) {
	const calRef = useRef(null);

	useEffect(() => {
		// inject CSS once
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
		<div className="flex flex-col gap-12 md:gap-16">
			<section className="relative flex flex-col items-center text-center gap-6 pt-16 md:pt-24 min-h-[520px] md:min-h-[620px]">
				{/* Arco tech animato sopra al titolo */}
				<div className="absolute inset-x-0 -top-2 md:top-0 flex justify-center pointer-events-none select-none z-0">
					<svg className="w-[90%] max-w-6xl h-24 md:h-32" viewBox="0 0 1120 260" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
						<defs>
							<linearGradient id="arcGrad" x1="0" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
								<stop offset="0%" stopColor="rgba(16,185,129,0.55)"/>
								<stop offset="50%" stopColor="rgba(58,125,255,0.9)"/>
								<stop offset="100%" stopColor="rgba(16,185,129,0.55)"/>
							</linearGradient>
							<linearGradient id="fadeGrad" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0" stopColor="white" stopOpacity="0"/>
								<stop offset="0.15" stopColor="white" stopOpacity="0.95"/>
								<stop offset="0.85" stopColor="white" stopOpacity="0.95"/>
								<stop offset="1" stopColor="white" stopOpacity="0"/>
							</linearGradient>
							<mask id="arcMask">
								<rect x="0" y="0" width="1120" height="260" fill="url(#fadeGrad)"/>
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
							{/* 7 semi-archi per lato che partono esattamente dal centro (560,40) e si espandono */}
							{[184,196,208,220,232,244,256].map((y, idx) => (
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
				<div className="relative z-30 flex flex-col gap-4 items-center" data-ballpit-obstacle>
					<h1 className="text-cream text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-tighter max-w-3xl">
						Soluzioni agentiche per imprese italiane
					</h1>
					<p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
						CSD Station Italia progetta e integra agenti AI e workflow intelligenti che automatizzano processi, riducono tempi e sbloccano nuova crescita.
					</p>
				</div>
				<div ref={calRef} className="h-12">
					{/* Google Calendar Scheduling Button will render here */}
				</div>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="glass-panel rounded-lg p-6">
					<h3 className="text-xl font-bold font-heading">
						<span className="title-azure">Agenti</span>{' '}<span className="text-cream">su misura</span>
					</h3>
					<p className="text-gray-300 mt-2">Assistenti verticali che comprendono il tuo dominio e si connettono ai tuoi sistemi.</p>
				</div>
				<div className="glass-panel rounded-lg p-6">
					<h3 className="text-xl font-bold font-heading">
						<span className="title-azure">Workflow</span>{' '}<span className="text-cream">no-backend</span>
					</h3>
					<p className="text-gray-300 mt-2">Backend delegato a workflow agentici su OpenAI, senza server da mantenere.</p>
				</div>
				<div className="glass-panel rounded-lg p-6">
					<h3 className="text-xl font-bold font-heading">
						<span className="title-azure">Time–to–value</span>{' '}<span className="text-cream">rapido</span>
					</h3>
					<p className="text-gray-300 mt-2">Dal prototipo al valore in produzione in settimane, non mesi.</p>
				</div>
			</section>

			<section className="glass-panel rounded-lg p-6">
				<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs">Demo</span>
				<p className="text-gray-300 mt-3">
					Prova il widget chat in basso a destra: parla con il nostro assistente.
				</p>
				<ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
					<li>Richiedi una valutazione iniziale</li>
					<li>Chiedi una demo di automazione</li>
					<li>Descrivi un processo interno da automatizzare</li>
				</ul>
			</section>
		</div>
	);
}


