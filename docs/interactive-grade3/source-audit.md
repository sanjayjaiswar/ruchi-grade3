# Source Audit: Grade 3 Interactive Math App

Date: 2026-06-18
Status: Active

## 1. Audit Purpose

This audit verifies that factual curriculum content in the app is grounded in the Eureka Math Grade 3 source PDFs in this workspace.

Creative teaching, visual pacing, UI layout, and explanation style are allowed. Curriculum facts, module structure, topic names, lesson objectives, examples, and validation logic must trace back to the Eureka Math sources.

## 2. Audited Files

App content:

```text
interactive-grade3-app/src/app/data/curriculum.data.ts
interactive-grade3-app/src/app/data/curriculum.types.ts
interactive-grade3-app/src/app/pages/lesson/lesson.html
interactive-grade3-app/src/app/pages/lesson/lesson.ts
interactive-grade3-app/src/app/shared/equal-groups-model/*
```

Primary curriculum sources:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf
```

## 3. Audit Findings

### Module Structure

Status: Pass

Module titles, topic titles, topic day counts, and lesson-id ranges in `curriculum.data.ts` were checked against the teacher-edition "Overview of Module Topics and Lesson Objectives" tables.

Notes:

- Modules 1-7 each have a module page route.
- Topic names and day counts are sourced from the teacher-edition overview tables.
- Full lesson objective text has been entered for all 152 Grade 3 lessons from the teacher-edition overview tables.
- Lesson routes exist for all 152 lessons. Module 1 Lessons 1 and 4 are deeply authored from their lesson pages; the other routes are objective-backed placeholder flows.

### Module Summaries

Status: Pass with paraphrase

Module summaries are paraphrases of the teacher-edition module overview narratives. They should remain short and conservative. Do not add new claims to summaries without checking the corresponding module overview.

### Module 1 Lesson 1 Objective

Status: Pass

Teacher-edition objective:

```text
Understand equal groups of as multiplication.
```

The app displays the exact objective in the lesson source card. The student-facing page title is a cleaned teaching label:

```text
Understand Equal Groups as Multiplication
```

This is acceptable because the exact objective remains visible and recorded in `sourceRefs`.

### Module 1 Lesson 1 Flow

Status: Pass after fixes

The Lesson 1 flow is grounded in:

- Fluency Practice: group counting by twos.
- Application/Concept Development: skip-counting volunteers' arms by twos.
- Problem 2: 12 counters arranged into 6 equal groups of 2.
- Repeated addition: `2 + 2 + 2 + 2 + 2 + 2 = 12`.
- Unit form: `6 twos = 12`.
- Multiplication sentence: `6 x 2 = 12`.
- Problem 3: equal groups and a non-example where groups are not equal.
- Exit Ticket: 4 groups of 2 and a 3 + 3 + 3 representation.

### Module 1 Lesson 4 Objective

Status: Pass

Teacher-edition objective:

```text
Understand the meaning of the unknown as the size of the group in division.
```

The app displays the exact objective in the lesson source card. The student-facing page title is a cleaned teaching label:

```text
Find the Size of the Group in Division
```

This is acceptable because the exact objective remains visible and recorded in `sourceRefs`.

### Module 1 Lesson 4 Flow

Status: Pass after authoring

Teacher-edition source:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
PDF pages 63-74
```

Rendered source pages:

```text
tmp/lesson-renders/m1-l4/page-063.png
tmp/lesson-renders/m1-l4/page-064.png
tmp/lesson-renders/m1-l4/page-065.png
tmp/lesson-renders/m1-l4/page-066.png
tmp/lesson-renders/m1-l4/page-067.png
tmp/lesson-renders/m1-l4/page-068.png
tmp/lesson-renders/m1-l4/page-069.png
tmp/lesson-renders/m1-l4/page-070.png
tmp/lesson-renders/m1-l4/page-071.png
tmp/lesson-renders/m1-l4/page-072.png
tmp/lesson-renders/m1-l4/page-073.png
tmp/lesson-renders/m1-l4/page-074.png
```

The Lesson 4 flow is grounded in:

- Concept target: division where the unknown represents the size of each group.
- Fair-share model: 18 counters divided into 2 equal groups, giving 9 in each group.
- Equation meaning: total first, known number of groups second, quotient as group size.
- Pictorial comparison: 12 stickers in 3 equal groups, comparing group-size and number-of-groups interpretations.
- Abstract-to-pictorial step: 8 divided by 4 represented as 4 equal groups of 2.
- Exit Ticket pattern: 16 glue sticks divided into 4 equal groups and 15 divided by 3.

Known limitation:

- The rendered app model uses the shared equal-groups component rather than the exact source artwork. This is acceptable because it preserves the mathematical structure and avoids copying source images directly.

### Fixes Made During Audit

1. Removed `tmp/req.txt` from app `sourceRefs`.
   - Reason: the transcript is tone/workflow guidance, not curriculum truth.
2. Removed `planning-note` from `SourceReference.sourceType`.
   - Reason: app source references should point only to curriculum source categories.
3. Adjusted early Lesson 1 screens so multiplication is not shown before the lesson reaches multiplication notation.
   - Reason: the teacher-edition sequence moves from equal groups and repeated addition to unit form and then multiplication.
4. Replaced an early `10 x 2 = 20` chip with sourced language:
   - `10 twos = 20`
   - `10 groups of two is 20`

## 4. Current Limitations

### Objective-Backed Lesson Routes

Modules 1-7 now have source-backed topic/lesson maps and source-backed lesson routes.

Current behavior is intentional:

- The app shows module/topic/lesson structure.
- Every lesson route displays the teacher-edition objective, topic, module model set, and source reference.
- Module 1 Lessons 1 and 4 display deeply authored lesson-page flows.
- Other lesson routes use conservative objective-backed screens rather than invented examples or assessments.

Before deep-authoring any additional lesson page beyond the objective-backed flow, extract and audit that lesson's teacher-edition pages.

### Lesson Objective Labels

The module maps show lesson numbers and teacher-edition objective text for all 152 lessons.

Recommended next improvement:

- Add lesson-page-specific fluency, concept-development, problem-set, and exit-ticket detail one lesson at a time from the teacher-edition lesson pages.
- Expand visual components for arrays, tape diagrams, clocks, number lines, fraction strips, graphs, area models, and geometry.

## 5. Source Rules Going Forward

Every authored lesson must include:

- teacher-edition source path,
- PDF page range,
- exact lesson objective,
- source-backed concept sequence,
- source-backed visual models,
- source-backed practice/check patterns,
- feedback tied to lesson misconceptions.

Every generated or paraphrased explanation must be checked against the source and should be conservative.

Do not add:

- outside strategies,
- new standards,
- historical facts,
- unrelated real-world examples,
- invented assessments,
- unsourced lesson objectives.

## 6. Validation Log

| Date | Check | Result |
| --- | --- | --- |
| 2026-06-18 | Module overview tables checked against source PDFs | Pass |
| 2026-06-18 | Module 1 Lesson 1 checked against teacher-edition pages 19-29 | Pass |
| 2026-06-18 | Removed transcript from app source references | Pass |
| 2026-06-18 | Adjusted Lesson 1 visual sequence to match source progression | Pass |
| 2026-06-18 | `npm run build` | Pass |
| 2026-06-18 | Added teacher-edition objective labels for all 152 Grade 3 lessons | Pass |
| 2026-06-18 | Route audit for 152 lesson URLs | Pass |
| 2026-06-19 | Module 1 Lesson 4 checked against teacher-edition PDF pages 63-74 and rendered source pages | Pass |
| 2026-06-19 | `npm run build` after Module 1 Lesson 4 authoring | Pass |
