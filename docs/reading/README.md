# Grade 3 Reading & Language Arts

Date: 2026-08-13

Status: Verified year-curriculum baseline, 100 source-admitted text-evidence questions, and one source-admitted teacher-sample pilot

## Controlling Documents

- `grade3-reading-source-readiness-audit.md` — Math comparison, source admission criteria, missing official components, and the hard daily-lesson release gate
- `grade3-reading-source-manifest.json` — machine-readable authority, fingerprints, readiness state, and missing-source inventory
- `grade3-reading-research.md` — governing sources, curriculum/assessment distinction, copyright boundary, and 70-title verification record
- `grade3-reading-traceability.md` — claim-to-source-to-UI contract and no-invention guardrail
- `grade3-reading-v1-architecture.md` — routes, registry, page responsibilities, and validation gates
- `../work-items/grade3-multi-subject-learning-portal.md` — active project status and Math non-regression record
- `../../design-qa.md` — current screenshot-backed visual and interaction result

## Implemented Baseline

- 10 publisher-documented Benchmark Advance Grade 3 units in source order;
- 30 publisher weeks;
- 70 named selections with source role, genre, publisher Lexile label, and weekly focus;
- 100 publisher-authored text-evidence questions, ten per unit, mapped to the exact verified selection;
- exact printed-page citations for every unit;
- 150 supplemental practice drafts retained but quarantined from the active Unit path;
- persistent Unit and `R` portal controls;
- a curriculum/assessment source ledger;
- compatibility redirects from the removed generic Reading routes;
- no reproduced Benchmark selection text and no invented official lesson content.
- one source-faithful interactive pilot at `/ruchika/grade3/reading/units/u1/lessons/1`, controlled by Benchmark Education's official Grade 3 Unit 1 Week 1 sample and requiring the school Texts for Close Reading pages 4–5.
- a complete source-bounded evidence-practice path at `/ruchika/grade3/reading/units/:unitId/practice/:questionNumber`; every route keeps the official question and source visible, requires the school selection, and labels the teaching layer as original supplemental portal material.
- source proof at the point of use: every Unit begins with the two real rendered publisher pages, every question launch links directly to its governing publisher question page, and every practice prompt shows the matching rendered question page beside the transcribed prompt.
- a Reading-native Learn → Watch → Practice → Respond sequence: progressive reader-think modeling, three strategy-specific tap moves, spoken response frames, and tap-to-confirm self-checks. The complete learner path works without a keyboard and does not copy Math's Blank/Solved worksheet pattern.
- 12 original supplemental demonstrations that model a reading move without supplying or implying an answer to any Benchmark question.

## Current Source Gate

- Year and Unit map: ready from verified public evidence.
- Text-evidence practice: ready for all ten units from the verified publisher-authored 100-question source; student passages, answers, and scores are not included or inferred.
- Daily lesson authoring: globally blocked; only `u1-w1-l1` is admitted from the official public sample, and its student passage remains in the school book.
- Official assessment authoring: blocked; the repository does not contain the matching Grade 3 assessment and scoring materials.
- Current Baker pacing: not publicly verified.

Run `npm run validate:reading-source-readiness` from `interactive-grade3-app/` to verify that missing official materials cannot be silently treated as lesson-ready.

The former generic Home/Learn/Library/Levels organization, three invented starter texts, fixed timing routine, and standards-code homepage are removed. F&P and other assessments appear only as sourced context, not as the Reading curriculum architecture.

## Teaching-Layer Authority

Official content and interaction design have separate authorities:

- Benchmark, Moreland, Baker, and California sources control displayed curriculum facts, selection alignment, official question wording, standards, assessment claims, and reading-level boundaries.
- The [IES/REL K–3 reading-comprehension toolkit](https://ies.ed.gov/ncee/rel/reading-comprehension-k-3/teacher-pd-module1) controls the explain/model → guided use → independent-use teaching progression.
- Established elementary literacy products were reviewed only for interaction patterns such as staged disclosure, large tap targets, immediate selected state, and oral-response options. They do not control curriculum content.
- The Reading validator rejects learner-facing `<input>`, `<textarea>`, Angular two-way form bindings, and the removed typed-response labels. Source fidelity does not permit turning an official question into a digital worksheet.
- Every portal-authored demonstration remains visibly labeled original supplemental material and is intentionally independent of the school selection, so it cannot masquerade as an official passage or answer.

## Current Validation

- `npm run validate:reading-curriculum` — passed: 10 units, 30 weeks, 70 selections, 100 official questions, 12 original strategy demonstrations, 44 California records, and zero failures.
- `npm run validate:reading-source-readiness` — passed: year map and official text-evidence practice ready; complete daily lessons, official assessments, and Baker pacing remain correctly blocked or unverified.
- `npm run validate:local-search` — passed with the protected Math baseline.
- `npm run build` — passed; production output generated in `dist/interactive-grade3-app`.
- Live browser route audit — all 100 practice routes and all 10 Unit routes rendered the required source thumbnail and exact publisher-page link with zero learner text-entry controls, horizontal overflow, or route failures.
- Live interaction audit — progressive modeling, all three tap moves, spoken response, tap-to-confirm self-checks, portal return, every Reading information section, and Unit navigation passed without learner text entry.
- Math non-regression — Math home plus a deep Module 3 Lesson 4 Problem Set route passed both Blank and Solved navigation; no Math implementation file was changed by this Reading increment.
- Publisher PDF links returned HTTP 200 with `application/pdf`; all 20 local rendered source pages were shown in the learner UI. The Chrome automation client did not render the external PDF viewer itself, so PDF-viewer display is not claimed.
- Visual states were reviewed in the approved live Chrome session; no browser screenshot or appshot is retained as a committed product asset.
