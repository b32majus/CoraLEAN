# ADR-018 — Criterios: estructura congelada, conjunto semilla provisional y política de evolución

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Congelado en Core v0.1 (estructura y semántica de criterios)

- Qué es un criterio: condición observable y explicable dentro de un área de razonamiento (ADR-008).
- Cómo se evalúa: con estado (cumplido / pendiente con razón / no-obtenible con razón) y razón registrada.
- Cómo se vincula a una decisión: la clasificación **estrictamente necesario / ordinario pertenece a la evaluación del criterio frente a una decisión concreta**, nunca a una propiedad estática del criterio (ADR-015). El catálogo define *qué comprobar*; la evaluación frente a la decisión define *cuánto importa ahora*.
- Cómo participa en la suficiencia: `Suficiente para la decisión actual` sólo puede derivarse **contra criterios registrados**, con el invariante de suficiencia (criterio estrictamente necesario incumplido → no hay suficiencia, solo reevaluación de relevancia).
- Cómo registra evidencia, razón e incertidumbre: cada criterio enlaza con las entidades que lo apoyan.

## Conjunto semilla provisional (marcado como PROVISIONAL)

1–3 criterios nucleares por área; suficientes para demostrar que el modelo funciona, no para dar por terminada la metodología. Mayor profundidad inicial en Situación actual, Objetivo y medidas y Comprensión causal (áreas críticas para el arranque de Mérida).

**Problema y contexto**
- P1 — El problema está formulado como brecha entre situación actual y deseada, con relevancia explícita para alguien.
- P2 — El alcance (qué entra y qué no) y el contexto organizativo son explícitos y comprendidos.

**Situación actual**
- S1 — El funcionamiento real está observado/representado de forma que el equipo lo reconoce como creíble (no solo la versión oficial).
- S2 — La variabilidad relevante y las interfaces/handoffs con otros procesos o roles están identificadas.
- S3 — La información disponible es suficientemente fiable para la decisión que se quiere tomar.

**Objetivo y medidas**
- O1 — El resultado esperado está definido en términos que permiten reconocer si se logra.
- O2 — Existe una forma identificada de saber si la situación mejora o empeora (medidas candidatas, aunque no todas tengan datos).
- O3 — Las medidas distinguen, al menos en intención, resultado, proceso y efectos en otros puntos (equilibrio).

**Comprensión causal**
- C1 — Las explicaciones relevantes están formuladas como hipótesis diferenciadas de los hechos, con estatus explícito.
- C2 — Las hipótesis activas tienen justificación suficiente para la decisión que se quiere tomar (proporcionalidad).
- C3 — Las hipótesis refutadas o reformuladas permanecen trazables.

**Estrategia de cambio**
- E1 — Los cambios considerados están vinculados explícitamente al problema o a una causa, con mecanismo esperado indicado.
- E2 — Los cambios se comparan con criterios explícitos (impacto, riesgo, coste, reversibilidad) de forma razonada.

**Experimentación y adopción**
- X1 — La evidencia de cada prueba queda registrada con su alcance (qué demostró y qué no).
- X2 — El alcance de la adopción pretendida es coherente con el alcance de la evidencia disponible.

**Evaluación y sostenibilidad**
- V1 — Los resultados reales se evaluaron frente al objetivo y a efectos no deseados, no solo frente a la intención.
- V2 — El aprendizaje (qué repetir, cambiar, detener o extender) y las condiciones de mantenimiento están explícitos.

## Política de evolución

- Los criterios semilla se validan **primero contra los Acceptance Scenarios** (primer tribunal) y **después contra proyectos reales** (Mérida como segundo tribunal).
- Un criterio semilla pasa a **canónico** cuando ha demostrado utilidad metodológica en escenarios de aceptación y/o uso real, sin generar burocracia innecesaria ni contradicciones con el Core.
- Un criterio puede **reformularse o eliminarse**: si produce ceremonia sin cambiar razonamiento, seguridad ni decisión, es candidato a desaparecer.
- No se persigue una taxonomía exhaustiva de Lean/QI: crecimiento dirigido por necesidad real (mismo patrón que la capa de conocimiento, ADR-013).

## Contexto

La decisión B original limitaba la semilla a las tres áreas críticas de Mérida; la revisión la amplió a las siete para evitar un Core asimétrico por construcción (siete áreas canónicas, solo tres evaluables). La revisión también retiró la clasificación estática necesario/ordinario de los criterios semilla, coherente con ADR-015.

## Consecuencias

### Positivas

- Core v0.1 operativo y simétrico: todas las áreas evaluables de forma explicable desde el primer día.
- Los criterios nacen marcados como provisionales y su estatus se gana con evidencia, no con redacción.
- La regla anti-ceremonia protege contra el checklist Lean gigante.

### Negativas

- Los criterios semilla son deliberadamente débiles; el Acceptance Scenarios y el piloto deben romperlos antes de promoverlos.
- Mantener el estatus semilla/canónico por criterio añade un metadato más al catálogo.
