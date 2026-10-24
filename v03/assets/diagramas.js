/* Diagramas esquemáticos de cada herramienta. Usan clases CSS para respetar el tema claro y oscuro. */
(function () {
  const W = 320, H = 180;
  const svg = (body, h = H) => `<svg viewBox="0 0 ${W} ${h}" role="img" class="diagrama" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const t = (x, y, s, cls = "d-t", anchor = "middle") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;
  const box = (x, y, w, h, cls = "d-box", r = 4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}"/>`;
  const line = (x1, y1, x2, y2, cls = "d-line") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const arrow = (x1, y1, x2, y2, cls = "d-line") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" marker-end="url(#fl)"/>`;
  const defs = `<defs><marker id="fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="d-head"/></marker></defs>`;

  const D = {};

  D.actores = () => svg(defs +
    line(40, 160, 300, 160) + line(40, 160, 40, 14) +
    box(44, 18, 124, 66, "d-soft") + box(172, 18, 124, 66, "d-acc-soft") +
    box(44, 88, 124, 66, "d-soft") + box(172, 88, 124, 66, "d-soft") +
    t(106, 46, "Mantener informado", "d-t") + t(106, 62, "y pedir apoyo", "d-ts") +
    t(234, 46, "Grupo núcleo", "d-tb") + t(234, 62, "o entrevista al inicio", "d-ts") +
    t(106, 116, "Informar", "d-t") +
    t(234, 116, "Entrevistar o incluir", "d-t") + t(234, 132, "(primera línea)", "d-ts") +
    t(170, 176, "Interés →", "d-ts") +
    `<text x="22" y="90" class="d-ts" text-anchor="middle" transform="rotate(-90 22 90)">Influencia →</text>`);

  D.sipoc = () => {
    const anchos = [54, 54, 76, 54, 54];
    let x = 7;
    return svg(["P", "E", "Proceso", "S", "C"].map((l, i) => {
      const w = anchos[i], xx = x; x += w + 4;
      return box(xx, 20, w, 140, i === 2 ? "d-acc-soft" : "d-soft") + t(xx + w / 2, 40, l, "d-tb") +
        [0, 1, 2].map((j) => box(xx + 8, 56 + j * 30, w - 16, 20, "d-box")).join("");
    }).join("") + t(160, 176, "Proveedores · Entradas · Proceso · Salidas · Clientes", "d-ts"));
  };

  D.carriles = () => {
    const lanes = ["Hospital", "Gestión de casos", "Primaria", "Paciente"];
    let b = defs;
    lanes.forEach((l, i) => { b += box(4, 8 + i * 42, 312, 40, i % 2 ? "d-soft" : "d-lane", 2) + t(10, 32 + i * 42, l, "d-ts", "start"); });
    b += box(92, 16, 54, 24) + box(156, 16, 54, 24) + box(156, 58, 54, 24) + box(222, 100, 54, 24) + box(222, 142, 54, 24, "d-bad-soft");
    b += arrow(146, 28, 156, 28) + arrow(183, 40, 183, 58) + arrow(210, 70, 249, 100) + arrow(249, 124, 249, 142, "d-line-dash");
    b += `<circle cx="196" cy="88" r="7" class="d-warn"/>` + t(196, 92, "!", "d-tw");
    return svg(b);
  };

  D.vsm = () => {
    let b = defs;
    const xs = [10, 92, 174, 256];
    xs.forEach((x, i) => { b += box(x, 20, 56, 34, "d-box") + t(x + 28, 41, `Paso ${i + 1}`, "d-ts"); if (i < 3) b += arrow(x + 56, 37, x + 82, 37); });
    b += `<polyline points="10,120 66,120 66,150 92,150 92,120 148,120 148,150 174,150 174,120 230,120 230,150 256,150 256,120 312,120" class="d-line" fill="none"/>`;
    b += t(38, 112, "20 min", "d-tacc") + t(120, 112, "30 min", "d-tacc") + t(202, 112, "5 min", "d-tacc") + t(284, 112, "20 min", "d-tacc");
    b += t(79, 168, "2 días", "d-tbad") + t(161, 168, "1 día", "d-tbad") + t(243, 168, "9 días", "d-tbad");
    b += t(160, 84, "Tiempo de proceso (arriba) frente a espera (abajo)", "d-ts");
    return svg(b, 180);
  };

  D.brechas = () => {
    const rows = [["Informe con signos de alarma", "d-warn", "En parte"], ["Aviso a primaria en 48 h", "d-bad", "No se cumple"], ["Visita en 7 días", "d-bad", "No se cumple"], ["Educación antes del alta", "d-warn", "En parte"], ["Informe disponible al alta", "d-ok", "Se cumple"]];
    return svg(rows.map((r, i) => box(8, 10 + i * 33, 304, 28, "d-soft") + t(18, 29 + i * 33, r[0], "d-t", "start") + `<circle cx="226" cy="${24 + i * 33}" r="7" class="${r[1]}"/>` + t(240, 28 + i * 33, r[2], "d-ts", "start")).join(""));
  };

  D.recogida = () => {
    let b = box(8, 10, 304, 26, "d-acc-soft", 2) + ["Nº", "Alta", "1.ª visita", "Días", "¿≤7?"].map((h, i) => t(30 + i * 64, 28, h, "d-tb")).join("");
    const rows = [["1", "02/11", "06/11", "4", "✓"], ["2", "03/11", "14/11", "11", "✗"], ["3", "05/11", "12/11", "7", "✓"], ["4", "07/11", "19/11", "12", "✗"]];
    rows.forEach((r, j) => { b += line(8, 64 + j * 30, 312, 64 + j * 30, "d-grid"); r.forEach((c, i) => { b += t(30 + i * 64, 56 + j * 30, c, i === 4 ? (c === "✓" ? "d-tok" : "d-tbad") : "d-t"); }); });
    return svg(b);
  };

  D.runchart = () => {
    const ys = [120, 104, 128, 112, 98, 116, 108, 84, 74, 80, 66, 70, 60];
    const pts = ys.map((y, i) => `${24 + i * 23},${y}`).join(" ");
    return svg(defs + line(20, 160, 310, 160) + line(20, 160, 20, 20) + line(20, 104, 310, 104, "d-median") + t(306, 98, "mediana", "d-ts", "end") +
      line(178, 24, 178, 160, "d-line-dash") + t(182, 34, "cambio", "d-tacc", "start") +
      `<polyline points="${pts}" class="d-acc-line" fill="none"/>` + ys.map((y, i) => `<circle cx="${24 + i * 23}" cy="${y}" r="3.5" class="d-acc"/>`).join("") +
      t(165, 176, "Semanas →", "d-ts"));
  };

  D.porques = () => {
    const s = ["Primaria no ve al paciente en 7 días", "No sabe que ha tenido el alta", "No recibe aviso", "El sistema no genera alerta", "No hay circuito alternativo"];
    return svg(defs + s.map((x, i) => box(10 + i * 14, 6 + i * 34, 240, 26, i === 4 ? "d-acc-soft" : "d-soft") + t(20 + i * 14, 23 + i * 34, x, i === 4 ? "d-tb" : "d-t", "start") + (i < 4 ? t(276, 34 + i * 34, "¿por qué?", "d-tacc") : "")).join(""), 180);
  };

  D.ishikawa = () => {
    let b = defs + line(20, 90, 262, 90, "d-thick") + box(262, 70, 54, 40, "d-acc-soft") + t(289, 94, "Problema", "d-tb");
    const fam = [["Personas", 60, 1], ["Métodos", 140, 1], ["Medicación", 220, 1], ["Sistemas", 60, -1], ["Entorno", 140, -1], ["Organización", 220, -1]];
    fam.forEach(([n, x, d]) => { const y = d > 0 ? 22 : 158; b += line(x, y, x + 34, 90) + t(x, d > 0 ? 16 : 172, n, "d-ts"); });
    return svg(b);
  };

  D.pareto = () => {
    const v = [42, 26, 14, 9, 5, 4]; let acc = 0; const pts = [];
    let b = line(20, 160, 300, 160) + line(20, 160, 20, 14);
    v.forEach((x, i) => { const h = x * 3.2, xx = 30 + i * 44; acc += x; b += box(xx, 160 - h, 34, h, i < 2 ? "d-acc-fill" : "d-soft-fill", 1); pts.push(`${xx + 17},${160 - acc * 1.4}`); });
    b += `<polyline points="${pts.join(" ")}" class="d-line" fill="none"/>` + pts.map((p) => `<circle cx="${p.split(",")[0]}" cy="${p.split(",")[1]}" r="3" class="d-dot"/>`).join("");
    b += line(20, 160 - 80 * 1.4, 300, 160 - 80 * 1.4, "d-line-dash") + t(298, 160 - 80 * 1.4 - 4, "80 %", "d-ts", "end");
    return svg(b + t(160, 176, "Causas ordenadas por frecuencia", "d-ts"));
  };

  D.matriz = () => svg(line(40, 160, 300, 160) + line(40, 160, 40, 14) +
    box(44, 18, 124, 66, "d-ok-soft") + box(172, 18, 124, 66, "d-acc-soft") + box(44, 88, 124, 66, "d-soft") + box(172, 88, 124, 66, "d-bad-soft") +
    t(106, 50, "Hacer ya", "d-tb") + t(106, 66, "alto impacto, poco esfuerzo", "d-ts") +
    t(234, 50, "Proyecto", "d-tb") + t(234, 66, "planificar", "d-ts") +
    t(106, 122, "Si sobra tiempo", "d-t") + t(234, 122, "Descartar", "d-t") +
    t(170, 176, "Esfuerzo →", "d-ts") + `<text x="22" y="90" class="d-ts" text-anchor="middle" transform="rotate(-90 22 90)">Impacto →</text>`);

  D.pdca = () => {
    const c = [160, 90], r = 70;
    const q = [["Planificar", "con predicción", -1, -1], ["Hacer", "en pequeño", 1, -1], ["Comprobar", "frente a la predicción", 1, 1], ["Actuar", "adoptar · adaptar · abandonar", -1, 1]];
    let b = defs + `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" class="d-soft"/>` + line(c[0] - r, c[1], c[0] + r, c[1]) + line(c[0], c[1] - r, c[0], c[1] + r);
    q.forEach(([n, s, dx, dy]) => { b += t(c[0] + dx * 36, c[1] + dy * 30, n, "d-tb") + t(c[0] + dx * 36, c[1] + dy * 30 + 14, s, "d-ts"); });
    b += `<path d="M ${c[0] + r + 12} ${c[1] - 30} A ${r + 12} ${r + 12} 0 0 1 ${c[0] + r + 12} ${c[1] + 30}" class="d-acc-line" fill="none" marker-end="url(#fl)"/>`;
    return svg(b);
  };

  D.impulsores = () => {
    let b = defs + box(6, 70, 70, 40, "d-acc-soft") + t(41, 88, "Objetivo", "d-tb") + t(41, 102, "medible", "d-ts");
    [[30, "Impulsor 1"], [90, "Impulsor 2"], [150, "Impulsor 3"]].forEach(([y, n]) => {
      b += box(108, y - 14, 84, 28) + t(150, y + 4, n, "d-t") + arrow(108, y, 76, 90);
      [-10, 10].forEach((d) => { b += box(226, y + d - 9, 88, 18, "d-ok-soft") + t(270, y + d + 4, "idea de cambio", "d-ts") + arrow(226, y + d, 192, y); });
    });
    return svg(b);
  };

  D.gemba = () => {
    let b = defs + box(10, 20, 300, 120, "d-lane", 6) + t(160, 40, "Donde ocurre el trabajo", "d-ts");
    [[50, 110], [80, 96], [110, 112], [140, 98], [170, 114], [200, 100]].forEach(([x, y], i) => { b += `<ellipse cx="${x}" cy="${y}" rx="7" ry="11" class="${i % 2 ? "d-soft-fill" : "d-acc-fill"}" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`; });
    b += `<circle cx="252" cy="88" r="26" class="d-acc-soft"/><circle cx="252" cy="88" r="10" class="d-acc"/>` + t(252, 128, "observar", "d-tacc");
    b += t(110, 160, "1. Ve   2. Observa   3. Pregunta   4. Anota hechos", "d-ts");
    return svg(b, 170);
  };

  D.desperdicios = () => {
    const w = ["Esperas", "Traslados", "Movimientos", "Sobreproceso", "Stock", "Hacer de más", "Errores", "Talento"];
    return svg(w.map((n, i) => { const x = 8 + (i % 4) * 78, y = 14 + Math.floor(i / 4) * 78; return box(x, y, 72, 70, i === 0 ? "d-bad-soft" : "d-soft") + t(x + 36, y + 30, String(i + 1), "d-tacc") + t(x + 36, y + 50, n, "d-t"); }).join(""), 180);
  };

  D.spaghetti = () => {
    let b = box(8, 8, 304, 164, "d-lane", 2) + box(20, 20, 60, 40) + t(50, 44, "Control", "d-ts") + box(240, 20, 60, 40) + t(270, 44, "Almacén", "d-ts") + box(20, 120, 60, 40) + t(50, 144, "Hab. 1", "d-ts") + box(240, 120, 60, 40) + t(270, 144, "Hab. 8", "d-ts") + box(130, 70, 60, 40) + t(160, 94, "Farmacia", "d-ts");
    b += `<path d="M50 60 C 120 140, 200 10, 270 60 S 120 170, 50 120 S 220 30, 160 70 S 300 170, 270 120 S 40 90, 50 60" class="d-bad-line" fill="none"/>`;
    return svg(b);
  };

  D.amfe = () => {
    const h = ["Paso", "Fallo", "G", "F", "D", "Riesgo"], xs = [8, 70, 168, 196, 224, 254];
    let b = box(8, 10, 304, 24, "d-acc-soft", 2) + h.map((s, i) => t(xs[i] + 4, 27, s, "d-tb", "start")).join("");
    [["Alta", "Sin aviso a AP", 8, 7, 6, "336"], ["Alta", "Cambio de dosis no explicado", 9, 5, 5, "225"], ["Visita", "Cita tardía", 6, 8, 3, "144"]].forEach((r, j) => {
      const y = 56 + j * 36; b += line(8, y + 12, 312, y + 12, "d-grid");
      r.forEach((c, i) => { b += t(xs[i] + 4, y, String(c), i === 5 ? (j === 0 ? "d-tbad" : "d-t") : (i === 1 ? "d-ts" : "d-t"), "start"); });
    });
    return svg(b + t(160, 172, "Riesgo = gravedad × frecuencia × detección", "d-ts"));
  };

  D.ponderada = () => {
    const rows = [["Seguridad", "×3", "4", "8"], ["Experiencia", "×2", "5", "7"], ["Tiempo prof.", "×2", "6", "6"], ["Coste", "×1", "8", "5"]];
    let b = box(8, 10, 304, 24, "d-acc-soft", 2) + ["Criterio", "Peso", "Opción A", "Opción B"].map((s, i) => t([14, 120, 182, 252][i], 27, s, "d-tb", "start")).join("");
    rows.forEach((r, j) => { const y = 56 + j * 26; b += line(8, y + 9, 312, y + 9, "d-grid") + r.map((c, i) => t([14, 120, 196, 266][i], y, c, i === 1 ? "d-tacc" : "d-t", "start")).join(""); });
    b += t(14, 170, "Total", "d-tb", "start") + t(196, 170, "42", "d-t", "start") + t(266, 170, "57", "d-tok", "start");
    return svg(b, 180);
  };

  D.estandar = () => {
    let b = box(60, 10, 200, 160, "d-box", 4) + t(160, 32, "Trabajo estándar", "d-tb");
    ["Paso 1 · qué y cómo", "Paso 2 · punto clave", "Paso 3 · por qué", "Revisado: (fecha)"].forEach((s, i) => { b += box(76, 46 + i * 30, 14, 14, i < 3 ? "d-ok-soft" : "d-soft", 2) + t(98, 57 + i * 30, s, i === 3 ? "d-ts" : "d-t", "start"); });
    return svg(b);
  };

  D.visual = () => {
    let b = box(8, 8, 304, 164, "d-box", 4) + t(160, 26, "Panel del equipo", "d-tb");
    b += box(18, 36, 140, 90, "d-soft") + `<polyline points="26,110 46,100 66,104 86,86 106,80 126,70 146,64" class="d-acc-line" fill="none"/>` + t(88, 140, "Indicador", "d-ts");
    [["Problemas de hoy", "d-bad-soft"], ["Acciones", "d-ok-soft"]].forEach(([n, c], i) => { b += box(168, 36 + i * 64, 134, 54, c) + t(235, 56 + i * 64, n, "d-t"); });
    return svg(b + t(235, 160, "Reunión breve, de pie", "d-ts"));
  };

  D.cincos = () => {
    const s = ["Separar", "Ordenar", "Limpiar", "Estandarizar", "Mantener"];
    let b = defs;
    s.forEach((n, i) => { const a = (-90 + i * 72) * Math.PI / 180, x = 160 + 64 * Math.cos(a), y = 90 + 64 * Math.sin(a); b += `<circle cx="${x}" cy="${y}" r="24" class="${i === 4 ? "d-acc-soft" : "d-soft"}"/>` + t(x, y - 2, `${i + 1}`, "d-tacc") + t(x, y + 11, n, "d-ts"); });
    return svg(b + t(160, 94, "5S", "d-tb"));
  };

  D.a3 = () => {
    let b = box(6, 6, 308, 168, "d-box", 2) + line(160, 6, 160, 174);
    const izq = ["1. Contexto", "2. Situación actual", "3. Objetivo", "4. Análisis de causas"], der = ["5. Contramedidas", "6. Plan", "7. Seguimiento"];
    izq.forEach((s, i) => { b += line(6, 6 + (i + 1) * 42, 160, 6 + (i + 1) * 42, "d-grid") + t(14, 24 + i * 42, s, "d-ts", "start"); });
    der.forEach((s, i) => { b += line(160, 6 + (i + 1) * 56, 314, 6 + (i + 1) * 56, "d-grid") + t(168, 24 + i * 56, s, "d-ts", "start"); });
    return svg(b);
  };

  D.semaforo = () => svg(
    [["d-ok", "Verde", "Es así"], ["d-warn", "Ámbar", "En parte"], ["d-bad", "Rojo", "No es así"]].map(([c, n, s], i) =>
      `<circle cx="${60 + i * 100}" cy="72" r="30" class="${c}"/>` + t(60 + i * 100, 128, n, "d-tb") + t(60 + i * 100, 146, s, "d-ts")).join("") +
    t(160, 172, "Solo se debate lo ámbar y lo rojo", "d-ts"));

  window.DIAGRAMAS = D;
})();
