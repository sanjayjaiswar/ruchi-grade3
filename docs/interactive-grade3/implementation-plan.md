# Implementation Plan: Grade 3 Interactive Math App

Date: 2026-06-18
Status: Historical baseline; current implementation plan is the Lesson 12 pilot addendum and research docs

2026-08-13 multi-subject portal addendum:

The approved next product boundary is a Grade 3 learner portal with separate Eureka Math and Reading & Language Arts subject areas.

Use the following as the controlling portal-migration documents:

```text
docs/interactive-grade3/grade3-learning-portal-architecture.md
docs/work-items/grade3-multi-subject-learning-portal.md
```

The target hierarchy is `/ruchika/grade3`, with the existing Eureka Math application mounted unchanged at `/ruchika/grade3/math` and Reading & Language Arts added later at `/ruchika/grade3/reading`. This is a route-only restructure around a sealed Math application, not a Math refactor.

The next implementation milestone is intentionally limited to:

1. capture the current `/ruchika-grade3` Math build and route baseline;
2. add only the `/ruchika/grade3` homepage;
3. mount the existing Math shell unchanged at `/ruchika/grade3/math` and make the homepage Math card open it;
4. keep `/ruchika-grade3` home and deep links compatible with their corresponding Math destinations;
5. re-run the complete Math build and old/new route regression checks.

Do not add Reading or introduce broad shared navigation in this milestone. Route definitions and new portal-only files may change, but existing Math implementation files remain untouched. Reading is the next independent milestone, followed by incremental Reading enhancement. Portal-wide organization such as richer section cards and maintained progress/resume entry points comes later, after the earlier layers are stable.

This addendum changes portal sequencing and shell planning only. It does not supersede the Eureka Math curriculum, source-fidelity, lesson, or validation requirements recorded below and in the Math task tracker.

2026-08-13 Milestone 1 implementation result:

- Added an isolated Grade 3 portal homepage at `/ruchika/grade3`.
- Added an active Eureka Math card and a non-navigating Reading & Language Arts placeholder.
- Mounted the existing sealed Math shell at `/ruchika/grade3/math` without editing Math pages, data, components, templates, renderers, styles, source mappings, or learner behavior.
- Added precise compatibility from `/ruchika-grade3` home, search, module, lesson, section, and Problem Set mode routes to corresponding new Math destinations.
- Updated local start/restart reporting so the portal homepage is primary while Math and legacy URLs remain visible.
- Pre-change and post-change production builds passed.
- Pre-change and post-change local search validation passed with 7 modules, 35 topics, 152 lessons, and 673 Blank activities.
- Authorized browser QA passed the homepage, Math-card handoff, root route, module, legacy search query, Concept, Summary, Blank, Solved, anchored problem, titles, shell visibility, and 0 console errors.
- Complete browser route parity passed: 152 preferred lesson routes plus 152 legacy lesson routes, 304 total, 0 failures.
- Added a compact 42-pixel home icon at the far-right of the Math top bar, accessible as `All subjects`, and verified it from Math routes back to the Grade 3 subject homepage without reducing lesson-navigation space unnecessarily.
- Completed screenshot-backed Chrome validation of the portal-to-Math flow, every module entry, Lesson 1 Concept/Blank/Solved/Summary, Next/Previous, search and a search result, a Problem bookmark, legacy URL redirects, and the return to all subjects with 0 console errors.
- Reading research and implementation remain out of scope until the completed homepage is reviewed.

2026-08-13 Milestone 2 Reading V1 result:

- Completed and documented primary-source research for California Grade 3 ELA/Literacy, SCCOE, Moreland, Baker, foundational literacy, F&P, i-Ready, Lexile, district benchmarks, and CAASPP.
- Kept confidential local assessment evidence local and Git-ignored; no student-specific value was copied into source, documentation, screenshots, or external tools.
- Historical prototype only: first activated `/ruchika/grade3/reading` with Home/Learn/Library/Levels routes; those surfaces are now removed or compatibility redirects.
- Added a `word -> read -> talk -> write` practice model spanning word analysis, fluency, vocabulary, literary and informational comprehension, writing/language, speaking/listening, and research.
- Historical prototype only: three invented passages were added and then removed after source-fidelity review.
- Kept F&P, i-Ready, Lexile, benchmarks, and CAASPP distinct and intentionally omitted unofficial crosswalks and fabricated passage levels.
- Activated the portal Reading card without changing Math curriculum data, Math lesson components, renderers, styles, source mappings, or learner behavior.
- Passed the production build, unchanged local-search baseline, visual Reading click-through, portal return, Math entry, legacy Math deep-link redirect, and browser console checks.

2026-08-13 Milestone 2 year-curriculum replacement result:

- Superseded the generic Home/Learn/Library/Levels Reading V1 and removed its three invented starter texts from the active experience.
- Verified Moreland’s board-adopted TK–5 ELA program as Benchmark Advance, adopted 2017–18.
- Verified the edition-matched Grade 3 sequence as 10 exact units, 30 official weeks, and 70 publisher-named selections.
- Added Year overview, Curriculum sources, Unit, and Lesson routes with compatibility redirects from the removed generic routes.
- Replaced the initial five-phase home-practice generator with 150 explicit, distinct practice records. Every activity stays inside its verified official unit/week/selection coordinates, exposes the exact published focus it uses, asks for a concrete evidence product, and includes a separate quality check. The learner uses the named school text; no invented passage or official lesson title remains.
- Corrected current Moreland assessment research: F&P Early Literacy TK–2; SRI grades 3–8 twice yearly; ELA benchmarks grades 3–8 three times yearly; CAASPP grades 3–8 annually.
- Passed production build, Reading registry validation, all 160 unit/lesson routes, five interaction states, source/portal/redirect click-through, same-viewport visual comparison, zero-overflow checks, zero browser errors, unchanged Math search baseline, portal Math entry, and a legacy Math deep link.

2026-07-03 addendum:

Before further implementation, use `problem-set-centered-lesson-design.md` as the controlling plan for the Lesson 12 pilot. The next implementation phase is not a broad redesign across all lessons. It is a Lesson 12 vertical slice that replaces the current tab-heavy lesson experience with a compact concept section, official Problem Set solved explanations, source-backed visuals/animations, and a short summary.

Top section tabs may be used for Concept, Problem Set, and Summary. They should load the selected section on demand, not return to the old generic tab rail.

Also use:

```text
docs/interactive-grade3/lesson-12-implementation-research.md
```

Any older implementation detail in this file that implies continuing the current 8-tab lesson flow is not a requirement for the new work.

2026-07-03 Module 1 replication update:

- Module 1 Lessons 1-11 and 13-21 now receive problem-set-centered runtime data from `interactive-grade3-app/src/app/data/lessons/m1/problem-set-centered.ts`.
- Module 1 Lesson 12 remains the bespoke pilot implementation in `interactive-grade3-app/src/app/data/lessons/m1/lesson12.ts`, but now also carries the same Teacher Edition page-image source references.
- This Module 1 pass uses `EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf` as the source of truth. Teacher Edition PDF pages 23-276 were rendered to local app source-page assets and attached to the Module 1 lessons.
- The shared lesson renderer now supports Module 1 array, decomposed-array, equation-workspace, and two-step solved views in addition to the original Lesson 12 quotient/tape/grouping views.
- Validation completed: `npm run build` passed. Static Browser QA clicked all 21 Module 1 lesson links, Concept / Problem Set / Summary tabs, every Problem bookmark, and Blank / Solved mode with 0 lesson failures. The audit verified no old step rail, no visible workbook wording in Module 1 problem-centered views, loaded Teacher Edition page images, and solved answer cards for all 21 lessons.
- Source correction completed: rendered Teacher Edition pages were visually inspected for Module 1 Problem Sets; PDF-derived quantity errors were corrected in Lesson 2 Problems 1-2, Lesson 3 Problems 2-4, and Lesson 4 Problems 3 and 9. Live Browser spot-checks confirmed the corrected solved text appears in the app.
- 2026-07-03 Chrome visual audit update: Chrome session `🔎 Module 1 audit` clicked all 21 Module 1 lessons, Concept / Problem Set / Summary, Blank / Solved, and every Problem bookmark. The run verified Teacher Edition source-page images, no old rail, no visible workbook wording, 114/114 Blank cards with visual scaffolds, 114/114 Solved cards with visual models, and animation markers on every lesson.
- Lesson 10 remediation completed from the Teacher Edition Problem Set: decomposed-array solved visuals now show the source-backed parts for Problems 1-3, including `5 x 3 = 15`, `2 x 3 = 6`, `4 x 3 = 12`, `4 x 3 = 12`, `2 x 3 = 6`, and `3 x 3 = 9`.
- Audit verdict: Module 1 is structurally converted and visually interactive, but it should not be called 100% fulfilled against the user's exact Teacher Edition requirement until the typed problem prompts and solved-work explanations are rechecked problem-by-problem against the Teacher Edition and replaced where they are paraphrased. Example open gap: Lesson 10 Problem 3 is shortened in the portal compared with the Teacher Edition Ruby photo-album wording. Some image-heavy items still use typed source-backed solved reconstructions and shared visual/animation scaffolds rather than per-problem cropped Teacher Edition solved-work thumbnails or exact source-cropped visuals.

2026-07-03 Module 2 replication and remediation update:

- Module 2 Lessons 1-21 now receive problem-set-centered runtime data from `interactive-grade3-app/src/app/data/lessons/m2/problem-set-centered.ts`.
- The Module 2 pass is scoped to `EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf` as the source of truth for Problem Set prompts, quantities, fixed answers, and source visuals.
- After the failed source-fidelity review, Module 2 was remediated with Teacher Edition prompt overrides for all 93 Problem Set cards, Teacher Edition Answer Key solved text for all 93 cards, local Teacher Edition Problem Set page images in Blank/source references, and local Teacher Edition Answer Key page images in Solved/source references.
- The app renders local official Teacher Edition Problem Set and Answer Key page images for every Module 2 lesson as source references while keeping the primary surface interactive: Concept / Problem Set / Summary, Blank / Solved mode, and local Problem links.
- The shared renderer now supports Module 2-specific clock workspaces, labeled elapsed-time/rounding number lines, measurement tables, tape diagrams, grouping/unit visuals, and concrete animations on rendered number-line, clock, and two-step elements.
- Validation completed: `npm run build` passed; Chrome session `Module 2 portal audit` clicked all 21 Module 2 lessons from visible Topic lesson cards, opened Concept, Problem Set Blank, Problem Set Solved, Summary, and every Problem bookmark. The first audit verified 93 expected Problem Set cards, loaded 43 Teacher Edition Problem Set page images with 0 broken images, concrete animations, and 0 console errors.
- Follow-up Teacher Edition audit passed structurally across all 21 lessons: 93/93 rendered problem prompts, 0 generic prompt buckets, 93/93 Teacher Edition Answer Key explanation blocks, 93/93 validation blocks, answer-key page images present in Solved mode, and 0 broken answer-key images.
- Remaining gap: this should not be called fully source-faithful visual completion yet. Visual-only source items such as exact clock faces, scales, containers, and variable measurement activities are source-referenced and supported by shared interactive/animated models, but they still need per-problem Teacher Edition-cropped solved work or bespoke manipulatives before the module can be claimed as exact to the Teacher Edition visually.

2026-07-03 Module 3 replication update:

- Module 3 Lessons 1-21 now receive problem-set-centered runtime data from `interactive-grade3-app/src/app/data/lessons/m3/problem-set-centered.ts`.
- The Module 3 pass treats the Teacher Edition as the controlling source. Runtime data uses Teacher Edition lesson references from `student-work-source.generated.ts`, official Problem Set prompt/layout text as the rendered student work surface, and Teacher Edition Answer Key results from printed pages 279-316.
- The coverage spans all 93 extracted Module 3 Problem Set items across multiplication and division with 0, 1, 6-9, and multiples of 10.
- The Problem Set tab now keeps official Student Workbook pages as a collapsed source reference, not the primary experience. Blank/Solved cards remain interactive and visible.
- Validation completed: `npm run build` passed; Chrome session `G3-M3` clicked all 21 lessons through Concept, Problem Set Blank, every Problem bookmark, Problem Set Solved, and Summary. The final pass clicked 93 Problem links total and verified 93 solved cards, 0 unsupported solved cards, 93 source/model visual markers, 71 animated equation-flow markers, and 0 failures. Lesson 4 was rerun in isolation after a transient click-state read and passed.
- Prompt cleanup completed: exact generated lesson-objective tails were removed only by lesson/problem key, so official problem prompt wording is preserved while artifacts such as `to decompose.`, `the unknown.`, `multiplication table.`, and similar Teacher Edition objective fragments no longer appear as problem text.
- Source sanity check completed for Lesson 1 against `g3_m3_teacher_edition_v1_3_0.pdf` PDF pages 14-25 and `g3_m3_student_wkbook_v1_3_0.pdf` Problem Set pages: objective, commutativity focus, multiplication chart/apple table prompt, and array multiplication-sentence prompt matched the official sources.
- Current visual coverage: every solved card now has source-derived model support or animated equation-flow support; clear array, equal-group, sharing, grouping, and two-step story problems also have item-specific metadata.
- Remaining enhancement gap: table/riddle/pattern and image-heavy/open items can still be improved with exact cropped Teacher Edition answer-key visuals or more bespoke manipulatives, but they are no longer PDF-only/source-only placeholders.

2026-07-03 Module 4 replication update:

- Module 4 Lessons 1-16 now receive problem-set-centered runtime data from `interactive-grade3-app/src/app/data/lessons/m4/problem-set-centered.ts`.
- The Module 4 pass is scoped to the official Module 4 Teacher Edition and Student Workbook sources for Multiplication and Area.
- The renderer wiring now includes Module 4 in the problem-set-centered registry overlay and keeps the Lesson 12 control hierarchy: Concept / Problem Set / Summary, Blank / Solved mode, and local Problem links.
- Module 4 now uses authored interactive visuals where source data is explicit: pattern-block cover cards for Lesson 1, multi-rectangle area models for source factor pairs, array templates/solved arrays for equation-backed items, and a floor-plan area card for Lesson 15 Problem 2. It does not embed Module 4 PDF pages as the primary experience.
- Validation update: `npm run build` passed on 2026-07-03. Chrome session `🔎 G3-M4 audit` opened all 16 Module 4 lessons from the visible topic cards and clicked Concept, Problem Set, Blank, Solved, Summary, and every Problem bookmark; the bookmarks scroll to the target problem cards.
- Audit result: Module 4 is not complete against the source-fidelity requirement. The Chrome pass found Blank mode visibly leaking answer-key values in multiple lessons, exact Teacher Edition answer snippets missing or normalized away in solved views for Lessons 2-15, no active animation on M4-specific visual families, and no M4-specific visual container in Lessons 4, 13, and 16.
- Remaining gaps: several image-heavy/open items still use conservative source-backed open workspaces or equation models rather than exact Teacher Edition-authored diagrams. Lesson 13 composite figures, Lesson 14 composite figures, Lesson 15 variable-answer floor-plan discussion items, and Lesson 16's room-design table need source-faithful visuals/editable manipulatives before Module 4 can be called fulfilled.

2026-07-03 Module 5 replication update:

- Module 5 Lessons 1-30 now receive problem-set-centered runtime data from `interactive-grade3-app/src/app/data/lessons/m5/problem-set-centered.ts`.
- The Module 5 pass now uses a Module 5-only workbook problem map generated from official Student Workbook layout text, because the earlier generated source flattened several lessons into oversized prompt chunks.
- The shared lesson renderer now includes Module 5 multi-fraction-strip and multi-number-line blank/solved visual model families.
- Validation completed: `npm run build` passed, and a Module 5-only coverage check confirmed all 30 Module 5 lessons have generated PDF-derived work source and registry wiring is scoped to Module 1 plus Module 5.
- Browser visual QA completed in session `G3-M5`: all 30 lessons expose the Concept / Problem Set / Summary controls and Blank / Solved mode, but the pass failed source fidelity because solved views use generic `Completed Problem` text and shared scaffolds instead of Teacher Edition solved work or cropped source visuals.
- Remediation completed after the failed pass: removed the PDF-page-only primary experience, removed the old `Completed Problem` solved text from Module 5, and added source-derived interactive model rows. Targeted Browser checks passed for Lesson 10 and Lesson 14.
- Lesson 30 now has a Teacher Edition-authored paper-partition implementation based on printed pages 353-354: lined paper, 5 paper spaces per third, extended guide lines, angled red strip, 1/3 and 2/3 transfer marks, no-sheet Problem Set wording, and the cooperative-group challenge units. `npm run build` passed and Browser session `G3-M5` clicked Concept, Problem Set Blank, Problem Set Solved, and Summary.
- Full Chrome audit completed in tab group `G3-M5 Audit`: all 30 lessons and every Problem bookmark were clicked in Blank and Solved, and 30 solved screenshots were saved. Click-through passed, but Teacher Edition source fidelity failed for Lessons 1-29. Lesson 30 passed in that audit.
- Lesson 1 has since been re-authored from the Teacher Edition printed pages 12-18: the five Problem Set cards now render the official beaker, string-cheese, rectangle partition, paper-sheet, and 12-inch wood-strip structures as authored interactive visuals. `npm run build` passed, and Chrome validation on a fresh `localhost:4305` build clicked Concept, Problem Set, Blank, Solved, Summary, and all five Problem bookmarks.
- Remaining gap: Lessons 2-29 still need the same Teacher Edition-authored source pass where generic fraction-strip/number-line rows remain, especially number bonds, equivalent-shape figures, paper-folding construction items, and later number-line items that need exact TE-derived solved work.

2026-07-03 Module 6 replication update:

- Module 6 Lessons 1-9 now receive problem-set-centered runtime data from a Module 6 registry overlay backed by Teacher Edition Problem Set wording, Teacher Edition answer-key values, and cleaned prompt overrides where PDF text extraction flattened quarter-inch fractions.
- The Module 6 pass uses authored interactive display renderers and concept animation panels for tally/picture graphs, vertical tape diagrams, scaled bar graphs, ruler/measurement work, data tables, and line plots. PDF pages remain source material, not the primary UI.
- Follow-up Teacher Edition visual audit invalidated the earlier passing claim: Lesson 6 Problem 1 used `53` instead of `53 1/2`, Lesson 7 used wrong thresholds and absent-student wording, and Lessons 7-9 showed sorted/generated source chips instead of the Teacher Edition measurement tables. Lesson 9 also had the wrong grass counts for `2` and `3 3/4`.
- Remediation corrected those items: Lessons 7-9 now render the Teacher Edition source tables in original row order, Lesson 7 uses `2 1/4`, `2 3/4`, and `2 2/4`, and Lesson 9 solved line plot counts are `2:1`, `2 1/4:3`, `2 1/2:2`, `2 3/4:6`, `3:4`, `3 1/4:5`, `3 1/2:0`, `3 3/4:3`.
- Validation completed: `npm run build` passed. Chrome session `G3-M6` clicked Lessons 1-9, Concept / Problem Set / Summary, Blank / Solved, and every Problem bookmark with 0 failures and 0 console errors. Targeted visual checks confirmed the Lesson 7 and 8 source tables and Lesson 9 Problem 3 solved line plot.
- Remaining gap: future student-editable graph construction could be richer, but it must preserve the Teacher Edition Problem Set data, labels, scales, and answer-key values.

2026-07-03 Module 7 replication and verification update:

- Module 7 Lessons 1-34 now receive problem-set-centered runtime data from a Module 7 registry overlay backed by `student-work-source.generated.ts`.
- Initial Browser QA found all 34 Module 7 lessons still on the old 8-step rail with no Problem Set cards; the Module 7 overlay corrected that structure.
- Post-fix Browser QA clicked all 34 lessons through Concept, Problem Set, Blank, Solved, and Summary; the required controls, Problem Set cards, Blank/Solved mode behavior, and Summary panels passed.
- Browser-extracted Problem Set prompts exactly matched the generated Student Workbook source for all 34 lessons.
- Remediation completed after the failed source-visual pass: rendered official Module 7 Teacher Edition Problem Set and Answer Key pages to local app assets, kept them as collapsed Teacher source references, and removed Teacher Edition page images from the primary Problem Set cards.
- The solved card surface now uses Teacher Edition Answer Key text extracted into per-problem step walkthrough rows with staggered animation. Blank cards use the official prompt and a visual workspace without embedding PDF pages.
- Validation completed: `npm run build` passed after the Teacher Edition answer-key wiring. Static checks found no remaining primary Module 7 workbook/generic placeholder strings in the lesson runtime path, and 122 Teacher Edition page images remain under `interactive-grade3-app/public/source-pages/m7-teacher/` for verification references.
- Chrome + Computer audit in tab group `🔎 G3-M7` reran all 34 Module 7 lessons through Problem Set Blank/Solved and every Problem bookmark. The audit passed with matching card/bookmark counts, 0 Teacher Edition PDF source-page images inside problem cards, solved walkthrough cards present, no source-page-only solved cards, and source references still available through the Teacher source panel.
- Remaining gap: the current Module 7 remediation fixes the PDF-page takeover and uses Teacher Edition answer-key text as the solved-work basis. Deep authoring is still needed for fully bespoke, lesson-specific diagrams and manipulatives for every geometry/measurement item that contains shapes, rulers, grids, data displays, or constructed figures.

## 1. Implementation Objective

Create a new Angular app inside the Grade3 workspace that uses structured lesson data extracted from the Eureka Math Grade 3 teacher editions and renders visual, interactive lesson experiences. The implementation should reuse architecture and design patterns from the EdZilla reference projects without modifying them.

For the Lesson 12 pilot, the implementation objective is narrower:

- prove the problem-set-centered lesson experience on one lesson,
- use the Teacher Edition and Student Workbook as matched sources,
- visually inspect solved/annotated Teacher Edition Problem Set references,
- make the official Problem Set the main lesson surface,
- avoid extending the current 8-tab generated flow.

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

- This folder is currently a git worktree on branch `main`.
- Do not create branches, additional worktrees, stage files, commit, or push unless explicitly requested.

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

For problem-set-centered lessons, the data architecture must support one concept section plus a list of official Problem Set items. Each item needs source reference, solved answer, explanation, model/animation notes, and validation meaning. This is different from treating a lesson as a flat list of generic steps.

Style architecture for the Lesson 12 pilot:

- Keep common lesson shell CSS in the shared lesson stylesheet.
- Keep reusable problem-set-centered concept/problem/summary styling in a shared Problem Set lesson stylesheet.
- Use module or lesson-specific CSS only when there is real customization beyond the shared pattern.
- Lesson-specific CSS is optional; it should not become the default container for common layout.

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
