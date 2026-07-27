# Module 6 Teacher Edition acceptance

Audited: 2026-07-26  
Scope: all 9 lessons and all 24 official Problem Set tasks.

## Acceptance authority

The fingerprinted Module 6 Teacher Edition PDF and its rendered Problem Set and answer-key pages are the sole acceptance authority. OCR is used only to locate wording. It cannot define a table, graph, ruler, scale, fractional label, task boundary, continuation, response space, or answer.

Blank and Solved must begin with the exact reviewed printed task crop. Authored charts, tape diagrams, rulers, number lines, line plots, equations, explanatory scaffolds, or inferred reconstructions cannot replace or validate that crop. Solved may add only the corresponding numbered Teacher Edition answer-key evidence.

## Official inventory

| Lesson | Teacher pages | Problem Set pages | Answer-key pages | Tasks |
|---:|---:|---:|---:|---:|
| 1 | 10–21 | 16–18 | 147 | 4 |
| 2 | 22–32 | 28–29 | 148 | 3 |
| 3 | 33–49 | 41–43 | 149–150 | 5 |
| 4 | 50–65 | 56–57 | 151 | 2 |
| 5 | 66–77 | 72–73 | 152 | 3 |
| 6 | 78–92 | 86–87 | 153–154 | 2 |
| 7 | 93–105 | 100–101 | 155–156 | 1 |
| 8 | 106–119 | 114–115 | 157–158 | 1 |
| 9 | 120–134 | 128–130 | 159–160 | 3 |

Total: 9 lessons and 24 tasks.

Lessons 7 and 8 retain both printed task pages. Lesson 9 Problem 3 retains its task start and continuation. Shared-page tasks are cropped to their numbered boundaries; Lesson 3 Problems 4 and 5 retain the printed graph/number-line reference as a separate required crop.

## Durable evidence and gates

- Reviewed evidence: `teacher-edition-baseline/module-6-problem-evidence.json`
- Fingerprinted visual contracts: `teacher-edition-baseline/visual-layout-contracts/m6/lesson-01.json` through `lesson-09.json`
- Runtime evidence: `src/app/data/lessons/m6/source-problem-evidence.generated.ts`
- Source-first delivery: `src/app/data/lessons/m6/problem-set-centered.ts`
- Evidence generator: `scripts/generate-m6-reviewed-evidence.mjs`
- Contract generator: `scripts/generate-m6-source-visual-contracts.mjs`
- Runtime generator: `scripts/generate-m6-runtime-evidence.mjs`

The independent source-contract gate failed the previous implementation for all 24 tasks before correction. It now passes all 9 lesson contracts.

## Browser acceptance

An isolated Gemini-profile Chrome session checked all 36 lesson states:

- 9 Concept routes
- 9 Blank routes
- 9 Solved routes
- 9 Summary routes

The 18 Blank/Solved routes covered 48 task states. Every state had the official count and order, exact contracted crop source and geometry, loaded 1020 × 1320 source imagery, no answer leakage in Blank, exact answer-key evidence in Solved, no extra scaffold, no broken image, and no horizontal overflow.

Representative visual captures are retained only in the ignored repository directory `tmp/m6-audit-20260726/`.
