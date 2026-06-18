# Implementation Plan: Grade 3 Interactive Math App

Date: 2026-06-18
Status: Draft baseline

## 1. Implementation Objective

Create a new Angular app inside the Grade3 workspace that uses structured lesson data extracted from the Eureka Math Grade 3 teacher editions and renders visual, interactive lesson experiences. The implementation should reuse architecture and design patterns from the EdZilla reference projects without modifying them.

## 2. Current Workspace Reality

Current workspace:

```text
/Volumes/Data2/Tutorials/Eureka Math Grade 2 - Syllabus Videos Curriculum/Grade3
```

Current contents:

- `EurekaMath-Sources/`: PDFs for teacher editions, student workbooks, additional materials, release notes, and materials list.
- `tmp/req.txt`: transcript with product/tone guidance.
- `docs/interactive-grade3/`: planning docs.
- `interactive-grade3-app/`: Angular implementation app.

Important note:

- This folder is not currently a git repository.
- No actual git worktree should be created unless explicitly requested.

## 3. Reference Architecture

Read-only reference:

```text
/Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
```

Reusable patterns:

- Angular 21.
- Standalone components.
- App routes defined centrally.
- Shared components under `src/app/shared/`.
- Page components under `src/app/pages/`.
- Content/data under `src/app/data/`.
- Chart.js wrapper components.
- Mermaid rendering via `data-mermaid`.
- Markdown rendering where appropriate.
- Build via `npm run build`.
- Local serve via `npm start`.

Recommended new app structure:

```text
interactive-grade3-app/
  angular.json
  package.json
  tsconfig.json
  src/
    index.html
    main.ts
    styles.css
    app/
      app.config.ts
      app.routes.ts
      app.ts
      data/
        curriculum/
        modules/
        lessons/
      pages/
        home/
        module-overview/
        lesson/
      shared/
        visual-models/
        lesson-shell/
        progress/
        answer-checker/
        chart-card/
        mermaid-diagram/
```

Alternative:

- If the user later wants a repo root Angular app directly under Grade3, place Angular files at the workspace root.
- For now, prefer a contained app folder to avoid mixing generated Angular files with PDFs and docs.

## 4. Data Architecture

### 4.1 Curriculum Metadata

Create structured metadata for:

- modules,
- topics,
- lessons,
- source references,
- visual model types,
- standards tags if needed.

Example:

```ts
export type ModuleMeta = {
  id: 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7';
  number: number;
  title: string;
  sourcePdf: string;
  summary: string;
  topics: TopicMeta[];
};

export type TopicMeta = {
  id: string;
  label: string;
  title: string;
  lessonIds: string[];
};
```

### 4.2 Lesson Content Schema

Use structured lesson records:

```ts
export type LessonContent = {
  id: string;
  moduleId: string;
  topicId: string;
  lessonNumber: number;
  title: string;
  objective: string;
  studentGoal: string;
  sourceRefs: SourceReference[];
  vocabulary: string[];
  visualModels: VisualModelType[];
  steps: LessonStep[];
  guidedExamples: GuidedExample[];
  practice: PracticeItem[];
  exitTicket: PracticeItem[];
  summary: LessonSummary;
};
```

### 4.3 Source References

Every authored lesson should record source references:

```ts
export type SourceReference = {
  sourceType: 'teacher-edition' | 'student-workbook' | 'additional-materials';
  path: string;
  pageStart?: number;
  pageEnd?: number;
  note: string;
};
```

### 4.4 Practice Item Schema

Practice items should be structured enough for validation:

```ts
export type PracticeItem =
  | EqualGroupsPractice
  | MultipleChoicePractice
  | FillBlankPractice
  | EquationMatchPractice
  | DrawModelPractice;
```

For early implementation, drawing can be represented by a constructed model rather than freehand drawing.

## 5. Component Architecture

### 5.1 App Shell

Responsibilities:

- Top navigation.
- Route outlet.
- Global styles.
- Optional theme state.

### 5.2 Module Overview Page

Responsibilities:

- Load module metadata.
- Render topic cards.
- Render lesson sequence.
- Link to lesson routes.
- Show visual model badges.

### 5.3 Lesson Page

Responsibilities:

- Resolve module and lesson route params.
- Load lesson content.
- Manage step state.
- Render lesson shell and active step.
- Persist local progress if implemented.

### 5.4 Lesson Shell Component

Inputs:

- lesson metadata,
- step list,
- active step,
- progress state.

Outputs:

- step selected,
- next step,
- previous step,
- reset lesson.

### 5.5 Visual Model Components

Initial components:

- `EqualGroupsModelComponent`
- `RepeatedAdditionBridgeComponent`
- `RepresentationTableComponent`
- `AnswerCheckerComponent`

Later components:

- `ArrayModelComponent`
- `TapeDiagramComponent`
- `NumberLineComponent`
- `FractionStripComponent`
- `AreaTileGridComponent`
- `ScaledGraphComponent`
- `LinePlotComponent`
- `GeometryCanvasComponent`

## 6. Curriculum Extraction Plan

### Phase A: Manual Structured Extraction For Vertical Slice

Start manually with Module 1 Lesson 1:

- Read teacher-edition Lesson 1 pages.
- Record objective.
- Record concept flow.
- Record source page references.
- Create student-safe paraphrased explanations.
- Create structured practice items aligned to problem set and exit ticket.

Do not copy large blocks of teacher-edition text into app data. Use concise lesson-aligned paraphrase and structured interactions.

### Phase B: Module Metadata Extraction

Create metadata for all modules and topics:

- module titles,
- topic titles,
- lesson numbers,
- lesson objectives,
- source PDF paths.

Keep exact copied text minimal and only where necessary for objective labels.

### Phase C: Lesson Expansion

Author lessons incrementally:

1. Module 1 Lesson 1.
2. Module 1 Lesson 2.
3. Module 1 Lesson 3.
4. Module 1 Topic B lessons.
5. Continue topic by topic.

Do not mass-generate all lessons without review. Quality and source alignment matter more than speed.

## 7. Implementation Phases

### Phase 0: Planning And Setup

Deliverables:

- Requirements doc.
- Design spec.
- Implementation plan.
- Component reuse map.
- Curriculum source spec.
- Task tracker.
- Worktree/operations doc.

Status:

- Done.

### Phase 1: Angular App Skeleton

Deliverables:

- New Angular app inside Grade3 workspace.
- App shell.
- Routes.
- Global styles adapted from reference.
- Module picker page.
- Module overview page.
- Lesson page shell.

Validation:

- `npm install`.
- `npm run build`.
- `npm start` local route loads.

### Phase 2: Data Layer

Deliverables:

- TypeScript data schemas.
- Module metadata.
- Topic metadata.
- Lesson metadata for Module 1.
- Lesson content for Module 1 Lesson 1.

Validation:

- TypeScript build.
- Lesson route renders data from structured content.

### Phase 3: Visual Components Vertical Slice

Deliverables:

- Equal groups builder.
- Repeated addition bridge.
- Representation comparison table.
- Check answer component.
- Feedback component.

Validation:

- Learner can complete Module 1 Lesson 1.
- Incorrect group equality and factor-order misconceptions are handled.

### Phase 4: Module 1 Expansion

Deliverables:

- Array model component for Lesson 2.
- Factor meaning interactions for Lesson 3.
- Division unknown factor visual components for Topic B.
- Skip-counting/array fluency components for Topic C.

Validation:

- Build passes.
- Each lesson has at least one interactive visual check.
- Source references recorded.

### Phase 5: Cross-Module Visual Toolkit

Deliverables:

- Number line.
- Tape diagram.
- Fraction strip.
- Area tile grid.
- Graph/line plot.
- Shape/perimeter visual.

Validation:

- Components can be reused across modules.
- Visual QA checklist passes.

### Phase 6: Progress And Review

Deliverables:

- Local progress state.
- Lesson completion state.
- Review mode.
- Reset progress.

Validation:

- Progress persists locally.
- Reset works.

### Phase 7: Polish And Packaging

Deliverables:

- Responsive polish.
- Accessibility pass.
- Content QA.
- Optional print/PDF route.

Validation:

- Build passes.
- Visual QA on desktop and tablet widths.
- Task tracker updated.

## 8. Validation Plan

### Required Local Validation

Run from the app directory once created:

```bash
npm run build
```

Optional local serve:

```bash
npm start
```

### Visual Validation

Use local app route inspection when authorized. Browser/screenshot tooling requires explicit authorization for the target local app/window.

Minimum manual checks:

- Home route loads.
- Module 1 route loads.
- Lesson 1 route loads.
- Step navigation works.
- Equal groups interaction works.
- Answer checks show correct feedback.
- Responsive layout does not overlap.

### Content Validation

For each lesson:

- Confirm objective matches teacher edition.
- Confirm concept steps are supported by teacher edition.
- Confirm examples do not introduce unsupported concepts.
- Confirm source references exist.
- Confirm feedback uses the lesson concept language.

## 9. Engineering Constraints

- Do not modify reference projects.
- Do not use destructive commands.
- Do not create git commits unless explicitly requested.
- Do not create a real git worktree unless explicitly requested.
- Keep generated app files inside the Grade3 workspace.
- Do not store secrets or external credentials.
- Avoid large generated artifacts in docs.

## 10. Risks

### Risk: Copyright Over-Copying

Mitigation:

- Use teacher editions for source alignment.
- Store concise paraphrases and structured interactions.
- Avoid copying long teacher-edition passages into app data.

### Risk: Lesson Quality Drift

Mitigation:

- Keep source references in every lesson record.
- Build lesson by lesson.
- Validate each lesson against teacher edition before marking complete.

### Risk: Component Overbuilding

Mitigation:

- Start with the Module 1 Lesson 1 vertical slice.
- Build only the visual components needed for current lesson coverage.
- Generalize only after a second lesson needs the same behavior.

### Risk: Reference Project Contamination

Mitigation:

- Treat EdZilla paths as read-only.
- Copy patterns, not files, unless the user explicitly approves copying specific code.

## 11. Initial Build Result

The app was created at:

```text
interactive-grade3-app/
```

Build validation:

```bash
cd interactive-grade3-app
npm run build
```

Result:

```text
Application bundle generation complete.
```
