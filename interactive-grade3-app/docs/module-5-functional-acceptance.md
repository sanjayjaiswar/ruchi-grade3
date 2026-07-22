# Module 5 functional acceptance

This document records the durable first-pass acceptance contract for Grade 3 Module 5. The Teacher Edition baseline is the factual source of truth. The portal and prior lesson copy are never authoritative when they differ from that baseline.

## Scope and completion bar

- All 30 lessons must preserve the exact Teacher Edition objective, lesson-page range, Problem Set order, problem count, and solved answers.
- Every Concept view must contain three lesson-specific stages, a visible three-step animation, a source-conforming fraction or number-line model, and a question that connects the model to the mathematics.
- Every Problem Set item must have a usable Blank model and a Teacher Edition-aligned Solved model. Diagram-dependent prompts must show the required whole, fraction strip, number line, comparison model, table, or tightly cropped official source image.
- Summary must contain the lesson takeaway and a Problem Set meaning map.
- Functional learning fidelity is required. Pixel-perfect reproduction of the printed page is not required.
- Generic audit scaffolds, hidden animations, answer leakage in Blank mode, broken source images, horizontal overflow, and more than three purposeful visual sections per problem are failures.

## Teacher Edition contract

| Lesson | Teacher pages | Problems | Primary learning model |
|---:|---:|---:|---|
| 1 | 12–21 | 5 | Partition concrete wholes and count unit fractions |
| 2 | 22–30 | 4 | Fold fraction strips into equal parts |
| 3 | 31–40 | 6 | Draw pictorial area models of unit fractions |
| 4 | 41–53 | 6 | Identify the same fraction in different wholes |
| 5 | 54–63 | 4 | Define unit fractions numerically from partitioned wholes |
| 6 | 64–74 | 3 | Build non-unit fractions from unit fractions |
| 7 | 75–85 | 11 | Name shaded and unshaded parts as fractions |
| 8 | 86–97 | 6 | Decompose a whole with fraction number bonds |
| 9 | 98–111 | 3 | Build fractions greater than one whole |
| 10 | 112–123 | 5 | Compare unit fractions with fraction strips |
| 11 | 124–135 | 10 | Compare unit fractions only after identifying each whole |
| 12 | 136–147 | 6 | Reconstruct a whole from one equal part |
| 13 | 148–167 | 7 | Rename a shaded part when the designated whole changes |
| 14 | 168–177 | 3 | Place fractions on the number line from 0 to 1 |
| 15 | 178–187 | 3 | Place any fraction between 0 and 1 |
| 16 | 188–199 | 4 | Place whole-number fractions and fractions between wholes |
| 17 | 200–210 | 5 | Practice varied fraction placements on number lines |
| 18 | 211–220 | 8 | Compare fractions and whole numbers by distance from 0 |
| 19 | 221–233 | 5 | Compare by position and distance on a number line |
| 20 | 234–244 | 4 | Recognize equal-size fractions in different shapes |
| 21 | 245–254 | 5 | Recognize equivalent fractions at the same number-line point |
| 22 | 255–264 | 5 | Generate simple equivalent fractions with models and lines |
| 23 | 265–275 | 6 | Generate more equivalences on partitioned number lines |
| 24 | 276–288 | 4 | Express whole numbers as equivalent fractions |
| 25 | 289–303 | 3 | Locate whole-number fractions when the unit interval is 1 |
| 26 | 304–315 | 4 | Decompose whole-number fractions greater than 1 |
| 27 | 316–328 | 5 | Explain equivalence by changing unit size and number of units |
| 28 | 329–339 | 8 | Compare fractions with the same numerator pictorially |
| 29 | 340–351 | 9 | Compare same-numerator fractions with models and symbols |
| 30 | 352–359 | 1 | Transfer equal partitions to an arbitrary whole with a number-line method |

Total: **30 lessons and 158 official Problem Set items**.

## Durable implementation and checks

- Teacher facts and lesson-specific concept models: `src/app/data/lessons/m5/functional-fidelity.ts`
- Problem Set prompts, source models, Blank/Solved visuals, and official crops: `src/app/data/lessons/m5/problem-set-centered.ts`
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

The isolated Module 5 QA tab must pass all 120 live states:

- 30 Concept views: correct lesson, three source stages, visible animation, at least three motion steps, and a lesson-relevant source visual.
- 30 Blank views: exact problem count, one visual workspace per problem, and no Teacher Edition answer leakage.
- 30 Solved views: exact problem count, one visual workspace per problem, Teacher Edition answers, and loaded source images.
- 30 Summary views: lesson takeaway and Problem Set meaning map.
- Every state: no generic audit scaffold, broken image, or horizontal overflow.

Representative visual review must include concrete fraction partitions, strips, different wholes, number bonds, fractions beyond one, number lines, equivalence, same-numerator comparisons, the official Lesson 5/11/13 figures, and the Lesson 30 angled-strip transfer method. This visual review is a release check, not a replacement for the 120-state sweep.
