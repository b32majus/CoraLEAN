# El registro del proyecto

La memoria del proyecto tiene **tres capas**:

| Capa | Qué es | Tamaño | Se actualiza |
|---|---|---|---|
| **Ficha del proyecto** | La foto de hoy: lo decidido, lo pendiente y lo que se sabe ahora | 1–3 páginas | Se **sustituye** por la versión nueva al cerrar cada sesión |
| **Cuaderno del proyecto** | La línea evolutiva: una entrada por sesión con lo trabajado, decidido y encontrado | Un solo archivo `.md` que crece | La **historia** (entradas) no se modifica ni se resume: se añaden entradas nuevas. La cabecera, el índice y las decisiones vigentes son **vistas derivadas** que se regeneran a partir de las entradas |
| **Documentos de trabajo** | Actas, fichas de entrevista, mapas, datos, entregables | Muchos archivos | Se **guardan**; el cuaderno y la ficha los citan |

La ficha se lee siempre primero. El cuaderno se consulta por la parte necesaria (su índice y la tabla de «Decisiones vigentes») y es la fuente principal para reconstruir el proyecto o preparar un informe. La ficha y el cuaderno citan los documentos en «Fuentes y documentos», para volver al original.

## Cómo se actualiza el cuaderno

La historia no se reescribe: cada sesión añade una entrada al final. Las vistas derivadas (cabecera, índice, decisiones vigentes) se regeneran a partir de las entradas. Cómo se hace depende de lo que **pueda hacer de verdad** tu asistente. Compruébalo una vez: pide que añada una línea de prueba al final del cuaderno y mira si el archivo cambia.

| Lo que puede hacer el asistente | Qué hace CoraLEAN |
|---|---|
| **Edita el archivo** (comprobado) | Añade la entrada al final, regenera las vistas derivadas y lo dice. No toca las entradas anteriores |
| **Crea un archivo nuevo, pero no sustituye el existente** | Entrega el cuaderno completo con la entrada añadida, y la **comprobación**: «el cuaderno tenía N entradas y ahora tiene N+1». Si el número no cuadra, se ha perdido algo. El usuario lo sustituye en la base de conocimiento (descargar o «añadir a la fuente») y borra la versión anterior |
| **Solo da texto** (o el cuaderno es muy largo) | Entrega **solo la entrada nueva**, indica dónde pegarla y, si el cuaderno es largo, sugiere archivar lo antiguo (`cuaderno_AAAA-Tn.md`) dejando un resumen en el cuaderno vivo |

## Versión para consultar

Quien no trabaja en Markdown puede pedir una versión para consultar: un `.docx` con buen formato si el entorno puede crear archivos, o el texto con tablas simples listo para pegar en Word. La guía web incluye además un **visor local** que muestra cualquier `.md` con formato, sin enviar nada a ningún sitio.

## Estructura de carpetas

```
[nombre-del-proyecto]/
├── 00_ficha/            ficha-proyecto_v3_2026-11-12.md   ← solo la última versión
│                        cuaderno-proyecto.md                ← línea evolutiva, solo se añade
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

| Entorno | Ficha y cuaderno | Documentos de trabajo |
|---|---|---|
| Project de ChatGPT o Claude | Archivos del proyecto: la última ficha y el cuaderno. Al cerrar, sustituye cada uno por su versión nueva y borra la anterior | Carpeta en tu ordenador o en el almacenamiento de tu organización; sube al proyecto solo lo que necesites en cada sesión |
| Entornos que trabajan con carpetas (OpenCode y, si lo has comprobado, Work o Cowork) | Archivos en la carpeta del proyecto; el asistente puede actualizar el cuaderno si edita archivos (compruébalo) | La propia carpeta del proyecto con la estructura de arriba |
| Conversación suelta | Documentos propios que pegas o adjuntas | Carpeta propia |

Si el entorno permite tener muchos archivos en el proyecto, se pueden subir también los documentos de trabajo. Aun así, **la ficha es lo primero que se lee**. Con límite de archivos, el cuaderno es lo más útil después de la ficha: un solo archivo con todo el recorrido.

## Privacidad del registro

- Nada de datos de pacientes en ningún documento.
- Entrevistas por rol, nunca por nombre. Las transcripciones con nombres no se guardan: se procesan y se borran.
- Si el registro se guarda en un espacio compartido, comprueba quién tiene acceso.

## Índice del registro

Plantillas: `plantilla-cuaderno.md`, `plantilla-entrada-cuaderno.md` y `plantilla-indice-registro.md`. CoraLEAN propone la fila nueva del índice cada vez que genera un documento para el registro.
