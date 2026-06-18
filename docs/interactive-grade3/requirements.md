# Requirements: Grade 3 Interactive Eureka Math App

Date: 2026-06-18
Status: Current delivery baseline
Owner: Grade3 workspace

## 1. Product Summary

Build an interactive Grade 3 math learning app that teaches Eureka Math Grade 3 module by module, topic by topic, lesson by lesson. The app should behave like a guided visual lesson companion: it introduces the lesson concept, breaks it into smaller parts, demonstrates with visual models, gives the learner guided practice, validates the learner's work, and summarizes the takeaway.

The app is not a generic math tutor. It is a structured learning experience grounded in the teacher editions already present in this workspace.

## 2. Canonical Scope

### In Scope

- Build inside the Grade3 workspace only:
  - `/Volumes/Data2/Tutorials/Eureka Math Grade 2 - Syllabus Videos Curriculum/Grade3`
- Use the Grade 3 Eureka Math teacher editions as curriculum source of truth.
- Build an Angular-style app using the EdZilla Angular project as a read-only architecture and component reference.
- Use existing design patterns from the design-spec static reference.
- Create durable docs for requirements, design, implementation, tracking, and worktree operations.
- Provide separate module pages for Modules 1-7.
- Provide separate routes for every Grade 3 lesson.
- Use teacher-edition overview objectives for all lesson routes.
- Deep-author lesson pages from full teacher-edition lesson pages as the content is extracted and audited.

### Out Of Scope

- Editing the EdZilla reference projects.
- Rewriting or improving the Eureka curriculum.
- Adding external math concepts not supported by the teacher editions.
- Building a generic AI tutor that ignores lesson sequence.
- Scraping or researching outside curriculum sources.
- Using external accounts, cloud connectors, browser profiles, or live systems without explicit authorization.
- Creating a real git worktree or branch until explicitly requested.

## 3. Source Of Truth Rules

### Curriculum Source

The following teacher editions are the authoritative curriculum files:

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf
```

### Supporting Source Files

Student workbooks and additional materials may support learner practice only after the lesson objective and concept sequence are grounded in the teacher edition:

```text
EurekaMath-Sources/Module_*/g3_m*_student_wkbook_*.pdf
EurekaMath-Sources/Module_*/g3_m*_addtnl_matrls_*.pdf
EurekaMath-Sources/Materials_List/eureka_math_grade_3_materials_list_1.3.0.pdf
```

### Conversation Guidance

`tmp/req.txt` is a tone and workflow artifact. It should influence pacing and interaction style, but it must not override the teacher editions.

Important guidance from the transcript:

- Start slow.
- Do not jump across all modules at once.
- Teach in a Grade 3 appropriate way, not toddler language.
- For each lesson, explain the concept first, then examples, then learner assessment, then validation.
- Break core concepts into smaller parts.
- Stay close to the syllabus and teacher-edition language.
- Keep everything visually driven.

## 4. Reference Project Rules

The following paths are read-only references:

```text
/Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
/Volumes/Data/EdZillaPrj/EdZilla/scratch-prjs/design-spec/
```

Use them to copy patterns conceptually:

- Angular standalone component structure.
- Route-based app layout.
- Data-driven page content.
- Shared chart and visual components.
- Mermaid rendering pattern.
- Design tokens, typography, tabs, cards, buttons, tables, charts, and page layouts.
- Task/runbook style.

Do not:

- Edit files in those projects.
- Move files from those projects.
- Run destructive commands there.
- Treat those projects as the implementation target.

## 5. Audience

Primary learner:

- A Grade 3 student learning Eureka Math concepts.

Secondary user:

- Parent or teacher guiding the student through lessons.

The UX should support both:

- Student-facing visual explanations and practice.
- Adult-facing confidence that the content follows the teacher edition.

## 6. Curriculum Coverage

The app must support the full Grade 3 structure over time:

- Module 1: Multiplication and division foundations using units of 2-5 and 10.
- Module 2: Place value and problem solving with units of measure.
- Module 3: Multiplication and division with units of 0, 1, 6-9, and multiples of 10.
- Module 4: Multiplication and area.
- Module 5: Fractions as numbers on the number line.
- Module 6: Collecting and displaying data.
- Module 7: Geometry and measurement word problems.

Current delivery must include the full route map:

- Module pages for Modules 1-7.
- Topic and lesson maps for every module.
- 152 source-backed lesson routes.
- Teacher-edition objective labels for every lesson.
- Module 1 Lesson 1 as the first fully deep-authored lesson experience.
- Reusable architecture for deep-authoring additional lessons.

## 7. Lesson Experience Requirements

Each lesson must include the following sections.

### 7.1 Lesson Header

Must include:

- Module number and title.
- Topic name.
- Lesson number.
- Lesson objective.
- Student-friendly goal.
- Estimated flow.

Should include:

- Progress indicator.
- Concept tags.
- Visual model types used in the lesson.

### 7.2 Concept Walkthrough

Must:

- Break the concept into small steps.
- Present one sub-concept at a time.
- Prefer visual-first explanation before symbolic notation.
- Use Grade 3 language.
- Align with the teacher-edition concept development.

Must not:

- Dump the whole lesson at once.
- Introduce unrelated external examples as if they are curriculum.
- Use childish simplifications that undercut Grade 3 rigor.

### 7.3 Visual Model

Each concept step should use one or more visual models, such as:

- Equal groups.
- Counters.
- Arrays.
- Tape diagrams.
- Number lines.
- Clocks.
- Measurement scales.
- Area tiles.
- Fraction strips.
- Fraction area models.
- Bar graphs.
- Picture graphs.
- Line plots.
- Shapes and perimeter paths.

The visual model must be interactive where useful, not merely decorative.

### 7.4 Guided Examples

Guided examples must:

- Follow the lesson's conceptual sequence.
- Reveal steps progressively.
- Ask the learner to notice relationships.
- Show the connection between picture, words, equation, and answer.
- Use teacher-edition-compatible language.

### 7.5 Practice And Assessment

Practice must:

- Include quick checks after concept steps.
- Include lesson-end practice aligned to problem set or exit ticket style.
- Prefer structured interactions over free-form text where possible.
- Let the learner submit answers.
- Validate correctness.
- Explain why an answer is correct or incorrect.

### 7.6 Validation Feedback

Feedback must:

- Be specific.
- Refer back to the visual model.
- Use the lesson's language.
- Identify the misconception.
- Offer a next action.

Examples:

- "Check whether every group has the same number."
- "The first number tells how many groups."
- "The second number tells how many in each group."
- "This picture cannot be multiplied yet because the groups are not equal."

### 7.7 Lesson Summary

Must include:

- One clear takeaway.
- One visual recap.
- One final question or exit check.
- Optional adult/teacher note sourced from lesson intent.

## 8. Module Experience Requirements

Each module should include:

- Module overview.
- Topics grouped in student-friendly chunks.
- Lesson list.
- Visual concept map.
- Progress by lesson.
- Key models used in the module.
- Assessment checkpoints.

The app should not force the learner to see all modules at once. It should support a slow, focused path.

Each module must have its own module page. A shared Angular page component may render the pages, but the learner-facing experience must expose separate routes and separate module-specific topic/lesson maps for Modules 1-7.

Lesson authoring must avoid a few oversized steps. A lesson may be grouped by concept, but the learner-facing flow should be broken into small screens that each focus on one action or idea.

## 9. Visual And Interaction Requirements

### Must Have

- Module navigation.
- Lesson navigation.
- Step-by-step lesson panels.
- Visual manipulatives.
- Answer validation.
- Progress tracking in local app state.
- Responsive layout for desktop and tablet-width screens.
- Accessible text labels for interactive visuals.

### Should Have

- Teacher/source reference notes.
- Reset step button.
- Show hint button.
- Compare picture/words/equation panel.
- "Try another" generated from lesson-aligned patterns.
- Review mode after lesson completion.

### Nice To Have

- Printable summary.
- PDF export.
- Saved learner attempts.
- Audio narration.
- Parent dashboard.

## 10. First Vertical Slice Requirements

### Module 1 Overview

The learner should understand:

- Module 1 begins multiplication and division.
- It builds from equal groups and repeated addition.
- It uses arrays, skip-counting, tape diagrams, and equations.
- It focuses first on smaller factors before later modules expand fluency.

### Module 1 Lesson 1

Objective:

- Understand equal groups as multiplication.

Required concept steps:

1. Start with the lesson goal.
2. Count equal groups.
3. Use skip-counting to find the total.
4. Make groups of 2.
5. Name the groups in words.
6. Write repeated addition.
7. Use unit form.
8. Use the multiplication symbol.
9. Check an equal-groups example.
10. Check a non-example with unequal groups.
11. Complete the exit check.
12. Say the takeaway.

Required interactions:

- Build equal groups with counters.
- Count by group size.
- Fill repeated addition blanks.
- Convert between words, addition, and multiplication.
- Identify a non-example where groups are not equal.
- Draw or construct a visual for a multiplication sentence.

Required feedback examples:

- If groups are unequal, the app must explain that multiplication cannot represent the picture yet.
- If the group count and group size are reversed, the app must distinguish "number of groups" and "size of each group."
- If repeated addition does not match the picture, the app must point back to the groups.

## 11. Data Requirements

Lesson data should be structured. A lesson record should include:

```ts
type LessonContent = {
  moduleId: string;
  topicId: string;
  lessonId: string;
  title: string;
  objective: string;
  source: SourceReference[];
  studentGoal: string;
  visualModels: VisualModelType[];
  conceptSteps: ConceptStep[];
  guidedExamples: GuidedExample[];
  practice: PracticeItem[];
  exitTicket: PracticeItem[];
  teacherNotes: TeacherNote[];
};
```

Do not hardcode all lesson content into component templates.

## 12. Accessibility Requirements

- All interactive controls must be keyboard reachable.
- All visual-only math models need text equivalents.
- Color cannot be the only signal for correctness.
- Buttons and inputs must have clear labels.
- Feedback must be readable by assistive technologies.
- Canvas-based charts or visuals must include accessible summaries.

## 13. Performance Requirements

- Initial load should remain reasonable for local use.
- Do not load every PDF into the browser.
- Convert curriculum into structured data before runtime where possible.
- Lazy-load module/lesson data when practical.
- Use SVG/CSS/HTML for math manipulatives unless canvas is clearly better.

## 14. Privacy And Safety Requirements

- Keep all work local to the Grade3 workspace.
- Do not use external services for curriculum processing unless explicitly authorized.
- Do not expose personal data from unrelated files.
- Do not inspect browser or app UI unless explicitly authorized for the exact target.
- Do not modify reference projects.

## 15. Acceptance Criteria

The first implementation milestone is accepted when:

- The Angular app runs locally from the Grade3 workspace.
- Module 1 overview route exists.
- Module 1 Lesson 1 route exists.
- Lesson 1 teaches the required concept steps visually.
- At least three interactive checks validate learner input.
- The non-equal-groups misconception is handled.
- Build passes.
- Design follows the referenced EdZilla component language.
- Task tracker and validation log are updated.
