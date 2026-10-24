(function () {
  const G = window.GUIA, D = window.DIAGRAMAS;
  const app = document.getElementById("app");
  const CLAVE = "coralean-guia-v1";

  // Solo se guarda la plataforma, la última vista y el nombre del proyecto.
  const guardado = (() => { try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; } })();
  const estado = { plataforma: guardado.plataforma || "chatgpt", ultima: guardado.ultima || "", proyecto: guardado.proyecto || "", valores: {}, filtro: "todas", tab: "chatgpt" };
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify({ plataforma: estado.plataforma, ultima: estado.ultima, proyecto: estado.proyecto })); } catch (e) { /* sin almacenamiento */ } };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const paso = (id) => G.pasos.find((p) => p.id === id);
  const momento = (id) => G.momentos.find((m) => m.id === id);
  const herr = (id) => G.herramientas.find((h) => h.id === id);
  const area = (id) => G.areas.find((a) => a.id === id);
  const plat = () => G.plataformas.find((p) => p.id === estado.plataforma) || G.plataformas[0];
  const diag = (id) => (D[id] ? D[id]() : "");
  const pasoDeSkill = (s) => G.pasos.find((p) => p.skill === s);

  // ---------- Utilidades ----------
  function copiar(texto, aviso, nodo) {
    const ok = () => { if (aviso) { aviso.textContent = "Copiado"; setTimeout(() => (aviso.textContent = ""), 2200); } };
    const alt = () => {
      if (nodo) { const r = document.createRange(); r.selectNodeContents(nodo); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      if (aviso) aviso.textContent = "Selecciónalo y cópialo (Ctrl+C)";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, alt); else alt();
  }
  const enlacePlantilla = (id) => `<span class="chip">${esc(G.plantillas[id] || id)} · <a href="ver.html#plantillas/${id}">ver</a> · <a href="recursos/plantillas/${id}.md" download>descargar</a></span>`;
  const enlaceEjemplo = (id) => `<a class="chip" href="ver.html#ejemplos/${id}">${esc(id.split("--")[1].replace(/^ejemplo-/, "").replace(/-/g, " "))}</a>`;
  const fuente = (k) => G.fuentes[k] ? `<a class="chip" href="${G.fuentes[k].url}" target="_blank" rel="noopener">Para profundizar: ${esc(G.fuentes[k].corto)} ↗</a>` : "";
  const miniHerr = (h) => `<a class="mini" href="#herramienta-${h.id}"><div class="diag">${diag(h.id)}</div><b>${esc(h.nombre)}</b><span>${esc(h.pregunta)}</span></a>`;
  const leyenda = () => `<div class="leyenda">${G.colores.map((c) => `<div class="posit" style="background:${c.color}"><b>${esc(c.nombre)}</b>${esc(c.uso)}</div>`).join("")}</div>`;

  // ---------- Navegación lateral ----------
  const sel = document.getElementById("plataforma");
  sel.innerHTML = G.plataformas.map((p) => `<option value="${p.id}">${esc(p.nombre)}</option>`).join("");
  sel.value = estado.plataforma;
  sel.addEventListener("change", () => { estado.plataforma = sel.value; guardar(); render(); });

  function pintarNav(actual, momentoActual) {
    const it = (href, txt, act) => `<a class="nav-i" href="#${href}" ${act ? 'aria-current="page"' : ""}><span class="pt"></span>${esc(txt)}</a>`;
    let h = it("inicio", "Inicio", actual === "inicio");
    h += `<div class="nav-g">El recorrido</div>`;
    G.momentos.forEach((m) => {
      h += it(`momento-${m.id}`, m.nombre, actual === `momento-${m.id}`);
      if (m.id === momentoActual && m.pasos.length) h += `<div class="nav-sub">${m.pasos.map((pid) => it(`paso-${pid}`, paso(pid).titulo, actual === `paso-${pid}`)).join("")}</div>`;
    });
    h += `<div class="nav-g">En cada sesión</div>` + G.cadaSesion.map((pid) => it(`paso-${pid}`, paso(pid).titulo, actual === `paso-${pid}`)).join("");
    h += `<div class="nav-g">Biblioteca</div>` + it("herramientas", "Herramientas Lean", actual.startsWith("herramienta")) + it("tecnicas", "Técnicas de facilitación", actual === "tecnicas") + it("convenciones", "Convenciones gráficas", actual === "convenciones") + it("plantillas", "Plantillas", actual === "plantillas") + it("bibliografia", "Bibliografía y fuentes", actual === "bibliografia");
    h += `<div class="nav-g">Tu proyecto</div>` + it("ficha", "La memoria del proyecto", actual === "ficha") + it("instalar", "Configura tu asistente", actual === "instalar");
    document.getElementById("nav").innerHTML = h;
  }

  const lateral = document.getElementById("lateral"), velo = document.getElementById("velo"), btnMenu = document.getElementById("abrir-menu");
  const menu = (abrir) => { lateral.classList.toggle("abierto", abrir); velo.hidden = !abrir; btnMenu.setAttribute("aria-expanded", String(abrir)); };
  btnMenu.addEventListener("click", () => menu(!lateral.classList.contains("abierto")));
  velo.addEventListener("click", () => menu(false));
  lateral.addEventListener("click", (e) => { if (e.target.closest("a")) menu(false); });

  // ---------- Mapa del razonamiento ----------
  function partir(s, n) {
    const out = []; let l = "";
    s.split(" ").forEach((w) => { if ((l + " " + w).trim().length > n) { out.push(l.trim()); l = w; } else l += " " + w; });
    if (l.trim()) out.push(l.trim());
    return out;
  }
  function mapaRazonamiento() {
    const A = G.areas, W = 960;
    const pos = { problema: [30, 30, 250], situacion: [355, 30, 250], objetivo: [680, 30, 250], causas: [725, 210, 215], cambio: [490, 210, 215], prueba: [255, 210, 215], sostener: [20, 210, 215] };
    let s = `<svg viewBox="0 0 ${W} 360" role="img" aria-label="Las siete preguntas del proyecto y cómo se conectan" xmlns="http://www.w3.org/2000/svg"><defs>
      <marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="r-head"/></marker>
      <marker id="fw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="r-head-w"/></marker></defs>`;
    A.forEach((a, i) => {
      const [x, y, w] = pos[a.id];
      const lineas = partir(a.pregunta, w > 230 ? 30 : 25);
      s += `<a href="#momento-${G.momentos.find((m) => m.areas.includes(a.id)).id}"><rect x="${x}" y="${y}" width="${w}" height="96" rx="12" class="r-area"/>
        <text x="${x + 14}" y="${y + 28}" class="r-area-t" ${(a.nombre.length + 3) * 8.6 > w - 26 ? `textLength="${w - 26}" lengthAdjust="spacingAndGlyphs"` : ""}>${i + 1}. ${esc(a.nombre)}</text>
        ${lineas.slice(0, 3).map((l, j) => `<text x="${x + 14}" y="${y + 52 + j * 17}" class="r-area-p">${esc(l)}</text>`).join("")}</a>`;
    });
    const fl = (d) => `<path d="${d}" class="r-flecha" marker-end="url(#fa)"/>`;
    s += fl("M280 76 L351 76") + fl("M605 76 L676 76") + fl("M832 128 L832 206") + fl("M725 256 L709 256") + fl("M490 256 L474 256") + fl("M255 256 L239 256");
    s += `<path d="M362 210 C 362 170, 470 170, 470 126" class="r-vuelta" marker-end="url(#fw)"/><text x="386" y="164" class="r-vuelta-t">una prueba descubre algo nuevo</text>`;
    s += `<path d="M110 210 C 110 170, 150 170, 150 126" class="r-vuelta" marker-end="url(#fw)"/><text x="132" y="164" class="r-vuelta-t">lo aprendido abre otro ciclo</text>`;
    s += `<text x="480" y="340" text-anchor="middle" class="r-area-p">Las flechas muestran el recorrido habitual. Las discontinuas, que volver atrás es normal cuando aparece información nueva.</text></svg>`;
    return `<div class="mapa-razon">${s}</div>`;
  }

  // ---------- Vistas ----------
  function vistaInicio() {
    const ult = estado.ultima && estado.ultima !== "inicio" ? estado.ultima : "";
    app.innerHTML = `<div class="ancho">
      <section class="hero">
        <div class="etq">Proyectos de mejora sanitaria</div>
        <h1>CoraLEAN</h1>
        <p class="lema">Te acompaña a liderar tu proyecto de mejora y a aprender a hacerlo: a pensar el problema, preparar y conducir las reuniones y no perder el hilo. Tú decides; CoraLEAN pregunta, ordena y te explica por qué.</p>
        <div class="pilares">
          <div class="pilar"><b>Pensar el problema</b><span>Te ayuda a distinguir lo que sabes de lo que supones y a decidir qué toca hacer antes de saltar a las soluciones.</span></div>
          <div class="pilar"><b>Aprender haciendo</b><span>Primero propones tú; después CoraLEAN cuestiona y completa, y te explica el porqué mientras avanzas.</span></div>
          <div class="pilar"><b>No perder el hilo</b><span>La ficha del proyecto conserva decisiones, datos y pendientes, y se convierte en actas e informes de seguimiento.</span></div>
        </div>
        <div class="ctas"><a class="btn prim" href="#paso-recoger-contexto">Empezar un proyecto</a><a class="btn" href="#paso-donde-estamos">Retomar un proyecto</a><a class="btn" href="#instalar">Configurar mi asistente</a>${ult ? `<a class="btn" href="#${esc(ult)}">Continuar donde lo dejé →</a>` : ""}</div>
      </section>

      <section class="rej-2">
        <div class="card"><h3>Para quién es</h3><p>Para profesionales sanitarios que lideran o participan en un proyecto de mejora (un circuito, la adaptación de un PAI, un problema de coordinación) y quieren hacerlo con método, aunque no tengan experiencia en Lean.</p></div>
        <div class="card"><h3>Qué no es</h3><p>No es un generador de documentos ni hace el proyecto por ti: no te va a escribir el A3. Tampoco sustituye a tu organización ni a la mentoría: te acompaña mientras aprendes a hacerlo con menos ayuda.</p></div>
      </section>

      <section class="bloque">
        <h2>Cómo funciona</h2>
        <div class="funciona">
          <div class="card"><b>Configura tu asistente una vez</b><p>Instala las skills de CoraLEAN en ChatGPT, Claude u OpenCode, o crea un proyecto con sus instrucciones. <a href="#instalar">Cómo hacerlo</a></p></div>
          <div class="card"><b>Trabaja hablando con tu asistente</b><p>El trabajo real ocurre en tu IA. Esta guía te dice qué hacer en cada momento y te prepara el mensaje. Activa el micrófono y cuéntalo con tus palabras.</p></div>
          <div class="card"><b>Guarda la memoria al terminar</b><p>Cierra cada sesión con CoraLEAN: te da la ficha actualizada y añade la entrada al cuaderno. La próxima vez retomas desde ella sin volver a contarlo todo. <a href="#ficha">La memoria del proyecto</a></p></div>
        </div>
      </section>

      <section class="bloque">
        <h2>El mapa de un proyecto de mejora</h2>
        <p class="intro" style="margin:0;color:var(--ink-2);max-width:75ch">Un proyecto de mejora responde a siete preguntas. No se recorren en orden estricto: varias pueden estar abiertas a la vez, y lo que descubres al probar un cambio puede obligarte a volver a mirar cómo funciona el proceso. Es un mapa para orientarte, no una ruta obligatoria.</p>
        <div class="card">${mapaRazonamiento()}</div>
      </section>

      <section class="bloque">
        <h2>¿Dónde estoy?</h2>
        <p style="margin:0;color:var(--ink-2);max-width:75ch">En cada momento del proyecto hay una decisión que toca. Elige el tuyo para ver qué hacer, por qué importa y con qué herramientas. Si no lo sabes, empieza por <a href="#paso-donde-estamos">Retoma el proyecto</a>.</p>
        <div class="momentos-tira">${G.momentos.map((m) => `<a class="momento-c" href="#momento-${m.id}"><b>${esc(m.nombre)}</b><span>${esc(m.pregunta)}</span></a>`).join("")}</div>
      </section>

      <section class="rej-2">
        <div class="card"><h3>Cómo navegar</h3><ul>
          <li><b>El recorrido:</b> los seis momentos del proyecto y lo que se hace en cada uno.</li>
          <li><b>En cada sesión:</b> lo que harás siempre: retomar, preparar, procesar la reunión, elegir herramienta y cerrar.</li>
          <li><b>Biblioteca:</b> herramientas Lean, técnicas de facilitación, plantillas y bibliografía, para consultar cuando las necesites.</li>
          <li><b>Abajo en el menú lateral:</b> elige dónde usas CoraLEAN y los mensajes se adaptan.</li></ul></div>
        <div class="card"><h3>Qué puedes esperar</h3><ul>
          <li>Te preguntará antes de proponer, y te pedirá tu idea primero.</li>
          <li>Separará hechos, supuestos y opiniones, y te avisará de lo dudoso.</li>
          <li>Puede equivocarse: revisa lo que propone. Las decisiones son tuyas y del grupo.</li>
          <li><b>Nunca pongas datos de pacientes</b>. En entrevistas, usa roles en lugar de nombres.</li></ul></div>
      </section>
    </div>`;
  }

  function vistaMomento(id) {
    const m = momento(id) || G.momentos[0];
    const i = G.momentos.indexOf(m);
    const pasos = m.pasos.map(paso);
    app.innerHTML = `<div class="ancho">
      <div class="miga"><a href="#inicio">Inicio</a><span>·</span><span>Momento del proyecto</span></div>
      <div class="intro"><div class="etq">Momento</div><h1>${esc(m.nombre)}</h1><p><b>${esc(m.pregunta)}</b></p></div>
      <div class="callout tip"><span class="ico">?</span><div><b>Por qué importa</b>${esc(m.porque)}</div></div>
      <div class="rej-2">
        <div class="card"><h3>Preguntas del proyecto que trabajas aquí</h3><ul>${m.areas.map((a) => `<li><b>${esc(area(a).nombre)}:</b> ${esc(area(a).pregunta)}</li>`).join("")}</ul></div>
        <div class="card"><h3>Suele estar listo para avanzar cuando…</h3><ul>${m.listo.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p class="nota" style="margin-top:8px">Es una orientación, no un examen. Y si aparece algo nuevo, volver a un momento anterior es normal.</p></div>
      </div>
      <div><div class="sec-t">Qué hacer con CoraLEAN</div>
        ${pasos.length ? `<div class="lista-pasos">${pasos.map((p) => `<a class="paso-fila" href="#paso-${p.id}"><b>${esc(p.titulo)}</b><span>${esc(p.resumen)}</span><span class="chip skill">${esc(p.skill)}</span></a>`).join("")}</div>`
          : `<div class="card"><p><b>Las skills específicas de este momento están en preparación.</b> Mientras tanto, CoraLEAN te acompaña igual con:</p><div class="enlaces"><a class="chip skill" href="#paso-elegir-herramienta">elegir-herramienta</a><a class="chip skill" href="#paso-preparar-sesion">preparar-sesion</a><a class="chip skill" href="#paso-procesar-sesion">procesar-reunion</a></div></div>`}
      </div>
      <div><div class="sec-t">Herramientas habituales en este momento</div><div class="mini-grid">${m.herramientas.map(herr).filter(Boolean).map(miniHerr).join("")}</div></div>
      <div class="pasonav">${i > 0 ? `<a class="btn" href="#momento-${G.momentos[i - 1].id}">← ${esc(G.momentos[i - 1].nombre)}</a>` : "<span></span>"}${i < G.momentos.length - 1 ? `<a class="btn" href="#momento-${G.momentos[i + 1].id}">${esc(G.momentos[i + 1].nombre)} →</a>` : ""}</div>
    </div>`;
  }

  function componer(p) {
    const vals = estado.valores[p.id] || {};
    let txt = p.plantilla, html = esc(p.plantilla);
    (p.campos || []).forEach((c) => {
      const v = (vals[c.id] ?? (c.recordar ? estado.proyecto : "")) || "";
      const marca = `[${c.etiqueta.toLowerCase()}]`;
      txt = txt.split(`{${c.id}}`).join(v || marca);
      html = html.split(`{${c.id}}`).join(v ? esc(v) : `<span class="hueco">${esc(marca)}</span>`);
    });
    if (p.ficha) { const f = "\n\n(Usa la ficha del proyecto: está en los archivos del proyecto o te la adjunto.)"; txt += f; html += esc(f); }
    const pre = plat().prefijo(p.skill);
    return { txt: pre + txt, html: esc(pre) + html };
  }

  function vistaPaso(id) {
    const p = paso(id) || G.pasos[0];
    const m = p.momento ? momento(p.momento) : null;
    const campos = (p.campos || []).map((c) => {
      const v = (estado.valores[p.id] || {})[c.id] ?? (c.recordar ? estado.proyecto : "");
      const ctl = c.tipo === "select"
        ? `<select data-campo="${c.id}">${c.opciones.map((o) => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`
        : `<input data-campo="${c.id}" value="${esc(v)}" placeholder="${esc(c.ej || "")}">`;
      return `<div class="campo"><label>${esc(c.etiqueta)}</label>${ctl}</div>`;
    }).join("");
    const despues = [...(p.despues || [])];
    if (p.ficha) despues.push("Si tu ficha no está en los archivos del proyecto, adjúntala");
    const herrs = (p.herramientas || []).map(herr).filter(Boolean).map(miniHerr).join("");
    const tecs = (p.tecnicas || []).map((t) => G.tecnicas.find((x) => x.id === t)).filter(Boolean).map((t) => `<a class="chip" href="#tecnicas">${esc(t.nombre)}</a>`).join(" ");
    const sig = p.siguiente ? paso(p.siguiente) : null;

    app.innerHTML = `<div class="ancho paso">
      <div class="miga"><a href="#inicio">Inicio</a><span>·</span>${m ? `<a href="#momento-${m.id}">${esc(m.nombre)}</a>` : "<span>En cada sesión</span>"}<span class="chip skill">${esc(p.skill)}</span></div>
      <h1>${esc(p.titulo)}</h1>
      <p class="resumen">${esc(p.resumen)}</p>
      <div class="rej-2">
        <div class="card"><h3>Por qué importa</h3><p>${esc(p.porque)}</p></div>
        <div class="card"><h3>Cómo conecta con el resto</h3><p>${esc(p.conecta)}</p></div>
      </div>
      <div class="rej-3">
        <div class="card"><h3>Cuándo</h3><p>${esc(p.cuando)}</p></div>
        <div class="card"><h3>Necesitas</h3><ul>${p.necesitas.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="card"><h3>Recibes</h3><ul>${p.recibes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
      <section class="gen" aria-label="Mensaje para tu asistente">
        <div class="gen-head"><b>Empieza con este mensaje</b><span>${esc(plat().nombre)} · ${esc(plat().nota)} <a href="#instalar" style="color:inherit">¿Aún no lo tienes?</a></span></div>
        <div class="gen-body">
          <div class="gen-campos">${campos || '<p class="nota">Este paso no necesita datos: copia el mensaje tal cual.</p>'}
            ${despues.length ? `<div><div class="sec-t">Después de pegarlo</div><ul class="despues">${despues.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}</div>
          <div class="gen-preview"><pre id="preview"></pre>
            <div class="enlaces"><button class="btn prim" id="copiar">Copiar mensaje</button><span class="ok-copiado" id="aviso" aria-live="polite"></span></div>
            <span class="nota">Pégalo en tu asistente. Lo marcado en amarillo está por completar.</span></div>
        </div>
      </section>
      <div class="callout voz"><span class="ico"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></span><div><b>Cómo contarlo</b>${esc(G.aportar)}</div></div>
      ${p.ficha ? `<div class="callout ficha"><span class="ico">F</span><div><b>La ficha es la memoria del proyecto.</b> CoraLEAN la usa para no hacerte repetir nada. Al terminar, cierra la sesión y guarda la versión nueva. <a href="#ficha">Más sobre la ficha</a></div></div>` : ""}
      ${p.privacidad ? `<div class="callout priv"><span class="ico">!</span><div><b>Privacidad.</b> Pide consentimiento antes de grabar. Antes de pegar una transcripción en una IA no aprobada por tu centro, cambia los nombres por roles y quita cualquier dato de pacientes.</div></div>` : ""}
      <div class="callout tip"><span class="ico">✓</span><div><b>Consejo</b>${esc(p.consejo)}</div></div>
      ${herrs ? `<div><div class="sec-t">Herramientas de este paso</div><div class="mini-grid">${herrs}</div></div>` : ""}
      ${tecs ? `<div><div class="sec-t">Técnicas que usarás</div><div class="enlaces">${tecs}</div></div>` : ""}
      ${(p.plantillas || []).length ? `<div><div class="sec-t">Plantillas</div><div class="enlaces">${p.plantillas.map(enlacePlantilla).join(" ")}</div><p class="nota" style="margin-top:6px">Si tienes las skills instaladas, CoraLEAN ya las usa: no hace falta descargarlas.</p></div>` : ""}
      ${(p.ejemplos || []).length ? `<div><div class="sec-t">Ejemplos (caso ficticio)</div><div class="enlaces">${p.ejemplos.map(enlaceEjemplo).join(" ")}</div></div>` : ""}
      <div class="pasonav">${m ? `<a class="btn" href="#momento-${m.id}">← ${esc(m.nombre)}</a>` : `<a class="btn" href="#inicio">← Inicio</a>`}${sig ? `<a class="btn prim" href="#paso-${sig.id}">Lo habitual después: ${esc(sig.titulo)} →</a>` : ""}</div>
    </div>`;

    const pre = document.getElementById("preview");
    const pintar = () => { pre.innerHTML = componer(p).html; };
    pintar();
    app.querySelectorAll("[data-campo]").forEach((el) => {
      const upd = () => {
        const v = (estado.valores[p.id] = estado.valores[p.id] || {});
        v[el.dataset.campo] = el.value;
        const c = p.campos.find((x) => x.id === el.dataset.campo);
        if (c && c.recordar) { estado.proyecto = el.value; guardar(); }
        pintar();
      };
      el.addEventListener("input", upd); el.addEventListener("change", upd);
    });
    document.getElementById("copiar").addEventListener("click", () => copiar(componer(p).txt, document.getElementById("aviso"), pre));
  }

  function vistaHerramientas() {
    const lista = G.herramientas.filter((h) => estado.filtro === "todas" || h.momento === estado.filtro);
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Biblioteca</div><h1>Herramientas Lean y de mejora</h1><p>Una pequeña biblioteca en español para descubrir qué herramientas existen y consultar cómo usarlas cuando las necesites. No tienes que elegirlas tú solo: en cada momento, CoraLEAN te ayuda a identificar la que toca (<a href="#paso-elegir-herramienta">Elige la herramienta</a>). La regla: <b>la más ligera que responda a la pregunta que tiene ahora el proyecto</b>.</p></div>
      <div class="filtros" role="group" aria-label="Filtrar por momento"><button aria-pressed="${estado.filtro === "todas"}" data-m="todas">Todas</button>${G.momentos.map((m) => `<button aria-pressed="${estado.filtro === m.id}" data-m="${m.id}">${esc(m.nombre)}</button>`).join("")}</div>
      <div class="herr-grid">${lista.map((h) => `<a class="card herr-c" href="#herramienta-${h.id}"><div class="diag">${diag(h.id)}</div><div class="etq">${esc(momento(h.momento).nombre)}</div><h2>${esc(h.nombre)}</h2><p>${esc(h.pregunta)}</p></a>`).join("")}</div>
    </div>`;
    app.querySelectorAll(".filtros button").forEach((b) => b.addEventListener("click", () => { estado.filtro = b.dataset.m; vistaHerramientas(); }));
  }

  const figura = (im) => `<figure class="foto"><img src="${im.src}" alt="${esc(im.alt)}" loading="lazy"><figcaption>${esc(im.pie)} <span class="ia">Imagen ilustrativa generada con IA.</span></figcaption></figure>`;

  function vistaHerramienta(id) {
    const h = herr(id);
    if (!h) return vistaHerramientas();
    const m = momento(h.momento);
    const ps = h.skill ? pasoDeSkill(h.skill) : null;
    const otras = G.herramientas.filter((x) => x.momento === h.momento && x.id !== h.id);
    app.innerHTML = `<div class="ancho">
      <div class="miga"><a href="#herramientas">Herramientas</a><span>·</span><a href="#momento-${m.id}">${esc(m.nombre)}</a></div>
      <div class="herr-d">
        <div style="display:grid;gap:12px"><div class="etq">Herramienta</div><h1>${esc(h.nombre)}</h1><p class="preg">${esc(h.pregunta)}</p><p style="margin:0;font-size:17px">${esc(h.teoria)}</p></div>
        <div class="card diag">${diag(h.id)}</div>
      </div>
      <div class="rej-2">
        <div class="card"><h3>Cómo se hace</h3><ol>${h.como.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
        <div style="display:grid;gap:12px;align-content:start">
          <div class="card"><h3>Cuándo no usarla</h3><p>${esc(h.cuandoNo)}</p></div>
          <div class="callout tip"><span class="ico">✓</span><div><b>Consejo práctico</b>${esc(h.consejo)}</div></div>
        </div>
      </div>
      ${h.imagen ? figura(h.imagen) : ""}
      ${h.ejemplo ? `<div class="card"><h3>Ejemplo (caso ficticio)</h3><div class="ejemplo-v"><div class="diag">${diag(h.ejemplo.diag)}</div><p>${esc(h.ejemplo.texto)}</p></div></div>` : ""}
      ${h.colores ? `<p class="nota">Símbolos para dibujarlo: <a href="#convenciones">convenciones gráficas</a>.</p>` : ""}
      ${h.colores ? `<div><div class="sec-t">Código de colores en la pared</div>${leyenda()}<p class="nota" style="margin-top:8px">Pega en un lateral una leyenda con un pósit de cada color y su significado. <a href="imprimir.html#leyenda" target="_blank" rel="noopener">Imprimir la leyenda</a></p></div>` : ""}
      <div><div class="sec-t">Recursos</div><div class="enlaces">
        ${ps ? `<a class="chip skill" href="#paso-${ps.id}">Con CoraLEAN: ${esc(ps.titulo)}</a>` : `<a class="chip skill" href="#paso-elegir-herramienta">Con CoraLEAN: elige y prepara la sesión</a>`}
        ${h.plantilla ? enlacePlantilla(h.plantilla) : ""}
        ${h.imprimir ? `<a class="chip" href="imprimir.html#${h.imprimir}" target="_blank" rel="noopener">Lienzo para imprimir</a>` : ""}
        ${h.fuente ? fuente(h.fuente) : ""}</div></div>
      ${otras.length ? `<div><div class="sec-t">Otras herramientas de este momento</div><div class="mini-grid">${otras.map(miniHerr).join("")}</div></div>` : ""}
    </div>`;
  }

  function vistaTecnicas() {
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Biblioteca</div><h1>Técnicas de facilitación</h1><p>Para que hablen todos, validar rápido, decidir y que cada reunión acabe en acuerdos con nombre. Nunca más «¿alguien tiene algo que decir?».</p></div>
      <div class="card"><h3>Código de colores de los pósits</h3>${leyenda()}<p class="nota" style="margin-top:8px">Pon la leyenda en un lateral de la pared al empezar. <a href="imprimir.html#leyenda" target="_blank" rel="noopener">Imprimir la leyenda</a> · <a href="imprimir.html#parking" target="_blank" rel="noopener">Imprimir la hoja de parking de ideas</a> · <a href="imprimir.html#compromisos" target="_blank" rel="noopener">Imprimir la hoja de compromisos</a></p></div>
      ${figura({ src: "assets/img/mapa-pared.jpg", alt: "Mapa de proceso en la pared con leyenda de colores y parking de ideas", pie: "Así se ve en una sesión: la leyenda a un lado y el parking de ideas en otro." })}
      <div class="tec-grid">${G.tecnicas.map((t) => `<article class="card tec ${t.id === "parking" ? "dest" : ""}" id="t-${t.id}"><h2>${esc(t.nombre)}</h2><p><b>Para qué:</b> ${esc(t.para)}</p><p><b>Cómo:</b> ${esc(t.como)}</p><div class="frase">«${esc(t.frase)}»</div></article>`).join("")}</div>
      <h2 style="font-size:22px">Situaciones difíciles</h2>
      <div class="card tabla-w"><table><thead><tr><th>Situación</th><th>Qué hacer</th></tr></thead><tbody>${G.dificiles.map(([s, q]) => `<tr><td><b>${esc(s)}</b></td><td>${esc(q)}</td></tr>`).join("")}</tbody></table></div>
    </div>`;
  }

  function simbolo(tipo) {
    const s = (b) => `<svg viewBox="0 0 120 64" class="diagrama" style="max-width:150px" aria-hidden="true"><defs><marker id="fc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-head"/></marker></defs>${b}</svg>`;
    const S = {
      inicio: '<rect x="14" y="16" width="92" height="32" rx="16" class="d-acc-soft"/>',
      actividad: '<rect x="14" y="14" width="92" height="36" rx="3" class="d-box"/>',
      decision: '<path d="M60 6 L104 32 L60 58 L16 32 Z" class="d-box"/>',
      espera: '<path d="M60 8 L94 56 L26 56 Z" class="d-box"/><text x="60" y="48" text-anchor="middle" class="d-tb">E</text>',
      documento: '<path d="M22 12 H98 V48 Q79 58 60 48 T22 48 Z" class="d-box"/>',
      sistema: '<ellipse cx="60" cy="16" rx="30" ry="8" class="d-box"/><path d="M30 16 V48 A30 8 0 0 0 90 48 V16" class="d-box"/>',
      flujo: '<line x1="12" y1="32" x2="106" y2="32" class="d-line" marker-end="url(#fc)"/>',
      info: '<line x1="12" y1="32" x2="106" y2="32" class="d-line-dash" marker-end="url(#fc)"/>',
      carril: '<rect x="4" y="12" width="112" height="40" class="d-lane"/><text x="10" y="36" class="d-ts">Atención primaria</text>',
      problema: '<path d="M60 6 L68 24 L88 22 L74 36 L84 54 L60 44 L36 54 L46 36 L32 22 L52 24 Z" class="d-bad-soft"/>',
      demanda: '<rect x="20" y="10" width="80" height="44" class="d-box"/><text x="60" y="30" text-anchor="middle" class="d-ts">Demanda</text><text x="60" y="44" text-anchor="middle" class="d-ts">20 altas/sem</text>',
      paso: '<rect x="24" y="4" width="72" height="24" class="d-box"/><text x="60" y="20" text-anchor="middle" class="d-ts">Paso</text><rect x="24" y="30" width="72" height="30" class="d-soft"/><text x="30" y="42" class="d-ts">TP: 20 min</text><text x="30" y="55" class="d-ts">Personas: 2</text>',
      empujar: '<rect x="12" y="24" width="84" height="16" class="d-soft"/><path d="M20 24 L28 40 M36 24 L44 40 M52 24 L60 40 M68 24 L76 40 M84 24 L92 40" class="d-line"/><path d="M96 18 L110 32 L96 46 Z" class="d-head"/>',
      tirar: '<path d="M90 40 A28 20 0 1 0 34 40" class="d-acc-line" fill="none" marker-end="url(#fc)"/>',
      manual: '<line x1="12" y1="32" x2="106" y2="32" class="d-line" marker-end="url(#fc)"/><text x="60" y="24" text-anchor="middle" class="d-ts">llamada / papel</text>',
      electronica: '<path d="M12 40 L46 40 L60 22 L74 40 L106 40" class="d-line" fill="none" marker-end="url(#fc)"/>',
      tiempo: '<polyline points="8,20 34,20 34,46 52,46 52,20 78,20 78,46 96,46 96,20 114,20" class="d-line"/>',
      mejora: '<path d="M60 4 L66 20 L84 12 L76 28 L96 32 L76 38 L84 54 L66 44 L60 60 L54 44 L36 54 L44 38 L24 32 L44 28 L36 12 L54 20 Z" class="d-ok-soft"/>'
    };
    return s(S[tipo] || "");
  }

  function vistaConvenciones() {
    const fila = ([tipo, nombre, sig]) => `<tr><td style="width:170px">${simbolo(tipo)}</td><td><b>${esc(nombre)}</b></td><td>${esc(sig)}</td></tr>`;
    const proceso = [["inicio", "Inicio / fin", "Dónde empieza y termina el proceso que mapeamos"], ["actividad", "Actividad", "Un paso: verbo + objeto («elaborar informe de alta»)"], ["decision", "Decisión", "Una pregunta con varias salidas («¿paciente complejo?»)"], ["espera", "Espera", "El paciente, un documento o una muestra esperan; anota el tiempo"], ["documento", "Documento", "Un papel o informe que se genera o se pasa"], ["sistema", "Sistema de información", "Donde se registra o se consulta algo"], ["flujo", "Flujo del paciente", "El paciente pasa al paso siguiente"], ["info", "Flujo de información", "La información va de un sitio a otro (interconsulta, informe)"], ["carril", "Carril", "Quién hace los pasos: servicio o nivel asistencial"], ["problema", "Problema", "Dónde falla o se atasca (o pósit rosa)"]];
    const vsm = [["demanda", "Demanda", "Cuántos pacientes llegan, cuándo y de qué tipos"], ["paso", "Paso con su tabla de datos", "Tiempo de proceso, personas que intervienen, % que sale bien a la primera"], ["espera", "Espera o cola", "Dónde se acumulan pacientes o tareas, con el tiempo o el número"], ["empujar", "Empujar", "El paso anterior envía al siguiente esté o no preparado"], ["tirar", "Tirar", "El paso siguiente pide cuando está listo"], ["manual", "Información manual", "Llamada, papel, conversación"], ["electronica", "Información electrónica", "Sistema, correo, alerta"], ["tiempo", "Línea de tiempo", "Arriba, tiempos de proceso; abajo, esperas. Al final, tiempo total y tiempo de valor"], ["mejora", "Oportunidad de mejora", "Dónde el grupo ve una mejora posible (al parking hasta que toque)"]];
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Biblioteca</div><h1>Convenciones gráficas</h1><p>Usar siempre los mismos símbolos permite que cualquiera lea un mapa sin explicaciones. En la pared se pueden imitar con pósits de distinta forma o a mano; lo importante es ponerlos en la leyenda, junto al código de colores.</p></div>
      <div class="card"><h3>Código de colores</h3>${leyenda()}</div>
      <div class="card tabla-w"><h3>Mapa de proceso</h3><table><tbody>${proceso.map(fila).join("")}</tbody></table></div>
      <div class="card tabla-w"><h3>VSM (mapa de flujo de valor)</h3><table><tbody>${vsm.map(fila).join("")}</tbody></table></div>
      <div class="enlaces"><a class="chip" href="#herramienta-carriles">Mapa de proceso por carriles</a><a class="chip" href="#herramienta-vsm">VSM</a><a class="chip" href="imprimir.html#leyenda" target="_blank" rel="noopener">Imprimir la leyenda de colores</a></div>
    </div>`;
  }

  function vistaPlantillas() {
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Biblioteca</div><h1>Plantillas</h1><p>Las plantillas que usa CoraLEAN para fichas, actas, guiones y análisis.</p></div>
      <div class="rej-2">
        <div class="card"><h3>Consultar</h3><p>«Ver» la abre bien presentada para entender qué contiene cada documento.</p></div>
        <div class="card"><h3>Descargar</h3><p>«Descargar» te da el archivo de texto (Markdown) para llevarlo a tu asistente o a otro entorno. <b>Si tienes las skills instaladas no lo necesitas</b>: CoraLEAN ya las usa por su cuenta.</p></div>
      </div>
      <div class="card tabla-w"><table><thead><tr><th>Plantilla</th><th>La usa</th><th></th></tr></thead><tbody>
        ${Object.entries(G.plantillas).map(([id, n]) => {
          const ps = G.pasos.filter((p) => (p.plantillas || []).includes(id));
          return `<tr><td><b>${esc(n)}</b></td><td>${ps.map((p) => `<a href="#paso-${p.id}">${esc(p.titulo)}</a>`).join(" · ") || "—"}</td><td style="white-space:nowrap"><a class="btn small" href="ver.html#plantillas/${id}">Ver</a> <a class="btn small" href="recursos/plantillas/${id}.md" download>Descargar</a></td></tr>`;
        }).join("")}</tbody></table></div>
      <div class="card"><h3>Lienzos para imprimir</h3><div class="enlaces">${Object.entries(G.imprimibles).map(([id, n]) => `<a class="chip" href="imprimir.html#${id}" target="_blank" rel="noopener">${esc(n)}</a>`).join(" ")}</div></div>
    </div>`;
  }

  function vistaBibliografia() {
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Biblioteca</div><h1>Bibliografía y fuentes</h1><p>Las fuentes de referencia para profundizar. CoraLEAN prioriza siempre información fiable y verificable, y cita sus fuentes con enlace.</p></div>
      ${G.bibliografia.map((g) => `<section class="biblio"><h2 style="font-size:20px">${esc(g.grupo)}</h2>${g.items.map((it) => `<div class="card"><p>${it.cita}</p>${it.nota ? `<p class="nota">${esc(it.nota)}</p>` : ""}${it.enlaces ? `<div class="enlaces">${it.enlaces.map(([t, u]) => `<a class="chip" href="${u}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join(" ")}</div>` : ""}</div>`).join("")}</section>`).join("")}
      <div class="callout tip"><span class="ico">i</span><div><b>Sobre las fuentes de las fichas</b>Las fichas de CoraLEAN están escritas con palabras e imágenes propias. Algunas reinterpretan ideas del <i>Manual de Bolsillo Lean Healthcare</i> de SECA, con su autorización, y del kit de herramientas del IHI. Esos documentos originales son la fuente de referencia y conviene consultarlos.</div></div>
    </div>`;
  }

  function vistaFicha() {
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Tu proyecto</div><h1>La memoria del proyecto</h1><p>Tu asistente no recuerda de forma fiable las conversaciones anteriores: lo que no está escrito, no existe para él. Por eso la memoria del proyecto tiene tres capas, y CoraLEAN las lee al empezar y las actualiza al terminar.</p></div>
      <div class="card tabla-w"><h3>Las tres capas</h3><table><thead><tr><th>Capa</th><th>Qué es</th><th>Cómo se actualiza</th></tr></thead><tbody><tr><td><b>Ficha</b></td><td>La foto de hoy (1–3 páginas): lo decidido y lo pendiente</td><td>Se <b>sustituye</b> por la versión nueva en cada sesión</td></tr><tr><td><b>Cuaderno</b></td><td>La línea evolutiva: una entrada por sesión, en un solo archivo</td><td>Solo se <b>añade</b> al final. Nunca se resume ni se reescribe</td></tr><tr><td><b>Documentos</b></td><td>Actas, fichas de entrevista, mapas, datos, entregables</td><td>Se <b>guardan</b> en el registro; los citan la ficha y el cuaderno</td></tr></tbody></table></div>
      <div class="card"><h3>Cómo se actualiza el cuaderno según tu entorno</h3><ul><li><b>Work, Cowork, OpenCode, agentes de Copilot:</b> añaden la entrada solos.</li><li><b>Proyecto manual, cuaderno corto:</b> CoraLEAN te da el cuaderno completo con una comprobación («tenía 12 entradas y ahora tiene 13»). Si el número no cuadra, se ha perdido algo. Sustituye el archivo en la base de conocimiento (descargar o «añadir a la fuente») y borra el anterior.</li><li><b>Proyecto manual, cuaderno largo:</b> te da solo la entrada nueva para pegar al final, y te sugiere archivar lo antiguo.</li></ul><p class="nota">El cuaderno no se actualiza solo en los entornos manuales: hay que guardarlo al cerrar cada sesión.</p></div>
      <div class="card"><h3>Leerlo sin Markdown</h3><p>Al cerrar la sesión, pide «una versión para consultar»: un Word con buen formato si tu asistente puede crear archivos. O abre cualquier archivo <code>.md</code> en el visor de esta guía: se ve con formato, se puede imprimir o guardar como PDF y <b>no se envía nada a ningún sitio</b>.</p><div class="enlaces"><a class="btn small" href="cuaderno.html">Abrir el visor del cuaderno</a>${enlacePlantilla("cuaderno")} ${enlacePlantilla("entrada-cuaderno")}</div></div>
      <div class="card"><h3>El ciclo de cada sesión</h3><div class="flujo-ficha"><span>Retomas con la ficha</span><i>→</i><span>Trabajas</span><i>→</i><span>CoraLEAN propone cambios</span><i>→</i><span>Confirmas</span><i>→</i><span>Guardas ficha y cuaderno</span></div>
        <div class="enlaces" style="margin-top:12px"><a class="chip skill" href="#paso-donde-estamos">Retoma el proyecto</a><a class="chip skill" href="#paso-cerrar-sesion">Cierra la sesión</a></div></div>
      <div class="rej-2">
        <div class="card"><h3>Los documentos de trabajo: el registro</h3><p>La carpeta donde se guardan los documentos. Se añade; nunca se borra. La ficha y el cuaderno los citan en «Fuentes y documentos» para volver al original.</p>
          <pre class="bloque">[proyecto]/
├── 00_ficha/          última ficha + cuaderno
├── 01_contexto/       encargo, PAI, boceto
├── 02_entrevistas/    fichas por rol (sin nombres)
├── 03_sesiones/       guiones, actas, documentos del líder
├── 04_analisis/       mapas, brechas, causas
├── 05_datos/          hojas de recogida, indicadores
├── 06_entregables/    presentaciones e informes
└── indice-registro.md</pre>
          <p class="nota">Nombres de archivo: <code>AAAA-MM-DD_tipo_detalle.md</code>, por ejemplo <code>2026-11-03_acta_sesion-2.md</code>. CoraLEAN te dice en cada caso dónde guardarlo.</p>
          <div class="enlaces">${enlacePlantilla("indice-registro")}</div></div>
        <div class="card"><h3>Dónde guardarla</h3><ul>
          <li><b>Project de ChatGPT o Claude:</b> súbela como archivo del proyecto y sustitúyela en cada versión (borra la anterior).</li>
          <li><b>OpenCode:</b> en la carpeta del proyecto.</li>
          <li><b>Conversación suelta:</b> en un documento tuyo; pégala o adjúntala al empezar.</li></ul></div>
      </div>
      <div class="rej-2">
        <div class="card"><h3>Qué contiene la ficha</h3><ol>
          <li>Origen y encargo</li><li>Problema</li><li>Objetivo e indicador</li><li>Alcance</li><li>Niveles y servicios implicados</li><li>Personas y su papel</li><li>Estándar de referencia</li><li>Lo que sabemos: hechos, supuestos, opiniones</li><li>Decisiones</li><li>Acciones con responsable y fecha</li><li>Herramientas aplicadas</li><li>Dudas y cosas a averiguar</li><li>Riesgos</li><li>Próximo paso</li><li>Fuentes y documentos</li><li>Historial de versiones</li></ol>
          <div class="enlaces" style="margin-top:10px">${enlacePlantilla("ficha-proyecto")}</div></div>
        <div class="card"><h3>Lo que hace CoraLEAN con ella</h3><ul>
          <li>La lee al empezar y te resume dónde estáis, sin pedirte que lo cuentes.</li>
          <li>Solo apunta lo que se ha trabajado y confirmado; lo dudoso queda como pendiente.</li>
          <li>Pone fecha y versión, y anota qué cambió.</li>
          <li>A partir de ella prepara actas e informes de continuidad: <b>ordena lo que habéis trabajado, no lo inventa</b>.</li>
          <li>Nunca incluye datos de pacientes ni opiniones atribuidas por nombre.</li></ul></div>
      </div>
    </div>`;
  }

  const TABS = [
    { id: "chatgpt", n: "ChatGPT" }, { id: "claude", n: "Claude" }, { id: "opencode", n: "OpenCode" }, { id: "copilot", n: "Microsoft Copilot" }, { id: "gratis", n: "Versiones gratuitas" }
  ];
  const PRIMER = "Hola, CoraLEAN. Voy a trabajar en un proyecto de mejora.\n\n– Si es nuevo: todavía no tengo ficha; empecemos por ordenar lo que sé.\n– Si ya lo había empezado: te adjunto la ficha del proyecto (o está en los archivos del proyecto); retomemos.";

  function bloqueProject(app_) {
    const nombres = app_ === "claude"
      ? ["En la barra lateral, abre «Proyectos» y crea uno nuevo con el nombre de tu proyecto.", "Abre las instrucciones del proyecto y pega el texto de abajo.", "En el conocimiento del proyecto, sube el archivo coralean-completo.md.", "Cuando tengas la ficha del proyecto, súbela también (y sustitúyela en cada versión).", "Abre una conversación dentro del proyecto y pega el primer mensaje."]
      : ["En la barra lateral, crea un proyecto nuevo con el nombre de tu proyecto.", "Abre la configuración del proyecto y pega el texto de abajo en sus instrucciones.", "Añade como archivo del proyecto coralean-completo.md.", "Cuando tengas la ficha del proyecto, súbela también (y sustitúyela en cada versión).", "Abre una conversación dentro del proyecto y pega el primer mensaje."];
    return `<div class="card"><h3>Opción B · Proyecto con instrucciones (también sirve si no puedes instalar skills)</h3>
      <ol class="pasos-num">${nombres.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      <p class="nota" style="margin-top:10px">Los nombres de los menús pueden variar según la versión de la aplicación.</p>
      <div class="sec-t" style="margin-top:12px">Instrucciones para pegar</div><pre class="bloque" id="instr">Cargando…</pre>
      <div class="enlaces"><button class="btn small" data-copiar="instr">Copiar instrucciones</button><a class="btn small" href="recursos/proyecto/coralean-completo.md" download>Descargar coralean-completo.md</a><span class="ok-copiado"></span></div></div>`;
  }

  function vistaInstalar() {
    const tab = estado.tab;
    const skills = [...new Set(G.pasos.map((p) => p.skill))];
    const zips = `<div class="enlaces">${skills.map((s) => `<a class="chip skill" href="recursos/skills/${s}.zip" download>${esc(s)}.zip</a>`).join(" ")}</div>`;
    const primer = `<div class="card"><h3>El primer mensaje</h3><p>Sirve para empezar y para retomar. Si tienes la ficha, adjúntala.</p><pre class="bloque" id="primer">${esc(PRIMER)}</pre><div class="enlaces"><button class="btn small" data-copiar="primer">Copiar</button><span class="ok-copiado"></span></div></div>`;
    let cuerpo = "";
    if (tab === "chatgpt" || tab === "claude") {
      const ruta = tab === "claude" ? "Personalizar → Skills → subir cada archivo .zip (si te lo pide, activa la ejecución de código en los ajustes)." : "Plugins → Skills → subir cada archivo .zip.";
      cuerpo = `<div class="card"><h3>Opción A · Instalar las skills (recomendada, en cuentas de pago)</h3><ol class="pasos-num"><li>Descarga los archivos de las skills:${zips}</li><li>${esc(ruta)}</li><li>Abre una conversación nueva y escribe: «Me han encargado [proyecto]. Te cuento lo que tengo.» Debería ordenarlo en una ficha de contexto y decirte qué falta.</li></ol></div>${bloqueProject(tab)}${primer}`;
    } else if (tab === "opencode") {
      cuerpo = `<div class="card"><h3>OpenCode (terminal o escritorio)</h3><ol class="pasos-num"><li>Descarga y descomprime las skills en una carpeta, por ejemplo <code>~/coralean/skills</code>:${zips}</li><li>Añade la carpeta a tu configuración <code>~/.config/opencode/opencode.json</code>:<pre class="bloque" id="oc">"skills": ["~/coralean/skills"]</pre><div class="enlaces"><button class="btn small" data-copiar="oc">Copiar</button><span class="ok-copiado"></span></div></li><li>Invoca una skill escribiendo <code>@nombre-de-la-skill</code>, o deja que la elija sola por lo que pides.</li><li>Guarda la ficha del proyecto como archivo en la carpeta de trabajo.</li></ol><p class="nota">Recomendado solo si te manejas con herramientas técnicas. Cuidado con los modelos gratuitos: algunos pueden usar tus conversaciones.</p></div>${primer}`;
    } else if (tab === "copilot") {
      cuerpo = `<div class="card"><h3>Microsoft Copilot: en estudio</h3><p>Muchos hospitales solo tienen Copilot. Estamos comprobando si en una organización real se pueden crear agentes con instrucciones y archivos, porque depende de lo que permita cada administración. No queremos prometer nada que no hayamos probado.</p><p><b>Mientras tanto, puedes probar:</b> pegar las instrucciones del plan B al inicio de una conversación y adjuntar <i>coralean-completo.md</i> si tu entorno lo permite. Si lo pruebas, nos ayuda mucho saber cómo ha ido.</p><div class="enlaces"><a class="btn small" href="recursos/proyecto/INSTRUCCIONES.md" download>Descargar instrucciones</a><a class="btn small" href="recursos/proyecto/coralean-completo.md" download>Descargar coralean-completo.md</a></div></div>`;
    } else {
      cuerpo = `<div class="card"><h3>Versiones gratuitas: en estudio</h3><p>Las cuentas gratuitas de ChatGPT y Claude tienen límites que cambian con frecuencia (proyectos, archivos, skills, número de mensajes). Estamos comprobando con cuentas reales qué funciona en cada una antes de recomendar nada.</p><p><b>Mientras tanto:</b> prueba la opción B (proyecto con instrucciones). Si tu cuenta no permite proyectos, pega las instrucciones al inicio de cada conversación y adjunta la ficha. Funcionará peor que con las skills: la conversación será más larga y conviene cerrar la sesión con frecuencia.</p><div class="enlaces"><a class="btn small" href="recursos/proyecto/INSTRUCCIONES.md" download>Descargar instrucciones</a><a class="btn small" href="recursos/proyecto/coralean-completo.md" download>Descargar coralean-completo.md</a></div></div>${primer}`;
    }
    app.innerHTML = `<div class="ancho">
      <div class="intro"><div class="etq">Empezar</div><h1>Configura tu asistente</h1><p>Se hace una vez. Elige dónde vas a usar CoraLEAN y sigue los pasos. Las skills son lo recomendado; el proyecto con instrucciones es el plan B.</p></div>
      <div class="pestanas" role="tablist">${TABS.map((t) => `<button role="tab" aria-selected="${t.id === tab}" data-tab="${t.id}">${esc(t.n)}</button>`).join("")}</div>
      ${cuerpo}</div>`;
    app.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => { estado.tab = b.dataset.tab; vistaInstalar(); }));
    const instr = document.getElementById("instr");
    if (instr) fetch("recursos/proyecto/INSTRUCCIONES.md").then((r) => r.ok ? r.text() : Promise.reject()).then((t) => { instr.textContent = t; }).catch(() => { instr.textContent = "No se ha podido cargar. Descárgalo desde el enlace «Descargar instrucciones» de la pestaña Copilot."; });
    app.querySelectorAll("[data-copiar]").forEach((b) => b.addEventListener("click", () => { const n = document.getElementById(b.dataset.copiar); copiar(n.textContent, b.parentElement.querySelector(".ok-copiado"), n); }));
  }

  // ---------- Router ----------
  function render() {
    const h = location.hash.replace(/^#/, "") || "inicio";
    let actual = h, momentoActual = null;
    if (h.startsWith("paso-")) { const p = paso(h.slice(5)); momentoActual = p && p.momento; vistaPaso(h.slice(5)); }
    else if (h.startsWith("momento-")) { momentoActual = h.slice(8); vistaMomento(h.slice(8)); }
    else if (h.startsWith("herramienta-")) vistaHerramienta(h.slice(12));
    else if (h === "herramientas") vistaHerramientas();
    else if (h === "tecnicas") vistaTecnicas();
    else if (h === "plantillas") vistaPlantillas();
    else if (h === "convenciones") vistaConvenciones();
    else if (h === "bibliografia") vistaBibliografia();
    else if (h === "ficha") vistaFicha();
    else if (h === "instalar") vistaInstalar();
    else { actual = "inicio"; vistaInicio(); }
    pintarNav(actual, momentoActual);
    if (actual !== "inicio") { estado.ultima = actual; guardar(); }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);
  render();
})();
