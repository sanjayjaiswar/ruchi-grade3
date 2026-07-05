# Problem Set Source Requirements

This document is a source-of-truth requirement for Grade 3 lesson authoring and QA. It defines what is allowed in `Concept`, `Problem Set > Blank`, `Problem Set > Solved`, and `Summary`.

These are requirements, not an audit outcome.

## Scope

These rules apply to every Grade 3 module and every Grade 3 lesson.

Validation and review must proceed:

1. Module by module.
2. Lesson by lesson.
3. In lesson order.
4. Across every required tab/mode before marking the lesson complete.

## Required Lesson Surfaces

Every authored lesson must include and pass review for:

- `Concept`
- `Problem Set > Blank`
- `Problem Set > Solved`
- `Summary`

Every checked page/tab must be scrolled to the end during live UI validation. A top-of-page click-only check is not sufficient.

## Concept Requirements

`Concept` is the source-backed teaching surface.

It must include:

- Teacher Edition PDF/source images.
- Student Workbook or Student Edition PDF/source images.
- Source-backed explanation aligned to the Teacher Edition lesson.

PDF/source images are allowed and expected in `Concept`.

## Problem Set > Blank Requirements

`Problem Set > Blank` is the student work surface.

It must include:

- The official problem prompt.
- The official blanks or student response structure.
- Authored visuals, diagrams, workspaces, scaffolds, or models matching the source problem.
- A Teacher Edition Problem Set source reference.

It must not include:

- Visible raw PDF/source-page images inside the problem cards.
- Teacher Edition answer-key screenshots as the student blank workspace.
- Solved answers, solved diagrams, or answer leakage.
- Parallel invented problems that replace the official problem.

Pass condition:

- `0` visible `/source-pages/` PDF/source images in `Problem Set > Blank`.

## Problem Set > Solved Requirements

`Problem Set > Solved` is the reviewed answer surface.

It must include:

- Authored solved visuals, diagrams, models, or workspaces.
- Correct solved answers.
- Explanation or answer meaning tied to the official problem.
- Validation text.
- Teacher Edition solved/source reference.

It must not include:

- Visible raw PDF/source-page images inside the problem cards as the solved work.
- Teacher Edition answer-key screenshots standing alone as the solved answer.
- Generic answer placeholders.
- Generated scaffolds that do not match the Teacher Edition source.
- Parallel invented problems that replace the official problem.

Pass condition:

- `0` visible `/source-pages/` PDF/source images in `Problem Set > Solved`.

## Summary Requirements

`Summary` must connect the lesson back to the source.

It must include:

- A concise lesson takeaway.
- A Problem Set meaning/source map.
- Teacher Edition source mapping for each Problem Set item.

## Live UI Validation Requirements

Live UI validation must use the running Grade 3 app, not code inspection alone.

Required validation flow for every lesson:

1. Open `Concept`, scroll to the end, and verify Teacher Edition and Student Workbook/Student Edition source images.
2. Open `Problem Set`, switch to `Blank`, scroll to the end, and verify authored blank visuals/workspaces with no visible source-page/PDF images.
3. Switch to `Solved`, scroll to the end, and verify authored solved visuals/answers with no visible source-page/PDF images.
4. Open `Summary`, scroll to the end, and verify the Problem Set source map.

Do not mark a lesson pass until all four required surfaces pass.

## Enforcement

A lesson fails if any required surface fails.

A module fails if any lesson in that module fails.

The full Grade 3 app fails this requirement if any lesson in Modules 1-7 fails.

For each lesson review, record:

- Concept source image presence.
- Blank authored visual/workspace presence.
- Blank visible PDF/source image count.
- Solved authored visual/answer presence.
- Solved visible PDF/source image count.
- Summary mapped problem count.

## Workflow Guardrails

For this validation workflow:

- Do not use `npm build` as the validation source of truth.
- Do not rely on code-only checks as final proof.
- Do not stage, commit, push, merge, rebase, or change git history unless explicitly requested.
