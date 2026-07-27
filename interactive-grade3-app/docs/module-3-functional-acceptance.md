# Module 3 functional Teacher Edition acceptance

Status: all 21 lessons and all 92 official Problem Set items use the Teacher Edition task as the first learner-facing visual in Blank and Solved modes.

## Controlling source

- Teacher Edition PDF: `EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf`
- Durable lesson contracts: `teacher-edition-baseline/contracts/m3/lesson-01.json` through `lesson-21.json`
- Page-layout contracts: `teacher-edition-baseline/visual-layout-contracts/m3/lesson-01.json` through `lesson-21.json`
- Per-problem answer evidence: `teacher-edition-baseline/module-3-problem-answer-evidence.json`
- PDF fingerprint, page boundaries, objectives, lesson sequence, Problem Set prompts, and answer-key text are validated by `npm run validate:teacher-baseline`.
- The portal is not a source of truth.
- The exact fingerprinted Problem Set page crop is rendered first. It preserves the printed primitive, quantity, orientation, grouping, wording, and response workspace instead of substituting an inferred model.
- Solved mode keeps that same source task first and places Teacher Edition Answer Key evidence after it.

## Lesson coverage

| Lesson | Teacher Edition pages | Problems | Primary functional model or motion |
|---:|---:|---:|---|
| 1 | 14–25 | 3 | commutative arrays and fact chart |
| 2 | 26–37 | 5 | printed cube stacks, unit dots, and open workspaces |
| 3 | 38–50 | 4 | printed bubbles, decoder, and open workspaces |
| 4 | 51–61 | 5 | count-by-6 relationships |
| 5 | 62–72 | 4 | count-by-7 and make-ten |
| 6 | 73–84 | 5 | distributive 6-and-7 arrays |
| 7 | 85–96 | 3 | unknown interpretation tapes |
| 8 | 97–107 | 5 | parentheses and grouping |
| 9 | 108–118 | 3 | associative regrouping arrays |
| 10 | 119–129 | 6 | distributive multiplication/division |
| 11 | 130–149 | 6 | unknowns in word-problem tapes |
| 12 | 150–162 | 4 | 9 = 10 − 1 distributive motion |
| 13 | 163–175 | 4 | multiples-of-9 number-line pattern |
| 14 | 176–186 | 4 | 10-minus-1 digit patterns |
| 15 | 187–199 | 6 | unknown position in tape models |
| 16 | 200–211 | 5 | zero-and-one patterns |
| 17 | 212–224 | 2 | multiplication-table patterns |
| 18 | 225–237 | 5 | two-step four-operation tapes |
| 19 | 238–247 | 4 | ones-to-tens place value |
| 20 | 248–257 | 3 | associative regrouping with multiples of 10 |
| 21 | 258–269 | 6 | two-step multiplication and time tapes |

Total: 21 lessons and 92 official Problem Set entries.

The prior OCR split for Lesson 9 was wrong: it interpreted “thinking about 8 × 4. Explain her strategy” as a fourth numbered problem. The Teacher Edition Problem Set and answer key contain only Problems 1–3. The generated source data, lesson runtime, baseline, and validators now agree on three.

## Functional acceptance rules

- Each Concept page has three lesson-specific stages tied to its Teacher Edition contract and an instructional motion/model.
- Blank mode begins with the complete printed task and its original unanswered workspace.
- Solved mode begins with the identical printed task and adds only answer-key-backed evidence afterward.
- A generic array, tape, card set, dot grid, or equation panel cannot replace the printed task, even when its arithmetic is equivalent.
- Student-facing visual workspaces contain no more than three purposeful sections.
- Content accuracy, official problem count/order, printed visual structure, equations, units, and answer meaning are release-blocking.
- Schema-v2 source contracts are the acceptance authority. Older renderer-specific regression checks are fallback diagnostics only and cannot override the Teacher Edition.

## Current verification

- All 21 visual contracts bind exact Problem Set and answer-key images to the Module 3 Teacher Edition PDF fingerprint.
- All 48 official Problem Set images and all 94 task crops for the 92 official problems were reviewed in one labeled source sheet. Lessons 17 and 19 contain the two multi-page tasks.
- All 92 Blank states pass exact source-first crop comparison, image-dimension/bounds checks, and controlling-page checks.
- All 92 Solved states retain the same source-first task and match a lesson/problem-specific Teacher Edition answer transcription.
- Contract refresh preserves reviewed Teacher Edition expectations and refreshes fingerprints only; it does not derive expected layouts from runtime code.
- The full static regression and production build are required before module handoff.

The stricter per-problem answer gate failed before correction on Lesson 13 Problem 3. The implementation had inferred that part (d) must describe the nines pattern; the Teacher Edition answer key says “Answers will vary.” The runtime and source-only answer evidence now use the Teacher Edition wording.

The browser sweep recorded on 2026-07-21 predates this module-wide source-first correction and does not certify the current pixels. On 2026-07-26, a new isolated Chrome session verified the default-allowed `Gemini` profile and loaded the current Lesson 1 Blank route, but browser control disconnected when the 84-state sweep began and failed its one permitted retry. The current rendered states therefore remain blocked—not passed—until a fresh `Gemini` Chrome window is authorized and the sweep is rerun.

## Repeatable validation

Run from `interactive-grade3-app`:

```bash
npm run validate:teacher-baseline
npm run validate:source-visual-contracts -- --lessons m3-l1,m3-l2,m3-l3,m3-l4,m3-l5,m3-l6,m3-l7,m3-l8,m3-l9,m3-l10,m3-l11,m3-l12,m3-l13,m3-l14,m3-l15,m3-l16,m3-l17,m3-l18,m3-l19,m3-l20,m3-l21
npm run validate:problem-centered-delivery
npm run validate:no-pdf-problem-tabs
npm run validate:solved-fidelity
npm run build -- --progress=false
```

The source-visual validator is the fidelity gate. It enforces the reviewed Teacher Edition image hashes, page numbers, complete crop bounds, source-first order, official source/answer evidence, and Blank/Solved isolation. The broader delivery validator checks page ranges, objectives, 92-item order, concept/motion presence, and the absence of internal audit scaffolding.

## Deferred

A fresh authorized browser/pixel review remains. It must not change the Teacher Edition task or use runtime appearance as a substitute source of truth.
