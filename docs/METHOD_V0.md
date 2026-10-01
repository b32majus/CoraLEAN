# CoraLEAN Method v0 — working draft

> **⚠ Estado tras el Core Freeze v0.1 (2026-10-01):** los *Principios* (1–12) siguen vigentes. El *Provisional lifecycle* de 10 fases con gates está **SUPERSEDED** por ADR-006 (modelo híbrido: áreas de razonamiento + momentos de navegación), ADR-007 (las siete áreas) y ADR-012. El «methodological brake» por fase está **SUPERSEDED** por las condiciones de avance de ADR-010 (dos ejes) y el invariante de suficiencia de ADR-008. La sección *Pedagogy* está **SUPERSEDED** por el contrato de comportamiento de ADR-014. Fuente canónica del método: `docs/decisions/` y `docs/CORE_FREEZE_V0.1.md`. Este documento se conserva como registro histórico del razonamiento inicial.

This is a working methodology, not yet a locked clinical/QI standard.

## Principles

1. Start with the real problem, not the preferred solution.
2. Make the problem narrow enough to work on and important enough to matter.
3. Separate facts, observations, hypotheses and decisions.
4. Understand the current process before redesigning it.
5. Involve the people who actually perform the work.
6. Measure enough to make decisions; do not collect data merely because it is available.
7. Do not confuse symptoms with causes.
8. Do not allow solution enthusiasm to substitute for diagnosis.
9. Test changes deliberately before treating them as the new standard.
10. Make learning explicit.
11. Transfer capability to the local team.
12. Keep the next useful step visible.

## Provisional lifecycle

### 0. Readiness

Questions:

- Is there a meaningful problem?
- Is there a sponsor/champion?
- Is there a local project lead?
- Is the relevant team available?
- Is there enough authority/capacity to change something?
- Can the process be observed?
- Can relevant data be accessed?
- Is there protected time for the work?

Output: readiness decision and initial project context.

### 1. Frame

Define:

- problem;
- affected process/population;
- boundaries;
- why it matters;
- initial aim;
- known facts;
- assumptions;
- stakeholders.

Gate: the project is sufficiently bounded to investigate.

### 2. Understand the current state

Build a shared picture of the real process:

- steps;
- actors;
- decisions;
- handoffs;
- queues;
- rework;
- information;
- variation;
- workarounds;
- pain points.

Output can include process map/VSM/SIPOC or another representation appropriate to the case.

Gate: the team agrees that the representation is a credible current state.

### 3. Evidence and baseline

Identify:

- what is already known;
- what is missing;
- baseline measures;
- qualitative evidence;
- data collection plan;
- operational definitions.

Gate: enough evidence exists to make the next analytical decision.

### 4. Analyse

Iteratively explore:

- symptoms;
- contributing factors;
- root causes;
- system constraints;
- variation;
- dependencies.

Tools are selected by need, not by checklist.

Possible tools include 5 Whys, Fishbone, Pareto, Driver Diagram, observation, stratification and qualitative analysis.

Gate: proposed causes are explicit and their evidentiary status is visible.

### 5. Prioritise

Select what to act on using explicit criteria, such as:

- impact;
- evidence;
- feasibility;
- strategic fit;
- risk;
- effort;
- controllability.

The matrix is a decision aid, not objective truth.

### 6. Design changes

Develop countermeasures tied to causes.

Each proposed change should state:

- cause addressed;
- expected mechanism;
- owner;
- testable hypothesis;
- operational impact;
- risks;
- measure.

### 7. Test / PDSA

Run small, deliberate tests where appropriate.

Distinguish:

- idea;
- test;
- implementation;
- standardisation.

### 8. Implement and sustain

Define:

- standard work;
- ownership;
- monitoring;
- escalation;
- training;
- handover;
- sustainability checks.

### 9. Evaluate and learn

Compare:

- intended outcome;
- process measures;
- balancing measures;
- unintended effects;
- qualitative learning.

Capture what should be repeated, changed, stopped or spread.

## The methodological brake

At every phase Coraline should ask:

> "What would have to be true for us to be ready to move on?"

It should not advance simply because the user asks for the next tool.

## Pedagogy

In Guided mode:

- use plain language first;
- introduce formal terminology after the concept is experienced;
- explain why a question matters;
- avoid overwhelming the user with the whole framework.

Example:

> "Let's pull this thread a little further. We need to know what is actually generating the delay."

After the work:

> "What we have just done is a form of root-cause exploration. One formal technique for this is the 5 Whys..."

In Partner/Expert mode, the explanation can be omitted unless useful.

## Important non-goal

CoraLEAN should never turn the methodology into a rigid eight-step bureaucracy. Real projects can loop backwards. The lifecycle is a reasoning scaffold, not a waterfall.
