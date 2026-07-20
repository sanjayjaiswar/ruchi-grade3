# Grade 3 Eureka Math Interactive App Workspace

This workspace contains the Grade 3 Eureka Math source PDFs, generated source-backed lesson data, and the local Angular app used for teacher-led interactive lessons.

## Quick Start On A New Computer

Run these commands from the workspace root:

```bash
cd "/path/to/Grade3"
npm --prefix interactive-grade3-app install
scripts/grade3_app_start.sh
```

Open:

```text
http://localhost:4220/ruchika-grade3/
```

The start script dispatches the Angular app on port `4220` and returns immediately while Angular compiles in the background. It writes logs under `tmp/logs/` and creates `tmp/grade3-app-context-latest.txt` with the current run context.

Running the start script again reuses a healthy Angular watcher and returns immediately. Use a forced restart only when the watcher itself must be replaced:

```bash
scripts/grade3_app_start.sh restart
```

This internal app uses the same fast, unoptimized, non-strict template configuration for serving and normal builds. There are no MB-scale limits: Angular only emits a non-blocking warning if total build output reaches 1 GB.

## Prerequisites

Required:

- Node.js 20 or newer.
- npm 10 or newer.
- A shell with common Unix tools: `bash`, `lsof`.

Recommended:

- `screen`, so `scripts/grade3_app_start.sh` can keep the dev server in a named background session. If `screen` is missing, the script falls back to `nohup`.
- Poppler, for `pdftotext`, only when regenerating source-backed student work data.

Install examples:

```bash
# macOS with Homebrew
brew install node poppler screen

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y nodejs npm poppler-utils screen
```

Check versions:

```bash
node --version
npm --version
pdftotext -v
```

## Workspace Layout

| Path | Purpose |
| --- | --- |
| `EurekaMath-Sources/` | Local Eureka Math PDFs. Teacher editions are the curriculum source of truth. Student workbooks provide the Solve tab problem-set content. |
| `interactive-grade3-app/` | Angular app. |
| `interactive-grade3-app/src/app/data/student-work-source.generated.ts` | Generated student workbook and Teacher Edition reference data for all 152 lesson routes. |
| `scripts/generate-student-work-source.mjs` | Regenerates `student-work-source.generated.ts` from the local PDFs using `pdftotext`. |
| `scripts/grade3_app_start.sh` | Starts, stops, and reports status for the local Angular app. |
| `docs/interactive-grade3/` | Requirements, design notes, source rules, audits, and task tracking. |
| `tmp/` | Local logs and temporary files. Safe to recreate. |

## Source PDFs Required

Keep these files in the same paths and names. The generated data script depends on them.

```text
EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_1/g3_m1_student_wkbook_v1_3_1.pdf
EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_2/g3_m2_student_wkbook_v1_3_0.pdf
EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_3/g3_m3_student_wkbook_v1_3_0.pdf
EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_4/g3_m4_student_wkbook_v1_3_0.pdf
EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_5/g3_m5_student_wkbook_v1_3_1.pdf
EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf
EurekaMath-Sources/Module_6/g3_m6_student_wkbook_v1_3_1.pdf
EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf
EurekaMath-Sources/Module_7/g3_m7_student_wkbook_v1_3_1.pdf
```

Additional materials PDFs are also kept in `EurekaMath-Sources/`, but the current app setup does not require them for startup.

## Run The App

From the workspace root:

```bash
scripts/grade3_app_start.sh
```

Useful commands:

```bash
scripts/grade3_app_start.sh status
scripts/grade3_app_start.sh context
scripts/grade3_app_start.sh restart
scripts/grade3_app_start.sh stop
```

Environment overrides:

```bash
GRADE3_PORT=4300 scripts/grade3_app_start.sh
GRADE3_HOST=0.0.0.0 GRADE3_PUBLIC_HOST="<your-computer-ip>" scripts/grade3_app_start.sh
```

Use the second form only when you intentionally want another device on the same network to open the app.

Find your local network IP:

```bash
# macOS, usually Wi-Fi
ipconfig getifaddr en0

# Linux
hostname -I | awk '{print $1}'
```

## Build

From the Angular app directory:

```bash
cd interactive-grade3-app
npm run build
```

Current expected result:

- Build uses the fast internal-app configuration.
- There are no MB-scale bundle limits. A build emits a warning, but does not fail, only if total output reaches 1 GB.
- A cold launch does not wait for a health check. If it is still not listening after two minutes, the launcher writes one warning to `tmp/logs/grade3-app-latest.log`.

## Regenerate Student Workbook Source Data

Only do this when the source PDFs change or when you intentionally want to refresh extracted Solve-tab content.

From the workspace root:

```bash
pdftotext -v
node scripts/generate-student-work-source.mjs
cd interactive-grade3-app
npm run build
```

Expected generator output:

```text
Generated 152 lesson student-work entries.
```

The generator writes:

```text
interactive-grade3-app/src/app/data/student-work-source.generated.ts
```

Do not hand-edit that generated file. Update the generator or source PDFs, then rerun the script.

## App Content Contract

- Teacher Edition PDFs are the source of truth for objectives, lesson sequence, teacher guidance, and debrief focus.
- Student Workbook PDFs provide the Solve tab problem-set content.
- The app currently covers all 152 Grade 3 lesson routes across Modules 1-7.
- Lesson Solve visuals must match the workbook prompt/equations. Do not use generic arrays or dots that contradict the problem.
- Do not use all-caps instructional headings in the UI.

## Repeatable Teacher Edition Lesson Repair

Use the repository skill whenever a lesson needs the same source-faithful repair and visual acceptance process used for Lessons 20 and 21:

```text
Use $fix-eureka-lesson to fix Module 2 Lesson 21.
```

The skill is stored at `.codex/skills/fix-eureka-lesson/`. It requires the Teacher Edition as the source of truth, preserves every official problem and mathematical relationship, implements distinct Blank and Solved states, runs the durable source-contract validator and build, and visually checks Concept, Blank, Solved, and Summary in an isolated authorized Chrome tab. Its Lesson 20 baseline is documented in `.codex/skills/fix-eureka-lesson/references/lesson-20-baseline.md`.

Changing the module and lesson numbers is the only routine input. Do not treat an existing portal lesson, generic component coverage, or a successful build as proof that the lesson is complete.

## Troubleshooting

If dependencies are missing:

```bash
npm --prefix interactive-grade3-app install
```

If port `4220` is busy:

```bash
scripts/grade3_app_start.sh stop
scripts/grade3_app_start.sh
```

Or use another port:

```bash
GRADE3_PORT=4300 scripts/grade3_app_start.sh
```

If the app fails to start, inspect:

```bash
tail -n 120 tmp/logs/grade3-app-latest.log
scripts/grade3_app_start.sh context
```

If source regeneration fails with `pdftotext` not found, install Poppler:

```bash
brew install poppler
```

or:

```bash
sudo apt-get install -y poppler-utils
```

## Git And Copy Notes

For another computer, copy or clone the full workspace, including:

- `EurekaMath-Sources/`
- `interactive-grade3-app/`
- `scripts/`
- `docs/`
- root `README.md`

Do not rely on `node_modules/` being copied. Run `npm --prefix interactive-grade3-app install` on the new computer.

## Key Docs

| Doc | Purpose |
| --- | --- |
| `docs/interactive-grade3/requirements.md` | Product/content requirements. |
| `docs/interactive-grade3/design-spec.md` | UI and interaction design requirements. |
| `docs/interactive-grade3/curriculum-source-spec.md` | Rules for extracting and using source content. |
| `docs/interactive-grade3/lesson-authoring-playbook.md` | Rules for authoring source-backed lessons. |
| `docs/interactive-grade3/source-audit.md` | Source alignment audit. |
| `docs/interactive-grade3/requirements-delivery-audit.md` | Content/design delivery audit. |
| `docs/interactive-grade3/task-tracker.md` | Task status, decisions, validation log. |
| `docs/interactive-grade3/worktree-and-operations.md` | Local operating rules. |
