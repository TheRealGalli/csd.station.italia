// Deterministic PDF operations. AI never chooses or writes a value in this module.
const lib=()=>{if(!globalThis.PDFLib)throw Error('Libreria PDF non disponibile. Ricarica la pagina.');return globalThis.PDFLib;};
export async function inspect(bytes){
 const L=lib();const doc=await L.PDFDocument.load(bytes);const form=doc.getForm();
 if(form.hasXFA())throw Error('Questo documento usa XFA: la compilazione non è supportata in questa anteprima.');
 if(doc.getPageCount()>100)throw Error('Il limite locale è di 100 pagine.');
 const fields=form.getFields();
 if(fields.some(f=>f instanceof L.PDFSignature))throw Error('Il PDF contiene un campo firma. Per preservare il documento, questa anteprima non lo modifica. Usa una copia originale priva di campi firma.');
 const descriptors=fields.map(f=>{
  let type='unsupported',value='',options=[];
  if(f instanceof L.PDFTextField){type='text';value=f.getText()||'';}
  else if(f instanceof L.PDFCheckBox){type='checkbox';value=f.isChecked();}
  else if(f instanceof L.PDFDropdown&&!f.isMultiselect()){type='dropdown';value=f.getSelected()[0]||'';options=f.getOptions();}
  else if(f instanceof L.PDFRadioGroup){type='radio';value=f.getSelected()||'';options=f.getOptions();}
  return {name:f.getName(),type,value,options,readOnly:f.isReadOnly(),maxLength:f instanceof L.PDFTextField?f.getMaxLength():undefined};
 });
 return {fields:descriptors,pages:doc.getPages().map(p=>({width:p.getWidth(),height:p.getHeight(),rotation:p.getRotation().angle,crop:p.getCropBox()}))};
}
export async function fillNative(bytes,values){
 const descriptors=(await inspect(bytes)).fields;const L=lib();const doc=await L.PDFDocument.load(bytes);const form=doc.getForm();const font=await doc.embedFont(L.StandardFonts.Helvetica);
 for(const [name,value] of Object.entries(values)){
  const descriptor=descriptors.find(f=>f.name===name);
  if(!descriptor||descriptor.readOnly||descriptor.type==='unsupported')throw Error(`Campo non modificabile: ${name}`);
  const f=form.getField(name);
  if(f instanceof L.PDFTextField){
   font.encodeText(String(value));
   if(descriptor.maxLength&&String(value).length>descriptor.maxLength)throw Error(`Troppi caratteri nel campo ${name}.`);
   if(!f.isMultiline()){
    const widths=f.acroField.getWidgets().map(w=>w.getRectangle().width-4).filter(w=>w>0);
    if(widths.length&&font.widthOfTextAtSize(String(value),6)>Math.min(...widths))throw Error(`Il testo nel campo ${name} è troppo lungo per restare leggibile. Abbrevialo o usa un modello diverso.`);
    f.setFontSize(0);
   }
   f.setText(String(value));
  }
  else if(f instanceof L.PDFCheckBox){value===true?f.check():f.uncheck();}
  else if(value===''){f.clear();}
  else {if(!descriptor.options.includes(value))throw Error(`Opzione non valida per ${name}.`);f.select(value);}
 }
 form.updateFieldAppearances(font);
 return doc.save();
}
export async function fillVisual(bytes,marks){
 const info=await inspect(bytes);const L=lib();const doc=await L.PDFDocument.load(bytes);const font=await doc.embedFont(L.StandardFonts.Helvetica);
 for(const m of marks){
  if(!Number.isInteger(m.page)||m.page<1||m.page>info.pages.length)throw Error('Pagina del campo non valida.');
  const p=doc.getPages()[m.page-1];const c=p.getCropBox();
  if(p.getRotation().angle!==0)throw Error('La compilazione visiva di pagine ruotate non è ancora supportata.');
  if(![m.x,m.y,m.size].every(Number.isFinite)||m.size<6||m.size>36||!m.text?.trim())throw Error('Controlla testo, posizione e dimensione del campo.');
  if(/[\r\n]/.test(m.text))throw Error('Usa una casella separata per ogni riga.');
  const w=font.widthOfTextAtSize(m.text,m.size);
  if(m.x<c.x||m.x+w>c.x+c.width||m.y<c.y+m.size*0.25||m.y+m.size>c.y+c.height)throw Error('Il testo supera il bordo della pagina. Riduci la dimensione o cambia posizione.');
  p.drawText(m.text,{x:m.x,y:m.y,size:m.size,font,color:L.rgb(.08,.12,.09)});
 }
 return doc.save();
}
export async function examplePdf(native=true){
 const L=lib();const doc=await L.PDFDocument.create();const font=await doc.embedFont(L.StandardFonts.Helvetica);const bold=await doc.embedFont(L.StandardFonts.HelveticaBold);const form=doc.getForm();
 for(let i=0;i<2;i++){
  const p=doc.addPage([595,842]);
  p.drawText('CSD STATION / CS NOTARO OS',{x:48,y:780,size:12,font:bold});
  p.drawText('MODULO DIMOSTRATIVO - DATI INVENTATI',{x:48,y:750,size:10,font});
  p.drawText(i===0?'Scheda di lavoro':'Riferimenti del bene',{x:48,y:700,size:23,font:bold});
  const names=i===0?['Nome completo','Residenza']:['Comune','Subalterno'];
  names.forEach((name,j)=>{const y=620-j*95;p.drawText(name,{x:48,y:y+35,size:11,font});p.drawRectangle({x:48,y:y-8,width:490,height:29,borderWidth:.6,borderColor:L.rgb(.65,.7,.6)});if(native){const f=form.createTextField(name);f.addToPage(p,{x:49,y:y-7,width:488,height:27,borderWidth:0,font});f.setFontSize(11);}});
  if(i===1&&native){const checkbox=form.createCheckBox('Verificato');checkbox.addToPage(p,{x:48,y:440,width:15,height:15});p.drawText('Verifica manuale eseguita',{x:75,y:443,size:10,font});const dropdown=form.createDropdown('Tipo bene');dropdown.addOptions(['Abitazione','Terreno','Altro']);dropdown.select('Abitazione');dropdown.addToPage(p,{x:48,y:380,width:200,height:25,font});const radio=form.createRadioGroup('Destinazione');radio.addOptionToPage('Privata',p,{x:48,y:335,width:14,height:14});radio.addOptionToPage('Societa',p,{x:180,y:335,width:14,height:14});p.drawText('Privata',{x:70,y:338,size:10,font});p.drawText('Societa',{x:201,y:338,size:10,font});}
  p.drawText('Esempio di interfaccia. Non utilizzare come documento legale.',{x:48,y:60,size:9,font});p.drawText(`Pagina ${i+1} / 2`,{x:480,y:60,size:9,font});
 }
 if(native)form.updateFieldAppearances(font);return doc.save();
}
// Modulo dimostrativo con un campo AcroForm per riga: usato dallo Studio per scaricare una copia compilata reale.
export async function formPdf(title,labels){
 const L=lib();const doc=await L.PDFDocument.create();const font=await doc.embedFont(L.StandardFonts.Helvetica);const bold=await doc.embedFont(L.StandardFonts.HelveticaBold);const form=doc.getForm();
 const p=doc.addPage([595,842]);
 p.drawText('MODULO DIMOSTRATIVO - DATI INVENTATI',{x:48,y:790,size:8,font,color:L.rgb(.45,.5,.42)});
 p.drawText(title,{x:48,y:760,size:17,font:bold});
 labels.slice(0,14).forEach((label,i)=>{const y=700-i*46;p.drawText(label,{x:48,y:y+20,size:9,font,color:L.rgb(.35,.4,.33)});const f=form.createTextField(label);f.addToPage(p,{x:48,y,width:499,height:18,borderWidth:.5,borderColor:L.rgb(.7,.75,.65),font});f.setFontSize(10);});
 p.drawText('Compilato da Otto in CS Notaro OS. Copia da revisionare prima dell’uso.',{x:48,y:48,size:8,font});
 form.updateFieldAppearances(font);return doc.save();
}
