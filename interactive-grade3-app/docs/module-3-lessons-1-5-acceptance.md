# Module 3 Lessons 1–5: first-pass Teacher Edition acceptance

Status: source-faithful functional pass complete; later visual polish remains optional.

## Source of truth

All curriculum facts were checked against `EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf`. The portal was not used as the factual source.

| Lesson | Teacher Edition lesson package | Problem Set pages | Implemented source structures |
|---|---:|---:|---|
| 1 | PDF pages 14–25 | PDF pages 21–22 | 3-by-6 and 6-by-3 commutative model; 10-by-10 fact chart with source givens and 84/16 shading logic; 4-by-6 diamond array; all 12 equivalent equations |
| 2 | PDF pages 26–37 | PDF pages 32–34 | 5-plus-1 distributive arrays for sevens and eights; author array; crayon tape; exact Hannah budget model |
| 3 | PDF pages 38–50 | PDF pages 43–45 | Complete unknown-letter riddle; shirt-cost and change models; flour tape with multiplication/division and `n`; two-game comparison tape |
| 4 | PDF pages 51–61 | PDF pages 57–58 | Count-by-six matching, sequences, direction changes, multiplication/division pairs, and Julie error analysis |
| 5 | PDF pages 62–72 | PDF pages 68–69 | Fish-bowl count-by-seven matching, fact pairs, make-ten number bond, and commutative strategy comparison |

## Delivered first pass

- Concept pages use lesson-specific Teacher Edition examples and explanations instead of one generic Module 3 scaffold.
- Blank mode preserves official givens and omits solved results.
- Solved mode completes every official Problem Set item in source order and exposes the reasoning/model needed to understand the result.
- Internal audit/debug sections such as source checks, equation-library checks, and generic reasoning tables are not rendered in Lessons 1–5.
- The existing source-specific animations for commutativity, 5-plus-1, unknown letters, count-by-six, and count-by-seven remain the instructional motion layer.
- A cached Teacher Edition preparation command (`npm run prepare:teacher-source -- m3`) creates one ignored module extraction and reuses it when the PDF is unchanged.

## Durable validation

`scripts/validate-problem-centered-delivery.mjs` now checks the five-lesson batch contract, including:

- exact problem counts: 3, 5, 4, 5, and 4;
- required solved evidence for every lesson;
- the complete 10-by-10 Lesson 1 chart, 4-by-6 array, and 12 equation parts;
- absence of internal audit scaffolding and Teacher Edition answer-key language in Blank mode;
- a three-section maximum for the student-facing visual workspace in this batch.

## Browser acceptance

Checked on 2026-07-21 in one dedicated agent-owned Chrome tab in the authorized `Gemini` profile at a 1,920-pixel desktop viewport.

All 20 routes passed the first-pass checks:

- Lesson 1: Concept, Blank, Solved, Summary
- Lesson 2: Concept, Blank, Solved, Summary
- Lesson 3: Concept, Blank, Solved, Summary
- Lesson 4: Concept, Blank, Solved, Summary
- Lesson 5: Concept, Blank, Solved, Summary

For every route, required source evidence was visible, the listed internal audit labels were absent, Blank-mode leak checks passed, and document width equaled viewport width (`1920 / 1920`). Full-page visual review covered the source-distinct Lesson 1, Lesson 2, and Lesson 3 solved layouts; the Lesson 4 and Lesson 5 shared count-by components passed the same DOM/content/overflow checks.

No runtime errors were logged. Angular emitted two non-blocking development warnings because the collapsed Lesson 1 source-reference images have much larger intrinsic dimensions than their rendered thumbnails. This does not affect the learning flow and is deferred to a later optimization/polish pass.

## Deferred polish

- Optional tighter wording and spacing refinements.
- Optional source-thumbnail resizing to remove Angular's development-only image-size warnings.
- Additional cosmetic comparison captures for Lessons 4 and 5 if a dedicated visual-polish pass is requested.
