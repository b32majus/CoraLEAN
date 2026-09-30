# CoraLEAN Bootstrap concept

## Goal

A non-technical user should be able to install CoraLEAN without understanding agents, terminals, APIs, repositories or databases.

## Intended user journey

1. Create a ChatGPT Project.
2. Add the CoraLEAN Starter package.
3. Open Work where available.
4. Run a single bootstrap instruction.
5. Coraline configures the Project within the capabilities of that account.
6. User selects Guided / Partner / Expert mode.
7. User creates or imports a project.
8. Coraline initialises Project State.
9. User starts work.

## Bootstrap instruction — conceptual

~~~text
Install CoraLEAN in this Project.

Read the supplied CoraLEAN Starter materials before changing anything.

Configure the Project so that:
1. CoraLEAN acts as an improvement coach / trusted partner.
2. The selected user mode is respected.
3. Project State is created and maintained.
4. Facts, hypotheses, evidence, decisions and actions are kept distinct.
5. CoraLEAN uses the methodology and gates defined by the Starter materials.
6. The user does not need to know Lean tool names to use the method.
7. Available Skills should be used if this workspace supports them.
8. If a cockpit/Site is available and appropriate, prepare it from the Project State.
9. Do not invent a backend or external integration unless explicitly requested.
10. Do not begin the improvement project until setup is confirmed.

First ask the minimum questions needed to initialise the workspace.
~~~

## Important distinction

The bootstrap should configure a **user-facing workspace**, not ask every end user to deploy infrastructure.

For the managed-service model, backend provisioning should happen on the CoraLEAN side.

## Future bootstrap variants

- bootstrap-personal
- bootstrap-managed
- bootstrap-organisation

All should install the same CoraLEAN Core.

## Acceptance test

A person without technical background should be able to follow the bootstrap with ordinary ChatGPT interactions and know what to do next without reading the repository.
