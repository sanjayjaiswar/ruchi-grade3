# Worktree And Operations Guide

Date: 2026-06-18
Status: Active operations baseline, updated 2026-08-13

## 1. Purpose

This document defines where work happens, how task docs are maintained, and how implementation should be operated safely.

## 2. Workspace Boundary

All implementation work belongs inside:

```text
/Volumes/Data2/Tutorials/Eureka Math Grade 2 - Syllabus Videos Curriculum/Grade3
```

Reference projects are read-only:

```text
/Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
/Volumes/Data/EdZillaPrj/EdZilla/scratch-prjs/design-spec/
```

Do not alter the reference projects.

## 3. Current Git/Worktree Status

The Grade3 workspace is currently an active git worktree.

Observed 2026-07-03:

```text
git rev-parse --show-toplevel
/Volumes/Data2/Tutorials/Eureka Math Grade 2 - Syllabus Videos Curriculum/Grade3

git branch --show-current
main
```

Therefore:

- Current branch: `main`.
- Current worktree root: `/Volumes/Data2/Tutorials/Eureka Math Grade 2 - Syllabus Videos Curriculum/Grade3`.
- Use `git status --short` before and after implementation work to understand the local change set.
- Do not run `git add`, `git commit`, `git push`, `git merge`, `git rebase`, or `git worktree` commands unless the user explicitly requests that git action.

## 4. Recommended Future Git Setup

Only if the user explicitly asks to create a new worktree or branch:

Option A: Create a git worktree from this existing repo.

Requires:

- source repo path,
- branch name,
- target worktree path,
- explicit approval.

Option B: Create a branch in this worktree.

Requires explicit branch name or approval to choose one.

Until then, use the existing `main` worktree for local edits and documentation updates without staging or committing.

## 5. Task Docs

The repository-wide active-work index lives at:

```text
docs/active-work.md
```

Each active, paused, or blocked initiative should have a durable file under:

```text
docs/work-items/
```

The active multi-subject portal item is `docs/work-items/grade3-multi-subject-learning-portal.md`. Keep `docs/active-work.md` lightweight; record decisions, progress, validation evidence, and resume instructions in the work-item file.

Canonical task docs live here:

```text
docs/interactive-grade3/
```

Update these docs as work proceeds:

- `task-tracker.md`: status, decisions, validation log.
- `implementation-plan.md`: phase updates.
- `requirements.md`: requirement changes.
- `design-spec.md`: design decisions.
- `curriculum-source-spec.md`: source extraction rules.
- `problem-set-centered-lesson-design.md`: active lesson shape and source-backed Problem Set requirements.
- `lesson-12-implementation-research.md`: Lesson 12 pilot research, animation baseline, and implementation constraints.

The existing `docs/interactive-grade3/task-tracker.md` remains the detailed Eureka Math history and validation record. The repository-wide active-work index and work-item files supplement it; they do not replace or flatten the Math tracker.

Do not store task plans in `AGENTS.md`.

### Portal Migration Operating Rule

- The current `/ruchika-grade3` application is the protected Math baseline.
- Start the portal migration with a build and full route-manifest baseline, not by moving or renaming the current route.
- Milestone 1 adds `/ruchika/grade3` as the portal homepage and mounts the unchanged Math application at `/ruchika/grade3/math`.
- The homepage Math card opens `/ruchika/grade3/math`.
- Keep all supported `/ruchika-grade3` home and deep links compatible with corresponding Math destinations, including module, lesson, section, and Blank/Solved state.
- After the route-only restructure, re-run the complete Math build and old/new route checks before beginning Reading work.
- Do not add Reading or shared progress/resume features in the homepage/Math-route milestone.
- Treat the Math implementation as sealed. Do not edit its curriculum data, lesson components, renderers, styles, source mappings, or behavior during portal or Reading work.
- Milestone 1 may change route composition only: register the portal homepage, mount the existing Math shell under the Math prefix, and add precise legacy compatibility. Do not refactor the Math shell while moving its route boundary.
- Milestone 1 passed its build, 304-route parity, route-state, visual, and console validation gates.
- Milestone 2 adds only the isolated Reading shell, Reading routes/content, portal-card activation, and Reading documentation. It passed build, Reading interaction, shared-home, representative Math deep-link, legacy redirect, and console validation without editing the sealed Math implementation.
- Do not create a real branch or git worktree for the portal unless the user explicitly asks for that git action.
- Use `grade3-learning-portal-architecture.md` for the complete migration, validation, and rollback contract.

## 6. App Folder

Implementation folder:

```text
interactive-grade3-app/
```

Why:

- Keeps Angular-generated files separate from source PDFs.
- Allows docs and source files to remain clean.
- Makes future git setup easier.

Current structure:

```text
interactive-grade3-app/
  package.json
  angular.json
  src/
  public/
```

## 7. Command Policy

### Allowed For This Local App

From the app folder:

```bash
npm install
npm start
npm run build
```

Preferred local restart command from the Grade3 workspace root:

```bash
scripts/grade3_app_start.sh
```

This command:

- writes context to `tmp/grade3-app-context-latest.txt`,
- stops the named `screen` session if it exists,
- stops any listener on port `4220`,
- starts Angular in a detached `screen` session,
- writes logs to `tmp/logs/grade3-app-latest.log`,
- writes the listener PID to `tmp/logs/grade3-app.pid`,
- checks that `http://127.0.0.1:4220/` responds.

Manual local serve command:

```bash
cd interactive-grade3-app
npm start
```

Configured local URL:

```text
http://localhost:4220/ruchika/grade3
```

Configured Math URL:

```text
http://localhost:4220/ruchika/grade3/math
```

Legacy Math compatibility remains at `http://localhost:4220/ruchika-grade3/` and its supported deep links.

### Requires Explicit Approval

- Creating or modifying git history.
- Creating an actual git worktree.
- Installing global packages.
- Running browser or screenshot validation.
- Using external accounts or connectors.
- Editing reference projects.
- Deleting, moving, or replacing source PDFs.

## 8. Validation Commands

Once app exists:

```bash
cd interactive-grade3-app
npm run build
```

For local run:

```bash
scripts/grade3_app_start.sh
```

Configured local URL:

```text
http://localhost:4220/ruchika/grade3
```

Math URL: `http://localhost:4220/ruchika/grade3/math`. Legacy `/ruchika-grade3/` URLs remain compatible. Use a different port if occupied.

## 9. Documentation Update Rules

When starting a phase:

- Mark phase task `In progress`.
- Record date and scope.

When finishing a task:

- Mark task `Done`.
- Add validation evidence.
- Add blockers or follow-ups if any.

When a decision changes:

- Update `Current Decisions`.
- Add change log entry.

When validation fails:

- Record the command.
- Record concise failure reason.
- Record next action.

## 10. Source Artifact Rules

Do not modify:

- `EurekaMath-Sources/**/*.pdf`
- `tmp/req.txt`

Generated extraction/render artifacts should go under:

```text
tmp/
```

## 11. Style Architecture Operations

For lesson implementation work:

- Keep common lesson shell CSS in the common lesson styles.
- Keep reusable problem-set-centered CSS in a shared Problem Set lesson stylesheet.
- Add module-specific or lesson-specific CSS only when there is a real customization requirement.
- Lesson-specific CSS may or may not exist; it is not required for every authored lesson.
- Do not move reusable layout into a one-off Lesson 12 stylesheet.

Problem-set-centered control hierarchy is now a shared standard for all future authored modules and lessons:

- Top lesson sections, such as `Concept`, `Problem Set`, and `Summary`, are the primary section controls. They may use stronger color treatment and active-state fill.
- `Blank | Solved` is a mode switch inside the Problem Set, not another top-level section and not a peer of Problem 1, Problem 2, etc. Blank mode should use warm/yellow styling; Solved mode may use green/review styling.
- Problem bookmarks, such as `Problem 1` through `Problem 6`, are lightweight local jump links. They should read like normal blue underlined browser links, not blue pills or primary buttons.
- Do not let every control become the same blue pill. The hierarchy must make section controls, mode controls, and local problem jumps visually distinct.

For the current Lesson 12 pilot, the expected implementation shape is:

```text
lesson.css                  shared lesson shell and existing lesson flows
lesson-problem-set.css      shared problem-set-centered concept/problem/summary styles
lesson runtime data         Lesson 12-specific source-backed content and problem data
module/lesson class hooks   optional customization hook, used only when needed
```

Long-lived project docs should go under:

```text
docs/interactive-grade3/
```

App source should go under:

```text
interactive-grade3-app/
```

## 11. Safety Checklist Before Implementation

Before creating the app:

- Confirm app folder name.
- Confirm Angular version posture.
- Confirm full module and lesson route scope.
- Confirm no edits to reference projects.
- Confirm whether browser validation is allowed for the local app after creation.

## 12. Safety Checklist Before Finalizing A Task

- Build passes or failure is documented.
- Task tracker updated.
- Source references recorded for authored lesson content.
- No reference project files changed.
- No source PDFs modified.
- No git history changes made without approval.
