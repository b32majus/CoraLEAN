# ADR-010 — Taxonomía de condiciones de avance: fuerza y requisito de autorización humana

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

Toda condición de avance se clasifica en **dos ejes independientes**:

### Eje A — Fuerza de la condición

- **Estricta**: si no se cumple, la decisión correspondiente no puede considerarse válida. Una razón registrada no la salta; la única salida es cumplirla o, si el criterio deja de ser necesario, reevaluar y reclasificar su relevancia.
- **Asesorada**: CoraLEAN advierte y el avance puede continuar con razón documentada (la razón es estado, no conversación perdida).

### Eje B — Requisito de autorización humana

- **Sin validación adicional**: CoraLEAN puede derivar el estado o la elegibilidad desde el Project State; no se requiere una confirmación humana específica para esa actualización del modelo.
- **Validación humana explícita**: requiere la confirmación de una persona.
- **Aprobación de rol**: requiere la aprobación de un rol concreto (Responsable local del proyecto, Patrocinador/a u otro rol competente según el caso).

**Límite de autoridad:** CoraLEAN puede derivar condiciones, recomendar acciones y mantener el modelo de estado, pero la ejecución de cambios reales en la organización es siempre humana. CoraLEAN nunca tiene autoridad organizativa: «derivable» describe actualizaciones del modelo, no decisiones del mundo real.

### Tipos de regla

Se distinguen dos clases de reglas:

1. **Condiciones aplicadas a decisiones** — se evalúan cuando alguien intenta tomar una decisión (p. ej., comprometer una intervención, adoptar un estándar).
2. **Invariantes y requisitos de transición del Project State** — gobiernan la derivación y los cambios de estado del propio modelo (p. ej., el invariante de suficiencia; los requisitos para declarar un proyecto completado, abandonado, suspendido o cancelado). Funcionalmente actúan como restricciones, pero no son decisiones del proyecto: son reglas del estado.

### Matriz de tipos de decisión

| Tipo de decisión | Fuerza | Requisito de autorización humana |
|---|---|---|
| Registrar idea de cambio | — (siempre permitido; se registra con su estatus) | Sin validación adicional |
| Planificar experimento exploratorio para aprender | Asesorada (aviso si no está ligada a causa) — sujeta a las cuatro condiciones de abajo | Sin validación adicional |
| Impulsar/comprometer intervención relevante | **Estricta**: justificación causal proporcional a riesgo, coste, alcance y reversibilidad | Sin validación adicional (la detección es derivable) |
| Adoptar como estándar | **Estricta**: evidencia suficiente para esa adopción (proporcional al alcance) | **Validación humana explícita** |
| Cambio de alcance fuera de la autoridad declarada del Responsable | **Estricta** | **Aprobación de rol** competente |
| Declarar proyecto completado | **Estricta**: evaluación + aprendizaje explícitos (requisito de transición) | **Validación humana explícita** |
| Declarar abandonado/suspendido/cancelado | Razón registrada obligatoria (requisito de transición); captura de aprendizaje asesorada | **Validación humana explícita** |
| Avanzar con criterios pendientes ordinarios | Asesorada, con razón documentada | Sin validación adicional |

### Experimentos exploratorios

Un experimento pequeño/reversible para aprender puede realizarse sin comprensión causal completa **solo cuando**:

1. sea de bajo riesgo;
2. esté dentro de la autoridad declarada;
3. sea razonablemente reversible;
4. no active requisitos adicionales de seguridad, privacidad, cumplimiento o gobernanza.

«Pequeño» no equivale automáticamente a «libre de aprobación»: si un experimento activa cualquiera de esos requisitos, se aplica el requisito de autorización correspondiente.

### Reglas mantenidas

- Ideación temprana siempre permitida y registrada con estatus.
- Probar ≠ adoptar (ADR-007).
- Adopción/estandarización exige evidencia suficiente y validación humana.
- Cambios fuera de autoridad exigen aprobación del rol competente.
- La proporcionalidad (riesgo, coste, alcance, reversibilidad) calibra tanto la justificación causal como la evidencia de adopción; su codificación en criterios se hará en la etapa de criterios por área.

## Contexto

Una primera propuesta de taxonomía mezclaba fuerza y autoridad en un único eje («revisión humana» era autoridad disfrazada de fuerza). La revisión la separó, reformuló la restricción causal (prohibir impulsar, no idear) y convirtió una de las «condiciones estrictas» en un invariante de derivación (enmienda a ADR-008).

## Consecuencias

### Positivas

- El freno anti-solución-prematura opera sobre compromisos, no sobre el pensamiento.
- La autoridad organizativa queda explícitamente fuera de CoraLEAN.
- Los requisitos de transición del estado quedan separados de las decisiones del proyecto.

### Negativas

- La matriz asume que el alcance y la autoridad declarada están en el Project State (obligación para el contrato de estado).
- La proporcionalidad exige criterios con ejes de envergadura (coste, riesgo, reversibilidad, alcance), no triviales de redactar.
