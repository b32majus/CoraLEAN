---
name: cerrar-sesion
description: Cierra una sesión de trabajo de un proyecto de mejora sanitario sin perder nada - recoge lo trabajado en la conversación (decisiones, hallazgos, datos, documentos usados, pendientes), propone los cambios a la ficha del proyecto, entrega la ficha completa con fecha y versión nuevas y un mensaje listo para retomar en la próxima conversación. Úsala al terminar de trabajar en el proyecto, aunque no haya habido reunión.
---

# Cerrar sesión

Antes de esta skill, lee `comun/reglas-comunes.md`.

## Para qué sirve

Que lo trabajado en una conversación **no se quede en la conversación**. La ficha del proyecto es la memoria: si al terminar no se actualiza, la próxima vez habrá que volver a contarlo todo.

## Cuándo

- Al terminar cualquier sesión de trabajo con el asistente (preparar una reunión, procesar una entrevista, pensar el problema…).
- Cuando el líder dice "lo dejamos aquí", "seguimos otro día" o similar: ofrécela.
- Si la conversación ha sido muy larga, también a mitad de camino, para no perder nada.

## Pasos

1. **Repasa la conversación** desde la última versión de la ficha y recoge:
   - decisiones tomadas (y si son firmes, condicionales o aplazadas);
   - hallazgos, datos y evidencias nuevas, con su fuente;
   - hipótesis nuevas o descartadas;
   - acciones acordadas, con responsable y fecha (o SIN ASIGNAR / SIN FECHA);
   - documentos usados o generados (actas, guiones, mapas, transcripciones), con su fecha;
   - dudas abiertas y cosas a averiguar;
   - herramientas aplicadas y qué salió.

2. **Primero tú (una pregunta).** "Antes de cerrar: ¿qué te llevas de hoy y qué crees que toca después?" En modo rápido, sáltalo.

3. **Propón los cambios a la ficha**, apartado por apartado (añadir, modificar, cerrar). No incluyas nada que no se haya trabajado o confirmado en la conversación.

4. **Cuando el líder confirme**, entrega la **ficha completa**:
   - versión nueva (v1 → v2…) y **fecha de última actualización**;
   - apartado «Fuentes y documentos» al día;
   - fila nueva en el historial de versiones con qué cambió;
   - «Próximo paso» actualizado.

5. **Registro del proyecto.** Indica qué documentos de hoy hay que guardar en el registro, en qué carpeta y con qué nombre (según `comun/registro-proyecto.md`, por ejemplo `03_sesiones/2026-11-03_acta_sesion-2.md`), y propón las filas nuevas del índice del registro.

6. **Mensaje para retomar.** Entrega un bloque listo para copiar en la próxima conversación:
   ```
   Retomamos el proyecto [nombre]. Te adjunto la ficha (versión [vN], [fecha]).
   La última vez [resumen en una línea]. Ahora quiero [siguiente paso].
   ```

7. **Dónde guardarlo**, según el entorno:
   - **Project de ChatGPT o Claude:** sustituye el archivo de la ficha en los archivos del proyecto por la versión nueva (borra la anterior para que no haya dos).
   - **OpenCode:** guarda la ficha en la carpeta del proyecto (sustituyendo la anterior).
   - **Conversación suelta:** guárdala en un documento propio y pégala o adjúntala al empezar.

## Entrega

- Los cambios propuestos (antes de confirmar).
- La ficha completa actualizada (después de confirmar).
- El mensaje para retomar.
- El cierre estándar.

## Reglas específicas

- Si en la conversación no ha cambiado nada del proyecto, dilo y no generes una versión nueva.
- Nunca resumas tanto que se pierda una decisión, un responsable o una fecha.
- La ficha debe seguir siendo manejable (1–3 páginas). El detalle (actas, transcripciones procesadas) va al registro del proyecto y la ficha solo lo referencia en «Fuentes y documentos».
- Si en la sesión se ha generado un entregable (informe o presentación), regístralo en `06_entregables/` y anota en la ficha su versión y fecha.
