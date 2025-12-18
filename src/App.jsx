import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import WorkflowPage from './components/WorkflowPage.jsx';
import Documentation from './pages/Documentation.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Ballpit from './components/Ballpit.tsx';

const PAGES = {
	home: Home,
	servizi: Services,
	chiSiamo: About,
	contatti: Contact,
	documentation: Documentation,
	terms: Terms,
	privacy: Privacy,
};

export default function App() {
	const [page, setPage] = useState('home');
	const [chatOpen, setChatOpen] = useState(false);
	const [workflowDetail, setWorkflowDetail] = useState(null);
	const [headerH, setHeaderH] = useState(56);
	const [footerH, setFooterH] = useState(96);
	const CurrentPage = useMemo(() => PAGES[page] ?? Home, [page]);

	useEffect(() => {
		function measure() {
			const h = document.getElementById('site-header');
			const f = document.getElementById('site-footer');
			if (h) setHeaderH(h.getBoundingClientRect().height || 56);
			if (f) setFooterH(f.getBoundingClientRect().height || 96);
		}
		measure();
		const roHeader = new ResizeObserver(measure);
		const roFooter = new ResizeObserver(measure);
		const hEl = document.getElementById('site-header');
		const fEl = document.getElementById('site-footer');
		if (hEl) roHeader.observe(hEl);
		if (fEl) roFooter.observe(fEl);
		window.addEventListener('resize', measure);
		return () => {
			window.removeEventListener('resize', measure);
			roHeader.disconnect();
			roFooter.disconnect();
		};
	}, []);
	return (
		<div className="relative min-h-screen overflow-x-hidden">
			{/* Background gradient shapes and Ballpit */}
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="bg-blob top-[-20%] left-[-15%] w-[500px] h-[500px] bg-primary/20"></div>
				<div className="bg-blob bottom-[-10%] right-[-15%] w-[600px] h-[600px] bg-accent/10"></div>
				{page === 'home' && (
					<div style={{ position: 'absolute', inset: 0 }}>
						<Ballpit
							count={window.innerWidth < 768 ? 40 : 100} // Significant reduction for mobile
							gravity={0}
							friction={0.98}
							wallBounce={0.99}
							followCursor={false}
							colors={[0x3A7DFF, 0x10B981, 0xFDF5E6]}
							minSize={0.5}
							maxSize={1.2}
							size0={0.8}
							ambientIntensity={1.2}
							lightIntensity={450}
						/>
					</div>
				)}
			</div>

			<Header current={page} onNavigate={setPage} onOpenChat={() => setChatOpen(true)} />
			<main className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 md:py-12">
				<CurrentPage onOpenChat={() => setChatOpen(true)} onOpenWorkflow={(wf) => setWorkflowDetail(wf)} onNavigate={setPage} />
			</main>
			<Footer onNavigate={setPage} />
			<ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} onOpen={() => setChatOpen(true)} />
			{workflowDetail && (
				<WorkflowPage workflow={workflowDetail} onClose={() => setWorkflowDetail(null)} />
			)}
		</div>
	);
}


