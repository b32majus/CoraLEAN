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
// Plan C: piloto «sin IA» y «IA generalista» en tres actividades.
const PILOTO = {
  "analizar-causas": ["hipótesis", "hecho", "supuesto", "opinión", "evidencia", "dato", "causa comprobada con dato", "hipótesis prioritaria", "pendiente de confirmar", "descartada", "proceso", "parking"],
  "priorizar-soluciones": ["causa comprobada con dato", "hipótesis prioritaria", "causa", "criterios", "pesos", "impacto", "esfuerzo", "puntuar", "prometedora", "opinión", "dato", "condici", "parking", "matriz"],
  "planificar-prueba": ["predicción", "alcance", "resultado", "proceso", "equilibrio", "adoptar", "adaptar", "abandonar", "probar no es adoptar", "dato de partida", "condici", "intervención combinada", "viabilidad"],
  "interpretar-resultados": ["predicción", "tendencia", "desplazamiento", "rachas", "funcionó", "no funcionó", "los datos no bastan", "resultado", "proceso", "equilibrio", "adoptar", "adaptar", "abandonar", "ampliar"],
  "consolidar-mejora": ["trabajo estándar", "formación", "control visual", "responsable", "umbral", "6 meses", "degrad", "cierre", "escala", "cerrar"]
};
const textoManual = (p) => [p.manual.bienHecho, p.manual.contraejemplo, p.manual.guardar, ...p.manual.antes, ...p.manual.pasos, ...p.manual.avanzar, ...p.metodo].join(" ").toLowerCase();
Object.entries(PILOTO).forEach(([sid, claves]) => {
  const p = P(sid);
  if (!p) { f.push("falta paso del piloto " + sid); return; }
  const m = p.manual, skill = fs.readFileSync(path.join(raiz, "skills", sid, "SKILL.md"), "utf8").toLowerCase();
  if (!m) { f.push("piloto sin manual: " + sid); return; }
  if (!Array.isArray(m.antes) || m.antes.length < 3 || m.antes.length > 5) f.push(`antes de ${sid} fuera de 3–5 comprobaciones`);
  if (!Array.isArray(m.pasos) || m.pasos.length < 3) f.push(`pasos de ${sid} insuficientes`);
  if (!Array.isArray(m.avanzar) || m.avanzar.length < 2) f.push(`avanzar de ${sid} insuficiente`);
  if (!m.bienHecho || !m.contraejemplo) f.push(`bienHecho/contraejemplo incompletos en ${sid}`);
  if (!/Área de Salud del Valle/.test(m.contraejemplo || "")) f.push(`contraejemplo de ${sid} sin el caso ficticio`);
  if (!m.guardar) f.push(`falta guardar en ${sid}`);
  if (!Array.isArray(p.metodo) || p.metodo.length < 6 || p.metodo.length > 10) f.push(`metodo de ${sid} fuera de 6–10 puntos`);
  const t = textoManual(p);
  claves.forEach((k) => {
    if (!skill.includes(k)) f.push(`clave «${k}» ausente en skills/${sid}/SKILL.md`);
    if (!t.includes(k)) f.push(`clave «${k}» ausente en el manual de ${sid}`);
  });
  [...p.metodo, ...m.avanzar].forEach((pt) => {
    if (!claves.some((k) => pt.toLowerCase().includes(k))) f.push(`punto sin anclaje metodológico en ${sid}: ${pt.slice(0, 45)}…`);
  });
  (m.recursos || []).forEach((r) => {
    if (r.tipo === "plantilla") ex(`recursos/plantillas/${r.id}.md`) || f.push(`recurso plantilla ${r.id} de ${sid}`);
    else if (r.tipo === "ejemplo") ex(`recursos/ejemplos/${r.id}.md`) || f.push(`recurso ejemplo ${r.id} de ${sid}`);
    else if (r.tipo === "herramienta") G.herramientas.find((x) => x.id === r.id) || f.push(`recurso herramienta ${r.id} de ${sid}`);
    else if (r.tipo === "imprimible") G.imprimibles[r.id] || f.push(`recurso imprimible ${r.id} de ${sid}`);
    else if (r.tipo === "paso") P(r.id) || f.push(`recurso paso ${r.id} de ${sid}`);
    else f.push(`tipo de recurso desconocido en ${sid}: ${r.tipo}`);
  });
  const pre = G.plataformas.find((x) => x.id === "sinconfig").prefijo(p.skill);
  let msg = p.plantilla;
  (p.campos || []).forEach((c) => { msg = msg.split(`{${c.id}}`).join(`[${c.etiqueta.toLowerCase()}]`); });
  if (p.ficha) msg += "\n\n(Usa la ficha del proyecto: está en los archivos del proyecto o te la adjunto.)";
  msg = pre + msg + G.textoMetodo(p);
  if (msg.length > 2500) f.push(`mensaje sin configurar de ${sid}: ${msg.length} caracteres`);
});
// Plan D: correcciones metodológicas y cierre del ciclo (interpretar y sostener).
const ESTADOS = ["comprobada con dato", "hipótesis prioritaria respaldada por el grupo", "pendiente de confirmar", "descartada"];
const tAnalizar = fs.readFileSync(path.join(raiz, "skills/analizar-causas/SKILL.md"), "utf8").toLowerCase();
const tPlantilla = fs.readFileSync(path.join(raiz, "skills/analizar-causas/plantillas/mapa-causas.md"), "utf8").toLowerCase();
const mAnalizar = textoManual(P("analizar-causas"));
ESTADOS.forEach((e) => {
  if (!tAnalizar.includes(e)) f.push(`estado «${e}» ausente en analizar-causas/SKILL.md`);
  if (!tPlantilla.includes(e)) f.push(`estado «${e}» ausente en mapa-causas.md`);
  if (!mAnalizar.includes(e)) f.push(`estado «${e}» ausente en el manual de analizar-causas`);
});
// El ejemplo de planificar declara la intervención combinada y no promete eficacia.
const tPlanEj = fs.readFileSync(path.join(raiz, "skills/planificar-prueba/ejemplos/ejemplo-plan-prueba.md"), "utf8").toLowerCase();
if (!tPlanEj.includes("intervención combinada")) f.push("el ejemplo de planificar-prueba no declara la intervención combinada");
if (!tPlanEj.includes("no demuestran eficacia clínica")) f.push("el ejemplo de planificar-prueba no aclara que no demuestra eficacia clínica");
// El ejemplo de interpretar incluye predicción no cumplida, equilibrio que empeora y los datos no bastan.
const tInterp = fs.readFileSync(path.join(raiz, "skills/interpretar-resultados/ejemplos/ejemplo-hoja-interpretacion.md"), "utf8").toLowerCase();
if (!tInterp.includes("no cumplida")) f.push("el ejemplo de interpretar no incluye una predicción no cumplida");
if (!/equilibrio[\s\S]{0,400}empeor/.test(tInterp)) f.push("el ejemplo de interpretar no incluye una medida de equilibrio que empeora");
if (!tInterp.includes("los datos no bastan")) f.push("el ejemplo de interpretar no incluye la opción «los datos no bastan»");
// Momentos, cadena de siguiente y enlaces a herramientas.
[["interpretar-resultados", "probando"], ["consolidar-mejora", "sosteniendo"]].forEach(([sid, mid]) => {
  const p = P(sid), m = G.momentos.find((x) => x.id === mid);
  if (!p) { f.push("falta paso " + sid); return; }
  if (p.skill !== sid) f.push("paso " + sid + " con skill " + p.skill);
  if (p.momento !== mid) f.push("paso " + sid + " en momento " + p.momento);
  if (!m || !m.pasos.includes(sid)) f.push("momento " + mid + " sin " + sid);
  if (!m || !m.orientacion || !m.orientacion.mensaje) f.push("momento " + mid + " sin orientación");
});
if (!P("interpretar-resultados") || P("planificar-prueba").siguiente !== "interpretar-resultados") f.push("planificar-prueba no encadena con interpretar-resultados");
if (!P("consolidar-mejora") || P("interpretar-resultados").siguiente !== "consolidar-mejora") f.push("interpretar-resultados no encadena con consolidar-mejora");
[["runchart", "interpretar-resultados"], ["control", "interpretar-resultados"], ["estandar", "consolidar-mejora"], ["visual", "consolidar-mejora"], ["a3", "consolidar-mejora"]].forEach(([hid, sid]) => {
  const h = G.herramientas.find((x) => x.id === hid);
  if (!h || h.skill !== sid) f.push(`herramienta ${hid} sin enlace a ${sid}`);
});
G.pasos.filter((p) => !PILOTO[p.id]).forEach((p) => {
  if (p.manual) f.push("manual fuera del piloto: " + p.id);
  if (p.metodo) f.push("metodo fuera del piloto: " + p.id);
});
// Frases prohibidas en las fuentes (no en dist/ ni guia/recursos/).
const prohibidas = ["se actualiza solo", "añaden la entrada solos", "Solo se debate", "Solo se debaten", "no lo reabras", "nunca se resume ni se reescribe lo anterior", "En cada sesión", "comprobada por validación", "validación explícita del grupo", "suelen bastar para empezar"];
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
