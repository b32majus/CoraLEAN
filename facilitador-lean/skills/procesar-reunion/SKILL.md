---
name: procesar-reunion
description: Convierte la transcripción de una grabación (o las notas, o fotos de pizarras) de una sesión de grupo de trabajo o de una entrevista individual de un proyecto de mejora sanitario en documentos útiles - un acta de seguimiento para el grupo, un documento de trabajo para el líder con todo el contenido de valor (decisiones, acuerdos, responsables, pendientes, dudas, cosas dudosas, datos, información del proceso) y los cambios propuestos a la ficha del proyecto. Úsala después de cada reunión o entrevista.
---

# Procesar reunión

Antes de esta skill, lee `comun/reglas-comunes.md` y `comun/privacidad-y-grabaciones.md`. Para extraer, sigue `recursos/reglas-de-extraccion.md`.

## Para qué sirve

Que nada de valor de una reunión se pierda y que el proyecto avance sin tener que volver a contar lo que pasó. Produce:

| Tipo de reunión | Para el grupo | Para el líder | Para la ficha |
|---|---|---|---|
| **Sesión de grupo** | **Acta de seguimiento** y **correo con el acta**, listo para enviar | **Documento de trabajo** (completo) | Cambios propuestos |
| **Entrevista individual** | — (es confidencial) | **Ficha de entrevista** | Cambios propuestos |

## Entrada

Pide lo que falte de esta lista:
1. **Tipo:** sesión de grupo o entrevista individual.
2. **Transcripción, notas o fotos.** Si la transcripción no distingue quién habla, trabaja igual y marca la atribución como incierta.
3. **Ficha del proyecto** actual.
4. **Opcional:** el guion previsto de la sesión (para comprobar qué se cubrió) y la lista de asistentes por rol.

## Pasos

1. **Privacidad.** Elimina datos de pacientes (sustituye por [paciente]). En entrevistas, usa roles, nunca nombres. Avisa de lo que hayas eliminado.

2. **Primero tú (opcional, una sola pregunta).** Antes de procesar, ofrece: "Si quieres, dime en dos líneas qué crees que fue lo más importante y qué se decidió. Lo compararé con lo que encuentre en la transcripción." Si el líder prefiere no hacerlo o está en modo rápido, sigue.

3. **Lee todo** antes de extraer. Identifica quién habla (por rol) y la estructura de la reunión.

4. **Extrae** siguiendo `recursos/reglas-de-extraccion.md`:
   - temas tratados;
   - **decisiones**: firmes, condicionales ("si X, entonces Y") y aplazadas;
   - **acuerdos y acciones**: qué, responsable, fecha. Si falta responsable o fecha: **SIN ASIGNAR / SIN FECHA**;
   - **pendientes**;
   - **dudas abiertas**: preguntas que quedaron sin respuesta;
   - **cosas dudosas**: no está claro si se decidió, quién lo hará, o la transcripción es confusa. Siempre con la cita literal y el minuto si lo hay;
   - **hechos y datos** mencionados, con quién lo dijo (rol) y si está comprobado;
   - **opiniones y percepciones**;
   - **desacuerdos y tensiones**;
   - **ideas y propuestas no decididas**;
   - **información del proceso**: pasos, tiempos, esperas, traspasos, problemas (servirá para mapear el proceso);
   - **frases textuales** que merece la pena conservar.

5. **Compara con el guion** (si lo hay): qué objetivos se cubrieron y cuáles no.

6. **Genera los documentos** con las plantillas:
   - Sesión de grupo: `plantillas/acta-seguimiento.md`, `plantillas/correo-acta.md` y `plantillas/documento-lider.md`.
   - Entrevista: `plantillas/ficha-entrevista.md`.

7. **Propón los cambios a la ficha** (añadir, modificar, cerrar), cada uno con su origen (cita o minuto). Pide al líder que confirme. Cuando confirme, entrega la ficha completa con la versión nueva.

8. **Registro.** La entrada del cuaderno de esta sesión se genera al cerrarla (`cerrar-sesion`). Indica dónde guardar cada documento en el registro del proyecto (`comun/registro-proyecto.md`): acta y documento del líder en `03_sesiones/`, ficha de entrevista en `02_entrevistas/`.

9. **Comprueba antes de entregar:**
   - cada decisión tiene una cita que la respalda;
   - no hay ningún responsable ni fecha inventados;
   - todo lo dudoso está marcado;
   - el acta no atribuye opiniones a personas;
   - no quedan datos de pacientes.

10. **Si el líder hizo el paso 2**, añade al documento del líder una breve comparación: en qué coincidís, qué encontraste que no mencionó, y qué mencionó que no aparece en la transcripción.

## El acta de seguimiento (para el grupo)

- Una o dos páginas, tono neutro.
- Decisiones, acuerdos con responsable y fecha, pendientes, dudas abiertas, próxima reunión.
- **No atribuye opiniones a personas.** Solo se nombran los responsables de las acciones (por el nombre que el líder indique, o por rol).
- Las cosas dudosas aparecen como "Pendiente de confirmar" para que el grupo las aclare.

## El correo con el acta

Es lo que el líder envía al grupo después de la reunión. Sigue `plantillas/correo-acta.md`:
- asunto claro con proyecto, sesión y fecha;
- quién participó (por rol o por el nombre que indique el líder), qué se trabajó, qué se decidió y los compromisos con responsable y fecha;
- lo pendiente de confirmar, con una petición explícita de corrección y plazo;
- si el proyecto tiene presentación de seguimiento, una línea con **qué cambia en la presentación** («añadido el mapa validado; actualizadas las acciones»);
- tono cordial y breve: se lee en el móvil.

No incluye opiniones atribuidas a personas ni nada que no esté en el acta.

## El documento de trabajo (para el líder)

Todo el contenido de valor, más:
- **Señales del grupo**, descriptivas y sin juicios: participación por rol, quién no intervino, tensiones, temas que generaron energía o silencio.
- **Lo previsto y no cubierto.**
- **Implicaciones para el proyecto** y **sugerencias para la próxima sesión**.
- **Para ti como facilitador** (solo si el líder lo acepta): dos o tres observaciones concretas y útiles. Por ejemplo: proporción de tiempo que habló el líder, preguntas abiertas frente a cerradas, si los acuerdos se cerraron con responsable y fecha. Siempre constructivo, nunca evaluativo.

## Recursos

- `recursos/reglas-de-extraccion.md`
- `plantillas/acta-seguimiento.md`
- `plantillas/correo-acta.md`
- `plantillas/documento-lider.md`
- `plantillas/ficha-entrevista.md`
- `ejemplos/ejemplo-sesion-transcripcion.md` → `ejemplos/ejemplo-sesion-acta.md`, `ejemplos/ejemplo-sesion-correo.md` y `ejemplos/ejemplo-sesion-documento-lider.md`
- `ejemplos/ejemplo-entrevista-transcripcion.md` → `ejemplos/ejemplo-entrevista-ficha.md`
