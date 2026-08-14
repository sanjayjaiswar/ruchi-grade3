# Grade 3 Reading Year-Curriculum Architecture

Date: 2026-08-13

Status: Publisher scope implemented; one official-sample pilot released; all supplemental drafts remain quarantined

Source authority is governed by `grade3-reading-source-readiness-audit.md` and `grade3-reading-source-manifest.json`. No architecture or UI decision may promote the public scope into a lesson-level Teacher Resource System substitute.

## Routes

- `/ruchika/grade3/reading` — 10-unit year overview
- `/ruchika/grade3/reading/sources` — curriculum and assessment evidence ledger
- `/ruchika/grade3/reading/units/:unitId` — one publisher unit and its 3 publisher weeks
- `/ruchika/grade3/reading/units/u1/lessons/1` — source-faithful interactive pilot controlled by the official Benchmark Education Unit 1 Week 1 sample and school Texts for Close Reading pages 4–5
- every other `/ruchika/grade3/reading/units/:unitId/lessons/:lessonNumber` — fail-closed return to the Unit scope with an official-source notice
- `/ruchika/grade3/reading/learn` — compatibility redirect to the year overview
- `/ruchika/grade3/reading/library` — compatibility redirect to the year overview
- `/ruchika/grade3/reading/levels` — compatibility redirect to Curriculum sources

Existing `/ruchika/grade3/math/...` routes and legacy Math redirects remain unchanged.

## Data Model

`reading-curriculum.data.ts` is the publisher-source registry. It contains:

- 10 exact unit IDs, numbers, titles, order, and accent families;
- 3 publisher week records per unit;
- 70 publisher-named selections with source role, genre, and publisher Lexile label;
- source-derived weekly reading, word-study, and writing focuses;
- direct Moreland, Baker, CDE, assessment, and publisher-scope URLs.

`reading-practice.data.json` is the separate repository-authored practice registry. It contains 30 week keys and 150 explicit records. Every record names:

- one or more selection roles from its own week;
- one exact publisher-listed reading, writing, or word-study focus reference;
- a unique practice title;
- a concrete evidence product;
- a unique task statement;
- a separate quality check.

The practice records are repository-authored drafts. Their uniqueness and reference integrity are mechanically checkable, but their educational fidelity is not proven without authorized student/teacher materials.

## Page Responsibilities

### Year overview

- identify `Ruchika Grade 3 Reading & Language Arts` prominently;
- show the Moreland Benchmark Advance adoption and the 2017 publisher scope;
- display 10 publisher units, 30 publisher weeks, and 70 publisher-named selections;
- render all 10 publisher unit titles in order;
- link official claims at point of use.

### Unit page

- display the exact publisher unit title and number;
- visibly render the matching official publisher scope page as the controlling source, following the same source-first contract used by Eureka Math;
- show all 3 publisher weeks and all 7 named selections;
- show source-derived genre, publisher Lexile label, reading, word-study, and writing details in a four-lane guided view;
- leave the complete official standards, fluency, speaking/listening, language, and ELD columns visible in the source image rather than replacing them with incomplete portal wording;
- expose exact printed-page citations and no daily practice links;
- link back to the publisher scope.

### Bounded official lesson route

- identify Unit 1, Week 1, Lesson 1 and “Working Together” exactly as the official public sample does;
- require the school-provided Texts for Close Reading pages 4–5;
- preserve the official objective, vocabulary, teacher sequence, and after-reading question;
- provide child-friendly prediction, vocabulary, sandbag, evidence, and response interfaces without inventing passage facts;
- show the official sample, its fingerprint, its boundary, and direct source link;
- keep all non-admitted daily routes fail-closed.

### Curriculum sources

- explain the local-adoption, publisher-scope, state-adoption, and school-context evidence hierarchy;
- distinguish curriculum from district assessment information;
- prohibit score, level, placement, and cross-system inference.

## Navigation Model

The active Reading header keeps only controls supported by the public evidence:

- subject identity on the left;
- the Unit selector is shown only where it is useful;
- draft-practice Previous, Next, and practice controls remain restricted to draft routes;
- compact `R` link to the Grade 3 subject portal.

## Official And Supplemental Boundary

Publisher-scope data:

- program/adoption claim;
- unit title and order;
- week number;
- selection title and role;
- genre and publisher Lexile label;
- weekly reading, word-study, and writing focus.

Repository-authored supplemental data:

- the five-practice-per-week cadence;
- 150 explicit, nonduplicated task titles and instructions;
- 150 explicit evidence-quality checks;
- response field and completion checklist.

The active Unit path does not publish the supplemental routes. A current Baker pacing artifact plus authorized selection and Teacher Edition access is the release gate.

The public ten-page scope is sufficient for the year and Unit map, but not for Math-style lesson delivery. Each future daily Reading lesson must be controlled by the matching authorized student selection and Teacher Resource System pages before the portal may add explanations, visuals, prompts, or answers.

## Math Change Firewall

Reading work may change only Reading pages/data, portal copy, route composition, and related docs. It must not change Math curriculum data, lesson content, Problem Sets, renderers, source mappings, Math styles, search records, or behavior.

## Validation Gates

1. Production build passes.
2. Registry validation reports 10 units, 30 publisher weeks, 70 publisher-named selections, 10 complete rendered official source pages, and separately identifies 150 quarantined supplemental drafts.
3. All 70 selection titles match the page-by-page publisher PDF extraction.
4. Every active Unit route displays the correct source boundary and no daily-practice links.
5. Unit, source, and `R` controls work.
6. Math search remains 7 modules, 35 topics, 152 lessons, and 673 Blank activities.
7. Portal-to-Math and Math-to-portal clicks still work.
8. Desktop screenshots show no clipping, overflow, or broken hierarchy.
9. Source readiness validation passes while correctly reporting `u1-w1-l1` as the sole bounded official lesson and global daily-lesson/assessment authoring as blocked.
