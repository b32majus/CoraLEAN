# Facilitador Lean — Bloques 1 y 2

Asistente para que profesionales sanitarios lideren proyectos de mejora: arrancar un proyecto, preparar y conducir reuniones, entrevistar, procesar grabaciones, elegir herramientas, mapear el proceso, comparar con el PAI y no perder el hilo. Funciona como **skills** (formato abierto `SKILL.md`) para ChatGPT y Claude o, como plan B, dentro de un **Project**.

## El flujo

```
FASE 0 · ARRANQUE
recoger-contexto → preguntame → bocetar-proyecto ─┬─→ planificar-entrevistas → (entrevistas grabadas)
                                                  │                                     │
                                                  │          procesar-reunion (entrevista) ┘
                                                  │                     │
                                                  │          sintetizar-entrevistas
                                                  ▼                     ▼
                       preparar-sesion: LANZAMIENTO  o  VALIDAR LA SITUACIÓN DE PARTIDA
                                                                        │
CICLO DE SESIONES ←─────────────────────────────────────────────────────┘
donde-estamos → preparar-sesion → (sesión grabada) → procesar-reunion → ficha actualizada → …
                     │
                     └─ elegir-herramienta → mapear-proceso / comparar-con-estandar / …
```

**La ficha del proyecto es la memoria.** Cada skill la pide al empezar y devuelve la versión actualizada al terminar. Guarda siempre la última versión y pégala o adjúntala en la siguiente conversación.

## Las skills

| Bloque | Skill | Para qué |
|---|---|---|
| 1 | `recoger-contexto` | Ordenar todo lo que se sabe antes de empezar |
| 1 | `preguntame` | Interrogatorio al líder, pregunta a pregunta |
| 1 | `bocetar-proyecto` | Boceto, mapa de actores, plan de arranque, grupo núcleo y convocatoria. Ficha v0 |
| 1 | `planificar-entrevistas` | A quién entrevistar y guion por rol |
| 1 | `procesar-reunion` | De la grabación o las notas: acta, documento del líder (o ficha de entrevista) y cambios a la ficha |
| 1 | `sintetizar-entrevistas` | Situación de partida para validar en grupo |
| 1 | `preparar-sesion` | Guion minuto a minuto (incluye **lanzamiento**, validación, mapeo y seguimiento) y convocatoria |
| 2 | `donde-estamos` | Momento del proyecto, semáforo de la ficha, alertas y siguiente paso |
| 2 | `elegir-herramienta` | Una herramienta, por qué ahora, cuándo no y cómo empezar |
| 2 | `mapear-proceso` | Mapa por niveles asistenciales o VSM, con diagrama y hoja de recogida de tiempos |
| 2 | `comparar-con-estandar` | Brechas frente al PAI o protocolo y borrador de adaptación local |

Los ejemplos usan un caso **ficticio**: adaptación del PAI de insuficiencia cardiaca en el "Área de Salud del Valle".

## Instalación

Ejecuta `./empaquetar.sh`. Genera en `dist/`:
- un `.zip` por skill;
- `dist/proyecto/` con `INSTRUCCIONES.md` y `facilitador-lean-completo.md` (todo el contenido en un solo archivo).

**Opción A, skills (recomendada):**
- **Claude:** Personalizar → Skills → subir cada `.zip`.
- **ChatGPT:** Skills (dentro de Plugins) → subir cada `.zip`.

**Opción B, Project (plan B, o si las skills no se pueden subir):**
1. Crea un Project en ChatGPT o Claude.
2. Pega el contenido de `INSTRUCCIONES.md` en las instrucciones del Project.
3. Sube `facilitador-lean-completo.md` como archivo del Project.
4. Guarda también la ficha del proyecto como archivo del Project y sustitúyela por la nueva versión cada vez que cambie.

## Para empezar un proyecto real

1. "Me han encargado [proyecto]. Te pego lo que tengo." → `recoger-contexto`.
2. "Pregúntame lo que falte." → `preguntame`.
3. "Haz el boceto." → `bocetar-proyecto` (ficha v0, actores, grupo, convocatoria).
4. "Prepara la reunión de lanzamiento del lunes, 90 minutos, con [roles]." → `preparar-sesion`.
5. Después de la reunión: "Te pego la transcripción." → `procesar-reunion`.

## Feedback que interesa recoger

- ¿Dónde has tenido que corregir al asistente? (copia la respuesta y tu corrección)
- ¿Qué preguntó que no aportaba? ¿Qué no preguntó y debería?
- ¿El guion se podía usar tal cual en la reunión? ¿Qué cambiaste?
- ¿Tuviste que volver a contar contexto en una conversación nueva?

## Pendiente (Bloque 3)

- `analizar-causas`, `priorizar-soluciones`, `planificar-prueba` (PDSA).
- Empaquetar como plugin único.
- Si SECA lo autoriza por escrito: incorporar el *Manual de Bolsillo Lean Healthcare* como recurso.
