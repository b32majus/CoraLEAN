/* Contenido de la guía. Fuente única: si cambia una skill, se cambia aquí. */

window.GUIA = {
  plataformas: [
    { id: "chatgpt", nombre: "ChatGPT", prefijo: (s) => `Usa la skill «${s}».\n\n`, nota: "Con las skills instaladas. Si no se activa sola, el mensaje ya la nombra." },
    { id: "claude", nombre: "Claude", prefijo: (s) => `Usa la skill «${s}».\n\n`, nota: "Con las skills instaladas en Personalizar → Skills." },
    { id: "opencode", nombre: "OpenCode", prefijo: (s) => `@${s} `, nota: "Con la carpeta de skills configurada en opencode.json." },
    { id: "proyecto", nombre: "Project (plan B)", prefijo: (s) => `Sigue la sección «${s}» del Facilitador Lean.\n\n`, nota: "En un Project con INSTRUCCIONES.md y facilitador-lean-completo.md." }
  ],

  fases: [
    { id: "arranque", nombre: "Arranque", lema: "Parte de lo que ya sabes y dale dirección al proyecto" },
    { id: "entrevistas", nombre: "Entrevistas", lema: "Investiga persona a persona antes de reunir al grupo", opcional: true },
    { id: "primera", nombre: "Primera reunión", lema: "Constituye el grupo y valida la situación de partida" },
    { id: "ciclo", nombre: "Ciclo de sesiones", lema: "Cada sesión: orientarse, preparar, celebrar, procesar" },
    { id: "proximamente", nombre: "Causas, soluciones y prueba", lema: "En preparación (Bloque 3)", proximamente: true }
  ],

  pasos: [
    {
      id: "recoger-contexto", fase: "arranque", titulo: "Vuelca lo que sabes", skill: "recoger-contexto",
      resumen: "Ordena todo lo que ya sabes del proyecto antes de empezar: el encargo, el estándar, los datos y los servicios implicados. El asistente lo clasifica y te dice qué falta.",
      cuando: "Al empezar un proyecto nuevo, o cuando tienes documentos sueltos y todavía no hay ficha.",
      necesitas: ["El encargo, mejor literal (correo, acta, objetivo del contrato de gestión)", "El estándar de referencia si lo hay (PAI, protocolo, guía)", "Los datos o indicadores que tengas", "Tus notas, sin ordenar"],
      recibes: ["Ficha de contexto", "«Lo que falta», priorizado", "Señales de alerta (objetivo que es una solución, niveles olvidados…)"],
      campos: [
        { id: "proyecto", etiqueta: "Nombre provisional del proyecto", tipo: "text", ej: "Adaptación del PAI de insuficiencia cardiaca", recordar: true },
        { id: "encarga", etiqueta: "Quién lo encarga", tipo: "text", ej: "Dirección médica" },
        { id: "volcado", etiqueta: "Pega aquí lo que tengas (sin datos de pacientes)", tipo: "textarea", ej: "Correo del encargo, notas, datos…" }
      ],
      plantilla: "Me han encargado un proyecto: {proyecto}. Lo encarga {encarga}.\n\nTe pego todo lo que tengo, sin ordenar:\n\n{volcado}\n\nOrdénalo en una ficha de contexto y dime qué falta.",
      consejo: "No ordenes nada antes de pegarlo. Ordenar es trabajo del asistente; tu trabajo es no dejarte nada.",
      plantillas: ["ficha-contexto"], ejemplos: ["recoger-contexto--ejemplo-volcado-y-ficha-contexto"],
      herramientas: [], siguiente: "preguntame", ficha: false
    },
    {
      id: "preguntame", fase: "arranque", titulo: "Deja que te pregunte", skill: "preguntame",
      resumen: "Un interrogatorio guiado, una pregunta cada vez, para sacar lo que sabes pero no has contado. Lo que no sepas se convierte en una lista de cosas a averiguar.",
      cuando: "Justo después de la ficha de contexto, o cuando sientas que al proyecto le falta algo.",
      necesitas: ["La ficha de contexto (en la misma conversación, o pégala)", "Unos 15–20 minutos"],
      recibes: ["Ficha de contexto completada", "Lista «A averiguar»: qué, quién podría saberlo, cómo", "Dos o tres sorpresas que cambian la mirada sobre el proyecto"],
      campos: [],
      plantilla: "Pregúntame lo que falte, de una en una. Si no sé algo, apúntalo para averiguarlo.",
      consejo: "Contesta «no lo sé» sin miedo. Cada «no lo sé» es una pregunta para una entrevista, y ahí está el valor.",
      plantillas: [], ejemplos: ["preguntame--ejemplo-interrogatorio"],
      herramientas: [], siguiente: "bocetar-proyecto", ficha: true
    },
    {
      id: "bocetar-proyecto", fase: "arranque", titulo: "Haz el boceto del proyecto", skill: "bocetar-proyecto",
      resumen: "Una dirección provisional para poder formar el grupo y convocar: problema y objetivo, alcance, niveles implicados, mapa de actores, hipótesis, plan de arranque y grupo núcleo. Se convierte en la versión 0 de la ficha.",
      cuando: "Cuando el contexto está razonablemente completo y necesitas formar el grupo y decidir cómo arrancar.",
      necesitas: ["La ficha de contexto completada", "Tu propia frase: «el problema es…» y «queremos conseguir…» (te la pedirá)"],
      recibes: ["Boceto del proyecto (BORRADOR)", "Mapa de actores", "Plan de arranque: entrevistas primero o directo al grupo", "Propuesta de grupo núcleo y de convocatoria", "Ficha del proyecto v0"],
      campos: [],
      plantilla: "Haz el boceto del proyecto con lo que tenemos, el mapa de actores y la propuesta de grupo de trabajo.",
      consejo: "Todo lo que sale aquí es borrador. Su función es orientar y convocar, no fijar el proyecto. Guarda la ficha v0: desde aquí es la memoria del proyecto.",
      plantillas: ["boceto-proyecto", "mapa-actores", "ficha-proyecto"], ejemplos: ["bocetar-proyecto--ejemplo-boceto"],
      herramientas: ["actores"], siguiente: "planificar-entrevistas", ficha: true
    },
    {
      id: "planificar-entrevistas", fase: "entrevistas", titulo: "Planifica las entrevistas", skill: "planificar-entrevistas",
      resumen: "A quién entrevistar, en qué orden y con qué guion según su rol. Así el grupo no tiene que reunirse para todo: revisa y valida lo ya investigado.",
      cuando: "Si hay varios niveles o servicios, temas delicados, jerarquías, poco tiempo para reunir al grupo o la situación no está clara. Si no, salta a la primera reunión.",
      necesitas: ["La ficha v0 con el mapa de actores", "La lista «A averiguar»"],
      recibes: ["Plan de entrevistas", "Un guion por rol (30–45 min)", "Frase de consentimiento para grabar", "Consejos para entrevistar"],
      campos: [{ id: "roles", etiqueta: "Personas a entrevistar (por rol)", tipo: "text", ej: "médica de familia, gestora de casos, cardiólogo…" }],
      plantilla: "Planifica las entrevistas individuales. Había pensado en: {roles}. Prepárame un guion por rol.",
      consejo: "Pide ejemplos concretos: «cuéntame la última vez que…». Y cierra siempre con «¿con quién más debería hablar?».",
      plantillas: ["guion-entrevista", "notas-entrevista"], ejemplos: [],
      herramientas: [], siguiente: "procesar-entrevista", ficha: true, privacidad: true
    },
    {
      id: "procesar-entrevista", fase: "entrevistas", titulo: "Procesa cada entrevista", skill: "procesar-reunion",
      resumen: "Pasa la grabación transcrita o tus notas por el asistente. Obtienes una ficha de entrevista confidencial, por rol, lista para la síntesis.",
      cuando: "El mismo día de cada entrevista, mientras la recuerdas.",
      necesitas: ["La transcripción o las notas (nombres cambiados por roles, sin datos de pacientes)", "La ficha del proyecto"],
      recibes: ["Ficha de entrevista: su tramo del proceso, problemas, datos, ideas, citas, cosas dudosas", "Cambios propuestos a la ficha"],
      campos: [
        { id: "rol", etiqueta: "Rol de la persona entrevistada", tipo: "text", ej: "médica de familia" },
        { id: "transcripcion", etiqueta: "Pega la transcripción o las notas", tipo: "textarea", ej: "…" }
      ],
      plantilla: "Es una entrevista individual con: {rol}. Te pego la transcripción:\n\n{transcripcion}\n\nHazme la ficha de entrevista y propón los cambios a la ficha del proyecto.",
      consejo: "Antes de pegar una transcripción en una IA que tu centro no ha aprobado, cambia los nombres por roles y quita cualquier dato de pacientes.",
      plantillas: ["ficha-entrevista"], ejemplos: ["procesar-reunion--ejemplo-entrevista-transcripcion", "procesar-reunion--ejemplo-entrevista-ficha"],
      herramientas: [], siguiente: "sintetizar-entrevistas", ficha: true, privacidad: true
    },
    {
      id: "sintetizar-entrevistas", fase: "entrevistas", titulo: "Sintetiza la situación de partida", skill: "sintetizar-entrevistas",
      resumen: "Une todas las entrevistas en una sola foto: el proceso descrito por cada rol, coincidencias, contradicciones, problemas y datos. Con dos versiones: una para el grupo y otra completa para ti.",
      cuando: "Cuando tengas todas las entrevistas procesadas.",
      necesitas: ["Las fichas de entrevista", "La ficha del proyecto"],
      recibes: ["Situación de partida (borrador) para el grupo", "Versión completa para el líder", "Afirmaciones listas para validar con el semáforo"],
      campos: [{ id: "fichas", etiqueta: "Pega las fichas de entrevista (o di que están en la conversación)", tipo: "textarea", ej: "…" }],
      plantilla: "Estas son las fichas de las entrevistas:\n\n{fichas}\n\nPrepara la situación de partida, en versión para el grupo y versión completa para mí.",
      consejo: "Si en un rol solo hay una persona, sus opiniones se reconocen aunque no pongas el nombre. Redacta lo delicado en general.",
      plantillas: ["situacion-partida"], ejemplos: ["sintetizar-entrevistas--ejemplo-situacion-partida"],
      herramientas: ["carriles", "semaforo"], siguiente: "preparar-primera", ficha: true
    },
    {
      id: "preparar-primera", fase: "primera", titulo: "Prepara la primera reunión", skill: "preparar-sesion",
      resumen: "El guion minuto a minuto de la primera reunión del grupo, con las preguntas literales, las técnicas y la convocatoria. De lanzamiento si no hubo entrevistas, o de validación de la situación de partida si las hubo.",
      cuando: "Unos días antes de la reunión, para enviar la convocatoria con tiempo.",
      necesitas: ["La ficha del proyecto", "Duración, fecha y asistentes por rol", "La situación de partida, si hiciste entrevistas"],
      recibes: ["Guion minuto a minuto", "Convocatoria lista para enviar", "Materiales y trabajo previo", "Qué hacer si alguien acapara, hay conflicto o se salta a soluciones"],
      campos: [
        { id: "tipo", etiqueta: "Tipo de reunión", tipo: "select", opciones: ["lanzamiento (sin entrevistas previas)", "validar la situación de partida (tras las entrevistas)"] },
        { id: "duracion", etiqueta: "Duración", tipo: "text", ej: "90 minutos" },
        { id: "fecha", etiqueta: "Fecha", tipo: "text", ej: "lunes 26 de octubre" },
        { id: "asistentes", etiqueta: "Asistentes (por rol)", tipo: "text", ej: "farmacéutica, dos internistas, enfermera de planta, médica de familia" }
      ],
      plantilla: "Prepara la primera reunión del grupo, de tipo {tipo}. Duración: {duracion}. Fecha: {fecha}. Asistentes: {asistentes}. Quiero el guion minuto a minuto con las preguntas literales y la convocatoria.",
      consejo: "El cierre con responsables y fechas no se recorta nunca, aunque vayáis tarde. Una reunión sin acuerdos con nombre se repite.",
      plantillas: ["guion-sesion", "convocatoria"], ejemplos: ["preparar-sesion--ejemplo-guion-validacion", "preparar-sesion--contraejemplo-sesion"],
      herramientas: ["semaforo", "carriles"], tecnicas: ["ronda", "silencio", "semaforo", "punyo", "aparcamiento", "cierre"],
      siguiente: "procesar-sesion", ficha: true, privacidad: true
    },
    {
      id: "procesar-sesion", fase: "primera", titulo: "Procesa la reunión", skill: "procesar-reunion",
      resumen: "De la grabación o las notas salen tres cosas: el acta de seguimiento para el grupo, tu documento de trabajo con todo el contenido de valor y los cambios a la ficha.",
      cuando: "El mismo día o al siguiente. Envía el acta en menos de 48 horas.",
      necesitas: ["La transcripción, las notas o fotos de la pizarra (nombres por roles, sin datos de pacientes)", "La ficha del proyecto", "El guion previsto (opcional, para ver qué se cubrió)"],
      recibes: ["Acta de seguimiento: decisiones, acuerdos con responsable y fecha, pendientes, dudas", "Documento del líder: datos, opiniones por rol, desacuerdos, cosas dudosas con cita, información del proceso", "Cambios propuestos a la ficha"],
      campos: [
        { id: "sesion", etiqueta: "Qué sesión es", tipo: "text", ej: "Sesión 1, lanzamiento" },
        { id: "transcripcion", etiqueta: "Pega la transcripción o las notas", tipo: "textarea", ej: "…" }
      ],
      plantilla: "Es una sesión de grupo: {sesion}. Te pego la transcripción:\n\n{transcripcion}\n\nQuiero el acta de seguimiento, mi documento de trabajo y los cambios a la ficha.",
      consejo: "Revisa la sección «Pendiente de confirmar» antes de enviar el acta. Es donde el asistente te avisa de lo que no quedó claro.",
      plantillas: ["acta-seguimiento", "documento-lider"], ejemplos: ["procesar-reunion--ejemplo-sesion-transcripcion", "procesar-reunion--ejemplo-sesion-acta", "procesar-reunion--ejemplo-sesion-documento-lider"],
      herramientas: [], siguiente: "donde-estamos", ficha: true, privacidad: true
    },
    {
      id: "donde-estamos", fase: "ciclo", titulo: "¿Dónde estamos?", skill: "donde-estamos",
      resumen: "Al retomar el proyecto: en qué momento está, qué está sólido y qué está débil, qué acciones están vencidas o sin responsable y cuál es el siguiente paso.",
      cuando: "Cada vez que retomes el proyecto o no sepas qué toca.",
      necesitas: ["La ficha del proyecto, última versión"],
      recibes: ["Momento del proyecto y por qué", "Semáforo de la ficha", "Alertas", "Un siguiente paso, con su porqué y la skill a usar"],
      campos: [],
      plantilla: "¿Dónde estamos y qué toca ahora?",
      consejo: "Antes de leer la respuesta, piensa tú qué crees que toca. El asistente te lo preguntará y lo comparará con lo suyo.",
      plantillas: ["ficha-proyecto"], ejemplos: [],
      herramientas: [], siguiente: "elegir-herramienta", ficha: true
    },
    {
      id: "elegir-herramienta", fase: "ciclo", titulo: "Elige la herramienta", skill: "elegir-herramienta",
      resumen: "Una sola herramienta, la que responde a la pregunta que tiene ahora el proyecto. Con su porqué, cuándo no usarla y una alternativa más ligera.",
      cuando: "Cuando no sabes qué herramienta usar o dudas entre varias.",
      necesitas: ["La ficha del proyecto", "Tu duda, si la tienes («¿hago un VSM?»)"],
      recibes: ["Una herramienta, por qué ahora, qué obtienes, esfuerzo", "Cuándo no usarla y alternativa ligera", "Tres pasos para empezar"],
      campos: [{ id: "duda", etiqueta: "Tu duda (opcional)", tipo: "text", ej: "¿Hago un VSM o un mapa sencillo?" }],
      plantilla: "¿Qué herramienta deberíamos usar ahora? {duda}",
      consejo: "La mejor herramienta es la más ligera que responda a la pregunta. Mira la biblioteca de herramientas de esta guía.",
      plantillas: [], ejemplos: [],
      herramientas: [], siguiente: "mapear-proceso", ficha: true
    },
    {
      id: "mapear-proceso", fase: "ciclo", titulo: "Mapea el proceso actual", skill: "mapear-proceso",
      resumen: "El recorrido real del paciente por niveles asistenciales: quién hace cada paso, traspasos, esperas y problemas. Si el problema es de tiempos, un VSM.",
      cuando: "Para entender cómo funciona hoy, antes de comparar con el PAI o buscar causas.",
      necesitas: ["La ficha", "Una de estas: síntesis de entrevistas, fotos del mapa en la pared, o tu conocimiento del proceso"],
      recibes: ["Tabla del proceso", "Diagrama por carriles", "Métricas del VSM (medidas o estimadas)", "Hoja de recogida de tiempos"],
      campos: [{ id: "base", etiqueta: "A partir de qué", tipo: "select", opciones: ["la síntesis de las entrevistas", "las fotos o notas del mapa hecho en la pared", "lo que yo sé (pregúntame paso a paso)"] }],
      plantilla: "Vamos a mapear el proceso actual a partir de {base}.",
      consejo: "Se mapea lo que pasa, no lo que dice el protocolo. Incluye fines de semana, tardes y las excepciones frecuentes.",
      plantillas: ["tabla-proceso", "hoja-recogida-tiempos"], ejemplos: ["mapear-proceso--ejemplo-mapa-ic"],
      herramientas: ["carriles", "vsm", "recogida"], siguiente: "comparar-con-estandar", ficha: true
    },
    {
      id: "comparar-con-estandar", fase: "ciclo", titulo: "Compara con el PAI", skill: "comparar-con-estandar",
      resumen: "Cada recomendación del PAI o protocolo frente a la realidad: se cumple, en parte, no, lo hacemos distinto… Y un borrador de adaptación local: adoptar, adaptar o no adoptar por ahora.",
      cuando: "Para adaptar un PAI o protocolo, después de conocer la situación actual.",
      necesitas: ["El PAI o las secciones que entran en el alcance (versión y fecha)", "El mapa del proceso o la situación de partida", "La ficha"],
      recibes: ["Tabla de brechas clasificadas", "Borrador de adaptación local", "Brechas prioritarias para el proyecto de mejora"],
      campos: [{ id: "estandar", etiqueta: "Estándar de referencia", tipo: "text", ej: "PAI regional de insuficiencia cardiaca, 2026" }],
      plantilla: "Compara el {estandar} con nuestra situación actual. Te adjunto las secciones que entran en el alcance.",
      consejo: "«Lo hacemos distinto» no siempre es una brecha. A veces es justo la adaptación local que el PAI permite.",
      plantillas: ["tabla-brechas", "adaptacion-local"], ejemplos: ["comparar-con-estandar--ejemplo-brechas-ic"],
      herramientas: ["brechas"], siguiente: "preparar-seguimiento", ficha: true
    },
    {
      id: "preparar-seguimiento", fase: "ciclo", titulo: "Prepara la siguiente sesión", skill: "preparar-sesion",
      resumen: "Cualquier sesión del ciclo: mapear el proceso, comparar con el estándar, analizar causas, priorizar, planificar una prueba o seguimiento de acciones.",
      cuando: "Antes de cada reunión del grupo.",
      necesitas: ["La ficha", "Tipo de sesión, duración y asistentes"],
      recibes: ["Guion minuto a minuto", "Convocatoria", "Materiales y trabajo previo"],
      campos: [
        { id: "tipo", etiqueta: "Tipo de sesión", tipo: "select", opciones: ["seguimiento de acciones", "mapear el proceso actual", "comparar con el estándar", "analizar causas", "generar y priorizar soluciones", "planificar una prueba", "no lo sé (propónmelo según la ficha)"] },
        { id: "duracion", etiqueta: "Duración", tipo: "text", ej: "60 minutos" },
        { id: "asistentes", etiqueta: "Asistentes (por rol)", tipo: "text", ej: "grupo núcleo" }
      ],
      plantilla: "Prepara la próxima sesión, de tipo {tipo}. Duración: {duracion}. Asistentes: {asistentes}.",
      consejo: "Cada bloque del guion tiene que producir algo concreto. Si un bloque no produce nada, sobra.",
      plantillas: ["guion-sesion", "convocatoria"], ejemplos: [],
      herramientas: [], tecnicas: ["ronda", "silencio", "puntos", "aparcamiento", "cierre"],
      siguiente: "procesar-sesion", ficha: true
    }
  ],

  proximamente: {
    titulo: "Causas, soluciones y prueba",
    texto: "Las skills analizar-causas, priorizar-soluciones y planificar-prueba están en preparación. Mientras tanto, usa «Elige la herramienta» y «Prepara la siguiente sesión», y consulta la teoría en la biblioteca.",
    herramientas: ["porques", "ishikawa", "pareto", "matriz", "pdsa", "runchart", "a3"]
  },

  herramientas: [
    { id: "actores", nombre: "Mapa de actores", momento: "Arranque", pregunta: "¿Quién participa y cómo implicarle?",
      teoria: "Sitúa a cada rol según su interés en el proyecto y su influencia para que el cambio ocurra. De ahí sale quién está en el grupo núcleo, a quién entrevistar y a quién informar.",
      como: ["Lista los roles de todos los niveles que tocan el proceso", "Puntúa interés e influencia (alto, medio, bajo)", "Decide el papel: núcleo, entrevistar, consultar, informar", "Comprueba: ¿hay primera línea? ¿una voz crítica? ¿el paciente?"],
      cuandoNo: "Nunca sobra, pero en proyectos de un solo servicio basta una lista.", consejo: "Quien hace el trabajo suele tener influencia baja e interés alto. Es imprescindible para conocer la realidad.",
      plantilla: "mapa-actores", imprimir: "actores", skill: "bocetar-proyecto" },
    { id: "sipoc", nombre: "SIPOC", momento: "Arranque", pregunta: "¿Dónde empieza y termina el proceso?",
      teoria: "Una vista de pájaro del proceso en cinco columnas: Proveedores, Entradas, Proceso (5–7 pasos), Salidas y Clientes. Sirve para delimitar antes de mapear en detalle.",
      como: ["Define inicio y fin", "Escribe 5–7 pasos grandes", "Salidas y quién las recibe", "Entradas y quién las aporta"],
      cuandoNo: "Si el proceso ya está bien delimitado.", consejo: "No detalles: si pasas de 7 pasos, ya estás haciendo un mapa de proceso.",
      plantilla: null, imprimir: null, skill: "preparar-sesion" },
    { id: "carriles", nombre: "Mapa de proceso por carriles", momento: "Situación actual", pregunta: "¿Cuál es el recorrido del paciente y quién hace qué?",
      teoria: "El recorrido paso a paso con un carril por nivel asistencial o servicio. Los problemas suelen estar en los traspasos entre carriles: ahí se pierde información y tiempo.",
      como: ["Fija inicio, fin y paciente tipo", "Un pósit por paso: verbo + objeto", "Coloca cada paso en el carril de quien lo hace", "Marca los traspasos y cómo pasa la información", "Problemas en pósits de otro color"],
      cuandoNo: "Nunca sobra para entender un proceso entre niveles.", consejo: "Pregunta «¿y después qué pasa?» y «¿cuánto tiempo pasa hasta el siguiente paso?».",
      plantilla: "tabla-proceso", imprimir: "carriles", skill: "mapear-proceso" },
    { id: "vsm", nombre: "VSM · Mapa de flujo de valor", momento: "Situación actual", pregunta: "¿Dónde se pierde el tiempo del paciente?",
      teoria: "Un mapa de proceso con tiempos. Distingue el tiempo en que se hace algo al paciente (tiempo de proceso) del tiempo en que espera. Suele mostrar que el paciente pasa la mayor parte del recorrido esperando.",
      como: ["Haz el mapa del proceso", "Añade tiempo de proceso y de espera a cada paso", "Marca cada tiempo como medido o estimado", "Calcula el tiempo total y el tiempo que aporta valor", "Señala la espera más larga"],
      cuandoNo: "Si el problema no es de tiempos o esperas, o no hay forma de estimarlos.", consejo: "Nunca presentes una estimación como un dato. Escribe «estimado» al lado.",
      plantilla: "tabla-proceso", imprimir: null, skill: "mapear-proceso" },
    { id: "brechas", nombre: "Comparación con el estándar", momento: "Situación actual", pregunta: "¿En qué nos separamos del PAI?",
      teoria: "Cada recomendación del estándar frente a lo que se hace de verdad. Cada elemento se clasifica y se decide: adoptar, adaptar o no adoptar por ahora. Es la base del documento de adaptación local.",
      como: ["Extrae del PAI lo que entra en el alcance, con su apartado", "Compara con la realidad, no con el protocolo escrito", "Clasifica: se cumple, en parte, no, distinto, no aplica, desconocido", "Valora impacto y viabilidad", "Propón el tratamiento y marca lo que debe decidir el grupo"],
      cuandoNo: "Si no hay estándar de referencia.", consejo: "Compara con lo que pasa, no con lo que dice vuestro protocolo.",
      plantilla: "tabla-brechas", imprimir: null, skill: "comparar-con-estandar" },
    { id: "recogida", nombre: "Hoja de recogida de datos", momento: "Situación actual", pregunta: "¿Cuánto pasa? ¿Con qué frecuencia?",
      teoria: "Cuando el dato no existe, se mide a mano durante un periodo corto. Dos a cuatro semanas, o 20–30 casos, suelen bastar para tener un dato de partida.",
      como: ["Elige una o dos variables, no más", "Decide quién la rellena y dónde se guarda", "Usa un número de orden, nunca el número de historia", "Al terminar: mediana, mínimo, máximo, % que cumple"],
      cuandoNo: "Si el dato ya está en un sistema.", consejo: "Una hoja que nadie rellena no sirve. Que sea tan corta que dé pereza no hacerlo.",
      plantilla: "hoja-recogida-tiempos", imprimir: "recogida", skill: "mapear-proceso" },
    { id: "runchart", nombre: "Gráfico de evolución", momento: "Medición", pregunta: "¿Está mejorando con el tiempo?",
      teoria: "El indicador en el tiempo con la mediana como referencia. Permite ver si un cambio produce mejora sostenida y no reaccionar a cada subida o bajada.",
      como: ["Elige el indicador y la periodicidad (semanal, mensual)", "Dibuja los puntos en orden", "Traza la mediana", "Marca cuándo se introdujo el cambio"],
      cuandoNo: "Con menos de 10–12 puntos.", consejo: "Seis puntos seguidos por encima o por debajo de la mediana suelen indicar un cambio real.",
      plantilla: null, imprimir: null, skill: null },
    { id: "porques", nombre: "5 porqués", momento: "Causas", pregunta: "¿Por qué ocurre este problema?",
      teoria: "Preguntar «¿por qué?» sucesivamente hasta llegar a una causa del proceso sobre la que se pueda actuar. No siempre son cinco: se para cuando se llega a algo que se puede cambiar.",
      como: ["Escribe el problema concreto", "Pregunta por qué y escribe la respuesta", "Repite con la respuesta", "Para en una causa de proceso, no en una persona"],
      cuandoNo: "Con problemas que tienen muchas causas a la vez (mejor Ishikawa).", consejo: "Si la respuesta es «porque X no lo hace», pregunta otra vez: ¿por qué el proceso permite que no se haga?",
      plantilla: null, imprimir: null, skill: null },
    { id: "ishikawa", nombre: "Ishikawa · Espina de pescado", momento: "Causas", pregunta: "¿Qué familias de causas hay?",
      teoria: "Organiza las causas posibles de un problema en familias. En sanidad: personas, métodos y circuitos, medicación y materiales, equipos y sistemas de información, entorno, organización y gestión.",
      como: ["Problema en la cabeza del pez", "Una espina por familia", "Causas con escritura en silencio", "Profundiza las principales con 5 porqués", "Prioriza con datos o votación (marcada como opinión)"],
      cuandoNo: "Si la causa ya se conoce.", consejo: "Separa causas de soluciones: si alguien propone una solución, al aparcamiento.",
      plantilla: null, imprimir: "ishikawa", skill: null },
    { id: "pareto", nombre: "Pareto", momento: "Causas", pregunta: "¿Qué pocas causas explican la mayoría?",
      teoria: "Ordena las causas por frecuencia. Habitualmente unas pocas explican la mayor parte de los casos, y ahí conviene concentrarse.",
      como: ["Cuenta cuántas veces aparece cada causa", "Ordénalas de mayor a menor", "Dibuja barras y la línea acumulada", "Céntrate en las que suman cerca del 80 %"],
      cuandoNo: "Sin datos de frecuencia.", consejo: "Un Pareto hecho con opiniones no es un Pareto. Si no hay datos, dilo.",
      plantilla: null, imprimir: null, skill: null },
    { id: "matriz", nombre: "Matriz impacto-esfuerzo", momento: "Soluciones", pregunta: "¿Qué hacemos primero?",
      teoria: "Sitúa cada solución según el impacto esperado y el esfuerzo que requiere. Cuatro cuadrantes: hacer ya, proyecto, si sobra tiempo, descartar.",
      como: ["Cada solución en un pósit", "Acordad qué significa impacto y esfuerzo", "Colocadlas entre todos", "Empezad por alto impacto y bajo esfuerzo"],
      cuandoNo: "Si solo hay una o dos soluciones.", consejo: "Que no las coloque el jefe. Primero cada uno en silencio, después se debate lo que no coincide.",
      plantilla: null, imprimir: "matriz", skill: null },
    { id: "pdsa", nombre: "Ciclo PDSA", momento: "Prueba", pregunta: "¿Funciona el cambio aquí?",
      teoria: "Planificar con predicción, Hacer en pequeño, Estudiar comparando con la predicción y Actuar: adoptar, adaptar o abandonar. Probar no es adoptar.",
      como: ["Escribe la predicción: «esperamos que…»", "Prueba en pequeño: un centro, una semana, pocos pacientes", "Mide lo que predijiste", "Decide y, si toca, otro ciclo"],
      cuandoNo: "Con cambios que no se pueden probar en pequeño.", consejo: "Sin predicción no hay aprendizaje: solo un cambio que «parece que va bien».",
      plantilla: null, imprimir: null, skill: null },
    { id: "a3", nombre: "A3", momento: "Todo el proyecto", pregunta: "¿Cómo contamos el proyecto en una hoja?",
      teoria: "El proyecto en una hoja A3 siguiendo el ciclo PDCA: contexto, situación actual, objetivo, análisis, contramedidas, plan y seguimiento. Su valor está en el razonamiento que obliga a hacer.",
      como: ["Contexto y problema", "Situación actual (con el mapa)", "Objetivo e indicador", "Análisis de causas", "Contramedidas, plan y seguimiento"],
      cuandoNo: "Como sustituto del trabajo con el grupo.", consejo: "La ficha del proyecto ya recoge casi todo lo que va en el A3. Pídele al asistente que lo genere desde la ficha.",
      plantilla: null, imprimir: null, skill: null },
    { id: "semaforo", nombre: "Semáforo de validación", momento: "Validar", pregunta: "¿Es esta la situación real?",
      teoria: "Cada afirmación del borrador se vota en verde (es así), ámbar (en parte) o rojo (no es así). Solo se debate lo ámbar y lo rojo. Valida mucho en poco tiempo y hace hablar a todos.",
      como: ["Formula afirmaciones concretas y comprobables", "Lee una a una", "Votación simultánea con tarjetas", "Debate solo ámbar y rojo: «¿qué parte no es así?»"],
      cuandoNo: "Para decidir soluciones: votar no sustituye a medir.", consejo: "Las afirmaciones las prepara sintetizar-entrevistas, listas para imprimir.",
      plantilla: "situacion-partida", imprimir: "semaforo", skill: "sintetizar-entrevistas" }
  ],

  tecnicas: [
    { id: "ronda", nombre: "Ronda", para: "Que hablen todos, no solo los de siempre.", como: "Pregunta concreta y turnos de un minuto por persona. Se puede pasar.", frase: "Por turnos: ¿cuál es el principal problema que veis en el alta? Una frase cada uno." },
    { id: "silencio", nombre: "Escritura en silencio", para: "Que la primera opinión, o la del jefe, no condicione al resto.", como: "3–5 minutos escribiendo en pósits, una idea por pósit. Después se leen y se pegan.", frase: "Durante 4 minutos, escribid en silencio dónde creéis que se pierde más tiempo." },
    { id: "124", nombre: "1-2-4-todos", para: "Muchas ideas en un grupo grande.", como: "1 minuto solo, 2 en parejas, 4 en grupos de cuatro y puesta en común.", frase: "Primero un minuto cada uno, en silencio…" },
    { id: "semaforo", nombre: "Semáforo", para: "Validar rápido un borrador.", como: "Verde, ámbar o rojo por afirmación. Solo se debate ámbar y rojo.", frase: "Afirmación 3: … ¿Verde, ámbar o rojo?" },
    { id: "puntos", nombre: "Votación por puntos", para: "Priorizar entre muchas opciones.", como: "Tres puntos por persona para repartir. Se cuentan.", frase: "Tenéis tres puntos cada uno. Ponedlos donde creáis que hay más impacto." },
    { id: "punyo", nombre: "Puño a cinco", para: "Comprobar si una decisión tiene apoyo real.", como: "Cada uno muestra de 0 (bloqueo) a 5 (apoyo total). Con 0–2, se pregunta qué haría falta.", frase: "Del 0 al 5, ¿os representa este problema?" },
    { id: "pared", nombre: "Mapa en la pared", para: "Construir entre todos el recorrido real.", como: "Papel continuo, un pósit por paso, problemas en otro color.", frase: "¿Y después qué pasa? ¿Quién lo hace?" },
    { id: "ultima", nombre: "«La última vez que…»", para: "Bajar de lo general a lo real.", como: "Cuando alguien dice «normalmente», pide el último caso paso a paso.", frase: "Cuéntanos la última vez que pasó (sin datos del paciente)." },
    { id: "gemba", nombre: "Ir a ver (gemba)", para: "Ver el proceso donde ocurre.", como: "Recorrer el lugar de trabajo con quien lo hace, observando y preguntando.", frase: "¿Me enseñas cómo lo haces?" },
    { id: "aparcamiento", nombre: "Aparcamiento", para: "No perder temas que desvían la sesión.", como: "Una hoja visible con lo aparcado; al final se decide cuándo tratarlo.", frase: "Es importante; lo apunto aquí y lo vemos al final." },
    { id: "tiempo", nombre: "Tiempo visible", para: "Respetar los bloques.", como: "Alguien controla el tiempo y avisa 2 minutos antes del final de cada bloque.", frase: "Nos quedan dos minutos para este bloque." },
    { id: "cierre", nombre: "Cierre con responsables", para: "Que la sesión produzca acción.", como: "Últimos 10 minutos: cada acuerdo en voz alta con quién y para cuándo.", frase: "¿Quién se encarga? ¿Para cuándo?" }
  ],

  dificiles: [
    ["Alguien acapara", "Ronda o escritura en silencio. «Quiero oír también a quien no ha hablado.»"],
    ["Un jefe condiciona", "Escritura en silencio antes de que hable. Hablar con él antes de la sesión."],
    ["Silencio", "Aguantar 10 segundos. Reformular más concreto. Pasar a parejas."],
    ["Conflicto entre servicios", "Volver al paciente: «¿Qué le pasa al paciente en ese punto?». Registrar las dos versiones como «a comprobar con datos»."],
    ["«Eso ya lo intentamos»", "«¿Qué pasó? ¿Qué aprendimos?» Es información, no un obstáculo."],
    ["Saltan a soluciones", "Aparcamiento: «La guardamos para cuando entendamos el problema»."],
    ["«No hay recursos»", "Registrarlo como restricción: «Con lo que hay, ¿qué podríamos cambiar?»"]
  ],

  plantillas: {
    "ficha-proyecto": "Ficha del proyecto", "ficha-contexto": "Ficha de contexto", "boceto-proyecto": "Boceto del proyecto",
    "mapa-actores": "Mapa de actores", "guion-entrevista": "Guion de entrevista por rol", "notas-entrevista": "Notas de entrevista",
    "ficha-entrevista": "Ficha de entrevista", "situacion-partida": "Situación de partida", "guion-sesion": "Guion de sesión",
    "convocatoria": "Convocatoria", "acta-seguimiento": "Acta de seguimiento", "documento-lider": "Documento del líder",
    "tabla-proceso": "Tabla del proceso", "hoja-recogida-tiempos": "Hoja de recogida de datos", "tabla-brechas": "Tabla de brechas",
    "adaptacion-local": "Adaptación local del PAI"
  },

  imprimibles: { actores: "Mapa de actores", carriles: "Mapa por carriles", recogida: "Hoja de recogida", ishikawa: "Espina de pescado", matriz: "Matriz impacto-esfuerzo", semaforo: "Tarjetas del semáforo" }
};
