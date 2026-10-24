# Ejemplo — Volcado inicial y ficha de contexto

> Caso **ficticio** usado en todos los ejemplos: adaptación del PAI de Insuficiencia Cardiaca (IC) en el "Área de Salud del Valle". Los datos son inventados.

## Lo que pega el líder

> Me han encargado adaptar el PAI de insuficiencia cardiaca a nuestra área. Os pego el correo de la gerencia: "Tras la publicación del PAI regional de IC, el área debe disponer de su adaptación local antes del 31 de marzo de 2027, según el contrato de gestión. Se encarga la coordinación a la supervisión de Medicina Interna."
> Yo soy la supervisora de enfermería de Interna. El PAI es largo (60 páginas), adjunto.
> En el cuadro de mando del área los reingresos a 30 días por IC fueron del 23 % en 2025. Creo que el objetivo regional es del 15 %.
> La mayoría de los IC ingresan en Interna, algunos en Cardiología. Tenemos dos enfermeras gestoras de casos para toda el área. Hace dos años se intentó una consulta de IC pero se cerró porque el cardiólogo se fue.
> Creo que el problema es que los pacientes se van de alta sin saber qué hacer y primaria no se entera.

## Ficha de contexto que devuelve el asistente

# Ficha de contexto — Adaptación local del PAI de IC

**Fecha:** 3/11/2026 · **Líder:** supervisora de enfermería de Medicina Interna · **Estado:** borrador

## 1. Origen
- **Qué lo ha disparado:** publicación del PAI regional de IC y objetivo en el contrato de gestión. *(Encargo)*
- **Por qué ahora:** plazo del contrato de gestión. *(Encargo)*
- **Quién lo encarga:** Gerencia del área. *(Hecho: correo)*

## 2. El encargo, literal
> "Tras la publicación del PAI regional de IC, el área debe disponer de su adaptación local antes del 31 de marzo de 2027, según el contrato de gestión. Se encarga la coordinación a la supervisión de Medicina Interna."

## 3. Problema percibido por el líder
> "Los pacientes se van de alta sin saber qué hacer y primaria no se entera." *(Supuesto del líder)*

## 4. Estándar o referencia
PAI regional de Insuficiencia Cardiaca (adjunto, 60 páginas). Versión y fecha: **pendiente de confirmar**.

## 5. Servicios y niveles asistenciales implicados
| Nivel | Servicio / unidad | Papel en el proceso | ¿Saben que existe el proyecto? |
|---|---|---|---|
| Hospitalaria | Medicina Interna | Ingresa la mayoría de pacientes con IC | Sí |
| Hospitalaria | Cardiología | Ingresa algunos pacientes; consulta | **No consta** |
| Primaria | Centros de salud | Seguimiento tras el alta | **No consta** |
| Transversal | Enfermería gestora de casos (2) | Seguimiento de casos complejos | **No consta** |
| Urgencias | Urgencias hospitalarias | **No mencionado** | — |
| Otros | Farmacia, admisión, trabajo social | **No mencionados** | — |

## 6. Personas clave (por rol)
| Rol | Relación con el problema | Postura previsible |
|---|---|---|
| Gerencia | Encarga | Interesada en cumplir plazo |
| Supervisora de Interna (líder) | Coordina | — |
| Cardiología | Participó en la consulta de IC cerrada | **Desconocida** |

## 7. Pacientes
- **Población:** pacientes con IC del área. **Volumen: falta.**
- **Entradas y salidas del proceso:** falta.

## 8. Datos
| Indicador | Valor | Periodo | Fuente | ¿Fiable? |
|---|---|---|---|---|
| Reingresos a 30 días por IC | 23 % | 2025 | Cuadro de mando del área | Por comprobar |
| Objetivo regional de reingresos | 15 % | — | "Creo" (líder) | **Supuesto: confirmar** |

**Datos que faltan:** número de ingresos por IC al año, tiempo entre el alta y la primera visita en primaria, visitas a urgencias por IC.

## 9. Intentos anteriores
Consulta de IC hace dos años, cerrada al marcharse el cardiólogo. *(Hecho según el líder; detalles: falta.)*

## 10. Restricciones
Dos enfermeras gestoras de casos para toda el área. *(Hecho)* El resto: falta.

## 11. Plazos e hitos
| Hito | Fecha | ¿Quién lo fija? |
|---|---|---|
| Adaptación local disponible | 31/03/2027 | Contrato de gestión |

## 12. Señales de alerta
- **Primaria y urgencias no aparecen** y forman parte del proceso.
- El encargo pide **un documento** (la adaptación); el dato de reingresos sugiere que el problema real es **de resultados**. Conviene aclarar qué pesa más.
- **No hay patrocinador clínico** identificado además de la gerencia.

## 13. Lo que falta (priorizado)
1. ¿Qué espera la gerencia: un documento adaptado o una mejora en reingresos?
2. ¿Quién decide en Cardiología y en primaria?
3. Papel de urgencias, farmacia y trabajo social.
4. Volumen de pacientes y tiempos alta–primaria.
5. Por qué se cerró la consulta de IC, además de la marcha del cardiólogo.

**Qué hemos producido:** la ficha de contexto. **Qué falta:** los 5 puntos anteriores. **Siguiente paso:** `preguntame`, para completar los huecos contigo.
