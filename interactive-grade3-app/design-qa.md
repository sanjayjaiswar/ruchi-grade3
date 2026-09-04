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

## 2026-09-03 compact multicolor lesson-page theme

### Source truth and comparison boundary

- Before-state screenshot: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-ab3000f2-9b9a-4fb0-a87f-946f5c7fda11.png`.
- Selected-state issue screenshot: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-887b16ae-aa21-42c2-878f-f469371a310f.png` (1904 × 943 px).
- Spacing issue screenshot: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-60414bd7-11d7-41d7-93b6-ad1d34bcdc92.png`.
- Congestion/highlight screenshots: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-ff97c8c7-5c84-4bb6-bbca-dd39f9ce8634.png` and `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-a0ebffbb-ab70-4783-a843-933a9fd091a3.png`.
- Repetition screenshots: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-d71860e9-39bf-4914-b5fe-3fa5d7cda15f.png`, `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-5915449a-aafb-426d-a254-5b48afd6a818.png`, and `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-16525f82-a57f-4045-9b57-1416a15ecb6a.png`.
- Presentation references: `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-2e41cfc5-ba9f-4fc0-a391-6b1cb4f37419.png` and `/var/folders/66/d46v0l2s4976zb2_b5y4q1r80000gn/T/codex-clipboard-f01744d9-11c7-4bcb-b76b-300532160978.png`. These were used for hierarchy and palette inspiration, not cloned.
- Implementation screenshot: `tmp/theme-multicolor.jpg` (1920 × 940 browser capture).
- Revised selected-state screenshot: `tmp/theme-selected-state.jpg` (1920 × 940 browser capture, CSS viewport 1920 × 940, device scale 1).
- Revised compact-control screenshot: `tmp/theme-compact-controls.jpg` (1920 × 940 browser capture, CSS viewport 1920 × 940, device scale 1).
- Final balanced-header screenshot: `tmp/theme-balanced-header.jpg` (1920 × 940 browser capture, CSS viewport 1920 × 940, device scale 1).
- Final de-duplicated header screenshot: `tmp/theme-deduplicated-header.jpg` (1920 × 940 browser capture, CSS viewport 1920 × 940, device scale 1).
- Normalized comparison: `tmp/theme-multicolor-comparison.jpg`; the before and after lesson headers were scaled to 1600 px wide and stacked in one inspection image.
- State: Volume 1, Lesson 1, Session 1, Visual Teaching selected. Volume 2 Lesson 28 was also inspected in Visual Teaching and Try It states.

### Comparison history

#### Pass 1 — blocked

- P1: one periwinkle accent was repeated across the brand, selected volume, selected session, and selected workspace tab. The result was coherent but visually flat and did not satisfy the requested colorful lesson-page experience.
- P2: inactive session and workspace controls remained nearly white, so the page showed color only on the current selection.

#### Fixes

- Introduced one stable, role-based page palette shared by both volumes.
- Sessions now follow the same journey colors everywhere: sky, mint, sunshine, coral, then lilac for a fifth session.
- Workspace buttons have fixed tool colors: coral Visual Teaching, sunshine Try It, mint Student Worktext, and lilac Teacher Guide.
- Every session and workspace button keeps its soft role color when inactive; the current selection deepens that same color instead of switching to a generic accent.
- The Unit control remains a sunshine context badge, lesson identity uses a warm paper surface, and the workspace band uses a soft sky-to-lilac surface.
- Activity navigation uses matching sky, mint, sunshine, coral, lilac, and rose rails so the page continues the theme below the header without recoloring lesson content.

#### Pass 2 — passed

- The compact three-row layout remains unchanged.
- The page visibly contains a coordinated range of sky, mint, sunshine, coral, lilac, and rose rather than one dominant color.
- Color meaning is consistent across Volume 1 and Volume 2 and across selected/unselected states.
- The teaching model, official page imagery, PDF mapping, lesson copy, and curriculum data remain unchanged.

#### Pass 3 — blocked

- P1: after distributing color across every control, the selected session, selected workspace view, and selected activity were differentiated mainly by a modest increase in saturation. The current choice still blended into the surrounding palette.

#### Fixes

- Selected sessions and workspace views now use a substantially deeper version of their existing role color.
- Every selected session and workspace control now has a two-pixel dark companion-color border, an inset highlight, a strong lower edge, elevation, and a two-pixel lift.
- The selected activity now has a six-pixel dark left edge, full dark border, deeper color wash, inset highlight, and elevation.
- `aria-pressed` and `aria-selected` behavior remains unchanged, so the visual correction preserves the existing accessible state contract.

#### Pass 4 — passed

- Focused comparison: `tmp/theme-selected-state-comparison.jpg` stacks the supplied difficult-to-read state above the revised state at the same 1600 px normalized width.
- Selected Session 1, Visual Teaching, and the first activity are now recognizable through saturation, border weight, depth, and position—not color alone.
- Try It was also exercised: the yellow selection uses the same dark outline and elevation while preserving readable dark text.

#### Pass 5 — blocked

- P2: the four workspace controls used their wide horizontal area inefficiently. Each subtitle occupied a second line, the controls retained large internal padding, and the lesson/session identity wrapped to four lines beside them.

#### Fixes

- Workspace labels and metadata now share one line, separated by a subtle vertical divider.
- Workspace controls were reduced to a 40 px minimum height with 3–8 px internal padding and 6 px inter-control gaps.
- The command-row padding, lesson type scale, metadata line height, and session-heading spacing were tightened.
- Phase/session identity and the session title now share one non-wrapping line, reducing the lesson identity from four lines to three.

#### Pass 6 — passed

- Focused comparison: `tmp/theme-compact-controls-comparison.jpg` stacks the supplied two-line control state above the revised single-line state at the same 1600 px normalized width.
- All four controls remain readable with their page metadata visible, while teaching content begins higher in the viewport.
- The revised layout was visually inspected in Volume 1 Lesson 1 and Volume 2 Lesson 28 at a 1920 × 940 desktop viewport.

#### Pass 7 — blocked

- P1: darkening each role color to show selection made the chosen control look visually unrelated to the other pastel controls.
- P2: forcing label and page metadata onto one line made source text compete with the control label, introduced vertical divider artifacts, and still left the lesson identity too narrow.
- P2: the session navigation retained the original 76 px component minimum height despite the compact shell intent.

#### Fixes

- All selected controls now keep their original light role surface and use one universal blue two-pixel border, four-pixel lower selection edge, and restrained shadow.
- Workspace labels and metadata return to two compact lines; the second line uses 10/12 px metadata type and no divider.
- The lesson identity receives half of the command-row width at wide desktop sizes.
- Lesson metadata is shortened from `starts on printed page` to `starts p.` and reordered so the session count remains visible.
- The session navigation minimum height is now enforced at 52 px; session buttons and adjacent navigation actions are enforced at 38 px.

#### Pass 8 — passed

- Focused comparison: `tmp/theme-balanced-header-comparison.jpg` stacks the supplied one-line/dark-selected state above the revised two-line/light-selected state at the same 1600 px normalized width.
- Page metadata is fully visible in all four controls, and lesson metadata no longer truncates.
- The selected Student Worktext control remains mint and is identified by the same blue selection edge used by sessions and activities.
- Volume 1 Lesson 1 and Volume 2 Lesson 28 were visually inspected after the final spacing changes.

#### Pass 9 — blocked

- P2: the full lesson title appeared in the compact navigation, the main lesson heading, and the session-heading line. The repeated context consumed vertical and horizontal space without adding orientation value.

#### Fixes

- The main lesson heading is now the only location containing the full lesson title.
- Compact navigation now shows only `Volume · Unit · Lesson` identifiers.
- The redundant `phase · session · session title` line was removed; phase/session remain available in the selected session tab, and the current activity remains identified in the activity heading.
- The command-row minimum height was reduced from 58 px to 50 px after removing the duplicate line.

#### Pass 10 — passed

- Focused comparison: `tmp/theme-deduplicated-header-comparison.jpg` stacks the supplied repeated-context state above the revised canonical-title state at the same 1600 px normalized width.
- The full lesson title appears once, the session choice remains clear, and the activity heading follows immediately below the compact command row.
- Volume 1 Lesson 1 and Volume 2 Lesson 28 were visually inspected after de-duplication.

### Required fidelity surfaces

- Fonts and typography: existing application type family, sizes, weights, line heights, wrapping, and truncation are unchanged.
- Spacing and layout rhythm: the approved compact lesson shell is unchanged; the theme introduces no new width, height, overflow, radius, or spacing changes.
- Colors and visual tokens: warm white base; purple-blue portal identity; sunshine Unit badge; sequential pastel session colors; fixed coral/sunshine/mint/lilac workspace colors; matching multicolor activity rails. Dark companion colors preserve readable labels in every state.
- Image quality and assets: no image, logo, illustration, PDF, or lesson visual was changed.
- Copy and content: no learner-facing copy or curriculum content was changed.

### Findings

- P0: none.
- P1: none.
- P2: none.
- P3: no dedicated mobile polish was performed; desktop widths remain the project target.

final result: passed
