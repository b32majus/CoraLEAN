---
name: sintetizar-entrevistas
description: Integra varias entrevistas individuales de un proyecto de mejora sanitario en un borrador de la situación de partida (proceso descrito por cada rol, primer mapa del proceso, coincidencias, contradicciones a validar, problemas por frecuencia, ideas, datos y preguntas abiertas), en una versión para presentar al grupo y otra completa para el líder. Úsala cuando estén procesadas las entrevistas y antes de preparar la sesión de validación con el grupo.
---

# Sintetizar entrevistas

Antes de esta skill, lee `comun/reglas-comunes.md` y `comun/privacidad-y-grabaciones.md`.

## Para qué sirve

Convertir lo que cada persona ha contado por separado en **una sola foto de la situación de partida**, que el grupo revisará, aclarará y validará en su primera sesión.

## Entrada

- Las fichas de entrevista (salida de `procesar-reunion`) o, si no las hay, las notas o transcripciones.
- La ficha del proyecto.

## Pasos

1. **Comprueba la cobertura.** ¿Hay entrevistas de cada nivel y tramo del proceso? ¿Falta la perspectiva del paciente? Si falta algo importante, dilo antes de sintetizar.

2. **Proceso por rol.** Para cada rol, cómo describe su tramo.

3. **Primer mapa del proceso.** Une los tramos en una secuencia: pasos, quién, nivel asistencial, tiempos y esperas mencionados, traspasos. Marca los **huecos** (tramos que nadie describe) y los **puntos donde las versiones no encajan**. Si es útil, añade un diagrama sencillo (Mermaid).

4. **Coincidencias.** Lo que dicen varios roles, indicando cuántos ("4 de 6 entrevistas").

5. **Contradicciones.** Cuando dos roles describen lo mismo de forma distinta: las dos versiones, sin decidir cuál es la buena. Van a **validar en grupo**.

6. **Problemas.** Ordenados por frecuencia (cuántas entrevistas los mencionan) y, aparte, los que alguien considera graves aunque solo lo mencione una persona.

7. **Ideas de mejora** recogidas. Aún no se valoran; se guardan para la fase de soluciones.

8. **Datos** mencionados: cuáles existen, cuáles hay que comprobar, cuáles faltan.

9. **Primero tú.** Antes de cerrar las implicaciones, pregunta al líder: "Leyendo esto, ¿qué es lo que más te sorprende y qué crees que cambia del boceto?". Compara con tu propia lectura.

10. **Implicaciones para el boceto.** ¿Cambia el problema, el objetivo, el alcance o el mapa de actores? Propón los cambios a la ficha.

11. **Prepara dos versiones:**
    - **Versión para el grupo:** sin atribuir frases a personas, agregada por rol, sin citas delicadas. Formulada como afirmaciones que el grupo pueda confirmar o corregir ("Entre el alta y la primera visita en primaria pasan habitualmente más de 10 días").
    - **Versión completa para el líder:** con todo el detalle y las citas.

## Cuidado con la confidencialidad

Si en un rol solo hay una persona, sus opiniones son identificables aunque no aparezca el nombre. En la versión para el grupo, redacta esas cuestiones en general o pide antes permiso a la persona.

## Entrega

- `plantillas/situacion-partida.md` en sus dos versiones.
- Los cambios propuestos a la ficha.
- El cierre estándar, con siguiente paso `preparar-sesion` (tipo: validar la situación de partida).

## Recursos

- `plantillas/situacion-partida.md`
- `ejemplos/ejemplo-situacion-partida.md`
