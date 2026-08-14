# Grade 3 Reading & Language Arts

Date: 2026-08-13

Status: Verified year-curriculum baseline plus one source-admitted official-sample pilot

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
- exact printed-page citations for every unit;
- 150 supplemental practice drafts retained but quarantined from the active Unit path;
- persistent Unit and `R` portal controls;
- a curriculum/assessment source ledger;
- compatibility redirects from the removed generic Reading routes;
- no reproduced Benchmark selection text and no invented official lesson content.
- one source-faithful interactive pilot at `/ruchika/grade3/reading/units/u1/lessons/1`, controlled by Benchmark Education's official Grade 3 Unit 1 Week 1 sample and requiring the school Texts for Close Reading pages 4–5.

## Current Source Gate

- Year and Unit map: ready from verified public evidence.
- Daily lesson authoring: globally blocked; only `u1-w1-l1` is admitted from the official public sample, and its student passage remains in the school book.
- Official assessment authoring: blocked; the repository does not contain the matching Grade 3 assessment and scoring materials.
- Current Baker pacing: not publicly verified.

Run `npm run validate:reading-source-readiness` from `interactive-grade3-app/` to verify that missing official materials cannot be silently treated as lesson-ready.

The former generic Home/Learn/Library/Levels organization, three invented starter texts, fixed timing routine, and standards-code homepage are removed. F&P and other assessments appear only as sourced context, not as the Reading curriculum architecture.
