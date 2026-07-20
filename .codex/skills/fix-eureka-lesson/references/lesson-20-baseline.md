# Lesson 20 baseline

Use Module 2 Lesson 20 as the quality baseline, not as content to copy into other lessons.

## What made Lesson 20 successful

- The Teacher Edition and its answer key controlled every fact.
- Problem 1 preserved the source two-column A/B structure, all eight expressions, all rounded equations, exactly four closest estimates, and the same-direction versus opposite-direction explanation.
- Problem 2 preserved the estimate, exact tape relationship, subtraction, unit, and answer sentence in source order.
- Problem 3 used the real source fruit-scale illustration because that picture was part of the problem, then paired it with the exact estimate, tape, subtraction, and answer.
- Blank mode removed answers, circles, explanations, and solved motion while retaining the authentic workspace.
- Solved mode exposed the complete reasoning sequence and used motion to direct attention through it.
- The lesson was accepted only after desktop Chrome inspection for Concept, Blank, Solved, and Summary states.

## Repository reference points

- `interactive-grade3-app/src/app/data/lessons/m2/lesson20.ts`: concept animation and semantic lesson contract.
- `interactive-grade3-app/src/app/data/lessons/m2/problem-set-centered.ts`: exact Problem Set structures and Blank/Solved visuals.
- `interactive-grade3-app/src/app/data/lessons/lesson-runtime.types.ts`: reusable source-specific visual types.
- `interactive-grade3-app/src/app/shared/problem-visual-workspace/`: rendering, motion, and responsive styling.
- `interactive-grade3-app/scripts/validate-m2-source-contract.mjs`: durable manual semantic assertions.
- `interactive-grade3-app/docs/module-2-teacher-edition-acceptance.md`: durable acceptance record.
- `interactive-grade3-app/design-qa.md`: visual QA findings and corrections.

## Generalization rule

Copy the rigor and workflow, never Lesson 20's numbers or visual metaphor. A new lesson must receive the source-specific model demanded by its own Teacher Edition: clock, tape, scale, number line, table, array, chart, geometry, fraction model, or another authored visual.
