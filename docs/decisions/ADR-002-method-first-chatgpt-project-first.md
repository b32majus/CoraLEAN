# ADR-002 — Method-first, ChatGPT Project-first

**Date:** 2026-09-30
**Status:** Accepted for Phase 0/Alpha

## Decision

The first CoraLEAN implementation will be:

- methodology-first;
- executed primarily inside a ChatGPT Project;
- supported by Project instructions;
- AGENTS.md;
- Skills where available;
- Chat;
- Voice;
- Work;
- structured Project State.

A standalone SaaS platform is not the starting point.

## Rationale

This gives the fastest route to real-world validation while avoiding premature infrastructure.

The key unknown is not whether a web application can be built.

The key unknown is:

> What exact reasoning, guidance, state and interaction model helps a professional lead a real improvement project?

A ChatGPT Project allows this to be tested before committing to product infrastructure.

## Cockpit

A visual cockpit is considered a likely companion because conversational chat does not make project state sufficiently visible.

It may initially be implemented as a lightweight Site where available, or another minimal visual layer.

## Backend

A backend is not required for the first individual use case but is likely valuable for the managed-service model where Silvia needs real-time access to a project's state.

## Reversal condition

If repeated use demonstrates that Project + State + cockpit cannot reliably maintain project continuity, the team will promote the backend into the next phase.

## Consequence

No major platform architecture is frozen yet.
