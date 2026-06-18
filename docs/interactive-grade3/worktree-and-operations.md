# Worktree And Operations Guide

Date: 2026-06-18
Status: Draft baseline

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

The Grade3 workspace is currently not a git repository.

Observed result:

```text
fatal: not a git repository
```

Therefore:

- There is no current branch.
- There is no current git worktree.
- There is no git status to preserve.
- Do not run `git add`, `git commit`, `git push`, `git merge`, `git rebase`, or `git worktree` commands unless the user explicitly requests git setup.

## 4. Recommended Future Git Setup

Only if the user explicitly asks to initialize git or create a worktree:

Option A: Initialize this Grade3 folder as a repo.

```bash
git init
```

Option B: Create a separate implementation repo elsewhere.

Requires explicit path approval.

Option C: Create a git worktree from an existing repo.

Requires:

- source repo path,
- branch name,
- target worktree path,
- explicit approval.

Until then, treat "worktree" as an operational planning concept, not an active git mechanism.

## 5. Task Docs

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

Do not store task plans in `AGENTS.md`.

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
http://localhost:4220/ruchika-grade3/
```

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
http://localhost:4220/ruchika-grade3/
```

Use a different port if occupied.

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
