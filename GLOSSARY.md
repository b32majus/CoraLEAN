# CoraLEAN

CoraLEAN es un sistema de coaching de mejora basado en metodología (Lean Sanitario / Mejora de la Calidad). Este glosario contiene el vocabulario canónico del Core de CoraLEAN: qué es el sistema, quién lo usa y cómo se comporta.

## Lengua canónica

El vocabulario de producto y dominio es **español** (ADR-009). Los métodos y fuentes con nombre propio conservan su denominación original (PDSA, A3, Model for Improvement). Los identificadores técnicos futuros (código/API) pueden estar en inglés sin alterar este vocabulario. Los términos ingleses entre paréntesis son solo trazabilidad, nunca nombres primarios.

## Lenguaje

### Personas y roles

**Rol**:
Lo que una persona es responsable de hacer en un proyecto de mejora concreto. Los roles (Responsable local del proyecto, Facilitador/a, Patrocinador/a, Miembro del equipo) son propiedades de la persona-en-el-proyecto y son independientes de cómo CoraLEAN interactúa con ella.
_Evitar_: tipo de usuario, persona (anglicismo), perfil

**Responsable local del proyecto** (Project Lead):
La persona responsable de liderar el proyecto de mejora sobre el terreno. Usuario primario del Core de CoraLEAN. Puede ser experimentado o inexperto; su nivel de experiencia es contexto que ajusta el andamiaje, no su identidad.
_Evitar_: dueño del proyecto, campeón, líder (en lenguaje formal del Core)

**Facilitador/a** (mentor/a):
Profesional de la mejora con experiencia que apoya al Responsable local del proyecto y al equipo. También puede usar CoraLEAN directamente (normalmente en modo Experto). La facilitación humana es distinta del comportamiento de CoraLEAN y debe permanecer distinguible en los registros del proyecto.
_Evitar_: coach (refiriéndose a la persona humana), supervisor/a

**Patrocinador/a** (Sponsor):
La persona con autoridad y recursos que hacen posible el proyecto de mejora. Distinto del Responsable local del proyecto; una misma persona puede asumir ambos roles, pero son conceptos distintos.
_Evitar_: jefe, padrino

### Modos de interacción

**Modo**:
Cómo interactúa CoraLEAN con una persona: la cantidad de andamiaje que aplica. Propiedad de la interacción, nunca del rol de la persona. Todos los modos exigen el mismo rigor metodológico y las mismas condiciones de avance.
_Evitar_: nivel, perfil, tier

**Guiado** (Guided):
Modo con andamiaje máximo, para personas con poca o nula experiencia liderando proyectos de mejora. Es el modo de referencia: el comportamiento del Core se define en Guiado, y los demás modos son reducciones de andamiaje sobre él.
_Evitar_: modo principiante, modo tutorial

**Colaborativo** (Partner):
Modo para personas con alfabetización metodológica básica: razonamiento, challenge y calidad de decisiones, sin explicaciones innecesarias. Una reducción del andamiaje de Guiado, no un método aparte.
_Evitar_: usar la palabra inglesa «Partner» como nombre primario; «modo igual-a-igual» (describe la relación, no una ausencia de rigor)

**Experto** (Expert):
Modo con pedagogía mínima y alta densidad de información, para profesionales de la mejora con experiencia, incluyendo revisión metodológica adversarial. Sujeto a las mismas condiciones de avance y estándares de evidencia. Puede avanzar con supuestos provisionales explícitos y de bajo riesgo; un supuesto jamás se convierte en Hecho sin evidencia.
_Evitar_: modo sin frenos, modo bypass, «asume lo no dicho»

**Núcleo invariable**:
Las reglas idénticas en todos los modos: condiciones de avance, invariante de suficiencia, disciplina de estado y procedencia, freno anti-solución-prematura, reapertura por evidencia, separación Hecho/Hipótesis/Evidencia/Decisión/Supuesto, siguiente paso + razón siempre recuperables, y el mismo umbral de challenge. El modo está subordinado a este núcleo; no existe comportamiento de modo que lo contradiga.
_Evitar_: «modo que salta condiciones»

**Modo preferido**:
Modo asociado a una persona (persistible si el runtime lo permite), con posibilidad de override para una interacción concreta. Si no existe preferencia conocida, el valor por defecto es Guiado. El modo es de la persona/interacción, nunca del proyecto.
_Evitar_: «proyecto Experto»

### Unidades de producto

**CoraLEAN Core**:
El producto intelectual reutilizable: metodología, gobernanza, lógica de avance, condiciones de avance, reglas pedagógicas, comportamiento por modo, esquemas e instrucciones de arranque. Independiente de cualquier runtime.
_Evitar_: «el método» (cuando se nombra el producto), la plataforma

### Modelo del Core (razonamiento del proyecto)

**Principio — áreas vs entidades**:
Las áreas de razonamiento son preguntas en trabajo; las entidades (Evidencia, Hipótesis, Decisión, Acción, Reunión, Artefacto, Aprendizaje) son lo que esas preguntas usan o producen. Las áreas no son contenedores de entidades, y las entidades no son áreas.

**Área de razonamiento** (Reasoning Area):
Dominio canónico del pensamiento de mejora. Modelo interno, no lineal, del Core: las áreas tienen suficiencia, no posición. No existe un orden canónico en que deban visitarse.
_Evitar_: fase, paso, etapa (refiriéndose al modelo interno)

Core v0.1 define exactamente siete áreas de razonamiento:

**Problema y contexto**:
El área que establece qué problema merece resolverse, por qué importa, para quién y con qué límites.

**Situación actual**:
El área que establece cómo ocurre realmente el trabajo hoy: pasos, demanda, roles, interfaces, información, restricciones, variabilidad y contexto — no solo los pasos del proceso.
_Evitar_: proceso actual (demasiado estrecho), mapa de proceso (eso es un artefacto)

**Objetivo y medidas**:
El área que establece qué resultado se busca y cómo se reconocerá la mejora, incluyendo medidas de resultado, de proceso y de equilibrio (balancing).

**Comprensión causal**:
El área que establece qué está generando el problema: hipótesis con estatus explícito, contrastadas con evidencia y aceptadas, refutadas o reformuladas. La hipótesis es una entidad; el área es la comprensión.
_Evitar_: diagnóstico (ambiguo), «área de hipótesis»

**Estrategia de cambio**:
El área que establece qué cambio merece la pena probar y por qué: opciones de contramedida ligadas a causas, priorizadas con criterios explícitos.

**Experimentación y adopción**:
El área que establece qué se ha probado y qué está justificado adoptar: pruebas (estilo PDSA) y sus resultados, separadas estructuralmente de las decisiones de implementación/estandarización. Una prueba que funcionó no es todavía un estándar adoptado.

**Evaluación y sostenibilidad**:
El área que establece si los cambios adoptados se mantienen en condiciones reales a lo largo del tiempo, detecta degradaciones y efectos no deseados, y produce entidades de Aprendizaje.
_Evitar_: «área de aprendizaje» (el Aprendizaje es una entidad)

**Suficiencia**:
La condición derivada y explicable de cada área de razonamiento — nunca una etiqueta que el agente actualiza a mano. Su fuente de verdad son los criterios observables del área, la evidencia y procedencia que los apoya, y el estatus de las entidades relevantes. Suficiencia significa **suficiencia para la decisión actual**, no completitud.

Escala común canónica (tres niveles):

1. **No examinado** — el área no ha sido trabajada sistemáticamente (puede haber conocimiento incidental).
2. **Insuficiente para la decisión actual** — se ha trabajado pero no alcanza, o la suficiencia no está establecida, para la decisión en curso.
3. **Suficiente para la decisión actual** — con base documentada (criterios + evidencia + estatus de entidades).

«En progreso» puede usarse como lenguaje de interfaz, pero no es término canónico del modelo. La **relevancia** («no aplicable todavía») es una dimensión separada de la escala, no un cuarto nivel. Categórica; el Core v0.1 no usa puntuaciones ni porcentajes. La representación visual simultánea de suficiencia, bloqueos, reaperturas y relevancia se decidirá al diseñar el cockpit.
_Evitar_: madurez (como concepto primario), porcentaje de progreso, % completado, completitud, «en progreso» (como término canónico)

**Criterio**:
Condición observable y explicable dentro de un área de razonamiento, usada para derivar su suficiencia. Los criterios pendientes permanecen visibles en el estado con su razón. Frente a la decisión actual, un criterio es **estrictamente necesario** u **ordinario**: un criterio necesario incumplido impide derivar el área como Suficiente hasta reevaluar su relevancia; un criterio ordinario no bloquea y se registra con su razón. Un criterio que no puede cumplirse porque la información no existe o no puede obtenerse se registra con esa razón y se evalúa frente a la decisión actual. Los criterios no son sub-suficiencias: hay una sola suficiencia derivada por área. Los criterios concretos tienen estatus: **semilla** (provisional) o **canónico** (validado por escenarios de aceptación y/o uso real); la clasificación necesario/ordinario nunca es estática.
_Evitar_: faceta, sub-nivel, ítem de checklist (como estado oculto), «criterio necesario» como propiedad fija

**Reapertura** (Reopen):
Transición causada por evidencia nueva que pone en cuestión la base de un área. Tras una reapertura, la suficiencia del área se vuelve a derivar de sus criterios y entidades. La reapertura es un evento, nunca un nivel.
_Evitar_: «reabierto» (como nivel), regresión

**Momento de navegación**:
Orientación simplificada para la persona usuaria (dónde estamos, qué toca ahora), derivada del Project State, nunca almacenada como verdad primaria. Regla de derivación: foco principal de decisión → criterios requeridos → criterio pendiente más relevante → momento. Vocabulario cerrado de seis momentos: **Preparando el proyecto · Entendiendo el problema · Entendiendo por qué ocurre · Eligiendo qué probar · Probando y adoptando cambios · Evaluando y sosteniendo la mejora**. Un proyecto puede tener varios focos de decisión activos; el foco principal de navegación es uno (elegido por la persona o recomendado por CoraLEAN). Momento ≠ fase: puede haber trabajo de varias áreas simultáneamente y no hay obligación de visitar todos los momentos.
_Evitar_: fase, etapa, paso del ciclo (como estado almacenado); mapeo estructural área→momento

**Artefacto**:
Salida estructurada generada a partir del estado del proyecto (A3, mapa de proceso, plan de medición, registro PDSA, informe). Un artefacto es una proyección del estado, nunca el estado mismo.
_Evitar_: entregable (cuando se refiere al estado), «el registro»

### Conocimiento

**Fuente**:
Documento, organización, URL, fecha y metadatos de referencia. No es conocimiento en sí; es la referencia que respalda afirmaciones.
_Evitar_: «biblioteca», corpus

**Afirmación** (bloque de conocimiento):
Idea concreta susceptible de respaldo. Es la unidad de verificación: cada afirmación lleva su fuente y su estado de verificación propios.
_Evitar_: hecho (confusión con la entidad local del proyecto)

**Tarjeta de conocimiento**:
Síntesis CoraLEAN en redacción propia que agrupa y estructura varias afirmaciones, con sus reglas de aplicación (cuándo es útil, cuándo no, limitaciones, alternativas). No tiene verificación propia: su trazabilidad es la de sus afirmaciones. Las asociaciones con áreas y momentos son metadatos orientativos, nunca mapeos estructurales.
_Evitar_: ficha de catálogo, plantilla de herramienta

**Capa de conocimiento**:
Conjunto de tarjetas, afirmaciones y fuentes de CoraLEAN. Núcleo mínimo curado (lo que Core v0.1 necesita para comportarse correctamente) más crecimiento dirigido por necesidad real de proyectos. Nunca corpus copiado de fuentes (ADR-004, ADR-013).
_Evitar_: biblioteca Lean, enciclopedia

**Condición de avance** (gate):
Condición que determina si una decisión puede considerarse válida; se evalúa sobre los criterios, la evidencia y el estatus de las entidades del área correspondiente, y su resultado se registra con su razón. Tiene dos ejes: la **fuerza** y el **requisito de autorización humana** (ver abajo).
_Evitar_: puerta, gate (como palabra primaria), checkpoint

**Condición estricta**:
Condición cuya falta invalida la decisión correspondiente. Una razón registrada no la salta; la única salida es cumplirla o reevaluar la relevancia del criterio.

**Condición asesorada**:
Condición ante cuya falta CoraLEAN advierte y el avance puede continuar con razón documentada (la razón es estado).

**Requisito de autorización humana**:
Eje de toda condición de avance que define quién valida: **sin validación adicional** (CoraLEAN deriva el estado o la elegibilidad desde el Project State; la ejecución de cambios reales sigue siendo humana), **validación humana explícita** (confirmación de una persona) o **aprobación de rol** (aprobación de un rol concreto: Responsable local del proyecto, Patrocinador/a u otro competente). CoraLEAN nunca tiene autoridad organizativa.
_Evitar_: «derivable» como sinónimo de autorizado para decidir en el mundo real

**Invariante de suficiencia**:
Regla de derivación del estado (no una decisión del proyecto): un área no puede derivarse Suficiente mientras exista un criterio estrictamente necesario incumplido. Las reglas de transición del proyecto (completado, abandonado, suspendido, cancelado) son de la misma clase: requisitos del estado, no condiciones sobre decisiones.
_Evitar_: confundir reglas de transición del estado con condiciones sobre decisiones

### Proyecto

**Condiciones habilitantes del proyecto**:
Conjunto transversal de condiciones que un proyecto debe cumplir para activarse y mantenerse viable: autoridad y apoyo suficientes para su alcance, y proporcionalmente equipo, tiempo protegido, acceso a datos y capacidad de observación, según alcance, riesgo y complejidad. No son un Área de razonamiento; viven a nivel de proyecto y se reevalúan cuando cambian. La fuerza de su degradación depende del criterio y de la decisión afectada.
_Evitar_: área de preparación, fase 0, requisitos universales (patrocinador, etc.)

**Preparación**:
Término de interacción con el usuario para el trabajo sobre las Condiciones habilitantes del proyecto: antes de activar el proyecto y cuando su viabilidad se reevalúa.
_Evitar_: Readiness (como palabra primaria)

**Estado del proyecto**:
Clasificación transicional del proyecto como un todo: En preparación, Activo, Suspendido, Cancelado, Abandonado, Completado. Las transiciones son reglas de transición del estado (con validación humana y, en su caso, razón registrada), no decisiones del proyecto ni áreas.
_Evitar_: fase del proyecto, ciclo de vida como corredor

**Evento material**:
Cambio con significado de dominio que deja registro histórico en el Project State (hipótesis creada/refutada/reformulada, decisión sustituida, cambio material de alcance, transición de estado del proyecto, reapertura, autorización relevante, intervención humana — con actor, efecto y razón). Las correcciones editoriales sin significado de dominio no generan evento.
_Evitar_: event sourcing completo (no adoptado en Core v0.1), log de telemetría conversacional

**Procedencia**:
Trazabilidad de una entrada del estado, que puede distinguir sin colapsarse: quién registró, quién aportó o afirmó, y cuál es su fuente evidencial/documental.
_Evitar_: «autor» como campo único

**Derivado**:
Valor recalculable desde el estado, nunca verdad primaria: Momento de navegación, criterio pendiente más relevante, foco principal recomendado (hasta que la persona lo acepte), siguiente acción recomendada. Una recomendación aceptada puede convertirse en entidad Acción.
_Evitar_: almacenar derivados como verdad

**Cuestión abierta**:
Pregunta explícita pendiente del proyecto, entre las entidades transversales que el estado persiste.
_Evitar_: TODO, duda implícita en el chat

### Procedimientos empaquetados

**Playbook**:
Conocimiento de aplicación: heurísticas, métodos, preguntas y fuentes sobre cómo suele abordarse una situación. Informa a las Skills y al Core, pero no contiene gobernanza.
_Evitar_: «el manual», recetario

**Skill**:
Protocolo operativo reutilizable y acotado que ejecuta una tarea usando Core + Playbook + conocimiento. Puede contener procedimiento y recursos propios, pero nunca autoridad ni reglas metodológicas que contradigan o sustituyan al Core. Sin la Skill, el mismo procedimiento debe ejecutarse con equivalencia metodológica desde el Core. Core v0.1 congela dos: Preparar reunión y Procesar reunión.
_Evitar_: «la Skill lo decide», mega-Skill, Skill como proyección literal del Core

**Interacción material**:
Intercambio con significado de dominio: crea, modifica o decide algo que debe persistirse. Es la unidad de arranque/cierre del protocolo de estado (consultar estado al empezar; extraer cambios durables al terminar). Los intercambios sin significado material no actualizan estado.
_Evitar_: actualizar estado por mensaje

**Memoria del Project**:
Contexto auxiliar que el runtime puede aportar desde otras conversaciones del proyecto. Nunca es fuente de verdad: el Project State explícito prevalece siempre.
_Evitar_: tratar recuerdos del runtime como estado canónico
