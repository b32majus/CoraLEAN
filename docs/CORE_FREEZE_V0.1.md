# Core Freeze v0.1 — índice canónico

**Fecha:** 2026-10-01
**Estado:** Freeze completado tras sesión adversarial de diseño (grill). Los ADRs de `docs/decisions/` son la fuente canónica.

Este documento es el mapa de autoridad del Core v0.1: qué documento manda para cada contrato, qué queda provisional, qué queda aplazado y qué documentación legacy ha quedado superada.

## 1. Los nueve contratos → fuente canónica

| # | Contrato | Fuente canónica |
|---|---|---|
| 1 | User Journey | ADR-005 (perspectiva del Responsable local) + ADR-011 (etapa de Preparación) + ADR-012 (momentos de navegación). *Redacción narrativa completa del Journey: pendiente, tarea post-freeze.* |
| 2 | Behaviour Contract | ADR-005 + ADR-014 (siete dimensiones de andamiaje, núcleo invariable de 8 reglas, modo por persona/interacción) |
| 3 | Domain Model | GLOSSARY.md + ADR-005 (rol≠modo) + ADR-006 (áreas vs entidades) + ADR-007 (siete áreas) |
| 4 | Lifecycle + Gates | ADR-006 (modelo híbrido, sin fases) + ADR-007 (áreas) + ADR-008 (+enmiendas: suficiencia derivada, escala de 3 niveles, invariante) + ADR-010 (dos ejes de condición de avance) + ADR-011 (condiciones habilitantes y estados del proyecto) + ADR-012 (momentos) |
| 5 | Skill Map | ADR-016 (Core / Playbook / Skill; dos Skills congeladas: Preparar reunión, Procesar reunión) |
| 6 | Project State Contract | ADR-015 (nueve bloques, snapshot+historia material, procedencia en tres trazas, derivados no persistidos) |
| 7 | Knowledge Architecture | ADR-004 (procedencia) + ADR-013 (fuente/afirmación/tarjeta; núcleo mínimo curado) |
| 8 | Runtime Contract | ADR-002 (Project-first con reversal condition) + ADR-017 (hipótesis V0, 12 pruebas Alpha, concurrencia como riesgo) |
| 9 | Acceptance Scenarios | ADR-019 (14 escenarios canónicos agnósticos al dominio; Mérida como fixture) |

Transversal: ADR-009 (lengua canónica: español para producto/dominio; inglés solo trazabilidad, identificadores técnicos y métodos con nombre propio).

## 2. Provisional en v0.1 (con ruta de promoción)

| Elemento | Estatus | Promoción |
|---|---|---|
| 17 criterios semilla (ADR-018) | Provisional | Tribunal 1: escenarios S1–S14 · Tribunal 2: piloto Mérida |
| Mecanismo físico de actualización del estado (ADR-017) | Diseño candidato | 12 pruebas Alpha |
| Representación `estado-proyecto.md` + `historia-material.md` | Diseño candidato | Pruebas Alpha 1–7 |
| Nombres provisionales restantes | — | Glosario |

## 3. Aplazado explícitamente (no decidido, con motivo)

- Serialización profunda / bloques estructurados dentro del Markdown (detalle del Starter Kit).
- Cockpit: símbolos y representación visual simultánea de suficiencia/bloqueos/reaperturas/relevancia (ADR-008 enmienda 2); Site vs app externa.
- Backend, MCP, autenticación (ADR-002/003; solo si las pruebas Alpha activan la reversal condition).
- Skills con código (solo con necesidad demostrada; ADR-016).
- Catálogo completo de criterios y tarjetas de conocimiento (crecimiento por necesidad real).
- Redacción narrativa completa del User Journey.

## 4. Reconciliación documental: contradicciones detectadas y disposición

| Documento | Contradicción con el freeze | Disposición |
|---|---|---|
| `docs/METHOD_V0.md` | Ciclo de 10 fases con gates (superseded por ADR-006/007/012); «freno metodológico» por fase (ahora estructural: ADR-010); pedagogía descrita por modos (ahora ADR-014); «Coraline» como nombre sin decisión | Banner de estado añadido: principios (1–12) vigentes; ciclo de fases y sección de pedagogía **superseded**; fuentes canónicas señaladas. Naming «Coraline»: **pendiente de decisión** |
| `docs/COCKPIT.md` | Corredor de fases + «DIAGNOSIS 62%» (contradice ADR-006/008: no porcentajes, navegación derivada); semántica de símbolos ✓/●/⚠/○ aplazada (ADR-008 enmienda 2) | Banner de estado añadido: concepto de propósito vigente; pantalla conceptual y porcentaje **superseded**; rediseño post-freeze |
| `docs/PROJECT_STATE_MODEL.md` | YAML mínimo con `lifecycle.phase` y Gate como condición simple (superseded por ADR-015 y ADR-010); semántica de entidades mayormente vigente | Banner de estado añadido: semántica de entidades vigente; esquema YAML **superseded** por ADR-015 |
| `docs/OPEN_QUESTIONS.md` | Numerosas preguntas ya resueltas o aplazadas con motivo | **Reescrito** con disposiciones por pregunta (resuelta por ADR-X / aplazada / abierta) |
| `START_HERE.md` | Coherente en sustancia; falta referencia al freeze | Nota de freeze añadida |
| `docs/ROADMAP.md`, `docs/WORKPLAN_2026-10.md`, `docs/BACKEND_STRATEGY.md`, `docs/BOOTSTRAP.md`, `docs/FEEDBACK_PROTOCOL.md`, ADR-001–004 | Sin contradicción material con el freeze | Se conservan tal cual; los ADR nuevos se apoyan en ellos |

## 5. Estado del tribunal de criterios semilla (inicial)

Los 17 criterios semilla (P1–P2, S1–S3, O1–O3, C1–C3, E1–E2, X1–X2, V1–V2) arrancan con resultado **aún no tensionado**. El resultado se registra tras ejecutar S1–S14 según el formato de ADR-019.

## 6. Pendientes inmediatos post-freeze

1. Instanciación de piloto: mapear situaciones reales de Mérida contra S1–S14 (fixture, no escenario canónico).
2. Ejecutar las 12 pruebas Alpha del runtime (ADR-017) y registrar resultados.
3. Ejecutar S1–S14 y registrar el tribunal de criterios.
4. Decisión de naming: «Coraline» (agente) vs «CoraLEAN» (producto) — término detectado sin resolver.
5. Redacción narrativa completa del User Journey.
6. Starter Kit: instrucciones del proyecto delgadas + `estado-proyecto.md` + `historia-material.md` + tarjetas de conocimiento del núcleo mínimo.
