# PLAN B — Skills del Bloque 3

Lee primero `ESTADO.md`, `comun/reglas-comunes.md` y, como **modelo de forma y tono**, `skills/sintetizar-entrevistas/` y `skills/mapear-proceso/`. Copia su estructura: `SKILL.md` + `plantillas/` + `ejemplos/`.

## Objetivo
Cubrir los momentos «Entendiendo por qué ocurre», «Eligiendo qué probar» y «Probando y adoptando cambios» con tres skills nuevas:

| Skill | Hace | Salida |
|---|---|---|
| `analizar-causas` | Pasar de síntomas y opiniones a causas comprobables: ordena las hipótesis (de la ficha o el cuaderno), propone la herramienta adecuada (5 porqués, Ishikawa, Pareto, dispersión) y diseña cómo comprobar cada causa con datos. | Mapa de causas: hipótesis → evidencia actual (hecho/supuesto/opinión) → cómo comprobarla → estado |
| `priorizar-soluciones` | Recoger las ideas (incluido el parking del cuaderno), vincular cada una a una causa y priorizarlas con criterios explícitos acordados por el grupo (impacto/esfuerzo y, si hace falta, matriz de criterios). | Lista priorizada con criterios, puntuación y por qué |
| `planificar-prueba` | Convertir la idea elegida en una prueba PDCA pequeña: predicción, alcance (dónde, quién, cuánto tiempo), medidas (resultado, proceso, equilibrio), cómo recoger datos y criterio para adoptar, adaptar o abandonar. | Plan de prueba en una página + hoja de seguimiento |

## Reglas
- Español claro, sin jerga sin explicar; tono y principios de `reglas-comunes.md` (incluido «primero tú»: el asistente pregunta lo que el líder piensa antes de proponer).
- Cada skill lee la ficha y el cuaderno si existen, y termina indicando qué anotar con `cerrar-sesion`.
- Ejemplos con el mismo caso ficticio del resto (continuidad tras el alta en IC, Área de Salud del Valle), coherentes con `skills/cerrar-sesion/ejemplos/ejemplo-cuaderno.md`. Sin datos reales de pacientes.
- No afirmar automatismos que el entorno no garantiza (redactar por capacidad, como en el Plan A).
- Registra las skills en todos los sitios donde aparecen las existentes (`grep -rl sintetizar-entrevistas` fuera de `tests/`, `dist/`, `guia/recursos/`): guía (`datos.js`: `pasos` de los momentos `porque`, `eligiendo`, `probando`), README, `proyecto/INSTRUCCIONES.md`, empaquetado, REGISTRO_MEJORAS.
- Puedes **añadir** tests en `tests/` (no debilitar los que hay). No hagas commits ni publiques.

## Criterios de aceptación
1. Existen las 3 carpetas con `SKILL.md` (cabecera `name` = carpeta, `description` ≤ 1024 car. que diga cuándo usarla), al menos una plantilla y un ejemplo cada una.
2. Cada `SKILL.md` tiene: Para qué sirve, Entrada, Pasos, Salida, y Cierre (qué pasar a `cerrar-sesion`).
3. `analizar-causas` distingue explícitamente hipótesis, causa comprobada y opinión, y no da una causa por buena sin dato o validación del grupo.
4. `priorizar-soluciones` exige que cada idea se vincule a una causa y que los criterios se acuerden antes de puntuar.
5. `planificar-prueba` incluye predicción, medida de equilibrio y criterio de decisión adoptar/adaptar/abandonar, y recuerda que probar no es adoptar.
6. Los momentos `porque`, `eligiendo` y `probando` de la guía muestran las nuevas skills como pasos **y conservan su bloque `orientacion`** (lo exigen los tests MET-01): actualiza el mensaje para que presente las skills en vez de decir que no hay; si `app.js` solo pinta la orientación cuando no hay pasos, ajústalo para que salga en ambos casos.
7. Las rutas citadas en las skills existen (lo comprueba `validar_skills.py`).
8. `tests/ejecutar.sh` termina en `TODO CORRECTO` (skills: 18).

## Informe final (breve)
Archivos creados/modificados, salida final de `tests/ejecutar.sh`, desviaciones y dudas.
