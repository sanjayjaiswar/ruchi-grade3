# Problem-Set-Centered Lesson Design

Date: 2026-07-03
Status: Proposed standard, Lesson 12 pilot first

## 1. Central Idea

The lesson page must be centered on the official lesson and its official Problem Set.

The portal is not the source of truth. It is a derived learning view built from the official Eureka Math source PDFs. The app should not expose raw PDF extraction, duplicated curriculum labels, or generic lesson tabs. It should make the lesson's mathematical idea clear and then explain the exact Problem Set problems with solved work, reasoning, visual models, and animation where useful.

The previous left-rail tab sequence:

```text
Goal / Model / Meaning / Picture / Draw / Solve / Exit / Sum
```

is not the desired lesson experience. It over-fragments the lesson, duplicates ideas, and hides the most important work.

Top section tabs are allowed when they load the actual lesson sections on demand, such as Concept, Problem Set, and Summary. They must not recreate the old generic step rail or split one concept across redundant tabs.

For long selected sections, use local bookmark buttons inside the section. Example: the Problem Set tab may include Problem 1 through Problem 6 bookmarks that scroll within the rendered Problem Set content. These bookmarks are not route links.

The intended experience is:

```text
Lesson Concept
Problem Set With Solved Explanation
Short Summary
```

## 2. Source Of Truth

For the Lesson 12 pilot, use these two files:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_1/g3_m1_student_wkbook_v1_3_1.pdf
```

The Teacher Edition is the primary source for:

- lesson objective,
- concept development,
- teacher explanation,
- solved or annotated Problem Set references,
- debrief prompts,
- exit ticket intent.

The Student Workbook is the primary source for:

- clean blank Problem Set pages,
- clean blank homework pages if later needed,
- student-facing page layout and prompts.

Important Lesson 12 finding:

- The Teacher Edition includes the same blank Lesson 12 Problem Set pages as the Student Workbook.
- The Teacher Edition also includes solved/annotated Problem Set thumbnails on the debrief page.
- Text extraction alone misses important solved-work information because some solved work is visual or handwritten in the Teacher Edition images.
- Therefore, authored lessons must include visual PDF inspection, not only `pdftotext`.

## 3. What The Lesson Page Should Do

Each lesson page should answer three questions:

1. What is the lesson concept?
2. How does each official Problem Set problem work?
3. What should the learner understand after solving the problems?

The Problem Set is the main surface because that is the work the student completes and the work that needs review.

The page should not add extra invented practice modes unless explicitly requested. It should not split the same lesson concept into many tabs. It should not make the user navigate through generic goal/model/meaning/picture/draw screens before reaching the actual lesson problems.

## 4. Required Page Shape

### 4.1 Lesson Concept

One compact section near the top.

It must:

- state the lesson objective in usable language,
- explain the main mathematical idea,
- use the Teacher Edition concept development,
- include the key model or contrast needed to understand the Problem Set,
- avoid long teacher-script dumps.

It should combine what the current app calls overview, goal, model, meaning, picture, and draw when those pieces are all explaining the same concept.

### 4.2 Problem Set With Solved Explanation

This is the primary section.

The Problem Set section must support two modes:

- `Blank`: official question prompts, source-matching visual workspace, and official blanks/templates where available. This must not be a text-only placeholder.
- `Solved`: completed source-matching model, solved answer, explanation, quotient meaning, and validation.

Use one Problem Set tab with an internal `Blank | Solved` segmented control. Do not add another top tab for blank work.
The `Blank | Solved` control is a view mode for the whole Problem Set. Problem 1 through Problem 6 are separate local bookmarks inside that view, not peers of the mode control.
The visual hierarchy must make those three levels distinct:

- `Concept / Problem Set / Summary`: primary section controls.
- `Blank / Solved`: Problem Set mode switch, visually separate from problem bookmarks.
- `Problem 1 / Problem 2 / ...`: lightweight blue underlined local jump links, not blue pill buttons.

Each official Problem Set item must become a solved explanation unit with:

- exact problem reference from the official Problem Set,
- completed answer,
- equation or equations,
- visual model or diagram explanation,
- short reasoning in lesson language,
- what the answer means in context,
- animation concept if animation clarifies the model.

The blank and solved views must match the same official problem. Do not use a parallel invented problem as the main solved problem.
The blank view should preserve the visual scaffold from the Teacher Edition / Student Workbook problem: objects to circle, empty containers, match lines, tape diagrams, bar units, labels, and response blanks. The solved view may use animated neutral tokens or simplified shapes, but it must complete the same quantities and answer structure.

### 4.3 Short Summary

One concise lesson takeaway.

It should restate the reusable lesson idea and should not include raw fluency notes, unrelated debrief text, or duplicated source metadata.

## 5. Lesson 12 Pilot

### 5.1 Official Lesson

Module 1 Lesson 12:

```text
Interpret the quotient as the number of groups or the number of objects in each group using units of 2.
```

### 5.2 Lesson Concept

The core idea is quotient meaning.

When dividing, the total is known. The quotient can mean either:

- the number of groups, or
- the number of objects in each group.

The story decides which meaning is correct.

The Teacher Edition teaches this by comparing two situations that use the same division sentence:

```text
8 divided by 2 = 4
```

In one situation, the quotient means 4 objects in each group. In the other situation, the quotient means 4 groups. This contrast is the lesson.

### 5.3 Problem Set Mapping

Problem 1:

- Context: 8 birds, 2 birds in each cage.
- Equation: 8 divided by 2 = 4.
- Answer: 4 cages.
- Quotient meaning: number of groups.
- Model/animation idea: group 8 birds into cages of 2 and count the cages.

Problem 2:

- Context: 10 fish equally divided into 5 bowls.
- Equations: 5 times 2 = 10; 10 divided by 5 = 2.
- Answer: 2 fish in each bowl.
- Quotient meaning: number in each group.
- Model/animation idea: distribute 10 fish into 5 bowls until each bowl has 2 fish.

Problem 3:

- Context: match division facts using units of 2.
- Answers: 10 divided by 2 = 5; 18 divided by 2 = 9; 12 divided by 2 = 6; 16 divided by 2 = 8; 14 divided by 2 = 7.
- Quotient meaning: fact value in the matching context.
- Model/animation idea: optional skip-counting by twos or reveal matching pairs.

Problem 4:

- Context: 14 meters of ribbon cut into 2 equal pieces.
- Equation: 14 divided by 2 = 7.
- Answer: 7 meters long.
- Quotient meaning: size of each group.
- Model/animation idea: split a 14-meter tape into 2 equal parts and label each part 7 meters.

Problem 5:

- Context: 12 cereal bars, 2 bars every morning.
- Equation: 12 divided by 2 = 6.
- Answer: 6 days.
- Quotient meaning: number of groups.
- Model/animation idea: remove or mark 2 bars per day until all 12 are used; count 6 days.

Problem 6:

- Context: Sarah and Esther share an 18-dollar cost equally.
- Equation: 18 divided by 2 = 9.
- Answer: Sarah pays 9 dollars.
- Quotient meaning: size of each share.
- Model/animation idea: split 18 dollars into 2 equal shares and label Sarah's share 9 dollars.

### 5.4 Lesson 12 Summary

The durable takeaway:

```text
In division, the total is known. The quotient tells either how many groups there are or how many are in each group. Use the story to decide what the quotient means.
```

## 6. Implementation Clarity Without Code

The Lesson 12 pilot should be implemented as a content and UX correction, not as a broad app rewrite.

The implementation should:

- remove or bypass the 8-tab step rail for the Lesson 12 pilot,
- use top section tabs only for the real sections: Concept, Problem Set, and Summary,
- load selected top-tab content on demand instead of rendering every section at once,
- use local bookmark buttons inside long sections, such as Problem Set problem jumps,
- provide a `Blank | Solved` mode switch inside the Problem Set tab,
- keep the blank and solved views tied to the same official Problem Set data,
- render one lesson concept block,
- render the official Problem Set as the main content,
- pair each problem with its solved answer and explanation,
- use the Teacher Edition visual solved work as the reference for solved modeling,
- use the Student Workbook only for the clean blank problem reference,
- add animation/model concepts only when they clarify the exact official problem,
- keep source references available but not dominant.

The implementation should not:

- introduce unrelated problem modes,
- add extra "try it" workflow around the Problem Set,
- create a separate top-level tab for blank Problem Set work,
- create new generic lesson tabs or recreate the old Goal/Model/Meaning/Picture/Draw/Solve/Exit/Sum flow,
- depend only on text extraction,
- display broken PDF extraction fragments,
- treat the generated route flow as authored lesson quality.

### 6.1 Style Architecture

Keep reusable lesson layout and reusable Problem Set presentation styles in shared lesson stylesheets.

Allowed style layers:

- `lesson.css`: shared lesson shell, header, existing source-backed lesson flow, and broad layout primitives.
- Shared Problem Set stylesheet: reusable concept/problem/solution/animation presentation for problem-set-centered lessons.
- Module or lesson-specific stylesheet/class hooks: only for real customization that cannot be shared cleanly.

Do not put all Lesson 12 styling into a lesson-specific stylesheet. Lesson-specific CSS may or may not exist. It should exist only when Lesson 12 needs a true override, not as the default place for common layout.

## 7. Replication Rule

Lesson 12 is the pilot. After it is reviewed and accepted, replicate the pattern across other lessons.

Replicate the structure:

- concept first,
- official Problem Set centered,
- solved explanation per problem,
- source-backed visuals and animation,
- short summary.

Replicate the control hierarchy and visual language:

- primary section tabs for Concept, Problem Set, and Summary,
- warm/yellow Blank mode and green/review Solved mode,
- blue underlined local Problem links for problem bookmarks,
- no repeated blue-pill treatment across all controls.

Do not replicate Lesson 12's math content into other lessons. Every lesson must be re-inspected from its Teacher Edition and Student Workbook pages.

## 8. Acceptance Criteria For Lesson 12

Lesson 12 is acceptable when:

- the old 8-tab lesson flow is not the primary experience,
- the concept section clearly explains quotient meaning,
- every official Problem Set problem appears in order,
- the Problem Set tab can show a blank question-only student view,
- every problem has a solved answer,
- every problem has a short explanation tied to the lesson concept,
- every problem identifies what the quotient means where relevant,
- visual models or animations match the exact problem quantities,
- Teacher Edition solved/annotated source has been visually reviewed,
- Student Workbook blank source has been compared against the Teacher Edition Problem Set,
- no broken extraction text is visible to the user.
