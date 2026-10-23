# Verificación Alpha del Runtime v0 — plan de verificación empírica del Runtime Contract (Alpha Runtime Verification v0)

**Título:** Verificación Alpha del Runtime v0 — plan ejecutable de las 12 pruebas Alpha (ADR-017) (Alpha Runtime Verification v0)
**Fecha:** 2026-10-04
**Estado:** `plan v0 — pendiente de ejecución`
**Unidad:** C-084 · `work/alpha-runtime-c084-20261004` · base `e20c90d`

## Autoridad

Autoridad de la unidad (lista del handoff `docs/handoffs/ALPHA_RUNTIME_VERIFICATION_V0_20261004.md`):

- `START_HERE.md`
- `AGENTS.md`
- `CONTEXT.md`
- `CODING_STANDARDS.md`
- `docs/CORE_FREEZE_V0.1.md`
- `docs/decisions/ADR-017-runtime-contract-v0.md`
- `docs/decisions/ADR-019-acceptance-scenarios-v01.md`
- `docs/execution/ATENEA_C084_LOCAL_RECONCILIATION_20261004.md`

Documentos de apoyo consultados en esta unidad (no reabiertos, citados por número de ADR y sección verificada):

- `GLOSSARY.md` (vocabulario canónico).
- `docs/decisions/ADR-002-method-first-chatgpt-project-first.md` (decisión y reversal condition).
- `docs/decisions/ADR-015-contrato-del-project-state.md` (nueve bloques, snapshot + historia material, procedencia en tres trazas, disciplina de mutación).
- `docs/decisions/ADR-009-lengua-canonica-espanol.md` (lengua canónica de producto/dominio: español).

## Declaración de freeze

Este documento **NO modifica ni reabre** el Core Freeze v0.1 ni los ADRs 001–019, que permanecen como autoridad conceptual aceptada. Es **aprendizaje post-freeze**: prepara la evidencia empírica con la que se juzgará la hipótesis de runtime (ADR-017), no una decisión nueva de producto. Si una prueba revelara que un ADR del Core —y no solo un mecanismo de runtime— debe cambiar, se aplica la regla de STOP de la sección 9.

El Runtime Contract v0 se apoya en ADR-017 (hipótesis de V0 con criterios de aceptación empíricos) y ADR-002 (Project-first con reversal condition). El mecanismo físico de actualización del estado y la representación `estado-proyecto.md` + `historia-material.md` siguen siendo **diseño candidato condicionado a validación** (ADR-017 decisión 2; `docs/CORE_FREEZE_V0.1.md` §2).

---

## 1. Objeto y límites de este plan

Este plan hace **ejecutables** las 12 hipótesis empíricas de ADR-017 («Hipótesis empíricas — criterios de aceptación del runtime (sprint Alpha)», puntos 1–12), mediante identificadores estables `RT-01` … `RT-12` mapeados uno a uno y en orden con dichas hipótesis.

Convención de citas de ADR-017 en este documento: `ADR-017 §n` designa la **n-ésima hipótesis empírica** del bloque «Hipótesis empíricas» (n = 1…12); las referencias al bloque «Decidido» (puntos 1–6) se escriben **`ADR-017 decisión n`**.

Límite explícito de observabilidad: **VPS/OpenCode no puede observar el comportamiento interno de un ChatGPT Project.** Todo comportamiento de ChatGPT Project lo observa y captura una persona (Silvia) en la superficie de Project; el lado repo/VPS-OpenCode solo prepara fixture, guiones, instrumentos de comparación y almacenamiento de evidencia. Ninguna sección de este plan afirma lo contrario.

Este documento **no ejecuta** la batería. Todos los campos `Resultado observado` son `PENDIENTE` hasta que exista una corrida real con evidencia capturada.

---

## 2. Fixture sintético único

Un **único fixture sintético**, pequeño y totalmente inventado, es usado por las 12 pruebas. No contiene datos clínicos, ni datos de pacientes, ni datos identificables, ni datos reales de Mérida: nombres, unidad, fechas, cifras y documentos son ficticios.

**Dominio del fixture (proceso, no paciente):** reposición de un carro de material fungible en una «Unidad Ficticia U-A». La información del fixture es de proceso (recuentos, tiempos, decisiones), nunca de paciente.

**Artefactos canónicos del fixture** (representación candidata de ADR-017 decisión 2):

1. `estado-proyecto.md` — snapshot canónico actual con los **nueve bloques** de ADR-015:
   1. Identidad y roles (proyecto `Fixture Alfa`; Responsable local `R. Ficticia`; Facilitador/a `F. Ficticia`; Patrocinador/a `P. Ficticia`).
   2. Estado del proyecto: `Activo`, con la razón de la transición desde `En preparación`.
   3. Condiciones habilitantes: autoridad declarada, acceso a recuentos, tiempo protegido (con estado y razón).
   4. Alcance y autoridad declarada: reposición del carro; cambios reversibles y de bajo riesgo.
   5. Áreas de razonamiento (las siete de ADR-007) con criterios, estado y relevancia; la suficiencia **no** se almacena (ADR-008).
   6. Entidades transversales: Hecho `H1`; Hipótesis `HP1` (en prueba → refutada) y `HP1′` (reformulada); Evidencia `E1` (soporta) y `E2` (refuta); Decisión `D1`; Acción `A1`; Reunión `M1`; Artefacto `AR1`; Aprendizaje `L1`; Cuestión abierta `Q1`.
   7. Focos de decisión: `Foco 1` (Comprensión causal) principal y `Foco 2` (Experimentación) activo (ADR-012).
   8. Historia material: referencia a `historia-material.md`.
   9. Procedencia: tres trazas separadas para `E2`, `HP1` y `D1` (ADR-015).
2. `historia-material.md` — log de **solo adición** de eventos materiales, cada uno con actor, efecto y razón. Eventos ficticios: activación del proyecto; `H1`; `HP1`; `E1`; `E2` (refuta `HP1`); reapertura `R1` de «Comprensión causal»; `HP1′`; `D1`; `A1`; autorización ficticia del Patrocinador/a.

**Eventos materiales del fixture (`Evento | Actor | Efecto | Razón`):** actores ficticios canónicos `R. Ficticia` (Responsable local), `F. Ficticia` (Facilitador/a), `P. Ficticia` (Patrocinador/a) y `CoraLEAN` (registro/propuesta, no persona). El campo `Actor` nombra a la persona que ejecuta el evento material (intervención humana, ADR-015); el registro y las trazas de procedencia se detallan en el bloque 9 y en `fixture-esperado.md`.

| Evento | Actor | Efecto | Razón |
|---|---|---|---|
| Activación del proyecto | `F. Ficticia` | Estado `En preparación` → `Activo` | Condiciones habilitantes declaradas (autoridad, acceso a recuentos, tiempo protegido) |
| `H1` (Hecho) | `R. Ficticia` | Registra el Hecho `H1` (faltantes del carro) | Recuento ficticio de reposición aplicado al foco Comprensión causal |
| `HP1` (Hipótesis) | `R. Ficticia` (aportada; propuesta por `CoraLEAN`) | `HP1` en prueba: falta de doble chequeo explica los faltantes | Explica `H1`; fuente `sesión ficticia S-01` |
| `E1` (Evidencia) | `R. Ficticia` | `E1` soporta `HP1` | Fuente `hoja ficticia FC-01` (reposición sin incidencias donde hubo doble chequeo) |
| `E2` (Evidencia) | `R. Ficticia` | `E2` refuta `HP1` → `HP1` pasa a `refutada` | Fuente `hoja ficticia FC-02` (hubo doble chequeo y aun así faltantes) |
| Reapertura `R1` | `F. Ficticia` | Reabre el área «Comprensión causal» | La refutación (`E2`) obliga a reexaminar la causa |
| `HP1′` (Hipótesis reformulada) | `R. Ficticia` (propuesta por `CoraLEAN`) | `HP1′` reformulada: la variabilidad del proveedor explica los faltantes | Nueva causa candidata tras `E2`/`R1` |
| `D1` (Decisión) | `F. Ficticia` | Registra `D1` (cambio reversible del punto de reposición; no sobrescribe decisión previa) | Decisión de bajo riesgo dentro del alcance declarado; fuente `minuta ficticia MT-01` |
| `A1` (Acción) | `R. Ficticia` (recomendación de `CoraLEAN` aceptada) | `A1` (recomendación aceptada → entidad Acción) | El siguiente paso aceptado se convierte en entidad Acción (ADR-015) |
| Autorización del Patrocinador/a | `P. Ficticia` | Autoriza el experimento/cambio de bajo riesgo | Transición con requisito de autorización humana (ADR-015) |

**Recuentos base del fixture (referencia para `RT-08`):** el fixture base contiene **11 entidades transversales** (bloque 6: `H1`, `HP1`, `HP1′`, `E1`, `E2`, `D1`, `A1`, `M1`, `AR1`, `L1`, `Q1`) y **10 eventos materiales** (`historia-material.md`, tabla anterior). Las variantes escaladas `V×N` se definen como N× esos recuentos.

**Cobertura requerida del fixture** (debe ser suficiente para ejercitar exactamente lo que exige el handoff):

| Elemento a ejercitar | Dónde vive en el fixture |
|---|---|
| Hipótesis | `HP1` (en prueba / refutada) y `HP1′` (reformulada) |
| Evidencia | `E1` (soporta) y `E2` (refuta) |
| Decisión | `D1` (registrada, no sobrescrita) |
| Acción | `A1` (recomendación aceptada → entidad Acción, ADR-015) |
| Reapertura | `R1` (evento material, no nivel; GLOSSARY `Reapertura`) |
| Procedencia (tres trazas, ADR-015) | `E2` (registró CoraLEAN / aportó `R. Ficticia` / fuente `hoja ficticia FC-02`), `HP1` (registró CoraLEAN / aportó `R. Ficticia` / fuente `sesión ficticia S-01`) y `D1` (registró `R. Ficticia` / aportó `F. Ficticia` / fuente `minuta ficticia MT-01`) |

**Instrumentos repo-side que NO forman parte del fixture cargado:** `fixture-esperado.md` (clave de respuestas esperadas para comparar), variantes escaladas para RT-08, copias divergentes para RT-04/RT-07 y snapshot corrupto para RT-06. Son instrumentos de evaluación, no estado del Project.

**Contenido requerido de `fixture-esperado.md`** (clave de respuestas repo-side; no se carga al Project). Debe fijar los valores esperados por bloque de ADR-015 que usan las comparaciones de `RT-01`, `RT-02`, `RT-05`, `RT-06` y `RT-08`:

- **estado del proyecto:** `Activo`.
- **foco principal:** `Foco 1` (Comprensión causal).
- **siguiente paso + razón:** el siguiente paso esperado y su razón derivada (ADR-015: derivado, no verdad primaria).
- **cuestión abierta:** `Q1`.
- **estatus de hipótesis:** `HP1` = `refutada`; `HP1′` = `reformulada`.
- **trazas de procedencia (tres por entidad):** `E2` (registró `CoraLEAN` / aportó `R. Ficticia` / fuente `hoja ficticia FC-02`), `HP1` (registró `CoraLEAN` / aportó `R. Ficticia` / fuente `sesión ficticia S-01`), `D1` (registró `R. Ficticia` / aportó `F. Ficticia` / fuente `minuta ficticia MT-01`).
- **checklist del foco principal (para `RT-08`):** entidades `H1`, `HP1`, `HP1′`, `E1`, `E2`, `D1` (total 6), usadas para calcular `omisiones(V) = entidades del checklist ausentes / 6`.

**Preparación y carga:** el fixture se **prepara y versiona del lado del repo** (artefactos `estado-proyecto.md` y `historia-material.md`) y se **carga manualmente en el ChatGPT Project** por Silvia. En esta unidad **no se materializan ni se comitean** los ficheros del fixture: solo se especifican aquí; su creación es una tarea repo-side previa a la primera corrida (sección 10).

---

## 3. Orden de ejecución por dependencias

Orden numerado con la razón de cada posición. Las «olas» agrupan pruebas que pueden correr en paralelo sobre **copias independientes** del fixture.

| Orden | Prueba | Razón de la posición |
|---|---|---|
| 1 | `RT-01` (Lectura en frío) | Punto de entrada: sin lectura correcta del fixture no puede validarse ninguna actualización ni persistencia. Sin dependencia previa. |
| 2 | `RT-03` (Actualización física) | Depende de `RT-01` (el fixture debe poder leerse) y determina el mecanismo físico (in-place vs nueva fuente vs propuesta) del que dependen `RT-02`, `RT-04`, `RT-07`, `RT-09` y `RT-10`. |
| 3 | `RT-02` (Persistencia de actualización) | Depende de `RT-03` (debe existir una nueva versión) y de `RT-01`. Un segundo chat solo puede observarse tras producir una versión. |
| 4 | `RT-04` (Conflictos de versión) | Depende de `RT-02`/`RT-03` (capacidad de producir ≥2 versiones). Inicia la ola paralela sobre copias independientes. |
| 5 | `RT-05` (Procedencia) | Depende de `RT-02`/`RT-03` (una actualización con autoría y fuente). Observable independiente de `RT-04`; corre en paralelo. |
| 6 | `RT-06` (Recuperación) | Depende de `RT-02`/`RT-03` y de la existencia de `historia-material.md`. Independiente de `RT-04`/`RT-05`; corre en paralelo. |
| 7 | `RT-11` (Skills ausentes) | Depende de `RT-01` (el protocolo Core + archivos debe poder ejecutarse). Se ejecuta sobre copia limpia; corre en paralelo con la ola 3. |
| 8 | `RT-07` (Concurrencia) | **BLOQUEADO** por `RT-04` (hay que conocer el comportamiento de versiones) y depende de `RT-02`/`RT-03` (mutación y persistencia). No puede paralelizarse con `RT-04`: necesita su resultado. |
| 9 | `RT-08` (Tamaño) | Depende de `RT-01`/`RT-02` (lectura y persistencia correctas en el fixture mínimo) y luego escala el mismo fixture. Puede correr en paralelo con `RT-09`. |
| 10 | `RT-09` (Voice → estado) | Depende de `RT-02`/`RT-03` (el protocolo de persistencia debe funcionar en texto antes de probar la superficie de voz). Puede correr en paralelo con `RT-08`. |
| 11 | `RT-12` (Memoria del Project vs estado explícito) | Depende de `RT-01` y de que la **memoria implícita** del Project se haya poblado con interacciones previas; por eso va tarde, cuando ya existen chats suficientes en el Project. |
| 12 | `RT-10` (Work disponible/no disponible) | Es una bifurcación de configuración del mecanismo de persistencia: se ejecuta una vez conocido y estabilizado dicho mecanismo (`RT-02`/`RT-03`/`RT-09`). Va último para no introducir una variable de configuración en las pruebas base. |

**Resumen de paralelismo:**

- Espina secuencial obligatoria: `RT-01` → `RT-03` → `RT-02`.
- Ola paralela tras la espina (cada prueba sobre copia independiente): `RT-04`, `RT-05`, `RT-06`, `RT-11`.
- `RT-07` queda bloqueado hasta que cierre `RT-04`.
- Ola paralela posterior: `RT-08`, `RT-09`.
- Después: `RT-12` (necesita memoria acumulada) y, por último, `RT-10` (bifurcación de configuración).

---

## 4. Especificación por prueba

Un apartado por hipótesis de ADR-017. El campo `Resultado observado` es `PENDIENTE` en todas: no se registra ningún veredicto hasta una corrida real.

### RT-01 — Lectura en frío (ADR-017 §1)

- **Hipótesis:** un chat nuevo del Project, con acceso solo a las fuentes del fixture y a instrucciones delgadas, sin explicación adicional, reconstruye correctamente estado, foco, siguiente paso y cuestiones abiertas.
- **Precondiciones:** fixture cargado en el Project; instrucciones delgadas (ADR-017 decisión 5); Skills no invocadas; ninguna conversación previa en ese chat; clave `fixture-esperado.md` preparada repo-side.
- **Procedimiento reproducible:**
  1. Repo-side: materializar `estado-proyecto.md` y `historia-material.md` del fixture y `fixture-esperado.md` (clave, no cargada).
  2. Silvia: crear un chat nuevo en el Project sin aportar contexto.
  3. Silvia: enviar el prompt fijado «¿Dónde estamos y qué toca ahora?».
  4. Silvia: copiar la respuesta íntegra y guardarla.
  5. Repo-side: contrastar la respuesta con `fixture-esperado.md`.
- **Resultado esperado:** la respuesta nombra el estado del proyecto, el foco principal correcto, el siguiente paso con su razón y al menos una cuestión abierta; no inventa entidades.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** se aplica en este orden y asigna un único veredicto a toda observación. BLOCKED si el chat nuevo no recibe las fuentes o el Project no arranca. FAIL si inventa entidades, o contradice el estado explícito en foco o siguiente paso, o no acierta ninguno de los 4 criterios (0 de 4) sin inventar entidades. PARTIAL si acierta 1–3 de los 4 criterios, no inventa entidades y no contradice el estado explícito en foco o siguiente paso. PASS si acierta los 4 criterios (estado / foco / siguiente paso + razón / cuestión abierta), no inventa entidades y no contradice el estado explícito.
- **Evidencia requerida:** captura de la respuesta íntegra; `fixture-esperado.md`; captura de la configuración del Project (instrucciones y fuentes).
- **Implicación:** valida la premisa básica de ADR-017/ADR-015 (estado explícito reconstruible en frío). Un fallo repetido tensa la reversal condition de ADR-002; un fallo aislado es una limitación de runtime, no una contradicción del Core.
- **Siguiente acción:** si PASS, continuar con `RT-03`; si FAIL/PARTIAL, revisar instrucciones delgadas y representación antes de tocar semántica del Core.
- **Paso manual o preparable:** ambos (repo prepara fixture y clave; Silvia ejecuta el chat y captura).

### RT-02 — Persistencia de actualización (ADR-017 §2)

- **Hipótesis:** tras una actualización material del estado producida por un chat, un segundo chat nuevo ve exactamente la nueva versión.
- **Precondiciones:** `RT-01` PASS; mecanismo de actualización conocido por `RT-03`; copia A del fixture.
- **Procedimiento reproducible:**
  1. En el chat 1, aplicar la actualización material predefinida (registrar `HP1′` y la Acción `A1`) según el protocolo de cierre de ADR-017 decisión 4.
  2. Silvia confirma y guarda/nombra la nueva versión según el mecanismo que fije `RT-03`.
  3. Abrir un chat 2 nuevo en el mismo Project.
  4. Preguntar «¿cuál es el estado de la hipótesis causal y qué acción está activa?».
  5. Comparar la respuesta con la versión actual.
- **Resultado esperado:** el chat 2 reporta `HP1′` y `A1`, no `HP1` original.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si el chat 2 reporta exactamente la versión nueva (`HP1′` + `A1`) sin mezclar la anterior. PARTIAL si ve solo parte del cambio. FAIL si ve la versión anterior o dos versiones sin resolver. BLOCKED si no puede producirse o sustituirse la fuente.
- **Evidencia requerida:** `estado-proyecto.md` antes y después; captura del chat 2; identificador/versión de la fuente usada.
- **Implicación:** valida la promesa de continuidad entre chats (ADR-015). Un fallo sistémico activa la necesidad de un protocolo alternativo (ADR-017 decisión 2), no un cambio de Core.
- **Siguiente acción:** alimentar `RT-04` y `RT-07`.
- **Paso manual o preparable:** Silvia ejecuta; repo prepara la actualización y compara.

### RT-03 — Actualización física (ADR-017 §3)

- **Hipótesis:** puede determinarse si un chat normal modifica in-place la fuente canónica existente o solo genera/guarda una nueva o propone una actualización.
- **Precondiciones:** `RT-01`; copia del fixture; acceso a la UI de fuentes del Project.
- **Procedimiento reproducible:**
  1. Antes: registrar hash/contenido de `estado-proyecto.md`.
  2. Pedir al chat que actualice el estado con el cambio material predefinido.
  3. Observar qué acción ejecuta: ¿sobrescribe la fuente? ¿crea copia? ¿solo produce texto? ¿propone y espera confirmación?
  4. Después: registrar hash/contenido y la fuente resultante.
  5. Clasificar el mecanismo observado.
- **Resultado esperado:** se identifica uno de estos mecanismos: (i) in-place fiable; (ii) guardar como nueva fuente; (iii) propuesta + confirmación manual; (iv) solo texto (sin persistencia).
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si el mecanismo queda identificado y es reproducible en 2 intentos consecutivos. PARTIAL si el mecanismo varía o depende de condiciones no controladas. FAIL si no puede determinarse ni tan siquiera como «propuesta». BLOCKED si la UI/plan no expone la edición de fuentes.
- **Evidencia requerida:** capturas antes/después; hash/contenido; descripción del flujo de UI observado.
- **Implicación:** decide qué protocolo de ADR-017 decisión 2 se usará; no cambia el Core.
- **Siguiente acción:** fijar el protocolo de actualización para el resto de pruebas.
- **Paso manual o preparable:** Silvia ejecuta y observa; repo aporta hashes/copias de comparación.

### RT-04 — Conflictos de versión (ADR-017 §4)

- **Hipótesis:** con dos snapshots/versiones duplicadas presentes, CoraLEAN detecta y señala el conflicto en lugar de elegir en silencio.
- **Precondiciones:** `RT-02`/`RT-03`; dos versiones divergentes del fixture (`vA` y `vB`) preparadas repo-side con un cambio incompatible (`HP1` refutada en `vA` vs aceptada en `vB`).
- **Procedimiento reproducible:**
  1. Cargar `vA` y `vB` en el Project.
  2. Abrir un chat nuevo.
  3. Preguntar por el estado y por la existencia de conflicto.
  4. Registrar si detecta, señala y propone reconciliación (ADR-017 decisión 3).
- **Resultado esperado:** detecta las dos versiones, señala el conflicto, no decide unilateralmente y propone reconciliación con validación humana.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si detecta y señala sin elegir en silencio y propone reconciliación. PARTIAL si detecta pero no propone reconciliación. FAIL si elige una versión en silencio o las mezcla. BLOCKED si el runtime no permite tener dos versiones a la vez.
- **Evidencia requerida:** captura de la respuesta; inventario de versiones cargadas.
- **Implicación:** valida la gobernanza de mutación (ADR-017 decisión 3); un fallo se mitiga por proceso/protocolo, no reescribiendo el Core sin evidencia.
- **Siguiente acción:** informar `RT-07`.
- **Paso manual o preparable:** repo prepara las versiones divergentes; Silvia ejecuta y captura.

### RT-05 — Procedencia (ADR-017 §5)

- **Hipótesis:** puede saberse de forma fiable qué actualización propuso CoraLEAN y cuál confirmó una persona, conservando las tres trazas de ADR-015 (quién registró / quién aportó / fuente evidencial).
- **Precondiciones:** `RT-02`/`RT-03`; copia del fixture con las trazas esperadas de `E2`, `HP1`, `D1`.
- **Procedimiento reproducible:**
  1. El chat propone una actualización (crear `E2` con la fuente documental ficticia `FC-02`).
  2. Silvia confirma unas entradas y rechaza/edita otras.
  3. Abrir un chat nuevo y preguntar quién registró, quién aportó y cuál es la fuente de cada entrada.
  4. Comparar con la traza esperada del fixture.
- **Resultado esperado:** las tres trazas se conservan separadas y distinguen propuesta de confirmación.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** se aplica en este orden y asigna un único veredicto a toda observación. BLOCKED si el mecanismo de registro no preserva autoría. FAIL si no se recupera ninguna de las tres entidades (`E2`, `HP1`, `D1`), o no se distingue propuesta de confirmación, o alguna autoría recuperada es incorrecta. PARTIAL si se recuperan 1–2 de las tres entidades o alguna de sus trazas aparece colapsada, y ninguna autoría recuperada es incorrecta. PASS si las tres trazas separadas (quién registró / quién aportó / fuente evidencial) son recuperables y correctas para `E2`, `HP1` y `D1`.
- **Evidencia requerida:** estado con las trazas; transcripción del intercambio; captura del chat de verificación.
- **Implicación:** valida ADR-015 (procedencia) en runtime; es prerequisito de la auditoría del estado.
- **Siguiente acción:** usar la evidencia como insumo de `RT-12`.
- **Paso manual o preparable:** Silvia ejecuta; repo prepara la traza esperada y compara.

### RT-06 — Recuperación (ADR-017 §6)

- **Hipótesis:** ante un snapshot corrupto deliberadamente, CoraLEAN reconstruye el estado desde `historia-material.md`.
- **Precondiciones:** `RT-02`/`RT-03`; copia del fixture con `historia-material.md` intacto.
- **Procedimiento reproducible:**
  1. Repo-side: crear `estado-proyecto.md` corrupto (contenido inválido o truncado).
  2. Conservar `historia-material.md` intacto.
  3. Pedir al chat que reconstruya el estado.
  4. Comparar la reconstrucción con el snapshot esperado.
- **Resultado esperado:** reconstruye el estado actual y los eventos materiales relevantes con trazabilidad a la historia, sin inventar.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si reconstruye el snapshot correcto con trazabilidad a la historia. PARTIAL si reconstruye parcialmente sin inventar. FAIL si inventa o no reconstruye. BLOCKED si el mecanismo depende de un snapshot válido y no lee la historia.
- **Evidencia requerida:** snapshot corrupto; `historia-material.md`; reconstrucción; diff contra el snapshot esperado.
- **Implicación:** valida `historia-material.md` como respaldo (ADR-015). Un fallo exige protocolo alternativo de ADR-017 decisión 2, no cambio de Core.
- **Siguiente acción:** registrar la limitación si aplica; alimentar `RT-12`.
- **Paso manual o preparable:** repo corrompe y compara; Silvia ejecuta la reconstrucción.

### RT-07 — Concurrencia (ADR-017 §7)

- **Hipótesis:** dos chats concurrentes desde la misma versión producen write-after-stale-read, y el runtime lo detecta o no.
- **Precondiciones:** `RT-02`/`RT-03`/`RT-04`; dos sesiones u operadores simultáneos; copia del fixture. `RT-07` **no** puede empezar hasta que cierre `RT-04`.
- **Procedimiento reproducible:**
  1. Ambos chats cargan la misma versión `v0`.
  2. El chat A aplica el cambio `α`; el chat B aplica el cambio `β` incompatible, sin recargar.
  3. Persistir A y después B (y repetir en orden inverso en una segunda pasada).
  4. Abrir un chat de verificación y comprobar si `α` se perdió o se detectó el conflicto.
- **Resultado esperado:** el runtime detecta, o al menos permite detectar, el write-after-stale-read; si no, se documenta la pérdida de forma explícita.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si el conflicto se detecta o se señala. PARTIAL si solo se detecta a posteriori mediante verificación manual. FAIL si se pierde un cambio en silencio sin señal alguna. BLOCKED si no pueden mantenerse dos chats concurrentes.
- **Evidencia requerida:** línea temporal de operaciones; capturas de ambos chats; estado final; resultado de la pasada inversa.
- **Implicación:** ADR-017 decisión 6 reconoce la concurrencia como **riesgo explícito de V0**. Un fallo NO invalida el Core: exige mitigación de proceso (evitar escrituras simultáneas), tal como ya anticipa ADR-017 (consecuencias negativas).
- **Siguiente acción:** definir la mitigación de proceso de concurrencia para el piloto.
- **Paso manual o preparable:** Silvia ejecuta las dos sesiones; repo registra la línea temporal.

### RT-08 — Tamaño (ADR-017 §8)

- **Hipótesis:** existe un umbral de tamaño de las fuentes a partir del cual la recuperación empieza a omitir información relevante.
- **Precondiciones:** `RT-01`/`RT-02`; generador repo-side de variantes escaladas del fixture; copia limpia del Project por variante.
- **Procedimiento reproducible:**
  1. Repo-side: a partir de los recuentos base del fixture (sección 2: 11 entidades transversales y 10 eventos materiales), generar tres variantes isomorfas del fixture: `V×2` (22 entidades, 20 eventos), `V×5` (55 entidades, 50 eventos) y `V×10` (110 entidades, 100 eventos), replicando la estructura de entidades y eventos con identificadores sufijados.
  2. Silvia: cargar cada variante en el ChatGPT Project (una a una, sobre copia limpia) y ejecutar la reconstrucción en frío con el prompt fijado «¿Dónde estamos y qué toca ahora?»; capturar la respuesta íntegra de cada variante.
  3. Repo-side: contrastar cada respuesta con el checklist de entidades del foco principal de `fixture-esperado.md` (`H1`, `HP1`, `HP1′`, `E1`, `E2`, `D1`; total 6) y calcular `omisiones(V) = entidades del checklist ausentes / 6`.
  4. Repetir cada variante en dos pasadas y registrar `omisiones(V)` por pasada.
- **Resultado esperado:** se identifica el tamaño a partir del cual aparecen omisiones reproducibles; por debajo del umbral, `omisiones = 0/6`.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** se aplica en este orden y asigna un único veredicto a toda observación. BLOCKED si el runtime trunca o no permite cargar las variantes. FAIL si no puede medirse la fidelidad (faltan capturas o el checklist no puede evaluarse en ninguna variante). PARTIAL si hay omisiones medidas pero el patrón no es estable entre las dos pasadas, o si todas las variantes dan `0/6` o todas `>0/6` (no se delimita umbral). PASS si existe al menos una variante con `omisiones = 0/6` y otra con `omisiones > 0/6`, y el patrón es estable en las dos pasadas de cada variante, declarando el umbral como la frontera entre el mayor tamaño con `0/6` y el menor con `>0/6`.
- **Evidencia requerida:** variantes generadas y sus recuentos; prompts y respuestas íntegras por variante; registro de omisiones por tamaño y pasada.
- **Implicación:** define límites operativos del fixture/Starter Kit; no cambia el Core.
- **Siguiente acción:** fijar el tamaño máximo soportado para el piloto.
- **Paso manual o preparable:** mixto: repo/VPS-OpenCode genera las variantes, prepara el checklist y calcula `omisiones(V)` comparando; Silvia carga cada variante y ejecuta/captura cada reconstrucción dentro del ChatGPT Project. El repo nunca observa ni ejecuta la reconstrucción.

### RT-09 — Voice → estado (ADR-017 §9)

- **Hipótesis:** una decisión tomada por voz llega correctamente a propuesta de persistencia.
- **Precondiciones:** `RT-02`/`RT-03`; Voice disponible en el plan/Project; decisión material predefinida (aceptar `A1`).
- **Procedimiento reproducible:**
  1. Silvia mantiene una interacción por Voice con la decisión material predefinida.
  2. Cerrar la interacción según el protocolo de cierre de ADR-017 decisión 4.
  3. Comprobar en el estado si la decisión aparece como propuesta/registro con procedencia.
- **Resultado esperado:** la decisión de voz genera una propuesta de actualización íntegra y con la traza correcta.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si la decisión llega íntegra y con procedencia. PARTIAL si llega parcial o sin procedencia. FAIL si no llega o se distorsiona. BLOCKED si Voice no está disponible en el plan/Project (se documenta como limitación de configuración).
- **Evidencia requerida:** transcripción de Voice; propuesta/estado resultante.
- **Implicación:** valida la paridad de superficie de interacción; un fallo es una limitación documentada, no un cambio de Core.
- **Siguiente acción:** registrar la limitación y el modo de trabajo resultante.
- **Paso manual o preparable:** Silvia ejecuta Voice y captura; repo compara con el estado esperado.

### RT-10 — Work disponible/no disponible (ADR-017 §10)

- **Hipótesis:** puede determinarse qué cambia en el mecanismo de persistencia según que Work esté disponible o no.
- **Precondiciones:** `RT-02`/`RT-03`/`RT-09`; capacidad de documentar y, si el plan lo permite, alternar la configuración de Work.
- **Procedimiento reproducible:**
  1. Documentar la configuración actual (Work disponible sí/no).
  2. Intentar la actualización material del fixture por el mecanismo fijado en `RT-03`.
  3. Repetir con la configuración alterna si el plan lo permite.
  4. Comparar qué persiste, qué cambia y qué se pierde en cada caso.
- **Resultado esperado:** se describe con precisión qué aporta Work y qué mecanismo queda cuando no está disponible.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si se caracteriza el comportamiento en ambas configuraciones (o se demuestra con evidencia que una de ellas no está disponible). PARTIAL si solo una configuración es observable. FAIL si no puede caracterizarse. BLOCKED si el plan no expone la configuración.
- **Evidencia requerida:** capturas de configuración por escenario; resultados por configuración.
- **Implicación:** valida que Work es una capacidad opcional del runtime y no un fundamento obligatorio (`START_HERE.md` §3; ADR-002).
- **Siguiente acción:** registrar el mecanismo por defecto soportado.
- **Paso manual o preparable:** Silvia ejecuta y cambia configuración; repo documenta y compara.

### RT-11 — Skills ausentes (ADR-017 §11)

- **Hipótesis:** el protocolo completo funciona solo con Core + archivos, sin Skills.
- **Precondiciones:** `RT-01`; copia limpia del fixture; forma verificable de deshabilitar Skills o demostrar su ausencia (la verifica Silvia en el Project).
- **Procedimiento reproducible:**
  1. Silvia: deshabilitar o verificar la ausencia de Skills en el Project (o demostrar que no se invocan).
  2. Ejecutar una interacción material completa con el fixture (inicio: consultar estado; cierre: extraer cambios durables), según ADR-017 decisión 4.
  3. Comparar el comportamiento con la equivalencia metodológica exigida por el GLOSSARY (sin la Skill, el procedimiento debe ejecutarse con equivalencia desde el Core).
- **Resultado esperado:** el protocolo se ejecuta con equivalencia metodológica sin Skills.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si el protocolo completo funciona sin Skills. PARTIAL si falla un paso recuperable manualmente. FAIL si el protocolo no puede ejecutarse. BLOCKED si no puede deshabilitarse Skills ni demostrarse su ausencia.
- **Evidencia requerida:** configuración del Project; transcripción de la interacción material; estado resultante.
- **Implicación:** confirma que Skills son aceleradores y no fundamento obligatorio (`START_HERE.md` §3; ADR-016).
- **Siguiente acción:** si FAIL, registrar la dependencia oculta detectada.
- **Paso manual o preparable:** Silvia deshabilita/verifica la ausencia de Skills en el ChatGPT Project y ejecuta la interacción (BLOCKED si no puede deshabilitarlas ni demostrar su ausencia); repo prepara la copia limpia del fixture, el guion de interacción de referencia y la comparación.

### RT-12 — Memoria del Project vs estado explícito (ADR-017 §12)

- **Hipótesis:** cuando la memoria implícita del Project discrepa del estado canónico explícito, CoraLEAN obedece al estado canónico.
- **Precondiciones:** `RT-01`; `RT-05` (trazas) disponible; memoria implícita ya poblada por chats previos.
- **Procedimiento reproducible:**
  1. Sembrar memoria implícita contradictoria: en un chat previo, afirmar una versión falsa (p. ej. `HP1` aceptada) sin persistirla.
  2. Asegurar que el estado explícito dice lo contrario (`HP1` refutada/reformulada a `HP1′`).
  3. Abrir un chat nuevo y preguntar por el estatus de `HP1`.
  4. Comprobar si sigue la memoria o el estado explícito.
- **Resultado esperado:** responde con el estado explícito y, si menciona la memoria, la marca como contexto auxiliar/no fiable.
- **Resultado observado:** `PENDIENTE`
- **Regla de veredicto (PASS / FAIL / PARTIAL / BLOCKED):** PASS si obedece al estado explícito y no eleva la memoria a verdad. PARTIAL si obedece al estado pero mezcla sin marcar. FAIL si sigue la memoria implícita contra el estado explícito. BLOCKED si no puede demostrarse que la memoria se sembró.
- **Evidencia requerida:** chat sembrador; estado explícito; respuesta del chat de prueba.
- **Implicación:** valida la jerarquía de ADR-017 decisión 1 (el estado explícito prevalece siempre); es central para juzgar la reversal condition de ADR-002.
- **Siguiente acción:** si FAIL, revisar las instrucciones delgadas; no cambiar el Core sin evidencia.
- **Paso manual o preparable:** Silvia ejecuta el sembrado y la prueba; repo prepara el estado contradictorio.

---

## 5. Índice de cobertura

Mapeo uno a uno y en orden con las hipótesis empíricas de ADR-017. `tipo de paso` indica el paso dominante.

| RT | hipótesis ADR-017 §n | orden de ejecución | tipo de paso |
|---|---|---|---|
| RT-01 | §1 Lectura en frío | 1 | Silvia/manual en ChatGPT Project |
| RT-02 | §2 Persistencia de actualización | 3 | Silvia/manual en ChatGPT Project |
| RT-03 | §3 Actualización física | 2 | Silvia/manual en ChatGPT Project |
| RT-04 | §4 Conflictos de versión | 4 | mixto (repo prepara · Silvia ejecuta) |
| RT-05 | §5 Procedencia | 5 | Silvia/manual en ChatGPT Project |
| RT-06 | §6 Recuperación | 6 | mixto (repo corrompe · Silvia ejecuta) |
| RT-07 | §7 Concurrencia | 8 | Silvia/manual en ChatGPT Project |
| RT-08 | §8 Tamaño | 9 | mixto (repo genera/contrasta · Silvia ejecuta) |
| RT-09 | §9 Voice → estado | 10 | Silvia/manual en ChatGPT Project |
| RT-10 | §10 Work disponible/no disponible | 12 | mixto (repo documenta · Silvia configura) |
| RT-11 | §11 Skills ausentes | 7 | mixto (repo prepara copia/guion · Silvia deshabilita y verifica) |
| RT-12 | §12 Memoria del Project vs estado explícito | 11 | Silvia/manual en ChatGPT Project |

---

## 6. Qué prueba PASS y qué permanece inferencia

**Prueba directamente PASS (comportamiento de runtime observado y evidencia capturada):** cada veredicto PASS debe basarse únicamente en comportamiento observado de forma directa en el ChatGPT Project y registrado como evidencia (respuesta íntegra del chat, estado de las fuentes, hashes, configuración del Project, transcripción de Voice). Sin esa captura, el resultado es `PENDIENTE` o `BLOCKED`, nunca PASS.

**Permanece inferencia o interpretación (no lo prueba esta batería):**

- La **calidad metodológica** del comportamiento de CoraLEAN (lo correcto en términos de método) no se prueba con las 12 pruebas de runtime; eso corresponde a los 14 escenarios de ADR-019, tribunal aparte.
- La **transferencia de capacidad** (north star; S14) es longitudinal y solo se evalúa con uso real; no se infiere de RT.
- La **escalabilidad futura** al piloto Mérida, a un backend, MCP o cockpit no se prueba aquí; ADR-017 lo deja explícitamente fuera.
- La **generalización** de un PASS más allá del fixture sintético es interpretación, no observación.
- La **fiabilidad a largo plazo** de una capacidad no puede afirmarse desde una única corrida; exige repetición y registro.

Un PASS de runtime **no** demuestra que el Core sea correcto; un FAIL de runtime **no** demuestra que el Core sea incorrecto. Esa distinción gobierna la sección 9.

---

## 7. Separación manual (Silvia) vs preparable (repo/VPS-OpenCode)

Regla dura: **VPS/OpenCode no observa el ChatGPT Project.** Todo lo que ocurre dentro del Project lo ejecuta y lo captura una persona; el repo solo prepara entradas, instrumentos de comparación y el almacenamiento de evidencia.

Tabla resumen por prueba:

| Prueba | Paso dominante | Silvia/manual en ChatGPT Project | repo/VPS-OpenCode |
|---|---|---|---|
| RT-01 | manual | crear chat, enviar prompt, copiar respuesta | preparar fixture y clave esperada; comparar |
| RT-02 | manual | aplicar cambio, confirmar, abrir chat 2, capturar | preparar cambio; comparar versiones |
| RT-03 | manual | ejecutar actualización y observar flujo de UI | hashes y copias de comparación |
| RT-04 | mixto | cargar versiones, abrir chat, capturar | preparar `vA`/`vB` divergentes |
| RT-05 | manual | proponer/confirmar, verificar trazas, capturar | preparar traza esperada; comparar |
| RT-06 | mixto | pedir reconstrucción y capturar | corromper snapshot; diff |
| RT-07 | manual | ejecutar dos sesiones concurrentes, capturar | registrar línea temporal |
| RT-08 | mixto | cargar cada variante y ejecutar/capturar la reconstrucción | generar variantes escaladas; preparar checklist; calcular omisiones |
| RT-09 | manual | interacción por Voice, capturar | comparar con estado esperado |
| RT-10 | mixto | alternar configuración Work, capturar | documentar y comparar |
| RT-11 | mixto | deshabilitar/verificar la ausencia de Skills, ejecutar la interacción, capturar | preparar copia limpia y guion de interacción; comparar |
| RT-12 | manual | sembrar memoria, abrir chat de prueba, capturar | preparar estado contradictorio |

---

## 8. Esquema de evidencia

Ninguna corrida es auditable sin convención de nombres y ubicación. **Este plan define el esquema pero NO crea ahora ningún fichero ni directorio de evidencia.**

**Convención de identificadores:**

- `RUN-ID`: `RUN-YYYYMMDD-NN`, donde `NN` es el ordinal de corrida del día (p. ej. `RUN-20261005-01`).
- `RT-ID`: `RT-01` … `RT-12`.
- Veredicto: `PASS` | `FAIL` | `PARTIAL` | `BLOCKED` | `PENDIENTE`.
- Fecha: `YYYY-MM-DD`; observador: persona que capturó (p. ej. `Silvia`).

**Patrón de rutas (definido, no creado):**

```text
docs/runtime/evidence/<RUN-ID>/
  index.md                                  # índice y resumen de la corrida
  <RUN-ID>__<RT-ID>__veredicto.md           # ficha de resultado de la prueba
  <RUN-ID>__<RT-ID>__captura.png            # captura de pantalla
  <RUN-ID>__<RT-ID>__transcripcion.md       # respuesta/transcripción íntegra
  <RUN-ID>__<RT-ID>__estado-antes.md        # snapshot antes (cuando aplique)
  <RUN-ID>__<RT-ID>__estado-despues.md      # snapshot después (cuando aplique)
```

**Registro de resultados:**

- La ficha `<RUN-ID>__<RT-ID>__veredicto.md` contiene, como mínimo: `RUN-ID`, `RT-ID`, veredicto, fecha, observador, precondiciones reales, evidencia enlazada y notas.
- `index.md` de cada corrida resume los 12 `RT-ID` con su veredicto y enlaces a las fichas (índice de la corrida).
- El **resultado observado** se actualiza en dos lugares complementarios: (a) los campos `Resultado observado` de este plan (que pasa de `PENDIENTE` a la referencia de la corrida); (b) la ficha de veredicto y el `index.md` de la corrida, que conservan la evidencia. Este plan es el índice de pruebas; la corrida es el índice de evidencia.
- No se escribe un veredicto en este plan sin su ficha de evidencia correspondiente.

---

## 9. Distinción de tres vías: fallo de runtime, necesidad de fallback, contradicción de Core

Antes de concluir nada, clasificar cada hallazgo en una de estas tres categorías. **Un problema de runtime no se reescribe como fallo conceptual del Core sin evidencia directa.**

| Categoría | Criterio observable | Disposición | ¿Cambia el Core? |
|---|---|---|---|
| (a) Fallo/limitación de runtime | Una capacidad del ChatGPT Project (persistencia, versiones, Voice, Work, Skills, memoria, tamaño) no se comporta como se esperaba, sin contradecir ningún ADR | Documentar la limitación; aplicar o preparar mitigación de proceso | No |
| (b) Necesidad de fallback | El mecanismo de actualización in-place no es fiable; se necesita un protocolo alternativo | Adoptar un protocolo soportado alternativo dentro de ADR-017 decisión 2 (proponer actualización / reemplazar snapshot / guardar como nueva fuente / Work según disponibilidad) | No |
| (c) Contradicción de Core | El comportamiento observado demuestra que un ADR aceptado (p. ej. ADR-002, ADR-015) no puede sostenerse tal como está redactado | **STOP**: no editar el ADR; devolver la contradicción exacta a decisión humana/Cora con la evidencia | Solo por reapertura explícita |

**Regla de STOP:** si el hallazgo exige cambiar un ADR del Core en lugar de un fallback de runtime, **detener la ejecución**, no tocar el ADR y devolver a la autoridad humana/Cora la contradicción exacta (qué hipótesis, qué observación, qué evidencia, por qué no cabe como fallback). Las limitaciones de runtime **no deben reescribirse como fallos conceptuales del Core** sin evidencia directa.

---

## 10. Primera prueba a ejecutar y arranque de la primera corrida

**Primera prueba a ejecutar tras esta unidad: `RT-01` — Lectura en frío (ADR-017 §1).**

Razón: es el punto de entrada de toda la batería, el de menor coste y la precondición de `RT-03` y `RT-02` (y, por transitividad, de las demás). Si `RT-01` no pasa, no tiene sentido interpretar las pruebas de persistencia, conflicto o concurrencia: primero hay que saber si el estado explícito es reconstruible en frío.

**Checklist «cómo arrancar la primera corrida»:**

1. Confirmar que este plan está commiteado y que no se ha modificado ni reabierto ningún ADR del Core.
2. Repo-side: materializar y versionar `estado-proyecto.md` y `historia-material.md` del fixture sintético (sección 2) y `fixture-esperado.md` (clave no cargada al Project).
3. Silvia: crear/verificar el ChatGPT Project con las instrucciones delgadas y cargar manualmente el fixture como fuentes.
4. Verificar que no hay Skills activas para esta corrida base y que no hay conversación previa en el chat de prueba.
5. Abrir un chat nuevo, enviar el prompt fijado de `RT-01` y copiar la respuesta íntegra.
6. Crear `docs/runtime/evidence/RUN-YYYYMMDD-01/` con `index.md` y la ficha `…__RT-01__veredicto.md`, y guardar la captura/transcripción.
7. Aplicar la regla de veredicto de `RT-01` y registrar `Resultado observado` en este plan enlazando la corrida.
8. Cerrar la corrida indicando `RT-03` como siguiente prueba.

---

## 11. No-goals (lo que esta unidad y la batería NO hacen)

- No ejecutar la batería de 12 pruebas en esta unidad; solo prepararla.
- No instanciar el piloto Mérida.
- No elegir backend, MCP ni cockpit.
- No implementar maquinaria de persistencia de estado.
- No cambiar los 14 escenarios de ADR-019 ni el catálogo de criterios del Core.
- No implementar backend/MCP/cockpit.
- No registrar resultados observados, veredictos ni ficheros de evidencia como si ya existieran: todo queda `PENDIENTE` hasta una corrida real.

---

## Anexo A — Inferencias y decisiones de redacción (trazabilidad)

Para cumplir la disciplina de procedencia (ADR-004), se distinguen las afirmaciones con respaldo verificado de las inferencias de redacción:

- **Citado y verificado:** las 12 hipótesis y su texto provienen de ADR-017 («Hipótesis empíricas», puntos 1–12); los nueve bloques, snapshot + historia material y las tres trazas de procedencia, de ADR-015; la reversal condition y el encuadre Project-first, de ADR-002; la independencia de escenarios y la separación de baterías, de ADR-019; los términos y la escala de suficiencia, del GLOSSARY.md; la exigencia de no reabrir el freeze, de `CODING_STANDARDS.md`/`docs/CORE_FREEZE_V0.1.md`.
- **Inferencia de planificación (no autoridad nueva):**
  - El **orden de ejecución** por dependencias es una propuesta de este plan, no una decisión aceptada; se apoya en la lógica «cold-read antes que actualización-persistencia antes que concurrencia» del handoff.
  - El **detalle del fixture ficticio** (nombres, proceso, entidades) es invención de redacción para satisfacer la cobertura exigida; la cobertura mínima sí viene del handoff.
  - La **convención de evidencia** (`RUN-YYYYMMDD-NN`, rutas, campos) es propuesta operativa de este plan; no existe en un ADR aceptado.
  - Las **reglas PASS/PARTIAL/FAIL/BLOCKED** son propuestas falsables de redacción; su calibración fina se validará en la primera corrida.
  - La ubicación de `RT-12` tarde (por acumulación de memoria) y de `RT-10` al final (por ser bifurcación de configuración) son decisiones de secuencia de este plan.
