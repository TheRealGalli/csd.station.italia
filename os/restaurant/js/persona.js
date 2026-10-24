// Chi gioca: a ogni visita la demo estrae a caso il titolare del locale (nome, cognome, iniziali).
// Lo usano il saluto in home, l'account in basso a sinistra, lo staff e la storia della sfida.
const people = [['Marta', 'Rinaldi'], ['Luca', 'Ferretti'], ['Giulia', 'Bandini'], ['Alessandro', 'Neri'], ['Chiara', 'Lombardi'], ['Matteo', 'Galli'], ['Sofia', 'Martelli'], ['Davide', 'Ricci'], ['Elena', 'Barbieri'], ['Federico', 'Santoro'], ['Francesca', 'Mancini'], ['Tommaso', 'Vitale'], ['Irene', 'Costa'], ['Lorenzo', 'Fabbri'], ['Beatrice', 'Serra'], ['Nicola', 'Orlandi']];
const pick = () => { try { return crypto.getRandomValues(new Uint32Array(1))[0] % people.length; } catch { return Math.floor(Math.random() * people.length); } };
const [first, last] = people[pick()];
export const persona = {first, last, name:`${first} ${last}`, initials:`${first[0]}${last[0]}`};
