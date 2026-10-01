# ADR-009 — Lengua canónica del producto: español

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

El lenguaje canónico de CoraLEAN es **español**. El modelo conceptual de producto —no solo la interfaz— se redacta en español:

- Vocabulario de producto y dominio (áreas de razonamiento, suficiencia, criterios, reapertura, momentos de navegación, artefactos, modos, roles, condiciones de avance) se nombra en español y su forma canónica vive en `GLOSSARY.md`.
- Los términos ingleses pueden conservarse **entre paréntesis** únicamente para trazabilidad de una fuente externa o de un concepto técnico; nunca como nombre primario.
- **Identificadores técnicos** futuros (código, API, claves de estado) pueden mantenerse en inglés si simplifican el software (p. ej. `sufficient_for_current_decision`), sin que ello cambie el vocabulario canónico: internamente `"sufficient_for_current_decision"`, la persona ve «Suficiente para la decisión actual».
- **Fuentes y métodos con nombre propio** conservan su nombre original cuando corresponda (PDSA, A3, Model for Improvement, VSM).

## Contexto

CoraLEAN se dirige a profesionales sanitarios de habla hispana (piloto: PROMueve Extremadura, Mérida). Mantener el vocabulario canónico en inglés produciría una herramienta que habla como un paper de consultoría y exigiría una traducción superficial posterior de interfaz sobre un modelo conceptual anglosajón. Los documentos previos del repositorio (ADR-001 a ADR-004, docs/ existentes) permanecen en inglés como registro histórico; los documentos del Core creados a partir de esta decisión se redactan en español.

## Consecuencias

### Positivas

- Coherencia de producto con su población real.
- El modelo conceptual y la experiencia del usuario comparten una sola lengua.

### Negativas

- Coste de equivalencias en documentación técnica e interoperabilidad; mitigado con la tabla de equivalencias del glosario.
- Algunos términos técnicos no tienen traducción natural; se decide caso por caso (p. ej. «gate» se resuelve explícitamente, no por defecto).
