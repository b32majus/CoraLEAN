# ADR-011 — Condiciones habilitantes del proyecto (Preparación)

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

La Preparación **no es un Área de razonamiento**. Las siete áreas de razonamiento (ADR-007) quedan sin área cero. En su lugar:

- **Condiciones habilitantes del proyecto** (término interno canónico; «Preparación» queda como término de interacción con el usuario): conjunto transversal de condiciones que el proyecto debe cumplir para activarse y mantenerse viable. Viven a nivel de proyecto, no dentro del mapa de áreas.
- **El Proyecto existe durante la preparación.** Desde que CoraLEAN empieza a trabajar sobre una iniciativa existe un Project State con estado **En preparación**. No hay pre-proyecto sin estado persistente.
- **Transición En preparación → Activo**: cuando las Condiciones habilitantes relevantes son suficientes **y** existe validación humana.
- **Criterios generalizados y proporcionales.** No hay requisitos universales: el criterio canónico es «autoridad y apoyo suficientes para el alcance del proyecto». Un patrocinador formal puede ser necesario cuando el proyecto excede la autoridad del Responsable local, pero no en todos. El mismo principio de proporcionalidad (alcance, riesgo, complejidad) aplica a equipo, tiempo protegido, acceso a datos y capacidad de observar el proceso.
- **La degradación durante un proyecto activo no tiene fuerza única.** Las Condiciones habilitantes se reevalúan cuando cambian, y la consecuencia depende del criterio y de la decisión afectada:
  - pérdida de apoyo no esencial → advertencia asesorada;
  - pérdida de autoridad, permisos, condiciones de seguridad o de un recurso imprescindible → condición estricta para las acciones afectadas, o exigencia de suspensión.
  No existe una regla «degrada → aviso asesorado».
- **Reactivación tras suspensión**: reevaluar las Condiciones habilitantes contra la realidad actual, con validación humana. El razonamiento de las áreas no se toca automáticamente (las reaperturas solo ocurren con evidencia nueva).
- **Estados del proyecto** como reglas de transición del estado: En preparación, Activo, Suspendido, Cancelado, Abandonado, Completado. Son reglas de transición/invariantes del Project State (clase 2 de ADR-010), con validación humana; no son decisiones del proyecto ni áreas.

## Contexto

METHOD_V0 trataba la Readiness como Fase 0 con criterios fijos (incluido «patrocinador» como requisito universal). El modelo de áreas de ADR-007 y la distinción entre condiciones sobre decisiones y reglas de transición del estado (ADR-010) permiten una solución más limpia: la viabilidad es una condición transversal a nivel de proyecto, con criterios proporcionales al alcance, y sin contaminar el mapa de razonamiento con un área administrativa.

## Consecuencias

### Positivas

- Un proyecto en preparación ya tiene estado persistente, historial y continuidad entre conversaciones.
- La proporcionalidad evita burocracia en mejoras pequeñas dentro de la autoridad local y exige lo justo en proyectos que exceden esa autoridad.
- La degradación de viabilidad produce la consecuencia correcta según el criterio afectado, no una respuesta genérica.

### Negativas

- Los criterios habilitantes concretos deben redactarse por perfil de proyecto (alcance/riesgo/complejidad), no como lista fija; es trabajo de la etapa de criterios.
- Distinguir «Preparación» (interacción) de «Condiciones habilitantes del proyecto» (estado) exige disciplina de vocabulario.
