# ADR-012 — Momentos de navegación

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

Los momentos de navegación (ADR-006) quedan definidos por una **regla de derivación** y un **vocabulario cerrado de seis momentos**.

### Regla de derivación

> **Foco principal de decisión → criterios requeridos por esa decisión → criterio pendiente más relevante para esa decisión → momento de navegación.**

- Un proyecto puede tener **varios focos de decisión activos simultáneamente**; no se fuerza unicidad. El **foco principal de navegación** es uno: seleccionado explícitamente por la persona o recomendado por CoraLEAN, porque la interfaz debe poder responder «¿qué hacemos ahora?».
- Los criterios **estrictamente necesarios** tienen prioridad cuando bloquean la decisión. Sin bloqueo, CoraLEAN puede priorizar el trabajo que más reduzca incertidumbre o habilite la siguiente decisión útil. **No se congela ningún algoritmo numérico de priorización.**

### Vocabulario cerrado (seis momentos)

1. **Preparando el proyecto**
2. **Entendiendo el problema**
3. **Entendiendo por qué ocurre**
4. **Eligiendo qué probar**
5. **Probando y adoptando cambios**
6. **Evaluando y sosteniendo la mejora**

### Reglas permanentes

- **Momento ≠ fase.** Puede haber trabajo de varias Áreas de razonamiento simultáneamente; el momento refleja la decisión actual, no todo lo que ocurre.
- No hay obligación de visitar todos los momentos; un proyecto trivial puede saltarse varios.
- Una **reapertura** puede cambiar el foco principal y, por tanto, recalcular el momento sin ceremonia.
- El momento **nunca se almacena como verdad primaria**: siempre se deriva del Project State.
- No existe mapeo estructural área→momento. Las asociaciones (p. ej., Comprensión causal con «Entendiendo por qué ocurre») son ejemplos típicos, no reglas: Objetivo y medidas, entre otras, puede intervenir en varios momentos.
- Los estados de proyecto distintos de Activo (Suspendido, Cancelado, Abandonado, Completado; En preparación corresponde a «Preparando el proyecto») muestran el estado, no un foco de razonamiento.

## Contexto

ADR-006 dejó el número y los nombres de los momentos sin congelar hasta resolver las áreas de razonamiento (ADR-007) y la escala de suficiencia (enmienda 2 de ADR-008). Una versión previa de la regla usaba «el área menos suficiente» como derivación; la revisión la sustituyó por criterios pendientes relevantes a la decisión actual, y sustituyó el foco único por focos activos múltiples con un foco principal de navegación.

## Consecuencias

### Positivas

- La navegación responde «¿qué hacemos ahora?» desde decisiones reales, no desde una secuencia.
- Las reaperturas redirigen la navegación de forma natural, sin etiquetas de «volver atrás».
- El vocabulario cerrado hace la navegación fiable entre conversaciones.

### Negativas

- El Project State debe representar: focos de decisión activos (varios), foco principal de navegación y el criterio pendiente más relevante por decisión (obligación para el contrato de estado).
- La selección del foco principal puede ser ambigua con varios focos activos; la política persona-explicita-o-CoraLEAN-recomienda debe respetarse en el comportamiento.
