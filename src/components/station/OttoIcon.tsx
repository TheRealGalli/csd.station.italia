// Otto in formato icona, al posto delle classiche stelline dell'AI. Stesso disegno usato nelle demo OS (icons.js).
export type OttoMood = 'awake' | 'happy' | 'wink' | 'read' | 'think';
const faces: Record<OttoMood, JSX.Element> = {
  awake: <path d="M9 11.8v2.2M15 11.8v2.2M10.6 16.8h2.8"/>,
  happy: <path d="M7.8 13.3q1.2-1.8 2.4 0M13.8 13.3q1.2-1.8 2.4 0M10 16.3q2 1.6 4 0"/>,
  wink: <path d="M9 11.8v2.2M13.8 13h2.4M10 16.3q2 1.6 4 0"/>,
  read: <><circle cx="9" cy="13" r="2.1"/><circle cx="15" cy="13" r="2.1"/><path d="M11.1 13h1.8M10.8 17.4h2.4"/></>,
  think: <path d="M9.8 10.9v1.8M15.8 10.9v1.8M10.8 16.9h2"/>,
};
export function OttoIcon({ mood = 'awake', size = 18, className = '' }: { mood?: OttoMood; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="7" width="17" height="13" rx="4.5"/><path d="M12 7V4.4"/><circle cx="12" cy="3.2" r="1.2"/><path d="M1.8 12v3M22.2 12v3"/>
    {faces[mood]}
  </svg>;
}
