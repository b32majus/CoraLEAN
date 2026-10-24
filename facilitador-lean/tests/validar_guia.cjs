// Valida referencias de la guía y frases prohibidas/obligatorias en las fuentes.
const fs = require("fs"), path = require("path");
const raiz = path.resolve(__dirname, ".."), guia = path.join(raiz, "guia");
global.window = {};
require(path.join(guia, "assets/datos.js")); require(path.join(guia, "assets/diagramas.js"));
const G = window.GUIA, D = window.DIAGRAMAS, f = [];
const ex = (p) => fs.existsSync(path.join(guia, p));
const P = (id) => G.pasos.find((p) => p.id === id);
G.pasos.forEach((p) => {
  (p.plantillas || []).forEach((id) => ex(`recursos/plantillas/${id}.md`) || f.push("plantilla " + id));
  (p.ejemplos || []).forEach((id) => ex(`recursos/ejemplos/${id}.md`) || f.push("ejemplo " + id));
  if (p.siguiente && !P(p.siguiente)) f.push("siguiente " + p.siguiente);
  ex(`recursos/skills/${p.skill}.zip`) || f.push("zip " + p.skill);
  (p.herramientas || []).forEach((h) => G.herramientas.find((x) => x.id === h) || f.push("herramienta " + h));
});
G.momentos.forEach((m) => { m.pasos.forEach((id) => P(id) || f.push("paso de momento " + id)); m.herramientas.forEach((h) => G.herramientas.find((x) => x.id === h) || f.push("herr de momento " + h)); });
G.cadaSesion.forEach((id) => P(id) || f.push("cadaSesion " + id));
Object.keys(G.plantillas).forEach((id) => ex(`recursos/plantillas/${id}.md`) || f.push("mapa plantillas " + id));
G.herramientas.forEach((h) => {
  if (!D[h.id]) f.push("diagrama " + h.id);
  if (h.ejemplo && !D[h.ejemplo.diag]) f.push("diagrama ejemplo " + h.id);
});
// Diagramas: decorativos para lectores de pantalla (la descripción la pone el contenedor).
Object.keys(D).forEach((k) => { const s = D[k](); if (!/^<svg[^>]*aria-hidden="true"/.test(s)) f.push("svg sin aria-hidden: " + k); });
// Duplicados retirados (auditoría): VSM y 5 porqués no repiten su diagrama como ejemplo.
["vsm", "porques"].forEach((id) => { const h = G.herramientas.find((x) => x.id === id); if (h && h.ejemplo && h.ejemplo.diag === id) f.push("ejemplo duplicado " + id); });
// Plataforma «sin configurar» y orientación en momentos sin actividades.
if (!G.plataformas.find((p) => p.id === "sinconfig")) f.push("falta plataforma sinconfig");
["porque", "eligiendo", "probando", "sosteniendo"].forEach((id) => { const m = G.momentos.find((x) => x.id === id); if (!m || !m.orientacion || !m.orientacion.mensaje) f.push("momento sin orientación " + id); });
// Plan B: los tres momentos muestran su skill como paso y conservan la orientación actualizada.
const planB = { porque: "analizar-causas", eligiendo: "priorizar-soluciones", probando: "planificar-prueba" };
Object.entries(planB).forEach(([mid, sid]) => {
  const m = G.momentos.find((x) => x.id === mid), p = P(sid);
  if (!p) { f.push("falta paso " + sid); return; }
  if (p.skill !== sid) f.push("paso " + sid + " con skill " + p.skill);
  if (p.momento !== mid) f.push("paso " + sid + " en momento " + p.momento);
  if (!(p.plantillas || []).length) f.push("paso sin plantilla " + sid);
  if (!(p.ejemplos || []).length) f.push("paso sin ejemplo " + sid);
  if (!m) return;
  if (!m.pasos.includes(sid)) f.push("momento " + mid + " sin " + sid);
  if (/Mientras preparamos/.test(m.orientacion.texto + m.orientacion.mensaje)) f.push("orientación sin actualizar " + mid);
});
// Frases prohibidas en las fuentes (no en dist/ ni guia/recursos/).
const prohibidas = ["se actualiza solo", "añaden la entrada solos", "Solo se debate", "Solo se debaten", "no lo reabras", "nunca se resume ni se reescribe lo anterior", "En cada sesión"];
const fuentes = [];
const recorrer = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) { if (!["dist", "recursos", "tests", "node_modules", ".git"].includes(e.name)) recorrer(p); }
  else if (/\.(md|js|html)$/.test(e.name) && !/^(PLAN_|REGISTRO_|PROMPTS_)/.test(e.name)) fuentes.push(p);
});
["comun", "skills", "proyecto", "guia"].forEach((d) => recorrer(path.join(raiz, d)));
fuentes.forEach((p) => { const t = fs.readFileSync(p, "utf8"); prohibidas.forEach((fr) => { if (t.includes(fr)) f.push(`frase prohibida «${fr}» en ${path.relative(raiz, p)}`); }); });
// Contrato del cuaderno: historia inmutable y vistas derivadas.
const cuad = fs.readFileSync(path.join(raiz, "comun/plantilla-cuaderno.md"), "utf8");
["Vistas derivadas", "Historia"].forEach((fr) => cuad.includes(fr) || f.push("plantilla-cuaderno sin «" + fr + "»"));
console.log(`guía: ${G.pasos.length} pasos, ${G.herramientas.length} herramientas`);
f.forEach((x) => console.log("FALLO", x));
process.exit(f.length ? 1 : 0);
