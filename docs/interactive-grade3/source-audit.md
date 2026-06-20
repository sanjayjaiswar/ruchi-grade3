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
- Lesson routes exist for all 152 lessons. Module 1 Lessons 1-21 now have source-backed lesson records; Lessons 1 and 4-6 have bespoke interactive checks, and the rest use the compact source-authored teacher flow. Other modules remain objective-backed placeholder flows.

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

### Module 1 Lesson 5 Objective

Status: Pass

Teacher-edition objective:

```text
Understand the meaning of the unknown as the number of groups in division.
```

The app displays the exact objective in the lesson source card. The student-facing page title is a cleaned teaching label:

```text
Find the Number of Groups in Division
```

### Module 1 Lesson 5 Flow

Status: Pass after authoring

Teacher-edition source:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
PDF pages 75-84
```

Rendered source pages:

```text
tmp/lesson-renders/m1-l5/page-075.png
tmp/lesson-renders/m1-l5/page-076.png
tmp/lesson-renders/m1-l5/page-077.png
tmp/lesson-renders/m1-l5/page-078.png
tmp/lesson-renders/m1-l5/page-079.png
tmp/lesson-renders/m1-l5/page-080.png
tmp/lesson-renders/m1-l5/page-081.png
tmp/lesson-renders/m1-l5/page-082.png
tmp/lesson-renders/m1-l5/page-083.png
tmp/lesson-renders/m1-l5/page-084.png
```

The Lesson 5 flow is grounded in:

- Concept target: division where the unknown represents the number of groups.
- Comparison to Lesson 4: the total and a known group size are given, so the answer no longer means group size.
- Group-making model: 18 people grouped by 6 people at each table, giving 3 groups.
- Count-by strategy: 15 burgers with 3 in each pack, counting 3, 6, 9, 12, 15 to get 5 packs.
- Exit Ticket pattern: 12 triangles divided into groups of 6 and 20 strawberries with 5 per smoothie.

### Module 1 Lesson 6 Objective

Status: Pass

Teacher-edition objective:

```text
Interpret the unknown in division using the array model.
```

The app displays the exact objective in the lesson source card. The student-facing page title is a cleaned teaching label:

```text
Use Arrays to Connect Division and Unknown Factors
```

### Module 1 Lesson 6 Flow

Status: Pass after authoring

Teacher-edition source:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
PDF pages 85-94
```

Rendered source pages:

```text
tmp/lesson-renders/m1-l6/page-085.png
tmp/lesson-renders/m1-l6/page-086.png
tmp/lesson-renders/m1-l6/page-087.png
tmp/lesson-renders/m1-l6/page-088.png
tmp/lesson-renders/m1-l6/page-089.png
tmp/lesson-renders/m1-l6/page-090.png
tmp/lesson-renders/m1-l6/page-091.png
tmp/lesson-renders/m1-l6/page-092.png
tmp/lesson-renders/m1-l6/page-093.png
tmp/lesson-renders/m1-l6/page-094.png
```

The Lesson 6 flow is grounded in:

- Concept target: interpreting division through arrays.
- Application problem: 20 children with 5 children on each team, represented as rows in an array.
- Equation bridge: 15 divided by 3 equals 5 and 3 times 5 equals 15 describe the same array.
- Related equations: blank times 3 equals 24 and 24 divided by 3 equals 8.
- Exit Ticket pattern: 12 notecards arranged into rows of 6, with both the quotient and unknown factor representing the number of rows.

Known limitation:

- Lesson 6 uses a simple local array visual rather than a dedicated reusable `ArrayModelComponent`. The visual is source-aligned, but a reusable component should be extracted before expanding array-heavy lessons.

### Module 1 Full Lesson Pass

Status: Pass with implementation tiers

Module 1 now has source-backed records for Lessons 1-21.

Implementation tiers:

- Lesson 1: bespoke interactive equal-groups lesson.
- Lessons 4-6: bespoke interactive Topic B division lessons.
- Lessons 2-3 and 7-21: compact source-authored teacher flow with exact objective, actual PDF page range, lesson-specific model focus, source-aligned teaching point, teacher move, and explanation check.

Source page ranges used:

| Lesson | PDF pages | Status |
| --- | --- | --- |
| 1 | 19-29 | Bespoke authored before this pass |
| 2 | 34-48 | Compact source-authored |
| 3 | 49-60 | Compact source-authored |
| 4 | 63-74 | Bespoke authored |
| 5 | 75-84 | Bespoke authored |
| 6 | 85-94 | Bespoke authored |
| 7 | 97-108 | Compact source-authored |
| 8 | 109-118 | Compact source-authored |
| 9 | 119-130 | Compact source-authored |
| 10 | 131-141 | Compact source-authored |
| 11 | 151-161 | Compact source-authored |
| 12 | 162-173 | Compact source-authored |
| 13 | 174-185 | Compact source-authored |
| 14 | 188-199 | Compact source-authored |
| 15 | 200-209 | Compact source-authored |
| 16 | 210-220 | Compact source-authored |
| 17 | 221-231 | Compact source-authored |
| 18 | 234-244 | Compact source-authored |
| 19 | 245-254 | Compact source-authored |
| 20 | 255-266 | Compact source-authored |
| 21 | 267-276 | Compact source-authored |

Known limitations:

- The compact source-authored flow is teacher-facing guidance, not a full bespoke interactive lesson. It is intentionally not the old generic dot placeholder.
- Full bespoke checks for Lessons 2-3 and 7-21 should be added as the next quality layer.
- Array-heavy lessons should use a reusable `ArrayModelComponent` before deeper authoring.

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
- Module 1 Lessons 1-21 display source-backed lesson-page flows. Lessons 1 and 4-6 are deeply interactive; Lessons 2-3 and 7-21 are compact teacher-led source-authored flows.
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
| 2026-06-19 | Module 1 Lesson 5 checked against teacher-edition PDF pages 75-84 and rendered source pages | Pass |
| 2026-06-19 | Module 1 Lesson 6 checked against teacher-edition PDF pages 85-94 and rendered source pages | Pass |
| 2026-06-20 | `npm run build` after Module 1 Lessons 5-6 authoring | Pass |
| 2026-06-20 | Added source-backed records for all Module 1 lessons and compacted visual model sizing | Pass |
| 2026-06-20 | `npm run build` after full Module 1 pass | Pass |
| 2026-06-20 | Route audit for all 21 Module 1 lesson URLs | Pass |
