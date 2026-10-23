(function () {
  const G = window.GUIA, D = window.DIAGRAMAS;
  const app = document.getElementById("app");
  const CLAVE = "facilitador-guia-v1";

  // Solo se guarda la plataforma, el último paso y el nombre del proyecto.
  const guardado = (() => { try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return {}; } })();
  const estado = { plataforma: guardado.plataforma || "chatgpt", paso: guardado.paso || G.pasos[0].id, proyecto: guardado.proyecto || "", valores: {}, ficha: "", incluirFicha: true, filtro: "Todas" };
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify({ plataforma: estado.plataforma, paso: estado.paso, proyecto: estado.proyecto })); } catch (e) { /* sin almacenamiento */ } };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const paso = (id) => G.pasos.find((p) => p.id === id);
  const pasoDeSkill = (skill) => G.pasos.find((p) => p.skill === skill);
  const plat = () => G.plataformas.find((p) => p.id === estado.plataforma) || G.plataformas[0];
  const herr = (id) => G.herramientas.find((h) => h.id === id);

  // Plataforma
  const sel = document.getElementById("plataforma");
  sel.innerHTML = G.plataformas.map((p) => `<option value="${p.id}">${esc(p.nombre)}</option>`).join("");
  sel.value = estado.plataforma;
  sel.addEventListener("change", () => { estado.plataforma = sel.value; guardar(); render(); });

  // Copiar al portapapeles con alternativa
  function copiar(texto, aviso, nodoSeleccion) {
    const ok = () => { if (aviso) { aviso.textContent = "Copiado"; setTimeout(() => (aviso.textContent = ""), 2200); } };
    const alternativa = () => {
      if (nodoSeleccion) { const r = document.createRange(); r.selectNodeContents(nodoSeleccion); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      if (aviso) aviso.textContent = "Selecciónalo y cópialo (Ctrl+C)";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, alternativa); else alternativa();
  }

  function copiarPlantilla(id, aviso) {
    fetch(`recursos/plantillas/${id}.md`).then((r) => { if (!r.ok) throw new Error(); return r.text(); })
      .then((t) => copiar(t, aviso)).catch(() => { if (aviso) aviso.textContent = "Ábrela con el enlace y cópiala"; });
  }

  // Composición del mensaje
  function componer(p) {
    const vals = estado.valores[p.id] || {};
    const partes = [];
    let html = esc(p.plantilla), txt = p.plantilla;
    (p.campos || []).forEach((c) => {
      const v = (c.recordar ? (vals[c.id] ?? estado.proyecto) : vals[c.id]) || "";
      const marcador = `[${c.etiqueta.toLowerCase()}]`;
      txt = txt.split(`{${c.id}}`).join(v || marcador);
      html = html.split(`{${c.id}}`).join(v ? esc(v) : `<span class="hueco">${esc(marcador)}</span>`);
    });
    if (p.ficha && estado.incluirFicha) {
      const f = estado.ficha.trim();
      txt += `\n\nFicha del proyecto (última versión):\n\n${f || "[pega aquí la ficha]"}`;
      html += `\n\nFicha del proyecto (última versión):\n\n${f ? esc(f) : '<span class="hueco">[pega aquí la ficha]</span>'}`;
    }
    const pre = plat().prefijo(p.skill);
    return { txt: pre + txt, html: esc(pre) + html };
  }

  // ---------- Vistas ----------
  function vistaRecorrido(id) {
    const p = paso(id) || G.pasos[0];
    estado.paso = p.id; guardar();
    const idx = G.pasos.indexOf(p);
    const fase = G.fases.find((f) => f.id === p.fase);

    const stepper = G.fases.map((f) => {
      const ps = G.pasos.filter((x) => x.fase === f.id);
      const items = ps.map((x) => `<li><a href="#paso-${x.id}" ${x.id === p.id ? 'aria-current="step"' : ""}><span class="num">${G.pasos.indexOf(x) + 1}</span>${esc(x.titulo)}</a></li>`).join("");
      return `<div class="fase"><div class="fase-n">${esc(f.nombre)}${f.opcional ? "<em>opcional</em>" : ""}</div>${f.proximamente ? `<div class="fase-prox">${esc(f.lema)}. <a href="#herramientas">Ver la teoría</a></div>` : `<ol>${items}</ol>`}</div>`;
    }).join("");
    const movil = `<div class="stepper-movil"><label class="sec-t" for="paso-sel">Paso</label><select id="paso-sel">${G.pasos.map((x, i) => `<option value="${x.id}" ${x.id === p.id ? "selected" : ""}>${i + 1}. ${esc(x.titulo)}</option>`).join("")}</select></div>`;

    const campos = (p.campos || []).map((c) => {
      const v = (estado.valores[p.id] || {})[c.id] ?? (c.recordar ? estado.proyecto : "");
      let ctl;
      if (c.tipo === "textarea") ctl = `<textarea data-campo="${c.id}" placeholder="${esc(c.ej || "")}">${esc(v)}</textarea>`;
      else if (c.tipo === "select") ctl = `<select data-campo="${c.id}"><option value="">Elige…</option>${c.opciones.map((o) => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
      else ctl = `<input data-campo="${c.id}" value="${esc(v)}" placeholder="${esc(c.ej || "")}">`;
      return `<div class="campo"><label>${esc(c.etiqueta)}</label>${ctl}</div>`;
    }).join("");
    const fichaCampo = p.ficha ? `<label class="check"><input type="checkbox" id="incluir-ficha" ${estado.incluirFicha ? "checked" : ""}> Añadir la ficha del proyecto al mensaje</label>
      <div class="campo" id="ficha-campo" ${estado.incluirFicha ? "" : "hidden"}><label>Ficha del proyecto (última versión)</label><textarea id="ficha-texto" placeholder="Pega aquí la ficha. Si ya está en la conversación o en el Project, desmarca la casilla.">${esc(estado.ficha)}</textarea><small>No se guarda: al recargar la página desaparece.</small></div>` : "";

    const herrs = (p.herramientas || []).map(herr).filter(Boolean).map((h) => `<a class="mini" href="#herramienta-${h.id}">${D[h.id] ? D[h.id]() : ""}<b>${esc(h.nombre)}</b><span>${esc(h.pregunta)}</span></a>`).join("");
    const tecs = (p.tecnicas || []).map((tid) => G.tecnicas.find((t) => t.id === tid)).filter(Boolean).map((t) => `<a class="chip" href="#tecnicas">${esc(t.nombre)}</a>`).join(" ");
    const plantillas = (p.plantillas || []).map((id) => `<span class="chip">${esc(G.plantillas[id] || id)} · <a href="recursos/plantillas/${id}.md" target="_blank" rel="noopener">abrir</a> · <a href="#" data-copiar-plantilla="${id}">copiar</a></span>`).join(" ");
    const ejemplos = (p.ejemplos || []).map((id) => `<a class="chip" href="recursos/ejemplos/${id}.md" target="_blank" rel="noopener">${esc(id.split("--")[1].replace(/-/g, " "))}</a>`).join(" ");
    const sig = paso(p.siguiente);
    const ant = G.pasos[idx - 1], pos = G.pasos[idx + 1];

    app.innerHTML = `<div class="recorrido"><aside class="stepper" aria-label="Recorrido">${stepper}</aside>
      <article class="paso">
        ${movil}
        <div class="miga"><span>${esc(fase.nombre)}</span><span>·</span><span>Paso ${idx + 1} de ${G.pasos.length}</span><span class="chip skill">${esc(p.skill)}</span></div>
        <h1>${esc(p.titulo)}</h1>
        <p class="resumen">${esc(p.resumen)}</p>
        <div class="tres">
          <div class="card"><h3>Cuándo</h3><p>${esc(p.cuando)}</p></div>
          <div class="card"><h3>Necesitas</h3><ul>${p.necesitas.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
          <div class="card"><h3>Recibes</h3><ul>${p.recibes.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        </div>
        ${p.ficha ? `<div class="callout ficha"><span class="ico">F</span><div><b>La ficha es la memoria del proyecto.</b> Pégala al empezar (o tenla en el Project) y guarda la versión nueva que te devuelva al terminar.</div></div>` : ""}
        ${p.privacidad ? `<div class="callout priv"><span class="ico">!</span><div><b>Privacidad.</b> Pide consentimiento antes de grabar. Antes de pegar una transcripción en una IA no aprobada por tu centro, cambia los nombres por roles y quita cualquier dato de pacientes.</div></div>` : ""}
        <section class="gen" aria-label="Prepara el mensaje">
          <div class="gen-head"><b>Prepara el mensaje</b><span>${esc(plat().nombre)} · ${esc(plat().nota)}</span></div>
          <div class="gen-body">
            <div class="gen-campos">${campos || '<p class="nota-plat">Este paso no necesita datos: copia el mensaje tal cual.</p>'}${fichaCampo}</div>
            <div class="gen-preview"><pre id="preview"></pre>
              <div class="gen-acciones"><button class="btn prim" id="copiar">Copiar mensaje</button><span class="ok-copiado" id="aviso" aria-live="polite"></span></div>
              <span class="nota-plat">Pégalo en tu IA. Lo marcado en amarillo está por completar.</span></div>
          </div>
        </section>
        <div class="callout tip"><span class="ico">✓</span><div><b>Consejo</b>${esc(p.consejo)}</div></div>
        ${herrs ? `<div><div class="sec-t">Herramientas de este paso</div><div class="mini-grid">${herrs}</div></div>` : ""}
        ${tecs ? `<div><div class="sec-t">Técnicas que usarás</div><div class="enlaces">${tecs}</div></div>` : ""}
        ${plantillas ? `<div><div class="sec-t">Plantillas</div><div class="enlaces">${plantillas}</div></div>` : ""}
        ${ejemplos ? `<div><div class="sec-t">Ejemplos (caso ficticio)</div><div class="enlaces">${ejemplos}</div></div>` : ""}
        <div class="pasonav">
          ${ant ? `<a class="btn" href="#paso-${ant.id}">← ${esc(ant.titulo)}</a>` : "<span></span>"}
          ${sig ? `<a class="btn prim" href="#paso-${sig.id}">Siguiente: ${esc(sig.titulo)} →</a>` : pos ? `<a class="btn prim" href="#paso-${pos.id}">${esc(pos.titulo)} →</a>` : ""}
        </div>
      </article></div>`;

    const pre = document.getElementById("preview");
    const pintar = () => { pre.innerHTML = componer(p).html; };
    pintar();
    app.querySelectorAll("[data-campo]").forEach((el) => el.addEventListener("input", () => {
      const v = (estado.valores[p.id] = estado.valores[p.id] || {});
      v[el.dataset.campo] = el.value;
      const c = p.campos.find((x) => x.id === el.dataset.campo);
      if (c && c.recordar) { estado.proyecto = el.value; guardar(); }
      pintar();
    }));
    const inc = document.getElementById("incluir-ficha");
    if (inc) inc.addEventListener("change", () => { estado.incluirFicha = inc.checked; document.getElementById("ficha-campo").hidden = !inc.checked; pintar(); });
    const ft = document.getElementById("ficha-texto");
    if (ft) ft.addEventListener("input", () => { estado.ficha = ft.value; pintar(); });
    document.getElementById("copiar").addEventListener("click", () => copiar(componer(p).txt, document.getElementById("aviso"), pre));
    const ps = document.getElementById("paso-sel");
    if (ps) ps.addEventListener("change", () => { location.hash = `paso-${ps.value}`; });
    enlazarPlantillas();
  }

  function enlazarPlantillas() {
    app.querySelectorAll("[data-copiar-plantilla]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      let aviso = a.parentElement.querySelector(".ok-copiado");
      if (!aviso) { aviso = document.createElement("span"); aviso.className = "ok-copiado"; a.parentElement.appendChild(aviso); }
      copiarPlantilla(a.dataset.copiarPlantilla, aviso);
    }));
  }

  function vistaHerramientas(foco) {
    const momentos = ["Todas", ...new Set(G.herramientas.map((h) => h.momento))];
    const lista = G.herramientas.filter((h) => estado.filtro === "Todas" || h.momento === estado.filtro || h.id === foco);
    app.innerHTML = `<div class="vista-intro"><h1>Biblioteca de herramientas</h1><p>Lo mínimo para usar cada herramienta con sentido: qué pregunta responde, cómo se hace, cuándo no usarla y un consejo. Cada una enlaza a su plantilla, a su lienzo imprimible y al paso de la guía que la desarrolla. Para elegir, la regla es sencilla: <b>la más ligera que responda a la pregunta que tiene ahora el proyecto</b>.</p></div>
      <div class="filtros" role="group" aria-label="Filtrar por momento">${momentos.map((m) => `<button aria-pressed="${m === estado.filtro}" data-m="${esc(m)}">${esc(m)}</button>`).join("")}</div>
      <div class="herr-grid">${lista.map((h) => {
        const ps = h.skill ? pasoDeSkill(h.skill) : null;
        const enl = [
          h.plantilla ? `<span class="chip">Plantilla · <a href="recursos/plantillas/${h.plantilla}.md" target="_blank" rel="noopener">abrir</a> · <a href="#" data-copiar-plantilla="${h.plantilla}">copiar</a></span>` : "",
          h.imprimir ? `<a class="chip" href="imprimir.html#${h.imprimir}" target="_blank" rel="noopener">Lienzo para imprimir</a>` : "",
          ps ? `<a class="chip skill" href="#paso-${ps.id}">${esc(h.skill)}</a>` : ""
        ].join(" ");
        return `<article class="card herr ${h.id === foco ? "foco" : ""}" id="h-${h.id}">
          <div class="etq">${esc(h.momento)}</div>
          <div class="diag">${D[h.id] ? D[h.id]() : ""}</div>
          <h2>${esc(h.nombre)}</h2><p class="preg">${esc(h.pregunta)}</p>
          <p>${esc(h.teoria)}</p>
          <div><div class="sec-t">Cómo</div><ol>${h.como.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
          <p class="meta"><b>Cuándo no:</b> ${esc(h.cuandoNo)}</p>
          <div class="callout tip"><span class="ico">✓</span><div>${esc(h.consejo)}</div></div>
          <div class="enlaces">${enl}</div></article>`;
      }).join("")}</div>`;
    app.querySelectorAll(".filtros button").forEach((b) => b.addEventListener("click", () => { estado.filtro = b.dataset.m; vistaHerramientas(); }));
    enlazarPlantillas();
    if (foco) { const el = document.getElementById(`h-${foco}`); if (el) el.scrollIntoView({ block: "start" }); }
  }

  function vistaTecnicas() {
    app.innerHTML = `<div class="vista-intro"><h1>Técnicas de facilitación</h1><p>Para que hablen todos, validar rápido, decidir y que cada reunión acabe en acuerdos con nombre. Nunca más «¿alguien tiene algo que decir?».</p></div>
      <div class="tec-grid">${G.tecnicas.map((t) => `<article class="card tec" id="t-${t.id}"><h2>${esc(t.nombre)}</h2><p><b>Para qué:</b> ${esc(t.para)}</p><p><b>Cómo:</b> ${esc(t.como)}</p><div class="frase">«${esc(t.frase.replace(/^«|»$/g, ""))}»</div></article>`).join("")}</div>
      <h2 style="margin:28px 0 10px;font-size:22px">Situaciones difíciles</h2>
      <div class="card tabla-w"><table><thead><tr><th>Situación</th><th>Qué hacer</th></tr></thead><tbody>${G.dificiles.map(([s, q]) => `<tr><td><b>${esc(s)}</b></td><td>${esc(q)}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function vistaFicha() {
    app.innerHTML = `<div class="vista-intro"><h1>La ficha del proyecto</h1><p>Es la memoria del proyecto. El asistente no recuerda conversaciones anteriores: lo que no está en la ficha, no existe para él.</p></div>
      <div class="doscol">
        <div class="card prose"><div class="sec-t">Cómo funciona</div>
          <div class="ciclo-ficha"><span>Pegas la ficha</span><i>→</i><span>Trabajas un paso</span><i>→</i><span>Propone cambios</span><i>→</i><span>Confirmas</span><i>→</i><span>Guardas la versión nueva</span></div>
          <p style="margin-top:14px">Cada versión lleva número (v0, v1, v2…) y un historial de qué cambió. La v0 sale del boceto del proyecto; las siguientes, sobre todo de procesar cada reunión.</p>
          <p><b>Dónde guardarla:</b> en un documento propio, o como archivo del Project si usas el plan B. En OpenCode, como archivo en la carpeta del proyecto.</p>
          <p><b>Qué no va en la ficha:</b> datos de pacientes ni opiniones atribuidas por nombre.</p>
          <div class="enlaces"><span class="chip">Plantilla de la ficha · <a href="recursos/plantillas/ficha-proyecto.md" target="_blank" rel="noopener">abrir</a> · <a href="#" data-copiar-plantilla="ficha-proyecto">copiar</a></span></div></div>
        <div class="card prose"><div class="sec-t">Qué contiene</div><ol>
          <li>Origen y encargo</li><li>Problema</li><li>Objetivo e indicador</li><li>Alcance</li><li>Niveles y servicios implicados</li><li>Personas y su papel</li><li>Estándar de referencia</li><li>Lo que sabemos: hechos, supuestos, opiniones</li><li>Decisiones</li><li>Acciones con responsable y fecha</li><li>Herramientas aplicadas</li><li>Dudas y cosas a averiguar</li><li>Riesgos</li><li>Próximo paso</li><li>Historial de versiones</li></ol></div>
      </div>
      <div class="card" style="margin-top:16px"><div class="sec-t">Las reglas que sigue el asistente</div><ol>
        <li><b>La ficha manda.</b> La pide al empezar y devuelve la versión nueva al terminar.</li>
        <li><b>Primero tú.</b> Te pide tu intento antes de dar el suyo. Si vas con prisa, pide «modo rápido».</li>
        <li><b>Un paso cada vez.</b> Una pregunta por mensaje; una herramienta recomendada con su porqué.</li>
        <li><b>Hecho, supuesto u opinión.</b> Lo ambiguo queda como «pendiente de confirmar».</li>
        <li><b>No inventa nada:</b> «SIN ASIGNAR» y «SIN FECHA» cuando faltan.</li>
        <li><b>Cierra siempre igual:</b> qué hemos decidido, qué falta y siguiente paso.</li>
        <li><b>Privacidad:</b> sin datos de pacientes; entrevistas por rol.</li></ol></div>`;
    enlazarPlantillas();
  }

  function vistaInstalar() {
    const skills = [...new Set(G.pasos.map((p) => p.skill))];
    const oc = `"skills": ["/ruta/a/facilitador-lean/dist/skills"]`;
    app.innerHTML = `<div class="vista-intro"><h1>Instalar</h1><p>Elige una opción. Las skills son lo recomendado; el Project es el plan B si tu cuenta no permite subir skills.</p></div>
      <div class="doscol">
        <div class="card prose"><div class="sec-t">Opción A · Skills</div>
          <p><b>Claude:</b> Personalizar → Skills → subir cada .zip.</p>
          <p><b>ChatGPT:</b> Skills (dentro de Plugins) → subir cada .zip.</p>
          <p><b>OpenCode:</b> descomprime las skills en una carpeta y añade a <code>~/.config/opencode/opencode.json</code>:</p>
          <pre class="bloque">${esc(oc)}</pre>
          <p>Invoca con <code>@nombre-de-la-skill</code> o deja que la elija sola por la descripción.</p>
          <div class="sec-t">Descargas</div>
          <div class="enlaces">${skills.map((s) => `<a class="chip skill" href="recursos/skills/${s}.zip">${esc(s)}.zip</a>`).join(" ")}</div></div>
        <div class="card prose"><div class="sec-t">Opción B · Project (plan B)</div>
          <ol><li>Crea un Project en ChatGPT o Claude.</li><li>Pega <b>INSTRUCCIONES.md</b> en las instrucciones del Project.</li><li>Sube <b>facilitador-lean-completo.md</b> como archivo.</li><li>Guarda también la ficha del proyecto como archivo y sustitúyela en cada versión.</li></ol>
          <div class="enlaces"><a class="chip" href="recursos/proyecto/INSTRUCCIONES.md" target="_blank" rel="noopener">INSTRUCCIONES.md</a> <a class="chip" href="recursos/proyecto/facilitador-lean-completo.md" target="_blank" rel="noopener">facilitador-lean-completo.md</a></div>
          <div class="sec-t" style="margin-top:16px">Comprueba que funciona</div>
          <p>Abre una conversación nueva y escribe: «Me han encargado [proyecto]. Te pego lo que tengo.» Debería ordenarlo en una ficha de contexto y decirte qué falta.</p></div>
      </div>`;
  }

  // ---------- Router ----------
  function render() {
    const h = location.hash.replace(/^#/, "");
    let vista = "recorrido";
    if (h === "herramientas" || h.startsWith("herramienta-")) vista = "herramientas";
    else if (h === "tecnicas") vista = "tecnicas";
    else if (h === "ficha") vista = "ficha";
    else if (h === "instalar") vista = "instalar";
    document.querySelectorAll(".nav a").forEach((a) => { if (a.dataset.vista === vista) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.querySelector('.nav a[data-vista="recorrido"]').href = `#paso-${estado.paso}`;
    if (vista === "herramientas") vistaHerramientas(h.startsWith("herramienta-") ? h.slice(12) : null);
    else if (vista === "tecnicas") vistaTecnicas();
    else if (vista === "ficha") vistaFicha();
    else if (vista === "instalar") vistaInstalar();
    else vistaRecorrido(h.startsWith("paso-") ? h.slice(5) : estado.paso);
    if (!h.startsWith("herramienta-")) window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);
  render();
})();
