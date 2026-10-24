# CoraLEAN — Prompts de imágenes ilustrativas

**Por qué existen:** las imágenes reales del trabajo de la experta pertenecen a su organización y no se pueden publicar. Se recrean con IA como fotografías ilustrativas. Todas se muestran en la guía con el pie «Imagen ilustrativa generada con IA».

## Estado

| # | Archivo | Qué es | Dónde se usa | Estado |
|---|---|---|---|---|
| 1 | `mapa-pared.jpg` | Mapa de proceso en la pared con leyenda y parking | Ficha de mapa por carriles; página de Técnicas | ✅ Hecha y publicada |
| 2 | `vsm-mano.jpg` | VSM dibujado a mano | Ficha de VSM | ⏳ Pendiente |
| 3 | `5s-antes.jpg` y `5s-despues.jpg` | Carro o almacén, antes y después | Ficha de 5S | ⏳ Pendiente |
| 4 | `gestion-visual.jpg` | Panel de gestión visual en una unidad | Ficha de gestión visual | ⏳ Pendiente |
| 5 | `spaghetti-plano.jpg` | Diagrama spaghetti sobre un plano | Ficha de spaghetti | ⏳ Pendiente |
| 6 | `a3.jpg` | A3 terminado en la pared | Ficha de A3 | ⏳ Pendiente |
| 7 | `sesion-grupo.jpg` | Sesión de grupo con pósits | Pantalla de inicio y Técnicas | ⏳ Pendiente |
| 8 | `gemba.jpg` | Observación en el lugar de trabajo | Ficha de gemba | ⏳ Pendiente |
| 9 | `semaforo-votacion.jpg` | Votación con tarjetas verde, ámbar y rojo | Ficha de semáforo | ⏳ Pendiente |
| 10 | `parking-ideas.jpg` | Hoja de parking de ideas | Técnicas | ⏳ Pendiente (opcional: la foto 1 ya lo cubre) |

## Lo que hemos aprendido (y cómo se aplica a todos los prompts)

La imagen 1 salió bien porque se siguieron estas reglas. Aplícalas siempre:

1. **Texto: solo palabras cortas, en mayúsculas, sin tildes y en el rótulo que debe leerse.** Funcionó con «PASOS», «PROBLEMAS», «TIEMPOS», «IDEAS» y «PARKING DE IDEAS». Todo lo demás debe quedar ilegible (garabatos).
2. **Los pósits, en blanco o con garabatos.** Los generadores se equivocan con las tildes y con letras pequeñas; una errata resta credibilidad. Evita pedir frases.
3. **Colores del código de CoraLEAN:** amarillo = pasos, rosa = problemas, azul = tiempos, verde = ideas. Pídelos explícitamente y en su sitio.
4. **Una persona como mucho, sin rostro** (de espaldas, de perfil o solo la mano). Sin logotipos, sin pantallas con datos y sin pacientes.
5. **Mismo estilo para todas:** fotografía documental, luz natural, sala de reuniones o unidad sanitaria genérica.
6. **Comprueba al recibir:** que no haya texto raro, logotipos ni caras reconocibles. Si los hay, regenera. Si los colores no coinciden con la leyenda, regenera.
7. **Descarta las que tienen la leyenda diminuta o colores cruzados** (nos pasó con una de las pruebas).

## Línea de estilo común

Añade esto al final de cada prompt:

```
Documentary photography, natural daylight, realistic, 16:9, shallow depth of field, no logos, no brand names, no identifiable faces, no readable text except the words explicitly requested.
```

## Entrega

- Formato JPG o WebP de unos 1600 px de ancho (se optimiza al integrar; la 1 pasó de 1,9 MB a 147 KB).
- Dejar el original en `/srv/kairos-lab/inbox/CoraLEAN/`. Se integra con el nombre de archivo de la tabla en `guia/assets/img/`.
- Integración: añadir `imagen: { src, alt, pie }` a la herramienta en `guia/assets/datos.js` (ya se muestra con su pie). Ejemplo en la herramienta `carriles`.

---

## Prompts

### 1. `mapa-pared.jpg` — ✅ hecha

```
A hospital meeting room. A long sheet of brown kraft paper on the wall used as a process map with four horizontal swimlanes drawn in black marker. Sticky notes in four colours: yellow in the middle lane (process steps, with small arrows between them), pink above and below (problems), blue at the bottom (times), green in a separate corner. Sticky notes have illegible handwriting. On the left, a white printed legend sheet with four big sticky notes and one big word beside each: "PASOS" (yellow), "PROBLEMAS" (pink), "TIEMPOS" (blue), "IDEAS" (green). In the top right corner, a separate white sheet with the large printed title "PARKING DE IDEAS" and green sticky notes stuck on it. Only those words are readable. A hand placing a pink note, no face visible. A meeting table in the foreground with a stethoscope and notebooks.
```

### 2. `vsm-mano.jpg` — VSM a mano

```
A hand-drawn value stream map on a large sheet of paper taped to a hospital meeting-room wall. Left to right: a rectangle labelled with the single readable word "DEMANDA", then four process boxes each with a small data table drawn underneath (illegible numbers), triangles with a letter "E" between the boxes for waiting, arrows for patient flow, dashed arrows for information flow. At the bottom a stepped timeline: short segments above the line and long segments below. Marker drawing, slightly messy, as made by a team in a workshop. Yellow, pink and blue sticky notes on a few steps. Two people seen from behind pointing at it. The only readable words: "DEMANDA" and "ESPERA".
```

### 3. `5s-antes.jpg` y `5s-despues.jpg` — carro de curas, antes y después

Genera las dos con **el mismo encuadre y la misma luz** (pídelo como variación de la primera imagen si tu herramienta lo permite).

```
(ANTES) A hospital dressing trolley seen from the front, cluttered: supplies piled randomly, open boxes, mixed items, tangled packages, no labels, a few items falling over. Neutral fluorescent light, realistic, slightly untidy. No brand names, no readable text.
```
```
(DESPUÉS) The same hospital dressing trolley, same angle and light, now organised: every item in its own marked place with coloured edge tape, outline marks showing where each tool goes, neatly labelled drawers (labels blank), clear and clean. Calm look. No brand names, no readable text.
```

### 4. `gestion-visual.jpg` — panel de gestión visual

```
A visual management board on the wall of a hospital ward corridor: a white board with a line chart, a small traffic-light section (green, amber, red), and two columns made with magnets and cards titled "PROBLEMAS DEL DIA" and "ACCIONES". Only those two titles are readable; everything else is illegible. Four healthcare professionals in scrubs standing in a short stand-up meeting in front of it, seen from behind or in profile with blurred faces. No patients, no screens.
```

### 5. `spaghetti-plano.jpg` — diagrama spaghetti

```
Top-down view of a large printed floor plan of a hospital ward on a table. Red, blue and green marker lines tangled across the plan, showing movement paths between rooms, a nurse station and a storage area. A piece of string laid along one path and pinned with thumbtacks. A hand holding a marker at the edge of the frame. A small ruler beside the plan. No readable text, only abstract room shapes.
```

### 6. `a3.jpg` — A3 terminado

```
An A3 problem-solving sheet pinned on a hospital meeting-room wall. A clear grid with boxes whose only readable titles are in capital letters without accents: "CONTEXTO", "SITUACION ACTUAL", "OBJETIVO", "CAUSAS", "CONTRAMEDIDAS", "PLAN", "SEGUIMIENTO". Inside the boxes, tiny illegible handwriting, small hand-drawn charts and a fishbone diagram, a few coloured sticky notes attached. A hand pointing at one box, no face. Realistic photo.
```

### 7. `sesion-grupo.jpg` — sesión de grupo

```
Six healthcare professionals (nurses, doctors, a pharmacist, mixed ages and genders) standing around a wall covered with yellow, pink, blue and green sticky notes during a working session. Seen from behind or three-quarter view, faces not identifiable. Warm, collaborative mood. Meeting room with windows. No readable text.
```

### 8. `gemba.jpg` — gemba (ir a ver)

```
A person with a notebook observing a nurse at work in a hospital ward corridor, from a respectful distance. The observer is only partly visible and the nurse is seen from behind. Soft light, realistic. No patients, no readable text.
```

### 9. `semaforo-votacion.jpg` — semáforo de validación

```
A group of hands raising green, amber and red cards at the same time across a meeting table, close-up, mixed hands of different ages. Blurred meeting room in the background. The cards are plain coloured cards with no text.
```

### 10. `parking-ideas.jpg` — parking de ideas (opcional)

```
A sheet of flipchart paper on a wall with the large printed title "PARKING DE IDEAS" and several green sticky notes stuck on it, next to a flipchart stand. Meeting room in soft focus. The sticky notes have illegible handwriting. Only the title is readable.
```

---

## Si un generador no respeta las reglas

- **El texto sale mal:** quita ese texto del prompt y pide el rótulo en blanco; la guía puede superponer el rótulo correcto con HTML.
- **Aparece una cara reconocible o un logotipo:** regenera con «faces turned away, no logos».
- **Los colores no coinciden con el código:** repite el prompt con la frase «yellow = steps, pink = problems, blue = times, green = ideas».
- **Dos imágenes del mismo par (antes y después) no coinciden:** genera la segunda como edición de la primera, no desde cero.
