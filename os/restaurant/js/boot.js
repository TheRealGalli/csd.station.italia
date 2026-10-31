// Dentro il sito (in un iframe) la demo parte ferma fin dal primo fotogramma: niente animazioni finché il visitatore non la apre.
// File esterno e non inline, perché la Content Security Policy delle demo accetta solo script dello stesso sito.
if (window.parent !== window) document.documentElement.classList.add('csd-paused');
