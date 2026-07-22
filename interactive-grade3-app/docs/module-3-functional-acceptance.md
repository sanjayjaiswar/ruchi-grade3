# Module 3 functional Teacher Edition acceptance

Status: all 21 lessons have a source-faithful functional first pass. Pixel polish is intentionally deferred.

## Controlling source

- Teacher Edition PDF: `EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf`
- Durable lesson contracts: `teacher-edition-baseline/contracts/m3/lesson-01.json` through `lesson-21.json`
- PDF fingerprint, page boundaries, objectives, lesson sequence, Problem Set prompts, and answer-key text are validated by `npm run validate:teacher-baseline`.
- The portal is not a source of truth.
- Student-facing Problem Set scans are labeled as Problem Set sources. Teacher Edition answer-key scans are identified separately in Solved mode.

## Lesson coverage

| Lesson | Teacher Edition pages | Problems | Primary functional model or motion |
|---:|---:|---:|---|
| 1 | 14–25 | 3 | commutative arrays and fact chart |
| 2 | 26–37 | 5 | 5-plus-1 distributive arrays |
| 3 | 38–50 | 4 | unknown-letter tape models |
| 4 | 51–61 | 5 | count-by-6 relationships |
| 5 | 62–72 | 4 | count-by-7 and make-ten |
| 6 | 73–84 | 5 | distributive 6-and-7 arrays |
| 7 | 85–96 | 3 | unknown interpretation tapes |
| 8 | 97–107 | 5 | parentheses and grouping |
| 9 | 108–118 | 4 | associative regrouping arrays |
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

Total: 21 lessons and 93 official Problem Set entries.

## Functional acceptance rules

- Each Concept page has three lesson-specific stages tied to its Teacher Edition contract and an instructional motion/model.
- Blank mode preserves official givens and does not reveal Teacher Edition answers.
- Solved mode completes the same official item and checks the result against Teacher Edition answer-key evidence.
- Visuals use the quantities and relationships of the source problem; generic audit tables and invented placeholder equations are rejected.
- Student-facing visual workspaces contain no more than three purposeful sections.
- Content accuracy, problem order, equations, units, and answer meaning are release-blocking; cosmetic alignment is not.

## Verification completed 2026-07-21

- Browser sweep: 84 of 84 states passed (Concept, Blank, Solved, and Summary for Lessons 1–21).
- Blank-mode answer leak: none found.
- Internal audit/debug scaffolding: none rendered.
- Horizontal overflow: none found at the verified desktop viewport.
- Lessons 1–5 retain their earlier source-specific solved layouts; a focused recheck confirmed them after the shared sweep initially expected a label used only by Lessons 6–21.

## Repeatable validation

Run from `interactive-grade3-app`:

```bash
npm run validate:teacher-baseline
npm run validate:problem-centered-delivery
npm run validate:no-pdf-problem-tabs
npm run build -- --progress=false
```

The delivery validator enforces all 21 Module 3 contracts, exact page ranges and objectives, all 93 Problem Set entries, lesson-specific concept/motion families, required visual-model families, Blank/Solved separation, answer-key grounding, and the absence of internal audit scaffolding.

## Deferred

Only optional visual polish, copy tightening, and thumbnail optimization remain. These items must not change the Teacher Edition facts or lesson strategy.
