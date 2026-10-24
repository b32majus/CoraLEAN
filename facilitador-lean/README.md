# CoraLEAN — skills y guía (v0.6, experimental en validación)

CoraLEAN acompaña a profesionales sanitarios que lideran proyectos de mejora: les ayuda a pensar el problema, preparar y conducir reuniones, entrevistar, procesar lo que pasa en cada sesión, elegir herramientas Lean y no perder el hilo del proyecto. No sustituye a quien lidera: le enseña a hacerlo mientras lo hace.

Funciona como **skills** (formato abierto `SKILL.md`) para ChatGPT, Claude y OpenCode o, como plan B, dentro de un **Project**. La **guía web** orienta al usuario y prepara los mensajes para su asistente.

## Principios

1. **Tres pilares:** razonamiento metodológico, aprendizaje durante el trabajo, continuidad y resultados utilizables.
2. **Mapa, no ruta:** siete preguntas (áreas de razonamiento) y seis momentos que orientan; no fases obligatorias. Volver atrás es normal.
3. **Primero tú:** la persona propone y CoraLEAN cuestiona y completa.
4. **Entregables:** solo ordenan y presentan lo trabajado y confirmado en la ficha; nunca hacen el A3 por el líder.
5. **La memoria del proyecto tiene tres capas:** la **ficha** (la foto de hoy, se sustituye), el **cuaderno** (la línea evolutiva en un único `.md`, solo se añade al final) y los documentos de trabajo en el registro. `cerrar-sesion` y `donde-estamos` aseguran la continuidad entre conversaciones. La guía incluye un visor local para leer cualquier `.md` con formato.

## Skills

| Skill | Para qué |
|---|---|
| `donde-estamos` | Retomar el proyecto: reconstruir el contexto desde la ficha, momento, alertas y siguiente paso |
| `recoger-contexto` | Ordenar todo lo que se sabe antes de empezar |
| `preguntame` | Interrogatorio al líder, pregunta a pregunta |
| `bocetar-proyecto` | Boceto, mapa de actores, plan de arranque, grupo núcleo y convocatoria. Ficha v0 |
| `planificar-entrevistas` | A quién entrevistar y guion por rol, con consentimiento de grabación |
| `procesar-reunion` | De la grabación o las notas: acta, documento del líder (o ficha de entrevista) y cambios a la ficha |
| `sintetizar-entrevistas` | Situación de partida para validar en grupo |
| `preparar-sesion` | Guion minuto a minuto (lanzamiento, validación, mapeo, seguimiento…) y convocatoria |
| `elegir-herramienta` | Una herramienta, por qué ahora, cuándo no y cómo empezar (29 herramientas) |
| `mapear-proceso` | Mapa por niveles asistenciales o VSM, con diagrama y hoja de recogida de tiempos |
| `comparar-con-estandar` | Brechas frente al PAI o protocolo y borrador de adaptación local |
| `cerrar-sesion` | Terminar sin perder nada: ficha actualizada y mensaje para retomar |
| `preparar-entregable` | Presentación de seguimiento que evoluciona e informe de continuidad, solo con lo trabajado y confirmado |
| `experiencia-paciente` | Modalidades de participación de pacientes (pros y contras), entrevistas, grupos y mapa de experiencia |
| `evaluar-experiencia` | PREMs validados y encuesta a profesionales, antes y después del cambio |

Los ejemplos usan un caso **ficticio**: adaptación del PAI de insuficiencia cardiaca en el "Área de Salud del Valle".

## Fuentes de referencia

- *Manual de Bolsillo Lean Healthcare*. Sociedad Española de Calidad Asistencial (SECA), 2025. https://calidadasistencial.es/manual-de-bolsillo-lean-healthcare/ — SECA ha autorizado la reinterpretación de sus ideas, con el manual original accesible y citado. Las fichas de CoraLEAN están escritas con palabras e imágenes propias.
- *Kit de Herramientas de QI Essentials*. Institute for Healthcare Improvement (IHI), 2017. https://www.ihi.org/es/library/tools/quality-improvement-essentials-toolkit — citado y enlazado; no se reproduce.

## Estructura

```
facilitador-lean/
├── comun/                 reglas comunes, privacidad y grabaciones, ficha y registro del proyecto
├── skills/<skill>/        SKILL.md + plantillas/ + recursos/ + ejemplos/
├── proyecto/              INSTRUCCIONES.md del plan B
├── guia/                  guía web estática (se publica en la rama gh-pages)
├── empaquetar.sh          genera dist/ (zips, carpetas para OpenCode, plan B) y los recursos de la guía
└── REGISTRO_MEJORAS.md    registro consolidado de mejoras y prioridades
```

## Instalación

Ejecuta `./empaquetar.sh`. Genera en `dist/`: un `.zip` por skill, `dist/skills/` (carpetas para OpenCode o `~/.claude/skills`) y `dist/proyecto/` (plan B: `INSTRUCCIONES.md` + `coralean-completo.md`). La guía web explica paso a paso cómo instalar en cada entorno.

## Pendiente

Ver `REGISTRO_MEJORAS.md` (modos Copilot y planes gratuitos tras verificarlos, imágenes propias de la experta, revisión de entornos con gestión de archivos, prioridad 3).
