# Plan A — Correcciones de la auditoría UX (CoraLEAN v0.6)

**Raíz de trabajo:** `/srv/kairos-lab/outbox/facilitador-lean/`
**Criterio de terminado:** `tests/ejecutar.sh` termina con `TODO CORRECTO`. Los tests ya existen y codifican todos los criterios de este plan.

## Reglas para quien implementa

1. **No modifiques nada en `tests/`.** Si un test te parece equivocado, para y explícalo en tu informe, sin tocarlo.
2. **No edites `dist/` ni `guia/recursos/`.** Se generan con `./empaquetar.sh`.
3. **No hagas commits, push ni publiques.** Solo edita las fuentes y ejecuta los tests.
4. **Usa literalmente los textos en español de este plan.** Respeta tildes, comillas «» y mayúsculas.
5. **Mantén el estilo del código** (JavaScript sin dependencias, funciones existentes, `esc()` para todo texto que vaya a HTML).
6. Ejecuta `tests/ejecutar.sh` al final de cada bloque y otra vez al terminar. Es necesario Node con Playwright en `~/.npm-global` (ya está instalado).
7. **Al terminar, informa:** archivos modificados, resultado final de `tests/ejecutar.sh` y cualquier desviación respecto a este plan.

---

## Bloque 1 — `guia/assets/datos.js`

### 1.1 Plataforma «sin configurar» (UX-01)
En `plataformas`, añade como **primer** elemento:
```js
{ id: "sinconfig", nombre: "Todavía no lo he configurado", prefijo: () => "Actúa como CoraLEAN, un facilitador metodológico para proyectos de mejora sanitaria: pregúntame antes de proponer, separa hechos de supuestos y no inventes datos.\n\n", nota: "Funciona sin instalar nada, aunque mejor si configuras tu asistente." },
```

### 1.2 Orientación en los momentos sin actividades (MET-01)
Añade una propiedad `orientacion` a cuatro momentos (dentro de su objeto, por ejemplo después de `listo`):

- `porque`:
```js
orientacion: { texto: "Mientras preparamos actividades específicas para este momento, este mensaje hace que tu asistente te acompañe con método.", mensaje: "Quiero entender por qué ocurre el problema del proyecto. Primero pregúntame qué causas sospecho yo. Después ayúdame a separar hipótesis de causas comprobadas, a elegir una herramienta sencilla (5 porqués, Ishikawa o Pareto si hay datos) y a decidir qué dato necesitamos para confirmar o descartar cada causa. No des ninguna causa por cierta sin evidencia." },
```
- `eligiendo`:
```js
orientacion: { texto: "Mientras preparamos actividades específicas para este momento, este mensaje hace que tu asistente te acompañe con método.", mensaje: "Tenemos varias ideas de cambio y quiero decidir cuál probar primero. Primero pregúntame qué idea prefiero yo y por qué. Después ayúdame a comprobar que cada idea ataca una causa identificada, a compararlas con criterios explícitos (impacto, esfuerzo, riesgo, quién tendrá que aplicarla) y a elegir una prueba pequeña. Recuérdame qué falta antes de decidir." },
```
- `probando`:
```js
orientacion: { texto: "Mientras preparamos actividades específicas para este momento, este mensaje hace que tu asistente te acompañe con método.", mensaje: "Quiero planificar una prueba pequeña del cambio que hemos elegido (un ciclo PDCA). Primero pregúntame qué espero que pase. Después ayúdame a escribir la predicción, el indicador, el ámbito pequeño (dónde, cuánto tiempo, con quién), el responsable y cómo decidiremos al final si adoptamos, adaptamos o abandonamos el cambio." },
```
- `sosteniendo`:
```js
orientacion: { texto: "Mientras preparamos actividades específicas para este momento, este mensaje hace que tu asistente te acompañe con método.", mensaje: "Hemos adoptado un cambio y quiero comprobar si se mantiene. Primero pregúntame qué señales veo yo. Después ayúdame a decidir qué indicador revisar y con qué frecuencia, cómo saber si la mejora se está perdiendo, cómo conocer la experiencia de pacientes y profesionales, y qué hemos aprendido que sirva para el siguiente proyecto." },
```

### 1.3 Ejemplos duplicados (auditoría: VSM)
En `herramientas`, elimina la propiedad `ejemplo` completa de los objetos `vsm` y `porques`. Repiten el mismo diagrama de la cabecera.

### 1.4 Semáforo: buena práctica, no regla
Sustituye los textos siguientes:
- En el paso `preparar-validacion`, campo `consejo`:
  `"Debatid sobre todo lo ámbar y lo rojo del semáforo. Lo verde se da por bueno, salvo que aparezca información nueva que obligue a revisarlo."`
- En la herramienta `semaforo`, campo `teoria`: cambia `Solo se debate lo ámbar y lo rojo.` por `Se debate sobre todo lo ámbar y lo rojo; lo verde se da por bueno salvo que aparezca información nueva.`
- En la técnica `semaforo` (array `tecnicas`), campo `como`: `"Verde, ámbar o rojo por afirmación. Se debate sobre todo lo ámbar y lo rojo."`

## Bloque 2 — `guia/assets/diagramas.js`

- En **todas** las cadenas `<svg ...>` del archivo (el helper `svg` de la línea 4, el `<svg>` de `D["ej-ishikawa"]` y los helpers `sv` de `ej-control`, `ej-matriz`, `ej-impulsores` y `ej-pareto`), sustituye `role="img"` por `aria-hidden="true"`. Ningún diagrama debe conservar `role="img"`: la descripción accesible la pone su contenedor (Bloque 3.11).
- En `D.semaforo`, cambia el texto `"Solo se debate lo ámbar y lo rojo"` por `"Se debate sobre todo lo ámbar y lo rojo"`.

## Bloque 3 — `guia/assets/app.js`

### 3.1 Estado inicial y sincronización selector ↔ pestañas (UX-01, UX-02)
- La plataforma por defecto pasa a ser `"sinconfig"`: `plataforma: guardado.plataforma || "sinconfig"`.
- Añade, junto a `TABS`, el mapa `const TAB_DE = { chatgpt: "chatgpt", claude: "claude", opencode: "opencode", proyecto: "chatgpt" };`. Debe estar definido antes de usarse; muévelo arriba, cerca de `estado`, si hace falta.
- La pestaña inicial sale de la plataforma: `estado.tab = TAB_DE[estado.plataforma] || "chatgpt"`.
- Escribe una función `ponerPlataforma(id)` que:
  1. fije `estado.plataforma = id` y `sel.value = id`;
  2. si `TAB_DE[id]` existe, fije `estado.tab = TAB_DE[id]`;
  3. llame a `guardar()`.

  Úsala en el `change` del selector (seguido de `render()`).
- Al pulsar una pestaña `id`:
  1. `estado.tab = id`;
  2. si `id` es `chatgpt`, `claude` u `opencode`, y **no** se da que `estado.plataforma === "proyecto"` con `id` igual a `chatgpt` o `claude`, llama a `ponerPlataforma(id)`;
  3. vuelve a pintar `vistaInstalar()`.
- Las pestañas `copilot` y `gratis` no cambian la plataforma.

### 3.2 Pestañas accesibles (ACC-01)
En `vistaInstalar`:
- Cada botón de pestaña lleva `id="tab-${t.id}"`, `aria-controls="panel-instalar"`, `aria-selected` y `tabindex="0"` si está seleccionada o `tabindex="-1"` si no.
- Envuelve `cuerpo` en `<div role="tabpanel" id="panel-instalar" aria-labelledby="tab-${tab}">…</div>`.
- Añade `keydown` en el contenedor `.pestanas`:
  - `ArrowRight` y `ArrowLeft` pasan a la pestaña siguiente o anterior, de forma circular;
  - `Home` y `End` van a la primera y a la última.
  - Activa la pestaña nueva igual que con un clic y, tras volver a pintar, pon el foco en `#tab-${nueva}`.

### 3.3 Textos de configuración (P1, tecnología menos protagonista)
En `vistaInstalar`:
- El título `Opción A · Instalar las skills (recomendada, en cuentas de pago)` pasa a ser `Opción A · Instalar las skills (si tu cuenta permite subirlas)`.
- El párrafo de introducción pasa a ser: `Se hace una vez. Elige dónde vas a usar CoraLEAN y sigue los pasos. Si tu cuenta permite subir skills, es la opción más completa; si no, usa el proyecto con instrucciones. También puedes empezar sin configurar nada: los mensajes funcionan igual, aunque peor.`

### 3.4 Portada (UX-03 y texto «Qué no es»)
En `vistaInicio`:
- Mueve el bloque `<div class="ctas">…</div>` para que quede **justo después** de `<p class="lema">` y **antes** de `<div class="pilares">`.
- El primer botón (`btn prim`, «Empezar un proyecto») apunta a `#empezar`. Los demás se mantienen: «Retomar un proyecto» → `#paso-donde-estamos`, «Configurar mi asistente» → `#instalar` y «Continuar donde lo dejé».
- Sustituye el párrafo de la tarjeta «Qué no es» por:
  `CoraLEAN no decide ni hace el proyecto por ti. Te ayuda a razonar, y puede preparar actas, informes y presentaciones a partir del trabajo y las decisiones que hayas validado. Tampoco sustituye a tu organización ni a la mentoría: te acompaña mientras aprendes a hacerlo con menos ayuda.`
- En «Cómo navegar», sustituye el elemento que empieza por `<b>En cada sesión:</b>` por:
  `<li><b>Para trabajar:</b> lo que harás a menudo: retomar, preparar y procesar reuniones, elegir herramienta, preparar entregables y cerrar la sesión.</li>`
- Al final de la sección «Cómo funciona» (después de la rejilla `.funciona`), añade:
  `<p style="margin:0"><a href="ver.html#ejemplos/cerrar-sesion--ejemplo-cuaderno">Ver un proyecto de ejemplo de principio a fin →</a></p>`

### 3.5 Vista nueva `#empezar` — «¿Qué necesitas hacer ahora?» (UX-01)
Crea `vistaEmpezar()` y enrútala en `render()`: `else if (h === "empezar") vistaEmpezar();`. Contenido, dentro de `<div class="ancho">`:

1. **Introducción:** `<div class="intro"><div class="etq">Empezar</div><h1>¿Qué necesitas hacer ahora?</h1><p>Elige tu situación. Si es la primera vez, prepara antes tu asistente: son unos minutos.</p></div>`
2. **Bloque `.rej-2`** con dos tarjetas `.card`:
   - `<h3>Es la primera vez</h3>` + `<p>Prepara tu asistente de IA para que trabaje como CoraLEAN. Si prefieres, puedes empezar sin configurar nada: funciona, aunque peor.</p>` + `<div class="enlaces"><a class="btn prim" href="#instalar">Configurar mi asistente</a><a class="btn" href="#paso-recoger-contexto">Empezar sin configurar</a></div>`
   - `<h3>Ya tengo mi asistente preparado</h3>` + `<p>Dime cuál usas y los mensajes se adaptan:</p>` + botones `<button class="btn" data-plat="ID" aria-pressed="true|false">Nombre</button>` para `chatgpt` (ChatGPT), `claude` (Claude), `opencode` (OpenCode) y `proyecto` (Proyecto con instrucciones). `aria-pressed="true"` en el que coincida con `estado.plataforma`. Al pulsar: `ponerPlataforma(id)` y `vistaEmpezar()`.
3. **`<h2 style="font-size:22px">Elige tu situación</h2>`** y una lista `<div class="lista-pasos">` con enlaces `<a class="paso-fila" href="#DESTINO"><b>TÍTULO</b><span>DESCRIPCIÓN</span></a>`, en este orden:

| Título | Destino | Descripción |
|---|---|---|
| Me han encargado una mejora | `paso-recoger-contexto` | Cuenta lo que sabes y CoraLEAN lo ordena y te dice qué falta. |
| Es la primera reunión del grupo | `paso-preparar-lanzamiento` | Prepara el guion, las preguntas y la convocatoria. |
| Tengo una reunión pronto | `paso-preparar-sesion` | Guion minuto a minuto para cualquier sesión de trabajo. |
| Tengo notas o la grabación de una reunión | `paso-procesar-sesion` | Saca el acta, el correo para el grupo y lo que hay que guardar. |
| Sabemos el problema, pero no sus causas | `momento-porque` | Separa hipótesis de causas comprobadas antes de proponer cambios. |
| Tengo varias ideas y no sé cuál probar | `momento-eligiendo` | Compara las ideas con criterios y elige una prueba pequeña. |
| Vuelvo a un proyecto que ya empecé | `paso-donde-estamos` | Retoma desde la ficha sin volver a contarlo todo. |
| No sé por dónde seguir | `paso-donde-estamos` | CoraLEAN revisa contigo dónde estáis y qué toca. |

4. Debajo: `<p><a href="ver.html#ejemplos/cerrar-sesion--ejemplo-cuaderno">Ver un proyecto de ejemplo de principio a fin →</a></p>`

### 3.6 Mensaje y cabecera del generador (UX-01)
- `componer(p)` ya usa `plat().prefijo(p.skill)`, y con `sinconfig` el prefijo no nombra ninguna skill. No hay que cambiarlo.
- En `.gen-head`, si `estado.plataforma === "sinconfig"`, el `<span>` muestra: `Sin configurar · <a href="#instalar" style="color:inherit">Configura tu asistente</a> para mejores resultados`. En los demás casos se mantiene el texto actual, que ya incluye el enlace `#instalar`.

### 3.7 Pantalla de actividad (UX-04, UX-06, ACC-01)
En `vistaPaso`:
- **Migas:** elimina `<span class="chip skill">${esc(p.skill)}</span>`. Cambia el texto `En cada sesión` por `Para trabajar`.
- **Nuevo orden de bloques:**
  1. migas;
  2. `h1`;
  3. `p.resumen`;
  4. **el generador** (`section.gen`);
  5. el aviso «Cómo contarlo» (`.callout.voz`);
  6. `<details class="mas" ${abierto}><summary>Por qué, cuándo y qué necesitas</summary>` con dentro, sin cambios, el `.rej-2` («Por qué importa», «Cómo conecta») y el `.rej-3` («Cuándo», «Necesitas», «Recibes»), y `</details>`. `abierto` es `"open"` si `window.matchMedia("(min-width: 1024px)").matches` y `""` en otro caso;
  7. los avisos de ficha, privacidad y consejo;
  8. herramientas, técnicas, plantillas y ejemplos, como ahora.
- **Etiquetas asociadas:** cada control lleva `id="campo-${c.id}"` y su `<label for="campo-${c.id}">`.
- **Nombre técnico,** discreto, justo antes de `.pasonav`: `<p class="nota">Nombre técnico de la skill: <code>${esc(p.skill)}</code></p>`
- **`.pasonav`:** si `p.id !== "donde-estamos"`, añade después del botón de siguiente paso `<a class="btn" href="#paso-donde-estamos">¿No encaja? Decide qué toca</a>`. Si el paso no tiene siguiente, añade el enlace igual.

### 3.8 Vista de momento (UX-06, MET-01)
En `vistaMomento`:
- En cada `.paso-fila`, elimina `<span class="chip skill">${esc(p.skill)}</span>`.
- **Elimina** la tarjeta que dice «Las skills específicas de este momento están en preparación…».
- Si `m.orientacion` existe, muestra después del bloque «Qué hacer con CoraLEAN» (o en su lugar, si no hay pasos):
```html
<section class="card orientacion"><h3>Pide orientación a tu asistente</h3><p>${esc(m.orientacion.texto)}</p>
<pre class="bloque" id="preview-orientacion">${esc(PRE + m.orientacion.mensaje)}</pre>
<div class="enlaces"><button class="btn prim" id="copiar-orientacion">Copiar mensaje</button><span class="ok-copiado" aria-live="polite"></span></div>
<p class="nota">También te ayudan: <a href="#paso-elegir-herramienta">Elige la herramienta</a> · <a href="#paso-preparar-sesion">Prepara la siguiente sesión</a> · <a href="#paso-procesar-sesion">Procesa la reunión</a></p></section>
```
  Aquí `PRE = estado.plataforma === "sinconfig" ? plat().prefijo() : ""`. El botón copia el texto de `#preview-orientacion` con la función `copiar()` existente.
- Si no hay pasos, el título «Qué hacer con CoraLEAN» se mantiene y debajo va directamente la orientación.

### 3.9 Menú lateral plegable (UX-05)
Reescribe `pintarNav`:
- Arriba, sin grupo: `Inicio` (`#inicio`) y `¿Qué hago ahora?` (`#empezar`).
- **Cuatro grupos**, cada uno como `<details class="nav-grupo" data-grupo="ID" ${open ? "open" : ""}><summary class="nav-g">TÍTULO</summary>…</details>`:
  - `recorrido`, «El recorrido»: los momentos, con sus pasos desplegados bajo el momento activo, como ahora;
  - `trabajar`, «Para trabajar»: los pasos de `G.cadaSesion`;
  - `biblioteca`, «Biblioteca»: herramientas, técnicas, convenciones, plantillas y bibliografía;
  - `proyecto`, «Tu proyecto»: memoria del proyecto y configuración.
- **Regla de apertura:** el grupo está abierto si contiene el elemento activo, **o** si el usuario lo abrió y no lo ha cerrado. Guarda en memoria (`estado.navAbierto`, un objeto) lo que el usuario abre y cierra, escuchando el evento `toggle` de cada `details`. Por defecto, sin preferencia guardada, están abiertos `recorrido` y `trabajar`.
- **Estilos** en `estilo.css`:
```css
.nav-grupo > summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.nav-grupo > summary::-webkit-details-marker { display: none; }
.nav-grupo > summary::after { content: "▸"; font-size: 11px; transition: transform .15s; }
.nav-grupo[open] > summary::after { transform: rotate(90deg); }
```

### 3.10 Menú móvil accesible (ACC-01)
- Escribe una función `syncInert()`: si `matchMedia("(max-width: 1023px)").matches` y el menú no está abierto, pon el atributo `inert` en `#lateral`; si no, quítalo. Llámala al cargar, dentro de `menu()` y en el evento `change` de esa `matchMedia`.
- **En `menu(abrir)`:**
  - al abrir, enfoca el primer enlace de `#nav`;
  - al cerrar, si el foco estaba dentro de `#lateral`, devuélvelo a `#abrir-menu`.
- **Escape:** un `keydown` en `document` con `Escape` y el menú abierto llama a `menu(false)` y pone el foco en `#abrir-menu`.

### 3.11 Diagramas con descripción accesible (ACC-01)
Todo contenedor `.diag` que envuelve un diagrama lleva `role="img"` y `aria-label`:
- en `miniHerr`, en la rejilla de `vistaHerramientas` (`.herr-c .diag`) y en la cabecera de `vistaHerramienta`: `aria-label="Diagrama: ${esc(h.nombre)}. ${esc(h.pregunta)}"`;
- en el ejemplo de `vistaHerramienta`: `aria-label="Ejemplo: ${esc(h.ejemplo.texto)}"`.

### 3.12 Foco al cambiar de vista (ACC-01)
En `render()`, tras pintar, si **no** es la primera ejecución, `app.focus({ preventScroll: true })` antes de `window.scrollTo(0, 0)`. Usa una variable `let primeraVez = true` que pasa a `false` tras el primer `render()`.

### 3.13 Mapa del razonamiento en móvil (UX-07)
`mapaRazonamiento()` devuelve el SVG actual dentro de `.mapa-razon`, como ahora, **más**, a continuación:
```html
<ol class="mapa-lista">${G.areas.map((a, i) => `<li><a href="#momento-${(momento que contiene el área).id}"><b>${i + 1}. ${esc(a.nombre)}</b><span>${esc(a.pregunta)}</span></a></li>`).join("")}</ol>
<p class="nota mapa-nota">No es una ruta: puedes volver a cualquier pregunta cuando aparezca información nueva.</p>
```
Para el momento que contiene cada área, usa la misma lógica que ya usa el SVG.

Estilos en `estilo.css`:
```css
.mapa-lista { display: none; list-style: none; padding: 0; margin: 0; gap: 8px; }
.mapa-lista a { display: grid; gap: 2px; padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--panel); color: var(--ink); text-decoration: none; }
.mapa-lista span { color: var(--ink-2); font-size: 14px; }
.mapa-nota { display: none; }
@media (max-width: 700px) { .mapa-razon { display: none; } .mapa-lista { display: grid; } .mapa-nota { display: block; } }
```
Y en `.mapa-lista li + li` añade una flecha visual: `.mapa-lista li + li::before { content: "↓"; display: block; text-align: center; color: var(--acc); font-size: 13px; }`

### 3.14 Página de memoria (MEM-01, MEM-02)
En `vistaFicha`:
- En la tabla «Las tres capas», en la fila **Cuaderno**, columna «Cómo se actualiza», pon:
  `Las entradas son historia: no se modifican; si algo cambia, se añade una entrada nueva. El índice y las decisiones vigentes son vistas derivadas que se regeneran a partir de las entradas.`
- Sustituye la tarjeta «Cómo se actualiza el cuaderno según tu entorno» por:
```html
<div class="card"><h3>Cómo se guarda según lo que pueda hacer tu asistente</h3>
<p><b>Compruébalo una vez:</b> pídele que añada una línea de prueba al final del cuaderno y mira si el archivo cambia de verdad. No lo des por hecho: depende de tu cuenta, tu aplicación y sus permisos.</p>
<ul><li><b>Si edita el archivo:</b> añade la entrada nueva al final y regenera el índice y las decisiones vigentes. Revisa que lo ha hecho.</li>
<li><b>Si solo puede crear un archivo nuevo:</b> te da el cuaderno completo con una comprobación («tenía 12 entradas y ahora tiene 13»). Si el número no cuadra, se ha perdido algo. Sustituye el archivo en la base de conocimiento (descargar o «añadir a la fuente») y borra el anterior.</li>
<li><b>Si solo puede darte texto:</b> te da la entrada nueva para pegarla al final de tu cuaderno; si el cuaderno es muy largo, te sugiere archivar lo antiguo.</li></ul>
<p class="nota">En los entornos manuales el cuaderno no se guarda solo: hay que guardarlo al cerrar cada sesión.</p></div>
```

## Bloque 4 — Skills, comunes y plan B (MEM-01, MEM-02, semáforo)

### 4.1 `comun/plantilla-cuaderno.md`, con este contenido completo
```markdown
# Cuaderno del proyecto — [nombre del proyecto]

> Línea evolutiva del proyecto. Tiene dos partes: la **historia** (las entradas, que no se modifican ni se resumen; si algo cambia, se añade una entrada nueva) y unas **vistas derivadas** arriba (cabecera, índice y decisiones vigentes), que se regeneran a partir de las entradas. La foto de hoy está en la ficha del proyecto.

## Vistas derivadas (se regeneran a partir de las entradas)

**Última actualización:** (fecha) · **Número de entradas:** 0 · **Ficha vigente:** v[n] ([fecha])

### Índice
| Nº | Fecha | Tipo de sesión | En una línea |
|---|---|---|---|
| 1 | | | |

### Decisiones vigentes
| Fecha | Decisión | Condición | Sustituye a |
|---|---|---|---|

### Archivo
(Cuadernos archivados, con una línea de resumen cada uno. Ejemplo: `cuaderno_2026-T4.md` — entradas 1–14: arranque, entrevistas y validación de la situación de partida.)

## Historia (entradas inmutables)

<!-- Cada entrada nueva va al final, con la plantilla de entrada. Las entradas anteriores no se modifican. -->
```

### 4.2 `skills/cerrar-sesion/ejemplos/ejemplo-cuaderno.md`
- Sustituye la línea 3 (la cita) por:
  `> Caso **ficticio** (Área de Salud del Valle). Las entradas de la historia no se modifican; la cabecera, el índice y las decisiones vigentes son vistas derivadas que se regeneran a partir de ellas.`
- Inserta `## Vistas derivadas (se regeneran a partir de las entradas)` justo antes de la línea `**Última actualización:**`.
- Cambia `## Índice`, `## Decisiones vigentes` y `## Archivo` por `### Índice`, `### Decisiones vigentes` y `### Archivo`.
- Cambia `## Línea evolutiva` por `## Historia (entradas inmutables)`.
- Las entradas siguen con `### 1.`, `### 2.`, `### 3.`. No cambies su contenido.

### 4.3 `comun/registro-proyecto.md`
- En la tabla de las tres capas, fila **Cuaderno del proyecto**, última columna:
  `La **historia** (entradas) no se modifica ni se resume: se añaden entradas nuevas. La cabecera, el índice y las decisiones vigentes son **vistas derivadas** que se regeneran a partir de las entradas`
- Sustituye toda la sección `## Cómo se actualiza el cuaderno` (desde ese título hasta antes de `## Versión para consultar`) por:
```markdown
## Cómo se actualiza el cuaderno

La historia no se reescribe: cada sesión añade una entrada al final. Las vistas derivadas (cabecera, índice, decisiones vigentes) se regeneran a partir de las entradas. Cómo se hace depende de lo que **pueda hacer de verdad** tu asistente. Compruébalo una vez: pide que añada una línea de prueba al final del cuaderno y mira si el archivo cambia.

| Lo que puede hacer el asistente | Qué hace CoraLEAN |
|---|---|
| **Edita el archivo** (comprobado) | Añade la entrada al final, regenera las vistas derivadas y lo dice. No toca las entradas anteriores |
| **Crea un archivo nuevo, pero no sustituye el existente** | Entrega el cuaderno completo con la entrada añadida, y la **comprobación**: «el cuaderno tenía N entradas y ahora tiene N+1». Si el número no cuadra, se ha perdido algo. El usuario lo sustituye en la base de conocimiento (descargar o «añadir a la fuente») y borra la versión anterior |
| **Solo da texto** (o el cuaderno es muy largo) | Entrega **solo la entrada nueva**, indica dónde pegarla y, si el cuaderno es largo, sugiere archivar lo antiguo (`cuaderno_AAAA-Tn.md`) dejando un resumen en el cuaderno vivo |
```
- En la tabla «Dónde vive el registro según el entorno», sustituye la fila que empieza por `| OpenCode, Work, Cowork |` por:
  `| Entornos que trabajan con carpetas (OpenCode y, si lo has comprobado, Work o Cowork) | Archivos en la carpeta del proyecto; el asistente puede actualizar el cuaderno si edita archivos (compruébalo) | La propia carpeta del proyecto con la estructura de arriba |`

### 4.4 `comun/reglas-comunes.md`
Sustituye la viñeta que empieza por `Además de la ficha existe el **cuaderno del proyecto**` por:
`   - Además de la ficha existe el **cuaderno del proyecto** (un solo archivo). Sus **entradas son historia: nunca las resumas ni las modifiques**; si algo cambia, añade una entrada nueva. La cabecera, el índice y las decisiones vigentes son vistas derivadas que se regeneran a partir de las entradas. No des por hecho que puedes editar archivos: comprueba qué permite el entorno.`

### 4.5 `skills/cerrar-sesion/SKILL.md`
- En el paso 5, sustituye la viñeta que empieza por `- **Si puedes editar archivos** (Work, Cowork, OpenCode, agentes de Copilot)` por:
  `   - **Si has comprobado que puedes editar el archivo:** añade la entrada al **final** del cuaderno, regenera las vistas derivadas (cabecera con fecha y número de entradas, índice, decisiones vigentes) y dilo. No modifiques las entradas anteriores. Si no sabes si puedes editarlo, no lo supongas: usa uno de los modos siguientes.`
- En el mismo paso, cambia `- **Nunca resumas ni reescribas el historial.**` por `- **Nunca resumas ni modifiques las entradas anteriores:** si algo cambió, se registra en una entrada nueva.`
- En el paso 9, sustituye `   - **OpenCode, Work, Cowork:** se guardan en la carpeta del proyecto; el cuaderno se actualiza solo.` por:
  `   - **Entornos con carpeta del proyecto** (OpenCode y, si lo has comprobado, Work o Cowork): se guardan en la carpeta; si el asistente edita archivos, comprueba que el cuaderno ha cambiado.`

### 4.6 `proyecto/INSTRUCCIONES.md`
En la regla 1, cambia `el cuaderno (la línea evolutiva, un solo archivo donde solo se añade al final: nunca resumas ni reescribas su historial)` por `el cuaderno (la línea evolutiva, un solo archivo: sus entradas no se modifican ni se resumen, y la cabecera, el índice y las decisiones vigentes se regeneran a partir de ellas)`. Si el texto no coincide exactamente, adapta solo esa parte de la regla con el mismo significado.

### 4.7 Semáforo en las skills
- `skills/preparar-sesion/recursos/tecnicas-facilitacion.md`, técnica del semáforo: cambia `Solo se debate lo ámbar y lo rojo.` por `Se debate sobre todo lo ámbar y lo rojo; lo verde se da por bueno salvo que aparezca información nueva.`
- `skills/preparar-sesion/recursos/guiones-tipo.md`, guion A: cambia `Solo se debaten ámbar y rojo:` por `Se debate sobre todo lo ámbar y lo rojo:`

## Bloque 5 — Documentación

- **`README.md`:** cambia el título a `# CoraLEAN — skills y guía (v0.6, experimental en validación)`.
- **`REGISTRO_MEJORAS.md`:** añade al final:
```markdown

## Estado de implementación — v0.6 (auditoría UX)

| ID | Estado |
|---|---|
| UX-01 | Plataforma «sin configurar» por defecto; pantalla «¿Qué necesitas hacer ahora?» con primera vez / ya preparado y situaciones |
| UX-02 | Selector de asistente y pestañas de configuración sincronizados en ambos sentidos |
| UX-03, UX-04 | Acciones de portada antes de los pilares; generador antes de las explicaciones (plegables en móvil); alternativa «¿No encaja?» |
| UX-05, UX-06 | Menú con grupos plegables («Para trabajar»); nombres técnicos de skill fuera de cabeceras |
| UX-07 | Mapa de las siete preguntas en lista vertical en móvil |
| MEM-01, MEM-02 | Cuaderno: historia inmutable y vistas derivadas regenerables; automatización solo si se comprueba la capacidad del entorno |
| MET-01 | Mensaje de orientación en los momentos sin actividades específicas |
| ACC-01 | Etiquetas asociadas, menú móvil inert y Escape, pestañas con teclado, foco al cambiar de vista, diagramas con descripción |
| Pendiente | MEM-03 (prueba real de cerrar y retomar en dos sesiones) y Plan B (skills de causas, priorización y prueba) |
```

## Verificación final
1. `tests/ejecutar.sh` → `TODO CORRECTO`.
2. Revisa a mano en el navegador, si puedes, `#inicio`, `#empezar` y `#paso-recoger-contexto` a 390 px de ancho.
3. Informa de los archivos modificados.
