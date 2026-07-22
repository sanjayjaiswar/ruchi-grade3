# Module 6 functional acceptance

This document records the durable first-pass acceptance contract for Grade 3 Module 6. The Teacher Edition baseline is the factual source of truth. The portal and prior lesson copy are never authoritative when they differ from that baseline.

## Scope and completion bar

- All 9 lessons must preserve the exact Teacher Edition objective, lesson-page range, Problem Set order, problem count, prompts, fixed data, and solved answers.
- Every Concept view must contain three lesson-specific stages, a visible three-step animation, a source-conforming data or measurement model, and a question that connects the model to the mathematics.
- Every Problem Set item must have a usable Blank model and a Teacher Edition-aligned Solved model. Required tallies, picture graphs, tape diagrams, bar graphs, rulers, tables, number lines, and line plots must be visible learning surfaces rather than prose substitutes.
- Summary must contain the lesson takeaway and a Problem Set meaning map.
- Functional learning fidelity is required. Pixel-perfect reproduction of the printed page is not required.
- Generic audit scaffolds, hidden animations, empty graph marks, answer leakage in Blank mode, broken source images, horizontal overflow, and more than three purposeful visual sections per problem are failures.

## Teacher Edition contract

| Lesson | Teacher pages | Problems | Primary learning model |
|---:|---:|---:|---|
| 1 | 10–21 | 4 | Generate and organize class data with tally and picture graphs |
| 2 | 22–32 | 3 | Rotate tape diagrams vertically and reason about equal units |
| 3 | 33–49 | 5 | Create scaled bar graphs and transfer graph intervals to a number line |
| 4 | 50–65 | 2 | Solve one- and two-step problems from scaled graphs |
| 5 | 66–77 | 3 | Construct whole-, half-, and quarter-inch rulers and record measurements |
| 6 | 78–92 | 2 | Interpret measurement data from line plots |
| 7 | 93–105 | 1 | Represent measurement data with a line plot |
| 8 | 106–119 | 1 | Represent quarter-inch measurement data with a line plot |
| 9 | 120–134 | 3 | Analyze picture-graph and line-plot data to solve problems |

Total: **9 lessons and 24 official Problem Set items**.

## Durable implementation and checks

- Teacher facts and lesson-specific concept models: `src/app/data/lessons/m6/functional-fidelity.ts`
- Problem Set prompts, source models, Blank/Solved visuals, and runtime attachment: `src/app/data/lessons/lesson-registry.ts`
- Durable functional validator: `scripts/validate-problem-centered-delivery.mjs`
- Precomputed source baseline validator: `scripts/validate-teacher-edition-baseline.mjs`

Run:

```bash
npm run validate:teacher-baseline
npm run validate:problem-centered-delivery
npm run validate:no-pdf-problem-tabs
npm run build -- --progress=false
```

## Live Chrome acceptance

The isolated Module 6 QA tab must pass all 36 live states:

- 9 Concept views: correct lesson, three source stages, visible animation, at least three motion steps, and a lesson-relevant source visual.
- 9 Blank views: exact problem count, one visual workspace per problem, and no Teacher Edition answer leakage.
- 9 Solved views: exact problem count, one visual workspace per problem, Teacher Edition answers, visible graph marks, and loaded source images.
- 9 Summary views: lesson takeaway and Problem Set meaning map.
- Every state: no generic audit scaffold, broken image, or horizontal overflow.

Representative visual review must include tally-to-picture-graph conversion, vertical tapes, scaled horizontal bars, the transferred reading-minutes number line, the class straw measurement table and quarter-inch ruler, and both whole-unit and fractional-unit line plots. This visual review is a release check, not a replacement for the 36-state sweep.
