# ADR-017 — Runtime Contract v0: ChatGPT Project como hipótesis operativa

**Fecha:** 2026-10-01
**Estado:** Aceptada (como hipótesis de V0 con criterios de aceptación empíricos)

## Decidido (decisiones de arquitectura)

1. **Memoria del Project = contexto auxiliar, nunca fuente de verdad.** Los chats de un Project pueden usar otras conversaciones del mismo proyecto como contexto (OpenAI Help Center, «Projects in ChatGPT», consultado 2026-10-01). CoraLEAN puede aprovecharlo como comodidad, pero el **Project State explícito prevalece siempre** sobre recuerdos o inferencias procedentes de otros chats. La memoria puede ayudar a recordar; el estado explícito permite saber qué es verdad para el proyecto.
2. **Representación canónica portable del estado en Runtime v0.1 (diseño candidato, condicionado a validación):**
   - `estado-proyecto.md` — snapshot canónico actual (los nueve bloques de ADR-015);
   - `historia-material.md` — log de solo-adición con los eventos materiales.
   Legible por humano y modelo, portable y auditable. JSON no es la interfaz primaria en V0. **El mecanismo físico de actualización no queda congelado**: la documentación pública de Projects no garantiza que un chat normal sobrescriba in-place una fuente existente. Si la actualización in-place no resulta fiable, el Core no cambia: se probará un protocolo de propuesta de actualización / reemplazo de snapshot / guardar como nueva fuente / Work, según disponibilidad.
3. **Gobernanza de mutación (regla de flujo soportado, no garantía técnica):** los cambios semánticos del Project State se realizan mediante CoraLEAN, para preservar procedencia e invariantes. La edición manual directa queda **fuera del flujo soportado de CoraLEAN v0.1**; si ocurre, el estado debe **reconciliarse antes de continuar** y su procedencia puede quedar limitada.
4. **Protocolo de interacción material.** Al comienzo de una interacción material: (a) consultar el estado canónico; (b) comprobar proyecto, estado, focos y cuestiones abiertas relevantes; (c) derivar suficiencia, momento y siguiente paso. Al cierre: (a) detectar cambios durables; (b) separar hechos/hipótesis/evidencia/decisiones/acciones; (c) proponer o aplicar la actualización según la capacidad real del runtime; (d) registrar los eventos materiales necesarios; (e) verificar la coherencia del snapshot resultante. **No se actualiza estado por intercambios sin significado material** — solo por interacción material, no por mensaje.
5. **Instrucciones del Project delgadas.** Core esencial, invariantes y routing mínimo en instrucciones; método, playbook, conocimiento y estado en fuentes. La distribución exacta se validará contra límites de tamaño y recuperación de contexto.
6. **Concurrencia/stale-state: riesgo explícito de V0.** Dos chats pueden partir del mismo snapshot y producir cambios incompatibles. Dos Markdown resuelven el almacenamiento, no la concurrencia. No se resuelve todavía; se reconoce, se documenta y se prueba.

## Hipótesis empíricas — criterios de aceptación del runtime (sprint Alpha)

1. **Lectura en frío**: chat nuevo, sin explicaciones adicionales → ¿reconstruye correctamente estado, foco y siguiente paso?
2. **Persistencia de actualización**: tras modificar el estado, ¿un segundo chat ve exactamente la nueva versión?
3. **Actualización física**: ¿un chat normal puede modificar la fuente canónica existente, o solo generar/guardar una nueva?
4. **Conflictos de versión**: ¿qué ocurre si existen dos snapshots o versiones duplicadas?
5. **Procedencia**: ¿puede saberse de forma fiable qué actualización propuso CoraLEAN y cuál confirmó una persona?
6. **Recuperación**: snapshot corrupto deliberadamente → ¿se reconstruye desde la historia material?
7. **Concurrencia**: dos chats concurrentes desde la misma versión → ¿se detecta write-after-stale-read?
8. **Tamaño**: ¿en qué punto la recuperación empieza a omitir información relevante?
9. **Voice → estado**: ¿una decisión tomada por voz llega correctamente a propuesta de persistencia?
10. **Work disponible/no disponible** según configuración del Project, y qué cambia en el mecanismo de persistencia.
11. **Skills ausentes**: ¿el protocolo funciona solo con Core + archivos?
12. **Memoria del Project vs estado explícito**: ¿CoraLEAN obedece correctamente al estado canónico cuando la memoria implícita discrepa?

## Qué queda fuera (sin cambio respecto a ADR-002)

Backend, MCP, cockpit garantizado, control de concurrencia formal, autenticación multiusuario. La **reversal condition** de ADR-002 sigue vigente: si estas pruebas demuestran que Project + estado + cockpit no pueden mantener continuidad fiable, se promueve el backend a la fase siguiente.

## Contexto

Una primera propuesta afirmaba que «la memoria transversal entre chats no existe» y congelaba la actualización in-place de archivos. El contraste con la documentación oficial de OpenAI (Projects; Work y su incompatibilidad documentada con memoria exclusiva de proyecto) mostró que ambas afirmaciones eran prematuras: la memoria existe como capacidad de producto, y la mutación de archivos no está garantizada. El ADR separa capacidad documentada, decisión de arquitectura y supuesto a validar.

## Consecuencias

### Positivas

- El freeze del Core no depende de ninguna capacidad no garantizada del runtime.
- Las 12 pruebas Alpha son criterios de aceptación medibles que pueden matar o validar Project-first antes de Mérida.
- La memoria del Project puede usarse como comodidad sin debilitar la disciplina de estado.

### Negativas

- El mecanismo de persistencia queda abierto hasta las pruebas; el Starter Kit debe diseñarse para cambiar de mecanismo sin cambiar de semántica.
- La concurrencia es una limitación real para el uso simultáneo de Silvia y la farmacéutica; la mitigación inicial será de proceso (evitar escrituras simultáneas), no técnica.
