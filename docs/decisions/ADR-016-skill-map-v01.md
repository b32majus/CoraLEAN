# ADR-016 — Skill Map v0.1

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

### Separación de capas

```text
CORE
→ qué debe respetarse siempre
→ invariantes, estado, suficiencia, condiciones, modos, autoridad

PLAYBOOK / CONOCIMIENTO
→ cómo suele abordarse una situación
→ técnicas, preguntas, heurísticas, fuentes

SKILL
→ protocolo operativo reutilizable para ejecutar bien
   una tarea acotada usando Core + Playbook + Conocimiento
```

Una Skill **no es una proyección literal del Core** ni su procedimiento debe estar derivado paso a paso de los ADRs: puede contener procedimiento especializado, recursos, secuencias de preguntas y formatos de salida propios. Lo que **no puede poseer** es una verdad metodológica exclusiva que contradiga o eluda al Core.

### Criterios de elegibilidad (los cuatro, conjuntos)

1. **Repetible y acotada**: entrada, procedimiento y salida bien definidos.
2. **Frecuente o crítica**: ocurre en casi todo proyecto o es un momento de alto valor.
3. **Procedimental, no de gobernanza**: las decisiones metodológicas (condiciones de avance, clasificación de criterios, autorizaciones) permanecen en el Core.
4. **Fallback con equivalencia metodológica**: sin la Skill, Coraline ejecuta el mismo procedimiento con resultado menos estructurado pero metodológicamente válido. Equivalencia metodológica, no identidad de ejecución o formato.

### Skills congeladas para Core v0.1: dos

**1. Preparar reunión**

- Lee el estado y genera preparación orientada a las decisiones e incertidumbres que merece trabajar la siguiente reunión, adaptando el andamiaje al modo de la persona.
- Produce: propósito de la reunión; decisiones a desbloquear; criterios/incertidumbres relevantes; preguntas que merece abordar; agenda propuesta; riesgos metodológicos; qué se espera poder actualizar en el estado después.
- No tiene autoridad para cambiar el estado metodológico por haber preparado una agenda.

**2. Procesar reunión**

- Convierte notas/transcripción en una **propuesta estructurada de actualización del Project State**: hechos propuestos, evidencia, hipótesis creadas/modificadas (con estatus), decisiones detectadas, acciones acordadas, cuestiones abiertas y eventos materiales, conservando procedencia, incertidumbres y conflictos/ambigüedades que requieren confirmación.
- **Nunca muta el estado directamente**: su salida pasa por las mismas invariantes, validaciones y requisitos de autorización que cualquier otra interacción con CoraLEAN. Una frase ambigua de una reunión («parece que el problema viene de primaria») se propone como hipótesis con estatus, nunca como hecho.

### No incluido en v0.1

- **Preparar artefacto como Skill**: los artefactos (A3, mapa de proceso, plan de medición, PDSA) permanecen como proyecciones generables desde el Core, apoyadas por templates y la capa de conocimiento. La heterogeneidad de sus procedimientos haría de una Skill parametrizada una mega-Skill. Los pilotos decidirán qué artefactos se repiten lo suficiente para merecer Skill propia (posiblemente A3 sí, plan de medición no — no se decide hoy).

### Reglas transversales

- **Una Skill no adquiere autoridad adicional por ejecutarse como Skill.** Toda propuesta de mutación del Project State pasa por las mismas invariantes y requisitos de autorización del Core.
- **Skills v0.1: instrucciones + recursos, sin código como dependencia.** Ninguna capacidad esencial dependerá de ejecutar código dentro de una Skill. Esto no es una prohibición permanente: código futuro requerirá una necesidad demostrada que justifique la complejidad, y nunca podrá eliminar el fallback metodológico.
- El Starter Kit funciona sin ninguna Skill instalada (instrucciones del proyecto solo).

## Contexto

Una primera propuesta definía la Skill como proyección literal del Core y congelaba una tercera Skill parametrizada de artefactos. La revisión corrigió el marco (Core / Playbook / Skill), exigió equivalencia metodológica —no identidad— en el fallback, redujo el set v0.1 a dos Skills y reservó los artefactos para evidencia de piloto.

## Consecuencias

### Positivas

- Superficie mínima y verificable: dos Skills cubren el ciclo reunión-preparación/extracción, el más frecuente del piloto.
- El modelo de estado se pone a prueba donde más importa: convertir conversación en eventos materiales sin fabricar hechos.
- La ausencia de Skills degrada la comodidad, no la metodología.

### Negativas

- Generar artefactos sin Skill será menos consistente; el piloto debe medir si la fricción merece Skills especializadas.
- «Propuesta de actualización» de Procesar reunión exige que Coraline sepa clasificar bien; los errores de clasificación serán material de feedback prioritario.
