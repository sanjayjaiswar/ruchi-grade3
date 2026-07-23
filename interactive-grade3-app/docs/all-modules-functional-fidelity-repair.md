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

## Curriculum-wide classroom-layout pass — 2026-07-22

The model-dominant layout first accepted in Module 3 Lessons 1–5 is now implemented across all seven modules and all 152 lessons. The reusable rule is not one generic font or copied composition: the supporting explanation is compact, while the live teaching board is sized by mathematical model family and then refined for source-distinct lesson dimensions.

| Model family | Durable layout behavior |
| --- | --- |
| Equal groups | Large manipulatives with readable group labels and wrapping for larger source counts. |
| Arrays | Source row/column proportions are preserved; dot size is selected for each base-array dimension, including narrow `1 × 4`, tall `2 × 12`, and square `10 × 10` models. |
| Tape diagrams | Whole/part relationships use the wide board; unknown-position cards and the Module 6 Lesson 2 eight-unit tape receive layouts that do not clip. |
| Number lines and time | Timelines, capacity scales, rounding cards, and estimate comparisons use distinct wide compositions; stopwatch models are no longer capped at their compact problem-card width. |
| Measurement | Spring scales, comparison cycles, place-value disks, and regrouping models use classroom-scale marks and labels. |
| Area, fractions, graphs, clocks, geometry | Semantic visual workspaces receive the full model stage while retaining each source-specific structure. |

Live acceptance used only the isolated, user-authorized `Grade3` Chrome tab:

- 152 Concept routes rendered with a model stage of at least 1,282 px, every Replay control present, no document overflow, and 23 distinct rendered model configurations replayed.
- 152 Blank Problem Set routes rendered; panels used at least 98% of the lesson canvas and visual workspaces at least 90% of their cards.
- 152 Solved Problem Set routes passed the same width and overflow checks.
- 152 Summary routes rendered; panels used at least 98% of the lesson canvas and live text was at least 13 px.
- The complete current sweep therefore covered 608 lesson states. No route or panel was missing and no document-level horizontal overflow occurred.

The durable delivery validator now checks the global classroom board, model-family rules, per-lesson source-dimension hooks, module/lesson DOM identifiers, widened stopwatch board, and non-clipping Module 6 Lesson 2 tape layout. Teacher Edition content and numeric provenance remain controlled by the existing 152 lesson contracts; this pass changes presentation scale and layout, not curriculum facts.

### Fluid readability acceptance rule

Using the available canvas is necessary but is not sufficient. Concept, Problem Set Blank, Problem Set Solved, and Summary must also scale their instructional content from the width of the containing lesson canvas:

- Prose, prompts, labels, mathematical expressions, spacing, and model geometry use container-relative `clamp(...)` tokens. They do not assume one monitor width.
- Broad teaching boards and semantic visual workspaces use all available card width without a fixed desktop maximum.
- Dense source tables use the compact readable token; they may grow vertically but may not fall back to 10–13 px worksheet text.
- Sparse models, equations, headings, tapes, number bonds, and manipulatives use the larger teaching tokens so full width produces greater legibility rather than additional empty space.
- Intrinsic shapes such as clocks, polygons, bottles, and vertical number lines keep their mathematical proportions while scaling within the container.
- Summary cards reflow from multiple columns to one column based on their own container, not a device-specific hard-coded page width.

The durable validator checks these tokens and final-cascade rules alongside the Teacher Edition content contracts. Visual acceptance must sample both a wide lesson canvas and a constrained lesson canvas, in both Blank and Solved states, before this rule is considered delivered.

## Complete fluid-layout verification — 2026-07-22

The final live pass opened every learning surface for every lesson in the isolated, user-authorized `Grade3` Chrome tab. It checked the rendered result rather than inferring presentation quality from source code.

| Surface | Live routes | Acceptance applied |
| --- | ---: | --- |
| Concept | 152 | Required lesson model and Replay control; model-family composition measured against its owning teaching stage; readable semantic labels; no document overflow. |
| Problem Set Blank | 152 | Official prompts and Blank state; visual model measured against its own problem card or source card; readable labels, tables, placeholders, and equations; no document overflow. |
| Problem Set Solved | 152 | Worked visual and explanation both present; their combined reasoning grid fills the problem card; compact expression-match and stopwatch captions were raised to the fluid reading scale. |
| Summary | 152 | Takeaway, Remember/Explain/Check, and every Problem Set meaning card present; all rows—including incomplete final rows—distribute the available width without an empty grid track. |

This pass fixed model-specific readability in elapsed-time boards, stopwatch faces, measurement references, number-line targets, addition/regrouping studios, estimation rows, place-value work, number bonds, expression matching, and Solved explanation keys. These are semantic-family rules: clocks stay clocks, tables stay tables, arrays preserve their dimensions, and sparse equations receive more emphasis than dense source data.

Summary meaning maps now wrap content-adaptively. A lesson with 1, 2, 5, 7, 9, 10, or 11 official problems does not inherit a fixed four-column hole on its last row. Cards share that row's remaining width, while the summary container collapses to one card per row when its own width is constrained.

Final live result: all 608 routes rendered with their required surface structure, readable instructional text, full owning-container use, and zero document-level horizontal overflow. Teacher Edition accuracy remains enforced separately by all 152 durable lesson contracts; the layout repair did not rewrite curriculum facts.

## Module-by-module completion re-audit — 2026-07-22

| Module | Lessons | Live routes | Remaining functional findings |
| --- | ---: | ---: | ---: |
| 1 | 21 | 84 | 0 |
| 2 | 21 | 84 | 0 |
| 3 | 21 | 84 | 0 |
| 4 | 16 | 64 | 0 |
| 5 | 30 | 120 | 0 |
| 6 | 9 | 36 | 0 |
| 7 | 34 | 136 | 0 |

Every route was reopened in the isolated `Grade3` Chrome tab. The audit verified the Concept animation and model stage, complete official Problem Set card count, Blank answer isolation, Solved visual and explanation coverage, Summary takeaway and meaning-map coverage, image loading, readable instructional text, owning-container use, and document overflow. Multi-card source compositions were measured by the complete row rather than incorrectly forcing every problem into a single full-width card.

The only new shared repair was the Problem Set navigation itself: Problem bookmarks and the Blank/Solved switch now use the same fluid child-facing label scale and tap height as the lesson canvas. The previous 12–13 px utility text no longer remains as the smallest visible Problem Set control.
