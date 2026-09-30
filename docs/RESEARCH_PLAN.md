# CoraLEAN Deep Research Plan

## Objective

Reduce design uncertainty before committing to software architecture.

## Track A — Product/UX

Deeply inspect:

- Simana;
- Life QI;
- KaiNexus;
- ImprovementFlow;
- iObeya;
- other healthcare improvement workspaces.

For each, capture:

- onboarding;
- project creation;
- project board;
- phases;
- cards/artefacts;
- current-state representation;
- measurement;
- PDSA;
- root-cause work;
- gates;
- approvals;
- AI interaction;
- collaboration;
- reporting;
- configuration;
- export;
- state model;
- user friction.

Output: pattern library and copy/adapt/avoid matrix.

## Track B — Facilitation and capability transfer

Study:

- AHRQ Practice Facilitation;
- IHI Model for Improvement;
- QI coaching/facilitation literature;
- implementation science where relevant;
- conversational coaching / human-AI collaboration literature.

Questions:

- What makes facilitation effective?
- What predicts readiness?
- How does a facilitator transfer capability?
- Which work should remain human?
- What are known failure modes of coaching?

## Track C — AI workflow architecture

Study:

- GitHub Spec Kit;
- BMAD;
- workflow-first AI systems;
- Tallyfy/MCP patterns;
- agent state management;
- artefact-driven workflows;
- human approval gates.

Questions:

- How should phases be represented?
- How should state be persisted?
- How should handoffs work?
- What should the model be allowed to write?
- What requires human confirmation?

## Track D — Open source implementation

Evaluate:

- React Flow;
- Equinor Flyt;
- suitable local-first state libraries;
- lightweight Postgres stacks;
- Supabase/Neon;
- MCP server patterns.

Do not select technology from this track until user requirements are clearer.

## Research output standard

Every research finding should be classified:

- **COPY PATTERN** — strong candidate to reproduce conceptually;
- **ADAPT** — useful but not directly applicable;
- **AVOID** — observed anti-pattern or mismatch;
- **UNVERIFIED** — needs stronger evidence;
- **DECISION** — accepted into CoraLEAN;
- **QUESTION** — remains open.

## Important rule

Research informs CoraLEAN; it does not automatically define CoraLEAN.

Real pilot behaviour has higher weight than an attractive external feature.
