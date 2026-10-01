# Matt Pocock skills — repository installation

**Installed:** 2026-10-01

## Purpose

CoraLEAN installs the complete Matt Pocock skill set rather than a hand-picked subset.
Previous project experience showed that partial installations can break workflow composition or leave implicit skill dependencies unavailable.

## Source

- Repository: `mattpocock/skills`
- Upstream commit inspected at installation time: `d81f3a183412e71a5b1e84ca21bc1a35eea03a60`
- Upstream release context: v1.3 merge, 2026-09-29
- Skills discovered and installed: **37**

## Runtime targets

The full set is installed for:

- Codex
- OpenCode
- Pi

The installer maps Codex/OpenCode to `.agents/skills/` and Pi to `.pi/skills/`.
Both copies are intentional so the repository can move between the agent runtimes already used in the wider KairOS/Atenea environment without a reinstall.

## Installation command

```bash
npx --yes skills@latest add mattpocock/skills \
  --skill '*' \
  --agent codex opencode pi \
  -y --copy --full-depth
```

`--copy` is deliberate: CoraLEAN keeps an explicit repository-owned snapshot rather than depending on external symlinks.

## Update policy

Do not silently update these skills during a CoraLEAN train.
Review upstream changes first, then use the skills installer/update mechanism deliberately and commit the resulting `skills-lock.json` and skill changes together.

## Repository setup

After installation, run `setup-matt-pocock-skills` once for this repository before relying on the engineering workflow. That setup establishes:

- issue tracker convention;
- triage label vocabulary;
- domain-document layout;
- the `AGENTS.md` skill-routing block.

Recommended initial choices for CoraLEAN are GitHub Issues, default triage labels, and a single-context domain model unless later evidence justifies a multi-context layout.

## Repository setup status

**Configured:** 2026-10-01. The `setup-matt-pocock-skills` skill has been run once with the recommended choices:

- Issue tracker: GitHub Issues — see `docs/agents/issue-tracker.md`.
- Triage labels: default five-role vocabulary — see `docs/agents/triage-labels.md`.
- Domain docs: single-context; `GLOSSARY.md` is created lazily by `/domain-modeling`, and `docs/decisions/` remains the canonical ADR location — see `docs/agents/domain.md`.
