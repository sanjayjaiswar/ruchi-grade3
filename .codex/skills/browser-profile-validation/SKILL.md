---
name: browser-profile-validation
description: Use when validating local web apps with Chrome, the Codex Chrome add-on, Browser, browser debugging, screenshots, or Computer Use. Enforces browser privacy, allowed-profile checks, and financial-site capture bars.
---

# Browser Profile Validation

Use this for local web app checks such as render validation, route checks, screenshots, Chrome add-on work, or Computer Use.

## Mandatory Privacy Gate

This skill must obey the repo `AGENTS.md` Browser And Screen Privacy Boundary before any browser, Chrome, Codex Chrome add-on, debugging, screenshot, accessibility, DOM, tab, or Computer Use action.

Do not inspect cookies, local storage, session storage, browser history, downloads, saved passwords, extension data, bookmarks, bookmark menus, autocomplete suggestions, local files, other tabs, other profiles, or unrelated screen content unless the user explicitly authorizes that exact action for the current task.

If browser UI, page content, URLs, titles, bookmarks, autocomplete, tabs, profile menus, or visible screen content may reveal banking, credit card, brokerage, fixed income, retirement, tax, payroll, insurance, healthcare, legal, government, credential, billing, invoice, statement, account settings, personal document, private email, student data, or other sensitive information, stop before inspection.

Sensitive financial domains are excluded by default, including Fidelity, Bank of America, Chase, ICICI Bank, American Express, Capital One, Wells Fargo, U.S. Bank, Schwab, Vanguard, and IRS sites. Do not claim, screenshot, read, click, scroll, summarize, or report full titles/URLs from excluded domains. Report only that sensitive or excluded content is visible and stop.

When in doubt, do less. Do not inspect first and decide later.

For Fidelity or other external financial domains, never use headless browsers, temporary browser profiles, bundled in-app browsers, unauthenticated browser contexts, raw HTTP fetches, Puppeteer, Playwright-driven hidden sessions, background tab scraping, or generated browser sessions.

If the user explicitly authorizes work on a financial domain, the authorization must name the exact site, live Chrome profile/window, and action scope for the current task. Even then, do not capture screenshots, export data, summarize account values, or inspect unrelated financial details unless those exact actions are explicitly authorized.

If the user says "live browser", "live Chrome", or "no headless", do not treat that as a ban on scoped Browser or Computer Use. Treat it as a ban on headless, hidden, temporary-profile, generated-session, unauthenticated, or non-live browser approaches. Stop only if the user explicitly says not to use browser-control or screen-control tools.

## Profile Gate

Allowed for browser work:

- `Gemini`
- `Gemini SJ`

Allowed only for EdZilla Gmail/email work:

- `EdZilla`
- `Sanjay Jaiswar`

Never inspect, screenshot, accessibility-read, click, scroll, or summarize any disallowed Chrome profile/window.

## Tool Choice

Default to the Chrome/Codex Chrome add-on workflow for repo validation, not the bundled `@Browser` / `iab` in-app browser, unless the user explicitly asks for the in-app browser.

When the user asks to use Browser and Computer Use together for this repo, interpret Browser as the authorized Chrome/Codex Chrome add-on workflow against `Gemini` / `Gemini SJ`, not the bundled `@Browser` in-app browser. If the user tags `@Browser` but the task is repo validation or any workflow that might expose sensitive financial content, this repo skill still controls tool choice and the in-app browser remains disallowed unless the user explicitly says to use the in-app browser.

1. Prefer the Chrome Codex add-on for Chrome validation. First verify the selected extension profile metadata is `Gemini` or `Gemini SJ`.
2. If another Chrome profile is foregrounded, do not inspect it. Use the Chrome add-on to target an already-open Gemini/Gemini SJ tab/window.
3. Use Computer Use for Chrome only after the target window/profile is already verified as Gemini/Gemini SJ.
4. If an allowed profile cannot be targeted without touching a disallowed profile, stop and ask the user to open the page in Gemini/Gemini SJ.

## Chrome Tab Group Boundary

For any workflow that opens or navigates Chrome tabs, use a dedicated Codex Chrome session/tab group so the user's active Chrome work is not disrupted.

- Name the Chrome session before opening or claiming tabs.
- Prefer agent-owned tabs created inside that session/tab group for local app routes and generated report pages.
- Do not reuse, navigate, or reload the user's currently selected tab.
- Do not claim existing user tabs unless the user explicitly asks to continue from that exact tab.
- If the Chrome tooling cannot create or use an isolated agent tab group/session, stop and ask before proceeding instead of using the active Chrome tab.
- Before finishing, finalize the Chrome session and omit intermediate tabs by default so local app tabs are closed/released unless the user explicitly asks to keep a page open.

## Basic Page Check

Before a minimal render check, apply the Mandatory Privacy Gate. If the page, route, title, browser UI, or visible context is sensitive or excluded, stop before reading the page.

For a minimal render check, confirm only:

- page title/header
- current route
- no route/load error

Do not read detailed page data unless the user asks for data validation and the data is within the authorized task scope.
