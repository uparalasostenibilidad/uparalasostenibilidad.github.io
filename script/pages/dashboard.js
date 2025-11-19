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

  const title = document.createElement('h3'); title.textContent = 'Responder preguntas de evaluación';
  container.appendChild(title);

  const info = document.createElement('div'); info.className = 'small'; info.textContent = 'Complete una calificación y/o observación por cada pregunta y presione "Enviar todas"';
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

  // Campo de selección de predio con etiqueta visible
  const predioField = document.createElement('div'); predioField.className = 'field-group';
  const predioLabel = document.createElement('label'); predioLabel.className = 'field-label'; predioLabel.textContent = 'Predio a evaluar';
  predioLabel.htmlFor = 'predioSelect';
  const predioSelect = document.createElement('select'); predioSelect.className = 'input-select select-predio'; predioSelect.id = 'predioSelect';
  // Placeholder inicial
  const placeholderOpt = document.createElement('option'); placeholderOpt.value = ''; placeholderOpt.textContent = 'Selecciona un predio...'; placeholderOpt.disabled = true; placeholderOpt.selected = true; predioSelect.appendChild(placeholderOpt);
  if(prediosList.length > 0){
    prediosList.forEach(p=>{
      const label = p.nombre ?? p.name ?? p.predio ?? p.titulo ?? String(p.id);
      const opt = document.createElement('option'); opt.value = String(p.id); opt.textContent = label;
      predioSelect.appendChild(opt);
    });
  } else {
    const opt = document.createElement('option'); opt.value = '1'; opt.textContent = 'Predio 1'; predioSelect.appendChild(opt);
  }
  predioField.appendChild(predioLabel); predioField.appendChild(predioSelect);

  // Mostrar evaluador (usuario autenticado) en lugar de input
  const evaluatorDisplay = document.createElement('div'); evaluatorDisplay.className = 'input-flex small'; evaluatorDisplay.textContent = 'Evaluador: (no autenticado)';
  globalRow.appendChild(predioField); globalRow.appendChild(evaluatorDisplay);
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
    const valorLabel = document.createElement('div'); valorLabel.textContent = `Calificación (${p.min_valor ?? 1} - ${p.max_valor ?? 5})`;
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
    if(!predioSelect.value){ msg.textContent = 'Selecciona un predio para continuar.'; return; }
    const predio_id = Number(predioSelect.value);
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
      // 1) Leer existentes para este predio y estas preguntas
      const preguntaIds = [...new Set(payloads.map(p=>p.pregunta_id))];
      msg.textContent = 'Comparando respuestas existentes...';
      const { data: existingRows, error: existErr } = await supabase
        .from('respuestas')
        .select('id,predio_id,pregunta_id,valor,observacion')
        .eq('predio_id', predio_id)
        .in('pregunta_id', preguntaIds)
        .order('id', { ascending: false });
      if(existErr){ console.warn('No se pudieron consultar respuestas previas:', existErr.message || existErr); }

      const latestByPregunta = new Map();
      if(Array.isArray(existingRows)){
        for(const row of existingRows){
          const key = Number(row.pregunta_id);
          if(!latestByPregunta.has(key)) latestByPregunta.set(key, row); // mantener la más reciente por id desc
        }
      }

      // 2) Particionar: insertar nuevas, actualizar cambiadas, omitir sin cambios
      const toInsert = [];
      const toUpdate = [];
      let unchanged = 0;
      for(const p of payloads){
        const prev = latestByPregunta.get(Number(p.pregunta_id));
        if(!prev){
          toInsert.push(p);
        } else {
          const prevValor = Number(prev.valor);
          const prevObs = (prev.observacion ?? null);
          const newValor = Number(p.valor);
          const newObs = (p.observacion ?? null);
          const changed = (prevValor !== newValor) || (prevObs !== newObs);
          if(changed){
            toUpdate.push({ id: prev.id, valor: newValor, observacion: newObs, evaluador: p.evaluador, fecha: p.fecha });
          } else {
            unchanged++;
          }
        }
      }

      // 3) Ejecutar inserciones y actualizaciones
      let insertedCount = 0; let updatedCount = 0;
      if(toInsert.length){
        msg.textContent = `Insertando ${toInsert.length} nuevas respuestas...`;
        const { data, error } = await supabase.from('respuestas').insert(toInsert).select('id');
        if(error){ console.error(error); msg.textContent = 'Error al insertar: ' + (error.message||error); submitBtn.disabled=false; return; }
        insertedCount = data?.length ?? toInsert.length;
      }
      if(toUpdate.length){
        msg.textContent = `Actualizando ${toUpdate.length} respuestas cambiadas...`;
        // Actualizar una por una para aplicar valores distintos
        for(const u of toUpdate){
          const { error } = await supabase
            .from('respuestas')
            .update({ valor: u.valor, observacion: u.observacion, evaluador: u.evaluador, fecha: u.fecha })
            .eq('id', u.id);
          if(error){ console.warn('No se pudo actualizar id', u.id, error.message || error); }
          else updatedCount++;
        }
      }
      msg.textContent = `Cambios aplicados — Insertadas: ${insertedCount}, Actualizadas: ${updatedCount}, Sin cambios: ${unchanged}`;
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
        // re-renderizar si existen contenedores específicos (modo de 3 secciones)
        if(document.querySelector('#app-respuestas')){
          await renderDashboard('#app-respuestas');
        }
      }catch(e){ console.warn('No se pudo refrescar la tabla de respuestas:', e?.message||e); }
      try{
        if(document.querySelector('#app-progress')){
          await renderProgressByPredio('#app-progress');
        }
      }catch(e){ console.warn('No se pudo refrescar el progreso por predio:', e?.message||e); }
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

  // Contenedor superior: resumen de cobertura (se insertará antes del listado de avance)
  const summaryCard = document.createElement('div');
  summaryCard.className = 'card';
  const sumTitle = document.createElement('h3'); sumTitle.textContent = 'Cobertura de evaluación';
  summaryCard.appendChild(sumTitle);
  const sumInfo = document.createElement('div'); sumInfo.className = 'small'; sumInfo.textContent = 'Porcentaje de predios evaluados completamente (todas las preguntas respondidas).';
  summaryCard.appendChild(sumInfo);
  // Separación respecto al bloque de avance detallado
  summaryCard.style.marginBottom = '24px';

  // Obtener preguntas y respuestas
  let preguntas = [];
  try{
    const { data: pdata, error: perror } = await supabase.from('preguntas').select('id');
    if(perror) throw perror;
    preguntas = pdata || [];
  }catch(err){ console.error('Error cargando preguntas:', err); summaryCard.appendChild(document.createTextNode('Error cargando preguntas.')); rootEl.appendChild(summaryCard); return; }

  const totalPreguntas = preguntas.length || 0;
  if(totalPreguntas === 0){ const empty = document.createElement('div'); empty.textContent = 'No hay preguntas registradas.'; summaryCard.appendChild(empty); rootEl.appendChild(summaryCard); return; }

  let respuestas = [];
  try{
    const { data: rdata, error: rerr } = await supabase.from('respuestas').select('*');
    if(rerr) throw rerr;
    respuestas = rdata || [];
  }catch(err){ console.error('Error cargando respuestas:', err); summaryCard.appendChild(document.createTextNode('Error cargando respuestas.')); rootEl.appendChild(summaryCard); return; }

  // Obtener todos los predios para calcular cobertura
  let prediosAll = [];
  let prediosCount = 0;
  try{
    const { data: pdAll, error: pdAllErr } = await supabase.from('predios').select('id,nombre').order('id', { ascending: true });
    if(pdAllErr) throw pdAllErr;
    prediosAll = pdAll || [];
    // Obtener conteo exacto aunque no vengan filas (head)
    const { count } = await supabase.from('predios').select('*', { count: 'exact', head: true });
    prediosCount = Number(count || 0);
  }catch(e){ console.warn('No se pudo obtener la lista completa de predios:', e); }

  // Agrupar por predio_id
  const byPredio = new Map();
  const answeredByPredio = new Map(); // predio_id(string) -> Set de pregunta_id respondidas
  for(const r of respuestas){
    const pid = String((r.predio_id ?? r.predio) || 'unknown');
    const entry = byPredio.get(pid) || { total: 0, total5: 0 };
    entry.total += 1;
    if(Number(r.valor) === 5) entry.total5 += 1;
    byPredio.set(pid, entry);

    const set = answeredByPredio.get(pid) || new Set();
    if(r.pregunta_id != null) set.add(Number(r.pregunta_id));
    answeredByPredio.set(pid, set);
  }

  // Mapeo id -> nombre de predio para mostrar etiquetas amigables (preferir lista completa)
  const predioMap = new Map();
  if(prediosAll.length){
    for(const p of prediosAll){
      const key = String(p.id);
      const label = p.nombre ?? p.name ?? p.predio ?? p.titulo ?? p.codigo ?? `Predio ${p.id}`;
      predioMap.set(key, label);
    }
  } else {
    // fallback: obtener nombres solo para ids presentes en respuestas
    try{
      const ids = Array.from(byPredio.keys()).filter(pid => pid !== 'unknown').map(pid => Number(pid)).filter(n => !Number.isNaN(n));
      if(ids.length){
        const { data: pdData, error: pdErr } = await supabase
          .from('predios')
          .select('id,nombre')
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
  }

  // Calcular cobertura: predios evaluados completamente (todas las preguntas respondidas)
  const totalPredios = (prediosAll.length || prediosCount || predioMap.size || 0);
  let evaluadosFull = 0;
  const faltantes = [];
  if(totalPredios > 0){
    if(prediosAll.length){
      const idsUniverse = prediosAll.map(p=>String(p.id));
      for(const pid of idsUniverse){
        const set = answeredByPredio.get(pid) || new Set();
        if(set.size >= totalPreguntas) evaluadosFull += 1;
        else {
          const label = predioMap.get(pid) || (pid==='unknown' ? 'Predio desconocido' : `Predio ${pid}`);
          faltantes.push({ pid, label, estado: set.size===0 ? 'sin respuestas' : 'incompleto' });
        }
      }
    } else if(prediosCount){
      // No tenemos filas de predios pero sí conteo: computar con los que aparecen en respuestas
      const idsPresentes = Array.from(answeredByPredio.keys());
      for(const pid of idsPresentes){
        const set = answeredByPredio.get(pid) || new Set();
        if(set.size >= totalPreguntas) evaluadosFull += 1;
      }
      // No podemos listar nombres faltantes sin filas; indicamos cantidad faltante
      const faltanN = Math.max(0, prediosCount - idsPresentes.length);
      if(faltanN > 0){
        faltantes.push({ pid: 'desconocidos', label: `${faltanN} predio(s) sin registrar en respuestas`, estado: 'faltante' });
      }
    } else {
      // Fallback a lo presente en predioMap/answers
      const idsUniverse = Array.from(predioMap.keys());
      for(const pid of idsUniverse){
        const set = answeredByPredio.get(pid) || new Set();
        if(set.size >= totalPreguntas) evaluadosFull += 1;
        else {
          const label = predioMap.get(pid) || (pid==='unknown' ? 'Predio desconocido' : `Predio ${pid}`);
          faltantes.push({ pid, label, estado: set.size===0 ? 'sin respuestas' : 'incompleto' });
        }
      }
    }
  }
  const porcentaje = totalPredios>0 ? Math.round((evaluadosFull/totalPredios)*100) : 0;

  // Pintar resumen con barra de progreso circular
  const resumen = document.createElement('div');
  resumen.style.display = 'flex';
  resumen.style.alignItems = 'center';
  resumen.style.gap = '14px';

  const ringWrap = document.createElement('div');
  ringWrap.innerHTML = `
    <svg class="progress-ring" viewBox="0 0 120 120" width="240" height="240" aria-label="Predios evaluados completamente">
      <circle cx="60" cy="60" r="52" stroke="#e0e0e0" stroke-width="12" fill="none"/>
      <circle id="ringFullEval" cx="60" cy="60" r="52" stroke="var(--primary-green)"
              stroke-width="12" fill="none" stroke-linecap="round"
              transform="rotate(-90 60 60)" stroke-dasharray="326 326" stroke-dashoffset="326"/>
      <text id="ringText" x="60" y="66" text-anchor="middle" font-size="20" fill="var(--color-accent-navy)" font-weight="700">${porcentaje}%</text>
    </svg>`;

  const ringInfo = document.createElement('div');
  ringInfo.innerHTML = `<div class="small">Predios evaluados completamente</div>
                        <div style="font-weight:700; font-size:1.1rem; color:var(--color-accent-navy)">${evaluadosFull} / ${totalPredios} — ${porcentaje}%</div>`;

  resumen.appendChild(ringWrap);
  resumen.appendChild(ringInfo);
  summaryCard.appendChild(resumen);

  // Animación del anillo
  try{
    const circEl = ringWrap.querySelector('#ringFullEval');
    const len = 2*Math.PI*52; // circunferencia para r=52
    circEl.style.strokeDasharray = `${len} ${len}`;
    circEl.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(()=>{
      circEl.style.transition = 'stroke-dashoffset 800ms ease';
      const offset = len - (Math.max(0, Math.min(100, porcentaje))/100)*len;
      circEl.style.strokeDashoffset = `${offset}`;
    });
  }catch(_e){ /* no-op */ }

  const faltantesWrap = document.createElement('div');
  faltantesWrap.className = 'small';
  if(faltantes.length){
    const faltantesCol = document.createElement('div');
    faltantesCol.style.display = 'flex';
    faltantesCol.style.flexDirection = 'column';
    faltantesCol.style.gap = '4px';
    faltantesCol.style.minWidth = '260px';
    const subt = document.createElement('h3');
    subt.textContent = 'Predios faltantes por evaluar:';
    const list = document.createElement('ul');
    list.style.margin = '0';
    list.style.paddingLeft = '18px';
    faltantes.forEach(f=>{
      const li = document.createElement('li');
      li.textContent = `${f.label} — ${f.estado}`;
      // Colorear según estado usando variables CSS existentes
      if(f.estado === 'sin respuestas'){
        li.style.color = 'var(--color-accent-navy)'; // ahora azul marino
      } else if(f.estado === 'incompleto'){
        li.style.color = 'var(--primary-orange)'; // advertencia/naranja
      }
      list.appendChild(li);
    });
    faltantesCol.appendChild(subt);
    faltantesCol.appendChild(list);
    resumen.appendChild(faltantesCol);
  } else {
    const ok = document.createElement('div');
    ok.className = 'small';
    ok.textContent = 'Todos los predios están evaluados completamente.';
    resumen.appendChild(ok);
  }

  // Agregar resumen al root
  rootEl.appendChild(summaryCard);

  // Histograma global independiente debajo de cobertura
  const histWrapper = document.createElement('div');
  histWrapper.id = 'app-histograma-coverage';
  histWrapper.style.marginBottom = '24px';
  rootEl.appendChild(histWrapper);
  try { await renderHistogramaRespuestas(histWrapper); } catch(e){ console.warn('No se pudo renderizar histograma de respuestas:', e); }

  // Título e info del bloque de avance detallado
  const title = document.createElement('h3'); title.textContent = 'Avance por predio';
  container.appendChild(title);
  const info = document.createElement('div'); info.className = 'small'; info.textContent = 'Porcentaje de cumplimiento por predio (respuestas con valor 5 representan cumplimiento total)';
  container.appendChild(info);

  // Si no hay predios con respuestas, mostrar mensaje pero mantener el resumen arriba
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
  // Integrar indicadores por capítulo debajo de la lista de progreso
  const chapterRoot = document.createElement('div');
  chapterRoot.id = 'app-capitulos-progress';
  chapterRoot.style.marginTop = '24px';
  container.appendChild(chapterRoot);
  try { await renderPromediosCapitulos(chapterRoot); } catch(e){ console.warn('No se pudieron renderizar promedios por capítulo:', e); }
  rootEl.appendChild(container);
}

// ---------------------------------------------
// Indicadores por capítulo (promedio de valores)
// ---------------------------------------------
/**
 * Calcula promedios por capítulo (primer número del código de la pregunta) para cada predio.
 * Devuelve un arreglo de objetos:
 * [ { predio_id, nombre, capitulos: [ { capitulo, promedio, cantidad } ], promedioGlobal } ]
 */
export async function calcularPromediosCapitulos(){
  // 1. Obtener preguntas (id, codigo)
  let preguntas = [];
  try{
    const { data, error } = await supabase.from('preguntas').select('id,codigo');
    if(error) throw error;
    preguntas = data || [];
  }catch(e){ console.error('Error cargando preguntas para capítulos:', e); return []; }

  // Mapa pregunta_id -> capitulo
  const preguntaCapitulo = new Map();
  for(const p of preguntas){
    if(!p || !p.id || !p.codigo) continue;
    const raw = String(p.codigo).trim();
    const cap = raw.split('.')[0];
    const numCap = parseInt(cap, 10);
    if(!Number.isNaN(numCap)) preguntaCapitulo.set(Number(p.id), numCap);
  }

  // 2. Obtener respuestas (predio_id, pregunta_id, valor)
  let respuestas = [];
  try{
    const { data, error } = await supabase.from('respuestas').select('predio_id,pregunta_id,valor');
    if(error) throw error;
    respuestas = data || [];
  }catch(e){ console.error('Error cargando respuestas para capítulos:', e); return []; }

  // 3. Obtener nombres de predios
  let predios = [];
  try{
    const { data, error } = await supabase.from('predios').select('id,nombre');
    if(error) throw error;
    predios = data || [];
  }catch(e){ console.warn('No se pudieron cargar nombres de predios:', e); }
  const predioNombre = new Map();
  for(const pr of predios){
    predioNombre.set(String(pr.id), pr.nombre ?? `Predio ${pr.id}`);
  }

  // 4. Agrupar valores por predio y capítulo
  const agrupado = new Map(); // predio_id(string) -> Map(capitulo -> { sum, count })
  for(const r of respuestas){
    const pid = String(r.predio_id);
    const cap = preguntaCapitulo.get(Number(r.pregunta_id));
    if(!cap) continue; // pregunta sin capítulo reconocible
    const predioMap = agrupado.get(pid) || new Map();
    const entry = predioMap.get(cap) || { sum: 0, count: 0 };
    entry.sum += Number(r.valor) || 0;
    entry.count += 1;
    predioMap.set(cap, entry);
    agrupado.set(pid, predioMap);
  }

  // 5. Construir resultado
  const resultado = [];
  for(const [pid, capsMap] of agrupado.entries()){
    const caps = [];
    let sumGlobal = 0; let countGlobal = 0;
    for(const [cap, data] of capsMap.entries()){
      const promedio = data.count>0 ? (data.sum / data.count) : 0;
      caps.push({ capitulo: cap, promedio: parseFloat(promedio.toFixed(2)), cantidad: data.count });
      sumGlobal += promedio;
      countGlobal += 1;
    }
    caps.sort((a,b)=> a.capitulo - b.capitulo);
    const promGlobal = countGlobal>0 ? (sumGlobal / countGlobal) : 0;
    resultado.push({ predio_id: pid, nombre: predioNombre.get(pid) || `Predio ${pid}`, capitulos: caps, promedioGlobal: parseFloat(promGlobal.toFixed(2)) });
  }
  // Ordenar por mejor promedio global
  resultado.sort((a,b)=> b.promedioGlobal - a.promedioGlobal);
  return resultado;
}

/** Selecciona color semáforo según promedio (más cerca a 5 => verde) */
function colorSemaforo(avg){
  if(avg >= 4.5) return 'var(--primary-green)';
  if(avg >= 3.5) return '#36b49f';
  if(avg >= 2.5) return 'var(--primary-orange)';
  if(avg >= 1.5) return '#d57f00';
  return 'var(--color-accent-red)';
}

/**
 * Renderiza una tarjeta con los promedios por capítulo para cada predio.
 * Retorna también el arreglo calculado.
 */
export async function renderPromediosCapitulos(root = '#app-capitulos'){
  const rootEl = (typeof root === 'string') ? document.querySelector(root) : root;
  if(!rootEl) return [];
  rootEl.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const title = document.createElement('h3'); title.textContent = 'Promedios por capítulo';
  card.appendChild(title);
  const info = document.createElement('div'); info.className='small'; info.textContent='Promedio de valores por capítulo (código de pregunta) agrupado por predio.';
  card.appendChild(info);

  const data = await calcularPromediosCapitulos();
  if(!data.length){
    const empty = document.createElement('div'); empty.className='small'; empty.textContent='No hay respuestas suficientes para calcular promedios.';
    card.appendChild(empty);
    rootEl.appendChild(card);
    return data;
  }

  const grid = document.createElement('div');
  grid.className = 'chapter-indicators';

  data.forEach(predio => {
    const item = document.createElement('div'); item.className = 'chapter-item';
    const header = document.createElement('div'); header.className='chapter-header';
    header.innerHTML = `<strong>${predio.nombre}</strong> <span class="chapter-global" style="background:${colorSemaforo(predio.promedioGlobal)}">${predio.promedioGlobal.toFixed(2)}</span>`;
    item.appendChild(header);
    const capsWrap = document.createElement('div'); capsWrap.className='chapter-cap-list';
    predio.capitulos.forEach(c => {
      const capDiv = document.createElement('div'); capDiv.className='chapter-cap';
      capDiv.innerHTML = `<span class="cap-number">${c.capitulo}</span><span class="cap-prom" style="background:${colorSemaforo(c.promedio)}">${c.promedio.toFixed(2)}</span>`;
      capsWrap.appendChild(capDiv);
    });
    item.appendChild(capsWrap);
    grid.appendChild(item);
  });

  card.appendChild(grid);
  // Explicación concisa: solo capítulos y cláusulas (sin preguntas)
  const explainer = document.createElement('div');
  explainer.className = 'chapter-explainer';
  explainer.innerHTML = `
    <h4>Capítulos y cláusulas</h4>
    <ul class="chapter-clauses">
      <li><strong>1. Contexto de la organización</strong> — Cláusula 4</li>
      <li><strong>2. Liderazgo</strong> — Cláusula 5</li>
      <li><strong>3. Planificación</strong> — Cláusula 6</li>
      <li><strong>4. Apoyo</strong> — Cláusula 7</li>
      <li><strong>5. Operación</strong> — Cláusula 8</li>
      <li><strong>6. Evaluación del desempeño</strong> — Cláusula 9</li>
      <li><strong>7. Mejora</strong> — Cláusula 10</li>
    </ul>
  `;
  card.appendChild(explainer);
  rootEl.appendChild(card);
  return data;
}

// -----------------------------------------------------
// Histograma global de respuestas (valores 1..5)
// -----------------------------------------------------
/**
 * Obtiene la distribución (conteo) de respuestas por valor (1 a 5).
 * Intenta realizar un único query con agrupación en la base.
 * Si la agrupación no está soportada (version de PostgREST/Supabase),
 * hace fallback a leer sólo la columna `valor` y contar en memoria.
 * Devuelve siempre un objeto con claves '1'..'5'.
 */
export async function getHistogramaRespuestas(){
  const histogram = { '1':0, '2':0, '3':0, '4':0, '5':0 };
  try {
    // Paso 1: obtener total global (para validar consistencia)
    const { count: totalCount, error: totalErr } = await supabase
      .from('respuestas')
      .select('valor', { count: 'exact', head: true });
    if(totalErr){ console.warn('No se pudo obtener count global respuestas:', totalErr.message || totalErr); }

    // Paso 2: intentar agrupación server-side (si soportado)
    let agrupadoOk = false;
    try {
      const { data: grouped, error: groupErr } = await supabase
        .from('respuestas')
        .select('valor, count:valor', { group: 'valor' });
      if(!groupErr && Array.isArray(grouped) && grouped.length){
        let hasCount = false; for(const g of grouped){ if('count' in g){ hasCount = true; break; } }
        if(hasCount){
          for(const g of grouped){
            const v = String(g.valor);
            if(histogram[v] !== undefined){ histogram[v] = Number(g.count) || 0; }
          }
          agrupadoOk = true;
          const suma = Object.values(histogram).reduce((a,b)=>a+Number(b),0);
          // Validar que la suma coincida con totalCount (si lo obtuvimos)
          if(totalCount != null && suma !== totalCount){
            console.warn('Agrupación inconsistente, se hará conteo preciso por valor. suma=', suma, 'total=', totalCount);
            agrupadoOk = false; // forzar fallback
            // reset
            for(const k of Object.keys(histogram)) histogram[k] = 0;
          }
        }
      }
    }catch(ge){ console.warn('Error intentando agrupación:', ge.message || ge); }

    // Paso 3: si agrupación falló o inconsistente, realizar conteo exacto por valor usando head count
    if(!agrupadoOk){
      for(let v=1; v<=5; v++){
        try {
          const { count, error: cErr } = await supabase
            .from('respuestas')
            .select('valor', { count: 'exact', head: true })
            .eq('valor', v);
          if(cErr){ console.warn('Error count valor', v, cErr.message || cErr); continue; }
          histogram[String(v)] = Number(count || 0);
        }catch(cvErr){ console.warn('Excepción contando valor', v, cvErr); }
      }
    }

    // Paso 4: Último recurso si todavía hay ceros y no se obtuvo total: paginar valores
    const sumaFinal = Object.values(histogram).reduce((a,b)=>a+Number(b),0);
    if(totalCount != null && sumaFinal !== totalCount){
      console.warn('Conteo por head no sumó total esperado, se intentará paginación para recomputar.');
      for(const k of Object.keys(histogram)) histogram[k] = 0; // reset
      const pageSize = 1000; let from = 0; let done = false;
      while(!done){
        const to = from + pageSize - 1;
        const { data: pageData, error: pageErr } = await supabase
          .from('respuestas')
          .select('valor')
          .range(from, to);
        if(pageErr){ console.warn('Error paginando respuestas:', pageErr.message || pageErr); break; }
        if(!pageData || pageData.length === 0){ break; }
        for(const r of pageData){ const key = String(r.valor); if(histogram[key] !== undefined) histogram[key]++; }
        if(pageData.length < pageSize){ done = true; } else { from += pageSize; }
      }
    }

    return histogram;
  }catch(e){
    console.error('getHistogramaRespuestas error fatal:', e);
    return histogram; // estructura base
  }
}

/**
 * Renderiza una tarjeta simple mostrando barras horizontales para la distribución
 * de respuestas (1..5). Puede integrarse en el dashboard.
 */
export async function renderHistogramaRespuestas(root = '#app-histograma'){
  const rootEl = (typeof root === 'string') ? document.querySelector(root) : root;
  if(!rootEl) return;
  rootEl.innerHTML = '';
  const card = document.createElement('div'); card.className='card';
  const title = document.createElement('h3'); title.textContent = 'Distribución de respuestas (1–5)'; card.appendChild(title);
  const info = document.createElement('div'); info.className='small'; info.textContent='Conteo total de calificaciones registradas.'; card.appendChild(info);

  const histo = await getHistogramaRespuestas();
  const total = Object.values(histo).reduce((a,b)=>a+Number(b),0);
  const wrap = document.createElement('div'); wrap.style.display='flex'; wrap.style.flexDirection='column'; wrap.style.gap='6px'; wrap.style.marginTop='10px';

  // Escala: ancho proporcional al mayor conteo
  const maxVal = Math.max(1, ...Object.values(histo));
  for(let v=1; v<=5; v++){
    const count = histo[String(v)] || 0;
    const row = document.createElement('div'); row.style.display='flex'; row.style.alignItems='center'; row.style.gap='10px';
    const label = document.createElement('div'); label.style.width='34px'; label.style.fontWeight='600'; label.style.textAlign='right'; label.textContent = v+':' ;
    const barOuter = document.createElement('div'); barOuter.style.flex='1'; barOuter.style.height='16px'; barOuter.style.background='rgba(0,0,0,0.08)'; barOuter.style.borderRadius='10px'; barOuter.style.overflow='hidden';
    const barFill = document.createElement('div'); barFill.style.height='100%'; barFill.style.width = ((count/maxVal)*100)+'%'; barFill.style.background='var(--primary-green)'; barFill.style.transition='width 600ms ease';
    barOuter.appendChild(barFill);
    const value = document.createElement('div'); value.style.width='70px'; value.style.textAlign='left'; value.style.fontSize='0.85rem'; value.textContent = `${count} resp.`; value.setAttribute('aria-label', `Valor ${v} tiene ${count} respuestas`);
    row.appendChild(label); row.appendChild(barOuter); row.appendChild(value);
    wrap.appendChild(row);
  }
  const footer = document.createElement('div'); footer.className='small'; footer.style.marginTop='6px'; footer.textContent = `Total de respuestas: ${total}`;
  card.appendChild(wrap); card.appendChild(footer);
  rootEl.appendChild(card);
}