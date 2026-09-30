# ADR-003 — Two distribution models

**Date:** 2026-09-30
**Status:** Accepted as product hypothesis

## Decision

CoraLEAN should support two conceptual distribution models.

### Resource model

The user receives CoraLEAN and manages their own environment.

Typical stack:

- ChatGPT Project;
- CoraLEAN Starter;
- Project State;
- optional user-managed backend.

### Service model

CoraLEAN provides the environment.

Typical stack:

- ChatGPT Project;
- CoraLEAN Core;
- CoraLEAN-managed backend;
- CoraLEAN Desk;
- optional human coaching/intervention.

## Why this matters

The managed model creates a service relationship:

> "You can run the improvement project yourself, but if you get stuck, we can enter the project and help."

That is materially different from simply distributing a prompt library.

## Backend implication

The service model makes shared, remotely accessible state a legitimate product requirement.

Technology remains undecided.

Candidates include Neon/Postgres, Supabase/Postgres or another suitable backend.

## Future

The same CoraLEAN Core should be deployable in either model.
