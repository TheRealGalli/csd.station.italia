import React from 'react';

export default function About({ onOpenChat }) {
	return (
		<div className="flex flex-col gap-12 md:gap-16">
			<section className="flex flex-col items-center text-center gap-6">
				<div className="flex flex-col gap-4 items-center">
					<h1 className="text-cream text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading leading-tight tracking-tighter max-w-3xl">
						Un ponte tra automazione e persone.
					</h1>
					<p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
						Sfruttiamo l'intelligenza artificiale per creare workflow personalizzati che potenziano il tuo business,
						con un approccio umano e consulenziale.
					</p>
				</div>
				<button onClick={() => onOpenChat?.()} className="h-12 px-6 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-bold tracking-wide transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50">
					Scopri le nostre soluzioni
				</button>
			</section>

			<section className="px-0">
				<div className="glass-panel rounded-lg p-6 md:p-8">
					<p className="text-gray-200 text-lg md:text-xl leading-relaxed text-center">
						CSD Station Italia nasce per colmare il divario tra le complesse possibilità dell'automazione AI
						e le reali esigenze operative delle aziende. Consulenza, follow-up continuo e personalizzazione.
					</p>
				</div>
			</section>

			<section className="flex flex-col gap-8">
				<div className="text-center">
					<h2 className="title-azure text-3xl font-bold font-heading tracking-tight">La Nostra Storia</h2>
					<p className="text-gray-400 mt-2 font-mono text-sm">Dal legame con la Florida alla leadership in Italia.</p>
				</div>
				<div className="grid grid-cols-[auto_1fr] gap-x-4 max-w-xl mx-auto px-2">
					<div className="flex flex-col items-center gap-1 pt-2">
						<div className="text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30">🌎</div>
						<div className="w-[2px] bg-white/10 grow"></div>
					</div>
					<div className="py-2">
						<p className="text-cream text-lg font-heading">Le Origini in Florida</p>
						<p className="text-gray-400">Sede madre e basi dell'expertise nell'automazione.</p>
						<p className="text-accent text-sm font-mono mt-1">2025</p>
					</div>

					<div className="flex flex-col items-center gap-1">
						<div className="w-[2px] bg-white/10 h-2"></div>
						<div className="text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30">🚩</div>
						<div className="w-[2px] bg-white/10 grow"></div>
					</div>
					<div className="py-2">
						<p className="text-cream text-lg font-heading">Fondazione Sede Italiana</p>
						<p className="text-gray-400">Soluzioni adattate alle specificità del mercato locale.</p>
						<p className="text-accent text-sm font-mono mt-1">2026</p>
					</div>

					<div className="flex flex-col items-center gap-1 pb-2">
						<div className="w-[2px] bg-white/10 h-2"></div>
						<div className="text-accent flex items-center justify-center bg-accent/10 rounded-full size-10 border border-accent/30">📈</div>
					</div>
					<div className="py-2">
						<p className="text-cream text-lg font-heading">Il Nostro Approccio Oggi</p>
						<p className="text-gray-400">Crescita continua e servizi consulenziali centrati sulle persone.</p>
						<p className="text-accent text-sm font-mono mt-1">Presente</p>
					</div>
				</div>
			</section>
		</div>
	);
}


