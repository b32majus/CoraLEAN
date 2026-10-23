# Auditorías externas de IA — 23 octubre 2026

Estos informes son **insumos de investigación y revisión adversarial**, no decisiones canónicas, pruebas de runtime ni asesoría profesional certificada. Se conservan completos para trazabilidad; pueden contener apreciaciones controvertidas, referencias no verificadas, planes provisionales, fechas o estados de repositorio que fueron posteriormente corregidos.

- [Auditor 1 — Informe A: diseño ciego](AUDITOR_1_INFORME_A.md)
- [Auditor 1 — Informe B: contraste adversarial](AUDITOR_1_INFORME_B.md)
- [Auditor 2 — Informes A y B íntegros + resumen comparado](AUDITOR_2_INFORMES_A_B.md)
- [Auditor 2 — vista HTML offline](AUDITOR_2_INFORMES_A_B.html)

**Limitaciones de procedencia:** los dos auditores fueron agentes de IA; comparten sesgos posibles. Auditor 2 examinó el remoto de la rama Alpha en `0a6d992` y erró al afirmar que no existía fixture. En el VPS el commit local `81f9216` sí contiene cuatro archivos RT-01. El trabajo del fixture **no sustituye ejecución de RT-01**. Otras conclusiones requieren cotejo con el Core vigente o validación de usuarios.

La disposición de las propuestas se recoge en [dictamen](../../strategy/DICTAMEN_DIRECCION_2026-10-23.md) y [roadmap](../../execution/ROADMAP_VALIDACION_2026-10-23.md). El Core permanece en ADR-001…019.
