# INFORME B — CONTRASTE ADVERSARIAL CON CORALEAN

## 0. Alcance y veredicto

Este informe contrasta el diseño ciego del **INFORME A** con el expediente oficial de CoraLEAN Core v0.1. El contraste no modifica ni reinterpreta retrospectivamente el Informe A: lo utiliza como línea base independiente.

El expediente demuestra un avance conceptual considerable: CoraLEAN ha abandonado un flujo lineal rígido, ha separado estado, navegación, entidades, suficiencia, procedencia y autoridad humana, y ha formulado una hipótesis explícita de validación mediante Acceptance Scenarios y pruebas Alpha.

Sin embargo, el expediente también muestra que la arquitectura operativa central sigue sin estar demostrada. El Core está congelado como diseño, pero el mecanismo físico de persistencia, la concurrencia, la experiencia real de usuario, la disponibilidad efectiva de capacidades de ChatGPT, la eficacia de las Skills y la transferencia longitudinal de capacidad permanecen sin ejecutar o sin probar. El mayor riesgo no es que el modelo conceptual sea pobre. Es que un modelo conceptual sofisticado se ejecute sobre una superficie conversacional incapaz de mantenerlo de forma fiable.

Mi veredicto es:

> CoraLEAN tiene un Core metodológico prometedor y más riguroso que una aplicación de formularios convencional, pero todavía es una hipótesis de runtime, no un producto validado. Debe conservar su disciplina semántica y probar inmediatamente si ChatGPT Project puede sostenerla. Si falla, el siguiente paso debería ser un núcleo estructurado y portable, no más instrucciones conversacionales.

El estado conocido debe mantenerse separado:

- **Decisiones congeladas:** ADR-005 a ADR-019 y el mapa de contratos del Core Freeze.
- **Diseño candidato:** `estado-proyecto.md`, `historia-material.md`, actualización física, uso de ChatGPT Project, Skills y posible cockpit.
- **Implementación no demostrada:** no se aporta evidencia de que el runtime ejecute fielmente las invariantes.
- **Pruebas no ejecutadas:** las 12 pruebas Alpha, S1–S14 y el piloto de Mérida aparecen como pendientes.
- **Estado de ramas:** `c485ec6` se presenta como Core Freeze; `0a6d992` contiene el plan de pruebas Alpha; la presencia remota del fixture asociado al commit local `81f9216` no está comprobada. Por tanto, no debe tratarse ese fixture como disponible para evaluación reproducible.

## 1. Fortalezas sustentadas del diseño

### 1.1 El expediente identifica correctamente el problema metodológico

`docs/PRODUCT_VISION.md` coincide sustancialmente con la hipótesis central del Informe A: el problema no es conocer nombres de herramientas como VSM, Fishbone o PDSA, sino saber qué preguntar, qué observar, qué medir, cuándo avanzar y cómo aprender.

Esto es una fortaleza porque evita construir una enciclopedia Lean disfrazada de producto. ADR-013 refuerza la decisión mediante un núcleo mínimo curado y crecimiento dirigido por necesidad real.

### 1.2 La transferencia de capacidad es el criterio correcto

ADR-005 y `docs/PILOT_MERIDA.md` no confunden que el proyecto salga bien con que el responsable local haya aprendido a conducirlo. El hecho de distinguir las intervenciones de Silvia de las de CoraLEAN permite medir si la mentora está transfiriendo capacidad o simplemente compensando las carencias del sistema.

S14 es especialmente valioso porque convierte la autonomía en un escenario longitudinal observable. Es una decisión más fuerte que medir satisfacción o número de documentos generados.

### 1.3 La eliminación del ciclo lineal es técnicamente acertada

ADR-006, ADR-007 y ADR-012 corrigen una debilidad frecuente: representar la mejora como una secuencia de fases irreversibles. Las áreas de razonamiento, la suficiencia derivada y la reapertura normal reflejan mejor el carácter iterativo de la investigación de problemas.

También es correcta la distinción entre:

- áreas de razonamiento;
- entidades transversales;
- momentos de navegación;
- artefactos como proyecciones.

Esta separación evita que un A3, un plan PDSA o un mapa de proceso se conviertan artificialmente en la verdad del proyecto.

### 1.4 La suficiencia evita la falsa precisión

ADR-008 rechaza porcentajes de progreso y sustituye la apariencia cuantitativa por tres niveles categóricos: no examinado, insuficiente para la decisión actual y suficiente para la decisión actual.

La decisión es sólida porque una misma área puede ser suficiente para experimentar y no ser suficiente para adoptar ampliamente un cambio. Esa proporcionalidad es mucho más defendible que una cifra como “62 % de diagnóstico”, criticada explícitamente en `docs/CORE_FREEZE_V0.1.md`.

### 1.5 La autoridad humana está mejor delimitada que en muchos sistemas de IA

ADR-010 distingue fuerza de una condición y requisito de autorización. Además, declara que CoraLEAN puede derivar el estado, pero nunca tiene autoridad organizativa.

La distinción entre “el modelo puede actualizarse” y “la organización puede ejecutar un cambio” es esencial. También es positiva la prohibición de convertir un experimento pequeño en una adopción automática.

### 1.6 La procedencia está modelada con suficiente ambición conceptual

ADR-015 diferencia:

- quién registró;
- quién aportó o afirmó;
- cuál es la fuente evidencial.

ADR-013, además, separa fuente, afirmación y tarjeta. Esto supera el patrón habitual de guardar una respuesta del LLM como si fuera conocimiento verificado.

### 1.7 El diseño reconoce las limitaciones de ChatGPT Project

ADR-002 y ADR-017 no presentan Project como infraestructura ya resuelta. Declaran que:

- la memoria del Project es contexto auxiliar;
- el estado explícito prevalece;
- la actualización in-place no está garantizada;
- la concurrencia es un riesgo;
- las pruebas Alpha deben decidir si la hipótesis es viable.

Esta honestidad es importante. El expediente no convierte una capacidad de producto en una garantía arquitectónica.

### 1.8 El alcance inicial de Skills es razonable

ADR-016 limita v0.1 a “Preparar reunión” y “Procesar reunión”, y exige que ambas propongan actualizaciones sin mutar directamente el estado. También exige fallback metodológico sin Skills.

La restricción reduce la superficie de fallo y evita construir desde el principio una mega-Skill que pretenda gobernar todo el método.

## 2. Hallazgos y riesgos prioritarios

| # | Hallazgo | Tipo y prioridad | Evidencia |
|---|---|---|---|
| 1 | El Core exige mutaciones fiables, pero el runtime físico de actualización sigue abierto. | Demostrado; crítico | ADR-015, ADR-017; `CORE_FREEZE_V0.1.md` |
| 2 | La concurrencia puede corromper la continuidad entre Silvia y la responsable local. | Hipotético explícito; crítico | ADR-017, pruebas Alpha 4 y 7 |
| 3 | El modelo de estado es conceptualmente más complejo que la interfaz de Project-first prevista. | Hipotético de alto riesgo; alto | ADR-006, ADR-008, ADR-012, ADR-015 |
| 4 | “Procesar reunión” puede fabricar estructura con apariencia de verdad aunque proponga no mutar. | Hipotético; crítico | ADR-016, escenarios S9 y S12 |
| 5 | La suficiencia derivada depende de criterios todavía provisionales y de una semántica de materialidad no resuelta. | Demostrado; alto | ADR-008, ADR-018, ADR-015 |
| 6 | El enfoque Project-first limita identidad, permisos y colaboración multiusuario. | Demostrado como alcance; alto | ADR-002, ADR-017, `OPEN_QUESTIONS.md` |
| 7 | La transferencia de capacidad todavía no tiene instrumento operacional completo. | Demostrado; alto | S14, `PILOT_MERIDA.md`, ADR-005 |
| 8 | El sistema puede producir burocracia aunque el diseño diga lo contrario. | Hipotético; medio-alto | ADR-007, ADR-008, ADR-018 |
| 9 | El cierre temporal del Core puede generar falsa sensación de producto terminado. | Demostrado documentalmente; alto | `CORE_FREEZE_V0.1.md` |
| 10 | La dependencia de capacidades específicas de ChatGPT amenaza portabilidad y adopción hospitalaria. | Hipotético con evidencia de incertidumbre; alto | ADR-002, ADR-017, `OPEN_QUESTIONS.md` |

### 2.1 Persistencia: el riesgo estructural principal

ADR-015 establece que el estado es la fuente de verdad y que la conversación no es recuperable por sí sola. Pero ADR-017 deja abierta la actualización física: reemplazo del snapshot, nueva fuente, Work u otro mecanismo.

Esto no es un detalle técnico. Es el contrato principal del producto. Si CoraLEAN no puede actualizar de manera controlada el estado, verificar la versión resultante y conservar la historia material, no está ejecutando el Core; está simulándolo mediante instrucciones.

La prueba de actualización física —Alpha 3— debe tener prioridad absoluta. No basta con que el modelo redacte un archivo correcto en una respuesta. Debe demostrarse que el siguiente chat recupera exactamente esa versión y que no existen duplicados ambiguos.

### 2.2 Concurrencia: el proceso manual no es una solución suficiente

ADR-017 reconoce que dos chats pueden partir del mismo snapshot y producir cambios incompatibles. La mitigación inicial prevista es evitar escrituras simultáneas.

Eso puede ser aceptable para una demostración individual, pero entra en tensión directa con el piloto: Silvia y la farmacéutica trabajan sobre el mismo proyecto y tienen funciones distintas. La disciplina “no escriban simultáneamente” es un procedimiento operativo frágil, no un control de integridad.

La prueba Alpha 7 debe comprobar al menos detección de versión obsoleta, rechazo de una escritura basada en estado antiguo y mecanismo claro de reconciliación. Si la plataforma no puede proporcionar ese comportamiento, el producto no debería afirmar que soporta colaboración compartida; debería limitarse explícitamente a un único escritor por turno.

### 2.3 Complejidad semántica frente a superficie conversacional

El Core distingue siete áreas, entidades, suficiencia, criterios, relevancia, focos múltiples, foco principal, momentos, decisiones, procedencia, eventos materiales y autorizaciones.

La riqueza es metodológicamente defendible, pero introduce una pregunta incómoda: ¿puede una conversación de Project mantener este modelo sin degradarlo?

El riesgo es que el LLM conserve el vocabulario en sus respuestas, pero pierda relaciones importantes:

- confundir un momento con una fase;
- convertir un foco recomendado en foco aceptado;
- tratar suficiencia como una propiedad permanente;
- olvidar que la clasificación estricta/ordinaria es relativa a una decisión;
- perder la diferencia entre experimento y adopción.

El diseño no necesita simplificarse todavía, pero debe demostrar que el modelo puede mantenerse con un conjunto pequeño de casos. Las pruebas S4, S5, S6, S8, S10 y S11 son más decisivas que una demo de conversación agradable.

### 2.4 Procesamiento de reuniones: riesgo de “normalización” abusiva

ADR-016 exige que “Procesar reunión” convierta notas en propuestas de hechos, hipótesis, decisiones, acciones y eventos. Esto es correcto en abstracto, pero la transformación de lenguaje ambiguo en estructura es precisamente el punto donde un LLM puede producir una falsa sensación de precisión.

S12 debe probar frases ambiguas, desacuerdos, silencios, ironía, atribuciones imprecisas y decisiones condicionales. El resultado aceptable no es una minuta perfectamente ordenada; es una propuesta que conserva la incertidumbre y obliga a confirmar lo que no puede saberse.

Si la interfaz muestra las propuestas con el mismo peso visual que el estado confirmado, el usuario puede aceptar por cansancio. El hecho de que la Skill no mute directamente el estado reduce el riesgo, pero no lo elimina.

### 2.5 Criterios provisionales y suficiencia derivada

ADR-018 marca correctamente los criterios P1–V2 como provisionales. Sin embargo, ADR-008 y ADR-010 ya hacen depender de esos criterios decisiones de suficiencia y avance.

Existe aquí una tensión: el comportamiento del sistema está parcialmente congelado antes de saber si los criterios generan burocracia, contradicciones o falsos bloqueos. El documento reconoce esta situación, pero el runtime podría presentar los criterios como reglas institucionales consolidadas.

La prioridad es registrar, por criterio, no solo si funciona, sino qué coste introduce, qué decisión cambia y qué falsos positivos o negativos produce. Un criterio que nunca cambia una decisión y solo añade campos debe eliminarse, aunque sea conceptualmente elegante.

### 2.6 Identidad y autoridad insuficientes para un entorno hospitalario compartido

ADR-002 y ADR-017 dejan autenticación y permisos fuera de v0.1. Esto es razonable para una prueba sintética individual, pero limita el alcance real del piloto.

El Core habla de roles, aprobación de rol y procedencia. El runtime Project-first no demuestra todavía cómo se autentica una persona, cómo se revoca su acceso, cómo se separan organizaciones o cómo se evita que una conversación vea información de otro proyecto.

No debe afirmarse que CoraLEAN es una solución hospitalaria compartida hasta resolverlo. Sí puede ser una herramienta experimental para información agregada y no identificable.

### 2.7 La transferencia de capacidad está bien declarada, pero insuficientemente instrumentada

S14 describe qué debería observarse, pero el expediente no aporta una rúbrica operacional completa para medir:

- qué intervención hizo la mentora;
- qué intervención hizo CoraLEAN;
- cuál fue el nivel de andamiaje;
- qué tarea completó autónomamente la responsable;
- si la mejora persistió en un segundo proyecto.

“Menos intervención” puede ser ambiguo: la mentora podría hablar menos porque el equipo abandonó, no porque haya aprendido. La métrica debe distinguir autonomía real de simple reducción de contacto.

### 2.8 Riesgo de burocracia semántica

El expediente intenta combatir la ceremonia con suficiencia proporcional y criterios provisionales. Aun así, cada observación puede tener fuente, procedencia, clasificación, relación, criterio, decisión, razón y evento.

El riesgo es que el usuario registre metadatos para satisfacer al sistema y no para pensar mejor. Este hallazgo es hipotético, pero debe medirse desde la primera interacción: tiempo de captura, campos omitidos, uso de notas externas y proporción de propuestas rechazadas por excesiva carga.

### 2.9 El freeze es un hito de diseño, no evidencia de funcionamiento

`CORE_FREEZE_V0.1.md` contiene una reconciliación documental valiosa, pero su lenguaje puede inducir a confundir “freeze completado” con “Core validado”.

El propio documento dice que los criterios no han sido tensionados, que las Alpha están pendientes, que el User Journey narrativo está pendiente y que el mecanismo de actualización es candidato. Por tanto, el freeze debe interpretarse como congelación de hipótesis de diseño para poder probarlas, no como cierre técnico.

### 2.10 Portabilidad real aún no demostrada

`PRODUCT_VISION.md` posiciona ChatGPT Project como primer runtime y deja el backend, MCP y plataforma independiente para después. Esta estrategia es rápida, pero la portabilidad está en el Core semántico, no todavía en la experiencia.

Si la operación depende de Project, Chat, Voice, Work y Skills disponibles “donde corresponda”, el Starter Kit puede no comportarse igual en instituciones o cuentas distintas. La prueba Alpha 10 debe registrar qué capacidades son imprescindibles y cuál es el fallback exacto cuando faltan.

## 3. Comparación arquitectónica

### A. Arquitectura del Informe A: núcleo determinista y aplicación portable

La arquitectura A proponía comenzar con una aplicación web guiada, núcleo metodológico determinista, base relacional, auditoría append-only, exportación y adaptadores opcionales de IA.

**Experiencia:** más formularios y estructura visible; menor naturalidad conversacional inicial.

**Coste relativo:** mayor coste inicial de construcción; menor dependencia de costes recurrentes y de capacidades de un proveedor.

**Complejidad:** alta al principio por identidad, permisos, estado y UI; complejidad más controlable después.

**Portabilidad:** alta. Puede funcionar en entornos cerrados y con diferentes proveedores.

**Adopción hospitalaria:** potencialmente mejor a medio plazo, porque permite single-tenant, identidad institucional y límites de datos. Sin embargo, exige apoyo técnico y patrocinio más temprano.

### B. CoraLEAN Project-first

La arquitectura B ejecuta primero el Core dentro de ChatGPT Project, con instrucciones, Skills, Chat, Voice, Work y estado estructurado en archivos Markdown.

**Experiencia:** rápida, conversacional y adecuada para explorar cómo debe razonar el sistema. Es probablemente la mejor superficie para descubrir preguntas, lenguaje y fricción.

**Coste relativo:** bajo coste inicial de infraestructura, aunque existe dependencia de licencias, disponibilidad de funciones y costes de proveedor no cuantificados en el expediente.

**Complejidad:** baja para empezar, alta para mantener invariantes y persistencia dentro de un entorno que no fue diseñado necesariamente como base de datos colaborativa.

**Portabilidad:** baja o media. El Core conceptual es portable; el runtime y las instrucciones no necesariamente.

**Adopción hospitalaria:** buena para pilotos sintéticos o agregados donde ya exista acceso aprobado, pero limitada para organizaciones con entornos cerrados, requisitos de identidad o restricciones sobre SaaS externo.

B es la mejor arquitectura de descubrimiento, no necesariamente la mejor arquitectura de producto.

### C. Arquitectura híbrida: Project-first con núcleo estructurado exportable

La alternativa híbrida conservaría B como interfaz de experimentación, pero impondría desde el primer piloto una representación estructurada independiente del chat y una ruta de salida clara:

- Project como interfaz conversacional;
- estado canónico con esquema verificable;
- validación externa o local de invariantes;
- exportación completa;
- identificador de versión;
- un solo escritor o control explícito de conflictos;
- adaptador posterior hacia una aplicación o backend.

**Experiencia:** conserva velocidad y naturalidad de B, pero añade una pequeña fricción para confirmar y versionar cambios.

**Coste relativo:** intermedio. Más que B, mucho menos que construir A completa.

**Complejidad:** intermedia, centrada en el contrato de estado y la reconciliación.

**Portabilidad:** superior a B, aunque inferior a A hasta que exista una interfaz independiente.

**Adopción hospitalaria:** mejor que B para pilotos controlados; todavía no sustituye identidad y permisos institucionales.

La opción C es la recomendada para las próximas 4–6 semanas. Si no puede implementarse sin herramientas externas adicionales, debe reducirse a un protocolo manual de versionado claramente documentado, no fingir persistencia automática.

## 4. Rediseño contrafactual desde cero

Si no existiera el expediente, conservaría del Informe A:

- el núcleo metodológico independiente de la IA;
- la separación entre hechos, hipótesis, evidencia, decisiones, acciones y aprendizajes;
- la autoridad humana;
- el enfoque en autonomía;
- el modo sin IA;
- el piloto con criterios de abandono.

Conservaría de CoraLEAN:

- áreas de razonamiento no lineales;
- suficiencia derivada;
- experimentación distinta de adopción;
- procedencia en varias trazas;
- navegación como proyección;
- Skills que proponen, pero no mutan;
- escenarios S1–S14 como tribunal inicial.

Cambiaría:

1. **El orden de validación.** Primero demostraría persistencia, versionado y lectura en frío; después probaría calidad conversacional.
2. **La unidad de estado.** Mantendría snapshot e historia, pero con identificadores de versión y esquema mínimo validable fuera del LLM.
3. **La colaboración.** Declararía explícitamente “un escritor por proyecto” en Alpha o construiría detección de conflictos antes de permitir dos usuarios.
4. **La evaluación.** Añadiría métricas de fidelidad del estado: campos perdidos, relaciones inventadas, eventos omitidos y discrepancias entre propuesta y confirmación.
5. **El alcance hospitalario.** No hablaría de adopción institucional hasta resolver identidad, aislamiento y exportación.
6. **La interfaz.** Mantendría chat para razonamiento, pero añadiría una vista mínima de estado y decisiones pendientes, aunque no sea todavía un cockpit completo.

No construiría todavía:

- backend multiusuario general;
- MCP;
- integración profunda con Teams;
- agentes autónomos;
- catálogo exhaustivo;
- cockpit visual sofisticado;
- análisis estadístico avanzado;
- aplicación móvil;
- automatización de autorizaciones.

## 5. Plan de MVP de 4–6 semanas y experimentos falsables

### Semana 1: contrato mínimo y línea base

Definir el esquema mínimo del estado, versión, procedencia y confirmación. Seleccionar un proyecto sintético y uno de Mérida sin datos identificables. Medir cómo trabaja hoy la responsable y cuánto interviene Silvia.

### Semana 2: lectura y escritura controladas

Ejecutar Alpha 1–4:

- lectura en frío;
- persistencia;
- actualización física;
- duplicados y versiones.

Criterio de falsación: si un chat nuevo no reconstruye correctamente estado, foco, cuestiones abiertas y siguiente paso en al menos la mayoría de casos previamente definidos, Project-first queda invalidado como runtime canónico.

### Semana 3: invariantes y clasificación

Ejecutar S1–S8 con entradas adversariales. Medir:

- soluciones prematuras;
- hipótesis convertidas erróneamente en hechos;
- adopciones permitidas indebidamente;
- reaperturas perdidas;
- bloqueos falsos.

Criterio de falsación: un solo fallo crítico que permita declarar adopción sin evidencia proporcional o transforme una afirmación ambigua en hecho confirmado invalida el flujo hasta corregirse.

### Semana 4: reuniones y modos

Ejecutar S9, S12 y Alpha 9–11 con Chat, Voice, Work y ausencia de Skills. Comparar propuestas del sistema con una revisión humana ciega.

Criterio de falsación: si el fallback sin Skill cambia el método o pierde sistemáticamente procedencia y conflictos, la equivalencia metodológica declarada no está demostrada.

### Semana 5: piloto controlado

Aplicar el flujo a Mérida. Registrar tiempos, abandonos, ayudas, intervenciones de Silvia, decisiones preparadas por la responsable y discrepancias del estado.

### Semana 6: S14 y decisión

Evaluar transferencia longitudinal. Continuar solo si:

- la responsable completa progresivamente más trabajo sin rescate;
- la calidad metodológica no cae;
- el estado permanece recuperable;
- la carga no supera el beneficio.

## 6. Cinco decisiones prioritarias

1. **¿Cuál es el mecanismo canónico de persistencia y versionado?** Debe resolverse antes de ampliar funcionalidades.
2. **¿Se permite colaboración simultánea?** Si no, declararlo y diseñar el proceso de un escritor por turno.
3. **¿Qué significa exactamente autonomía medible?** Crear una rúbrica operacional antes del piloto.
4. **¿Cuál es el estado mínimo estructurado?** Reducirlo al conjunto necesario para validar continuidad, no implementar todo el modelo conceptual de una vez.
5. **¿Qué resultado obliga a abandonar Project-first?** Definir anticipadamente la reversal condition con fallos observables, no con impresiones.

## 7. Separación de reglas, semántica, LLM, humano y estado

La arquitectura debe quedar así:

| Capa | Responsabilidad |
|---|---|
| Reglas deterministas | Validar invariantes, permisos, estados, autorizaciones requeridas, versionado y condiciones estrictas |
| Semántica de dominio | Áreas, entidades, criterios, suficiencia, focos, momentos, procedencia y eventos |
| LLM | Preguntar, resumir, clasificar como propuesta, detectar contradicciones y preparar borradores |
| Humano | Confirmar hechos, aceptar hipótesis, autorizar cambios, interpretar resultados y decidir adopción |
| Estado estructurado | Fuente de verdad versionada, con snapshot, historia material, procedencia y conflictos visibles |

La regla decisiva es:

> El LLM puede proponer una mutación; no puede hacer que la mutación sea verdadera.

El estado no debe vivir exclusivamente en el chat. La conversación puede ser la superficie de razonamiento, pero la verdad del proyecto debe poder inspeccionarse, versionarse, exportarse y reconciliarse sin releer toda la conversación.

## Conclusión

CoraLEAN ha tomado decisiones de diseño difíciles y, en varios puntos, correctas. Su mejor contribución es tratar la mejora como razonamiento disciplinado con autoridad humana, no como generación de documentos. Su mayor debilidad es que todavía depende de demostrar que una superficie conversacional puede ejecutar ese modelo sin perder estado, procedencia ni control.

La recomendación es continuar, pero con un objetivo estrecho: demostrar continuidad fiable y transferencia de capacidad. No añadir más Core, más Skills ni más cockpit antes de ejecutar las pruebas Alpha y los escenarios críticos.

El resultado aceptable del MVP no es “CoraLEAN responde bien”. Es:

> una persona puede recuperar el estado, entender qué está demostrado, saber qué debe hacer después, actualizar el proyecto sin corromperlo y tomar mejores decisiones con menos intervención de la mentora.