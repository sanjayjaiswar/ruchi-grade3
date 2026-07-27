# Module 5 Teacher Edition Problem Set acceptance

Accepted: 2026-07-26

Scope: all 30 Module 5 Problem Set lessons, Blank and Solved.

## Scope and completion bar

- The fingerprinted Teacher Edition page image is the sole visual and factual authority.
- Every one of the 158 official tasks must preserve its printed fraction primitives, quantities, orientation, grouping, labels, directions, and response space. OCR is a locator only.
- Blank shows the exact task-bearing Teacher Edition page crop first, with no authored prompt list, substitute fraction model, answer note, or solved scaffold.
- Solved shows that same exact task crop first and adds only the numbered Teacher Edition answer-key evidence.
- An implementation-authored fraction strip, number line, explanation, validation checklist, or inferred answer cannot satisfy or override this contract.

## Teacher Edition contract

| Lesson | Teacher pages | Problems | Primary learning model |
|---:|---:|---:|---|
| 1 | 12–21 | 5 | Partition concrete wholes and count unit fractions |
| 2 | 22–30 | 4 | Fold fraction strips into equal parts |
| 3 | 31–40 | 6 | Draw pictorial area models of unit fractions |
| 4 | 41–53 | 6 | Identify the same fraction in different wholes |
| 5 | 54–63 | 4 | Define unit fractions numerically from partitioned wholes |
| 6 | 64–74 | 3 | Build non-unit fractions from unit fractions |
| 7 | 75–85 | 11 | Name shaded and unshaded parts as fractions |
| 8 | 86–97 | 6 | Decompose a whole with fraction number bonds |
| 9 | 98–111 | 3 | Build fractions greater than one whole |
| 10 | 112–123 | 5 | Compare unit fractions with fraction strips |
| 11 | 124–135 | 10 | Compare unit fractions only after identifying each whole |
| 12 | 136–147 | 6 | Reconstruct a whole from one equal part |
| 13 | 148–167 | 7 | Rename a shaded part when the designated whole changes |
| 14 | 168–177 | 3 | Place fractions on the number line from 0 to 1 |
| 15 | 178–187 | 3 | Place any fraction between 0 and 1 |
| 16 | 188–199 | 4 | Place whole-number fractions and fractions between wholes |
| 17 | 200–210 | 5 | Practice varied fraction placements on number lines |
| 18 | 211–220 | 8 | Compare fractions and whole numbers by distance from 0 |
| 19 | 221–233 | 5 | Compare by position and distance on a number line |
| 20 | 234–244 | 4 | Recognize equal-size fractions in different shapes |
| 21 | 245–254 | 5 | Recognize equivalent fractions at the same number-line point |
| 22 | 255–264 | 5 | Generate simple equivalent fractions with models and lines |
| 23 | 265–275 | 6 | Generate more equivalences on partitioned number lines |
| 24 | 276–288 | 4 | Express whole numbers as equivalent fractions |
| 25 | 289–303 | 3 | Locate whole-number fractions when the unit interval is 1 |
| 26 | 304–315 | 4 | Decompose whole-number fractions greater than 1 |
| 27 | 316–328 | 5 | Explain equivalence by changing unit size and number of units |
| 28 | 329–339 | 8 | Compare fractions with the same numerator pictorially |
| 29 | 340–351 | 9 | Compare same-numerator fractions with models and symbols |
| 30 | 352–359 | 1 | Transfer equal partitions to an arbitrary whole with a number-line method |

Total: **30 lessons and 158 official Problem Set items**.

## Durable source evidence and implementation

- Reviewed per-task evidence: `teacher-edition-baseline/module-5-problem-evidence.json`
- Source-only visual contracts: `teacher-edition-baseline/visual-layout-contracts/m5/lesson-01.json` through `lesson-30.json`
- Runtime evidence derivative: `src/app/data/lessons/m5/source-problem-evidence.generated.ts`
- Source-first Problem Set delivery: `src/app/data/lessons/m5/problem-set-centered.ts`
- Durable source gate: `scripts/validate-source-visual-contracts.mjs`

Run:

```bash
npm run validate:teacher-baseline
npm run validate:source-visual-contracts -- --lessons m5-l1,m5-l2,m5-l3,m5-l4,m5-l5,m5-l6,m5-l7,m5-l8,m5-l9,m5-l10,m5-l11,m5-l12,m5-l13,m5-l14,m5-l15,m5-l16,m5-l17,m5-l18,m5-l19,m5-l20,m5-l21,m5-l22,m5-l23,m5-l24,m5-l25,m5-l26,m5-l27,m5-l28,m5-l29,m5-l30
npm run validate:problem-centered-delivery
npm run validate:solved-fidelity
npm run validate:no-pdf-problem-tabs
npm run validate:local-search
npm run build
```

All commands passed on 2026-07-26.

## Rendered Chrome acceptance

- 60 routes passed: 30 Blank and 30 Solved.
- 316 rendered task states passed: 158 Blank and 158 Solved.
- Every card had the official task count/order, exactly one source-first workspace, the contract-declared source page, and a complete 1275×1650 source image.
- Every Blank card had zero answer-key notes and zero authored prompt or solved scaffolds.
- Every Solved card had exactly one `Teacher Edition Answer Key` note matching the contract evidence and zero legacy explanation/validation cards.
- Browser console: zero errors and zero warnings.

Six Teacher Edition guidance/debrief pages that merely mention “Problem Set” were excluded as OCR/classifier false positives: PDF pages 15, 34, 67, 115, 191, and 332.

Lesson 30 is the source-documented exception. The Teacher Edition explicitly says there is no separate Problem Set sheet, so PDF page 355’s exact in-lesson cooperative Problem Set directions control its one route; no worksheet or replacement model is invented.
