---
name: mapear-proceso
description: Guía la construcción del mapa del proceso actual de un proyecto de mejora sanitario (recorrido del paciente por niveles asistenciales, quién hace cada paso, traspasos, tiempos de proceso y de espera, problemas) y, cuando procede, un VSM con tiempo total y tiempo que aporta valor. Funciona conversando con el líder, a partir de entrevistas o síntesis, o a partir de fotos o notas de un mapa hecho en la pared. Produce tabla del proceso, diagrama y hoja de recogida de tiempos.
---

# Mapear el proceso

Antes de esta skill, lee `comun/reglas-comunes.md`.

## Para qué sirve

Tener una imagen compartida de **cómo funciona hoy de verdad** el recorrido del paciente, dónde espera, dónde se pierde información y dónde están los problemas. Es la base para comparar con el PAI y para analizar causas.

## Entrada y modos

Pregunta qué tiene el líder y elige el modo:

| Modo | Cuándo | Entrada |
|---|---|---|
| **A. Desde entrevistas** | Ya hay fichas de entrevista o síntesis | Síntesis o fichas |
| **B. Desde la pared** | El grupo hizo el mapa en una sesión | Fotos o notas del mapa, o transcripción |
| **C. Conversando** | El líder conoce el proceso y quiere un primer borrador | Sus respuestas, paso a paso |
| **D. Preparar la sesión de mapeo** | Se va a construir con el grupo | Usar `preparar-sesion` (guion tipo "Mapear el proceso actual") |

En todos los modos, el mapa resultante es un **borrador** hasta que lo valida el grupo.

## Pasos

1. **Límites.** ¿Dónde empieza el proceso para el paciente y dónde termina para nosotros? ¿Qué paciente tipo seguimos? Si el alcance es grande, propón mapear primero el tramo donde más duele.

2. **¿Mapa sencillo o VSM?**
   - **VSM** si el problema tiene que ver con tiempos, esperas o demoras y se pueden estimar o medir.
   - **Mapa sencillo por carriles** si el problema es de coordinación, información o responsabilidades.
   Explica la elección en una frase.

3. **Pasos.** Uno por uno, con verbo + objeto ("solicitar interconsulta", "citar primera visita"). En el modo C, pregunta de uno en uno: "¿Y después qué pasa? ¿Quién lo hace? ¿Dónde?".

4. **Carriles por nivel asistencial** (primaria, hospital, urgencias, gestión de casos, paciente y familia…). Marca cada **traspaso** entre carriles: ahí suelen estar los problemas.

5. **Flujo de información.** Para cada traspaso, ¿cómo pasa la información? (informe, interconsulta, llamada, nada).

6. **Tiempos (si es VSM).** Para cada paso: **tiempo de proceso** (se hace algo al paciente) y **tiempo de espera** hasta el siguiente paso. Marca cada valor como **medido** o **estimado**. Nunca presentes estimaciones como datos.

7. **Problemas.** Localiza cada problema en un paso o traspaso concreto, con su origen (entrevista, sesión, dato).

8. **Primero tú.** Antes de las conclusiones, pregunta al líder: "Mirando el mapa, ¿dónde crees que está el principal problema?". Compara con lo que muestran los tiempos y los problemas.

9. **Métricas del VSM** (si aplica): tiempo total del recorrido, tiempo de proceso total, porcentaje de tiempo que aporta valor, la espera más larga.

10. **Huecos y datos a recoger.** Tramos que nadie ha descrito, tiempos que habría que medir. Si hace falta, genera la hoja de recogida de tiempos.

## Entrega

- `plantillas/tabla-proceso.md` rellena.
- Un **diagrama Mermaid** (flowchart con un subgrafo por nivel asistencial). Si la plataforma no lo dibuja, el líder puede pegarlo en mermaid.live o pedir un esquema en texto.
- Métricas del VSM (si aplica).
- Problemas localizados, huecos y datos a recoger.
- Si hace falta, la hoja de recogida (`plantillas/hoja-recogida-tiempos.md`).
- Cambios propuestos a la ficha (apartados 8, 11 y 12).
- El cierre estándar. Siguiente paso habitual: validar el mapa con el grupo, `comparar-con-estandar` si hay PAI, o pasar a causas.

## Reglas específicas

- Se mapea **lo que pasa**, no lo que dice el protocolo.
- Incluye las excepciones frecuentes (fines de semana, altas de tarde, pacientes que viven solos).
- No mezcles soluciones en el mapa. Si aparecen, van al "aparcamiento".

## Recursos

- `plantillas/tabla-proceso.md`
- `plantillas/hoja-recogida-tiempos.md`
- `ejemplos/ejemplo-mapa-ic.md`
