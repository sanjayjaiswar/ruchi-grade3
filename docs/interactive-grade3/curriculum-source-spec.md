# Curriculum Source Spec

Date: 2026-06-18
Status: Draft baseline

## 1. Purpose

This document defines how curriculum content should be extracted, transformed, cited, and validated for the Grade 3 interactive math app.

The goal is strict source alignment without copying the teacher editions wholesale.

## 2. Curriculum Files

Authoritative teacher editions:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf
```

Supporting files:

```text
EurekaMath-Sources/Module_*/g3_m*_student_wkbook_*.pdf
EurekaMath-Sources/Module_*/g3_m*_addtnl_matrls_*.pdf
EurekaMath-Sources/Materials_List/eureka_math_grade_3_materials_list_1.3.0.pdf
EurekaMath-Sources/Release_Notes/grade_03_release_notes.pdf
```

## 3. Extraction Tools

Local tools available:

- `pdfinfo`
- `pdftotext`
- `pdftoppm`

Recommended use:

- `pdfinfo` for page counts.
- `pdftotext -layout` for rough text extraction.
- `pdftoppm` for visual verification of source pages.

Do not rely only on text extraction when visual layout matters.

## 4. Extraction Workflow

For each lesson:

1. Identify module PDF.
2. Locate topic overview.
3. Locate lesson pages.
4. Extract text for objective, structure, concept development, problem set, exit ticket, and homework.
5. Render relevant pages to images for visual inspection.
6. Identify the lesson's visual models.
7. Convert lesson flow into structured app content.
8. Record source references.
9. Validate authored content against rendered pages.

No lesson may be marked authored from the module overview table alone. The overview table is sufficient for route metadata and objective labels only.

## 5. Content Transformation Rules

### Allowed

- Paraphrase lesson concepts in student-friendly language.
- Convert teacher prompts into interactive steps.
- Convert problem-set patterns into structured practice.
- Create visuals that represent the same models from the lesson.
- Use the teacher edition's objective and key terms.

### Not Allowed

- Copy long teacher-edition passages into app content.
- Add outside math strategies not present in the lesson sequence.
- Change the lesson objective.
- Merge lessons unless the user explicitly asks for a pacing modification.
- Use student workbook material as primary truth when the teacher edition differs.

## 6. Lesson Authoring Template

Each lesson should be authored with this structure:

```text
1. Source references
2. Lesson objective
3. Student goal
4. Vocabulary
5. Visual models
6. Concept steps
7. Guided examples
8. Practice items
9. Exit ticket
10. Feedback rules
11. Summary
```

The required operating standard for this template is defined in `lesson-authoring-playbook.md`. If the playbook and this document differ, follow the stricter rule.

## 7. Source Reference Format

Use this shape in lesson data:

```ts
{
  sourceType: 'teacher-edition',
  path: 'EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf',
  pageStart: 19,
  pageEnd: 29,
  note: 'Lesson 1 objective, concept development, problem set, exit ticket, and homework'
}
```

Page numbers should refer to PDF page numbers unless app conventions later define book page numbers separately.

## 8. Module Metadata Summary

### Module 1

Focus:

- Multiplication and division foundations.
- Equal groups, arrays, factors, division as unknown factor, units of 2, 3, 4, 5, and 10.

Primary visual models:

- Equal groups.
- Arrays.
- Tape diagrams.
- Number bonds.

### Module 2

Focus:

- Time, metric weight, liquid volume, rounding, addition and subtraction with measurement.

Primary visual models:

- Clock.
- Number line.
- Scales.
- Beakers.
- Vertical number line.

### Module 3

Focus:

- Multiplication and division with remaining factors and multiples of 10.

Primary visual models:

- Arrays.
- Number bonds.
- Multiplication table.
- Place value chart.

### Module 4

Focus:

- Area as an attribute.
- Tiling.
- Area through multiplication.
- Decomposition of rectangles.

Primary visual models:

- Unit squares.
- Tile grids.
- Rectangles.
- Composite figures.

### Module 5

Focus:

- Fractions as equal parts and as numbers on the number line.
- Equivalent fractions.
- Fraction comparison.

Primary visual models:

- Fraction strips.
- Area models.
- Number lines.
- Partitioned wholes.

### Module 6

Focus:

- Categorical data.
- Measurement data.
- Scaled graphs.
- Line plots.

Primary visual models:

- Tables.
- Tape diagrams.
- Picture graphs.
- Bar graphs.
- Line plots.

### Module 7

Focus:

- Word problems.
- Geometry.
- Perimeter.
- Area/perimeter relationships.
- Year review.

Primary visual models:

- Polygons.
- Tangrams.
- Tetrominoes.
- Perimeter paths.
- Unit-square rectangles.
- Line plots.

## 9. Module 1 Lesson 1 Source Summary

Teacher-edition source:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
```

Relevant PDF pages already inspected:

```text
19-29
```

Lesson objective:

- Understand equal groups as multiplication.

Concept flow:

1. Group counting by twos.
2. Skip-count to find total number of objects.
3. Build equal groups with counters.
4. Relate repeated addition to unit form.
5. Relate unit form to multiplication.
6. Write multiplication sentences from equal groups.
7. Identify that multiplication requires equal groups.

Visuals:

- Counters.
- Groups/circles.
- Repeated addition board.
- Problem-set object groups.

Practice patterns:

- Fill blanks connecting groups, unit form, and multiplication.
- Decide whether a picture matches a multiplication sentence.
- Draw/model a multiplication sentence.
- Circle objects into equal groups.
- Write repeated addition and multiplication.

Critical misconception:

- A picture with unequal groups should not be represented by a multiplication sentence until the groups are equal.

## 10. Validation Checklist For Authored Lesson

Before marking a lesson source-aligned:

- Objective matches teacher edition.
- Visual models match the lesson.
- Concept steps follow lesson order.
- Examples are lesson-aligned.
- Practice validates the same understandings.
- Feedback addresses likely misconceptions from the lesson.
- Source references are recorded.
- No unsupported external strategy is introduced.
