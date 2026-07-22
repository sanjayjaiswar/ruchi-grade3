# Module 4 functional acceptance

This document records the durable first-pass acceptance contract for Grade 3 Module 4. The Teacher Edition baseline is the factual source of truth. The portal and prior lesson copy are never treated as authoritative when they differ from that baseline.

## Scope and completion bar

- All 16 lessons must preserve the exact Teacher Edition objective, lesson-page range, Problem Set order, problem count, and solved answers.
- Every Concept view must contain three lesson-specific stages, a visible three-step area animation, a source-conforming visual model, and an explicit question that connects the model to the mathematics.
- Every Problem Set item must have a usable Blank model and a Teacher Edition-aligned Solved model. Diagram-dependent prompts must show the needed figure, array, floor plan, table, or tightly cropped official source image.
- Summary must contain the lesson takeaway and a Problem Set meaning map.
- Functional learning fidelity is required. Pixel-perfect reproduction of the printed page is not required.
- Generic audit scaffolds, hidden animations, answer leakage in Blank mode, broken source images, horizontal overflow, and more than three visual sections per problem are failures.

## Teacher Edition contract

| Lesson | Teacher pages | Problems | Primary learning model |
|---:|---:|---:|---|
| 1 | 11–20 | 6 | Same figure covered by triangles, rhombuses, trapezoids, and squares |
| 2 | 21–31 | 5 | Recompose 12 square units as 2×6, 3×4, and 4×3 |
| 3 | 32–43 | 4 | Tile, transfer to a grid, and remove one square unit |
| 4 | 44–56 | 6 | Relate tile counts on edges to rectangle side lengths |
| 5 | 57–67 | 4 | Form rectangular arrays from equal groups of unit squares |
| 6 | 68–79 | 4 | Complete an incomplete array from a visible row and column |
| 7 | 80–91 | 4 | Interpret outer dimensions as rows, columns, and named square units |
| 8 | 92–115 | 6 | Multiply side lengths and reverse with division for an unknown side |
| 9 | 116–126 | 4 | Cut and join equal rectangles without changing total area |
| 10 | 127–137 | 3 | Split a rectangle and add partial products |
| 11 | 138–149 | 4 | Regroup factors to make whole-number side-length pairs |
| 12 | 150–160 | 5 | Represent and solve area word problems |
| 13 | 161–172 | 3 | Decompose composite figures or subtract a rectangular cutout |
| 14 | 173–184 | 4 | Choose a composite-area strategy from the figure |
| 15 | 185–195 | 5 | Calculate seven room areas and the complete floor plan |
| 16 | 196–204 | 1 | Redesign rooms with factor pairs that preserve required areas |

Total: **16 lessons and 68 official Problem Set items**.

## Durable implementation and checks

- Teacher facts and lesson-specific concept models: `src/app/data/lessons/m4/functional-fidelity.ts`
- Problem Set prompts, source models, Blank/Solved visuals, and floor plans: `src/app/data/lessons/m4/problem-set-centered.ts`
- Runtime attachment: `src/app/data/lessons/lesson-registry.ts`
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

The isolated Module 4 QA tab must pass all 64 live states:

- 16 Concept views: correct active tab, three concept stages, visible animation, at least three motion steps, and a source visual.
- 16 Blank views: exact problem count, one visual workspace per problem, and no Teacher Edition answer leakage.
- 16 Solved views: exact problem count, one visual workspace per problem, Teacher Edition answers, and loaded source images.
- 16 Summary views: takeaway, meaning map, correct active tab.
- Every state: no generic audit scaffold and no horizontal overflow.

Representative visual review must include pattern-block outlines, recomposed arrays, incomplete arrays, distributive arrays, composite figures, and both solved and blank floor plans. This is a release check, not a replacement for the 64-state sweep.
