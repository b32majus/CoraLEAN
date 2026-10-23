# CoraLEAN — Plan de ejecución tras auditorías (23 oct–30 nov 2026)

**Estado:** plan de trabajo aprobado para documentación y validación; hitos futuros condicionados a resultados.
**Autoridad:** Core Freeze v0.1 sigue en `core-freeze-v0.1@c485ec6` (ADR-001…019). Este plan es post-freeze; no modifica el Core ni constituye una aprobación de backend, MCP o despliegue.
**Referencias:** [dictamen](../strategy/DICTAMEN_DIRECCION_2026-10-23.md), [auditorías](../audits/2026-10-23/README.md), [plan Alpha](../runtime/ALPHA_RUNTIME_VERIFICATION_V0.md), [piloto](../PILOT_MERIDA.md).

## 1. Meta y criterios de éxito

El resultado buscado es **transferencia de capacidad**: el Responsable local decide y ejecuta progresivamente más pasos de un proyecto real de mejora, explica el porqué y conserva rigor con menos intervención experta. Éxito no equivale a producir documentos, conformidad subjetiva o número de turnos de IA.

Hipótesis separadas:
- **H1 — estructura:** un estado tipado y recuperable reduce pérdida de contexto y errores de continuidad.
- **H2 — pedagogía:** la facilitación de CoraLEAN mejora razonamiento y autonomía frente a metodología sin IA **y** frente a A3 + asistente genérico. Evaluar también *sin la herramienta*.

**Arquitectura objetivo de producto, no implementación aprobada:** Core y estado independientes del proveedor; reglas estructurales verificables; juicios metodológicos y autorización humanos; LLM propone, no es autoridad; web independiente como canal potencial y canales Microsoft / ChatGPT opcionales. **ChatGPT Project continúa como laboratorio para Alpha**, no requisito del profesional. Backend, tecnología de almacenamiento, API y MCP siguen sin seleccionar.

## 2. Ejecución antes de Mérida

| Límite | Acción | Evidencia y condición de cierre | Responsable |
|---|---|---|---|
| 24-oct | **RT-01**: una lectura en frío canónica del fixture sintético congelado y **E1**: cuatro réplicas adicionales en Projects limpios e independientes, con memoria solo del Project | 5 respuestas completas + captura de instrucciones/fuentes/memoria; la ejecución canónica se evalúa según la regla original PASS/PARTIAL/FAIL/BLOCKED (estado, foco, siguiente paso y razón, cuestión abierta; cero entidades inventadas). E1 informa concordancia en variables críticas; no reescribir oracle ni prompts tras observar | Silvia en UI; evaluación con oracle reservado del repo |
| 24-oct | **RT-03**: actualización física y carga manual; **solo después RT-02** si se obtiene versión verificable | Dos intentos, mecanismo observado (in-place / nueva fuente / propuesta / solo texto); capturas, identificador/hash antes/después, minutos de intervención manual; hipótesis provisional de viabilidad ≤5 min para persona novata. RT-02 compara nuevo chat con nueva versión | Silvia en UI; soporte del repo |
| 24-oct | Asegurar entorno y fuentes permitidas | Comprobar cuenta/plan, configuración de memoria y datos, uso institucional autorizado, separación de materiales y ausencia de identificadores de paciente; si no hay aprobación, usar solamente material sintético sin servicio externo | Responsable de la sesión + responsable institucional |
| 25-oct | Instrumentos coherentes con freeze | `FEEDBACK_PROTOCOL.md` utiliza *momento de navegación* y no *fase*; preparar rúbrica basal, registro de intervenciones humanas/IA y revisión por persona distinta de Silvia cuando sea posible | Equipo CoraLEAN |
| 26-oct | Mérida: sesión metodológica asistida, **si se mantiene la fecha** | La farmacéutica propone primero problema, hechos/supuestos y próximo paso; Silvia facilita y registra intervenciones separadas; no exponer un runtime no validado a la persona ni introducir información identificable | Silvia + responsable local |

**Nota operativa:** una réplica E1 no comparte memoria con otra; cinco chats en un mismo Project no son cinco cold-starts independientes. Se conserva RT-01 original como prueba única; E1 es evaluación añadida, no un cambio de oracle.

## 3. Experimentos de producto y decisión arquitectónica

| Fecha de decisión | Experimento | Condición de salida |
|---|---|---|
| 30-oct | **E3 Procesar reunión:** tres conjuntos de notas sintéticas con desacuerdos, atribuciones dudosas, decisiones condicionales y afirmaciones presentadas como hechos; referencia humana escrita antes | Cero hechos o decisiones materiales inventadas como requisito crítico. Registrar errores, omisiones, controversias marcadas, esfuerzo de revisión y trazabilidad; si falla, no habilitar mutación del estado desde estas propuestas |
| 06-nov | **E4 valor diferencial:** 3 brazos: (A) metodología estructurada sin IA, (B) CoraLEAN conversacional, (C) A3 + IA genérica; casos equivalentes pero distintos, orden contrabalanceado, rúbrica aplicada a ciegas cuando sea posible | Comparar rigor, errores importantes, tiempo, intervenciones de mentor y autonomía en tarea posterior **sin herramienta**. Muestra pequeña = evidencia exploratoria, no eficacia generalizable |
| 06-nov | **Decisión de runtime:** contrastar E1/E2/E3/E4 con ADR-002/017 | Mantener Project como runtime de uso solo si persistencia/versión y carga de usuario son tolerables y hay mejora frente al control. Si no, priorizar registro estructurado mínimo y web; registrar revisión formal de ADR antes de imponer nueva arquitectura |
| 09–30 nov | **MVP condicionado**, únicamente tras decisión favorable | Vista *Ahora*, registro tipado, decisiones/evidencia/acciones, versionado, revisión y confirmación humana, preparar/procesar reunión. IA opcional tras contrato de datos; exportación portable. Validación en entorno sintético, sin despliegue institucional presumido |

## 4. Diseño de prueba: errores que cuentan

- Separar hecho, supuesto, hipótesis, evidencia, decisión, acción, autorización y procedencia; nunca normalizar ambigüedad en hecho confirmado.
- En intervenciones pedagógicas, aplicar *primero tú* como experimento **visible, consentido y reversible**, sin puntuaciones laborales ni cambios silenciosos de modo; medir el desempeño al retirar ayuda.
- Dividir en la evaluación los criterios **estructuralmente comprobables** y los **juicios de suficiencia** atribuidos a personas; no afirmar que un juicio LLM es determinismo.
- Probar predicción previa, escala y medición temporal en ciclos PDSA, implicación de quienes realizan el trabajo, riesgos de adopción prematura; las nuevas reglas son candidatas, no Core aceptado.
- Con un estado externo, reemplazar pruebas manuales de colisión/recuperación/escala por controles automatizados equivalentes; **no eliminar los requisitos** de versión, integridad y recuperación.

## 5. Dependencias, STOP y trazabilidad

1. **No ejecutar RT-01 sin Project limpio, dos fuentes, Project-only memory y oracle fuera.** Si el entorno no permite cumplir condiciones, registrar BLOCKED (sin fingir PASS).
2. **No modificar el fixture/oracle después de ver respuestas.** Los cambios al protocolo deben versionarse y diferenciar nueva cohorte.
3. **No afirmar fiabilidad de persistencia** por haber obtenido texto correcto; exigir prueba física de versión y recuperación entre chats.
4. **No utilizar datos identificables**, ni inferir que una suscripción consumer o Copilot básico satisfaga permisos institucionales.
5. **No presentar investigaciones de auditores como pruebas de producto.** Diferenciar demostración documental, riesgo, preferencia y verificación experimental.
6. **No abrir trabajo de backend/MCP/multi-tenant antes de la decisión del 06-nov**, salvo restricción institucional/seguridad que exija STOP y reevaluación.
7. **Publicación y merge:** este plan no autoriza ejecución automática de pruebas en la UI, release, ni merge en `main`. Un PR presenta el paquete para revisión humana.

## 6. Qué queda pendiente y cómo se registra

| Asunto | Estado |
|---|---|
| 12 casos Alpha y S1–S14 | Diseño preparado, resultados PENDIENTE |
| Fixture RT-01 | Commit local `81f9216` preparado para publicación en rama; no confundir con prueba ejecutada |
| Pedagogía «primero tú» y retirada reversible | Candidato a validar; posible ADR posterior |
| Criterios estructurales vs juicio humano | Candidato a validar; no sustituir sin evidencia ADR-008/018 |
| Identidad institucional, permisos, RGPD/ENS, Microsoft | Requisitos de investigación y autorización; no se declara cumplimiento |
| Servicio de estado, API, MCP, Cockpit | Hipótesis de implementación; tecnología y momento abiertos |
| Comprador, oferta de mentoría y precio | Hipótesis comerciales; validar con responsables de organizaciones |
