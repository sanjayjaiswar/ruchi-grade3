# Task Tracker: Grade 3 Interactive Math App

Date: 2026-06-18
Status: Active planning

## 1. Status Legend

- `Not started`: No work has begun.
- `In progress`: Work has begun and is not complete.
- `Blocked`: Cannot continue without user decision or missing dependency.
- `Done`: Completed and validated.
- `Deferred`: Intentionally postponed.

## 2. Current Decisions

| Decision | Status | Notes |
| --- | --- | --- |
| Implementation workspace | Done | All work happens in Grade3 workspace only. |
| Reference projects | Done | EdZilla projects are read-only references only. |
| Curriculum source | Done | Teacher editions are source of truth. |
| Prior chat role | Done | Tone/workflow guidance only. |
| Actual git worktree | Active | Grade3 is a git worktree on `main`; do not stage, commit, branch, push, or create additional worktrees without explicit approval. |
| First vertical slice | Done | Module 1 overview + Module 1 Lesson 1 implemented in `interactive-grade3-app/`. |
| App folder | Done | Angular app created at `interactive-grade3-app/`. |
| Separate module pages | Done | Routes `/modules/m1` through `/modules/m7` render module-specific topic/lesson maps. |
| Context route prefix | Done | App canonical URL is `/ruchika-grade3/...`; old `/modules/...` routes redirect into the context. |
| Page titles | Done | Home, module, and lesson pages set specific browser titles instead of generic route titles. |
| All lesson routes | Done | All 152 Grade 3 lesson routes render source-backed objective flows. |
| Curriculum drawer navigation | Done | Left drawer expands/collapses globally and module-by-module. |
| Local restart script | Done | `scripts/grade3_app_start.sh` restarts the Angular app with context/log/PID tracking. |
| Student-facing visual theme | Done | Warm neutral base, module accent colors, short lesson labels, and quieter source details. |
| Lesson granularity | Done | Module 1 Lesson 1 split into 12 small learner-facing screens. |
| Top-level README | Done | Root `README.md` explains workspace, app, docs, source rules, and commands. |
| Full-width layout pass | Done | Page frame widened, headings reduced, home page curriculum flow added. |
| Lesson authoring playbook | Done | Rules added to prevent objective-only routes from being treated as authored lessons. |
| Module 1 Lesson 4 calibration | Done | Lesson 4 authored from teacher-edition pages 63-74 and build validation passed. |
| Module 1 Topic B calibration | Done | Lessons 4-6 authored from teacher-edition pages and build validation passed. |
| Module 1 full pass | Done | Lessons 1-21 now have source-backed records; build and all-route validation passed. |
| All modules compact source pass | Done | Generated lessons across Modules 2-7 now use lesson-specific teacher-edition page ranges and the compact teacher flow. |
| Generated lesson quality correction | Done | Generic source flow replaced with model-specific teacher moves, board setup, questions, misconceptions, and exit evidence. |
| Generated lesson visual correction | Done | Source-backed lessons now render model-specific figures for equal groups, arrays, tape diagrams, number lines, clocks, measurement, area, fractions, graphs, and geometry. |
| Lesson 4 benchmark flow | Done | Compact/generated source-backed lessons now follow a 7-step Lesson 4-style flow: Goal, Model, Meaning, Picture, Draw, Exit, Summary. |
| Lesson 12 redesign direction | In progress | Supersede the 8-tab benchmark flow for the Lesson 12 pilot with a problem-set-centered lesson experience documented in `problem-set-centered-lesson-design.md`. |
| Current controlling requirements | In progress | Use `problem-set-centered-lesson-design.md` and `lesson-12-implementation-research.md` as the active requirements. Older tab/step docs are historical unless aligned with these docs. |
| Problem-set-centered section tabs | Done | Top tabs load real sections on demand: Concept, Problem Set, and Summary. They must not recreate the old Goal/Model/Meaning/Picture/Draw/Solve/Exit/Sum flow or use broken hash-route links. |
| Problem Set blank/solved mode | Done | Lesson 12 pilot uses one Problem Set tab with internal `Blank | Solved` mode. Blank is source-visual student work with official blanks/templates; Solved is the review/teaching view. |
| Problem Set control hierarchy | Done | Lesson 12 establishes the global authored-lesson standard: section tabs are primary controls, `Blank/Solved` is a distinct mode switch, and Problem 1-N bookmarks are blue underlined local text links, not blue pill buttons. |
| CSS architecture for lesson work | Done | Common lesson CSS stays common; reusable problem-set-centered layout belongs in a shared stylesheet; module/lesson-specific CSS exists only for true customization. |
| Module 1 problem-set-centered replication | Done with gaps | Lessons 1-11 and 13-21 now receive Module 1-only problem-set-centered runtime data; Lesson 12 keeps its bespoke pilot data. Remaining gaps: browser/screenshot QA was not run, and some image-heavy workbook items use typed source-backed reconstructions rather than cropped Teacher Edition thumbnails. |

## 3. Phase Tracker

### Phase 0: Planning Docs

| Task | Status | Owner | Validation |
| --- | --- | --- | --- |
| Create docs folder | Done | Codex | `docs/interactive-grade3/` exists. |
| Draft requirements | Done | Codex | `requirements.md` created. |
| Draft design spec | Done | Codex | `design-spec.md` created. |
| Draft implementation plan | Done | Codex | `implementation-plan.md` created. |
| Draft component reuse map | Done | Codex | `component-reuse-map.md` created. |
| Draft curriculum source spec | Done | Codex | `curriculum-source-spec.md` created. |
| Draft worktree/operations doc | Done | Codex | `worktree-and-operations.md` created. |
| User review of planning docs | Not started | User | Await review. |

### Phase 1: App Skeleton

| Task | Status | Owner | Validation |
| --- | --- | --- | --- |
| Confirm app folder name | Done | User/Codex | Created as `interactive-grade3-app/`. |
| Create Angular app | Done | Codex | Angular app scaffolded with `--skip-git`. |
| Add shell routes | Done | Codex | Home/module/lesson routes compile. |
| Add global styles from reference patterns | Done | Codex | EdZilla-style tokens/layouts added locally. |
| Add module picker page | Done | Codex | Route compiles. |
| Add module overview page | Done | Codex | Route compiles and renders Module 1 data. |
| Add all module pages | Done | Codex | `/modules/m1` through `/modules/m7` return 200 and show module-specific maps. |
| Add lesson page shell | Done | Codex | Route compiles and renders Lesson 1. |

### Phase 2: Data Layer

| Task | Status | Owner | Validation |
| --- | --- | --- | --- |
| Define curriculum data types | Done | Codex | TypeScript build passed. |
| Add module metadata | Done | Codex | Module pages render from data. |
| Add topic metadata for Modules 1-7 | Done | Codex | Lesson lists render from data for every module. |
| Add Lesson 1 structured content | Done | Codex | Lesson route renders source-aligned steps. |
| Add Lesson 4 structured content | Done | Codex | Source-backed lesson content and interactions added; `npm run build` passed. |
| Add Lesson 5 structured content | Done | Codex | Source-backed lesson content and interactions added; `npm run build` passed. |
| Add Lesson 6 structured content | Done | Codex | Source-backed lesson content and interactions added; `npm run build` passed. |
| Add Module 1 compact source-authored lessons | Done | Codex | Lessons 2-3 and 7-21 added with exact PDF page ranges, lesson-specific guidance, and compact source renderer. |
| Add compact source-backed lessons for Modules 2-7 | Done | Codex | Generated lessons now attach exact teacher-edition PDF page ranges and render Goal, Model, Example, Check, Summary source panels. |
| Replace weak generated teacher text | Done | Codex | Generated lessons now use model-specific teaching guidance instead of vague objective/model prompts. |
| Add generated lesson figures | Done | Codex | Source panels render compact model-family visuals instead of blank cue cards. |
| Apply Lesson 4 benchmark shape globally | Done | Codex | Generated and compact source-backed lessons now use visual model, lesson question/info, explanation, meaning, picture, draw/label, exit evidence, and summary screens. |
| Add source reference fields | Done | Codex | Lesson data includes teacher-edition source reference. |
| Add all lesson objectives | Done | Codex | 152 teacher-edition overview objectives entered. |
| Generate all lesson routes | Done | Codex | 152 lesson URLs return HTTP 200. |

### Phase 3: Module 1 Lesson 1 Vertical Slice

| Task | Status | Owner | Validation |
| --- | --- | --- | --- |
| Equal groups visual component | Done | Codex | Renders equal and unequal groups with counters. |
| Repeated addition bridge | Done | Codex | Model displays repeated addition and validates learner entry. |
| Unit form/multiplication bridge | Done | Codex | Shows words/addition/unit form/multiplication. |
| Answer checker | Done | Codex | Validates number, fill-in, select, and exit checks. |
| Unequal groups misconception check | Done | Codex | Feedback explains why not multiplication. |
| Exit check | Done | Codex | Learner completes 4 groups of 2 exit check. |

### Phase 4: Validation And Polish

| Task | Status | Owner | Validation |
| --- | --- | --- | --- |
| Build validation | Done | Codex | `npm run build` passed cleanly. |
| Responsive QA | Not started | Codex | Browser/screenshot validation requires explicit authorization. |
| Accessibility pass | In progress | Codex | Labels and role/status basics added; browser pass not run. |
| Source alignment pass | Done | Codex | Lesson 1 aligned to inspected teacher-edition pages 23-33. |
| Module 1 Lesson 4 source alignment pass | Done | Codex | Teacher-edition pages 63-74 extracted/rendered; implementation authored and build validation passed. |
| Module 1 Lesson 5 source alignment pass | Done | Codex | Teacher-edition pages 75-84 extracted/rendered; implementation authored and build validation passed. |
| Module 1 Lesson 6 source alignment pass | Done | Codex | Teacher-edition pages 85-94 extracted/rendered; implementation authored and build validation passed. |
| Module 1 full source-backed pass | Done | Codex | Lessons 1-21 source-backed; build and all-route validation passed. |
| Modules 2-7 compact source-backed pass | Done | Codex | Lessons use lesson-specific source page ranges and source-authored renderer; bespoke interaction backlog remains by model family. |
| Source audit doc | Done | Codex | `source-audit.md` added with findings and source rules. |
| Requirements delivery audit | Done | Codex | `requirements-delivery-audit.md` added with content/design status. |
| Root README | Done | Codex | `README.md` added at Grade3 workspace root. |
| Layout polish | Done | Codex | Full-width app frame, smaller headings, interactive curriculum flow. |
| Drawer navigation | Done | Codex | Collapsible left drawer includes all modules and lessons. |
| Local restart script | Done | Codex | Script stops existing listeners, starts Angular in a detached screen session, writes context/logs/PID, and passes route audit. |
| Full lesson route audit | Done | Codex | All 152 expected lesson routes returned HTTP 200. |
| Drawer visual QA | Done | Codex | Headless Chrome screenshots verified home and lesson pages render as a real left drawer without raw-link fallback or content overflow. |
| Student theme redesign | Done | Codex | Reduced blue usage, improved text contrast, added module colors, shortened drawer labels, collapsed teacher source panel, and recolored math manipulatives. |
| Task tracker update | Done | Codex | This document updated after implementation. |
| Lesson 12 pilot docs update | Done | Codex | Requirements, operations, research, design, playbook, README, and task docs updated for top section tabs and shared CSS/customization boundaries. |
| Module 1 problem-set-centered replication | Done with gaps | Codex | Module 1 lessons now use Concept / Problem Set / Summary with `Blank | Solved` mode; `npm run build` passed and Module 1-only source map validation passed. Browser/screenshot QA remains pending explicit authorization. |

## 4. Backlog

### Deep Lesson Authoring Backlog

- Deep-author Module 1 Lesson 2 from its teacher-edition lesson pages.
- Deep-author Module 1 Lesson 3 from its teacher-edition lesson pages.
- Upgrade Module 1 compact source-authored lessons to bespoke interactions where needed.
- Upgrade Modules 2-7 compact source-backed lessons into bespoke interactions by model family.
- Extract a reusable `ArrayModelComponent` before authoring more array-heavy lessons.
- Add Module 2 visual number line and clock interactions.
- Add Module 4 area tile grid.
- Add Module 5 fraction strip and number line.
- Add Module 6 graph builder.
- Add Module 7 perimeter and geometry visuals.

### Component Backlog

- Array model.
- Tape diagram.
- Number line.
- Clock.
- Measurement scale.
- Fraction strip.
- Area grid.
- Bar graph.
- Picture graph.
- Line plot.
- Polygon/perimeter model.
- Mermaid concept map renderer.

### Product Backlog

- Progress persistence.
- Review mode.
- Parent/teacher note toggle.
- Printable lesson summary.
- PDF export.
- Practice history.
- Lesson 12 pilot: replace the current 8-tab lesson flow with concept, official Problem Set solved explanations, source-backed visuals/animations, and short summary.
- After Lesson 12 acceptance, replicate the problem-set-centered pattern lesson by lesson from each official Teacher Edition and Student Workbook source. Module 1 runtime replication is complete with remaining visual QA and source-thumbnail fidelity gaps.
- Replicate the Lesson 12 control hierarchy across future authored modules and lessons: primary section tabs, distinct Blank/Solved mode switch, and blue underlined Problem jump links.
- Keep `problem-set-centered-lesson-design.md` and `lesson-12-implementation-research.md` as the current source of requirements for this pilot. Do not revive older tab/step requirements unless they directly support the new design.
- Keep common Problem Set presentation reusable. Add module/lesson CSS only when a real customization requirement appears.

## 5. Open Questions

1. For the Lesson 12 pilot, what level of Teacher Edition solved thumbnail fidelity is required in the app: typed solved reconstruction, cropped source visual reference, custom animation, or a combination?
2. After Lesson 12 is accepted, should the old 8-step generated flow remain for unauthored lessons, or should it be replaced globally only after each lesson receives a problem-set-centered source pass?
3. Should learner progress be local-only browser storage, or remain stateless until the full lesson set is deeply authored?

## 6. Validation Log

| Date | Validation | Result | Notes |
| --- | --- | --- | --- |
| 2026-06-18 | Workspace file scan | Passed | Grade3 contains source PDFs and `tmp/req.txt`. |
| 2026-06-18 | Git status check | Not a git repo | No git worktree/branch exists in Grade3. |
| 2026-06-18 | Reference project inspection | Passed | EdZilla Angular/design references identified read-only. |
| 2026-06-18 | Module 1 Lesson 1 PDF inspection | Passed | Teacher-edition pages rendered/extracted for planning. |
| 2026-06-18 | Angular scaffold | Passed | `interactive-grade3-app/` created with `--skip-git`. |
| 2026-06-18 | Angular build | Passed | `npm run build` completed without warnings or errors. |
| 2026-06-18 | Module route checks | Passed | `/modules/m1` through `/modules/m7` and `/modules/m1/lessons/1` returned HTTP 200. |
| 2026-06-18 | Source audit | Passed with fixes | Removed transcript source ref and aligned Lesson 1 representation sequence. |
| 2026-06-18 | Requirements delivery audit | Passed with noted limits | Content and design delivery audited for full module and lesson route coverage. |
| 2026-06-18 | Layout polish build | Passed | `npm run build` completed without warnings or errors after full-width and heading changes. |
| 2026-06-18 | All lesson route audit | Passed | 152 expected lesson routes returned HTTP 200. |
| 2026-06-18 | Drawer navigation build and route audit | Passed | Angular build passed; home/module/lesson routes returned HTTP 200. |
| 2026-06-18 | Drawer screenshot QA | Passed | `/tmp/grade3-home-fixed.png` and `/tmp/grade3-lesson-fixed.png` verified after dev-server restart. |
| 2026-06-19 | Module 1 Lesson 4 PDF extraction/render | Passed | Teacher-edition PDF pages 63-74 extracted and rendered under `tmp/lesson-renders/m1-l4/`. |
| 2026-06-19 | Module 1 Lesson 4 Angular build | Passed | `npm run build` completed without warnings or errors after Lesson 4 authoring. |
| 2026-06-19 | Module 1 Lesson 4 route check | Passed | `/ruchika-grade3/modules/m1/lessons/4` returned HTTP 200 after dev-server restart. |
| 2026-06-19 | Module 1 Lessons 5-6 PDF extraction/render | Passed | Teacher-edition PDF pages 75-94 extracted and rendered under `tmp/lesson-renders/m1-l5/` and `tmp/lesson-renders/m1-l6/`. |
| 2026-06-20 | Module 1 Lessons 5-6 Angular build | Passed | `npm run build` completed without warnings or errors after Lessons 5-6 authoring. |
| 2026-06-20 | Module 1 Lessons 5-6 route check | Passed | `/ruchika-grade3/modules/m1/lessons/5` and `/ruchika-grade3/modules/m1/lessons/6` returned HTTP 200 after dev-server restart. |
| 2026-06-20 | Module 1 full pass Angular build | Passed | `npm run build` completed without warnings or errors after source-backed records for Lessons 2-3 and 7-21 and compact visual sizing. |
| 2026-06-20 | Module 1 full route audit | Passed | `/ruchika-grade3/modules/m1/lessons/1` through `/lessons/21` returned HTTP 200 after dev-server restart. |
| 2026-06-20 | Modules 2-7 compact source pass Angular build | Passed | `npm run build` completed without warnings or errors after generated lessons were switched to lesson-specific source page ranges and compact source panels. |
| 2026-06-20 | Full Grade 3 lesson route audit | Passed | All 152 lesson routes across Modules 1-7 returned HTTP 200 from the local Angular dev server. |
| 2026-06-20 | All-module source range audit | Passed | All 152 lesson ranges were verified against teacher-edition PDF lesson headers; M1 Lesson 1 range corrected to pages 23-33. |
| 2026-06-20 | Generated lesson guardrail audit | Passed | Generated lessons now fail closed when a lesson-specific source page range is missing. |
| 2026-06-20 | Generated lesson quality correction build | Passed | `npm run build` completed without warnings or errors after replacing vague generated prompts with model-specific teacher guidance. |
| 2026-06-20 | Generated lesson quality correction route audit | Passed | All 152 lesson routes returned HTTP 200 after renderer and generated-flow updates. |
| 2026-06-20 | Generated lesson visual correction build | Passed | `npm run build` completed without warnings or errors after adding model-specific visual figures. |
| 2026-06-20 | Generated lesson visual correction route audit | Passed | All 152 lesson routes returned HTTP 200 after adding source-panel figures. |
| 2026-06-20 | Lesson 4 benchmark flow build | Passed | `npm run build` completed without warnings or errors after expanding compact/generated lessons to the 7-step benchmark structure. |
| 2026-06-20 | Lesson 4 benchmark flow route audit | Passed | All 152 lesson routes returned HTTP 200 after applying the Lesson 4 benchmark flow globally. |
| 2026-06-20 | Live browser all-lesson benchmark audit | Passed | Browser automation checked all 152 lessons for at least 7 steps, teacher source, source pages, model info, lesson question, and visible figure/model; 0 failures. |
| 2026-06-20 | Strict Lesson 4-style browser audit | Passed | Browser automation checked all 152 lessons for 7+ steps, visible model/figure, source pages, generated lesson question rows with Unknown and Lesson target, and explanation/evidence tables; 0 failures. |
| 2026-06-20 | Live browser step-by-step all-module audit | Passed | Clicked and checked all 1,069 active lesson-step screens across Modules 1-7 for 7+ step lesson structure, visible model/table, teacher source, no generic fallback, and non-empty content; 0 failures. |
| 2026-06-20 | Lesson-specific source context audit | Passed | Generated 152 lesson source notes from teacher PDFs and browser-verified all generated lessons expose a Source context row with visible model content; 0 failures. |
| 2026-06-20 | M3 Lesson 7 concept/visual alignment audit | Passed | Verified the Eureka source uses Thad's 7 beetles with 6 legs, then selects a tape diagram with 7 parts and unknown b; live browser now shows 7 tape parts labeled 6 legs and b total legs. |
| 2026-06-20 | Generated source-visual consistency audit | Passed | Live browser checked all 152 lessons; generated lessons with extractable tape, array, or equal-group quantities render matching source-aware figures. The 4 hand-authored M1 benchmark lessons use separate bespoke visual components. |
| 2026-06-22 | Concept-first lesson audit | Passed | Added first-screen concept explanations and live-browser checked all 152 lessons for a concept-first panel with student-friendly meaning and teacher-check language; 0 failures. |
| 2026-06-22 | Multiplication/division vocabulary note audit | Passed | Live-browser checked all 152 lessons; multiplication/division/product/quotient/factor lessons show the vocabulary note with "times", "divided by", product, quotient, examples, comparison table, and the "do not use 3 by 4" rule; 0 failures. |
| 2026-07-03 | Lesson 12 source/design review | Passed for planning | Verified Teacher Edition contains the blank Lesson 12 Problem Set and solved/annotated Problem Set thumbnails; Student Workbook contains the clean blank Problem Set. Captured new problem-set-centered design standard before implementation. |
| 2026-07-03 | Lesson 12 implementation research | Passed for planning | Documented current app stack, animation-library decision, per-problem animation matrix, data requirements, LMS/plugin boundaries, and validation baseline in `lesson-12-implementation-research.md`. |
| 2026-07-03 | Lesson 12 style architecture documentation | Passed for planning | Updated docs to require shared lesson/problem-set styles as the baseline, with module/lesson-specific CSS only for true customization. |
| 2026-07-03 | Lesson 12 shared Problem Set stylesheet build | Passed | `npm run build` completed after switching from a Lesson 12-only stylesheet to shared `lesson-problem-set.css`. |
| 2026-07-03 | Lesson 12 on-demand tabs and normal lesson regression check | Passed | Chrome verified Concept/Problem Set/Summary load one section at a time with no hash URL change; Lesson 11 keeps the original one-column header, source card, and step rail. |
| 2026-07-03 | Lesson 12 Concept/Summary styling correction | Passed | `npm run build` passed; Chrome verified Concept and Summary use larger shared problem-set-centered typography/card styling, while Lesson 11 keeps the existing non-problem-set layout. |
| 2026-07-03 | Lesson 12 Google-color styling and validation readability | Passed | `npm run build` passed; Chrome verified Concept cards cycle Google blue/green/yellow/red, Summary has gradient/check/meaning-map cards, validation text is larger, and Lesson 11 remains unaffected. |
| 2026-07-03 | Lesson 12 Problem Set blank/solved mode | Passed | `npm run build` passed; Chrome verified Blank mode shows 6 question/workspace cards with no solution/animation/validation, Solved restores 6 solved cards, and Lesson 11 remains unaffected. |
| 2026-07-03 | Lesson 12 source-visual blank workspaces | Passed | `npm run build` passed; Chrome verified Blank mode has 6 source-style visual scaffolds and no solved answers/validation; Solved mode has 6 animation cards, solved answers, and validation blocks. |
| 2026-07-03 | Lesson 12 compact Problem Set controls | Passed | `npm run build` passed; Chrome verified Problem 1-6 bookmarks and `Blank/Solved` share one compact toolbar row, while remaining visually separate controls. |
| 2026-07-03 | Lesson 12 navigation color hierarchy | Passed | `npm run build` passed; Chrome verified section tabs use distinct colors, Blank mode and blank equation chips use warm/yellow styling, Solved uses green, and Problem 1-6 jumps are lightweight blue text links. |
| 2026-07-03 | Problem-set-centered global control standard documented | Passed | Worktree, requirements, design, and task docs now require future authored lessons to reuse the Lesson 12 control hierarchy instead of reverting to all-blue pill controls. |
| 2026-07-03 | Problem jump link color correction | Passed | `npm run build` passed after switching Problem 1-N bookmarks from gray text links to normal blue underlined local links and updating the standard docs. |
| 2026-07-03 | Module 1 workbook source extraction/render | Passed for authoring | Extracted Module 1 Student Workbook and Teacher Edition layout text under `tmp/module1-problemset-source/`; rendered Student Workbook pages locally for visual checks on image-dependent items. |
| 2026-07-03 | Module 1 problem-set-centered source map validation | Passed | Local Node validation confirmed Module 1 problem-set-centered runtime map covers Lessons 1-11 and 13-21; Lesson 12 remains the bespoke pilot data. |
| 2026-07-03 | Module 1 problem-set-centered Angular build | Passed | `npm run build` completed after adding Module 1 problem-set-centered data and generic array/decomposition/two-step renderer support. |

## 7. Change Log

| Date | Change |
| --- | --- |
| 2026-06-18 | Created planning docs package under `docs/interactive-grade3/`. |
| 2026-06-18 | Implemented Angular app skeleton, Module 1 overview, structured curriculum data, and interactive Module 1 Lesson 1. |
| 2026-06-18 | Added separate module pages for Modules 1-7 and split Module 1 Lesson 1 into 12 small screens. |
| 2026-06-18 | Added source audit doc and tightened app source references to curriculum source types only. |
| 2026-06-18 | Added content/design requirements delivery audit and filled UI delivery gaps for module/lesson metadata. |
| 2026-06-18 | Added root workspace README and improved app width, heading scale, and home curriculum flow. |
| 2026-06-18 | Added teacher-edition objective labels and objective-backed routes for all 152 Grade 3 lessons. |
| 2026-06-18 | Replaced top pill navigation with a collapsible left curriculum drawer for modules and lessons. |
| 2026-06-19 | Added lesson authoring playbook and source-authored Module 1 Lesson 4 calibration lesson. |
| 2026-06-19 | Added source-authored Module 1 Lessons 5 and 6 to complete the Topic B calibration slice. |
| 2026-06-20 | Added compact source-authored flows for all remaining Module 1 lessons and reduced oversized dot/array visuals. |
| 2026-06-20 | Added lesson-specific teacher-edition page ranges for Modules 2-7 and switched generated lessons to the compact source-authored teacher flow. |
| 2026-06-20 | Corrected Module 1 Lesson 1 source range and removed generated overview-page fallback behavior. |
| 2026-06-20 | Replaced generic compact lesson copy with teacher-usable model-specific board setup, questions, listen-for checks, misconceptions, and exit evidence. |
| 2026-06-20 | Added compact model-family figures to generated lesson source panels and raised the Angular component style budget to fit the visual layer. |
| 2026-06-20 | Applied Lesson 4's 7-screen teaching structure to compact/generated source-backed lessons across the app. |
| 2026-06-20 | Fixed Module 1 Lessons 5 and 6 to meet the same 7-step benchmark and validated all 152 lessons in the live browser. |
| 2026-06-20 | Added Lesson 4-style known/unknown question tables to generated lessons and smarter primary model selection such as tape diagrams for word-problem lessons. |
| 2026-06-20 | Completed live step-by-step validation across every module and lesson against the Lesson 4 benchmark gate. |
| 2026-06-20 | Added teacher-edition extracted source contexts, teacher moves, and exit evidence notes for all lessons, then wired generated lessons to show the source context in the Lesson 4-style question card. |
| 2026-06-20 | Corrected M3 Lesson 7 source note and made generated source figures parse lesson quantities for equal groups, arrays, and tape diagrams instead of showing disconnected generic counts. |
| 2026-06-22 | Added the concept-first panel and objective-based vocabulary extraction so terms like quotient, factor, unknown, area, perimeter, unit fraction, elapsed time, and scale are explained before the lesson model. |
| 2026-06-22 | Added a Grade 3 Eureka Math multiplication/division vocabulary note with the product/quotient comparison table and formal wording rule. |
| 2026-07-03 | Added the problem-set-centered Lesson 12 pilot design doc and marked the current 8-tab flow as the wrong primary experience for this pilot. |
| 2026-07-03 | Added Lesson 12 implementation research and marked older docs as historical where they conflict with the new pilot requirements. |
| 2026-07-03 | Documented the corrected top-tab and CSS architecture decisions: top tabs load sections on demand, common styles stay common, and lesson-specific CSS is optional customization only. |
| 2026-07-03 | Changed Lesson 12 section tabs from route/hash links to on-demand content tabs and added local Problem Set bookmarks. Scoped the new two-column header to problem-set-centered lessons only. |
| 2026-07-03 | Brought Lesson 12 Concept and Summary styling back in line with the Problem Set card scale, typography, and module-accent color treatment. |
| 2026-07-03 | Added Google-color gradients to Concept/Summary, enlarged Problem Set validation text, and replaced the one-line Summary with validation steps plus a six-problem meaning map. |
| 2026-07-03 | Added Lesson 12 Problem Set `Blank | Solved` mode using the same official problem data; blank mode renders question prompts, workbook-style blanks, and student workspace without solved content. |
| 2026-07-03 | Separated the Problem Set view mode from Problem 1-6 bookmarks and added source-style blank visuals for Lesson 12 Problem Set items. |
| 2026-07-03 | Compacted the Problem Set toolbar so problem bookmarks and `Blank/Solved` are separate controls on one row, and reduced Blank mode card height/padding. |
| 2026-07-03 | Reworked Lesson 12 control hierarchy so Concept/Problem Set/Summary, Blank/Solved, and Problem 1-6 jumps no longer all look like the same blue pill controls. |
| 2026-07-03 | Documented the Lesson 12 control hierarchy as the replication standard for all future problem-set-centered modules and lessons. |
| 2026-07-03 | Corrected the Problem 1-N bookmark standard from gray links to normal blue underlined links without returning to pill styling. |
| 2026-07-03 | Converted Module 1 runtime lessons to the problem-set-centered pattern: Lesson 12 keeps its bespoke pilot data, while Lessons 1-11 and 13-21 use a Module 1-only source-backed Problem Set data map with Blank/Solved support. |
| 2026-07-03 | Generalized the shared problem-set renderer for Module 1 arrays, decomposed arrays, equation workspaces, and two-step word-problem solved views. |
