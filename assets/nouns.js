(() => {
'use strict';
const KEY='tec-nouns-v1';
const questions=[...document.querySelectorAll('[data-question]')];
const answers=['teacher','park','dog','book','book','teacher','dog','park','cat','park'];
const messages=['Teacher nombra a una persona: profesora.','Park nombra un lugar: parque.','Dog nombra un animal: perro.','Book nombra una cosa: libro.','Book nombra la cosa; blue describe su color.','Teacher nombra a la persona; happy describe cómo se siente.','Dog nombra al animal; big describe su tamaño.','Park nombra el lugar; small describe su tamaño.','Cat nombra al animal. Big describe su tamaño.','Park nombra el lugar. Small describe su tamaño.'];
let state={choices:Array(10).fill(null),attempts:0,personal:['','',''],spoken:false};
try {const saved=JSON.parse(localStorage.getItem(KEY)); if(saved&&Array.isArray(saved.choices)&&saved.choices.length===10){state.choices=saved.choices.map((v,i)=>typeof v==='string'&&(i<4?['dog','book','teacher','park']:Array.from(questions[i].querySelectorAll('[data-word]'),b=>b.dataset.word)).includes(v)?v:null);state.attempts=Number.isInteger(saved.attempts)&&saved.attempts>=0?saved.attempts:0;state.personal=Array.from({length:3},(_,i)=>typeof saved.personal?.[i]==='string'?saved.personal[i].slice(0,60):'');state.spoken=saved.spoken===true;}} catch {}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
function render(){
 let answered=0,correct=0;
 questions.forEach((q,i)=>{
  const chosen=state.choices[i];const fb=q.querySelector('.feedback');const ok=chosen===answers[i];
  if(chosen){answered++;if(ok)correct++;fb.textContent=(ok?'✓ ¡Bien! ':'↻ Inténtalo de nuevo. ')+(ok?messages[i]:'Busca la palabra que nombra a la persona, al lugar, al animal o a la cosa.');fb.className='feedback '+(ok?'correct':'incorrect');} else {fb.textContent='';fb.className='feedback';}
  const select=q.querySelector('select');if(select)select.value=chosen||'';
  q.querySelectorAll('[data-word]').forEach(b=>{const selected=b.dataset.word===chosen;b.classList.toggle('selected',selected);b.classList.toggle('correct-answer',selected&&ok);b.setAttribute('aria-pressed',String(selected));});
 });
 document.getElementById('progress').value=answered;
 document.getElementById('progress-text').textContent=`${answered} / 10 respondidas`;
 document.getElementById('attempts').textContent=`${state.attempts} ${state.attempts===1?"respuesta comprobada":"respuestas comprobadas"}`;
 const title=document.getElementById('result-title'),msg=document.getElementById('result-message');
 title.textContent=answered===0?'Paso a paso.':`${correct} / 10 correctas`;
 msg.textContent=correct===10?'¡Lo lograste! Ya identificas los nouns en imágenes, frases y oraciones. Ahora prueba tu reto personal.':answered===10?'Terminaste las 10 preguntas. Revisa el feedback y vuelve a intentar las que necesites.':`Responde las 10 preguntas. Llevas ${answered}; puedes cambiar tus respuestas cuando quieras.`;
}
function choose(i,value){if(state.choices[i]===value)return;state.choices[i]=value||null;if(value)state.attempts++;save();render();}
questions.forEach((q,i)=>{q.querySelector('select')?.addEventListener('change',e=>choose(i,e.target.value));q.querySelectorAll('[data-word]').forEach(b=>b.addEventListener('click',()=>choose(i,b.dataset.word)));});
function personalMessage(){document.getElementById('personal-message').textContent=state.spoken&&state.personal.every(s=>s.trim())?'✓ ¡Reto personal completado! Sigue encontrando nouns a tu alrededor.':'';}
state.personal.forEach((v,i)=>{const input=document.getElementById('personal-'+(i+1));input.value=v;input.addEventListener('input',()=>{state.personal[i]=input.value;save();personalMessage();});});
const spoken=document.getElementById('spoken');spoken.checked=state.spoken;spoken.addEventListener('change',()=>{state.spoken=spoken.checked;save();personalMessage();});
const reveal=document.getElementById('show-answers'),key=document.getElementById('answer-key');
reveal.addEventListener('click',()=>{const show=key.hidden;key.hidden=!show;reveal.textContent=show?'Ocultar respuestas':'Ver respuestas';reveal.setAttribute('aria-expanded',String(show));});
const dialog=document.getElementById('reset-dialog');document.getElementById('reset').addEventListener('click',()=>dialog.showModal());document.getElementById('cancel-reset').addEventListener('click',()=>dialog.close());
document.getElementById('confirm-reset').addEventListener('click',()=>{state={choices:Array(10).fill(null),attempts:0,personal:['','',''],spoken:false};state.personal.forEach((_,i)=>document.getElementById('personal-'+(i+1)).value='');spoken.checked=false;key.hidden=true;reveal.textContent='Ver respuestas';reveal.setAttribute('aria-expanded','false');save();render();personalMessage();dialog.close();document.getElementById('pictures').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
render();personalMessage();
})();
