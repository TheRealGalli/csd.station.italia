import test from 'node:test';
import assert from 'node:assert/strict';
import {state, initial, validateState, toggle, esc, rich} from '../js/store.js';
import {modules, groups} from '../js/modules.js';
import {studioScenario, askOtto, proposeValues, studioSuggestions} from '../js/agent.js';
import * as D from '../js/demo.js';

test('ecosistema: 12 moduli, 3 per area, id unici, Lo Studio è il centro', () => {
 assert.equal(modules.length, 12);
 assert.equal(new Set(modules.map(m => m.id)).size, 12);
 for (const g of Object.keys(groups)) assert.equal(modules.filter(m => m.group === g).length, 3);
 assert.deepEqual(modules.filter(m => m.core).map(m => m.id), ['studio']);
 assert.equal(modules[0].id, 'posta');
});
test('dati demo coerenti: pratiche e persone referenziate esistono', () => {
 const ids = new Set(D.practices.map(p => p.id));
 for (const x of [...D.mails, ...D.chats, ...D.visure, ...D.clients]) if (x.practice) assert.ok(ids.has(x.practice), x.practice);
 for (const t of D.tasks) { assert.ok(D.team.some(p => p.id === t.who)); if (t.practice) assert.ok(ids.has(t.practice)); }
});
test('Studio: ogni suggerimento produce passaggi, risposta e documento', () => {
 for (const s of studioSuggestions) { const r = studioScenario(s.id); assert.ok(r.steps.length >= 3); assert.ok(r.reply); assert.ok(r.artifact); }
 const form = studioScenario('erogazione').artifact;
 assert.ok(form.fields.some(f => f.missing && !f.value), 'un dato assente resta vuoto, non inventato');
 assert.ok(form.fields.filter(f => f.value).every(f => f.source), 'ogni valore ha una fonte');
 assert.equal(studioScenario('qualcosa di non previsto').artifact, null);
});
test('Otto globale riconosce le domande sullo studio', () => {
 assert.match(askOtto('cosa devo fare oggi?').text, /attività/);
 assert.match(askOtto('a che punto è la pratica Rossi').text, /Rossi/);
 assert.ok(askOtto('xyz').links.length === 0);
});
test('abbinamento campi PDF: solo testo modificabile, nessun valore inventato', () => {
 const v = proposeValues([{name:'Codice fiscale', type:'text'}, {name:'Note libere', type:'text'}, {name:'Comune', type:'text', readOnly:true}, {name:'Firma', type:'checkbox'}]);
 assert.deepEqual(Object.keys(v), ['Codice fiscale']);
});
test('stato locale: validazione, toggle e sanificazione', () => {
 Object.assign(state, initial());
 assert.equal(toggle('handled', 'm1'), true); assert.deepEqual(state.handled, ['m1']);
 assert.equal(toggle('handled', 'm1'), false);
 assert.throws(() => validateState({version:1}));
 const s = validateState({version:2, handled:['m1', 5], rules:{n0:true, '__proto__':true, n1:'x'}});
 assert.deepEqual(s.handled, ['m1']); assert.deepEqual(s.rules, {n0:true});
 assert.equal(esc('<b onclick="x">'), '&lt;b onclick=&quot;x&quot;&gt;');
 assert.equal(rich('**ok** <i>'), '<b>ok</b> &lt;i&gt;');
});
