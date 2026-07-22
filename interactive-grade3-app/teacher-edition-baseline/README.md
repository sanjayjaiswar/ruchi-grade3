# Teacher Edition lesson baseline

This folder is the durable, precomputed source-of-truth layer for all 152 Grade 3 lessons. Normal lesson repair starts here; it does not repeat PDF extraction, OCR, page discovery, or source-contract preparation.

## What is included

- `index.json`: lookup for all seven modules and 152 lessons.
- `contracts/mN/lesson-XX.json`: one complete source contract per lesson.
- `schema.json`: field descriptions and controlling-evidence order.

Each contract records the exact Teacher Edition objective and page range, instructional sequence, teacher prompts, Problem Set and answer-key text, source images, detected mathematical models, animation evidence, and Blank/Solved delivery rules. It also includes the Teacher Edition PDF fingerprint so stale source data is detected.

## Normal repair workflow

1. Run `npm run validate:teacher-baseline` from `interactive-grade3-app`.
2. Use `index.json` to open only the requested lesson contracts.
3. Compare those contracts with the existing lesson implementation.
4. Fix content, models, interaction, animation, and Blank/Solved behavior.

Do not parse the PDFs during a normal lesson pass. Run `npm run generate:teacher-baseline` only when validation reports a missing contract, changed PDF fingerprint, or invalid baseline.

## Evidence rules

Teacher Edition drift is blocking; pixel-perfect scan reproduction is not required. Within a contract, use evidence in this order:

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
