# i-Ready Interactive delivery audit

Date: 2026-08-24

## Scope and source boundary

- Audited the Grade 3 i-Ready Interactive desktop experience for Student Worktext Volumes 1 and 2.
- Learner sequence, titles, prompts, values, page ranges, models, and answers are restricted to the official Curriculum Associates Student Worktexts and Teacher Guides registered in the application evidence files.
- Eureka Math was not used as an educational-content source. Reusable presentation mechanics remain curriculum-neutral.

## Source-fidelity validation

- Volume 1: 19 lessons, 77 sessions, 366 lesson-session pages, and 99 companion pages cover all 465 printed instructional pages. The source-boundary validator also checks 240 exact-page problem groups, 46 companion sections, Teacher Guide provenance, source markers, inline arithmetic, and cross-program fallback absence.
- Volume 2: 396 official viewer pages, 14 lessons, 52 sessions, 240 lesson-session pages, and 134 mapped Teacher Guide spreads.
- Volume 2 session boundaries were re-audited against the official session headers. Corrections were applied to Lessons 23, 25–29, and 31–33, then the 396-page inventory was regenerated from the official searchable PDF.
- The Volume 2 validator now contains a fail-closed exact-session-range contract, so the corrected boundaries cannot silently return to evenly sized mechanical ranges.
- Student Worktext and Teacher Guide page images are embedded inside each lesson as verification evidence. They no longer replace the visual-teaching experience.

## Interaction and teaching validation

- Volume 1 Lesson 1: Try it, Check work, Show solution, Replay visual, lesson/session navigation, official page evidence, and Teacher Guide evidence remain functional. All response fields have contextual accessible names.
- Volume 2 fraction lessons: learners can select fraction parts with mouse or keyboard, enter associated fraction answers, check the complete response, replay the visual, and open the official solved model.
- Volume 2 line-plot lessons: learners can add or remove X marks at each official scale position and validate the completed plot against exact official counts.
- Volume 2 time lessons: blank clock reading is paired with an explicit answer field and official solved state.
- Multi-whole fraction modeling was corrected so two wholes divided into fourths exposes eight selectable fourths, rather than one mechanically repeated four-part strip.
- Given fraction shading remains visible in comparison tasks while only the required response model is editable.

## Visual and navigation validation

- Validated at 1440 × 900 in an agent-owned Chrome tab on the approved Gemini profile.
- Volume 2 unit pages now show the lesson path before companion resources; the first lesson row begins inside the first viewport.
- Lesson pages begin with the active lesson and session, not a repeated marketing block.
- Solved teaching is the primary full-width lesson content. Official page images are collapsed into an in-context evidence drawer containing volume, lesson, session, printed pages, viewer page, model type, and Teacher Guide mapping.
- Volume 1 and Volume 2 overview, unit, and lesson routes had zero horizontal overflow at the audited desktop viewport.
- Representative lesson checks found zero unlabeled inputs, zero empty buttons, and zero images missing alternative text.
- Previous/Next, unit navigation, volume switching, session tabs, page tabs, Try it, Check work, Show solution, Replay visual, and source-drawer controls were clicked and verified.

## Automated results

- `npx tsc -p tsconfig.app.json --noEmit`: passed.
- `npm run validate:iready-volumes`: passed.
- No production build was run; the application was validated against the active hot-deployed development server as requested.

## Visual evidence

Current-run screenshots are stored under the ignored repository directory `tmp/iready-delivery-audit-20260824/`. Key captures:

- `14-volume2-unit4-lessons-first.jpg`
- `11-volume2-lesson20-checked.jpg`
- `12-volume2-lesson20-solution-fixed.jpg`
- `13-volume2-lesson20-source-evidence-fixed.jpg`
- `17-volume2-lesson26-lineplot-final.jpg`
- `16-volume1-lesson1-regression.jpg`
