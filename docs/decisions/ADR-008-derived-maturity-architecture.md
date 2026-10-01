# ADR-008 — Arquitectura de suficiencia: derivada, suficiencia para la decisión, criterios y estatus de entidades

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

La suficiencia de un área de razonamiento es **derivada, no actualizada a mano**. Su fuente de verdad es:

1. los criterios observables del área;
2. la evidencia y procedencia que los apoya;
3. el estatus de las entidades relevantes (Hipótesis, Cambio, Experimento, Decisión, etc.).

La etiqueta de suficiencia es una **proyección explicable** de esos elementos — nunca una verdad independiente que el agente edita directamente.

Reglas permanentes:

- **Suficiencia, no completitud.** La suficiencia es suficiencia para la decisión actual — nunca un porcentaje de completitud ni un estado terminal absoluto. La misma área puede ser suficiente para una decisión e insuficiente para otra posterior.
- **Criterios, no sub-suficiencias.** Los aspectos internos de un área («medidas definidas», «línea base obtenida») son criterios explícitos, con los criterios pendientes visibles en el estado. Sin matrices de suficiencia independientes por faceta.
- **La información no obtenible no es un nivel.** Un criterio que no puede cumplirse porque la información no existe o no puede obtenerse conserva su razón registrada y se evalúa frente a la decisión actual; no bloquea automáticamente.
- **La reapertura es un evento, no un nivel.** Evidencia nueva dispara una transición de reapertura, tras la cual la suficiencia del área se vuelve a derivar de criterios y estatus de entidades.

## Contexto

ADR-006 prohibió los porcentajes y dejó la suficiencia categórica. Las pruebas de estrés sobre las siete áreas (ADR-007) mostraron que los aspectos internos de un área (por ejemplo, medidas definidas pero línea base no disponible) de otro modo bloquearían progreso legítimo o tentarían una segunda dimensión de madurez. Derivar la suficiencia de criterios más estatus de entidades mantiene una sola etiqueta por área preservando la explicabilidad: cualquier afirmación de suficiencia puede responderse con «qué criterios están cumplidos, cuáles están pendientes y por qué».

## Consecuencias

### Positivas

- Una sola suficiencia por área; explicabilidad por construcción.
- El freno anti-solución-prematura y el comportamiento de reapertura operan sobre el mismo sustrato (criterios + entidades), sin contabilidad paralela.
- Los avisos del cockpit (estados tipo ⚠) se corresponden con eventos y criterios bloqueantes, no con niveles inventados.

### Negativas

- El runtime debe derivar realmente las etiquetas a partir de criterios/entidades; un runtime que permita al agente «poner» la suficiencia violaría este contrato en silencio (se hará cumplir en el contrato de runtime).
- Los criterios deben redactarse y mantenerse por área (siguiente paso: escala común, luego criterios por área).

## Enmienda 1 (2026-10-01, junto con ADR-010 — invariante de suficiencia)

- **Invariante de suficiencia:** un área no puede derivarse Suficiente mientras exista un criterio **estrictamente necesario** incumplido. Una razón registrada no salta un criterio bloqueante; si el criterio deja de ser necesario para la decisión actual, se reevalúa y reclasifica su relevancia — un cambio del modelo, nunca un bypass.
- Los criterios se clasifican frente a la decisión actual como **estrictamente necesarios** u **ordinarios**. La regla anterior («la información no obtenible no bloquea automáticamente») aplica a los criterios ordinarios; un criterio necesario no obtenible impide la suficiencia hasta que se reevalúe su relevancia.

## Enmienda 2 (2026-10-01, escala común)

- La escala común canónica de suficiencia tiene **tres niveles**: **No examinado**, **Insuficiente para la decisión actual**, **Suficiente para la decisión actual**. «En progreso» es lenguaje de interfaz opcional, no término canónico del modelo.
- La **relevancia** («no aplicable todavía») es una dimensión separada de la escala, no un cuarto nivel.
- La representación visual simultánea de suficiencia, bloqueos, reaperturas y relevancia (símbolos del cockpit) queda pendiente de decisión y no forma parte de este contrato.
