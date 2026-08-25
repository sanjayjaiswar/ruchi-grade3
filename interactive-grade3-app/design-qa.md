# i-Ready Interactive Design QA

## 2026-08-24 visual-teaching-first correction

### Source truth and comparison boundary

- Educational content truth:
  - `iReady-Maths/iready-grade3-volume1-548-pages-searchable.pdf`
  - `iReady-Maths/iready-grade3-teacher-guide-volume1-764-pages-searchable.pdf`
  - `iReady-Maths/iready-grade3-volume2-396-pages-searchable.pdf`
  - `iReady-Maths/iready-grade3-teacher-guide-volume2-540-pages-searchable.pdf`
- Presentation baseline: the existing i-Ready syllabus typography, blue tokens, full-width desktop framing, and the prior i-Ready lesson audit captures in `tmp/iready-tryit-audit-20260824/`.
- The other curriculum was reviewed only for content-neutral learning-focus mechanics. No lesson, model, value, answer, terminology, explanation, or curriculum structure was transferred.
- Implementation evidence: browser-rendered Volume 1 Lesson 2, Volume 1 Lesson 14, Volume 2 Lesson 20, and Volume 2 Lesson 33 captures emitted during this task. The final live state is `http://127.0.0.1:4220/ruchika/grade3/iready-interactive/lessons/2`.
- Viewport: 1280 × 720 CSS pixels, device-pixel ratio 1. Source and implementation states were inspected at the same CSS viewport; no density normalization was required.

### Intended experience

The lesson begins with source-backed visual teaching. A learner sees the official model and worked reasoning before being asked to type, draw, or recreate a paper workbook. Practice remains available as a short secondary state. Official Student Worktext and Teacher Guide pages remain inside the lesson as exact evidence rather than occupying permanent teaching space.

### Comparison history

#### Pass 1 — blocked

- P1: both volumes opened in response-entry mode. The primary teaching state was behind `Show solution`.
- P1: Student Worktext drawing and writing areas were mechanically reproduced as large canvases and textareas. A representative Volume 1 activity reached 4,850 px of document height.
- P1: Volume 2 permanently reserved a 330 px side column for a source-page screenshot, reducing the space available to the visual model.
- P2: repeated lesson/session/problem orientation pushed the actual teaching model below the first desktop viewport.

#### Fixes

- Both volumes now initialize in `Learn visually`.
- `Try one` is a separate, secondary practice state; `Check` appears only while practicing.
- Drawing and writing are inside one collapsed `Optional notes or drawing` disclosure.
- Open optional tools use a 150 px drawing surface beside a 150 px note area.
- Volume 2 source screenshots were removed from the permanent lesson grid and remain in the exact-source drawer.
- Lesson/session/problem navigation was compacted into readable single-line desktop rows without reducing the 32 px Volume 1 lesson title, 25 px session title, 18 px session phase, or equivalent Volume 2 hierarchy.
- A static visual-teaching contract was added so the first-state and compact-support rules fail closed during validation.

#### Pass 2 — passed

- Volume 1 Lesson 2 visual workspace begins at 532 px and its first teaching section begins at 580 px in the 1280 × 720 viewport.
- Volume 2 Lesson 20 visual workspace begins at 494 px and its first teaching section begins at 543 px.
- Volume 1 and Volume 2 both have zero horizontal page overflow at the validated desktop viewport.
- The previously oversized Volume 1 activity is 1,087 px in the worked-teaching state and no longer renders a paper-sized input surface by default.
- The expanded optional support is 150 px high for drawing and 150 px high for notes; it remains closed initially.

### Required fidelity surfaces

- Fonts and typography: Inter/system stack; readable optical weights; 32 px Volume 1 lesson title; 25 px Volume 1 session title; 18 px session phases; Volume 2 lesson/session hierarchy remains 28.8 px/20.8 px at 1280 px. No teaching text was reduced to solve spacing.
- Spacing and layout rhythm: compact sticky headers, 48 px single-line session rows, 46 px source-problem rows, consistent 8–14 px interior gaps, and teaching content visible in the first viewport.
- Colors and tokens: existing royal-blue active state, blue-soft teaching surface, white content boards, gray-blue metadata, and green only where the verified solution renderer already uses it semantically.
- Image quality and assets: official page images remain unchanged and confined to evidence drawers. Mathematical visuals use the existing source-mapped renderer; no decorative or curriculum imagery was invented.
- Copy and content: learner-facing lesson/session/page/model content is unchanged. New copy is limited to content-neutral product guidance such as `Learn visually`, `Try one`, and `Optional notes or drawing`.

### Interaction and accessibility checks

- `Learn visually`, `Try one`, `Check`, session tabs, problem/page tabs, `Replay teaching`, and exact-source disclosures were exercised in the in-app browser.
- Active mode controls expose `aria-pressed`; session and page controls retain their existing labels.
- Optional drawing/writing is a native disclosure and remains keyboard reachable.
- Browser console errors: 0.
- Volume 1 sweep: all 77 sessions opened in `Learn visually`, rendered a teaching workspace, showed no horizontal overflow, and contained no forbidden cross-program content.
- Volume 2 sweep: all 52 sessions opened in `Learn visually`, rendered a teaching workspace, showed no horizontal overflow, contained no forbidden cross-program content, and reserved no permanent screenshot sidebar.

### Source and code validation

- TypeScript: `tsc --noEmit -p tsconfig.app.json` passed.
- Volume 1 source-boundary validation passed.
- Volume 1 465-page inventory validation passed.
- Volume 2 official-source, 396-page inventory, 52-session, and Teacher Guide provenance validation passed.
- New visual-teaching regression contract passed.
- `git diff --check` passed.
- No npm build was run; the hot-deployed application was validated directly.

### Findings

- P0: none.
- P1: none.
- P2: none.
- P3: on narrower desktop widths, long problem titles may wrap to a second line; this is preferable to reducing the type size and does not hide the learning controls.

final result: passed
