import React from 'react';
import logo from '../assets/logo.png';

export default function Header({ current, onNavigate, onOpenChat }) {
	return (
		<header id="site-header" className="sticky top-0 z-20 header-anim backdrop-blur">
			<div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<img src={logo} alt="CSD Station logo" className="h-10 w-10 md:h-12 md:w-12 rounded-md object-contain" />
					<h2 className="text-cream text-lg font-bold font-heading tracking-tight">CSD Station</h2>
				</div>
				<nav className="hidden md:flex items-center gap-8">
					<button className={`text-sm font-medium transition-colors ${current === 'home' ? 'text-cream' : 'text-cream opacity-80 hover:opacity-100'}`} onClick={() => onNavigate('home')}>Home</button>
					<button className={`text-sm font-medium transition-colors ${current === 'servizi' ? 'text-cream' : 'text-cream opacity-80 hover:opacity-100'}`} onClick={() => onNavigate('servizi')}>Servizi</button>
					<button className={`text-sm font-medium transition-colors ${current === 'chiSiamo' ? 'text-cream' : 'text-cream opacity-80 hover:opacity-100'}`} onClick={() => onNavigate('chiSiamo')}>Chi Siamo</button>
					<button className={`text-sm font-medium transition-colors ${current === 'contatti' ? 'text-cream' : 'text-cream opacity-80 hover:opacity-100'}`} onClick={() => onNavigate('contatti')}>Contatti</button>
				</nav>
			</div>
		</header>
	);
}


