# Repository Instructions

## Scope

- Only work within this repository unless explicitly instructed otherwise.
- Do not alter any file system path or any other repository unless the user explicitly approves that exact path and action.
- External paths, cloud folders, personal folders, mounted drives, browser data, application data, system areas, and synced storage are denied by default.
- Full Access means technical capability, not authorization.

## Desktop-First Responsive Scope

- Optimize the application primarily for desktop browsers on common 13-inch and 15-inch Mac display sizes.
- “Responsive” means supporting different desktop viewport widths unless the user explicitly requests mobile or tablet work.
- Do not spend time optimizing, testing, or polishing tablet or mobile layouts by default.
- Perform only minimal small-screen safeguards needed to prevent catastrophic breakage; defer dedicated tablet and mobile design until explicitly requested.
- Prioritize completing and visually validating the desktop experience before considering smaller-device refinements.

## Educational Source Fidelity

- Treat every statement about an official syllabus, curriculum, program, module or unit sequence, grade-level requirement, learning standard, assessment, reading level, placement, district practice, county guidance, school practice, instructional schedule, or required time allocation as a factual claim.
- Do not invent, infer, extrapolate, or present an app-authored synthesis as official educational content.
- Before placing a factual educational claim in application code, UI copy, or documentation, verify it against a directly relevant primary source from the responsible state, county, district, school, government research body, or official framework publisher.
- Put a direct source link beside the claim in the learner-facing or parent-facing UI whenever that claim is displayed there. A source list on a different page is not sufficient.
- If an official source does not support a claim, omit the claim. If public sources conflict or appear stale, show the discrepancy and mark the matter unverified instead of choosing or guessing.
- Clearly label app-authored explanations, examples, passages, questions, and practice activities as original supplemental material—not official Baker, Moreland, SCCOE, California, Benchmark Advance, assessment-provider, or publisher content.
- Creativity is allowed inside clearly labeled supplemental explanations and practice activities. Creativity is not allowed when stating what the official curriculum, syllabus, standards, assessment program, school, district, county, or state requires.
- Before declaring educational-content work complete, maintain and validate traceability from each displayed factual claim to its exact primary source and implementation location.

## Agent-Control Policy

- Agent-control files and settings are security-sensitive, including any current or future instruction, policy, configuration, tool, connector, automation, hook, memory, permission, or mechanism that changes agent behavior.
- Do not create, edit, delete, move, rename, override, or broadly rewrite agent-control mechanisms unless the user explicitly authorizes the exact target and action in the current task.
- Do not weaken deny-by-default, privacy, sensitive-data, student-data, financial-data, browser/screen, Computer Use, external-path, git, live-system, or destructive-action boundaries unless the user explicitly approves the exact policy change.

## Sensitive Information

- Treat student data, educator data, account names, account identifiers, private documents, local exports, screenshots/appshots, generated reports, credentials, tokens, and any personal or financial information as sensitive unless clearly synthetic.
- Never expose sensitive information in any LLM-facing prompt, exported prompt file, external report payload, screenshot, commit, log, doc, or external tool.
- If sensitive values exist in repo data, UI tables, inputs, logs, generated text, or screenshots, omit, redact, or aggregate them before including them in any response, prompt, export, or report.
- Do not upload, send, share, paste, screenshot, summarize, or export sensitive files unless the user explicitly authorizes that exact file and action.

## Browser And Screen Privacy Boundary

- Browser, Chrome, debugging, screenshots, and Computer Use screen access are deny-all by default. Full Access does not override this boundary.
- Use `.codex/skills/browser-profile-validation/SKILL.md` before browser/screen work.
- Browser/profile authorization is work-scoped only. It never authorizes inspecting cookies, local storage, session storage, browser history, downloads, saved passwords, extension data, bookmarks, bookmark menus, autocomplete suggestions, page titles/URLs unrelated to the task, local files, other tabs, other profiles, account settings, account switchers, or unrelated screen content.
- Default allowed Chrome profiles: `Gemini` / `Gemini SJ` for browser/debug/Computer Use work; `EdZilla` / `Sanjay Jaiswar` only for EdZilla Gmail/email workflows.
- For any Chrome work, use an agent-owned tab or dedicated Chrome session/tab group by default so existing user work is not disrupted. Do not reuse, navigate, reload, or claim the user's current tab unless the user explicitly asks to use that exact tab or a more specific repo skill permits a different approach.
- Foreground status is not authorization. If an allowed target profile/window such as `Gemini` / `Gemini SJ` is available but a different personal or unrelated profile/window is foregrounded, target the allowed profile/window directly without inspecting, summarizing, or reporting the foreground content.
- Before any browser/screen inspection, verify the target profile/window is default-allowed or explicitly authorized for the current task.
- If the active browser profile, window, or visible screen is not clearly default-allowed or explicitly authorized, stop without inspecting content and ask the user to open or authorize the correct profile/window.
- External financial websites, brokerage/bank/account portals, tax sites, billing portals, and pages that may show financial account data are barred from browser/screen capture, screenshots, scraping, DOM inspection, summarization, and reporting by default.
- Sensitive financial domains are excluded by default, including Fidelity, Bank of America, Chase, ICICI Bank, American Express, Capital One, Wells Fargo, U.S. Bank, Schwab, Vanguard, and IRS sites. Do not claim, screenshot, read, click, scroll, summarize, or report full titles/URLs from excluded domains. Report only that sensitive or excluded content is visible and stop.
- Do not fall back to Playwright, Puppeteer, temporary headless profiles, bundled in-app browsers, unauthenticated browser contexts, raw HTTP fetches, or generated browser sessions for financial browser work.
- If sensitive, confidential, financial, security, credential, account, billing, healthcare, legal, government, private email, or unrelated personal content is visible or likely to be captured, report only that sensitive or unrelated content is visible and stop before inspection or screenshot.

## Computer Use And Desktop App Boundary

- Computer Use and screen access are denied by default for all Mac apps, finance apps, browser windows, account portals, Finder folders, notifications, menus, account switchers, clipboard contents, password managers, cloud-sync clients, messaging apps, email clients, and system settings.
- Use Computer Use only when explicitly requested or authorized for the current task, and only for the named app/window/action.
- Do not use Computer Use to delete, move, upload, sync, share, send, submit, purchase, change settings, approve, grant access, or perform state-changing actions unless the user explicitly authorizes that exact action.

## High-Power Capabilities

- Shell, Browser, Chrome extension, Computer Use, screenshots, appshots, passive context, memories, connectors, MCP tools, plugins, automations, and future capabilities are denied by default unless explicitly authorized for the current task.
- Authorization for one capability does not authorize another capability or unrelated data.
- Shell commands are scoped to this repository by default. Do not inspect external paths, app data, browser data, system areas, secrets, environment dumps, shell history, or unrelated repositories unless explicitly authorized.
- Appshots, memories, screenshots, previous context, and passive context may inform only the current authorized task; they never authorize inspecting, summarizing, storing, or acting on sensitive or unrelated content.

## Git

- Do not run `git add`, `git commit`, `git push`, `git merge`, `git rebase`, or other staging/history-writing commands unless the user explicitly asks for that action in the current turn.
- Commit-message requests mean prepare the message only, not execute the commit.
- Before preparing a commit message, inspect the actual changes instead of guessing.
- Do not stage, commit, or upload `.env`, credentials, secrets, private data files, spreadsheets, PDFs, CSV exports, statements, backups, generated archives, screenshots, or appshots unless the user explicitly authorizes that exact file and action.

## Live Systems And Destructive Actions

- Production, QA, staging, deployment, SSH, database, remote server, cloud console, and admin-console actions are read-only by default.
- Do not deploy, restart, stop services, modify remote files, run database writes, change settings, rotate keys, grant/revoke access, send messages, submit forms, make purchases, or trigger production/QA side effects unless the user explicitly authorizes that exact action.
- Do not delete, overwrite, move, rename, sync, bulk-clean, archive, or replace files/data unless the user explicitly asks for that exact target and action.
- If an operation can affect live users, money, credentials, access, production data, or irreversible state, stop and confirm before acting.

## Repo Skills

- For browser, Chrome, debugging, screenshot, or Computer Use work, use `.codex/skills/browser-profile-validation/SKILL.md` first.
- For any commit-message, checkpoint-message, save-work, commit-discussion, or "what should I commit" request, use `.codex/skills/commit-message-preparation/SKILL.md` before responding.

## Commit Message Requests

- Commit execution is barred by default. Never run `git commit`, `git merge`, `git rebase --continue`, `git push`, or any command that creates, finalizes, or publishes a commit unless the user explicitly authorizes that exact git action in the current turn.
- Do not provide one-line plain-text commit messages for this repository. Commit-message output must follow the required wrapper and Markdown structure in `.codex/skills/commit-message-preparation/SKILL.md`, unless the skill blocks the message.
- When the user wants to save work, provide only the skill-formatted commit message and let the user perform the commit unless they explicitly authorize commit execution in the current turn.
- Before writing any commit message, review the actual changes being committed and do not guess or summarize from memory.
