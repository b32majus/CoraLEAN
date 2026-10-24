/* Convierte Markdown sencillo en HTML. Todo se ejecuta en el navegador. */
(function () {
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    function inline(s) {
      return esc(s)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
        .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>")
        .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }
    function md(src) {
      const L = src.replace(/\r/g, "").split("\n"); let i = 0, out = "";
      const esTabla = (l) => /^\s*\|.*\|\s*$/.test(l);
      while (i < L.length) {
        let l = L[i];
        if (/^```/.test(l)) { let b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; out += `<pre><code>${esc(b.join("\n"))}</code></pre>`; continue; }
        if (/^\s*$/.test(l)) { i++; continue; }
        let m = l.match(/^(#{1,6})\s+(.*)$/);
        if (m) { const n = Math.min(m[1].length, 3); out += `<h${n}>${inline(m[2])}</h${n}>`; i++; continue; }
        if (/^\s*(-{3,}|\*{3,})\s*$/.test(l)) { out += "<hr>"; i++; continue; }
        if (/^\s*>/.test(l)) { let b = []; while (i < L.length && /^\s*>/.test(L[i])) b.push(L[i++].replace(/^\s*>\s?/, "")); out += `<blockquote>${md(b.join("\n"))}</blockquote>`; continue; }
        if (esTabla(l)) {
          let filas = []; while (i < L.length && esTabla(L[i])) filas.push(L[i++]);
          const celdas = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
          const cab = celdas(filas[0]); const cuerpo = filas.slice(1).filter((r) => !/^\s*\|?\s*:?-{2,}/.test(r));
          out += `<div class="tabla-w"><table><thead><tr>${cab.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${cuerpo.map((r) => `<tr>${celdas(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
          continue;
        }
        if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
          const lista = (base) => {
            const ord = /^\s*\d+\./.test(L[i]); let h = ord ? "<ol>" : "<ul>";
            while (i < L.length && /^\s*([-*]|\d+\.)\s+/.test(L[i])) {
              const ind = L[i].match(/^\s*/)[0].length;
              if (ind < base) break;
              if (ind > base) { h = h.replace(/<\/li>$/, "") + lista(ind) + "</li>"; continue; }
              h += `<li>${inline(L[i].replace(/^\s*([-*]|\d+\.)\s+/, "").replace(/^\[ \]\s*/, "☐ "))}</li>`; i++;
              while (i < L.length && /^\s{2,}\S/.test(L[i]) && !/^\s*([-*]|\d+\.)\s+/.test(L[i])) { h = h.replace(/<\/li>$/, " " + inline(L[i].trim()) + "</li>"); i++; }
            }
            return h + (ord ? "</ol>" : "</ul>");
          };
          out += lista(l.match(/^\s*/)[0].length); continue;
        }
        let p = [];
        while (i < L.length && !/^\s*$/.test(L[i]) && !/^(#{1,6}\s|```|\s*>|\s*([-*]|\d+\.)\s+)/.test(L[i]) && !esTabla(L[i])) p.push(L[i++].trim());
        out += `<p>${inline(p.join(" "))}</p>`;
      }
      return out;
    }
  window.MD = { md, inline, esc };
})();
