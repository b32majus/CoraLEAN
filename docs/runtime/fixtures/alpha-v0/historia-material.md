# Historia material — `Fixture Alfa`

> **Log de solo adición** de eventos materiales (RT-01 / Alpha Runtime Verification v0). Fixture sintético y de proceso; sin datos reales de Mérida, sin datos clínicos ni de paciente. No se edita, no se borra y no se reordena: los eventos se añaden. El campo `Actor` nombra a la persona que ejecuta el evento material; no se colapsa con «registró», «aportó» ni «fuente» (las trazas de procedencia se detallan en el bloque 9 de `estado-proyecto.md`).

| Ordinal | Evento | Actor | Efecto | Razón |
|---|---|---|---|---|
| 1 | Activación del proyecto | `F. Ficticia` | Estado `En preparación` → `Activo` | Condiciones habilitantes declaradas (autoridad, acceso a recuentos, tiempo protegido) |
| 2 | `H1` (Hecho) | `R. Ficticia` | Registra el Hecho `H1` (faltantes del carro) | Recuento ficticio de reposición aplicado al foco Comprensión causal |
| 3 | `HP1` (Hipótesis) | `R. Ficticia` (aportada; propuesta por `CoraLEAN`) | `HP1` en prueba: falta de doble chequeo explica los faltantes | Explica `H1`; fuente `sesión ficticia S-01` |
| 4 | `E1` (Evidencia) | `R. Ficticia` | `E1` soporta `HP1` | Fuente `hoja ficticia FC-01` (reposición sin incidencias donde hubo doble chequeo) |
| 5 | `E2` (Evidencia) | `R. Ficticia` | `E2` refuta `HP1` → `HP1` pasa a `refutada` | Fuente `hoja ficticia FC-02` (hubo doble chequeo y aun así faltantes) |
| 6 | Reapertura `R1` | `F. Ficticia` | Reabre el área «Comprensión causal» | La refutación (`E2`) obliga a reexaminar la causa |
| 7 | `HP1′` (Hipótesis reformulada) | `R. Ficticia` (propuesta por `CoraLEAN`) | `HP1′` reformulada: la variabilidad del proveedor explica los faltantes | Nueva causa candidata tras `E2`/`R1` |
| 8 | `D1` (Decisión) | `F. Ficticia` | Registra `D1` (cambio reversible del punto de reposición; no sobrescribe decisión previa) | Decisión de bajo riesgo dentro del alcance declarado; fuente `minuta ficticia MT-01` |
| 9 | `A1` (Acción) | `R. Ficticia` (recomendación de `CoraLEAN` aceptada) | `A1` (recomendación aceptada → entidad Acción) | El siguiente paso aceptado se convierte en entidad Acción (ADR-015) |
| 10 | Autorización del Patrocinador/a | `P. Ficticia` | Autoriza el experimento/cambio de bajo riesgo | Transición con requisito de autorización humana (ADR-015) |

No hay undécimo evento.
