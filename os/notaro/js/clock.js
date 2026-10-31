// Il momento della giornata, dall'orologio vero (ora di Roma): la demo parla come se fosse aperta adesso.
const rome = o => new Intl.DateTimeFormat('it-IT', {...o, timeZone:'Europe/Rome'}).format(new Date());
const hour = +rome({hour:'numeric', hour12:false}) % 24;
export const now = {hour, weekday:rome({weekday:'long'}),
 greet:hour >= 5 && hour < 13 ? 'Buongiorno' : hour >= 13 && hour < 18 ? 'Buon pomeriggio' : 'Buonasera',
 part:hour >= 5 && hour < 13 ? 'mattina' : hour >= 13 && hour < 18 ? 'pomeriggio' : 'sera'};
// Ristorante: fino alle 16 è il servizio di pranzo, poi quello di cena.
export const service = hour >= 5 && hour < 16
 ? {name:'pranzo', title:'Il servizio di pranzo', today:'oggi a pranzo', of:'del pranzo', start:'12:00', when:'a pranzo'}
 : {name:'cena', title:'Il servizio di stasera', today:'stasera', of:'della serata', start:'19:00', when:'sera'};
