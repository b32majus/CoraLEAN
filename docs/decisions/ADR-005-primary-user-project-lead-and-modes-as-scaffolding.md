# ADR-005 — El usuario primario es el Responsable local del proyecto; los modos son andamiaje, no identidad

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

El usuario primario del Core de CoraLEAN es el **Responsable local del proyecto** (Project Lead): la persona responsable de liderar el proyecto de mejora y que debe poder hacerlo con autonomía creciente gracias a CoraLEAN.

- El recorrido del usuario canónico se escribe desde la perspectiva del Responsable local.
- El modo **Guiado** es el comportamiento de referencia del contrato de comportamiento inicial, porque representa la mayor necesidad de soporte. Colaborativo (Partner) y Experto son reducciones de andamiaje sobre el mismo contrato metodológico, nunca métodos paralelos ni una vía para saltarse el rigor.
- **Rol** y **modo** son conceptos distintos. «Responsable local», «Facilitador/a», «Patrocinador/a» son roles; Guiado/Partner/Experto describen cómo interactúa CoraLEAN con una persona, no qué rol tiene. El nivel de experiencia es contexto que ajusta el andamiaje, no la identidad.
- En el piloto de Mérida, Silvia actúa principalmente como facilitadora/mentora/supervisora humana, no como la usuaria que define el Core. Cuando usa CoraLEAN directamente, usa el mismo Core, normalmente en modo Experto o Partner.
- La futura capacidad de supervisión compartida (que Silvia entre en un proyecto en vivo) pertenece al modelo de servicio/colaboración (ADR-003) y no debe contaminar el Core v0.1.
- Las intervenciones humanas de la facilitadora que alteren el curso del proyecto deben permanecer distinguibles de las recomendaciones y acciones de CoraLEAN, para poder evaluar honestamente la transferencia de capacidad.

## Contexto

El primer piloto (PROMueve Mérida) tiene dos personas muy distintas usando CoraLEAN a la vez: una facilitadora experta (Silvia) y una farmacéutica local sin experiencia previa liderando proyectos de mejora. Diseñar el Core en torno a la experta produciría un sistema que la novata nunca podrá usar con autonomía (transferencia de capacidad = 0 aunque el proyecto salga bien). Diseñarlo en torno a la novata con Silvia como caso especial fragmentaría el método. La estrella polar del producto (START_HERE.md, PRODUCT_VISION.md) es la transferencia de capacidad, así que el Core debe definirse desde la perspectiva de quien tiene que volverse capaz.

## Consecuencias

### Positivas

- Un solo contrato de comportamiento, definido en Guiado y reducido de forma consistente para los demás modos.
- La transferencia de capacidad se vuelve medible: la contribución de CoraLEAN y las intervenciones de la facilitadora humana son distinguibles en los registros.
- El Core no absorbe silenciosamente funciones de supervisión del modelo de servicio.

### Negativas

- Las facilitadoras expertas pueden percibir el Core como sobre-andamiaje; sus necesidades se atienden reduciendo andamiaje, no con un contrato de comportamiento divergente.
- Los registros del proyecto necesitan procedencia de las intervenciones (humana vs CoraLEAN), lo que añade disciplina de estado desde el principio.
