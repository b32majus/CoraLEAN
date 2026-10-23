<!-- Ratificación documental 2026-10-23: la consolidación y publicación de este dictamen y el roadmap fueron autorizadas. La arquitectura objetivo se registra como dirección de trabajo, NO como ADR-020 aceptada, aprobación de construcción/despliegue ni resultado empírico. Los criterios y fechas se contrastan contra docs/execution/ROADMAP_VALIDACION_2026-10-23.md. -->

# CoraLEAN — Dictamen de dirección tras dos auditorías
**Fecha:** 23/10/2026 · **Estado:** propuesta ejecutiva; no reabre ADR por sí sola.
**Alcance:** no implica GO para código, publicaciones, cambios al Core ni acceso a datos sanitarios.

## 1. Decisiones de dirección (propuestas)
1. **Conservar:** visión de transferencia de capacidad; siete áreas no lineales; suficiencia relativa a la decisión; separar experimento de adopción; autorizaciones humanas; snapshot + historia material; procedencia; intención Preparar/Procesar reunión.
2. **Reorientar:** ChatGPT Project queda como laboratorio/canal posible, NO como dependencia obligatoria de producto. Arquitectura objetivo portable, con estado canónico independiente del LLM e interfaces opcionales (web, Microsoft y ChatGPT). Esto es una **dirección**, no autorización de implementar API/MCP.
3. **Investigar antes de reabrir:** criterios estructurales frente a juicios humanos; mecanismo pedagógico «primero tú», retirada de ayuda **por competencia, explícita, elegida y reversible**; forma de compartir estado y protección de datos. No inferir una puntuación laboral.
4. **No construir ahora:** plataforma multi-tenant, MCP, cockpit completo, Skills adicionales, versiones manuales extensas de pruebas específicas de Markdown si se abandona esa opción.
5. **No descartar la IA conversacional:** someter a prueba el valor pedagógico frente a dos referencias: sin IA y A3 + IA genérica. Evitar confundir buena ejecución asistida con aprendizaje.

## 2. Correcciones aceptadas del Auditor 2
- Fixture RT-01 **sí materializado** en worktree local, commit original `81f9216`, **publicado** en `origin/work/alpha-runtime-c084-20261004`; RT-01 **no ejecutado**. El protocolo vigente es `RT01-alpha-v0.1-pm1` (manifest en `docs/runtime/fixtures/alpha-v0/VERSION.md`), con instrucciones Project-only posteriores al commit original.
- R10 = decidir servicio de estado **después** de R2/R5/R6, no construirlo inmediatamente.
- Con cambio de almacenamiento, sustituir pruebas manuales de conflictos/recuperación/concurrencia/escala por pruebas automatizadas; conservar sus objetivos.
- Retirada de ayuda sin puntuaciones de competencia: conductas observables y decisión reversible del aprendiz.
- Dos auditores LLM con formación/sesgos semejantes no equivalen a evidencia de usuarios ni a consenso independiente.

## 3. Acciones anteriores a Mérida — responsables y criterios
| Fecha límite | Acción | Dueño | Criterio de cierre |
|---|---|---|---|
| 24-oct-2026 | **RT-01 canónico primero:** una ejecución | Silvia / ChatGPT Project | Un Project limpio con Project-only memory, dos fuentes y protocolo fijado `RT01-alpha-v0.1-pm1`; respuesta íntegra y capturas; 4 criterios RT-01, sin invenciones. No consultar oracle durante la prueba. |
| 24–25-oct-2026 | **RT-03 segundo, tras RT-01:** mecanismo físico y fricción | Silvia / ChatGPT Project | Si RT-01 PASS, registrar si sobrescribe, crea fuente o solo propone; medir minutos hasta estado actualizado verificable; umbral provisional para una persona novata ≤5 min. No probar RT-02 sin versión verificable. |
| 25–30-oct-2026 | **E1 tercero:** cuatro réplicas de lectura en frío, sin bloquear Mérida | Silvia / ChatGPT Project | Cuatro Projects adicionales independientes, mismas dos fuentes, instrucciones y protocolo congelado, memoria Project-only; valorar concordancia 5/5 junto con RT-01. Registrar todos los resultados aunque no haya unanimidad. |
| Antes de uso institucional, idealmente 26-oct | Cuentas, superficie aprobada, datos permitidos | Silvia + interlocución institucional cuando esté disponible | Verificar autorización, cuentas/plan, entrenamiento, permisos y datos. **No presuponer respuesta institucional en fin de semana**: sin autorización previa, en Mérida solo material sintético y sin IA externa; RT-01 de laboratorio puede usar ChatGPT únicamente con fixture totalmente sintético. Sin identificadores de pacientes ni notas no depuradas. |
| 25-oct-2026 | Reconciliar formulario de feedback con Core | Desarrollo/documentación | Sustituir campo 'phase' por 'momento_navegacion' (derivado, no fase) y categoría 'wrong phase recommendation' por 'momento de navegación incorrecto'; conservar resto. Antes de usarlo, verificar que no aparece el concepto antiguo. |
| Antes de la sesión del 26-oct-2026 | Medición basal, guía «primero tú» y rúbrica | Silvia + evaluador distinto si disponible | Responsable local responde **antes** de ver sugerencias: problema y alcance, hecho/supuesto/hipótesis, siguiente paso y porqué. Registrar intervenciones de Silvia/IA por separado y recoger evaluación metodológica ciega cuando sea factible. |
| 26-oct-2026 | Sesión de Mérida sin exponer a runtime no validado | Silvia | Facilitación humana; la responsable propone primero; estado/decisiones se documentan de forma controlada y sin identificadores de pacientes. No presentarlo como piloto de autonomía ya demostrado. |

**Precisión de RT-01:** orden de prioridad **RT-01 → RT-03 → E1**, con E1 posponible. Cinco chats de un mismo Project no son cinco lecturas independientes si comparten memoria. El resultado canónico de RT-01 y las cuatro réplicas E1 se registran por separado. **Protocolo vigente:** `RT01-alpha-v0.1-pm1` (manifest/hash; versión de instrucciones publicada inicialmente en rama documental `3530db5`, ahora tras reconstrucción del PR). No ajustar prompts/fixture entre las réplicas.

## 4. Experimentos posteriores — decidir, no prometer
| Fecha de decisión | Experimento | Criterio de decisión |
|---|---|---|
| 30-oct-2026 | E3 — Tres notas sintéticas complejas con desacuerdos, decisiones condicionales y procedencia ambigua; clave humana previa. | Cero hechos o decisiones materiales inventados; registrar omisiones, errores y carga de revisión. Si falla, Procesar reunión no puede modificar el estado. |
| 06-nov-2026 | E4 — Tres condiciones: (A) metodología sin IA, (B) CoraLEAN conversacional, (C) A3 + asistente genérico. Casos equivalentes distintos, orden alternado, evaluación ciega; ejercicio posterior sin herramienta. | Comparar calidad, tiempo, errores graves, intervenciones del mentor y retención de autonomía después de retirar la herramienta. Con n pequeño solo evidencia exploratoria, no eficacia demostrada. |
| 06-nov-2026 | Decisión runtime y primer MVP tras E1/E2/E3/E4 | Escoger Project-first solo si estado/versiones son repetibles, no requiere gestión de archivos significativa y supera la referencia. Si no, prototipar registro ligero determinista + web mínima. No desplegar MCP hasta que exista un caso de canal que lo exija. |

## 5. Semáforo de trabajo
- **Permitido preparar ahora:** fixtures, rúbrica, resultados y corrección documental acotada; preservar evidencia original.
- **No autorizado por este documento:** **merge/deploy** (el push y la apertura del PR documental ya se realizaron con autorización anterior), reabrir ADR, cambiar producto, activar datos personales o presentar un piloto de IA como institucionalmente aprobado.
- **Único objetivo de dirección próximo:** decidir con evidencia si la interacción conversacional enseña a razonar y qué mínimo almacenamiento necesita para mantener continuidad.
