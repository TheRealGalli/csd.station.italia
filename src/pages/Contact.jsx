import React from 'react';

export default function Contact({ onOpenChat, onNavigate }) {
	return (
		<div className="flex flex-col gap-6">
			<h2 className="title-azure text-3xl font-bold font-heading tracking-tight">Contattaci</h2>
			<p className="text-gray-400 max-w-2xl">
				Scrivici direttamente: apri la tua casella di posta con il destinatario precompilato.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
				{/* Card Email */}
				<div className="glass-panel rounded-lg p-6 flex flex-col justify-between">
					<div>
						<p className="text-gray-300">Email aziendale</p>
						<p className="text-cream font-semibold">csd.station.ai@gmail.com</p>
					</div>
					<a
						href="mailto:csd.station.ai@gmail.com?subject=Richiesta%20informazioni%20-%20CSD%20Station%20Italia"
						className="mt-4 inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50"
					>
						Apri email
					</a>
				</div>
				{/* Card FAQ (placeholder) */}
				<div className="glass-panel rounded-lg p-6 flex flex-col justify-between">
					<div>
						<p className="text-gray-300">Domande frequenti</p>
						<p className="text-cream font-semibold">FAQ</p>
					</div>
					<div className="mt-4 flex flex-col items-center">
						<button
							type="button"
							className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 text-cream/70 font-semibold cursor-not-allowed"
							disabled
						>
							Apri FAQ
						</button>
						<span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
							Coming Soon
						</span>
					</div>
				</div>
				{/* Card Servizio Clienti IA (placeholder) */}
				<div className="glass-panel rounded-lg p-6 flex flex-col justify-between">
					<div>
						<p className="text-gray-300">Assistenza via AI</p>
						<p className="text-cream font-semibold">Servizio Clienti IA</p>
					</div>
					<div className="mt-4 flex flex-col items-center">
						<button
							type="button"
							className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 text-cream/70 font-semibold cursor-not-allowed"
							disabled
						>
							Chiama Servizio Clienti
						</button>
						<span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
							Coming Soon
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
 

