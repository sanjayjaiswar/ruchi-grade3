# Grade 3 Reading Practice Quality Audit

Date: 2026-08-13

Status: Historical structural audit; practice remains quarantined pending source-level validation

## Finding

The first year-curriculum implementation correctly replaced invented syllabus content with the publisher-documented 10-unit, 30-week, 70-selection spine, but its daily practice layer still reused five generic phases and generated prompts mechanically. That met route coverage but did not meet the standard for useful year-long learning.

Severity: High. A generic five-prompt rotation could waste learner time even when its surrounding metadata was accurate.

## Evidence Before Remediation

- 150 routes were produced from only 5 global phase labels.
- Selection assignment followed a fixed day-number rule.
- Daily prompts were generated from five conditional templates.
- A route could display all weekly focuses without identifying the exact focus the task used.
- The task did not consistently name a concrete product or an independent quality criterion.

## Corrective Design

- Removed the global practice-phase registry and mechanical selection-routing rule.
- Added 150 explicit practice records across 30 publisher weeks.
- Anchored every practice to roles that exist in that exact week.
- Bound every practice to one exact publisher-listed reading, writing, or word-study focus.
- Gave every practice a distinct title, task statement, evidence product, and quality check.
- Required the school-provided Benchmark selection and page-referenced evidence.
- Kept all task directions explicitly separate from the copyrighted official Teacher Edition.

## Fail-Closed Gates

`npm run validate:reading-curriculum` fails if:

- the ordered official 10/30/70 registry changes without re-verification;
- the practice registry does not contain `u1-w1` through `u10-w3` in order;
- any week does not contain exactly five ordered practices;
- any practice references a selection role absent from its week;
- any publisher-listed selection is never used;
- any focus reference is invalid;
- any title, product, task, or check is incomplete;
- any task title, evidence product, task statement, or evidence check is duplicated;
- any rejected global phase label returns.

## Current Machine Result

- publisher units: 10
- publisher weeks: 30
- publisher-named selections: 70
- explicit practice records: 150
- distinct practice titles: 150
- distinct evidence products: 150
- distinct task statements: 150
- distinct evidence checks: 150
- all publisher-listed selections used: yes
- validator failures: 0

## Browser And Regression Result

- 10 Unit routes and all 150 practice routes opened in live Chrome: 160 checked, 0 failures.
- Each practice route matched its expected title, selection count, task, evidence check, and visible non-official boundary.
- Unit and practice selectors, Previous/Next, response input, all three checks, state reset, and the `R` portal return passed.
- Portal to Reading, Reading to portal, portal to Math, and the protected Math home passed.
- The Reading overview, Unit 3 map, Unit 8 cross-text practice, source ledger, and Math home were visually inspected at `1920 × 940`; no clipping, overflow, broken hierarchy, or Math drift was found.
- Production build, Reading validator, unchanged Math local-search baseline, and diff whitespace check passed.

## Current Release Decision

The results above prove registry structure and interaction behavior only; they do not prove Teacher Edition fidelity. The active Unit path therefore does not expose these 150 draft routes. Math-style daily Reading practice requires the matching authorized Benchmark student and Teacher Resource System pages, visible source evidence, and lesson-by-lesson review before release.
