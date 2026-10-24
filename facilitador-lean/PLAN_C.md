# PLAN C — Piloto «sin IA» y «IA generalista» en 3 actividades

Lee primero `ESTADO.md` y `comun/reglas-comunes.md`. Principio: **las skills mejoran la experiencia, no la hacen posible.** Una persona sin formación Lean debe poder hacer cada actividad del piloto solo con la guía (nivel 1) o con una IA gratuita sin nada instalado (nivel 2).

## Alcance
Solo los pasos `analizar-causas`, `priorizar-soluciones` y `planificar-prueba` de `guia/assets/datos.js`. El resto de pasos no cambia (se extenderá si el piloto funciona).

## Qué hacer
1. **Nuevo bloque `manual` en cada paso del piloto** (en `datos.js`), que responda a cinco preguntas:
   - `antes`: 3–5 comprobaciones orientativas («Antes de empezar»). Nunca bloquean: si falta alguna, se avanza anotando lo pendiente.
   - `pasos`: instrucciones concretas para hacerlo con el equipo: qué preguntar, en qué orden, con qué material (enlaza a plantillas y herramientas existentes; no dupliques sus fichas).
   - `bienHecho`: cómo es un buen resultado + **un contraejemplo** breve (error típico), con el caso ficticio de IC del Área de Salud del Valle.
   - `avanzar`: criterios sencillos para saber si se puede pasar al siguiente paso o hay que investigar más; incluye cuándo pedir ayuda a un facilitador con experiencia.
   - `guardar`: qué resultado sale, dónde anotarlo (ficha / cuaderno / documento) y opciones para seguir.
   El contenido sale de los «Pasos», reglas y criterios del `SKILL.md` correspondiente: **una sola fuente**; no inventes método nuevo ni contradigas la skill.
2. **Mensaje autocontenido para IA generalista.** Cuando la plataforma es `sinconfig`, el mensaje copiado incluye, además de la petición actual, 6–10 puntos de método esenciales de esa actividad (p. ej. en causas: primero tú; separar hecho/observación/hipótesis/opinión; herramienta más sencilla que responda a la pregunta; qué evidencia falta; nada comprobado sin dato o validación explícita; cerrar con conclusión provisional, siguiente paso y qué guardar). Guárdalos en un campo `metodo` del paso; tamaño total del mensaje ≤ 2.500 caracteres. Mantén «primero tú»: la IA pregunta qué piensa la persona antes de proponer.
3. **Invertir la jerarquía de la página de actividad** (`app.js`) para los pasos que tengan `manual`: arriba «Hazlo paso a paso» (el bloque manual, con las casillas de «Antes de empezar»); debajo «Con ayuda de IA (opcional)» con el generador de mensaje actual. Los pasos sin `manual` siguen como hoy.
4. Las casillas son orientativas; si se recuerdan, solo en `localStorage` con try/catch y la página funciona sin él. Nada de gestor de proyectos.
5. Imprimible: el bloque manual debe salir bien en `imprimir.html` o con la impresión del navegador (sin romper estilos actuales).

## Reglas
- Español claro, jerga explicada, tono de `reglas-comunes.md`. Sin datos reales de pacientes.
- No cambies las skills (`skills/`) salvo para corregir una contradicción que encuentres; si lo haces, dilo en el informe.
- Puedes **añadir** tests en `tests/`; no debilites los existentes. No hagas commits ni publiques.

## Criterios de aceptación
1. Los 3 pasos del piloto tienen `manual` con `antes`, `pasos`, `bienHecho` (con contraejemplo), `avanzar` y `guardar`, y un `metodo` de 6–10 puntos.
2. Test: cada punto de `metodo` y de `avanzar` es coherente con su `SKILL.md` (al menos: las palabras clave del método — p. ej. «hipótesis», «opinión», «predicción», «equilibrio», «adoptar/adaptar/abandonar» — aparecen en ambos sitios).
3. En esos 3 pasos, la página muestra primero «Hazlo paso a paso» y después «Con ayuda de IA (opcional)»; los demás pasos no cambian (test).
4. Con `sinconfig`, el mensaje copiado incluye los puntos de `metodo` y mide ≤ 2.500 caracteres; con otras plataformas, el mensaje es el de hoy (test).
5. Las comprobaciones de «Antes de empezar» no impiden ver ni copiar nada (test).
6. La página funciona a 400 px de ancho y con `localStorage` bloqueado.
7. Las rutas a plantillas, ejemplos y herramientas citadas existen.
8. `tests/ejecutar.sh` termina en `TODO CORRECTO`.

## Informe final (breve)
Archivos modificados, salida final de `tests/ejecutar.sh`, desviaciones, contradicciones encontradas entre guía y skills, y dudas.
