// Prueba del visor local del cuaderno. Uso: node tests/visor.cjs http://127.0.0.1:PUERTO/
const { chromium } = require(process.env.HOME + "/.npm-global/lib/node_modules/playwright");
const path = require("path");
const base = process.argv[2];
(async () => {
  const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = [], ext = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("request", (r) => { if (!r.url().startsWith(base) && !/fonts\.g/.test(r.url())) ext.push(r.url()); });
  await p.goto(base + "cuaderno.html"); await p.waitForTimeout(300);
  await p.setInputFiles("#archivo", path.resolve(__dirname, "../skills/cerrar-sesion/ejemplos/ejemplo-cuaderno.md")); await p.waitForTimeout(400);
  const r = await p.evaluate(() => ({ tablas: document.querySelectorAll("#doc table").length, crudo: /\*\*|^#{1,3} |\|---/m.test(document.getElementById("doc").innerText), visible: !document.getElementById("doc").hidden, ov: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  const f = [];
  if (!r.visible || r.tablas < 5) f.push("el visor no muestra el cuaderno con tablas");
  if (r.crudo) f.push("queda sintaxis Markdown visible");
  if (ext.length) f.push("peticiones externas: " + ext.join(", "));
  if (errs.length) f.push("errores: " + errs.join("; "));
  await b.close();
  f.forEach((x) => console.log("FALLO visor:", x));
  console.log(f.length ? "visor con fallos" : "visor sin errores");
  process.exit(f.length ? 1 : 0);
})();
