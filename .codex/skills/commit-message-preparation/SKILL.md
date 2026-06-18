---
name: commit-message-preparation
description: Use when the user asks for a commit message, checkpoint message, or save-work summary. Prepares structured commit text only; never executes git history commands.
---

# Commit Message Preparation

Use this when preparing commit text.

## Rules

- Never run `git commit`, `git push`, `git merge`, `git rebase`, or any command that writes git history.
- Review the actual current diff before preparing commit text.
- Summarize the real changed files and validation, not memory from earlier conversation.
- Do not include raw credentials, private identifiers, or unrelated sensitive data.
- Do not frame tracker files as the main shipped work.

## Required Wrapper

Use this lead-in, replacing the repo name:

```text
detailed commit msg in md format in copy code block for <repo name>.
```

Then emit exactly one fenced Markdown block:

```md
# <Concise Heading>

## Summary
- <full-scope bullet 1>
- <full-scope bullet 2>
- <full-scope bullet 3>

## Changes

### <Area>
- <specific bullet>
- <specific bullet>

## Verification
- <command or validation>
```

## Summary And Changes

- `## Summary` is not a label or one-line placeholder. It must list the complete commit scope in plain bullets.
- For broad commits, include every major workstream in `## Summary` before the detailed section.
- `## Changes` is where the same scope is broken down by area with `###` subheadings.
- For small commits, `## Changes` can be omitted only when the `## Summary` bullets already cover all meaningful details.

Useful area names:

- `Product Changes`
- `Runtime Data`
- `Scripts And Tooling`
- `Docs And Instructions`
- `Browser Safety`
- `Validation`

## Content

- Heading should describe the change, not the repo name.
- Include all meaningful files in the intended commit scope.
- Keep it commit-ready, not conversational.
- If no commit is recommended, explain why outside the wrapper and do not emit a fake commit block.
