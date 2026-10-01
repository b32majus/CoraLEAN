# ADR-013 — Arquitectura de conocimiento: fuentes, afirmaciones y tarjetas

**Fecha:** 2026-10-01
**Estado:** Aceptada

## Decisión

La capa de conocimiento de CoraLEAN (que operacionaliza la arquitectura de procedencia de ADR-004) tiene esta **granularidad conceptual congelada**:

- **Fuente** — documento/organización/URL/fecha/metadatos. No es conocimiento en sí; es la referencia.
- **Afirmación** (bloque de conocimiento) — idea concreta susceptible de respaldo. Es la **unidad de verificación**: cada afirmación lleva su propia fuente y su propio estado de verificación. Una misma tarjeta puede contener afirmaciones respaldadas por fuentes distintas o con niveles de verificación diferentes.
- **Tarjeta de conocimiento** — síntesis CoraLEAN (redacción propia, paráfrasis) que agrupa y estructura varias afirmaciones. **No tiene estado de verificación propio**: su trazabilidad es la de sus afirmaciones.

Además:

- **Núcleo mínimo curado + crecimiento dirigido por necesidad real.** El núcleo mínimo contiene únicamente el conocimiento necesario para que Core v0.1 ejecute correctamente las siete Áreas de razonamiento y los comportamientos esenciales. Después, pilotos y casos reales amplían la capa cuando aparece una necesidad concreta. No hay corpus objetivo ni biblioteca exhaustiva de Lean/QI.
- **Reglas de aplicación en la tarjeta.** Una tarjeta no es una ficha de catálogo: además de explicar el concepto, registra cuándo puede ser útil, qué condiciones lo hacen inapropiado, qué limitaciones tiene y qué alternativas existen. Estas reglas ayudan a elegir método/herramienta, pero **no sustituyen al Core ni crean un mapeo rígido herramienta→área/momento**.
- **Asociaciones con Áreas de razonamiento y Momentos de navegación** son metadatos orientativos, nunca mapeos estructurales.
- **Fallback honesto, sin ruido obligatorio.** Sin respaldo verificado, CoraLEAN puede ofrecer una síntesis metodológica general; nunca la atribuye falsamente a una fuente; hace visible la falta de verificación cuando la procedencia es relevante o el usuario la solicita; y la trazabilidad es auditable aunque no aparezca en cada respuesta.
- Se mantienen las reglas de ADR-004: fuentes como referencias, nunca corpus copiado; paráfrasis; página/sección citada sólo cuando está verificada; límites y copyright; jerarquía de fuentes; prohibición de inventar fuentes, páginas, secciones, citas o fuerza de evidencia.

**No decidido aquí** (Runtime Contract): el soporte físico de las tarjetas, su formato y su mecanismo de recuperación.

## Contexto

Una primera propuesta verificaba a nivel de tarjeta, lo que impedía representar tarjetas con afirmaciones de varias fuentes o con verificación desigual, y crecía exclusivamente por demanda de proyectos reales, lo que dejaba sin respaldo al conocimiento que el propio Core necesita para comportarse correctamente. La revisión separó fuente/afirmación/tarjeta y añadió el núcleo mínimo curado.

## Consecuencias

### Positivas

- Citas al nivel correcto (afirmación), coherentes con la regla de verificación por página/sección.
- El Core v0.1 nace con el conocimiento mínimo que su comportamiento exige, sin caer en la biblioteca.
- Las reglas de aplicación convierten el conocimiento en criterio de elección de método, no en catálogo decorativo.

### Negativas

- Tres niveles de granularidad son más estructura que una lista de fichas; el esquema físico deberá soportarlos sin burocracia.
- «Núcleo mínimo» exige una definición explícita de qué comportamientos esenciales del Core v0.1 necesitan qué conocimiento (pendiente de la etapa de criterios/contrato de comportamiento).
