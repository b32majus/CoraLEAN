# ADR-019 — Acceptance Scenarios v0.1: catorce escenarios canónicos

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

Catorce escenarios canónicos, **agnósticos al dominio**, verifican que CoraLEAN se comporta correctamente. Son el **primer tribunal de los criterios semilla** (ADR-018) y la lista de comprobación de comportamiento antes del piloto. Las 12 pruebas técnicas del runtime (ADR-017) son una batería aparte.

| ID | Escenario | Qué debe exhibir CoraLEAN |
|---|---|---|
| **S1** | Novata llega con la solución ya decidida («contraten más personal, las esperas son eternas») | La idea de cambio se **registra en Estrategia de cambio como idea, no como solución seleccionada ni justificada**; el foco principal sigue en entender el problema; momento «Entendiendo el problema»; guía hacia Problema y contexto / Situación actual |
| **S2** | Problema trivial con causa directamente observable | Varias áreas a Suficiente en una conversación con los mismos criterios; sin ceremonia. Un experimento exploratorio solo fluye sin autorización adicional si cumple ADR-010 (bajo riesgo, reversible, dentro de la autoridad declarada, sin requisitos adicionales de seguridad/privacidad/cumplimiento/gobernanza); si no, requiere la autorización correspondiente |
| **S3** | Buen diagnóstico sin línea base disponible | Criterio no-obtenible registrado con razón; Suficiente para decidir experimentar; bloqueo solo si la decisión es declarar impacto |
| **S4** | Evidencia refuta la hipótesis dominante (tipo H03) | Evento material de refutación; reapertura; momento recalculado a «Entendiendo por qué ocurre»; reformulación trazable |
| **S5** | Prueba local exitosa con efecto adverso aguas abajo | Alcance de la evidencia registrado; adopción reevaluada o bloqueada; posible reapertura de Situación actual; condición estricta visible |
| **S6** | Intento de estandarizar tras una prueba débil | Condición estricta invalida la adopción; validación humana exigida; evidencia proporcional al alcance de adopción |
| **S7** | Mejora adoptada que se degrada al mes | Evaluación frente a objetivo y efectos no deseados; reapertura normal; aprendizaje registrado |
| **S8** | Se pierde viabilidad a mitad de proyecto | La degradación de una condición habilitante **no implica suspensión automática**: se evalúa qué decisiones y acciones quedan afectadas; advertencia asesorada o condición estricta para las acciones afectadas; la suspensión es una posible transición con validación humana cuando la pérdida es material |
| **S9** | Dos personas, modos distintos, mismo proyecto | Estado único; procedencia distingue quién aportó; supuestos del Experto explícitos y jamás convertidos en hechos |
| **S10** | Reactivación tras semanas/meses suspendido | Reevaluación de condiciones habilitantes; validación humana para reactivar. **No se resetean las áreas**, pero se reevalúa la **vigencia** de evidencia, supuestos, alcance, actores, medidas y criterios cuando el tiempo transcurrido pueda haberlos dejado obsoletos |
| **S11** | Dos focos de decisión simultáneos | Ambos activos; foco principal recomendado/aceptado; momento derivado del foco principal, no de la secuencia |
| **S12** | Reunión completa end-to-end | Preparar reunión → celebrar → Procesar reunión produce *propuesta* de actualización (hipótesis propuesta, no hecho; conflictos señalados); mutación bajo contrato |
| **S13** | Procedencia metodológica incierta o fuentes discrepantes («¿esto lo recomienda SECA/IHI?») | Distingue respaldo-fuente / síntesis CoraLEAN / evidencia local (ADR-004, ADR-013); cita solo lo verificado; no inventa página/sección; hace visible la discrepancia relevante sin falso consenso; sigue siendo útil aunque falte fuente verificada |
| **S14** | **Transferencia de capacidad longitudinal**: el mismo Responsable local participa en varias interacciones y aumenta su autonomía | Mismo rigor con menos andamiaje redundante; la persona puede pasar de Guiado a Colaborativo sin cambiar el método (el modo no lo cambia CoraLEAN por inferencia); disminuyen las intervenciones necesarias del Facilitador/a; la persona sabe explicar el siguiente paso y su razón. **Es la prueba directa de la north star** |

### Formato de registro por escenario

Situación (2–3 frases) → comportamiento esperado (lista verificable) → contratos implicados (ADRs) → criterios semilla tensionados → resultado del tribunal (pendiente / criterio promovido / reformulado / eliminado / aún no tensionado).

### Mérida como fixture, no como escenario canónico

No existe escenario canónico específico de Reumatología–Farmacia. Tras el freeze, se crea una **instanciación de piloto** que mapea situaciones reales de Mérida contra S1–S14 (especialmente S1, S3, S4, S11, S12 y S14). PROMueve sigue siendo laboratorio de validación; el Core no absorbe una patología ni un servicio concreto.

## Contexto

Una primera propuesta de doce escenarios contenía cuatro formulaciones incoherentes con decisiones previas (S1 bloqueaba la ideación, S2 asumía condiciones asesoradas automáticas, S8 automatizaba la suspensión, S10 ignoraba la vigencia) y dejaba sin tensión directa la procedencia metodológica (ADR-004/013) y la north star de transferencia de capacidad.

## Consecuencias

### Positivas

- Cobertura completa de los nueve contratos del Core con 14 situaciones reutilizables en cualquier dominio.
- S14 da al producto una prueba directa de su criterio de éxito, no solo de su corrección.
- El estatus de cada criterio semilla queda determinado por evidencia de tribunal, no por preferencia.

### Negativas

- S14 es longitudinal y solo puede evaluarse plenamente con uso real; hasta entonces su resultado es «aún no tensionado».
- Mantener los escenarios agnósticos exige disciplina al instanciarlos en Mérida.
