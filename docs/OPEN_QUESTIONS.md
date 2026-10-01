# Open questions

Preguntas con disposición explícita tras el **Core Freeze v0.1** (2026-10-01). Nada se elimina: cada pregunta queda *resuelta* (con ADR), *aplazada* (con motivo) o *abierta*.

## Method

- ¿Cuál es el ciclo de vida mínimo robusto? → **Resuelta**: no hay ciclo de fases; modelo híbrido de áreas de razonamiento + momentos de navegación (ADR-006, ADR-007, ADR-012).
- ¿Qué gates son hard vs advisory? → **Resuelta**: dos ejes, fuerza (estricta/asesorada) × requisito de autorización humana (ADR-010).
- ¿Cómo expresar readiness sin falsa precisión? → **Resuelta**: condiciones habilitantes del proyecto con criterios proporcionales y estados del proyecto; suficiencia categórica, sin porcentajes (ADR-008, ADR-011).
- ¿Cuánto debe challenge a un experto? → **Resuelta**: mismo umbral en todos los modos; cambia la forma (ADR-014).
- ¿Cuándo explica una herramienta formal? → **Resuelta**: dimensión de nomenclatura/explicitación por modo; enseñanza tras/durante el uso en Guiado; reglas de aplicación en tarjetas (ADR-013, ADR-014).

## Project State

- ¿Markdown vs JSON vs híbrido? → **Aplazada y condicionada**: representación candidata = `estado-proyecto.md` + `historia-material.md` en Markdown; la decisión definitiva depende de las pruebas Alpha (ADR-015, ADR-017).
- ¿Event-sourcing desde el principio? → **Resuelta**: no; snapshot + historia material con eventos de significado de dominio (ADR-015).
- ¿Qué campos son obligatorios? → **Resuelta**: los nueve bloques de ADR-015.
- ¿Cuánta procedencia? → **Resuelta**: tres trazas distinguibles (registró / aportó / fuente), cuando aplique (ADR-015).

## Skills

- ¿Qué flujos merecen Skill? → **Resuelta para v0.1**: criterios de elegibilidad + dos Skills congeladas (Preparar reunión, Procesar reunión); artefactos pendientes de evidencia de piloto (ADR-016).
- ¿Fallback mínimo sin Skills? → **Resuelta**: equivalencia metodológica desde el Core (ADR-016).
- ¿Puede una Skill actualizar estado? → **Resuelta**: solo propone; la mutación pasa por el contrato del estado (ADR-015, ADR-016).
- ¿Skills con código? → **Resuelta para v0.1**: instrucciones + recursos; código futuro solo con necesidad demostrada (ADR-016).

## Cockpit

- ¿ChatGPT Site vs app externa? → **Abierta** (post-piloto; ADR-002/017).
- ¿Qué debe verse de un vistazo? → **Parcialmente resuelta**: el contenido semántico está definido (focos, criterios pendientes, momentos, estados); la representación visual simultánea está aplazada (ADR-008 enmienda 2).
- ¿Debería permitir edición directa del estado? → **Resuelta**: no; fuera del flujo soportado, con reconciliación si ocurre (ADR-017).

## Backend

- ¿Neon vs Supabase vs otro? → **Abierta deliberadamente** (solo si las pruebas Alpha activan la reversal condition de ADR-002; ver BACKEND_STRATEGY.md).
- Autenticación, permisos, realtime, backup → **Abiertas** (fase 3 del roadmap).

## MCP

- ¿Cuándo está justificado? ¿Qué operaciones exponer? → **Abiertas**; la lista de operaciones de dominio de PROJECT_STATE_MODEL se mantiene como referencia futura. Sin implementación antes de que el estado y los permisos sean estables (AGENTS.md).

## Distribution

- ¿Cuánto puede automatizar el bootstrap? → **Abierta** (depende de las pruebas Alpha: BOOTSTRAP.md).
- ¿Requisito técnico mínimo del usuario? → **Abierta** (Alpha: test 3, 10, 11 de ADR-017).

## Product

- ¿Vale CoraLEAN sin backend? → **Abierta**: es exactamente lo que las pruebas Alpha y el piloto deben responder (ADR-002/017).
- ¿Qué porcentaje de usuarios necesita el cockpit? → **Abierta** (post-piloto).
- ¿Mejora realmente la transferencia de capacidad? → **Abierta con instrumento**: S14 es su prueba directa (ADR-019).
- ¿Qué fricción recurrente merece software? → **Abierta** (fase 3 del roadmap; FEEDBACK_PROTOCOL.md).

## Research

- Completar la autopsia UX de Simana/Life QI → **Abierta** (RESEARCH_PLAN, Track A).
- Literatura de coaching/facilitación QI y transferencia de capacidad → **Abierta** (Track B; incluye verificar AHRQ, cuya página no pudo consultarse el 2026-10-01).
- Verificar disponibilidad real de Skills/Sites/Work para la población objetivo → **Resuelta como criterio de aceptación**: pasa a ser parte de las 12 pruebas Alpha (ADR-017) y se verifica empíricamente antes de Mérida.
- Verificar la afirmación de que el A3 de SECA admite estructura variable según el propósito → **Abierta** (afirmación recibida en la sesión de freeze, pendiente de contraste con el manual).
