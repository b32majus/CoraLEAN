# CoraLEAN — reconciliación local con Atenea C-084

Fecha: 2026-10-04
Estado: preparación de runtime; sin cambio de producto

## Base exacta

- repositorio: `b32majus/CoraLEAN`
- base: `origin/main` en `c485ec6` (`core-freeze-v0.1`)
- rama de trabajo: `work/alpha-runtime-c084-20261004`
- worktree: `/srv/kairos-lab/projects/coralean-alpha-runtime-c084-20261004`
- Atenea fuente: `b32majus/Atenea` `main` en `50122a1`
- front door Atenea: C-084, OpenCode V2 `2.0.22`

## Mantener

- Core Freeze v0.1 y ADRs 001–019 como autoridad conceptual.
- `START_HERE.md`, `AGENTS.md`, `GLOSSARY.md` y `docs/CORE_FREEZE_V0.1.md` como autoridad CoraLEAN.
- publicación/merge bajo autoridad humana.
- las 12 pruebas Alpha de ADR-017 como batería técnica del runtime.

## Adaptar

- añadir `opencode.json` con `default_agent=atenea-volume` y `experimental.subagent_depth=2`;
- versionar los agentes nativos C-084 en `.opencode/agents/`;
- versionar routing y soporte Free actuales de Atenea;
- añadir `CONTEXT.md` y `CODING_STANDARDS.md` como proyecciones operativas, sin crear nueva autoridad de producto.

## Runtime observado

Antes de la primera ejecución real:

```text
command = /home/hermes/.npm-global/bin/opencode
version = 2.0.22
runtime = native OpenCode V2
```

`opencode debug config` resuelve `default_agent=atenea-volume` y `subagent_depth=2`. `opencode debug agents` parsea las definiciones de agentes copiadas desde Atenea C-084.

El catálogo Free se conserva como capacidad opcional. `node tools/check-free-models.mjs` pasó en Atenea antes de la copia; cualquier unidad `free_only` debe repetir el checker en el worktree objetivo antes del launch.

## Clasificación de la siguiente unidad

- `cost_policy: standard`
- `risk_class: volume`

Motivo: la siguiente unidad prepara y documenta la verificación Alpha del runtime contra un Core ya congelado. No cambia arquitectura ni implementa todavía semántica de concurrencia/estado; las pruebas difíciles se ejecutarán después y podrán escalar de clase si una unidad posterior introduce un trigger C-084 complejo.

`free_only` sigue siendo una opción humana independiente del riesgo, no una clase de menor complejidad.

## Preflight tras la copia

- `git diff --check`: PASS.
- `opencode debug config`: resuelve `default_agent=atenea-volume` y `experimental.subagent_depth=2`.
- `opencode debug agents`: 19 agentes `atenea-*` parseados.
- `.opencode/agents/`: byte-for-byte sin diferencias frente a Atenea `50122a1`.
- `node tools/check-free-models.mjs`: PASS para la ruta opcional `free_only`.

Estas comprobaciones validan configuración y bindings; no validan aún calidad de modelo ni comportamiento de ChatGPT Project.
