# Grade 3 Learning Portal Architecture And Migration Contract

Date: 2026-08-13
Status: Milestones 1 and 2 implemented and validated

## 1. Purpose

This document controls the safe expansion of the working Grade 3 Eureka Math application into a multi-subject learner portal. The portal will introduce a Grade 3 subject home, preserve Eureka Math as a complete subject experience, add a separate Reading & Language Arts area, and leave room for later subjects.

The overriding requirement is immutability: the current Eureka Math experience must not be changed while the new hierarchy is introduced. Build the portal around Math; do not refactor Math as part of portal or Reading work.

## 2. Protected Current Baseline

The current learner-facing Math application is available at:

```text
http://localhost:4220/ruchika-grade3/
```

Treat the following as protected behavior during the portal migration:

- the current `/ruchika-grade3` entry point and supported deep links;
- all seven Eureka Math modules and 152 lesson routes;
- the existing curriculum drawer, module and lesson navigation, previous/next behavior, and page titles;
- the Concept, Problem Set, and Summary section structure used by problem-set-centered lessons;
- Blank/Solved mode and supported Problem Set bookmarks or route state;
- local Teacher Edition source references and the current curriculum-data contracts;
- current build, restart, and route-audit workflows.

Milestone 1 changed only portal-specific files, route composition, additive root-shell CSS, and local start/restart URL reporting. It did not change Math curriculum data, Math pages, lesson components, renderers, source mappings, templates, styles, or learner behavior.

For portal and Reading milestones, treat the current Math implementation as a sealed subsystem. Do not edit its curriculum data, lesson components, Math renderer behavior, Math styles, current route semantics, source references, or learner interactions.

## 3. Long-Term Information Architecture

Milestone 1 creates the portal homepage and makes the exact existing Math application a subject beneath it. Only route composition changes; Math implementation does not.

```text
/ruchika
└── /grade3
    ├── /math
    │   ├── /modules/:moduleId
    │   └── /modules/:moduleId/lessons/:lessonNumber/...
    └── /reading
        ├── /sources
        └── /units/:unitId
            └── /lessons/:lessonNumber
```

### Route Responsibilities

| Route | Responsibility | Initial behavior |
| --- | --- | --- |
| `/ruchika-grade3` | Legacy Eureka Math entry and deep links | Remain compatible with corresponding Math destinations after the route restructure. |
| `/ruchika/grade3` | Grade 3 portal homepage | Shows active Eureka Math and Reading & Language Arts cards. |
| `/ruchika/grade3/reading` | Reading & Language Arts subject home | Ten-unit Benchmark Advance Grade 3 year overview. |
| `/ruchika/grade3/reading/sources` | Curriculum and assessment source record | Moreland adoption, edition-matched scope, Baker context, publisher architecture, and district assessment boundaries. |
| `/ruchika/grade3/reading/units/:unitId` | Unit overview | Exact official unit title with three weeks and fifteen lesson links. |
| `/ruchika/grade3/reading/units/:unitId/lessons/:lessonNumber` | Lesson position | Official curriculum coordinate plus clearly labeled original supplemental practice. |
| `/ruchika` | Learner home across grades | Later optional portal expansion; not part of Milestone 1. |
| `/ruchika/grade3/math` | Preferred Eureka Math subject home | Milestone 1. Renders the exact existing Math shell without implementation changes. |
| `/ruchika/grade3/math/modules/:moduleId/...` | Preferred Math deep routes | Preserve module, lesson, section, Problem Set mode, and all supported route state. |

Reading V1 child routes and curriculum decisions are controlled by `docs/reading/grade3-reading-v1-architecture.md`, `docs/reading/grade3-reading-research.md`, and the no-drift mapping in `docs/reading/grade3-reading-traceability.md`.

## 4. Naming Rules

- Use `math` in URLs for a short, standard, stable route segment.
- Use `Eureka Math` as the visible subject name where the curriculum brand matters.
- Use `Reading & Language Arts` as the visible subject name.
- Use `reading` as the route segment so future literacy subareas can live beneath one subject boundary.
- Do not encode a vendor-specific reading framework such as Fountas & Pinnell into the top-level route. Framework and level choices belong to curriculum research, not navigation architecture.

## 5. Shell And Navigation Boundaries

The mature portal may use three conceptual shells:

1. `Learner/Grade shell`: a small shared header and grade-level subject navigation.
2. `Math shell`: the existing Eureka Math curriculum shell, drawer, module navigation, and lesson behavior.
3. `Reading shell`: separate Reading & Language Arts navigation based on its eventual research-backed structure.

The Grade 3 subject home may visually resemble the supplied card-based portal reference, but Milestone 1 should use only the small amount of structure needed for a stable homepage. Math module navigation must not appear inside Reading, and Reading navigation must not be inserted into the Math curriculum drawer. Progress/resume behavior and richer maintained portal sections belong to a later milestone.

## 6. Math Change Firewall

Allowed during the homepage milestone:

- new homepage-only component, template, styles, and tests;
- route composition needed for `/ruchika/grade3` and `/ruchika/grade3/math`;
- reuse of the existing sealed Math shell beneath the new Math prefix;
- precise compatibility redirects or aliases for `/ruchika-grade3` home and deep routes;
- documentation and non-mutating validation scripts.

Not allowed during homepage, Reading, or Reading-enhancement milestones:

- edits to Math lesson data, Teacher Edition mappings, Math components, shared Math renderers, or Math styles;
- changes to the meaning or state carried by current `/ruchika-grade3` deep links;
- moving or rewriting Math implementation files merely to match the new route hierarchy;
- cleanup or refactoring inside Math, even if behavior is intended to remain equivalent;
- combining the homepage/Math route restructure with Reading implementation.

If the route-only restructure requires changing Math implementation behavior, stop rather than broadening the change.

## 7. Additive Migration Sequence

### Phase 0: Documentation

- Record the approved hierarchy, route contract, task status, and non-regression gates.
- Make no application changes.

### Milestone 1A: Math Baseline Capture

- Record the current route table and generated route manifest.
- Run and record the current production build.
- Run and record static coverage for all 152 lesson routes and supported deep-link shapes.
- Record representative page titles and navigation behavior.

### Milestone 1B: Grade 3 Homepage And Route-Only Math Restructure

- Add `/ruchika/grade3` as the portal homepage.
- Add an active Eureka Math card whose destination is `/ruchika/grade3/math`.
- Mount the exact existing Math shell at the new Math prefix without changing its implementation.
- Keep `/ruchika-grade3` home and deep routes compatible with their corresponding Math destinations.
- Reading may be visible only as a disabled or non-navigating `Coming next` card.
- Do not add `/ruchika`, Reading routes, or shared progress/resume behavior in this milestone.

### Milestone 1C: Post-Homepage Math Regression

- Re-run the Math production build and complete static route coverage.
- Confirm the homepage Math card opens the exact existing app at the new Math prefix.
- Confirm old Math home and deep links resolve to corresponding destinations with state preserved.
- Recheck representative module, lesson, section, Problem Set, Blank/Solved, title, and navigation behavior.
- Stop before Reading if any Math regression appears.

### Milestone 2: Reading Research And Reading Area

- Complete the source-backed Reading research package first.
- Add `/ruchika/grade3/reading` in a separate change with its own shell.
- Revalidate the unchanged Math application after Reading is added.

Status: superseded by the year-curriculum rebuild. The generic Home/Learn/Library/Levels shell and three-text library were not an acceptable representation of the adopted Grade 3 curriculum. The replacement uses the verified ten-unit, thirty-week, 150-lesson year spine.

### Milestone 3: Portal Organization And Resume Experience

- After Math and Reading are independently stable, expand the homepage using the supplied portal reference as a structural inspiration.
- Add richer maintained subject cards, learner entry points, and progress/resume behavior in small changes.
- Validate Math and Reading after each change rather than bundling the entire portal shell.

## 8. Eureka Math Immutability And Non-Regression Contract

The portal migration is not complete unless all of the following are true:

- No existing supported Math destination is lost or semantically changed by the homepage, Reading, or portal-organization milestones.
- All seven modules and 152 lesson destinations remain reachable at the preferred `/ruchika/grade3/math` prefix and through compatible `/ruchika-grade3` URLs.
- The Milestone 1 Math card opens `/ruchika/grade3/math`.
- Portal and Reading work produces no intentional diff in existing Math curriculum data, components, renderers, styles, or content.
- Module and lesson navigation, curriculum drawer state, previous/next navigation, section selection, Problem Set bookmarks, and Blank/Solved behavior remain functional.
- Page titles remain specific and correct.
- Math curriculum records, source references, and rendered lesson content are not unintentionally changed by portal routing work.
- The existing local restart workflow and production build still pass.
- Static validation passes before browser validation.
- Authorized browser validation confirms representative homepage, module, lesson, section, and Blank/Solved flows.
- Old and new Math URLs must resolve to corresponding destinations and preserve complete route state.
- No completion claim is made while a required gate is failed, skipped, or undocumented.

## 9. Validation Gates

| Gate | Required evidence | Blocks |
| --- | --- | --- |
| A — Math baseline | Pre-change build result, `/ruchika-grade3` route manifest, 152-lesson coverage, and representative behavior | Homepage implementation |
| B — Route-only restructure | `/ruchika/grade3` builds, its Math card targets `/ruchika/grade3/math`, the sealed Math shell is reused, and old URLs remain compatible | Post-homepage validation |
| C — Math unchanged | Post-homepage build, 152 old/new destinations, deep-link state, titles, and representative controls match Gate A | Reading milestone |
| D — Reading evidence | Research sources and Reading requirements are documented without unsupported level claims | Reading implementation |
| E — Reading isolation | Reading shell works independently and Math still matches the protected baseline | Portal organization |
| F — Portal increment | Each richer portal/progress/resume change passes focused Math and Reading regression checks | Next portal increment |

## 10. Rollback Rule

- Keep the pre-change route map documented so the route-only restructure can be reversed without restoring Math implementation files.
- Isolate the homepage route and components from Math curriculum data so a failed homepage can be removed without restoring lesson content.
- If the post-homepage Math check fails, restore the prior route composition and remove or fix only portal files; do not alter Math to make the new route pass.
- If Reading or a later portal increment fails, keep the last validated homepage and Math baseline while that increment remains incomplete.
- Do not use destructive file moves or broad rewrites as the migration strategy.

## 11. Reading Research Boundary

Reading is a new curriculum program, not a relabeling of Math screens. Before Reading lesson architecture is implemented, create a source-backed research package covering at least:

- California Grade 3 English Language Arts/Literacy standards;
- Santa Clara County Office of Education guidance and public literacy resources;
- Moreland School District and Baker Elementary public curriculum and assessment information;
- foundational reading components, including phonemic awareness where intervention requires it, phonics/word recognition, fluency, vocabulary, comprehension, writing, and language;
- how reading levels are used and the limitations of Fountas & Pinnell, Lexile, DRA, guided-reading letters, and other leveling systems;
- screening, diagnostic, progress-monitoring, and instructional-grouping distinctions;
- privacy-safe handling of any learner-specific assessment information.

That research must distinguish official requirements from local practice, vendor frameworks, and inference. No level conversion table should be treated as exact across systems.

The repository folder `docs/Grade 2 Final Assessment/`, supplied by the user as additional context, is confidential local-only evidence and is excluded from Git. It may be reviewed locally in the Reading research phase, but it must not be committed, uploaded, quoted into public research, or exposed in screenshots or external tools. Establish its source, purpose, and grade applicability before use; do not automatically treat Grade 2 assessment material as the Grade 3 Reading curriculum or as a public district requirement.

## 12. Milestone 1 Delivered Scope

Included:

- durable route and shell decisions;
- non-regression requirements;
- migration and rollback sequence;
- active-work and work-item tracking;
- links from existing Math planning documents.
- Grade 3 portal homepage at `/ruchika/grade3`;
- active Eureka Math card and non-navigating Reading placeholder;
- exact existing Math shell at `/ruchika/grade3/math`;
- compatibility for `/ruchika-grade3` home and supported deep links;
- pre/post build, search, route, state, visual, and console validation.

Not included:

- Reading curriculum claims or implementation;
- branch, git worktree, commit, deployment, or hosting changes.

## 13. Resume Order

Before changing application code, read:

1. `docs/active-work.md`
2. `docs/work-items/grade3-multi-subject-learning-portal.md`
3. this architecture and migration contract
4. `docs/interactive-grade3/task-tracker.md`
5. `docs/interactive-grade3/worktree-and-operations.md`

Then inspect the current git status and capture Gate A. The first implementation change must be additive; it must not delete or rename the protected Math route.

## 14. Milestone 2 Current Delivered Scope

Included:

- official-source Reading research and a durable source register;
- confidential-evidence privacy boundary with no student values persisted;
- independent Reading year, Sources, Unit, and Lesson routes;
- 10 exact official unit titles in published order;
- 30 curriculum weeks and 150 lesson positions;
- 30 original supplemental week texts with interactive reading, context vocabulary, comprehension, evidence, and writing states;
- explicit separation of F&P, SRI, district benchmarks, and CAASPP from the curriculum spine;
- portal, Reading, Math, legacy redirect, build, search-baseline, visual, and console validation.

Not included:

- proprietary Benchmark Advance content;
- official student placement, fabricated passage levels, or cross-system score conversion;
- saved learner profiles, progress/resume, analytics, or cloud storage;
- changes to the sealed Math implementation;
- copied Benchmark readings, Teacher Edition material, official assessments, or invented official lesson titles.
