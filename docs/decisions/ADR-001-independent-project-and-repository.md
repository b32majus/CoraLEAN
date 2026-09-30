# ADR-001 — CoraLEAN is independent from PROMueve

**Date:** 2026-09-30
**Status:** Accepted

## Decision

CoraLEAN will have:

- an independent ChatGPT Project;
- an independent GitHub repository;
- its own method/governance/state/product documentation.

PROMueve Extremadura is a **laboratory and first pilot**, not CoraLEAN's parent product.

## Context

The tool is intended to generalise beyond the current PROMueve projects:

- other clinical services;
- other hospitals/health areas;
- pharmacy projects;
- quality teams;
- ACASPEX;
- potentially other healthcare domains;
- potentially other sectors if the method proves transferable.

Embedding the product directly in PROMueve would create conceptual and architectural coupling.

## Consequences

### Positive

- CoraLEAN can evolve independently.
- PROMueve remains focused on clinical improvement work.
- The first pilot is still available as a real-world test.
- SanitarIA can later use CoraLEAN as a training/content/product asset.
- Product feedback is separated from clinical project decisions.

### Negative

- Some context must be deliberately transferred between PROMueve and CoraLEAN.
- The first pilot needs a clean project boundary.
- Some knowledge may temporarily exist in two contexts.

## Boundary

No patient-identifiable data should enter the CoraLEAN repository.

Process information and aggregated/non-identifying pilot context may be used where appropriate.
