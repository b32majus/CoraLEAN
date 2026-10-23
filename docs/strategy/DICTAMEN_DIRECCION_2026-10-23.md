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
- Fixture RT-01 **sí materializado** en worktree local, commit 81f9216, pendiente de push; RT-01 no ejecutado.
- R10 = decidir servicio de estado **después** de R2/R5/R6, no construirlo inmediatamente.
- Con cambio de almacenamiento, sustituir pruebas manuales de conflictos/recuperación/concurrencia/escala por pruebas automatizadas; conservar sus objetivos.
- Retirada de ayuda sin puntuaciones de competencia: conductas observables y decisión reversible del aprendiz.
- Dos auditores LLM con formación/sesgos semejantes no equivalen a evidencia de usuarios ni a consenso independiente.

## 3. Acciones anteriores a Mérida — responsables y criterios
| Fecha límite | Acción | Dueño | Criterio de cierre |
|---|---|---|---|
| 24-oct-2026 | RT-01 canónico (una ejecución) + replicabilidad E1 (cuatro ejecuciones adicionales) | Silvia / ChatGPT Project | 5 proyectos temporales **independientes** con memoria solo del Project, idénticas instrucciones y dos fuentes; capturas y respuestas íntegras, oracle oculto; 4 criterios RT-01 sin entidades inventadas y 5/5 concordancia en los elementos críticos. Registrar todos los fallos, no ajustar instrucciones entre réplicas. |
| 24-oct-2026 | RT-03: mecanismo físico y fricción | Silvia / ChatGPT Project | 2 intentos independientes, registrar si sobrescribe, crea fuente o solo propone; medir minutos hasta estado actualizado verificable; umbral provisional de uso por novato: ≤5 minutos. No probar RT-02 si no se obtiene versión verificable. |
| 24-oct-2026 | Cuentas, superficie aprobada, datos permitidos | Silvia + responsable institucional | Confirmar plan, memoria/entrenamiento, permisos, si el uso de herramientas externas está aprobado, límites de datos; no incluir identificadores de pacientes ni transcripciones sin depurar. Si no se autoriza, ejecutar solo sin IA externa y con material sintético. |
| 25-oct-2026 | Reconciliar formulario de feedback con Core | Desarrollo/documentación | Sustituir campo 'phase' por 'momento_navegacion' (derivado, no fase) y categoría 'wrong phase recommendation' por 'momento de navegación incorrecto'; conservar resto. Antes de usarlo, verificar que no aparece el concepto antiguo. |
| Antes de la sesión del 26-oct-2026 | Medición basal, guía «primero tú» y rúbrica | Silvia + evaluador distinto si disponible | Responsable local responde **antes** de ver sugerencias: problema y alcance, hecho/supuesto/hipótesis, siguiente paso y porqué. Registrar intervenciones de Silvia/IA por separado y recoger evaluación metodológica ciega cuando sea factible. |
| 26-oct-2026 | Sesión de Mérida sin exponer a runtime no validado | Silvia | Facilitación humana; la responsable propone primero; estado/decisiones se documentan de forma controlada y sin identificadores de pacientes. No presentarlo como piloto de autonomía ya demostrado. |

**Precisión de RT-01:** cinco chats dentro de un mismo Project no son cinco lecturas en frío independientes si existe memoria del Project; usar cinco Projects limpios aislados o un protocolo de reseteo cuyo aislamiento pueda demostrarse. La batería original define un solo RT-01; las cuatro réplicas son el experimento adicional E1, no una modificación retroactiva de su veredicto.

## 4. Experimentos posteriores — decidir, no prometer
| Fecha de decisión | Experimento | Criterio de decisión |
|---|---|---|
| 30-oct-2026 | E3 — Tres notas sintéticas complejas con desacuerdos, decisiones condicionales y procedencia ambigua; clave humana previa. | Cero hechos o decisiones materiales inventados; registrar omisiones, errores y carga de revisión. Si falla, Procesar reunión no puede modificar el estado. |
| 06-nov-2026 | E4 — Tres condiciones: (A) metodología sin IA, (B) CoraLEAN conversacional, (C) A3 + asistente genérico. Casos equivalentes distintos, orden alternado, evaluación ciega; ejercicio posterior sin herramienta. | Comparar calidad, tiempo, errores graves, intervenciones del mentor y retención de autonomía después de retirar la herramienta. Con n pequeño solo evidencia exploratoria, no eficacia demostrada. |
| 06-nov-2026 | Decisión runtime y primer MVP tras E1/E2/E3/E4 | Escoger Project-first solo si estado/versiones son repetibles, no requiere gestión de archivos significativa y supera la referencia. Si no, prototipar registro ligero determinista + web mínima. No desplegar MCP hasta que exista un caso de canal que lo exija. |

## 5. Semáforo de trabajo
- **Permitido preparar ahora:** fixtures, rúbrica, resultados y corrección documental acotada; preservar evidencia original.
- **No autorizado por este documento:** push/PR/merge/deploy, reabrir ADR, cambiar producto, activar datos personales o presentar un piloto de IA como institucionalmente aprobado.
- **Único objetivo de dirección próximo:** decidir con evidencia si la interacción conversacional enseña a razonar y qué mínimo almacenamiento necesita para mantener continuidad.
