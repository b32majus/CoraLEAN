/* Diagramas esquemáticos de cada herramienta. Usan clases CSS para respetar el tema claro y oscuro. */
(function () {
  const W = 320, H = 180;
  const svg = (body, h = H) => `<svg viewBox="0 0 ${W} ${h}" aria-hidden="true" class="diagrama" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
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
    let b = defs + line(20, 90, 262, 90, "d-thick") + box(258, 70, 58, 40, "d-acc-soft") + t(287, 94, "Problema", "d-t");
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
    t(160, 172, "Se debate sobre todo lo ámbar y lo rojo", "d-ts"));


  D.histograma = () => {
    const v = [2, 5, 9, 12, 8, 5, 3, 2, 1]; let b = line(24, 156, 310, 156) + line(24, 156, 24, 14);
    v.forEach((x, i) => { b += box(30 + i * 30, 156 - x * 11, 26, x * 11, i === 3 ? "d-acc-fill" : "d-soft-fill", 1); });
    b += line(138, 20, 138, 156, "d-median") + t(142, 28, "mediana", "d-ts", "start");
    return svg(b + t(165, 174, "Días (intervalos) →", "d-ts"));
  };

  D.dispersion = () => {
    const p = [[40, 140], [55, 128], [70, 132], [85, 118], [100, 112], [115, 116], [130, 100], [145, 96], [160, 90], [175, 84], [190, 88], [205, 72], [220, 66], [235, 62], [250, 54], [265, 50], [280, 44]];
    let b = line(28, 156, 310, 156) + line(28, 156, 28, 14) + `<line x1="34" y1="146" x2="296" y2="38" class="d-line-dash"/>`;
    b += p.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" class="d-acc"/>`).join("");
    return svg(b + t(168, 174, "Variable que crees que influye →", "d-ts") + `<text x="14" y="86" class="d-ts" text-anchor="middle" transform="rotate(-90 14 86)">Resultado →</text>`);
  };

  D.control = () => {
    const ys = [92, 84, 98, 88, 94, 80, 90, 100, 86, 92, 40, 88, 96, 84];
    let b = line(20, 160, 310, 160) + line(20, 160, 20, 14) + line(20, 54, 310, 54, "d-line-dash") + line(20, 90, 310, 90, "d-median") + line(20, 126, 310, 126, "d-line-dash");
    b += t(306, 50, "límite superior", "d-ts", "end") + t(306, 86, "media", "d-ts", "end") + t(306, 140, "límite inferior", "d-ts", "end");
    b += `<polyline points="${ys.map((y, i) => `${28 + i * 20},${y}`).join(" ")}" class="d-acc-line" fill="none"/>` + ys.map((y, i) => `<circle cx="${28 + i * 20}" cy="${y}" r="3.5" class="${y < 54 ? "d-bad" : "d-acc"}"/>`).join("");
    return svg(b + t(228, 36, "señal: fuera de límites", "d-tbad"));
  };

  D.journey = () => {
    const et = ["Alta", "Casa", "Días 1–3", "Visita AP", "Empeora"], cara = [70, 120, 130, 80, 135];
    let b = et.map((e, i) => box(8 + i * 62, 10, 58, 24, "d-acc-soft") + t(37 + i * 62, 26, e, "d-ts")).join("");
    b += t(10, 52, "Cómo se siente", "d-ts", "start") + `<polyline points="${cara.map((y, i) => `${37 + i * 62},${y}`).join(" ")}" class="d-acc-line" fill="none"/>`;
    b += cara.map((y, i) => `<circle cx="${37 + i * 62}" cy="${y}" r="7" class="${y > 110 ? "d-bad" : "d-ok"}"/>`).join("");
    b += line(8, 100, 312, 100, "d-grid") + t(312, 96, "bien", "d-ts", "end") + t(312, 150, "mal", "d-ts", "end");
    return svg(b + t(160, 172, "Puntos de dolor: dónde la curva cae", "d-ts"));
  };

  D.experiencia = () => {
    const it = [["Me explicaron qué hacer", 45, 78], ["Sabía a quién llamar", 30, 72], ["No tuve que repetir", 40, 65]];
    let b = t(160, 16, "% de acuerdo · antes / después", "d-ts");
    it.forEach(([n, a, d], j) => { const y = 34 + j * 46; b += t(8, y, n, "d-t", "start") + box(8, y + 6, a * 2.6, 12, "d-soft-fill", 2) + t(14 + a * 2.6, y + 16, a + " %", "d-ts", "start") + box(8, y + 20, d * 2.6, 12, "d-acc-fill", 2) + t(14 + d * 2.6, y + 30, d + " %", "d-tacc", "start"); });
    return svg(b, 180);
  };

  /* ---- Ejemplos visuales con el caso ficticio (IC) ---- */
  D["ej-ishikawa"] = () => {
    const tt = (x, y, s, c = "d-ts", an = "middle") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${an}">${s}</text>`;
    let b = `<line x1="16" y1="120" x2="380" y2="120" class="d-thick"/><rect x="380" y="92" width="92" height="56" rx="4" class="d-acc-soft"/>` + tt(426, 116, "Reingreso", "d-tb") + tt(426, 132, "a 30 días");
    const fam = [["Personas", 60, 1, ["Cuidadora sin", "formación"]], ["Circuitos", 180, 1, ["Sin aviso", "a primaria"]], ["Medicación", 300, 1, ["Cambios no", "explicados"]], ["Sistemas", 60, -1, ["Sin alerta", "de alta"]], ["Entorno", 180, -1, ["Altas en fin", "de semana"]], ["Organización", 300, -1, ["Agenda de AP", "a 9 días"]]];
    fam.forEach(([n, x, d, c]) => {
      const y = d > 0 ? 30 : 210;
      b += `<line x1="${x}" y1="${y}" x2="${x + 56}" y2="120" class="d-line"/>` + tt(x, d > 0 ? 20 : 228, n, "d-tb");
      const cy = d > 0 ? 66 : 168;
      b += `<rect x="${x + 22}" y="${cy - 13}" width="76" height="30" rx="3" class="d-bad-soft"/>` + tt(x + 60, cy, c[0]) + tt(x + 60, cy + 12, c[1]);
    });
    return `<svg viewBox="0 0 480 240" aria-hidden="true" class="diagrama" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
  };

  D["ej-pareto"] = () => {
    const tt = (x, y, s, c = "d-ts", an = "middle") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${an}">${s}</text>`;
    const sv = (w, h, b) => `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true" class="diagrama" xmlns="http://www.w3.org/2000/svg">${defs}${b}</svg>`;
    const v = [[["Sin revisión", "precoz"], 14], [["Medicación"], 9], [["Autocuidado"], 6], [["Infección"], 3], [["Otros"], 2]]; let acc = 0, tot = 34; const pts = [];
    let b = `<line x1="24" y1="150" x2="410" y2="150" class="d-line"/><line x1="24" y1="150" x2="24" y2="14" class="d-line"/>`;
    v.forEach(([n, x], i) => { const h = x * 8, xx = 40 + i * 74; acc += x; b += `<rect x="${xx}" y="${150 - h}" width="56" height="${h}" rx="1" class="${i < 2 ? "d-acc-fill" : "d-soft-fill"}"/>` + tt(xx + 28, 145 - h, String(x)) + n.map((l, k) => tt(xx + 28, 164 + k * 12, l)).join(""); pts.push(`${xx + 28},${150 - (acc / tot) * 130}`); });
    b += `<polyline points="${pts.join(" ")}" class="d-line" fill="none"/>` + pts.map((p) => `<circle cx="${p.split(",")[0]}" cy="${p.split(",")[1]}" r="3" class="d-dot"/>`).join("");
    return sv(420, 200, b + tt(210, 196, "Motivo principal de 34 reingresos revisados (ficticio)"));
  };

  D["ej-histograma"] = () => {
    const v = [1, 3, 4, 6, 7, 5, 3, 2, 2, 1]; let b = line(24, 150, 310, 150) + line(24, 150, 24, 14);
    v.forEach((x, i) => { b += box(30 + i * 27, 150 - x * 17, 23, x * 17, i < 3 ? "d-acc-fill" : "d-soft-fill", 1) + t(41 + i * 27, 164, String(2 + i * 2), "d-ts"); });
    b += line(98, 16, 98, 150, "d-median") + t(102, 24, "objetivo: 7 días", "d-tacc", "start");
    return svg(b + t(165, 182, "Días del alta a la primera visita en AP (34 altas, ficticio)", "d-ts"), 190);
  };
  D["ej-dispersion"] = () => {
    const p = [[3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 1], [9, 0], [10, 1], [11, 0], [12, 1], [13, 1], [14, 1], [15, 0], [16, 1], [18, 1], [20, 1], [6, 1], [9, 0], [12, 0], [17, 1]];
    let b = line(28, 150, 310, 150) + line(28, 150, 28, 14) + t(22, 44, "Sí", "d-ts", "end") + t(22, 124, "No", "d-ts", "end");
    b += p.map(([d, r], i) => `<circle cx="${30 + d * 14}" cy="${r ? 40 + (i % 3) * 6 : 120 + (i % 3) * 6}" r="5" class="${r ? "d-bad" : "d-acc"}"/>`).join("");
    return svg(b + t(168, 168, "Días hasta la primera visita →", "d-ts") + t(168, 184, "¿Reingresó? (ficticio): más días, más reingresos", "d-ts"), 190);
  };
  D["ej-control"] = () => {
    const tt = (x, y, s, c = "d-ts", an = "middle") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${an}">${s}</text>`;
    const sv = (w, h, b) => `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true" class="diagrama" xmlns="http://www.w3.org/2000/svg">${defs}${b}</svg>`;
    const ys = [70, 76, 66, 74, 68, 78, 72, 112, 118, 116, 122, 120, 124, 118];
    let b = `<line x1="24" y1="160" x2="400" y2="160" class="d-line"/><line x1="24" y1="160" x2="24" y2="14" class="d-line"/>`;
    b += `<line x1="24" y1="44" x2="214" y2="44" class="d-line-dash"/><line x1="24" y1="72" x2="214" y2="72" class="d-median"/><line x1="24" y1="100" x2="214" y2="100" class="d-line-dash"/>`;
    b += tt(28, 40, "límite superior", "d-ts", "start") + tt(28, 96, "límite inferior", "d-ts", "start") + tt(210, 68, "media", "d-ts", "end");
    b += `<line x1="222" y1="14" x2="222" y2="160" class="d-line-dash"/>` + tt(228, 26, "cambio", "d-tacc", "start");
    b += `<polyline points="${ys.map((y, i) => `${36 + i * 26},${y}`).join(" ")}" class="d-acc-line" fill="none"/>` + ys.map((y, i) => `<circle cx="${36 + i * 26}" cy="${y}" r="4" class="d-acc"/>`).join("");
    b += tt(310, 146, "7 semanas seguidas bajo los límites", "d-tok") + tt(310, 92, "menos altas sin visita", "d-ts");
    return sv(420, 186, b + tt(210, 180, "% de altas sin visita en 7 días, por semana (ficticio) · más abajo = mejor"));
  };

  D["ej-matriz"] = () => {
    const tt = (x, y, s, c = "d-ts", an = "middle") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${an}">${s}</text>`;
    const sv = (w, h, b) => `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true" class="diagrama" xmlns="http://www.w3.org/2000/svg">${defs}${b}</svg>`;
    let b = `<line x1="40" y1="200" x2="410" y2="200" class="d-line"/><line x1="40" y1="200" x2="40" y2="12" class="d-line"/>`;
    b += `<rect x="44" y="16" width="180" height="88" class="d-ok-soft"/><rect x="226" y="16" width="180" height="88" class="d-acc-soft"/><rect x="44" y="106" width="180" height="90" class="d-soft"/><rect x="226" y="106" width="180" height="90" class="d-bad-soft"/>`;
    b += tt(52, 32, "Hacer ya", "d-tb", "start") + tt(234, 32, "Proyecto", "d-tb", "start") + tt(52, 190, "Si sobra tiempo", "d-ts", "start") + tt(234, 190, "Descartar", "d-ts", "start");
    [["Huecos de revisión", 70, 56, "d-ok"], ["Hoja de medicación", 70, 76, "d-ok"], ["Teléfono de referencia", 70, 96, "d-ok"], ["Alerta en urgencias", 252, 64, "d-warn"], ["Nueva consulta de IC", 252, 150, "d-bad"]].forEach(([n, x, y, c]) => { b += `<circle cx="${x}" cy="${y - 4}" r="6" class="${c}"/>` + tt(x + 10, y, n, "d-t", "start"); });
    return sv(420, 230, b + tt(225, 222, "Esfuerzo →") + `<text x="20" y="106" class="d-ts" text-anchor="middle" transform="rotate(-90 20 106)">Impacto →</text>`);
  };

  D["ej-impulsores"] = () => {
    const tt = (x, y, s, c = "d-ts", an = "middle") => `<text x="${x}" y="${y}" class="${c}" text-anchor="${an}">${s}</text>`;
    const sv = (w, h, b) => `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true" class="diagrama" xmlns="http://www.w3.org/2000/svg">${defs}${b}</svg>`;
    let b = `<rect x="6" y="80" width="96" height="56" rx="4" class="d-acc-soft"/>` + tt(54, 104, "Reingresos", "d-tb") + tt(54, 122, "23 % → 15 %");
    [[38, "Continuidad al alta", ["Aviso a primaria", "Huecos en 7 días"]], [108, "Autocuidado en casa", ["Hoja de medicación", "Educación con cuidadora"]], [178, "Detección precoz", ["Teléfono de referencia", "Alerta en urgencias"]]].forEach(([y, n, ideas]) => {
      b += `<rect x="140" y="${y - 16}" width="140" height="32" rx="4" class="d-box"/>` + tt(210, y + 4, n, "d-t") + `<line x1="140" y1="${y}" x2="102" y2="108" class="d-line" marker-end="url(#fl)"/>`;
      ideas.forEach((s, k) => { const yy = y + (k ? 12 : -12); b += `<rect x="318" y="${yy - 10}" width="150" height="20" rx="3" class="d-ok-soft"/>` + tt(393, yy + 4, s, "d-ts") + `<line x1="318" y1="${yy}" x2="280" y2="${y}" class="d-line" marker-end="url(#fl)"/>`; });
    });
    return sv(476, 216, b + tt(54, 30, "Objetivo", "d-tacc") + tt(210, 14, "Impulsores", "d-tacc") + tt(393, 14, "Ideas de cambio", "d-tacc"));
  };


  window.DIAGRAMAS = D;
})();
