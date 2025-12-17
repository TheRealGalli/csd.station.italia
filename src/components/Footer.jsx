import React from 'react';

export default function Footer({ onNavigate }) {
	const year = new Date().getFullYear();
	return (
		<footer id="site-footer" className="mt-16 border-t border-white/10">
			<div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 flex flex-col gap-8 text-sm">
				{/* CTA Section */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10">
					<div>
						<h4 className="text-xl font-bold text-white mb-2">Hai un processo da automatizzare?</h4>
						<p className="text-gray-400">Parla con noi per una consulenza rapida.</p>
					</div>
					<button onClick={() => onNavigate?.('contatti')} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
						Contattaci
					</button>
				</div>

				{/* Riga originale con badge verdi a destra */}
				<div className="flex items-center justify-between gap-4">
					<div className="flex flex-col gap-1">
						<div className="text-gray-400">© {year} CSD Station — Sezione Italia</div>
						<div className="text-gray-600 text-[10px] md:text-xs">DIE (Document Intelligence Engine) è una proprietà intellettuale riservata di Carlo Galli.</div>
					</div>
					<div className="flex flex-wrap gap-2">
						<span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs">AI Agentics</span>
						<span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs">Automazione</span>
						<span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs">OpenAI SDK</span>
					</div>

				</div>
				{/* Nuova riga: quick links + social compatti vicino ai badge */}
				<div className="flex items-center justify-end gap-6">
					<nav className="flex items-center gap-4">
						<button onClick={() => onNavigate?.('documentation')} className="text-cream opacity-90 hover:opacity-100 font-medium transition-colors text-left">Documentation</button>
						<button className="text-white/60 hover:text-white/80 transition-colors text-left" disabled title="In arrivo">QR Code</button>
						<button onClick={() => onNavigate?.('contatti')} className="text-cream opacity-90 hover:opacity-100 font-medium transition-colors text-left">Servizio Clienti</button>
						<button className="text-white/60 hover:text-white/80 transition-colors text-left" disabled title="In arrivo">Careers</button>
					</nav>
					<div className="flex items-center gap-4">
						<a aria-label="LinkedIn" href="https://www.linkedin.com/in/carlo-galli-086303367/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-white/80 hover:text-white transition-colors align-middle">
							<svg className="w-5 h-5 transform -translate-y-[1px]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">
								<path d="M4.983 3.5c0 1.381-1.11 2.5-2.482 2.5C1.12 6 0 4.881 0 3.5 0 2.12 1.12 1 2.501 1c1.372 0 2.482 1.12 2.482 2.5zM.25 8.25h4.5v15.5H.25V8.25zM8.75 8.25h4.309v2.117h.062c.6-1.137 2.066-2.338 4.254-2.338 4.55 0 5.392 2.992 5.392 6.881v8.84h-4.5v-7.84c0-1.871-.033-4.277-2.607-4.277-2.61 0-3.01 2.04-3.01 4.145v7.972h-4.5V8.25z" />
							</svg>
						</a>
						<a aria-label="GitHub" href="https://github.com/TheRealGalli" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-white/80 hover:text-white transition-colors align-middle">
							<svg className="w-5 h-5 transform translate-y-[1px]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">
								<path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.98 5.245.98 11.51c0 4.853 3.152 8.965 7.523 10.414.55.104.75-.237.75-.53 0-.262-.01-1.135-.017-2.06-3.06.665-3.705-1.296-3.705-1.296-.5-1.272-1.222-1.612-1.222-1.612-.998-.683.076-.67.076-.67 1.103.078 1.683 1.132 1.683 1.132.982 1.682 2.575 1.196 3.203.915.1-.712.384-1.196.698-1.472-2.441-.277-5.009-1.22-5.009-5.427 0-1.198.427-2.177 1.13-2.946-.113-.277-.49-1.396.106-2.91 0 0 .92-.294 3.017 1.127.874-.243 1.81-.365 2.742-.369.93.004 1.867.126 2.742.369 2.097-1.42 3.016-1.127 3.016-1.127.597 1.514.22 2.633.107 2.91.704.769 1.13 1.748 1.13 2.946 0 4.22-2.574 5.147-5.023 5.418.395.34.747 1.01.747 2.036 0 1.47-.013 2.654-.013 3.016 0 .296.198.64.757.53 4.366-1.45 7.516-5.56 7.516-10.413C23.02 5.245 18.27.5 12 .5z" />
							</svg>
						</a>
					</div>
				</div>
				{/* Riga inferiore: Terms & Privacy in basso a destra, come richiesto */}
				<div className="pt-4 border-t border-white/10 flex items-center justify-end gap-6 text-xs">
					<button onClick={() => onNavigate?.('terms')} className="text-cream opacity-90 hover:opacity-100 font-medium transition-colors">Terms of Service</button>
					<button onClick={() => onNavigate?.('privacy')} className="text-cream opacity-90 hover:opacity-100 font-medium transition-colors">Privacy Policy</button>
				</div>
			</div>
		</footer>
	);
}


