# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring CoraLEAN.

## Before exploring, read these

- **`START_HERE.md`** at the repo root: the product framing every piece of work should stay consistent with.
- **`GLOSSARY.md`** at the repo root: the canonical single-context vocabulary. **It does not exist yet by design**; it is created lazily, only when `/domain-modeling` has real terms to consolidate.
- **`docs/decisions/`**: read ADRs that touch the area you're about to work in. This is CoraLEAN's canonical location for decision records — there is deliberately no separate `docs/adr/` directory.

## Decision record conventions (CoraLEAN)

Decision records live in `docs/decisions/` with the naming pattern `ADR-00X-<slug>.md` (e.g. `ADR-004-source-backed-guidance-and-citations.md`). Existing records at setup time:

- `ADR-001-independent-project-and-repository.md`
- `ADR-002-method-first-chatgpt-project-first.md`
- `ADR-003-backend-service-vs-resource.md`
- `ADR-004-source-backed-guidance-and-citations.md`

When a skill says "record an ADR", write it into `docs/decisions/` following the numbering and style of the existing records. Do not create or migrate to `docs/adr/`.

## File structure

Single-context repo:

```
/
├── GLOSSARY.md              ← created lazily by /domain-modeling
├── docs/
│   ├── decisions/           ← canonical ADRs (CoraLEAN naming, no docs/adr/)
│   └── agents/              ← this configuration
```

## Use the glossary's vocabulary

Once `GLOSSARY.md` exists, when your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined there. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing record in `docs/decisions/`, surface it explicitly rather than silently overriding:

> _Contradicts ADR-003 (backend service vs resource), but worth reopening because…_
