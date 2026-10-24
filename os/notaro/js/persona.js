// Chi gioca: a ogni visita la demo estrae a caso il notaio titolare (nome, cognome, iniziali).
// Lo usano il nome dello studio, il saluto in home, l'account in basso a sinistra, gli atti preparati da Otto e la storia della sfida.
const people = [['Andrea', 'Conti'], ['Laura', 'Bellucci'], ['Marco', 'Pellegrini'], ['Silvia', 'Morandi'], ['Giovanni', 'Lazzeri'], ['Valentina', 'Cecchi'], ['Pietro', 'Guidi'], ['Caterina', 'Nardi'], ['Riccardo', 'Fantoni'], ['Elisa', 'Benvenuti'], ['Filippo', 'Sacchetti'], ['Martina', 'Baldini'], ['Paolo', 'Ristori'], ['Anna', 'Gherardi'], ['Stefano', 'Capecchi'], ['Cristina', 'Lapini']];
const pick = () => { try { return crypto.getRandomValues(new Uint32Array(1))[0] % people.length; } catch { return Math.floor(Math.random() * people.length); } };
const [first, last] = people[pick()];
export const persona = {first, last, name:`${first} ${last}`, initials:`${first[0]}${last[0]}`, studio:`Studio Notarile ${last} & Associati`};
