# Project State Model

> **⚠ Estado tras el Core Freeze v0.1 (2026-10-01):** la semántica de entidades (Fact, Hypothesis, Evidence, Decision, Action, Artefact) sigue vigente y se amplía en GLOSSARY.md. El esquema YAML mínimo está **SUPERSEDED** por el contrato de ADR-015 (nueve bloques; snapshot + historia material; procedencia en tres trazas; derivados no persistidos — la suficiencia y el momento de navegación se derivan, no se almacenan). «Gate» como condición simple está **SUPERSEDED** por ADR-010 (dos ejes: fuerza × requisito de autorización humana). El event/history model es consistente con ADR-015 (historia material, sin event sourcing completo). Las operaciones MCP futuras siguen siendo futuras. Fuente canónica: ADR-015 + ADR-017 + GLOSSARY.md.

## Purpose

PROJECT_STATE is the stable contract between:

- ChatGPT conversation;
- Work;
- Skills;
- CoraLEAN Desk;
- future backend;
- future MCP tools;
- human coaching.

It should remain understandable even if the UI or AI provider changes.

## Minimum state

~~~yaml
project:
  id:
  name:
  description:
  sponsor:
  lead:
  team: []

mode:
  guided | partner | expert

lifecycle:
  phase:
  gate:
  status:
  readiness:
  next_step:
  next_milestone:

problem:
  statement:
  scope_in:
  scope_out:
  impact:
  facts: []
  assumptions: []

stakeholders: []

process:
  start:
  end:
  current_state_status:
  artefacts: []

hypotheses: []
evidence: []
decisions: []
actions: []
meetings: []
artefacts: []
open_questions: []

metrics:
  outcome: []
  process: []
  balancing: []

learning: []

last_update:
  timestamp:
  actor:
  summary:

provenance:
  source:
  notes:
~~~

## Entity semantics

### Fact

Something observed or supported by evidence.

### Hypothesis

An explanation that is not yet sufficiently demonstrated.

### Evidence

Information that supports, weakens or refutes a hypothesis or decision.

### Decision

A deliberate choice made by the team.

### Action

A concrete next step with owner/status.

### Artefact

A structured output such as a process map, measurement plan, PDSA or A3.

### Gate

A condition that determines whether the project is ready to progress.

## State transition principle

The system should not merely store "phase = diagnosis".

It should be able to explain:

- why the project is in that phase;
- what is complete;
- what remains;
- what evidence is missing;
- what would unlock the next phase.

## Event/history model

Future backend implementations should preserve an event trail where practical.

Example:

~~~text
2026-10-03
H03 created
"The delay is caused by Pharmacy validation."

2026-10-10
E12 added
"17/23 incomplete requests were already incomplete at origin."

2026-10-10
H03 status changed
"Refuted / needs reformulation."

2026-10-11
D07 recorded
"Investigate upstream information completeness."
~~~

This is more valuable than a single mutable status because it allows coaching and retrospective learning.

## Future MCP domain operations

- get_project_state
- get_open_items
- record_evidence
- add_hypothesis
- update_hypothesis
- record_decision
- create_action
- update_phase
- check_gate
- prepare_meeting_context
- record_learning

These are domain operations, not generic database CRUD exposed to the model.
