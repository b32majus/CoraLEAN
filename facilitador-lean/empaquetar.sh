#!/usr/bin/env bash
# Genera en dist/:
#   - <skill>.zip: carpeta de la skill con comun/ dentro (SKILL.md en la raíz de la carpeta)
#   - skills/<skill>/: las mismas carpetas sin comprimir (OpenCode, Claude Code)
#   - proyecto/: INSTRUCCIONES.md + coralean-completo.md, para usar en un Project de ChatGPT o Claude
set -euo pipefail

raiz="$(cd "$(dirname "$0")" && pwd)"
dist="$raiz/dist"
rm -rf "$dist"
mkdir -p "$dist/build" "$dist/proyecto"

for dir in "$raiz"/skills/*/; do
  skill="$(basename "$dir")"
  cp -r "$dir" "$dist/build/$skill"
  cp -r "$raiz/comun" "$dist/build/$skill/comun"
  (cd "$dist/build" && python3 -m zipfile -c "$dist/$skill.zip" "$skill")
  echo "OK  $skill.zip"
done
# Carpetas descomprimidas para OpenCode y Claude Code (~/.claude/skills, .opencode/skills o "skills" en opencode.json)
mv "$dist/build" "$dist/skills"

cp "$raiz/proyecto/INSTRUCCIONES.md" "$dist/proyecto/"
completo="$dist/proyecto/coralean-completo.md"
{
  echo "# CoraLEAN — conocimiento completo"
  echo
  for f in "$raiz"/comun/*.md; do
    echo "---"; echo "<!-- comun/$(basename "$f") -->"; cat "$f"; echo
  done
  for dir in "$raiz"/skills/*/; do
    skill="$(basename "$dir")"
    echo "---"; echo "# SKILL: $skill"; echo
    cat "$dir/SKILL.md"; echo
    find "$dir" -mindepth 2 -name '*.md' | sort | while read -r f; do
      echo "<!-- $skill/${f#"$dir"} -->"; cat "$f"; echo
    done
  done
} > "$completo"
echo "OK  proyecto/ ($(wc -c < "$completo") bytes)"

# Recursos de la guía web (guia/recursos): plantillas, ejemplos y descargas
rec="$raiz/guia/recursos"
rm -rf "$rec"
mkdir -p "$rec/plantillas" "$rec/ejemplos" "$rec/skills" "$rec/proyecto"
cp "$raiz/comun/plantilla-ficha-proyecto.md" "$rec/plantillas/ficha-proyecto.md"
for dir in "$raiz"/skills/*/; do
  skill="$(basename "$dir")"
  [ -d "$dir/plantillas" ] && cp "$dir"/plantillas/*.md "$rec/plantillas/"
  if [ -d "$dir/ejemplos" ]; then
    for f in "$dir"/ejemplos/*.md; do cp "$f" "$rec/ejemplos/$skill--$(basename "$f")"; done
  fi
done
cp "$dist"/*.zip "$rec/skills/"
cp "$dist"/proyecto/* "$rec/proyecto/"
echo "OK  guia/recursos"
