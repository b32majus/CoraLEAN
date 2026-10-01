# START HERE — CoraLEAN

**Last updated:** 2026-10-01
**Status:** Phase 0 / current direction accepted for exploration; final architecture not frozen.
**Core Freeze v0.1:** completado el 2026-10-01. La fuente canónica del Core (contratos, modelo, comportamientos) son los ADRs de `docs/decisions/` y el mapa de `docs/CORE_FREEZE_V0.1.md`.

## 1. What are we building?

CoraLEAN is a **guided improvement-project coach**.

It should help a healthcare professional move from:

> "I know there is a problem, but I do not know how to lead a project to understand and improve it."

to:

> "I can structure the problem, involve the right people, understand the real process, gather evidence, analyse causes, test changes, measure impact and learn from the result."

The key product is therefore **the way of thinking and the way the work is sequenced**, not a collection of Lean templates.

## 2. What CoraLEAN is not

CoraLEAN is not initially:

- a generic chatbot about Lean;
- a library of prompts;
- a replacement for an improvement advisor;
- a giant catalogue of Lean tools;
- a standalone SaaS platform;
- an AI API paid for by each end user;
- a system that forces users to understand agents, terminals, APIs or software architecture.

## 3. First runtime hypothesis

The first version should exploit what the user already has:

**ChatGPT Project**
- project instructions;
- files/context;
- multiple chats;
- Voice;
- Work;
- web research where appropriate;
- Skills where the user's workspace supports them.

OpenAI currently documents Projects as containers for chats, files and project-specific instructions, with tools such as Voice available inside Projects:
https://help.openai.com/es-es/articles/10169521-using-projects-in-chatgpt

OpenAI currently documents Skills as reusable, shareable workflows containing instructions, examples, supporting resources and/or code. Availability depends on workspace/product surface:
https://help.openai.com/es-es/articles/20001066-skills-in-chatgpt

ChatGPT Sites can create interactive websites/lightweight apps from Work where the feature is available:
https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites

**Important:** CoraLEAN must not depend on a feature that is unavailable to a user's plan/workspace. Skills and Sites are accelerators, not the methodological foundation.

## 4. Three-layer model

### Layer A — CoraLEAN Core

The reusable intellectual product:

- methodology;
- governance;
- stage logic;
- gates;
- pedagogical rules;
- expert/partner behaviour;
- toolkit;
- schemas;
- playbooks;
- bootstrap instructions.

### Layer B — Project workspace

Initially a ChatGPT Project:

- project context;
- project chats;
- Voice conversations;
- Work tasks;
- project files;
- Project State;
- generated artefacts.

### Layer C — Cockpit / state infrastructure

Initially minimal and potentially just a structured state file.

Later it may become:

- CoraLEAN Desk;
- shared backend;
- real-time dashboard;
- MCP bridge;
- standalone application.

## 5. User modes

The same methodology should support different levels of scaffolding.

### Guided

For people with little/no QI or Lean experience.

- asks more questions;
- explains why the question matters;
- introduces tools after using them;
- prevents premature solutions;
- teaches through the real project.

### Partner

For people who already understand improvement methods.

- assumes baseline methodological literacy;
- focuses on reasoning, challenge and decision quality;
- avoids unnecessary explanations;
- acts as a trusted critical partner.

### Expert

For experienced improvement professionals.

- high information density;
- minimal pedagogy;
- can enter at an advanced phase;
- performs adversarial methodological review;
- still respects the same gates and evidence standards.

The mode changes the **amount of scaffolding**, not the methodological integrity.

## 6. Human-language work intents

CoraLEAN should expose work-oriented intents rather than Lean-tool names.

Examples:

- Start a project
- I have an idea
- What should I do now?
- Prepare the next meeting
- I have just finished a meeting
- Analyse these notes
- We found something unexpected
- We do not know what is causing this
- Help me understand the process
- What do we need to measure?
- We have several possible changes
- Review our project
- What are we missing?
- Prepare the workshop
- Prepare the A3/report/presentation

The user should not need to know that the internal method corresponds to VSM, 5 Whys, Fishbone, PDSA, Driver Diagram, etc.

When a formal tool has been used, CoraLEAN may teach it afterwards.

## 7. Core design principle

> **Artefacts and project state are the source of truth; the conversation is the reasoning surface.**

Do not make a 600-message chat the only memory of a project.

## 8. What happens next

1. Finish the deep research / benchmark pass.
2. Define CoraLEAN Method v0.1.
3. Define the Project State model.
4. Define AGENTS.md and the Project instructions.
5. Build the Starter Kit/bootstrap.
6. Set up the first Mérida pilot.
7. Dogfood CoraLEAN with Silvia.
8. Test with the Mérida pharmacist and a small external group.
9. Record friction/error findings.
10. Only then decide which parts deserve software, backend, Desk or MCP.

## 9. Pilot success criterion

The first pilot is successful if a professional who has not previously led this kind of project can, with decreasing support from Silvia, use CoraLEAN to prepare and conduct the early stages of a real improvement project.

A visually impressive app without capability transfer is not success.
