---
name: commit-message-preparation
description: Use when the user asks for a commit message, checkpoint message, or save-work summary. Prepares structured commit text only; never executes git history commands.
---

# Commit Message Preparation

Use this when preparing commit text.

## Rules

- Never run `git commit`, `git push`, `git merge`, `git rebase`, or any command that writes git history.
- Review the actual current diff before preparing commit text.
- Before emitting a commit message, scan staged Angular component `.ts` files for inline `template:` / `styles:` blocks. If presentation markup or CSS is substantially embedded in a `.ts` component, do not provide the normal commit-message wrapper. Instead, clearly block the commit message and tell the user to split the component into external `.html` and `.scss`/`.css` files first, unless the user explicitly overrides this gate for the current turn.
- Summarize the real changed files, not memory from earlier conversation.
- Do not include raw credentials, private identifiers, student data, financial data, screenshots, appshots, or unrelated sensitive data.
- Do not frame tracker files as the main shipped work.

## Structural Commit Gate

This gate exists to prevent committing mixed logic, markup, and styles as if it were acceptable structure.

When preparing a commit message:

1. Inspect staged files with `git diff --cached --name-only`.
2. For staged Angular component `.ts` files, check whether the staged version contains substantial inline `template: \`` or `styles: [\`` content.
3. If a component mixes TypeScript logic with large inline HTML or CSS, stop before the required wrapper and respond with:
   - `Commit message blocked: Angular component mixes logic, template, and styles.`
   - The offending file path(s).
   - A direct instruction to move HTML to `*.component.html` and styles to `*.component.scss` or `*.component.css` before preparing the commit message.
4. Do not soften this as a recommendation. Treat it as a commit-message gate.
5. If the user explicitly says to override this gate for the current turn, mention the override in the relevant Changes area.

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
```

Do not add a `Verification`, `Testing`, `Validation`, or equivalent section to the commit message. Internal validation remains part of the engineering workflow, not the generated commit text.

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
- `Student Data Safety`

## Content

- Heading should describe the change, not the repo name.
- Include all meaningful files in the intended commit scope.
- Keep it commit-ready, not conversational.
- If no commit is recommended, explain why outside the wrapper and do not emit a fake commit block.
