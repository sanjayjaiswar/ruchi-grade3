# Precomputed Teacher Edition baseline

Use the committed baseline for every normal lesson-repair batch:

- Index: `interactive-grade3-app/teacher-edition-baseline/index.json`
- Contracts: `interactive-grade3-app/teacher-edition-baseline/contracts/mN/lesson-XX.json`
- Schema and evidence priority: `interactive-grade3-app/teacher-edition-baseline/schema.json`
- Workflow guide: `interactive-grade3-app/teacher-edition-baseline/README.md`

From `interactive-grade3-app`, first run:

```bash
npm run validate:teacher-baseline
```

When validation passes, read exactly the contracts for the requested five-lesson batch. Do not extract, OCR, search, or render the Teacher Edition PDFs as routine preparation.

For each lesson, treat these fields as controlling:

1. `objective`
2. `instructionalContract`, including its mode and Teacher Edition sequence
3. `problemSet.problemSetText` and `sourceText.problemSetPages`
4. `problemSet.answerKeyProblemSetText` and `sourceText.answerKeyPages`
5. `visualContract`, including source model evidence and animation sequence
6. `deliveryContract` for Blank/Solved requirements

Use `problemSet.extractedProblems` as a convenience only when `structuredPromptStatus` is `ready`. When it is `review-source-layout`, compare against the raw source text and the listed `source.studentWorkbookImages`; flattened prompt order may be unreliable.

Only run this repair command when baseline validation reports that the committed data is missing, invalid, or stale relative to a Teacher Edition PDF:

```bash
npm run generate:teacher-baseline
npm run validate:teacher-baseline
```

The generator reuses the ignored `tmp/teacher-edition-cache/` extraction and fingerprints all seven source PDFs. A baseline contract is preparation evidence, not proof that the corresponding live lesson has been implemented or visually accepted.
