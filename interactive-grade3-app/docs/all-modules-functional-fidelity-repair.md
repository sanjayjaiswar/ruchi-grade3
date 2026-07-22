# All-modules functional fidelity repair

This record captures the targeted first-pass repairs made after the all-modules Teacher Edition audit. The acceptance boundary is source-faithful and usable, not pixel-perfect.

| Scope | Teacher Edition requirement restored | Live acceptance |
| --- | --- | --- |
| M5 L22 | Official shaded figures, exact equivalent pairs, fraction bars, and picture-based explanations replace generic number-line substitutions. | Concept, Blank, Solved, Summary pass; no broken crop or workspace overflow. |
| M6 L7-L9 | Raw measurement grids preserve every source value in the original 5- or 6-column structure before plotting. | All 12 states pass; table rows match their column counts and line plots remain intact. |
| M7 L4-L5 | Labeled A-L and M-X polygon sets replace placeholder classification boxes. | All 8 states pass with concrete attribute models. |
| M7 L6 | Each source construction has its requested polygon and visible attribute evidence, including a true right-triangle shape. | All 4 states pass with no overflow. |
| M7 L7-L9 | Concrete four-square tetromino and seven-piece tangram models replace generic source-piece placeholders. | All 12 states pass with visible joins/pieces and lesson-specific evidence. |
| M1-M7 validator coverage | Repository delivery validation now includes all 152 lessons, including Module 1. | 152 lessons and 674 expanded problem cards pass the delivery validator. |

Validation completed:

- `npm run validate:teacher-baseline`
- `npm run validate:problem-centered-delivery`
- `npm run validate:no-pdf-problem-tabs`
- `npm run build -- --progress=false`
- `git diff --check`
- Isolated Chrome sweep: 40 changed lesson states, 40 passed.

Minor typography, exact scan-like composition, and decorative motion remain outside this first-pass boundary unless they obscure the mathematics.

## All-module accuracy re-audit — 2026-07-21

The second pass checked the complete delivered curriculum against the precomputed Teacher Edition baseline and then exercised every lesson in live Chrome. It intentionally prioritizes mathematical and instructional fidelity over pixel polish.

| Scope | Durable result |
| --- | --- |
| M1 L1-L21 | Every lesson now uses the exact Teacher Edition objective and exact lesson-page range. All source-goal rows, concept stages, problems, and answers are covered by the Module 1 validator. |
| M2-M7 | Every problem prompt and solved numeric value is checked for provenance in its lesson's Teacher Edition Problem Set or answer-key evidence; variable student responses remain explicitly exempt. |
| M5 L8 | Restored the source figure pairs: `3/5 + 2/5`, `3/4 + 1/4`, `3/6 + 3/6`, and `2/9 + 7/9`, with official figure crops and matching fraction models. |
| M5 L9 and other improper fractions | Fraction strips now render enough equal wholes for numerators greater than denominators; shading is no longer truncated to one whole. |
| M5 L24 | Restored the exact fractions-equal-to-one pattern and Taylor's `4/4` versus her brother's `3/3` whole-pizza comparison. |
| Student-facing guidance | Removed remaining audit/acceptance wording from Module 3 checks and repaired generic Module 7 concept headings so they read as learning tasks. |
| Live Chrome coverage | 608 routes passed: Concept, Blank, Solved, and Summary for all 152 lessons. The sweep found no broken images, route errors, missing lesson panels, page-root overflow, or browser console errors. |

Final validation commands:

- `npm run validate:problem-centered-delivery`
- `npm run validate:m2-source-contract`
- `npm run validate:teacher-baseline`
- `npm run validate:no-pdf-problem-tabs`
- `npm run build -- --progress=false`
- `git diff --check`

Acceptance means the lesson objective, source quantities, answers, diagrams/models, and interaction states are functionally faithful. Decorative timing, exact scan geometry, and pixel-level matching are not required unless they change or obscure the mathematics.
