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
    for (const [mid, sid] of [["eligiendo", "priorizar-soluciones"], ["probando", "planificar-prueba"]]) {
      await p.evaluate((x) => { location.hash = "momento-" + x; }, mid); await p.waitForTimeout(120);
      ok((await p.$$(`.lista-pasos a[href="#paso-${sid}"]`)).length === 1, `Plan B: el momento «${mid}» no muestra la skill ${sid} como paso`);
      ok((await p.$$(".orientacion #preview-orientacion")).length === 1, `Plan B: el momento «${mid}» ha perdido su bloque de orientación`);
    }
    for (const sid of ["analizar-causas", "priorizar-soluciones", "planificar-prueba"]) {
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

  await b.close();
  f.forEach((x) => console.log("FALLO", x));
  console.log(f.length ? `${f.length} fallos` : "sin errores");
  process.exit(f.length ? 1 : 0);
})();
