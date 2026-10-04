# CoraLEAN — Estándares de trabajo

CoraLEAN está en fase method/runtime-first. Este archivo es una proyección operativa para Atenea, subordinada a `AGENTS.md` y a los ADRs aceptados.

## Reglas

- La lengua canónica de producto y dominio es español.
- No reabrir el Core Freeze v0.1 por conveniencia de implementación.
- Distinguir comportamiento observado, hipótesis, limitación confirmada e incertidumbre.
- Preferir evidencia reproducible a afirmaciones narrativas.
- No introducir datos identificables de pacientes.
- No seleccionar backend, MCP o cockpit como dependencia sin nueva autoridad.
- Mantener Skills como aceleradores, nunca como fundamento obligatorio.
- Los cambios documentales deben preservar procedencia y no borrar historia material.
- Ejecutar `git diff --check` para cambios Markdown/config y cualquier otro gate determinista justificado por el cambio.

## Límite actual

La work unit de Alpha Runtime Verification prueba el runtime de ChatGPT Project; no implementa producto clínico ni modifica el modelo conceptual congelado salvo HUMAN STOP y reapertura explícita.
