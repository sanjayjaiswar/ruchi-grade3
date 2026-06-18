# Design Spec: Grade 3 Interactive Math App

Date: 2026-06-18
Status: Draft baseline

## 1. Design Objective

Create a visually driven, interactive Grade 3 math app that feels structured, calm, and instructional. The interface should look like a serious learning tool for a Grade 3 student and parent/teacher, not a marketing site and not a toy.

The design must reuse patterns from the EdZilla Angular app and design-spec reference. Do not invent a new visual system unless a required learning interaction is missing from the references.

## 2. Visual References

### Primary UI Architecture Reference

```text
/Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
```

Relevant patterns:

- Angular standalone components.
- Shared page sections.
- Route-based pages.
- Content-driven components.
- Chart card pattern.
- Markdown and Mermaid rendering patterns.
- App-level navigation.
- Data-rich dashboard layouts.

### Primary Design System Reference

```text
/Volumes/Data/EdZillaPrj/EdZilla/scratch-prjs/design-spec/index.html
```

Relevant sections:

- Text basics.
- Cards and KPIs.
- Controls and buttons.
- Tables.
- Charts and visuals.
- Tabs.
- Option cards.
- Helper cards.
- Page shells.

## 3. Design Principles

### 3.1 Visual First

Every new concept should start with an inspectable visual model before symbols become the focus.

Example:

- Show 6 groups of 2 counters.
- Then show `2 + 2 + 2 + 2 + 2 + 2`.
- Then show `6 twos`.
- Then show `6 x 2 = 12`.

### 3.2 One Concept Step At A Time

The UI should not show a dense wall of lesson explanation. Each concept step should occupy a focused panel with:

- A visual.
- A short explanation.
- A question or action.
- Feedback.

### 3.3 Grade 3 Rigor

The tone should be clear and student-friendly but not babyish. Avoid cartoon-heavy or kindergarten-style visuals. Use clean manipulatives, precise language, and calm feedback.

### 3.4 Reuse Existing Patterns

Use the existing EdZilla style family:

- Blue accent.
- White and light muted surfaces.
- Clear cards.
- Dense but readable layouts.
- Tabs for section switching.
- Charts where data is involved.
- Mermaid only for conceptual maps, not basic arithmetic manipulatives.

### 3.5 No Decorative Noise

Avoid:

- Decorative blobs.
- Heavy gradients.
- Marketing-style hero sections.
- Random illustrations not tied to the math.
- Large unused whitespace.

## 4. Information Architecture

### 4.1 Routes

Recommended route structure:

```text
/                 App home / module picker
/modules          All modules
/modules/:id      Module overview
/modules/:id/topics/:topicId
/modules/:id/lessons/:lessonId
/practice         Optional later cross-lesson practice
/progress         Optional later progress view
```

### 4.2 App Shell

App shell should include:

- Compact top navigation.
- Current module/lesson breadcrumb.
- Progress indicator.
- Theme-consistent controls.
- Main content area.

Avoid a marketing landing page. The first screen should help the learner start learning.

## 5. Page Types

### 5.1 Home / Module Picker

Purpose:

- Let the learner choose a module.
- Show the year path without overwhelming them.

Required elements:

- Grade 3 title.
- Module cards.
- Short module summaries.
- Start/continue action.

### 5.2 Module Overview Page

Purpose:

- Explain what the module is about.
- Show topic sequence.
- Show lesson list.
- Help the learner focus on one module.

Required elements:

- Module title.
- Short student-friendly overview.
- Topic cards.
- Lesson list grouped by topic.
- Visual model badges.
- Assessment checkpoints.

Every Grade 3 module must have a dedicated route and module page:

```text
/modules/m1
/modules/m2
/modules/m3
/modules/m4
/modules/m5
/modules/m6
/modules/m7
```

The pages may reuse the same Angular component, but the content must be module-specific and must show that module's own topic and lesson map.

### 5.3 Lesson Page

Purpose:

- Deliver the actual interactive lesson.

Required layout zones:

- Lesson header.
- Step navigation.
- Concept/visual workspace.
- Practice/check panel.
- Feedback panel.
- Summary/exit ticket.

Lessons should be split into small screens. Do not compress a lesson into a few large panels. A concept group can contain several screens, such as "see the model," "name the model," "write the addition," "write the unit form," and "write multiplication."

Recommended desktop layout:

```text
+----------------------------------------------------------+
| Breadcrumb / Module / Lesson / Progress                  |
+----------------------+-----------------------------------+
| Step list            | Main lesson workspace             |
| Concept steps        | Visual + explanation + action     |
| Practice status      | Feedback + next step              |
+----------------------+-----------------------------------+
```

Recommended mobile/tablet layout:

```text
+-----------------------------------+
| Breadcrumb / Progress             |
+-----------------------------------+
| Step tabs                         |
+-----------------------------------+
| Visual workspace                  |
| Explanation                       |
| Action / Practice                 |
| Feedback                          |
+-----------------------------------+
```

## 6. Core Visual Components

### 6.1 Equal Groups Builder

Used in:

- Module 1 Lesson 1.
- Later multiplication/division lessons.

Requirements:

- Show groups as containers.
- Show counters/items inside each group.
- Allow changing number of groups.
- Allow changing group size.
- Support intentionally unequal groups for misconception checks.
- Show matching repeated addition.
- Show matching unit form.
- Show matching multiplication sentence.

States:

- Empty.
- Equal groups valid.
- Unequal groups invalid for multiplication.
- Learner answer correct.
- Learner answer needs revision.

### 6.2 Array Builder

Used in:

- Module 1 Lesson 2 onward.
- Multiplication fluency.
- Area module.

Requirements:

- Rows and columns.
- Highlight row count.
- Highlight items per row.
- Show skip-counting by row.
- Support commutative comparison where appropriate.

### 6.3 Tape Diagram Viewer

Used in:

- Word problems.
- Multiplication/division relationships.
- Module 6 graph-to-tape connections.

Requirements:

- Equal segments.
- Labels above/below.
- Unknown marker.
- Equation link.

### 6.4 Number Line Interaction

Used in:

- Time intervals.
- Rounding.
- Fractions.
- Measurement.

Requirements:

- Draggable or selectable points.
- Tick marks.
- Labels.
- Interval highlighting.
- Fraction labels when needed.

### 6.5 Fraction Visualizer

Used in:

- Module 5.

Requirements:

- Partition a whole into equal parts.
- Highlight unit fractions.
- Compose non-unit fractions.
- Compare fraction strips.
- Place fractions on number line.
- Show equivalent points where required.

### 6.6 Area Model / Tile Grid

Used in:

- Module 4.
- Module 7 area/perimeter work.

Requirements:

- Unit square grid.
- Tile count.
- Side length labels.
- Decompose/recompose rectangles.
- Compare area and perimeter.

### 6.7 Graph And Data Visuals

Used in:

- Module 6.
- Module 7 line plots.

Requirements:

- Scaled picture graph.
- Scaled bar graph.
- Line plot with fractional intervals.
- Data table when needed.
- Use Chart.js-style pattern where appropriate.

### 6.8 Mermaid Concept Map

Used for:

- Module concept maps.
- Topic progression.
- Relationship diagrams.

Requirements:

- Follow EdZilla `data-mermaid` rehydration pattern.
- Keep labels simple.
- Quote labels when punctuation is needed.
- Store diagram strings in data files.

## 7. Component Style Requirements

### Cards

Use for:

- Module cards.
- Topic cards.
- Concept step cards.
- Practice result cards.

Do not nest cards inside cards unless the child card is a repeated item and the layout remains clear.

### Tabs

Use for:

- Lesson modes: Learn, Practice, Review.
- Module overview sections.
- Visual representation toggles.

### Buttons

Use for:

- Next step.
- Check answer.
- Reset model.
- Show hint.
- Try another.

Buttons should use existing EdZilla-style primary/secondary treatment.

### Tables

Use sparingly for:

- Picture / words / addition / multiplication comparisons.
- Practice review.
- Module lesson maps.

### Charts

Use where the curriculum calls for data displays, not as decoration.

## 8. Typography

Use the reference design system's practical hierarchy:

- Clear H1 for page/module title.
- H2 for section title.
- H3 for compact cards/panels.
- Body text should be direct and readable.
- Avoid viewport-scaled body text.
- Keep letter spacing at 0 for app text.

Student-facing language should be short, concrete, and precise.

## 9. Color

Use EdZilla-style blue as primary accent. Pair with neutral surfaces and supporting colors for correctness states.

Suggested semantic mapping:

- Primary: actions and active steps.
- Green: correct.
- Amber: hint or needs attention.
- Red: incorrect only when necessary.
- Slate/gray: labels, inactive states, scaffolding.

Do not use a one-note palette. Math visuals should use color to clarify structure, not decorate.

## 10. Interaction Patterns

### Progressive Reveal

Each lesson step should reveal:

1. Visual setup.
2. Student observation.
3. Equation/representation.
4. Check question.
5. Feedback.

### Immediate Feedback

Learner should receive feedback immediately after a check.

Feedback should include:

- Result.
- Reason.
- Visual pointer if possible.
- Next action.

### Hints

Hints should not simply give the answer. They should point to the model.

Example:

- "Count how many groups you made."
- "Now count how many are in one group."

### Reset

Every manipulative should have a reset state.

## 11. Module 1 Lesson 1 Detailed Screen Design

### Step 1: Count Equal Groups

Visual:

- Ten student/arm groups or abstract groups of 2 counters.

Interaction:

- Learner clicks through skip-counting by 2.
- Count labels appear: 2, 4, 6, ... 20.

Learning target:

- Count groups instead of individual objects.

### Step 2: Build Groups Of 2

Visual:

- 12 counters.
- Group containers.

Interaction:

- Learner makes equal groups of 2.
- App asks how many groups.

Learning target:

- 6 equal groups of 2 make 12.

### Step 3: Connect To Repeated Addition

Visual:

- Same groups remain visible.
- Repeated addition appears below.

Interaction:

- Learner fills blanks in `2 + 2 + 2 + 2 + 2 + 2 = 12`.

Learning target:

- Each addend matches one equal group.

### Step 4: Connect To Unit Form And Multiplication

Visual:

- Table with three rows:
  - repeated addition,
  - unit form,
  - multiplication.

Interaction:

- Learner selects the matching multiplication sentence.

Learning target:

- `6 x 2` means 6 groups of 2.

### Step 5: Decide If Multiplication Applies

Visual:

- Two examples:
  - equal groups,
  - unequal groups.

Interaction:

- Learner chooses whether the picture matches a multiplication sentence and explains by selecting a reason.

Learning target:

- To multiply, groups must be equal.

### Exit Check

Visual:

- Four groups of 2.
- Three groups of 3.

Interaction:

- Learner writes/selects repeated addition and multiplication sentence.

## 12. Empty, Loading, And Error States

### Objective-Backed Lesson

If a lesson has not yet received a deep lesson-page extraction:

- Show module/topic/lesson metadata.
- Show the teacher-edition overview objective.
- Show a source-backed model bridge using the module's visual model types.
- Provide an explanation check that asks the learner to connect objective, model, and lesson words.
- Do not fabricate lesson-specific examples, problem-set items, or exit-ticket details.

### Source Missing

If source extraction is missing:

- Show a source-needed message in authoring/debug mode.
- Do not show unsupported content to the learner.

### Validation Error

If a check cannot validate:

- Preserve learner input.
- Show a clear retry message.

## 13. Visual QA Checklist

Before marking a screen complete:

- Text fits on desktop and tablet widths.
- No overlapping controls.
- Visual model is legible.
- Correct/incorrect states are distinguishable without color alone.
- Keyboard interaction works for core controls.
- Lesson step state is clear.
- The source-driven objective is visible.
