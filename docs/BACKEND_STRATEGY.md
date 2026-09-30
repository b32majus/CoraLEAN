# Backend strategy

## Why a backend may become necessary

The backend is not about technology for its own sake.

It solves a real service need:

> Silvia/CoraLEAN may need to enter a live project and see the same current state as the local project lead.

A local folder is insufficient for that service model.

## Two distribution paths

### Path A — CoraLEAN as a resource

The user receives the Starter Kit and manages their own environment.

Possible levels:

1. Project + Project State only.
2. Project + user-managed GitHub.
3. Project + user-managed database/backend.

This maximises autonomy.

### Path B — CoraLEAN as a service

CoraLEAN provisions and operates the shared project infrastructure.

The user receives:

- CoraLEAN Project setup;
- CoraLEAN method;
- cockpit;
- managed project state;
- optional human support from Silvia/CoraLEAN.

This enables direct intervention without asking the user to export files.

## Candidate technologies

### Neon / Postgres

Strengths:

- clean relational model;
- strong fit for structured state;
- good separation between application and database;
- appropriate if CoraLEAN controls the API/auth layer.

Unknowns:

- authentication;
- realtime transport;
- storage;
- operational surface.

### Supabase

Strengths:

- Postgres;
- authentication;
- storage;
- realtime;
- APIs and server-side functions in one product.

Potentially attractive for a managed service MVP because less infrastructure has to be assembled.

Unknowns:

- whether the extra platform surface is actually needed;
- long-term product/vendor fit.

### GitHub

Excellent for:

- method files;
- AGENTS.md;
- Skills;
- templates;
- schemas;
- documentation;
- versioning;
- public development;
- feedback/issues/discussions.

Not preferred as the primary real-time transactional project database.

### ChatGPT Project

Excellent for:

- conversation context;
- files;
- instructions;
- shared working context;
- Voice;
- Work.

Not treated as CoraLEAN's application database or API.

## Current decision

**No final backend technology selected yet.**

The conceptual requirement is selected:

> shared, structured, remotely accessible project state must eventually be available for the managed-service path.

The technology decision should follow the first real pilot and the exact synchronisation requirements.

## Future MCP role

MCP is considered an integration layer, not a database.

It should eventually allow ChatGPT/other supported AI surfaces to call domain operations against the backend.

Example:

~~~text
ChatGPT
   ↕
CoraLEAN MCP
   ↕
CoraLEAN API
   ↕
Postgres
~~~

This should be implemented only after the domain operations and permission model are stable.

## Security boundary

The pilot is designed around process information and aggregated data.

No patient-identifiable information belongs in the CoraLEAN backend.

If future use cases introduce sensitive data, the data architecture must be reassessed before ingestion.
