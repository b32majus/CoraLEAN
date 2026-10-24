#!/usr/bin/env bash
# Verificación completa: empaqueta, valida skills y guía, y lanza las pruebas del navegador y del visor.
set -uo pipefail
raiz="$(cd "$(dirname "$0")/.." && pwd)"
cd "$raiz"
fallo=0
./empaquetar.sh >/dev/null || { echo "FALLO empaquetar.sh"; exit 1; }
python3 tests/validar_skills.py || fallo=1
node tests/validar_guia.cjs || fallo=1
puerto=$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1]); s.close()')
python3 -m http.server "$puerto" --bind 127.0.0.1 --directory "$raiz/guia" >/dev/null 2>&1 &
srv=$!
sleep 1
node tests/navegador.cjs "http://127.0.0.1:$puerto/" || fallo=1
node tests/visor.cjs "http://127.0.0.1:$puerto/" || fallo=1
kill "$srv" 2>/dev/null
if [ "$fallo" -eq 0 ]; then echo "TODO CORRECTO"; else echo "HAY FALLOS"; fi
exit "$fallo"
