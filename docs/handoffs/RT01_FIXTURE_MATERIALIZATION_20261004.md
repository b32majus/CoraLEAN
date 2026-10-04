# Handoff — Materialización del fixture RT-01

Work: materializar los artefactos repo-side necesarios para ejecutar la primera prueba real de la Verificación Alpha del Runtime v0 de CoraLEAN.

Authority:
- `START_HERE.md`
- `AGENTS.md`
- `CONTEXT.md`
- `CODING_STANDARDS.md`
- `docs/CORE_FREEZE_V0.1.md`
- `docs/decisions/ADR-015-contrato-del-project-state.md`
- `docs/decisions/ADR-017-runtime-contract-v0.md`
- `docs/runtime/ALPHA_RUNTIME_VERIFICATION_V0.md`

Cost policy: `standard`.
Risk class: `volume`.
Method: single bounded unit; use Matt `/implement` under `atenea-volume`.

## Outcome

Dejar RT-01 listo para ejecución manual dentro de un ChatGPT Project limpio, sin ejecutar todavía el test.

Materializar exactamente:
- `docs/runtime/fixtures/alpha-v0/estado-proyecto.md`
- `docs/runtime/fixtures/alpha-v0/historia-material.md`
- `docs/runtime/fixtures/alpha-v0/fixture-esperado.md`
- `docs/runtime/fixtures/alpha-v0/instrucciones-project-rt01.md`

## In scope

- traducir la especificación del fixture de la sección 2 del plan a los dos artefactos canónicos de estado;
- mantener los nueve bloques de ADR-015 en el snapshot, sin persistir derivados como verdad primaria;
- materializar los 10 eventos ficticios con actor, efecto y razón en la historia material;
- preservar exactamente las tres trazas de procedencia de `E2`, `HP1` y `D1`;
- fijar en `fixture-esperado.md` el oracle repo-side para RT-01 y las comparaciones posteriores que ya exige el plan;
- derivar una sola vez, antes de cualquier prueba en ChatGPT, el `siguiente paso + razón` esperado desde el estado ficticio y congelarlo en la clave;
- preparar instrucciones delgadas para el Project de RT-01 que hagan prevalecer el estado explícito sobre memoria implícita y no filtren la clave esperada;
- documentar con claridad qué dos archivos se cargan al Project y cuáles permanecen solo repo-side.

## Preserve

- no reabrir ni modificar ADRs 001–019;
- no ejecutar RT-01 ni registrar un resultado observado;
- no introducir datos reales de Mérida ni información clínica/paciente;
- no cargar `fixture-esperado.md` ni revelar su contenido en las instrucciones del Project;
- no convertir suficiencia, momento de navegación, criterio pendiente más relevante ni siguiente acción recomendada en campos primarios del snapshot;
- no confundir fuente evidencial, aportante y registrador;
- no cambiar el plan salvo corrección estrictamente necesaria para eliminar una contradicción encontrada durante la materialización; si fuera material, HUMAN STOP.

## Decisiones ya fijadas

- el Project de RT-01 será temporal y limpio, sin conversaciones previas;
- solo `estado-proyecto.md` y `historia-material.md` son fuentes del fixture que se cargarán al Project;
- `fixture-esperado.md` es oracle secreto repo-side;
- `instrucciones-project-rt01.md` es guía para configurar manualmente el Project, no una fuente de estado;
- el prompt de prueba permanece exactamente: `¿Dónde estamos y qué toca ahora?`.

## Evidence to close

- los cuatro archivos existen en las rutas exactas;
- `estado-proyecto.md` contiene los nueve bloques y las 11 entidades transversales especificadas;
- `historia-material.md` contiene exactamente los 10 eventos materiales especificados, en orden trazable;
- `fixture-esperado.md` fija estado=`Activo`, foco principal=`Foco 1 (Comprensión causal)`, `Q1`, estatus `HP1`/`HP1′`, las tres trazas completas y un único `siguiente paso + razón` previo a cualquier observación de ChatGPT;
- las instrucciones del Project no contienen la respuesta esperada ni detalles capaces de convertir RT-01 en una prueba tautológica;
- una comprobación determinista confirma que los identificadores del fixture coinciden entre snapshot, historia y clave;
- `git diff --check` pasa;
- solo cambian los cuatro artefactos previstos y, si el workflow lo requiere, documentación mínima de esta unidad;
- el plan sigue con `Resultado observado: PENDIENTE` para RT-01.

## Non-goals

- no crear el ChatGPT Project;
- no cargar fuentes ni cambiar settings en ChatGPT;
- no ejecutar el prompt RT-01;
- no evaluar PASS/PARTIAL/FAIL/BLOCKED;
- no preparar RT-02 en adelante;
- no implementar backend, MCP, cockpit o persistencia automática.

## Publication boundary

Se permiten commits locales y checkpoint normal non-force de esta rama de trabajo. No merge a `main`, no PR/release/deploy y no mover el tag `core-freeze-v0.1`.

Al cerrar, devolver el paquete manual exacto para Silvia: nombre sugerido del Project, texto literal de instrucciones, dos archivos a cargar, prompt exacto y qué evidencia debe copiar de vuelta sin consultar `fixture-esperado.md` durante la prueba.
