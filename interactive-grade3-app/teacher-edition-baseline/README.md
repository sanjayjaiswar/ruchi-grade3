# Teacher Edition lesson baseline

This folder is the durable, precomputed source-of-truth layer for all 152 Grade 3 lessons. Normal lesson repair starts here; it does not repeat PDF extraction, OCR, page discovery, or source-contract preparation.

## What is included

- `index.json`: lookup for all seven modules and 152 lessons.
- `contracts/mN/lesson-XX.json`: one complete source contract per lesson.
- `schema.json`: field descriptions and controlling-evidence order.

Each contract records the exact Teacher Edition objective and page range, instructional sequence, teacher prompts, Problem Set and answer-key text, source images, detected mathematical models, animation evidence, and Blank/Solved delivery rules. It also includes the Teacher Edition PDF fingerprint so stale source data is detected.

Page-level visual-layout contracts live under `visual-layout-contracts/mN/lesson-XX.json`. They bind controlling page images to the Teacher Edition PDF fingerprint and record only Teacher Edition observations: source text, answer-key evidence, primitive/count/orientation/grouping, response layout, and Blank/Solved answer isolation. They must not name renderers, components, runtime paths, or implementation-authored expectations. Validation converts the implementation to a neutral canonical layout signature and compares it with those source observations. Contract refresh commands may update source fingerprints, but must preserve the reviewed expectations and must never regenerate them from app/runtime code.

Module-wide source-only answer transcriptions may accompany those contracts when the flattened answer-key text cannot reliably preserve numbered multi-column relationships. `module-3-problem-answer-evidence.json` is one such transcription: it is bound to the Teacher Edition PDF fingerprint, covers every official lesson/problem in Module 3, and is consumed by contract refresh before runtime validation. It is never generated from lesson implementation code.

## Normal repair workflow

1. Run `npm run validate:teacher-baseline` from `interactive-grade3-app`.
2. Use `index.json` to open only the requested lesson contracts.
3. Compare those contracts with the existing lesson implementation.
4. Inspect all Problem Set page images and author the batch visual-layout contracts.
5. Run `npm run validate:source-visual-contracts -- --lessons mN-lX,...` and confirm the pre-correction implementation fails where it drifts.
6. Fix content, models, interaction, animation, and Blank/Solved behavior until both source validators pass.

Do not parse the PDFs during a normal lesson pass. Run `npm run generate:teacher-baseline` only when validation reports a missing contract, changed PDF fingerprint, or invalid baseline.

## Evidence rules

Teacher Edition drift is blocking. When a fingerprinted printed task image exists, retain its exact task crop as the first learner-facing representation; supplementary explanation may follow it. Reconstruct a task only when no usable source image exists, and then contract its printed primitive, count, orientation, grouping, wording, and response structure before implementation. Within a contract, use evidence in this order:

1. `problemSet.problemSetText` and `sourceText.problemSetPages`
2. `problemSet.answerKeyProblemSetText` and `sourceText.answerKeyPages`
3. `instructionalContract` source blocks and teacher/student sequence
4. `problemSet.extractedProblems` only when `structuredPromptStatus` is `ready`

If `structuredPromptStatus` is `review-source-layout`, the source uses a multi-column, paired-item, or nonstandard Problem Set layout. The raw source text and listed workbook image are controlling; do not assume flattened prompt order is correct.

Special instructional modes such as `embedded-cooperative-problem-set`, `fluency-review`, and `resource-creation` preserve the Teacher Edition structure instead of inventing a standard Concept Development or Problem Set sheet.

## Maintenance

```bash
npm run generate:teacher-baseline
npm run validate:teacher-baseline
```

The extraction cache is stored under the ignored repository path `tmp/teacher-edition-cache/`. It is reusable preparation data, not a committed source contract.
