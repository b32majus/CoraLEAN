# CoraLEAN Feedback Protocol

## Principle

The product should be built from **frictions and failures**, not from feature wishlists.

## A friction finding records

~~~yaml
id:
date:
project:
user_type:
mode:
phase:
intent:
expected:
actual:
friction:
impact:
workaround:
root_cause_hypothesis:
evidence:
proposed_change:
disposition:
status:
~~~

## Useful categories

- cannot find next step;
- does not understand why Coraline asks something;
- too much explanation;
- too little explanation;
- loses project context;
- state becomes inconsistent;
- user bypasses method;
- wrong methodological intervention;
- wrong phase recommendation;
- cockpit not representative;
- meeting preparation insufficient;
- evidence/hypothesis distinction unclear;
- artefact generation poor;
- backend sync problem;
- permission problem;
- installation/bootstrap problem.

## What not to optimise for

Do not prioritise:

- "I like this colour";
- "add another Lean tool";
- "make it look like Jira";
- generic requests for more features;

unless they correspond to a real repeated workflow problem.

## Pilot feedback questions

After a meaningful interaction, ask:

1. What were you trying to accomplish?
2. Did you know what to do next?
3. Did Coraline ask the right question?
4. Did you understand why it asked it?
5. Did it assume something you knew was not true?
6. Did you have to leave Coraline to do something?
7. Did you lose track of project state?
8. Did the cockpit represent where you thought the project was?
9. Did Coraline explain too much or too little?
10. Could you do the same task more independently next time?

## Product signal

The most valuable positive signal is **decreasing dependence on Silvia** without decreasing project quality.

The most valuable negative signal is a recurring point where users cannot continue without human intervention even though the method should support them.
