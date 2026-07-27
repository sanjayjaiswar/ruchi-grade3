# Module 3 Lessons 1–5: first-pass Teacher Edition acceptance

Status: Lesson 2 and Lesson 3 source-layout corrections pass static source contracts and the production build; both await a fresh authorized browser recheck.

Correction on 2026-07-26: the earlier Lesson 2 implementation used 5-by-7 and 5-by-8 arrays. That changed the source meaning from “five unit symbols, each worth 7 or 8” to “35 or 40 individual objects.” The generic arrays and three-panel equation cards were replaced with a dedicated worksheet-style unit-form workspace. Problem 1 now retains the source single-cube symbol, both tightly cropped source cube stacks, the source-only horizontal divider, and no invented second-section instruction. Problem 2 uses exactly five vertical unit dots in part a, no divider, and preserves the completely open response area in Blank part b. Solved mode supplies one valid variable response by extending those five units by one unit before showing the distributive and commutative facts. Problem 3 now uses the required five-weeks fact plus two more weeks rather than a generic 7-by-9 individual-dot array. Problem 4 Blank no longer leaks four packs through a pre-segmented tape, and Problem 5 no longer duplicates its budget work in generic equation and answer sections. The Concept sequence was also cleaned of flattened OCR noise and now explicitly builds `5 × 7 = 35`, `35 + 7 = 42`, `6 × 7 = 42`, and `7 × 6 = 42`; Summary retains the Teacher Edition’s Problems 1–2 pattern question. The durable validator now rejects those former model substitutions, altered source layouts, duplications, OCR drift, and answer leaks.

Correction on 2026-07-26 for Lesson 3: a page-level visual-layout contract was transcribed from all three fingerprinted Teacher Edition Problem Set pages before changing the implementation. It first failed the old implementation because Problem 1 replaced paired thought/speech bubbles with generic cards, Problem 2 invented a tape and money table, Problem 3 leaked seven flour groups through a tape, and Problem 4 preprinted a comparison tape and equation scaffold. The corrected Blank states now preserve the source bubble riddle/decoder and the official open response areas; Solved states add answer-key-backed work without changing the printed task. The contract contains no renderer, component, runtime-path, or authored-implementation expectation. Validation compares exact source/answer evidence and a neutral canonical page-layout signature whose expected values come only from the fingerprinted Teacher Edition. Its pre-correction run failed all four problems and its corrected run passed.

Batch-baseline correction on 2026-07-26: the baseline extractor matched the phrase “After the Student Debrief” instead of the real heading in 144 of 152 lessons. Heading extraction now requires line-start evidence while allowing side-column text, model-detection regexes use word boundaries to avoid false positives such as `gram` inside `diagram` and `table` inside `table tennis`, and validation rejects malformed debrief blocks. The regenerated 152-lesson baseline contains no malformed debrief contracts.

## Source of truth

All curriculum facts were checked against `EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf`. The portal was not used as the factual source.

| Lesson | Teacher Edition lesson package | Problem Set pages | Implemented source structures |
|---|---:|---:|---|
| 1 | PDF pages 14–25 | PDF pages 21–22 | 3-by-6 and 6-by-3 commutative model; 10-by-10 fact chart with source givens and 84/16 shading logic; 4-by-6 diamond array; all 12 equivalent equations |
| 2 | PDF pages 26–37 | PDF pages 32–34 | Source cube stacks and exact unit-form lines for sevens; five-dot unit-value model and open response work for eights; author five-fact decomposition; open Blank/crayon-pack Solved model; exact Hannah budget model |
| 3 | PDF pages 38–50 | PDF pages 43–45 | Paired thought/speech-bubble unknown riddle and boxed decoder; two open shirt/change response areas; exact multiplication/division blanks plus open flour workspace; divided open challenge workspace with source badge |
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

`scripts/validate-source-visual-contracts.mjs` is the source-fidelity gate for lessons with fingerprinted page-layout contracts. `scripts/validate-problem-centered-delivery.mjs` remains a regression diagnostic and cannot establish Teacher Edition fidelity or override the source gate. The regression diagnostic includes:

- exact problem counts: 3, 5, 4, 5, and 4;
- required solved evidence for every lesson;
- the complete 10-by-10 Lesson 1 chart, 4-by-6 array, and 12 equation parts;
- the classroom-scale structures introduced in this pass: Lesson 2's source-like unit-form workspaces and Blank/Solved isolation, Lesson 3's 11 paired bubble relationships plus source decoder and open response workspaces, Lesson 4's count strip/fact cards/direction cards/critique cards, and Lesson 5's count strip/fact cards;
- absence of internal audit scaffolding and Teacher Edition answer-key language in Blank mode;
- a three-section maximum for the student-facing visual workspace in this batch.

## Browser acceptance

The original five-lesson pass was checked on 2026-07-22 in the isolated user-authorized `Grade3` Chrome tab in the `Gemini` profile at a 1,920-pixel desktop viewport. No other Chrome tab was inspected or changed. That check predates the 2026-07-26 Lesson 2 and Lesson 3 renderer corrections and does not certify their current pixels; a fresh browser check requires current explicit browser authorization.

All 20 routes passed the first-pass checks:

- Lesson 1: Concept, Blank, Solved, Summary
- Lesson 2: Concept, Blank, Solved, Summary
- Lesson 3: Concept, Blank, Solved, Summary
- Lesson 4: Concept, Blank, Solved, Summary
- Lesson 5: Concept, Blank, Solved, Summary

For every route, required source evidence was visible, the listed internal audit labels were absent, Blank-mode leak checks passed, and no horizontal document overflow occurred. Every Concept, Blank, Solved, and Summary page was visually reviewed live. Solved-mode review also covered the lower source-distinct models: the Lesson 1 diamond array and 12-part equation board, Lesson 2 tape and money work, Lesson 3 purchase/change and tape work, Lesson 4 direction changes and Julie critique, and Lesson 5 make-ten number bond.

The readability/use-of-space acceptance is lesson-specific rather than a single global scale rule:

- Lesson 1 uses a large multiplication chart with the apple pattern and reasoning beside it; the 12 equations form a three-column board.
- Lesson 2 uses worksheet-like stacked unit models with the source Unit form/Facts/Total sequence, then side-by-side model/equation layouts for its remaining source problems.
- Lesson 3 now uses paired thought/speech bubbles and one full-width decoder; its Blank story problems preserve the source's open response spaces instead of invented tape and money scaffolds.
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
