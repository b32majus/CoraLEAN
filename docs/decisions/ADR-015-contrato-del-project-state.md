# ADR-015 — Contrato del Project State: contenido, historia y disciplina de mutación

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

**Principio.** El estado es la fuente de verdad; la conversación es superficie de razonamiento. Si algo sólo existe en la conversación, aún no está persistido y no puede considerarse recuperable en futuras interacciones.

### Contenido mínimo (nueve bloques)

1. **Identidad y roles**: proyecto, Responsable local, Facilitador/a, Patrocinador/a (roles por persona).
2. **Estado del proyecto** (En preparación / Activo / Suspendido / Cancelado / Abandonado / Completado) con la razón de cada transición.
3. **Condiciones habilitantes**: criterios con estado y razones.
4. **Alcance y autoridad declarada** (necesarios para evaluar cambios fuera de autoridad y la proporcionalidad de las condiciones habilitantes).
5. **Áreas de razonamiento**: por área, sus criterios (definición y estado) y su relevancia. La suficiencia **no se almacena**: se deriva (ADR-008).
6. **Entidades transversales**: Hechos, Supuestos, Hipótesis (con estatus: propuesta / en prueba / aceptada / refutada / reformulada), Evidencia (con procedencia y relación soporta / debilita / refuta), Decisiones, Acciones, Reuniones, Artefactos, Aprendizajes y **Cuestiones abiertas**.
7. **Focos de decisión**: activos (varios) y foco principal de navegación cuando haya sido seleccionado explícitamente por la persona (ADR-012).
8. **Historia material**: registro de eventos con significado de dominio (ver abajo).
9. **Procedencia** (ver abajo).

### Snapshot actual + historia material (no event sourcing completo)

El Project State mantiene una **representación actual utilizable directamente**. Los **cambios materiales generan eventos históricos**; no se adopta event sourcing completo en Core v0.1.

Deben dejar evento, entre otros:

- creación, refutación o reformulación de una hipótesis relevante;
- sustitución de una decisión;
- cambio material de alcance;
- transiciones de estado del proyecto;
- reaperturas de áreas;
- autorizaciones relevantes.

Los cambios editoriales o correcciones sin significado de dominio **no** generan evento.

### Procedencia: autoría de registro ≠ autoría del contenido

Cuando aplique, el modelo distingue tres trazas y no las colapsa en una:

- **quién registró** el elemento;
- **quién lo aportó o afirmó** (persona, CoraLEAN, fuente externa);
- **cuál es su fuente evidencial/documental**.

No toda entidad necesita los tres campos, pero el modelo debe poder representarlos por separado.

### Intervención humana: tipo de evento, no entidad

La intervención humana se modela como **tipo de evento material** con actor, efecto y razón — no como entidad de primer nivel. Esto permite evaluar la transferencia de capacidad (ADR-005) sin duplicar el modelo. Se reabrirá si los pilotos muestran necesidad de elevarla a entidad.

### Clasificación de criterios relativa a la decisión

La clasificación de un criterio como **estrictamente necesario u ordinario es relativa a una decisión**, no propiedad absoluta del criterio. El estado separa:

- la **definición y estado del criterio** (bloque 5);
- la **evaluación de ese criterio para una decisión concreta**.

El mismo criterio puede ser ordinario para un pequeño experimento y estrictamente necesario para una adopción amplia.

### Derivados: nunca verdad primaria

Se persisten las decisiones y los focos activos, y el foco principal **cuando haya sido seleccionado explícitamente**. Permanecen **derivados** (recalculables, nunca almacenados como verdad primaria):

- el criterio pendiente más relevante;
- el foco principal *recomendado* por CoraLEAN, hasta que la persona lo acepte;
- el Momento de navegación;
- la siguiente acción recomendada.

Cuando una recomendación de siguiente acción se acepta, puede convertirse en una entidad **Acción**.

### Disciplina de mutación

1. Los cambios materiales se registran como eventos; los valores derivados se recalculan, nunca se editan a mano.
2. Sin sobrescritura de decisiones: una decisión posterior que la modifica es otro registro, no una reescritura.
3. La escritura está bajo contrato: CoraLEAN mantiene el estado según estas reglas; las transiciones con requisito de autorización humana esperan su validación.
4. Extraer a estado al cierre de cada interacción material es trabajo de Coraline.

### Aplazamiento explícito

La serialización física (Markdown / JSON / híbrido) queda **aplazada al Runtime Contract**. Este contrato es conceptual e independiente del formato.

## Contexto

Este ADR da casa a las obligaciones acumuladas por ADR-005 (procedencia de intervenciones), 006–008 (derivación), 010 (autoridad declarada), 011 (condiciones habilitantes y estados) y 012 (focos). La revisión separó snapshot de historia, procedencia en tres trazas, intervención humana como evento, clasificación de criterios relativa a decisión, y derivados no persistidos.

## Consecuencias

### Positivas

- Continuidad real entre conversaciones: foco, momento, bloqueos y siguiente paso reconstruibles sin releer el chat.
- Transferencia de capacidad evaluable por eventos de intervención humana.
- Correcciones sin contaminar la historia ni violar la disciplina de decisiones.

### Negativas

- Distinguir «cambio material» de «corrección editorial» exige criterio; se refina con el piloto.
- Sin event sourcing completo, la historia material depende de que el runtime capture bien los eventos (obligación para el Runtime Contract).
