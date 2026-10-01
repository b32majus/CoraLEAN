# CoraLEAN Decision Log

Índice rápido de decisiones aceptadas. Desde ADR-009 la lengua canónica del producto es el español; ADR-001 a ADR-004 se conservan en inglés como registro histórico.

| ID | Decision | Status |
|---|---|---|
| ADR-001 | CoraLEAN has an independent Project and GitHub repository; PROMueve is the laboratory | Accepted |
| ADR-002 | Method-first, ChatGPT Project-first for V0/Alpha | Accepted |
| ADR-003 | Support both user-owned resource and managed-service distribution models | Accepted as product hypothesis |
| ADR-004 | Methodological guidance should expose authoritative provenance/citations when relevant | Accepted |
| ADR-005 | El usuario primario es el Responsable local del proyecto; Guiado es el comportamiento de referencia; rol y modo son conceptos distintos | Aceptada |
| ADR-006 | Modelo híbrido: áreas de razonamiento con suficiencia categórica como verdad interna; momentos de navegación derivados; artefactos como proyecciones; sin porcentajes de progreso | Aceptada |
| ADR-007 | Áreas de razonamiento canónicas del Core v0.1: siete áreas; las entidades son transversales; experimentar es estructuralmente distinto de adoptar | Aceptada |
| ADR-008 | La suficiencia se deriva de criterios + evidencia + estatus de entidades; suficiencia para la decisión actual; criterios no sub-suficiencias; reapertura como evento; escala común de tres niveles (enmiendas) | Aceptada |
| ADR-009 | Lengua canónica del producto: español; vocabulario de dominio en español, identificadores técnicos opcionales en inglés, métodos con nombre propio en su idioma original | Aceptada |
| ADR-010 | Condiciones de avance en dos ejes: fuerza (estricta/asesorada) y requisito de autorización humana; experimentos exploratorios acotados; reglas de transición del estado separadas de decisiones | Aceptada |
| ADR-011 | Condiciones habilitantes del proyecto (no un área): proyecto existente desde En preparación; criterios proporcionales; degradación con fuerza según criterio y decisión; estados del proyecto como reglas de transición | Aceptada |
| ADR-012 | Momentos de navegación: regla de derivación desde el foco principal de decisión y criterios pendientes; vocabulario cerrado de seis momentos; sin mapeo estructural área→momento | Aceptada |
| ADR-013 | Capa de conocimiento: fuente / afirmación (unidad de verificación) / tarjeta; núcleo mínimo curado + crecimiento por necesidad real; reglas de aplicación; fallback honesto sin ruido | Aceptada |
| ADR-014 | Contrato de comportamiento: siete dimensiones de andamiaje por modo; núcleo invariable (8 reglas); modo por persona/interacción con preferencia persistible y defecto Guiado; modo subordinado al núcleo | Aceptada |
| ADR-015 | Project State: nueve bloques; snapshot + historia material (sin event sourcing); procedencia en tres trazas; intervención humana como evento; clasificación de criterios relativa a decisión; derivados no persistidos; serialización aplazada | Aceptada |
| ADR-016 | Skill Map v0.1: capas Core/Playbook/Skill; dos Skills congeladas (Preparar reunión, Procesar reunión); sin Skill de artefactos; sin código como dependencia; las Skills no adquieren autoridad | Aceptada |
| ADR-017 | Runtime Contract v0: memoria del Project como contexto auxiliar; snapshot+historia en Markdown como diseño candidato; mutación vía CoraLEAN como gobernanza; protocolo de interacción material; 12 pruebas Alpha; concurrencia como riesgo explícito | Aceptada (hipótesis V0) |
| ADR-018 | Criterios: estructura congelada; semilla provisional (1–3 por área, las siete áreas) sin clasificación estática; validación por escenarios → piloto; regla anti-ceremonia | Aceptada |
| ADR-019 | Acceptance Scenarios v0.1: 14 escenarios canónicos agnósticos al dominio; primer tribunal de los criterios semilla; Mérida como fixture, no como escenario | Aceptada |

## Important non-decisions

These are deliberately **not** frozen:

- Neon vs Supabase;
- GitHub como backend de estado del proyecto;
- ChatGPT Sites como cockpit definitivo;
- MCP;
- plataforma standalone;
- conjunto exacto de Skills;
- ciclo de vida/condiciones de avance exactos;
- esquema exacto de Project State;
- diseño visual final.

The project should resist turning these into architecture commitments prematurely.
