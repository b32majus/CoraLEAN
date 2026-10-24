---
name: cerrar-sesion
description: Cierra una sesión de trabajo de un proyecto de mejora sanitario sin perder nada - recoge lo trabajado en la conversación (decisiones, hallazgos, datos, documentos usados, pendientes), propone los cambios a la ficha del proyecto, entrega la ficha completa con fecha y versión nuevas, añade la entrada de la sesión al cuaderno del proyecto (línea evolutiva) y da un mensaje listo para retomar en la próxima conversación. Úsala al terminar de trabajar en el proyecto, aunque no haya habido reunión.
---

# Cerrar sesión

Antes de esta skill, lee `comun/reglas-comunes.md` y `comun/registro-proyecto.md`.

## Para qué sirve

Que lo trabajado en una conversación **no se quede en la conversación**. La memoria del proyecto tiene tres capas: la **ficha** (la foto de hoy, se sustituye), el **cuaderno** (la línea evolutiva, solo se añade) y los documentos de trabajo. Si al terminar no se actualizan, la próxima vez habrá que volver a contarlo todo.

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

5. **Cuaderno del proyecto.** Genera la **entrada de esta sesión** con `comun/plantilla-entrada-cuaderno.md` (qué se trabajó, decisiones, hallazgos y datos con fuente, hipótesis, acciones, parking de ideas, documentos, qué cambió en la ficha y por qué). Solo lo trabajado y confirmado. Después, según el entorno (reglas en `comun/registro-proyecto.md`):
   - **Si has comprobado que puedes editar el archivo:** añade la entrada al **final** del cuaderno, regenera las vistas derivadas (cabecera con fecha y número de entradas, índice, decisiones vigentes) y dilo. No modifiques las entradas anteriores. Si no sabes si puedes editarlo, no lo supongas: usa uno de los modos siguientes.
   - **Entorno manual, cuaderno corto** (hasta unas 15 páginas): entrega el cuaderno completo con la entrada añadida y la **comprobación**: «el cuaderno tenía N entradas y ahora tiene N+1». Si el número no cuadra, avísalo: se ha perdido algo.
   - **Entorno manual, cuaderno largo:** entrega **solo la entrada nueva** y dónde pegarla, y sugiere archivar lo antiguo (`cuaderno_AAAA-Tn.md`) dejando un resumen en el cuaderno vivo.
   - **Si todavía no hay cuaderno,** créalo con `comun/plantilla-cuaderno.md` y la primera entrada.
   - **Nunca resumas ni modifiques las entradas anteriores:** si algo cambió, se registra en una entrada nueva.

6. **Registro del proyecto.** Indica qué documentos de hoy hay que guardar en el registro, en qué carpeta y con qué nombre (según `comun/registro-proyecto.md`, por ejemplo `03_sesiones/2026-11-03_acta_sesion-2.md`), y propón las filas nuevas del índice del registro.

7. **Mensaje para retomar.** Entrega un bloque listo para copiar en la próxima conversación:
   ```
   Retomamos el proyecto [nombre]. Te adjunto la ficha (versión [vN], [fecha]).
   La última vez [resumen en una línea]. Ahora quiero [siguiente paso].
   ```

8. **Versión para consultar.** Pregunta: «¿Quieres una versión del cuaderno para consultar?». Si el entorno puede crear archivos, genera un `.docx` con buen formato y tablas. Si no, ofrece el texto con tablas simples para pegar en Word, y menciona el visor de la guía, que muestra cualquier `.md` con formato sin enviar nada. Quien no trabaja en Markdown no tiene por qué verlo.

9. **Dónde guardarlo**, según el entorno:
   - **Project de ChatGPT o Claude:** sustituye en los archivos del proyecto la ficha **y** el cuaderno por sus versiones nuevas (descargando el archivo o con «añadir a la fuente») y borra las anteriores para que no haya dos.
   - **Entornos con carpeta del proyecto** (OpenCode y, si lo has comprobado, Work o Cowork): se guardan en la carpeta; si el asistente edita archivos, comprueba que el cuaderno ha cambiado.
   - **Conversación suelta:** guárdalos en documentos propios y pégalos o adjúntalos al empezar.

## Entrega

- Los cambios propuestos (antes de confirmar).
- La ficha completa actualizada (después de confirmar).
- La entrada del cuaderno, o el cuaderno completo con su comprobación.
- La versión para consultar, si la pide.
- El mensaje para retomar.
- El cierre estándar.

## Reglas específicas

- Si en la conversación no ha cambiado nada del proyecto, dilo y no generes una versión nueva.
- Nunca resumas tanto que se pierda una decisión, un responsable o una fecha.
- La ficha no es el cuaderno: la ficha es la foto de hoy (1–3 páginas) y el cuaderno guarda el recorrido completo.
- La ficha debe seguir siendo manejable (1–3 páginas). El detalle (actas, transcripciones procesadas) va al registro del proyecto y la ficha solo lo referencia en «Fuentes y documentos».
- Si en la sesión se ha generado un entregable (informe o presentación), regístralo en `06_entregables/` y anota en la ficha su versión y fecha.

## Recursos

- `comun/plantilla-cuaderno.md`
- `comun/plantilla-entrada-cuaderno.md`
- `comun/registro-proyecto.md`
- `ejemplos/ejemplo-cuaderno.md`
