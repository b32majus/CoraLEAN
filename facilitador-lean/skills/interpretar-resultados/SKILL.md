---
name: interpretar-resultados
description: Interpreta los resultados de una prueba de cambio ya ejecutada en un proyecto de mejora sanitaria y convierte los datos en una decisión justificada. Compara lo ocurrido con la predicción, lee un gráfico de evolución con reglas sencillas (tendencia, desplazamiento, rachas), revisa las medidas de proceso y de equilibrio y distingue entre «funcionó», «no funcionó» y «los datos no bastan para saberlo». Termina proponiendo adoptar, adaptar, abandonar o ampliar la prueba, con la evidencia y los límites de cada afirmación. Úsala al terminar el periodo de prueba, antes de consolidar el cambio o de diseñar otro ciclo.
---

# Interpretar los resultados de la prueba

Antes de esta skill, lee `comun/reglas-comunes.md` y, si se han recogido datos de personas, `comun/privacidad-y-grabaciones.md`.

## Para qué sirve

Convertir la hoja de seguimiento en una **decisión justificada**. Una prueba no termina cuando acaba el calendario: termina cuando el grupo mira lo que pasó, lo compara con lo que predijo y decide qué hacer. Interpretar no es buscar un número que confirme lo que ya pensábamos; a veces la conclusión honesta es que **los datos no bastan para saberlo**.

## Entrada

- La ficha del proyecto, última versión, y el cuaderno (índice y decisiones vigentes).
- El plan de prueba (salida de `planificar-prueba`): predicción, alcance, medidas de resultado, proceso y equilibrio, y criterio para adoptar, adaptar o abandonar.
- La hoja de seguimiento rellena y los datos disponibles, con su fuente y su fecha.
- Qué pasó durante la prueba: incidencias, cambios de diseño, personas que participaron y personas que no.
- La evaluación de la experiencia de pacientes y profesionales, si se hizo (salida de `evaluar-experiencia`).

Si no hay predicción escrita, dilo: sin predicción se puede **describir** lo ocurrido, pero no interpretarlo contra una expectativa. Si el criterio de decisión se acordó después de ver los datos, anótalo como límite.

## Pasos

1. **Recupera el contexto.** Lee la ficha y, del cuaderno, el índice y las decisiones vigentes. Resume en tres líneas qué se probó, dónde, durante cuánto tiempo y con qué predicción.

2. **Primero tú.** Pregunta: «¿Qué crees que ha pasado? ¿Se cumplió la predicción? ¿Qué te hace pensarlo?». Escucha sin corregir y guarda la respuesta para compararla al final.

3. **Comprueba qué se hizo de verdad.** Antes de mirar el resultado, mira la **medida de proceso**: ¿se hizo el cambio como se diseñó? ¿Cuántos avisos salieron, cuántos huecos se usaron, cuántos pacientes entraron? Si el cambio no se implantó, no puedes concluir que la idea no funciona: el problema es de ejecución.

4. **Ordena los datos y di qué evidencia es cada cosa.** Para cada medida, anota cuántos casos hay, qué falta, cómo se definió y de qué fuente sale. Distingue **dato medido o registrado** (con fuente y fecha), **observación directa**, **testimonio o percepción** (de quién y por qué rol) y **estimación**. No rellenes huecos con impresiones ni presentes una estimación como medición.

5. **Compara con la predicción.** Clasifica el resultado como **cumplida**, **no cumplida**, **cumplida en parte** o **no evaluable**. Usa la cifra y el plazo que se escribieron antes de empezar; no los cambies ahora. Si la predicción era ambigua, dilo y explica qué se puede afirmar y qué no.

6. **Lee el gráfico de evolución con reglas sencillas.** Si tienes el indicador en el tiempo:
   - **Tendencia:** varios puntos seguidos que suben o bajan de forma sostenida.
   - **Desplazamiento:** seis o más puntos seguidos por encima o por debajo de la línea de referencia (la mediana de antes del cambio o del periodo previo).
   - **Rachas:** demasiados puntos seguidos al mismo lado de la mediana, aunque no haya desplazamiento.
   - **Pocos puntos:** con menos de 10–12 puntos, describe lo que ves y no afirmes que hay un cambio real. Un punto aislado no es una tendencia.
   - Si hay un **gráfico de control** con límites bien calculados, úsalo para distinguir variación normal de señales; si no sabes calcularlo, no lo improvises. Las herramientas `runchart` y `control` de la guía explican cómo se leen.

7. **Mira las tres familias de medidas por separado.**
   - **Resultado:** ¿se movió lo que importa?
   - **Proceso:** ¿se hizo como estaba previsto?
   - **Equilibrio:** ¿empeoró algo? (espera de otros pacientes, carga de trabajo, equidad, seguridad, experiencia).
   Una mejora del resultado con un equilibrio que empeora **no es una buena mejora**. Y un proceso que falla impide atribuir el resultado al cambio.

8. **Contrasta con la experiencia.** Si hay datos de pacientes o profesionales (salida de `evaluar-experiencia`), úsalos para explicar el resultado y el equilibrio; no los sustituyas por tu impresión ni los conviertas en una encuesta de satisfacción. Con pocas respuestas, describe y no generalices.

9. **Elige una de las tres lecturas.** Escribe cuál y por qué:
   - **Funcionó:** la predicción se cumple y el equilibrio no empeora, con un proceso razonablemente implantado.
   - **No funcionó:** la predicción no se cumple o el equilibrio empeora de forma relevante, con el cambio suficientemente implantado como para poder leerlo.
   - **Los datos no bastan para saberlo:** hay pocos casos, falta una medida, el plazo es demasiado corto, el proceso no se implantó o las fuentes no son comparables. Es una conclusión válida, no un fracaso: di qué haría falta para saberlo.

10. **Decide qué hacer.** La decisión es del grupo; tú ayudas a razonarla:
    - **Adoptar:** se cumple la predicción, el equilibrio se mantiene y el cambio se puede sostener. Pasa a `consolidar-mejora`.
    - **Adaptar:** el cambio se hizo, pero el resultado no llega o el equilibrio empeora. Se ajusta el diseño y se vuelve a `planificar-prueba`.
    - **Abandonar:** el cambio no se puede hacer de forma fiable, o empeora la seguridad o la experiencia sin compensación.
    - **Ampliar la prueba:** los datos no bastan, pero hay señal suficiente para seguir aprendiendo. Se alarga el periodo, se amplía el número de casos o se añade la medida que falta, con una nueva predicción o un criterio explícito.

11. **Justifica y registra los límites.** Para cada afirmación, escribe qué evidencia la sostiene y qué no permite afirmar. Si el grupo decide algo distinto de lo que sugieren los datos, anótalo con su motivo y quién lo decidió. No conviertas el acuerdo en un dato.

12. **Propón los cambios a la ficha y al cuaderno.** Resultado, interpretación, decisión, responsables y fechas, y qué se hace después. Entrega la ficha completa con versión y fecha nuevas cuando el líder lo confirme.

## Salida

- `plantillas/hoja-interpretacion.md` rellena: predicción, qué se hizo, datos y su tipo de evidencia, lectura del gráfico, medida de proceso y de equilibrio, lectura elegida, decisión y límites.
- La decisión justificada (adoptar, adaptar, abandonar o ampliar) con quién la tomó y qué falta.
- La lista de lo que no se sabe y cómo se obtendría.
- Los cambios propuestos a la ficha y la entrada que corresponde al cuaderno.

## Cierre

Al terminar, indica qué anotar con `cerrar-sesion`:

- La predicción y lo que ocurrió, con las cifras y el plazo.
- Qué se hizo de verdad (medida de proceso) y qué medidas de equilibrio se movieron.
- La lectura elegida: funcionó, no funcionó o los datos no bastan, con su justificación y sus límites.
- La decisión (adoptar, adaptar, abandonar o ampliar), quién la tomó y con qué condiciones.
- Lo que sigue sin saberse y cómo se obtendría.
- Los documentos generados y su ubicación en el registro del proyecto.

Siguiente paso habitual: si se adopta, **`consolidar-mejora`**; si se adapta o se amplía, volver a **`planificar-prueba`** con lo aprendido; si se abandona, registrar el aprendizaje y volver al parking de ideas.

## Reglas específicas

- **No se exige un dato medido para decidir**, pero toda afirmación debe decir qué la sostiene: dato, registro, observación, testimonio o estimación. «Nos parece que ha ido bien» no es una interpretación.
- **Un resultado que coincide con la predicción no demuestra la relación causal.** Menos aún si se cambió más de una cosa a la vez: en una **intervención combinada** no se puede atribuir el efecto a un componente.
- **No muevas la portería:** la predicción y el criterio se leen como se escribieron. Si cambian, se registra el cambio y se explica.
- **Con pocos datos, describe; no generalices.** Un porcentaje con un denominador de cinco casos engaña más que informa.
- **Si la medida de proceso falla, no concluyas que la idea no funciona.** Primero distingue implantación de efecto.
- **El equilibrio manda:** un resultado mejor con daño en otra medida no justifica adoptar.
- **«Los datos no bastan para saberlo» es una respuesta válida.** No la sustituyas por una opinión para poder cerrar la reunión.
- No inventes datos, responsables ni fechas: **SIN DATO**, **SIN ASIGNAR**, **SIN FECHA**.
- Nada de datos de pacientes: número de orden y roles.
- No prometas que el entorno calculará o actualizará los datos por su cuenta; comprueba qué permite.

## Recursos

- `plantillas/hoja-interpretacion.md`
- `ejemplos/ejemplo-hoja-interpretacion.md`
- Herramientas de la guía: `runchart` (gráfico de evolución) y `control` (gráfico de control).
- Para la experiencia de pacientes y profesionales: skill `evaluar-experiencia`.
