// Batería del navegador. Uso: node tests/navegador.cjs http://127.0.0.1:PUERTO/
const { chromium } = require(process.env.HOME + "/.npm-global/lib/node_modules/playwright");
const path = require("path");
global.window = {};
require(path.resolve(__dirname, "../guia/assets/datos.js"));
const G = window.GUIA;
const base = process.argv[2];
const f = [];
const ok = (cond, msg) => { if (!cond) f.push(msg); };

(async () => {
  const b = await chromium.launch();
  const rutas = ["inicio", "empezar", ...G.momentos.map((m) => "momento-" + m.id), ...G.pasos.map((p) => "paso-" + p.id), "herramientas", ...G.herramientas.map((h) => "herramienta-" + h.id), "tecnicas", "convenciones", "plantillas", "bibliografia", "ficha", "instalar"];

  // 1. Todas las vistas en escritorio y móvil: sin errores, sin desbordamiento, con contenido y menú activo.
  for (const [w, h, tag, scheme] of [[1440, 950, "desk", "light"], [390, 844, "movil", "dark"]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const p = await ctx.newPage();
    p.on("pageerror", (e) => f.push(`${tag} pageerror ${e.message}`));
    p.on("console", (m) => { if (m.type() === "error" && !/fonts\.g/.test(m.text())) f.push(`${tag} console ${m.text()}`); });
    await p.goto(base + "index.html#inicio"); await p.waitForTimeout(400);
    for (const r of rutas) {
      await p.evaluate((x) => { location.hash = x; }, r); await p.waitForTimeout(100);
      const i = await p.evaluate(() => ({ ov: document.documentElement.scrollWidth - document.documentElement.clientWidth, len: document.getElementById("app").innerText.length, cur: !!document.querySelector('#nav [aria-current="page"]'), foco: document.activeElement && document.activeElement.id }));
      ok(i.ov <= 0, `${tag} ${r}: desbordamiento ${i.ov}px`);
      ok(i.len >= 200, `${tag} ${r}: contenido corto (${i.len})`);
      ok(i.cur, `${tag} ${r}: sin elemento activo en el menú`);
      if (r !== "inicio") ok(i.foco === "app", `${tag} ${r}: el foco no pasa a #app al cambiar de vista`);
    }
    await ctx.close();
  }

  // 2. UX-01: usuario nuevo → plataforma «sinconfig», «Empezar» lleva a #empezar y el mensaje no exige skills.
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
    await p.goto(base + "index.html#inicio"); await p.waitForTimeout(300);
    ok(await p.$eval("#plataforma", (s) => s.value) === "sinconfig", "UX-01: el selector no empieza en «sinconfig» para un usuario nuevo");
    ok(await p.$eval(".hero .ctas .btn.prim", (a) => a.getAttribute("href")) === "#empezar", "UX-01: «Empezar un proyecto» no lleva a #empezar");
    await p.evaluate(() => { location.hash = "empezar"; }); await p.waitForTimeout(150);
    const txtEmp = await p.$eval("#app", (a) => a.innerText);
    ok(/primera vez/i.test(txtEmp) && /preparado/i.test(txtEmp), "UX-01: #empezar no distingue «primera vez» y «ya preparado»");
    ok((await p.$$('#app a[href="#paso-recoger-contexto"]')).length > 0 && (await p.$$('#app a[href="#paso-procesar-sesion"]')).length > 0 && (await p.$$('#app a[href="#paso-donde-estamos"]')).length > 0, "UX-01: #empezar no ofrece situaciones (encargo, notas de reunión, retomar)");
    await p.evaluate(() => { location.hash = "paso-recoger-contexto"; }); await p.waitForTimeout(150);
    ok(!(await p.textContent("#preview")).includes("Usa la skill"), "UX-01: con «sinconfig» el mensaje sigue pidiendo una skill");
    ok((await p.$$('.gen-head a[href="#instalar"]')).length > 0, "UX-01: falta el enlace a configurar en el generador");
    await p.selectOption("#plataforma", "chatgpt"); await p.waitForTimeout(150);
    ok((await p.textContent("#preview")).includes("Usa la skill"), "UX-01: con ChatGPT configurado el mensaje no nombra la skill");
    await ctx.close();
  }

  // 3. UX-02: selector y pestañas sincronizados en ambos sentidos.
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
    await p.goto(base + "index.html#inicio"); await p.waitForTimeout(300);
    await p.selectOption("#plataforma", "claude"); await p.evaluate(() => { location.hash = "instalar"; }); await p.waitForTimeout(250);
    ok(await p.$eval('[data-tab="claude"]', (x) => x.getAttribute("aria-selected")) === "true", "UX-02: con Claude en el selector, la pestaña activa no es Claude");
    await p.click('[data-tab="opencode"]'); await p.waitForTimeout(150);
    ok(await p.$eval("#plataforma", (s) => s.value) === "opencode", "UX-02: al pulsar la pestaña OpenCode el selector no cambia");
    // Teclado en las pestañas (ACC-01)
    await p.focus('[data-tab="opencode"]'); await p.keyboard.press("ArrowLeft"); await p.waitForTimeout(150);
    ok(await p.$eval('[data-tab="claude"]', (x) => x.getAttribute("aria-selected")) === "true", "ACC-01: la flecha izquierda no cambia de pestaña");
    ok((await p.$$('[role="tabpanel"]')).length === 1, "ACC-01: falta el panel con role=tabpanel");
    await ctx.close();
  }

  // 4. Móvil: acciones arriba, generador antes de las explicaciones, menú accesible, mapa en lista.
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage();
    await p.goto(base + "index.html#inicio"); await p.waitForTimeout(300);
    const top = await p.$eval(".hero .ctas", (e) => e.getBoundingClientRect().top + window.scrollY);
    ok(top < 600, `UX-03: en móvil los botones de inicio empiezan en ${Math.round(top)}px (debe ser < 600)`);
    ok(await p.evaluate(() => { const c = document.querySelector(".hero .ctas"), pi = document.querySelector(".hero .pilares"); return !!(c && pi && (c.compareDocumentPosition(pi) & Node.DOCUMENT_POSITION_FOLLOWING)); }), "UX-03: los botones no van antes de los tres pilares");
    ok(await p.evaluate(() => { const l = document.querySelector(".mapa-lista"), m = document.querySelector(".mapa-razon"); return !!(l && l.offsetParent && m && !m.offsetParent); }), "UX-07: en móvil no se muestra la versión en lista del mapa");
    // Menú: inerte cerrado, se abre, Escape cierra y devuelve el foco.
    ok(await p.$eval("#lateral", (l) => l.hasAttribute("inert")), "ACC-01: el menú cerrado en móvil no es inert");
    await p.click("#abrir-menu"); await p.waitForTimeout(300);
    ok(!(await p.$eval("#lateral", (l) => l.hasAttribute("inert"))), "ACC-01: el menú abierto sigue inert");
    await p.keyboard.press("Escape"); await p.waitForTimeout(300);
    ok(await p.$eval("#lateral", (l) => l.hasAttribute("inert") && !l.classList.contains("abierto")), "ACC-01: Escape no cierra el menú");
    ok(await p.evaluate(() => document.activeElement && document.activeElement.id === "abrir-menu"), "ACC-01: al cerrar, el foco no vuelve al botón del menú");
    // Paso: generador visible pronto y antes de «Por qué importa».
    await p.evaluate(() => { location.hash = "paso-recoger-contexto"; }); await p.waitForTimeout(200);
    const gtop = await p.$eval(".gen", (e) => e.getBoundingClientRect().top + window.scrollY);
    ok(gtop < 700, `UX-04: en móvil el generador empieza en ${Math.round(gtop)}px (debe ser < 700)`);
    ok(await p.evaluate(() => { const g = document.querySelector(".gen"); const h = [...document.querySelectorAll("#app h3")].find((x) => /Por qué importa/.test(x.textContent)); return !!(g && h && (g.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING)); }), "UX-04: «Por qué importa» aparece antes del generador");
    await ctx.close();
  }

  // 5. Escritorio: mapa completo, menú plegable, sin jerga técnica en cabeceras, etiquetas asociadas, alternativa al siguiente paso.
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
    await p.goto(base + "index.html#inicio"); await p.waitForTimeout(300);
    ok(await p.evaluate(() => { const l = document.querySelector(".mapa-lista"), m = document.querySelector(".mapa-razon"); return !!(m && m.offsetParent && l && !l.offsetParent); }), "UX-07: en escritorio no se muestra el mapa completo");
    ok(!/No es un generador de documentos/.test(await p.$eval("#app", (a) => a.innerText)), "Texto «Qué no es» sin actualizar");
    ok((await p.$$("#nav details")).length >= 4, "UX-05: el menú no tiene grupos plegables (details)");
    const nav = await p.$eval("#nav", (n) => n.innerText);
    ok(/Para trabajar/.test(nav) && !/En cada sesión/.test(nav), "UX-05: el grupo no se llama «Para trabajar»");
    await p.evaluate(() => { location.hash = "herramienta-ishikawa"; }); await p.waitForTimeout(150);
    ok(await p.evaluate(() => { const d = document.querySelector('#nav a[aria-current="page"]'); return !!(d && d.closest("details") && d.closest("details").open); }), "UX-05: el grupo del elemento activo no está desplegado");
    await p.evaluate(() => { location.hash = "paso-recoger-contexto"; }); await p.waitForTimeout(150);
    ok((await p.$$(".miga .chip.skill")).length === 0, "UX-06: la cabecera sigue mostrando el nombre técnico de la skill");
    ok(await p.evaluate(() => [...document.querySelectorAll(".gen-campos input, .gen-campos select")].every((c) => c.id && document.querySelector(`label[for="${c.id}"]`))), "ACC-01: hay campos sin etiqueta asociada (for/id)");
    ok((await p.$$('.pasonav a[href="#paso-donde-estamos"]')).length > 0, "UX-04b: falta la alternativa «¿No encaja?» junto al siguiente paso");
    await p.evaluate(() => { location.hash = "momento-entendiendo"; }); await p.waitForTimeout(150);
    ok((await p.$$(".paso-fila .chip.skill")).length === 0, "UX-06: las filas de actividades muestran el nombre técnico de la skill");
    await p.evaluate(() => { location.hash = "momento-porque"; }); await p.waitForTimeout(150);
    ok((await p.$$(".orientacion #preview-orientacion")).length === 1 && (await p.textContent("#preview-orientacion")).length > 80, "MET-01: el momento «Entendiendo por qué ocurre» no ofrece mensaje de orientación");
    ok((await p.$$('.lista-pasos a[href="#paso-analizar-causas"]')).length === 1, "Plan B: el momento «Entendiendo por qué ocurre» no muestra la skill como paso");
    for (const [mid, sid] of [["eligiendo", "priorizar-soluciones"], ["probando", "planificar-prueba"], ["probando", "interpretar-resultados"], ["sosteniendo", "consolidar-mejora"]]) {
      await p.evaluate((x) => { location.hash = "momento-" + x; }, mid); await p.waitForTimeout(120);
      ok((await p.$$(`.lista-pasos a[href="#paso-${sid}"]`)).length === 1, `Plan B: el momento «${mid}» no muestra la skill ${sid} como paso`);
      ok((await p.$$(".orientacion #preview-orientacion")).length === 1, `Plan B: el momento «${mid}» ha perdido su bloque de orientación`);
    }
    for (const sid of ["analizar-causas", "priorizar-soluciones", "planificar-prueba", "interpretar-resultados", "consolidar-mejora"]) {
      await p.evaluate((x) => { location.hash = "paso-" + x; }, sid); await p.waitForTimeout(120);
      ok((await p.textContent("#preview")).length > 60, `Plan B: el paso ${sid} no prepara un mensaje`);
      ok((await p.$$('.gen-head a[href="#instalar"]')).length > 0, `Plan B: el paso ${sid} no enlaza a configurar el asistente`);
    }
    ok(!/en preparación/i.test(await p.$eval("#app", (a) => a.innerText)), "MET-01: sigue apareciendo «en preparación» en un momento");
    await p.evaluate(() => { location.hash = "herramientas"; }); await p.waitForTimeout(150);
    ok(await p.evaluate(() => [...document.querySelectorAll(".herr-c .diag")].every((d) => d.getAttribute("role") === "img" && (d.getAttribute("aria-label") || "").length > 5)), "ACC-01: los diagramas no tienen descripción accesible");
    await p.evaluate(() => { location.hash = "ficha"; }); await p.waitForTimeout(150);
    const ficha = await p.$eval("#app", (a) => a.innerText);
    ok(/vistas? derivadas?/i.test(ficha) || /se regeneran/i.test(ficha), "MEM-01: la página de memoria no explica historia frente a vistas derivadas");
    ok(/comprueba|comprobar/i.test(ficha), "MEM-02: la página de memoria no pide comprobar la capacidad de edición del entorno");
    await ctx.close();
  }

  // 6. Plan C: «Hazlo paso a paso» antes de «Con ayuda de IA (opcional)» y mensaje con método.
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } }); const p = await ctx.newPage();
    p.on("pageerror", (e) => f.push("Plan C pageerror " + e.message));
    await p.goto(base + "index.html#inicio"); await p.waitForTimeout(300);
    for (const sid of ["analizar-causas", "priorizar-soluciones", "planificar-prueba", "interpretar-resultados", "consolidar-mejora"]) {
      await p.evaluate((x) => { location.hash = "paso-" + x; }, sid); await p.waitForTimeout(180);
      const r = await p.evaluate(() => {
        const man = document.querySelector(".manual"), gen = document.querySelector(".gen");
        return {
          hayManual: !!man, hayGen: !!gen,
          orden: !!(man && gen && (man.compareDocumentPosition(gen) & Node.DOCUMENT_POSITION_FOLLOWING)),
          tituloManual: man ? man.querySelector(".manual-head b").textContent : "",
          tituloGen: gen ? gen.querySelector(".gen-head b").textContent : "",
          checks: document.querySelectorAll(".manual .checklist input[type=checkbox]").length,
          deshabilitados: [...document.querySelectorAll(".manual input, .manual button, #copiar")].filter((x) => x.disabled).length,
          calc: [...document.querySelectorAll(".manual .checklist input")].every((x) => getComputedStyle(x).display !== "none"),
          bloques: ["Antes de empezar", "Paso a paso con el equipo", "Cómo es un buen resultado", "Cuándo pasar al siguiente paso", "Qué guardar y dónde"].filter((t) => !man || !man.textContent.includes(t))
        };
      });
      ok(r.hayManual, `Plan C: ${sid} no muestra «Hazlo paso a paso»`);
      ok(r.hayGen, `Plan C: ${sid} no muestra el generador de mensaje`);
      ok(r.orden, `Plan C: en ${sid} el generador aparece antes del bloque manual`);
      ok(/Hazlo paso a paso/i.test(r.tituloManual), `Plan C: ${sid} no titula el bloque «Hazlo paso a paso»`);
      ok(/Con ayuda de IA \(opcional\)/i.test(r.tituloGen), `Plan C: ${sid} no titula el generador «Con ayuda de IA (opcional)»`);
      ok(r.checks >= 3 && r.checks <= 5, `Plan C: ${sid} tiene ${r.checks} comprobaciones (deben ser 3–5)`);
      ok(r.deshabilitados === 0, `Plan C: ${sid} deshabilita controles hasta marcar las comprobaciones`);
      ok(r.calc, `Plan C: ${sid} oculta las casillas de «Antes de empezar»`);
      ok(r.bloques.length === 0, `Plan C: ${sid} pierde bloques del manual: ${r.bloques.join(", ")}`);
      // Copiar funciona con las casillas sin marcar.
      await p.click("#copiar"); await p.waitForTimeout(150);
      const copia = await p.evaluate(() => ({ aviso: document.getElementById("aviso").textContent, prev: document.getElementById("preview").textContent }));
      ok(/Copiado|Selecciónalo/.test(copia.aviso), `Plan C: ${sid} no permite copiar con las comprobaciones sin marcar`);
      ok(copia.prev.includes("Método de esta actividad"), `Plan C: ${sid} (sinconfig) no incluye el método en el mensaje`);
      ok(copia.prev.length <= 2500, `Plan C: ${sid} supera 2500 caracteres (${copia.prev.length})`);
      // Marcar y desmarcar no bloquea ni rompe el mensaje.
      await p.check(".manual .checklist input"); await p.uncheck(".manual .checklist input"); await p.waitForTimeout(120);
      await p.click("#copiar"); await p.waitForTimeout(120);
      ok((await p.textContent("#preview")).length > 200, `Plan C: ${sid} el mensaje desaparece al usar las casillas`);
    }
    // Los pasos fuera del piloto siguen como hoy.
    await p.evaluate(() => { location.hash = "paso-recoger-contexto"; }); await p.waitForTimeout(150);
    const fuera = await p.evaluate(() => {
      const gen = document.querySelector(".gen"), res = document.querySelector(".resumen");
      return { manual: !!document.querySelector(".manual"), titulo: gen ? gen.querySelector(".gen-head b").textContent : "", orden: !!(gen && res && (res.compareDocumentPosition(gen) & Node.DOCUMENT_POSITION_FOLLOWING)) };
    });
    ok(!fuera.manual, "Plan C: un paso fuera del piloto muestra el bloque manual");
    ok(/Empieza con este mensaje/i.test(fuera.titulo), "Plan C: un paso fuera del piloto cambia el título del generador");
    ok(fuera.orden, "Plan C: un paso fuera del piloto cambia el orden de la página");
    // Con una plataforma configurada el mensaje es el de hoy (sin método).
    await p.selectOption("#plataforma", "chatgpt"); await p.waitForTimeout(150);
    await p.evaluate(() => { location.hash = "paso-analizar-causas"; }); await p.waitForTimeout(150);
    const conf = await p.textContent("#preview");
    ok(!conf.includes("Método de esta actividad"), "Plan C: con ChatGPT el mensaje incluye el método de nivel 2");
    ok(/^Usa la skill/.test(conf.trim()), "Plan C: con ChatGPT el mensaje no empieza como antes");
    // Impresión: el manual se imprime y el generador opcional no.
    await p.emulateMedia({ media: "print" }); await p.waitForTimeout(100);
    const imp = await p.evaluate(() => ({ man: getComputedStyle(document.querySelector(".manual")).display, gen: getComputedStyle(document.querySelector(".gen")).display }));
    ok(imp.man !== "none", "Plan C: el bloque manual no sale al imprimir");
    ok(imp.gen === "none", "Plan C: el generador sigue saliendo al imprimir");
    await ctx.close();
  }

  // 7. Plan C: 400 px de ancho y localStorage bloqueado.
  {
    const ctx = await b.newContext({ viewport: { width: 400, height: 900 } });
    await ctx.addInitScript(() => { Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("bloqueado"); } }); });
    const p = await ctx.newPage();
    p.on("pageerror", (e) => f.push("Plan C sin localStorage pageerror " + e.message));
    p.on("console", (m) => { if (m.type() === "error" && !/fonts\.g/.test(m.text())) f.push("Plan C sin localStorage console " + m.text()); });
    await p.goto(base + "index.html#paso-planificar-prueba"); await p.waitForTimeout(400);
    const r = await p.evaluate(() => ({ ov: document.documentElement.scrollWidth - document.documentElement.clientWidth, manual: !!document.querySelector(".manual"), checks: document.querySelectorAll(".manual .checklist input").length, metodo: document.getElementById("preview").textContent.includes("Método de esta actividad") }));
    ok(r.ov <= 0, `Plan C: desbordamiento a 400 px con localStorage bloqueado (${r.ov}px)`);
    ok(r.manual && r.checks >= 3, "Plan C: a 400 px no se ve el bloque manual");
    ok(r.metodo, "Plan C: con localStorage bloqueado no se prepara el mensaje");
    await p.check(".manual .checklist input"); await p.waitForTimeout(100);
    await p.click("#copiar"); await p.waitForTimeout(150);
    ok((await p.textContent("#aviso")).length > 0, "Plan C: con localStorage bloqueado no se puede copiar");
    await ctx.close();
  }

  await b.close();
  f.forEach((x) => console.log("FALLO", x));
  console.log(f.length ? `${f.length} fallos` : "sin errores");
  process.exit(f.length ? 1 : 0);
})();
