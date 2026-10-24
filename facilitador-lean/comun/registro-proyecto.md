# El registro del proyecto

La memoria del proyecto tiene **dos niveles**:

| Nivel | Qué es | Tamaño | Se actualiza |
|---|---|---|---|
| **Ficha del proyecto** | El estado actual: lo decidido, lo pendiente y lo que se sabe hoy | 1–3 páginas | Se **sustituye** por la versión nueva al cerrar cada sesión |
| **Registro del proyecto** | Todos los documentos de trabajo: actas, fichas de entrevista, mapas, datos, entregables | Crece con el proyecto | Se **añade**; nunca se borra ni se reescribe |

La ficha cita los documentos del registro en su apartado «Fuentes y documentos», para que siempre se pueda volver al original.

## Estructura de carpetas

```
[nombre-del-proyecto]/
├── 00_ficha/            ficha-proyecto_v3_2026-11-12.md   ← solo la última versión
├── 01_contexto/         encargo, estándar (PAI), ficha de contexto, boceto
├── 02_entrevistas/      fichas de entrevista por rol y síntesis (nunca transcripciones con nombres)
├── 03_sesiones/         guiones, actas y documentos del líder de cada sesión
├── 04_analisis/         mapas del proceso, brechas, causas, matrices
├── 05_datos/            hojas de recogida, indicadores, gráficos
├── 06_entregables/      informes de continuidad y presentaciones de seguimiento
└── indice-registro.md   índice de todo lo anterior
```

## Cómo nombrar los archivos

`AAAA-MM-DD_tipo_detalle.md`, en minúsculas y sin espacios. Ejemplos:
- `2026-11-03_acta_sesion-2.md`
- `2026-11-03_documento-lider_sesion-2.md`
- `2026-10-28_ficha-entrevista_medica-familia.md`
- `2026-11-15_presentacion-seguimiento_v2.md`

La fecha delante hace que se ordenen solos. El tipo y el detalle permiten encontrarlos sin abrirlos.

## Dónde vive el registro según el entorno

| Entorno | Ficha | Registro |
|---|---|---|
| Project de ChatGPT o Claude | Archivo del proyecto (solo la última versión) | Carpeta en tu ordenador o en el almacenamiento de tu organización; sube al proyecto solo lo que necesites en cada sesión |
| OpenCode | Archivo en la carpeta del proyecto | La propia carpeta del proyecto con la estructura de arriba |
| Conversación suelta | Documento propio que pegas o adjuntas | Carpeta propia |

Si el entorno permite tener muchos archivos en el proyecto, se pueden subir también los del registro. Aun así, **la ficha es lo primero que se lee**.

## Privacidad del registro

- Nada de datos de pacientes en ningún documento.
- Entrevistas por rol, nunca por nombre. Las transcripciones con nombres no se guardan: se procesan y se borran.
- Si el registro se guarda en un espacio compartido, comprueba quién tiene acceso.

## Índice del registro

Plantilla: `plantilla-indice-registro.md`. CoraLEAN propone la fila nueva del índice cada vez que genera un documento para el registro.
