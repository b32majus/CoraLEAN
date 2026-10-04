# CoraLEAN — Contexto de ejecución

Este archivo es una proyección mínima para el runtime de Atenea. No introduce decisiones de producto nuevas.

## Autoridad canónica del producto

Leer, en este orden:

1. `START_HERE.md`
2. `AGENTS.md`
3. `docs/CORE_FREEZE_V0.1.md`
4. `GLOSSARY.md`
5. ADRs aceptados en `docs/decisions/`

El tag `core-freeze-v0.1` (`c485ec6`) fija la frontera del Core v0.1. Los cambios posteriores son aprendizaje post-freeze y no reabren ADRs por defecto.

## Autoridad de ejecución

La ejecución de ingeniería usa Atenea C-084 / OpenCode V2. La configuración local está en `opencode.json`, `.opencode/agents/` y `docs/ATENEA_EXECUTION_ROUTING_V0.md`.

La publicación/merge sigue siendo autoridad humana salvo autorización explícita distinta.
