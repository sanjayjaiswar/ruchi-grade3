# Module 3 functional Teacher Edition acceptance

Status: accepted on 2026-08-13. All 21 lessons and all 92 official Problem Set items preserve the Teacher Edition task in authored, interactive Blank and Solved visuals.

## Controlling source

- Teacher Edition PDF: `EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf`
- Durable lesson contracts: `teacher-edition-baseline/contracts/m3/lesson-01.json` through `lesson-21.json`
- Page-layout contracts: `teacher-edition-baseline/visual-layout-contracts/m3/lesson-01.json` through `lesson-21.json`
- Per-problem answer evidence: `teacher-edition-baseline/module-3-problem-answer-evidence.json`
- PDF fingerprint, page boundaries, objectives, lesson sequence, Problem Set prompts, and answer-key text are validated by `npm run validate:teacher-baseline`.
- The portal is not a source of truth.
- Authored visuals preserve the printed primitive, quantity, orientation, grouping, wording, and response workspace instead of substituting a merely equivalent model.
- Tight source crops are used only when the original illustration itself carries mathematical meaning.
- Solved mode keeps the same task structure and adds only Teacher Edition Answer Key evidence.

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
- Blank mode presents the complete printed task structure with unanswered interactive fields and workspaces.
- Solved mode preserves that structure and adds only answer-key-backed evidence.
- A generic array, tape, card set, dot grid, or equation panel cannot replace the printed task, even when its arithmetic is equivalent.
- Content accuracy, official problem count/order, printed visual structure, equations, units, and answer meaning are release-blocking.
- Schema-v2 source contracts are the acceptance authority. Older renderer-specific regression checks are fallback diagnostics only and cannot override the Teacher Edition.

## Current verification

- All 21 schema-v2 visual contracts bind exact Problem Set and answer-key page evidence to the Module 3 Teacher Edition PDF fingerprint.
- The 48 controlling Problem Set and answer-key pages were inspected in five labeled source-audit batches: Lessons 1–5, 6–10, 11–15, 16–20, and 21.
- The source-only visual validator passes all 21 lessons and all 92 problems in both Blank and Solved modes.
- Blank mode contains no answer leakage; Solved mode preserves the source task and matches per-problem Teacher Edition answer evidence.
- Validator dispatch is module-scoped. Module 1, 4, 5, 6, or 7 recognizers cannot intercept a Module 3 task with similar wording.
- `npm run build`, the 152-lesson Teacher Edition baseline, authored-problem-tab validation, problem-centered delivery, and 673-problem Solved fidelity all pass.

### Chrome visual acceptance

- Profile: default-allowed `Gemini`, using a dedicated agent-owned Chrome tab.
- Desktop viewport: 1920 × 940 CSS pixels.
- Routes checked: Concept, Blank, Solved, and Summary for every lesson, totaling 84 rendered states.
- Result: 0 document-width overflows, 0 problem-card overflows, 0 broken images, and 0 secondary `h2`/`h3` headings at or above 30 px.
- The largest secondary heading is 24.8 px. The oversized 29–33 px Module 3 card, concept, animation, and summary headings have been removed.
- Lesson 10 Problem 4 now uses a compact nine-octagon chain instead of a display-sized geometry canvas.
- Lesson 17 Problems 1 and 2 place the written analysis below the table/models at full width instead of trapping it in a half-width column.
- Full-page screenshots, four 21-lesson contact sheets, and route metrics are in ignored local audit output under `tmp/m3-render-audit/final/`.

### Interaction acceptance

- Correct-answer feedback passed in Lessons 3, 6, 10, 17, and 19.
- Lesson 4 click-to-match produced one correct line and reset to zero lines.
- Lesson 17's even-product table selection produced the correct-selection state.
- Lesson 15 drawing and Clear drawing were exercised and visually verified.
- Concept animation replay visibly restarted in Lessons 1, 6, 11, 16, and 21, covering every five-lesson batch and the final lesson.
- Browser console result: 0 errors. Angular emitted non-blocking `NG0913` warnings because fingerprinted source-page images have larger intrinsic dimensions than their rendered concept references.

## Repeatable validation

Run from `interactive-grade3-app`:

```bash
npm run validate:teacher-baseline
npm run validate:source-visual-contracts -- --lessons m3-l1,m3-l2,m3-l3,m3-l4,m3-l5,m3-l6,m3-l7,m3-l8,m3-l9,m3-l10,m3-l11,m3-l12,m3-l13,m3-l14,m3-l15,m3-l16,m3-l17,m3-l18,m3-l19,m3-l20,m3-l21
npm run validate:problem-centered-delivery
npm run validate:no-pdf-problem-tabs
npm run validate:solved-fidelity
npm run build
```

The source-visual validator is the fidelity gate. It enforces reviewed Teacher Edition image hashes and page numbers, source-observed layout signatures, official source/answer evidence, and Blank/Solved isolation. The broader delivery validator checks page ranges, objectives, 92-item order, concept/motion presence, and the absence of internal audit scaffolding.

## Non-blocking follow-up

The high-resolution source references can be served with responsive image variants later to eliminate Angular `NG0913` performance warnings. Any optimization must retain the fingerprinted originals as controlling evidence and must not change the learner-facing task.
