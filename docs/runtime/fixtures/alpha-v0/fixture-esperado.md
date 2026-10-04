# `fixture-esperado.md` — clave de respuestas esperadas (repo-side)

> **Clave de respuestas esperadas. Repo-side. No cargar al Project. No mostrar en las instrucciones del Project.** Instrumento de comparación de RT-01…RT-08; no es estado del Project ni verdad primaria del proyecto.

## Valores esperados

- **Estado del proyecto:** `Activo`
- **Foco principal:** `Foco 1` (Comprensión causal)
- **Cuestión abierta:** `Q1` — «¿La variabilidad del proveedor explica los faltantes del carro, o se concentra en turnos o días concretos?»
- **Estatus de hipótesis:** `HP1` = `refutada`; `HP1′` = `reformulada`
- **Checklist del foco principal (para RT-08):** `H1`, `HP1`, `HP1′`, `E1`, `E2`, `D1` (total 6). Fórmula: `omisiones(V) = entidades del checklist ausentes / 6`.

## Trazas de procedencia esperadas (tres, completas)

- `E2`: registró `CoraLEAN` / aportó `R. Ficticia` / fuente `hoja ficticia FC-02`
- `HP1`: registró `CoraLEAN` / aportó `R. Ficticia` / fuente `sesión ficticia S-01`
- `D1`: registró `R. Ficticia` / aportó `F. Ficticia` / fuente `minuta ficticia MT-01`

## Siguiente paso + razón esperados (valor derivado, congelado antes de observar)

> Derivado una sola vez desde el estado ficticio, **antes de cualquier observación en ChatGPT**, y congelado aquí. Es un valor **derivado** (ADR-015), no una verdad primaria.

- **Siguiente paso:** ejecutar `A1`: recoger y registrar los recuentos del próximo ciclo de reposición separados por turno y proveedor.
- **Razón:** `HP1′` está reformulada y todavía sin evidencia que la contraste; `Foco 1` (Comprensión causal) es el foco principal seleccionado y su trabajo pendiente es obtener evidencia que discrimine la causa candidata; `A1` es la única Acción activa, aceptada y dentro del alcance declarado (cambios reversibles y de bajo riesgo).

## Repo-side vs Project

- **Se cargan al Project (únicas fuentes del fixture):** `estado-proyecto.md` y `historia-material.md`.
- **Permanecen repo-side y nunca se cargan al Project:** `fixture-esperado.md` (este archivo) e `instrucciones-project-rt01.md`.
