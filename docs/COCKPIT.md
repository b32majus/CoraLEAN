# CoraLEAN Desk — Cockpit concept

> **⚠ Estado tras el Core Freeze v0.1 (2026-10-01):** el propósito y los principios de diseño de este documento siguen vigentes. La pantalla conceptual con el corredor de fases y «DIAGNOSIS 62%» está **SUPERSEDED**: no existen fases como estado primario (ADR-006), no hay porcentajes de progreso (ADR-008), y la semántica visual de símbolos está **aplazada** hasta decidir cómo se representan simultáneamente suficiencia, bloqueos, reaperturas y relevancia (enmienda 2 de ADR-008). El cockpit debe renderizar una **proyección de navegación** derivada del Project State (ADR-012, ADR-017). Rediseño pendiente post-freeze.

## Purpose

The cockpit exists because conversational interfaces are excellent for reasoning but poor at showing the overall geometry of a long project.

The cockpit is **not a user manual**.

It is a visual orientation layer.

## User should understand in seconds

1. Where is my project?
2. What phase am I in?
3. What is complete?
4. What is blocked?
5. What evidence is missing?
6. What hypotheses are open?
7. What decisions are pending?
8. What is the next milestone?
9. What does Coraline recommend doing next?

## Conceptual screen

~~~text
CoraLEAN
PROMueve · Mérida
Rheumatology + Pharmacy

             DIAGNOSIS
                62%

Readiness                 ✓
Frame                     ✓
Team                      ✓
Current state             ●
Baseline                  ⚠
Causes                    ○
Countermeasures           ○
Test                      ○
Implementation            ○
Evaluation                ○

4 open hypotheses
3 evidence items pending
2 decisions to validate

NEXT MILESTONE
26 Oct · Current-state workshop

CORALINE RECOMMENDS
→ complete current state
→ verify H03
→ obtain baseline timing data

[ Continue ]
[ Prepare meeting ]
[ Add information ]
[ Ask Coraline ]
~~~

## Design principle

The cockpit should show **state**, not duplicate the conversation.

Avoid:

- a Jira-like task-management clone;
- a giant Lean toolbox;
- a dashboard full of decorative metrics;
- forms that merely repeat what ChatGPT already asks.

## Interaction model

Possible future interactions:

- click a phase → see why it is complete/incomplete;
- click an evidence gap → open a conversation with the right context;
- click a hypothesis → see supporting/contradicting evidence;
- click "prepare meeting" → generate a meeting brief;
- click "ask Coraline" → open the appropriate ChatGPT workflow;
- click "I am stuck" → record a friction finding.

## Implementation evolution

### V0

A structured PROJECT_STATE file can be enough.

### V0.5

A lightweight visual Site/cockpit may render the state.

### V1

A small web cockpit backed by shared structured data.

### Future

A full product only if usage proves it is needed.

## ChatGPT Sites

ChatGPT Sites is a candidate for the visual cockpit because OpenAI currently documents Sites as a way to create interactive websites and lightweight apps from Work.

Availability and regional rollout must be treated as constraints, not assumptions:
https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites

CoraLEAN must never make the core project unusable just because Sites is unavailable.
