# Estado del proyecto — `Fixture Alfa` (snapshot canónico)

> **Fixture sintético repo-side (RT-01 / Alpha Runtime Verification v0).** Contenido totalmente ficticio y de proceso (reposición de un carro de material fungible en la «Unidad Ficticia U-A»). Sin datos reales de Mérida, sin datos clínicos ni de paciente, sin datos identificables. Autoridad: ADR-015 (nueve bloques, snapshot + historia material, procedencia en tres trazas, derivados no persistidos) y ADR-017 (representación `estado-proyecto.md` + `historia-material.md`); plan `docs/runtime/ALPHA_RUNTIME_VERIFICATION_V0.md` §2. Este fixture **no modifica ni reabre ningún ADR**.

## 1. Identidad y roles

- Proyecto: `Fixture Alfa`
- Responsable local del proyecto: `R. Ficticia`
- Facilitador/a: `F. Ficticia`
- Patrocinador/a: `P. Ficticia`

## 2. Estado del proyecto

- Estado: `Activo`
- Razón de la transición: desde `En preparación` por activación — condiciones habilitantes declaradas (autoridad, acceso a recuentos, tiempo protegido) y validación humana (ADR-011).

## 3. Condiciones habilitantes

- Autoridad declarada — estado: `cumplida` — razón: la autoridad necesaria para la reposición del carro está declarada dentro del alcance (bloque 4).
- Acceso a recuentos — estado: `cumplida` — razón: se dispone del recuento ficticio del carro del ciclo de reposición.
- Tiempo protegido — estado: `cumplida` — razón: el equipo dispone de tiempo reservado para registrar y revisar los recuentos.

## 4. Alcance y autoridad declarada

- Alcance: reposición del carro de material fungible de la «Unidad Ficticia U-A» (frecuencia de reposición, contenido del carro y punto de reposición).
- Tipo de cambios dentro de autoridad: cambios reversibles y de bajo riesgo.
- Exclusiones explícitas: sin compras de gran importe, sin contratación y sin datos de paciente.

## 5. Áreas de razonamiento (siete áreas, ADR-007)

> Nota (ADR-008/ADR-015): este bloque registra solo criterios (definición y estado) y relevancia por área. No se almacenan etiquetas ni niveles derivados; los derivados no son verdad primaria.

### 5.1 Problema y contexto

- Criterio `PC-1` (`semilla`) — definición: problema formulado con su porqué y para quién — estado: `cumplido` — razón: el Hecho `H1` documenta faltantes del carro.
- Criterio `PC-2` (`semilla`) — definición: límites del problema dentro del alcance declarado — estado: `cumplido` — razón: el alcance está declarado en el bloque 4.
- Relevancia: `relevante`.

### 5.2 Situación actual

- Criterio `SA-1` (`semilla`) — definición: descripción de cómo se repone hoy el carro (frecuencia, contenido, punto de reposición) — estado: `cumplido` — razón: conocida y declarada en el alcance.
- Criterio `SA-2` (`semilla`) — definición: línea base comparable de faltantes — estado: `pendiente` — razón: solo existe el recuento puntual del ciclo ficticio; falta una serie comparable.
- Relevancia: `relevante`.

### 5.3 Objetivo y medidas

- Criterio `OM-1` (`semilla`) — definición: medida de proceso definida (faltantes registrados por ciclo de reposición) — estado: `cumplido` — razón: `H1` usa el recuento por ciclo.
- Criterio `OM-2` (`semilla`) — definición: medida de resultado con línea base — estado: `pendiente` — razón: la medición empezará con la Acción `A1`; no hay serie histórica ficticia.
- Relevancia: `relevante`.

### 5.4 Comprensión causal

- Criterio `CC-1` (`semilla`) — definición: hipótesis causal con estatus explícito — estado: `cumplido` — razón: `HP1` es `refutada` y `HP1′` es `reformulada`.
- Criterio `CC-2` (`semilla`) — definición: evidencia que contrasta la hipótesis vigente — estado: `pendiente` — razón: `HP1′` aún no tiene evidencia que la contraste.
- Relevancia: `relevante`.

### 5.5 Estrategia de cambio

- Criterio `EC-1` (`semilla`) — definición: cambio ligado a una causa candidata — estado: `cumplido` — razón: la Decisión `D1` ajusta el punto de reposición, de bajo riesgo y reversible.
- Criterio `EC-2` (`semilla`) — definición: opciones comparadas con criterios explícitos — estado: `pendiente` — razón: en el fixture solo se registró una opción.
- Relevancia: `relevante`.

### 5.6 Experimentación y adopción

- Criterio `EA-1` (`semilla`) — definición: prueba planificada y separada de la adopción — estado: `cumplido` — razón: `A1` define la recogida de recuentos del próximo ciclo; `D1` no se declara estándar.
- Criterio `EA-2` (`semilla`) — definición: resultado de la prueba registrado — estado: `pendiente` — razón: la prueba todavía no se ha ejecutado.
- Relevancia: `relevante`.

### 5.7 Evaluación y sostenibilidad

- Criterio `ES-1` (`semilla`) — definición: evaluación de la sostenibilidad de un cambio adoptado — estado: `pendiente` — razón: no hay cambio adoptado (`D1` es reversible y no estandarizado).
- Relevancia: `no aplicable todavía`.

## 6. Entidades transversales (11)

- `H1` (Hecho): faltantes de material registrados en el recuento del carro.
- `HP1` (Hipótesis): «la falta de doble chequeo explica los faltantes»; estatus actual `refutada` (historial: `en prueba` → `refutada` por `E2`); aportó `R. Ficticia`, propuesta por `CoraLEAN`; fuente `sesión ficticia S-01`.
- `HP1′` (Hipótesis reformulada): «la variabilidad del proveedor explica los faltantes»; estatus `reformulada`; aportó `R. Ficticia`, propuesta por `CoraLEAN`; nueva causa candidata tras `E2`/`R1`.
- `E1` (Evidencia): relación `soporta` `HP1`; fuente `hoja ficticia FC-01`.
- `E2` (Evidencia): relación `refuta` `HP1`; fuente `hoja ficticia FC-02`.
- `D1` (Decisión): cambio reversible del punto de reposición; registrada sin sobrescribir ninguna decisión previa; fuente `minuta ficticia MT-01`.
- `A1` (Acción): «recoger y registrar los recuentos del próximo ciclo de reposición separados por turno y proveedor»; origen: recomendación de `CoraLEAN` aceptada por `R. Ficticia`; estado: `activa`.
- `M1` (Reunión): reunión ficticia del equipo del carro para revisar los recuentos del ciclo (proceso, sin datos de paciente).
- `AR1` (Artefacto): hoja de recuento del carro (proyección del estado, ficticia).
- `L1` (Aprendizaje): separar los recuentos por turno y proveedor ayuda a discriminar la causa candidata (ficticio).
- `Q1` (Cuestión abierta): «¿La variabilidad del proveedor explica los faltantes del carro, o se concentra en turnos o días concretos?»

## 7. Focos de decisión

- `Foco 1` (Comprensión causal) — principal; **seleccionado explícitamente por la persona** (`R. Ficticia`) (ADR-012/ADR-015).
- `Foco 2` (Experimentación y adopción) — activo (evaluación de cambios reversibles de bajo riesgo).

## 8. Historia material

- Referencia: `historia-material.md` (registro de **solo adición**; no se edita ni se reordena).
- Entre los eventos registrados está la reapertura `R1` del área «Comprensión causal».

## 9. Procedencia (tres trazas separadas, ADR-015)

- `E2`: registró `CoraLEAN` / aportó `R. Ficticia` / fuente `hoja ficticia FC-02`
- `HP1`: registró `CoraLEAN` / aportó `R. Ficticia` / fuente `sesión ficticia S-01`
- `D1`: registró `R. Ficticia` / aportó `F. Ficticia` / fuente `minuta ficticia MT-01`
