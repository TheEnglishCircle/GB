(() => {
'use strict';
const KEY='tec-more-nouns-v1';
const questions=[...document.querySelectorAll('[data-question]')];
const total=questions.length;
const normalize=v=>v.trim().toLowerCase().replace(/\s+/g,' ');
const fresh=()=>({choices:Array(total).fill(null),drafts:Array(4).fill(''),attempts:0,personal:['',''],spoken:false});
let state=fresh();
try {
 const saved=JSON.parse(localStorage.getItem(KEY));
 if(saved&&Array.isArray(saved.choices)&&saved.choices.length===total){
  state.choices=saved.choices.map((v,i)=>{
   if(typeof v!=='string'||v.length>60)return null;
   const q=questions[i];const select=q.querySelector('select');
   if(select)return [...select.options].some(o=>o.value===v&&v)?v:null;
   if(q.querySelector('[data-word]'))return [...q.querySelectorAll('[data-word]')].some(b=>b.dataset.word===v)?v:null;
   return v;
  });
  state.drafts=Array.from({length:4},(_,i)=>typeof saved.drafts?.[i]==='string'?saved.drafts[i].slice(0,40):'');
  state.personal=Array.from({length:2},(_,i)=>typeof saved.personal?.[i]==='string'?saved.personal[i].slice(0,100):'');
  state.attempts=Number.isInteger(saved.attempts)&&saved.attempts>=0?saved.attempts:0;
  state.spoken=saved.spoken===true;
 }
}catch{}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
function render(){
 let answered=0,correct=0;
 questions.forEach((q,i)=>{
  const chosen=state.choices[i],ok=chosen===q.dataset.answer;
  const fb=q.querySelector('.feedback');
  if(chosen){answered++;if(ok)correct++;fb.textContent=(ok?'✓ ¡Bien! ':'↻ Inténtalo de nuevo. ')+(ok?q.dataset.explain:q.dataset.hint);fb.className='feedback '+(ok?'correct':'incorrect');}
  else{fb.textContent='';fb.className='feedback';}
  const select=q.querySelector('select');if(select)select.value=chosen||'';
  q.querySelectorAll('[data-word]').forEach(b=>{const selected=b.dataset.word===chosen;b.classList.toggle('selected',selected);b.classList.toggle('correct-answer',selected&&ok);b.setAttribute('aria-pressed',String(selected));});
 });
 document.getElementById('progress').value=answered;
 document.getElementById('progress-text').textContent=`${answered} / ${total} respondidas`;
 document.getElementById('attempts').textContent=`${state.attempts} ${state.attempts===1?'respuesta comprobada':'respuestas comprobadas'}`;
 document.getElementById('result-title').textContent=answered?`${correct} / ${total} correctas`:'Paso a paso.';
 document.getElementById('result-message').textContent=correct===total?'¡Lo lograste! Reconoces los ocho nouns, sabes organizarlos y recuerdas cómo se escriben. Ahora crea tus propias frases.':answered===total?'Terminaste las actividades. Revisa el feedback y vuelve a intentar las respuestas que necesites.':`Llevas ${answered} de ${total} respuestas. Puedes cambiar tus respuestas y volver a intentarlo.`;
}
function choose(i,value){const v=value||null;if(state.choices[i]===v)return;state.choices[i]=v;if(v)state.attempts++;save();render();}
questions.forEach((q,i)=>{
 q.querySelector('select')?.addEventListener('change',e=>choose(i,e.target.value));
 q.querySelectorAll('[data-word]').forEach(b=>b.addEventListener('click',()=>choose(i,b.dataset.word)));
 const input=q.querySelector('.recall-input');
 if(input){
  const index=i-20;input.value=state.drafts[index];
  input.addEventListener('input',()=>{state.drafts[index]=input.value;state.choices[i]=null;save();render();});
  const check=()=>{const value=normalize(input.value);if(!value){const fb=q.querySelector('.feedback');fb.textContent='Escribe una palabra antes de comprobar.';fb.className='feedback incorrect';input.focus();return;}choose(i,value);};
  q.querySelector('.check-recall').addEventListener('click',check);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});
 }
});
function personalMessage(){document.getElementById('personal-message').textContent=state.spoken&&state.personal.every(v=>v.trim())?'✓ ¡Reto personal completado! Sigue usando tus nuevos nouns.':'';}
state.personal.forEach((v,i)=>{const input=document.getElementById('personal-'+(i+1));input.value=v;input.addEventListener('input',()=>{state.personal[i]=input.value;save();personalMessage();});});
const spoken=document.getElementById('spoken');spoken.checked=state.spoken;spoken.addEventListener('change',()=>{state.spoken=spoken.checked;save();personalMessage();});
const reveal=document.getElementById('show-answers'),key=document.getElementById('answer-key');
function closeAnswers(){key.hidden=true;reveal.textContent='Ver respuestas';reveal.setAttribute('aria-expanded','false');}
reveal.addEventListener('click',()=>{const show=key.hidden;key.hidden=!show;reveal.textContent=show?'Ocultar respuestas':'Ver respuestas';reveal.setAttribute('aria-expanded',String(show));});
const earlier=document.getElementById('earlier-exercises'),memory=document.getElementById('memory-mode');
function setMemory(hide){earlier.hidden=hide;memory.textContent=hide?'Mostrar ejercicios anteriores':'Ocultar ejercicios anteriores';memory.setAttribute('aria-expanded',String(!hide));document.getElementById('memory-note').textContent=hide?'Modo memoria: los ejercicios anteriores están ocultos.':'Intenta recordar las palabras sin consultar el banco.';}
memory.addEventListener('click',()=>{const hide=!earlier.hidden;setMemory(hide);if(hide)closeAnswers();document.getElementById('recall').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
document.querySelectorAll('.lesson-nav a').forEach(link=>link.addEventListener('click',()=>{if(['#pictures','#categories','#phrases'].includes(link.getAttribute('href')))setMemory(false);}));
const dialog=document.getElementById('reset-dialog');document.getElementById('reset').addEventListener('click',()=>dialog.showModal());document.getElementById('cancel-reset').addEventListener('click',()=>dialog.close());
document.getElementById('confirm-reset').addEventListener('click',()=>{state=fresh();document.querySelectorAll('.recall-input').forEach(input=>input.value='');state.personal.forEach((_,i)=>document.getElementById('personal-'+(i+1)).value='');spoken.checked=false;closeAnswers();setMemory(false);save();render();personalMessage();dialog.close();document.getElementById('pictures').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
render();personalMessage();
})();
