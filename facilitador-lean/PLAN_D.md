# PLAN D — Correcciones del piloto + cerrar el ciclo (interpretar y sostener)

Lee primero `ESTADO.md`, `comun/reglas-comunes.md`, `PLAN_C.md` (patrón `manual` + `metodo`) y, como modelo de forma, `skills/planificar-prueba/`. Objetivo: que un proyecto ficticio pueda recorrerse **de las causas a la decisión final y su mantenimiento**, sin IA (nivel 1) o con IA gratuita (nivel 2).

## Parte 1 — Correcciones metodológicas (auditoría de Cora)
Decisión del responsable: **no se exige dato medido** (en sanidad a menudo no existe), pero **consenso no es demostración causal**.
1. **Evidencia en `analizar-causas`** (skill, plantilla `mapa-causas`, ejemplo, `manual`/`metodo` de la guía). Sustituir «causa comprobada por validación del grupo» por estados que separen:
   - lo que el grupo constata del proceso (p. ej. «el aviso de alta no se produce sistemáticamente»: hecho observado/testimonial);
   - la relación causal con el problema (p. ej. «eso causa reingresos»).
   Estados propuestos: **comprobada con dato**, **hipótesis prioritaria respaldada por el grupo** (justifica una prueba pequeña exploratoria, con su incertidumbre explícita), **pendiente de confirmar**, **descartada**. Ajusta criterios de «avanzar» en analizar-causas y priorizar-soluciones: se puede avanzar con una hipótesis prioritaria si se dice que la prueba también sirve para aprender sobre la causa.
2. **`priorizar-soluciones`**: arrastrar la nueva clasificación al ejemplo y añadir que la matriz ponderada hace explícitos los criterios del equipo pero no convierte opiniones en datos ni demuestra que la ganadora sea mejor.
3. **`planificar-prueba`**: (a) si se cambian varias cosas a la vez (en el ejemplo: huecos de revisión precoz + aviso de alta el mismo día), declararlo como **intervención combinada** y explicar que no se podrá atribuir el efecto a un componente; (b) suavizar «2–4 semanas / 20–30 casos suelen bastar»: bastan para aprender sobre la **viabilidad**, no para demostrar eficacia clínica. Revisa también la herramienta de medición en `datos.js` (~línea 592) para que no contradiga esto.

## Parte 2 — Dos skills nuevas (Bloque 4)
| Skill | Momento | Hace | Salida |
|---|---|---|---|
| `interpretar-resultados` | `probando` | Comparar lo ocurrido con la predicción; leer un gráfico de serie temporal con reglas sencillas (tendencia, desplazamiento, rachas), revisar medidas de proceso y de equilibrio, distinguir «funcionó», «no funcionó» y **«los datos no bastan para saberlo»**; decidir adoptar / adaptar / abandonar / ampliar la prueba. | Hoja de interpretación + decisión justificada |
| `consolidar-mejora` | `sosteniendo` | Pasar de prueba a práctica habitual: estandarizar (quién, qué, cuándo), formar, control visual, responsable y medida de seguimiento con umbral de alarma, revisión a 1–3–6 meses, qué hacer si se degrada, cierre o escalado del proyecto. | Plan de sostenimiento en una página |

- Estructura y reglas como en el Plan B: `SKILL.md` (Para qué sirve, Entrada, Pasos, Salida, Cierre) + `plantillas/` + `ejemplos/`; «primero tú»; leen ficha y cuaderno; terminan con qué pasar a `cerrar-sesion`.
- Ejemplos con el caso ficticio de IC, coherentes con el ejemplo de `planificar-prueba`, e incluyendo **un resultado que no coincide con la predicción** y **una medida de equilibrio que empeora**.
- Revisa `evaluar-experiencia` y las herramientas `runchart`, `control`, `estandar`, `visual`, `a3`: enlázalas, no las dupliques.
- Registra las skills donde aparecen las existentes (guía `pasos` de `probando`/`sosteniendo`, README, `proyecto/INSTRUCCIONES.md`, empaquetado, REGISTRO_MEJORAS). Ambos pasos nuevos llevan `manual` y `metodo` según el patrón del Plan C. `siguiente`: planificar-prueba → interpretar-resultados → consolidar-mejora.

## Reglas
- No exigir dato medido en ninguna skill; sí exigir que se diga qué tipo de evidencia sostiene cada afirmación.
- «Guardar»: describe qué resultado sale y remite a `cerrar-sesion` para la entrada del cuaderno (no dupliques su plantilla).
- Sin datos reales de pacientes. Puedes añadir tests; no debilites los existentes. No hagas commits ni publiques.

## Criterios de aceptación
1. Ya no aparece «comprobada por validación del grupo» (ni equivalente) en skills, plantillas, ejemplos ni guía; los cuatro estados nuevos aparecen en skill, plantilla y manual (test).
2. El ejemplo de `planificar-prueba` declara la intervención combinada; ningún texto afirma que 2–4 semanas / 20–30 casos demuestren eficacia (test de frases).
3. Existen `interpretar-resultados` y `consolidar-mejora` con cabecera válida, plantilla y ejemplo; el ejemplo de interpretar incluye predicción no cumplida, equilibrio que empeora y la opción «los datos no bastan».
4. Los dos pasos nuevos tienen `manual` completo y `metodo` de 6–10 puntos coherente con su skill (los tests del Plan C se aplican a ellos).
5. Los momentos `probando` y `sosteniendo` muestran los pasos nuevos y conservan su `orientacion`.
6. Mensajes `sinconfig` ≤ 2.500 caracteres; rutas citadas existen.
7. `tests/ejecutar.sh` termina en `TODO CORRECTO` (skills: 20).

## Informe final (breve)
Archivos creados/modificados, salida final de los tests, desviaciones y dudas.
