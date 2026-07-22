# Module 7 functional acceptance

This document records the durable first-pass acceptance contract for Grade 3 Module 7. The Teacher Edition baseline is the factual source of truth. The portal and prior lesson copy are never authoritative when they differ from that baseline.

## Scope and completion bar

- All 34 lessons must preserve the exact Teacher Edition objective, lesson-page range, Problem Set order, problem count, prompts, fixed quantities, units, and solved answers.
- Every Concept view must contain three lesson-specific stages, a visible three-step animation, a source-conforming mathematical model, and a question that connects the model to the reasoning.
- Every Problem Set item must have a usable Blank model and a Teacher Edition-aligned Solved model. Required RDW models, polygon attributes, compositions, perimeters, unit-square arrays, line plots, robot measurements, equal-area representations, and reflection tools must be visible learning surfaces rather than prose substitutes.
- Summary must contain the lesson takeaway and a Problem Set meaning map.
- Functional learning fidelity is required. Pixel-perfect reproduction of the printed page is not required.
- Generic concept panels, hidden animations, incorrect shape or measurement models, answer leakage in Blank mode, collapsed visuals, broken source images, horizontal overflow, and more than three purposeful visual sections per problem are failures.

## Teacher Edition contract

| Lesson | Teacher pages | Problems | Primary learning model |
|---:|---:|---:|---|
| 1 | 15–26 | 4 | RDW word problems with a letter for the unknown |
| 2 | 27–38 | 6 | Multiple RDW models for one- and two-step problems |
| 3 | 39–54 | 6 | Peer strategy comparison and critique of RDW work |
| 4 | 55–67 | 4 | Inclusive quadrilateral classification by attributes |
| 5 | 68–82 | 4 | Classification of other polygons and regular polygons |
| 6 | 83–96 | 6 | Polygon construction from specified attributes |
| 7 | 97–113 | 4 | Tetromino composition and decomposition |
| 8 | 114–125 | 7 | Tangram construction through folds and cuts |
| 9 | 126–139 | 4 | Polygon composition with tangram pieces |
| 10 | 140–150 | 3 | Perimeter as boundary versus area as inside region |
| 11 | 151–157 | 4 | Tessellation boundary and string measurement |
| 12 | 158–169 | 4 | Whole-unit side measurement and perimeter |
| 13 | 170–183 | 3 | Perimeter equations from labeled polygons |
| 14 | 184–194 | 5 | Unknown side lengths in regular polygons and rectangles |
| 15 | 195–206 | 6 | Perimeter word problems |
| 16 | 207–219 | 4 | Circular perimeter measured by string to the nearest quarter inch |
| 17 | 220–247 | 3 | Composite rectangles, missing lengths, and perimeter |
| 18 | 248–258 | 3 | Factor-pair rectangles from a fixed number of unit squares |
| 19 | 259–268 | 4 | Line plot of rectangle counts for 12–18 unit squares |
| 20 | 269–281 | 2 | Rectangle area while perimeter is fixed |
| 21 | 282–294 | 4 | Systematic rectangle generation from fixed perimeters |
| 22 | 295–310 | 5 | Line plot of rectangle counts by perimeter |
| 23 | 311–321 | 6 | Varied perimeter word problems |
| 24 | 322–331 | 1 | Robot and environment planning from perimeter constraints |
| 25 | 332–341 | 1 | Labeled robot and environment drawing |
| 26 | 342–353 | 4 | Robot-body area line plot and same-perimeter reasoning |
| 27 | 354–367 | 4 | Peer robot measurement and evaluation |
| 28 | 368–379 | 4 | Multi-part rectangle area and perimeter problems |
| 29 | 380–391 | 4 | Composite figures, area, and perimeter |
| 30 | 392–419 | 1 | Evidence-based peer problem-solving critique |
| 31 | 420–430 | 1 | Unconventional equal-area representations of one-half |
| 32 | 431–442 | 4 | Circle constructions and justification of one-half |
| 33 | 443–453 | 1 | Grade 3 fluency reflection and practice planning |
| 34 | 454–462 | 1 | Summer practice booklet and 10-week calendar |

Total: **34 lessons and 127 official Problem Set items**.

## Durable implementation and checks

- Teacher facts and lesson-specific concept models: `src/app/data/lessons/m7/functional-fidelity.ts`
- Problem Set prompts, source models, Blank/Solved visuals, and runtime attachment: `src/app/data/lessons/lesson-registry.ts`
- Shared visual rendering and dense unit-square support: `src/app/shared/problem-visual-workspace/`
- Durable Module 7 functional validator: `scripts/validate-problem-centered-delivery.mjs`
- Precomputed source baseline validator: `scripts/validate-teacher-edition-baseline.mjs`

Run:

```bash
npm run validate:teacher-baseline
npm run validate:problem-centered-delivery
npm run validate:no-pdf-problem-tabs
npm run build -- --progress=false
```

## Live Chrome acceptance

The isolated Module 7 QA tab must pass all 136 live states:

- 34 Concept views: correct lesson, three source stages, visible animation, at least three motion steps, and a lesson-relevant source visual.
- 34 Blank views: exact problem count, one visual workspace per problem, and no Teacher Edition answer leakage.
- 34 Solved views: exact problem count, one visual workspace per problem, source-aligned reasoning and answers, and visible/non-collapsed mathematical marks.
- 34 Summary views: lesson takeaway and Problem Set meaning map.
- Every state: no old generic Module 7 concept panel, audit scaffold, broken image, or horizontal overflow.

Representative visual review must include RDW, polygon classification, tetromino/tangram composition, boundary measurement, all four 24-square-unit rectangles, rectangle line plots, robot perimeter requirements, the Lesson 29 composite figure, unconventional one-half representations, and the summer practice calendar. This visual review is a release check, not a replacement for the 136-state sweep.
