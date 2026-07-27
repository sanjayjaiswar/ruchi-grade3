# Module 7 Teacher Edition acceptance

Audited: 2026-07-26

The fingerprinted Teacher Edition is the sole visual and factual source of truth for Module 7 Problem Set Blank and Solved delivery. OCR, portal copy, generated diagrams, prior implementation, and mathematical inference are not acceptance evidence.

## Completion bar

- All 34 lessons and all 127 official tasks must appear in printed order.
- Blank must show the exact Teacher Edition task crop first, including every shape, table, chart, grid, dimension, continuation, and response space.
- Solved must show the same exact task crop first and the complete Teacher Edition Answer Key page image after it.
- Multi-page tasks must retain all controlling printed parts in order.
- A generic renderer, reconstructed diagram, inferred prompt, inferred answer, or text substitute cannot satisfy the visual contract.
- Blank must not include an Answer Key image. Solved must not replace the Answer Key with authored work.
- Every source image must match the reviewed page hash and every displayed crop must match the reviewed crop rectangle.
- Broken images, collapsed crops, wrong task order, horizontal overflow, or an unreviewed source page are failures.

Teacher Edition PDF SHA-256:
`608aafdaebc56498054708a4abf1db86ab1e2a33405f36ef54f9d47973656175`

## Reviewed task and Answer Key pages

| Lesson | Tasks | Task pages | Answer Key pages |
|---:|---:|---:|---:|
| 1 | 4 | 22–23 | 464 |
| 2 | 6 | 34–35 | 465 |
| 3 | 6 | 46–47 | 466 |
| 4 | 4 | 62–63 | 467–468 |
| 5 | 4 | 76–77 | 469–470 |
| 6 | 6 | 89–90 | 471 |
| 7 | 4 | 104–105 | 472–473 |
| 8 | 7 | 121–122 | 474–475 |
| 9 | 4 | 132–133 | 476–477 |
| 10 | 3 | 146–147 | 478–479 |
| 11 | 4 | 154 | 480 |
| 12 | 4 | 164–165 | 481–482 |
| 13 | 3 | 177–178 | 483–484 |
| 14 | 5 | 190–191 | 485–486 |
| 15 | 6 | 202–203 | 487 |
| 16 | 4 | 214–215 | 488–489 |
| 17 | 3 | 226–227 | 490 |
| 18 | 3 | 253–254 | 491 |
| 19 | 4 | 264–265 | 492 |
| 20 | 2 | 276–277 | 493–494 |
| 21 | 4 | 288–289 | 495–496 |
| 22 | 5 | 302–303 | 497–498 |
| 23 | 6 | 317–318 | 499–500 |
| 24 | 1 | 327–328 | 501–502 |
| 25 | 1 | 337 | 503–504 |
| 26 | 4 | 348–349 | 505–506 |
| 27 | 4 | 360–362 | 507–508 |
| 28 | 4 | 374–376 | 509–510 |
| 29 | 4 | 387–388 | 511–512 |
| 30 | 1 | 398 | 513 |
| 31 | 1 | 426 | 514–515 |
| 32 | 4 | 437–438 | 516–517 |
| 33 | 1 | 448 | 518–519 |
| 34 | 1 | 461–462 | 520 |

Lesson 34 has no conventional Problem Set page. Its printed Summer Math Review Calendar on lesson-resource pages 461–462 is the controlling task. Lesson 26 page 344 was an OCR/source-locator false positive; visual review confirmed that it is instructional preparation rather than a Problem Set continuation, so it is not delivered as a task page.

## Durable source contract

- Reviewed evidence: `teacher-edition-baseline/module-7-problem-evidence.json`
- Per-lesson visual contracts: `teacher-edition-baseline/visual-layout-contracts/m7/`
- Source-backed runtime: `src/app/data/lessons/m7/problem-set-centered.ts`
- Generated reviewed evidence: `src/app/data/lessons/m7/source-problem-evidence.generated.ts`
- Evidence generator: `scripts/generate-m7-reviewed-evidence.mjs`
- Contract generator: `scripts/generate-m7-source-visual-contracts.mjs`
- Runtime generator: `scripts/generate-m7-runtime-evidence.mjs`

The audit covered 132 exact task/resource crops and all 57 Answer Key pages. The source contracts preserve multi-page tasks, including Lessons 10, 24, 28, 32, and 34.

## Validation record

Before replacement, all 34 Module 7 lessons failed the source-visual contracts because the generic implementation did not match the canonical Teacher Edition layout or Answer Key evidence.

After replacement, these checks passed:

```bash
node scripts/validate-source-visual-contracts.mjs --lessons m7-l1,m7-l2,m7-l3,m7-l4,m7-l5,m7-l6,m7-l7,m7-l8,m7-l9,m7-l10,m7-l11,m7-l12,m7-l13,m7-l14,m7-l15,m7-l16,m7-l17,m7-l18,m7-l19,m7-l20,m7-l21,m7-l22,m7-l23,m7-l24,m7-l25,m7-l26,m7-l27,m7-l28,m7-l29,m7-l30,m7-l31,m7-l32,m7-l33,m7-l34
npm run validate:teacher-baseline
npm run validate:problem-centered-delivery
npm run validate:solved-fidelity
npm run validate:no-pdf-problem-tabs
npm run build
```

Live Chrome acceptance used an isolated Gemini-profile QA tab:

- 68 Blank/Solved routes passed.
- 254 card states were physically scrolled into the viewport: 127 Blank and 127 Solved.
- Exact task order, task-image count, source-image dimensions, crop aspect ratios, crop transforms, Blank leakage rules, Solved Answer Key placement, broken images, and horizontal overflow were checked.
- 68 Concept/Summary route states also passed render, selected-tab, broken-image, and overflow smoke checks.
- Representative visual inspection covered quadrilateral classification, tangram reconstruction, the multi-page robot task, unconventional halves, the Summer Math Review Calendar, and exact Answer Key presentation.

No generic visual or inferred answer is an accepted fallback for Module 7 Problem Set delivery.
