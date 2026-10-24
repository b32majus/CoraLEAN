#!/usr/bin/env python3
"""Valida las skills: cabecera, nombre = carpeta, descripción <= 1024 y rutas citadas existentes."""
import re, sys, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
fallos, n = [], 0
for s in sorted((raiz / "skills").glob("*/SKILL.md")):
    n += 1
    t = s.read_text()
    m = re.match(r"^---\nname: (.+)\ndescription: (.+)\n---\n", t)
    if not m:
        fallos.append(f"{s.parent.name}: cabecera inválida"); continue
    if not re.fullmatch(r"[a-z0-9-]{1,64}", m.group(1)) or m.group(1) != s.parent.name:
        fallos.append(f"{s.parent.name}: name no coincide con la carpeta")
    if len(m.group(2)) > 1024:
        fallos.append(f"{s.parent.name}: descripción de {len(m.group(2))} caracteres")
    for r in re.findall(r"`((?:plantillas|recursos|ejemplos|comun)/[^`]+?\.md)`", t):
        if not ((s.parent / r).exists() or (r.startswith("comun/") and (raiz / r).exists())):
            fallos.append(f"{s.parent.name}: falta {r}")
print(f"skills: {n}")
if n != 20:
    fallos.append(f"se esperaban 20 skills y hay {n}")
# Plan B y Plan D: las skills nuevas deben tener secciones completas, plantilla, ejemplo y contenido mínimo.
secciones = ["## Para qué sirve", "## Entrada", "## Pasos", "## Salida", "## Cierre"]
nuevas = {
    "analizar-causas": ["hipótesis", "causa comprobada con dato", "opinión", "hipótesis prioritaria"],
    "priorizar-soluciones": ["criterio", "causa", "matriz"],
    "planificar-prueba": ["predicción", "equilibrio", "adoptar", "abandonar", "intervención combinada"],
    "interpretar-resultados": ["predicción", "tendencia", "desplazamiento", "rachas", "funcionó", "no funcionó", "los datos no bastan", "adoptar", "adaptar", "abandonar", "ampliar"],
    "consolidar-mejora": ["trabajo estándar", "formación", "control visual", "responsable", "umbral", "1, 3 y 6", "degrad", "cierre", "escala"],
}
for nombre, palabras in nuevas.items():
    s = raiz / "skills" / nombre / "SKILL.md"
    if not s.exists():
        fallos.append(f"{nombre}: falta la skill"); continue
    t = s.read_text()
    for sec in secciones:
        if sec not in t:
            fallos.append(f"{nombre}: falta la sección «{sec[3:]}»")
    for sub in ("plantillas", "ejemplos"):
        if not list((s.parent / sub).glob("*.md")):
            fallos.append(f"{nombre}: falta al menos un archivo en {sub}/")
    for palabra in palabras:
        if palabra not in t.lower():
            fallos.append(f"{nombre}: no menciona «{palabra}»")
for f in fallos: print("FALLO", f)
sys.exit(1 if fallos else 0)
