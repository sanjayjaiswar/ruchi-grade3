# Lesson Authoring Playbook

Date: 2026-06-18
Status: Required standard for all authored lessons

## 1. Purpose

This playbook prevents lesson drift. It defines the required workflow, evidence, content rules, and acceptance gate for turning Eureka Math Grade 3 source pages into interactive app lessons.

The app must not treat a lesson objective as a complete lesson. A route may be source-mapped from the module overview, but it is not authored until the full lesson pages have been extracted, transformed, implemented, and audited.

## 2. Non-Negotiable Rule

An authored lesson must teach the actual Eureka lesson, not a generic version of the objective.

If the lesson-specific teacher-edition pages have not been inspected, the app must show the route as source-mapped but not authored. It must not render generic visual interaction that implies the lesson is complete.

## 3. Source Hierarchy

Use sources in this order:

1. Teacher edition lesson pages: required source of truth for objective, sequence, examples, models, debrief intent, and exit check.
2. Student workbook pages: supporting source for problem set, homework, and practice patterns.
3. Additional materials: supporting source for fluency, sprints, templates, or manipulatives.
4. Module overview table: allowed only for route metadata and objective labels before deep authoring.

Do not use outside curriculum sources. Do not invent examples that change the lesson's model, sequence, vocabulary, or mathematical target.

## 4. Authored Lesson Definition

A lesson is authored only when all of these are present:

- Teacher-edition PDF page range for the full lesson.
- Exact teacher-edition objective.
- Topic and lesson context.
- Lesson-specific concept sequence.
- Lesson-specific visual model or models.
- At least one guided example grounded in the teacher edition.
- At least one learner check after the concept development.
- An exit check aligned to the teacher-edition exit ticket or problem-set pattern.
- Feedback rules tied to the lesson misconception.
- A short summary using the lesson's target language.
- Source audit notes confirming the implementation against the rendered/extracted pages.

If any item is missing, the lesson is not authored.

## 5. Required Extraction Workflow

For each lesson:

1. Locate the lesson in the teacher-edition PDF.
2. Record the PDF page range, not just the printed footer page numbers.
3. Extract text with `pdftotext -layout`.
4. Render pages with `pdftoppm` when diagrams, arrays, tables, graphs, or layout matter.
5. Identify the lesson objective exactly.
6. Identify fluency or prerequisite review only if it affects the app lesson.
7. Extract the concept development sequence.
8. Extract the lesson examples and equations.
9. Extract the problem-set and exit-ticket task patterns.
10. Decide which interactions are required to teach the concept.
11. Implement the lesson.
12. Audit the implemented lesson against the source pages.
13. Record the audit result.

Do not implement from memory, from only the overview table, or from only another lesson's pattern.

## 6. Required Lesson Shape

Every authored lesson must follow this learner flow:

1. Goal: state the exact lesson objective in student-facing language.
2. Concept first: explain any lesson-critical term before modeling, such as quotient, factor, unknown, unit fraction, area, perimeter, elapsed time, scale, or square unit.
3. Model: introduce the lesson's real visual model.
4. Notice: ask the learner to identify what each number or model part means.
5. Connect: connect picture, words, and equation.
6. Try: give a guided learner action.
7. Check: validate the learner's answer and explain the misconception if wrong.
8. Exit: finish with a lesson-aligned exit check.
9. Summary: name the durable takeaway.

The labels may change, but the learning functions may not be skipped.

Concept-first rule:

- Do not rely on vocabulary chips as explanation.
- New or lesson-critical math language must be defined in student-friendly words before the first model task.
- Each concept explanation must include a teacher check: what to ask or listen for before moving on.
- If a term can mean different things by context, such as quotient or divisor, the explanation must name the possible meanings and require the student to say what it means in this lesson.
- The concept panel must stay tied to the lesson objective and source model; do not add unrelated glossary terms.
- Multiplication and division lessons must use the formal Grade 3 wording: say "3 times 4" for multiplication and "12 divided by 3" for division. Do not use "3 by 4" as the formal wording for multiplication.
- Multiplication/division vocabulary notes must name product as the answer to multiplication and quotient as the answer to division.

## 7. Visual Model Rules

Visuals must teach the lesson's mathematics. They are not decoration.

Required:

- Use the same model family as the teacher edition: equal groups, array, tape diagram, number line, area model, fraction strip, graph, geometry figure, or measurement model.
- Show the quantities from the lesson example or a source-aligned parallel example.
- Make the visible grouping, rows, columns, units, labels, or partitions match the equation.
- Let the learner inspect or manipulate the model where useful.
- Keep symbols tied to visible quantities.

Not allowed:

- Generic dot grids that do not match the lesson example.
- A model badge without an actual model.
- Equations that appear before the lesson's visual or conceptual setup when the teacher edition builds concept first.
- Visuals that imply a different unknown than the lesson target.

## 8. Practice And Feedback Rules

Practice must validate understanding, not just button-click completion.

Required feedback:

- State whether the answer is correct.
- Name the represented quantity: total, number of groups, size of group, row count, column count, factor, quotient, part, whole, unit, or measurement.
- Point back to the model.
- Identify the likely misconception.
- Give one concrete next action.

Not allowed:

- "I can explain this step" as the only check.
- Generic success messages that do not reference the lesson's math.
- Free-form prompts with no validation for core checks.
- Practice that tests a different lesson objective.

## 9. Source Reference Rules

Every authored lesson must include source references in app data.

Teacher-edition source refs must include:

- `sourceType: 'teacher-edition'`
- the local PDF path,
- `pageStart`,
- `pageEnd`,
- a note naming the objective, concept development, problem set, and exit ticket basis.

Supporting workbook refs may be added only after the teacher-edition ref is present.

Page numbers must be PDF page numbers unless the app later adds a separate field for printed page numbers.

## 10. Generated Route Restriction

Generated objective-backed lesson routes are allowed only as placeholders.

They must:

- Say the lesson is source-mapped but not authored.
- Show the exact objective and source overview reference.
- Avoid interactive concept screens.
- Avoid lesson-complete progress language.
- Avoid generic visuals that imply a real lesson model has been implemented.

They must not:

- Use the full authored lesson shell.
- Show Goal, Model, Connect, Check as if instruction exists.
- Include generic validation such as "I can explain this step."

Generated source-backed teacher walk-throughs are allowed only when they have:

- A lesson-specific teacher-edition PDF page range.
- The exact lesson objective.
- The lesson topic context.
- A compact teacher flow that names the source model, example, check, and summary.
- No claim that the lesson has bespoke interactions or full deep authoring.

These compact routes are acceptable for coverage across modules, but they remain candidates for later deep authoring when the lesson needs a custom number line, clock, area grid, fraction strip, graph, or geometry interaction.

## 11. Replication Pattern

After one lesson is authored and audited, use it as a structural pattern only.

Allowed to replicate:

- Component layout.
- Interaction mechanics.
- Data schema shape.
- Feedback structure.
- Audit checklist.

Not allowed to replicate without re-extraction:

- Examples.
- Equations.
- Visual quantities.
- Misconceptions.
- Exit checks.
- Vocabulary emphasis.
- Source page ranges.

## 12. Module 1 Lessons 4-6 Standard Slice

Module 1 Lessons 4-6 should become the calibration slice for division lessons.

Lesson 4 must teach:

- Total known.
- Number of groups known.
- Unknown is the size of each group.
- Division sentence answer means objects in each group.

Lesson 5 must teach:

- Total known.
- Size of each group known.
- Unknown is the number of groups.
- Count-by strategy can find the number of groups.

Lesson 6 must teach:

- Arrays represent division and multiplication.
- The quotient in division can match the unknown factor in multiplication.
- Paired equations describe the same model.

No later division lesson should be authored until these three are implemented and audited as the pattern.

## 13. Acceptance Checklist

Before marking a lesson authored, answer yes to every item:

- Did I inspect the actual teacher-edition lesson pages?
- Did I record the correct PDF page range?
- Did I preserve the exact objective?
- Does the screen sequence match the source concept sequence?
- Does each model match the source model family?
- Do the numbers and equations match the source or a clearly source-aligned parallel?
- Does each learner check validate a real misconception?
- Is the exit check aligned to the source exit ticket or problem set?
- Are source refs lesson-specific, not overview-only?
- Did I audit the implementation after coding?

Any "no" means the lesson remains unauthored.

## 14. Drift Triggers

Stop and re-check the source if any of these happen:

- A lesson starts to feel like a generic math explanation.
- The visual model does not match the equation.
- The app uses the same four steps for multiple lessons without lesson-specific content.
- The answer feedback could apply to any lesson.
- The lesson uses examples not found in, or tightly parallel to, the source.
- The source card cites only module overview pages.
- A student could click through without doing the lesson's actual math.

## 15. Documentation Updates Per Lesson

Each authored lesson must update:

- `curriculum.data.ts` or the lesson data file containing the authored lesson.
- `source-audit.md` with page range, pass/fail notes, and any known limitations.
- `task-tracker.md` with implementation and validation status.

When adding new reusable interaction patterns, update the implementation docs or component map if future lessons should reuse them.
