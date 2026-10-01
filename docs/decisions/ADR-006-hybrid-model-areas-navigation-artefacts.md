# ADR-006 — Modelo híbrido: áreas de razonamiento, navegación derivada, artefactos como proyecciones

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

El Core de CoraLEAN v0.1 usa un modelo de proyecto híbrido que separa tres conceptos:

1. **Áreas de razonamiento** — el modelo canónico, interno y no lineal del pensamiento de mejora. Las áreas tienen suficiencia, no posición.
2. **Suficiencia** — el estado real, basado en evidencia, de cada área. Categórica, con criterios observables y explicables. Sin puntuaciones numéricas ni porcentajes de progreso en el Core v0.1.
3. **Momentos de navegación** — pocas orientaciones simplificadas para la persona usuaria, derivadas de la suficiencia. Nunca son la fuente de verdad y deben ser recalculables cuando evidencia nueva reabre un área anterior.

Restricciones adicionales:

- La lógica del A3-thinking (LEI: proceso de pensamiento y disciplina de coaching, no una plantilla) puede inspirar el modelo interno, pero CoraLEAN no depende de un formulario A3 ni copia necesariamente sus secciones.
- Los artefactos — A3, mapas de proceso, planes de medición, registros PDSA, informes — son proyecciones del estado del proyecto, nunca el estado mismo.
- El número y los nombres de los momentos de navegación **no están congelados**; se resolverán solo después de fijar las áreas de razonamiento canónicas.
- La Preparación (Readiness) **no se asume** como un área de razonamiento ordinaria; puede ser una condición de entrada/transversal y se decidirá explícitamente.

## Contexto

METHOD_V0 propone un ciclo provisional de 10 fases con una condición de avance cada una; COCKPIT.md dibuja otra secuencia distinta con un porcentaje de progreso numérico. Ninguna de las dos se corresponde con cómo se comportan realmente las fuentes metodológicas: el Model for Improvement de IHI es explícitamente iterativo (tres preguntas fundamentales abordables en cualquier orden, revisadas a medida que el PDSA cambia el pensamiento; IHI, «Model for Improvement», ihi.org, consultado 2026-10-01), y el A3-thinking es descrito por LEI como un proceso de pensamiento utilizable sin el documento A3 y como una disciplina de coaching donde el líder pregunta en lugar de responder (LEI Lexicon, «A3», lean.org, consultado 2026-10-01). Un cursor de fases lineal no puede representar que una hipótesis refutada reabra la comprensión aguas arriba, ni el trabajo en paralelo, sin tratar el comportamiento normal como una excepción.

## Consecuencias

### Positivas

- Retroceder es normal: la suficiencia de un área baja cuando la evidencia la contradice; la navegación se recalcula.
- El freno anti-solución-prematura pasa a ser estructural (condiciones sobre la suficiencia de áreas) en lugar de una regla añadida.
- El corredor de fases del cockpit se convierte en una proyección de navegación; el porcentaje engañoso desaparece.
- Compatibilidad con A3, PDSA y el Model for Improvement sin quedar atado a ninguno.

### Negativas

- Dos niveles de vocabulario (áreas vs momentos de navegación) exigen disciplina de glosario.
- El runtime debe derivar la navegación a partir del estado; más exigente que almacenar un cursor de fases.
- La lista de fases de METHOD_V0 y el corredor de COCKPIT.md pasan a ser proyecciones/legacy conocidas; ambos documentos se revisarán cuando las áreas estén resueltas (deliberadamente no editados todavía).
