# Plan de implementación — Cuaderno del proyecto (v0.5)

**Decisión acordada:** tres capas de memoria. La ficha es la foto de hoy y se sustituye. El cuaderno es la línea evolutiva, en un único archivo `.md` donde solo se añade. Los documentos de trabajo se guardan en la carpeta del registro.

**Rutas:** todo en `/srv/kairos-lab/outbox/facilitador-lean/`. Publicar en la rama `feat/facilitador-lean` y en `gh-pages/v04/` (la raíz de gh-pages no se toca), usando el clon de trabajo `…/scratchpad/gh`, con el mismo procedimiento que las veces anteriores: `rsync` a `facilitador-lean/` excluyendo `dist`, `guia/recursos` y `.gitignore`; después copiar `guia/.` a `v04/` y borrar `v04/.nojekyll`.

## Reglas de diseño (no cambiar)

1. **Tres capas:**
   - **ficha:** 1–3 páginas, se sustituye;
   - **cuaderno:** solo se añade; nunca se resume ni se reescribe el historial;
   - **documentos:** se guardan en la carpeta del registro.
2. **Dos modos de actualización del cuaderno:**
   - **El entorno edita archivos** (Work, Cowork, OpenCode, agentes de Copilot): añadir la entrada al final y decirlo.
   - **Entorno manual, cuaderno corto** (≤ ~15 páginas): devolver el archivo completo con la entrada añadida, **más una comprobación**: «el cuaderno tenía N entradas y ahora tiene N+1». Recordar sustituirlo en la base de conocimiento (descargar o «añadir a la fuente») y borrar la versión anterior.
   - **Entorno manual, cuaderno largo:** devolver **solo la entrada nueva** e indicar dónde pegarla. Sugerir archivar lo antiguo (`cuaderno_AAAA-Tn.md`), dejando un resumen en el cuaderno vivo.
3. **Versión de consulta para el usuario:** al cerrar, preguntar «¿Quieres una versión del cuaderno para consultar?».
   - Si el entorno puede crear archivos: `.docx` con buen formato.
   - Si no: texto con tablas simples, listo para pegar en Word.
   - Mencionar el visor de la guía.
4. **Lectura al retomar:** primero la ficha. El cuaderno solo por la parte necesaria (índice y «decisiones vigentes»).
5. **Solo lo trabajado y confirmado.** Nada inventado; lo que falta, como pendiente. Sin datos de pacientes.

## Tareas

### 1. Plantillas en `comun/`
- `plantilla-cuaderno.md`:
  - cabecera: proyecto, **última actualización**, **número de entradas**, ficha vigente (versión);
  - **índice** de entradas (fecha, tipo, una línea);
  - tabla **«Decisiones vigentes»** (fecha, decisión, condición, sustituye a…);
  - sección **«Archivo»** (cuadernos archivados y su resumen);
  - **«Línea evolutiva»** (las entradas, de la más antigua a la más reciente).
- `plantilla-entrada-cuaderno.md`, una por sesión:
  - `### AAAA-MM-DD · [tipo de sesión]`;
  - qué se trabajó y con quién (por rol);
  - decisiones (firmes, condicionales, aplazadas);
  - hallazgos y datos (con fuente);
  - hipótesis nuevas o descartadas;
  - acciones (qué, quién, cuándo o SIN ASIGNAR);
  - parking de ideas;
  - documentos usados o generados (ruta en el registro);
  - qué cambió en la ficha y por qué.
- Actualizar `registro-proyecto.md`: pasa de dos niveles a **tres capas**. Añadir el cuaderno en `00_ficha/` (por ejemplo, `cuaderno-proyecto.md`) y los dos modos de actualización.
- Actualizar `reglas-comunes.md`, regla 1: añadir el cuaderno y la regla «nunca reescribir ni resumir el historial».

### 2. Skill `cerrar-sesion` (ampliación, no skill nueva)
- **Nuevo paso tras actualizar la ficha:** generar la entrada del cuaderno con la plantilla y aplicar el modo que corresponda (regla 2), incluida la comprobación del número de entradas.
- **Actualizar** la cabecera, el índice y «Decisiones vigentes» del cuaderno.
- **Pregunta de versión de consulta** (regla 3).
- **«Dónde guardarlo»:** ficha y cuaderno, por entorno.
- **Recursos:** citar `comun/plantilla-cuaderno.md` y `comun/plantilla-entrada-cuaderno.md`.

### 3. Otras skills
- **`donde-estamos`, paso 0:** leer la ficha y, si existe, el índice y «Decisiones vigentes» del cuaderno. Consultar entradas concretas solo si hace falta.
- **`procesar-reunion`:** recordar que la entrada del cuaderno se genera al cerrar la sesión (una línea).
- **`preparar-entregable`:** el cuaderno es la fuente principal para el informe de continuidad y para «Trabajo realizado».

### 4. Plan B (`proyecto/INSTRUCCIONES.md`)
- Regla 1: ficha más cuaderno; añadir la entrada al final y nunca reescribir el historial; los dos modos de actualización.
- Ruta «Termina la sesión» → `cerrar-sesion` (ficha + cuaderno + versión de consulta).

### 5. Guía web (`guia/`)
- **`assets/datos.js`:**
  - paso `cerrar-sesion`: «recibes» añade «Entrada del cuaderno (o el cuaderno completo)» y «Versión para consultar (Word)»; «después de pegarlo» añade «guarda la ficha y el cuaderno en la base de conocimiento (descargar o "añadir a la fuente") y borra las versiones anteriores»;
  - añadir las plantillas `cuaderno` y `entrada-cuaderno` al mapa `plantillas` y al paso `cerrar-sesion`.
- **`assets/app.js`, vista «La ficha»:**
  - renombrar el título a «La memoria del proyecto»;
  - explicar las tres capas con una tabla (qué es, para qué, cómo se actualiza);
  - explicar los dos modos (entorno que edita frente a manual);
  - enlazar el visor.
- **Página nueva `cuaderno.html` (visor local):**
  - el usuario arrastra o elige un `.md` y lo ve con formato;
  - botones «Imprimir / guardar como PDF» y «Copiar»;
  - **todo en el navegador, no se envía nada** (`FileReader`, sin `fetch`);
  - reutilizar las funciones `md()` e `inline()` de `ver.html` (copiarlas o extraerlas a `assets/md.js` y usarlas en las dos páginas);
  - enlazarla desde «La ficha» y desde el paso `cerrar-sesion`.
- **`empaquetar.sh`:** copiar `comun/plantilla-cuaderno.md` → `recursos/plantillas/cuaderno.md` y `comun/plantilla-entrada-cuaderno.md` → `recursos/plantillas/entrada-cuaderno.md`.

### 6. Ejemplo
- `skills/cerrar-sesion/ejemplos/ejemplo-cuaderno.md`: caso ficticio de insuficiencia cardiaca con tres entradas (boceto, entrevistas, sesión 1), coherente con los ejemplos existentes. Citarlo en la skill y en el paso de la guía.

### 7. Documentación
- `README.md`: v0.5 y la nota sobre las tres capas.
- `REGISTRO_MEJORAS.md`: añadir «Estado de implementación — v0.5» (C4 ampliado: cuaderno; visor local).

## Verificación (obligatoria antes de publicar)
1. `./empaquetar.sh` sin errores.
2. Validación de las skills: cabecera, `name` igual a la carpeta, descripción de 1.024 caracteres como máximo y todas las rutas citadas existentes. Reutilizar el script de Python de las veces anteriores.
3. Validación de referencias de la guía con `node`: plantillas, ejemplos, pasos y herramientas.
4. Batería del navegador (`scratchpad/guia03.cjs`, con un puerto libre): «sin errores».
5. **Prueba del visor:** cargar un `.md` con `setInputFiles` en Playwright y comprobar que se muestran las tablas y que no queda sintaxis Markdown visible.
6. Publicar y comprobar que `https://b32majus.github.io/CoraLEAN/v04/cuaderno.html` devuelve 200.
