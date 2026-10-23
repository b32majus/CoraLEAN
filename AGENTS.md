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

## Authority and source-of-truth hierarchy

**For the frozen Core:** ADR-001…019 and the canonical map in `docs/CORE_FREEZE_V0.1.md` prevail over legacy documents, an agent's inference, and a conversation that has not been reconciled into a new explicit decision. A human can request a change; do not silently treat that request as a Core amendment. Record and review the amendment first.

**For a live improvement project:** its explicit, versioned Project State (ADR-015) is the authority for state. Conversations and implicit model/Project memory are reasoning context, **not** a parallel source of project truth. Human confirmations/authorisations must pass the state contract and be recorded; do not infer them from a summary.

**For post-freeze execution:** use the latest reviewed execution plan and verified runtime evidence. See `docs/strategy/DICTAMEN_DIRECCION_2026-10-23.md` and `docs/execution/ROADMAP_VALIDACION_2026-10-23.md`. Auditor reports are research inputs, not automatically accepted ADRs.

Research and agent inference remain subordinate. Never turn an inference or tentative proposal into an accepted decision.

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
- use conditions of advancement (force × human authorisation) where progressing would create methodological debt, per ADR-010;
- adapt pedagogical depth to the user's mode;
- never let an expert mode bypass methodological integrity;
- teach tools after or during their use when that improves capability transfer.

## Source-backed guidance discipline

When CoraLEAN gives methodological guidance and an authoritative source exists, it should make the provenance visible without turning ordinary coaching into citation clutter.

Prefer authoritative/primary sources, including relevant professional societies, healthcare quality/improvement bodies, original methodological guidance and peer-reviewed literature.

CoraLEAN must distinguish:

- **source-backed guidance**;
- **CoraLEAN reasoning/synthesis**;
- **local project evidence**.

Do not present one category as another.

Where a precise page/section is verified, cite it. If only the document-level reference is verified, cite only that level. Never invent page numbers, section names, quotations or evidence strength.

Paraphrase copyrighted sources rather than reproducing substantial text unless licensing/permission explicitly allows reuse.

See docs/decisions/ADR-004-source-backed-guidance-and-citations.md.

## State discipline

Project State is the explicit authority for the project's durable facts and decisions (ADR-015), regardless of UI or storage.

Its nine blocks are:

1. identity and roles;
2. project status and transition reason;
3. enabling conditions;
4. scope and declared authority;
5. seven reasoning areas with criteria and status;
6. transversal entities (facts, hypotheses, evidence, decisions, actions, meetings, artefacts, learning, open questions);
7. active decision foci and principal focus;
8. material event history;
9. provenance (recorded by / supplied by / supporting source, when applicable).

**No mandatory linear phase**, and no persisted absolute progress percentage. Navigation moment, sufficiency and recommended next action are derived, never promoted into independently authoritative state. Do not silently overwrite decisions; material changes require event history, provenance and appropriate human confirmation. Physical mutation/serialisation remains a runtime hypothesis (ADR-017).

## Backend discipline

CoraLEAN's **product direction is provider-independent**: ChatGPT Project is an Alpha laboratory, not a required license or storage provider for end users. The implementation of an independent canonical state service is an **option to decide after validation**, not a deployed component or an approved vendor choice (see post-freeze roadmap).

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
- evaluate_advance_conditions (illustrative, not yet an API contract)
- propose_project_status_transition (illustrative, not yet an API contract)
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
- derived navigation moment / interaction mode;
- workaround;
- likely root cause;
- proposed change;
- evidence;
- disposition.

Do not optimise for positive opinions. Optimise for reduced friction and better project outcomes.

## Agent skills

### Issue tracker

GitHub Issues in this repository, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role triage vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: root `GLOSSARY.md`, decisions in `docs/decisions/`. See `docs/agents/domain.md`.
