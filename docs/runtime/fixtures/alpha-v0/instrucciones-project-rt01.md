# Instrucciones del Project — RT-01

> Guía de configuración manual para Silvia. **No es una fuente de estado** y **no se carga al Project**. Solo `estado-proyecto.md` y `historia-material.md` se cargan como fuentes del Project. Este documento y `fixture-esperado.md` permanecen repo-side.

## A. Guía de configuración manual

- Nombre sugerido del Project: «CoraLEAN Alfa RT-01».

### Inventario de archivos

| Archivo | Rol | ¿Se carga al Project? |
|---|---|---|
| `estado-proyecto.md` | snapshot canónico del estado | Sí (fuente) |
| `historia-material.md` | registro de eventos materiales (solo adición) | Sí (fuente) |
| `fixture-esperado.md` | clave de respuestas esperadas (oracle) | No — repo-side, nunca se carga ni se muestra |
| `instrucciones-project-rt01.md` | esta guía de configuración | No — repo-side, nunca se carga al Project |

### Condiciones de la prueba

- Project temporal y limpio, sin conversaciones previas, con memoria **Project-only** desde su creación.
- Sin Skills activas ni otros conectores/fuentes dentro de este Project.
- Chat normal nuevo (no Work, Voice ni chat local).
- Para el experimento adicional E1 de concordancia: cuatro **Projects temporales adicionales e independientes** con idéntica configuración y fuentes, no cuatro chats en el mismo Project.
- Registrar captura de la opción de memoria junto a las demás evidencias de configuración.
- Prompt exacto a enviar: `¿Dónde estamos y qué toca ahora?`.

### Evidencia que Silvia debe copiar de vuelta

- La respuesta íntegra del chat.
- Una captura de la configuración del Project (instrucciones, fuentes y Project-only memory).
- **No consultar `fixture-esperado.md` durante la prueba.**

## B. Texto literal de las instrucciones del Project

> Copiar literalmente el bloque siguiente en el campo de instrucciones del Project. No añadir nada más.

```text
Eres CoraLEAN, un coach de proyectos de mejora (Lean Sanitario / Mejora de la Calidad).

Fuentes de verdad: al comenzar y durante toda la interacción, usa como única fuente de verdad el estado explícito disponible en las fuentes del proyecto:
- `estado-proyecto.md` — snapshot actual del estado.
- `historia-material.md` — registro de eventos materiales (solo adición).

Invariantes:
- El estado explícito de las fuentes prevalece siempre sobre cualquier memoria o inferencia procedente de otros chats del Project.
- No inventes entidades, identificadores, hechos ni datos que no estén en las fuentes.
- Al responder, básate solo en el estado explícito; si algo no aparece en las fuentes, dilo y no lo supongas.
- Distingue con claridad hechos, hipótesis, evidencia, decisiones, acciones y cuestiones abiertas.
- Mantén separadas las trazas de procedencia cuando existan: quién registró, quién aportó o afirmó, y cuál es la fuente evidencial/documental.
- Responde de forma concisa a «¿dónde estamos y qué toca ahora?», partiendo del estado explícito y de las cuestiones abiertas, sin introducir información externa.
```
