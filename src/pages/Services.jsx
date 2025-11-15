import React, { useMemo, useState } from 'react';
import { workflows } from '../data/workflows.js';

export default function Services({ onOpenWorkflow }) {
	const [query, setQuery] = useState('');
	const [sector, setSector] = useState('Tutti');
	const [category, setCategory] = useState('Tutte');
	const [level, setLevel] = useState('Tutti');

	const sectors = useMemo(() => ['Tutti', ...Array.from(new Set(workflows.map(w => w.sector))).sort()], []);
	const categories = useMemo(() => ['Tutte', ...Array.from(new Set(workflows.map(w => w.category))).sort()], []);
	const levels = useMemo(() => ['Tutti', 'L0', 'L1', 'L2'], []);

	const filtered = useMemo(() => {
		return workflows.filter(w => {
			if (sector !== 'Tutti' && w.sector !== sector) return false;
			if (category !== 'Tutte' && w.category !== category) return false;
			if (level !== 'Tutti' && w.level !== level) return false;
			if (query && !(`${w.name} ${w.sector} ${w.category} ${w.level}`.toLowerCase().includes(query.toLowerCase()))) return false;
			return true;
		});
	}, [query, sector, category, level]);

	return (
		<div className="flex flex-col gap-10">
			<h2 className="title-azure text-3xl font-bold font-heading tracking-tight">Servizi</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="glass-panel rounded-lg p-6">
					<h3 className="title-azure text-xl font-bold font-heading">Assistenti operativi</h3>
					<p className="text-gray-300 mt-2">Agenti per supporto clienti, back-office, HR e vendite, collegati ai tuoi dati.</p>
				</div>
				<div className="glass-panel rounded-lg p-6">
					<h3 className="title-azure text-xl font-bold font-heading">Automazioni end-to-end</h3>
					<p className="text-gray-300 mt-2">Workflow che orchestrano task, strumenti e API senza gestire un backend proprio.</p>
				</div>
				<div className="glass-panel rounded-lg p-6">
					<h3 className="title-azure text-xl font-bold font-heading">Integrazioni e sicurezza</h3>
					<p className="text-gray-300 mt-2">Connettori sicuri verso CRM, ERP, knowledge base e storage documentale.</p>
				</div>
			</div>

			<section className="glass-panel rounded-lg p-6 md:p-8">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<h3 className="title-azure text-2xl font-bold font-heading">I nostri workflow</h3>
					<div className="text-sm text-gray-400">Totale: {filtered.length} / {workflows.length}</div>
				</div>
				<div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Cerca per nome, settore o categoria…"
						className="rounded-lg bg-white/5 border-white/10 px-3 py-2"
					/>
					<select value={sector} onChange={(e) => setSector(e.target.value)} className="rounded-lg bg-white/5 border-white/10 px-3 py-2">
						{sectors.map(s => <option key={s} value={s}>{s}</option>)}
					</select>
					<select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg bg-white/5 border-white/10 px-3 py-2">
						{categories.map(c => <option key={c} value={c}>{c}</option>)}
					</select>
					<select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg bg-white/5 border-white/10 px-3 py-2">
						{levels.map(l => <option key={l} value={l}>{l}</option>)}
					</select>
				</div>

				<div className="mt-5">
					<div className="rounded-xl bg-white/5 border border-white/10 p-3">
						<div className="h-[380px] overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-3">
							{filtered.map((w, idx) => (
								<button key={idx} onClick={() => onOpenWorkflow?.(w)} className="text-left rounded-lg bg-white/5 border border-white/10 p-4 flex flex-col gap-2 hover:bg-white/7 focus:outline-none focus:ring-2 focus:ring-primary/40">
									<div className="flex items-center justify-between gap-2">
										<div className="text-cream font-semibold">{w.name}</div>
										<span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary">{w.level}</span>
									</div>
									<div className="text-sm text-gray-400">{w.sector}</div>
									<div className="flex flex-wrap gap-2">
										<span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{w.category}</span>
									</div>
								</button>
							))}
						</div>
					</div>
					<div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
						<button
							className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
							onClick={() => { setQuery(''); setSector('Tutti'); setCategory('Tutte'); setLevel('Tutti'); }}
						>
							Reset filtri
						</button>
						<div className="flex items-center gap-2">
							<span className="px-2 py-0.5 rounded-full bg-white/5">Settori: {sectors.length - 1}</span>
							<span className="px-2 py-0.5 rounded-full bg-white/5">Categorie: {categories.length - 1}</span>
							<span className="px-2 py-0.5 rounded-full bg-white/5">Livelli: 3</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}


