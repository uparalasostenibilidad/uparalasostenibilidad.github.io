// script/script.js
// Este módulo contiene:
// 1) Un arreglo JSON editable con los metadatos de cada pregunta (guía para tooltip)
// 2) Una función para adjuntar iconos de ayuda y tooltips a las preguntas renderizadas

// ============================
// 1) Arreglo JSON de preguntas (editable)
// ============================
// Para agregar más preguntas, copia uno de los objetos de ejemplo y
// cambia 'codigo', 'pregunta' y los textos. Basta con que coincida el 'codigo'
// con el que viene de public.preguntas.
export const preguntasData = [
{
  codigo: "1.1",
  pregunta: "¿Se han identificado el contexto interno y externo que afecta la gestión ambiental del predio (factores sociales, legales, tecnológicos, educativos, ambientales, etc.)?",
  
  queImplica: 
    "El contexto permite comprender las condiciones internas y externas que influyen en la gestión del predio. " +
    "Incluye aspectos sociales, ambientales, legales, económicos, tecnológicos y educativos que pueden afectar su desempeño o cumplimiento de objetivos. " +
    "Este análisis ayuda a anticipar riesgos, aprovechar oportunidades y orientar la planificación de las actividades.",
  
  comoCumplir:
    "• Identificar los factores internos (infraestructura, recursos, cultura organizacional, procesos). " +
    "• Identificar los factores externos (legislación, comunidad, entorno ambiental, tecnología, expectativas sociales). " +
    "• Analizar cómo estos factores pueden afectar el desempeño o el cumplimiento de requisitos. " +
    "• Revisar y actualizar el análisis cuando haya cambios importantes en el contexto (nuevas leyes, modificaciones en las actividades o en el entorno).",
  
  evidencias:
    "• Documento o matriz de análisis del contexto. " +
    "• Actas de reuniones o talleres donde se haya discutido el contexto. " +
    "• Informes de diagnóstico ambiental o institucional. " +
    "• Planes estratégicos o de desarrollo del predio. " +
    "• Análisis DOFA o similar (debilidades, oportunidades, fortalezas y amenazas).",
  
  criterios: {
    "1": "1: No se ha realizado ningún análisis del contexto.",
    "2": "2: Se tiene conocimiento general de los factores, pero no están documentados.",
    "3": "3: Existe un análisis parcial o desactualizado.",
    "4": "4: El contexto está identificado, documentado y actualizado.",
    "5": "5: El contexto se revisa periódicamente y se usa para la toma de decisiones y la planificación del predio."
  }
},
  {
  codigo: "1.2",
  pregunta: "¿Se han identificado las partes interesadas relevantes para la gestión ambiental (estudiantes, docentes, comunidad, autoridades, proveedores, etc.) y se han determinado sus necesidades y expectativas?",

  queImplica:
    "Las partes interesadas son todas aquellas personas, grupos o entidades que pueden influir o verse afectadas por las actividades del predio. " +
    "Conocer quiénes son y qué esperan permite planificar mejor las acciones, cumplir requisitos legales y fortalecer la relación con la comunidad. " +
    "Este análisis ayuda a que la gestión sea más efectiva y responda a las necesidades reales del entorno.",

  comoCumplir:
    "• Elaborar una lista o matriz con las partes interesadas relevantes del predio. " +
    "• Determinar las necesidades, expectativas o requisitos de cada parte (por ejemplo: cumplimiento de normas, información, seguridad, calidad del servicio, participación). " +
    "• Definir acciones o mecanismos para atender esas necesidades (comunicaciones, programas, controles o acuerdos). " +
    "• Revisar y actualizar la información periódicamente, especialmente si cambian las actividades o el entorno del predio).",

  evidencias:
    "• Matriz de partes interesadas y sus necesidades o expectativas. " +
    "• Registros de reuniones o comunicaciones con partes interesadas. " +
    "• Programas o estrategias de participación y comunicación. " +
    "• Encuestas de satisfacción o informes de gestión social. " +
    "• Actas de comités, visitas o actividades conjuntas.",

  criterios: {
    "1": "1: No se han identificado las partes interesadas ni sus necesidades.",
    "2": "2: Se conocen algunas partes interesadas, pero sin registro formal.",
    "3": "3: Existe una lista parcial o desactualizada de partes interesadas.",
    "4": "4: Las partes interesadas están identificadas, con necesidades documentadas y acciones definidas.",
    "5": "5: La información está actualizada, se revisa regularmente y se usa en la planificación y mejora del predio."
  }
},
{
  codigo: "1.3",
  pregunta: "¿Está claramente definido el alcance del sistema integrado de gestión ambiental (por ejemplo: procesos, áreas, sedes o unidades incluidas, y exclusiones justificadas)?",

  queImplica:
    "El alcance define qué actividades, procesos, áreas o servicios están cubiertos por el sistema integrado de gestión. " +
    "Debe describir con precisión qué incluye y qué se excluye, explicando las razones, y reflejar la realidad operativa del predio. " +
    "Un alcance bien definido permite delimitar responsabilidades, facilitar la planificación y asegurar que todas las actividades relevantes estén bajo control.",

  comoCumplir:
    "• Documentar los límites del sistema y las actividades cubiertas. " +
    "• Indicar qué procesos o sedes forman parte del sistema y cuáles no, con su justificación. " +
    "• Verificar que el alcance corresponda a las funciones reales del predio. " +
    "• Revisarlo y actualizarlo cuando haya cambios en la estructura, los servicios o las operaciones. " +
    "• Comunicarlo a todo el personal y a las partes interesadas cuando sea necesario.",

  evidencias:
    "• Documento o declaración de alcance del sistema integrado. " +
    "• Mapa de procesos. " +
    "• Organigrama institucional. " +
    "• Manual o política del sistema. " +
    "• Actas de revisión o aprobación del alcance.",

  criterios: {
    "1": "1: No se ha definido el alcance.",
    "2": "2: Se tiene una idea general sin documento formal.",
    "3": "3: Existe un alcance parcial o sin justificación de exclusiones.",
    "4": "4: Alcance documentado, aprobado y coherente con las operaciones del predio.",
    "5": "5: Alcance actualizado, validado y comunicado a todo el personal."
  }
},
{
  codigo: "1.4",
  pregunta: "¿Existe un sistema integrado de gestión ambiental implementado, documentado y en funcionamiento en el predio?",

  queImplica:
    "El sistema integrado de gestión debe estar establecido de manera formal y operando en la práctica. " +
    "Esto significa que las actividades, procesos y responsabilidades del predio se desarrollan conforme a procedimientos definidos " +
    "y que existe evidencia del cumplimiento de los requisitos ambientales. " +
    "No basta con tener documentos; el sistema debe estar aplicado, controlado y en mejora continua.",

  comoCumplir:
    "• Definir la estructura del sistema, sus responsables y las interacciones entre los procesos. " +
    "• Mantener la documentación actualizada (manuales, procedimientos, registros). " +
    "• Asegurar que los procedimientos se apliquen en las actividades diarias. " +
    "• Realizar auditorías o revisiones internas para verificar su cumplimiento. " +
    "• Promover la participación del personal y comunicar los resultados del sistema a todos los niveles.",

  evidencias:
    "• Manual o estructura documental del sistema integrado. " +
    "• Procedimientos y registros operativos. " +
    "• Informes de auditoría interna o revisión por la dirección. " +
    "• Actas de comités o reuniones de seguimiento. " +
    "• Registros de capacitación o comunicación institucional sobre el sistema.",

  criterios: {
    "1": "1: No existe sistema documentado ni evidencia de aplicación.",
    "2": "2: Existen documentos aislados sin aplicación sistemática.",
    "3": "3: El sistema está parcialmente implementado o no se aplica en todas las áreas.",
    "4": "4: El sistema está documentado, aplicado y con seguimiento regular.",
    "5": "5: El sistema funciona de forma completa, con mejora continua y comunicación en todos los niveles."
  }
},
{
  codigo: "2.1",
  pregunta: "¿La dirección del predio demuestra liderazgo y compromiso con la gestión ambiental, asegurando la integración del sistema en las actividades institucionales?",

  queImplica:
    "La dirección del predio debe liderar con el ejemplo, impulsar la aplicación del sistema y garantizar que la gestión ambiental esté integrada en todas las actividades. " +
    "Su compromiso se refleja en la asignación de recursos, la participación activa en la planificación, el seguimiento de los resultados y la comunicación de la importancia del cumplimiento de las políticas y objetivos. " +
    "Un liderazgo visible fortalece la cultura institucional y el sentido de responsabilidad en todo el equipo.",

  comoCumplir:
    "• Participar en reuniones, auditorías o revisiones relacionadas con el sistema. " +
    "• Promover el cumplimiento de políticas, objetivos y compromisos institucionales. " +
    "• Asignar recursos humanos, técnicos y financieros suficientes. " +
    "• Reconocer las buenas prácticas del personal y fomentar la mejora continua. " +
    "• Mantener comunicación constante sobre la importancia de la gestión ambiental en las decisiones del predio.",

  evidencias:
    "• Actas de reuniones o comités donde participe la dirección. " +
    "• Comunicaciones o mensajes institucionales de apoyo al sistema. " +
    "• Informes de gestión o revisión por la dirección. " +
    "• Registros de asignación de recursos o aprobaciones de proyectos. " +
    "• Evidencias de participación en campañas, inspecciones o auditorías.",

  criterios: {
    "1": "1: No hay evidencia de liderazgo o participación de la dirección.",
    "2": "2: La dirección conoce el sistema, pero su participación es limitada.",
    "3": "3: La dirección participa parcialmente o solo ante situaciones puntuales.",
    "4": "4: La dirección demuestra compromiso constante y apoyo al sistema.",
    "5": "5: La dirección lidera activamente, comunica los avances y promueve la mejora continua."
  }
}



];

// ============================
// 2) Función para adjuntar tooltips
// ============================
// Uso: applyQuestionTooltips(questionsContainerEl, preguntasData)
// - Busca tarjetas de pregunta (.question-card) dentro del contenedor
// - Inserta un icono ❓ junto al encabezado y muestra un tooltip al pasar el mouse
export function applyQuestionTooltips(container, dataArray = preguntasData) {
  if (!container) return;

  // Reutilizamos un único tooltip flotante para toda la página
  let tooltip = document.querySelector('.tooltip-card.__shared');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip-card __shared';
    document.body.appendChild(tooltip);
  }

  let hideTimer = null;

  // Genera HTML del contenido del tooltip usando títulos y bloques
  const buildTooltipHTML = (item) => {
    const seg = (title, text) => text ? `<div class="tooltip-section"><b>${title}</b><div>${escapeHtml(text)}</div></div>` : '';
    const segList = (title, textOrObj) => {
      if (!textOrObj) return '';
      // Si viene como objeto (p.ej. {1:"...",2:"..."}) lo renderizamos ordenado
      if (typeof textOrObj === 'object' && !Array.isArray(textOrObj)){
        const entries = Object.entries(textOrObj).sort(([a],[b])=> String(a).localeCompare(String(b)));
        const lis = entries.map(([,v]) => `<li>${escapeHtml(v)}</li>`).join('');
        return `<div class="tooltip-section"><b>${title}</b><ul>${lis}</ul></div>`;
      }
      // Si es string, intentar dividir por saltos de línea, punto y coma o viñetas
      const parts = String(textOrObj).split(/\r?\n|;|•/).map(s=>s.trim()).filter(Boolean);
      if (parts.length >= 2){
        return `<div class="tooltip-section"><b>${title}</b><ul>${parts.map(p=>`<li>${escapeHtml(p)}</li>`).join('')}</ul></div>`;
      }
      return seg(title, String(textOrObj));
    };
    // Sección de sugerencias en dos columnas cuando hay varias sedes
    const sugHTML = item?.sugerencias
      ? `<div class="tooltip-section"><b>Sugerencias</b><div class="tooltip-grid">${Object.entries(item.sugerencias)
          .map(([k,v])=> `<div><b>${escapeHtml(k)}:</b> <span>${escapeHtml(v)}</span></div>`)
          .join('')}</div></div>`
      : '';
    return `
      ${seg('Qué implica', item.queImplica)}
      ${seg('Cómo cumplir', item.comoCumplir)}
      ${seg('Evidencias', item.evidencias)}
      ${segList('Criterios', item.criterios)}
      ${sugHTML}
    `;
  };

  // Mantener tooltip visible si el mouse entra al tooltip
  tooltip.addEventListener('mouseenter', () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } });
  tooltip.addEventListener('mouseleave', () => queueHide());

  function queueHide() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      tooltip.classList.remove('visible');
    }, 220);
  }

  // Posicionar el tooltip cerca del icono o al lado derecho de la tarjeta
  function showTooltipAt(html, anchorRect, cardRect){
    tooltip.innerHTML = html;
    const offset = 12;
    let left = anchorRect.right + offset;
    let top = anchorRect.top;

    // Si no cabe a la derecha, intentar a la izquierda
    const rectTemp = tooltip.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    if (left + rectTemp.width > vw - 10) {
      left = Math.max(10, anchorRect.left - rectTemp.width - offset);
    }
    // Si no cabe arriba/abajo, alinear con la tarjeta
    if (top + rectTemp.height > vh - 10 && cardRect){
      top = Math.max(10, cardRect.bottom - rectTemp.height);
    }
    // Correcciones para que quede en pantalla
    if (top < 10) top = 10;
    if (left < 10) left = 10;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    void tooltip.offsetHeight; // reflow
    tooltip.classList.add('visible');
  }

  function attachToCard(cardEl) {
    // Buscar código de la pregunta (preferido) y texto de pregunta
    const codigo = cardEl.dataset.codigo?.trim();
    const preguntaTxt = cardEl.dataset.pregunta?.trim();

    // Intentar encontrar match por código y luego por inicio de texto
    const match = dataArray.find(x => x.codigo === codigo)
      || dataArray.find(x => !!preguntaTxt && (x.pregunta && preguntaTxt.startsWith(x.pregunta.slice(0, 18))));
    if (!match) return; // si no hay data asociada, no agregar icono

    // Insertar icono de ayuda ❓ si no existe
    let icon = cardEl.querySelector('.help-icon');
    if (!icon) {
      // Lo ubicamos junto al primer <strong> o al encabezado
      const head = cardEl.querySelector('strong') || cardEl.firstElementChild;
      icon = document.createElement('span');
      icon.className = 'help-icon';
      icon.setAttribute('title', 'Ayuda');
      icon.textContent = '❓';
      if (head && head.parentNode) head.parentNode.insertBefore(icon, head.nextSibling);
      else cardEl.insertBefore(icon, cardEl.firstChild);
    }

    // Eventos de hover para mostrar/ocultar el tooltip
    icon.addEventListener('mouseenter', () => {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      const a = icon.getBoundingClientRect();
      const c = cardEl.getBoundingClientRect();
      showTooltipAt(buildTooltipHTML(match), a, c);
    });
    icon.addEventListener('mouseleave', () => queueHide());
  }

  // Adjuntar a cada tarjeta de pregunta encontrada
  container.querySelectorAll('.question-card').forEach(attachToCard);
}

// Utilidad simple para evitar inyección en HTML del tooltip
function escapeHtml(str){
  if (str == null) return '';
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'", '&#39;');
}
