import { supabase } from '../../src/supabaseClient'
import { preguntasData, applyQuestionTooltips } from '../script.js'

// Este módulo ya no inyecta HTML estático.
// renderDashboard construye dinámicamente la vista en JS y rellena la tabla
// con las filas de `public.respuestas` en Supabase.

// --- Funcionalidad para mostrar pregunta y responder ---
export async function renderQuestionResponder(root = '#app-question'){
  const rootEl = (typeof root === 'string') ? document.querySelector(root) : root;
  if(!rootEl) return;

  rootEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'card';

  const title = document.createElement('h3'); title.textContent = 'Responder todas las preguntas';
  container.appendChild(title);

  const info = document.createElement('div'); info.className = 'small'; info.textContent = 'Complete un valor y/o observación por cada pregunta y presione "Enviar todas"';
  container.appendChild(info);

  // Inputs globales: select de predios (cargado desde public.predios) y evaluador
  const globalRow = document.createElement('div'); globalRow.className = 'form-row';
  // cargar lista de predios
  let prediosList = [];
  try{
    const { data: pd, error: perr } = await supabase.from('predios').select('*').order('id', { ascending: true });
    if(perr) throw perr;
    prediosList = pd || [];
  }catch(err){
    console.error('Error cargando predios:', err);
  }

  const predioSelect = document.createElement('select'); predioSelect.className = 'input-width';
  if(prediosList.length > 0){
    prediosList.forEach(p=>{
      const label = p.nombre ?? p.name ?? p.predio ?? p.titulo ?? String(p.id);
      const opt = document.createElement('option'); opt.value = String(p.id); opt.textContent = label;
      predioSelect.appendChild(opt);
    });
  } else {
    const opt = document.createElement('option'); opt.value = '1'; opt.textContent = 'Predio 1'; predioSelect.appendChild(opt);
  }

  // Mostrar evaluador (usuario autenticado) en lugar de input
  const evaluatorDisplay = document.createElement('div'); evaluatorDisplay.className = 'input-flex small'; evaluatorDisplay.textContent = 'Evaluador: (no autenticado)';
  globalRow.appendChild(predioSelect); globalRow.appendChild(evaluatorDisplay);
  container.appendChild(globalRow);

  const questionsWrap = document.createElement('div'); questionsWrap.className = 'questions-grid';
  container.appendChild(questionsWrap);

  const submitBtn = document.createElement('button'); submitBtn.className='btn btn-margin'; submitBtn.textContent='Enviar todas las respuestas';
  container.appendChild(submitBtn);

  const msg = document.createElement('div'); msg.className='small'; container.appendChild(msg);

  rootEl.appendChild(container);

  // Cargar preguntas
  let preguntas = [];
  try{
    const { data, error } = await supabase.from('preguntas').select('*').order('id', { ascending: true });
    if(error) throw error;
    preguntas = data || [];
  }catch(err){ console.error('Error cargando preguntas:', err); msg.textContent = 'Error cargando preguntas: '+(err.message||err); return; }

  // Renderizar cada pregunta en una caja
  preguntas.forEach(p=>{
    const card = document.createElement('div'); card.className='card question-card';
    // Atributos de datos para poder enlazar el tooltip por código/pregunta
    if(p.codigo) card.dataset.codigo = String(p.codigo);
    if(p.pregunta) card.dataset.pregunta = String(p.pregunta);
    const head = document.createElement('div'); head.innerHTML = `<strong>${p.codigo || ''} ${p.titulo_clausula || ''}</strong>`;
    const q = document.createElement('p'); q.textContent = p.pregunta || '';
    const valorLabel = document.createElement('div'); valorLabel.textContent = `Valor (${p.min_valor ?? 1} - ${p.max_valor ?? 5})`;
    // crear grupo de radios (1..5) para selección única
    const radioWrap = document.createElement('div'); radioWrap.className = 'radio-group';
    const minV = Number(p.min_valor ?? 1);
    const maxV = Number(p.max_valor ?? 5);
    for(let v=minV; v<=maxV; v++){
      const rid = `preg-${p.id}-val-${v}`;
      const lab = document.createElement('label'); lab.className = 'radio-label';
      const inp = document.createElement('input');
      inp.type = 'radio';
      inp.name = `pregunta-${p.id}`;
      inp.value = String(v);
      inp.id = rid;
      inp.dataset.preguntaId = String(p.id);
      inp.className = 'input-radio';
      if(v === minV) inp.checked = true; // valor por defecto
      const span = document.createElement('span'); span.textContent = String(v);
      lab.appendChild(inp); lab.appendChild(span);
      radioWrap.appendChild(lab);
    }
    const obs = document.createElement('textarea'); obs.rows=2; obs.className='textarea-full'; obs.placeholder='Observación (opcional)';
    obs.dataset.preguntaId = String(p.id);

    card.appendChild(head); card.appendChild(q); card.appendChild(valorLabel); card.appendChild(radioWrap); card.appendChild(obs);
    questionsWrap.appendChild(card);
  });

  // Activar tooltips de ayuda sobre cada pregunta usando el JSON configurable
  try{ applyQuestionTooltips(questionsWrap, preguntasData); }catch(e){ console.warn('No se pudieron aplicar tooltips:', e); }

  // intentar obtener evaluador desde sesión y mostrarlo
  try{
    const s = await supabase.auth.getSession();
    const email = s?.data?.session?.user?.email || null;
    if(email) evaluatorDisplay.textContent = `Evaluador: ${email}`;
  }catch(e){ console.warn('No se pudo obtener sesión:', e); }

  submitBtn.addEventListener('click', async ()=>{
    const predio_id = Number(predioSelect.value) || 1;
    // obtener evaluador desde la sesión (usuario actual)
    let evaluador = null;
    try{ const s = await supabase.auth.getSession(); evaluador = s?.data?.session?.user?.email || null; }catch(e){ evaluador = null; }
    const payloads = [];
    // collect values from radio groups (one selection per pregunta)
    const radios = questionsWrap.querySelectorAll('input[type="radio"][data-pregunta-id]');
    const seen = new Set();
    for(const r of radios){
      const pid = Number(r.dataset.preguntaId);
      if(seen.has(pid)) continue;
      const checked = questionsWrap.querySelector(`input[type="radio"][data-pregunta-id="${pid}"]:checked`);
      const question = preguntas.find(x=>Number(x.id)===pid);
      if(!question) continue;
      const valueNum = checked ? Number(checked.value) : Number(question.min_valor ?? 1);
      const obsEl = questionsWrap.querySelector(`textarea[data-pregunta-id="${pid}"]`);
      const observacion = obsEl ? (obsEl.value.trim() || null) : null;
      payloads.push({ predio_id, pregunta_id: pid, valor: valueNum, observacion, evaluador, fecha: new Date().toISOString() });
      seen.add(pid);
    }
    if(payloads.length===0){ msg.textContent='No hay respuestas para enviar.'; return; }
    msg.textContent = 'Preparando envío de ' + payloads.length + ' respuestas...';
    submitBtn.disabled = true;
    try{
      // 1) Eliminar respuestas previas del mismo predio para las mismas preguntas (evitar duplicados)
      const preguntaIds = [...new Set(payloads.map(p=>p.pregunta_id))];
      try{
        const del = await supabase
          .from('respuestas')
          .delete()
          .eq('predio_id', predio_id)
          .in('pregunta_id', preguntaIds);
        if(del.error){ console.warn('No se pudieron eliminar previas:', del.error.message || del.error); }
      }catch(e){ console.warn('Error eliminando previas:', e); }

      // 2) Insertar nuevas respuestas
      msg.textContent = 'Guardando nuevas respuestas...';
      const { data, error } = await supabase.from('respuestas').insert(payloads).select();
      if(error){ console.error(error); msg.textContent = 'Error al guardar: ' + (error.message||error); submitBtn.disabled=false; return; }
      msg.textContent = 'Respuestas guardadas: ' + (data?.length ?? payloads.length);
      // refrescar formulario y tabla dentro del dashboard
      try{
        // Resetear los controles del formulario: devolver radios al valor mínimo y limpiar observaciones
        const radiosReset = questionsWrap.querySelectorAll('input[type="radio"][data-pregunta-id]');
        // Desmarcar todos
        for(const r of radiosReset) r.checked = false;
        // Marcar el valor por defecto (min_valor) para cada pregunta
        for(const p of preguntas){
          const def = String(p.min_valor ?? 1);
          const sel = questionsWrap.querySelector(`input[type="radio"][data-pregunta-id="${p.id}"][value="${def}"]`);
          if(sel) sel.checked = true;
        }
        const textareas = questionsWrap.querySelectorAll('textarea');
        for(const ta of textareas) ta.value = '';
        // dejar mensaje breve
        msg.textContent = 'Formulario reiniciado.';
      }catch(e){ console.error('No se pudo resetear el formulario:', e); }
      try{
        // re-renderizar la tabla de respuestas en el contenedor dedicado
        await renderDashboard('#app-respuestas');
      }catch(e){ console.error('No se pudo refrescar la tabla de respuestas:', e); }
      try{
        // re-renderizar el tablero de progreso por predio
        await renderProgressByPredio('#app-progress');
      }catch(e){ console.error('No se pudo refrescar el progreso por predio:', e); }
    }catch(err){ console.error(err); msg.textContent='Error inesperado al enviar.'; }
    submitBtn.disabled = false;
  });
}

/**
 * Construye y muestra la tabla de respuestas dentro del elemento `root`.
 * Cada fila se presenta en formato con campos: idx, id, predio_id, pregunta_id,
 * valor, observacion, evaluador, fecha.
 */
export async function renderDashboard(root = '#app'){
  const rootEl = (typeof root === 'string') ? document.querySelector(root) : root;
  if(!rootEl) throw new Error('Elemento root no encontrado: ' + root);

  // Contenedor principal
  rootEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'card dashboard-main';

  const title = document.createElement('h2');
  title.textContent = 'Respuestas — public.respuestas';
  container.appendChild(title);

  const status = document.createElement('div');
  status.id = 'respuestasStatus';
  status.className = 'small';
  status.textContent = 'Cargando respuestas...';
  container.appendChild(status);

  // Tabla
  const table = document.createElement('table');
  table.id = 'respuestasTable';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const cols = ['idx','id','predio_id','pregunta_id','valor','observacion','evaluador','fecha'];
  cols.forEach(c=>{
    const th = document.createElement('th');
    th.textContent = c;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  container.appendChild(table);

  // Agregar botón recargar
  const controls = document.createElement('div');
  controls.className = 'form-row';
  const reloadBtn = document.createElement('button');
  reloadBtn.className = 'btn btn-secondary';
  reloadBtn.textContent = 'Recargar respuestas';
  reloadBtn.addEventListener('click', ()=> loadData());
  controls.appendChild(reloadBtn);
  container.appendChild(controls);

  rootEl.appendChild(container);

  async function loadData(){
    status.textContent = 'Consultando base de datos...';
    tbody.innerHTML = '';
    try{
      const { data, error } = await supabase.from('respuestas').select('*').order('id', { ascending: true });
      if(error){
        console.error('Error supabase:', error);
        status.textContent = 'Error al obtener respuestas: ' + (error.message || error);
        return;
      }
      if(!data || data.length === 0){
        status.textContent = 'No se encontraron respuestas.';
        return;
      }

      // data esperado: array de objetos con campos idx,id,predio_id,pregunta_id,valor,observacion,evaluador,fecha
      for(const row of data){
        const tr = document.createElement('tr');
        cols.forEach(key=>{
          const td = document.createElement('td');
          let v = row[key];
          if(key === 'fecha' && v){
            // Supabase suele devolver ISO; si es string con microsegundos, intentar parsear
            const d = new Date(v);
            if(!isNaN(d)) v = d.toLocaleString();
          }
          td.textContent = (v === null || v === undefined) ? '' : String(v);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
      status.textContent = 'Cargadas ' + data.length + ' respuestas.';
    }catch(err){
      console.error('Error inesperado:', err);
      status.textContent = 'Error inesperado al cargar respuestas.';
    }
  }

  // Primera carga
  await loadData();
}

// --- Vista: progreso por predio ---
export async function renderProgressByPredio(root = '#app-progress'){
  const rootEl = (typeof root === 'string') ? document.querySelector(root) : root;
  if(!rootEl) return;

  rootEl.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'card';
  const title = document.createElement('h3'); title.textContent = 'Avance por predio';
  container.appendChild(title);

  const info = document.createElement('div'); info.className = 'small'; info.textContent = 'Porcentaje de cumplimiento: respuestas con valor 5 representan cumplimiento total.';
  container.appendChild(info);

  // Obtener preguntas y respuestas
  let preguntas = [];
  try{
    const { data: pdata, error: perror } = await supabase.from('preguntas').select('id');
    if(perror) throw perror;
    preguntas = pdata || [];
  }catch(err){ console.error('Error cargando preguntas:', err); container.appendChild(document.createTextNode('Error cargando preguntas.')); rootEl.appendChild(container); return; }

  const totalPreguntas = preguntas.length || 0;
  if(totalPreguntas === 0){ const empty = document.createElement('div'); empty.textContent = 'No hay preguntas registradas.'; container.appendChild(empty); rootEl.appendChild(container); return; }

  let respuestas = [];
  try{
    const { data: rdata, error: rerr } = await supabase.from('respuestas').select('*');
    if(rerr) throw rerr;
    respuestas = rdata || [];
  }catch(err){ console.error('Error cargando respuestas:', err); container.appendChild(document.createTextNode('Error cargando respuestas.')); rootEl.appendChild(container); return; }

  // Agrupar por predio_id
  const byPredio = new Map();
  for(const r of respuestas){
    const pid = (r.predio_id ?? r.predio) || 'unknown';
    const entry = byPredio.get(pid) || { total: 0, total5: 0 };
    entry.total += 1;
    if(Number(r.valor) === 5) entry.total5 += 1;
    byPredio.set(pid, entry);
  }

  // Obtener mapeo id -> nombre de predio para mostrar etiquetas amigables (solo ids presentes)
  let predioMap = new Map();
  try{
    const ids = Array.from(byPredio.keys()).filter(pid => pid !== 'unknown').map(pid => Number(pid)).filter(n => !Number.isNaN(n));
    if(ids.length){
      const { data: pdData, error: pdErr } = await supabase
        .from('predios')
        .select('id,nombre,name,predio,titulo,codigo')
        .in('id', ids);
      if(!pdErr && pdData){
        for(const p of pdData){
          const key = String(p.id);
          const label = p.nombre ?? p.name ?? p.predio ?? p.titulo ?? p.codigo ?? null;
          if(label) predioMap.set(key, label);
        }
      }
    }
  }catch(e){ console.warn('No se pudo obtener nombres de predios:', e); }

  // Si no hay predios con respuestas, mostrar mensaje
  if(byPredio.size === 0){ const none = document.createElement('div'); none.textContent = 'No hay respuestas registradas por predio.'; container.appendChild(none); rootEl.appendChild(container); return; }

  const list = document.createElement('div'); list.className = 'progress-container';

  // Ordenar predios por porcentaje descendente
  const rows = Array.from(byPredio.entries()).map(([pid, stats])=>{
    const percent = Math.round((stats.total5 / totalPreguntas) * 100);
    return { pid, stats, percent };
  }).sort((a,b)=> b.percent - a.percent);

  rows.forEach(r=>{
    const row = document.createElement('div'); row.className = 'progress-row';
    const predioKey = String(r.pid);
    const predioName = predioMap.get(predioKey);
    const displayName = predioName ? predioName : (r.pid === 'unknown' ? 'Predio desconocido' : `Predio ${r.pid}`);
    const label = document.createElement('div'); label.className = 'progress-label'; label.textContent = `${displayName} — ${r.percent}%`;
    const barWrap = document.createElement('div'); barWrap.className = 'progress-bar';
    const fill = document.createElement('div'); fill.className = 'progress-fill'; fill.style.width = Math.min(100, Math.max(0, r.percent)) + '%';
    barWrap.appendChild(fill);
    row.appendChild(label); row.appendChild(barWrap);
    list.appendChild(row);
  });

  container.appendChild(list);
  rootEl.appendChild(container);
}