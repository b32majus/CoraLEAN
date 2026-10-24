# ESTADO — CoraLEAN (traspaso entre sesiones)

Última actualización: 2026-10-24

## Hecho
- v0.5 + Plan A (auditoría UX) + Plan B (analizar-causas, priorizar-soluciones, planificar-prueba): 18 skills, tests TODO CORRECTO.
- Rama `feat/facilitador-lean` (repo b32majus/CoraLEAN, proyecto en subcarpeta `facilitador-lean/`).
- Vista previa: https://b32majus.github.io/CoraLEAN/v04/ (raíz de gh-pages = v0.2, no tocar sin aprobación).

## Reglas fijas
- No fusionar a main. Sin datos de pacientes. Imágenes IA con pie «Imagen ilustrativa generada con IA»; no usar originales de Novartis.
- Fuera de alcance: autorización SECA y privacidad.

## Método de trabajo (barato para Claude)
- Claude: especificación de intención ≤1 página + 5–10 criterios de aceptación. Sin textos literales.
- OpenCode (build, deepseek-v4-flash): implementa y amplía tests; `tests/ejecutar.sh` debe quedar verde.
- Revisión: `git diff --stat`, cola de tests y 2–3 puntos de riesgo.
- Publicar: rsync del outbox a `<clon>/facilitador-lean/` (excluir dist, guia/recursos, .gitignore); gh-pages `/v04/` = copia de `guia/.` sin `.nojekyll`.

## Siguiente
1. (Plan B hecho y publicado en /v04/.) Pendiente decidir: ¿analizar-causas debe exigir siempre dato medido?
2. MEM-03: Sil prueba cierre/reanudación de sesión en ChatGPT/Claude reales.
3. Imágenes pendientes de `PROMPTS_IMAGENES.md`.
