# RT-01 — Manifest de versión del protocolo

**Versión vigente:** `RT01-alpha-v0.1-pm1` · **fijada:** 2026-10-23.

El fixture sintético original se publicó en la rama `work/alpha-runtime-c084-20261004` mediante `81f9216` (4 archivos).
La corrección posterior de las **instrucciones operativas** (memoria exclusiva del Project, capturas y aislamiento de E1) entró inicialmente en la consolidación documental `3530db5`. Al rehacer la rama para excluir herramientas Atenea, cambian los SHA de commit; la identidad verificable de la variante es **este ID y los SHA-256 de los cuatro archivos**.
**Importante:** el contenido de `estado-proyecto.md`, `historia-material.md` y `fixture-esperado.md` no se modificó. El protocolo de creación/configuración sí cambió; no mezclar resultados previos y posteriores.

## SHA-256 de la versión vigente

| Archivo | SHA-256 | Uso |
|---|---|---|
| `estado-proyecto.md` | `ffb8f99cdb1a1457c191de9347b03ceede1b5951bef55325bde820b2ffebf795` | Subir como fuente al Project |
| `historia-material.md` | `655bf34fc3f6bc6461099561a0fd89754ca28f9d22fe1343673f2024f51d4d57` | Subir como fuente al Project |
| `instrucciones-project-rt01.md` | `2cda07e4670ee0db9c6b4d69ffce0191e671b8ac460217295310c98aff82014d` | Copiar **solo bloque B** a las instrucciones; el documento no se sube |
| `fixture-esperado.md` | `fd917209c37d432fc073c9e7e56de73fc6b2183d1d3450076bf4016e76fc7c9b` | Oracle privado de prueba: **NO subir, NO consultar durante la ejecución** |

## Prioridad y disciplina experimental

1. Una ejecución canónica RT-01 sobre Project limpio con Project-only memory, seguida de evaluación contra oracle.
2. RT-03 solo si RT-01 pasa; medir mutación física/fricción.
3. Cuatro réplicas E1 sobre Projects distintos y limpios, misma versión y prompt. E1 puede terminar después de Mérida.
4. Registrar fecha, versión del protocolo, ID de cada Project, prueba y evidencia. **Nunca modificar el protocolo ni el oracle tras conocer respuestas sin emitir nueva versión.**

Este manifest no es una nueva fuente del Project y no cambia las instrucciones literales.
