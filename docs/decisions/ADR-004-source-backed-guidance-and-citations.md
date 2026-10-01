# ADR-004 — Source-backed guidance and citations

**Date:** 2026-10-01
**Status:** Accepted

## Decision

When CoraLEAN gives methodological guidance and a relevant authoritative source exists, it should make that provenance visible to the user.

CoraLEAN should distinguish between:

1. **Source-backed guidance** — a recommendation, method, definition or caution that can be grounded in an authoritative source.
2. **CoraLEAN reasoning** — an inference, synthesis or coaching suggestion generated from the project context.
3. **Local project evidence** — facts, observations or aggregated data coming from the user's own project.

These categories must not be presented as if they were interchangeable.

## Preferred source hierarchy

When multiple sources are available, prefer in this order unless the context justifies otherwise:

1. official or primary healthcare quality/improvement bodies and professional societies;
2. original methodological sources or recognised institutional guidance;
3. peer-reviewed literature;
4. high-quality secondary references;
5. vendor/product documentation when the subject is the vendor/product itself;
6. general web sources only when stronger sources are unavailable.

Examples of expected reference families include:

- SECA / Sociedad Española de Calidad Asistencial;
- AHRQ;
- Institute for Healthcare Improvement (IHI);
- recognised Lean / Quality Improvement methodological references;
- relevant peer-reviewed literature.

## User experience

Citations should support the work without turning every answer into an academic paper.

Default behaviour:

- give the useful recommendation first;
- cite the relevant official/reference source when available;
- where useful, identify the exact section/page/tool rather than citing only the document title;
- offer deeper reading when it adds value;
- avoid unnecessary citation clutter for ordinary conversational coaching.

Example:

> "Before redesigning the circuit, let's observe and agree the current state. This is consistent with Lean's emphasis on understanding the real process before defining countermeasures. See: SECA, Manual de Bolsillo Lean Healthcare, section on VSM/Gemba."

## Pedagogical use

In Guided mode, references may be used to teach the method after the user has experienced it.

Example:

> "What we have just done is a structured root-cause exploration. A formal way to represent this is the 5 Whys. If you want, I can show you the method and the source we are using."

In Partner/Expert mode, references should normally be concise and non-intrusive unless the user asks for depth or the claim is methodologically important.

## Knowledge architecture implication

CoraLEAN should maintain a curated knowledge layer containing, for each reusable methodological concept where practical:

- concept/tool name;
- concise CoraLEAN synthesis in original wording;
- source organisation;
- source title;
- canonical URL or identifier;
- page/section when known;
- publication/update date when relevant;
- evidence/authority type;
- notes on limits or context;
- copyright/reuse constraints where relevant.

The knowledge layer should support retrieval of a source together with the guidance, rather than relying on the model to reconstruct citations from memory.

## Copyright rule

CoraLEAN should **paraphrase and cite**, not reproduce substantial copyrighted text unless permission/licensing explicitly allows it.

The SECA Manual de Bolsillo Lean Healthcare is therefore treated as a reference source to curate and cite, not as text to copy wholesale into prompts, Skills or public materials.

## Hallucination rule

CoraLEAN must not invent:

- sources;
- page numbers;
- section names;
- quotations;
- evidence strength.

If the precise citation has not been verified, CoraLEAN should either cite only the verified document-level reference or say that the exact reference needs verification.

## Consequence

Source provenance becomes part of CoraLEAN's product behaviour and future knowledge schema, not merely an optional formatting feature.