# Interactive Grade 3 App

Angular app for the Grade 3 Eureka Math teacher-led interactive lesson portal.

For full workspace setup, source PDF requirements, and regeneration instructions, see the root [README.md](../README.md).

## Run Locally

From the workspace root:

```bash
scripts/grade3_app_start.sh
```

Open:

```text
http://localhost:4220/ruchika-grade3/
```

From this app directory directly:

```bash
npm install
npm start
```

The `npm start` script serves on port `4220`.

## Build

```bash
npm run build
```

Expected result:

- Build succeeds.
- Angular may print budget warnings for bundle size and `lesson.css`; those are warnings unless Angular reports an error.

## Important Generated Data

The app imports source-backed Solve-tab data from:

```text
src/app/data/student-work-source.generated.ts
```

That file is generated from local Eureka Math PDFs by the workspace-root script:

```bash
node scripts/generate-student-work-source.mjs
```

Run that command from the workspace root, not from this app directory. It requires `pdftotext` from Poppler.

## Source Content Rules

- Teacher Edition PDFs drive lesson objectives, teacher guidance, and debrief focus.
- Student Workbook PDFs drive Solve-tab problem-set prompts.
- Visual previews in the Solve tab must match the prompt and equations.
- Do not hand-edit `student-work-source.generated.ts`; rerun the generator.
