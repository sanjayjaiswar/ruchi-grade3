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
- the classroom-scale structures introduced in this pass: Lesson 2's three equal-group panels, Lesson 3's 11 equation cards plus decoder, Lesson 4's count strip/fact cards/direction cards/critique cards, and Lesson 5's count strip/fact cards;
- absence of internal audit scaffolding and Teacher Edition answer-key language in Blank mode;
- a three-section maximum for the student-facing visual workspace in this batch.

## Browser acceptance

Rechecked on 2026-07-22 in the isolated user-authorized `Grade3` Chrome tab in the `Gemini` profile at a 1,920-pixel desktop viewport. No other Chrome tab was inspected or changed.

All 20 routes passed the first-pass checks:

- Lesson 1: Concept, Blank, Solved, Summary
- Lesson 2: Concept, Blank, Solved, Summary
- Lesson 3: Concept, Blank, Solved, Summary
- Lesson 4: Concept, Blank, Solved, Summary
- Lesson 5: Concept, Blank, Solved, Summary

For every route, required source evidence was visible, the listed internal audit labels were absent, Blank-mode leak checks passed, and no horizontal document overflow occurred. Every Concept, Blank, Solved, and Summary page was visually reviewed live. Solved-mode review also covered the lower source-distinct models: the Lesson 1 diamond array and 12-part equation board, Lesson 2 tape and money work, Lesson 3 purchase/change and tape work, Lesson 4 direction changes and Julie critique, and Lesson 5 make-ten number bond.

The readability/use-of-space acceptance is lesson-specific rather than a single global scale rule:

- Lesson 1 uses a large multiplication chart with the apple pattern and reasoning beside it; the 12 equations form a three-column board.
- Lesson 2 uses three equal-group teaching panels, then side-by-side model/equation layouts for its array, tape, and word problems.
- Lesson 3 replaces the tiny 11-row riddle table with 11 equation cards and one full-width decoder; its story problems retain the source tape and money structures.
- Lessons 4 and 5 use a full-width count strip with readable fact cards, while direction changes, critiques, and the make-ten number bond keep their own source-specific layouts.
- At the checked viewport, problem prompts render at approximately 21 px, equation fields at approximately 23 px, retained source-table cells at 16–20 px, and each problem workspace uses approximately 1,834 px of the available lesson canvas.

### Concept teaching-board correction

The Concept-page animation board was rechecked after a live example exposed that its three equal columns made the actual mathematics too small. The correction applies to all five lessons, not only the reported Lesson 3 page:

- Supporting explanation occupies one compact column; the source-specific model receives the dominant board area.
- Teaching steps form a horizontal strip beneath the model instead of forcing a tall notes column and leaving unused vertical space inside the board.
- Lesson 1 renders two large commutative arrays; Lesson 2 renders a large 5-plus-1 distributive fact chain; Lesson 3 renders the three distinct unknown positions as large story cards; Lessons 4 and 5 render full-width count sequences and three make-ten bridge cards.
- The live 1,920-pixel Chrome check measured a 1,432-by-448-pixel model stage. Model widths are 1,080, 1,080, 1,120, 1,160, and 1,160 pixels for Lessons 1–5 respectively, with no document-level horizontal overflow.
- Representative model text is 20 px in Lesson 1, 24 px in Lesson 2, 16–20 px in Lesson 3, and 22 px in Lessons 4 and 5. All five Replay controls were activated during the check.

The durable delivery validator now rejects removal of this batch layout contract, including the model-dominant board, full-width inner array wrapper, lesson-specific model rules, and horizontal teaching-step strip.

No runtime errors were logged. Angular emitted non-blocking development warnings because the collapsed Teacher Edition source-reference images have much larger intrinsic dimensions than their rendered thumbnails. This does not affect the learning flow and is deferred to a later optimization/polish pass.

## Deferred polish

- Optional tighter wording and spacing refinements.
- Optional source-thumbnail resizing to remove Angular's development-only image-size warnings.
- Additional cosmetic comparison captures for Lessons 4 and 5 if a dedicated visual-polish pass is requested.
