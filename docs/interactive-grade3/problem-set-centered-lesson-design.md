# Problem-Set-Centered Lesson Design

Date: 2026-07-03
Status: Active standard; Lesson 12 pilot replicated across Module 1, Module 2, Module 3, Module 5, Module 6, and Module 7 runtime data. Module 3 has a passing Chrome click/visual audit with solved-card visual support for every item. Module 2 has Teacher Edition prompt and answer-key remediation for all 93 cards, but still has per-problem visual fidelity gaps for image-heavy items. Module 7 currently uses official Teacher Edition page images as visual references while per-problem Teacher Edition solved-answer transcription/cropping remains open where visuals are image-heavy.

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

2026-07-03 Module 1 replication note:

- Module 1 Lessons 1-11 and 13-21 now use the problem-set-centered runtime shape through a Module 1-only source-backed data map.
- Lesson 12 keeps the bespoke pilot data and remains the fidelity benchmark; it now also exposes the same Teacher Edition page-image source references as the other Module 1 lessons.
- This Module 1 pass uses the Module 1 Teacher Edition PDF as the source of truth. Teacher Edition pages 23-276 were rendered to local source-page assets and attached as visible lesson source references.
- The shared renderer now handles the additional Module 1 model families needed for replication: arrays, decomposed arrays, equation workspaces, and two-step word-problem solutions.
- Browser QA clicked all 21 Module 1 lesson links, Concept / Problem Set / Summary tabs, every Problem bookmark, and Blank / Solved mode with 0 lesson failures. The pass verified loaded Teacher Edition page images, no old step rail, and no visible workbook wording in Module 1 problem-centered views.
- Rendered Teacher Edition pages were visually inspected for Module 1 Problem Sets, and PDF-derived quantity errors were corrected in Lessons 2-4.
- Chrome visual audit update: Chrome session `🔎 Module 1 audit` clicked all 21 Module 1 lessons and every Problem bookmark. It verified 114/114 Blank cards with visual scaffolds, 114/114 Solved cards with visual models, Teacher Edition source-page images, and animation markers on every lesson.
- Lesson 10 now has a source-backed decomposed-array solved visual instead of equation-only chips for the distributive-property Problem Set items.
- Remaining gap: the current Module 1 pass still uses typed source-backed solved reconstructions and shared visual/animation scaffolds rather than cropped Teacher Edition solved thumbnails or exact source-cropped visuals for every image-heavy item. It also still needs a problem-by-problem prompt/explanation transcription pass before it can be called 100% exact to the Teacher Edition; at least Lesson 10 Problem 3 is visibly shortened from the official Ruby photo-album prompt.

2026-07-03 Module 2 replication note:

- Module 2 Lessons 1-21 now use the problem-set-centered runtime shape through a Module 2-only source-backed data map.
- The Teacher Edition Module 2 PDF is the controlling source of truth for the pass; all 43 official Module 2 Problem Set pages were rendered to local source-page assets and attached as lesson-level visual references.
- After the failed Teacher Edition fidelity review, all 93 Module 2 Problem Set cards received Teacher Edition-derived prompt overrides and Teacher Edition Answer Key solved-answer overrides. Solved mode now also shows local Teacher Edition Answer Key page images for the lesson.
- The primary Problem Set experience remains interactive rather than PDF-only: students see Blank/Solved cards with elapsed-time number lines, clock workspaces, measurement tables, tape diagrams, grouping visuals, validation checks, summary meaning cards, and source images for both Problem Set pages and Answer Key pages.
- Chrome visual QA clicked all 21 Module 2 lessons from the visible Topic lesson cards and then clicked Concept, Problem Set, Blank, Solved, Summary, and every Problem bookmark. The first audit verified 93 expected Problem Set cards, no broken Teacher Edition Problem Set images, concrete animations, and 0 console errors.
- Follow-up live audit verified 93/93 problem prompts, 0 generic prompt buckets, 93/93 Teacher Edition Answer Key explanation blocks, 93/93 validation blocks, answer-key source images in Solved mode for every lesson, and 0 broken answer-key images.
- Animation remediation added concrete rendered-element animations for number-line, clock, and two-step models so time/rounding lessons are visibly animated and testable, not just static text beside source images.
- Remaining gap: visual-only clock, scale, container, and variable measurement items are still not fully hand-authored as exact per-problem solved visuals. They are source-referenced and supported by shared interactive/animated models, but should receive Teacher Edition-cropped solved work or bespoke manipulatives before Module 2 is described as fully fulfilled visually.

2026-07-03 Module 3 replication note:

- Module 3 Lessons 1-21 now use the problem-set-centered runtime shape through a Module 3-only source-backed data map.
- The Module 3 pass covers all 93 extracted Student Workbook Problem Set items for multiplication and division with units of 0, 1, 6-9, and multiples of 10.
- Solved mode uses the Module 3 Teacher Edition Answer Key, printed pages 279-316, as the answer source.
- The runtime keeps official source pages collapsed as references only. The primary Problem Set experience remains the interactive Blank/Solved card surface modeled after Lesson 12.
- Chrome remediation QA in session `G3-M3` clicked all 21 lessons, Concept / Problem Set / Summary, Blank / Solved, and all 93 Problem bookmarks. The final pass verified 93 solved cards, 0 unsupported solved cards, 93 source/model visual markers, 71 animated equation-flow markers, and 0 failures. Lesson 4 was rerun in isolation after a transient click-state read and passed.
- Exact generated lesson-objective tails are stripped by lesson/problem key so problem headings no longer display extraction artifacts such as `to decompose.`, `the unknown.`, `multiplication table.`, or similar objective fragments.
- Current visual coverage: every solved card now has source-derived model support or animated equation-flow support; clear arrays, equal groups, grouping, sharing, and two-step story problems also have item-specific visual/animation metadata.
- Remaining enhancement gap: table/riddle/pattern and image-heavy/open items can still be improved with cropped Teacher Edition answer-key visuals or more bespoke manipulatives, but they are no longer PDF-only/source-only placeholders.

2026-07-03 Module 4 replication note:

- Module 4 Lessons 1-16 now use the problem-set-centered runtime shape through a Module 4-only source-backed data map.
- The Module 4 pass uses the Teacher Edition answer key and Problem Set pages for Multiplication and Area prompts, solved answers, equations, pattern-block counts, rectangle dimensions, and floor-plan room areas.
- The primary experience is authored/interactable content, not embedded Module 4 PDF pages: Lesson 1 pattern-block covers, source factor-pair area models, equation-backed arrays, and the Lesson 15 room-area floor-plan card are rendered by the app.
- Chrome session `🔎 G3-M4 audit` clicked all 16 lesson routes from visible topic cards through Concept, Problem Set, Blank, Solved, Summary, and every Problem bookmark. The controls and local Problem links render, but the source-fidelity audit failed: Blank mode leaks solved values in multiple lessons, solved views for Lessons 2-15 do not visibly preserve all checked Teacher Edition answer-key snippets, M4-specific visual families are static, and Lessons 4, 13, and 16 have no M4-specific solved visual container.
- Remaining gap: Module 4 needs remediation before it can be called fulfilled. Image-heavy/open items need richer source-faithful visuals or editable manipulatives, especially composite figures, variable floor-plan discussion items, and Lesson 16's room-design table.

2026-07-03 Module 5 replication note:

- Module 5 Lessons 1-30 now use the problem-set-centered runtime shape through a Module 5-only source-backed data map.
- The Module 5 pass uses official Student Workbook layout text to split the Problem Set into source-derived problem cards; this replaced the earlier flattened generated prompt chunks for lessons such as Lesson 10.
- The shared renderer now handles Module 5 scaffold families for multiple fraction strips and multiple number lines in one official problem card.
- Browser visual QA completed in session `G3-M5`: controls render for all Module 5 lessons, but source fidelity fails because solved views use generic `Completed Problem` text and shared fraction-strip/number-line scaffolds rather than Teacher Edition solved work or cropped PDF visuals.
- Remediation after that failed pass removed the PDF-page-only primary experience and old `Completed Problem` text. Targeted Browser checks verified Lesson 10 with 5 interactive problem cards and Lesson 14 with number-line model rows.
- Lesson 30 now has a Teacher Edition-authored no-sheet Problem Set activity based on printed pages 353-354: lined paper, 5 paper spaces per third, vertical guide extensions, angled red strip, 1/3 and 2/3 strip marks, verification checks, and cooperative-group challenge units. Browser session `G3-M5` clicked Concept, Problem Set Blank, Problem Set Solved, and Summary; screenshot saved under `tmp/module5-visual-qa/lesson30-paper-partition/`.
- Full Chrome source-fidelity audit in tab group `G3-M5 Audit` clicked all 30 lessons, all Concept / Problem Set / Summary controls, Blank / Solved modes, and every Problem bookmark in both modes. Click-through passed with 30 solved screenshots and 0 bookmark failures, but source fidelity failed for Lessons 1-29. Lesson 30 passed in that audit.
- Lesson 1 has since been re-authored from the Teacher Edition printed pages 12-18. It now has five source-faithful authored Problem Set cards: beakers labeled 1 half, 1 fourth, and 1 third; Juanita string-cheese bars with 3, 6, and 4 equal pieces; rectangle partitions for halves, thirds, and fourths; paper sheets labeled sevenths and ninths plus the 20-part line-count generalization; and Rochelle's 12-inch wood strip cut into 6-inch pieces. Chrome validation on fresh `localhost:4305` clicked Concept, Problem Set, Blank, Solved, Summary, and every Lesson 1 Problem bookmark. No PDF-page embed is used as the primary experience.
- Remaining gap: hand-author Teacher Edition/source-faithful visuals for Lessons 2-29 where generic fraction-strip/number-line rows remain, especially number-bond, equivalent-shape, paper-folding, and later number-line items; source page images may be used as audit evidence but should not replace the Lesson 12-style interactive surface.

2026-07-03 Module 6 replication note:

- Module 6 Lessons 1-9 now use the problem-set-centered runtime shape through a Module 6-only registry overlay backed by Teacher Edition Problem Set prompts, cleaned fraction-heavy prompt overrides, and Teacher Edition answer-key values.
- The Module 6 pass covers the official tally chart, picture graph, scaled bar graph, vertical tape diagram, ruler, measurement table, and line plot Problem Set items with Teacher Edition-derived concept animation panels.
- Blank and Solved modes now render authored interactive display cards for Module 6 data work instead of embedding PDF pages. Variable survey and measurement items stay variable where the Teacher Edition says they vary; fixed graph/line-plot answers use Teacher Edition answer-key values.
- A follow-up Teacher Edition visual audit found and corrected source-fidelity issues from the earlier pass: Lesson 6 Problem 1 now uses `53 1/2`, Lesson 7 uses the official `2 1/4`, `2 3/4`, and `2 2/4` wording, and Lessons 7-9 preserve the Teacher Edition source measurement tables rather than generated sorted chips.
- Lesson 9 Problem 3 now uses the Teacher Edition table counts: `2:1`, `2 1/4:3`, `2 1/2:2`, `2 3/4:6`, `3:4`, `3 1/4:5`, `3 1/2:0`, `3 3/4:3`.
- Chrome session `G3-M6` reran all Lessons 1-9 through Concept / Problem Set / Summary, Blank / Solved, and every Problem bookmark with 0 failures and 0 console errors after these corrections.
- Remaining gap: future editable graph/ruler/line-plot tools can be richer, but they must preserve the PDF as the source of truth.

2026-07-03 Module 7 replication and visual-fulfillment audit note:

- Module 7 Lessons 1-34 now use the problem-set-centered runtime shape through a Module 7-only registry overlay.
- The Module 7 Teacher Edition PDF is now the visible source image basis. Teacher Edition Problem Set pages are mapped into Concept and Blank mode; Teacher Edition Answer Key pages are mapped into Solved mode.
- Source-visual remediation rendered 122 Module 7 Teacher Edition pages to local assets under `interactive-grade3-app/public/source-pages/m7-teacher/`.
- Blank mode no longer shows empty generic workspaces for Module 7, and Solved mode no longer shows generic diagram placeholders when a Teacher Edition source page is available.
- Validation completed: `npm run build` passed after the Teacher Edition source-page wiring. Static checks found no remaining primary Module 7 workbook/generic placeholder strings in the runtime path.
- In-app Browser session `G3-M7` clicked all 34 Module 7 lessons in shorter batches through Concept, Problem Set Blank, every Problem bookmark, Problem Set Solved, every Problem bookmark again, and Summary. The audit verified Teacher Edition Problem Set pages in Concept/Blank mode, Teacher Edition Answer Key pages in Solved mode, matching card/bookmark counts, and no visible workbook/generic placeholder labels. Lesson 4 had one transient toolbar click timeout and passed on retry.
- Chrome + Computer visual audit in tab group `🔎 G3-M7` found the module is not fulfilled against the intended portal requirement. All 34 lessons passed data/source-page accuracy checks, but 0 of 34 lessons passed the authored problem-visual criterion: every Solved problem card is still using Teacher Edition Answer Key page images as the primary visual instead of a source-derived linear explanation, diagram, manipulative, or animation.
- Remaining gap: Teacher Edition solved-answer work has not been fully transcribed or cropped into per-problem solved models, and bespoke Lesson 12-style animations/manipulatives have not been authored for every Module 7 item. The current correction restores Teacher Edition source images and prevents blank/generic placeholders, but Module 7 is not a complete Teacher Edition answer-key solved-work or animation implementation.

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
