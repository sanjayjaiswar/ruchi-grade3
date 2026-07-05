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

## Source Of Truth And Pass Standard

The source of truth is the official Eureka Math Grade 3 Teacher Edition and the official Student Workbook/Student Edition Problem Set pages.

Structural presence is not a pass. A lesson does not pass only because:

- A visual component exists.
- An answer text block exists.
- A source reference exists.
- No raw PDF image appears inside `Problem Set > Blank` or `Problem Set > Solved`.
- The page can be clicked through without errors.

Those checks are necessary, but they are not sufficient.

To pass, the authored content must match the Teacher Edition / Student Problem Set in content, visual structure, labels, quantities, answers, and intended student work. The authored visual must be the same problem, not a related scaffold or parallel model.

## Content Quality And Visual Accuracy Requirements

Every problem card must be reviewed against the official source page.

The review must verify:

- The visible prompt is the official problem prompt, cleaned of OCR/source extraction artifacts.
- The authored blank visual matches the official student-facing problem structure.
- The authored solved visual matches the Teacher Edition answer/check evidence.
- The visual uses the same quantities, labels, units, dimensions, shape layout, chart/graph scale, number-line marks, fraction partitions, table rows, or workspace structure as the source.
- The answer evidence is specific to the problem, not generic validation wording.
- Variable-answer items state the Teacher Edition acceptance/check rule clearly.
- The visual, answer, and explanation are placed inside the same problem card and clearly belong to the same prompt.

The following are failures:

- A generic array, tape, table, graph, or workspace replacing a source-specific picture, diagram, chart, graph, number line, shape, robot plan, fraction model, or measurement tool.
- A solved visual that only says it is checked against the Teacher Edition without showing problem-specific answer/check evidence.
- A blank visual that changes the official problem into a simpler or parallel problem.
- A solved answer that uses fallback wording such as "correct work varies" without the Teacher Edition criteria for what counts as correct.
- OCR/source artifacts in student-facing text, including stray standards codes, Teacher Edition notes, debrief text, repeated fragments, or dangling words such as `unknown.` when they are not part of the official prompt.
- Treating a live UI structural pass as a content-quality or visual-accuracy pass.

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
- The blank visual/workspace is source-faithful, not merely authored.
- The official prompt and official response structure are preserved without OCR/source artifacts.

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
- The solved visual/workspace is source-faithful and uses Teacher Edition answer/check evidence.
- The solved answer is problem-specific and not generic fallback text.
- Variable-response items include the exact Teacher Edition acceptance/check criteria.

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
2. Open `Problem Set`, switch to `Blank`, scroll to the end, and verify authored blank visuals/workspaces with no visible source-page/PDF images and with source-faithful visual structure.
3. Switch to `Solved`, scroll to the end, and verify authored solved visuals/answers with no visible source-page/PDF images and with Teacher Edition answer/check evidence.
4. Open `Summary`, scroll to the end, and verify the Problem Set source map.

Do not mark a lesson pass until all four required surfaces pass.

Do not mark content quality or visual accuracy as passed unless every problem card has been checked against the Teacher Edition / Student Problem Set source page.

## Review Severity

Use these statuses when reviewing modules and lessons:

- `Pass`: all required surfaces pass, and every Problem Set card is source-faithful in prompt, visual structure, solved evidence, and summary mapping.
- `Structural pass only`: the required UI pieces exist, but source-fidelity has not been verified. This is not a content-quality pass.
- `Needs review`: a card uses generated or inferred visuals that have not been source-compared.
- `Fail`: a card has missing answer evidence, generic fallback text, OCR/source artifacts, visual mismatch, source image misuse, answer leakage, or a parallel/invented problem.

## Enforcement

A lesson fails if any required surface fails.

A module fails if any lesson in that module fails.

The full Grade 3 app fails this requirement if any lesson in Modules 1-7 fails.

For each lesson review, record:

- Concept source image presence.
- Blank authored visual/workspace presence.
- Blank source-fidelity result.
- Blank visible PDF/source image count.
- Solved authored visual/answer presence.
- Solved Teacher Edition answer/check evidence result.
- Solved source-fidelity result.
- Solved visible PDF/source image count.
- Summary mapped problem count.
- OCR/source artifact result.
- Any generic visual or generic answer fallback found.

## Workflow Guardrails

For this validation workflow:

- Do not use `npm build` as the validation source of truth.
- Do not rely on code-only checks as final proof.
- Do not call a lesson, module, or full app "passed" when only structural checks have passed.
- Do not collapse visual accuracy into "has a visual." The visual must match the source.
- Do not collapse solved accuracy into "has an answer." The answer must match the Teacher Edition or include the Teacher Edition variable-response criteria.
- Do not use generated visual families as a substitute for source-specific diagrams unless the generated visual exactly preserves the official quantities, labels, structure, and answer evidence.
- Do not stage, commit, push, merge, rebase, or change git history unless explicitly requested.
