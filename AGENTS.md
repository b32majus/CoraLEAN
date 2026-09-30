# AGENTS.md — CoraLEAN repository operating rules

## Mission

You are working on **CoraLEAN**, a methodology-first Lean Healthcare / Quality Improvement coaching system.

The current objective is to validate the method and interaction model before committing to a full software platform.

## Mandatory reading order

Before changing anything:

1. START_HERE.md
2. relevant document under docs/
3. existing decision records under docs/decisions/
4. current feedback/findings under docs/feedback/

## Source-of-truth hierarchy

When sources conflict, use this order:

1. Explicit current user decisions in the CoraLEAN Project conversation.
2. Accepted decision records in docs/decisions/.
3. Current CoraLEAN method/governance documents.
4. Current pilot evidence and structured feedback.
5. Research/benchmarks.
6. Agent inference.

Never turn an inference into a decision without recording it as such.

## Product discipline

- Do not build a standalone platform prematurely.
- Do not introduce a backend merely because it is technically easy.
- Do not add a feature without identifying the user friction it resolves.
- Prefer reversible decisions during Phase 0.
- Keep CoraLEAN independent from PROMueve.
- Treat PROMueve as a laboratory, not as CoraLEAN's owner.
- Keep SanitarIA as a future dissemination/training channel, not as a runtime dependency.

## Method discipline

CoraLEAN must:

- distinguish facts, hypotheses, decisions and assumptions;
- prevent premature solutioning;
- make the next useful step visible;
- require evidence appropriate to the decision;
- use gates where advancing would otherwise create methodological debt;
- adapt pedagogical depth to the user's mode;
- never let an expert mode bypass methodological integrity;
- teach tools after or during their use when that improves capability transfer.

## State discipline

PROJECT_STATE is a contract between conversation, cockpit and future backend.

State should distinguish at minimum:

- phase;
- gate;
- problem statement;
- scope;
- stakeholders;
- hypotheses;
- evidence;
- decisions;
- actions;
- meetings;
- artefacts;
- open questions;
- next milestone.

Do not silently overwrite material project decisions.

Prefer append/update semantics and preserve provenance where practical.

## Backend discipline

The future backend is an implementation option, not a current commitment.

Candidates may include:

- Neon/Postgres;
- Supabase/Postgres;
- GitHub as a versioned/document store for some artefacts;
- another appropriate service.

Do not select one solely on familiarity.

The backend must eventually support the actual need: shared project state, real-time access, role-aware access and a path for Silvia/CoraLEAN to intervene when a project is being accompanied.

## MCP discipline

MCP is a future integration layer between the AI surface and structured project state.

Do not implement MCP before the underlying operations are clear.

Design future operations as explicit domain actions, e.g.:

- get_project_state
- record_evidence
- add_hypothesis
- update_hypothesis
- record_decision
- create_action
- check_gate
- update_phase
- prepare_meeting_context
- record_learning

## Privacy

The CoraLEAN pilot is intended to work on process information and, where relevant, aggregated data. Do not introduce patient-identifiable information into the product model.

If a future use case needs sensitive/patient-level information, stop and redesign the data boundary rather than assuming the existing architecture is suitable.

## Documentation-first rule

If a design decision changes architecture, method, user experience, distribution model or state model:

1. document it;
2. record the decision;
3. then implement it.

## Feedback

The primary product-development unit is a **friction/failure finding**, not a feature request.

Record:

- what the user tried to do;
- what they expected;
- what happened;
- why it mattered;
- phase/mode;
- workaround;
- likely root cause;
- proposed change;
- evidence;
- disposition.

Do not optimise for positive opinions. Optimise for reduced friction and better project outcomes.
