// Datos en español (puedes sumar más fácilmente)
const who = ['El perro', 'Mi abuela', 'El cartero', 'Mi pájaro', 'Mi jefe', 'El vecino', 'Un duende'];
const action = ['se comió', 'mojó', 'rompió', 'perdió', 'olvidó', 'se llevó'];
const what = ['mi tarea', 'mi teléfono', 'el informe', 'las llaves', 'mi laptop', 'el auto'];
const when = [
  'antes de la clase',
  'mientras dormía',
  'cuando estaba entrenando',
  'durante el almuerzo',
  'mientras meditaba',
  'de camino al trabajo'
];

function randomOf(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function generateExcuse(){
  return `${randomOf(who)} ${randomOf(action)} ${randomOf(what)} ${randomOf(when)}.`;
}

const excuseEl = document.getElementById('excuse');
const btnGenerate = document.getElementById('btn-generate');
const btnCopy = document.getElementById('btn-copy');
const copyFeedback = document.getElementById('copy-feedback');

function showExcuse(){
  // animación simple
  excuseEl.classList.remove('excuse--show');
  const next = generateExcuse();
  // esperar el fin del frame para que la transición se note
  requestAnimationFrame(()=>{
    excuseEl.textContent = next;
    excuseEl.classList.add('excuse--show');
  });
}

async function copyExcuse(){
  try{
    await navigator.clipboard.writeText(excuseEl.textContent.trim());
    copyFeedback.classList.add('feedback--show');
    setTimeout(()=> copyFeedback.classList.remove('feedback--show'), 1400);
  }catch(e){
    // Fallback por si no hay permiso de clipboard
    const tmp = document.createElement('textarea');
    tmp.value = excuseEl.textContent.trim();
    document.body.appendChild(tmp);
    tmp.select(); document.execCommand('copy');
    document.body.removeChild(tmp);
    copyFeedback.classList.add('feedback--show');
    setTimeout(()=> copyFeedback.classList.remove('feedback--show'), 1400);
  }
}

// Eventos
btnGenerate.addEventListener('click', showExcuse);
btnCopy.addEventListener('click', copyExcuse);

// Genera una al cargar
window.addEventListener('DOMContentLoaded', showExcuse);
