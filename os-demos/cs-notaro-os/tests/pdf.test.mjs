import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
vm.runInThisContext(await readFile(new URL('../vendor/pdf-lib.min.js',import.meta.url),'utf8'));
const {inspect,fillNative,fillVisual,examplePdf}=await import('../js/pdf-core.js');

test('AcroForm multipagina: testo, checkbox, dropdown e radio restano modificabili',async()=>{
 const input=await examplePdf(true);const meta=await inspect(input);assert.equal(meta.pages.length,2);assert.equal(meta.fields.length,7);
 const output=await fillNative(input,{'Nome completo':'Mario Rossi','Residenza':'Via dei Tigli 12, Firenze','Comune':'Firenze','Subalterno':'8','Verificato':true,'Tipo bene':'Terreno','Destinazione':'Privata'});
 const reopened=await inspect(output);const values=Object.fromEntries(reopened.fields.map(f=>[f.name,f.value]));
 assert.equal(values['Nome completo'],'Mario Rossi');assert.equal(values.Verificato,true);assert.equal(values['Tipo bene'],'Terreno');assert.equal(values.Destinazione,'Privata');
 const original=await inspect(input);assert.equal(original.fields[0].value,'');
 await mkdir('tmp/pdfs',{recursive:true});await writeFile('tmp/pdfs/native-result.pdf',output);
});
test('PDF statico: overlay su seconda pagina e originale conservato',async()=>{
 const input=await examplePdf(false);assert.equal((await inspect(input)).fields.length,0);
 const output=await fillVisual(input,[{page:1,x:60,y:620,size:11,text:'Mario Rossi'},{page:2,x:60,y:620,size:11,text:'Firenze'},{page:2,x:60,y:525,size:11,text:'8'}]);
 assert.equal((await inspect(output)).pages.length,2);await mkdir('tmp/pdfs',{recursive:true});await writeFile('tmp/pdfs/visual-result.pdf',output);
});
test('blocca pagine inesistenti, testo fuori bordo, non latino e opzioni non ammesse',async()=>{
 const input=await examplePdf(false);
 await assert.rejects(fillVisual(input,[{page:3,x:50,y:50,size:12,text:'x'}]));
 await assert.rejects(fillVisual(input,[{page:1,x:590,y:50,size:12,text:'troppo lungo'}]));
 await assert.rejects(fillVisual(input,[{page:1,x:50,y:50,size:12,text:'😀'}]));
 await assert.rejects(fillNative(await examplePdf(true),{'Tipo bene':'inesistente'}));
});
test('preserva documenti con campi firma rifiutando la modifica',async()=>{
 const L=globalThis.PDFLib;const doc=await L.PDFDocument.create();doc.addPage();
 const dict=doc.context.obj({FT:'Sig',T:L.PDFHexString.fromText('Firma')});const ref=doc.context.register(dict);doc.getForm().acroForm.addField(ref);
 await assert.rejects(inspect(await doc.save()),/firma/);
});
test('modulo dello Studio: generato, compilato e riletto con i valori',async()=>{
 const {formPdf}=await import('../js/pdf-core.js');
 const base=await formPdf('Banca Arno · Richiesta di erogazione mutuo',['Mutuatario','Importo del mutuo','IBAN parte venditrice']);
 const out=await fillNative(base,{'Mutuatario':'Mario Rossi','Importo del mutuo':'€ 180.000,00'});
 const v=Object.fromEntries((await inspect(out)).fields.map(f=>[f.name,f.value]));
 assert.equal(v.Mutuatario,'Mario Rossi');assert.equal(v['Importo del mutuo'],'€ 180.000,00');assert.equal(v['IBAN parte venditrice'],'');
});
