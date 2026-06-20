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
| Actual git worktree | Deferred | Grade3 is not currently a git repo; do not create git state without explicit approval. |
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

## 5. Open Questions

1. For deep-authored lessons after Lesson 1, should each lesson include exact problem-set/exit-ticket structures, or should it use lesson-aligned variants after the sourced examples?
2. Should learner progress be local-only browser storage, or remain stateless until the full lesson set is deeply authored?

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
