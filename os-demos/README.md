# Demo OS di settore

Sorgenti delle demo mostrate sul sito (solo desktop, `noindex`):

| Cartella | Pagina del sito | Pubblicata in |
|---|---|---|
| `cs-restaurant-os/` | `/restaurant-os/` | `/os/restaurant/` |
| `cs-notaro-os/` | `/notaro-os/` | `/os/notaro/` |

Si lavora **qui**. `npm run dev` e `npm run build` lanciano prima `npm run sync:os`, che copia i file di runtime (index.html, css, js, assets, vendor) in `public/os/` (cartella generata, ignorata da git). Dopo una modifica con il server di sviluppo acceso, rilancia `npm run sync:os` e ricarica.

La pagina del sito (`src/components/station/OsDemo.tsx`) mostra la demo in un iframe oscurato e non interagibile, con il messaggio "demo dimostrativa, non ancora rilasciato" e il pulsante WhatsApp. "Guarda la demo guidata" invia `csd:start-tour` all'iframe, che avvia la propria guida interattiva.

Ogni demo ha anche il suo server autonomo: `node os-demos/cs-restaurant-os/scripts/serve.mjs` (porta 3000) e `npm run dev` dentro `cs-notaro-os/` (porta 3080).
