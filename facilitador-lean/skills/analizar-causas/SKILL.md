---
name: analizar-causas
description: Ayuda a pasar de los síntomas y las opiniones a causas comprobables en un proyecto de mejora sanitaria. Ordena las hipótesis que ya están en la ficha o en el cuaderno, recomienda una sola herramienta (5 porqués, Ishikawa, Pareto o diagrama de dispersión según lo que haya) y diseña cómo comprobar cada causa con datos o con validación explícita del grupo. Produce un mapa de causas con hipótesis, evidencia actual (hecho, supuesto u opinión), cómo comprobarla y estado. Úsala cuando el proceso ya está entendido y el grupo se pregunta por qué ocurre el problema, antes de elegir soluciones.
---

# Analizar causas

Antes de esta skill, lee `comun/reglas-comunes.md` y, si hay grabaciones o citas, `comun/privacidad-y-grabaciones.md`.

## Para qué sirve

Separar **lo que creemos** de **lo que sabemos** sobre por qué ocurre el problema, y decidir qué dato hace falta para pasar de una hipótesis a una causa comprobada. Sin este paso, el grupo elige soluciones para causas que nadie ha verificado.

## Entrada

- La ficha del proyecto, última versión.
- El cuaderno del proyecto, si existe: índice, decisiones vigentes y entradas donde aparecen hipótesis, hallazgos y parking de ideas.
- El mapa del proceso o la situación de partida validada, si existen.
- Las notas, el acta o las fotos de la sesión en la que el grupo habló de causas.
- Los datos disponibles: cuadro de mando, registros, hojas de recogida.

Si falta el problema o el mapa, dilo antes de empezar: sin un problema concreto y localizado no se pueden analizar causas. No des por hecho que recuerdas conversaciones anteriores: lo que no está en la ficha ni en el cuaderno, no existe.

## Pasos

1. **Recupera el contexto y comprueba qué hay.** Lee la ficha y, del cuaderno, el índice y las decisiones vigentes. Resume en tres líneas el problema y el tramo del proceso donde ocurre. Si hay varios problemas, elige uno con el líder; los demás van al parking de ideas o a una lista de pendientes.

2. **Formula el problema como algo observable.** Debe poder decirse sin adjetivos ni culpables: «la primera visita tras el alta se agenda a más de 7 días», no «primaria no funciona». Si el problema es difuso, pide un ejemplo de la última vez que ocurrió.

3. **Primero tú.** Antes de proponer herramientas, pregunta: «¿Qué crees tú que lo está causando? Dime dos o tres cosas, aunque no estés seguro». Escucha sin corregir. Después compara su respuesta con lo que ya hay en la ficha y el cuaderno, y señala coincidencias y huecos.

4. **Recoge las hipótesis sin juzgarlas.** Incluye las del líder, las del grupo, las que ya estaban en la ficha o el cuaderno y las del parking de ideas. Una hipótesis es una **causa candidata que todavía no se ha comprobado**. Escríbela de forma que pueda resultar falsa: «el informe está disponible, pero nadie avisa a primaria», no «falta comunicación».

5. **Clasifica la evidencia de cada hipótesis.** Usa tres etiquetas y no las mezcles:
   - **Hecho:** hay un dato, un documento o una observación con fuente.
   - **Supuesto:** se cree, pero no se ha comprobado.
   - **Opinión o percepción:** lo dice una persona o un rol; importa, pero no es evidencia.
   Una causa **solo se marca como comprobada** si hay un dato que la respalde o una validación explícita del grupo con su alcance anotado. La validación del grupo es más débil que un dato: se registra como tal y se puede revisar. Lo ambiguo queda **PENDIENTE DE CONFIRMAR**.

6. **Recomienda una sola herramienta.** Elige por lo que hay, no por costumbre:

   | Situación | Herramienta | Por qué |
   |---|---|---|
   | Un problema concreto, una cadena de causas, el grupo conoce bien el proceso | **5 porqués** | Rápido y conversacional; obliga a no quedarse en la primera respuesta |
   | Muchas causas posibles de familias distintas | **Ishikawa (espina de pescado)** | Ordena sin perder ninguna y hace visible lo que falta mirar |
   | Hay datos de frecuencia de cada causa | **Pareto** | Muestra qué pocas causas explican la mayoría |
   | Hay dos variables medidas en los mismos casos | **Diagrama de dispersión** | Apoya o descarta una relación, sin demostrar causalidad |

   Explica en una frase por qué esa y por qué ahora. Si no hay datos de frecuencia, **no propongas un Pareto**; si no hay pares de datos, no propongas dispersión.

7. **Constrúyela con el grupo, no por el grupo.** En sesión, usa escritura en silencio antes de debatir y ronda para que no hable solo quien más manda. En los 5 porqués, pregunta «¿por qué?» hasta llegar a algo del **proceso** que se pueda cambiar, no a una persona. No fuerces cinco niveles: se para cuando la siguiente respuesta ya no aporta.

8. **Diseña la comprobación de cada hipótesis.** Para cada una, escribe: qué dato lo confirmaría o descartaría, de qué fuente sale, quién lo recoge, durante cuánto tiempo y qué resultado esperáis. Si no hay dato posible, decidid cómo se valida en grupo (qué evidencia se acepta y quién la aporta). Si falta responsable o fecha, escribe **SIN ASIGNAR** o **SIN FECHA**.

9. **Asigna un estado a cada hipótesis.** Solo cuatro: **hipótesis**, **en comprobación**, **causa comprobada** o **descartada**. Al descartar, anota con qué evidencia. No cierres una causa como comprobada «porque el grupo está de acuerdo» sin dejar escrito en qué se basa ese acuerdo.

10. **Decide qué causa se aborda primero.** Propón como máximo una, explicando el criterio (frecuencia, gravedad, posibilidad de actuar). No pases a soluciones en la misma respuesta: las ideas que surjan van al parking de ideas.

11. **Propón los cambios a la ficha y al cuaderno.** Causas comprobadas, descartadas y pendientes; datos que faltan; acciones de comprobación; documentos generados. Entrega la ficha completa con versión y fecha nuevas cuando el líder lo confirme.

## Salida

- `plantillas/mapa-causas.md` relleno: problema, herramienta usada y su porqué, hipótesis, evidencia actual, cómo comprobarla, responsable, fecha y estado.
- El resultado de la herramienta elegida (árbol de porqués, espina de Ishikawa, Pareto o dispersión). Si la plataforma dibuja Mermaid, puedes acompañarlo de un diagrama; si no, basta el esquema en texto.
- La lista de datos que hay que recoger, con fuente, responsable y fecha (o **SIN ASIGNAR** / **SIN FECHA**).
- Causas comprobadas, descartadas y pendientes, con la evidencia de cada una.
- Los cambios propuestos a la ficha y la entrada que corresponde al cuaderno.

## Cierre

Al terminar, indica qué anotar con `cerrar-sesion`:

- El problema analizado y el tramo del proceso.
- Las hipótesis nuevas, las que pasan a **en comprobación**, las **comprobadas** y las **descartadas**, cada una con su evidencia.
- Las acciones de comprobación con responsable y fecha, o **SIN ASIGNAR** / **SIN FECHA**.
- Las ideas que hayan aparecido, en el parking de ideas.
- Los documentos generados y su ubicación en el registro del proyecto.

Siguiente paso habitual: **`priorizar-soluciones`** cuando haya al menos una causa comprobada. Si no la hay, el siguiente paso es comprobar: recoger el dato acordado antes de elegir soluciones.

## Reglas específicas

- Se analiza el **proceso**, no a las personas. «Falta personal» o «no se implican» no son causas sobre las que el grupo pueda actuar: pregunta qué ocurre en el proceso para que eso pase.
- «Siempre», «nunca», «todo el mundo» y lo que afirma un cargo son percepciones hasta que haya un dato.
- Una correlación no demuestra causalidad. El diagrama de dispersión apoya o descarta; no confirma solo.
- No conviertas una hipótesis en causa comprobada para poder avanzar. Si el grupo tiene prisa, se puede decidir actuar sobre una hipótesis, pero se dice abiertamente y se registra como apuesta, no como causa probada.
- No inventes datos, responsables ni fechas. Si no hay dato, el entregable muestra el hueco.
- No des por hecho que puedes editar archivos: comprueba qué permite el entorno y entrega el texto completo si no puedes.

## Recursos

- `plantillas/mapa-causas.md`
- `ejemplos/ejemplo-mapa-causas.md`
