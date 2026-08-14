# Work Item: Grade 3 Multi-Subject Learning Portal

Last updated: 2026-08-13
Status: Active — Reading official-source audit complete; year map verified; daily lessons and official assessments blocked on edition-matched materials

## Goal

Grow the existing learner-facing Grade 3 Eureka Math application into a Grade 3 learning portal that can contain Math, Reading & Language Arts, and later subjects without regressing the working Math experience.

## Current Status

- The pre-change Eureka Math application at `/ruchika-grade3` was captured as the protected working baseline.
- The user has approved a learner and grade hierarchy with separate Math and Reading subject areas.
- The information architecture, migration order, legacy URL requirements, and non-regression gates are documented in `docs/interactive-grade3/grade3-learning-portal-architecture.md`.
- `/ruchika/grade3` is now the portal homepage with active Eureka Math and Reading & Language Arts cards.
- `/ruchika/grade3/math` renders the existing Math shell; all existing Math page, curriculum, component, renderer, template, style, and behavior files remain untouched.
- `/ruchika-grade3` home and supported deep links redirect to corresponding new Math destinations.
- `/ruchika/grade3/reading` now provides the verified Grade 3 Benchmark Advance year spine: 10 publisher units, 30 publisher weeks, and 70 named selections. The 150 separately authored practice records remain quarantined and are not reachable from the active Unit path.
- `/ruchika/grade3/reading/sources` documents the Moreland adoption, the edition-matched scope-and-sequence source, Baker context, California standards, current CAASPP reporting, and current Moreland Grade 3 assessment context.
- `/ruchika/grade3/reading/standards` now provides all 44 California Grade 3 ELA standards records across six domains with plain-language explanations and direct CDE domain links.
- `/ruchika/grade3/reading/assessments` documents classroom evidence, SRI, district benchmarks, CAASPP, and Baker school-plan evidence without inventing an individual Grade 3 score or target.
- `/ruchika/grade3/reading/levels` separately explains California text complexity, publisher Lexile labels, SRI, and Fountas & Pinnell boundaries; it does not convert or invent a learner level.
- The former generic Home/Learn/Library/Levels architecture, three-text starter library, invented timing routine, cryptic standards codes, and unrelated top-level practice navigation are removed.
- Every active Unit page now visibly renders its exact official publisher scope page before the guided week view. The guided view separates Student Reads, Reading, Word Study, and Writing with child-readable typography while keeping the complete official standards, fluency, speaking/listening, language, and ELD columns visible in the source image.
- Reading day-by-day lesson pages are not presented as complete. Achieving the same fidelity as Math requires the authorized Benchmark student selection and Teacher Resource System pages for each lesson.
- A Math-versus-Reading source readiness audit now proves the boundary: Math has local versioned Teacher Editions, student workbooks, page contracts, hashes, answer pages, and rendered evidence for all 152 lessons; Reading currently has only adoption records and a ten-page scope. The missing Grade 3 Teacher Resource System, student texts, and assessment package are recorded in a machine-readable manifest.
- `npm run validate:reading-source-readiness` fails closed if daily lessons, official assessments, or Baker pacing are marked ready while their required admitted sources remain missing.
- The portal uses one full-width workspace header titled `Ruchika Learning Portal — Grade 3`; the leading `R` links home and the subject intro is a separate compact surface.
- Reading section navigation uses a `Reading areas` label, a blue filled current tab, blue outlined destination tabs, and a separate `R` portal-return link.
- Responsive work is desktop-first for common 13-inch and 15-inch Mac browser widths. Dedicated tablet/mobile design is deferred unless explicitly requested.

## Current Focus

Treat the verified 10-unit, 30-week, 70-selection Reading year, 10 rendered official source pages, 44-record California standards map, sourced assessment/reading-level system, quarantined practice registry, and sealed Math behavior as the current desktop baseline. The next source-faithful increment begins only when authorized Benchmark student and Teacher Resource System pages are available.

## Decisions

- Use `/ruchika` as a possible future learner home or redirect entry point; it is not required for Milestone 1.
- Use `/ruchika/grade3` as the Grade 3 subject home.
- In Milestone 1, the homepage Math card opens `/ruchika/grade3/math`.
- `/ruchika/grade3/math` renders the exact existing Math shell; only its route boundary changes.
- Use `/ruchika/grade3/reading` for Reading & Language Arts.
- Use `math` in URLs; the visible subject label may be `Eureka Math`.
- Use the visible label `Reading & Language Arts`; keep `reading` as the short URL segment.
- Give Math and Reading separate subject shells and navigation. Do not mix Math module navigation into the Reading area.
- Keep `/ruchika-grade3` and all of its supported deep links compatible with corresponding Math destinations throughout every milestone.
- Treat the current Math route set and interaction behavior as a non-regression contract.
- Treat the existing Math implementation as sealed: portal and Reading work must not edit Math curriculum data, lesson components, renderers, styles, source mappings, route behavior, or learner interactions.
- Deliver one bounded milestone at a time. Do not combine homepage, Reading, shared portal features, and Math migration into one change set.
- Add richer portal organization inspired by the supplied card-based portal reference only after the homepage and Reading foundations are stable.

## Completed

- Approved the learner → grade → subject information architecture.
- Approved separate Math and Reading subject boundaries.
- Defined the target route hierarchy and legacy URL policy.
- Defined an additive migration sequence, validation gates, and rollback rule.
- Added an active-work index and this durable work item.
- Linked the new portal plan from the existing Math planning and operations documents.
- Captured the pre-change baseline: production build passed and local search validation confirmed 7 modules, 35 topics, 152 lessons, and 673 Blank activities.
- Added the isolated Grade 3 portal homepage and responsive subject-card layout.
- Added an active Eureka Math card targeting `/ruchika/grade3/math`.
- Added a visible but non-navigating Reading & Language Arts placeholder.
- Reused the exact existing Math shell under the new prefix without editing Math implementation files.
- Added legacy home, search, module, lesson, section, and Problem Set mode redirects.
- Updated local start/restart reporting so the portal homepage is the primary URL and the Math and legacy URLs remain documented.
- Passed the post-change production build and local search validation.
- Passed live browser parity for all 152 new lesson routes and all 152 legacy lesson routes: 304 checked routes, 0 failures.
- Passed representative Concept, Summary, Blank, Solved, anchored problem, search-query, module, title, and root-home checks with 0 console errors.
- Added a compact `R` link at the far-right of the Math top bar, accessible as `All subjects`, so every Math page can return to the Grade 3 subject homepage without consuming lesson-navigation space.
- Completed the official-source Reading research package for California, SCCOE, Moreland, Baker, foundational literacy, reading-level systems, and Grade 3 assessment context.
- Added a separate Reading shell at `/ruchika/grade3/reading`; the earlier Home/Learn/Library/Levels prototype is retained only through safe compatibility redirects.
- Removed the three invented starter texts and all invented official-looking routines from the active Reading experience.
- Added an initial five-phase supplemental prompt layer; this was later audited as too mechanical and replaced by 150 explicit practice records.
- Activated the Reading portal card while preserving the sealed Math implementation.
- Retired-prototype record: the earlier three-text/Library/Levels implementation was clicked through before it was rejected and removed. It is not the current Reading baseline.
- Aligned portal and Reading H1/H2/H3/body typography to the compact Sanjay reference tokens while preserving every Grade 3 color, gradient, card, icon, route, and interaction.
- Revalidated portal, every Reading route, a Reading answer state, responsive layouts, shared-home navigation, and the sealed Math home in live Chrome; no overflow or console error was found.
- Expanded portal and Reading frames to use the available desktop width, reduced unnecessary top/card height, removed forced uppercase metadata, balanced the seven-strand desktop grid, and hardened the Reading header against narrow/zoomed viewport clipping.
- Replaced the hanging portal introduction with a compact white surface beneath a full-width dark header; removed redundant `Learning home` and the separate Grade 3 badge; made `Ruchika Learning Portal — Grade 3` one equally weighted title.
- Replaced the Reading segmented text control with a labeled blue tab group: filled current section, outlined destinations, and a separate `R` return link.
- Added the approved desktop-first responsive scope to the repository `AGENTS.md`; routine validation now targets 13-inch and 15-inch Mac desktop widths rather than spending time on dedicated tablet/mobile polish.
- Added the approved educational source-fidelity guardrail to `AGENTS.md`: no invention of official educational facts, direct primary-source links beside displayed claims, omission of unsupported claims, explicit supplemental-content labels, and durable claim traceability.
- Removed the unsupported 25-minute and 5/10/5/5 routine, stale Moreland F&P/SRI/benchmark claims, learner-facing standards-code shorthand, and unsupported SCCOE wording.
- Rebuilt Reading around the directly relevant Moreland, Baker, California adoption, publisher Grade 3 scope, and Moreland assessment sources. F&P is kept only as sourced TK–2 assessment context.
- Verified Moreland’s board-adopted TK–5 ELA curriculum as Benchmark Advance, adopted 2017–18.
- Verified the publisher-authored 2017 California Grade 3 sequence as 10 units in exact published order, 30 publisher weeks, and 70 named selections.
- Replaced the generic Reading shell with a Math-like year curriculum: a 10-unit overview, 30 publisher week groups, and 150 clearly supplemental practice routes.
- Added source-derived selection, genre, publisher Lexile-label, reading, word-study, and writing metadata. No invented passage or answer key remains.
- Audited the first daily layer and found that five global prompt phases were too generic for useful year-long practice despite correct source metadata.
- Removed the global phase generator and fixed day-number selection assignment.
- Added 150 separately authored practice records with 150 distinct titles, 150 distinct evidence products, 150 distinct task statements, and 150 distinct evidence checks.
- Bound every practice to valid selection roles inside its publisher week and to one exact publisher-listed reading, writing, or word-study focus; all 70 publisher-listed selections are used.
- Added a fail-closed practice-quality audit and validator so generic phases, invalid roles, incomplete records, duplicates, or omitted selections fail validation.
- Corrected the district assessment record: Moreland currently lists F&P Early Literacy for TK–2, SRI for grades 3–8 twice yearly, ELA benchmarks for grades 3–8 three times yearly, and CAASPP for grades 3–8 annually.
- Added compatibility redirects from the removed `/learn`, `/library`, and `/levels` routes.
- Reviewed the two explicitly authorized, Git-ignored Grade 2 reports locally to derive only generic assessment-system questions. No personal learner value was copied into tracked files, UI, screenshots, or external research, and no Grade 2 category was promoted into a Grade 3 fact.
- Verified all 44 California Grade 3 ELA records across Literature, Informational Text, Foundational Skills, Writing, Speaking and Listening, and Language; added a complete plain-language reference route with direct CDE links.
- Added an assessment architecture grounded in Moreland’s current cadence, Baker’s 2025–26 SPSA, California’s current CAASPP ELA score guide, and official text-complexity guidance.
- Made the Moreland/Baker F&P evidence difference explicit: the district table lists F&P Early Literacy for TK–2, while Baker’s school plan uses F&P in schoolwide ELA planning; neither public source establishes an individual Grade 3 target for this portal.
- Extended the fail-closed Reading validator to require 44 unique ordered standards records, the standards and assessments routes, source constants, cadence labels, and learner-placement guardrails.
- Reviewed the protected Eureka Math lesson architecture and adopted its governing pattern for Reading: source evidence first, readable guided interpretation second, and no activity released without controlling source pages.
- Rendered all 10 verified Benchmark Grade 3 Skills and Strategies scope pages into the app and displayed the matching page on every Unit route.
- Reworked each Unit week as a four-lane guided view—Student Reads, Reading, Word Study, and Writing—using only transcribed publisher facts. The complete official standards, fluency, speaking/listening, conventions, vocabulary, and ELD columns remain visible in the source page immediately above.
- Extended the Reading validator to fail when any of the 10 rendered official source pages is missing or incomplete, when the active Unit template stops rendering the source page, or when the Math-level daily-practice evidence gate disappears.
- Admitted one bounded official Benchmark Education public sample for Grade 3 Unit 1 Week 1 Lesson 1, “Working Together,” after file metadata, SHA-256, text extraction, rendered-page, and visual checks.
- Added a source-faithful interactive Lesson 1 layer that preserves the official objective, named student book/pages, seven key-vocabulary words, three cognates, teacher reading sequence, and after-reading question while requiring the school text and inventing no passage facts or answer.
- Kept every other Reading lesson route fail-closed; the global daily-lesson and assessment authoring gates remain blocked until equivalent edition-matched sources are admitted.

## Remaining

1. If a private learner profile is later requested, define explicit local-only storage and consent boundaries before adding student-specific values or saved progress.
2. Add progress/resume only as a separately designed and validated increment.
3. Obtain authorized Grade 3 Benchmark student selection pages and Teacher Resource System lesson pages before expanding beyond the single admitted `u1-w1-l1` pilot.
4. Obtain the matching Grade 3 Weekly and Unit Assessments, scoring/answer resources, and Informal Assessments before building official-looking assessment practice or reading-level interpretation.
5. Admit each source through the fingerprint, edition, pagination, visual review, and correction checks in `docs/reading/grade3-reading-source-readiness-audit.md`.
6. Once those materials exist, build one bounded source-faithful lesson batch and validate it against the exact pages before expanding across the year.

## Files In Play

- `docs/active-work.md`
- `docs/work-items/grade3-multi-subject-learning-portal.md`
- `docs/interactive-grade3/grade3-learning-portal-architecture.md`
- `docs/interactive-grade3/task-tracker.md`
- `docs/interactive-grade3/implementation-plan.md`
- `docs/interactive-grade3/worktree-and-operations.md`
- `docs/interactive-grade3/README.md`
- `docs/reading/README.md`
- `docs/reading/grade3-reading-research.md`
- `docs/reading/grade3-reading-source-readiness-audit.md`
- `docs/reading/grade3-reading-source-manifest.json`
- `docs/reading/grade3-reading-traceability.md`
- `docs/reading/grade3-reading-v1-architecture.md`
- `docs/reading/grade3-practice-quality-audit.md`
- `interactive-grade3-app/src/app/pages/portal-home/`
- `interactive-grade3-app/src/app/pages/reading-home/`
- `interactive-grade3-app/src/app/app.routes.ts`
- `interactive-grade3-app/src/app/app.css`
- `docs/Grade 2 Final Assessment/` — confidential and Git-ignored; do not read, modify, commit, upload, expose, summarize, or assume Grade 3 applicability without exact authorization

## Resume Notes

- Read this work item and `docs/interactive-grade3/grade3-learning-portal-architecture.md` before implementation.
- Read `docs/interactive-grade3/task-tracker.md` for the current Math history and known content-quality gaps; the portal work does not erase or replace that tracker.
- Run `git status --short` before editing. The repository already contained unrelated modified and untracked files when this work item was created; preserve them.
- For the next increment, begin from the verified ten-unit Reading registry, the 10 in-app source page images, the quarantined practice registry, and the protected Math baseline. Do not replace the publisher unit spine with generic standards areas, a small text library, or global prompt phases.
- Do not reactivate any daily practice route until the matching authorized Benchmark student and Teacher Resource System pages have been reviewed and attached to that lesson, equivalent to the Math source-page treatment.
- Enforce the Math change firewall: route definitions may map the sealed Math shell to the new prefix and preserve old URLs, but existing Math implementation files and behavior must not change.
- Keep the route/shell migration isolated from Math curriculum data and lesson rendering wherever possible.
- Do not create a branch, git worktree, commit, or deployment unless the user explicitly requests that action.
- Browser or screenshot validation requires the repository’s browser-profile validation procedure and explicit authorization.

## Validation Log

| Date | Validation | Result | Notes |
| --- | --- | --- | --- |
| 2026-08-13 | Documentation scope check | Passed | Portal architecture and tracking were documented without changing application source or runtime routes. |
| 2026-08-13 | Protected baseline recorded | Passed | The pre-change `/ruchika-grade3` behavior was captured and remains available through corresponding compatibility routes after all implementation gates passed. |
| 2026-08-13 | Local Markdown link and whitespace checks | Passed | All checked local documentation links resolve; new documentation files contain no trailing whitespace. |
| 2026-08-13 | Incremental sequencing and Math firewall review | Passed | Docs now require the portal homepage and route-only Math restructure first, complete unchanged-Math validation, Reading second, and prohibit Math implementation refactoring. |
| 2026-08-13 | Pre-change production build | Passed | Angular production build completed before portal implementation. |
| 2026-08-13 | Pre-change local search validation | Passed | 7 modules, 35 topics, 152 lessons, 673 Blank activities, and local-only search architecture passed. |
| 2026-08-13 | Post-change production build and local search validation | Passed | Build completed and the same 7/35/152/673 search baseline passed. |
| 2026-08-13 | Complete lesson route parity | Passed | Browser checked all 152 preferred routes and all 152 legacy lesson routes; 304 routes passed with 0 failures. |
| 2026-08-13 | Route-state and UI regression | Passed | Root portal, Math card, module, legacy search query, Concept, Summary, Blank, Solved, anchored problem, titles, shell visibility, and 0 console errors verified. |
| 2026-08-13 | Persistent portal navigation | Passed | The compact home icon is visually separated at the far-right of the Math top bar and exposes the accessible name and tooltip `All subjects`. A live Chrome click-through returned from a deep Math route to `/ruchika/grade3`, showing the active Math card and non-clickable Reading placeholder with 0 console errors. |
| 2026-08-13 | Visual click-through regression | Passed | Captured and inspected the homepage, Math home, Module 1, Lesson 1 Concept, Blank Problem Set, Solved Problem Set, Summary, search results, and homepage return. Clicked all seven module links, Next/Previous, search, a search result, a Problem bookmark, and `All subjects`; all resolved correctly. |
| 2026-08-13 | Reading research package | Passed | Official California, SCCOE, Moreland, Baker, WWC, F&P, i-Ready, and Lexile sources were documented with explicit system limitations and no unofficial crosswalk. |
| 2026-08-13 | Retired Reading prototype QA | Superseded | The three-text/Library/Levels prototype was tested before rejection; it is not evidence for the current curriculum implementation. |
| 2026-08-13 | Post-Reading Math regression | Passed | The portal Math card opened the unchanged Math home; a legacy Module 5 Lesson 4 Solved deep link redirected to the canonical Math route and rendered correctly. Browser console errors: 0. |
| 2026-08-13 | Retired Reading prototype traceability | Superseded | The earlier generic framework/source page was replaced by the current Moreland/publisher curriculum ledger. |
| 2026-08-13 | Retired Reading prototype visual review | Superseded | Screenshots of the rejected Home/Learn/Library/Levels prototype are historical only and do not validate the current year experience. |
| 2026-08-13 | Compact typography alignment | Superseded by Reading readability correction | The compact scale was technically consistent with the earlier reference but proved too small and overly bold for sustained Grade 3 Reading use. The later Math-aligned desktop typography pass is controlling. |
| 2026-08-13 | Full-width and density refinement | Passed | Portal and Reading use `1760px` frames with 40px sides at 1840px. Side-by-side before/after review confirmed reduced top/card whitespace, title-case labels, a full-width seven-strand grid, and repaired narrow Reading alignment. Chrome passed at 1840px, 519px, 390px, and 320px with zero overflow or console errors; Math remained unchanged. |
| 2026-08-13 | Final portal header and Reading navigation pass | Passed | Chrome validated the portal and Reading at `1280 × 800` and `1728 × 1000`. The workspace title, `R` links, white subject intro, Reading label, selected/outlined tabs, all four Reading destinations, Math home, and a legacy Solved deep link passed with zero overflow and zero browser errors. Production build and the 7/35/152/673 Math search baseline also passed. |
| 2026-08-13 | Reading source-fidelity remediation | Superseded by year rebuild | Removed unsupported timing, generic Library content, and cryptic codes. The current 10/30/70/150 year validation below is the controlling result. |
| 2026-08-13 | Reading year-curriculum replacement | Passed | Verified Moreland’s Benchmark Advance adoption and the publisher Grade 3 sequence: 10 units, 30 weeks, and 70 named selections. All 70 titles matched the PDF extraction. Production build, 10/30/70/150 registry validation, all 160 Unit/practice routes, response/checklist state, selector and navigation click-through, compatibility redirects, same-input visual comparison, and Math portal regression passed. |
| 2026-08-13 | Reading practice-quality remediation | Passed | Removed the five-template phase generator and fixed selection rule. Added 150 explicit practices with 150 distinct titles, evidence products, tasks, and evidence checks; every record resolves to valid within-week selection roles and one exact published focus, and all 70 selections are used. Live Chrome opened all 160 Unit/practice routes with 0 failures, exercised selectors/Previous/Next/response/checks/portal return, and visually confirmed the overview, Unit 3, Unit 8 practice, source ledger, and unchanged Math home. Build, Reading validator, 7/35/152/673 Math search baseline, and diff check passed. |
| 2026-08-13 | Standards, reading levels, and assessment expansion | Passed | Added and validated all 44 ordered California Grade 3 ELA records, Moreland's published Grade 3 assessment cadence, Baker's explicitly bounded school-plan evidence, CDE text-complexity context, Lexile/SRI/F&P distinctions, and CAASPP reporting areas. Live Chrome verified the overview, standards, assessments, Unit 1, a real practice, portal return, and protected Math home at 1920px with zero overflow or console errors; the standards jump bug found during the click-through was fixed and revalidated. Build, Reading validator, 7/35/152/673 Math search baseline, ignore rules, and diff check passed. |
| 2026-08-13 | Ultra-detailed curriculum provenance audit | Needs stronger classroom evidence for daily practice | Confirmed all ten displayed units directly in the publisher-produced 2017 California Grade 3 PDF and added exact printed-page citations (68–87). Moreland and Baker confirm Benchmark as the local ELA program, but no public source confirms Baker's current Grade 3 pacing or the portal's daily tasks. Removed the 150 original supplemental practice links from the active Unit path, relabeled condensed focus bullets as summaries, documented edition risk, and added fail-closed source-audit checks. The drafts remain quarantined pending an authorized current pacing artifact and school materials. |
| 2026-08-13 | Reading source-first parity with Math | Passed within available-source boundary | Reviewed the protected Math lesson/source architecture, rendered all 10 official Benchmark scope pages into the Reading Unit routes, and placed each source page above a four-lane guided view of verified selections, reading, word study, and writing. Live Chrome visually inspected Unit 3 at 1920px, clicked the Week 1 navigation, and confirmed the official page, all three weeks, source links, previous/next units, and `R` portal return. The fail-closed validator reports 10/30/70, 10 rendered source pages, 44 standards, and 0 failures; production build passed. Daily Reading lessons remain intentionally blocked because the public scope is not a Teacher Resource System or student text. |
| 2026-08-13 | Official Reading source readiness audit | Year map ready; lesson and assessment authoring blocked | Compared Reading evidence to the complete Eureka Math Teacher Edition pipeline; visually inspected the Benchmark scope and a representative Math lesson page; authenticated the scope metadata and SHA-256; reviewed Moreland, CDE adoption, and the CDE Program 2 findings; identified the official Teacher Resource System, student-text, assessment, and supporting components absent from the repository; recorded edition-identification leads and a fail-closed source manifest. No Reading UI or Math implementation changed in this audit. |
| 2026-08-13 | Bounded official Reading lesson pilot | Passed | Admitted Benchmark Education's official Grade 3 Unit 1 Week 1 sample and released only Lesson 1 “Working Together.” Browser clicked Unit 1 → Lesson 1, exercised all four source steps and response fields, verified the official source surface, tested a blocked Unit 3 lesson URL, returned through the Grade 3 portal, and opened Math home plus Module 3 Lesson 4 Solved. A live stage-link routing defect was found, fixed, and revalidated. At 1920px there was no horizontal overflow and no browser warning/error. Source readiness, 10/30/70/1 Reading validation, 7/35/152/673 Math search validation, and production build all passed. |
| 2026-08-13 | Reading desktop typography readability | Passed | Replaced Reading's 12–14px dense card/body scale and repeated 850–950 weights with the live Math hierarchy: 38px/700 page titles, 28px/700 section titles, 17–18px explanatory text, 16px card text and controls, 1.45–1.58 body line height, and 500–700 supporting weights. Live desktop review covered the year map, Unit 1 source page, complete standards view, and admitted lesson. No curriculum content, colors, card structure, routes, or Math files changed. |

## Last Updated

2026-08-13 — Created the durable work item, recorded approved routing decisions, and made preservation of the current Eureka Math behavior the controlling migration requirement.

2026-08-13 — Reordered delivery into bounded milestones: homepage plus unchanged Math validation first, Reading second, incremental Reading enhancement next, and richer portal organization later.

2026-08-13 — Tightened the protected baseline into a Math change firewall: route composition may change so Math becomes a portal subject, but Math content, UI, components, data, styles, and behavior remain unchanged.

2026-08-13 — Completed Milestone 1: portal homepage, Reading placeholder, route-only Math placement, legacy compatibility, operational URL updates, and full old/new lesson parity validation.

2026-08-13 — Reduced the persistent portal return control to a 42-pixel home icon at the far-right of the Math top bar, retained the accessible label and tooltip `All subjects`, and visually revalidated both the portal-return and Math-home paths.

2026-08-13 — Built an initial Reading prototype; its generic Library/Levels structure and invented texts were later rejected and removed. This entry is retained only as project history.

2026-08-13 — Added the controlling Reading no-drift traceability record and reconciled public claims, official links, product decisions, implementation locations, privacy rules, and validation gates.

2026-08-13 — Completed the final screenshot-backed desktop/mobile visual review and interaction click-through; no Reading or Math visual defect was found.

2026-08-13 — Replaced the oversized portal and Reading display scale with the compact approved H1/H2/H3/body tokens, preserved the Grade 3 visual system, and passed side-by-side desktop/mobile visual QA plus a live Math regression check.

2026-08-13 — Removed the remaining layout waste: portal/Reading frames now approach edge-to-edge at wide viewports, excess intro/card height is reduced, Reading labels use normal casing, seven strands fill both desktop rows, and the header no longer pushes narrow/zoomed views sideways.

2026-08-13 — Finished the desktop header/navigation baseline: full-width Grade 3 portal identity, distinct subject-intro surface, `R` home links in portal/Reading/Math, and blue selected/outlined Reading tabs. Live Chrome checks passed at 1280px and 1728px without changing the approved subject cards or Math curriculum behavior.

2026-08-13 — Began source-fidelity remediation: remove unsupported official-looking content, link current claims at point of use, and keep Math sealed.

2026-08-13 — Superseded the generic remediation with the complete 10-unit year rebuild documented in the final validation entry.

2026-08-13 — Replaced the still-mechanical five-phase daily layer with 150 separately authored, source-anchored practices and passed the fail-closed data audit, complete browser route audit, representative visual review, interaction checks, and sealed Math regression.

2026-08-13 — Completed the standards and assessment layer: 44 CDE Grade 3 ELA records, public Moreland/Baker/CAASPP assessment evidence, explicit reading-level boundaries, confidential-report privacy controls, live desktop click-through, and protected Math regression all passed.

2026-08-13 — Aligned Reading to the Math source-first contract: every Unit route now visibly preserves its official Benchmark scope page and adds a readable verified-column guide without publishing unsupported daily lessons.

2026-08-13 — Corrected the Reading typography baseline for sustained desktop use after the compact treatment proved difficult to read; the live Eureka Math type hierarchy now controls Reading headings, body copy, labels, links, controls, source explanations, and lesson work surfaces.
