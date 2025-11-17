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
},
{
  codigo: "2.2",
  pregunta: "¿Existe una política integrada de gestión ambiental aprobada, actualizada, comunicada y disponible para todas las partes interesadas?",

  queImplica:
    "La política integrada expresa los compromisos del predio con la protección del ambiente, la calidad de sus servicios, el cumplimiento de los requisitos legales y la mejora continua. " +
    "Debe estar aprobada por la dirección, mantenerse actualizada y ser conocida por todo el personal y las partes interesadas. " +
    "Esta política sirve como guía para las decisiones, objetivos y acciones dentro del sistema de gestión.",

  comoCumplir:
    "• Elaborar la política de forma clara, sencilla y coherente con las actividades del predio. " +
    "• Aprobarla formalmente por la dirección y difundirla mediante medios accesibles (carteleras, correos, reuniones, capacitaciones o página web). " +
    "• Revisarla periódicamente para verificar que sigue siendo adecuada y actual. " +
    "• Asegurar que todos los trabajadores comprendan su contenido y cómo aplicarla en su labor diaria.",

  evidencias:
    "• Documento de la política firmada y aprobada. " +
    "• Publicación en carteleras, sitio web o material institucional. " +
    "• Registros de capacitación o socialización de la política. " +
    "• Comunicaciones oficiales o correos informativos. " +
    "• Actas de revisión o actualización de la política.",

  criterios: {
    "1": "1: No existe política formal ni documento aprobado.",
    "2": "2: Existe un borrador o documento antiguo sin aprobación ni difusión.",
    "3": "3: La política está aprobada, pero no se comunica o no está actualizada.",
    "4": "4: La política está vigente, aprobada y comunicada al personal del predio.",
    "5": "5: La política está actualizada, publicada, comprendida y aplicada por todo el personal y las partes interesadas."
  }
},
{
  codigo: "2.3",
  pregunta: "¿Están definidos, documentados y comunicados los roles, responsabilidades y autoridades del personal del predio (administradores, docentes, operarios) dentro del sistema integrado de gestión ambiental?",

  queImplica:
    "La definición clara de roles y responsabilidades garantiza que cada persona conozca sus funciones dentro del sistema integrado. " +
    "Esto evita confusiones, facilita la ejecución de las tareas y asegura que las actividades relacionadas con la gestión ambiental se realicen correctamente. " +
    "Además, la autoridad asignada debe ser coherente con las responsabilidades y con el nivel de decisión que cada cargo requiere.",

  comoCumplir:
    "• Definir las funciones y responsabilidades en documentos formales (manuales, descripciones de cargo o procedimientos). " +
    "• Comunicar y capacitar al personal sobre su papel dentro del sistema. " +
    "• Verificar que las autoridades asignadas sean adecuadas para cumplir las tareas. " +
    "• Actualizar las funciones cuando cambien las estructuras o procesos del predio. " +
    "• Asegurar que todas las áreas estén representadas en el sistema.",

  evidencias:
    "• Manual de funciones o perfiles de cargo. " +
    "• Organigrama institucional o del sistema integrado. " +
    "• Actas o comunicaciones donde se asignen responsabilidades. " +
    "• Procedimientos que indiquen responsables por actividad. " +
    "• Registros de capacitaciones o reuniones informativas.",

  criterios: {
    "1": "1: No existen roles ni responsabilidades definidos.",
    "2": "2: Las funciones existen de manera informal o sin documentación.",
    "3": "3: Los roles están definidos pero no comunicados o actualizados.",
    "4": "4: Roles, responsabilidades y autoridades están documentados, comunicados y aplicados.",
    "5": "5: Roles claramente definidos, revisados periódicamente y comprendidos por todo el personal."
  }
},
{
  codigo: "3.1.1",
  pregunta: "¿El predio ha identificado los riesgos y oportunidades que pueden afectar la gestión ambiental, la calidad del servicio y el cumplimiento de los objetivos institucionales?",

  queImplica:
    "La identificación de riesgos y oportunidades permite anticipar situaciones que podrían impactar negativa o positivamente la gestión ambiental y la calidad de los servicios. " +
    "Este análisis ayuda a planificar acciones preventivas, mejorar la eficiencia y fortalecer el cumplimiento de los objetivos institucionales. " +
    "Debe contemplar factores internos (operativos, administrativos, de recursos) y externos (sociales, legales, ambientales, tecnológicos).",

  comoCumplir:
    "• Realizar una evaluación sistemática de riesgos y oportunidades utilizando métodos adecuados (matrices, listas de verificación o análisis FODA). " +
    "• Involucrar a las diferentes áreas del predio en la identificación de situaciones que afecten sus procesos. " +
    "• Definir responsables para el seguimiento de las acciones preventivas y de mejora. " +
    "• Revisar periódicamente los resultados para actualizar la información y ajustar las medidas según los cambios del entorno o la operación.",

  evidencias:
    "• Matriz de riesgos y oportunidades del sistema integrado. " +
    "• Registros de reuniones o talleres de análisis. " +
    "• Informes de revisión por la dirección. " +
    "• Planes de acción o controles implementados. " +
    "• Evidencias del seguimiento de riesgos (indicadores, auditorías o reportes).",

  criterios: {
    "1": "1: No se han identificado riesgos ni oportunidades.",
    "2": "2: Se han identificado parcialmente sin metodología ni seguimiento.",
    "3": "3: Existen registros básicos, pero no se actualizan ni se vinculan con los objetivos.",
    "4": "4: Riesgos y oportunidades están documentados, evaluados y con planes de acción definidos.",
    "5": "5: El análisis se revisa, actualiza y se utiliza activamente para la toma de decisiones y mejora continua."
  }
},
{
  codigo: "3.1.2",
  pregunta: "¿Se han identificado, evaluado y actualizado los aspectos ambientales y los procesos o actividades que impactan el desempeño ambiental o la calidad de los servicios del predio?",

  queImplica:
    "La identificación de aspectos ambientales y de los procesos que influyen en la calidad permite reconocer cómo las actividades del predio afectan su desempeño ambiental y los resultados de sus servicios. " +
    "Este análisis es clave para controlar impactos negativos, aprovechar oportunidades de mejora y cumplir con los objetivos del sistema. " +
    "Debe actualizarse cuando cambian las operaciones, equipos o condiciones del entorno.",

  comoCumplir:
    "• Elaborar un inventario de aspectos ambientales asociados a las actividades del predio (uso de recursos, generación de residuos, emisiones, consumo de energía, etc.). " +
    "• Evaluar su significancia considerando criterios como frecuencia, severidad, magnitud y capacidad de control. " +
    "• Identificar también los procesos que influyen directamente en la calidad de los servicios ofrecidos. " +
    "• Mantener la información actualizada y revisar los resultados periódicamente.",

  evidencias:
    "• Matriz de aspectos e impactos ambientales actualizada. " +
    "• Registro de procesos críticos relacionados con la calidad. " +
    "• Procedimientos o instructivos de evaluación. " +
    "• Informes de revisión o seguimiento. " +
    "• Actas de reuniones donde se aprueban actualizaciones o cambios.",

  criterios: {
    "1": "1: No se han identificado aspectos ni procesos significativos.",
    "2": "2: Identificación parcial o sin criterios claros de evaluación.",
    "3": "3: Aspectos y procesos identificados, pero sin actualización ni seguimiento.",
    "4": "4: Evaluación completa y actualizada, con criterios documentados y responsables definidos.",
    "5": "5: Sistema consolidado y revisado regularmente, con evidencias de control, mejora y comunicación al personal."
  }
},
{
  codigo: "3.1.3",
  pregunta: "¿Se han determinado, actualizado y comunicado los requisitos legales, normativos y otros requisitos aplicables a la gestión ambiental?",

  queImplica:
    "El cumplimiento de los requisitos legales y normativos es esencial para garantizar que las actividades del predio se desarrollen dentro del marco regulatorio vigente. " +
    "Este proceso implica identificar, evaluar, actualizar y comunicar todas las leyes, decretos, normas técnicas y compromisos voluntarios que afecten la gestión ambiental y la calidad de los servicios.",

  comoCumplir:
    "• Establecer un procedimiento para la identificación y actualización de los requisitos legales y otros compromisos aplicables. " +
    "• Asignar responsables para el seguimiento de cambios normativos y mantener un registro actualizado. " +
    "• Verificar el cumplimiento mediante auditorías internas o revisiones periódicas. " +
    "• Asegurar que las áreas involucradas conozcan las obligaciones que les corresponden.",

  evidencias:
    "• Matriz de requisitos legales y normativos vigente. " +
    "• Registros de actualización normativa. " +
    "• Actas o comunicaciones de socialización de cambios legales. " +
    "• Informes de evaluación del cumplimiento. " +
    "• Procedimiento documentado de identificación y seguimiento legal.",

  criterios: {
    "1": "1: No se han identificado requisitos legales o normativos aplicables.",
    "2": "2: Existen referencias parciales o sin actualización.",
    "3": "3: Se tiene una matriz o registro, pero sin evidencia de comunicación ni seguimiento.",
    "4": "4: Los requisitos están identificados, actualizados y comunicados a las áreas pertinentes.",
    "5": "5: Sistema formal de gestión legal implementado, con revisión periódica y evidencia de cumplimiento continuo."
  }
},
{
  codigo: "3.1.4",
  pregunta: "¿Se han definido e implementado acciones para abordar los riesgos, oportunidades y aspectos significativos identificados en el sistema integrado de gestión ambiental?",

  queImplica:
    "Una vez identificados los riesgos, oportunidades y aspectos significativos, el predio debe planificar e implementar acciones que permitan prevenir efectos negativos, aprovechar oportunidades de mejora y fortalecer la gestión ambiental. " +
    "Estas acciones deben integrarse en los procesos operativos, ser coherentes con los objetivos institucionales y evaluarse en términos de eficacia.",

  comoCumplir:
    "• Establecer planes de acción específicos con responsables, recursos y plazos definidos, priorizando según nivel de riesgo o significancia. " +
    "• Incluir medidas preventivas, correctivas y de mejora continua. " +
    "• Hacer seguimiento a la ejecución y evaluar los resultados para asegurar que las acciones sean eficaces y sostenibles. " +
    "• Comunicar los avances a las partes involucradas.",

  evidencias:
    "• Planes de acción documentados y aprobados. " +
    "• Registros de seguimiento o evaluación de las acciones. " +
    "• Informes de revisión por la dirección. " +
    "• Evidencias de implementación (fotografías, actas, reportes). " +
    "• Indicadores de cumplimiento o mejora.",

  criterios: {
    "1": "1: No se han definido acciones para abordar riesgos u oportunidades.",
    "2": "2: Existen acciones identificadas, pero sin planificación ni seguimiento.",
    "3": "3: Hay planes definidos, pero sin evidencia clara de implementación o resultados.",
    "4": "4: Las acciones están implementadas, documentadas y con seguimiento parcial.",
    "5": "5: Las acciones están completamente integradas, evaluadas y evidencian mejoras sostenibles."
  }
},
{
  codigo: "3.2.1",
  pregunta: "¿Existen objetivos de gestión ambiental documentados, medibles y coherentes con la política institucional?",

  queImplica:
    "Los objetivos permiten orientar los esfuerzos del predio hacia la mejora del desempeño ambiental y de la calidad de los servicios. " +
    "Deben ser claros, medibles, alcanzables, relevantes y coherentes con la política institucional. " +
    "Su formulación y seguimiento garantizan que el sistema de gestión se traduzca en resultados concretos y verificables.",

  comoCumplir:
    "• Definir objetivos específicos para las áreas más relevantes del predio (por ejemplo: reducción de consumo de agua, mejora en la satisfacción de usuarios, control de residuos). " +
    "• Establecer indicadores que permitan medir el avance. " +
    "• Asegurar que los objetivos estén documentados, aprobados por la dirección y comunicados a todo el personal. " +
    "• Revisarlos periódicamente y actualizarlos según los resultados o cambios en las condiciones operativas.",

  evidencias:
    "• Listado o matriz de objetivos ambientales. " +
    "• Indicadores de seguimiento y resultados. " +
    "• Actas de aprobación por la dirección. " +
    "• Informes de cumplimiento. " +
    "• Evidencias de comunicación o difusión de los objetivos.",

  criterios: {
    "1": "1: No existen objetivos definidos.",
    "2": "2: Existen objetivos generales, pero no son medibles ni documentados.",
    "3": "3: Objetivos definidos, pero sin indicadores o sin seguimiento formal.",
    "4": "4: Objetivos documentados, medibles y con evidencia de seguimiento.",
    "5": "5: Objetivos revisados periódicamente, alcanzados o ajustados según resultados, alineados con la política institucional."
  }
},
{
  codigo: "3.2.2",
  pregunta: "¿Se han establecido y ejecutado planes de acción con responsables, recursos y plazos para cumplir los objetivos de gestión ambiental?",

  queImplica:
    "Los planes de acción son la herramienta que convierte los objetivos en actividades concretas y medibles. " +
    "Permiten organizar los recursos, asignar responsabilidades y definir plazos para alcanzar los resultados esperados en la gestión ambiental. " +
    "Su correcta ejecución garantiza que los compromisos institucionales se traduzcan en mejoras reales dentro del predio.",

  comoCumplir:
    "• Elaborar planes de acción para cada objetivo definido, incluyendo actividades específicas, responsables, cronogramas, recursos requeridos y métodos de evaluación. " +
    "• Hacer seguimiento al cumplimiento de cada acción y actualizar los planes según los resultados obtenidos o las condiciones operativas. " +
    "• Asegurar la participación del personal responsable y la comunicación de los avances a la dirección.",

  evidencias:
    "• Planes de acción documentados y aprobados. " +
    "• Registros de seguimiento o cumplimiento. " +
    "• Informes de avance y resultados. " +
    "• Actas de reuniones de seguimiento. " +
    "• Indicadores asociados a los objetivos. " +
    "• Evidencia de uso de recursos y asignación de responsables.",

  criterios: {
    "1": "1: No existen planes de acción definidos.",
    "2": "2: Planes elaborados parcialmente o sin responsables claros.",
    "3": "3: Planes definidos, pero sin evidencia de ejecución o seguimiento.",
    "4": "4: Planes ejecutados con registros de cumplimiento y revisión.",
    "5": "5: Planes actualizados, ejecutados en su totalidad y evaluados por la dirección, con resultados documentados y mejoras demostrables."
  }
},
{
  codigo: "4.1",
  pregunta: "¿El predio cuenta con los recursos humanos, técnicos, financieros e infraestructura necesarios para la gestión ambiental?",

  queImplica:
    "Disponer de los recursos adecuados es fundamental para garantizar el funcionamiento efectivo del sistema de gestión ambiental. " +
    "Esto incluye contar con personal suficiente y competente, infraestructura en buenas condiciones, equipos funcionales y recursos financieros que permitan ejecutar las actividades planificadas y cumplir los objetivos establecidos.",

  comoCumplir:
    "• Identificar las necesidades de recursos según los procesos del predio y planificarlas dentro del presupuesto institucional. " +
    "• Asegurar que los equipos, herramientas e instalaciones estén disponibles, mantenidos y en condiciones óptimas. " +
    "• Asignar personal suficiente y capacitado para ejecutar las tareas del sistema. " +
    "• Revisar periódicamente la disponibilidad de recursos y gestionar ajustes cuando sea necesario.",

  evidencias:
    "• Plan de recursos o presupuesto anual. " +
    "• Registros de mantenimiento y calibración de equipos. " +
    "• Inventarios de infraestructura y herramientas. " +
    "• Actas de asignación de recursos. " +
    "• Informes de revisión por la dirección. " +
    "• Evidencias fotográficas o documentales de adecuaciones y mejoras.",

  criterios: {
    "1": "1: No existen recursos identificados ni disponibles.",
    "2": "2: Se dispone de algunos recursos, pero son insuficientes o inadecuados.",
    "3": "3: Recursos definidos, pero con limitaciones de disponibilidad o mantenimiento.",
    "4": "4: Recursos suficientes, asignados y utilizados de forma adecuada.",
    "5": "5: Recursos plenamente disponibles, gestionados eficientemente y revisados periódicamente para garantizar la mejora continua."
  }
},
{
  codigo: "4.2",
  pregunta: "¿El personal cuenta con las competencias, conocimientos y capacitaciones necesarias para realizar sus funciones relacionadas con la gestión ambiental?",

  queImplica:
    "La competencia del personal es un elemento clave para asegurar la correcta implementación y mantenimiento del sistema de gestión ambiental. " +
    "Implica que cada persona conozca sus funciones, cuente con la formación adecuada y posea las habilidades necesarias para cumplir con los requisitos del sistema y los objetivos institucionales.",

  comoCumplir:
    "• Definir las competencias requeridas para cada cargo o función vinculada al sistema. " +
    "• Evaluar periódicamente el nivel de conocimiento del personal y las necesidades de capacitación. " +
    "• Desarrollar programas de formación y sensibilización sobre temas ambientales, seguridad y mejora continua. " +
    "• Registrar la participación en capacitaciones y verificar la aplicación práctica de lo aprendido en las actividades cotidianas.",

  evidencias:
    "• Matriz de competencias del personal. " +
    "• Registros de asistencia a capacitaciones y evaluaciones. " +
    "• Plan anual de formación. " +
    "• Manual de funciones o perfiles de cargo. " +
    "• Actas de reuniones o talleres. " +
    "• Certificados de cursos o entrenamientos realizados.",

  criterios: {
    "1": "1: No se han definido competencias ni realizado capacitaciones.",
    "2": "2: Competencias identificadas parcialmente o sin registros de formación.",
    "3": "3: Existen capacitaciones puntuales, pero sin evaluación ni seguimiento.",
    "4": "4: Competencias definidas y formación planificada, con evidencia de aplicación.",
    "5": "5: Sistema de formación y evaluación consolidado, actualizado y alineado con los objetivos del sistema."
  }
},
{
  codigo: "4.3",
  pregunta: "¿Se promueve la concientización y sensibilización sobre la gestión ambiental entre estudiantes, docentes y trabajadores?",

  queImplica:
    "La concientización y sensibilización fortalecen la cultura institucional hacia la sostenibilidad, la calidad y la mejora continua. " +
    "Implica que toda la comunidad del predio —no solo el personal responsable del sistema— conozca la importancia de su participación en la gestión ambiental, " +
    "comprendiendo cómo sus acciones contribuyen al cumplimiento de los objetivos institucionales y a la protección del entorno.",

  comoCumplir:
    "• Desarrollar campañas, jornadas y actividades educativas que fomenten la responsabilidad ambiental y la mejora del servicio. " +
    "• Integrar temas de gestión ambiental en las capacitaciones, inducciones y reuniones. " +
    "• Comunicar de manera accesible los logros, buenas prácticas y resultados del sistema. " +
    "• Promover la participación activa de estudiantes, docentes y trabajadores en programas ambientales.",

  evidencias:
    "• Registros de campañas de sensibilización y actividades educativas. " +
    "• Materiales de comunicación (afiches, boletines, videos, correos institucionales). " +
    "• Actas o informes de jornadas ambientales. " +
    "• Encuestas o evidencias de participación. " +
    "• Fotografías y publicaciones en medios institucionales.",

  criterios: {
    "1": "1: No se realizan actividades de sensibilización ni comunicación.",
    "2": "2: Existen iniciativas aisladas sin continuidad ni registro.",
    "3": "3: Se promueven algunas actividades, pero sin planificación ni seguimiento.",
    "4": "4: Se realizan campañas y jornadas periódicas, con participación activa del personal.",
    "5": "5: Existe una cultura consolidada de concientización y participación, con evidencia de mejora y compromiso institucional."
  }
},
{
  codigo: "4.4",
  pregunta: "¿Existe comunicación interna y externa eficaz sobre los temas de gestión ambiental (campañas, informes, circulares, reuniones, reportes)?",

  queImplica:
    "La comunicación eficaz es esencial para garantizar que la información relacionada con la gestión ambiental sea comprendida, compartida y aplicada correctamente. " +
    "Incluye tanto la comunicación interna entre los diferentes niveles y áreas del predio, como la comunicación externa con partes interesadas (autoridades, comunidad, proveedores, entre otros). " +
    "Una buena comunicación fortalece la transparencia, la participación y el compromiso institucional.",

  comoCumplir:
    "• Establecer canales formales de comunicación (correos institucionales, carteleras, reuniones, boletines o plataformas digitales). " +
    "• Definir qué información se comunica, a quién, cuándo y por qué medio. " +
    "• Asegurar que los mensajes sean claros y lleguen a todas las partes interesadas. " +
    "• Promover la retroalimentación y el registro de las comunicaciones más importantes. " +
    "• Publicar informes, campañas o resultados del sistema en medios accesibles y actualizados.",

  evidencias:
    "• Registros de comunicaciones internas (correos, actas, boletines, carteleras). " +
    "• Informes de gestión o reportes de resultados. " +
    "• Publicaciones institucionales o comunicados oficiales. " +
    "• Registros de reuniones o socializaciones. " +
    "• Procedimiento de comunicación documentado.",

  criterios: {
    "1": "1: No existen mecanismos formales de comunicación.",
    "2": "2: La comunicación es esporádica o depende de iniciativas individuales.",
    "3": "3: Existen canales establecidos, pero sin planificación ni registro.",
    "4": "4: Comunicación interna y externa estructurada, con evidencia documental y participación activa.",
    "5": "5: Sistema de comunicación consolidado, con seguimiento, retroalimentación y actualización continua."
  }
},
{
  codigo: "4.5",
  pregunta: "¿Se mantienen actualizados y controlados los documentos y registros del sistema de gestión ambiental (formatos, procedimientos, informes, manuales)?",

  queImplica:
    "El control de documentos y registros garantiza la trazabilidad, coherencia y confiabilidad de la información del sistema de gestión. " +
    "Implica que todos los documentos (manuales, procedimientos, formatos e informes) estén actualizados, aprobados, disponibles en su versión vigente y protegidos contra pérdida o uso no autorizado. " +
    "Los registros, por su parte, deben conservarse de manera organizada para evidenciar el cumplimiento de los requisitos y actividades del sistema.",

  comoCumplir:
    "• Establecer un procedimiento formal para la creación, revisión, aprobación, distribución y control de documentos. " +
    "• Identificar claramente las versiones vigentes y asegurar que los documentos obsoletos se retiren o marquen adecuadamente. " +
    "• Mantener registros accesibles, legibles y protegidos. " +
    "• Revisar periódicamente la documentación para garantizar su vigencia. " +
    "• Implementar herramientas digitales o archivos físicos organizados según las necesidades del predio.",

  evidencias:
    "• Procedimiento de control documental. " +
    "• Listado maestro de documentos y registros. " +
    "• Versiones controladas de manuales, procedimientos y formatos. " +
    "• Evidencia de revisión o actualización. " +
    "• Archivos digitales o físicos organizados. " +
    "• Registros de auditorías o revisiones internas.",

  criterios: {
    "1": "1: No existe control documental ni registros actualizados.",
    "2": "2: Existen algunos documentos, pero sin control de versiones ni trazabilidad.",
    "3": "3: Se cuenta con documentación básica, aunque no se mantiene actualizada o controlada.",
    "4": "4: Documentos y registros actualizados, controlados y disponibles para el personal.",
    "5": "5: Sistema documental consolidado, digitalizado o físico, con control de versiones, respaldo y revisión periódica."
  }
},
{
  codigo: "5.1",
  pregunta: "¿Se controlan las actividades operativas con potencial impacto ambiental o que puedan afectar la calidad del servicio (uso de maquinaria, agroquímicos, gestión de residuos, mantenimiento, etc.)?",

  queImplica:
    "El control operacional busca asegurar que las actividades que puedan generar impactos ambientales o afectar la calidad del servicio se realicen bajo condiciones planificadas y controladas. " +
    "Esto permite prevenir daños, optimizar recursos, mantener la coherencia con los objetivos del sistema y cumplir con los requisitos legales y normativos aplicables.",

  comoCumplir:
    "• Identificar las actividades críticas que requieren control (uso de maquinaria, manejo de residuos, consumo de energía, procesos de mantenimiento o atención al usuario). " +
    "• Establecer procedimientos, instructivos o rutinas operativas que definan cómo deben realizarse. " +
    "• Capacitar al personal involucrado y verificar periódicamente el cumplimiento de los controles. " +
    "• Implementar registros, listas de chequeo o monitoreos que evidencien la ejecución adecuada de las actividades.",

  evidencias:
    "• Procedimientos operativos o instructivos documentados. " +
    "• Registros de mantenimiento, control de residuos y uso de equipos. " +
    "• Listas de chequeo o formularios de verificación. " +
    "• Informes de inspección o monitoreo. " +
    "• Registros fotográficos o reportes de cumplimiento.",

  criterios: {
    "1": "1: No se controlan las actividades operativas con potencial impacto.",
    "2": "2: Existen controles informales o no documentados.",
    "3": "3: Algunos procesos están controlados, pero sin seguimiento ni registros.",
    "4": "4: Actividades operativas controladas mediante procedimientos y evidencias verificables.",
    "5": "5: Controles operativos integrados, revisados periódicamente y con resultados demostrables de mejora."
  }
},
{
  codigo: "5.2",
  pregunta: "¿Existen y se aplican protocolos de respuesta ante emergencias ambientales o de operación (derrames, incendios, escapes de gas, fallas de equipos, interrupciones del servicio, etc.)?",

  queImplica:
    "La preparación y respuesta ante emergencias es fundamental para prevenir daños a las personas, al ambiente y a la infraestructura, así como para garantizar la continuidad de las operaciones. " +
    "El predio debe contar con procedimientos claros, personal capacitado y recursos disponibles para responder de manera eficaz ante situaciones imprevistas que puedan afectar la gestión ambiental o la calidad del servicio.",

  comoCumplir:
    "• Identificar los posibles escenarios de emergencia asociados a las actividades del predio. " +
    "• Elaborar protocolos o planes de emergencia que definan las acciones a seguir, los responsables, los recursos y las rutas de evacuación. " +
    "• Capacitar al personal y realizar simulacros periódicos. " +
    "• Revisar y actualizar los planes según los resultados de los ejercicios, cambios en las operaciones o nuevas condiciones del entorno.",

  evidencias:
    "• Plan o procedimiento de emergencias actualizado. " +
    "• Registros de simulacros o capacitaciones. " +
    "• Listas de asistencia y evaluaciones de desempeño. " +
    "• Reportes de incidentes o acciones correctivas. " +
    "• Señalización, kits de emergencia y equipos de seguridad visibles y operativos.",

  criterios: {
    "1": "1: No existen protocolos ni medidas de respuesta ante emergencias.",
    "2": "2: Existen acciones básicas, pero sin documentación ni capacitación.",
    "3": "3: Protocolos definidos, pero sin simulacros ni evidencia de aplicación.",
    "4": "4: Protocolos documentados y aplicados con capacitación y seguimiento periódico.",
    "5": "5: Sistema de gestión de emergencias consolidado, con revisión continua, simulacros regulares y mejora comprobada."
  }
},
{
  codigo: "6.1",
  pregunta: "¿Se realiza seguimiento, medición y monitoreo de los indicadores ambientales (agua, energía, residuos, emisiones, satisfacción de usuarios, eficiencia de procesos, etc.)?",

  queImplica:
    "El seguimiento y medición de indicadores permite evaluar el desempeño del sistema de gestión ambiental, identificar desviaciones y promover la mejora continua. " +
    "Implica recopilar, analizar y utilizar datos confiables para tomar decisiones informadas sobre el uso de recursos, el cumplimiento de los objetivos y la eficacia de los procesos.",

  comoCumplir:
    "• Definir indicadores claros y medibles que reflejen los aspectos más relevantes del desempeño ambiental. " +
    "• Establecer una frecuencia de medición y asignar responsables para la recopilación y análisis de los datos. " +
    "• Registrar los resultados, compararlos con las metas establecidas y comunicar los avances a la dirección y al personal. " +
    "• Utilizar los resultados para planificar acciones de mejora o corrección.",

  evidencias:
    "• Matriz o tablero de indicadores. " +
    "• Registros de medición (consumo de agua, energía, residuos generados, satisfacción de usuarios, etc.). " +
    "• Informes de seguimiento y análisis de resultados. " +
    "• Gráficos o reportes de tendencias. " +
    "• Actas de reuniones donde se discuten los resultados.",

  criterios: {
    "1": "1: No se realiza seguimiento ni medición de indicadores.",
    "2": "2: Se miden algunos datos sin registros ni análisis formal.",
    "3": "3: Indicadores definidos, pero sin seguimiento continuo ni comunicación de resultados.",
    "4": "4: Indicadores medidos periódicamente con análisis y acciones derivadas.",
    "5": "5: Sistema de monitoreo consolidado, con análisis comparativo, tendencias y toma de decisiones basada en datos."
  }
},
{
  codigo: "6.2",
  pregunta: "¿Se realizan auditorías internas periódicas que evalúan el cumplimiento de los requisitos del sistema de gestión ambiental?",

  queImplica:
    "Las auditorías internas son una herramienta fundamental para verificar que el sistema de gestión ambiental se implementa de manera eficaz y cumple con los requisitos establecidos. " +
    "Permiten detectar desviaciones, evaluar el desempeño de los procesos y proponer acciones de mejora antes de las auditorías externas o revisiones de la dirección.",

  comoCumplir:
    "• Planificar un programa de auditorías internas con una frecuencia definida según la criticidad de los procesos. " +
    "• Seleccionar auditores competentes e independientes de las actividades que evalúan. " +
    "• Aplicar listas de verificación basadas en los requisitos de las normas y procedimientos internos. " +
    "• Registrar los hallazgos, comunicarlos a los responsables y hacer seguimiento a las acciones correctivas derivadas de las auditorías.",

  evidencias:
    "• Programa anual de auditorías internas. " +
    "• Informes o actas de auditorías realizadas. " +
    "• Listas de chequeo y registros de hallazgos. " +
    "• Planes de acción correctiva y seguimiento de su cumplimiento. " +
    "• Registros de capacitación de auditores internos.",

  criterios: {
    "1": "1: No se realizan auditorías internas.",
    "2": "2: Se han realizado auditorías esporádicas o sin metodología definida.",
    "3": "3: Auditorías realizadas, pero sin seguimiento a los hallazgos o acciones correctivas.",
    "4": "4: Auditorías planificadas y ejecutadas periódicamente con seguimiento de resultados.",
    "5": "5: Sistema de auditorías consolidado, con análisis de tendencias, mejora continua y participación activa de la dirección."
  }
},
{
  codigo: "6.3",
  pregunta: "¿La dirección revisa periódicamente el desempeño del sistema de gestión ambiental, tomando decisiones basadas en los resultados de auditorías y monitoreos?",

  queImplica:
    "La revisión por la dirección asegura que los responsables institucionales evalúen periódicamente la eficacia del sistema de gestión, identifiquen oportunidades de mejora y tomen decisiones informadas. " +
    "Este proceso garantiza la alineación del sistema con los objetivos estratégicos, los requisitos legales y las necesidades de las partes interesadas.",

  comoCumplir:
    "• Programar reuniones de revisión por la dirección al menos una vez al año o cuando sea necesario. " +
    "• Analizar resultados de auditorías, indicadores, incidentes, quejas, cumplimiento legal y avances de los objetivos. " +
    "• Registrar conclusiones, decisiones y acciones derivadas. " +
    "• Hacer seguimiento a los compromisos para evidenciar la mejora continua.",

  evidencias:
    "• Actas o informes de revisión por la dirección. " +
    "• Listas de verificación o presentaciones utilizadas. " +
    "• Registros de decisiones y planes de acción. " +
    "• Informes de seguimiento de acciones correctivas. " +
    "• Comunicaciones oficiales o aprobaciones derivadas de la revisión.",

  criterios: {
    "1": "1: No se realiza revisión por la dirección.",
    "2": "2: Se realizan reuniones informales sin registro ni seguimiento.",
    "3": "3: La revisión se hace esporádicamente o sin analizar toda la información del sistema.",
    "4": "4: Revisión documentada, con análisis de resultados y decisiones tomadas.",
    "5": "5: Revisión periódica, documentada y con evidencia de decisiones estratégicas que impulsan la mejora continua."
  }
},
{
  codigo: "7.1",
  pregunta:
    "¿Se gestionan adecuadamente las no conformidades y desviaciones del sistema de gestión ambiental (por ejemplo, incumplimientos de permisos, manejo de residuos, fallas en procesos o servicios)?",

  queImplica:
    "La gestión de no conformidades permite identificar, registrar y corregir los incumplimientos o fallas que afectan el desempeño ambiental o la calidad de los servicios. " +
    "Un tratamiento adecuado de estas situaciones ayuda a prevenir su repetición, mejorar los procesos y fortalecer la eficacia del sistema de gestión.",

  comoCumplir:
    "• Establecer un procedimiento formal para la identificación, registro, análisis y corrección de no conformidades. " +
    "• Incluir la investigación de causas y la definición de acciones correctivas apropiadas. " +
    "• Asegurar que las no conformidades se documenten y que se haga seguimiento a su cierre y efectividad. " +
    "• Comunicar los resultados a las partes responsables y analizar tendencias para prevenir recurrencias.",

  evidencias:
    "• Registros de no conformidades o desviaciones. " +
    "• Formularios o reportes de análisis de causa raíz. " +
    "• Planes de acción correctiva. " +
    "• Registros de verificación de cierre. " +
    "• Informes de auditorías internas y revisiones por la dirección.",

  criterios: {
    "1": "1: No se gestionan las no conformidades ni se registran.",
    "2": "2: Se identifican algunas no conformidades, pero sin registro ni seguimiento formal.",
    "3": "3: Se documentan las no conformidades, pero sin análisis de causas o acciones efectivas.",
    "4": "4: No conformidades gestionadas mediante procedimientos documentados y seguimiento parcial.",
    "5": "5: Sistema consolidado de gestión de no conformidades con análisis de causas, acciones efectivas y mejora continua."
  }
},
{
  codigo: "7.2",
  pregunta:
    "¿Se aplican, documentan y evalúan acciones correctivas y de mejora continua para garantizar la eficacia del sistema de gestión ambiental?",

  queImplica:
    "La aplicación de acciones correctivas y de mejora continua asegura que el sistema de gestión evolucione y mantenga su eficacia con el tiempo. " +
    "Las acciones correctivas eliminan las causas de las no conformidades detectadas, mientras que la mejora continua busca optimizar los procesos, " +
    "aumentar la satisfacción de las partes interesadas y fortalecer el desempeño ambiental.",

  comoCumplir:
    "• Implementar un procedimiento para identificar oportunidades de mejora y gestionar las acciones correctivas derivadas de auditorías, revisiones o incidentes. " +
    "• Documentar cada acción, sus responsables, plazos y resultados esperados. " +
    "• Verificar la eficacia de las acciones mediante evaluaciones, seguimiento de indicadores o auditorías internas. " +
    "• Promover la participación del personal en la identificación de mejoras y registrar las iniciativas exitosas.",

  evidencias:
    "• Registros de acciones correctivas y de mejora. " +
    "• Planes de acción con responsables y fechas. " +
    "• Informes de seguimiento o cierre. " +
    "• Actas de reuniones de mejora. " +
    "• Registros de auditorías o revisiones de dirección. " +
    "• Indicadores de desempeño que reflejen avances.",

  criterios: {
    "1": "1: No se aplican acciones correctivas ni actividades de mejora.",
    "2": "2: Se aplican algunas acciones, pero sin documentación ni seguimiento.",
    "3": "3: Existen registros de acciones correctivas, pero sin evaluación de su eficacia.",
    "4": "4: Acciones correctivas y de mejora documentadas, implementadas y con seguimiento regular.",
    "5": "5: Sistema de mejora continua consolidado, con evaluación sistemática, resultados medibles y participación activa del personal."
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
