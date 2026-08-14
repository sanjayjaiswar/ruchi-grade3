# Design QA: Grade 3 Reading Year Curriculum

Date: 2026-08-13

## 2026-08-13 navigation and standards-language audit

- Replaced the broken `#grade3-year-map` publisher-scope fragment with a component scroll action and replaced the combined assessment/reading-level fragment with a real `/ruchika/grade3/reading/levels` route.
- Added persistent desktop navigation in the required order: Standards, Curriculum, Assessments, Reading levels, Sources, plus the `R` portal return.
- Reframed the standards page around plain-language expectations. Official codes such as `RL.3.1` remain only as secondary California lookup references, with all six prefixes explained.
- Live Chrome click audit passed for the overview, standards, assessments, reading levels, sources, all ten Unit cards (clicked individually), the curriculum scroll control, portal return, and all six standards-area jump controls.
- Every unique governing HTML source opened from the rendered UI. All linked PDFs and the Lexile FAQ were additionally fetched and type-checked because the Chrome extension does not expose PDF-viewer or download tabs as ordinary controlled tabs; each returned a valid PDF or HTML document.
- Accepted screenshots are saved under `tmp/reading-navigation-audit-2026-08-13/`: curriculum overview, standards, reading levels, Unit 3, and the Math regression screen. All used the current run and showed aligned header controls, no broken route state, and no horizontal overflow at the desktop viewport.

## Scope

Validate the source-backed Grade 3 Reading year experience against the working Eureka Math navigation model. The protected Math curriculum and lesson implementation must remain unchanged. Desktop browser use is the priority.

## Visual Evidence

- Math reference supplied by the user: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-47c40926-d2df-47e3-81d3-e131ba2b2e0c.png` (`1916 × 533`).
- Reading year overview: `tmp/reading-curriculum-final-qa/reading-overview-authored-practice.jpg` (`1920 × 940`).
- Reading Unit 3 official-week and practice map: `tmp/reading-curriculum-final-qa/reading-unit3-authored-practice-top.jpg` (`1920 × 940`).
- Reading Unit 8 Week 3 cross-text evidence practice: `tmp/reading-curriculum-final-qa/reading-u8-w3-compare-practice.jpg` (`1920 × 940`).
- Reading source ledger with Moreland, publisher, CDE, Baker, SCCOE, and assessment boundaries: `tmp/reading-curriculum-final-qa/reading-sources-authored-practice-top.jpg` (`1920 × 940`).
- Current Math home regression image: `tmp/reading-curriculum-final-qa/math-after-authored-practice.jpg` (`1920 × 940`).
- Same-input comparison: `tmp/reading-curriculum-final-qa/math-reading-authored-practice-comparison.jpg` (`3840 × 940`).

## Same-Input Comparison

The side-by-side source/implementation comparison confirms that Reading now follows the useful Math interaction model without copying Math content:

- the subject identity is prominent at the left;
- Unit and practice selectors persist in the top bar;
- Previous, Next, and `R` portal-return controls remain visible;
- the overview exposes the complete year rather than a small generic library;
- full-width cards use the established blue, red, gold, green, and teal Grade 3 family;
- orange calls to action replace the rejected brown treatment;
- heading and body density remain readable at the 1920-pixel desktop viewport;
- no horizontal clipping or overflow is visible.
- practice names are specific enough to distinguish the five activities in each week without opening them;
- the practice page visibly separates the official anchor, exact official focus, repository-authored task, requested product, and evidence check.

## Source-Fidelity Checks

- Moreland’s 2017–18 Benchmark Advance adoption is linked from the app.
- The exact 10 unit titles and their order match the publisher-authored 2017 Grade 3 scope.
- All 70 selection titles in the registry were found in the page-by-page publisher PDF extraction; missing titles: 0.
- Unit pages display 3 official weeks, 7 named selections, and the sourced genre, publisher Lexile label, reading, word-study, and writing details.
- The 150 daily routes are labeled source-anchored home practice, not 150 official Benchmark lessons.
- Every practice resolves only to selection roles in its own official week and displays the exact official reading, writing, or word-study focus used.
- All 70 official selections are used by at least one practice.
- Santa Clara County is presented only as standards/resource context; Moreland remains the local adoption authority and the publisher scope remains the year-sequence source.
- No invented starter text, fixed timing routine, standards-code curriculum map, F&P placement, learner score, or copyrighted Benchmark selection text remains.

## Practice-Quality Checks

- Removed 5 global phase labels and the fixed day-number selection assignment.
- Added 30 ordered practice-week records and exactly 5 explicit practices per week.
- Verified 150 distinct practice titles, 150 distinct evidence products, 150 distinct task statements, and 150 distinct evidence checks.
- Verified every task names a concrete product and is anchored to one or more school selections plus one exact published weekly focus.
- Verified paired-text tasks display both named selections and require evidence from both.
- The public-source limit is visible: the repository does not claim to reproduce the private copyrighted Teacher Edition’s daily directions.

## Functional Checks

- Reading registry validation: 10 units, 30 official weeks, 70 publisher-named selections, 150 explicit practice days, 150 distinct titles, 150 distinct tasks, complete selection use, 0 failures.
- Live Chrome route audit: 10 Unit routes + 150 supplemental practice routes = 160 checked, 0 failures.
- Every audited practice route matched the expected title, selection count, task statement, evidence check, and visible non-official boundary.
- Response field and all three checklist controls accepted input; navigating Next reset transient state as designed, and Previous returned to the prior practice.
- Unit selector, practice selector, Previous, Next, Unit overview, year overview, and `R` portal-return controls passed.
- Boundary check passed on the first, middle, and final practice routes; Next is disabled at Unit 10 practice 15.
- Portal → Reading, Reading → portal, portal → Math, and Math → portal click-through passed.
- Current Math home visually matches the protected experience and no Math curriculum/page file appears in the Reading change set.
- Production build, Reading validation, unchanged Math search baseline, and diff whitespace checks passed.

No actionable source-fidelity, practice-quality, route, interaction, layout, clipping, or Math-regression defect remains in this increment.

final result: passed

## Standards And Assessment Expansion

Date: 2026-08-13

### Content Evidence

- Added the complete ordered 44-record California Grade 3 ELA register: 10 Literature, 10 Informational Text, 2 Foundational Skills, 10 Writing, 6 Speaking and Listening, and 6 Language records.
- Kept RL.3.8 and W.3.9 visible as explicit CDE non-expectations rather than turning them into invented Grade 3 requirements.
- Added direct source links on the year overview, every standards domain, every assessment card, every reading-level card, and the source ledger.
- Added the current Moreland cadence: classroom evidence ongoing, SRI twice yearly, ELA benchmarks three times yearly, and CAASPP yearly.
- Added Baker’s 2025–26 school-plan evidence and visibly limited it: schoolwide planning evidence does not establish that every Grade 3 learner receives every named measure.
- Separated California’s year-end text-complexity expectation, publisher Lexile text labels, SRI, and F&P. No learner placement or cross-system conversion is shown.
- The two authorized Grade 2 reports informed only the generic architecture; no private learner value appears in the app, docs, screenshots, or validation output.

### Automated Validation

- Reading validator: 10 units, 30 weeks, 70 selections, 150 explicit practice days, 44 unique ordered Grade 3 standards records, 0 failures.
- Production build: passed.

### Visual Validation

- Live Chrome inspected the Reading overview at `1920 × 996`: the 10-unit year map, standards/assessment summary, official-source controls, and desktop width rendered without horizontal overflow.
- The standards route rendered all six domains and 44 records. Clicking the Language jump exposed an Angular fragment-routing defect during QA; the control was changed to an in-page scroll action and rechecked successfully without leaving the standards route.
- The assessment route rendered the published Moreland cadence, four separated reading-level concepts, Baker school-plan evidence, and CAASPP composite areas without clipping or overflow.
- The click-through `year map → Unit 1 → first practice` passed. The Unit page showed three official weeks and 15 practice links; the practice page showed its official selection anchor, exact weekly focus, supplemental-practice boundary, response field, and three checks.
- The visible `R` control returned from the practice to `/ruchika/grade3`; the portal then opened `/ruchika/grade3/math` successfully.
- The protected Math home retained its Grade 3 heading, seven-module curriculum flow, selectors, search, and `R` return control. The viewport had no horizontal overflow and the browser console reported zero errors.

standards and assessment expansion result: passed

## Ultra-Detailed Curriculum Provenance Audit

Date: 2026-08-13

### Material Finding

- The disputed `Animal Adaptations` title is directly printed as `Unit 3: Animal Adaptations` on the publisher-produced Benchmark Advance Grade 3 scope, printed pages 72–73 (PDF page 3).
- The same rendered page prints all seven Unit 3 selection names, roles, genres, Lexile labels, three week rows, science standards, reading focuses, word study/spelling, fluency, writing, speaking/listening, language, and ELD columns.
- The remaining nine units were reconciled to their own PDF pages, printed pages 68–87. The app now displays that page pair on every Unit card and Unit page.
- Moreland’s current public curriculum table proves Benchmark Advance is the TK–5 ELA program adopted in 2017–18. Baker’s current About page confirms the program name. Neither public page proves the current Grade 3 unit order, dates, or pacing.
- The public PDF is a 2016 publisher-produced California-edition scope aligned by adoption year. A newer 2022 edition exists with a different order, so the app now states the edition and uncertainty instead of calling the sequence Baker’s confirmed current year.

### Corrective Product Decision

- Removed all 150 supplemental-practice links from the active Unit path. Structural uniqueness and route checks do not validate their educational fidelity.
- Retained the records as quarantined drafts only; current Baker pacing plus authorized student/teacher materials is the release gate.
- Replaced `official` and `exact focus` language with `publisher`, `publisher-listed`, and `concise summary of publisher columns` where appropriate.
- Added a visible daily-practice gate and exact page citation on Unit 3: `Verify PDF pp. 72–73`.

### Rendered Validation

- Live Chrome at `1920 × 996` showed the revised overview with 10 publisher units, 30 publisher weeks, 70 publisher-named selections, ten page-specific PDF links, and no Unit practice links.
- Live Chrome opened Unit 3 and showed three publisher weeks, seven selections, zero daily-practice links, the current-pacing limitation, summary disclaimer, and daily-practice gate with no horizontal overflow.
- Unit 3’s source control resolves to the publisher PDF with `#page=3`, corresponding to printed pages 72–73.
- Portal return and protected Math home passed; browser console errors: 0.

provenance audit result: publisher scope ready to share with caveats; daily practice needs revision and is quarantined

## Source-First Reading Unit Baseline

Date: 2026-08-13

### Math Reference Applied

- Reviewed the protected Eureka Math lesson layout supplied by the user and the corresponding local implementation.
- Preserved its controlling pattern: official source evidence remains visible; the teaching UI may improve hierarchy and comprehension but may not alter source facts.
- Did not edit Math curriculum data, Math lesson components, Math renderers, or Math styles.

### Reading Implementation

- Added all 10 rendered official Benchmark Grade 3 scope pages to `public/source-pages/reading/`.
- Every active Unit route renders the matching source page before its guided view.
- Each of the three publisher weeks is presented as four clearly separated verified lanes: Student Reads, Reading, Word Study, and Writing.
- The official page remains visible for the complete standards, fluency, speaking/listening, conventions, vocabulary, and ELD columns that are not replaced by the guided cards.
- The visible evidence gate explains that daily lessons require authorized student selections and Teacher Resource System pages before Math-level prompts, visuals, or answers can be released.

### Automated Validation

- Reading validator: 10 units, 30 weeks, 70 selections, 10 rendered official source pages, 44 California standards records, 0 failures.
- Production build: passed.
- Unchanged Math local-search baseline: 7 modules, 35 topics, 152 lessons, 673 Blank activities; passed.
- Diff whitespace check: passed.

### Live Visual And Interaction Validation

- Visually inspected Unit 3 at the 1920-pixel desktop viewport with its official printed pages 72–73 visible in the app.
- Clicked Week 1 and inspected the complete four-lane guided layout. No clipping, collision, mechanical text dump, or unsupported daily practice was visible.
- Opened all 10 Unit routes. Each displayed one official source page, three guided weeks, the page-specific source link, and no active supplemental practice.
- Clicked Standards, Curriculum, Assessments, Reading levels, and Sources; each resolved to its expected H1.
- Clicked the `R` portal return, verified both subject cards, then opened Eureka Math. The protected Math heading and Curriculum Flow remained present.

source-first Reading Unit baseline result: passed within the available public-source boundary; daily lesson construction remains blocked on authorized Benchmark student and teacher materials
# Grade 3 Reading official-lesson pilot QA

Date: 2026-08-13

- Visually opened Unit 1 and clicked the visible `Lesson 1: Working Together` official-sample card.
- Confirmed the lesson header, school-text gate, four source-controlled stages, official vocabulary, evidence organizer, after-reading question, and source panel at a 1920px desktop viewport.
- Exercised the four completion checks and all learner text fields; the header advanced to `4 of 4 source steps`.
- Found and repaired an Angular fragment-routing defect in the stage navigation, then re-clicked `3. Reread` and `Official source` without route drift.
- Opened a non-admitted Unit 3 lesson URL and confirmed the fail-closed return plus visible source-gate notice.
- Clicked the `R` portal return, opened Eureka Math, and loaded Module 3 Lesson 4 Solved.
- Final result: no horizontal overflow and no browser warning/error on the validated Reading or Math routes.
