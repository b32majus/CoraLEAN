# Handoff — CoraLEAN Alpha Runtime Verification v0

Work: preparar la primera unidad post-freeze para verificar empíricamente el Runtime Contract v0 de CoraLEAN.

Authority:
- `START_HERE.md`
- `AGENTS.md`
- `CONTEXT.md`
- `CODING_STANDARDS.md`
- `docs/CORE_FREEZE_V0.1.md`
- `docs/decisions/ADR-017-runtime-contract-v0.md`
- `docs/decisions/ADR-019-acceptance-scenarios-v01.md`
- `docs/execution/ATENEA_C084_LOCAL_RECONCILIATION_20261004.md`

Cost policy: `standard`.
Risk class: `volume`.
Method: single bounded unit; use Matt `/implement` under the selected Atenea profile.

## Outcome

Create a durable, reproducible Alpha Runtime Verification plan in `docs/runtime/ALPHA_RUNTIME_VERIFICATION_V0.md`.

The plan must make the 12 ADR-017 tests executable without pretending that VPS/OpenCode can observe ChatGPT-Project behavior it cannot actually observe.

Do not execute the full 12-test battery in this unit.

## In scope

- define one minimal synthetic fixture with no real clinical/patient data;
- order the 12 ADR-017 runtime tests by dependency;
- for every test define: hypothesis, preconditions, reproducible procedure, expected result, observed result placeholder, PASS/FAIL/PARTIAL/BLOCKED rule, required evidence, implication and next action;
- state objectively what proves PASS vs what remains inference;
- mark which steps require Silvia/manual interaction inside ChatGPT Project and which are repo/VPS-preparable;
- define evidence naming/location so later runs are auditable;
- preserve the distinction between runtime failure, fallback need and Core contradiction.

## Preserve

- Core Freeze v0.1 is not reopened by default;
- ADRs 001–019 remain accepted authority;
- Project State explicit wins over implicit Project memory;
- no backend, MCP or cockpit implementation;
- no real Mérida data;
- no claim that a test passed unless behavior was directly observed;
- runtime limitations must not be rewritten as conceptual Core failures without explicit evidence.

## Non-goals

- executing the 12 tests now;
- instantiating the Mérida pilot;
- choosing a backend;
- implementing state persistence machinery;
- changing the 14 Acceptance Scenarios;
- changing the Core criteria catalogue except by HUMAN STOP and explicit reopened authority.

## Evidence to close

- `docs/runtime/ALPHA_RUNTIME_VERIFICATION_V0.md` exists and covers all 12 ADR-017 tests exactly once;
- the fixture is synthetic and sufficient to exercise hypothesis, evidence, decision, action, reopen and provenance;
- PASS/FAIL/PARTIAL/BLOCKED rules are falsifiable;
- manual ChatGPT actions are separated from VPS/OpenCode actions;
- `git diff --check` passes;
- no accepted ADR is silently modified or contradicted;
- the resulting plan names the first test that should actually be run next.

## Publication boundary

This unit may create local commits on `work/alpha-runtime-c084-20261004` and may prepare a normal non-force branch push/checkpoint if the Matt workflow requires it. Do not merge to `main`, create release artifacts, deploy, or modify `core-freeze-v0.1`.

If execution discovers that a Core ADR must change rather than merely a runtime fallback, STOP and return the exact contradiction for human/Cora decision.
