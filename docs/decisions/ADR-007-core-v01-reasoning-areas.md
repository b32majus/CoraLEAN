# ADR-007 — Áreas de razonamiento canónicas del Core v0.1 (siete áreas)

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

El Core v0.1 define exactamente siete áreas de razonamiento (según el modelo híbrido, ADR-006):

1. **Problema y contexto** — qué problema merece resolverse, por qué, para quién, con qué límites.
2. **Situación actual** — cómo ocurre realmente el trabajo hoy: pasos, demanda, roles, interfaces, información, restricciones, variabilidad, contexto.
3. **Objetivo y medidas** — qué resultado se busca y cómo se reconocerá la mejora (medidas de resultado, de proceso y de equilibrio).
4. **Comprensión causal** — qué está generando el problema; hipótesis con estatus explícito (entidad), la comprensión es el área.
5. **Estrategia de cambio** — qué cambio merece la pena probar y por qué; contramedidas ligadas a causas, priorizadas.
6. **Experimentación y adopción** — qué se ha probado y qué está justificado adoptar; probar e implementar son estructuralmente distintos.
7. **Evaluación y sostenibilidad** — si los cambios adoptados se mantienen en el tiempo; degradaciones y efectos no deseados; produce entidades de Aprendizaje.

Reglas permanentes:

- Evidencia, Hipótesis, Decisión, Acción, Reunión, Artefacto y Aprendizaje son **entidades** transversales, no áreas. Las áreas son preguntas en trabajo; las entidades son lo que esas preguntas usan o producen.
- «Situación actual» sustituye deliberadamente a «proceso actual»: el área cubre demanda, roles, interfaces, información, restricciones y variabilidad, no solo pasos del proceso.
- **Experimentar ≠ Adoptar**: una prueba local exitosa no convierte el cambio en estándar implementado. Esta distinción es estructural, no procedimental.
- El Aprendizaje es una entidad producida por Evaluación y sostenibilidad, nunca un área.
- Los niveles de suficiencia por área **todavía no están definidos** (decisión posterior; ver ADR-008 y la escala común). Sin puntuaciones numéricas (ADR-006).

## Contexto y pruebas de estrés

El conjunto fue sometido a prueba de estrés antes de aceptarse:

- **Problema trivial con causa directamente observable**: varias áreas pueden alcanzar suficiencia en una sola conversación usando la misma observación. Las áreas exigen suficiencia, no volumen de trabajo — sin burocracia forzada.
- **Buen diagnóstico sin línea base cuantitativa**: Objetivo y medidas debe poder reconocer categóricamente «medidas definidas, línea base no disponible con razón documentada» — señalado para la decisión de niveles (posible estructura de facetas/criterios dentro de un área).
- **PDSA local exitoso con efecto adverso aguas abajo**: la evidencia nueva reabre Situación actual y/o Comprensión causal mientras Experimentación y adopción había madurado — el modelo no lineal lo maneja como comportamiento normal.
- **Mejora adoptada que se degrada al cabo de un mes**: Evaluación y sostenibilidad detecta la degradación y reabre áreas aguas arriba; un cursor de fases habría declarado el proyecto completado. Es el argumento más fuerte para mantener Evaluación y sostenibilidad separada de Experimentación y adopción.

No se encontró ningún par de áreas que siempre se moviera junto; las fusiones candidatas (Situación actual ↔ Comprensión causal; Estrategia de cambio ↔ Experimentación y adopción) fueron examinadas y descartadas. Convenciones de frontera: la evaluación de una prueba pertenece a Experimentación y adopción; la evaluación de la realidad adoptada pertenece a Evaluación y sostenibilidad.

## Consecuencias

### Positivas

- La distinción observación/interpretación es estructural (Situación actual vs Comprensión causal, con la Evidencia como entidad).
- La distinción prueba/implementación es estructural.
- Reabrir con evidencia nueva es comportamiento normal, no una excepción.

### Negativas

- Siete áreas son más estado que mantener por proyecto; la guía del runtime deberá mantener estado detallado solo para las áreas activas (se aborda en el contrato de runtime).
- La frontera entre Experimentación y adopción vs Evaluación y sostenibilidad exige uso disciplinado; queda definida arriba y debe respetarse en el comportamiento de coaching.
- METHOD_V0 y COCKPIT.md todavía describen el corredor de fases heredado; ambos se revisarán ahora que las áreas están fijadas.
