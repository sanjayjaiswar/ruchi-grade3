# Component Reuse Map

Date: 2026-06-18
Status: Draft baseline

## 1. Purpose

This document maps existing reference-project patterns to the Grade 3 interactive math app. The goal is to avoid reinventing UI and interaction patterns that already exist in the EdZilla projects.

Reference projects are read-only.

## 2. Reference Paths

```text
/Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
/Volumes/Data/EdZillaPrj/EdZilla/scratch-prjs/design-spec/
```

## 3. Reuse Policy

### Allowed

- Inspect and learn from reference files.
- Reuse architecture patterns.
- Reuse styling concepts and token names where appropriate.
- Recreate generic components in the new Grade3 app.
- Copy small generic implementation patterns only if needed and only into the Grade3 workspace.

### Not Allowed

- Modify reference projects.
- Store task docs in reference projects.
- Run broad write commands in reference projects.
- Move reference files into Grade3 without explicit need.

## 4. Angular Project Pattern

Reference:

```text
edzilla-gtm/package.json
edzilla-gtm/angular.json
edzilla-gtm/src/app/app.routes.ts
edzilla-gtm/src/app/pages/**
edzilla-gtm/src/app/shared/**
edzilla-gtm/src/app/data/**
```

Reuse:

- Standalone Angular components.
- Central routes.
- Page component folders.
- Shared component folders.
- Content as TypeScript data.
- Build/serve scripts.

Grade3 application mapping:

```text
src/app/pages/module-overview/
src/app/pages/lesson/
src/app/shared/lesson-shell/
src/app/shared/visual-models/
src/app/data/modules/
src/app/data/lessons/
```

## 5. Chart Card Pattern

Reference:

```text
edzilla-gtm/src/app/shared/chart-card/chart-card.ts
edzilla-gtm/src/app/shared/chart-card/chart-card.html
edzilla-gtm/src/app/shared/chart-card/chart-card.css
edzilla-gtm/src/app/shared/chart-utils.ts
```

Reuse for:

- Module 6 scaled graphs.
- Module 6 bar graphs.
- Module 7 line plot summaries where Chart.js fits.
- Parent/teacher progress charts later.

Do not use charts where the curriculum expects the learner to construct the graph manually. In those cases, use custom interactive graph components.

## 6. Mermaid Pattern

Reference:

```text
edzilla-gtm/docs/mermaid.md
edzilla-gtm/src/app/app.ts
edzilla-gtm/src/app/shared/markdown-viewer/markdown-viewer.ts
```

Reuse:

- Store diagram source in data files.
- Bind source with `data-mermaid`.
- Reset `data-processed` before re-render.
- Keep labels simple.

Grade3 use cases:

- Module concept maps.
- Topic dependency diagrams.
- Multiplication/division relationship maps.
- Fraction equivalence maps.

Do not use Mermaid for interactive manipulatives like counters, arrays, or fraction strips.

## 7. Design-System Components

Reference:

```text
scratch-prjs/design-spec/index.html
```

Reusable patterns:

- Page shell.
- Section panel.
- Text basics.
- Card grid.
- KPI cards.
- Standard tabs.
- Buttons.
- Chip buttons.
- Tables.
- Mini chart panels.
- Helper cards.
- Option cards.
- State cards.

Grade3 mapping:

| Reference Pattern | Grade3 Use |
| --- | --- |
| Page shell | App pages and lesson pages |
| Section panel | Module overview sections |
| Card grid | Module and topic cards |
| KPI card | Lesson stats, progress, concept counts |
| Tabs | Learn / Practice / Review |
| Chip button | Answer choices, visual model toggles |
| State card | Correct, hint, needs revision |
| Table | Representation bridges |
| Mini chart | Small data visual previews |
| Helper card | Teacher note, hint, source-aligned note |

## 8. Shared Grade3 Components To Build

### 8.1 Lesson Shell

Purpose:

- Common layout for all lesson pages.

Inputs:

- lesson title,
- objective,
- steps,
- active step,
- progress.

Outputs:

- step change,
- next,
- previous,
- reset.

### 8.2 Step Panel

Purpose:

- Render a concept step with visual, explanation, action, and feedback.

### 8.3 Feedback Card

Purpose:

- Consistent feedback for checks.

States:

- neutral,
- correct,
- needs revision,
- hint,
- complete.

### 8.4 Equal Groups Model

Purpose:

- Teach equal groups, repeated addition, and multiplication.

Initial features:

- Render groups and counters.
- Show number of groups.
- Show group size.
- Detect equal/unequal groups.
- Emit derived equations.

### 8.5 Representation Bridge

Purpose:

- Connect visual, words, repeated addition, unit form, multiplication/division equation.

### 8.6 Answer Checker

Purpose:

- Validate structured learner input.

Initial answer types:

- number,
- multiple choice,
- fill blank,
- equation match,
- group model state.

## 9. Components To Avoid Building Initially

Avoid until needed by a lesson:

- Full freehand drawing canvas.
- Full algebra engine.
- Full PDF renderer.
- Account login.
- Cloud sync.
- Complex analytics dashboard.

## 10. Dependency Reuse

Likely dependencies:

- Angular.
- Chart.js.
- Mermaid.

Avoid adding:

- Heavy UI frameworks if CSS/components can be built from reference patterns.
- External tutoring/AI packages.
- Remote content systems.

## 11. Quality Bar

A reused component pattern is acceptable only if:

- It serves the math concept.
- It is responsive.
- It is accessible.
- It can be reused in multiple lessons or clearly supports the current lesson.
- It does not make the app feel like a business dashboard at the expense of learning clarity.

